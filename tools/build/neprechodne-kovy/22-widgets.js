/* ============================================================
   12 · k4 — VÁPENNÝ CYKLUS
   ============================================================ */
var vcSel="pal";
var NPVC={
  pal:{nm:"Pálení vápence", eq:"CaCO₃ → CaO + CO₂", edge:0, tep:"900 až 1000 °C", dh:"+178 kJ·mol⁻¹", typ:"endo",
    d:"V rotační nebo šachtové peci se vápenec rozkládá na oxid vápenatý a oxid uhličitý. Je to silně endotermický děj, a proto se musí topit. Z jedné tuny vápence vznikne 560 kg páleného vápna a 440 kg oxidu uhličitého."},
  has:{nm:"Hašení vápna", eq:"CaO + H₂O → Ca(OH)₂", edge:1, tep:"probíhá samovolně", dh:"−64 kJ·mol⁻¹", typ:"exo",
    d:"Pálené vápno se zalije vodou a bouřlivě se přemění na hydroxid. Uvolní se tolik tepla, že se voda vaří — jeden kilogram vápna dá 1,15 MJ, což ohřeje 3,4 kg vody o 80 °C."},
  tuh:{nm:"Tuhnutí malty", eq:"Ca(OH)₂ + CO₂ → CaCO₃ + H₂O", edge:2, tep:"laboratorní teplota", dh:"−115 kJ·mol⁻¹", typ:"exo",
    d:"Hašené vápno v maltě pomalu reaguje se vzdušným oxidem uhličitým a mění se zpět na vápenec. Protože musí oxid uhličitý do zdi prodifundovat, tvrdne malta odpovrchu a u silné zdi to trvá i roky."},
  kras:{nm:"Krasové jevy", eq:"CaCO₃ + CO₂ + H₂O ⇌ Ca(HCO₃)₂", edge:-1, tep:"laboratorní teplota", dh:"rovnováha", typ:"rovn",
    d:"Voda nasycená oxidem uhličitým vápenec rozpouští na hydrogenuhličitan. Tatáž rovnováha, čtená opačným směrem, vytváří krápníky i kotelní kámen v konvici — stačí, aby oxid uhličitý unikl nebo se roztok zahřál."}
};
function drawVc(){
  var v=NPVC[vcSel], W=760, H=344, s='';
  s+=npTitle("Vápenný cyklus · "+v.nm);
  if(vcSel==="kras"){
    /* rovnovážné schéma */
    function kbox(cx,f,n,col){
      var o=rect(cx-110,88,220,74,{fill:col,r:11,stroke:col,sw:1.6,style:"fill-opacity:.15"});
      o+=txt(cx,124,f,{anchor:"middle",size:19,w:700,fill:col});
      o+=txt(cx,148,n,{anchor:"middle",size:11,fill:"var(--ink-3)"});
      return o;
    }
    s+=kbox(170,"CaCO₃","vápenec — nerozpustný","var(--endo)");
    s+=kbox(590,"Ca(HCO₃)₂","hydrogenuhličitan — rozpustný","var(--exo)");
    s+=npArrow(292,116,468,116,"var(--accent)",2.2);
    s+=npArrow(468,140,292,140,"var(--accent)",2.2);
    s+=txt(380,100,"+ CO₂ + H₂O",{anchor:"middle",size:12,w:700,fill:"var(--accent)"});
    s+=txt(380,164,"únik CO₂ nebo zahřátí",{anchor:"middle",size:12,w:700,fill:"var(--accent)"});
    s+=txt(380,214,"doprava: rozpouštění horniny — vznikají jeskyně a propasti",{anchor:"middle",size:12.5,fill:"var(--ink-2)"});
    s+=txt(380,240,"doleva: srážení uhličitanu — vznikají krápníky a kotelní kámen",{anchor:"middle",size:12.5,fill:"var(--ink-2)"});
    s+=txt(380,272,"tatáž rovnováha stojí i za přechodnou tvrdostí vody",{anchor:"middle",size:12,w:700,fill:"var(--accent)"});
    s+=txt(380,308,"rozpustnost CaCO₃ v čisté vodě = 5,8·10⁻⁵ mol·dm⁻³",{anchor:"middle",size:11.5,fill:"var(--ink-3)"});
  } else {
    var nodes=[{cx:380,cy:84,f:"CaCO₃",n:"vápenec"},
               {cx:170,cy:246,f:"CaO",n:"pálené vápno"},
               {cx:590,cy:246,f:"Ca(OH)₂",n:"hašené vápno"}];
    var edges=[[0,1],[1,2],[2,0]];
    var elab=["pálení v peci","hašení vodou","tuhnutí na vzduchu"];
    var i;
    for(i=0;i<3;i++){
      var a=nodes[edges[i][0]], b=nodes[edges[i][1]], on=(i===v.edge);
      var col=on?"var(--accent)":"var(--line-strong)";
      var dx=b.cx-a.cx, dy=b.cy-a.cy, L=Math.sqrt(dx*dx+dy*dy);
      var ax=a.cx+dx/L*96, ay=a.cy+dy/L*44, bx=b.cx-dx/L*96, by=b.cy-dy/L*44;
      s+=npArrow(ax,ay,bx,by,col,on?2.8:1.8);
    }
    /* popisky hran na pevných místech */
    s+=txt(246,150,elab[0],{anchor:"end",size:11.5,w:v.edge===0?700:500,fill:v.edge===0?"var(--accent)":"var(--ink-3)"});
    s+=txt(246,170,"900 až 1000 °C",{anchor:"end",size:10.5,fill:"var(--ink-3)"});
    s+=txt(380,228,elab[1],{anchor:"middle",size:11.5,w:v.edge===1?700:500,fill:v.edge===1?"var(--accent)":"var(--ink-3)"});
    s+=txt(380,250,"uvolní se 64 kJ·mol⁻¹",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
    s+=txt(514,150,elab[2],{size:11.5,w:v.edge===2?700:500,fill:v.edge===2?"var(--accent)":"var(--ink-3)"});
    s+=txt(514,170,"vzdušný CO₂, trvá týdny",{size:10.5,fill:"var(--ink-3)"});
    for(i=0;i<3;i++){
      var nd=nodes[i], hot=(v.edge===i)||(v.edge===(i+2)%3);
      var ncol=hot?"var(--accent)":"var(--ink-2)";
      s+=rect(nd.cx-92,nd.cy-32,184,64,{fill:hot?"var(--accent)":"var(--surface-2)",r:11,
        stroke:hot?"var(--accent)":"var(--line)",sw:hot?2:1,style:"fill-opacity:"+(hot?".16":".65")});
      s+=txt(nd.cx,nd.cy-4,nd.f,{anchor:"middle",size:17,w:700,fill:ncol});
      s+=txt(nd.cx,nd.cy+20,nd.n,{anchor:"middle",size:11,fill:"var(--ink-3)"});
    }
    s+=txt(380,326,v.eq,{anchor:"middle",size:14,w:700,fill:"var(--accent)"});
  }
  $("#vcWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Schéma vápenného cyklu"');

  npRo("#vcRo1","reakce",v.eq,v.nm.toLowerCase());
  npRo("#vcRo2","podmínky",v.tep,"kde a při jaké teplotě to běží");
  npRo("#vcRo3","tepelné zabarvení",v.dh,v.typ==="exo"?"teplo se uvolňuje":(v.typ==="endo"?"teplo se musí dodat":"rovnovážný děj oběma směry"));
  $("#vcText").innerHTML='<p class="eq" style="margin:0">'+v.d+'</p>';
}
function initVc(){
  $$("#vcSeg button").forEach(function(b){
    b.addEventListener("click",function(){
      vcSel=b.dataset.vc;
      $$("#vcSeg button").forEach(function(x){ x.setAttribute("aria-pressed",String(x===b)); });
      drawVc();
    });
  });
  drawVc();
}

/* ============================================================
   13 · k4 — TVRDOST VODY
   ============================================================ */
var tvMet="nic";
var NPTVM={
  nic: {nm:"bez úpravy", d:"Voda přichází tak, jak vytekla z vodovodu. Přechodná i trvalá tvrdost jsou v ní obě."},
  var_:{nm:"převaření", d:"Var rozloží hydrogenuhličitany na nerozpustný uhličitan, který se usadí jako kotelní kámen. Odstraní se tím celá přechodná tvrdost, trvalá zůstane beze změny."},
  soda:{nm:"přidání sody", d:"Uhličitan sodný srazí vápník i hořčík jako nerozpustné uhličitany bez ohledu na to, na jaký anion byly původně vázané. Odstraní se proto tvrdost přechodná i trvalá."},
  ion: {nm:"iontoměnič", d:"Katex vymění vápenaté a hořečnaté ionty za sodné, které tvrdost nezpůsobují. Odstraní se veškerá tvrdost, ale voda se obohatí o sodík — proto se změkčená voda nedoporučuje pít."}
};
function tvKat(t){
  if(t<1.25) return {nm:"měkká", c:"var(--ok)"};
  if(t<2.5)  return {nm:"středně tvrdá", c:"var(--accent)"};
  if(t<3.75) return {nm:"tvrdá", c:"var(--warn)"};
  return {nm:"velmi tvrdá", c:"var(--bad)"};
}
function drawTv(){
  var mCa=+$("#tvCa").value, mMg=+$("#tvMg").value, pod=+$("#tvHco").value;
  $("#tvCav").textContent=String(mCa); $("#tvMgv").textContent=String(mMg); $("#tvHcov").textContent=String(pod);
  var cCa=mCa/40.078, cMg=mMg/24.305, tot=cCa+cMg;
  var prech=tot*pod/100, trv=tot-prech;
  var po;
  if(tvMet==="nic") po=tot;
  else if(tvMet==="var_") po=trv;
  else po=0;
  var mm=NPTVM[tvMet]||NPTVM.nic;

  var W=760, H=294, s='', MAXT=6;
  s+=npTitle("Tvrdost vody a její odstranění");
  s+=npCap(40,"celková tvrdost [mmol·dm⁻³] · 1 mmol·dm⁻³ = 5,61 °dH");
  var bx0=60, bx1=700;
  function X(v){ return bx0+Math.min(v,MAXT)/MAXT*(bx1-bx0); }
  s+=txt(60,62,"vápník = "+fmt(cCa,2)+" mmol·dm⁻³",{size:11.5,w:600,fill:"var(--exo)"});
  s+=txt(700,62,"hořčík = "+fmt(cMg,2)+" mmol·dm⁻³",{anchor:"end",size:11.5,w:600,fill:"var(--endo)"});
  /* pruh před úpravou */
  s+=rect(bx0,72,bx1-bx0,38,{fill:"var(--surface-2)",r:6,stroke:"var(--line)",sw:1});
  s+=rect(bx0,72,X(cCa)-bx0,38,{fill:"var(--exo)",r:6,style:"fill-opacity:.65"});
  s+=rect(X(cCa),72,Math.max(0,X(tot)-X(cCa)),38,{fill:"var(--endo)",style:"fill-opacity:.65"});
  /* osa */
  var ay=192;
  s+=line(bx0,ay,bx1,ay,{c:"var(--line-strong)",w:1.4});
  var ticks=[0,1.25,2.5,3.75,6];
  for(var i=0;i<ticks.length;i++){
    s+=line(X(ticks[i]),ay-5,X(ticks[i]),ay+5,{c:"var(--line-strong)",w:1.2});
    s+=txt(X(ticks[i]),ay+22,fmt(ticks[i],2),{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true});
  }
  var zones=[[0,1.25,"měkká","var(--ok)"],[1.25,2.5,"středně tvrdá","var(--accent)"],
             [2.5,3.75,"tvrdá","var(--warn)"],[3.75,6,"velmi tvrdá","var(--bad)"]];
  for(i=0;i<zones.length;i++){
    var z=zones[i];
    s+=rect(X(z[0]),ay-14,X(z[1])-X(z[0]),10,{fill:z[3],r:2,style:"fill-opacity:.4"});
    s+=txt((X(z[0])+X(z[1]))/2,ay-22,z[2],{anchor:"middle",size:10.5,w:600,fill:z[3]});
  }
  /* ukazatel */
  var k=tvKat(tot);
  s+=line(X(tot),110,X(tot),ay-16,{c:k.c,w:2.2,dash:"5 4"});
  var lab="celková tvrdost = "+fmt(tot,2)+" mmol·dm⁻³ = "+fmt(tot*5.608,1)+" °dH";
  s+=txt(npClamp(X(tot),160,bx0,bx1),146,lab,{anchor:"middle",size:12.5,w:700,fill:k.c});
  /* pruh po úpravě */
  s+=txt(54,246,"po úpravě",{anchor:"end",size:11,w:600,fill:"var(--ink-3)"});
  s+=rect(bx0,228,bx1-bx0,32,{fill:"var(--surface-2)",r:6,stroke:"var(--line)",sw:1});
  s+=rect(bx0,228,Math.max(0,X(po)-bx0),32,{fill:tvKat(po).c,r:6,style:"fill-opacity:.6"});
  s+=txt(bx0,284,mm.nm+" → zbývá "+fmt(po,2)+" mmol·dm⁻³ ("+tvKat(po).nm+")",{size:12,w:700,fill:tvKat(po).c});
  $("#tvWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Tvrdost vody a její odstranění"');

  npRo("#tvRo1","celková tvrdost",fmt(tot,2)+" mmol·dm⁻³",fmt(tot*5.608,1)+" °dH — voda "+k.nm);
  npRo("#tvRo2","přechodná / trvalá",fmt(prech,2)+" / "+fmt(trv,2)+" mmol·dm⁻³","hydrogenuhličitany proti síranům");
  npRo("#tvRo3","po úpravě",fmt(po,2)+" mmol·dm⁻³",mm.nm);
  $("#tvText").innerHTML='<p class="eq" style="margin:0">'+mm.d+'</p>';
}
function initTv(){
  $$("#tvSeg button").forEach(function(b){
    b.addEventListener("click",function(){
      tvMet=b.dataset.tv==="var"?"var_":b.dataset.tv;
      $$("#tvSeg button").forEach(function(x){ x.setAttribute("aria-pressed",String(x===b)); });
      drawTv();
    });
  });
  drawTv();
}

/* ============================================================
   14 · k5 — AMFOTERITA HLINÍKU PODLE pH
   ============================================================ */
function amStav(pH){
  if(pH<3.5) return {nm:"[Al(H₂O)₆]³⁺", pop:"hexaaquahlinitý kation", col:"var(--exo)",
    eq:"[Al(H₂O)₆]³⁺ — hliník je rozpuštěný jako kation",
    d:"V silně kyselém prostředí je hliník rozpuštěný jako oktaedrický aquakomplex. Roztok je čirý a reaguje kysele, protože komplex sám odštěpuje protony."};
  if(pH<4.5) return {nm:"[Al(OH)(H₂O)₅]²⁺", pop:"první hydroxokomplex", col:"var(--exo)",
    eq:"[Al(H₂O)₆]³⁺ + H₂O ⇌ [Al(OH)(H₂O)₅]²⁺ + H₃O⁺",
    d:"Z aquakomplexu odešel první proton. Roztok je ještě čirý, ale začíná se objevovat zákal — blížíme se oblasti, kde je hliník nejméně rozpustný."};
  if(pH<10) return {nm:"Al(OH)₃", pop:"nerozpustná sraženina", col:"var(--accent)",
    eq:"[Al(H₂O)₆]³⁺ + 3 OH⁻ → Al(OH)₃↓ + 6 H₂O",
    d:"Komplex je elektroneutrální a vypadne z roztoku jako rosolovitá sraženina hydroxidu hlinitého. Právě tohle se využívá při čiření vody — sraženina má obrovský povrch a strhne s sebou nečistoty."};
  if(pH<12) return {nm:"[Al(OH)₄]⁻", pop:"tetrahydroxohlinitan", col:"var(--endo)",
    eq:"Al(OH)₃ + OH⁻ → [Al(OH)₄]⁻",
    d:"V zásaditém prostředí přijme sraženina další hydroxidový ion, získá záporný náboj a znovu se rozpustí. Hliník se tady chová jako kyselina — a to je definice amfoterity."};
  return {nm:"[Al(OH)₄]⁻", pop:"tetrahydroxohlinitan, plně rozpuštěný", col:"var(--endo)",
    eq:"2 Al + 2 NaOH + 6 H₂O → 2 Na[Al(OH)₄] + 3 H₂",
    d:"V silném louhu se rozpustí i kovový hliník, protože se nejdřív rozpustí jeho ochranná oxidová vrstva. Proto se hliníkové nádobí nesmí mýt silně alkalickými prostředky."};
}
function drawAm(){
  var pH=(+$("#amPH").value)/10;
  $("#amPHv").textContent=fmt(pH,1);
  var st=amStav(pH), W=760, H=316, s='';
  s+=npTitle("Amfoterita hliníku · co je v roztoku při daném pH");
  var ax0=60, ax1=700, ay=212;
  function X(p){ return ax0+p/14*(ax1-ax0); }
  /* pásma */
  var bands=[[0,4,"[Al(H₂O)₆]³⁺","var(--exo)"],[4,10,"Al(OH)₃ ↓","var(--accent)"],[10,14,"[Al(OH)₄]⁻","var(--endo)"]];
  for(var i=0;i<bands.length;i++){
    var b=bands[i];
    s+=rect(X(b[0]),96,X(b[1])-X(b[0]),106,{fill:b[3],r:7,style:"fill-opacity:.16"});
    s+=txt((X(b[0])+X(b[1]))/2,86,b[2],{anchor:"middle",size:12.5,w:700,fill:b[3]});
  }
  /* křivka rozpustnosti (schematicky: minimum kolem pH 6,5) */
  var d="", pp;
  for(pp=0;pp<=14.001;pp+=0.25){
    var rel=Math.min(1,Math.abs(pp-6.5)/4.6);
    var yy=196-rel*88;
    d+=(pp===0?"M":" L")+fmt(X(pp),1).replace(",",".")+" "+fmt(yy,1).replace(",",".");
  }
  s+='<path d="'+d+'" style="fill:none;stroke:var(--ink-3);stroke-width:1.6;stroke-dasharray:5 4"/>';
  /* osa */
  s+=line(ax0,ay,ax1,ay,{c:"var(--line-strong)",w:1.4});
  for(i=0;i<=14;i+=2){
    s+=line(X(i),ay-5,X(i),ay+5,{c:"var(--line-strong)",w:1.2});
    s+=txt(X(i),ay+22,String(i),{anchor:"middle",size:11,fill:"var(--ink-3)",mono:true});
  }
  /* ukazatel */
  s+=line(X(pH),96,X(pH),ay+6,{c:st.col,w:2.6});
  s+=txt(npClamp(X(pH),150,ax0,ax1),58,"pH = "+fmt(pH,1)+" → "+st.nm,{anchor:"middle",size:13,w:700,fill:st.col});
  /* popis */
  s+=txt(380,266,st.eq,{anchor:"middle",size:13,w:600,fill:"var(--ink)"});
  s+=txt(380,292,"přerušovaná čára = rozpustnost hliníku, minimum leží kolem pH 6,5",{anchor:"middle",size:11,fill:"var(--ink-3)"});
  $("#amWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Rozpustnost hliníku v závislosti na pH"');

  npRo("#amRo1","převažující částice",st.nm,st.pop);
  npRo("#amRo2","chování hliníku",pH<4?"jako zásaditý kov":(pH<10?"nerozpustný":"jako kyselina"),
    pH<4?"tvoří kation":(pH<10?"neutrální hydroxid":"tvoří anion"));
  npRo("#amRo3","hodnota pH",fmt(pH,1),pH<7?"kyselé prostředí":(pH>7?"zásadité prostředí":"neutrální prostředí"));
  $("#amText").innerHTML='<p class="eq" style="margin:0">'+st.d+'</p>';
}

/* ============================================================
   15 · k5 — VÝROBA HLINÍKU
   ============================================================ */
var hhSel="bay";
var NPHH={
  bay:{nm:"Bayerův postup", vst:"bauxit", vst2:"Al₂O₃·nH₂O + Fe₂O₃", op:"louhování", op2:"NaOH, 150 až 250 °C",
   vys:"roztok hlinitanu", vys2:"Na[Al(OH)₄]",
   eqs:["Al₂O₃ + 2 NaOH + 3 H₂O → 2 Na[Al(OH)₄]","2 Na[Al(OH)₄] + CO₂ → 2 Al(OH)₃↓ + Na₂CO₃ + H₂O"],
   pod:"tlak v autoklávu, oxid železitý zůstane jako červený kal",
   d:"Amfoterní oxid hlinitý se v horkém louhu rozpustí na hlinitan, kdežto zásaditý oxid železitý nikoli. Celý Bayerův postup je tedy chemické oddělení podle toho, který oxid je amfoterní. Z přefiltrovaného roztoku se hliník vysráží zpět jako hydroxid."},
  kal:{nm:"Kalcinace", vst:"hydroxid hlinitý", vst2:"Al(OH)₃", op:"žíhání", op2:"1100 až 1300 °C",
   vys:"čistý oxid hlinitý", vys2:"Al₂O₃ (alumina)",
   eqs:["2 Al(OH)₃ → Al₂O₃ + 3 H₂O"],
   pod:"vzniká bezvodý oxid o čistotě nad 99 %",
   d:"Vysrážený hydroxid se vyžíhá na bezvodý oxid hlinitý. Ten má teplotu tání 2072 °C, takže roztavit ho samotný by bylo technicky neúnosné — proto přijde na řadu kryolit."},
  ele:{nm:"Hallova–Héroultova elektrolýza", vst:"oxid hlinitý", vst2:"Al₂O₃ v tavenině kryolitu", op:"tavná elektrolýza", op2:"asi 960 °C, 4 až 4,5 V",
   vys:"kovový hliník", vys2:"Al, čistota 99,5 až 99,8 %",
   eqs:["katoda:  Al³⁺ + 3 e⁻ → Al","anoda:   2 O²⁻ + C → CO₂ + 4 e⁻","celkem:  2 Al₂O₃ + 3 C → 4 Al + 3 CO₂"],
   pod:"uhlíková anoda se spotřebovává, spotřeba 13 až 15 kWh·kg⁻¹",
   d:"Kryolit Na₃[AlF₆] rozpustí oxid hlinitý a sníží teplotu tání z 2072 °C na zhruba 960 °C. Roztavený hliník je hustší než lázeň a stéká na dno vany, odkud se odsává. Uhlíková anoda se přitom sama spaluje na oxid uhličitý."}
};
function drawHh(){
  var h=NPHH[hhSel], W=760, H=336, s='';
  s+=npTitle("Výroba hliníku · "+h.nm);
  var by=72, bh=76, boxes=[[40,"VSTUP",h.vst,h.vst2,"var(--endo)"],
                           [280,"OPERACE",h.op,h.op2,"var(--accent)"],
                           [520,"VÝSTUP",h.vys,h.vys2,"var(--exo)"]];
  for(var i=0;i<3;i++){
    var b=boxes[i], bx=b[0], cx=bx+100;
    s+=txt(cx,60,b[1],{anchor:"middle",size:10,w:700,fill:"var(--ink-3)",style:"letter-spacing:.13em"});
    s+=rect(bx,by,200,bh,{fill:b[4],r:11,stroke:b[4],sw:1.6,style:"fill-opacity:.14"});
    s+=txt(cx,by+32,b[2],{anchor:"middle",size:13,w:700,fill:b[4]});
    s+=txt(cx,by+56,b[3],{anchor:"middle",size:11,fill:"var(--ink-2)"});
    if(i<2) s+=npArrow(bx+206,by+bh/2,bx+234,by+bh/2,"var(--ink-3)",2);
  }
  for(i=0;i<h.eqs.length;i++)
    s+=txt(380,196+i*26,h.eqs[i],{anchor:"middle",size:13,w:600,fill:"var(--ink)",mono:true});
  s+=txt(380,196+h.eqs.length*26+18,h.pod,{anchor:"middle",size:11.5,fill:"var(--accent)"});
  $("#hhWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Schéma výroby hliníku"');

  npRo("#hhRo1","vstup",h.vst2,h.vst);
  npRo("#hhRo2","podmínky",h.op2,h.op);
  npRo("#hhRo3","výstup",h.vys2,h.vys);
  $("#hhText").innerHTML='<p class="eq" style="margin:0">'+h.d+'</p>';
}
function initHh(){
  $$("#hhSeg button").forEach(function(b){
    b.addEventListener("click",function(){
      hhSel=b.dataset.hh;
      $$("#hhSeg button").forEach(function(x){ x.setAttribute("aria-pressed",String(x===b)); });
      drawHh();
    });
  });
  drawHh();
}
