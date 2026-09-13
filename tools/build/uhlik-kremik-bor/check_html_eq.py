# -*- coding: utf-8 -*-
"""Vytáhne z hotového HTML všechny rovnice a zkontroluje bilanci atomů i náboje."""
import io, re, sys, html
sys.path.insert(0, ".")
import check_eq as ck
sys.stdout.reconfigure(encoding="utf-8")

SRC = r"C:\Claude Code\Claude Code\Doučovanie\uhlik-kremik-bor.html"
s = io.open(SRC, encoding="utf-8").read()

# rovnice žijí v <span class="chem">…</span>; vezmeme jen ty se šipkou
cands = re.findall(r'<span class=[\'"]chem[\'"]>(.*?)</span>', s, re.S)
cands += re.findall(r'"<span class=.chem.>(.*?)</span>', s, re.S)

def clean(t):
    t = re.sub(r"<sub>(.*?)</sub>", r"\1", t)
    t = re.sub(r"<sup>(.*?)</sup>", r"\1", t)
    t = re.sub(r"<[^>]+>", "", t)
    t = html.unescape(t).replace("\u00a0", " ").replace("\u2009", " ")
    return " ".join(t.split())

# co se nedá bilancovat jako celá rovnice (schémata, obecné vzorce, strukturní motivy)
SKIP_SUBSTR = [
    "…", "ₙ", "ₓ", "R", "x H₂O", "xH₂O", "(s)", "SiX₄", "BY₃", "CX₄", "SiY₄",
    "M(", "[He]", "[Ne]", "⇌ Mⁿ", "δ", "Si—O—Si", "—Si—", "≡", "=C=", "Si(OH)",
]
ARROWS = ["→", "⇌"]

seen, checked, bad, skipped = set(), 0, [], 0
for c in cands:
    e = clean(c)
    if not any(a in e for a in ARROWS):
        continue
    if e in seen:
        continue
    seen.add(e)
    # zjednodušit zápis: odstranit stavové značky a komentáře za rovnicí
    eq = e.replace("(s)", "").replace("(g)", "").replace("(l)", "").replace("(aq)", "")
    eq = eq.replace("⇌", "→")
    if eq.count("→") != 1:
        skipped += 1; continue
    L, R = eq.split("→")
    if any(k in eq for k in ("…", "ₙ", "ₓ", "δ", "≡", "=C=")) or re.search(r"\bR\b", eq) or "x H₂O" in eq or "xH₂O" in eq:
        skipped += 1; continue
    try:
        la, lq = ck.side(L); ra, rq = ck.side(R)
    except Exception as ex:
        skipped += 1; continue
    if not la or not ra:
        skipped += 1; continue
    checked += 1
    if la != ra or lq != rq:
        diff = {k: (la.get(k, 0), ra.get(k, 0)) for k in set(la) | set(ra) if la.get(k, 0) != ra.get(k, 0)}
        bad.append((e, diff, lq, rq))

print("nalezeno rovnic se šipkou: %d" % len(seen))
print("zkontrolováno bilančně:    %d" % checked)
print("přeskočeno (schémata, obecné vzorce, polymery): %d" % skipped)
print("CHYBNÝCH: %d" % len(bad))
for e, d, lq, rq in bad:
    print("   %s\n      atomy %s  náboj L=%+d P=%+d" % (e, d, lq, rq))
