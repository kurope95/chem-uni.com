/* ============================================================
   28 · BANKA OTÁZEK — kapitolové mini-testy k0 až k4
   ============================================================ */
BANK.q0 = [
 {t:"single", q:"Proč jsou vzácné plyny chemicky netečné?",
  o:["Mají velmi malý atomový poloměr","Mají zcela zaplněnou valenční slupku, nejvyšší ionizační energii a zápornou elektronovou afinitu","Jejich atomy jsou příliš těžké na to, aby se pohybovaly","Tvoří dvouatomové molekuly s velmi pevnou vazbou"], c:1,
  e:"Netečnost není jedna vlastnost, ale tři čísla dohromady: elektron nedají (vysoká ionizační energie), nevezmou (záporná elektronová afinita) a nesdílejí (vazba by vedla do protivazebného orbitalu). Nejlákavější past je tvrzení o dvouatomových molekulách — vzácné plyny mají molekuly <b>jednoatomové</b>."},
 {t:"single", q:"Který vzácný plyn je ve vzduchu nejhojnější a kolik ho zhruba je?",
  o:["Neon, asi 18 %","Helium, asi 5 %","<b>Argon, asi 0,93 %</b>","Xenon, asi 0,09 %"], c:2,
  e:"Argon tvoří 0,934 objemového procenta vzduchu, tedy 9,3 dm³ v každém krychlovém metru — je to zdaleka nejhojnější vzácný plyn a vzniká rozpadem draslíku ⁴⁰K. Uvedená čísla u neonu, helia a xenonu jsou jejich hodnoty, ale v ppm, ne v procentech."},
 {t:"single", q:"Proč se helium získává ze zemního plynu, a ne ze vzduchu?",
  o:["Protože helium ze vzduchu uniká rychleji, než ho stačíme zachytit","Protože v zemním plynu je ho až tisíckrát víc než ve vzduchu","Protože ve vzduchu se helium vyskytuje jen ve formě sloučenin","Protože helium ze vzduchu má příliš nízkou čistotu pro medicínské použití"], c:1,
  e:"Ve vzduchu je helia jen 5,24 ppm, kdežto některá plynová ložiska ho obsahují 0,3 až 7 objemových procent. Rozdíl je zhruba tisícinásobný, a proto je kryogenní separace zemního plynu jediná ekonomická cesta. Helium ve sloučeninách nikde nevzniká — první odpověď míří na jinou skutečnost (unikání do vesmíru), která ale s volbou zdroje nesouvisí."},
 {t:"single", q:"Při frakční destilaci kapalného vzduchu se krypton a xenon hromadí…",
  o:["v nejlehčí frakci nahoře, spolu s heliem","ve střední frakci, spolu s argonem","v odpadním plynu, který se vypouští","<b>v kapalném kyslíku na dně kolony</b>"], c:3,
  e:"Krypton (119,9 K) i xenon (165,1 K) mají teplotu varu vyšší než kyslík (90,2 K), takže se odpaří jako poslední a zůstávají v kapalném kyslíku. Nahoře odcházejí naopak látky s nejnižší teplotou varu, tedy helium a neon."},
 {t:"single", q:"Proč rostou teploty varu vzácných plynů od helia k radonu?",
  o:["<b>Roste polarizovatelnost atomů, a tím i Londonovy disperzní síly</b>","Roste počet kovalentních vazeb mezi atomy","Roste elektronegativita, a tím i dipólové interakce","Roste počet vodíkových můstků mezi atomy"], c:0,
  e:"Mezi jednoatomovými molekulami nemůže působit nic než disperzní síly a ty rostou s velikostí a měkkostí elektronového oblaku. Vodíkový můstek nemají jak vytvořit (nemají vodík) a dipól také ne — atom je kulově symetrický."},
 {t:"multi", q:"Které výroky o vzácných plynech jsou správné?",
  o:["Argon se používá jako ochranná atmosféra při svařování","Helium je pod 2,17 K supratekuté","Radon se průmyslově získává z kapalného vzduchu","Xenon má ze stabilních vzácných plynů nejnižší ionizační energii","Neon svítí ve výbojce oranžovočerveně"], c:[0,1,3,4],
  e:"Radon se nezískává vůbec — vzniká rozpadem radia v horninách a v budovách je zdravotním rizikem, ne surovinou. Zbývající čtyři výroky platí: argon je levný inertní plyn pro svařování, helium II je supratekuté, xenon má ionizační energii 1170 kJ·mol⁻¹ a neon dává charakteristickou oranžovočervenou barvu výboje."}
];

BANK.q1 = [
 {t:"single", q:"Jaká úvaha vedla Neila Bartletta k prvnímu pokusu se xenonem?",
  o:["Xenon je nejtěžší nradioaktivní vzácný plyn, takže musí být nejreaktivnější","Xenon se ve výbojce chová jako kov, tedy musí odevzdávat elektrony","<b>Ionizační energie xenonu je téměř stejná jako u molekuly O₂, kterou PtF₆ oxiduje</b>","Xenon má jako jediný vzácný plyn nezaplněný orbital d"], c:2,
  e:"Bartlett porovnal 1170 kJ·mol⁻¹ (Xe) s 1175 kJ·mol⁻¹ (O₂) a usoudil, že činidlo schopné zoxidovat kyslík musí zvládnout i xenon. Hmotnost sama o sobě nic neurčuje a orbitaly d jsou u xenonu zaplněné (4d¹⁰) — na vazbě se prakticky nepodílejí."},
 {t:"single", q:"Jaký tvar má molekula <span class=\"chem\">XeF₄</span>?",
  o:["tetraedrická","<b>čtvercová rovinná</b>","trigonální pyramida","lineární"], c:1,
  e:"Xenon má 8 valenčních elektronů, čtyři použije na vazby a zbudou dva volné páry: celkem 6 párů, tedy oktaedrické uspořádání. Volné páry se odpuzují nejvíc, a proto zaujmou protilehlé vrcholy — čtyři fluory zbudou v jedné rovině. Tetraedr by odpovídal čtyřem párům bez volných, tedy XeO₄."},
 {t:"single", q:"Proč tvoří sloučeniny prakticky jen xenon, a ne argon?",
  o:["Argon má menší atomovou hmotnost, takže se vazba nestihne vytvořit","Argon se v přírodě vyskytuje jen ve vázané formě","Argon nemá dostatek valenčních elektronů","<b>Argon má výrazně vyšší ionizační energii (1521 proti 1170 kJ·mol⁻¹) a je hůř polarizovatelný</b>"], c:3,
  e:"Rozhoduje, jak drahé je narušit plnou slupku. U argonu to stojí o 350 kJ·mol⁻¹ víc než u xenonu a navíc je jeho malý atom hůř polarizovatelný. Argon je ve vzduchu volný, ne vázaný, a valenčních elektronů má stejně jako xenon — osm."},
 {t:"single", q:"Co vznikne úplnou hydrolýzou <span class=\"chem\">XeF₆</span> vodní parou?",
  o:["<b>XeO₃ a HF</b>","Xe, O₂ a HF","XeO₄ a HF","XeOF₄ a H₂"], c:0,
  e:"Úplná hydrolýza dává <span class=\"chem\">XeF₆ + 3 H₂O → XeO₃ + 6 HF</span> a oxidační číslo xenonu zůstává +VI — není to redoxní děj. Xe a O₂ vznikají při hydrolýze XeF₂, XeOF₄ je meziprodukt při hydrolýze opatrné a XeO₄ se z fluoridů přímo nezískává."},
 {t:"single", q:"Proč má xenon ve svých sloučeninách vždy <b>sudé</b> oxidační číslo?",
  o:["Protože kyslík má vždy −II","Protože fluor tvoří jen dvě vazby","<b>Protože všechny jeho valenční elektrony jsou spárované a při tvorbě vazeb se pár rozbíjí vždy celý</b>","Protože sudá čísla jsou u těžkých prvků energeticky výhodnější"], c:2,
  e:"Konfigurace 5s²5p⁶ neobsahuje žádný nepárový elektron, takže se do vazby uvolňují vždy dva elektrony najednou — odtud +II, +IV, +VI a +VIII. U halogenů je to naopak: jeden nepárový elektron navíc dává lichá čísla +I, +III, +V a +VII."},
 {t:"multi", q:"Které výroky o sloučeninách vzácných plynů platí?",
  o:["XeO₃ je v suchém stavu prudce výbušný","Sloučeniny helia a neonu za běžných podmínek neexistují","KrF₂ je stálý až do několika set stupňů Celsia","Xenoničelan se v analytické chemii cení proto, že jeho redukovanou formou je inertní xenon","Fluoridy xenonu vznikají přímým slučováním prvků"], c:[0,1,3,4],
  e:"KrF₂ je naopak velmi nestálý — nad −30 °C se sám rozkládá na prvky. Ostatní tvrzení platí: XeO₃ exploduje, helium a neon běžnou chemii nemají, xenoničelan po sobě nenechá žádný cizí kationt a fluoridy xenonu se skutečně dělají přímo z Xe a F₂."}
];

BANK.q2 = [
 {t:"single", q:"Proč nemá fluor žádnou kyslíkatou kyselinu?",
  o:["Protože je plynný a s vodou nereaguje","<b>Protože by v ní musel mít kladné oxidační číslo, což u nejelektronegativnějšího prvku nejde</b>","Protože jeho kyseliny jsou příliš nestálé a rozkládají se","Protože fluor tvoří pouze dvouatomové molekuly"], c:1,
  e:"Kladné oxidační číslo znamená, že partner odtáhne elektronovou hustotu — a nic elektronegativnějšího než fluor (3,98) neexistuje. Navíc fluor nemá ve druhé periodě orbitaly d, takže kolem sebe neuspořádá víc vazeb. Není to otázka stability: takové sloučeniny prostě nemají jak vzniknout."},
 {t:"single", q:"Jaké oxidační číslo má chlor v <span class=\"chem\">Ca(ClO)₂</span>?",
  o:["−I","<b>+I</b>","+III","+V"], c:1,
  e:"Vápník má +II, čtyři kyslíky dohromady −IV, takže dva chlory musí dát +II a každý +I. Je to chlornan vápenatý, hlavní účinná složka chlorového vápna. Kdo si splete závorku a počítá jen jeden kyslík, dostane chybně +III."},
 {t:"single", q:"Ve které sloučenině má fluor <b>kladné</b> oxidační číslo?",
  o:["v OF₂","v HF","v ClF₃","<b>v žádné — fluor kladné oxidační číslo nikdy nemá</b>"], c:3,
  e:"Ve všech třech uvedených sloučeninách je fluor na −I: v OF₂ nese kladné číslo (+II) kyslík, v HF vodík a v ClF₃ chlor (+III). Právě proto se OF₂ jmenuje fluorid kyslíku, a ne oxid fluorný — název aniontové části dostává vždy elektronegativnější prvek."},
 {t:"single", q:"Proč jsou kladná oxidační čísla halogenů lichá (+I, +III, +V, +VII)?",
  o:["<b>Do vazby vstoupí nejdřív nepárový elektron a pak se rozbíjejí celé elektronové páry, tedy po dvou</b>","Protože kyslík má vždy −II a lichá čísla vycházejí ze součtu","Protože sudá čísla by porušila oktetové pravidlo","Protože halogeny tvoří jen molekuly X₂"], c:0,
  e:"Konfigurace ns²np⁵ obsahuje jeden nepárový elektron (odtud +I) a tři páry; každý rozbitý pár přidá dva, tedy +III, +V a +VII. Sudá čísla se objeví jen u radikálů jako ClO₂ (+IV), kde jeden elektron do vazby vůbec nevstoupil."},
 {t:"single", q:"Která z těchto částic <b>nemůže</b> existovat?",
  o:["ClF₃","IF₇","BrO₄⁻","<b>FCl₃</b>"], c:3,
  e:"Ve <span class=\"chem\">FCl₃</span> by fluor musel mít +III a chlor −I, což je nemožné — fluor je elektronegativnější. Existuje jen obrácená sloučenina ClF₃, kde má chlor +III. IF₇ i BrO₄⁻ jsou reálné látky (bromistan byl připraven roku 1968)."},
 {t:"multi", q:"Které trendy ve skupině 17 směrem od fluoru k jodu platí?",
  o:["Elektronegativita klesá","Atomový poloměr roste","Ionizační energie roste","Oxidační síla prvku klesá","Elektronová afinita monotónně klesá"], c:[0,1,3],
  e:"Ionizační energie naopak <b>klesá</b> (1681 → 1008 kJ·mol⁻¹), protože valenční slupka je dál od jádra. A elektronová afinita není monotónní: chlor (349) uvolní víc než fluor (328), protože v malé slupce fluoru se elektrony tísní. Zbylé tři trendy jsou v pořádku."}
];

BANK.q3 = [
 {t:"single", q:"Jaké je skupenství a barva bromu za laboratorní teploty?",
  o:["žlutozelený plyn","<b>červenohnědá kapalina</b>","šedočerná pevná látka","světle žlutý plyn"], c:1,
  e:"Brom je jediný nekov kapalný za laboratorní teploty (taje při −7,2 °C a vře při 58,8 °C). Žlutozelený plyn je chlor, šedočerná pevná látka jod a světle žlutý plyn fluor."},
 {t:"single", q:"Proč je vazba F—F slabší než vazba Cl—Cl?",
  o:["Protože fluor má menší elektronegativitu než chlor","Protože se ve fluoru uplatňuje interakce π, která vazbu oslabuje","<b>Protože u velmi malého atomu fluoru se volné elektronové páry obou atomů silně odpuzují</b>","Protože molekula F₂ je ve skutečnosti iontová"], c:2,
  e:"Vazba F—F je dlouhá jen 142 pm a na této vzdálenosti se šest volných párů (tři na každém atomu) výrazně odpuzuje. U chloru je vazba delší (199 pm) a odpuzování se rozředí. Fluor má naopak elektronegativitu <b>vyšší</b> než chlor — to na vazbu mezi dvěma stejnými atomy stejně nemá vliv."},
 {t:"num", q:"O kolik kJ·mol⁻¹ je vazebná energie <span class=\"chem\">Cl₂</span> (242,6) vyšší než u <span class=\"chem\">F₂</span> (158,8)? (Zadejte v kJ·mol⁻¹.)",
  ans:83.8, tol:1.0, unit:"kJ·mol⁻¹",
  e:"242,6 − 158,8 = 83,8 kJ·mol⁻¹. Je to zhruba polovina energie samotné vazby F—F a právě tenhle rozdíl dělá z fluoru nejreaktivnější prvek: molekula se rozpadá na atomy nesrovnatelně snáz než chlor."},
 {t:"single", q:"Které tvrzení o jodu je správné?",
  o:["Je to jediný halogen, který se v přírodě vyskytuje v elementárním stavu","Ve vodě se rozpouští lépe než chlor i brom","Jeho páry jsou žlutozelené","<b>Snadno sublimuje a jeho páry jsou fialové</b>"], c:3,
  e:"Jod za normálního tlaku přechází z pevné látky přímo v páru, čehož se využívá k jeho čištění. Ve vodě je naopak nejhůř rozpustný z halogenů (0,33 g·dm⁻³) — dobře se rozpustí až v roztoku jodidu jako I₃⁻. V elementárním stavu se v přírodě nevyskytuje žádný halogen (kromě stop chloru v sopečných plynech)."},
 {t:"single", q:"Který zdroj je hlavní surovinou pro výrobu fluoru a jeho sloučenin?",
  o:["<b>kazivec (fluorit) CaF₂</b>","mořská voda","halit NaCl","chilský ledek"], c:0,
  e:"Kazivec je jediná ekonomicky významná surovina; z něj se kyselinou sírovou uvolní HF a z něj se pak elektrolýzou taveniny dělá fluor. Mořská voda je zdrojem chloru a bromu, halit chloru a chilský ledek jodu."},
 {t:"multi", q:"Které výroky o astatu jsou pravdivé?",
  o:["Všechny jeho izotopy jsou radioaktivní","V zemské kůře je ho odhadem méně než 25 gramů","Byl objeven při zpracování mořských řas","Izotop ²¹¹At se zkouší v cílené alfa-terapii nádorů","Jeho fyzikální konstanty v tabulkách jsou odhady, ne měření velkých vzorků"], c:[0,1,3,4],
  e:"Astat byl připraven uměle roku 1940 ostřelováním bismutu částicemi α, ne z mořských řas — tak se objevil jod (1811). Ostatní čtyři výroky platí; nikdy nebylo připraveno tolik astatu, aby ho bylo vidět, protože by se vzorek odpařil vlastním radioaktivním teplem."}
];

BANK.q4 = [
 {t:"single", q:"Která reakce <b>neproběhne</b>?",
  o:["Cl₂ + 2 KBr → 2 KCl + Br₂","Cl₂ + 2 KI → 2 KCl + I₂","<b>I₂ + 2 KBr → 2 KI + Br₂</b>","Br₂ + 2 KI → 2 KBr + I₂"], c:2,
  e:"Jod má nejnižší E° (0,54 V) ze všech uvedených, takže je nejslabší oxidační činidlo a bromid nezoxiduje — ΔE° by bylo −0,53 V. Platí pravidlo, že lehčí halogen vytěsní těžší, a nikdy naopak."},
 {t:"single", q:"Proč má fluor nejvyšší <span class=\"q\">E</span>° ze všech halogenů, i když jeho elektronová afinita je nižší než u chloru?",
  o:["Protože má nejmenší atomový poloměr","<b>Protože kombinuje slabou vazbu F—F s velmi vysokou hydratační energií malého iontu F⁻</b>","Protože fluorid je jediný halogenid, který netvoří sraženinu se stříbrem","Protože fluor reaguje i se vzácnými plyny"], c:1,
  e:"Celková energetika přeměny ½ F₂ → F⁻(aq) má tři kroky: štěpení vazby (u fluoru levné, jen +79 kJ·mol⁻¹), elektronová afinita (u fluoru horší, −328) a hydratace (u fluoru mnohem lepší, −515 proti −381 u chloridu). Součet vychází ve prospěch fluoru o 155 kJ·mol⁻¹."},
 {t:"single", q:"Co se stane, když do roztoku KI zavedeme <b>nadbytek</b> chloru?",
  o:["Nic dalšího — reakce se zastaví u vyloučeného jodu","Vznikne interhalogen ICl₃, roztok zčervená","Chlor se rozpustí a roztok zůstane hnědý","<b>Chlor jod dál zoxiduje na bezbarvou kyselinu jodičnou a hnědá barva zmizí</b>"], c:3,
  e:"Reakce pokračuje podle <span class=\"chem\">5 Cl₂ + I₂ + 6 H₂O → 2 HIO₃ + 10 HCl</span>. Je to klasický „zmizelý pokus“ ve školní laboratoři a oblíbená chytačka: hnědá barva se nejdřív objeví a pak zase zmizí."},
 {t:"single", q:"Proč vzniká reakcí železa s jodem jen <span class=\"chem\">FeI₂</span>, a ne <span class=\"chem\">FeI₃</span>?",
  o:["<b>Jod je příliš slabé oxidační činidlo na to, aby železo dostal na +III; případný Fe³⁺ by jodid hned zredukoval</b>","Protože jod je pevná látka a s železem reaguje jen povrchově","Protože FeI₃ by se rozpustil ve vodě a nedal se izolovat","Protože železo má v jodidech vždy oxidační číslo +II"], c:0,
  e:"S chlorem vzniká FeCl₃, protože chlor má E° 1,36 V. Jod má jen 0,54 V, což na oxidaci železa na +III nestačí — a i kdyby FeI₃ vznikl, jodid (jako dobré redukční činidlo) by ho okamžitě zredukoval zpět. Ze stejného důvodu neexistuje ani CuI₂."},
 {t:"num", q:"Jaké je ΔE° pro reakci <span class=\"chem\">Br₂ + 2 KI → 2 KBr + I₂</span>? E°(Br₂/2Br⁻) = 1,07 V, E°(I₂/2I⁻) = 0,54 V. (Zadejte ve voltech, kladné číslo.)",
  ans:0.53, tol:0.02, unit:"V",
  e:"ΔE° = E°(oxidační činidlo) − E°(redukční činidlo) = 1,07 − 0,54 = 0,53 V. Kladná hodnota znamená samovolný průběh; z log K = z·ΔE°/0,0592 při z = 2 vyjde K řádu 10¹⁸, tedy reakce prakticky kvantitativní."},
 {t:"multi", q:"Které výroky o reakcích halogenů s vodou a s hydroxidem platí?",
  o:["Chlor ve vodě částečně disproporcionuje na HCl a HClO","Fluor vodu zoxiduje a uvolní kyslík","Chlor ve studeném louhu dá chlornan, v horkém chlorečnan","Jod s vodou reaguje ochotněji než chlor","Fluor v louhu disproporcionuje na fluorid a fluornan"], c:[0,1,2],
  e:"Jod s vodou prakticky nereaguje — rovnováha disproporcionace se posouvá doleva, čím je halogen těžší. A fluor nedisproporcionuje nikdy, protože kladné oxidační číslo nemá jak získat; „fluornan“ neexistuje. Zbylé tři výroky jsou správné."}
];
