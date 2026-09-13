/* ============================================================
   2 · SPOLEČNÉ SVG POMŮCKY PRO TENTO SOUBOR
   ============================================================ */
/* vodorovná šipka s popiskem */
function hArrow(x1,x2,y,color,label,above){
  var s = line(x1,y,x2,y,{c:color,w:2,cap:"round"});
  var d = (x2>x1?1:-1);
  s += '<path d="M'+x2+' '+y+' l'+(-6*d)+' -4 l0 8 z" style="fill:'+color+'"/>';
  if(label) s += txt((x1+x2)/2, y+(above?-8:16), label, {fill:color,size:11.5,w:600,anchor:"middle"});
  return s;
}
/* zaoblený štítek s textem */
function chip(x,y,w,h,label,col,fill){
  var s = rect(x,y,w,h,{fill:fill||"var(--surface-2)",r:h/2,stroke:col,sw:1.4});
  s += txt(x+w/2, y+h/2+4, label, {fill:col,size:11.5,w:700,anchor:"middle"});
  return s;
}
/* vodorovný pruh se stupnicí a body pro všechny halogeny */
function scaleStrip(x,y,w,label,unit,items,curId,lo,hi,dec){
  var cur = null;
  items.forEach(function(it){ if(it.id===curId) cur = it; });
  var s = txt(x, y-10, label, {size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
  if(cur) s += txt(x+w, y-10, fmt(cur.v,dec)+(unit?" "+unit:""), {size:12,w:700,fill:cur.col,anchor:"end",mono:true});
  s += rect(x, y, w, 7, {fill:"var(--surface-3)",r:4});
  items.forEach(function(it){
    var t = (it.v - lo)/(hi - lo);
    if(t<0) t=0; if(t>1) t=1;
    var cx = x + t*w, on = (it.id===curId);
    s += '<circle cx="'+cx.toFixed(1)+'" cy="'+(y+3.5)+'" r="'+(on?7:4.5)+'" style="fill:'+(on?it.col:"var(--line-strong)")+
         (on?';stroke:var(--paper);stroke-width:2':'')+'"/>';
    if(on) s += txt(cx, y+23, it.id, {size:11.5,w:700,fill:it.col,anchor:"middle"});
  });
  return s;
}

/* ============================================================
   3 · HERO — mapa skupiny 17
   ============================================================ */
var hgCur = "Cl";
function drawHero(){
  var h = halBy(hgCur), W = 780, H = 344, s = "";
  s += txt(14, 20, "SKUPINA 17 · HALOGENY", {size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.12em"});

  /* --- karta prvku vlevo --- */
  var bx = 14, by = 34, bw = 250, bh = 214;
  s += rect(bx, by, bw, bh, {fill:"var(--surface-2)",r:12,stroke:h.col,sw:2});
  s += txt(bx+16, by+26, String(h.z), {size:13,w:700,fill:"var(--ink-3)",mono:true});
  s += txt(bx+16, by+92, h.s, {size:44,w:700,fill:h.col});
  s += txt(bx+16, by+122, h.nm, {size:14,w:600,fill:"var(--ink-2)"});
  s += txt(bx+16, by+144, "A(r) = "+fmt(h.Ar,3), {size:12,fill:"var(--ink-3)",mono:true});
  s += txt(bx+16, by+166, h.cfg, {size:13,w:600,fill:"var(--ink)",mono:true});
  s += txt(bx+16, by+186, "ox. čísla: "+h.ox, {size:11,fill:"var(--ink-2)"});
  s += txt(bx+16, by+204, "skupenství: "+h.st, {size:11,fill:"var(--ink-2)"});

  /* --- molekula X2 v pravém horním rohu karty --- */
  var mx = bx+bw-56, my = by+44;
  s += line(mx-20, my, mx+20, my, {c:h.col,w:5,cap:"round"});
  s += '<circle cx="'+(mx-20)+'" cy="'+my+'" r="17" style="fill:'+h.col+';fill-opacity:.75"/>';
  s += '<circle cx="'+(mx+20)+'" cy="'+my+'" r="17" style="fill:'+h.col+';fill-opacity:.75"/>';
  s += txt(mx-20, my+5, h.s, {size:13,w:700,fill:"var(--paper)",anchor:"middle"});
  s += txt(mx+20, my+5, h.s, {size:13,w:700,fill:"var(--paper)",anchor:"middle"});
  s += txt(mx, my+38, h.s+"₂", {size:15,w:700,fill:h.col,anchor:"middle"});
  s += txt(mx, my-30, h.barva.split(",")[0], {size:10.5,fill:"var(--ink-3)",anchor:"middle"});

  /* --- čtyři stupnice vpravo --- */
  var sx = 302, sw = 456;
  function items(key){ return HAL.map(function(e){ return {id:e.s, v:e[key], col:e.col}; }); }
  s += scaleStrip(sx, 58,  sw, "ELEKTRONEGATIVITA", "", items("en"), h.s, 2.0, 4.1, 2);
  s += scaleStrip(sx, 130, sw, "OXIDAČNÍ SÍLA · E°(X₂/2X⁻)", "V", items("E0"), h.s, 0, 3.0, 2);
  s += scaleStrip(sx, 202, sw, "TEPLOTA VARU", "°C", items("tv"), h.s, -230, 360, 1);
  s += scaleStrip(sx, 274, sw, "VAZEBNÁ ENERGIE X—X", "kJ·mol⁻¹", items("D"), h.s, 100, 260, 1);
  s += txt(sx, 330, "tečka = poloha prvku na stupnici · velká tečka = vybraný prvek", {size:10.5,fill:"var(--ink-3)"});

  $("#hgWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Karta halogenu '+h.nm+' s trendy ve skupině"');

  function ro(id,k,v,hh){ var e=$(id); e.className="readout"; e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+hh+'</span>'; }
  ro("#hgRo1","Elektronegativita", fmt(h.en,2), "nejvyšší ve skupině má fluor (3,98)");
  ro("#hgRo2","Oxidační síla E°", sgn(h.E0,2)+" V", "čím vyšší, tím silnější oxidační činidlo");
  ro("#hgRo3","Teplota tání a varu", fmt(h.tt,1)+" °C / "+fmt(h.tv,1)+" °C", "za 25 °C: "+h.st);
  ro("#hgRo4","Vazba X—X", fmt(h.D,1)+" kJ·mol⁻¹", h.s==="F" ? "anomálně slabá — odpuzování volných párů" : "klesá s délkou vazby");
  $("#hgNote").innerHTML = "<b>"+h.nm.charAt(0).toUpperCase()+h.nm.slice(1)+":</b> "+h.n+" &nbsp;·&nbsp; <b>Výskyt:</b> "+h.vysk+".";
}
function initHero(){
  $$("#hgSeg button").forEach(function(b){
    b.addEventListener("click", function(){
      hgCur = b.dataset.v;
      $$("#hgSeg button").forEach(function(x){ x.setAttribute("aria-pressed", x.dataset.v===hgCur); });
      drawHero();
    });
  });
  drawHero();
}

/* ============================================================
   4 · k0 — PRŮZKUMNÍK SKUPINY 18
   ============================================================ */
var vpCur = "Xe";
function drawVzp(){
  var g = vzpBy(vpCur), W = 760, H = 270, s = "";
  var x0 = 60, x1 = 720, y0 = 40, y1 = 190;
  s += txt(14, 20, "SKUPINA 18 · TEPLOTA VARU A IONIZAČNÍ ENERGIE", {size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  /* osy */
  s += line(x0, y1, x1, y1, {c:"var(--line-strong)",w:1.4});
  s += line(x0, y0, x0, y1, {c:"var(--line-strong)",w:1.4});
  var n = VZP.length, step = (x1-x0)/n;
  var tvMin = -275, tvMax = -40, ieMin = 900, ieMax = 2450;
  /* mřížka */
  for(var k=0;k<=4;k++){
    var yy = y1 - k*(y1-y0)/4;
    s += line(x0, yy, x1, yy, {c:"var(--grid)",w:1,dash:"3 4"});
    s += txt(x0-8, yy+4, fmt(tvMin + k*(tvMax-tvMin)/4, 0), {size:10,anchor:"end",fill:"var(--endo)",mono:true});
    s += txt(x1+8, yy+4, fmt(ieMin + (4-k)*(ieMax-ieMin)/4, 0), {size:10,fill:"var(--accent)",mono:true});
  }
  /* body */
  var pTv = [], pIe = [];
  VZP.forEach(function(e,i){
    var cx = x0 + step*(i+0.5);
    var ytv = y1 - (e.tv - tvMin)/(tvMax-tvMin)*(y1-y0);
    var yie = y1 - (ieMax - e.ie)/(ieMax-ieMin)*(y1-y0);
    pTv.push(cx+","+ytv.toFixed(1)); pIe.push(cx+","+yie.toFixed(1));
    var on = (e.s===vpCur);
    if(on) s += rect(cx-step/2+4, y0-6, step-8, y1-y0+12, {fill:e.col,r:8,style:"fill-opacity:.10"});
    s += txt(cx, y1+20, e.s, {size:on?14:12, w:on?700:500, anchor:"middle", fill:on?e.col:"var(--ink-2)"});
    s += txt(cx, y1+36, String(e.z), {size:10, anchor:"middle", fill:"var(--ink-3)", mono:true});
  });
  s += '<polyline points="'+pTv.join(" ")+'" style="fill:none;stroke:var(--endo);stroke-width:2.2"/>';
  s += '<polyline points="'+pIe.join(" ")+'" style="fill:none;stroke:var(--accent);stroke-width:2.2;stroke-dasharray:5 4"/>';
  VZP.forEach(function(e,i){
    var cx = x0 + step*(i+0.5);
    var ytv = y1 - (e.tv - tvMin)/(tvMax-tvMin)*(y1-y0);
    var yie = y1 - (ieMax - e.ie)/(ieMax-ieMin)*(y1-y0);
    var on = (e.s===vpCur);
    s += '<circle cx="'+cx.toFixed(1)+'" cy="'+ytv.toFixed(1)+'" r="'+(on?6.5:4)+'" style="fill:var(--endo)"/>';
    s += '<circle cx="'+cx.toFixed(1)+'" cy="'+yie.toFixed(1)+'" r="'+(on?6.5:4)+'" style="fill:var(--accent)"/>';
  });
  s += txt(14, y1+58, "svislá osa vlevo = teplota varu · vpravo = ionizační energie (obrácená stupnice, aby byl vidět protichůdný trend)",
           {size:10.5, fill:"var(--ink-3)"});
  $("#vpWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Graf teplot varu a ionizačních energií vzácných plynů"');

  function ro(id,k,v,hh){ var e=$(id); e.className="readout"; e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+hh+'</span>'; }
  ro("#vpRo1","Konfigurace · Z = "+g.z, g.cfg, "plná valenční slupka — odtud netečnost");
  ro("#vpRo2","Teplota varu", fmt(g.tv,2)+" °C ("+fmt(g.tvK,2)+" K)", "polarizovatelnost "+fmt(g.pol,3)+"·10⁻³⁰ m³");
  ro("#vpRo3","Ionizační energie", fmt(g.ie,0)+" kJ·mol⁻¹", g.ie<1400 ? "dost nízká na to, aby prvek tvořil sloučeniny" : "příliš vysoká — sloučeniny nevznikají");
  $("#vpZdroj").innerHTML = g.zdroj + " &nbsp;·&nbsp; zastoupení ve vzduchu: <b>" + (g.air>=1000 ? fmt(g.air/10000,3)+" obj. %" : (g.air>=0.001 ? fmt(g.air,3)+" ppm" : "stopy")) + "</b>.";
  $("#vpUziti").innerHTML = g.uziti + ".";
  $("#vpNote").innerHTML = "<b>"+g.nm.charAt(0).toUpperCase()+g.nm.slice(1)+":</b> "+g.n;
}
function initVzp(){
  $$("#vpSeg button").forEach(function(b){
    b.addEventListener("click", function(){
      vpCur = b.dataset.v;
      $$("#vpSeg button").forEach(function(x){ x.setAttribute("aria-pressed", x.dataset.v===vpCur); });
      drawVzp();
    });
  });
  drawVzp();
}

/* ============================================================
   5 · k0 — DESTILAČNÍ KOLONA
   ============================================================ */
var dzT = 90;
function drawDest(){
  var W = 760, H = 336, s = "";
  var x0 = 90, x1 = 700, y0 = 30, y1 = 240;
  var tMin = 0, tMax = 210;
  function xf(t){ return x0 + (t - tMin)/(tMax - tMin)*(x1 - x0); }
  s += txt(14, 16, "DESTILACE KAPALNÉHO VZDUCHU · TEPLOTA V KOLONĚ [K]", {size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  /* osa */
  s += line(x0, y1, x1, y1, {c:"var(--line-strong)",w:1.4});
  for(var t=0;t<=200;t+=25){
    s += line(xf(t), y1, xf(t), y1+6, {c:"var(--line-strong)",w:1});
    s += txt(xf(t), y1+22, String(t), {size:10.5,anchor:"middle",fill:"var(--ink-3)",mono:true});
  }
  /* pruhy složek */
  var row = 0;
  VZDUCH.forEach(function(c){
    var y = y0 + row*26; row++;
    var kap = dzT < c.tvK;      /* pod bodem varu → kapalina */
    s += txt(x0-10, y+13, c.s, {size:12,w:700,anchor:"end",fill:c.col});
    s += rect(x0, y+4, x1-x0, 15, {fill:"var(--surface-3)",r:7});
    if(kap) s += rect(x0, y+4, xf(c.tvK)-x0, 15, {fill:c.col,r:7,style:"fill-opacity:.55"});
    else    s += rect(xf(c.tvK), y+4, x1-xf(c.tvK), 15, {fill:c.col,r:7,style:"fill-opacity:.20"});
    s += '<circle cx="'+xf(c.tvK).toFixed(1)+'" cy="'+(y+11.5)+'" r="5" style="fill:'+c.col+';stroke:var(--paper);stroke-width:1.6"/>';
    var lblRight = xf(c.tvK) < x1-110;
    s += txt(xf(c.tvK)+(lblRight?10:-10), y+15, fmt(c.tvK,1)+" K",
             {size:10,fill:"var(--ink-3)",mono:true,anchor:lblRight?"start":"end"});
    s += txt(x1+4, y+15, kap ? "kapalina" : "plyn", {size:10.5,w:700,fill:kap?"var(--endo)":"var(--ink-3)"});
  });
  /* svislá čára aktuální teploty */
  s += line(xf(dzT), y0-6, xf(dzT), y1+26, {c:"var(--accent)",w:2.4});
  s += chip(Math.max(x0-34, Math.min(x1-34, xf(dzT)-34)), y1+34, 68, 22, fmt(dzT,0)+" K", "var(--accent)", "var(--accent-soft)");
  s += txt(14, y1+82, "plný pruh vlevo od tečky = látka je při dané teplotě zkapalněná · světlý pruh vpravo = zůstává plynná",
           {size:10.5, fill:"var(--ink-3)"});
  $("#dzWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Destilace kapalného vzduchu — které složky jsou při dané teplotě kapalné"');

  var kap = VZDUCH.filter(function(c){ return dzT < c.tvK; });
  var pl  = VZDUCH.filter(function(c){ return dzT >= c.tvK; });
  function ro(id,k,v,hh){ var e=$(id); e.className="readout"; e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+hh+'</span>'; }
  ro("#dzRo1","Zkapalněné složky", kap.length ? kap.map(function(c){return c.s;}).join(" · ") : "žádná",
     kap.length ? "zůstávají v kapalné fázi na dně kolony" : "při této teplotě je všechno plynné");
  ro("#dzRo2","Plynné složky", pl.length ? pl.map(function(c){return c.s;}).join(" · ") : "žádná",
     pl.length ? "odcházejí hlavou kolony" : "při této teplotě je všechno zkapalněné");
  var msg;
  if(dzT < 4.22) msg = "Pod 4,22 K je zkapalněné <b>úplně všechno včetně helia</b> — takovou teplotu ale v průmyslové koloně nikdo nedělá.";
  else if(dzT < 27.10) msg = "Helium už uniklo, ale <b>neon je stále kapalný</b>. Právě v tomhle úzkém pásmu se obě látky od sebe oddělí.";
  else if(dzT < 77.36) msg = "Helium i neon jsou pryč jako plyny — zbytek vzduchu je kapalný. Tohle je <b>hlava kolony</b>.";
  else if(dzT < 87.30) msg = "Dusík se odpařil, <b>argon a kyslík jsou ještě kapalné</b>. Tady začíná dělení argonu.";
  else if(dzT < 90.19) msg = "<b>Argon je přesně na hraně</b> — mezi dusíkem (77,4 K) a kyslíkem (90,2 K) je jen 12,8 K, a proto se čistý argon dělá tak obtížně.";
  else if(dzT < 119.93) msg = "Kyslík se odpařil a v kapalině zbývají už jen <b>krypton a xenon</b>. Přesně z téhle zbytkové kapaliny se oba získávají.";
  else if(dzT < 165.05) msg = "Krypton je pryč, drží se jen <b>xenon</b> — nejméně těkavý ze stabilních vzácných plynů.";
  else if(dzT < 194.7) msg = "Ze vzácných plynů už je všechno plynné; kapalný zůstává jen oxid uhličitý (přesněji: nad 194,7 K sublimuje).";
  else msg = "Nad 195 K je celý vzduch plynný — dělení skončilo.";
  $("#dzOut").innerHTML = msg;
}
function initDest(){
  $("#dzT").addEventListener("input", function(){
    dzT = +this.value; $("#dzTv").textContent = dzT + " K"; drawDest();
  });
  drawDest();
}

/* ============================================================
   6 · k1 — BARTLETTŮV ŽEBŘÍČEK IONIZAČNÍCH ENERGIÍ
   ============================================================ */
var ieH = 1200;
function drawIe(){
  var W = 760, H = 260, s = "";
  var x0 = 70, x1 = 700, y0 = 34, y1 = 200;
  var lo = 850, hi = 2500;
  function yf(v){ return y1 - (v - lo)/(hi - lo)*(y1 - y0); }
  s += txt(14, 18, "IONIZAČNÍ ENERGIE VZÁCNÝCH PLYNŮ [KJ·MOL⁻¹]", {size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  s += line(x0, y1, x1, y1, {c:"var(--line-strong)",w:1.4});
  for(var v=1000; v<=2400; v+=200){
    s += line(x0, yf(v), x1, yf(v), {c:"var(--grid)",w:1,dash:"3 4"});
    s += txt(x0-8, yf(v)+4, String(v), {size:10,anchor:"end",fill:"var(--ink-3)",mono:true});
  }
  var n = VZP.length, step = (x1-x0)/n, bw = Math.min(52, step*0.5);
  VZP.forEach(function(e,i){
    var cx = x0 + step*(i+0.5), ok = e.ie <= ieH;
    var col = ok ? "var(--ok)" : "var(--ink-3)";
    s += rect(cx-bw/2, yf(e.ie), bw, y1-yf(e.ie), {fill:col, r:5, style:ok?"":"fill-opacity:.45"});
    s += txt(cx, yf(e.ie)-8, String(e.ie), {size:11,w:700,anchor:"middle",fill:col,mono:true});
    s += txt(cx, y1+20, e.s, {size:13,w:700,anchor:"middle",fill:ok?"var(--ok)":"var(--ink-2)"});
    s += txt(cx, y1+36, ok ? "zvládne" : "nezvládne", {size:9.5,anchor:"middle",fill:"var(--ink-3)"});
  });
  /* hranice činidla */
  s += line(x0, yf(ieH), x1, yf(ieH), {c:"var(--accent)",w:2.4});
  s += chip(x1-186, 4, 186, 22, "činidlo: "+ieH+" kJ·mol⁻¹", "var(--accent)", "var(--accent-soft)");
  /* O2 značka */
  s += line(x0, yf(1175), x1, yf(1175), {c:"var(--accent)",w:1.4,dash:"6 4"});
  s += txt(x0+4, yf(1175)-6, "O₂ = 1175 (Bartlettův záchytný bod)", {size:10.5,w:600,fill:"var(--accent)"});
  $("#ieWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Sloupcový graf ionizačních energií vzácných plynů s hranicí oxidačního činidla"');

  var ok = VZP.filter(function(e){ return e.ie <= ieH; });
  function ro(id,k,v,hh){ var e=$(id); e.className="readout"; e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+hh+'</span>'; }
  ro("#ieRo1","Činidlo zvládne", ok.length ? ok.map(function(e){return e.s;}).join(" · ") : "žádný prvek",
     ok.length ? "u těchto prvků je sloučenina energeticky myslitelná" : "hranice je pod ionizační energií radonu (1037)");
  ro("#ieRo2","Nezvládne", VZP.length-ok.length + " z " + VZP.length,
     ieH < 1170 ? "ani na xenon to nestačí" : (ieH < 1351 ? "krypton, argon, neon a helium zůstávají mimo" : "helium a neon jsou mimo dosah vždy"));
  var m;
  if(ieH < 1037) m = "Takhle slabé činidlo nezvládne ani radon. Přesně v tomhle stavu byla chemie před rokem 1962.";
  else if(ieH < 1170) m = "Stačí jen na <b>radon</b> — jenže ten je tak radioaktivní, že se s ním pracovat nedá. Slepá ulička.";
  else if(ieH < 1351) m = "Přesně Bartlettova situace: činidlo zvládne <b>xenon</b> (1170), ale na krypton (1351) už nestačí. A přesně tak to dopadlo — první sloučeninou byl xenon.";
  else if(ieH < 1521) m = "Dost i na <b>krypton</b>. Ten skutečně dá KrF₂ — ale je tak nestálý, že se nad −30 °C sám rozkládá.";
  else if(ieH < 2081) m = "Takové činidlo by teoreticky zvládlo i <b>argon</b>. V praxi je to hranice, ke které se dostaneme jen v matrici při 8 K (sloučenina HArF).";
  else m = "Hranice nad ionizační energií neonu je čistě hypotetická — takové oxidační činidlo neexistuje.";
  $("#ieOut").innerHTML = m;
}
function initIe(){
  $("#ieH").addEventListener("input", function(){
    ieH = +this.value; $("#ieHv").textContent = ieH + " kJ·mol⁻¹"; drawIe();
  });
  drawIe();
}

/* ============================================================
   7 · k1 — STAVITEL SLOUČENIN XENONU (VSEPR)
   ============================================================ */
var xeI = 0;
function drawXe(){
  var c = XEC[xeI], W = 760, H = 320, s = "";
  var cx = 250, cy = 160, R = 90;
  var lig = (c.f.indexOf("F") >= 0 && c.f.indexOf("O") < 0) ? "F" : "O";
  var stred = c.f.indexOf("Kr") === 0 ? "Kr" : "Xe";
  s += txt(14, 20, ("GEOMETRIE · " + c.geom).toUpperCase(), {size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});

  /* rozmístění vazeb a volných párů podle geometrie */
  var bonds = [], lps = [];
  function polar(a,r){ return [cx + r*Math.cos(a*Math.PI/180), cy + r*Math.sin(a*Math.PI/180)]; }
  if(c.geom === "lineární"){ bonds = [0,180]; lps = [90, 210, 330]; }
  else if(c.geom.indexOf("čtvercová") === 0){ bonds = [0,90,180,270]; lps = [45,225]; }
  else if(c.geom.indexOf("deformovaný") === 0){ bonds = [0,55,120,180,240,300]; lps = [85]; }
  else if(c.geom.indexOf("trigonální pyramida") === 0){ bonds = [150,30,90]; lps = [270]; }
  else if(c.geom === "tetraedr"){ bonds = [200,340,90,270]; lps = []; }
  else { bonds = [0,60,120,180,240,300]; lps = []; }

  lps.forEach(function(a){
    var p = polar(a, R*0.62);
    s += '<ellipse cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" rx="26" ry="15" transform="rotate('+a+' '+p[0].toFixed(1)+' '+p[1].toFixed(1)+')" style="fill:var(--endo);fill-opacity:.28;stroke:var(--endo);stroke-width:1.4"/>';
  });
  bonds.forEach(function(a){
    var p = polar(a, R);
    s += line(cx, cy, p[0], p[1], {c:"var(--accent)",w:3,cap:"round"});
    s += '<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="17" style="fill:var(--accent);fill-opacity:.22;stroke:var(--accent);stroke-width:1.6"/>';
    s += txt(p[0], p[1]+5, lig, {size:13,w:700,anchor:"middle",fill:"var(--accent)"});
  });
  s += '<circle cx="'+cx+'" cy="'+cy+'" r="27" style="fill:var(--surface-2);stroke:var(--ink-2);stroke-width:2"/>';
  s += txt(cx, cy+6, stred, {size:16,w:700,anchor:"middle",fill:"var(--ink)"});
  if(lps.length) s += txt(cx, cy+62+R*0.0, "", {});

  /* schéma počtu párů vpravo */
  var px = 470, py = 60;
  s += txt(px, py-14, "ELEKTRONOVÉ PÁRY NA STŘEDOVÉM ATOMU", {size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
  for(var i=0;i<c.par;i++){
    var vaz = i < (c.par - c.vol);
    var bx2 = px + (i%5)*46, by2 = py + Math.floor(i/5)*46;
    s += rect(bx2, by2, 38, 38, {fill: vaz ? "var(--accent)" : "var(--endo)", r:8, style:"fill-opacity:.22", stroke: vaz ? "var(--accent)" : "var(--endo)", sw:1.6});
    s += txt(bx2+19, by2+24, vaz ? "σ" : "‥", {size:15,w:700,anchor:"middle",fill: vaz ? "var(--accent)" : "var(--endo)"});
  }
  s += txt(px, py + Math.ceil(c.par/5)*46 + 22, (c.par - c.vol) + " vazebných + " + c.vol + " volných = " + c.par + " párů",
           {size:12.5,w:600,fill:"var(--ink)"});
  s += txt(px, py + Math.ceil(c.par/5)*46 + 42, "→ tvar: " + c.geom, {size:12.5,w:700,fill:"var(--accent)"});
  s += txt(px, py + Math.ceil(c.par/5)*46 + 68, "oxidační číslo " + stred + ": +" + ["0","I","II","III","IV","V","VI","VII","VIII"][c.ox],
           {size:12.5,w:600,fill:"var(--ink-2)"});
  s += txt(px, py + Math.ceil(c.par/5)*46 + 88, "teplota tání: " + c.tt, {size:12,fill:"var(--ink-2)"});

  $("#xeWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Struktura sloučeniny '+c.f+' podle VSEPR"');

  function ro(id,k,v,hh){ var e=$(id); e.className="readout"; e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+hh+'</span>'; }
  ro("#xeRo1", c.f, c.nm, "oxidační číslo " + stred + " = +" + ["0","I","II","III","IV","V","VI","VII","VIII"][c.ox]);
  ro("#xeRo2","Elektronové páry", (c.par - c.vol) + " + " + c.vol + " = " + c.par, "vazebné + volné; volné páry určují tvar");
  ro("#xeRo3","Tvar molekuly", c.geom, "teplota tání " + c.tt);
  $("#xePrip").innerHTML = "<b>Příprava:</b> <span class=\"chem\">" + c.prip + "</span>";
  $("#xeHyd").innerHTML = "<b>Reakce s vodou / rozklad:</b> <span class=\"chem\">" + c.hyd + "</span>";
  $("#xeNote").innerHTML = c.n;
}
function initXe(){
  $$("#xeSeg button").forEach(function(b){
    b.addEventListener("click", function(){
      xeI = +b.dataset.v;
      $$("#xeSeg button").forEach(function(x){ x.setAttribute("aria-pressed", +x.dataset.v===xeI); });
      drawXe();
    });
  });
  drawXe();
}
