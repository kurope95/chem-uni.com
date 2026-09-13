# -*- coding: utf-8 -*-
"""Prepocty vsech cisel, ktera se objevi v pruvodci 'Koordinacni slouceniny'."""
import math

h  = 6.62607015e-34
c  = 2.99792458e8
NA = 6.02214076e23
R  = 8.314462618
T  = 298.15

hcNA_kJnm = h * c * NA * 1e9 / 1000.0      # kJ*nm/mol
print("hc*NA = %.1f kJ*nm/mol  (pouziva se jako 1,196e5)" % hcNA_kJnm)
print("hc    = %.2f eV*nm      (pouziva se jako 1240)" % (h*c/1.602176634e-19*1e9))
print()

def lam(wn):  return 1e7 / wn                 # cm^-1 -> nm
def wn(l):    return 1e7 / l                  # nm -> cm^-1
def eV(l):    return 1239.842 / l
def kJ(l):    return hcNA_kJnm / l

# ---- 1. tabulka Delta(Oh) pro modely a tabulky ---------------------------
# hodnoty v cm^-1 podle beznych tabulek (Shriver-Atkins, Huheey, Housecroft)
KOMPLEXY = [
 ("[CrCl6]3-",      13000, "Cr(III)"),
 ("[CrF6]3-",       15060, "Cr(III)"),
 ("[Cr(H2O)6]3+",   17400, "Cr(III)"),
 ("[Cr(NH3)6]3+",   21600, "Cr(III)"),
 ("[Cr(CN)6]3-",    26600, "Cr(III)"),
 ("[CoF6]3-",       13100, "Co(III)"),
 ("[Co(H2O)6]3+",   18200, "Co(III)"),
 ("[Co(NH3)6]3+",   22900, "Co(III)"),
 ("[Co(en)3]3+",    23200, "Co(III)"),
 ("[Co(CN)6]3-",    33500, "Co(III)"),
 ("[Rh(NH3)6]3+",   34000, "Rh(III)"),
 ("[Ir(NH3)6]3+",   41000, "Ir(III)"),
 ("[Fe(H2O)6]2+",   10400, "Fe(II)"),
 ("[Fe(H2O)6]3+",   13700, "Fe(III)"),
 ("[Fe(CN)6]4-",    32200, "Fe(II)"),
 ("[Fe(CN)6]3-",    35000, "Fe(III)"),
 ("[Ni(H2O)6]2+",    8500, "Ni(II)"),
 ("[Ni(NH3)6]2+",   10800, "Ni(II)"),
 ("[Ni(en)3]2+",    11500, "Ni(II)"),
 ("[Ti(H2O)6]3+",   20300, "Ti(III)"),
 ("[V(H2O)6]3+",    17700, "V(III)"),
 ("[Mn(H2O)6]2+",    7800, "Mn(II)"),
 ("[Co(H2O)6]2+",    9300, "Co(II)"),
 ("[Cu(H2O)6]2+",   12600, "Cu(II)"),
]
print("--- Delta(Oh): vlnocet -> vlnova delka -> energie ---")
for n, w, ox in KOMPLEXY:
    print("%-16s %6d cm-1  %6.0f nm  %5.2f eV  %6.1f kJ/mol   %s"
          % (n, w, lam(w), eV(lam(w)), kJ(lam(w)), ox))
print()

# kontrola proti udajum, ktere uvadi Klikorka (str. 532)
print("--- kontrola proti hodnotam z knihy ---")
for n, w, ev_book, nm_book in [("[Co(NH3)6]3+", 23000, 2.85, 435),
                               ("[Rh(NH3)6]3+", 34000, 4.2, 295),
                               ("[Ir(NH3)6]3+", 41000, 5.1, 245)]:
    print("%-14s %5d cm-1 -> %.0f nm (kniha %d) , %.2f eV (kniha %.2f)"
          % (n, w, lam(w), nm_book, eV(lam(w)), ev_book))
print("interval viditelneho svetla 400-700 nm -> %.0f - %.0f cm-1"
      % (wn(700), wn(400)))
print("interval viditelneho svetla 400-700 nm -> %.2f - %.2f eV"
      % (eV(700), eV(400)))
print()

# ---- 2. Delta(Td) = 4/9 Delta(Oh) ----------------------------------------
print("--- tetraedricke pole: Delta(Td) = 4/9 * Delta(Oh) ---")
for n, w in [("[Ni(H2O)6]2+ -> hypoteticky [Ni(H2O)4]2+", 8500),
             ("[CoCl4]2- z [CoCl6]4-", 7000),
             ("[Co(H2O)6]2+ -> [Co(H2O)4]2+", 9300)]:
    print("%-40s %5d -> %5.0f cm-1 (%.0f nm)" % (n, w, 4/9*w, lam(4/9*w)))
print("4/9 = %.4f  tj. %.1f %%" % (4/9, 400/9))
print()

# ---- 3. spinove magneticke momenty ---------------------------------------
print("--- spinove momenty mu = sqrt(n(n+2)) mu_B ---")
for n in range(0, 6):
    print("n = %d nesparovanych e-  ->  mu = %.2f mu_B" % (n, math.sqrt(n*(n+2))))
print()

# ---- 4. CFSE v jednotkach Delta_o ---------------------------------------
print("--- CFSE oktaedr (jednotky Delta_o), t2g = -0,4 ; eg = +0,6 ---")
def cfse(d, low):
    """vrati (t2g, eg, nepar, CFSE v Delta_o)"""
    if low:
        t = min(d, 6); e = d - t
        unp = (t if t <= 3 else 6 - t) + (e if e <= 2 else 4 - e)
    else:
        first = min(d, 5); second = max(0, d - 5)
        t = min(3, first) + min(3, second)
        e = max(0, first - 3) + max(0, second - 3)
        unp = d if d <= 5 else 10 - d
    return t, e, unp, -0.4*t + 0.6*e

for d in range(1, 11):
    th, eh, uh, ch_ = cfse(d, False)
    tl, el, ul, cl = cfse(d, True)
    same = "stejne" if uh == ul else "RUZNE"
    print("d%-2d  slabe: t2g%d eg%d  n=%d  CFSE=%+.1f | silne: t2g%d eg%d  n=%d  CFSE=%+.1f   %s"
          % (d, th, eh, uh, ch_, tl, el, ul, cl, same))
print()

# ---- 4b. srazeni volneho iontu komplexem -------------------------------
print("--- volny Ag+ v roztoku amminkomplexu ---")
b2 = 10**7.05
cA = 0.10; cN = 1.0
print("beta2([Ag(NH3)2]+) = 10^7,05 = %.2e" % b2)
print("c(Ag+) = %.2f / (%.2e * %.1f^2) = %.2e mol/dm3" % (cA, b2, cN, cA/(b2*cN**2)))
Ksp_AgCl = 1.8e-10; Ksp_AgBr = 5.4e-13
b2_thio = 10**13.5
print("AgCl + 2 NH3 : K = Ksp*beta2 = %.1e * %.1e = %.1e  -> rozpousti se" % (Ksp_AgCl, b2, Ksp_AgCl*b2))
print("AgBr + 2 NH3 : K = %.1e * %.1e = %.1e  -> nerozpousti se" % (Ksp_AgBr, b2, Ksp_AgBr*b2))
print("AgBr + 2 S2O3(2-) : K = %.1e * %.1e = %.1e -> rozpousti se (ustalovac)"
      % (Ksp_AgBr, b2_thio, Ksp_AgBr*b2_thio))
print()

# ---- 5. konstanty stability a chelatovy efekt ----------------------------
print("--- konstanty stability: log beta -> dG = -2,303 RT log beta ---")
fac = 2.302585 * R * T / 1000.0
print("2,303 RT = %.3f kJ/mol pri %.2f K" % (fac, T))
LOGB = [
 ("[Ag(NH3)2]+",      7.05),
 ("[Ag(S2O3)2]3-",   13.5),
 ("[Ag(CN)2]-",      20.5),
 ("[Cu(NH3)4]2+",    12.6),
 ("[Cu(en)2]2+",     19.6),
 ("[Ni(NH3)6]2+",     8.6),
 ("[Ni(en)3]2+",     18.3),
 ("[Zn(NH3)4]2+",     9.1),
 ("[Fe(SCN)]2+",      3.0),
 ("[FeF]2+",          5.2),
 ("[Co(NH3)6]3+",    35.2),
 ("[HgI4]2-",        29.8),
 ("[Fe(CN)6]4-",     35.0),
]
for n, lb in LOGB:
    print("%-16s log beta = %5.2f   dG = %8.1f kJ/mol" % (n, lb, -fac*lb))
print()
print("--- chelatovy efekt: Ni(II) ---")
d1 = 8.6; d2 = 18.3
print("6 NH3 : log beta6 = %.1f  ->  dG = %.0f kJ/mol" % (d1, -fac*d1))
print("3 en  : log beta3 = %.1f  ->  dG = %.0f kJ/mol" % (d2, -fac*d2))
print("rozdil: dlog = %.1f rady  ->  ddG = %.0f kJ/mol ve prospech chelatu"
      % (d2-d1, -fac*(d2-d1)))
print("pomer konstant K(en)/K(NH3) = 10^%.1f = %.1e" % (d2-d1, 10**(d2-d1)))
print()
print("--- chelatovy efekt: Cu(II) ---")
c1 = 12.6; c2 = 19.6
print("4 NH3 : log beta4 = %.1f  ->  dG = %.0f kJ/mol" % (c1, -fac*c1))
print("2 en  : log beta2 = %.1f  ->  dG = %.0f kJ/mol" % (c2, -fac*c2))
print("rozdil %.1f rady, ddG = %.0f kJ/mol" % (c2-c1, -fac*(c2-c1)))
print()

# ---- 6. EDTA -------------------------------------------------------------
print("--- EDTA: log K komplexu MY ---")
EDTA = [("Mg2+", 8.7), ("Ca2+", 10.7), ("Mn2+", 13.9), ("Fe2+", 14.3),
        ("Zn2+", 16.5), ("Pb2+", 18.0), ("Cu2+", 18.8), ("Ni2+", 18.6),
        ("Hg2+", 21.8), ("Fe3+", 25.1)]
for n, lk in EDTA:
    print("%-6s log K = %5.1f   dG = %8.1f kJ/mol" % (n, lk, -fac*lk))
print()

# ---- 7. tvrdost vody / titrace ------------------------------------------
print("--- prikladovy vypocet: titrace tvrdosti vody ---")
V = 100.0        # ml vzorku
cE = 0.0100      # mol/dm3 EDTA
VE = 12.40       # ml spotreba
n = cE * VE / 1000.0
cCa = n / (V/1000.0)
print("n(EDTA) = %.4f * %.2f/1000 = %.3e mol" % (cE, VE, n))
print("c(Ca2+) = %.3e / %.3f = %.3e mol/dm3 = %.3f mmol/dm3" % (n, V/1000, cCa, cCa*1000))
print("prepocet na mg CaCO3 / dm3 : %.1f  (M = 100,09 g/mol)" % (cCa*100.09*1000))
print()

# ---- 8. barevny kruh: doplnkove barvy -----------------------------------
print("--- absorbovana vs. pozorovana barva ---")
PARY = [(410, "fialova", "zlutozelena"), (450, "modra", "zluta"),
        (480, "zelenomodra", "oranzova"), (500, "modrozelena", "cervena"),
        (530, "zelena", "purpurova"), (560, "zlutozelena", "fialova"),
        (580, "zluta", "modra"), (610, "oranzova", "zelenomodra"),
        (680, "cervena", "modrozelena")]
for l, a, o in PARY:
    print("%3d nm  absorbuje %-12s  vidime %-12s  (Delta = %5.0f cm-1, %.1f kJ/mol)"
          % (l, a, o, wn(l), kJ(l)))
print()

# ---- 9. kontrola konkretnich prikladu z textu ---------------------------
print("--- kontrola prikladu pouzitych ve vykladu ---")
print("[Ti(H2O)6]3+ : Delta = 20300 cm-1 -> %.0f nm -> %.1f kJ/mol  (absorbuje zelenou, vidime fialovou)"
      % (lam(20300), kJ(lam(20300))))
print("[Cu(H2O)6]2+ : Delta = 12600 cm-1 -> %.0f nm  (absorbuje cervenou/IR, vidime bledou modrou)"
      % lam(12600))
print("[Cu(NH3)4]2+ : absorbuje pri 600 nm -> Delta = %.0f cm-1  (sytejsi modrofialova)" % wn(600))
print("[Ni(H2O)6]2+ : 8500 cm-1 -> %.0f nm ; [Ni(NH3)6]2+ 10800 -> %.0f nm"
      % (lam(8500), lam(10800)))
print("[Co(NH3)6]3+ : 22900 cm-1 -> %.0f nm -> absorbuje modrofialovou, vidime zlutooranzovou"
      % lam(22900))
print("[CoCl4]2-    : Delta(Td) mala, absorbuje kolem 690 nm -> vidime intenzivne modrou;"
      " vlnocet = %.0f cm-1" % wn(690))
print()
print("--- rust Delta se skupinou (kniha: +30 az 50 %% na periodu) ---")
print("Co->Rh: %5.1f %% ; Rh->Ir: %5.1f %%"
      % ((34000-22900)/22900*100, (41000-34000)/34000*100))
print("--- rust Delta s oxidacnim cislem ---")
print("[Fe(H2O)6]2+ 10400 -> [Fe(H2O)6]3+ 13700 : +%.0f %%" % ((13700-10400)/10400*100))
print("[Co(H2O)6]2+  9300 -> [Co(H2O)6]3+ 18200 : +%.0f %%" % ((18200-9300)/9300*100))
