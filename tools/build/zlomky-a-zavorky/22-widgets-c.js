/* ============================================================
   MODEL 8 (k05) — ZÁPORNÝ EXPONENT VERSUS ZLOMEK
   ============================================================ */
var ZE_LIST = [
  { f:"mol / dm³",     n:"mol·dm⁻³",        v:"látková koncentrace", s:"mol na decimetr krychlový" },
  { f:"g / mol",       n:"g·mol⁻¹",         v:"molární hmotnost", s:"gram na mol" },
  { f:"J / (K · mol)", n:"J·K⁻¹·mol⁻¹",     v:"molární plynová konstanta, molární tepelná kapacita, entropie", s:"joule na kelvin a na mol" },
  { f:"m / s",         n:"m·s⁻¹",           v:"rychlost", s:"metr za sekundu" },
  { f:"mol / (dm³ · s)", n:"mol·dm⁻³·s⁻¹",  v:"reakční rychlost", s:"mol na decimetr krychlový za sekundu" },
  { f:"kg / m³",       n:"kg·m⁻³",          v:"hustota v soustavě SI", s:"kilogram na metr krychlový" },
  { f:"C / mol",       n:"C·mol⁻¹",         v:"Faradayova konstanta", s:"coulomb na mol" },
  { f:"dm³ / mol",     n:"dm³·mol⁻¹",       v:"molární objem plynu", s:"decimetr krychlový na mol" },
  { f:"1 / s",         n:"s⁻¹",             v:"rychlostní konstanta reakce prvního řádu", s:"jedna ku sekundě, čti „za sekundu“" },
  { f:"J / (g · K)",   n:"J·g⁻¹·K⁻¹",       v:"měrná tepelná kapacita", s:"joule na gram a na kelvin" },
  { f:"kJ / mol",      n:"kJ·mol⁻¹",        v:"reakční enthalpie, aktivační energie", s:"kilojoule na mol" },
  { f:"dm³ / (mol · s)", n:"dm³·mol⁻¹·s⁻¹", v:"rychlostní konstanta reakce druhého řádu", s:"decimetr krychlový na mol za sekundu" }
];

function initZe(){
  $("#zeSel").innerHTML = ZE_LIST.map(function(z,i){
    return '<option value="'+i+'">'+EX.esc(z.n)+" — "+EX.esc(z.v)+"</option>";
  }).join("");
}
function drawZe(){
  var z = ZE_LIST[+$("#zeSel").value || 0];
  var dir = zSegVal("zeDir") || "toneg";
  var box = $("#zeOut");
  var c1 = (dir === "toneg") ? "convcell" : "convcell hi";
  var c3 = (dir === "toneg") ? "convcell hi" : "convcell";
  box.innerHTML =
    '<div class="'+c1+'"><span class="cu">Zlomkem, stohovaně</span><span class="cv">'+EX.stks(z.f)+"</span></div>"+
    '<div class="convcell"><span class="cu">Zlomkem, na řádku</span><span class="cv">'+EX.esc(z.f)+"</span></div>"+
    '<div class="'+c3+'"><span class="cu">Se záporným exponentem</span><span class="cv">'+EX.esc(z.n)+"</span></div>"+
    '<div class="convcell"><span class="cu">Jak se to čte nahlas</span><span class="cv" style="font-size:.88rem;white-space:normal">'+EX.esc(z.s)+"</span></div>";
  var msg = $("#zeMsg");
  if(dir === "toneg"){
    msg.innerHTML = "<b>Ze zlomku na exponent:</b> každou jednotku, která stojí pod čarou, přesuňte nahoru a otočte jí znaménko exponentu. "+
      "Z <span class=\"fx\">"+EX.esc(z.f)+"</span> se tak stane <b>"+EX.esc(z.n)+"</b>. Násobicí tečka mezi jednotkami zůstává, dělení mizí.";
  } else {
    msg.innerHTML = "<b>Z exponentu na zlomek:</b> každou jednotku se záporným exponentem sundejte pod čáru a znaménko otočte na kladné. "+
      "Z <b>"+EX.esc(z.n)+"</b> se tak stane <span class=\"mono\">"+EX.esc(z.f)+"</span>. Pokud jdou dolů dvě jednotky, patří obě do jednoho jmenovatele — tedy do závorky.";
  }
  if(window.renderFractions) window.renderFractions(box);
}

/* ============================================================
   MODEL 9 (k06) — DETEKTOR CHYBY V KRÁCENÍ
   O tom, jestli je krácení legální, rozhoduje dosazení, ne autor.
   ============================================================ */
var DK_LIST = [
  { a:"(a · b) / a", b:"b",
    why:"V čitateli i ve jmenovateli stojí <span class=\"q\">a</span> jako <b>činitel</b> celého výrazu. Takový činitel se krátit smí." },
  { a:"(a + b) / a", b:"b",
    why:"V čitateli je <span class=\"q\">a</span> jen jedním <b>sčítancem</b>, ne činitelem celého čitatele. Krátí se výhradně činitelé." },
  { a:"(a + b) / (a + c)", b:"b / c",
    why:"<span class=\"q\">a</span> je sčítanec na obou stranách, ne činitel. Škrtnutí sčítance je nejčastější chyba v celé algebře." },
  { a:"(a · b) / (a · c)", b:"b / c",
    why:"Nahoře i dole je <span class=\"q\">a</span> činitelem. Zlomek se dá rozepsat jako <span class=\"fx\">(a / a) · (b / c)</span> a první závorka je jednička." },
  { a:"(a + b) / b", b:"a",
    why:"Zase sčítanec. Správný výsledek je <span class=\"mono\">a / b + 1</span>, ne <span class=\"q\">a</span>." },
  { a:"(a · b + a · c) / a", b:"b + c",
    why:"Tady <span class=\"q\">a</span> činitelem celého čitatele <b>je</b> — jen je potřeba ho nejdřív vytknout: <span class=\"fx\">a · (b + c)</span>. Pak se krátí." },
  { a:"(a · b + c) / b", b:"a + c",
    why:"<span class=\"q\">b</span> je činitelem jen prvního sčítance, ve druhém není vůbec. Vytknout se nedá, takže se nedá ani krátit." },
  { a:"(a · b) / (b · c)", b:"a / c",
    why:"<span class=\"q\">b</span> je činitelem nahoře i dole, takže se vykrátí a zbude <span class=\"fx\">a / c</span>." },
  { a:"(a − b) / a", b:"1 − b / a",
    why:"Zlomek se rozdělí na dva: <span class=\"fx\">a / a</span> mínus <span class=\"fx\">b / a</span>. První je jednička. Dělit součet nebo rozdíl po členech se smí." },
  { a:"(a − b) / a", b:"1 − b",
    why:"Rozdělit zlomek po členech se smí, ale <span class=\"q\">a</span> ve jmenovatele druhého členu musí zůstat: správně je <span class=\"mono\">1 − b / a</span>." },
  { a:"(2 · a) / (2 · b)", b:"a / b",
    why:"Dvojka je činitelem nahoře i dole, takže se krátí stejně jako písmeno." },
  { a:"(2 + a) / (2 + b)", b:"a / b",
    why:"Dvojka je tentokrát sčítanec. Sčítance se neškrtají, ani když to jsou čísla." },
  { a:"(a · b) / (a · b)", b:"1",
    why:"Nahoře i dole týž součin — zlomek je roven jedné pro každé nenulové <span class=\"q\">a</span> a <span class=\"q\">b</span>." },
  { a:"a / (a · b)", b:"1 / b",
    why:"<span class=\"q\">a</span> je činitelem nahoře (samo o sobě) i dole. Po zkrácení zůstane nahoře jednička, ne prázdno." },
  { a:"a / (a + b)", b:"1 / b",
    why:"Dole je <span class=\"q\">a</span> sčítanec. Nedá se vytknout z celého jmenovatele, takže se nekrátí." }
];

var dkI = 0, dkOrder = [], dkSc = null, dkLock = false;

function initDk(){
  dkSc = zScore();
  dkOrder = zShuffle(DK_LIST.map(function(_,i){ return i; }), zRnd(37));
  dkI = 0;
  drawDk();
}
function drawDk(){
  var it = DK_LIST[dkOrder[dkI % dkOrder.length]];
  dkLock = false;
  $("#dkQ").innerHTML = "Někdo takhle „zkrátil“. Je to legální úprava?"+
    '<span class="big">'+EX.stks(it.a, {hl:true})+" &nbsp;→&nbsp; "+EX.stks(it.b, {hl:true})+"</span>";
  $("#dkYes").disabled = false;
  $("#dkNo").disabled = false;
  var fb = $("#dkFb");
  fb.className = "drill-fb";
  fb.textContent = "Rozhodněte: platí ta rovnost pro všechna čísla, nebo ne?";
  $("#dkScore").textContent = dkSc.txt();
  if(window.renderFractions) window.renderFractions();
}
function dkPick(saysLegal){
  if(dkLock) return;
  dkLock = true;
  var it = DK_LIST[dkOrder[dkI % dkOrder.length]];
  var legal = zSame(it.a, it.b);
  dkSc.all++;
  var fb = $("#dkFb");
  var head;
  if(saysLegal === legal){
    dkSc.ok++;
    fb.className = "drill-fb ok";
    head = "<b>Správně — úprava " + (legal ? "legální je." : "legální není.") + "</b> ";
  } else {
    fb.className = "drill-fb no";
    head = "<b>Ne — úprava " + (legal ? "legální je." : "legální není.") + "</b> ";
  }
  var extra = "";
  if(!legal){
    var names = EX.vars(it.a);
    EX.vlist(EX.parse(it.b), names);
    var env = {}, pool = [2,3,5,7];
    names.forEach(function(n,i){ env[n] = pool[i % pool.length]; });
    var v1, v2;
    try{ v1 = EX.evs(it.a, env); v2 = EX.evs(it.b, env); }catch(e){ v1 = v2 = NaN; }
    if(Math.abs(v1 - v2) < 1e-9){
      env[names[0]] = 9; env[names[names.length-1]] = 4;
      try{ v1 = EX.evs(it.a, env); v2 = EX.evs(it.b, env); }catch(e){}
    }
    extra = " Protipříklad: pro " + names.map(function(n){ return EX.esc(n)+" = "+env[n]; }).join(", ") +
            " vyjde vlevo " + EX.num(v1,4) + ", ale vpravo " + EX.num(v2,4) + ".";
  }
  fb.innerHTML = head + it.why + extra;
  $("#dkScore").textContent = dkSc.txt();
  $("#dkYes").disabled = true;
  $("#dkNo").disabled = true;
  if(dkSc.all >= 6 && dkSc.pct() >= 0.75) markDone("k6");
  if(window.renderFractions) window.renderFractions();
}

/* ============================================================
   MODEL 10 (k07) — ROZMĚROVÁ KONTROLA (trenažér)
   ============================================================ */
var RK_LIST = [
  { f:"c = m / (M · V)", u:"g / (g·mol⁻¹ · dm³)", ans:"mol·dm⁻³",
    d:["g·mol⁻¹·dm⁻³", "mol⁻¹·dm⁻³", "g²·mol⁻¹·dm⁻³"],
    why:"Gramy se vykrátí. Jednotka mol⁻¹ stojí ve jmenovateli, takže se převrátí na mol v čitateli; dm³ zůstává dole." },
  { f:"n = m / M", u:"g / (g·mol⁻¹)", ans:"mol",
    d:["g²·mol⁻¹", "mol⁻¹", "g·mol"],
    why:"Dělit číslem s jednotkou g·mol⁻¹ znamená násobit jeho převrácenou hodnotou mol·g⁻¹. Gramy se vykrátí a zůstane mol." },
  { f:"n = p · V / (R · T)", u:"kPa·dm³ / (J·K⁻¹·mol⁻¹ · K)", ans:"mol",
    d:["J·mol", "mol⁻¹", "kPa·dm³·mol⁻¹"],
    why:"Platí 1 kPa·dm³ = 1 J, takže nahoře jsou jouly. Kelviny se vykrátí a J v čitateli i jmenovateli také; zbude mol." },
  { f:"ρ = m / V", u:"g / cm³", ans:"g·cm⁻³",
    d:["cm³·g⁻¹", "g·cm³", "g⁻¹·cm⁻³"],
    why:"Objem je pod čarou, takže po přesunu nahoru dostane záporný exponent." },
  { f:"v = Δc / Δt", u:"mol·dm⁻³ / s", ans:"mol·dm⁻³·s⁻¹",
    d:["mol·dm⁻³·s", "mol·dm³·s⁻¹", "mol⁻¹·dm³·s⁻¹"],
    why:"Sekunda byla ve jmenovateli, nahoru tedy jde s exponentem −1. Zbylé jednotky se nemění." },
  { f:"t½ = 0,693 / k", u:"1 / s⁻¹", ans:"s",
    d:["s⁻¹", "s⁻²", "bez jednotky"],
    why:"Číslo 0,693 je bezrozměrné. Dělit hodnotou s⁻¹ je totéž jako násobit s, takže poločas vychází v sekundách — jak má." },
  { f:"M = m / n", u:"g / mol", ans:"g·mol⁻¹",
    d:["mol·g⁻¹", "g·mol", "mol"],
    why:"Molární hmotnost je hmotnost na jeden mol; mol je proto ve jmenovateli, tedy s exponentem −1." },
  { f:"V = n · R · T / p", u:"mol · J·K⁻¹·mol⁻¹ · K / kPa", ans:"dm³",
    d:["dm⁻³", "J·kPa⁻¹·mol", "mol·dm³"],
    why:"Moly i kelviny se vykrátí, zbude J / kPa. A protože 1 J = 1 kPa·dm³, je J / kPa právě dm³." },
  { f:"w = m₁ / (m₁ + m₂)", u:"g / g", ans:"bez jednotky",
    d:["g", "g²", "g⁻¹"],
    why:"Hmotnostní zlomek je poměr dvou hmotností, takže se jednotky vykrátí úplně. Proto se uvádí v procentech." },
  { f:"E = R · T / (z · F)", u:"J·K⁻¹·mol⁻¹ · K / (C·mol⁻¹)", ans:"V",
    d:["J·C", "C·J⁻¹", "J·mol⁻¹"],
    why:"Kelviny i moly se vykrátí a zbude J·C⁻¹, což je přesně definice voltu: jeden joule na jeden coulomb." },
  { f:"m = M · I · t / (z · F)", u:"g·mol⁻¹ · A · s / (C·mol⁻¹)", ans:"g",
    d:["g·mol⁻¹", "C·g", "g·s⁻¹"],
    why:"Ampérsekunda je coulomb, takže se C vykrátí s C ve jmenovateli; moly se vykrátí také a zbude gram." },
  { f:"Vm = V / n", u:"dm³ / mol", ans:"dm³·mol⁻¹",
    d:["mol·dm⁻³", "dm³·mol", "mol⁻¹"],
    why:"Molární objem je objem na jeden mol. Pozor na záměnu s koncentrací mol·dm⁻³ — je to přesně převrácená hodnota." }
];

var rkI = 0, rkOrder = [], rkSc = null, rkLock = false;

function initRk(){
  rkSc = zScore();
  rkOrder = zShuffle(RK_LIST.map(function(_,i){ return i; }), zRnd(53));
  rkI = 0;
  drawRk();
}
function drawRk(){
  var it = RK_LIST[rkOrder[rkI % rkOrder.length]];
  rkLock = false;
  $("#rkQ").innerHTML = "Do vzorce <b>"+EX.esc(it.f)+"</b> dosadíme místo veličin jejich jednotky. Co vyjde?"+
    '<span class="big">'+EX.esc(it.u)+"</span>";
  var opts = zShuffle([it.ans].concat(it.d), zRnd(211 + rkI * 13));
  $("#rkOpts").innerHTML = opts.map(function(o){
    return '<button class="drill-opt" type="button" data-u="'+EX.esc(o)+'">'+EX.esc(o)+"</button>";
  }).join("");
  $$("#rkOpts .drill-opt").forEach(function(b){
    b.addEventListener("click", function(){ rkPick(b); });
  });
  var fb = $("#rkFb");
  fb.className = "drill-fb";
  fb.textContent = "Projděte jednotky stejnými operacemi jako čísla — co je pod čarou, jde nahoru se záporným exponentem.";
  $("#rkScore").textContent = rkSc.txt();
}
function rkPick(btn){
  if(rkLock) return;
  rkLock = true;
  var it = RK_LIST[rkOrder[rkI % rkOrder.length]];
  var picked = btn.getAttribute("data-u");
  var ok = (picked === it.ans);
  $$("#rkOpts .drill-opt").forEach(function(b){
    if(b.getAttribute("data-u") === it.ans) b.classList.add("ok");
    else if(b === btn) b.classList.add("no");
  });
  rkSc.all++;
  var fb = $("#rkFb");
  fb.className = "drill-fb " + (ok ? "ok" : "no");
  fb.innerHTML = "<b>" + (ok ? "Správně." : "Ne, správně je " + EX.esc(it.ans) + ".") + "</b> " + it.why;
  $("#rkScore").textContent = rkSc.txt();
  if(rkSc.all >= 6 && rkSc.pct() >= 0.75) markDone("k7");
}

/* ============================================================
   MODEL 11 (k07) — ZKOUŠKA DOSAZENÍM S POSUVNÍKY
   ============================================================ */
var ZD_PAIRS = [
  ["a / b · c", "a / (b · c)"],
  ["(a / b) / c", "a / (b · c)"],
  ["a / (b / c)", "(a · c) / b"],
  ["(a + b) / c", "a / c + b / c"],
  ["(a + b) / a", "b"],
  ["a − (b − c)", "a − b + c"],
  ["a − (b − c)", "a − b − c"],
  ["(a · b) / (a · c)", "b / c"],
  ["(a + b) / (a + c)", "b / c"],
  ["1 / (a / b)", "b / a"],
  ["a · b / c", "a · (b / c)"],
  ["a / b + c", "a / (b + c)"]
];

function initZd(){
  $("#zdSel").innerHTML = ZD_PAIRS.map(function(p,i){
    return '<option value="'+i+'">'+EX.esc(p[0])+"  ⟷  "+EX.esc(p[1])+"</option>";
  }).join("");
}
function drawZd(){
  var p = ZD_PAIRS[+$("#zdSel").value || 0];
  var a = +$("#zdA").value, b = +$("#zdB").value, c = +$("#zdC").value;
  $("#zdAV").textContent = a; $("#zdBV").textContent = b; $("#zdCV").textContent = c;
  var env = {a:a, b:b, c:c};
  var v1, v2;
  try{ v1 = EX.evs(p[0], env); v2 = EX.evs(p[1], env); }catch(e){ v1 = v2 = NaN; }
  var nowSame = isFinite(v1) && isFinite(v2) && Math.abs(v1 - v2) <= 1e-9 * Math.max(1, Math.abs(v1));
  var alwaysSame = zSame(p[0], p[1]);
  $("#zdOut").innerHTML = '<div class="twoup">'+
    '<div class="tu-cell '+(nowSame ? "ok" : "no")+'"><span class="cap">'+EX.esc(p[0])+"</span>"+
      EX.stks(p[0], {hl:true})+" = <b>"+EX.num(v1,4)+"</b></div>"+
    '<div class="tu-rel '+(nowSame ? "ok" : "no")+'">'+(nowSame ? "=" : "≠")+"</div>"+
    '<div class="tu-cell '+(nowSame ? "ok" : "no")+'"><span class="cap">'+EX.esc(p[1])+"</span>"+
      EX.stks(p[1], {hl:true})+" = <b>"+EX.num(v2,4)+"</b></div></div>";
  var v = $("#zdVerd");
  if(alwaysSame){
    v.className = "verd ok";
    v.innerHTML = "<span><b>Tyhle dva zápisy jsou totožné.</b> Ať posuvníky nastavíte jakkoli, vyjde stejné číslo — a přesně to znamená, že jde o týž vzorec napsaný dvakrát jinak.</span>";
  } else if(nowSame){
    v.className = "verd";
    v.innerHTML = "<span><b>Pozor — shoda náhodou.</b> Na téhle jedné trojici čísel vyjde vlevo i vpravo totéž, ale obecně se zápisy liší. Proto se nikdy nespoléhejte na jedno dosazení; posuňte kterýkoli posuvník a rozdíl se objeví.</span>";
  } else {
    v.className = "verd no";
    v.innerHTML = "<span><b>Zápisy se liší.</b> Jediné dosazení, ve kterém vyjde jiné číslo, stačí jako důkaz. Kdyby tohle byl váš přepis vzorce, právě jste našel(a) chybu dřív, než jste ji odevzdal(a).</span>";
  }
}

/* ============================================================
   MINI-GRAFY V RYCHLOKURZU
   ============================================================ */
function drawMg1(){
  var w = 560, h = 190, s = "";
  s += rect(14, 22, 240, 148, {fill:"var(--surface-2)", r:12, stroke:"var(--line)", sw:1});
  s += rect(306, 22, 240, 148, {fill:"var(--surface-2)", r:12, stroke:"var(--line)", sw:1});
  s += txt(134, 44, "STOHOVANĚ", {anchor:"middle", size:10.5, w:600, fill:"var(--ink-3)", style:"letter-spacing:.12em"});
  s += txt(426, 44, "NA ŘÁDKU", {anchor:"middle", size:10.5, w:600, fill:"var(--ink-3)", style:"letter-spacing:.12em"});
  /* levá strana: zlomek m / (M · V) */
  s += txt(124, 106, "m", {anchor:"middle", size:24, w:500, fill:"var(--ink)", style:"font-style:italic"});
  s += line(56, 116, 192, 116, {c:"var(--ink)", w:2.4, cap:"round"});
  s += rect(64, 122, 120, 30, {fill:"var(--accent-soft)", r:7});
  s += txt(124, 144, "M · V", {anchor:"middle", size:22, w:500, fill:"var(--accent)", style:"font-style:italic"});
  s += txt(134, 180, "čáru jmenovatele nikdo psát nemusí", {anchor:"middle", size:10.5, fill:"var(--accent)"});
  /* pravá strana */
  s += txt(390, 106, "m /", {anchor:"end", size:21, w:500, fill:"var(--ink)", mono:true});
  s += rect(396, 86, 100, 28, {fill:"var(--accent-soft)", r:7});
  s += txt(446, 106, "(M · V)", {anchor:"middle", size:21, w:600, fill:"var(--accent)", mono:true});
  s += txt(426, 142, "závorku musíte napsat ručně", {anchor:"middle", size:10.5, fill:"var(--accent)"});
  s += txt(426, 162, "bez ní by V vyskočilo nahoru", {anchor:"middle", size:10.5, fill:"var(--ink-3)"});
  /* šipka mezi nimi */
  s += line(262, 96, 296, 96, {c:"var(--ink-3)", w:1.8, cap:"round"});
  s += '<path d="M300 96 l-8 -4.5 l0 9 z" style="fill:var(--ink-3)"/>';
  s += txt(280, 84, "přepis", {anchor:"middle", size:10, fill:"var(--ink-3)"});
  $("#mg1").innerHTML = svg("0 0 "+w+" "+h, s,
    'aria-label="Vlevo zlomek m lomeno M krát V, jmenovatel je zvýrazněný. Vpravo týž vzorec na řádku, kde je závorka kolem M krát V napsaná ručně."');
}

function drawMg2(){
  var w = 620, h = 150, s = "";
  var boxes = [
    ["1. závorky", "( )", "var(--cat2)"],
    ["2. mocniny a odmocniny", "x²  √x", "var(--cat3)"],
    ["3. násobení a dělení", "·  /", "var(--accent)"],
    ["4. sčítání a odčítání", "+  −", "var(--cat1)"]
  ];
  var bw = 132, gap = 20, x0 = 14;
  boxes.forEach(function(b, i){
    var x = x0 + i * (bw + gap);
    s += rect(x, 34, bw, 62, {fill:"var(--surface-2)", r:11, stroke:b[2], sw:1.6});
    s += txt(x + bw/2, 60, b[1], {anchor:"middle", size:19, w:600, fill:b[2], mono:true});
    s += txt(x + bw/2, 82, b[0], {anchor:"middle", size:10, fill:"var(--ink-2)"});
    if(i < 3){
      s += line(x + bw + 3, 65, x + bw + gap - 7, 65, {c:"var(--ink-3)", w:1.6, cap:"round"});
      s += '<path d="M'+(x+bw+gap-3)+' 65 l-7 -4 l0 8 z" style="fill:var(--ink-3)"/>';
    }
  });
  s += txt(14, 20, "co se počítá dřív", {size:10.5, w:600, fill:"var(--ink-3)", style:"letter-spacing:.12em"});
  s += line(14, 116, 606, 116, {c:"var(--line)", w:1, dash:"4 4"});
  s += txt(310, 136, "uvnitř třetího a čtvrtého kroku se postupuje zleva doprava", {anchor:"middle", size:11, fill:"var(--ink-2)"});
  $("#mg2").innerHTML = svg("0 0 "+w+" "+h, s,
    'aria-label="Pořadí operací: nejdřív závorky, pak mocniny, pak násobení a dělení, nakonec sčítání a odčítání. Uvnitř stejné úrovně se postupuje zleva doprava."');
}

function drawMg4(){
  var w = 640, h = 274, s = "";
  var OUT = "var(--accent)", IN = "var(--cat2)";
  s += '<defs>'+
    '<marker id="mg4o" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">'+
      '<path d="M0 0 L10 5 L0 10 z" style="fill:'+OUT+'"/></marker>'+
    '<marker id="mg4i" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">'+
      '<path d="M0 0 L10 5 L0 10 z" style="fill:'+IN+'"/></marker>'+
    '</defs>';
  s += txt(14, 20, "KŘÍŽOVÉ PRAVIDLO — zlomek dělený zlomkem", {size:10.5, w:600, fill:"var(--ink-3)", style:"letter-spacing:.11em"});
  s += txt(626, 20, "hlavní čára je ta delší", {anchor:"end", size:9.5, fill:"var(--ink-3)"});
  /* levá strana: složený zlomek (a / b) / (c / d) */
  s += txt(112, 62, "a", {anchor:"middle", size:22, w:600, fill:OUT, mono:true});
  s += line(88, 72, 136, 72, {c:"var(--ink-2)", w:1.6, cap:"round"});
  s += txt(112, 98, "b", {anchor:"middle", size:22, w:600, fill:IN, mono:true});
  s += line(48, 122, 176, 122, {c:"var(--ink)", w:3, cap:"round"});
  s += txt(112, 152, "c", {anchor:"middle", size:22, w:600, fill:IN, mono:true});
  s += line(88, 162, 136, 162, {c:"var(--ink-2)", w:1.6, cap:"round"});
  s += txt(112, 188, "d", {anchor:"middle", size:22, w:600, fill:OUT, mono:true});
  /* rovnítko */
  s += txt(306, 122, "=", {anchor:"middle", size:24, w:600, fill:"var(--ink-3)", mono:true});
  /* pravá strana: výsledek (a · d) / (b · c) */
  s += txt(520, 108, "a · d", {anchor:"middle", size:22, w:600, fill:OUT, mono:true});
  s += line(444, 122, 596, 122, {c:"var(--ink)", w:3, cap:"round"});
  s += txt(520, 154, "b · c", {anchor:"middle", size:22, w:600, fill:IN, mono:true});
  /* vnější dvojice a, d — nahoru do čitatele; d se přitom klene přes celý zlomek */
  s += '<path d="M134 50 C 244 12, 370 32, 470 90" style="fill:none;stroke:'+OUT+';stroke-width:2.1;marker-end:url(#mg4o)"/>';
  s += '<path d="M136 188 C 290 240, 400 214, 470 114" style="fill:none;stroke:'+OUT+';stroke-width:2.1;marker-end:url(#mg4o)"/>';
  /* vnitřní dvojice b, c — dolů do jmenovatele */
  s += '<path d="M136 94 C 232 152, 336 174, 470 142" style="fill:none;stroke:'+IN+';stroke-width:2.1;stroke-dasharray:6 4;marker-end:url(#mg4i)"/>';
  s += '<path d="M136 150 C 254 202, 356 192, 470 160" style="fill:none;stroke:'+IN+';stroke-width:2.1;stroke-dasharray:6 4;marker-end:url(#mg4i)"/>';
  /* legenda */
  s += txt(320, 246, "vnější dvojice a, d — čitatel horního a jmenovatel dolního zlomku — jde nahoru", {anchor:"middle", size:10.5, w:600, fill:OUT});
  s += txt(320, 266, "vnitřní dvojice b, c — jmenovatel horního a čitatel dolního zlomku — jde dolů", {anchor:"middle", size:10.5, w:600, fill:IN});
  $("#mg4").innerHTML = svg("0 0 "+w+" "+h, s,
    'aria-label="Křížové pravidlo: zlomek a lomeno b, to celé lomeno zlomkem c lomeno d, se rovná a krát d lomeno b krát c. Vnější členy a a d jdou do čitatele výsledku, vnitřní členy b a c do jmenovatele."');
}

function drawMg3(){
  var w = 560, h = 170, s = "";
  s += txt(14, 22, "co přeskočí čáru, otočí znaménko exponentu", {size:10.5, w:600, fill:"var(--ink-3)", style:"letter-spacing:.1em"});
  /* zlomek mol / dm3 */
  s += txt(96, 74, "mol", {anchor:"middle", size:21, w:500, fill:"var(--ink)", mono:true});
  s += line(52, 86, 140, 86, {c:"var(--ink)", w:2.4, cap:"round"});
  s += rect(60, 92, 72, 28, {fill:"var(--endo-soft)", r:7});
  s += txt(96, 113, "dm³", {anchor:"middle", size:21, w:500, fill:"var(--endo)", mono:true});
  s += txt(96, 146, "jmenovatel", {anchor:"middle", size:10.5, fill:"var(--ink-3)"});
  /* zlomková čára prodloužená doprava — přes ni šipka skáče
     (stejná barva i tloušťka jako skutečná čára vlevo, aby bylo poznat,
      že je to tatáž čára, jen natažená do prostoru mezi zlomek a výsledek) */
  s += line(140, 86, 292, 86, {c:"var(--ink)", w:2.4, cap:"round"});
  s += txt(216, 78, "tatáž zlomková čára, jen prodloužená", {anchor:"middle", size:9.5, fill:"var(--ink-3)"});
  /* šipka přes čáru */
  s += '<path d="M182 112 C 226 112, 232 58, 278 58" style="fill:none;stroke:var(--accent);stroke-width:2;stroke-dasharray:5 4"/>';
  s += '<path d="M282 58 l-8 -4.5 l0 9 z" style="fill:var(--accent)"/>';
  s += txt(216, 40, "nahoru přes čáru", {anchor:"middle", size:10.5, fill:"var(--accent)"});
  s += txt(216, 132, "exponent 3 → −3", {anchor:"middle", size:10.5, fill:"var(--accent)"});
  /* výsledek */
  s += rect(300, 62, 236, 50, {fill:"var(--surface-2)", r:11, stroke:"var(--line)", sw:1});
  s += txt(418, 94, "mol · dm⁻³", {anchor:"middle", size:23, w:600, fill:"var(--ink)", mono:true});
  s += txt(418, 132, "týž údaj, žádná zlomková čára", {anchor:"middle", size:10.5, fill:"var(--ink-3)"});
  $("#mg3").innerHTML = svg("0 0 "+w+" "+h, s,
    'aria-label="Zlomek mol lomeno dm na třetí se změní na mol krát dm na minus třetí. Jednotka, která přeskočí zlomkovou čáru, otočí znaménko exponentu."');
}
