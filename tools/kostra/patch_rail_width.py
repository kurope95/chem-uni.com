# -*- coding: utf-8 -*-
"""1) přesune přepínač režimu + Vynulovat nad seznam kapitol (přes injektované CSS)
   2) rozšíří textový sloupec na 100ch ve všech průvodcích i v kostře"""
import io, os, re, sys, glob
sys.stdout.reconfigure(encoding="utf-8")

HERE = os.path.dirname(os.path.abspath(__file__))
PROJ = r"C:\Claude Code\Claude Code\Doučovanie"
SUB = os.path.join(PROJ, "maturitni-okruhy")

# ---------- 1) pořadí prvků v levé liště ----------
P = os.path.join(HERE, "make_site.py")
s = io.open(P, encoding="utf-8").read()

ANCHOR = "/* ---- testy a mini-testy: ať je student nepřehlédne ---- */"
RAIL = """/* ---- levá lišta: ovládání nad seznam kapitol ---- */
.rail{justify-content:flex-start}
.rail .sitenav{order:0}
.rail .rail-brand{order:1}
.rail .rail-tools{order:2;margin-top:0;padding-bottom:.15rem}
.rail .meter{order:3;padding-top:0}
.rail nav{order:4}
.rail .rail-tools .btn{flex:1;justify-content:center}

""" + ANCHOR

if "levá lišta: ovládání nad seznam kapitol" in s:
    print("pořadí lišty: už je v CSS")
else:
    assert ANCHOR in s, "kotva pro CSS lišty nenalezena"
    s = s.replace(ANCHOR, RAIL, 1)
    io.open(P, "w", encoding="utf-8", newline="\n").write(s)
    print("make_site.py: doplněno pořadí prvků v liště")

# ---------- 2) šířka textu ----------
def widen(path, label):
    t = io.open(path, encoding="utf-8").read()
    if "min(100%,100ch)" in t:
        return "%s: už rozšířeno" % label
    before = len(t.encode())
    t = t.replace(".prose{max-width:68ch;", ".prose{max-width:min(100%,100ch);", 1)
    n = len(re.findall(r"max-width:68ch", t)) + len(re.findall(r"max-width:70ch", t))
    t = t.replace("max-width:68ch", "max-width:min(100%,100ch)")
    t = t.replace("max-width:70ch", "max-width:min(100%,100ch)")
    # už dříve upravené mezistupně srovnat
    t = t.replace("min(100%,93ch)", "min(100%,100ch)")
    io.open(path, "w", encoding="utf-8", newline="\n").write(t)
    return "%s: rozšířeno (+%d dalších míst, %+d B)" % (label, n, len(t.encode()) - before)

for f in sorted(glob.glob(os.path.join(SUB, "*.html"))):
    if os.path.basename(f) == "index.html":
        continue
    print("  " + widen(f, os.path.basename(f)[:-5]))

k = os.path.join(HERE, "kostra-A.html")
if os.path.exists(k):
    print("  " + widen(k, "kostra-A.html"))

# kontrola
rest = 0
for f in glob.glob(os.path.join(SUB, "*.html")) + [k]:
    if os.path.exists(f):
        rest += len(re.findall(r"max-width:6[08]ch|max-width:70ch", io.open(f, encoding="utf-8").read()))
print("zbývá starých úzkých šířek:", rest)
