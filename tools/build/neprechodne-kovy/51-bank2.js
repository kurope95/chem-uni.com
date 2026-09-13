/* ============================================================
   27 · BANKY OTÁZEK — KAPITOLY 5 AŽ 8
   ============================================================ */
BANK.q5=[
 {t:"single",q:"Hliník má standardní potenciál −1,66&nbsp;V, a&nbsp;přesto s&nbsp;vodou nereaguje. Proč?",
  o:["Protože je ušlechtilý kov","Protože se okamžitě pokryje souvislou nepropustnou vrstvičkou Al₂O₃","Protože má příliš vysokou teplotu tání","Protože voda hliník nesmáčí"],c:1,
  e:"Hliník patří naopak k nejneušlechtilejším technickým kovům — chrání ho jen oxidová vrstvička silná několik nanometrů, která je souvislá a pevně lpí. Když ji smyjete louhem nebo zničíte amalgamací, hliník s vodou reaguje okamžitě. Rez se takhle nechová, protože popraská a odloupne se."},
 {t:"single",q:"Co vznikne, když hliník vhodíme do <b>roztoku hydroxidu sodného</b>?",
  o:["Nic, reakce neprobíhá","Kovový sodík a oxid hlinitý","Al(OH)₃ jako sraženina","Tetrahydroxohlinitan sodný a vodík"],c:3,
  e:"Hliník je amfoterní, takže se v zásadě rozpouští podle rovnice 2 Al + 2 NaOH + 6 H₂O → 2 Na[Al(OH)₄] + 3 H₂. Sraženina Al(OH)₃ by vznikla v neutrální oblasti kolem pH 6 až 8, v silném louhu se rozpustí na hlinitan. Kovový sodík takhle nikdy nevznikne."},
 {t:"single",q:"Proč se hliník <b>nedá vyrobit redukcí uhlíkem</b>, jako se vyrábí železo?",
  o:["Oxid hlinitý je tak stálý, že by byla potřeba teplota nad 2000 °C, při které by hliník tvořil karbid","Protože hliník s uhlíkem nereaguje vůbec","Protože oxid hlinitý není redukovatelný žádnou látkou","Protože je uhlík dražší než elektřina"],c:0,
  e:"Slučovací entalpie oxidu hlinitého je −1676 kJ·mol⁻¹, což je mimořádně stálá sloučenina. Potřebná teplota by přesáhla 2000 °C a při ní by hliník okamžitě zreagoval na karbid Al₄C₃. Proto se musí jít cestou tavné elektrolýzy — a proto byl hliník do roku 1886 vzácnější než stříbro."},
 {t:"multi",q:"Která tvrzení o&nbsp;<b>výrobě hliníku</b> platí?",
  o:["Bayerův postup využívá amfoterity: louh rozpustí Al₂O₃, ale oxid železitý nechá ležet","Kryolit snižuje teplotu tání oxidu hlinitého z 2072 °C zhruba na 960 °C","Uhlíková anoda se při elektrolýze spotřebovává na oxid uhličitý","Elektrolýza probíhá ve vodném roztoku síranu hlinitého"],c:[0,1,2],
  e:"První tři body popisují skutečný postup. Poslední je chybné: ve vodném roztoku by se místo hliníku redukovala voda, protože potenciál hliníku je −1,66 V. Elektrolýza proto musí běžet v tavenině, a právě kvůli tomu je tak energeticky náročná."},
 {t:"single",q:"Roztok kamence <span class=\"chem\">KAl(SO₄)₂·12H₂O</span> reaguje <b>kysele</b>, přestože neobsahuje žádnou kyselinu. Čím to je?",
  o:["Rozpouštěním oxidu uhličitého ze vzduchu","Hydrolýzou síranového aniontu","Hydrolýzou hexaaquahlinitého kationtu, který odštěpuje protony","Hydrolýzou draselného kationtu"],c:2,
  e:"Ion Al³⁺ má malý poloměr a trojnásobný náboj, takže molekuly vody ve své hydratační sféře polarizuje natolik, že z nich odchází proton: [Al(H₂O)₆]³⁺ + H₂O ⇌ [Al(OH)(H₂O)₅]²⁺ + H₃O⁺. Draselný kation se nehydrolyzuje vůbec a síranový anion je konjugovanou zásadou silné kyseliny."},
 {t:"num",q:"Kolik coulombů náboje je teoreticky potřeba na výrobu 100&nbsp;kg hliníku tavnou elektrolýzou? (Zadejte v&nbsp;GC, tedy miliardách coulombů, na jedno desetinné místo. M(Al) = 26,98&nbsp;g·mol⁻¹, F = 96&nbsp;485&nbsp;C·mol⁻¹.)",
  ans:1.07, tol:0.04, unit:"GC",
  e:"Katodový děj Al³⁺ + 3 e⁻ → Al znamená z = 3. n(Al) = 100 000 / 26,98 = 3706 mol, Q = 3706 · 3 · 96 485 = 1,073·10⁹ C, tedy 1,07 GC. Nejčastější chybou je vynechat trojku a dostat třetinu."}
];

BANK.q6=[
 {t:"single",q:"Co přesně znamená <b>efekt inertního páru</b>?",
  o:["Pár elektronů ns² se u těžších prvků bloku p nezapojuje do vazeb, takže převládá oxidační číslo o dvě jednotky nižší","Elektrony ns² z atomu zmizí","Prvek ztratí schopnost tvořit jakékoli vazby","Pár elektronů se přesune do orbitalů d"],c:0,
  e:"Elektrony nikam nemizí — jen zůstávají na atomu jako volný elektronový pár, který se stereochemicky projeví (molekula SnCl₂ je proto lomená, ne lineární). Oxidační číslo je pak nižší přesně o dvě jednotky, protože jde o dva elektrony."},
 {t:"single",q:"Které oxidační číslo převládá u&nbsp;<b>thallia</b> a&nbsp;které u&nbsp;<b>india</b>?",
  o:["Obě mají III","Thallium III, indium I","Thallium I, indium III","Obě mají I"],c:2,
  e:"Indium je v páté periodě, kde efekt inertního páru ještě nevyhrává, a proto tvoří hlavně In(III). Thallium je v šesté periodě a pár 6s² si nechává — převládá u něj Tl(I), kdežto Tl³⁺ je silné oxidovadlo s potenciálem +1,25 V."},
 {t:"multi",q:"Které dvě příčiny se na efektu inertního páru <b>sčítají</b>?",
  o:["Relativistická kontrakce orbitalu s, která ztíží odtržení páru ns²","Klesající energie vazeb směrem dolů ve skupině","Rostoucí elektronegativita směrem dolů ve skupině","Zmenšování atomového poloměru směrem dolů ve skupině"],c:[0,1],
  e:"Ionizace páru dolů skupinou nezlevní tak, jak by měla (relativistická kontrakce), a zároveň dvě vazby navíc vynesou méně (slabší překryv orbitalů). U přechodu od cínu k olovu to dohromady dělá zhruba 449 kJ·mol⁻¹ proti stavu IV. Poloměr atomu dolů skupinou naopak roste."},
 {t:"single",q:"Součet třetí a&nbsp;čtvrté ionizační energie je u&nbsp;cínu 6873 a&nbsp;u&nbsp;olova 7165&nbsp;kJ·mol⁻¹. Co je na tom pozoruhodné?",
  o:["Nic — hodnoty jsou v souladu s očekáváním","Rozdíl je zanedbatelný","Olovo má vyšší hodnotu, přestože je níž ve skupině a má větší atom — to odporuje běžnému trendu","Cín má vyšší hodnotu, což vysvětluje jeho stav II"],c:2,
  e:"Ionizační energie by měla dolů skupinou klesat, protože je elektron dál od jádra. U olova ale o 292 kJ·mol⁻¹ vzroste, a to je právě otisk relativistické kontrakce orbitalu 6s. Spolu se slabšími vazbami je to důvod, proč u olova převládá stav II."},
 {t:"single",q:"Proč <b>neexistují</b> sloučeniny <span class=\"chem\">PbBr₄</span> a&nbsp;<span class=\"chem\">PbI₄</span>?",
  o:["Protože olovo nemá dost valenčních elektronů","Protože jsou bromid a jodid příliš velké","Protože by měly příliš vysokou teplotu tání","Protože Pb(IV) je silné oxidovadlo a bromid i jodid by okamžitě zoxidoval na halogen"],c:3,
  e:"Olovo se ze stavu IV snaží zpátky na stav II, takže se chová jako oxidovadlo. Bromid a jodid se oxidují snadno, a proto by rovnou vznikl PbBr₂ + Br₂. Stálý je jen PbF₄, protože fluorid se oxiduje nejhůř ze všech; PbCl₄ existuje, ale nad 50 °C se rozkládá."},
 {t:"single",q:"Ve skupině 15 se inertní pár projeví také. Jak se bude chovat <b>bismutičnan sodný</b> <span class=\"chem\">NaBiO₃</span>?",
  o:["Jako mimořádně silné oxidovadlo, protože Bi(V) je velmi nestálý","Jako silné redukovadlo","Jako netečná stálá sůl","Jako zásada"],c:0,
  e:"Ve skupině 15 jsou možné stavy V a III a u bismutu je stav V extrémně nestálý. Bismut se z něj chce co nejrychleji dostat na III, a proto je bismutičnan jedno z nejsilnějších oxidovadel v analytické chemii — v kyselém prostředí zoxiduje manganatý ion až na manganistan."}
];

BANK.q7=[
 {t:"single",q:"Který oxidační stav je stálejší u&nbsp;cínu a&nbsp;který u&nbsp;olova?",
  o:["U obou stav II","U obou stav IV","U cínu stav IV, u olova stav II","U cínu stav II, u olova stav IV"],c:2,
  e:"Cín je v páté periodě, kde ještě vyhrává vyšší stav, a proto je u něj stálejší Sn(IV) — i když je Sn(II) běžné. Olovo je v šesté periodě, pár 6s² si nechává, a proto u něj jednoznačně převládá Pb(II). Odtud plyne, že Sn²⁺ je redukovadlo a PbO₂ oxidovadlo."},
 {t:"single",q:"Seřaďte oxidy <span class=\"chem\">SnO</span>, <span class=\"chem\">SnO₂</span>, <span class=\"chem\">PbO</span>, <span class=\"chem\">PbO₂</span> od <b>nejzásaditějšího</b>.",
  o:["PbO > SnO > PbO₂ > SnO₂","SnO₂ > PbO₂ > SnO > PbO","PbO₂ > SnO₂ > PbO > SnO","SnO > PbO > SnO₂ > PbO₂"],c:0,
  e:"Platí pravidlo: bazicita roste s klesajícím oxidačním číslem a s rostoucím poloměrem kationtu. Nejzásaditější je proto PbO (nižší stav, větší kation) a nejkyselejší SnO₂ (vyšší stav, menší kation). Všechny čtyři jsou přitom amfoterní — liší se jen tím, na kterou stranu se přiklánějí."},
 {t:"single",q:"Co se stane, když ke <b>chloridu cínatému</b> přidáme <b>chlorid železitý</b>?",
  o:["Reakce neprobíhá","Vysráží se kovový cín","Vznikne podvojná sůl","Cín se zoxiduje na SnCl₄ a železo se zredukuje na FeCl₂"],c:3,
  e:"Cínatý ion je redukovadlo, protože se chce dostat do stálejšího stavu IV: SnCl₂ + 2 FeCl₃ → SnCl₄ + 2 FeCl₂. Pár Sn⁴⁺/Sn²⁺ leží na +0,15 V, pár Fe³⁺/Fe²⁺ na +0,77 V, takže reakce běží tímto směrem. S olovnatou solí by se nestalo nic."},
 {t:"multi",q:"Která tvrzení o&nbsp;<b>olověném akumulátoru</b> platí?",
  o:["Napětí jednoho článku je 2,05 V, autobaterie má šest článků","Při vybíjení vzniká na obou elektrodách nerozpustný síran olovnatý","Hustota elektrolytu při vybíjení klesá, protože se kyselina spotřebovává","Při vybíjení se olovo rozpouští do elektrolytu jako Pb²⁺"],c:[0,1,2],
  e:"První tři body jsou správné a souvisejí spolu: kyselina se spotřebuje na síran, takže hustota klesá z 1,28 na zhruba 1,10 g·cm⁻³. Poslední je chybné a je to zásadní bod — kdyby se olovo rozpouštělo, produkt by odplaval a baterie by po jednom vybití skončila. Síran zůstává přilepený, a proto se dá nabít."},
 {t:"single",q:"Co obsahuje <b>suřík</b> <span class=\"chem\">Pb₃O₄</span>?",
  o:["Olovo v oxidačním čísle 8/3","Olovo ve dvou různých stavech — dva atomy jako Pb(II) a jeden jako Pb(IV)","Jen olovo v oxidačním čísle IV","Směs kovového olova a oxidu olovičitého"],c:1,
  e:"Suřík je oxid olovnato-olovičitý a dá se psát i jako 2 PbO·PbO₂. Zlomkové oxidační číslo 8/3 je jen formální průměr, ne skutečný stav jednotlivých atomů. Používal se v antikorozních nátěrech ocelových konstrukcí, dnes ustupuje kvůli toxicitě olova."},
 {t:"num",q:"Autobaterie má kapacitu 45&nbsp;A·h. Kolik gramů kyseliny sírové se spotřebuje při úplném vybití? (Zadejte v&nbsp;g, celé číslo. M(H₂SO₄) = 98,08&nbsp;g·mol⁻¹, F = 96&nbsp;485&nbsp;C·mol⁻¹.)",
  ans:165, tol:5, unit:"g",
  e:"Q = 45 · 3600 = 162 000 C, n(e⁻) = 162 000 / 96 485 = 1,679 mol. Podle rovnice Pb + PbO₂ + 2 H₂SO₄ → 2 PbSO₄ + 2 H₂O připadají na dva elektrony dva moly kyseliny, tedy poměr 1 : 1. m = 1,679 · 98,08 = 165 g."}
];

BANK.q8=[
 {t:"single",q:"Kde je vyšší koncentrace <b>sodíku</b> a&nbsp;kde <b>draslíku</b>?",
  o:["Oba jsou hlavně uvnitř buňky","Sodík vně buňky (142 mmol·dm⁻³), draslík uvnitř (140 mmol·dm⁻³)","Sodík uvnitř, draslík vně","Oba jsou hlavně vně buňky"],c:1,
  e:"Sodík je hlavní kation mimobuněčné tekutiny, draslík nitrobuněčné. Pomůcka: sodík je v moři a v krvi, draslík v bramborách a banánech. Právě proto je hladina draslíku v krvi tak citlivá — v plazmě ho je jen 4,2 mmol·dm⁻³, takže i malý únik z buněk ji zdvojnásobí."},
 {t:"single",q:"V&nbsp;jakém poměru přenáší <b>sodíko-draslíková pumpa</b> ionty a&nbsp;proč na tom záleží?",
  o:["Dva Na⁺ ven a dva K⁺ dovnitř, poměr je vyrovnaný","Jeden Na⁺ ven a jeden K⁺ dovnitř","Dva Na⁺ ven a tři K⁺ dovnitř, uvnitř je proto kladně","Tři Na⁺ ven a dva K⁺ dovnitř, takže s každým cyklem odejde jeden kladný náboj"],c:3,
  e:"Nevyrovnaný poměr 3 : 2 je právě to, co dělá membránu nabitou — s každým cyklem odejde jeden kladný náboj a uvnitř zůstává zápornější prostředí. Pumpa přitom spotřebuje jednu molekulu ATP. Vyrovnaný poměr by potenciál nevytvořil."},
 {t:"single",q:"V&nbsp;jaké formě je uloženo 99&nbsp;% vápníku v&nbsp;lidském těle?",
  o:["Jako uhličitan vápenatý v kostech","Jako volný Ca²⁺ v krevní plazmě","Jako hydroxyapatit Ca₅(PO₄)₃OH v kostech a zubech","Jako síran vápenatý ve svalech"],c:2,
  e:"Kost je kompozit: hydroxyapatit dodává tvrdost a kolagenová vlákna pružnost. Zbylé jedno procento vápníku je ale funkčně nejdůležitější — spouští svalový stah, uvolnění neuropřenašeče a srážení krve. Nahrazením hydroxidu fluoridem vzniká odolnější fluorapatit, o který jde při fluoridaci zubů."},
 {t:"multi",q:"Které role plní v&nbsp;organismu <b>hořčík</b>?",
  o:["Je středovým atomem chlorofylu u rostlin","Tvoří s ATP komplex Mg·ATP²⁻, se kterým enzymy skutečně pracují","Je kofaktorem stovek enzymů a stabilizuje strukturu DNA","Je hlavním kationtem mimobuněčné tekutiny"],c:[0,1,2],
  e:"První tři body jsou správné — hořčík je po draslíku druhý nejhojnější kation uvnitř buněk. Poslední je chybné: hlavním kationtem mimobuněčné tekutiny je sodík. Hořčíku je v plazmě jen 0,7 až 1,0 mmol·dm⁻³."},
 {t:"single",q:"Proč drží buňka koncentraci volného <b>vápníku v&nbsp;cytosolu</b> na hodnotě kolem 0,0001&nbsp;mmol·dm⁻³, tedy více než desetitisíckrát níž než venku?",
  o:["Aby stačil malý vzestup jako jednoznačný signál","Protože je vápník pro buňku jedovatý v jakémkoli množství","Protože ho buňka nedokáže dovnitř dostat","Aby se šetřila energie"],c:0,
  e:"Nízké pozadí znamená, že i krátké otevření kanálu způsobí okamžitý a nepřehlédnutelný skok koncentrace — a právě tak funguje vápník jako univerzální buněčný signál. Dostat ho dovnitř umí buňka bez potíží, naopak vynakládá energii, aby ho dostala ven."},
 {t:"num",q:"Kolik gramů sodíku obsahuje 8,0&nbsp;g kuchyňské soli? (Zadejte v&nbsp;g na dvě desetinná místa. M(Na) = 22,99, M(NaCl) = 58,44&nbsp;g·mol⁻¹.)",
  ans:3.15, tol:0.08, unit:"g",
  e:"Hmotnostní zlomek sodíku v soli je 22,99 / 58,44 = 0,393, tedy 39,3 %. m(Na) = 8,0 · 0,393 = 3,15 g. Doporučený denní příjem je přitom pod 5 g soli, tedy pod 2 g sodíku — na obalech se uvádí sodík, v doporučeních sůl a liší se 2,54krát."}
];
