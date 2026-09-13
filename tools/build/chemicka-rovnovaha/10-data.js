/* ============================================================
   T1 · DATA — konstanty, reakce, tabulky
   ============================================================ */
var RGAS = 8.314;          /* J·K⁻¹·mol⁻¹ */
var T298 = 298.15;

/* exponent → unicode horní index (pro výrazy K) */
function supN(n){
  var map={"0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹","-":"⁻","½":"½"};
  return String(n).split("").map(function(ch){return map[ch]||ch;}).join("");
}
/* zlomek jako inline HTML (bez vlastního CSS) */
function fracHTML(num,den){
  return '<span style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;margin:0 .3rem;line-height:1.35">'+
    '<span style="padding:0 .4rem;border-bottom:1.5px solid currentColor">'+num+'</span>'+
    '<span style="padding:0 .4rem">'+den+'</span></span>';
}
/* K ve vědeckém zápisu s českou čárkou: 5,6·10⁵ */
function sci(K,d){
  if(K===0) return "0";
  if(!isFinite(K)) return "∞";
  var e=Math.floor(Math.log10(Math.abs(K)));
  if(e>=-2 && e<=3){ return fmt(K, d===undefined ? (e>=2?0:(e>=0?2:3)) : d); }
  var m=K/Math.pow(10,e);
  var ms=fmt(m,1);
  if(ms==="10"){ m=1; e+=1; ms="1"; }
  return ms+"·10"+supN(e);
}
function expK(dG_kJ,T){ return Math.exp(-dG_kJ*1000/(RGAS*T)); }
function vantHoff(K1,T1,T2,dH_kJ){ return K1*Math.exp(-(dH_kJ*1000/RGAS)*(1/T2-1/T1)); }

/* ---------- reakce pro stavitel výrazu K ----------
   ph: g plyn · aq rozpuštěná látka · lm kapalná složka směsi (píše se) · s pevná · l čistá kapalina / rozpouštědlo (nepíše se)
   K: hodnota (bezrozměrná, relativní koncentrace / tlaky) · KT: podmínky · dH: kJ·mol⁻¹ (na zapsanou rovnici) */
var KRXN=[
 {name:"Syntéza amoniaku", L:[["N₂",1,"g"],["H₂",3,"g"]], R:[["NH₃",2,"g"]],
  K:5.6e5, KT:"25 °C", dH:-92.2, note:"Δn(g) = 2 − 4 = −2, proto tlak posouvá rovnováhu k amoniaku. Při 400 °C klesne K na řádově 10⁻⁴."},
 {name:"Oxidace SO₂ (kontaktní proces)", L:[["SO₂",2,"g"],["O₂",1,"g"]], R:[["SO₃",2,"g"]],
  K:7.6e24, KT:"25 °C", dH:-197.8, note:"Obrovské K při 25 °C — jenže při té teplotě reakce prakticky neběží. Při 700 K je K už jen řádově 10⁵, a to je teplota kontaktního procesu."},
 {name:"Tepelný rozklad vápence", L:[["CaCO₃",1,"s"]], R:[["CaO",1,"s"],["CO₂",1,"g"]],
  K:1.4e-23, KT:"25 °C", dH:178.3, note:"Obě pevné látky z výrazu vypadnou, zbývá jediný člen: K = p(CO₂)/p°. Rovnovážný tlak CO₂ dosáhne 1 bar kolem 1110 K — to je teplota pálení vápna."},
 {name:"Reakce vodního plynu (shift)", L:[["CO",1,"g"],["H₂O",1,"g"]], R:[["CO₂",1,"g"],["H₂",1,"g"]],
  K:1.0e5, KT:"25 °C", dH:-41.2, note:"Voda je tu plyn (pára), takže se do výrazu píše! Vynechává se jen kapalná voda jako rozpouštědlo. Δn(g) = 0 → K_p = K_c a tlak na složení nemá vliv."},
 {name:"Rhodanid železitý (červený komplex)", L:[["Fe³⁺",1,"aq"],["SCN⁻",1,"aq"]], R:[["[FeSCN]²⁺",1,"aq"]],
  K:1.4e2, KT:"25 °C", dH:null, note:"Klasická demonstrace Le Chatelierova principu — přídavek Fe³⁺ nebo SCN⁻ roztok zčervená, přídavek F⁻ (váže Fe³⁺) ho odbarví."},
 {name:"Esterifikace (Fischerova)", L:[["CH₃COOH",1,"lm"],["C₂H₅OH",1,"lm"]], R:[["CH₃COOC₂H₅",1,"lm"],["H₂O",1,"lm"]],
  K:4.0, KT:"25 °C", dH:-3, note:"Pozor, tady voda <b>není</b> rozpouštědlo — vzniká v bezvodé směsi kyseliny a alkoholu jako produkt, a proto se do výrazu píše. Všechny čtyři látky jsou složky jedné kapalné směsi."},
 {name:"Disociace amoniaku ve vodě", L:[["NH₃",1,"aq"],["H₂O",1,"l"]], R:[["NH₄⁺",1,"aq"],["OH⁻",1,"aq"]],
  K:1.8e-5, KT:"25 °C", dH:null, note:"Voda je rozpouštědlo v obrovském nadbytku, její koncentrace (55,5 mol·dm⁻³) se prakticky nemění — je schovaná v konstantě. Tohle K se jmenuje K_b."},
 {name:"Rozpouštění chloridu stříbrného", L:[["AgCl",1,"s"]], R:[["Ag⁺",1,"aq"],["Cl⁻",1,"aq"]],
  K:1.8e-10, KT:"25 °C", dH:null, note:"Pevná látka ve výrazu není — zbývá jen součin koncentrací iontů. Tomuhle K se říká součin rozpustnosti K_s."},
 {name:"Dimerizace oxidu dusičitého (obráceně: disociace N₂O₄)", L:[["N₂O₄",1,"g"]], R:[["NO₂",2,"g"]],
  K:0.148, KT:"25 °C", dH:57.2, note:"Δn(g) = +1, takže K_p = K_c · (c°RT/p°) = K_c · 24,8 při 25 °C. Zahřátí zhnědne (K roste, reakce je endotermická), stlačení zesvětlá."},
 {name:"Syntéza jodovodíku", L:[["H₂",1,"g"],["I₂",1,"g"]], R:[["HI",2,"g"]],
  K:50, KT:"448 °C", dH:-9.4, note:"Δn(g) = 0: K_p = K_c a tlak rovnováhu neposune. Reakce je jen mírně exotermická, K se s teplotou mění pomalu (54 při 425 °C, 50 při 448 °C)."},
 {name:"Disociace chloridu fosforečného", L:[["PCl₅",1,"g"]], R:[["PCl₃",1,"g"],["Cl₂",1,"g"]],
  K:0.042, KT:"250 °C", dH:87.9, note:"Δn(g) = +1. Zředění (větší objem) zvyšuje stupeň disociace — typická přijímačková úloha."},
 {name:"Autoprotolýza vody", L:[["H₂O",2,"l"]], R:[["H₃O⁺",1,"aq"],["OH⁻",1,"aq"]],
  K:1.0e-14, KT:"25 °C", dH:55.8, note:"Rozpouštědlo vypadne úplně, zbude iontový součin vody K_w = [H₃O⁺][OH⁻]. Je endotermická, takže při 37 °C je K_w ≈ 2,4·10⁻¹⁴ a neutrální pH je 6,8, ne 7."}
];

/* ---------- reakce pro simulátor Le Chateliera ----------
   sp: [název, ν (záporné = reaktant), fáze, počáteční množství]  · Kc při T0 (relativní koncentrace, c° = 1 mol·dm⁻³)
   dH kJ·mol⁻¹ na rovnici · V0 dm³ · T0 K */
var LCRXN=[
 {name:"N₂ + 3 H₂ ⇌ 2 NH₃  (ΔH = −92 kJ)", eq:"N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g)",
  sp:[["N₂",-1,"g",1.0],["H₂",-3,"g",3.0],["NH₃",2,"g",0]], K:0.342, T0:700, dH:-92.2, V0:1,
  color:null, why:"exotermická, Δn(g) = −2"},
 {name:"CaCO₃(s) ⇌ CaO(s) + CO₂  (ΔH = +178 kJ)", eq:"CaCO₃(s) ⇌ CaO(s) + CO₂(g)",
  sp:[["CaCO₃",-1,"s",0.5],["CaO",1,"s",0.1],["CO₂",1,"g",0]], K:9.1e-3, T0:1100, dH:178.3, V0:1,
  color:null, why:"endotermická, heterogenní, Δn(g) = +1"},
 {name:"N₂O₄ ⇌ 2 NO₂  (ΔH = +57 kJ, barva)", eq:"N₂O₄(g) ⇌ 2 NO₂(g)",
  sp:[["N₂O₄",-1,"g",0.05],["NO₂",2,"g",0]], K:6.0e-3, T0:298, dH:57.2, V0:1,
  color:"NO₂", why:"endotermická, Δn(g) = +1"},
 {name:"H₂ + I₂ ⇌ 2 HI  (ΔH = −9 kJ, Δn = 0)", eq:"H₂(g) + I₂(g) ⇌ 2 HI(g)",
  sp:[["H₂",-1,"g",1.0],["I₂",-1,"g",1.0],["HI",2,"g",0]], K:54, T0:698, dH:-9.4, V0:1,
  color:null, why:"mírně exotermická, Δn(g) = 0"}
];

/* ---------- trenažér „kam se rovnováha posune“ ----------
   a: "R" doprava · "L" doleva · "0" neposune */
var SHIFT=[
 {r:"N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g), ΔH = −92 kJ", z:"Zvýšíme tlak (zmenšíme objem).", a:"R",
  e:"Vlevo jsou <b>4 moly plynu</b>, vpravo <b>2</b>. Soustava zmírní zvýšení tlaku tím, že sníží počet částic — posune se ke straně s menším počtem molů plynu, tedy <b>doprava</b>. Přesně proto jede Haberův proces při 200 bar."},
 {r:"N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g), ΔH = −92 kJ", z:"Zvýšíme teplotu.", a:"L",
  e:"Reakce doprava je exotermická (teplo uvolňuje). Dodané teplo soustava „spotřebuje“ endotermickým směrem, tedy <b>doleva</b>. Tady se mění i K — klesá. Průmysl to obětuje kvůli rychlosti."},
 {r:"N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g), ΔH = −92 kJ", z:"Přidáme železný katalyzátor.", a:"0",
  e:"Katalyzátor urychluje <b>obě</b> reakce stejně — přímou i zpětnou. K se nemění, rovnovážné složení se nemění. Jediné, co se změní, je čas, za který se rovnováha ustaví."},
 {r:"N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g), ΔH = −92 kJ", z:"Vzniklý amoniak průběžně zkapalňujeme a odvádíme.", a:"R",
  e:"Odebrání produktu: Q klesne pod K a soustava produkt dorábí — posun <b>doprava</b>. Recyklace nezreagovaných plynů a odvod NH₃ je klíč k vysoké celkové konverzi, přestože jeden průchod dá jen kolem 15 %."},
 {r:"CaCO₃(s) ⇌ CaO(s) + CO₂(g), ΔH = +178 kJ", z:"Přidáme do pece víc uhličitanu vápenatého.", a:"0",
  e:"Pevná látka ve výrazu pro K <b>není</b> — její „koncentrace“ je konstantní, dokud je jí aspoň trochu. Přidání CaCO₃ tedy rovnováhu neposune; rovnovážný tlak CO₂ zůstane stejný."},
 {r:"CaCO₃(s) ⇌ CaO(s) + CO₂(g), ΔH = +178 kJ", z:"Zvýšíme tlak v uzavřené peci.", a:"L",
  e:"Jediný plyn je vpravo: Δn(g) = +1. Zvýšení tlaku soustava zmírní snížením počtu plynných částic — CO₂ se váže zpět na CaO, posun <b>doleva</b>. Proto se vápno pálí v otevřené peci s tahem, kde CO₂ odchází."},
 {r:"H₂(g) + I₂(g) ⇌ 2 HI(g), ΔH = −9 kJ", z:"Zvýšíme tlak (zmenšíme objem).", a:"0",
  e:"Vlevo 2 moly plynu, vpravo 2 moly plynu: <b>Δn(g) = 0</b>. Stlačení zvýší všechny koncentrace stejně, Q se nezmění (čitatel i jmenovatel jsou druhého stupně) — rovnováha se <b>neposune</b>."},
 {r:"N₂O₄(g) ⇌ 2 NO₂(g), ΔH = +57 kJ (NO₂ je hnědý, N₂O₄ bezbarvý)", z:"Ampuli ponoříme do ledové vody.", a:"L",
  e:"Ochlazení odebírá teplo. Soustava ho doplní exotermickým směrem — tím je zpětná reakce (dimerizace). Posun <b>doleva</b>, plyn <b>zesvětlá</b>. K klesá, protože jde o endotermickou reakci."},
 {r:"N₂O₄(g) ⇌ 2 NO₂(g), ΔH = +57 kJ", z:"Zvětšíme objem stříkačky (snížíme tlak).", a:"R",
  e:"Δn(g) = +1. Snížení tlaku soustava zmírní zvýšením počtu částic, tedy disociací N₂O₄ na dvě molekuly NO₂ — <b>doprava</b>, plyn po chvíli zhnědne (i když se nejdřív zředěním zesvětlil)."},
 {r:"2 SO₂(g) + O₂(g) ⇌ 2 SO₃(g), ΔH = −198 kJ", z:"Přidáme argon při <b>konstantním objemu</b>.", a:"0",
  e:"Inertní plyn za stálého objemu nezmění <b>parciální tlaky</b> ani koncentrace SO₂, O₂ a SO₃ — celkový tlak sice stoupne, ale Q zůstane rovno K. Rovnováha se <b>neposune</b>."},
 {r:"2 SO₂(g) + O₂(g) ⇌ 2 SO₃(g), ΔH = −198 kJ", z:"Přidáme argon při <b>konstantním tlaku</b>.", a:"L",
  e:"Aby zůstal celkový tlak stejný, musí objem vzrůst — všechny reakční plyny se zředí. To je jako snížení tlaku: soustava zvýší počet částic, posun <b>doleva</b> (Δn(g) = −1). Tohle je oblíbený chyták."},
 {r:"Fe³⁺(aq) + SCN⁻(aq) ⇌ [FeSCN]²⁺(aq) (červený)", z:"Přidáme pár krystalků KSCN.", a:"R",
  e:"Zvýšení koncentrace reaktantu: Q &lt; K, soustava reaktant spotřebovává — posun <b>doprava</b>, roztok <b>ztmavne</b> do červena. Klasický školní pokus."},
 {r:"Fe³⁺(aq) + SCN⁻(aq) ⇌ [FeSCN]²⁺(aq) (červený)", z:"Přidáme NaF; fluoridové ionty vážou Fe³⁺ do bezbarvého [FeF₆]³⁻.", a:"L",
  e:"Fluorid odebírá reaktant Fe³⁺ z rovnováhy. Q &gt; K, komplex se rozpadá, aby Fe³⁺ doplnil — posun <b>doleva</b>, červená barva <b>zmizí</b>."},
 {r:"CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g), ΔH = −41 kJ", z:"Snížíme celkový tlak.", a:"0",
  e:"Δn(g) = 2 − 2 = 0. Tlak nemá na složení vliv. V průmyslu se proto shift reakce řídí přebytkem vodní páry a teplotou, ne tlakem."},
 {r:"CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g), ΔH = −41 kJ", z:"Snížíme teplotu (druhý, „nízkoteplotní“ stupeň konvertoru).", a:"R",
  e:"Exotermická reakce: ochlazení posouvá <b>doprava</b> a K roste. Proto se konverze dokončuje při 200–250 °C na měděném katalyzátoru — při vyšší teplotě by v plynu zbylo příliš mnoho CO."},
 {r:"Hb + 4 O₂ ⇌ Hb(O₂)₄ (vazba kyslíku na hemoglobin)", z:"Krev doteče do svalu, kde je nízký parciální tlak O₂.", a:"L",
  e:"Úbytek reaktantu O₂: Q &gt; K, komplex se rozpadá a kyslík se uvolňuje — posun <b>doleva</b>. V plicích je to naopak: vysoký p(O₂) tlačí rovnováhu doprava. Tělo je učebnice Le Chateliera."},
 {r:"CO₂(aq) + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻ (pufr v krvi)", z:"Člověk hyperventiluje a vydýchává hodně CO₂.", a:"L",
  e:"Odebrání CO₂ posune obě rovnováhy <b>doleva</b>: H⁺ se spotřebovává, koncentrace H⁺ klesá a pH krve <b>roste</b> (respirační alkalóza). Proto pomáhá dýchat do sáčku — CO₂ se vrací."},
 {r:"PCl₅(g) ⇌ PCl₃(g) + Cl₂(g), ΔH = +88 kJ", z:"Zvýšíme teplotu.", a:"R",
  e:"Endotermická reakce: dodané teplo soustava spotřebuje směrem <b>doprava</b>, K roste. Endotermické rozklady jsou vždycky podporovány zahřátím."},
 {r:"CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O, K = 4", z:"Do reakční směsi přidáme vodu.", a:"L",
  e:"Voda tady <b>je</b> v rovnovážném výrazu (není rozpouštědlem, vzniká jako produkt v bezvodé směsi). Přidání produktu posouvá <b>doleva</b> — ester hydrolyzuje. Proto se při esterifikaci voda naopak odvádí."},
 {r:"NH₃(aq) + H₂O ⇌ NH₄⁺(aq) + OH⁻(aq), K_b = 1,8·10⁻⁵", z:"Do roztoku amoniaku přidáme pevný NH₄Cl.", a:"L",
  e:"Přidáváme produkt NH₄⁺ (společný iont). Posun <b>doleva</b>, koncentrace OH⁻ klesá, pH klesá. Přesně takhle se vyrábí amoniakální pufr."},
 {r:"2 NO₂(g) ⇌ N₂O₄(g), ΔH = −57 kJ", z:"Stlačíme plyn ve stříkačce na poloviční objem.", a:"R",
  e:"Pozor na směr zápisu: tady je dimer <b>vpravo</b>. Δn(g) = −1, zvýšení tlaku posouvá ke straně s méně částicemi, tedy <b>doprava</b> k N₂O₄. Plyn po ustavení rovnováhy zesvětlá (proti okamžitému ztmavnutí stlačením)."},
 {r:"Ag⁺(aq) + Cl⁻(aq) ⇌ AgCl(s)", z:"K nasycenému roztoku AgCl přidáme roztok NaCl.", a:"R",
  e:"Přidali jsme reaktant Cl⁻ (společný iont). Rovnováha se posune <b>doprava</b>, vyloučí se další sraženina AgCl a koncentrace Ag⁺ v roztoku klesne. Rozpustnost soli se v přítomnosti společného iontu snižuje."}
];

/* ---------- průmyslové a biologické rovnováhy ---------- */
var INDUSTRY=[
 {n:"Haber–Boschova syntéza amoniaku", eq:"N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g)", dH:-92.2, g:"prumysl",
  cond:"400–500 °C · 150–300 bar · Fe s K₂O/Al₂O₃",
  lc:"Vysoký tlak (Δn = −2) tlačí rovnováhu k NH₃; nižší teplota by zvýšila K, ale zpomalila reakci — proto <b>kompromis 450 °C</b>. NH₃ se zkapalňuje a odvádí, nezreagované plyny jdou zpět (recyklace). Jeden průchod ≈ 15 %, celkem přes 95 %."},
 {n:"Kontaktní proces (výroba H₂SO₄)", eq:"2 SO₂(g) + O₂(g) ⇌ 2 SO₃(g)", dH:-197.8, g:"prumysl",
  cond:"400–450 °C · 1–2 bar · V₂O₅",
  lc:"Nadbytek vzduchu (O₂) posouvá doprava; K je tak velké, že vysoký tlak není potřeba. Exotermická reakce → směs se mezi vrstvami katalyzátoru chladí. Konverze 99,7 %."},
 {n:"Ostwaldův proces (výroba HNO₃)", eq:"4 NH₃(g) + 5 O₂(g) ⇌ 4 NO(g) + 6 H₂O(g)", dH:-906, g:"prumysl",
  cond:"800–900 °C · 4–10 bar · Pt–Rh síťka · kontakt ≈ 1 ms",
  lc:"Vysoká teplota tu slouží kinetice a selektivitě (jinak vzniká N₂). Následná oxidace 2 NO + O₂ ⇌ 2 NO₂ je exotermická a probíhá za chladu — nižší teplota ji posouvá doprava."},
 {n:"Syntéza methanolu", eq:"CO(g) + 2 H₂(g) ⇌ CH₃OH(g)", dH:-91, g:"prumysl",
  cond:"220–300 °C · 50–100 bar · Cu/ZnO/Al₂O₃",
  lc:"Δn = −2 → tlak posouvá k methanolu; exotermická → co nejnižší teplota, jakou katalyzátor dovolí. Methanol se kondenzuje a odvádí, plyny se recyklují."},
 {n:"Reakce vodního plynu (shift)", eq:"CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g)", dH:-41.2, g:"prumysl",
  cond:"1. stupeň 350–450 °C (Fe₃O₄/Cr₂O₃) · 2. stupeň 200–250 °C (Cu/ZnO)",
  lc:"Δn = 0 → tlak nepomůže. Používá se <b>nadbytek páry</b> a dva teplotní stupně: horký kvůli rychlosti, studený kvůli rovnováze (K roste s klesající T)."},
 {n:"Esterifikace (výroba esterů, vonné látky)", eq:"CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O", dH:-3, g:"prumysl",
  cond:"var · katalyzátor H₂SO₄ · K ≈ 4",
  lc:"Prakticky termoneutrální, teplota K nemění — slouží jen rychlosti. Výtěžek se zvyšuje <b>nadbytkem alkoholu</b> nebo <b>odváděním vody</b> (azeotropická destilace)."},
 {n:"Deaconův proces (chlor z HCl)", eq:"4 HCl(g) + O₂(g) ⇌ 2 Cl₂(g) + 2 H₂O(g)", dH:-114.4, g:"prumysl",
  cond:"400–450 °C · CuCl₂ (moderně RuO₂ při ≈ 300 °C)",
  lc:"Exotermická, Δn = −1: pomáhá nižší teplota, mírně vyšší tlak a nadbytek vzduchu. Historicky byl výtěžek nízký kvůli rovnováze — proto dnes převažuje elektrolýza."},
 {n:"Pálení vápna", eq:"CaCO₃(s) ⇌ CaO(s) + CO₂(g)", dH:178.3, g:"prumysl",
  cond:"900–1000 °C · šachtová nebo rotační pec",
  lc:"Endotermická → vysoká teplota (K = 1 při ≈ 1110 K). CO₂ se z pece <b>odvádí tahem</b>, takže p(CO₂) je pod rovnovážným tlakem a rozklad běží do konce."},
 {n:"Vazba kyslíku na hemoglobin", eq:"Hb + 4 O₂ ⇌ Hb(O₂)₄", dH:-60, g:"bio",
  cond:"plíce p(O₂) ≈ 13 kPa · tkáně ≈ 5 kPa · 37 °C",
  lc:"V plicích vysoký p(O₂) → doprava (nasycení ≈ 98 %); ve tkáních nízký p(O₂), vyšší CO₂ a nižší pH → doleva, O₂ se uvolní (Bohrův efekt). CO se váže ≈ 200× pevněji a rovnováhu „ukradne“."},
 {n:"Hydrogenuhličitanový pufr krve", eq:"CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻", dH:null, g:"bio",
  cond:"pH krve 7,35–7,45 · [HCO₃⁻]/[CO₂] ≈ 20 : 1",
  lc:"Přebytek H⁺ se váže na HCO₃⁻ a odchází jako CO₂ plícemi (hyperventilace posouvá doleva → pH roste); ledviny doplňují HCO₃⁻. Dvě orgánové soustavy řídí jednu rovnováhu."},
 {n:"Dimerizace NO₂ (demonstrace)", eq:"2 NO₂(g) ⇌ N₂O₄(g)", dH:-57.2, g:"prumysl",
  cond:"ampule · led vs. horká voda",
  lc:"Ochlazení → exotermický směr → bezbarvý N₂O₄ (ampule zesvětlá). Zahřátí → hnědý NO₂. Stlačení stříkačky: nejdřív tmavší (koncentrace), po chvíli světlejší (posun k dimeru)."}
];
