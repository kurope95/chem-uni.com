/* ============================================================
   1 · DATA — PRVNÍ PŘECHODNÁ ŘADA (3d)
   Zdroje hodnot: běžné chemické tabulky (Shannonovy iontové
   poloměry pro koordinační číslo 6, Paulingova elektronegativita,
   kovové poloměry pro koordinační číslo 12).
   ============================================================ */
var RADA = [
 {z:21, s:"Sc", n:"skandium", cfg:"3d¹ 4s²",  cfgI:"[Ar] 3d¹ 4s²",  reg:true,
  tt:1541, en:1.36, rk:164, ie:633, ox:[["III",3]], hlavni:"III", dHl:"d⁰",
  aqua:"bezbarvý", aqI:"Sc³⁺ (d⁰)", nep:0,
  pozn:"Jediný stav III s prázdnými orbitaly d — proto bezbarvý a diamagnetický. Je to kontrolní vzorek: ukazuje, co se stane, když d elektrony chybí."},
 {z:22, s:"Ti", n:"titan",    cfg:"3d² 4s²",  cfgI:"[Ar] 3d² 4s²",  reg:true,
  tt:1668, en:1.54, rk:147, ie:659, ox:[["II",1],["III",2],["IV",3]], hlavni:"IV", dHl:"d⁰",
  aqua:"fialový (Ti³⁺)", aqI:"[Ti(H₂O)₆]³⁺ (d¹)", nep:1,
  pozn:"Nejstálejší je IV s konfigurací d⁰ — proto je titanová běloba TiO₂ bílá. Nižší stavy jsou barevné a snadno se oxidují."},
 {z:23, s:"V",  n:"vanad",    cfg:"3d³ 4s²",  cfgI:"[Ar] 3d³ 4s²",  reg:true,
  tt:1910, en:1.63, rk:135, ie:651, ox:[["II",1],["III",2],["IV",3],["V",3]], hlavni:"V", dHl:"d⁰",
  aqua:"fialový (V²⁺)", aqI:"[V(H₂O)₆]²⁺ (d³)", nep:3,
  pozn:"Učebnicová ukázka čtyř barev v jedné zkumavce: V²⁺ fialový, V³⁺ zelený, VO²⁺ modrý, VO₂⁺ žlutý."},
 {z:24, s:"Cr", n:"chrom",    cfg:"3d⁵ 4s¹",  cfgI:"[Ar] 3d⁵ 4s¹",  reg:false, ocek:"3d⁴ 4s²",
  tt:1907, en:1.66, rk:129, ie:653, ox:[["II",2],["III",3],["VI",3]], hlavni:"III", dHl:"d³",
  aqua:"šedozelený až fialový (Cr³⁺)", aqI:"[Cr(H₂O)₆]³⁺ (d³)", nep:3,
  pozn:"Nepravidelná konfigurace: 4s¹ 3d⁵ místo očekávaného 4s² 3d⁴. Zisk z poloviny zaplněné množiny d je větší než ztráta z rozpárování 4s."},
 {z:25, s:"Mn", n:"mangan",   cfg:"3d⁵ 4s²",  cfgI:"[Ar] 3d⁵ 4s²",  reg:true,
  tt:1246, en:1.55, rk:137, ie:717, ox:[["II",3],["III",1],["IV",3],["VI",1],["VII",3]], hlavni:"II", dHl:"d⁵",
  aqua:"bledě růžový (Mn²⁺)", aqI:"[Mn(H₂O)₆]²⁺ (d⁵)", nep:5,
  pozn:"Držitel rekordu v rozsahu oxidačních čísel: od −III po VII. Stav II je mimořádně stálý díky poloviční zaplněnosti d⁵."},
 {z:26, s:"Fe", n:"železo",   cfg:"3d⁶ 4s²",  cfgI:"[Ar] 3d⁶ 4s²",  reg:true,
  tt:1538, en:1.83, rk:126, ie:762, ox:[["II",3],["III",3],["VI",1]], hlavni:"III", dHl:"d⁵",
  aqua:"bledě zelený (Fe²⁺)", aqI:"[Fe(H₂O)₆]²⁺ (d⁶)", nep:4,
  pozn:"Od železa dál už maximálního stavu podle čísla skupiny (VIII) nikdo nedosáhne. Železo končí prakticky u III, výjimečně VI."},
 {z:27, s:"Co", n:"kobalt",   cfg:"3d⁷ 4s²",  cfgI:"[Ar] 3d⁷ 4s²",  reg:true,
  tt:1495, en:1.88, rk:125, ie:760, ox:[["II",3],["III",2]], hlavni:"II", dHl:"d⁷",
  aqua:"růžový (Co²⁺)", aqI:"[Co(H₂O)₆]²⁺ (d⁷)", nep:3,
  pozn:"V jednoduchých solích vládne II, v komplexech s dusíkatými ligandy naopak III. Kobaltnaté sklo a smalty jsou modré."},
 {z:28, s:"Ni", n:"nikl",     cfg:"3d⁸ 4s²",  cfgI:"[Ar] 3d⁸ 4s²",  reg:true,
  tt:1455, en:1.91, rk:125, ie:737, ox:[["II",3],["III",1],["IV",1]], hlavni:"II", dHl:"d⁸",
  aqua:"zelený (Ni²⁺)", aqI:"[Ni(H₂O)₆]²⁺ (d⁸)", nep:2,
  pozn:"Prakticky jediný stav II — proměnlivost oxidačních čísel už tady vyhasíná. Nejvyšší elektronegativita v celé řadě."},
 {z:29, s:"Cu", n:"měď",      cfg:"3d¹⁰ 4s¹", cfgI:"[Ar] 3d¹⁰ 4s¹", reg:false, ocek:"3d⁹ 4s²",
  tt:1085, en:1.90, rk:128, ie:745, ox:[["I",2],["II",3],["III",1]], hlavni:"II", dHl:"d⁹",
  aqua:"modrý (Cu²⁺)", aqI:"[Cu(H₂O)₆]²⁺ (d⁹)", nep:1,
  pozn:"Druhá nepravidelnost v řadě: 4s¹ 3d¹⁰ místo 4s² 3d⁹. Úplně zaplněná množina d je energeticky výhodná."},
 {z:30, s:"Zn", n:"zinek",    cfg:"3d¹⁰ 4s²", cfgI:"[Ar] 3d¹⁰ 4s²", reg:true,
  tt:420, en:1.65, rk:137, ie:906, ox:[["II",3]], hlavni:"II", dHl:"d¹⁰",
  aqua:"bezbarvý", aqI:"[Zn(H₂O)₆]²⁺ (d¹⁰)", nep:0,
  pozn:"Ve stavu II i v kovu má d¹⁰. Podle definice tedy není přechodný kov — jen se s nimi tradičně probírá."}
];

/* standardní redukční potenciály [V] — jen ty, které v textu používáme */
var EPOT = [
 {p:"Sc³⁺ + 3 e⁻ → Sc",              e:-2.08, k:"kov"},
 {p:"Ti²⁺ + 2 e⁻ → Ti",              e:-1.63, k:"kov"},
 {p:"Mn²⁺ + 2 e⁻ → Mn",              e:-1.18, k:"kov"},
 {p:"V²⁺ + 2 e⁻ → V",                e:-1.18, k:"kov"},
 {p:"Zn²⁺ + 2 e⁻ → Zn",              e:-0.76, k:"kov"},
 {p:"Cr³⁺ + 3 e⁻ → Cr",              e:-0.74, k:"kov"},
 {p:"Fe²⁺ + 2 e⁻ → Fe",              e:-0.44, k:"kov"},
 {p:"Cr³⁺ + e⁻ → Cr²⁺",              e:-0.41, k:"pár"},
 {p:"Co²⁺ + 2 e⁻ → Co",              e:-0.28, k:"kov"},
 {p:"Ni²⁺ + 2 e⁻ → Ni",              e:-0.26, k:"kov"},
 {p:"Cu²⁺ + 2 e⁻ → Cu",              e: 0.34, k:"kov"},
 {p:"MnO₄⁻ + e⁻ → MnO₄²⁻",           e: 0.56, k:"pár"},
 {p:"Fe³⁺ + e⁻ → Fe²⁺",              e: 0.77, k:"pár"},
 {p:"Ag⁺ + e⁻ → Ag",                 e: 0.80, k:"kov"},
 {p:"MnO₂ + 4 H₃O⁺ + 2 e⁻ → Mn²⁺",   e: 1.22, k:"pár"},
 {p:"Cr₂O₇²⁻ + 14 H₃O⁺ + 6 e⁻ → 2 Cr³⁺", e: 1.36, k:"pár"},
 {p:"Au³⁺ + 3 e⁻ → Au",              e: 1.50, k:"kov"},
 {p:"MnO₄⁻ + 8 H₃O⁺ + 5 e⁻ → Mn²⁺",  e: 1.51, k:"pár"},
 {p:"MnO₄⁻ + 4 H₃O⁺ + 3 e⁻ → MnO₂",  e: 1.68, k:"pár"},
 {p:"Co³⁺ + e⁻ → Co²⁺",              e: 1.92, k:"pár"}
];

/* ============================================================
   2 · DATA — BAREVNOST: pásy pohlcené a pozorované barvy
   Rozsahy vlnových délek jsou obvyklé hranice viditelného spektra.
   ============================================================ */
var SPEKTRUM = [
 {od:380, do:430, poh:"fialová",   doP:"žlutozelená", hex:"#7b2fbe"},
 {od:430, do:490, poh:"modrá",     doP:"oranžová",    hex:"#2f5fd0"},
 {od:490, do:560, poh:"zelená",    doP:"purpurová",   hex:"#2f9e46"},
 {od:560, do:580, poh:"žlutozelená", doP:"fialová",   hex:"#9db32a"},
 {od:580, do:595, poh:"žlutá",     doP:"modrá",       hex:"#e0b400"},
 {od:595, do:650, poh:"oranžová",  doP:"zelenomodrá", hex:"#e07000"},
 {od:650, do:780, poh:"červená",   doP:"zelená",      hex:"#cc2222"}
];

/* reálné komplexy: poloha hlavního absorpčního maxima ve viditelné oblasti [cm⁻¹].
   U iontu d¹ se rovná přímo rozštěpení Δ₀; u ostatních je to nejsilnější pás
   ve viditelné části spektra. */
var KOMPLEXY = [
 {id:"ti",  nm:"[Ti(H₂O)₆]³⁺",  d:"d¹", nd:1, D:20300, lig:"H₂O", nep:1, poz:"fialová", hex:"#8a3fbf",
  pop:"Nejjednodušší barevný komplex vůbec. Jediný elektron d skočí z dolní trojice do horní dvojice, a protože je přechod jen jeden, rovná se poloha pásu přímo rozštěpení Δ₀."},
 {id:"v2",  nm:"[V(H₂O)₆]²⁺",   d:"d³", nd:3, D:17700, lig:"H₂O", nep:3, poz:"fialová", hex:"#7a49b8",
  pop:"Vanadnatý akvakomplex vzniká redukcí vanadičnanu zinkem. Je to poslední zastávka barevné kaskády vanadu: žlutá → modrá → zelená → fialová."},
 {id:"cr",  nm:"[Cr(H₂O)₆]³⁺",  d:"d³", nd:3, D:17400, lig:"H₂O", nep:3, poz:"šedofialová", hex:"#6f5f9e",
  pop:"Chromitý akvakomplex. Barva se mění podle toho, kolik molekul vody nahradily jiné ligandy — proto bývá roztok chromité soli jednou fialový, jindy zelený."},
 {id:"crn", nm:"[Cr(NH₃)₆]³⁺",  d:"d³", nd:3, D:21600, lig:"NH₃", nep:3, poz:"žlutooranžová", hex:"#e39a1f",
  pop:"Týž kation, jiný ligand. Amoniak štěpí silněji než voda, pás se posune do modré části spektra a roztok zežloutne."},
 {id:"nih", nm:"[Ni(H₂O)₆]²⁺",  d:"d⁸", nd:8, D:13800, lig:"H₂O", nep:2, poz:"zelená", hex:"#3f9b53",
  pop:"Zelený roztok síranu nikelnatého. Slabý ligand znamená malé rozštěpení a pás až u červeného konce spektra."},
 {id:"nin", nm:"[Ni(NH₃)₆]²⁺",  d:"d⁸", nd:8, D:17500, lig:"NH₃", nep:2, poz:"modrofialová", hex:"#5057c4",
  pop:"Po přidání nadbytku amoniaku roztok zmodrofialoví. Je to nejnázornější školní důkaz spektrochemické řady."},
 {id:"coh", nm:"[Co(H₂O)₆]²⁺",  d:"d⁷", nd:7, D:19400, lig:"H₂O", nep:3, poz:"růžová", hex:"#e0698f",
  pop:"Růžový roztok kobaltnaté soli. Po odebrání vody (nebo po záměně za chloridy) přejde na modrý tetraedrický komplex — na tom stojí indikátor vlhkosti."}
];

/* magnetické chování — kolik nepárových elektronů a jaký moment */
var MAGN = [
 {id:"sc3", nm:"Sc³⁺",  d:0,  n:0, pop:"Prázdná množina d. Diamagnetický a bezbarvý — obojí ze stejného důvodu."},
 {id:"ti3", nm:"Ti³⁺",  d:1,  n:1, pop:"Jeden nepárový elektron. Nejmenší možný nenulový moment mezi ionty d."},
 {id:"v3",  nm:"V³⁺",   d:2,  n:2, pop:"Dva elektrony v dolní trojici orbitalů, oba nepárové podle Hundova pravidla."},
 {id:"cr3", nm:"Cr³⁺",  d:3,  n:3, pop:"Tři elektrony přesně zaplní dolní trojici t₂g po jednom — velmi stabilní uspořádání."},
 {id:"mn2", nm:"Mn²⁺",  d:5,  n:5, pop:"Pět nepárových elektronů, největší možný spinový moment v bloku 3d."},
 {id:"fe3", nm:"Fe³⁺",  d:5,  n:5, pop:"Také d⁵ vysokospinový. Proto má stejný moment jako Mn²⁺ — obojí 5,92 μB."},
 {id:"fe2", nm:"Fe²⁺",  d:6,  n:4, pop:"Šestý elektron se musí spárovat, takže nepárových zbývají čtyři."},
 {id:"co2", nm:"Co²⁺",  d:7,  n:3, pop:"Sedm elektronů, tři nepárové. Naměřená hodnota bývá vyšší kvůli příspěvku dráhového momentu."},
 {id:"ni2", nm:"Ni²⁺",  d:8,  n:2, pop:"Osm elektronů, dva nepárové v horní dvojici e_g."},
 {id:"cu2", nm:"Cu²⁺",  d:9,  n:1, pop:"Jediný nepárový elektron. Přesto je modrý — na barvu stačí jeden přechod."},
 {id:"zn2", nm:"Zn²⁺",  d:10, n:0, pop:"Zcela zaplněná množina d. Diamagnetický, bezbarvý — a proto zinek není přechodný kov."}
];
