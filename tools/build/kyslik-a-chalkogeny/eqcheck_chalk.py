# -*- coding: utf-8 -*-
"""Kontrola bilance atomu a naboje ve vsech rovnicich pouzitych v pruvodci."""
import re, sys
try: sys.stdout.reconfigure(encoding="utf-8")
except Exception: pass

SUB = {"₀":"0","₁":"1","₂":"2","₃":"3","₄":"4","₅":"5","₆":"6","₇":"7","₈":"8","₉":"9"}
SUP = {"⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","⁺":"+","⁻":"-"}

def norm(s):
    return "".join(SUB.get(ch, ch) for ch in s)

def parse_formula(f):
    i = 0; stack = [{}]
    while i < len(f):
        c = f[i]
        if c in "([":
            stack.append({}); i += 1
        elif c in ")]":
            i += 1
            m = re.match(r"^(\d+)", f[i:])
            n = int(m.group(1)) if m else 1
            if m: i += m.end()
            top = stack.pop()
            for k, v in top.items():
                stack[-1][k] = stack[-1].get(k, 0) + v * n
        elif c.isupper():
            m = re.match(r"^([A-Z][a-z]?)(\d*)", f[i:])
            el = m.group(1); n = int(m.group(2)) if m.group(2) else 1
            stack[-1][el] = stack[-1].get(el, 0) + n
            i += m.end()
        elif c in " \t":
            i += 1
        else:
            raise ValueError("neznamy znak %r v %r" % (c, f))
    if len(stack) != 1: raise ValueError("nezavrena zavorka v %r" % f)
    return stack[0]

def parse_species(t):
    t = t.strip(); charge = 0
    m = re.search(r"((?:[⁰¹²³⁴⁵⁶⁷⁸⁹]*[⁺⁻])+)$", t)
    if m:
        cs = "".join(SUP[c] for c in m.group(1))
        t = t[:m.start()]
        sign = 1 if cs.endswith("+") else -1
        num = cs[:-1]
        charge = sign * (int(num) if num else 1)
    t = norm(t)
    parts = t.split("·")
    total = {}
    for pi, p in enumerate(parts):
        mult = 1.0
        m = re.match(r"^(\d+(?:\.\d+)?)(.*)$", p)
        if m and pi > 0:
            mult = float(m.group(1)); p = m.group(2)
        for k, v in parse_formula(p).items():
            total[k] = total.get(k, 0) + v * mult
    return total, charge

def side(s):
    atoms = {}; charge = 0
    for term in s.split("+"):
        term = term.strip()
        if not term: continue
        n = 1.0
        m = re.match(r"^(\d+(?:[.,]\d+)?)\s+(.*)$", term)
        if m:
            n = float(m.group(1).replace(",", ".")); term = m.group(2).strip()
        if term in ("e⁻", "e-"):
            charge += -1 * n; continue
        d, ch = parse_species(term)
        for k, v in d.items():
            atoms[k] = atoms.get(k, 0) + v * n
        charge += ch * n
    return atoms, charge

def check(eq):
    for arrow in ("⇌", "→"):
        if arrow in eq:
            L, R = eq.split(arrow); break
    else:
        return "NO ARROW"
    la, lc = side(L); ra, rc = side(R)
    prob = []
    for k in sorted(set(la) | set(ra)):
        if abs(la.get(k, 0) - ra.get(k, 0)) > 1e-9:
            prob.append("%s: %g vs %g" % (k, la.get(k, 0), ra.get(k, 0)))
    if abs(lc - rc) > 1e-9:
        prob.append("naboj: %+g vs %+g" % (lc, rc))
    return "; ".join(prob)

EQS = r"""
2 KClO₃ → 2 KCl + 3 O₂
2 H₂O₂ → 2 H₂O + O₂
2 KMnO₄ → K₂MnO₄ + MnO₂ + O₂
2 HgO → 2 Hg + O₂
2 Ag₂O → 4 Ag + O₂
2 KNO₃ → 2 KNO₂ + O₂
2 BaO₂ → 2 BaO + O₂
2 H₂O → 2 H₂ + O₂
4 OH⁻ → 2 H₂O + O₂ + 4 e⁻
2 Na₂O₂ + 2 H₂O → 4 NaOH + O₂
4 KO₂ + 2 CO₂ → 2 K₂CO₃ + 3 O₂
4 KO₂ + 2 H₂O → 4 KOH + 3 O₂
2 MnO₂ + 2 H₂SO₄ → 2 MnSO₄ + 2 H₂O + O₂
5 H₂O₂ + 2 KMnO₄ + 3 H₂SO₄ → K₂SO₄ + 2 MnSO₄ + 8 H₂O + 5 O₂
3 O₂ → 2 O₃
O₃ → O₂ + O
O₂ → 2 O
O + O₂ → O₃
Cl + O₃ → ClO + O₂
ClO + O → Cl + O₂
O + O₃ → 2 O₂
CCl₂F₂ → CClF₂ + Cl
2 KI + O₃ + H₂O → I₂ + 2 KOH + O₂
2 Ag + O₃ → Ag₂O + O₂
4 Li + O₂ → 2 Li₂O
2 Na + O₂ → Na₂O₂
K + O₂ → KO₂
Ba + O₂ → BaO₂
2 Mg + O₂ → 2 MgO
S + O₂ → SO₂
C + O₂ → CO₂
4 P + 5 O₂ → P₄O₁₀
3 Fe + 2 O₂ → Fe₃O₄
CH₄ + 2 O₂ → CO₂ + 2 H₂O
CaO + H₂O → Ca(OH)₂
Na₂O + H₂O → 2 NaOH
O²⁻ + H₂O → 2 OH⁻
SO₃ + H₂O → H₂SO₄
CO₂ + H₂O → H₂CO₃
P₄O₁₀ + 6 H₂O → 4 H₃PO₄
Cl₂O₇ + H₂O → 2 HClO₄
N₂O₅ + H₂O → 2 HNO₃
Mn₂O₇ + H₂O → 2 HMnO₄
Al₂O₃ + 6 HCl → 2 AlCl₃ + 3 H₂O
Al₂O₃ + 2 NaOH + 3 H₂O → 2 Na[Al(OH)₄]
ZnO + 2 HCl → ZnCl₂ + H₂O
ZnO + 2 NaOH + H₂O → Na₂[Zn(OH)₄]
BaO₂ + H₂SO₄ → BaSO₄ + H₂O₂
H₂S₂O₈ + 2 H₂O → 2 H₂SO₄ + H₂O₂
2 HSO₄⁻ → S₂O₈²⁻ + 2 H⁺ + 2 e⁻
H₂O₂ + 2 KI + H₂SO₄ → I₂ + K₂SO₄ + 2 H₂O
SO₃²⁻ + H₂O₂ → SO₄²⁻ + H₂O
Cl₂ + H₂O₂ → 2 HCl + O₂
Ag₂O + H₂O₂ → 2 Ag + H₂O + O₂
2 KMnO₄ + H₂SO₄ → K₂SO₄ + 2 MnO₂ + H₂O + O₃
4 FeS₂ + 11 O₂ → 2 Fe₂O₃ + 8 SO₂
2 ZnS + 3 O₂ → 2 ZnO + 2 SO₂
2 CuS + 3 O₂ → 2 CuO + 2 SO₂
2 PbS + 3 O₂ → 2 PbO + 2 SO₂
HgS + O₂ → Hg + SO₂
2 SO₂ + O₂ ⇌ 2 SO₃
SO₃ + H₂SO₄ → H₂S₂O₇
H₂S₂O₇ + H₂O → 2 H₂SO₄
2 H₂S + 3 O₂ → 2 SO₂ + 2 H₂O
2 H₂S + O₂ → 2 S + 2 H₂O
2 H₂S + SO₂ → 3 S + 2 H₂O
FeS + 2 HCl → FeCl₂ + H₂S
Al₂S₃ + 6 H₂O → 2 Al(OH)₃ + 3 H₂S
Fe + S → FeS
Hg + S → HgS
H₂ + S → H₂S
Zn + S → ZnS
2 Al + 3 S → Al₂S₃
S + 3 F₂ → SF₆
SF₄ + 2 H₂O → SO₂ + 4 HF
2 S + Cl₂ → S₂Cl₂
SO₂ + Cl₂ → SO₂Cl₂
SO₃ + HCl → HSO₃Cl
Na₂SO₃ + H₂SO₄ → Na₂SO₄ + SO₂ + H₂O
Cu + 2 H₂SO₄ → CuSO₄ + SO₂ + 2 H₂O
Hg + 2 H₂SO₄ → HgSO₄ + SO₂ + 2 H₂O
C + 2 H₂SO₄ → CO₂ + 2 SO₂ + 2 H₂O
S + 2 H₂SO₄ → 3 SO₂ + 2 H₂O
H₂S + H₂SO₄ → S + SO₂ + 2 H₂O
2 HI + H₂SO₄ → I₂ + SO₂ + 2 H₂O
8 HI + H₂SO₄ → 4 I₂ + H₂S + 4 H₂O
Zn + H₂SO₄ → ZnSO₄ + H₂
CuO + H₂SO₄ → CuSO₄ + H₂O
2 KOH + H₂SO₄ → K₂SO₄ + 2 H₂O
KOH + H₂SO₄ → KHSO₄ + H₂O
CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂
2 NaHSO₄ → Na₂S₂O₇ + H₂O
SO₂ + Cl₂ + 2 H₂O → H₂SO₄ + 2 HCl
5 SO₂ + 2 KMnO₄ + 2 H₂O → K₂SO₄ + 2 MnSO₄ + 2 H₂SO₄
3 SO₂ + 2 HNO₃ + 2 H₂O → 3 H₂SO₄ + 2 NO
SO₂ + 2 H₂ → S + 2 H₂O
SO₂ + 2 CO → S + 2 CO₂
SO₂ + H₂O ⇌ H₂SO₃
SO₂ + 2 H₂O ⇌ HSO₃⁻ + H₃O⁺
HSO₃⁻ + H₂O ⇌ SO₃²⁻ + H₃O⁺
NaOH + SO₂ → NaHSO₃
NaHSO₃ + NaOH → Na₂SO₃ + H₂O
2 NaOH + SO₂ → Na₂SO₃ + H₂O
Ca(OH)₂ + SO₂ → CaSO₃ + H₂O
2 SO₂ + Na₂CO₃ + H₂O → 2 NaHSO₃ + CO₂
2 KHSO₃ → K₂S₂O₅ + H₂O
4 K₂SO₃ → 3 K₂SO₄ + K₂S
2 Na₂SO₃ + O₂ → 2 Na₂SO₄
Na₂SO₃ + S → Na₂S₂O₃
S + SO₃²⁻ → S₂O₃²⁻
I₂ + 2 Na₂S₂O₃ → 2 NaI + Na₂S₄O₆
2 S₂O₃²⁻ + I₂ → S₄O₆²⁻ + 2 I⁻
S₂O₃²⁻ + 4 Cl₂ + 10 OH⁻ → 2 SO₄²⁻ + 8 Cl⁻ + 5 H₂O
S₂O₃²⁻ + 2 H⁺ → S + SO₂ + H₂O
Na₂S₂O₃ + 2 HCl → 2 NaCl + S + SO₂ + H₂O
Ag⁺ + 2 S₂O₃²⁻ → [Ag(S₂O₃)₂]³⁻
AgBr + 2 Na₂S₂O₃ → Na₃[Ag(S₂O₃)₂] + NaBr
5 S₂O₈²⁻ + 2 Mn²⁺ + 8 H₂O → 2 MnO₄⁻ + 10 SO₄²⁻ + 16 H⁺
H₂O₂ + H₂SO₄ → H₂O + H₂SO₅
H₂SO₅ + H₂O → H₂SO₄ + H₂O₂
C₁₂H₂₂O₁₁ → 12 C + 11 H₂O
HCOOH → CO + H₂O
BaCl₂ + Na₂SO₄ → BaSO₄ + 2 NaCl
Ba²⁺ + SO₄²⁻ → BaSO₄
CaCO₃ + SO₂ → CaSO₃ + CO₂
2 CaSO₃ + O₂ → 2 CaSO₄
2 CaCO₃ + 2 SO₂ + O₂ + 4 H₂O → 2 CaSO₄·2H₂O + 2 CO₂
2 CaSO₄·2H₂O → 2 CaSO₄·0.5H₂O + 3 H₂O
H₂S + Cl₂ → 2 HCl + S
H₂S + Br₂ → 2 HBr + S
H₂S + I₂ → S + 2 HI
3 H₂S + 2 HNO₃ → 3 S + 2 NO + 4 H₂O
2 SO₂ + O₂ + 2 H₂O → 2 H₂SO₄
SO₂ + H₂O₂ → H₂SO₄
Cu²⁺ + H₂S → CuS + 2 H⁺
Zn²⁺ + S²⁻ → ZnS
Pb(NO₃)₂ + H₂S → PbS + 2 HNO₃
Na₂S + 2 HCl → 2 NaCl + H₂S
S²⁻ + H₂O ⇌ HS⁻ + OH⁻
HS⁻ + H₃O⁺ → H₂S + H₂O
H₂S + H₂O ⇌ HS⁻ + H₃O⁺
2 Ag + H₂S → Ag₂S + H₂
4 Ag + 2 H₂S + O₂ → 2 Ag₂S + 2 H₂O
Na₂SO₄ + 4 C → Na₂S + 4 CO
CaSO₄ + 4 C → CaS + 4 CO
2 CaSO₄ + C → 2 CaO + CO₂ + 2 SO₂
Fe₂O₃·3H₂O + 3 H₂S → 2 FeS + 6 H₂O + S
4 FeS + 6 H₂O + 3 O₂ → 2 Fe₂O₃·3H₂O + 4 S
S + 6 HNO₃ → H₂SO₄ + 6 NO₂ + 2 H₂O
3 S + 6 NaOH → 2 Na₂S + Na₂SO₃ + 3 H₂O
Se + O₂ → SeO₂
SeO₂ + H₂O → H₂SeO₃
H₂SeO₃ + 2 SO₂ + H₂O → Se + 2 H₂SO₄
H₂SeO₃ + 4 HI → Se + 2 I₂ + 3 H₂O
3 Se + 4 HNO₃ + H₂O → 3 H₂SeO₃ + 4 NO
3 SeO₂ + 4 NH₃ → 2 N₂ + 6 H₂O + 3 Se
5 H₂SeO₃ + 2 HClO₃ → 5 H₂SeO₄ + Cl₂ + H₂O
SeO₃²⁻ + Cl₂ + 2 OH⁻ → SeO₄²⁻ + 2 Cl⁻ + H₂O
2 Au + 6 H₂SeO₄ → Au₂(SeO₄)₃ + 3 H₂SeO₃ + 3 H₂O
TeO₂ + 2 C → Te + 2 CO
H₆TeO₆ → TeO₃ + 3 H₂O
H₂ + Se → H₂Se
2 H₂Se + O₂ → 2 H₂O + 2 Se
H₂Se + H₂SO₄ → Se + SO₂ + 2 H₂O
Al₂Te₃ + 6 H₂O → 3 H₂Te + 2 Al(OH)₃
H₂Te + H₂O₂ → 2 H₂O + Te
O₂ + 4 H⁺ + 4 e⁻ → 2 H₂O
O₂ + 2 H₂O + 4 e⁻ → 4 OH⁻
O₃ + 2 H⁺ + 2 e⁻ → O₂ + H₂O
H₂O₂ + 2 H⁺ + 2 e⁻ → 2 H₂O
O₂ + 2 H⁺ + 2 e⁻ → H₂O₂
SO₄²⁻ + 4 H⁺ + 2 e⁻ → SO₂ + 2 H₂O
S + 2 H⁺ + 2 e⁻ → H₂S
S₄O₆²⁻ + 2 e⁻ → 2 S₂O₃²⁻
S₂O₈²⁻ + 2 e⁻ → 2 SO₄²⁻
SO₄²⁻ + 8 H⁺ + 6 e⁻ → S + 4 H₂O
H₂SO₃ + 4 H⁺ + 4 e⁻ → S + 3 H₂O
SeO₄²⁻ + 4 H⁺ + 2 e⁻ → H₂SeO₃ + H₂O
2 H₂SO₄ ⇌ H₃SO₄⁺ + HSO₄⁻
H₂SO₄ + H₂O → HSO₄⁻ + H₃O⁺
HSO₄⁻ + H₂O ⇌ SO₄²⁻ + H₃O⁺
2 H₂SO₄ ⇌ H₂S₂O₇ + H₂O
"""

bad = 0; n = 0
for line in EQS.strip().split("\n"):
    line = line.strip()
    if not line: continue
    n += 1
    try:
        r = check(line)
    except Exception as e:
        r = "PARSE ERROR: %s" % e
    if r:
        bad += 1
        print("CHYBA  %-58s  %s" % (line, r))
print("\nzkontrolovano %d rovnic, chybnych: %d" % (n, bad))
