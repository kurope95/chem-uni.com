/* ============================================================
   30 · BANKY OTÁZEK — KAPITOLY 5 AŽ 8
   ============================================================ */
BANK.q5=[
 {t:"single",q:"Co je ve vysoké peci <b>hlavním redukovadlem</b>?",
  o:["Oxid uhelnatý, který z koksu v peci vzniká","Pevný koks, který se přímo stýká s rudou","Vodík z vlhkosti vsázky","Oxid uhličitý"],c:0,
  e:"Koks nejdřív shoří na <span class=\"chem\">CO₂</span> a&nbsp;ten se se žhavým koksem změní zpátky na <span class=\"chem\">CO</span> (Boudouardova reakce). Plyn se dostane ke každému zrnku rudy, kdežto pevný uhlík jen k&nbsp;povrchu — proto obstará většinu práce nepřímá redukce plynem. Oxid uhličitý je naopak produkt, ne redukovadlo."},
 {t:"single",q:"Proč nelze titan vyrábět redukcí <span class=\"chem\">TiO₂</span> uhlíkem?",
  o:["Protože oxid titaničitý je nerozpustný","Protože by vznikl karbid TiC místo kovu","Protože titan je ušlechtilý kov","Protože titan má příliš nízkou teplotu tání"],c:1,
  e:"Titan patří mezi kovy, které s&nbsp;uhlíkem tvoří velmi stabilní karbidy — místo kovu byste dostali tvrdou keramiku. Proto se oxid nejdřív chloruje na těkavý <span class=\"chem\">TiCl₄</span>, ten se destilací vyčistí a&nbsp;teprve pak zredukuje hořčíkem (Krollův postup). Titan je navíc velmi neušlechtilý (E° = −1,63 V) a&nbsp;taje až při 1668 °C."},
 {t:"single",q:"Jak se čte <b>Ellinghamův diagram</b>?",
  o:["Kdo je v grafu výš, ten redukuje toho pod sebou","Vodorovné čáry označují kovy, které nelze redukovat","Kdo je v grafu níž, ten redukuje toho nad sebou","Průsečík dvou čar udává teplotu tání kovu"],c:2,
  e:"Nižší poloha znamená zápornější Gibbsovu energii vzniku oxidu, tedy pevnější vazbu ke kyslíku — a&nbsp;takový prvek si kyslík vezme. Čára <span class=\"chem\">2 C + O₂ → 2 CO</span> jako jediná klesá (z&nbsp;jedné molekuly plynu vzniknou dvě), takže při dost vysoké teplotě podleze každý kov. Průsečík udává právě tuto hraniční teplotu, ne teplotu tání."},
 {t:"single",q:"Reakce <span class=\"chem\">Fe₂O₃ + 2 Al → 2 Fe + Al₂O₃</span> se nazývá…",
  o:["cementace","pražně‑reakční postup","Krollova metoda","aluminotermie (termitová reakce)"],c:3,
  e:"Je to metalotermie s&nbsp;hliníkem jako redukovadlem, uvolní asi 852&nbsp;kJ·mol⁻¹ a&nbsp;teplota vystoupá nad 2500 °C, takže vzniklé železo je tekuté — proto se termitem svařují kolejnice. Cementace je vytěsnění kovu z&nbsp;roztoku, Kroll pracuje s&nbsp;halogenidem a&nbsp;pražně‑reakční postup se sulfidem."},
 {t:"single",q:"Reakce <span class=\"chem\">2 PbO + PbS → 3 Pb + SO₂</span> je příkladem…",
  o:["pražně‑reakčního postupu, kde zbylý sulfid zredukuje vzniklý oxid","redukce uhlíkem","tepelného rozkladu oxidu","elektrolytické rafinace"],c:0,
  e:"Část rudy se opraží na oxid, pak se uzavře přívod vzduchu a&nbsp;zbylý sulfid oxid zredukuje sám. Elegantní na tom je, že není potřeba žádné cizí redukovadlo a&nbsp;síra i&nbsp;kyslík odejdou společně jako <span class=\"chem\">SO₂</span>. Stejný princip funguje v&nbsp;měďařském konvertoru."},
 {t:"multi",q:"Které postupy využívají <b>tepelný rozklad</b> sloučeniny?",
  o:["Rozklad HgO na rtuť a kyslík","Mondův proces s tetrakarbonylem niklu","Van Arkelova metoda s jodidem titaničitým","Cementace mědi železným šrotem"],c:[0,1,2],
  e:"První tři jsou tepelné rozklady: oxid rtuťnatý se rozloží sám, karbonyl niklu při 200 °C a&nbsp;jodid titaničitý na žhaveném vlákně. Cementace je naopak <b>substituční</b> redukce — méně ušlechtilý kov (železo) vytěsní ušlechtilejší (měď) z&nbsp;roztoku."}
];

BANK.q6=[
 {t:"single",q:"Co vzniká elektrolýzou <b>vodného roztoku</b> chloridu sodného?",
  o:["Kovový sodík a chlor","Hydroxid sodný, vodík a chlor","Chlornan sodný a vodík","Kovový sodík a kyslík"],c:1,
  e:"Sodík má E° = −2,71 V, takže na katodě se dřív redukuje voda a&nbsp;uniká vodík; sodík zůstane v&nbsp;roztoku jako kation vedle vzniklých hydroxidových iontů. Na anodě se vylučuje chlor. Kovový sodík dostanete jedině elektrolýzou <b>taveniny</b>."},
 {t:"single",q:"Proč se do taveniny <span class=\"chem\">Al₂O₃</span> přidává <b>kryolit</b>?",
  o:["Protože oxid hlinitý taje až při 2050 °C a v kryolitu se rozpustí, takže se pracuje kolem 960 °C","Aby se zvýšila vodivost taveniny na dvojnásobek","Aby se zabránilo vzniku oxidu uhličitého na anodě","Protože kryolit sám poskytuje hliník"],c:0,
  e:"Elektrolyzovat čistý <span class=\"chem\">Al₂O₃</span> by znamenalo udržovat přes 2050 °C, což je technicky neúnosné. Kryolit <span class=\"chem\">Na₃AlF₆</span> ho rozpustí a&nbsp;pracovní teplota klesne na 950 až 970 °C. Je to stejný princip jako u&nbsp;eutektika — přísada snižuje teplotu tání."},
 {t:"num",q:"Kolik kilogramů hliníku vyrobí elektrolyzér s&nbsp;proudem 100&nbsp;kA za 24 hodin při 100% proudové výtěžnosti? (Zadejte v&nbsp;kg. <span class=\"q\">M</span> = 26,98&nbsp;g·mol⁻¹, <span class=\"q\">F</span> = 96&nbsp;485&nbsp;C·mol⁻¹.)",
  ans:805, tol:20, unit:"kg",
  e:"Dosadíme do <span class=\"q\">m</span> = <span class=\"q\">M</span>·<span class=\"q\">I</span>·<span class=\"q\">t</span>/(<span class=\"q\">z</span>·<span class=\"q\">F</span>) s&nbsp;<span class=\"q\">z</span> = 3 a&nbsp;<span class=\"q\">t</span> = 86&nbsp;400&nbsp;s: 26,98·100 000·86 400/(3·96 485) = 8,05·10⁵&nbsp;g, tedy 805&nbsp;kg. Nejčastější chybou je vynechat trojku ve jmenovateli — pak vyjde třikrát víc."},
 {t:"single",q:"Při <b>elektrolytické rafinaci mědi</b> se ušlechtilejší příměsi (Ag, Au, Pt)…",
  o:["vyloučí na katodě spolu s mědí","rozpustí a zůstanou v roztoku","vůbec se nerozpustí a spadnou pod anodu jako anodový kal","odpaří se při provozní teplotě"],c:2,
  e:"Napětí se drží tak nízko (0,2 až 0,3 V), že stačí právě jen na měď. Ušlechtilejší kovy se z&nbsp;anody nerozpustí a&nbsp;klesnou pod ni; neušlechtilejší (Zn, Fe, Ni) se sice rozpustí, ale na katodě se nevyloučí a&nbsp;zůstanou v&nbsp;lázni. Anodový kal je hlavním světovým zdrojem stříbra."},
 {t:"single",q:"Zinek má E° = −0,76 V, což je pod potenciálem redukce vody. Přesto se vyrábí elektrolýzou vodného roztoku <span class=\"chem\">ZnSO₄</span>. Proč to jde?",
  o:["Protože kyselé prostředí zvyšuje potenciál zinku","Protože se používá rtuťová anoda","Protože se elektrolýza provádí za sníženého tlaku","Protože vodík má na zinku velké přepětí, takže se přece jen vyloučí kov"],c:3,
  e:"Přepětí je napětí navíc, které vylučování plynu reálně potřebuje nad tabulkovou hodnotu. Na zinku je pro vodík tak velké, že se místo něj vyloučí kov. Lázeň proto musí být mimořádně čistá — stopy niklu nebo kobaltu přepětí sníží a&nbsp;místo zinku začne bublat vodík."},
 {t:"single",q:"Co je podstatou <b>zonální tavby</b>?",
  o:["Kov se opakovaně destiluje za sníženého tlaku","Kov se převede na těkavý jodid a ten se rozloží na žhaveném vlákně","Ingot se rozžhaví celý a pomalu chladne","Úzkou roztavenou zónou se opakovaně projede ingotem a příměsi putují s taveninou na konec"],c:3,
  e:"Příměsi jsou rozpustnější v&nbsp;kapalné než v&nbsp;pevné fázi, takže se s&nbsp;posouvající se zónou stěhují na konec ingotu, který se pak odřízne. Je to táž termodynamika jako u&nbsp;eutektika. Popsaná destilace a&nbsp;van Arkelova metoda jsou jiné fyzikální rafinace."}
];

BANK.q7=[
 {t:"single",q:"K&nbsp;čemu se do vysoké pece přidává <b>vápenec</b>?",
  o:["Jako palivo, protože dobře hoří","Jako redukovadlo místo koksu","Jako struskotvorná přísada — CaO váže křemičitou hlušinu na tekutou strusku","Jako zdroj oxidu uhličitého pro Boudouardovu reakci"],c:2,
  e:"Vápenec se žárem rozloží na zásaditý <span class=\"chem\">CaO</span>, který s&nbsp;kyselým <span class=\"chem\">SiO₂</span> z&nbsp;hlušiny vytvoří tekutý křemičitan. Struska plave na kovu, odvádí nečistoty, odsiřuje a&nbsp;chrání železo před opětovnou oxidací. Palivem ani redukovadlem vápenec není."},
 {t:"single",q:"Jaká hranice obsahu uhlíku dělí <b>ocel</b> od <b>litiny</b> a&nbsp;proč právě ona?",
  o:["1,00 % — nad ní se ocel nedá svařovat","2,11 % — je to maximální rozpustnost uhlíku v austenitu","4,30 % — je to eutektické složení","0,25 % — nad ní se ocel dá kalit"],c:1,
  e:"Hranice 2,11 % není libovolná: je to maximální množství uhlíku, které se vejde do dutin plošně centrované mřížky austenitu při 1147 °C. Nad ní se přebytečný uhlík vyloučí jako karbid <span class=\"chem\">Fe₃C</span> nebo grafit a&nbsp;materiál se stane křehkým. Hodnota 4,3 % je eutektické složení s&nbsp;nejnižší teplotou tání."},
 {t:"single",q:"Co dělá <b>kyslíkový konvertor</b> se surovým železem?",
  o:["Přidává do něj uhlík, aby bylo tvrdší","Rozpouští ho v kyselině a znovu vysráží","Elektrolyticky ho rafinuje","Vhání do něj čistý kyslík, který spálí přebytečný uhlík a příměsi"],c:3,
  e:"Surové železo má 3,5 až 4,5 % uhlíku a&nbsp;je nepoužitelně křehké. Kyslík spálí uhlík na <span class=\"chem\">CO</span> a&nbsp;příměsi na oxidy, které přejdou do strusky. Reakce jsou tak exotermické, že se musí přidávat ocelový šrot na chlazení — a&nbsp;to je zároveň cesta, jak se recykluje."},
 {t:"num",q:"Kolik kilogramů uhlíku musí shořet, aby se z&nbsp;1&nbsp;t surového železa se 4,3 % uhlíku stala ocel s&nbsp;0,20 % uhlíku? (Zadejte v&nbsp;kg; úbytek celkové hmotnosti zanedbejte.)",
  ans:41, tol:2, unit:"kg",
  e:"Uhlíku je na začátku 0,043 · 1000 = 43,0&nbsp;kg a&nbsp;na konci 0,0020 · 1000 = 2,0&nbsp;kg, takže odejít musí 41,0&nbsp;kg. Odpovídá to zhruba 76,5&nbsp;m³ oxidu uhelnatého za normálních podmínek — konvertorový plyn se proto zachytává a&nbsp;spaluje jako palivo."},
 {t:"multi",q:"Které tři úlohy plní <b>koks</b> ve vysoké peci?",
  o:["Je palivem — hořením dodává teplo","Je zdrojem redukovadla, protože z něj vzniká oxid uhelnatý","Je nosnou kostrou, která drží vsázku propustnou pro plyn","Váže křemičitou hlušinu do strusky"],c:[0,1,2],
  e:"Koks hoří, dodá teplo a&nbsp;zároveň se s&nbsp;oxidem uhličitým mění na <span class=\"chem\">CO</span>; jeho porézní pevná struktura navíc unese třicetimetrový sloupec vsázky. Vázání hlušiny do strusky obstarává <b>vápenec</b>, ne koks — a&nbsp;právě proto se do pece sype také."},
 {t:"single",q:"Jaký je hlavní důvod, proč se dnes zkouší <b>přímá redukce železné rudy vodíkem</b>?",
  o:["Vodík je levnější než koks","Reakce probíhá za nižší teploty než 500 °C","Vodík zredukuje i oxid hlinitý","Jediným produktem redukce je vodní pára, ne oxid uhličitý"],c:3,
  e:"Rovnice <span class=\"chem\">Fe₂O₃ + 3 H₂ → 2 Fe + 3 H₂O</span> nahradí <span class=\"chem\">CO₂</span> vodou, což je pro dekarbonizaci ocelářství zásadní — na tunu surového železa dnes připadají zhruba dvě tuny oxidu uhličitého. Vodík je zatím dražší než koks a&nbsp;na oxid hlinitý ani zdaleka nestačí."}
];

BANK.q8=[
 {t:"single",q:"Který kov koroduje, spojíte‑li ve vlhku <b>železo s&nbsp;mědí</b>?",
  o:["Železo, protože má nižší standardní potenciál a je anodou","Měď, protože je ušlechtilejší","Oba stejně","Ani jeden, protože oba se pasivují"],c:0,
  e:"Anodou je vždy kov s&nbsp;nižším potenciálem: Fe má −0,44 V, Cu +0,34 V. Železo se tedy rozpouští, a&nbsp;protože měď poskytne velkou katodovou plochu, koroduje <b>rychleji</b> než samo. Malá anoda a&nbsp;velká katoda je nejhorší možná kombinace."},
 {t:"single",q:"Poškrábaný <b>pocínovaný</b> plech koroduje…",
  o:["stejně rychle jako holé železo","pomaleji, protože cín se obětuje","vůbec ne, protože cín se pasivuje","rychleji než holé železo, protože cín je ušlechtilejší a železo se stane anodou"],c:3,
  e:"Cín má E° = −0,14 V, tedy vyšší než železo (−0,44 V). V&nbsp;rýze se proto anodou stane železo a&nbsp;velká cínová plocha mu poslouží jako výborná katoda. Neporušený cínový povlak je ale skvělá bariéra a&nbsp;je zdravotně nezávadný — proto konzervy."},
 {t:"single",q:"Proč hliníkové okno nekoroduje, přestože má E° = −1,66 V, tedy hluboko pod železem?",
  o:["Protože hliník se v atmosféře nevyskytuje v iontové formě","Protože vytvoří souvislou a přilnavou pasivní vrstvu Al₂O₃, která další reakci zastaví","Protože hliník je ušlechtilý kov","Protože se hliník nikdy nedostane do styku s vodou"],c:1,
  e:"Termodynamicky by hliník měl korodovat prudčeji než železo. Zachrání ho pasivace: vrstvička <span class=\"chem\">Al₂O₃</span> silná několik nanometrů je souvislá, přilnavá a&nbsp;neprostupná, a&nbsp;po poškrábání se okamžitě obnoví. Rez je naopak porézní a&nbsp;odpadává — proto ocel nechrání."},
 {t:"single",q:"Co dělá <b>hořčíková tyč</b> v&nbsp;bojleru?",
  o:["Ohřívá vodu","Změkčuje vodu vázáním vápníku","Je obětovanou anodou — rozpouští se místo ocelové nádoby","Brání usazování vodního kamene"],c:2,
  e:"Hořčík má E° = −2,37 V, zdaleka nejnižší ze všech materiálů v&nbsp;bojleru, takže se v&nbsp;korozním článku stane anodou a&nbsp;obětuje se. Nádoba je tím katodicky chráněná. Anoda se po několika letech vymění — u&nbsp;tvrdší, lépe vodivé vody dřív."},
 {t:"multi",q:"Které způsoby ochrany fungují i&nbsp;<b>po poškození</b> povrchu?",
  o:["Pozinkování","Nátěr","Obětovaná anoda z hořčíku","Pasivace hliníku nebo nerezavějící oceli"],c:[0,2,3],
  e:"Pozinkování, obětovaná anoda i&nbsp;pasivace mají elektrochemickou nebo samoobnovovací povahu, takže poškození přežijí. Nátěr je čistě <b>bariérová</b> ochrana bez jakékoli elektrochemické funkce — po proškrábnutí koroze běží normálně a&nbsp;často podlézá do stran."},
 {t:"single",q:"Proč se vyplatí hliník recyklovat mnohem víc než většinu jiných materiálů?",
  o:["Protože hliníku je v přírodě málo","Protože recyklovaný hliník je kvalitnější než nový","Protože se hliník nedá skládkovat","Protože přetavení spotřebuje jen kolem 5 % energie potřebné na výrobu z bauxitu"],c:3,
  e:"Výroba z&nbsp;bauxitu stojí 13 až 15&nbsp;kWh na kilogram, protože jde o&nbsp;tavnou elektrolýzu; přetavení potřebuje jen roztavit kov při 660 °C. Hliníku je v&nbsp;zemské kůře naopak nejvíc ze všech kovů (8,23 %) a&nbsp;recyklovaný kov má stejnou kvalitu jako nový, ne lepší."}
];
