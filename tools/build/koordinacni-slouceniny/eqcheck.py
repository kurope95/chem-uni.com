# -*- coding: utf-8 -*-
"""Bilance atomu a naboje pro vsechny rovnice pouzite v pruvodci
   'Koordinacni slouceniny'.  Zapis v ASCII, naboj v zavorce {n}."""
import re, sys
from collections import Counter

# --- parser jednoduchych vzorcu s ligandy v zavorkach a nabojem {..} -------
TOK = re.compile(r'([A-Z][a-z]?)(\d*)|(\()|(\))(\d*)|(\[)|(\])(\d*)')

def parse(formula):
    """vrati Counter atomu; naboj se odstrani predem"""
    stack = [Counter()]
    i = 0
    n = len(formula)
    while i < n:
        c = formula[i]
        if c in '([':
            stack.append(Counter())
            i += 1
        elif c in ')]':
            i += 1
            num = ''
            while i < n and formula[i].isdigit():
                num += formula[i]; i += 1
            mult = int(num) if num else 1
            top = stack.pop()
            for k, v in top.items():
                stack[-1][k] += v * mult
        elif c.isupper():
            sym = c
            i += 1
            if i < n and formula[i].islower():
                sym += formula[i]; i += 1
            num = ''
            while i < n and formula[i].isdigit():
                num += formula[i]; i += 1
            stack[-1][sym] += int(num) if num else 1
        elif c == '*':          # krystalova voda:  CuSO4*5H2O
            i += 1
        else:
            raise ValueError('neznamy znak %r ve vzorci %r' % (c, formula))
    if len(stack) != 1:
        raise ValueError('nesparovane zavorky v %r' % formula)
    return stack[0]

def species(s):
    """'3[Fe(CN)6]{4-}' -> (koef, Counter, naboj)"""
    s = s.strip()
    m = re.match(r'^(\d+)\s+', s)
    coef = 1
    if m:
        coef = int(m.group(1)); s = s[m.end():]
    ch = 0
    m = re.search(r'\{([^}]+)\}$', s)
    if m:
        t = m.group(1)
        sign = -1 if t.endswith('-') else 1
        mag = t[:-1]
        ch = sign * (int(mag) if mag else 1)
        s = s[:m.start()]
    return coef, parse(s), ch

def side(expr):
    at = Counter(); ch = 0
    for part in expr.split(' + '):
        c, a, q = species(part)
        for k, v in a.items():
            at[k] += c * v
        ch += c * q
    return at, ch

EQS = [
 ("k0  vznik tetraamminmednateho kationtu",
  "Cu{2+} + 4 NH3", "[Cu(NH3)4]{2+}"),
 ("k0  rozpousteni AgCl v amoniaku",
  "AgCl + 2 NH3", "[Ag(NH3)2]{+} + Cl{-}"),
 ("k0  ustaleni hexaakvachromiteho kationtu",
  "Cr{3+} + 6 H2O", "[Cr(H2O)6]{3+}"),
 ("k0  disociace koordinacni slouceniny ve vode",
  "K4[Fe(CN)6]", "4 K{+} + [Fe(CN)6]{4-}"),
 ("k0  disociace sulfatu tetraamminmednateho",
  "[Cu(NH3)4]SO4", "[Cu(NH3)4]{2+} + SO4{2-}"),
 ("k1  hexafluorohlinitanovy anion",
  "Al{3+} + 6 F{-}", "[AlF6]{3-}"),
 ("k1  chelat s ethylendiaminem",
  "Ni{2+} + 3 C2H8N2", "[Ni(C2H8N2)3]{2+}"),
 ("k1  amfoterni hlinik",
  "Al(OH)3 + OH{-}", "[Al(OH)4]{-}"),
 ("k2  hexakyanidozeleznatan draselny z roztoku",
  "Fe{2+} + 6 CN{-}", "[Fe(CN)6]{4-}"),
 ("k2  hexakyanidozelezitan",
  "Fe{3+} + 6 CN{-}", "[Fe(CN)6]{3-}"),
 ("k2  tetrahydroxidozincnatan",
  "Zn(OH)2 + 2 OH{-}", "[Zn(OH)4]{2-}"),
 ("k3  akvatace chloropentaamminkobaltiteho kationtu",
  "[Co(NH3)5Cl]{2+} + H2O", "[Co(NH3)5(H2O)]{3+} + Cl{-}"),
 ("k3  ionizacni izomerie - prvni izomer",
  "[Co(NH3)5Br]SO4", "[Co(NH3)5Br]{2+} + SO4{2-}"),
 ("k3  ionizacni izomerie - druhy izomer",
  "[Co(NH3)5(SO4)]Br", "[Co(NH3)5(SO4)]{+} + Br{-}"),
 ("k3  izomerace nitro na nitrito",
  "[Co(NH3)5(NO2)]{2+}", "[Co(NH3)5(ONO)]{2+}"),
 ("k4  zamena vody za amoniak u medi",
  "[Cu(H2O)4]{2+} + 4 NH3", "[Cu(NH3)4]{2+} + 4 H2O"),
 ("k4  fluoridovy komplex zeleza",
  "Fe{3+} + 6 F{-}", "[FeF6]{3-}"),
 ("k5  vznik hexaamminkobaltnateho kationtu",
  "Co{2+} + 6 NH3", "[Co(NH3)6]{2+}"),
 ("k5  oxidace kobaltnateho komplexu vzduchem",
  "4 [Co(NH3)6]{2+} + O2 + 4 NH4{+}", "4 [Co(NH3)6]{3+} + 4 NH3 + 2 H2O"),
 ("k6  hexaakvatitanity kation",
  "Ti{3+} + 6 H2O", "[Ti(H2O)6]{3+}"),
 ("k6  dukaz zeleziteho iontu thiokyanatanem",
  "Fe{3+} + SCN{-}", "[Fe(SCN)]{2+}"),
 ("k6  berlinska modr",
  "4 Fe{3+} + 3 [Fe(CN)6]{4-}", "Fe4[Fe(CN)6]3"),
 ("k7  postupna koordinace 1",
  "[Cu(H2O)4]{2+} + NH3", "[Cu(NH3)(H2O)3]{2+} + H2O"),
 ("k7  chelatace EDTA (forma H2Y2-)",
  "Ca{2+} + H2C10H12N2O8{2-}", "[Ca(C10H12N2O8)]{2-} + 2 H{+}"),
 ("k7  rozpousteni AgBr thiosiranem (ustalovac)",
  "AgBr + 2 S2O3{2-}", "[Ag(S2O3)2]{3-} + Br{-}"),
 ("k8  louzeni zlata kyanidem",
  "4 Au + 8 CN{-} + O2 + 2 H2O", "4 [Au(CN)2]{-} + 4 OH{-}"),
 ("k8  galvanicke stribreni - katoda",
  "[Ag(CN)2]{-} + 1 e", "Ag + 2 CN{-}"),
 ("k8  priprava cisplatiny",
  "K2[PtCl4] + 2 NH3", "[Pt(NH3)2Cl2] + 2 KCl"),
 ("k8  vazba kysliku na hem (protoporfyrin IX + histidin)",
  "[Fe(C34H32N4O4)(C6H9N3O2)] + O2", "[Fe(C34H32N4O4)(C6H9N3O2)(O2)]"),
 ("k8  Tollensovo cinidlo - vznik diamminstribrneho kationtu",
  "Ag{+} + 2 NH3", "[Ag(NH3)2]{+}"),
 ("k8  komplexometrie horciku EDTA",
  "Mg{2+} + H2C10H12N2O8{2-}", "[Mg(C10H12N2O8)]{2-} + 2 H{+}"),
 ("k8  dukaz niklu dimethylglyoximem",
  "Ni{2+} + 2 C4H8N2O2", "[Ni(C4H7N2O2)2] + 2 H{+}"),
 ("k8  rozklad amminkomplexu kyselinou",
  "[Ag(NH3)2]{+} + 2 H3O{+}", "Ag{+} + 2 NH4{+} + 2 H2O"),
 ("k8  merkurimetrie - tetrajodortutnatan",
  "Hg{2+} + 4 I{-}", "[HgI4]{2-}"),
 ("rychlo  amfoterni zinek v amoniaku",
  "Zn{2+} + 4 NH3", "[Zn(NH3)4]{2+}"),
 ("rychlo  tetrachloridokobaltnatan (modry)",
  "[Co(H2O)6]{2+} + 4 Cl{-}", "[CoCl4]{2-} + 6 H2O"),
 ("k0  vznik oxoniového kationtu (donor-akceptorová vazba)",
  "H2O + H{+}", "H3O{+}"),
 ("k6  srazeni hydroxidu mednateho amoniakem",
  "Cu{2+} + 2 OH{-}", "Cu(OH)2"),
 ("k7  amminkomplex niklu",
  "[Ni(H2O)6]{2+} + 6 NH3", "[Ni(NH3)6]{2+} + 6 H2O"),
 ("k7  chelat niklu s ethylendiaminem",
  "[Ni(H2O)6]{2+} + 3 C2H8N2", "[Ni(C2H8N2)3]{2+} + 6 H2O"),
 ("k8  rozpousteni AgBr thiosiranem - souhrn",
  "AgBr + 2 S2O3{2-}", "[Ag(S2O3)2]{3-} + Br{-}"),
]

# 'e' jako elektron - doplnime umely prvek
def check(name, lhs, rhs):
    la, lc = side(lhs)
    ra, rc = side(rhs)
    # elektron: symbol 'e' se parsuje jako prvek Er? ne - je maly. resime rucne:
    ok_at = la == ra
    ok_ch = lc == rc
    return ok_at, ok_ch, la, ra, lc, rc

bad = 0
for name, lhs, rhs in EQS:
    # elektron zpracujeme zvlast
    e_l = 0; e_r = 0
    def strip_e(s):
        global_n = 0
        parts = []
        for p in s.split(' + '):
            q = p.strip()
            m = re.fullmatch(r'(\d*)\s*e', q)
            if m:
                global_n += int(m.group(1) or 1)
            else:
                parts.append(q)
        return ' + '.join(parts), global_n
    l2, e_l = strip_e(lhs)
    r2, e_r = strip_e(rhs)
    la, lc = side(l2)
    ra, rc = side(r2)
    lc -= e_l          # kazdy elektron nese -1
    rc -= e_r
    ok_at = (la == ra)
    ok_ch = (lc == rc)
    flag = "OK " if (ok_at and ok_ch) else "!! "
    if not (ok_at and ok_ch):
        bad += 1
    print("%s%-52s atomy %s naboj %+d -> %+d" %
          (flag, name, "OK" if ok_at else "CHYBA", lc, rc))
    if not ok_at:
        d = Counter(la); d.subtract(ra)
        print("      rozdil L-R:", {k: v for k, v in d.items() if v})

print()
print("celkem rovnic:", len(EQS), " chybnych:", bad)
sys.exit(1 if bad else 0)
