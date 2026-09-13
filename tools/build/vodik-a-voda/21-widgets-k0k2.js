/* ============================================================
   3 · KAPITOLA 0 — vodík proti 1. a 17. skupině
   ============================================================ */
var ptState = {p:"ie"};
var PTPROP = {
  ie:{nm:"Ionizační energie", jed:"kJ·mol⁻¹", max:1800, d:1,
      pop:"Kolik energie stojí odtrhnout elektron. Vodík je s&nbsp;1312 kJ·mol⁻¹ blíž halogenům než kovům — proto není kov."},
  ea:{nm:"Elektronová afinita", jed:"kJ·mol⁻¹", max:400, d:1,
      pop:"Kolik energie se uvolní přijetím elektronu. Vodík má jen 72,8 kJ·mol⁻¹, tedy čtyřikrát méně než fluor — proto není halogen."},
  en:{nm:"Elektronegativita", jed:"", max:4.2, d:2,
      pop:"Schopnost přitahovat vazebný elektronový pár. Vodík s&nbsp;2,20 leží přesně uprostřed mezi lithiem (0,98) a&nbsp;fluorem (3,98)."},
  rk:{nm:"Kovalentní poloměr", jed:"pm", max:220, d:0,
      pop:"Vodík je s&nbsp;31 pm nejmenší atom vůbec — nemá žádnou vnitřní slupku, která by elektron odtlačovala od jádra."}
};
function drawPT(){
  var key = ptState.p, P = PTPROP[key];
  var W=760, H=290, L=60, R=730, T0=34, B=228;
  var n = SROV.length, bw = (R-L)/n*0.56, gap = (R-L)/n;
  var Y = function(v){ return B - v/P.max*(B-T0); };
  var s = "";
  for(var g=0; g<=5; g++){
    var v = P.max*g/5;
    s += line(L, Y(v), R, Y(v), {c:"var(--line)", w:1});
    s += txt(L-8, Y(v)+4, fmt(v, P.d===0?0:(P.max>10?0:1)), {anchor:"end", size:11, fill:"var(--ink-3)", mono:true});
  }
  SROV.forEach(function(e, i){
    var x = L + gap*i + gap/2, v = e[key];
    var c = e.grp==="H" ? "var(--accent)" : (e.grp==="1" ? "var(--exo)" : "var(--endo)");
    s += rect(x-bw/2, Y(v), bw, B-Y(v), {fill:c, r:5, style:e.grp==="H"?"":"fill-opacity:.75"});
    s += txt(x, Y(v)-9, fmt(v, P.d), {anchor:"middle", size:12, w:700, fill:c, mono:true});
    s += txt(x, B+20, e.el, {anchor:"middle", size:13, w:700, fill:"var(--ink-2)"});
    s += txt(x, B+36, e.grp==="H" ? "—" : ("sk. "+e.grp), {anchor:"middle", size:10, fill:"var(--ink-3)"});
  });
  s += line(L, B, R, B, {c:"var(--line-strong)", w:1.5});
  s += txt(L, T0-14, P.nm + (P.jed ? "  ["+P.jed+"]" : ""), {size:12, w:700, fill:"var(--ink-3)", style:"letter-spacing:.06em"});
  $("#ptWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Srovnání vodíku s alkalickými kovy a halogeny"');
  var h = SROV[0][key], li = SROV[1][key], f = SROV[4][key];
  vvRo("#ptRo1", "Vodík", fmt(h,P.d)+(P.jed?" "+P.jed:""), "konfigurace 1s¹", "");
  vvRo("#ptRo2", "Poměr H ku lithiu", fmt(h/li,2)+"×", "lithium má "+fmt(li,P.d)+(P.jed?" "+P.jed:""), h>li?"pos":"neg");
  vvRo("#ptRo3", "Poměr H ku fluoru", fmt(h/f,2)+"×", "fluor má "+fmt(f,P.d)+(P.jed?" "+P.jed:""), h>f?"pos":"neg");
  $("#ptNote").innerHTML = P.pop + " Zkuste projít všechny čtyři veličiny a&nbsp;všímejte si, ke které skupině se vodík zrovna přimyká.";
}
function initPT(){
  $$("#ptProp button").forEach(function(b){
    b.addEventListener("click", function(){
      ptState.p = b.dataset.v;
      $$("#ptProp button").forEach(function(x){ x.setAttribute("aria-pressed", x.dataset.v===ptState.p); });
      drawPT();
    });
  });
  drawPT();
}

/* ============================================================
   4 · KAPITOLA 1 — izotopy vodíku
   ============================================================ */
var izState = {i:"H"};
function izFind(id){ for(var i=0;i<IZO.length;i++){ if(IZO[i].id===id) return IZO[i]; } return IZO[0]; }
function drawIz(){
  var it = izFind(izState.i), W=760, H=250, cx=190, cy=125, s="";
  /* obal */
  s += '<ellipse cx="'+cx+'" cy="'+cy+'" rx="96" ry="96" style="fill:var(--accent);fill-opacity:.07;stroke:var(--accent);stroke-width:1.6;stroke-dasharray:5 5"/>';
  s += '<circle cx="'+(cx+96)+'" cy="'+cy+'" r="8" style="fill:var(--accent)"/>';
  s += txt(cx+96, cy-18, "e⁻", {anchor:"middle", size:12, w:700, fill:"var(--accent)"});
  s += txt(cx, cy-112, "orbital 1s — stejný u&nbsp;všech tří izotopů", {anchor:"middle", size:11.5, w:600, fill:"var(--accent)"});
  /* jádro */
  var parts = [];
  parts.push({t:"p"});
  for(var i=0;i<it.n;i++) parts.push({t:"n"});
  var rr = parts.length===1 ? 0 : (parts.length===2 ? 13 : 15);
  parts.forEach(function(q, i){
    var ang = parts.length===1 ? 0 : (-Math.PI/2 + i*2*Math.PI/parts.length);
    var px = cx + rr*Math.cos(ang), py = cy + rr*Math.sin(ang);
    s += '<circle cx="'+px+'" cy="'+py+'" r="15" style="fill:'+(q.t==="p"?"var(--exo)":"var(--endo)")+';stroke:var(--surface);stroke-width:2"/>';
    s += txt(px, py+5, q.t==="p"?"p⁺":"n", {anchor:"middle", size:11.5, w:700, fill:"var(--paper)", mono:true});
  });
  /* popis vpravo */
  var TX = 320;
  s += txt(TX, 52, it.nuk + "   " + it.nm, {size:19, w:700, fill:"var(--ink)"});
  s += line(TX, 64, 730, 64, {c:"var(--line)", w:1});
  var rows = [
    ["protonové číslo Z", String(it.z)],
    ["počet neutronů N", String(it.n)],
    ["nukleonové číslo A", String(it.z+it.n)],
    ["relativní atomová hmotnost", fmt(it.ar,5)],
    ["zastoupení v&nbsp;přírodě", it.zast],
    ["stabilita", it.stab]
  ];
  rows.forEach(function(r, i){
    var y = 92 + i*27;
    s += txt(TX, y, r[0], {size:12, fill:"var(--ink-3)"});
    s += txt(730, y, r[1], {size:12.5, w:600, fill:"var(--ink)", anchor:"end", mono:true});
  });
  $("#izWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Stavba jádra izotopů vodíku"');
  vvRo("#izRo1", "Hmotnost proti protiu", fmt(it.ar/1.007825,3)+"×", "chemie se nemění, mění se rychlost", "");
  vvRo("#izRo2", "Nukleony v&nbsp;jádře", (it.z+it.n)+" ("+it.z+" p⁺, "+it.n+" n)", it.n===0?"jediný nuklid vůbec bez neutronu":"neutrony drží jádro pohromadě", "");
  vvRo("#izRo3", "Stabilita", it.stab, it.id==="T"?"rozpadá se na ³He":"nerozpadá se", it.id==="T"?"neg":"pos");
  $("#izEq").innerHTML = "<b>K&nbsp;čemu je:</b> " + it.vyu;
  $("#izNote").innerHTML = it.det + " Chemické vlastnosti určuje obal — proto se všechny tři izotopy chovají chemicky stejně, jen různě rychle.";
}
function initIz(){
  $$("#izSel button").forEach(function(b){
    b.addEventListener("click", function(){
      izState.i = b.dataset.v;
      $$("#izSel button").forEach(function(x){ x.setAttribute("aria-pressed", x.dataset.v===izState.i); });
      drawIz();
    });
  });
  /* tabulka H2O vs D2O */
  $("#tzBody").innerHTML = TEZKA.map(function(r){
    return '<tr><td>'+r[0]+'</td><td class="n">'+r[1]+'</td><td class="n">'+r[2]+'</td><td>'+r[3]+'</td></tr>';
  }).join("");
  drawIz();
}

/* --- rozpad tritia --------------------------------------------------- */
var tdState = {t:0};
var THALF = 12.32;
function drawTd(){
  var t = tdState.t, frac = Math.pow(0.5, t/THALF);
  var W=760, H=280, L=64, R=730, T0=26, B=222;
  var X = function(v){ return L + v/60*(R-L); };
  var Y = function(v){ return B - v*(B-T0); };
  var s = "";
  for(var g=0; g<=5; g++){
    s += line(L, Y(g/5), R, Y(g/5), {c:"var(--line)", w:1});
    s += txt(L-8, Y(g/5)+4, fmt(g/5*100,0)+" %", {anchor:"end", size:11, fill:"var(--ink-3)", mono:true});
  }
  for(var v=0; v<=60; v+=12.32){
    s += line(X(v), T0, X(v), B, {c:"var(--line)", w:1, dash:"3 4"});
  }
  for(var v2=0; v2<=60; v2+=10){
    s += txt(X(v2), B+20, String(v2), {anchor:"middle", size:11, fill:"var(--ink-3)", mono:true});
  }
  /* křivka */
  var pts = [];
  for(var u=0; u<=60; u+=0.5) pts.push(X(u)+","+Y(Math.pow(0.5, u/THALF)));
  s += '<polyline points="'+pts.join(" ")+'" style="fill:none;stroke:var(--accent);stroke-width:2.6;stroke-linecap:round"/>';
  /* poločasy */
  [1,2,3,4].forEach(function(k){
    var tt = k*THALF; if(tt>60) return;
    s += '<circle cx="'+X(tt)+'" cy="'+Y(Math.pow(0.5,k))+'" r="4" style="fill:var(--ink-3)"/>';
    s += txt(X(tt), Y(Math.pow(0.5,k))+16, fmt(Math.pow(0.5,k)*100,1)+" %", {anchor:"middle", size:10, fill:"var(--ink-3)", mono:true});
  });
  /* ukazatel */
  s += line(X(t), T0, X(t), B, {c:"var(--ink)", w:1.2, dash:"4 4"});
  s += '<circle cx="'+X(t)+'" cy="'+Y(frac)+'" r="7" style="fill:var(--accent);stroke:var(--surface);stroke-width:2.5"/>';
  s += rect(X(t)+(t>44?-112:10), Y(frac)-27, 102, 21, {fill:"var(--ink)", r:5});
  s += txt(X(t)+(t>44?-61:61), Y(frac)-12, fmt(frac*100,1)+" %", {anchor:"middle", size:11.5, w:600, fill:"var(--paper)", mono:true});
  s += txt((L+R)/2, B+40, "čas [roky]", {anchor:"middle", size:11.5, w:600, fill:"var(--ink-3)", style:"letter-spacing:.08em"});
  s += txt(18, (T0+B)/2, "zbývající podíl tritia", {anchor:"middle", size:11.5, w:600, fill:"var(--ink-3)", style:"writing-mode:sideways-lr"});
  $("#tdWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Radioaktivní přeměna tritia"');
  $("#tdTV").textContent = fmt(t,0) + " let";
  vvRo("#tdRo1", "Zbývá tritia", fmt(frac*100,1)+" %", "z&nbsp;původního množství", frac>0.5?"pos":"neg");
  vvRo("#tdRo2", "Uplynulo poločasů", fmt(t/THALF,2), "jeden poločas = 12,32 roku", "");
  vvRo("#tdRo3", "Rozpadlo se", fmt((1-frac)*100,1)+" %", "vzniklo ³He a&nbsp;záření β⁻", "");
  $("#tdEq").innerHTML = '<span class="q">N</span>/<span class="q">N</span>₀ = (1/2)<sup><span class="q">t</span>/<span class="q">T</span></sup> = (1/2)<sup>'+fmt(t,0)+'/12,32</sup> = <b>'+fmt(frac,4)+'</b> &nbsp;→&nbsp; '+fmt(frac*100,1)+'&nbsp;%';
}
function initTd(){
  $("#tdT").addEventListener("input", function(){ tdState.t = +this.value; drawTd(); });
  drawTd();
}

/* ============================================================
   5 · KAPITOLA 2 — křivka potenciální energie H₂
   ============================================================ */
var moState = {r:74};
var MO_DE = 436, MO_RE = 74.1, MO_A = 0.0194;
function moE(r){ var x = 1 - Math.exp(-MO_A*(r-MO_RE)); return MO_DE*(x*x - 1); }
function drawMo(){
  var r = moState.r, E = moE(r);
  var W=760, H=300, L=70, R=730, T0=24, B=236;
  var rmin=40, rmax=300, Emin=-520, Emax=260;
  var X = function(v){ return L + (v-rmin)/(rmax-rmin)*(R-L); };
  var Y = function(v){ return B - (v-Emin)/(Emax-Emin)*(B-T0); };
  var s = "";
  for(var e=-500; e<=250; e+=125){
    s += line(L, Y(e), R, Y(e), {c:"var(--line)", w:1});
    s += txt(L-8, Y(e)+4, String(e), {anchor:"end", size:11, fill:"var(--ink-3)", mono:true});
  }
  for(var v=50; v<=300; v+=50){
    s += line(X(v), T0, X(v), B, {c:"var(--line)", w:1});
    s += txt(X(v), B+20, String(v), {anchor:"middle", size:11, fill:"var(--ink-3)", mono:true});
  }
  s += line(L, Y(0), R, Y(0), {c:"var(--line-strong)", w:1.5});
  s += txt(R-4, Y(0)-8, "dva volné atomy H (nulová hladina)", {anchor:"end", size:11, w:600, fill:"var(--ink-3)"});
  /* křivka */
  var pts = [];
  for(var u=rmin; u<=rmax; u+=1){ var y = moE(u); if(y<Emax) pts.push(X(u)+","+Y(Math.max(Emin+4,y))); }
  s += '<polyline points="'+pts.join(" ")+'" style="fill:none;stroke:var(--accent);stroke-width:2.6;stroke-linejoin:round"/>';
  /* minimum */
  s += line(X(MO_RE), Y(-MO_DE), X(MO_RE), Y(0), {c:"var(--endo)", w:1.5, dash:"4 4"});
  s += vArrow(X(MO_RE)+0, Y(0), Y(-MO_DE), "var(--endo)", "436 kJ·mol⁻¹", "right");
  s += '<circle cx="'+X(MO_RE)+'" cy="'+Y(-MO_DE)+'" r="5" style="fill:var(--endo)"/>';
  s += txt(X(MO_RE), Y(-MO_DE)+22, "74,1 pm", {anchor:"middle", size:11.5, w:700, fill:"var(--endo)", mono:true});
  /* pásma */
  s += txt(X(66), T0+16, "odpuzování jader", {anchor:"middle", size:11, w:600, fill:"var(--exo)"});
  s += txt(X(230), Y(-60), "přitahování slábne", {anchor:"middle", size:11, w:600, fill:"var(--ink-3)"});
  /* ukazatel */
  var Ec = Math.max(Emin+6, Math.min(Emax-6, E));
  s += line(X(r), T0, X(r), B, {c:"var(--ink)", w:1.2, dash:"4 4"});
  s += '<circle cx="'+X(r)+'" cy="'+Y(Ec)+'" r="7" style="fill:var(--accent);stroke:var(--surface);stroke-width:2.5"/>';
  /* dvě jádra dole */
  var jy = B+44, jx = (L+R)/2;
  var half = Math.max(9, Math.min(120, (r/2)*0.9));
  s += '<circle cx="'+(jx-half)+'" cy="'+jy+'" r="9" style="fill:var(--accent)"/>';
  s += '<circle cx="'+(jx+half)+'" cy="'+jy+'" r="9" style="fill:var(--accent)"/>';
  s += line(jx-half, jy, jx+half, jy, {c:"var(--ink-3)", w:1, dash:"3 3"});
  s += txt(jx, jy+22, fmt(r,0)+" pm", {anchor:"middle", size:11, w:600, fill:"var(--ink-3)", mono:true});
  s += txt((L+R)/2, B+20, "", {});
  s += txt(18, (T0+B)/2, "E [kJ·mol⁻¹]", {anchor:"middle", size:11.5, w:600, fill:"var(--ink-3)", style:"writing-mode:sideways-lr"});
  $("#moWrap").innerHTML = svg("0 0 "+W+" "+(H+70), s, 'aria-label="Křivka potenciální energie molekuly vodíku"');
  $("#moRV").textContent = fmt(r,0) + " pm";
  var stav = r < MO_RE-3 ? "jádra se odpuzují" : (r > MO_RE+3 ? "atomy se přitahují" : "rovnovážná poloha");
  vvRo("#moRo1", "Potenciální energie", fmt(E,0)+" kJ·mol⁻¹", "vůči dvěma volným atomům", E<0?"pos":"neg");
  vvRo("#moRo2", "Odchylka od rovnováhy", sgn(r-MO_RE,1)+" pm", stav, Math.abs(r-MO_RE)<3?"pos":"");
  vvRo("#moRo3", "Kolik chybí k&nbsp;rozštěpení", fmt(Math.max(0, E+MO_DE),0)+" kJ·mol⁻¹", "z&nbsp;dolíčku nahoru na nulovou hladinu", "");
}
function initMo(){
  $("#moR").addEventListener("input", function(){ moState.r = +this.value; drawMo(); });
  drawMo();
}

/* --- ortho / para vodík ---------------------------------------------- */
var opState = {T:298};
var OP_THETA = 87.6;      /* K — rotační teplota molekuly H₂ */
function opPara(T){
  var se = 0, so = 0;
  for(var J=0; J<40; J++){
    var g = (2*J+1)*Math.exp(-J*(J+1)*OP_THETA/T);
    if(J % 2 === 0) se += g; else so += 3*g;
  }
  return se/(se+so);
}
function drawOp(){
  var T = opState.T, para = opPara(T), ortho = 1-para;
  var W=760, H=290, L=64, R=730, T0=26, B=228;
  var tmin=15, tmax=400;
  var X = function(v){ return L + (v-tmin)/(tmax-tmin)*(R-L); };
  var Y = function(v){ return B - v*(B-T0); };
  var s = "";
  for(var g=0; g<=4; g++){
    s += line(L, Y(g/4), R, Y(g/4), {c:"var(--line)", w:1});
    s += txt(L-8, Y(g/4)+4, fmt(g/4*100,0)+" %", {anchor:"end", size:11, fill:"var(--ink-3)", mono:true});
  }
  for(var v=50; v<=400; v+=50){
    s += line(X(v), T0, X(v), B, {c:"var(--line)", w:1});
    s += txt(X(v), B+20, String(v), {anchor:"middle", size:11, fill:"var(--ink-3)", mono:true});
  }
  var pp = [], po = [];
  for(var u=tmin; u<=tmax; u+=2){ var f = opPara(u); pp.push(X(u)+","+Y(f)); po.push(X(u)+","+Y(1-f)); }
  s += '<polyline points="'+pp.join(" ")+'" style="fill:none;stroke:var(--endo);stroke-width:2.6"/>';
  s += '<polyline points="'+po.join(" ")+'" style="fill:none;stroke:var(--exo);stroke-width:2.6"/>';
  s += line(L, Y(0.75), R, Y(0.75), {c:"var(--exo)", w:1, dash:"4 4"});
  s += txt(R-4, Y(0.75)-7, "75 % ortho — statistická mez", {anchor:"end", size:10.5, fill:"var(--exo)"});
  s += line(X(20.3), T0, X(20.3), B, {c:"var(--accent)", w:1.4, dash:"5 4"});
  s += txt(X(20.3)+6, T0+14, "teplota varu H₂ (20,3 K)", {size:10.5, w:600, fill:"var(--accent)"});
  s += line(X(T), T0, X(T), B, {c:"var(--ink)", w:1.2, dash:"4 4"});
  s += '<circle cx="'+X(T)+'" cy="'+Y(para)+'" r="6.5" style="fill:var(--endo);stroke:var(--surface);stroke-width:2.5"/>';
  s += '<circle cx="'+X(T)+'" cy="'+Y(ortho)+'" r="6.5" style="fill:var(--exo);stroke:var(--surface);stroke-width:2.5"/>';
  s += txt((L+R)/2, B+40, "teplota [K]", {anchor:"middle", size:11.5, w:600, fill:"var(--ink-3)", style:"letter-spacing:.08em"});
  s += txt(18, (T0+B)/2, "rovnovážný podíl", {anchor:"middle", size:11.5, w:600, fill:"var(--ink-3)", style:"writing-mode:sideways-lr"});
  $("#opWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Rovnovážné zastoupení ortho a para vodíku"');
  $("#opTV").textContent = fmt(T,0) + " K";
  vvRo("#opRo1", "para-vodík", fmt(para*100,1)+" %", "sudá rotační čísla, spiny protilehlé", "pos");
  vvRo("#opRo2", "ortho-vodík", fmt(ortho*100,1)+" %", "lichá rotační čísla, spiny souhlasné", "neg");
  vvRo("#opRo3", "Teplota ve stupních Celsia", fmt(T-273.15,0)+" °C", T<25?"kryogenní oblast":"běžné podmínky", "");
  $("#opNote").innerHTML = (T<=40
    ? "Při této teplotě je rovnovážná směs téměř čistý <b>para</b>-vodík — má nižší energii, protože smí obsadit stav s&nbsp;nulovou rotací. Právě proto se vodík před zkapalněním převádí na para formu na katalyzátoru."
    : "Nad zhruba 250 K se poměr už nemění a&nbsp;ustálí se na <b>3&nbsp;:&nbsp;1</b> ve prospěch ortho formy, protože ta má trojnásobnou statistickou váhu. Zkuste sjet na 20 K a&nbsp;podívat se, co se stane.");
}
function initOp(){
  $("#opT").addEventListener("input", function(){ opState.T = +this.value; drawOp(); });
  drawOp();
}
