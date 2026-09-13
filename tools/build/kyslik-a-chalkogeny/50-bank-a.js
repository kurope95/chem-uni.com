/* ============================================================
   24 · BANKA OTÁZEK — kapitolové mini-testy (k0 až k4)
   ============================================================ */
BANK.q0=[
 {t:"single",q:"Proč nemůže existovat sloučenina <span class=\"chem\">OF₆</span>, přestože <span class=\"chem\">SF₆</span> běžně existuje?",
  o:["Fluor je pro kyslík příliš reaktivní","Kyslík je příliš elektronegativní na to, aby se vázal s fluorem","Kyslík nemá ve valenční sféře orbitaly d, a je navíc příliš malý na šest ligandů","Sloučenina by měla nulový dipólový moment"],c:2,
  e:"Kyslík je ve druhé periodě: orbitaly 2d neexistují, takže nelze překročit oktet, a atom o poloměru 66 pm by šest fluorů geometricky nepojal. Odpověď o elektronegativitě je nejlákavější past — kyslík se s fluorem váže bez problému, jen ve stechiometrii OF₂ a O₂F₂."},
 {t:"single",q:"Které oxidační číslo je pro celou skupinu 16 nejběžnější a&nbsp;proč?",
  o:["−II, protože do oktetu chybějí dva elektrony","+VI, protože se odevzdají všechny valenční elektrony","+IV, protože se odevzdají elektrony p","−I, protože se tvoří vazba chalkogen–chalkogen"],c:0,
  e:"Konfigurace ns² np⁴ znamená šest valenčních elektronů a dva chybějící do oktetu. Nejlevnější cestou je tedy přijmout dva elektrony nebo vytvořit dvě kovalentní vazby. Čísla +IV a +VI jsou u S, Se a Te běžná, ale nikoli nejčastější, a u kyslíku vůbec nepřipadají v úvahu."},
 {t:"single",q:"Který z&nbsp;chalkogenovodíků je <b>nejsilnější kyselina</b>?",
  o:["H₂O","H₂S","H₂Se","H₂Te"],c:3,
  e:"Kyselost hydridů roste dolů skupinou, protože vazba E–H slábne a větší anion lépe rozprostře záporný náboj: pK₁ jde z 15,7 (voda) na 2,6 (tellan). Voda je nejlákavější špatná odpověď, protože je „nejchemičtější“ — ale je to naopak nejslabší kyselina z celé řady."},
 {t:"multi",q:"Které trendy platí <b>směrem dolů</b> skupinou 16? Vyberte všechny správné možnosti.",
  o:["Roste atomový poloměr","Roste elektronegativita","Roste kovový charakter","Klesá stálost hydridu H₂E","Roste ionizační energie"],c:[0,2,3],
  e:"Dolů skupinou přibývají elektronové slupky, takže roste poloměr a s ním klesá elektronegativita i ionizační energie. Slábnoucí vazba E–H znamená klesající stálost hydridů a zároveň rostoucí kyselost. Kovový charakter roste, protože valenční elektrony se snáz delokalizují."},
 {t:"single",q:"Molekula <span class=\"chem\">H₂S</span> má vazebný úhel 92,1°, zatímco voda 104,5°. Co z&nbsp;toho plyne?",
  o:["Sulfan má silnější vodíkové vazby než voda","U sulfanu se vazba popisuje jako překryv téměř čistých orbitalů p, hybridizaci není nutné zavádět","Sulfan je lineární molekula","Síra má v sulfanu oxidační číslo +II"],c:1,
  e:"Úhel blízký pravému ukazuje, že se síra váže dvěma na sebe kolmými orbitaly 3p; zavedení hybridizace by nic nevysvětlilo navíc. U vody je úhel blízko tetraedrickému, proto se mluví o sp³. Vodíkové vazby sulfan naopak prakticky nemá — proto vře už při −60,3 °C."},
 {t:"single",q:"Proč je <span class=\"chem\">CO₂</span> plyn, ale <span class=\"chem\">SiO₂</span> tvrdá netěkavá látka?",
  o:["Křemík je kov, uhlík nekov","SiO₂ má iontovou vazbu, CO₂ kovalentní","Křemík má vyšší elektronegativitu než uhlík","Malý uhlík tvoří dvojné vazby p<sub>π</sub>–p<sub>π</sub>, a vzniknou tak uzavřené molekuly; velký křemík je netvoří a vzniká nekonečná síť"],c:3,
  e:"Rozhoduje účinnost bočního překryvu orbitalů p, tedy velikost atomu. Uhlík je malý, dokáže dvě dvojné vazby a molekula O=C=O se uzavře. Křemík je velký, dvojné vazby nejsou výhodné, a tak se každý atom obklopí čtyřmi kyslíky do prostorové sítě. Přesně stejný důvod odděluje O₂ od S₈."}
];

BANK.q1=[
 {t:"single",q:"Jaké oxidační číslo má kyslík v&nbsp;<span class=\"chem\">BaO₂</span>?",
  o:["−II","−I","−½","+II"],c:1,
  e:"Baryum má vždy +II, dva kyslíky tedy nesou dohromady −2, na atom −I. Je to peroxid barnatý s anionem O₂²⁻. Kdo dosadí O = −II, dostane Ba = +IV, což u barya neexistuje — a právě to je signál, že jde o peroxid."},
 {t:"single",q:"Ve které z&nbsp;uvedených sloučenin má kyslík <b>kladné</b> oxidační číslo?",
  o:["H₂O₂","KO₂","Cl₂O","OF₂"],c:3,
  e:"Kladné oxidační číslo má kyslík jedině tehdy, je-li partner ještě elektronegativnější — a takový je pouze fluor (3,98 > 3,44). V OF₂ má kyslík +II. V Cl₂O je naopak kyslík elektronegativnější než chlor (3,44 > 3,16), takže má −II a chlor +I."},
 {t:"single",q:"Kolik vazeb σ může kyslík maximálně vytvořit a&nbsp;proč?",
  o:["Čtyři, protože ve druhé periodě neexistují orbitaly d","Šest, stejně jako síra","Dvě, protože má dva nepárové elektrony","Tři, jako v hydroxoniovém kationtu"],c:0,
  e:"Maximum jsou čtyři vazby σ, protože kyslík má ve valenční sféře jen orbitaly 2s a 2p a orbitaly 2d neexistují. Tetraedrická koordinace se předpokládá například v mřížce ZnO a Al₂O₃. Dvě vazby jsou nejběžnější a tři v H₃O⁺ existují, ale ani jedno není maximum."},
 {t:"single",q:"Které tvrzení o&nbsp;anionu <span class=\"chem\">O₂⁻</span> je správné?",
  o:["Je diamagnetický a má řád vazby 1","Je to peroxidový anion s kyslíkem v −I","Je paramagnetický, má řád vazby 1,5 a kyslík v něm má −½","Je izoelektronový s dusíkem N₂"],c:2,
  e:"Superoxidový anion má o jeden elektron víc než molekula O₂, tedy tři elektrony v orbitalech π*. Řád vazby klesne na 1,5, jeden elektron zůstane nepárový (paramagnetismus) a jeden záporný náboj se dělí na dva atomy, tedy −½. Diamagnetický a s řádem 1 je až peroxidový anion O₂²⁻."},
 {t:"multi",q:"Ve kterých z&nbsp;uvedených částic se uplatňuje <b>koordinační vazba nebo volný pár kyslíku jako donor</b>? Vyberte všechny správné možnosti.",
  o:["H₃O⁺","[Cu(H₂O)₄]²⁺","O₂","vodíková vazba mezi molekulami vody"],c:[0,1,3],
  e:"Ve všech třech případech kyslík daruje nebo částečně sdílí volný elektronový pár: protonu (hydroxonium), kovovému kationtu (akvakomplex) nebo vodíku sousední molekuly (vodíková vazba). V molekule O₂ jsou volné páry přítomny, ale žádnému partnerovi se nedarují."},
 {t:"single",q:"Jaké oxidační číslo má síra v&nbsp;kyselině peroxodisírové <span class=\"chem\">H₂S₂O₈</span>?",
  o:["+VII","+VI","+V","+IV"],c:1,
  e:"Naivní dosazení −II všem osmi kyslíkům dá +VII, což je u síry nemožné — má jen šest valenčních elektronů. Dva z kyslíků tvoří peroxidový můstek a mají −I; po správném rozpisu vyjde S = +VI. Peroxodisírová kyselina tedy není „vyšší“ kyselina síry, jen kyselina disírová s vloženým peroxidem."}
];

BANK.q2=[
 {t:"single",q:"Proč je Lewisův vzorec <span class=\"chem\">O=O</span> považován za nedostatečný?",
  o:["Předpovídá nesprávný řád vazby","Předpovídá, že molekula je diamagnetická, ale kyslík je paramagnetický","Předpovídá špatnou délku vazby","Nezachycuje polaritu molekuly"],c:1,
  e:"Řád vazby 2 předpovídá Lewisův vzorec správně. Selže ale v magnetismu: ukazuje všechny elektrony spárované, kdežto kapalný kyslík se drží mezi póly magnetu. MO teorie to vysvětlí dvěma nepárovými elektrony ve dvojici protivazebných orbitalů π*."},
 {t:"single",q:"Seřaďte podle <b>rostoucí</b> délky vazby: <span class=\"chem\">O₂</span>, <span class=\"chem\">O₂⁺</span>, <span class=\"chem\">O₂²⁻</span>.",
  o:["O₂²⁻ < O₂ < O₂⁺","O₂ < O₂⁺ < O₂²⁻","O₂⁺ < O₂ < O₂²⁻","O₂⁺ < O₂²⁻ < O₂"],c:2,
  e:"Rozhoduje počet elektronů v protivazebných orbitalech π*: O₂⁺ má jeden (řád 2,5; 112 pm), O₂ dva (řád 2; 121 pm), O₂²⁻ čtyři (řád 1; 149 pm). Čím víc elektronů v π*, tím nižší řád vazby a tím delší a slabší vazba."},
 {t:"single",q:"Které tvrzení o&nbsp;ozonu je <b>nesprávné</b>?",
  o:["Je polární a má vyšší teplotu varu než O₂","Je silnějším oxidačním činidlem než kyslík","Obě vazby O–O jsou stejně dlouhé","Má jednu jednoduchou a jednu dvojnou vazbu, protože je to rezonanční hybrid"],c:3,
  e:"Právě to je nejčastější omyl: obě vazby jsou stejně dlouhé (127,8 pm), protože jeden pár π je delokalizovaný přes všechny tři atomy. Rezonanční vzorce s jednou jednoduchou a jednou dvojnou vazbou jsou jen pomůcka. Ostatní tři tvrzení platí — ozon je polární, vře při −111,9 °C a má E° = +2,07 V."},
 {t:"single",q:"Při frakční destilaci zkapalněného vzduchu:",
  o:["Odchází první dusík, protože má nižší teplotu varu, a kyslík zůstává v kapalině","Odchází první kyslík, protože je ho méně","Odchází první argon a pak současně dusík s kyslíkem","Nic se nedělí, kapalný vzduch se rovnou používá"],c:0,
  e:"Dusík vře při −195,8 °C, kyslík až při −183,0 °C, takže dusík se odpaří dřív. Argon (−185,8 °C) se odebírá jako boční frakce. Argument „kyslíku je míň“ s dělením nesouvisí — rozhoduje výhradně teplota varu."},
 {t:"multi",q:"Které reakce se používají k&nbsp;<b>laboratorní přípravě</b> kyslíku? Vyberte všechny správné možnosti.",
  o:["2 H₂O₂ → 2 H₂O + O₂ (kat. MnO₂)","2 KClO₃ → 2 KCl + 3 O₂ (kat. MnO₂, zahřátí)","3 O₂ → 2 O₃ (tichý výboj)","2 HgO → 2 Hg + O₂ (zahřátí)"],c:[0,1,3],
  e:"Laboratorní příprava kyslíku je vždy rozklad nějaké kyslíkaté sloučeniny — peroxidu, chlorečnanu, manganistanu nebo oxidu těžkého kovu. Tichý výboj v kyslíku naopak kyslík spotřebovává a vyrábí z něj ozon, takže do výčtu nepatří."},
 {t:"num",q:"Kolik gramů kyslíku obsahuje 2,50 m³ vzduchu za normálních podmínek? Obsah O₂ je 20,95 % objemových, <span class=\"q\">V</span><sub>m</sub> = 22,414 dm³·mol⁻¹, <span class=\"q\">M</span>(O₂) = 32,00 g·mol⁻¹. (Zadejte v&nbsp;gramech, zaokrouhleno na celé gramy.)",
  ans:748, tol:12, unit:"g",
  e:"V(O₂) = 2500 dm³ · 0,2095 = 523,8 dm³; n = 523,8 / 22,414 = 23,37 mol; m = 23,37 · 32,00 = 748 g. Na krychlový metr vychází asi 299 g, takže na 2,5 m³ zhruba tři čtvrtiny kilogramu."}
];

BANK.q3=[
 {t:"single",q:"Který z&nbsp;uvedených oxidů je <b>amfoterní</b>?",
  o:["Na₂O","CO₂","ZnO","N₂O"],c:2,
  e:"Oxid zinečnatý reaguje s kyselinou (ZnO + 2 HCl → ZnCl₂ + H₂O) i se zásadou (ZnO + 2 NaOH + H₂O → Na₂[Zn(OH)₄]). Na₂O je zásadotvorný iontový oxid, CO₂ kyselinotvorný molekulový a N₂O je acidobazicky netečný."},
 {t:"single",q:"Proč je <span class=\"chem\">Mn₂O₇</span> silně kyselinotvorný, ačkoli mangan je kov?",
  o:["Protože mangan je vlastně polokov","Protože je mangan ve velmi vysokém oxidačním čísle, vazba je kovalentní a oxid je molekulový","Protože oxid obsahuje anion O₂²⁻","Protože se rozpouští ve vodě"],c:1,
  e:"O acidobazickém chování nerozhoduje to, jestli je prvek kov, ale povaha vazby. Mangan v +VII k sobě natolik stáhne elektrony, že vazba přestane být iontová; Mn₂O₇ je olejovitá molekulová látka, která s vodou dává kyselinu manganistou. Stejný trend ukazuje řada CrO → Cr₂O₃ → CrO₃."},
 {t:"single",q:"Co vznikne spálením <b>sodíku</b> na vzduchu?",
  o:["Na₂O₂ (peroxid sodný)","Na₂O (oxid sodný)","NaO₂ (superoxid sodný)","NaOH"],c:0,
  e:"Produkt hoření alkalického kovu závisí na velikosti kationtu: lithium dá oxid Li₂O, sodík peroxid Na₂O₂ a draslík, rubidium a cesium superoxidy MO₂. Velký kation stabilizuje velký anion. Hydroxid vzniká až následnou reakcí s vlhkostí, ne přímým hořením."},
 {t:"single",q:"Vůči kterému partnerovi se peroxid vodíku chová jako <b>redukční činidlo</b>?",
  o:["Jodid draselný v kyselém prostředí","Siřičitan sodný","Manganistan draselný v kyselém prostředí","Sulfid olovnatý"],c:2,
  e:"Manganistan je silnější oxidovadlo než peroxid, takže peroxid elektrony odevzdá a jeho kyslík stoupne z −I na 0 — uniká plynný O₂ a fialová barva mizí. Proti jodidu a siřičitanu je naopak peroxid oxidovadlem a jeho kyslík klesá na −II za vzniku vody."},
 {t:"multi",q:"Které z&nbsp;uvedených látek obsahují ve své struktuře motiv <b>−O−O−</b>? Vyberte všechny správné možnosti.",
  o:["H₂O₂","Na₂O₂","H₂S₂O₈","H₂S₂O₇"],c:[0,1,2],
  e:"Peroxidový můstek mají peroxid vodíku, peroxid sodný i kyselina peroxodisírová (odtud předpona peroxo‑). Kyselina disírová H₂S₂O₇ má naproti tomu jen obyčejný kyslíkový můstek −O− a všechny kyslíky v ní mají −II. Rozdíl v jednom atomu kyslíku mění celou chemii."},
 {t:"num",q:"Kolik decimetrů krychlových kyslíku (0 °C, 101,325 kPa) uvolní 250 g superoxidu draselného při reakci s&nbsp;oxidem uhličitým podle rovnice <span class=\"chem\">4 KO₂ + 2 CO₂ → 2 K₂CO₃ + 3 O₂</span>? <span class=\"q\">M</span>(KO₂) = 71,10 g·mol⁻¹, <span class=\"q\">V</span><sub>m</sub> = 22,414 dm³·mol⁻¹. (Zadejte v&nbsp;dm³.)",
  ans:59.1, tol:1.2, unit:"dm³",
  e:"n(KO₂) = 250 / 71,10 = 3,516 mol; poměr KO₂ : O₂ = 4 : 3, tedy n(O₂) = 2,637 mol; V = 2,637 · 22,414 = 59,1 dm³. Nejčastější chyba je použít poměr 1 : 1 a dostat 78,8 dm³ — koeficienty v téhle rovnici je nutné mít správně."}
];

BANK.q4=[
 {t:"single",q:"Jaký je vazebný úhel v&nbsp;molekule <span class=\"chem\">S₈</span> a&nbsp;co z&nbsp;něj plyne?",
  o:["90°, síra se váže čistými orbitaly p","120°, molekula je rovinná","180°, molekula je lineární","108°, blízko tetraedrickému úhlu — proto se osm atomů uzavře do kruhu"],c:3,
  e:"Úhel S–S–S je 108°, tedy velmi blízko tetraedrickému 109,5°. Právě pro tenhle úhel je osmičlenný kruh geometricky nejvýhodnější. Kruh není rovinný, ale zvlněný do tvaru koruny; každý atom má navíc dva volné elektronové páry."},
 {t:"single",q:"Co se stane s&nbsp;taveninou síry mezi 159 a&nbsp;187 °C?",
  o:["Viskozita prudce vzroste, protože se kruhy S₈ otevírají a polymerují na dlouhé řetězce","Viskozita klesne, protože se molekuly rozpadnou","Síra začne vřít","Vznikne plastická síra"],c:0,
  e:"Nad zhruba 159 °C mají kruhy dost energie, aby se otevřely, a jejich konce se spojují do dlouhých řetězců. Zaplétání řetězců zvýší viskozitu o několik řádů s maximem u 187 °C. Vře síra až při 444,6 °C a plastická síra vzniká teprve prudkým ochlazením takové taveniny do vody."},
 {t:"single",q:"Co je <b>přechodová teplota</b> 95,5 °C u&nbsp;síry?",
  o:["Teplota tání kosočtverečné síry","Teplota, při níž se kosočtverečná modifikace mění na jednoklonnou","Teplota, při které se otevírají kruhy S₈","Teplota varu"],c:1,
  e:"Při 95,5 °C jsou obě krystalové modifikace stejně stálé; pod ní je stálejší α, nad ní β. Obě jsou přitom pevné a obě jsou tvořeny stejnými molekulami S₈, liší se jen uspořádáním v mřížce. Teploty tání jsou 112,8 °C (α) a 115,2 °C (β), var při 444,6 °C."},
 {t:"single",q:"Který proces je dnes hlavním zdrojem elementární síry?",
  o:["Těžba Fraschovým způsobem","Pražení pyritu","Redukce sádrovce uhlíkem","Clausův proces při odsiřování ropy a zemního plynu"],c:3,
  e:"Víc než 95 % světové síry vzniká dnes jako vedlejší produkt odsiřování ropy a zemního plynu: třetina sulfanu se spálí na SO₂ a ten pak reaguje se zbytkem H₂S na síru. Poslední Fraschův důl skončil v roce 2000, protože síry z odsíření je nadbytek a je levnější."},
 {t:"multi",q:"Která tvrzení o&nbsp;<b>plastické síře</b> jsou správná? Vyberte všechny správné možnosti.",
  o:["Vzniká prudkým ochlazením horké taveniny do vody","Je to třetí krystalová modifikace síry","Tvoří ji polymerní řetězce atomů síry","Během hodin až dnů přechází zpět na kosočtverečnou síru"],c:[0,2,3],
  e:"Plastická síra je amorfní, tedy nekrystalická — právě proto se nepočítá mezi krystalové modifikace α a β. Vzniká „zmrazením“ dlouhých řetězců při rychlém ochlazení a je termodynamicky nestálá, takže zkrystaluje zpět na α‑síru."},
 {t:"single",q:"Proč se na rozlitou rtuť sype síra?",
  o:["Síra rtuť pohltí jako houba","Síra reaguje s rtutí už za laboratorní teploty na netěkavý sulfid rtuťnatý","Síra sníží povrchové napětí rtuti","Síra rtuť rozpustí"],c:1,
  e:"Rtuť a síra reagují už za pokojové teploty na HgS, což je pevná nerozpustná a netěkavá látka. Nebezpečí rozlité rtuti spočívá právě v jejích parách, a ty se tímhle způsobem odstraní. S většinou ostatních kovů reaguje síra až za zvýšené teploty."}
];
