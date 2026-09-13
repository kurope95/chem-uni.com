/* ============================================================
   7 · KAPITOLA 1 — vazebná bilance: proč N₂ a proč P₄
   Vazebné energie [kJ·mol⁻¹]: N—N = 163, N≡N = 945,
   P—P = 201, P≡P = 490.
   ============================================================ */
var bondState = {el:"N"};
var BONDE = {
  N: {single:163, triple:945, sym:"N", nm:"dusík",
      forma:"N₂ — dvouatomová molekula s trojnou vazbou",
      zaver:"Trojná vazba je o 456 kJ·mol⁻¹ výhodnější než tři jednoduché. Dusík proto zůstane u dvouatomové molekuly a čtyřatomová klec N₄ je energeticky nesmysl."},
  P: {single:201, triple:490, sym:"P", nm:"fosfor",
      forma:"P₄ — tetraedr se šesti jednoduchými vazbami",
      zaver:"Trojná vazba je o 113 kJ·mol⁻¹ slabší než tři jednoduché. Fosfor proto trojnou vazbu netvoří a raději z ní udělá tři jednoduché — vzniká tetraedr P₄, a při ještě větším zisku dokonce polymer."}
};
function drawBond(){
  var d = BONDE[bondState.el], W=740, H=290, s="";
  var x0=110, yB=176, yT=48, hi=2000;
  var groups = [
    {lab:"trojná vazba|"+d.sym+"≡"+d.sym, v:d.triple, c:"var(--exo)", sub:"jedna vazba"},
    {lab:"tři jednoduché|3 × "+d.sym+"—"+d.sym, v:3*d.single, c:"var(--endo)", sub:"3 × "+d.single+" kJ·mol⁻¹"},
    {lab:"klec "+d.sym+"₄|6 × "+d.sym+"—"+d.sym, v:6*d.single, c:"var(--cat2)", sub:"na 4 atomy"},
    {lab:"2 molekuly "+d.sym+"₂|2 × "+d.sym+"≡"+d.sym, v:2*d.triple, c:"var(--cat1)", sub:"na 4 atomy"}
  ];
  s += yAxis(x0-8, yT, yB, 0, hi, 4, "kJ·mol⁻¹");
  var colW = (W-x0-30)/groups.length;
  groups.forEach(function(g, i){
    var x = x0 + i*colW + colW*0.16, bw = colW*0.68;
    var h = (g.v/hi)*(yB-yT);
    s += rect(x, yB-h, bw, h, {r:6, fill:g.c, style:"fill-opacity:.85"});
    s += txt(x+bw/2, yB-h-8, fmt(g.v,0), {anchor:"middle", size:12.5, w:700, mono:true, fill:"var(--ink)"});
    g.lab.split("|").forEach(function(t, j){
      s += txt(x+bw/2, yB+18+j*14, t, {anchor:"middle", size:11, w:j===0?600:500,
               fill:j===0?"var(--ink)":"var(--ink-2)"});
    });
    s += txt(x+bw/2, yB+48, g.sub, {anchor:"middle", size:9.5, fill:"var(--ink-3)"});
  });
  /* srovnání prvních dvou sloupců */
  var xa = x0 + 0*colW + colW*0.5, xb = x0 + 1*colW + colW*0.5;
  var diff = d.triple - 3*d.single;
  var yline = yT - 16;
  s += hArr2(xa, xb, yline, diff>0?"var(--exo)":"var(--endo)",
             (diff>0?"trojná vazba vyhrává o ":"trojná vazba prohrává o ")+fmt(Math.abs(diff),0)+" kJ·mol⁻¹");
  /* pravá dvojice: která forma na 4 atomy */
  var xc = x0 + 2*colW + colW*0.5, xd = x0 + 3*colW + colW*0.5;
  var d2 = 6*d.single - 2*d.triple;
  s += hArr2(xc, xd, yline, d2>0?"var(--cat2)":"var(--cat1)",
             (d2>0?"klec "+d.sym+"₄ vyhrává o ":"dvě molekuly "+d.sym+"₂ vyhrávají o ")+fmt(Math.abs(d2),0)+" kJ·mol⁻¹");
  s += txt(x0, H-16, "Sloupce vlevo srovnávají jednu trojnou vazbu se třemi jednoduchými. Sloupce vpravo srovnávají dvě možné stavby ze čtyř atomů.",
           {size:10.5, fill:"var(--ink-3)"});
  $("#bondWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Srovnání vazebných energií u '+d.nm+'u"');

  $$("#bondEl button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===bondState.el); });
  $("#bondRo1").innerHTML = '<span class="k">Jednoduchá vazba '+d.sym+'—'+d.sym+'</span><span class="v">'+d.single+
    '</span><span class="h">kJ·mol⁻¹</span>';
  $("#bondRo2").innerHTML = '<span class="k">Trojná vazba '+d.sym+'≡'+d.sym+'</span><span class="v">'+d.triple+
    '</span><span class="h">kJ·mol⁻¹</span>';
  $("#bondRo3").innerHTML = '<span class="k">Stálá forma prvku</span><span class="v" style="font-size:1rem">'+
    d.forma+'</span><span class="h">energie na jeden atom: '+fmt(Math.max(6*d.single,2*d.triple)/4,0)+' kJ·mol⁻¹</span>';
  $("#bondVerdict").innerHTML = '<span class="eyebrow" style="color:var(--accent)">Závěr pro '+d.nm+'</span><p style="margin-top:.35rem">'+d.zaver+'</p>';
}
function initBond(){
  $$("#bondEl button").forEach(function(b){
    b.addEventListener("click", function(){ bondState.el = b.dataset.v; drawBond(); });
  });
  drawBond();
}

/* ============================================================
   8 · KAPITOLA 1 — aktivační bariéra: proč je N₂ netečný
   Aktivační energie [kJ·mol⁻¹]: bez katalyzátoru 335,
   železný katalyzátor 103, enzym nitrogenasa ~60.
   ============================================================ */
var actState = {mode:"none", T:400};
var ACTM = {
  none: {ea:335, nm:"bez katalyzátoru", c:"var(--bad)",
         txt:"Bez katalyzátoru musí reakce nejdřív roztrhnout celou trojnou vazbu. Bariéra je tak vysoká, že směs dusíku a vodíku vydrží v baňce beze změny libovolně dlouho — i když je reakce termodynamicky výhodná."},
  fe:   {ea:103, nm:"železný katalyzátor", c:"var(--ok)",
         txt:"Molekula N₂ se naváže na povrch železa a vazba se přitom postupně oslabuje, až se rozpadne. Katalyzátor nemění rovnováhu, jen otevírá nižší cestu — proto stačí 400 až 500 °C místo tisíců stupňů."},
  enz:  {ea:60,  nm:"enzym nitrogenasa", c:"var(--cat2)",
         txt:"Bakterie na kořenech bobovitých rostlin dělají totéž při běžné teplotě a tlaku. Platí za to spotřebou ATP — cenu, kterou průmysl platí tlakem a teplem, příroda platí chemickou energií."}
};
function actRate(ea, TC){ return Math.exp(-ea*1000/(8.314*(TC+273.15))); }
function drawAct(){
  var m = ACTM[actState.mode], TC = actState.T, W=740, H=280, s="";
  var x0=70, xE=W-40, yZero=132, sc=0.30;     /* 1 kJ = 0,30 px */
  s += line(x0-6, yZero, xE, yZero, {c:"var(--line)", w:1, dash:"4 4"});
  s += txt(x0-10, yZero+4, "0", {anchor:"end", size:10, mono:true, fill:"var(--ink-3)"});
  s += txt(8, 20, "ΔH [kJ·mol⁻¹]", {size:10, w:600, fill:"var(--ink-3)"});
  /* křivky pro všechny tři režimy, aktivní zvýrazněná */
  ["none","fe","enz"].forEach(function(k){
    var mm = ACTM[k], on = (k===actState.mode);
    var yTop = yZero - mm.ea*sc;
    var xA = x0+70, xB = (x0+xE)/2, xC = xE-110;
    var yProd = yZero + 92.2*sc;
    var d = "M"+x0+" "+yZero+" L"+xA+" "+yZero+
            " C"+(xA+50)+" "+yZero+" "+(xB-60)+" "+yTop+" "+xB+" "+yTop+
            " C"+(xB+60)+" "+yTop+" "+(xC-50)+" "+yProd+" "+xC+" "+yProd+
            " L"+xE+" "+yProd;
    s += '<path d="'+d+'" style="fill:none;stroke:'+mm.c+';stroke-width:'+(on?3:1.6)+
         ';stroke-opacity:'+(on?1:.3)+';stroke-linecap:round"/>';
    if(on){
      s += vArrow(xB-14, yZero, yTop, mm.c, "E"+"ₐ = "+mm.ea, "left");
      s += txt(xB, yTop-12, mm.nm, {anchor:"middle", size:11.5, w:700, fill:mm.c});
    }
  });
  var yProd = yZero + 92.2*sc;
  s += txt(x0+4, yZero-10, "N₂ + 3 H₂", {size:12, w:600, fill:"var(--ink)"});
  s += txt(xE-4, yProd+18, "2 NH₃", {anchor:"end", size:12, w:600, fill:"var(--ink)"});
  s += vArrow(xE-120, yZero, yProd, "var(--exo)", "ΔH = −92,2", "left");
  s += txt(x0, H-30, "Reakční koordináta — vodorovná osa je průběh děje, ne čas.", {size:10.5, fill:"var(--ink-3)"});
  s += txt(x0, H-14, "Katalyzátor snižuje bariéru, ale energii produktů ani rovnováhu nemění: obě strany zůstávají tam, kde byly.",
           {size:10.5, fill:"var(--ink-3)"});
  $("#actWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Energetický profil syntézy amoniaku"');

  $$("#actMode button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===actState.mode); });
  $("#actTv").textContent = fmt(TC,0)+" °C";
  var r0 = actRate(ACTM.none.ea, TC), r = actRate(m.ea, TC);
  var ratio = r/r0;
  var exp10 = Math.log(ratio)/Math.LN10;
  $("#actRo1").innerHTML = '<span class="k">Aktivační energie</span><span class="v">'+m.ea+
    '</span><span class="h">kJ·mol⁻¹ · '+m.nm+'</span>';
  $("#actRo2").innerHTML = '<span class="k">Zrychlení proti nekatalyzované cestě</span><span class="v">'+
    (exp10 < 0.05 ? "1×" : "10"+sup(Math.round(exp10))+"×")+'</span><span class="h">při '+fmt(TC,0)+' °C</span>';
  var vhod = (actState.mode==="fe" && TC>=380 && TC<=520);
  $("#actRo3").innerHTML = '<span class="k">Průmyslové okno</span><span class="v" style="font-size:1rem;color:'+
    (vhod?"var(--ok)":"var(--ink-2)")+'">'+(vhod?"ano, tady se pracuje":"mimo provozní podmínky")+
    '</span><span class="h">reálný proces jede na železe při 400–500 °C</span>';
  $("#actText").innerHTML = m.txt;
}
function initAct(){
  $$("#actMode button").forEach(function(b){
    b.addEventListener("click", function(){ actState.mode = b.dataset.v; drawAct(); });
  });
  $("#actT").addEventListener("input", function(){ actState.T = +this.value; drawAct(); });
  drawAct();
}

/* ============================================================
   9 · KAPITOLA 2 — modifikace fosforu
   ============================================================ */
var modState = {k:"bily"};
function modGet(k){ for(var i=0;i<MODF.length;i++) if(MODF[i].k===k) return MODF[i]; return MODF[0]; }
function drawMod(){
  var m = modGet(modState.k), W=720, H=250, s="";
  var C = {bily:"var(--cat3)", cerveny:"var(--accent)", cerny:"var(--ink-2)"}[m.k];

  if(m.k==="bily"){
    var cx=200, cy=132;
    var A=[cx, cy-62], B=[cx-64, cy+42], Cp=[cx+64, cy+42], D=[cx+8, cy-4];
    s += bondN(A[0],A[1],B[0],B[1],1,{c:C,w:2.6});
    s += bondN(A[0],A[1],Cp[0],Cp[1],1,{c:C,w:2.6});
    s += bondN(B[0],B[1],Cp[0],Cp[1],1,{c:C,w:2.6});
    s += bondN(A[0],A[1],D[0],D[1],1,{c:C,w:2.2});
    s += bondN(B[0],B[1],D[0],D[1],1,{c:C,w:2.2});
    s += bondN(Cp[0],Cp[1],D[0],D[1],1,{c:C,w:2.2});
    [A,B,Cp,D].forEach(function(p){ s += atom(p[0],p[1],"P",{r:17,fill:"var(--surface)",stroke:C,ink:C}); });
    s += lonePair(A[0], A[1]-26, 0, C);
    s += lonePair(B[0]-24, B[1]+12, 60, C);
    s += lonePair(Cp[0]+24, Cp[1]+12, 120, C);
    s += txt(cx, cy+96, "úhel P—P—P = 60° · tetraedrických 109,5° je daleko", {anchor:"middle", size:11, w:600, fill:C});
    s += txt(cx, cy+114, "napjaté vazby = velká zásoba energie = samozápalnost", {anchor:"middle", size:10.5, fill:"var(--ink-3)"});
  } else if(m.k==="cerveny"){
    var y0=118, i;
    for(i=0;i<7;i++){
      var x = 70+i*52, yy = y0 + (i%2 ? 26 : -26);
      var xn = 70+(i+1)*52, yn = y0 + ((i+1)%2 ? 26 : -26);
      if(i<6) s += bondN(x,yy,xn,yn,1,{c:C,w:2.6});
      s += bondN(x,yy,x,yy+(i%2?34:-34),1,{c:C,w:2.2});
      s += atom(x, yy+(i%2?34:-34), "P", {r:11, fill:"var(--surface-2)", stroke:C, ink:C, size:10});
    }
    for(i=0;i<7;i++){
      var x2 = 70+i*52, y2 = y0 + (i%2 ? 26 : -26);
      s += atom(x2, y2, "P", {r:15, fill:"var(--surface)", stroke:C, ink:C, size:13});
    }
    s += txt(46, y0, "…", {anchor:"middle", size:20, fill:"var(--ink-3)"});
    s += txt(70+7*52-18, y0, "…", {size:20, fill:"var(--ink-3)"});
    s += txt(360, 214, "polymerní řetězce — tetraedry P₄ se otevřely a propojily", {anchor:"middle", size:11, w:600, fill:C});
    s += txt(360, 232, "pnutí zmizelo, reaktivita klesla, tání je neostré", {anchor:"middle", size:10.5, fill:"var(--ink-3)"});
  } else {
    var ox=70, oy=70, dx=58, dy=30, r=0;
    for(r=0;r<3;r++){
      for(var c2=0;c2<8;c2++){
        var px = ox + c2*dx*0.9 + r*16, py = oy + r*46 + (c2%2 ? 15 : 0);
        if(c2<7) s += line(px, py, px+dx*0.9, oy + r*46 + ((c2+1)%2 ? 15 : 0), {c:C, w:2});
        if(r<2 && c2%2===1) s += line(px, py, px+16, py+46-15, {c:C, w:1.6, dash:"3 3"});
        s += atom(px, py, "P", {r:10, fill:"var(--surface-2)", stroke:C, ink:C, size:9.5});
      }
    }
    s += txt(360, 214, "zvlněné vrstvy, každý atom vázán ke třem sousedům", {anchor:"middle", size:11, w:600, fill:C});
    s += txt(360, 232, "vrstvy drží slabé mezivrstvové síly — stejný princip jako grafit", {anchor:"middle", size:10.5, fill:"var(--ink-3)"});
  }
  $("#modWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Struktura modifikace: '+m.nm+'"');

  $$("#modSel button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===modState.k); });
  $("#modRo1").innerHTML = '<span class="k">Stavba</span><span class="v" style="font-size:.95rem">'+m.stru+'</span><span class="h">hustota = '+m.rho+'</span>';
  $("#modRo2").innerHTML = '<span class="k">Teplota tání</span><span class="v" style="font-size:1rem">'+m.tt+'</span><span class="h">var / sublimace: '+m.tv+'</span>';
  $("#modRo3").innerHTML = '<span class="k">Reaktivita</span><span class="v" style="font-size:.95rem">'+m.reak+'</span><span class="h">'+m.sk+'</span>';
  $("#modRo4").innerHTML = '<span class="k">Jedovatost a rozpustnost v CS₂</span><span class="v" style="font-size:.95rem">'+m.jed+'</span><span class="h">v sirouhlíku '+m.cs2+'</span>';
  $("#modText").innerHTML = m.txt;
}
function initMod(){
  $$("#modSel button").forEach(function(b){
    b.addEventListener("click", function(){ modState.k = b.dataset.v; drawMod(); });
  });
  drawMod();
}

/* ============================================================
   10 · KAPITOLA 3 — Haberův proces
   Rovnovážná konstanta: ln K = 12626/T − 27,476  (K v atm⁻²).
   Vztah reprodukuje tabulkové hodnoty: 400 °C → 1,64·10⁻⁴ atm⁻².
   ============================================================ */
var habState = {T:450, P:20};
function habK(TC){ return Math.exp(12626/(TC+273.15) - 27.476); }
function habYield(TC, PMPa){
  var kp = habK(TC) * Math.pow(PMPa*9.8692, 2);
  var lo=1e-9, hi=0.9999999, z, f, i;
  for(i=0;i<80;i++){
    z = (lo+hi)/2;
    f = 4*z*z*Math.pow(4-2*z,2) / (27*Math.pow(1-z,4));
    if(f < kp) lo = z; else hi = z;
  }
  z = (lo+hi)/2;
  return 2*z/(4-2*z)*100;
}
function drawHab(){
  var W=740, H=300, s="";
  var x0=68, xE=W-140, yB=228, yT=40;
  var Tmin=200, Tmax=600;
  function X(T){ return x0 + (T-Tmin)/(Tmax-Tmin)*(xE-x0); }
  function Y(y){ return yB - y/100*(yB-yT); }
  s += line(x0, yT, x0, yB, {c:"var(--line-strong)", w:1.3});
  s += line(x0, yB, xE, yB, {c:"var(--line-strong)", w:1.3});
  var p;
  for(p=0;p<=100;p+=20){
    s += line(x0-4, Y(p), xE, Y(p), {c:p===0?"var(--line-strong)":"var(--grid)", w:1});
    s += txt(x0-8, Y(p)+4, fmt(p,0), {anchor:"end", size:10, mono:true, fill:"var(--ink-3)"});
  }
  for(var T=Tmin; T<=Tmax; T+=100){
    s += line(X(T), yB, X(T), yB+4, {c:"var(--line-strong)", w:1});
    s += txt(X(T), yB+18, fmt(T,0), {anchor:"middle", size:10, mono:true, fill:"var(--ink-3)"});
  }
  s += txt(x0-8, yT-12, "obj. % NH₃", {anchor:"end", size:10, w:600, fill:"var(--ink-3)"});
  s += txt((x0+xE)/2, yB+34, "teplota [°C]", {anchor:"middle", size:11, w:600, fill:"var(--ink-2)"});
  var PS = [{p:5,c:"var(--cat1)"},{p:10,c:"var(--cat3)"},{p:20,c:"var(--cat2)"},{p:40,c:"var(--accent)"}];
  var pLbl = [];
  PS.forEach(function(o){
    var d = "", first = true;
    for(var t=Tmin; t<=Tmax; t+=8){
      var xx = X(t), yy = Y(habYield(t, o.p));
      d += (first ? "M" : " L") + xx.toFixed(1) + " " + yy.toFixed(1);
      first = false;
    }
    s += '<path d="'+d+'" style="fill:none;stroke:'+o.c+';stroke-width:2;stroke-opacity:.85"/>';
    pLbl.push({y:Y(habYield(Tmax, o.p))+4, t:o.p+" MPa", c:o.c});
  });
  pLbl.sort(function(a,b){ return a.y-b.y; });
  for(var pi=1; pi<pLbl.length; pi++){ if(pLbl[pi].y-pLbl[pi-1].y < 15) pLbl[pi].y = pLbl[pi-1].y+15; }
  var pOv = pLbl[pLbl.length-1].y - (yB+2);
  if(pOv > 0) pLbl.forEach(function(o){ o.y -= pOv; });
  pLbl.forEach(function(o){ s += txt(xE+8, o.y, o.t, {size:10.5, w:600, fill:o.c}); });
  var yv = habYield(habState.T, habState.P);
  var mx = X(habState.T), my = Y(yv);
  s += line(mx, yB, mx, my, {c:"var(--ink-3)", w:1, dash:"4 3"});
  s += line(x0, my, mx, my, {c:"var(--ink-3)", w:1, dash:"4 3"});
  s += '<circle cx="'+mx+'" cy="'+my+'" r="6.5" style="fill:var(--accent);stroke:var(--surface);stroke-width:2.5"/>';
  s += txt(mx+(mx>xE-120?-10:10), my-10, fmt(yv,1)+" %", {anchor:mx>xE-120?"end":"start", size:12, w:700, mono:true, fill:"var(--accent)"});
  s += rect(X(400)-1, yT, X(500)-X(400)+2, yB-yT, {r:0, fill:"var(--accent)", style:"fill-opacity:.07"});
  s += txt((X(400)+X(500))/2, yT+14, "provozní okno", {anchor:"middle", size:10, w:600, fill:"var(--accent)"});
  s += txt(x0, H-10, "Křivky jsou rovnovážný obsah amoniaku ve směsi vzniklé z výchozího poměru N₂ : H₂ = 1 : 3.",
           {size:10.5, fill:"var(--ink-3)"});
  $("#habWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Rovnovážný výtěžek amoniaku v závislosti na teplotě a tlaku"');

  $("#habTv").textContent = fmt(habState.T,0)+" °C";
  $("#habPv").textContent = fmt(habState.P,0)+" MPa";
  var K = habK(habState.T);
  var rel = Math.exp(-103000/(8.314*(habState.T+273.15))) / Math.exp(-103000/(8.314*723.15));
  $("#habRo1").innerHTML = '<span class="k">Rovnovážný obsah NH₃</span><span class="v">'+fmt(yv,1)+
    ' %</span><span class="h">objemově, ve směsi po ustavení rovnováhy</span>';
  var kExp = Math.floor(Math.log(K)/Math.LN10);
  var kMan = K / Math.pow(10, kExp);
  $("#habRo2").innerHTML = '<span class="k">Rovnovážná konstanta <span class="q">K</span>ₚ</span><span class="v" style="font-size:1rem">'+
    fmt(kMan,2)+'·10'+sup(kExp)+'</span><span class="h">atm⁻² · klesá s rostoucí teplotou, protože reakce je exotermická</span>';
  $("#habRo3").innerHTML = '<span class="k">Relativní rychlost</span><span class="v">'+
    (rel>=100 ? fmt(rel,0) : fmt(rel,2))+'×</span><span class="h">vůči 450 °C, aktivační energie 103 kJ·mol⁻¹</span>';
  var v;
  if(habState.T < 350) v = {c:"var(--bad)", t:"Rovnováha je báječná, ale reakce se prakticky nehýbe. Za nízké teploty by na ustavení rovnováhy nestačil ani celý den — a to je pro továrnu neúnosné."};
  else if(habState.T > 520) v = {c:"var(--bad)", t:"Rychlost je vysoká, jenže rovnováha se posunula k výchozím látkám a v plynu skoro žádný amoniak nezbývá. Navíc se katalyzátor při vyšších teplotách spéká."};
  else if(habState.P < 12) v = {c:"var(--warn)", t:"Teplota je rozumná, ale tlak je nízko. Reakce zmenšuje počet částic ze čtyř na dvě, takže stlačení rovnováhu posouvá doprava — bez vysokého tlaku výtěžek nedožene."};
  else v = {c:"var(--ok)", t:"Přesně tady leží průmyslový kompromis: teplota vysoká natolik, aby reakce běžela, tlak vysoký natolik, aby rovnováha nebyla úplně beznadějná. Amoniak se ze směsi vymrazí a nezreagovaný plyn se vrací zpátky do reaktoru — proto je celková konverze přes 97 %, i když jedním průchodem projde jen zlomek."};
  $("#habVerdict").innerHTML = '<span class="eyebrow" style="color:'+v.c+'">Posouzení nastavení</span><p style="margin-top:.35rem">'+v.t+'</p>';
}
function initHab(){
  $("#habT").addEventListener("input", function(){ habState.T = +this.value; drawHab(); });
  $("#habP").addEventListener("input", function(){ habState.P = +this.value; drawHab(); });
  drawHab();
}

/* ============================================================
   11 · KAPITOLA 3 — struktury hydridů dusíku a fosforu
   ============================================================ */
var hydState = {k:"NH3"};
function hydGet(k){ for(var i=0;i<HYDS.length;i++) if(HYDS[i].k===k) return HYDS[i]; return HYDS[0]; }
function drawHyd(){
  var d = hydGet(hydState.k), W=700, H=250, s="";
  var CN = "var(--cat2)", CH = "var(--ink-3)", CO = "var(--exo)";
  var cx=340, cy=132;
  if(d.k==="NH3" || d.k==="PH3"){
    var isP = d.k==="PH3";
    var sp = isP ? 62 : 74;                     /* užší úhel u fosfanu */
    var A=[cx, cy+58], B=[cx-sp, cy+18], Cq=[cx+sp, cy+18];
    var ctr=[cx, cy-24];
    [A,B,Cq].forEach(function(p){ s += bondN(ctr[0],ctr[1],p[0],p[1],1,{c:"var(--ink-2)",w:2.2}); });
    s += lonePair(ctr[0], ctr[1]-24, 0, CN);
    s += atom(ctr[0], ctr[1], isP?"P":"N", {r:19, fill:"var(--surface)", stroke:CN, ink:CN, size:16});
    [A,B,Cq].forEach(function(p){ s += atom(p[0],p[1],"H",{r:13, fill:"var(--surface-2)", stroke:CH, ink:"var(--ink-2)", size:12}); });
    s += txt(cx, cy+96, "vazebný úhel H—"+(isP?"P":"N")+"—H = "+d.uhel, {anchor:"middle", size:11.5, w:600, fill:CN});
    s += txt(cx, cy-58, "volný elektronový pár", {anchor:"middle", size:10.5, w:600, fill:CN});
  } else if(d.k==="N2H4"){
    var n1=[cx-52, cy], n2=[cx+52, cy];
    s += bondN(n1[0],n1[1],n2[0],n2[1],1,{c:"var(--ink-2)",w:2.4});
    [[n1,-1],[n2,1]].forEach(function(pr){
      var n=pr[0], sgnx=pr[1];
      s += bondN(n[0],n[1],n[0]+sgnx*44,n[1]-42,1,{c:"var(--ink-2)",w:2});
      s += bondN(n[0],n[1],n[0]+sgnx*44,n[1]+42,1,{c:"var(--ink-2)",w:2});
      s += lonePair(n[0]-sgnx*6, n[1]-30, 90, CN);
      s += atom(n[0]+sgnx*44, n[1]-42, "H", {r:12, fill:"var(--surface-2)", stroke:CH, ink:"var(--ink-2)", size:11});
      s += atom(n[0]+sgnx*44, n[1]+42, "H", {r:12, fill:"var(--surface-2)", stroke:CH, ink:"var(--ink-2)", size:11});
      s += atom(n[0], n[1], "N", {r:18, fill:"var(--surface)", stroke:CN, ink:CN, size:15});
    });
    s += txt(cx, cy+108, "jednoduchá vazba N—N, na každém dusíku pyramida a volný pár", {anchor:"middle", size:11.5, w:600, fill:CN});
  } else if(d.k==="NH2OH"){
    var nn=[cx-46, cy], oo=[cx+34, cy], hh=[cx+108, cy-28];
    s += bondN(nn[0],nn[1],oo[0],oo[1],1,{c:"var(--ink-2)",w:2.2});
    s += bondN(oo[0],oo[1],hh[0],hh[1],1,{c:"var(--ink-2)",w:2});
    s += bondN(nn[0],nn[1],nn[0]-44,nn[1]-40,1,{c:"var(--ink-2)",w:2});
    s += bondN(nn[0],nn[1],nn[0]-44,nn[1]+40,1,{c:"var(--ink-2)",w:2});
    s += lonePair(nn[0], nn[1]-28, 0, CN);
    s += lonePair(oo[0]-4, oo[1]+28, 0, CO);
    s += atom(nn[0]-44, nn[1]-40, "H", {r:12, fill:"var(--surface-2)", stroke:CH, ink:"var(--ink-2)", size:11});
    s += atom(nn[0]-44, nn[1]+40, "H", {r:12, fill:"var(--surface-2)", stroke:CH, ink:"var(--ink-2)", size:11});
    s += atom(hh[0], hh[1], "H", {r:12, fill:"var(--surface-2)", stroke:CH, ink:"var(--ink-2)", size:11});
    s += atom(nn[0], nn[1], "N", {r:18, fill:"var(--surface)", stroke:CN, ink:CN, size:15});
    s += atom(oo[0], oo[1], "O", {r:17, fill:"var(--surface)", stroke:CO, ink:CO, size:14});
    s += txt(cx, cy+96, "jeden vodík amoniaku nahradila skupina OH", {anchor:"middle", size:11.5, w:600, fill:CN});
  } else {
    var a1=[cx-88, cy], a2=[cx, cy], a3=[cx+88, cy], hx=[cx-150, cy-40];
    s += bondN(hx[0],hx[1],a1[0],a1[1],1,{c:"var(--ink-2)",w:2});
    s += bondN(a1[0],a1[1],a2[0],a2[1],2,{c:"var(--ink-2)",w:2.2,gap:5});
    s += bondN(a2[0],a2[1],a3[0],a3[1],2,{c:"var(--ink-2)",w:2.2,gap:5});
    s += lonePair(a1[0]-6, a1[1]+30, 0, CN);
    s += lonePair(a3[0]+2, a3[1]-30, 0, CN);
    s += lonePair(a3[0]+2, a3[1]+30, 0, CN);
    s += atom(hx[0], hx[1], "H", {r:12, fill:"var(--surface-2)", stroke:CH, ink:"var(--ink-2)", size:11});
    [a1,a2,a3].forEach(function(p){ s += atom(p[0],p[1],"N",{r:18, fill:"var(--surface)", stroke:CN, ink:CN, size:15}); });
    s += txt(cx, cy+96, "tři dusíky v přímce · úhel H—N—N = 109°", {anchor:"middle", size:11.5, w:600, fill:CN});
    s += txt(cx, cy+114, "skutečné rozložení vazeb je nesymetrické, vzorec je jen přiblížení", {anchor:"middle", size:10.5, fill:"var(--ink-3)"});
  }
  $("#hydWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Struktura molekuly '+d.nm+'"');

  $$("#hydSel button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===hydState.k); });
  $("#hydRo1").innerHTML = '<span class="k">Tvar molekuly</span><span class="v" style="font-size:.95rem">'+d.tvar+'</span><span class="h">'+d.hyb+'</span>';
  $("#hydRo2").innerHTML = '<span class="k">Teplota varu</span><span class="v" style="font-size:1rem">'+d.tv+'</span><span class="h">vodíkové vazby ji zvedají u dusíkatých hydridů</span>';
  $("#hydRo3").innerHTML = '<span class="k">Acidobazické chování</span><span class="v" style="font-size:.95rem">'+d.baze+'</span><span class="h">rozhoduje dostupnost volného páru</span>';
  $("#hydRo4").innerHTML = '<span class="k">Redoxní chování</span><span class="v" style="font-size:.95rem">'+d.red+'</span><span class="h">čím níž je oxidační číslo, tím silnější redukovadlo</span>';
  $("#hydText").innerHTML = d.txt;
}
function initHyd(){
  $$("#hydSel button").forEach(function(b){
    b.addEventListener("click", function(){ hydState.k = b.dataset.v; drawHyd(); });
  });
  drawHyd();
}
