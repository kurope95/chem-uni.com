/* ============================================================
   31 · BANKA OTÁZEK — kapitoly 5 až 9
   ============================================================ */
BANK.q5=[
 {t:"single",q:"Co vyjadřuje elektronegativita?",
  o:["Schopnost atomu v molekule přitahovat k sobě sdílené elektrony","Energii potřebnou k odtržení elektronu z atomu","Počet elektronů ve valenční vrstvě","Náboj, který atom v iontové sloučenině získá"],c:0,
  e:"Elektronegativita je bezrozměrné číslo (Pauling: F 3,98 až Cs 0,79) popisující „tah“ atomu za sdílený pár uvnitř vazby. Energie na odtržení elektronu je <b>ionizační energie</b> — souvisí s ní, ale je to jiná veličina s jednotkou kJ·mol⁻¹. Oxidační číslo ani počet valenčních elektronů z EN přímo neplynou."},
 {t:"single",q:"Ve vazbě O–H nese parciální náboj δ− …",
  o:["vodík, protože je menší","žádný atom, vazba je nepolární","oba atomy stejně","kyslík, protože má vyšší elektronegativitu (3,44 vs 2,20)"],c:3,
  e:"Sdílený pár se posune k elektronegativnějšímu atomu, tedy ke kyslíku — ten získá δ−, vodík δ+. ΔEN = 1,24, což je jasně polární kovalentní vazba (≈ 32 % iontového charakteru). Velikost atomu s tím přímo nesouvisí; kdyby rozhodovala, byl by δ− na vodíku, což odporuje měření (μ vody míří k kyslíku)."},
 {t:"num",q:"Vypočítejte rozdíl elektronegativit pro vazbu N–H. EN: N = 3,04; H = 2,20. (Zadejte číslo na dvě desetinná místa.)",
  ans:0.84,tol:0.03,unit:"ΔEN",
  e:"ΔEN = 3,04 − 2,20 = <b>0,84</b>. Hodnota leží v pásmu 0,4–1,7, jde tedy o <b>polární kovalentní</b> vazbu (≈ 16 % iontového charakteru). Je to méně než u O–H (1,24) — proto jsou vodíkové můstky N–H···N slabší než O–H···O a amoniak vře o 133 °C níž než voda."},
 {t:"single",q:"Vazba H–F má ΔEN = 1,78, tedy nad hranicí 1,7. Znamená to, že fluorovodík je iontová sloučenina?",
  o:["Ano, HF je iontová sloučenina jako NaCl","Ne — hranice je jen orientační; HF je molekulová látka se silně polární kovalentní vazbou (≈ 55 % iontového charakteru)","Ano, protože fluor je nejelektronegativnější prvek","Ne, protože ΔEN se u vodíku nepočítá"],c:1,
  e:"Hodnoty 0,4 a 1,7 jsou dohodnuté orientační meze, ne přírodní zákon: iontový charakter roste plynule. HF je plyn s teplotou varu 20 °C, tvořený samostatnými molekulami — kdyby byl iontový, měl by mřížku jako NaCl a tál by při stovkách stupňů. Paulingův vztah dává 55 %, tedy zhruba napůl."},
 {t:"multi",q:"Které vazby jsou <b>nepolární kovalentní</b> (ΔEN &lt; 0,4)?",
  o:["C–H (ΔEN 0,35)","C–C (ΔEN 0)","O–H (ΔEN 1,24)","S–H (ΔEN 0,38)","N–H (ΔEN 0,84)"],c:[0,1,3],
  e:"Uhlík a vodík mají téměř stejnou elektronegativitu — proto jsou uhlovodíky nepolární a nemísí se s vodou. Totéž platí pro S–H, a proto sulfan (na rozdíl od vody) netvoří vodíkové můstky. O–H a N–H jsou naopak výrazně polární, což je základ celé chemie vodíkových vazeb."},
 {t:"single",q:"Chlorovodík má μ = 1,08 D a délku vazby 127 pm, z čehož vychází parciální náboj ±0,18 e. Jak to interpretovat?",
  o:["Vazba je z 18 % iontová, elektron je stále převážně sdílený","Na vodíku sedí 18 elektronů","Vazba je z 82 % iontová","Vazba je čistě iontová, protože náboj není nulový"],c:0,
  e:"Kdyby byl přenos úplný, seděl by na atomech celý elementární náboj (1,00 e). Naměřených 0,18 e znamená, že jde o <b>polární kovalentní</b> vazbu s ≈ 18 % iontového charakteru — a hezky to souhlasí s Paulingovým odhadem 21 % z ΔEN = 0,96. Dvě nezávislé metody, stejná odpověď."}
];

BANK.q6=[
 {t:"single",q:"Molekula CO₂ obsahuje dvě silně polární vazby C=O, a přesto je nepolární. Proč?",
  o:["Protože se vazby navzájem ruší chemicky","Protože kyslík a uhlík mají stejnou elektronegativitu","Protože je CO₂ plyn","Protože je molekula lineární a oba dipólové vektory míří přesně proti sobě, takže jejich součet je nulový"],c:3,
  e:"Dipólový moment molekuly je <b>vektorový součet</b> dipólů vazeb. V lineárním uspořádání O=C=O (180°) se dva stejně velké opačně mířící vektory vyruší, i když je každá vazba polární (ΔEN 0,89). Skupenství s polaritou nesouvisí; ΔEN uhlíku a kyslíku rozhodně nulový není."},
 {t:"single",q:"Proč je SO₂ polární, zatímco CO₂ nikoli?",
  o:["Síra má volný elektronový pár, takže je molekula lomená (119°) a dipóly se nevyruší","Vazba S=O je polárnější než C=O","SO₂ má vyšší molární hmotnost","SO₂ obsahuje tři atomy, CO₂ jen dva"],c:0,
  e:"Síra použije na vazby jen čtyři z šesti valenčních elektronů — zbylý volný pár tvoří třetí elektronovou oblast a ohýbá molekulu. Lomený tvar znamená, že se vektory sčítají (μ = 1,63 D). Vazba S=O je přitom <em>méně</em> polární (ΔEN 0,86) než C=O (0,89), takže druhá možnost je nejen nesprávná, ale ukazuje přesně opačným směrem."},
 {t:"single",q:"Které z uvedených tvrzení je <b>nesprávné</b>?",
  o:["Molekula s nepolárními vazbami je vždy nepolární","Molekula s polárními vazbami může být nepolární","Molekula s polárními vazbami je vždy polární","Volný elektronový pár na centrálním atomu obvykle způsobí polaritu molekuly"],c:2,
  e:"Právě to je nejčastější chyba: CCl₄, BF₃, CO₂ a SF₆ mají výrazně polární vazby, ale díky symetrii je jejich celkový dipól nulový. Naopak platí, že bez polárních vazeb polární molekula vzniknout nemůže (výjimkou je jen ozon s nerovnoměrným rozložením elektronů), a volný pár symetrii typicky poruší."},
 {t:"single",q:"Seřaďte správně podle <b>klesajícího</b> dipólového momentu: H₂O, NH₃, HCl, CH₄.",
  o:["NH₃ &gt; H₂O &gt; HCl &gt; CH₄","H₂O &gt; NH₃ &gt; HCl &gt; CH₄","HCl &gt; H₂O &gt; NH₃ &gt; CH₄","CH₄ &gt; H₂O &gt; NH₃ &gt; HCl"],c:1,
  e:"Hodnoty jsou 1,85 &gt; 1,47 &gt; 1,08 &gt; 0 D. Voda vede proto, že má nejpolárnější vazby (ΔEN 1,24) a lomený tvar je sčítá; amoniak má tři méně polární vazby N–H (0,84) v pyramidě; HCl jedinou vazbu; methan je symetrický tetraedr s téměř nepolárními vazbami. Záměna pořadí H₂O a NH₃ je nejčastější chyba — víc vazeb neznamená automaticky větší dipól."},
 {t:"multi",q:"Které molekuly jsou <b>nepolární</b>?",
  o:["CCl₄","BF₃","CHCl₃","SF₆","NH₃"],c:[0,1,3],
  e:"CCl₄ (tetraedr), BF₃ (rovinný trojúhelník) a SF₆ (oktaedr) mají všechny krajní atomy stejné a dokonalou symetrii, takže se dipóly vyruší. CHCl₃ vznikne z CCl₄ výměnou jednoho chloru za vodík — symetrie padne a molekula má μ = 1,04 D. NH₃ je pyramida s volným párem, μ = 1,47 D."},
 {t:"single",q:"Proč se jod (I₂) rozpouští dobře v benzenu, ale špatně ve vodě?",
  o:["Protože je jod pevná látka","Protože je jod těžší než voda","Protože voda s jodem chemicky reaguje","Platí pravidlo „podobné se rozpouští v podobném“: nepolární I₂ se mísí s nepolárním benzenem, ale nemá čím nahradit vodíkové můstky mezi molekulami vody"],c:3,
  e:"Rozpuštění by znamenalo rozbít vodíkové můstky mezi molekulami vody (≈ 20 kJ·mol⁻¹) a nabídnout místo nich jen slabé disperzní interakce s I₂ — energeticky se to nevyplatí. V benzenu se naopak nahrazují disperzní síly disperzními silami. Skupenství ani hustota s rozpustností přímo nesouvisejí."}
];

BANK.q7=[
 {t:"single",q:"Čím se koordinačně kovalentní (dativní) vazba liší od běžné kovalentní vazby?",
  o:["Oba sdílené elektrony pochází od jednoho atomu (donoru), zatímco u běžné vazby dá každý atom jeden","Je vždy slabší než běžná kovalentní vazba","Sdílejí se čtyři elektrony místo dvou","Vzniká přenosem elektronu, ne sdílením"],c:0,
  e:"Liší se pouze <b>původem</b> elektronů — donor s volným párem je poskytne oba, akceptor nabídne prázdný orbital. Výsledná vazba má stejnou délku i energii jako běžná kovalentní; v NH₄⁺ jsou všechny čtyři vazby N–H nerozlišitelné. Přenos elektronu (poslední možnost) je iontová vazba."},
 {t:"single",q:"Co musí mít <b>akceptor</b> při vzniku dativní vazby?",
  o:["Volný elektronový pár","Prázdný orbital vhodné energie","Záporný náboj","Nepárový elektron"],c:1,
  e:"Akceptor přijímá hotový pár, takže potřebuje volné místo — prázdný orbital: H⁺ (1s), bor v BF₃ (2p), kationty přechodných kovů (d, s, p). Volný pár má naopak <b>donor</b>. Náboj podmínkou není: BF₃ je elektroneutrální molekula, a přesto výborný akceptor."},
 {t:"single",q:"Kolik vazeb v iontu NH₄⁺ lze po jeho vzniku experimentálně rozlišit jako „dativní“?",
  o:["Jedna — ta, kterou přišel proton","Dvě","Tři","Žádná — všechny čtyři vazby N–H jsou zcela rovnocenné"],c:3,
  e:"Vznikla sice jedna vazba dativně, ale výsledný ion je pravidelný tetraedr se čtyřmi stejně dlouhými (101 pm) a stejně pevnými vazbami; kladný náboj je rozprostřen po celém iontu. Odpověď „jedna“ je nejlákavější a v testech nejčastější — platí jen pro popis <em>vzniku</em>, ne pro hotový ion."},
 {t:"single",q:"V komplexu [Fe(CN)₆]⁴⁻ je centrálním atomem, ligandem a koordinačním číslem po řadě:",
  o:["Fe²⁺, CN⁻, 6","CN⁻, Fe²⁺, 6","Fe²⁺, CN⁻, 4","Fe³⁺, CN⁻, 6"],c:0,
  e:"Centrální atom je kation kovu uprostřed (zde Fe²⁺, protože 6 · (−1) + x = −4 → x = +2), ligandy jsou částice s volným párem navázané kolem (CN⁻, váže se uhlíkem) a koordinační číslo je jejich počet, tedy 6. Náboj železa se dopočítá z celkového náboje komplexu — proto není Fe³⁺."},
 {t:"multi",q:"Které částice mohou vystupovat jako <b>donor</b> elektronového páru?",
  o:["NH₃","H₂O","H⁺","CN⁻","Cu²⁺"],c:[0,1,3],
  e:"Donorem může být částice s volným elektronovým párem: dusík v amoniaku, kyslík ve vodě, uhlík v kyanidovém aniontu. H⁺ je holý proton bez jediného elektronu a Cu²⁺ má naopak prázdné orbitaly — oba jsou typické <b>akceptory</b> (Lewisovy kyseliny)."},
 {t:"single",q:"Proč je otrava oxidem uhelnatým tak nebezpečná?",
  o:["CO rozpouští hemoglobin","CO reaguje s vodou v plicích na kyselinu","CO se váže dativní vazbou na Fe²⁺ v hemu asi 200× pevněji než kyslík a blokuje tak přenos O₂","CO ničí kovalentní vazby v bílkovinách"],c:2,
  e:"Uhlík v CO má volný elektronový pár a Fe²⁺ v hemu prázdné orbitaly — vzniká tedy stejný typ dativní vazby jako u kyslíku, jen mnohem pevnější. Hemoglobin proto zůstane obsazený a nemůže přenášet O₂. Nejde o rozklad bílkoviny ani o chemickou destrukci vazeb; molekula hemoglobinu je nepoškozená, jen zablokovaná."}
];

BANK.q8=[
 {t:"single",q:"Mezi kterými částicemi působí <b>disperzní (Londonovy) síly</b>?",
  o:["Jen mezi nepolárními molekulami","Mezi všemi částicemi bez výjimky, jen u nepolárních látek jsou jedinou přitažlivou silou","Jen mezi ionty","Jen mezi molekulami obsahujícími vodík"],c:1,
  e:"Elektrony jsou v pohybu ve všech částicích, takže okamžité dipóly a jimi indukované dipóly vznikají vždy — i mezi atomy helia. U polárních látek se k nim jen přidají silnější interakce. Odpověď „jen mezi nepolárními“ je nejlákavější, protože právě tam jsou disperzní síly jediné, ale nikoli jediné místo, kde působí."},
 {t:"single",q:"Fluor a chlor jsou plyny, brom kapalina a jod pevná látka. Čím to je?",
  o:["Rostoucí polaritou molekul","Rostoucím počtem vodíkových můstků","Rostoucí elektronegativitou","Rostoucí polarizovatelností: větší molekula s více elektrony má silnější disperzní síly"],c:3,
  e:"Všechny čtyři molekuly X₂ jsou nepolární (ΔEN = 0), takže dipóly ani vodíkové můstky nepřipadají v úvahu. Rozhoduje počet elektronů — F₂ 18, I₂ 106 — a s ním snadnost deformace obalu. Elektronegativita naopak od F k I <b>klesá</b>, takže by trend vysvětlovala obráceně."},
 {t:"single",q:"Které podmínky musí být splněny, aby vznikla vodíková vazba?",
  o:["Molekula musí být polární","Vodík musí být vázán na F, O nebo N a musí být přitahován k volnému páru dalšího atomu F, O nebo N","Molekula musí obsahovat vodík","Musí jít o kovalentní vazbu s ΔEN nad 1,7"],c:1,
  e:"Potřeba je malý a silně elektronegativní partner — jen F, O a N stáhnou z vodíku dost hustoty a zároveň jsou dost malé, aby se volný pár souseda dostal blízko. Samotná polarita nestačí: HCl je polární (1,08 D), a přesto vodíkové můstky prakticky netvoří, protože chlor je velký a méně elektronegativní."},
 {t:"num",q:"O kolik stupňů Celsia vře fluorovodík (19,5 °C) výš než chlorovodík (−85,0 °C)? (Zadejte rozdíl v °C.)",
  ans:104.5,tol:2,unit:"°C",
  e:"19,5 − (−85,0) = <b>104,5 °C</b>. HF má přitom <em>menší</em> molární hmotnost i méně elektronů než HCl, takže z disperzních sil by měl vřít <b>níž</b>. Celý rozdíl jde na vrub vodíkových můstků F–H···F (≈ 29 kJ·mol⁻¹) — nejsilnějších běžných vodíkových vazeb."},
 {t:"multi",q:"Které interakce patří podle osnovy mezi van der Waalsovy síly?",
  o:["Ion–dipól","Dipól–dipól (Keesomovy)","Dipól–indukovaný dipól (Debyeovy)","Disperzní (Londonovy)","Kovalentní vazba"],c:[0,1,2,3],
  e:"Van der Waalsovy síly jsou souhrnem elektrostatických interakcí mezi částicemi — osnova sem řadí i ion–ion a ion–dipól. Kovalentní vazba mezi ně nepatří: ta vzniká sdílením elektronů, nikoli přitahováním hotových nábojů a dipólů, a je o jeden až dva řády silnější."},
 {t:"single",q:"Proč má o-nitrofenol <b>nižší</b> teplotu varu než p-nitrofenol?",
  o:["Protože je o-nitrofenol menší molekula","Protože p-nitrofenol je iontová sloučenina","Protože si o-nitrofenol tvoří intramolekulární vodíkový můstek sám se sebou, a k sousedním molekulám mu už žádný nezbývá","Protože o-nitrofenol nemá skupinu OH"],c:2,
  e:"Skupiny OH a NO₂ jsou v ortho-poloze tak blízko, že se propojí uvnitř téže molekuly. Intramolekulární můstek tak „spotřebuje“ donor i akceptor a mezimolekulárních můstků vznikne málo → nižší b.v. i horší rozpustnost ve vodě. U para-isomeru jsou skupiny na opačných koncích, můstky proto míří k sousedům. Oba isomery mají shodný souhrnný vzorec, takže velikostí to není."}
];

BANK.q9=[
 {t:"single",q:"Proč led plave na vodě?",
  o:["V ledu tvoří každá molekula čtyři vodíkové můstky do pravidelné, ale řídké sítě s dutinami; při tání se část sítě zhroutí a kapalina je hustší","Protože led obsahuje vzduchové bubliny","Protože se při tuhnutí zkracují vazby O–H","Protože je led chladnější, a proto lehčí"],c:0,
  e:"Hustota ledu je 0,917 g·cm⁻³ proti 1,000 g·cm⁻³ u vody právě kvůli geometrii vodíkových můstků — tetraedrická síť má šestiúhelníkové kanály. Vazby O–H se přitom nemění vůbec. U většiny látek je pevná fáze hustší (pevný benzen se ve své tavenině potopí); voda je výjimka, díky níž rybníky nezamrzají ode dna."},
 {t:"single",q:"Ethanol (b.v. 78 °C), dimethylether (−25 °C) a propan (−42 °C) mají téměř stejnou molární hmotnost. Čím je rozdíl dán?",
  o:["Rozdílnou molární hmotností","Typem mezimolekulárních interakcí: ethanol tvoří vodíkové můstky, ether má jen dipól–dipól a propan jen disperzní síly","Rozdílnou pevností vazeb C–H","Tím, že ethanol obsahuje kyslík, a ten je těžší"],c:1,
  e:"Hmotnosti jsou 46, 46 a 44 g·mol⁻¹, takže disperzní síly mají všechny tři podobné — rozhodne to, co mají navíc. Skupina O–H dělá z ethanolu donora i akceptora můstků; ether má kyslík, ale žádný vodík na něm, takže vlastní můstky netvoří. Kovalentní vazby uvnitř molekul se při varu netrhají vůbec."},
 {t:"single",q:"Co drží pohromadě dva řetězce DNA a proč je to výhodné?",
  o:["Kovalentní vazby mezi bázemi — jsou pevné a šroubovice nemůže selhat","Iontové vazby mezi fosfáty","Vodíkové můstky mezi komplementárními bázemi (A=T dva, G≡C tři) — dost pevné, aby držely, dost slabé, aby šly při replikaci rozplést","Disperzní síly mezi cukry"],c:2,
  e:"Kdyby byly řetězce spojeny kovalentně, žádný enzym by je nerozpletl a replikace by nebyla možná. Vodíkové můstky jsou jednotlivě slabé (10–40 kJ·mol⁻¹), ale v milionech párů drží šroubovici spolehlivě. Právě proto DNA bohatá na G≡C (tři můstky) denaturuje při vyšší teplotě než DNA bohatá na A=T."},
 {t:"single",q:"Proč je grafit měkký a vodivý, zatímco diamant nejtvrdší a nevodivý?",
  o:["Grafit má iontovou vazbu","Grafit obsahuje jiný prvek než diamant","Grafit má kovalentní vrstvy držené mezi sebou jen disperzními silami a čtvrtý elektron delokalizovaný v π systému; diamant má 3D síť σ vazeb a žádné volné elektrony","Diamant má vodíkové můstky navíc"],c:2,
  e:"Oba jsou čistý uhlík — jde o alotropii. Vrstvy grafitu (vzdálené 335 pm) po sobě kloužou, proto tuha píše a maže; delokalizované π elektrony vedou proud podél vrstev. V diamantu jsou všechny čtyři valenční elektrony každého atomu vázány v σ vazbách, takže není co by vedlo a síť nelze odloupnout."},
 {t:"multi",q:"Které vlastnosti vody způsobují vodíkové můstky?",
  o:["Vysoká teplota varu (100 °C místo očekávaných ≈ −80 °C)","Vysoká tepelná kapacita 4,18 J·g⁻¹·K⁻¹","Vysoké povrchové napětí","Nižší hustota ledu než kapalné vody","Skutečnost, že se voda skládá z atomů H a O"],c:[0,1,2,3],
  e:"Všechny čtyři anomálie plynou z toho, že každá molekula může tvořit až čtyři můstky — na jejich rozrušení je potřeba energie (b.v., tepelná kapacita, povrchové napětí) a jejich geometrie dělá led řídkým. Poslední možnost je složení molekuly, které je dáno kovalentními vazbami, ne mezimolekulárními interakcemi."},
 {t:"single",q:"Co se stane s bílkovinou při denaturaci varem?",
  o:["Rozpadne se na jednotlivé aminokyseliny","Rozruší se vodíkové můstky a další slabé interakce, řetězec se rozbalí a ztratí funkci; peptidové vazby zůstanou","Peptidové vazby se změní na iontové","Zvýší se počet disulfidových můstků"],c:1,
  e:"Denaturace ruší sekundární a terciární strukturu (můstky N–H···O=C v α-helixu a β-listu, hydrofobní a iontové interakce), ale primární struktura — kovalentní peptidové vazby — vydrží. Rozpad na aminokyseliny je <b>hydrolýza</b>, chemicky úplně jiný děj vyžadující kyselinu nebo enzym. Uvařené vejce je denaturované, ne rozložené."}
];
