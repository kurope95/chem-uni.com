/* ============================================================
   2 · DATA — elementární kovy
   Hodnoty odpovídají běžným tabulkám (CRC, Chemické tabulky):
   rho … hustota při 20 °C [g·cm⁻³], tt … teplota tání [°C],
   tv … teplota varu [°C], en … elektronegativita (Paulingova),
   E … standardní redukční potenciál hlavního páru [V],
   sig … měrná elektrická vodivost při 20 °C [MS·m⁻¹],
   moh … tvrdost podle Mohse, ab … zastoupení v zemské kůře [hm. %],
   mr … typ mřížky, cat … kategorie pro filtr
   ============================================================ */
var FAR = 96485;              /* C·mol⁻¹ */
var NAV = 6.022e23;           /* mol⁻¹ */

/* mřížky: kpc = kubická plošně centrovaná, kpr = kubická prostorově centrovaná,
   hex = hexagonální nejtěsnější, jina = jiná (kosočtverečná, tetragonální…) */
var MR = {
  kpc:{k:"kpc", nm:"kubická plošně centrovaná", zk:"KPC (A1)", kc:12, nb:4, fill:74.05,
       ar:"a = 2√2·r ≈ 2,828·r", vrs:"ABCABC", ex:"Al, Cu, Ag, Au, Pb, Ni, γ‑Fe",
       pop:"Nejtěsnější uspořádání s vrstvením ABCABC. Dvanáct nejbližších sousedů, čtyři atomy na buňku, dvanáct skluzových směrů — proto jsou tyto kovy nejlépe tvárné."},
  hex:{k:"hex", nm:"hexagonální nejtěsnější", zk:"HTU (A3)", kc:12, nb:6, fill:74.05,
       ar:"a = 2·r, c/a = √(8/3) ≈ 1,633", vrs:"ABAB", ex:"Mg, Zn, Cd, Ti, Co, Be",
       pop:"Také nejtěsnější uspořádání, ale s vrstvením ABAB. Stejné koordinační číslo i zaplnění jako u KPC, jenže skluzových rovin je mnohem méně — tyto kovy jsou proto křehčí."},
  kpr:{k:"kpr", nm:"kubická prostorově centrovaná", zk:"KPR (A2)", kc:8, nb:2, fill:68.02,
       ar:"a = 4·r/√3 ≈ 2,309·r", vrs:"—",  ex:"Li, Na, K, Cr, W, V, α‑Fe",
       pop:"Není nejtěsnější: atom má jen osm sousedů a mezi koulemi zbývá o šest procentních bodů víc prázdna. Typická pro alkalické kovy a pro kovy s pevnou, silně směrovou vazbou (W, Cr)."},
  sc: {k:"sc", nm:"prostá (jednoduchá) kubická", zk:"PK", kc:6, nb:1, fill:52.36,
       ar:"a = 2·r", vrs:"—", ex:"polonium (jediný kov)",
       pop:"Učebnicový extrém: šest sousedů, jeden atom na buňku, skoro polovina prostoru prázdná. V přírodě ji z kovů má jen polonium — energeticky se nevyplácí."}
};
var MRORDER = ["kpc","hex","kpr","sc"];

var KOVY = [
 {s:"Li", n:"lithium",  z:3,  g:"1",  per:2, cat:"alk",  rho:0.534, tt:180.5, tv:1342, en:0.98, mr:"kpr", E:-3.04, sig:10.8, moh:0.6, ab:0.002,
  ruda:"spodumen LiAlSi₂O₆, lepidolit, solanky", vyr:"tavná elektrolýza směsi LiCl + KCl", uzit:"akumulátory, lehké slitiny, sklo"},
 {s:"Na", n:"sodík",    z:11, g:"1",  per:3, cat:"alk",  rho:0.968, tt:97.8,  tv:883,  en:0.93, mr:"kpr", E:-2.71, sig:21.0, moh:0.5, ab:2.36,
  ruda:"halit NaCl, mořská voda", vyr:"tavná elektrolýza NaCl (Downsův proces)", uzit:"redukovadlo, teplonosné médium, výroba sloučenin"},
 {s:"K",  n:"draslík",  z:19, g:"1",  per:4, cat:"alk",  rho:0.862, tt:63.5,  tv:759,  en:0.82, mr:"kpr", E:-2.93, sig:13.9, moh:0.4, ab:2.09,
  ruda:"sylvín KCl, karnalit", vyr:"redukce KCl sodíkem (metalotermie)", uzit:"slitina Na–K jako chladivo, laboratorní redukovadlo"},
 {s:"Be", n:"beryllium",z:4,  g:"2",  per:2, cat:"alz",  rho:1.85,  tt:1287,  tv:2469, en:1.57, mr:"hex", E:-1.85, sig:25.0, moh:5.5, ab:0.00028,
  ruda:"beryl Be₃Al₂Si₆O₁₈", vyr:"metalotermická redukce BeF₂ hořčíkem", uzit:"berylliové bronzy, okna rentgenek"},
 {s:"Mg", n:"hořčík",   z:12, g:"2",  per:3, cat:"alz",  rho:1.738, tt:650,   tv:1090, en:1.31, mr:"hex", E:-2.37, sig:22.6, moh:2.5, ab:2.33,
  ruda:"magnezit MgCO₃, dolomit, mořská voda", vyr:"tavná elektrolýza MgCl₂ nebo silikotermie (Pidgeon)", uzit:"lehké slitiny, obětované anody, Grignardova činidla"},
 {s:"Ca", n:"vápník",   z:20, g:"2",  per:4, cat:"alz",  rho:1.55,  tt:842,   tv:1484, en:1.00, mr:"kpc", E:-2.87, sig:29.8, moh:1.8, ab:4.15,
  ruda:"vápenec CaCO₃, sádrovec, fluorit", vyr:"tavná elektrolýza CaCl₂ nebo aluminotermie", uzit:"dezoxidační přísada do oceli, kalciotermie"},
 {s:"Sr", n:"stroncium",z:38, g:"2",  per:5, cat:"alz",  rho:2.64,  tt:777,   tv:1382, en:0.95, mr:"kpc", E:-2.89, sig:7.6,  moh:1.8, ab:0.037,
  ruda:"celestin SrSO₄, stroncianit", vyr:"aluminotermie z SrO, tavná elektrolýza SrCl₂", uzit:"pyrotechnika, feritové magnety"},
 {s:"Ba", n:"baryum",   z:56, g:"2",  per:6, cat:"alz",  rho:3.51,  tt:727,   tv:1897, en:0.89, mr:"kpr", E:-2.91, sig:2.9,  moh:1.3, ab:0.0425,
  ruda:"baryt BaSO₄, witherit BaCO₃", vyr:"aluminotermie z BaO", uzit:"getr ve vakuové technice, sloučeniny do vrtných výplachů"},
 {s:"Al", n:"hliník",   z:13, g:"13", per:3, cat:"p",    rho:2.70,  tt:660.3, tv:2470, en:1.61, mr:"kpc", E:-1.66, sig:37.7, moh:2.8, ab:8.23,
  ruda:"bauxit AlO(OH) a Al(OH)₃", vyr:"Bayerův proces + tavná elektrolýza (Hall–Héroult)", uzit:"konstrukce, obaly, vodiče, aluminotermie"},
 {s:"Ga", n:"gallium",  z:31, g:"13", per:4, cat:"p",    rho:5.91,  tt:29.8,  tv:2400, en:1.81, mr:"jina",E:-0.55, sig:6.8,  moh:1.5, ab:0.0019,
  ruda:"nemá vlastní rudu — doprovází bauxit a sfalerit", vyr:"elektrolýza roztoku gallitanu z Bayerova výluhu", uzit:"polovodiče (GaAs, GaN), LED"},
 {s:"In", n:"indium",   z:49, g:"13", per:5, cat:"p",    rho:7.31,  tt:156.6, tv:2072, en:1.78, mr:"jina",E:-0.34, sig:12.5, moh:1.2, ab:0.000016,
  ruda:"doprovod rud zinku a olova", vyr:"cementace zinkem z roztoku síranu inditého", uzit:"vodivé vrstvy ITO, pájky, polovodiče"},
 {s:"Sn", n:"cín",      z:50, g:"14", per:5, cat:"p",    rho:7.265, tt:231.9, tv:2602, en:1.96, mr:"jina",E:-0.14, sig:9.17, moh:1.5, ab:0.00023,
  ruda:"kasiterit SnO₂", vyr:"redukce SnO₂ uhlíkem při 1300 °C", uzit:"pocínovaný plech, pájky, bronzy"},
 {s:"Pb", n:"olovo",    z:82, g:"14", per:6, cat:"p",    rho:11.34, tt:327.5, tv:1749, en:2.33, mr:"kpc", E:-0.13, sig:4.55, moh:1.5, ab:0.0014,
  ruda:"galenit PbS", vyr:"pražně‑redukční nebo pražně‑reakční postup", uzit:"akumulátory, stínění záření, pájky"},
 {s:"Bi", n:"bismut",   z:83, g:"15", per:6, cat:"p",    rho:9.79,  tt:271.4, tv:1564, en:2.02, mr:"jina",E:0.31,  sig:0.87, moh:2.3, ab:0.0000085,
  ruda:"bismutinit Bi₂S₃, příměs v sulfidických rudách", vyr:"srážení Bi₂S₃ železem, redukce Bi₂O₃ uhlíkem", uzit:"lehkotavitelné slitiny, léčiva"},
 {s:"Ti", n:"titan",    z:22, g:"4",  per:4, cat:"prech",rho:4.506, tt:1668,  tv:3287, en:1.54, mr:"hex", E:-1.63, sig:2.38, moh:6.0, ab:0.565,
  ruda:"ilmenit FeTiO₃, rutil TiO₂", vyr:"Krollův postup — redukce TiCl₄ hořčíkem", uzit:"letecké konstrukce, implantáty, chemické aparatury"},
 {s:"Zr", n:"zirkonium",z:40, g:"4",  per:5, cat:"prech",rho:6.52,  tt:1855,  tv:4409, en:1.33, mr:"hex", E:-1.45, sig:2.4,  moh:5.0, ab:0.0165,
  ruda:"zirkon ZrSiO₄, baddeleyit ZrO₂", vyr:"Krollův postup, rafinace van Arkelovou metodou", uzit:"pokrytí palivových článků, chemický průmysl"},
 {s:"V",  n:"vanad",    z:23, g:"5",  per:4, cat:"prech",rho:6.11,  tt:1910,  tv:3407, en:1.63, mr:"kpr", E:-1.18, sig:5.0,  moh:7.0, ab:0.012,
  ruda:"vanadinit, rudy železa s obsahem vanadu", vyr:"kalciotermie nebo silikotermie z V₂O₅", uzit:"legování ocelí (ferrovanad)"},
 {s:"Nb", n:"niob",     z:41, g:"5",  per:5, cat:"prech",rho:8.57,  tt:2477,  tv:4744, en:1.60, mr:"kpr", E:-1.10, sig:6.9,  moh:6.0, ab:0.002,
  ruda:"columbit (Fe,Mn)(Nb,Ta)₂O₆", vyr:"redukce Nb₂O₅ uhlíkem za sníženého tlaku", uzit:"nerezavějící a supravodivé slitiny"},
 {s:"Cr", n:"chrom",    z:24, g:"6",  per:4, cat:"prech",rho:7.19,  tt:1907,  tv:2671, en:1.66, mr:"kpr", E:-0.74, sig:7.9,  moh:8.5, ab:0.0102,
  ruda:"chromit FeCr₂O₄", vyr:"redukce chromitu uhlíkem (ferrochrom) nebo aluminotermie", uzit:"nerezavějící oceli, galvanické chromování"},
 {s:"Mo", n:"molybden", z:42, g:"6",  per:5, cat:"prech",rho:10.28, tt:2623,  tv:4639, en:2.16, mr:"kpr", E:-0.20, sig:18.7, moh:5.5, ab:0.00012,
  ruda:"molybdenit MoS₂", vyr:"pražení na MoO₃ a redukce vodíkem při 1200 °C", uzit:"legování ocelí, žáruvzdorné součásti"},
 {s:"W",  n:"wolfram",  z:74, g:"6",  per:6, cat:"prech",rho:19.25, tt:3422,  tv:5555, en:2.36, mr:"kpr", E:-0.12, sig:18.9, moh:7.5, ab:0.00125,
  ruda:"wolframit (Fe,Mn)WO₄, scheelit CaWO₄", vyr:"redukce WO₃ vodíkem při 1100 °C", uzit:"slinuté karbidy, žhavicí vlákna, rychlořezné oceli"},
 {s:"Mn", n:"mangan",   z:25, g:"7",  per:4, cat:"prech",rho:7.44,  tt:1246,  tv:2061, en:1.55, mr:"jina",E:-1.18, sig:0.62, moh:6.0, ab:0.095,
  ruda:"burel MnO₂, psilomelan", vyr:"redukce MnO uhlíkem (ferromangan), aluminotermie z Mn₃O₄", uzit:"dezoxidace a legování ocelí"},
 {s:"Fe", n:"železo",   z:26, g:"8",  per:4, cat:"prech",rho:7.874, tt:1538,  tv:2861, en:1.83, mr:"kpr", E:-0.44, sig:10.0, moh:4.0, ab:5.63,
  ruda:"hematit Fe₂O₃, magnetit Fe₃O₄, siderit FeCO₃", vyr:"vysoká pec (redukce oxidem uhelnatým) + konvertor", uzit:"oceli a litiny — hlavní konstrukční materiál"},
 {s:"Co", n:"kobalt",   z:27, g:"9",  per:4, cat:"prech",rho:8.90,  tt:1495,  tv:2927, en:1.88, mr:"hex", E:-0.28, sig:17.2, moh:5.0, ab:0.0025,
  ruda:"kobaltin CoAsS, linneit; doprovod rud Cu a Ni", vyr:"redukce Co₃O₄ uhlíkem, elektrolýza roztoku", uzit:"žáruvzdorné slitiny, katody Li‑ion, magnety"},
 {s:"Ni", n:"nikl",     z:28, g:"10", per:4, cat:"prech",rho:8.908, tt:1455,  tv:2913, en:1.91, mr:"kpc", E:-0.26, sig:14.3, moh:4.0, ab:0.0084,
  ruda:"pentlandit (Ni,Fe)₉S₈, laterity", vyr:"redukce NiO, čištění Mondovým procesem, elektrolýza", uzit:"nerezavějící oceli, niklování, akumulátory"},
 {s:"Cu", n:"měď",      z:29, g:"11", per:4, cat:"prech",rho:8.96,  tt:1084.6,tv:2562, en:1.90, mr:"kpc", E:0.34,  sig:59.6, moh:3.0, ab:0.006,
  ruda:"chalkopyrit CuFeS₂, chalkosin Cu₂S, malachit", vyr:"pražení, konvertor, elektrolytická rafinace", uzit:"vodiče, mosazi a bronzy, střešní krytina"},
 {s:"Ag", n:"stříbro",  z:47, g:"11", per:5, cat:"prech",rho:10.49, tt:961.8, tv:2162, en:1.93, mr:"kpc", E:0.80,  sig:63.0, moh:2.5, ab:0.0000075,
  ruda:"argentit Ag₂S; hlavně doprovod rud Pb, Zn, Cu", vyr:"kyanidové loužení + cementace zinkem, anodové kaly", uzit:"kontakty, pájky, šperky, katalyzátory"},
 {s:"Au", n:"zlato",    z:79, g:"11", per:6, cat:"prech",rho:19.30, tt:1064.2,tv:2856, en:2.54, mr:"kpc", E:1.50,  sig:45.2, moh:2.5, ab:0.0000004,
  ruda:"vyskytuje se převážně ryzí", vyr:"amalgamace nebo kyanidové loužení a cementace zinkem", uzit:"elektronika, šperky, zubní lékařství"},
 {s:"Zn", n:"zinek",    z:30, g:"12", per:4, cat:"prech",rho:7.14,  tt:419.5, tv:907,  en:1.65, mr:"hex", E:-0.76, sig:16.6, moh:2.5, ab:0.007,
  ruda:"sfalerit ZnS, smithsonit ZnCO₃", vyr:"pražení a redukce uhlíkem, nebo elektrolýza roztoku ZnSO₄", uzit:"pozinkování, mosazi, obětované anody"},
 {s:"Cd", n:"kadmium",  z:48, g:"12", per:5, cat:"prech",rho:8.65,  tt:321.1, tv:767,  en:1.69, mr:"hex", E:-0.40, sig:13.8, moh:2.0, ab:0.000015,
  ruda:"doprovod zinkových rud", vyr:"destilace z prvních frakcí zinku, elektrolýza CdSO₄", uzit:"dnes omezené — pigmenty, starší akumulátory"},
 {s:"Hg", n:"rtuť",     z:80, g:"12", per:6, cat:"prech",rho:13.53, tt:-38.8, tv:356.7,en:2.00, mr:"jina",E:0.85,  sig:1.04, moh:0,   ab:0.0000085,
  ruda:"cinabarit (rumělka) HgS", vyr:"pražení rudy na vzduchu a kondenzace par", uzit:"dnes utlumené — dříve amalgámy a elektrolýza"},
 {s:"Pt", n:"platina",  z:78, g:"10", per:6, cat:"prech",rho:21.45, tt:1768,  tv:3825, en:2.28, mr:"kpc", E:1.18,  sig:9.4,  moh:3.5, ab:0.0000005,
  ruda:"ryzí platina, anodové kaly z rafinace Ni a Cu", vyr:"srážení komplexních solí a jejich tepelný rozklad", uzit:"katalyzátory, laboratorní nádobí, elektrody"},
 {s:"U",  n:"uran",     z:92, g:"An", per:7, cat:"akt",  rho:19.1,  tt:1135,  tv:4131, en:1.38, mr:"jina",E:-1.80, sig:3.6,  moh:6.0, ab:0.00027,
  ruda:"uraninit (smolinec) UO₂", vyr:"redukce UF₄ hořčíkem nebo vápníkem", uzit:"jaderné palivo"}
];
function K_(s){ for(var i=0;i<KOVY.length;i++){ if(KOVY[i].s===s) return KOVY[i]; } return null; }

var CATNM = {alk:"alkalický kov", alz:"kov alkalických zemin", prech:"přechodný kov", p:"kov p‑bloku", akt:"aktinoid"};

/* ============================================================
   Pásová struktura — typy pevných látek
   eg … šířka zakázaného pásu [eV], sig … typická měrná vodivost [S·m⁻¹]
   ============================================================ */
var PASY = [
 {id:"kov", nm:"Kov (vodič)", eg:0, sig:"10⁶ až 10⁸", tdep:"vodivost s teplotou klesá",
  ex:"Cu (σ = 59,6 MS·m⁻¹), Ag, Al, Fe",
  d:"Valenční a vodivostní pás se <b>překrývají</b>, nebo je valenční pás jen zčásti zaplněný. Elektron má tedy volnou hladinu hned nad sebou a stačí nekonečně malé napětí, aby se rozpohyboval. Zakázaný pás neexistuje.",
  t:"Zahřátím kmitají atomy víc a rozptylují elektrony — vodivost kovu s rostoucí teplotou <b>klesá</b>. Toho se využívá u odporových teploměrů."},
 {id:"pv", nm:"Vlastní polovodič", eg:1.12, sig:"10⁻⁴ až 10⁴", tdep:"vodivost s teplotou prudce roste",
  ex:"Si (1,12 eV), Ge (0,66 eV), GaAs (1,42 eV)",
  d:"Valenční pás je plně obsazený, vodivostní prázdný, mezi nimi <b>úzký zakázaný pás</b> (řádově 0,1 až 3 eV). Za pokojové teploty přeskočí několik elektronů tepelnou energií nahoru a ve valenčním pásu po nich zůstanou <b>díry</b> — vede tedy oboje.",
  t:"Zahřátí dodá víc elektronů do vodivostního pásu, takže vodivost <b>roste</b> — přesně naopak než u kovu. To je nejspolehlivější experimentální rozlišení kovu a polovodiče."},
 {id:"pn", nm:"Polovodič typu N", eg:1.12, sig:"10² až 10⁵", tdep:"vodivost roste s příměsí i teplotou",
  ex:"Si dotovaný fosforem nebo arsenem (5 valenčních elektronů)",
  d:"Do křemíku (4 valenční elektrony) přidáme atom s <b>pěti</b> valenčními elektrony. Čtyři vytvoří vazby, pátý zbývá — sedí na <b>donorové hladině</b> těsně pod vodivostním pásem a odskočí do něj už při pokojové teplotě.",
  t:"Většinovými nosiči náboje jsou <b>záporné elektrony</b> — odtud N (negative). Stačí jeden příměsový atom na milion, aby vodivost vzrostla o několik řádů."},
 {id:"pp", nm:"Polovodič typu P", eg:1.12, sig:"10² až 10⁵", tdep:"vodivost roste s příměsí i teplotou",
  ex:"Si dotovaný borem nebo galliem (3 valenční elektrony)",
  d:"Příměs má jen <b>tři</b> valenční elektrony, takže jedna vazba zůstane neúplná. Vzniká <b>akceptorová hladina</b> těsně nad valenčním pásem, do níž snadno přeskočí elektron z pásu a nechá tam díru.",
  t:"Většinovými nosiči jsou kladné <b>díry</b> — odtud P (positive). Přiložení P a N vrstvy k sobě dává PN přechod, tedy diodu; to je základ veškeré elektroniky."},
 {id:"iz", nm:"Izolant (nevodič)", eg:5.47, sig:"10⁻²⁰ až 10⁻¹⁰", tdep:"prakticky nevede za žádné teploty",
  ex:"diamant (5,47 eV), SiO₂ (≈ 9 eV), většina polymerů",
  d:"Zakázaný pás je <b>široký</b> (nad zhruba 3 eV). Tepelná energie za pokojové teploty je asi 0,025 eV, takže přeskočit ho nemá elektron šanci. Valenční pás zůstává plný, vodivostní prázdný.",
  t:"Diamant a grafit jsou obě modifikace uhlíku, a přesto je diamant izolant a grafit vede. Rozhoduje struktura, ne prvek — v grafitu jsou delokalizované elektrony ve vrstvách."}
];
function P_(id){ for(var i=0;i<PASY.length;i++){ if(PASY[i].id===id) return PASY[i]; } return null; }

/* ============================================================
   Slitiny
   typ: "sub" substituční · "int" intersticiální · "im" intermetalická sloučenina
   ============================================================ */
var SLIT = [
 {nm:"Mosaz", sl:"Cu 58–95 % · Zn 5–42 %", typ:"sub", tt:"900 až 1000 °C",
  vl:"tvrdší a pevnější než měď, dobře obrobitelná, zlatavá", uz:"armatury, hudební nástroje, nábojnice, šrouby"},
 {nm:"Bronz (cínový)", sl:"Cu 80–95 % · Sn 5–20 %", typ:"sub", tt:"900 až 1000 °C",
  vl:"tvrdý, odolný mořské vodě, dobře odlévá", uz:"zvony, sochy, ložiska, lodní šrouby"},
 {nm:"Dural", sl:"Al ≈ 94 % · Cu 4 % · Mg 1 % · Mn 0,5 %", typ:"sub", tt:"≈ 650 °C",
  vl:"pevný jako měkká ocel, ale třikrát lehčí; hůř odolává korozi než čistý hliník", uz:"letecké konstrukce, jízdní kola, žebříky"},
 {nm:"Nerezavějící ocel", sl:"Fe · Cr ≥ 10,5 % · Ni 8–10 % · C < 0,1 %", typ:"sub+int", tt:"≈ 1400 až 1450 °C",
  vl:"pasivuje se vrstvičkou Cr₂O₃, která se sama obnovuje", uz:"nádobí, chirurgické nástroje, chemické aparatury"},
 {nm:"Uhlíková ocel", sl:"Fe · C 0,02 až 2,11 %", typ:"int", tt:"1400 až 1530 °C",
  vl:"kujná a svařitelná; s rostoucím uhlíkem tvrdší, ale křehčí", uz:"nosníky, plechy, nářadí, kolejnice"},
 {nm:"Litina", sl:"Fe · C 2,11 až 4,3 % · Si 1–3 %", typ:"int", tt:"1150 až 1250 °C",
  vl:"nekujná a křehká, ale výborně zabíhavá do formy a tlumí chvění", uz:"bloky motorů, poklopy, radiátory, obráběcí stroje"},
 {nm:"Rychlořezná ocel", sl:"Fe · W 18 % · Cr 4 % · V 1 % · C 0,7 %", typ:"sub+int", tt:"≈ 1400 °C",
  vl:"drží tvrdost i při rozžhavení do červena", uz:"vrtáky, frézy, nože obráběcích strojů"},
 {nm:"Pájka (měkká)", sl:"Sn 60 % · Pb 40 %, dnes Sn–Ag–Cu", typ:"sub", tt:"183 až 190 °C",
  vl:"eutektikum taje níž než oba čisté kovy", uz:"pájení elektroniky a klempířských spojů"},
 {nm:"Woodův kov", sl:"Bi 50 % · Pb 26,7 % · Sn 13,3 % · Cd 10 %", typ:"sub", tt:"70 °C",
  vl:"taje v horké vodě — hluboko pod teplotou tání každé složky", uz:"tavné pojistky sprinklerů, tavné spoje"},
 {nm:"Konstantan", sl:"Cu 55 % · Ni 45 %", typ:"sub", tt:"≈ 1220 °C",
  vl:"odpor prakticky nezávisí na teplotě", uz:"přesné odporové normály, termočlánky"},
 {nm:"Nichrom", sl:"Ni 80 % · Cr 20 %", typ:"sub", tt:"≈ 1400 °C",
  vl:"vysoký měrný odpor, na vzduchu se pasivuje a nespálí se", uz:"topné spirály vařičů, fénů a pecí"},
 {nm:"Amalgám", sl:"Hg + Ag, Sn, Cu (nebo Na)", typ:"sub", tt:"tuhne postupně",
  vl:"zpočátku plastický, po několika hodinách ztvrdne", uz:"dříve zubní výplně, amalgámová elektrolýza, získávání zlata"},
 {nm:"Bílé zlato", sl:"Au 75 % · Pd nebo Ni + Ag", typ:"sub", tt:"≈ 1000 °C",
  vl:"tvrdší než čisté zlato a stříbrně bílé", uz:"šperkařství"},
 {nm:"Pájitelný cín (pewter)", sl:"Sn ≈ 92 % · Sb · Cu", typ:"sub", tt:"≈ 230 °C",
  vl:"měkký, dobře tvarovatelný, netoxický", uz:"cínové nádobí a figurky"},
 {nm:"Slitina Al–Li", sl:"Al · Li 1–3 % · Cu", typ:"sub", tt:"≈ 640 °C",
  vl:"každé procento lithia sníží hustotu asi o 3 % a zvýší tuhost", uz:"nádrže nosných raket, trupy letadel"},
 {nm:"Ferromangan", sl:"Fe · Mn 65–90 %", typ:"sub", tt:"≈ 1250 °C",
  vl:"není finální materiál, ale koncentrát manganu pro ocelárnu", uz:"dezoxidace a legování oceli"},
 {nm:"Wolframkarbidový slinutý karbid", sl:"WC 85–95 % · Co pojivo", typ:"im", tt:"nad 2800 °C (WC)",
  vl:"tvrdost blízká diamantu, extrémně odolný otěru", uz:"břity obráběcích nástrojů, vrtné korunky"},
 {nm:"Magnalium", sl:"Al · Mg 5–50 %", typ:"sub", tt:"450 až 650 °C",
  vl:"velmi lehký, dobře odolává mořské vodě", uz:"lodní konstrukce, pyrotechnika"}
];

/* ============================================================
   Rudy a způsob výroby — průzkumník
   geo … geochemická skupina, ox … oxidační číslo kovu v rudě
   ============================================================ */
var RUDY = [
 {s:"Fe", min:"hematit Fe₂O₃ · magnetit Fe₃O₄ · siderit FeCO₃", typ:"oxidická", geo:"litofilní/siderofilní", ox:"+III (+II)",
  met:"redukce uhlíkem", eq:"Fe₂O₃ + 3 CO → 2 Fe + 3 CO₂", proc:"vysoká pec",
  why:"Železo je jen mírně neušlechtilé (E° = −0,44 V) a jeho oxid uhlík zredukuje už kolem 750 °C. Proto se vyrábí nejlevnější cestou, jaká existuje."},
 {s:"Al", min:"bauxit AlO(OH)·Al(OH)₃", typ:"oxid‑hydroxidická", geo:"litofilní", ox:"+III",
  met:"tavná elektrolýza", eq:"2 Al₂O₃ + 3 C → 4 Al + 3 CO₂", proc:"Bayer + Hall–Héroult",
  why:"Al₂O₃ by uhlík zredukoval až nad 2000 °C. Hliník je navíc tak neušlechtilý (E° = −1,66 V), že z vodného roztoku se místo něj vyloučí vodík — zbývá elektrolýza taveniny."},
 {s:"Cu", min:"chalkopyrit CuFeS₂ · chalkosin Cu₂S · malachit", typ:"sulfidická", geo:"chalkofilní", ox:"+I, +II",
  met:"pražení a konverze", eq:"Cu₂S + O₂ → 2 Cu + SO₂", proc:"flotace, tavení, konvertor, elektrolytická rafinace",
  why:"Měď je ušlechtilá (E° = +0,34 V), takže se z vlastního sulfidu uvolní pouhým pražením — kyslík si vezme síru a měď zůstane. Čistota pro vodiče se pak dodělá elektrolýzou."},
 {s:"Zn", min:"sfalerit ZnS · smithsonit ZnCO₃", typ:"sulfidická", geo:"chalkofilní", ox:"+II",
  met:"pražení a redukce uhlíkem", eq:"2 ZnS + 3 O₂ → 2 ZnO + 2 SO₂ · ZnO + C → Zn + CO", proc:"retortová pec nebo elektrolýza ZnSO₄",
  why:"Sulfid se uhlíkem neredukuje, proto se nejdřív pražením převede na oxid. Zinek vře už při 907 °C, takže z pece odchází jako pára a rovnou se destiluje."},
 {s:"Pb", min:"galenit PbS", typ:"sulfidická", geo:"chalkofilní", ox:"+II",
  met:"pražně‑redukční / pražně‑reakční", eq:"2 PbO + PbS → 3 Pb + SO₂", proc:"aglomerace, šachtová pec",
  why:"Zajímavost: po částečném pražení stačí přívod vzduchu uzavřít a zbylý sulfid zredukuje vzniklý oxid sám. Síra i kyslík odejdou společně jako SO₂."},
 {s:"Hg", min:"cinabarit (rumělka) HgS", typ:"sulfidická", geo:"chalkofilní", ox:"+II",
  met:"pouhé pražení", eq:"HgS + O₂ → Hg + SO₂", proc:"pražicí pec a kondenzátor par",
  why:"Rtuť je ušlechtilá (E° = +0,85 V) a její oxid je při teplotě pražení už nestálý. Kov proto vzniká rovnou, odchází jako pára a jen se zkondenzuje."},
 {s:"Sn", min:"kasiterit SnO₂", typ:"oxidická", geo:"litofilní", ox:"+IV",
  met:"redukce uhlíkem", eq:"SnO₂ + 2 C → Sn + 2 CO", proc:"plamenná nebo elektrická pec, 1300 °C",
  why:"Klasická karbotermická redukce. Surový cín obsahuje železo, které se odstraní tavením s SnCl₂ nebo elektrolyticky."},
 {s:"Ti", min:"ilmenit FeTiO₃ · rutil TiO₂", typ:"oxidická", geo:"litofilní", ox:"+IV",
  met:"Krollův postup", eq:"TiCl₄ + 2 Mg → Ti + 2 MgCl₂", proc:"chlorace TiO₂, destilace TiCl₄, redukce v argonu",
  why:"Uhlík by s titanem dal karbid TiC místo kovu. Oxid se proto převede na těkavý chlorid, ten se destilací vyčistí a teprve pak zredukuje hořčíkem."},
 {s:"Cr", min:"chromit FeCr₂O₄", typ:"oxidická (smíšený oxid)", geo:"litofilní", ox:"+III",
  met:"redukce uhlíkem / aluminotermie", eq:"Cr₂O₃ + 2 Al → 2 Cr + Al₂O₃", proc:"elektrická oblouková pec (ferrochrom)",
  why:"Pro ocelárnu stačí ferrochrom z chromitu a koksu — železo v rudě nevadí, do oceli stejně patří. Čistý chrom bez uhlíku dá až aluminotermie."},
 {s:"W",  min:"wolframit (Fe,Mn)WO₄ · scheelit CaWO₄", typ:"wolframany", geo:"litofilní", ox:"+VI",
  met:"redukce vodíkem", eq:"WO₃ + 3 H₂ → W + 3 H₂O", proc:"trubková pec, 1100 °C, prášek se pak slinuje",
  why:"S uhlíkem by vznikl karbid WC. Vodík je drahý, ale dá čistý kovový prášek — a wolfram má nejvyšší teplotu tání ze všech kovů (3422 °C), takže se netaví, jen slinuje."},
 {s:"Na", min:"halit NaCl · mořská voda", typ:"halogenidová", geo:"litofilní", ox:"+I",
  met:"tavná elektrolýza", eq:"2 NaCl → 2 Na + Cl₂", proc:"Downsova cela, 600 °C, přídavek CaCl₂",
  why:"E° = −2,71 V: z vodného roztoku se místo sodíku vyloučí vodík. Jediná cesta je tavenina, a i tam se přidává CaCl₂, aby se snížila teplota z 801 °C na zhruba 600 °C."},
 {s:"Mg", min:"magnezit MgCO₃ · dolomit · mořská voda", typ:"uhličitanová", geo:"litofilní", ox:"+II",
  met:"tavná elektrolýza / silikotermie", eq:"2 MgO + Si + 2 CaO → 2 Mg + Ca₂SiO₄", proc:"elektrolýza MgCl₂ nebo Pidgeonův proces za sníženého tlaku",
  why:"Uhlík by MgO zredukoval až kolem 2200 °C. Snížením tlaku se ale hořčík odvádí jako pára a rovnováha se posune — silikotermie pak funguje už při 1200 °C."},
 {s:"Au", min:"ryzí zlato v křemenné žíle nebo v náplavu", typ:"ryzí kov", geo:"siderofilní", ox:"0",
  met:"loužení a cementace", eq:"2 K[Au(CN)₂] + Zn → 2 Au + K₂[Zn(CN)₄]", proc:"kyanidové loužení, srážení zinkem",
  why:"Zlato se v přírodě vyskytuje jako kov — není co redukovat, jen oddělit od horniny. Rozpustí se jako kyanokomplex a pak se vysráží méně ušlechtilým zinkem."},
 {s:"Ag", min:"argentit Ag₂S · doprovod rud Pb a Cu", typ:"sulfidická / doprovodná", geo:"chalkofilní", ox:"+I, 0",
  met:"loužení a cementace, anodové kaly", eq:"Ag₂S + 4 KCN → 2 K[Ag(CN)₂] + K₂S", proc:"kyanidové loužení nebo zpracování kalů z rafinace mědi",
  why:"Většina stříbra se dnes získává jako vedlejší produkt: při elektrolytické rafinaci mědi se neoxiduje a spadne pod anodu jako anodový kal."},
 {s:"Ni", min:"pentlandit (Ni,Fe)₉S₈ · lateritové rudy", typ:"sulfidická", geo:"siderofilní", ox:"+II",
  met:"redukce a Mondův proces", eq:"Ni(CO)₄ → Ni + 4 CO", proc:"pražení, redukce, karbonylové čištění",
  why:"Nikl umí při 60 °C reagovat s oxidem uhelnatým na těkavý tetrakarbonyl. Ten se oddestiluje od nečistot a při 200 °C se rozloží zpátky na velmi čistý kovový prášek."},
 {s:"U",  min:"uraninit (smolinec) UO₂", typ:"oxidická", geo:"litofilní", ox:"+IV",
  met:"metalotermie", eq:"UF₄ + 2 Mg → U + 2 MgF₂", proc:"loužení, extrakce, převedení na fluorid, redukce",
  why:"Uran je velmi neušlechtilý a s uhlíkem dává karbid. Redukuje se proto hořčíkem nebo vápníkem z fluoridu, který se předtím vyčistí extrakcí."}
];
function R_(s){ for(var i=0;i<RUDY.length;i++){ if(RUDY[i].s===s) return RUDY[i]; } return null; }

/* ============================================================
   Ellinghamův diagram (zjednodušený)
   ΔG°(T) = ΔH° − T·ΔS°, vše přepočteno na 1 mol O₂, ΔH v kJ, ΔS v J·K⁻¹.
   Data z běžných termodynamických tabulek; fázové přechody zanedbány,
   proto jsou to přímky (skutečné čáry mají v bodech tání zlom).
   ============================================================ */
var ELL = [
 {id:"CO",   nm:"2 C + O₂ → 2 CO",              dH:-221.0, dS:178.7,  c:"var(--accent)", kov:false},
 {id:"CO2",  nm:"C + O₂ → CO₂",                 dH:-393.5, dS:2.9,    c:"var(--ink-3)",  kov:false},
 {id:"Ag2O", nm:"4 Ag + O₂ → 2 Ag₂O",           dH:-62.2,  dS:-133.0, c:"var(--cat4)",   kov:true, s:"Ag"},
 {id:"HgO",  nm:"2 Hg + O₂ → 2 HgO",            dH:-181.6, dS:-216.4, c:"var(--cat4)",   kov:true, s:"Hg"},
 {id:"Cu2O", nm:"4 Cu + O₂ → 2 Cu₂O",           dH:-337.2, dS:-151.8, c:"var(--cat4)",   kov:true, s:"Cu"},
 {id:"PbO",  nm:"2 Pb + O₂ → 2 PbO",            dH:-438.0, dS:-201.8, c:"var(--cat3)",   kov:true, s:"Pb"},
 {id:"NiO",  nm:"2 Ni + O₂ → 2 NiO",            dH:-479.4, dS:-189.0, c:"var(--cat3)",   kov:true, s:"Ni"},
 {id:"Fe2O3",nm:"4/3 Fe + O₂ → 2/3 Fe₂O₃",      dH:-549.5, dS:-183.3, c:"var(--exo)",    kov:true, s:"Fe"},
 {id:"FeO",  nm:"2 Fe + O₂ → 2 FeO",            dH:-544.0, dS:-138.3, c:"var(--exo)",    kov:true, s:"Fe"},
 {id:"SnO2", nm:"Sn + O₂ → SnO₂",               dH:-577.6, dS:-207.4, c:"var(--cat3)",   kov:true, s:"Sn"},
 {id:"ZnO",  nm:"2 Zn + O₂ → 2 ZnO",            dH:-701.0, dS:-201.0, c:"var(--cat2)",   kov:true, s:"Zn"},
 {id:"Cr2O3",nm:"4/3 Cr + O₂ → 2/3 Cr₂O₃",      dH:-759.8, dS:-182.8, c:"var(--cat2)",   kov:true, s:"Cr"},
 {id:"MnO",  nm:"2 Mn + O₂ → 2 MnO",            dH:-770.4, dS:-149.8, c:"var(--cat2)",   kov:true, s:"Mn"},
 {id:"SiO2", nm:"Si + O₂ → SiO₂",               dH:-910.7, dS:-182.5, c:"var(--cat1)",   kov:true, s:"Si"},
 {id:"TiO2", nm:"Ti + O₂ → TiO₂",               dH:-944.0, dS:-185.3, c:"var(--cat1)",   kov:true, s:"Ti"},
 {id:"Al2O3",nm:"4/3 Al + O₂ → 2/3 Al₂O₃",      dH:-1117.1,dS:-209.0, c:"var(--endo)",   kov:true, s:"Al"},
 {id:"MgO",  nm:"2 Mg + O₂ → 2 MgO",            dH:-1203.2,dS:-216.6, c:"var(--endo)",   kov:true, s:"Mg"},
 {id:"CaO",  nm:"2 Ca + O₂ → 2 CaO",            dH:-1269.8,dS:-212.2, c:"var(--endo)",   kov:true, s:"Ca"}
];
function ellG(e,T){ return e.dH - T*e.dS/1000; }           /* T v kelvinech, výsledek kJ·mol⁻¹ O₂ */
function ellCross(e){                                       /* teplota [°C], nad níž ji čára C→CO podleze */
  var CO = ELL[0];
  return (e.dH - CO.dH)*1000/(e.dS - CO.dS) - 273.15;
}
