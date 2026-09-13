# -*- coding: utf-8 -*-
import math, re, sys
from collections import Counter
try: sys.stdout.reconfigure(encoding='utf-8')
except Exception: pass

print("=== spin-only magneticky moment mu = sqrt(n(n+2)) ===")
for n in range(6):
    print("  n=%d  mu=%.2f" % (n, math.sqrt(n*(n+2))))

h = 6.62607015e-34; c = 2.99792458e8; NA = 6.02214076e23
def cm2kj(v): return h*c*100*v*NA/1000.0
def cm2nm(v): return 1e7/v
print("=== rozstepeni Do ===")
for v in [8000, 10000, 13900, 17400, 20300, 21600, 26600, 30000]:
    print("  Do=%6d cm-1 -> %.0f kJ/mol, lambda=%.0f nm" % (v, cm2kj(v), cm2nm(v)))
print("  1 cm-1 = %.4f J/mol" % (h*c*100*NA))
print("  lambda 500 nm -> %.0f kJ/mol" % (h*c*NA/500e-9/1000))
print("  lambda 600 nm -> %.0f kJ/mol" % (h*c*NA/600e-9/1000))

def parse(sp):
    sp = sp.strip()
    m = re.match(r'^(\d+)\s+(.*)$', sp)
    mult = 1
    if m:
        mult = int(m.group(1)); sp = m.group(2)
    ch = 0
    m = re.search(r'\^\(([+-]?\d*)\)$', sp)
    if m:
        s = m.group(1)
        ch = 0 if s == '' else int(s)
        sp = sp[:m.start()]
    def expand(s):
        cnt = Counter(); i = 0
        while i < len(s):
            if s[i] == '(':
                depth = 1; j = i+1
                while depth:
                    if s[j] == '(': depth += 1
                    elif s[j] == ')': depth -= 1
                    j += 1
                inner = s[i+1:j-1]; k = j; num = ''
                while k < len(s) and s[k].isdigit():
                    num += s[k]; k += 1
                n = int(num) if num else 1
                for a, b in expand(inner).items(): cnt[a] += b*n
                i = k
            else:
                m2 = re.match(r'([A-Z][a-z]?)(\d*)', s[i:])
                if not m2 or not m2.group(1):
                    i += 1; continue
                cnt[m2.group(1)] += int(m2.group(2)) if m2.group(2) else 1
                i += m2.end()
        return cnt
    cnt = expand(sp)
    for a in list(cnt): cnt[a] *= mult
    return cnt, ch*mult

def check(name, left, right):
    L = Counter(); CL = 0
    for s in left:
        cc, ch = parse(s); L += cc; CL += ch
    R = Counter(); CR = 0
    for s in right:
        cc, ch = parse(s); R += cc; CR += ch
    ok = (L == R and CL == CR)
    print(("OK   " if ok else "FAIL ") + name)
    if not ok:
        print("      L:", dict(L), "q =", CL)
        print("      R:", dict(R), "q =", CR)
    return ok

EQS = [
 ("chroman -> dichroman", ["2 CrO4^(-2)", "2 H3O^(+1)"], ["Cr2O7^(-2)", "3 H2O"]),
 ("dichroman redukce (kysele)", ["Cr2O7^(-2)", "14 H3O^(+1)", "6 e^(-1)"], ["2 Cr^(+3)", "21 H2O"]),
 ("dichroman amonny rozklad", ["(NH4)2Cr2O7"], ["Cr2O3", "N2", "4 H2O"]),
 ("Cr(OH)3 amfoterie", ["Cr(OH)3", "OH^(-1)"], ["Cr(OH)4^(-1)"]),
 ("chromit prazeni", ["4 FeCr2O4", "8 Na2CO3", "7 O2"], ["8 Na2CrO4", "2 Fe2O3", "8 CO2"]),
 ("dichroman + siricitan", ["Cr2O7^(-2)", "3 SO3^(-2)", "8 H3O^(+1)"], ["2 Cr^(+3)", "3 SO4^(-2)", "12 H2O"]),
 ("Cr3+ + Zn", ["2 Cr^(+3)", "Zn"], ["2 Cr^(+2)", "Zn^(+2)"]),
 ("MnO4- kysele", ["MnO4^(-1)", "8 H3O^(+1)", "5 e^(-1)"], ["Mn^(+2)", "12 H2O"]),
 ("MnO4- neutralni/zasadite", ["MnO4^(-1)", "2 H2O", "3 e^(-1)"], ["MnO2", "4 OH^(-1)"]),
 ("MnO4- silne zasadite", ["MnO4^(-1)", "1 e^(-1)"], ["MnO4^(-2)"]),
 ("manganan disproporcionace", ["3 MnO4^(-2)", "4 H3O^(+1)"], ["2 MnO4^(-1)", "MnO2", "6 H2O"]),
 ("KMnO4 + kys. stavelova", ["2 KMnO4", "5 H2C2O4", "3 H2SO4"], ["2 MnSO4", "K2SO4", "10 CO2", "8 H2O"]),
 ("MnO4- + H2O2", ["2 MnO4^(-1)", "5 H2O2", "6 H3O^(+1)"], ["2 Mn^(+2)", "5 O2", "14 H2O"]),
 ("MnO2 + HCl", ["MnO2", "4 HCl"], ["MnCl2", "Cl2", "2 H2O"]),
 ("MnO4- + siricitan (kysele)", ["2 MnO4^(-1)", "5 SO3^(-2)", "6 H3O^(+1)"], ["2 Mn^(+2)", "5 SO4^(-2)", "9 H2O"]),
 ("MnO4- + siricitan (zasadite)", ["2 MnO4^(-1)", "3 SO3^(-2)", "H2O"], ["2 MnO2", "3 SO4^(-2)", "2 OH^(-1)"]),
 ("Fe + kyselina", ["Fe", "2 H3O^(+1)"], ["Fe^(+2)", "H2", "2 H2O"]),
 ("Fe(OH)2 oxidace vzduchem", ["4 Fe(OH)2", "O2", "2 H2O"], ["4 Fe(OH)3"]),
 ("Fe3+ + jodid", ["2 Fe^(+3)", "2 I^(-1)"], ["2 Fe^(+2)", "I2"]),
 ("zelezan priprava", ["2 Fe(OH)3", "3 ClO^(-1)", "4 OH^(-1)"], ["2 FeO4^(-2)", "3 Cl^(-1)", "5 H2O"]),
 ("Fe + vodni para", ["3 Fe", "4 H2O"], ["Fe3O4", "4 H2"]),
 ("Co(OH)2 oxidace", ["4 Co(OH)2", "O2", "2 H2O"], ["4 Co(OH)3"]),
 ("Mond synteza", ["Ni", "4 CO"], ["Ni(CO)4"]),
 ("NiOOH clanek", ["NiO(OH)", "H2O", "1 e^(-1)"], ["Ni(OH)2", "OH^(-1)"]),
 ("Cu + konc. HNO3", ["Cu", "4 HNO3"], ["Cu(NO3)2", "2 NO2", "2 H2O"]),
 ("Cu + zred. HNO3", ["3 Cu", "8 HNO3"], ["3 Cu(NO3)2", "2 NO", "4 H2O"]),
 ("Cu + konc. H2SO4", ["Cu", "2 H2SO4"], ["CuSO4", "SO2", "2 H2O"]),
 ("Cu2+ + jodid", ["2 Cu^(+2)", "4 I^(-1)"], ["2 CuI", "I2"]),
 ("Cu2O disproporcionace", ["Cu2O", "H2SO4"], ["CuSO4", "Cu", "H2O"]),
 ("Ag + zred. HNO3", ["3 Ag", "4 HNO3"], ["3 AgNO3", "NO", "2 H2O"]),
 ("AgCl + amoniak", ["AgCl", "2 NH3"], ["Ag(NH3)2^(+1)", "Cl^(-1)"]),
 ("Au + lucavka kralovska", ["Au", "4 HCl", "HNO3"], ["HAuCl4", "NO", "2 H2O"]),
 ("kyanidove louzeni zlata", ["4 Au", "8 CN^(-1)", "O2", "2 H2O"], ["4 Au(CN)2^(-1)", "4 OH^(-1)"]),
 ("cementace zinkem", ["2 Au(CN)2^(-1)", "Zn"], ["Zn(CN)4^(-2)", "2 Au"]),
 ("Zn + hydroxid", ["Zn", "2 OH^(-1)", "2 H2O"], ["Zn(OH)4^(-2)", "H2"]),
 ("ZnO + hydroxid", ["ZnO", "2 OH^(-1)", "H2O"], ["Zn(OH)4^(-2)"]),
 ("ZnO + kyselina", ["ZnO", "2 H3O^(+1)"], ["Zn^(+2)", "3 H2O"]),
 ("Zn(OH)2 + amoniak", ["Zn(OH)2", "4 NH3"], ["Zn(NH3)4^(+2)", "2 OH^(-1)"]),
 ("Hg + konc. HNO3", ["Hg", "4 HNO3"], ["Hg(NO3)2", "2 NO2", "2 H2O"]),
 ("Hg + zred. HNO3", ["6 Hg", "8 HNO3"], ["3 Hg2(NO3)2", "2 NO", "4 H2O"]),
 ("Hg2 2+ + hydroxid", ["Hg2^(+2)", "2 OH^(-1)"], ["HgO", "Hg", "H2O"]),
 ("HgCl2 + amoniak", ["HgCl2", "2 NH3"], ["HgNH2Cl", "NH4^(+1)", "Cl^(-1)"]),
 ("HgI2 + jodid", ["HgI2", "2 I^(-1)"], ["HgI4^(-2)"]),
 ("Haberuv proces", ["N2", "3 H2"], ["2 NH3"]),
 ("kontaktni proces", ["2 SO2", "O2"], ["2 SO3"]),
 ("Ostwalduv proces", ["4 NH3", "5 O2"], ["4 NO", "6 H2O"]),
 ("autokatalyzator NO+CO", ["2 CO", "2 NO"], ["2 CO2", "N2"]),
 ("autokatalyzator CO+O2", ["2 CO", "O2"], ["2 CO2"]),
 ("hydrogenace ethenu", ["C2H4", "H2"], ["C2H6"]),
 ("peroxodisiran + jodid", ["S2O8^(-2)", "2 I^(-1)"], ["2 SO4^(-2)", "I2"]),
 ("rozklad H2O2", ["2 H2O2"], ["2 H2O", "O2"]),
 ("dezoxidace manganem", ["FeO", "Mn"], ["Fe", "MnO"]),
 ("dezoxidace kremikem", ["2 FeO", "Si"], ["2 Fe", "SiO2"]),
 ("odsireni manganem", ["FeS", "Mn"], ["Fe", "MnS"]),
 ("pasivace chromu", ["4 Cr", "3 O2"], ["2 Cr2O3"]),
 ("konvertor - uhlik", ["2 C", "O2"], ["2 CO"]),
 ("konvertor - fosfor", ["4 P", "5 O2"], ["2 P2O5"]),
 ("odfosforeni struskou", ["P2O5", "3 CaO"], ["Ca3(PO4)2"]),
 ("aluminotermie chromu", ["Cr2O3", "2 Al"], ["2 Cr", "Al2O3"]),
 ("ferrochrom", ["FeCr2O4", "4 C"], ["Fe", "2 Cr", "4 CO"]),
 ("Krolluv proces", ["TiCl4", "2 Mg"], ["Ti", "2 MgCl2"]),
 ("V2O5 z metavanadicnanu", ["2 NH4VO3"], ["V2O5", "2 NH3", "H2O"]),
 ("TiO2 chlorace", ["TiO2", "2 C", "2 Cl2"], ["TiCl4", "2 CO"]),
 ("Fe3+ hydrolyza", ["Fe(H2O)6^(+3)", "H2O"], ["Fe(H2O)5(OH)^(+2)", "H3O^(+1)"]),
 ("Cu2+ + amoniak", ["Cu(H2O)6^(+2)", "4 NH3"], ["Cu(NH3)4(H2O)2^(+2)", "4 H2O"]),
 ("fotolyza AgBr", ["2 AgBr"], ["2 Ag", "Br2"]),
 ("ustalovani thiosiranem", ["AgBr", "2 S2O3^(-2)"], ["Ag(S2O3)2^(-3)", "Br^(-1)"]),
 ("berlinska modr", ["4 Fe^(+3)", "3 Fe(CN)6^(-4)"], ["Fe4(Fe(CN)6)3"]),
 ("Zn + Cu2+", ["Zn", "Cu^(+2)"], ["Zn^(+2)", "Cu"]),
 ("manganometrie Fe2+", ["MnO4^(-1)", "5 Fe^(+2)", "8 H3O^(+1)"], ["Mn^(+2)", "5 Fe^(+3)", "12 H2O"]),
 ("chromatometrie Fe2+", ["Cr2O7^(-2)", "6 Fe^(+2)", "14 H3O^(+1)"], ["2 Cr^(+3)", "6 Fe^(+3)", "21 H2O"]),
 ("Fe + CuSO4", ["Fe", "CuSO4"], ["FeSO4", "Cu"]),
 ("V2O5 cyklus a", ["2 V2O5", "2 SO2"], ["2 V2O4", "2 SO3"]),
 ("V2O5 cyklus b", ["2 V2O4", "O2"], ["2 V2O5"]),
 ("prazeni sfaleritu", ["2 ZnS", "3 O2"], ["2 ZnO", "2 SO2"]),
 ("rozklad Ag2O", ["2 Ag2O"], ["4 Ag", "O2"]),
 ("rozklad Au2O3", ["2 Au2O3"], ["4 Au", "3 O2"]),
 ("rozklad Cu(OH)2", ["Cu(OH)2"], ["CuO", "H2O"]),
 ("vysoka pec", ["Fe2O3", "3 CO"], ["2 Fe", "3 CO2"]),
 ("Cr2O3 + tavenina", ["2 Cr2O3", "4 Na2CO3", "3 O2"], ["4 Na2CrO4", "4 CO2"]),
 ("CrO3 z dichromanu", ["Cr2O7^(-2)", "2 H3O^(+1)"], ["2 CrO3", "3 H2O"]),
 ("Ag zcernani sulfanem", ["4 Ag", "2 H2S", "O2"], ["2 Ag2S", "2 H2O"]),
 ("hnedy prstenec", ["Fe^(+2)", "NO"], ["Fe(NO)^(+2)"]),
 ("Cu + Cl2", ["Cu", "Cl2"], ["CuCl2"]),
 ("Fe3O4 slozeni", ["FeO", "Fe2O3"], ["Fe3O4"]),
 ("Ni + HCl", ["Ni", "2 H3O^(+1)"], ["Ni^(+2)", "H2", "2 H2O"]),
 ("Co(II) chloridovy komplex", ["Co(H2O)6^(+2)", "4 Cl^(-1)"], ["CoCl4^(-2)", "6 H2O"]),
 ("Mn2+ na MnO4- (bismutecnan)", ["2 Mn^(+2)", "5 NaBiO3", "14 H3O^(+1)"],
   ["2 MnO4^(-1)", "5 Bi^(+3)", "5 Na^(+1)", "21 H2O"]),
 ("thermit zeleza", ["Fe2O3", "2 Al"], ["2 Fe", "Al2O3"]),
]
bad = [e[0] for e in EQS if not check(e[0], e[1], e[2])]
print("\n=== pocet rovnic: %d, chybnych: %d ===" % (len(EQS), len(bad)))
for b in bad: print("  !!", b)

print("\n=== dalsi vypocty ===")
# titrace: 20,00 ml FeSO4 spotrebuje 18,45 ml KMnO4 c=0,0200 mol/dm3
n_mno4 = 0.02 * 18.45e-3
n_fe = 5 * n_mno4
print("  n(MnO4-) = %.6f mol -> n(Fe2+) = %.6f mol -> c(Fe2+) = %.4f mol/dm3"
      % (n_mno4, n_fe, n_fe/20.00e-3))
# hmotnost zeleza
print("  m(Fe) = %.4f g (M = 55,85)" % (n_fe*55.85))
# dichromatometrie: 25,00 ml vzorku, 21,30 ml K2Cr2O7 c = 0,01667
n_cr = 0.01667*21.30e-3
print("  n(Cr2O7) = %.6f -> n(Fe2+) = %.6f -> c = %.4f mol/dm3" % (n_cr, 6*n_cr, 6*n_cr/25.0e-3))
# ocel 18/10: kolik kg Cr na 1 t
print("  1 t oceli 18/10: Cr = %d kg, Ni = %d kg" % (180, 100))
# hustota / molarni hmotnosti
M = {"KMnO4": 39.10+54.94+4*16.00, "K2Cr2O7": 2*39.10+2*52.00+7*16.00,
     "CuSO4.5H2O": 63.55+32.07+4*16.00+5*18.02, "FeSO4.7H2O": 55.85+32.07+4*16.00+7*18.02,
     "TiO2": 47.87+2*16.00, "Fe2O3": 2*55.85+3*16.00, "Fe3O4": 3*55.85+4*16.00}
for k, v in M.items(): print("  M(%s) = %.2f g/mol" % (k, v))
# obsah zeleza v hematitu
print("  w(Fe) v Fe2O3 = %.1f %%" % (2*55.85/M["Fe2O3"]*100))
print("  w(Fe) v Fe3O4 = %.1f %%" % (3*55.85/M["Fe3O4"]*100))
print("  w(Ti) v TiO2  = %.1f %%" % (47.87/M["TiO2"]*100))
# priprava KMnO4 roztoku
print("  m(KMnO4) na 500 ml c=0,0200 = %.4f g" % (0.02*0.5*M["KMnO4"]))
# pocet nesparovanych elektronu -> mu
for ion, n in [("Ti3+ d1",1), ("V3+ d2",2), ("Cr3+ d3",3), ("Mn2+ d5",5), ("Fe2+ d6 vs",4),
               ("Fe3+ d5 vs",5), ("Co2+ d7 vs",3), ("Ni2+ d8",2), ("Cu2+ d9",1), ("Zn2+ d10",0)]:
    print("  %-12s n=%d  mu=%.2f mu_B" % (ion, n, math.sqrt(n*(n+2))))
# lanthanoidova kontrakce
La, Lu = 103.2, 86.1
print("  kontrakce La3+ -> Lu3+: %.1f -> %.1f pm, tj. o %.1f pm = %.1f %%"
      % (La, Lu, La-Lu, (La-Lu)/La*100))
print("  Zr4+ 72 pm vs Hf4+ 71 pm -> rozdil %.1f %%" % ((72-71)/72*100))
