/* ============================================================
   T0 · DATA — tabulkové hodnoty (25 °C), látky, reakce
   Zdroje: CRC Handbook, Atkins (čes. překlad), Chemické tabulky.
   Hodnoty pKa pod nulou (silné kyseliny) jsou odhady — ve vodě
   je nelze změřit (vyrovnávací efekt vody).
   ============================================================ */

/* horní index z čísla: -5 → ⁻⁵ */
var SUPS={"0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹","-":"⁻"};
function sup(n){ return String(n).split("").map(function(ch){return SUPS[ch]||ch;}).join(""); }
/* vědecký zápis s českou čárkou: 1.74e-5 → 1,7·10⁻⁵ */
function sci(v,d){
  if(v===null||v===undefined||isNaN(v)) return "—";
  if(v===0) return "0";
  if(d===undefined) d=1;
  var e=Math.floor(Math.log10(Math.abs(v)));
  var m=v/Math.pow(10,e);
  if(Math.abs(m)>=9.95){ m/=10; e+=1; }
  var ms=fmt(m,d);
  if(e===0) return ms;
  return ms+"·10"+sup(e);
}

/* ------------------------------------------------------------
   Kyseliny a báze pro prohledávatelnou tabulku.
   kind: "kys" | "baz"; org: organická; pK = pKa nebo pKb;
   approx: hodnota jen orientační; strong: úplná disociace.
   ------------------------------------------------------------ */
var KATAB=[
 {f:"HClO₄",n:"kyselina chloristá",kind:"kys",org:false,pK:-10,approx:true,conj:"ClO₄⁻",note:"Nejsilnější běžná kyselina. Ve vodě nerozlišitelná od HCl — vyrovnávací efekt."},
 {f:"HI",n:"jodovodík (kys. jodovodíková)",kind:"kys",org:false,pK:-10,approx:true,conj:"I⁻",note:"Nejsilnější halogenovodík: dlouhá, slabá vazba H–I (299 kJ·mol⁻¹)."},
 {f:"HBr",n:"bromovodík",kind:"kys",org:false,pK:-9,approx:true,conj:"Br⁻",note:"Silná kyselina; vazba H–Br 366 kJ·mol⁻¹."},
 {f:"HCl",n:"chlorovodík (kys. chlorovodíková)",kind:"kys",org:false,pK:-7,approx:true,conj:"Cl⁻",note:"Silná kyselina; Cl⁻ je tak slabá báze, že se ve vodě nehydrolyzuje."},
 {f:"H₂SO₄",n:"kyselina sírová (1. stupeň)",kind:"kys",org:false,pK:-3,approx:true,conj:"HSO₄⁻",note:"První proton odštěpí úplně, druhý (HSO₄⁻) už jen částečně."},
 {f:"HNO₃",n:"kyselina dusičná",kind:"kys",org:false,pK:-1.4,approx:true,conj:"NO₃⁻",note:"Silná; dusičnany se nehydrolyzují."},
 {f:"H₃O⁺",n:"oxoniový kation",kind:"kys",org:false,pK:0,approx:false,conj:"H₂O",note:"Nejsilnější kyselina, která může ve vodě existovat. Referenční bod škály (pKa = 0 dohodou)."},
 {f:"HSO₄⁻",n:"hydrogensíranový anion",kind:"kys",org:false,pK:1.99,approx:false,conj:"SO₄²⁻",note:"Středně silná. Proto je NaHSO₄ kyselý — nejde o hydrolýzu, ale o disociaci."},
 {f:"(COOH)₂",n:"kyselina šťavelová (1. stupeň)",kind:"kys",org:true,pK:1.25,approx:false,conj:"HOOC–COO⁻",note:"Nejsilnější běžná karboxylová kyselina: dvě skupiny COOH se navzájem posilují (−I efekt). pKa₂ = 4,27."},
 {f:"H₂SO₃",n:"kyselina siřičitá (1. stupeň)",kind:"kys",org:false,pK:1.81,approx:false,conj:"HSO₃⁻",note:"Slabší než H₂SO₄ — méně kyslíků na síře."},
 {f:"HClO₂",n:"kyselina chloritá",kind:"kys",org:false,pK:1.94,approx:false,conj:"ClO₂⁻",note:"Řada HClO < HClO₂ < HClO₃ < HClO₄: každý kyslík navíc kyselinu posílí."},
 {f:"H₃PO₄",n:"kyselina fosforečná (1. stupeň)",kind:"kys",org:false,pK:2.15,approx:false,conj:"H₂PO₄⁻",note:"Středně silná trojsytná kyselina: pKa 2,15 / 7,20 / 12,3."},
 {f:"FCH₂COOH",n:"kyselina fluoroctová",kind:"kys",org:true,pK:2.59,approx:false,conj:"FCH₂COO⁻",note:"Fluor má největší −I efekt: silnější než chloroctová."},
 {f:"ClCH₂COOH",n:"kyselina chloroctová",kind:"kys",org:true,pK:2.87,approx:false,conj:"ClCH₂COO⁻",note:"Jeden chlor zvedne sílu proti kyselině octové skoro 80×."},
 {f:"Cl₂CHCOOH",n:"kyselina dichloroctová",kind:"kys",org:true,pK:1.35,approx:false,conj:"Cl₂CHCOO⁻",note:"Dva chlory — další řádový nárůst síly."},
 {f:"Cl₃CCOOH",n:"kyselina trichloroctová",kind:"kys",org:true,pK:0.66,approx:false,conj:"Cl₃CCOO⁻",note:"Tři chlory: prakticky tak silná jako středně silné anorganické kyseliny."},
 {f:"HF",n:"fluorovodík (kys. fluorovodíková)",kind:"kys",org:false,pK:3.17,approx:false,conj:"F⁻",note:"Jediný slabý halogenovodík — krátká, velmi pevná vazba H–F (567 kJ·mol⁻¹)."},
 {f:"HNO₂",n:"kyselina dusitá",kind:"kys",org:false,pK:3.25,approx:false,conj:"NO₂⁻",note:"Slabá, na rozdíl od HNO₃; dusitany se hydrolyzují zásaditě."},
 {f:"HCOOH",n:"kyselina mravenčí",kind:"kys",org:true,pK:3.75,approx:false,conj:"HCOO⁻",note:"Silnější než octová — chybí jí methyl s +I efektem."},
 {f:"C₆H₅COOH",n:"kyselina benzoová",kind:"kys",org:true,pK:4.20,approx:false,conj:"C₆H₅COO⁻",note:"Aromatické jádro je mírně elektronakceptorové → o něco silnější než octová."},
 {f:"CH₃COOH",n:"kyselina octová",kind:"kys",org:true,pK:4.76,approx:false,conj:"CH₃COO⁻",note:"Referenční slabá kyselina. Ka = 1,74·10⁻⁵."},
 {f:"C₃H₇COOH",n:"kyselina butanová (máselná)",kind:"kys",org:true,pK:4.82,approx:false,conj:"C₃H₇COO⁻",note:"Delší alkyl kyselinu ještě nepatrně oslabí (+I efekt)."},
 {f:"H₂CO₃",n:"kyselina uhličitá (1. stupeň)",kind:"kys",org:false,pK:6.35,approx:false,conj:"HCO₃⁻",note:"Slabá; ve vodě je většina „kyseliny“ ve formě rozpuštěného CO₂. pKa₂ = 10,33."},
 {f:"H₂S",n:"sulfan (sirovodík)",kind:"kys",org:false,pK:7.05,approx:false,conj:"HS⁻",note:"Slabá dvojsytná kyselina; druhý stupeň (HS⁻) je extrémně slabý (pKa₂ ≈ 19)."},
 {f:"H₂PO₄⁻",n:"dihydrogenfosforečnanový anion",kind:"kys",org:false,pK:7.20,approx:false,conj:"HPO₄²⁻",note:"Amfolyt. Pár H₂PO₄⁻/HPO₄²⁻ je hlavní pufr uvnitř buněk."},
 {f:"HClO",n:"kyselina chlorná",kind:"kys",org:false,pK:7.54,approx:false,conj:"ClO⁻",note:"Velmi slabá; účinná složka Sava. Chlornany se hydrolyzují zásaditě."},
 {f:"HBrO",n:"kyselina bromná",kind:"kys",org:false,pK:8.63,approx:false,conj:"BrO⁻",note:"Slabší než HClO: centrální atom má menší elektronegativitu."},
 {f:"HCN",n:"kyanovodík",kind:"kys",org:false,pK:9.21,approx:false,conj:"CN⁻",note:"Velmi slabá. Proto kyanidy s kyselinou uvolňují plynný HCN — smrtelně nebezpečné."},
 {f:"H₃BO₃",n:"kyselina boritá",kind:"kys",org:false,pK:9.24,approx:false,conj:"B(OH)₄⁻",note:"Lewisova kyselina: neodštěpuje H⁺, ale přijímá OH⁻ na atom boru."},
 {f:"NH₄⁺",n:"amonný kation",kind:"kys",org:false,pK:9.25,approx:false,conj:"NH₃",note:"Slabá kyselina — proto jsou amonné soli silných kyselin kyselé."},
 {f:"C₆H₅OH",n:"fenol",kind:"kys",org:true,pK:9.99,approx:false,conj:"C₆H₅O⁻",note:"Milionkrát silnější než ethanol (rezonance fenoxidu), ale slabší než H₂CO₃ — s NaHCO₃ nešumí."},
 {f:"HCO₃⁻",n:"hydrogenuhličitanový anion",kind:"kys",org:false,pK:10.33,approx:false,conj:"CO₃²⁻",note:"Amfolyt; jako kyselina velmi slabá, jako báze (pKb 7,65) silnější → NaHCO₃ je slabě zásaditý."},
 {f:"HIO",n:"kyselina jodná",kind:"kys",org:false,pK:10.64,approx:false,conj:"IO⁻",note:"Nejslabší z HXO — nejméně elektronegativní centrální atom."},
 {f:"C₂H₅SH",n:"ethanthiol",kind:"kys",org:true,pK:10.6,approx:false,conj:"C₂H₅S⁻",note:"Thioly jsou o 5 řádů kyselejší než alkoholy: velký atom síry lépe nese záporný náboj."},
 {f:"H₂O₂",n:"peroxid vodíku",kind:"kys",org:false,pK:11.65,approx:false,conj:"HO₂⁻",note:"Slabě kyselý — silnější než voda."},
 {f:"HPO₄²⁻",n:"hydrogenfosforečnanový anion",kind:"kys",org:false,pK:12.3,approx:false,conj:"PO₄³⁻",note:"Třetí stupeň H₃PO₄; prakticky nedisociuje."},
 {f:"H₂O",n:"voda",kind:"kys",org:false,pK:14.0,approx:false,conj:"OH⁻",note:"Jako kyselina: Ka = Kw/1 = 10⁻¹⁴ (středoškolská konvence). Amfolyt."},
 {f:"C₂H₅OH",n:"ethanol",kind:"kys",org:true,pK:15.9,approx:true,conj:"C₂H₅O⁻",note:"Slabší kyselina než voda — ethoxid je silnější báze než OH⁻."},
 {f:"NH₃ (jako kyselina)",n:"amoniak",kind:"kys",org:false,pK:35,approx:true,conj:"NH₂⁻",note:"Amidový anion NH₂⁻ je jedna z nejsilnějších bází vůbec; ve vodě okamžitě odtrhne proton."},
 {f:"CH₄",n:"methan",kind:"kys",org:true,pK:50,approx:true,conj:"CH₃⁻",note:"Prakticky žádná kyselost. Karbanion CH₃⁻ existuje jen v organokovech."},

 {f:"KOH",n:"hydroxid draselný",kind:"baz",org:false,pK:null,strong:true,conj:"—",note:"Silná zásada: iontová sloučenina, ve vodě úplně disociuje na K⁺ a OH⁻."},
 {f:"NaOH",n:"hydroxid sodný",kind:"baz",org:false,pK:null,strong:true,conj:"—",note:"Silná zásada; „zásada“ je tu vlastně OH⁻, Na⁺ je jen divák."},
 {f:"Ca(OH)₂",n:"hydroxid vápenatý",kind:"baz",org:false,pK:1.4,approx:true,conj:"CaOH⁺",note:"Silná, ale málo rozpustná (vápenná voda ≈ 0,02 mol·dm⁻³)."},
 {f:"PO₄³⁻",n:"fosforečnanový anion",kind:"baz",org:false,pK:1.70,approx:false,conj:"HPO₄²⁻",note:"Silná báze — roztok Na₃PO₄ má pH ≈ 12,5 (odmašťovadlo)."},
 {f:"guanidin",n:"guanidin",kind:"baz",org:true,pK:0.4,approx:true,conj:"guanidinium",note:"Nejsilnější organická báze: kation je rezonančně stabilizovaný přes tři dusíky (v argininu)."},
 {f:"(CH₃)₂NH",n:"dimethylamin",kind:"baz",org:true,pK:3.27,approx:false,conj:"(CH₃)₂NH₂⁺",note:"Dva alkyly (+I) — nejsilnější z methylaminů."},
 {f:"C₂H₅NH₂",n:"ethylamin",kind:"baz",org:true,pK:3.30,approx:false,conj:"C₂H₅NH₃⁺",note:"Primární alifatický amin; ~25× silnější báze než NH₃."},
 {f:"CH₃NH₂",n:"methylamin",kind:"baz",org:true,pK:3.36,approx:false,conj:"CH₃NH₃⁺",note:"Methyl tlačí elektrony na dusík (+I) → volný pár je dostupnější než u NH₃."},
 {f:"CO₃²⁻",n:"uhličitanový anion",kind:"baz",org:false,pK:3.67,approx:false,conj:"HCO₃⁻",note:"Poměrně silná báze: soda (Na₂CO₃) má pH ≈ 11,6 — proto se s ní pere."},
 {f:"(CH₃)₃N",n:"trimethylamin",kind:"baz",org:true,pK:4.19,approx:false,conj:"(CH₃)₃NH⁺",note:"Slabší než dimethylamin: kation se hůř solvatuje (jen jeden H na dusíku)."},
 {f:"NH₃",n:"amoniak",kind:"baz",org:false,pK:4.75,approx:false,conj:"NH₄⁺",note:"Referenční slabá báze. Kb = 1,78·10⁻⁵ — číselně stejně „slabá“ jako kyselina octová."},
 {f:"CN⁻",n:"kyanidový anion",kind:"baz",org:false,pK:4.79,approx:false,conj:"HCN",note:"Slabá báze srovnatelná s NH₃; kyanidy se hydrolyzují silně zásaditě."},
 {f:"N₂H₄",n:"hydrazin",kind:"baz",org:false,pK:5.90,approx:false,conj:"N₂H₅⁺",note:"Slabší než NH₃: druhý dusík odtahuje elektrony."},
 {f:"ClO⁻",n:"chlornanový anion",kind:"baz",org:false,pK:6.46,approx:false,conj:"HClO",note:"Roztok NaClO (Savo) je silně zásaditý (pH ≈ 10–12)."},
 {f:"HPO₄²⁻ (jako báze)",n:"hydrogenfosforečnanový anion",kind:"baz",org:false,pK:6.80,approx:false,conj:"H₂PO₄⁻",note:"Jako báze silnější než jako kyselina (pKa 12,3) → Na₂HPO₄ je slabě zásaditý."},
 {f:"imidazol",n:"imidazol",kind:"baz",org:true,pK:7.05,approx:false,conj:"imidazolium",note:"Heterocyklus v histidinu; pKa konjugované kyseliny 6,95 — ideální pufr při pH krve."},
 {f:"HCO₃⁻ (jako báze)",n:"hydrogenuhličitanový anion",kind:"baz",org:false,pK:7.65,approx:false,conj:"H₂CO₃",note:"Jako báze silnější než jako kyselina (pKa 10,33) → jedlá soda je slabě zásaditá (pH ≈ 8,3)."},
 {f:"NH₂OH",n:"hydroxylamin",kind:"baz",org:false,pK:8.04,approx:false,conj:"NH₃OH⁺",note:"Kyslík na dusíku silně odtahuje elektrony — slabá báze."},
 {f:"C₅H₅N",n:"pyridin",kind:"baz",org:true,pK:8.75,approx:false,conj:"C₅H₅NH⁺",note:"Volný pár je v sp² orbitalu (blíž k jádru, méně dostupný) → slabší než alkylaminy."},
 {f:"CH₃COO⁻",n:"octanový anion",kind:"baz",org:true,pK:9.24,approx:false,conj:"CH₃COOH",note:"Slabá báze: roztok CH₃COONa má pH ≈ 8,9. Ka(CH₃COOH)·Kb(CH₃COO⁻) = Kw."},
 {f:"C₆H₅NH₂",n:"anilin",kind:"baz",org:true,pK:9.40,approx:false,conj:"C₆H₅NH₃⁺",note:"Volný pár dusíku je delokalizovaný do benzenového jádra (+M do kruhu) → o 6 řádů slabší než methylamin."},
 {f:"HCOO⁻",n:"mravenčanový anion",kind:"baz",org:true,pK:10.25,approx:false,conj:"HCOOH",note:"Slabší báze než octan, protože HCOOH je silnější kyselina."},
 {f:"NO₂⁻",n:"dusitanový anion",kind:"baz",org:false,pK:10.75,approx:false,conj:"HNO₂",note:"Dusitany se hydrolyzují jen slabě zásaditě."},
 {f:"F⁻",n:"fluoridový anion",kind:"baz",org:false,pK:10.83,approx:false,conj:"HF",note:"Jediný halogenidový anion, který se ve vodě znatelně hydrolyzuje (KF má pH ≈ 8)."},
 {f:"močovina",n:"močovina (karbamid)",kind:"baz",org:true,pK:13.8,approx:false,conj:"močovina·H⁺",note:"Prakticky nebazická: volný pár dusíku je delokalizovaný na karbonyl (amidová rezonance)."},
 {f:"CH₃CONH₂",n:"acetamid",kind:"baz",org:true,pK:14.5,approx:true,conj:"CH₃CONH₃⁺",note:"Amidy nejsou zásadité: volný pár na dusíku je součástí konjugace s C=O."},
 {f:"Cl⁻",n:"chloridový anion",kind:"baz",org:false,pK:21,approx:true,conj:"HCl",note:"Konjugovaná báze silné kyseliny: prakticky žádná bazicita, ve vodě se nehydrolyzuje."}
];

/* ------------------------------------------------------------
   Stupnice pH — běžné látky
   ------------------------------------------------------------ */
var PHSUB=[
 {n:"1 M HCl",pH:0},{n:"žaludeční šťáva",pH:1.5},{n:"citronová šťáva",pH:2.0},{n:"cola",pH:2.5},
 {n:"ocet",pH:3.0},{n:"víno",pH:3.5},{n:"káva",pH:5.0},{n:"déšť (čistý)",pH:5.6},
 {n:"mléko",pH:6.5},{n:"sliny",pH:6.8},{n:"čistá voda",pH:7.0},{n:"krev",pH:7.4},
 {n:"mořská voda",pH:8.1},{n:"jedlá soda",pH:8.4},{n:"mýdlo",pH:10.0},{n:"čpavek (čisticí)",pH:11.5},
 {n:"Savo",pH:12.5},{n:"1 M NaOH",pH:14.0}
];

/* ------------------------------------------------------------
   Indikátory — přechod lo–hi, barvy kyselé a zásadité formy.
   Barvy jsou fyzikální (skutečné barvy indikátorů), proto jsou
   zapsané napevno jako data, ne jako barvy rozhraní.
   ------------------------------------------------------------ */
var IND=[
 {n:"methyloranž",lo:3.1,hi:4.4,c1:[0,80,50],c2:[50,95,55],l1:"červená",l2:"žlutá",lm:"oranžová"},
 {n:"methylčerveň",lo:4.4,hi:6.2,c1:[350,80,48],c2:[52,95,55],l1:"červená",l2:"žlutá",lm:"oranžová"},
 {n:"lakmus",lo:5.0,hi:8.0,c1:[355,70,50],c2:[235,65,50],l1:"červený",l2:"modrý",lm:"fialový"},
 {n:"bromthymolová modř",lo:6.0,hi:7.6,c1:[52,95,55],c2:[215,75,48],l1:"žlutá",l2:"modrá",lm:"zelená"},
 {n:"thymolová modř (2. přechod)",lo:8.0,hi:9.6,c1:[52,95,55],c2:[220,70,48],l1:"žlutá",l2:"modrá",lm:"zelená"},
 {n:"fenolftalein",lo:8.2,hi:10.0,c1:null,c2:[320,80,55],l1:"bezbarvý",l2:"růžovofialový",lm:"slabě růžový"}
];
/* barva indikátoru při daném pH (míchání v přechodové oblasti) */
function indColor(ind,pH){
  var t = pH<=ind.lo ? 0 : (pH>=ind.hi ? 1 : (pH-ind.lo)/(ind.hi-ind.lo));
  var a=ind.c1, b=ind.c2;
  if(!a){ return "hsla("+b[0]+","+b[1]+"%,"+b[2]+"%,"+t.toFixed(2)+")"; }
  var h=a[0]+(b[0]-a[0])*t, s=a[1]+(b[1]-a[1])*t, l=a[2]+(b[2]-a[2])*t;
  return "hsl("+h.toFixed(0)+","+s.toFixed(0)+"%,"+l.toFixed(0)+"%)";
}
function indLabel(ind,pH){
  if(pH<ind.lo) return ind.l1; if(pH>ind.hi) return ind.l2; return ind.lm+" (přechod)";
}
/* univerzální indikátor: barva podle celého pH */
function univColor(pH){
  var stops=[[0,"hsl(0,80%,45%)"],[2,"hsl(10,85%,50%)"],[4,"hsl(30,95%,52%)"],[5.5,"hsl(52,95%,55%)"],[7,"hsl(120,45%,42%)"],[8.5,"hsl(175,55%,40%)"],[10,"hsl(215,70%,48%)"],[12,"hsl(255,55%,50%)"],[14,"hsl(285,55%,42%)"]];
  for(var i=0;i<stops.length-1;i++){ if(pH<=stops[i+1][0]) return (pH-stops[i][0] < stops[i+1][0]-pH) ? stops[i][1] : stops[i+1][1]; }
  return stops[stops.length-1][1];
}
function univName(pH){
  if(pH<2) return "červená"; if(pH<4) return "červenooranžová"; if(pH<5.5) return "oranžová"; if(pH<6.5) return "žlutá";
  if(pH<7.5) return "zelená"; if(pH<9) return "modrozelená"; if(pH<11) return "modrá"; if(pH<13) return "fialová"; return "tmavě fialová";
}

/* ------------------------------------------------------------
   Iontový součin vody podle teploty: [t (°C), pKw]
   ------------------------------------------------------------ */
var KWT=[[0,14.94],[10,14.53],[20,14.17],[25,14.00],[30,13.83],[40,13.53],[50,13.26],[60,13.02],[70,12.80],[80,12.60],[90,12.42],[100,12.27]];
function pKwAt(t){
  for(var i=0;i<KWT.length-1;i++){
    var a=KWT[i], b=KWT[i+1];
    if(t>=a[0]&&t<=b[0]) return a[1]+(b[1]-a[1])*(t-a[0])/(b[0]-a[0]);
  }
  return t<0?KWT[0][1]:KWT[KWT.length-1][1];
}

/* ------------------------------------------------------------
   Průzkumník tří teorií. Pro každou teorii: r = role
   ("kyselina" | "zásada" | "obojí" | "ne"), eq = rovnice, c = komentář
   ------------------------------------------------------------ */
var TH=[
 {f:"HCl",n:"chlorovodík",
  arr:{r:"kyselina",eq:"HCl → H⁺ + Cl⁻",c:"Ve vodě odštěpuje H⁺ — učebnicová Arrheniova kyselina."},
  bro:{r:"kyselina",eq:"HCl + H₂O → H₃O⁺ + Cl⁻",c:"Donor protonu; voda je tu bází. Konjugovaná báze Cl⁻."},
  lew:{r:"kyselina",eq:"H⁺ + :OH₂ → H₃O⁺",c:"Odštěpený proton je akceptor elektronového páru; HCl je Lewisova kyselina nepřímo, přes H⁺."},
  note:"Všechny tři teorie se shodnou. Rozdíl je jen v tom, co považují za podstatu: H⁺ ve vodě, přenos protonu, nebo přijetí elektronového páru."},
 {f:"H₂SO₄",n:"kyselina sírová",
  arr:{r:"kyselina",eq:"H₂SO₄ → 2 H⁺ + SO₄²⁻",c:"Dvojsytná Arrheniova kyselina."},
  bro:{r:"kyselina",eq:"H₂SO₄ + H₂O → H₃O⁺ + HSO₄⁻",c:"První proton odevzdá úplně; HSO₄⁻ je pak už jen středně silná kyselina (pKa 1,99)."},
  lew:{r:"kyselina",eq:"H⁺ + :B → H–B⁺",c:"Přes odštěpovaný proton."},
  note:"Pozor: Brønsted odhalí to, co Arrheniův zápis zakrývá — druhý proton neodchází úplně."},
 {f:"HNO₃",n:"kyselina dusičná",
  arr:{r:"kyselina",eq:"HNO₃ → H⁺ + NO₃⁻",c:"Silná Arrheniova kyselina."},
  bro:{r:"kyselina",eq:"HNO₃ + H₂O → H₃O⁺ + NO₃⁻",c:"Donor protonu, NO₃⁻ je velmi slabá konjugovaná báze."},
  lew:{r:"kyselina",eq:"H⁺ + :B → H–B⁺",c:"Přes proton."},
  note:"Shoda všech tří teorií."},
 {f:"CH₃COOH",n:"kyselina octová",
  arr:{r:"kyselina",eq:"CH₃COOH ⇌ H⁺ + CH₃COO⁻",c:"Slabá Arrheniova kyselina — disociuje jen z ~1 %."},
  bro:{r:"kyselina",eq:"CH₃COOH + H₂O ⇌ H₃O⁺ + CH₃COO⁻",c:"Donor protonu; rovnováha leží vlevo (Ka = 1,74·10⁻⁵)."},
  lew:{r:"kyselina",eq:"H⁺ + :B → H–B⁺",c:"Přes proton."},
  note:"Brønsted navíc umožňuje popsat, že v čistém amoniaku (bez vody) je kyselina octová silná: NH₃ je silnější báze než H₂O."},
 {f:"NaOH",n:"hydroxid sodný",
  arr:{r:"zásada",eq:"NaOH → Na⁺ + OH⁻",c:"Ve vodě uvolňuje OH⁻ — učebnicová Arrheniova zásada."},
  bro:{r:"zásada",eq:"OH⁻ + H⁺ → H₂O",c:"Bází je vlastně anion OH⁻ (akceptor protonu); Na⁺ je jen divák."},
  lew:{r:"zásada",eq:"HO:⁻ + H⁺ → H₂O",c:"OH⁻ poskytuje elektronový pár."},
  note:"Shoda. Všimněte si, že u Brønsteda a Lewise je bází OH⁻, ne celý NaOH."},
 {f:"KOH",n:"hydroxid draselný",
  arr:{r:"zásada",eq:"KOH → K⁺ + OH⁻",c:"Silná Arrheniova zásada."},
  bro:{r:"zásada",eq:"OH⁻ + H⁺ → H₂O",c:"Akceptor protonu je OH⁻."},
  lew:{r:"zásada",eq:"HO:⁻ + H⁺ → H₂O",c:"Donor elektronového páru."},
  note:"Shoda všech teorií."},
 {f:"Ca(OH)₂",n:"hydroxid vápenatý",
  arr:{r:"zásada",eq:"Ca(OH)₂ → Ca²⁺ + 2 OH⁻",c:"Silná (byť málo rozpustná) Arrheniova zásada."},
  bro:{r:"zásada",eq:"OH⁻ + H⁺ → H₂O",c:"Bází je OH⁻."},
  lew:{r:"zásada",eq:"HO:⁻ + H⁺ → H₂O",c:"Donor elektronového páru."},
  note:"Shoda."},
 {f:"NH₃",n:"amoniak",
  arr:{r:"ne",eq:"NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ (jen nepřímo)",c:"Amoniak žádné OH⁻ neobsahuje. Arrhenius si musel pomoci fikcí „NH₄OH“, který ve skutečnosti neexistuje."},
  bro:{r:"zásada",eq:"NH₃ + H₂O ⇌ NH₄⁺ + OH⁻",c:"Přijímá proton od vody → zásada. Konjugovaná kyselina NH₄⁺."},
  lew:{r:"zásada",eq:"H₃N: + BF₃ → H₃N–BF₃",c:"Volný elektronový pár na dusíku — zásada i vůči BF₃, kde žádný proton není."},
  note:"<b>Selhání Arrheniovy teorie.</b> Amoniak je zásaditý, ale žádný hydroxid v sobě nemá. Brønsted to vyřešil: zásada je akceptor protonu."},
 {f:"H₂O",n:"voda",
  arr:{r:"ne",eq:"H₂O ⇌ H⁺ + OH⁻",c:"Voda je u Arrhenia jen rozpouštědlo (a produkt neutralizace)."},
  bro:{r:"obojí",eq:"H₂O + H₂O ⇌ H₃O⁺ + OH⁻",c:"Amfolyt: vůči HCl je bází, vůči NH₃ kyselinou. Autoprotolýza."},
  lew:{r:"zásada",eq:"H₂O: + Cu²⁺ → [Cu(H₂O)₆]²⁺",c:"Dva volné páry na kyslíku — voda je ligand, tedy Lewisova báze."},
  note:"Pro Brønsteda je voda hlavní hrdina: zároveň kyselina i zásada, a navíc reaktant, ne jen prostředí."},
 {f:"NH₄⁺",n:"amonný kation",
  arr:{r:"ne",eq:"—",c:"Ion, ne molekula uvolňující H⁺ ve smyslu Arrhenia (i když roztoky NH₄Cl jsou kyselé)."},
  bro:{r:"kyselina",eq:"NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺",c:"Donor protonu (pKa 9,25). Proto NH₄Cl hydrolyzuje kysele."},
  lew:{r:"kyselina",eq:"H⁺ + :B → H–B⁺",c:"Přes proton."},
  note:"Brønstedova teorie umí popsat kyselost kationtů — Arrheniova ne."},
 {f:"HCO₃⁻",n:"hydrogenuhličitanový anion",
  arr:{r:"ne",eq:"—",c:"Ion; Arrhenius s ionty jako kyselinami nepočítá."},
  bro:{r:"obojí",eq:"HCO₃⁻ + H₂O ⇌ H₂CO₃ + OH⁻ · HCO₃⁻ + H₂O ⇌ CO₃²⁻ + H₃O⁺",c:"Amfolyt. Jako báze (pKb 7,65) je silnější než jako kyselina (pKa 10,33) → roztok je slabě zásaditý."},
  lew:{r:"zásada",eq:"HCO₃⁻ + H⁺ → H₂CO₃",c:"Donor elektronového páru vůči H⁺."},
  note:"Typický maturitní amfolyt. Jedlá soda neutralizuje kyselinu i zásadu."},
 {f:"CO₃²⁻",n:"uhličitanový anion",
  arr:{r:"ne",eq:"—",c:"Anion bez OH — Arrhenius nevysvětlí, proč je soda zásaditá."},
  bro:{r:"zásada",eq:"CO₃²⁻ + H₂O ⇌ HCO₃⁻ + OH⁻",c:"Akceptor protonu (pKb 3,67) → Na₂CO₃ má pH ≈ 11,6."},
  lew:{r:"zásada",eq:"CO₃²⁻ + H⁺ → HCO₃⁻",c:"Donor elektronového páru."},
  note:"<b>Selhání Arrhenia:</b> zásaditost solí. Brønsted ji vysvětlí jako protolýzu aniontu s vodou (hydrolýzu)."},
 {f:"CH₃COO⁻",n:"octanový anion",
  arr:{r:"ne",eq:"—",c:"Anion bez OH."},
  bro:{r:"zásada",eq:"CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻",c:"Slabá báze (pKb 9,24) — roztok octanu sodného má pH ≈ 8,9."},
  lew:{r:"zásada",eq:"CH₃COO⁻ + H⁺ → CH₃COOH",c:"Donor elektronového páru."},
  note:"Konjugovaná báze slabé kyseliny se chová zásaditě — základ hydrolýzy solí."},
 {f:"BF₃",n:"fluorid boritý",
  arr:{r:"ne",eq:"—",c:"Žádný vodík, žádné OH⁻."},
  bro:{r:"ne",eq:"—",c:"Nemá proton, který by mohl odevzdat. Brønsted BF₃ nepopíše."},
  lew:{r:"kyselina",eq:"BF₃ + :NH₃ → F₃B–NH₃",c:"Bor má jen 6 elektronů ve valenční vrstvě a volný p-orbital — přijme elektronový pár."},
  note:"<b>Selhání Brønstedovy teorie.</b> BF₃ reaguje s NH₃ úplně stejně jako HCl, ale žádný proton nepřenáší. Proto Lewis."},
 {f:"AlCl₃",n:"chlorid hlinitý",
  arr:{r:"ne",eq:"—",c:"Bez H a OH."},
  bro:{r:"ne",eq:"—",c:"Bez protonu (bezvodý)."},
  lew:{r:"kyselina",eq:"AlCl₃ + Cl⁻ → [AlCl₄]⁻",c:"Elektronově deficitní hliník přijímá pár. Katalyzátor Friedel–Craftsových reakcí."},
  note:"Lewisova kyselina; ve vodném roztoku navíc [Al(H₂O)₆]³⁺ působí jako Brønstedova kyselina (hydrolýza)."},
 {f:"Cu²⁺",n:"měďnatý kation",
  arr:{r:"ne",eq:"—",c:"Ion kovu."},
  bro:{r:"kyselina (hydratovaný)",eq:"[Cu(H₂O)₆]²⁺ + H₂O ⇌ [Cu(H₂O)₅(OH)]⁺ + H₃O⁺",c:"Aquakation odštěpuje proton z koordinované vody (pKa ≈ 7,5)."},
  lew:{r:"kyselina",eq:"Cu²⁺ + 4 :NH₃ → [Cu(NH₃)₄]²⁺",c:"Centrální atom komplexu přijímá elektronové páry ligandů."},
  note:"Každá tvorba komplexu je Lewisova acidobazická reakce: kation = kyselina, ligand = báze."},
 {f:"Ag⁺",n:"stříbrný kation",
  arr:{r:"ne",eq:"—",c:"Ion kovu."},
  bro:{r:"ne",eq:"—",c:"Bez protonu (hydratovaný Ag⁺ je jen velmi slabě kyselý)."},
  lew:{r:"kyselina",eq:"Ag⁺ + 2 :NH₃ → [Ag(NH₃)₂]⁺",c:"Akceptor elektronových párů — Tollensovo činidlo."},
  note:"Lewisova kyselina; typický příklad tvorby komplexu."},
 {f:"OH⁻",n:"hydroxidový anion",
  arr:{r:"zásada",eq:"(vzniká z hydroxidů)",c:"Nositel zásaditosti u Arrhenia."},
  bro:{r:"zásada",eq:"OH⁻ + H₃O⁺ → 2 H₂O",c:"Nejsilnější báze, která ve vodě může existovat."},
  lew:{r:"zásada",eq:"HO:⁻ + Al(OH)₃ → [Al(OH)₄]⁻",c:"Donor páru — i vůči amfoterním hydroxidům."},
  note:"Shoda."},
 {f:"CN⁻",n:"kyanidový anion",
  arr:{r:"ne",eq:"—",c:"Anion bez OH."},
  bro:{r:"zásada",eq:"CN⁻ + H₂O ⇌ HCN + OH⁻",c:"Báze (pKb 4,79) — roztoky kyanidů jsou silně zásadité."},
  lew:{r:"zásada",eq:"Fe³⁺ + 6 :CN⁻ → [Fe(CN)₆]³⁻",c:"Ligand v komplexech."},
  note:"Anion slabé kyseliny = Brønstedova báze; zároveň typický ligand = Lewisova báze."},
 {f:"NH₂⁻",n:"amidový anion",
  arr:{r:"ne",eq:"—",c:"Bez OH."},
  bro:{r:"zásada",eq:"NH₂⁻ + H₂O → NH₃ + OH⁻ (úplně)",c:"Silnější báze než OH⁻ — ve vodě je okamžitě „vyrovnána“ na OH⁻."},
  lew:{r:"zásada",eq:"H₂N:⁻ + H⁺ → NH₃",c:"Donor páru."},
  note:"Ukázka vyrovnávacího efektu: ve vodě nemůže existovat báze silnější než OH⁻."},
 {f:"CH₃NH₂",n:"methylamin",
  arr:{r:"ne",eq:"—",c:"Bez OH, stejně jako amoniak."},
  bro:{r:"zásada",eq:"CH₃NH₂ + H₂O ⇌ CH₃NH₃⁺ + OH⁻",c:"Akceptor protonu (pKb 3,36), silnější než NH₃."},
  lew:{r:"zásada",eq:"CH₃NH₂: + H⁺ → CH₃NH₃⁺",c:"Volný pár na dusíku."},
  note:"Organické aminy jsou zásady jen podle Brønsteda a Lewise."},
 {f:"C₅H₅N",n:"pyridin",
  arr:{r:"ne",eq:"—",c:"Bez OH."},
  bro:{r:"zásada",eq:"C₅H₅N + H₂O ⇌ C₅H₅NH⁺ + OH⁻",c:"Slabá báze (pKb 8,75)."},
  lew:{r:"zásada",eq:"C₅H₅N: + H⁺ → C₅H₅NH⁺",c:"Volný pár v sp² orbitalu dusíku."},
  note:"Heterocyklická báze."},
 {f:"HSO₄⁻",n:"hydrogensíranový anion",
  arr:{r:"ne",eq:"—",c:"Ion."},
  bro:{r:"obojí (převážně kyselina)",eq:"HSO₄⁻ + H₂O ⇌ SO₄²⁻ + H₃O⁺",c:"Kyselina pKa 1,99; jako báze (vůči H₂SO₄) jen formálně."},
  lew:{r:"zásada",eq:"HSO₄⁻ + H⁺ → H₂SO₄",c:"Formálně donor páru."},
  note:"Proto je NaHSO₄ kyselý — ne hydrolýzou, ale disociací aniontu."},
 {f:"H₂PO₄⁻",n:"dihydrogenfosforečnanový anion",
  arr:{r:"ne",eq:"—",c:"Ion."},
  bro:{r:"obojí",eq:"H₂PO₄⁻ ⇌ HPO₄²⁻ + H⁺ · H₂PO₄⁻ + H⁺ ⇌ H₃PO₄",c:"Amfolyt (pKa 7,20; pKb 11,85) — jako kyselina silnější → NaH₂PO₄ je slabě kyselý."},
  lew:{r:"zásada",eq:"H₂PO₄⁻ + H⁺ → H₃PO₄",c:"Donor páru."},
  note:"Amfolyt, na rozdíl od HCO₃⁻ převážně kyselý."},
 {f:"HF",n:"fluorovodík",
  arr:{r:"kyselina",eq:"HF ⇌ H⁺ + F⁻",c:"Slabá Arrheniova kyselina."},
  bro:{r:"kyselina",eq:"HF + H₂O ⇌ H₃O⁺ + F⁻",c:"Donor protonu (pKa 3,17)."},
  lew:{r:"kyselina",eq:"H⁺ + :B → H–B⁺",c:"Přes proton."},
  note:"Shoda; zajímavost je jen v tom, proč je slabá (pevná vazba H–F)."},
 {f:"CO₂",n:"oxid uhličitý",
  arr:{r:"ne (nepřímo)",eq:"CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻",c:"Sám H⁺ nemá; kyselost vzniká až reakcí s vodou (kyselinotvorný oxid)."},
  bro:{r:"ne",eq:"—",c:"Nemá proton."},
  lew:{r:"kyselina",eq:"CO₂ + OH⁻ → HCO₃⁻",c:"Uhlík v CO₂ je elektronově chudý (dvě C=O) — přijme pár od OH⁻."},
  note:"Reakce CO₂ + OH⁻ je Lewisova neutralizace — proto NaOH pohlcuje CO₂ ze vzduchu."},
 {f:"SO₃",n:"oxid sírový",
  arr:{r:"ne (nepřímo)",eq:"SO₃ + H₂O → H₂SO₄",c:"Kyselinotvorný oxid; kyselinu tvoří až s vodou."},
  bro:{r:"ne",eq:"—",c:"Nemá proton."},
  lew:{r:"kyselina",eq:"SO₃ + :O²⁻ → SO₄²⁻",c:"Síra s trojicí S=O je silný akceptor elektronového páru."},
  note:"Reakce oxidů kovů s oxidy nekovů (CaO + SO₃ → CaSO₄) je Lewisova acidobazická reakce bez jediného protonu."}
];

/* ------------------------------------------------------------
   Rozbor protolytických reakcí (kyselina 1 + báze 2 ⇌ báze 1 + kyselina 2)
   ------------------------------------------------------------ */
var PROT=[
 {n:"HCl + H₂O — silná kyselina ve vodě",a1:"HCl",b2:"H₂O",b1:"Cl⁻",a2:"H₃O⁺",arrow:"→",pKa1:-7,pKa2:0,
  c:"Rovnováha je úplně vpravo: HCl (pKa ≈ −7) je nesrovnatelně silnější kyselina než H₃O⁺ (pKa 0). Ve vodě proto HCl „neexistuje“, existuje jen H₃O⁺ + Cl⁻."},
 {n:"CH₃COOH + H₂O — slabá kyselina ve vodě",a1:"CH₃COOH",b2:"H₂O",b1:"CH₃COO⁻",a2:"H₃O⁺",arrow:"⇌",pKa1:4.76,pKa2:0,
  c:"Rovnováha leží vlevo (K = Ka = 1,74·10⁻⁵): H₃O⁺ je silnější kyselina než CH₃COOH, a proto proton zůstává většinou na octové kyselině."},
 {n:"NH₃ + H₂O — slabá báze ve vodě",a1:"H₂O",b2:"NH₃",b1:"OH⁻",a2:"NH₄⁺",arrow:"⇌",pKa1:14,pKa2:9.25,
  c:"Tady je voda kyselinou (donorem protonu). K = Kb(NH₃) = 1,78·10⁻⁵ — jen malá část amoniaku se přemění na NH₄⁺."},
 {n:"H₂O + H₂O — autoprotolýza",a1:"H₂O",b2:"H₂O",b1:"OH⁻",a2:"H₃O⁺",arrow:"⇌",pKa1:14,pKa2:0,
  c:"Jedna molekula vody je kyselina, druhá báze. K = Kw = 10⁻¹⁴: v litru čisté vody je jen 10⁻⁷ mol H₃O⁺."},
 {n:"HSO₄⁻ + H₂O — anion jako kyselina",a1:"HSO₄⁻",b2:"H₂O",b1:"SO₄²⁻",a2:"H₃O⁺",arrow:"⇌",pKa1:1.99,pKa2:0,
  c:"Anion může být kyselinou. K = 10⁻¹·⁹⁹ ≈ 0,01 — středně silná kyselina, ne úplně, ne zanedbatelně."},
 {n:"NH₄⁺ + OH⁻ — vytěsnění slabé báze",a1:"NH₄⁺",b2:"OH⁻",b1:"NH₃",a2:"H₂O",arrow:"→",pKa1:9.25,pKa2:14,
  c:"K = 10⁴·⁷⁵ ≈ 56 000: silná báze OH⁻ odebere proton amonnému kationtu a uvolní plynný amoniak. Důkaz amonných solí."},
 {n:"HCO₃⁻ + H₃O⁺ — amfolyt jako báze",a1:"H₃O⁺",b2:"HCO₃⁻",b1:"H₂O",a2:"H₂CO₃",arrow:"→",pKa1:0,pKa2:6.35,
  c:"Hydrogenuhličitan přijme proton, vzniklá H₂CO₃ se rozpadá na CO₂ + H₂O — šumění jedlé sody v kyselině."},
 {n:"HCO₃⁻ + OH⁻ — amfolyt jako kyselina",a1:"HCO₃⁻",b2:"OH⁻",b1:"CO₃²⁻",a2:"H₂O",arrow:"→",pKa1:10.33,pKa2:14,
  c:"Tatáž částice, teď jako donor protonu. K = 10³·⁶⁷ ≈ 4700 — probíhá prakticky úplně."},
 {n:"CH₃COOH + NH₃ — slabá s slabou (bez vody)",a1:"CH₃COOH",b2:"NH₃",b1:"CH₃COO⁻",a2:"NH₄⁺",arrow:"→",pKa1:4.76,pKa2:9.25,
  c:"K = 10⁴·⁴⁹ ≈ 31 000: i dvě slabé částice spolu reagují prakticky úplně, pokud je rozdíl pKa velký. Vzniká octan amonný."},
 {n:"H₂S + CN⁻ — sulfan jako kyselina",a1:"H₂S",b2:"CN⁻",b1:"HS⁻",a2:"HCN",arrow:"⇌",pKa1:7.05,pKa2:9.21,
  c:"K = 10²·¹⁶ ≈ 145. Silnější kyselina (H₂S) předá proton bázi silnější kyseliny (HCN je slabší) — rovnováha vpravo, ale ne úplně."}
];

/* ------------------------------------------------------------
   Trenažér konjugovaných párů
   ------------------------------------------------------------ */
var CJ=[
 {g:"HSO₄⁻",ask:"baze",o:["SO₄²⁻","H₂SO₄","HSO₃⁻","SO₃²⁻"],c:0,e:"Konjugovaná báze vznikne <b>odebráním jednoho H⁺</b>: HSO₄⁻ − H⁺ = SO₄²⁻. Náboj klesne o jedna. H₂SO₄ je naopak konjugovaná kyselina (přidaný proton)."},
 {g:"NH₄⁺",ask:"baze",o:["NH₂⁻","NH₃","NH₄OH","N₂H₄"],c:1,e:"NH₄⁺ − H⁺ = NH₃. Pár NH₄⁺/NH₃ se liší přesně o jeden proton. NH₂⁻ je konjugovaná báze amoniaku, ne amonného kationtu — o proton dál."},
 {g:"H₂O",ask:"baze",o:["H₃O⁺","H₂","OH⁻","O²⁻"],c:2,e:"Voda jako kyselina odštěpí proton a zbyde OH⁻. H₃O⁺ je konjugovaná <em>kyselina</em> vody. O²⁻ by vznikl až po odebrání dvou protonů — to není konjugovaný pár."},
 {g:"H₂O",ask:"kys",o:["OH⁻","H₂O₂","H⁺","H₃O⁺"],c:3,e:"Voda jako báze přijme proton: H₂O + H⁺ = H₃O⁺. Voda je amfolyt — má jak konjugovanou kyselinu (H₃O⁺), tak konjugovanou bázi (OH⁻)."},
 {g:"H₂PO₄⁻",ask:"baze",o:["H₃PO₄","HPO₄²⁻","PO₄³⁻","H₂PO₃⁻"],c:1,e:"Odebereme jeden proton: H₂PO₄⁻ − H⁺ = HPO₄²⁻. PO₄³⁻ je o dva protony dál, H₃PO₄ je konjugovaná kyselina."},
 {g:"H₂PO₄⁻",ask:"kys",o:["HPO₄²⁻","PO₄³⁻","H₃PO₄","H₃PO₃"],c:2,e:"Přidáme proton: H₂PO₄⁻ + H⁺ = H₃PO₄. Dihydrogenfosforečnan je amfolyt — může proton přijmout i odevzdat."},
 {g:"HCO₃⁻",ask:"kys",o:["CO₃²⁻","H₂CO₃","CO₂","HCOOH"],c:1,e:"HCO₃⁻ + H⁺ = H₂CO₃ (kyselina uhličitá). CO₂ sice z H₂CO₃ vzniká rozkladem, ale není to konjugovaná kyselina — liší se o H₂O, ne o H⁺. HCOOH je kyselina mravenčí, jiná látka."},
 {g:"CH₃COOH",ask:"baze",o:["CH₃COOH₂⁺","CH₃O⁻","CH₃COO⁻","CH₃CO⁺"],c:2,e:"Odštěpí se proton z karboxylu: CH₃COO⁻ (octanový anion). CH₃COOH₂⁺ je konjugovaná kyselina — vzniká v silně kyselém prostředí, například v H₂SO₄."},
 {g:"H₂S",ask:"baze",o:["S²⁻","HS⁻","H₃S⁺","SO₂"],c:1,e:"H₂S − H⁺ = HS⁻ (hydrogensulfidový anion). S²⁻ je až konjugovaná báze HS⁻. Dvojsytná kyselina má dva konjugované páry: H₂S/HS⁻ a HS⁻/S²⁻."},
 {g:"HS⁻",ask:"kys",o:["S²⁻","HSO₄⁻","H₂S","H₂SO₄"],c:2,e:"HS⁻ + H⁺ = H₂S. Hydrogensulfid je amfolyt. Sírany s tím nemají nic společného — liší se kyslíky, ne protonem."},
 {g:"C₆H₅OH (fenol)",ask:"baze",o:["C₆H₅O⁻","C₆H₅⁻","C₆H₆","C₆H₅OH₂⁺"],c:0,e:"Fenol odštěpuje proton z hydroxylu → fenoxid (fenolát) C₆H₅O⁻, stabilizovaný rezonancí s jádrem. Proto je fenol kyselejší než alkoholy."},
 {g:"CH₃NH₃⁺",ask:"baze",o:["CH₃NH⁻","CH₃NH₂","CH₃N","CH₃NH₃OH"],c:1,e:"Methylamonium − H⁺ = methylamin CH₃NH₂. Pár CH₃NH₃⁺/CH₃NH₂ je analogie NH₄⁺/NH₃."},
 {g:"H₂O₂",ask:"baze",o:["O₂²⁻","OH⁻","HO₂⁻","H₃O₂⁺"],c:2,e:"H₂O₂ − H⁺ = HO₂⁻ (hydrogenperoxidový anion). OH⁻ má jiný počet kyslíků — není to konjugovaný pár."},
 {g:"OH⁻",ask:"baze",o:["H₂O","O²⁻","H₃O⁺","O₂"],c:1,e:"I OH⁻ může být formálně kyselinou: OH⁻ − H⁺ = O²⁻ (oxidový anion). Ve vodě ale O²⁻ existovat nemůže — okamžitě se přemění na 2 OH⁻."},
 {g:"NH₃",ask:"kys",o:["NH₂⁻","NH₄⁺","N₂H₄","NH₄OH"],c:1,e:"NH₃ + H⁺ = NH₄⁺. „NH₄OH“ je historická fikce — v roztoku amoniaku existuje NH₃(aq), NH₄⁺ a OH⁻, ale žádná molekula NH₄OH."},
 {g:"CO₃²⁻",ask:"kys",o:["H₂CO₃","HCOO⁻","HCO₃⁻","CO₂"],c:2,e:"CO₃²⁻ + H⁺ = HCO₃⁻. Kyselina uhličitá H₂CO₃ je o dva protony dál (konjugovaná kyselina hydrogenuhličitanu)."}
];

/* ------------------------------------------------------------
   Porovnávač síly — řady se strukturním důvodem
   unit: "pKa" (menší = silnější kyselina) | "pKb" (menší = silnější báze)
   ------------------------------------------------------------ */
var CMP=[
 {key:"halo",name:"a) Halogenovodíky HF ≪ HCl < HBr < HI",unit:"pKa",lo:-11,hi:5,
  items:[{f:"HF",v:3.17,x:"H–F 567 kJ·mol⁻¹, r = 92 pm"},{f:"HCl",v:-7,x:"H–Cl 431 kJ·mol⁻¹, r = 127 pm",ap:true},{f:"HBr",v:-9,x:"H–Br 366 kJ·mol⁻¹, r = 141 pm",ap:true},{f:"HI",v:-10,x:"H–I 299 kJ·mol⁻¹, r = 161 pm",ap:true}],
  why:"Směrem dolů ve skupině roste velikost atomu, vazba H–X se prodlužuje a <b>slábne</b> — proton se snáz odštěpí. Rozhoduje <b>pevnost vazby</b> a velikost aniontu (náboj na velkém I⁻ je „rozprostřený“, anion je stabilní).",
  trap:"Elektronegativita tu vede na <b>opačný</b> výsledek: fluor je nejelektronegativnější, a přesto je HF nejslabší. Ve skupině rozhoduje vazba, ne EN."},
 {key:"per",name:"b) Hydridy 2. periody CH₄ < NH₃ < H₂O < HF",unit:"pKa",lo:0,hi:55,
  items:[{f:"CH₄",v:50,x:"EN(C) = 2,5",ap:true},{f:"NH₃",v:35,x:"EN(N) = 3,0",ap:true},{f:"H₂O",v:14,x:"EN(O) = 3,5"},{f:"HF",v:3.17,x:"EN(F) = 4,0"}],
  why:"V periodě jsou atomy podobně velké, a tak rozhoduje <b>elektronegativita</b>: čím elektronegativnější atom, tím ochotněji si nechá záporný náboj po odchodu protonu a tím je vazba H–X polárnější.",
  trap:"Tady EN funguje — ale jen proto, že se atomy neliší velikostí. Nezobecňujte to na skupiny."},
 {key:"oxo",name:"c) Oxokyseliny podle počtu kyslíků HClO < HClO₂ < HClO₃ < HClO₄",unit:"pKa",lo:-11,hi:9,
  items:[{f:"HClO",v:7.54,x:"0 „volných“ O · Cl(+I)"},{f:"HClO₂",v:1.94,x:"1 volný O · Cl(+III)"},{f:"HClO₃",v:-1,x:"2 volné O · Cl(+V)",ap:true},{f:"HClO₄",v:-10,x:"3 volné O · Cl(+VII)",ap:true}],
  why:"<b>Paulingovo pravidlo:</b> každý kyslík navázaný na centrální atom bez vodíku posune pKa asi o 5 dolů. Kyslíky odtahují elektrony od vazby O–H a záporný náboj vzniklého aniontu <b>rozprostřou</b> (rezonance) — anion je stabilnější, kyselina silnější.",
  trap:"Síla oxokyseliny neroste s počtem vodíků (H₃PO₄ je slabší než HNO₃), ale s počtem kyslíků <em>bez</em> vodíku."},
 {key:"cen",name:"d) Oxokyseliny podle centrálního atomu HClO > HBrO > HIO; HNO₃ > HNO₂; H₂SO₄ > H₂SO₃",unit:"pKa",lo:-4,hi:12,
  items:[{f:"HClO",v:7.54,x:"EN(Cl) 3,0"},{f:"HBrO",v:8.63,x:"EN(Br) 2,8"},{f:"HIO",v:10.64,x:"EN(I) 2,5"},{f:"HNO₃",v:-1.4,x:"N(+V), 2 volné O",ap:true},{f:"HNO₂",v:3.25,x:"N(+III), 1 volný O"},{f:"H₂SO₄",v:-3,x:"S(+VI), 2 volné O",ap:true},{f:"H₂SO₃",v:1.81,x:"S(+IV), 1 volný O"}],
  why:"Při stejném počtu kyslíků rozhoduje <b>elektronegativita centrálního atomu</b> (HClO > HBrO > HIO). U téhož prvku rozhoduje <b>oxidační číslo</b> — vyšší oxidační číslo = víc kyslíků = silnější kyselina (HNO₃ > HNO₂, H₂SO₄ > H₂SO₃).",
  trap:"HClO₄ > HBrO₄ > HIO₄ platí stejně — kyselina jodistá je z chloristé, bromisté a jodisté nejslabší."},
 {key:"ind",name:"e) Karboxylové kyseliny a induktivní efekt (−I halogen, +I alkyl)",unit:"pKa",lo:0,hi:6,
  items:[{f:"Cl₃CCOOH",v:0.66,x:"tři Cl (−I)"},{f:"Cl₂CHCOOH",v:1.35,x:"dva Cl"},{f:"FCH₂COOH",v:2.59,x:"jeden F (nejsilnější −I)"},{f:"ClCH₂COOH",v:2.87,x:"jeden Cl"},{f:"HCOOH",v:3.75,x:"bez alkylu"},{f:"CH₃COOH",v:4.76,x:"methyl (+I) oslabuje"},{f:"C₃H₇COOH",v:4.82,x:"propyl (+I)"}],
  why:"Elektronegativní substituent (halogen) <b>odtahuje elektrony</b> (−I efekt), stabilizuje záporný náboj karboxylátu → kyselina sílí. Každý další chlor přidá zhruba řád. Alkyl naopak elektrony <b>tlačí</b> (+I) → mravenčí je silnější než octová.",
  trap:"Fluor má větší −I efekt než chlor (FCH₂COOH silnější než ClCH₂COOH), ale HF je slabší než HCl. Jde o dva různé jevy: induktivní efekt substituentu vs. pevnost vazby H–X."},
 {key:"dist",name:"f) Vzdálenost substituentu: chlorbutanové kyseliny",unit:"pKa",lo:2,hi:5.5,
  items:[{f:"2-chlorbutanová",v:2.86,x:"Cl na uhlíku α"},{f:"3-chlorbutanová",v:4.05,x:"Cl na uhlíku β"},{f:"4-chlorbutanová",v:4.52,x:"Cl na uhlíku γ"},{f:"butanová",v:4.82,x:"bez Cl"}],
  why:"Induktivní efekt se <b>přenáší σ vazbami a rychle slábne</b> — přes každý další uhlík zhruba na třetinu. Chlor na α-uhlíku zesílí kyselinu 100×, na γ-uhlíku už jen 2×.",
  trap:"Vzdálený substituent není „nulový“, jen slabý. Pořadí si odvoďte, ne pamatujte."},
 {key:"oh",name:"g) Organické O–H kyseliny: alkohol < voda < fenol < karboxylová kyselina",unit:"pKa",lo:0,hi:18,
  items:[{f:"C₂H₅OH",v:15.9,x:"ethoxid — náboj na jednom O",ap:true},{f:"H₂O",v:14.0,x:"hydroxid"},{f:"C₂H₅SH",v:10.6,x:"thiol — velký atom S"},{f:"C₆H₅OH",v:9.99,x:"fenoxid — rezonance do jádra"},{f:"4-nitrofenol",v:7.15,x:"NO₂ (−M) stabilizuje dál"},{f:"CH₃COOH",v:4.76,x:"karboxylát — 2 rovnocenné O"}],
  why:"O síle rozhoduje <b>stabilita aniontu</b>. V ethoxidu sedí náboj na jediném kyslíku (a alkyl ho ještě +I efektem zhoršuje). Ve fenoxidu se náboj <b>rezonancí</b> rozprostře do benzenového jádra. V karboxylátu je rozdělený mezi <b>dva rovnocenné kyslíky</b> — nejstabilnější → nejsilnější kyselina.",
  trap:"Fenol je kyselina, ale slabší než H₂CO₃ (pKa 6,35): s NaOH reaguje, s NaHCO₃ ne. Karboxylová kyselina šumí s NaHCO₃. To je klasický test rozlišení."},
 {key:"orgb",name:"h) Organické báze (pKb): anilin < pyridin < NH₃ < methylamin ≈ dimethylamin",unit:"pKb",lo:-1,hi:16,
  items:[{f:"CH₃CONH₂ (amid)",v:14.5,x:"pár delokalizovaný na C=O",ap:true},{f:"anilin",v:9.40,x:"pár delokalizovaný do jádra"},{f:"pyridin",v:8.75,x:"pár v sp² orbitalu"},{f:"NH₃",v:4.75,x:"referenční"},{f:"trimethylamin",v:4.19,x:"3 alkyly, ale špatná solvatace"},{f:"methylamin",v:3.36,x:"1 alkyl (+I)"},{f:"dimethylamin",v:3.27,x:"2 alkyly (+I)"},{f:"guanidin",v:0.4,x:"kation rezonančně stabilizovaný",ap:true}],
  why:"Bazicita dusíku = <b>dostupnost volného elektronového páru</b>. Alkyly ho +I efektem zvyšují (methylamin > NH₃). Benzenové jádro nebo karbonyl ho naopak <b>delokalizují</b> (anilin, amidy) — pár „není doma“. Pyridin má pár v sp² orbitalu, blíž k jádru, méně ochotný.",
  trap:"Trimethylamin je slabší než dimethylamin, i když má víc alkylů: jeho kation (CH₃)₃NH⁺ má jen jeden vodík na solvataci vodou, a je proto hůř stabilizovaný. Sterika a solvatace přebijí +I efekt."},
 {key:"inb",name:"i) Anorganické báze (pKb): hydroxidy alkalických kovů > Ca(OH)₂ > NH₃",unit:"pKb",lo:-1,hi:10,
  items:[{f:"KOH",v:0,x:"iontový, úplná disociace",ap:true},{f:"NaOH",v:0,x:"iontový, úplná disociace",ap:true},{f:"Ca(OH)₂",v:1.4,x:"silná, málo rozpustná",ap:true},{f:"NH₃",v:4.75,x:"molekulová, protolýza s vodou"},{f:"N₂H₄",v:5.90,x:"druhý N odtahuje"},{f:"NH₂OH",v:8.04,x:"kyslík na dusíku odtahuje"}],
  why:"Hydroxidy alkalických kovů a kovů alkalických zemin jsou <b>iontové</b> — OH⁻ v nich už je, jen se rozpustí. Amoniak si OH⁻ musí teprve <b>vyrobit</b> reakcí s vodou, a ta rovnováha leží vlevo. Al(OH)₃ a Zn(OH)₂ jsou <b>amfoterní</b>: reagují s kyselinou i se zásadou.",
  trap:"Ca(OH)₂ je silná zásada, ale jeho roztok má pH „jen“ ≈ 12,4 — kvůli malé rozpustnosti, ne kvůli slabé disociaci. Síla a rozpustnost jsou dvě různé věci."}
];

/* ------------------------------------------------------------
   Předpovídač směru: kyseliny HA a báze B (pKa = pKa konjugované kyseliny BH⁺)
   ------------------------------------------------------------ */
var DIRA=[
 {f:"HCl",pKa:-7,conj:"Cl⁻",ap:true},{f:"HNO₃",pKa:-1.4,conj:"NO₃⁻",ap:true},{f:"H₃O⁺",pKa:0,conj:"H₂O"},
 {f:"HSO₄⁻",pKa:1.99,conj:"SO₄²⁻"},{f:"H₃PO₄",pKa:2.15,conj:"H₂PO₄⁻"},{f:"HF",pKa:3.17,conj:"F⁻"},
 {f:"HCOOH",pKa:3.75,conj:"HCOO⁻"},{f:"CH₃COOH",pKa:4.76,conj:"CH₃COO⁻"},{f:"H₂CO₃",pKa:6.35,conj:"HCO₃⁻"},
 {f:"H₂S",pKa:7.05,conj:"HS⁻"},{f:"H₂PO₄⁻",pKa:7.20,conj:"HPO₄²⁻"},{f:"HClO",pKa:7.54,conj:"ClO⁻"},
 {f:"HCN",pKa:9.21,conj:"CN⁻"},{f:"NH₄⁺",pKa:9.25,conj:"NH₃"},{f:"C₆H₅OH",pKa:9.99,conj:"C₆H₅O⁻"},
 {f:"HCO₃⁻",pKa:10.33,conj:"CO₃²⁻"},{f:"CH₃NH₃⁺",pKa:10.64,conj:"CH₃NH₂"},{f:"H₂O",pKa:14.0,conj:"OH⁻"},{f:"C₂H₅OH",pKa:15.9,conj:"C₂H₅O⁻",ap:true}
];
var DIRB=[
 {f:"Cl⁻",pKa:-7,conj:"HCl",ap:true},{f:"NO₃⁻",pKa:-1.4,conj:"HNO₃",ap:true},{f:"H₂O",pKa:0,conj:"H₃O⁺"},
 {f:"SO₄²⁻",pKa:1.99,conj:"HSO₄⁻"},{f:"F⁻",pKa:3.17,conj:"HF"},{f:"HCOO⁻",pKa:3.75,conj:"HCOOH"},
 {f:"CH₃COO⁻",pKa:4.76,conj:"CH₃COOH"},{f:"HCO₃⁻",pKa:6.35,conj:"H₂CO₃"},{f:"HS⁻",pKa:7.05,conj:"H₂S"},
 {f:"HPO₄²⁻",pKa:7.20,conj:"H₂PO₄⁻"},{f:"ClO⁻",pKa:7.54,conj:"HClO"},{f:"CN⁻",pKa:9.21,conj:"HCN"},
 {f:"NH₃",pKa:9.25,conj:"NH₄⁺"},{f:"C₆H₅O⁻",pKa:9.99,conj:"C₆H₅OH"},{f:"CO₃²⁻",pKa:10.33,conj:"HCO₃⁻"},
 {f:"CH₃NH₂",pKa:10.64,conj:"CH₃NH₃⁺"},{f:"OH⁻",pKa:14.0,conj:"H₂O"},{f:"C₂H₅O⁻",pKa:15.9,conj:"C₂H₅OH",ap:true},{f:"NH₂⁻",pKa:35,conj:"NH₃",ap:true}
];
/* předvolby: [název, index kyseliny, index báze] */
var DIRP=[
 ["HCl + CH₃COO⁻ (octan + silná kyselina)",0,6],
 ["CH₃COOH + Cl⁻ (obráceně — nejde)",7,0],
 ["NH₃ + H₂O (slabá báze ve vodě)",17,12],
 ["HCN + OH⁻ (slabá kyselina + silná báze)",12,16],
 ["CH₃COOH + HCO₃⁻ (ocet + jedlá soda → CO₂)",7,7],
 ["HCl + CO₃²⁻ (soda + kyselina → CO₂)",0,14],
 ["NH₄⁺ + OH⁻ (amonná sůl + NaOH → NH₃)",13,16],
 ["fenol + OH⁻ (ano)",14,16],
 ["fenol + HCO₃⁻ (ne — test rozlišení)",14,7],
 ["H₃O⁺ + OH⁻ (neutralizace silná–silná)",2,16],
 ["H₂O + H₂O (autoprotolýza)",17,2],
 ["HCl + F⁻ (fluorid + silná kyselina → HF)",0,4],
 ["H₂S + CN⁻",9,11],
 ["NH₄⁺ + CH₃COO⁻ (octan amonný ve vodě)",13,6],
 ["C₂H₅OH + NH₂⁻ (amid sodný odtrhne H z ethanolu)",18,18]
];

/* ------------------------------------------------------------
   Amfoterní látky a amfolyty
   ------------------------------------------------------------ */
var AMF=[
 {f:"Al(OH)₃",n:"hydroxid hlinitý",kind:"amfoterní hydroxid",
  acid:"Al(OH)₃ + 3 HCl → AlCl₃ + 3 H₂O",acidc:"Vůči kyselině se chová jako zásada: OH⁻ skupiny se neutralizují na vodu, vzniká sůl hlinitá.",
  base:"Al(OH)₃ + NaOH → Na[Al(OH)₄]",basec:"Vůči silné zásadě se chová jako kyselina (Lewisova): přijme další OH⁻ a vznikne tetrahydroxohlinitan.",
  note:"Proto se Al(OH)₃ sráží při pH ≈ 4–9 a při vyšším i nižším pH se zase rozpouští. Využívá se při čištění hliníkové rudy (Bayerův proces)."},
 {f:"Zn(OH)₂",n:"hydroxid zinečnatý",kind:"amfoterní hydroxid",
  acid:"Zn(OH)₂ + 2 HCl → ZnCl₂ + 2 H₂O",acidc:"S kyselinou dá zinečnatou sůl.",
  base:"Zn(OH)₂ + 2 NaOH → Na₂[Zn(OH)₄]",basec:"S nadbytkem hydroxidu se rozpustí na tetrahydroxozinečnatan.",
  note:"Bílá sraženina Zn(OH)₂ se v nadbytku NaOH rozpouští — poznávací reakce zinečnatých solí."},
 {f:"Cr(OH)₃",n:"hydroxid chromitý",kind:"amfoterní hydroxid",
  acid:"Cr(OH)₃ + 3 HCl → CrCl₃ + 3 H₂O",acidc:"S kyselinou vzniká chromitá sůl.",
  base:"Cr(OH)₃ + NaOH → Na[Cr(OH)₄]",basec:"S hydroxidem vzniká zelený hydroxochromitan.",
  note:"Amfoterní jsou obvykle hydroxidy kovů se středním oxidačním číslem (+III) nebo malých kationtů (Be, Zn, Sn, Pb)."},
 {f:"Pb(OH)₂",n:"hydroxid olovnatý",kind:"amfoterní hydroxid",
  acid:"Pb(OH)₂ + 2 HNO₃ → Pb(NO₃)₂ + 2 H₂O",acidc:"S kyselinou (dusičnou; chloridy a sírany jsou nerozpustné).",
  base:"Pb(OH)₂ + 2 NaOH → Na₂[Pb(OH)₄]",basec:"S hydroxidem vzniká tetrahydroxoolovnatan.",
  note:"Také SnO, PbO, ZnO a Al₂O₃ jsou amfoterní oxidy — reagují s kyselinami i s taveninami hydroxidů."},
 {f:"ZnO",n:"oxid zinečnatý",kind:"amfoterní oxid",
  acid:"ZnO + 2 HCl → ZnCl₂ + H₂O",acidc:"Zásadotvorné chování oxidu kovu.",
  base:"ZnO + 2 NaOH + H₂O → Na₂[Zn(OH)₄]",basec:"Kyselinotvorné chování — s hydroxidem dá komplexní anion.",
  note:"Amfoterní oxid stojí na pomezí mezi zásadotvornými oxidy kovů (Na₂O, CaO) a kyselinotvornými oxidy nekovů (SO₃, CO₂)."},
 {f:"HCO₃⁻",n:"hydrogenuhličitanový anion",kind:"amfolyt (amfiprotní částice)",
  acid:"HCO₃⁻ + H₃O⁺ → H₂CO₃ + H₂O → CO₂ + 2 H₂O",acidc:"Vůči kyselině je bází — přijme proton (a jedlá soda šumí).",
  base:"HCO₃⁻ + OH⁻ → CO₃²⁻ + H₂O",basec:"Vůči zásadě je kyselinou — odevzdá proton.",
  note:"Amfolyt = částice, která umí proton přijmout i odevzdat. Právě proto je pár H₂CO₃/HCO₃⁻ hlavní pufr krve."},
 {f:"H₂PO₄⁻",n:"dihydrogenfosforečnanový anion",kind:"amfolyt (amfiprotní částice)",
  acid:"H₂PO₄⁻ + H₃O⁺ → H₃PO₄ + H₂O",acidc:"Jako báze přijme proton.",
  base:"H₂PO₄⁻ + OH⁻ → HPO₄²⁻ + H₂O",basec:"Jako kyselina proton odevzdá (pKa 7,20).",
  note:"Pufr H₂PO₄⁻/HPO₄²⁻ drží pH uvnitř buněk kolem 7."},
 {f:"H₂O",n:"voda",kind:"amfolyt (amfiprotní částice)",
  acid:"H₂O + HCl → H₃O⁺ + Cl⁻",acidc:"Vůči kyselině je voda bází.",
  base:"H₂O + NH₃ → NH₄⁺ + OH⁻",basec:"Vůči bázi je voda kyselinou.",
  note:"Nejdůležitější amfolyt: díky tomu ve vodě probíhá autoprotolýza a existuje Kw."},
 {f:"H₂N–CH₂–COOH",n:"glycin (aminokyselina)",kind:"amfolyt (obojetný ion)",
  acid:"⁺H₃N–CH₂–COO⁻ + H₃O⁺ → ⁺H₃N–CH₂–COOH + H₂O",acidc:"V kyselém prostředí se karboxylát protonizuje — vzniká kation.",
  base:"⁺H₃N–CH₂–COO⁻ + OH⁻ → H₂N–CH₂–COO⁻ + H₂O",basec:"V zásaditém prostředí amonium odevzdá proton — vzniká anion.",
  note:"Aminokyseliny existují v neutrálním roztoku jako <b>obojetné ionty</b> (zwitteriony) — proton si v molekule sama přenese z COOH na NH₂. Proto jsou to krystalické látky s vysokou teplotou tání."}
];

/* ------------------------------------------------------------
   Hydrolýza solí
   typ 1 = silná/silná (neutrální), 2 = slabá kys./silná zás. (zásaditá),
   3 = silná kys./slabá zás. (kyselá), 4 = slabá/slabá (podle Ka a Kb),
   5 = hydrogensůl (disociace aniontu převažuje nad hydrolýzou)
   pH = orientační hodnota pro 0,1 mol·dm⁻³
   ------------------------------------------------------------ */
var SALTS=[
 {f:"NaCl",n:"chlorid sodný",cat:"Na⁺",an:"Cl⁻",acid:"HCl (silná)",base:"NaOH (silná)",typ:1,pH:7.0,eq:"žádná hydrolýza — Na⁺ ani Cl⁻ s vodou nereagují",note:"Cl⁻ je konjugovaná báze silné kyseliny, tedy prakticky žádná báze; Na⁺ je jen hydratovaný divák."},
 {f:"KNO₃",n:"dusičnan draselný",cat:"K⁺",an:"NO₃⁻",acid:"HNO₃ (silná)",base:"KOH (silná)",typ:1,pH:7.0,eq:"žádná hydrolýza",note:"Oba ionty pocházejí ze silných elektrolytů — roztok je neutrální."},
 {f:"Na₂SO₄",n:"síran sodný",cat:"Na⁺",an:"SO₄²⁻",acid:"H₂SO₄ (silná)",base:"NaOH (silná)",typ:1,pH:7.0,eq:"SO₄²⁻ + H₂O ⇌ HSO₄⁻ + OH⁻ (zanedbatelně, pKb 12,0)",note:"Síranový anion je velmi slabá báze — roztok je prakticky neutrální (pH ≈ 7,0–7,2)."},
 {f:"CaCl₂",n:"chlorid vápenatý",cat:"Ca²⁺",an:"Cl⁻",acid:"HCl (silná)",base:"Ca(OH)₂ (silná)",typ:1,pH:7.0,eq:"žádná hydrolýza",note:"Velký kation s nábojem 2+ hydrolyzuje jen nepatrně; roztok je neutrální."},
 {f:"NH₄Cl",n:"chlorid amonný (salmiak)",cat:"NH₄⁺",an:"Cl⁻",acid:"HCl (silná)",base:"NH₃ (slabá)",typ:3,pH:5.1,eq:"NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺",note:"Kation slabé báze je kyselinou (pKa 9,25). Cl⁻ nehydrolyzuje. Roztok je kyselý — proto se salmiak používá jako tavidlo při pájení (rozpouští oxidy)."},
 {f:"(NH₄)₂SO₄",n:"síran amonný",cat:"NH₄⁺",an:"SO₄²⁻",acid:"H₂SO₄ (silná)",base:"NH₃ (slabá)",typ:3,pH:5.0,eq:"NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺",note:"Kyselé hnojivo — okyseluje půdu. Sírany prakticky nehydrolyzují."},
 {f:"NH₄NO₃",n:"dusičnan amonný",cat:"NH₄⁺",an:"NO₃⁻",acid:"HNO₃ (silná)",base:"NH₃ (slabá)",typ:3,pH:5.1,eq:"NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺",note:"Stejný princip jako NH₄Cl; dusičnan je nehydrolyzující anion."},
 {f:"AlCl₃",n:"chlorid hlinitý",cat:"Al³⁺",an:"Cl⁻",acid:"HCl (silná)",base:"Al(OH)₃ (slabá, amfoterní)",typ:3,pH:3.0,eq:"[Al(H₂O)₆]³⁺ + H₂O ⇌ [Al(H₂O)₅(OH)]²⁺ + H₃O⁺",note:"Malý kation s vysokým nábojem silně polarizuje koordinované molekuly vody — proton se z nich snadno odštěpí (pKa ≈ 5). Roztok je výrazně kyselý; při zahřátí se sráží Al(OH)₃."},
 {f:"FeCl₃",n:"chlorid železitý",cat:"Fe³⁺",an:"Cl⁻",acid:"HCl (silná)",base:"Fe(OH)₃ (slabá)",typ:3,pH:2.0,eq:"[Fe(H₂O)₆]³⁺ + H₂O ⇌ [Fe(H₂O)₅(OH)]²⁺ + H₃O⁺",note:"Jeden z nejkyselejších běžných kationtů (pKa ≈ 2,2). Hnědé zbarvení roztoků FeCl₃ způsobují právě hydroxokomplexy."},
 {f:"CuSO₄",n:"síran měďnatý (modrá skalice)",cat:"Cu²⁺",an:"SO₄²⁻",acid:"H₂SO₄ (silná)",base:"Cu(OH)₂ (slabá)",typ:3,pH:4.2,eq:"[Cu(H₂O)₆]²⁺ + H₂O ⇌ [Cu(H₂O)₅(OH)]⁺ + H₃O⁺",note:"Roztok modré skalice je slabě kyselý (lakmus zčervená). Náboj 2+ hydrolyzuje méně než 3+."},
 {f:"ZnCl₂",n:"chlorid zinečnatý",cat:"Zn²⁺",an:"Cl⁻",acid:"HCl (silná)",base:"Zn(OH)₂ (slabá, amfoterní)",typ:3,pH:5.0,eq:"[Zn(H₂O)₆]²⁺ + H₂O ⇌ [Zn(H₂O)₅(OH)]⁺ + H₃O⁺",note:"Slabě kyselý roztok; koncentrovaný ZnCl₂ se také používal jako pájecí tavidlo."},
 {f:"CH₃COONa",n:"octan sodný",cat:"Na⁺",an:"CH₃COO⁻",acid:"CH₃COOH (slabá)",base:"NaOH (silná)",typ:2,pH:8.9,eq:"CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻",note:"Anion slabé kyseliny je bází (pKb 9,24). Na⁺ nehydrolyzuje. Roztok je slabě zásaditý — fenolftalein lehce zrůžoví."},
 {f:"HCOONa",n:"mravenčan sodný",cat:"Na⁺",an:"HCOO⁻",acid:"HCOOH (slabá)",base:"NaOH (silná)",typ:2,pH:8.4,eq:"HCOO⁻ + H₂O ⇌ HCOOH + OH⁻",note:"Slabší hydrolýza než u octanu — kyselina mravenčí je silnější, její anion je slabší báze."},
 {f:"Na₂CO₃",n:"uhličitan sodný (soda)",cat:"Na⁺",an:"CO₃²⁻",acid:"H₂CO₃ (slabá)",base:"NaOH (silná)",typ:2,pH:11.6,eq:"CO₃²⁻ + H₂O ⇌ HCO₃⁻ + OH⁻",note:"Silná hydrolýza (pKb 3,67): roztok sody je tak zásaditý, že zmýdelňuje tuky — proto se sodou odjakživa pere a odmašťuje."},
 {f:"NaHCO₃",n:"hydrogenuhličitan sodný (jedlá soda)",cat:"Na⁺",an:"HCO₃⁻",acid:"H₂CO₃ (slabá)",base:"NaOH (silná)",typ:2,pH:8.3,eq:"HCO₃⁻ + H₂O ⇌ H₂CO₃ + OH⁻ (převažuje) · HCO₃⁻ + H₂O ⇌ CO₃²⁻ + H₃O⁺",note:"Amfolyt: jako báze (pKb 7,65) je silnější než jako kyselina (pKa 10,33), takže vyhrává zásaditá reakce — ale jen slabě. pH = ½(pKa₁ + pKa₂) = 8,3. Proto jedlá soda neutralizuje překyselený žaludek, a přesto se dá jíst."},
 {f:"Na₃PO₄",n:"fosforečnan sodný",cat:"Na⁺",an:"PO₄³⁻",acid:"H₃PO₄ (středně silná)",base:"NaOH (silná)",typ:2,pH:12.6,eq:"PO₄³⁻ + H₂O ⇌ HPO₄²⁻ + OH⁻",note:"PO₄³⁻ je silná báze (pKb 1,7) — roztok je tak zásaditý, že se používá jako odmašťovadlo."},
 {f:"NaCN",n:"kyanid sodný",cat:"Na⁺",an:"CN⁻",acid:"HCN (velmi slabá)",base:"NaOH (silná)",typ:2,pH:11.1,eq:"CN⁻ + H₂O ⇌ HCN + OH⁻",note:"Silně zásaditý roztok. Pozor: okyselením se uvolní smrtelně jedovatý plynný HCN."},
 {f:"KF",n:"fluorid draselný",cat:"K⁺",an:"F⁻",acid:"HF (slabá)",base:"KOH (silná)",typ:2,pH:8.1,eq:"F⁻ + H₂O ⇌ HF + OH⁻",note:"Jediný halogenid, který znatelně hydrolyzuje — protože HF je jediný slabý halogenovodík. KCl, KBr, KI jsou neutrální."},
 {f:"Na₂S",n:"sulfid sodný",cat:"Na⁺",an:"S²⁻",acid:"H₂S (slabá)",base:"NaOH (silná)",typ:2,pH:13.0,eq:"S²⁻ + H₂O → HS⁻ + OH⁻ (prakticky úplně)",note:"Sulfidový anion je tak silná báze (pKa HS⁻ ≈ 19), že v roztoku prakticky neexistuje — roztok obsahuje HS⁻ a OH⁻ a je silně zásaditý."},
 {f:"NaClO",n:"chlornan sodný (Savo)",cat:"Na⁺",an:"ClO⁻",acid:"HClO (slabá)",base:"NaOH (silná)",typ:2,pH:10.3,eq:"ClO⁻ + H₂O ⇌ HClO + OH⁻",note:"Zásaditý roztok; okyselením vzniká HClO a z ní chlor — proto se Savo nesmí míchat s kyselými čističi."},
 {f:"CH₃COONH₄",n:"octan amonný",cat:"NH₄⁺",an:"CH₃COO⁻",acid:"CH₃COOH (slabá, pKa 4,76)",base:"NH₃ (slabá, pKb 4,75)",typ:4,pH:7.0,eq:"NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺ · CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻",note:"Hydrolyzují oba ionty — a téměř stejně silně (Ka(NH₄⁺) ≈ Kb(CH₃COO⁻)). Roztok je prakticky neutrální, ale <b>ne</b> proto, že by nehydrolyzoval, nýbrž proto, že se oba efekty vyruší."},
 {f:"NH₄CN",n:"kyanid amonný",cat:"NH₄⁺",an:"CN⁻",acid:"HCN (velmi slabá, pKa 9,21)",base:"NH₃ (slabá, pKb 4,75)",typ:4,pH:9.2,eq:"NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺ · CN⁻ + H₂O ⇌ HCN + OH⁻",note:"Kb(CN⁻) = 1,6·10⁻⁵ > Ka(NH₄⁺) = 5,6·10⁻¹⁰: anion hydrolyzuje silněji → roztok je zásaditý. Rozhoduje porovnání Ka a Kb."},
 {f:"NH₄F",n:"fluorid amonný",cat:"NH₄⁺",an:"F⁻",acid:"HF (slabá, pKa 3,17)",base:"NH₃ (slabá, pKb 4,75)",typ:4,pH:6.2,eq:"NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺ · F⁻ + H₂O ⇌ HF + OH⁻",note:"Ka(NH₄⁺) = 5,6·10⁻¹⁰ > Kb(F⁻) = 1,5·10⁻¹¹: kation hydrolyzuje silněji → roztok je slabě kyselý."},
 {f:"(NH₄)₂CO₃",n:"uhličitan amonný",cat:"NH₄⁺",an:"CO₃²⁻",acid:"H₂CO₃ (slabá)",base:"NH₃ (slabá)",typ:4,pH:9.8,eq:"NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺ · CO₃²⁻ + H₂O ⇌ HCO₃⁻ + OH⁻",note:"Kb(CO₃²⁻) = 2,1·10⁻⁴ ≫ Ka(NH₄⁺): zásaditý. Nestálá sůl — rozkládá se na NH₃ + CO₂ (čichací sůl, kypřicí prášek)."},
 {f:"NaHSO₄",n:"hydrogensíran sodný",cat:"Na⁺",an:"HSO₄⁻",acid:"H₂SO₄ (silná)",base:"NaOH (silná)",typ:5,pH:1.6,eq:"HSO₄⁻ + H₂O ⇌ SO₄²⁻ + H₃O⁺ (disociace, Ka = 1,0·10⁻²)",note:"<b>Není to hydrolýza.</b> HSO₄⁻ je sám o sobě středně silná kyselina — anion prostě disociuje. Roztok je silně kyselý (pH ≈ 1,6). Chyták: „sůl silné kyseliny a silné zásady“ tu neznamená neutrální."},
 {f:"NaH₂PO₄",n:"dihydrogenfosforečnan sodný",cat:"Na⁺",an:"H₂PO₄⁻",acid:"H₃PO₄ (středně silná)",base:"NaOH (silná)",typ:5,pH:4.7,eq:"H₂PO₄⁻ + H₂O ⇌ HPO₄²⁻ + H₃O⁺ (převažuje) · H₂PO₄⁻ + H₂O ⇌ H₃PO₄ + OH⁻",note:"Amfolyt, u něhož je kyselá disociace (pKa 7,20) silnější než zásaditá hydrolýza (pKb 11,85) → slabě kyselý, pH = ½(2,15 + 7,20) = 4,7."},
 {f:"Na₂HPO₄",n:"hydrogenfosforečnan sodný",cat:"Na⁺",an:"HPO₄²⁻",acid:"H₃PO₄ (středně silná)",base:"NaOH (silná)",typ:5,pH:9.8,eq:"HPO₄²⁻ + H₂O ⇌ H₂PO₄⁻ + OH⁻ (převažuje) · HPO₄²⁻ + H₂O ⇌ PO₄³⁻ + H₃O⁺",note:"Amfolyt, u něhož vyhrává zásaditá hydrolýza (pKb 6,80 < pKa 12,3) → slabě zásaditý, pH = ½(7,20 + 12,3) = 9,8."}
];

/* trenažér hydrolýzy: pořadí a odpovědi (kys / neu / zas) */
var HD=[
 {f:"NH₄Cl",a:"kys",e:"Sůl <b>silné kyseliny</b> (HCl) a <b>slabé zásady</b> (NH₃). Hydrolyzuje kation: NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺. Roztok je kyselý (pH ≈ 5)."},
 {f:"CH₃COONa",a:"zas",e:"Sůl <b>slabé kyseliny</b> (CH₃COOH) a <b>silné zásady</b> (NaOH). Hydrolyzuje anion: CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻. Zásaditý (pH ≈ 9)."},
 {f:"KNO₃",a:"neu",e:"Silná kyselina (HNO₃) + silná zásada (KOH). Ani K⁺, ani NO₃⁻ s vodou nereagují — neutrální."},
 {f:"Na₂CO₃",a:"zas",e:"Uhličitanový anion je konjugovaná báze velmi slabé kyseliny → CO₃²⁻ + H₂O ⇌ HCO₃⁻ + OH⁻. Silně zásaditý (pH ≈ 11,6) — proto se sodou pere."},
 {f:"AlCl₃",a:"kys",e:"Hydratovaný kation [Al(H₂O)₆]³⁺ je kyselina: odštěpuje proton z koordinované vody. Cl⁻ nehydrolyzuje. Kyselý (pH ≈ 3)."},
 {f:"NaCl",a:"neu",e:"Silná kyselina + silná zásada. Roztok kuchyňské soli je neutrální."},
 {f:"NaCN",a:"zas",e:"CN⁻ je konjugovaná báze velmi slabé HCN (pKa 9,21): CN⁻ + H₂O ⇌ HCN + OH⁻. Silně zásaditý (pH ≈ 11)."},
 {f:"CuSO₄",a:"kys",e:"Kation slabé zásady Cu(OH)₂ hydrolyzuje: [Cu(H₂O)₆]²⁺ ⇌ [Cu(H₂O)₅(OH)]⁺ + H⁺. Síran nehydrolyzuje. Slabě kyselý (pH ≈ 4)."},
 {f:"NaHSO₄",a:"kys",e:"Chyták: obě „mateřské“ látky jsou silné, ale anion HSO₄⁻ je sám středně silná kyselina a <b>disociuje</b> (ne hydrolyzuje). Silně kyselý (pH ≈ 1,6)."},
 {f:"CH₃COONH₄",a:"neu",e:"Hydrolyzují oba ionty, ale Ka(NH₄⁺) = 5,6·10⁻¹⁰ ≈ Kb(CH₃COO⁻) = 5,8·10⁻¹⁰ — efekty se vyruší. Prakticky neutrální (pH ≈ 7,0)."},
 {f:"KF",a:"zas",e:"F⁻ je konjugovaná báze slabé HF: F⁻ + H₂O ⇌ HF + OH⁻. Slabě zásaditý (pH ≈ 8). Ostatní halogenidy draselné jsou neutrální."},
 {f:"NH₄CN",a:"zas",e:"Slabá/slabá — porovnáme konstanty: Kb(CN⁻) = 1,6·10⁻⁵ ≫ Ka(NH₄⁺) = 5,6·10⁻¹⁰. Anion vyhrává → zásaditý (pH ≈ 9,2)."},
 {f:"NaHCO₃",a:"zas",e:"Amfolyt HCO₃⁻: jako báze (pKb 7,65) silnější než jako kyselina (pKa 10,33). Slabě zásaditý (pH ≈ 8,3)."},
 {f:"FeCl₃",a:"kys",e:"[Fe(H₂O)₆]³⁺ je jedna z nejkyselejších běžných částic (pKa ≈ 2,2). Kyselý (pH ≈ 2)."},
 {f:"Na₃PO₄",a:"zas",e:"PO₄³⁻ je silná báze (pKb 1,7): PO₄³⁻ + H₂O ⇌ HPO₄²⁻ + OH⁻. Silně zásaditý (pH ≈ 12,5)."},
 {f:"NH₄F",a:"kys",e:"Slabá/slabá: Ka(NH₄⁺) = 5,6·10⁻¹⁰ > Kb(F⁻) = 1,5·10⁻¹¹. Kation hydrolyzuje víc → slabě kyselý (pH ≈ 6,2)."}
];
