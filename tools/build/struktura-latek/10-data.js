/* ============================================================
   T1 · DATA — VSEPR, látky, mřížky, vodivost, rozpustnost
   ============================================================ */

/* Typy AXnEm podle VSEPR. Souřadnice ligandů a volných párů jsou
   2D projekce v jednotkovém čtverci; st: p = v rovině, w = klín
   (k pozorovateli), d = čárkovaně (od pozorovatele). */
var VSEPR=[
 {id:"AX2",  n:2, e:0, lab:"AX₂",   name:"lineární", eg:"lineární", ideal:"180°", real:"180°", hyb:"sp", polar:false,
  ex:[["BeCl₂","180°"],["CO₂","180°"],["HCN","180°"],["C₂H₂ (každý C)","180°"]],
  geo:[{k:"X",x:-1,y:0,st:"p"},{k:"X",x:1,y:0,st:"p"}],
  note:"Dvě domény se odpuzují nejméně, když leží na opačných stranách — 180°. Násobná vazba (C=O, C≡N) se počítá jako jediná doména."},
 {id:"AX3",  n:3, e:0, lab:"AX₃",   name:"trigonálně planární", eg:"trigonálně planární", ideal:"120°", real:"120°", hyb:"sp²", polar:false,
  ex:[["BF₃","120°"],["SO₃","120°"],["NO₃⁻","120°"],["CO₃²⁻","120°"]],
  geo:[{k:"X",x:0,y:-1,st:"p"},{k:"X",x:-0.87,y:0.5,st:"p"},{k:"X",x:0.87,y:0.5,st:"p"}],
  note:"Tři domény = rovnostranný trojúhelník v jedné rovině. Molekula je plochá; bor v BF₃ má jen šest valenčních elektronů (elektronový deficit)."},
 {id:"AX2E", n:3, e:1, lab:"AX₂E",  name:"lomený (V-tvar)", eg:"trigonálně planární", ideal:"120°", real:"119° (SO₂), 117° (O₃)", hyb:"sp²", polar:true,
  ex:[["SO₂","119°"],["O₃","117°"],["NO₂⁻","115°"],["SnCl₂","≈ 95°"]],
  geo:[{k:"E",x:0,y:-1},{k:"X",x:-0.87,y:0.5,st:"p"},{k:"X",x:0.87,y:0.5,st:"p"}],
  note:"Elektronové uspořádání je trojúhelník, ale jeden vrchol obsadil volný pár — tvar molekuly popisujeme jen podle atomů, proto „lomený“. Volný pár zabírá víc místa a stlačí úhel pod 120°."},
 {id:"AX4",  n:4, e:0, lab:"AX₄",   name:"tetraedrický", eg:"tetraedrický", ideal:"109,5°", real:"109,5°", hyb:"sp³", polar:false,
  ex:[["CH₄","109,5°"],["NH₄⁺","109,5°"],["SO₄²⁻","109,5°"],["CCl₄","109,5°"],["SiO₂ (Si)","109,5°"]],
  geo:[{k:"X",x:0,y:-1,st:"p"},{k:"X",x:-0.85,y:0.5,st:"p"},{k:"X",x:0.62,y:0.62,st:"w"},{k:"X",x:0.82,y:0.12,st:"d"}],
  note:"Čtyři domény se do roviny nevejdou — nejdál od sebe jsou ve vrcholech tetraedru (pravidelného čtyřstěnu), úhel 109,5°. Nejdůležitější tvar celé organické chemie."},
 {id:"AX3E", n:4, e:1, lab:"AX₃E",  name:"trigonálně pyramidální", eg:"tetraedrický", ideal:"109,5°", real:"107° (NH₃), 100° (PCl₃), ≈ 113° (H₃O⁺)", hyb:"sp³", polar:true,
  ex:[["NH₃","107°"],["H₃O⁺","≈ 113°"],["PCl₃","100°"],["PH₃","93,5°"],["SO₃²⁻","106°"]],
  geo:[{k:"E",x:0,y:-1},{k:"X",x:-0.85,y:0.5,st:"p"},{k:"X",x:0.62,y:0.62,st:"w"},{k:"X",x:0.82,y:0.12,st:"d"}],
  note:"Tetraedr s jedním vrcholem obsazeným volným párem. Volný pár tlačí vazby k sobě: u amoniaku 107° místo 109,5°. U PCl₃ je efekt větší (100°), protože vazebné páry jsou dál od jádra fosforu."},
 {id:"AX2E2",n:4, e:2, lab:"AX₂E₂", name:"lomený (V-tvar)", eg:"tetraedrický", ideal:"109,5°", real:"104,5° (H₂O), 92° (H₂S)", hyb:"sp³", polar:true,
  ex:[["H₂O","104,5°"],["H₂S","92°"],["OF₂","103°"],["NH₂⁻","≈ 104°"],["ClO₂⁻","111°"]],
  geo:[{k:"E",x:-0.6,y:-0.8},{k:"E",x:0.6,y:-0.8},{k:"X",x:-0.8,y:0.55,st:"p"},{k:"X",x:0.8,y:0.55,st:"p"}],
  note:"Dva volné páry stlačí úhel ještě víc: voda 104,5°. Právě lomený tvar dělá z vody polární molekulu — kdyby byla lineární, dipóly vazeb O–H by se vyrušily."},
 {id:"AX5",  n:5, e:0, lab:"AX₅",   name:"trigonálně bipyramidální", eg:"trigonálně bipyramidální", ideal:"90° a 120°", real:"90° / 120°", hyb:"sp³d", polar:false,
  ex:[["PCl₅","90°/120°"],["PF₅","90°/120°"],["AsF₅","90°/120°"]],
  geo:[{k:"X",x:0,y:-1,st:"p"},{k:"X",x:0,y:1,st:"p"},{k:"X",x:-0.95,y:0.15,st:"p"},{k:"X",x:0.7,y:0.5,st:"w"},{k:"X",x:0.75,y:-0.3,st:"d"}],
  note:"Pět domén: tři v rovníkové rovině (120°) a dvě osové (kolmo, 90°). Dvě různé polohy — proto se u PCl₅ liší i délky vazeb (osové jsou delší)."},
 {id:"AX4E", n:5, e:1, lab:"AX₄E",  name:"houpačka (seesaw)", eg:"trigonálně bipyramidální", ideal:"90° a 120°", real:"101,6° a 173° (SF₄)", hyb:"sp³d", polar:true,
  ex:[["SF₄","102°/173°"],["SeF₄","≈ 100°/170°"]],
  geo:[{k:"E",x:-0.95,y:0.15},{k:"X",x:0,y:-1,st:"p"},{k:"X",x:0,y:1,st:"p"},{k:"X",x:0.7,y:0.5,st:"w"},{k:"X",x:0.75,y:-0.3,st:"d"}],
  note:"Volný pár si vždy vybere rovníkovou polohu (má tam víc místa — jen dva sousedy pod 90°). Zbylé čtyři atomy tvoří „houpačku“."},
 {id:"AX3E2",n:5, e:2, lab:"AX₃E₂", name:"T-tvar", eg:"trigonálně bipyramidální", ideal:"90°", real:"87,5° (ClF₃)", hyb:"sp³d", polar:true,
  ex:[["ClF₃","87,5°"],["BrF₃","86°"]],
  geo:[{k:"E",x:0.7,y:0.5},{k:"E",x:0.75,y:-0.3},{k:"X",x:0,y:-1,st:"p"},{k:"X",x:0,y:1,st:"p"},{k:"X",x:-0.95,y:0.15,st:"p"}],
  note:"Dva volné páry obsadí dvě rovníkové polohy, atomy zbydou ve tvaru písmene T. Úhel je mírně pod 90°, protože volné páry tlačí osové atomy k sobě."},
 {id:"AX2E3",n:5, e:3, lab:"AX₂E₃", name:"lineární", eg:"trigonálně bipyramidální", ideal:"180°", real:"180°", hyb:"sp³d", polar:false,
  ex:[["XeF₂","180°"],["I₃⁻","180°"],["ICl₂⁻","180°"]],
  geo:[{k:"E",x:-0.95,y:0.15},{k:"E",x:0.7,y:0.5},{k:"E",x:0.75,y:-0.3},{k:"X",x:0,y:-1,st:"p"},{k:"X",x:0,y:1,st:"p"}],
  note:"Tři volné páry v rovníku, dva atomy na ose — molekula je lineární, přestože xenon má kolem sebe pět domén. Typický chyták přijímaček: „XeF₂ je lomený“ — není."},
 {id:"AX6",  n:6, e:0, lab:"AX₆",   name:"oktaedrický", eg:"oktaedrický", ideal:"90°", real:"90°", hyb:"sp³d²", polar:false,
  ex:[["SF₆","90°"],["PF₆⁻","90°"],["[Fe(CN)₆]⁴⁻","90°"],["[Co(NH₃)₆]³⁺","90°"]],
  geo:[{k:"X",x:0,y:-1,st:"p"},{k:"X",x:0,y:1,st:"p"},{k:"X",x:-0.95,y:0,st:"p"},{k:"X",x:0.95,y:0,st:"p"},{k:"X",x:0.55,y:0.5,st:"w"},{k:"X",x:-0.55,y:-0.5,st:"d"}],
  note:"Šest domén = oktaedr (pravidelný osmistěn), všechny polohy rovnocenné, všechny úhly 90°. Tvar většiny komplexů přechodných kovů."},
 {id:"AX5E", n:6, e:1, lab:"AX₅E",  name:"čtvercově pyramidální", eg:"oktaedrický", ideal:"90°", real:"≈ 85° (BrF₅)", hyb:"sp³d²", polar:true,
  ex:[["BrF₅","85°"],["IF₅","≈ 82°"],["XeOF₄","≈ 91°"]],
  geo:[{k:"E",x:0,y:1},{k:"X",x:0,y:-1,st:"p"},{k:"X",x:-0.95,y:0,st:"p"},{k:"X",x:0.95,y:0,st:"p"},{k:"X",x:0.55,y:0.5,st:"w"},{k:"X",x:-0.55,y:-0.5,st:"d"}],
  note:"Oktaedr s jedním volným párem: čtyři atomy tvoří základnu, pátý špičku jehlanu. Volný pár tlačí základnu mírně nahoru, úhly pod 90°."},
 {id:"AX4E2",n:6, e:2, lab:"AX₄E₂", name:"čtvercově planární", eg:"oktaedrický", ideal:"90°", real:"90°", hyb:"sp³d²", polar:false,
  ex:[["XeF₄","90°"],["ICl₄⁻","90°"],["[PtCl₄]²⁻","90°"],["[Ni(CN)₄]²⁻","90°"]],
  geo:[{k:"E",x:0,y:-1},{k:"E",x:0,y:1},{k:"X",x:-0.95,y:0,st:"p"},{k:"X",x:0.95,y:0,st:"p"},{k:"X",x:0.55,y:0.5,st:"w"},{k:"X",x:-0.55,y:-0.5,st:"d"}],
  note:"Dva volné páry jdou proti sobě (trans), aby si nepřekážely — čtyři atomy zbydou v rovině čtverce. Molekula je proto symetrická a nepolární."}
];
function VS_(id){ for(var i=0;i<VSEPR.length;i++){ if(VSEPR[i].id===id) return VSEPR[i]; } return VSEPR[0]; }

/* ---- Tabulka látek: tvar / mřížka, hybridizace, polarita, b.t., b.v., rozpustnost, vodivost ---- */
/* g: mol = molekulová látka, ion = iontová, atom = atomová (kovalentní) mřížka, kov = kovová, amorf = amorfní
   tt/tv: °C (řetězec kvůli poznámkám), rozp: rozpustnost ve vodě, vod: vodivost roztoku / taveniny */
var SUBS=[
 {n:"voda",             f:"H₂O",       g:"mol",  tvar:"lomený (AX₂E₂)",           hyb:"sp³ (O)",   pol:"polární",    tt:"0",       tv:"100",       rozp:"—",                          vod:"čistá prakticky ne (5,5·10⁻⁶ S·m⁻¹)"},
 {n:"oxid uhličitý",    f:"CO₂",       g:"mol",  tvar:"lineární (AX₂)",           hyb:"sp (C)",    pol:"nepolární",  tt:"−56,6 (5,1 atm)", tv:"−78,5 (subl.)", rozp:"málo, 1,45 g/L (25 °C)",   vod:"slabý elektrolyt (H₂CO₃)"},
 {n:"amoniak",          f:"NH₃",       g:"mol",  tvar:"trig. pyramidální (AX₃E)", hyb:"sp³ (N)",   pol:"polární",    tt:"−77,7",   tv:"−33,3",     rozp:"výborně, ≈ 520 g/L (20 °C)", vod:"slabý elektrolyt"},
 {n:"methan",           f:"CH₄",       g:"mol",  tvar:"tetraedr (AX₄)",           hyb:"sp³ (C)",   pol:"nepolární",  tt:"−182,5",  tv:"−161,5",    rozp:"prakticky ne (0,02 g/L)",    vod:"ne"},
 {n:"chlorovodík",      f:"HCl",       g:"mol",  tvar:"lineární (dvouatomová)",   hyb:"—",         pol:"polární",    tt:"−114,2",  tv:"−85,1",     rozp:"výborně, ≈ 720 g/L",         vod:"silný elektrolyt (aq)"},
 {n:"fluorovodík",      f:"HF",        g:"mol",  tvar:"lineární (dvouatomová)",   hyb:"—",         pol:"polární",    tt:"−83,6",   tv:"19,5",      rozp:"neomezeně",                  vod:"slabý elektrolyt"},
 {n:"sulfan",           f:"H₂S",       g:"mol",  tvar:"lomený (AX₂E₂)",           hyb:"sp³ (S)",   pol:"slabě polární", tt:"−85,5", tv:"−60,3",     rozp:"≈ 4 g/L",                    vod:"slabý elektrolyt"},
 {n:"oxid siřičitý",    f:"SO₂",       g:"mol",  tvar:"lomený (AX₂E)",            hyb:"sp² (S)",   pol:"polární",    tt:"−75,5",   tv:"−10,0",     rozp:"≈ 94 g/L (25 °C)",           vod:"slabý elektrolyt"},
 {n:"fluorid boritý",   f:"BF₃",       g:"mol",  tvar:"trig. planární (AX₃)",     hyb:"sp² (B)",   pol:"nepolární",  tt:"−126,8",  tv:"−100,3",    rozp:"reaguje (hydrolýza)",        vod:"—"},
 {n:"chlorid berylnatý",f:"BeCl₂",     g:"mol",  tvar:"lineární (AX₂, plyn)",     hyb:"sp (Be)",   pol:"nepolární",  tt:"415",     tv:"482",       rozp:"reaguje (hydrolýza)",        vod:"—"},
 {n:"chlorid fosforečný",f:"PCl₅",     g:"mol",  tvar:"trig. bipyramidální (AX₅)",hyb:"sp³d (P)",  pol:"nepolární",  tt:"160,5 (subl.)", tv:"rozklad", rozp:"reaguje (hydrolýza)",    vod:"—"},
 {n:"fluorid sírový",   f:"SF₆",       g:"mol",  tvar:"oktaedr (AX₆)",            hyb:"sp³d² (S)", pol:"nepolární",  tt:"−50,8 (2,2 atm)", tv:"−63,8 (subl.)", rozp:"ne",               vod:"ne"},
 {n:"fluorid xenoničitý",f:"XeF₄",     g:"mol",  tvar:"čtvercově planární (AX₄E₂)",hyb:"sp³d² (Xe)",pol:"nepolární",  tt:"117 (subl.)", tv:"—",     rozp:"reaguje (hydrolýza)",        vod:"—"},
 {n:"tetrachlormethan", f:"CCl₄",      g:"mol",  tvar:"tetraedr (AX₄)",           hyb:"sp³ (C)",   pol:"nepolární",  tt:"−22,9",   tv:"76,7",      rozp:"málo, 0,8 g/L",              vod:"ne"},
 {n:"chloroform",       f:"CHCl₃",     g:"mol",  tvar:"tetraedr (deformovaný)",   hyb:"sp³ (C)",   pol:"polární",    tt:"−63,5",   tv:"61,2",      rozp:"málo, 8 g/L",                vod:"ne"},
 {n:"ethen",            f:"C₂H₄",      g:"mol",  tvar:"planární (každý C AX₃)",   hyb:"sp² (C)",   pol:"nepolární",  tt:"−169,2",  tv:"−103,7",    rozp:"ne",                         vod:"ne"},
 {n:"ethyn",            f:"C₂H₂",      g:"mol",  tvar:"lineární (každý C AX₂)",   hyb:"sp (C)",    pol:"nepolární",  tt:"−80,8",   tv:"−84 (subl.)", rozp:"málo, 1,2 g/L",            vod:"ne"},
 {n:"ethan",            f:"C₂H₆",      g:"mol",  tvar:"tetraedr (každý C AX₄)",   hyb:"sp³ (C)",   pol:"nepolární",  tt:"−182,8",  tv:"−88,6",     rozp:"ne",                         vod:"ne"},
 {n:"methanol",         f:"CH₃OH",     g:"mol",  tvar:"lomený u O (AX₂E₂)",       hyb:"sp³ (C, O)",pol:"polární",    tt:"−97,6",   tv:"64,7",      rozp:"neomezeně",                  vod:"neelektrolyt"},
 {n:"ethanol",          f:"C₂H₅OH",    g:"mol",  tvar:"lomený u O (AX₂E₂)",       hyb:"sp³ (C, O)",pol:"polární",    tt:"−114,1",  tv:"78,3",      rozp:"neomezeně",                  vod:"neelektrolyt"},
 {n:"dimethylether",    f:"CH₃OCH₃",   g:"mol",  tvar:"lomený u O (AX₂E₂)",       hyb:"sp³ (C, O)",pol:"slabě polární", tt:"−141,5",tv:"−24,8",    rozp:"≈ 70 g/L",                   vod:"neelektrolyt"},
 {n:"kyselina octová",  f:"CH₃COOH",   g:"mol",  tvar:"planární u COOH (AX₃)",    hyb:"sp² (C=O)", pol:"polární",    tt:"16,6",    tv:"117,9",     rozp:"neomezeně",                  vod:"slabý elektrolyt"},
 {n:"hexan",            f:"C₆H₁₄",     g:"mol",  tvar:"řetězec (každý C AX₄)",    hyb:"sp³ (C)",   pol:"nepolární",  tt:"−95,3",   tv:"68,7",      rozp:"ne (0,01 g/L)",              vod:"ne"},
 {n:"benzen",           f:"C₆H₆",      g:"mol",  tvar:"planární šestiúhelník",    hyb:"sp² (C)",   pol:"nepolární",  tt:"5,5",     tv:"80,1",      rozp:"málo, 1,8 g/L",              vod:"ne"},
 {n:"naftalen",         f:"C₁₀H₈",     g:"mol",  tvar:"planární (dva kruhy)",     hyb:"sp² (C)",   pol:"nepolární",  tt:"80,3",    tv:"218",       rozp:"ne (0,03 g/L)",              vod:"ne"},
 {n:"jod",              f:"I₂",        g:"mol",  tvar:"lineární (dvouatomová)",   hyb:"—",         pol:"nepolární",  tt:"113,7",   tv:"184,4",     rozp:"málo, 0,33 g/L",             vod:"ne"},
 {n:"sacharóza",        f:"C₁₂H₂₂O₁₁", g:"mol",  tvar:"dva kruhy, 8 skupin OH",   hyb:"sp³ (C)",   pol:"polární",    tt:"186 (rozkl.)", tv:"—",    rozp:"výborně, ≈ 2000 g/L",        vod:"neelektrolyt"},
 {n:"glukóza",          f:"C₆H₁₂O₆",   g:"mol",  tvar:"kruh, 5 skupin OH",        hyb:"sp³ (C)",   pol:"polární",    tt:"146",     tv:"rozklad",   rozp:"výborně, ≈ 910 g/L",         vod:"neelektrolyt"},
 {n:"kyslík",           f:"O₂",        g:"mol",  tvar:"lineární (dvouatomová)",   hyb:"—",         pol:"nepolární",  tt:"−218,8",  tv:"−183,0",    rozp:"8,3 mg/L (25 °C, vzduch)",   vod:"ne"},
 {n:"dusík",            f:"N₂",        g:"mol",  tvar:"lineární (dvouatomová)",   hyb:"—",         pol:"nepolární",  tt:"−210,0",  tv:"−195,8",    rozp:"≈ 18 mg/L (20 °C)",          vod:"ne"},
 {n:"chlorid sodný",    f:"NaCl",      g:"ion",  tvar:"iontová, kubická (6 : 6)", hyb:"—",         pol:"iontová",    tt:"801",     tv:"1465",      rozp:"360 g/L (25 °C)",            vod:"roztok i tavenina vodí"},
 {n:"chlorid cesný",    f:"CsCl",      g:"ion",  tvar:"iontová, kubická (8 : 8)", hyb:"—",         pol:"iontová",    tt:"645",     tv:"1297",      rozp:"1865 g/L",                   vod:"roztok i tavenina vodí"},
 {n:"oxid hořečnatý",   f:"MgO",       g:"ion",  tvar:"iontová, kubická (6 : 6)", hyb:"—",         pol:"iontová",    tt:"2852",    tv:"3600",      rozp:"ne (0,09 g/L)",              vod:"tavenina vodí"},
 {n:"hydroxid sodný",   f:"NaOH",      g:"ion",  tvar:"iontová",                  hyb:"—",         pol:"iontová",    tt:"323",     tv:"1388",      rozp:"≈ 1100 g/L, exotermicky",    vod:"silný elektrolyt"},
 {n:"dusičnan draselný",f:"KNO₃",      g:"ion",  tvar:"iontová (NO₃⁻ AX₃)",       hyb:"sp² (N)",   pol:"iontová",    tt:"334",     tv:"rozklad 400", rozp:"316 g/L (20 °C), roste s T", vod:"silný elektrolyt"},
 {n:"manganistan draselný",f:"KMnO₄",  g:"ion",  tvar:"iontová (MnO₄⁻ AX₄)",      hyb:"—",         pol:"iontová",    tt:"rozklad 240", tv:"—",     rozp:"64 g/L (20 °C)",             vod:"silný elektrolyt"},
 {n:"dusičnan amonný",  f:"NH₄NO₃",    g:"ion",  tvar:"iontová (NH₄⁺ AX₄)",       hyb:"sp³ (N)",   pol:"iontová",    tt:"169,6",   tv:"rozklad 210", rozp:"≈ 1500 g/L, endotermicky", vod:"silný elektrolyt"},
 {n:"diamant",          f:"C (diamant)",g:"atom", tvar:"atomová, prostorová síť", hyb:"sp³",       pol:"—",          tt:"> 3500 (subl.)", tv:"—",   rozp:"ne",                         vod:"izolant"},
 {n:"grafit",           f:"C (grafit)", g:"atom", tvar:"atomová, vrstevnatá",     hyb:"sp²",       pol:"—",          tt:"≈ 3650 (subl.)", tv:"—",   rozp:"ne",                         vod:"vodí (π elektrony ve vrstvě)"},
 {n:"křemen",           f:"SiO₂",      g:"atom", tvar:"atomová, prostorová síť",  hyb:"sp³ (Si)",  pol:"—",          tt:"≈ 1710",  tv:"≈ 2950",    rozp:"ne",                         vod:"izolant"},
 {n:"křemík",           f:"Si",        g:"atom", tvar:"atomová (typ diamantu)",   hyb:"sp³",       pol:"—",          tt:"1414",    tv:"3265",      rozp:"ne",                         vod:"polovodič"},
 {n:"měď",              f:"Cu",        g:"kov",  tvar:"kovová, kubická plošně centrovaná", hyb:"—", pol:"—",         tt:"1085",    tv:"2560",      rozp:"ne",                         vod:"vodič (6·10⁷ S·m⁻¹)"},
 {n:"železo",           f:"Fe",        g:"kov",  tvar:"kovová, kubická prostorově centrovaná", hyb:"—", pol:"—",     tt:"1538",    tv:"2861",      rozp:"ne",                         vod:"vodič"},
 {n:"wolfram",          f:"W",         g:"kov",  tvar:"kovová, kubická prostorově centrovaná", hyb:"—", pol:"—",     tt:"3422",    tv:"5555",      rozp:"ne",                         vod:"vodič"},
 {n:"rtuť",             f:"Hg",        g:"kov",  tvar:"kovová (kapalná)",         hyb:"—",         pol:"—",          tt:"−38,8",   tv:"356,7",     rozp:"ne",                         vod:"vodič"},
 {n:"sklo (křemenné)",  f:"SiO₂ (amorfní)", g:"amorf", tvar:"amorfní síť",        hyb:"sp³ (Si)",  pol:"—",          tt:"měkne ≈ 1200–1600", tv:"—", rozp:"ne",                       vod:"izolant"},
 {n:"parafin (vosk)",   f:"C₂₀–C₄₀H₄₂–₈₂", g:"amorf", tvar:"molekulová / amorfní", hyb:"sp³ (C)", pol:"nepolární",  tt:"měkne 50–70", tv:"—",     rozp:"ne",                         vod:"ne"}
];
function SUB_(f){ for(var i=0;i<SUBS.length;i++){ if(SUBS[i].f===f) return SUBS[i]; } return null; }

/* ---- Křivky rozpustnosti (g bezvodé látky na 100 g vody), 0–100 °C po 10 °C ---- */
var SOLCURVES=[
 {n:"KNO₃",  c:"var(--cat1)", v:[13.3,20.9,31.6,45.8,63.9,85.5,110,138,169,202,246]},
 {n:"NaNO₃", c:"var(--cat2)", v:[73,80,87.6,94.9,102,114,122,133,148,163,180]},
 {n:"KCl",   c:"var(--cat3)", v:[28.0,31.2,34.2,37.2,40.1,42.6,45.8,48.5,51.3,53.9,56.3]},
 {n:"NaCl",  c:"var(--cat4)", v:[35.7,35.8,35.9,36.1,36.4,36.7,37.1,37.5,38.0,38.5,39.2]}
];
/* rozpuštěný kyslík ze vzduchu (1 atm), mg/L — orientační */
var O2SOL=[14.6,11.3,9.1,7.6,6.4,5.5,4.7,3.9,2.9,1.6,0];
function solAt(arr,T){ var i=Math.floor(T/10); if(i>=10) return arr[10]; var f=(T-i*10)/10; return arr[i]+(arr[i+1]-arr[i])*f; }

/* ---- Rozpouštěcí tepla: mřížková (rozpad krystalu, +) a hydratační (−), kJ·mol⁻¹, orientační ---- */
var HYDSALTS=[
 {f:"NaCl",   latt:787,  hyd:-783,  sol:3.9,   kind:"slabě endotermické", story:"Mřížková a hydratační energie jsou prakticky stejně velké. Roztok se ochladí jen o zlomek stupně — rozpouštění pohání hlavně nárůst entropie."},
 {f:"NaOH",   latt:900,  hyd:-944,  sol:-44.5, kind:"silně exotermické",  story:"Malý ion OH⁻ i Na⁺ se hydratují velmi ochotně. Roztok se výrazně zahřeje — proto se hydroxid sype do vody po částech a nikdy naopak."},
 {f:"NH₄NO₃", latt:661,  hyd:-635,  sol:25.7,  kind:"endotermické",       story:"Hydratace velkých iontů NH₄⁺ a NO₃⁻ nestačí zaplatit rozpad mřížky. Roztok se ochladí — princip chladicích sáčků první pomoci."},
 {f:"KNO₃",   latt:685,  hyd:-650,  sol:34.9,  kind:"endotermické",       story:"Ještě víc endotermické než NH₄NO₃. Proto rozpustnost KNO₃ s teplotou tak prudce roste (Le Chatelier: teplo je „reaktant“)."},
 {f:"KCl",    latt:717,  hyd:-700,  sol:17.2,  kind:"endotermické",       story:"Ion K⁺ je větší než Na⁺, hydratuje se slaběji — rozpouštění KCl chladí, zatímco NaCl skoro ne."},
 {f:"CaCl₂",  latt:2258, hyd:-2339, sol:-81.3, kind:"silně exotermické",  story:"Dvojnásobný náboj Ca²⁺ znamená obrovskou hydratační energii. Bezvodý chlorid vápenatý se používá v samoohřívacích obalech."},
 {f:"LiCl",   latt:853,  hyd:-890,  sol:-37,   kind:"exotermické",        story:"Nejmenší kation Li⁺ má největší hustotu náboje a hydratuje se nejsilněji z alkalických kovů."}
];

/* ---- Vodivost podle struktury: nosiče náboje, řádová vodivost (S·m⁻¹) ---- */
var COND=[
 {id:"cu",   n:"měď Cu (kov)",                 car:"volné elektrony (elektronový plyn)", sig:5.96e7,  cls:"vodič 1. třídy",       el:"—",
  why:"Valenční elektrony kovu nepatří žádnému konkrétnímu atomu — tvoří společný „elektronový plyn“ kolem kationtů v mřížce. V elektrickém poli se dají do pohybu okamžitě. Vodivost s teplotou <b>klesá</b> (kmitající kationty elektronům překážejí)."},
 {id:"graf", n:"grafit C",                     car:"delokalizované π elektrony ve vrstvě", sig:3e5,   cls:"vodič 1. třídy",       el:"—",
  why:"Každý uhlík v grafitu je sp², tři σ vazby ve vrstvě a jeden elektron v p orbitalu kolmém na vrstvu. Tyto p orbitaly se překryjí v jeden obrovský π systém, kde se elektrony volně pohybují — <b>ale jen podél vrstvy</b>. Kolmo na vrstvy grafit vede asi tisíckrát hůř."},
 {id:"dia",  n:"diamant C",                    car:"žádné volné nosiče",                sig:1e-12,   cls:"izolant",              el:"—",
  why:"Každý uhlík je sp³ a všechny čtyři valenční elektrony sedí v lokalizovaných σ vazbách. Žádný elektron není volný, žádný ion se nepohybuje. Stejné atomy jako v grafitu — o vodivosti rozhoduje <b>struktura</b>, ne prvek."},
 {id:"si",   n:"křemík Si (polovodič)",        car:"elektrony a díry (málo, tepelně uvolněné)", sig:1e-3, cls:"polovodič",         el:"—",
  why:"Stejná mřížka jako diamant, ale vazby Si–Si jsou slabší (222 kJ/mol) a zakázaný pás úzký (1,1 eV). Teplo uvolní pár elektronů do vodivostního pásu — vodivost s teplotou <b>roste</b> (opak kovů) a příměsemi (B, P) se dá zvýšit o mnoho řádů."},
 {id:"nacls",n:"NaCl pevný (krystal)",         car:"žádné — ionty jsou vázané v mřížce", sig:1e-13,  cls:"izolant",              el:"elektrolyt, ale jen po roztavení/rozpuštění",
  why:"Ionty Na⁺ a Cl⁻ v krystalu jsou, ale <b>nemohou se pohybovat</b> — každý je držen šesti sousedy s opačným nábojem. Bez pohyblivých nosičů náboje není proud. Pevná sůl je proto izolant."},
 {id:"naclm",n:"NaCl tavenina (> 801 °C)",     car:"volné ionty Na⁺ a Cl⁻",             sig:3.5e2,   cls:"vodič 2. třídy",       el:"silný elektrolyt",
  why:"Po roztavení se mřížka rozpadne a ionty se mohou pohybovat: kationty ke katodě, anionty k anodě. Proud vedou <b>ionty</b>, ne elektrony — a na elektrodách přitom probíhá chemická přeměna (elektrolýza taveniny NaCl dává sodík a chlor)."},
 {id:"nacla",n:"NaCl roztok 1 mol·L⁻¹",        car:"hydratované ionty Na⁺(aq), Cl⁻(aq)", sig:8.6,    cls:"vodič 2. třídy",       el:"silný elektrolyt",
  why:"Voda rozebrala krystal na hydratované ionty, které se v poli pohybují — pomaleji než v tavenině, protože táhnou s sebou hydratační obal. Vodivost roste s koncentrací iontů a s teplotou."},
 {id:"sugar",n:"roztok sacharózy 1 mol·L⁻¹",   car:"žádné ionty — jen neutrální molekuly", sig:1e-5,  cls:"prakticky nevodivý",   el:"neelektrolyt",
  why:"Sacharóza se ve vodě rozpouští výborně (vodíkové můstky s osmi skupinami OH), ale rozpadá se jen na <b>molekuly</b>, ne na ionty. Rozpustnost a vodivost jsou dvě různé věci."},
 {id:"hclg", n:"HCl plynný",                   car:"žádné — polární molekuly",          sig:1e-15,   cls:"izolant",              el:"potenciální elektrolyt (ionizuje až ve vodě)",
  why:"Chlorovodík je molekulová látka s kovalentní polární vazbou. V plynu žádné ionty nejsou. Ionty vzniknou až reakcí s vodou: HCl + H₂O → H₃O⁺ + Cl⁻ — tomu se říká <b>ionizace</b> (na rozdíl od disociace iontové látky)."},
 {id:"hcla", n:"HCl roztok 1 mol·L⁻¹",         car:"ionty H₃O⁺ a Cl⁻",                  sig:33,      cls:"vodič 2. třídy",       el:"silný elektrolyt",
  why:"Ve vodě je HCl prakticky úplně ionizován. Kyselina chlorovodíková vede lépe než NaCl stejné koncentrace, protože H₃O⁺ „předává“ proton po vodíkových můstcích (Grotthussův mechanismus) — je nejpohyblivější ion vůbec."},
 {id:"h2o",  n:"čistá voda",                   car:"stopy H₃O⁺ a OH⁻ (10⁻⁷ mol·L⁻¹)",   sig:5.5e-6,  cls:"velmi slabý vodič",    el:"velmi slabý elektrolyt",
  why:"Autoionizace vody dá jen 10⁻⁷ mol·L⁻¹ iontů. Vodivost je proto asi milionkrát menší než u roztoku soli. Že „voda vede proud“, platí pro vodu <b>s rozpuštěnými solemi</b> — z kohoutku, mořskou; destilovaná vede mizerně."},
 {id:"acoh", n:"kyselina octová 0,1 mol·L⁻¹",  car:"ionty H₃O⁺ a CH₃COO⁻ (jen ≈ 1,3 % molekul)", sig:5e-2, cls:"slabý vodič",     el:"slabý elektrolyt",
  why:"Slabá kyselina ionizuje jen z malé části — v 0,1 M roztoku je asi 1,3 % molekul rozpadlých na ionty, zbytek jsou neutrální molekuly. Proto vede stokrát hůř než HCl stejné koncentrace."},
 {id:"sea",  n:"mořská voda",                  car:"ionty Na⁺, Cl⁻, Mg²⁺, SO₄²⁻…",      sig:5,       cls:"vodič 2. třídy",       el:"směs silných elektrolytů",
  why:"Asi 35 g solí v litru, převážně NaCl. Vodivost je řádově stejná jako u laboratorního roztoku soli — a milionkrát větší než u destilované vody."}
];
function COND_(id){ for(var i=0;i<COND.length;i++){ if(COND[i].id===id) return COND[i]; } return COND[0]; }

/* ---- Typy krystalových mřížek ---- */
var LATT={
 ion:{name:"iontová mřížka", part:"kationty a anionty", force:"elektrostatické (iontová vazba), nesměrové, velmi silné",
      subs:[
       {f:"NaCl", n:"chlorid sodný", cell:"kubická plošně centrovaná, koord. číslo 6 : 6", tt:"801 °C", tv:"1465 °C", hard:"tvrdý, ale křehký", cond:"pevný ne; tavenina a roztok ano", sol:"rozpustný v polárních rozpouštědlech (voda)"},
       {f:"CsCl", n:"chlorid cesný", cell:"kubická prostorově centrovaná, koord. číslo 8 : 8", tt:"645 °C", tv:"1297 °C", hard:"tvrdý, křehký", cond:"pevný ne; tavenina a roztok ano", sol:"rozpustný ve vodě (velmi)"},
       {f:"MgO", n:"oxid hořečnatý", cell:"typ NaCl, koord. číslo 6 : 6, náboje 2+/2−", tt:"2852 °C", tv:"3600 °C", hard:"velmi tvrdý (žáruvzdorný)", cond:"pevný ne; tavenina ano", sol:"prakticky nerozpustný (silná mřížka)"}
      ],
      why:"Každý ion drží všechny sousedy s opačným nábojem — síly jsou silné a působí do všech směrů. Proto vysoké teploty tání, tvrdost, a zároveň <b>křehkost</b>: posunete-li vrstvu o jednu polohu, dostanou se stejné náboje proti sobě a krystal praskne."},
 atom:{name:"atomová (kovalentní) mřížka", part:"atomy spojené kovalentními vazbami do nekonečné sítě", force:"kovalentní vazby (směrové, velmi silné)",
      subs:[
       {f:"C (diamant)", n:"diamant", cell:"kubická, každý C sp³, 4 sousedi, úhel 109,5°", tt:"> 3500 °C (subl.)", tv:"—", hard:"nejtvrdší přírodní látka (10 Mohs)", cond:"izolant", sol:"nerozpustný v ničem"},
       {f:"C (grafit)", n:"grafit", cell:"hexagonální, vrstvy šestiúhelníků sp², mezi vrstvami jen slabé síly", tt:"≈ 3650 °C (subl.)", tv:"—", hard:"měkký, otírá se (tuha)", cond:"vodí podél vrstev (π elektrony)", sol:"nerozpustný"},
       {f:"SiO₂", n:"křemen", cell:"trigonální, tetraedry SiO₄ spojené rohy, Si sp³", tt:"≈ 1710 °C", tv:"≈ 2950 °C", hard:"tvrdý (7 Mohs)", cond:"izolant", sol:"nerozpustný (rozpouští ho jen HF)"}
      ],
      why:"Celý krystal je jedna obrovská molekula. Roztavit ho znamená trhat kovalentní vazby (C–C 348 kJ/mol, Si–O 452 kJ/mol) — proto extrémní teploty tání a tvrdost. Grafit je výjimka: vazby jsou jen ve vrstvách, mezi nimi drží slabé disperzní síly, a vrstvy po sobě kloužou."},
 mol:{name:"molekulová mřížka", part:"celé molekuly (nebo atomy vzácných plynů)", force:"mezimolekulové síly: disperzní, dipól–dipól, vodíkové můstky (slabé)",
      subs:[
       {f:"H₂O (led)", n:"led", cell:"hexagonální, každá molekula 4 vodíkové můstky, otevřená struktura", tt:"0 °C", tv:"100 °C", hard:"měkký, křehký", cond:"ne (prakticky)", sol:"—"},
       {f:"I₂", n:"jod", cell:"rombická, molekuly I₂ držené disperzními silami", tt:"113,7 °C (snadno sublimuje)", tv:"184,4 °C", hard:"měkký, křehký, lesklý", cond:"ne", sol:"v nepolárních rozpouštědlech (hexan, CCl₄)"},
       {f:"CO₂ (suchý led)", n:"suchý led", cell:"kubická, lineární molekuly, disperzní síly", tt:"−78,5 °C (sublimuje)", tv:"—", hard:"měkký", cond:"ne", sol:"málo ve vodě, dobře v nepolárních"},
       {f:"C₁₀H₈", n:"naftalen", cell:"monoklinická, ploché molekuly, disperzní síly", tt:"80,3 °C", tv:"218 °C", hard:"měkký, sublimuje (kuličky proti molům)", cond:"ne", sol:"v nepolárních rozpouštědlech"}
      ],
      why:"Uvnitř molekul jsou vazby pevné, ale <b>mezi</b> molekulami drží jen slabé síly — a právě ty je nutné překonat při tání a varu. Proto nízké teploty tání, měkkost, sublimace a nulová vodivost (žádné ionty ani volné elektrony)."},
 kov:{name:"kovová mřížka", part:"kationty kovu v „moři“ delokalizovaných elektronů", force:"kovová vazba (nesměrová, silná až velmi silná)",
      subs:[
       {f:"Cu", n:"měď", cell:"kubická plošně centrovaná (nejtěsnější uspořádání, koord. číslo 12)", tt:"1085 °C", tv:"2560 °C", hard:"měkká, tažná, kujná", cond:"výborný vodič (6·10⁷ S·m⁻¹)", sol:"nerozpustná (rozpouští se jen reakcí s HNO₃)"},
       {f:"Fe", n:"železo", cell:"kubická prostorově centrovaná (koord. číslo 8), nad 912 °C plošně centrovaná", tt:"1538 °C", tv:"2861 °C", hard:"tvrdé, kujné za tepla", cond:"vodič", sol:"nerozpustné (reaguje s kyselinami)"},
       {f:"W", n:"wolfram", cell:"kubická prostorově centrovaná", tt:"3422 °C (nejvyšší z kovů)", tv:"5555 °C", hard:"velmi tvrdý", cond:"vodič (vlákno žárovky)", sol:"nerozpustný"}
      ],
      why:"Elektronový plyn drží kationty pohromadě ze všech stran a snadno se posune — proto jsou kovy kujné a tažné (vrstvy kloužou bez prasknutí, na rozdíl od iontových krystalů), vodí proud i teplo a lesknou se. Pevnost vazby roste s počtem valenčních elektronů: Na 98 °C, Cu 1085 °C, W 3422 °C."}
};

/* ---- Hybridizace ---- */
var HYB=[
 {id:"sp",   lab:"sp",    n:2, ang:"180°",   shape:"lineární",             np:2, from:"1 s + 1 p", left:"2 p (nehybridizované, kolmé) → až 2 π vazby",
  mols:[{f:"BeCl₂",  sig:2, pi:0, d:"Be: 2s² → excitace 2s¹ 2p¹ → 2 sp orbitaly → 2 σ vazby Be–Cl, úhel 180°."},
        {f:"C₂H₂",   sig:3, pi:2, d:"Každý C: 2 sp orbitaly (σ C–H a σ C–C) + 2 kolmé p orbitaly → 2 π vazby. Trojná vazba = 1 σ + 2 π. Molekula lineární."},
        {f:"CO₂",    sig:2, pi:2, d:"C: 2 sp orbitaly → 2 σ vazby C=O; 2 kolmé p orbitaly tvoří 2 π vazby (každá k jinému kyslíku). Lineární, nepolární."}]},
 {id:"sp2",  lab:"sp²",   n:3, ang:"120°",   shape:"trigonálně planární",  np:3, from:"1 s + 2 p", left:"1 p (kolmý na rovinu) → 1 π vazba",
  mols:[{f:"BF₃",    sig:3, pi:0, d:"B: 2s² 2p¹ → excitace 2s¹ 2p² → 3 sp² orbitaly → 3 σ vazby B–F v rovině, 120°. Zbylý p orbital je prázdný (proto je BF₃ Lewisova kyselina)."},
        {f:"C₂H₄",   sig:5, pi:1, d:"Každý C: 3 sp² (2× σ C–H, 1× σ C–C) + 1 kolmý p → π vazba C=C. Dvojná vazba = 1 σ + 1 π. Plochá molekula, kolem C=C nelze otáčet."},
        {f:"C₆H₆",   sig:12,pi:3, d:"Šest sp² uhlíků v rovině, šest kolmých p orbitalů se překryjí do jednoho delokalizovaného π systému (6 elektronů). Všechny vazby C–C stejně dlouhé (139 pm)."},
        {f:"SO₂",    sig:2, pi:1, d:"S: 3 sp² orbitaly — dva σ vazby S–O, jeden nese volný pár. Zbylý p orbital tvoří π vazbu (delokalizovanou). Proto lomený tvar, úhel 119°."}]},
 {id:"sp3",  lab:"sp³",   n:4, ang:"109,5°", shape:"tetraedrický",         np:4, from:"1 s + 3 p", left:"žádný — jen σ vazby a volné páry",
  mols:[{f:"CH₄",    sig:4, pi:0, d:"C: 2s² 2p² → excitace 2s¹ 2p³ → 4 rovnocenné sp³ orbitaly → 4 σ vazby C–H, tetraedr 109,5°. Bez hybridizace by C mohl vázat jen 2 H a úhel by byl 90°."},
        {f:"NH₃",    sig:3, pi:0, d:"N: 4 sp³ orbitaly, tři tvoří σ vazby N–H, čtvrtý nese volný pár. Tvar trigonální pyramida, úhel 107° (volný pár tlačí)."},
        {f:"H₂O",    sig:2, pi:0, d:"O: 4 sp³ orbitaly, dva σ vazby O–H, dva volné páry. Lomená molekula, 104,5°. Dva volné páry = dvojnásobný tlak na vazebné úhly."},
        {f:"C₂H₆",   sig:7, pi:0, d:"Oba uhlíky sp³, sedm σ vazeb (6× C–H, 1× C–C). Kolem jednoduché vazby C–C se molekula může volně otáčet."}]},
 {id:"sp3d", lab:"sp³d",  n:5, ang:"90° / 120°", shape:"trigonálně bipyramidální", np:5, from:"1 s + 3 p + 1 d", left:"—",
  mols:[{f:"PCl₅",   sig:5, pi:0, d:"P: 3s² 3p³ → excitace 3s¹ 3p³ 3d¹ → 5 sp³d orbitalů → 5 σ vazeb. Fosfor (3. perioda) má prázdné 3d orbitaly, dusík ne — proto existuje PCl₅, ale NCl₅ ne."},
        {f:"SF₄",    sig:4, pi:0, d:"S: 5 sp³d orbitalů, čtyři σ vazby S–F, jeden volný pár v rovníkové poloze. Tvar houpačky."},
        {f:"XeF₂",   sig:2, pi:0, d:"Xe: 5 sp³d orbitalů, dvě σ vazby na ose, tři volné páry v rovníku. Lineární molekula."}]},
 {id:"sp3d2",lab:"sp³d²", n:6, ang:"90°",    shape:"oktaedrický",          np:6, from:"1 s + 3 p + 2 d", left:"—",
  mols:[{f:"SF₆",    sig:6, pi:0, d:"S: 3s² 3p⁴ → excitace 3s¹ 3p³ 3d² → 6 sp³d² orbitalů → 6 σ vazeb S–F, oktaedr, 90°. Mimořádně stálá molekula (izolační plyn ve vysokonapěťových rozvaděčích)."},
        {f:"XeF₄",   sig:4, pi:0, d:"Xe: 6 sp³d² orbitalů, čtyři σ vazby v rovině, dva volné páry nad a pod rovinou. Čtvercově planární."},
        {f:"BrF₅",   sig:5, pi:0, d:"Br: 6 sp³d² orbitalů, pět σ vazeb, jeden volný pár. Čtvercová pyramida."}]}
];
function HYB_(id){ for(var i=0;i<HYB.length;i++){ if(HYB[i].id===id) return HYB[i]; } return HYB[2]; }

/* ---- Rozhodovač „podobné rozpouští podobné“ ---- */
var MIXSOLV=[
 {id:"voda",   n:"voda",    kind:"polární, vodíkové můstky"},
 {id:"hexan",  n:"hexan",   kind:"nepolární"},
 {id:"ethanol",n:"ethanol", kind:"polární OH + nepolární zbytek"},
 {id:"benzen", n:"benzen",  kind:"nepolární (aromatický)"}
];
/* r: y = ano (rozpustný / mísitelný), n = ne, p = částečně / omezeně */
var MIX=[
 {n:"NaCl",     kind:"iontová látka",
  r:{voda:["y","Ionty se hydratují — dipóly vody obklopí Na⁺ (kyslíkem) i Cl⁻ (vodíky) a zaplatí rozpad mřížky. 360 g/L."],
     hexan:["n","Nepolární molekuly hexanu nemají čím ionty přitáhnout; mřížková energie 787 kJ/mol zůstane nezaplacená."],
     ethanol:["p","Ethanol má polární OH skupinu, ale slabší solvatační schopnost než voda — rozpustí jen ≈ 0,65 g/L."],
     benzen:["n","Nepolární rozpouštědlo, žádná solvatace iontů. Sůl zůstane na dně."]}},
 {n:"I₂",       kind:"nepolární molekula",
  r:{voda:["p","Nepolární I₂ voda skoro nerozpouští (0,33 g/L) — musela by rozbít své vodíkové můstky, a nic za to nedostane. Jodová tinktura je proto v ethanolu, Lugolův roztok potřebuje KI (vzniká I₃⁻)."],
     hexan:["y","Disperzní síly I₂–hexan jsou podobné jako I₂–I₂ a hexan–hexan. Fialový roztok."],
     ethanol:["y","Ethanol má nepolární ethylový zbytek — rozpouští jod dobře (jodová tinktura, hnědý roztok)."],
     benzen:["y","Nepolární v nepolárním, navíc interakce s π systémem benzenu. Fialovohnědý roztok."]}},
 {n:"sacharóza",kind:"polární molekula, 8 skupin OH",
  r:{voda:["y","Osm hydroxylových skupin tvoří vodíkové můstky s vodou. Extrémně rozpustná: ≈ 2000 g/L. Roztok ale <b>nevede proud</b> — molekuly, ne ionty."],
     hexan:["n","Vodíkové můstky mezi molekulami cukru hexan nenahradí ničím. Cukr zůstane krystalický."],
     ethanol:["p","Slabě (≈ 0,6 g/100 g) — ethanol má jen jednu OH skupinu a nepolární zbytek."],
     benzen:["n","Nepolární rozpouštědlo, nerozpustná."]}},
 {n:"ethanol",  kind:"polární OH + krátký nepolární řetězec",
  r:{voda:["y","Skupina OH tvoří vodíkové můstky s vodou — neomezeně mísitelný (líh, víno, pivo)."],
     hexan:["y","Ethylový zbytek zajistí disperzní interakce — mísitelný. Ethanol je obojživelník mezi rozpouštědly."],
     ethanol:["y","Totéž rozpouštědlo."],
     benzen:["y","Mísitelný — nepolární část molekuly stačí."]}},
 {n:"olej",     kind:"nepolární (triacylglycerol, dlouhé řetězce)",
  r:{voda:["n","Dlouhé uhlovodíkové řetězce voda nedokáže solvatovat; rozbití vodíkových můstků by stálo víc, než disperzní síly vrátí. Olej plave nahoře."],
     hexan:["y","Nepolární v nepolárním — mísitelné. Proto se olej ze semen extrahuje hexanem."],
     ethanol:["p","Jen omezeně za studena (ethanol je pro dlouhé řetězce moc polární); lépe za horka."],
     benzen:["y","Mísitelné."]}},
 {n:"benzen",   kind:"nepolární molekula",
  r:{voda:["n","Jen 1,8 g/L — prakticky nemísitelný, tvoří vrstvu nad vodou."],
     hexan:["y","Neomezeně mísitelný."],
     ethanol:["y","Mísitelný."],
     benzen:["y","Totéž rozpouštědlo."]}},
 {n:"KMnO₄",    kind:"iontová látka",
  r:{voda:["y","Hydratace iontů K⁺ a MnO₄⁻; 64 g/L, intenzivně fialový roztok."],
     hexan:["n","Nepolární — ionty se nesolvatují."],
     ethanol:["p","Rozpustí se, ale hned <b>reaguje</b>: manganistan oxiduje ethanol na acetaldehyd a odbarvuje se."],
     benzen:["n","Nerozpustný (a v bezvodém benzenu nereaguje)."]}},
 {n:"vosk",     kind:"nepolární (parafiny C₂₀–C₄₀)",
  r:{voda:["n","Dlouhé nepolární řetězce — hydrofobní. Voskovaný papír proto nepromokne."],
     hexan:["y","Rozpustný, zvlášť za tepla."],
     ethanol:["n","Prakticky ne — ethanol je moc polární."],
     benzen:["y","Rozpustný."]}},
 {n:"NH₃",      kind:"polární molekula, vodíkové můstky",
  r:{voda:["y","Vodíkové můstky s vodou + částečná ionizace na NH₄⁺ a OH⁻. Extrémně rozpustný (≈ 520 g/L při 20 °C) — pokus s fontánou."],
     hexan:["p","Jen málo — nepolární hexan nenabízí vodíkové můstky."],
     ethanol:["y","Dobře rozpustný — OH skupina ethanolu tvoří můstky s NH₃."],
     benzen:["p","Málo."]}},
 {n:"CO₂",      kind:"nepolární plyn (malá molekula)",
  r:{voda:["p","Jen 1,45 g/L při 1 atm (Henryho zákon — v sycených nápojích tlak 3–5 atm). Malá část reaguje na H₂CO₃."],
     hexan:["p","V nepolárních rozpouštědlech je rozpustnost CO₂ dokonce vyšší než ve vodě, ale stále omezená."],
     ethanol:["p","Omezeně rozpustný (sekt, šumivé víno)."],
     benzen:["p","Omezeně rozpustný."]}}
];

/* ---- Trenažér VSEPR: vzorec → tvar ---- */
var VSHAPES=["lineární","lomený","trigonálně planární","trigonálně pyramidální","tetraedrický","T-tvar","houpačka","trigonálně bipyramidální","čtvercově planární","čtvercově pyramidální","oktaedrický"];
var VT=[
 {f:"SO₂",   a:"lomený",                    e:"S má 6 valenčních elektronů: dvě vazby (každá S=O je jedna doména) + jeden volný pár = <b>3 domény</b>, typ AX₂E. Elektronové uspořádání trojúhelník, tvar lomený, ≈ 119°."},
 {f:"NH₄⁺",  a:"tetraedrický",              e:"N má 5 elektronů, kladný náboj jeden odebere → 4; čtyři vazby N–H, žádný volný pár = <b>4 domény</b>, AX₄ → tetraedr 109,5°."},
 {f:"BF₃",   a:"trigonálně planární",       e:"B má jen 3 valenční elektrony, tři vazby, žádný volný pár = <b>3 domény</b>, AX₃ → plochý trojúhelník, 120°. Bor nemá oktet — a nevadí to."},
 {f:"XeF₄",  a:"čtvercově planární",        e:"Xe má 8 valenčních elektronů, 4 jdou do vazeb, zbylé 4 tvoří <b>2 volné páry</b> → 6 domén, AX₄E₂. Volné páry trans (nad a pod), atomy v rovině čtverce."},
 {f:"PCl₅",  a:"trigonálně bipyramidální",  e:"P má 5 valenčních elektronů, pět vazeb, žádný volný pár = <b>5 domén</b>, AX₅ → trigonální bipyramida, úhly 90° a 120°."},
 {f:"H₃O⁺",  a:"trigonálně pyramidální",    e:"O má 6 elektronů, náboj + odebere jeden → 5; tři vazby O–H a jeden volný pár = <b>4 domény</b>, AX₃E → trigonální pyramida (jako NH₃), ≈ 113°."},
 {f:"CO₂",   a:"lineární",                  e:"C má 4 elektrony ve dvou dvojných vazbách. Každá násobná vazba je <b>jedna</b> doména → 2 domény, AX₂ → lineární, 180°."},
 {f:"SF₆",   a:"oktaedrický",               e:"S má 6 valenčních elektronů, šest vazeb, žádný volný pár = <b>6 domén</b>, AX₆ → oktaedr, všechny úhly 90°."},
 {f:"ClF₃",  a:"T-tvar",                    e:"Cl má 7 elektronů, tři vazby, zbylé 4 elektrony = <b>2 volné páry</b> → 5 domén, AX₃E₂. Volné páry obsadí rovník, atomy tvoří T."},
 {f:"I₃⁻",   a:"lineární",                  e:"Centrální I má 7 elektronů + 1 z náboje = 8; dvě vazby, zbylých 6 = <b>3 volné páry</b> → 5 domén, AX₂E₃. Tři volné páry v rovníku, dva atomy na ose → lineární."},
 {f:"SF₄",   a:"houpačka",                  e:"S má 6 elektronů, čtyři vazby, zbylé 2 = <b>1 volný pár</b> → 5 domén, AX₄E. Volný pár v rovníku, atomy tvoří houpačku."},
 {f:"H₂S",   a:"lomený",                    e:"S má 6 elektronů, dvě vazby, <b>2 volné páry</b> → 4 domény, AX₂E₂ → lomený, jako voda, ale jen 92° (vazebné páry dál od jádra, volné páry je stlačí víc)."},
 {f:"NO₃⁻",  a:"trigonálně planární",       e:"N má 5 elektronů + 1 z náboje; tři kyslíky, jedna dvojná vazba (delokalizovaná), žádný volný pár na N = <b>3 domény</b>, AX₃ → plochý trojúhelník, 120°."},
 {f:"BrF₅",  a:"čtvercově pyramidální",     e:"Br má 7 elektronů, pět vazeb, zbylé 2 = <b>1 volný pár</b> → 6 domén, AX₅E. Volný pár dole, čtyři F v základně, jeden na špičce."},
 {f:"SO₄²⁻", a:"tetraedrický",              e:"S má 6 elektronů + 2 z náboje; čtyři kyslíky, žádný volný pár na S = <b>4 domény</b>, AX₄ → tetraedr, 109,5°. Všechny vazby S–O rovnocenné."},
 {f:"PCl₃",  a:"trigonálně pyramidální",    e:"P má 5 elektronů, tři vazby + <b>1 volný pár</b> = 4 domény, AX₃E → trigonální pyramida, ≈ 100° (menší než u NH₃, protože vazebné páry jsou dál od jádra P)."}
];

/* ---- Polarita podle tvaru: 3D geometrie + rozdíly elektronegativit (Pauling) ---- */
var POLMOL=[
 {f:"CO₂",   c:"C", lig:["O","O"],          geom:"lin",   mu:0,    tv:"−78,5 °C (subl.)", why:"Dvě stejné, stejně velké dipólové vazby C=O míří přesně proti sobě — vektorový součet je nula. Molekula nepolární, přestože vazby polární jsou."},
 {f:"H₂O",   c:"O", lig:["H","H"],          geom:"bent104", mu:1.85, tv:"100 °C", why:"Lomený tvar (104,5°): dipóly O–H se nevyruší, výsledný dipól míří od vodíků ke kyslíku. Silně polární + vodíkové můstky → anomálně vysoký bod varu."},
 {f:"NH₃",   c:"N", lig:["H","H","H"],      geom:"pyr107", mu:1.47, tv:"−33,3 °C", why:"Trigonální pyramida: tři dipóly N–H se sečtou do výsledného dipólu podél osy pyramidy (ke straně volného páru). Polární, vodíkové můstky."},
 {f:"CH₄",   c:"C", lig:["H","H","H","H"],  geom:"tet",   mu:0,    tv:"−161,5 °C", why:"Tetraedr se čtyřmi stejnými vazbami — dokonalá symetrie, součet nula. Vazby C–H jsou navíc téměř nepolární (Δχ = 0,35)."},
 {f:"CCl₄",  c:"C", lig:["Cl","Cl","Cl","Cl"], geom:"tet", mu:0,   tv:"76,7 °C", why:"Čtyři polární vazby C–Cl (Δχ = 0,61), ale tetraedrická symetrie je vyruší. Nepolární — nemísí se s vodou, rozpouští tuky."},
 {f:"CHCl₃", c:"C", lig:["H","Cl","Cl","Cl"], geom:"tet", mu:1.04, tv:"61,2 °C", why:"Jeden vodík místo chloru poruší symetrii: tři dipóly C–Cl se sečtou proti slabému C–H. Polární molekula — proto se chloroform ve vodě rozpouští (8 g/L) lépe než CCl₄ (0,8 g/L)."},
 {f:"BF₃",   c:"B", lig:["F","F","F"],      geom:"trig",  mu:0,    tv:"−100,3 °C", why:"Tři velmi polární vazby B–F (Δχ = 1,94) v rovině po 120° — vektorový součet nula. Nepolární plyn."},
 {f:"SO₂",   c:"S", lig:["O","O"],          geom:"bent119", mu:1.63, tv:"−10,0 °C", why:"Lomená (119°) díky volnému páru na síře — dva dipóly S=O se sečtou. Polární, dobře rozpustný ve vodě (94 g/L)."},
 {f:"HCl",   c:"H", lig:["Cl"],             geom:"diat",  mu:1.08, tv:"−85,1 °C", why:"Dvouatomová molekula z různých atomů je polární vždy — dipól je prostě dipól té jediné vazby. Δχ = 0,96."},
 {f:"CH₃Cl", c:"C", lig:["Cl","H","H","H"], geom:"tet",   mu:1.87, tv:"−24,2 °C", why:"Jeden chlor na tetraedru: symetrie porušená, výsledný dipól míří k chloru. Polární — nejvyšší z řady CH₃Cl, CH₂Cl₂, CHCl₃, CCl₄."}
];
var CHI={H:2.20,C:2.55,N:3.04,O:3.44,F:3.98,Cl:3.16,S:2.58,B:2.04};

/* ---- Trenažér: seřaď podle teploty varu ---- */
var BPSETS=[
 {t:"Tři různé síly", items:[["CH₄","−161,5"],["HCl","−85,1"],["H₂O","100"]],
  e:"CH₄ je nepolární — jen disperzní síly. HCl je polární — dipól-dipólové interakce navíc. H₂O tvoří vodíkové můstky, nejsilnější z mezimolekulových sil. Pořadí sil = pořadí teplot varu."},
 {t:"Stejný vzorec C₂H₆O, jiná struktura", items:[["ethan C₂H₆","−88,6"],["dimethylether CH₃OCH₃","−24,8"],["ethanol C₂H₅OH","78,3"]],
  e:"Ethan: nepolární, disperzní. Dimethylether: polární (kyslík uprostřed), ale bez H na kyslíku — žádné vodíkové můstky. Ethanol: skupina O–H → vodíkové můstky → o 103 °C vyšší bod varu než izomerní ether."},
 {t:"Vzácné plyny — jen disperzní síly", items:[["He","−268,9"],["Ne","−246,1"],["Ar","−185,8"],["Kr","−153,4"]],
  e:"Žádné dipóly, žádné můstky — jen disperzní (Londonovy) síly, a ty rostou s počtem elektronů, tedy s velikostí a polarizovatelností atomu. Čím těžší vzácný plyn, tím vyšší bod varu."},
 {t:"Halogeny", items:[["F₂","−188,1"],["Cl₂","−34,0"],["Br₂","58,8"],["I₂","184,4"]],
  e:"Všechny nepolární, rozhodují disperzní síly rostoucí s velikostí elektronového obalu. Fluor a chlor jsou plyny, brom kapalina, jod pevná látka — přesně podle síly disperzních interakcí."},
 {t:"Délka řetězce", items:[["pentan","36,1"],["hexan","68,7"],["heptan","98,4"],["oktan","125,7"]],
  e:"Delší řetězec = větší plocha pro disperzní interakce = vyšší bod varu. Každá skupina CH₂ navíc přidá zhruba 20–30 °C. Rozvětvení naopak bod varu snižuje (2,2-dimethylpropan vře už při 9,5 °C, pentan při 36 °C)."},
 {t:"Anomálie vody", items:[["H₂S","−60,3"],["H₂Se","−41,3"],["H₂Te","−2,2"],["H₂O","100"]],
  e:"Ve skupině by měl bod varu růst s hmotností: H₂S < H₂Se < H₂Te. Voda by podle toho měla vřít kolem −80 °C — vodíkové můstky ji ale posunou na +100 °C. Totéž platí pro NH₃ a HF."},
 {t:"Tři typy látek", items:[["CH₄ (molekulová, nepolární)","−161,5"],["H₂O (molekulová, H-můstky)","100"],["NaCl (iontová)","1465"]],
  e:"Mezimolekulové síly (disperzní < vodíkové můstky) jsou o řád slabší než iontová vazba. Proto molekulové látky vřou pod pár set stupňů, iontové až kolem tisíce."},
 {t:"Polarita při podobné hmotnosti", items:[["propan C₃H₈","−42,1"],["aceton C₃H₆O","56,1"],["propan-1-ol C₃H₇OH","97,2"]],
  e:"Podobná molární hmotnost (44, 58, 60 g/mol), ale propan je nepolární, aceton má silný dipól C=O (bez můstků) a propanol má skupinu OH s vodíkovými můstky. Bod varu roste s typem interakce."}
];
