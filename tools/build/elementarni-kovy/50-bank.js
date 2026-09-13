/* ============================================================
   29 · BANKY OTÁZEK — KAPITOLY 0 AŽ 4
   ============================================================ */
BANK.q0=[
 {t:"single",q:"Co je podstatou <b>kovové vazby</b>?",
  o:["Elektronový pár sdílený dvěma sousedními atomy","Přechod elektronu od jednoho atomu k druhému a přitažlivost opačných nábojů","Valenční elektrony delokalizované přes celý krystal, které drží pohromadě kationty kovu","Dipól‑dipólová přitažlivost mezi polárními molekulami"],c:2,
  e:"Kovová vazba je nesměrová a&nbsp;neomezená počtem partnerů — elektrony patří celému krystalu, ne konkrétnímu páru atomů. První možnost popisuje vazbu kovalentní, druhá iontovou. Právě nesměrovost je důvod, proč se kov dá tepat a&nbsp;iontový krystal se štípe."},
 {t:"single",q:"Proč nemůže plně obsazený energetický pás vést elektrický proud?",
  o:["Protože v něm elektrony nemají volnou hladinu, do které by se mohly posunout","Protože v něm není dost elektronů","Protože jeho elektrony jsou pevně vázané na jádro","Protože je oddělený od jádra zakázaným pásem"],c:0,
  e:"Aby elektron nesl proud, musí změnit svůj stav — a&nbsp;k&nbsp;tomu potřebuje volnou hladinu těsně nad sebou. V&nbsp;plném pásu žádná není, i&nbsp;když je elektronů plný. Nejlákavější past je odpověď o&nbsp;počtu elektronů: těch má polovodič srovnatelně s&nbsp;kovem, jen nemají kam."},
 {t:"multi",q:"Které z&nbsp;následujících tvrzení o&nbsp;<b>zakázaném pásu</b> platí?",
  o:["U kovu je nulový, protože se pásy překrývají","U křemíku je zhruba 1,12 eV","Čím je širší, tím lépe látka vede proud","Tepelná energie při pokojové teplotě je asi 0,025 eV, tedy o dva řády méně než E_g diamantu"],c:[0,1,3],
  e:"Kov má pásy překryté, křemík má 1,12&nbsp;eV a&nbsp;diamant 5,47&nbsp;eV — proti tepelné energii 0,025&nbsp;eV je to více než dvěstěkrát. Třetí tvrzení je obrácené: <b>širší</b> zakázaný pás znamená <b>horší</b> vodivost, protože ho elektron nepřekoná."},
 {t:"single",q:"Vzorek při zahřátí z&nbsp;20 °C na 200 °C začne vést <b>hůř</b>. O&nbsp;jaký typ látky jde a&nbsp;proč?",
  o:["Polovodič — ubylo nosičů náboje","Izolant — zakázaný pás se rozšířil","Polovodič — zvětšil se zakázaný pás","Kov — rozkmitala se mřížka a elektrony se častěji rozptylují"],c:3,
  e:"V&nbsp;kovu je počet nosičů stálý, ale zahřátí rozkmitá ionty v&nbsp;mřížce a&nbsp;ty elektrony rozptylují — vodivost proto klesá. U&nbsp;polovodiče by se stalo přesně naopak: tepelná energie by přehodila další elektrony přes zakázaný pás a&nbsp;vodivost by prudce vzrostla."},
 {t:"single",q:"Křemík dotovaný <b>fosforem</b> dává polovodič…",
  o:["typu P, protože fosfor má o jeden elektron méně","typu N, protože fosfor má pět valenčních elektronů a jeden zbývá","typu P, protože fosfor je nekov","typu N, protože fosfor je elektronegativnější než křemík"],c:1,
  e:"Fosfor má pět valenčních elektronů; čtyři vytvoří vazby s&nbsp;křemíkem a&nbsp;pátý zůstane na donorové hladině těsně pod vodivostním pásem, odkud snadno odskočí. Většinovými nosiči jsou tedy záporné elektrony — odtud N. Typ P by dal bor nebo gallium se třemi valenčními elektrony."},
 {t:"single",q:"Diamant je izolant, kdežto grafit vede proud. Čím to je?",
  o:["Grafit obsahuje příměs kovu","Grafit má vyšší hustotu","V grafitu je uhlík v hybridizaci sp² a čtvrtý elektron tvoří delokalizovaný pás π","Diamant má menší atomy uhlíku"],c:2,
  e:"Obojí je čistý uhlík, takže rozhoduje struktura. V&nbsp;diamantu jsou všechny čtyři elektrony zapojené do vazeb <span class=\"chem\">sp³</span> a&nbsp;mezera je 5,47&nbsp;eV. V&nbsp;grafitu tvoří tři vazby <span class=\"chem\">sp²</span> a&nbsp;čtvrtý elektron se překrývá se sousedy do zpola zaplněného pásu π&nbsp;— přesně situace kovu."}
];

BANK.q1=[
 {t:"single",q:"Kolik atomů připadá na jednu elementární buňku <b>kubické plošně centrované</b> mřížky?",
  o:["2","4","6","8"],c:1,
  e:"Osm vrcholů přispěje po jedné osmině (dohromady 1) a&nbsp;šest stěn po jedné polovině (dohromady 3), celkem tedy 4&nbsp;atomy. Odpověď 2 patří mřížce prostorově centrované a&nbsp;odpověď 8 je počet vrcholů, ne atomů."},
 {t:"single",q:"Které tvrzení o&nbsp;<b>hexagonálním nejtěsnějším</b> uspořádání a&nbsp;<b>kubické plošně centrované</b> mřížce je správné?",
  o:["Hexagonální má vyšší koordinační číslo","Plošně centrovaná má vyšší stupeň zaplnění prostoru","Obě mají koordinační číslo 12 i zaplnění 74,05 %, liší se pořadím vrstev","Hexagonální je jediné nejtěsnější uspořádání, které existuje"],c:2,
  e:"Obě jsou nejtěsnější uspořádání se shodným koordinačním číslem 12 a&nbsp;shodným zaplněním 74,05 %. Rozdíl je jen v&nbsp;pořadí vrstev: ABAB proti ABCABC. Z&nbsp;toho ale plyne velmi praktický důsledek — počet skluzových rovin, a&nbsp;tedy tvárnost."},
 {t:"num",q:"Měď krystaluje v&nbsp;kubické plošně centrované mřížce s&nbsp;hranou 361,5&nbsp;pm. Jakou má hustotu? (Zadejte v&nbsp;g·cm⁻³ na dvě desetinná místa. <span class=\"q\">M</span> = 63,55&nbsp;g·mol⁻¹, <span class=\"q\">N</span><sub>A</sub> = 6,022·10²³&nbsp;mol⁻¹.)",
  ans:8.94, tol:0.15, unit:"g·cm⁻³",
  e:"V&nbsp;buňce jsou 4 atomy, jejich hmotnost je 4·63,55/6,022·10²³ = 4,221·10⁻²²&nbsp;g. Objem buňky je (3,615·10⁻⁸&nbsp;cm)³ = 4,724·10⁻²³&nbsp;cm³ a&nbsp;podíl dá 8,94&nbsp;g·cm⁻³. Nejčastější chyba je špatný převod pikometrů na centimetry."},
 {t:"single",q:"Proč pojme <b>austenit</b> (γ‑železo) až 2,11 % uhlíku, kdežto <b>ferit</b> (α‑železo) jen 0,02 %, přestože austenit má hustěji zaplněnou mřížku?",
  o:["Protože austenit je při vyšší teplotě, a teplo uhlík rozpouští","Protože v plošně centrované mřížce jsou velké oktaedrické dutiny (0,414·R), kdežto v prostorově centrované jen malé (0,155·R)","Protože ferit je feromagnetický a uhlík odpuzuje","Protože austenit má menší atomy železa"],c:1,
  e:"Rozhoduje velikost <b>jednotlivých</b> dutin, ne celkové množství prázdna. Plošně centrovaná mřížka má sice méně prázdna, ale soustředěného do velkých oktaedrických dutin o&nbsp;poloměru zhruba 53&nbsp;pm, kdežto prostorově centrovaná ho má rozdrobené do dutin o&nbsp;19&nbsp;pm. Atom uhlíku s&nbsp;poloměrem kolem 70&nbsp;pm se vejde jen do té první."},
 {t:"single",q:"Ve kterém směru se dotýkají koule v&nbsp;<b>kubické prostorově centrované</b> mřížce?",
  o:["Podél tělesové úhlopříčky, takže platí a√3 = 4r","Podél hrany, takže platí a = 2r","Podél stěnové úhlopříčky, takže platí a√2 = 4r","Nedotýkají se vůbec"],c:0,
  e:"Středový atom se dotýká rohových podél tělesové úhlopříčky o&nbsp;délce <span class=\"mono\">a√3</span>, na které leží čtyři poloměry. Vztah <span class=\"mono\">a√2 = 4r</span> patří mřížce plošně centrované a&nbsp;<span class=\"mono\">a = 2r</span> prosté kubické. Z&nbsp;tohoto vztahu se odvodí zaplnění 68,02 %."},
 {t:"single",q:"Železo při ohřevu nad 912 °C mění mřížku z&nbsp;prostorově centrované na plošně centrovanou. Jak se tato vlastnost nazývá a&nbsp;k&nbsp;čemu se využívá?",
  o:["Izomerie; využívá se při odlévání","Alotropie plynů; využívá se při svařování","Izotopie; využívá se v jaderné technice","Polymorfie; využívá se při kalení oceli"],c:3,
  e:"Schopnost jedné látky krystalovat v&nbsp;několika mřížkách se jmenuje polymorfie (u&nbsp;prvků také alotropie). U&nbsp;železa umožňuje kalení: v&nbsp;austenitu se uhlík rozpustí, prudkým ochlazením se mřížka překlopí zpět, ale uhlík už nestihne uniknout a&nbsp;vzniká tvrdý martenzit."}
];

BANK.q2=[
 {t:"single",q:"Proč jsou kovy s&nbsp;<b>plošně centrovanou</b> mřížkou (Cu, Al, Au) tažnější než kovy s&nbsp;<b>hexagonální</b> mřížkou (Zn, Mg)?",
  o:["Mají více skluzových rovin, po kterých se dají vrstvy posouvat","Mají vyšší zaplnění prostoru","Mají slabší kovovou vazbu","Mají větší atomy"],c:0,
  e:"Zaplnění prostoru mají obě mřížky shodné (74,05 %), takže tudy cesta nevede. Plošně centrovaná má čtyři různě orientované nejtěsněji obsazené roviny a&nbsp;dvanáct skluzových systémů, hexagonální prakticky jen bazální rovinu. Proto se zinek za studena láme, ale za tepla už válcovat jde."},
 {t:"single",q:"Proč se dálková elektrická vedení dělají z&nbsp;hliníku, když měď vede lépe?",
  o:["Hliník je lepší vodič na jednotku objemu","Hliník lépe odolává mechanickému napětí","Hliník vede lépe na jednotku hmotnosti — vodič stejného odporu váží asi polovinu měděného","Hliník se snáz recykluje"],c:2,
  e:"Hliníkový vodič musí být o&nbsp;58 % tlustší, ale při hustotě 2,70 proti 8,96&nbsp;g·cm⁻³ váží jen zhruba 48 % měděného. U&nbsp;vedení zavěšeného na stožárech rozhoduje hmotnost, ne objem. Pevnost hliníku je naopak nižší, proto má vodič ocelovou duši."},
 {t:"single",q:"Rtuť je za pokojové teploty kapalná. Co z&nbsp;toho plyne?",
  o:["Není to kov, protože kovy jsou vždy pevné","Je to kov, jen má mimořádně slabou kovovou vazbu","Je to polokov na hranici s nekovy","Je to intermetalická sloučenina"],c:1,
  e:"Rtuť má lesk, vede proud a&nbsp;tvoří slitiny (amalgámy), takže je jednoznačně kov. Kapalná je proto, že její konfigurace <span class=\"chem\">[Xe]4f¹⁴5d¹⁰6s²</span> je uzavřená a&nbsp;relativisticky stažené orbitaly <span class=\"chem\">6s</span> se elektronů neochotně vzdávají — vazba je proto velmi slabá. Podobný, i&nbsp;když mírnější případ je gallium (29,8 °C)."},
 {t:"multi",q:"Které vlastnosti kovů plynou přímo z&nbsp;<b>delokalizovaných elektronů</b>?",
  o:["Kovový lesk a neprůhlednost","Vysoká elektrická vodivost","Vysoká tepelná vodivost","Vysoká hustota"],c:[0,1,2],
  e:"Lesk, elektrická i&nbsp;tepelná vodivost jsou přímými důsledky volných elektronů — pohltí a&nbsp;vyzáří světlo, přenášejí náboj i&nbsp;energii. Hustota s&nbsp;nimi ale nesouvisí: závisí na hmotnosti atomu, jeho poloměru a&nbsp;typu mřížky. Lithium má delokalizované elektrony stejně jako osmium, a&nbsp;přesto je čtyřicetkrát lehčí."},
 {t:"single",q:"Který kov má nejvyšší teplotu tání a&nbsp;proč právě on?",
  o:["Železo, protože je feromagnetické","Osmium, protože má nejvyšší hustotu","Wolfram, protože do vazby zapojí i elektrony d a má malý atom","Platina, protože je nejušlechtilejší"],c:2,
  e:"Wolfram taje při 3422 °C. Přechodné kovy uprostřed řady d&nbsp;mají nejsilnější kovovou vazbu, protože se do ní zapojí kromě elektronů s&nbsp;i&nbsp;elektrony d. Hustota, magnetismus ani ušlechtilost s&nbsp;teplotou tání přímo nesouvisejí — osmium je sice nejhustší, ale taje o&nbsp;téměř 400 °C níž."},
 {t:"single",q:"Proč vede slitina hůř než čistý kov, ze kterého vznikla?",
  o:["Protože cizí atomy naruší pravidelnost mřížky a rozptylují elektrony","Protože ve slitině je méně valenčních elektronů","Protože slitina má vždy vyšší hustotu","Protože se ve slitině vytvoří zakázaný pás"],c:0,
  e:"Elektron se v&nbsp;dokonale pravidelné mřížce pohybuje takřka bez odporu; každá nepravidelnost ho rozptýlí. Proto má konstantan (Cu 55 %, Ni 45 %) zhruba třicetkrát nižší vodivost než čistá měď — a&nbsp;proto se měď na vodiče musí rafinovat na 99,99 %."}
];

BANK.q3=[
 {t:"single",q:"Jaká je první Hume‑Rotheryho podmínka vzniku <b>substitučního</b> tuhého roztoku?",
  o:["Oba kovy musí mít stejnou hustotu","Jeden kov musí být ušlechtilý a druhý ne","Oba kovy musí mít stejnou teplotu tání","Poloměry atomů se nesmějí lišit o více než zhruba 15 %"],c:3,
  e:"Rozdíl atomových poloměrů do zhruba patnácti procent je podmínka <b>nutná</b>. Kromě ní se ale žádá i&nbsp;stejný typ mřížky, podobné mocenství a&nbsp;podobná elektronegativita — proto se hliník s&nbsp;mědí neomezeně nemísí, i&nbsp;když je rozdíl poloměrů jen 10,5 %."},
 {t:"single",q:"Které atomy tvoří s&nbsp;kovy <b>intersticiální</b> tuhé roztoky?",
  o:["Velké atomy kovů jako olovo a baryum","Ionty halogenidů","Malé atomy nekovů — vodík, dusík, uhlík a bor","Vzácné plyny"],c:2,
  e:"Do dutiny mezi atomy kovu se vejde jen atom výrazně menší než hostitel; prakticky to zvládnou H (37&nbsp;pm), N (75), C (77) a&nbsp;B (88). Nejdůležitějším příkladem je ocel. Olovo je naopak větší než měď, takže se s&nbsp;ní nemísí vůbec."},
 {t:"single",q:"Pájka Sn–Pb v&nbsp;poměru 62 : 38 taje při 183 °C, ačkoli cín taje při 231,9 °C a&nbsp;olovo při 327,5 °C. Jak se takové složení nazývá?",
  o:["Azeotrop","Intermetalická sloučenina","Amalgám","Eutektikum"],c:3,
  e:"Eutektikum je směs, která taje při nejnižší možné teplotě celého systému, a&nbsp;to celá najednou jako čistá látka. Příčinou je nárůst entropie při smísení, který zvýhodní taveninu. Azeotrop je obdobný jev u&nbsp;destilace kapalin, ne u&nbsp;tání."},
 {t:"single",q:"Poloměry: Cu 128&nbsp;pm, Pb 175&nbsp;pm. Co vznikne, když se pokusíte o&nbsp;jejich slitinu?",
  o:["Rozdíl 36,7 % je nad 15 %, kovy se nemísí a ztuhnou jako heterogenní směs zrn","Substituční tuhý roztok, protože oba mají plošně centrovanou mřížku","Intersticiální tuhý roztok, protože olovo je měkké","Intermetalická sloučenina CuPb"],c:0,
  e:"Relativní rozdíl je |128 − 175|/128 = 36,7 %, tedy daleko nad hranicí patnácti procent — substituce je vyloučená. Olovo je zároveň <b>větší</b> než měď, takže do dutiny se vejít nemůže. Kovy proto ztuhnou vedle sebe; využívá se to u&nbsp;ložiskových slitin, kde měkké olovo funguje jako mazivo."},
 {t:"num",q:"Kolik kilogramů zinku je potřeba na 250&nbsp;kg mosazi, která obsahuje 63 % mědi? (Zadejte v&nbsp;kg.)",
  ans:92.5, tol:1.5, unit:"kg",
  e:"Zinku je 100 − 63 = 37 %, tedy 0,37 · 250 = 92,5&nbsp;kg; mědi je 157,5&nbsp;kg. Pozor na to, že jde o&nbsp;<b>hmotnostní</b> procenta — atomový zlomek zinku by vyšel 0,364, protože molární hmotnosti obou kovů jsou blízké, ale ne shodné."},
 {t:"single",q:"Proč je slitina obvykle <b>tvrdší</b> než čistý kov?",
  o:["Protože má vyšší hustotu","Protože obsahuje intermetalické sloučeniny","Protože cizí atomy brání pohybu poruch po skluzových rovinách","Protože má vyšší teplotu tání"],c:2,
  e:"Plastická deformace kovu probíhá pohybem dislokací po skluzových rovinách. Cizí atom kolem sebe mřížku napne a&nbsp;stane se překážkou, kterou dislokace obtížně překoná. Slitina navíc obvykle taje <b>níž</b> než čisté složky, takže poslední možnost je i&nbsp;věcně obrácená."}
];

BANK.q4=[
 {t:"single",q:"Co znamená, že pojem <b>ruda</b> je ekonomický, a&nbsp;ne mineralogický?",
  o:["Že ruda vždy obsahuje více než 50 % kovu","Že rudou je nerost jen tehdy, když se z něj v dané době a na daném místě vyplatí kov vyrábět","Že ruda musí být oxid nebo sulfid","Že cenu rudy určuje burza"],c:1,
  e:"Tentýž nerost může být rudou dnes a&nbsp;nebyl jí před sto lety, nebo je rudou v&nbsp;Chile a&nbsp;není v&nbsp;Evropě. Pyrit <span class=\"chem\">FeS₂</span> železo obsahuje, ale rudou železa není — vyrábí se z&nbsp;něj kyselina sírová. Obsah kovu v&nbsp;rudě bývá naopak často jen několik procent."},
 {t:"single",q:"Proč jsou rudy mědi, olova a&nbsp;zinku <b>sulfidické</b>, kdežto rudy hliníku a&nbsp;železa <b>oxidické</b>?",
  o:["Protože sulfidy jsou hustší než oxidy","Protože sulfidy vznikají jen v hlubokých vrstvách kůry","Protože síra je v přírodě vzácnější než kyslík","Protože měď, olovo a zinek mají větší a měkčí kationty s afinitou k síře, kdežto hliník a železo mají malé tvrdé kationty s afinitou ke kyslíku"],c:3,
  e:"Rozdělení na chalkofilní a&nbsp;litofilní prvky je přímý důsledek chemie kationtů: měkké kationty se vážou na měkký anion S²⁻, tvrdé na tvrdý O²⁻. Tento rozdíl se projevil při tuhnutí magmatu, kdy se sulfidová tavenina oddělila od křemičitanové."},
 {t:"single",q:"Co dělá <b>flotace</b>?",
  o:["Odděluje rudní minerál od hlušiny podle smáčivosti povrchu pomocí vzduchových bublinek","Převádí sulfid na oxid žíháním na vzduchu","Rozpouští kov v kyselině","Odděluje magnetický minerál magnetem"],c:0,
  e:"Sběrač udělá povrch sulfidických zrnek nesmáčivým, bublinky se na ně nalepí a&nbsp;vynesou je do pěny; smáčivá hlušina klesne. Je to <b>fyzikální</b> obohacení bez chemické změny. Popsané pražení, loužení a&nbsp;magnetická separace jsou jiné kroky téhož řetězu."},
 {t:"single",q:"Proč se sulfidická ruda před redukcí <b>praží</b>?",
  o:["Aby se odstranila vlhkost","Aby se ruda rozdrtila na jemnější zrna","Protože uhlík má k síře malou afinitu a sulfid prakticky neredukuje, kdežto oxid ano","Aby vznikl oxid siřičitý jako hlavní produkt"],c:2,
  e:"Reakce typu <span class=\"chem\">ZnS + C → Zn + CS</span> je energeticky nevýhodná a&nbsp;neběží. Kyslík naopak síru z&nbsp;kovu ochotně vezme, takže pražením vznikne oxid, který už uhlík zredukuje. Oxid siřičitý je při tom cenný vedlejší produkt — vyrábí se z&nbsp;něj kyselina sírová."},
 {t:"num",q:"Kolik procent železa obsahuje hematit <span class=\"chem\">Fe₂O₃</span>? (Zadejte v&nbsp;hmotnostních procentech na jedno desetinné místo. <span class=\"q\">A</span><sub>r</sub>(Fe) = 55,85, <span class=\"q\">A</span><sub>r</sub>(O) = 16,00.)",
  ans:69.9, tol:0.6, unit:"%",
  e:"Molární hmotnost je 2·55,85 + 3·16,00 = 159,7&nbsp;g·mol⁻¹ a&nbsp;podíl železa 2·55,85/159,7 = 0,699, tedy 69,9 %. Magnetit <span class=\"chem\">Fe₃O₄</span> je o&nbsp;něco bohatší (72,4 %), a&nbsp;proto je v&nbsp;hutnictví ceněnější."},
 {t:"multi",q:"Které kroky patří do <b>pětikrokového řetězu</b> od rudy ke kovu?",
  o:["Fyzikální obohacení, například flotace","Chemická úprava, například pražení","Získání surového kovu redukcí nebo elektrolýzou","Rafinace, například elektrolytická"],c:[0,1,2,3],
  e:"Řetěz má pět kroků: těžba, fyzikální obohacení, chemická úprava, získání surového kovu a&nbsp;rafinace. Všechny čtyři nabízené možnosti do něj patří. Podstatné je, že chemie začíná až ve třetím kroku a&nbsp;kov vzniká až ve čtvrtém."}
];
