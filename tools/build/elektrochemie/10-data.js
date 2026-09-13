/* ============================================================
   2 · DATA — standardní redukční potenciály (25 °C, 101,325 kPa, 1 mol·dm⁻³)
       Konvence IUPAC: poloreakce psané jako REDUKCE, E° vůči SHE.
       L … oxidovaná forma (levá strana redukce), R … redukovaná forma,
       z … počet elektronů, g … skupina pro filtr, el … materiál elektrody,
       hero … nabídnout ve staviteli článku.
   ============================================================ */
var FCONST = 96485;          /* C·mol⁻¹ */
var RCONST = 8.314;          /* J·K⁻¹·mol⁻¹ */
var NERNST = 0.05916;        /* V, RT·ln10/F při 298,15 K */

var ETAB = [
 {id:"Li", pair:"Li⁺/Li", L:[[1,"Li⁺"]], R:[[1,"Li"]], z:1, E:-3.04, g:"kov", el:"Li", hero:true, n:"Nejsilnější redukční činidlo tabulky. Lithium se s vodou reaguje prudce, proto lithiové baterie používají bezvodý elektrolyt."},
 {id:"K",  pair:"K⁺/K",   L:[[1,"K⁺"]],  R:[[1,"K"]],  z:1, E:-2.93, g:"kov", el:"K",  hero:true, n:"Reaguje s vodou za vzplanutí vodíku. Uchovává se pod petrolejem."},
 {id:"Ba", pair:"Ba²⁺/Ba",L:[[1,"Ba²⁺"]],R:[[1,"Ba"]], z:2, E:-2.91, g:"kov", el:"Ba", hero:false,n:"Kov alkalických zemin, s vodou reaguje podobně bouřlivě jako sodík."},
 {id:"Ca", pair:"Ca²⁺/Ca",L:[[1,"Ca²⁺"]],R:[[1,"Ca"]], z:2, E:-2.87, g:"kov", el:"Ca", hero:true, n:"S vodou reaguje už za studena, ale mírněji než sodík."},
 {id:"Na", pair:"Na⁺/Na", L:[[1,"Na⁺"]], R:[[1,"Na"]], z:1, E:-2.71, g:"kov", el:"Na", hero:true, n:"Vyrábí se elektrolýzou taveniny NaCl (Downsův proces) — z roztoku ho nevyloučíte, vyloučí se vodík."},
 {id:"Mg", pair:"Mg²⁺/Mg",L:[[1,"Mg²⁺"]],R:[[1,"Mg"]], z:2, E:-2.37, g:"kov", el:"Mg", hero:true, n:"Obětovaná anoda v katodické ochraně lodí a potrubí. Se studenou vodou reaguje jen pomalu, s horkou ochotně."},
 {id:"Al", pair:"Al³⁺/Al",L:[[1,"Al³⁺"]],R:[[1,"Al"]], z:3, E:-1.66, g:"kov", el:"Al", hero:true, n:"Velmi neušlechtilý, přesto v praxi stálý díky pasivaci vrstvičkou Al₂O₃. Vyrábí se elektrolýzou taveniny Al₂O₃ v kryolitu."},
 {id:"Mn", pair:"Mn²⁺/Mn",L:[[1,"Mn²⁺"]],R:[[1,"Mn"]], z:2, E:-1.18, g:"kov", el:"Mn", hero:true, n:"Kovový mangan je neušlechtilý; v roztoku ho vyloučit nelze, vyloučí se vodík."},
 {id:"H2Ob",pair:"H₂O/H₂ (zásad.)",L:[[2,"H₂O"]],R:[[1,"H₂"],[2,"OH⁻"]], z:2, E:-0.83, g:"nekov", el:"Pt", hero:false, n:"Redukce vody v neutrálním a zásaditém prostředí. To se děje na katodě při elektrolýze roztoku NaCl."},
 {id:"Zn", pair:"Zn²⁺/Zn",L:[[1,"Zn²⁺"]],R:[[1,"Zn"]], z:2, E:-0.76, g:"kov", el:"Zn", hero:true, n:"Anoda Daniellova článku i zinko-uhlíkové baterie. Chrání železo jako obětovaná anoda (pozinkování)."},
 {id:"Cr", pair:"Cr³⁺/Cr",L:[[1,"Cr³⁺"]],R:[[1,"Cr"]], z:3, E:-0.74, g:"kov", el:"Cr", hero:true, n:"Neušlechtilý, ale pasivuje se oxidem Cr₂O₃ — proto nerezová ocel s chromem nerezaví."},
 {id:"Fe", pair:"Fe²⁺/Fe",L:[[1,"Fe²⁺"]],R:[[1,"Fe"]], z:2, E:-0.44, g:"kov", el:"Fe", hero:true, n:"Anodická poloreakce koroze železa. Vodík vytěsňuje z kyselin, se studenou vodou nereaguje."},
 {id:"Cd", pair:"Cd²⁺/Cd",L:[[1,"Cd²⁺"]],R:[[1,"Cd"]], z:2, E:-0.40, g:"kov", el:"Cd", hero:true, n:"Anoda dnes už zakázaných NiCd akumulátorů."},
 {id:"PbSO4",pair:"PbSO₄/Pb",L:[[1,"PbSO₄"]],R:[[1,"Pb"],[1,"SO₄²⁻"]], z:2, E:-0.36, g:"ost", el:"Pb", hero:false, n:"Záporná elektroda olověného akumulátoru (při vybíjení anoda)."},
 {id:"Co", pair:"Co²⁺/Co",L:[[1,"Co²⁺"]],R:[[1,"Co"]], z:2, E:-0.28, g:"kov", el:"Co", hero:false, n:"Kobalt je o něco ušlechtilejší než železo, proto se používá do slitin."},
 {id:"Ni", pair:"Ni²⁺/Ni",L:[[1,"Ni²⁺"]],R:[[1,"Ni"]], z:2, E:-0.26, g:"kov", el:"Ni", hero:true, n:"Galvanické niklování — nikl se z roztoku vyloučí dřív než vodík (i díky přepětí vodíku)."},
 {id:"Sn", pair:"Sn²⁺/Sn",L:[[1,"Sn²⁺"]],R:[[1,"Sn"]], z:2, E:-0.14, g:"kov", el:"Sn", hero:true, n:"Pocínovaný plech (konzervy). Cín je ušlechtilejší než železo, po poškrábání koroduje železo rychleji."},
 {id:"Pb", pair:"Pb²⁺/Pb",L:[[1,"Pb²⁺"]],R:[[1,"Pb"]], z:2, E:-0.13, g:"kov", el:"Pb", hero:true, n:"Těsně pod vodíkem. Se zředěnou HCl prakticky nereaguje kvůli nerozpustnému PbCl₂ na povrchu."},
 {id:"H",  pair:"2H⁺/H₂", L:[[2,"H⁺"]],  R:[[1,"H₂"]], z:2, E:0.00,  g:"nekov", el:"Pt", hero:true, n:"Standardní vodíková elektroda: E° = 0 podle dohody. Vše nad ní vodík z kyselin nevytěsní, vše pod ní ano."},
 {id:"Sn4",pair:"Sn⁴⁺/Sn²⁺",L:[[1,"Sn⁴⁺"]],R:[[1,"Sn²⁺"]], z:2, E:0.15, g:"ost", el:"Pt", hero:false, n:"Sn²⁺ je mírné redukční činidlo — redukuje Fe³⁺ na Fe²⁺."},
 {id:"Cu1",pair:"Cu²⁺/Cu⁺",L:[[1,"Cu²⁺"]],R:[[1,"Cu⁺"]], z:1, E:0.16, g:"ost", el:"Pt", hero:false, n:"Cu⁺ ve vodě disproporcionuje na Cu a Cu²⁺, protože E°(Cu⁺/Cu) je vyšší než E°(Cu²⁺/Cu⁺)."},
 {id:"SO4",pair:"SO₄²⁻/SO₂",L:[[1,"SO₄²⁻"],[4,"H⁺"]],R:[[1,"SO₂"],[2,"H₂O"]], z:2, E:0.17, g:"oxo", el:"Pt", hero:false, n:"Zředěná H₂SO₄ oxiduje jen ionty H⁺; koncentrovaná horká už síranem — proto rozpouští měď za vzniku SO₂."},
 {id:"AgCl",pair:"AgCl/Ag",L:[[1,"AgCl"]],R:[[1,"Ag"],[1,"Cl⁻"]], z:1, E:0.22, g:"ost", el:"Ag", hero:false, n:"Argentchloridová elektroda — praktická referenční elektroda v pH-metrech místo nepohodlné SHE."},
 {id:"Cu", pair:"Cu²⁺/Cu",L:[[1,"Cu²⁺"]],R:[[1,"Cu"]], z:2, E:0.34,  g:"kov", el:"Cu", hero:true, n:"Katoda Daniellova článku. Ušlechtilý kov: z kyselin vodík nevytěsní, rozpouští se jen v oxidujících kyselinách."},
 {id:"O2b",pair:"O₂/OH⁻ (zásad.)",L:[[1,"O₂"],[2,"H₂O"]],R:[[4,"OH⁻"]], z:4, E:0.40, g:"nekov", el:"Pt", hero:false, n:"Katodická poloreakce koroze v neutrální vodě — kyslík rozpuštěný v kapce vody se redukuje na OH⁻."},
 {id:"Cu+",pair:"Cu⁺/Cu",  L:[[1,"Cu⁺"]], R:[[1,"Cu"]], z:1, E:0.52,  g:"ost", el:"Cu", hero:false, n:"Vyšší než Cu²⁺/Cu⁺, proto Cu⁺ ve vodném roztoku není stálý."},
 {id:"I2", pair:"I₂/2I⁻", L:[[1,"I₂"]],  R:[[2,"I⁻"]], z:2, E:0.54,  g:"nekov", el:"Pt", hero:true, n:"Jod je nejslabší oxidační činidlo z halogenů; jodid je naopak nejsilnější redukční činidlo mezi halogenidy — redukuje i Fe³⁺."},
 {id:"MnO4b",pair:"MnO₄⁻/MnO₂ (zásad.)",L:[[1,"MnO₄⁻"],[2,"H₂O"]],R:[[1,"MnO₂"],[4,"OH⁻"]], z:3, E:0.60, g:"oxo", el:"Pt", hero:false, n:"Manganistan v neutrálním či zásaditém prostředí: vzniká hnědá sraženina MnO₂ a jen 3 elektrony."},
 {id:"O2H2O2",pair:"O₂/H₂O₂",L:[[1,"O₂"],[2,"H⁺"]],R:[[1,"H₂O₂"]], z:2, E:0.70, g:"nekov", el:"Pt", hero:false, n:"Peroxid jako redukční činidlo: oxiduje se na O₂ (např. s MnO₄⁻)."},
 {id:"Fe3",pair:"Fe³⁺/Fe²⁺",L:[[1,"Fe³⁺"]],R:[[1,"Fe²⁺"]], z:1, E:0.77, g:"ost", el:"Pt", hero:true, n:"Fe³⁺ zoxiduje jodid (0,54), ale bromid (1,07) už ne. Fe²⁺ naopak redukuje manganistan — základ manganometrie."},
 {id:"Hg2",pair:"Hg₂²⁺/Hg",L:[[1,"Hg₂²⁺"]],R:[[2,"Hg"]], z:2, E:0.79, g:"kov", el:"Hg", hero:false, n:"Kalomelová elektroda (Hg/Hg₂Cl₂) je další běžná referenční elektroda."},
 {id:"Ag", pair:"Ag⁺/Ag", L:[[1,"Ag⁺"]], R:[[1,"Ag"]], z:1, E:0.80,  g:"kov", el:"Ag", hero:true, n:"Stříbro se vyloučí z roztoku AgNO₃ na měď: Cu + 2 Ag⁺ → Cu²⁺ + 2 Ag. Galvanické stříbření."},
 {id:"Hg", pair:"Hg²⁺/Hg",L:[[1,"Hg²⁺"]],R:[[1,"Hg"]], z:2, E:0.85,  g:"kov", el:"Hg", hero:true, n:"Ušlechtilý kov; na rtuťové katodě má vodík obrovské přepětí, proto se na ní vylučuje sodík (amalgámový proces)."},
 {id:"NO3",pair:"NO₃⁻/NO", L:[[1,"NO₃⁻"],[4,"H⁺"]],R:[[1,"NO"],[2,"H₂O"]], z:3, E:0.96, g:"oxo", el:"Pt", hero:false, n:"Zředěná HNO₃ je oxidující kyselina: rozpustí měď (0,34) i stříbro (0,80) — bez vývoje vodíku, vzniká NO."},
 {id:"Br2",pair:"Br₂/2Br⁻",L:[[1,"Br₂"]], R:[[2,"Br⁻"]], z:2, E:1.07, g:"nekov", el:"Pt", hero:true, n:"Brom vytěsní jod z jodidu, chlor vytěsní brom z bromidu. Směr určuje pořadí E°."},
 {id:"Pt", pair:"Pt²⁺/Pt",L:[[1,"Pt²⁺"]],R:[[1,"Pt"]], z:2, E:1.18,  g:"kov", el:"Pt", hero:false, n:"Platina — inertní elektrodový materiál, rozpouští se jen v lučavce královské."},
 {id:"O2", pair:"O₂/H₂O (kys.)",L:[[1,"O₂"],[4,"H⁺"]],R:[[2,"H₂O"]], z:4, E:1.23, g:"nekov", el:"Pt", hero:true, n:"Anodická poloreakce elektrolýzy vody (obráceně) a katoda palivového článku. Silně závisí na pH: E = 1,23 − 0,0592·pH."},
 {id:"MnO2",pair:"MnO₂/Mn²⁺",L:[[1,"MnO₂"],[4,"H⁺"]],R:[[1,"Mn²⁺"],[2,"H₂O"]], z:2, E:1.23, g:"oxo", el:"Pt", hero:false, n:"Burel jako oxidační činidlo v Leclanchéově a alkalické baterii. S koncentrovanou HCl uvolní chlor."},
 {id:"Cr2O7",pair:"Cr₂O₇²⁻/Cr³⁺",L:[[1,"Cr₂O₇²⁻"],[14,"H⁺"]],R:[[2,"Cr³⁺"],[7,"H₂O"]], z:6, E:1.33, g:"oxo", el:"Pt", hero:true, n:"Dichroman v kyselém prostředí: oranžový → zelený. Šest elektronů na jeden dichroman — typická chyba je zapomenout dvojku u Cr³⁺."},
 {id:"Cl2",pair:"Cl₂/2Cl⁻",L:[[1,"Cl₂"]], R:[[2,"Cl⁻"]], z:2, E:1.36, g:"nekov", el:"Pt", hero:true, n:"Při elektrolýze roztoku NaCl se na anodě vylučuje Cl₂, ne O₂, přestože E°(O₂) je nižší — kvůli přepětí kyslíku."},
 {id:"Au", pair:"Au³⁺/Au",L:[[1,"Au³⁺"]],R:[[1,"Au"]], z:3, E:1.50,  g:"kov", el:"Au", hero:true, n:"Nejušlechtilejší běžný kov. Rozpouští se jen v lučavce královské (HNO₃ + 3 HCl), kde komplexace chloridem sníží E°."},
 {id:"MnO4",pair:"MnO₄⁻/Mn²⁺ (kys.)",L:[[1,"MnO₄⁻"],[8,"H⁺"]],R:[[1,"Mn²⁺"],[4,"H₂O"]], z:5, E:1.51, g:"oxo", el:"Pt", hero:true, n:"Manganistan v kyselém prostředí — klasické silné oxidační činidlo (fialový → bezbarvý). Osm H⁺ na jeden MnO₄⁻."},
 {id:"PbO2",pair:"PbO₂/PbSO₄",L:[[1,"PbO₂"],[1,"SO₄²⁻"],[4,"H⁺"]],R:[[1,"PbSO₄"],[2,"H₂O"]], z:2, E:1.69, g:"oxo", el:"Pb", hero:false, n:"Kladná elektroda olověného akumulátoru. Spolu s PbSO₄/Pb (−0,36) dává 2,05 V na článek."},
 {id:"H2O2",pair:"H₂O₂/H₂O",L:[[1,"H₂O₂"],[2,"H⁺"]],R:[[2,"H₂O"]], z:2, E:1.78, g:"nekov", el:"Pt", hero:false, n:"Peroxid jako oxidační činidlo. Má dvě poloreakce (0,70 a 1,78), a proto může být oxidační i redukční činidlo — a sám se rozkládá (disproporcionace)."},
 {id:"S2O8",pair:"S₂O₈²⁻/SO₄²⁻",L:[[1,"S₂O₈²⁻"]],R:[[2,"SO₄²⁻"]], z:2, E:2.01, g:"oxo", el:"Pt", hero:false, n:"Peroxodisíran — jedno z nejsilnějších oxidačních činidel v roztoku, zoxiduje i Mn²⁺ na MnO₄⁻."},
 {id:"O3", pair:"O₃/O₂",  L:[[1,"O₃"],[2,"H⁺"]],R:[[1,"O₂"],[1,"H₂O"]], z:2, E:2.08, g:"nekov", el:"Pt", hero:false, n:"Ozon — používá se k dezinfekci vody místo chloru."},
 {id:"F2", pair:"F₂/2F⁻", L:[[1,"F₂"]],  R:[[2,"F⁻"]], z:2, E:2.87,  g:"nekov", el:"Pt", hero:true, n:"Nejsilnější oxidační činidlo tabulky. Fluor nelze vyrobit elektrolýzou vodného roztoku — zoxidoval by vodu; vyrábí se z taveniny KF·HF."}
];
function E_(id){ for(var i=0;i<ETAB.length;i++){ if(ETAB[i].id===id) return ETAB[i]; } return null; }
function sideStr(a){ return a.map(function(p){ return (p[0]===1?"":p[0]+" ")+p[1]; }).join(" + "); }
function halfRed(e){ return sideStr(e.L)+" + "+(e.z===1?"":e.z+" ")+"e⁻ → "+sideStr(e.R); }
function halfOx(e){ return sideStr(e.R)+" → "+sideStr(e.L)+" + "+(e.z===1?"":e.z+" ")+"e⁻"; }
function gcd(a,b){ return b? gcd(b,a%b) : a; }
/* celková rovnice článku: katoda (redukce) × mc + anoda (oxidace) × ma, vykrácení společných částic */
function cellEq(cat,an){
  var l=cat.z*an.z/gcd(cat.z,an.z), mc=l/cat.z, ma=l/an.z;
  var left={}, right={}, order=[];
  function add(map,list,m){ list.forEach(function(p){ if(!(p[1] in map)){ map[p[1]]=0; if(order.indexOf(p[1])<0) order.push(p[1]); } map[p[1]]+=p[0]*m; }); }
  add(left,cat.L,mc); add(left,an.R,ma); add(right,cat.R,mc); add(right,an.L,ma);
  order.forEach(function(k){ if(left[k]&&right[k]){ var d=Math.min(left[k],right[k]); left[k]-=d; right[k]-=d; } });
  function s(map){ return order.filter(function(k){return map[k]>0;}).map(function(k){ return (map[k]===1?"":map[k]+" ")+k; }).join(" + "); }
  return {eq:s(left)+" → "+s(right), z:l, mc:mc, ma:ma};
}

/* ============================================================
   Beketovova řada — kovy seřazené podle E°
   water: "cold" reaguje se studenou vodou, "hot" s horkou vodou, "steam" jen s vodní párou, "no"
   acid: vytěsní vodík ze zředěné HCl / H₂SO₄
   ============================================================ */
var BEK = [
 {s:"Li", ion:"Li⁺",  z:1, E:-3.04, water:"cold",  acid:true,  noble:false, note:"reaguje s vodou už za studena"},
 {s:"K",  ion:"K⁺",   z:1, E:-2.93, water:"cold",  acid:true,  noble:false, note:"s vodou prudce, vodík vzplane"},
 {s:"Ca", ion:"Ca²⁺", z:2, E:-2.87, water:"cold",  acid:true,  noble:false, note:"s vodou za studena, mírněji než Na"},
 {s:"Na", ion:"Na⁺",  z:1, E:-2.71, water:"cold",  acid:true,  noble:false, note:"s vodou prudce, kulička pobíhá po hladině"},
 {s:"Mg", ion:"Mg²⁺", z:2, E:-2.37, water:"hot",   acid:true,  noble:false, note:"se studenou vodou jen velmi pomalu, s horkou ochotně"},
 {s:"Al", ion:"Al³⁺", z:3, E:-1.66, water:"steam", acid:true,  noble:false, passiv:true, note:"pasivace Al₂O₃; s vodou reaguje jen po odstranění vrstvičky"},
 {s:"Mn", ion:"Mn²⁺", z:2, E:-1.18, water:"hot",   acid:true,  noble:false, note:"s horkou vodou pomalu"},
 {s:"Zn", ion:"Zn²⁺", z:2, E:-0.76, water:"steam", acid:true,  noble:false, note:"s vodní párou za žáru; z kyselin vodík ochotně"},
 {s:"Cr", ion:"Cr³⁺", z:3, E:-0.74, water:"steam", acid:true,  noble:false, passiv:true, note:"pasivace v HNO₃; v nerezi chrání ocel"},
 {s:"Fe", ion:"Fe²⁺", z:2, E:-0.44, water:"steam", acid:true,  noble:false, passiv:true, note:"s párou za žáru na Fe₃O₄; v konc. HNO₃ se pasivuje"},
 {s:"Cd", ion:"Cd²⁺", z:2, E:-0.40, water:"no",    acid:true,  noble:false, note:"z kyselin vodík pomalu"},
 {s:"Ni", ion:"Ni²⁺", z:2, E:-0.26, water:"no",    acid:true,  noble:false, note:"z kyselin vodík pomalu"},
 {s:"Sn", ion:"Sn²⁺", z:2, E:-0.14, water:"no",    acid:true,  noble:false, note:"z kyselin vodík pomalu (za tepla)"},
 {s:"Pb", ion:"Pb²⁺", z:2, E:-0.13, water:"no",    acid:true,  noble:false, note:"z HCl prakticky ne — nerozpustný PbCl₂ na povrchu"},
 {s:"H",  ion:"H⁺",   z:1, E:0.00,  water:"no",    acid:false, noble:false, note:"dělicí čára řady"},
 {s:"Cu", ion:"Cu²⁺", z:2, E:0.34,  water:"no",    acid:false, noble:true,  note:"jen oxidující kyseliny (HNO₃, konc. H₂SO₄) — bez H₂"},
 {s:"Ag", ion:"Ag⁺",  z:1, E:0.80,  water:"no",    acid:false, noble:true,  note:"rozpouští se v HNO₃"},
 {s:"Hg", ion:"Hg²⁺", z:2, E:0.85,  water:"no",    acid:false, noble:true,  note:"rozpouští se v HNO₃"},
 {s:"Pt", ion:"Pt²⁺", z:2, E:1.18,  water:"no",    acid:false, noble:true,  note:"jen lučavka královská"},
 {s:"Au", ion:"Au³⁺", z:3, E:1.50,  water:"no",    acid:false, noble:true,  note:"jen lučavka královská"}
];
function B_(s){ for(var i=0;i<BEK.length;i++){ if(BEK[i].s===s) return BEK[i]; } return null; }

/* ============================================================
   Trenažér oxidačních čísel
   ============================================================ */
var OXN = [
 {f:"KMnO₄", at:"Mn", o:["+IV","+VI","+VII","+II"], c:2, e:"K je +I, čtyři O jsou 4·(−II) = −VIII. Součet musí být 0: +1 + x − 8 = 0 → x = <b>+VII</b>. Mangan je tu ve svém nejvyšším oxidačním čísle, proto je manganistan tak silné oxidační činidlo."},
 {f:"K₂Cr₂O₇", at:"Cr", o:["+III","+VI","+VII","+XII"], c:1, e:"2·(+I) + 2x + 7·(−II) = 0 → 2x = 12 → x = <b>+VI</b>. Pozor: +XII je součet za oba atomy chromu, ne oxidační číslo jednoho atomu."},
 {f:"H₂O₂", at:"O", o:["−II","−I","0","+I"], c:1, e:"Peroxidy jsou výjimka: kyslík má <b>−I</b>, protože atomy O jsou vázány i mezi sebou (H–O–O–H). Vodík +I: 2·(+1) + 2·(−1) = 0 ✓."},
 {f:"NH₄⁺", at:"N", o:["−III","+III","+V","−I"], c:0, e:"4 H = +IV a součet musí dát náboj +1: x + 4 = +1 → x = <b>−III</b>. Dusík má v amoniaku i amonném iontu stejné oxidační číslo."},
 {f:"SO₄²⁻", at:"S", o:["+IV","+VI","−II","+II"], c:1, e:"4·(−II) = −VIII a součet je −2: x − 8 = −2 → x = <b>+VI</b>. Síran je nejvyšší oxidační stupeň síry, proto zředěná H₂SO₄ oxiduje jen svým H⁺."},
 {f:"ClO₃⁻", at:"Cl", o:["+III","+V","+VII","−I"], c:1, e:"3·(−II) = −VI, součet −1: x − 6 = −1 → x = <b>+V</b>. Chlorečnan; chloristan ClO₄⁻ by měl +VII, chlornan ClO⁻ +I."},
 {f:"Fe₃O₄", at:"Fe", o:["+II","+III","+8/3 (průměr)","+IV"], c:2, e:"4·(−II) = −VIII, tři Fe: 3x = 8 → x = <b>+8/3</b>. Necelé číslo prozrazuje směsný oxid Fe<sup>II</sup>Fe<sup>III</sup>₂O₄ — jeden atom +II, dva +III. Pro elektronovou bilanci průměr stačí."},
 {f:"CH₄", at:"C", o:["−IV","+IV","0","−II"], c:0, e:"4 H = +IV, molekula neutrální → C = <b>−IV</b>. Methan je nejredukovanější forma uhlíku."},
 {f:"CH₃OH", at:"C", o:["−II","0","+II","−IV"], c:0, e:"4 H = +IV, O = −II: x + 4 − 2 = 0 → x = <b>−II</b>. Oxidace methanu na methanol zvýší oxidační číslo uhlíku o 2."},
 {f:"HCHO", at:"C", o:["−II","0","+II","+IV"], c:1, e:"2 H = +II, O = −II: x + 2 − 2 = 0 → x = <b>0</b>. Formaldehyd — uhlík uprostřed řady CH₄ (−IV) … CO₂ (+IV)."},
 {f:"HCOOH", at:"C", o:["0","+II","+IV","−II"], c:1, e:"2 H = +II, 2 O = −IV: x + 2 − 4 = 0 → x = <b>+II</b>. Kyselina mravenčí je předposlední stupeň; oxidace ji dovede na CO₂."},
 {f:"CO₂", at:"C", o:["+II","+IV","0","−IV"], c:1, e:"2·(−II) = −IV → C = <b>+IV</b>. Nejvyšší oxidační číslo uhlíku; proto CO₂ už nehoří."},
 {f:"S₂O₃²⁻", at:"S", o:["+II (průměr)","+IV","+VI","−II"], c:0, e:"3·(−II) = −VI, součet −2: 2x − 6 = −2 → x = <b>+II</b> (průměr; ve skutečnosti jedna síra +VI a druhá −II). Thiosíran je redukční činidlo v jodometrii."},
 {f:"NO₃⁻", at:"N", o:["+III","+V","−III","+IV"], c:1, e:"3·(−II) = −VI, součet −1: x − 6 = −1 → x = <b>+V</b>. Dusičnan je nejvyšší stupeň dusíku, proto je HNO₃ oxidující kyselina."},
 {f:"NaH", at:"H", o:["+I","−I","0","+II"], c:1, e:"Hydridy kovů jsou druhá výjimka: vodík vázaný na méně elektronegativní kov má <b>−I</b>. Na je +I, součet 0 ✓."},
 {f:"OF₂", at:"O", o:["−II","−I","+II","+I"], c:2, e:"Fluor má vždy −I (nejelektronegativnější prvek). 2·(−I) = −II, součet 0 → O = <b>+II</b>. Jediný případ, kdy má kyslík kladné oxidační číslo."}
];

/* ============================================================
   Trenažér: co se oxiduje, co se redukuje, kdo je činidlo
   ============================================================ */
var AGT = [
 {r:"Zn + Cu²⁺ → Zn²⁺ + Cu", q:"Které je <b>oxidační činidlo</b>?", o:["Zn","Cu²⁺","Zn²⁺","Cu"], c:1, e:"Cu²⁺ elektrony <b>přijímá</b> (Cu²⁺ + 2 e⁻ → Cu), sám se redukuje, a tím oxiduje zinek — je tedy oxidační činidlo. Zn elektrony odevzdává a je redukční činidlo."},
 {r:"2 Fe³⁺ + 2 I⁻ → 2 Fe²⁺ + I₂", q:"Co se <b>oxiduje</b>?", o:["Fe³⁺","I₂","I⁻","Fe²⁺"], c:2, e:"Jodid jde z −I na 0, oxidační číslo <b>roste</b> → oxiduje se. Fe³⁺ klesá na Fe²⁺ → redukuje se. Oxiduje se vždy redukční činidlo."},
 {r:"MnO₄⁻ + 5 Fe²⁺ + 8 H⁺ → Mn²⁺ + 5 Fe³⁺ + 4 H₂O", q:"Které je <b>redukční činidlo</b>?", o:["MnO₄⁻","H⁺","Fe²⁺","Mn²⁺"], c:2, e:"Fe²⁺ odevzdává elektron (Fe²⁺ → Fe³⁺ + e⁻), takže manganistan redukuje — je to redukční činidlo. H⁺ se nemění (+I zůstává), jen doplňuje kyslík do vody."},
 {r:"Cl₂ + 2 Br⁻ → 2 Cl⁻ + Br₂", q:"Co se <b>redukuje</b>?", o:["Cl₂","Br⁻","Br₂","Cl⁻"], c:0, e:"Chlor jde z 0 na −I — oxidační číslo klesá, chlor přijal elektrony, <b>redukuje se</b>. Bromid se oxiduje na brom. Chlor je silnější oxidační činidlo než brom (1,36 &gt; 1,07)."},
 {r:"Cl₂ + 2 OH⁻ → Cl⁻ + ClO⁻ + H₂O", q:"Jak nazveme tuto reakci?", o:["Disproporcionace — chlor se zároveň oxiduje i redukuje","Neutralizace — nejde o redoxní reakci","Synproporcionace","Hydrolýza"], c:0, e:"Jeden atom Cl jde z 0 na −I (redukce), druhý z 0 na +I (oxidace). Táž látka je oxidační i redukční činidlo — <b>disproporcionace</b>. Vzniká chlorové bělidlo (chlornan)."},
 {r:"2 H₂O₂ → 2 H₂O + O₂", q:"Jaká je role peroxidu vodíku?", o:["Jen oxidační činidlo","Jen redukční činidlo","Zároveň oxidační i redukční činidlo","Katalyzátor"], c:2, e:"Kyslík −I jde v jedné molekule na −II (redukce), v druhé na 0 (oxidace). Peroxid <b>disproporcionuje</b> — je oxidačním i redukčním činidlem sám sobě. Proto je H₂O₂ nestálý a skladuje se v tmavých lahvích."},
 {r:"Cu + 2 Ag⁺ → Cu²⁺ + 2 Ag", q:"Které je <b>oxidační činidlo</b>?", o:["Cu","Ag⁺","Cu²⁺","Ag"], c:1, e:"Ag⁺ přijímá elektron a redukuje se na kovové stříbro — oxidační činidlo. Měď se oxiduje (redukční činidlo). E°(Ag⁺/Ag) = 0,80 &gt; E°(Cu²⁺/Cu) = 0,34, takže reakce běží tímto směrem."},
 {r:"Fe + 2 HCl → FeCl₂ + H₂", q:"Co se <b>redukuje</b>?", o:["Fe","Cl⁻","H⁺","H₂"], c:2, e:"Vodík jde z +I na 0 — oxidační číslo klesá, <b>H⁺ se redukuje</b>. Chlorid zůstává −I (divák). Železo se oxiduje na Fe²⁺."},
 {r:"2 Na + Cl₂ → 2 NaCl", q:"Které je <b>redukční činidlo</b>?", o:["Cl₂","Na","NaCl","Cl⁻"], c:1, e:"Sodík odevzdává elektron (0 → +I), tím redukuje chlor — je redukční činidlo. Chlor přijímá (0 → −I), je oxidační činidlo a redukuje se."},
 {r:"Cr₂O₇²⁻ + 6 I⁻ + 14 H⁺ → 2 Cr³⁺ + 3 I₂ + 7 H₂O", q:"Kolik elektronů přijme <b>jeden</b> ion Cr₂O₇²⁻?", o:["3","6","2","12"], c:1, e:"Chrom jde z +VI na +III, tedy 3 elektrony na atom — a atomy jsou <b>dva</b>: celkem <b>6 e⁻</b>. Proto potřebuje 6 jodidů (každý odevzdá 1 e⁻)."},
 {r:"SO₂ + 2 H₂S → 3 S + 2 H₂O", q:"Jak nazveme tuto reakci?", o:["Disproporcionace","Synproporcionace — dvě formy téhož prvku dávají jednu společnou","Neutralizace","Substituce"], c:1, e:"Síra +IV (v SO₂) a síra −II (v H₂S) se sejdou na 0. Opak disproporcionace: <b>synproporcionace</b> (komproporcionace). Základ Clausova procesu odsiřování."},
 {r:"Zn + 2 H⁺ → Zn²⁺ + H₂", q:"Co se <b>oxiduje</b>?", o:["H⁺","Zn","H₂","Zn²⁺"], c:1, e:"Zinek jde z 0 na +II — ztrácí elektrony, oxiduje se. Je to redukční činidlo, které redukuje H⁺ na H₂. Proběhne, protože E°(Zn²⁺/Zn) = −0,76 V je pod vodíkem."}
];

/* ============================================================
   Krokový řešitel vyčíslování — metoda poloreakcí
   ============================================================ */
var BAL = [
 {name:"MnO₄⁻ + Fe²⁺ v kyselém prostředí", target:"MnO₄⁻ + Fe²⁺ → Mn²⁺ + Fe³⁺",
  steps:[
   ["Oxidační čísla","Mn v MnO₄⁻ je <b>+VII</b>, v Mn²⁺ <b>+II</b> → klesá, mangan se <b>redukuje</b>. Fe jde z <b>+II</b> na <b>+III</b> → roste, železo se <b>oxiduje</b>."],
   ["Rozdělit na poloreakce","<span class='chem'>MnO₄⁻ → Mn²⁺</span> &nbsp;(redukce)<br><span class='chem'>Fe²⁺ → Fe³⁺</span> &nbsp;(oxidace)"],
   ["Vyrovnat atomy kromě O a H","Mn: 1 = 1 ✓ &nbsp; Fe: 1 = 1 ✓ — nic není třeba měnit."],
   ["Vyrovnat kyslík vodou, vodík ionty H⁺","Vlevo 4 O → vpravo přidáme 4 H₂O. Tím vpravo přibylo 8 H → vlevo přidáme 8 H⁺.<br><span class='chem'>MnO₄⁻ + 8 H⁺ → Mn²⁺ + 4 H₂O</span>"],
   ["Vyrovnat náboj elektrony","Vlevo: −1 + 8 = <b>+7</b>. Vpravo: <b>+2</b>. Chybí 5 záporných nábojů → vlevo 5 e⁻.<br><span class='chem'>MnO₄⁻ + 8 H⁺ + 5 e⁻ → Mn²⁺ + 4 H₂O</span> &nbsp;(5 e⁻ přijato)<br><span class='chem'>Fe²⁺ → Fe³⁺ + e⁻</span> &nbsp;(1 e⁻ odevzdán)"],
   ["Elektronová bilance","Přijato 5, odevzdán 1 → oxidaci vynásobíme <b>5×</b>, aby se elektrony vykrátily."],
   ["Sečíst a zkontrolovat","<span class='chem'><b>MnO₄⁻ + 5 Fe²⁺ + 8 H⁺ → Mn²⁺ + 5 Fe³⁺ + 4 H₂O</b></span><br>Náboj vlevo: −1 + 10 + 8 = +17; vpravo: +2 + 15 = +17 ✓ &nbsp; Atomy: Mn 1, Fe 5, O 4, H 8 ✓"]
  ]},
 {name:"Cr₂O₇²⁻ + I⁻ v kyselém prostředí", target:"Cr₂O₇²⁻ + I⁻ → Cr³⁺ + I₂",
  steps:[
   ["Oxidační čísla","Cr: <b>+VI → +III</b> (redukce). I: <b>−I → 0</b> (oxidace)."],
   ["Poloreakce","<span class='chem'>Cr₂O₇²⁻ → Cr³⁺</span> &nbsp;·&nbsp; <span class='chem'>I⁻ → I₂</span>"],
   ["Vyrovnat atomy kromě O a H","Dva chromy vlevo → <span class='chem'>Cr₂O₇²⁻ → 2 Cr³⁺</span>. Dva jody vpravo → <span class='chem'>2 I⁻ → I₂</span>. <b>Tady se nejčastěji chybuje</b> — dvojka u Cr³⁺ se zapomíná."],
   ["Kyslík vodou, vodík H⁺","7 O vlevo → 7 H₂O vpravo → 14 H vpravo → 14 H⁺ vlevo.<br><span class='chem'>Cr₂O₇²⁻ + 14 H⁺ → 2 Cr³⁺ + 7 H₂O</span>"],
   ["Náboj elektrony","Vlevo −2 + 14 = +12, vpravo 2·(+3) = +6 → vlevo 6 e⁻.<br><span class='chem'>Cr₂O₇²⁻ + 14 H⁺ + 6 e⁻ → 2 Cr³⁺ + 7 H₂O</span><br><span class='chem'>2 I⁻ → I₂ + 2 e⁻</span>"],
   ["Elektronová bilance","6 přijato, 2 odevzdány → oxidaci <b>3×</b>."],
   ["Součet a kontrola","<span class='chem'><b>Cr₂O₇²⁻ + 6 I⁻ + 14 H⁺ → 2 Cr³⁺ + 3 I₂ + 7 H₂O</b></span><br>Náboj: −2 − 6 + 14 = +6; vpravo +6 ✓. Cr 2, I 6, O 7, H 14 ✓"]
  ]},
 {name:"Cu + HNO₃ (zředěná)", target:"Cu + HNO₃ → Cu(NO₃)₂ + NO + H₂O",
  steps:[
   ["Oxidační čísla","Cu: <b>0 → +II</b> (oxidace). N v NO₃⁻: <b>+V → +II</b> v NO (redukce). Dusičnan v Cu(NO₃)₂ zůstává +V — to je divák."],
   ["Iontové poloreakce","<span class='chem'>Cu → Cu²⁺</span> &nbsp;·&nbsp; <span class='chem'>NO₃⁻ → NO</span>"],
   ["Kyslík vodou, vodík H⁺","3 O vlevo → 1 O vpravo: přidat 2 H₂O vpravo → 4 H⁺ vlevo.<br><span class='chem'>NO₃⁻ + 4 H⁺ → NO + 2 H₂O</span>"],
   ["Náboj elektrony","Vlevo −1 + 4 = +3, vpravo 0 → 3 e⁻ vlevo.<br><span class='chem'>NO₃⁻ + 4 H⁺ + 3 e⁻ → NO + 2 H₂O</span> &nbsp;·&nbsp; <span class='chem'>Cu → Cu²⁺ + 2 e⁻</span>"],
   ["Elektronová bilance","Nejmenší společný násobek 3 a 2 je 6 → redukci <b>2×</b>, oxidaci <b>3×</b>.<br><span class='chem'>3 Cu + 2 NO₃⁻ + 8 H⁺ → 3 Cu²⁺ + 2 NO + 4 H₂O</span>"],
   ["Zpět do molekulového tvaru","8 H⁺ pochází z 8 HNO₃; 6 z nich zůstane jako dusičnan u mědi (3 Cu(NO₃)₂), 2 se redukují na NO.<br><span class='chem'><b>3 Cu + 8 HNO₃ → 3 Cu(NO₃)₂ + 2 NO + 4 H₂O</b></span><br>Všimněte si: <b>nevzniká vodík</b>. Měď je nad vodíkem, oxiduje ji dusičnan, ne H⁺."]
  ]},
 {name:"MnO₄⁻ + SO₃²⁻ v zásaditém prostředí", target:"MnO₄⁻ + SO₃²⁻ → MnO₂ + SO₄²⁻ (OH⁻)",
  steps:[
   ["Oxidační čísla","Mn: <b>+VII → +IV</b> (redukce, jen 3 e⁻ — v zásaditém prostředí se manganistan redukuje jen na MnO₂). S: <b>+IV → +VI</b> (oxidace)."],
   ["Poloreakce a vyrovnání jako v kyselém","Nejdřív předstírejte kyselé prostředí:<br><span class='chem'>MnO₄⁻ + 4 H⁺ + 3 e⁻ → MnO₂ + 2 H₂O</span><br><span class='chem'>SO₃²⁻ + H₂O → SO₄²⁻ + 2 H⁺ + 2 e⁻</span>"],
   ["Elektronová bilance","3 a 2 → redukci <b>2×</b>, oxidaci <b>3×</b>:<br><span class='chem'>2 MnO₄⁻ + 8 H⁺ + 3 SO₃²⁻ + 3 H₂O → 2 MnO₂ + 4 H₂O + 3 SO₄²⁻ + 6 H⁺</span>"],
   ["Vykrátit H⁺ a H₂O","Vlevo 8 H⁺, vpravo 6 H⁺ → zbude 2 H⁺ vlevo. Vlevo 3 H₂O, vpravo 4 → zbude 1 H₂O vpravo.<br><span class='chem'>2 MnO₄⁻ + 3 SO₃²⁻ + 2 H⁺ → 2 MnO₂ + 3 SO₄²⁻ + H₂O</span>"],
   ["Přechod do zásaditého prostředí","Ke každému H⁺ přidáme na obě strany OH⁻: 2 H⁺ + 2 OH⁻ = 2 H₂O vlevo. Vlevo 2 H₂O, vpravo 1 H₂O → vykrátit.<br><span class='chem'><b>2 MnO₄⁻ + 3 SO₃²⁻ + H₂O → 2 MnO₂ + 3 SO₄²⁻ + 2 OH⁻</b></span>"],
   ["Kontrola","Náboj: −2 − 6 = −8; vpravo −6 − 2 = −8 ✓. Mn 2, S 3, O 8 + 9 + 1 = 18 vs 4 + 12 + 2 = 18 ✓, H 2 = 2 ✓. Fialový roztok zhnědne — vzniká sraženina MnO₂."]
  ]}
];

/* ============================================================
   Elektrolýza — průzkumník
   ============================================================ */
var ELX = [
 {id:"nacl-melt", name:"Tavenina NaCl", ions:["Na⁺","Cl⁻"], elec:"inertní (grafit / ocel)",
  cat:"Na⁺ + e⁻ → Na", an:"2 Cl⁻ → Cl₂ + 2 e⁻", total:"2 NaCl(l) → 2 Na(l) + Cl₂(g)", prodC:"Na (l)", prodA:"Cl₂ (g)",
  why:"V tavenině není voda, takže není s čím soutěžit. Na katodě se musí redukovat Na⁺ (jiný kation není), na anodě se oxiduje Cl⁻.",
  ind:"Downsův proces — jediný způsob výroby kovového sodíku. Teplota ≈ 600 °C (snížená přídavkem CaCl₂), napětí ≈ 7 V."},
 {id:"nacl-aq", name:"Roztok NaCl (solanka)", ions:["Na⁺","Cl⁻","H₂O"], elec:"inertní (grafit, Ti/RuO₂)",
  cat:"2 H₂O + 2 e⁻ → H₂ + 2 OH⁻", an:"2 Cl⁻ → Cl₂ + 2 e⁻", total:"2 NaCl + 2 H₂O → 2 NaOH + H₂ + Cl₂", prodC:"H₂ (g) + OH⁻", prodA:"Cl₂ (g)",
  why:"Na katodě soutěží Na⁺ (−2,71 V) s vodou (−0,83 V): redukuje se voda, sodík zůstává v roztoku. Na anodě by měl podle E° jít kyslík (1,23 V) před chlorem (1,36 V), ale kyslík má velké <b>přepětí</b> a v koncentrované solance se vylučuje chlor.",
  ind:"Membránový proces: katodový a anodový prostor odděluje iontoměničová membrána propouštějící jen Na⁺, aby se Cl₂ a NaOH nesetkaly. Tři produkty najednou: NaOH, Cl₂, H₂."},
 {id:"nacl-hg", name:"Roztok NaCl na rtuťové katodě", ions:["Na⁺","Cl⁻","H₂O"], elec:"katoda Hg, anoda grafit",
  cat:"Na⁺ + e⁻ → Na (amalgám NaHgₓ)", an:"2 Cl⁻ → Cl₂ + 2 e⁻", total:"2 NaCl + 2 H₂O → 2 NaOH + H₂ + Cl₂ (přes amalgám)", prodC:"Na v amalgámu", prodA:"Cl₂ (g)",
  why:"Na rtuti má vodík obrovské přepětí (≈ 1 V), takže se voda neredukuje a vyloučí se sodík — rozpouští se ve rtuti jako amalgám. Ten se pak rozkládá vodou na NaOH a H₂.",
  ind:"Amalgámový proces — historicky hlavní, dnes utlumovaný kvůli rtuti. Dává velmi čistý NaOH."},
 {id:"water", name:"Voda okyselená H₂SO₄", ions:["H⁺","SO₄²⁻","H₂O"], elec:"inertní (Pt)",
  cat:"2 H⁺ + 2 e⁻ → H₂", an:"2 H₂O → O₂ + 4 H⁺ + 4 e⁻", total:"2 H₂O → 2 H₂ + O₂", prodC:"H₂ (g)", prodA:"O₂ (g)",
  why:"Síran se nevybíjí (síra je už +VI, nemá co odevzdat), takže se na anodě oxiduje voda. Objemový poměr H₂ : O₂ = <b>2 : 1</b> plyne z elektronové bilance: na 4 e⁻ vzniknou 2 H₂ a 1 O₂.",
  ind:"Výroba čistého vodíku a kyslíku; Hofmannův přístroj ve školní laboratoři. Rozkladné napětí vody je 1,23 V, prakticky se kvůli přepětí používá ≈ 1,8–2 V."},
 {id:"cuso4-inert", name:"Roztok CuSO₄, inertní elektrody", ions:["Cu²⁺","SO₄²⁻","H₂O"], elec:"inertní (grafit / Pt)",
  cat:"Cu²⁺ + 2 e⁻ → Cu", an:"2 H₂O → O₂ + 4 H⁺ + 4 e⁻", total:"2 CuSO₄ + 2 H₂O → 2 Cu + O₂ + 2 H₂SO₄", prodC:"Cu (s)", prodA:"O₂ (g)",
  why:"Cu²⁺ (+0,34 V) se redukuje snadněji než voda, na katodě roste měď. Síran se nevybíjí, na anodě se oxiduje voda na kyslík a roztok <b>kysne</b> (přibývá H⁺). Modrá barva slábne.",
  ind:"Elektrolytická výroba mědi z výluhů (electrowinning)."},
 {id:"cuso4-cu", name:"Roztok CuSO₄, měděné elektrody", ions:["Cu²⁺","SO₄²⁻","H₂O"], elec:"aktivní — obě z mědi",
  cat:"Cu²⁺ + 2 e⁻ → Cu", an:"Cu → Cu²⁺ + 2 e⁻", total:"Cu(anoda) → Cu(katoda)", prodC:"čistá Cu", prodA:"anoda se rozpouští",
  why:"Aktivní anoda: oxidace mědi (0,34 V) je snazší než oxidace vody (1,23 V), takže se rozpouští <b>anoda</b>, ne voda. Koncentrace Cu²⁺ se nemění, měď se jen přenáší z anody na katodu.",
  ind:"<b>Elektrolytická rafinace mědi</b>: anoda ze surové mědi (99 %), katoda z čisté; ušlechtilejší nečistoty (Ag, Au) padají do anodového kalu, neušlechtilé (Zn, Fe) zůstávají v roztoku. Výsledek 99,99 % Cu pro vodiče."},
 {id:"agno3", name:"Roztok AgNO₃ (pokovování)", ions:["Ag⁺","NO₃⁻","H₂O"], elec:"katoda = pokovovaný předmět, anoda Ag",
  cat:"Ag⁺ + e⁻ → Ag", an:"Ag → Ag⁺ + e⁻", total:"Ag(anoda) → Ag(na předmětu)", prodC:"vrstva Ag", prodA:"anoda se rozpouští",
  why:"Ag⁺ (0,80 V) se redukuje mnohem snáz než voda. Stříbrná anoda doplňuje Ag⁺ do lázně, takže koncentrace zůstává stálá.",
  ind:"<b>Galvanické pokovování</b>: předmět je vždy <b>katoda</b> (záporný pól). Stejně se zlatí, niklu, chromuje, zinkuje. Množství vyloučeného kovu řídí Faradayovy zákony."},
 {id:"ki", name:"Roztok KI", ions:["K⁺","I⁻","H₂O"], elec:"inertní (grafit)",
  cat:"2 H₂O + 2 e⁻ → H₂ + 2 OH⁻", an:"2 I⁻ → I₂ + 2 e⁻", total:"2 KI + 2 H₂O → 2 KOH + H₂ + I₂", prodC:"H₂ (g) + OH⁻", prodA:"I₂ (hnědé)",
  why:"K⁺ (−2,93 V) se z vody neredukuje. Jodid (0,54 V) se oxiduje ještě snáz než chlorid — u anody roztok hnědne jodem (důkaz škrobem), u katody zmodrá fenolftalein díky OH⁻.",
  ind:"Školní důkaz: ukazuje, že anodový a katodový děj jsou prostorově oddělené."},
 {id:"al2o3", name:"Tavenina Al₂O₃ v kryolitu", ions:["Al³⁺","O²⁻"], elec:"grafit (anoda se spotřebovává)",
  cat:"Al³⁺ + 3 e⁻ → Al", an:"2 O²⁻ → O₂ + 4 e⁻ &nbsp;(O₂ + C → CO₂)", total:"2 Al₂O₃ + 3 C → 4 Al + 3 CO₂", prodC:"Al (l)", prodA:"O₂ → CO₂",
  why:"Hliník (−1,66 V) nelze získat z vodného roztoku — vyloučil by se vodík. Al₂O₃ taje až při 2050 °C, proto se rozpouští v kryolitu Na₃AlF₆ (≈ 950 °C). Kyslík na uhlíkové anodě hned reaguje na CO₂, anody se musí vyměňovat.",
  ind:"<b>Hallův–Héroultův proces</b>. Na 1 kg Al se spotřebuje ≈ 13–15 kWh; proto se hliník recykluje."},
 {id:"znso4", name:"Roztok ZnSO₄ (zinkování)", ions:["Zn²⁺","SO₄²⁻","H₂O"], elec:"katoda = předmět, anoda Zn",
  cat:"Zn²⁺ + 2 e⁻ → Zn", an:"Zn → Zn²⁺ + 2 e⁻", total:"Zn(anoda) → Zn(na předmětu)", prodC:"vrstva Zn", prodA:"anoda se rozpouští",
  why:"Podle E° by se měla redukovat voda (−0,83 V je výš než −0,76 V jen těsně), ale vodík má na zinku <b>vysoké přepětí</b>, takže se vylučuje zinek. Hranice „kovy s E° ≳ −0,8 V se vyloučí z roztoku“ je právě proto tak neostrá.",
  ind:"Galvanické zinkování — ochrana oceli obětovanou anodou (viz koroze)."}
];
function EL_(id){ for(var i=0;i<ELX.length;i++){ if(ELX[i].id===id) return ELX[i]; } return null; }

/* ============================================================
   Praktické články
   ============================================================ */
var CELLS = [
 {id:"daniell", name:"Daniellův článek", type:"galvanický (modelový)", U:"1,10 V", anMat:"Zn", catMat:"Cu", elyt:"ZnSO₄ ‖ CuSO₄",
  an:"Zn → Zn²⁺ + 2 e⁻", cat:"Cu²⁺ + 2 e⁻ → Cu", total:"Zn + Cu²⁺ → Zn²⁺ + Cu",
  note:"Historický článek (1836), dnes učebnicový model. Napětí je přesně rozdíl E°: 0,34 − (−0,76) = 1,10 V. Solný můstek uzavírá obvod ionty."},
 {id:"leclanche", name:"Leclanchéův (zinko-uhlíkový) článek", type:"primární (nenabíjecí)", U:"1,5 V", anMat:"Zn (obal)", catMat:"C + MnO₂", elyt:"NH₄Cl + ZnCl₂ (pasta)",
  an:"Zn → Zn²⁺ + 2 e⁻", cat:"2 MnO₂ + 2 NH₄⁺ + 2 e⁻ → Mn₂O₃ + 2 NH₃ + H₂O", total:"Zn + 2 MnO₂ + 2 NH₄⁺ → Zn²⁺ + Mn₂O₃ + 2 NH₃ + H₂O",
  note:"Uhlíková tyčinka je jen sběrač proudu — skutečné oxidační činidlo je <b>burel MnO₂</b>. Zinkový obal se spotřebovává, proto vybité baterie „tečou“."},
 {id:"alk", name:"Alkalický článek", type:"primární", U:"1,5 V", anMat:"Zn (prášek)", catMat:"MnO₂", elyt:"KOH",
  an:"Zn + 2 OH⁻ → ZnO + H₂O + 2 e⁻", cat:"2 MnO₂ + H₂O + 2 e⁻ → Mn₂O₃ + 2 OH⁻", total:"Zn + 2 MnO₂ → ZnO + Mn₂O₃",
  note:"Stejná chemie Zn/MnO₂, ale v zásaditém elektrolytu KOH — proto „alkalický“. Vydrží 3–5× déle než Leclanché a méně teče."},
 {id:"pb", name:"Olověný akumulátor", type:"sekundární (nabíjecí)", U:"2,05 V / článek (6 článků = 12 V)", anMat:"Pb", catMat:"PbO₂", elyt:"H₂SO₄ (≈ 35 %)",
  an:"Pb + SO₄²⁻ → PbSO₄ + 2 e⁻", cat:"PbO₂ + SO₄²⁻ + 4 H⁺ + 2 e⁻ → PbSO₄ + 2 H₂O", total:"Pb + PbO₂ + 2 H₂SO₄ ⇌ 2 PbSO₄ + 2 H₂O",
  note:"Vybíjení = galvanický článek (doprava), nabíjení = elektrolýza (doleva). Při obou dějích je olověná elektroda <b>záporný pól</b> a PbO₂ <b>kladný pól</b> — ale role anoda/katoda se <b>prohodí</b>: při nabíjení je Pb katoda (redukce PbSO₄ → Pb). Hustota kyseliny klesá s vybíjením — hustoměr měří stav nabití."},
 {id:"nimh", name:"NiMH akumulátor", type:"sekundární", U:"1,2 V", anMat:"slitina s hydridem (MH)", catMat:"NiO(OH)", elyt:"KOH",
  an:"MH + OH⁻ → M + H₂O + e⁻", cat:"NiO(OH) + H₂O + e⁻ → Ni(OH)₂ + OH⁻", total:"MH + NiO(OH) → M + Ni(OH)₂",
  note:"Nástupce NiCd bez jedovatého kadmia. Vodík je uložen v kovové slitině jako hydrid. Nižší napětí (1,2 V) než alkalický článek."},
 {id:"liion", name:"Li-ion akumulátor", type:"sekundární", U:"3,6–3,7 V", anMat:"grafit s Li (LiₓC₆)", catMat:"LiCoO₂ / LiFePO₄", elyt:"bezvodý organický (LiPF₆)",
  an:"LiₓC₆ → x Li⁺ + x e⁻ + C₆", cat:"Li₁₋ₓCoO₂ + x Li⁺ + x e⁻ → LiCoO₂", total:"LiₓC₆ + Li₁₋ₓCoO₂ → C₆ + LiCoO₂",
  note:"Lithium je nejsilnější redukční činidlo (−3,04 V), proto vysoké napětí a energie na kilogram. Ionty Li⁺ se jen přesouvají mezi vrstvami („houpací křeslo“). Bezvodý elektrolyt je nutný — lithium by s vodou reagovalo; odtud riziko požáru."},
 {id:"fuel", name:"Palivový článek H₂/O₂", type:"palivový (trvale napájený)", U:"1,23 V teoreticky (≈ 0,7–0,9 V v praxi)", anMat:"Pt/C (H₂)", catMat:"Pt/C (O₂)", elyt:"protonová membrána nebo KOH",
  an:"H₂ → 2 H⁺ + 2 e⁻", cat:"O₂ + 4 H⁺ + 4 e⁻ → 2 H₂O", total:"2 H₂ + O₂ → 2 H₂O",
  note:"Hoření vodíku rozdělené na dvě elektrody — chemická energie přímo na elektrickou, bez tepelného stroje, jediný odpad je voda. Reaktanty se dodávají zvenčí, takže se článek „nevybije“. Pokles napětí pod 1,23 V je přepětí (pomalá redukce O₂)."}
];
function C_(id){ for(var i=0;i<CELLS.length;i++){ if(CELLS[i].id===id) return CELLS[i]; } return null; }

/* ============================================================
   Koroze — režimy ochrany
   ============================================================ */
var CORR = [
 {id:"none", name:"Bez ochrany", ok:false, verdict:"Železo koroduje",
  d:"Kapka vody na železe je hotový galvanický článek. Uprostřed (méně kyslíku) je <b>anodické místo</b>: Fe → Fe²⁺ + 2 e⁻. Na okraji kapky (víc rozpuštěného O₂) je <b>katodické místo</b>: O₂ + 2 H₂O + 4 e⁻ → 4 OH⁻. Elektrony tečou kovem, ionty vodou. Fe²⁺ + OH⁻ dávají Fe(OH)₂, který kyslík dooxiduje na rez Fe₂O₃·xH₂O.",
  fx:"Sůl (NaCl) zvýší vodivost elektrolytu → rychleji. Nižší pH → rychleji (H⁺ je další oxidační činidlo). Víc O₂ a vlhkosti → rychleji."},
 {id:"paint", name:"Nátěr / smalt", ok:true, verdict:"Chráněno, dokud je vrstva celistvá",
  d:"Nátěr je pouhá <b>bariéra</b>: odděluje kov od vody a kyslíku. Nemá žádnou elektrochemickou aktivitu. Jakmile se poškrábe, koroze v rýze běží normálně — a často pod nátěrem podkorodovává dál.",
  fx:"Levné, univerzální, ale vyžaduje údržbu. Smalt na vanách, barva na mostech."},
 {id:"zinc", name:"Pozinkování (Zn)", ok:true, verdict:"Chráněno i po poškrábání",
  d:"Zinek je <b>méně ušlechtilý</b> než železo (−0,76 &lt; −0,44 V). V rýze vznikne článek Zn–Fe, ve kterém je anodou <b>zinek</b>: rozpouští se on, a železo je katoda, na které se jen redukuje kyslík. Zinek je <b>obětovaná anoda</b> — chrání i odhalené železo v okolí.",
  fx:"Zinek se navíc sám pasivuje uhličitanem. Pozinkované plechy, svodidla, šrouby."},
 {id:"tin", name:"Pocínování (Sn)", ok:false, verdict:"Po poškrábání koroduje železo rychleji než holé",
  d:"Cín je <b>ušlechtilejší</b> než železo (−0,14 &gt; −0,44 V). Dokud je vrstva celá, chrání jako bariéra. Po poškrábání vznikne článek Fe–Sn, kde anodou je <b>železo</b> — rozpouští se ono, a velká cínová plocha jako katoda korozi ještě urychlí.",
  fx:"Používá se u konzerv, protože cín je nejedovatý a s kyselinami v potravinách nereaguje. Promáčknutá konzerva = riziko."},
 {id:"mg", name:"Katodická ochrana obětovanou anodou (Mg, Zn)", ok:true, verdict:"Chráněno, dokud se anoda nerozpustí",
  d:"K ocelovému potrubí či trupu lodi se vodivě připojí blok hořčíku nebo zinku. Ten je mnohem méně ušlechtilý, stane se <b>anodou</b> a rozpouští se; celá ocel je <b>katoda</b> a nekoroduje. Bloky se periodicky vyměňují.",
  fx:"Lodě, plynovody, ohřívače vody (hořčíková tyč v bojleru), pobřežní stavby."},
 {id:"source", name:"Katodická ochrana vnějším zdrojem", ok:true, verdict:"Chráněno",
  d:"Konstrukce se připojí k <b>zápornému pólu</b> stejnosměrného zdroje, k plusu inertní anoda zakopaná v zemi. Zdroj tlačí elektrony do oceli, takže je celá katodou a Fe → Fe²⁺ nemůže probíhat.",
  fx:"Dlouhá potrubí, nádrže, ocelové piloty. Levnější provoz než výměna obětovaných anod u velkých staveb."},
 {id:"pass", name:"Pasivace (Al₂O₃, Cr v nerezi)", ok:true, verdict:"Chráněno vlastní vrstvičkou oxidu",
  d:"Hliník je neušlechtilý (−1,66 V), a přesto nerezaví: na vzduchu se okamžitě pokryje tenkou, celistvou, nevodivou vrstvou <b>Al₂O₃</b>, která se sama obnovuje. Nerezová ocel obsahuje ≥ 12 % Cr, které tvoří vrstvičku Cr₂O₃. Eloxování vrstvu Al₂O₃ uměle ztlustí elektrolýzou.",
  fx:"Železo, Al i Cr se pasivují také v koncentrované HNO₃ — proto se v ní dá přepravovat v ocelových cisternách. Chloridy pasivační vrstvu narušují (bodová koroze nerezi v moři)."},
 {id:"inh", name:"Inhibitory koroze", ok:true, verdict:"Zpomaleno",
  d:"Látky přidané do vody (chromany, fosforečnany, dusitany, organické aminy), které se adsorbují na povrch nebo vytvoří ochrannou vrstvu a zablokují anodický či katodický děj.",
  fx:"Chladicí okruhy, nemrznoucí směsi v autech, vrtné kapaliny."},
 {id:"cu", name:"Kontakt s mědí (spoj Fe–Cu)", ok:false, verdict:"Železo koroduje rychleji — kontaktní koroze",
  d:"Měď je ušlechtilejší (+0,34 V). Ve vodivém spoji s vlhkostí vznikne článek, kde železo je <b>anoda</b> a rozpouští se, měď je katoda. Čím větší plocha mědi, tím rychleji. Tomu se říká <b>kontaktní (bimetalická) koroze</b>.",
  fx:"Měděné potrubí navázané na ocelové bez izolační vsuvky, mosazné šrouby v ocelovém plechu."}
];
function CO_(id){ for(var i=0;i<CORR.length;i++){ if(CORR[i].id===id) return CORR[i]; } return null; }

/* Molární hmotnosti pro Faradayovu kalkulačku */
var FMET = [
 {s:"Cu", ion:"Cu²⁺", M:63.55, z:2},
 {s:"Ag", ion:"Ag⁺",  M:107.87, z:1},
 {s:"Zn", ion:"Zn²⁺", M:65.38, z:2},
 {s:"Ni", ion:"Ni²⁺", M:58.69, z:2},
 {s:"Al", ion:"Al³⁺", M:26.98, z:3},
 {s:"Au", ion:"Au³⁺", M:196.97, z:3},
 {s:"Cr", ion:"Cr³⁺", M:52.00, z:3},
 {s:"H₂", ion:"2 H⁺", M:2.016, z:2},
 {s:"O₂", ion:"2 H₂O", M:32.00, z:4},
 {s:"Cl₂",ion:"2 Cl⁻", M:70.90, z:2}
];
