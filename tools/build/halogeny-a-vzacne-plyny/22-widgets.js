/* ============================================================
   14 · k5 — POROVNÁVAČ HALOGENOVODÍKŮ
   ============================================================ */
var hxI = 0;
function drawHx(){
  var c = HXD[hxI], W = 760, H = 324, s = "";
  var x0 = 90, x1 = 700, y0 = 52, y1 = 200;
  s += txt(14, 20, "VAZBA H—X PROTI KYSELOSTI", {size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  s += line(x0, y1, x1, y1, {c:"var(--line-strong)",w:1.4});
  var n = HXD.length, step = (x1-x0)/n, bw = 34;
  var Dmax = 620, aMin = -11, aMax = 11;
  HXD.forEach(function(e,i){
    var cx = x0 + step*(i+0.5), on = (i === hxI);
    var op = on ? "" : "fill-opacity:.35";
    /* vazebná energie */
    var hD = (e.D/Dmax)*(y1-y0);
    s += rect(cx-bw-4, y1-hD, bw, hD, {fill:"var(--exo)", r:5, style:op});
    s += txt(cx-bw/2-4, y1-hD-8, fmt(e.D,0), {size:10.5,w:700,anchor:"middle",fill:"var(--exo)",mono:true});
    /* kyselost jako -pKa posunutá nad nulu */
    var acid = -e.pKa;
    var hA = ((acid - aMin)/(aMax - aMin))*(y1-y0);
    s += rect(cx+4, y1-hA, bw, hA, {fill:"var(--endo)", r:5, style:op});
    s += txt(cx+bw/2+4, y1-hA-8, "pKa " + fmt(e.pKa,2), {size:10.5,w:700,anchor:"middle",fill:"var(--endo)",mono:true});
    s += txt(cx, y1+22, e.f, {size:14,w:on?700:500,anchor:"middle",fill: on ? "var(--ink)" : "var(--ink-2)"});
    s += txt(cx, y1+38, "t.v. " + fmt(e.tv,1) + " °C", {size:10,anchor:"middle",fill:"var(--ink-3)",mono:true});
  });
  s += hArrow(x0+16, x1-16, y1+64, "var(--ink-3)", "od HF k HI: vazba slábne, kyselost roste", false);
  s += txt(14, y1+106, "levý oranžový sloupec = energie vazby H—X · pravý modrý sloupec = kyselost (výška roste s klesající pKa)",
           {size:10.5,fill:"var(--ink-3)"});
  $("#hxWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Graf vazebné energie a kyselosti halogenovodíků"');

  function ro(id,k,v,hh){ var e=$(id); e.className="readout"; e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+hh+'</span>'; }
  ro("#hxRo1","Energie vazby H—X", fmt(c.D,0) + " kJ·mol⁻¹", "délka vazby " + fmt(c.dHX,0) + " pm");
  ro("#hxRo2","Kyselost", "p" + "K" + "a = " + fmt(c.pKa,2), c.kys);
  ro("#hxRo3","Teploty tání a varu", fmt(c.tt,1) + " °C / " + fmt(c.tv,1) + " °C", c.f === "HF" ? "vyčnívá o zhruba 120 °C kvůli vodíkovým můstkům" : "roste s velikostí molekuly");
  $("#hxPrip").innerHTML = "<b>Typická příprava:</b> <span class=\"chem\">" + c.prip + "</span>";
  $("#hxNote").innerHTML = c.n;
}
function initHx(){
  $$("#hxSeg button").forEach(function(b){
    b.addEventListener("click", function(){
      hxI = +b.dataset.v;
      $$("#hxSeg button").forEach(function(x){ x.setAttribute("aria-pressed", +x.dataset.v===hxI); });
      drawHx();
    });
  });
  drawHx();
}

/* ============================================================
   15 · k5 — TEPLOTY VARU HYDRIDŮ
   ============================================================ */
var mzCur = "17";
var MZ = {
  "17": {lab:"skupina 17 · HX", col:"var(--cat1)", d:[{f:"HF",p:2,tv:19.5},{f:"HCl",p:3,tv:-85.1},{f:"HBr",p:4,tv:-66.4},{f:"HI",p:5,tv:-35.4}]},
  "16": {lab:"skupina 16 · H₂X", col:"var(--endo)", d:[{f:"H₂O",p:2,tv:100.0},{f:"H₂S",p:3,tv:-60.3},{f:"H₂Se",p:4,tv:-41.3},{f:"H₂Te",p:5,tv:-2.2}]},
  "15": {lab:"skupina 15 · H₃X", col:"var(--cat2)", d:[{f:"NH₃",p:2,tv:-33.3},{f:"PH₃",p:3,tv:-87.7},{f:"AsH₃",p:4,tv:-62.5},{f:"SbH₃",p:5,tv:-18.4}]},
  "14": {lab:"skupina 14 · H₄X", col:"var(--exo)", d:[{f:"CH₄",p:2,tv:-161.5},{f:"SiH₄",p:3,tv:-111.9},{f:"GeH₄",p:4,tv:-88.1},{f:"SnH₄",p:5,tv:-52.0}]}
};
function drawMz(){
  var W = 760, H = 310, s = "";
  var x0 = 80, x1 = 672, y0 = 34, y1 = 236;
  var lo = -180, hi = 120;
  function yf(v){ return y1 - (v - lo)/(hi - lo)*(y1 - y0); }
  function xf(p){ return x0 + 54 + (p - 2)/3*(x1 - x0 - 74); }
  s += txt(14, 18, "TEPLOTA VARU HYDRIDŮ [°C] PODLE PERIODY", {size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  s += line(x0, y1, x1, y1, {c:"var(--line-strong)",w:1.4});
  for(var v=-180; v<=120; v+=60){
    s += line(x0, yf(v), x1, yf(v), {c:"var(--grid)",w:1,dash:"3 4"});
    s += txt(x0-8, yf(v)+4, String(v), {size:10,anchor:"end",fill:"var(--ink-3)",mono:true});
  }
  s += line(x0, yf(0), x1, yf(0), {c:"var(--line-strong)",w:1.2});
  for(var p=2; p<=5; p++){
    s += txt(xf(p), y1+22, p + ". perioda", {size:11,anchor:"middle",fill:"var(--ink-3)"});
  }
  var keys = (mzCur === "all") ? ["17","16","15","14"] : [mzCur];
  keys.forEach(function(k){
    var g = MZ[k], pts = [];
    g.d.forEach(function(e){ pts.push(xf(e.p).toFixed(1) + "," + yf(e.tv).toFixed(1)); });
    s += '<polyline points="'+pts.join(" ")+'" style="fill:none;stroke:'+g.col+';stroke-width:2.4"/>';
    g.d.forEach(function(e){
      s += '<circle cx="'+xf(e.p).toFixed(1)+'" cy="'+yf(e.tv).toFixed(1)+'" r="5.5" style="fill:'+g.col+'"/>';
      if(mzCur !== "all"){
        s += txt(xf(e.p), yf(e.tv) - 12, e.f, {size:11.5,w:700,anchor:"middle",fill:g.col});
        s += txt(xf(e.p), yf(e.tv) + 20, fmt(e.tv,1) + " °C", {size:10.5,anchor:"middle",fill:"var(--ink-2)",mono:true});
      }
    });
    if(mzCur === "all"){
      var li = ["17","16","15","14"].indexOf(k);
      s += txt(x1 + 8, y0 + 12 + li*18, g.d[0].f, {size:11.5,w:700,fill:g.col});
    } else {
      s += txt(x1 + 8, yf(g.d[3].tv) + 4, k, {size:11,w:700,fill:g.col});
    }
  });
  /* šipka na anomálii */
  if(mzCur === "17" || mzCur === "all"){
    s += line(xf(2), yf(19.5)-26, xf(2), yf(19.5)-8, {c:"var(--accent)",w:2});
    s += txt(xf(2), yf(19.5)-32, "vodíkový můstek", {size:10.5,w:700,anchor:"middle",fill:"var(--accent)"});
  }
  s += txt(14, y1+50, "kdyby rozhodovala jen velikost molekuly, každá řada by rovnoměrně stoupala zleva doprava",
           {size:10.5,fill:"var(--ink-3)"});
  $("#mzWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Teploty varu hydridů skupin 14 až 17"');

  function ro(id,k,v,hh){ var e=$(id); e.className="readout"; e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+hh+'</span>'; }
  if(mzCur === "all"){
    ro("#mzRo1","Řady s anomálií", "HF · H₂O · NH₃", "první člen vyčnívá nahoru — vodíkové můstky");
    ro("#mzRo2","Řada bez anomálie", "CH₄", "uhlík je málo elektronegativní, můstek nevznikne");
    $("#mzOut").innerHTML = "Vodíkový můstek vzniká jen tam, kde je vodík vázaný na <b>malý a silně elektronegativní</b> atom: fluor, kyslík nebo dusík. Uhlík tuhle podmínku nesplňuje, a proto methan poslušně kopíruje trend molekulové hmotnosti — je to jediná ze čtyř řad, která nemá „hrbol“ vlevo.";
  } else {
    var g = MZ[mzCur];
    var first = g.d[0], second = g.d[1];
    var anom = first.tv > second.tv;
    ro("#mzRo1", g.lab, first.f + " vře při " + fmt(first.tv,1) + " °C", second.f + " vře při " + fmt(second.tv,1) + " °C");
    ro("#mzRo2","Chování prvního členu", anom ? "vyčnívá nahoru" : "zapadá do trendu",
       anom ? "rozdíl proti sousedovi je " + fmt(first.tv - second.tv,1) + " °C" : "bez vodíkových můstků");
    if(mzCur === "17") $("#mzOut").innerHTML = "Extrapolací řady HI → HBr → HCl bychom pro fluorovodík dostali zhruba <b>−100 °C</b>. Skutečnost je <b>+19,5 °C</b> — rozdíl přes 120 °C způsobují <b>vodíkové můstky F—H···F</b>, které v kapalině spojují molekuly do řetězců a kruhů.";
    else if(mzCur === "16") $("#mzOut").innerHTML = "Voda by podle trendu měla vřít kolem <b>−80 °C</b>. Vře při 100 °C, protože každá molekula může tvořit až <b>čtyři</b> vodíkové můstky (dva přes vodíky, dva přes volné páry kyslíku). Bez toho by na Zemi nebyla kapalná voda.";
    else if(mzCur === "15") $("#mzOut").innerHTML = "Amoniak vyčnívá také, ale méně než voda — má jen <b>jeden</b> volný pár, takže na molekulu připadá v průměru jen jeden můstek. Proto je jeho anomálie zhruba poloviční.";
    else $("#mzOut").innerHTML = "Řada methanu je <b>dokonale pravidelná</b>. Vazba C—H není dost polární na vodíkový můstek, takže o teplotě varu rozhodují jen disperzní síly, které rostou s velikostí molekuly.";
  }
}
function initMz(){
  $$("#mzSeg button").forEach(function(b){
    b.addEventListener("click", function(){
      mzCur = b.dataset.v;
      $$("#mzSeg button").forEach(function(x){ x.setAttribute("aria-pressed", x.dataset.v===mzCur); });
      drawMz();
    });
  });
  drawMz();
}

/* ============================================================
   16 · k6 — IONTOVÝ VERSUS KOVALENTNÍ HALOGENID
   ============================================================ */
var icI = 0;
function ionChar(dEN){ return 1 - Math.exp(-(dEN*dEN)/4); }
function drawIc(){
  var r = ROW[icI], dEN = 3.16 - r.enM, ic = ionChar(dEN);
  var W = 760, H = 300, s = "";
  s += txt(14, 20, "CHLORIDY TŘETÍ PERIODY — OD IONTOVÉHO KE KOVALENTNÍMU", {size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  /* řada nahoře */
  var x0 = 40, gap = 100;
  ROW.forEach(function(e,i){
    var x = x0 + i*gap, on = (i === icI);
    var d2 = 3.16 - e.enM, c2 = ionChar(d2);
    var col = c2 > 0.5 ? "var(--endo)" : "var(--exo)";
    s += rect(x, 40, 84, 34, {fill: on ? col : "var(--surface-2)", r:8, stroke: col, sw: on ? 2.2 : 1.2, style: on ? "fill-opacity:.30" : ""});
    s += txt(x+42, 62, e.f, {size:13,w:on?700:500,anchor:"middle",fill: on ? col : "var(--ink-2)"});
  });
  /* pruh charakteru vazby */
  var bx = 60, bw = 640, by = 116;
  s += txt(bx, by-10, "CHARAKTER VAZBY", {size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
  s += rect(bx, by, bw, 30, {fill:"var(--surface-3)", r:8});
  s += rect(bx, by, bw*ic, 30, {fill:"var(--endo)", r:8, style:"fill-opacity:.8"});
  s += txt(bx+8, by+20, "iontový " + fmt(ic*100,0) + " %", {size:12,w:700,fill:"var(--paper)"});
  s += txt(bx+bw-8, by+20, "kovalentní " + fmt((1-ic)*100,0) + " %", {size:12,w:700,anchor:"end",fill:"var(--ink-2)"});
  /* stupnice ΔEN */
  var sy = 182;
  s += txt(bx, sy-10, "ROZDÍL ELEKTRONEGATIVIT ΔEN", {size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
  s += rect(bx, sy, bw, 8, {fill:"var(--surface-3)", r:4});
  var t17 = 1.7/2.4;
  s += line(bx + bw*t17, sy-8, bx + bw*t17, sy+16, {c:"var(--accent)",w:2,dash:"4 3"});
  s += txt(bx + bw*t17, sy-14, "hranice 1,7", {size:10,anchor:"middle",fill:"var(--accent)"});
  ROW.forEach(function(e,i){
    var d2 = 3.16 - e.enM, cx = bx + bw*(d2/2.4), on = (i === icI);
    s += '<circle cx="'+cx.toFixed(1)+'" cy="'+(sy+4)+'" r="'+(on?7:4)+'" style="fill:'+(on?"var(--accent)":"var(--line-strong)")+'"/>';
    if(on){
      s += txt(cx, sy+30, "ΔEN = " + fmt(d2,2), {size:12,w:700,anchor:"middle",fill:"var(--accent)",mono:true});
    }
  });
  /* teploty */
  var ty = 246;
  s += txt(bx, ty, "teplota tání " + (r.tt > 400 ? "" : "") + fmt(r.tt,1) + " °C", {size:13,w:700,fill:"var(--ink)"});
  s += txt(bx+230, ty, "teplota varu " + fmt(r.tv,1) + " °C", {size:13,w:700,fill:"var(--ink)"});
  s += txt(bx+460, ty, r.typ, {size:12.5,w:600,fill: ic > 0.5 ? "var(--endo)" : "var(--exo)"});
  s += txt(bx, ty+26, "elektronegativita partnera: " + fmt(r.enM,2) + " · chlor: 3,16", {size:11,fill:"var(--ink-3)"});
  $("#icWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Přechod od iontového ke kovalentnímu chloridu"');

  $("#icIv").textContent = r.f;
  function ro(id,k,v,hh){ var e=$(id); e.className="readout"; e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+hh+'</span>'; }
  ro("#icRo1","Rozdíl elektronegativit", fmt(dEN,2), "nad 1,7 převažuje iontový charakter");
  ro("#icRo2","Iontový charakter", fmt(ic*100,0) + " %", "z Paulingova vztahu 1 − exp(−ΔEN²/4)");
  ro("#icRo3","Teplota tání", fmt(r.tt,1) + " °C", r.typ);
  $("#icOut").innerHTML = "<b>" + r.f + ":</b> " + r.n;
}
function initIc(){
  $("#icI").addEventListener("input", function(){ icI = +this.value; drawIc(); });
  drawIc();
}

/* ============================================================
   17 · k6 — PROHLEDÁVATELNÁ TABULKA SLOUČENIN
   ============================================================ */
var slState = {q:"", f:"all"};
function drawSl(){
  var q = slState.q.toLowerCase().trim();
  var rows = TAB.filter(function(e){
    if(slState.f !== "all" && e.g !== slState.f) return false;
    if(!q) return true;
    return (e.f + " " + e.nm + " " + e.v + " " + e.u + " " + (TABG[e.g] || "")).toLowerCase().indexOf(q) >= 0;
  });
  var GCOL = {hal:"var(--endo)", hx:"var(--cat1)", oxo:"var(--exo)", sul:"var(--accent)",
              ox:"var(--cat3)", int:"var(--cat2)", poly:"var(--cat4)", vzp:"var(--warn)", org:"var(--ink-2)"};
  var h = "";
  rows.forEach(function(e){
    h += '<tr><td class="mono" style="white-space:nowrap;font-weight:700;color:' + (GCOL[e.g]||"var(--ink)") + '">' + e.f + '</td>' +
         '<td style="font-size:.9rem">' + e.nm + '<br><span class="eyebrow" style="color:var(--ink-3)">' + (TABG[e.g]||"") + '</span></td>' +
         '<td class="n mono" style="font-weight:600">' + e.ox + '</td>' +
         '<td style="font-size:.85rem;color:var(--ink-2);line-height:1.45">' + e.v + '</td>' +
         '<td style="font-size:.85rem;color:var(--ink-2);line-height:1.45">' + e.u + '</td></tr>';
  });
  if(!rows.length) h = '<tr><td colspan="5" style="padding:1.1rem;color:var(--ink-3)">Nic nenalezeno. Zkuste „chlornan“, „AgBr“, „bělení“, „raketa“ nebo „ozon“.</td></tr>';
  $("#slBody").innerHTML = h;
  $$("#slFilter button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v === slState.f); });
  $("#slOut").innerHTML = "Zobrazeno <b>" + rows.length + "</b> z " + TAB.length + " sloučenin" +
    (slState.f === "all" ? "" : " · typ: <b>" + TABG[slState.f] + "</b>") +
    (q ? " · hledaný výraz: <b>" + slState.q + "</b>" : "") + ".";
}
function initSl(){
  $("#slSearch").addEventListener("input", function(){ slState.q = this.value; drawSl(); });
  $$("#slFilter button").forEach(function(b){
    b.addEventListener("click", function(){ slState.f = b.dataset.v; drawSl(); });
  });
  drawSl();
}

/* ============================================================
   18 · k7 — OXOKYSELINY CHLORU
   ============================================================ */
var okI = 0;
function drawOk(){
  var c = OXO[okI], W = 760, H = 320, s = "";
  s += txt(14, 20, "STRUKTURA, KYSELOST A OXIDAČNÍ SÍLA", {size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});

  /* --- struktura vlevo --- */
  var cx = 170, cy = 150, R = 74;
  var nO = c.ox === 1 ? 1 : (c.ox === 3 ? 2 : (c.ox === 5 ? 3 : 4));
  var nLp = 4 - nO;
  var angles = {1:[180], 2:[150,30], 3:[150,30,90], 4:[200,340,90,270]}[nO];
  var lpAng = {3:[270,20,160], 2:[300,240], 1:[270], 0:[]}[nLp];
  lpAng.forEach(function(a){
    var px = cx + R*0.62*Math.cos(a*Math.PI/180), py = cy + R*0.62*Math.sin(a*Math.PI/180);
    s += '<ellipse cx="'+px.toFixed(1)+'" cy="'+py.toFixed(1)+'" rx="24" ry="14" transform="rotate('+a+' '+px.toFixed(1)+' '+py.toFixed(1)+')" style="fill:var(--accent);fill-opacity:.26;stroke:var(--accent);stroke-width:1.4"/>';
  });
  angles.forEach(function(a, i){
    var px = cx + R*Math.cos(a*Math.PI/180), py = cy + R*Math.sin(a*Math.PI/180);
    s += line(cx, cy, px, py, {c:"var(--ink-2)",w:2.6,cap:"round"});
    s += '<circle cx="'+px.toFixed(1)+'" cy="'+py.toFixed(1)+'" r="16" style="fill:var(--bad);fill-opacity:.22;stroke:var(--bad);stroke-width:1.6"/>';
    s += txt(px, py+5, "O", {size:13,w:700,anchor:"middle",fill:"var(--bad)"});
    if(i === 0){
      var hx = px + 30*Math.cos(a*Math.PI/180), hy = py + 30*Math.sin(a*Math.PI/180);
      s += line(px, py, hx, hy, {c:"var(--ink-3)",w:2,cap:"round"});
      s += '<circle cx="'+hx.toFixed(1)+'" cy="'+hy.toFixed(1)+'" r="11" style="fill:var(--surface-3);stroke:var(--ink-3);stroke-width:1.4"/>';
      s += txt(hx, hy+4, "H", {size:11,w:700,anchor:"middle",fill:"var(--ink-2)"});
    }
  });
  s += '<circle cx="'+cx+'" cy="'+cy+'" r="26" style="fill:var(--cat1);fill-opacity:.28;stroke:var(--cat1);stroke-width:2"/>';
  s += txt(cx, cy+6, "Cl", {size:15,w:700,anchor:"middle",fill:"var(--cat1)"});
  s += txt(cx, 60, c.f, {size:20,w:700,anchor:"middle",fill:"var(--ink)"});
  s += txt(cx, 268, c.geom, {size:11.5,anchor:"middle",fill:"var(--ink-2)"});
  s += txt(cx, 286, "vazba Cl—O: " + c.dClO + " pm", {size:11,anchor:"middle",fill:"var(--ink-3)",mono:true});

  /* --- dva sloupce vpravo --- */
  var gx = 380, gw = 360, gy0 = 60, gy1 = 240;
  s += line(gx, gy1, gx+gw, gy1, {c:"var(--line-strong)",w:1.4});
  var n = OXO.length, step = gw/n, bw = 30;
  var aMin = -9, aMax = 9, oMax = 2.0;
  OXO.forEach(function(e,i){
    var bx = gx + step*(i+0.5), on = (i === okI), op = on ? "" : "fill-opacity:.35";
    var hA = ((-e.pKa - aMin)/(aMax - aMin))*(gy1 - gy0);
    s += rect(bx-bw-3, gy1-hA, bw, hA, {fill:"var(--endo)", r:4, style:op});
    var hO = (e.oxid/oMax)*(gy1 - gy0);
    s += rect(bx+3, gy1-hO, bw, hO, {fill:"var(--exo)", r:4, style:op});
    if(on){
      s += txt(bx-bw/2-3, gy1-hA-8, "pKa " + fmt(e.pKa,2), {size:10,w:700,anchor:"middle",fill:"var(--endo)",mono:true});
      s += txt(bx+bw/2+3, gy1-hO-8, fmt(e.oxid,2) + " V", {size:10,w:700,anchor:"middle",fill:"var(--exo)",mono:true});
    }
    s += txt(bx, gy1+20, e.f, {size:11.5,w:on?700:500,anchor:"middle",fill: on ? "var(--ink)" : "var(--ink-3)"});
    s += txt(bx, gy1+36, ["","+I","","+III","","+V","","+VII"][e.ox], {size:10.5,anchor:"middle",fill:"var(--ink-3)"});
  });
  s += hArrow(gx+20, gx+gw-20, gy0-18, "var(--endo)", "kyselost roste →", true);
  s += hArrow(gx+gw-20, gx+20, 292, "var(--exo)", "← oxidační síla roste", false);
  $("#okWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Struktura a vlastnosti oxokyseliny '+c.f+'"');

  function ro(id,k,v,hh){ var e=$(id); e.className="readout"; e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+hh+'</span>'; }
  ro("#okRo1", c.f, c.nm, "oxidační číslo chloru " + ["","+I","","+III","","+V","","+VII"][c.ox]);
  ro("#okRo2","Kyselost", "p" + "K" + "a = " + fmt(c.pKa,2), "nevazebných kyslíků: " + c.nO + " → Paulingův odhad " + (8 - 5*c.nO));
  ro("#okRo3","Oxidační síla", fmt(c.oxid,2) + " V", "E° v kyselém prostředí");
  $("#okSul").innerHTML = "<b>Anion:</b> <span class=\"chem\">" + c.an + "</span> (" + c.anNm + ") &nbsp;·&nbsp; <b>Soli:</b> " + c.sul;
  $("#okNote").innerHTML = c.n;
}
function initOk(){
  $$("#okSeg button").forEach(function(b){
    b.addEventListener("click", function(){
      okI = +b.dataset.v;
      $$("#okSeg button").forEach(function(x){ x.setAttribute("aria-pressed", +x.dataset.v===okI); });
      drawOk();
    });
  });
  drawOk();
}

/* ============================================================
   19 · k7 — TRENAŽÉR NÁZVOSLOVÍ
   ============================================================ */
var NZQ = [
 {q:"Jak se jmenuje <span class=\"chem\">NaClO</span>?", a:"chlornan sodný",
  o:["chloritan sodný","chlornan sodný","chlorečnan sodný","chloristan sodný"],
  x:"Chlor má +I: (+1) + x + (−2) = 0. Oxidačnímu číslu +I odpovídá přípona -nan. Je to účinná složka sava."},
 {q:"Jak se jmenuje <span class=\"chem\">KClO₃</span>?", a:"chlorečnan draselný",
  o:["chlornan draselný","chloritan draselný","chlorečnan draselný","chloristan draselný"],
  x:"Chlor má +V (dopočítáno z (+1) + x − 6 = 0). Přípona -ečnan patří chloru v oxidačním čísle +V. Známá Bertholletova sůl ze zápalek."},
 {q:"Jaký vzorec má kyselina chloristá?", a:"HClO₄",
  o:["HClO","HClO₂","HClO₃","HClO₄"],
  x:"Přípona -istá znamená nejvyšší oxidační číslo +VII. Aby součet vyšel nula, musí být kyslíků čtyři."},
 {q:"Jaký vzorec má chloritan sodný?", a:"NaClO₂",
  o:["NaClO","NaClO₂","NaClO₃","NaClO₄"],
  x:"Přípona -itan odpovídá +III, tedy dva kyslíky. Používá se k bělení textilu a k výrobě oxidu chloričitého."},
 {q:"Jak se jmenuje <span class=\"chem\">KIO₃</span>?", a:"jodičnan draselný",
  o:["jodnan draselný","jodičnan draselný","jodistan draselný","jodid draselný"],
  x:"Jod má +V. U bromu a jodu se +V značí příponou -ičnan (u chloru -ečnan). Právě tímhle se joduje kuchyňská sůl."},
 {q:"Jak se jmenuje <span class=\"chem\">HBrO</span>?", a:"kyselina bromná",
  o:["kyselina bromná","kyselina bromitá","kyselina bromičná","kyselina bromistá"],
  x:"Brom má +I, tomu odpovídá přípona -ná. Kyselina bromná je velmi slabá a existuje jen ve zředěném roztoku."},
 {q:"Jaké oxidační číslo halogenu značí přípona <b>-istan</b>?", a:"+VII",
  o:["+I","+III","+V","+VII"],
  x:"Řada je -nan (+I), -itan (+III), -ečnan nebo -ičnan (+V), -istan (+VII). Nejvyšší přípona znamená nejvyšší oxidační číslo."},
 {q:"Jak se jmenuje <span class=\"chem\">Ca(ClO)₂</span>?", a:"chlornan vápenatý",
  o:["chlorid-chlornan vápenatý","chlornan vápenatý","chlorečnan vápenatý","chloritan vápenatý"],
  x:"Vápník +II, dva anionty ClO⁻ s chlorem +I. Je to hlavní účinná složka chlorového vápna."},
 {q:"Jaký vzorec má oxid chloričitý?", a:"ClO₂",
  o:["Cl₂O","ClO₂","Cl₂O₆","Cl₂O₇"],
  x:"Přípona -ičitý znamená +IV: x + 2·(−2) = 0. Je to radikál s nepárovým elektronem a dnes nejdůležitější bělicí sloučenina chloru."},
 {q:"Jaký vzorec má anhydrid kyseliny chloristé?", a:"Cl₂O₇",
  o:["Cl₂O","ClO₂","Cl₂O₆","Cl₂O₇"],
  x:"Anhydrid vznikne odebráním vody: 2 HClO₄ − H₂O = Cl₂O₇. Chlor v něm zůstává na +VII."},
 {q:"Jak se jmenuje <span class=\"chem\">NaBrO₃</span>?", a:"bromičnan sodný",
  o:["bromnan sodný","bromitan sodný","bromičnan sodný","bromistan sodný"],
  x:"Brom má +V, přípona -ičnan. Bromičnany jsou silná oxidační činidla a používají se v odměrné analýze."},
 {q:"Jaký vzorec má kyselina pentahydrogenjodistá?", a:"H₅IO₆",
  o:["HIO₄","H₅IO₆","HIO₃","H₃IO₅"],
  x:"Pět vodíků, jod +VII, šest kyslíků: 5·(+1) + 7 + 6·(−2) = 0. Oktaedrická molekula, kterou unese jen velký jod."},
 {q:"Jak se jmenuje <span class=\"chem\">OF₂</span>?", a:"fluorid kyslíku",
  o:["oxid fluorný","fluorid kyslíku","oxid difluorný","fluorid kyslicitý"],
  x:"Fluor je elektronegativnější než kyslík, takže má −I a kyslík +II. Elektronegativnější prvek dává název aniontové části, proto fluorid kyslíku."},
 {q:"Jaké oxidační číslo má chlor v <span class=\"chem\">Cl₂O</span>?", a:"+I",
  o:["−I","+I","+II","+IV"],
  x:"2x + (−2) = 0 → x = +I. Oxid chlorný je anhydridem kyseliny chlorné a při zahřátí exploduje."}
];
var nzI = 0, nzScore = 0, nzAns = false;
function drawNz(){
  var q = NZQ[nzI];
  $("#nzQn").textContent = nzI + 1;
  $("#nzQtot").textContent = NZQ.length;
  $("#nzScore").textContent = nzScore;
  $("#nzTask").innerHTML = q.q;
  $("#nzOpts").innerHTML = q.o.map(function(o){
    return '<button class="btn" type="button" data-o="' + o + '" style="justify-content:center;font-size:.98rem">' + o + '</button>';
  }).join("");
  var ex = $("#nzExplain");
  ex.style.display = "none"; ex.innerHTML = "";
  $("#nzNext").disabled = true;
  nzAns = false;
  $$("#nzOpts button").forEach(function(b){
    b.addEventListener("click", function(){
      if(nzAns) return;
      nzAns = true;
      var ok = b.dataset.o === q.a;
      if(ok) nzScore++;
      $("#nzScore").textContent = nzScore;
      $$("#nzOpts button").forEach(function(x){
        x.disabled = true;
        x.style.opacity = (x.dataset.o === q.a) ? "1" : ".45";
        if(x.dataset.o === q.a){ x.style.borderColor = "var(--ok)"; x.style.color = "var(--ok)"; }
        else if(x === b){ x.style.borderColor = "var(--bad)"; x.style.color = "var(--bad)"; }
      });
      ex.style.display = "flex";
      ex.style.background = ok ? "var(--ok-soft)" : "var(--bad-soft)";
      ex.style.borderColor = ok ? "var(--ok)" : "var(--bad)";
      ex.innerHTML = '<span class="verdict" style="color:' + (ok ? "var(--ok)" : "var(--bad)") + '">' +
        (ok ? "✓ Správně" : "✕ Špatně — správně je " + q.a) +
        '</span><span class="eyebrow">Proč</span><div>' + q.x + "</div>";
      $("#nzNext").disabled = (nzI >= NZQ.length - 1);
      if(nzI >= NZQ.length - 1){
        toast("Trenažér názvosloví dokončen: " + nzScore + " z " + NZQ.length + ".");
        if(nzScore >= 11) markDone("k7");
      }
    });
  });
}
function initNz(){
  $("#nzNext").addEventListener("click", function(){ if(nzI < NZQ.length - 1){ nzI++; drawNz(); } });
  $("#nzReset").addEventListener("click", function(){ nzI = 0; nzScore = 0; drawNz(); });
  drawNz();
}
