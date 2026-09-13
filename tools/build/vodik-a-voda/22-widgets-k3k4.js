/* ============================================================
   6 · KAPITOLA 3 — rozhodovač reakcí vodíku
   ============================================================ */
var rxState = {id:"o2", f:"all"};
function rxFind(id){ for(var i=0;i<REAK.length;i++){ if(REAK[i].id===id) return REAK[i]; } return REAK[0]; }
function rxList(){ return REAK.filter(function(r){ return rxState.f==="all" || (rxState.f==="ox" ? (r.role!=="red") : (r.role==="red")); }); }
function rxFill(){
  var L = rxList();
  if(L.length && !L.some(function(r){ return r.id===rxState.id; })) rxState.id = L[0].id;
  $("#rxSel").innerHTML = L.map(function(r){
    return '<option value="'+r.id+'"'+(r.id===rxState.id?' selected':'')+'>H₂ + '+r.b+' — '+r.eq+'</option>';
  }).join("");
}
function drawRx(){
  var r = rxFind(rxState.id);
  var W=760, H=210, s="";
  var isRed = (r.role==="red");
  var c = isRed ? "var(--endo)" : (r.role==="ox" ? "var(--exo)" : "var(--cat2)");
  /* stupnice oxidačního čísla vodíku */
  var L=140, R=620, Y=110;
  s += line(L, Y, R, Y, {c:"var(--line-strong)", w:2});
  [["−I", L], ["0", (L+R)/2], ["+I", R]].forEach(function(m){
    s += line(m[1], Y-9, m[1], Y+9, {c:"var(--line-strong)", w:2});
    s += txt(m[1], Y+32, m[0], {anchor:"middle", size:15, w:700, fill:"var(--ink-2)", mono:true});
  });
  s += txt(L, Y+56, "hydridový aniont H⁻", {anchor:"middle", size:11, fill:"var(--exo)"});
  s += txt((L+R)/2, Y+56, "elementární H₂", {anchor:"middle", size:11, fill:"var(--ink-3)"});
  s += txt(R, Y+56, "vodík vázaný na nekov", {anchor:"middle", size:11, fill:"var(--endo)"});
  s += txt(W/2, 34, isRed ? "VODÍK JAKO REDUKČNÍ ČINIDLO" : (r.role==="ox" ? "VODÍK JAKO OXIDAČNÍ ČINIDLO" : "DELOKALIZOVANÁ KOVOVÁ VAZBA"),
        {anchor:"middle", size:13, w:700, fill:c, style:"letter-spacing:.13em"});
  /* šipka */
  var x0=(L+R)/2, x1 = isRed ? R : L;
  s += line(x0, Y-40, x1, Y-40, {c:c, w:3, cap:"round"});
  var d = (x1>x0) ? 1 : -1;
  s += '<path d="M'+x1+' '+(Y-40)+' l'+(-11*d)+' -6 l0 12 z" style="fill:'+c+'"/>';
  s += line(x0, Y-40, x0, Y-6, {c:c, w:1.4, dash:"3 3"});
  s += line(x1, Y-40, x1, Y-6, {c:c, w:1.4, dash:"3 3"});
  s += txt((x0+x1)/2, Y-52, isRed ? "vodík odevzdal elektronovou hustotu → oxidoval se" : (r.role==="ox" ? "vodík přijal elektron → redukoval se" : "vodík se zapojil do kovové vazby"),
        {anchor:"middle", size:12, w:600, fill:c});
  /* rovnice reaktantů */
  s += txt(64, Y+6, "H₂", {anchor:"middle", size:17, w:700, fill:"var(--accent)"});
  s += txt(64, Y+26, "0", {anchor:"middle", size:11, fill:"var(--ink-3)", mono:true});
  s += txt(690, Y+6, r.b, {anchor:"middle", size:17, w:700, fill:c});
  $("#rxWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Role vodíku v reakci"');
  $("#rxEq").innerHTML = '<span class="chem">'+r.eq+'</span>';
  vvRo("#rxRo1", "Role vodíku", isRed ? "redukční činidlo" : (r.role==="ox" ? "oxidační činidlo" : "kovová vazba"), r.ox, isRed?"pos":"neg");
  vvRo("#rxRo2", "Podmínky", r.pod.length>44 ? r.pod.slice(0,42)+"…" : r.pod, "co je potřeba dodat", "");
  vvRo("#rxRo3", "Partner", r.b, isRed ? "nekov nebo oxid kovu" : (r.role==="ox" ? "elektropozitivní kov" : "přechodný kov"), "");
  $("#rxNote").innerHTML = r.proc + "<br><br><b>Podmínky:</b> " + r.pod;
}
function initRx(){
  rxFill();
  $("#rxSel").addEventListener("change", function(){ rxState.id = this.value; drawRx(); });
  $$("#rxFilt button").forEach(function(b){
    b.addEventListener("click", function(){
      rxState.f = b.dataset.v;
      $$("#rxFilt button").forEach(function(x){ x.setAttribute("aria-pressed", x.dataset.v===rxState.f); });
      rxFill(); drawRx();
    });
  });
  drawRx();
}

/* ============================================================
   7 · KAPITOLA 4 — průzkumník cest k vodíku
   ============================================================ */
var vyState = {id:"smr", k:"all"};
function vyFind(id){ for(var i=0;i<VYR.length;i++){ if(VYR[i].id===id) return VYR[i]; } return VYR[0]; }
function vyList(){ return VYR.filter(function(v){ return vyState.k==="all" || v.kat===vyState.k; }); }
function vyFill(){
  var L = vyList();
  if(L.length && !L.some(function(v){ return v.id===vyState.id; })) vyState.id = L[0].id;
  $("#vySel").innerHTML = L.map(function(v){
    return '<option value="'+v.id+'"'+(v.id===vyState.id?' selected':'')+'>'+(v.kat==="průmysl"?"Průmysl · ":"Laboratoř · ")+v.nm+'</option>';
  }).join("");
}
function drawVy(){
  var v = vyFind(vyState.id);
  var W=780, H=230, s="";
  var prum = v.kat==="průmysl";
  var cP = prum ? "var(--cat3)" : "var(--cat1)";
  /* vstupy vlevo */
  v.vst.forEach(function(t, i){
    var y = 46 + i*52;
    s += rect(24, y, 190, 40, {fill:"var(--surface-2)", r:9, stroke:"var(--line-strong)", sw:1.4});
    s += txt(119, y+25, t, {anchor:"middle", size:12, w:600, fill:"var(--ink-2)"});
    s += line(214, y+20, 268, 106, {c:"var(--ink-3)", w:1.6});
    s += '<path d="M268 106 l-11 -3 l3 9 z" style="fill:var(--ink-3)"/>';
  });
  /* reaktor */
  s += rect(272, 58, 232, 100, {fill:cP, r:14, style:"fill-opacity:.16;stroke:"+cP+";stroke-width:2"});
  s += txt(388, 88, prum ? "PRŮMYSLOVÁ VÝROBA" : "LABORATORNÍ PŘÍPRAVA", {anchor:"middle", size:10.5, w:700, fill:cP, style:"letter-spacing:.12em"});
  var nm = v.nm.length>30 ? v.nm.slice(0,29)+"…" : v.nm;
  s += txt(388, 114, nm, {anchor:"middle", size:13, w:700, fill:"var(--ink)"});
  s += txt(388, 138, v.pod.length>42 ? v.pod.slice(0,40)+"…" : v.pod, {anchor:"middle", size:10.5, fill:"var(--ink-3)"});
  /* výstupy vpravo */
  v.vyst.forEach(function(t, i){
    var y = 56 + i*56;
    var main = t.indexOf("H₂")===0 || t.indexOf("H₂")>=0;
    s += line(504, 106, 556, y+20, {c: main?"var(--accent)":"var(--ink-3)", w: main?2.2:1.6});
    s += '<path d="M556 '+(y+20)+' l-11 -3 l3 9 z" style="fill:'+(main?"var(--accent)":"var(--ink-3)")+'"/>';
    s += rect(560, y, 196, 40, {fill: main?"var(--accent)":"var(--surface-2)", r:9, stroke: main?"var(--accent)":"var(--line-strong)", sw:1.4, style: main?"fill-opacity:.16":""});
    s += txt(658, y+25, t, {anchor:"middle", size:12, w:600, fill: main?"var(--accent)":"var(--ink-2)"});
  });
  s += txt(W/2, 20, prum ? "velkokapacitní technologie" : "malokapacitní postup", {anchor:"middle", size:11, w:600, fill:cP, style:"letter-spacing:.1em"});
  $("#vyWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Schéma získávání vodíku"');
  $("#vyEq").innerHTML = '<span class="chem">'+v.eq+'</span>';
  $("#vySum").innerHTML = '<b>souhrnně:</b> <span class="chem">'+v.sum+'</span>';
  vvRo("#vyRo1", "Podíl na výrobě", v.podil, v.kat==="průmysl" ? "ze světové produkce" : "mimo průmyslové měřítko", "");
  vvRo("#vyRo2", "Tepelná bilance", v.dh, v.pod, "");
  vvRo("#vyRo3", "Uhlíková stopa", v.co2, v.barva==="—" ? "laboratorní měřítko" : ("označení: "+v.barva), (v.co2.indexOf("0")===0 || v.co2.indexOf("blízko")===0) ? "pos" : (v.co2==="—" ? "" : "neg"));
  $("#vyNote").innerHTML = v.pozn;
}
function initVy(){
  vyFill();
  $("#vySel").addEventListener("change", function(){ vyState.id = this.value; drawVy(); });
  $$("#vyKat button").forEach(function(b){
    b.addEventListener("click", function(){
      vyState.k = b.dataset.v;
      $$("#vyKat button").forEach(function(x){ x.setAttribute("aria-pressed", x.dataset.v===vyState.k); });
      vyFill(); drawVy();
    });
  });
  drawVy();
}

/* --- kalkulačka elektrolýzy ------------------------------------------ */
var elState = {I:10, t:30, U:1.90};
function drawEl(){
  var I = elState.I, t = elState.t*60, U = elState.U;
  var Q = I*t, nH = Q/(2*FARAD), nO = Q/(4*FARAD);
  var mH = nH*MH2, VH = nH*VMOL, VO = nO*VMOL;
  var W = U*I*t/3.6e6;                 /* kWh */
  var spec = mH>0 ? (W/(mH/1000)) : 0; /* kWh na kg */
  var Wd=760, Hd=250, s="";
  /* schéma elektrolyzéru */
  s += rect(180, 40, 400, 170, {fill:"var(--surface-2)", r:14, stroke:"var(--line-strong)", sw:1.6});
  s += txt(380, 32, "elektrolyzér — vodný roztok KOH", {anchor:"middle", size:11, w:600, fill:"var(--ink-3)"});
  /* elektrody */
  s += rect(240, 70, 22, 120, {fill:"var(--exo)", r:4, style:"fill-opacity:.7"});
  s += rect(498, 70, 22, 120, {fill:"var(--endo)", r:4, style:"fill-opacity:.7"});
  s += txt(251, 208, "katoda (−)", {anchor:"middle", size:11.5, w:700, fill:"var(--exo)"});
  s += txt(509, 208, "anoda (+)", {anchor:"middle", size:11.5, w:700, fill:"var(--endo)"});
  /* bubliny — počet úměrný objemu */
  var nb = Math.max(3, Math.min(14, Math.round(VH/2)));
  for(var i=0;i<nb;i++){
    var yy = 180 - (i%7)*20, xo = 268 + (i>6?12:0);
    s += '<circle cx="'+xo+'" cy="'+yy+'" r="'+(4+ (i%3))+'" style="fill:var(--exo);fill-opacity:.5"/>';
  }
  var nb2 = Math.max(2, Math.round(nb/2));
  for(var j=0;j<nb2;j++){
    var yy2 = 180 - (j%7)*20;
    s += '<circle cx="'+(488)+'" cy="'+yy2+'" r="'+(4+(j%3))+'" style="fill:var(--endo);fill-opacity:.5"/>';
  }
  s += txt(300, 60, "H₂", {anchor:"middle", size:18, w:700, fill:"var(--exo)"});
  s += txt(462, 60, "O₂", {anchor:"middle", size:18, w:700, fill:"var(--endo)"});
  /* poměr objemů */
  s += rect(24, 70, 130, 26, {fill:"var(--exo)", r:6, style:"fill-opacity:.2"});
  s += txt(89, 88, "V(H₂) = "+fmt(VH,2)+" dm³", {anchor:"middle", size:11.5, w:600, fill:"var(--exo)", mono:true});
  s += rect(24+65-32.5, 106, 65, 26, {fill:"var(--endo)", r:6, style:"fill-opacity:.2"});
  s += txt(89, 124, "V(O₂) = "+fmt(VO,2), {anchor:"middle", size:10.5, w:600, fill:"var(--endo)", mono:true});
  s += txt(89, 150, "poměr objemů", {anchor:"middle", size:11, fill:"var(--ink-3)"});
  s += txt(89, 176, "2 : 1", {anchor:"middle", size:16, w:700, fill:"var(--ink-2)", mono:true});
  /* zdroj */
  s += txt(660, 90, "zdroj", {anchor:"middle", size:11.5, w:600, fill:"var(--ink-3)"});
  s += txt(660, 116, fmt(I,1)+" A", {anchor:"middle", size:15, w:700, fill:"var(--ink)", mono:true});
  s += txt(660, 140, fmt(U,2)+" V", {anchor:"middle", size:15, w:700, fill:"var(--ink)", mono:true});
  s += txt(660, 164, fmt(elState.t,0)+" min", {anchor:"middle", size:13, w:600, fill:"var(--ink-3)", mono:true});
  $("#elWrap").innerHTML = svg("0 0 "+Wd+" "+Hd, s, 'aria-label="Elektrolýza vody"');
  $("#elIV").textContent = fmt(I,1)+" A";
  $("#elTV").textContent = fmt(elState.t,0)+" min";
  $("#elUV").textContent = fmt(U,2)+" V";
  vvRo("#elRo1", "Vzniklý vodík", fmt(mH,3)+" g", fmt(VH,2)+" dm³ za normálních podmínek", "pos");
  vvRo("#elRo2", "Spotřebovaná energie", fmt(W,4)+" kWh", "součin U · I · t", "neg");
  vvRo("#elRo3", "Měrná spotřeba", fmt(spec,1)+" kWh·kg⁻¹", U<=1.25 ? "teoretické minimum" : "reálné elektrolyzéry 50 až 55", spec<40?"pos":"neg");
  $("#elEq").innerHTML = '<span class="q">n</span>(H₂) = <span class="q">Q</span>/(<span class="q">z</span>·<span class="q">F</span>) = ('+fmt(I,1)+' · '+fmt(t,0)+') / (2 · 96 485) = <b>'+fmt(nH,4)+' mol</b> &nbsp;→&nbsp; <span class="q">m</span> = '+fmt(mH,3)+' g, <span class="q">V</span> = '+fmt(VH,2)+' dm³';
}
function initEl(){
  $("#elI").addEventListener("input", function(){ elState.I = +this.value; drawEl(); });
  $("#elT").addEventListener("input", function(){ elState.t = +this.value; drawEl(); });
  $("#elU").addEventListener("input", function(){ elState.U = +this.value/100; drawEl(); });
  drawEl();
}

/* --- energetická hustota paliv --------------------------------------- */
var enState = {m:"m"};
var PALIVA = [
  {nm:"Vodík (LHV)",        m:120,  v:4.8,  h:"stlačený na 70 MPa", c:"var(--accent)"},
  {nm:"Vodík kapalný",      m:120,  v:8.5,  h:"−253 °C, 70,8 kg·m⁻³", c:"var(--accent)"},
  {nm:"Zemní plyn (CNG)",   m:50,   v:8.1,  h:"stlačený na 20 MPa", c:"var(--cat1)"},
  {nm:"Benzin",             m:44,   v:32.8, h:"hustota 0,745 kg·dm⁻³", c:"var(--cat3)"},
  {nm:"Nafta",              m:43,   v:35.9, h:"hustota 0,835 kg·dm⁻³", c:"var(--cat3)"},
  {nm:"Methanol",           m:19.9, v:15.8, h:"hustota 0,792 kg·dm⁻³", c:"var(--cat2)"},
  {nm:"Černé uhlí",         m:30,   v:24,   h:"sypná hustota 0,8 kg·dm⁻³", c:"var(--ink-3)"},
  {nm:"Akumulátor Li-ion",  m:0.65, v:1.4,  h:"180 Wh·kg⁻¹, 400 Wh·dm⁻³", c:"var(--endo)"}
];
function drawEn(){
  var key = enState.m;
  var W=760, H=302, L=200, R=720, T0=30, B=250;
  var max = Math.max.apply(null, PALIVA.map(function(p){ return p[key]; })) * 1.12;
  var X = function(v){ return L + v/max*(R-L); };
  var n = PALIVA.length, bh = (B-T0)/n*0.62, gap = (B-T0)/n;
  var s = "";
  for(var g=0; g<=4; g++){
    var v = max*g/4;
    s += line(X(v), T0-6, X(v), B, {c:"var(--line)", w:1});
    s += txt(X(v), B+18, fmt(v,0), {anchor:"middle", size:11, fill:"var(--ink-3)", mono:true});
  }
  PALIVA.forEach(function(p, i){
    var y = T0 + gap*i + gap/2 - bh/2, v = p[key];
    s += rect(L, y, X(v)-L, bh, {fill:p.c, r:4, style:"fill-opacity:.8"});
    s += txt(L-10, y+bh/2+4, p.nm, {anchor:"end", size:11.5, w:600, fill:"var(--ink-2)"});
    s += txt(X(v)+8, y+bh/2+4, fmt(v, v<10?1:0), {size:11.5, w:700, fill:p.c, mono:true});
  });
  s += line(L, T0-6, L, B, {c:"var(--line-strong)", w:1.5});
  s += txt((L+R)/2, B+40, key==="m" ? "energie na kilogram [MJ·kg⁻¹]" : "energie na litr [MJ·dm⁻³]",
        {anchor:"middle", size:12, w:700, fill:"var(--ink-3)", style:"letter-spacing:.06em"});
  $("#enWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Energetická hustota paliv"');
  var h2 = PALIVA[0][key], ben = PALIVA[3][key];
  vvRo("#enRo1", "Vodík", fmt(h2, h2<10?1:0)+(key==="m"?" MJ·kg⁻¹":" MJ·dm⁻³"), key==="m"?"nejvíc ze všech paliv":"stlačený na 70 MPa", key==="m"?"pos":"neg");
  vvRo("#enRo2", "Poměr vodík ku benzinu", fmt(h2/ben,2)+"×", key==="m"?"na kilogram vodík vyhrává":"na litr vodík výrazně prohrává", h2>ben?"pos":"neg");
  vvRo("#enRo3", "Poměr vodík ku akumulátoru", fmt(h2/PALIVA[7][key],0)+"×", "proto se s&nbsp;vodíkem počítá tam, kde baterie nestačí", "pos");
  $("#enNote").innerHTML = key==="m"
    ? "Na kilogram je vodík <b>nejlepší palivo, jaké existuje</b> — skoro třikrát lepší než benzin a&nbsp;stokrát lepší než dnešní akumulátor. Přepněte na litry a&nbsp;uvidíte druhou stranu mince."
    : "Na litr je i&nbsp;stlačený vodík <b>sedmkrát horší než benzin</b>. Nádrž na 5 kg vodíku při 70 MPa má objem přes 120 litrů. Přesně v&nbsp;tomhle rozporu je celý problém vodíkové dopravy.";
}
function initEn(){
  $$("#enMode button").forEach(function(b){
    b.addEventListener("click", function(){
      enState.m = b.dataset.v;
      $$("#enMode button").forEach(function(x){ x.setAttribute("aria-pressed", x.dataset.v===enState.m); });
      drawEn();
    });
  });
  drawEn();
}
