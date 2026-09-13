/* ============================================================
   18 · KAPITOLOVÉ KVÍZY q5 až q8
   ============================================================ */
BANK.q5 = [
 {t:"single", q:"Podle čeho se hydridy klasifikují?",
  o:["Podle charakteru vazby mezi vodíkem a partnerem","Podle skupiny, ve které partner leží","Podle skupenství za laboratorní teploty","Podle toho, jestli reagují s vodou"], c:0,
  e:"Klasifikace podle vazby není formalita — umožňuje z&nbsp;ní <b>odvodit</b> skupenství, vodivost, oxidační číslo vodíku i&nbsp;chování vůči vodě. Dělení podle skupiny by rozdělilo látky, které se chovají stejně, a&nbsp;spojilo látky, které se chovají úplně jinak."},
 {t:"single", q:"Kolik molekul vodíku vznikne z&nbsp;jednoho molu CaH₂ při reakci s&nbsp;přebytkem vody?",
  o:["Jedna, protože hydrid obsahuje dva atomy vodíku","Půl molu","Tři moly","Dva moly — polovinu atomů dodá hydrid a polovinu voda"], c:3,
  e:"Rovnice je <span class=\"chem\">CaH₂ + 2 H₂O → Ca(OH)₂ + 2 H₂</span>. Každá molekula H₂ vznikne z&nbsp;<b>jednoho</b> hydridového vodíku (−I) a&nbsp;<b>jednoho</b> vodíku z&nbsp;vody (+I) — je to synproporcionace. Kdo napíše jen jednu molekulu, dostane špatnou bilanci i&nbsp;špatný výsledek výpočtu."},
 {t:"single", q:"Která vlastnost je typická pro <b>kovové</b> hydridy?",
  o:["Nestechiometrické složení a elektrická vodivost","Bílá barva a vysoká teplota tání","Nízká teplota varu a těkavost","Prudká reakce s vodou za vývoje vodíku"], c:0,
  e:"Vodík se svým orbitalem 1s zapojí do delokalizované kovové vazby, takže látka zůstane kovem: vede proud nebo je polovodič, je netěkavá a&nbsp;její složení je proměnné (PdH₀,₆). Bílá barva a&nbsp;prudká reakce s&nbsp;vodou patří iontovým hydridům, těkavost hydridům kovalentním."},
 {t:"single", q:"Proč je NaBH₄ v&nbsp;zásadité vodě stálý, zatímco LiAlH₄ s&nbsp;vodou reaguje explozivně?",
  o:["Protože sodík je méně reaktivní než lithium","Protože rozdíl elektronegativit B–H je jen 0,16, kdežto Al–H je 0,59 — vazba B–H je málo polární a hydridový vodík málo bazický","Protože NaBH₄ je v pevném stavu a LiAlH₄ kapalný","Protože bor tvoří pevnější vazby než hliník s kyslíkem"], c:1,
  e:"Rozhoduje polarita vazby ke středovému atomu. Bor má elektronegativitu 2,04, tedy skoro stejnou jako vodík (2,20), takže hydridový vodík v&nbsp;<span class=\"chem\">[BH₄]⁻</span> je málo nukleofilní a&nbsp;s&nbsp;protonem z&nbsp;vody nespěchá. U&nbsp;hliníku (1,61) je rozdíl skoro čtyřnásobný a&nbsp;hydrolýza je okamžitá."},
 {t:"single", q:"Ke které skupině hydridů patří <b>voda</b>?",
  o:["K iontovým","Ke kovovým","Ke komplexním","Ke kovalentním"], c:3,
  e:"Kyslík je nekov s&nbsp;elektronegativitou 3,44, tedy vyšší než vodík. Vazba je polární kovalentní a&nbsp;vodík má +I. Voda je vlastně nejběžnější a&nbsp;nejvýznamnější kovalentní hydrid vůbec — proto se v&nbsp;systematice probírá hned po nich."},
 {t:"multi", q:"Které dvojice látek zvládne zredukovat <b>LiAlH₄</b>, ale <b>NaBH₄</b> na ně nestačí?",
  o:["ester","aldehyd","karboxylová kyselina","keton","nitril"], c:[0,2,4],
  e:"NaBH₄ je mírné a&nbsp;selektivní činidlo — zvládne jen aldehydy a&nbsp;ketony. Estery, karboxylové kyseliny, amidy a&nbsp;nitrily vyžadují silnější LiAlH₄. Právě téhle selektivity se v&nbsp;syntéze cíleně využívá: NaBH₄ nechá ester v&nbsp;molekule nedotčený."}
];

BANK.q6 = [
 {t:"single", q:"Proč má molekula vody nenulový dipólový moment, zatímco molekula CO₂ ho má nulový?",
  o:["Protože kyslík je elektronegativnější než uhlík","Protože voda je kapalina","Protože voda má vodíkové můstky","Protože molekula vody je lomená, takže se dipóly obou vazeb nevyruší"], c:3,
  e:"Obě molekuly mají polární vazby, ale u&nbsp;lineárního CO₂ míří dipóly proti sobě a&nbsp;jejich vektorový součet je nulový. Voda je lomená pod úhlem 104,5°, takže dipóly se sčítají a&nbsp;výsledný moment je 1,85 D. Vodíkové můstky jsou <b>důsledek</b> polarity, ne její příčina."},
 {t:"single", q:"Kolik vodíkových můstků může vytvořit jedna molekula vody a&nbsp;proč právě tolik?",
  o:["Čtyři — má dva vodíky jako donory a dva volné elektronové páry jako akceptory","Dva — má dva vodíky","Jeden — má jeden volný pár","Šest — podle počtu sousedů v mřížce"], c:0,
  e:"Vodíkový můstek potřebuje současně donora (vodík s&nbsp;δ⁺) a&nbsp;akceptora (volný elektronový pár). Voda má obojí dvakrát, což je mezi hydridy unikát: amoniak má tři vodíky, ale jen jeden volný pár, fluorovodík naopak tři páry, ale jen jeden vodík."},
 {t:"single", q:"Při jaké teplotě má kapalná voda největší hustotu?",
  o:["Při 0 °C","Při 100 °C","Při 3,98 °C","Při 25 °C"], c:2,
  e:"Maximum hustoty 999,97 kg·m⁻³ leží při <b>3,98&nbsp;°C</b>. Pod touto teplotou hustota zase klesá, protože se začínají tvořit prostorné zbytky ledové struktury. Právě proto zůstává na dně zamrzajícího jezera voda o&nbsp;čtyřech stupních a&nbsp;ryby přežijí zimu."},
 {t:"single", q:"Co by se stalo, kdyby voda netvořila vodíkové můstky?",
  o:["Vřela by kolem −70 až −90 °C a na Zemi by neexistovala v kapalném stavu","Byla by hustší","Nerozpouštěla by soli, ale zůstala by kapalná","Nic podstatného, jen by rychleji mrzla"], c:0,
  e:"Extrapolace z&nbsp;řady H₂S, H₂Se a&nbsp;H₂Te dává předpověď kolem −70 až −90&nbsp;°C podle použité metody. Vodíkové můstky tedy vodě přidávají 170 až 190&nbsp;°C. Bez nich by byla voda za pozemských podmínek plyn — a&nbsp;planeta by byla suchá."},
 {t:"num", q:"O&nbsp;kolik procent naroste objem vody při zmrznutí? Hustota vody 999,97 kg·m⁻³, hustota ledu 916,7 kg·m⁻³. (Zadejte v&nbsp;procentech.)",
  ans:9.1, tol:0.4, unit:"%",
  e:"Hmotnost se nemění, takže objemy jsou v&nbsp;obráceném poměru hustot: 999,97/916,7 = 1,0908, tedy nárůst o&nbsp;<b>9,1&nbsp;%</b>. Pozor na past — pokles hustoty je jen 8,3&nbsp;%, protože se počítá z&nbsp;jiného základu. Devět procent stačí na roztržení litinové trubky, protože voda je prakticky nestlačitelná."},
 {t:"multi", q:"Které z&nbsp;uvedených vlastností vody jsou přímým důsledkem vodíkových můstků?",
  o:["Vysoká teplota varu 100 °C","Vysoká měrná tepelná kapacita 4,18 kJ·kg⁻¹·K⁻¹","Fakt, že led plave na vodě","Molární hmotnost 18,02 g·mol⁻¹","Vysoké výparné teplo 2257 kJ·kg⁻¹"], c:[0,1,2,4],
  e:"Všechny čtyři anomálie plynou z&nbsp;toho, že se molekuly musí od sebe odtrhávat proti síti vodíkových můstků — to stojí energii (teplota varu, tepelná kapacita, výparné teplo) a&nbsp;vynucuje si prostorné uspořádání v&nbsp;ledu. Molární hmotnost je prostý součet atomových hmotností a&nbsp;s&nbsp;můstky nemá nic společného."}
];

BANK.q7 = [
 {t:"single", q:"Co přesně způsobuje tvrdost vody?",
  o:["Obsah vápenatých a hořečnatých iontů","Obsah sodných a draselných solí","Nízké pH","Rozpuštěné plyny"], c:0,
  e:"Tvrdost je součet koncentrací <span class=\"chem\">Ca²⁺</span> a&nbsp;<span class=\"chem\">Mg²⁺</span>, protože právě jejich soli tvoří usazeniny. Sodné a&nbsp;draselné soli, pokud nejsou v&nbsp;extrémním množství, většině použití nevadí — jsou totiž dobře rozpustné."},
 {t:"single", q:"Kterou část tvrdosti odstraní pouhý var vody?",
  o:["Celou tvrdost","Trvalou tvrdost","Žádnou — var tvrdost naopak zvyšuje","Jen přechodnou (uhličitanovou) část"], c:3,
  e:"Varem se rozloží hydrogenuhličitany podle <span class=\"chem\">Ca(HCO₃)₂ → CaCO₃↓ + CO₂↑ + H₂O</span> a&nbsp;uhličitan se vysráží jako vodní kámen. Sírany a&nbsp;chloridy se ale rozložit nemají jak, takže trvalá tvrdost zůstane a&nbsp;po odpaření části vody se dokonce zkoncentruje."},
 {t:"single", q:"Voda obsahuje 2,00 mmol·dm⁻³ vápenatých a&nbsp;hořečnatých iontů dohromady. Kolik je to německých stupňů?",
  o:["2,0 °dH","20,0 °dH","0,36 °dH","11,2 °dH"], c:3,
  e:"Jeden německý stupeň odpovídá 10 mg CaO v&nbsp;litru, tedy 10/56,08 = 0,1783 mmol·dm⁻³. Převodní vztah je proto <b>1 mmol·dm⁻³ = 5,6&nbsp;°dH</b> a&nbsp;2,00 · 5,6 = 11,2&nbsp;°dH. Taková voda spadá do kategorie „středně tvrdá“."},
 {t:"single", q:"Jak funguje změkčování vody na ionexu v&nbsp;sodíkovém cyklu?",
  o:["Ionty Ca²⁺ a Mg²⁺ se na pryskyřici zachytí a místo nich se do vody uvolní ionty Na⁺","Vápník se na pryskyřici rozloží na oxid","Pryskyřice vodu filtruje mechanicky","Vápník se vysráží jako uhličitan"], c:0,
  e:"Je to výměna iontů podle <span class=\"chem\">Ca²⁺ + 2 NaR → CaR₂ + 2 Na⁺</span>, nikoli srážení ani filtrace. Po vyčerpání se zásoba sodíku obnoví koncentrovaným roztokem NaCl. Nevýhodou je, že do vody přechází sodík — což vadí lidem s&nbsp;dietou omezující sůl."},
 {t:"num", q:"Voda obsahuje 60,1 mg·dm⁻³ vápenatých iontů a&nbsp;žádný hořčík. Jaká je její tvrdost v&nbsp;mmol·dm⁻³? <span class=\"q\">A</span>ᵣ(Ca) = 40,08. (Zadejte na dvě desetinná místa.)",
  ans:1.50, tol:0.05, unit:"mmol·dm⁻³",
  e:"Prostý převod hmotnostní koncentrace na látkovou: 60,1 / 40,08 = <b>1,50 mmol·dm⁻³</b>. Odpovídá to 8,4&nbsp;°dH, tedy středně tvrdé vodě. Pozor, tvrdost se nikdy nepočítá z&nbsp;hmotnosti přímo — vápník a&nbsp;hořčík mají různé molární hmotnosti a&nbsp;musí se sčítat až látková množství."},
 {t:"multi", q:"Která tvrzení o&nbsp;iontovém součinu vody platí?",
  o:["Při 25 °C má hodnotu 1,0·10⁻¹⁴","S rostoucí teplotou roste, protože autoionizace je endotermická","Neutrální pH je vždy přesně 7,00 bez ohledu na teplotu","Ve 100 °C je neutrální pH kolem 6,1","Je to rovnovážná konstanta reakce 2 H₂O ⇌ H₃O⁺ + OH⁻"], c:[0,1,3,4],
  e:"Neutralita znamená <b>rovnost</b> koncentrací H₃O⁺ a&nbsp;OH⁻, ne konkrétní hodnotu pH. Protože iontový součin s&nbsp;teplotou roste, klesá neutrální pH ze 7,47 při 0&nbsp;°C na 6,13 při 100&nbsp;°C. Voda je přitom v&nbsp;obou případech dokonale neutrální."}
];

BANK.q8 = [
 {t:"single", q:"Proč může peroxid vodíku vystupovat jako oxidační i&nbsp;jako redukční činidlo?",
  o:["Protože obsahuje vodík","Protože je kapalný","Protože má nízkou molární hmotnost","Protože kyslík v něm má oxidační číslo −I, tedy prostřední hodnotu mezi 0 a −II"], c:3,
  e:"Prostřední oxidační stav znamená, že látka může jít <b>oběma směry</b>. Kyslík se může zredukovat na −II (peroxid oxiduje partnera) nebo zoxidovat na 0 (peroxid se sám oxiduje). Stejnou logiku najdete u&nbsp;siřičitanů, dusitanů nebo Fe²⁺."},
 {t:"single", q:"Jak se jmenuje děj <span class=\"chem\">2 H₂O₂ → 2 H₂O + O₂</span> z&nbsp;hlediska oxidačních čísel?",
  o:["Disproporcionace","Synproporcionace","Neutralizace","Substituce"], c:0,
  e:"Kyslík vstupuje jako −I a&nbsp;vystupuje jednak jako −II (ve vodě), jednak jako 0 (v&nbsp;kyslíku). Táž látka se tedy současně oxiduje i&nbsp;redukuje — to je definice disproporcionace. Opakem je synproporcionace, kterou jste viděli u&nbsp;rozkladu hydridů vodou."},
 {t:"single", q:"Proč manganistan draselný peroxid vodíku <b>oxiduje</b>, i&nbsp;když je peroxid sám silné oxidační činidlo (+1,776 V)?",
  o:["Protože manganistan má potenciál +2,0 V","Protože pro oxidaci peroxidu rozhoduje dvojice O₂/H₂O₂ s potenciálem jen +0,695 V, a manganistanových +1,51 V na ni stačí","Protože reakce probíhá v zásaditém prostředí","Protože peroxid je v roztoku vždy zředěný"], c:1,
  e:"Každá látka má tolik potenciálů, kolik má redoxních dvojic. Peroxid je silné oxidovadlo jako dvojice H₂O₂/H₂O (+1,776 V), ale jako <b>redukovadlo</b> ho charakterizuje dvojice O₂/H₂O₂ s&nbsp;pouhými +0,695 V. Manganistan s&nbsp;+1,51 V ji přebije, takže z&nbsp;peroxidu bublá kyslík."},
 {t:"single", q:"Jaký je tvar molekuly peroxidu vodíku?",
  o:["Lineární","Nerovinný, se dvěma skupinami O–H v různých rovinách a torzním úhlem kolem 111,5° v plynu","Rovinný a symetrický jako etylen","Tetraedrický"], c:1,
  e:"Molekula se přirovnává k&nbsp;pootevřené knize: obě skupiny O–H leží v&nbsp;rovinách, které se protínají v&nbsp;ose vazby O–O. V&nbsp;plynné fázi je torzní úhel 111,5°, v&nbsp;krystalu ho vodíkové můstky stlačí na 90,2°. Rovinné uspořádání (0° i&nbsp;180°) je energeticky nevýhodné."},
 {t:"num", q:"Kolik dm³ kyslíku za normálních podmínek uvolní 1,00 dm³ tříprocentního roztoku peroxidu vodíku o&nbsp;hustotě 1,01 g·cm⁻³? <span class=\"q\">M</span>(H₂O₂) = 34,01 g·mol⁻¹, <span class=\"q\">V</span>ₘ = 22,41 dm³·mol⁻¹.",
  ans:9.98, tol:0.3, unit:"dm³",
  e:"V&nbsp;litru je 0,0300 · 1010 = 30,3 g peroxidu, tedy 30,3/34,01 = 0,891 mol. Z&nbsp;rovnice <span class=\"chem\">2 H₂O₂ → 2 H₂O + O₂</span> vzniká půl molu kyslíku na mol peroxidu, tedy 0,4455 mol, což je <b>9,98 dm³</b>. Odtud pochází označení „10 objemových“."},
 {t:"multi", q:"Co urychluje rozklad peroxidu vodíku?",
  o:["Oxid manganičitý MnO₂","Enzym kataláza","Kyselina fosforečná jako přísada","Ultrafialové světlo","Ionty přechodných kovů, například Fe³⁺"], c:[0,1,3,4],
  e:"Rozklad urychlují katalyzátory (MnO₂, ionty přechodných kovů, jodid), enzymy, světlo, teplo, zásadité prostředí i&nbsp;drsný povrch. Kyselina fosforečná se naopak přidává jako <b>stabilizátor</b> — udržuje roztok slabě kyselý a&nbsp;váže stopy kovových iontů."}
];
