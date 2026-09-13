/* ============================================================
   20 · JÁDRO — generátor výpočtového listu (používá ho hero,
        model „takhle ne / takhle ano“ i kalkulačka ředění)
   ============================================================ */

function csRow(sym, val, note){
  return '<div class="cs-row"><span class="cs-sym">'+sym+'</span>'+
         '<span class="cs-val">'+val+'</span>'+
         (note ? '<span class="cs-note">'+note+'</span>' : '')+'</div>';
}
function csLine(s){ return '<div class="cs-line">'+s+'</div>'; }

/* spec → HTML výpočtového listu.
   opt.steps … kolik bloků je odkrytých (7 = vše), opt.compact … užší varianta */
function csHTML(sp, opt){
  opt = opt || {};
  var steps = (opt.steps===undefined) ? 99 : opt.steps;
  var k = 0;
  function open(lbl, cls){
    k++;
    var hid = (k > steps) ? " is-hidden" : "";
    return '<div class="cs-block'+(cls?" "+cls:"")+hid+'" data-step="'+k+'">'+
           '<span class="cs-lbl">'+lbl+'</span><div class="cs-rows">';
  }
  var h = '<div class="calcsheet'+(opt.compact?" compact":"")+'">';
  h += '<div class="cs-head"><span class="cs-id">'+sp.id+'</span>'+
       '<span class="cs-topic">'+sp.topic+'</span>'+
       '<span class="cs-kind">'+sp.kind+'</span></div>';
  if(sp.task) h += '<p class="cs-task">'+sp.task+'</p>';

  h += open("Zadání");
  sp.given.forEach(function(g){ h += csRow(g[0], g[1], g[2]); });
  h += '</div></div>';

  h += open("Hledáme","find");
  sp.find.forEach(function(g){ h += csRow(g[0], g[1], g[2]); });
  h += '</div></div>';

  h += open("Vztahy");
  sp.rel.forEach(function(r){ h += csLine(r); });
  h += '</div></div>';

  h += open("Odvození");
  sp.der.forEach(function(r){ h += csLine(r); });
  if(sp.hint) h += '<p class="cs-hint">'+sp.hint+'</p>';
  h += '</div></div>';

  h += open("Dosazení");
  sp.sub.forEach(function(r){ h += csLine(r); });
  if(sp.units) h += '<div class="cs-line units">'+sp.units+'</div>';
  (sp.sub2||[]).forEach(function(r){ h += csLine(r); });
  h += '</div></div>';

  h += open("Odpověď","res");
  h += '<p class="cs-ans">'+sp.ans+'</p>';
  h += '</div></div>';

  if(sp.chk){
    h += open("Kontrola","chk");
    h += '<p class="cs-chk">'+sp.chk+'</p>';
    h += '</div></div>';
  }
  return h + '</div>';
}

/* ============================================================
   21 · HERO — živý výpočtový list s odkrýváním kroků
   ============================================================ */
var csState = {task:0, step:1};

function drawCsLive(){
  var sp = CSLIVE[csState.task];
  var max = sp.chk ? 7 : 6;
  if(csState.step > max) csState.step = max;
  if(csState.step < 1) csState.step = 1;
  $("#csLive").innerHTML = csHTML(sp, {steps:csState.step});
  $("#csStep").textContent = "krok " + csState.step + " / " + max;
  var nb = $("#csNext");
  nb.disabled = (csState.step >= max);
  nb.textContent = (csState.step >= max) ? "Hotovo" : "Odkrýt další krok";
}
function initCsLive(){
  csState.task = 0; csState.step = 1;
  drawCsLive();
}

/* ============================================================
   22 · MODEL „takhle ne / takhle ano“
   ============================================================ */
var BGGOOD = {
 id:"Takhle ano", topic:"Koncentrace roztoku z navážky", kind:"Správný zápis",
 given:[["m","= 5,85 g","navážka NaCl"],
        ["V","= 250 cm³ <span class=\"cs-conv\">= 0,250 dm³</span>","převod hned"],
        ["M","= 58,44 g·mol⁻¹","M(NaCl) z tabulek"]],
 find:[["c","= ? mol·dm⁻³","látková koncentrace"]],
 rel:["c = n / V","n = m / M"],
 der:["c = n / V = (m / M) / V = <b>m / (M · V)</b>"],
 hint:"Ani jedno číslo.",
 sub:["c = 5,85 g / (58,44 g·mol⁻¹ · 0,250 dm³)"],
 units:"jednotky: g / (g·mol⁻¹ · dm³) = <b>mol·dm⁻³</b> ✓",
 sub2:["c = 0,40041… mol·dm⁻³"],
 ans:"Roztok má látkovou koncentraci <b class=\"cs-hi\">c = 0,400 mol·dm⁻³</b>.",
 chk:"Desetina molu ve čtvrtlitru dává 0,4 mol·dm⁻³ — řádově sedí."
};
var bgMode = "both";

function badSheetHTML(){
  var h = '<div class="calcsheet bad">';
  h += '<div class="cs-head"><span class="cs-id">'+BGBAD.id+'</span>'+
       '<span class="cs-topic">'+BGBAD.topic+'</span>'+
       '<span class="cs-kind">'+BGBAD.kind+'</span></div>';
  h += '<div class="cs-block"><span class="cs-lbl">Výpočet</span><div class="cs-rows">';
  BGBAD.lines.forEach(function(l){
    h += '<div class="cs-line">'+l[0]+'</div>';
    h += '<p class="cs-flaw">'+l[1]+'</p>';
  });
  h += '</div></div>';
  h += '<div class="cs-block res"><span class="cs-lbl">Verdikt</span><div class="cs-rows">';
  h += '<p class="cs-ans">Výsledek je <b class="cs-hi">1000× vedle</b> a&nbsp;chyba se v&nbsp;zápisu nedá najít.</p>';
  BGBAD.flaws.forEach(function(f){ h += '<p class="cs-flaw">'+f+'</p>'; });
  h += '</div></div></div>';
  return h;
}
function goodNotesHTML(){
  var a = ["Každá veličina má symbol, hodnotu i&nbsp;jednotku a&nbsp;převod je hned u&nbsp;ní.",
           "Otazník s&nbsp;jednotkou určuje cíl rozměrové kontroly.",
           "Vypsané vztahy dokazují pochopení — body i&nbsp;při chybě v&nbsp;počítání.",
           "Odvození bez čísel oddělilo algebru od aritmetiky.",
           "Zkrácení jednotek potvrdilo, že vzorec je správně.",
           "Odpověď je věta se správným počtem platných číslic."];
  return a.map(function(s){ return '<p class="cs-good">'+s+'</p>'; }).join("");
}
function drawBadGood(){
  var h = "";
  if(bgMode !== "good"){
    h += '<div class="vscol"><div class="vshead bad">✕ Takhle ne</div>'+badSheetHTML()+'</div>';
  }
  if(bgMode !== "bad"){
    h += '<div class="vscol"><div class="vshead good">✓ Takhle ano</div>'+
         csHTML(BGGOOD, {compact:false})+
         '<div style="display:flex;flex-direction:column;gap:.15rem">'+goodNotesHTML()+'</div></div>';
  }
  $("#bgGrid").innerHTML = h;
}

/* ============================================================
   23 · TRENAŽÉR ZÁPISU — seřazení řádků
   ============================================================ */
var srtState = {task:0, order:[], picked:[], done:false, ok:0, tot:0};

function srtShuffle(n){
  var a = []; for(var i=0;i<n;i++) a.push(i);
  for(var j=a.length-1;j>0;j--){ var r=Math.floor(Math.random()*(j+1)); var t=a[j]; a[j]=a[r]; a[r]=t; }
  /* zajisti, že to nevyjde rovnou správně */
  var same = a.every(function(v,i){ return v===i; });
  if(same && n>1){ var t2=a[0]; a[0]=a[1]; a[1]=t2; }
  return a;
}
function drawSort(){
  var t = SORTT[srtState.task];
  $("#sortTask").innerHTML = t.task;
  var h = "";
  srtState.order.forEach(function(ri, pos){
    var r = t.rows[ri];
    var pi = srtState.picked.indexOf(ri);
    var cls = "";
    if(srtState.done) cls = (pi === ri) ? " ok" : " no";
    else if(pi >= 0) cls = " picked";
    var num = (pi >= 0) ? (pi+1) : "·";
    h += '<button class="sortitem'+cls+'" type="button" data-i="'+ri+'">'+
         '<span class="sn">'+num+'</span>'+
         '<span><span class="sl">'+(srtState.done ? r[0] : "?")+'</span> '+r[1]+'</span>'+
         '<span class="sl">'+(srtState.done && pi===ri ? "✓" : "")+'</span></button>';
  });
  $("#sortList").innerHTML = h;
  $$("#sortList .sortitem").forEach(function(b){
    b.addEventListener("click", function(){ srtPick(+b.dataset.i); });
  });
  $("#sortScore").textContent = srtState.ok + " / " + srtState.tot + " správně";
}
function srtPick(i){
  if(srtState.done) return;
  var p = srtState.picked.indexOf(i);
  if(p >= 0) srtState.picked.splice(p,1);
  else if(srtState.picked.length < SORTT[srtState.task].rows.length) srtState.picked.push(i);
  drawSort();
}
function srtCheck(){
  var t = SORTT[srtState.task];
  if(srtState.done){ srtNew(); return; }
  if(srtState.picked.length < t.rows.length){
    $("#sortFb").className = "drill-fb no";
    $("#sortFb").innerHTML = "Nejdřív seřaďte všech "+t.rows.length+" řádků — zbývá "+
      (t.rows.length - srtState.picked.length)+".";
    return;
  }
  var good = srtState.picked.every(function(v,idx){ return v===idx; });
  srtState.done = true; srtState.tot++;
  if(good){
    srtState.ok++;
    $("#sortFb").className = "drill-fb ok";
    $("#sortFb").innerHTML = "<b>Správně.</b> Pořadí zadání → hledáme → vztahy → odvození → dosazení → odpověď platí pro každou úlohu bez výjimky.";
    if(srtState.ok >= 2) markDone("k0");
  } else {
    $("#sortFb").className = "drill-fb no";
    $("#sortFb").innerHTML = "<b>Ještě ne.</b> Zeleně jsou řádky na správném místě. Pomůcka: nejdřív se vypisuje, co víme, pak co chceme, pak čím to spojíme — a&nbsp;čísla přicházejí až předposlední.";
  }
  drawSort();
}
function srtNew(){
  srtState.task = (srtState.task + 1) % SORTT.length;
  srtState.order = srtShuffle(SORTT[srtState.task].rows.length);
  srtState.picked = []; srtState.done = false;
  $("#sortFb").className = "drill-fb";
  $("#sortFb").innerHTML = "Klikejte na řádky v&nbsp;pořadí, v&nbsp;jakém patří do výpočtového listu. Prvním kliknutím určíte první řádek listu.";
  drawSort();
}
function initSort(){
  srtState.task = 0;
  srtState.order = srtShuffle(SORTT[0].rows.length);
  srtState.picked = []; srtState.done = false;
  drawSort();
}
