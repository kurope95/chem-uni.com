# -*- coding: utf-8 -*-
"""tabulka_data.py — data všech 118 prvků pro sekci „Periodická tabulka".

Zdroje hodnot: IUPAC Standard Atomic Weights 2021 (Ar), CRC Handbook of Chemistry
and Physics (teploty tání a varu, hustoty, ionizační energie, elektronové afinity),
Pauling (elektronegativita), Slater 1964 (empirické atomové poloměry).

Kde standardní tabulka hodnotu neuvádí nebo ji uvádí jen jako odhad, je None —
raději prázdné políčko než vymyšlené číslo.

Pořadí položek v E():
  Z, značka, český název, Ar, nestabilní?, konfigurace (zkrácená, ASCII),
  perioda, skupina (None u f-bloku), blok, kategorie, skupenství při 25 °C,
  t. tání [°C], t. varu [°C], hustota, poloměr [pm], elektronegativita,
  1. ion. energie [kJ/mol], elektronová afinita [kJ/mol], oxidační čísla,
  rok objevu, objevitel, věta o výskytu / využití

Hustota: u plynů v g·dm⁻³ (0 °C, 101,325 kPa), u pevných látek a kapalin v g·cm⁻³.
Ar u nestabilních prvků = nukleonové číslo nejstabilnějšího nuklidu (zobrazí se
v hranatých závorkách).
"""

FIELDS = ("z sym cz ar unst cfg per grp blk cat phase mp bp dens rad en ie ea "
          "ox yr who note").split()

ELEMENTS = []


def E(*a):
    if len(a) != len(FIELDS):
        raise SystemExit("Prvek %r má %d položek, čekám %d" % (a[1], len(a), len(FIELDS)))
    ELEMENTS.append(dict(zip(FIELDS, a)))


# ---------------------------------------------------------------- 1. perioda
E(1, "H", "vodík", 1.008, 0, "1s1", 1, 1, "s", "nekov", "plyn",
  -259.16, -252.87, 0.0899, 25, 2.20, 1312.0, 72.8, "−I, +I", "1766", "Henry Cavendish",
  "Nejrozšířenější prvek vesmíru; na Zemi hlavně ve vodě a v organických látkách, "
  "průmyslově se z něj vyrábí amoniak.")
E(2, "He", "helium", 4.003, 0, "1s2", 1, 18, "s", "vzácný plyn", "plyn",
  None, -268.93, 0.1786, None, None, 2372.3, None, "0", "1868", "P. Janssen a N. Lockyer",
  "Získává se ze zemního plynu; plní se jím balony a chladí supravodivé magnety "
  "v magnetických rezonancích.")

# ---------------------------------------------------------------- 2. perioda
E(3, "Li", "lithium", 6.94, 0, "[He] 2s1", 2, 1, "s", "alkalický kov", "pevné",
  180.5, 1342, 0.534, 145, 0.98, 520.2, 59.6, "+I", "1817", "Johan August Arfvedson",
  "Nejlehčí kov; dnes hlavně do akumulátorů, jeho soli se používají v psychiatrii.")
E(4, "Be", "beryllium", 9.012, 0, "[He] 2s2", 2, 2, "s", "kov alkalických zemin", "pevné",
  1287, 2469, 1.85, 105, 1.57, 899.5, None, "+II", "1798", "Louis-Nicolas Vauquelin",
  "Vzácný a velmi toxický kov z berylu; slitiny s mědí nejiskří, v jaderné technice "
  "slouží jako moderátor.")
E(5, "B", "bor", 10.81, 0, "[He] 2s2 2p1", 2, 13, "p", "polokov", "pevné",
  2076, 3927, 2.34, 85, 2.04, 800.6, 26.7, "+III", "1808", "Gay-Lussac, Thénard a Davy",
  "V přírodě jako borax; kyselina boritá dezinfikuje a bor v borosilikátovém skle "
  "snižuje tepelnou roztažnost.")
E(6, "C", "uhlík", 12.011, 0, "[He] 2s2 2p2", 2, 14, "p", "nekov", "pevné",
  3550, 3642, 2.267, 70, 2.55, 1086.5, 121.8, "−IV, +II, +IV", "pravěk", "znám odpradávna",
  "Základ veškeré organické chemie; jako grafit, diamant, saze i fullereny, "
  "v atmosféře jako CO₂.")
E(7, "N", "dusík", 14.007, 0, "[He] 2s2 2p3", 2, 15, "p", "nekov", "plyn",
  -210.0, -195.79, 1.251, 65, 3.04, 1402.3, None, "−III, +I, +II, +III, +IV, +V",
  "1772", "Daniel Rutherford",
  "Tvoří 78 % objemu vzduchu; Haberovým–Boschovým procesem se z něj vyrábí amoniak "
  "a z něj dusíkatá hnojiva.")
E(8, "O", "kyslík", 15.999, 0, "[He] 2s2 2p4", 2, 16, "p", "nekov", "plyn",
  -218.79, -182.96, 1.429, 60, 3.44, 1313.9, 141.0, "−II, −I", "1774",
  "C. W. Scheele a J. Priestley",
  "Nejrozšířenější prvek zemské kůry a 21 % objemu vzduchu; nezbytný pro dýchání "
  "i hoření.")
E(9, "F", "fluor", 18.998, 0, "[He] 2s2 2p5", 2, 17, "p", "halogen", "plyn",
  -219.67, -188.11, 1.696, 50, 3.98, 1681.0, 328.0, "−I", "1886", "Henri Moissan",
  "Nejelektronegativnější prvek; z kazivce, používá se ve fluoridových zubních "
  "pastách a v teflonu.")
E(10, "Ne", "neon", 20.180, 0, "[He] 2s2 2p6", 2, 18, "p", "vzácný plyn", "plyn",
  -248.59, -246.05, 0.9002, None, None, 2080.7, None, "0", "1898", "W. Ramsay a M. Travers",
  "Vzácný plyn ze vzduchu; v doutnavkách svítí typicky oranžovočerveně.")

# ---------------------------------------------------------------- 3. perioda
E(11, "Na", "sodík", 22.990, 0, "[Ne] 3s1", 3, 1, "s", "alkalický kov", "pevné",
  97.79, 883, 0.968, 180, 0.93, 495.8, 52.9, "+I", "1807", "Humphry Davy",
  "V mořské i kamenné soli; sodíkové výbojky svítí žlutě, kovový sodík se vyrábí "
  "elektrolýzou taveniny NaCl.")
E(12, "Mg", "hořčík", 24.305, 0, "[Ne] 3s2", 3, 2, "s", "kov alkalických zemin", "pevné",
  650, 1090, 1.738, 150, 1.31, 737.7, None, "+II", "1755", "Joseph Black",
  "Ústřední atom chlorofylu; lehké slitiny do letadel a kol, hořčíkový prášek hoří "
  "oslnivě bílým plamenem.")
E(13, "Al", "hliník", 26.982, 0, "[Ne] 3s2 3p1", 3, 13, "p", "kov", "pevné",
  660.32, 2519, 2.70, 125, 1.61, 577.5, 42.5, "+III", "1825", "Hans Christian Ørsted",
  "Nejrozšířenější kov zemské kůry; vyrábí se elektrolýzou bauxitu, před korozí ho "
  "chrání tenká vrstvička oxidu.")
E(14, "Si", "křemík", 28.085, 0, "[Ne] 3s2 3p2", 3, 14, "p", "polokov", "pevné",
  1414, 3265, 2.330, 110, 1.90, 786.5, 134.1, "−IV, +IV", "1824", "Jöns Jacob Berzelius",
  "Druhý nejrozšířenější prvek kůry (písek, křemen); polovodičový základ všech čipů "
  "a solárních panelů.")
E(15, "P", "fosfor", 30.974, 0, "[Ne] 3s2 3p3", 3, 15, "p", "nekov", "pevné",
  44.15, 280.5, 1.823, 100, 2.19, 1011.8, 72.0, "−III, +III, +V", "1669", "Hennig Brand",
  "V kostech i v DNA jako fosforečnany; bílý fosfor na vzduchu samovolně hoří, "
  "z apatitu se vyrábějí hnojiva.")
E(16, "S", "síra", 32.06, 0, "[Ne] 3s2 3p4", 3, 16, "p", "nekov", "pevné",
  115.21, 444.6, 2.067, 100, 2.58, 999.6, 200.4, "−II, +IV, +VI", "starověk", "známa odpradávna",
  "V sopečných oblastech i ryzí; hlavním produktem je kyselina sírová, nejvyráběnější "
  "chemikálie světa.")
E(17, "Cl", "chlor", 35.45, 0, "[Ne] 3s2 3p5", 3, 17, "p", "halogen", "plyn",
  -101.5, -34.04, 3.214, 100, 3.16, 1251.2, 349.0, "−I, +I, +III, +V, +VII",
  "1774", "Carl Wilhelm Scheele",
  "Žlutozelený jedovatý plyn; dezinfikuje vodu, jako chlorid sodný je běžnou kuchyňskou solí.")
E(18, "Ar", "argon", 39.95, 0, "[Ne] 3s2 3p6", 3, 18, "p", "vzácný plyn", "plyn",
  -189.34, -185.85, 1.784, None, None, 1520.6, None, "0", "1894", "Lord Rayleigh a W. Ramsay",
  "Necelé 1 % vzduchu; ochranná atmosféra při svařování a náplň žárovek.")

# ---------------------------------------------------------------- 4. perioda
E(19, "K", "draslík", 39.098, 0, "[Ar] 4s1", 4, 1, "s", "alkalický kov", "pevné",
  63.5, 759, 0.862, 220, 0.82, 418.8, 48.4, "+I", "1807", "Humphry Davy",
  "Nezbytný pro činnost nervů a svalů; draselné soli jsou důležitá hnojiva, izotop "
  "⁴⁰K je přirozeně radioaktivní.")
E(20, "Ca", "vápník", 40.078, 0, "[Ar] 4s2", 4, 2, "s", "kov alkalických zemin", "pevné",
  842, 1484, 1.55, 180, 1.00, 589.8, 2.37, "+II", "1808", "Humphry Davy",
  "Ve vápenci, sádrovci a v kostech; z vápence se pálí vápno a vyrábí cement.")
E(21, "Sc", "skandium", 44.956, 0, "[Ar] 3d1 4s2", 4, 3, "d", "přechodný kov", "pevné",
  1541, 2836, 2.985, 160, 1.36, 633.1, 18.1, "+III", "1879", "Lars Fredrik Nilson",
  "Vzácný lehký kov; slitiny s hliníkem pro sportovní náčiní a letecké díly.")
E(22, "Ti", "titan", 47.867, 0, "[Ar] 3d2 4s2", 4, 4, "d", "přechodný kov", "pevné",
  1668, 3287, 4.506, 140, 1.54, 658.8, 7.6, "+III, +IV", "1791", "William Gregor",
  "Pevný, lehký a odolný korozi; letecké konstrukce a implantáty, TiO₂ je nejběžnější "
  "bílý pigment.")
E(23, "V", "vanad", 50.942, 0, "[Ar] 3d3 4s2", 4, 5, "d", "přechodný kov", "pevné",
  1910, 3407, 6.11, 135, 1.63, 650.9, 50.6, "+II, +III, +IV, +V", "1801",
  "Andrés Manuel del Río",
  "Přísada do vysokopevnostních ocelí; oxid vanadičný katalyzuje výrobu kyseliny sírové.")
E(24, "Cr", "chrom", 51.996, 0, "[Ar] 3d5 4s1", 4, 6, "d", "přechodný kov", "pevné",
  1907, 2671, 7.15, 140, 1.66, 652.9, 64.3, "+II, +III, +VI", "1797",
  "Louis-Nicolas Vauquelin",
  "Chromování a nerezové oceli; sloučeniny chromu v oxidačním čísle +VI jsou karcinogenní.")
E(25, "Mn", "mangan", 54.938, 0, "[Ar] 3d5 4s2", 4, 7, "d", "přechodný kov", "pevné",
  1246, 2061, 7.21, 140, 1.55, 717.3, None, "+II, +IV, +VI, +VII", "1774",
  "Johan Gottlieb Gahn",
  "Do oceli se přidává, aby vázal síru a kyslík; manganistan draselný je silné "
  "oxidační činidlo.")
E(26, "Fe", "železo", 55.845, 0, "[Ar] 3d6 4s2", 4, 8, "d", "přechodný kov", "pevné",
  1538, 2861, 7.874, 140, 1.83, 762.5, 15.7, "+II, +III", "starověk", "známo odpradávna",
  "Nejpoužívanější kov světa; tvoří jádro Země, přenáší kyslík v hemoglobinu "
  "a je základem oceli.")
E(27, "Co", "kobalt", 58.933, 0, "[Ar] 3d7 4s2", 4, 9, "d", "přechodný kov", "pevné",
  1495, 2927, 8.90, 135, 1.88, 760.4, 63.7, "+II, +III", "1735", "Georg Brandt",
  "Modré sklo a keramika, silné magnety a katody lithiových baterií; součást "
  "vitaminu B₁₂.")
E(28, "Ni", "nikl", 58.693, 0, "[Ar] 3d8 4s2", 4, 10, "d", "přechodný kov", "pevné",
  1455, 2913, 8.908, 135, 1.91, 737.1, 112.0, "+II", "1751", "Axel Fredrik Cronstedt",
  "Nerezavějící oceli, mince a akumulátory; katalyzuje ztužování rostlinných tuků.")
E(29, "Cu", "měď", 63.546, 0, "[Ar] 3d10 4s1", 4, 11, "d", "přechodný kov", "pevné",
  1084.62, 2562, 8.96, 135, 1.90, 745.5, 118.4, "+I, +II", "pravěk", "známa odpradávna",
  "Výborný vodič, proto elektroinstalace; bronz a mosaz patří k nejstarším slitinám.")
E(30, "Zn", "zinek", 65.38, 0, "[Ar] 3d10 4s2", 4, 12, "d", "přechodný kov", "pevné",
  419.53, 907, 7.14, 135, 1.65, 906.4, None, "+II", "1746", "Andreas Sigismund Marggraf",
  "Pozinkování chrání ocel před korozí; zinek je součástí desítek enzymů.")
E(31, "Ga", "gallium", 69.723, 0, "[Ar] 3d10 4s2 4p1", 4, 13, "p", "kov", "pevné",
  29.76, 2204, 5.91, 130, 1.81, 578.8, 28.9, "+III", "1875", "P.-É. Lecoq de Boisbaudran",
  "Taje už v dlani při 29,8 °C; GaAs a GaN jsou základem LED diod a rychlé elektroniky.")
E(32, "Ge", "germanium", 72.630, 0, "[Ar] 3d10 4s2 4p2", 4, 14, "p", "polokov", "pevné",
  938.25, 2833, 5.323, 125, 2.01, 762.0, 119.0, "+II, +IV", "1886", "Clemens Winkler",
  "Polovodič z prvních tranzistorů; dnes hlavně optická vlákna a infračervená optika.")
E(33, "As", "arsen", 74.922, 0, "[Ar] 3d10 4s2 4p3", 4, 15, "p", "polokov", "pevné",
  817, None, 5.727, 115, 2.18, 947.0, 78.0, "−III, +III, +V", "1250", "Albertus Magnus",
  "Prudce jedovatý polokov, který za normálního tlaku sublimuje při 614 °C; dotuje "
  "polovodiče, dříve pesticid.")
E(34, "Se", "selen", 78.971, 0, "[Ar] 3d10 4s2 4p4", 4, 16, "p", "nekov", "pevné",
  221, 685, 4.81, 115, 2.55, 941.0, 195.0, "−II, +IV, +VI", "1817", "Jöns Jacob Berzelius",
  "Nezbytný stopový prvek (enzym glutathionperoxidasa); využívá se ve fotočláncích "
  "a ve sklářství.")
E(35, "Br", "brom", 79.904, 0, "[Ar] 3d10 4s2 4p5", 4, 17, "p", "halogen", "kapalné",
  -7.2, 58.8, 3.1028, 115, 2.96, 1139.9, 324.6, "−I, +I, +V, +VII", "1826", "Antoine Balard",
  "Jediný za pokojové teploty kapalný nekov; získává se z mořské vody, používá se "
  "v retardérech hoření.")
E(36, "Kr", "krypton", 83.798, 0, "[Ar] 3d10 4s2 4p6", 4, 18, "p", "vzácný plyn", "plyn",
  -157.37, -153.42, 3.749, None, 3.00, 1350.8, None, "0, +II", "1898", "W. Ramsay a M. Travers",
  "Náplň úsporných zářivek a některých laserů; ve vzduchu ho je jen jedna miliontina.")

# ---------------------------------------------------------------- 5. perioda
E(37, "Rb", "rubidium", 85.468, 0, "[Kr] 5s1", 5, 1, "s", "alkalický kov", "pevné",
  39.31, 688, 1.532, 235, 0.82, 403.0, 46.9, "+I", "1861", "R. Bunsen a G. Kirchhoff",
  "Měkký alkalický kov; rubidiové atomové hodiny a výzkum ultrachladných plynů.")
E(38, "Sr", "stroncium", 87.62, 0, "[Kr] 5s2", 5, 2, "s", "kov alkalických zemin", "pevné",
  777, 1382, 2.64, 200, 0.95, 549.5, 5.03, "+II", "1790", "Adair Crawford",
  "Barví plamen karmínově, proto se používá v pyrotechnice; ⁹⁰Sr je nebezpečný "
  "produkt štěpení.")
E(39, "Y", "yttrium", 88.906, 0, "[Kr] 4d1 5s2", 5, 3, "d", "přechodný kov", "pevné",
  1526, 3336, 4.472, 180, 1.22, 600.0, 29.6, "+III", "1794", "Johan Gadolin",
  "Do luminoforů obrazovek a do YAG laserů; součást vysokoteplotních supravodičů.")
E(40, "Zr", "zirkonium", 91.224, 0, "[Kr] 4d2 5s2", 5, 4, "d", "přechodný kov", "pevné",
  1855, 4409, 6.52, 155, 1.33, 640.1, 41.1, "+IV", "1789", "Martin Heinrich Klaproth",
  "Odolá korozi a téměř nepohlcuje neutrony, proto se z něj dělají povlaky palivových "
  "tyčí v reaktorech.")
E(41, "Nb", "niob", 92.906, 0, "[Kr] 4d4 5s1", 5, 5, "d", "přechodný kov", "pevné",
  2477, 4744, 8.57, 145, 1.6, 652.1, 86.1, "+V", "1801", "Charles Hatchett",
  "Supravodivé slitiny NbTi pro magnety v tomografech a v urychlovačích částic.")
E(42, "Mo", "molybden", 95.95, 0, "[Kr] 4d5 5s1", 5, 6, "d", "přechodný kov", "pevné",
  2623, 4639, 10.28, 145, 2.16, 684.3, 71.9, "+IV, +VI", "1778", "Carl Wilhelm Scheele",
  "Zpevňuje oceli; v biologii je součástí nitrogenasy, enzymu poutajícího vzdušný dusík.")
E(43, "Tc", "technecium", 98.0, 1, "[Kr] 4d5 5s2", 5, 7, "d", "přechodný kov", "pevné",
  2157, 4265, 11.0, 135, 1.9, 702.0, None, "+IV, +VII", "1937", "C. Perrier a E. Segrè",
  "První uměle připravený prvek; ⁹⁹ᵐTc je nejpoužívanější radiofarmakum v diagnostice.")
E(44, "Ru", "ruthenium", 101.07, 0, "[Kr] 4d7 5s1", 5, 8, "d", "přechodný kov", "pevné",
  2334, 4150, 12.45, 130, 2.2, 710.2, 101.3, "+III, +IV, +VIII", "1844", "Karl Klaus",
  "Katalyzátory a odolné elektrické kontakty; zpevňuje slitiny platiny a palladia.")
E(45, "Rh", "rhodium", 102.91, 0, "[Kr] 4d8 5s1", 5, 9, "d", "přechodný kov", "pevné",
  1964, 3695, 12.41, 135, 2.28, 719.7, 109.7, "+III", "1803", "William Hyde Wollaston",
  "Nejdražší z platinových kovů; klíčová složka automobilových katalyzátorů.")
E(46, "Pd", "palladium", 106.42, 0, "[Kr] 4d10", 5, 10, "d", "přechodný kov", "pevné",
  1554.9, 2963, 12.023, 140, 2.20, 804.4, 53.7, "+II, +IV", "1802", "William Hyde Wollaston",
  "Pohlcuje obrovské množství vodíku a katalyzuje hydrogenace; v katalyzátorech "
  "a v elektronice.")
E(47, "Ag", "stříbro", 107.87, 0, "[Kr] 4d10 5s1", 5, 11, "d", "přechodný kov", "pevné",
  961.78, 2162, 10.49, 160, 1.93, 731.0, 125.6, "+I", "starověk", "známo odpradávna",
  "Nejlepší vodič tepla i elektřiny; šperky, kontakty a antibakteriální povrchy.")
E(48, "Cd", "kadmium", 112.41, 0, "[Kr] 4d10 5s2", 5, 12, "d", "přechodný kov", "pevné",
  321.07, 767, 8.65, 155, 1.69, 867.8, None, "+II", "1817", "Friedrich Stromeyer",
  "Toxický kov; niklkadmiové akumulátory a žluté pigmenty se dnes omezují.")
E(49, "In", "indium", 114.82, 0, "[Kr] 4d10 5s2 5p1", 5, 13, "p", "kov", "pevné",
  156.6, 2072, 7.31, 155, 1.78, 558.3, 28.9, "+III", "1863", "F. Reich a H. T. Richter",
  "Oxid inditocínatý (ITO) tvoří průhledné elektrody dotykových displejů.")
E(50, "Sn", "cín", 118.71, 0, "[Kr] 4d10 5s2 5p2", 5, 14, "p", "kov", "pevné",
  231.93, 2602, 7.287, 145, 1.96, 708.6, 107.3, "+II, +IV", "starověk", "znám odpradávna",
  "S mědí tvoří bronz, dnes hlavně pájky a pocínovaný plech na konzervy.")
E(51, "Sb", "antimon", 121.76, 0, "[Kr] 4d10 5s2 5p3", 5, 15, "p", "polokov", "pevné",
  630.63, 1587, 6.685, 145, 2.05, 834.0, 101.0, "−III, +III, +V", "starověk", "znám odpradávna",
  "Zpevňuje olovo v autobateriích; oxid antimonitý je běžný retardér hoření.")
E(52, "Te", "tellur", 127.60, 0, "[Kr] 4d10 5s2 5p4", 5, 16, "p", "polokov", "pevné",
  449.51, 988, 6.232, 140, 2.1, 869.3, 190.2, "−II, +IV, +VI", "1782",
  "F.-J. Müller von Reichenstein",
  "Vzácný polokov; tenkovrstvá fotovoltaika CdTe a paměťová média s fázovou změnou.")
E(53, "I", "jod", 126.90, 0, "[Kr] 4d10 5s2 5p5", 5, 17, "p", "halogen", "pevné",
  113.7, 184.3, 4.933, 140, 2.66, 1008.4, 295.2, "−I, +I, +V, +VII", "1811",
  "Bernard Courtois",
  "Nezbytný pro hormony štítné žlázy; jodová tinktura dezinfikuje, jodid se přidává "
  "do kuchyňské soli.")
E(54, "Xe", "xenon", 131.29, 0, "[Kr] 4d10 5s2 5p6", 5, 18, "p", "vzácný plyn", "plyn",
  -111.75, -108.12, 5.894, None, 2.6, 1170.4, None, "0, +II, +IV, +VI, +VIII", "1898",
  "W. Ramsay a M. Travers",
  "Výbojky a xenonové světlomety; slouží i jako anestetikum a jako palivo iontových "
  "motorů sond.")

# ---------------------------------------------------------------- 6. perioda
E(55, "Cs", "cesium", 132.91, 0, "[Xe] 6s1", 6, 1, "s", "alkalický kov", "pevné",
  28.44, 671, 1.93, 260, 0.79, 375.7, 45.5, "+I", "1860", "R. Bunsen a G. Kirchhoff",
  "Nejreaktivnější kov, taje už v dlani; přechod v atomu ¹³³Cs definuje jednu sekundu.")
E(56, "Ba", "baryum", 137.33, 0, "[Xe] 6s2", 6, 2, "s", "kov alkalických zemin", "pevné",
  727, 1897, 3.51, 215, 0.89, 502.9, 13.95, "+II", "1808", "Humphry Davy",
  "Nerozpustný síran barnatý je kontrastní látka pro rentgen žaludku; rozpustné soli "
  "baria jsou jedovaté.")
E(57, "La", "lanthan", 138.91, 0, "[Xe] 5d1 6s2", 6, None, "f", "lanthanoid", "pevné",
  920, 3464, 6.162, 195, 1.10, 538.1, 45.0, "+III", "1839", "Carl Gustaf Mosander",
  "Do NiMH akumulátorů a do optického skla s vysokým indexem lomu.")
E(58, "Ce", "cer", 140.12, 0, "[Xe] 4f1 5d1 6s2", 6, None, "f", "lanthanoid", "pevné",
  795, 3443, 6.770, 185, 1.12, 534.4, 55.0, "+III, +IV", "1803", "Berzelius, Hisinger a Klaproth",
  "Nejhojnější lanthanoid; leštění skla, katalyzátory a zapalovací kamínky.")
E(59, "Pr", "praseodym", 140.91, 0, "[Xe] 4f3 6s2", 6, None, "f", "lanthanoid", "pevné",
  935, 3520, 6.77, 185, 1.13, 527.0, None, "+III", "1885", "Carl Auer von Welsbach",
  "Barví sklo žlutozeleně; součást silných magnetů a ochranných svářečských brýlí.")
E(60, "Nd", "neodym", 144.24, 0, "[Xe] 4f4 6s2", 6, None, "f", "lanthanoid", "pevné",
  1024, 3074, 7.01, 185, 1.14, 533.1, None, "+III", "1885", "Carl Auer von Welsbach",
  "Magnety NdFeB jsou nejsilnější permanentní magnety, jaké umíme vyrobit.")
E(61, "Pm", "promethium", 145.0, 1, "[Xe] 4f5 6s2", 6, None, "f", "lanthanoid", "pevné",
  1042, 3000, 7.26, 185, 1.13, 540.0, None, "+III", "1945", "Marinsky, Glendenin a Coryell",
  "Jediný lanthanoid bez stabilního izotopu; dříve se přidával do svítících barev.")
E(62, "Sm", "samarium", 150.36, 0, "[Xe] 4f6 6s2", 6, None, "f", "lanthanoid", "pevné",
  1072, 1794, 7.52, 185, 1.17, 544.5, None, "+II, +III", "1879", "P.-É. Lecoq de Boisbaudran",
  "Magnety SmCo vydrží vysoké teploty; samarium také pohlcuje neutrony v reaktorech.")
E(63, "Eu", "europium", 151.96, 0, "[Xe] 4f7 6s2", 6, None, "f", "lanthanoid", "pevné",
  822, 1529, 5.264, 185, 1.2, 547.1, None, "+II, +III", "1901", "Eugène-Anatole Demarçay",
  "Červené a modré luminofory obrazovek a ochranné prvky eurobankovek.")
E(64, "Gd", "gadolinium", 157.25, 0, "[Xe] 4f7 5d1 6s2", 6, None, "f", "lanthanoid", "pevné",
  1313, 3273, 7.90, 180, 1.20, 593.4, None, "+III", "1880", "Jean Charles de Marignac",
  "Kontrastní látka pro magnetickou rezonanci; ze všech prvků nejsilněji pohlcuje neutrony.")
E(65, "Tb", "terbium", 158.93, 0, "[Xe] 4f9 6s2", 6, None, "f", "lanthanoid", "pevné",
  1356, 3230, 8.23, 175, 1.1, 565.8, None, "+III, +IV", "1843", "Carl Gustaf Mosander",
  "Zelený luminofor obrazovek a magnetostrikční slitina Terfenol-D.")
E(66, "Dy", "dysprosium", 162.50, 0, "[Xe] 4f10 6s2", 6, None, "f", "lanthanoid", "pevné",
  1412, 2567, 8.540, 175, 1.22, 573.0, None, "+III", "1886", "P.-É. Lecoq de Boisbaudran",
  "Přidává se do neodymových magnetů, aby vydržely vyšší provozní teploty.")
E(67, "Ho", "holmium", 164.93, 0, "[Xe] 4f11 6s2", 6, None, "f", "lanthanoid", "pevné",
  1474, 2700, 8.79, 175, 1.23, 581.0, None, "+III", "1878", "Cleve, Soret a Delafontaine",
  "Má největší magnetický moment ze všech prvků; holmiové lasery se používají v urologii.")
E(68, "Er", "erbium", 167.26, 0, "[Xe] 4f12 6s2", 6, None, "f", "lanthanoid", "pevné",
  1529, 2868, 9.066, 175, 1.24, 589.3, None, "+III", "1843", "Carl Gustaf Mosander",
  "Erbiem dopovaná optická vlákna zesilují signál v dálkových telekomunikacích.")
E(69, "Tm", "thulium", 168.93, 0, "[Xe] 4f13 6s2", 6, None, "f", "lanthanoid", "pevné",
  1545, 1950, 9.32, 175, 1.25, 596.7, None, "+III", "1879", "Per Teodor Cleve",
  "Nejvzácnější stabilní lanthanoid; přenosné rentgenové zdroje a lasery.")
E(70, "Yb", "ytterbium", 173.05, 0, "[Xe] 4f14 6s2", 6, None, "f", "lanthanoid", "pevné",
  819, 1196, 6.90, 175, 1.1, 603.4, None, "+II, +III", "1878", "Jean Charles de Marignac",
  "Ytterbiové atomové hodiny patří k nejpřesnějším přístrojům světa; dotuje vláknové lasery.")
E(71, "Lu", "lutecium", 174.97, 0, "[Xe] 4f14 5d1 6s2", 6, None, "f", "lanthanoid", "pevné",
  1663, 3402, 9.841, 175, 1.27, 523.5, None, "+III", "1907", "Georges Urbain",
  "Nejhustší a nejtvrdší lanthanoid; scintilační krystaly v PET skenerech.")
E(72, "Hf", "hafnium", 178.49, 0, "[Xe] 4f14 5d2 6s2", 6, 4, "d", "přechodný kov", "pevné",
  2233, 4603, 13.31, 155, 1.3, 658.5, 17.2, "+IV", "1923", "D. Coster a G. de Hevesy",
  "Silně pohlcuje neutrony, proto se z něj dělají regulační tyče jaderných reaktorů.")
E(73, "Ta", "tantal", 180.95, 0, "[Xe] 4f14 5d3 6s2", 6, 5, "d", "přechodný kov", "pevné",
  3017, 5458, 16.69, 145, 1.5, 761.0, 31.0, "+V", "1802", "Anders Gustaf Ekeberg",
  "Odolá kyselinám i lidskému tělu; tantalové kondenzátory a chirurgické implantáty.")
E(74, "W", "wolfram", 183.84, 0, "[Xe] 4f14 5d4 6s2", 6, 6, "d", "přechodný kov", "pevné",
  3422, 5555, 19.25, 135, 2.36, 770.0, 78.8, "+IV, +VI", "1783", "bratři Elhuyarové",
  "Nejvyšší teplota tání ze všech kovů (3422 °C); vlákna žárovek a slinuté karbidy.")
E(75, "Re", "rhenium", 186.21, 0, "[Xe] 4f14 5d5 6s2", 6, 7, "d", "přechodný kov", "pevné",
  3186, 5596, 21.02, 135, 1.9, 760.0, 5.8, "+IV, +VII", "1925", "Noddack, Tacke a Berg",
  "Jeden z nejvzácnějších prvků kůry; superslitiny lopatek proudových motorů.")
E(76, "Os", "osmium", 190.23, 0, "[Xe] 4f14 5d6 6s2", 6, 8, "d", "přechodný kov", "pevné",
  3033, 5012, 22.59, 130, 2.2, 840.0, 104.0, "+IV, +VIII", "1803", "Smithson Tennant",
  "Nejhustší prvek vůbec (22,59 g·cm⁻³); hroty per a tvrdé elektrické kontakty.")
E(77, "Ir", "iridium", 192.22, 0, "[Xe] 4f14 5d7 6s2", 6, 9, "d", "přechodný kov", "pevné",
  2446, 4428, 22.56, 135, 2.20, 880.0, 150.9, "+III, +IV", "1803", "Smithson Tennant",
  "Nejodolnější kov vůči korozi; iridiová vrstva v křídových sedimentech dokládá "
  "dopad planetky.")
E(78, "Pt", "platina", 195.08, 0, "[Xe] 4f14 5d9 6s1", 6, 10, "d", "přechodný kov", "pevné",
  1768.3, 3825, 21.45, 135, 2.28, 870.0, 205.3, "+II, +IV", "1735", "Antonio de Ulloa",
  "Katalyzátory, laboratorní nádobí a šperky; komplex cisplatina je cytostatikum.")
E(79, "Au", "zlato", 196.97, 0, "[Xe] 4f14 5d10 6s1", 6, 11, "d", "přechodný kov", "pevné",
  1064.18, 2856, 19.30, 135, 2.54, 890.1, 222.8, "+I, +III", "pravěk", "známo odpradávna",
  "Chemicky netečné, proto přežije tisíciletí; šperky, elektronické kontakty a rezervy bank.")
E(80, "Hg", "rtuť", 200.59, 0, "[Xe] 4f14 5d10 6s2", 6, 12, "d", "přechodný kov", "kapalné",
  -38.83, 356.73, 13.534, 150, 2.00, 1007.1, None, "+I, +II", "starověk", "známa odpradávna",
  "Jediný za pokojové teploty kapalný kov; je jedovatá a z výrobků se dnes vytlačuje.")
E(81, "Tl", "thallium", 204.38, 0, "[Xe] 4f14 5d10 6s2 6p1", 6, 13, "p", "kov", "pevné",
  304, 1473, 11.85, 190, 1.62, 589.4, 36.4, "+I, +III", "1861", "William Crookes",
  "Silně jedovatý; dříve jed na hlodavce, dnes detektory záření a nízkotající slitiny.")
E(82, "Pb", "olovo", 207.2, 0, "[Xe] 4f14 5d10 6s2 6p2", 6, 14, "p", "kov", "pevné",
  327.46, 1749, 11.34, 180, 2.33, 715.6, 34.4, "+II, +IV", "starověk", "známo odpradávna",
  "Měkký těžký kov; autobaterie a stínění záření, jeho sloučeniny jsou jedovaté.")
E(83, "Bi", "bismut", 208.98, 0, "[Xe] 4f14 5d10 6s2 6p3", 6, 15, "p", "kov", "pevné",
  271.4, 1564, 9.78, 160, 2.02, 703.0, 90.9, "+III, +V", "1753", "Claude-François Geoffroy",
  "Nejtěžší prakticky stabilní prvek; netoxická náhrada olova a léky proti překyselení žaludku.")
E(84, "Po", "polonium", 209.0, 1, "[Xe] 4f14 5d10 6s2 6p4", 6, 16, "p", "kov", "pevné",
  254, 962, 9.20, 190, 2.0, 812.1, 136.0, "+II, +IV", "1898", "Marie a Pierre Curieovi",
  "Silně radioaktivní; Curieovi ho objevili v jáchymovském smolinci a pojmenovali "
  "po Polsku.")
E(85, "At", "astat", 210.0, 1, "[Xe] 4f14 5d10 6s2 6p5", 6, 17, "p", "halogen", "pevné",
  None, None, None, None, 2.2, None, 233.0, "−I, +I", "1940", "Corson, MacKenzie a Segrè",
  "Nejvzácnější přirozený prvek — v celé zemské kůře ho je jen několik gramů.")
E(86, "Rn", "radon", 222.0, 1, "[Xe] 4f14 5d10 6s2 6p6", 6, 18, "p", "vzácný plyn", "plyn",
  -71, -61.7, 9.73, None, None, 1037.0, None, "0, +II", "1900", "Friedrich Ernst Dorn",
  "Radioaktivní plyn z rozpadu radia; prosakuje do sklepů a je druhou nejčastější "
  "příčinou rakoviny plic.")

# ---------------------------------------------------------------- 7. perioda
E(87, "Fr", "francium", 223.0, 1, "[Rn] 7s1", 7, 1, "s", "alkalický kov", "pevné",
  None, None, None, None, 0.7, 380.0, None, "+I", "1939", "Marguerite Perey",
  "Nejvzácnější a nejnestabilnější alkalický kov; nikdy nebylo připraveno vážitelné množství.")
E(88, "Ra", "radium", 226.0, 1, "[Rn] 7s2", 7, 2, "s", "kov alkalických zemin", "pevné",
  700, 1737, 5.5, 215, 0.9, 509.3, None, "+II", "1898", "Marie a Pierre Curieovi",
  "Marie Curie ho izolovala ze smolince; dříve svítící barvy na ciferníky, dnes se "
  "už nepoužívá.")
E(89, "Ac", "aktinium", 227.0, 1, "[Rn] 6d1 7s2", 7, None, "f", "aktinoid", "pevné",
  1050, 3200, 10.07, 195, 1.1, 499.0, None, "+III", "1899", "André-Louis Debierne",
  "Silně radioaktivní; ²²⁵Ac se zkouší v cílené nádorové terapii.")
E(90, "Th", "thorium", 232.04, 0, "[Rn] 6d2 7s2", 7, None, "f", "aktinoid", "pevné",
  1750, 4788, 11.72, 180, 1.3, 587.0, None, "+IV", "1829", "Jöns Jacob Berzelius",
  "V kůře je asi třikrát hojnější než uran; možné palivo reaktorů čtvrté generace.")
E(91, "Pa", "protaktinium", 231.04, 0, "[Rn] 5f2 6d1 7s2", 7, None, "f", "aktinoid", "pevné",
  1572, 4000, 15.37, 180, 1.5, 568.0, None, "+IV, +V", "1913", "K. Fajans a O. Göhring",
  "Extrémně vzácný meziprodukt rozpadové řady uranu; slouží k datování mořských sedimentů.")
E(92, "U", "uran", 238.03, 0, "[Rn] 5f3 6d1 7s2", 7, None, "f", "aktinoid", "pevné",
  1135, 4131, 19.05, 175, 1.38, 597.6, None, "+III, +IV, +V, +VI", "1789",
  "Martin Heinrich Klaproth",
  "Palivo jaderných elektráren; štěpitelný je ²³⁵U, zatímco ²³⁸U tvoří 99,3 % "
  "přírodního uranu.")
E(93, "Np", "neptunium", 237.0, 1, "[Rn] 5f4 6d1 7s2", 7, None, "f", "aktinoid", "pevné",
  644, 3902, 20.45, 175, 1.36, 604.5, None, "+III, +IV, +V, +VI", "1940",
  "E. McMillan a P. Abelson",
  "První připravený transuran; v reaktorech vzniká záchytem neutronu na uranu.")
E(94, "Pu", "plutonium", 244.0, 1, "[Rn] 5f6 7s2", 7, None, "f", "aktinoid", "pevné",
  640, 3228, 19.82, 175, 1.28, 584.7, None, "+III, +IV, +V, +VI", "1940",
  "Seaborg, McMillan, Kennedy a Wahl",
  "Jaderné palivo i výbušná náplň; ²³⁸Pu pohání radioizotopové generátory sond Voyager.")
E(95, "Am", "americium", 243.0, 1, "[Rn] 5f7 7s2", 7, None, "f", "aktinoid", "pevné",
  1176, 2011, 12.0, 175, 1.13, 578.0, None, "+III, +IV, +V, +VI", "1944",
  "Seaborg, James, Morgan a Ghiorso",
  "²⁴¹Am je zdrojem záření v ionizačních kouřových hlásičích.")
E(96, "Cm", "curium", 247.0, 1, "[Rn] 5f7 6d1 7s2", 7, None, "f", "aktinoid", "pevné",
  1345, 3110, 13.51, None, 1.28, 581.0, None, "+III", "1944", "Seaborg, James a Ghiorso",
  "Silně radioaktivní; zdroj alfa částic pro analyzátory hornin na marsovských vozítkách.")
E(97, "Bk", "berkelium", 247.0, 1, "[Rn] 5f9 7s2", 7, None, "f", "aktinoid", "pevné",
  986, 2627, 14.78, None, 1.3, 601.0, None, "+III, +IV", "1949",
  "Thompson, Ghiorso a Seaborg",
  "Terč pro syntézu tennessinu; vyrábí se jen v miligramových množstvích.")
E(98, "Cf", "kalifornium", 251.0, 1, "[Rn] 5f10 7s2", 7, None, "f", "aktinoid", "pevné",
  900, 1470, 15.1, None, 1.3, 608.0, None, "+III", "1950",
  "Thompson, Street, Ghiorso a Seaborg",
  "Silný zdroj neutronů; používá se ke startu reaktorů a při prospekci ropy.")
E(99, "Es", "einsteinium", 252.0, 1, "[Rn] 5f11 7s2", 7, None, "f", "aktinoid", "pevné",
  860, 996, 8.84, None, 1.3, 619.0, None, "+III", "1952", "tým z Berkeley",
  "Objeven v troskách první termojaderné pumy; existuje jen v mikrogramech.")
E(100, "Fm", "fermium", 257.0, 1, "[Rn] 5f12 7s2", 7, None, "f", "aktinoid", "neznámé",
  None, None, None, None, 1.3, 627.0, None, "+III", "1952", "tým z Berkeley",
  "Poslední prvek, který jde vyrobit ozařováním neutrony; jen v atomárních množstvích.")
E(101, "Md", "mendelevium", 258.0, 1, "[Rn] 5f13 7s2", 7, None, "f", "aktinoid", "neznámé",
  None, None, None, None, 1.3, 635.0, None, "+II, +III", "1955", "Ghiorso a spol.",
  "Připraven po jednotlivých atomech; pojmenován po D. I. Mendělejevovi.")
E(102, "No", "nobelium", 259.0, 1, "[Rn] 5f14 7s2", 7, None, "f", "aktinoid", "neznámé",
  None, None, None, None, 1.3, 642.0, None, "+II, +III", "1966", "Dubna (SÚJV)",
  "Připravuje se v urychlovači; nejstabilnější izotop žije necelou hodinu.")
E(103, "Lr", "lawrencium", 266.0, 1, "[Rn] 5f14 7s2 7p1", 7, None, "f", "aktinoid", "neznámé",
  None, None, None, None, 1.3, 478.6, None, "+III", "1961", "Ghiorso a spol., Berkeley",
  "Poslední aktinoid; existuje vždy jen několik atomů najednou.")
E(104, "Rf", "rutherfordium", 267.0, 1, "[Rn] 5f14 6d2 7s2", 7, 4, "d", "přechodný kov", "neznámé",
  None, None, None, None, None, None, None, "+IV (předp.)", "1964", "Dubna a Berkeley",
  "První transaktinoid; chemicky se chová podobně jako hafnium.")
E(105, "Db", "dubnium", 268.0, 1, "[Rn] 5f14 6d3 7s2", 7, 5, "d", "přechodný kov", "neznámé",
  None, None, None, None, None, None, None, "+V (předp.)", "1968", "Dubna a Berkeley",
  "Pojmenován po ruské Dubně, jednom ze dvou hlavních center syntézy prvků.")
E(106, "Sg", "seaborgium", 269.0, 1, "[Rn] 5f14 6d4 7s2", 7, 6, "d", "přechodný kov", "neznámé",
  None, None, None, None, None, None, None, "+VI (předp.)", "1974", "Berkeley",
  "Jediný prvek pojmenovaný po vědci ještě za jeho života — po Glennu Seaborgovi.")
E(107, "Bh", "bohrium", 270.0, 1, "[Rn] 5f14 6d5 7s2", 7, 7, "d", "přechodný kov", "neznámé",
  None, None, None, None, None, None, None, "+VII (předp.)", "1981", "GSI Darmstadt",
  "Pojmenován po Nielsi Bohrovi; připraven bombardováním bismutu jádry chromu.")
E(108, "Hs", "hassium", 269.0, 1, "[Rn] 5f14 6d6 7s2", 7, 8, "d", "přechodný kov", "neznámé",
  None, None, None, None, None, None, None, "+VIII (předp.)", "1984", "GSI Darmstadt",
  "Pojmenován po německém Hesensku; poločas nejstabilnějšího izotopu jsou sekundy.")
E(109, "Mt", "meitnerium", 278.0, 1, "[Rn] 5f14 6d7 7s2", 7, 9, "d", "přechodný kov", "neznámé",
  None, None, None, None, None, None, None, "neznámé", "1982", "GSI Darmstadt",
  "Pojmenován po Lise Meitnerové, spoluobjevitelce jaderného štěpení.")
E(110, "Ds", "darmstadtium", 281.0, 1, "[Rn] 5f14 6d8 7s2", 7, 10, "d", "přechodný kov", "neznámé",
  None, None, None, None, None, None, None, "neznámé", "1994", "GSI Darmstadt",
  "Pojmenován po Darmstadtu, sídle ústavu GSI, kde vzniklo šest nových prvků.")
E(111, "Rg", "roentgenium", 282.0, 1, "[Rn] 5f14 6d9 7s2", 7, 11, "d", "přechodný kov", "neznámé",
  None, None, None, None, None, None, None, "neznámé", "1994", "GSI Darmstadt",
  "Pojmenován po W. C. Röntgenovi, objeviteli rentgenového záření.")
E(112, "Cn", "kopernicium", 285.0, 1, "[Rn] 5f14 6d10 7s2", 7, 12, "d", "přechodný kov", "neznámé",
  None, None, None, None, None, None, None, "neznámé", "1996", "GSI Darmstadt",
  "Pojmenován po Mikuláši Koperníkovi; podle výpočtů může být za pokojové teploty těkavý.")
E(113, "Nh", "nihonium", 286.0, 1, "[Rn] 5f14 6d10 7s2 7p1", 7, 13, "p", "kov", "neznámé",
  None, None, None, None, None, None, None, "neznámé", "2004", "RIKEN, Japonsko",
  "První prvek objevený v Asii; Nihon je japonský název Japonska.")
E(114, "Fl", "flerovium", 289.0, 1, "[Rn] 5f14 6d10 7s2 7p2", 7, 14, "p", "kov", "neznámé",
  None, None, None, None, None, None, None, "neznámé", "1999", "Dubna (SÚJV)",
  "Pojmenován po Georgiji Fljorovovi; leží blízko předpovězeného „ostrova stability“.")
E(115, "Mc", "moscovium", 290.0, 1, "[Rn] 5f14 6d10 7s2 7p3", 7, 15, "p", "kov", "neznámé",
  None, None, None, None, None, None, None, "neznámé", "2003", "Dubna a Livermore",
  "Pojmenován po Moskevské oblasti; známo je jen několik desítek atomů.")
E(116, "Lv", "livermorium", 293.0, 1, "[Rn] 5f14 6d10 7s2 7p4", 7, 16, "p", "kov", "neznámé",
  None, None, None, None, None, None, None, "neznámé", "2000", "Dubna a Livermore",
  "Pojmenován po Lawrence Livermore National Laboratory v Kalifornii.")
E(117, "Ts", "tennessin", 294.0, 1, "[Rn] 5f14 6d10 7s2 7p5", 7, 17, "p", "halogen", "neznámé",
  None, None, None, None, None, None, None, "neznámé", "2010",
  "Dubna, Oak Ridge a Livermore",
  "Nejtěžší halogen; pojmenován po americkém státu Tennessee.")
E(118, "Og", "oganesson", 294.0, 1, "[Rn] 5f14 6d10 7s2 7p6", 7, 18, "p", "vzácný plyn", "neznámé",
  None, None, None, None, None, None, None, "neznámé", "2002", "Dubna a Livermore",
  "Nejtěžší známý prvek; pojmenován po Juriji Oganesjanovi, který ho pomohl objevit.")


# Prvky, u nichž IUPAC uvádí Ar s koncovou nulou — float ji ztratí, takže
# zápis pro zobrazení držím zvlášť (kontrola níž hlídá, že sedí s číslem).
AR_TEXT = {"Ne": "20.180", "Na": "22.990", "Ge": "72.630",
           "I": "126.90", "Te": "127.60", "Dy": "162.50"}


# ================================================================ odvozená data
NOBLE = {"He": 2, "Ne": 10, "Ar": 18, "Kr": 36, "Xe": 54, "Rn": 86}
_BY_SYM = {}


def _expand(cfg):
    """Rozvine zkrácenou konfiguraci ([Ar] 3d5 4s1) na úplnou (1s2 2s2 ... )."""
    parts = cfg.split()
    out = []
    for p in parts:
        if p.startswith("["):
            core = p[1:-1]
            out.extend(_expand(_BY_SYM[core]["cfg"]))
        else:
            out.append(p)
    return out


def orbitals(cfg_full):
    """[('1s', 2), ('2s', 2), ...]"""
    res = []
    for p in cfg_full:
        i = 2
        res.append((p[:i], int(p[i:])))
    return res


def shells(cfg_full):
    """Obsazení slupek K, L, M, ... spočítané z úplné konfigurace."""
    sh = {}
    for name, n in orbitals(cfg_full):
        k = int(name[0])
        sh[k] = sh.get(k, 0) + n
    return [sh[k] for k in sorted(sh)]


CATEGORIES = ["alkalický kov", "kov alkalických zemin", "přechodný kov", "lanthanoid",
              "aktinoid", "kov", "polokov", "nekov", "halogen", "vzácný plyn"]
METALS = {"alkalický kov", "kov alkalických zemin", "přechodný kov",
          "lanthanoid", "aktinoid", "kov"}
PHASES = ["pevné", "kapalné", "plyn", "neznámé"]
BLOCKS = ["s", "p", "d", "f"]


def prepare():
    """Doplní odvozené položky a vrátí seznam prvků."""
    for e in ELEMENTS:
        _BY_SYM[e["sym"]] = e
    for e in ELEMENTS:
        full = _expand(e["cfg"])
        e["cfgFull"] = " ".join(full)
        e["shells"] = shells(full)
        e["ecount"] = sum(n for _, n in orbitals(full))
    return ELEMENTS


# ================================================================ kontrola dat
def check():
    """Vrátí seznam nálezů. Neprázdný seznam = stránka se nezapíše."""
    prepare()
    bad = []
    seen_z, seen_sym, seen_cz = set(), set(), set()

    def err(e, msg):
        bad.append("Z=%d %s (%s): %s" % (e["z"], e["sym"], e["cz"], msg))

    if len(ELEMENTS) != 118:
        bad.append("Prvků je %d, má jich být 118." % len(ELEMENTS))

    for i, e in enumerate(ELEMENTS):
        if e["z"] != i + 1:
            err(e, "protonové číslo neodpovídá pořadí (%d)" % (i + 1))
        for key, s in (("z", seen_z), ("sym", seen_sym), ("cz", seen_cz)):
            if e[key] in s:
                err(e, "duplicitní %s" % key)
            s.add(e[key])
        # --- značka a název
        if not (1 <= len(e["sym"]) <= 3) or not e["sym"][0].isupper():
            err(e, "podivná značka")
        if e["cz"][:1].isupper():
            err(e, "český název má být s malým písmenem")
        # --- konfigurace: počet elektronů musí sedět s Z
        if e["ecount"] != e["z"]:
            err(e, "konfigurace dává %d elektronů, má být %d" % (e["ecount"], e["z"]))
        # --- Ar
        ar = e["ar"]
        if ar is None or ar <= 0:
            err(e, "chybí relativní atomová hmotnost")
        elif ar < e["z"]:
            err(e, "Ar (%s) je menší než protonové číslo" % ar)
        elif ar > 3.0 * e["z"] + 6:
            err(e, "Ar (%s) je nepravděpodobně velká vůči Z" % ar)
        if e["unst"] and abs(ar - round(ar)) > 1e-9:
            err(e, "u nestabilního prvku se čeká celé nukleonové číslo")
        if not e["unst"] and e["z"] > 94:
            err(e, "prvek nad Z=94 označený jako stabilní")
        # --- perioda, skupina, blok
        if not (1 <= e["per"] <= 7):
            err(e, "perioda mimo 1–7")
        if e["grp"] is not None and not (1 <= e["grp"] <= 18):
            err(e, "skupina mimo 1–18")
        if e["blk"] not in BLOCKS:
            err(e, "neznámý blok %r" % e["blk"])
        if (e["blk"] == "f") != (e["grp"] is None):
            err(e, "f-blok musí být bez čísla skupiny a naopak")
        if e["cat"] not in CATEGORIES:
            err(e, "neznámá kategorie %r" % e["cat"])
        if e["phase"] not in PHASES:
            err(e, "neznámé skupenství %r" % e["phase"])
        # --- teploty
        mp, bp = e["mp"], e["bp"]
        for v, nm in ((mp, "teplota tání"), (bp, "teplota varu")):
            if v is not None and not (-273.15 < v < 6000):
                err(e, "%s mimo rozsah (%s °C)" % (nm, v))
        if mp is not None and bp is not None and bp <= mp:
            err(e, "teplota varu (%s) není vyšší než teplota tání (%s)" % (bp, mp))
        # --- skupenství vs. teploty
        if mp is not None and bp is not None:
            if e["phase"] == "plyn" and bp > 25:
                err(e, "označen jako plyn, ale vře až při %s °C" % bp)
            if e["phase"] == "pevné" and mp < 25:
                err(e, "označen jako pevná látka, ale taje při %s °C" % mp)
            if e["phase"] == "kapalné" and not (mp < 25 < bp):
                err(e, "označen jako kapalina, ale 25 °C není mezi %s a %s" % (mp, bp))
        # --- hustota
        d = e["dens"]
        if d is not None:
            if e["phase"] == "plyn" and not (0.05 <= d <= 12):
                err(e, "hustota plynu %s g·dm⁻³ je mimo rozsah" % d)
            if e["phase"] in ("pevné", "kapalné") and not (0.4 <= d <= 23):
                err(e, "hustota %s g·cm⁻³ je mimo rozsah" % d)
        elif e["z"] <= 96 and e["sym"] not in ("At", "Fr"):
            err(e, "chybí hustota")
        # --- poloměr
        r = e["rad"]
        if r is not None and not (20 <= r <= 300):
            err(e, "atomový poloměr %s pm je mimo rozsah" % r)
        # --- elektronegativita
        en = e["en"]
        if en is not None and not (0.7 <= en <= 4.0):
            err(e, "elektronegativita %s je mimo rozsah 0,7–4,0" % en)
        if en is None and e["cat"] not in ("vzácný plyn",) and e["z"] <= 103:
            err(e, "chybí elektronegativita u stabilně tabelovaného prvku")
        if en is not None and e["sym"] == "F" and en != 3.98:
            err(e, "fluor musí mít elektronegativitu 3,98")
        # --- ionizační energie
        ie = e["ie"]
        if ie is not None and not (300 <= ie <= 2500):
            err(e, "1. ionizační energie %s kJ·mol⁻¹ je mimo rozsah" % ie)
        if ie is None and e["z"] <= 103 and e["sym"] != "At":
            err(e, "chybí 1. ionizační energie")
        # --- elektronová afinita
        ea = e["ea"]
        if ea is not None and not (0 < ea <= 400):
            err(e, "elektronová afinita %s kJ·mol⁻¹ je mimo rozsah" % ea)
        # --- ostatní
        if not e["ox"]:
            err(e, "chybí oxidační čísla")
        if not e["yr"] or not e["who"]:
            err(e, "chybí rok objevu nebo objevitel")
        if len(e["note"]) < 40:
            err(e, "věta o výskytu je příliš krátká")

    # --- ruční zápisy Ar musí sedět s číselnou hodnotou ----------------------
    bysym = {e["sym"]: e for e in ELEMENTS}
    for sy, txt in AR_TEXT.items():
        if sy not in bysym:
            bad.append("AR_TEXT: značka %s neexistuje." % sy)
        elif bysym[sy]["ar"] is None:
            bad.append("AR_TEXT: %s má zápis %s, ale žádnou číselnou hodnotu." % (sy, txt))
        elif abs(float(txt) - bysym[sy]["ar"]) > 1e-9:
            bad.append("AR_TEXT: %s má zápis %s, ale hodnotu %s." % (sy, txt, bysym[sy]["ar"]))

    # --- kontroly napříč tabulkou -------------------------------------------
    trend = [("He", "Ne"), ("Ne", "Ar"), ("Li", "Na"), ("Na", "K"), ("K", "Rb"), ("Rb", "Cs")]
    for a, b in trend:
        if bysym[a]["ie"] <= bysym[b]["ie"]:
            bad.append("Trend: ionizační energie %s má být větší než %s." % (a, b))
    for a, b in (("F", "Cl"), ("O", "S"), ("N", "P"), ("C", "Si")):
        if bysym[a]["en"] <= bysym[b]["en"]:
            bad.append("Trend: elektronegativita %s má být větší než %s." % (a, b))
    # --- známé rekordy: když nesedí, je v datech překlep -------------------
    def top(key, cond=lambda e: True):
        cand = [e for e in ELEMENTS if e[key] is not None and cond(e)]
        return max(cand, key=lambda e: e[key])["sym"]

    for key, want, cond, popis in (
        ("en", "F", lambda e: True, "největší elektronegativitu"),
        ("ie", "He", lambda e: True, "největší 1. ionizační energii"),
        ("dens", "Os", lambda e: e["phase"] == "pevné", "největší hustotu z pevných látek"),
        ("mp", "W", lambda e: e["cat"] in METALS, "nejvyšší teplotu tání z kovů"),
        ("rad", "Cs", lambda e: True, "největší atomový poloměr"),
    ):
        got = top(key, cond)
        if got != want:
            bad.append("Rekord: %s má mít %s, ale vyšlo %s." % (want, popis, got))
    if bysym["H"]["rad"] != min(e["rad"] for e in ELEMENTS if e["rad"] is not None):
        bad.append("Rekord: nejmenší atomový poloměr má mít vodík.")
    ng = sorted(e["sym"] for e in ELEMENTS if e["phase"] == "plyn")
    lq = sorted(e["sym"] for e in ELEMENTS if e["phase"] == "kapalné")
    if ng != sorted(["H", "He", "N", "O", "F", "Ne", "Cl", "Ar", "Kr", "Xe", "Rn"]):
        bad.append("Plynů při 25 °C má být jedenáct, je jich: %s" % ", ".join(ng))
    if lq != ["Br", "Hg"]:
        bad.append("Kapalné při 25 °C mají být jen brom a rtuť, je: %s" % ", ".join(lq))

    # lanthanoidy a aktinoidy po patnácti
    lan = [e for e in ELEMENTS if e["cat"] == "lanthanoid"]
    act = [e for e in ELEMENTS if e["cat"] == "aktinoid"]
    if len(lan) != 15 or lan[0]["z"] != 57 or lan[-1]["z"] != 71:
        bad.append("Lanthanoidy nejsou 57–71 (je jich %d)." % len(lan))
    if len(act) != 15 or act[0]["z"] != 89 or act[-1]["z"] != 103:
        bad.append("Aktinoidy nejsou 89–103 (je jich %d)." % len(act))
    # každé místo v mřížce nejvýš jednou
    grid = {}
    for e in ELEMENTS:
        if e["grp"] is None:
            continue
        key = (e["per"], e["grp"])
        if key in grid:
            bad.append("Perioda %d skupina %d obsazená dvakrát (%s, %s)."
                       % (e["per"], e["grp"], grid[key], e["sym"]))
        grid[key] = e["sym"]
    # skupina musí odpovídat bloku
    for e in ELEMENTS:
        g, b = e["grp"], e["blk"]
        if g is None:
            continue
        if g in (1, 2) and b != "s" and e["sym"] != "He":
            bad.append("%s: skupina %d, ale blok %s." % (e["sym"], g, b))
        if 3 <= g <= 12 and b != "d":
            bad.append("%s: skupina %d, ale blok %s." % (e["sym"], g, b))
        if 13 <= g <= 18 and b != "p" and e["sym"] != "He":
            bad.append("%s: skupina %d, ale blok %s." % (e["sym"], g, b))
    return bad


if __name__ == "__main__":
    import sys
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    problems = check()
    if problems:
        print("NÁLEZY (%d):" % len(problems))
        for p in problems:
            print("  -", p)
    else:
        print("Data 118 prvků: v pořádku.")
