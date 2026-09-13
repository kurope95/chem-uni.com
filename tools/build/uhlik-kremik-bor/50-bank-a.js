/* ============================================================
   23 · BANKA OTÁZEK — kapitolové mini-testy k0 až k4
   ============================================================ */
BANK.q0=[
 {t:"single",q:"Proč je uhlík <b>nejvýše čtyřvazný</b>, kdežto křemík může být až šestivazný?",
  o:["Uhlík nemá ve valenční sféře orbitaly d, kdežto křemík má prázdné orbitaly 3d","Uhlík má menší atom, a proto se kolem něj nevejde víc partnerů","Uhlík má vyšší elektronegativitu a odpuzuje další ligandy","Uhlík má jen dva valenční elektrony k dispozici"],c:0,
  e:"Rozhoduje dostupnost orbitalů: valenční sféra uhlíku obsahuje jen 2s a 2p, tedy čtyři orbitaly, kdežto křemík má navíc energeticky blízké prázdné orbitaly 3d a může tvořit až šest vazeb σ (hybridizace sp³d² v [SiF₆]²⁻). Velikost atomu hraje jen vedlejší roli — ta by šestou vazbu ztížila, ale nezakázala."},
 {t:"single",q:"Která dvojice vazebných energií nejlépe vysvětluje, proč se křemík <b>neřetězí sám se sebou</b>?",
  o:["C—H = 412 a Si—H = 318 kJ·mol⁻¹","C—Cl = 338 a Si—Cl = 381 kJ·mol⁻¹","Si—Si = 226 a Si—O = 466 kJ·mol⁻¹","C—C = 348 a Si—Si = 226 kJ·mol⁻¹"],c:2,
  e:"Podstatné je srovnání dvou vazeb <b>u téhož prvku</b>: vazba Si—O je o 240 kJ·mol⁻¹ pevnější než Si—Si, takže křemík vždycky raději sáhne po kyslíku. Poslední možnost je nejlákavější, ale ukazuje jen na to, že vazba Si—Si je slabší než C—C — sama o sobě by nevysvětlila, proč křemík místo řetězců tvoří sítě s kyslíkem."},
 {t:"single",q:"Jaký tvar a jaký počet elektronů kolem středového atomu má molekula <b>BF₃</b>?",
  o:["rovinný trojúhelník, 6 elektronů (sextet)","tetraedr, 8 elektronů (oktet)","pyramida, 8 elektronů včetně volného páru","lineární, 4 elektrony"],c:0,
  e:"Bor má tři valenční elektrony a v BF₃ udělá tři vazby σ v jedné rovině pod úhlem 120° (hybridizace sp²). Kolem boru je proto jen šest elektronů a orbital 2p<sub>z</sub> zůstává prázdný. Tetraedr s oktetem by odpovídal až aniontu [BF₄]⁻ nebo aduktu, kde bor přijal cizí elektronový pár."},
 {t:"single",q:"Proč je oxid uhličitý za běžných podmínek plyn, kdežto oxid křemičitý taje až při 1713 °C?",
  o:["Vazba Si—O je mnohem pevnější než C—O, takže SiO₂ potřebuje víc energie","Křemík má vyšší atomovou hmotnost, a proto je jeho oxid méně těkavý","Uhlík tvoří vazby π a vysytí se dvěma dvojnými vazbami, kdežto křemík musí udělat čtyři vazby σ a vzniká prostorová síť","Oxid uhličitý je nepolární, kdežto oxid křemičitý je iontový"],c:2,
  e:"Rozhoduje rozdíl mezi <b>molekulovou</b> a <b>síťovou</b> látkou. Uhlík umí bokem překrýt orbitaly 2p a vytvořit pevné vazby π, takže se vysytí v malé molekule O=C=O, kterou drží pohromadě jen slabé mezimolekulové síly. Křemík vazby π netvoří, musí udělat čtyři jednoduché vazby a propojí se do nekonečné sítě. Vyšší pevnost vazby Si—O k tomu přispívá, ale sama by rozdíl dvou tisíc stupňů nevysvětlila."},
 {t:"multi",q:"Které z těchto tvrzení o oxidačních číslech uhlíku, křemíku a boru jsou <b>správné</b>?",
  o:["Oxidační číslo +IV u uhlíku znamená, že v CO₂ je skutečný ion C⁴⁺","Oxidační čísla jsou u těchto prvků formální pomůckou, protože jejich vazby jsou převážně kovalentní","Bor má prakticky ve všech sloučeninách oxidační číslo +III","Křemík se běžně vyskytuje v oxidačních číslech −IV a +IV","U organických sloučenin s vazbami C—C vycházejí oxidační čísla často zlomková"],c:[1,2,3,4],
  e:"Jediné nesprávné tvrzení je první: volné ionty C⁴⁺, Si⁴⁺ ani B³⁺ neexistují, protože odtržení tolika elektronů z tak malých atomů by stálo příliš energie. Všechny tři prvky leží uprostřed stupnice elektronegativity a tvoří převážně kovalentní vazby, takže oxidační čísla jsou u nich pomůckou pro názvosloví, ne popisem skutečného náboje."},
 {t:"single",q:"Které tvrzení o tetrachlormethanu <b>CCl₄</b> a chloridu křemičitém <b>SiCl₄</b> je správné?",
  o:["Obojí prudce hydrolyzuje, protože vazba na chlor je slabá","CCl₄ hydrolyzuje snadněji, protože je uhlík elektronegativnější","Ani jedna látka s vodou nereaguje, protože jsou obě nepolární","SiCl₄ hydrolyzuje, protože křemík má volné orbitaly 3d, do kterých voda vloží svůj elektronový pár; CCl₄ takovou možnost nemá"],c:3,
  e:"Rozdíl je <b>kinetický, ne termodynamický</b>: hydrolýza CCl₄ by byla energeticky výhodná také, ale reakce nemá kudy začít. Křemík nabídne prázdný orbital 3d, molekula vody se naváže a vznikne přechodný stav s pěti vazbami, takže aktivační energie je nízká. Uhlík má uzavřený oktet a kolem malého atomu jsou navíc čtyři objemné chlory natěsnané tak, že se pátá částice nevejde."}
];

BANK.q1=[
 {t:"single",q:"Grafit vede elektrický proud, diamant ne. Čím to je?",
  o:["Grafit má hybridizaci sp², takže na každém atomu zbývá elektron v orbitalu p, který se slévá do delokalizovaného oblaku π","Grafit obsahuje kovové nečistoty, které vodivost způsobují","Vrstvy grafitu jsou od sebe daleko, a proto jimi elektrony snadno prolétnou","Grafit má nižší hustotu, takže elektrony mají víc místa"],c:0,
  e:"V grafitu jsou tři ze čtyř valenčních elektronů zapojeny do vazeb σ v rovině vrstvy, a čtvrtý zůstává v orbitalu p<sub>z</sub> kolmém k vrstvě. Tyto orbitaly se překrývají po celé vrstvě a vzniká delokalizovaný oblak π, ve kterém se elektrony mohou volně pohybovat. V diamantu jsou všechny čtyři elektrony vázané ve vazbách σ, takže volný nosič náboje neexistuje."},
 {t:"single",q:"Které srovnání délek vazeb v diamantu a v grafitu je <b>správné</b>?",
  o:["V diamantu 142 pm, v grafitu 154 pm ve vrstvě","V diamantu 154 pm, ve vrstvě grafitu 142 pm a mezi vrstvami 335 pm","V obou 154 pm, liší se jen počet vazeb","V diamantu 335 pm, v grafitu 154 pm"],c:1,
  e:"Vazba ve vrstvě grafitu (142 pm) je <b>kratší a pevnější</b> než v diamantu (154 pm), protože má částečně charakter dvojné vazby. Grafit přesto maže — ne kvůli slabým vazbám ve vrstvě, ale proto, že mezi vrstvami vzdálenými 335 pm žádné kovalentní vazby nejsou, jen van der Waalsovy síly."},
 {t:"single",q:"Máte tři vzorky čistého uhlíku. Jeden se rozpouští v toluenu na fialový roztok. O co jde a proč to ostatní neumějí?",
  o:["Grafit — jeho vrstvy se v rozpouštědle oddělí","Aktivní uhlí — má velký povrch, takže se rozpustí rychleji","Fulleren C₆₀ — je to molekulová látka, kterou v pevné fázi drží jen slabé mezimolekulové síly","Diamant — jeho síť je natolik pravidelná, že se rozpadne na jednotlivé atomy"],c:2,
  e:"Rozpustnost je spolehlivým důkazem <b>molekulové</b> struktury. Kovalentní síť rozpustit nelze, protože byste museli trhat vazby napříč celým krystalem — proto se diamant ani grafit nerozpouštějí. Fulleren je obyčejná molekula a v pevné fázi ho drží jen slabé síly, které rozpouštědlo překoná; fialová barva roztoku je pro C₆₀ typická."},
 {t:"single",q:"Která modifikace uhlíku je za standardních podmínek <b>termodynamicky nejstálejší</b>?",
  o:["Grafit — přeměna diamantu na grafit má ΔG° = −2,90 kJ·mol⁻¹","Fulleren C₆₀, protože je to uzavřená molekula bez volných vazeb","Diamant, protože má nejvyšší hustotu a nejpevnější síť","Grafen, protože má nejnižší energii na atom"],c:0,
  e:"Grafit je za běžné teploty a tlaku stálejší než diamant, takže diamant má tendenci se na něj přeměňovat. Neděje se to proto, že by přeměna vyžadovala rozbít a přeuspořádat celou síť vazeb σ — aktivační energie je obrovská a rychlost prakticky nulová. Diamant je tedy <b>kineticky</b> stabilizovaný, nikoli termodynamicky."},
 {t:"num",q:"Jaký objem v cm³ zaujme 1,00 mol uhlíku ve formě grafitu? Hustota grafitu je 2,26 g·cm⁻³, <span class='mono'>M</span>(C) = 12,01 g·mol⁻¹. (Zadejte v cm³·mol⁻¹ na dvě desetinná místa.)",
  ans:5.31, tol:0.08, unit:"cm³·mol⁻¹",
  e:"Molární objem je podíl molární hmotnosti a hustoty: 12,01 / 2,26 = 5,31 cm³·mol⁻¹. Pro diamant vyjde 12,01 / 3,51 = 3,42 cm³·mol⁻¹, tedy o polovinu méně. Rozdíl způsobuje prázdná mezera 335 pm mezi vrstvami grafitu — a právě proto se diamant vyrábí za vysokého tlaku, který stlačení podporuje."},
 {t:"multi",q:"Které formy uhlíku byly objeveny <b>až po roce 1980</b>, takže je starší učebnice nemohou obsahovat?",
  o:["fullereny","grafit","nanotrubice","grafen","diamant"],c:[0,2,3],
  e:"Fulleren C₆₀ byl objeven roku 1985 (Nobelova cena za chemii 1996), nanotrubice popsány roku 1991 a grafen izolován roku 2004 (Nobelova cena za fyziku 2010). Diamant i grafit jsou známé od pravěku, takže je má každá učebnice. Právě proto se ve starších textech dočtete, že uhlík má jen dvě alotropické modifikace."}
];

BANK.q2=[
 {t:"single",q:"Proč <b>není</b> oxid uhličitý redukovadlem, kdežto oxid uhelnatý ano?",
  o:["Protože je CO₂ nepolární a CO polární","Protože je CO₂ těžší než vzduch","Protože je uhlík v CO₂ na nejvyšším oxidačním čísle +IV a dál se oxidovat nemůže, kdežto v CO má jen +II","Protože se CO₂ ve vodě rozpouští a CO ne"],c:2,
  e:"Redukovadlo musí být schopné se samo oxidovat, tedy odevzdat elektrony. V CO₂ má uhlík oxidační číslo +IV, což je jeho maximum, takže žádné elektrony odevzdat nemůže. V CO má uhlík jen +II a může přejít na +IV — proto je oxid uhelnatý silným redukovadlem a proto na něm stojí redukce rud ve vysoké peci."},
 {t:"single",q:"Boudouardova rovnováha <span class='chem'>C + CO₂ ⇌ 2 CO</span> je endotermní (Δ<span class='q'>H</span>° = +172 kJ·mol⁻¹). Jak ji ovlivní <b>zvýšení teploty</b>?",
  o:["Posune se doleva, protože vyšší teplota rozkládá oxid uhelnatý","Posune se doprava, přibude oxidu uhelnatého","Neovlivní ji vůbec, protože je to heterogenní rovnováha","Posune se doleva, protože se zvýší tlak plynů"],c:1,
  e:"U endotermní reakce je teplo formálně „reaktantem“, takže podle Le Chatelierova principu jeho dodání posune rovnováhu doprava. Pod 400 °C je v rovnovážné směsi prakticky jen CO₂, nad 1000 °C prakticky jen CO; zlom leží kolem 700 °C. Právě proto se ve spodní, nejteplejší části vysoké pece udržuje oxid uhelnatý."},
 {t:"single",q:"Roztok má pH 7,4 (tedy jako krev). Která forma uhličitanového systému v něm <b>převládá</b>? pK₁ = 6,35 a pK₂ = 10,33.",
  o:["uhličitanový anion CO₃²⁻","rozpuštěný CO₂ a kyselina uhličitá","kyselina uhličitá v nedisociované formě","hydrogenuhličitanový anion HCO₃⁻"],c:3,
  e:"Hodnota pH 7,4 leží mezi pK₁ = 6,35 a pK₂ = 10,33, tedy v oblasti, kde drtivě převládá střední forma — hydrogenuhličitan. Rozpuštěného CO₂ je asi dvacetkrát méně a uhličitanu zanedbatelně; teprve nad pH 10,33 by převládl anion CO₃²⁻. Právě poměr HCO₃⁻ ku rozpuštěnému CO₂ tvoří hlavní pufr krve."},
 {t:"single",q:"Do vápenné vody dlouho zavádíte oxid uhličitý. Co uvidíte a proč?",
  o:["Nejdřív vznikne bílý zákal CaCO₃, který se při dalším zavádění rozpustí na Ca(HCO₃)₂","Nejdřív vznikne zákal a ten se už nikdy nerozpustí","Roztok se zbarví žlutě, protože vzniká kyselina uhličitá","Nestane se nic, protože CO₂ s hydroxidem vápenatým nereaguje"],c:0,
  e:"Nerozpustný uhličitan vápenatý se přebytkem CO₂ převede na rozpustný hydrogenuhličitan: <span class='chem'>CaCO₃ + CO₂ + H₂O → Ca(HCO₃)₂</span>. Zmizení zákalu tedy neznamená, že reakce skončila, ale že pokročila dál. Tentýž děj rozpouští vápenec v krasových jeskyních; opačný směr vytváří krápníky a vodní kámen."},
 {t:"num",q:"Kolik kilogramů oxidu vápenatého vznikne pálením 1,00 t vápence o čistotě 95 %? <span class='mono'>M</span>(CaCO₃) = 100,1 a <span class='mono'>M</span>(CaO) = 56,08 g·mol⁻¹. (Zadejte v kg zaokrouhleně na celé kilogramy.)",
  ans:532, tol:8, unit:"kg",
  e:"Čistého vápence je 950 kg, tedy 950 000 / 100,1 = 9492 mol. Poměr CaCO₃ : CaO je 1 : 1, takže vznikne 9492 · 56,08 = 532 300 g, tedy 532 kg. Zbylých 418 kg odejde jako CO₂ — skoro polovina hmotnosti vápence. Právě proto patří pálení vápna a výroba cementu k největším průmyslovým zdrojům oxidu uhličitého."},
 {t:"multi",q:"Které kroky patří do <b>Solvayova postupu</b> výroby uhličitanu sodného?",
  o:["Zavádění CO₂ do chlazeného roztoku amoniaku a chloridu sodného","Vylučování méně rozpustného NaHCO₃ z roztoku","Elektrolýza taveniny chloridu sodného","Kalcinace hydrogenuhličitanu sodného na sodu, CO₂ a vodu","Uvolnění amoniaku z chloridu amonného hašeným vápnem"],c:[0,1,3,4],
  e:"Elektrolýza taveniny NaCl do Solvayova postupu nepatří — tou se vyrábí sodík a chlor. Podstatou postupu je, že se z roztoku vyloučí nejméně rozpustná složka NaHCO₃, kalcinací se převede na sodu, a přitom se amoniak i oxid uhličitý vracejí zpět do procesu. Čistá bilance je tedy jen <span class='chem'>2 NaCl + CaCO₃ → Na₂CO₃ + CaCl₂</span>."}
];

BANK.q3=[
 {t:"single",q:"Do vody vhodíte karbid hlinitý <span class='chem'>Al₄C₃</span>. Co se uvolní?",
  o:["methan","acetylen","propin","nic — karbid hlinitý s vodou nereaguje"],c:0,
  e:"Karbid hlinitý je iontový karbid s aniontem <span class='chem'>C⁴⁻</span>, tedy s izolovanými atomy uhlíku. Formálně je to sůl methanu, takže protonací vzniká methan: <span class='chem'>Al₄C₃ + 12 H₂O → 4 Al(OH)₃ + 3 CH₄</span>. Acetylen by vznikl jen z acetylidového aniontu <span class='chem'>C₂²⁻</span>, který má například karbid vápníku."},
 {t:"single",q:"Který karbid s vodou <b>nereaguje</b> a proč?",
  o:["CaC₂, protože je vápník příliš elektropozitivní","Mg₂C₃, protože je jeho anion příliš velký","Be₂C, protože je beryllium amfoterní","TiC, protože jde o intersticiální karbid — uhlík je vmezeřen do kovové mřížky a nevytváří anion"],c:3,
  e:"Hydrolyzují jen ty karbidy, ve kterých je uhlík skutečným <b>aniontem</b>, tedy karbidy iontové s kovy 1., 2. a 13. skupiny. V intersticiálních karbidech přechodných kovů zůstává kovová vazba zachovaná a uhlík jen zpevňuje mřížku, takže není co protonovat. Totéž platí pro kovalentní karbidy typu SiC."},
 {t:"single",q:"Proč roztok kyanidu draselného páchne po hořkých mandlích a je nebezpečný i bez přidání kyseliny?",
  o:["Protože kyanidový anion silně hydrolyzuje (pKₐ HCN = 9,2), takže nad roztokem je vždy trochu plynného HCN","Protože se kyanid ve vodě rozkládá na dusík a uhlík","Protože kyanid reaguje s kyslíkem ze vzduchu na kyanatan","Protože kyanid draselný sám o sobě sublimuje"],c:0,
  e:"Kyanovodík je velmi slabá kyselina, takže její sůl ve vodě výrazně hydrolyzuje podle rovnice <span class='chem'>CN⁻ + H₂O ⇌ HCN + OH⁻</span>. Roztok proto obsahuje volný kyanovodík, který se z hladiny uvolňuje. Přidáním jakékoli silnější kyseliny se uvolní všechen najednou — proto se kyanidy nikdy nesmějí okyselit."},
 {t:"single",q:"Co mají společného částice <span class='chem'>CO</span>, <span class='chem'>N₂</span> a <span class='chem'>CN⁻</span>?",
  o:["Všechny jsou trojatomové a lineární","Všechny obsahují atom kyslíku","Všechny jsou za běžné teploty kapalné","Jsou izoelektronové — mají stejný počet valenčních elektronů a stejné vazebné uspořádání s trojnou vazbou"],c:3,
  e:"Všechny tři částice mají čtrnáct elektronů, trojnou vazbu a lineární uspořádání. Proto se chovají podobně: CO i CN⁻ jsou výborné ligandy a tvoří stálé komplexy s přechodnými kovy, a všechny tři částice jsou pozoruhodně stálé. Trojatomové ani lineární nejsou — jsou dvouatomové."},
 {t:"num",q:"Jaký objem acetylenu při 25 °C vznikne hydrolýzou 100 g karbidu vápníku o čistotě 100 %? <span class='mono'>M</span>(CaC₂) = 64,10 g·mol⁻¹, <span class='mono'>V</span><sub>m</sub> = 24,47 dm³·mol⁻¹. (Zadejte v dm³ na jedno desetinné místo.)",
  ans:38.2, tol:0.6, unit:"dm³",
  e:"Podle rovnice <span class='chem'>CaC₂ + 2 H₂O → Ca(OH)₂ + C₂H₂</span> vzniká z jednoho molu karbidu jeden mol acetylenu. Látkové množství je 100 / 64,10 = 1,560 mol, objem tedy 1,560 · 24,47 = 38,2 dm³. Ze sta gramů pevné látky dostanete přes třicet litrů hořlavého plynu — na tom byly založené karbidové lampy."},
 {t:"multi",q:"Které vlastnosti jsou typické pro <b>intersticiální karbidy</b> typu TiC a WC?",
  o:["kovový lesk a elektrická vodivost","hydrolýza na uhlovodík","extrémní tvrdost a vysoká teplota tání","nestechiometrické složení","vznik s kovy 1. a 2. skupiny"],c:[0,2,3],
  e:"Intersticiální karbidy vznikají s <b>přechodnými</b> kovy, ne s alkalickými kovy. Malé atomy uhlíku se vejdou do dutin kovové mřížky, aniž ji rozbijí, takže kovová vazba zůstává — odtud lesk a vodivost. Mřížka se přitom zpevní, což dává extrémní tvrdost. Protože nemusí být obsazeny všechny dutiny, bývá složení nestechiometrické. S vodou nereagují vůbec."}
];

BANK.q4=[
 {t:"single",q:"Křemík se nerozpouští v kyselině chlorovodíkové, ale v roztoku hydroxidu sodného ano. Co při tom vzniká?",
  o:["chlorid křemičitý a voda","křemičitan sodný a vodík","silan a oxid sodný","oxid křemičitý a chlorovodík"],c:1,
  e:"Reakce probíhá podle rovnice <span class='chem'>Si + 2 NaOH + H₂O → Na₂SiO₃ + 2 H₂</span>. Je to redoxní děj: křemík se oxiduje z 0 na +IV a vodík z vody se redukuje z +I na 0. Chování je přesně opačné, než jaké byste čekali od kovu — křemík je polokov, který se chemicky chová jako nekov."},
 {t:"single",q:"Methan je na vzduchu stálý, ale silan <span class='chem'>SiH₄</span> se vznítí sám. Proč?",
  o:["Silan je těžší než vzduch, a proto se snáz zapálí","Silan má nižší teplotu varu","Spálením silanu vzniknou čtyři mimořádně pevné vazby Si—O (466 kJ·mol⁻¹), zatímco se trhá jen slabá vazba Si—H (318 kJ·mol⁻¹)","Silan obsahuje více vodíku než methan"],c:2,
  e:"U hydridů rozhoduje <b>termodynamika</b>: energetický zisk z pevných vazeb Si—O je tak velký a cena za rozbití slabých vazeb Si—H tak nízká, že reakce překoná i aktivační bariéru za pokojové teploty. U methanu je poměr méně příznivý (C—O 360, C—H 412 kJ·mol⁻¹), takže se musí zapálit. Silan i methan mají shodně čtyři vodíky."},
 {t:"single",q:"Anion <span class='chem'>[SiF₆]²⁻</span> má tvar oktaedru. Jaká je hybridizace křemíku a proč nemůže existovat obdobný anion uhlíku?",
  o:["sp³d, uhlík nemá dost valenčních elektronů","sp³, uhlík má příliš velký atom","sp³d², uhlík nemá ve valenční sféře orbitaly d, takže nemůže překročit oktet","sp²d², uhlík je příliš elektronegativní"],c:2,
  e:"Šest vazeb σ směřujících do vrcholů oktaedru vyžaduje šest hybridních orbitalů, tedy kombinaci 3s, tři 3p a dva 3d — hybridizaci sp³d². Uhlík má ve valenční sféře jen orbitaly 2s a 2p, tedy čtyři, a jeho oktet je uzavřený. Anion [CF₆]²⁻ proto neexistuje."},
 {t:"single",q:"Co je <b>ferrosilicium</b> a k čemu se používá?",
  o:["slitina železa a křemíku, používaná v ocelářství jako odkysličovadlo a legura","sloučenina křemíku s vodíkem, používaná k depozici tenkých vrstev","minerál obsahující železo a křemičitany, surovina pro výrobu skla","směs oxidu železa a křemene používaná jako brusivo"],c:0,
  e:"Ferrosilicium vzniká, když se redukce oxidu křemičitého koksem provádí za přítomnosti železa nebo jeho oxidů. Ve výrobě oceli slouží k odstranění rozpuštěného kyslíku a jako legura pro křemíkové (transformátorové) oceli. Není to sloučenina s definovaným vzorcem, ale slitina."},
 {t:"num",q:"Kolik dm³ vodíku při 25 °C se uvolní rozpuštěním 2,00 g křemíku v nadbytku roztoku NaOH? <span class='mono'>M</span>(Si) = 28,09 g·mol⁻¹, <span class='mono'>V</span><sub>m</sub> = 24,47 dm³·mol⁻¹. (Zadejte v dm³ na dvě desetinná místa.)",
  ans:3.48, tol:0.08, unit:"dm³",
  e:"Podle rovnice <span class='chem'>Si + 2 NaOH + H₂O → Na₂SiO₃ + 2 H₂</span> dává jeden mol křemíku dva moly vodíku. Látkové množství křemíku je 2,00 / 28,09 = 0,0712 mol, vodíku tedy 0,1424 mol a objem 0,1424 · 24,47 = 3,48 dm³. Křemík zde vystupuje jako redukovadlo a redukuje vodík z vody."},
 {t:"multi",q:"Ve kterých vlastnostech se <b>silany liší od alkanů</b>?",
  o:["silany jsou samozápalné, alkany ne","silany hydrolyzují vodou, alkany ne","řada silanů končí zhruba u osmi atomů, řada alkanů prakticky neomezeně","v silanech má vodík záporně polarizovaný, hydridový charakter","silany mají tetraedrickou geometrii, alkany planární"],c:[0,1,2,3],
  e:"Poslední tvrzení je nesprávné — obě třídy mají tetraedrickou geometrii s hybridizací sp³. Ostatní rozdíly plynou ze dvou příčin: slabá vazba Si—Si (226 proti 348 kJ·mol⁻¹) omezuje délku řetězce, a obrácená polarita (křemík je méně elektronegativní než vodík) spolu s volnými orbitaly 3d dělá ze silanů reaktivní redukovadla."}
];
