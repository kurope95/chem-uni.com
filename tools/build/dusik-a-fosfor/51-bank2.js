/* ============================================================
   26 · BANKA OTÁZEK — kapitolové mini-testy k5 až k8
   ============================================================ */

BANK.q5 = [
 {t:"single", q:"Co vzniká reakcí mědi s&nbsp;<b>koncentrovanou</b> kyselinou dusičnou?",
  o:["Vodík a dusičnan měďnatý","Dusičnan měďnatý, oxid dusičitý a voda","Oxid měďnatý a oxid dusnatý","Nic, měď se pasivuje"], c:1,
  e:"Kyselina dusičná nikdy nedává s kovem vodík, protože oxiduje dusičnanovým aniontem, ne protonem. V koncentrované kyselině klesne dusík z +V jen na +IV: Cu + 4 HNO₃ → Cu(NO₃)₂ + 2 NO₂ + 2 H₂O. Pasivují se hliník, železo a chrom, ne měď."},
 {t:"single", q:"Proč se koncentrovaná kyselina dusičná převáží v&nbsp;hliníkových cisternách?",
  o:["Hliník se v ní okamžitě pasivuje souvislou vrstvičkou oxidu","Hliník s kyselinou dusičnou nikdy nereaguje","Hliník kyselinu katalyticky rozkládá","Kyselina je v hliníku nerozpustná"], c:0,
  e:"Koncentrovaná kyselina hliník okamžitě pokryje souvislou vrstvou Al₂O₃, která ho dál chrání. Ve zředěné kyselině se ale hliník rozpouští, dokonce až za vzniku amonné soli. Stejně se v koncentrované kyselině chová železo a chrom."},
 {t:"single", q:"Jaký je poměr kyselin v&nbsp;lučavce královské a&nbsp;proč rozpouští zlato?",
  o:["1 : 1, protože se kyseliny navzájem zesilují","3 : 1 ve prospěch HNO₃, protože je silnější oxidovadlo","1 : 3 (HNO₃ : HCl); dusičnan oxiduje a chloridy odvedou zlato do komplexu","2 : 1, protože vzniká chlorid zlatitý"], c:2,
  e:"Poměr je jeden díl kyseliny dusičné na tři díly chlorovodíkové. Kyselina dusičná zlato oxiduje a chloridové ionty vzniklý kation odvedou do velmi stálého komplexu [AuCl₄]⁻; tím se koncentrace volných iontů zlata sníží a rovnováha se posune ve prospěch rozpouštění. Samotná kyselina dusičná na zlato nestačí."},
 {t:"single", q:"Jak se chovají dusitany vůči manganistanu v&nbsp;kyselém prostředí?",
  o:["Nereagují, dusitan je netečný","Jako oxidační činidlo, manganistan se redukuje na MnO₂","Jako zásada, vzniká sůl","Jako redukční činidlo, dusitan se oxiduje na dusičnan"], c:3,
  e:"Dusík má v dusitanu prostřední oxidační číslo +III, takže může jít oběma směry. Proti silnému oxidovadlu se chová jako redukovadlo a jde nahoru na +V: 5 NaNO₂ + 2 KMnO₄ + 3 H₂SO₄ → 5 NaNO₃ + 2 MnSO₄ + K₂SO₄ + 3 H₂O. Proti jodidu by se naopak choval jako oxidovadlo."},
 {t:"multi", q:"Které kroky patří do <b>Ostwaldova procesu</b> výroby kyseliny dusičné?",
  o:["Katalytické spalování amoniaku na oxid dusnatý na síťce Pt–Rh","Přímá syntéza oxidu dusnatého z dusíku a kyslíku v elektrickém oblouku","Oxidace oxidu dusnatého vzdušným kyslíkem na oxid dusičitý","Absorpce oxidu dusičitého ve vodě za vzniku kyseliny dusičné a oxidu dusnatého"], c:[0,2,3],
  e:"Ostwaldův proces má tři kroky: spalování amoniaku, oxidaci NO na NO₂ a absorpci ve vodě, při které se část dusíku vrací jako NO zpátky do kolony. Přímá syntéza NO z prvků obloukem je Birkelandův–Eydeho proces, který se pro obrovskou spotřebu elektřiny opustil."},
 {t:"single", q:"Proč se z&nbsp;kyseliny dusičné nikdy neuvolní s&nbsp;kovem vodík?",
  o:["Oxidačním činidlem je dusičnanový anion, který se redukuje snáz než proton","Protože je kyselina dusičná slabá kyselina","Protože vodík okamžitě zreaguje na vodu","Protože jsou všechny kovy vůči ní pasivní"], c:0,
  e:"Aby vznikl vodík, musel by se zredukovat proton. Dusičnanový anion je ale mnohem lepší oxidovadlo, takže se zredukuje on — na NO₂, NO, N₂O nebo až na amonný kation. Kyselina dusičná je přitom velmi silná, takže druhá možnost neplatí, a pasivují se jen některé kovy."}
];

BANK.q6 = [
 {t:"single", q:"Jakou strukturu má molekula <span class=\"chem\">P₄O₁₀</span>?",
  o:["Lineární řetězec střídajících se atomů P a O","Plochý kruh se šesti atomy","Dva samostatné tetraedry PO₄","Klec odvozená od tetraedru P₄ se šesti můstkovými a čtyřmi koncovými kyslíky"], c:3,
  e:"Vezměte tetraedr P₄, do každé z šesti hran vsuňte kyslík (vznikne P₄O₆) a na každý fosfor přidejte ještě jeden koncový kyslík vázaný násobnou vazbou. Zápis P₂O₅ je jen stechiometrický vzorec; skutečná molekula je dvojnásobná."},
 {t:"single", q:"Proč se <span class=\"chem\">P₄O₁₀</span> používá jako sušidlo?",
  o:["Protože je hygroskopický jen mírně a vodu snadno zase uvolní","Protože má tak velkou afinitu k vodě, že ji vytrhne i z jiných látek","Protože se rozpouští ve všech organických rozpouštědlech","Protože katalyzuje rozklad vody na vodík a kyslík"], c:1,
  e:"Afinita oxidu fosforečného k vodě je mimořádná — z kyseliny sírové udělá oxid sírový, z kyseliny dusičné oxid dusičný a z amidů nitrily. Proto je to nejúčinnější běžné sušidlo a zároveň dehydratační činidlo. Vodu naopak neuvolňuje, váže ji na kyselinu fosforečnou."},
 {t:"single", q:"Jaký tvar má molekula <span class=\"chem\">PCl₅</span> v&nbsp;plynné fázi?",
  o:["Pravidelný tetraedr","Čtvercová pyramida","Trigonální bipyramida","Oktaedr"], c:2,
  e:"Pět vazebných párů kolem fosforu se uspořádá do trigonální bipyramidy: tři chlory v rovníkové rovině a dva v axiálních polohách kolmo na ni. Axiální vazby jsou o něco delší. V pevném stavu se molekuly přeuspořádají na ionty PCl₄⁺ a PCl₆⁻, kde má fosfor koordinaci tetraedrickou a oktaedrickou."},
 {t:"single", q:"Co vznikne hydrolýzou <span class=\"chem\">PCl₅</span> v&nbsp;<b>nadbytku</b> vody?",
  o:["Kyselina fosforečná a chlorovodík","Kyselina fosforitá a chlorovodík","Chlorid-oxid fosforečný a chlorovodík","Oxid fosforečný a chlor"], c:0,
  e:"PCl₅ + 4 H₂O → H₃PO₄ + 5 HCl. Oxidační číslo fosforu +V se hydrolýzou nemění, mění se jen partner. Kyselina fosforitá by vznikla z PCl₃, kde má fosfor +III, a POCl₃ je mezistupeň, u kterého se hydrolýza zastaví při nedostatku vody."},
 {t:"single", q:"Proč neexistuje <span class=\"chem\">PI₅</span>, i&nbsp;když <span class=\"chem\">PF₅</span> a&nbsp;<span class=\"chem\">PCl₅</span> ano?",
  o:["Jod netvoří s fosforem žádné sloučeniny","Jodid je příliš velký a zároveň se snadno oxiduje, takže by vznikl PI₃ a jod","Fosfor nedokáže vázat pět stejných atomů","Sloučenina PI₅ existuje, jen je vzácná"], c:1,
  e:"Vysoký oxidační stav se daří s malými a silně elektronegativními partnery. Pět velkých jodidových aniontů se kolem fosforu prostorově nevejde a jodid je navíc dost snadno oxidovatelný, takže by se z něj vyloučil elementární jod. Proto řada končí u PBr₅, které už také vzniká jen obtížně."},
 {t:"multi", q:"Které z uvedených tvrzení o&nbsp;fosfidech <b>platí</b>?",
  o:["Fosfor v nich má oxidační číslo −III","Fosfidy elektropozitivních kovů se vodou hydrolyzují na fosfan","Všechny fosfidy jsou ve vodě rozpustné soli","Fosfid hlinitý se používá k plynování skladů obilí"], c:[0,1,3],
  e:"Fosfidy obsahují fosfor v nejnižším oxidačním stavu −III a fosfidy elektropozitivních kovů se vodou rozkládají na jedovatý fosfan — právě toho se využívá v rodenticidech i při plynování skladů. Fosfidy přechodných kovů mají naopak převážně kovový charakter vazeb a vodě odolávají, takže třetí tvrzení neplatí."}
];

BANK.q7 = [
 {t:"single", q:"Kolikasytná je kyselina fosforitá <span class=\"chem\">H₃PO₃</span>?",
  o:["Jednosytná","Dvojsytná","Trojsytná","Čtyřsytná"], c:1,
  e:"Ve strukturním vzorci sedí dva vodíky na kyslících a jeden přímo na fosforu. Odštěpit lze jen ty na kyslíku, takže je kyselina dvojsytná a tvoří dvě řady solí. Odpověď „trojsytná“ je nejčastější chyba — počítá vodíky ze sumárního vzorce místo skupin OH."},
 {t:"single", q:"Proč kyselina fosforečná neoxiduje, přestože je v&nbsp;ní fosfor v&nbsp;nejvyšším oxidačním stavu?",
  o:["Protože je to slabá kyselina","Protože fosfor v +V drží čtyři pevné vazby na kyslík a nižší stavy jsou pro něj málo dostupné","Protože je vždycky zředěná","Protože fosfor nemá nižší oxidační stavy"], c:1,
  e:"Rozhoduje pevnost vazeb v tetraedru PO₄ a špatná dostupnost nižších stavů fosforu. U dusíku leží nižší stavy hned vedle a jejich oxidy jsou plynné, takže odcházejí ze soustavy a ženou reakci dopředu. Fosfor nižší stavy má (+III, +I, −III), jen se k nim nedostane snadno."},
 {t:"single", q:"Které soli kyseliny fosforečné jsou <b>nejhůř</b> rozpustné ve vodě?",
  o:["Dihydrogenfosforečnany H₂PO₄⁻","Hydrogenfosforečnany HPO₄²⁻","Fosforečnany PO₄³⁻","Rozpustnost je u všech tří řad stejná"], c:2,
  e:"Fosforečnany s aniontem PO₄³⁻ jsou až na alkalické kovy a amonnou sůl nerozpustné; právě proto je fosfor v přírodě uzamčený v apatitu. Hydrogenfosforečnany a zejména dihydrogenfosforečnany jsou rozpustnější — a na tom stojí celá výroba fosforečných hnojiv."},
 {t:"single", q:"Co je chemickou podstatou výroby superfosfátu?",
  o:["Redukce fosforečnanu na elementární fosfor","Oxidace fosforu z +III na +V","Neutralizace kyseliny fosforečné vápnem","Převedení nerozpustného fosforečnanu na rozpustnější dihydrogenfosforečnan"], c:3,
  e:"Ca₃(PO₄)₂ + 2 H₂SO₄ → Ca(H₂PO₄)₂ + 2 CaSO₄. Oxidační číslo fosforu zůstává +V, nejde tedy o redoxní děj — mění se jen rozpustnost, aby rostlina fosfor dokázala přijmout. To je nejčastější past u téhle otázky."},
 {t:"num", q:"Kolik kilogramů močoviny <span class=\"chem\">CO(NH₂)₂</span> je potřeba na hektar, aby se dodalo 150 kg dusíku? Obsah dusíku v&nbsp;močovině je 46,6 %. (Zadejte v&nbsp;kg.)",
  ans:322, tol:8, unit:"kg",
  e:"m = 150 / 0,466 = 322 kg·ha⁻¹. Kdo dělí obsahem dusíku špatně (tedy násobí místo dělí), dostane 70 kg, což je zjevný nesmysl — hnojiva musí být vždycky víc než čistého dusíku. Pro srovnání, dusičnanu amonného s 35,0 % dusíku by bylo potřeba 429 kg."},
 {t:"multi", q:"Které z uvedených tvrzení o&nbsp;kyselině fosforné <span class=\"chem\">H₃PO₂</span> <b>platí</b>?",
  o:["Fosfor v ní má oxidační číslo +I","Je jednosytná, protože jen jeden vodík sedí na kyslíku","Je to velmi silné redukční činidlo","Je to nejsilnější kyselina z celé řady kyselin fosforu, protože má nejvyšší oxidační číslo"], c:[0,1,2],
  e:"Tři vodíky dávají +III, dva kyslíky −IV, takže fosfor má +I; dva z těch vodíků sedí přímo na fosforu, proto je kyselina jednosytná. Nízký oxidační stav dělá z kyseliny mimořádně silné redukovadlo, které sráží stříbro i nikl z roztoků. Poslední tvrzení si protiřečí — kyselina fosforná má naopak oxidační číslo nejnižší."}
];

BANK.q8 = [
 {t:"single", q:"Jak se mění charakter oxidů prvků skupiny 15 směrem dolů?",
  o:["Ze zásaditých na kyselé","Zůstává stejný, všechny jsou kyselé","Z kyselých přes amfoterní na zásadité","Všechny oxidy skupiny 15 jsou amfoterní"], c:2,
  e:"N₂O₅ a P₄O₁₀ jsou silně kyselé, As₂O₃ a Sb₂O₃ amfoterní a Bi₂O₃ zásaditý. Trend kopíruje klesající elektronegativitu a rostoucí kovový charakter prvku. Chování oxidu je proto dobrým vodítkem, kam prvek v řadě nekov–polokov–kov patří."},
 {t:"single", q:"Co je efekt inertního páru?",
  o:["Pár elektronů ns² se u těžkých prvků vazby přestává účastnit, takže je stálý stav o dvě nižší","Volný elektronový pár u lehkých prvků nereaguje s kyselinami","Elektrony v orbitalu p jsou u těžkých prvků inertní","Dvojice atomů v molekule na sebe nepůsobí"], c:0,
  e:"U těžkých prvků bloku p se pár ns² díky relativistickému smrštění orbitalu s a špatnému stínění orbitaly d a f drží tak pevně, že se vazby neúčastní. Prvek proto odevzdá jen tři elektrony z orbitalů p a zůstane v +III. Ve skupině 15 to nejlíp vidíme u bismutu, ve skupině 14 u olova."},
 {t:"single", q:"Proč je bismutečnan sodný <span class=\"chem\">NaBiO₃</span> tak silné oxidační činidlo?",
  o:["Protože je sodík velmi elektropozitivní","Protože obsahuje kyslík v peroxidové formě","Protože je bismut v nestálém stavu +V a snaží se dostat na stálejší +III","Protože je ve vodě velmi dobře rozpustný"], c:2,
  e:"Kvůli efektu inertního páru je u bismutu stálý stav +III, takže se látka s bismutem v +V snaží co nejrychleji přijmout dva elektrony. Je tak dravá, že v kyselém prostředí převede manganaté ionty až na fialový manganistan — což je reakce, na kterou většina oxidovadel nestačí."},
 {t:"single", q:"Jak se mění stálost hydridů <span class=\"chem\">EH₃</span> směrem dolů skupinou 15?",
  o:["Roste, protože roste atom","Nemění se","Nejdřív klesá a pak roste","Klesá, protože vazba E—H s rostoucím atomem slábne"], c:3,
  e:"Amoniak je velmi stálý, fosfan už méně, arsan se rozkládá nad 250 °C, stiban už mírným zahřátím a bismutan existuje jen stopově. Důvod je zhoršující se překryv orbitalů s rostoucím atomem. Nestálosti arsanu se využívá v Marshově zkoušce na arsen."},
 {t:"multi", q:"Které z uvedených tvrzení o&nbsp;prvcích skupiny 15 <b>platí</b>?",
  o:["Dusík a fosfor jsou nekovy, arsen a antimon polokovy a bismut kov","Elektronegativita roste směrem dolů skupinou","Ionizační energie klesá směrem dolů skupinou","Vazebný úhel v hydridech EH₃ se směrem dolů blíží 90°"], c:[0,2,3],
  e:"Dolů skupinou roste poloměr atomu, klesá ionizační energie i elektronegativita a roste kovový charakter. Vazebný úhel v hydridech klesá ze 106,7° u amoniaku až k 90°, protože se hybridizace vytrácí a vazby tvoří skoro čisté orbitaly p. Elektronegativita tedy neroste, ale klesá."},
 {t:"single", q:"Který z prvků skupiny 15 je prakticky <b>netoxický</b>?",
  o:["Arsen","Bismut","Antimon","Bílý fosfor"], c:1,
  e:"Bismut je mezi těžkými kovy neobvyklý tím, že je prakticky netoxický — proto se používá v léčivech na žaludeční potíže a jako náhrada olova v pájkách i brocích. Arsen a antimon jsou naopak jedovaté a bílý fosfor patří k nejjedovatějším anorganickým látkám vůbec."}
];
