/* ============================================================
   11 · KAPITOLA 8 — geometrie molekuly H₂O₂
   ============================================================ */
var pxState = {d:112};
var PX_C1 = 11.56, PX_C2 = 7.885, PX_C0 = 10.005;   /* kJ·mol⁻¹, schematická torzní křivka */
function pxE(deg){
  var r = deg*Math.PI/180;
  return PX_C1*Math.cos(r) + PX_C2*Math.cos(2*r) + PX_C0;
}
function drawPx(){
  var d = pxState.d, E = pxE(d);
  var W=760, H=280, s="";
  /* --- Newmanova projekce vlevo --- */
  var cx=180, cy=140, R0=72;
  s += '<circle cx="'+cx+'" cy="'+cy+'" r="'+R0+'" style="fill:var(--surface-2);stroke:var(--line-strong);stroke-width:1.8"/>';
  /* zadní O–H (natočený o d) */
  var a2 = (-90 + d)*Math.PI/180;
  var bx = cx + R0*Math.cos(a2), by = cy + R0*Math.sin(a2);
  var bx2 = cx + (R0+54)*Math.cos(a2), by2 = cy + (R0+54)*Math.sin(a2);
  s += line(bx, by, bx2, by2, {c:"var(--ink-3)", w:3, cap:"round"});
  s += '<circle cx="'+bx2+'" cy="'+by2+'" r="12" style="fill:var(--ink-3)"/>';
  s += txt(bx2, by2+4, "H", {anchor:"middle", size:11, w:700, fill:"var(--paper)"});
  /* přední O–H (nahoru) */
  s += line(cx, cy, cx, cy-(R0+34), {c:"var(--accent)", w:3.4, cap:"round"});
  s += '<circle cx="'+cx+'" cy="'+(cy-R0-34)+'" r="12" style="fill:var(--accent)"/>';
  s += txt(cx, cy-R0-30, "H", {anchor:"middle", size:11, w:700, fill:"var(--accent-ink)"});
  /* atomy kyslíku */
  s += '<circle cx="'+cx+'" cy="'+cy+'" r="17" style="fill:var(--cat1)"/>';
  s += txt(cx, cy+6, "O", {anchor:"middle", size:14, w:700, fill:"var(--paper)"});
  /* oblouk torzního úhlu */
  var sweep = d>180 ? 1 : 0;
  var ax = cx + 40*Math.cos(-Math.PI/2), ay = cy + 40*Math.sin(-Math.PI/2);
  var bx3 = cx + 40*Math.cos(a2), by3 = cy + 40*Math.sin(a2);
  s += '<path d="M '+ax+' '+ay+' A 40 40 0 '+sweep+' 1 '+bx3+' '+by3+'" style="fill:none;stroke:var(--endo);stroke-width:2"/>';
  s += txt(cx+18, cy-46, fmt(d,0)+"°", {size:13, w:700, fill:"var(--endo)", mono:true});
  s += txt(8, cy+R0+34, "pohled podél vazby O–O", {size:11.5, w:600, fill:"var(--ink-3)"});
  s += txt(8, cy+R0+54, "přední O–H barevně, zadní šedě", {size:10.5, fill:"var(--ink-3)"});
  /* --- torzní křivka vpravo --- */
  var L=390, R=730, T0=40, B=200;
  var X = function(v){ return L + v/180*(R-L); };
  var Y = function(v){ return B - v/34*(B-T0); };
  for(var e=0; e<=30; e+=10){
    s += line(L, Y(e), R, Y(e), {c:"var(--line)", w:1});
    s += txt(L-8, Y(e)+4, String(e), {anchor:"end", size:10.5, fill:"var(--ink-3)", mono:true});
  }
  for(var g=0; g<=180; g+=45){
    s += line(X(g), T0, X(g), B, {c:"var(--line)", w:1});
    s += txt(X(g), B+22, String(g)+"°", {anchor:"middle", size:10.5, fill:"var(--ink-3)", mono:true});
  }
  var pts = [];
  for(var u=0; u<=180; u+=2) pts.push(X(u)+","+Y(Math.min(34, pxE(u))));
  s += '<polyline points="'+pts.join(" ")+'" style="fill:none;stroke:var(--accent);stroke-width:2.4"/>';
  s += '<circle cx="'+X(111.5)+'" cy="'+Y(pxE(111.5))+'" r="5" style="fill:var(--ok)"/>';
  s += txt(X(111.5), Y(pxE(111.5))-14, "111,5° (plyn)", {anchor:"middle", size:10.5, w:700, fill:"var(--ok)", mono:true});
  s += line(X(90.2), T0, X(90.2), B, {c:"var(--cat2)", w:1.3, dash:"4 4"});
  s += txt(X(90.2)-6, T0+14, "90,2° (krystal)", {anchor:"end", size:10.5, w:600, fill:"var(--cat2)"});
  s += '<circle cx="'+X(d)+'" cy="'+Y(Math.min(34,E))+'" r="6.5" style="fill:var(--accent);stroke:var(--surface);stroke-width:2.5"/>';
  s += txt((L+R)/2, B+40, "torzní úhel H–O–O–H", {anchor:"middle", size:11.5, w:600, fill:"var(--ink-3)"});
  s += txt(L, T0-14, "relativní energie [kJ·mol⁻¹] — schematicky", {size:10.5, fill:"var(--ink-3)"});
  $("#pxWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Geometrie molekuly peroxidu vodíku"');
  $("#pxDV").textContent = fmt(d,0)+"°";
  var pop = d<25 ? "cis uspořádání — obě skupiny O–H na téže straně, silné odpuzování volných párů"
          : (d>155 ? "trans uspořádání — skupiny naproti sobě, energie mírně vyšší než v minimu"
          : (Math.abs(d-111.5)<12 ? "blízko rovnovážné hodnoty v plynné fázi" : "mezipoloha, molekula se v tomto úhlu nezdržuje"));
  vvRo("#pxRo1", "Nastavený torzní úhel", fmt(d,0)+"°", pop, Math.abs(d-111.5)<12?"pos":"");
  vvRo("#pxRo2", "Bariéra do cis polohy", "asi 29 kJ·mol⁻¹", "úhel 0° — nejnevýhodnější", "neg");
  vvRo("#pxRo3", "Bariéra do trans polohy", "asi 5 kJ·mol⁻¹", "úhel 180° — rotace je skoro volná", "");
  $("#pxNote").innerHTML = (d<25 || d>155)
    ? "Rovinné uspořádání je energeticky nevýhodné. Molekula se mu vyhýbá a&nbsp;usadí se v&nbsp;úhlu kolem <b>111,5°</b> (plyn) nebo <b>90,2°</b> (krystal, kde ji stlačí vodíkové můstky k&nbsp;sousedům)."
    : "Molekula H₂O₂ nemá jednu pevnou geometrii — vnitřní rotace kolem vazby O–O je poměrně volná a&nbsp;okolí ji dokáže ohnout. Zkuste nastavit 0° a&nbsp;180° a&nbsp;porovnat, o&nbsp;kolik energie výš to leží.";
}
function initPx(){
  $("#pxD").addEventListener("input", function(){ pxState.d = +this.value; drawPx(); });
  drawPx();
}

/* --- redoxní role peroxidu ------------------------------------------- */
var prState = {id:"ki", f:"all"};
function prFind(id){ for(var i=0;i<PEROX.length;i++){ if(PEROX[i].id===id) return PEROX[i]; } return PEROX[0]; }
function prList(){ return PEROX.filter(function(p){ return prState.f==="all" || p.role===prState.f || (prState.f!=="all" && p.role==="dis"); }); }
function prFill(){
  var L = prList();
  if(L.length && !L.some(function(p){ return p.id===prState.id; })) prState.id = L[0].id;
  $("#prSel").innerHTML = L.map(function(p){
    return '<option value="'+p.id+'"'+(p.id===prState.id?' selected':'')+'>'+p.p+'</option>';
  }).join("");
}
function drawPr(){
  var p = prFind(prState.id);
  var W=760, H=250, s="";
  var L=170, R=590, Y=126;
  s += line(L, Y, R, Y, {c:"var(--line-strong)", w:2});
  [["−II", L, "voda"], ["−I", (L+R)/2, "peroxid"], ["0", R, "kyslík O₂"]].forEach(function(m){
    s += line(m[1], Y-9, m[1], Y+9, {c:"var(--line-strong)", w:2});
    s += txt(m[1], Y+32, m[0], {anchor:"middle", size:15, w:700, fill:"var(--ink-2)", mono:true});
    s += txt(m[1], Y+52, m[2], {anchor:"middle", size:11, fill:"var(--ink-3)"});
  });
  s += txt(W/2, 30, "oxidační číslo kyslíku", {anchor:"middle", size:11.5, w:600, fill:"var(--ink-3)", style:"letter-spacing:.1em"});
  var mid = (L+R)/2;
  function arrow(x1, x2, c, lab){
    s += line(x1, Y-42, x2, Y-42, {c:c, w:3, cap:"round"});
    var d = (x2>x1) ? 1 : -1;
    s += '<path d="M'+x2+' '+(Y-42)+' l'+(-11*d)+' -6 l0 12 z" style="fill:'+c+'"/>';
    s += line(x1, Y-42, x1, Y-8, {c:c, w:1.3, dash:"3 3"});
    s += line(x2, Y-42, x2, Y-8, {c:c, w:1.3, dash:"3 3"});
    s += txt((x1+x2)/2, Y-54, lab, {anchor:"middle", size:12, w:700, fill:c});
  }
  if(p.role==="ox"){
    arrow(mid, L, "var(--endo)", "peroxid se redukuje → OXIDUJE partnera");
    s += txt(W/2, 200, "H₂O₂ + 2 H⁺ + 2 e⁻ → 2 H₂O  ·  E° = +1,776 V", {anchor:"middle", size:12.5, w:600, fill:"var(--endo)", mono:true});
  } else if(p.role==="red"){
    arrow(mid, R, "var(--exo)", "peroxid se oxiduje → REDUKUJE partnera");
    s += txt(W/2, 200, "H₂O₂ → O₂ + 2 H⁺ + 2 e⁻  ·  dvojice O₂/H₂O₂ má E° = +0,695 V", {anchor:"middle", size:12.5, w:600, fill:"var(--exo)", mono:true});
  } else {
    arrow(mid, L, "var(--endo)", "polovina se redukuje");
    s += line(mid, Y+72, R, Y+72, {c:"var(--exo)", w:3, cap:"round"});
    s += '<path d="M'+R+' '+(Y+72)+' l-11 -6 l0 12 z" style="fill:var(--exo)"/>';
    s += txt((mid+R)/2, Y+90, "druhá polovina se oxiduje", {anchor:"middle", size:12, w:700, fill:"var(--exo)"});
    s += txt(W/2, 236, "DISPROPORCIONACE — látka reaguje sama se sebou", {anchor:"middle", size:12.5, w:700, fill:"var(--cat2)", style:"letter-spacing:.08em"});
  }
  s += txt(64, Y+6, "H₂O₂", {anchor:"middle", size:16, w:700, fill:"var(--accent)"});
  s += txt(672, Y+6, "+", {anchor:"middle", size:16, w:700, fill:"var(--ink-3)"});
  s += txt(672, Y+28, "partner", {anchor:"middle", size:10.5, fill:"var(--ink-3)"});
  $("#prWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Redoxní role peroxidu vodíku"');
  $("#prEq").innerHTML = '<span class="chem">'+p.eq+'</span>';
  $("#prIon").innerHTML = '<b>iontově:</b> <span class="chem">'+p.io+'</span>';
  vvRo("#prRo1", "Role peroxidu", p.role==="ox" ? "oxidační činidlo" : (p.role==="red" ? "redukční činidlo" : "obojí zároveň"), p.zm, p.role==="ox"?"pos":"neg");
  vvRo("#prRo2", "Rozhodující potenciál", p.e, p.role==="ox" ? "peroxid je silnější oxidovadlo" : (p.role==="red" ? "partner je silnější oxidovadlo" : "reaguje sám se sebou"), "");
  vvRo("#prRo3", "Partner", p.p.length>34 ? p.p.slice(0,32)+"…" : p.p, p.role==="dis" ? "stačí katalyzátor" : "", "");
  $("#prNote").innerHTML = p.poz;
}
function initPr(){
  prFill();
  $("#prSel").addEventListener("change", function(){ prState.id = this.value; drawPr(); });
  $$("#prFilt button").forEach(function(b){
    b.addEventListener("click", function(){
      prState.f = b.dataset.v;
      $$("#prFilt button").forEach(function(x){ x.setAttribute("aria-pressed", x.dataset.v===prState.f); });
      prFill(); drawPr();
    });
  });
  drawPr();
}

/* --- koncentrace peroxidu -------------------------------------------- */
var pkState = {w:3};
var PKRHO = [[0,0.998],[3,1.0095],[6,1.0204],[30,1.1122],[35,1.1327],[60,1.2364],[85,1.3520],[100,1.4500]];
function pkRho(w){
  for(var i=0;i<PKRHO.length-1;i++){
    if(w>=PKRHO[i][0] && w<=PKRHO[i+1][0]){
      var f = (w-PKRHO[i][0])/(PKRHO[i+1][0]-PKRHO[i][0]);
      return PKRHO[i][1] + f*(PKRHO[i+1][1]-PKRHO[i][1]);
    }
  }
  return PKRHO[PKRHO.length-1][1];
}
function drawPk(){
  var w = pkState.w, rho = pkRho(w);
  var c = w/100*rho*1000/MH2O2;      /* mol·dm⁻³ */
  var vol = c/2*VMOL;                /* dm³ O₂ na dm³ roztoku */
  var W=760, H=230, L=70, R=730, s="";
  var X = function(v){ return L + v/90*(R-L); };
  /* pásmo použití */
  var uses = [
    [1,5,"lékárna 3 %","var(--ok)"],
    [5,12,"kadeřnictví","var(--cat1)"],
    [12,40,"perhydrol 30 %","var(--warn)"],
    [40,70,"průmysl","var(--exo)"],
    [70,90,"raketové palivo","var(--bad)"]
  ];
  uses.forEach(function(u){
    s += rect(X(u[0]), 56, X(u[1])-X(u[0]), 46, {fill:u[3], r:5, style:"fill-opacity:.18"});
    if(X(u[1])-X(u[0]) > 62) s += txt((X(u[0])+X(u[1]))/2, 84, u[2], {anchor:"middle", size:11, w:700, fill:u[3]});
  });
  s += line(L, 118, R, 118, {c:"var(--line-strong)", w:1.6});
  for(var g=0; g<=90; g+=10){
    s += line(X(g), 118, X(g), 124, {c:"var(--line-strong)", w:1.2});
    s += txt(X(g), 142, String(g), {anchor:"middle", size:11, fill:"var(--ink-3)", mono:true});
  }
  s += txt((L+R)/2, 166, "hmotnostní zlomek H₂O₂ [%]", {anchor:"middle", size:11.5, w:600, fill:"var(--ink-3)", style:"letter-spacing:.06em"});
  s += line(X(w), 40, X(w), 130, {c:"var(--accent)", w:2.4});
  s += '<circle cx="'+X(w)+'" cy="118" r="7" style="fill:var(--accent);stroke:var(--surface);stroke-width:2.5"/>';
  var lbx = Math.max(8, Math.min(W-124, X(w)-58));
  s += rect(lbx, 14, 116, 24, {fill:"var(--accent)", r:6});
  s += txt(lbx+58, 31, fmt(w,0)+" % · "+fmt(vol,0)+" objemů", {anchor:"middle", size:11.5, w:700, fill:"var(--accent-ink)", mono:true});
  /* sloupec uvolněného kyslíku */
  var hmax = 60, hh = Math.min(hmax, vol/300*hmax);
  s += rect(L, 190, R-L, 20, {fill:"var(--surface-2)", r:5, stroke:"var(--line)", sw:1});
  s += rect(L, 190, (R-L)*Math.min(1, vol/300), 20, {fill:"var(--endo)", r:5, style:"fill-opacity:.75"});
  s += txt(L+6, 205, "kyslík uvolněný z&nbsp;1 dm³ roztoku: "+fmt(vol,1)+" dm³", {size:11.5, w:700, fill:"var(--ink)"});
  $("#pkWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Koncentrace peroxidu vodíku a jeho účinek"');
  $("#pkWV").textContent = fmt(w,0)+" %";
  var pouziti = w<5 ? "dezinfekce drobných ran, bělení vlasů" :
                (w<12 ? "odbarvování vlasů, bělení textilu" :
                (w<40 ? "laboratorní perhydrol — leptá pokožku" :
                (w<70 ? "bělení buničiny, výroba peroxosloučenin" : "monopropelant v raketové technice")));
  vvRo("#pkRo1", "Látková koncentrace", fmt(c,2)+" mol·dm⁻³", "hustota roztoku "+fmt(rho,4)+" g·cm⁻³", "");
  vvRo("#pkRo2", "Objemová procenta", fmt(vol,1), "dm³ O₂ z&nbsp;1 dm³ roztoku za n. p.", "");
  vvRo("#pkRo3", "Typické použití", pouziti, w>=40 ? "silně žíravý, hrozí samovolný rozklad" : "", w>=40?"neg":"pos");
  $("#pkEq").innerHTML = '<span class="q">c</span> = <span class="q">w</span>·ρ/<span class="q">M</span> = '+fmt(w/100,2)+' · '+fmt(rho*1000,0)+' / 34,01 = <b>'+fmt(c,2)+' mol·dm⁻³</b> &nbsp;→&nbsp; <span class="q">V</span>(O₂) = <span class="q">c</span>/2 · 22,41 = <b>'+fmt(vol,1)+' dm³</b>';
  $("#pkNote").innerHTML = w<=6
    ? "Běžný lékárenský roztok. Zapamatovatelný převod: <b>3&nbsp;% ≈ 10 objemů</b>. Na ráně zpění, protože ho vaše vlastní kataláza okamžitě rozloží."
    : (w<=40 ? "Perhydrol. Leptá pokožku a&nbsp;zanechává bílé skvrny. Uvolní přes sto objemů kyslíku, takže se nikdy neskladuje v&nbsp;uzavřené nádobě bez odvětrání."
    : "Vysoce koncentrovaný peroxid je silné oxidační činidlo a&nbsp;při styku s&nbsp;organickou látkou nebo katalyzátorem se rozkládá tak prudce, že se z&nbsp;něj stane raketový pohon.");
}
function initPk(){
  $("#pkW").addEventListener("input", function(){ pkState.w = +this.value; drawPk(); });
  drawPk();
}

/* ============================================================
   12 · MINI-GRAFY RYCHLOKURZU
   ============================================================ */
function drawMn1(){
  var W=740, H=166, L=90, R=690, Y=92, s="";
  var xmin=0.7, xmax=4.1;
  var X = function(v){ return L + (v-xmin)/(xmax-xmin)*(R-L); };
  s += rect(X(0.7), Y-24, X(1.25)-X(0.7), 48, {fill:"var(--exo)", r:7, style:"fill-opacity:.15"});
  s += rect(X(1.85), Y-24, X(4.1)-X(1.85), 48, {fill:"var(--endo)", r:7, style:"fill-opacity:.15"});
  s += line(L, Y+24, R, Y+24, {c:"var(--line-strong)", w:1.4});
  [["K",0.82],["Na",0.93],["Ca",1.00],["Mg",1.31],["Al",1.61],["B",2.04],["C",2.55],["N",3.04],["Cl",3.16],["O",3.44],["F",3.98]].forEach(function(e,ei){
    s += '<circle cx="'+X(e[1])+'" cy="'+Y+'" r="5" style="fill:var(--ink-3)"/>';
    s += txt(X(e[1]), Y-(ei%2?14:30), e[0], {anchor:"middle", size:10, fill:"var(--ink-3)", mono:true});
  });
  s += line(X(2.20), Y-38, X(2.20), Y+30, {c:"var(--accent)", w:2.4});
  s += '<circle cx="'+X(2.20)+'" cy="'+Y+'" r="9" style="fill:var(--accent)"/>';
  s += txt(X(2.20), Y-48, "H = 2,20", {anchor:"middle", size:12, w:700, fill:"var(--accent)", mono:true});
  s += txt(X(0.97), Y+44, "hydrid H⁻ (ox. číslo −I)", {anchor:"middle", size:11, w:700, fill:"var(--exo)"});
  s += txt(X(3.0), Y+44, "kovalentní vazba, vodík má +I", {anchor:"middle", size:11, w:700, fill:"var(--endo)"});
  s += txt(X(1.55), Y+44, "přechod", {anchor:"middle", size:10.5, w:600, fill:"var(--cat3)"});
  s += txt(L, 22, "Elektronegativita partnera rozhoduje o všem", {size:12, w:700, fill:"var(--ink-3)", style:"letter-spacing:.06em"});
  $("#mn1Wrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Elektronegativita a typ vazby vodíku"');
}
function drawMn2(){
  var W=740, H=212, cw=36, ch=22, x0=30, y0=44, s="";
  HMAP.forEach(function(e){
    var T = HMAPT[e[3]] || HMAPT.x;
    var x = x0 + (e[1]-1)*cw + 2, y = y0 + (e[2]-1)*ch + 2;
    s += rect(x, y, cw-4, ch-4, {fill:T.c, r:3, style:"fill-opacity:.30"});
    s += txt(x+(cw-4)/2, y+(ch-4)/2+4, e[0], {anchor:"middle", size:9, w:600, fill:T.c});
  });
  s += txt(x0, 26, "Typ hydridu podle polohy v tabulce", {size:12, w:700, fill:"var(--ink-3)", style:"letter-spacing:.06em"});
  var yb = y0 + 6*ch + 12;
  s += rect(x0, yb, 60, 14, {fill:"var(--exo)", r:3, style:"fill-opacity:.3"});
  s += txt(x0+70, yb+11, "iontové", {size:10.5, w:600, fill:"var(--exo)"});
  s += rect(x0+150, yb, 60, 14, {fill:"var(--cat2)", r:3, style:"fill-opacity:.3"});
  s += txt(x0+220, yb+11, "kovové", {size:10.5, w:600, fill:"var(--cat2)"});
  s += rect(x0+300, yb, 60, 14, {fill:"var(--endo)", r:3, style:"fill-opacity:.3"});
  s += txt(x0+370, yb+11, "kovalentní", {size:10.5, w:600, fill:"var(--endo)"});
  s += rect(x0+460, yb, 60, 14, {fill:"var(--cat3)", r:3, style:"fill-opacity:.3"});
  s += txt(x0+530, yb+11, "přechodná oblast", {size:10.5, w:600, fill:"var(--cat3)"});
  $("#mn2Wrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Mapa typů hydridů"');
}
function drawMn3(){
  var W=740, H=190, L=70, R=690, T0=36, B=140, s="";
  var pmin=1.7, pmax=5.3, tmin=-180, tmax=120;
  var X = function(v){ return L + (v-pmin)/(pmax-pmin)*(R-L); };
  var Y = function(v){ return B - (v-tmin)/(tmax-tmin)*(B-T0); };
  for(var t=-180; t<=120; t+=100){
    s += line(L, Y(t), R, Y(t), {c:"var(--line)", w:1});
    s += txt(L-8, Y(t)+4, String(t), {anchor:"end", size:10, fill:"var(--ink-3)", mono:true});
  }
  var mnL = [];
  ["g14","g15","g16","g17"].forEach(function(k){
    var G = BODY[k], on = (k==="g16");
    var pts = G.d.map(function(d){ return X(d[1])+","+Y(d[2]); });
    s += '<polyline points="'+pts.join(" ")+'" style="fill:none;stroke:'+G.c+';stroke-width:'+(on?2.6:1.4)+';stroke-opacity:'+(on?1:.45)+'"/>';
    G.d.forEach(function(d){
      s += '<circle cx="'+X(d[1])+'" cy="'+Y(d[2])+'" r="'+(on?4.5:2.8)+'" style="fill:'+G.c+';fill-opacity:'+(on?1:.45)+'"/>';
    });
    mnL.push({y:Y(G.d[3][2])+4, t:G.d[3][0], c:G.c, on:on});
  });
  mnL.sort(function(a,b){ return a.y-b.y; });
  for(var q=1; q<mnL.length; q++){ if(mnL[q].y-mnL[q-1].y < 14) mnL[q].y = mnL[q-1].y+14; }
  mnL.forEach(function(o){ s += txt(X(5)+8, o.y, o.t, {size:10, w:600, fill:o.c, style:o.on?"":"opacity:.5"}); });
  s += txt(X(2)+8, Y(100)+4, "H₂O 100 °C", {size:11, w:700, fill:"var(--accent)"});
  s += '<circle cx="'+X(2)+'" cy="'+Y(100)+'" r="6" style="fill:var(--accent)"/>';
  s += txt(X(2)+8, Y(-161.5)+4, "CH₄ −161,5 °C", {size:10, fill:"var(--ink-3)"});
  s += txt(L, 22, "Teploty varu hydridů — voda z řady vyskočí o víc než 170 °C", {size:12, w:700, fill:"var(--ink-3)", style:"letter-spacing:.06em"});
  s += txt((L+R)/2, B+34, "perioda prvku ve skupině →", {anchor:"middle", size:11, fill:"var(--ink-3)"});
  $("#mn3Wrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Teploty varu hydridů, mini graf"');
}
