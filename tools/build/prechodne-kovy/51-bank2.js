/* ============================================================
   33 · KVÍZY KAPITOL 4 AŽ 8
   ============================================================ */
BANK.q4=[
 {t:"single",q:"Čím se prokáže přítomnost <b>železitých</b> iontů nejjednoznačněji?",
  o:["odbarvením manganistanu","vznikem bílé sraženiny s&nbsp;chloridem","modrým zbarvením s&nbsp;červenou krevní solí","krvavě červeným zbarvením s&nbsp;thiokyanatanem"],c:3,
  e:"Thiokyanatan dá s&nbsp;Fe³⁺ krvavě červený komplex, kdežto s&nbsp;Fe²⁺ nereaguje vůbec — je to nejostřejší rozlišení obou iontů. Manganistan naopak odbarví <b>železnatý</b> ion, protože ten je redukovadlo; s&nbsp;železitým se nic nestane."},
 {t:"single",q:"Proč jsou si železo, kobalt a&nbsp;nikl navzájem podobnější než svým svislým sousedům?",
  o:["Přibývající elektron jde do vnitřní vrstvy d, takže se vnější sféra ns² prakticky nemění.","Mají stejný počet protonů v&nbsp;jádře.","Tvoří spolu intermetalické sloučeniny.","Všechny tři mají oxidační číslo VIII."],c:0,
  e:"Poloměry se liší jen o&nbsp;jednotky pikometrů (126, 125, 125&nbsp;pm) a&nbsp;elektronegativity o&nbsp;setiny, protože nový elektron míří dovnitř atomu. Oxidačního čísla VIII nedosáhne ani jeden z&nbsp;nich — právě to je pro triádu typické."},
 {t:"single",q:"Které tvrzení o&nbsp;dvojici <span class=\"chem\">Fe²⁺</span> a&nbsp;<span class=\"chem\">Fe³⁺</span> platí?",
  o:["Fe³⁺ se na vzduchu snadno redukuje na Fe²⁺.","Oba ionty mají stejný počet nepárových elektronů.","Fe³⁺ hydrolyzuje silněji, protože má větší náboj na menším poloměru.","Fe²⁺ tvoří červenohnědý hydroxid."],c:2,
  e:"Kation s&nbsp;větším nábojem přitahuje elektrony vazby O–H v&nbsp;koordinované vodě silněji, takže se proton snáz odštěpí a&nbsp;roztok je kyselejší. Na vzduchu se oxiduje Fe²⁺ na Fe³⁺, ne naopak; nepárových elektronů má Fe²⁺ čtyři a&nbsp;Fe³⁺ pět a&nbsp;červenohnědý je hydroxid železitý."},
 {t:"multi",q:"Které látky obsahují železo v&nbsp;oxidačním čísle III?",
  o:["FeO","Fe₂O₃","K₃[Fe(CN)₆]","FeSO₄·7H₂O","Fe(OH)₃"],c:[1,2,4],
  e:"Oxid železitý, hexakyanoželezitan draselný a&nbsp;hydroxid železitý mají železo ve stavu III. Oxid železnatý a&nbsp;zelená skalice mají II. U&nbsp;komplexu se počítá náboj ligandu: <span class=\"q\">x</span> + 6·(−1) = −3, tedy x&nbsp;= III."},
 {t:"single",q:"K&nbsp;čemu slouží Mondův proces?",
  o:["k&nbsp;výrobě oceli z&nbsp;litiny","k&nbsp;čištění niklu přes těkavý tetrakarbonyl","k&nbsp;výrobě kyseliny sírové","k&nbsp;oddělení kobaltu od železa"],c:1,
  e:"Nikl s&nbsp;oxidem uhelnatým vytvoří při 50 až 60 °C těkavý <span class=\"chem\">[Ni(CO)₄]</span>, nečistoty nereagují; při 230 °C se karbonyl rozloží zpět na velmi čistý kov. Je to elegantní ukázka toho, že táž reakce může jít oběma směry podle teploty."},
 {t:"num",q:"Kolik procent železa obsahuje čistý hematit <span class=\"chem\">Fe₂O₃</span>? (<span class=\"q\">M</span>(Fe) = 55,85, <span class=\"q\">M</span>(O) = 16,00 g·mol⁻¹.)",
  ans:69.9, tol:0.6, unit:"%",
  e:"Molární hmotnost je 2·55,85 + 3·16,00 = 159,70&nbsp;g·mol⁻¹ a&nbsp;podíl železa 111,70 / 159,70 = 0,699. Magnetit <span class=\"chem\">Fe₃O₄</span> je bohatší (72,4 %), protože obsahuje část železa ve stavu II, a&nbsp;tedy méně kyslíku na atom železa."}
];

BANK.q5=[
 {t:"single",q:"Proč se měď nerozpouští ve zředěné kyselině chlorovodíkové?",
  o:["Protože má kladný standardní potenciál, takže ji proton nezoxiduje.","Protože se pokryje nerozpustným chloridem.","Protože je kyselina příliš zředěná.","Protože měď reaguje jen se zásadami."],c:0,
  e:"Měď má <span class=\"q\">E</span>° = +0,34&nbsp;V, tedy nad vodíkem — proton na její oxidaci nestačí. Rozpustí ji až kyselina, která sama oxiduje (dusičná, horká koncentrovaná sírová). Pasivace chloridem je naopak důvod, proč se v&nbsp;lučavce nerozpustí <b>stříbro</b>."},
 {t:"single",q:"Které tvrzení o&nbsp;lučavce královské je správné?",
  o:["Rozpustí každý kov včetně stříbra.","Je to směs kyseliny sírové a&nbsp;dusičné.","Nerozpustí zlato, ale rozpustí platinu.","Zlato rozpustí, stříbro nikoli — to se pokryje nerozpustným AgCl."],c:3,
  e:"Lučavka je směs koncentrované <span class=\"chem\">HNO₃</span> a&nbsp;<span class=\"chem\">HCl</span> v&nbsp;poměru 1&nbsp;:&nbsp;3; kyselina oxiduje a&nbsp;chloridy vzniklý kation zabalí do <span class=\"chem\">[AuCl₄]⁻</span>. U&nbsp;stříbra ale chloridy vytvoří nerozpustnou vrstvičku, která reakci zastaví — proto se zlato od stříbra odděluje nejdřív kyselinou dusičnou."},
 {t:"single",q:"Co se stane s&nbsp;jednoduchým iontem <span class=\"chem\">Cu⁺</span> ve vodném roztoku?",
  o:["Je stálý a&nbsp;dává modré roztoky.","Oxiduje vodu na kyslík.","Disproporcionuje na <span class=\"chem\">Cu²⁺</span> a&nbsp;kovovou měď.","Sráží se jako hydroxid měďný."],c:2,
  e:"Měďný ion se ve vodě rozpadne na měďnatý ion a&nbsp;kovovou měď — část se zoxiduje a&nbsp;část zredukuje. Udrží se jen v&nbsp;nerozpustných sloučeninách (<span class=\"chem\">CuI</span>, <span class=\"chem\">Cu₂O</span>) nebo v&nbsp;komplexech. Modré jsou roztoky měďnaté, protože <span class=\"chem\">Cu⁺</span> má d¹⁰ a&nbsp;je bezbarvý."},
 {t:"single",q:"Proč se zlato rozpouští v&nbsp;roztoku kyanidu se vzdušným kyslíkem, přestože kyslík je slabé oxidovadlo?",
  o:["Kyanid je silná kyselina.","Kyslík se v&nbsp;kyanidu chová jako silné oxidovadlo.","Reakce probíhá jen za vysokého tlaku.","Kyanid odebírá vzniklé ionty do velmi stálého komplexu, čímž sníží potenciál zlata z&nbsp;+1,50 na −0,60&nbsp;V."],c:3,
  e:"Odebráním produktu se rovnováha posune a&nbsp;efektivní potenciál dvojice klesne natolik, že na oxidaci stačí i&nbsp;rozpuštěný kyslík. Je to stejný princip jako u&nbsp;lučavky, jen s&nbsp;jiným ligandem. Kyanid je naopak sůl velmi slabé kyseliny."},
 {t:"multi",q:"Které dvojice sloučenina a&nbsp;oxidační číslo jsou správné?",
  o:["Cu₂O — měď I","AgNO₃ — stříbro II","H[AuCl₄] — zlato III","CuSO₄·5H₂O — měď II","Ag₂S — stříbro II"],c:[0,2,3],
  e:"Oxid měďný má měď I, kyselina tetrachlorozlatitá zlato III a&nbsp;skalice modrá měď II. Stříbro je v&nbsp;dusičnanu i&nbsp;v&nbsp;sulfidu ve stavu <b>I</b> — stav II je u&nbsp;stříbra zcela výjimečný a&nbsp;odpovídající sloučeniny jsou velmi silná oxidovadla."},
 {t:"num",q:"Kolik gramů mědi se maximálně vyloučí z&nbsp;roztoku 12,5&nbsp;g <span class=\"chem\">CuSO₄·5H₂O</span> po vložení železného hřebíku? (<span class=\"q\">M</span> = 249,7 a&nbsp;63,55&nbsp;g·mol⁻¹.)",
  ans:3.18, tol:0.1, unit:"g",
  e:"Reakce <span class=\"chem\">Fe + CuSO₄ → FeSO₄ + Cu</span> jde v&nbsp;poměru 1&nbsp;:&nbsp;1, tedy <span class=\"q\">n</span> = 12,5 / 249,7 = 0,0501&nbsp;mol a&nbsp;<span class=\"q\">m</span> = 0,0501 · 63,55 = 3,18&nbsp;g. Kdo zapomene krystalovou vodu a&nbsp;počítá s&nbsp;<span class=\"q\">M</span> = 159,6, vyjde mu 4,98&nbsp;g — chyba přes padesát procent."}
];

BANK.q6=[
 {t:"single",q:"Proč zinek nesplňuje definici přechodného kovu?",
  o:["Protože leží mimo blok d.","Protože netvoří komplexy.","Protože má jen jeden valenční elektron.","Protože má konfiguraci d¹⁰ v&nbsp;atomu i&nbsp;v&nbsp;jediném dostupném kationtu Zn²⁺."],c:3,
  e:"Definice žádá neúplné zaplnění orbitalů d&nbsp;alespoň v&nbsp;jednom běžném stavu, a&nbsp;to zinek nikdy nemá. V&nbsp;bloku d&nbsp;přitom leží a&nbsp;komplexy tvoří velmi ochotně — to je jediná vlastnost, kterou s&nbsp;přechodnými kovy sdílí."},
 {t:"single",q:"Který argument nejlépe dokládá, že se elektrony d&nbsp;u&nbsp;zinkové skupiny neúčastní kovové vazby?",
  o:["Nízké teploty tání: zinek 420 °C, kadmium 321 °C, rtuť je kapalná.","To, že jsou tyto kovy jedovaté.","To, že tvoří amminkomplexy.","To, že se vyskytují v&nbsp;sulfidických rudách."],c:0,
  e:"Vanad taje při 1910 °C, protože do kovové vazby vstupují i&nbsp;elektrony d. U&nbsp;zinkové skupiny drží vazbu jen dvojice <span class=\"chem\">ns²</span>, a&nbsp;proto jsou teploty tání směšně nízké. Toxicita, komplexy ani typ rudy s&nbsp;kovovou vazbou nesouvisejí."},
 {t:"single",q:"Co znamená vzorec <span class=\"chem\">Hg₂Cl₂</span>?",
  o:["Dva samostatné ionty Hg⁺ vedle sebe.","Skupinu Hg₂²⁺ s&nbsp;kovalentní vazbou kov–kov, formálně tedy rtuť v&nbsp;oxidačním čísle I.","Směs kovové rtuti a&nbsp;chloridu rtuťnatého.","Rtuť v&nbsp;oxidačním čísle II."],c:1,
  e:"Samostatný ion <span class=\"chem\">Hg⁺</span> neexistuje. Každý atom rtuti si jeden elektron ponechá na vazbu k&nbsp;sousedovi a&nbsp;jeden odevzdá, takže vznikne dvojice s&nbsp;nábojem 2+. Formálně z&nbsp;toho plyne oxidační číslo I&nbsp;na atom — jediný takový případ ve skupině 12."},
 {t:"single",q:"Která reakce dokazuje amfoterní charakter zinku?",
  o:["Zn + H₂SO₄ → ZnSO₄ + H₂","Zn + Cl₂ → ZnCl₂","2 ZnS + 3 O₂ → 2 ZnO + 2 SO₂","Zn + 2 OH⁻ + 2 H₂O → [Zn(OH)₄]²⁻ + H₂"],c:3,
  e:"Amfoterie znamená reakci s&nbsp;kyselinou <b>i</b> se zásadou. Reakce s&nbsp;kyselinou sírovou sama o&nbsp;sobě amfoterii nedokazuje — to umí každý neušlechtilý kov. Teprve rozpouštění v&nbsp;hydroxidu za vzniku tetrahydroxozinečnatanu je důkaz."},
 {t:"single",q:"Proč netvoří zinek, kadmium ani rtuť karbonyly?",
  o:["Jejich plné orbitaly d&nbsp;nemají co nabídnout do protivazebného orbitalu π* ligandu.","Oxid uhelnatý je pro ně příliš velký ligand.","Reagovaly by explozivně.","Nemají volné orbitaly pro koordinační vazbu."],c:0,
  e:"Karbonyl drží pohromadě zpětnou donací π&nbsp;— kov musí umět vrátit elektrony do orbitalu <span class=\"chem\">π*</span> ligandu. Zinková skupina má zaplněné d&nbsp;na příliš nízké energii, takže tuhle roli neplní. Volné orbitaly pro prostou donaci σ&nbsp;naopak má, a&nbsp;proto komplexy s&nbsp;donory σ&nbsp;tvoří ochotně."},
 {t:"num",q:"Kolik decimetrů krychlových vodíku za normálních podmínek vznikne rozpuštěním 6,54&nbsp;g zinku v&nbsp;nadbytku hydroxidu sodného? (<span class=\"q\">M</span>(Zn) = 65,38&nbsp;g·mol⁻¹, <span class=\"q\">V</span><sub>m</sub> = 22,41&nbsp;dm³·mol⁻¹.)",
  ans:2.24, tol:0.08, unit:"dm³",
  e:"Podle rovnice Zn + 2 OH⁻ + 2 H₂O → [Zn(OH)₄]²⁻ + H₂ je poměr 1&nbsp;:&nbsp;1. Látkové množství zinku je 6,54 / 65,38 = 0,100&nbsp;mol, objem vodíku 0,100 · 22,41 = 2,24&nbsp;dm³. S&nbsp;kyselinou by vyšlo totéž — zinek v&nbsp;obou případech odevzdá dva elektrony."}
];

BANK.q7=[
 {t:"single",q:"Které dvě vlastnosti dělají z&nbsp;přechodných kovů dobré katalyzátory?",
  o:["Proměnlivá oxidační čísla a&nbsp;volné orbitaly d&nbsp;s&nbsp;elektrony v&nbsp;nich.","Vysoká hustota a&nbsp;vysoká teplota tání.","Malý atomový poloměr a&nbsp;velká elektronegativita.","Feromagnetismus a&nbsp;tvrdost."],c:0,
  e:"Proměnlivá oxidační čísla umožní katalyzátoru cyklicky se redukovat a&nbsp;oxidovat, volné orbitaly d&nbsp;spolu s&nbsp;elektrony umožní navázat molekulu a&nbsp;zároveň jí vrátit elektrony do protivazebného orbitalu. Hustota, tvrdost ani magnetismus s&nbsp;katalýzou nesouvisejí."},
 {t:"single",q:"Jaký je řád vazby v&nbsp;molekule kyslíku, která má osm elektronů ve vazebných a&nbsp;čtyři v&nbsp;protivazebných orbitalech?",
  o:["4","1","3","2"],c:3,
  e:"Řád vazby = (8 − 4) / 2 = 2, tedy dvojná vazba. Kdo od sebe obě čísla jen odečte bez dělení dvěma, dostane 4. Dva z&nbsp;protivazebných elektronů navíc sedí v&nbsp;orbitalech <span class=\"chem\">π*</span> po jednom, a&nbsp;proto je kyslík paramagnetický."},
 {t:"single",q:"Co se stane s&nbsp;vazbou C–O, když se molekula oxidu uhelnatého naváže na atom kovu?",
  o:["Nic, vazba zůstane nezměněná.","Zeslábne, protože kov posílá elektrony do protivazebného orbitalu π*.","Zesílí, protože kov odebere elektrony z&nbsp;protivazebného orbitalu.","Rozpadne se okamžitě na atomy."],c:1,
  e:"Zpětná donace zaplní protivazebný orbital ligandu, a&nbsp;elektrony v&nbsp;protivazebném orbitalu vazbu rozvolňují — řád vazby proto klesne. Vazba <b>kov–ligand</b> se přitom naopak posílí; právě tahle dvojice protichůdných efektů je jádrem heterogenní katalýzy."},
 {t:"single",q:"Podle pravidla osmnácti elektronů: jaký bude vzorec karbonylu chromu, který má ve stavu 0 konfiguraci d⁶?",
  o:["[Cr(CO)₄]","[Cr(CO)₅]","[Cr(CO)₆]","[Cr₂(CO)₁₀]"],c:2,
  e:"Do osmnácti chybí 18 − 6 = 12 elektronů a&nbsp;každý karbonyl dodá dva, takže ligandů je šest a&nbsp;koordinace je oktaedrická. Dvoujaderné karbonyly tvoří kovy s&nbsp;<b>lichým</b> počtem elektronů d&nbsp;— mangan a&nbsp;kobalt — protože jim jeden elektron musí dodat vazba kov–kov."},
 {t:"multi",q:"Které dvojice proces a&nbsp;katalyzátor jsou správné?",
  o:["Haberův proces — železo","kontaktní výroba kyseliny sírové — V₂O₅","Ostwaldova oxidace amoniaku — MnO₂","ztužování tuků — nikl","Zieglerova–Nattova polymerace — TiCl₄"],c:[0,1,3,4],
  e:"Ostwaldova oxidace amoniaku běží na síťkách ze slitiny platiny a&nbsp;rhodia, ne na oxidu manganičitém — ten katalyzuje rozklad peroxidu vodíku. Zbylé čtyři dvojice jsou správně a&nbsp;patří k&nbsp;nejdůležitějším průmyslovým procesům vůbec."},
 {t:"num",q:"Kolik valenčních elektronů má centrální atom v&nbsp;<span class=\"chem\">[Fe(CO)₅]</span>? Železo má ve stavu 0 konfiguraci d⁸.",
  ans:18, tol:0.5, unit:"elektronů",
  e:"Osm elektronů od kovu plus pět karbonylů po dvou elektronech dá 8 + 10 = 18. Pravidlo je splněné, a&nbsp;proto je pentakarbonyl železa stabilní kapalina. U&nbsp;<span class=\"chem\">[V(CO)₆]</span> vyjde jen 17 — a&nbsp;ta látka je skutečně reaktivní a&nbsp;snadno přijme elektron navíc."}
];

BANK.q8=[
 {t:"single",q:"Od jakého obsahu chromu se ocel považuje za nerezavějící?",
  o:["od 1 %","od 5 %","od 25 %","zhruba od 10,5 %"],c:3,
  e:"Teprve nad zhruba 10,5 % chromu vznikne na povrchu <b>souvislá</b> vrstva <span class=\"chem\">Cr₂O₃</span> silná několik nanometrů. Pod touto hranicí je pokrytí ostrůvkovité a&nbsp;ocel koroduje; obsah 25 % se používá u&nbsp;speciálních žáruvzdorných ocelí, ale nutný není."},
 {t:"single",q:"Proč se do každé oceli přidává mangan?",
  o:["Protože váže kyslík a&nbsp;síru dřív než železo — dezoxiduje a&nbsp;odsiřuje.","Protože zvyšuje magnetické vlastnosti.","Protože snižuje teplotu tání.","Protože vytváří pasivační vrstvu."],c:0,
  e:"Bez dezoxidace by ocel při tuhnutí zbublinatěla a&nbsp;bez odsíření by se za tepla trhala, protože <span class=\"chem\">FeS</span> se vylučuje po hranicích zrn. Mangan obojí vyřeší: <span class=\"chem\">FeO + Mn → Fe + MnO</span> a&nbsp;<span class=\"chem\">FeS + Mn → Fe + MnS</span>. Pasivační vrstvu vytváří chrom."},
 {t:"single",q:"Proč je nerezavějící ocel typu 18/10 nemagnetická?",
  o:["Protože chrom je diamagnetický.","Protože neobsahuje uhlík.","Protože nikl udrží plošně centrovanou austenitickou mřížku i&nbsp;za laboratorní teploty.","Protože se povrch pasivuje."],c:2,
  e:"Feromagnetismus železa je vázaný na prostorově centrovanou mřížku; nikl mřížku převede na plošně centrovanou (austenitickou) a&nbsp;magnetismus zmizí. Levnější feritické nerezi, které nikl neobsahují, magnetické jsou — magnet je proto nejrychlejší test obsahu niklu."},
 {t:"single",q:"Které tvrzení o&nbsp;chromu v&nbsp;nerezavějící oceli je správné?",
  o:["Chrom je ušlechtilejší než železo, proto nekoroduje.","Chrom rozpouští uhlík a&nbsp;tím zabrání korozi.","Chrom sníží teplotu tání oceli.","Chrom má nižší potenciál než železo, ale vytvoří souvislou pasivační vrstvu Cr₂O₃, která se po poškrábání sama obnoví."],c:3,
  e:"Chrom má <span class=\"q\">E</span>° = −0,74&nbsp;V, tedy nižší než železo (−0,44&nbsp;V) — je <b>méně</b> ušlechtilý. Celá ochrana stojí na pasivaci: oxid chromitý má objem srovnatelný s&nbsp;kovem, takže vrstva je souvislá a&nbsp;přilnavá, na rozdíl od rzi, která praská a&nbsp;odlupuje se."},
 {t:"single",q:"Co odlišuje ocel od litiny?",
  o:["Litina obsahuje chrom, ocel ne.","Obsah uhlíku: ocel má pod 2,11 %, litina víc a&nbsp;není kujná.","Litina se vyrábí v&nbsp;konvertoru, ocel ve vysoké peci.","Litina je vždycky legovaná."],c:1,
  e:"Hranice 2,11 % odpovídá maximální rozpustnosti uhlíku v&nbsp;austenitu při 1147 °C. Nad ní se přebytečný uhlík vyloučí jako karbid nebo grafit a&nbsp;materiál je křehký. Ve vysoké peci vzniká surové železo se zhruba 4 % uhlíku, ocel se z&nbsp;něj dělá až v&nbsp;konvertoru."},
 {t:"num",q:"Kolik kilogramů ferrochromu s&nbsp;obsahem 65&nbsp;% chromu je potřeba přidat do 20,0&nbsp;t oceli bez chromu, aby výsledný obsah chromu byl 18,0&nbsp;%?",
  ans:7660, tol:120, unit:"kg",
  e:"Z&nbsp;podmínky 0,65<span class=\"q\">x</span> / (20 000 + <span class=\"q\">x</span>) = 0,180 plyne 0,470<span class=\"q\">x</span> = 3600, tedy <span class=\"q\">x</span> = 7660&nbsp;kg. Nejčastější chyba je zapomenout, že přídavek zvětší i&nbsp;celkovou hmotnost taveniny — pak vyjde 5538&nbsp;kg a&nbsp;výsledná ocel by měla jen 14,5 % chromu."}
];
