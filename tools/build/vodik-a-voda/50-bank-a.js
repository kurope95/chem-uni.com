/* ============================================================
   17 · KAPITOLOVÉ KVÍZY q0 až q4
   ============================================================ */
BANK.q0 = [
 {t:"single", q:"Proč se vodík nedá jednoznačně zařadit do 1. ani do 17. skupiny?",
  o:["Protože je to plyn a všechny ostatní prvky obou skupin jsou pevné","Protože nemá žádné neutrony","Protože má konfiguraci 1s¹ jako alkalické kovy, ale současně mu jeden elektron chybí do konfigurace helia jako halogenům","Protože jeho oxidační číslo je vždycky nula"], c:2,
  e:"Vodík má jeden valenční elektron (podobnost s&nbsp;1. skupinou) a&nbsp;zároveň mu jeden elektron chybí do uzavřené slupky (podobnost se 17. skupinou). Rozhodují ale čísla: ionizační energie 1312 kJ·mol⁻¹ je moc vysoká na kov a&nbsp;elektronová afinita 72,8 kJ·mol⁻¹ moc nízká na halogen. To, že je plyn, samo o&nbsp;sobě nic nedokazuje — fluor a&nbsp;chlor jsou také plyny."},
 {t:"single", q:"Která z&nbsp;„tří vazebných možností“ vodíku se u&nbsp;reálných sloučenin <b>neuskutečňuje</b>?",
  o:["Iontová vazba typu H⁺A⁻","Kovalentní vazba σ","Vznik hydridového aniontu H⁻","Třístředová dvouelektronová vazba"], c:0,
  e:"Kation H⁺ je holé jádro bez elektronového obalu, řádově stotisíckrát menší než Li⁺, a&nbsp;jako stabilní iont v&nbsp;mřížce existovat nemůže. Ani fluor s&nbsp;vodíkem iontovou vazbu netvoří — vzniká jen velmi polární vazba kovalentní. Zbylé tři možnosti se všechny reálně vyskytují."},
 {t:"single", q:"Jaké oxidační číslo má vodík v&nbsp;<span class=\"chem\">SiH₄</span>? Elektronegativity: H 2,20; Si 1,90.",
  o:["+I, protože křemík je kov","0, protože rozdíl je malý","−IV","−I, protože křemík je elektropozitivnější než vodík"], c:3,
  e:"Rozhoduje <b>znaménko</b> rozdílu elektronegativit: Δ<span class=\"q\">X</span> = 1,90 − 2,20 = −0,30, tedy elektronový pár formálně patří vodíku a&nbsp;ten má −I. Malý rozdíl znamená jen to, že vazba je téměř nepolární — ne že by oxidační číslo bylo nula. Křemík navíc není kov, ale polokov."},
 {t:"single", q:"Co přesně vzniká, když se ve vodném roztoku „uvolní proton“?",
  o:["Volný kation H⁺, který se pohybuje roztokem","Atom vodíku H","Oxoniový kation H₃O⁺ (a jeho větší hydratované formy)","Molekula H₂"], c:2,
  e:"Holý proton má tak obrovskou hustotu náboje, že okamžitě přitáhne volný elektronový pár molekuly vody. Vzniká proto <span class=\"chem\">H₃O⁺</span>, případně větší útvary typu <span class=\"chem\">H₉O₄⁺</span>. Zápis H⁺ v&nbsp;rovnicích je jen povolená zkratka."},
 {t:"single", q:"Ve které dvojici látek je vodík vázán <b>třístředovou dvouelektronovou vazbou</b>?",
  o:["HF a H₂O","B₂H₆ a BeH₂","NaH a CaH₂","PdH₀,₆ a TiH₂"], c:1,
  e:"Třístředová vazba vzniká v&nbsp;<b>elektronově deficitních</b> sloučeninách, kde není dost elektronů na to, aby každá dvojice atomů dostala vlastní pár — diboran a&nbsp;hydrid beryllnatý jsou učebnicové příklady. NaH a&nbsp;CaH₂ jsou iontové, PdH₀,₆ a&nbsp;TiH₂ kovové a&nbsp;v&nbsp;HF s&nbsp;H₂O jde o&nbsp;běžné dvoustředové vazby (plus mezimolekulové vodíkové můstky)."},
 {t:"multi", q:"Které vlastnosti vodíku mluví pro jeho příbuznost s&nbsp;<b>halogeny</b>?",
  o:["Tvoří dvouatomovou molekulu H₂","Má nízkou ionizační energii","Tvoří s kovy soli podobné halogenidům (NaH má strukturu NaCl)","Chybí mu jediný elektron do konfigurace nejbližšího vzácného plynu","Za extrémního tlaku přechází do kovového stavu"], c:[0,2,3],
  e:"Dvouatomová molekula, tvorba aniontu a&nbsp;solí typu NaH i&nbsp;chybějící jeden elektron do konfigurace helia jsou argumenty pro 17. skupinu. Nízká ionizační energie je naopak vlastnost kovů — a&nbsp;vodík ji <b>nemá</b>, jeho hodnota 1312 kJ·mol⁻¹ je velmi vysoká. Kovový stav za vysokého tlaku je argument pro 1. skupinu."}
];

BANK.q1 = [
 {t:"single", q:"Čím se od sebe liší protium, deuterium a&nbsp;tritium?",
  o:["Počtem neutronů v jádře","Počtem protonů v jádře","Počtem elektronů v obalu","Nábojem jádra"], c:0,
  e:"Všechny tři mají jeden proton (jinak by to nebyl vodík) i&nbsp;jeden elektron. Liší se počtem neutronů: 0, 1 a&nbsp;2. Protože chemické vlastnosti určuje obal, chovají se chemicky stejně — jen různě rychle."},
 {t:"single", q:"Proč je izotopový efekt u&nbsp;vodíku největší ze všech prvků?",
  o:["Protože vodík má nejvíc izotopů","Protože jeho izotopy mají různý náboj","Protože deuterium je dvakrát těžší než protium, což je největší relativní rozdíl hmotností mezi izotopy vůbec","Protože tritium je radioaktivní"], c:2,
  e:"Rozhoduje <b>poměr</b> hmotností, ne jejich rozdíl. U&nbsp;vodíku je D/H = 1,998, zatímco u&nbsp;uranu je ²³⁸U/²³⁵U jen 1,013. Frekvence kmitání vazby závisí na odmocnině z&nbsp;hmotnosti, takže vazba k&nbsp;deuteriu se trhá znatelně hůř — reakce může být až sedmkrát pomalejší."},
 {t:"single", q:"Jak se prakticky získává těžká voda?",
  o:["Syntézou z deuteria a kyslíku","Destilací mořské vody","Srážením z minerálních pramenů","Obohacováním přírodní vody, například elektrolýzou nebo Girdlerovým procesem"], c:3,
  e:"Deuterium se v&nbsp;přírodě vyskytuje jako drobná příměs a&nbsp;jeho podíl se jen zvyšuje. Při elektrolýze se přednostně vybíjí lehký vodík, takže deuterium zůstává v&nbsp;elektrolytu. Průmyslově se dnes používá levnější Girdlerův sulfidový proces s&nbsp;elektrolýzou jako dočištěním."},
 {t:"single", q:"Kostku obyčejného ledu (hustota 917 kg·m⁻³) vhodíme do čisté těžké vody D₂O (hustota 1104 kg·m⁻³). Co se stane?",
  o:["Klesne ke dnu","Bude plavat, a to výš než v obyčejné vodě","Bude se vznášet přesně uprostřed","Okamžitě se rozpustí a zmizí"], c:1,
  e:"Ponořená část plovoucího tělesa je dána poměrem hustot: v&nbsp;obyčejné vodě 917/997 = 0,92, v&nbsp;těžké vodě jen 917/1104 = 0,83. Kostka tedy plave a&nbsp;vyčnívá víc. Opačný pokus je slavnější — kostka ledu z&nbsp;D₂O v&nbsp;obyčejné vodě naopak <b>klesne ke dnu</b>, protože její hustota je asi 1017 kg·m⁻³."},
 {t:"single", q:"K&nbsp;čemu slouží těžká voda v&nbsp;jaderných reaktorech?",
  o:["Jako palivo","Jako chladivo, které nesmí vařit","Jako moderátor zpomalující rychlé neutrony","Jako stínění proti záření gama"], c:2,
  e:"Těžká voda neutrony zpomaluje na tepelné, ale téměř je nepohlcuje. Díky tomu mohou reaktory typu CANDU jet na <b>přírodní, neobohacený uran</b>. Obyčejná voda neutrony také zpomalí, ale část jich zachytí, a&nbsp;proto vyžaduje obohacené palivo."},
 {t:"num", q:"Tritiová trubička obsahuje na začátku 100 % tritia. Kolik procent v&nbsp;ní zbývá po 24,64 roku? Poločas tritia je 12,32 roku. (Zadejte v&nbsp;procentech.)",
  ans:25, tol:1, unit:"%",
  e:"24,64 roku jsou přesně <b>dva poločasy</b>. Po prvním zbývá 50&nbsp;%, po druhém polovina z&nbsp;toho, tedy <b>25&nbsp;%</b>. Obecně <span class=\"q\">N</span>/<span class=\"q\">N</span>₀ = (1/2)<sup><span class=\"q\">t</span>/<span class=\"q\">T</span></sup> = (1/2)² = 0,25."}
];

BANK.q2 = [
 {t:"single", q:"Proč je molekulární vodík za pokojové teploty tak málo reaktivní, i&nbsp;když s&nbsp;kyslíkem reaguje silně exotermicky?",
  o:["Protože je nejlehčí a rychle uniká","Protože je termodynamicky stabilní","Protože jeho reakce potřebují nejdřív zaplatit rozštěpení pevné vazby H–H o energii 436 kJ·mol⁻¹","Protože je nepolární"], c:2,
  e:"Jde o&nbsp;<b>kinetickou</b>, ne termodynamickou překážku: aktivační energie je vysoká, protože každá reakce musí nejdřív rozbít pevnou vazbu H–H. Termodynamicky je směs s&nbsp;kyslíkem naopak silně nestabilní — po dodání pouhých 0,017 mJ vybuchne."},
 {t:"single", q:"Který údaj o&nbsp;molekule H₂ je správný?",
  o:["Délka vazby 74,1 pm, disociační energie 436 kJ·mol⁻¹","Délka vazby 154 pm, disociační energie 348 kJ·mol⁻¹","Délka vazby 74,1 pm, disociační energie 242 kJ·mol⁻¹","Délka vazby 96 pm, disociační energie 463 kJ·mol⁻¹"], c:0,
  e:"Vazba H–H je nejkratší vazba mezi dvěma atomy vůbec (74,1 pm) a&nbsp;na jednoduchou vazbu překvapivě pevná (436 kJ·mol⁻¹). Hodnoty 154 pm a&nbsp;348 kJ·mol⁻¹ patří vazbě C–C, 242 kJ·mol⁻¹ vazbě Cl–Cl a&nbsp;96 pm s&nbsp;463 kJ·mol⁻¹ vazbě O–H ve vodě."},
 {t:"single", q:"Jaký je rovnovážný poměr ortho a&nbsp;para vodíku při pokojové teplotě?",
  o:["50 % ortho, 50 % para","25 % ortho, 75 % para","Záleží jen na tlaku","75 % ortho, 25 % para"], c:3,
  e:"Při vysoké teplotě jsou obsazené všechny rotační stavy a&nbsp;poměr se řídí jen statistickými vahami 3&nbsp;:&nbsp;1 ve prospěch ortho formy. Až při ochlazení pod zhruba 100 K začne převažovat para forma, protože smí obsadit stav s&nbsp;nulovou rotační energií; pod 20 K je jí 99,8&nbsp;%."},
 {t:"single", q:"Co je na pojmu „nascentní vodík“ dnes problematické?",
  o:["Nic, je to dodnes platné vysvětlení","Novější poznatky ho nepotvrzují — redukčně působí povrch rozpouštěného kovu, ne atomy v roztoku","Znamená to totéž co para-vodík","Týká se jen tritia"], c:1,
  e:"Starší učebnice připisovaly mimořádnou redukční schopnost atomárnímu vodíku vznikajícímu „ve stavu zrodu“. Atomární vodík na povrchu kovu skutečně vzniká, ale <b>rekombinuje tak rychle</b>, že se do roztoku prakticky nedostane. U&nbsp;zkoušky ho použijte nanejvýš jako historickou poznámku."},
 {t:"multi", q:"Které vlastnosti vodíku vyplývají přímo z&nbsp;toho, že jeho molekula je malá, lehká a&nbsp;nepolární?",
  o:["Velmi nízká teplota varu (−252,9 °C)","Vysoká disociační energie vazby","Difunduje i materiály neprostupnými pro jiné plyny","Prakticky nulová rozpustnost ve vodě","Nejširší meze výbušnosti ze všech běžných plynů"], c:[0,2,3],
  e:"Slabé mezimolekulové síly (nepolární, málo polarizovatelná molekula) dávají nízkou teplotu varu a&nbsp;nerozpustnost v&nbsp;polární vodě; malá hmotnost dává rychlou difuzi. Disociační energie je vlastnost <b>vazby uvnitř</b> molekuly, ne mezimolekulových sil, a&nbsp;meze výbušnosti závisí na reakční kinetice, ne na velikosti molekuly."},
 {t:"num", q:"Kolikrát rychleji difunduje vodík než methan? <span class=\"q\">M</span>(H₂) = 2,016, <span class=\"q\">M</span>(CH₄) = 16,04 g·mol⁻¹. (Zadejte bezrozměrný poměr.)",
  ans:2.82, tol:0.06, unit:"×",
  e:"Podle Grahamova zákona je poměr rychlostí √(16,04/2,016) = √7,956 = <b>2,82</b>. Vodík tedy uniká skoro třikrát rychleji než zemní plyn — proto se z&nbsp;plynovodů převedených na vodík ztrácí víc a&nbsp;proto se v&nbsp;uzavřených prostorách hromadí u&nbsp;stropu."}
];

BANK.q3 = [
 {t:"single", q:"V&nbsp;jakém typu reakce vystupuje elementární vodík jako <b>oxidační činidlo</b>?",
  o:["Při hoření na vodu","Při redukci oxidů kovů","Při slučování s vysoce elektropozitivními kovy za vzniku iontových hydridů","Při hydrogenaci alkenů"], c:2,
  e:"Jediný případ, kdy vodík elektron <b>přijímá</b> (0 → −I), je reakce s&nbsp;Li, Na, K, Rb, Cs, Ca, Sr a&nbsp;Ba. Ve všech ostatních uvedených reakcích jde vodík z&nbsp;0 na +I, tedy elektronovou hustotu odevzdává a&nbsp;je redukčním činidlem."},
 {t:"single", q:"Proč se wolfram vyrábí redukcí oxidu <b>vodíkem</b>, a&nbsp;ne levnějším uhlíkem?",
  o:["Protože vodík je levnější než koks","Protože s uhlíkem by vznikl karbid wolframu, ne kov","Protože uhlík s WO₃ nereaguje","Protože vodík je silnější redukční činidlo než uhlík za všech podmínek"], c:1,
  e:"Wolfram i&nbsp;molybden tvoří s&nbsp;uhlíkem velmi stabilní karbidy, takže by z&nbsp;pece vyšel WC místo kovu. Vodík má tu výhodu, že jeho jediným vedlejším produktem je voda, která odejde jako pára. Vodík rozhodně není levnější než koks — proto se jinde používá právě uhlík."},
 {t:"single", q:"Jaká je hlavní chyba v&nbsp;tvrzení „jodovodík se snadno oxiduje, protože vodík je dobré redukční činidlo“?",
  o:["Jodovodík se neoxiduje","Oxiduje se jodid I⁻ᴵ, ne vodík — ten má už +I a výš jít nemůže","Vodík v HI má oxidační číslo −I","Jodovodík je oxidační činidlo"], c:1,
  e:"Redoxní chování kovalentních hydridů patří <b>elektronegativní části molekuly</b>. V&nbsp;HI se oxiduje jodid na jod, v&nbsp;H₂S sulfid na síru. Vodík v&nbsp;obou zůstává +I. Naopak vůči silným redukovadlům se vodík z&nbsp;+I na 0 zredukovat může — třeba když sodík reaguje s&nbsp;vodou."},
 {t:"single", q:"Kolik energie se uvolní spálením jednoho kilogramu vodíku na kapalnou vodu, a&nbsp;jak se to má k&nbsp;benzinu (44 MJ·kg⁻¹)?",
  o:["44 MJ, tedy stejně","72 MJ, tedy asi 1,6× víc","240 MJ, tedy asi 5,5× víc","142 MJ, tedy asi 3,2× víc"], c:3,
  e:"Spalné teplo je 285,8 kJ·mol⁻¹ a&nbsp;molární hmotnost 2,016 g·mol⁻¹, takže 285,8/0,002016 = 141,8 MJ·kg⁻¹. To je nejvyšší hmotnostní výhřevnost ze všech paliv. Háček je v&nbsp;objemu — i&nbsp;stlačený na 70 MPa je vodík na litr sedmkrát horší než benzin."},
 {t:"single", q:"Čím se dokazuje, že v&nbsp;NaH jsou skutečně přítomny anionty H⁻?",
  o:["Tím, že je NaH bílý","Tím, že reaguje s vodou za vývoje vodíku","Elektrolýzou taveniny — vodík se vylučuje na anodě, tedy tam, kde probíhá oxidace","Tím, že má vysokou teplotu tání"], c:2,
  e:"Anoda přitahuje anionty a&nbsp;probíhá na ní oxidace. Že se tam vylučuje vodík podle <span class=\"chem\">2 H⁻ → H₂ + 2 e⁻</span>, je přímý důkaz existence aniontu. Bílá barva, vysoká teplota tání i&nbsp;reakce s&nbsp;vodou jsou jen nepřímé indicie."},
 {t:"multi", q:"Které reakce jsou příkladem <b>redukčního</b> působení elementárního vodíku?",
  o:["CuO + H₂ → Cu + H₂O","Ca + H₂ → CaH₂","N₂ + 3 H₂ ⇌ 2 NH₃","C₂H₄ + H₂ → C₂H₆","2 Na + H₂ → 2 NaH"], c:[0,2,3],
  e:"Redukční působení znamená, že vodík jde z&nbsp;0 na <b>+I</b> — to platí u&nbsp;redukce oxidu měďnatého, u&nbsp;syntézy amoniaku i&nbsp;u&nbsp;hydrogenace ethenu. Reakce s&nbsp;vápníkem a&nbsp;se sodíkem naopak vedou na hydridy, kde má vodík −I, a&nbsp;jsou tedy jediným typem jeho oxidačního působení."}
];

BANK.q4 = [
 {t:"single", q:"Proč nelze vodík připravit reakcí zinku s&nbsp;kyselinou dusičnou?",
  o:["Zinek s HNO₃ vůbec nereaguje","Kyselina dusičná je oxidující — oxidačním činidlem je dusičnan, ne H⁺, a vzniká NO nebo NO₂","Zinek se v HNO₃ pasivuje jako hliník","Vzniklý vodík by okamžitě shořel"], c:1,
  e:"Aby vznikl vodík, musí kov redukovat právě ionty <b>H⁺</b>. V&nbsp;kyselině dusičné je ale mnohem silnějším oxidovadlem dusičnanový aniont, takže se redukuje on a&nbsp;produktem je oxid dusnatý nebo dusičitý. Zinek s&nbsp;HNO₃ reaguje ochotně, jen nedává vodík."},
 {t:"single", q:"Jaká je dnes hlavní průmyslová cesta k&nbsp;vodíku?",
  o:["Elektrolýza vody z obnovitelných zdrojů","Rozklad vody teplem","Parní reforming zemního plynu s následnou konverzí vodního plynu","Zplyňování uhlí"], c:2,
  e:"Parní reforming dává zhruba 60&nbsp;% světové produkce, zplyňování uhlí kolem 19&nbsp;% a&nbsp;elektrolýza zatím pod jedno procento. Termický rozklad vody je prakticky nepoužitelný — při 2100&nbsp;°C jsou rozštěpena jen 2&nbsp;% molekul."},
 {t:"single", q:"Proč je rozklad iontového hydridu vodou <b>synproporcionací</b>?",
  o:["Protože se hydrid rozpouští","Protože voda funguje jako katalyzátor","Protože vzniká hydroxid","Protože oba atomy vzniklé molekuly H₂ přišly z různých oxidačních čísel: jeden z hydridu (−I) a jeden z vody (+I), a oba skončí na 0"], c:3,
  e:"Synproporcionace znamená, že se dvě různá oxidační čísla téhož prvku sejdou na jednom společném. Přesně to platí pro <span class=\"chem\">H⁻ + H₃O⁺ → H₂ + H₂O</span>. Prakticky z&nbsp;toho plyne, že CaH₂ dá <b>dvě</b> molekuly vodíku, ne jednu — polovinu „půjčí“ voda."},
 {t:"single", q:"Co znamená, že vodík je <b>nosič</b> energie, a&nbsp;ne její zdroj?",
  o:["Že hoří pomaleji než jiná paliva","Že se v přírodě volný nevyskytuje a energii do něj musíme nejdřív vložit","Že se dá přepravovat potrubím","Že jeho spalováním nevzniká CO₂"], c:1,
  e:"Zdroj energie se v&nbsp;přírodě nachází hotový (uhlí, ropa, sluneční záření). Vodík ne — musí se vyrobit z&nbsp;vody nebo z&nbsp;uhlovodíků, a&nbsp;to stojí víc energie, než z&nbsp;něj potom dostaneme zpátky. Funguje tedy jako baterie, ne jako palivo v&nbsp;pravém smyslu."},
 {t:"num", q:"Kolik gramů vodíku vznikne při elektrolýze vody, prošel-li obvodem náboj 96 485 C? <span class=\"q\">M</span>(H₂) = 2,016 g·mol⁻¹. (Zadejte v&nbsp;gramech.)",
  ans:1.008, tol:0.03, unit:"g",
  e:"Náboj 96 485 C je právě jeden faraday, tedy 1 mol elektronů. Na jednu molekulu H₂ jsou potřeba dva elektrony, takže vznikne 0,5 mol vodíku o&nbsp;hmotnosti 0,5 · 2,016 = <b>1,008 g</b>. Zapamatovatelné: jeden faraday dá jeden gram vodíku."},
 {t:"multi", q:"Které způsoby patří mezi <b>laboratorní přípravu</b> vodíku (ne velkovýrobu)?",
  o:["Zn + 2 HCl → ZnCl₂ + H₂","CH₄ + H₂O → CO + 3 H₂","CaH₂ + 2 H₂O → Ca(OH)₂ + 2 H₂","2 UH₃ → 2 U + 3 H₂","C + H₂O → CO + H₂"], c:[0,2,3],
  e:"Kov s&nbsp;neoxidující kyselinou, rozklad iontového hydridu vodou a&nbsp;tepelný rozklad hydridu přechodného kovu jsou typické malokapacitní postupy. Parní reforming metanu a&nbsp;zplyňování koksu jsou naopak velkokapacitní průmyslové technologie, které se v&nbsp;laboratoři nedělají."}
];
