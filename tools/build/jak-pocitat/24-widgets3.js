/* ============================================================
   28 · KARTOTÉKA VZORCŮ — filtr + fulltext
   ============================================================ */
var AREAN = {mol:"Látkové množství", roz:"Roztoky", ply:"Plyny", ter:"Termochemie",
             kin:"Kinetika", rov:"Rovnováha", ele:"Elektrochemie", aci:"Acidobazika",
             jad:"Jaderná chemie"};
var fcState = {area:"all", q:""};

function fcStrip(s){
  return String(s).replace(/<[^>]*>/g,"").toLowerCase()
    .replace(/[₀₁₂₃₄₅₆₇₈₉]/g, function(c){ return "0123456789".charAt("₀₁₂₃₄₅₆₇₈₉".indexOf(c)); })
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]/g, function(c){ return "0123456789-".charAt("⁰¹²³⁴⁵⁶⁷⁸⁹⁻".indexOf(c)); });
}
function drawFc(){
  var q = fcStrip(fcState.q).trim();
  var list = FORM.filter(function(f){
    if(fcState.area !== "all" && f.a !== fcState.area) return false;
    if(!q) return true;
    var hay = fcStrip(f.n + " " + f.f + " " + f.u + " " + f.w + " " + f.p + " " + AREAN[f.a] + " " +
      f.s.map(function(x){ return x[0] + " " + x[1]; }).join(" "));
    return hay.indexOf(q) >= 0;
  });
  $("#fcCount").textContent = list.length + " z " + FORM.length + " vzorců";
  if(!list.length){
    $("#fcOut").innerHTML = '<p class="fnone">Nic nenalezeno. Zkuste kratší výraz — hledá se v&nbsp;názvu, ve vzorci i&nbsp;ve významu symbolů.</p>';
    return;
  }
  $("#fcOut").innerHTML = list.map(function(f){
    return '<details class="fcard"><summary>'+
      '<span class="fname">'+f.n+'</span>'+
      '<span class="farea">'+AREAN[f.a]+'</span>'+
      '<span class="fform">'+f.f+'</span></summary>'+
      '<div class="fbody">'+
      '<div class="fsym">'+f.s.map(function(x){
         return '<div><b>'+x[0]+'</b><span>'+x[1]+'</span></div>'; }).join("")+
      '<div><b>jednotka</b><span>výsledek v '+f.u+'</span></div></div>'+
      '<p class="fwhen"><b>Kdy použít:</b> '+f.w+'</p>'+
      '<p class="fwatch">'+f.p+'</p>'+
      '</div></details>';
  }).join("");
}

/* ============================================================
   29 · MODEL — cesta k výsledku (který vztah použít)
   ============================================================ */
var rtState = {from:"mM", to:"n"};
var RTFROM = {
  mM:{lbl:"m a M", f:"n = m / M", note:"Nejběžnější vstup: navážka a molární hmotnost z tabulek."},
  cV:{lbl:"c a V", f:"n = c · V", note:"Roztok. V musí být v dm³."},
  VVm:{lbl:"V a V<sub>m</sub>", f:"n = V / V<sub>m</sub>", note:"Plyn za normálních (22,414) či standardních (24,790) podmínek."},
  pVT:{lbl:"p, V a T", f:"n = p · V / (R · T)", note:"Plyn za libovolných podmínek — stavová rovnice."},
  N:{lbl:"N", f:"n = N / N<sub>A</sub>", note:"Počet částic dělený Avogadrovou konstantou."},
  roVw:{lbl:"ρ, V a w", f:"n = w · ρ · V / M", note:"Roztok zadaný hmotnostním zlomkem a hustotou."}
};
var RTTO = {
  n:{lbl:"n", f:"", note:"Hledané látkové množství už máte — konec cesty."},
  m:{lbl:"m", f:"m = n · M", note:"Zpátky na gramy přes molární hmotnost."},
  c:{lbl:"c", f:"c = n / V", note:"Na koncentraci potřebujete ještě objem roztoku v dm³."},
  V:{lbl:"V", f:"V = n · V<sub>m</sub> &nbsp;nebo&nbsp; V = n · R · T / p", note:"Objem plynu; při jiných než tabulkových podmínkách použijte stavovou rovnici."},
  N:{lbl:"N", f:"N = n · N<sub>A</sub>", note:"Počet částic."}
};
function drawRoute(){
  var a = RTFROM[rtState.from], b = RTTO[rtState.to];
  var h = '<div class="calcsheet"><div class="cs-head">'+
    '<span class="cs-id">Cesta</span>'+
    '<span class="cs-topic">'+a.lbl+' &nbsp;→&nbsp; <b>n</b> &nbsp;→&nbsp; '+b.lbl+'</span>'+
    '<span class="cs-kind">Volba vztahu</span></div>';
  h += '<div class="cs-block"><span class="cs-lbl">Krok 1</span><div class="cs-rows">'+
       '<div class="cs-line"><b>'+a.f+'</b></div><p class="cs-hint">'+a.note+'</p></div></div>';
  if(rtState.to === "n"){
    h += '<div class="cs-block res"><span class="cs-lbl">Hotovo</span><div class="cs-rows">'+
         '<p class="cs-ans">'+b.note+' Jediný krok stačí.</p></div></div>';
  } else {
    h += '<div class="cs-block"><span class="cs-lbl">Krok 2</span><div class="cs-rows">'+
         '<div class="cs-line"><b>'+b.f+'</b></div><p class="cs-hint">'+b.note+'</p></div></div>';
    h += '<div class="cs-block res"><span class="cs-lbl">Dohromady</span><div class="cs-rows">'+
         '<p class="cs-ans">Dosaďte první vztah do druhého a&nbsp;dostanete <b>jeden</b> výraz, do kterého se čísla dosadí až nakonec. Přesně to dělá blok <b>odvození</b> ve výpočtovém listu.</p></div></div>';
  }
  h += '</div>';
  $("#rtOut").innerHTML = h;
}

/* ============================================================
   30 · MODEL — platné číslice
   ============================================================ */
function sgParse(s){
  s = String(s == null ? "" : s).trim().replace(/\s/g, "").replace(",", ".").replace(/−/g, "-");
  if(!s || !/^-?\d*\.?\d+$/.test(s)) return null;
  return s;
}
function sgFigs(s){
  var t = s.replace("-", "");
  if(t.indexOf(".") >= 0){
    t = t.replace(".", "").replace(/^0+/, "");
    return {n: Math.max(1, t.length), amb: false};
  }
  t = t.replace(/^0+/, "");
  var trimmed = t.replace(/0+$/, "");
  if(!trimmed.length) return {n:1, amb:true};
  return {n: trimmed.length, amb: (t.length !== trimmed.length)};
}
function sgDec(s){
  var i = s.indexOf(".");
  return i < 0 ? 0 : (s.length - i - 1);
}
var sgState = {op:"div"};
var SGOPN = {mul:"·", div:"/", add:"+", sub:"−"};

function drawSg(){
  var sa = sgParse($("#sgA").value), sb = sgParse($("#sgB").value);
  var roA = $("#sgRoA"), roB = $("#sgRoB"), roR = $("#sgRoR");
  if(!sa || !sb){
    [roA, roB, roR].forEach(function(r){ r.children[1].textContent = "—"; r.children[2].textContent = "zadejte číslo"; });
    $("#sgFb").className = "drill-fb no";
    $("#sgFb").innerHTML = "Zadejte do obou polí číslo (desetinná čárka i&nbsp;tečka fungují). Například <span class=\"mono\">12,47</span> a&nbsp;<span class=\"mono\">4,5</span>.";
    $("#sgWrap").innerHTML = svg("0 0 700 120", txt(350, 62, "zadejte dvě čísla",
      {anchor:"middle", size:14, fill:"var(--ink-3)"}), 'aria-label="Platné číslice"');
    return;
  }
  var fa = sgFigs(sa), fb = sgFigs(sb), da = sgDec(sa), db = sgDec(sb);
  var va = parseFloat(sa), vb = parseFloat(sb);
  var res, rule, digits, note;
  if(sgState.op === "mul" || sgState.op === "div"){
    res = (sgState.op === "mul") ? va * vb : (vb === 0 ? null : va / vb);
    digits = Math.min(fa.n, fb.n);
    rule = "násobení a dělení → nejmenší počet <b>platných číslic</b>";
    note = "min(" + fa.n + "; " + fb.n + ") = " + digits + " platných číslic";
  } else {
    res = (sgState.op === "add") ? va + vb : va - vb;
    digits = Math.min(da, db);
    rule = "sčítání a odčítání → nejmenší počet <b>desetinných míst</b>";
    note = "min(" + da + "; " + db + ") = " + digits + " desetinných míst";
  }
  roA.children[1].textContent = sa.replace(".", ",");
  roA.children[2].textContent = fa.n + " platných · " + da + " desetinných" + (fa.amb ? " (nejednoznačné)" : "");
  roB.children[1].textContent = sb.replace(".", ",");
  roB.children[2].textContent = fb.n + " platných · " + db + " desetinných" + (fb.amb ? " (nejednoznačné)" : "");

  if(res === null || !isFinite(res)){
    roR.children[1].textContent = "—";
    roR.children[2].textContent = "dělení nulou";
    $("#sgFb").className = "drill-fb no";
    $("#sgFb").innerHTML = "Dělit nulou nelze. Změňte druhé číslo.";
    $("#sgWrap").innerHTML = svg("0 0 700 120", txt(350, 62, "dělení nulou",
      {anchor:"middle", size:14, fill:"var(--bad)"}), 'aria-label="Platné číslice"');
    return;
  }
  var shown;
  if(sgState.op === "mul" || sgState.op === "div"){
    shown = Number(res.toPrecision(Math.max(1, Math.min(15, digits))));
  } else {
    shown = Number(res.toFixed(Math.max(0, Math.min(12, digits))));
  }
  roR.children[1].textContent = pcNum(shown, 8);
  roR.children[2].textContent = note;
  $("#sgFb").className = "drill-fb ok";
  $("#sgFb").innerHTML = "Kalkulačka ukáže <span class=\"mono\">" + pcNum(res, 10) +
    "</span>, ale zapsat smíte jen <b class=\"mono\">" + pcNum(shown, 8) + "</b> — " + rule + ", tedy " + note + ".";
  drawSgSvg(sa, sb, fa.n, fb.n, pcNum(shown, 8), digits);
}
function drawSgSvg(sa, sb, na, nb, resStr, digits){
  var s = "", y0 = 34;
  function drawNum(str, sig, y, lbl){
    var out = "";
    out += txt(14, y + 5, lbl, {size:11.5, w:600, fill:"var(--ink-3)",
      style:"letter-spacing:.07em;text-transform:uppercase"});
    var chars = str.replace(".", ",").split("");
    /* které číslice jsou platné: od první nenulové zleva (mimo čárku) */
    var started = false, count = 0, sigIdx = [];
    for(var i = 0; i < chars.length; i++){
      var c = chars[i];
      if(c === ",") continue;
      if(!started && c !== "0") started = true;
      if(started && count < sig){ sigIdx.push(i); count++; }
    }
    var x = 118;
    chars.forEach(function(c, i){
      var on = sigIdx.indexOf(i) >= 0;
      if(c !== ","){
        out += rect(x - 2, y - 15, 22, 26, {fill: on ? "var(--accent-soft)" : "var(--surface-2)",
          r:5, stroke: on ? "var(--accent)" : "var(--line)", sw:1});
      }
      out += txt(x + (c === "," ? 0 : 9), y + 4, c, {anchor:"middle", size:15, w:600, mono:true,
        fill: on ? "var(--accent)" : "var(--ink-3)"});
      x += (c === "," ? 12 : 26);
    });
    out += txt(x + 14, y + 4, sig + (sig === 1 ? " platná číslice" : (sig < 5 ? " platné číslice" : " platných číslic")),
      {size:12.5, w:600, fill:"var(--ink-2)"});
    return out;
  }
  s += drawNum(sa, na, y0, "1. číslo");
  s += drawNum(sb, nb, y0 + 40, "2. číslo");
  s += line(14, y0 + 60, 686, y0 + 60, {c:"var(--line-strong)", w:1.4});
  s += txt(14, y0 + 84, "výsledek", {size:11.5, w:600, fill:"var(--accent)",
    style:"letter-spacing:.07em;text-transform:uppercase"});
  s += txt(118, y0 + 85, resStr, {size:18, w:700, mono:true, fill:"var(--accent)"});
  s += txt(118, y0 + 105, "operace " + SGOPN[sgState.op] + " · zaokrouhleno na " + digits +
    (sgState.op === "add" || sgState.op === "sub" ? " desetinných míst" : " platných číslic"),
    {size:12, fill:"var(--ink-3)"});
  $("#sgWrap").innerHTML = svg("0 0 700 150", s, 'aria-label="Platné číslice ve výpočtu"');
}

/* ============================================================
   31 · TRENAŽÉR — počet platných číslic
   ============================================================ */
var pfState = {i:0, ok:0, tot:0, streak:0, answered:false, opts:[]};

function drawPf(){
  var q = SIGQ[pfState.i];
  $("#pfQ").innerHTML = "Kolik platných číslic má číslo:<span class=\"big\">" + q.n + "</span>";
  var base = Math.max(1, q.c - 1);
  var opts = [];
  for(var k = 0; k < 4; k++) opts.push(base + k);
  if(opts.indexOf(q.c) < 0) opts[0] = q.c;
  for(var z = opts.length - 1; z > 0; z--){
    var r = Math.floor(Math.random() * (z + 1)), tmp = opts[z]; opts[z] = opts[r]; opts[r] = tmp;
  }
  pfState.opts = opts;
  $("#pfOpts").innerHTML = opts.map(function(o, i){
    return '<button class="drill-opt" type="button" data-i="' + i + '">' + o + '</button>';
  }).join("");
  $$("#pfOpts .drill-opt").forEach(function(b){
    b.addEventListener("click", function(){ pfAnswer(+b.dataset.i); });
  });
  $("#pfScore").textContent = pfState.ok + " / " + pfState.tot +
    (pfState.streak > 1 ? "  ·  série " + pfState.streak : "");
  pfState.answered = false;
}
function pfAnswer(i){
  if(pfState.answered) return;
  pfState.answered = true;
  var q = SIGQ[pfState.i], good = (pfState.opts[i] === q.c);
  pfState.tot++;
  if(good){ pfState.ok++; pfState.streak++; } else { pfState.streak = 0; }
  $$("#pfOpts .drill-opt").forEach(function(b, bi){
    if(pfState.opts[bi] === q.c) b.classList.add("ok");
    else if(bi === i) b.classList.add("no");
  });
  $("#pfFb").className = "drill-fb " + (good ? "ok" : "no");
  $("#pfFb").innerHTML = (good ? "<b>Správně.</b> " : "<b>Správně je " + q.c + ".</b> ") + q.x;
  $("#pfScore").textContent = pfState.ok + " / " + pfState.tot +
    (pfState.streak > 1 ? "  ·  série " + pfState.streak : "");
  if(pfState.streak >= 8) markDone("k4");
}
function pfNext(){
  pfState.i = (pfState.i + 1) % SIGQ.length;
  $("#pfFb").className = "drill-fb";
  $("#pfFb").innerHTML = "Vyberte počet platných číslic.";
  drawPf();
}
function initPf(){
  pfState.i = Math.floor(Math.random() * SIGQ.length);
  drawPf();
}
