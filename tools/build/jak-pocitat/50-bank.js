/* ============================================================
   40 · BANKA OTÁZEK — kapitoly 00 až 04
   ============================================================ */
BANK.q0 = [
 {t:"single",q:"Který blok výpočtového listu nesmí obsahovat ani jedno číslo?",
  o:["Zadání","Hledáme","Odvození","Dosazení"],c:2,
  e:"Odvození je čistě symbolická úprava vztahů — právě tím odděluje algebru od aritmetiky. Blok „hledáme“ sice také neobsahuje hodnotu, ale obsahuje otazník a jednotku, a hlavně to není jeho definiční vlastnost; u odvození je zákaz čísel celý smysl bloku."},
 {t:"single",q:"Jak přesně se zapisuje blok „hledáme“, když počítáme hmotnost?",
  o:["hledáme hmotnost","m = ? kg","m = ?","m"],c:1,
  e:"Vždycky symbol, rovnítko, otazník <b>a jednotka</b>. Jednotka určuje cíl rozměrové kontroly v bloku dosazení a zároveň zaručí, že ji nezapomenete v odpovědi. Slovní formulace „hledáme hmotnost“ je nedostatečná, protože neříká, v jaké jednotce se odpovídá."},
 {t:"multi",q:"Které z uvedených jsou skutečné důvody, proč se dosazuje až v pátém bloku?",
  o:["Rozměrová kontrola se dá udělat na jediném výrazu","Menší počet příležitostí k překlepu","Výsledek vyjde přesnější, protože se zaokrouhluje jen jednou","Za správné odvození lze dát dílčí body i při chybě v aritmetice","Výpočet je díky tomu kratší na napsání"],c:[0,1,2,3],
  e:"První čtyři důvody platí. Pátý ne — plný výpočtový list je na napsání <b>delší</b> než chaotický zápis; jeho výhoda je v spolehlivosti a bodech, ne v úspoře místa. Kdo šetří psaním, obvykle platí chybami."},
 {t:"single",q:"V zadání je objem 250 cm³. Ve kterém bloku se má převést na dm³?",
  o:["Až v dosazení, jinak se to plete","V odvození, jako součást vzorce","V odpovědi, aby souhlasila jednotka","Hned v zadání, na témž řádku"],c:3,
  e:"Převod patří do prvního bloku: <span class=\"mono\">V = 250 cm³ = 0,250 dm³</span>. Správná hodnota pak stojí přímo před očima po celý zbytek výpočtu. Odkládání převodu na dosazení je nejčastější příčina tisícinásobných chyb."},
 {t:"num",q:"Rozpustíme 2,00 g hydroxidu sodného a doplníme na 250 cm³. Jaká je látková koncentrace roztoku? <span class=\"chem\">M</span>(NaOH) = 40,00 g·mol⁻¹. (Zadejte v mol·dm⁻³ na tři platné číslice.)",
  ans:0.200,tol:0.006,unit:"mol·dm⁻³",
  e:"c = m/(M·V) = 2,00/(40,00·0,250) = <b>0,200 mol·dm⁻³</b>. Kdo zapomene převést 250 cm³ na 0,250 dm³, dostane 0,000200 — přesně tisíckrát méně. Řádová kontrola: 2 g NaOH je dvacetina molu, ta ve čtvrtlitru dává 0,2 mol na litr."},
 {t:"single",q:"Co je hlavní funkcí řádku se zkrácením jednotek v bloku dosazení?",
  o:["Ověřit, že odvozený vztah je správný, ještě před počítáním","Získat bod navíc za úpravnost","Určit počet platných číslic výsledku","Nahradit blok odpovědi"],c:0,
  e:"Když z výrazu po vykrácení vyjde jednotka zapsaná v bloku „hledáme“, je vzorec s velkou pravděpodobností správně; když vyjde jiná, je chyba v odvození a počítat nemá smysl. Platné číslice se z jednotek určit nedají — ty plynou z přesnosti vstupů."}
];

BANK.q1 = [
 {t:"single",q:"Která z uvedených dvojic <b>není</b> totožná?",
  o:["1 dm³ a 1 L","1 cm³ a 1 mL","1 u a 1 Da","1 bar a 1 atm"],c:3,
  e:"1 bar = 100 kPa, kdežto 1 atm = 101,325 kPa — liší se o 1,3 %. Ostatní dvojice jsou přesné rovnosti. Rozdíl bar/atm je důvod, proč se molární objem plynu tabeluje ve dvou různých hodnotách."},
 {t:"num",q:"Kolik cm³ je 0,125 dm³? (Zadejte číslo v cm³.)",
  ans:125,tol:1,unit:"cm³",
  e:"1 dm³ = 1000 cm³, takže 0,125 · 1000 = <b>125 cm³</b>. Předpona se u objemu umocňuje: 1 cm = 10⁻¹ dm, ale 1 cm³ = 10⁻³ dm³. Právě na tuhle třetí mocninu se nejčastěji zapomíná."},
 {t:"single",q:"V jaké jednotce se v chemii tabeluje standardní entropie <span class=\"q\">S</span>°?",
  o:["kJ·mol⁻¹","J·K⁻¹·mol⁻¹","kJ·K⁻¹·mol⁻¹","J·mol⁻¹"],c:1,
  e:"Entropie se tabeluje v <b>joulech</b> na kelvin a mol, kdežto enthalpie v <b>kilojoulech</b> na mol. Ve vzorci ΔG = ΔH − TΔS se tedy jedna z hodnot musí převést, jinak vyjde výsledek o tři řády vedle. To je jedna z nejčastějších chyb v termochemii."},
 {t:"num",q:"Tělesná teplota 37,0 °C odpovídá kolika kelvinům? (Zadejte na dvě desetinná místa.)",
  ans:310.15,tol:0.3,unit:"K",
  e:"T = t + 273,15 = 37,0 + 273,15 = <b>310,15 K</b>. Pozor na rozdíl: <em>rozdíl</em> teplot je v K i v °C stejný, <em>absolutní</em> teplota nikoli. Do stavové rovnice a do Arrheniovy rovnice patří vždy kelviny."},
 {t:"multi",q:"Které zápisy jednotek jsou podle pravidel správné?",
  o:["25 g","5 Mol","100 kPa","J·K⁻¹·mol⁻¹","0,5 dm3"],c:[0,2,3],
  e:"Mezi číslem a jednotkou je mezera, značka molu se píše malým písmenem (<span class=\"mono\">mol</span>), u pascalu je velké P podle jména Pascal a exponenty se sázejí do horního indexu. Zápis „dm3“ místo „dm³“ je v ručním textu tolerovaný, ale v tištěném ne."},
 {t:"single",q:"Relativní molekulová hmotnost <span class=\"q\">M</span><sub>r</sub>(H₂O) = 18,02. Co z toho plyne?",
  o:["Molární hmotnost vody je 18,02 kg·mol⁻¹","Jedna molekula vody váží 18,02 g","M<sub>r</sub> je bezrozměrná a M(H₂O) = 18,02 g·mol⁻¹","Voda obsahuje 18,02 % vodíku"],c:2,
  e:"M<sub>r</sub> je <b>bezrozměrné</b> číslo — kolikrát je molekula těžší než 1 u. Molární hmotnost je číselně stejná, ale má jednotku g·mol⁻¹ (ne kg·mol⁻¹). Jedna molekula váží 18,02/6,022·10²³ ≈ 3,0·10⁻²³ g, tedy nesrovnatelně méně."}
];

BANK.q2 = [
 {t:"single",q:"Chcete převést 3,5 g na miligramy metodou převodního zlomku. Kterým zlomkem násobíte?",
  o:["(1 g / 10³ mg)","(10³ mg / 1 g)","(1 mg / 10³ g)","(10³ g / 1 mg)"],c:1,
  e:"Gramy musí být ve <b>jmenovateli</b>, aby se vykrátily se zadanou hodnotou v gramech. Zbudou miligramy v čitateli: 3,5 g · 10³ mg/g = 3500 mg. Pravidlo je jediné — nechtěná jednotka jde na opačnou stranu zlomkové čáry."},
 {t:"num",q:"Plyn expanduje o 2,50 dm³ proti stálému vnějšímu tlaku 100 kPa. Kolik joulů je součin <span class=\"q\">p</span>·Δ<span class=\"q\">V</span>? (Zadejte v J, bez znaménka.)",
  ans:250,tol:3,unit:"J",
  e:"Platí <span class=\"mono\">1 kPa·dm³ = 1 J</span>, takže 100 · 2,50 = <b>250 J</b>. Ověření: 100 kPa = 10⁵ Pa, 2,50 dm³ = 2,5·10⁻³ m³, součin 250 Pa·m³ = 250 J. Tuhle identitu se vyplatí umět nazpaměť — ušetří v termochemii spoustu převodů."},
 {t:"single",q:"Jakou jednotku dostanete po vykrácení výrazu <span class=\"mono\">m / (M · V)</span>, kde m je v g, M v g·mol⁻¹ a V v dm³?",
  o:["g·dm⁻³","mol·dm³","g²·mol⁻¹·dm⁻³","mol·dm⁻³"],c:3,
  e:"Gramy se vykrátí, <span class=\"mono\">mol⁻¹</span> ve jmenovateli se převrátí na mol v čitateli a dm³ zůstane dole. Vyjde tedy látková koncentrace. Kdyby v zadání byl objem v cm³, jednotka by vyšla stejně — proto rozměrová kontrola neodhalí chybějící převod, jen chybný vzorec."},
 {t:"num",q:"Kolik kilopascalů je 1,00 atm? (Zadejte v kPa na tři desetinná místa nebo zaokrouhleně.)",
  ans:101.325,tol:0.6,unit:"kPa",
  e:"Standardní atmosféra je definována přesně jako <b>101,325 kPa</b>, což je zároveň 760 Torr a 1,01325 bar. Je to definiční hodnota, tedy přesné číslo — počet platných číslic výsledku neomezuje."},
 {t:"multi",q:"Která tvrzení o rozměrové analýze platí?",
  o:["Sčítat lze jen veličiny stejného rozměru","Argument logaritmu musí být bezrozměrný","Rozměrová analýza odhalí i chybu v číselné hodnotě konstanty","Vyjde-li správná jednotka, je vzorec zaručeně správný"],c:[0,1],
  e:"Rozměrová analýza pracuje jen s jednotkami, takže o číselných hodnotách nic neříká — chybu v konstantě neodhalí. A správná jednotka správnost <em>nezaručuje</em>: například <span class=\"mono\">m·M</span> i <span class=\"mono\">m/M·M²</span> mají tutéž jednotku. Je to silná nutná podmínka, ne postačující."},
 {t:"num",q:"Jakou hmotnost má jeden atom uhlíku? <span class=\"q\">A</span><sub>r</sub>(C) = 12,01, <span class=\"q\">N</span><sub>A</sub> = 6,022·10²³ mol⁻¹. (Zadejte v jednotkách 10⁻²⁶ kg, tedy např. „2,50“.)",
  ans:1.994,tol:0.05,unit:"·10⁻²⁶ kg",
  e:"m = M/N<sub>A</sub> = 12,01·10⁻³ kg·mol⁻¹ / 6,022·10²³ mol⁻¹ = <b>1,994·10⁻²⁶ kg</b>. Kontrola druhou cestou: 12,01 · 1,66054·10⁻²⁷ kg = 1,994·10⁻²⁶ kg. Kdo zapomene převést g·mol⁻¹ na kg·mol⁻¹, dostane výsledek o tři řády vedle."},
 {t:"single",q:"Který řetěz převodních zlomků správně vede z gramů vody na počet molekul?",
  o:["· (1 mol / M g) · (N<sub>A</sub> / 1 mol)","· (M g / 1 mol) · (N<sub>A</sub> / 1 mol)","· (1 mol / M g) · (1 mol / N<sub>A</sub>)","· (N<sub>A</sub> / M g)"],c:0,
  e:"Nejdřív se gramy vykrátí molární hmotností ve jmenovateli (zbudou moly), pak se moly vykrátí a zbude počet částic. Druhá varianta by dala g²·mol⁻¹·… a třetí by vedla zpět na mol². Poslední možnost je sice číselně stejná jako správná, ale nedá se z ní vyčíst postup."}
];

BANK.q3 = [
 {t:"single",q:"Jakou hodnotu má molární plynová konstanta <span class=\"q\">R</span> a v jakých jednotkách?",
  o:["96 485 C·mol⁻¹","6,022·10²³ mol⁻¹","8,314 J·K⁻¹·mol⁻¹","1,381·10⁻²³ J·K⁻¹"],c:2,
  e:"R = 8,314 J·K⁻¹·mol⁻¹, což je díky identitě kPa·dm³ = J zároveň 8,314 kPa·dm³·K⁻¹·mol⁻¹. Ostatní nabídnuté hodnoty jsou Faradayova konstanta, Avogadrova konstanta a Boltzmannova konstanta — ta je vlastně R přepočtená na jednu částici (k<sub>B</sub> = R/N<sub>A</sub>)."},
 {t:"num",q:"Vypočtěte součin <span class=\"q\">R</span>·<span class=\"q\">T</span> při 298,15 K. (Zadejte v J·mol⁻¹, zaokrouhleně na jednotky.)",
  ans:2479,tol:8,unit:"J·mol⁻¹",
  e:"8,314 · 298,15 = <b>2479 J·mol⁻¹</b>, tedy asi 2,48 kJ·mol⁻¹. Tuhle hodnotu se vyplatí pamatovat: objevuje se v Nernstově rovnici, v Arrheniově rovnici i ve vztahu ΔG° = −RT ln K, kde jeden řád v K odpovídá RT·ln 10 = 5,71 kJ·mol⁻¹."},
 {t:"single",q:"Zadání uvádí teplotu 25 °C a tlak 100 kPa a ptá se na objem plynu. Kterou hodnotu <span class=\"q\">V</span><sub>m</sub> použijete?",
  o:["24,790 dm³·mol⁻¹","22,414 dm³·mol⁻¹","22,711 dm³·mol⁻¹","V<sub>m</sub> se použít nedá"],c:0,
  e:"25 °C a 100 kPa jsou <b>standardní podmínky</b> (SATP), pro které platí V<sub>m</sub> = 24,790 dm³·mol⁻¹. Hodnota 22,414 patří k normálním podmínkám 0 °C a 101,325 kPa; 22,711 k 0 °C a 100 kPa. Rozdíl mezi 22,4 a 24,8 je 10 %, což je víc než tolerance většiny testů."},
 {t:"num",q:"Odvoďte molární objem plynu při 25 °C a 100 kPa ze stavové rovnice. (Zadejte v dm³·mol⁻¹ na dvě desetinná místa.)",
  ans:24.79,tol:0.15,unit:"dm³·mol⁻¹",
  e:"V<sub>m</sub> = RT/p = 8,314 · 298,15 / 100 = <b>24,79 dm³·mol⁻¹</b>. Jednotky: kPa·dm³·K⁻¹·mol⁻¹ · K / kPa = dm³·mol⁻¹ ✓. Stejným postupem pro 0 °C a 101,325 kPa vyjde 22,41 — obě tabulkové hodnoty jsou tedy jen dosazení do jedné rovnice."},
 {t:"multi",q:"Které veličiny jsou <b>bezrozměrné</b> (jednotka se k nim nepíše)?",
  o:["pH","Relativní atomová hmotnost A<sub>r</sub>","Hmotnostní zlomek w","Rovnovážná konstanta K","Molární hmotnost M"],c:[0,1,2,3],
  e:"Molární hmotnost jako jediná jednotku má, a to g·mol⁻¹. pH je logaritmus poměru, A<sub>r</sub> poměr hmotností, w poměr hmotností a K poměr aktivit vůči standardnímu stavu — proto z K vůbec smíme brát logaritmus."},
 {t:"single",q:"Které tvrzení o Faradayově konstantě je správné?",
  o:["Je to hmotnost jednoho molu elektronů","Je to počet elektronů v jednom molu","Je to náboj jednoho elektronu","Je to náboj jednoho molu elektronů, tedy N<sub>A</sub>·e"],c:3,
  e:"F = N<sub>A</sub> · e = 6,022·10²³ · 1,602·10⁻¹⁹ = 96 485 C·mol⁻¹. Počet elektronů v molu je Avogadrova konstanta, náboj jednoho elektronu je elementární náboj e. Hmotnost molu elektronů je zanedbatelných 0,55 mg."}
];

BANK.q4 = [
 {t:"single",q:"Kolik platných číslic má číslo 0,02500?",
  o:["4","2","3","5"],c:0,
  e:"Nuly před první nenulovou číslicí jen udávají řád a neplatí; nuly za desetinnou čárkou na konci platné jsou. Vědecký tvar 2,500·10⁻² má čtyři číslice mantisy. Právě proto je vědecký tvar jednoznačný a doporučuje se u všech nejednoznačných zápisů."},
 {t:"num",q:"Vypočtěte 12,47 g / 4,5 cm³ a zapište výsledek se správným počtem platných číslic. (Zadejte číslo v g·cm⁻³.)",
  ans:2.8,tol:0.06,unit:"g·cm⁻³",
  e:"Kalkulačka dá 2,77111…, ale při dělení platí pravidlo nejmenšího počtu <b>platných číslic</b>: min(4; 2) = 2. Správně je tedy <b>2,8 g·cm⁻³</b>. Zápis 2,77 by tvrdil přesnost, kterou měření objemu nemá."},
 {t:"single",q:"Jaký je správný výsledek součtu 125,3 g + 0,0472 g?",
  o:["125,35 g","125,3472 g","125,3 g","125 g"],c:2,
  e:"U sčítání se řídíme počtem <b>desetinných míst</b>, ne platných číslic: 125,3 má jedno desetinné místo, takže výsledek také. O setinách nevíme u prvního čísla nic, a výsledek to nesmí předstírat. Zaokrouhlení na 125 by naopak zahodilo informaci, kterou máme."},
 {t:"num",q:"Kolik platných číslic má číslo 0,004070? (Zadejte celé číslo.)",
  ans:4,tol:0.4,unit:"platných číslic",
  e:"Vědecky 4,070·10⁻³ — mantisa má čtyři číslice. Vedoucí nuly se nepočítají, nula uvnitř čísla a koncová nula za desetinnou čárkou ano. Trik na rychlé počítání: přepište si číslo v duchu do vědeckého tvaru a spočítejte číslice mantisy."},
 {t:"multi",q:"Která čísla jsou ve výpočtu <b>přesná</b>, a tedy neomezují počet platných číslic výsledku?",
  o:["Stechiometrický koeficient 2","Převod 1 dm³ = 1000 cm³","Molární hmotnost 55,85 g·mol⁻¹","Definice 1 min = 60 s","Plynová konstanta 8,314"],c:[0,1,3],
  e:"Přesná jsou čísla definovaná nebo spočítaná, ne naměřená. Molární hmotnosti i plynová konstanta jsou <b>naměřené</b> hodnoty s konečným počtem platných číslic — proto se berou aspoň s jednou číslicí navíc, aby výsledek neomezovaly."},
 {t:"single",q:"Proč se zaokrouhluje až v posledním kroku výpočtu?",
  o:["Aby byl výsledek hezčí","Protože se zaokrouhlovací chyby v průběhu výpočtu kumulují","Protože kalkulačka jinak počítá špatně","Aby se ušetřil čas"],c:1,
  e:"Každé mezizaokrouhlení zahodí kus informace a chyby se v dalších krocích násobí. U tříkrokového výpočtu to dokáže posunout výsledek o procenta. Praktické pravidlo: během výpočtu si nechávejte o dvě platné číslice víc, než bude mít odpověď."}
];
