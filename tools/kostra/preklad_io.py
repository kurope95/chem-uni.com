# -*- coding: utf-8 -*-
"""preklad_io.py — výměna textů k překladu s externím překladačem (např. Gemini).

Export vytáhne nepřeložené úseky z katalogů (preklad.py) do souborů po dávkách,
import vrácené překlady ověří a zapíše zpět do katalogů všech stránek, kde se text vyskytuje.

    python preklad_io.py export <jazyk> <složka> [--pages a.html,b.html] [--skip a.html,b.html]
    python preklad_io.py import <jazyk> <soubor nebo složka> [...] [--overwrite]
    python preklad_io.py status <jazyk>

Formát pro překladač
  <složka>/<jazyk>/chunk-001.json   {"file", "source_language", "target_language", "items": [
                                        {"id", "format", "where", "note"?, "code_context"?, "source"}]}
  vrácený soubor                    {"file", "target_language", "translations": {"<id>": "<překlad>"}}
                                    (přijme se i kopie chunk souboru s vyplněným "translation" u položek)
  Odmítnuté položky jdou do <složka>/<jazyk>-fix/fix-NNN.json ve stejném formátu jako chunk.

Stejný český text se exportuje jednou (i když je na víc stránkách) a import ho zapíše všude.
Řetězce ze skriptů se exportují jako prostý text (bez JS escapování) a při importu se escapují zpět.
"""
import glob, hashlib, html, io, json, os, re, sys, time

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass
import i18n
import preklad as P
from site_data import GROUPS, TOPICS, ANORG_TOPICS

LANG_NAMES = {"sk": "Slovak (slovenčina)", "en": "English (British)", "de": "German", "pl": "Polish",
              "hu": "Hungarian", "uk": "Ukrainian"}
CHUNK_CHARS = 22000          # objem zdrojového textu v jedné dávce
# trenažér názvosloví učí české názvy — jeho obsah se nepřekládá, jiný jazyk potřebuje vlastní engine
NEPREKLADAT = {"nazvoslovi/index.html"}


# ---------------------------------------------------------------- převody textu
def js_decode(raw):
    out, i, n = [], 0, len(raw)
    simple = {"n": "\n", "t": "\t", "r": "\r", "b": "\b", "f": "\f", "v": "\v", "0": "\0"}
    while i < n:
        c = raw[i]
        if c == "\\" and i + 1 < n:
            d = raw[i + 1]
            if d in simple:
                out.append(simple[d]); i += 2
            elif d == "u" and re.match(r"[0-9a-fA-F]{4}", raw[i + 2:i + 6]):
                out.append(chr(int(raw[i + 2:i + 6], 16))); i += 6
            elif d == "x" and re.match(r"[0-9a-fA-F]{2}", raw[i + 2:i + 4]):
                out.append(chr(int(raw[i + 2:i + 4], 16))); i += 4
            else:
                out.append(d); i += 2
        else:
            out.append(c); i += 1
    return "".join(out)


def js_encode(text, q, src_raw):
    t = text.replace("\\", "\\\\").replace(q, "\\" + q)
    t = t.replace("\n", "\\n").replace("\r", "\\r").replace("\t", "\\t")
    t = t.replace("\u2028", "\\u2028").replace("\u2029", "\\u2029")
    # neviditelné mezery zapsat stejně jako originál (\u00a0 apod.)
    for esc in re.findall(r"\\u[0-9a-fA-F]{4}", src_raw):
        ch = chr(int(esc[2:], 16))
        if ch not in "\u2028\u2029":
            t = t.replace(ch, esc)
    return t


def css_decode(raw):
    return raw.replace('\\"', '"').replace("\\\\", "\\")


def css_encode(text):
    return text.replace("\\", "\\\\").replace('"', '\\"')


def attr_decode(raw):
    return html.unescape(raw)


def attr_encode(text):
    return text.replace("&", "&amp;").replace('"', "&quot;").replace("<", "&lt;").replace(">", "&gt;")


def export_form(seg):
    """(formát, text pro překladač)"""
    k = seg["kind"]
    if k == "html":
        return "html", seg["src"]
    if k == "js":
        if seg["q"] == "`":
            return "template", seg["src"]
        return "text", js_decode(seg["src"])
    if k == "css":
        return "text", css_decode(seg["src"])
    return "text", attr_decode(seg["src"])


# jazykové opravy, které se při importu udělají samy (ustálená rozhodnutí z glosáře)
_SK_MOL_INFL = re.compile(r"\b([Mm])ol(u|y|ov|e|och|om|mi)\b")
_SK_MOL_NOUN = re.compile(r"\b(jeden|Jeden|jedného|Jedného|jednom|cez|definuje)(\s|&nbsp;)mol\b(?![·⁻/²³¹])")


def normalize(lang, text):
    if lang == "sk":   # jednotka jako slovo: mól, mólu, mólov… (značka mol zůstává)
        text = _SK_MOL_INFL.sub(lambda m: m.group(1) + "ól" + m.group(2), text)
        text = _SK_MOL_NOUN.sub(lambda m: m.group(1) + m.group(2) + "mól", text)
    return text


def import_form(seg, text):
    k = seg["kind"]
    if k == "html":
        return text
    if k == "js":
        if seg["q"] == "`":
            return text          # šablona se exportuje bez dekódování; neescapované ` opraví validate()
        return js_encode(text, seg["q"], seg["src"])
    if k == "css":
        return css_encode(text)
    return attr_encode(text)


def gid(fmt, text):
    return "g-" + hashlib.sha1(("%s|%s" % (fmt, text)).encode("utf-8")).hexdigest()[:12]


# ---------------------------------------------------------------- stránky
def page_titles():
    t = {}
    for folder, tops in (("obecna-fyzikalni-chemie", TOPICS), ("anorganicka-chemie", ANORG_TOPICS)):
        for x in tops:
            t["%s/%s.html" % (folder, x["slug"])] = x["title"]
    for g in GROUPS:
        if g.get("slug"):
            t[g["slug"] + "/index.html"] = g["title"]
    return t


def all_pages():
    return [os.path.relpath(p, i18n.ROOT).replace("\\", "/") for p in i18n.content_pages()]


def index(lang, pages):
    """gid → {fmt, text, where, notes, occ: [(stránka, id úseku)]} v pořadí prvního výskytu."""
    P.set_lang(lang)
    titles = page_titles()
    out = {}
    for rel in pages:
        segs = P.load_cat(rel)["segments"]
        for sid, seg in segs.items():
            fmt, text = export_form(seg)
            g = gid(fmt, text)
            if g not in out:
                out[g] = dict(fmt=fmt, text=text, where="%s › %s" % (titles.get(rel, rel), seg["ctx"])
                              if seg["kind"] != "js" else "%s › script" % titles.get(rel, rel),
                              code=seg["ctx"] if seg["kind"] == "js" else None, occ=[], done=True)
            out[g]["occ"].append((rel, sid))
            if not seg["sk"]:
                out[g]["done"] = False
    return out


# ---------------------------------------------------------------- export
INSTRUCTIONS = """# Translation job — chem-uni.com ({lang_name})

You are translating an interactive chemistry study website for secondary-school students
(Czech original). Source language: **Czech (cs)**. Target language: **{lang_name}** (`{lang}`).

## Files
- `{lang}/chunk-NNN.json` — the items to translate ({n_chunks} files, {n_items} items, ~{n_words} words).
- `GLOSSARY-{lang}.md` — binding terminology and style for this language (if present). Read it first.

## What to produce
For **every** `{lang}/chunk-NNN.json` create **`{lang}-translated/chunk-NNN.json`** (same file name) containing:

```json
{{
  "file": "chunk-NNN",
  "target_language": "{lang}",
  "translations": {{
    "g-1a2b3c4d5e6f": "translated text",
    "g-…": "…"
  }}
}}
```

- One entry for every item `id` in the chunk. Do not skip items, do not add ids.
- Valid JSON, UTF-8. Escape `"` and `\\` inside JSON strings as JSON requires. A line break inside a text is `\\n` in JSON, exactly as in the source file.
- Do not copy the source text into the output file. Only the translations.

If a folder `{lang}-fix/` exists, it holds items that were rejected on import (each has a `problem` field).
Translate them the same way into `{lang}-translated/fix-NNN.json`.

## Item fields
- `source` — the Czech text.
- `format`:
  - `html` — an HTML fragment. Translate only the human text. Keep **every tag with all its attributes exactly as in the source** (the same tags; you may reorder inline tags only if the target grammar requires it). Keep HTML entities (`&nbsp;`, `&thinsp;`, `&minus;`…). Keep non-breaking spaces after one-letter words where the target language uses them.
  - `text` — plain text (from a script, a CSS label or an attribute). No HTML escaping needed. Keep any HTML tags that appear inside exactly.
  - `template` — text from a JavaScript template: copy every `${{…}}` expression **exactly**, translate the rest.
- `where` — which module and page element it belongs to (for context).
- `note` — special instruction for this item, if any.
- `code_context` — for script text: the surrounding code. Use it to recognise items that are **not human language** (identifiers, keys, CSS classes, ids, codes). Return those **unchanged**.

## Rules (all items)
1. Never change numbers, units, chemical formulas and symbols, equations, variable names, or mathematical notation. That includes brackets, the spaces around ` / ` and the order of operands. On pages about fractions and brackets, this notation is the teaching content itself.
2. Items that are identical in the target language (formulas, units, "pH", names) are returned unchanged.
3. Short UI labels and diagram labels should stay about as short as the original, because longer text can overlap in diagrams.
4. Proper names and the textbook title (*Klikorka, Hájek, Votinský: Obecná a anorganická chemie*) stay in Czech.
5. Keep the tone: clear, friendly, precise; address the student formally, as the Czech does ("vy").
6. Translate everything else. No Czech may remain in the output.
7. Consistency matters: the same Czech term must get the same translation across all chunks (follow the glossary; if a term is not there, pick the standard term used in secondary-school chemistry in the target country and keep using it).
{lang_rules}
"""

LANG_RULES = {
    "sk": """
## Slovak specifics
- Standard literary Slovak (spisovná slovenčina) as a Slovak chemistry teacher writes it. Not a calque of the Czech.
- Watch for Czechisms: který → ktorý, jestli → či, protože → pretože, tedy → teda, také → tiež, nebo → alebo,
  když → keď, ještě → ešte, hned → hneď, tady/zde → tu, pořád → stále, vždycky → vždy, spočítat → vypočítať,
  zapsat → zapísať, řádek → riadok, zlomek → zlomok, závorka → zátvorka, vztah → vzťah, výsledek → výsledok,
  zadání → zadanie, sloučenina → zlúčenina, vazba → väzba, látkové množství → látkové množstvo.
- The Czech-only letters ě, ř, ů must never appear in the output. The import rejects them.
- Element names: use the Slovak list in the glossary (sodík, horčík, kremík, vápnik, meď, striebro, ortuť…).
- The unit **mole** written as a word is *mól* (jeden mól, mólu, móly, mólov, v móloch); the **symbol** stays *mol*
  (2 mol, g·mol⁻¹, mol·dm⁻³). Half-life is *polčas*; slash is *lomka*; stacked notation is *poschodový zápis*.
- Check the section "Doplněno při překladu" at the end of the glossary: terms already settled on other pages.
- Site module names: Obecná a fyzikální chemie → Všeobecná a fyzikálna chémia; Anorganická chemie → Anorganická chémia;
  Jak počítat chemii → Ako počítať chémiu; Zlomky a závorky → Zlomky a zátvorky; Počítáme spolu → Počítame spolu;
  Periodická tabulka → Periodická tabuľka; Testy nanečisto → Testy nanečisto; Počítání → Počítanie.
- References to Czech exams are just translated (maturita → maturita, přijímačky → prijímačky).
""",
    "en": """
## English specifics
- British spelling (colour, ionisation, practise as a verb), standard secondary-school chemistry terminology.
""",
}


def chunk_notes(item):
    notes = []
    if item["text"] == "ů":
        return ("Czech genitive plural ending that the code appends to a noun for 5 or more items "
                "(e.g. '5 elektronů', '6 poločasů'; see code_context). Return the target-language ending "
                "for 5+ items that fits after the translated noun (Slovak: 'ov', e.g. '5 elektrónov').")
    if item["fmt"] == "text" and item["code"]:
        notes.append("Text from a script. If it is not natural language (identifier, key, code), return it unchanged.")
    if item["fmt"] == "template":
        notes.append("Copy every ${…} expression exactly.")
    w = item["where"]
    if re.search(r"› (text|tspan|button|label|th|option)\b", w) or (item["code"] and len(item["text"]) < 28):
        notes.append("Short label: keep it about as short as the original.")
    return " ".join(notes)


def cmd_export(lang, folder, pages=None, skip=()):
    pages = [p for p in (pages or all_pages()) if p not in skip and p not in NEPREKLADAT]
    P.set_lang(lang)
    # katalogy: vytvořit nebo aktualizovat (zachová hotové překlady)
    for rel in pages:
        with P.Lock(rel):
            P.cmd_extract(rel)
    idx = index(lang, pages)
    todo = [(g, it) for g, it in idx.items() if not it["done"]]
    out_dir = os.path.join(folder, lang)
    os.makedirs(out_dir, exist_ok=True)
    for old in glob.glob(os.path.join(out_dir, "chunk-*.json")):
        os.remove(old)
    chunks, cur, size = [], [], 0
    for g, it in todo:
        if cur and size + len(it["text"]) > CHUNK_CHARS:
            chunks.append(cur)
            cur, size = [], 0
        cur.append((g, it))
        size += len(it["text"])
    if cur:
        chunks.append(cur)
    words = 0
    for n, ch in enumerate(chunks, 1):
        items = []
        for g, it in ch:
            d = {"id": g, "format": it["fmt"], "where": it["where"]}
            note = chunk_notes(it)
            if note:
                d["note"] = note
            if it["code"]:
                d["code_context"] = it["code"]
            d["source"] = it["text"]
            items.append(d)
            words += len(re.sub(r"<[^>]+>", " ", it["text"]).split())
        doc = {"file": "chunk-%03d" % n, "source_language": "cs", "target_language": lang, "items": items}
        io.open(os.path.join(out_dir, "chunk-%03d.json" % n), "w", encoding="utf-8", newline="\n").write(
            json.dumps(doc, ensure_ascii=False, indent=1))
    os.makedirs(os.path.join(folder, lang + "-translated"), exist_ok=True)
    gl = os.path.join(os.path.dirname(HERE), "preklad", lang, "GLOSAR.md")
    if os.path.exists(gl):
        io.open(os.path.join(folder, "GLOSSARY-%s.md" % lang), "w", encoding="utf-8", newline="\n").write(
            io.open(gl, encoding="utf-8").read())
    io.open(os.path.join(folder, "INSTRUCTIONS.md"), "w", encoding="utf-8", newline="\n").write(
        INSTRUCTIONS.format(lang=lang, lang_name=LANG_NAMES.get(lang, lang), n_chunks=len(chunks),
                            n_items=len(todo), n_words=words, lang_rules=LANG_RULES.get(lang, "")))
    print("\nexport %s: %d stránek, %d unikátních textů k překladu (%d už hotových), ~%d slov, %d dávek → %s"
          % (lang, len(pages), len(todo), len(idx) - len(todo), words, len(chunks), out_dir))


# ---------------------------------------------------------------- import
def read_translations(path):
    doc = json.load(io.open(path, encoding="utf-8-sig"))
    if isinstance(doc, dict) and isinstance(doc.get("translations"), dict):
        return doc["translations"]
    if isinstance(doc, dict) and isinstance(doc.get("items"), list):
        return {x["id"]: x.get("translation", "") for x in doc["items"] if x.get("translation")}
    if isinstance(doc, dict) and all(isinstance(k, str) and k.startswith("g-") for k in doc):
        return doc
    raise ValueError("neznámý formát souboru")


def cmd_import(lang, paths, overwrite=False):
    files = []
    for p in paths:
        if os.path.isdir(p):
            files += sorted(glob.glob(os.path.join(p, "*.json")))
        else:
            files.append(p)
    pages = [p for p in all_pages() if p not in NEPREKLADAT and os.path.exists(P.cat_path(p))]
    idx = index(lang, pages)
    cats = {rel: P.load_cat(rel)["segments"] for rel in pages}
    by_page = {}             # stránka → {id úseku: text k uložení}
    rejected, stats = [], dict(files=0, items=0, ok=0, skipped=0, unknown=0, bad=0)
    for f in files:
        try:
            tr = read_translations(f)
        except Exception as e:
            print("  %s: nelze přečíst (%s)" % (os.path.basename(f), e))
            continue
        stats["files"] += 1
        for g, text in tr.items():
            stats["items"] += 1
            it = idx.get(g)
            if not it:
                stats["unknown"] += 1
                continue
            if not isinstance(text, str) or not text.strip():
                rejected.append((g, it, text, "empty translation"))
                stats["bad"] += 1
                continue
            text = normalize(lang, text)
            problems = []
            staged = []
            for rel, sid in it["occ"]:
                seg = cats[rel][sid]
                if seg["sk"] and not overwrite:
                    continue
                raw = import_form(seg, text)
                fixed, errs, warns = P.validate(seg, raw)
                if errs:
                    problems += errs
                    break
                staged.append((rel, sid, fixed))
            if problems:
                rejected.append((g, it, text, "; ".join(sorted(set(problems)))))
                stats["bad"] += 1
                continue
            if not staged:
                stats["skipped"] += 1
                continue
            for rel, sid, fixed in staged:
                by_page.setdefault(rel, {})[sid] = fixed
            stats["ok"] += 1
    # zápis do katalogů (se zámkem — mohou běžet agenti)
    for rel, data in by_page.items():
        with P.Lock(rel):
            cat = P.load_cat(rel)
            for sid, val in data.items():
                if sid in cat["segments"] and (overwrite or not cat["segments"][sid]["sk"]):
                    cat["segments"][sid]["sk"] = val
            P.save_cat(rel, cat)
    # odmítnuté → dávka k opravě
    if rejected:
        base = os.path.dirname(os.path.abspath(files[0])) if files else os.getcwd()
        root = os.path.dirname(base) if os.path.basename(base).endswith("-translated") else base
        fix_dir = os.path.join(root, lang + "-fix")
        os.makedirs(fix_dir, exist_ok=True)
        n = len(glob.glob(os.path.join(fix_dir, "fix-*.json"))) + 1
        items = [{"id": g, "format": it["fmt"], "where": it["where"], "problem": prob,
                  **({"code_context": it["code"]} if it["code"] else {}),
                  "source": it["text"], "rejected_translation": text if isinstance(text, str) else ""}
                 for g, it, text, prob in rejected]
        io.open(os.path.join(fix_dir, "fix-%03d.json" % n), "w", encoding="utf-8", newline="\n").write(
            json.dumps({"file": "fix-%03d" % n, "source_language": "cs", "target_language": lang,
                        "items": items}, ensure_ascii=False, indent=1))
        print("odmítnuto %d → %s" % (len(rejected), os.path.join(fix_dir, "fix-%03d.json" % n)))
        for g, it, text, prob in rejected[:15]:
            print("   %s: %s" % (g, prob))
    print("import %s: souborů %d, položek %d — přijato %d, už přeložené (přeskočeno) %d, neznámé id %d, odmítnuto %d"
          % (lang, stats["files"], stats["items"], stats["ok"], stats["skipped"], stats["unknown"], stats["bad"]))
    cmd_status(lang)


def cmd_status(lang):
    P.set_lang(lang)
    tot_d = tot = 0
    for rel in all_pages():
        if not os.path.exists(P.cat_path(rel)):
            continue
        segs = P.load_cat(rel)["segments"]
        d = sum(1 for v in segs.values() if v["sk"])
        tot_d += d
        tot += len(segs)
        flag = "HOTOVO" if d == len(segs) else ""
        print("  %-48s %5d / %5d  %s" % (rel, d, len(segs), flag))
    print("  celkem %d / %d úseků" % (tot_d, tot))


if __name__ == "__main__":
    a = sys.argv[1:]
    if len(a) < 2:
        print(__doc__)
        sys.exit(1)
    cmd, lang = a[0], a[1]
    opt = lambda name: a[a.index(name) + 1].split(",") if name in a else None
    if cmd == "export":
        cmd_export(lang, a[2], opt("--pages"), opt("--skip") or ())
    elif cmd == "import":
        paths = [x for x in a[2:] if not x.startswith("--")]
        cmd_import(lang, paths, "--overwrite" in a)
    elif cmd == "status":
        cmd_status(lang)
    else:
        print(__doc__)
        sys.exit(1)
