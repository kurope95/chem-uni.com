/* ============================================================
   28 · BANKA OTÁZEK — kapitoly 0–3
   ============================================================ */
BANK.q0=[
 {t:"single",q:"Který pokus vedl k objevu atomového jádra a kdo ho interpretoval?",
  o:["Sternův–Gerlachův pokus s atomy stříbra — Bohr","Ohyb elektronů na krystalu niklu — de Broglie","Katodové paprsky ve vakuové trubici — Thomson","Rozptyl α-částic na zlaté fólii — Rutherford"],c:3,
  e:"Rutherford, Geiger a Marsden (1909–1911) zjistili, že zhruba jedna z 8000 α-částic se od zlaté fólie odrazí zpět — to jde vysvětlit jen tím, že kladný náboj a hmotnost jsou soustředěny v maličkém jádru. Katodové paprsky vedly Thomsona k objevu <b>elektronu</b>, ne jádra."},
 {t:"single",q:"V čem Bohrův model opravil Rutherfordův?",
  o:["Nahradil dráhy orbitaly a pravděpodobností","Zavedl dovolené dráhy s kvantovanou energií, na nichž elektron nevyzařuje","Ukázal, že elektron je vlna a nemá určitou polohu","Zrušil jádro a rozprostřel kladný náboj do celého atomu"],c:1,
  e:"Rutherfordův obíhající elektron by podle klasické fyziky vyzařoval a spadl do jádra. Bohr postuloval stacionární dráhy s energií −13,6 eV/n², na nichž se nezáří, a foton vzniká jen přeskokem. Orbitaly a vlnová povaha přišly až s kvantovou mechanikou (1924–1927)."},
 {t:"num",q:"Vypočítejte vlnovou délku fotonu vyzářeného při přeskoku elektronu v atomu vodíku z hladiny n = 5 na n = 2. R = 1,097·10⁷ m⁻¹. (Zadejte v nanometrech.)",
  ans:434,tol:3,unit:"nm",
  e:"1/λ = 1,097·10⁷ · (1/4 − 1/25) = 1,097·10⁷ · 0,21 = 2,304·10⁶ m⁻¹ → λ = <b>434 nm</b>. Je to čára Hγ Balmerovy série, fialová. Častá chyba je zaměnit n₁ a n₂ a dostat záporné číslo — dolní hladina je vždy vlevo v závorce."},
 {t:"multi",q:"Které výroky o Bohrově modelu jsou pravdivé?",
  o:["Správně vysvětlil čárové spektrum vodíku","Platí pro všechny atomy včetně víceelektronových","Ionizační energie vodíku z něj vychází 13,6 eV","Elektron na dovolené dráze vyzařuje energii","Selhává už u atomu helia"],c:[0,2,4],
  e:"Bohrův model přesně reprodukuje spektrum vodíku a jeho ionizační energii 13,6 eV = 1312 kJ·mol⁻¹, ale funguje jen pro jednoelektronové částice (H, He⁺, Li²⁺) — u helia se dvěma elektrony už selhává. Na dovolených drahách elektron podle postulátu <b>nevyzařuje</b>; to je právě to, co Bohr Rutherfordovi opravil."},
 {t:"single",q:"Balmerova série ve spektru vodíku vzniká přeskoky elektronu…",
  o:["na hladinu n = 1; leží v ultrafialové oblasti","na hladinu n = 3; leží v infračervené oblasti","na hladinu n = 2; leží ve viditelné oblasti (656, 486, 434, 410 nm)","z hladiny n = 2 na vyšší hladiny; leží v ultrafialové oblasti"],c:2,
  e:"Série se pojmenovávají podle <b>dolní</b> hladiny, na kterou elektron skáče: Lymanova (n = 1, UV), Balmerova (n = 2, viditelná), Paschenova (n = 3, IR). Emise = přeskok dolů; přeskok z n = 2 nahoru by byl absorpce, ne vyzáření."},
 {t:"single",q:"Který trojlístek jmen a myšlenek patří ke kvantově-mechanickému modelu atomu?",
  o:["De Broglie — vlnová povaha částic, Schrödinger — vlnová rovnice, Heisenberg — princip neurčitosti","Dalton — atom, Mendělejev — tabulka, Moseley — protonové číslo","Planck — kvantum, Einstein — foton, Bohr — postuláty","Thomson — elektron, Rutherford — jádro, Bohr — hladiny"],c:0,
  e:"QM model stojí na de Broglieho vlně (1924), Schrödingerově rovnici (1926) a Heisenbergově neurčitosti (1927). Thomson, Rutherford a Bohr jsou starší modely; Planck a Einstein připravili kvantovou hypotézu, ale model atomu nevytvořili."}
];

BANK.q1=[
 {t:"single",q:"Co je podle kvantově-mechanického modelu orbital?",
  o:["Elektron sám, popsaný kvantovými čísly","Kulová slupka o poloměru daném Bohrovým vztahem","Dráha, po které elektron obíhá kolem jádra","Oblast prostoru, v níž se elektron vyskytuje s pravděpodobností alespoň 90 %"],c:3,
  e:"Orbital je obrys hustoty pravděpodobnosti |ψ|² zvolený tak, aby v něm byl elektron s pravděpodobností ≥ 90 % (někdy 95 %). Není to dráha — v QM modelu nic neobíhá — a není to elektron; orbital může být i prázdný."},
 {t:"single",q:"Jaký fyzikální význam má druhá mocnina vlnové funkce |ψ|²?",
  o:["Je to energie elektronu v daném bodě","Je to rychlost elektronu","Je to hustota pravděpodobnosti výskytu elektronu (elektronová hustota)","Je to náboj elektronu"],c:2,
  e:"Sama ψ nemá přímý fyzikální význam (může být záporná), ale |ψ|²·dV je pravděpodobnost nalezení elektronu v objemu dV. Energie vychází z řešení Schrödingerovy rovnice jako číslo, ne jako funkce místa."},
 {t:"num",q:"Vypočítejte de Broglieho vlnovou délku elektronu (m = 9,11·10⁻³¹ kg) pohybujícího se rychlostí 5,0·10⁶ m·s⁻¹. h = 6,626·10⁻³⁴ J·s. (Zadejte v pikometrech.)",
  ans:145,tol:3,unit:"pm",
  e:"λ = h/(m·v) = 6,626·10⁻³⁴ / (9,11·10⁻³¹ · 5,0·10⁶) = 6,626·10⁻³⁴ / 4,555·10⁻²⁴ = 1,45·10⁻¹⁰ m = <b>145 pm</b>. To je rozměr atomu — proto se elektron v atomu chová jako vlna. Nezapomeňte převést výsledek z metrů na pikometry (×10¹²)."},
 {t:"multi",q:"Které výroky o orbitalech s a p jsou správné?",
  o:["Orbital s je kulově symetrický","Orbitaly p jsou tři a mají tvar činky","Orbital 1p existuje a je nejnižší orbital p","Orbital p má uzlovou rovinu procházející jádrem","Orbital 2s je menší než 1s"],c:[0,1,3],
  e:"Orbitaly s jsou koule, p jsou tři činky (pₓ, pᵧ, p_z) s uzlovou rovinou v jádru. Orbital 1p neexistuje (l ≤ n − 1, tedy pro n = 1 jen l = 0). S rostoucím n se orbitaly zvětšují, takže 2s je větší než 1s, ne menší."},
 {t:"single",q:"Proč se pojem „dráha elektronu“ v kvantové mechanice opouští?",
  o:["Protože podle Heisenbergova principu nelze současně přesně znát polohu a hybnost — neurčitost rychlosti v atomu je stovky km/s","Protože elektron se pohybuje rychlostí světla","Protože jádro elektron neustále vychyluje","Protože elektron je příliš malý na to, aby se dal pozorovat"],c:0,
  e:"Δx·Δp ≥ h/4π: pro elektron zavřený do atomu (Δx ≈ 10⁻¹⁰ m) vyjde Δv ≈ 6·10⁵ m·s⁻¹, srovnatelná se samotnou rychlostí. Není to otázka přístrojů, ale vlastnost přírody. Elektron se rychlostí světla nepohybuje (v atomu vodíku asi 2·10⁶ m·s⁻¹)."},
 {t:"single",q:"Kolik uzlových ploch má orbital 3s a jaký mají tvar?",
  o:["Jednu rovinnou procházející jádrem","Dvě kulové","Tři kulové","Žádnou — orbital s uzly nemá"],c:1,
  e:"Počet uzlových ploch je n − 1 = 2; u orbitalu s jsou to kulové plochy (u 3s vodíku v 1,9 a 7,1 a₀). Rovinnou uzlovou plochu procházející jádrem mají orbitaly p. Orbital 1s je jediný orbital s bez uzlu."}
];

BANK.q2=[
 {t:"single",q:"Které hodnoty může nabývat vedlejší kvantové číslo l pro n = 4?",
  o:["1, 2, 3, 4","0, 1, 2, 3","0, 1, 2, 3, 4","−4 … +4"],c:1,
  e:"l = 0, 1, …, n − 1, tedy pro n = 4 hodnoty 0, 1, 2, 3 (4s, 4p, 4d, 4f). Hodnota 4 by odpovídala orbitalu 4g, který nesplňuje l ≤ n − 1. Rozsah −l … +l patří magnetickému číslu m_l."},
 {t:"single",q:"Kolik orbitalů obsahuje podslupka d a kolik elektronů pojme?",
  o:["10 orbitalů, 10 elektronů","3 orbitaly, 6 elektronů","5 orbitalů, 10 elektronů","7 orbitalů, 14 elektronů"],c:2,
  e:"Pro d je l = 2, m_l = −2, −1, 0, +1, +2 → 2l + 1 = 5 orbitalů, každý se dvěma elektrony → 10. Tři orbitaly a 6 elektronů má p, sedm a 14 má f."},
 {t:"num",q:"Kolik elektronů maximálně pojme slupka n = 4?",
  ans:32,tol:0,unit:"elektronů",
  e:"2n² = 2 · 16 = <b>32</b>. Slupka N má podslupky 4s (2), 4p (6), 4d (10), 4f (14) = 32 elektronů, tedy n² = 16 orbitalů. Přesně tolik prvků má 6. perioda, v níž se všechny tyto podslupky (spolu s 6s, 5d, 6p) dokončí."},
 {t:"multi",q:"Které trojice (n, l, m_l) popisují existující orbital?",
  o:["(3, 2, −2)","(2, 2, 0)","(1, 0, 0)","(4, 1, +2)","(5, 3, +3)"],c:[0,2,4],
  e:"(3, 2, −2) je jeden z orbitalů 3d, (1, 0, 0) je 1s, (5, 3, +3) je jeden z 5f. (2, 2, 0) by byl orbital 2d — neexistuje, protože l musí být ≤ n − 1 = 1. (4, 1, +2) nesplňuje |m_l| ≤ l: podslupka p má m_l jen −1, 0, +1."},
 {t:"single",q:"Co znamená, že orbitaly jsou degenerované?",
  o:["Mají stejnou energii","Jsou prázdné","Mají stejný tvar, ale různou energii","Jsou obsazeny dvěma elektrony"],c:0,
  e:"Degenerované orbitaly mají stejnou energii — například tři 2p nebo pět 3d (bez vnějšího pole). Právě na ně se vztahuje Hundovo pravidlo. Tvar tři 2p sice sdílejí, ale definice degenerace je o energii, ne o tvaru."},
 {t:"single",q:"Co určuje magnetické kvantové číslo m_l?",
  o:["Spin elektronu","Energii orbitalu","Tvar orbitalu","Orientaci orbitalu v prostoru a počet orbitalů v podslupce"],c:3,
  e:"m_l nabývá 2l + 1 hodnot od −l do +l; každá hodnota je jeden orbital s určitou orientací (pₓ, pᵧ, p_z). Energii řídí n (a l), tvar řídí l, spin popisuje m_s."}
];

BANK.q3=[
 {t:"single",q:"Jaké hodnoty může nabývat spinové kvantové číslo m_s?",
  o:["−1, 0, +1","Libovolnou hodnotu od −1 do +1","0 nebo 1","+½ nebo −½"],c:3,
  e:"Spin elektronu má jen dvě orientace, +½ a −½ (šipky ↑ a ↓). Sternův–Gerlachův pokus to ukázal přímo: svazek atomů stříbra se v nehomogenním poli rozdělil na přesně dva, ne na spojitý pás."},
 {t:"single",q:"Který rámeček porušuje Pauliho vylučovací princip?",
  o:["[↑↓]","[↑]","[↑↑]","[ ]"],c:2,
  e:"Dva elektrony v jednom orbitalu mají shodná n, l, m_l, takže se musí lišit spinem — [↑↑] má oba stejný spin, a tedy všechna čtyři kvantová čísla stejná, což Pauli zakazuje. [↑↓] je elektronový pár, [↑] nepárový elektron, [ ] prázdný orbital: vše dovolené."},
 {t:"single",q:"Který z iontů je paramagnetický? Zn²⁺, Cu⁺, Cu²⁺, Sc³⁺",
  o:["Sc³⁺ ([Ar])","Cu²⁺ ([Ar] 3d⁹)","Zn²⁺ ([Ar] 3d¹⁰)","Cu⁺ ([Ar] 3d¹⁰)"],c:1,
  e:"Paramagnetická je částice s nepárovým elektronem. Zn²⁺ i Cu⁺ mají zaplněné 3d¹⁰ (vše spárované), Sc³⁺ má konfiguraci argonu. Cu²⁺ má 3d⁹, tedy jeden nepárový elektron — proto jsou měďnaté soli modré a paramagnetické, měďné bezbarvé."},
 {t:"num",q:"Kolik nepárových elektronů má atom fosforu (Z = 15) v základním stavu?",
  ans:3,tol:0,unit:"elektrony",
  e:"P: [Ne] 3s² 3p³. Tři elektrony v 3p se podle Hundova pravidla rozmístí po jednom do tří orbitalů se stejným spinem: [↑][↑][↑] → <b>3 nepárové</b>. Odtud vaznost 3 (PH₃, PCl₃). Kdo napíše [↑↓][↑][ ], porušil Hundovo pravidlo."},
 {t:"multi",q:"Co přímo plyne z Pauliho vylučovacího principu?",
  o:["V jednom orbitalu jsou nejvýš dva elektrony","Elektrony v jednom orbitalu mají opačný spin","Podslupka p pojme nejvýš 6 elektronů","Elektrony obsazují degenerované orbitaly nejdřív po jednom","Slupka n pojme nejvýš 2n² elektronů"],c:[0,1,2,4],
  e:"Pauli omezuje obsazení orbitalu na dva elektrony s opačným spinem, a tím dává kapacity podslupek (s 2, p 6, d 10, f 14) i slupek (2n²). Obsazování degenerovaných orbitalů po jednom je <b>Hundovo</b> pravidlo — jiný princip."},
 {t:"single",q:"Proč zůstane kapalný kyslík viset mezi póly magnetu, zatímco kapalný dusík proteče?",
  o:["Molekula O₂ má dva nepárové elektrony (paramagnetická), N₂ má všechny spárované (diamagnetická)","Kyslík je iontová látka","Dusík má vyšší teplotu varu","Kyslík je těžší než dusík"],c:0,
  e:"Paramagnetismus = nepárové elektrony. O₂ má podle teorie molekulových orbitalů dva nepárové elektrony (je biradikál), N₂ žádný. Hustota ani bod varu s magnetismem nesouvisejí; ani jedna látka není iontová."}
];
