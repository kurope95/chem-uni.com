/* ============================================================
   8 · KAPITOLA 5 — mapa hydridů v periodické tabulce
   ============================================================ */
var hmState = {t:"all", el:"Na"};
function hmFind(id){ for(var i=0;i<HMAP.length;i++){ if(HMAP[i][0]===id) return HMAP[i]; } return HMAP[0]; }
function drawHm(){
  var W=780, H=300, cw=40, ch=34, x0=16, y0=48, s="";
  HMAP.forEach(function(e){
    var sym=e[0], col=e[1], per=e[2], typ=e[3];
    var x = x0 + (col-1)*cw + 2, y = y0 + (per-1)*ch + 2;
    var T = HMAPT[typ] || HMAPT.x;
    var dim = (hmState.t!=="all" && typ!==hmState.t);
    var sel = (sym===hmState.el);
    s += rect(x, y, cw-4, ch-4, {fill:T.c, r:5,
      style:"fill-opacity:"+(dim?0.10:0.30)+";stroke:"+(sel?"var(--ink)":T.c)+";stroke-width:"+(sel?2.4:1)+";stroke-opacity:"+(dim?0.3:1)});
    s += txt(x+(cw-4)/2, y+(ch-4)/2+4, sym, {anchor:"middle", size:11.5, w:sel?700:600,
      fill: dim ? "var(--ink-3)" : T.c, style: dim ? "opacity:.45" : ""});
  });
  /* popisky skupin */
  for(var g=1; g<=18; g++){
    if(g===1 || g===2 || g===13 || g===18 || g===12 || g===3){
      s += txt(x0+(g-1)*cw+cw/2, y0-8, String(g), {anchor:"middle", size:9.5, fill:"var(--ink-3)", mono:true});
    }
  }
  s += txt(x0, 26, "Rozdělení hydridů podle charakteru vazby", {size:12.5, w:700, fill:"var(--ink-3)", style:"letter-spacing:.06em"});
  /* směrové šipky */
  var yb = y0 + 6*ch + 16;
  s += line(x0+8, yb, x0+2*cw-8, yb, {c:"var(--exo)", w:2.5, cap:"round"});
  s += txt(x0+cw, yb+18, "iontové", {anchor:"middle", size:11, w:700, fill:"var(--exo)"});
  s += line(x0+2*cw+8, yb, x0+12*cw-8, yb, {c:"var(--cat2)", w:2.5, cap:"round"});
  s += txt(x0+7*cw, yb+18, "kovové (přechodné kovy)", {anchor:"middle", size:11, w:700, fill:"var(--cat2)"});
  s += line(x0+12*cw+8, yb, x0+18*cw-8, yb, {c:"var(--endo)", w:2.5, cap:"round"});
  s += txt(x0+15*cw, yb+18, "kovalentní", {anchor:"middle", size:11, w:700, fill:"var(--endo)"});
  $("#hmWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Mapa typů hydridů v periodické tabulce"');
  var e = hmFind(hmState.el), T = HMAPT[e[3]] || HMAPT.x;
  var prikl = {i:"NaH, KH, CaH₂, BaH₂", k:"CH₄, NH₃, H₂O, HF, SiH₄, H₂S", m:"TiH₂, ZrH₂, PdH₀,₆, LaNi₅H₆", p:"BeH₂, MgH₂, ZnH₂, Ga₂H₆", x:"—", h:"H₂"};
  vvRo("#hmRo1", "Vybraný prvek", e[0], "skupina "+e[1]+", perioda "+e[2], "");
  vvRo("#hmRo2", "Typ hydridu", T.lab, prikl[e[3]] || "—", e[3]==="x" ? "neg" : "");
  vvRo("#hmRo3", "Počet prvků daného typu", String(HMAP.filter(function(q){ return q[3]===e[3]; }).length), "v&nbsp;zobrazené části tabulky", "");
  $("#hmNote").innerHTML = T.d + " Zvýrazněte postupně jednotlivé typy — rozdělení kopíruje elektronegativitu: vlevo iontové, uprostřed kovové, vpravo kovalentní, mezi nimi úzké přechodové pruhy.";
}
function initHm(){
  $("#hmEl").innerHTML = HMAP.filter(function(e){ return e[3]!=="x"; }).map(function(e){
    return '<option value="'+e[0]+'"'+(e[0]===hmState.el?' selected':'')+'>'+e[0]+' — '+(HMAPT[e[3]]||HMAPT.x).lab+'</option>';
  }).join("");
  $("#hmEl").addEventListener("change", function(){ hmState.el = this.value; drawHm(); });
  $$("#hmTyp button").forEach(function(b){
    b.addEventListener("click", function(){
      hmState.t = b.dataset.v;
      $$("#hmTyp button").forEach(function(x){ x.setAttribute("aria-pressed", x.dataset.v===hmState.t); });
      drawHm();
    });
  });
  drawHm();
}

/* --- teploty varu hydridů -------------------------------------------- */
var bpState = {g:"g16"};
function drawBp(){
  var W=760, H=310, L=70, R=700, T0=26, B=248;
  var pmin=1.6, pmax=5.4, tmin=-180, tmax=120;
  var X = function(v){ return L + (v-pmin)/(pmax-pmin)*(R-L); };
  var Y = function(v){ return B - (v-tmin)/(tmax-tmin)*(B-T0); };
  var s = "";
  for(var t=-180; t<=120; t+=60){
    s += line(L, Y(t), R, Y(t), {c:"var(--line)", w:1});
    s += txt(L-8, Y(t)+4, String(t), {anchor:"end", size:11, fill:"var(--ink-3)", mono:true});
  }
  for(var p=2; p<=5; p++){
    s += line(X(p), T0, X(p), B, {c:"var(--line)", w:1});
    s += txt(X(p), B+20, String(p) + ". perioda", {anchor:"middle", size:11, fill:"var(--ink-3)"});
  }
  s += line(L, Y(0), R, Y(0), {c:"var(--line-strong)", w:1.4, dash:"5 4"});
  s += txt((L+R)/2, Y(0)-7, "0 °C", {anchor:"middle", size:10.5, fill:"var(--ink-3)", mono:true});
  var endLbl = [];
  Object.keys(BODY).forEach(function(k){
    var G = BODY[k], on = (k===bpState.g);
    var pts = G.d.map(function(d){ return X(d[1])+","+Y(d[2]); });
    s += '<polyline points="'+pts.join(" ")+'" style="fill:none;stroke:'+G.c+';stroke-width:'+(on?3:1.6)+';stroke-linejoin:round;stroke-opacity:'+(on?1:0.42)+'"/>';
    G.d.forEach(function(d){
      s += '<circle cx="'+X(d[1])+'" cy="'+Y(d[2])+'" r="'+(on?6:3.5)+'" style="fill:'+G.c+';fill-opacity:'+(on?1:0.42)+';stroke:var(--surface);stroke-width:'+(on?2:1)+'"/>';
      if(on) s += txt(X(d[1]), Y(d[2])-14, d[0]+" "+fmt(d[2],1), {anchor:"middle", size:11, w:700, fill:G.c, mono:true});
    });
    endLbl.push({y:Y(G.d[G.d.length-1][2])+4, t:G.lab.split(" ")[0], c:G.c, on:on});
  });
  endLbl.sort(function(a,b){ return a.y-b.y; });
  for(var q=1; q<endLbl.length; q++){ if(endLbl[q].y-endLbl[q-1].y < 16) endLbl[q].y = endLbl[q-1].y+16; }
  endLbl.forEach(function(o){ s += txt(672, o.y, o.t, {size:10.5, w:600, fill:o.c, style:o.on?"":"opacity:.5"}); });
  /* extrapolace u 16. skupiny */
  if(bpState.g==="g16"){
    var a = (BODY.g16.d[3][2] - BODY.g16.d[1][2]) / (BODY.g16.d[3][1] - BODY.g16.d[1][1]);
    var pred = BODY.g16.d[1][2] + a*(2 - BODY.g16.d[1][1]);
    s += '<polyline points="'+X(2)+","+Y(pred)+" "+X(5)+","+Y(BODY.g16.d[3][2])+'" style="fill:none;stroke:var(--bad);stroke-width:1.6;stroke-dasharray:6 4"/>';
    s += '<circle cx="'+X(2)+'" cy="'+Y(pred)+'" r="5" style="fill:none;stroke:var(--bad);stroke-width:2"/>';
    s += txt(X(2)+10, Y(pred)+16, "kdyby nebyly můstky: "+fmt(pred,0)+" °C", {size:11, w:600, fill:"var(--bad)"});
    s += vArrow(X(2)-16, Y(pred), Y(100), "var(--bad)", "", "left");
    s += txt(X(2)-8, (Y(pred)+Y(100))/2, "+"+fmt(100-pred,0)+" °C", {anchor:"start", size:11.5, w:700, fill:"var(--bad)", mono:true});
  }
  s += txt(18, (T0+B)/2, "teplota varu [°C]", {anchor:"middle", size:11.5, w:600, fill:"var(--ink-3)", style:"writing-mode:sideways-lr"});
  $("#bpWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Teploty varu hydridů 14. až 17. skupiny"');
  var G = BODY[bpState.g];
  var lo = G.d[0][2], hi = G.d[G.d.length-1][2];
  vvRo("#bpRo1", "Nejlehčí hydrid skupiny", G.d[0][0]+" · "+fmt(G.d[0][2],1)+" °C", "druhá perioda", "");
  vvRo("#bpRo2", "Nejtěžší hydrid skupiny", G.d[3][0]+" · "+fmt(G.d[3][2],1)+" °C", "pátá perioda", "");
  vvRo("#bpRo3", "Rozdíl v&nbsp;řadě", sgn(hi-lo,1)+" °C", (hi>lo && bpState.g==="g14") ? "plynulý růst — žádné můstky" : "nepravidelnost = vodíkové můstky", bpState.g==="g14"?"pos":"neg");
  $("#bpNote").innerHTML = G.note;
}
function initBp(){
  $$("#bpSel button").forEach(function(b){
    b.addEventListener("click", function(){
      bpState.g = b.dataset.v;
      $$("#bpSel button").forEach(function(x){ x.setAttribute("aria-pressed", x.dataset.v===bpState.g); });
      drawBp();
    });
  });
  drawBp();
}

/* --- prohledávatelná tabulka hydridů --------------------------------- */
var htState = {q:"", f:"all"};
var HTTYP = {i:["iontový","var(--exo)"], k:["kovalentní","var(--endo)"], m:["kovový","var(--cat2)"], x:["komplexní","var(--cat3)"]};
function drawHt(){
  var q = htState.q.toLowerCase().trim();
  var rows = HYD.filter(function(h){
    if(htState.f!=="all" && h.t!==htState.f) return false;
    if(!q) return true;
    return (h.f+" "+h.n+" "+h.fyz+" "+h.voda+" "+h.u+" "+HTTYP[h.t][0]).toLowerCase().indexOf(q) >= 0;
  });
  $("#htBody").innerHTML = rows.map(function(h){
    var T = HTTYP[h.t];
    return '<tr>'+
      '<td><span class="chem" style="font-weight:600">'+h.f+'</span></td>'+
      '<td>'+h.n+'</td>'+
      '<td><span class="tag" style="background:transparent;color:'+T[1]+';border:1px solid '+T[1]+'">'+T[0]+'</span></td>'+
      '<td class="n">'+h.ox+'</td>'+
      '<td class="n">'+fmt(h.en,2)+'</td>'+
      '<td>'+h.fyz+'</td>'+
      '<td>'+h.voda+'</td>'+
      '<td>'+h.u+'</td></tr>';
  }).join("") || '<tr><td colspan="8" style="color:var(--ink-3)">Nic nenalezeno — zkuste jiný výraz.</td></tr>';
  $("#htCount").innerHTML = "Zobrazeno <b>"+rows.length+"</b> z&nbsp;"+HYD.length+" sloučenin.";
}
function initHt(){
  $("#htSearch").addEventListener("input", function(){ htState.q = this.value; drawHt(); });
  $$("#htFilt button").forEach(function(b){
    b.addEventListener("click", function(){
      htState.f = b.dataset.v;
      $$("#htFilt button").forEach(function(x){ x.setAttribute("aria-pressed", x.dataset.v===htState.f); });
      drawHt();
    });
  });
  drawHt();
}

/* --- LiAlH₄ nebo NaBH₄ ----------------------------------------------- */
var hkState = {i:0};
function drawHk(){
  var sub = SUBST[hkState.i];
  var W=760, H=250, s="";
  function box(x, key, val){
    var K = HKOMP[key];
    var ok = val>0;
    var c = ok ? K.c : "var(--ink-3)";
    s += rect(x, 40, 300, 170, {fill:c, r:14, style:"fill-opacity:"+(ok?0.14:0.05)+";stroke:"+c+";stroke-width:"+(ok?2.4:1.2)+";stroke-opacity:"+(ok?1:.5)});
    s += txt(x+150, 74, K.nm, {anchor:"middle", size:22, w:700, fill:c});
    s += txt(x+150, 96, K.pl, {anchor:"middle", size:10.5, fill:"var(--ink-3)"});
    s += txt(x+150, 134, val===1 ? "✓ redukuje" : (val===2 ? "△ jen za tvrdších podmínek" : "✕ nereaguje"),
          {anchor:"middle", size:16, w:700, fill: val===1 ? "var(--ok)" : (val===2 ? "var(--warn)" : "var(--bad)")});
    s += txt(x+150, 162, K.roz, {anchor:"middle", size:11, fill:"var(--ink-3)"});
    s += txt(x+150, 186, K.en, {anchor:"middle", size:10.5, fill:"var(--ink-3)"});
  }
  s += txt(W/2, 24, "substrát: " + sub.s, {anchor:"middle", size:13.5, w:700, fill:"var(--ink)"});
  box(40, "lah", sub.lah);
  box(420, "nabh", sub.nabh);
  $("#hkWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Srovnání redukčních činidel LiAlH4 a NaBH4"');
  vvRo("#hkRo1", "Produkt redukce", sub.p, "co ze substrátu vznikne", "");
  var doporuc = sub.nabh===1 ? "NaBH₄ — mírnější a bezpečnější" : (sub.lah>=1 ? "LiAlH₄ — NaBH₄ nestačí" : "ani jedno, potřebujete H₂ a katalyzátor");
  vvRo("#hkRo2", "Co použít", doporuc, sub.nabh===1 ? "volte vždy slabší činidlo, které úkol zvládne" : "", sub.lah>0 || sub.nabh>0 ? "pos" : "neg");
  $("#hkEq").innerHTML = "<b>LiAlH₄:</b> " + HKOMP.lah.bezp + " &nbsp;·&nbsp; <b>NaBH₄:</b> " + HKOMP.nabh.bezp;
  $("#hkNote").innerHTML = (sub.nabh===0 && sub.lah===1)
    ? "Tady je vidět ta hranice: <b>NaBH₄ na tenhle substrát nestačí</b>, protože vazba B–H je málo polární (rozdíl elektronegativit jen 0,16) a&nbsp;hydridový vodík je málo nukleofilní. LiAlH₄ s&nbsp;rozdílem 0,59 ano."
    : "Projděte substráty odshora dolů a&nbsp;sledujte, kde NaBH₄ přestane stačit. Pravidlo praxe: <b>vždycky volte nejslabší činidlo, které úkol zvládne</b> — silnější by zredukovalo i&nbsp;to, co jste chtěli zachovat.";
}
function initHk(){
  $("#hkSel").innerHTML = SUBST.map(function(x, i){ return '<option value="'+i+'">'+x.s+'</option>'; }).join("");
  $("#hkSel").addEventListener("change", function(){ hkState.i = +this.value; drawHk(); });
  drawHk();
}

/* --- trenažér: oxidační číslo a typ hydridu -------------------------- */
var drI = 0, drScore = 0, drDone = false;
function drawDr(){
  var it = DRIL[drI];
  $("#drQn").textContent = drI+1;
  $("#drQtot").textContent = DRIL.length;
  $("#drScore").textContent = drScore;
  $("#drTask").innerHTML = '<span class="chem" style="font-size:1.35rem">'+it.f+'</span> &nbsp;—&nbsp; '+it.q;
  $("#drOpts").innerHTML = it.o.map(function(o, i){
    return '<button class="btn" type="button" data-oi="'+i+'" style="white-space:normal;line-height:1.35;text-align:left;justify-content:flex-start">'+o+'</button>';
  }).join("");
  var ex = $("#drExplain");
  ex.style.display = "none"; ex.className = "explain";
  $("#drNext").disabled = true;
  drDone = false;
  $$("#drOpts button").forEach(function(b){
    b.addEventListener("click", function(){
      if(drDone) return; drDone = true;
      var ok = (+b.dataset.oi === it.c);
      if(ok) drScore++;
      $("#drScore").textContent = drScore;
      ex.style.display = "flex";
      ex.style.background = ok ? "var(--ok-soft)" : "var(--bad-soft)";
      ex.style.borderColor = ok ? "var(--ok)" : "var(--bad)";
      ex.innerHTML = '<span class="verdict" style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+
        (ok ? "✓ Správně" : "✕ Špatně — správně je "+it.o[it.c])+'</span><span class="eyebrow">Proč</span><div>'+it.e+'</div>';
      $$("#drOpts button").forEach(function(x){
        x.disabled = true;
        x.style.opacity = (+x.dataset.oi === it.c) ? "1" : ".45";
        if(+x.dataset.oi === it.c){ x.style.borderColor = "var(--ok)"; x.style.color = "var(--ok)"; }
      });
      $("#drNext").disabled = (drI >= DRIL.length-1);
      if(drI >= DRIL.length-1){
        toast("Trenažér dokončen: "+drScore+" z "+DRIL.length+" správně.");
        if(drScore >= 9) markDone("k5");
      }
    });
  });
}
function initDr(){
  $("#drNext").addEventListener("click", function(){ if(drI < DRIL.length-1){ drI++; drawDr(); } });
  $("#drReset").addEventListener("click", function(){ drI = 0; drScore = 0; drawDr(); });
  drawDr();
}
