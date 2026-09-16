# -*- coding: utf-8 -*-
"""preklad.py — překlad obsahu stránky do slovenštiny přes katalog úseků.

Česká stránka zůstává zdrojem pravdy. Z ní se vytáhnou přeložitelné úseky do katalogu
tools/preklad/sk/<stránka>.json; agent (nebo člověk) do katalogu doplní slovenštinu
a z české stránky + katalogu se sestaví slovenská stránka vedle české:

    jak-pocitat/index.html      →  jak-pocitat/index.sk.html
    obecna-…/termochemie.html   →  obecna-…/termochemie.sk.html

Úseky
  html  — souvislý text v jednom bloku včetně vnořených inline značek (<b>, <span class="chem">…)
  attr  — viditelné atributy: title, alt, placeholder, aria-label, data-title, data-lbl, data-hl,
          content u <meta name="description">
  js    — řetězce ve skriptech, které vypadají jako lidský text (i v datech JSON)
  css   — content:"…" ve stylech
Stejný český text se překládá jednou a použije se všude ve stránce — i v kódu, takže
porovnání typu x === "…" zůstanou konzistentní.

Lišta, drobečky, patička, levý panel a titulek se NEpřekládají tady — ty obstarává i18n.py.

Příkazy (cesta ke stránce relativně ke kořeni webu):
    python preklad.py extract  <stránka>            # (znovu) vytáhne úseky, zachová hotové překlady
    python preklad.py status   <stránka>
    python preklad.py todo     <stránka> [--limit 120] [--offset 0]   # další nepřeložené úseky (JSON)
    python preklad.py put      <stránka> <soubor.json>                # {"id": "slovensky", …}
    python preklad.py apply    <stránka>            # sestaví <stránka>.sk.html
    python preklad.py check    <stránka>            # kontrola sestavené slovenské stránky
"""
import hashlib, html, io, json, os, re, subprocess, sys, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass
import i18n

ROOT = i18n.ROOT
CAT_DIR = os.path.join(os.path.dirname(HERE), "preklad", "sk")
LANG = "sk"


def set_lang(lang):
    """Cílový jazyk (výchozí slovenština): katalogy tools/preklad/<jazyk>/, stránky *.<jazyk>.html."""
    global LANG, CAT_DIR
    LANG = lang
    CAT_DIR = os.path.join(os.path.dirname(HERE), "preklad", lang)

CZ_DIA = re.compile(r"[áčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]")
CZ_ONLY = re.compile(r"[ěřůĚŘŮ]")          # ve slovenštině tyto znaky nejsou
INLINE = {"a", "abbr", "b", "bdi", "br", "cite", "code", "data", "dfn", "em", "i", "kbd", "mark", "q",
          "s", "samp", "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr", "tspan"}
ATTRS = ("title", "alt", "placeholder", "aria-label", "data-title", "data-lbl", "data-hl")
UNITS = {"mol", "mmol", "dm", "cm", "mm", "nm", "pm", "km", "kg", "mg", "ml", "mL", "kpa", "kPa", "hpa", "hPa",
         "pa", "Pa", "kj", "kJ", "min", "atm", "bar", "ppm", "aq", "log", "ln", "exp", "sin", "cos", "max",
         "rad", "deg", "eq", "mmHg", "mbar", "MPa", "GPa", "kmol", "dm3", "cm3", "µg", "ug", "px"}
STOP = {"a", "je", "se", "na", "v", "z", "do", "to", "pro", "že", "jak", "co", "po", "od", "ke", "ve", "ze",
        "i", "nebo", "ale", "jako", "tak", "už", "jen", "kde", "když", "než", "ani", "by", "jsou", "není",
        "s", "k", "o", "u", "si", "mu", "ho", "jde", "tady", "tam", "pak", "ještě", "proto", "tedy", "zde"}
CODE_WORDS = {"Enter", "Escape", "Tab", "Space", "Backspace", "Delete", "Home", "End", "ArrowUp", "ArrowDown",
              "ArrowLeft", "ArrowRight", "PageUp", "PageDown", "Arial", "Georgia", "Infinity", "Math", "Date",
              "JSON", "Object", "Array", "Number", "String", "Boolean", "Error", "Promise", "Map", "Set",
              "None", "True", "False", "Consolas", "Menlo", "Monaco", "Helvetica", "Inter", "Roboto"}


# ---------------------------------------------------------------- pomocníci
def page_path(rel):
    return os.path.join(ROOT, *rel.replace("\\", "/").split("/"))


def sk_path(rel):
    p = page_path(rel)
    return p[:-5] + "." + LANG + ".html"


def cat_path(rel):
    key = rel.replace("\\", "/")[:-5].replace("/", "__")
    return os.path.join(CAT_DIR, key + ".json")


def seg_id(kind, q, src):
    return kind[0] + "-" + hashlib.sha1(("%s|%s|%s" % (kind, q, src)).encode("utf-8")).hexdigest()[:10]


def plain(s):
    s = re.sub(r"<[^>]+>", " ", s)
    s = re.sub(r"\$\{.*?\}", " ", s)
    s = re.sub(r"\\[nrtu]", " ", s)
    return html.unescape(s)


ATTR_IN_TAG = re.compile(r'\s(title|alt|placeholder|aria-label|data-title|data-lbl|data-hl)="([^"]*)"')


def visible(raw):
    """Text i s viditelnými atributy uvnitř značek (placeholder="…", aria-label="…")."""
    return plain(raw) + " " + " ".join(html.unescape(v) for _, v in ATTR_IN_TAG.findall(raw))


def human_html(text):
    t = visible(text)
    if CZ_DIA.search(t):
        return True
    words = [w for w in re.findall(r"[^\W\d_]{2,}", t) if w not in UNITS and w.lower() not in UNITS]
    return any(re.search(r"[a-záčďéěíňóřšťúůýž]{2,}", w) for w in words)


def human_js(raw):
    t = plain(raw).strip()
    if raw == "ů":            # koncovka 2. pádu množného čísla, kterou skládá kód („5 elektronů“)
        return True
    vis = visible(raw)
    if not re.search(r"[^\W\d_]{2,}", vis):
        return False
    # kód a CSS (středník sám o sobě kódem není — české věty ho běžně mají)
    if re.search(r"=>|function\b|[{}]", t):
        return False
    if re.search(r"^[\w-]+\s*:\s*[^;]+;", t) and not CZ_DIA.search(t):
        return False
    if re.search(r"\bvar\(|rgba?\(|#[0-9a-fA-F]{3,6}\b|^[.#][\w-]+|\bpx\b|url\(", t):
        return bool(CZ_DIA.search(vis))
    if CZ_DIA.search(vis):
        return True
    words = re.findall(r"[^\W\d_]+", t)
    if len(words) >= 2 and " " in t and any(w.lower() in STOP for w in words):
        return True
    if re.fullmatch(r"[A-Z][a-z]{2,}(?: [a-z]{2,})*[.!?:…]?", t) and t not in CODE_WORDS:
        return True
    return False


# ---------------------------------------------------------------- JS lexer
_KW_REGEX = {"return", "typeof", "case", "in", "of", "new", "delete", "void", "throw", "else", "do", "instanceof"}


def _skip_str(code, i, q):
    n = len(code)
    j = i + 1
    while j < n and code[j] != q:
        if code[j] == "\\":
            j += 2
            continue
        if code[j] == "\n":
            break
        j += 1
    return j


def _lex_template(code, i, out, base):
    """i = index po otevírací `; vrací index zavírací `. Řetězce v ${} se nesbírají."""
    n = len(code)
    while i < n:
        ch = code[i]
        if ch == "\\":
            i += 2
            continue
        if ch == "`":
            return i
        if ch == "$" and code.startswith("${", i):
            depth, i = 1, i + 2
            while i < n and depth:
                c = code[i]
                if c in "\"'":
                    i = _skip_str(code, i, c) + 1
                    continue
                if c == "`":
                    i = _lex_template(code, i + 1, [], base) + 1
                    continue
                if c == "{":
                    depth += 1
                elif c == "}":
                    depth -= 1
                i += 1
            continue
        i += 1
    return n


def js_literals(code):
    """[(start, end, quote)] obsahu řetězcových literálů (bez uvozovek)."""
    out, i, n = [], 0, len(code)
    last, last_word = "", ""
    while i < n:
        c = code[i]
        if c in " \t\r\n":
            i += 1
            continue
        if code.startswith("//", i):
            j = code.find("\n", i)
            i = n if j < 0 else j
            continue
        if code.startswith("/*", i):
            j = code.find("*/", i + 2)
            i = n if j < 0 else j + 2
            continue
        if c in "\"'":
            j = _skip_str(code, i, c)
            out.append((i + 1, j, c))
            i, last, last_word = j + 1, "x", ""
            continue
        if c == "`":
            j = _lex_template(code, i + 1, out, 0)
            out.append((i + 1, j, "`"))
            i, last, last_word = j + 1, "x", ""
            continue
        if c == "/":
            if last == "" or last in "(,=:[!&|?{};+-*%<>~^" or last_word in _KW_REGEX:
                j, in_cls = i + 1, False
                while j < n:
                    ch = code[j]
                    if ch == "\\":
                        j += 2
                        continue
                    if ch == "[":
                        in_cls = True
                    elif ch == "]":
                        in_cls = False
                    elif ch == "/" and not in_cls:
                        break
                    elif ch == "\n":
                        break
                    j += 1
                i = j + 1
                while i < n and code[i].isalpha():
                    i += 1
                last, last_word = "x", ""
                continue
            last, last_word = "/", ""
            i += 1
            continue
        if c.isalnum() or c in "_$":
            j = i
            while j < n and (code[j].isalnum() or code[j] in "_$"):
                j += 1
            last, last_word = "w", code[i:j]
            i = j
            continue
        last, last_word = c, ""
        i += 1
    return out


# ---------------------------------------------------------------- vyhledání úseků
TOKEN = re.compile(r"<!--.*?-->|<script\b[^>]*>.*?</script>|<style\b[^>]*>.*?</style>|<[^>]+>|[^<]+", re.S)


def czech_base(s):
    """Česká stránka bez vložené lišty (i18n): čistý zdroj pro překlad."""
    s = re.sub(r"<!--SITE-LANG-->.*?<!--/SITE-LANG-->\n?", "", s, flags=re.S)
    s = re.sub(r"<!--SL-->.*?<!--/SL-->(?:\n[ \t]*)?", "", s, flags=re.S)
    s = i18n._unwrap(s)
    s = re.sub(r'<main id="obsah" lang="[a-z]{2}">', '<main id="obsah">', s)
    return s


def excluded_ranges(s):
    """Lišta a další části, které překládá i18n.py (ne tento nástroj)."""
    pats = [r"<head>.*?</head>", r'<header class="bar">.*?</header>', r'<footer class="foot">.*?</footer>',
            r'<a class="skip".*?</a>', r'<aside class="rail">.*?</aside>', r'<div class="topbar">.*?<main id="obsah"']
    rng = []
    for p in pats:
        for m in re.finditer(p, s, re.S):
            rng.append((m.start(), m.end()))
    return rng


def _inside(pos, rng):
    return any(a <= pos < b for a, b in rng)


def find_segments(s):
    """Seznam výskytů: dict(kind, q, start, end, src, ctx)."""
    occ = []
    rng = excluded_ranges(s)
    head_end = s.find("</head>")
    run = []          # tokeny aktuálního textového běhu (start, end, is_text)
    block = ["body"]  # zjednodušený zásobník blokových značek pro kontext

    def flush():
        while run and not run[0][2] and re.match(r"</|<br", s[run[0][0]:run[0][1]]):
            run.pop(0)
        while run and not run[-1][2] and (not s[run[-1][0]:run[-1][1]].startswith("</") or
                                          s[run[-1][0]:run[-1][1]].startswith("<br")):
            run.pop()
        if run and any(t for _, _, t in run):
            a, b = run[0][0], run[-1][1]
            raw = s[a:b]
            lead = len(raw) - len(raw.lstrip())
            tail = len(raw) - len(raw.rstrip())
            a, b = a + lead, b - tail
            raw = s[a:b]
            if raw and human_html(raw) and not _inside(a, rng):
                occ.append(dict(kind="html", q="", start=a, end=b, src=raw, ctx=block[-1]))
        run.clear()

    for m in TOKEN.finditer(s):
        tok = m.group(0)
        a, b = m.start(), m.end()
        if tok.startswith("<script"):
            flush()
            body_start = tok.find(">") + 1
            code = tok[body_start:len(tok) - len("</script>")]
            head = code[:400]
            if "SITE-NAV" in head or "SITE-LANG" in head:
                continue
            base = a + body_start
            for ls, le, q in js_literals(code):
                raw = code[ls:le]
                if human_js(raw):
                    pre = code[max(0, ls - 60):ls - 1].replace("\n", " ")
                    post = code[le + 1:le + 50].replace("\n", " ")
                    occ.append(dict(kind="js", q=q, start=base + ls, end=base + le, src=raw,
                                    ctx="…%s⟦%s⟧%s…" % (pre[-45:], q, post[:40])))
            continue
        if tok.startswith("<style"):
            flush()
            for cm in re.finditer(r'content:\s*"([^"\\]*)"', tok):
                if CZ_DIA.search(cm.group(1)) or human_js(cm.group(1)):
                    occ.append(dict(kind="css", q='"', start=a + cm.start(1), end=a + cm.end(1),
                                    src=cm.group(1), ctx="CSS content"))
            continue
        if tok.startswith("<!--"):
            flush()
            continue
        if tok.startswith("<"):
            tm = re.match(r"</?\s*([a-zA-Z][\w:-]*)", tok)
            name = tm.group(1).lower() if tm else ""
            # atributy
            if not tok.startswith("</") and not _inside(a, rng):
                for am in re.finditer(r'\s([a-zA-Z-]+)="([^"]*)"', tok):
                    an, av = am.group(1), am.group(2)
                    if an in ATTRS or (an == "content" and 'name="description"' in tok):
                        if av.strip() and (CZ_DIA.search(av) or human_html(av)):
                            occ.append(dict(kind="attr", q='"', start=a + am.start(2), end=a + am.end(2),
                                            src=av, ctx="<%s %s>" % (name, an)))
            if name in INLINE:
                run.append((a, b, False))
                continue
            flush()
            if not tok.startswith("</") and not tok.endswith("/>"):
                cls = re.search(r'class="([^"]*)"', tok)
                block.append(name + ("." + cls.group(1).split()[0] if cls and cls.group(1).split() else ""))
                if len(block) > 60:
                    del block[1:20]
            elif tok.startswith("</") and len(block) > 1:
                block.pop()
            continue
        # text
        if a < head_end:
            continue
        run.append((a, b, bool(tok.strip())))
    flush()
    # atribut značky uvnitř přeloženého textového úseku překládá ten úsek — žádné překryvy
    spans = sorted((o["start"], o["end"]) for o in occ if o["kind"] == "html")
    import bisect
    starts = [x[0] for x in spans]

    def covered(pos):
        i = bisect.bisect_right(starts, pos) - 1
        return i >= 0 and spans[i][0] <= pos < spans[i][1]
    occ = [o for o in occ if not (o["kind"] == "attr" and covered(o["start"]))]
    return occ


# ---------------------------------------------------------------- katalog
def load_cat(rel):
    p = cat_path(rel)
    if os.path.exists(p):
        return json.load(io.open(p, encoding="utf-8"))
    return {"page": rel, "lang": LANG, "segments": {}}


def save_cat(rel, cat):
    os.makedirs(CAT_DIR, exist_ok=True)
    tmp = cat_path(rel) + ".tmp"
    io.open(tmp, "w", encoding="utf-8", newline="\n").write(json.dumps(cat, ensure_ascii=False, indent=1))
    os.replace(tmp, cat_path(rel))


class Lock:
    """Zámek katalogu — na jedné stránce může pracovat víc agentů najednou (put)."""
    def __init__(self, rel):
        self.p = cat_path(rel) + ".lock"

    def __enter__(self):
        import time
        os.makedirs(CAT_DIR, exist_ok=True)
        for _ in range(600):
            try:
                self.fd = os.open(self.p, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
                return self
            except FileExistsError:
                time.sleep(0.1)
        raise SystemExit("katalog je zamčený déle než minutu: %s" % self.p)

    def __exit__(self, *a):
        os.close(self.fd)
        os.unlink(self.p)


def part_ids(segs, part):
    """Úseky části k/m — souvislé bloky v pořadí stránky se zhruba stejným objemem textu;
    part=None → všechny."""
    keys = list(segs.keys())
    if not part:
        return set(keys)
    k, m = part
    total = sum(len(segs[x]["src"]) for x in keys) or 1
    out, acc = set(), 0
    for x in keys:
        if min(int(acc * m / total), m - 1) == k - 1:
            out.add(x)
        acc += len(segs[x]["src"])
    return out


def cmd_extract(rel):
    s = czech_base(io.open(page_path(rel), encoding="utf-8").read())
    occ = find_segments(s)
    old = load_cat(rel)["segments"]
    segs = {}
    for o in occ:
        i = seg_id(o["kind"], o["q"], o["src"])
        if i in segs:
            segs[i]["n"] += 1
            continue
        prev = old.get(i, {})
        segs[i] = dict(kind=o["kind"], q=o["q"], src=o["src"], ctx=o["ctx"], n=1,
                       sk=prev.get("sk", ""), keep_czech=prev.get("keep_czech", False))
    cat = {"page": rel, "lang": LANG, "segments": segs}
    save_cat(rel, cat)
    done = sum(1 for v in segs.values() if v["sk"])
    words = sum(len(plain(v["src"]).split()) for v in segs.values())
    dropped = len([k for k in old if k not in segs and old[k].get("sk")])
    print("%s: %d úseků (%d výskytů, ~%d slov), přeloženo %d, zastaralých překladů zahozeno %d"
          % (rel, len(segs), len(occ), words, done, dropped))


def cmd_status(rel, part=None):
    allsegs = load_cat(rel)["segments"]
    ids = part_ids(allsegs, part)
    segs = {k: v for k, v in allsegs.items() if k in ids}
    done = [v for v in segs.values() if v["sk"]]
    by = {}
    for v in segs.values():
        k = v["kind"]
        by.setdefault(k, [0, 0])
        by[k][0] += 1
        by[k][1] += 1 if v["sk"] else 0
    print("%s: přeloženo %d / %d úseků  (%s)" % (rel, len(done), len(segs),
          ", ".join("%s %d/%d" % (k, b, a) for k, (a, b) in sorted(by.items()))))


def cmd_todo(rel, limit=120, offset=0, part=None):
    segs = load_cat(rel)["segments"]
    ids = part_ids(segs, part)
    todo = [dict(id=k, kind=v["kind"], src=v["src"], ctx=v["ctx"], **({"q": v["q"]} if v["kind"] == "js" else {}))
            for k, v in segs.items() if not v["sk"] and k in ids]
    print(json.dumps({"remaining": len(todo), "items": todo[offset:offset + limit]}, ensure_ascii=False, indent=0))


TAG = re.compile(r"</?[a-zA-Z][^>]*>")
PH = re.compile(r"\$\{.*?\}")
NUM = re.compile(r"\d+(?:[.,]\d+)?")


def validate(v, sk):
    """(opravený text, chyby, varování)"""
    errs, warns = [], []
    if not isinstance(sk, str) or not sk.strip():
        return sk, ["prázdný překlad"], warns
    src = v["src"]

    def tags(x):   # hodnoty viditelných atributů (title, placeholder…) se smí přeložit
        return sorted(ATTR_IN_TAG.sub(lambda m: ' %s=""' % m.group(1), t) for t in TAG.findall(x))
    if tags(src) != tags(sk):
        errs.append("značky HTML se liší od originálu")
    if sorted(PH.findall(src)) != sorted(PH.findall(sk)):
        errs.append("zástupné výrazy ${…} se liší")
    if v["kind"] in ("js", "css"):
        q = v["q"]
        if q in "\"'":
            if "\n" in sk:
                errs.append("zalomení řádku v řetězci — použijte \\n jako v originálu")
            sk = re.sub(r'(?<!\\)' + re.escape(q), "\\" + q, sk)
            if sk.endswith("\\") and not sk.endswith("\\\\"):
                errs.append("řetězec končí zpětným lomítkem")
        if q == "`" and re.search(r"(?<!\\)`", sk):
            sk = re.sub(r"(?<!\\)`", "\\`", sk)
        for esc in ("\\n", "\\u00a0", "\\u2009", "\\u202f"):
            if src.count(esc) and not sk.count(esc):
                warns.append("chybí %s z originálu" % esc)
    if v["kind"] == "attr":
        sk = sk.replace('"', "&quot;")
    if CZ_ONLY.search(plain(sk)) and not v.get("keep_czech"):
        errs.append("obsahuje ě/ř/ů — česká písmena ve slovenštině nejsou")
    if sorted(NUM.findall(plain(src))) != sorted(NUM.findall(plain(sk))):
        warns.append("čísla se liší od originálu")
    return sk, errs, warns


def cmd_put(rel, path):
    data = json.load(io.open(path, encoding="utf-8"))
    with Lock(rel):
        _put(rel, data)


def _put(rel, data):
    cat = load_cat(rel)
    segs = cat["segments"]
    ok = bad = 0
    for k, val in data.items():
        if k not in segs:
            print("  %s: neznámé id" % k)
            bad += 1
            continue
        keep = False
        if isinstance(val, dict):
            keep = bool(val.get("keep_czech"))
            val = val.get("sk", "")
        segs[k]["keep_czech"] = keep or segs[k].get("keep_czech", False)
        fixed, errs, warns = validate(segs[k], val)
        if errs:
            bad += 1
            print("  ODMÍTNUTO %s: %s\n     src: %s\n     sk:  %s" % (k, "; ".join(errs), segs[k]["src"][:160], str(val)[:160]))
            continue
        for w in warns:
            print("  pozor %s: %s" % (k, w))
        segs[k]["sk"] = fixed
        ok += 1
    save_cat(rel, cat)
    left = sum(1 for v in segs.values() if not v["sk"])
    print("uloženo %d, odmítnuto %d, zbývá %d" % (ok, bad, left))


def build_sk(rel):
    cz_full = io.open(page_path(rel), encoding="utf-8").read()
    s = czech_base(cz_full)
    segs = load_cat(rel)["segments"]
    occ = find_segments(s)
    order = sorted(occ, key=lambda o: o["start"])
    for x, y in zip(order, order[1:]):
        if y["start"] < x["end"]:
            raise SystemExit("překrývající se úseky v %s (%s / %s) — sestavení by poškodilo stránku"
                             % (rel, x["src"][:40], y["src"][:40]))
    missing = 0
    for o in sorted(occ, key=lambda o: o["start"], reverse=True):
        v = segs.get(seg_id(o["kind"], o["q"], o["src"]))
        if not v or not v["sk"]:
            missing += 1
            continue
        s = s[:o["start"]] + v["sk"] + s[o["end"]:]
    return s, missing, len(occ)


def cmd_apply(rel):
    s, missing, total = build_sk(rel)
    cz_name = os.path.basename(page_path(rel))
    sk_name = os.path.basename(sk_path(rel))
    alts = {"cs": cz_name, LANG: sk_name}
    for lg in i18n.LANGS:                      # další už existující jazykové verze stránky
        if lg != LANG and os.path.exists(i18n.lang_sibling(page_path(rel), lg)):
            alts[lg] = os.path.basename(i18n.lang_sibling(page_path(rel), lg))
    new, miss, failed = i18n.localize_html(s, content_lang=LANG, alternates=alts)
    if miss or failed:
        print("CHYBA lišty:", miss, failed)
        return 1
    io.open(sk_path(rel), "w", encoding="utf-8", newline="\n").write(new)
    # česká stránka dostane odkaz na slovenskou verzi
    cz_full = io.open(page_path(rel), encoding="utf-8").read()
    cz_new, miss, failed = i18n.localize_html(cz_full, content_lang="cs", alternates=alts)
    if not (miss or failed) and cz_new != cz_full:
        io.open(page_path(rel), "w", encoding="utf-8", newline="\n").write(cz_new)
    print("%s → %s  (%d výskytů, nepřeloženo %d)" % (rel, os.path.relpath(sk_path(rel), ROOT), total, missing))
    return 0


def cmd_check(rel):
    p = sk_path(rel)
    if not os.path.exists(p):
        print("chybí", p)
        return 1
    s = io.open(p, encoding="utf-8").read()
    probs = 0
    segs = load_cat(rel)["segments"]
    left = [k for k, v in segs.items() if not v["sk"]]
    if left:
        probs += 1
        print("nepřeložené úseky: %d (např. %s)" % (len(left), ", ".join(left[:8])))
    body = re.sub(r"<!--SITE-LANG-->.*?<!--/SITE-LANG-->|<!--SL-->.*?<!--/SL-->", "", s, flags=re.S)
    body = i18n.GROUP_RE.sub("", body)
    body = re.sub(r"<lang-([a-z]{2})\b.*?</lang-\1>", "", body, flags=re.S)
    keep = {v["sk"] for v in segs.values() if v.get("keep_czech")}
    hits = []
    for o in find_segments(body):
        t = plain(o["src"])
        if CZ_ONLY.search(t) and o["src"] not in keep:
            hits.append(t.strip()[:90])
    if hits:
        probs += 1
        print("česká písmena ě/ř/ů na slovenské stránce: %d, např.:" % len(hits))
        for h in hits[:12]:
            print("   ", h)
    # syntaxe skriptů
    node_bad = 0
    for i, code in enumerate(re.findall(r"<script[^>]*>(.*?)</script>", s, re.S)):
        with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as f:
            f.write(code)
            tmp = f.name
        r = subprocess.run(["node", "--check", tmp], capture_output=True, text=True, encoding="utf-8")
        os.unlink(tmp)
        if r.returncode:
            node_bad += 1
            print("syntaxe skriptu %d: %s" % (i, (r.stderr or "").strip().splitlines()[-1:] if r.stderr else "chyba"))
    if node_bad:
        probs += 1
    # přeložený řetězec, který je zároveň hodnotou nepřekládaného atributu (možný klíč)
    attrs = set(re.findall(r'\s(?:data-(?!title|lbl|hl)[\w-]+|value|id|name|for)="([^"]*)"', czech_base(
        io.open(page_path(rel), encoding="utf-8").read())))
    risky = [v["src"] for v in segs.values() if v["kind"] == "js" and v["sk"] and v["sk"] != v["src"]
             and v["src"] in attrs]
    if risky:
        print("POZOR: přeložené řetězce, které jsou zároveň hodnotou atributu v HTML (možný klíč): %s" % risky[:10])
    print("VÝSLEDEK:", "v pořádku" if not probs else "%d druhů problémů" % probs)
    return 1 if probs else 0


if __name__ == "__main__":
    a = sys.argv[1:]
    if len(a) < 2:
        print(__doc__)
        sys.exit(1)
    cmd, rel = a[0], a[1]
    part = None
    if "--part" in a:                       # --part 1/2 = první polovina úseků stránky
        k, m = a[a.index("--part") + 1].split("/")
        part = (int(k), int(m))
    if cmd == "extract":
        cmd_extract(rel)
    elif cmd == "status":
        cmd_status(rel, part)
    elif cmd == "todo":
        lim = int(a[a.index("--limit") + 1]) if "--limit" in a else 120
        off = int(a[a.index("--offset") + 1]) if "--offset" in a else 0
        cmd_todo(rel, lim, off, part)
    elif cmd == "put":
        cmd_put(rel, a[2])
    elif cmd == "apply":
        sys.exit(cmd_apply(rel))
    elif cmd == "check":
        sys.exit(cmd_check(rel))
    else:
        print(__doc__)
        sys.exit(1)
