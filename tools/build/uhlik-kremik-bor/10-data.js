/* ============================================================
   TEMATICKÁ DATA — uhlík, křemík, bor
   Hodnoty ověřeny proti běžným tabulkám (Atkins, CRC, Chemické tabulky).
   ============================================================ */

/* --- prvky: konfigurace, vazebné možnosti, fyzikální data --- */
var PRVKY = {
  B: {
    s:"B", jm:"bor", z:5, sk:13, per:2,
    konf:"[He] 2s² 2p¹", val:"3 valenční elektrony, 4 valenční orbitaly",
    en:2.04, ipot:801, rkov:84, tt:2076, tv:3927, rho:2.34,
    hyb:"sp² (planární BX₃) · sp³ (tetraedrické [BH₄]⁻)",
    oxc:"+III (téměř vždy); v boridech se formálně píše záporné",
    max:"3 vazby σ vlastními elektrony, 4. jen jako akceptor páru",
    typ:"polokov, chemicky nekov",
    prc:"Chybí mu elektron do oktetu → planární BX₃ má jen sextet a je Lewisova kyselina. Když nemá koho okrást, sdílí jeden pár mezi třemi jádry — třístředová vazba.",
    zaj:"Jediný nekov ve 13. skupině. Jeho kyslíkaté sloučeniny se chovají jako křemičité — proto diagonální podobnost B–Si."
  },
  C: {
    s:"C", jm:"uhlík", z:6, sk:14, per:2,
    konf:"[He] 2s² 2p²", val:"4 valenční elektrony, 4 valenční orbitaly",
    en:2.55, ipot:1086, rkov:77, tt:3550, tv:4827, rho:3.51,
    hyb:"sp³ (tetraedr) · sp² (rovina, jedna π) · sp (přímka, dvě π)",
    oxc:"od −IV (CH₄) po +IV (CO₂); v organice se raději nepoužívá",
    max:"nejvýše 4 vazby — žádné orbitaly d",
    typ:"nekov",
    prc:"Malý atom s orbitaly 2p, které se dobře překrývají bokem → pevné vazby π. Proto CO₂ je molekula, ne síť, a proto existuje dvojná a trojná vazba.",
    zaj:"Vazba C—C je stejně pevná jako C—O, takže řetězec uhlíku se nemá důvod rozpadat. Odtud celá organická chemie."
  },
  Si: {
    s:"Si", jm:"křemík", z:14, sk:14, per:3,
    konf:"[Ne] 3s² 3p²", val:"4 valenční elektrony, 9 valenčních orbitalů (3s, 3p, 3d)",
    en:1.90, ipot:787, rkov:111, tt:1414, tv:3265, rho:2.33,
    hyb:"prakticky vždy sp³; s orbitaly d až sp³d² ([SiF₆]²⁻)",
    oxc:"−IV (silicidy, SiH₄) a +IV (SiO₂, SiCl₄); +II jen výjimečně (SiO)",
    max:"běžně 4, s orbitaly 3d až 6 vazeb",
    typ:"polokov, polovodič",
    prc:"Větší atom, orbitaly 3p se bokem překrývají špatně → vazby π nevznikají. Křemík se místo dvojné vazby vysytí čtyřmi jednoduchými → prostorová síť.",
    zaj:"Vazba Si—O je pevnější než Si—Si, takže křemík v přírodě neřetězí sám sebe, ale řetězí se přes kyslík."
  },
  Ge: {
    s:"Ge", jm:"germanium", z:32, sk:14, per:4,
    konf:"[Ar] 3d¹⁰ 4s² 4p²", val:"4 valenční elektrony",
    en:2.01, ipot:762, rkov:120, tt:938, tv:2833, rho:5.32,
    hyb:"sp³", oxc:"+II a +IV", max:"4 až 6", typ:"polokov, polovodič",
    prc:"Ještě větší atom, vazby ještě slabší. Řetězce Ge—Ge existují jen v laboratoři.",
    zaj:"Historicky první polovodičový materiál; křemík ho vytlačil, protože SiO₂ je výborný izolant."
  },
  Al: {
    s:"Al", jm:"hliník", z:13, sk:13, per:3,
    konf:"[Ne] 3s² 3p¹", val:"3 valenční elektrony",
    en:1.61, ipot:578, rkov:121, tt:660, tv:2519, rho:2.70,
    hyb:"sp³, často koordinační číslo 6", oxc:"+III", max:"4 až 6", typ:"kov",
    prc:"Větší a méně elektronegativní než bor → tvoří opravdové ionty Al³⁺ a jeho oxid je amfoterní.",
    zaj:"Diagonální partner beryllia: obojí amfoterní oxid, obojí kovalentní halogenidy s můstky."
  }
};
var PRVKY_HLAVNI = ["B","C","Si"];

/* --- vazebné energie [kJ·mol⁻¹] --- */
var VAZBY = [
  {p:"C—C", e:348, k:"C"}, {p:"C—H", e:412, k:"C"}, {p:"C—O", e:360, k:"C"},
  {p:"C—F", e:484, k:"C"}, {p:"C—Cl", e:338, k:"C"}, {p:"C—N", e:305, k:"C"},
  {p:"Si—Si", e:226, k:"Si"}, {p:"Si—H", e:318, k:"Si"}, {p:"Si—O", e:466, k:"Si"},
  {p:"Si—F", e:565, k:"Si"}, {p:"Si—Cl", e:381, k:"Si"}, {p:"Si—N", e:335, k:"Si"},
  {p:"B—B", e:293, k:"B"}, {p:"B—H", e:389, k:"B"}, {p:"B—O", e:519, k:"B"},
  {p:"B—F", e:613, k:"B"}, {p:"B—Cl", e:456, k:"B"}, {p:"B—N", e:389, k:"B"}
];

/* --- modifikace uhlíku a příbuzné struktury --- */
var MODIF = [
  {id:"diamant", jm:"Diamant", vz:"C", hyb:"sp³", sit:"trojrozměrná síť", rho:3.51,
   mohs:10, vod:"izolant", pas:5.5, dl:"C—C = 154 pm", rok:"znám od pravěku",
   pop:"Každý atom uhlíku je tetraedricky vázán ke čtyřem sousedům jedinou pevnou sítí vazeb σ. Není v ní jediný volný elektron, není v ní jediná slabá rovina.",
   vlast:"nejtvrdší přírodní látka, izolant, ale výborný vodič tepla; index lomu 2,42",
   pouz:"brusiva, vrtné korunky, obráběcí nože, tepelné podložky pro čipy, šperky"},
  {id:"grafit", jm:"Grafit", vz:"C", hyb:"sp²", sit:"vrstvy", rho:2.26,
   mohs:1.5, vod:"vodič v rovině vrstvy", pas:0, dl:"C—C = 142 pm ve vrstvě, 335 pm mezi vrstvami",
   rok:"znám od pravěku",
   pop:"Rovinné vrstvy šestiúhelníků. Tři vazby σ leží v rovině, čtvrtý elektron sedí v orbitalu p kolmo k vrstvě a slévá se se sousedy do delokalizovaného oblaku π.",
   vlast:"měkký, mastný na dotek, elektricky vodivý v rovině vrstvy, žáruvzdorný",
   pouz:"tuhy, elektrody, mazivo, moderátor v jaderných reaktorech, anody lithiových baterií"},
  {id:"fulleren", jm:"Fulleren C₆₀", vz:"C₆₀", hyb:"sp² (mírně pyramidalizovaná)", sit:"molekula", rho:1.65,
   mohs:0, vod:"polovodič", pas:1.6, dl:"průměr klece ≈ 0,7 nm",
   rok:"objeven 1985, Nobelova cena za chemii 1996",
   pop:"Uzavřená klec z dvanácti pětiúhelníků a dvaceti šestiúhelníků. Pětiúhelníky zajišťují zakřivení — z pouhých šestiúhelníků byste kouli neposkládali.",
   vlast:"rozpustný v benzenu a toluenu (fialový roztok), chová se jako molekulová látka",
   pouz:"organická fotovoltaika, výzkum, modelová molekula pro chemii klecí"},
  {id:"nanotrubice", jm:"Uhlíková nanotrubice", vz:"C", hyb:"sp²", sit:"svinutá vrstva", rho:1.4,
   mohs:0, vod:"kov nebo polovodič podle svinutí", pas:0.5, dl:"průměr 1—50 nm",
   rok:"popsány 1991",
   pop:"Vrstva grafenu svinutá do válce. Podle úhlu svinutí vyjde buď kovový vodič, nebo polovodič — tatáž látka, jiná geometrie.",
   vlast:"mimořádná pevnost v tahu, vysoká tepelná i elektrická vodivost podél trubice",
   pouz:"kompozity, vodivé inkousty, hroty mikroskopů, výzkum tranzistorů"},
  {id:"grafen", jm:"Grafen", vz:"C", hyb:"sp²", sit:"jediná vrstva", rho:2.26,
   mohs:0, vod:"polokov s nulovým zakázaným pásem", pas:0, dl:"C—C = 142 pm",
   rok:"izolován 2004, Nobelova cena za fyziku 2010",
   pop:"Jedna jediná vrstva grafitu — látka tlustá jeden atom. Elektrony se v ní pohybují, jako by neměly hmotnost.",
   vlast:"průhledný, ohebný, pevnější než ocel, vede proud i teplo lépe než měď",
   pouz:"senzory, průhledné elektrody, výzkum elektroniky"},
  {id:"sazre", jm:"Saze a aktivní uhlí", vz:"C", hyb:"sp² (neuspořádaně)", sit:"mikrokrystalická", rho:1.9,
   mohs:0, vod:"slabý vodič", pas:0, dl:"neuspořádané domény grafitu",
   rok:"technicky vyráběny od 19. století",
   pop:"Grafit rozdrobený na drobné, špatně uspořádané krystalky s obrovským členitým povrchem. Právě ta členitost dělá z uhlíku sorbent.",
   vlast:"měrný povrch aktivního uhlí 500—1500 m²·g⁻¹, silně sorbuje plyny i organické látky",
   pouz:"plnivo do pneumatik, tiskařská čerň, filtry, léčba otrav, čištění vody"},
  {id:"kremik", jm:"Křemík (pro srovnání)", vz:"Si", hyb:"sp³", sit:"trojrozměrná síť jako diamant", rho:2.33,
   mohs:6.5, vod:"polovodič", pas:1.12, dl:"Si—Si = 235 pm",
   rok:"izolován 1824",
   pop:"Táž mřížka jako diamant, jen s delší a slabší vazbou. Odtud nižší teplota tání i to, že křemík je polovodič, kdežto diamant izolant.",
   vlast:"tvrdý, křehký, šedý s kovovým leskem, vodivost roste s teplotou",
   pouz:"čipy, fotovoltaika, ferrosilicium v ocelářství"},
  {id:"bor", jm:"Bor (pro srovnání)", vz:"B", hyb:"sp³ + třístředové vazby", sit:"síť ikosaedrů B₁₂", rho:2.34,
   mohs:9.3, vod:"polovodič", pas:1.6, dl:"B—B ≈ 175—180 pm",
   rok:"izolován 1808",
   pop:"Stavebním kamenem není atom, ale dvanáctiatomový ikosaedr B₁₂. Ty se propojují jednoduchými i třístředovými vazbami do tvrdé prostorové sítě.",
   vlast:"velmi tvrdý, málo těkavý, za normální teploty chemicky netečný",
   pouz:"absorbér neutronů, přísada do slitin, výroba B₄C a boridů"}
];

/* --- křemičitany: stavebnice tetraedrů SiO₄ --- */
var SILIK = [
  {id:"orto", jm:"Izolované tetraedry", pod:"orthosilikáty (nesosilikáty)",
   vz:"SiO₄⁴⁻", pom:"1 : 4,00", naboj:"−4 na každý atom Si", sdil:0,
   min:"olivín (Mg,Fe)₂SiO₄ · zirkon ZrSiO₄ · granáty · forsterit Mg₂SiO₄",
   pop:"Tetraedry se nedotýkají. Každý má všechny čtyři kyslíky jen pro sebe a nese plný náboj −4. Mezi nimi sedí kationty kovů.",
   vlast:"kompaktní, tvrdé, bez štěpnosti v jednom směru — nemají kudy se štěpit"},
  {id:"soro", jm:"Dvojice a kruhy", pod:"sorosilikáty a cyklosilikáty",
   vz:"Si₂O₇⁶⁻ · Si₃O₉⁶⁻ · Si₆O₁₈¹²⁻", pom:"1 : 3,50 (dvojice) až 1 : 3,00 (kruh)",
   naboj:"−6 na Si₂O₇ · −12 na Si₆O₁₈", sdil:1,
   min:"thortveitit Sc₂Si₂O₇ · beryl Al₂Be₃Si₆O₁₈ (smaragd) · wollastonit Ca₃Si₃O₉",
   pop:"Dva tetraedry sdílejí jeden vrchol, nebo se tři až šest jich spojí do kruhu. Vzniká ostrůvek — konečný útvar, ne nekonečný řetěz.",
   vlast:"beryl má v kruzích dutiny, ve kterých mohou sedět stopové ionty; ty ho barví na zeleno (smaragd) nebo modro (akvamarín)"},
  {id:"retez", jm:"Jednoduchý řetězec", pod:"inosilikáty — pyroxeny",
   vz:"(SiO₃²⁻)ₙ", pom:"1 : 3,00", naboj:"−2 na každý atom Si", sdil:2,
   min:"enstatit MgSiO₃ · diopsid CaMgSi₂O₆ · augit",
   pop:"Každý tetraedr sdílí dva vrcholy se sousedy a řetěz pokračuje donekonečna. Kationty kovů leží podél řetězců a drží je pohromadě.",
   vlast:"krystaly protáhlé ve směru řetězce, štěpnost podél řetězců, úhel štěpných ploch u pyroxenů ≈ 90°"},
  {id:"dvojity", jm:"Dvojitý řetězec (pás)", pod:"inosilikáty — amfiboly",
   vz:"(Si₄O₁₁⁶⁻)ₙ", pom:"1 : 2,75", naboj:"−6 na každé čtyři atomy Si", sdil:2.5,
   min:"tremolit · aktinolit · hornblenda · azbestové formy amfibolů",
   pop:"Dva jednoduché řetězce srostlé do pásu. Polovina tetraedrů sdílí dva vrcholy, polovina tři — odtud „půldruhý“ poměr.",
   vlast:"výrazně vláknité minerály; azbest se pro karcinogenitu vláken v EU nesmí používat"},
  {id:"vrstva", jm:"Vrstva", pod:"fylosilikáty",
   vz:"(Si₂O₅²⁻)ₙ", pom:"1 : 2,50", naboj:"−2 na každé dva atomy Si", sdil:3,
   min:"slídy (muskovit, biotit) · mastek Mg₃Si₄O₁₀(OH)₂ · kaolinit Al₂Si₂O₅(OH)₄ · jíly",
   pop:"Každý tetraedr sdílí tři vrcholy a zřetězení se rozšíří do celé roviny. Čtvrtý kyslík trčí kolmo z vrstvy a váže se na vrstvu hydroxidu hliníku nebo hořčíku.",
   vlast:"dokonalá štěpnost v jednom směru, slída se loupe na průhledné lístky, mastek je nejměkčí minerál stupnice"},
  {id:"sit", jm:"Prostorová síť", pod:"tektosilikáty",
   vz:"SiO₂ (neutrální) · hlinitokřemičitany", pom:"1 : 2,00", naboj:"0, pokud není Si nahrazen Al", sdil:4,
   min:"křemen SiO₂ · živce KAlSi₃O₈, NaAlSi₃O₈ · zeolity",
   pop:"Všechny čtyři vrcholy sdílené. Náboj je vyrovnaný a látka je elektroneutrální. Teprve když část atomů Si nahradí Al, vznikne záporný náboj a do sítě se musí vejít kationty.",
   vlast:"tvrdé, netěkavé, chemicky odolné; zeolity mají v síti pravidelné dutiny a fungují jako molekulová síta a měniče iontů"}
];

/* --- prohledávatelná tabulka sloučenin --- */
var SLOUC = [
  {v:"CO", n:"oxid uhelnatý", p:"C", ox:"+II", st:"lineární molekula, trojná vazba C≡O", vl:"bezbarvý plyn bez zápachu, prudce jedovatý, silné redukovadlo", u:"redukce rud, syntézní plyn, výroba fosgenu a methanolu"},
  {v:"CO₂", n:"oxid uhličitý", p:"C", ox:"+IV", st:"lineární molekula O=C=O, dvě vazby π", vl:"bezbarvý plyn, sublimuje při −78,5 °C, kyselý oxid", u:"hasicí přístroje, sycení nápojů, suchý led, skleníkový plyn"},
  {v:"H₂CO₃", n:"kyselina uhličitá", p:"C", ox:"+IV", st:"trigonálně planární uhlík", vl:"slabá dvojsytná kyselina, existuje jen v roztoku (pK₁ = 6,35; pK₂ = 10,33)", u:"uhličitanový pufr krve a oceánů"},
  {v:"Na₂CO₃", n:"uhličitan sodný (soda)", p:"C", ox:"+IV", st:"iontová látka s aniontem CO₃²⁻", vl:"dobře rozpustný, roztok reaguje zásaditě", u:"výroba skla, mýdel, změkčování vody"},
  {v:"NaHCO₃", n:"hydrogenuhličitan sodný (jedlá soda)", p:"C", ox:"+IV", st:"iontová látka s aniontem HCO₃⁻", vl:"málo rozpustný, nad 100 °C se rozkládá na sodu, CO₂ a vodu", u:"kypřicí prášek, hasiva, neutralizace kyselin"},
  {v:"CaCO₃", n:"uhličitan vápenatý (vápenec, kalcit)", p:"C", ox:"+IV", st:"iontová mřížka", vl:"nerozpustný, s kyselinami šumí, nad 900 °C se rozkládá", u:"výroba vápna a cementu, plnivo, stavební kámen"},
  {v:"CaC₂", n:"karbid vápníku (acetylid)", p:"C", ox:"−I u uhlíku", st:"iontová mřížka Ca²⁺ a C₂²⁻", vl:"s vodou okamžitě dává acetylen a hydroxid", u:"výroba acetylenu a dusíkatého vápna, odsíření oceli"},
  {v:"SiC", n:"karbid křemíku (karborundum)", p:"C", ox:"C −IV, Si +IV", st:"kovalentní síť typu diamantu", vl:"velmi tvrdý (Mohs 9,5), žáruvzdorný, polovodič se širokým pásem", u:"brusiva, žáruvzdorné vyzdívky, výkonová elektronika, LED"},
  {v:"Al₄C₃", n:"karbid hlinitý", p:"C", ox:"C −IV", st:"kovalentní mřížka s izolovanými atomy C", vl:"s vodou hydrolyzuje na methan a hydroxid hlinitý", u:"laboratorní zdroj methanu, přísada do kompozitů"},
  {v:"TiC", n:"karbid titanu", p:"C", ox:"nestechiometrický", st:"intersticiální — atomy C v dutinách kovové mřížky", vl:"extrémně tvrdý a žáruvzdorný, kovově vodivý, nehydrolyzuje", u:"tvrdokovy, povlaky obráběcích nástrojů"},
  {v:"CS₂", n:"sulfid uhličitý (sirouhlík)", p:"C", ox:"+IV", st:"lineární S=C=S, izoelektronový s CO₂", vl:"těkavá kapalina, jedovatá, velmi hořlavá, výborné nepolární rozpouštědlo", u:"výroba viskózy a CCl₄, organická syntéza"},
  {v:"HCN", n:"kyanovodík", p:"C", ox:"+II", st:"lineární H—C≡N", vl:"velmi těkavá kapalina, prudce jedovatá, velmi slabá kyselina (pKₐ = 9,2)", u:"výroba plastů a syntetických vláken, kyanidové loužení"},
  {v:"NaCN", n:"kyanid sodný", p:"C", ox:"+II", st:"iontová látka s aniontem CN⁻", vl:"ve vodě silně hydrolyzuje, roztok zapáchá po HCN, jedovatý", u:"loužení zlata a stříbra, galvanické lázně"},
  {v:"(CN)₂", n:"dikyan", p:"C", ox:"+III", st:"lineární N≡C—C≡N", vl:"jedovatý plyn, termicky stálý, chová se jako pseudohalogen", u:"laboratorní chemie, meziprodukt"},
  {v:"COCl₂", n:"dichlorid-oxid uhličitý (fosgen)", p:"C", ox:"+IV", st:"trigonálně planární molekula", vl:"jedovatý plyn, snadno hydrolyzuje na CO₂ a HCl", u:"výroba polykarbonátů a polyurethanů"},
  {v:"CaCN₂", n:"kyanamid vápenatý (dusíkaté vápno)", p:"C", ox:"+IV", st:"iontová látka s aniontem NCN²⁻", vl:"s vodou pomalu uvolňuje amoniak", u:"dnes okrajové hnojivo, výroba kyanidů"},
  {v:"CCl₄", n:"tetrachlormethan", p:"C", ox:"+IV", st:"tetraedrická molekula", vl:"nehořlavá kapalina, vodou nehydrolyzuje, jedovatá", u:"dříve rozpouštědlo a hasivo, dnes pro toxicitu opuštěno"},
  {v:"SiO₂", n:"oxid křemičitý", p:"Si", ox:"+IV", st:"prostorová síť tetraedrů SiO₄ spojených vrcholy", vl:"t. t. 1713 °C, chemicky odolný, reaguje jen s HF a taveninami hydroxidů", u:"sklo, keramika, optická vlákna, silikagel, piezoelektrické krystaly"},
  {v:"SiH₄", n:"silan (tetrahydrid křemíku)", p:"Si", ox:"−IV", st:"tetraedrická molekula jako methan", vl:"na vzduchu samozápalný, vodou hydrolyzuje — na rozdíl od methanu", u:"depozice tenkých vrstev křemíku v elektronice"},
  {v:"SiCl₄", n:"chlorid křemičitý", p:"Si", ox:"+IV", st:"tetraedrická molekula", vl:"kapalina dýmající na vlhkém vzduchu, prudce hydrolyzuje", u:"výroba čistého křemíku, optických vláken a silikonů"},
  {v:"SiF₄", n:"fluorid křemičitý", p:"Si", ox:"+IV", st:"tetraedrická molekula", vl:"plyn, s vodou dává kyselinu hexafluorokřemičitou", u:"meziprodukt, vzniká při leptání skla"},
  {v:"H₂[SiF₆]", n:"kyselina hexafluorokřemičitá", p:"Si", ox:"+IV", st:"oktaedrický anion [SiF₆]²⁻, hybridizace sp³d²", vl:"silná kyselina, existuje jen v roztoku", u:"fluoridace vody, konzervace dřeva"},
  {v:"H₄SiO₄", n:"kyselina křemičitá", p:"Si", ox:"+IV", st:"tetraedrická molekula Si(OH)₄", vl:"velmi slabá kyselina (pK₁ ≈ 9,8), snadno kondenzuje na gel", u:"vzniká při hydrolýze křemičitanů, zdroj silikagelu"},
  {v:"Na₂SiO₃", n:"křemičitan sodný (vodní sklo)", p:"Si", ox:"+IV", st:"řetězcový anion (SiO₃²⁻)ₙ", vl:"rozpustný ve vodě, roztok reaguje silně zásaditě", u:"lepidla, ochranné nátěry, prací prostředky"},
  {v:"Mg₂Si", n:"silicid hořečnatý", p:"Si", ox:"−IV", st:"iontově kovalentní mřížka", vl:"s kyselinou dává silan", u:"laboratorní příprava silanů, termoelektrické materiály"},
  {v:"Si₃N₄", n:"nitrid křemíku", p:"Si", ox:"+IV", st:"kovalentní prostorová síť", vl:"velmi tvrdý, žáruvzdorný, chemicky odolný", u:"technická keramika, ložiska, řezné nástroje"},
  {v:"(R₂SiO)ₙ", n:"polysiloxany (silikony)", p:"Si", ox:"+IV", st:"řetězec —Si—O—Si—O— s organickými substituenty", vl:"teplotně stálé, hydrofobní, viskozita se s teplotou mění málo", u:"oleje, maziva, tmely, lékařské implantáty, formy na pečení"},
  {v:"B₂H₆", n:"diboran(6)", p:"B", ox:"+III", st:"dva tetraedry spojené hranou, dvě vazby B—H—B", vl:"na vzduchu samozápalný plyn, vodou okamžitě hydrolyzuje", u:"hydroborace v organické syntéze, dopování polovodičů"},
  {v:"Na[BH₄]", n:"tetrahydridoboritan sodný", p:"B", ox:"+III", st:"tetraedrický anion [BH₄]⁻", vl:"bílá pevná látka, v zásaditém roztoku stálá, mírné redukční činidlo", u:"redukce v organické syntéze, zdroj vodíku"},
  {v:"BF₃", n:"fluorid boritý", p:"B", ox:"+III", st:"trigonálně planární molekula, sextet na boru", vl:"plyn, silná Lewisova kyselina, s vodou tvoří H[BF₄]", u:"katalyzátor polymerací a alkylací"},
  {v:"BCl₃", n:"chlorid boritý", p:"B", ox:"+III", st:"trigonálně planární molekula", vl:"kapalina, vodou prudce hydrolyzuje na kyselinu boritou", u:"výroba čistého boru a nitridu boritého"},
  {v:"B₂O₃", n:"oxid boritý", p:"B", ox:"+III", st:"síť skupin BO₃ spojených kyslíky, snadno tuhne jako sklo", vl:"kyselý oxid, s vodou dává kyselinu boritou, rozpouští oxidy kovů", u:"borosilikátová skla, glazury, tavidla"},
  {v:"H₃BO₃", n:"kyselina boritá", p:"B", ox:"+III", st:"rovinné molekuly B(OH)₃ propojené vodíkovými můstky do vrstev", vl:"slabá jednosytná Lewisova kyselina (pKₐ = 9,24) — neodštěpuje H⁺, ale přijímá OH⁻", u:"oční voda, antiseptikum, sklářství, retardér hoření"},
  {v:"Na₂B₄O₇·10H₂O", n:"borax (tetraboritan sodný)", p:"B", ox:"+III", st:"anion [B₄O₅(OH)₄]²⁻ se skupinami BO₃ i BO₄", vl:"ve vodě hydrolyzuje, roztok reaguje zásaditě, rozpouští oxidy kovů", u:"sklářství, glazury, prací prostředky, pájení, boraxová perlička"},
  {v:"BN", n:"nitrid boritý", p:"B", ox:"+III", st:"hexagonální jako grafit, kubický jako diamant", vl:"hexagonální je měkký bílý izolant, kubický je téměř tak tvrdý jako diamant", u:"„bílý grafit“ jako mazivo, brusiva (borazon), žáruvzdorné kelímky"},
  {v:"B₄C", n:"karbid boru", p:"B", ox:"+III", st:"ikosaedry B₁₂ propojené řetízky C₃", vl:"jeden z nejtvrdších materiálů, velmi lehký, silně pohlcuje neutrony", u:"balistické pancíře, brusiva, regulační tyče jaderných reaktorů"},
  {v:"B₃N₃H₆", n:"borazin (borazol)", p:"B", ox:"+III", st:"šestičlenný kruh střídavě B a N, izoelektronový s benzenem", vl:"bezbarvá kapalina, fyzikálně podobná benzenu, ale mnohem reaktivnější", u:"prekurzor nitridu boritého, modelová látka"}
];

/* --- skla --- */
var SKLA = [
  {id:"sodne", jm:"Sodnovápenaté sklo", slo:[["SiO₂",72],["Na₂O",14],["CaO",10],["ostatní",4]],
   alfa:9.0, tmek:720, nlom:1.52,
   pop:"Nejběžnější sklo. Soda snižuje teplotu tání křemene z 1713 °C na zvládnutelných 1200 °C, vápenec vrací sklu nerozpustnost ve vodě.",
   pouz:"tabulové sklo, lahve, sklenice, obalové sklo",
   past:"Bez CaO by vzniklo vodní sklo, které se ve vodě rozpouští. Vápník je tu proto, aby okno nezmizelo v dešti."},
  {id:"draselne", jm:"Draselné („české“) sklo", slo:[["SiO₂",74],["K₂O",16],["CaO",9],["ostatní",1]],
   alfa:8.5, tmek:790, nlom:1.52,
   pop:"Sodík nahrazen draslíkem. Sklo je hůř tavitelné, tvrdší a odolnější vůči chemikáliím.",
   pouz:"chemické nádobí staršího typu, optika, umělecké a dekorativní sklo",
   past:"„Tvrdé sklo“ neznamená mechanicky tvrdší, ale hůř tavitelné."},
  {id:"olovnate", jm:"Olovnaté sklo (křišťál)", slo:[["SiO₂",58],["PbO",26],["K₂O",14],["ostatní",2]],
   alfa:9.0, tmek:630, nlom:1.65,
   pop:"Část CaO nahrazena oxidem olovnatým. Sklo má vysoký index lomu, silně láme světlo a krásně se brousí.",
   pouz:"broušené dekorativní sklo, optické čočky, stínění před rentgenovým zářením",
   past:"Je těžké, měkké a špatně snáší tepelné namáhání — na varné nádobí se nehodí."},
  {id:"boro", jm:"Borosilikátové sklo", slo:[["SiO₂",81],["B₂O₃",13],["Na₂O",4],["Al₂O₃",2]],
   alfa:3.3, tmek:820, nlom:1.47,
   pop:"Část SiO₂ nahrazena oxidem boritým. Bor se do sítě zabuduje jako skupina BO₃ nebo BO₄ a síť se stane pružnější — teplotní roztažnost klesne na třetinu.",
   pouz:"varné a laboratorní sklo, čajové konvice, žárovzdorné nádobí",
   past:"Odolnost proti teplotnímu šoku nedělá tvrdost, ale nízká teplotní roztažnost — sklo se při ohřevu skoro nezvětší, takže v něm nevznikne pnutí."},
  {id:"kremenne", jm:"Křemenné sklo", slo:[["SiO₂",100]],
   alfa:0.55, tmek:1665, nlom:1.46,
   pop:"Čistý amorfní SiO₂ bez jakýchkoli přísad. Zpracovává se hůř než všechna ostatní skla, ale snese teplotní šok, který ostatní roztrhá.",
   pouz:"optická vlákna, UV kyvety, křemenné trubice pecí, halogenové výbojky",
   past:"Propouští ultrafialové záření, které běžné sodné sklo zastaví — proto se z něj dělají kyvety pro UV spektrofotometrii."}
];

/* --- keramické a stavební materiály --- */
var KERAM = [
  {id:"cihla", jm:"Cihlářské výrobky", sur:"cihlářská hlína (jíly se železem)", t:900,
   dej:"Voda ze struktury jílu odejde, vrstevnaté minerály se rozpadnou a částice se na okrajích slinou dohromady.",
   vys:"pórovitý, mechanicky pevný, oxidy železa dávají červenou barvu", pouz:"cihly, tašky, dlaždice"},
  {id:"kamenina", jm:"Kamenina", sur:"jíly s tavivy", t:1200,
   dej:"Slinutí zajde tak daleko, že se póry uzavřou. Střep je hutný a nenasákavý i bez glazury.",
   vys:"hutný, nenasákavý, odolný proti kyselinám", pouz:"kanalizační trouby, obklady, chemické nádoby"},
  {id:"porcelan", jm:"Porcelán", sur:"kaolinit Al₂Si₂O₅(OH)₄ + živec + křemen", t:1400,
   dej:"Kaolinit se rozpadne a přeskupí na jehličky mullitu 3Al₂O₃·2SiO₂, které prorostou taveninou živce jako výztuž.",
   vys:"bílý, v tenké vrstvě průsvitný, zvonivý, velmi pevný", pouz:"nádobí, izolátory, dentální keramika"},
  {id:"cement", jm:"Portlandský cement", sur:"vápenec + jíl nebo břidlice", t:1450,
   dej:"Vápenec se rozloží na CaO, ten reaguje s křemičitany na slínkové minerály — hlavně alit 3CaO·SiO₂ a belit 2CaO·SiO₂.",
   vys:"šedý prášek, po smíchání s vodou hydratuje a tuhne i pod vodou", pouz:"beton, malty, omítky"},
  {id:"vapno", jm:"Vzdušné vápno", sur:"vápenec CaCO₃", t:950,
   dej:"Prosté rozložení vápence na oxid vápenatý a CO₂; hašením vzniká Ca(OH)₂, který na vzduchu zpětně tvrdne s CO₂ na CaCO₃.",
   vys:"tuhne jen na vzduchu, ne pod vodou", pouz:"vápenné malty a omítky, bílení"},
  {id:"sadra", jm:"Sádra (pro srovnání)", sur:"sádrovec CaSO₄·2H₂O", t:150,
   dej:"Není křemičitan — jen se odpaří část krystalové vody a vzniklý hemihydrát ji při rozdělání s vodou zase přijme.",
   vys:"rychle tuhne, měkká, nesnáší vlhko", pouz:"sádrokarton, štuk, obvazy"}
];

/* --- karbidy: tři typy podle vazby --- */
var KARBIDY = [
  {typ:"iontový (acetylidový)", vz:"CaC₂", an:"C₂²⁻", kov:"kovy 1., 2. a 13. skupiny",
   hydr:"C₂H₂ (acetylen)", eq:"CaC₂ + 2 H₂O → Ca(OH)₂ + C₂H₂",
   pozn:"Anion C₂²⁻ je izoelektronový s N₂ a má trojnou vazbu. Chová se jako sůl velmi slabé kyseliny — voda ho okamžitě protonuje."},
  {typ:"iontový (methanidový)", vz:"Al₄C₃", an:"C⁴⁻ (izolované atomy)", kov:"Al, Be",
   hydr:"CH₄ (methan)", eq:"Al₄C₃ + 12 H₂O → 4 Al(OH)₃ + 3 CH₄",
   pozn:"Izolované atomy uhlíku v mřížce. Formálně sůl methanu — proto při hydrolýze vzniká methan, ne acetylen."},
  {typ:"iontový (allylidový)", vz:"Mg₂C₃", an:"C₃⁴⁻", kov:"Mg",
   hydr:"C₃H₄ (propin)", eq:"Mg₂C₃ + 4 H₂O → 2 Mg(OH)₂ + C₃H₄",
   pozn:"Tříatomový lineární anion. Vzácný, ale ukazuje, že uhlík řetězí i v karbidech."},
  {typ:"kovalentní (polymerní)", vz:"SiC", an:"síť střídavých atomů", kov:"polokovy a málo elektropozitivní prvky",
   hydr:"nehydrolyzuje", eq:"SiO₂ + 3 C → SiC + 2 CO",
   pozn:"Mřížka diamantu, ve které je polovina uhlíků nahrazena křemíkem. Extrémně tvrdý a netečný — voda s ním nehne."},
  {typ:"intersticiální (vmezeřený)", vz:"TiC, WC, VC", an:"atomy C v dutinách", kov:"přechodné kovy 4.—6. skupiny",
   hydr:"nehydrolyzuje", eq:"Ti + C → TiC (spékání za vysoké teploty)",
   pozn:"Malé atomy uhlíku se vejdou do dutin kovové mřížky, aniž ji rozbijí. Kovová vazba zůstává, jen mřížka ztvrdne — proto jsou tyto karbidy vodivé, kovově lesklé a mimořádně tvrdé."}
];

/* --- diagonální podobnosti --- */
var DIAG = [
  {id:"limg", a:"Li", b:"Mg", jm:"Lithium — hořčík",
   duv:"Lithium je ve své skupině nejmenší a nejméně elektropozitivní, hořčík naopak. Poměr náboje k poloměru jim tedy vychází podobně.",
   spol:["Li₂CO₃ i MgCO₃ se žíháním rozkládají na oxid a CO₂ — uhličitany ostatních alkalických kovů ne.",
         "LiOH i Mg(OH)₂ jsou málo rozpustné, zatímco NaOH a KOH se rozpouštějí výborně.",
         "Lithium i hořčík hoří v dusíku na nitridy Li₃N a Mg₃N₂.",
         "LiF i MgF₂ jsou špatně rozpustné, LiCl i MgCl₂ dobře a obojí je rozpustné i v organických rozpouštědlech."]},
  {id:"beal", a:"Be", b:"Al", jm:"Beryllium — hliník",
   duv:"Beryllium má na malém iontu dva náboje, hliník na o něco větším tři. Hustota náboje na povrchu iontu vychází téměř stejná, a proto obě polarizují okolí stejně silně.",
   spol:["Oxidy BeO i Al₂O₃ jsou amfoterní — rozpouštějí se v kyselinách i v louzích.",
         "Hydroxidy Be(OH)₂ i Al(OH)₃ jsou amfoterní a v louhu dávají anionty [Be(OH)₄]²⁻ a [Al(OH)₄]⁻.",
         "Chloridy BeCl₂ i AlCl₃ jsou kovalentní, těkavé a tvoří můstkové dimery — na rozdíl od iontového MgCl₂.",
         "Oba kovy se v koncentrované kyselině dusičné pasivují a oba mají ochrannou vrstvičku oxidu.",
         "Oba tvoří karbidy, které hydrolyzují na methan: Be₂C i Al₄C₃."]},
  {id:"bsi", a:"B", b:"Si", jm:"Bor — křemík",
   duv:"Bor má tři valenční elektrony na malém atomu, křemík čtyři na větším. Elektronegativita a schopnost polarizovat vazbu jim vycházejí blízko, a hlavně: oba jsou natolik elektronegativní, že jejich kyslíkaté sloučeniny kondenzují.",
   spol:["Oxidy B₂O₃ i SiO₂ jsou kyselé, polymerní a obě látky ochotně tuhnou jako sklo — proto se dají mísit do borosilikátových skel.",
         "Kyseliny H₃BO₃ i H₄SiO₄ jsou velmi slabé a obě polykondenzují na polyboritany a polykřemičitany.",
         "Hydridy — borany B₂H₆ i silany SiH₄ — jsou samozápalné a vodou hydrolyzují, kdežto uhlovodíky jsou stálé.",
         "Halogenidy BCl₃ i SiCl₄ prudce hydrolyzují na příslušnou kyselinu a halogenovodík.",
         "Boridy i silicidy kovů jsou tvrdé, žáruvzdorné a chemicky netečné.",
         "Oba prvky jsou polokovy, oba se v elementárním stavu chovají jako polovodiče."]}
];

/* --- polovodiče: pásová data --- */
var POLOV = [
  {id:"c", jm:"Diamant (C)", pas:5.47, typ:"izolant", pop:"Zakázaný pás je tak široký, že tepelná energie elektron do vodivostního pásu nikdy nedostane."},
  {id:"si", jm:"Křemík (Si)", pas:1.12, typ:"polovodič", pop:"Ideální šířka pásu: za pokojové teploty izoluje, ale malá energie stačí na přeskok. Navíc má SiO₂ — dokonalý izolant, který na něm vyroste sám."},
  {id:"ge", jm:"Germanium (Ge)", pas:0.67, typ:"polovodič", pop:"Úzký pás znamená, že už při mírném zahřátí teče svodový proud. Proto germanium v elektronice prohrálo s křemíkem."},
  {id:"sic", jm:"Karbid křemíku (SiC)", pas:3.23, typ:"polovodič se širokým pásem", pop:"Snese vysoké teploty i napětí — proto se z něj dělají měniče pro elektromobily a fotovoltaiku."},
  {id:"bn", jm:"Nitrid boritý (kubický BN)", pas:6.4, typ:"izolant", pop:"Ještě širší pás než diamant. Izostrukturní s diamantem, ale chemicky odolnější vůči železu."},
  {id:"grafit", jm:"Grafit / grafen (C)", pas:0.0, typ:"polokov", pop:"Delokalizované elektrony π mají pásy, které se dotýkají — proto grafit vede proud, ačkoli je z téhož prvku jako diamant."}
];
