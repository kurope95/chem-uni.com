/* ============================================================
   26 · BANKY OTÁZEK — KAPITOLY 0 AŽ 4
   ============================================================ */
BANK.q0=[
 {t:"single",q:"Které prvky patří mezi <b>nepřechodné kovy</b>?",
  o:["Všechny prvky hlavních skupin včetně nekovů","Prvky bloku d se zaplněnou vrstvou d¹⁰, tedy zinek, kadmium a rtuť","Celý blok s kromě vodíku a helia a kovová část bloku p","Jen prvky skupin 1 a 2"],c:2,
  e:"Nepřechodné kovy nemají rozestavěnou vrstvu d ani f — patří sem celý blok s (bez vodíku a helia) a kovová část bloku p. Nejlákavější past je zinek a rtuť: mají sice zaplněnou vrstvu d¹⁰, ale leží ve skupině 12, tedy v bloku d."},
 {t:"single",q:"Sodík má první ionizační energii 496 a&nbsp;druhou 4562&nbsp;kJ·mol⁻¹. Co z&nbsp;toho plyne?",
  o:["Sodík tvoří výhradně kation Na⁺, protože druhý elektron by musel z uzavřené slupky","Sodík tvoří Na⁺ i Na²⁺ podle podmínek","Sodík je slabé redukční činidlo","Sodík se v přírodě vyskytuje v elementárním stavu"],c:0,
  e:"Devítinásobný skok mezi první a druhou ionizací ukazuje, že za prvním elektronem už začíná uzavřená slupka neonu. Žádná vazebná energie takový rozdíl nezaplatí, a proto má sodík vždycky oxidační číslo I. Nízká první ionizační energie naopak znamená, že je sodík velmi silné redukovadlo."},
 {t:"multi",q:"Která tvrzení o&nbsp;<b>valenční sféře nepřechodných kovů</b> platí?",
  o:["Skupina 1 má ns¹ a jediné oxidační číslo I","Skupina 14 má ns²np² a tvoří stavy IV i II","U bloku p se oba možné stavy vždy liší o dvě jednotky","Hliník má pod valenční sférou zaplněných deset orbitalů 3d"],c:[0,1,2],
  e:"První tři tvrzení jsou správná — rozdíl dvou jednotek pochází z toho, že se do vazeb buď zapojí, nebo nezapojí celý pár ns². Čtvrté je chybné: hliník je ve třetí periodě, pod jeho valenční sférou je uzavřená slupka neonu a orbitaly 2d neexistují. Právě proto se hliník od gallia liší."},
 {t:"single",q:"Proč má gallium menší atom (135&nbsp;pm) než hliník (143&nbsp;pm), přestože je o&nbsp;periodu níž?",
  o:["Protože gallium má méně elektronů","Protože gallium má vyšší teplotu tání","Protože gallium tvoří kovalentní vazby","Protože mezi nimi leží deset přechodných kovů a vrstva 3d¹⁰ stíní jádro velmi špatně"],c:3,
  e:"Během řady přechodných kovů vzrostlo protonové číslo o deset, ale přibyly jen špatně stínící elektrony d. Efektivní náboj jádra proto vzrostl a atom se stáhl — tomu se říká kontrakce bloku d. Gallium má naopak vyšší počet elektronů, ne nižší, a taje už při 29,8 °C."},
 {t:"single",q:"Prvek má ionizační energie 590, 1145, 4912 a&nbsp;6491&nbsp;kJ·mol⁻¹. Do které skupiny patří?",
  o:["Do skupiny 1","Do skupiny 2","Do skupiny 13","Do skupiny 14"],c:1,
  e:"Největší skok je mezi druhou a třetí hodnotou (4912 / 1145 = 4,3krát), takže prvek má dva valenční elektrony a patří do skupiny 2 — podle absolutních hodnot jde o vápník. Kdyby patřil do skupiny 13, přišel by skok až za třetí ionizací."},
 {t:"single",q:"Alkalické kovy jsou <b>chemicky</b> nejtypičtější kovy, ale <b>technicky</b> nepoužitelné. Čím to je?",
  o:["Mají příliš vysokou elektronegativitu","Jsou příliš drahé na těžbu","Kovová vazba je u nich nejslabší — jeden elektron na obrovský atom, proto jsou měkké a nízko tající","Nevedou elektrický proud"],c:2,
  e:"Chemická typičnost znamená nejnižší elektronegativitu a nejochotnější odevzdání elektronu. Technická použitelnost ale žádá pevnou kovovou vazbu, a ta u alkalických kovů chybí: cesium taje při 28,5 °C a všechny se dají krájet nožem. Vedou přitom výborně — problém je mechanika a reaktivita."}
];

BANK.q1=[
 {t:"single",q:"Jak se mění <b>reaktivita alkalických kovů s&nbsp;vodou</b> směrem dolů skupinou a&nbsp;proč?",
  o:["Klesá, protože roste poloměr atomu","Roste, protože klesá ionizační energie a zároveň klesá teplota tání kovu","Nemění se, všechny reagují stejně","Klesá, protože roste hustota"],c:1,
  e:"Dolů skupinou klesá ionizační energie, takže se elektron odtrhne snáz. Zároveň klesá teplota tání — draslík i cesium se teplem reakce roztaví, čímž vzroste styčná plocha a reakce se lavinovitě zrychlí. Roste tedy, nikoli klesá."},
 {t:"single",q:"Nejzápornější standardní potenciál z&nbsp;alkalických kovů má <b>lithium</b> (−3,04&nbsp;V), přestože je nejméně reaktivní s&nbsp;vodou. Proč?",
  o:["Protože má nejnižší ionizační energii","Protože je nejlehčí","Protože jeho měření je nepřesné","Protože se malý kation Li⁺ ve vodě mimořádně silně hydratuje a uvolněná hydratační energie celý děj vytáhne"],c:3,
  e:"Standardní potenciál platí pro děj ve vodném roztoku, takže do něj vstupuje i hydratace vzniklého iontu. Malý Li⁺ se hydratuje nejsilněji ze všech a to potenciál posune. Ionizační energii má lithium naopak nejvyšší ze skupiny (520 kJ·mol⁻¹)."},
 {t:"single",q:"Který produkt vznikne <b>hořením draslíku</b> v&nbsp;čistém kyslíku?",
  o:["Superoxid KO₂, ve kterém má kyslík oxidační číslo −½","Oxid K₂O","Peroxid K₂O₂","Hydroxid KOH"],c:0,
  e:"Velký kation K⁺ ustálí i objemný a jen jednou nabitý anion O₂⁻, a proto draslík hoří na superoxid. Prostý oxid dává jen lithium, peroxid sodík. Hydroxid při hoření nevznikne — k tomu je potřeba voda."},
 {t:"multi",q:"Ve kterých vlastnostech se <b>lithium podobá hořčíku</b> a&nbsp;liší se tím od ostatních alkalických kovů?",
  o:["Reaguje se vzdušným dusíkem na nitrid","Jeho uhličitan se dá tepelně rozložit","Jeho fluorid a fosforečnan jsou málo rozpustné","Hoří na peroxid"],c:[0,1,2],
  e:"První tři jsou klasické projevy úhlopříčného vztahu lithium — hořčík. Čtvrté je naopak rozdíl: lithium hoří na prostý oxid Li₂O, kdežto peroxid dává až sodík. Příčinou celé podobnosti je srovnatelný poměr náboje k poloměru obou kationtů."},
 {t:"single",q:"Co vznikne, když <b>sodík</b> reaguje s&nbsp;plynným <b>vodíkem</b> za vyšší teploty?",
  o:["Nic — sodík s vodíkem nereaguje","Hydroxid sodný a kyslík","Iontový hydrid NaH s aniontem H⁻","Kovalentní sloučenina Na—H"],c:2,
  e:"Sodík je tak elektropozitivní, že donutí i vodík přijmout elektron, a vznikne iontový hydrid s aniontem H⁻ podle rovnice 2 Na + H₂ → 2 NaH. Vodík má v něm oxidační číslo −I. Hydridový ion je silná zásada a s vodou okamžitě dává hydroxid a vodík."},
 {t:"num",q:"Do vody vhodíme 4,60&nbsp;g sodíku. Jaký objem vodíku se uvolní za normálních podmínek? (Zadejte v&nbsp;dm³ na dvě desetinná místa. M(Na) = 22,99&nbsp;g·mol⁻¹, V<sub>m</sub> = 22,41&nbsp;dm³·mol⁻¹.)",
  ans:2.24, tol:0.06, unit:"dm³",
  e:"Podle rovnice 2 Na + 2 H₂O → 2 NaOH + H₂ připadá na dva moly sodíku jeden mol vodíku. n(Na) = 4,60 / 22,99 = 0,200 mol, tedy n(H₂) = 0,100 mol a V = 0,100 · 22,41 = 2,24 dm³. Nejčastější chyba je zapomenout na dělení dvěma a vyjde dvojnásobek."}
];

BANK.q2=[
 {t:"single",q:"Co vzniká na <b>katodě</b> při elektrolýze vodného roztoku chloridu sodného?",
  o:["Vodík a hydroxidové ionty","Kovový sodík","Chlor","Kyslík"],c:0,
  e:"Standardní potenciál sodíku je −2,71 V, takže se voda redukuje mnohem snáz: 2 H₂O + 2 e⁻ → H₂ + 2 OH⁻. Kovový sodík by vznikl jen elektrolýzou taveniny, kde žádná voda není. Chlor se vylučuje na anodě, ne na katodě."},
 {t:"single",q:"Jaké je <b>oxidační číslo kyslíku</b> v&nbsp;peroxidu sodném <span class=\"chem\">Na₂O₂</span>?",
  o:["−II","0","−I","−½"],c:2,
  e:"Sodík má vždy +I, takže na dva atomy kyslíku připadá celkový náboj −2 a na jeden −I. Odpovídá to iontu O₂²⁻ s jednoduchou vazbou mezi atomy kyslíku. Hodnota −½ patří superoxidu KO₂, −II prostému oxidu."},
 {t:"single",q:"Který krok je <b>jádrem Solvayova procesu</b> — tedy důvodem, proč vůbec funguje?",
  o:["Pálení vápence na oxid vápenatý","Regenerace amoniaku vápenným mlékem","Kalcinace hydrogenuhličitanu na sodu","Nízká rozpustnost hydrogenuhličitanu sodného, který se z amoniakální solanky vysráží"],c:3,
  e:"Z přítomných solí je NaHCO₃ nejméně rozpustný, a proto se dá oddělit prostou filtrací — bez toho by proces nefungoval. Ostatní kroky jsou důležité, ale jsou to jen důsledky: kalcinace udělá z hydrogenuhličitanu sodu a regenerace vrátí amoniak zpátky do oběhu."},
 {t:"multi",q:"Která tvrzení o&nbsp;<b>chloralkalické elektrolýze</b> platí?",
  o:["Souhrnná rovnice je 2 NaCl + 2 H₂O → 2 NaOH + H₂ + Cl₂","Na anodě se vylučuje chlor","Membránová elektrolýza dává nejčistší louh při nejnižší spotřebě energie","Amalgámová elektrolýza se dnes v Evropské unii běžně staví"],c:[0,1,2],
  e:"První tři tvrzení jsou správná — membránové provedení spotřebuje asi 2,2 kWh na kilogram louhu proti 3,2 u amalgámového. Čtvrté je chybné: amalgámová technologie s rtuťovou katodou se v Evropské unii ukončila kvůli rtuti."},
 {t:"single",q:"Roztok <b>sody</b> <span class=\"chem\">Na₂CO₃</span> reaguje zásaditě. Co za to může?",
  o:["Hydrolýza kationtu Na⁺","Hydrolýza aniontu CO₃²⁻, který odtrhne z vody proton","Přítomnost volného hydroxidu sodného","Rozpouštění oxidu uhličitého ze vzduchu"],c:1,
  e:"Kationty alkalických kovů se ve vodě nehydrolyzují — jen hydratují. Zásaditou reakci způsobuje uhličitanový anion, který je konjugovanou zásadou slabé kyseliny uhličité: CO₃²⁻ + H₂O ⇌ HCO₃⁻ + OH⁻. Volný hydroxid v sodě není."},
 {t:"num",q:"Kolik kilogramů hydroxidu sodného vznikne současně s&nbsp;500&nbsp;kg chloru při chloralkalické elektrolýze? (Zadejte v&nbsp;kg, celé číslo. M(Cl₂) = 70,90, M(NaOH) = 40,00&nbsp;g·mol⁻¹.)",
  ans:564, tol:8, unit:"kg",
  e:"Podle rovnice 2 NaCl + 2 H₂O → 2 NaOH + H₂ + Cl₂ připadají na jeden mol chloru dva moly hydroxidu. n(Cl₂) = 500 000 / 70,90 = 7052 mol, tedy m(NaOH) = 2 · 7052 · 40,00 = 564 100 g = 564 kg. Nejčastější chyba je vynechat faktor dvě."}
];

BANK.q3=[
 {t:"single",q:"Proč jsou kovy skupiny 2 <b>tvrdší a&nbsp;výše tající</b> než jejich sousedi ze skupiny 1?",
  o:["Na atom připadají dva delokalizované elektrony místo jednoho, takže je kovová vazba pevnější","Mají větší atomový poloměr","Mají nižší elektronegativitu","Krystalují v jiné mřížce"],c:0,
  e:"Pevnost kovové vazby roste s počtem elektronů, které atom do elektronového oblaku odevzdá, a klesá s poloměrem. Skupina 2 dává dva elektrony a má menší atomy, takže vazba je znatelně pevnější — beryllium taje při 1287 °C proti 180,5 °C u lithia. Elektronegativitu mají naopak vyšší."},
 {t:"single",q:"Do zkumavky s&nbsp;roztokem hydroxidu sodného vhodíme piliny hořčíku a&nbsp;do druhé piliny beryllia. Co se stane?",
  o:["Rozpustí se oba kovy","Nerozpustí se ani jeden","Rozpustí se jen beryllium, protože je amfoterní","Rozpustí se jen hořčík"],c:2,
  e:"Beryllium je jediný amfoterní kov skupiny 2 — v louhu se rozpouští na tetrahydroxoberyllnatan podle rovnice Be + 2 NaOH + 2 H₂O → Na₂[Be(OH)₄] + H₂. Hořčík je příliš elektropozitivní, jeho oxid i hydroxid jsou jen zásadité, a proto se v zásadě nerozpustí."},
 {t:"multi",q:"Které vlastnosti sdílí <b>beryllium s&nbsp;hliníkem</b> v&nbsp;rámci úhlopříčného vztahu?",
  o:["Oxid i hydroxid jsou amfoterní","Kation ve vodě silně hydrolyzuje","Chlorid tvoří dimerní nebo polymerní struktury","Oba tvoří v běžných sloučeninách jednoduchý kation M²⁺"],c:[0,1,2],
  e:"První tři body jsou klasickými projevy úhlopříčné podobnosti a plynou z podobného poměru náboje k poloměru. Čtvrté tvrzení je špatně hned dvakrát: hliník tvoří kation Al³⁺, ne M²⁺, a u beryllia jednoduchý kation Be²⁺ v běžných sloučeninách vůbec nevzniká."},
 {t:"single",q:"Hořčíkový požár se nesmí hasit sněhovým hasicím přístrojem. Proč?",
  o:["Protože oxid uhličitý hořčík rozpustí","Protože by se hořčík ochladil příliš rychle a praskl","Protože oxid uhličitý s hořčíkem tvoří jedovatý plyn","Protože hořčík oxidu uhličitému odejme kyslík: 2 Mg + CO₂ → 2 MgO + C"],c:3,
  e:"Hořčík má tak vysokou afinitu ke kyslíku, že si ho vezme i z oxidu uhličitého — reakce se tedy nezastaví, ale ještě přiživí. Hasit se smí jen suchým pískem nebo speciálním práškem. Voda je ještě horší, protože z ní hořčík uvolní vodík."},
 {t:"single",q:"Jak se mění <b>rozpustnost síranů</b> ve skupině 2 směrem od hořčíku k&nbsp;baryu?",
  o:["Roste, protože roste poloměr kationtu","Klesá — síran barnatý je prakticky nerozpustný","Nemění se","Nejdřív roste a pak klesá"],c:1,
  e:"Rozpustnost síranů dolů skupinou klesá, protože se hydratační energie kationtu zmenšuje rychleji než energie mřížky s velkým aniontem SO₄²⁻. Síran barnatý má součin rozpustnosti 1,08·10⁻¹⁰. Pozor: u hydroxidů je trend opačný — ty jsou dole rozpustnější."},
 {t:"single",q:"Které barvy plamene odpovídají po řadě lithiu, vápníku a&nbsp;baryu?",
  o:["Žlutá, fialová, zelená","Fialová, zelená, karmínová","Zelená, žlutá, cihlově červená","Karmínově červená, cihlově červená, zelená"],c:3,
  e:"Lithium barví karmínově červeně, vápník cihlově (oranžově) červeně a baryum zeleně. Žlutá patří sodíku a fialová draslíku — draslík se navíc pozoruje přes kobaltové sklo, které intenzivní sodíkovou žluť pohltí."}
];

BANK.q4=[
 {t:"single",q:"Co je <b>pálené vápno</b> a&nbsp;jak vzniká?",
  o:["Hydroxid vápenatý Ca(OH)₂, vzniká reakcí vápence s vodou","Uhličitan vápenatý CaCO₃, těží se v lomu","Oxid vápenatý CaO, vzniká rozkladem vápence při 900 až 1000 °C","Síran vápenatý CaSO₄, vzniká pálením sádrovce"],c:2,
  e:"Pálené vápno je oxid vápenatý a vzniká tepelným rozkladem vápence: CaCO₃ → CaO + CO₂. Hašené vápno je až hydroxid, který z něj vznikne po zalití vodou — a to je nejčastější záměna. Vápenná voda je pak nasycený roztok tohoto hydroxidu."},
 {t:"single",q:"Voda obsahuje jen <b>hydrogenuhličitan vápenatý</b>. Jak se její tvrdost odstraní?",
  o:["Nedá se odstranit vůbec","Prostým varem — vysráží se uhličitan jako kotelní kámen","Jen iontoměničem","Přidáním kyseliny"],c:1,
  e:"Hydrogenuhličitany způsobují přechodnou tvrdost a var rovnováhu otočí: Ca(HCO₃)₂ → CaCO₃ + CO₂ + H₂O. Uhličitan se usadí jako kotelní kámen. Kdyby byl vápník vázaný na síran, šlo by o trvalou tvrdost, kterou var neodstraní."},
 {t:"single",q:"Voda obsahuje 60&nbsp;mg·dm⁻³ vápníku a&nbsp;12&nbsp;mg·dm⁻³ hořčíku. Jak je tvrdá? (M(Ca) = 40,08, M(Mg) = 24,31&nbsp;g·mol⁻¹.)",
  o:["Měkká, pod 1,25 mmol·dm⁻³","Tvrdá, mezi 2,5 a 3,75 mmol·dm⁻³","Velmi tvrdá, nad 3,75 mmol·dm⁻³","Středně tvrdá, mezi 1,25 a 2,5 mmol·dm⁻³"],c:3,
  e:"c(Ca²⁺) = 60 / 40,08 = 1,50 a c(Mg²⁺) = 12 / 24,31 = 0,49 mmol·dm⁻³, dohromady 1,99 mmol·dm⁻³, což je 11,2 °dH — středně tvrdá voda. Past je sečíst hmotnosti (72 mg) místo látkových množství; hořčík je téměř dvakrát lehčí, takže na stejnou hmotnost připadá dvakrát víc iontů."},
 {t:"multi",q:"Která tvrzení o&nbsp;<b>krasových jevech a&nbsp;kotelním kameni</b> platí?",
  o:["Obojí je táž rovnováha CaCO₃ + CO₂ + H₂O ⇌ Ca(HCO₃)₂ čtená opačným směrem","Vápenec se rozpouští, protože voda obsahuje rozpuštěný oxid uhličitý","Krápník vzniká tím, že z kapky unikne oxid uhličitý a uhličitan se vysráží","Kotelní kámen vzniká tím, že se uhličitan při zahřátí lépe rozpouští"],c:[0,1,2],
  e:"První tři body popisují tutéž rovnováhu ze tří stran. Poslední je obrácený: zahřátí posune rovnováhu doleva, takže se uhličitan naopak <b>vysráží</b> a usadí na topném tělese. Uhličitan vápenatý je ve vodě prakticky nerozpustný a horkem se to nezlepší."},
 {t:"single",q:"Který děj popisuje <b>tuhnutí vzdušné malty</b>?",
  o:["Ca(OH)₂ + CO₂ → CaCO₃ + H₂O","CaO + H₂O → Ca(OH)₂","CaCO₃ → CaO + CO₂","CaSO₄·2H₂O → CaSO₄·½H₂O + H₂O"],c:0,
  e:"Vzdušná malta tuhne tím, že hašené vápno reaguje se vzdušným oxidem uhličitým zpátky na vápenec. Protože musí oxid uhličitý do zdi prodifundovat, tvrdne malta odpovrchu a u silné zdi to trvá roky. Druhá rovnice je hašení, třetí pálení, čtvrtá výroba sádry."},
 {t:"num",q:"Kolik kilogramů páleného vápna teoreticky vznikne z&nbsp;1&nbsp;t čistého vápence? (Zadejte v&nbsp;kg, celé číslo. M(CaCO₃) = 100,09, M(CaO) = 56,08&nbsp;g·mol⁻¹.)",
  ans:560, tol:8, unit:"kg",
  e:"Rozklad CaCO₃ → CaO + CO₂ probíhá v poměru 1 : 1. n = 1 000 000 / 100,09 = 9991 mol, m(CaO) = 9991 · 56,08 = 560 300 g = 560 kg. Zbylých 440 kg odejde jako oxid uhličitý, takže hmotnostní úbytek je 44 %."}
];
