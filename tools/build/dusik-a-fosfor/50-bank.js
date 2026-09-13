/* ============================================================
   25 · BANKA OTÁZEK — kapitolové mini-testy k0 až k4
   Poznámka: v možnostech se nikdy nepoužívá zvýraznění,
   aby neprozradilo správnou odpověď.
   ============================================================ */

BANK.q0 = [
 {t:"single", q:"Jakou valenční elektronovou konfiguraci mají prvky skupiny 15?",
  o:["ns² np⁵","ns² np⁴","ns² np³","ns¹ np⁴"], c:2,
  e:"Pět valenčních elektronů se rozdělí na zaplněný orbital s a tři nepárové elektrony v orbitalech p. Právě odtud plynou tři jednoduché vazby a jeden volný elektronový pár. Konfigurace ns²np⁵ patří halogenům a ns²np⁴ chalkogenům."},
 {t:"single", q:"Proč existuje <span class=\"chem\">PCl₅</span>, ale <span class=\"chem\">NCl₅</span> ne?",
  o:["Dusík je malý a jeho valenční sféru tvoří jen orbitaly 2s a 2p, takže nezvládne víc než čtyři vazebné páry","Chlor je pro dusík příliš elektronegativní","Dusík má o dva valenční elektrony méně než fosfor","Sloučenina NCl₅ existuje, jen je velmi nestálá"], c:0,
  e:"Valenční sféra dusíku má jen čtyři orbitaly, takže se do ní pátý vazebný pár nevejde. Fosfor je větší a má energeticky dostupné orbitaly 3d, proto dosáhne vaznosti 5 i 6. Počet valenčních elektronů je u obou prvků stejný — pět — takže na tom rozdíl nestojí."},
 {t:"single", q:"Jaké oxidační číslo má fosfor v&nbsp;kyselině fosforité <span class=\"chem\">H₃PO₃</span>?",
  o:["+I","+V","−III","+III"], c:3,
  e:"Tři vodíky dávají +III, tři kyslíky −VI, součet musí být nula, takže x = +III. Hodnota +V by odpovídala kyselině fosforečné a +I kyselině fosforné. Nezaměňujte oxidační číslo se sytností — kyselina fosforitá je dvojsytná."},
 {t:"single", q:"Kolikasytná je kyselina fosforná <span class=\"chem\">H₃PO₂</span> a&nbsp;proč?",
  o:["Trojsytná, protože má ve vzorci tři vodíky","Jednosytná, protože jen jeden vodík sedí na kyslíku","Dvojsytná, protože fosfor má oxidační číslo +I","Není to kyselina, ale zásada"], c:1,
  e:"Ve strukturním vzorci sedí dva vodíky přímo na fosforu a odštěpit se nedají; kyselá je jen skupina OH. Sytnost se proto určuje ze struktury, ne ze sumárního vzorce. Vzniká jediná řada solí — fosfornany s aniontem H₂PO₂⁻."},
 {t:"multi", q:"Které z uvedených tvrzení o&nbsp;vaznosti a&nbsp;oxidačním čísle <b>platí</b>?",
  o:["V NH₄⁺ má dusík vaznost 4 a oxidační číslo −III","V H₃PO₂ má fosfor vaznost 4 a oxidační číslo +I","Vaznost a oxidační číslo jsou vždycky stejné","V PCl₅ má fosfor vaznost 5 a oxidační číslo +V"], c:[0,1,3],
  e:"Vaznost je počet vazeb σ, oxidační číslo je formální náboj — dvě různé veličiny. V amonném kationtu i v kyselině fosforné je vaznost stejná, 4, ale oxidační čísla se zcela liší, protože záleží na tom, jestli vazby míří na elektronegativnějšího, nebo elektropozitivnějšího partnera. Tvrzení o jejich rovnosti proto neplatí."},
 {t:"single", q:"Které oxidační stavy dusík běžně tvoří, ale fosfor prakticky ne?",
  o:["+III a +V","+I a +III","−II, −I a +II","−III a 0"], c:2,
  e:"Stavy −II, −I a +II jsou u dusíku vázané na homonukleární vazbu N—N (hydrazin), na substituci skupinou OH (hydroxylamin) nebo na lichý počet elektronů (NO). Fosfor takové částice buď netvoří vůbec, nebo jen jako laboratorní kuriozity. Stavy −III, 0, +III a +V mají naopak oba prvky."}
];

BANK.q1 = [
 {t:"single", q:"Jaká je vazebná energie trojné vazby v&nbsp;molekule <span class=\"chem\">N₂</span>?",
  o:["498 kJ·mol⁻¹","945 kJ·mol⁻¹","163 kJ·mol⁻¹","436 kJ·mol⁻¹"], c:1,
  e:"Trojná vazba N≡N patří s hodnotou 945 kJ·mol⁻¹ k nejpevnějším vazbám v běžné chemii. Hodnota 498 kJ·mol⁻¹ patří dvojné vazbě v kyslíku, 163 kJ·mol⁻¹ jednoduché vazbě N—N a 436 kJ·mol⁻¹ vazbě H—H."},
 {t:"single", q:"Proč je molekulární dusík za běžných podmínek netečný?",
  o:["Protože jsou jeho reakce termodynamicky nevýhodné","Protože nemá volné valenční elektrony","Protože je lehčí než vzduch","Protože mají jeho reakce velmi vysokou aktivační energii"], c:3,
  e:"Netečnost dusíku je kinetická, ne termodynamická. Syntéza amoniaku má ΔH = −92,2 kJ·mol⁻¹ a je samovolná, jenže trojná vazba se musí nejdřív roztrhnout, což stojí obrovskou aktivační energii. Právě proto stačí katalyzátor a reakce se rozeběhne, aniž by se změnila její termodynamika."},
 {t:"single", q:"Proč tvoří fosfor tetraedrickou molekulu <span class=\"chem\">P₄</span>, zatímco dusík dvouatomovou <span class=\"chem\">N₂</span>?",
  o:["U fosforu jsou tři jednoduché vazby výhodnější než jedna trojná, u dusíku je to naopak","Fosfor má víc valenčních elektronů než dusík","Molekula P₂ neexistuje za žádných podmínek","Fosfor je kov, a proto tvoří klastry"], c:0,
  e:"Tři vazby P—P dají 603 kJ·mol⁻¹, zatímco trojná vazba P≡P jen 490 kJ·mol⁻¹ — jednoduché vazby vyhrávají. U dusíku je poměr obrácený: 3 × 163 = 489 proti 945 kJ·mol⁻¹. Molekuly P₂ existují, ale až v parách nad 800 °C, kdy se prosadí entropický zisk."},
 {t:"single", q:"Se kterými kovy reaguje dusík už za relativně mírných podmínek?",
  o:["Se zlatem a stříbrem","S mědí a železem","S olovem a cínem","S lithiem, hořčíkem a vápníkem"], c:3,
  e:"Nejelektropozitivnější lehké kovy dokážou trojnou vazbu rozbít i bez katalyzátoru — lithium už za pokojové teploty, hořčík a vápník po zahřátí. Vzniklé nitridy se vodou hydrolyzují na amoniak, čímž se dokazují. Měď, železo ani ušlechtilé kovy s dusíkem přímo nereagují."},
 {t:"num", q:"Kolik dm³ dusíku vznikne za normálních podmínek rozkladem 130 g azidu sodného podle rovnice <span class=\"chem\">2 NaN₃ → 2 Na + 3 N₂</span>? M(NaN₃) = 65,01 g·mol⁻¹, V<sub>m</sub> = 22,414 dm³·mol⁻¹. (Zadejte v&nbsp;dm³.)",
  ans:67.2, tol:1.0, unit:"dm³",
  e:"n(NaN₃) = 130 / 65,01 = 2,000 mol; z poměru 2 : 3 vyjde n(N₂) = 3,000 mol; V = 3,000 · 22,414 = 67,2 dm³. Nejčastější chyba je zapomenout na stechiometrický poměr a počítat rovnou dva moly dusíku — pak vyjde 44,8 dm³."},
 {t:"multi", q:"Které z uvedených tvrzení o&nbsp;dusíku a&nbsp;jeho výskytu <b>platí</b>?",
  o:["Tvoří 78,08 % objemu suchého vzduchu","V přírodě se vyskytuje výhradně vázaný ve sloučeninách","Vyrábí se frakční destilací zkapalněného vzduchu","Je to biogenní prvek, součást aminokyselin a nukleových bází"], c:[0,2,3],
  e:"Dusík je hlavní složkou vzduchu a zároveň biogenním prvkem, průmyslově se získává frakční destilací vzduchu. Druhé tvrzení popisuje fosfor, ne dusík — právě fosfor se v přírodě volný nevyskytuje, protože je příliš reaktivní."}
];

BANK.q2 = [
 {t:"single", q:"Z čeho je tvořen bílý fosfor?",
  o:["Z tetraedrických molekul P₄","Z dvouatomových molekul P₂ s trojnou vazbou","Z polymerních řetězců","Z vrstevnaté struktury podobné grafitu"], c:0,
  e:"Bílý fosfor je molekulová látka tvořená tetraedry P₄, ve kterých je každý atom vázán ke třem sousedům. Řetězce má červený fosfor, vrstvy černý. Molekuly P₂ vznikají až v parách nad 800 °C."},
 {t:"single", q:"Proč je bílý fosfor samozápalný, zatímco červený je na vzduchu stálý?",
  o:["Bílý fosfor má vyšší oxidační číslo","V molekule P₄ jsou vazby napjaté (úhel jen 60°), takže je v ní zásoba energie navíc","Bílý fosfor obsahuje příměs kyslíku","Červený fosfor je pokrytý ochrannou vrstvou oxidu"], c:1,
  e:"Vazebný úhel 60° v tetraedru je hodně daleko od úhlu, který by fosfor rád zaujal, takže jsou vazby napjaté a molekula sedí energeticky vysoko. V červeném fosforu se tetraedry otevřou a spojí do řetězců, pnutí zmizí a reaktivita klesne. Oxidační číslo je v obou modifikacích nula."},
 {t:"single", q:"Která modifikace fosforu je termodynamicky nejstálejší?",
  o:["Bílý","Červený","Černý","Všechny tři jsou stejně stálé"], c:2,
  e:"Černý fosfor s vrstevnatou strukturou je nejstálejší — vzniká za vysokého tlaku a na vzduchu se prakticky nemění. Bílý je nejméně stálý a nejreaktivnější, červený leží mezi nimi. Stálost roste s propojeností struktury: molekuly, řetězce, vrstvy."},
 {t:"single", q:"V jaké formě se fosfor vyskytuje v&nbsp;přírodě?",
  o:["Jako elementární bílý fosfor v ložiscích","Jako fosfidy kovů","V oxidačním čísle +III v minerálech","Prakticky výhradně jako fosforečnan v apatitech"], c:3,
  e:"Fosfor je příliš reaktivní na to, aby se vyskytoval volný, a v přírodě je prakticky jen v nejvyšším oxidačním stavu +V jako fosforečnan. Hlavním nerostem je apatit Ca₅(PO₄)₃X. Fosfidy byly prokázány jen ve stopách v některých meteoritech."},
 {t:"single", q:"Jaká je role křemene <span class=\"chem\">SiO₂</span> při výrobě fosforu z&nbsp;apatitu v&nbsp;elektrické peci?",
  o:["Váže vápník na křemičitan, a tím uvolňuje fosforečnan k redukci","Působí jako redukční činidlo místo uhlíku","Snižuje teplotu tání směsi na polovinu","Zabraňuje přístupu vzduchu k roztavenému fosforu"], c:0,
  e:"Křemen je struskotvorná přísada: převede vápník na křemičitan CaSiO₃, čímž fosforečnan uvolní a umožní jeho redukci uhlíkem. Redukčním činidlem je koks. Vzniklé páry fosforu se pak jímají a kondenzují pod vodou."},
 {t:"multi", q:"Které vlastnosti platí pro <b>červený</b> fosfor?",
  o:["Je prakticky netoxický","Rozpouští se v sirouhlíku","Na vzduchu je stálý a zapaluje se až nad 250 °C","Používá se na škrtací plošce zápalkových krabiček"], c:[0,2,3],
  e:"Červený fosfor je polymerní, a proto netoxický, na vzduchu stálý a nerozpustný v běžných rozpouštědlech. V sirouhlíku se rozpouští jen bílý fosfor, protože je tvořen samostatnými nepolárními molekulami P₄ — a to je zároveň jednoduchá zkouška, jak obě modifikace rozlišit."}
];

BANK.q3 = [
 {t:"single", q:"Jaký je vazebný úhel H—N—H v&nbsp;molekule amoniaku?",
  o:["90,0°","120,0°","109,5°","106,7°"], c:3,
  e:"Volný elektronový pár zabírá víc místa než vazebný, a proto stlačuje vazebné úhly z tetraedrických 109,5° na 106,7°. Úhel 120° by odpovídal trigonální rovině a 90° by znamenal vazby z čistých orbitalů p — to je situace fosfanu s 93,5°."},
 {t:"single", q:"Proč se amoniak zkapalňuje při −33,3 °C, zatímco těžší fosfan až při −87,7 °C?",
  o:["Amoniak má vyšší molární hmotnost","Mezi molekulami amoniaku působí vodíkové vazby, u fosfanu ne","Fosfan je iontová sloučenina","Amoniak je nepolární, fosfan polární"], c:1,
  e:"Dusík je dost elektronegativní na to, aby vznikaly vodíkové vazby; fosfor ne, protože jeho elektronegativita je téměř stejná jako u vodíku. Proto amoniak vaří o 54 °C výš, přestože je skoro dvakrát lehčí. Kdykoli teplota varu neodpovídá molární hmotnosti, hledejte vodíkovou vazbu."},
 {t:"single", q:"Které podmínky se používají v&nbsp;průmyslovém Haberově procesu?",
  o:["25 °C a atmosférický tlak, katalyzátor platina","1000 °C a 100 MPa, bez katalyzátoru","400 až 500 °C a 15 až 30 MPa, katalyzátor železo","−50 °C a 5 MPa, katalyzátor nikl"], c:2,
  e:"Reakce je exotermická a zmenšuje počet částic, takže rovnováze prospívá nízká teplota a vysoký tlak. Za nízké teploty ale reakce neběží, proto se volí kompromis kolem 450 °C a vysoký tlak, který propad výtěžku částečně dohání. Katalyzátorem je železo s promotory K₂O, Al₂O₃ a CaO."},
 {t:"single", q:"Co se stane s&nbsp;rovnovážným výtěžkem amoniaku, když se přidá katalyzátor?",
  o:["Zvýší se přibližně na dvojnásobek","Nezmění se vůbec, katalyzátor mění jen rychlost","Sníží se, protože katalyzátor váže část amoniaku","Závisí to na tom, jaká je teplota"], c:1,
  e:"Katalyzátor snižuje aktivační energii stejnou měrou pro přímou i zpětnou reakci, takže se rovnováha ustaví rychleji, ale ve stejném složení. Rovnovážné složení mění jen změna teploty, tlaku nebo koncentrace. Tohle je jedna z nejčastějších chyb u téhle látky."},
 {t:"num", q:"Jaké pH má roztok amoniaku o&nbsp;koncentraci 0,10 mol·dm⁻³? K<sub>b</sub> = 1,8·10⁻⁵. (Zadejte pH na jedno desetinné místo.)",
  ans:11.1, tol:0.2, unit:"pH",
  e:"[OH⁻] = √(K_b · c) = √(1,8·10⁻⁵ · 0,10) = 1,33·10⁻³ mol·dm⁻³; pOH = 2,88; pH = 14,00 − 2,88 = 11,1. Kdo použije vzorec pro silnou zásadu, dostane pH = 13,0 — a to je právě ta chyba, kterou otázka hledá."},
 {t:"multi", q:"Které z uvedených tvrzení o&nbsp;fosfanu <span class=\"chem\">PH₃</span> <b>platí</b>?",
  o:["Má vazebný úhel jen 93,5°, protože vazby tvoří skoro čisté orbitaly p","Je silnější zásada než amoniak","Je to silné redukční činidlo","Vzniká hydrolýzou fosfidů elektropozitivních kovů"], c:[0,2,3],
  e:"Úhel blízký 90° znamená minimální hybridizaci a volný pár uvězněný v orbitalu s, který je pro proton nedostupný — proto je fosfan prakticky nezásaditý, tedy o dvacet řádů slabší zásada než amoniak. Fosfor v −III je naopak silné redukovadlo a fosfan skutečně vzniká hydrolýzou fosfidů."}
];

BANK.q4 = [
 {t:"single", q:"Který oxid dusíku <b>není</b> anhydridem žádné kyseliny?",
  o:["N₂O₃","N₂O₅","N₂O","Žádný z uvedených"], c:2,
  e:"Oxid dusný je ve vodě netečný, nereaguje s ní a žádnou kyselinu nedává. N₂O₃ je anhydridem kyseliny dusité (obě mají dusík v +III) a N₂O₅ anhydridem kyseliny dusičné (obě mají +V). Anhydrid vždycky poznáte podle shody oxidačních čísel."},
 {t:"single", q:"Jaký je řád vazby v&nbsp;molekule oxidu dusnatého <span class=\"chem\">NO</span>?",
  o:["2,0","3,0","1,5","2,5"], c:3,
  e:"Molekula NO má lichý počet valenčních elektronů, tedy jedenáct, takže jeden zůstane nepárový v protivazebném orbitalu π*. Ten sníží řád vazby ze tří na 2,5 a zároveň dělá molekulu paramagnetickou. Odtud plyne i její ochota okamžitě se oxidovat na NO₂."},
 {t:"single", q:"Co vznikne zavedením oxidu dusičitého do vody?",
  o:["Kyselina dusičná a oxid dusnatý","Pouze kyselina dusičná","Pouze kyselina dusitá","Kyselina dusičná a kyslík"], c:0,
  e:"NO₂ má prostřední oxidační číslo +IV, a proto s vodou disproporcionuje: 3 NO₂ + H₂O → 2 HNO₃ + NO. Dva atomy jdou nahoru na +V, jeden dolů na +II. Za studena lze zachytit i vznikající kyselinu dusitou, ta se ale ihned rozkládá."},
 {t:"single", q:"Proč hnědý plyn <span class=\"chem\">NO₂</span> po ochlazení vybledne?",
  o:["Rozkládá se na dusík a kyslík","Posune se rovnováha 2 NO₂ ⇌ N₂O₄ ve prospěch bezbarvého dimeru","Zkondenzuje na kapalinu bez barvy","Reaguje s vlhkostí ve vzduchu"], c:1,
  e:"Dimerace je exotermická (ΔH = −57,2 kJ·mol⁻¹), takže ochlazení podle Le Chatelierova principu posune rovnováhu ve prospěch dimeru N₂O₄, který je bezbarvý a diamagnetický. Zahřátím se plyn zase zbarví. Je to jedna z nejnázornějších demonstrací posunu rovnováhy vůbec."},
 {t:"single", q:"Jaké produkty vzniknou žíháním dusičnanu měďnatého?",
  o:["Dusitan měďnatý a kyslík","Měď, oxid dusičitý a kyslík","Oxid měďnatý, oxid dusičitý a kyslík","Oxid měďnatý a oxid dusný"], c:2,
  e:"Dusičnany středně ušlechtilých kovů se rozkládají na oxid kovu, NO₂ a kyslík: 2 Cu(NO₃)₂ → 2 CuO + 4 NO₂ + O₂. Dusitan by vznikl u alkalických kovů, samotný kov až u kovů ušlechtilých, jako je stříbro."},
 {t:"multi", q:"Které oxidy dusíku jsou <b>paramagnetické</b>, tedy mají nepárový elektron?",
  o:["N₂O","NO","NO₂","N₂O₄"], c:[1,2],
  e:"Paramagnetické jsou NO a NO₂, protože obě molekuly mají lichý počet valenčních elektronů. N₂O je lineární molekula se samými párovými elektrony a N₂O₄ vzniká právě tím, že se dva nepárové elektrony ze dvou molekul NO₂ spárují do vazby N—N — proto je dimer diamagnetický a bezbarvý."}
];
