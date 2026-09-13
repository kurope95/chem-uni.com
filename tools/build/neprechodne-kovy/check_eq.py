# -*- coding: utf-8 -*-
"""Kontrola bilance atomů a náboje u všech rovnic použitých v průvodci."""
import re, sys
try: sys.stdout.reconfigure(encoding="utf-8")
except Exception: pass

SUB = str.maketrans("₀₁₂₃₄₅₆₇₈₉", "0123456789")
SUP = {"⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","⁺":"+","⁻":"-"}

def parse_charge(s):
    """odřízne horní index náboje na konci, vrátí (zbytek, náboj)"""
    m = re.search(r"([⁰¹²³⁴⁵⁶⁷⁸⁹]*[⁺⁻])$", s)
    if not m: return s, 0
    tail = "".join(SUP[c] for c in m.group(1))
    sign = 1 if tail[-1] == "+" else -1
    num = tail[:-1]
    return s[:m.start()], sign * (int(num) if num else 1)

def parse_formula(f, mult=1):
    """vrátí dict prvek->počet; podporuje závorky, hydráty s ·, Unicode dolní indexy"""
    f = f.strip().translate(SUB)
    out = {}
    # hydráty typu CaSO4·2H2O
    parts = re.split(r"[·.]", f)
    for p in parts:
        if not p: continue
        m = re.match(r"^(\d+(?:,\d+)?)(.*)$", p)
        k = mult
        if m and m.group(2) and m.group(2)[0].isalpha():
            k = mult * float(m.group(1).replace(",", "."))
            p = m.group(2)
        _add(p, k, out)
    return out

def _add(p, mult, out):
    i = 0
    stack = [{}]
    while i < len(p):
        c = p[i]
        if c in "([":
            stack.append({}); i += 1
        elif c in ")]":
            grp = stack.pop(); i += 1
            n = ""
            while i < len(p) and p[i].isdigit(): n += p[i]; i += 1
            k = int(n) if n else 1
            for e, v in grp.items(): stack[-1][e] = stack[-1].get(e, 0) + v * k
        elif c.isupper():
            e = c; i += 1
            while i < len(p) and p[i].islower(): e += p[i]; i += 1
            n = ""
            while i < len(p) and p[i].isdigit(): n += p[i]; i += 1
            k = int(n) if n else 1
            stack[-1][e] = stack[-1].get(e, 0) + k
        else:
            i += 1
    for e, v in stack[0].items(): out[e] = out.get(e, 0) + v * mult

def side(s):
    atoms, ch = {}, 0
    for term in s.split("+"):
        term = term.strip()
        if not term: continue
        m = re.match(r"^(\d+)\s+(.*)$", term)
        coef = 1
        if m: coef = int(m.group(1)); term = m.group(2)
        term = term.replace("(s)", "").replace("(l)", "").replace("(g)", "").replace("(aq)", "").strip()
        body, q = parse_charge(term)
        ch += coef * q
        for e, v in parse_formula(body, coef).items(): atoms[e] = atoms.get(e, 0) + v
    return atoms, ch

EQ = [
 # --- k1 alkalické kovy ---
 ("4 Li + O₂ → 2 Li₂O", "hoření lithia"),
 ("2 Na + O₂ → Na₂O₂", "hoření sodíku — peroxid"),
 ("K + O₂ → KO₂", "hoření draslíku — superoxid"),
 ("2 Na + 2 H₂O → 2 NaOH + H₂", "sodík s vodou"),
 ("2 Li + 2 H₂O → 2 LiOH + H₂", "lithium s vodou"),
 ("6 Li + N₂ → 2 Li₃N", "nitrid lithný"),
 ("2 Li + H₂ → 2 LiH", "hydrid lithný"),
 ("2 Na + Cl₂ → 2 NaCl", "chlorid sodný"),
 ("2 Na + S → Na₂S", "sulfid sodný"),
 ("2 Na₂O₂ + 2 H₂O → 4 NaOH + O₂", "peroxid s vodou"),
 ("4 KO₂ + 2 CO₂ → 2 K₂CO₃ + 3 O₂", "superoxid v dýchacím přístroji"),
 ("2 KO₂ + 2 H₂O → 2 KOH + H₂O₂ + O₂", "superoxid s vodou"),
 ("2 Na + 2 NH₃ → 2 NaNH₂ + H₂", "amid sodný"),
 ("2 Na + 2 C₂H₅OH → 2 C₂H₅ONa + H₂", "ethanolát sodný"),
 ("Li₂CO₃ → Li₂O + CO₂", "rozklad uhličitanu lithného"),
 ("KO₂ + 3 K → 2 K₂O", "příprava oxidu draselného"),
 # --- k2 sloučeniny a výroba ---
 ("2 Cl⁻ → Cl₂ + 2 e⁻", "anoda chloralkalické elektrolýzy"),
 ("2 H₂O + 2 e⁻ → H₂ + 2 OH⁻", "katoda chloralkalické elektrolýzy"),
 ("2 NaCl + 2 H₂O → 2 NaOH + H₂ + Cl₂", "chloralkalická elektrolýza celkem"),
 ("2 NaHg + 2 H₂O → 2 NaOH + H₂ + 2 Hg", "rozklad amalgámu"),
 ("Na₂CO₃ + Ca(OH)₂ → CaCO₃ + 2 NaOH", "kaustifikace"),
 ("NaCl + NH₃ + CO₂ + H₂O → NaHCO₃ + NH₄Cl", "Solvay — srážení hydrogenuhličitanu"),
 ("2 NaHCO₃ → Na₂CO₃ + CO₂ + H₂O", "Solvay — kalcinace"),
 ("CaCO₃ → CaO + CO₂", "pálení vápence"),
 ("CaO + H₂O → Ca(OH)₂", "hašení vápna"),
 ("2 NH₄Cl + Ca(OH)₂ → CaCl₂ + 2 NH₃ + 2 H₂O", "Solvay — regenerace amoniaku"),
 ("2 NaCl + CaCO₃ → Na₂CO₃ + CaCl₂", "Solvay — souhrnná rovnice"),
 ("2 NaOH + CO₂ → Na₂CO₃ + H₂O", "louh s oxidem uhličitým"),
 ("NaOH + CO₂ → NaHCO₃", "louh s přebytkem oxidu uhličitého"),
 ("Na₂CO₃ + 2 HCl → 2 NaCl + H₂O + CO₂", "soda s kyselinou"),
 ("NaHCO₃ + CH₃COOH → CH₃COONa + H₂O + CO₂", "jedlá soda s octem"),
 ("Na₂CO₃ + 10 H₂O → Na₂CO₃·10H₂O", "krystalová soda"),
 ("2 NaCl → 2 Na + Cl₂", "Downsova tavná elektrolýza"),
 # --- k3/k4 skupina 2 ---
 ("2 Mg + O₂ → 2 MgO", "hoření hořčíku"),
 ("3 Mg + N₂ → Mg₃N₂", "nitrid hořečnatý"),
 ("2 Mg + CO₂ → 2 MgO + C", "hořčík hoří i v oxidu uhličitém"),
 ("Ca + 2 H₂O → Ca(OH)₂ + H₂", "vápník s vodou"),
 ("Mg + 2 H₂O → Mg(OH)₂ + H₂", "hořčík s horkou vodou"),
 ("Be + 2 NaOH + 2 H₂O → Na₂[Be(OH)₄] + H₂", "amfoterita beryllia — zásada"),
 ("Be + 2 HCl → BeCl₂ + H₂", "beryllium v kyselině"),
 ("BeO + 2 NaOH + H₂O → Na₂[Be(OH)₄]", "amfoterní oxid beryllnatý"),
 ("BeO + 2 HCl → BeCl₂ + H₂O", "oxid beryllnatý v kyselině"),
 ("Ca(OH)₂ + CO₂ → CaCO₃ + H₂O", "důkaz oxidu uhličitého"),
 ("CaCO₃ + CO₂ + H₂O → Ca(HCO₃)₂", "rozpouštění vápence — krasové jevy"),
 ("Ca(HCO₃)₂ → CaCO₃ + CO₂ + H₂O", "vznik kotelního kamene"),
 ("Ca(HCO₃)₂ + Ca(OH)₂ → 2 CaCO₃ + 2 H₂O", "Clarkovo změkčování"),
 ("CaSO₄ + Na₂CO₃ → CaCO₃ + Na₂SO₄", "odstranění trvalé tvrdosti sodou"),
 ("CaCl₂ + Na₂CO₃ → CaCO₃ + 2 NaCl", "srážení vápníku sodou"),
 ("Mg(HCO₃)₂ → MgCO₃ + CO₂ + H₂O", "hořečnatá přechodná tvrdost"),
 ("2 CaSO₄·2H₂O → 2 CaSO₄·0,5H₂O + 3 H₂O", "pálení sádrovce"),
 ("2 CaSO₄·0,5H₂O + 3 H₂O → 2 CaSO₄·2H₂O", "tuhnutí sádry"),
 ("CaC₂ + 2 H₂O → C₂H₂ + Ca(OH)₂", "karbid vápníku a acetylen"),
 ("CaO + 3 C → CaC₂ + CO", "výroba karbidu vápníku"),
 ("MgCO₃·CaCO₃ → MgO + CaO + 2 CO₂", "pálení dolomitu"),
 ("BaSO₄ + 4 C → BaS + 4 CO", "redukce barytu"),
 ("Mg + 2 CH₃Cl → ...", None),   # přeskočeno
 # --- k5 hliník ---
 ("4 Al + 3 O₂ → 2 Al₂O₃", "oxidace hliníku"),
 ("2 Al + 6 HCl → 2 AlCl₃ + 3 H₂", "hliník v kyselině"),
 ("2 Al + 2 NaOH + 6 H₂O → 2 Na[Al(OH)₄] + 3 H₂", "hliník v louhu"),
 ("Al(OH)₃ + 3 HCl → AlCl₃ + 3 H₂O", "hydroxid hlinitý jako zásada"),
 ("Al(OH)₃ + NaOH → Na[Al(OH)₄]", "hydroxid hlinitý jako kyselina"),
 ("Al₂O₃ + 6 HCl → 2 AlCl₃ + 3 H₂O", "amfoterní oxid — kyselina"),
 ("Al₂O₃ + 2 NaOH + 3 H₂O → 2 Na[Al(OH)₄]", "amfoterní oxid — zásada"),
 ("Fe₂O₃ + 2 Al → 2 Fe + Al₂O₃", "aluminotermie (termit)"),
 ("Cr₂O₃ + 2 Al → 2 Cr + Al₂O₃", "aluminotermická výroba chromu"),
 ("2 Na[Al(OH)₄] + CO₂ → 2 Al(OH)₃ + Na₂CO₃ + H₂O", "Bayer — vysrážení"),
 ("2 Al(OH)₃ → Al₂O₃ + 3 H₂O", "Bayer — kalcinace"),
 ("2 Al₂O₃ + 3 C → 4 Al + 3 CO₂", "Hall–Héroult celkem"),
 ("Al³⁺ + 3 e⁻ → Al", "katoda tavné elektrolýzy"),
 ("2 O²⁻ + C → CO₂ + 4 e⁻", "anoda tavné elektrolýzy"),
 ("2 Al + 3 Cl₂ → 2 AlCl₃", "chlorid hlinitý"),
 ("2 Al + 6 H₂O → 2 Al(OH)₃ + 3 H₂", "hliník bez ochranné vrstvy"),
 ("[Al(H₂O)₆]³⁺ + H₂O → [Al(OH)(H₂O)₅]²⁺ + H₃O⁺", "hydrolýza hlinité soli"),
 ("Al₂S₃ + 6 H₂O → 2 Al(OH)₃ + 3 H₂S", "úplná hydrolýza sulfidu hlinitého"),
 ("2 AlCl₃ → Al₂Cl₆", "dimer chloridu hlinitého"),
 # --- k6 inertní pár ---
 ("2 GeI₂ → Ge + GeI₄", "disproporcionace jodidu germanatého"),
 ("PbCl₄ → PbCl₂ + Cl₂", "rozklad chloridu olovičitého"),
 ("2 Ga + GaCl₃ → 3 GaCl", "gallium v oxidačním stavu I"),
 ("Tl³⁺ + 2 e⁻ → Tl⁺", "redukce thallitého iontu"),
 ("Sn²⁺ → Sn⁴⁺ + 2 e⁻", "cínatý ion jako redukovadlo"),
 ("4 Tl + O₂ + 2 H₂O → 4 TlOH", "thallium se vzdušnou vlhkostí"),
 # --- k7 cín a olovo ---
 ("Sn + 2 HCl → SnCl₂ + H₂", "cín v kyselině chlorovodíkové"),
 ("Sn + 2 NaOH + 4 H₂O → Na₂[Sn(OH)₆] + 2 H₂", "cín v louhu"),
 ("3 Pb + 8 HNO₃ → 3 Pb(NO₃)₂ + 2 NO + 4 H₂O", "olovo ve zředěné kyselině dusičné"),
 ("SnCl₂ + 2 FeCl₃ → SnCl₄ + 2 FeCl₂", "cínatá sůl redukuje železité ionty"),
 ("PbO₂ + 4 HCl → PbCl₂ + Cl₂ + 2 H₂O", "oxid olovičitý jako oxidovadlo"),
 ("5 PbO₂ + 2 Mn²⁺ + 4 H⁺ → 5 Pb²⁺ + 2 MnO₄⁻ + 2 H₂O", "důkaz manganu oxidem olovičitým"),
 ("Pb + PbO₂ + 2 H₂SO₄ → 2 PbSO₄ + 2 H₂O", "vybíjení olověného akumulátoru"),
 ("PbO₂ + SO₄²⁻ + 4 H⁺ + 2 e⁻ → PbSO₄ + 2 H₂O", "katoda akumulátoru při vybíjení"),
 ("Pb + SO₄²⁻ → PbSO₄ + 2 e⁻", "anoda akumulátoru při vybíjení"),
 ("2 PbS + 3 O₂ → 2 PbO + 2 SO₂", "pražení galenitu"),
 ("PbO + C → Pb + CO", "redukce oxidu olovnatého"),
 ("SnO₂ + 2 C → Sn + 2 CO", "redukce kasiteritu"),
 ("Pb²⁺ + 2 I⁻ → PbI₂", "zlatý déšť"),
 ("PbO + 2 HNO₃ → Pb(NO₃)₂ + H₂O", "oxid olovnatý jako zásada"),
 ("PbO + 2 NaOH + H₂O → Na₂[Pb(OH)₄]", "oxid olovnatý jako kyselina"),
 ("6 PbO + O₂ → 2 Pb₃O₄", "výroba suříku"),
 ("Pb₃O₄ + 4 HNO₃ → PbO₂ + 2 Pb(NO₃)₂ + 2 H₂O", "rozklad suříku"),
 ("SnCl₄ + 4 H₂O → Sn(OH)₄ + 4 HCl", "hydrolýza chloridu cíničitého"),
 ("Sn + 2 Cl₂ → SnCl₄", "chlorid cíničitý"),
 ("SnS₂ + S²⁻ → SnS₃²⁻", "thiosůl cínu"),
 # --- k8 biogenní ---
 ("5 Ca²⁺ + 3 PO₄³⁻ + OH⁻ → Ca₅(PO₄)₃OH", "hydroxyapatit"),
 ("Ca₅(PO₄)₃OH + 4 H⁺ → 5 Ca²⁺ + 3 HPO₄²⁻ + H₂O", "rozpouštění skloviny kyselinou"),
 ("Ca₅(PO₄)₃OH + F⁻ → Ca₅(PO₄)₃F + OH⁻", "fluoridace skloviny"),
]

bad = 0
for eq, note in EQ:
    if note is None: continue
    if "→" not in eq: continue
    L, R = eq.split("→")
    la, lc = side(L); ra, rc = side(R)
    # elektrony jako "pseudoprvek" e — odečti je z náboje
    for d, ch_key in ((la, "l"), (ra, "r")):
        pass
    le = la.pop("e", 0); re_ = ra.pop("e", 0)
    lc -= le; rc -= re_          # e⁻ už nese náboj −1 přes zápis e⁻
    ok_atoms = la == ra
    ok_charge = abs(lc - rc) < 1e-9
    if not (ok_atoms and ok_charge):
        bad += 1
        print("✗", eq, "|", note)
        if not ok_atoms:
            ks = sorted(set(la) | set(ra))
            print("   atomy:", {k: (la.get(k, 0), ra.get(k, 0)) for k in ks if la.get(k, 0) != ra.get(k, 0)})
        if not ok_charge:
            print("   náboj: vlevo", lc, "vpravo", rc)
print("\nzkontrolováno rovnic:", sum(1 for e, n in EQ if n and "→" in e), " chybných:", bad)
