/* ============================================================
   24 · ČÍSELNÉ FORMÁTOVÁNÍ (horní indexy, vědecký tvar)
   ============================================================ */
var SUPCH = {"-":"⁻","0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹"};
function pcSup(n){
  return String(n).split("").map(function(ch){ return SUPCH[ch] || ch; }).join("");
}
/* číslo v české notaci; velmi malá a velká čísla vědecky */
function pcNum(x, sig){
  if(x === 0) return "0";
  if(!isFinite(x)) return "—";
  sig = sig || 5;
  var ax = Math.abs(x);
  if(ax >= 1e6 || ax < 1e-4){
    var e = Math.floor(Math.log(ax)/Math.LN10);
    var mant = x / Math.pow(10, e);
    if(Math.abs(mant) >= 10){ mant /= 10; e++; }
    return mant.toPrecision(4).replace(/0+$/,"").replace(/\.$/,"").replace(".",",") + "·10" + pcSup(e);
  }
  var s = ax.toPrecision(sig);
  if(s.indexOf("e") >= 0) s = Number(s).toString();
  if(s.indexOf(".") >= 0) s = s.replace(/0+$/,"").replace(/\.$/,"");
  return (x < 0 ? "−" : "") + s.replace(".", ",");
}

/* ============================================================
   25 · MODEL — osa předpon SI
   ============================================================ */
var pxState = {exp:-3, unit:"g"};
var PXUNAME = {g:"gram", L:"litr", mol:"mol", m:"metr"};
var PXEX = {
  g:{"-12":"pikogram — hmotnost jedné buňky","-9":"nanogram — hmotnost virové částice",
     "-6":"mikrogram — dávka hormonu","-3":"miligram — tableta účinné látky",
     "-2":"centigram — nepoužívá se","-1":"decigram — nepoužívá se",
     "0":"gram — základní jednotka chemických navážek","3":"kilogram — základní jednotka SI",
     "6":"megagram = tuna — průmyslové množství","9":"gigagram — roční produkce závodu"},
  L:{"-12":"pikolitr — objem jedné buňky","-9":"nanolitr — kapka z mikropipety",
     "-6":"mikrolitr — dávkování v analytice","-3":"mililitr = cm³ — pipeta, byreta",
     "-2":"centilitr — jen v gastronomii","-1":"decilitr — deci vína, ne dm³!",
     "0":"litr = dm³ — základ chemické koncentrace","3":"kilolitr = m³ — reaktor",
     "6":"megalitr — nádrž vodárny","9":"gigalitr — přehrada"},
  mol:{"-12":"pikomol — stopová analýza","-9":"nanomol — biochemie",
     "-6":"mikromol — enzymová kinetika","-3":"milimol — běžné laboratorní množství",
     "-2":"centimol — nepoužívá se","-1":"decimol — nepoužívá se",
     "0":"mol — základní jednotka SI","3":"kilomol — průmyslová chemie",
     "6":"megamol — nepoužívá se","9":"gigamol — nepoužívá se"},
  m:{"-12":"pikometr — délka chemické vazby (C–C = 154 pm)","-9":"nanometr — vlnová délka světla",
     "-6":"mikrometr — velikost bakterie","-3":"milimetr — makroskopický rozměr",
     "-2":"centimetr — laboratorní sklo","-1":"decimetr — hrana krychle o objemu 1 L",
     "0":"metr — základní jednotka SI","3":"kilometr — makroskopická vzdálenost",
     "6":"megametr — nepoužívá se","9":"gigametr — astronomie"}
};

function pxInfo(e){
  for(var i=0;i<PREF.length;i++) if(PREF[i][0]===e) return PREF[i];
  return [e,"—","","",""];
}
var PXSYM = {g:"g", L:"L", mol:"mol", m:"m"};
function drawPx(){
  var W = 760, H = 200, L = 46, R = 720, ax = 128;
  var usym = PXSYM[pxState.unit];
  var e0 = -12, e1 = 9;
  var X = function(e){ return L + (e - e0) / (e1 - e0) * (R - L); };
  var s = "";
  s += line(L, ax, R, ax, {c:"var(--line-strong)", w:1.6, cap:"round"});
  for(var e = e0; e <= e1; e++){
    var big = PREF.filter(function(p){ return p[0]===e && p[2]; }).length > 0;
    var x = X(e);
    s += line(x, ax - (big?9:4), x, ax + (big?9:4), {c: big ? "var(--line-strong)" : "var(--line)", w: big?1.6:1});
    if(big){
      var pr = pxInfo(e);
      s += txt(x, ax + 26, pr[2], {anchor:"middle", size:13, w:700, fill:"var(--ink-2)", mono:true});
      s += txt(x, ax + 41, "10" + pcSup(e), {anchor:"middle", size:10.5, fill:"var(--ink-3)", mono:true});
    }
  }
  /* nula = základní jednotka */
  s += txt(X(0), ax - 20, "základ", {anchor:"middle", size:10.5, w:600, fill:"var(--ink-3)",
      style:"letter-spacing:.08em;text-transform:uppercase"});
  /* aktuální poloha */
  var cx = X(pxState.exp), inf = pxInfo(pxState.exp);
  var col = pxState.exp < 0 ? "var(--endo)" : (pxState.exp > 0 ? "var(--exo)" : "var(--accent)");
  s += line(cx, 34, cx, ax - 12, {c: col, w: 2, dash: "3 4"});
  s += '<circle cx="'+cx+'" cy="'+ax+'" r="8" style="fill:'+col+';stroke:var(--surface);stroke-width:2.5"/>';
  var lbl = (inf[2] ? inf[1] + " (" + inf[2] + ")" : "bez zavedené předpony");
  var an = cx > 560 ? "end" : (cx < 200 ? "start" : "middle");
  s += txt(cx, 26, lbl, {anchor:an, size:14, w:700, fill:col});
  s += txt(cx, 45, (inf[2] ? "1 " + inf[2] + usym : "1 · 10" + pcSup(pxState.exp) + " " + usym) +
      " = 10" + pcSup(pxState.exp) + " " + usym + "  (" + PXUNAME[pxState.unit] + ")",
      {anchor:an, size:11.5, fill:"var(--ink-3)", mono:true});
  /* popisky stran */
  s += txt(L, 189, "menší než základ ←", {size:11, w:600, fill:"var(--endo)"});
  s += txt(R, 189, "→ větší než základ", {size:11, w:600, fill:"var(--exo)", anchor:"end"});
  $("#pxWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Osa předpon soustavy SI"');

  var sym = usym;
  var pre = inf[2];
  $("#pxExpV").innerHTML = "10" + pcSup(pxState.exp) + (inf[2] ? " (" + inf[1] + ")" : " (bez předpony)");
  var ro1 = $("#pxRo1"), ro2 = $("#pxRo2"), ro3 = $("#pxRo3");
  ro1.children[1].textContent = pre ? (pre + sym) : ("10" + pcSup(pxState.exp) + " " + sym);
  ro1.children[2].textContent = pre ? ("předpona " + inf[1] + " + " + sym) : "pro tento řád není předpona";
  ro2.children[1].innerHTML = "1 " + (pre||"") + sym + " = 10" + pcSup(pxState.exp) + " " + sym;
  ro2.children[2].textContent = inf[3] || "násobek základní jednotky";
  var ex = PXEX[pxState.unit][String(pxState.exp)] || "pro tenhle řád se předpona v chemii nepoužívá";
  ro3.children[1].textContent = pre ? (pre + sym) : "—";
  ro3.children[2].textContent = ex;
}

/* ============================================================
   26 · MODEL — převodník jednotek
   ============================================================ */
var cvState = {cat:"V", ui:1, val:250};

function cvFillUnits(){
  var c = CONV[cvState.cat];
  var sel = $("#cvUnit"), h = "";
  c.u.forEach(function(u, i){ h += '<option value="'+i+'">'+u[0]+'</option>'; });
  sel.innerHTML = h;
  if(cvState.ui >= c.u.length) cvState.ui = 0;
  sel.selectedIndex = cvState.ui;
}
function cvToBase(v, cat, ui){
  var c = CONV[cat], name = c.u[ui][0];
  if(cat === "T"){
    if(name === "K") return v;
    if(name === "°C") return v + 273.15;
    return (v - 32) * 5/9 + 273.15;      /* °F */
  }
  return v * c.u[ui][1];
}
function cvFromBase(b, cat, i){
  var c = CONV[cat], name = c.u[i][0];
  if(cat === "T"){
    if(name === "K") return b;
    if(name === "°C") return b - 273.15;
    return (b - 273.15) * 9/5 + 32;      /* °F */
  }
  return b / c.u[i][1];
}
function drawConv(){
  var c = CONV[cvState.cat];
  var base = cvToBase(cvState.val, cvState.cat, cvState.ui);
  $("#cvValV").textContent = pcNum(cvState.val, 5) + " " + c.u[cvState.ui][0];
  var h = "";
  c.u.forEach(function(u, i){
    var v = cvFromBase(base, cvState.cat, i);
    var hi = (u[0] === c.hi) ? " hi" : "";
    h += '<div class="convcell'+hi+'"><span class="cu">'+u[0]+'</span><span class="cv">'+pcNum(v,5)+'</span></div>';
  });
  /* vědecký tvar základní jednotky */
  h += '<div class="convcell"><span class="cu">vědecký tvar ('+c.base+')</span><span class="cv">'+
       pcNumSci(base)+'</span></div>';
  $("#cvOut").innerHTML = h;
  var note = {
    V:"Zvýrazněná dlaždice dm³ je jednotka, ve které se počítá koncentrace. Litr a&nbsp;dm³ jsou totéž, stejně jako mililitr a&nbsp;cm³.",
    m:"Chemie váží v&nbsp;gramech, SI ale v&nbsp;kilogramech. Do vzorců s&nbsp;molární hmotností v&nbsp;g·mol⁻¹ patří gramy.",
    n:"Millimol se hodí u&nbsp;titrací: mmol = cm³ · mol·dm⁻³, což ušetří jeden převod.",
    p:"Všimněte si, jak blízko sebe leží bar (100&nbsp;kPa) a&nbsp;atmosféra (101,325&nbsp;kPa) — rozdíl 1,3&nbsp;%, ale právě on dělá rozdíl mezi 22,414 a&nbsp;22,711&nbsp;dm³·mol⁻¹.",
    E:"Kilojoule je pracovní jednotka termochemie. Kalorie se dnes používá jen ve výživě: 1&nbsp;kcal = 4,184&nbsp;kJ.",
    c:"Molarita mol·dm⁻³ je tisíckrát větší než jednotka SI mol·m⁻³ — proto se v&nbsp;chemii nikdy nepočítá v&nbsp;SI.",
    T:"Kelvin a&nbsp;stupeň Celsia mají stejně velký dílek, liší se jen posunutím o&nbsp;273,15. Rozdíly teplot jsou proto v&nbsp;obou stejné, absolutní teploty ne."
  }[cvState.cat];
  $("#cvNote").innerHTML = note;
}
function pcNumSci(x){
  if(x === 0) return "0";
  var e = Math.floor(Math.log(Math.abs(x))/Math.LN10);
  var m = x / Math.pow(10, e);
  if(Math.abs(m) >= 10){ m /= 10; e++; }
  return m.toPrecision(4).replace(/0+$/,"").replace(/\.$/,"").replace(".",",") + "·10" + pcSup(e);
}

/* ============================================================
   27 · TRENAŽÉR — rozměrová kontrola
   ============================================================ */
var dimState = {i:0, ok:0, tot:0, streak:0, answered:false};

function drawDim(){
  var q = DIMQ[dimState.i];
  $("#dimQ").innerHTML = "Jaká jednotka vyjde z&nbsp;výrazu:<span class=\"big\">"+q.e+"</span>"+
    '<span style="display:block;font-family:var(--f-mono);font-size:.86rem;color:var(--ink-3);margin-top:.35rem">'+q.h+'</span>';
  var h = "";
  q.o.forEach(function(o, i){ h += '<button class="drill-opt" type="button" data-i="'+i+'">'+o+'</button>'; });
  $("#dimOpts").innerHTML = h;
  $$("#dimOpts .drill-opt").forEach(function(b){
    b.addEventListener("click", function(){ dimAnswer(+b.dataset.i); });
  });
  $("#dimScore").textContent = dimState.ok + " / " + dimState.tot +
    (dimState.streak > 1 ? "  ·  série " + dimState.streak : "");
  dimState.answered = false;
}
function dimAnswer(i){
  if(dimState.answered) return;
  dimState.answered = true;
  var q = DIMQ[dimState.i], good = (i === q.c);
  dimState.tot++;
  if(good){ dimState.ok++; dimState.streak++; } else { dimState.streak = 0; }
  $$("#dimOpts .drill-opt").forEach(function(b, bi){
    if(bi === q.c) b.classList.add("ok");
    else if(bi === i) b.classList.add("no");
  });
  $("#dimFb").className = "drill-fb " + (good ? "ok" : "no");
  $("#dimFb").innerHTML = (good ? "<b>Správně.</b> " : "<b>Správně je " + q.o[q.c] + ".</b> ") + q.x;
  $("#dimScore").textContent = dimState.ok + " / " + dimState.tot +
    (dimState.streak > 1 ? "  ·  série " + dimState.streak : "");
  if(dimState.streak >= 10) markDone("k2");
}
function dimNext(){
  dimState.i = (dimState.i + 1) % DIMQ.length;
  $("#dimFb").className = "drill-fb";
  $("#dimFb").innerHTML = "Vyberte jednotku, která z&nbsp;výrazu vyjde po vykrácení.";
  drawDim();
}
function initDim(){
  dimState.i = Math.floor(Math.random() * DIMQ.length);
  drawDim();
}
