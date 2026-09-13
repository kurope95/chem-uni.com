/* ============================================================
   SPOLEČNÁ DATA A POMOCNÍCI — Zlomky a závorky
   ============================================================ */

/* --- drobní pomocníci --- */
function zEsc(s){ return EX.esc(s); }

/* deterministický generátor — aby se dva studenti dohodli, co viděli */
function zRnd(seed){
  var s = seed || 1;
  return function(){
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}
function zShuffle(arr, rnd){
  var a = arr.slice();
  for(var i=a.length-1; i>0; i--){
    var j = Math.floor(rnd()*(i+1));
    var t = a[i]; a[i]=a[j]; a[j]=t;
  }
  return a;
}

/* přepínač .segmented: vrátí aktuální hodnotu, obslouží aria-pressed */
function zSeg(id, cb){
  var box = document.getElementById(id);
  if(!box) return;
  $$("button", box).forEach(function(b){
    b.addEventListener("click", function(){
      $$("button", box).forEach(function(x){ x.setAttribute("aria-pressed", x===b ? "true" : "false"); });
      if(cb) cb(b.getAttribute("data-v"));
    });
  });
}
function zSegVal(id){
  var box = document.getElementById(id);
  if(!box) return null;
  var b = $('button[aria-pressed="true"]', box);
  return b ? b.getAttribute("data-v") : null;
}

/* jsou dva výrazy početně totožné? ověřuje se dosazením, ne strukturou —
   c · V a V · c tedy musí vyjít jako totéž */
function zSame(s1, s2){
  var names;
  try{
    names = EX.vars(s1);
    EX.vlist(EX.parse(s2), names);
  }catch(e){ return false; }
  for(var i=0;i<8;i++){
    var env = {};
    for(var k=0;k<names.length;k++){ env[names[k]] = 2 + ((i*3 + k*5) % 9); }
    var a, b;
    try{ a = EX.evs(s1, env); b = EX.evs(s2, env); }catch(e){ return false; }
    if(!isFinite(a) || !isFinite(b)) return false;
    if(Math.abs(a-b) > 1e-9*Math.max(1, Math.abs(a), Math.abs(b))) return false;
  }
  return true;
}

/* skóre trenažéru */
function zScore(){
  return { ok:0, all:0,
    txt:function(){ return this.ok + " / " + this.all + " správně"; },
    pct:function(){ return this.all ? this.ok/this.all : 0; } };
}

/* ============================================================
   DVOJICE ZÁPISŮ — model v kapitole 00
   „core“ je pravá strana; levá strana je jen symbol.
   ============================================================ */
var DZ_LIST = [
  { sym:"c", core:"m / (M · V)", name:"Látková koncentrace z navážky",
    calc:"5,85 ÷ ( 58,44 × 0,250 )",
    use:"Do řádku textu i do kalkulačky se hodí lineární tvar. Na papír při odvození patří zlomek — na první pohled je vidět, že <span class=\"q\">M</span> i <span class=\"q\">V</span> jsou dole." },
  { sym:"n", core:"m / M", name:"Látkové množství z hmotnosti",
    calc:"5,85 ÷ 58,44",
    use:"Nejjednodušší možný zlomek: jeden člen nahoře, jeden dole. Závorky nejsou potřeba v žádném ze zápisů." },
  { sym:"n", core:"p · V / (R · T)", name:"Látkové množství ze stavové rovnice",
    calc:"101,325 × 2,50 ÷ ( 8,314 × 298,15 )",
    use:"Klasická past: <span class=\"fx\">p · V / R · T</span> bez závorky znamená <span class=\"fx\">(p · V / R) · T</span>, což je o šest řádů vedle." },
  { sym:"c₂", core:"c₁ · V₁ / V₂", name:"Koncentrace po zředění",
    calc:"2,00 × 25,0 ÷ 250",
    use:"Tady závorka ve jmenovateli není potřeba, protože dole stojí jediný člen. Přesto se vyplatí ji napsat — nic nezkazí." },
  { sym:"w", core:"m₁ / (m₁ + m₂)", name:"Hmotnostní zlomek složky",
    calc:"20 ÷ ( 20 + 80 )",
    use:"Součet ve jmenovateli je nejnebezpečnější místo v chemii vůbec: bez závorky se <span class=\"mono\">m₁ / m₁ + m₂</span> čte jako <span class=\"fx\">1 + m₂</span>." },
  { sym:"c", core:"(c₁ · V₁ + c₂ · V₂) / (V₁ + V₂)", name:"Koncentrace po smíchání dvou roztoků",
    calc:"( 0,10 × 200 + 0,50 × 300 ) ÷ ( 200 + 300 )",
    use:"Dvě závorky, jedna nahoře a jedna dole. Ve stohovaném zápisu zmizí obě — a přesně to je důvod, proč se odvozuje na papíře." },
  { sym:"t½", core:"0,693 / k", name:"Poločas reakce prvního řádu",
    calc:"0,693 ÷ 0,0578",
    use:"Malý zlomek, ale pozor na pokračování: <span class=\"fx\">0,693 / k · 2</span> je dvojnásobek poločasu, kdežto <span class=\"fx\">0,693 / (k · 2)</span> je poločas při dvojnásobné rychlostní konstantě." },
  { sym:"m", core:"M · I · t / (z · F)", name:"Vyloučená hmotnost při elektrolýze",
    calc:"63,55 × 2,00 × 1800 ÷ ( 2 × 96485 )",
    use:"Tři členy nahoře, dva dole. Ve stohovaném tvaru se to čte samo; na řádku bez závorky vyjde nesmysl o deset řádů vedle." },
  { sym:"E", core:"R · T / (z · F)", name:"Nernstův člen",
    calc:"8,314 × 298,15 ÷ ( 2 × 96485 )",
    use:"Nejčastěji chybně přepisovaný zlomek v celé elektrochemii. Bez závorky se <span class=\"q\">F</span> ocitne v čitateli a výsledek naroste asi desetimiliardkrát." }
];

/* ============================================================
   KAM PATŘÍ ZÁVORKA — trenažér v kapitole 01
   Správná varianta se určuje DOSAZENÍM, ne podle pořadí v poli.
   ============================================================ */
var KZ_LIST = [
  { e:"12 / 3 · 2", o:["(12 / 3) · 2", "12 / (3 · 2)"],
    why:"Dělení a násobení mají stejnou přednost, takže se čtou zleva doprava: nejdřív 12 / 3 = 4, pak · 2." },
  { e:"2 / 3 · 4", o:["(2 / 3) · 4", "2 / (3 · 4)"],
    why:"Bez závorky násobíme až výsledek dělení. Rozdíl je šestnáctinásobný, což u koncentrace znamená úplně jiný roztok." },
  { e:"36 / 6 / 3", o:["(36 / 6) / 3", "36 / (6 / 3)"],
    why:"Dvě dělení za sebou se také čtou zleva: (36 / 6) / 3 = 2. Čtení zprava by dalo 18." },
  { e:"100 / 5 · 2", o:["(100 / 5) · 2", "100 / (5 · 2)"],
    why:"Zleva doprava: 100 / 5 = 20, pak · 2 = 40. Varianta se závorkou dole dá 10." },
  { e:"24 / 4 · 2", o:["(24 / 4) · 2", "24 / (4 · 2)"],
    why:"Zleva doprava vyjde 12. Kdyby ve jmenovateli měly být oba činitele, musela by tam být závorka." },
  { e:"8 + 4 / 2", o:["8 + (4 / 2)", "(8 + 4) / 2"],
    why:"Dělení má přednost před sčítáním, takže se nejdřív dělí. Součet v čitateli by musel být v závorce." },
  { e:"18 / 3 + 3", o:["(18 / 3) + 3", "18 / (3 + 3)"],
    why:"Dělení má přednost před sčítáním. Součet ve jmenovateli se musí uzávorkovat, jinak tam prostě není." },
  { e:"20 / 2 / 5", o:["(20 / 2) / 5", "20 / (2 / 5)"],
    why:"Řetěz dělení se vyhodnocuje zleva: 20 / 2 = 10, pak / 5 = 2." },
  { e:"15 / 5 · 3", o:["(15 / 5) · 3", "15 / (5 · 3)"],
    why:"Zleva doprava vyjde 9, se závorkou ve jmenovateli 1. Devítinásobný rozdíl ze tří malých čísel." },
  { e:"48 / 8 · 3", o:["(48 / 8) · 3", "48 / (8 · 3)"],
    why:"Zleva doprava vyjde 18, se závorkou dole 2. Devítinásobný rozdíl." },
  { e:"30 / 5 − 1", o:["(30 / 5) − 1", "30 / (5 − 1)"],
    why:"Dělení má přednost před odčítáním. Rozdíl ve jmenovateli musí být v závorce." },
  { e:"7 + 21 / 7", o:["7 + (21 / 7)", "(7 + 21) / 7"],
    why:"Dělení se provede dřív než sčítání, takže vyjde 10. Čtení odshora dolů jako u zlomku by dalo 4." }
];

/* ============================================================
   ZKOUŠEČKA ROVNOSTI — nabídka výrazů (kapitola 01 a 07)
   ============================================================ */
var ZR_LIST = [
  "a / b · c", "a / (b · c)", "(a / b) / c", "a / (b / c)", "(a · c) / b",
  "a / b + c", "a / (b + c)", "(a + b) / a", "(a + b) / c", "a / c + b / c",
  "1 / (a / b)", "b / a", "(a · b) / (a · c)", "b / c", "(a + b) / (a + c)",
  "a − (b − c)", "a − b + c", "a − b − c", "(a · b) / a", "b",
  "a · b / c", "a · (b / c)"
];

/* ============================================================
   KROKOVAČ POŘADÍ OPERACÍ — kapitola 02
   ============================================================ */
var KO_LIST = [
  { e:"2 / 3 · 4",       n:"Klasika. Dělení i násobení mají stejnou přednost, takže se jede zleva." },
  { e:"12 / 3 · 2",      n:"Stejný tvar s hezčími čísly — výsledek 8, ne 2." },
  { e:"8 + 4 / 2",       n:"Dělení má přednost před sčítáním, i když stojí až vpravo." },
  { e:"(8 + 4) / 2",     n:"Závorka předběhne všechno ostatní — teprve pak se dělí." },
  { e:"36 / 6 / 3",      n:"Dvě dělení za sebou: zleva doprava." },
  { e:"36 / (6 / 3)",    n:"Táž čísla, ale závorka změní pořadí i výsledek." },
  { e:"2 · 3 + 4 · 5",   n:"Dva součiny se spočítají dřív než jejich součet." },
  { e:"100 / 5 · 2 + 1", n:"Nejdřív celý řetěz dělení a násobení zleva, teprve nakonec sčítání." },
  { e:"(2 + 3) / (7 − 2)", n:"Dvě závorky se vyhodnotí zvlášť, teprve pak se dělí." },
  { e:"48 / (8 · 3)",    n:"Závorka ve jmenovateli přijde na řadu jako první." }
];

/* ============================================================
   SKLÁDAČKA SLOŽENÉHO ZLOMKU — kapitola 04
   ============================================================ */
var SZ_LIST = [
  { name:"Koncentrace přes látkové množství",
    from:"(m / M) / V", to:"m / (M · V)",
    steps:[
      { e:"(m / M) / V", n:"Výchozí složený zlomek. Hlavní zlomková čára je ta <b>delší</b> — dělí <span class=\"fx\">m / M</span> objemem <span class=\"q\">V</span>." },
      { e:"(m / M) · (1 / V)", n:"Dělit číslem znamená násobit jeho převrácenou hodnotou — z dělení objemem se stane násobení zlomkem <span class=\"fx\">1 / V</span>." },
      { e:"(m · 1) / (M · V)", n:"Dva zlomky se násobí „čitatel krát čitatel, jmenovatel krát jmenovatel“." },
      { e:"m / (M · V)", n:"Násobení jedničkou nic nemění. Hotovo — jeden zlomek, dva členy dole." }
    ],
    real:"Přesně tenhle řetěz stojí za vzorcem <span class=\"fx\">c = m / (M · V)</span>: dosadíte <span class=\"fx\">n = m / M</span> do <span class=\"fx\">c = n / V</span>." },
  { name:"Dělení zlomkem — obecně",
    from:"a / (b / c)", to:"(a · c) / b",
    steps:[
      { e:"a / (b / c)", n:"Zlomek je tentokrát ve <b>jmenovateli</b>. Hlavní čára je opět ta delší." },
      { e:"a · (c / b)", n:"Dělit zlomkem <span class=\"fx\">b / c</span> znamená násobit jeho převrácenou hodnotou <span class=\"fx\">c / b</span>." },
      { e:"(a · c) / b", n:"Vynásobíme a máme jediný zlomek. Všimněte si, že <span class=\"q\">c</span> se přestěhovalo nahoru." },
      { e:"(a · c) / b", n:"Kontrola dosazením: pro <span class=\"q\">a</span> = 2, <span class=\"q\">b</span> = 3, <span class=\"q\">c</span> = 5 vyjde vlevo i vpravo 3,333." }
    ],
    real:"Tohle je jádro všech složených zlomků. Zbytek jsou jen konkrétní písmena." },
  { name:"Zlomek děleno zlomkem",
    from:"(a / b) / (c / d)", to:"(a · d) / (b · c)",
    steps:[
      { e:"(a / b) / (c / d)", n:"Nahoře zlomek, dole zlomek. Hlavní čára je uprostřed." },
      { e:"(a / b) · (d / c)", n:"Spodní zlomek se převrátí a dělení se změní na násobení." },
      { e:"(a · d) / (b · c)", n:"Čitatel krát čitatel, jmenovatel krát jmenovatel. Křížové pravidlo." },
      { e:"(a · d) / (b · c)", n:"Kontrola: pro 2, 3, 5, 7 vyjde vlevo (2 / 3) / (5 / 7) i vpravo 14 / 15, tedy 0,9333." }
    ],
    real:"Odsud pochází pravidlo „křížem“, které jste se učili na základní škole — je to jen zkratka pro tenhle postup." },
  { name:"Převrácená hodnota",
    from:"1 / (a / b)", to:"b / a",
    steps:[
      { e:"1 / (a / b)", n:"Jednička dělená zlomkem." },
      { e:"1 · (b / a)", n:"Zlomek ve jmenovateli se převrátí." },
      { e:"b / a", n:"Násobení jedničkou zmizí. Převrácená hodnota zlomku je tentýž zlomek vzhůru nohama." },
      { e:"b / a", n:"Kontrola: pro <span class=\"q\">a</span> = 4, <span class=\"q\">b</span> = 5 je <span class=\"fx\">1 / (4 / 5)</span> = 1,25 a <span class=\"fx\">5 / 4</span> = 1,25." }
    ],
    real:"Tenhle případ potkáte u rychlostních konstant a poločasů, kdykoli se počítá „na jednotku něčeho“." }
];
