/* ============================================================
   10 · DATA — tabulky hodnot pro modely a trenažéry
   ============================================================ */
var R_GAS = 8.314; /* J·K⁻¹·mol⁻¹ */

/* Rozklad H₂O₂ (katalyzovaný, laboratorní data) — koncentrace v mol·dm⁻³ */
var H2O2 = [
  [0,1.00],[120,0.91],[300,0.78],[600,0.59],[1200,0.37],
  [1800,0.22],[2400,0.13],[3000,0.082],[3600,0.050]
];

/* Reakce pro model stechiometrie rychlostí — nu < 0 reaktant, nu > 0 produkt */
var STRXN = [
  {name:"Rozklad peroxidu vodíku", eq:"2 H₂O₂ → 2 H₂O + O₂",
   sp:[{f:"H₂O₂",nu:-2},{f:"H₂O",nu:2},{f:"O₂",nu:1}]},
  {name:"Syntéza amoniaku", eq:"N₂ + 3 H₂ → 2 NH₃",
   sp:[{f:"N₂",nu:-1},{f:"H₂",nu:-3},{f:"NH₃",nu:2}]},
  {name:"Rozklad oxidu dusičného", eq:"2 N₂O₅ → 4 NO₂ + O₂",
   sp:[{f:"N₂O₅",nu:-2},{f:"NO₂",nu:4},{f:"O₂",nu:1}]},
  {name:"Oxidace oxidu siřičitého", eq:"2 SO₂ + O₂ → 2 SO₃",
   sp:[{f:"SO₂",nu:-2},{f:"O₂",nu:-1},{f:"SO₃",nu:2}]}
];

/* Sady pro trenažér metody počátečních rychlostí
   A, B = koncentrace [mol·dm⁻³], v = počáteční rychlost [mol·dm⁻³·s⁻¹] */
var IRSETS = [
  {eq:"2 NO(g) + O₂(g) → 2 NO₂(g)", a:"NO", b:"O₂", m:2, n:1,
   rows:[[0.0126,0.0125,1.41e-2],[0.0252,0.0250,1.13e-1],[0.0252,0.0125,5.64e-2]],
   hint:"Porovnejte experimenty 1 a 3 (mění se jen [NO]) a potom 3 a 2 (mění se jen [O₂]).",
   why:"Mezi experimenty 1 a 3 se [NO] zdvojnásobilo a rychlost vzrostla 4× → řád v NO je 2. Mezi 3 a 2 se zdvojnásobilo [O₂] a rychlost vzrostla 2× → řád v O₂ je 1. Řád v NO (2) tu náhodou souhlasí se stechiometrickým koeficientem, ale to je shoda, ne pravidlo."},
  {eq:"NO₂(g) + CO(g) → NO(g) + CO₂(g)   (pod 500 K)", a:"NO₂", b:"CO", m:2, n:0,
   rows:[[0.10,0.10,0.0050],[0.40,0.10,0.080],[0.10,0.20,0.0050]],
   hint:"Všimněte si experimentů 1 a 3: koncentrace CO se zdvojnásobila — a rychlost?",
   why:"Mezi experimenty 1 a 3 se [CO] zdvojnásobilo, ale rychlost se <b>nezměnila</b> → řád v CO je 0. Mezi 1 a 2 vzrostlo [NO₂] 4× a rychlost 16× = 4² → řád v NO₂ je 2. Rychlostní rovnice v = k[NO₂]² vůbec neobsahuje CO, přestože v rovnici reakce je. To je typický znak složené reakce: pomalý krok je NO₂ + NO₂ → NO₃ + NO."},
  {eq:"H₂O₂ + 2 I⁻ + 2 H⁺ → I₂ + 2 H₂O", a:"H₂O₂", b:"I⁻", m:1, n:1,
   rows:[[0.010,0.010,1.15e-6],[0.020,0.010,2.30e-6],[0.010,0.020,2.30e-6]],
   hint:"Každé zdvojnásobení jedné koncentrace tu dělá s rychlostí totéž.",
   why:"Zdvojnásobení [H₂O₂] (1 → 2) zdvojnásobí rychlost → řád 1. Zdvojnásobení [I⁻] (1 → 3) také zdvojnásobí rychlost → řád 1. Celkový řád 2, v = k[H₂O₂][I⁻]. Všimněte si, že jodid má v rovnici koeficient 2, ale řád 1 — a H⁺ v rychlostní rovnici vůbec není."},
  {eq:"2 NO(g) + Cl₂(g) → 2 NOCl(g)", a:"NO", b:"Cl₂", m:2, n:1,
   rows:[[0.10,0.10,0.018],[0.20,0.10,0.072],[0.10,0.20,0.036]],
   hint:"Zdvojnásobení [NO] dá 4×, zdvojnásobení [Cl₂] dá 2×.",
   why:"Mezi experimenty 1 a 2 se [NO] zdvojnásobilo a rychlost vzrostla 4× (0,018 → 0,072) → řád 2. Mezi 1 a 3 se [Cl₂] zdvojnásobilo a rychlost 2× → řád 1. Celkový řád 3, k = 0,018 / (0,10² · 0,10) = 18 dm⁶·mol⁻²·s⁻¹."}
];

/* Mechanismy pro model elementárních kroků */
var MECHS = [
  {name:"2 NO₂ + F₂ → 2 NO₂F (učebnicová klasika)",
   overall:"2 NO₂ + F₂ → 2 NO₂F",
   steps:[
     {eq:"NO₂ + F₂ → NO₂F + F",  mol:2, slow:true,  lab:"bimolekulární · pomalý"},
     {eq:"NO₂ + F → NO₂F",       mol:2, slow:false, lab:"bimolekulární · rychlý"}
   ],
   inter:"F (atom fluoru)",
   law:"v = k·[NO₂]·[F₂]", order:"2 (1 + 1)",
   note:"Rychlost určuje první, pomalý krok. Proto je reakce prvního řádu v NO₂, i když v celkové rovnici má NO₂ koeficient 2. Kdyby byla reakce elementární, musela by být druhého řádu v NO₂ a celkově třetího řádu — trimolekulární srážka tří částic je ale velmi nepravděpodobná."},
  {name:"NO₂ + CO → NO + CO₂ (pod 500 K)",
   overall:"NO₂ + CO → NO + CO₂",
   steps:[
     {eq:"NO₂ + NO₂ → NO₃ + NO", mol:2, slow:true,  lab:"bimolekulární · pomalý"},
     {eq:"NO₃ + CO → NO₂ + CO₂", mol:2, slow:false, lab:"bimolekulární · rychlý"}
   ],
   inter:"NO₃",
   law:"v = k·[NO₂]²", order:"2 (2 + 0)",
   note:"CO v rychlostní rovnici vůbec nefiguruje — je nultého řádu, protože vstupuje až do rychlého kroku. Experiment to potvrzuje: zdvojnásobení [CO] rychlost nezmění. Nad 500 K reakce probíhá jako jediný bimolekulární krok a rychlostní rovnice se změní na v = k[NO₂][CO]."},
  {name:"2 O₃ → 3 O₂ (rozklad ozonu)",
   overall:"2 O₃ → 3 O₂",
   steps:[
     {eq:"O₃ ⇌ O₂ + O",  mol:1, slow:false, lab:"unimolekulární · rychlá rovnováha"},
     {eq:"O + O₃ → 2 O₂", mol:2, slow:true,  lab:"bimolekulární · pomalý"}
   ],
   inter:"O (atom kyslíku)",
   law:"v = k·[O₃]²·[O₂]⁻¹", order:"1 (2 − 1)",
   note:"Pomalý krok je až druhý, ale obsahuje meziprodukt O, jehož koncentrace se dosadí z předřazené rovnováhy: [O] = K[O₃]/[O₂]. Vyjde záporný řád v kyslíku — produkt reakci brzdí. Záporné a zlomkové řády jsou vždy znakem složené reakce."},
  {name:"H₂ + Br₂ → 2 HBr (řetězová, řád 1,5)",
   overall:"H₂ + Br₂ → 2 HBr",
   steps:[
     {eq:"Br₂ → 2 Br·",          mol:1, slow:false, lab:"iniciace · unimolekulární"},
     {eq:"Br· + H₂ → HBr + H·",  mol:2, slow:true,  lab:"propagace · bimolekulární (pomalý)"},
     {eq:"H· + Br₂ → HBr + Br·", mol:2, slow:false, lab:"propagace · bimolekulární"},
     {eq:"2 Br· → Br₂",          mol:2, slow:false, lab:"terminace · bimolekulární"}
   ],
   inter:"radikály Br· a H·",
   law:"v = k·[H₂]·[Br₂]^½   (zjednodušeně)", order:"1,5",
   note:"Bodenstein 1906. Rovnice vypadá stejně jednoduše jako H₂ + I₂, ale experimentální řád 1,5 prozrazuje, že reakce elementární není. Poloviční řád v Br₂ plyne z iniciace: koncentrace radikálů Br· je úměrná odmocnině z [Br₂]. Zlomkový řád = jistý znak složené (tady řetězové) reakce."},
  {name:"H₂ + I₂ → 2 HI (past: stejná rovnice, jiný mechanismus)",
   overall:"H₂ + I₂ → 2 HI",
   steps:[
     {eq:"I₂ ⇌ 2 I",        mol:1, slow:false, lab:"unimolekulární · rychlá rovnováha"},
     {eq:"H₂ + 2 I → 2 HI",  mol:3, slow:true,  lab:"trimolekulární · pomalý"}
   ],
   inter:"I (atom jodu)",
   law:"v = k·[H₂]·[I₂]", order:"2 (1 + 1)",
   note:"Sto let se učilo, že H₂ + I₂ je vzorová bimolekulární elementární reakce — rychlostní rovnice v = k[H₂][I₂] tomu přesně odpovídá. Sullivan v roce 1967 ukázal, že běží přes atomy jodu. Poučení: rychlostní rovnice může mechanismus <b>vyvrátit</b>, ale nikdy ho nemůže <b>dokázat</b>."}
];

/* Tabulka typických rychlostních konstant, poločasů a aktivačních energií */
var HALF = [
  {n:"Rozklad oxidu dusičného", eq:"2 N₂O₅ → 4 NO₂ + O₂", ord:"1", k:"3,38·10⁻⁵ s⁻¹ (25 °C)", th:"5,70 h", Ea:"103", g:["gas","first"],
   note:"Učebnicový příklad reakce 1. řádu, přestože má koeficient 2 — je složená."},
  {n:"Rozklad peroxidu vodíku (s I⁻)", eq:"2 H₂O₂ → 2 H₂O + O₂", ord:"1", k:"≈ 8,3·10⁻⁴ s⁻¹ (lab. data)", th:"≈ 14 min", Ea:"57 (s I⁻); 75 bez kat.", g:["sol","first","cat"],
   note:"Bez katalyzátoru je poločas při 25 °C řádově roky; s katalázou zlomky sekundy."},
  {n:"Inverze sacharózy (H⁺)", eq:"C₁₂H₂₂O₁₁ + H₂O → glukóza + fruktóza", ord:"1 (pseudo)", k:"≈ 3,5·10⁻³ min⁻¹ (0,5 M HCl, 25 °C)", th:"≈ 3,3 h", Ea:"≈ 108", g:["sol","first","cat"],
   note:"Voda je v obrovském přebytku, její koncentrace se nemění → pseudo-první řád. Sledovalo se polarimetrem (Wilhelmy 1850)."},
  {n:"Izomerace cyklopropanu", eq:"cyklopropan → propen", ord:"1", k:"6,7·10⁻⁴ s⁻¹ (500 °C)", th:"≈ 17 min", Ea:"272", g:["gas","first"],
   note:"Unimolekulární reakce v plynné fázi; vysoká Eₐ, proto potřebuje 500 °C."},
  {n:"Rozklad oxidu dusičitého", eq:"2 NO₂ → 2 NO + O₂", ord:"2", k:"0,54 dm³·mol⁻¹·s⁻¹ (300 °C)", th:"1/(k·c₀)", Ea:"111", g:["gas","second"],
   note:"Elementární bimolekulární reakce — řád 2 v NO₂ souhlasí s molekularitou."},
  {n:"Rozklad jodovodíku", eq:"2 HI → H₂ + I₂", ord:"2", k:"≈ 2·10⁻³ dm³·mol⁻¹·s⁻¹ (700 K)", th:"1/(k·c₀)", Ea:"184", g:["gas","second"],
   note:"Klasický Bodensteinův systém. Vysoká Eₐ — při 25 °C je HI prakticky stálý."},
  {n:"Alkalická hydrolýza ethyl-acetátu", eq:"CH₃COOC₂H₅ + OH⁻ → CH₃COO⁻ + C₂H₅OH", ord:"2", k:"≈ 0,11 dm³·mol⁻¹·s⁻¹ (25 °C)", th:"≈ 3 min (c₀ = 0,05)", Ea:"≈ 47", g:["sol","second"],
   note:"Laboratorní úloha na VŠ: sleduje se vodivostně. Kyselá hydrolýza je naopak katalyzovaná H⁺ a pseudo-1. řádu."},
  {n:"Reakce NO s ozonem", eq:"NO + O₃ → NO₂ + O₂", ord:"2", k:"≈ 1,1·10⁷ dm³·mol⁻¹·s⁻¹ (25 °C)", th:"milisekundy", Ea:"≈ 12", g:["gas","second"],
   note:"Elementární, velmi rychlá; nízká Eₐ. Podílí se na úbytku ozonu i na fotochemickém smogu."},
  {n:"Rozklad acetaldehydu", eq:"CH₃CHO → CH₄ + CO", ord:"1,5", k:"—", th:"—", Ea:"≈ 190", g:["gas","chain"],
   note:"Zlomkový řád = řetězový mechanismus (Rice–Herzfeld). Nemůže být elementární."},
  {n:"Syntéza bromovodíku", eq:"H₂ + Br₂ → 2 HBr", ord:"1,5", k:"—", th:"—", Ea:"—", g:["gas","chain"],
   note:"v = k[H₂][Br₂]^½ — Bodenstein 1906. Řetězová reakce přes radikály Br· a H·."},
  {n:"Rozklad oxidu dusného na platině", eq:"2 N₂O → 2 N₂ + O₂ (Pt)", ord:"0", k:"závisí na povrchu", th:"c₀/(2k)", Ea:"—", g:["gas","zero","cat"],
   note:"Povrch katalyzátoru je nasycený, další N₂O rychlost nezvýší → nultý řád."},
  {n:"Rozklad amoniaku na wolframu", eq:"2 NH₃ → N₂ + 3 H₂ (W)", ord:"0", k:"závisí na povrchu", th:"c₀/(2k)", Ea:"—", g:["gas","zero","cat"],
   note:"Stejný princip: heterogenní katalýza s nasyceným povrchem dává nultý řád."},
  {n:"Odbourávání ethanolu v těle", eq:"C₂H₅OH → CH₃CHO (alkoholdehydrogenáza)", ord:"0", k:"≈ 0,15 g·L⁻¹·h⁻¹ (≈ 0,15 ‰/h)", th:"c₀/(2k)", Ea:"—", g:["sol","zero","enz"],
   note:"Enzym je nasycený → rychlost nezávisí na koncentraci. Proto alkohol z krve mizí lineárně, ne exponenciálně."},
  {n:"Rozpad uhlíku ¹⁴C", eq:"¹⁴C → ¹⁴N + e⁻ + ν̄", ord:"1", k:"1,21·10⁻⁴ rok⁻¹", th:"5730 let", Ea:"—", g:["radio","first"],
   note:"Radiokarbonové datování: po 5730 letech zbývá polovina, po 3 poločasech osmina."},
  {n:"Rozpad jodu ¹³¹I", eq:"¹³¹I → ¹³¹Xe + e⁻ + ν̄", ord:"1", k:"8,64·10⁻² den⁻¹", th:"8,02 dne", Ea:"—", g:["radio","first"],
   note:"Léčba štítné žlázy; po 80 dnech (10 poločasů) zbývá tisícina."},
  {n:"Rozpad radonu ²²²Rn", eq:"²²²Rn → ²¹⁸Po + α", ord:"1", k:"0,181 den⁻¹", th:"3,82 dne", Ea:"—", g:["radio","first"],
   note:"Radon ve sklepích — krátký poločas, proto stačí větrat."},
  {n:"Rozpad technecia ⁹⁹ᵐTc", eq:"⁹⁹ᵐTc → ⁹⁹Tc + γ", ord:"1", k:"0,116 h⁻¹", th:"6,0 h", Ea:"—", g:["radio","first"],
   note:"Nejpoužívanější radionuklid v diagnostice; do druhého dne prakticky zmizí."},
  {n:"Rozpad uranu ²³⁸U", eq:"²³⁸U → ²³⁴Th + α", ord:"1", k:"1,55·10⁻¹⁰ rok⁻¹", th:"4,47·10⁹ let", Ea:"—", g:["radio","first"],
   note:"Poločas srovnatelný se stářím Země — proto ho na Zemi ještě máme."}
];

/* Katalyzátory a inhibitory v průmyslu, laboratoři a v těle */
var CATS = [
  {n:"Železo (Fe + K₂O, Al₂O₃)", t:"het", p:"Haber–Boschova syntéza amoniaku", eq:"N₂ + 3 H₂ → 2 NH₃", c:"400–450 °C, 20–30 MPa; promotory zvyšují aktivitu, síra a CO ho otravují."},
  {n:"Oxid vanadičný V₂O₅", t:"het", p:"Kontaktní výroba kyseliny sírové", eq:"2 SO₂ + O₂ → 2 SO₃", c:"400–450 °C; nahradil platinu, která se snadno otrávila arsenem."},
  {n:"Oxidy dusíku NO / NO₂", t:"hom", p:"Komorový (nitrózní) proces — historická výroba H₂SO₄", eq:"SO₂ + NO₂ → SO₃ + NO; 2 NO + O₂ → 2 NO₂", c:"NO₂ předá kyslík a hned se regeneruje vzduchem — vzorový příklad homogenní katalýzy přes meziprodukt."},
  {n:"Platina-rhodiová síťka", t:"het", p:"Ostwaldova výroba kyseliny dusičné", eq:"4 NH₃ + 5 O₂ → 4 NO + 6 H₂O", c:"≈ 900 °C, kontakt trvá tisíciny sekundy."},
  {n:"Nikl (Raneyův Ni)", t:"het", p:"Hydrogenace tuků (ztužování), hydrogenace alkenů", eq:"R–CH=CH–R + H₂ → R–CH₂–CH₂–R", c:"150–200 °C; vodík se na povrchu Ni disociuje na atomy."},
  {n:"Platina, palladium, rhodium", t:"het", p:"Třícestný katalyzátor v automobilu", eq:"2 CO + O₂ → 2 CO₂; 2 NO → N₂ + O₂; uhlovodíky → CO₂ + H₂O", c:"Keramický nosič s obrovským povrchem; olovo ho nevratně otráví — proto bezolovnatý benzin."},
  {n:"Cu / ZnO / Al₂O₃", t:"het", p:"Syntéza methanolu", eq:"CO + 2 H₂ → CH₃OH", c:"250 °C, 5–10 MPa."},
  {n:"Zeolity (hlinitokřemičitany)", t:"het", p:"Krakování ropy", eq:"dlouhé alkany → kratší alkany + alkeny", c:"Póry o velikosti molekul — tvarová selektivita."},
  {n:"Kyselina sírová (H⁺)", t:"hom", p:"Esterifikace, inverze sacharózy, hydratace alkenů", eq:"CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O", c:"H⁺ protonuje karbonyl a aktivuje ho; na konci se uvolní — koncentrace H⁺ se nemění."},
  {n:"Jodid I⁻", t:"hom", p:"Rozklad peroxidu vodíku", eq:"2 H₂O₂ → 2 H₂O + O₂", c:"Přes meziprodukt IO⁻: H₂O₂ + I⁻ → H₂O + IO⁻; IO⁻ + H₂O₂ → H₂O + O₂ + I⁻. Eₐ klesne ze 75 na ≈ 57 kJ·mol⁻¹."},
  {n:"Oxid manganičitý MnO₂", t:"het", p:"Laboratorní příprava kyslíku", eq:"2 KClO₃ → 2 KCl + 3 O₂; 2 H₂O₂ → 2 H₂O + O₂", c:"Snižuje teplotu rozkladu chlorečnanu z ≈ 400 °C na ≈ 150 °C."},
  {n:"Ionty Mn²⁺ (autokatalýza)", t:"auto", p:"Manganometrická titrace oxalátu", eq:"2 MnO₄⁻ + 5 C₂O₄²⁻ + 16 H⁺ → 2 Mn²⁺ + 10 CO₂ + 8 H₂O", c:"Produkt Mn²⁺ je katalyzátor: první kapky se odbarvují pomalu, další už okamžitě. Proto se titruje za tepla."},
  {n:"Kataláza", t:"enz", p:"Odstraňování H₂O₂ v buňkách (játra, krev)", eq:"2 H₂O₂ → 2 H₂O + O₂", c:"Eₐ ≈ 23 kJ·mol⁻¹ (bez enzymu 75); jedna molekula zvládne miliony přeměn za sekundu. Proto peroxid na ráně šumí."},
  {n:"Amyláza", t:"enz", p:"Trávení škrobu (sliny, slinivka)", eq:"škrob → maltóza", c:"Teplotní optimum ≈ 37 °C, pH ≈ 7; při 60 °C denaturuje."},
  {n:"Pepsin", t:"enz", p:"Trávení bílkovin v žaludku", eq:"bílkoviny → peptidy", c:"Optimum pH ≈ 2 — v neutrálním prostředí nepracuje."},
  {n:"Alkoholdehydrogenáza", t:"enz", p:"Odbourávání ethanolu v játrech", eq:"C₂H₅OH → CH₃CHO", c:"Při nasycení enzymu je reakce nultého řádu: ≈ 0,15 ‰ za hodinu bez ohledu na množství."},
  {n:"Ureáza", t:"enz", p:"Rozklad močoviny", eq:"CO(NH₂)₂ + H₂O → CO₂ + 2 NH₃", c:"Sumner 1926: první enzym získaný v krystalické podobě — důkaz, že enzymy jsou bílkoviny."},
  {n:"Radikál Cl· (z freonů)", t:"hom", p:"Nechtěná katalýza rozkladu stratosférického ozonu", eq:"Cl· + O₃ → ClO· + O₂; ClO· + O → Cl· + O₂", c:"Jeden atom chloru rozloží až 100 000 molekul O₃, než se cyklus přeruší — proto Montrealský protokol."},
  {n:"Olovo (tetraethylolovo)", t:"inh", p:"Katalytický jed pro Pt/Pd v autokatalyzátoru", eq:"—", c:"Nevratně obsazuje aktivní centra. Důvod zákazu olovnatého benzinu."},
  {n:"Síra, arsen, oxid uhelnatý", t:"inh", p:"Katalytické jedy pro Ni, Fe, Pt", eq:"—", c:"Silně se adsorbují na kov a blokují aktivní centra. Suroviny pro Haberův proces se proto odsiřují."},
  {n:"Antioxidanty (E300 askorbát, E306 tokoferol, E321 BHT)", t:"inh", p:"Inhibice oxidace tuků v potravinách", eq:"R–O–O· + AH → R–O–O–H + A·", c:"Zachytí radikály a přeruší řetězovou reakci žluknutí."},
  {n:"Kyselina fosforečná, acetanilid", t:"inh", p:"Stabilizátor lékárenského peroxidu vodíku", eq:"—", c:"Váže stopy kovových iontů, které by rozklad H₂O₂ katalyzovaly."},
  {n:"Kyanid, oxid uhelnatý", t:"inh", p:"Inhibitory dýchacího řetězce (cytochromoxidáza)", eq:"—", c:"Blokují aktivní centrum enzymu → buňka nemůže využít kyslík. Princip otravy."},
  {n:"Kyselina acetylsalicylová (aspirin)", t:"inh", p:"Inhibitor cyklooxygenázy", eq:"—", c:"Acetyluje aktivní místo enzymu, zastaví tvorbu prostaglandinů → tlumí bolest a zánět. Léčiva jsou často inhibitory enzymů."}
];

/* Trenažér faktorů — a: up / down / same */
var FX = [
  {s:"Do roztoku reaktantů přidáte další podíl jednoho z reaktantů (jeho koncentrace vzroste).", a:"up",
   e:"Vyšší koncentrace → více částic v jednotce objemu → více srážek za sekundu. Podle rychlostní rovnice v = k·[A]^m roste rychlost, pokud je m > 0."},
  {s:"Reakční směs zahřejete o 10 °C.", a:"up",
   e:"Zvýšení teploty zvýší podíl molekul s energií ≥ Eₐ (Arrhenius). U běžných reakcí s Eₐ ≈ 50 kJ·mol⁻¹ to znamená zhruba 2× rychleji — van 't Hoffovo pravidlo."},
  {s:"Směs plynných reaktantů stlačíte na dvojnásobný tlak (při stálé teplotě).", a:"up",
   e:"U plynů je tlak jen jiný způsob, jak říct koncentrace: p = c·R·T. Dvojnásobný tlak = dvojnásobná koncentrace všech plynných reaktantů → rychlost vzroste (u reakce celkového řádu 2 čtyřikrát)."},
  {s:"Reakci v roztoku (kapalina) vystavíte dvojnásobnému tlaku.", a:"same",
   e:"Kapaliny jsou prakticky nestlačitelné — koncentrace se nezmění, takže ani rychlost. Tlak je faktor <b>jen u reakcí s plyny</b>. Tohle je oblíbený chyták."},
  {s:"Kousek zinku pro reakci s HCl rozemelete na prášek.", a:"up",
   e:"Reakce probíhá jen na rozhraní pevná látka–roztok. Rozemletí zvětší povrch (z krychle 1 cm na zrnka 0,1 mm je to 100×), takže se zvětší i počet míst, kde se může reagovat."},
  {s:"Přidáte katalyzátor.", a:"up",
   e:"Katalyzátor otevře cestu s nižší aktivační energií. Podle Arrheniovy rovnice i malý pokles Eₐ znamená obrovský nárůst k — a tedy rychlosti. Rovnovážné složení ale nezmění."},
  {s:"Přidáte inhibitor.", a:"down",
   e:"Inhibitor buď blokuje aktivní centra katalyzátoru, nebo zachytává reaktivní meziprodukty (radikály). Zvyšuje efektivní Eₐ nebo přerušuje řetězec — rychlost klesá."},
  {s:"Roztok reaktantů zředíte vodou na dvojnásobný objem.", a:"down",
   e:"Zředění sníží koncentraci všech rozpuštěných látek na polovinu. Rychlost klesne — u reakce celkového řádu 2 na čtvrtinu."},
  {s:"Plynnou reakční směs přesunete do poloviční nádoby (T stejná).", a:"up",
   e:"Menší objem = vyšší koncentrace všech plynů (a vyšší tlak). Rychlost vzroste stejně, jako kdybyste zvýšili tlak."},
  {s:"Do nádoby s plynnými reaktanty přidáte za stálého objemu argon (inertní plyn).", a:"same",
   e:"Celkový tlak sice vzroste, ale <b>koncentrace reaktantů</b> (mol/dm³) se nezměnily — objem je stejný, počet molekul reaktantů také. Argon se srážek účastní, ale nereaguje. Rychlost se nezmění."},
  {s:"Reakční nádobu vložíte do ledové lázně.", a:"down",
   e:"Nižší teplota → menší podíl molekul s E ≥ Eₐ → k klesá. Ochlazení o 10 °C zpomalí typickou reakci 2–4×; proto potraviny v lednici vydrží déle."},
  {s:"Zvýšíte koncentraci látky, která je v rychlostní rovnici nultého řádu.", a:"same",
   e:"Nultý řád znamená [X]⁰ = 1 — koncentrace té látky v rychlostní rovnici nevystupuje. Typicky látka, která vstupuje až do rychlého kroku, nebo reaktant u nasyceného katalyzátoru/enzymu."},
  {s:"Z nevratné reakce průběžně odebíráte produkt.", a:"same",
   e:"Rychlost přímé reakce závisí na koncentracích <b>reaktantů</b>, ne produktů (pokud produkt není katalyzátor nebo inhibitor). Odebírání produktu tedy rychlost nezmění — mění jen rovnovážné složení u vratných reakcí."},
  {s:"Do reakce, která už je v rovnováze, přidáte katalyzátor. Co udělá množství produktu v rovnováze?", a:"same",
   e:"Katalyzátor urychlí <b>obě</b> reakce — přímou i zpětnou — stejným násobkem, protože snižuje bariéru z obou stran. Rovnováhy se dosáhne dřív, ale její poloha (K, výtěžek) je stejná. Časté nedorozumění."},
  {s:"Směs H₂ a Cl₂, která ve tmě nereaguje, ozáříte UV světlem.", a:"up",
   e:"Fotochemická iniciace: světlo rozštěpí Cl₂ na radikály Cl· a spustí řetězovou reakci (výbušně). Záření je faktor u fotochemických reakcí — energie fotonu nahradí aktivační energii iniciace."},
  {s:"Do reakce na povrchu pevného katalyzátoru dáte dvakrát více katalyzátoru (ve stejně jemných zrnech).", a:"up",
   e:"Heterogenní katalýza běží na povrchu — dvojnásobek katalyzátoru je dvojnásobek aktivních center, tedy zhruba dvojnásobná rychlost. Katalyzátor se nespotřebuje, ale jeho <b>množství</b> rychlost ovlivňuje."}
];
