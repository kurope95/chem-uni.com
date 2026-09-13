/* ============================================================
   1 · DATA — halogeny (skupina 17) a vzácné plyny (skupina 18)
   Hodnoty: teploty ve °C, energie v kJ·mol⁻¹, poloměry v pm,
   elektronegativita Paulingova, E° ve V proti SHE (25 °C).
   Zdroje typu CRC / Chemické tabulky, zaokrouhleno na 3–4 platné číslice.
   ============================================================ */

/* --- HALOGENY -------------------------------------------------- */
var HAL = [
 {s:"F", nm:"fluor", z:9, Ar:18.998,
  cfg:"[He] 2s²2p⁵", val:"2s²2p⁵", per:2,
  en:3.98, rcov:71, rion:133, ie:1681, ea:328,
  tt:-219.6, tv:-188.1, D:158.8, E0:2.87, pol:0.557,
  st:"plyn", barva:"světle žlutý", col:"var(--warn)",
  ox:"jen −I", oxlist:[-1],
  vysk:"kazivec (fluorit) CaF₂, kryolit Na₃AlF₆, fluoroapatit Ca₅(PO₄)₃F",
  obj:"0,054 % hmotnostních zemské kůry (13. nejhojnější prvek)",
  n:"Nejsilnější chemické oxidační činidlo vůbec. Volný v přírodě neexistuje — je tak reaktivní, že by nic nepřežil."},
 {s:"Cl", nm:"chlor", z:17, Ar:35.45,
  cfg:"[Ne] 3s²3p⁵", val:"3s²3p⁵", per:3,
  en:3.16, rcov:99, rion:181, ie:1251, ea:349,
  tt:-101.5, tv:-34.0, D:242.6, E0:1.36, pol:2.18,
  st:"plyn", barva:"žlutozelený", col:"var(--cat1)",
  ox:"−I, +I, +III, +IV, +V, +VII", oxlist:[-1,1,3,4,5,7],
  vysk:"halit (kamenná sůl) NaCl, sylvín KCl, karnalit KCl·MgCl₂·6H₂O, mořská voda",
  obj:"0,013 % zemské kůry; v mořské vodě 19,4 g·dm⁻³ chloridů",
  n:"Nejpoužívanější halogen. Zhruba 60 % chemického průmyslu prochází někde chlorem."},
 {s:"Br", nm:"brom", z:35, Ar:79.904,
  cfg:"[Ar] 3d¹⁰4s²4p⁵", val:"4s²4p⁵", per:4,
  en:2.96, rcov:114, rion:196, ie:1140, ea:325,
  tt:-7.2, tv:58.8, D:192.8, E0:1.07, pol:3.05,
  st:"kapalina", barva:"červenohnědá", col:"var(--exo)",
  ox:"−I, +I, +III, +V, +VII", oxlist:[-1,1,3,5,7],
  vysk:"bromidy jako příměs v chloridových ložiscích, mořská voda, solanky",
  obj:"mořská voda 65 mg·dm⁻³, Mrtvé moře asi 5 g·dm⁻³",
  n:"Jediný nekov, který je za laboratorní teploty kapalný. Řecky „brómos“ = zápach."},
 {s:"I", nm:"jod", z:53, Ar:126.90,
  cfg:"[Kr] 4d¹⁰5s²5p⁵", val:"5s²5p⁵", per:5,
  en:2.66, rcov:133, rion:220, ie:1008, ea:295,
  tt:113.7, tv:184.3, D:151.1, E0:0.54, pol:4.7,
  st:"pevná látka", barva:"šedočerná s kovovým leskem, páry fialové", col:"var(--cat2)",
  ox:"−I, +I, +III, +V, +VII", oxlist:[-1,1,3,5,7],
  vysk:"jodičnany v chilském ledku, solanky u ropných ložisek, mořské řasy",
  obj:"mořská voda jen 0,06 mg·dm⁻³ — řasy ho koncentrují až 10⁵×",
  n:"Snadno sublimuje. Jediný halogen, který je pro člověka nezbytnou živinou (hormony štítné žlázy)."},
 {s:"At", nm:"astat", z:85, Ar:210,
  cfg:"[Xe] 4f¹⁴5d¹⁰6s²6p⁵", val:"6s²6p⁵", per:6,
  en:2.2, rcov:150, rion:227, ie:899, ea:233,
  tt:302, tv:337, D:116, E0:0.3, pol:6.0,
  st:"pevná látka (odhad)", barva:"tmavá, patrně s kovovým vzhledem", col:"var(--ink-3)",
  ox:"−I, +I, +V (známo jen ve stopách)", oxlist:[-1,1,5],
  vysk:"nevzniká těžbou — jen jako mezičlánek rozpadových řad uranu a thoria",
  obj:"v celé zemské kůře je ho v každém okamžiku odhadem méně než 25 g",
  n:"Nejvzácnější přirozeně se vyskytující prvek. Připraven 1940 ostřelováním bismutu částicemi α; ²¹¹At (poločas 7,21 h) se dnes zkouší v cílené alfa-terapii nádorů."}
];
function halBy(s){ for(var i=0;i<HAL.length;i++) if(HAL[i].s===s) return HAL[i]; return HAL[1]; }

/* --- VZÁCNÉ PLYNY ---------------------------------------------- */
var VZP = [
 {s:"He", nm:"helium", z:2, Ar:4.003, cfg:"1s²", ie:2372, ea:-48,
  tt:null, tv:-268.93, tvK:4.22, air:5.24, pol:0.205, col:"var(--cat3)",
  zdroj:"zemní plyn (0,3–7 obj. % v některých ložiscích v USA, Kataru a Alžírsku)",
  uziti:"chlazení supravodivých magnetů (magnetická rezonance, urychlovače), nosný plyn v chromatografii, dýchací směs heliox, plnění balonů",
  n:"Vzniká α-rozpadem uranu a thoria v horninách. Ze vzduchu se nevyplatí — v zemním plynu je ho tisíckrát víc. Jako jediná látka netuhne za normálního tlaku ani při 0 K."},
 {s:"Ne", nm:"neon", z:10, Ar:20.180, cfg:"[He] 2s²2p⁶", ie:2081, ea:-116,
  tt:-248.59, tv:-246.05, tvK:27.10, air:18.18, pol:0.396, col:"var(--cat4)",
  zdroj:"frakční destilace kapalného vzduchu (nekondenzující frakce)",
  uziti:"reklamní výbojky s oranžovočerveným světlem, směs s heliem v He–Ne laseru, kryogenní chladivo",
  n:"Nejinertnější prvek periodické tabulky — netvoří ani nejexotičtější sloučeniny."},
 {s:"Ar", nm:"argon", z:18, Ar:39.948, cfg:"[Ne] 3s²3p⁶", ie:1521, ea:-96,
  tt:-189.35, tv:-185.85, tvK:87.30, air:9340, pol:1.641, col:"var(--endo)",
  zdroj:"frakční destilace kapalného vzduchu (0,934 obj. %, tedy 9,3 dm³ v m³ vzduchu)",
  uziti:"ochranná atmosféra při svařování (metody MIG a TIG), inertní atmosféra při výrobě titanu a křemíku, plyn mezi skly izolačních oken",
  n:"Devadesát devět procent veškerého vzácného plynu na Zemi. Vzniká rozpadem draslíku ⁴⁰K, proto je ho tolik."},
 {s:"Kr", nm:"krypton", z:36, Ar:83.798, cfg:"[Ar] 3d¹⁰4s²4p⁶", ie:1351, ea:-96,
  tt:-157.36, tv:-153.22, tvK:119.93, air:1.14, pol:2.484, col:"var(--cat2)",
  zdroj:"kapalný kyslík ze vzduchové destilace (těžká frakce)",
  uziti:"náplň výkonných výbojek a světlometů, plnění izolačních oken s vyšší izolací než argon",
  n:"V letech 1960–1983 byl metr definován vlnovou délkou oranžové čáry ⁸⁶Kr (605,78 nm)."},
 {s:"Xe", nm:"xenon", z:54, Ar:131.29, cfg:"[Kr] 4d¹⁰5s²5p⁶", ie:1170, ea:-77,
  tt:-111.75, tv:-108.10, tvK:165.05, air:0.087, pol:4.044, col:"var(--accent)",
  zdroj:"kapalný kyslík ze vzduchové destilace — v m³ vzduchu je xenonu jen 0,51 mg, takže na jednu tunu je třeba zpracovat asi 2 miliardy m³",
  uziti:"xenonové výbojky (projektory, automobilové světlomety), inhalační anestetikum, pracovní látka iontových motorů družic, detektory temné hmoty",
  n:"Má ze stabilních vzácných plynů nejnižší ionizační energii (1170 kJ·mol⁻¹), a proto jako jediný tvoří bohatou chemii."},
 {s:"Rn", nm:"radon", z:86, Ar:222, cfg:"[Xe] 4f¹⁴5d¹⁰6s²6p⁶", ie:1037, ea:-68,
  tt:-71, tv:-61.7, tvK:211.5, air:0.0000000001, pol:5.3, col:"var(--bad)",
  zdroj:"vzniká rozpadem radia v horninách; ze vzduchu se nezískává",
  uziti:"dříve zdroj záření α v onkologii; dnes se hlavně měří a odvětrává",
  n:"Radioaktivní, ²²²Rn má poločas 3,82 dne. V budovách je po kouření druhou nejčastější příčinou rakoviny plic; česká referenční úroveň v pobytových místnostech je 300 Bq·m⁻³."}
];
function vzpBy(s){ for(var i=0;i<VZP.length;i++) if(VZP[i].s===s) return VZP[i]; return VZP[4]; }

/* složky vzduchu podle teploty varu — pro model destilační kolony (K) */
var VZDUCH = [
 {s:"He",  nm:"helium",       tvK:4.22,   obj:5.24,       col:"var(--cat3)"},
 {s:"Ne",  nm:"neon",         tvK:27.10,  obj:18.18,      col:"var(--cat4)"},
 {s:"N₂",  nm:"dusík",        tvK:77.36,  obj:780840,     col:"var(--ink-3)"},
 {s:"Ar",  nm:"argon",        tvK:87.30,  obj:9340,       col:"var(--endo)"},
 {s:"O₂",  nm:"kyslík",       tvK:90.19,  obj:209460,     col:"var(--cat1)"},
 {s:"Kr",  nm:"krypton",      tvK:119.93, obj:1.14,       col:"var(--cat2)"},
 {s:"Xe",  nm:"xenon",        tvK:165.05, obj:0.087,      col:"var(--accent)"},
 {s:"CO₂", nm:"oxid uhličitý",tvK:194.7,  obj:417,        col:"var(--warn)"}
];

/* --- SLOUČENINY XENONU ------------------------------------------ */
var XEC = [
 {f:"XeF₂", nm:"fluorid xenonatý", ox:2, par:5, vol:3, geom:"lineární",
  tt:"129 °C", prip:"Xe + F₂ → XeF₂ (400 °C v niklové nádobě, nebo UV záření za laboratorní teploty)",
  hyd:"2 XeF₂ + 2 H₂O → 2 Xe + O₂ + 4 HF",
  n:"Nejstálejší a nejdostupnější sloučenina xenonu; bílá krystalická látka, prodává se v ampulích. Používá se jako mírné fluorační činidlo v organické syntéze."},
 {f:"XeF₄", nm:"fluorid xenoničitý", ox:4, par:6, vol:2, geom:"čtvercová (rovinná)",
  tt:"117 °C", prip:"Xe + 2 F₂ → XeF₄ (400 °C, tlak asi 0,6 MPa, přebytek fluoru)",
  hyd:"6 XeF₄ + 12 H₂O → 4 Xe + 2 XeO₃ + 24 HF + 3 O₂",
  n:"Šest elektronových párů, dva volné — a ty se v oktaedru postaví proti sobě, takže čtyři fluory zbudou v jedné rovině. Hydrolýza je disproporcionace: část xenonu klesne na 0, část stoupne na +VI."},
 {f:"XeF₆", nm:"fluorid xenonový", ox:6, par:7, vol:1, geom:"deformovaný oktaedr",
  tt:"49,5 °C", prip:"Xe + 3 F₂ → XeF₆ (300 °C, tlak asi 6 MPa)",
  hyd:"XeF₆ + 3 H₂O → XeO₃ + 6 HF",
  n:"Sedm elektronových párů — klasický model VSEPR na to nestačí, molekula je „pokřivený“ oktaedr s neustále se přemísťujícím volným párem. Leptá sklo, protože vzniklý HF reaguje s SiO₂."},
 {f:"XeO₃", nm:"oxid xenonový", ox:6, par:4, vol:1, geom:"trigonální pyramida",
  tt:"rozkládá se", prip:"úplnou hydrolýzou XeF₆ vodní parou",
  hyd:"2 XeO₃ → 2 Xe + 3 O₂ (výbušně)",
  n:"Bezbarvá krystalická látka, v suchém stavu prudce výbušná. Ve vodném roztoku je to velmi silné oxidační činidlo — a po reakci po sobě nenechá nic než inertní xenon."},
 {f:"XeO₄", nm:"oxid xenoničelý", ox:8, par:4, vol:0, geom:"tetraedr",
  tt:"−35,9 °C", prip:"Na₄XeO₆ + 2 H₂SO₄ → XeO₄ + 2 Na₂SO₄ + 2 H₂O",
  hyd:"rozkládá se nad −36 °C na Xe a O₂",
  n:"Nejvyšší oxidační číslo, jakého xenon dosáhne. Žlutý plyn, který nad −36 °C prudce vybuchuje."},
 {f:"XeO₆⁴⁻", nm:"xenoničelanový anion (perxenát)", ox:8, par:6, vol:0, geom:"oktaedr",
  tt:"soli jsou stálé", prip:"2 XeO₃ + 4 NaOH → Na₄XeO₆ + Xe + O₂ + 2 H₂O",
  hyd:"soli jsou ve vodě stálé, v kyselině dávají XeO₄",
  n:"Xenoničelan sodný patří k nejméně rozpustným sodným solím a v analytické chemii slouží jako oxidační činidlo, které do vzorku nezanese žádný cizí kationt."},
 {f:"KrF₂", nm:"fluorid kryptonatý", ox:2, par:5, vol:3, geom:"lineární",
  tt:"rozklad nad −30 °C", prip:"Kr + F₂ v elektrickém výboji při −196 °C",
  hyd:"2 KrF₂ → 2 Kr + 2 F₂ (samovolně)",
  n:"Jediná dobře prokázaná sloučenina kryptonu a nejsilnější známé fluorační činidlo — dokáže oxidovat i zlato na AuF₅."}
];

/* --- HALOGENOVODÍKY --------------------------------------------- */
var HXD = [
 {f:"HF", x:"F", tt:-83.6, tv:19.5, D:567, pKa:3.17, dHX:92,
  kys:"slabá kyselina", prip:"CaF₂ + H₂SO₄ → CaSO₄ + 2 HF",
  n:"Jediný halogenovodík, který je slabou kyselinou, a jediný, který v kapalném stavu tvoří rozsáhlé vodíkové můstky. Leptá sklo a je mimořádně nebezpečný pro tkáně."},
 {f:"HCl", x:"Cl", tt:-114.2, tv:-85.1, D:431, pKa:-7, dHX:127,
  kys:"silná kyselina", prip:"2 NaCl + H₂SO₄ → Na₂SO₄ + 2 HCl (za tepla)",
  n:"Vodný roztok o koncentraci asi 36 % je „kyselina solná“. Vyrábí se dnes hlavně přímou syntézou z prvků a jako vedlejší produkt chlorace uhlovodíků."},
 {f:"HBr", x:"Br", tt:-86.9, tv:-66.4, D:366, pKa:-9, dHX:141,
  kys:"silná kyselina", prip:"PBr₃ + 3 H₂O → H₃PO₃ + 3 HBr",
  n:"Z bromidu a koncentrované H₂SO₄ ho nepřipravíte — kyselina sírová bromid zoxiduje na brom. Buď se použije H₃PO₄, nebo hydrolýza PBr₃."},
 {f:"HI", x:"I", tt:-50.8, tv:-35.4, D:298, pKa:-10, dHX:161,
  kys:"nejsilnější z halogenovodíků", prip:"PI₃ + 3 H₂O → H₃PO₃ + 3 HI",
  n:"Nejslabší vazba H–X, tedy nejsilnější kyselina — a zároveň nejlepší redukční činidlo. Na vzduchu sám hnědne, jak se oxiduje na jod."}
];

/* --- KYSLÍKATÉ KYSELINY CHLORU ---------------------------------- */
var OXO = [
 {f:"HClO", nm:"kyselina chlorná", ox:1, pKa:7.54, nO:0, dClO:170,
  an:"ClO⁻", anNm:"chlornan", sul:"NaClO (savo), Ca(ClO)₂ (chlorové vápno)",
  geom:"lomená H—O—Cl", oxid:1.63,
  n:"Nejslabší z řady a zároveň nejsilnější oxidační činidlo. Existuje jen ve zředěném roztoku; právě nedisociovaná molekula HClO proniká buněčnou stěnou a dezinfikuje."},
 {f:"HClO₂", nm:"kyselina chloritá", ox:3, pKa:1.94, nO:1, dClO:157,
  an:"ClO₂⁻", anNm:"chloritan", sul:"NaClO₂ (bělení textilu a papíru)",
  geom:"lomený anion ClO₂⁻, dva volné páry", oxid:1.64,
  n:"Nejméně stálá z celé řady — čistou ji nikdo nepřipravil. Soli jsou naopak dost stálé a používají se k bělení."},
 {f:"HClO₃", nm:"kyselina chlorečná", ox:5, pKa:-1.0, nO:2, dClO:149,
  an:"ClO₃⁻", anNm:"chlorečnan", sul:"KClO₃ (zápalky, pyrotechnika), NaClO₃",
  geom:"trigonální pyramida ClO₃⁻, jeden volný pár", oxid:1.45,
  n:"Silná kyselina, nad 40 % koncentraci se rozkládá. Tuhé chlorečnany jsou stálé, ale při zahřátí disproporcionují a se sírou nebo cukrem explodují."},
 {f:"HClO₄", nm:"kyselina chloristá", ox:7, pKa:-8.0, nO:3, dClO:144,
  an:"ClO₄⁻", anNm:"chloristan", sul:"KClO₄, NH₄ClO₄ (tuhá raketová paliva)",
  geom:"tetraedr ClO₄⁻, žádný volný pár", oxid:1.20,
  n:"Jedna z nejsilnějších anorganických kyselin a jediná oxokyselina chloru, kterou lze izolovat jako čistou látku. Zředěná skoro neoxiduje, koncentrovaná s organickou látkou exploduje."}
];

/* --- OXIDY HALOGENŮ --------------------------------------------- */
var OXID = [
 {f:"OF₂", nm:"fluorid kyslíku", ox:"F −I, O +II", st:"světle žlutý plyn",
  n:"Nesmí se říkat „oxid fluorný“ — fluor je elektronegativnější než kyslík, takže kladné oxidační číslo má tady kyslík. Vzniká reakcí F₂ se zředěným NaOH."},
 {f:"Cl₂O", nm:"oxid chlorný", ox:"Cl +I", st:"žlutohnědý plyn",
  n:"Anhydrid kyseliny chlorné. Lomená molekula, endotermická látka — při zahřátí exploduje."},
 {f:"ClO₂", nm:"oxid chloričitý", ox:"Cl +IV", st:"žlutozelený plyn",
  n:"Molekula s jedním nepárovým elektronem (radikál), a přesto stálá. Dnes nejdůležitější bělicí a dezinfekční sloučenina chloru — vyrábí se přímo na místě spotřeby, protože se nedá přepravovat."},
 {f:"Cl₂O₇", nm:"oxid chloristý", ox:"Cl +VII", st:"bezbarvá olejovitá kapalina",
  n:"Anhydrid kyseliny chloristé, získává se její dehydratací oxidem fosforečným. Nejstálejší oxid chloru — ale i tak výbušný."},
 {f:"I₂O₅", nm:"oxid jodičný", ox:"I +V", st:"bílá krystalická látka",
  n:"Jediný exotermický oxid halogenu, a proto nejstálejší. Anhydrid kyseliny jodičné; s oxidem uhelnatým reaguje kvantitativně, takže se jím CO stanovuje."}
];

/* --- INTERHALOGENY ---------------------------------------------- */
var INTER = [
 {f:"ClF",   typ:"XY",  geom:"lineární", st:"bezbarvý plyn", ox:"Cl +I, F −I", n:"Nejjednodušší interhalogen; jako každý typ XY má stejnou stavbu jako molekula halogenu, jen je polární."},
 {f:"BrCl",  typ:"XY",  geom:"lineární", st:"červenohnědý plyn", ox:"Br +I, Cl −I", n:"Existuje jen v rovnováze se svými prvky; používá se k dezinfekci vody místo chloru."},
 {f:"ICl",   typ:"XY",  geom:"lineární", st:"červenohnědé krystaly", ox:"I +I, Cl −I", n:"Taje při 27 °C. Hydrolyzuje na HCl a kyselinu jodnou — kladný náboj nese vždy méně elektronegativní halogen."},
 {f:"ClF₃",  typ:"XY₃", geom:"tvar T", st:"bezbarvý plyn", ox:"Cl +III, F −I", n:"Jedno z nejagresivnějších známých činidel — zapaluje azbest, beton i vodu. Používá se k čištění reaktorů v polovodičovém průmyslu."},
 {f:"BrF₃",  typ:"XY₃", geom:"tvar T", st:"bezbarvá kapalina", ox:"Br +III, F −I", n:"Kapalina, která sama sebe ionizuje, a proto slouží jako nevodné rozpouštědlo pro fluorační reakce."},
 {f:"ICl₃",  typ:"XY₃", geom:"tvar T (dimer I₂Cl₆)", st:"žluté krystaly", ox:"I +III, Cl −I", n:"V pevném stavu je to plochý dimer se dvěma můstkovými atomy chloru — stejný motiv jako u Al₂Cl₆."},
 {f:"BrF₅",  typ:"XY₅", geom:"tetragonální pyramida", st:"bezbarvá kapalina", ox:"Br +V, F −I", n:"Šest elektronových párů, jeden volný. Hydrolyzuje na kyselinu bromičnou a fluorovodík."},
 {f:"IF₅",   typ:"XY₅", geom:"tetragonální pyramida", st:"bezbarvá kapalina", ox:"I +V, F −I", n:"Nejběžnější interhalogen typu XY₅; mírnější fluorační činidlo než BrF₅."},
 {f:"IF₇",   typ:"XY₇", geom:"pentagonální bipyramida", st:"bezbarvý plyn", ox:"I +VII, F −I", n:"Jediný známý interhalogen typu XY₇ — sedm ligandů unese jen velký jod obklopený nejmenším možným partnerem."}
];

/* --- ŘADA IONTOVÝ → KOVALENTNÍ HALOGENID ------------------------ */
var ROW = [
 {f:"NaCl",  el:"Na", enM:0.93, tt:801,  tv:1465, typ:"iontový",
  n:"Krystalová mřížka z iontů Na⁺ a Cl⁻. Tavenina vede proud, ve vodě jen disociuje."},
 {f:"MgCl₂", el:"Mg", enM:1.31, tt:714,  tv:1412, typ:"převážně iontový",
  n:"Ještě iontový, ale hořečnatý kationt už chloridový anion znatelně polarizuje — hydrát MgCl₂·6H₂O se při sušení hydrolyzuje."},
 {f:"AlCl₃", el:"Al", enM:1.61, tt:192,  tv:180,  typ:"přechodný — v tavenině dimer Al₂Cl₆",
  n:"Zlom celé řady. V pevném stavu vrstevnatá mřížka, v tavenině a v páře dimerní molekuly Al₂Cl₆ se dvěma můstkovými chlory. Sublimuje při 180 °C, s vodou bouřlivě hydrolyzuje."},
 {f:"SiCl₄", el:"Si", enM:1.90, tt:-68.7,tv:57.6, typ:"molekulární kovalentní",
  n:"Tetraedrická molekula, těkavá kapalina. Ve vodě okamžitě hydrolyzuje na SiO₂ a HCl."},
 {f:"PCl₃",  el:"P",  enM:2.19, tt:-93.6,tv:76.1, typ:"molekulární kovalentní",
  n:"Pyramidální molekula s volným párem na fosforu. Hydrolyzuje na kyselinu fosforitou."},
 {f:"SCl₂",  el:"S",  enM:2.58, tt:-121, tv:59,   typ:"molekulární kovalentní",
  n:"Lomená molekula, jen slabě polární vazba. Nestálá červená kapalina."},
 {f:"Cl₂",   el:"Cl", enM:3.16, tt:-101.5,tv:-34.0,typ:"nepolární kovalentní",
  n:"Konec řady: partner je halogen sám, rozdíl elektronegativit je nula, vazba je čistě kovalentní."}
];

/* --- PROHLEDÁVATELNÁ TABULKA SLOUČENIN -------------------------- */
var TAB = [
 {f:"NaCl", nm:"chlorid sodný", g:"hal", ox:"−I", v:"iontový, t.t. 801 °C, dobře rozpustný", u:"surovina pro chlor a hydroxid sodný, potravinářství, posyp"},
 {f:"KCl", nm:"chlorid draselný", g:"hal", ox:"−I", v:"iontový, t.t. 770 °C", u:"draselné hnojivo (sylvín), lékařství"},
 {f:"CaF₂", nm:"fluorid vápenatý (kazivec)", g:"hal", ox:"−I", v:"iontový, t.t. 1418 °C, prakticky nerozpustný", u:"jediná surovina pro fluor a HF, tavidlo v hutnictví, optika (propouští UV i IR)"},
 {f:"AgCl", nm:"chlorid stříbrný", g:"hal", ox:"−I", v:"bílá sraženina, K_s = 1,8·10⁻¹⁰, rozpustná v amoniaku", u:"důkaz chloridů, dříve fotografie"},
 {f:"AgBr", nm:"bromid stříbrný", g:"hal", ox:"−I", v:"nažloutlá sraženina, K_s = 5,4·10⁻¹³, na světle černá", u:"klasický fotografický materiál"},
 {f:"AgI", nm:"jodid stříbrný", g:"hal", ox:"−I", v:"žlutá sraženina, K_s = 8,5·10⁻¹⁷, v amoniaku nerozpustná", u:"důkaz jodidů, očkování mraků"},
 {f:"AlCl₃", nm:"chlorid hlinitý", g:"hal", ox:"−I", v:"kovalentní, sublimuje při 180 °C jako dimer Al₂Cl₆, dýmá na vzduchu", u:"katalyzátor Friedelovy–Craftsovy reakce"},
 {f:"SiCl₄", nm:"chlorid křemičitý", g:"hal", ox:"−I", v:"kapalina, t.v. 57,6 °C, prudce hydrolyzuje", u:"výroba čistého křemíku a optických vláken"},
 {f:"TiCl₄", nm:"chlorid titaničitý", g:"hal", ox:"−I", v:"kapalina, t.v. 136 °C, na vzduchu dýmá", u:"chloridový proces výroby titanové běloby a kovového titanu"},
 {f:"PCl₅", nm:"chlorid fosforečný", g:"hal", ox:"−I", v:"pevný, hydrolyzuje na H₃PO₄", u:"chlorační činidlo v organické syntéze"},
 {f:"CCl₄", nm:"chlorid uhličitý (tetrachlormethan)", g:"org", ox:"−I", v:"kapalina, t.v. 76,7 °C, s vodou nereaguje", u:"dříve rozpouštědlo a hasivo — dnes zakázán (jedovatý, ničí ozon)"},
 {f:"SF₆", nm:"fluorid sírový", g:"hal", ox:"−I", v:"netečný plyn, nehořlavý, výborný izolant", u:"izolační plyn ve vysokonapěťových vypínačích — ale skleníkový plyn s GWP asi 24 300"},
 {f:"UF₆", nm:"fluorid uranový", g:"hal", ox:"−I", v:"sublimuje při 56 °C", u:"jediná těkavá sloučenina uranu — obohacování jaderného paliva"},
 {f:"HF", nm:"fluorovodík", g:"hx", ox:"−I", v:"t.v. 19,5 °C, slabá kyselina (pKa 3,17), vodíkové můstky", u:"leptání a matování skla, výroba fluoroplastů a chladiv, kryolit pro hliník"},
 {f:"HCl", nm:"chlorovodík", g:"hx", ox:"−I", v:"plyn, t.v. −85 °C, silná kyselina", u:"kyselina solná (36 %), moření kovů, výroba chloridů"},
 {f:"HBr", nm:"bromovodík", g:"hx", ox:"−I", v:"plyn, silná kyselina, snadno se oxiduje", u:"bromace v organické syntéze, výroba bromidů"},
 {f:"HI", nm:"jodovodík", g:"hx", ox:"−I", v:"plyn, nejsilnější z halogenovodíků, silné redukční činidlo", u:"redukční činidlo, výroba jodidů"},
 {f:"HClO", nm:"kyselina chlorná", g:"oxo", ox:"+I", v:"jen v roztoku, pKa 7,54, silné oxidační činidlo", u:"účinná složka chlorované vody a bazénové chemie"},
 {f:"NaClO", nm:"chlornan sodný", g:"sul", ox:"+I", v:"roztok asi 5 % (savo), na světle se rozkládá", u:"bělidlo, dezinfekce; s kyselinou uvolňuje jedovatý chlor"},
 {f:"Ca(ClO)₂", nm:"chlornan vápenatý", g:"sul", ox:"+I", v:"složka chlorového vápna, pevná látka", u:"dezinfekce vody, bělení"},
 {f:"HClO₂", nm:"kyselina chloritá", g:"oxo", ox:"+III", v:"velmi nestálá, pKa 1,94", u:"prakticky se nepoužívá, význam mají až její soli"},
 {f:"NaClO₂", nm:"chloritan sodný", g:"sul", ox:"+III", v:"pevný, stálejší než kyselina", u:"bělení textilu a papíru, výroba ClO₂"},
 {f:"HClO₃", nm:"kyselina chlorečná", g:"oxo", ox:"+V", v:"silná kyselina, nad 40 % se rozkládá", u:"meziprodukt při výrobě chlorečnanů"},
 {f:"KClO₃", nm:"chlorečnan draselný (Bertholletova sůl)", g:"sul", ox:"+V", v:"pevný, silné oxidační činidlo, se sírou exploduje", u:"hlavičky zápalek, pyrotechnika, laboratorní zdroj kyslíku"},
 {f:"HClO₄", nm:"kyselina chloristá", g:"oxo", ox:"+VII", v:"nejsilnější běžná anorganická kyselina, pKa asi −8", u:"analytická chemie; koncentrovaná je nebezpečné oxidační činidlo"},
 {f:"NH₄ClO₄", nm:"chloristan amonný", g:"sul", ox:"+VII", v:"pevný, s hliníkem hoří velmi prudce", u:"okysličovadlo tuhých raketových paliv"},
 {f:"Cl₂O", nm:"oxid chlorný", g:"ox", ox:"+I", v:"žlutohnědý plyn, endotermický, výbušný", u:"anhydrid kyseliny chlorné"},
 {f:"ClO₂", nm:"oxid chloričitý", g:"ox", ox:"+IV", v:"žlutozelený plyn, radikál s nepárovým elektronem", u:"bělení papíru bez elementárního chloru, úprava pitné vody"},
 {f:"Cl₂O₇", nm:"oxid chloristý", g:"ox", ox:"+VII", v:"olejovitá kapalina, nejstálejší oxid chloru", u:"anhydrid kyseliny chloristé"},
 {f:"I₂O₅", nm:"oxid jodičný", g:"ox", ox:"+V", v:"bílá pevná látka, jediný exotermický oxid halogenu", u:"stanovení oxidu uhelnatého"},
 {f:"HIO₃", nm:"kyselina jodičná", g:"oxo", ox:"+V", v:"bílá krystalická látka — jediná oxokyselina halogenu stálá v tuhém stavu vedle HClO₄", u:"oxidační činidlo, odměrná analýza"},
 {f:"H₅IO₆", nm:"kyselina pentahydrogenjodistá", g:"oxo", ox:"+VII", v:"oktaedrická molekula, bílá krystalická látka", u:"štěpení vazeb C—C u sacharidů v organické analýze"},
 {f:"KIO₃", nm:"jodičnan draselný", g:"sul", ox:"+V", v:"stálý, na rozdíl od jodidu se na vzduchu neoxiduje", u:"jodace kuchyňské soli (v ČR 20–34 mg jodu na kg soli)"},
 {f:"KI", nm:"jodid draselný", g:"hal", ox:"−I", v:"rozpouští jod za vzniku I₃⁻", u:"Lugolův roztok, jodometrie, ochrana štítné žlázy při jaderné havárii"},
 {f:"I₃⁻", nm:"trijodidový anion", g:"poly", ox:"−⅓ (formálně)", v:"lineární, hnědý roztok", u:"vysvětluje, proč se jod rozpouští v roztoku jodidu"},
 {f:"ClF₃", nm:"fluorid chloritý", g:"int", ox:"Cl +III", v:"tvar T, zapaluje i nehořlavé látky", u:"čištění reaktorů v polovodičovém průmyslu"},
 {f:"BrF₃", nm:"fluorid bromitý", g:"int", ox:"Br +III", v:"kapalina, samoionizuje se", u:"nevodné rozpouštědlo pro fluorace"},
 {f:"ICl", nm:"chlorid jodný", g:"int", ox:"I +I", v:"červenohnědé krystaly, t.t. 27 °C", u:"stanovení jodového čísla tuků"},
 {f:"IF₇", nm:"fluorid jodistý", g:"int", ox:"I +VII", v:"pentagonální bipyramida", u:"nejvyšší známé koordinační číslo mezi halogeny"},
 {f:"XeF₂", nm:"fluorid xenonatý", g:"vzp", ox:"Xe +II", v:"lineární, bílá krystalická látka, t.t. 129 °C", u:"mírné fluorační činidlo"},
 {f:"XeF₄", nm:"fluorid xenoničitý", g:"vzp", ox:"Xe +IV", v:"čtvercová rovinná molekula, t.t. 117 °C", u:"modelová látka pro výklad VSEPR"},
 {f:"XeO₃", nm:"oxid xenonový", g:"vzp", ox:"Xe +VI", v:"trigonální pyramida, výbušný", u:"velmi silné oxidační činidlo, které po sobě nechá jen xenon"},
 {f:"Na₄XeO₆", nm:"xenoničelan sodný", g:"vzp", ox:"Xe +VIII", v:"oktaedrický anion, málo rozpustný", u:"oxidační činidlo v analytické chemii"},
 {f:"KrF₂", nm:"fluorid kryptonatý", g:"vzp", ox:"Kr +II", v:"rozkládá se nad −30 °C", u:"nejsilnější známé fluorační činidlo"},
 {f:"CCl₂F₂", nm:"dichlordifluormethan (freon 12)", g:"org", ox:"−I", v:"nehořlavý netoxický plyn, t.v. −29,8 °C", u:"dříve chladivo — zakázán Montrealským protokolem, ničí ozonovou vrstvu"},
 {f:"CHF₂CF₃", nm:"pentafluorethan (HFC-125)", g:"org", ox:"−I", v:"neobsahuje chlor, ozon neničí", u:"složka moderních chladiv — ale silný skleníkový plyn, omezuje ho Kigalský dodatek"},
 {f:"(C₂F₄)ₙ", nm:"polytetrafluorethylen (teflon)", g:"org", ox:"−I", v:"odolá kyselinám i 260 °C, extrémně nízké tření", u:"nepřilnavé povrchy, těsnění, chemická technika"},
 {f:"PVC", nm:"polyvinylchlorid", g:"org", ox:"−I", v:"tvrdý i měkčený plast", u:"okna, potrubí, podlahy — spotřebuje asi třetinu vyrobeného chloru"},
 {f:"CHCl₃", nm:"trichlormethan (chloroform)", g:"org", ox:"−I", v:"kapalina, t.v. 61 °C", u:"rozpouštědlo; jako vedlejší produkt chlorace vody se sleduje jeho obsah"},
 {f:"NaF", nm:"fluorid sodný", g:"hal", ox:"−I", v:"iontový, jedovatý ve větších dávkách", u:"zubní pasty a fluoridace — mění hydroxyapatit skloviny na odolnější fluorapatit"}
];
var TABG = {hal:"halogenid", hx:"halogenovodík", oxo:"oxokyselina", sul:"sůl oxokyseliny",
            ox:"oxid halogenu", int:"interhalogen", poly:"polyhalogenid",
            vzp:"sloučenina vzácného plynu", org:"organohalogen"};

/* --- CHLORALKALICKÁ ELEKTROLÝZA --------------------------------- */
var CHLA = [
 {id:"amal", nm:"amalgámový proces", rok:"od 1892 · v EU konec 2017",
  U:4.3, kWh:3251, naoh:"50 %, velmi čistý (bez chloridů)",
  kat:"rtuťová katoda: Na⁺ + e⁻ → Na (rozpouští se ve rtuti jako amalgám)",
  krok:"rozklad amalgámu v druhé nádobě: 2 Na + 2 H₂O → 2 NaOH + H₂",
  plus:"nejčistší louh, není třeba odpařovat",
  minus:"rtuť v provozu i v odpadech; nejvyšší spotřeba elektřiny z celé trojice",
  proc:"Na rtuti má vylučování vodíku obrovské přepětí (kolem 1,3 V), takže se místo vodíku vyloučí sodík — jinak by to nešlo, protože E°(Na⁺/Na) = −2,71 V."},
 {id:"diaf", nm:"diafragmový proces", rok:"od 1890 · dobíhá",
  U:3.5, kWh:2646, naoh:"11 %, znečištěný chloridem sodným",
  kat:"ocelová katoda: 2 H₂O + 2 e⁻ → H₂ + 2 OH⁻",
  krok:"porézní přepážka (dříve azbestová, dnes polymerní) propouští roztok, ale brání zpětnému míšení",
  plus:"nízké napětí, jednoduchá konstrukce, snese méně čistou solanku",
  minus:"louh se musí odpařit a odsolit — to spotřebuje páru navíc; azbest byl zdravotní problém",
  proc:"Diafragma jen zpomaluje míšení, nezastaví ho. Proto louh vždy obsahuje sůl."},
 {id:"memb", nm:"membránový proces", rok:"od 70. let · standard",
  U:3.1, kWh:2344, naoh:"32–35 %, velmi čistý",
  kat:"niklová katoda: 2 H₂O + 2 e⁻ → H₂ + 2 OH⁻",
  krok:"perfluorovaná iontoměničová membrána propouští jen kationty Na⁺, anionty zastaví",
  plus:"nejnižší spotřeba energie, čistý louh, žádná rtuť ani azbest",
  minus:"membrána je drahá a vyžaduje velmi čistou solanku",
  proc:"Membrána nese záporně nabité sulfonové skupiny, které odpuzují Cl⁻ i OH⁻ a propustí jen Na⁺. Tím se prostory oddělí a zároveň se uzavře obvod."}
];

/* --- LÁTKY NIČÍCÍ OZON ------------------------------------------ */
var ODS = [
 {id:"cfc12", f:"CCl₂F₂", nm:"freon 12 (CFC-12)", cl:2, br:0, odp:1.0, zivot:102,
  n:"Klasické chladivo z ledniček a autoklimatizací. V troposféře je netečný, a proto se dostane až do stratosféry — a tam ho UV záření rozštěpí."},
 {id:"cfc11", f:"CCl₃F", nm:"freon 11 (CFC-11)", cl:3, br:0, odp:1.0, zivot:52,
  n:"Nadouvadlo pěnových izolací. Referenční látka, podle níž se počítá ozonový potenciál ODP = 1."},
 {id:"h1301", f:"CBrF₃", nm:"halon 1301", cl:0, br:1, odp:10.0, zivot:72,
  n:"Hasivo do serveroven a letadel. Brom ničí ozon zhruba padesátkrát účinněji než chlor, proto má tak vysoký ozonový potenciál."},
 {id:"hcfc22", f:"CHClF₂", nm:"HCFC-22", cl:1, br:0, odp:0.055, zivot:11.9,
  n:"Přechodná náhrada. Vazba C—H umožní rozklad už v troposféře, takže do stratosféry dorazí jen zlomek."},
 {id:"hfc134", f:"CH₂FCF₃", nm:"HFC-134a", cl:0, br:0, odp:0, zivot:14,
  n:"Bez chloru a bromu — ozon neničí vůbec. Zato je to skleníkový plyn s GWP 1430, a proto ho omezuje Kigalský dodatek z roku 2016."},
 {id:"hfo1234", f:"CF₃CF=CH₂", nm:"HFO-1234yf", cl:0, br:0, odp:0, zivot:0.03,
  n:"Dnešní chladivo do klimatizací aut. Dvojná vazba se v atmosféře rozpadne během několika dní, GWP je pod 1."}
];

/* --- POMOCNÉ VÝPOČTY -------------------------------------------- */
var FCONST = 96485;      /* C·mol⁻¹ */
var NERNST = 0.0592;     /* V, RT·ln10/F při 25 °C */
var M_CL2 = 70.90, M_NAOH = 40.00, M_H2 = 2.016, M_F2 = 38.00, M_BR2 = 159.81, M_I2 = 253.81;
function kelvin(c){ return c + 273.15; }
function celsia(k){ return k - 273.15; }
