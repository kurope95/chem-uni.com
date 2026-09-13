# -*- coding: utf-8 -*-
"""Vytáhne ze SESTAVENÉHO souboru všechny rovnice se šipkou a zkontroluje bilanci."""
import io, re, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
try: sys.stdout.reconfigure(encoding="utf-8")
except Exception: pass
from check_eq import side

SRC = r"C:\Claude Code\Claude Code\Doučovanie\neprechodne-kovy.html"
t = io.open(SRC, encoding="utf-8").read()

# odstranit značky, ale zachovat obsah; &nbsp; -> mezera
def clean(s):
    s = re.sub(r"<[^>]+>", "", s)
    s = s.replace("&nbsp;", " ").replace("&gt;", ">").replace("&lt;", "<").replace("&amp;", "&")
    s = s.replace("\u00a0", " ")
    return re.sub(r"\s+", " ", s).strip()

# kandidáti: každý úsek textu obsahující → nebo ⇌
cands = set()
for m in re.finditer(r"[^<>\"']{0,220}[→⇌][^<>\"']{0,220}", t):
    frag = clean(m.group(0))
    for part in re.split(r"[;·|]| {3,}", frag):
        part = part.strip(" .,")
        if "→" not in part and "⇌" not in part:
            continue
        cands.add(part)

ALLOWED = set("0123456789 ()[]·.,+→⇌⁻⁺⁰¹²³⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉xnesabcdefghijklmopqrtuvwyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
ok = bad = skipped = 0
problems = []
for c in sorted(cands):
    if "⇌" in c:
        c2 = c.replace("⇌", "→")
    else:
        c2 = c
    if c2.count("→") != 1:
        skipped += 1; continue
    L, R = c2.split("→")
    L, R = L.strip(), R.strip()
    if not L or not R: skipped += 1; continue
    # jen věci, které vypadají jako rovnice: každý člen začíná číslicí nebo velkým písmenem nebo [ (
    def looks(s):
        for term in s.split("+"):
            term = term.strip()
            if not term: return False
            if not re.match(r"^(\d+\s+)?[\[A-Z(]", term): return False
            if re.search(r"[a-zá-ž]{4,}", term):   # dlouhé české slovo → není vzorec
                return False
        return True
    if not (looks(L) and looks(R)):
        skipped += 1; continue
    try:
        la, lc = side(L); ra, rc = side(R)
        le = la.pop("e", 0); re_ = ra.pop("e", 0)
        lc -= le; rc -= re_
    except Exception as ex:
        problems.append(("PARSE", c, str(ex))); bad += 1; continue
    if la != ra or abs(lc - rc) > 1e-9:
        diff = {k: (la.get(k, 0), ra.get(k, 0)) for k in sorted(set(la) | set(ra)) if la.get(k, 0) != ra.get(k, 0)}
        problems.append(("BILANCE", c, "atomy %s náboj %s/%s" % (diff, lc, rc))); bad += 1
    else:
        ok += 1

print("kandidátů:", len(cands), "| vyhodnoceno jako rovnice:", ok + bad, "| přeskočeno (text, ne rovnice):", skipped)
print("v pořádku:", ok, "| chybných:", bad)
for kind, c, d in problems:
    print(" ", kind, "|", c)
    print("      ", d)
