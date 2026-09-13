/* ============================================================
   2 · DATA — nepřechodné kovy
   Hodnoty odpovídají běžným tabulkám (CRC Handbook, NIST, české
   Chemické tabulky):
     ra … kovový (atomový) poloměr [pm]
     ri … iontový poloměr nejběžnějšího kationtu, koordinace 6 [pm]
     en … elektronegativita, Paulingova stupnice
     i1…i4 … první až čtvrtá ionizační energie [kJ·mol⁻¹] (NIST)
     tt, tv … teplota tání a varu [°C]
     rho … hustota při 20 °C [g·cm⁻³]
     E … standardní redukční potenciál hlavního páru [V]
   ============================================================ */
var NPFAR = 96485;            /* Faradayova konstanta [C·mol⁻¹] */

var NP = {
  Li:{s:"Li", n:"lithium",  z:3,  sk:1,  per:2, blok:"s", kat:"alk",
      core:"[He]", val:"2s¹", pod:"nic — hned pod ní je jádro s dubletem 1s²",
      ra:152, ri:76, ion:"Li⁺", en:0.98, i1:520.2, i2:7298.1, i3:11815, i4:0,
      tt:180.5, tv:1342, rho:0.534, E:-3.04, ox:"I",
      hor:"Li₂O", hornm:"oxid lithný", horox:"−II",
      voda:"pomalu, kov se netaví",
      pozn:"Nejlehčí kov vůbec. Vybočuje z řady — úhlopříčně se podobá hořčíku."},
  Na:{s:"Na", n:"sodík",    z:11, sk:1,  per:3, blok:"s", kat:"alk",
      core:"[Ne]", val:"3s¹", pod:"uzavřená slupka neonu",
      ra:186, ri:102, ion:"Na⁺", en:0.93, i1:495.8, i2:4562, i3:6910, i4:0,
      tt:97.8, tv:883, rho:0.968, E:-2.71, ox:"I",
      hor:"Na₂O₂", hornm:"peroxid sodný", horox:"−I",
      voda:"prudce, kov se taví",
      pozn:"Technicky nejdůležitější alkalický kov. Šestý nejrozšířenější prvek zemské kůry."},
  K: {s:"K",  n:"draslík",  z:19, sk:1,  per:4, blok:"s", kat:"alk",
      core:"[Ar]", val:"4s¹", pod:"uzavřená slupka argonu",
      ra:227, ri:138, ion:"K⁺", en:0.82, i1:418.8, i2:3052, i3:4420, i4:0,
      tt:63.5, tv:759, rho:0.862, E:-2.93, ox:"I",
      hor:"KO₂", hornm:"superoxid draselný", horox:"−½",
      voda:"bouřlivě, vodík hoří",
      pozn:"Draselné soli jsou základ hnojiv. Izotop ⁴⁰K je hlavní zdroj přirozené radioaktivity těla."},
  Rb:{s:"Rb", n:"rubidium", z:37, sk:1,  per:5, blok:"s", kat:"alk",
      core:"[Kr]", val:"5s¹", pod:"uzavřená slupka kryptonu včetně 4d¹⁰",
      ra:248, ri:152, ion:"Rb⁺", en:0.82, i1:403.0, i2:2633, i3:3860, i4:0,
      tt:39.3, tv:688, rho:1.532, E:-2.98, ox:"I",
      hor:"RbO₂", hornm:"superoxid rubidný", horox:"−½",
      voda:"explozivně",
      pozn:"Taje v dlani. Používá se ve fotonásobičích a v atomových hodinách."},
  Cs:{s:"Cs", n:"cesium",   z:55, sk:1,  per:6, blok:"s", kat:"alk",
      core:"[Xe]", val:"6s¹", pod:"uzavřená slupka xenonu včetně 4f¹⁴ a 5d¹⁰ o periodu níž",
      ra:265, ri:167, ion:"Cs⁺", en:0.79, i1:375.7, i2:2234, i3:3400, i4:0,
      tt:28.5, tv:671, rho:1.873, E:-3.03, ox:"I",
      hor:"CsO₂", hornm:"superoxid cesný", horox:"−½",
      voda:"explozivně, i s ledem",
      pozn:"Nejelektropozitivnější stabilní prvek. Definuje sekundu — přechod v atomu ¹³³Cs."},

  Be:{s:"Be", n:"beryllium", z:4, sk:2, per:2, blok:"s", kat:"zem",
      core:"[He]", val:"2s²", pod:"nic",
      ra:112, ri:45, ion:"Be²⁺", en:1.57, i1:899.5, i2:1757.1, i3:14848, i4:0,
      tt:1287, tv:2469, rho:1.85, E:-1.85, ox:"II",
      hor:"BeO", hornm:"oxid beryllnatý", horox:"−II",
      voda:"nereaguje ani s horkou",
      pozn:"Kation Be²⁺ prakticky neexistuje — vazby jsou polárně kovalentní. Úhlopříčně se podobá hliníku."},
  Mg:{s:"Mg", n:"hořčík",    z:12, sk:2, per:3, blok:"s", kat:"zem",
      core:"[Ne]", val:"3s²", pod:"uzavřená slupka neonu",
      ra:160, ri:72, ion:"Mg²⁺", en:1.31, i1:737.7, i2:1450.7, i3:7733, i4:0,
      tt:650, tv:1090, rho:1.738, E:-2.37, ox:"II",
      hor:"MgO", hornm:"oxid hořečnatý", horox:"−II",
      voda:"jen s horkou, pomalu",
      pozn:"Středový atom chlorofylu. Úhlopříčně se podobá lithiu."},
  Ca:{s:"Ca", n:"vápník",    z:20, sk:2, per:4, blok:"s", kat:"zem",
      core:"[Ar]", val:"4s²", pod:"uzavřená slupka argonu",
      ra:197, ri:100, ion:"Ca²⁺", en:1.00, i1:589.8, i2:1145.4, i3:4912, i4:0,
      tt:842, tv:1484, rho:1.55, E:-2.87, ox:"II",
      hor:"CaO", hornm:"oxid vápenatý", horox:"−II",
      voda:"za studena, klidně",
      pozn:"Pátý nejrozšířenější prvek kůry. V těle ho máme kolem 1 kg, z toho 99 % v kostech."},
  Sr:{s:"Sr", n:"stroncium",  z:38, sk:2, per:5, blok:"s", kat:"zem",
      core:"[Kr]", val:"5s²", pod:"uzavřená slupka kryptonu",
      ra:215, ri:118, ion:"Sr²⁺", en:0.95, i1:549.5, i2:1064.2, i3:4138, i4:0,
      tt:777, tv:1382, rho:2.64, E:-2.89, ox:"II",
      hor:"SrO", hornm:"oxid strontnatý", horox:"−II",
      voda:"za studena, rychle",
      pozn:"Barví plamen karmínově — pyrotechnika. Radioaktivní ⁹⁰Sr se ukládá do kostí místo vápníku."},
  Ba:{s:"Ba", n:"baryum",     z:56, sk:2, per:6, blok:"s", kat:"zem",
      core:"[Xe]", val:"6s²", pod:"uzavřená slupka xenonu",
      ra:222, ri:135, ion:"Ba²⁺", en:0.89, i1:502.9, i2:965.2, i3:3600, i4:0,
      tt:727, tv:1897, rho:3.51, E:-2.91, ox:"II",
      hor:"BaO₂", hornm:"peroxid barnatý", horox:"−I",
      voda:"za studena, bouřlivě",
      pozn:"Rozpustné soli jsou prudce jedovaté, ale nerozpustný BaSO₄ se pije jako kontrastní látka."},

  Al:{s:"Al", n:"hliník",   z:13, sk:13, per:3, blok:"p", kat:"p",
      core:"[Ne]", val:"3s² 3p¹", pod:"uzavřená slupka neonu — žádné orbitaly d",
      ra:143, ri:53.5, ion:"Al³⁺", en:1.61, i1:577.5, i2:1816.7, i3:2744.8, i4:11577,
      tt:660.3, tv:2519, rho:2.70, E:-1.66, ox:"III",
      hor:"Al₂O₃", hornm:"oxid hlinitý", horox:"−II",
      voda:"nereaguje — brání oxidová vrstva",
      pozn:"Nejrozšířenější kov zemské kůry. Jediný stabilní oxidační stav je III."},
  Ga:{s:"Ga", n:"gallium",  z:31, sk:13, per:4, blok:"p", kat:"p",
      core:"[Ar] 3d¹⁰", val:"4s² 4p¹", pod:"zaplněných deset orbitalů 3d",
      ra:135, ri:62, ion:"Ga³⁺", en:1.81, i1:578.8, i2:1979.3, i3:2963, i4:6180,
      tt:29.8, tv:2204, rho:5.91, E:-0.55, ox:"III (I)",
      hor:"Ga₂O₃", hornm:"oxid gallitý", horox:"−II",
      voda:"nereaguje",
      pozn:"Taje v dlani a vře až u 2200 °C. GaAs a GaN jsou základ LED a vysokofrekvenční elektroniky."},
  In:{s:"In", n:"indium",   z:49, sk:13, per:5, blok:"p", kat:"p",
      core:"[Kr] 4d¹⁰", val:"5s² 5p¹", pod:"zaplněných deset orbitalů 4d",
      ra:167, ri:80, ion:"In³⁺", en:1.78, i1:558.3, i2:1820.7, i3:2704, i4:5210,
      tt:156.6, tv:2072, rho:7.31, E:-0.34, ox:"III (I)",
      hor:"In₂O₃", hornm:"oxid inditý", horox:"−II",
      voda:"nereaguje",
      pozn:"Oxid inditý dopovaný cínem (ITO) je průhledná elektroda každého dotykového displeje."},
  Tl:{s:"Tl", n:"thallium", z:81, sk:13, per:6, blok:"p", kat:"p",
      core:"[Xe] 4f¹⁴ 5d¹⁰", val:"6s² 6p¹", pod:"zaplněné 4f¹⁴ i 5d¹⁰ — velmi špatné stínění",
      ra:170, ri:150, ion:"Tl⁺", en:1.62, i1:589.4, i2:1971.0, i3:2878, i4:4900,
      tt:304, tv:1473, rho:11.85, E:-0.34, ox:"I (III)",
      hor:"Tl₂O", hornm:"oxid thallný", horox:"−II",
      voda:"se vzdušnou vlhkostí pomalu na TlOH",
      pozn:"Učebnicový příklad inertního páru: stav I je běžný a stálý, stav III je silné oxidovadlo. Prudce jedovatý."},

  Ge:{s:"Ge", n:"germanium", z:32, sk:14, per:4, blok:"p", kat:"polo",
      core:"[Ar] 3d¹⁰", val:"4s² 4p²", pod:"zaplněných deset orbitalů 3d",
      ra:122, ri:53, ion:"Ge⁴⁺", en:2.01, i1:762.0, i2:1537.5, i3:3302.1, i4:4411,
      tt:938.3, tv:2833, rho:5.323, E:0.12, ox:"IV (II)",
      hor:"GeO₂", hornm:"oxid germaničitý", horox:"−II",
      voda:"nereaguje",
      pozn:"Polokov s diamantovou mřížkou. První tranzistor byl germaniový."},
  Sn:{s:"Sn", n:"cín",       z:50, sk:14, per:5, blok:"p", kat:"p",
      core:"[Kr] 4d¹⁰", val:"5s² 5p²", pod:"zaplněných deset orbitalů 4d",
      ra:140, ri:118, ion:"Sn²⁺", en:1.96, i1:708.6, i2:1411.8, i3:2943.0, i4:3930.3,
      tt:231.9, tv:2602, rho:7.287, E:-0.14, ox:"IV a II",
      hor:"SnO₂", hornm:"oxid cíničitý", horox:"−II",
      voda:"nereaguje",
      pozn:"Oba oxidační stavy jsou běžné, IV je o něco stálejší. Pod 13 °C se rozpadá na šedý prášek — cínový mor."},
  Pb:{s:"Pb", n:"olovo",     z:82, sk:14, per:6, blok:"p", kat:"p",
      core:"[Xe] 4f¹⁴ 5d¹⁰", val:"6s² 6p²", pod:"zaplněné 4f¹⁴ i 5d¹⁰ — velmi špatné stínění",
      ra:175, ri:119, ion:"Pb²⁺", en:2.33, i1:715.6, i2:1450.5, i3:3081.5, i4:4083,
      tt:327.5, tv:1749, rho:11.34, E:-0.13, ox:"II (IV)",
      hor:"PbO", hornm:"oxid olovnatý", horox:"−II",
      voda:"nereaguje, pokrývá se vrstvičkou oxidu",
      pozn:"Druhý učebnicový příklad inertního páru: PbO₂ je tak silné oxidovadlo, že PbBr₄ ani PbI₄ neexistují."},

  Sb:{s:"Sb", n:"antimon",   z:51, sk:15, per:5, blok:"p", kat:"polo",
      core:"[Kr] 4d¹⁰", val:"5s² 5p³", pod:"zaplněných deset orbitalů 4d",
      ra:145, ri:76, ion:"Sb³⁺", en:2.05, i1:834, i2:1594.9, i3:2440, i4:4260,
      tt:630.6, tv:1587, rho:6.685, E:0.15, ox:"III a V",
      hor:"Sb₂O₃", hornm:"oxid antimonitý", horox:"−II",
      voda:"nereaguje",
      pozn:"Polokov na hranici. Ve skupině 15 se inertní pár teprve rozjíždí — oba stavy jsou stálé."},
  Bi:{s:"Bi", n:"bismut",    z:83, sk:15, per:6, blok:"p", kat:"p",
      core:"[Xe] 4f¹⁴ 5d¹⁰", val:"6s² 6p³", pod:"zaplněné 4f¹⁴ i 5d¹⁰",
      ra:156, ri:103, ion:"Bi³⁺", en:2.02, i1:703, i2:1610, i3:2466, i4:4370,
      tt:271.4, tv:1564, rho:9.78, E:0.32, ox:"III (V)",
      hor:"Bi₂O₃", hornm:"oxid bismutitý", horox:"−II",
      voda:"nereaguje",
      pozn:"Nejtěžší prakticky netoxický prvek. Bismutičnany jsou tak nestálé, že působí jako mimořádně silná oxidovadla."}
};
function NPE(s){ return NP[s]; }

/* pořadí prvků ve skupinách */
var NPSK1 = ["Li","Na","K","Rb","Cs"];
var NPSK2 = ["Be","Mg","Ca","Sr","Ba"];
var NPSK13= ["Al","Ga","In","Tl"];
var NPSK14= ["Ge","Sn","Pb"];

/* barevné kategorie pro mapu */
var NPKAT = {alk:{c:"var(--cat1)", nm:"skupina 1 — alkalické kovy"},
             zem:{c:"var(--cat2)", nm:"skupina 2 — kovy alkalických zemin"},
             p:  {c:"var(--cat3)", nm:"kovy bloku p"},
             polo:{c:"var(--cat4)", nm:"polokovy na hranici"}};

/* ============================================================
   Mapa bloku s a p: co v které buňce je (5 skupin × 5 period)
   null = nekov, tady ho nekreslíme
   ============================================================ */
var NPMAPA = [
  {per:2, cells:["Li","Be",null,null,null]},
  {per:3, cells:["Na","Mg","Al",null,null]},
  {per:4, cells:["K","Ca","Ga","Ge",null]},
  {per:5, cells:["Rb","Sr","In","Sn","Sb"]},
  {per:6, cells:["Cs","Ba","Tl","Pb","Bi"]}
];
var NPSKUP = ["1","2","13","14","15"];

/* ============================================================
   Sloučeniny — prohledávatelná tabulka (kapitola 02)
   typ: ox = oxid a peroxid, hyd = hydroxid, sul = sůl,
        hal = halogenid, kom = komplex nebo hydrid
   ============================================================ */
var NPSLOUC = [
 {f:"Li₂O",     n:"oxid lithný",             p:"Li", ox:"Li +I, O −II",  t:"ox",  v:"bílá pevná látka, silně zásaditá",         u:"keramika, sklo se sníženou roztažností"},
 {f:"Na₂O₂",    n:"peroxid sodný",           p:"Na", ox:"Na +I, O −I",   t:"ox",  v:"nažloutlý prášek, s vodou dává NaOH a O₂", u:"bělení buničiny, zdroj kyslíku"},
 {f:"KO₂",      n:"superoxid draselný",      p:"K",  ox:"K +I, O −½",    t:"ox",  v:"oranžový, obsahuje ion O₂⁻",                u:"dýchací přístroje — pohlcuje CO₂ a uvolňuje O₂"},
 {f:"NaOH",     n:"hydroxid sodný (louh)",   p:"Na", ox:"Na +I",         t:"hyd", v:"bílé pecičky, silně hygroskopický, žíravina", u:"mýdla, papír, hliníkárny, čištění odpadů"},
 {f:"KOH",      n:"hydroxid draselný",       p:"K",  ox:"K +I",          t:"hyd", v:"silnější zásada než NaOH, dobře rozpustný", u:"alkalické baterie, měkká mýdla"},
 {f:"LiOH",     n:"hydroxid lithný",         p:"Li", ox:"Li +I",         t:"hyd", v:"nejslabší z alkalických hydroxidů",     u:"pohlcování CO₂ na ponorkách a ve vesmírných lodích"},
 {f:"NaCl",     n:"chlorid sodný (halit)",   p:"Na", ox:"Na +I, Cl −I",  t:"hal", v:"krychlová mřížka, rozpustnost skoro nezávislá na teplotě", u:"surovina pro chlor, louh i sodu; potravinářství"},
 {f:"Na₂CO₃",   n:"uhličitan sodný (soda)",  p:"Na", ox:"Na +I, C +IV",  t:"sul", v:"roztok reaguje zásaditě — hydrolýza aniontu", u:"sklářství, prací prostředky, změkčování vody"},
 {f:"NaHCO₃",   n:"hydrogenuhličitan sodný", p:"Na", ox:"Na +I, C +IV",  t:"sul", v:"nad 100 °C se rozkládá na sodu, CO₂ a vodu", u:"jedlá soda, kypřicí prášek, hasicí přístroje"},
 {f:"KNO₃",     n:"dusičnan draselný",       p:"K",  ox:"K +I, N +V",    t:"sul", v:"za horka silné oxidovadlo",                  u:"hnojivo, černý střelný prach, konzervant"},
 {f:"Li₂CO₃",   n:"uhličitan lithný",        p:"Li", ox:"Li +I, C +IV",  t:"sul", v:"na rozdíl od ostatních se snadno tepelně rozkládá", u:"psychofarmakum, meziprodukt výroby lithiových baterií"},
 {f:"BeO",      n:"oxid beryllnatý",         p:"Be", ox:"Be +II",        t:"ox",  v:"amfoterní, kovalentní mřížka, vysoká teplota tání", u:"keramika odvádějící teplo v elektronice"},
 {f:"Be(OH)₂",  n:"hydroxid beryllnatý",     p:"Be", ox:"Be +II",        t:"hyd", v:"amfoterní — rozpouští se v kyselině i v louhu", u:"meziprodukt při zpracování beryllových rud"},
 {f:"MgO",      n:"oxid hořečnatý (magnezie)", p:"Mg", ox:"Mg +II",      t:"ox",  v:"zásaditý, teplota tání 2852 °C",         u:"žáruvzdorné vyzdívky pecí, antacidum"},
 {f:"Mg(OH)₂",  n:"hydroxid hořečnatý",      p:"Mg", ox:"Mg +II",        t:"hyd", v:"velmi málo rozpustný, slabě zásaditý",        u:"magneziové mléko proti pálení žáhy, retardér hoření"},
 {f:"CaO",      n:"oxid vápenatý (pálené vápno)", p:"Ca", ox:"Ca +II",   t:"ox",  v:"s vodou reaguje silně exotermicky",       u:"stavebnictví, hutnictví, odsiřování spalin"},
 {f:"Ca(OH)₂",  n:"hydroxid vápenatý (hašené vápno)", p:"Ca", ox:"Ca +II", t:"hyd", v:"málo rozpustný, roztok = vápenná voda",    u:"malty, důkaz CO₂, Solvayův proces, úprava pH půdy"},
 {f:"CaCO₃",    n:"uhličitan vápenatý (vápenec)", p:"Ca", ox:"Ca +II, C +IV", t:"sul", v:"nerozpustný, s CO₂ a vodou přechází na hydrogenuhličitan", u:"výroba vápna a cementu, plnivo, krasové jevy"},
 {f:"CaSO₄·2H₂O", n:"síran vápenatý dihydrát (sádrovec)", p:"Ca", ox:"Ca +II, S +VI", t:"sul", v:"při 130 °C ztrácí vodu na hemihydrát", u:"sádra, sádrokarton, regulace tuhnutí cementu"},
 {f:"CaC₂",     n:"karbid vápníku",          p:"Ca", ox:"Ca +II, C −I",  t:"sul", v:"s vodou okamžitě dává acetylen",          u:"karbidové lampy, dříve výroba acetylenu"},
 {f:"BaSO₄",    n:"síran barnatý (baryt)",   p:"Ba", ox:"Ba +II, S +VI", t:"sul", v:"mimořádně nerozpustný, proto netoxický",      u:"kontrastní látka pro rentgen, bílý pigment"},
 {f:"Al₂O₃",    n:"oxid hlinitý (korund)",   p:"Al", ox:"Al +III",       t:"ox",  v:"amfoterní, mimořádně tvrdý a žáruvzdorný", u:"surovina pro hliník, brusiva, safír a rubín"},
 {f:"Al(OH)₃",  n:"hydroxid hlinitý",        p:"Al", ox:"Al +III",       t:"hyd", v:"amfoterní, rosolovitá sraženina",             u:"čiření vody, antacidum, retardér hoření"},
 {f:"AlCl₃",    n:"chlorid hlinitý",         p:"Al", ox:"Al +III, Cl −I", t:"hal", v:"v parách dimer Al₂Cl₆, silná Lewisova kyselina", u:"katalyzátor Friedelových–Craftsových reakcí"},
 {f:"Na₃[AlF₆]",n:"hexafluorohlinitan sodný (kryolit)", p:"Al", ox:"Al +III, F −I", t:"kom", v:"snižuje teplotu tání Al₂O₃ z 2072 °C na asi 960 °C", u:"tavná lázeň při elektrolytické výrobě hliníku"},
 {f:"Li[AlH₄]", n:"tetrahydridohlinitan lithný", p:"Al", ox:"Al +III, H −I", t:"kom", v:"velmi silné redukční činidlo, s vodou prudce reaguje", u:"redukce v organické syntéze"},
 {f:"KAl(SO₄)₂·12H₂O", n:"kamenec draselno-hlinitý", p:"Al", ox:"Al +III, S +VI", t:"sul", v:"podvojná sůl, roztok reaguje kysele", u:"stavění krve, čiření vody, mořidlo"},
 {f:"SnCl₂",    n:"chlorid cínatý",          p:"Sn", ox:"Sn +II, Cl −I", t:"hal", v:"lomená molekula, silné redukovadlo",          u:"redukční činidlo, pocínování, stabilizátor"},
 {f:"SnO₂",     n:"oxid cíničitý (kasiterit)", p:"Sn", ox:"Sn +IV",      t:"ox",  v:"amfoterní, velmi stálý",                       u:"ruda cínu, glazury, dopovaný jako průhledná elektroda"},
 {f:"PbO",      n:"oxid olovnatý (klejt)",   p:"Pb", ox:"Pb +II",        t:"ox",  v:"amfoterní se zřetelnou převahou zásaditosti",  u:"olovnatá skla, meziprodukt výroby suříku"},
 {f:"PbO₂",     n:"oxid olovičitý",          p:"Pb", ox:"Pb +IV",        t:"ox",  v:"velmi silné oxidovadlo, tmavě hnědý",          u:"kladná elektroda olověného akumulátoru"},
 {f:"Pb₃O₄",    n:"oxid olovnato-olovičitý (suřík)", p:"Pb", ox:"Pb +II a +IV", t:"ox", v:"jasně červený, obsahuje olovo ve dvou stavech", u:"antikorozní nátěry oceli, dříve pigment"},
 {f:"PbSO₄",    n:"síran olovnatý",          p:"Pb", ox:"Pb +II, S +VI", t:"sul", v:"nerozpustný, vzniká na obou elektrodách při vybíjení", u:"produkt vybíjení olověného akumulátoru"},
 {f:"PbI₂",     n:"jodid olovnatý",          p:"Pb", ox:"Pb +II, I −I",  t:"hal", v:"žlutá sraženina, z horké vody krystaluje v lupíncích", u:"školní pokus „zlatý déšť“"},
 {f:"NaH",      n:"hydrid sodný",            p:"Na", ox:"Na +I, H −I",   t:"kom", v:"iontový hydrid, s vodou dává NaOH a H₂", u:"silná zásada v organické syntéze"},
 {f:"CH₃MgBr",  n:"methylmagnesiumbromid",   p:"Mg", ox:"Mg +II, C −II", t:"kom", v:"Grignardovo činidlo, vazba uhlík—kov",          u:"tvorba vazeb C—C v organické syntéze"}
];

/* ============================================================
   Kroky Solvayova procesu
   ============================================================ */
var NPSOLV = [
 {t:"Sytění solanky amoniakem", eq:"NaCl(aq) + NH₃ → nasycený amoniakální roztok",
  d:"Nasycený roztok chloridu sodného se sytí plynným amoniakem. Amoniak roztok zalkalizuje, a proto pak pohltí mnohem víc oxidu uhličitého, než by dokázala čistá solanka.",
  vst:"NaCl, NH₃", vyst:"amoniakální solanka", tep:"asi 30 °C"},
 {t:"Pálení vápence", eq:"CaCO₃ → CaO + CO₂",
  d:"Souběžně se v peci pálí vápenec. Vzniká oxid uhličitý pro srážecí věž a pálené vápno pro poslední krok. Tady se schovává celá elegance procesu — obojí se využije.",
  vst:"CaCO₃", vyst:"CaO + CO₂", tep:"900 až 1000 °C"},
 {t:"Srážení hydrogenuhličitanu", eq:"NaCl + NH₃ + CO₂ + H₂O → NaHCO₃↓ + NH₄Cl",
  d:"Do amoniakální solanky se vhání oxid uhličitý. Hydrogenuhličitan sodný je ze všech přítomných solí nejméně rozpustný, a proto se vyloučí jako sraženina.",
  vst:"solanka + CO₂", vyst:"NaHCO₃ (pevný), NH₄Cl (v roztoku)", tep:"asi 30 °C"},
 {t:"Kalcinace na sodu", eq:"2 NaHCO₃ → Na₂CO₃ + CO₂ + H₂O",
  d:"Odfiltrovaný hydrogenuhličitan se žíhá. Rozpadne se na uhličitan sodný — hotový výrobek — a oxid uhličitý, který se vrací do srážecí věže.",
  vst:"NaHCO₃", vyst:"Na₂CO₃ + CO₂ (zpět do kroku 3)", tep:"asi 200 °C"},
 {t:"Hašení vápna", eq:"CaO + H₂O → Ca(OH)₂",
  d:"Pálené vápno z kroku 2 se hasí na vápenné mléko. Reakce je silně exotermická, uvolní se 64 kJ na každý mol oxidu vápenatého.",
  vst:"CaO + H₂O", vyst:"Ca(OH)₂", tep:"samovolně"},
 {t:"Regenerace amoniaku", eq:"2 NH₄Cl + Ca(OH)₂ → CaCl₂ + 2 NH₃↑ + 2 H₂O",
  d:"Vápenné mléko vytěsní amoniak z chloridu amonného. Amoniak se vrací do kroku 1, takže se v procesu nespotřebovává — jen v něm koluje. Odpadem je roztok chloridu vápenatého.",
  vst:"NH₄Cl + Ca(OH)₂", vyst:"NH₃ (zpět do kroku 1) + CaCl₂ (odpad)", tep:"asi 90 °C"}
];

/* ============================================================
   Elektrolýza roztoku chloridu sodného — tři technologie
   ============================================================ */
var NPELY = {
 memb:{nm:"Membránová elektrolýza", zk:"membránová",
   pop:"Dnešní standard. Anodový a katodový prostor odděluje iontoměničová membrána, kterou projdou jen kationty Na⁺, nikoli anionty ani voda. Louh vzniká rovnou čistý a koncentrovaný.",
   kat:"2 H₂O + 2 e⁻ → H₂ + 2 OH⁻", an:"2 Cl⁻ → Cl₂ + 2 e⁻",
   prep:"iontoměničová membrána", cist:"NaOH s obsahem NaCl pod 0,005 %",
   spot:"asi 2,2 kWh na 1 kg NaOH", stav:"dnes se staví jen tyto"},
 diaf:{nm:"Diafragmová elektrolýza", zk:"diafragmová",
   pop:"Starší postup. Prostory dělí porézní diafragma z azbestu nebo polymeru. Diafragma zadrží chlor, ale roztok jí protéká, takže do katolytu proniká i chlorid sodný.",
   kat:"2 H₂O + 2 e⁻ → H₂ + 2 OH⁻", an:"2 Cl⁻ → Cl₂ + 2 e⁻",
   prep:"porézní diafragma", cist:"NaOH znečištěný NaCl, kolem 1 %",
   spot:"asi 2,7 kWh na 1 kg NaOH", stav:"dobíhá, azbest je problém"},
 amal:{nm:"Amalgámová elektrolýza", zk:"amalgámová",
   pop:"Historický postup se rtuťovou katodou. Kvůli velkému přepětí vodíku na rtuti se nevylučuje vodík, ale sodík, který se ve rtuti rozpustí na amalgám. Ten se pak zvlášť rozloží vodou.",
   kat:"Na⁺ + e⁻ + Hg → NaHg", an:"2 Cl⁻ → Cl₂ + 2 e⁻",
   prep:"žádná — dělí to sama rtuť", cist:"NaOH velmi čistý",
   spot:"asi 3,2 kWh na 1 kg NaOH", stav:"v EU ukončeno — rtuť"}
};

/* ============================================================
   Trenažér „co vznikne“
   ============================================================ */
var NPDRILL = [
 {q:"sodík + kyslík (hoření na vzduchu)", o:["Na₂O","Na₂O₂","NaO₂","NaOH"], c:1,
  e:"Sodík hoří na <b>peroxid sodný</b> Na₂O₂, ve kterém má kyslík oxidační číslo −I. Prostý oxid Na₂O vzniká jen při omezeném přístupu kyslíku."},
 {q:"draslík + kyslík (hoření v čistém kyslíku)", o:["K₂O","K₂O₂","KO₂","KOH"], c:2,
  e:"Draslík a těžší alkalické kovy hoří na <b>superoxid</b> KO₂ s iontem O₂⁻ a formálním oxidačním číslem kyslíku −½. Velký kation dokáže velký anion O₂⁻ ustálit."},
 {q:"lithium + dusík (už za laboratorní teploty)", o:["LiN₃","Li₃N","LiNO₂","LiNH₂"], c:1,
  e:"Lithium je jediný alkalický kov, který se slučuje se vzdušným dusíkem už za pokojové teploty na <b>nitrid lithný</b> Li₃N. Je to jeden z projevů jeho úhlopříčné podobnosti s hořčíkem."},
 {q:"hliník + roztok hydroxidu sodného", o:["Al(OH)₃ + H₂","Na[Al(OH)₄] + H₂","Al₂O₃ + Na","reakce neprobíhá"], c:1,
  e:"Hliník je amfoterní, takže se rozpouští i v zásadě za vzniku <b>tetrahydroxohlinitanu</b> a vodíku: 2 Al + 2 NaOH + 6 H₂O → 2 Na[Al(OH)₄] + 3 H₂."},
 {q:"beryllium + roztok hydroxidu sodného", o:["reakce neprobíhá","BeO + H₂","Na₂[Be(OH)₄] + H₂","Be(OH)₂"], c:2,
  e:"Beryllium je jediný kov skupiny 2, který je amfoterní — v louhu se rozpouští na <b>tetrahydroxoberyllnatan</b>. Hořčík ani vápník tuhle reakci nedávají."},
 {q:"hořčík + oxid uhličitý (zapálená hořčíková páska)", o:["MgCO₃","MgO + C","Mg(OH)₂ + CO","reakce neprobíhá"], c:1,
  e:"Hořčík odejme kyslík i oxidu uhličitému: 2 Mg + CO₂ → 2 <b>MgO</b> + <b>C</b>. Proto se hořčíkový požár nesmí hasit sněhovým hasicím přístrojem."},
 {q:"vápenec zahřátý na 900 °C", o:["Ca(OH)₂ + CO","CaO + CO₂","CaC₂ + O₂","Ca + CO₂ + O₂"], c:1,
  e:"Tepelný rozklad uhličitanu je <b>CaCO₃ → CaO + CO₂</b>. Z jedné tuny vápence vznikne 560 kg páleného vápna a 440 kg oxidu uhličitého."},
 {q:"vápenná voda + oxid uhličitý (malé množství)", o:["Ca(HCO₃)₂","CaCO₃ + H₂O","CaO + H₂CO₃","reakce neprobíhá"], c:1,
  e:"Vzniká nerozpustný <b>uhličitan vápenatý</b> a voda — proto se vápenná voda zakalí. To je klasický důkaz oxidu uhličitého. Při dalším vhánění se zákal rozpustí na hydrogenuhličitan."},
 {q:"pevný hydrogenuhličitan sodný zahřátý nad 100 °C", o:["NaOH + CO₂","Na₂O + CO₂ + H₂O","Na₂CO₃ + CO₂ + H₂O","NaHCO₃ se nerozkládá"], c:2,
  e:"2 NaHCO₃ → <b>Na₂CO₃ + CO₂ + H₂O</b>. Uvolněný oxid uhličitý nakypří těsto — právě proto je jedlá soda kypřicí prostředek."},
 {q:"chlorid cínatý + chlorid železitý", o:["reakce neprobíhá","SnCl₄ + FeCl₂","Sn + FeCl₃","SnCl₂·FeCl₃"], c:1,
  e:"Cínatý ion je <b>redukovadlo</b> — sám přechází na cíničitý a železité ionty redukuje na železnaté: SnCl₂ + 2 FeCl₃ → SnCl₄ + 2 FeCl₂."},
 {q:"oxid olovičitý + koncentrovaná kyselina chlorovodíková", o:["PbCl₄ + H₂O","PbCl₂ + Cl₂ + H₂O","Pb(OH)₄ + Cl₂","reakce neprobíhá"], c:1,
  e:"PbO₂ je tak silné oxidovadlo, že chloridový ion zoxiduje na chlor a sám klesne na stav II: PbO₂ + 4 HCl → <b>PbCl₂ + Cl₂ + 2 H₂O</b>. Chlorid olovičitý tuhle reakci nepřežije."},
 {q:"roztok dusičnanu olovnatého + roztok jodidu draselného", o:["PbI₄","PbI₂ (žlutá sraženina)","Pb + I₂","KPbI₃"], c:1,
  e:"Vzniká žlutý <b>jodid olovnatý</b>, klasický „zlatý déšť“. Jodid olovičitý neexistuje — Pb(IV) by jodid okamžitě zoxidoval na jod."},
 {q:"hliník + oxid železitý po zapálení", o:["AlFeO₃","Al₂O₃ + Fe","Al₂Fe₃ + O₂","FeAl₂O₄"], c:1,
  e:"Aluminotermie: Fe₂O₃ + 2 Al → 2 <b>Fe</b> + <b>Al₂O₃</b>, ΔH ≈ −852 kJ·mol⁻¹. Uvolní se tolik tepla, že železo vzniká roztavené."},
 {q:"tvrdá voda s Ca(HCO₃)₂ vařená v konvici", o:["Ca(OH)₂","CaCO₃ + CO₂ + H₂O","CaO + H₂CO₃","nic se nestane"], c:1,
  e:"Přechodná tvrdost se varem odstraní: Ca(HCO₃)₂ → <b>CaCO₃ + CO₂ + H₂O</b>. Uhličitan se usadí jako kotelní kámen. Trvalá tvrdost (sírany) se varem odstranit nedá."},
 {q:"elektrolýza vodného roztoku NaCl (katodový děj)", o:["Na⁺ + e⁻ → Na","2 H₂O + 2 e⁻ → H₂ + 2 OH⁻","2 Cl⁻ → Cl₂ + 2 e⁻","O₂ + 2 H₂O + 4 e⁻ → 4 OH⁻"], c:1,
  e:"Ve vodném roztoku se sodík nevyloučí — jeho potenciál je příliš záporný (−2,71 V). Redukuje se <b>voda</b> na vodík a hydroxidové ionty, a proto v katolytu vzniká NaOH."},
 {q:"peroxid sodný + voda", o:["NaOH + H₂","NaOH + O₂","Na₂O + H₂O₂","Na + O₂ + H₂"], c:1,
  e:"2 Na₂O₂ + 2 H₂O → 4 <b>NaOH</b> + <b>O₂</b>. Peroxid disproporcionuje — část kyslíku klesne na −II v hydroxidu, část stoupne na 0 v molekule O₂."}
];
