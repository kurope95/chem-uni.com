/* ============================================================
   MODEL 1 (hero) — PŘEVODNÍK ZÁPISU
   Student napíše lineární výraz, stránka ho vysází stohovaně
   a barevně ukáže, co zlomková čára uzávorkovala.
   ============================================================ */
var PZ_EX = [
  "m / (M · V)", "m / M · V", "(m / M) / V", "p · V / (R · T)",
  "c₁ · V₁ / V₂", "(c₁ · V₁ + c₂ · V₂) / (V₁ + V₂)",
  "M · I · t / (z · F)", "1 / (a / b)", "(a + b) / (a + c)", "12 / 3 · 2"
];

function initPz(){
  var bar = $("#pzChips");
  bar.innerHTML = PZ_EX.map(function(e,i){
    return '<button type="button" data-i="'+i+'">'+EX.esc(e)+"</button>";
  }).join("");
  $$("button", bar).forEach(function(b){
    b.addEventListener("click", function(){
      $("#pzIn").value = PZ_EX[+b.getAttribute("data-i")];
      drawPz();
    });
  });
}

/* seznam zlomkových čar, které něco uzávorkovaly */
function pzBars(n, acc){
  acc = acc || [];
  if(!n || n.t !== "op"){ if(n && n.t==="neg") pzBars(n.a, acc); return acc; }
  if(n.o === "/"){
    if(n.a.t === "op") acc.push(["čitatel", EX.lin(n.a,0,null)]);
    if(n.b.t === "op") acc.push(["jmenovatel", EX.lin(n.b,0,null)]);
  }
  pzBars(n.a, acc); pzBars(n.b, acc);
  return acc;
}

function drawPz(){
  var raw = $("#pzIn").value;
  var out = $("#pzOut"), vals = $("#pzVals"), note = $("#pzMsg");
  var hl = zSegVal("pzMode") !== "plain";
  var node;
  try{
    node = EX.parse(raw);
  }catch(e){
    out.innerHTML = '<p class="err">'+EX.esc(e.message)+"</p>";
    vals.innerHTML = ""; note.textContent = "";
    return;
  }
  var stacked = EX.stk(node, 0, {hl:hl});
  var explicit = EX.expl(node);
  var added = EX.addedCount(node);

  var h = '<div class="bigeq"><span class="lbl">Stohovaně — takhle to patří na papír</span>'+stacked+"</div>";
  h += '<div class="twoup" style="margin-top:.8rem">'+
       '<div class="tu-cell"><span class="cap">Co jste napsal(a)</span>'+EX.esc(raw.replace(/\s+/g," ").trim())+"</div>"+
       '<div class="tu-rel">≡</div>'+
       '<div class="tu-cell"><span class="cap">Co to znamená — všechny závorky vypsané</span>'+explicit+"</div></div>";
  out.innerHTML = h;

  /* dosazení jednoduchých čísel */
  var names = EX.vlist(node), pool = [2,3,5,7,4,9,6,8,10,12], env = {};
  names.forEach(function(nm,i){ env[nm] = pool[i % pool.length]; });
  var v;
  try{ v = EX.ev(node, env); }catch(e){ v = NaN; }
  var cells = names.map(function(nm){
    return '<div class="convcell"><span class="cu">'+EX.esc(nm)+"</span><span class=\"cv\">= "+env[nm]+"</span></div>";
  });
  cells.push('<div class="convcell hi"><span class="cu">Hodnota výrazu</span><span class="cv">= '+
             (isFinite(v) ? EX.num(v,4) : "—")+"</span></div>");
  vals.innerHTML = cells.join("");

  var bars = pzBars(node);
  if(added === 0 && bars.length === 0){
    note.innerHTML = "V tomhle výrazu si čára nic nedomýšlí — nahoře i dole stojí jediný člen, takže lineární i stohovaný zápis vypadají stejně jednoduše.";
  } else if(added === 0){
    note.innerHTML = "Všechny závorky jste napsal(a) sám/sama, nic se nedomýšlí. Ve stohovaném zápisu se ale zvýrazněné závorky <b>ztratí</b> — nahradí je čára. To je v pořádku, čára dělá totéž.";
  } else {
    note.innerHTML = "Zvýrazněné závorky ve druhém rámečku jste <b>nenapsal(a)</b> — domýšlí je pravidlo o pořadí operací. Pokud jste je tam nechtěl(a), musíte je do řádkového zápisu doplnit ručně: zlomková čára je udělá sama, řádek ne.";
  }
  if(bars.length){
    note.innerHTML += " Zlomková čára tady uzávorkovala: " + bars.map(function(b){
      return "<b>"+b[0]+"</b> ("+b[1]+")";
    }).join(", ") + ".";
  }
  if(window.renderFractions) window.renderFractions(out);
}

/* ============================================================
   MODEL 2 (k00) — DVA ZÁPISY TÉHOŽ
   ============================================================ */
function initDz(){
  $("#dzSel").innerHTML = DZ_LIST.map(function(d,i){
    return '<option value="'+i+'">'+EX.esc(d.name)+"</option>";
  }).join("");
}
function drawDz(){
  var d = DZ_LIST[+$("#dzSel").value || 0];
  var box = $("#dzOut");
  var stacked = EX.esc(d.sym)+" = "+EX.stks(d.core, {hl:true});
  var h = '<div class="twoup">'+
    '<div class="tu-cell"><span class="cap">Lineárně — do řádku textu</span>'+EX.esc(d.sym+" = "+d.core)+"</div>"+
    '<div class="tu-rel ok">=</div>'+
    '<div class="tu-cell"><span class="cap">Stohovaně — na papír a k odvození</span>'+stacked+"</div></div>";
  h += '<div class="convgrid" style="margin-top:.85rem">'+
    '<div class="convcell"><span class="cu">Do řádku textu</span><span class="cv">'+EX.esc(d.sym+" = "+d.core)+"</span></div>"+
    '<div class="convcell"><span class="cu">Do kalkulačky</span><span class="cv">'+EX.esc(d.calc)+"</span></div>"+
    '<div class="convcell hi"><span class="cu">Na papír</span><span class="cv">'+stacked+"</span></div></div>";
  h += '<p class="stepnote" style="margin-top:.8rem">'+d.use+"</p>";
  box.innerHTML = h;
  if(window.renderFractions) window.renderFractions(box);
}

/* ============================================================
   MODEL 3 (k01) — KAM PATŘÍ ZÁVORKA (trenažér)
   ============================================================ */
var kzI = 0, kzOrder = [], kzSc = null, kzLock = false;

function initKz(){
  kzSc = zScore();
  kzOrder = zShuffle(KZ_LIST.map(function(_,i){ return i; }), zRnd(11));
  kzI = 0;
  drawKz();
}
function drawKz(){
  var it = KZ_LIST[kzOrder[kzI % kzOrder.length]];
  kzLock = false;
  $("#kzQ").innerHTML = "Který stohovaný zápis znamená totéž co tenhle řádek?"+
    '<span class="big">'+EX.esc(it.e)+"</span>";
  var opts = it.o;
  $("#kzOpts").innerHTML = opts.map(function(o,i){
    return '<button class="drill-opt" type="button" data-i="'+i+'">'+EX.stks(o,{hl:true})+"</button>";
  }).join("");
  $$("#kzOpts .drill-opt").forEach(function(b){
    b.addEventListener("click", function(){ kzPick(+b.getAttribute("data-i")); });
  });
  var fb = $("#kzFb");
  fb.className = "drill-fb";
  fb.textContent = "Vyberte zápis, který dává stejný výsledek jako řádek nahoře.";
  $("#kzScore").textContent = kzSc.txt();
}
function kzPick(i){
  if(kzLock) return;
  kzLock = true;
  var it = KZ_LIST[kzOrder[kzI % kzOrder.length]];
  var correct = -1, vals = [];
  for(var k=0;k<it.o.length;k++){
    vals.push(EX.evs(it.o[k], {}));
    if(zSame(it.e, it.o[k]) && correct < 0) correct = k;
  }
  var target = EX.evs(it.e, {});
  $$("#kzOpts .drill-opt").forEach(function(b,k){
    if(k === correct) b.classList.add("ok");
    else if(k === i) b.classList.add("no");
  });
  kzSc.all++;
  var fb = $("#kzFb");
  if(i === correct){
    kzSc.ok++;
    fb.className = "drill-fb ok";
    fb.innerHTML = "<b>Správně.</b> "+EX.esc(it.e)+" = "+EX.num(target,4)+". "+it.why;
  } else {
    fb.className = "drill-fb no";
    fb.innerHTML = "<b>Ne.</b> "+EX.esc(it.e)+" = "+EX.num(target,4)+", kdežto vaše volba dává "+
      EX.num(vals[i],4)+". "+it.why;
  }
  $("#kzScore").textContent = kzSc.txt();
  if(kzSc.all >= 6 && kzSc.pct() >= 0.75) markDone("k1");
  if(window.renderFractions) window.renderFractions();
}

/* ============================================================
   MODEL 4 (k01) — ZKOUŠEČKA ROVNOSTI
   Porovnává se ČÍSELNĚ dosazením, nikdy ne strukturou zápisu.
   ============================================================ */
var zrSeed = 4;

function initZr(){
  var op = ZR_LIST.map(function(e,i){
    return '<option value="'+i+'">'+EX.esc(e)+"</option>";
  }).join("");
  $("#zrL").innerHTML = op;
  $("#zrR").innerHTML = op;
  $("#zrL").value = "0";
  $("#zrR").value = "1";
}
function drawZr(){
  var L = ZR_LIST[+$("#zrL").value || 0], R = ZR_LIST[+$("#zrR").value || 0];
  var box = $("#zrOut");
  box.innerHTML = '<div class="twoup">'+
    '<div class="tu-cell"><span class="cap">Levý zápis</span>'+EX.stks(L,{hl:true})+"</div>"+
    '<div class="tu-rel">?</div>'+
    '<div class="tu-cell"><span class="cap">Pravý zápis</span>'+EX.stks(R,{hl:true})+"</div></div>";
  $("#zrTab").innerHTML = "";
  var v = $("#zrVerd");
  v.className = "verd";
  v.innerHTML = "Stiskněte <b>Dosadit čísla</b>. Stránka do obou zápisů dosadí tři různé trojice malých čísel a porovná výsledky.";
  if(window.renderFractions) window.renderFractions(box);
}
function runZr(){
  var L = ZR_LIST[+$("#zrL").value || 0], R = ZR_LIST[+$("#zrR").value || 0];
  zrSeed = (zrSeed * 7 + 13) % 99991;
  var res = EX.equalByNumbers(L, R, 3, zRnd(zrSeed));
  var names = res.names;
  var h = '<table class="subtab"><thead><tr><th>Pokus</th>'+
    names.map(function(n){ return "<th>"+EX.esc(n)+"</th>"; }).join("")+
    "<th>vlevo</th><th>vpravo</th><th>shoda</th></tr></thead><tbody>";
  res.rows.forEach(function(r,i){
    h += '<tr class="'+(r.ok ? "same" : "diff")+'"><td>'+(i+1)+"</td>"+
      names.map(function(n){ return "<td>"+EX.num(r.env[n],0)+"</td>"; }).join("")+
      "<td>"+EX.num(r.a,4)+"</td><td>"+EX.num(r.b,4)+"</td><td>"+(r.ok ? "ano" : "ne")+"</td></tr>";
  });
  h += "</tbody></table>";
  $("#zrTab").innerHTML = h;
  var rel = $("#zrOut .tu-rel"), v = $("#zrVerd");
  if(res.same){
    if(rel){ rel.textContent = "="; rel.className = "tu-rel ok"; }
    v.className = "verd ok";
    v.innerHTML = "<b>Shodují se.</b> Na všech třech dosazeních vyšlo stejné číslo. Tři nezávislé shody nejsou důkaz, ale v praxi to stačí — přepis je skoro jistě správný. Zkuste tlačítko ještě párkrát, čísla se pokaždé mění.";
  } else {
    if(rel){ rel.textContent = "≠"; rel.className = "tu-rel no"; }
    v.className = "verd no";
    v.innerHTML = "<b>Liší se.</b> Stačí jediné dosazení, ve kterém vyjde jiné číslo, a je hotovo: tyhle dva zápisy neznamenají totéž. Jedna nalezená neshoda je důkaz, na rozdíl od tisíce shod.";
  }
}
