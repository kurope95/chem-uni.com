/* ============================================================
   MODEL 5 (k02) — KROKOVAČ POŘADÍ OPERACÍ
   ============================================================ */
var koNode = null, koHist = [], koMsg = "";
var KO_NAME = {"+":"sčítání","−":"odčítání","·":"násobení","/":"dělení"};

function initKo(){
  $("#koSel").innerHTML = KO_LIST.map(function(k,i){
    return '<option value="'+i+'">'+EX.esc(k.e)+"</option>";
  }).join("");
  resetKo();
}
function resetKo(){
  var it = KO_LIST[+$("#koSel").value || 0];
  koNode = EX.parse(it.e);
  koHist = [];
  koMsg = it.n;
  drawKo();
}
function stepKo(){
  if(!koNode) return;
  var nx = EX.nextOp(koNode);
  if(!nx){
    koMsg = "Hotovo. Zbylo jediné číslo — to je výsledek celého výrazu.";
    drawKo(); return;
  }
  var before = EX.lin(koNode, 0, nx);
  var a = nx.a.v, b = nx.b.v, op = nx.o, inPar = !!nx.par;
  koHist.push(before);
  var val = EX.reduceAt(nx);
  var why;
  if(inPar) why = "Závorka má přednost před vším ostatním, takže se počítá jako první.";
  else if(op === "·" || op === "/") why = "Násobení a dělení mají přednost před sčítáním a odčítáním. Mezi sebou jsou si rovné, takže se berou zleva doprava.";
  else why = "Sčítání a odčítání přijdou na řadu až nakonec, když je hotové všechno násobení a dělení.";
  koMsg = "Na řadě bylo <b>"+KO_NAME[op]+"</b>: "+EX.num(a,4)+" "+op+" "+EX.num(b,4)+
          " = <b>"+EX.num(val,4)+"</b>. "+why;
  drawKo();
}
function drawKo(){
  if(!koNode) return;
  var nx = EX.nextOp(koNode);
  var h = koHist.map(function(l){ return '<div class="stepline old">'+l+"</div>"; }).join("");
  h += '<div class="stepline">'+EX.lin(koNode, 0, nx)+"</div>";
  $("#koBox").innerHTML = h;
  $("#koMsg").innerHTML = koMsg;
  $("#koStep").textContent = "krok " + (koHist.length + 1);
  $("#koNext").disabled = !nx;
}

/* ============================================================
   MODEL 6 (k03) — PŘEPISOVAČ OBĚMA SMĚRY (trenažér)
   ============================================================ */
var PP_LIST = [
  { e:"m / (M · V)",  d:["m / M · V", "m / (M + V)", "M · V / m"],
    why:"Ve jmenovateli stojí součin dvou veličin, takže na řádku potřebuje závorku. Bez ní by <span class=\"q\">V</span> vyskočilo nahoru." },
  { e:"(m / M) / V",  d:["m / (M / V)", "m / M + V", "M / (m · V)"],
    why:"Složený zlomek se sbalí na <span class=\"fx\">m / (M · V)</span>, a to se dá na řádek napsat i jako <span class=\"fx\">m / M / V</span>. Obojí je totéž." },
  { e:"p · V / (R · T)", d:["p · V / R · T", "p · V · R / T", "p / (V · R · T)"],
    why:"Dole je součin <span class=\"q\">R</span>·<span class=\"q\">T</span>. Bez závorky se <span class=\"q\">T</span> přesune nahoru a výsledek naroste zhruba stotisíckrát." },
  { e:"(a + b) / c", d:["a + b / c", "a / c + b", "(a + b) · c"],
    why:"Součet v čitateli musí být na řádku v závorce, jinak se dělí jen jeho poslední člen." },
  { e:"a / (b + c)", d:["a / b + c", "a / b + a / c", "(a + b) / c"],
    why:"Součet ve jmenovateli je nejnebezpečnější místo vůbec — bez závorky z něj zbude jen první sčítanec." },
  { e:"c₁ · V₁ / V₂", d:["c₁ / (V₁ · V₂)", "c₁ · V₂ / V₁", "V₁ · V₂ / c₁"],
    why:"Dole stojí jediná veličina, takže tady závorka potřeba není. Nahoře je součin, který se dělí celý." },
  { e:"M · I · t / (z · F)", d:["M · I · t / z · F", "M · I · t · z / F", "M · I / (t · z · F)"],
    why:"Tři činitele nahoře, dva dole. Závorka ve jmenovateli je nutná, jinak se <span class=\"q\">F</span> ocitne v čitateli." },
  { e:"(c₁ · V₁ + c₂ · V₂) / (V₁ + V₂)",
    d:["c₁ · V₁ + c₂ · V₂ / (V₁ + V₂)", "(c₁ · V₁ + c₂ · V₂) / V₁ + V₂", "(c₁ + c₂) / (V₁ + V₂)"],
    why:"Dvě závorky, jedna nahoře a jedna dole. Ve stohovaném zápisu obě zmizí, protože je nahradí čára." },
  { e:"m₁ / (m₁ + m₂)", d:["m₁ / m₁ + m₂", "m₁ / m₂", "(m₁ + m₂) / m₁"],
    why:"Bez závorky se <span class=\"fx\">m₁ / m₁</span> zkrátí na jedničku a ze zlomku zbude nesmysl <span class=\"fx\">1 + m₂</span>." },
  { e:"a / b · c", d:["a / (b · c)", "(a · b) / c", "a / (b + c)"],
    why:"Bez závorky se čte zleva doprava: nejdřív dělení, pak násobení. Ve stohovaném zápisu je <span class=\"q\">c</span> vedle zlomku, ne pod čarou." },
  { e:"R · T / (z · F)", d:["R · T / z · F", "R · T · z / F", "R / (T · z · F)"],
    why:"Nernstův člen. Bez závorky se <span class=\"q\">F</span> ≈ 96 500 přesune do čitatele a výsledek je o deset řádů vedle." }
];

var ppI = 0, ppOrder = [], ppSc = null, ppLock = false;

function initPp(){
  ppSc = zScore();
  ppOrder = zShuffle(PP_LIST.map(function(_,i){ return i; }), zRnd(23));
  ppI = 0;
  drawPp();
}
function ppMode(){ return zSegVal("ppMode") || "s2l"; }
function drawPp(){
  var it = PP_LIST[ppOrder[ppI % ppOrder.length]];
  ppLock = false;
  var opts = zShuffle([it.e].concat(it.d), zRnd(101 + ppI * 7 + (ppMode() === "s2l" ? 0 : 3)));
  var q = $("#ppQ"), box = $("#ppOpts");
  if(ppMode() === "s2l"){
    q.innerHTML = "Tenhle zlomek přepište do jednoho řádku. Který řádek znamená totéž?"+
      '<span class="big">'+EX.stks(it.e, {hl:true})+"</span>";
    box.innerHTML = opts.map(function(o,i){
      return '<button class="drill-opt" type="button" data-i="'+i+'" data-e="'+EX.esc(o)+'">'+EX.esc(o)+"</button>";
    }).join("");
  } else {
    q.innerHTML = "Tenhle řádek vysázejte jako zlomek. Který obrázek znamená totéž?"+
      '<span class="big">'+EX.esc(it.e)+"</span>";
    box.innerHTML = opts.map(function(o,i){
      return '<button class="drill-opt" type="button" data-i="'+i+'" data-e="'+EX.esc(o)+'">'+EX.stks(o, {hl:true})+"</button>";
    }).join("");
  }
  $$("#ppOpts .drill-opt").forEach(function(b){
    b.addEventListener("click", function(){ ppPick(b); });
  });
  var fb = $("#ppFb");
  fb.className = "drill-fb";
  fb.textContent = "Vyberte zápis, který je s ukázkou početně totožný.";
  $("#ppScore").textContent = ppSc.txt();
  if(window.renderFractions) window.renderFractions();
}
function ppPick(btn){
  if(ppLock) return;
  ppLock = true;
  var it = PP_LIST[ppOrder[ppI % ppOrder.length]];
  var picked = btn.getAttribute("data-e");
  var ok = zSame(it.e, picked);
  $$("#ppOpts .drill-opt").forEach(function(b){
    var e = b.getAttribute("data-e");
    if(zSame(it.e, e)) b.classList.add("ok");
    else if(b === btn) b.classList.add("no");
  });
  ppSc.all++;
  var fb = $("#ppFb");
  if(ok){
    ppSc.ok++;
    fb.className = "drill-fb ok";
    fb.innerHTML = "<b>Správně.</b> "+it.why;
  } else {
    var names = EX.vars(it.e), env = {}, pool = [2,3,5,7,4,9];
    names.forEach(function(n,i){ env[n] = pool[i % pool.length]; });
    var v1, v2;
    try{ v1 = EX.evs(it.e, env); v2 = EX.evs(picked, env); }catch(e){ v1 = v2 = NaN; }
    fb.className = "drill-fb no";
    fb.innerHTML = "<b>Ne.</b> Dosaďte "+names.map(function(n){ return EX.esc(n)+" = "+env[n]; }).join(", ")+
      ": správný zápis dá "+EX.num(v1,4)+", ale váš "+EX.num(v2,4)+". "+it.why;
  }
  $("#ppScore").textContent = ppSc.txt();
  if(ppSc.all >= 6 && ppSc.pct() >= 0.75) markDone("k3");
  if(window.renderFractions) window.renderFractions();
}

/* ============================================================
   MODEL 7 (k04) — SKLÁDAČKA SLOŽENÉHO ZLOMKU
   ============================================================ */
var szI = 0;

function initSz(){
  $("#szSel").innerHTML = SZ_LIST.map(function(s,i){
    return '<option value="'+i+'">'+EX.esc(s.name)+"</option>";
  }).join("");
  resetSz();
}
function resetSz(){ szI = 0; drawSz(); }
function stepSz(){
  var it = SZ_LIST[+$("#szSel").value || 0];
  if(szI < it.steps.length - 1) szI++;
  drawSz();
}
function drawSz(){
  var it = SZ_LIST[+$("#szSel").value || 0];
  var box = $("#szBox"), h = "";
  for(var i = 0; i <= szI; i++){
    var s = it.steps[i];
    var cur = (i === szI);
    h += '<div class="bigeq" style="'+(cur ? "" : "opacity:.62;font-size:1.02rem;padding:.6rem")+'">'+
         '<span class="lbl">Krok '+(i+1)+" ze "+it.steps.length+"</span>"+
         EX.stks(s.e, {hl:cur})+"</div>";
    if(cur) h += '<p class="stepnote" style="margin:.35rem 0 .9rem">'+s.n+"</p>";
  }
  if(szI === it.steps.length - 1){
    var names = EX.vars(it.from), env = {}, pool = [2,3,5,7];
    names.forEach(function(n,i2){ env[n] = pool[i2 % pool.length]; });
    var v1 = EX.evs(it.from, env), v2 = EX.evs(it.to, env);
    var same = Math.abs(v1 - v2) <= 1e-9 * Math.max(1, Math.abs(v1));
    h += '<div class="verd '+(same ? "ok" : "no")+'"><span>'+
      "<b>Kontrola dosazením:</b> pro "+names.map(function(n){ return EX.esc(n)+" = "+env[n]; }).join(", ")+
      " dá původní zápis "+EX.num(v1,4)+" a výsledný "+EX.num(v2,4)+". "+
      (same ? "Sedí — sbalení bylo v pořádku." : "Nesedí.")+"</span></div>";
    h += '<p class="stepnote" style="margin-top:.7rem">'+it.real+"</p>";
  }
  box.innerHTML = h;
  $("#szStep").textContent = "krok " + (szI + 1) + " / " + it.steps.length;
  $("#szNext").disabled = (szI >= it.steps.length - 1);
  if(window.renderFractions) window.renderFractions(box);
}
