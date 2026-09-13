# -*- coding: utf-8 -*-
"""Kontrola bilance atomů a náboje pro všechny rovnice použité v průvodci."""
import re, sys, io
from collections import Counter
try: sys.stdout.reconfigure(encoding="utf-8")
except Exception: pass

SUB = {"₀":"0","₁":"1","₂":"2","₃":"3","₄":"4","₅":"5","₆":"6","₇":"7","₈":"8","₉":"9"}
SUP = {"⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","⁺":"+","⁻":"-"}

def norm(s):
    out=[]
    for ch in s:
        out.append(SUB.get(ch, ch))
    return "".join(out)

def split_charge(f):
    """oddělí náboj na konci vzorce — unicode (SO₄²⁻) i ASCII (SO4^2- / SO4 2-)"""
    f=f.strip()
    ch=0; i=len(f)
    while i>0 and f[i-1] in SUP: i-=1
    if i<len(f):
        t="".join(SUP[c] for c in f[i:])
        sign = 1 if t.endswith("+") else (-1 if t.endswith("-") else 0)
        num=t[:-1]
        return f[:i].rstrip("^ "), sign*(int(num) if num else 1)
    m=re.search(r"(?:\^\s*(\d*)|\s(\d+))?([+-])$", f)
    if m:
        sign = 1 if m.group(3)=="+" else -1
        n = m.group(1) or m.group(2) or ""
        return f[:m.start()].rstrip("^ "), sign*(int(n) if n else 1)
    return f, 0

def parse(formula):
    """vrátí Counter atomů; podporuje závorky a ·nH₂O (tečka)"""
    f, ch = split_charge(formula)
    f = norm(f).replace("[","(").replace("]",")").replace("{","(").replace("}",")")
    # hydráty: A·nH2O
    total = Counter()
    for part in re.split(r"[·.]", f):
        part=part.strip()
        if not part: continue
        m=re.match(r"^(\d+)\s*(.*)$", part)
        mult=1
        if m and m.group(2) and (m.group(2)[0].isalpha() or m.group(2).startswith("(")):
            mult=int(m.group(1)); part=m.group(2)
        total += Counter({k:v*mult for k,v in _parse_simple(part).items()})
    return total, ch

def _parse_simple(f):
    stack=[Counter()]
    i=0
    while i<len(f):
        c=f[i]
        if c=="(":
            stack.append(Counter()); i+=1
        elif c==")":
            grp=stack.pop(); i+=1
            n=""
            while i<len(f) and f[i].isdigit(): n+=f[i]; i+=1
            k=int(n) if n else 1
            for e,v in grp.items(): stack[-1][e]+=v*k
        elif c.isupper():
            sym=c; i+=1
            while i<len(f) and f[i].islower(): sym+=f[i]; i+=1
            n=""
            while i<len(f) and f[i].isdigit(): n+=f[i]; i+=1
            stack[-1][sym]+= int(n) if n else 1
        else:
            i+=1
    return stack[0]

def side(expr):
    tot=Counter(); q=0
    for term in re.split(r"\s\+\s", expr.strip()):
        term=term.strip()
        if not term: continue
        m=re.match(r"^(\d+)\s+(.*)$", term)
        k=1
        if m: k=int(m.group(1)); term=m.group(2).strip()
        # stavové značky
        term=re.sub(r"\((s|l|g|aq)\)","",term)
        term=term.strip()
        if term=="e-" or term=="e⁻":
            q-=k; continue
        a,c=parse(term)
        for e,v in a.items(): tot[e]+=v*k
        q+=c*k
    return tot,q

EQ = [
 ("C + O2 = CO2","hoření uhlíku"),
 ("2 C + O2 = 2 CO","nedokonalé hoření"),
 ("C + CO2 = 2 CO","Boudouardova rovnováha"),
 ("C + H2O = CO + H2","vodní plyn"),
 ("2 CO + O2 = 2 CO2","hoření CO"),
 ("CaCO3 = CaO + CO2","pálení vápence"),
 ("CaCO3 + 2 HCl = CaCl2 + H2O + CO2","důkaz uhličitanu"),
 ("CO2 + H2O = H2CO3","hydratace CO2"),
 ("H2CO3 = H⁺ + HCO3⁻","1. disociace"),
 ("HCO3⁻ = H⁺ + CO3²⁻","2. disociace"),
 ("2 NaHCO3 = Na2CO3 + CO2 + H2O","kalcinace jedlé sody"),
 ("2 NaOH + CO2 = Na2CO3 + H2O","absorpce CO2"),
 ("Ca(OH)2 + CO2 = CaCO3 + H2O","zákal vápenné vody"),
 ("CaCO3 + CO2 + H2O = Ca(HCO3)2","rozpouštění krasu"),
 ("Ca(HCO3)2 = CaCO3 + CO2 + H2O","vodní kámen"),
 ("CO2 + NH3 + H2O = NH4HCO3","Solvay 1"),
 ("NH4HCO3 + NaCl = NaHCO3 + NH4Cl","Solvay 2"),
 ("2 NH4Cl + Ca(OH)2 = CaCl2 + 2 NH3 + 2 H2O","Solvay recyklace NH3"),
 ("HCOOH = CO + H2O","příprava CO"),
 ("CaO + 3 C = CaC2 + CO","výroba karbidu vápníku"),
 ("CaC2 + 2 H2O = Ca(OH)2 + C2H2","hydrolýza CaC2"),
 ("Al4C3 + 12 H2O = 4 Al(OH)3 + 3 CH4","hydrolýza Al4C3"),
 ("Mg2C3 + 4 H2O = 2 Mg(OH)2 + C3H4","hydrolýza Mg2C3 na propin"),
 ("SiO2 + 3 C = SiC + 2 CO","výroba karborunda"),
 ("SiO2 + 2 C = Si + 2 CO","výroba technického křemíku"),
 ("CaC2 + N2 = CaCN2 + C","dusíkaté vápno"),
 ("2 CH4 + 2 NH3 + 3 O2 = 2 HCN + 6 H2O","Andrussow"),
 ("Na2CO3 + 4 C + N2 = 2 NaCN + 3 CO","výroba kyanidu"),
 ("HCN + NaOH = NaCN + H2O","neutralizace HCN"),
 ("2 AgCN = 2 Ag + (CN)2","termický rozklad na dikyan"),
 ("Si + 2 NaOH + H2O = Na2SiO3 + 2 H2","křemík v louhu"),
 ("Si + 2 H2O = SiO2 + 2 H2","křemík s parou"),
 ("SiO2 + 4 HF = SiF4 + 2 H2O","leptání skla"),
 ("SiO2 + 6 HF = H2SiF6 + 2 H2O","leptání do H2SiF6"),
 ("SiO2 + 2 NaOH = Na2SiO3 + H2O","tavení s louhem"),
 ("SiO2 + Na2CO3 = Na2SiO3 + CO2","tavení se sodou"),
 ("SiO2 + 2 Mg = Si + 2 MgO","laboratorní příprava Si"),
 ("3 SiO2 + 4 Al = 3 Si + 2 Al2O3","aluminotermie"),
 ("SiCl4 + 2 H2 = Si + 4 HCl","Siemensův proces"),
 ("Si + 3 HCl = SiHCl3 + H2","trichlorsilan"),
 ("Mg2Si + 4 HCl = SiH4 + 2 MgCl2","příprava silanu"),
 ("SiH4 + 2 O2 = SiO2 + 2 H2O","samozápalnost silanu"),
 ("SiCl4 + 4 H2O = H4SiO4 + 4 HCl","hydrolýza SiCl4"),
 ("Na2SiO3 + H2SO4 + H2O = Na2SO4 + H4SiO4","vytěsnění kyseliny křemičité"),
 ("2 H4SiO4 = H6Si2O7 + H2O","kondenzace"),
 ("6 SiO2 + Na2CO3 + CaCO3 = Na2CaSi6O14 + 2 CO2","tavení sodnovápenatého skla"),
 ("CaO + SiO2 = CaSiO3","tvorba křemičitanu"),
 ("Si + 2 Cl2 = SiCl4","chlorace křemíku"),
 ("3 Si + 2 N2 = Si3N4","nitrid křemíku"),
 ("Si + O2 = SiO2","hoření křemíku"),
 ("4 B + 3 O2 = 2 B2O3","hoření boru"),
 ("B + 3 HNO3 = H3BO3 + 3 NO2","oxidace boru"),
 ("2 B + 6 NaOH = 2 Na3BO3 + 3 H2","bor v tavenině louhu"),
 ("B2O3 + 3 Mg = 2 B + 3 MgO","výroba boru"),
 ("B2O3 + 3 C + 3 Cl2 = 2 BCl3 + 3 CO","redukční chlorace"),
 ("2 BCl3 + 3 H2 = 2 B + 6 HCl","čistý bor"),
 ("BCl3 + 3 H2O = H3BO3 + 3 HCl","hydrolýza BCl3"),
 ("4 BF3 + 6 H2O = 3 H3O⁺ + 3 BF4⁻ + H3BO3","hydrolýza BF3"),
 ("H3BO3 + 2 H2O = B(OH)4⁻ + H3O⁺","kyselost H3BO3"),
 ("2 H3BO3 = B2O3 + 3 H2O","dehydratace"),
 ("H3BO3 = HBO2 + H2O","na metaboritou"),
 ("Na2B4O7·10H2O + H2SO4 = 4 H3BO3 + Na2SO4 + 5 H2O","výroba kyseliny borité"),
 ("3 LiBH4 + BF3 = 2 B2H6 + 3 LiF","příprava diboranu"),
 ("2 NaBH4 + 2 H2SO4 = B2H6 + 2 H2 + 2 NaHSO4","příprava diboranu 2"),
 ("B2H6 + 6 H2O = 2 H3BO3 + 6 H2","hydrolýza diboranu"),
 ("B2H6 + 3 O2 = B2O3 + 3 H2O","hoření diboranu"),
 ("2 B2O3 + 7 C = B4C + 6 CO","karbid boru"),
 ("BCl3 + NH3 = BN + 3 HCl","nitrid boritý"),
 ("B2O3 + 6 HF = 2 BF3 + 3 H2O","fluorid boritý"),
 ("2 PbO + C = 2 Pb + CO2","redukce oxidu uhlíkem"),
 ("Fe2O3 + 3 CO = 2 Fe + 3 CO2","vysoká pec"),
 ("CS2 + 3 O2 = CO2 + 2 SO2","hoření sirouhlíku"),
 ("C + 2 S = CS2","syntéza sirouhlíku"),
 ("CH4 = C + 2 H2","výroba sazí"),
 ("CH4 + 4 Cl2 = CCl4 + 4 HCl","chlorace methanu"),
 ("CO + Cl2 = COCl2","fosgen"),
 ("Ni + 4 CO = Ni(CO)4","karbonyl niklu"),
 ("CO + NaOH = HCOONa","mravenčan"),
 ("2 K2Cr2O7 + 3 C = 2 K2CO3 + 2 Cr2O3 + CO2","oxidace uhlíku dichromanem"),
 ("6 CO2 + 6 H2O = C6H12O6 + 6 O2","fotosyntéza"),
 ("MgCO3 = MgO + CO2","rozklad magnezitu"),
 ("Na2CO3 + 2 HCl = 2 NaCl + H2O + CO2","soda a kyselina"),
 ("CO3²⁻ + H2O = HCO3⁻ + OH⁻","hydrolýza uhličitanu"),
 ("2 Na2B4O7·10H2O + ... = x","SKIP"),
 ("Na2B4O7·10H2O + 4 H2O2 + 2 NaOH + H2O = 4 NaBO2·H2O2·3H2O","peroxohydrát boritanu"),
 ("Na2SiO3 + 2 HCl = 2 NaCl + H2SiO3","vytěsnění"),
 ("SiF4 + 2 HF = H2SiF6","hexafluorokřemičitá"),
 ("Na2SiF6 = 2 NaF + SiF4","rozklad"),
 ("2 CaF2 + 2 H2SO4 + SiO2 = 2 CaSO4 + SiF4 + 2 H2O","příprava SiF4"),
 ("BF3 + NH3 = BF3NH3","adukt"),
 ("CO2 + 2 OH⁻ = CO3²⁻ + H2O","CO2 v nadbytku louhu"),
 ("CO2 + OH⁻ = HCO3⁻","CO2 v malém množství louhu"),
 ("CaCO3 + 2 H3O⁺ = Ca²⁺ + 3 H2O + CO2","uhličitan a kyselina iontově"),
 ("SiO2 + 2 CaCO3 + ... = x","SKIP"),
 ("C2²⁻ + 2 H2O = C2H2 + 2 OH⁻","hydrolýza acetylidu iontově"),
 ("BF3 + F⁻ = BF4⁻","tetrafluoroboritan"),
 ("SiF4 + 2 F⁻ = SiF6²⁻","hexafluorokřemičitan"),
 ("Fe³⁺ + 3 SCN⁻ = Fe(SCN)3","důkaz železitých iontů"),
 ("Ni²⁺ + 4 CN⁻ = Ni(CN)4²⁻","kyanokomplex"),
 ("2 Au + 4 CN⁻ + 0.5 O2 + H2O = 2 Au(CN)2⁻ + 2 OH⁻","SKIP"),
 ("4 Au + 8 CN⁻ + O2 + 2 H2O = 4 Au(CN)2⁻ + 4 OH⁻","kyanidové loužení zlata"),
 ("SiO4⁴⁻ + ... = x","SKIP"),
 ("2 SiO4⁴⁻ = Si2O7⁶⁻ + O²⁻","kondenzace dvou tetraedrů"),
]

bad=0
for eq,label in EQ:
    if "SKIP" in label: continue
    L,R = eq.split("=")
    la,lq = side(L); ra,rq = side(R)
    ok = (la==ra) and (lq==rq)
    if not ok:
        bad+=1
        diff = {e:(la.get(e,0), ra.get(e,0)) for e in set(la)|set(ra) if la.get(e,0)!=ra.get(e,0)}
        print("CHYBA  %-70s | %s" % (eq.strip(), label))
        print("       atomy L!=P: %s   náboj L=%+d P=%+d" % (diff, lq, rq))
print("\nzkontrolováno: %d rovnic, chybných: %d" % (len([e for e in EQ if "SKIP" not in e[1]]), bad))
