/* ============================================================
   17 · KAPITOLA 7 — kyseliny fosforu a jejich sytnost
   ============================================================ */
var pacState = {k:"H3PO4"};
function pacGet(k){ for(var i=0;i<PACID.length;i++) if(PACID[i].k===k) return PACID[i]; return PACID[0]; }
function drawPac(){
  var d = pacGet(pacState.k), W=720, H=300, s="";
  var CP="var(--cat3)", CO="var(--exo)", CA="var(--accent)", CH="var(--ink-3)";

  /* skip: index obsazený můstkem (0 = vlevo, 1 = vpravo, −1 = žádný) */
  function unit(cx, cy, nOH, nH, skip){
    var out = "";
    var slots = [[cx-84, cy+16],[cx+84, cy+16],[cx, cy+78]];
    var free = [0,1,2].filter(function(i){ return i!==skip; });
    out += bondN(cx, cy, cx, cy-72, 2, {c:CO, w:2.2, gap:5});
    out += atom(cx, cy-72, "O", {r:16, fill:"var(--exo-soft)", stroke:CO, ink:CO, size:13});
    var k = 0, i, p, q;
    for(i=0; i<nOH && k<free.length; i++, k++){
      p = slots[free[k]];
      out += bondN(cx, cy, p[0], p[1], 1, {c:"var(--ink-2)", w:2});
      out += atom(p[0], p[1], "O", {r:15, fill:"var(--accent-soft)", stroke:CA, ink:CA, size:12.5});
      var hx = p[0] + (p[0] < cx ? -46 : (p[0] > cx ? 46 : 0));
      var hy = p[1] + (p[0] === cx ? 44 : -22);
      out += bondN(p[0], p[1], hx, hy, 1, {c:CA, w:1.8});
      out += atom(hx, hy, "H", {r:12, fill:"var(--accent-soft)", stroke:CA, ink:CA, size:11});
    }
    for(i=0; i<nH && k<free.length; i++, k++){
      q = slots[free[k]];
      out += bondN(cx, cy, q[0], q[1], 1, {c:CH, w:2});
      out += atom(q[0], q[1], "H", {r:14, fill:"var(--surface-2)", stroke:CH, ink:"var(--ink-2)", size:12});
    }
    out += atom(cx, cy, "P", {r:19, fill:"var(--surface)", stroke:CP, ink:CP, size:16});
    return out;
  }

  if(d.k==="H4P2O7" || d.k==="H4P2O6"){
    var xa=214, xb=506, cy=112;
    if(d.k==="H4P2O7"){
      var mx=(xa+xb)/2;
      s += bondN(xa, cy, mx, cy, 1, {c:"var(--ink-2)", w:2.2});
      s += bondN(mx, cy, xb, cy, 1, {c:"var(--ink-2)", w:2.2});
      s += atom(mx, cy, "O", {r:15, fill:"var(--surface)", stroke:CO, ink:CO, size:12.5});
      s += txt(mx, cy+36, "můstek P—O—P", {anchor:"middle", size:10.5, w:600, fill:CO});
    } else {
      s += bondN(xa, cy, xb, cy, 1, {c:CP, w:2.8});
      s += txt((xa+xb)/2, cy-12, "přímá vazba P—P", {anchor:"middle", size:10.5, w:600, fill:CP});
    }
    s += unit(xa, cy, 2, 0, 1);
    s += unit(xb, cy, 2, 0, 0);
    s += txt(360, H-14, "Čtyři skupiny OH → čtyřsytná kyselina.", {anchor:"middle", size:11.5, w:600, fill:CA});
  } else {
    s += unit(340, 116, d.oh, d.ph, -1);
    var lab = d.oh===1 ? "jedna skupina OH → jednosytná" :
              (d.oh===2 ? "dvě skupiny OH → dvojsytná" : "tři skupiny OH → trojsytná");
    s += txt(340, 262, lab, {anchor:"middle", size:12.5, w:700, fill:CA});
    if(d.ph>0)
      s += txt(340, 282, "vodík"+(d.ph>1?"y":"")+" vázan"+(d.ph>1?"é":"ý")+" přímo na fosforu se neodštěpuje — do sytnosti se nepočítá",
               {anchor:"middle", size:11, w:600, fill:"var(--ink-3)"});
    else
      s += txt(340, 282, "žádný vodík nesedí na fosforu — všechny tři jsou kyselé",
               {anchor:"middle", size:11, w:600, fill:"var(--ink-3)"});
  }
  $("#pacWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Struktura kyseliny '+d.nm+'"');

  $$("#pacSel button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===pacState.k); });
  $("#pacRo1").innerHTML = '<span class="k">Sytnost</span><span class="v">'+d.syt+'</span><span class="h">'+
    d.oh+'× OH na kyslíku'+(d.ph?' · '+d.ph+'× H přímo na fosforu':'')+'</span>';
  $("#pacRo2").innerHTML = '<span class="k">Oxidační číslo fosforu</span><span class="v">'+d.ox+'</span><span class="h">'+d.nm+'</span>';
  $("#pacRo3").innerHTML = '<span class="k">Disociační konstanty</span><span class="v" style="font-size:.92rem">'+d.pka+'</span><span class="h">každý další proton se odštěpuje hůř</span>';
  $("#pacRo4").innerHTML = '<span class="k">Soli</span><span class="v" style="font-size:.92rem">'+d.sul+'</span><span class="h">počet řad solí se rovná sytnosti</span>';
  $("#pacText").innerHTML = d.txt;
}
function initPac(){
  $$("#pacSel button").forEach(function(b){
    b.addEventListener("click", function(){ pacState.k = b.dataset.v; drawPac(); });
  });
  drawPac();
}

/* ============================================================
   18 · KAPITOLA 7 — hnojiva a obsah dusíku
   ============================================================ */
var ferState = {i:0, dose:120};
function drawFer(){
  var W=720, H=230, s="";
  var x0=100, yB=170, yT=36, hi=90;
  s += yAxis(x0-8, yT, yB, 0, hi, 3, "% N");
  var colW=(W-x0-30)/FERT.length;
  FERT.forEach(function(f,i){
    var x = x0 + i*colW + colW*0.16, bw = colW*0.68;
    var h = f.n/hi*(yB-yT);
    var on = (i===ferState.i);
    s += rect(x, yB-h, bw, h, {r:5, fill:on?"var(--accent)":"var(--cat2)", style:"fill-opacity:"+(on?"1":".4")});
    s += txt(x+bw/2, yB-h-7, fmt(f.n,1), {anchor:"middle", size:11.5, w:700, mono:true, fill:on?"var(--accent)":"var(--ink-2)"});
    s += txt(x+bw/2, yB+17, f.f, {anchor:"middle", size:11, w:600, fill:on?"var(--ink)":"var(--ink-2)"});
    s += txt(x+bw/2, yB+31, f.typ, {anchor:"middle", size:9.5, fill:"var(--ink-3)"});
  });
  s += txt(x0, 22, "hmotnostní podíl dusíku v hnojivu [%]", {size:11.5, w:600, fill:"var(--ink-2)"});
  s += txt(x0, H-8, "Hodnoty jsou spočítané z molárních hmotností čistých látek; technická hnojiva mají o něco méně.",
           {size:10.5, fill:"var(--ink-3)"});
  $("#ferWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Obsah dusíku v hnojivech"');

  var f = FERT[ferState.i];
  var need = ferState.dose / (f.n/100);
  $("#ferDoseV").textContent = fmt(ferState.dose,0)+" kg N·ha⁻¹";
  $("#ferSel").value = String(ferState.i);
  $("#ferRo1").innerHTML = '<span class="k">Obsah dusíku</span><span class="v">'+fmt(f.n,1)+
    ' %</span><span class="h">hmotnostně, v čisté látce</span>';
  $("#ferRo2").innerHTML = '<span class="k">Potřebná dávka hnojiva</span><span class="v">'+fmt(need,0)+
    '</span><span class="h">kg·ha⁻¹, aby se dodalo '+fmt(ferState.dose,0)+' kg dusíku na hektar</span>';
  $("#ferRo3").innerHTML = '<span class="k">Na pole o výměře 25 ha</span><span class="v">'+fmt(need*25/1000,2)+
    '</span><span class="h">tun hnojiva</span>';
  $("#ferText").innerHTML = '<b>'+f.nm+' ('+f.f+').</b> '+f.pozn;
}
function initFer(){
  $("#ferSel").innerHTML = FERT.map(function(f,i){
    return '<option value="'+i+'">'+f.f+' — '+f.nm+'</option>';
  }).join("");
  $("#ferSel").addEventListener("change", function(){ ferState.i = +this.value; drawFer(); });
  $("#ferDose").addEventListener("input", function(){ ferState.dose = +this.value; drawFer(); });
  drawFer();
}

/* ============================================================
   19 · KAPITOLA 8 — trendy ve skupině 15
   ============================================================ */
var trdState = {p:"char"};
var TRD = {
  char: {nm:"charakter prvku", u:"nekov → kov",
    v:{N:"typický nekov", P:"nekov", As:"polokov", Sb:"polokov s převahou kovu", Bi:"kov"},
    w:{N:0.05, P:0.2, As:0.5, Sb:0.75, Bi:0.95},
    txt:"Dolů skupinou roste poloměr atomu a klesá ionizační energie, takže prvek stále snáz odevzdává elektrony. Dusík a fosfor jsou nekovy, arsen a antimon polokovy a bismut je už opravdový kov s kovovým leskem a vodivostí. Přechod je plynulý — proto se ve skupině 15 dá tenhle trend ukázat nejlíp z celé tabulky."},
  oxid: {nm:"charakter oxidu v nejvyšším stavu", u:"kyselý → zásaditý",
    v:{N:"N₂O₅ silně kyselý", P:"P₄O₁₀ silně kyselý", As:"As₂O₅ kyselý, As₂O₃ amfoterní", Sb:"Sb₂O₃ amfoterní", Bi:"Bi₂O₃ zásaditý"},
    w:{N:0.03, P:0.12, As:0.45, Sb:0.7, Bi:0.95},
    txt:"Kyselost oxidu jde ruku v ruce s nekovovým charakterem prvku. N₂O₅ a P₄O₁₀ se s vodou přímo bouřlivě slučují na silné kyseliny. As₂O₃ a Sb₂O₃ se rozpouštějí v kyselinách i v zásadách, tedy jsou amfoterní. Bi₂O₃ reaguje jen s kyselinami — je zásaditý jako oxid kovu."},
  stab: {nm:"stálost stavu +V proti +III", u:"stálý +V → stálý +III",
    v:{N:"+V zcela běžný (HNO₃)", P:"+V nejstálejší (H₃PO₄)", As:"+V ještě běžný, ale oxidující", Sb:"+III už stálejší", Bi:"+III jednoznačně vyhrává, +V silně oxiduje"},
    w:{N:0.06, P:0.03, As:0.4, Sb:0.7, Bi:0.97},
    txt:"Tomuhle trendu se říká efekt inertního páru. U těžkých prvků se pár elektronů ns² stále hůř zapojuje do vazby — je pevněji vázaný relativistickým smrštěním orbitalu s a špatně stíněný zaplněnými orbitaly d a f. Prvek proto odevzdá jen tři elektrony z orbitalů p a zůstane v +III. Bismutečnan sodný NaBiO₃ (Bi ve stavu +V) je tak nenasytné oxidační činidlo, že v kyselém prostředí převede Mn²⁺ až na fialový manganistan."},
  hyd:  {nm:"hydrid EH₃ — zásaditost a stálost", u:"zásaditý a stálý → nezásaditý a nestálý",
    v:{N:"NH₃ zásaditý, velmi stálý", P:"PH₃ prakticky nezásaditý", As:"AsH₃ nestálý, jedovatý", Sb:"SbH₃ rozkládá se mírným zahřátím", Bi:"BiH₃ existuje jen stopově"},
    w:{N:0.03, P:0.3, As:0.55, Sb:0.8, Bi:0.98},
    txt:"Vazba E—H dolů skupinou slábne, protože se překryv orbitalů zhoršuje s rostoucím atomem. Zároveň mizí zásaditost: volný pár se u těžkých prvků drží v orbitalu s blízko jádra a pro proton je nedostupný. Vazebný úhel klesá ze 106,7° u NH₃ na 93,5° u PH₃ a dál až k 90° — hybridizace se prakticky vytrácí a vazby tvoří skoro čisté orbitaly p."}
};
function drawTrd(){
  var t = TRD[trdState.p], W=740, H=240, s="";
  var x0=40, yTop=64, colW=(W-x0-30)/5;
  s += txt(x0, 26, t.nm, {size:12.5, w:700, fill:"var(--ink)"});
  s += txt(x0, 44, t.u, {size:11, w:600, fill:"var(--ink-3)"});
  for(var g=0; g<=100; g++){
    var xx = x0 + (W-x0-30)*g/100;
    var col = g<50 ? "var(--cat1)" : "var(--cat4)";
    s += rect(xx, yTop, (W-x0-30)/100+1, 8, {r:0, fill:col, style:"fill-opacity:"+(0.18+Math.abs(g-50)/50*0.7)});
  }
  G15.forEach(function(e,i){
    var w = t.w[e.s];
    var mx = x0 + (W-x0-30)*w;
    var cxx = x0 + i*colW + colW/2;
    s += line(mx, yTop+8, cxx, yTop+30, {c:"var(--ink-3)", w:1, dash:"3 3"});
    s += '<circle cx="'+mx+'" cy="'+(yTop+4)+'" r="6" style="fill:var(--surface);stroke:var(--ink);stroke-width:2"/>';
    s += txt(cxx, yTop+48, e.s, {anchor:"middle", size:15, w:700, fill:"var(--ink)"});
    var words = String(t.v[e.s]).split(" ");
    var lines = [], cur = "";
    words.forEach(function(wd){
      if((cur+" "+wd).trim().length > 16){ lines.push(cur.trim()); cur = wd; }
      else cur = (cur+" "+wd).trim();
    });
    if(cur) lines.push(cur);
    lines.slice(0,4).forEach(function(ln, j){
      s += txt(cxx, yTop+68+j*14, ln, {anchor:"middle", size:10.5, fill:"var(--ink-2)"});
    });
  });
  s += hArr(x0+40, W-70, H-16, "var(--accent)", "dolů skupinou", false);
  $("#trdWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Trend ve skupině 15: '+t.nm+'"');
  $$("#trdProp button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===trdState.p); });
  $("#trdText").innerHTML = t.txt;
}
function initTrd(){
  $$("#trdProp button").forEach(function(b){
    b.addEventListener("click", function(){ trdState.p = b.dataset.v; drawTrd(); });
  });
  drawTrd();
}

/* ============================================================
   20 · RYCHLOKURZ — mini-grafy
   ============================================================ */
function drawMnLad(){
  var W=520, H=220, s="", top=34, rowH=19;
  var NN = {5:"HNO₃",4:"NO₂",3:"HNO₂",2:"NO",1:"N₂O",0:"N₂","-1":"NH₂OH","-2":"N₂H₄","-3":"NH₃"};
  var PP = {5:"H₃PO₄",3:"H₃PO₃",1:"H₃PO₂",0:"P₄","-3":"PH₃",4:"H₄P₂O₆"};
  s += txt(168, 20, "DUSÍK", {anchor:"middle", size:11, w:700, fill:"var(--ink)"});
  s += txt(390, 20, "FOSFOR", {anchor:"middle", size:11, w:700, fill:"var(--ink)"});
  for(var v=5; v>=-3; v--){
    var y = top + (5-v)*rowH;
    s += txt(48, y+4, oxRoman(v), {anchor:"end", size:10, mono:true, fill:"var(--ink-3)"});
    s += line(56, y, W-12, y, {c:"var(--grid)", w:1});
    var c = v>=4 ? "var(--exo)" : (v<=0 ? "var(--endo)" : "var(--cat3)");
    if(NN[v]) s += txt(168, y+4, NN[v], {anchor:"middle", size:11, w:600, fill:c});
    if(PP[v]) s += txt(390, y+4, PP[v], {anchor:"middle", size:11, w:600, fill:c});
    else s += txt(390, y+4, "·", {anchor:"middle", size:11, fill:"var(--ink-3)"});
  }
  s += txt(12, H-8, "nahoře oxidační činidla, dole redukční · fosfor stavy −II, −I a +II netvoří",
           {size:10, fill:"var(--ink-3)"});
  $("#mnLad").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Přehled oxidačních stavů dusíku a fosforu"');
}
function drawMnBond(){
  var W=520, H=204, s="";
  var data = [
    {l:"N≡N", v:945, c:"var(--exo)"},
    {l:"3 × N—N", v:489, c:"var(--endo)"},
    {l:"P≡P", v:490, c:"var(--exo)"},
    {l:"3 × P—P", v:603, c:"var(--endo)"}
  ];
  var x0=64, yB=136, yT=34, hi=1000;
  s += yAxis(x0-6, yT, yB, 0, hi, 4, "kJ·mol⁻¹");
  var colW=(W-x0-24)/data.length;
  data.forEach(function(d,i){
    var x = x0+i*colW+colW*0.18, bw=colW*0.64, h=d.v/hi*(yB-yT);
    s += rect(x, yB-h, bw, h, {r:4, fill:d.c, style:"fill-opacity:.85"});
    s += txt(x+bw/2, yB-h-6, fmt(d.v,0), {anchor:"middle", size:10.5, w:700, mono:true, fill:"var(--ink)"});
    s += txt(x+bw/2, yB+16, d.l, {anchor:"middle", size:11, w:600, fill:"var(--ink-2)"});
  });
  s += line((x0+2*colW), yT-6, (x0+2*colW), yB+24, {c:"var(--line-strong)", w:1, dash:"4 3"});
  s += txt(x0+colW, yB+34, "trojná vyhrává → N₂", {anchor:"middle", size:10.5, w:700, fill:"var(--exo)"});
  s += txt(x0+3*colW, yB+34, "jednoduché vyhrávají → P₄", {anchor:"middle", size:10.5, w:700, fill:"var(--endo)"});
  s += txt(12, H-8, "Proč je dusík dvouatomový a fosfor čtyřatomový — celé je to v těchhle čtyřech číslech.",
           {size:10, fill:"var(--ink-3)"});
  $("#mnBond").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Srovnání vazebných energií dusíku a fosforu"');
}
function drawMnHab(){
  var W=520, H=214, s="";
  var x0=54, xE=W-64, yB=148, yT=30;
  function X(T){ return x0 + (T-200)/400*(xE-x0); }
  function Y(y){ return yB - y/100*(yB-yT); }
  s += line(x0, yT, x0, yB, {c:"var(--line-strong)", w:1.2});
  s += line(x0, yB, xE, yB, {c:"var(--line-strong)", w:1.2});
  for(var p=0;p<=100;p+=25){
    s += line(x0-3, Y(p), xE, Y(p), {c:"var(--grid)", w:1});
    s += txt(x0-6, Y(p)+4, fmt(p,0), {anchor:"end", size:9.5, mono:true, fill:"var(--ink-3)"});
  }
  for(var T=200;T<=600;T+=100){
    s += txt(X(T), yB+20, fmt(T,0), {anchor:"middle", size:9.5, mono:true, fill:"var(--ink-3)"});
  }
  s += txt(x0-6, yT-10, "% NH₃", {anchor:"end", size:9.5, w:600, fill:"var(--ink-3)"});
  s += txt((x0+xE)/2, yB+38, "teplota [°C]", {anchor:"middle", size:10, w:600, fill:"var(--ink-3)"});
  var mLbl = [];
  [{p:10,c:"var(--cat3)"},{p:30,c:"var(--accent)"}].forEach(function(o){
    var d="", first=true;
    for(var t=200;t<=600;t+=10){
      d += (first?"M":" L") + X(t).toFixed(1) + " " + Y(habYield(t,o.p)).toFixed(1);
      first=false;
    }
    s += '<path d="'+d+'" style="fill:none;stroke:'+o.c+';stroke-width:2"/>';
    mLbl.push({y:Y(habYield(600,o.p))+4, t:o.p+" MPa", c:o.c});
  });
  mLbl.sort(function(a,b){ return a.y-b.y; });
  for(var mi=1; mi<mLbl.length; mi++){ if(mLbl[mi].y-mLbl[mi-1].y < 14) mLbl[mi].y = mLbl[mi-1].y+14; }
  var mOv = mLbl[mLbl.length-1].y - (yB-6);
  if(mOv > 0) mLbl.forEach(function(o){ o.y -= mOv; });
  mLbl.forEach(function(o){ s += txt(xE+4, o.y, o.t, {size:10, w:600, fill:o.c}); });
  s += rect(X(400), yT, X(500)-X(400), yB-yT, {r:0, fill:"var(--accent)", style:"fill-opacity:.09"});
  s += txt((X(400)+X(500))/2, yT+12, "provoz", {anchor:"middle", size:9.5, w:600, fill:"var(--accent)"});
  s += txt(12, H-6, "Výtěžek klesá s teplotou a roste s tlakem. Provozní okno je kompromis mezi výtěžkem a rychlostí.",
           {size:10, fill:"var(--ink-3)"});
  $("#mnHab").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Rovnovážný výtěžek amoniaku"');
}
function drawMnTrd(){
  var W=520, H=190, s="";
  var x0=20, colW=(W-x0-20)/5, yB=104;
  var rows = [
    {lab:"charakter", v:["nekov","nekov","polokov","polokov","kov"]},
    {lab:"oxid E₂O₅ / E₂O₃", v:["kyselý","kyselý","amfoterní","amfoterní","zásaditý"]},
    {lab:"stálý stav", v:["+V","+V","+V","+III","+III"]}
  ];
  G15.forEach(function(e,i){
    var cxx = x0+i*colW+colW/2;
    var c = i<2 ? "var(--cat1)" : (i<4 ? "var(--cat3)" : "var(--cat4)");
    s += rect(x0+i*colW+4, 26, colW-8, 30, {r:6, fill:c, style:"fill-opacity:.75"});
    s += txt(cxx, 47, e.s, {anchor:"middle", size:15, w:700, fill:"var(--accent-ink)"});
    rows.forEach(function(r, j){
      s += txt(cxx, yB+j*32, r.v[i], {anchor:"middle", size:10.5, w:600, fill:"var(--ink-2)"});
    });
  });
  rows.forEach(function(r, j){
    s += txt(x0, yB+j*32-16, r.lab, {size:9.5, w:600, fill:"var(--ink-3)", style:"letter-spacing:.06em"});
  });
  s += hArr(x0+30, W-40, 74, "var(--accent)", "dolů skupinou roste kovový charakter", false);
  s += txt(12, H-6, "Efekt inertního páru: u bismutu se pár 6s² vazby neúčastní, proto je stálý stav +III.",
           {size:10, fill:"var(--ink-3)"});
  $("#mnTrd").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Trendy ve skupině 15"');
}
