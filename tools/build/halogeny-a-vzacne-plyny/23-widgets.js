/* ============================================================
   20 · k8 — CHLORALKALICKÁ ELEKTROLÝZA
   ============================================================ */
var elCur = "memb";
function elBy(id){ for(var i=0;i<CHLA.length;i++) if(CHLA[i].id===id) return CHLA[i]; return CHLA[2]; }
function drawEl(){
  var c = elBy(elCur), W = 780, H = 330, s = "";
  s += txt(14, 18, "CHLORALKALICKÁ ELEKTROLÝZA", {size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  s += txt(14, 38, c.nm.toUpperCase(), {size:12,w:700,fill:"var(--accent)",style:"letter-spacing:.06em"});
  /* nádoba */
  var bx = 90, by = 56, bw = 520, bh = 186;
  s += rect(bx, by, bw, bh, {fill:"var(--surface-2)", r:10, stroke:"var(--line-strong)", sw:2});
  /* elektrolyt */
  s += rect(bx+6, by+40, bw-12, bh-46, {fill:"var(--endo)", r:6, style:"fill-opacity:.10"});
  /* přepážka */
  var mx = bx + bw/2;
  if(elCur === "amal"){
    s += rect(bx+6, by+bh-34, bw-12, 28, {fill:"var(--ink-3)", r:4, style:"fill-opacity:.65"});
    s += txt(mx, by+bh-14, "rtuťová katoda — sodík se rozpouští jako amalgám", {size:11,w:600,anchor:"middle",fill:"var(--paper)"});
  } else {
    s += rect(mx-5, by+34, 10, bh-40, {fill:"var(--accent)", r:3});
    s += txt(mx, by+22, elCur === "memb" ? "iontoměničová membrána" : "porézní diafragma", {size:11,w:700,anchor:"middle",fill:"var(--accent)"});
    if(elCur === "memb"){
      s += hArrow(mx+8, mx+68, by+96, "var(--accent)", "Na⁺ projde", true);
      s += txt(mx-10, by+130, "Cl⁻ a OH⁻ neprojdou", {size:10.5,anchor:"end",fill:"var(--accent)"});
    } else {
      s += hArrow(mx+8, mx+68, by+96, "var(--accent)", "roztok protéká", true);
      s += txt(mx-10, by+130, "sůl projde také → louh je znečištěný", {size:10.5,anchor:"end",fill:"var(--accent)"});
    }
  }
  /* anoda */
  s += rect(bx+34, by+34, 22, bh-70, {fill:"var(--exo)", r:4});
  s += txt(bx+45, by+24, "ANODA +", {size:11,w:700,anchor:"middle",fill:"var(--exo)"});
  s += txt(bx+72, by+62, "2 Cl⁻ → Cl₂ + 2 e⁻", {size:12,w:600,fill:"var(--exo)",mono:true});
  s += txt(bx+72, by+80, "solanka NaCl", {size:10.5,fill:"var(--ink-3)"});
  /* katoda */
  var kx = bx + bw - 56;
  s += rect(kx, by+34, 22, bh-70, {fill:"var(--endo)", r:4});
  s += txt(kx+11, by+24, "KATODA −", {size:11,w:700,anchor:"middle",fill:"var(--endo)"});
  if(elCur === "amal"){
    s += txt(bx+bw-70, by+62, "Na⁺ + e⁻ → Na(Hg)", {size:12,w:600,anchor:"end",fill:"var(--endo)",mono:true});
  } else {
    s += txt(bx+bw-70, by+62, "2 H₂O + 2 e⁻ → H₂ + 2 OH⁻", {size:12,w:600,anchor:"end",fill:"var(--endo)",mono:true});
  }
  /* bubliny produktů */
  s += txt(bx+45, by+bh+22, "Cl₂ ↑", {size:14,w:700,anchor:"middle",fill:"var(--exo)"});
  s += txt(kx+11, by+bh+22, elCur === "amal" ? "amalgám →" : "H₂ ↑", {size:14,w:700,anchor:"middle",fill:"var(--endo)"});
  /* zdroj */
  s += rect(mx-58, 8, 116, 26, {fill:"var(--surface)", r:6, stroke:"var(--ink-2)", sw:1.6});
  s += txt(mx, 26, "zdroj  " + fmt(c.U,1) + " V", {size:12,w:700,anchor:"middle",fill:"var(--ink)"});
  s += line(bx+45, by, bx+45, 21, {c:"var(--exo)",w:2});
  s += line(kx+11, by, kx+11, 21, {c:"var(--endo)",w:2});
  s += line(bx+45, 21, mx-58, 21, {c:"var(--exo)",w:2});
  s += line(mx+58, 21, kx+11, 21, {c:"var(--endo)",w:2});
  /* panel čísel vpravo */
  var px = 630;
  s += txt(px, 67, "napětí", {size:10.5,w:600,fill:"var(--ink-3)"});
  s += txt(px, 90, fmt(c.U,1) + " V", {size:17,w:700,fill:"var(--accent)",mono:true});
  s += txt(px, 121, "spotřeba", {size:10.5,w:600,fill:"var(--ink-3)"});
  s += txt(px, 144, fmt(c.kWh,0), {size:17,w:700,fill:"var(--accent)",mono:true});
  s += txt(px, 165, "kWh na tunu Cl₂", {size:10,fill:"var(--ink-3)"});
  s += txt(px, 189, "louh", {size:10.5,w:600,fill:"var(--ink-3)"});
  s += txt(px, 210, c.naoh.split(",")[0], {size:15,w:700,fill:"var(--endo)",mono:true});
  s += txt(px, 244, c.rok, {size:10,fill:"var(--ink-3)"});
  s += txt(14, 306, "celková rovnice: 2 NaCl + 2 H₂O → 2 NaOH + Cl₂ + H₂ · na tunu chloru vzniká 1,128 t louhu a 28,4 kg vodíku",
           {size:10.5,fill:"var(--ink-3)"});
  $("#elWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Schéma chloralkalické elektrolýzy — '+c.nm+'"');

  function ro(id,k,v,hh){ var e=$(id); e.className="readout"; e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+hh+'</span>'; }
  ro("#elRo1","Napětí článku", fmt(c.U,1) + " V", "teoretické minimum je 2,19 V");
  ro("#elRo2","Spotřeba elektřiny", fmt(c.kWh,0) + " kWh/t Cl₂", "spočteno jako 2·F·U na mol chloru");
  ro("#elRo3","Vyrobený hydroxid", c.naoh, c.rok);
  $("#elEq").innerHTML = "<b>Katodový děj:</b> <span class=\"chem\">" + c.kat + "</span>" +
    (c.id === "amal" ? "<br><b>Druhý stupeň:</b> <span class=\"chem\">" + c.krok + "</span>" : "");
  $("#elProc").innerHTML = "<b>Jak se prostory oddělí:</b> " + (c.id === "amal" ? c.krok : c.krok) + " — " + c.proc;
  $("#elPlus").innerHTML = c.plus;
  $("#elMinus").innerHTML = c.minus;
}
function initEl(){
  $$("#elSeg button").forEach(function(b){
    b.addEventListener("click", function(){
      elCur = b.dataset.v;
      $$("#elSeg button").forEach(function(x){ x.setAttribute("aria-pressed", x.dataset.v===elCur); });
      drawEl();
    });
  });
  drawEl();
}

/* ============================================================
   21 · k8 — FARADAYOVA KALKULAČKA
   ============================================================ */
var fdI = 100, fdT = 60, fdU = 31;   /* proud v setinách kA, čas v min, napětí v desetinách V */
function drawFd(){
  var I = fdI * 100;               /* A */
  var t = fdT * 60;                /* s */
  var U = fdU / 10;                /* V */
  var Q = I * t;
  var ne = Q / FCONST;
  var nCl = ne / 2, nH = ne / 2, nNa = ne;
  var mCl = nCl * M_CL2, mNa = nNa * M_NAOH, mH = nH * M_H2;
  var E = U * Q / 3.6e6;           /* kWh */
  function ro(id,k,v,hh){ var e=$(id); e.className="readout"; e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+hh+'</span>'; }
  ro("#fdRo1","Prošlý náboj Q = I·t", fmt(Q/1e6,2) + " MC", "proud " + fmt(I/1000,2) + " kA · čas " + fmt(t,0) + " s");
  ro("#fdRo2","Chlor", (mCl >= 1000 ? fmt(mCl/1000,2) + " kg" : fmt(mCl,1) + " g"), fmt(nCl,1) + " mol · objem " + fmt(nCl*22.414/1000,2) + " m³ za normálních podmínek");
  ro("#fdRo3","Hydroxid sodný", (mNa >= 1000 ? fmt(mNa/1000,2) + " kg" : fmt(mNa,1) + " g"), fmt(nNa,1) + " mol · poměr k chloru " + fmt(mNa/mCl,3));
  ro("#fdRo4","Spotřeba energie", fmt(E,1) + " kWh", "při napětí " + fmt(U,1) + " V · " + fmt(E/(mCl/1e6),0) + " kWh na tunu Cl₂");
  $("#fdSteps").innerHTML =
    '<p class="eq" style="margin:0"><b>Anoda:</b> <span class="chem">2 Cl⁻ → Cl₂ + 2 e⁻</span> &nbsp;·&nbsp; <b>katoda:</b> <span class="chem">2 H₂O + 2 e⁻ → H₂ + 2 OH⁻</span></p>' +
    '<p class="eq" style="margin:0"><span class="q">n</span>(e⁻) = <span class="q">Q</span>/<span class="q">F</span> = ' + fmt(Q/1e6,2) + '·10⁶ / 96 485 = <b>' + fmt(ne,1) + ' mol</b> &nbsp;→&nbsp; <span class="q">n</span>(Cl₂) = <span class="q">n</span>(e⁻)/2 = ' + fmt(nCl,1) + ' mol</p>' +
    '<p class="eq" style="margin:0;border-left-color:var(--endo)"><span class="q">m</span>(Cl₂) = <span class="q">n</span>·<span class="q">M</span> = ' + fmt(nCl,1) + ' · 70,90 = <b>' + fmt(mCl/1000,2) + ' kg</b> &nbsp;·&nbsp; <span class="q">m</span>(H₂) = ' + fmt(mH/1000,2) + ' kg &nbsp;·&nbsp; <span class="q">m</span>(NaOH) = <b>' + fmt(mNa/1000,2) + ' kg</b></p>';
}
function initFd(){
  $("#fdI").addEventListener("input", function(){ fdI = +this.value; $("#fdIv").textContent = fmt(fdI/10,1) + " kA"; drawFd(); });
  $("#fdT").addEventListener("input", function(){
    fdT = +this.value;
    $("#fdTv").textContent = fdT >= 60 ? (fmt(fdT/60,1) + " h") : (fdT + " min");
    drawFd();
  });
  $("#fdU").addEventListener("input", function(){ fdU = +this.value; $("#fdUv").textContent = fmt(fdU/10,1) + " V"; drawFd(); });
  $("#fdIv").textContent = fmt(fdI/10,1) + " kA";
  drawFd();
}

/* ============================================================
   22 · k8 — KATALYTICKÝ CYKLUS NIČENÍ OZONU
   ============================================================ */
var ozCur = "cfc12", ozN = 10000;
function ozBy(id){ for(var i=0;i<ODS.length;i++) if(ODS[i].id===id) return ODS[i]; return ODS[0]; }
function drawOz(){
  var c = ozBy(ozCur), W = 760, H = 300, s = "";
  var aktiv = (c.cl + c.br) > 0;
  s += txt(14, 20, ("KATALYTICKÝ CYKLUS · " + c.nm).toUpperCase(), {size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  var cx = 250, cy = 165, R = 86;
  var col = aktiv ? (c.br > 0 ? "var(--cat2)" : "var(--exo)") : "var(--ok)";
  /* kruh cyklu */
  s += '<circle cx="'+cx+'" cy="'+cy+'" r="'+R+'" style="fill:none;stroke:'+col+';stroke-width:2.6;stroke-dasharray:'+(aktiv?"":"6 6")+'"/>';
  /* šipky cyklu */
  s += '<path d="M'+(cx+R)+' '+cy+' l-8 -8 l0 16 z" style="fill:'+col+'"/>';
  s += '<path d="M'+(cx-R)+' '+cy+' l8 8 l0 -16 z" style="fill:'+col+'"/>';
  var rad = c.br > 0 ? "Br" : "Cl";
  s += '<circle cx="'+cx+'" cy="'+(cy-R)+'" r="24" style="fill:'+col+';fill-opacity:.26;stroke:'+col+';stroke-width:2"/>';
  s += txt(cx, cy-R+5, aktiv ? (rad + "·") : "—", {size:14,w:700,anchor:"middle",fill:col});
  s += '<circle cx="'+cx+'" cy="'+(cy+R)+'" r="24" style="fill:'+col+';fill-opacity:.26;stroke:'+col+';stroke-width:2"/>';
  s += txt(cx, cy+R+5, aktiv ? (rad + "O·") : "—", {size:13,w:700,anchor:"middle",fill:col});
  s += txt(cx+R+16, cy-16, "+ O₃", {size:12,w:700,fill:"var(--endo)"});
  s += txt(cx+R+16, cy+2, "− O₂", {size:12,w:600,fill:"var(--ink-3)"});
  s += txt(cx-R-16, cy-16, "+ O", {size:12,w:700,anchor:"end",fill:"var(--endo)"});
  s += txt(cx-R-16, cy+2, "− O₂", {size:12,w:600,anchor:"end",fill:"var(--ink-3)"});
  s += txt(cx, cy-4, aktiv ? "katalyzátor" : "žádný", {size:12,w:700,anchor:"middle",fill:col});
  s += txt(cx, cy+14, aktiv ? "se vrací" : "radikál", {size:12,w:700,anchor:"middle",fill:col});
  /* vzorec a rozpad */
  s += txt(40, 62, c.f, {size:20,w:700,fill:"var(--ink)"});
  s += txt(40, 82, c.nm, {size:12,fill:"var(--ink-2)"});
  s += txt(40, 104, "atomů Cl: " + c.cl + " · Br: " + c.br, {size:11.5,fill:"var(--ink-3)",mono:true});

  /* sloupec zničených molekul */
  var gx = 470, gw = 260, gy = 70, gh = 170;
  var zn = aktiv ? ozN : 0;
  var frac = Math.min(1, zn/100000);
  s += txt(gx, gy-12, "ZNIČENÉ MOLEKULY OZONU", {size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
  s += rect(gx, gy, gw, gh, {fill:"var(--surface-3)", r:8});
  s += rect(gx, gy + gh*(1-frac), gw, gh*frac, {fill:col, r:8, style:"fill-opacity:.7"});
  s += txt(gx+gw/2, gy+gh/2+8, fmt(zn,0).replace(/\B(?=(\d{3})+(?!\d))/g, " "), {size:22,w:700,anchor:"middle",fill: frac>0.35 ? "var(--paper)" : "var(--ink)", mono:true});
  s += txt(gx+gw/2, gy+gh+20, "z jediného uvolněného atomu " + (aktiv ? rad : "—"), {size:11,anchor:"middle",fill:"var(--ink-3)"});
  s += txt(14, 286, "cyklus: X· + O₃ → XO· + O₂ &nbsp;·&nbsp; XO· + O → X· + O₂ &nbsp;·&nbsp; celkově O₃ + O → 2 O₂, katalyzátor se nespotřebuje",
           {size:10.5,fill:"var(--ink-3)"});
  $("#ozWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Katalytický cyklus rozkladu ozonu látkou '+c.nm+'"');

  function ro(id,k,v,hh){ var e=$(id); e.className="readout " + (aktiv ? "neg" : "pos"); e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+hh+'</span>'; }
  ro("#ozRo1","Ozonový potenciál ODP", fmt(c.odp,3), "referenční hodnota 1 patří freonu 11");
  ro("#ozRo2","Životnost v atmosféře", fmt(c.zivot,1) + " let", c.zivot > 40 ? "dost dlouhá na to, aby látka doputovala do stratosféry" : "krátká — většina se rozloží dřív");
  ro("#ozRo3","Zničený ozon", aktiv ? (fmt(ozN,0) + " molekul") : "žádný", aktiv ? "při " + fmt(ozN,0) + " průbězích cyklu" : "molekula neobsahuje chlor ani brom");
  $("#ozOut").innerHTML = c.n;
}
function initOz(){
  $$("#ozSeg button").forEach(function(b){
    b.addEventListener("click", function(){
      ozCur = b.dataset.v;
      $$("#ozSeg button").forEach(function(x){ x.setAttribute("aria-pressed", x.dataset.v===ozCur); });
      drawOz();
    });
  });
  $("#ozN").addEventListener("input", function(){
    ozN = +this.value;
    $("#ozNv").textContent = fmt(ozN,0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    drawOz();
  });
  drawOz();
}

/* ============================================================
   23 · RYCHLOKURZ — TŘI MINI-GRAFY
   ============================================================ */
function drawMiniTv(){
  var W = 620, H = 150, s = "";
  var x0 = 46, x1 = 580, y0 = 22, y1 = 104;
  var lo = -240, hi = 200;
  function yf(v){ return y1 - (v - lo)/(hi - lo)*(y1 - y0); }
  s += line(x0, yf(0), x1, yf(0), {c:"var(--line-strong)",w:1.2});
  s += txt(x0-6, yf(0)+4, "0 °C", {size:9.5,anchor:"end",fill:"var(--ink-3)",mono:true});
  var step = (x1-x0)/4;
  HAL.slice(0,4).forEach(function(e,i){
    var cx = x0 + step*(i+0.5);
    s += rect(cx-24, Math.min(yf(e.tv), yf(0)), 48, Math.abs(yf(0)-yf(e.tv)), {fill:e.col, r:4, style:"fill-opacity:.8"});
    s += txt(cx, yf(e.tv) + (e.tv > 0 ? -8 : 14), fmt(e.tv,1), {size:10.5,w:700,anchor:"middle",fill:e.col,mono:true});
    s += txt(cx, y1+20, e.s + "₂", {size:12,w:700,anchor:"middle",fill:e.col});
    s += txt(cx, y1+34, e.st, {size:9.5,anchor:"middle",fill:"var(--ink-3)"});
  });
  s += txt(14, 14, "TEPLOTA VARU [°C] — ROSTE DOLŮ SKUPINOU", {size:10,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  $("#miniTvWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Mini-graf teplot varu halogenů"');
}
function drawMiniE0(){
  var W = 620, H = 180, s = "";
  var x0 = 60, x1 = 580, y = 66;
  s += txt(14, 16, "OXIDAČNÍ SÍLA E°(X₂/2X⁻) [V] — KLESÁ DOLŮ SKUPINOU", {size:10,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  s += rect(x0, y, x1-x0, 10, {fill:"var(--surface-3)", r:5});
  HAL.slice(0,4).forEach(function(e){
    var t = e.E0/3.0, cx = x0 + t*(x1-x0);
    s += '<circle cx="'+cx.toFixed(1)+'" cy="'+(y+5)+'" r="8" style="fill:'+e.col+'"/>';
    s += txt(cx, y-12, e.s + "₂", {size:12,w:700,anchor:"middle",fill:e.col});
    s += txt(cx, y+30, sgn(e.E0,2), {size:10.5,anchor:"middle",fill:e.col,mono:true});
  });
  s += hArrow(x1-10, x0+10, y+58, "var(--ink-3)", "lehčí halogen vytěsní těžší z jeho soli", false);
  s += txt(x0, y+98, "Cl₂ + 2 KBr → 2 KCl + Br₂ ✓ · I₂ + KBr → nereaguje ✕", {size:11,w:600,fill:"var(--ink-2)"});
  $("#miniE0Wrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Mini-graf oxidační síly halogenů"');
}
function drawMiniAcid(){
  var W = 620, H = 186, s = "";
  var x0 = 60, x1 = 580, y0 = 36, y1 = 112;
  var aMin = -9, aMax = 9;
  function yf(a){ return y1 - ((a - aMin)/(aMax - aMin))*(y1 - y0); }
  s += txt(14, 16, "OXOKYSELINY CHLORU — KYSELOST ROSTE, OXIDAČNÍ SÍLA KLESÁ", {size:10,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  s += line(x0, y1, x1, y1, {c:"var(--line-strong)",w:1.2});
  var step = (x1-x0)/4;
  OXO.forEach(function(e,i){
    var cx = x0 + step*(i+0.5);
    var h1 = y1 - yf(-e.pKa);
    s += rect(cx-30, yf(-e.pKa), 26, h1, {fill:"var(--endo)", r:4});
    var h2 = (e.oxid/2.0)*(y1-y0);
    s += rect(cx+4, y1-h2, 26, h2, {fill:"var(--exo)", r:4});
    s += txt(cx, y1+18, e.f, {size:11.5,w:700,anchor:"middle",fill:"var(--ink)"});
    s += txt(cx, y1+33, "pKa " + fmt(e.pKa,1), {size:9.5,anchor:"middle",fill:"var(--endo)",mono:true});
    s += txt(cx, y1+48, fmt(e.oxid,2) + " V", {size:9.5,anchor:"middle",fill:"var(--exo)",mono:true});
  });
  s += txt(x0, y1+66, "modrá = kyselost (−pKa) · oranžová = oxidační síla (E° ve V)", {size:10,fill:"var(--ink-3)"});
  $("#miniAcidWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Mini-graf kyselosti a oxidační síly oxokyselin chloru"');
}
