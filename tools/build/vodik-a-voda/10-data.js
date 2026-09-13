/* ============================================================
   1 · DATA — tabulkové hodnoty pro celé téma
   Zdroje hodnot: CRC Handbook, Atkins (české vydání), Chemické tabulky.
   Elektronegativity Paulingovy, teploty ve °C, energie v kJ·mol⁻¹,
   délky vazeb v pm, potenciály vůči SHE při 25 °C.
   ============================================================ */

var VMOL   = 22.414;      /* dm³·mol⁻¹ za normálních podmínek (0 °C, 101,325 kPa) */
var FARAD  = 96485;       /* C·mol⁻¹ */
var MH2    = 2.016;       /* g·mol⁻¹ */
var MH2O   = 18.015;      /* g·mol⁻¹ */
var MCAO   = 56.077;      /* g·mol⁻¹ — přepočet na německé stupně */
var MCACO3 = 100.09;      /* g·mol⁻¹ */
var MCA    = 40.078;
var MMG    = 24.305;
var MH2O2  = 34.015;

/* --- srovnání vodíku s 1. a 17. skupinou (kap. 0) ----------------------- */
var SROV = [
  {id:"H",  el:"H",  grp:"H",  kf:"1s¹",       ie:1312, ea:72.8, en:2.20, rk:31,  rion:"H⁻ 146 pm", tv:-252.9, note:"Vodík sám: ionizační energie skoro trojnásobná proti lithiu, elektronová afinita čtvrtinová proti fluoru."},
  {id:"Li", el:"Li", grp:"1",  kf:"[He] 2s¹",  ie:520,  ea:59.6, en:0.98, rk:128, rion:"Li⁺ 76 pm", tv:1342,  note:"Lithium elektron ochotně ztrácí — proto je to kov. Vodík ne."},
  {id:"Na", el:"Na", grp:"1",  kf:"[Ne] 3s¹",  ie:496,  ea:52.9, en:0.93, rk:166, rion:"Na⁺ 102 pm",tv:883,   note:"Typický alkalický kov: nízká ionizační energie, malá elektronegativita."},
  {id:"K",  el:"K",  grp:"1",  kf:"[Ar] 4s¹",  ie:419,  ea:48.4, en:0.82, rk:203, rion:"K⁺ 138 pm", tv:759,   note:"Nejnižší ionizační energie z porovnávané pětice."},
  {id:"F",  el:"F",  grp:"17", kf:"[He] 2s²2p⁵",ie:1681,ea:328,  en:3.98, rk:64,  rion:"F⁻ 133 pm", tv:-188.1,note:"Halogen: obrovská elektronová afinita, elektron rve k sobě."},
  {id:"Cl", el:"Cl", grp:"17", kf:"[Ne] 3s²3p⁵",ie:1251,ea:349,  en:3.16, rk:99,  rion:"Cl⁻ 181 pm",tv:-34.0, note:"Největší elektronová afinita ze všech prvků vůbec."}
];

/* --- izotopy vodíku (kap. 1) -------------------------------------------- */
var IZO = [
  {id:"H", nuk:"¹H", nm:"protium",   z:1, n:0, ar:1.007825, zast:"99,9885 %",
   stab:"stabilní", vyu:"Naprostá většina vodíku ve vesmíru i v každé molekule vody, kterou vypijete.",
   det:"Jádro je jediný proton — nemá vůbec žádný neutron. To je mezi všemi nuklidy unikát."},
  {id:"D", nuk:"²H", nm:"deuterium", z:1, n:1, ar:2.014102, zast:"0,0115 %",
   stab:"stabilní", vyu:"Těžká voda D₂O jako moderátor v jaderných reaktorech, značení molekul v NMR a IČ spektroskopii, deuterovaná rozpouštědla (CDCl₃, D₂O), studium reakčních mechanismů.",
   det:"Jediný izotop s vlastním jménem i vlastní značkou (D). Dvakrát těžší než protium — proto největší izotopový efekt v celé chemii."},
  {id:"T", nuk:"³H", nm:"tritium",   z:1, n:2, ar:3.016049, zast:"stopy (asi 1 atom na 10¹⁸ atomů H)",
   stab:"radioaktivní, β⁻, poločas 12,32 roku",
   vyu:"Samosvítící značení (nouzové východy, ciferníky), radioaktivní stopovač, palivo pro termojadernou fúzi (reakce D + T), datování mladých podzemních vod.",
   det:"Rozpadá se na ³He s velmi měkkým zářením β⁻ (maximální energie 18,6 keV) — neprojde ani listem papíru, nebezpečné je jen po vniknutí do těla."}
];

/* --- srovnání H₂O a D₂O (kap. 1 a 6) ------------------------------------ */
var TEZKA = [
  ["Molární hmotnost","18,02 g·mol⁻¹","20,03 g·mol⁻¹","D₂O je o 11,2 % těžší"],
  ["Teplota tání","0,00 °C","3,82 °C","těžká voda mrzne až skoro při čtyřech stupních"],
  ["Teplota varu","100,00 °C","101,4 °C","vodíkové můstky s deuteriem jsou o něco pevnější"],
  ["Hustota (25 °C)","0,9971 g·cm⁻³","1,1044 g·cm⁻³","kostka ledu z H₂O v D₂O klesne ke dnu"],
  ["Teplota maximální hustoty","3,98 °C","11,2 °C","anomálie je u obou, jen posunutá"],
  ["Iontový součin (25 °C)","1,0·10⁻¹⁴","1,35·10⁻¹⁵","pD neutrální D₂O je 7,43, ne 7,00"]
];

/* --- hydridy: prohledávatelná tabulka (kap. 5) --------------------------- */
/* t … typ vazby: i = iontový, k = kovalentní, m = kovový, x = komplexní
   ox … oxidační číslo vodíku, en … elektronegativita partnera,
   voda … chování vůči vodě, u … využití / poznámka                        */
var HYD = [
 {f:"LiH",   n:"hydrid lithný",        t:"i", ox:"−I", en:0.98, fyz:"bílá krystalická látka, t. t. 688 °C",
  voda:"LiH + H₂O → LiOH + H₂ (bouřlivě)", u:"Výchozí látka pro výrobu LiAlH₄, sušidlo, zdroj vodíku."},
 {f:"NaH",   n:"hydrid sodný",         t:"i", ox:"−I", en:0.93, fyz:"šedobílá pevná látka, rozklad nad 425 °C",
  voda:"NaH + H₂O → NaOH + H₂ (prudce, může se vznítit)", u:"Silná zásada v organické syntéze — odtrhává proton, sám se mění na H₂."},
 {f:"KH",    n:"hydrid draselný",      t:"i", ox:"−I", en:0.82, fyz:"bílá pevná látka, samozápalná na vzduchu",
  voda:"KH + H₂O → KOH + H₂ (velmi prudce)", u:"Ještě silnější zásada než NaH; manipuluje se s ním v suspenzi v oleji."},
 {f:"CaH₂",  n:"hydrid vápenatý",      t:"i", ox:"−I", en:1.00, fyz:"šedobílá krystalická látka, t. t. 816 °C",
  voda:"CaH₂ + 2 H₂O → Ca(OH)₂ + 2 H₂", u:"„Hydrolit“ — polní zdroj vodíku a nejběžnější sušidlo pro organická rozpouštědla."},
 {f:"BeH₂",  n:"hydrid beryllnatý",    t:"k", ox:"−I", en:1.57, fyz:"polymerní pevná látka, rozklad kolem 250 °C",
  voda:"reaguje pomalu, hydrolyzuje na Be(OH)₂ + H₂", u:"Přechod mezi iontovým a kovalentním: řetězec s třístředovými vazbami Be–H–Be."},
 {f:"MgH₂",  n:"hydrid hořečnatý",     t:"k", ox:"−I", en:1.31, fyz:"bílá pevná látka, rozklad nad 327 °C",
  voda:"MgH₂ + 2 H₂O → Mg(OH)₂ + 2 H₂", u:"Zkoumaný jako zásobník vodíku — obsahuje 7,6 % hmotnostních vodíku."},
 {f:"B₂H₆",  n:"diboran",              t:"k", ox:"−I/+I", en:2.04, fyz:"bezbarvý plyn, t. v. −92,5 °C, samozápalný",
  voda:"B₂H₆ + 6 H₂O → 2 H₃BO₃ + 6 H₂", u:"Učebnicový příklad elektronově deficitní molekuly se dvěma třístředovými vazbami B–H–B."},
 {f:"AlH₃",  n:"alan",                 t:"k", ox:"−I", en:1.61, fyz:"polymerní bílá pevná látka, rozklad nad 150 °C",
  voda:"prudká hydrolýza na Al(OH)₃ + H₂", u:"Polymerní kovalentní hydrid; meziprodukt při přípravě hydridových komplexů hliníku."},
 {f:"CH₄",   n:"methan",               t:"k", ox:"+I", en:2.55, fyz:"bezbarvý plyn, t. v. −161,5 °C",
  voda:"nereaguje (jen omezeně rozpustný)", u:"Zemní plyn — dnes hlavní surovina pro průmyslovou výrobu vodíku."},
 {f:"SiH₄",  n:"silan",                t:"k", ox:"+I", en:1.90, fyz:"bezbarvý plyn, t. v. −111,9 °C, samozápalný",
  voda:"v čisté vodě stálý, v zásadě se rozkládá", u:"Nanáší se z něj křemík na čipy a solární články (CVD)."},
 {f:"GeH₄",  n:"german",               t:"k", ox:"+I", en:2.01, fyz:"bezbarvý plyn, t. v. −88,5 °C",
  voda:"nereaguje", u:"Dopování polovodičů; méně reaktivní než silan."},
 {f:"SnH₄",  n:"stannan",              t:"k", ox:"+I", en:1.96, fyz:"plyn, t. v. −52 °C, rozkládá se už při 0 °C",
  voda:"nereaguje, ale sám se rozpadá", u:"Ukázka, jak stabilita hydridů 14. skupiny klesá směrem dolů."},
 {f:"NH₃",   n:"amoniak",              t:"k", ox:"+I", en:3.04, fyz:"bezbarvý plyn štiplavého zápachu, t. v. −33,3 °C",
  voda:"NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ (zásaditě)", u:"Nejdůležitější průmyslová sloučenina vodíku — hnojiva. Vodíkové můstky mu zvedají teplotu varu."},
 {f:"PH₃",   n:"fosfan",               t:"k", ox:"+I", en:2.19, fyz:"jedovatý plyn, t. v. −87,7 °C",
  voda:"prakticky nerozpustný, nereaguje", u:"Bez vodíkových můstků — proto vře o 54 °C níž než amoniak."},
 {f:"AsH₃",  n:"arsan",                t:"k", ox:"+I", en:2.18, fyz:"velmi jedovatý plyn, t. v. −62,5 °C",
  voda:"nereaguje", u:"Marshova zkouška na arsen; dopování polovodičů."},
 {f:"H₂O",   n:"voda",                 t:"k", ox:"+I", en:3.44, fyz:"kapalina, t. v. 100 °C, t. t. 0 °C",
  voda:"je to voda", u:"Nejběžnější kovalentní hydrid. Vodíkové můstky jí zvedají teplotu varu o víc než 160 °C."},
 {f:"H₂S",   n:"sulfan",               t:"k", ox:"+I", en:2.58, fyz:"jedovatý plyn po zkažených vejcích, t. v. −60,3 °C",
  voda:"slabě kyselá reakce, H₂S ⇌ H⁺ + HS⁻", u:"Srovnávací dvojče vody: skoro stejná molekula, ale bez můstků a o 160 °C níž vře."},
 {f:"H₂Se",  n:"selan",                t:"k", ox:"+I", en:2.55, fyz:"jedovatý plyn, t. v. −41,3 °C",
  voda:"kyselejší než H₂S", u:"Kyselost v 16. skupině roste dolů, i když elektronegativita klesá."},
 {f:"H₂Te",  n:"tellan",               t:"k", ox:"+I", en:2.10, fyz:"jedovatý plyn, t. v. −2,2 °C",
  voda:"nejkyselejší z chalkogenovodíků", u:"Vazba Te–H je nejslabší, proto se proton uvolní nejsnáz."},
 {f:"HF",    n:"fluorovodík",          t:"k", ox:"+I", en:3.98, fyz:"kapalina, t. v. 19,5 °C",
  voda:"neomezeně mísitelný, slabá kyselina (pKₐ = 3,17)", u:"Nejpolárnější kovalentní vazba s vodíkem — a přesto pořád kovalentní, ne iontová."},
 {f:"HCl",   n:"chlorovodík",          t:"k", ox:"+I", en:3.16, fyz:"bezbarvý plyn, t. v. −85,1 °C",
  voda:"silná kyselina, úplná disociace", u:"Kyselina chlorovodíková; ve vodě je silnější kyselinou než HF, i když má slabší polární vazbu."},
 {f:"HBr",   n:"bromovodík",           t:"k", ox:"+I", en:2.96, fyz:"plyn, t. v. −66,8 °C",
  voda:"silná kyselina", u:"Vzniká pomalu a vratně, na rozdíl od explozivní syntézy HCl."},
 {f:"HI",    n:"jodovodík",            t:"k", ox:"+I", en:2.66, fyz:"plyn, t. v. −35,4 °C",
  voda:"nejsilnější z halogenovodíkových kyselin", u:"Snadno se oxiduje — ale to je vlastnost jodidu, ne vodíku."},
 {f:"TiH₂",  n:"hydrid titanu",        t:"m", ox:"−I", en:1.54, fyz:"šedý kovový prášek, vodivý",
  voda:"stálý", u:"Nadouvadlo do pěnových kovů, prášková metalurgie, zdroj vodíku při zahřátí."},
 {f:"ZrH₂",  n:"hydrid zirkonia",      t:"m", ox:"−I", en:1.33, fyz:"kovová pevná látka",
  voda:"stálý", u:"Moderátor neutronů v kompaktních reaktorech."},
 {f:"PdHx",  n:"hydrid palladia",      t:"m", ox:"−I", en:2.20, fyz:"kovový, nestechiometrický (x až 0,7)",
  voda:"stálý", u:"Palladium pohltí několikasetnásobek svého objemu vodíku — základ membrán na čištění vodíku."},
 {f:"LaNi₅H₆",n:"intermetalický hydrid",t:"m",ox:"−I", en:1.10, fyz:"kovová slitina pohlcující vodík",
  voda:"stálý", u:"Záporná elektroda NiMH akumulátorů a klasický zásobník vodíku."},
 {f:"UH₃",   n:"hydrid uranu",         t:"m", ox:"−I", en:1.38, fyz:"černý prášek, rozklad kolem 300 °C",
  voda:"reaguje", u:"Zdroj velmi čistého vodíku: zahřátím se rozloží zpět na kov a H₂."},
 {f:"LiAlH₄",n:"tetrahydridohlinitan lithný", t:"x", ox:"−I", en:1.61, fyz:"bílá krystalická látka, rozklad nad 125 °C",
  voda:"LiAlH₄ + 4 H₂O → LiOH + Al(OH)₃ + 4 H₂ (explozivně)", u:"Nejsilnější běžné hydridové redukční činidlo. Jen v etheru nebo THF, nikdy ne ve vodě."},
 {f:"NaBH₄", n:"tetrahydridoboritan sodný",   t:"x", ox:"−I", en:2.04, fyz:"bílá krystalická látka, stálá do 400 °C",
  voda:"v zásadité vodě stálý, v kyselé NaBH₄ + 2 H₂O → NaBO₂ + 4 H₂", u:"Mírné a selektivní redukční činidlo — redukuje aldehydy a ketony, estery ne. Lze použít i vodné roztoky."},
 {f:"LiBH₄", n:"tetrahydridoboritan lithný",  t:"x", ox:"−I", en:2.04, fyz:"bílá látka, t. t. 275 °C",
  voda:"pomalá hydrolýza", u:"Silnější než NaBH₄, slabší než LiAlH₄ — hodí se, když je NaBH₄ málo a LiAlH₄ moc."},
 {f:"NaAlH₄",n:"tetrahydridohlinitan sodný",  t:"x", ox:"−I", en:1.61, fyz:"bílá pevná látka",
  voda:"prudká hydrolýza", u:"Zkoumaný zásobník vodíku — s katalyzátorem vodík uvolňuje a zase přijímá."},
 {f:"[ReH₉]²⁻",n:"nonahydridorhenistan",      t:"x", ox:"−I", en:1.90, fyz:"aniont v solích, koordinační číslo 9",
  voda:"stálý v zásaditém prostředí", u:"Rekord v počtu hydridových ligandů na jednom atomu kovu."},
 {f:"[FeH(CO)₄]⁻",n:"hydridotetrakarbonylželeznatan", t:"x", ox:"−I", en:1.83, fyz:"aniont ve smíšeném komplexu",
  voda:"rozkládá se", u:"Smíšený hydridový komplex — H⁻ vedle jiných ligandů. Podobné látky katalyzují hydrogenace."}
];

/* --- mapa typů hydridů v periodické tabulce (kap. 5) --------------------- */
/* [značka, sloupec 1..18, perioda 1..6, typ] ; typ: i, k, m, p = přechodná oblast, x = netvoří */
var HMAP = [
 ["H",1,1,"h"],["He",18,1,"x"],
 ["Li",1,2,"i"],["Be",2,2,"p"],["B",13,2,"k"],["C",14,2,"k"],["N",15,2,"k"],["O",16,2,"k"],["F",17,2,"k"],["Ne",18,2,"x"],
 ["Na",1,3,"i"],["Mg",2,3,"p"],["Al",13,3,"k"],["Si",14,3,"k"],["P",15,3,"k"],["S",16,3,"k"],["Cl",17,3,"k"],["Ar",18,3,"x"],
 ["K",1,4,"i"],["Ca",2,4,"i"],["Sc",3,4,"m"],["Ti",4,4,"m"],["V",5,4,"m"],["Cr",6,4,"m"],["Mn",7,4,"m"],["Fe",8,4,"m"],
 ["Co",9,4,"m"],["Ni",10,4,"m"],["Cu",11,4,"m"],["Zn",12,4,"p"],["Ga",13,4,"k"],["Ge",14,4,"k"],["As",15,4,"k"],["Se",16,4,"k"],["Br",17,4,"k"],["Kr",18,4,"x"],
 ["Rb",1,5,"i"],["Sr",2,5,"i"],["Y",3,5,"m"],["Zr",4,5,"m"],["Nb",5,5,"m"],["Mo",6,5,"m"],["Tc",7,5,"m"],["Ru",8,5,"m"],
 ["Rh",9,5,"m"],["Pd",10,5,"m"],["Ag",11,5,"m"],["Cd",12,5,"p"],["In",13,5,"p"],["Sn",14,5,"k"],["Sb",15,5,"k"],["Te",16,5,"k"],["I",17,5,"k"],["Xe",18,5,"x"],
 ["Cs",1,6,"i"],["Ba",2,6,"i"],["La",3,6,"m"],["Hf",4,6,"m"],["Ta",5,6,"m"],["W",6,6,"m"],["Re",7,6,"m"],["Os",8,6,"m"],
 ["Ir",9,6,"m"],["Pt",10,6,"m"],["Au",11,6,"m"],["Hg",12,6,"p"],["Tl",13,6,"p"],["Pb",14,6,"k"],["Bi",15,6,"k"],["Po",16,6,"k"],["At",17,6,"k"],["Rn",18,6,"x"]
];
var HMAPT = {
  h:{lab:"vodík sám", c:"var(--accent)", d:"Vodík je zároveň partnerem i vázaným atomem — H₂ je jeho vlastní „hydrid“."},
  i:{lab:"iontové hydridy", c:"var(--exo)", d:"Mřížka z kationtů kovu a aniontů H⁻. Jen alkalické kovy a těžší kovy alkalických zemin, tedy tam, kde je rozdíl elektronegativit největší."},
  k:{lab:"kovalentní hydridy", c:"var(--endo)", d:"Vodík má oxidační číslo +I a je vázaný polární kovalentní vazbou. Nekovy, polokovy a některé nepřechodné kovy."},
  m:{lab:"kovové hydridy", c:"var(--cat2)", d:"Vodík se svým orbitalem 1s zapojí do delokalizované kovové vazby. Složení bývá nestechiometrické, látky vedou proud."},
  p:{lab:"přechodná oblast", c:"var(--cat3)", d:"Vazba je na rozhraní typů — polymerní struktury s třístředovými vazbami (Be, Mg) nebo přechod ke kovalentním polymerům (Zn, Cd, Hg, In, Tl)."},
  x:{lab:"hydridy netvoří", c:"var(--ink-3)", d:"Vzácné plyny mají uzavřenou konfiguraci a s vodíkem se neslučují."}
};

/* --- teploty varu hydridů 14.–17. skupiny (kap. 5 a 6) ------------------- */
var BODY = {
  g14:{lab:"14. skupina (CH₄, SiH₄ …)", c:"var(--cat1)",
       d:[["CH₄",2,-161.5],["SiH₄",3,-111.9],["GeH₄",4,-88.5],["SnH₄",5,-52.0]],
       note:"Bez vodíkových můstků. Teplota varu roste plynule s molární hmotností — přesně tak, jak by to měl dělat každý neasociovaný hydrid."},
  g15:{lab:"15. skupina (NH₃, PH₃ …)", c:"var(--cat2)",
       d:[["NH₃",2,-33.3],["PH₃",3,-87.7],["AsH₃",4,-62.5],["SbH₃",5,-17.0]],
       note:"Amoniak vyskočí o 54 °C nad fosfan. Dusík je dost elektronegativní na vodíkové můstky — ale má jen jeden volný pár, takže jich je méně než u vody."},
  g16:{lab:"16. skupina (H₂O, H₂S …)", c:"var(--accent)",
       d:[["H₂O",2,100.0],["H₂S",3,-60.3],["H₂Se",4,-41.3],["H₂Te",5,-2.2]],
       note:"Nejdramatičtější skok: podle trendu ostatních tří by voda měla vřít asi při −80 °C. Vodíkové můstky jí přidají zhruba 180 °C — a proto je na Zemi kapalná."},
  g17:{lab:"17. skupina (HF, HCl …)", c:"var(--cat3)",
       d:[["HF",2,19.5],["HCl",3,-85.1],["HBr",4,-66.8],["HI",5,-35.4]],
       note:"Fluorovodík má nejsilnější jednotlivý můstek ze všech, ale na molekulu připadá jen jeden atom vodíku — proto vře „jen“ při 19,5 °C, ne při sto."}
};

/* --- hustota kapalné vody a ledu podle teploty (kap. 6) ------------------ */
var HUST = [
 [-10,998.12],[-8,998.60],[-6,999.02],[-4,999.36],[-2,999.64],[0,999.84],[1,999.90],[2,999.94],
 [3,999.96],[4,999.97],[5,999.97],[6,999.94],[8,999.85],[10,999.70],[12,999.50],[15,999.10],
 [18,998.60],[20,998.21],[25,997.05],[30,995.65],[35,994.03],[40,992.22],[50,988.04],[60,983.20],
 [70,977.76],[80,971.79],[90,965.31],[100,958.35]
];
var HUSTLED = 916.7;   /* kg·m⁻³, led I při 0 °C */

/* --- iontový součin vody podle teploty (kap. 7) -------------------------- */
var KWTAB = [[0,14.94],[10,14.53],[20,14.17],[25,14.00],[30,13.83],[40,13.53],[50,13.26],[60,13.02],[80,12.60],[100,12.26]];

/* --- způsoby přípravy a výroby vodíku (kap. 4) --------------------------- */
var VYR = [
 {id:"smr", kat:"průmysl", nm:"Parní reforming zemního plynu",
  eq:"CH₄ + H₂O → CO + 3 H₂ &nbsp;&nbsp;pak&nbsp;&nbsp; CO + H₂O → CO₂ + H₂",
  sum:"CH₄ + 2 H₂O → CO₂ + 4 H₂",
  dh:"+206 a −41 kJ·mol⁻¹ (celkem +165)", pod:"700–1000 °C, 1,5–3 MPa, katalyzátor Ni na Al₂O₃",
  vst:["zemní plyn","vodní pára","teplo (spalováním části plynu)"], vyst:["H₂ (surový)","CO₂"],
  podil:"asi 60 % světové výroby", co2:"9–12 kg CO₂ na 1 kg H₂", barva:"šedý",
  pozn:"Dominantní technologie. Endotermický reforming se platí spálením části vstupního plynu; konverze vodního plynu pak z oxidu uhelnatého vytáhne ještě jednu molekulu vodíku navíc a je exotermická."},
 {id:"gas", kat:"průmysl", nm:"Zplyňování uhlí (vodní plyn)",
  eq:"C + H₂O → CO + H₂ &nbsp;&nbsp;pak&nbsp;&nbsp; CO + H₂O → CO₂ + H₂",
  sum:"C + 2 H₂O → CO₂ + 2 H₂",
  dh:"+131 kJ·mol⁻¹ pro první krok", pod:"asi 1000 °C, rozžhavený koks a přehřátá pára",
  vst:["koks nebo uhlí","vodní pára"], vyst:["vodní plyn: CO + H₂","po konverzi CO₂"],
  podil:"asi 19 % světové výroby (hlavně Čína)", co2:"18–20 kg CO₂ na 1 kg H₂", barva:"černý / hnědý",
  pozn:"Historicky první velkovýroba. Vodní plyn obsahuje kolem 50 % vodíku, ale hoří modrým, nesvítivým plamenem a je jedovatý kvůli CO. Uhlíková stopa je z běžných cest nejhorší."},
 {id:"ele", kat:"průmysl", nm:"Elektrolýza vody",
  eq:"katoda: 2 H₂O + 2 e⁻ → H₂ + 2 OH⁻ &nbsp;·&nbsp; anoda: 4 OH⁻ → O₂ + 2 H₂O + 4 e⁻",
  sum:"2 H₂O → 2 H₂ + O₂",
  dh:"+285,8 kJ·mol⁻¹ (rozklad kapalné vody)", pod:"1,8–2,0 V na článek, elektrolyt KOH nebo membrána, 60–80 °C",
  vst:["demineralizovaná voda","elektřina"], vyst:["H₂ o čistotě nad 99,9 %","O₂"],
  podil:"asi 0,1 % světové výroby (rychle roste)", co2:"0 při použití bezemisní elektřiny", barva:"zelený (z obnovitelných zdrojů)",
  pozn:"Jediná cesta, která nepotřebuje fosilní surovinu. Teoretické napětí je 1,23 V, prakticky 1,8–2,0 V, takže na kilogram vodíku padne kolem 50 kWh elektřiny."},
 {id:"chl", kat:"průmysl", nm:"Vodík jako vedlejší produkt chloralkalické elektrolýzy",
  eq:"katoda: 2 H₂O + 2 e⁻ → H₂ + 2 OH⁻ &nbsp;·&nbsp; anoda: 2 Cl⁻ → Cl₂ + 2 e⁻",
  sum:"2 NaCl + 2 H₂O → 2 NaOH + Cl₂ + H₂",
  dh:"proces je silně endergonický, žene ho elektřina", pod:"membránová elektrolýza solanky, 3–4 V, 80–90 °C",
  vst:["solanka NaCl","elektřina"], vyst:["NaOH","Cl₂","H₂"],
  podil:"jednotky procent, ale velmi čistý", co2:"podle zdroje elektřiny", barva:"vedlejší produkt",
  pozn:"Vodík se tu nevyrábí, jen padá jako třetí produkt při výrobě hydroxidu a chloru. Dřívější amalgámová varianta se rtutí je v Evropské unii od roku 2017 zakázaná."},
 {id:"pyr", kat:"průmysl", nm:"Pyrolýza metanu",
  eq:"CH₄ → C + 2 H₂", sum:"CH₄ → C + 2 H₂",
  dh:"+75 kJ·mol⁻¹", pod:"1000–1200 °C, roztavený kov nebo katalyzátor",
  vst:["zemní plyn","teplo"], vyst:["H₂","pevný uhlík (saze)"],
  podil:"zatím pilotní provozy", co2:"uhlík odchází pevný, ne jako CO₂", barva:"tyrkysový",
  pozn:"Uhlík z metanu se nespálí na CO₂, ale zůstane jako prodejné saze. Vzniknou jen dvě molekuly vodíku místo čtyř, zato bez plynné emise."},
 {id:"zn", kat:"laboratoř", nm:"Neušlechtilý kov a zředěná kyselina",
  eq:"Zn + 2 HCl → ZnCl₂ + H₂", sum:"Zn + H₂SO₄ → ZnSO₄ + H₂",
  dh:"exotermická", pod:"laboratorní teplota, Kippův přístroj",
  vst:["granulovaný zinek","zředěná HCl nebo H₂SO₄"], vyst:["H₂","sůl zinku"],
  podil:"jen laboratoř", co2:"—", barva:"—",
  pozn:"Klasika školní laboratoře. Musí to být kov se záporným standardním potenciálem — měď nebo stříbro vodík z kyseliny nevytěsní. Kyselina nesmí být oxidující: s HNO₃ vzniká NO, ne vodík."},
 {id:"ca", kat:"laboratoř", nm:"Iontový hydrid a voda",
  eq:"CaH₂ + 2 H₂O → Ca(OH)₂ + 2 H₂", sum:"H⁻ + H₃O⁺ → H₂ + H₂O",
  dh:"silně exotermická", pod:"stačí přikapávat vodu",
  vst:["CaH₂ (hydrolit)","voda"], vyst:["H₂","Ca(OH)₂"],
  podil:"polní a nouzové zdroje", co2:"—", barva:"—",
  pozn:"Nejelegantnější způsob: oba atomy vodíku ve vzniklé molekule H₂ pocházejí odjinud. Jeden byl H⁻ (oxidační číslo −I), druhý H⁺ z vody (+I) — je to synproporcionace."},
 {id:"na", kat:"laboratoř", nm:"Alkalický kov a voda",
  eq:"2 Na + 2 H₂O → 2 NaOH + H₂", sum:"Ca + 2 H₂O → Ca(OH)₂ + H₂",
  dh:"silně exotermická", pod:"okamžitě za studena",
  vst:["sodík nebo vápník","voda"], vyst:["H₂","hydroxid"],
  podil:"jen ukázka", co2:"—", barva:"—",
  pozn:"Efektní, ale jako zdroj vodíku nepoužitelný — reakce je nezvladatelná a uvolněné teplo vodík zapálí. Tady se voda chová jako oxidační činidlo."},
 {id:"uh", kat:"laboratoř", nm:"Tepelný rozklad hydridu přechodného kovu",
  eq:"2 UH₃ → 2 U + 3 H₂", sum:"TiH₂ → Ti + H₂",
  dh:"endotermická", pod:"zahřátí na 300–500 °C ve vakuu",
  vst:["hydrid kovu"], vyst:["velmi čistý H₂","kov"],
  podil:"tam, kde je potřeba extrémní čistota", co2:"—", barva:"—",
  pozn:"Kov vodík nejdřív pohltí a při zahřátí zase vydá. Vodík je pak čistý, protože nic jiného se z pevného kovu neuvolní — a děj jde opakovat."}
];

/* --- redoxní role vodíku: rozhodovač reakcí (kap. 3) --------------------- */
var REAK = [
 {id:"f2",  a:"H₂", b:"F₂",   eq:"H₂ + F₂ → 2 HF", role:"red",
  ox:"H: 0 → +I", pod:"probíhá i ve tmě a při −250 °C, explozivně",
  proc:"Fluor je nejsilnější oxidační činidlo vůbec. Vodík mu elektronovou hustotu odevzdá okamžitě, radikálovým řetězovým mechanismem, který nepotřebuje žádnou iniciaci."},
 {id:"cl2", a:"H₂", b:"Cl₂",  eq:"H₂ + Cl₂ → 2 HCl", role:"red",
  ox:"H: 0 → +I", pod:"směs je ve tmě zdánlivě stálá, po osvícení vybuchne (chlorovodíkový třaskavý plyn)",
  proc:"Radikálová řetězová reakce: světlo rozštěpí Cl₂ na dva radikály a ty spustí lavinu. Právě proto je směs bez iniciace stálá — jde o kinetickou, ne termodynamickou stabilitu."},
 {id:"br2", a:"H₂", b:"Br₂",  eq:"H₂ + Br₂ ⇌ 2 HBr", role:"red",
  ox:"H: 0 → +I", pod:"pomalu, za zvýšené teploty, reakce je vratná",
  proc:"Směrem dolů 17. skupinou klesá oxidační síla halogenu. U bromu už reakce není překotná a ustaví se rovnováha; u jodu je posunutá ještě víc doleva."},
 {id:"o2",  a:"H₂", b:"O₂",   eq:"2 H₂ + O₂ → 2 H₂O", role:"red",
  ox:"H: 0 → +I", pod:"po iniciaci plamenem, jiskrou nebo zahřátím — třaskavý plyn",
  proc:"Klasika: směs vodíku se vzduchem v poměru 4 až 75 objemových procent je výbušná a stačí jí 0,017 mJ energie. Spalné teplo je 285,8 kJ·mol⁻¹, tedy 142 MJ na kilogram — nejvíc ze všech paliv."},
 {id:"n2",  a:"H₂", b:"N₂",   eq:"N₂ + 3 H₂ ⇌ 2 NH₃", role:"red",
  ox:"H: 0 → +I", pod:"400–500 °C, 20–30 MPa, železný katalyzátor (Haberův–Boschův proces)",
  proc:"Technologicky nejdůležitější reakce vodíku vůbec — polovina světové produkce vodíku končí tady. Trojná vazba v N₂ je tak pevná (945 kJ·mol⁻¹), že se bez katalyzátoru nedá rozbít."},
 {id:"cuo", a:"H₂", b:"CuO",  eq:"CuO + H₂ → Cu + H₂O", role:"red",
  ox:"H: 0 → +I, Cu: +II → 0", pod:"zahřátí, průchod suchého vodíku nad oxidem",
  proc:"Školní důkaz redukčních účinků vodíku: černý oxid měďnatý zčervená a na chladnější části trubice se srazí voda. Vodík odebral kyslík — tedy zredukoval měď."},
 {id:"wo3", a:"H₂", b:"WO₃",  eq:"WO₃ + 3 H₂ → W + 3 H₂O", role:"red",
  ox:"H: 0 → +I, W: +VI → 0", pod:"800–1000 °C, průmyslová výroba wolframu",
  proc:"Takhle se opravdu vyrábí kovový wolfram na vlákna a na tvrdokovy. Uhlík by se použít nedal — vznikl by karbid wolframu, ne kov."},
 {id:"c2h4",a:"H₂", b:"C₂H₄", eq:"C₂H₄ + H₂ → C₂H₆", role:"red",
  ox:"H: 0 → +I, C se redukuje", pod:"katalyzátor Ni, Pd nebo Pt, mírná teplota a tlak",
  proc:"Hydrogenace dvojné vazby. Průmyslově se tak ztužují rostlinné oleje a v rafinériích se odsiřují a hydrokrakují ropné frakce. Katalyzátor musí vodík nejdřív rozštěpit na atomy — a to umí kovový hydrid na svém povrchu."},
 {id:"co",  a:"H₂", b:"CO",   eq:"CO + 2 H₂ → CH₃OH", role:"red",
  ox:"H: 0 → +I, C: +II → −II", pod:"250 °C, 5–10 MPa, katalyzátor Cu/ZnO/Al₂O₃",
  proc:"Ze syntézního plynu se dělá metanol — druhý největší chemický odběratel vodíku po amoniaku. Stejný plyn se dá Fischerovou–Tropschovou syntézou přeměnit na kapalná paliva."},
 {id:"na",  a:"H₂", b:"Na",   eq:"2 Na + H₂ → 2 NaH", role:"ox",
  ox:"H: 0 → −I, Na: 0 → +I", pod:"roztavený sodík sycený vodíkem při 300–400 °C",
  proc:"Jediný typ reakce, ve které elementární vodík vystupuje jako oxidační činidlo. Sodík je tak elektropozitivní, že mu vodík elektron vezme: H₂ + 2 e⁻ → 2 H⁻."},
 {id:"ca",  a:"H₂", b:"Ca",   eq:"Ca + H₂ → CaH₂", role:"ox",
  ox:"H: 0 → −I, Ca: 0 → +II", pod:"400–500 °C, přímá syntéza z prvků",
  proc:"Totéž s dvojmocným kovem. Že jde skutečně o anionty H⁻, dokazuje elektrolýza taveniny hydridu: vodík se vylučuje na anodě, tedy tam, kde probíhá oxidace."},
 {id:"ti",  a:"H₂", b:"Ti",   eq:"Ti + H₂ → TiH₂", role:"kov",
  ox:"formálně H: 0 → −I, prakticky delokalizovaná vazba", pod:"kovový titan pohlcuje vodík už od 300 °C",
  proc:"Přechodný kov vodík pohltí do své mřížky. Vazba není iontová ani prostě kovalentní — orbital 1s vodíku se zapojí do delokalizované kovové vazby, a proto látka dál vede elektrický proud."}
];

/* --- hydridové komplexy: co čím zredukovat (kap. 5) ---------------------- */
/* lah / nabh: 0 = nereaguje, 1 = redukuje, 2 = redukuje jen za tvrdších podmínek */
var SUBST = [
 {s:"aldehyd R–CHO",           p:"primární alkohol R–CH₂OH",         lah:1, nabh:1},
 {s:"keton R–CO–R′",           p:"sekundární alkohol R–CH(OH)–R′",   lah:1, nabh:1},
 {s:"acylhalogenid R–COCl",    p:"primární alkohol",                 lah:1, nabh:1},
 {s:"ester R–COOR′",           p:"primární alkohol + R′OH",          lah:1, nabh:0},
 {s:"karboxylová kyselina R–COOH", p:"primární alkohol",             lah:1, nabh:0},
 {s:"amid R–CONH₂",            p:"amin R–CH₂–NH₂",                   lah:1, nabh:0},
 {s:"nitril R–C≡N",            p:"primární amin R–CH₂–NH₂",          lah:1, nabh:0},
 {s:"nitroskupina Ar–NO₂",     p:"aromatický amin Ar–NH₂",           lah:2, nabh:0},
 {s:"alkylhalogenid R–X",      p:"alkan R–H",                        lah:1, nabh:2},
 {s:"epoxid",                  p:"alkohol",                          lah:1, nabh:2},
 {s:"alken C=C",               p:"nereaguje (potřebuje H₂ a katalyzátor)", lah:0, nabh:0},
 {s:"aromatické jádro",        p:"nereaguje",                        lah:0, nabh:0}
];
var HKOMP = {
  lah:{nm:"LiAlH₄", pl:"tetrahydridohlinitan lithný", c:"var(--exo)",
       roz:"suchý diethylether nebo THF — nikdy voda", en:"rozdíl elektronegativit Al (1,61) a H (2,20) je 0,59",
       sila:"velmi silné, málo selektivní", bezp:"S vodou reaguje explozivně: LiAlH₄ + 4 H₂O → LiOH + Al(OH)₃ + 4 H₂",
       prip:"4 LiH + AlCl₃ → LiAlH₄ + 3 LiCl"},
  nabh:{nm:"NaBH₄", pl:"tetrahydridoboritan sodný", c:"var(--endo)",
       roz:"methanol, ethanol, dokonce i zásaditá voda", en:"rozdíl elektronegativit B (2,04) a H (2,20) je jen 0,16",
       sila:"mírné a selektivní", bezp:"V zásaditém roztoku stálý; v kyselém NaBH₄ + 2 H₂O → NaBO₂ + 4 H₂",
       prip:"4 NaH + B(OCH₃)₃ → NaBH₄ + 3 NaOCH₃"}
};

/* --- peroxid vodíku: redoxní role (kap. 8) ------------------------------- */
var PEROX = [
 {id:"ki", role:"ox", p:"jodid draselný v kyselém prostředí",
  eq:"H₂O₂ + 2 KI + H₂SO₄ → I₂ + K₂SO₄ + 2 H₂O",
  io:"H₂O₂ + 2 I⁻ + 2 H⁺ → I₂ + 2 H₂O",
  zm:"O: −I → −II (redukce)", e:"E°(H₂O₂/H₂O) = +1,776 V",
  poz:"Roztok zhnědne vyloučeným jodem. Peroxid tu bere elektrony — je oxidační činidlo."},
 {id:"fe2", role:"ox", p:"železnaté ionty (Fentonovo činidlo)",
  eq:"H₂O₂ + 2 Fe²⁺ + 2 H⁺ → 2 Fe³⁺ + 2 H₂O",
  io:"H₂O₂ + 2 Fe²⁺ + 2 H⁺ → 2 Fe³⁺ + 2 H₂O",
  zm:"O: −I → −II (redukce)", e:"E°(H₂O₂/H₂O) = +1,776 V",
  poz:"Vzniká radikál •OH, jedno z nejsilnějších oxidačních činidel vůbec. Používá se na rozklad organických jedů v odpadních vodách."},
 {id:"pbs", role:"ox", p:"sulfid olovnatý (zčernalá bělob na obrazech)",
  eq:"PbS + 4 H₂O₂ → PbSO₄ + 4 H₂O",
  io:"PbS + 4 H₂O₂ → PbSO₄ + 4 H₂O",
  zm:"S: −II → +VI (oxidace o osm elektronů)", e:"E°(H₂O₂/H₂O) = +1,776 V",
  poz:"Restaurátorský trik: černý sulfid se zoxiduje na bílý síran a obraz se rozjasní."},
 {id:"so2", role:"ox", p:"oxid siřičitý",
  eq:"H₂O₂ + SO₂ → H₂SO₄",
  io:"H₂O₂ + SO₂ → 2 H⁺ + SO₄²⁻",
  zm:"S: +IV → +VI", e:"E°(H₂O₂/H₂O) = +1,776 V",
  poz:"Používá se k odsiřování spalin i k analytickému stanovení oxidu siřičitého."},
 {id:"mno4", role:"red", p:"manganistan draselný v kyselém prostředí",
  eq:"5 H₂O₂ + 2 KMnO₄ + 3 H₂SO₄ → 2 MnSO₄ + K₂SO₄ + 5 O₂ + 8 H₂O",
  io:"5 H₂O₂ + 2 MnO₄⁻ + 6 H⁺ → 2 Mn²⁺ + 5 O₂ + 8 H₂O",
  zm:"O: −I → 0 (oxidace)", e:"E°(O₂/H₂O₂) = +0,695 V",
  poz:"Fialová barva mizí a bublá kyslík. Manganistan (1,51 V) je silnější oxidovadlo než peroxid, takže peroxid musí ustoupit do role redukčního činidla. Tahle reakce se používá k odměrnému stanovení peroxidu."},
 {id:"cl2", role:"red", p:"chlor",
  eq:"H₂O₂ + Cl₂ → 2 HCl + O₂",
  io:"H₂O₂ + Cl₂ → 2 H⁺ + 2 Cl⁻ + O₂",
  zm:"O: −I → 0 (oxidace)", e:"E°(O₂/H₂O₂) = +0,695 V",
  poz:"Chlor (1,36 V) je silnější, peroxid se tedy oxiduje na kyslík. Prakticky se tak odstraňuje zbytkový chlor z odpadních vod."},
 {id:"ag", role:"red", p:"oxid stříbrný",
  eq:"Ag₂O + H₂O₂ → 2 Ag + H₂O + O₂",
  io:"Ag₂O + H₂O₂ → 2 Ag + H₂O + O₂",
  zm:"O: −I → 0, Ag: +I → 0", e:"E°(O₂/H₂O₂) = +0,695 V",
  poz:"Vyloučí se kovové stříbro — názorný důkaz, že peroxid umí i redukovat."},
 {id:"dis", role:"dis", p:"sám se sebou (katalyzátor MnO₂, kataláza, Fe³⁺, I⁻)",
  eq:"2 H₂O₂ → 2 H₂O + O₂",
  io:"2 H₂O₂ → 2 H₂O + O₂",
  zm:"O: −I → −II a zároveň −I → 0", e:"ΔH = −98 kJ na mol H₂O₂",
  poz:"Disproporcionace: polovina kyslíku se zredukuje na vodu, druhá polovina se zoxiduje na O₂. Reakce je exotermická a samovolná — koncentrované roztoky se proto stabilizují a skladují v tmavých lahvích."}
];

/* --- koncentrace peroxidu vodíku (kap. 8) -------------------------------- */
var PKONC = [
 {w:3,  rho:1.0095, nm:"lékárenský roztok", u:"dezinfekce drobných ran, bělení vlasů; kataláza v krvi ho okamžitě rozloží a rána zpění"},
 {w:6,  rho:1.0204, nm:"kadeřnický roztok", u:"odbarvování vlasů, bělení textilu"},
 {w:30, rho:1.1122, nm:"perhydrol",        u:"laboratorní činidlo; leptá pokožku a zanechává bílé skvrny"},
 {w:35, rho:1.1327, nm:"technický roztok", u:"bělení buničiny a papíru, čištění odpadních vod"},
 {w:60, rho:1.2364, nm:"průmyslový koncentrát", u:"výroba peroxosloučenin, epoxidace; nebezpečný oxidant"},
 {w:85, rho:1.3520, nm:"HTP — vysoce koncentrovaný", u:"monopropelant v raketové technice a v řídicích tryskách"}
];

/* --- trenažér: oxidační číslo vodíku a typ hydridu (kap. 5) -------------- */
var DRIL = [
 {f:"NaH",    q:"Jaké oxidační číslo má vodík?",   o:["+I","−I","0","+II"], c:1,
  e:"Sodík je mnohem elektropozitivnější než vodík (0,93 proti 2,20), takže elektronový pár patří vodíku. Je to iontový hydrid s aniontem H⁻."},
 {f:"NH₃",    q:"Jaké oxidační číslo má vodík?",   o:["−I","0","+I","+III"], c:2,
  e:"Dusík má elektronegativitu 3,04, tedy víc než vodík. Vazba je polární kovalentní a vodíku patří +I. Amoniak je kovalentní hydrid."},
 {f:"CaH₂",   q:"Jaký typ hydridu to je?",         o:["kovalentní","kovový","iontový","komplexní"], c:2,
  e:"Vápník je kov alkalických zemin s elektronegativitou 1,00 — rozdíl proti vodíku je 1,20, což na iontovou mřížku Ca²⁺ a 2 H⁻ stačí. S vodou dává hned dvě molekuly vodíku."},
 {f:"CH₄",    q:"Jaké oxidační číslo má vodík?",   o:["+I","−I","0","−IV"], c:0,
  e:"Uhlík (2,55) je elektronegativnější než vodík (2,20), i když jen o málo. Vodík je proto +I a uhlík −IV. Methan je kovalentní hydrid."},
 {f:"PdH₀,₆", q:"Jaký typ hydridu to je?",         o:["iontový","kovový","kovalentní","komplexní"], c:1,
  e:"Nestechiometrické složení a kovová vodivost jsou poznávacím znamením kovových hydridů. Vodík se svým orbitalem 1s zapojí do delokalizované kovové vazby."},
 {f:"LiAlH₄", q:"Jaké oxidační číslo má vodík?",   o:["+I","0","−I","−II"], c:2,
  e:"V aniontu [AlH₄]⁻ je hliník (1,61) elektropozitivnější než vodík, takže každý ze čtyř vodíků je −I. Proto je LiAlH₄ tak silné redukční činidlo."},
 {f:"H₂O₂",   q:"Jaké oxidační číslo má kyslík?",  o:["−II","−I","0","+I"], c:1,
  e:"Vazba O–O mezi dvěma stejnými atomy se nepočítá. Každý kyslík má jednu vazbu k vodíku (bere mu elektron) a polovinu peroxidové vazby, takže vychází −I."},
 {f:"HF",     q:"Je vazba H–F iontová, nebo kovalentní?", o:["iontová, protože rozdíl elektronegativit je 1,78","kovalentní, ale velmi polární","kovová","koordinačně kovalentní"], c:1,
  e:"Tohle je jádro celého tématu: ani nejelektronegativnější prvek periodické tabulky s vodíkem iontovou vazbu neudělá. Vzniká polární kovalentní vazba a částečný kladný náboj na vodíku — základ vodíkového můstku."},
 {f:"B₂H₆",   q:"Kolik elektronových párů drží šest vazeb v diboranu?", o:["šest","osm","čtyři plus dvě třístředové","dvanáct"], c:2,
  e:"Diboran má jen dvanáct valenčních elektronů, tedy šest párů. Čtyři koncové vazby B–H spotřebují čtyři páry a zbylé dva páry drží dvě třístředové dvouelektronové vazby B–H–B."},
 {f:"TiH₂",   q:"Vede tato látka elektrický proud?", o:["ano, je to kovový hydrid","ne, je to sůl","ne, je to molekulová látka","jen po roztavení"], c:0,
  e:"Kovové hydridy si zachovávají kovovou vazbu, takže vedou proud nebo jsou polovodiče. Iontové hydridy vedou až v tavenině a kovalentní nevedou vůbec."},
 {f:"H₂S",    q:"Proč se sulfan snadno oxiduje?",  o:["protože vodík má oxidační číslo +I","protože je to plyn","protože síra v oxidačním čísle −II snadno elektrony odevzdá","protože obsahuje vodíkové můstky"], c:2,
  e:"Redoxní chování kovalentních hydridů nepatří vodíku, ale tomu druhému atomu. Sulfidová síra se ochotně oxiduje na elementární síru, vodík u toho zůstává +I."},
 {f:"NaBH₄",  q:"Co se stane v zásadité vodě?",    o:["okamžitě exploduje","je poměrně stálý","rozloží se na NaOH a B","přemění se na LiAlH₄"], c:1,
  e:"Rozdíl elektronegativit boru a vodíku je jen 0,16, takže vazba B–H je málo polární a aniont je málo bazický. V zásadité vodě je NaBH₄ stálý — proto se s ním dá pracovat i ve vodných roztocích."}
];
