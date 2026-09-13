/* ============================================================
   9 · KAPITOLA 6 — molekula vody, můstky, led, kapalina
   ============================================================ */
var wmState = {v:"mol"};
function wmMolecule(cx, cy, sc, ang, col, lab){
  /* jednoduchá lomená molekula vody; ang = natočení osy ve stupních */
  var a = ang*Math.PI/180, half = 104.5/2*Math.PI/180, d = 46*sc;
  var h1x = cx + d*Math.cos(a-half), h1y = cy + d*Math.sin(a-half);
  var h2x = cx + d*Math.cos(a+half), h2y = cy + d*Math.sin(a+half);
  var s = "";
  s += line(cx, cy, h1x, h1y, {c:"var(--line-strong)", w:3*sc, cap:"round"});
  s += line(cx, cy, h2x, h2y, {c:"var(--line-strong)", w:3*sc, cap:"round"});
  s += '<circle cx="'+cx+'" cy="'+cy+'" r="'+(19*sc)+'" style="fill:'+col+'"/>';
  s += txt(cx, cy+6*sc, "O", {anchor:"middle", size:15*sc, w:700, fill:"var(--paper)"});
  [[h1x,h1y],[h2x,h2y]].forEach(function(h){
    s += '<circle cx="'+h[0]+'" cy="'+h[1]+'" r="'+(11*sc)+'" style="fill:var(--accent)"/>';
    s += txt(h[0], h[1]+4*sc, "H", {anchor:"middle", size:11*sc, w:700, fill:"var(--accent-ink)"});
  });
  if(lab) s += txt(cx - 44*sc*Math.cos(a), cy - 44*sc*Math.sin(a) + 4, lab, {anchor:"middle", size:11, fill:"var(--ink-3)"});
  return {s:s, h1:[h1x,h1y], h2:[h2x,h2y]};
}
function drawWm(){
  var W=760, H=316, s="", v=wmState.v;
  if(v==="mol"){
    var m = wmMolecule(330, 150, 1.7, -90, "var(--cat1)", "");
    s += m.s;
    /* volné páry */
    s += '<ellipse cx="'+300+'" cy="'+208+'" rx="17" ry="11" style="fill:var(--cat2);fill-opacity:.35"/>';
    s += '<ellipse cx="'+360+'" cy="'+208+'" rx="17" ry="11" style="fill:var(--cat2);fill-opacity:.35"/>';
    s += txt(330, 238, "dva volné elektronové páry", {anchor:"middle", size:11.5, w:600, fill:"var(--cat2)"});
    /* úhel */
    s += '<path d="M 306 118 A 34 34 0 0 1 354 118" style="fill:none;stroke:var(--endo);stroke-width:1.8"/>';
    s += txt(330, 108, "104,5°", {anchor:"middle", size:13, w:700, fill:"var(--endo)", mono:true});
    s += txt(250, 74, "96 pm", {anchor:"middle", size:12, w:600, fill:"var(--ink-3)", mono:true});
    /* dipól */
    s += line(330, 150, 330, 246, {c:"var(--accent)", w:2.2, dash:"5 4"});
    s += txt(470, 96, "δ⁻ na kyslíku, δ⁺ na obou vodících", {size:12.5, w:600, fill:"var(--ink-2)"});
    s += txt(470, 122, "vektorový součet dipólů není nulový", {size:12.5, fill:"var(--ink-3)"});
    s += txt(470, 148, "μ = 1,85 D — velký permanentní dipól", {size:12.5, w:700, fill:"var(--accent)"});
    s += txt(470, 180, "kdyby byla molekula lineární,", {size:12, fill:"var(--ink-3)"});
    s += txt(470, 202, "dipóly by se vyrušily a voda by byla nepolární", {size:12, fill:"var(--ink-3)"});
  } else if(v==="dim"){
    var a1 = wmMolecule(220, 140, 1.4, -60, "var(--cat1)", "donor");
    var a2 = wmMolecule(520, 190, 1.4, 170, "var(--cat1)", "akceptor");
    s += a1.s + a2.s;
    s += line(a1.h2[0], a1.h2[1], 520, 190, {c:"var(--accent)", w:2.6, dash:"6 5", cap:"round"});
    s += txt(390, 106, "vodíkový můstek O–H···O", {anchor:"middle", size:13, w:700, fill:"var(--accent)"});
    s += txt(390, 128, "energie asi 20 kJ·mol⁻¹", {anchor:"middle", size:11.5, fill:"var(--ink-3)", mono:true});
    s += txt(390, 272, "vodík s&nbsp;δ⁺ míří přesně na volný elektronový pár sousedního kyslíku", {anchor:"middle", size:12, fill:"var(--ink-3)"});
    s += txt(390, 292, "je to desetkrát slabší než kovalentní vazba, ale desetkrát silnější než van der Waals", {anchor:"middle", size:11.5, fill:"var(--ink-3)"});
  } else if(v==="led"){
    /* tetraedrická síť */
    var cx=330, cy=150, R0=92;
    var nb = [[0,-1],[0.94,0.34],[-0.94,0.34],[0,0.62]];
    s += '<circle cx="'+cx+'" cy="'+cy+'" r="20" style="fill:var(--cat1)"/>';
    s += txt(cx, cy+6, "O", {anchor:"middle", size:15, w:700, fill:"var(--paper)"});
    nb.forEach(function(d, i){
      var nx = cx + R0*d[0], ny = cy + R0*d[1];
      s += line(cx, cy, nx, ny, {c:"var(--accent)", w:2.2, dash:"6 5"});
      s += '<circle cx="'+nx+'" cy="'+ny+'" r="16" style="fill:var(--cat1);fill-opacity:.8"/>';
      s += txt(nx, ny+5, "O", {anchor:"middle", size:12, w:700, fill:"var(--paper)"});
      var mx = cx + (nx-cx)*0.36, my = cy + (ny-cy)*0.36;
      s += '<circle cx="'+mx+'" cy="'+my+'" r="8" style="fill:var(--accent)"/>';
    });
    s += txt(cx, cy-116, "úhel O···O···O = 109,5°", {anchor:"middle", size:12, w:700, fill:"var(--endo)", mono:true});
    s += txt(560, 92, "vzdálenost O···O = 276 pm", {size:12.5, w:600, fill:"var(--ink-2)", mono:true});
    s += txt(560, 118, "kovalentní O–H = 100 pm", {size:12, fill:"var(--ink-3)", mono:true});
    s += txt(560, 142, "můstek H···O = 176 pm", {size:12, fill:"var(--ink-3)", mono:true});
    s += txt(560, 176, "4 můstky na molekulu", {size:13, w:700, fill:"var(--accent)"});
    s += txt(560, 200, "pravidelná, ale velmi prostorná síť", {size:11.5, fill:"var(--ink-3)"});
    s += txt(560, 224, "hustota 916,7 kg·m⁻³ — led plave", {size:12, w:700, fill:"var(--endo)"});
  } else {
    /* kapalina — neuspořádané shluky */
    var seedx = [120,205,300,395,480,565,650,160,250,345,440,530,620,200,290,385,475,570];
    var seedy = [90,130,80,120,86,132,96,190,168,196,164,200,176,248,236,254,238,246];
    for(var i=0;i<seedx.length;i++){
      var mm = wmMolecule(seedx[i], seedy[i], 0.62, (i*47)%360, "var(--cat1)", "");
      s += mm.s;
    }
    for(var j=0;j<seedx.length-1;j++){
      if(j%3===2) continue;
      s += line(seedx[j], seedy[j], seedx[j+1], seedy[j+1], {c:"var(--accent)", w:1.4, dash:"4 4"});
    }
    s += txt(W/2, 306, "průměrně 3,4 až 3,6 můstku na molekulu · životnost jednoho můstku kolem 1 pikosekundy", {anchor:"middle", size:12, w:600, fill:"var(--ink-3)"});
  }
  $("#wmWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Molekula vody a vodíkové můstky"');
  var R = {
    mol:[["Úhel H–O–H","104,5°","tetraedr by měl 109,5°"],["Délka vazby O–H","96 pm","polární kovalentní"],["Dipólový moment","1,85 D","molekula je lomená"]],
    dim:[["Energie můstku","asi 20 kJ·mol⁻¹","O–H má 463 kJ·mol⁻¹"],["Donor","vodík s&nbsp;δ⁺","vázaný na F, O nebo N"],["Akceptor","volný pár","opět na F, O nebo N"]],
    led:[["Můstků na molekulu","4","pravidelný tetraedr"],["Vzdálenost O···O","276 pm","z&nbsp;toho 100 + 176 pm"],["Hustota ledu","916,7 kg·m⁻³","o&nbsp;8,3&nbsp;% méně než voda"]],
    kap:[["Můstků na molekulu","asi 3,5","neuspořádaně a&nbsp;proměnlivě"],["Životnost můstku","asi 1 ps","síť se neustále přeskupuje"],["Hustota při 4 °C","999,97 kg·m⁻³","maximum ze všech teplot"]]
  }[v];
  ["#wmRo1","#wmRo2","#wmRo3"].forEach(function(id, i){ vvRo(id, R[i][0], R[i][1], R[i][2], ""); });
  $("#wmNote").innerHTML = {
    mol:"Molekula je lomená, protože kyslík nese dva volné elektronové páry, které vazby stlačují k&nbsp;sobě. Právě lomený tvar dělá z&nbsp;vody dipól — a&nbsp;dipól je podmínkou všeho ostatního.",
    dim:"Vodíkový můstek potřebuje současně <b>donora</b> (vodík na F, O nebo N) a&nbsp;<b>akceptora</b> (volný elektronový pár). Voda má obojí dvakrát, a&nbsp;proto zvládne čtyři můstky najednou.",
    led:"V&nbsp;ledu je uspořádání pravidelné a&nbsp;maximalizuje počet můstků — za cenu velkých dutin. Odtud plyne, že led má <b>menší hustotu než kapalná voda</b>.",
    kap:"V&nbsp;kapalině pravidelná mřížka není. Molekuly se pořád snaží mít co nejvíc můstků, ale tepelný pohyb síť neustále rozbíjí. Molekuly se proto srovnají hustěji než v&nbsp;ledu."
  }[v];
}
function initWm(){
  $$("#wmSel button").forEach(function(b){
    b.addEventListener("click", function(){
      wmState.v = b.dataset.v;
      $$("#wmSel button").forEach(function(x){ x.setAttribute("aria-pressed", x.dataset.v===wmState.v); });
      drawWm();
    });
  });
  drawWm();
}

/* --- anomálie hustoty ------------------------------------------------- */
var dnState = {t:20};
function dnRho(t){
  for(var i=0;i<HUST.length-1;i++){
    if(t>=HUST[i][0] && t<=HUST[i+1][0]){
      var f = (t-HUST[i][0])/(HUST[i+1][0]-HUST[i][0]);
      return HUST[i][1] + f*(HUST[i+1][1]-HUST[i][1]);
    }
  }
  return t<HUST[0][0] ? HUST[0][1] : HUST[HUST.length-1][1];
}
function drawDn(){
  var t = dnState.t, rho = dnRho(t);
  var W=760, H=300, L=72, R=730, T0=26, B=236;
  var tmin=-12, tmax=102, rmin=910, rmax=1004;
  var X = function(v){ return L + (v-tmin)/(tmax-tmin)*(R-L); };
  var Y = function(v){ return B - (v-rmin)/(rmax-rmin)*(B-T0); };
  var s = "";
  for(var r=910; r<=1000; r+=15){
    s += line(L, Y(r), R, Y(r), {c:"var(--line)", w:1});
    s += txt(L-8, Y(r)+4, String(r), {anchor:"end", size:11, fill:"var(--ink-3)", mono:true});
  }
  for(var v=0; v<=100; v+=20){
    s += line(X(v), T0, X(v), B, {c:"var(--line)", w:1});
    s += txt(X(v), B+20, String(v), {anchor:"middle", size:11, fill:"var(--ink-3)", mono:true});
  }
  /* led */
  s += line(X(-12), Y(HUSTLED), X(0), Y(HUSTLED), {c:"var(--endo)", w:3, cap:"round"});
  s += txt(X(-6), Y(HUSTLED)-10, "led 916,7", {anchor:"middle", size:11, w:700, fill:"var(--endo)", mono:true});
  /* křivka */
  var pts = [];
  for(var u=-10; u<=100; u+=0.5) pts.push(X(u)+","+Y(dnRho(u)));
  s += '<polyline points="'+pts.join(" ")+'" style="fill:none;stroke:var(--accent);stroke-width:2.6"/>';
  /* maximum */
  s += line(X(3.98), T0, X(3.98), B, {c:"var(--bad)", w:1.6, dash:"5 4"});
  s += '<circle cx="'+X(3.98)+'" cy="'+Y(999.97)+'" r="6" style="fill:var(--bad)"/>';
  s += txt(X(3.98)+8, Y(999.97)-14, "maximum: 3,98 °C · 999,97 kg·m⁻³", {size:11.5, w:700, fill:"var(--bad)"});
  /* výřez */
  s += rect(X(38), T0+8, 200, 62, {fill:"var(--surface-2)", r:9, stroke:"var(--line)", sw:1});
  s += txt(X(38)+100, T0+30, "pod 4 °C hustota KLESÁ", {anchor:"middle", size:11.5, w:700, fill:"var(--bad)"});
  s += txt(X(38)+100, T0+50, "to je ta anomálie", {anchor:"middle", size:11, fill:"var(--ink-3)"});
  /* ukazatel */
  s += line(X(t), T0, X(t), B, {c:"var(--ink)", w:1.2, dash:"4 4"});
  var rr = (t<0) ? rho : rho;
  s += '<circle cx="'+X(t)+'" cy="'+Y(rr)+'" r="7" style="fill:var(--accent);stroke:var(--surface);stroke-width:2.5"/>';
  s += txt((L+R)/2, B+42, "teplota [°C]", {anchor:"middle", size:11.5, w:600, fill:"var(--ink-3)", style:"letter-spacing:.08em"});
  s += txt(18, (T0+B)/2, "hustota [kg·m⁻³]", {anchor:"middle", size:11.5, w:600, fill:"var(--ink-3)", style:"writing-mode:sideways-lr"});
  $("#dnWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Hustota vody v závislosti na teplotě"');
  $("#dnTV").textContent = fmt(t,0)+" °C";
  vvRo("#dnRo1", "Hustota vody", fmt(rho,2)+" kg·m⁻³", t<0 ? "podchlazená kapalina" : "kapalná voda", "");
  vvRo("#dnRo2", "Odchylka od maxima", fmt(999.97-rho,2)+" kg·m⁻³", "maximum je při 3,98 °C", rho>999.5?"pos":"neg");
  vvRo("#dnRo3", "Objem 1 kg vody", fmt(1000/rho*1000,1)+" cm³", "led má 1091 cm³ — o&nbsp;9,1&nbsp;% víc", "");
  $("#dnNote").innerHTML = (t<=8)
    ? "Jste v&nbsp;oblasti anomálie. Do 3,98&nbsp;°C převažuje rozpad zbytků prostorné ledové struktury (hustota <b>roste</b>), nad ní tepelná roztažnost (hustota <b>klesá</b>). Průsečík obou trendů je maximum."
    : "Nad 4&nbsp;°C se voda chová jako každá jiná kapalina: zahřívá se, molekuly se od sebe odtlačují a&nbsp;hustota klesá. Sjeďte pod 4&nbsp;°C a&nbsp;uvidíte, kde se to zlomí.";
}
function initDn(){
  $("#dnT").addEventListener("input", function(){ dnState.t = +this.value; drawDn(); });
  drawDn();
}

/* --- ohřev a odpaření vody ------------------------------------------- */
var ohState = {m:10, t:20};
function drawOh(){
  var m = ohState.m/10, t0 = ohState.t;    /* m v kg */
  var Q1 = t0<0 ? m*2.09*(0-t0) : 0;
  var Q2 = t0<0 ? m*334 : 0;
  var Q3 = m*4.18*(100 - Math.max(0,t0));
  var Q4 = m*2257;
  var tot = Q1+Q2+Q3+Q4;
  var W=760, H=270, L=70, R=730, T0=40, B=200;
  var s = "";
  var stages = [
    {q:Q1, c:"var(--cat2)", nm:"ohřev ledu z&nbsp;"+fmt(t0,0)+" °C na 0 °C"},
    {q:Q2, c:"var(--endo)", nm:"tání při 0 °C"},
    {q:Q3, c:"var(--accent)", nm:"ohřev kapaliny na 100 °C"},
    {q:Q4, c:"var(--exo)", nm:"var při 100 °C"}
  ].filter(function(x){ return x.q > 0; });
  var acc = 0;
  stages.forEach(function(st){
    var x1 = L + acc/tot*(R-L), x2 = L + (acc+st.q)/tot*(R-L);
    s += rect(x1, T0, x2-x1, 62, {fill:st.c, r:0, style:"fill-opacity:.8"});
    if(x2-x1 > 60){
      s += txt((x1+x2)/2, T0+38, fmt(st.q,0)+" kJ", {anchor:"middle", size:13, w:700, fill:"var(--paper)", mono:true});
    }
    s += txt((x1+x2)/2, T0+82, fmt(st.q/tot*100,0)+" %", {anchor:"middle", size:11.5, w:700, fill:st.c, mono:true});
    acc += st.q;
  });
  s += rect(L, T0, R-L, 62, {fill:"none", r:0, stroke:"var(--line-strong)", sw:1.4});
  s += txt(L, T0-12, "rozdělení celkového tepla podle fází", {size:11.5, w:600, fill:"var(--ink-3)", style:"letter-spacing:.06em"});
  /* teplotní profil */
  var py = 250;
  s += txt(L, 148, "", {});
  var xs = L, seg = (R-L);
  var accum = 0;
  var pline = [];
  var tcur = t0;
  stages.forEach(function(st){
    var x1 = L + accum/tot*seg, x2 = L + (accum+st.q)/tot*seg;
    var tEnd = st.nm.indexOf("tání")===0 ? 0 : (st.nm.indexOf("var")===0 ? 100 : (st.nm.indexOf("ohřev ledu")===0 ? 0 : 100));
    pline.push(x1+","+(py - (tcur+20)/140*70));
    pline.push(x2+","+(py - (tEnd+20)/140*70));
    tcur = tEnd;
    accum += st.q;
  });
  s += '<polyline points="'+pline.join(" ")+'" style="fill:none;stroke:var(--ink-2);stroke-width:2.2"/>';
  s += txt(L-8, py - (0+20)/140*70 + 4, "0 °C", {anchor:"end", size:10.5, fill:"var(--ink-3)", mono:true});
  s += txt(L-8, py - (100+20)/140*70 + 4, "100 °C", {anchor:"end", size:10.5, fill:"var(--ink-3)", mono:true});
  s += txt((L+R)/2, py+26, "postup ohřevu — vodorovné úseky jsou skupenské přeměny při stálé teplotě", {anchor:"middle", size:11.5, fill:"var(--ink-3)"});
  $("#ohWrap").innerHTML = svg("0 0 "+W+" "+(H+30), s, 'aria-label="Energie potřebná k ohřevu a odpaření vody"');
  $("#ohMV").textContent = fmt(m,1)+" kg";
  $("#ohTV").textContent = fmt(t0,0)+" °C";
  vvRo("#ohRo1", "Ohřát na 100 °C", fmt(Q1+Q2+Q3,0)+" kJ", t0<0 ? "včetně roztátí ledu" : "měrná kapacita 4,18 kJ·kg⁻¹·K⁻¹", "");
  vvRo("#ohRo2", "Odpařit", fmt(Q4,0)+" kJ", "výparné teplo 2257 kJ·kg⁻¹", "neg");
  vvRo("#ohRo3", "Poměr var ku ohřevu", fmt(Q4/(Q1+Q2+Q3),1)+"×", "odpařit stojí mnohonásobně víc", "");
  $("#ohEq").innerHTML = '<span class="q">Q</span> = <span class="q">m</span>·<span class="q">c</span>·Δ<span class="q">t</span> + <span class="q">m</span>·<span class="q">l</span><sub>v</sub> = '+fmt(m,1)+' · 4,18 · '+fmt(100-Math.max(0,t0),0)+' + '+fmt(m,1)+' · 2257 = <b>'+fmt(tot,0)+' kJ</b>' + (t0<0 ? ' &nbsp;(plus ohřev a&nbsp;tání ledu)' : '');
}
function initOh(){
  $("#ohM").addEventListener("input", function(){ ohState.m = +this.value; drawOh(); });
  $("#ohT").addEventListener("input", function(){ ohState.t = +this.value; drawOh(); });
  drawOh();
}

/* ============================================================
   10 · KAPITOLA 7 — iontový součin vody
   ============================================================ */
var kwState = {t:25};
function kwPk(t){
  for(var i=0;i<KWTAB.length-1;i++){
    if(t>=KWTAB[i][0] && t<=KWTAB[i+1][0]){
      var f = (t-KWTAB[i][0])/(KWTAB[i+1][0]-KWTAB[i][0]);
      return KWTAB[i][1] + f*(KWTAB[i+1][1]-KWTAB[i][1]);
    }
  }
  return t<0 ? KWTAB[0][1] : KWTAB[KWTAB.length-1][1];
}
function drawKw(){
  var t = kwState.t, pk = kwPk(t), ph = pk/2;
  var W=760, H=280, L=70, R=730, T0=26, B=222;
  var X = function(v){ return L + v/100*(R-L); };
  var Y = function(v){ return B - (v-12.0)/(15.2-12.0)*(B-T0); };
  var s = "";
  for(var v=12; v<=15; v+=0.5){
    s += line(L, Y(v), R, Y(v), {c:"var(--line)", w:1});
    s += txt(L-8, Y(v)+4, fmt(v,1), {anchor:"end", size:11, fill:"var(--ink-3)", mono:true});
  }
  for(var u=0; u<=100; u+=20){
    s += line(X(u), T0, X(u), B, {c:"var(--line)", w:1});
    s += txt(X(u), B+20, String(u), {anchor:"middle", size:11, fill:"var(--ink-3)", mono:true});
  }
  var pts = [];
  for(var w=0; w<=100; w+=1) pts.push(X(w)+","+Y(kwPk(w)));
  s += '<polyline points="'+pts.join(" ")+'" style="fill:none;stroke:var(--accent);stroke-width:2.6"/>';
  s += line(L, Y(14), R, Y(14), {c:"var(--endo)", w:1.4, dash:"5 4"});
  s += txt(R-4, Y(14)-8, "pK = 14,00 při 25 °C", {anchor:"end", size:11, w:600, fill:"var(--endo)"});
  s += line(X(t), T0, X(t), B, {c:"var(--ink)", w:1.2, dash:"4 4"});
  s += '<circle cx="'+X(t)+'" cy="'+Y(pk)+'" r="7" style="fill:var(--accent);stroke:var(--surface);stroke-width:2.5"/>';
  s += rect(X(t)+(t>72?-124:10), Y(pk)-27, 114, 21, {fill:"var(--ink)", r:5});
  s += txt(X(t)+(t>72?-67:67), Y(pk)-12, "pKv = "+fmt(pk,2), {anchor:"middle", size:11.5, w:600, fill:"var(--paper)", mono:true});
  s += txt((L+R)/2, B+42, "teplota [°C]", {anchor:"middle", size:11.5, w:600, fill:"var(--ink-3)", style:"letter-spacing:.08em"});
  s += txt(18, (T0+B)/2, "pKv", {anchor:"middle", size:11.5, w:600, fill:"var(--ink-3)", style:"writing-mode:sideways-lr"});
  $("#kwWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Iontový součin vody v závislosti na teplotě"');
  $("#kwTV").textContent = fmt(t,0)+" °C";
  var kv = Math.pow(10,-pk);
  vvRo("#kwRo1", "Iontový součin", kv.toExponential(2).replace(".",",").replace("e","·10^"), "pKv = "+fmt(pk,2), "");
  vvRo("#kwRo2", "Neutrální pH", fmt(ph,2), "tady platí c(H₃O⁺) = c(OH⁻)", Math.abs(ph-7)<0.05?"pos":"neg");
  vvRo("#kwRo3", "c(H₃O⁺) v&nbsp;neutrální vodě", Math.pow(10,-ph).toExponential(2).replace(".",",").replace("e","·10^")+" mol·dm⁻³", "roste s&nbsp;teplotou", "");
  $("#kwEq").innerHTML = '<span class="q">K</span><sub>v</sub> = <span class="q">c</span>(H₃O⁺) · <span class="q">c</span>(OH⁻) = 10<sup>−'+fmt(pk,2)+'</sup> &nbsp;→&nbsp; v&nbsp;neutrální vodě je pH = pKv/2 = <b>'+fmt(ph,2)+'</b>';
  $("#kwNote").innerHTML = (Math.abs(t-25)<3)
    ? "Standardní podmínky. Tady a&nbsp;jen tady platí, že neutrální voda má pH právě 7,00."
    : "Při "+fmt(t,0)+"&nbsp;°C je neutrální pH <b>"+fmt(ph,2)+"</b>, a&nbsp;přesto je voda dokonale neutrální — koncentrace H₃O⁺ a&nbsp;OH⁻ jsou si pořád rovny. Autoionizace je endotermická, takže se zahříváním posouvá doprava.";
}
function initKw(){
  $("#kwT").addEventListener("input", function(){ kwState.t = +this.value; drawKw(); });
  drawKw();
}

/* --- kalkulačka tvrdosti --------------------------------------------- */
var tvState = {ca:60, mg:12, hc:70};
function drawTv(){
  var nCa = tvState.ca/MCA, nMg = tvState.mg/MMG, tot = nCa+nMg;
  var prech = tot*tvState.hc/100, trv = tot - prech;
  var dh = tot*MCAO/10;
  var W=760, H=262, L=70, R=730, T0=64, B=160;
  var maxT = 6.0;
  var X = function(v){ return L + v/maxT*(R-L); };
  var s = "";
  for(var g=0; g<=6; g++){
    s += line(X(g), T0-10, X(g), B+10, {c:"var(--line)", w:1});
    s += txt(X(g), B+30, String(g), {anchor:"middle", size:11, fill:"var(--ink-3)", mono:true});
    s += txt(X(g), T0-20, fmt(g*MCAO/10,1), {anchor:"middle", size:10, fill:"var(--ink-3)", mono:true});
  }
  s += txt(L-14, T0-20, "°dH", {anchor:"end", size:10.5, w:600, fill:"var(--ink-3)"});
  /* pásma tvrdosti */
  var zones = [[0,1.25,"měkká","var(--ok)"],[1.25,2.5,"středně tvrdá","var(--warn)"],[2.5,3.75,"tvrdá","var(--exo)"],[3.75,6,"velmi tvrdá","var(--bad)"]];
  zones.forEach(function(z){
    s += rect(X(z[0]), B+44, X(z[1])-X(z[0]), 20, {fill:z[3], r:4, style:"fill-opacity:.2"});
    if(X(z[1])-X(z[0]) > 70) s += txt((X(z[0])+X(z[1]))/2, B+58, z[2], {anchor:"middle", size:10.5, w:700, fill:z[3]});
  });
  /* pruh */
  s += rect(L, T0, X(prech)-L, 56, {fill:"var(--endo)", r:0, style:"fill-opacity:.85"});
  s += rect(X(prech), T0, X(tot)-X(prech), 56, {fill:"var(--exo)", r:0, style:"fill-opacity:.85"});
  s += rect(L, T0, R-L, 56, {fill:"none", stroke:"var(--line-strong)", sw:1.4});
  if(X(prech)-L > 70) s += txt((L+X(prech))/2, T0+34, "přechodná "+fmt(prech,2), {anchor:"middle", size:12, w:700, fill:"var(--paper)", mono:true});
  if(X(tot)-X(prech) > 70) s += txt((X(prech)+X(tot))/2, T0+34, "trvalá "+fmt(trv,2), {anchor:"middle", size:12, w:700, fill:"var(--paper)", mono:true});
  s += line(X(tot), T0-6, X(tot), B+16, {c:"var(--ink)", w:2});
  s += txt(X(tot), T0-46, fmt(tot,2)+" mmol·dm⁻³", {anchor:"middle", size:12.5, w:700, fill:"var(--ink)", mono:true});
  s += txt((L+R)/2, B+96, "celková tvrdost [mmol·dm⁻³]", {anchor:"middle", size:11.5, w:600, fill:"var(--ink-3)", style:"letter-spacing:.06em"});
  $("#tvWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Tvrdost vody a její složky"');
  $("#tvCaV").textContent = fmt(tvState.ca,0)+" mg·dm⁻³";
  $("#tvMgV").textContent = fmt(tvState.mg,0)+" mg·dm⁻³";
  $("#tvHcV").textContent = fmt(tvState.hc,0)+" %";
  var kat = tot<1.25 ? "měkká" : (tot<2.5 ? "středně tvrdá" : (tot<3.75 ? "tvrdá" : "velmi tvrdá"));
  vvRo("#tvRo1", "Celková tvrdost", fmt(tot,2)+" mmol·dm⁻³", fmt(dh,1)+" °dH — voda "+kat, tot<2.5?"pos":"neg");
  vvRo("#tvRo2", "Odstraní var", fmt(prech,2)+" mmol·dm⁻³", "přechodná (uhličitanová) část", "pos");
  vvRo("#tvRo3", "Var neodstraní", fmt(trv,2)+" mmol·dm⁻³", "trvalá část — nutný ionex nebo srážení", "neg");
  $("#tvEq").innerHTML = 'tvrdost = <span class="q">c</span>(Ca²⁺) + <span class="q">c</span>(Mg²⁺) = '+fmt(tvState.ca,0)+'/40,08 + '+fmt(tvState.mg,0)+'/24,31 = '+fmt(nCa,3)+' + '+fmt(nMg,3)+' = <b>'+fmt(tot,3)+' mmol·dm⁻³</b> = '+fmt(dh,1)+' °dH';
  $("#tvNote").innerHTML = (tvState.hc>=95)
    ? "Skoro veškerá tvrdost je uhličitanová — takovou vodu <b>zbaví tvrdosti pouhý var</b>, ale zaplatíte to vodním kamenem v&nbsp;konvici."
    : (tvState.hc<=5
      ? "Tvrdost je prakticky celá <b>trvalá</b>. Var vám nepomůže vůbec — musíte srážet nebo použít ionex."
      : "Posuňte podíl hydrogenuhličitanů na nulu a&nbsp;na sto procent a&nbsp;porovnejte, kolik tvrdosti odstraní var. Celková tvrdost se přitom nezmění — proto se v&nbsp;rozboru vždycky uvádí, <b>která část</b> je uhličitanová.");
}
function initTv(){
  $("#tvCa").addEventListener("input", function(){ tvState.ca = +this.value; drawTv(); });
  $("#tvMg").addEventListener("input", function(){ tvState.mg = +this.value; drawTv(); });
  $("#tvHc").addEventListener("input", function(){ tvState.hc = +this.value; drawTv(); });
  drawTv();
}

/* --- metody úpravy vody ---------------------------------------------- */
var ZMEK = [
 {id:"var", nm:"Var (dekarbonizace)", prech:100, trv:0,
  eq:"Ca(HCO₃)₂ → CaCO₃↓ + CO₂↑ + H₂O", pod:"105 °C při tlaku 0,12 MPa",
  plus:"Zdarma, nepotřebuje žádné chemikálie.", minus:"Odstraní jen uhličitanovou tvrdost a&nbsp;zanechá vodní kámen.",
  vys:"Hydrogenuhličitan se teplem rozloží a&nbsp;uhličitan vápenatý se vysráží. Hořečnatá varianta reaguje jen zvolna a&nbsp;obtížně."},
 {id:"vap", nm:"Vápnění hydroxidem vápenatým", prech:100, trv:0,
  eq:"Ca(HCO₃)₂ + Ca(OH)₂ → 2 CaCO₃↓ + 2 H₂O", pod:"za studena, dávkování podle rozboru",
  plus:"Levné, používá se ve velkých úpravnách.", minus:"Předávkování zvýší pH a&nbsp;vodu je nutné znovu upravit.",
  vys:"Vápno neutralizuje hydrogenuhličitan na uhličitan. Paradoxně přidáváte vápník, a&nbsp;přesto tvrdost klesne — protože se vysráží dvojnásobek."},
 {id:"soda", nm:"Soda (uhličitan sodný)", prech:100, trv:100,
  eq:"CaSO₄ + Na₂CO₃ → CaCO₃↓ + Na₂SO₄", pod:"za studena i&nbsp;za tepla",
  plus:"Odstraní i&nbsp;trvalou tvrdost.", minus:"Zvyšuje obsah sodných solí a&nbsp;zásaditost.",
  vys:"Uhličitanový aniont vysráží vápník bez ohledu na to, s&nbsp;jakým aniontem byl původně spojený. Proto zabere i&nbsp;na sírany."},
 {id:"fosf", nm:"Fosforečnan sodný", prech:100, trv:100,
  eq:"3 CaSO₄ + 2 Na₃PO₄ → Ca₃(PO₄)₂↓ + 3 Na₂SO₄", pod:"kotelní voda, dávkování za provozu",
  plus:"Nejúčinnější srážedlo, fosforečnan vápenatý je extrémně málo rozpustný.", minus:"Fosforečnany v&nbsp;odpadní vodě způsobují eutrofizaci — proto se z&nbsp;pracích prášků vytratily.",
  vys:"Používá se hlavně v&nbsp;energetice na dočištění kotelní vody na prakticky nulovou tvrdost."},
 {id:"ionex", nm:"Ionex (měnič iontů, sodíkový cyklus)", prech:100, trv:100,
  eq:"Ca²⁺ + 2 NaR → CaR₂ + 2 Na⁺", pod:"průtok kolonou, regenerace roztokem NaCl",
  plus:"Odstraní obojí tvrdost, dá se regenerovat a&nbsp;běží automaticky.", minus:"Do vody uvolňuje sodík — což vadí při dietě s&nbsp;omezením soli.",
  vys:"Povrch pryskyřice nebo zeolitu je zdrojem iontů Na⁺ a&nbsp;vyměňuje je za zachycené Ca²⁺ a&nbsp;Mg²⁺. Po vyčerpání se zásoba obnoví regeneračním roztokem: CaR₂ + 2 NaCl → 2 NaR + CaCl₂."},
 {id:"demi", nm:"Katex + anex (demineralizace)", prech:100, trv:100,
  eq:"katex: Ca²⁺ + 2 HR → CaR₂ + 2 H⁺ &nbsp;·&nbsp; anex: SO₄²⁻ + 2 ROH → R₂SO₄ + 2 OH⁻", pod:"dvě kolony za sebou",
  plus:"Odstraní kationty i&nbsp;anionty — vznikne prakticky čistá voda.", minus:"Regenerace vyžaduje kyselinu a&nbsp;louh, tedy nákladnější provoz.",
  vys:"Uvolněné H⁺ a&nbsp;OH⁻ se spojí na vodu, takže z&nbsp;kolon vyteče demineralizovaná (deionizovaná) voda. Používá se v&nbsp;energetice, elektronice a&nbsp;farmacii."},
 {id:"ro", nm:"Reverzní osmóza", prech:97, trv:97,
  eq:"membránový proces, bez chemické reakce", pod:"tlak 1 až 8 MPa proti osmotickému tlaku",
  plus:"Odstraní 95 až 99&nbsp;% všech rozpuštěných solí i&nbsp;organických látek.", minus:"Spotřebuje energii na tlak a&nbsp;produkuje koncentrovaný odpad.",
  vys:"Voda se protlačí polopropustnou membránou, která ionty nepropustí. Používá se na odsolování mořské vody i&nbsp;v&nbsp;domácích filtrech."},
 {id:"edta", nm:"Chelatace (EDTA, chelaton 3)", prech:100, trv:100,
  eq:"Ca²⁺ + H₂Y²⁻ → CaY²⁻ + 2 H⁺", pod:"přídavek činidla do roztoku",
  plus:"Ionty se nesráží ani nemizí, jen se „uzavřou“ do rozpustného komplexu.", minus:"Nehodí se na velké objemy, je to spíš analytická a&nbsp;laboratorní metoda.",
  vys:"Tímtéž činidlem se tvrdost i&nbsp;stanovuje — chelatometrickou titrací na indikátor eriochromčerň T nebo murexid."}
];
var zmState = {i:0};
function drawZm(){
  var z = ZMEK[zmState.i];
  var W=760, H=240, s="";
  var L=60, R=700, ytop=54;
  /* před a po */
  var before = 3.0, prech0 = 1.9, trv0 = 1.1;
  var afterP = prech0*(1 - z.prech/100), afterT = trv0*(1 - z.trv/100);
  var maxV = 3.2;
  var Wbar = R-L;
  function bar(y, p, t, lab){
    var xp = p/maxV*Wbar, xt = t/maxV*Wbar;
    s += rect(L, y, xp, 44, {fill:"var(--endo)", style:"fill-opacity:.85"});
    s += rect(L+xp, y, xt, 44, {fill:"var(--exo)", style:"fill-opacity:.85"});
    s += rect(L, y, Wbar, 44, {fill:"none", stroke:"var(--line)", sw:1});
    s += txt(L-10, y+28, lab, {anchor:"end", size:12, w:700, fill:"var(--ink-2)"});
    s += txt(L+xp+xt+10, y+28, fmt(p+t,2)+" mmol·dm⁻³", {size:12, w:700, fill:"var(--ink)", mono:true});
  }
  bar(ytop, prech0, trv0, "před");
  bar(ytop+72, afterP, afterT, "po");
  s += txt(L, 32, z.nm, {size:14, w:700, fill:"var(--accent)"});
  s += txt(L, ytop+150, "modelová voda: 1,90 mmol·dm⁻³ přechodné + 1,10 mmol·dm⁻³ trvalé tvrdosti", {size:11.5, fill:"var(--ink-3)"});
  s += txt(L, ytop+174, z.pod, {size:11.5, w:600, fill:"var(--ink-3)"});
  $("#zmWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Účinek metody úpravy vody"');
  $("#zmEq").innerHTML = '<span class="chem">'+z.eq+'</span>';
  var uc = (prech0+trv0 - afterP - afterT)/(prech0+trv0)*100;
  vvRo("#zmRo1", "Sníží tvrdost o", fmt(uc,0)+" %", "u&nbsp;modelové vody 3,00 mmol·dm⁻³", uc>60?"pos":"neg");
  vvRo("#zmRo2", "Výhoda", z.plus.length>52 ? z.plus.slice(0,50)+"…" : z.plus, "", "pos");
  vvRo("#zmRo3", "Nevýhoda", z.minus.length>52 ? z.minus.slice(0,50)+"…" : z.minus, "", "neg");
  $("#zmNote").innerHTML = z.vys + "<br><br><b>Výhoda:</b> " + z.plus + " <b>Nevýhoda:</b> " + z.minus;
}
function initZm(){
  $("#zmSel").innerHTML = ZMEK.map(function(z, i){ return '<option value="'+i+'">'+z.nm+'</option>'; }).join("");
  $("#zmSel").addEventListener("change", function(){ zmState.i = +this.value; drawZm(); });
  drawZm();
}
