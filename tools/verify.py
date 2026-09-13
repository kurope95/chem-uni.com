# -*- coding: utf-8 -*-
import re, sys, os, glob, subprocess, tempfile
try: sys.stdout.reconfigure(encoding="utf-8")
except Exception: pass
BASE = r"C:\Claude Code\Claude Code\Doučovanie"
files = sorted(glob.glob(os.path.join(BASE,"obecna-fyzikalni-chemie","*.html")))
files = [f for f in files if not f.endswith("index.html")]
files.append(os.path.join(BASE,"periodicka-tabulka","index.html"))
VOID = {"area","base","br","col","embed","hr","img","input","link","meta","source","track","wbr","path","circle","rect","line","polyline","polygon","ellipse","use","stop","text"}
bad = 0
for f in files:
    s = open(f, encoding="utf-8").read()
    body = re.sub(r"<script\b.*?</script>", "", s, flags=re.S|re.I)
    body = re.sub(r"<style\b.*?</style>", "", body, flags=re.S|re.I)
    body = re.sub(r"<!--.*?-->", "", body, flags=re.S)
    stack, err = [], []
    for m in re.finditer(r"<(/?)([a-zA-Z][\w:-]*)([^>]*?)(/?)>", body):
        close, tag, attrs, self_ = m.group(1), m.group(2).lower(), m.group(3), m.group(4)
        if tag in ("html","body","head") or tag in VOID or self_ == "/": continue
        if not close: stack.append(tag)
        else:
            if stack and stack[-1] == tag: stack.pop()
            else: err.append("</%s> na pozici %d, na vrcholu %s" % (tag, m.start(), stack[-1] if stack else "-"))
    js = "\n;\n".join(re.findall(r"<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>", s, flags=re.S|re.I))
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as t:
        t.write(js); tp = t.name
    r = subprocess.run(["node","--check",tp], capture_output=True, text=True)
    os.unlink(tp)
    ok = (not stack) and (not err) and r.returncode == 0
    if not ok: bad += 1
    print("%-46s znacky:%-4s node:%-4s %s" % (
        os.path.relpath(f, BASE), "OK" if (not stack and not err) else "CHYBA",
        "OK" if r.returncode==0 else "CHYBA",
        ("" if ok else (str(err[:2]) + " zbytek:" + str(stack[:3]) + " " + r.stderr.strip().splitlines()[0] if r.stderr else ""))))
print("\nsouboru: %d, vadnych: %d" % (len(files), bad))
