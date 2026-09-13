# -*- coding: utf-8 -*-
"""Kontrola bilance atomů a náboje u všech rovnic použitých v průvodci."""
import re, sys
sys.stdout.reconfigure(encoding="utf-8")

# --- jednoduchý parser vzorců -------------------------------------------------
TOK = re.compile(r'([A-Z][a-z]?)(\d*)|(\()|(\))(\d*)')

def parse(f):
    """vrátí dict prvek->počet ; f bez koeficientu a bez náboje"""
    out = {}
    stack = [out]
    i = 0
    while i < len(f):
        ch = f[i]
        if ch == '(':
            stack.append({}); i += 1; continue
        if ch == ')':
            grp = stack.pop(); i += 1
            n = ''
            while i < len(f) and f[i].isdigit(): n += f[i]; i += 1
            n = int(n) if n else 1
            for k, v in grp.items(): stack[-1][k] = stack[-1].get(k, 0) + v * n
            continue
        if ch == '.':                       # hydráty typu CaSO4.2H2O
            i += 1
            n = ''
            while i < len(f) and f[i].isdigit(): n += f[i]; i += 1
            mult = int(n) if n else 1
            rest = parse(f[i:])
            for k, v in rest.items(): stack[-1][k] = stack[-1].get(k, 0) + v * mult
            return out
        m = re.match(r'[A-Z][a-z]?', f[i:])
        if not m: raise ValueError("nelze rozparsovat %r na pozici %d" % (f, i))
        el = m.group(0); i += len(el)
        n = ''
        while i < len(f) and f[i].isdigit(): n += f[i]; i += 1
        n = int(n) if n else 1
        stack[-1][el] = stack[-1].get(el, 0) + n
    if len(stack) != 1: raise ValueError("nespárované závorky v %r" % f)
    return out

def species(s):
    """'3 Cu(NO3)2^2-' -> (koef, dict, náboj)"""
    s = s.strip()
    m = re.match(r'^(\d+)\s+(.*)$', s)
    coef = int(m.group(1)) if m else 1
    body = m.group(2) if m else s
    charge = 0
    cm = re.search(r'\^(\d*)([+-])$', body)
    if cm:
        n = int(cm.group(1)) if cm.group(1) else 1
        charge = n if cm.group(2) == '+' else -n
        body = body[:cm.start()]
    body = body.replace('(g)', '').replace('(l)', '').replace('(s)', '').replace('(aq)', '')
    return coef, parse(body), charge

def side(txt):
    at, ch = {}, 0
    for part in re.split(r'\s\+\s', txt):
        if not part.strip(): continue
        c, d, q = species(part)
        for k, v in d.items(): at[k] = at.get(k, 0) + c * v
        ch += c * q
    return at, ch

def check(name, eq):
    L, R = eq.split('->')
    la, lc = side(L); ra, rc = side(R)
    ok = (la == ra) and (lc == rc)
    if not ok:
        print("  ✗ %-42s  %s" % (name, eq))
        keys = sorted(set(la) | set(ra))
        print("      atomy L: " + " ".join("%s%d" % (k, la.get(k, 0)) for k in keys))
        print("      atomy R: " + " ".join("%s%d" % (k, ra.get(k, 0)) for k in keys))
        print("      náboj  L=%+d  R=%+d" % (lc, rc))
    return ok

EQ = [
 # --- k1 elementární dusík
 ("NH4NO2 rozklad",        "NH4NO2 -> N2 + 2 H2O"),
 ("dichroman amonny",      "(NH4)2Cr2O7 -> N2 + Cr2O3 + 4 H2O"),
 ("azid sodny",            "2 NaN3 -> 2 Na + 3 N2"),
 ("horcik + dusik",        "3 Mg + N2 -> Mg3N2"),
 ("lithium + dusik",       "6 Li + N2 -> 2 Li3N"),
 ("hydrolyza nitridu Mg",  "Mg3N2 + 6 H2O -> 3 Mg(OH)2 + 2 NH3"),
 ("hydrolyza nitridu Ca",  "Ca3N2 + 6 H2O -> 3 Ca(OH)2 + 2 NH3"),
 ("blesk",                 "N2 + O2 -> 2 NO"),
 ("hliník + dusik",        "2 Al + N2 -> 2 AlN"),
 ("Li3N hydrolyza",        "Li3N + 3 H2O -> 3 LiOH + NH3"),
 # --- k2 fosfor
 ("vyroba fosforu",        "2 Ca3(PO4)2 + 6 SiO2 + 10 C -> 6 CaSiO3 + P4 + 10 CO"),
 ("P4 + nadbytek O2",      "P4 + 5 O2 -> P4O10"),
 ("P4 + omezeny O2",       "P4 + 3 O2 -> P4O6"),
 ("P4 v alkalii",          "P4 + 3 NaOH + 3 H2O -> PH3 + 3 NaH2PO2"),
 ("P4 + Cl2 na PCl3",      "P4 + 6 Cl2 -> 4 PCl3"),
 ("P4 + Cl2 na PCl5",      "P4 + 10 Cl2 -> 4 PCl5"),
 ("P4 + Br2",              "P4 + 6 Br2 -> 4 PBr3"),
 ("fosfid vapenaty",       "Ca3(PO4)2 + 8 C -> Ca3P2 + 8 CO"),
 # --- k3 hydridy
 ("Haber",                 "N2 + 3 H2 -> 2 NH3"),
 ("NH3 ze soli NaOH",      "NH4Cl + NaOH -> NH3 + NaCl + H2O"),
 ("NH3 ze soli Ca(OH)2",   "2 NH4Cl + Ca(OH)2 -> 2 NH3 + CaCl2 + 2 H2O"),
 ("bazicita NH3",          "NH3 + H2O -> NH4^+ + OH^-"),
 ("dym NH3 + HCl",         "NH3 + HCl -> NH4Cl"),
 ("horeni NH3",            "4 NH3 + 3 O2 -> 2 N2 + 6 H2O"),
 ("kat. spalovani NH3",    "4 NH3 + 5 O2 -> 4 NO + 6 H2O"),
 ("NH3 + Cl2 nadbytek",    "2 NH3 + 3 Cl2 -> N2 + 6 HCl"),
 ("NH3 nadbytek + Cl2",    "8 NH3 + 3 Cl2 -> N2 + 6 NH4Cl"),
 ("Raschig hydrazin",      "2 NH3 + NaOCl -> N2H4 + NaCl + H2O"),
 ("horeni hydrazinu",      "N2H4 + O2 -> N2 + 2 H2O"),
 ("NH3 redukuje CuO",      "3 CuO + 2 NH3 -> 3 Cu + N2 + 3 H2O"),
 ("fosfan z fosfidu",      "Mg3P2 + 6 H2O -> 3 Mg(OH)2 + 2 PH3"),
 ("fosfoniova sul",        "PH3 + HI -> PH4I"),
 ("amid sodny",            "2 Na + 2 NH3 -> 2 NaNH2 + H2"),
 ("azoimid z hydrazinu",   "N2H4 + HNO2 -> HN3 + 2 H2O"),
 ("sulfat amonny",         "2 NH3 + H2SO4 -> (NH4)2SO4"),
 # --- k4 oxidy
 ("N2O z NH4NO3",          "NH4NO3 -> N2O + 2 H2O"),
 ("NO z Cu a zred. HNO3",  "3 Cu + 8 HNO3 -> 3 Cu(NO3)2 + 2 NO + 4 H2O"),
 ("oxidace NO",            "2 NO + O2 -> 2 NO2"),
 ("vznik N2O3",            "NO + NO2 -> N2O3"),
 ("dimerace NO2",          "2 NO2 -> N2O4"),
 ("NO2 s vodou",           "3 NO2 + H2O -> 2 HNO3 + NO"),
 ("rozklad N2O5",          "2 N2O5 -> 4 NO2 + O2"),
 ("N2O5 s vodou",          "N2O5 + H2O -> 2 HNO3"),
 ("rozklad dusicnanu Cu",  "2 Cu(NO3)2 -> 2 CuO + 4 NO2 + O2"),
 ("rozklad NaNO3",         "2 NaNO3 -> 2 NaNO2 + O2"),
 ("rozklad AgNO3",         "2 AgNO3 -> 2 Ag + 2 NO2 + O2"),
 ("N2O3 s NaOH",           "N2O3 + 2 NaOH -> 2 NaNO2 + H2O"),
 ("N2O4 + voda + kyslik",  "2 N2O4 + 2 H2O + O2 -> 4 HNO3"),
 # --- k5 kyseliny dusiku
 ("Cu + konc. HNO3",       "Cu + 4 HNO3 -> Cu(NO3)2 + 2 NO2 + 2 H2O"),
 ("Zn + velmi zred. HNO3", "4 Zn + 10 HNO3 -> 4 Zn(NO3)2 + NH4NO3 + 3 H2O"),
 ("lucavka kralovska",     "HNO3 + 3 HCl -> NOCl + Cl2 + 2 H2O"),
 ("rozklad HNO2",          "3 HNO2 -> HNO3 + 2 NO + H2O"),
 ("dusitan + manganistan", "5 NaNO2 + 2 KMnO4 + 3 H2SO4 -> 5 NaNO3 + 2 MnSO4 + K2SO4 + 3 H2O"),
 ("dusitan + jodid",       "2 NaNO2 + 2 KI + 2 H2SO4 -> 2 NO + I2 + K2SO4 + Na2SO4 + 2 H2O"),
 ("nitracni smes",         "HNO3 + 2 H2SO4 -> NO2^+ + H3O^+ + 2 HSO4^-"),
 ("nitrace benzenu",       "C6H6 + HNO3 -> C6H5NO2 + H2O"),
 ("NH4NO3 vybuch",         "2 NH4NO3 -> 2 N2 + O2 + 4 H2O"),
 ("nitroglycerin",         "4 C3H5N3O9 -> 12 CO2 + 10 H2O + 6 N2 + O2"),
 ("TNT",                   "2 C7H5N3O6 -> 12 CO + 5 H2 + 3 N2 + 2 C"),
 ("neutralizace HNO3",     "HNO3 + NaOH -> NaNO3 + H2O"),
 ("dusicnan amonny",       "NH3 + HNO3 -> NH4NO3"),
 ("prukaz dusicnanu",      "3 Cu + 8 H^+ + 2 NO3^- -> 3 Cu^2+ + 2 NO + 4 H2O"),
 ("dusitan + kyselina",    "2 HNO2 -> NO + NO2 + H2O"),
 ("P + konc. HNO3",        "P + 5 HNO3 -> H3PO4 + 5 NO2 + H2O"),
 # --- rozhodovac kov + HNO3
 ("Cu velmi zred",         "4 Cu + 10 HNO3 -> 4 Cu(NO3)2 + N2O + 5 H2O"),
 ("Ag konc",               "Ag + 2 HNO3 -> AgNO3 + NO2 + H2O"),
 ("Ag zred",               "3 Ag + 4 HNO3 -> 3 AgNO3 + NO + 2 H2O"),
 ("Zn konc",               "Zn + 4 HNO3 -> Zn(NO3)2 + 2 NO2 + 2 H2O"),
 ("Zn zred",               "3 Zn + 8 HNO3 -> 3 Zn(NO3)2 + 2 NO + 4 H2O"),
 ("Fe zred",               "Fe + 4 HNO3 -> Fe(NO3)3 + NO + 2 H2O"),
 ("Fe velmi zred",         "8 Fe + 30 HNO3 -> 8 Fe(NO3)3 + 3 NH4NO3 + 9 H2O"),
 ("Al zred",               "8 Al + 30 HNO3 -> 8 Al(NO3)3 + 3 NH4NO3 + 9 H2O"),
 ("zlato v lucavce",       "Au + HNO3 + 4 HCl -> HAuCl4 + NO + 2 H2O"),
 # --- k6 binarni slouceniny fosforu
 ("P4O10 s vodou",         "P4O10 + 6 H2O -> 4 H3PO4"),
 ("P4O6 s vodou",          "P4O6 + 6 H2O -> 4 H3PO3"),
 ("hydrolyza PCl3",        "PCl3 + 3 H2O -> H3PO3 + 3 HCl"),
 ("hydrolyza PCl5",        "PCl5 + 4 H2O -> H3PO4 + 5 HCl"),
 ("castecna hydr. PCl5",   "PCl5 + H2O -> POCl3 + 2 HCl"),
 ("suseni P4O10",          "P4O10 + 6 H2SO4 -> 6 SO3 + 4 H3PO4"),
 ("dehydratace HNO3",      "P4O10 + 4 HNO3 -> 2 N2O5 + 4 HPO3"),
 ("POCl3 z PCl5",          "P4O10 + 6 PCl5 -> 10 POCl3"),
 # --- k7 kyseliny fosforu, hnojiva
 ("kondenzace H3PO4",      "2 H3PO4 -> H4P2O7 + H2O"),
 ("trifosforecnan",        "NaH2PO4 + 2 Na2HPO4 -> Na5P3O10 + 2 H2O"),
 ("fosfornan redukuje Ag", "4 Ag^+ + H3PO2 + 2 H2O -> 4 Ag + H3PO4 + 4 H^+"),
 ("disprop. H3PO3",        "4 H3PO3 -> 3 H3PO4 + PH3"),
 ("superfosfat",           "Ca3(PO4)2 + 2 H2SO4 -> Ca(H2PO4)2 + 2 CaSO4"),
 ("trojity superfosfat",   "Ca3(PO4)2 + 4 H3PO4 -> 3 Ca(H2PO4)2"),
 ("extrakcni H3PO4",       "Ca5(PO4)3F + 5 H2SO4 -> 3 H3PO4 + 5 CaSO4 + HF"),
 ("H3PO4 + 1 NaOH",        "H3PO4 + NaOH -> NaH2PO4 + H2O"),
 ("H3PO4 + 2 NaOH",        "H3PO4 + 2 NaOH -> Na2HPO4 + 2 H2O"),
 ("H3PO4 + 3 NaOH",        "H3PO4 + 3 NaOH -> Na3PO4 + 3 H2O"),
 ("prukaz fosforecnanu",   "3 Ag^+ + PO4^3- -> Ag3PO4"),
 ("mocovina",              "2 NH3 + CO2 -> CO(NH2)2 + H2O"),
 # --- k8 trendy ve skupine
 ("bismutecnan oxiduje",   "5 NaBiO3 + 2 Mn^2+ + 14 H^+ -> 5 Bi^3+ + 2 MnO4^- + 5 Na^+ + 7 H2O"),
 ("As2O3 amfoterni",       "As2O3 + 6 NaOH -> 2 Na3AsO3 + 3 H2O"),
 ("Bi2O3 zasadity",        "Bi2O3 + 6 HNO3 -> 2 Bi(NO3)3 + 3 H2O"),
 ("Sb2O3 s kyselinou",     "Sb2O3 + 6 HCl -> 2 SbCl3 + 3 H2O"),
 ("Marshova zkouska",      "As2O3 + 6 Zn + 12 HCl -> 2 AsH3 + 6 ZnCl2 + 3 H2O"),
 ("rozklad AsH3",          "2 AsH3 -> 2 As + 3 H2"),
]

bad = 0
print("=== BILANCE ROVNIC ===")
for n, e in EQ:
    if not check(n, e): bad += 1
print("zkontrolováno: %d rovnic, chybných: %d" % (len(EQ), bad))
sys.exit(1 if bad else 0)
