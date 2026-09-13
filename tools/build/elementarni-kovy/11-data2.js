/* ============================================================
   3 · DATA — technologie, koroze, trenažéry
   ============================================================ */

/* --- úprava rudy: pětikrokový řetěz --------------------------------- */
var UPRAVA = [
 {id:"tezba", n:"1 · Těžba", tag:"mechanika", ico:"⛏",
  d:"Ruda se vylámá v lomu nebo v dole a rozdrtí na kusy. Chemie tu ještě nezačala — jde o čistou manipulaci s materiálem. Už tady se ale rozhoduje o ceně kovu: povrchový lom je mnohonásobně levnější než hlubinný důl.",
  vys:"kusová ruda o obsahu kovu, jaký ložisko dává", chem:"—"},
 {id:"uprava", n:"2 · Fyzikální obohacení", tag:"fyzika", ico:"⚖",
  d:"Ruda se semele na prášek a užitečný nerost se oddělí od hlušiny podle fyzikálních vlastností. <b>Flotace</b>: prášek se vmíchá do vody s pěnidlem a sběračem, vzduchové bublinky vynesou nesmáčivá zrnka sulfidu na hladinu, hlušina klesne. <b>Magnetická separace</b> vytáhne magnetit. <b>Plavení a sedimentace</b> využívají rozdíl hustot.",
  vys:"koncentrát s několikanásobně vyšším obsahem kovu", chem:"beze změny chemického složení"},
 {id:"chem", n:"3 · Chemická úprava", tag:"chemie", ico:"🔥",
  d:"Koncentrát se převede na sloučeninu, ze které se kov opravdu dobře získává. <b>Pražení</b> mění sulfid na oxid (oxid se totiž redukuje snáz než sulfid). <b>Kalcinace</b> rozloží uhličitan nebo hydroxid na oxid. <b>Loužení</b> převede kov do roztoku, odkud se vysráží čistý.",
  vys:"oxid, chlorid nebo roztok soli kovu", chem:"2 ZnS + 3 O₂ → 2 ZnO + 2 SO₂ · CaCO₃ → CaO + CO₂"},
 {id:"redu", n:"4 · Získání surového kovu", tag:"jádro", ico:"⚙",
  d:"Teprve tady vzniká kov. Volí se jedna ze tří cest: <b>redukce</b> (uhlíkem, oxidem uhelnatým, vodíkem nebo jiným kovem), <b>tepelný rozklad</b> nestálé sloučeniny, nebo <b>elektrolýza</b> taveniny či roztoku. Kterou z nich, o tom rozhoduje ušlechtilost kovu a pevnost jeho vazby ke kyslíku.",
  vys:"surový kov, obvykle 95 až 99 % čistoty", chem:"Fe₂O₃ + 3 CO → 2 Fe + 3 CO₂"},
 {id:"raf", n:"5 · Rafinace", tag:"čistota", ico:"◆",
  d:"Surový kov skoro nikdy nevyhovuje. <b>Chemická rafinace</b> odstraní příměs reakcí (odsíření, oduhličení). <b>Elektrolytická rafinace</b> rozpouští surový kov jako anodu a vylučuje čistý na katodě. <b>Fyzikální rafinace</b> — destilace za sníženého tlaku, zonální tavba, van Arkelova metoda — dá kov o čistotě potřebné pro polovodiče.",
  vys:"kov požadované čistoty, u polovodičů až 99,999 999 9 %", chem:"Cu → Cu²⁺ + 2 e⁻ (anoda) · Cu²⁺ + 2 e⁻ → Cu (katoda)"}
];

/* --- elektrolytické výroby ------------------------------------------ */
var ELE = [
 {id:"nacl", nm:"Tavenina NaCl — sodík", prod:"Na + Cl₂", tep:"≈ 600 °C", u:"≈ 7 V",
  el:"katoda ocel, anoda grafit", lat:"NaCl + CaCl₂ (snížení teploty tání z 801 °C)",
  kat:"Na⁺ + e⁻ → Na", an:"2 Cl⁻ → Cl₂ + 2 e⁻", tot:"2 NaCl → 2 Na + Cl₂",
  why:"Sodík má E° = −2,71 V. Z vodného roztoku ho nedostanete — na katodě se dřív redukuje voda a uniká vodík. V tavenině žádná voda není, takže konkurence odpadá. Přídavek CaCl₂ sníží teplotu tání a tím i tepelné ztráty.",
  poz:"Downsova cela. Kapalný sodík je lehčí než tavenina a plave nahoru, kde se odčerpává; ocelová síťka brání tomu, aby se setkal s chlorem."},
 {id:"mgcl2", nm:"Tavenina MgCl₂ — hořčík", prod:"Mg + Cl₂", tep:"700 až 750 °C", u:"≈ 6 V",
  el:"katoda ocel, anoda grafit", lat:"MgCl₂ + KCl + NaCl",
  kat:"Mg²⁺ + 2 e⁻ → Mg", an:"2 Cl⁻ → Cl₂ + 2 e⁻", tot:"MgCl₂ → Mg + Cl₂",
  why:"Také E° hluboko v záporných hodnotách (−2,37 V). Kapalný hořčík plave na hustší tavenině a stahuje se z hladiny. Chlor se vrací do chlorace oxidu — technologie je uzavřená smyčka.",
  poz:"Alternativou je Pidgeonův proces: silikotermická redukce pálené dolomitu za sníženého tlaku, kde hořčík odchází jako pára."},
 {id:"al2o3", nm:"Tavenina Al₂O₃ v kryolitu — hliník", prod:"Al + CO₂", tep:"950 až 970 °C", u:"4,0 až 4,5 V",
  el:"katoda uhlíková vyzdívka vany, anoda uhlíkové bloky", lat:"Al₂O₃ (2 až 8 %) v tavenině kryolitu Na₃AlF₆",
  kat:"Al³⁺ + 3 e⁻ → Al", an:"2 O²⁻ → O₂ + 4 e⁻, dále C + O₂ → CO₂", tot:"2 Al₂O₃ + 3 C → 4 Al + 3 CO₂",
  why:"Oxid hlinitý taje až při 2050 °C — elektrolyzovat ho přímo by bylo nemožné. Kryolit ho rozpustí a teplota klesne na necelou tisícovku. Uhlíková anoda navíc reaguje s uvolněným kyslíkem, čímž se sníží potřebné napětí; proto se spotřebovává a musí se doplňovat.",
  poz:"Hallův–Héroultův proces, objevený roku 1886 nezávisle ve Francii a v USA. Předchází mu Bayerův proces, který z bauxitu vyrobí čistý Al₂O₃."},
 {id:"cu", nm:"Roztok CuSO₄ — elektrolytická rafinace mědi", prod:"Cu 99,99 %", tep:"55 až 65 °C", u:"0,2 až 0,3 V",
  el:"anoda ze surové mědi, katoda z tenkého plechu čisté mědi", lat:"CuSO₄ + H₂SO₄ ve vodě",
  kat:"Cu²⁺ + 2 e⁻ → Cu", an:"Cu → Cu²⁺ + 2 e⁻", tot:"Cu (anoda) → Cu (katoda)",
  why:"Napětí se nastaví tak nízko, aby stačilo jen na měď. Neušlechtilé příměsi (Zn, Fe, Ni) se z anody sice rozpustí, ale na katodě se při tomto napětí nevyloučí a zůstanou v lázni. Ušlechtilejší kovy (Ag, Au, Pt) se vůbec nerozpustí a spadnou pod anodu jako <b>anodový kal</b>.",
  poz:"Anodový kal je tak cenný, že často zaplatí velkou část nákladů celé rafinerie — je hlavním světovým zdrojem stříbra."},
 {id:"zn", nm:"Roztok ZnSO₄ — elektrolytická výroba zinku", prod:"Zn 99,99 %", tep:"30 až 40 °C", u:"3,3 až 3,5 V",
  el:"katoda hliníkový plech, anoda slitina olova", lat:"ZnSO₄ + H₂SO₄ z loužení praženého sfaleritu",
  kat:"Zn²⁺ + 2 e⁻ → Zn", an:"2 H₂O → O₂ + 4 H⁺ + 4 e⁻", tot:"2 ZnSO₄ + 2 H₂O → 2 Zn + O₂ + 2 H₂SO₄",
  why:"Zinek má E° = −0,76 V, tedy pod vodíkem — podle tabulky by se měl vylučovat vodík. Zachraňuje to <b>přepětí vodíku</b> na zinku, které je velmi vysoké, takže se přece jen vyloučí kov. Lázeň proto musí být mimořádně čistá: stopy niklu nebo kobaltu přepětí sníží a místo zinku začne bublat vodík.",
  poz:"Elektrolytická cesta dnes převažuje nad starší redukcí uhlíkem, protože dá čistší kov a nevypouští CO."}
];
function EL_(id){ for(var i=0;i<ELE.length;i++){ if(ELE[i].id===id) return ELE[i]; } return null; }

/* --- vysoká pec: zóny shora dolů ------------------------------------ */
var PEC = [
 {h:0,  z:"Sazebna (kychta)", t:"200 °C",
  d:"Shora se po vrstvách sype vsázka: železná ruda, koks a vápenec. Plyny odcházejí a předehřívají ji. Kychtový plyn obsahuje asi 25 % CO a spaluje se v ohřívačích vzduchu.",
  r:"—", rn:"vsázka se suší a předehřívá"},
 {h:18, z:"Zóna nepřímé redukce I", t:"400 až 700 °C",
  d:"Oxid uhelnatý začíná odebírat kyslík. Hematit se mění na magnetit a ten na wüstit. Redukuje plyn, ne pevný uhlík — proto „nepřímá“.",
  r:"3 Fe₂O₃ + CO → 2 Fe₃O₄ + CO₂", rn:"hematit → magnetit"},
 {h:36, z:"Zóna nepřímé redukce II", t:"700 až 900 °C",
  d:"Wüstit se redukuje na houbovité železo. Zároveň se rozkládá vápenec a vzniká oxid vápenatý, budoucí základ strusky.",
  r:"FeO + CO → Fe + CO₂ · CaCO₃ → CaO + CO₂", rn:"wüstit → železo, kalcinace vápence"},
 {h:54, z:"Zóna přímé redukce", t:"900 až 1200 °C",
  d:"Nad 900 °C se prosadí Boudouardova rovnováha: oxid uhličitý reaguje se žhavým koksem zpátky na CO. Část oxidu železa proto redukuje uhlík přímo. Železo tu začíná pohlcovat uhlík.",
  r:"CO₂ + C → 2 CO · FeO + C → Fe + CO", rn:"Boudouardova reakce, nauhličování"},
 {h:72, z:"Zóna tavení a strusky", t:"1200 až 1400 °C",
  d:"Železo nasycené uhlíkem taje (teplota tání klesla z 1538 °C na zhruba 1150 °C). Oxid vápenatý se slučuje s křemičitou hlušinou na strusku, která je lehčí a plave na kovu.",
  r:"CaO + SiO₂ → CaSiO₃", rn:"vznik strusky"},
 {h:88, z:"Rozpor a výfučny", t:"1800 až 2000 °C",
  d:"Sem se vhání horký vzduch (1000 až 1200 °C), často obohacený kyslíkem. Koks hoří a dodává teplo; hned nato se ale s dalším koksem mění na CO, které stoupá vzhůru a celý proces pohání.",
  r:"C + O₂ → CO₂ · CO₂ + C → 2 CO", rn:"spalování koksu, tvorba redukčního plynu"},
 {h:100,z:"Nístěj — odpich", t:"≈ 1500 °C",
  d:"Dole se hromadí surové železo s 3,5 až 4,5 % uhlíku a nad ním struska. Obojí se odpichuje zvlášť. Surové železo míří v torpédovém voze rovnou do ocelárny, struska se používá do cementu.",
  r:"—", rn:"surové železo + struska"}
];

/* --- koroze a ochrana ------------------------------------------------ */
var KOR = [
 {id:"bez", nm:"Holá ocel bez ochrany", ok:false, verd:"Železo koroduje",
  d:"Kapka vody na oceli je hotový galvanický článek. Uprostřed kapky je málo rozpuštěného kyslíku, tam se železo rozpouští — je to <b>anodické místo</b>. Na okraji kapky, kde je kyslíku dost, se kyslík redukuje — to je <b>katodické místo</b>. Elektrony tečou kovem, ionty vodou.",
  an:"Fe → Fe²⁺ + 2 e⁻", kat:"O₂ + 2 H₂O + 4 e⁻ → 4 OH⁻", tot:"4 Fe + 3 O₂ + 2 H₂O → 4 FeO(OH)",
  fx:"Sůl na silnici zvyšuje vodivost elektrolytu a koroze zrychlí. Kyselý déšť přidá druhé oxidační činidlo (H⁺). Rez je porézní, takže vodu a kyslík propouští dál — na rozdíl od oxidu hliníku nechrání."},
 {id:"nater", nm:"Nátěr, smalt, plast", ok:true, verd:"Chráněno, dokud je vrstva celistvá",
  d:"Čistě <b>bariérová</b> ochrana: mezi kov a elektrolyt se položí nepropustná vrstva. Elektrochemicky nedělá nic. Jakmile se poškrábe, koroze v rýze běží plnou rychlostí a často podlézá pod nátěr do stran.",
  an:"—", kat:"—", tot:"bez elektrolytu žádná reakce neběží",
  fx:"Nejlevnější a nejrozšířenější ochrana, ale vyžaduje údržbu. Pod nátěr se proto dává základní barva s fosforečnany nebo zinkovým prachem, která funguje i po poškození."},
 {id:"zn", nm:"Pozinkování (Zn na Fe)", ok:true, verd:"Chráněno i po poškrábání",
  d:"Zinek má <b>zápornější</b> potenciál než železo (−0,76 V proti −0,44 V), takže v korozním článku je vždy on tou anodou. I když vrstva praskne, koroduje zinek a železo v rýze zůstává katodou — tedy nedotčené. Říká se tomu <b>katodická ochrana obětovanou anodou</b>.",
  an:"Zn → Zn²⁺ + 2 e⁻", kat:"O₂ + 2 H₂O + 4 e⁻ → 4 OH⁻ (na železe)", tot:"2 Zn + O₂ + 2 H₂O → 2 Zn(OH)₂",
  fx:"Zinek navíc sám zvětrá do souvislé vrstvičky zásaditého uhličitanu, která ho zpomalí. Odtud matně šedý povrch pozinkovaných svodnic a zábradlí."},
 {id:"sn", nm:"Pocínování (Sn na Fe)", ok:false, verd:"Po poškrábání koroduje rychleji než holé železo",
  d:"Cín je <b>ušlechtilejší</b> než železo (−0,14 V proti −0,44 V). Dokud je vrstva celá, funguje jako bariéra a je zdravotně nezávadná — proto konzervy. Jakmile se ale poškrábe, vznikne článek, ve kterém je anodou <b>železo</b>, a to koroduje rychleji, než kdyby tam cín vůbec nebyl.",
  an:"Fe → Fe²⁺ + 2 e⁻ (v rýze)", kat:"O₂ + 2 H₂O + 4 e⁻ → 4 OH⁻ (na cínu)", tot:"4 Fe + 3 O₂ + 2 H₂O → 4 FeO(OH)",
  fx:"Klasická past u maturity: „pocínování chrání stejně jako pozinkování“. Nechrání — rozhoduje znaménko rozdílu potenciálů, ne to, že je povlak kovový."},
 {id:"mg", nm:"Obětovaná anoda (Mg, Zn) na potrubí", ok:true, verd:"Chráněno, dokud anoda vydrží",
  d:"K chráněné konstrukci se vodivě připojí blok hořčíku nebo zinku. Celý objekt se tím stane <b>katodou</b>: elektrony do něj neustále přitékají z obětované anody, takže jeho vlastní oxidace se zastaví. Anoda se pomalu rozpouští a po letech se vymění.",
  an:"Mg → Mg²⁺ + 2 e⁻ (na obětované anodě)", kat:"O₂ + 2 H₂O + 4 e⁻ → 4 OH⁻ (na potrubí)", tot:"2 Mg + O₂ + 2 H₂O → 2 Mg(OH)₂",
  fx:"Takto se chrání plynovody, lodní trupy, přístavní mola i bojlery — v každém bojleru je hořčíková anoda, kterou servis vyměňuje."},
 {id:"proud", nm:"Katodická ochrana vnějším zdrojem", ok:true, verd:"Chráněno, dokud jde proud",
  d:"Místo obětované anody se použije stejnosměrný zdroj: záporný pól na chráněnou konstrukci, kladný na pomocnou (třeba grafitovou) elektrodu. Potenciál kovu se udržuje natolik záporný, že jeho oxidace termodynamicky nemůže proběhnout.",
  an:"na pomocné elektrodě, konstrukce se nerozpouští", kat:"konstrukce jen přijímá elektrony", tot:"koroze se zastaví, dokud teče proud",
  fx:"Používá se u dlouhých potrubí a rozsáhlých nádrží, kde by obětované anody bylo potřeba příliš mnoho. Nevýhoda: potřebuje trvalý přísun elektrické energie."},
 {id:"pas", nm:"Pasivace a nerezavějící ocel", ok:true, verd:"Chráněno samo od sebe",
  d:"Některé kovy si vytvoří <b>souvislou, pevně přilnavou</b> vrstvičku oxidu, která nepropouští ionty ani elektrony. Hliník má Al₂O₃ silnou několik nanometrů, chrom Cr₂O₃. Nerezavějící ocel obsahuje nejméně 10,5 % chromu právě proto, aby se tato vrstva stihla utvořit a po poškrábání se sama obnovila.",
  an:"zastaveno pasivní vrstvou", kat:"zastaveno pasivní vrstvou", tot:"4 Al + 3 O₂ → 2 Al₂O₃ (jednorázově, pak se děj zastaví)",
  fx:"Rozdíl proti rzi: Al₂O₃ má menší objem než odpovídající množství kovu a drží se ho, kdežto rez je porézní a odpadává. Proto hliníkové okno vydrží desítky let, ale ocelové bez ochrany zrezaví."}
];
function KO_(id){ for(var i=0;i<KOR.length;i++){ if(KOR[i].id===id) return KOR[i]; } return null; }

/* --- trenažér: jakou metodou se vyrábí? ----------------------------- */
var DRILL = [
 {q:"hliník z bauxitu", o:["redukce koksem ve vysoké peci","tavná elektrolýza oxidu rozpuštěného v kryolitu","redukce vodíkem při 1100 °C","elektrolýza vodného roztoku síranu"], c:1,
  e:"Hliník má E° = −1,66 V, takže z vodného roztoku se místo něj vyloučí vodík. Uhlík by Al₂O₃ zredukoval až nad 2000 °C. Zbývá tavná elektrolýza — a protože oxid taje při 2050 °C, rozpouští se v kryolitu, čímž teplota klesne na zhruba 960 °C."},
 {q:"železo z hematitu", o:["Krollův postup s hořčíkem","kyanidové loužení","redukce oxidem uhelnatým ve vysoké peci","tepelný rozklad oxidu"], c:2,
  e:"Železo je jen mírně neušlechtilé a jeho oxid podlehne uhlíku už kolem 750 °C. Pracujícím redukovadlem přitom není pevný koks, ale <b>oxid uhelnatý</b>, který z koksu v peci vzniká. Kroll je zbytečně drahý a oxid železa je tepelně stálý, sám se nerozloží."},
 {q:"titan z rutilu", o:["redukce TiCl₄ hořčíkem v atmosféře argonu","redukce TiO₂ koksem v elektrické peci","elektrolýza vodného roztoku TiCl₄","pražení na vzduchu"], c:0,
  e:"S uhlíkem by titan dal tvrdý karbid TiC místo kovu. Oxid se proto chloruje na těkavý TiCl₄, ten se destilací vyčistí a hořčík ho zredukuje — to je <b>Krollův postup</b>. Argon je nutný, protože horký titan hltavě reaguje s kyslíkem i dusíkem."},
 {q:"rtuť z rumělky HgS", o:["elektrolýza taveniny HgCl₂","aluminotermie","redukce vodíkem","pražení rudy na vzduchu a kondenzace par"], c:3,
  e:"Rtuť je ušlechtilá (E° = +0,85 V) a HgO je při teplotě pražení už nestálý, takže se rovnou uvolní kov. Kyslík si vezme síru jako SO₂ a rtuť odejde jako pára, kterou stačí zkondenzovat. Nic dražšího není potřeba."},
 {q:"sodík z kamenné soli", o:["redukce koksem","tavná elektrolýza NaCl s přídavkem CaCl₂","cementace zinkem","elektrolýza vodného roztoku NaCl"], c:1,
  e:"Elektrolýzou vodného roztoku NaCl vzniká NaOH, vodík a chlor — kovový sodík nikdy, protože voda se na katodě redukuje dřív. Musí se tedy elektrolyzovat tavenina; CaCl₂ v ní sníží teplotu tání z 801 °C na zhruba 600 °C."},
 {q:"wolfram z wolframitu", o:["redukce WO₃ vodíkem při 1100 °C","redukce WO₃ koksem","tavná elektrolýza","amalgamace"], c:0,
  e:"Uhlík by dal karbid WC. Vodík je dražší, ale poskytne čistý kovový prášek. Wolfram má nejvyšší teplotu tání ze všech kovů (3422 °C), takže se nedá odlít — hotové součásti se ze slisovaného prášku <b>slinují</b>."},
 {q:"zlato z rozemleté horniny", o:["redukce koksem","tavná elektrolýza","kyanidové loužení a cementace zinkem","pražení"], c:2,
  e:"Zlato je v hornině přítomné jako <b>kov</b>, takže není co redukovat — jde jen o oddělení od hlušiny. Rozpustí se za přístupu vzduchu jako kyanokomplex a z roztoku se vysráží méně ušlechtilým zinkem (cementace)."},
 {q:"zinek ze sfaleritu ZnS", o:["přímá redukce sulfidu uhlíkem","pražení na ZnO a poté redukce uhlíkem nebo elektrolýza","tepelný rozklad ZnS","Krollův postup"], c:1,
  e:"Sulfidy se uhlíkem prakticky neredukují — musí se nejdřív <b>pražením</b> převést na oxid. ZnO pak uhlík zredukuje kolem 1200 °C a zinek odchází jako pára (vře už při 907 °C). Modernější cestou je loužení a elektrolýza roztoku ZnSO₄."},
 {q:"nikl vysoké čistoty", o:["Mondův karbonylový proces","aluminotermie","pražení a kondenzace","tavná elektrolýza fluoridu"], c:0,
  e:"Nikl reaguje při 60 °C s oxidem uhelnatým na těkavý [Ni(CO)₄]. Ten se v plynné fázi oddělí od nečistot a při 200 °C se rozloží zpátky na velmi čistý kovový prášek. Je to zároveň výroba i rafinace."},
 {q:"chrom bez obsahu uhlíku", o:["redukce chromitu koksem","aluminotermie z čistého Cr₂O₃","pražení","destilace"], c:1,
  e:"Redukce chromitu koksem dá <b>ferrochrom</b>, tedy slitinu s železem a s uhlíkem — pro ocelárnu to stačí. Pokud je ale potřeba čistý chrom bez uhlíku, použije se aluminotermie: Cr₂O₃ + 2 Al → 2 Cr + Al₂O₃."},
 {q:"měď pro elektrické vodiče", o:["stačí pražení a konvertor","aluminotermie","elektrolytická rafinace s rozpustnou anodou","Krollův postup"], c:2,
  e:"Pražení a konvertor dají takzvanou blistrovou měď o čistotě kolem 99 %. Jenže i desetina procenta příměsi sníží vodivost natolik, že se materiál na vodiče nehodí. Elektrolytická rafinace zvedne čistotu na 99,99 % — a jako bonus dá anodové kaly se stříbrem a zlatem."},
 {q:"hořčík z mořské vody", o:["redukce koksem","tavná elektrolýza MgCl₂","tepelný rozklad MgO","cementace železem"], c:1,
  e:"Z mořské vody se hořčík vysráží jako Mg(OH)₂, ten se převede na MgCl₂ a elektrolyzuje se tavenina při 700 až 750 °C. Alternativou je silikotermie za sníženého tlaku (Pidgeonův proces), kde hořčík odchází jako pára."},
 {q:"olovo z galenitu PbS", o:["Krollův postup","tavná elektrolýza","kyanidové loužení","pražně‑reakční postup"], c:3,
  e:"Část rudy se opraží na PbO, pak se uzavře přívod vzduchu a zbylý sulfid oxid zredukuje: 2 PbO + PbS → 3 Pb + SO₂. Elegantní na tom je, že síra i kyslík odejdou společně a není potřeba žádné cizí redukovadlo."},
 {q:"křemík polovodičové čistoty", o:["redukce SiO₂ uhlíkem v obloukové peci a poté zonální tavba","kyanidové loužení","elektrolýza vodného roztoku","pražení"], c:0,
  e:"Redukce v obloukové peci dá surový křemík o čistotě kolem 98 %, což je pro polovodič bezcenné. Následuje převedení na těkavý chlorosilan, jeho destilace a nakonec <b>zonální tavba</b>, která vytlačí příměsi na konec ingotu."},
 {q:"vápník pro kalciotermii", o:["redukce koksem","tavná elektrolýza CaCl₂ nebo aluminotermie z CaO","pražení vápence","elektrolýza vodného roztoku"], c:1,
  e:"Vápník má E° = −2,87 V, takže vodný roztok nepřichází v úvahu. Pálením vápence vzniká CaO, ne kov. Zbývá elektrolýza taveniny CaCl₂ při 700 až 800 °C, nebo redukce CaO hliníkem za sníženého tlaku."},
 {q:"stříbro jako vedlejší produkt", o:["z anodových kalů při elektrolytické rafinaci mědi","z kychtového plynu vysoké pece","z kryolitové taveniny","z Bayerova výluhu"], c:0,
  e:"Stříbro je ušlechtilejší než měď, takže se při rafinaci z anody vůbec nerozpustí a spadne pod ni jako kal. Ten je hlavním světovým zdrojem stříbra i podstatnou částí zdroje zlata a platinových kovů."}
];

/* --- trenažér: ochrání, nebo urychlí korozi? ------------------------- */
var OCHR = [
 {q:"Ocelový plech <b>pozinkovaný</b>, povlak je poškrábaný.", o:["Chrání dál — zinek je anodou","Urychlí korozi železa","Nemá žádný vliv","Chrání jen v suchu"], c:0,
  e:"E°(Zn²⁺/Zn) = −0,76 V je zápornější než E°(Fe²⁺/Fe) = −0,44 V, takže se obětuje zinek a železo je katodou. Tomu se říká katodická ochrana obětovanou anodou a funguje i v rýze, kde je holé železo."},
 {q:"Ocelová konzerva <b>pocínovaná</b>, povlak je poškrábaný.", o:["Chrání dál","Urychlí korozi železa","Nemá žádný vliv","Cín se rozpustí místo železa"], c:1,
  e:"Cín (−0,14 V) je ušlechtilejší než železo (−0,44 V). V rýze se tedy anodou stane <b>železo</b> a koroduje rychleji, než kdyby byl plech holý. Neporušený cínový povlak je ale výborná bariéra — proto konzervy."},
 {q:"Měděný okap přišroubovaný <b>k pozinkovanému</b> žlabu.", o:["Nic se nestane","Koroduje měď","Koroduje pozinkovaná ocel","Obojí se pasivuje"], c:2,
  e:"Vznikne článek mezi kovy s velkým rozdílem potenciálů (Cu +0,34 V a Zn −0,76 V). Anodou je zinek, takže se rozpouští on — proto se v klempířství nikdy nekombinuje měď se zinkem ani s hliníkem bez izolační podložky."},
 {q:"Hliníkové okno vystavené dešti.", o:["Rychle koroduje, je velmi neušlechtilý","Vydrží — pasivuje se souvislou vrstvou Al₂O₃","Musí mít obětovanou anodu","Koroduje jen v suchu"], c:1,
  e:"Podle E° = −1,66 V by měl hliník korodovat prudčeji než železo. Zachrání ho <b>pasivace</b>: vrstvička Al₂O₃ silná několik nanometrů je souvislá, přilnavá a neprostupná. Eloxováním se ještě uměle zesílí."},
 {q:"Nerezavějící ocel s 18 % chromu a 8 % niklu.", o:["Chrom vytvoří pasivní vrstvu Cr₂O₃","Nikl působí jako obětovaná anoda","Uhlík zabraňuje korozi","Rez se tvoří, jen není vidět"], c:0,
  e:"Nejméně 10,5 % chromu stačí na to, aby se na povrchu utvořila souvislá vrstva Cr₂O₃, která se po poškrábání sama obnoví. Nikl stabilizuje strukturu s plošně centrovanou mřížkou a zlepšuje tvárnost."},
 {q:"Hořčíková tyč zašroubovaná v <b>bojleru</b>.", o:["Změkčuje vodu","Je obětovaná anoda a chrání nádobu","Je topné těleso","Brání usazování vodního kamene"], c:1,
  e:"Hořčík má E° = −2,37 V, tedy zdaleka nejzápornější z materiálů v bojleru. Rozpouští se místo ocelové nádoby a po několika letech se vymění. Bez ní by nádoba prorezavěla."},
 {q:"Ocelová konstrukce natřená barvou, nátěr je neporušený.", o:["Chrání katodicky","Chrání bariérově","Chrání pasivací","Nechrání vůbec"], c:1,
  e:"Nátěr nemá žádnou elektrochemickou funkci — jen fyzicky odděluje kov od vody a kyslíku. Proto chrání jen tak dlouho, dokud je celistvý; po poškození koroze pokračuje a často podlézá pod vrstvu."},
 {q:"Železný hřebík zapíchnutý do <b>měděné</b> desky, obojí ve vlhku.", o:["Koroduje měď","Koroduje železo, a rychleji než samo","Nic","Obojí stejně"], c:1,
  e:"Železo je z dvojice neušlechtilejší, stane se tedy anodou a rozpouští se. Měď poskytne velkou katodovou plochu, takže proud článkem je velký a železo mizí rychleji než bez mědi. Poměr ploch anody a katody je u koroze zásadní."},
 {q:"Potrubí připojené <b>k zápornému pólu</b> stejnosměrného zdroje.", o:["Koroduje rychleji","Je katodicky chráněné","Nemá to vliv","Zdroj musí být střídavý"], c:1,
  e:"Záporný pól znamená, že do potrubí trvale tečou elektrony a jeho potenciál se drží tak nízko, že oxidace kovu termodynamicky nemůže proběhnout. To je katodická ochrana vnějším zdrojem, používaná u dlouhých plynovodů."},
 {q:"Zinkový povlak časem <b>zmatní</b> a zešedne.", o:["Povlak selhal, kov je odkrytý","Vznikla ochranná vrstva zásaditého uhličitanu zinečnatého","Zinek se odpařil","Je to rez"], c:1,
  e:"Zinek na vzduchu reaguje s kyslíkem, vodou a oxidem uhličitým na souvislou vrstvičku zásaditého uhličitanu. Ta je nerozpustná a přilnavá, takže dále chrání — matný šedý vzhled je proto známkou funkční ochrany, ne selhání."},
 {q:"Sůl posypaná na silnici v zimě.", o:["Koroze se zpomalí","Koroze se zrychlí","Nemá vliv","Zabrání tvorbě rzi"], c:1,
  e:"Chlorid sodný zvýší vodivost elektrolytu, takže korozním článkem projde větší proud. Chloridové ionty navíc narušují pasivní vrstvy. Proto se auta v zimě myjí a proto se podvozky chrání voskem."},
 {q:"Souvislá vrstva rzi na oceli.", o:["Chrání jako u hliníku","Nechrání, je porézní a odpadává","Zpomalí korozi na polovinu","Funguje jako obětovaná anoda"], c:1,
  e:"Rez FeO(OH) má výrazně větší objem než kov, ze kterého vznikla, takže se odlupuje a je porézní. Vodu i kyslík pouští dál — na rozdíl od Al₂O₃, který je souvislý a přilnavý. To je celý rozdíl mezi rzí a pasivací."}
];
