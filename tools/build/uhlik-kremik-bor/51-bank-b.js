/* ============================================================
   24 · BANKA OTÁZEK — kapitolové mini-testy k5 až k8
   ============================================================ */
BANK.q5=[
 {t:"single",q:"Minerál má poměr Si&nbsp;:&nbsp;O roven 1&nbsp;:&nbsp;2,50. Jakou má strukturu a jaký mechanický projev byste u něj čekali?",
  o:["izolované tetraedry, žádná štěpnost","jednoduchý řetězec, protáhlé krystaly","vrstevnatou strukturu se třemi sdílenými vrcholy, dokonalou štěpnost do lístků","prostorovou síť, tvrdý kámen bez štěpnosti"],c:2,
  e:"Poměr 1&nbsp;:&nbsp;2,50 odpovídá aniontu (Si₂O₅²⁻)ₙ, tedy třem sdíleným vrcholům na tetraedr a zřetězení do celé roviny. Vrstvy drží pohromadě jen slabé síly, takže se materiál dokonale štípe v jednom směru — patří sem slídy, mastek a jíly. Kdyby byl poměr 1&nbsp;:&nbsp;2,00, šlo by o síť (křemen), při 1&nbsp;:&nbsp;3,00 o řetězec."},
 {t:"single",q:"Jaké je jediné pravidlo pro spojování tetraedrů SiO₄ ve všech křemičitanech?",
  o:["Sdílejí výhradně vrcholy, nikdy hranu ani stěnu","Sdílejí vrcholy i hrany podle typu minerálu","Sdílejí vždy celé stěny, aby byla struktura co nejhutnější","Nesdílejí nic, jsou spojeny přes kationty kovů"],c:0,
  e:"Sdílení hranou by přiblížilo oba atomy křemíku natolik, že by se jejich kladné náboje silně odpuzovaly. Spojení vrcholem to nedovolí — mezi křemíky zůstane můstkový kyslík a úhel Si—O—Si je asi 144°. Poslední možnost popisuje jen jeden speciální případ, orthosilikáty, kde tetraedry skutečně nesdílejí nic."},
 {t:"single",q:"Čím se liší <b>silikagel</b> od <b>zeolitu</b>?",
  o:["Silikagel je krystalický, zeolit amorfní","Silikagel je amorfní SiO₂ s nepravidelnými póry, zeolit je krystalický hlinitokřemičitan s dutinami přesné velikosti","Silikagel obsahuje hliník, zeolit ne","Silikagel se používá jako měnič iontů, zeolit jen jako sušidlo"],c:1,
  e:"Silikagel suší tím, že vodu sorbuje na svůj náhodně členitý povrch. Zeolit má naopak <b>kalibrované</b> dutiny, a proto propustí jen molekuly menší než určitý průměr (molekulové síto) a navíc dokáže vyměňovat kationty ve svých dutinách (měnič iontů). Právě přítomnost hliníku dává zeolitu záporný náboj, který kationty vyrovnávají."},
 {t:"single",q:"Proč se kyselina fluorovodíková nesmí skladovat ve skleněných lahvích?",
  o:["Protože rozpouští sodík obsažený ve skle a sklo zkřehne","Protože je natolik silná kyselina, že rozleptá jakýkoli materiál","Protože se ve skle rozkládá na fluor a vodík","Protože reaguje s oxidem křemičitým podle rovnice SiO₂ + 4 HF → SiF₄ + 2 H₂O"],c:3,
  e:"Fluorovodík je jediná běžná kyselina, která na oxid křemičitý působí — proto se jí sklo leptá a proto se skladuje v polyethylenových lahvích. Poznámka k lákavé druhé možnosti: kyselina fluorovodíková je ve skutečnosti <b>slabá</b> kyselina; její nebezpečnost neplyne z kyselosti, ale z reaktivity fluoridového aniontu."},
 {t:"num",q:"Kolik procent hmotnosti oxidu křemičitého tvoří křemík? <span class='mono'>M</span>(Si) = 28,09 a <span class='mono'>M</span>(SiO₂) = 60,08 g·mol⁻¹. (Zadejte v procentech na jedno desetinné místo.)",
  ans:46.7, tol:0.6, unit:"%",
  e:"Hmotnostní zlomek je 28,09 / 60,08 = 0,4674, tedy 46,7 %. Kyslík tvoří zbývajících 53,3 % — i v kameni, který vnímáme jako „křemen“, je hmotnostně víc kyslíku než křemíku. Odpovídá to i celkovému zastoupení prvků v zemské kůře, kde kyslík zaujímá asi 46 % a křemík asi 28 % hmotnosti."},
 {t:"multi",q:"Které minerály nebo látky mají <b>prostorovou síť</b> tetraedrů se všemi čtyřmi sdílenými vrcholy?",
  o:["křemen SiO₂","olivín (Mg,Fe)₂SiO₄","živce KAlSi₃O₈","zeolity","mastek Mg₃Si₄O₁₀(OH)₂"],c:[0,2,3],
  e:"Prostorovou síť tvoří křemen a hlinitokřemičitany, ve kterých je část křemíku nahrazena hliníkem — živce a zeolity. Olivín má izolované tetraedry (poměr 1&nbsp;:&nbsp;4) a mastek vrstevnatou strukturu (poměr 1&nbsp;:&nbsp;2,50). Poznáte to přímo z poměru Si&nbsp;:&nbsp;O ve vzorci, u hlinitokřemičitanů ovšem musíte do součtu započítat i hliník."}
];

BANK.q6=[
 {t:"single",q:"Proč se do sklářské vsázky přidává kromě sody i <b>vápenec</b>?",
  o:["Aby sklo získalo bílou barvu","Protože by samotný křemičitan sodný byl rozpustný ve vodě (vodní sklo); vápník síť zpevní","Aby se snížila teplota tání ještě víc než sodou","Aby sklo lépe propouštělo ultrafialové záření"],c:1,
  e:"Soda sníží teplotu zpracování z 1713 °C zhruba na 1200 °C tím, že přeruší část můstků Si—O—Si. Kdyby zůstalo jen u ní, vzniklo by vodní sklo, které se rozpouští. Dvojmocný vápník váže dva nemůstkové kyslíky najednou, síť tím zpevní a vrátí sklu nerozpustnost, aniž by teplotu tání zvedl zpátky."},
 {t:"single",q:"Varné sklo snese prudkou změnu teploty. Čím to je?",
  o:["Je tvrdší než běžné sklo, takže odolá mechanickému namáhání","Obsahuje olovo, které pohlcuje tepelné záření","Má nízkou teplotní roztažnost (3,3 proti 9,0·10⁻⁶ K⁻¹), takže se při ohřevu skoro nezvětší a nevznikne v něm pnutí","Má vyšší teplotu tání než všechna ostatní skla"],c:2,
  e:"Rozhoduje teplotní roztažnost, ne tvrdost. Když se horké a studené místo skla roztahují nestejně, vznikne mechanické pnutí, které sklo roztrhne. Borosilikátové sklo se ohřevem téměř nezvětší, takže pnutí je malé. Nejvyšší teplotu tání má ostatně křemenné sklo, ne borosilikátové."},
 {t:"single",q:"Čím se liší tuhnutí <b>vzdušného vápna</b> od tuhnutí <b>portlandského cementu</b>?",
  o:["Vápno tuhne reakcí se vzdušným CO₂, kdežto cement hydratuje, a proto tuhne i pod vodou","Vápno tuhne rychleji, cement pomaleji, jinak je princip stejný","Vápno tuhne hydratací, cement karbonatací","Obojí tuhne odpařením vody, liší se jen rychlostí"],c:0,
  e:"Hašené vápno Ca(OH)₂ tvrdne zpětnou reakcí <span class='chem'>Ca(OH)₂ + CO₂ → CaCO₃ + H₂O</span>, takže bez vzdušného oxidu uhličitého tvrdnout nemůže. Slínkové minerály cementu — alit 3CaO·SiO₂ a belit 2CaO·SiO₂ — naopak s vodou hydratují a vytvoří provázané krystaly. Proto se cementu říká <b>hydraulické</b> pojivo."},
 {t:"single",q:"Co dává porcelánu jeho pevnost a proč je bílý?",
  o:["Vysoký obsah oxidu olovnatého, který se při výpalu rozptýlí","Sklovitá poleva, která střep zpevní zvenčí","Krystaly křemene, které se při výpalu zvětší","Jehličky mullitu vzniklé z kaolinitu, které prorostou taveninou; bílý je proto, že kaolinit neobsahuje železo"],c:3,
  e:"Kaolinit <span class='chem'>Al₂Si₂O₅(OH)₄</span> se při 1400 °C rozpadne a přeskupí na jehličky mullitu 3Al₂O₃·2SiO₂, které prorostou taveninou vzniklou z živce a působí jako výztuž — podobně jako armatura v betonu. Bílá barva plyne z toho, že kaolin neobsahuje sloučeniny železa, které barví běžnou cihlářskou hlínu do červena."},
 {t:"num",q:"Kolik kilogramů oxidu uhličitého se uvolní při tavení vsázky na 1,00 t sodnovápenatého skla <span class='chem'>Na₂O·CaO·6&nbsp;SiO₂</span>? <span class='mono'>M</span>(sklo) = 478,6 a <span class='mono'>M</span>(CO₂) = 44,01 g·mol⁻¹, na jeden mol skla připadají dva moly CO₂. (Zadejte v kg zaokrouhleně na celé kilogramy.)",
  ans:184, tol:5, unit:"kg",
  e:"Látkové množství skla je 1 000 000 / 478,6 = 2089 mol, oxidu uhličitého tedy dvojnásobek, 4179 mol. Hmotnost je 4179 · 44,01 = 183 900 g, tedy asi 184 kg. Na jednu tunu skla musíte navážit skoro 1,2 t surovin — rozdíl odejde jako plyn. Recyklované střepy tuto ztrátu nemají, protože už jednou pálením prošly."},
 {t:"multi",q:"Které vlastnosti silikonů plynou přímo z jejich struktury <span class='chem'>—Si—O—Si—O—</span> s organickými substituenty?",
  o:["teplotní stálost zhruba od −50 do +250 °C","hydrofobní povrch","rozpustnost ve vodě","viskozita, která se s teplotou mění jen málo","schopnost vést elektrický proud"],c:[0,1,3],
  e:"Anorganická kostra s pevnou vazbou Si—O (466 kJ·mol⁻¹) dává teplotní stálost a málo proměnnou viskozitu, kdežto organické skupiny trčící ven dělají povrch hydrofobním — proto se silikony používají k impregnaci a jako formy na pečení. Rozpustné ve vodě nejsou právě kvůli té hydrofobnosti a proud nevedou, protože v nich nejsou volné nosiče náboje."}
];

BANK.q7=[
 {t:"single",q:"Kolik valenčních elektronů má molekula diboranu <span class='chem'>B₂H₆</span> a co z toho plyne?",
  o:["12 elektronů, tedy šest párů — jeden pár chybí, takže musí vzniknout dva můstky B—H—B","14 elektronů, tedy sedm párů — molekula má klasickou strukturu jako ethan","16 elektronů, takže má bor volný elektronový pár","10 elektronů, proto je molekula radikál"],c:0,
  e:"Bor přispívá třemi elektrony a vodík jedním: 2·3 + 6·1 = 12, tedy šest párů. Kdyby byla molekula stavěná jako ethan, potřebovala by sedm vazeb, a tedy sedm párů. Chybějící pár si molekula vyřeší dvěma třístředovými můstky B—H—B; vazba B—B v ní <b>není</b>."},
 {t:"single",q:"Co je <b>třístředová dvouelektronová vazba</b>?",
  o:["Vazba mezi třemi atomy zprostředkovaná třemi elektronovými páry","Vazba, ve které se elektronový pár dělí mezi dva atomy, ale je delokalizovaný přes třetí","Vazba, v níž jsou tři atomy poutány jediným elektronovým párem","Slabá interakce podobná vodíkovému můstku, jen mezi třemi atomy"],c:2,
  e:"Překryvem tří orbitalů vzniknou tři molekulové orbitaly — vazebný, nevazebný a protivazebný. Obsazený je jen ten nejnižší, vazebný, a ten je rozprostřen přes všechna tři jádra. Poslední možnost je typická past: můstkový vodík v boranech není vodíkový můstek, ale <b>pravá kovalentní vazba</b>."},
 {t:"single",q:"Která z těchto látek se chová jako <b>Lewisova kyselina</b> a proč?",
  o:["NH₃, protože má volný elektronový pár","CH₄, protože má čtyři vazby σ","H₂O, protože odštěpuje proton","BF₃, protože má kolem boru jen sextet a prázdný orbital 2p"],c:3,
  e:"Lewisova kyselina je <b>akceptor</b> elektronového páru. Bor v BF₃ má jen šest elektronů a prázdný orbital, takže pár ochotně přijme, přejde na hybridizaci sp³ a doplní si oktet. Amoniak je naopak Lewisova <b>zásada</b> — donor páru; oba spolu tvoří adukt F₃B←NH₃."},
 {t:"single",q:"Kubický nitrid boritý je o něco měkčí než diamant, a přesto se na obrábění oceli používá právě on. Proč?",
  o:["Protože je levnější než diamant","Protože se uhlík z diamantu při vysoké teplotě rozpouští v železe, kdežto nitrid boritý je vůči železu stálý","Protože nitrid boritý lépe vede teplo","Protože diamant je elektricky vodivý a nástroj by zkratoval"],c:1,
  e:"Při obrábění dosahuje břit velmi vysokých teplot a uhlík se za nich rozpouští v železe — diamantový nástroj se doslova rozpouští v materiálu, který má řezat. Kubický nitrid boritý tenhle problém nemá, protože je vůči železu chemicky stálý. Diamant navíc proud nevede, je to izolant."},
 {t:"num",q:"Kolik dm³ vodíku při 25 °C vznikne úplnou hydrolýzou 1,00 g diboranu? <span class='mono'>M</span>(B₂H₆) = 27,67 g·mol⁻¹, <span class='mono'>V</span><sub>m</sub> = 24,47 dm³·mol⁻¹. (Zadejte v dm³ na dvě desetinná místa.)",
  ans:5.31, tol:0.12, unit:"dm³",
  e:"Podle rovnice <span class='chem'>B₂H₆ + 6 H₂O → 2 H₃BO₃ + 6 H₂</span> dává jeden mol diboranu šest molů vodíku. Látkové množství je 1,00 / 27,67 = 0,03614 mol, vodíku tedy 0,2169 mol a objem 5,31 dm³. Všimněte si, že je to <b>redoxní</b> děj — hydridový vodík z boranu (−I) a vodík z vody (+I) spolu synproporcionují na H₂."},
 {t:"multi",q:"Které tvrzení o <b>hexagonálním nitridu boritém</b> (h-BN) jsou správná?",
  o:["má strukturu podobnou grafitu","vede elektrický proud stejně dobře jako grafit","je bílý, proto se mu říká „bílý grafit“","používá se jako vysokoteplotní mazivo","je izoelektronovou obdobou uhlíku"],c:[0,2,3,4],
  e:"Dvojice atomů B a N má dohromady stejný počet valenčních elektronů jako dva atomy uhlíku, proto se BN strukturně chová jako uhlík. Proud ale <b>nevede</b>: protože se v mřížce střídají dva různé prvky, nejsou elektrony π rovnoměrně delokalizované, ale drží se u elektronegativnějšího dusíku. Zakázaný pás h-BN je asi 5,9 eV."}
];

BANK.q8=[
 {t:"single",q:"Kyselina boritá <span class='chem'>H₃BO₃</span> má ve vzorci tři vodíky. Kolik protonů odštěpí a jakým mechanismem?",
  o:["Tři, postupně ve třech disociačních stupních","Jeden, ale nikoli ze své molekuly — jako Lewisova kyselina přijme OH⁻ z vody a uvolní se proton z ní","Dva, protože třetí vodík je vázán příliš pevně","Žádný, kyselina boritá je ve vodě neutrální"],c:1,
  e:"Kyselina boritá je <b>jednosytná</b> (pKₐ = 9,24) a její kyselost je jen důsledkem elektronového deficitu: <span class='chem'>H₃BO₃ + 2 H₂O ⇌ [B(OH)₄]⁻ + H₃O⁺</span>. Bor při tom přejde z hybridizace sp² na sp³ a doplní si oktet. Zápis „H₃BO₃ → 3 H⁺ + BO₃³⁻“ je klasická chyba, na které se u maturity dá spolehnout."},
 {t:"single",q:"Proč se prvek na začátku periody chová podobně jako jeho soused <b>šikmo dolů doprava</b>?",
  o:["Protože mají stejný počet valenčních elektronů","Protože mají stejné oxidační číslo","Protože leží ve stejné periodě, jen v jiné skupině","Protože vliv rostoucího náboje jádra směrem doprava a rostoucího poloměru směrem dolů se po diagonále vyruší, takže mají podobnou hustotu náboje a elektronegativitu"],c:3,
  e:"Diagonální dvojice mají různý počet valenčních elektronů i různá oxidační čísla — Be je dvojmocné a Al trojmocné. Podobné mají to podstatné: <b>hustotu náboje</b>, tedy poměr náboje k velikosti iontu, a tím i schopnost polarizovat vazbu. Odtud amfoterní oxidy u obou, kovalentní chloridy s můstky a pasivace v koncentrované HNO₃."},
 {t:"single",q:"Křemík dopovaný <b>fosforem</b> dává polovodič typu N. Čím je nosičem náboje a kde leží hladina příměsi?",
  o:["Nosičem je elektron, hladina leží těsně pod vodivostním pásem","Nosičem je díra, hladina leží těsně nad valenčním pásem","Nosičem je proton, hladina leží uprostřed zakázaného pásu","Nosičem je elektron, hladina splývá s valenčním pásem"],c:0,
  e:"Fosfor má pět valenčních elektronů; čtyři se zapojí do vazeb s okolními křemíky a pátý zůstane vázán jen slabě. Jeho hladina proto leží těsně pod vodivostním pásem a už při pokojové teplotě z ní elektron odchází. Popis s dírou nad valenčním pásem by odpovídal typu P, tedy dopování borem."},
 {t:"single",q:"Ve kterých vlastnostech se projevuje diagonální podobnost <b>B—Si</b>?",
  o:["Oba prvky tvoří stálé molekulové oxidy podobné oxidu uhličitému","Oba tvoří kyselé polymerní oxidy tuhnoucí jako sklo, slabé kondenzující kyseliny, samozápalné hydridy a hydrolyzující halogenidy","Oba tvoří ionty s nábojem 3+ a jejich soli jsou iontové","Oba tvoří uhlovodíkům podobné řetězce se stálými vazbami na vodík"],c:1,
  e:"Právě tenhle soubor podobností prochází celým okruhem: B₂O₃ i SiO₂ jsou kyselé, polymerní a mísitelné do borosilikátového skla; H₃BO₃ i H₄SiO₄ jsou velmi slabé a polykondenzují; B₂H₆ i SiH₄ jsou samozápalné a hydrolyzují; BCl₃ i SiCl₄ prudce hydrolyzují na kyselinu. Ionty B³⁺ ani Si⁴⁺ přitom neexistují."},
 {t:"single",q:"Proč křemík v elektronice vytlačil germanium, přestože germanium má užší zakázaný pás?",
  o:["Protože je křemík tvrdší a mechanicky odolnější","Protože se křemík vyskytuje v přírodě v elementární formě","Protože je germanium radioaktivní","Protože má křemík oxid SiO₂, který je dokonalým izolantem a vyroste na povrchu sám prostým zahřátím v kyslíku"],c:3,
  e:"Užší pás germania je spíš nevýhoda — při zahřátí teče nežádoucí svodový proud. Rozhodující ale byla technologická výhoda křemíku: jeho oxid je nerozpustný, mechanicky pevný a výborně izoluje, a dá se vypěstovat přesně tam, kde je ho třeba. GeO₂ je naproti tomu rozpustný ve vodě. Křemík se navíc v přírodě volný nevyskytuje vůbec."},
 {t:"multi",q:"Které tvrzení o <b>boraxu</b> jsou správná?",
  o:["jeho skutečná struktura odpovídá vzorci Na₂[B₄O₅(OH)₄]·8H₂O","obsahuje jak trigonálně planární skupiny BO₃, tak tetraedrické BO₄","jeho vodný roztok reaguje kysele","používá se ve sklářství a jako tavidlo při pájení","je základní surovinou pro výrobu kyseliny borité"],c:[0,1,3,4],
  e:"Roztok boraxu reaguje <b>zásaditě</b>, protože anion slabé kyseliny ve vodě hydrolyzuje; borax se proto používá i jako pufr. Tradiční zápis Na₂B₄O₇·10H₂O je jen stechiometrický — skutečná struktura obsahuje bicyklický anion se dvěma atomy boru v trojné a dvěma ve čtyřné koordinaci."}
];
