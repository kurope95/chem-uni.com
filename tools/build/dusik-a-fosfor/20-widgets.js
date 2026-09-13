/* ============================================================
   2 · SPOLEČNÍ POMOCNÍCI PRO KRESLENÍ
   ============================================================ */

/* vodorovná šipka s popiskem */
function hArr(x1, x2, y, color, label, dashed){
  var s = line(x1, y, x2, y, {c:color, w:2, cap:"round", dash:dashed?"5 4":null});
  var d = (x2 > x1) ? 1 : -1;
  s += '<path d="M'+x2+' '+y+' l'+(-6*d)+' -4 l0 8 z" style="fill:'+color+'"/>';
  if(label) s += txt((x1+x2)/2, y-8, label, {anchor:"middle", size:11.5, w:600, fill:color});
  return s;
}
/* obousměrná vodorovná šipka */
function hArr2(x1, x2, y, color, label){
  var s = line(x1, y, x2, y, {c:color, w:2, cap:"round"});
  s += '<path d="M'+x2+' '+y+' l-6 -4 l0 8 z" style="fill:'+color+'"/>';
  s += '<path d="M'+x1+' '+y+' l6 -4 l0 8 z" style="fill:'+color+'"/>';
  if(label) s += txt((x1+x2)/2, y-8, label, {anchor:"middle", size:11.5, w:600, fill:color});
  return s;
}
/* zaoblený obdélník s textem uprostřed */
function box(x, y, w, h, label, o){
  o = o || {};
  var s = rect(x, y, w, h, {r:o.r===undefined?8:o.r, fill:o.fill||"var(--surface-2)",
                            stroke:o.stroke||"var(--line-strong)", sw:o.sw||1.2});
  var lines = String(label).split("|");
  var y0 = y + h/2 + 5 - (lines.length-1)*8;
  lines.forEach(function(t, i){
    s += txt(x+w/2, y0+i*16, t, {anchor:"middle", size:o.size||12.5, w:o.w||600,
                                 fill:o.ink||"var(--ink)", mono:!!o.mono});
  });
  return s;
}
/* atom jako kolečko se značkou */
function atom(x, y, sym, o){
  o = o || {};
  var r = o.r || 15;
  var s = '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" style="fill:'+(o.fill||"var(--surface)")+
          ';stroke:'+(o.stroke||"var(--ink-2)")+';stroke-width:'+(o.sw||1.6)+'"/>';
  s += txt(x, y+r*0.34, sym, {anchor:"middle", size:o.size||(r*0.92), w:700, fill:o.ink||"var(--ink)"});
  return s;
}
/* volný elektronový pár jako dvě tečky */
function lonePair(x, y, ang, color){
  var a = ang*Math.PI/180, dx = Math.cos(a)*4.5, dy = Math.sin(a)*4.5;
  var c = color || "var(--accent)";
  return '<circle cx="'+(x+dx)+'" cy="'+(y+dy)+'" r="2.6" style="fill:'+c+'"/>'+
         '<circle cx="'+(x-dx)+'" cy="'+(y-dy)+'" r="2.6" style="fill:'+c+'"/>';
}
/* svazek n rovnoběžných čar = jednoduchá / dvojná / trojná vazba */
function bondN(x1, y1, x2, y2, n, o){
  o = o || {};
  var dx = x2-x1, dy = y2-y1, L = Math.sqrt(dx*dx+dy*dy) || 1;
  var nx = -dy/L, ny = dx/L, gap = o.gap || 3.4, s = "";
  for(var i=0;i<n;i++){
    var off = (i - (n-1)/2) * gap;
    s += line(x1+nx*off, y1+ny*off, x2+nx*off, y2+ny*off,
              {c:o.c||"var(--ink-2)", w:o.w||2, cap:"round"});
  }
  return s;
}
/* horní index z číslice — pro zápis mocnin deseti v textu */
var SUPD = {"0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹","-":"⁻","−":"⁻"};
function sup(n){
  return String(n).split("").map(function(ch){ return SUPD[ch] || ch; }).join("");
}
/* svislá osa se stupnicí */
function yAxis(x, yTop, yBot, vMin, vMax, ticks, unit){
  var s = line(x, yTop, x, yBot, {c:"var(--line-strong)", w:1.3});
  for(var i=0;i<=ticks;i++){
    var v = vMin + (vMax-vMin)*i/ticks;
    var y = yBot - (yBot-yTop)*i/ticks;
    s += line(x-4, y, x, y, {c:"var(--line-strong)", w:1.1});
    s += txt(x-8, y+4, fmt(v, (vMax-vMin)>=100?0:2), {anchor:"end", size:10, mono:true, fill:"var(--ink-3)"});
  }
  if(unit) s += txt(x-8, yTop-10, unit, {anchor:"end", size:10, w:600, fill:"var(--ink-3)"});
  return s;
}

/* ============================================================
   3 · HERO — žebřík oxidačních stavů dusíku a fosforu
   ============================================================ */
var oxState = {el:"N", lev:5};

function oxColor(role){
  if(role.indexOf("jen oxidační")>=0 || role.indexOf("silně oxidační")>=0) return "var(--exo)";
  if(role.indexOf("redukční i oxidační")>=0 || role.indexOf("oxidační i redukční")>=0) return "var(--cat3)";
  if(role.indexOf("redukční")>=0) return "var(--endo)";
  return "var(--ink-3)";
}
function oxFind(el, lev){
  var arr = LAD[el];
  for(var i=0;i<arr.length;i++) if(arr[i].ox===lev) return arr[i];
  return null;
}
function oxRoman(n){
  var R = {"-3":"−III","-2":"−II","-1":"−I","0":"0","1":"+I","2":"+II","3":"+III","4":"+IV","5":"+V"};
  return R[String(n)];
}
function drawOx(){
  var W=780, H=392, top=58, rowH=34, s="";
  var cx = {N:250, P:580}, colW = 258;
  s += txt(cx.N, 26, "DUSÍK", {anchor:"middle", size:12.5, w:700, fill:"var(--ink)", style:"letter-spacing:.12em"});
  s += txt(cx.P, 26, "FOSFOR", {anchor:"middle", size:12.5, w:700, fill:"var(--ink)", style:"letter-spacing:.12em"});
  s += txt(66, 26, "ox. číslo", {anchor:"end", size:10.5, w:600, fill:"var(--ink-3)"});

  for(var v=5; v>=-3; v--){
    var y = top + (5-v)*rowH;
    var on = (v===oxState.lev);
    s += line(76, y, W-16, y+0, {c:on?"var(--accent)":"var(--grid)", w:on?1.4:1, dash:on?null:"3 4"});
    s += txt(66, y+4, oxRoman(v), {anchor:"end", size:12, w:on?700:500, mono:true,
             fill:on?"var(--accent)":"var(--ink-3)"});
  }
  ["N","P"].forEach(function(el){
    LAD[el].forEach(function(it){
      var y = top + (5-it.ox)*rowH, on = (it.ox===oxState.lev);
      var c = oxColor(it.role);
      var x = cx[el]-colW/2;
      s += rect(x, y-13, colW, 26, {r:7, fill:on?"var(--surface)":"var(--surface-2)",
                stroke:on?c:"var(--line)", sw:on?2.2:1});
      s += txt(cx[el], y+5, it.f, {anchor:"middle", size:on?13:12, w:on?700:500, fill:on?c:"var(--ink-2)"});
    });
  });
  /* chybějící stavy fosforu */
  [-2,-1,2].forEach(function(v){
    var y = top + (5-v)*rowH;
    s += txt(cx.P, y+4, "— fosfor tento stav prakticky netvoří —",
             {anchor:"middle", size:10.5, fill:"var(--ink-3)", style:"font-style:italic"});
  });
  /* pravý sloupec: směr redoxního chování */
  var yT = top-6, yB = top+8*rowH+6;
  s += line(W-14, yT, W-14, yB, {c:"var(--line-strong)", w:1.6, cap:"round"});
  s += '<path d="M'+(W-14)+' '+yT+' l-5 8 l10 0 z" style="fill:var(--exo)"/>';
  s += '<path d="M'+(W-14)+' '+yB+' l-5 -8 l10 0 z" style="fill:var(--endo)"/>';
  s += txt(W-24, yT+16, "oxidační", {anchor:"end", size:10, w:600, fill:"var(--exo)"});
  s += txt(W-24, yB-8, "redukční", {anchor:"end", size:10, w:600, fill:"var(--endo)"});
  s += txt(96, H-10, "zelená = látka může jen odevzdávat elektrony · oranžová = jen přijímat · žlutá = obojí",
           {size:10.5, fill:"var(--ink-3)"});
  $("#oxWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Žebřík oxidačních stavů dusíku a fosforu"');

  var it = oxFind(oxState.el, oxState.lev);
  var other = oxFind(oxState.el==="N"?"P":"N", oxState.lev);
  $("#oxLevV").textContent = oxRoman(oxState.lev);
  $$("#oxEl button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===oxState.el); });

  if(it){
    $("#oxRo1").innerHTML = '<span class="k">Oxidační číslo</span><span class="v">'+oxRoman(it.ox)+
      '</span><span class="h">'+(oxState.el==="N"?"dusík":"fosfor")+'</span>';
    $("#oxRo2").innerHTML = '<span class="k">Typické částice</span><span class="v" style="font-size:1rem">'+
      it.f+'</span><span class="h">'+it.nm+'</span>';
    $("#oxRo3").innerHTML = '<span class="k">Redoxní chování</span><span class="v" style="font-size:1rem;color:'+
      oxColor(it.role)+'">'+it.role+'</span><span class="h">z tohoto stavu se dá jít jen tam, kde má prvek volný prostor</span>';
    $("#oxDetail").innerHTML = '<p>'+it.txt+'</p>' +
      '<p style="color:var(--ink-2);font-size:.93rem;margin-top:.5rem">' +
      (other ? '<b>' + (oxState.el==="N"?"Fosfor":"Dusík") + ' ve stejném stavu:</b> <span class="chem">'+other.f+'</span> — '+other.nm+'.'
             : '<b>' + (oxState.el==="N"?"Fosfor":"Dusík") + '</b> tento oxidační stav prakticky netvoří.') + '</p>';
  } else {
    $("#oxRo1").innerHTML = '<span class="k">Oxidační číslo</span><span class="v">'+oxRoman(oxState.lev)+'</span><span class="h">neobsazeno</span>';
    $("#oxRo2").innerHTML = '<span class="k">Typické částice</span><span class="v" style="font-size:1rem">—</span><span class="h">fosfor tento stav netvoří</span>';
    $("#oxRo3").innerHTML = '<span class="k">Redoxní chování</span><span class="v" style="font-size:1rem">—</span><span class="h">podívejte se na dusík ve stejné výšce</span>';
    $("#oxDetail").innerHTML = '<p>Fosfor tenhle oxidační stav prakticky netvoří. Stavy −II, −I a +II jsou u dusíku vázané na homonukleární vazbu N—N nebo na lichý počet elektronů; fosfor takové částice buď netvoří vůbec, nebo jen jako laboratorní kuriozity.</p>' +
      '<p style="color:var(--ink-2);font-size:.93rem;margin-top:.5rem"><b>Dusík ve stejném stavu:</b> <span class="chem">'+
      (other?other.f:"—")+'</span>'+(other?' — '+other.nm+'.':'')+'</p>';
  }
}
function initOx(){
  $$("#oxEl button").forEach(function(b){
    b.addEventListener("click", function(){ oxState.el = b.dataset.v; drawOx(); });
  });
  $("#oxLev").addEventListener("input", function(){ oxState.lev = +this.value; drawOx(); });
  drawOx();
}

/* ============================================================
   4 · KAPITOLA 0 — průzkumník skupiny 15
   ============================================================ */
var g15State = {s:"N", prop:"en"};
var G15PROP = {
  en: {k:"en",  nm:"elektronegativita",       u:"—",     d:2, hi:"klesá dolů skupinou"},
  r:  {k:"r",   nm:"kovalentní poloměr",      u:"pm",    d:0, hi:"roste dolů skupinou"},
  ie: {k:"ie",  nm:"1. ionizační energie",    u:"kJ·mol⁻¹", d:0, hi:"klesá dolů skupinou"},
  tv: {k:"tv",  nm:"teplota varu",            u:"°C",    d:1, hi:"prudce roste od dusíku k antimonu; arsen místo varu sublimuje"}
};
function g15Get(s){ for(var i=0;i<G15.length;i++) if(G15[i].s===s) return G15[i]; return G15[0]; }
function drawG15(){
  var P = G15PROP[g15State.prop], W=740, H=250, s="";
  var vals = G15.map(function(e){ return e[P.k]; });
  var vMin = Math.min.apply(null, vals), vMax = Math.max.apply(null, vals);
  var lo = Math.min(0, vMin), hi = vMax;
  if(P.k==="tv"){ lo = -250; hi = 1700; }
  if(P.k==="en"){ lo = 0; hi = 3.5; }
  if(P.k==="r"){ lo = 0; hi = 160; }
  if(P.k==="ie"){ lo = 0; hi = 1500; }
  var x0=78, y0=42, yB=196, colW=(W-x0-30)/G15.length;
  var zeroY = yB - (0-lo)/(hi-lo)*(yB-y0);
  s += yAxis(x0-6, y0, yB, lo, hi, 4, P.u);
  s += line(x0-6, zeroY, W-24, zeroY, {c:"var(--line-strong)", w:1.2});
  G15.forEach(function(e, i){
    var x = x0 + i*colW + colW*0.18, bw = colW*0.64;
    var v = e[P.k];
    var y = yB - (v-lo)/(hi-lo)*(yB-y0);
    var on = e.s===g15State.s;
    var c = e.char==="nekov" ? "var(--cat1)" : (e.char==="polokov" ? "var(--cat3)" : "var(--cat4)");
    var top = Math.min(y, zeroY), hgt = Math.abs(zeroY-y);
    s += rect(x, top, bw, hgt, {r:5, fill:c, style:"fill-opacity:"+(on?"1":".42")});
    if(on) s += rect(x-2, top-2, bw+4, hgt+4, {r:7, fill:"none", stroke:"var(--ink)", sw:2.2});
    s += txt(x+bw/2, (v<0?zeroY-8:y-7), fmt(v, P.d), {anchor:"middle", size:11, w:700, mono:true,
             fill:on?"var(--ink)":"var(--ink-2)"});
    s += txt(x+bw/2, yB+18, e.s, {anchor:"middle", size:14, w:700, fill:on?"var(--ink)":"var(--ink-2)"});
    s += txt(x+bw/2, yB+32, e.name, {anchor:"middle", size:10, fill:"var(--ink-3)"});
    s += txt(x+bw/2, yB+45, e.char, {anchor:"middle", size:9.5, w:600, fill:c, style:"letter-spacing:.06em"});
  });
  s += txt(x0, 22, P.nm+" ["+P.u+"] · "+P.hi, {size:11.5, w:600, fill:"var(--ink-2)"});
  $("#g15Wrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Trend '+P.nm+' ve skupině 15"');

  var e = g15Get(g15State.s);
  $("#g15Ro1").innerHTML = '<span class="k">Konfigurace valenční sféry</span><span class="v" style="font-size:.98rem">'+e.konf+'</span><span class="h">protonové číslo '+e.z+'</span>';
  $("#g15Ro2").innerHTML = '<span class="k">Oxidační čísla</span><span class="v" style="font-size:.95rem">'+e.ox+'</span><span class="h">vaznost: '+e.vazn+'</span>';
  $("#g15Ro3").innerHTML = '<span class="k">Charakter oxidu v nejvyšším stavu</span><span class="v" style="font-size:.95rem">'+e.oxid+'</span><span class="h">kyselost oxidu klesá dolů skupinou</span>';
  $("#g15Ro4").innerHTML = '<span class="k">Hydrid EH₃</span><span class="v" style="font-size:.95rem">'+e.hyd+'</span><span class="h">zásaditost hydridu klesá dolů skupinou</span>';
  $("#g15Text").innerHTML = '<b>'+e.name.charAt(0).toUpperCase()+e.name.slice(1)+'</b> — '+e.pozn;
  $$("#g15Prop button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===g15State.prop); });
  $("#g15Sel").value = g15State.s;
}
function initG15(){
  $("#g15Sel").innerHTML = G15.map(function(e){
    return '<option value="'+e.s+'">'+e.s+' — '+e.name+'</option>';
  }).join("");
  $("#g15Sel").addEventListener("change", function(){ g15State.s = this.value; drawG15(); });
  $$("#g15Prop button").forEach(function(b){
    b.addEventListener("click", function(){ g15State.prop = b.dataset.v; drawG15(); });
  });
  drawG15();
}

/* ============================================================
   5 · KAPITOLA 0 — trenažér oxidačních čísel a názvosloví
   ============================================================ */
var nzI = 0, nzScore = 0, nzDone = false;
function drawNz(){
  var it = NZQ[nzI];
  $("#nzQn").textContent = nzI+1;
  $("#nzQtot").textContent = NZQ.length;
  $("#nzScore").textContent = nzScore;
  $("#nzTask").innerHTML = it.t;
  $("#nzOpts").innerHTML = it.o.map(function(o, i){
    return '<button class="btn" type="button" data-oi="'+i+'" style="white-space:normal;line-height:1.35;text-align:left;justify-content:flex-start">'+o+'</button>';
  }).join("");
  var ex = $("#nzExplain");
  ex.style.display = "none"; ex.className = "explain";
  $("#nzNext").disabled = true; nzDone = false;
  $$("#nzOpts button").forEach(function(b){
    b.addEventListener("click", function(){
      if(nzDone) return; nzDone = true;
      var ok = (+b.dataset.oi === it.c);
      if(ok) nzScore++;
      $("#nzScore").textContent = nzScore;
      ex.style.display = "flex";
      ex.style.background = ok ? "var(--ok-soft)" : "var(--bad-soft)";
      ex.style.borderColor = ok ? "var(--ok)" : "var(--bad)";
      ex.innerHTML = '<span class="verdict" style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+
        (ok ? "✓ Správně" : "✕ Špatně — správně je „"+it.o[it.c]+"“")+
        '</span><span class="eyebrow">Proč</span><div>'+it.e+'</div>';
      $$("#nzOpts button").forEach(function(x){
        x.disabled = true;
        x.style.opacity = (+x.dataset.oi===it.c) ? "1" : ".45";
        if(+x.dataset.oi===it.c){ x.style.borderColor="var(--ok)"; x.style.color="var(--ok)"; }
      });
      $("#nzNext").disabled = (nzI >= NZQ.length-1);
      if(nzI >= NZQ.length-1){
        toast("Trenažér dokončen: "+nzScore+" z "+NZQ.length+" správně.");
        if(nzScore >= 12) markDone("k0");
      }
    });
  });
}
function initNz(){
  $("#nzNext").addEventListener("click", function(){ if(nzI<NZQ.length-1){ nzI++; drawNz(); } });
  $("#nzReset").addEventListener("click", function(){ nzI=0; nzScore=0; drawNz(); });
  drawNz();
}

/* ============================================================
   6 · KAPITOLA 0 — prohledávatelná tabulka sloučenin
   ============================================================ */
var cmpState = {q:"", el:"all", t:"all"};
function cmpRoman(n){
  if(n===-0.33) return "−⅓";
  return oxRoman(n);
}
function drawCmp(){
  var q = cmpState.q.toLowerCase().trim();
  var rows = CMP.filter(function(c){
    if(cmpState.el!=="all" && c.e!==cmpState.el) return false;
    if(cmpState.t!=="all" && c.t!==cmpState.t) return false;
    if(!q) return true;
    return (c.f+" "+c.n+" "+c.t+" "+c.v+" "+c.u).toLowerCase().indexOf(q) >= 0;
  });
  var h = "";
  rows.forEach(function(c){
    var col = c.ox<=0 ? "var(--endo)" : (c.ox>=4 ? "var(--exo)" : "var(--cat3)");
    h += '<tr><td class="chem" style="font-weight:600;white-space:nowrap">'+c.f+'</td>'+
         '<td style="font-size:.85rem">'+c.n+'</td>'+
         '<td class="n" style="font-weight:600;color:'+col+'">'+cmpRoman(c.ox)+'</td>'+
         '<td style="font-size:.8rem;color:var(--ink-3)">'+c.t+'</td>'+
         '<td style="font-size:.82rem;color:var(--ink-2);line-height:1.45">'+c.v+'</td>'+
         '<td style="font-size:.82rem;color:var(--ink-2);line-height:1.45">'+c.u+'</td></tr>';
  });
  if(!rows.length) h = '<tr><td colspan="6" style="padding:1.1rem;color:var(--ink-3)">Nic nenalezeno. Zkuste „amoniak“, „hnojivo“, „oxid“, „apatit“ nebo „výbušn“.</td></tr>';
  $("#cmpBody").innerHTML = h;
  $$("#cmpEl button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===cmpState.el); });
}
function initCmp(){
  var types = [];
  CMP.forEach(function(c){ if(types.indexOf(c.t)<0) types.push(c.t); });
  types.sort();
  $("#cmpType").innerHTML = '<option value="all">všechny typy sloučenin</option>' +
    types.map(function(t){ return '<option value="'+t+'">'+t+'</option>'; }).join("");
  $("#cmpSearch").addEventListener("input", function(){ cmpState.q = this.value; drawCmp(); });
  $("#cmpType").addEventListener("change", function(){ cmpState.t = this.value; drawCmp(); });
  $$("#cmpEl button").forEach(function(b){
    b.addEventListener("click", function(){ cmpState.el = b.dataset.v; drawCmp(); });
  });
  drawCmp();
}
