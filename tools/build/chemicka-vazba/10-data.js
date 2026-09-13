/* ============================================================
   2 · DATA — tabelované hodnoty
       EN … Paulingova elektronegativita (CRC / Atkins)
       délky vazeb v pm, vazebné energie v kJ·mol⁻¹ (průměrné, plyn)
       dipólové momenty v debye (1 D = 3,336·10⁻³⁰ C·m)
       teploty v °C
   ============================================================ */
var EN = {
  H:2.20, Li:0.98, Be:1.57, B:2.04, C:2.55, N:3.04, O:3.44, F:3.98,
  Na:0.93, Mg:1.31, Al:1.61, Si:1.90, P:2.19, S:2.58, Cl:3.16,
  K:0.82, Ca:1.00, Ti:1.54, Cr:1.66, Mn:1.55, Fe:1.83, Co:1.88, Ni:1.91, Cu:1.90, Zn:1.65,
  Ga:1.81, Ge:2.01, As:2.18, Se:2.55, Br:2.96, Kr:3.00,
  Rb:0.82, Sr:0.95, Ag:1.93, Cd:1.69, Sn:1.96, Sb:2.05, Te:2.10, I:2.66, Xe:2.60,
  Cs:0.79, Ba:0.89, W:2.36, Pt:2.28, Au:2.54, Hg:2.00, Pb:2.33, Bi:2.02
};
/* pořadí a názvy pro tabulku elektronegativit */
var EN_LIST = [
  ["H","vodík",1,1],["Li","lithium",2,1],["Be","beryllium",2,2],["B","bor",2,13],["C","uhlík",2,14],["N","dusík",2,15],["O","kyslík",2,16],["F","fluor",2,17],
  ["Na","sodík",3,1],["Mg","hořčík",3,2],["Al","hliník",3,13],["Si","křemík",3,14],["P","fosfor",3,15],["S","síra",3,16],["Cl","chlor",3,17],
  ["K","draslík",4,1],["Ca","vápník",4,2],["Ti","titan",4,4],["Cr","chrom",4,6],["Mn","mangan",4,7],["Fe","železo",4,8],["Co","kobalt",4,9],["Ni","nikl",4,10],["Cu","měď",4,11],["Zn","zinek",4,12],
  ["Ga","gallium",4,13],["Ge","germanium",4,14],["As","arsen",4,15],["Se","selen",4,16],["Br","brom",4,17],["Kr","krypton",4,18],
  ["Rb","rubidium",5,1],["Sr","stroncium",5,2],["Ag","stříbro",5,11],["Cd","kadmium",5,12],["Sn","cín",5,14],["Sb","antimon",5,15],["Te","tellur",5,16],["I","jod",5,17],["Xe","xenon",5,18],
  ["Cs","cesium",6,1],["Ba","baryum",6,2],["W","wolfram",6,6],["Pt","platina",6,10],["Au","zlato",6,11],["Hg","rtuť",6,12],["Pb","olovo",6,14],["Bi","bismut",6,15]
];

/* dvojice atomů pro hero (a, b) — b je elektronegativnější */
var PAIRS = [
  {a:"H",b:"H",lab:"H–H",note:"nepolární molekula vodíku"},
  {a:"C",b:"C",lab:"C–C",note:"páteř organických řetězců"},
  {a:"C",b:"H",lab:"C–H",note:"prakticky nepolární — proto jsou uhlovodíky nepolární"},
  {a:"H",b:"S",lab:"S–H",note:"skoro nepolární; sulfan netvoří vodíkové můstky"},
  {a:"C",b:"N",lab:"C–N",note:"slabě polární"},
  {a:"C",b:"Cl",lab:"C–Cl",note:"slabě polární, ale slabá vazba (328 kJ/mol)"},
  {a:"H",b:"Br",lab:"H–Br",note:"polární kovalentní"},
  {a:"N",b:"H",lab:"N–H",note:"polární — proto amoniak tvoří vodíkové můstky"},
  {a:"C",b:"O",lab:"C–O",note:"polární; kyslík nese δ−"},
  {a:"H",b:"Cl",lab:"H–Cl",note:"polární kovalentní, ≈ 18–20 % iontového charakteru"},
  {a:"O",b:"H",lab:"O–H",note:"silně polární — voda, alkoholy, kyseliny"},
  {a:"C",b:"F",lab:"C–F",note:"nejpolárnější vazba uhlíku"},
  {a:"Si",b:"O",lab:"Si–O",note:"křemen: kovalentní s velkým iontovým příspěvkem"},
  {a:"H",b:"F",lab:"H–F",note:"hraniční případ — nejpolárnější kovalentní vazba"},
  {a:"Al",b:"O",lab:"Al–O",note:"na hranici; Al₂O₃ počítáme mezi iontové"},
  {a:"Mg",b:"O",lab:"Mg–O",note:"iontová, dvojnásobné náboje → obrovská mřížková energie"},
  {a:"Na",b:"Cl",lab:"Na–Cl",note:"učebnicová iontová vazba"},
  {a:"K",b:"Cl",lab:"K–Cl",note:"iontová"},
  {a:"Ca",b:"O",lab:"Ca–O",note:"iontová"},
  {a:"Li",b:"F",lab:"Li–F",note:"iontová, nejmenší ionty → vysoká mřížková energie"},
  {a:"K",b:"F",lab:"K–F",note:"silně iontová"},
  {a:"Cs",b:"F",lab:"Cs–F",note:"nejiontovější vazba vůbec"}
];

/* Morseovy křivky diatomických molekul: De [kJ/mol], re [pm], a [pm⁻¹] */
var MORSE = [
  {f:"H₂",  De:436,  re:74,  a:0.0194, sig:"s–s"},
  {f:"HF",  De:567,  re:92,  a:0.0222, sig:"s–p"},
  {f:"HCl", De:431,  re:127, a:0.0187, sig:"s–p"},
  {f:"N₂",  De:945,  re:110, a:0.0269, sig:"1 σ + 2 π"},
  {f:"O₂",  De:498,  re:121, a:0.0266, sig:"1 σ + 1 π"},
  {f:"CO",  De:1072, re:113, a:0.0230, sig:"1 σ + 2 π"},
  {f:"F₂",  De:155,  re:142, a:0.0290, sig:"p–p"},
  {f:"Cl₂", De:243,  re:199, a:0.0201, sig:"p–p"},
  {f:"I₂",  De:151,  re:267, a:0.0186, sig:"p–p"}
];

/* látky podle typu vazby / mřížky
   typ: kov | ion | atom | mol | (mol+H = molekulová s vodíkovými vazbami) | vrstva
   vod: [pevná, tavenina, roztok]  ("ano"/"ne"/"—")                          */
var SUBST = [
  {n:"sodík",           f:"Na",        typ:"kov",  mt:"kovová (krychlová)",           bt:97.8,   bv:883,   vod:["ano","ano","—"],       tv:"měkký (nůž), kujný",       roz:"reaguje s vodou"},
  {n:"měď",             f:"Cu",        typ:"kov",  mt:"kovová (kubická plošně centr.)",bt:1085,  bv:2562,  vod:["ano","ano","—"],       tv:"kujná, tažná",             roz:"nerozpustná"},
  {n:"železo",          f:"Fe",        typ:"kov",  mt:"kovová",                       bt:1538,   bv:2862,  vod:["ano","ano","—"],       tv:"pevné, kujné za tepla",    roz:"nerozpustné"},
  {n:"hliník",          f:"Al",        typ:"kov",  mt:"kovová",                       bt:660,    bv:2519,  vod:["ano","ano","—"],       tv:"měkký, tažný",             roz:"nerozpustný"},
  {n:"wolfram",         f:"W",         typ:"kov",  mt:"kovová (nejpevnější)",         bt:3422,   bv:5555,  vod:["ano","ano","—"],       tv:"velmi tvrdý, křehčí",      roz:"nerozpustný"},
  {n:"rtuť",            f:"Hg",        typ:"kov",  mt:"kovová (kapalina!)",           bt:-38.8,  bv:356.7, vod:["ano","ano","—"],       tv:"kapalná",                  roz:"nerozpustná"},
  {n:"zlato",           f:"Au",        typ:"kov",  mt:"kovová",                       bt:1064,   bv:2856,  vod:["ano","ano","—"],       tv:"nejkujnější kov",          roz:"nerozpustné"},
  {n:"chlorid sodný",   f:"NaCl",      typ:"ion",  mt:"iontová, KČ 6",                bt:801,    bv:1413,  vod:["ne","ano","ano"],      tv:"tvrdý, křehký",            roz:"359 g/L"},
  {n:"oxid hořečnatý",  f:"MgO",       typ:"ion",  mt:"iontová, KČ 6 (2+/2−)",        bt:2852,   bv:3600,  vod:["ne","ano","—"],        tv:"velmi tvrdý, křehký",      roz:"prakticky nerozpustný"},
  {n:"fluorid vápenatý",f:"CaF₂",      typ:"ion",  mt:"iontová (kazivec)",            bt:1418,   bv:2533,  vod:["ne","ano","—"],        tv:"tvrdý, křehký",            roz:"0,016 g/L"},
  {n:"bromid draselný", f:"KBr",       typ:"ion",  mt:"iontová, KČ 6",                bt:734,    bv:1435,  vod:["ne","ano","ano"],      tv:"křehký",                   roz:"678 g/L"},
  {n:"chlorid draselný",f:"KCl",       typ:"ion",  mt:"iontová, KČ 6",                bt:770,    bv:1420,  vod:["ne","ano","ano"],      tv:"křehký",                   roz:"355 g/L"},
  {n:"oxid hlinitý",    f:"Al₂O₃",     typ:"ion",  mt:"iontová s kovalentním podílem",bt:2072,   bv:2977,  vod:["ne","ano","—"],        tv:"korund: tvrdost 9",        roz:"nerozpustný"},
  {n:"hydroxid sodný",  f:"NaOH",      typ:"ion",  mt:"iontová (OH⁻ je kovalentní ion)",bt:318,  bv:1388,  vod:["ne","ano","ano"],      tv:"křehký, hygroskopický",    roz:"1000 g/L"},
  {n:"diamant",         f:"C",         typ:"atom", mt:"atomová (kovalentní), 3D síť", bt:3550,   bv:4827,  vod:["ne","—","—"],          tv:"nejtvrdší látka (10)",     roz:"nerozpustný"},
  {n:"křemen",          f:"SiO₂",      typ:"atom", mt:"atomová, 3D síť Si–O",         bt:1710,   bv:2230,  vod:["ne","ne","—"],         tv:"tvrdý (7), křehký",        roz:"nerozpustný"},
  {n:"karbid křemíku",  f:"SiC",       typ:"atom", mt:"atomová, 3D síť",              bt:2730,   bv:null,  vod:["ne","—","—"],          tv:"velmi tvrdý (9,5)",        roz:"nerozpustný"},
  {n:"grafit",          f:"C",         typ:"vrstva",mt:"vrstevnatá: kovalentní vrstvy + disperzní síly",bt:3650,bv:null,vod:["ano (ve vrstvě)","—","—"],tv:"měkký, mazlavý",roz:"nerozpustný"},
  {n:"voda",            f:"H₂O",       typ:"molH", mt:"molekulová + vodíkové vazby",  bt:0,      bv:100,   vod:["ne","ne (prakticky)","—"],tv:"měkký led",              roz:"—"},
  {n:"amoniak",         f:"NH₃",       typ:"molH", mt:"molekulová + vodíkové vazby",  bt:-77.7,  bv:-33.3, vod:["ne","ne","—"],         tv:"plyn",                     roz:"velmi dobře (dipól + H-vazby)"},
  {n:"fluorovodík",     f:"HF",        typ:"molH", mt:"molekulová + silné H-vazby",   bt:-83.6,  bv:19.5,  vod:["ne","ne","ano (disociace)"],tv:"plyn/kapalina",       roz:"neomezeně"},
  {n:"ethanol",         f:"C₂H₅OH",    typ:"molH", mt:"molekulová + vodíkové vazby",  bt:-114.1, bv:78.4,  vod:["ne","ne","ne"],        tv:"kapalina",                 roz:"neomezeně"},
  {n:"sacharóza",       f:"C₁₂H₂₂O₁₁", typ:"molH", mt:"molekulová + vodíkové vazby",  bt:186,    bv:null,  vod:["ne","—","ne"],         tv:"měkká, drolivá",           roz:"2000 g/L"},
  {n:"glycerol",        f:"C₃H₈O₃",    typ:"molH", mt:"molekulová, 3 skupiny OH",     bt:17.8,   bv:290,   vod:["ne","ne","ne"],        tv:"viskózní kapalina",        roz:"neomezeně"},
  {n:"methan",          f:"CH₄",       typ:"mol",  mt:"molekulová, jen disperzní síly",bt:-182.5, bv:-161.5,vod:["ne","ne","—"],         tv:"plyn",                     roz:"nepatrně"},
  {n:"jod",             f:"I₂",        typ:"mol",  mt:"molekulová, disperzní síly",   bt:113.7,  bv:184.4, vod:["ne","ne","—"],         tv:"měkký, sublimuje",         roz:"0,3 g/L (dobře v CCl₄)"},
  {n:"oxid uhličitý",   f:"CO₂",       typ:"mol",  mt:"molekulová (suchý led)",       bt:-56.6,  bv:-78.5, vod:["ne","ne","—"],         tv:"měkký, sublimuje",         roz:"1,7 g/L (slabě)"},
  {n:"chlorovodík",     f:"HCl",       typ:"mol",  mt:"molekulová, dipól–dipól",      bt:-114.2, bv:-85.0, vod:["ne","ne","ano (disociace)"],tv:"plyn",                roz:"720 g/L"},
  {n:"benzen",          f:"C₆H₆",      typ:"mol",  mt:"molekulová, disperzní síly",   bt:5.5,    bv:80.1,  vod:["ne","ne","—"],         tv:"kapalina",                 roz:"1,8 g/L (nemísí se)"},
  {n:"chlorid uhličitý",f:"CCl₄",      typ:"mol",  mt:"molekulová, nepolární",        bt:-22.9,  bv:76.7,  vod:["ne","ne","—"],         tv:"kapalina",                 roz:"nerozpustný"},
  {n:"naftalen",        f:"C₁₀H₈",     typ:"mol",  mt:"molekulová, disperzní síly",   bt:80.3,   bv:218,   vod:["ne","ne","—"],         tv:"měkký, sublimuje",         roz:"nerozpustný"},
  {n:"síra",            f:"S₈",        typ:"mol",  mt:"molekulová (kruhy S₈)",        bt:115.2,  bv:444.6, vod:["ne","ne","—"],         tv:"měkká, křehká",            roz:"nerozpustná"},
  {n:"helium",          f:"He",        typ:"mol",  mt:"atomy, jen disperzní síly",    bt:-272.2, bv:-268.9,vod:["ne","ne","—"],         tv:"plyn",                     roz:"nepatrně"},
  {n:"argon",           f:"Ar",        typ:"mol",  mt:"atomy, jen disperzní síly",    bt:-189.3, bv:-185.8,vod:["ne","ne","—"],         tv:"plyn",                     roz:"nepatrně"}
];
var TYPNAME = {kov:"kovová", ion:"iontová", atom:"kovalentní · atomový krystal", mol:"kovalentní · molekulová", molH:"kovalentní · molekulová + H-vazby", vrstva:"kovalentní · vrstevnatá"};
var TYPCOL  = {kov:"var(--cat3)", ion:"var(--cat4)", atom:"var(--cat1)", mol:"var(--cat2)", molH:"var(--cat2)", vrstva:"var(--cat1)"};

/* kovy: teplota tání, atomizační enthalpie [kJ/mol], el. vodivost [10⁷ S/m], tepelná vodivost [W/m/K] */
var METALS = [
  {f:"Ag", n:"stříbro", bt:962,  at:285, el:6.30, th:429},
  {f:"Cu", n:"měď",     bt:1085, at:338, el:5.96, th:401},
  {f:"Au", n:"zlato",   bt:1064, at:368, el:4.10, th:318},
  {f:"Al", n:"hliník",  bt:660,  at:330, el:3.77, th:237},
  {f:"Na", n:"sodík",   bt:97.8, at:107, el:2.10, th:141},
  {f:"W",  n:"wolfram", bt:3422, at:849, el:1.79, th:173},
  {f:"Fe", n:"železo",  bt:1538, at:416, el:1.00, th:80},
  {f:"Pb", n:"olovo",   bt:327.5,at:195, el:0.48, th:35},
  {f:"Hg", n:"rtuť",    bt:-38.8,at:61,  el:0.10, th:8.3}
];

/* ionty: poloměr [pm] (Shannon, KČ 6) a náboj */
var CATIONS = [
  {f:"Li⁺",r:76,z:1},{f:"Na⁺",r:102,z:1},{f:"K⁺",r:138,z:1},{f:"Rb⁺",r:152,z:1},{f:"Cs⁺",r:167,z:1},
  {f:"Mg²⁺",r:72,z:2},{f:"Ca²⁺",r:100,z:2},{f:"Sr²⁺",r:118,z:2},{f:"Ba²⁺",r:135,z:2}
];
var ANIONS = [
  {f:"F⁻",r:133,z:1},{f:"Cl⁻",r:181,z:1},{f:"Br⁻",r:196,z:1},{f:"I⁻",r:220,z:1},{f:"O²⁻",r:140,z:2},{f:"S²⁻",r:184,z:2}
];
/* tabelované mřížkové energie (kladně, kJ/mol) a teploty tání (°C) */
var LATT = {
  "Li⁺F⁻":[1037,848],"Li⁺Cl⁻":[853,605],"Li⁺Br⁻":[807,550],"Li⁺I⁻":[757,469],
  "Na⁺F⁻":[923,993],"Na⁺Cl⁻":[787,801],"Na⁺Br⁻":[747,747],"Na⁺I⁻":[704,661],
  "K⁺F⁻":[821,858],"K⁺Cl⁻":[715,770],"K⁺Br⁻":[682,734],"K⁺I⁻":[649,681],
  "Rb⁺F⁻":[785,795],"Rb⁺Cl⁻":[689,718],"Rb⁺Br⁻":[660,693],"Rb⁺I⁻":[630,647],
  "Cs⁺F⁻":[740,682],"Cs⁺Cl⁻":[659,645],"Cs⁺Br⁻":[631,636],"Cs⁺I⁻":[604,626],
  "Mg²⁺O²⁻":[3791,2852],"Ca²⁺O²⁻":[3401,2613],"Sr²⁺O²⁻":[3223,2531],"Ba²⁺O²⁻":[3054,1923],
  "Mg²⁺S²⁻":[3254,2000],"Ca²⁺S²⁻":[3013,2525],
  "Mg²⁺F⁻":[2957,1263],"Ca²⁺F⁻":[2630,1418],"Sr²⁺F⁻":[2492,1477],"Ba²⁺F⁻":[2352,1368],
  "Mg²⁺Cl⁻":[2526,714],"Ca²⁺Cl⁻":[2258,775],"Ba²⁺Cl⁻":[2056,962],
  "Li⁺O²⁻":[2799,1438],"Na⁺O²⁻":[2481,1132],"K⁺O²⁻":[2238,740]
};

/* Lewisovy vzorce: val = valenční elektrony celkem, bp = vazebné páry, lp = volné páry (celkem),
   okt: "ok" | "méně" | "více" | "radikál"; geometrie VSEPR jen jako text */
var LEWIS = [
  {f:"H₂",   val:2,  bp:1, lp:0, okt:"ok",    c:"H", note:"Dva elektrony = dublet. Vodík plní 1s, ne oktet.", geo:"lineární", vaz:"H: 1"},
  {f:"Cl₂",  val:14, bp:1, lp:6, okt:"ok",    c:"Cl",note:"Každý chlor má 3 volné páry a 1 vazebný — dohromady 8.", geo:"lineární", vaz:"Cl: 1"},
  {f:"O₂",   val:12, bp:2, lp:4, okt:"ok",    c:"O", note:"Dvojná vazba O=O; každý kyslík 2 volné páry. (Skutečný O₂ je biradikál — to Lewisův vzorec nezachytí.)", geo:"lineární", vaz:"O: 2"},
  {f:"N₂",   val:10, bp:3, lp:2, okt:"ok",    c:"N", note:"Trojná vazba N≡N, po jednom volném páru. 945 kJ/mol.", geo:"lineární", vaz:"N: 3"},
  {f:"H₂O",  val:8,  bp:2, lp:2, okt:"ok",    c:"O", note:"2 vazebné + 2 volné páry na kyslíku → lomená molekula (104,5°).", geo:"lomená", vaz:"O: 2, H: 1"},
  {f:"NH₃",  val:8,  bp:3, lp:1, okt:"ok",    c:"N", note:"Volný pár na dusíku je klíč k dativní vazbě (NH₄⁺) i k zásaditosti.", geo:"trigonální pyramida", vaz:"N: 3, H: 1"},
  {f:"CH₄",  val:8,  bp:4, lp:0, okt:"ok",    c:"C", note:"Čtyři rovnocenné σ vazby, tetraedr 109,5°.", geo:"tetraedr", vaz:"C: 4, H: 1"},
  {f:"CO₂",  val:16, bp:4, lp:4, okt:"ok",    c:"C", note:"Dvě dvojné vazby O=C=O; lineární, nepolární molekula.", geo:"lineární", vaz:"C: 4, O: 2"},
  {f:"HCN",  val:10, bp:4, lp:1, okt:"ok",    c:"C", note:"H–C≡N: jedna jednoduchá, jedna trojná vazba.", geo:"lineární", vaz:"C: 4, N: 3, H: 1"},
  {f:"BF₃",  val:24, bp:3, lp:9, okt:"méně",  c:"B", note:"Bor má jen 6 elektronů — elektronový deficit. Proto je BF₃ Lewisova kyselina a ochotně přijme volný pár.", geo:"trigonální rovina", vaz:"B: 3, F: 1"},
  {f:"BeCl₂",val:16, bp:2, lp:6, okt:"méně",  c:"Be",note:"Beryllium má jen 4 elektrony (v plynné fázi). Lineární molekula.", geo:"lineární", vaz:"Be: 2, Cl: 1"},
  {f:"PCl₅", val:40, bp:5, lp:15,okt:"více",  c:"P", note:"Fosfor má 10 elektronů — od 3. periody je k dispozici i d-orbital (rozšířený oktet).", geo:"trigonální bipyramida", vaz:"P: 5, Cl: 1"},
  {f:"SF₆",  val:48, bp:6, lp:18,okt:"více",  c:"S", note:"Síra má 12 elektronů. Oktaedr, dokonale symetrický, nepolární a mimořádně inertní plyn.", geo:"oktaedr", vaz:"S: 6, F: 1"},
  {f:"NO",   val:11, bp:2, lp:2, okt:"radikál",c:"N",note:"Lichý počet elektronů (11) — nepárový elektron, radikál. Oktet nelze splnit; NO je reaktivní.", geo:"lineární", vaz:"N: 2, O: 2"},
  {f:"NO₂",  val:17, bp:3, lp:5, okt:"radikál",c:"N",note:"17 elektronů, radikál; proto dimerizuje na N₂O₄.", geo:"lomená", vaz:"N: 3"},
  {f:"SO₂",  val:18, bp:3, lp:6, okt:"ok",    c:"S", note:"Lomená, s volným párem na síře → polární (μ = 1,63 D).", geo:"lomená", vaz:"S: 4 (formálně)"},
  {f:"H₃O⁺", val:8,  bp:3, lp:1, okt:"ok",    c:"O", note:"Vznikl z H₂O přijetím H⁺ do volného páru — třetí vazba je dativní, po vzniku nerozeznatelná.", geo:"trigonální pyramida", vaz:"O: 3"},
  {f:"NH₄⁺", val:8,  bp:4, lp:0, okt:"ok",    c:"N", note:"Čtyři rovnocenné vazby N–H, tetraedr — přesně jako methan.", geo:"tetraedr", vaz:"N: 4"}
];

/* násobnost: délka [pm], energie [kJ/mol] */
var BONDMULT = [
  {g:"C–C", rows:[["C–C",154,348],["C=C",134,614],["C≡C",120,839]]},
  {g:"N–N", rows:[["N–N",145,163],["N=N",125,418],["N≡N",110,945]]},
  {g:"C–O", rows:[["C–O",143,358],["C=O",120,799],["C≡O",113,1072]]},
  {g:"O–O", rows:[["O–O",148,146],["O=O",121,498]]},
  {g:"C–N", rows:[["C–N",147,293],["C=N",128,615],["C≡N",116,891]]}
];
/* vazby pro tabulku délek a energií (jednoduché) */
var BONDS1 = [
  ["H–H",74,436],["H–F",92,567],["H–Cl",127,431],["H–Br",141,366],["H–I",161,299],
  ["O–H",96,463],["N–H",101,391],["C–H",109,413],["S–H",134,339],
  ["F–F",142,155],["Cl–Cl",199,243],["Br–Br",228,193],["I–I",267,151],
  ["C–F",135,485],["C–Cl",177,328],["C–Br",194,276],["C–I",214,240],["Si–O",163,452]
];

/* dipólové momenty dvouatomových molekul: μ [D], d [pm] → parciální náboj */
var DIPOLES = [
  {f:"HF",  mu:1.83, d:92,  dEN:1.78, ic:54.7},
  {f:"HCl", mu:1.08, d:127, dEN:0.96, ic:20.6},
  {f:"HBr", mu:0.83, d:141, dEN:0.76, ic:13.4},
  {f:"HI",  mu:0.45, d:161, dEN:0.46, ic:5.2},
  {f:"CO",  mu:0.11, d:113, dEN:0.89, ic:18.0},
  {f:"ClF", mu:0.89, d:163, dEN:0.82, ic:15.5},
  {f:"LiH", mu:5.88, d:160, dEN:1.22, ic:31.1},
  {f:"NaCl(g)",mu:9.00,d:236,dEN:2.23,ic:71.2},
  {f:"KF(g)",  mu:8.59,d:217,dEN:3.16,ic:91.8},
  {f:"CsF(g)", mu:7.88,d:235,dEN:3.19,ic:92.1}
];

/* molekuly pro rozhodovač polarity: tvar, vektory vazeb (úhel ve stupních, délka relativní, popisek), μ [D] */
var POLMOL = [
  {f:"H₂",   mu:0,    geo:"lineární", pol:false, cen:"H", at:[["H",0,1]], dEN:0,   why:"Dva stejné atomy — ΔEN = 0, vazba nepolární, molekula nepolární."},
  {f:"HCl",  mu:1.08, geo:"lineární", pol:true,  cen:"H", at:[["Cl",0,1]], dEN:0.96, why:"Jediná polární vazba — nemá ji co vyrušit."},
  {f:"HF",   mu:1.83, geo:"lineární", pol:true,  cen:"H", at:[["F",0,1]], dEN:1.78, why:"Nejpolárnější dvouatomová molekula."},
  {f:"CO",   mu:0.11, geo:"lineární", pol:true,  cen:"C", at:[["O",0,1]], dEN:0.89, why:"Polární vazba, ale malý μ — trojná vazba a volný pár na uhlíku dipól skoro vyruší."},
  {f:"CO₂",  mu:0,    geo:"lineární", pol:false, cen:"C", at:[["O",0,1],["O",180,1]], dEN:0.89, why:"Dvě polární vazby C=O míří přesně proti sobě → vektorový součet nula."},
  {f:"BeCl₂",mu:0,    geo:"lineární", pol:false, cen:"Be",at:[["Cl",0,1],["Cl",180,1]], dEN:1.59, why:"Lineární, symetrická — dipóly se vyruší."},
  {f:"H₂O",  mu:1.85, geo:"lomená (104,5°)", pol:true, cen:"O", at:[["H",232,0.8],["H",308,0.8]], dEN:1.24, inv:true, why:"Lomený tvar — dipóly O–H se sčítají do výsledného vektoru podél osy molekuly."},
  {f:"H₂S",  mu:0.97, geo:"lomená (92°)", pol:true, cen:"S", at:[["H",224,0.8],["H",316,0.8]], dEN:0.38, inv:true, why:"Lomený tvar, ale vazby S–H jsou jen slabě polární → malý μ."},
  {f:"SO₂",  mu:1.63, geo:"lomená (119°)", pol:true, cen:"S", at:[["O",240,1],["O",300,1]], dEN:0.86, why:"Lomená molekula s volným párem na síře → polární. Neplést s lineárním CO₂!"},
  {f:"O₃",   mu:0.53, geo:"lomená (117°)", pol:true, cen:"O", at:[["O",240,1],["O",300,1]], dEN:0, why:"Stejné atomy, a přesto slabě polární — kvůli nesymetrickému rozložení elektronů (rezonance)."},
  {f:"NH₃",  mu:1.47, geo:"trigonální pyramida", pol:true, cen:"N", at:[["H",250,0.85],["H",290,0.85],["H",90,0.5]], dEN:0.84, inv:true, why:"Pyramida — tři vazby N–H míří „dolů“, volný pár nahoru. Výsledný dipól je nenulový."},
  {f:"BF₃",  mu:0,    geo:"trigonální rovina", pol:false, cen:"B", at:[["F",90,1],["F",210,1],["F",330,1]], dEN:1.94, why:"Tři velmi polární vazby, ale rovinný trojúhelník 120° — vektory se vyruší."},
  {f:"SO₃",  mu:0,    geo:"trigonální rovina", pol:false, cen:"S", at:[["O",90,1],["O",210,1],["O",330,1]], dEN:0.86, why:"Rovinná, symetrická — nepolární."},
  {f:"CH₄",  mu:0,    geo:"tetraedr", pol:false, cen:"C", at:[["H",90,0.9],["H",210,0.9],["H",330,0.9],["H",0,0]], dEN:0.35, why:"Tetraedr — čtyři slabé dipóly C–H se přesně vyruší."},
  {f:"CCl₄", mu:0,    geo:"tetraedr", pol:false, cen:"C", at:[["Cl",90,1],["Cl",210,1],["Cl",330,1],["Cl",0,0]], dEN:0.61, why:"Čtyři polární vazby C–Cl v tetraedru → nula. Nepolární rozpouštědlo."},
  {f:"CHCl₃",mu:1.04, geo:"tetraedr (nesymetrický)", pol:true, cen:"C", at:[["Cl",90,1],["Cl",210,1],["Cl",330,1],["H",0,0]], dEN:0.61, why:"Tři Cl a jeden H — symetrie porušena, dipól míří k trojici chlorů."},
  {f:"CH₃Cl",mu:1.87, geo:"tetraedr (nesymetrický)", pol:true, cen:"C", at:[["H",90,0.7],["H",210,0.7],["Cl",330,1],["H",0,0]], dEN:0.61, why:"Jeden Cl proti třem H — nic ho nevyruší; μ dokonce větší než u CHCl₃."},
  {f:"CH₂Cl₂",mu:1.60,geo:"tetraedr (nesymetrický)", pol:true, cen:"C", at:[["Cl",250,1],["Cl",290,1],["H",70,0.6],["H",110,0.6]], dEN:0.61, why:"Dva Cl na jedné straně — polární rozpouštědlo (dichlormethan)."},
  {f:"HCN",  mu:2.98, geo:"lineární", pol:true, cen:"C", at:[["N",0,1],["H",180,0.5]], dEN:0.49, why:"Lineární, ale nesymetrická: H–C≡N. Velký dipól k dusíku."},
  {f:"PCl₅", mu:0,    geo:"trigonální bipyramida", pol:false, cen:"P", at:[["Cl",90,1],["Cl",270,1],["Cl",0,0.9],["Cl",120,0.9],["Cl",240,0.9]], dEN:0.97, why:"Symetrická bipyramida — dipóly se vyruší."},
  {f:"SF₆",  mu:0,    geo:"oktaedr", pol:false, cen:"S", at:[["F",0,1],["F",90,1],["F",180,1],["F",270,1],["F",45,0.5],["F",225,0.5]], dEN:1.40, why:"Oktaedr, dokonalá symetrie — nepolární, i když vazby S–F jsou silně polární."},
  {f:"NF₃",  mu:0.23, geo:"trigonální pyramida", pol:true, cen:"N", at:[["F",250,0.9],["F",290,0.9],["F",90,0.5]], dEN:0.94, inv:false, why:"Pyramida jako NH₃, ale F táhne elektrony od dusíku — dipól vazeb jde proti dipólu volného páru, μ je malý."},
  {f:"CH₃OH",mu:1.70, geo:"tetraedr + lomená O–H", pol:true, cen:"C", at:[["O",330,1],["H",90,0.7],["H",210,0.7],["H",0,0]], dEN:0.89, why:"Skupina O–H je silně polární a nic ji nevyruší."}
];

/* trenažér polarity — dvojice [vzorec, polární?, vysvětlení] (mimo POLMOL i další) */
var POLDRILL = [
  ["CO₂",false,"Lineární O=C=O, dipóly vazeb míří proti sobě a vyruší se."],
  ["H₂O",true,"Lomená molekula, dipóly O–H se sčítají. μ = 1,85 D."],
  ["CCl₄",true?false:false,"Tetraedr, čtyři stejné polární vazby → vektorový součet nula."],
  ["CHCl₃",true,"Tetraedr s jedním H místo Cl — symetrie porušena, μ = 1,04 D."],
  ["NH₃",true,"Trigonální pyramida, volný pár nahoře, μ = 1,47 D."],
  ["BF₃",false,"Rovinný trojúhelník 120°, tři polární vazby se vyruší."],
  ["SO₂",true,"Lomená (volný pár na síře) → polární, μ = 1,63 D. Neplést s CO₂."],
  ["SO₃",false,"Rovinná, symetrická trojúhelníková molekula → nepolární."],
  ["HCl",true,"Jediná polární vazba, nic ji nevyruší."],
  ["Cl₂",false,"Dva stejné atomy, ΔEN = 0."],
  ["CH₄",false,"Tetraedr, dipóly C–H (a ty jsou samy o sobě nepatrné) se vyruší."],
  ["CH₃Cl",true,"Jeden Cl proti třem H — asymetrie, μ = 1,87 D."],
  ["HCN",true,"Lineární, ale nesymetrická H–C≡N, μ = 2,98 D."],
  ["PCl₅",false,"Trigonální bipyramida, symetrická → nepolární."],
  ["SF₆",false,"Oktaedr, dokonale symetrický → nepolární."],
  ["O₃",true,"Lomená; nesymetrické rozložení elektronů → slabý dipól 0,53 D."],
  ["N₂",false,"Homonukleární dvouatomová molekula."],
  ["H₂S",true,"Lomená jako voda, jen se slabšími dipóly (μ = 0,97 D)."],
  ["BeCl₂",false,"Lineární Cl–Be–Cl (plynná fáze) → dipóly se vyruší."],
  ["CH₃OH",true,"Skupina O–H dává molekule výrazný dipól (1,70 D)."],
  ["C₆H₆ (benzen)",false,"Rovinný, symetrický šestiúhelník → nepolární rozpouštědlo."],
  ["CS₂",false,"Lineární S=C=S, stejně jako CO₂ → nepolární."],
  ["PCl₃",true,"Trigonální pyramida s volným párem → polární (μ = 0,78 D)."],
  ["XeF₄",false,"Čtvercová rovina, symetrická → nepolární."]
];

/* koordinačně kovalentní vazba — příklady */
var DATIVE = [
  {k:"NH₄⁺", t:"Amonný kation", donor:"N v NH₃ (volný pár)", akc:"H⁺ (prázdný orbital 1s)",
   eq:"NH₃ + H⁺ → NH₄⁺", geo:"tetraedr, 4 rovnocenné vazby N–H",
   note:"Nejjednodušší příklad. Po vzniku nelze poznat, která z vazeb byla dativní — všechny čtyři mají stejnou délku 101 pm i energii. Kladný náboj je rozprostřen po celém iontu.",
   d:{L:"H₃N",R:"H⁺",prod:"[H₃N→H]⁺ = NH₄⁺"}},
  {k:"H₃O⁺", t:"Oxoniový kation", donor:"O v H₂O (jeden ze dvou volných párů)", akc:"H⁺",
   eq:"H₂O + H⁺ → H₃O⁺", geo:"trigonální pyramida",
   note:"Takhle vypadá „vodíkový kation ve vodě“. Volný H⁺ ve vodě neexistuje — vždy sedí na volném páru kyslíku. Kyselina je tedy látka, která umí H⁺ na vodu přenést.",
   d:{L:"H₂O",R:"H⁺",prod:"H₃O⁺"}},
  {k:"BF₃·NH₃", t:"Adukt fluoridu boritého a amoniaku", donor:"N v NH₃", akc:"B v BF₃ (jen 6 elektronů, prázdný p-orbital)",
   eq:"F₃B + NH₃ → F₃B←NH₃", geo:"oba atomy tetraedrické",
   note:"Učebnicová Lewisova acidobazická reakce: BF₃ je Lewisova kyselina (akceptor páru), NH₃ Lewisova zásada (donor). Bor tím dosáhne oktetu.",
   d:{L:"F₃B",R:"NH₃",prod:"F₃B←NH₃"}},
  {k:"[Cu(NH₃)₄]²⁺", t:"Tetraamminměďnatý kation", donor:"4× N v NH₃", akc:"Cu²⁺ (prázdné orbitaly d, s, p)",
   eq:"Cu²⁺ + 4 NH₃ → [Cu(NH₃)₄]²⁺", geo:"čtvercová rovina, koordinační číslo 4",
   note:"Tmavě modrý komplex — důkaz mědi. Centrální atom Cu²⁺, ligandy NH₃, koordinační číslo 4. Ligand musí mít volný elektronový pár.",
   d:{L:"Cu²⁺",R:"4 NH₃",prod:"[Cu(NH₃)₄]²⁺"}},
  {k:"[Fe(CN)₆]⁴⁻", t:"Hexakyanoželeznatan", donor:"6× C v CN⁻", akc:"Fe²⁺",
   eq:"Fe²⁺ + 6 CN⁻ → [Fe(CN)₆]⁴⁻", geo:"oktaedr, koordinační číslo 6",
   note:"Ligand CN⁻ se váže uhlíkem (ten nese volný pár a záporný náboj). Žlutá krevní sůl K₄[Fe(CN)₆]. Kyanid pevně vázaný v komplexu je netoxický — volný CN⁻ blokuje dýchací řetězec.",
   d:{L:"Fe²⁺",R:"6 CN⁻",prod:"[Fe(CN)₆]⁴⁻"}},
  {k:"[Ag(NH₃)₂]⁺", t:"Diamminstříbrný kation", donor:"2× N v NH₃", akc:"Ag⁺",
   eq:"Ag⁺ + 2 NH₃ → [Ag(NH₃)₂]⁺", geo:"lineární, koordinační číslo 2",
   note:"Tollensovo činidlo — důkaz aldehydů (stříbrné zrcátko). AgCl se v amoniaku rozpouští právě proto, že vzniká tento komplex.",
   d:{L:"Ag⁺",R:"2 NH₃",prod:"[Ag(NH₃)₂]⁺"}},
  {k:"Hb–CO", t:"Oxid uhelnatý na železe hemoglobinu", donor:"C v CO (volný pár na uhlíku)", akc:"Fe²⁺ v hemu",
   eq:"Hb–Fe²⁺ + CO → Hb–Fe²⁺←CO", geo:"oktaedr kolem Fe²⁺ (4 N hemu, 1 N histidinu, 1 CO nebo O₂)",
   note:"CO se váže na Fe²⁺ asi 200× pevněji než O₂ a blokuje tak přenos kyslíku — proto je otrava oxidem uhelnatým tak zákeřná (bez zápachu, bez barvy). Stejný typ vazby drží i O₂: dativní vazba je fyziologie dýchání.",
   d:{L:"Hb–Fe²⁺",R:"CO",prod:"Hb–Fe²⁺←C≡O"}}
];

/* síla interakcí — rozsah [min, max] kJ/mol, kategorie */
var FORCES = [
  {n:"kovalentní vazba",  lo:150, hi:1000, c:"var(--cat1)", ex:"I–I 151 · H–H 436 · N≡N 945"},
  {n:"iontová (mřížková)",lo:600, hi:4000, c:"var(--cat4)", ex:"CsI 604 · NaCl 787 · MgO 3791"},
  {n:"kovová (atomizace)",lo:60,  hi:850,  c:"var(--cat3)", ex:"Hg 61 · Na 107 · Cu 338 · W 849"},
  {n:"ion–dipól",         lo:40,  hi:600,  c:"var(--exo)",  ex:"Na⁺···H₂O ≈ 405 (celá hydratace)"},
  {n:"vodíková vazba",    lo:10,  hi:40,   c:"var(--accent)",ex:"O–H···O ve vodě ≈ 20 · F–H···F ≈ 29"},
  {n:"dipól–dipól",       lo:5,   hi:25,   c:"var(--cat2)", ex:"HCl···HCl ≈ 3–5 · aceton ≈ 10"},
  {n:"disperzní (London)",lo:0.05,hi:40,   c:"var(--endo)", ex:"He 0,08 · CH₄ 2 · I₂ ≈ 30 (na molekulu)"}
];

/* trenažér „která interakce převládá“ */
var FDRILL = [
  {p:"Na⁺ a H₂O (v roztoku)", a:"iondip", e:"Kation a polární molekula: kyslík vody (δ−) se natočí k Na⁺. To je hydratace, ion–dipólová interakce, řádově 100 kJ/mol na jednu vodu."},
  {p:"HCl a HCl (kapalný chlorovodík)", a:"dipdip", e:"HCl je polární molekula (μ = 1,08 D), ale vodíkové můstky netvoří — chlor je velký a málo elektronegativní. Zbývá dipól–dipól (plus disperzní)."},
  {p:"I₂ a I₂ (pevný jod)", a:"disp", e:"Nepolární molekuly, žádný dipól. Drží je jen disperzní síly — a protože I₂ má 106 elektronů a je snadno polarizovatelný, jsou dost silné na to, aby byl jod pevný."},
  {p:"CH₄ a CH₄ (kapalný methan)", a:"disp", e:"Methan je nepolární (tetraedr). Jen disperzní síly, a slabé — proto vře až při −161 °C."},
  {p:"C₂H₅OH a H₂O", a:"hb", e:"Ethanol má skupinu O–H a voda také → vodíkové můstky mezi oběma. Proto se ethanol mísí s vodou neomezeně."},
  {p:"NH₃ a NH₃ (kapalný amoniak)", a:"hb", e:"N–H···N — dusík je dost elektronegativní a má volný pár. Vodíkové můstky (slabší než u vody) zvedají b.v. na −33 °C, zatímco PH₃ vře při −88 °C."},
  {p:"Ar a Ar (kapalný argon)", a:"disp", e:"Atomy vzácného plynu: bez dipólu, bez vazeb. Jen disperzní síly — čím větší atom, tím silnější (He −269 °C, Xe −108 °C)."},
  {p:"K⁺ a Cl⁻ v krystalu KCl", a:"ion", e:"Dva opačně nabité ionty v mřížce — to už není slabá interakce, ale iontová vazba (mřížková energie 715 kJ/mol). Osnova ji formálně řadí k „ion–ion“ interakcím."},
  {p:"dva řetězce DNA", a:"hb", e:"Komplementární báze A=T (2) a G≡C (3) drží pohromadě vodíkové můstky — dost pevné, aby šroubovice držela, dost slabé, aby se dala při replikaci rozplést."},
  {p:"CO₂ a CO₂ (suchý led)", a:"disp", e:"CO₂ je nepolární (lineární). Jen disperzní síly → suchý led sublimuje už při −78 °C."},
  {p:"HF a HF (kapalný fluorovodík)", a:"hb", e:"F–H···F — nejsilnější běžný vodíkový můstek (≈ 29 kJ/mol). Proto HF vře při +20 °C, zatímco HCl při −85 °C."},
  {p:"Cl⁻ a H₂O (v roztoku)", a:"iondip", e:"Anion a polární voda: tentokrát se k Cl⁻ natočí vodíky (δ+). Hydratace aniontu."},
  {p:"aceton (CH₃)₂CO a aceton", a:"dipdip", e:"Aceton má silný dipól (2,88 D) díky C=O, ale nemá vodík na O nebo N → žádné vlastní vodíkové můstky. Dipól–dipól."},
  {p:"vrstvy grafitu", a:"disp", e:"Uvnitř vrstvy kovalentní vazby, mezi vrstvami jen disperzní síly — proto se vrstvy snadno posouvají (tuha, mazivo)."}
];
var FNAMES = {ion:"ion–ion (iontová vazba)", iondip:"ion–dipól", hb:"vodíková vazba", dipdip:"dipól–dipól", disp:"disperzní (Londonovy) síly"};

/* teploty varu hydridů [°C] podle skupin — perioda 2 až 5 */
var BP = {
  "17":{lab:"Halogenovodíky (17. sk.)", rows:[["HF",19.5],["HCl",-85.0],["HBr",-66.8],["HI",-35.4]], hb:"HF", note:"HF vře o 100 °C výš, než by vycházelo z trendu — vodíkové můstky F–H···F. Od HCl k HI b.v. roste: větší molekula = větší polarizovatelnost = silnější disperzní síly."},
  "16":{lab:"Hydridy 16. skupiny", rows:[["H₂O",100],["H₂S",-60.3],["H₂Se",-41.3],["H₂Te",-2.2]], hb:"H₂O", note:"Nejkřiklavější anomálie: bez vodíkových můstků by voda vřela kolem −80 °C a na Zemi by nebyl oceán. Každá molekula vody tvoří až 4 můstky."},
  "15":{lab:"Hydridy 15. skupiny", rows:[["NH₃",-33.3],["PH₃",-87.7],["AsH₃",-62.5],["SbH₃",-17.0]], hb:"NH₃", note:"Amoniak vybočuje méně než voda — N–H···N je slabší než O–H···O a NH₃ má jen jeden volný pár (tvoří v průměru méně můstků)."},
  "14":{lab:"Hydridy 14. skupiny", rows:[["CH₄",-161.5],["SiH₄",-111.8],["GeH₄",-88.5],["SnH₄",-52.0]], hb:null, note:"Žádná anomálie: uhlík není dost elektronegativní a nemá volný pár, methan vodíkové můstky netvoří. Čistý trend disperzních sil — b.v. roste s velikostí molekuly."},
  "18":{lab:"Vzácné plyny", rows:[["Ne",-246.0],["Ar",-185.8],["Kr",-153.4],["Xe",-108.1]], hb:null, note:"Jednoatomové, nepolární — jen disperzní síly. Krásně ukazují, že disperzní síly rostou s počtem elektronů (polarizovatelností)."},
  "halo":{lab:"Halogeny X₂", rows:[["F₂",-188.1],["Cl₂",-34.0],["Br₂",58.8],["I₂",184.4]], hb:null, note:"Nepolární molekuly, jen disperzní síly: F₂ a Cl₂ plyny, Br₂ kapalina, I₂ pevná látka. Se 106 elektrony je I₂ mnohem polarizovatelnější než F₂ s 18."}
};

/* vodíkové můstky v praxi — scény */
var HBSCENES = {
  voda:{t:"Voda: tetraedrická síť můstků", pts:[
    "Každá molekula H₂O má 2 vodíky (donory) a 2 volné páry (akceptory) → až <b>4 můstky</b> na molekulu, tetraedricky.",
    "<b>Led je méně hustý než voda</b> (0,917 g/cm³): v ledu je síť můstků pravidelná a „řídká“, při tání se část zbortí a molekuly se nahustí. Proto led plave a rybníky nezamrzají ode dna.",
    "<b>Vysoká teplota varu</b> (100 °C místo ≈ −80 °C), <b>velké výparné teplo</b> (40,7 kJ/mol) a <b>vysoká tepelná kapacita</b> (4,18 J/g/K) — na roztržení můstků je potřeba energie; oceány proto vyrovnávají klima.",
    "<b>Povrchové napětí</b> (72 mN/m, nejvyšší z běžných kapalin) — molekuly na povrchu jsou taženy dovnitř. Vodoměrka chodí po hladině, kapilární vzlínání v rostlinách."]},
  dna:{t:"DNA: komplementarita bází", pts:[
    "Dva řetězce dvoušroubovice drží pohromadě vodíkové můstky mezi bázemi: <b>A=T dva můstky</b>, <b>G≡C tři můstky</b>.",
    "Proto je párování <b>komplementární</b>: adenin se páruje jen s thyminem, guanin jen s cytosinem — jinak si donory a akceptory „nesednou“.",
    "Můstky jsou dost pevné, aby šroubovice držela, a dost slabé, aby ji enzymy při <b>replikaci a transkripci</b> rozpletly. Kovalentní vazby by se rozplést nedaly.",
    "DNA bohatá na páry G≡C má vyšší <b>teplotu tání</b> (denaturace dvoušroubovice) než DNA bohatá na A=T — tři můstky drží víc než dva."]},
  bilk:{t:"Bílkoviny: sekundární struktura", pts:[
    "Vodíkové můstky <b>N–H···O=C</b> mezi peptidovými vazbami skládají řetězec do <b>α-helixu</b> (spirála, můstky uvnitř podél osy) nebo do <b>β-skládaného listu</b> (můstky mezi sousedními úseky řetězce).",
    "To je <b>sekundární struktura</b>. Terciární strukturu pak dotvářejí další slabé interakce: hydrofobní (disperzní), iontové můstky, a jediné kovalentní — disulfidové můstky S–S.",
    "<b>Denaturace</b>: teplo, kyselina nebo těžké kovy slabé interakce rozruší, řetězec se rozbalí a bílkovina ztratí funkci (uvařené vejce, sražené mléko). Primární struktura — kovalentní peptidové vazby — zůstává.",
    "Keratin ve vlasech: α-helixy; hedvábí: β-listy. Trvalá ondulace = rozbití a nové utvoření disulfidových a vodíkových můstků."]},
  grafit:{t:"Grafit vs diamant: dva alotropy uhlíku", pts:[
    "<b>Grafit</b>: uhlík sp², rovinné vrstvy šestiúhelníků vázané <b>kovalentně</b> (C–C 142 pm), mezi vrstvami (335 pm) jen <b>disperzní síly</b>.",
    "Vrstvy se snadno posouvají → grafit je <b>měkký a mazlavý</b> (tuha, mazivo). Čtvrtý elektron každého uhlíku je <b>delokalizovaný π</b> → grafit <b>vede proud</b> (elektrody, tužkové baterie) — jediný běžný nekov s kovovou vodivostí.",
    "<b>Diamant</b>: uhlík sp³, každý atom 4 kovalentní vazby do tetraedru, jediná obří molekula → <b>nejtvrdší látka</b>, nevodič (všechny elektrony jsou v σ vazbách), b.t. ≈ 3550 °C.",
    "Stejný prvek, stejná kovalentní vazba, jiné uspořádání — a naprosto opačné vlastnosti. Tomu se říká <b>alotropie</b>."]}
};
