/* ============================================================
   30 · BANKA OTÁZEK — kapitoly 0 až 4
   ============================================================ */
BANK.q0=[
 {t:"single",q:"Podle čeho se od sebe zásadně liší kovová, iontová a kovalentní vazba?",
  o:["Podle toho, jak jsou atomy daleko od sebe","Podle toho, jestli vzniká plyn, nebo pevná látka","Podle toho, komu patří valenční elektrony — všem, jednomu, nebo dvojici atomů","Podle toho, kolik energie se při vzniku uvolní"],c:2,
  e:"Všechny tři jsou elektrostatické přitahování jader a elektronů; liší se osudem valenčních elektronů: v kovu jsou delokalizované po celém krystalu, v iontové vazbě přenesené na jeden atom, v kovalentní sdílené mezi dvěma. Energie (poslední možnost) je sice u každého typu jiná, ale pásma se překrývají — iontová 600–4000, kovalentní 150–1000 kJ·mol⁻¹ — takže podle ní typ určit nelze."},
 {t:"single",q:"Co znamená <b>minimum</b> na křivce potenciální energie dvou atomů?",
  o:["Že se atomy začínají odpuzovat","Že vazba se právě rozpadla","Že je při této vzdálenosti soustava nejstabilnější — je to délka vazby","Že energie soustavy je nulová"],c:2,
  e:"Dno důlku je vzdálenost, při níž je energie soustavy nejnižší, tedy rovnovážná <b>délka vazby</b> (u H₂ 74 pm). Nulová energie je naopak stav <em>volných atomů</em> v nekonečné vzdálenosti — proto je energie ve dnu záporná a její velikost je vazebná energie. Odpuzování jader nastává až <em>vlevo</em> od minima."},
 {t:"multi",q:"Které interakce patří podle osnovy mezi <b>silné</b> (chemické vazby)?",
  o:["Kovová vazba","Iontová vazba","Kovalentní vazba","Vodíková vazba","Disperzní síly"],c:[0,1,2],
  e:"Silné interakce jsou tři chemické vazby, typicky stovky až tisíce kJ·mol⁻¹. Vodíková vazba (10–40) a disperzní síly (0,05–40) patří mezi slabé mezimolekulové interakce — jsou zhruba o řád až dva slabší a molekulu nemění. Vodíková vazba bývá zaměňována právě proto, že má v názvu slovo „vazba“."},
 {t:"single",q:"Proč voda vře už při 100 °C, ale nerozkládá se na vodík a kyslík ani při 2000 °C?",
  o:["Protože vazby O–H jsou při varu jen oslabené","Protože se při varu mění tlak, ne teplota","Protože se voda při varu mění na jinou látku","Při varu se rozrušují jen slabé vodíkové můstky mezi molekulami, kovalentní vazby O–H zůstávají celé"],c:3,
  e:"Var je fázová změna: molekuly se od sebe oddělí, ale zůstanou celé — trhají se jen mezimolekulové můstky (≈ 20 kJ·mol⁻¹). Rozklad by znamenal trhat kovalentní vazby O–H (463 kJ·mol⁻¹), tedy dvacetkrát víc energie. První možnost je nejlákavější, ale vazba O–H se při varu neoslabí nijak — pára je stále H₂O."},
 {t:"single",q:"Látka taje při 801 °C, pevná nevede proud, tavenina vede, ve vodě se dobře rozpouští a krystal se při úderu rozštípne. O jaký typ vazby jde?",
  o:["Iontovou","Kovovou","Kovalentní molekulovou","Kovalentní atomovou (síť)"],c:0,
  e:"Kombinace „nevede pevná, vede tavenina + křehkost + rozpustnost ve vodě“ je jednoznačný podpis iontové vazby (je to NaCl). Kov by vedl i v pevném stavu a byl by kujný, atomový krystal by nevedl nikdy a nerozpustil se, molekulová látka by tála mnohem níž."},
 {t:"single",q:"Která dvojice prvků spolu vytvoří vazbu s <b>největším</b> iontovým charakterem?",
  o:["C a O","H a F","K a F","N a H"],c:2,
  e:"Rozhoduje rozdíl elektronegativit: K–F má ΔEN = 3,98 − 0,82 = 3,16 (≈ 92 % iontového charakteru). H–F má sice vysokou ΔEN 1,78, ale to je jen ≈ 55 % — HF je stále molekulová látka, plyn. C–O (0,89) a N–H (0,84) jsou běžné polární kovalentní vazby."}
];

BANK.q1=[
 {t:"single",q:"Co drží pohromadě krystal mědi?",
  o:["Sdílené elektronové páry mezi sousedními atomy Cu","Přitažlivost mezi kationty Cu a delokalizovanými valenčními elektrony","Přitažlivost mezi kationty Cu²⁺ a anionty Cu²⁻","Vodíkové můstky mezi atomy mědi"],c:1,
  e:"V kovu každý atom uvolní valenční elektrony do společného „elektronového plynu“, který stíní a spojuje kladné kationty. Sdílené páry (první možnost) by znamenaly kovalentní vazbu — na to ale měď nemá dost valenčních elektronů: na 12 sousedů má jediný elektron. Anionty kovu v krystalu neexistují."},
 {t:"single",q:"Proč je měď kujná, zatímco chlorid sodný křehký?",
  o:["Měď má nižší teplotu tání","Elektronový plyn drží kationty stejně i po posunu vrstvy; v iontovém krystalu se posunem dostanou stejné náboje proti sobě","Měď je měkčí prvek a nemá krystalovou mřížku","V mědi jsou vazby silnější, takže se nepřetrhnou"],c:1,
  e:"Kovová vazba je <b>nesměrová</b> — po posunu vrstvy má každý kation kolem sebe stejný elektronový plyn a nic se neporuší. V NaCl posun přivede Na⁺ nad Na⁺ a Cl⁻ nad Cl⁻, odpuzování krystal rozštípne. Síla vazby (poslední možnost) s tím nesouvisí: mřížková energie NaCl (787) je větší než atomizační enthalpie mědi (338 kJ·mol⁻¹), a přesto je sůl křehká."},
 {t:"multi",q:"Které vlastnosti kovů vysvětluje přímo existence <b>delokalizovaných elektronů</b>?",
  o:["Elektrická vodivost","Tepelná vodivost","Lesk a neprůhlednost","Křehkost","Rozpustnost ve vodě"],c:[0,1,2],
  e:"Volné elektrony vedou proud (drift v poli), přenášejí kinetickou energii (teplo) a pohlcují i vyzařují světlo libovolné vlnové délky (lesk, neprůhlednost). Křehkost kovy naopak nemají — jsou kujné. Kovy se ve vodě nerozpouštějí, protože voda nemá čím elektronový plyn nahradit."},
 {t:"single",q:"Jak se změní elektrická vodivost kovu při zahřátí a proč?",
  o:["Vzroste, protože se uvolní další elektrony","Nezmění se, počet nosičů je stálý","Klesne — kationty silněji kmitají a častěji rozptylují letící elektrony","Klesne, protože se část elektronů naváže zpět na kationty"],c:2,
  e:"Počet volných elektronů je v kovu daný a s teplotou se prakticky nemění; roste ale rozptyl na kmitajících kationtech, takže odpor stoupá. Uvolňování nových nosičů teplem (první možnost) je chování <b>polovodičů</b>, u nichž vodivost s teplotou naopak roste — právě v tom se kovy a polovodiče liší."},
 {t:"single",q:"Proč má wolfram teplotu tání 3422 °C, zatímco sodík jen 98 °C?",
  o:["Wolfram má jiný typ vazby než sodík","Sodík má větší atomovou hmotnost","Sodík není pravý kov","Wolfram dává do elektronového plynu mnohem víc elektronů na atom a má menší kationty, takže je kovová vazba mnohem pevnější"],c:3,
  e:"Síla kovové vazby roste s počtem delokalizovaných elektronů na atom (Na 1, W zapojuje i d-elektrony) a klesá s velikostí kationtu. Odpovídá tomu i atomizační enthalpie: Na 107, W 849 kJ·mol⁻¹. Typ vazby je u obou stejný — kovová; právě proto je chybné tvrdit, že „kovy mají vysoké teploty tání“ bez výhrady (rtuť je kapalná)."},
 {t:"single",q:"Mosaz (slitina Cu a Zn) je tvrdší než čistá měď, ale vede proud hůř. Proč?",
  o:["Atomy zinku v mřížce brzdí posun vrstev a zároveň rozptylují elektrony","Zinek nemá kovovou vazbu","Ve slitině vznikají mezi Cu a Zn kovalentní vazby","Slitina obsahuje méně valenčních elektronů než čistá měď"],c:0,
  e:"Cizí atomy mají jinou velikost, takže působí jako zarážky pro klouzající vrstvy (tvrdost roste, kujnost klesá) a jako překážky pro elektrony (vodivost klesá). Kovalentní vazby ve slitině nevznikají — slitina je pořád kov s elektronovým plynem, jen se dvěma druhy kationtů v mřížce."}
];

BANK.q2=[
 {t:"single",q:"Které tvrzení o pevném chloridu sodném je <b>správné</b>?",
  o:["Skládá se z molekul NaCl spojených slabými silami","Každý ion Na⁺ je vázán k jednomu konkrétnímu iontu Cl⁻","Obsahuje atomy Na a Cl spojené polární kovalentní vazbou","Je to nekonečná mřížka iontů, v níž má každý Na⁺ šest sousedů Cl⁻ a naopak"],c:3,
  e:"V iontovém krystalu neexistují molekuly — vzorec NaCl udává jen <b>poměr</b> iontů (vzorcová jednotka) a koordinační číslo je 6. Představa dvojice Na–Cl je nejčastější chyba; platí jen pro plynnou fázi nad 1400 °C. Kovalentní vazba je vyloučena rozdílem elektronegativit 2,23."},
 {t:"single",q:"Proč je vznik NaCl z prvků energeticky výhodný, když ionizace sodíku (+496 kJ·mol⁻¹) stojí víc, než kolik vrátí elektronová afinita chloru (−349 kJ·mol⁻¹)?",
  o:["Protože se uvolní obrovská mřížková energie při seskládání iontů do krystalu (−787 kJ·mol⁻¹)","Protože se ionizace sodíku ve skutečnosti neuskuteční","Protože chlor přijme dva elektrony","Protože reakce probíhá za vysoké teploty"],c:0,
  e:"Bilance vzniku volného páru iontů v plynu je +147 kJ·mol⁻¹, tedy nevýhodná — celou reakci zachrání až mřížková energie. Právě proto vznikají iontové <em>krystaly</em>, a ne izolované iontové páry. Chlor přijímá jen jeden elektron (dosáhne oktetu konfigurace argonu)."},
 {t:"num",q:"Vypočítejte vzdálenost středů iontů (součet iontových poloměrů) v KCl. Poloměry: K⁺ 138 pm, Cl⁻ 181 pm. (Zadejte v pikometrech.)",
  ans:319,tol:2,unit:"pm",
  e:"d = r₊ + r₋ = 138 + 181 = <b>319 pm</b>. Tohle číslo dosazujete do Coulombova vztahu E ∝ z₊z₋/d. Pro srovnání: NaCl má 283 pm, a proto větší mřížkovou energii (787 vs 715 kJ·mol⁻¹) i vyšší teplotu tání (801 vs 770 °C) — větší ionty znamenají slabší mřížku."},
 {t:"single",q:"Kdy vede chlorid sodný elektrický proud a proč?",
  o:["Vždy, protože obsahuje ionty","Nikdy, protože nemá volné elektrony","V tavenině a ve vodném roztoku — teprve tam jsou ionty pohyblivé","Jen v pevném stavu, kde jsou ionty pravidelně uspořádané"],c:2,
  e:"Nosiče náboje (ionty) jsou v NaCl přítomné vždy, ale v pevném krystalu jsou <b>fixované</b> v mřížce a nemohou putovat k elektrodám. Roztavením nebo rozpuštěním se uvolní a proud teče — s tím rozdílem oproti kovu, že se přitom látka na elektrodách rozkládá (elektrolýza). Odpověď „vždy“ je nejlákavější a nejčastější chyba."},
 {t:"multi",q:"Které vlastnosti jsou typické pro látky s iontovou vazbou?",
  o:["Vysoké teploty tání","Tvrdost spojená s křehkostí","Rozpustnost v polárních rozpouštědlech","Kujnost a tažnost","Vodivost v pevném stavu"],c:[0,1,2],
  e:"Silná nesměrová elektrostatická vazba dává vysoké b.t. a tvrdost, ale posun vrstvy krystal rozštípne (křehkost). Ve vodě se ionty hydratují a látka se rozpouští. Kujnost a vodivost pevné látky jsou naopak znaky <b>kovů</b> — právě tyto dvě dvojice se v testech nejčastěti zaměňují."},
 {t:"single",q:"MgO má mřížkovou energii 3791 kJ·mol⁻¹, NaCl jen 787 kJ·mol⁻¹. Co je hlavní příčinou?",
  o:["MgO má větší ionty než NaCl","Hořčík je reaktivnější kov než sodík","MgO má obě ionty dvojnásobně nabité (2+ a 2−) a navíc menší, takže součin z₊z₋ je 4× větší při kratší vzdálenosti","MgO má jiný typ krystalové mřížky"],c:2,
  e:"Coulombův zákon: E ∝ z₊z₋/(r₊+r₋). Náboje 2·2 = 4 místo 1·1 = 1 a vzdálenost 212 místo 283 pm dají odhad ≈ 5,3násobku, což hodně přesně odpovídá poměru 4,8. Ionty MgO jsou naopak <b>menší</b>, ne větší, a typ mřížky je u obou stejný (oba mají koordinační číslo 6)."}
];

BANK.q3=[
 {t:"single",q:"Jak vzniká kovalentní vazba?",
  o:["Přenosem elektronu z jednoho atomu na druhý","Překryvem orbitalů s nepárovými elektrony opačného spinu a sdílením vzniklého páru","Uvolněním valenčních elektronů do společného fondu","Přitažlivostí mezi dvěma dipóly"],c:1,
  e:"Ve sdíleném prostoru mezi jádry se zvýší elektronová hustota, kterou obě kladná jádra přitahují — proto je vazba <b>směrová</b>. Přenos elektronu (první možnost) je iontová vazba, společný fond kovová a přitažlivost dipólů je slabá mezimolekulová interakce, ne chemická vazba."},
 {t:"single",q:"Kolik volných (nevazebných) elektronových párů má centrální atom v molekule vody?",
  o:["Žádný","Jeden","Dva","Čtyři"],c:2,
  e:"Kyslík má 6 valenčních elektronů; dva použije na vazby s vodíky, zbylé čtyři tvoří <b>dva volné páry</b>. Právě ony ohýbají molekulu na 104,5° a dělají ji polární — a zároveň slouží jako akceptory vodíkových můstků. Odpověď „jeden“ platí pro dusík v amoniaku."},
 {t:"single",q:"Ve které z uvedených molekul <b>není</b> splněno oktetové pravidlo u centrálního atomu?",
  o:["CH₄","H₂O","NH₃","BF₃"],c:3,
  e:"Bor v BF₃ má kolem sebe jen 6 elektronů (tři vazebné páry) — je elektronově deficitní, a proto ochotně přijme volný pár od donoru (Lewisova kyselina). Uhlík v CH₄ má 8 (4 vazebné páry), kyslík ve vodě 8 (2 vazebné + 2 volné), dusík v NH₃ také 8 (3 vazebné + 1 volný)."},
 {t:"single",q:"Diamant taje při ≈ 3550 °C, methan vře při −162 °C. Obě látky mají čistě kovalentní vazby. Čím je rozdíl dán?",
  o:["V diamantu tvoří kovalentní vazby nekonečnou 3D síť, u methanu jsou jen uvnitř malých molekul, které drží pohromadě slabé disperzní síly","Vazby C–C jsou pevnější než vazby C–H","Diamant má iontový charakter vazby","Methan je plyn, a proto nemá vazby"],c:0,
  e:"Rozhoduje <b>dosah</b> sítě, ne typ vazby. Roztavit diamant znamená trhat kovalentní vazby v celém krystalu; odpařit methan znamená jen překonat disperzní síly mezi molekulami (≈ 2 kJ·mol⁻¹). Rozdíl v energii vazeb C–C (348) a C–H (413 kJ·mol⁻¹) je proti tomu zanedbatelný."},
 {t:"multi",q:"Které látky patří mezi <b>atomové (kovalentní) krystaly</b>?",
  o:["Diamant","SiO₂ (křemen)","Jod I₂","SiC (karbid křemíku)","Suchý led CO₂"],c:[0,1,3],
  e:"Atomový krystal je jedna obří molekula s kovalentní sítí ve všech směrech — proto je tvrdý, nevodivý a taje nad 1500 °C. Jod a suchý led jsou naopak <b>molekulové</b> látky: uvnitř molekul kovalentní vazby, mezi molekulami jen disperzní síly, a proto sublimují (I₂ při 184 °C, CO₂ při −78 °C)."},
 {t:"single",q:"Vodný roztok chlorovodíku vede elektrický proud, plynný chlorovodík ne. Proč?",
  o:["Ve vodě se vazba H–Cl mění na kovovou","Voda sama o sobě dobře vede proud","Ve vodě proběhne reakce HCl + H₂O → H₃O⁺ + Cl⁻ a vzniknou pohyblivé ionty","Plynný HCl nemá polární vazbu"],c:2,
  e:"Molekula HCl je polární (μ = 1,08 D), ale v plynu jsou to stále elektroneutrální molekuly — nosiče náboje chybí. Ve vodě dojde k <b>disociaci</b> na ionty, a teprve ty proud vedou. Čistá voda vede jen nepatrně (autoprotolýza), takže druhá možnost rozdíl nevysvětlí. Naopak roztok cukru — který se rozpouští, ale nedisociuje — proud nevede."}
];

BANK.q4=[
 {t:"single",q:"Kde leží elektronová hustota u vazby <b>π</b>?",
  o:["Přímo na spojnici jader, rotačně symetricky","Nad a pod spojnicí jader; na spojnici samotné je nulová","Rovnoměrně kolem obou jader jako u orbitalu s","Jen u elektronegativnějšího atomu"],c:1,
  e:"Vazba π vzniká <b>bočním</b> překryvem rovnoběžných p-orbitalů, takže hustota sedí nad a pod osou a v rovině procházející jádry je uzel. Hustota na spojnici (první možnost) je popis vazby <b>σ</b> z čelního překryvu. Posun k elektronegativnějšímu atomu je věc polarity, ne typu vazby."},
 {t:"single",q:"Kolik vazeb σ a π obsahuje molekula dusíku N₂?",
  o:["3 σ","2 σ + 1 π","1 σ + 2 π","1 σ + 1 π"],c:2,
  e:"Trojná vazba je vždy jedna σ (čelní překryv p-orbitalů podél osy) a dvě π (boční překryv zbylých dvou dvojic p-orbitalů, navzájem kolmých). Pravidlo zní: <b>první vazba mezi dvěma atomy je vždy σ, každá další je π</b>. Tři σ vazby mezi dvěma atomy vzniknout nemohou — orbitaly by se musely překrývat čelně třikrát."},
 {t:"num",q:"Odhadněte energii vazby π v ethenu, víte-li, že E(C–C) = 348 a E(C=C) = 614 kJ·mol⁻¹. (Zadejte v kJ·mol⁻¹.)",
  ans:266,tol:6,unit:"kJ·mol⁻¹",
  e:"Dvojná vazba je σ + π, a σ v ní odpovídá zhruba jednoduché vazbě: E(π) ≈ 614 − 348 = <b>266 kJ·mol⁻¹</b>. Je to méně než 348, tedy π je slabší než σ — a právě proto alkeny podléhají adici: obětují slabou π a získají dvě pevné σ vazby."},
 {t:"single",q:"Proč existuje cis- a trans-but-2-en, ale ne cis- a trans-butan?",
  o:["Butan má příliš malou molekulu","Kolem dvojné vazby není možná volná rotace, protože by se přetrhla π vazba; kolem jednoduché σ vazby rotace volně probíhá","Butan je plyn a isomery se v plynu netvoří","Dvojná vazba je delší, a proto umožňuje dvě uspořádání"],c:1,
  e:"Otočení kolem C=C o 90° by rozvedlo rovnoběžné p-orbitaly a zrušilo překryv — to stojí 266 kJ·mol⁻¹, takže se za pokojové teploty nestane. Kolem jednoduché vazby se σ překryv otočením nezmění, konformace se volně mění a isomery nevznikají. Dvojná vazba je navíc <b>kratší</b> (134 vs 154 pm), ne delší."},
 {t:"single",q:"Vazba C≡C má energii 839 kJ·mol⁻¹, vazba C–C 348 kJ·mol⁻¹. Co z toho plyne?",
  o:["Trojná vazba je přesně třikrát pevnější","Přírůstek každé další vazby je menší než 348, protože π vazby jsou slabší než σ","Druhá a třetí vazba jsou pevnější než první","Vazebné energie nelze takto porovnávat"],c:1,
  e:"Kdyby platila úměrnost, vyšlo by 3 · 348 = 1044 kJ·mol⁻¹; skutečnost je 839. Přírůstky jsou +266 a +225 — každá další (π) vazba přidá méně, protože boční překryv je menší než čelní. Tvrzení o trojnásobné pevnosti je klasická chyba, na kterou testy cílí."},
 {t:"multi",q:"Které vztahy mezi násobností a vlastnostmi vazby platí?",
  o:["S rostoucí násobností se vazba zkracuje","S rostoucí násobností roste vazebná energie","S rostoucí násobností roste možnost volné rotace","Násobná vazba obsahuje vždy právě jednu vazbu σ","Dvojná vazba má dvě vazby π"],c:[0,1,3],
  e:"Více sdílených párů táhne jádra k sobě (C–C 154 → C=C 134 → C≡C 120 pm) a zvyšuje energii (348 → 614 → 839). První vazba je vždy σ, další jsou π — dvojná má tedy jednu π, ne dvě. Rotace se s násobností naopak <b>blokuje</b>, protože by se π vazba přetrhla."}
];
