/* ============================================================
   1 · DATA — skupina 16, hodnoty z běžných tabulek (CRC, Atkins,
   Chemické tabulky). Poloměry jsou kovalentní, EN Paulingova.
   ============================================================ */

/* prvky skupiny 16 */
var CH16 = [
 {s:"O",  n:"kyslík",   Z:8,  A:15.999, cfg:"[He] 2s² 2p⁴",            EN:3.44, r:66,  tt:-218.79, tv:-182.96, I1:1313.9,
  ox:"−II, −I, −½ (kladná jen s F)", char:"nekov, plyn", form:"O₂ (plyn), O₃",
  note:"Nemá ve valenční sféře orbitaly d. Nikdy nepřekročí čtyři σ vazby a kladná oxidační čísla má jen ve fluoridech."},
 {s:"S",  n:"síra",     Z:16, A:32.06,  cfg:"[Ne] 3s² 3p⁴",            EN:2.58, r:105, tt:115.21,  tv:444.6,   I1:999.6,
  ox:"−II, −I, +II, +IV, +VI", char:"nekov, pevná látka", form:"S₈ (kruh), Sₓ (řetězce)",
  note:"Ochotně se řetězí (katenace) a snadno dosahuje šestivaznosti. Odtud pramení celá pestrá chemie oxokyselin."},
 {s:"Se", n:"selen",    Z:34, A:78.971, cfg:"[Ar] 3d¹⁰ 4s² 4p⁴",       EN:2.55, r:120, tt:221,     tv:685,     I1:941.0,
  ox:"−II, +IV, +VI", char:"polokov, polovodič", form:"Se₈ červený, šedý polymer",
  note:"Šedý selen je polovodič citlivý na světlo. Oxidační stav +VI je slabší než u síry — H₂SeO₄ je silnější oxidovadlo než H₂SO₄."},
 {s:"Te", n:"tellur",   Z:52, A:127.60, cfg:"[Kr] 4d¹⁰ 5s² 5p⁴",       EN:2.10, r:138, tt:449.5,   tv:988,     I1:869.3,
  ox:"−II, +IV, +VI", char:"polokov, křehký lesklý", form:"spirálové řetězce",
  note:"Vazba v krystalu už má částečně kovový charakter. Kyselina H₆TeO₆ je oktaedrická — struktura, jakou síra nikdy nemá."},
 {s:"Po", n:"polonium", Z:84, A:209,    cfg:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴",  EN:2.00, r:140, tt:254,     tv:962,     I1:812.1,
  ox:"+II, +IV, řidčeji −II", char:"kov, radioaktivní", form:"prostá krychlová mřížka",
  note:"Jediný prvek s prostou krychlovou mřížkou za standardních podmínek. Vodivost klesá s teplotou jako u kovů."}
];
function el16(sym){ for(var i=0;i<CH16.length;i++) if(CH16[i].s===sym) return CH16[i]; return CH16[0]; }

/* veličiny pro trendový graf skupiny */
var TRENDS = [
 {k:"EN",  lbl:"Elektronegativita (Pauling)",   unit:"",         d:2, get:function(e){return e.EN;}},
 {k:"r",   lbl:"Kovalentní poloměr",            unit:"pm",       d:0, get:function(e){return e.r;}},
 {k:"tt",  lbl:"Teplota tání",                  unit:"°C",       d:1, get:function(e){return e.tt;}},
 {k:"tv",  lbl:"Teplota varu",                  unit:"°C",       d:1, get:function(e){return e.tv;}},
 {k:"I1",  lbl:"První ionizační energie",       unit:"kJ·mol⁻¹", d:0, get:function(e){return e.I1;}}
];

/* chalkogenovodíky H₂E — anomálie vody */
var HYD = [
 {f:"H₂O",  n:"voda",   tv:100.0,  tt:0.0,    ang:104.5, pK1:15.7, dHf:-241.8, tox:"neškodná",           col:"var(--cat1)"},
 {f:"H₂S",  n:"sulfan", tv:-60.3,  tt:-85.5,  ang:92.1,  pK1:7.0,  dHf:-20.6,  tox:"prudce jedovatý",    col:"var(--cat2)"},
 {f:"H₂Se", n:"selan",  tv:-41.3,  tt:-65.7,  ang:91.0,  pK1:3.9,  dHf:29.7,   tox:"jedovatější než H₂S",col:"var(--cat3)"},
 {f:"H₂Te", n:"tellan", tv:-2.2,   tt:-49.0,  ang:90.0,  pK1:2.6,  dHf:99.6,   tox:"nejjedovatější",     col:"var(--cat4)"}
];
var HYDQ = [
 {k:"tv",  lbl:"Teplota varu",                     unit:"°C",       d:1, get:function(h){return h.tv;},
  say:"Voda vyčnívá o&nbsp;víc než 160 °C nad linii ostatních tří. Důvod je jediný: <b>vodíkové vazby</b>. Kdyby je voda neměla, vřela by kolem −80 °C a Země by byla suchá."},
 {k:"ang", lbl:"Vazebný úhel H–E–H",               unit:"°",        d:1, get:function(h){return h.ang;},
  say:"U&nbsp;vody 104,5° (blízko tetraedru — sp³), u&nbsp;ostatních skoro přesně 90°. Těžší chalkogeny se váží prakticky <b>čistými orbitaly p</b>, hybridizaci u&nbsp;nich nemá smysl zavádět."},
 {k:"pK1", lbl:"pK₁ (síla kyseliny ve vodě)",      unit:"",         d:1, get:function(h){return h.pK1;},
  say:"Kyselost <b>roste</b> dolů skupinou, protože vazba E–H slábne a&nbsp;anion je větší, tedy stabilnější. H₂Te je silnější kyselina než kyselina octová."},
 {k:"dHf", lbl:"Slučovací entalpie ΔfH°(plyn)",    unit:"kJ·mol⁻¹", d:1, get:function(h){return h.dHf;},
  say:"Voda a&nbsp;sulfan vznikají exotermicky, selan a&nbsp;tellan <b>endotermicky</b> — jsou termodynamicky nestálé a&nbsp;samovolně se rozkládají. Stálost hydridů klesá dolů skupinou."}
];

/* oxidační čísla kyslíku — průzkumník */
var OXO = [
 {id:"O2",  f:"O₂",       nm:"kyslík",             ox:"0",    kind:"prvek",
  calc:"Volný prvek → oxidační číslo <b>0</b> z definice, ať je vazba jakkoli silná.",
  say:"Dvouatomová molekula s&nbsp;řádem vazby 2 a&nbsp;dvěma nepárovými elektrony. Paramagnetická — kapalný kyslík ulpí mezi póly magnetu.",
  bond:"O=O, 121 pm, 498 kJ·mol⁻¹"},
 {id:"O3",  f:"O₃",       nm:"ozon",               ox:"0",    kind:"prvek",
  calc:"Také volný prvek → <b>0</b>. Že jsou atomy nerovnocenné, na formálním čísle nic nemění.",
  say:"Lomená molekula, úhel 116,8°, obě vazby stejně dlouhé (127,8 pm) díky delokalizované vazbě π. Polární, a&nbsp;proto méně těkavá než O₂.",
  bond:"O–O 127,8 pm, řád ≈ 1,5"},
 {id:"H2O", f:"H₂O",      nm:"voda",               ox:"−II", kind:"oxid",
  calc:"2·(+1) + <span class=\"q\">x</span> = 0 → <b><span class=\"q\">x</span> = −2</b>",
  say:"Standardní případ: kyslík je elektronegativnější než partner, přitáhne si oba vazebné páry a&nbsp;dostane −II. Takto je vázán ve všech oxidech a&nbsp;v&nbsp;drtivé většině sloučenin.",
  bond:"O–H 96 pm, úhel 104,5°"},
 {id:"CaO", f:"CaO",      nm:"oxid vápenatý",      ox:"−II", kind:"oxid",
  calc:"Ca je +II → <b>O = −II</b>, a&nbsp;tady je to i&nbsp;skutečný náboj: iontová mřížka Ca²⁺ a&nbsp;O²⁻.",
  say:"Iontový oxid. Anion O²⁻ je silná zásada — s&nbsp;vodou dá rovnou hydroxid. Odtud plyne, že iontové oxidy jsou zásadotvorné.",
  bond:"iontová mřížka typu NaCl"},
 {id:"H2O2",f:"H₂O₂",     nm:"peroxid vodíku",     ox:"−I",  kind:"peroxid",
  calc:"2·(+1) + 2<span class=\"q\">x</span> = 0 → <b><span class=\"q\">x</span> = −1</b>. Vazba O–O rozděluje elektrony napůl, takže každý kyslík má jen jednu „výhru“.",
  say:"Motiv −O−O− je poznávací znamení peroxosloučenin. Kyslík v&nbsp;−I je „mezi“ 0 a&nbsp;−II, proto může jít nahoru i&nbsp;dolů: H₂O₂ je oxidační i&nbsp;redukční činidlo.",
  bond:"O–O 147,4 pm, dihedrální úhel ≈ 111°"},
 {id:"KO2", f:"KO₂",      nm:"superoxid draselný", ox:"−½",  kind:"superoxid",
  calc:"K je +I, na dva kyslíky připadá −1 → <b>na jeden kyslík −½</b>. Zlomek je v&nbsp;pořádku: náboj nese celý anion O₂⁻.",
  say:"Anion O₂⁻ má o&nbsp;jeden elektron víc než molekula O₂ — v&nbsp;protivazebném orbitalu π*. Řád vazby klesne na 1,5, jeden elektron zůstane nepárový, takže superoxidy jsou paramagnetické.",
  bond:"O–O 133 pm, řád 1,5"},
 {id:"KO3", f:"KO₃",      nm:"ozonid draselný",    ox:"−⅓",  kind:"ozonid",
  calc:"K je +I, tři kyslíky nesou dohromady −1 → <b>−⅓ na atom</b>.",
  say:"Anion O₃⁻ má stejnou kostru jako ozon plus jeden elektron navíc v&nbsp;delokalizovaném protivazebném orbitalu π. Červenooranžová, velmi nestálá látka.",
  bond:"O–O ≈ 134 pm"},
 {id:"OF2", f:"OF₂",      nm:"difluorid kyslíku",  ox:"+II", kind:"fluorid",
  calc:"Fluor má <b>vždy</b> −I → 2·(−1) + <span class=\"q\">x</span> = 0 → <b><span class=\"q\">x</span> = +2</b>.",
  say:"Jediná situace, kdy má kyslík kladné oxidační číslo: partner je ještě elektronegativnější. Fluor 3,98 &gt; kyslík 3,44. Proto se sloučenina jmenuje fluorid, ne oxid.",
  bond:"O–F 141 pm, úhel 103,3°"},
 {id:"O2F2",f:"O₂F₂",     nm:"difluorid dikyslíku",ox:"+I",  kind:"fluorid",
  calc:"2·(−1) + 2<span class=\"q\">x</span> = 0 → <b><span class=\"q\">x</span> = +1</b>. Vazba O–O opět dělí náboj na polovinu.",
  say:"Kombinace obojího: peroxidový můstek O–O a&nbsp;fluor jako partner. Nad −160 °C se rozkládá. Extrémně silné fluorační činidlo.",
  bond:"O–O 122 pm (kratší než v&nbsp;H₂O₂!), O–F 158 pm"}
];

/* trenažér oxidačních čísel chalkogenů */
var TRN = [
 {f:"H₂SO₄", at:"S", o:["+IV","+VI","+II","−II"], c:1, e:"2·(+1) + x + 4·(−2) = 0 → x = +6. Kyselina sírová má síru v&nbsp;nejvyšším možném stavu — proto může být jen redukována, nikdy oxidována."},
 {f:"Na₂S₂O₃", at:"S", o:["+VI a −II (průměr +II)","+IV","+II u obou","−I"], c:0, e:"Thiosíran je síran, kterému jeden kyslík nahradila síra. Středová síra si drží +VI, thio‑síra má −II; průměr vychází +II, ale skutečnost je dvojí. Kniha i&nbsp;dnešní chemie proto před průměrem varují."},
 {f:"FeS₂", at:"S", o:["−II","+II","0","−I"], c:3, e:"Pyrit obsahuje disulfidový anion S₂²⁻ s&nbsp;vazbou S–S, tedy železo je +II a&nbsp;každá síra −I. Kdo napíše S = −II, dostane Fe = +IV, což u&nbsp;železa v&nbsp;pyritu neexistuje."},
 {f:"SO₃²⁻", at:"S", o:["+VI","+II","+IV","+III"], c:2, e:"x + 3·(−2) = −2 → x = +4. Siřičitan má volný elektronový pár na síře, je pyramidální a&nbsp;dá se oxidovat na síran — proto jsou siřičitany redukční činidla."},
 {f:"S₄O₆²⁻", at:"S", o:["+2,5 (průměr)","+VI","+III","+II"], c:0, e:"4x + 6·(−2) = −2 → x = +2,5. Tetrathionan má řetězec čtyř síranových atomů, dvě krajní v&nbsp;+V a&nbsp;dvě vnitřní v&nbsp;0 — zlomek je jen účetní průměr."},
 {f:"KO₂", at:"O", o:["−II","−I","−½","0"], c:2, e:"K je +I, dva kyslíky nesou −1 dohromady, tedy −½ na atom. Superoxidový anion O₂⁻ je paramagnetický a&nbsp;má řád vazby 1,5."},
 {f:"BaO₂", at:"O", o:["−II","−I","0","−½"], c:1, e:"Ba je vždy +II, dva kyslíky tedy nesou −2, na atom −I. Je to peroxid barnatý s&nbsp;anionem O₂²⁻ — proto s&nbsp;kyselinou dává H₂O₂, a&nbsp;ne vodu."},
 {f:"OF₂", at:"O", o:["−II","0","+I","+II"], c:3, e:"Fluor je nejelektronegativnější prvek a&nbsp;má vždy −I. Proto tady kyslík ustupuje a&nbsp;dostane +II. Je to jeden ze dvou případů, kdy má kyslík kladné číslo."},
 {f:"H₂S₂O₈", at:"S", o:["+VII","+VI","+V","+IV"], c:1, e:"Pozor na peroxidový můstek: čtyři kyslíky u&nbsp;každé síry mají −II, ale dva z&nbsp;nich tvoří peroxo skupinu s&nbsp;−I. Po správném rozpisu vyjde síra +VI. Kdo počítá všechny kyslíky jako −II, dostane nesmyslné +VII."},
 {f:"SF₆", at:"S", o:["+IV","+II","+VI","0"], c:2, e:"Fluor −I, šest atomů → síra +VI. Oktaedr, žádný volný pár. Formální oxidační číslo je nejvyšší možné, a&nbsp;přesto je SF₆ prakticky inertní — číslo o&nbsp;reaktivitě samo nerozhoduje."},
 {f:"SeO₄²⁻", at:"Se", o:["+VI","+IV","+II","+VII"], c:0, e:"x + 4·(−2) = −2 → x = +6. Selenan je izostrukturní se síranem, ale kyselina selenová je mnohem silnější oxidovadlo než sírová — s&nbsp;HCl dokáže rozpustit i&nbsp;zlato."},
 {f:"S₂Cl₂", at:"S", o:["−I","0","+II","+I"], c:3, e:"Chlor má −I, dvě síry tedy dohromady +2, na atom +I. Vazba S–S je důvodem toho neobvyklého čísla; sloučeniny s&nbsp;vazbou chalkogen–chalkogen dávají „mezi‑čísla“."},
 {f:"H₂SO₃", at:"S", o:["+IV","+VI","+II","+III"], c:0, e:"2·(+1) + x + 3·(−2) = 0 → x = +4. Síra má ještě volný pár a&nbsp;může jít nahoru na +VI — proto je kyselina siřičitá a&nbsp;siřičitany redukční činidla."},
 {f:"Na₂S₂O₄", at:"S", o:["+III","+IV","+II","+VI"], c:0, e:"2·(+1) + 2x + 4·(−2) = 0 → x = +3. Dithioničitan má vazbu S–S; je to mimořádně silné redukční činidlo užívané k&nbsp;bělení."},
 {f:"H₂O₂", at:"O", o:["−II","0","−I","+I"], c:2, e:"2·(+1) + 2x = 0 → x = −1. Peroxidový motiv −O−O− je klíč: kyslík je „na půl cesty“ mezi 0 a&nbsp;−II, a&nbsp;proto může působit oxidačně i&nbsp;redukčně."},
 {f:"H₆TeO₆", at:"Te", o:["+IV","+VI","+II","+VIII"], c:1, e:"6·(+1) + x + 6·(−2) = 0 → x = +6. Kyselina hexahydrogentellurová má oktaedrickou strukturu — jiná geometrie než H₂SO₄, ale stejné oxidační číslo."}
];

/* MO řada O₂ⁿ */
var MOSER = [
 {id:"O2p", f:"O₂⁺",  nm:"dioxygenylový kation", pi:1, bo:2.5, d:112, mag:"paramagnetický (1 e⁻)",
  say:"Vznikne odtržením elektronu z&nbsp;protivazebného orbitalu π*. Vazba se tím <b>zkrátí a&nbsp;zpevní</b>. Existuje například v&nbsp;soli O₂[PtF₆] — právě ta přivedla Bartletta k&nbsp;objevu sloučenin xenonu."},
 {id:"O2",  f:"O₂",   nm:"molekula kyslíku",     pi:2, bo:2.0, d:121, mag:"paramagnetický (2 e⁻)",
  say:"Dva elektrony obsadí <b>dva degenerované orbitaly π* po jednom se souhlasnými spiny</b> (Hundovo pravidlo). Odtud paramagnetismus, který Lewisův vzorec O=O nikdy nevysvětlí."},
 {id:"O2m", f:"O₂⁻",  nm:"superoxidový anion",   pi:3, bo:1.5, d:133, mag:"paramagnetický (1 e⁻)",
  say:"Elektron navíc v&nbsp;π* sníží řád vazby na 1,5. V&nbsp;buňkách vzniká jako reaktivní forma kyslíku a&nbsp;likviduje ho enzym superoxiddismutasa."},
 {id:"O2d", f:"O₂²⁻", nm:"peroxidový anion",     pi:4, bo:1.0, d:149, mag:"diamagnetický"    ,
  say:"Oba orbitaly π* jsou plné, zbývá jednoduchá vazba σ. Proto je vazba nejdelší a&nbsp;nejslabší v&nbsp;celé řadě a&nbsp;peroxidy se snadno rozkládají."}
];

/* oxidy — prohledávatelná tabulka */
var OXID = [
 {f:"Li₂O",  n:"oxid lithný",       b:"iont", ab:"zas", per:2, ox:"+I",   rw:"Li₂O + H₂O → 2 LiOH", use:"keramika, sklo"},
 {f:"Na₂O",  n:"oxid sodný",        b:"iont", ab:"zas", per:3, ox:"+I",   rw:"Na₂O + H₂O → 2 NaOH", use:"meziprodukt, sklářství"},
 {f:"K₂O",   n:"oxid draselný",     b:"iont", ab:"zas", per:4, ox:"+I",   rw:"K₂O + H₂O → 2 KOH",   use:"hnojiva (přepočet K₂O)"},
 {f:"MgO",   n:"oxid hořečnatý",    b:"iont", ab:"zas", per:3, ox:"+II",  rw:"MgO + H₂O → Mg(OH)₂ (pomalu)", use:"žáruvzdorné vyzdívky, antacida"},
 {f:"CaO",   n:"oxid vápenatý",     b:"iont", ab:"zas", per:4, ox:"+II",  rw:"CaO + H₂O → Ca(OH)₂ (bouřlivě)", use:"pálené vápno, malta, odsiřování"},
 {f:"BaO",   n:"oxid barnatý",      b:"iont", ab:"zas", per:6, ox:"+II",  rw:"BaO + H₂O → Ba(OH)₂", use:"výroba BaO₂"},
 {f:"CrO",   n:"oxid chromnatý",    b:"iont", ab:"zas", per:4, ox:"+II",  rw:"prakticky nereaguje", use:"ukázka trendu u chromu"},
 {f:"MnO",   n:"oxid manganatý",    b:"iont", ab:"zas", per:4, ox:"+II",  rw:"nerozpustný", use:"hnojiva, keramika"},
 {f:"BeO",   n:"oxid beryllnatý",   b:"poly", ab:"amf", per:2, ox:"+II",  rw:"nerozpustný, reaguje s kyselinami i zásadami", use:"keramika s vysokou tepelnou vodivostí"},
 {f:"Al₂O₃", n:"oxid hlinitý",      b:"poly", ab:"amf", per:3, ox:"+III", rw:"Al₂O₃ + 6 HCl → 2 AlCl₃ + 3 H₂O; Al₂O₃ + 2 NaOH + 3 H₂O → 2 Na[Al(OH)₄]", use:"výroba hliníku, korund, brusiva, katalyzátory"},
 {f:"ZnO",   n:"oxid zinečnatý",    b:"poly", ab:"amf", per:4, ox:"+II",  rw:"ZnO + 2 HCl → ZnCl₂ + H₂O; ZnO + 2 NaOH + H₂O → Na₂[Zn(OH)₄]", use:"zinková běloba, opalovací krémy, guma"},
 {f:"Cr₂O₃", n:"oxid chromitý",     b:"poly", ab:"amf", per:4, ox:"+III", rw:"reaguje s kyselinami i s taveninou zásad", use:"zelený pigment, pasivační vrstva nerezi"},
 {f:"PbO",   n:"oxid olovnatý",     b:"poly", ab:"amf", per:6, ox:"+II",  rw:"reaguje s kyselinami i zásadami", use:"klejt, olovnaté sklo, akumulátory"},
 {f:"SnO₂",  n:"oxid cíničitý",     b:"poly", ab:"amf", per:5, ox:"+IV",  rw:"nerozpustný, taví se se zásadami", use:"kassiterit, vodivé vrstvy, glazury"},
 {f:"MnO₂",  n:"oxid manganičitý",  b:"poly", ab:"amf", per:4, ox:"+IV",  rw:"nerozpustný", use:"katalyzátor rozkladu H₂O₂, suché články"},
 {f:"SiO₂",  n:"oxid křemičitý",    b:"poly", ab:"kys", per:3, ox:"+IV",  rw:"s vodou nereaguje, se zásadami dá křemičitany", use:"sklo, křemen, optická vlákna"},
 {f:"B₂O₃",  n:"oxid boritý",       b:"poly", ab:"kys", per:2, ox:"+III", rw:"B₂O₃ + 3 H₂O → 2 H₃BO₃", use:"borosilikátové sklo"},
 {f:"CrO₃",  n:"oxid chromový",     b:"poly", ab:"kys", per:4, ox:"+VI",  rw:"CrO₃ + H₂O → H₂CrO₄", use:"silné oxidovadlo, chromování"},
 {f:"CO₂",   n:"oxid uhličitý",     b:"mol",  ab:"kys", per:2, ox:"+IV",  rw:"CO₂ + H₂O ⇌ H₂CO₃ (slabá)", use:"sycené nápoje, hasiva, fotosyntéza"},
 {f:"N₂O₅",  n:"oxid dusičný",      b:"mol",  ab:"kys", per:2, ox:"+V",   rw:"N₂O₅ + H₂O → 2 HNO₃", use:"nitrační činidlo"},
 {f:"P₄O₁₀", n:"oxid fosforečný",   b:"mol",  ab:"kys", per:3, ox:"+V",   rw:"P₄O₁₀ + 6 H₂O → 4 H₃PO₄", use:"nejsilnější sušidlo, dehydratace"},
 {f:"SO₂",   n:"oxid siřičitý",     b:"mol",  ab:"kys", per:3, ox:"+IV",  rw:"SO₂ + H₂O ⇌ H₂SO₃ (slabá)", use:"konzervant E220, bělení, výroba H₂SO₄"},
 {f:"SO₃",   n:"oxid sírový",       b:"mol",  ab:"kys", per:3, ox:"+VI",  rw:"SO₃ + H₂O → H₂SO₄ (bouřlivě)", use:"meziprodukt výroby kyseliny sírové"},
 {f:"SeO₂",  n:"oxid seleničitý",   b:"poly", ab:"kys", per:4, ox:"+IV",  rw:"SeO₂ + H₂O → H₂SeO₃", use:"oxidační činidlo v organické syntéze"},
 {f:"TeO₂",  n:"oxid telluričitý",  b:"poly", ab:"kys", per:5, ox:"+IV",  rw:"ve vodě téměř nerozpustný, se zásadami dá telluričitany", use:"optická skla, akustooptika"},
 {f:"Cl₂O₇", n:"oxid chloristý",    b:"mol",  ab:"kys", per:3, ox:"+VII", rw:"Cl₂O₇ + H₂O → 2 HClO₄", use:"laboratorní zajímavost, výbušný"},
 {f:"Mn₂O₇", n:"oxid manganistý",   b:"mol",  ab:"kys", per:4, ox:"+VII", rw:"Mn₂O₇ + H₂O → 2 HMnO₄", use:"olejovitá výbušná kapalina"},
 {f:"CO",    n:"oxid uhelnatý",     b:"mol",  ab:"net", per:2, ox:"+II",  rw:"s vodou nereaguje", use:"redukovadlo v hutnictví, syntézní plyn"},
 {f:"NO",    n:"oxid dusnatý",      b:"mol",  ab:"net", per:2, ox:"+II",  rw:"s vodou nereaguje", use:"meziprodukt výroby HNO₃, signální molekula"},
 {f:"N₂O",   n:"oxid dusný",        b:"mol",  ab:"net", per:2, ox:"+I",   rw:"s vodou nereaguje", use:"rajský plyn, hnací plyn ve šlehačce"}
];
var ABLBL = {zas:"zásadotvorný", kys:"kyselinotvorný", amf:"amfoterní", net:"netečný"};
var ABCOL = {zas:"var(--endo)", kys:"var(--exo)", amf:"var(--cat3)", net:"var(--ink-3)"};
var BLBL  = {iont:"iontový", mol:"molekulový (nízkomolekulární)", poly:"polymerní (vysokomolekulární)"};

/* 3. perioda — trend oxidů */
var PER3 = [
 {f:"Na₂O",  ab:"zas", b:"iont", el:"Na", EN:0.93},
 {f:"MgO",   ab:"zas", b:"iont", el:"Mg", EN:1.31},
 {f:"Al₂O₃", ab:"amf", b:"poly", el:"Al", EN:1.61},
 {f:"SiO₂",  ab:"kys", b:"poly", el:"Si", EN:1.90},
 {f:"P₄O₁₀", ab:"kys", b:"mol",  el:"P",  EN:2.19},
 {f:"SO₃",   ab:"kys", b:"mol",  el:"S",  EN:2.58},
 {f:"Cl₂O₇", ab:"kys", b:"mol",  el:"Cl", EN:3.16}
];

/* peroxid vodíku — dvojí role */
var HPR = [
 {id:"ki", role:"ox", part:"jodid draselný v kyselém prostředí",
  eq:"H₂O₂ + 2 KI + H₂SO₄ → I₂ + K₂SO₄ + 2 H₂O",
  chg:"O: −I → −II (redukce) · I: −I → 0 (oxidace)",
  say:"Roztok zhnědne vyloučeným jodem. Peroxid tu <b>bere</b> elektrony, tedy působí jako <b>oxidační činidlo</b>, a&nbsp;sám klesá na −II (voda). Tohle je jeho běžnější role."},
 {id:"so3",role:"ox", part:"siřičitan",
  eq:"SO₃²⁻ + H₂O₂ → SO₄²⁻ + H₂O",
  chg:"O: −I → −II (redukce) · S: +IV → +VI (oxidace)",
  say:"Peroxid převede siřičitan na síran. Používá se to i&nbsp;technicky — H₂O₂ zachytává SO₂ z&nbsp;plynů za vzniku kyseliny sírové."},
 {id:"mno4",role:"red", part:"manganistan v kyselém prostředí",
  eq:"5 H₂O₂ + 2 KMnO₄ + 3 H₂SO₄ → K₂SO₄ + 2 MnSO₄ + 8 H₂O + 5 O₂",
  chg:"O: −I → 0 (oxidace) · Mn: +VII → +II (redukce)",
  say:"Fialový roztok se odbarví a&nbsp;bublá kyslík. Proti silnějšímu oxidovadlu peroxid elektrony <b>dává</b> — je <b>redukční činidlo</b> a&nbsp;stoupá na 0 (plynný O₂). Tahle reakce se používá i&nbsp;k&nbsp;odměrnému stanovení peroxidu."},
 {id:"cl2", role:"red", part:"chlor",
  eq:"Cl₂ + H₂O₂ → 2 HCl + O₂",
  chg:"O: −I → 0 (oxidace) · Cl: 0 → −I (redukce)",
  say:"Chlor je silnější oxidovadlo, takže vyhraje on a&nbsp;peroxid se oxiduje na kyslík. Stejně se chová i&nbsp;vůči chlornanu."},
 {id:"ag2o",role:"red", part:"oxid stříbrný",
  eq:"Ag₂O + H₂O₂ → 2 Ag + H₂O + O₂",
  chg:"O(peroxid): −I → 0 · Ag: +I → 0",
  say:"Vyloučí se kovové stříbro a&nbsp;uniká kyslík. Ušlechtilé kovy peroxid redukuje ochotně — proto se také jejich soli nesmí dostat do zásobní láhve, katalyzují rozklad."},
 {id:"disp",role:"oba", part:"sám sebe (disproporcionace)",
  eq:"2 H₂O₂ → 2 H₂O + O₂",
  chg:"O: −I → −II a zároveň −I → 0",
  say:"Klasická <b>disproporcionace</b>: polovina kyslíku klesne na −II, polovina stoupne na 0. Reakce je exotermická (−98 kJ na mol H₂O₂) a&nbsp;běží sama; katalyzují ji MnO₂, platina, prach i&nbsp;enzym katalasa v&nbsp;krvi."}
];

/* chování síry při zahřívání */
var SMELT = [
 {t:20,  st:"pevná α",   part:"kruhy S₈, kosočtverečná mřížka", visc:0,    col:"#e8d44a", say:"Kosočtverečná (α) síra: žluté krystaly, hustota 2,07 g·cm⁻³, měkká, nevede proud, nerozpustná ve vodě, dobře rozpustná v&nbsp;sirouhlíku."},
 {t:96,  st:"pevná β",   part:"kruhy S₈, jednoklonná mřížka",   visc:0,    col:"#f0e07a", say:"Nad <b>95,5 °C</b> (přechodová teplota) je stálejší jednoklonná (β) síra — světlejší jehličky, hustota 1,96 g·cm⁻³. Stejné molekuly S₈, jiné uspořádání v&nbsp;mřížce."},
 {t:120, st:"kapalná",   part:"volné kruhy S₈",                 visc:0.12, col:"#f5c93a", say:"Po roztavení (α 112,8 °C, β 115,2 °C) vzniká <b>řídká, jasně žlutá kapalina</b> — kruhy S₈ po sobě kloužou jako kuličky. Teče skoro jako olej."},
 {t:150, st:"kapalná",   part:"kruhy S₈, začínají praskat",     visc:0.20, col:"#f0a92e", say:"Kapalina tmavne do oranžova, viskozita zatím jen mírně roste. Kruhy se pomalu začínají otevírat."},
 {t:170, st:"kapalná",   part:"otevřené řetězce, polymerace",   visc:8,    col:"#c96b25", say:"Nad zhruba <b>159 °C</b> se kruhy trhají a&nbsp;spojují do dlouhých řetězců (katena‑polysíra). Viskozita <b>skokově roste</b> — to je ta slavná anomálie, kdy se kapalina zahříváním zahustí."},
 {t:187, st:"kapalná",   part:"nejdelší řetězce (až 10⁵ atomů)",visc:100,  col:"#8f3a1c", say:"Maximum viskozity kolem <b>187 °C</b>. Tavenina je tmavě červenohnědá a&nbsp;tak hustá, že <b>nevyteče z&nbsp;převrácené zkumavky</b>. Řetězce jsou nejdelší."},
 {t:250, st:"kapalná",   part:"kratší řetězce",                 visc:22,   col:"#7a2f18", say:"Další zahřívání řetězce zase <b>láme</b> — jsou kratší, tavenina řidší. Viskozita klesá, barva zůstává tmavá."},
 {t:400, st:"kapalná",   part:"krátké řetězce a kruhy",         visc:2,    col:"#6b2a16", say:"Před varem je tavenina opět pohyblivá. Prudkým vlitím takové taveniny do studené vody vznikne <b>plastická síra</b> — pružná hmota z&nbsp;„zmrazených“ řetězců, která do pár dní zkrystaluje zpět na α."},
 {t:500, st:"pára",      part:"S₈ → S₆ → S₄ → S₂",              visc:0,    col:"#d0642a", say:"Nad bodem varu (<b>444,6 °C</b>) jsou v&nbsp;páře kruhy S₆ a&nbsp;S₄, nad 900 °C převládají dvouatomové <b>S₂</b> — a&nbsp;ty jsou paramagnetické úplně stejně jako O₂, ze stejného důvodu."}
];

/* sulfidy — prohledávatelná tabulka */
var SULF = [
 {f:"Na₂S",  n:"sulfid sodný",     col:"bezbarvý",       colc:"#e8e8e8", sol:"rozpustný",    grp:"alk", min:"—",                  use:"viskózové vlákno, koželužství, srážení sulfidů"},
 {f:"K₂S",   n:"sulfid draselný",  col:"bezbarvý",       colc:"#e8e8e8", sol:"rozpustný",    grp:"alk", min:"—",                  use:"laboratorní činidlo"},
 {f:"(NH₄)₂S",n:"sulfid amonný",   col:"bezbarvý",       colc:"#e8e8e8", sol:"rozpustný",    grp:"alk", min:"—",                  use:"srážecí činidlo v analytice"},
 {f:"CaS",   n:"sulfid vápenatý",  col:"bílý",           colc:"#f2f2f2", sol:"hydrolyzuje",  grp:"alk", min:"oldhamit",           use:"meziprodukt výroby síry ze sádrovce"},
 {f:"ZnS",   n:"sulfid zinečnatý", col:"bílý",           colc:"#f5f5f5", sol:"nerozpustný",  grp:"ner", min:"sfalerit, wurtzit",  use:"luminofory, bílý pigment (litopon)"},
 {f:"MnS",   n:"sulfid manganatý", col:"tělově růžový",  colc:"#e9b8a8", sol:"nerozpustný",  grp:"ner", min:"alabandin",          use:"důkaz manganu v analytice"},
 {f:"CdS",   n:"sulfid kademnatý", col:"žlutý",          colc:"#e8c53a", sol:"nerozpustný",  grp:"ner", min:"greenockit",         use:"kadmiová žluť, fotorezistory"},
 {f:"As₂S₃", n:"sulfid arsenitý",  col:"žlutý",          colc:"#ddb42e", sol:"nerozpustný",  grp:"ner", min:"auripigment",        use:"historický pigment, sklo"},
 {f:"Sb₂S₃", n:"sulfid antimonitý",col:"oranžový",       colc:"#d97b2a", sol:"nerozpustný",  grp:"ner", min:"antimonit",          use:"zápalky, pyrotechnika"},
 {f:"SnS₂",  n:"sulfid cíničitý",  col:"zlatožlutý",     colc:"#dcb03c", sol:"nerozpustný",  grp:"ner", min:"—",                  use:"„muzívní zlato“ — imitace zlacení"},
 {f:"PbS",   n:"sulfid olovnatý",  col:"černý",          colc:"#2b2b2b", sol:"nerozpustný",  grp:"ner", min:"galenit",            use:"nejdůležitější ruda olova, IR detektory"},
 {f:"CuS",   n:"sulfid měďnatý",   col:"černý",          colc:"#232323", sol:"nerozpustný",  grp:"ner", min:"covellin",           use:"důkaz mědi; Ks ≈ 6·10⁻³⁷"},
 {f:"Cu₂S",  n:"sulfid měďný",     col:"černošedý",      colc:"#33342f", sol:"nerozpustný",  grp:"ner", min:"chalkosin",          use:"ruda mědi"},
 {f:"HgS",   n:"sulfid rtuťnatý",  col:"černý / červený",colc:"#8c1f14", sol:"nerozpustný",  grp:"ner", min:"cinabarit (rumělka)",use:"rumělkový pigment, ruda rtuti"},
 {f:"Ag₂S",  n:"sulfid stříbrný",  col:"černý",          colc:"#26262a", sol:"nerozpustný",  grp:"ner", min:"argentit",           use:"černání stříbrných příborů od sulfanu"},
 {f:"FeS",   n:"sulfid železnatý", col:"černý",          colc:"#2a2a2e", sol:"rozklad kyselinou", grp:"ner", min:"troilit",       use:"zdroj H₂S v Kippově přístroji"},
 {f:"FeS₂",  n:"disulfid železnatý",col:"mosazně žlutý", colc:"#c9a227", sol:"nerozpustný",  grp:"ner", min:"pyrit („kočičí zlato“)", use:"surovina pro výrobu H₂SO₄; síra má −I"},
 {f:"CuFeS₂",n:"sulfid železnato-měďnatý",col:"mosazný", colc:"#c8a83a", sol:"nerozpustný",  grp:"ner", min:"chalkopyrit",        use:"hlavní světová ruda mědi"},
 {f:"Bi₂S₃", n:"sulfid bismutitý", col:"hnědočerný",     colc:"#3a2a22", sol:"nerozpustný",  grp:"ner", min:"bismutin",           use:"ruda bismutu"},
 {f:"NiS",   n:"sulfid nikelnatý", col:"černý",          colc:"#26282a", sol:"nerozpustný",  grp:"ner", min:"millerit",           use:"důkaz niklu"},
 {f:"CoS",   n:"sulfid kobaltnatý",col:"černý",          colc:"#242629", sol:"nerozpustný",  grp:"ner", min:"—",                  use:"analytika"},
 {f:"MoS₂",  n:"sulfid molybdeničitý",col:"šedočerný",   colc:"#44464a", sol:"nerozpustný",  grp:"ner", min:"molybdenit",         use:"vysokoteplotní mazivo, 2D materiál"}
];

/* halogenidy a chalkogenidy síry — tvary */
var SHAL = [
 {id:"sf6", f:"SF₆",   n:"fluorid sírový",       ox:"+VI", geo:"oktaedr",           vsepr:"AX₆, bez volného páru",
  st:"stálý, nehydrolyzuje se", prep:"S + 3 F₂ → SF₆",
  say:"Bezbarvý plyn, sublimuje při −64 °C. Šest fluorů kolem síry ji <b>dokonale zastíní</b> — voda nemá kudy zaútočit, přestože by hydrolýza byla energeticky výhodná. Klasická ukázka, že o&nbsp;osudu látky rozhoduje <b>kinetika</b>, ne termodynamika. Používá se jako izolant ve vysokonapěťových vypínačích (dielektrická pevnost asi 2,5× vyšší než u&nbsp;vzduchu)."},
 {id:"sf4", f:"SF₄",   n:"fluorid siřičitý",     ox:"+IV", geo:"houpačka (disfenoid)", vsepr:"AX₄E, jeden volný pár",
  st:"velmi reaktivní, hydrolyzuje", prep:"3 SCl₂ + 4 NaF → SF₄ + S₂Cl₂ + 4 NaCl",
  say:"Volný elektronový pár zabere jednu pozici trigonální bipyramidy a&nbsp;molekula dostane tvar houpačky. S&nbsp;vodou se rozloží okamžitě: <span class=\"chem\">SF₄ + 2 H₂O → SO₂ + 4 HF</span>. Rozdíl proti SF₆ je učebnicový — <b>volný pár je otevřená brána</b>."},
 {id:"scl2",f:"SCl₂",  n:"chlorid sirnatý",      ox:"+II", geo:"lomená",            vsepr:"AX₂E₂, dva volné páry",
  st:"tmavě červená kapalina", prep:"S₂Cl₂ + Cl₂ → 2 SCl₂",
  say:"Izoelektronová a&nbsp;vazebně shodná s&nbsp;molekulou Cl₂O. Tmavě červená dýmavá kapalina, používá se k&nbsp;chloraci a&nbsp;jako meziprodukt."},
 {id:"s2cl2",f:"S₂Cl₂",n:"chlorid disirný",      ox:"+I",  geo:"řetězec Cl–S–S–Cl", vsepr:"vazba S–S",
  st:"žlutá olejovitá kapalina", prep:"2 S + Cl₂ → S₂Cl₂",
  say:"Vazba síra–síra dává síře neobvyklé oxidační číslo +I. Rozpouští velké množství elementární síry, a&nbsp;proto se používá při <b>vulkanizaci kaučuku</b> (studená vulkanizace) a&nbsp;jako chlorační činidlo."},
 {id:"h2s", f:"H₂S",   n:"sulfan",               ox:"−II", geo:"lomená",            vsepr:"AX₂E₂, úhel 92,1°",
  st:"prudce jedovatý plyn", prep:"FeS + 2 HCl → FeCl₂ + H₂S",
  say:"Úhel skoro 90° — síra se váže téměř čistými orbitaly 3p, hybridizace tu nemá smysl. Bez vodíkových vazeb vře už při −60,3 °C. Zapáchá po zkažených vejcích, ale nad 150 ppm <b>čich přestane fungovat</b>, a&nbsp;proto je tak zrádný."},
 {id:"cs2", f:"CS₂",   n:"sirouhlík",            ox:"−II", geo:"lineární",          vsepr:"AX₂, dvě dvojné vazby",
  st:"těkavá hořlavá kapalina", prep:"CH₄ + 4 S → CS₂ + 2 H₂S",
  say:"Ukázka násobné vazby S=C. Tendence k&nbsp;vazbám π klesá v&nbsp;řadě S &gt; Se &gt; Te; trojnou vazbu už ani síra netvoří. Sirouhlík je jediné běžné rozpouštědlo elementární síry."}
];

/* oxokyseliny síry — čtyři rodiny podle struktury */
var OXAC = [
 {id:"h2so3", f:"H₂SO₃",  n:"kyselina siřičitá",      fam:"sam", ox:"S<sup>IV</sup>", salt:"siřičitany SO₃²⁻, hydrogensiřičitany HSO₃⁻",
  st:"jen ve vodném roztoku a ve formě solí",
  say:"Ve skutečnosti jde spíš o&nbsp;hydrát SO₂·xH₂O — molekula H₂SO₃ nebyla nikdy izolována. Středová síra má <b>volný elektronový pár</b>, takže je pyramidální a&nbsp;dá se oxidovat na +VI. Proto jsou siřičitany <b>redukční činidla</b> a&nbsp;bělidla."},
 {id:"h2so4", f:"H₂SO₄",  n:"kyselina sírová",        fam:"sir", ox:"S<sup>VI</sup>", salt:"sírany SO₄²⁻, hydrogensírany HSO₄⁻",
  st:"stálá jako látka i v roztoku i ve formě solí",
  say:"Tetraedr bez volného páru. Síra je v&nbsp;nejvyšším stavu, takže kyselina může jen oxidovat, nikdy být oxidována. Dvojsytná: pK₁ ≈ −3 (silná), pK₂ = 1,92 (středně silná)."},
 {id:"h2s2o7",f:"H₂S₂O₇", n:"kyselina disírová",      fam:"sir", ox:"S<sup>VI</sup>", salt:"disírany S₂O₇²⁻",
  st:"stálá jako látka i ve formě solí",
  say:"Dva tetraedry spojené <b>kyslíkovým můstkem</b>. Vzniká rozpouštěním SO₃ v&nbsp;koncentrované kyselině sírové — takový roztok se jmenuje <b>oleum</b> a&nbsp;je to klíčový meziprodukt kontaktního procesu."},
 {id:"h2s2o5",f:"H₂S₂O₅", n:"kyselina disiřičitá",    fam:"ss",  ox:"S<sup>IV</sup>", salt:"disiřičitany S₂O₅²⁻ (E223, E224)",
  st:"jen v roztoku, soli jsou stálé",
  say:"Nesymetrická: jedna síra nese tři kyslíky, druhá dva, a&nbsp;spojuje je <b>vazba S–S</b>. Disiřičitan sodný a&nbsp;draselný jsou běžné konzervanty vína a&nbsp;sušeného ovoce — ve vodě se rozpadají zpět na hydrogensiřičitan."},
 {id:"h2s2o3",f:"H₂S₂O₃", n:"kyselina thiosírová",    fam:"ss",  ox:"S<sup>VI</sup> a S<sup>−II</sup>", salt:"thiosírany S₂O₃²⁻ (fixírka)",
  st:"volná kyselina nestálá, soli zcela stálé",
  say:"Síran, kterému jeden kyslík nahradila <b>thio‑skupina</b> S⁻ᴵᴵ. Středová síra si drží +VI. Průměr +II nic neříká — jsou to dvě různé síry. Kyselinou se rozloží: <span class=\"chem\">S₂O₃²⁻ + 2 H⁺ → S + SO₂ + H₂O</span>."},
 {id:"h2s2o4",f:"H₂S₂O₄", n:"kyselina dithioničitá",  fam:"ss",  ox:"formálně S<sup>III</sup>", salt:"dithioničitany S₂O₄²⁻",
  st:"volná kyselina neexistuje, jen soli",
  say:"Vazba S–S mezi dvěma sírami, každá se dvěma kyslíky. Dithioničitan sodný Na₂S₂O₄ je <b>mimořádně silné redukční činidlo</b> — bělí buničinu a&nbsp;redukuje kypová barviva v&nbsp;textilním průmyslu."},
 {id:"h2sno6",f:"H₂SₙO₆", n:"kyseliny polythionové",  fam:"ss",  ox:"nelze rozumně určit", salt:"polythionany (n = 2 až 6)",
  st:"stálé v roztoku a ve formě solí",
  say:"Řetězec dvou až šesti atomů síry zakončený dvěma skupinami SO₃. Nejznámější je <b>tetrathionan</b> S₄O₆²⁻, produkt jodometrické titrace thiosíranem. Oxidační čísla by tu vyšla zlomková a&nbsp;nemají obsah."},
 {id:"h2so5", f:"H₂SO₅",  n:"kyselina peroxosírová", fam:"per", ox:"S<sup>VI</sup>", salt:"peroxosírany (nestálé)",
  st:"stálá krystalická látka",
  say:"Kyselina sírová, které jeden kyslík nahradila <b>peroxo skupina −O−O−</b>. Říká se jí Carova kyselina. Silná, jednosytná, výrazně oxidační; ve vodě se rozpadá zpět na H₂SO₄ a&nbsp;H₂O₂."},
 {id:"h2s2o8",f:"H₂S₂O₈", n:"kyselina peroxodisírová",fam:"per", ox:"S<sup>VI</sup>", salt:"peroxodisírany S₂O₈²⁻ (stálé, technicky významné)",
  st:"stálá krystalická látka",
  say:"Dva tetraedry spojené <b>peroxidovým můstkem</b>. Peroxodisíran je jedno z&nbsp;nejsilnějších dostupných oxidovadel (<span class=\"q\">E</span>° = +2,01 V) — se stříbrem jako katalyzátorem převede Mn²⁺ až na manganistan. Používá se v&nbsp;bělicích a&nbsp;pracích prostředcích a&nbsp;při leptání plošných spojů."}
];
var FAMLBL = {sam:"samostatná", sir:"rodina kyseliny sírové (můstek −O−)", ss:"kyseliny s vazbou S−S", per:"peroxokyseliny (můstek −O−O−)"};
var FAMCOL = {sam:"var(--cat1)", sir:"var(--accent)", ss:"var(--cat3)", per:"var(--cat4)"};

/* trenažér: zředěná vs koncentrovaná H₂SO₄ */
var SAD = [
 {q:"Zinek + <b>zředěná</b> H₂SO₄", o:["ZnSO₄ + H₂","ZnSO₄ + SO₂ + H₂O","reakce neproběhne","ZnS + H₂O"], c:0,
  e:"Zředěná kyselina sírová je „obyčejná“ silná kyselina: oxidačním činidlem je v&nbsp;ní <b>proton</b>. Zinek stojí v&nbsp;řadě nad vodíkem, takže ho vytěsní. <span class=\"chem\">Zn + H₂SO₄ → ZnSO₄ + H₂</span>"},
 {q:"Měď + <b>zředěná</b> H₂SO₄", o:["CuSO₄ + H₂","CuSO₄ + SO₂ + H₂O","reakce prakticky neproběhne","CuO + SO₂"], c:2,
  e:"Měď je ušlechtilá (<span class=\"q\">E</span>° = +0,34 V), vodík z&nbsp;kyseliny nevytěsní. Zředěná kyselina na ni nemá čím zaútočit. Nejlákavější chyba je nabídka s&nbsp;SO₂ — ta platí až pro <b>horkou koncentrovanou</b> kyselinu."},
 {q:"Měď + <b>horká koncentrovaná</b> H₂SO₄", o:["CuSO₄ + H₂","CuS + H₂O","reakce neproběhne","CuSO₄ + SO₂ + H₂O"], c:3,
  e:"Tady už oxiduje <b>síran</b>, ne proton: S<sup>VI</sup> → S<sup>IV</sup>. <span class=\"chem\">Cu + 2 H₂SO₄ → CuSO₄ + SO₂ + 2 H₂O</span>. Vodík nevzniká nikdy — to je typická past."},
 {q:"Sacharóza + <b>koncentrovaná</b> H₂SO₄", o:["rozpustí se beze změny","zuhelnatí na černou pěnu","vznikne CO₂ a H₂O","vznikne kyselina octová"], c:1,
  e:"Koncentrovaná kyselina odnímá vodu i&nbsp;z&nbsp;látek, které ji volnou neobsahují — vytrhne z&nbsp;cukru vodík a&nbsp;kyslík v&nbsp;poměru vody: <span class=\"chem\">C₁₂H₂₂O₁₁ → 12 C + 11 H₂O</span>. Zůstane černý uhlík, který vzniklá pára nadzvedne do „hada“."},
 {q:"Ředění: co nalévám do čeho?", o:["kyselinu do vody, po malých dávkách, mícháme","vodu do kyseliny naráz","je to jedno","vodu do kyseliny po kapkách"], c:0,
  e:"Rozpouštěcí teplo je asi −95 kJ na mol kyseliny. Nalitá voda by se na hladině husté kyseliny okamžitě přehřála nad 100 °C a&nbsp;vystříkla i&nbsp;s&nbsp;kyselinou. <b>Kyselinu do vody</b> — velká masa vody teplo pobere."},
 {q:"Železná cisterna na koncentrovanou H₂SO₄ — proč vydrží?", o:["kyselina se železem nereaguje vůbec","železo se pasivuje vrstvičkou síranu a oxidu","cisterna je uvnitř skleněná","kyselina je za studena inertní ke všem kovům"], c:1,
  e:"Studená koncentrovaná kyselina sírová (a&nbsp;stejně tak dusičná) <b>pasivuje</b> železo, hliník i&nbsp;chrom — vytvoří na povrchu souvislou nepropustnou vrstvičku. Zředěná kyselina by ocel rozpustila okamžitě."},
 {q:"Uhlík + <b>horká koncentrovaná</b> H₂SO₄", o:["nereaguje","CO₂ + SO₂ + H₂O","CS₂ + H₂O","CO + H₂"], c:1,
  e:"Koncentrovaná kyselina oxiduje i&nbsp;nekovy: <span class=\"chem\">C + 2 H₂SO₄ → CO₂ + 2 SO₂ + 2 H₂O</span>. Uhlík jde z&nbsp;0 na +IV, síra ze +VI na +IV."},
 {q:"Bromid draselný + <b>koncentrovaná</b> H₂SO₄ — proč se takhle nepřipravuje HBr?", o:["HBr je plyn a unikne","kyselina bromid zoxiduje na Br₂","reakce je příliš pomalá","vznikne pevný KHSO₄, který reakci zastaví"], c:1,
  e:"Bromid a&nbsp;jodid jsou dost silná redukční činidla na to, aby je koncentrovaná kyselina sírová zoxidovala na halogen. Produkt je hnědý brom, ne čistý HBr. Proto se pro přípravu HBr a&nbsp;HI používá <b>kyselina fosforečná</b>, která oxidační účinky nemá."},
 {q:"Sulfan + <b>koncentrovaná</b> H₂SO₄", o:["S + SO₂ + H₂O","H₂S rozpustí beze změny","SO₃ + H₂O","H₂SO₃ + H₂"], c:0,
  e:"Setkají se síra ve stavu −II (redukovadlo) a&nbsp;+VI (oxidovadlo) a&nbsp;dojde k&nbsp;<b>synproporcionaci</b>: <span class=\"chem\">H₂S + H₂SO₄ → S + SO₂ + 2 H₂O</span>. Zkumavka se zakalí vyloučenou sírou."},
 {q:"Zředěná H₂SO₄ v autobaterii má koncentraci asi", o:["18 mol·dm⁻³","0,1 mol·dm⁻³","5 mol·dm⁻³","1 mol·dm⁻³"], c:2,
  e:"Elektrolyt olověného akumulátoru je zhruba 37% roztok s&nbsp;hustotou 1,28 g·cm⁻³, tedy asi <b>4,8 mol·dm⁻³</b>. Hodnota 18 mol·dm⁻³ patří koncentrované (98%) kyselině, kterou by baterie nepřežila."}
];

/* selen, tellur, polonium — karty */
var STP = [
 {id:"se", s:"Se", n:"Selen", sub:"Z = 34 · polokov · esenciální stopový prvek",
  mods:"červený α a β (kruhy Se₈, jednoklonné) · <b>šedý</b> (spirálové řetězce, nejstálejší) · sklovitý (amorfní)",
  src:"anodové kaly z elektrolytické rafinace mědi; kaly z čištění SO₂ při výrobě H₂SO₄",
  now:"odbarvování a barvení skla (rubínové sklo se Se/CdS), pigmenty, fotovoltaika CIGS, doplňky stravy, legování oceli",
  then:"selenové fotočlánky, expozimetry, usměrňovače, selenový buben v kopírkách (xerografie) — dnes nahrazeno křemíkem a čipy CMOS",
  bio:"Je součástí <b>selenocysteinu</b>, tzv. 21. aminokyseliny, a&nbsp;enzymu glutathionperoxidasy, který v&nbsp;buňkách likviduje peroxidy. Doporučená denní dávka je asi <b>55 µg</b>, nad zhruba 400 µg denně už hrozí otrava (selenóza, česnekový dech). Rozmezí mezi „potřebný“ a&nbsp;„jedovatý“ je u&nbsp;selenu mimořádně úzké.",
  chem:"H₂SeO₃ je slabší kyselina než H₂SO₃, ale <b>silnější oxidovadlo</b>. H₂SeO₄ je tak silné oxidovadlo, že směs s&nbsp;HCl rozpouští zlato a&nbsp;platinu — to kyselina sírová nedokáže."},
 {id:"te", s:"Te", n:"Tellur", sub:"Z = 52 · polokov · polovodič",
  mods:"jediná stálá forma: <b>spirálové řetězce</b> atomů, stříbrolesklý křehký krystal s částečně kovovou vazbou",
  src:"anodové kaly po rafinaci mědi (po oddělení selenu); vzácné minerály — telluridy zlata (calaverit AuTe₂)",
  now:"CdTe tenkovrstvá fotovoltaika, termoelektrické články Bi₂Te₃ (chladicí boxy), přepisovatelná optická média GeSbTe, zlepšení obrobitelnosti oceli a mědi",
  then:"legování olova v akumulátorech a kabelových pláštích",
  bio:"Sloučeniny telluru se v&nbsp;těle methylují na dimethyltellurid, který zapáchá po česneku. Stopové množství stačí, aby člověk „páchl“ celé týdny.",
  chem:"Kyselina hexahydrogentellurová <b>H₆TeO₆ je oktaedrická</b>, ne tetraedrická jako H₂SO₄ a&nbsp;H₂SeO₄. Kolem většího atomu telluru se prostě vejde šest skupin OH. Je to velmi slabá kyselina — nejlepší doklad, že u&nbsp;chalkogenů neplatí prostá analogie."},
 {id:"po", s:"Po", n:"Polonium", sub:"Z = 84 · kov · radioaktivní",
  mods:"α‑Po je <b>jediný prvek s prostou krychlovou mřížkou</b> za standardních podmínek; nad 36 °C přechází na klencovou",
  src:"uranový smolinec (asi 0,1 mg na tunu); prakticky se vyrábí ozařováním ²⁰⁹Bi neutrony v reaktoru",
  now:"antistatické štětce a ionizátory, zdroje neutronů (Po‑Be), tepelné zdroje pro sondy",
  then:"tepelný zdroj sovětských Lunochodů; iniciátory prvních jaderných zbraní",
  bio:"²¹⁰Po je čistý <b>α zářič</b> s&nbsp;poločasem 138,4 dne. Vně těla neškodí (α se zastaví v&nbsp;papíře), uvnitř je to jeden z&nbsp;nejjedovatějších materiálů vůbec — smrtelná dávka je pod jeden mikrogram. Tímto způsobem byl v&nbsp;roce 2006 otráven Alexandr Litviněnko.",
  chem:"Objevili ho Marie a&nbsp;Pierre Curieovi v&nbsp;roce 1898 a&nbsp;pojmenovali podle Polska. Jeden gram ²¹⁰Po má aktivitu asi <b>166 TBq</b> a&nbsp;uvolňuje <b>141 W</b> tepla — sám se rozžhaví na několik set stupňů."}
];

/* emise SO₂ v ČR — orientační hodnoty podle emisních inventur (kt/rok) */
var EMIS = [
 {y:1990, v:1876}, {y:1993, v:1419}, {y:1996, v:946}, {y:1998, v:439},
 {y:2000, v:264},  {y:2005, v:219},  {y:2010, v:171}, {y:2015, v:133}, {y:2020, v:96}
];

/* konstanty pro kontaktní proces (2 SO₂ + O₂ ⇌ 2 SO₃) */
var CPdH = -197800;      /* J·mol⁻¹ */
var CPdS = -187.95;      /* J·K⁻¹·mol⁻¹ */
var RGAS = 8.314463;
