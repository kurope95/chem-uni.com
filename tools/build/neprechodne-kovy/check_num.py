# -*- coding: utf-8 -*-
"""Přepočet všech čísel v řešených příkladech a v num-otázkách."""
import sys
try: sys.stdout.reconfigure(encoding="utf-8")
except Exception: pass
def p(lbl, v, unit=""): print("%-56s %s %s" % (lbl, v, unit))

F = 96485.0
M = dict(H=1.008, Li=6.941, C=12.011, N=14.007, O=15.999, Na=22.990, Mg=24.305,
         Al=26.982, S=32.06, Cl=35.45, K=39.098, Ca=40.078, Sn=118.71, Pb=207.2,
         Ba=137.33, Br=79.904, Sr=87.62, Be=9.012, Tl=204.38, Ge=72.63, Rb=85.468, Cs=132.905)

print("=== 1. Hall–Héroult: kolik elektřiny na 1 t hliníku ===")
n_Al = 1e6 / M["Al"]              # mol
Q = n_Al * 3 * F                  # C
p("n(Al) v 1 t", round(n_Al, 0), "mol")
p("náboj Q = n·z·F", "%.3e" % Q, "C")
p("Q v A·h", round(Q/3600, 0), "A·h")
# spotřeba energie při napětí 4,3 V
p("teoretická energie při U = 4,3 V", round(Q*4.3/3.6e6, 2), "kWh na 1 t?")
p("  → na 1 kg", round(Q*4.3/3.6e6/1000, 2), "kWh·kg⁻¹")
# reálná ~13-15 kWh/kg

print("\n=== 2. Solvay: výtěžek sody z 1 t NaCl ===")
Mnacl = M["Na"]+M["Cl"]; Msoda = 2*M["Na"]+M["C"]+3*M["O"]
p("M(NaCl)", round(Mnacl,3), "g·mol⁻¹")
p("M(Na₂CO₃)", round(Msoda,2), "g·mol⁻¹")
n = 1e6/Mnacl
p("n(NaCl) v 1 t", round(n,0), "mol")
p("teoretická m(Na₂CO₃) = n/2 · M", round(n/2*Msoda/1e3,1), "kg")
p("při výtěžku 75 %", round(0.75*n/2*Msoda/1e3,1), "kg")

print("\n=== 3. Tvrdost vody ===")
Mcao = M["Ca"]+M["O"]
p("M(CaO)", round(Mcao,2), "g·mol⁻¹")
p("1 °dH = 10 mg CaO/l =", round(10/Mcao,4), "mmol·l⁻¹")
p("1 mmol·l⁻¹ =", round(Mcao/10,3), "°dH")
p("1 mmol·l⁻¹ Ca²⁺ v mg/l", round(M["Ca"],2), "mg·l⁻¹")
# příklad: voda 96 mg Ca/l a 18 mg Mg/l
cCa = 96/M["Ca"]; cMg = 18/M["Mg"]
p("c(Ca²⁺) z 96 mg/l", round(cCa,3), "mmol·l⁻¹")
p("c(Mg²⁺) z 18 mg/l", round(cMg,3), "mmol·l⁻¹")
p("celková tvrdost", round(cCa+cMg,3), "mmol·l⁻¹")
p("  ve stupních německých", round((cCa+cMg)*Mcao/10,2), "°dH")

print("\n=== 4. Vápenný cyklus: z 1 t vápence ===")
Mcaco3 = M["Ca"]+M["C"]+3*M["O"]
p("M(CaCO₃)", round(Mcaco3,2))
n = 1e6/Mcaco3
p("m(CaO) teoreticky", round(n*Mcao/1e3,1), "kg")
p("m(CO₂)", round(n*(M["C"]+2*M["O"])/1e3,1), "kg")
p("hmotnostní úbytek", round(100*(M["C"]+2*M["O"])/Mcaco3,1), "%")

print("\n=== 5. Olověný akumulátor ===")
p("E° katoda PbO₂/PbSO₄", 1.691, "V")
p("E° anoda PbSO₄/Pb", -0.359, "V")
p("napětí článku", round(1.691-(-0.359),3), "V")
p("6 článků", round(6*(1.691+0.359),2), "V")
# kolik PbSO4 na 1 A·h
n_e = 3600/F
p("n(e⁻) na 1 A·h", round(n_e,5), "mol")
Mpbso4 = M["Pb"]+M["S"]+4*M["O"]
p("M(PbSO₄)", round(Mpbso4,2))
p("m(PbSO₄) na obou elektrodách na 1 A·h", round(2*n_e*Mpbso4,2), "g")
p("spotřeba H₂SO₄ na 1 A·h", round(n_e*(2*M["H"]+M["S"]+4*M["O"]),2), "g")

print("\n=== 6. Ionizační energie a inertní pár (NIST, kJ·mol⁻¹) ===")
IE = {"Ge":[762.0,1537.5,3302.1,4411.0], "Sn":[708.6,1411.8,2943.0,3930.3], "Pb":[715.6,1450.5,3081.5,4083.0]}
for e,v in IE.items():
    p("%s: I₁+I₂"%e, round(v[0]+v[1],1))
    p("   I₃+I₄", round(v[2]+v[3],1))
print("  rozdíl Pb − Sn v (I₃+I₄):", round((IE["Pb"][2]+IE["Pb"][3])-(IE["Sn"][2]+IE["Sn"][3]),1), "kJ·mol⁻¹")
IE13 = {"Al":[577.5,1816.7,2744.8], "Ga":[578.8,1979.3,2963.0], "In":[558.3,1820.7,2704.0], "Tl":[589.4,1971.0,2878.0]}
for e,v in IE13.items():
    p("%s: I₁"%e, v[0]); p("   I₂+I₃", round(v[1]+v[2],1))
print("  rozdíl Tl − In v (I₂+I₃):", round((IE13["Tl"][1]+IE13["Tl"][2])-(IE13["In"][1]+IE13["In"][2]),1), "kJ·mol⁻¹")
print("  součet I₁+I₂+I₃ Al:", round(sum(IE13["Al"]),1), " Tl:", round(sum(IE13["Tl"]),1))

print("\n=== 7. Energetická bilance oxidačního stavu III u Tl ===")
# zisk ze dvou vazeb M-Cl navíc proti ztrátě I2+I3
EMCl = {"Al":421.0, "Ga":354.0, "In":328.0, "Tl":253.0}   # průměrná vazebná energie M–Cl [kJ·mol⁻¹]
for e in ["Al","Ga","In","Tl"]:
    zisk = 2*EMCl[e]
    ztrata = IE13[e][1]+IE13[e][2]
    p("%s: 2·E(M–Cl) = %d  vs.  I₂+I₃ = %d → rozdíl"%(e,zisk,ztrata), round(zisk-ztrata,0), "kJ·mol⁻¹")

print("\n=== 8. Biogenní prvky ===")
p("Na⁺ extracelulárně", 142, "mmol·l⁻¹")
p("Na⁺ intracelulárně", 12, "mmol·l⁻¹")
p("poměr Na⁺ ven/dovnitř", round(142/12,1), "×")
p("K⁺ intracelulárně", 140, "mmol·l⁻¹")
p("K⁺ extracelulárně", 4.2, "mmol·l⁻¹")
p("poměr K⁺ dovnitř/ven", round(140/4.2,1), "×")
# Nernst pro K+ při 37 °C
import math
R=8.314; T=310.15
Ek = R*T/(1*F)*math.log(4.2/140)*1000
p("Nernstův rovnovážný potenciál pro K⁺ při 37 °C", round(Ek,1), "mV")
Ena = R*T/(1*F)*math.log(142/12)*1000
p("Nernstův rovnovážný potenciál pro Na⁺", round(Ena,1), "mV")
# 5 g soli
Msalt = M["Na"]+M["Cl"]
p("5 g NaCl obsahuje Na", round(5*M["Na"]/Msalt,2), "g")
p("  v mmol", round(5/Msalt*1000,1), "mmol")
# vápník v kostech
p("Ca v těle 70kg člověka", 1100, "g")
p("z toho v kostech 99 %", 1089, "g")

print("\n=== 9. Rozpustnost a součin rozpustnosti ===")
Ks = {"CaSO₄":4.93e-5, "CaCO₃":3.36e-9, "BaSO₄":1.08e-10, "SrSO₄":3.44e-7, "Mg(OH)₂":5.61e-12, "CaF₂":3.45e-11}
for k,v in Ks.items():
    if k=="Mg(OH)₂":
        s=(v/4)**(1/3)
    elif k=="CaF₂":
        s=(v/4)**(1/3)
    else:
        s=v**0.5
    p("%s: Ks = %.2e → rozpustnost"%(k,v), "%.2e"%s, "mol·dm⁻³")
Mbaso4=M["Ba"]+M["S"]+4*M["O"]
p("BaSO₄ v mg/l", round((1.08e-10)**0.5*Mbaso4*1000,4), "mg·dm⁻³")

print("\n=== 10. Hoření hořčíku — teplo ===")
# ΔfH(MgO) = -601,6 kJ/mol
p("2 Mg + O₂ → 2 MgO, ΔH", 2*(-601.6), "kJ")
p("na 1 g Mg", round(-601.6/M["Mg"],1), "kJ·g⁻¹")
# termit
dHfe2o3=-824.2; dHal2o3=-1675.7
p("Fe₂O₃ + 2 Al → 2 Fe + Al₂O₃, ΔH", round(dHal2o3-dHfe2o3,1), "kJ·mol⁻¹")

print("\n=== 11. Hašení vápna ===")
# ΔfH: CaO -635,1 ; H2O(l) -285,8 ; Ca(OH)2 -985,2
p("CaO + H₂O → Ca(OH)₂, ΔH", round(-985.2-(-635.1-285.8),1), "kJ·mol⁻¹")
# ohřev vody: 1 kg CaO
n=1000/Mcao
p("n(CaO) v 1 kg", round(n,2), "mol")
p("uvolněné teplo", round(n*64.3/1000,1), "MJ")
p("  ohřeje kolik kg vody o 80 °C", round(n*64300/(4180*80),1), "kg")

print("\n=== 12. Elektrolýza NaCl — produkce ===")
# na 1 t Cl2
Mcl2=2*M["Cl"]
n=1e6/Mcl2
p("n(Cl₂) v 1 t", round(n,0), "mol")
p("současně m(NaOH)", round(n*2*(M["Na"]+M["O"]+M["H"])/1e3,1), "kg")
p("současně m(H₂)", round(n*2*M["H"]/1e3,1), "kg")
p("náboj", "%.3e"%(n*2*F), "C")
p("  = ", round(n*2*F/3600/1000,0), "kA·h")

print("\n=== 13. Amfoterita Al — pH ===")
# Ks Al(OH)3 = 3e-34
Ks=3e-34
import math
for pH in [4,5,6,7,8,10,12]:
    pOH=14-pH; oh=10**(-pOH)
    al=Ks/oh**3
    print("   pH = %2d → [Al³⁺] = %.2e mol·dm⁻³" % (pH, al))

print("\n=== 14. Poměry hmotnosti Na v soli / sodě ===")
p("w(Na) v NaCl", round(100*M["Na"]/(M["Na"]+M["Cl"]),1), "%")
p("w(Na) v Na₂CO₃", round(100*2*M["Na"]/Msoda,1), "%")
p("w(Al) v Al₂O₃", round(100*2*M["Al"]/(2*M["Al"]+3*M["O"]),1), "%")
p("w(Al) v bauxitu při 50 % Al₂O₃", round(0.5*100*2*M["Al"]/(2*M["Al"]+3*M["O"]),1), "%")
p("w(Pb) v PbS", round(100*M["Pb"]/(M["Pb"]+M["S"]),1), "%")
p("w(Ca) v CaCO₃", round(100*M["Ca"]/Mcaco3,1), "%")
p("w(Sn) v SnO₂", round(100*M["Sn"]/(M["Sn"]+2*M["O"]),1), "%")
