# -*- coding: utf-8 -*-
"""Overeni vsech cisel, ktera pouziji v resenych prikladech a modelech."""
import math, sys
try: sys.stdout.reconfigure(encoding="utf-8")
except Exception: pass

R = 8.314462618
NA = 6.02214076e23
h = 6.62607015e-34
c = 2.99792458e8

def p(label, val, unit=""):
    print("%-58s %s %s" % (label, val, unit))

print("=== MOLARNI HMOTNOSTI ===")
M = {"H":1.008,"O":15.999,"S":32.06,"Se":78.971,"Te":127.60,"Po":209.0,
     "Na":22.990,"K":39.098,"Ca":40.078,"Ba":137.33,"Fe":55.845,"Cu":63.546,
     "Zn":65.38,"C":12.011,"N":14.007,"Cl":35.45,"I":126.90,"Ag":107.87,"Mn":54.938}
def mm(*pairs):
    return sum(M[e]*n for e,n in pairs)
p("M(O2)", round(mm(("O",2)),3), "g/mol")
p("M(O3)", round(mm(("O",3)),3), "g/mol")
p("M(H2O2)", round(mm(("H",2),("O",2)),3), "g/mol")
p("M(S8)", round(mm(("S",8)),2), "g/mol")
p("M(H2S)", round(mm(("H",2),("S",1)),3), "g/mol")
p("M(SO2)", round(mm(("S",1),("O",2)),3), "g/mol")
p("M(SO3)", round(mm(("S",1),("O",3)),3), "g/mol")
p("M(H2SO4)", round(mm(("H",2),("S",1),("O",4)),3), "g/mol")
p("M(FeS2)", round(mm(("Fe",1),("S",2)),3), "g/mol")
p("M(Na2S2O3)", round(mm(("Na",2),("S",2),("O",3)),2), "g/mol")
p("M(Na2S2O3.5H2O)", round(mm(("Na",2),("S",2),("O",3))+5*mm(("H",2),("O",1)),2), "g/mol")
p("M(CaSO4.2H2O)", round(mm(("Ca",1),("S",1),("O",4))+2*mm(("H",2),("O",1)),2), "g/mol")
p("M(CaCO3)", round(mm(("Ca",1),("C",1),("O",3)),2), "g/mol")
p("M(SF6)", round(32.06+6*18.998,2), "g/mol")

print("\n=== SLOZENI OXIDU (urceni vzorce z % hm.) ===")
for f,n in (("SO2",2),("SO3",3)):
    Mo = 32.06+n*15.999
    p("w(S) v %s" % f, round(32.06/Mo*100,2), "%")

print("\n=== FOTOCHEMIE OZONU ===")
dHf_O3 = 142.7e3   # J/mol
dHf_O  = 249.18e3
E_O2diss = 2*dHf_O
p("disociacni energie O2 (2x dHf(O))", round(E_O2diss/1000,1), "kJ/mol")
lam = h*c*NA/E_O2diss
p("mezni vlnova delka pro stepeni O2", round(lam*1e9,1), "nm")
E_O3diss = dHf_O - dHf_O3
p("energie na O3 -> O2 + O", round(E_O3diss/1000,1), "kJ/mol")
p("mezni vlnova delka pro stepeni O3", round(h*c*NA/E_O3diss*1e9,0), "nm")
p("rozklad 2 O3 -> 3 O2, dH", round(-2*dHf_O3/1000,1), "kJ")
p("dH na 1 mol O3", round(-dHf_O3/1000,1), "kJ/mol")

print("\n=== KYSLIK ZE VZDUCHU ===")
Vm0 = 22.414   # dm3/mol pri 0 C, 101,325 kPa
Vm25 = R*298.15/101325*1000
p("molarni objem pri 25 C, 101,325 kPa", round(Vm25,3), "dm3/mol")
nO2 = 209.5/Vm0
p("n(O2) v 1 m3 vzduchu (0 C)", round(nO2,2), "mol")
p("m(O2) v 1 m3 vzduchu", round(nO2*mm(("O",2)),0), "g")

print("\n=== PEROXID VODIKU ===")
# "x objemu": 1 dm3 roztoku uvolni x dm3 O2 za normalnich podminek
for x in (10,20,30,100):
    nO2v = x/Vm0
    nH2O2 = 2*nO2v
    m = nH2O2*mm(("H",2),("O",2))
    p("roztok '%d objemu' -> m(H2O2) v 1 dm3" % x, round(m,1), "g  (w ~ %.1f %% pri rho 1,01)" % (m/1010*100))
# rozklad 100 cm3 3% roztoku
mH2O2 = 100*1.01*0.03
n = mH2O2/mm(("H",2),("O",2))
p("100 cm3 3% H2O2 (rho 1,01) -> m(H2O2)", round(mH2O2,2), "g")
p("  n(H2O2)", round(n,4), "mol")
p("  V(O2) pri 25 C", round(n/2*Vm25,2), "dm3")

print("\n=== SIRA ===")
p("hustota alfa-siry 2,07 g/cm3 -> n(S8) v 1 cm3", "%.5f" % (2.07/mm(("S",8))), "mol")
p("  pocet molekul S8 v 1 cm3", "%.2e" % (2.07/mm(("S",8))*NA), "")
# Claus: 1000 m3 zemniho plynu s 2 % obj. H2S
V = 1000*0.02*1000  # dm3
nH2S = V/Vm0
p("1000 m3 plynu s 2 obj.% H2S -> n(H2S)", round(nH2S,0), "mol")
p("  m(S) pri 100% vytezku", round(nH2S*32.06/1000,1), "kg")
p("  m(S) pri 97% vytezku", round(nH2S*32.06*0.97/1000,1), "kg")

print("\n=== SULFAN, pH A ROZPUSTNOST ===")
Ka1 = 1.0e-7
cH2S = 0.10
x = math.sqrt(Ka1*cH2S)
p("pH nasyceneho 0,10 M roztoku H2S", round(-math.log10(x),2), "")
Ks_CuS = 6e-37
p("s(CuS) z Ks = 6e-37", "%.1e" % math.sqrt(Ks_CuS), "mol/dm3")
Ks_ZnS = 2e-25
p("s(ZnS) z Ks = 2e-25", "%.1e" % math.sqrt(Ks_ZnS), "mol/dm3")

print("\n=== KONTAKTNI PROCES — ROVNOVAZNA KONVERZE ===")
dH = -197.8e3     # J   pro 2 SO2 + O2 -> 2 SO3
dS = -187.95      # J/K
def Kp(T):
    dG = dH - T*dS
    return math.exp(-dG/(R*T))
def conv(T, P=1.0, a=0.10, b=0.11):
    """vratí rovnovážnou konverzi SO2"""
    K = Kp(T)
    lo, hi = 0.0, min(a/2, b)*0.9999999
    for _ in range(200):
        xi = (lo+hi)/2
        num = (2*xi)**2 * (1-xi)
        den = (a-2*xi)**2 * (b-xi) * P
        if den <= 0: hi = xi; continue
        if num/den < K: lo = xi
        else: hi = xi
    return 2*(lo+hi)/2/a
for tC in (350,400,425,450,500,550,600,650):
    T = tC+273.15
    p("  T = %d C   K = %.3g bar^-1   konverze" % (tC, Kp(T)), "%.2f" % (conv(T)*100), "%")
p("  pri 450 C a 10 bar", "%.2f" % (conv(723.15,P=10)*100), "%")

print("\n=== VYROBA H2SO4 Z PYRITU ===")
mFeS2 = 1000e3  # g = 1 t
nFeS2 = mFeS2/mm(("Fe",1),("S",2))
nH2SO4 = 2*nFeS2
p("z 1 t FeS2 teoreticky m(H2SO4)", round(nH2SO4*mm(("H",2),("S",1),("O",4))/1e6,3), "t")
p("  pri celkovem vytezku 95 %", round(nH2SO4*mm(("H",2),("S",1),("O",4))/1e6*0.95,3), "t")
p("  V(SO2) pri 0 C z 1 t FeS2", round(2*nFeS2*Vm0/1000,0), "m3")

print("\n=== EMISE SO2 A ODSIRENI ===")
m_uhli = 1e6*1e6  # g = 1 Mt
w_S = 0.008
mS = m_uhli*w_S
nS = mS/32.06
mSO2 = nS*mm(("S",1),("O",2))
p("1 Mt uhli s 0,8 % S -> m(SO2)", round(mSO2/1e6,0), "t")
p("  po 95% odsireni unikne", round(mSO2/1e6*0.05,0), "t")
mGyps = nS*0.95*(mm(("Ca",1),("S",1),("O",4))+2*mm(("H",2),("O",1)))
p("  vznikne energosadrovce", round(mGyps/1e6,0), "t")
mCaCO3 = nS*0.95*mm(("Ca",1),("C",1),("O",3))
p("  spotreba vapence", round(mCaCO3/1e6,0), "t")

print("\n=== JODOMETRIE ===")
cthio = 0.1000; Vthio = 20.15e-3
n_thio = cthio*Vthio
p("n(S2O3^2-)", "%.6f" % n_thio, "mol")
p("n(I2) = n/2", "%.6f" % (n_thio/2), "mol")
p("c(I2) v 25,00 cm3", "%.5f" % (n_thio/2/0.02500), "mol/dm3")

print("\n=== REDENI KYSELINY SIROVE ===")
dHsol = -95.3e3   # J/mol pri nekonecnem zredeni
m_kys = 50.0; w = 0.98
n = m_kys*w/mm(("H",2),("S",1),("O",4))
Q = -dHsol*n
mtot = 50.0+500.0
p("n(H2SO4) v 50 g 98% kyseliny", round(n,4), "mol")
p("  uvolnene teplo", round(Q/1000,1), "kJ")
p("  ohrati 550 g roztoku (c = 4,18 J/g/K)", round(Q/(mtot*4.18),1), "K")
p("  ohrati 550 g roztoku (c = 3,0 J/g/K)", round(Q/(mtot*3.0),1), "K")

print("\n=== KONCENTROVANA H2SO4 — SLOZENI ===")
rho = 1.836  # g/cm3, 98 %
cM = rho*1000*0.98/mm(("H",2),("S",1),("O",4))
p("c(H2SO4) v 98% kyseline (rho 1,836)", round(cM,2), "mol/dm3")
p("  autobaterie 37 % hm., rho 1,28 -> c", round(1.28*1000*0.37/mm(("H",2),("S",1),("O",4)),2), "mol/dm3")

print("\n=== POLONIUM-210 ===")
T12 = 138.376*86400
lam = math.log(2)/T12
N = 1/209.98*NA
A = lam*N
p("aktivita 1 g Po-210", "%.3e" % A, "Bq")
p("  = ", round(A/1e12,0), "TBq/g")
Ealpha = 5.304e6*1.602176634e-19
p("tepelny vykon 1 g Po-210", round(A*Ealpha,1), "W")

print("\n=== SELEN — DENNI DAVKA ===")
p("55 ug Se -> n", "%.3e" % (55e-6/78.971), "mol")
p("  pocet atomu", "%.2e" % (55e-6/78.971*NA), "")

print("\n=== SF6 ===")
p("hustota SF6 pri 25 C, 101,325 kPa", round(146.06/Vm25,2), "g/dm3")
p("  pomer k hustote vzduchu (1,184 g/dm3)", round(146.06/Vm25/1.184,1), "x")

print("\n=== TRENDY VE SKUPINE 16 (tabulkove hodnoty, jen vypis) ===")
data = [
 ("O",  8, "[He]2s²2p⁴", 3.44, 66, -218.79, -182.96, 1313.9),
 ("S", 16, "[Ne]3s²3p⁴", 2.58,105,  115.21,  444.6,   999.6),
 ("Se",34, "[Ar]3d¹⁰4s²4p⁴",2.55,120, 221.0,  685.0,   941.0),
 ("Te",52, "[Kr]4d¹⁰5s²5p⁴",2.10,138, 449.5,  988.0,   869.3),
 ("Po",84, "[Xe]4f¹⁴5d¹⁰6s²6p⁴",2.00,140,254.0,962.0,  812.1),
]
for d in data:
    print("  %-3s Z=%-3d EN=%.2f r=%3d pm  t.t.=%8.2f  t.v.=%7.1f  I1=%6.1f" % (d[0],d[1],d[3],d[4],d[5],d[6],d[7]))
