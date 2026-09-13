/* ============================================================
   2 · HERO — tři vazebné možnosti vodíku
   ============================================================ */
var ENH = 2.20;              /* elektronegativita vodíku */

var PART = [
 {id:"K",  nm:"draslík",   en:0.82, typ:"i", ox:"−I", f:"KH",
  pop:"Rozdíl elektronegativit je tak velký, že elektronový pár patří výhradně vodíku. Vzniká skutečná iontová mřížka z&nbsp;kationtů K⁺ a&nbsp;aniontů H⁻.",
  eq:"2 K + H₂ → 2 KH", eq2:"KH + H₂O → KOH + H₂ &nbsp;(prudce, samozápalné)"},
 {id:"Na", nm:"sodík",     en:0.93, typ:"i", ox:"−I", f:"NaH",
  pop:"Klasický iontový hydrid. Krystalová mřížka je stejná jako u&nbsp;chloridu sodného — aniont H⁻ zastane roli chloridu.",
  eq:"2 Na + H₂ → 2 NaH", eq2:"NaH + H₂O → NaOH + H₂"},
 {id:"Ca", nm:"vápník",    en:1.00, typ:"i", ox:"−I", f:"CaH₂",
  pop:"Dvojmocný kov, takže na jeden kation připadají dva anionty H⁻. Prodává se jako sušidlo a&nbsp;polní zdroj vodíku pod názvem hydrolit.",
  eq:"Ca + H₂ → CaH₂", eq2:"CaH₂ + 2 H₂O → Ca(OH)₂ + 2 H₂"},
 {id:"Mg", nm:"hořčík",    en:1.31, typ:"p", ox:"−I", f:"MgH₂",
  pop:"Přechodná oblast: podíl kovalentnosti je už značný. Monomerní molekula by byla elektronově deficitní, proto látka polymeruje a&nbsp;drží se třístředovými vazbami.",
  eq:"Mg + H₂ → MgH₂ &nbsp;(vyšší tlak a&nbsp;teplota)", eq2:"MgH₂ + 2 H₂O → Mg(OH)₂ + 2 H₂"},
 {id:"Ti", nm:"titan",     en:1.54, typ:"m", ox:"−I", f:"TiH₂",
  pop:"Přechodný kov. Orbital 1s vodíku se zapojí do delokalizované kovové vazby a&nbsp;atomy vodíku sedí v&nbsp;dutinách mřížky. Látka dál vede elektrický proud.",
  eq:"Ti + H₂ → TiH₂", eq2:"zahřátím se rozklad obrátí: TiH₂ → Ti + H₂"},
 {id:"Al", nm:"hliník",    en:1.61, typ:"p", ox:"−I", f:"AlH₃",
  pop:"Polymerní kovalentní hydrid (alan). Vodík je formálně −I, ale mřížka iontová není — je to řetězec s&nbsp;můstkovými atomy vodíku.",
  eq:"nevzniká přímo z&nbsp;prvků, připravuje se z&nbsp;LiAlH₄", eq2:"AlH₃ + 3 H₂O → Al(OH)₃ + 3 H₂"},
 {id:"B",  nm:"bor",       en:2.04, typ:"k", ox:"−I", f:"B₂H₆",
  pop:"Rozdíl elektronegativit je jen 0,16 — vazba B–H je téměř nepolární. Molekula je elektronově deficitní a&nbsp;drží ji dvě třístředové dvouelektronové vazby B–H–B.",
  eq:"2 BF₃ + 6 NaH → B₂H₆ + 6 NaF", eq2:"B₂H₆ + 6 H₂O → 2 H₃BO₃ + 6 H₂"},
 {id:"C",  nm:"uhlík",     en:2.55, typ:"k", ox:"+I", f:"CH₄",
  pop:"Rozdíl je malý a&nbsp;kladný, takže vazba C–H je jen slabě polární. Právě proto jsou uhlovodíky nepolární a&nbsp;ve vodě nerozpustné.",
  eq:"C + 2 H₂ → CH₄ &nbsp;(za katalýzy, prakticky se nedělá)", eq2:"CH₄ + H₂O → CO + 3 H₂ &nbsp;(parní reforming)"},
 {id:"Cl", nm:"chlor",     en:3.16, typ:"k", ox:"+I", f:"HCl",
  pop:"Výrazně polární kovalentní vazba. Ve vodě chlorovodík úplně disociuje na H₃O⁺ a&nbsp;Cl⁻ — ale to je až vlastnost roztoku, ne samotné molekuly.",
  eq:"H₂ + Cl₂ → 2 HCl &nbsp;(po osvícení explozivně)", eq2:"HCl + H₂O → H₃O⁺ + Cl⁻"},
 {id:"N",  nm:"dusík",     en:3.04, typ:"k", ox:"+I", f:"NH₃",
  pop:"Polární vazba plus volný elektronový pár na dusíku znamenají vodíkové můstky — proto amoniak vře o&nbsp;54&nbsp;°C výš než fosfan.",
  eq:"N₂ + 3 H₂ ⇌ 2 NH₃ &nbsp;(Haber–Bosch)", eq2:"NH₃ + H₂O ⇌ NH₄⁺ + OH⁻"},
 {id:"O",  nm:"kyslík",    en:3.44, typ:"k", ox:"+I", f:"H₂O",
  pop:"Dva vodíky a&nbsp;dva volné elektronové páry na kyslíku umožňují čtyři vodíkové můstky současně. Odtud plynou všechny anomálie vody.",
  eq:"2 H₂ + O₂ → 2 H₂O &nbsp;(třaskavý plyn)", eq2:"2 H₂O ⇌ H₃O⁺ + OH⁻ &nbsp;(autoionizace)"},
 {id:"F",  nm:"fluor",     en:3.98, typ:"k", ox:"+I", f:"HF",
  pop:"Největší možný rozdíl elektronegativit s&nbsp;vodíkem — a&nbsp;vazba je <b>pořád kovalentní</b>. Kation H⁺ je holé jádro, takže iontová mřížka vzniknout nemůže. Právě tenhle případ vyvrací třetí vazebnou možnost.",
  eq:"H₂ + F₂ → 2 HF &nbsp;(i&nbsp;ve tmě, explozivně)", eq2:"HF + H₂O ⇌ H₃O⁺ + F⁻ &nbsp;(slabá kyselina, pKₐ = 3,17)"}
];

var TYPNM = {
  i:{nm:"iontový hydrid", c:"var(--exo)", d:"kationt kovu + aniont H⁻ v&nbsp;krystalové mřížce"},
  k:{nm:"kovalentní vazba", c:"var(--endo)", d:"sdílený elektronový pár, polarita podle Δ<span class=\"q\">X</span>"},
  m:{nm:"kovový hydrid", c:"var(--cat2)", d:"orbital 1s se zapojí do delokalizované kovové vazby"},
  p:{nm:"přechodná oblast", c:"var(--cat3)", d:"polymerní struktura s&nbsp;třístředovými vazbami"}
};

var hbState = {p:"F", mode:"en"};

function hbFind(id){ for(var i=0;i<PART.length;i++){ if(PART[i].id===id) return PART[i]; } return PART[0]; }

function drawHero(){
  var p = hbFind(hbState.p), dx = p.en - ENH, T = TYPNM[p.typ];
  var W=780, H=320, s="";
  if(hbState.mode==="en"){
    /* --- stupnice elektronegativit --- */
    var L=70, R=730, Y=150, xmin=0.7, xmax=4.1;
    var X = function(v){ return L + (v-xmin)/(xmax-xmin)*(R-L); };
    /* pásma */
    s += rect(X(0.7), Y-34, X(1.25)-X(0.7), 68, {fill:"var(--exo)", r:8, style:"fill-opacity:.13"});
    s += rect(X(1.25), Y-34, X(1.85)-X(1.25), 68, {fill:"var(--cat3)", r:0, style:"fill-opacity:.13"});
    s += rect(X(1.85), Y-34, X(4.1)-X(1.85), 68, {fill:"var(--endo)", r:8, style:"fill-opacity:.13"});
    s += txt(X(0.97), Y-52, "aniont H⁻", {anchor:"middle", size:11.5, w:700, fill:"var(--exo)"});
    s += txt(X(1.55), Y-52, "přechod", {anchor:"middle", size:11.5, w:700, fill:"var(--cat3)"});
    s += txt(X(3.0), Y-52, "kovalentní vazba, vodík má δ⁺", {anchor:"middle", size:11.5, w:700, fill:"var(--endo)"});
    /* osa */
    s += line(L, Y+34, R, Y+34, {c:"var(--line-strong)", w:1.5});
    for(var v=1.0; v<=4.01; v+=0.5){
      s += line(X(v), Y+34, X(v), Y+40, {c:"var(--line-strong)", w:1.2});
      s += txt(X(v), Y+56, fmt(v,1), {anchor:"middle", size:11, fill:"var(--ink-3)", mono:true});
    }
    s += txt((L+R)/2, Y+80, "elektronegativita partnera (Paulingova stupnice)", {anchor:"middle", size:11.5, w:600, fill:"var(--ink-3)", style:"letter-spacing:.06em"});
    /* vodík */
    s += line(X(ENH), Y-40, X(ENH), Y+40, {c:"var(--accent)", w:2, dash:"5 4"});
    s += rect(X(ENH)-30, Y-72, 60, 24, {fill:"var(--accent)", r:6});
    s += txt(X(ENH), Y-55, "H 2,20", {anchor:"middle", size:12, w:700, fill:"var(--accent-ink)", mono:true});
    /* ostatní prvky jako body */
    PART.forEach(function(q, qi){
      var on = q.id===hbState.p;
      s += '<circle cx="'+X(q.en)+'" cy="'+Y+'" r="'+(on?12:6)+'" style="fill:'+(on?TYPNM[q.typ].c:"var(--ink-3)")+';fill-opacity:'+(on?1:.5)+';stroke:var(--surface);stroke-width:2"/>';
      if(on) s += txt(X(q.en), Y+5, q.id, {anchor:"middle", size:11, w:700, fill:"var(--paper)", mono:true});
      else   s += txt(X(q.en), Y-(qi%2?16:32), q.id, {anchor:"middle", size:10, fill:"var(--ink-3)", mono:true});
    });
    /* šipka posunu elektronového páru */
    var x1 = X(ENH), x2 = X(p.en), my = Y+108;
    s += line(x1, my, x2, my, {c:T.c, w:2.5, cap:"round"});
    var d = (x2>x1) ? 1 : -1;
    s += '<path d="M'+x2+' '+my+' l'+(-9*d)+' -5 l0 10 z" style="fill:'+T.c+'"/>';
    s += txt((x1+x2)/2, my-10, "elektronový pár se posune sem", {anchor:"middle", size:11, w:600, fill:T.c});
    s += txt((x1+x2)/2, my+20, "Δ" + "X = " + sgn(dx,2), {anchor:"middle", size:12, w:700, fill:T.c, mono:true});
  } else {
    /* --- schéma vazby --- */
    var cx1=270, cx2=520, cy=140;
    var ionic = (p.typ==="i");
    var rH = ionic ? 52 : 34, rP = ionic ? 40 : 56;
    s += txt(W/2, 34, T.nm.toUpperCase(), {anchor:"middle", size:13, w:700, fill:T.c, style:"letter-spacing:.14em"});
    if(p.typ==="m"){
      /* kovová mřížka s vodíky v dutinách */
      for(var r0=0;r0<3;r0++) for(var c0=0;c0<5;c0++){
        var mx=250+c0*70, my2=90+r0*62;
        s += '<circle cx="'+mx+'" cy="'+my2+'" r="21" style="fill:var(--cat2);fill-opacity:.22;stroke:var(--cat2);stroke-width:1.6"/>';
        s += txt(mx, my2+5, p.id, {anchor:"middle", size:12, w:700, fill:"var(--cat2)", mono:true});
        if(r0<2 && c0<4){
          s += '<circle cx="'+(mx+35)+'" cy="'+(my2+31)+'" r="9" style="fill:var(--accent)"/>';
          s += txt(mx+35, my2+35, "H", {anchor:"middle", size:9.5, w:700, fill:"var(--accent-ink)", mono:true});
        }
      }
      s += txt(W/2, 292, "atomy vodíku sedí v&nbsp;dutinách kovové mřížky, vazba je delokalizovaná", {anchor:"middle", size:12, w:600, fill:"var(--ink-3)"});
    } else if(ionic){
      s += '<circle cx="'+cx1+'" cy="'+cy+'" r="'+rP+'" style="fill:var(--exo);fill-opacity:.18;stroke:var(--exo);stroke-width:2"/>';
      s += txt(cx1, cy+7, p.id+"⁺", {anchor:"middle", size:22, w:700, fill:"var(--exo)"});
      s += '<circle cx="'+cx2+'" cy="'+cy+'" r="'+rH+'" style="fill:var(--accent);fill-opacity:.18;stroke:var(--accent);stroke-width:2"/>';
      s += '<circle cx="'+(cx2-13)+'" cy="'+(cy-6)+'" r="5" style="fill:var(--accent)"/>';
      s += '<circle cx="'+(cx2+13)+'" cy="'+(cy-6)+'" r="5" style="fill:var(--accent)"/>';
      s += txt(cx2, cy+26, "H⁻", {anchor:"middle", size:22, w:700, fill:"var(--accent)"});
      s += txt(cx1, cy+rP+26, "kation kovu", {anchor:"middle", size:11.5, w:600, fill:"var(--exo)"});
      s += txt(cx2, cy+rH+26, "hydridový aniont, dva elektrony v&nbsp;1s", {anchor:"middle", size:11.5, w:600, fill:"var(--accent)"});
      s += txt(W/2, 262, "elektron přešel úplně — vzniká iontová mřížka", {anchor:"middle", size:12.5, w:600, fill:"var(--ink-2)"});
      s += txt(W/2, 286, "vodík má oxidační číslo −I", {anchor:"middle", size:12, w:700, fill:"var(--exo)", mono:true});
    } else {
      /* kovalentní: dva kruhy s překryvem, pár posunutý */
      var shift = Math.max(-1, Math.min(1, dx/1.8));
      var pairX = (cx1+cx2)/2 + shift*52;
      s += '<circle cx="'+cx1+'" cy="'+cy+'" r="42" style="fill:var(--accent);fill-opacity:.12;stroke:var(--accent);stroke-width:2"/>';
      s += txt(cx1-8, cy+7, "H", {anchor:"middle", size:20, w:700, fill:"var(--accent)"});
      s += '<circle cx="'+cx2+'" cy="'+cy+'" r="58" style="fill:'+T.c+';fill-opacity:.12;stroke:'+T.c+';stroke-width:2"/>';
      s += txt(cx2+10, cy+7, p.id, {anchor:"middle", size:20, w:700, fill:T.c});
      s += '<ellipse cx="'+pairX+'" cy="'+cy+'" rx="26" ry="16" style="fill:var(--ink);fill-opacity:.10"/>';
      s += '<circle cx="'+(pairX-9)+'" cy="'+cy+'" r="6" style="fill:var(--ink-2)"/>';
      s += '<circle cx="'+(pairX+9)+'" cy="'+cy+'" r="6" style="fill:var(--ink-2)"/>';
      s += txt(pairX, cy-28, "vazebný elektronový pár", {anchor:"middle", size:11, w:600, fill:"var(--ink-3)"});
      if(Math.abs(dx)>0.25){
        s += txt(cx1-8, cy-56, dx>0 ? "δ⁺" : "δ⁻", {anchor:"middle", size:17, w:700, fill:dx>0?"var(--endo)":"var(--exo)"});
        s += txt(cx2+10, cy-70, dx>0 ? "δ⁻" : "δ⁺", {anchor:"middle", size:17, w:700, fill:dx>0?"var(--exo)":"var(--endo)"});
      } else {
        s += txt((cx1+cx2)/2, cy-70, "prakticky nepolární vazba", {anchor:"middle", size:12, w:600, fill:"var(--ink-3)"});
      }
      s += txt(W/2, 250, "elektronový pár je sdílený, jen posunutý — iontová vazba nevzniká", {anchor:"middle", size:12.5, w:600, fill:"var(--ink-2)"});
      s += txt(W/2, 276, "vodík má oxidační číslo " + p.ox, {anchor:"middle", size:12, w:700, fill:T.c, mono:true});
      if(p.id==="F") s += txt(W/2, 300, "a to i&nbsp;u&nbsp;fluoru, nejelektronegativnějšího prvku tabulky", {anchor:"middle", size:11.5, w:600, fill:"var(--bad)"});
    }
  }
  $("#hbWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Vazebné možnosti vodíku"');
  $("#hbEq").innerHTML = "<b>vznik:</b> <span class=\"chem\">"+p.eq+"</span>";
  $("#hbEq2").innerHTML = "<b>typická reakce:</b> <span class=\"chem\">"+p.eq2+"</span>";
  vvRo("#hbRo1", "Rozdíl elektronegativit", sgn(dx,2), "X("+p.id+") = "+fmt(p.en,2)+" · X(H) = 2,20", dx<0?"neg":"pos");
  vvRo("#hbRo2", "Oxidační číslo vodíku", p.ox, p.ox==="−I" ? "vodík si pár přitáhl" : "pár se posunul k partnerovi", p.ox==="−I"?"neg":"pos");
  vvRo("#hbRo3", "Typ vazby", T.nm, p.f, "");
  $("#hbNote").innerHTML = p.pop;
}

/* společný pomocník pro dlaždice .readout */
function vvRo(sel, k, v, h, cls){
  var el = $(sel); if(!el) return;
  el.className = "readout " + (cls||"");
  el.innerHTML = '<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>';
}

function initHero(){
  var sel = $("#hbSel");
  sel.innerHTML = PART.map(function(q){
    return '<option value="'+q.id+'"'+(q.id===hbState.p?' selected':'')+'>'+q.id+' — '+q.nm+' (X = '+fmt(q.en,2)+')</option>';
  }).join("");
  sel.addEventListener("change", function(){ hbState.p = this.value; drawHero(); });
  $$("#hbMode button").forEach(function(b){
    b.addEventListener("click", function(){
      hbState.mode = b.dataset.v;
      $$("#hbMode button").forEach(function(x){ x.setAttribute("aria-pressed", x.dataset.v===hbState.mode); });
      drawHero();
    });
  });
  drawHero();
}
