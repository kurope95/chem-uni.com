# -*- coding: utf-8 -*-
"""Přepočet všech číselných výsledků, které se objeví v průvodci."""
import math, sys
sys.stdout.reconfigure(encoding="utf-8")

def p(label, val, unit="", d=3):
    print("  %-52s %s %s" % (label, ("%."+str(d)+"f") % val, unit))

A = dict(H=1.008, C=12.011, N=14.007, O=15.999, F=18.998, Na=22.990, Mg=24.305,
         Al=26.982, Si=28.085, P=30.974, S=32.06, Cl=35.45, K=39.098, Ca=40.078,
         Cu=63.546, Zn=65.38, Ag=107.868, Bi=208.980)

def M(**kw):
    return sum(A[k]*v for k, v in kw.items())

print("=== MOLÁRNÍ HMOTNOSTI [g·mol⁻¹] ===")
M_NH3   = M(N=1, H=3);            p("NH3", M_NH3)
M_H2    = M(H=2);                 p("H2", M_H2)
M_N2    = M(N=2);                 p("N2", M_N2)
M_HNO3  = M(H=1, N=1, O=3);       p("HNO3", M_HNO3)
M_NH4NO3= M(N=2, H=4, O=3);       p("NH4NO3", M_NH4NO3)
M_AMSO4 = M(N=2, H=8, S=1, O=4);  p("(NH4)2SO4", M_AMSO4)
M_UREA  = M(C=1, O=1, N=2, H=4);  p("CO(NH2)2 (močovina)", M_UREA)
M_NaNO3 = M(Na=1, N=1, O=3);      p("NaNO3", M_NaNO3)
M_CaNO3 = M(Ca=1, N=2, O=6);      p("Ca(NO3)2", M_CaNO3)
M_H3PO4 = M(H=3, P=1, O=4);       p("H3PO4", M_H3PO4)
M_H3PO3 = M(H=3, P=1, O=3);       p("H3PO3", M_H3PO3)
M_H3PO2 = M(H=3, P=1, O=2);       p("H3PO2", M_H3PO2)
M_P4O10 = M(P=4, O=10);           p("P4O10", M_P4O10)
M_P4    = M(P=4);                 p("P4", M_P4)
M_FAP   = M(Ca=5, P=3, O=12, F=1);p("Ca5(PO4)3F (fluoroapatit)", M_FAP)
M_CaP2O8= M(Ca=3, P=2, O=8);      p("Ca3(PO4)2", M_CaP2O8)
M_H2SO4 = M(H=2, S=1, O=4);       p("H2SO4", M_H2SO4)
M_NaN3  = M(Na=1, N=3);           p("NaN3", M_NaN3)
M_CaH2PO42 = M(Ca=1, H=4, P=2, O=8); p("Ca(H2PO4)2", M_CaH2PO42)

print("\n=== OBSAH DUSÍKU V HNOJIVECH [hmotnostní %] ===")
p("NH4NO3", 2*A['N']/M_NH4NO3*100, "%", 1)
p("(NH4)2SO4", 2*A['N']/M_AMSO4*100, "%", 1)
p("CO(NH2)2 močovina", 2*A['N']/M_UREA*100, "%", 1)
p("NaNO3", A['N']/M_NaNO3*100, "%", 1)
p("Ca(NO3)2", 2*A['N']/M_CaNO3*100, "%", 1)
p("NH3 kapalný", A['N']/M_NH3*100, "%", 1)

print("\n=== OBSAH P2O5 (hnojivářská konvence) ===")
M_P2O5 = M(P=2, O=5); p("M(P2O5)", M_P2O5)
p("Ca(H2PO4)2 → % P2O5", M_P2O5/M_CaH2PO42*100, "%", 1)

print("\n=== HABEROVA SYNTÉZA ===")
# 1 t H2 → NH3 (poměr 3 H2 : 2 NH3)
n_H2 = 1e6/M_H2
p("n(H2) v 1 t", n_H2/1000, "kmol", 1)
m_NH3 = n_H2*2/3*M_NH3/1e6
p("teoretická hmotnost NH3 z 1 t H2", m_NH3, "t", 2)
p("při 97 % celkové konverzi", m_NH3*0.97, "t", 2)
# entalpie
dH = -92.2  # kJ na 2 mol NH3
p("ΔH na 1 mol NH3", dH/2, "kJ·mol⁻¹", 1)
p("teplo uvolněné při výrobě 1 t NH3", -dH/2*1e6/M_NH3/1e6, "GJ", 2)
# rovnovážný výtěžek — orientační tabulka (literaturní hodnoty), jen kontrola trendu
print("\n=== pH ROZTOKU AMONIAKU ===")
Kb = 1.8e-5
for c in (0.10, 0.010, 1.0):
    oh = (-Kb + math.sqrt(Kb*Kb + 4*Kb*c))/2
    p("c(NH3) = %.3g mol·dm⁻³ → [OH⁻]" % c, oh*1000, "mmol·dm⁻³", 3)
    p("   pH", 14 + math.log10(oh), "", 2)
p("pKb(NH3)", -math.log10(Kb), "", 2)
p("pKa(NH4+)", 14 + math.log10(Kb), "", 2)

print("\n=== OSTWALDŮV PROCES ===")
n_NH3 = 1e6/M_NH3
p("n(NH3) v 1 t", n_NH3/1000, "kmol", 1)
p("teoretická hmotnost HNO3 (1:1)", n_NH3*M_HNO3/1e6, "t", 3)
p("při 95 % výtěžku", n_NH3*M_HNO3/1e6*0.95, "t", 3)
p("spotřeba O2 (2 mol na 1 mol NH3)", n_NH3*2*M(O=2)/1e6, "t", 3)

print("\n=== VAZEBNÉ ENERGIE [kJ·mol⁻¹] ===")
E = dict(NN1=163, NN2=418, NN3=945, PP1=201, PP3=490, OO2=498, HH=436,
         NH=391, PH=322, CC3=839)
for k, v in sorted(E.items()): print("  %-6s %d" % (k, v))
p("3 × N—N (hypotetický N4 na dvojici)", 3*E['NN1'], "kJ", 0)
p("N≡N", E['NN3'], "kJ", 0)
p("zisk trojné vazby proti třem jednoduchým", E['NN3']-3*E['NN1'], "kJ", 0)
p("3 × P—P", 3*E['PP1'], "kJ", 0)
p("P≡P", E['PP3'], "kJ", 0)
p("ztráta trojné vazby proti třem jednoduchým", E['PP3']-3*E['PP1'], "kJ", 0)
p("N2: energie na atom", E['NN3']/2, "kJ/atom", 1)
p("hypotetický N4 (6 vazeb): energie na atom", 6*E['NN1']/4, "kJ/atom", 1)
p("P4 (6 vazeb): energie na atom", 6*E['PP1']/4, "kJ/atom", 1)
p("2 P2: energie na atom", 2*E['PP3']/4, "kJ/atom", 1)

print("\n=== AIRBAG: OBJEM N2 Z NaN3 ===")
m = 130.0
n = m/M_NaN3
p("n(NaN3) ze 130 g", n, "mol", 3)
p("n(N2) = 1,5 × n(NaN3)", n*1.5, "mol", 3)
Vm0 = 22.414   # 0 °C, 101,325 kPa
Vm25 = 24.465  # 25 °C, 101,325 kPa
p("V(N2) za normálních podmínek (0 °C)", n*1.5*Vm0, "dm³", 1)
p("V(N2) při 25 °C a 101,325 kPa", n*1.5*Vm25, "dm³", 1)

print("\n=== SUPERFOSFÁT ===")
n_ap = 1e6/M_FAP
p("n(fluoroapatitu) v 1 t", n_ap/1000, "kmol", 3)
p("potřeba H2SO4 (5 mol na 1 mol) ", n_ap*5*M_H2SO4/1e6, "t", 3)
p("vznikne H3PO4 (3 mol na 1 mol)", n_ap*3*M_H3PO4/1e6, "t", 3)
p("vznikne CaSO4 (5 mol na 1 mol)", n_ap*5*M(Ca=1,S=1,O=4)/1e6, "t", 3)

print("\n=== TITRACE KYSELIN FOSFORU ===")
for name, Mx, sytnost in (("H3PO2 (jednosytná)", M_H3PO2, 1),
                          ("H3PO3 (dvojsytná)", M_H3PO3, 2),
                          ("H3PO4 (trojsytná)", M_H3PO4, 3)):
    n_a = 0.050
    n_b = n_a*sytnost
    p("%s: 0,050 mol → NaOH" % name, n_b, "mol", 3)
    p("   objem 0,500 mol·dm⁻³ NaOH", n_b/0.500*1000, "cm³", 1)

print("\n=== pKa ===")
for nm, pka in (("HNO2", 3.25), ("HNO3", -1.4), ("H3PO4 K1", 2.15),
                ("H3PO4 K2", 7.20), ("H3PO4 K3", 12.35),
                ("H3PO3 K1", 1.30), ("H3PO3 K2", 6.70), ("H3PO2", 1.20),
                ("NH4+", 9.25), ("HN3", 4.72), ("N2H5+", 7.98)):
    print("  %-12s pKa = %5.2f   Ka = %.3g" % (nm, pka, 10**(-pka)))

print("\n=== HYDROLÝZA / pH SOLÍ ===")
# 0,10 M NH4Cl
Ka_NH4 = 10**(-9.25)
h = math.sqrt(Ka_NH4*0.10)
p("0,10 mol·dm⁻³ NH4Cl → pH", -math.log10(h), "", 2)
# 0,10 M NaNO2
Kb_NO2 = 1e-14/10**(-3.25)
oh = math.sqrt(Kb_NO2*0.10)
p("0,10 mol·dm⁻³ NaNO2 → pH", 14+math.log10(oh), "", 2)
# 0,10 M Na3PO4
Kb_PO4 = 1e-14/10**(-12.35)
oh = (-Kb_PO4 + math.sqrt(Kb_PO4**2 + 4*Kb_PO4*0.10))/2
p("0,10 mol·dm⁻³ Na3PO4 → pH", 14+math.log10(oh), "", 2)

print("\n=== ROZTOK HNO3 ===")
# 68% azeotrop, hustota 1,41 g/cm3
w, rho = 0.684, 1.41
c = w*rho*1000/M_HNO3
p("68,4% HNO3 (ρ = 1,41 g·cm⁻³) → c", c, "mol·dm⁻³", 2)
w, rho = 0.98, 1.51
p("98% dýmavá HNO3 (ρ = 1,51) → c", w*rho*1000/M_HNO3, "mol·dm⁻³", 2)

print("\n=== DUSÍK VE VZDUCHU ===")
p("objemový zlomek N2", 78.08, "%", 2)
p("hmotnostní zlomek N2 (M_vzduch = 28,96)", 78.08*M_N2/2896*100/100*100/100, "%", 2)
p("parciální tlak N2 při 101,325 kPa", 0.7808*101.325, "kPa", 2)

print("\n=== STECHIOMETRIE: NH3 z N2 ===")
V = 1000.0  # m3 N2 za normálních podmínek
n = V*1000/Vm0
p("n(N2) v 1000 m³ (0 °C)", n/1000, "kmol", 2)
p("m(NH3) teoreticky", n*2*M_NH3/1e6, "t", 3)
p("potřeba H2", n*3*Vm0/1000, "m³", 1)

print("\n=== OXIDAČNÍ ČÍSLA — kontrola součtů ===")
def oxn(label, known, unknown_count, charge):
    """known: seznam (počet, ox.číslo); vrátí ox. číslo neznámého prvku"""
    s = sum(k*v for k, v in known)
    x = (charge - s)/unknown_count
    print("  %-22s → %+.2f" % (label, x))
oxn("N v NH4+", [(4, +1)], 1, +1)
oxn("N v NO3-", [(3, -2)], 1, -1)
oxn("N v NO2-", [(2, -2)], 1, -1)
oxn("N v N2O", [(1, -2)], 2, 0)
oxn("N v N2H4", [(4, +1)], 2, 0)
oxn("N v NH2OH", [(3, +1), (1, -2)], 1, 0)
oxn("N v HN3", [(1, +1)], 3, 0)
oxn("P v H3PO2", [(3, +1), (2, -2)], 1, 0)
oxn("P v H3PO3", [(3, +1), (3, -2)], 1, 0)
oxn("P v H3PO4", [(3, +1), (4, -2)], 1, 0)
oxn("P v H4P2O6", [(4, +1), (6, -2)], 2, 0)
oxn("P v PO4^3-", [(4, -2)], 1, -3)
oxn("P v P4O10", [(10, -2)], 4, 0)
oxn("P v PH3", [(3, +1)], 1, 0)
oxn("P v PCl5", [(5, -1)], 1, 0)
oxn("N v NH4NO3 (průměr)", [(4, +1), (3, -2)], 2, 0)

print("\n=== N2O JAKO SKLENÍKOVÝ PLYN ===")
p("GWP-100 (IPCC AR6)", 273, "×CO2", 0)
p("životnost v atmosféře", 116, "let", 0)

print("\nHOTOVO")
