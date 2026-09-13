/* ============================================================
   8 · k2 — ŽEBŘÍK OXIDAČNÍCH ČÍSEL
   ============================================================ */
var vmCur = "Cl";
var VMEX = {
  "F":  {"-1":"HF · NaF · CaF₂ · SF₆"},
  "Cl": {"-1":"HCl · NaCl · AlCl₃","1":"HClO · NaClO · Cl₂O","3":"HClO₂ · NaClO₂","4":"ClO₂ (radikál)","5":"HClO₃ · KClO₃","7":"HClO₄ · KClO₄ · Cl₂O₇"},
  "Br": {"-1":"HBr · KBr · AgBr","1":"HBrO · NaBrO · Br₂O","3":"BrF₃","5":"HBrO₃ · KBrO₃","7":"HBrO₄ (až od roku 1968)"},
  "I":  {"-1":"HI · KI · AgI","1":"HIO · ICl","3":"ICl₃","5":"HIO₃ · KIO₃ · I₂O₅ · IF₅","7":"HIO₄ · H₅IO₆ · IF₇"}
};
var ROM = {"-1":"−I","0":"0","1":"+I","3":"+III","4":"+IV","5":"+V","7":"+VII"};
function drawVm(){
  var h = halBy(vmCur), W = 760, H = 336, s = "";
  var states = [-1, 0, 1, 3, 4, 5, 7];
  var x0 = 70, x1 = 700, y0 = 46, y1 = 206;
  function xf(o){ return x0 + (o + 1)/8 * (x1 - x0); }
  s += txt(14, 18, ("OXIDAČNÍ ČÍSLA · " + h.nm).toUpperCase(), {size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  s += line(x0, y1, x1, y1, {c:"var(--line-strong)",w:1.4});
  s += hArrow(xf(0)-14, x0+6, y1+98, "var(--endo)", "přijetí elektronové hustoty", false);
  s += hArrow(xf(0)+14, x1-6, y1+98, "var(--exo)", "odevzdání elektronové hustoty kyslíku nebo lehčímu halogenu", false);

  states.forEach(function(o){
    var has = (o === 0) || h.oxlist.indexOf(o) >= 0;
    var cx = xf(o);
    var col = o < 0 ? "var(--endo)" : (o === 0 ? "var(--ink-2)" : "var(--exo)");
    var bh = has ? 24 + Math.abs(o) * 14 : 12;
    if(has){
      s += rect(cx-30, y1-bh, 60, bh, {fill:col, r:6, style:"fill-opacity:.28", stroke:col, sw:1.6});
      s += txt(cx, y1-bh-10, ROM[String(o)], {size:14,w:700,anchor:"middle",fill:col});
      var ex = (o === 0) ? (h.s + "₂") : ((VMEX[h.s] && VMEX[h.s][String(o)]) || "");
      if(ex){
        ex.split(" · ").forEach(function(t, i){
          s += txt(cx, y1 + 20 + i*15, t, {size:10.5, anchor:"middle", fill:"var(--ink-2)"});
        });
      }
    } else {
      s += rect(cx-30, y1-12, 60, 12, {fill:"var(--surface-3)", r:6});
      s += txt(cx, y1-20, ROM[String(o)], {size:12.5,w:600,anchor:"middle",fill:"var(--ink-3)"});
      s += txt(cx, y1+22, "neexistuje", {size:10,anchor:"middle",fill:"var(--ink-3)"});
    }
  });
  s += txt(14, y0-9, "výška sloupce roste s oxidačním číslem · pod sloupcem jsou typické sloučeniny",
           {size:10.5, fill:"var(--ink-3)"});
  $("#vmWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Žebřík oxidačních čísel prvku '+h.nm+'"');

  function ro(id,k,v,hh){ var e=$(id); e.className="readout"; e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+hh+'</span>'; }
  ro("#vmRo1","Valenční konfigurace", h.val, h.cfg);
  ro("#vmRo2","Oxidační čísla", h.ox, h.s === "F" ? "kladné číslo je vyloučené" : "kladná jen s kyslíkem nebo lehčím halogenem");
  ro("#vmRo3","Elektronegativita", fmt(h.en,2), h.s === "F" ? "nejvyšší v celé periodické tabulce" : "nižší než u fluoru i kyslíku (3,44)");
  var m;
  if(h.s === "F") m = "<b>Fluor nemá jedinou kyslíkatou kyselinu.</b> Nemá elektronegativnějšího partnera a ve druhé periodě nemá ani orbitaly d, do kterých by rozprostřel víc vazeb. Sloupec fluoru v tabulce oxokyselin je prázdný.";
  else if(h.s === "Cl") m = "<b>Chlor umí celou řadu.</b> Sudé číslo +IV má jen v oxidu chloričitém, protože je to radikál s nepárovým elektronem. Kyselina chloritá (+III) je jediná svého druhu — u bromu ani jodu se toto číslo neudrží.";
  else if(h.s === "Br") m = "<b>U bromu je +VII nejméně stálé z celé skupiny.</b> Kyselina bromistá byla připravena až roku 1968 — brom následuje hned za prvky bloku d a jeho valenční elektrony jsou hůř odstíněné, takže se odevzdávají neochotně.";
  else m = "<b>Jod je z halogenů nejlepší v kladných oxidačních číslech.</b> Velký atom kolem sebe udrží i šest kyslíků (H₅IO₆) nebo sedm fluorů (IF₇) — chlor by to nikdy nedokázal. Kyselina jodičná je dokonce stálá pevná látka.";
  $("#vmOut").innerHTML = m;
}
function initVm(){
  $$("#vmSeg button").forEach(function(b){
    b.addEventListener("click", function(){
      vmCur = b.dataset.v;
      $$("#vmSeg button").forEach(function(x){ x.setAttribute("aria-pressed", x.dataset.v===vmCur); });
      drawVm();
    });
  });
  drawVm();
}

/* ============================================================
   9 · k2 — TRENAŽÉR OXIDAČNÍCH ČÍSEL
   ============================================================ */
var ONQ = [
 {f:"NaCl",     e:"Cl", a:"−I",  o:["−I","0","+I","+III"],
  x:"Sodík je alkalický kov (+I), molekula je neutrální, takže chlor musí mít −I. Typický iontový halogenid."},
 {f:"HClO",     e:"Cl", a:"+I",  o:["−I","+I","+III","+V"],
  x:"Vodík +I, kyslík −II, součet nula: (+1) + x + (−2) = 0 → x = +I. Kyselina chlorná, sůl chlornan."},
 {f:"KClO₃",    e:"Cl", a:"+V",  o:["+III","+IV","+V","+VII"],
  x:"Draslík +I, tři kyslíky −VI: (+1) + x + (−6) = 0 → x = +V. Chlorečnan draselný, Bertholletova sůl."},
 {f:"HClO₄",    e:"Cl", a:"+VII",o:["+III","+V","+VI","+VII"],
  x:"(+1) + x + 4·(−2) = 0 → x = +VII. Maximum, jakého halogen dosáhne — vyčerpal všech sedm valenčních elektronů."},
 {f:"OF₂",      e:"F",  a:"−I",  o:["−II","−I","+I","+II"],
  x:"Past! Fluor je elektronegativnější než kyslík, takže má vždy −I a kladné číslo (+II) tady nese kyslík. Proto je to fluorid kyslíku, ne oxid fluoru."},
 {f:"ClO₂",     e:"Cl", a:"+IV", o:["+III","+IV","+V","+VI"],
  x:"x + 2·(−2) = 0 → x = +IV. Sudé číslo prozrazuje radikál: molekula má jeden nepárový elektron."},
 {f:"IF₇",      e:"I",  a:"+VII",o:["+V","+VI","+VII","−I"],
  x:"Sedm fluorů po −I, jod tedy +VII. Jod je z halogenů jediný dost velký na to, aby kolem sebe udržel sedm ligandů."},
 {f:"Ca(ClO)₂", e:"Cl", a:"+I",  o:["−I","+I","+III","+V"],
  x:"(+2) + 2x + 2·(−2) = 0 → 2x = +2 → x = +I. Chlornan vápenatý, účinná složka chlorového vápna."},
 {f:"NaBrO₃",   e:"Br", a:"+V",  o:["+I","+III","+V","+VII"],
  x:"(+1) + x + 3·(−2) = 0 → x = +V. Bromičnan sodný; u bromu a jodu se +V značí příponou -ičnan."},
 {f:"AlF₃",     e:"F",  a:"−I",  o:["−I","0","+I","+III"],
  x:"Fluor má vždy −I bez výjimky. Hliník tedy +III. Fluorid hlinitý je meziprodukt při výrobě kryolitu."},
 {f:"I₂",       e:"I",  a:"0",   o:["−I","0","+I","+II"],
  x:"Volný prvek má vždy oxidační číslo nula, i když je molekula dvouatomová."},
 {f:"H₅IO₆",    e:"I",  a:"+VII",o:["+V","+VI","+VII","+VIII"],
  x:"5·(+1) + x + 6·(−2) = 0 → x = +VII. Kyselina pentahydrogenjodistá — oktaedrická molekula, kterou umí jen velký jod."},
 {f:"ICl",      e:"I",  a:"+I",  o:["−I","0","+I","+III"],
  x:"Chlor je elektronegativnější než jod, takže má −I a jod +I. U interhalogenů nese kladné číslo vždy ten těžší halogen."},
 {f:"NaClO₂",   e:"Cl", a:"+III",o:["+I","+III","+V","+VII"],
  x:"(+1) + x + 2·(−2) = 0 → x = +III. Chloritan sodný, používá se k bělení a k výrobě oxidu chloričitého."},
 {f:"XeF₄",     e:"Xe", a:"+IV", o:["+II","+IV","+VI","+VIII"],
  x:"Čtyři fluory po −I, xenon tedy +IV. U vzácných plynů jsou oxidační čísla vždy sudá — rozbíjejí se celé elektronové páry."},
 {f:"CaCl₂",    e:"Cl", a:"−I",  o:["−II","−I","0","+I"],
  x:"Vápník je kov alkalických zemin (+II), dva chlory tedy dohromady −II, každý −I. Iontový halogenid, posypová sůl."}
];
var onI = 0, onScore = 0, onAns = false;
function drawOn(){
  var q = ONQ[onI];
  $("#onQn").textContent = onI + 1;
  $("#onQtot").textContent = ONQ.length;
  $("#onScore").textContent = onScore;
  $("#onTask").innerHTML = "Jaké oxidační číslo má <b>" + q.e + "</b> ve sloučenině <span class=\"chem\" style=\"font-size:1.25em\">" + q.f + "</span>?";
  $("#onOpts").innerHTML = q.o.map(function(o){
    return '<button class="btn" type="button" data-o="' + o + '" style="justify-content:center;font-size:1.02rem">' + o + '</button>';
  }).join("");
  var ex = $("#onExplain");
  ex.style.display = "none"; ex.innerHTML = "";
  $("#onNext").disabled = true;
  onAns = false;
  $$("#onOpts button").forEach(function(b){
    b.addEventListener("click", function(){
      if(onAns) return;
      onAns = true;
      var ok = b.dataset.o === q.a;
      if(ok) onScore++;
      $("#onScore").textContent = onScore;
      $$("#onOpts button").forEach(function(x){
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
      $("#onNext").disabled = (onI >= ONQ.length - 1);
      if(onI >= ONQ.length - 1){
        toast("Trenažér dokončen: " + onScore + " z " + ONQ.length + " správně.");
        if(onScore >= 12) markDone("k2");
      }
    });
  });
}
function initOn(){
  $("#onNext").addEventListener("click", function(){ if(onI < ONQ.length - 1){ onI++; drawOn(); } });
  $("#onReset").addEventListener("click", function(){ onI = 0; onScore = 0; drawOn(); });
  drawOn();
}

/* ============================================================
   10 · k3 — GRAF TRENDŮ VE SKUPINĚ 17
   ============================================================ */
var trKey = "tv";
var TRDEF = {
  tv:   {lab:"teplota varu", unit:"°C", dec:1, lo:-230, hi:360, up:true,
         say:"Teploty varu <b>rostou</b> dolů skupinou. Molekuly jsou větší a lépe polarizovatelné, takže mezi nimi působí silnější Londonovy disperzní síly. Odtud dvě skupenství plynná, jedno kapalné a jedno pevné."},
  tt:   {lab:"teplota tání", unit:"°C", dec:1, lo:-240, hi:330, up:true,
         say:"Stejný důvod jako u teploty varu — čím větší molekula, tím silnější disperzní přitažlivost, tím vyšší teplota tání. Řada je dokonale monotónní."},
  D:    {lab:"vazebná energie X—X", unit:"kJ·mol⁻¹", dec:1, lo:0, hi:270, up:false,
         say:"<b>Tady se řada zlomí.</b> Od chloru dolů klesá podle očekávání (delší vazba, horší překryv), ale fluor vybočuje dolů: jeho atom je tak malý, že se v molekule F₂ silně odpuzují volné elektronové páry. Proto je F₂ tak reaktivní."},
  en:   {lab:"elektronegativita", unit:"", dec:2, lo:0, hi:4.2, up:false,
         say:"Elektronegativita <b>klesá</b> dolů skupinou. Valenční slupka je dál od jádra a lépe odstíněná, takže atom vazebné elektrony přitahuje slaběji. Fluor je s hodnotou 3,98 nejelektronegativnější prvek vůbec."},
  rcov: {lab:"kovalentní poloměr atomu", unit:"pm", dec:0, lo:0, hi:170, up:true,
         say:"Poloměr <b>roste</b> dolů skupinou, protože přibývají elektronové slupky. Je to nejpravidelnější trend ve skupině a stojí za většinou ostatních."},
  ie:   {lab:"ionizační energie", unit:"kJ·mol⁻¹", dec:0, lo:0, hi:1800, up:false,
         say:"Ionizační energie <b>klesá</b> dolů skupinou. Právě proto tvoří kladná oxidační čísla ochotněji těžší halogeny — z jodu se elektron odtrhne mnohem snáz než z fluoru."},
  E0:   {lab:"standardní redukční potenciál E°(X₂/2X⁻)", unit:"V", dec:2, lo:0, hi:3.1, up:false,
         say:"Oxidační síla <b>klesá</b> dolů skupinou: fluor je nejsilnější chemické oxidační činidlo vůbec, jod nejslabší. Právě proto lehčí halogen vytěsní těžší z jeho soli, a nikdy naopak."}
};
function drawTr(){
  var d = TRDEF[trKey], W = 760, H = 300, s = "";
  var x0 = 70, x1 = 700, y0 = 40, y1 = 220;
  function yf(v){ return y1 - (v - d.lo)/(d.hi - d.lo)*(y1 - y0); }
  s += txt(14, 20, d.lab.toUpperCase() + (d.unit ? " [" + d.unit + "]" : ""), {size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  s += line(x0, y1, x1, y1, {c:"var(--line-strong)",w:1.4});
  for(var k=0;k<=4;k++){
    var v = d.lo + k*(d.hi - d.lo)/4;
    s += line(x0, yf(v), x1, yf(v), {c:"var(--grid)",w:1,dash:"3 4"});
    s += txt(x0-8, yf(v)+4, fmt(v, d.dec), {size:10,anchor:"end",fill:"var(--ink-3)",mono:true});
  }
  if(d.lo < 0 && d.hi > 0) s += line(x0, yf(0), x1, yf(0), {c:"var(--line-strong)",w:1.2});
  var n = HAL.length, step = (x1-x0)/n, bw = Math.min(58, step*0.52);
  var pts = [];
  HAL.forEach(function(e,i){
    var cx = x0 + step*(i+0.5), v = e[trKey];
    var yv = yf(v), yb = (d.lo < 0 && d.hi > 0) ? yf(0) : y1;
    pts.push(cx.toFixed(1) + "," + yv.toFixed(1));
    var est = (e.s === "At");
    var bhh = Math.abs(yb - yv);
    s += rect(cx-bw/2, Math.min(yv, yb), bw, bhh, {fill:e.col, r:5, style: est ? "fill-opacity:.35" : "fill-opacity:.85"});
    var down = (yv > yb);
    var vy = down ? (bhh > 26 ? yb + 17 : yv + 16) : yv - 8;
    var vc = (down && bhh > 26) ? "var(--paper)" : e.col;
    s += txt(cx, vy, fmt(v, d.dec), {size:11,w:700,anchor:"middle",fill:vc,mono:true});
    s += txt(cx, y1+22, e.s, {size:13.5,w:700,anchor:"middle",fill:e.col});
    if(est) s += txt(cx, y1+38, "odhad", {size:9.5,anchor:"middle",fill:"var(--ink-3)"});
  });
  s += '<polyline points="'+pts.join(" ")+'" style="fill:none;stroke:var(--ink-2);stroke-width:2;stroke-dasharray:5 4"/>';
  s += txt(14, y1+62, "sloupce = hodnota veličiny · čárkovaná spojnice ukazuje, jestli je trend pravidelný",
           {size:10.5,fill:"var(--ink-3)"});
  $("#trWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Graf veličiny '+d.lab+' pro halogeny"');

  var vals = HAL.slice(0,4).map(function(e){ return e[trKey]; });
  var mono = (vals[0] < vals[1] && vals[1] < vals[2] && vals[2] < vals[3]) || (vals[0] > vals[1] && vals[1] > vals[2] && vals[2] > vals[3]);
  function ro(id,k,v,hh){ var e=$(id); e.className="readout"; e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+hh+'</span>'; }
  ro("#trRo1","Fluor", fmt(HAL[0][trKey], d.dec) + " " + d.unit, "začátek řady");
  ro("#trRo2","Jod", fmt(HAL[3][trKey], d.dec) + " " + d.unit, "konec řady (bez astatu)");
  ro("#trRo3","Průběh F → I", mono ? "monotónní" : "s anomálií", mono ? "trend nikde nevybočuje" : "řada se u některého prvku zlomí — hledejte, kde");
  $("#trOut").innerHTML = d.say;
}
function initTr(){
  $$("#trSeg button").forEach(function(b){
    b.addEventListener("click", function(){
      trKey = b.dataset.v;
      $$("#trSeg button").forEach(function(x){ x.setAttribute("aria-pressed", x.dataset.v===trKey); });
      drawTr();
    });
  });
  drawTr();
}

/* ============================================================
   11 · k3 — ČTYŘI ZKUMAVKY
   ============================================================ */
var zkT = 25;
function drawZk(){
  var W = 760, H = 300, s = "";
  s += txt(14, 16, "SKUPENSTVÍ HALOGENŮ PŘI " + fmt(zkT,0) + " °C", {size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  var x0 = 90, gap = 165, tw = 84, ty = 56, th = 190;
  var stavy = [];
  HAL.slice(0,4).forEach(function(e,i){
    var x = x0 + i*gap;
    var st = zkT < e.tt ? "pevná látka" : (zkT < e.tv ? "kapalina" : "plyn");
    stavy.push(st);
    /* zkumavka */
    s += '<path d="M'+x+' '+ty+' L'+x+' '+(ty+th-26)+' A'+(tw/2)+' '+(tw/2)+' 0 0 0 '+(x+tw)+' '+(ty+th-26)+' L'+(x+tw)+' '+ty+'" style="fill:var(--surface);stroke:var(--line-strong);stroke-width:2"/>';
    /* obsah */
    if(st === "plyn"){
      s += '<path d="M'+(x+2)+' '+(ty+2)+' L'+(x+2)+' '+(ty+th-27)+' A'+(tw/2-2)+' '+(tw/2-2)+' 0 0 0 '+(x+tw-2)+' '+(ty+th-27)+' L'+(x+tw-2)+' '+(ty+2)+' Z" style="fill:'+e.col+';fill-opacity:.30"/>';
      for(var d=0;d<7;d++){
        var px = x + 12 + (d*13)%(tw-24), py = ty + 20 + ((d*37)%(th-70));
        s += '<circle cx="'+px+'" cy="'+py+'" r="3.4" style="fill:'+e.col+';fill-opacity:.85"/>';
      }
    } else if(st === "kapalina"){
      var lh = 92;
      s += '<path d="M'+(x+2)+' '+(ty+th-27-lh)+' L'+(x+2)+' '+(ty+th-27)+' A'+(tw/2-2)+' '+(tw/2-2)+' 0 0 0 '+(x+tw-2)+' '+(ty+th-27)+' L'+(x+tw-2)+' '+(ty+th-27-lh)+' Z" style="fill:'+e.col+';fill-opacity:.72"/>';
      s += line(x+2, ty+th-27-lh, x+tw-2, ty+th-27-lh, {c:e.col,w:2.4});
      for(var d2=0;d2<4;d2++){
        s += '<circle cx="'+(x+16+d2*17)+'" cy="'+(ty+th-27-lh-24-((d2*13)%20))+'" r="3" style="fill:'+e.col+';fill-opacity:.5"/>';
      }
    } else {
      var sh = 52;
      s += '<path d="M'+(x+2)+' '+(ty+th-27-sh)+' L'+(x+2)+' '+(ty+th-27)+' A'+(tw/2-2)+' '+(tw/2-2)+' 0 0 0 '+(x+tw-2)+' '+(ty+th-27)+' L'+(x+tw-2)+' '+(ty+th-27-sh)+' Z" style="fill:'+e.col+';fill-opacity:.88"/>';
      for(var d3=0;d3<5;d3++){
        s += rect(x+10+d3*14, ty+th-27-sh-8+((d3*7)%10), 11, 9, {fill:e.col, r:2});
      }
    }
    s += txt(x+tw/2, ty-14, e.s + "₂", {size:15,w:700,anchor:"middle",fill:e.col});
    s += txt(x+tw/2, ty+th+8, st, {size:12,w:700,anchor:"middle",fill:e.col});
    s += txt(x+tw/2, ty+th+24, "t.t. " + fmt(e.tt,1), {size:10,anchor:"middle",fill:"var(--ink-3)",mono:true});
    s += txt(x+tw/2, ty+th+38, "t.v. " + fmt(e.tv,1), {size:10,anchor:"middle",fill:"var(--ink-3)",mono:true});
  });
  $("#zkWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Čtyři zkumavky s halogeny při teplotě '+zkT+' °C"');

  var cnt = {plyn:0, kapalina:0};
  stavy.forEach(function(x){ if(x === "plyn") cnt.plyn++; else if(x === "kapalina") cnt.kapalina++; });
  var pev = 4 - cnt.plyn - cnt.kapalina;
  function ro(id,k,v,hh){ var e=$(id); e.className="readout"; e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+hh+'</span>'; }
  ro("#zkRo1","Rozdělení skupenství", cnt.plyn + " plynné · " + cnt.kapalina + " kapalné · " + pev + " pevné", "při " + fmt(zkT,0) + " °C");
  ro("#zkRo2","Barvy", "F₂ světle žlutý · Cl₂ žlutozelený · Br₂ červenohnědý · I₂ šedočerný", "barva tmavne dolů skupinou");
  var m;
  if(zkT >= 20 && zkT <= 30) m = "<b>Tohle je obrázek k zapamatování:</b> dva plyny (F₂, Cl₂), jedna kapalina (Br₂) a jedna pevná látka (I₂). Brom je vedle rtuti jediný prvek kapalný za laboratorní teploty — a jediný kapalný nekov.";
  else if(zkT < -220) m = "Pod −219,6 °C ztuhne i fluor. Všechny čtyři halogeny jsou pevné — jsou to molekulové krystaly držené jen disperzními silami.";
  else if(zkT < -101.5) m = "Fluor je plynný, chlor už zkapalněl nebo ztuhl. Všimněte si, o kolik dřív než ostatní fluor taje a vře — jeho molekula je nejmenší, a tedy nejméně polarizovatelná.";
  else if(zkT < -7.2) m = "Brom je ještě pevný, chlor je kapalný nebo plynný. Do laboratorní teploty chybí necelých osm stupňů — brom taje při −7,2 °C.";
  else if(zkT > 184.3) m = "Nad 184,3 °C je plynné <b>všechno</b>, včetně jodu. Jeho fialové páry jsou nejnápadnější barvou v celé skupině.";
  else if(zkT > 113.7) m = "Jod roztál (113,7 °C), ale ještě nevře. V praxi se s kapalným jodem skoro nepracuje — za normálního tlaku raději sublimuje.";
  else m = "Fluor a chlor jsou plynné, brom kapalný, jod pevný — pořadí skupenství kopíruje pořadí v tabulce shora dolů.";
  $("#zkOut").innerHTML = m;
}
function initZk(){
  $("#zkT").addEventListener("input", function(){
    zkT = +this.value; $("#zkTv").textContent = fmt(zkT,0) + " °C"; drawZk();
  });
  drawZk();
}

/* ============================================================
   12 · k4 — ROZHODOVAČ VYTĚSŇOVACÍ REAKCE
   ============================================================ */
var vtX = "Cl", vtY = "I";
function drawVt(){
  var a = halBy(vtX), b = halBy(vtY);
  var W = 760, H = 230, s = "";
  var x0 = 80, x1 = 700, y0 = 46, y1 = 160;
  var lo = 0, hi = 3.0;
  function yf(v){ return y1 - (v - lo)/(hi - lo)*(y1 - y0); }
  s += txt(14, 20, "ŽEBŘÍČEK OXIDAČNÍ SÍLY · E°(X₂/2X⁻) VE V", {size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  s += line(x0, y1, x1, y1, {c:"var(--line-strong)",w:1.4});
  for(var v=0; v<=3; v+=0.5){
    s += line(x0, yf(v), x1, yf(v), {c:"var(--grid)",w:1,dash:"3 4"});
    s += txt(x0-8, yf(v)+4, fmt(v,1), {size:10,anchor:"end",fill:"var(--ink-3)",mono:true});
  }
  var n = HAL.length, step = (x1-x0)/n;
  HAL.forEach(function(e,i){
    var cx = x0 + step*(i+0.5), role = (e.s === vtX) ? "ox" : ((e.s === vtY) ? "red" : "");
    var col = role === "ox" ? "var(--exo)" : (role === "red" ? "var(--endo)" : "var(--line-strong)");
    s += rect(cx-26, yf(e.E0), 52, y1-yf(e.E0), {fill:col, r:5, style: role ? "fill-opacity:.85" : "fill-opacity:.30"});
    s += txt(cx, yf(e.E0)-8, sgn(e.E0,2), {size:11,w:700,anchor:"middle",fill: role ? col : "var(--ink-3)", mono:true});
    s += txt(cx, y1+20, e.s + "₂", {size:13,w:700,anchor:"middle",fill: role ? col : "var(--ink-2)"});
    if(role) s += txt(cx, y1+36, role === "ox" ? "přidáváme" : "v roztoku", {size:9.5,anchor:"middle",fill:col});
  });
  var dE = a.E0 - b.E0, ok = dE > 0;
  s += chip(x1-170, y0-20, 168, 26, "ΔE° = " + sgn(dE,2) + " V → " + (ok ? "proběhne" : "neproběhne"),
            ok ? "var(--ok)" : "var(--bad)", ok ? "var(--ok-soft)" : "var(--bad-soft)");
  $("#vtWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Žebříček oxidační síly halogenů s vyznačenou dvojicí"');

  var sub = {F:"", Cl:"", Br:"", I:""};
  var eqTxt, ionTxt;
  if(a.s === b.s){
    eqTxt = "Vyberte dva <b>různé</b> halogeny.";
    ionTxt = "";
  } else if(ok){
    eqTxt = "<b>Molekulárně:</b> <span class=\"chem\">" + a.s + "₂ + 2 K" + b.s + " → 2 K" + a.s + " + " + b.s + "₂</span>";
    ionTxt = "<b>Iontově:</b> <span class=\"chem\">" + a.s + "₂ + 2 " + b.s + "⁻ → 2 " + a.s + "⁻ + " + b.s + "₂</span> &nbsp;·&nbsp; draselný kationt je jen divák.";
  } else {
    eqTxt = "<b>Reakce neproběhne:</b> <span class=\"chem\">" + a.s + "₂ + K" + b.s + " → nereaguje</span>";
    ionTxt = "Opačným směrem by ale proběhla: <span class=\"chem\">" + b.s + "₂ + 2 " + a.s + "⁻ → 2 " + b.s + "⁻ + " + a.s + "₂</span> s ΔE° = " + sgn(-dE,2) + " V.";
  }
  $("#vtEq").innerHTML = eqTxt;
  $("#vtIon").innerHTML = ionTxt;
  var logK = 2*dE/NERNST;
  function ro(id,k,v,hh){ var e=$(id); e.className="readout " + (ok ? "pos" : "neg"); e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+hh+'</span>'; }
  ro("#vtRo1","ΔE° = E°(ox) − E°(red)", sgn(dE,2) + " V", sgn(a.E0,2) + " − " + sgn(b.E0,2));
  ro("#vtRo2","Rovnovážná konstanta", (a.s === b.s) ? "—" : ("K ≈ 10" + supNum(Math.round(logK))), "log K = z·ΔE°/0,0592 při z = 2");
  ro("#vtRo3","Závěr", (a.s === b.s) ? "—" : (ok ? "proběhne" : "neproběhne"), ok ? "silnější halogen vytěsní slabší" : "slabší halogen silnější nevytěsní nikdy");
  var m;
  if(a.s === b.s) m = "Vyberte prosím dva různé halogeny.";
  else if(a.s === "F") m = "<b>Pozor na past:</b> fluor by sice bromid i jodid zoxidoval, ale ve vodném roztoku se nikdy nedostane ke slovu — nejdřív zoxiduje samotnou vodu (<span class=\"chem\">2 F₂ + 2 H₂O → 4 HF + O₂</span>). Vytěsňovací pokusy s fluorem se ve vodě dělat nedají.";
  else if(ok && b.s === "I" && a.s === "Cl") m = "Roztok zhnědne vyloučeným jodem a se škrobem zmodrá. <b>Ale pozor na nadbytek chloru:</b> ten jod dál zoxiduje na bezbarvou kyselinu jodičnou (<span class=\"chem\">5 Cl₂ + I₂ + 6 H₂O → 2 HIO₃ + 10 HCl</span>) a hnědá barva zase zmizí.";
  else if(ok) m = "Kladné ΔE° znamená samovolný průběh. Vytěsněný halogen se dá dokázat vytřepáním do chloroformu — brom se zbarví oranžově, jod fialově.";
  else m = "Záporné ΔE° znamená, že reakce takto neproběhne. Slabší oxidační činidlo nikdy nevytěsní silnější — v Beketovově řadě halogenů se vždy jde jen zleva doprava.";
  $("#vtOut").innerHTML = m;
}
function supNum(k){
  var map = {"-":"⁻","0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹"};
  return String(k).split("").map(function(c){ return map[c] || c; }).join("");
}
function initVt(){
  var sx = $("#vtX"), sy = $("#vtY");
  var opts = HAL.slice(0,4);
  sx.innerHTML = opts.map(function(e){ return '<option value="'+e.s+'"'+(e.s===vtX?" selected":"")+'>'+e.s+'₂ ('+e.nm+')</option>'; }).join("");
  sy.innerHTML = opts.map(function(e){ return '<option value="'+e.s+'"'+(e.s===vtY?" selected":"")+'>K'+e.s+' ('+e.nm+'id draselný)</option>'; }).join("");
  sx.addEventListener("change", function(){ vtX = this.value; drawVt(); });
  sy.addEventListener("change", function(){ vtY = this.value; drawVt(); });
  drawVt();
}

/* ============================================================
   13 · k4 — HALOGEN DO VODY A DO LOUHU
   ============================================================ */
var dpX = "Cl", dpM = "voda";
function dpData(){
  var h = halBy(dpX);
  if(dpX === "F"){
    if(dpM === "voda") return {eq:"2 F₂ + 2 H₂O → 4 HF + O₂", prod:"HF + O₂", ox:"jen −I", disp:false,
      say:"Fluor <b>nedisproporcionuje</b> — nemůže, protože nikdy nemá kladné oxidační číslo. Místo toho vodu prostě zoxiduje a uvolní kyslík. ΔE° = 2,87 − 1,23 = +1,64 V."};
    if(dpM === "stud") return {eq:"2 F₂ + 2 NaOH → OF₂ + 2 NaF + H₂O", prod:"OF₂ + NaF", ox:"jen −I", disp:false,
      say:"Ve zředěném studeném louhu vzniká <b>fluorid kyslíku</b>. Všimněte si názvu: kladné oxidační číslo (+II) tu má kyslík, ne fluor."};
    return {eq:"2 F₂ + 4 NaOH → O₂ + 4 NaF + 2 H₂O", prod:"O₂ + NaF", ox:"jen −I", disp:false,
      say:"V koncentrovanějším louhu se uvolní rovnou kyslík. Ať uděláte cokoli, fluor skončí vždy jako fluorid — jinou možnost nemá."};
  }
  var X = h.s, low = X.toLowerCase();
  if(dpM === "voda"){
    var K = {Cl:"4,2·10⁻⁴", Br:"7,2·10⁻⁹", I:"2,0·10⁻¹³"}[X];
    return {eq:X+"₂ + H₂O ⇌ H"+X+" + H"+X+"O", prod:"H"+X+" + H"+X+"O", ox:"−I a +I", disp:true,
      say:"Částečná disproporcionace: polovina atomů klesne na −I, polovina stoupne na +I. Rovnovážná konstanta je <b>K = "+K+"</b> — čím těžší halogen, tím víc je rovnováha vlevo. Jod s vodou prakticky nereaguje vůbec."};
  }
  if(dpM === "stud"){
    return {eq:X+"₂ + 2 NaOH → Na"+X+" + Na"+X+"O + H₂O", prod:"halogenid + "+({Cl:"chlornan",Br:"bromnan",I:"jodnan"}[X]), ox:"−I a +I", disp:true,
      say:"Ve <b>studeném</b> zředěném louhu se disproporcionace zastaví u oxidačního čísla +I. U chloru je produktem chlornan sodný — obchodně <b>savo</b>. Poměr je 1 : 1, protože chlor jde o jeden stupeň nahoru i dolů."};
  }
  return {eq:"3 "+X+"₂ + 6 NaOH → 5 Na"+X+" + Na"+X+"O₃ + 3 H₂O", prod:"halogenid + "+({Cl:"chlorečnan",Br:"bromičnan",I:"jodičnan"}[X]), ox:"−I a +V", disp:true,
    say:"V <b>horkém koncentrovaném</b> louhu je meziprodukt (číslo +I) nestálý a sám dál disproporcionuje. Chlor tedy stoupne rovnou na +V. Poměr je teď 5 : 1, protože jeden atom nahoru o pět vyváží pět atomů dolů o jeden."};
}
function drawDp(){
  var h = halBy(dpX), d = dpData();
  var W = 760, H = 240, s = "";
  var cx = 130, cy = 118;
  s += txt(14, 20, "DISPROPORCIONACE — KAM SE ATOMY ROZDĚLÍ", {size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  /* výchozí halogen */
  s += '<circle cx="'+cx+'" cy="'+cy+'" r="40" style="fill:'+h.col+';fill-opacity:.30;stroke:'+h.col+';stroke-width:2.2"/>';
  s += txt(cx, cy+7, h.s+"₂", {size:19,w:700,anchor:"middle",fill:h.col});
  s += txt(cx, cy+62, "oxidační číslo 0", {size:11,anchor:"middle",fill:"var(--ink-3)"});
  /* prostředí */
  var mlab = {voda:"voda", stud:"studený zředěný NaOH", hor:"horký koncentrovaný NaOH"}[dpM];
  s += chip(cx-70, 34, 140, 24, mlab.length > 18 ? "horký konc. NaOH" : mlab, "var(--accent)", "var(--accent-soft)");
  if(d.disp){
    /* dvě větve */
    s += hArrow(cx+46, 330, cy-42, "var(--endo)", "redukce", true);
    s += hArrow(cx+46, 330, cy+42, "var(--exo)", "oxidace", false);
    s += rect(336, cy-70, 176, 52, {fill:"var(--endo)", r:9, style:"fill-opacity:.18", stroke:"var(--endo)", sw:1.6});
    s += txt(424, cy-48, h.s+"⁻", {size:16,w:700,anchor:"middle",fill:"var(--endo)"});
    s += txt(424, cy-30, "oxidační číslo −I", {size:10.5,anchor:"middle",fill:"var(--endo)"});
    var hi = (dpM === "hor") ? "+V" : "+I";
    var hif = (dpM === "hor") ? (h.s+"O₃⁻") : (h.s+"O⁻");
    s += rect(336, cy+18, 176, 52, {fill:"var(--exo)", r:9, style:"fill-opacity:.18", stroke:"var(--exo)", sw:1.6});
    s += txt(424, cy+40, hif, {size:16,w:700,anchor:"middle",fill:"var(--exo)"});
    s += txt(424, cy+58, "oxidační číslo " + hi, {size:10.5,anchor:"middle",fill:"var(--exo)"});
    /* poměr */
    var pom = (dpM === "hor") ? "5 : 1" : "1 : 1";
    s += chip(560, cy-14, 180, 28, "poměr −I : " + hi + " = " + pom, "var(--ink-2)", "var(--surface-2)");
    s += txt(650, cy+34, "z elektronové bilance", {size:10.5,anchor:"middle",fill:"var(--ink-3)"});
  } else {
    s += hArrow(cx+46, 340, cy, "var(--bad)", "žádná disproporcionace", true);
    s += rect(346, cy-30, 300, 60, {fill:"var(--bad)", r:9, style:"fill-opacity:.14", stroke:"var(--bad)", sw:1.6});
    s += txt(496, cy-4, "fluor zůstane vždy na −I", {size:14,w:700,anchor:"middle",fill:"var(--bad)"});
    s += txt(496, cy+18, "kladné oxidační číslo nemá jak získat", {size:10.5,anchor:"middle",fill:"var(--ink-2)"});
  }
  $("#dpWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Schéma disproporcionace halogenu v daném prostředí"');

  $("#dpEq").innerHTML = "<b>Rovnice:</b> <span class=\"chem\">" + d.eq + "</span>";
  function ro(id,k,v,hh){ var e=$(id); e.className="readout"; e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+hh+'</span>'; }
  ro("#dpRo1","Produkty", d.prod, "prostředí: " + mlab);
  ro("#dpRo2","Oxidační čísla halogenu", d.ox, d.disp ? "táž látka se zároveň oxiduje i redukuje" : "fluor kladné oxidační číslo nemá nikdy");
  $("#dpOut").innerHTML = d.say;
}
function initDp(){
  var sel = $("#dpX");
  sel.innerHTML = HAL.slice(0,4).map(function(e){ return '<option value="'+e.s+'"'+(e.s===dpX?" selected":"")+'>'+e.s+'₂ ('+e.nm+')</option>'; }).join("");
  sel.addEventListener("change", function(){ dpX = this.value; drawDp(); });
  $$("#dpSeg button").forEach(function(b){
    b.addEventListener("click", function(){
      dpM = b.dataset.v;
      $$("#dpSeg button").forEach(function(x){ x.setAttribute("aria-pressed", x.dataset.v===dpM); });
      drawDp();
    });
  });
  drawDp();
}
