# -*- coding: utf-8 -*-
"""build.py — složí self-contained studijní průvodce z dílů a zkontroluje ho.

Použití:  python build.py <složka_s_díly>

Složka musí obsahovat:
  meta.json                {"slug":"…", "title":"…", "short":"…", "desc":"…", "prefix":"…"}
  NN-*.html                díly těla dokumentu (obsah <main>), skládají se podle názvu
  NN-*.js                  díly skriptu (uvnitř IIFE, strict mode), skládají se podle názvu

Výstup:  C:\\Claude Code\\Claude Code\\Doučovanie\\<slug>.html  + zpráva o kontrole.
Kontroly: node --check skriptu, párování HTML značek, duplicitní id, {{placeholdery}},
          BANK klíče vs data-quiz, data-done vs id sekcí, $("#id") vs existující id,
          href="#…" cíle, statistiky (kapitoly, modely, kvízy, otázky, příklady).
"""
import io, os, re, sys, json, glob, subprocess, tempfile
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass
from html.parser import HTMLParser

HERE = os.path.dirname(os.path.abspath(__file__))
PROJECT = r"C:\Claude Code\Claude Code\Doučovanie"

def read(p):
    with io.open(p, encoding="utf-8") as f:
        return f.read()

def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(2)
    d = os.path.abspath(sys.argv[1])
    meta = json.loads(read(os.path.join(d, "meta.json")))
    for k in ("slug", "title", "short", "desc", "prefix"):
        if not meta.get(k): print("ERROR: meta.json missing", k); sys.exit(1)
    if not re.match(r"^[a-z0-9-]+$", meta["slug"]): print("ERROR: slug must be [a-z0-9-]"); sys.exit(1)
    if not re.match(r"^[a-z0-9]+$", meta["prefix"]): print("ERROR: prefix must be [a-z0-9]"); sys.exit(1)

    A = read(os.path.join(HERE, "kostra-A.html"))
    B = read(os.path.join(HERE, "kostra-B.html"))
    C = read(os.path.join(HERE, "kostra-C.html"))
    A = (A.replace("{{DESCRIPTION}}", meta["desc"].replace('"', "&quot;"))
          .replace("{{TITLE}}", meta["title"]).replace("{{SHORT}}", meta["short"]))
    B = B.replace("{{PREFIX}}", meta["prefix"])

    html_parts = sorted(glob.glob(os.path.join(d, "[0-9][0-9]-*.html")))
    js_parts = sorted(glob.glob(os.path.join(d, "[0-9][0-9]-*.js")))
    if not html_parts: print("ERROR: no NN-*.html parts"); sys.exit(1)
    if not js_parts: print("ERROR: no NN-*.js parts"); sys.exit(1)
    print("HTML parts:", ", ".join(os.path.basename(p) for p in html_parts))
    print("JS parts:  ", ", ".join(os.path.basename(p) for p in js_parts))

    body = "\n".join(read(p).rstrip("\n") + "\n" for p in html_parts)
    script = "\n".join(read(p).rstrip("\n") + "\n" for p in js_parts)
    out = A + body + B + script + C

    errors, warns = [], []

    # ---- placeholdery ----
    for m in re.finditer(r"\{\{[A-Z_]+\}\}", out):
        errors.append("placeholder left in output: " + m.group(0))

    # ---- node --check ----
    full_script = out[out.index("<script>") + len("<script>"): out.rindex("</script>")]
    tmp = os.path.join(tempfile.gettempdir(), "build_check_" + meta["slug"] + ".js")
    with io.open(tmp, "w", encoding="utf-8") as f: f.write(full_script)
    try:
        r = subprocess.run(["node", "--check", tmp], capture_output=True, text=True, encoding="utf-8", errors="replace")
        if r.returncode != 0:
            errors.append("node --check failed:\n" + (r.stderr or r.stdout)[:2500])
    except FileNotFoundError:
        warns.append("node not found — JS syntax not checked")

    # ---- HTML párování značek (jen v těle mimo <script>/<style>) ----
    body_html = out[out.index("<body>"): out.rindex("<script>")]
    VOID = {"br", "hr", "img", "input", "meta", "link", "path", "circle", "rect", "line", "polyline", "polygon", "use", "wbr"}
    class P(HTMLParser):
        def __init__(s):
            super().__init__(convert_charrefs=False); s.stack = []; s.ids = {}; s.errs = []; s.hrefs = []
        def handle_starttag(s, tag, attrs):
            a = dict(attrs)
            if "id" in a:
                s.ids.setdefault(a["id"], []).append(s.getpos()[0])
            if tag == "a" and a.get("href", "").startswith("#"):
                s.hrefs.append((a["href"][1:], s.getpos()[0]))
            if tag not in VOID: s.stack.append((tag, s.getpos()[0]))
        def handle_startendtag(s, tag, attrs):
            s.handle_starttag(tag, attrs)
            if tag not in VOID and s.stack and s.stack[-1][0] == tag: s.stack.pop()
        def handle_endtag(s, tag):
            if tag in VOID: return
            if s.stack and s.stack[-1][0] == tag:
                s.stack.pop(); return
            # hledej níž v zásobníku
            for i in range(len(s.stack) - 1, -1, -1):
                if s.stack[i][0] == tag:
                    for t, l in s.stack[i + 1:]:
                        s.errs.append("unclosed <%s> opened at body line %d (closed by </%s> at line %d)" % (t, l, tag, s.getpos()[0]))
                    del s.stack[i:]; return
            s.errs.append("stray </%s> at body line %d" % (tag, s.getpos()[0]))
    p = P(); p.feed(body_html)
    for t, l in p.stack:
        if t in ("body", "html"): continue
        p.errs.append("never closed <%s> opened at body line %d" % (t, l))
    body_offset = out[: out.index("<body>")].count("\n")
    for e in p.errs:
        errors.append(re.sub(r"body line (\d+)", lambda m: "line %d" % (int(m.group(1)) + body_offset), e))
    for i, ls in p.ids.items():
        if len(ls) > 1: errors.append("duplicate id '%s' at lines %s" % (i, [l + body_offset for l in ls]))
    ids = set(p.ids)
    for h, l in p.hrefs:
        if h and h not in ids: errors.append("href='#%s' (line %d) has no target id" % (h, l + body_offset))

    # ---- sekce, kvízy, done ----
    secs = re.findall(r'<section class="chapter" id="([\w-]+)"', body_html)
    if not secs: errors.append("no <section class=\"chapter\" id=…>")
    if "r0" not in secs: warns.append("no rychloprůchod section id=r0")
    quizzes = re.findall(r'data-quiz="([\w-]+)"', body_html)
    banks = set(re.findall(r'\bBANK\.([\w]+)\s*=', script))
    for q in quizzes:
        if q not in banks: errors.append("data-quiz='%s' has no BANK.%s in script" % (q, q))
    for b in banks:
        if b not in quizzes: warns.append("BANK.%s defined but no <div class=\"quiz\" data-quiz=\"%s\">" % (b, b))
    for dd in re.findall(r'data-done="([\w-]+)"', body_html):
        if dd not in secs: errors.append("data-done='%s' is not a section id" % dd)
    for s in secs:
        if ('data-done="%s"' % s) not in body_html: warns.append("section '%s' has no .chapter-done" % s)

    # ---- $("#id") ve skriptu ----
    js_ids = set(re.findall(r'\$\$?\(\s*["\']#([\w-]+)', script))
    js_ids |= set(re.findall(r'getElementById\(\s*["\']([\w-]+)', script))
    for j in sorted(js_ids):
        if j not in ids: errors.append("script references #%s but no element has that id" % j)
    for req in ("initAll", "bind", "redrawAll"):
        if not re.search(r"\bfunction\s+%s\s*\(" % req, script): errors.append("script must define function %s()" % req)
    if "window.redrawAll" not in script: warns.append("missing 'window.redrawAll = redrawAll;'")
    if not re.search(r"\bvar\s+GLOSS\s*=", script): errors.append("script must define var GLOSS = [...]")
    if '"termo."' in script: errors.append("wrong store prefix 'termo.' in script")

    # ---- statistiky ----
    def count(pat, s): return len(re.findall(pat, s))
    stats = {
        "sections": len(secs),
        "sblocks (rychlo)": count(r'class="sblock"', body_html),
        "panels (.panel)": count(r'<div class="panel(?:\s|")', body_html),
        "svgwraps": count(r'class="svgwrap', body_html),
        "worked examples": count(r'data-worked', body_html),
        "exboxes (rychlo)": count(r'class="exbox"', body_html),
        "quizzes": len(quizzes),
        "syllabus rows": count(r'class="syl-row"', body_html),
        "covermap links": count(r'<div class="covermap">', body_html) and len(re.findall(r'<a href="#[\w-]+">[^<]+</a>', body_html[body_html.find('class="covermap"'):body_html.find('</div>', body_html.find('class="covermap"'))])),
        "gloss entries": len(re.findall(r'^\s*\["', script[script.find("var GLOSS"):script.find("];", script.find("var GLOSS"))], re.M)) if "var GLOSS" in script else 0,
        "cheat cards": count(r'class="cheat-card"', body_html),
    }
    qcounts = {}
    for m in re.finditer(r'\bBANK\.(\w+)\s*=\s*\[', script):
        start = m.end(); depth = 1; i = start
        while i < len(script) and depth:
            if script[i] == "[": depth += 1
            elif script[i] == "]": depth -= 1
            i += 1
        qcounts[m.group(1)] = count(r'\{\s*t\s*:\s*"(single|multi|num)"', script[start:i])
    stats["questions total"] = sum(qcounts.values())
    # pozice správných odpovědí u single
    pos = re.findall(r'\bc\s*:\s*(\d)\s*,', script)
    dist = {str(k): pos.count(str(k)) for k in range(5)}
    # ---- hero čísla ----
    hero_nums = re.findall(r'<span class="tag">([^<]*?\d[^<]*)</span>', body_html[: body_html.find('class="paths"')] if 'class="paths"' in body_html else "")
    # ---- velikost ----
    size = len(out.encode("utf-8"))
    lines = out.count("\n")

    # ---- zápis ----
    dst = os.path.join(PROJECT, meta["slug"] + ".html")
    with io.open(dst, "w", encoding="utf-8", newline="\n") as f: f.write(out)

    print("\n=== BUILD:", dst)
    print("size: %d B (%.0f KB), lines: %d" % (size, size / 1024, lines))
    for k, v in stats.items(): print("  %-22s %s" % (k, v))
    print("  questions per bank:", json.dumps(qcounts, ensure_ascii=False))
    print("  correct-answer positions (single c:N):", dist)
    print("  hero meta tags:", hero_nums)
    print("  sections:", secs)
    if size < 200 * 1024: warns.append("file is under 200 KB — reference is 296 KB; content is probably too thin")
    if stats["questions total"] < 70: warns.append("fewer than 70 questions in total")
    if stats["panels (.panel)"] < 10: warns.append("fewer than 10 .panel models")
    if stats["worked examples"] < 8: warns.append("fewer than 8 worked examples")
    single_total = sum(dist.values())
    if single_total and dist["0"] / single_total > 0.5: warns.append("correct answer is at position 0 in >50%% of single-choice questions (%s) — vary it" % dist)
    print("\n=== WARNINGS (%d)" % len(warns))
    for w in warns: print("  WARN:", w)
    print("\n=== ERRORS (%d)" % len(errors))
    for e in errors: print("  ERROR:", e)
    print("\nRESULT:", "OK" if not errors else "FAILED")
    sys.exit(0 if not errors else 1)

if __name__ == "__main__":
    main()
