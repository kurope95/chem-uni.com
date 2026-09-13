/* ============================================================
   11 · K6 — PRŮZKUMNÍK SKEL
   ============================================================ */
var glState={t:"sodne"};
function G_(id){ for(var i=0;i<SKLA.length;i++) if(SKLA[i].id===id) return SKLA[i]; return SKLA[0]; }
function drawGl(){
  var g=G_(glState.t);
  press("#glType",glState.t);
  var W=720,H=265,s='';
  s+=txt(24,20,g.jm.toUpperCase(),{size:12.5,w:700,fill:"var(--accent)",style:"letter-spacing:.07em"});
  /* pruh složení */
  var L=24,R=24,T=42,bw=W-L-R,bh=42, x=L;
  var cols=["var(--cat1)","var(--cat2)","var(--cat3)","var(--cat4)","var(--accent)"];
  g.slo.forEach(function(c,i){
    var w=bw*c[1]/100;
    s+=rect(x,T,Math.max(0,w-1.5),bh,{fill:cols[i%cols.length],r:4});
    if(w>52){
      s+=txt(x+w/2,T+18,c[0],{anchor:"middle",size:11.5,w:700,fill:"var(--accent-ink)"});
      s+=txt(x+w/2,T+33,fmt(c[1],0)+" %",{anchor:"middle",size:10.5,fill:"var(--accent-ink)",mono:true});
    } else if(w>18){
      s+=txt(x+w/2,T+26,fmt(c[1],0),{anchor:"middle",size:10,w:700,fill:"var(--accent-ink)",mono:true});
    }
    x+=w;
  });
  /* legenda malých složek */
  var small=g.slo.filter(function(c){ return bw*c[1]/100<=52; });
  if(small.length) s+=txt(L,T+bh+16,"malé podíly: "+small.map(function(c){ return c[0]+" = "+fmt(c[1],0)+" %"; }).join(" · "),{size:10.5,fill:"var(--ink-3)"});
  /* srovnávací graf roztažnosti */
  var gT=T+bh+50, gH=110, gL=L+8, gW=bw-16;
  s+=txt(gL,gT-12,"TEPLOTNÍ ROZTAŽNOST α [10⁻⁶ K⁻¹] — čím nižší, tím odolnější proti teplotnímu šoku",{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.05em"});
  var maxA=10, bwid=gW/SKLA.length;
  SKLA.forEach(function(k,i){
    var hh=k.alfa/maxA*(gH-24);
    var bx=gL+i*bwid+bwid*0.18, w=bwid*0.64;
    var act=k.id===g.id;
    s+=rect(bx,gT+gH-24-hh,w,hh,{fill:act?"var(--accent)":"var(--cat2)",r:4,style:act?"":"fill-opacity:.35"});
    s+=txt(bx+w/2,gT+gH-28-hh,fmt(k.alfa,2),{anchor:"middle",size:10.5,w:700,fill:act?"var(--accent)":"var(--ink-3)",mono:true});
    s+=txt(bx+w/2,gT+gH-8,k.jm.split(" ")[0],{anchor:"middle",size:10,fill:act?"var(--ink)":"var(--ink-3)"});
  });
  $("#glWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Složení a vlastnosti skla: '+g.jm+'"');

  ro("#glRo1","teplotní roztažnost",fmt(g.alfa,2)+"·10⁻⁶ K⁻¹",(g.alfa<4?"odolá teplotnímu šoku":"praskne při prudké změně teploty"),(g.alfa<4?"pos":"neg"));
  ro("#glRo2","teplota měknutí",fmt(g.tmek,0)+" °C","nad ní sklo teče a dá se tvarovat");
  ro("#glRo3","index lomu",fmt(g.nlom,2),(g.nlom>1.6?"silně láme světlo — vhodné na broušení":"běžná hodnota pro křemičitá skla"));
  $("#glPop").innerHTML="<b>"+g.jm+".</b> "+g.pop+" <b>Použití:</b> "+g.pouz;
  $("#glTxt").innerHTML="<span class='chem'>6 SiO₂ + Na₂CO₃ + CaCO₃ → Na₂O·CaO·6 SiO₂ + 2 CO₂</span> &nbsp;— základní sklářská reakce";
  $("#glPast").innerHTML="<b>Pozor:</b> "+g.past;
}
function initGl(){
  $$("#glType button").forEach(function(b){ b.addEventListener("click",function(){ glState.t=b.dataset.v; drawGl(); }); });
  drawGl();
}

/* ============================================================
   12 · K6 — VÝPAL KERAMIKY A CEMENTU
   ============================================================ */
var ceState={id:"cihla"};
function C_(id){ for(var i=0;i<KERAM.length;i++) if(KERAM[i].id===id) return KERAM[i]; return KERAM[0]; }
function drawCe(){
  var k=C_(ceState.id);
  var W=720,H=232,L=48,R=24,T=72,pw=W-L-R,s='';
  s+=txt(L,20,"TEPLOTA VÝPALU A CO SE PŘI NÍ DĚJE",{size:11.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.07em"});
  s+=txt(L,38,"od prostého odpaření vody až po vznik nových sloučenin",{size:10.5,fill:"var(--ink-3)"});
  function X(v){ return L+v/1600*pw; }
  /* barevný teplotní pás */
  var grad='';
  for(var v=0;v<1600;v+=40){
    var f=v/1600;
    grad+=rect(X(v),T,X(40)-X(0)+0.6,26,{fill:"var(--exo)",r:0,style:"fill-opacity:"+(0.10+f*0.75)});
  }
  s+=grad;
  s+=rect(L,T,pw,26,{fill:"none",r:4,stroke:"var(--line-strong)",sw:1.2});
  /* značky všech materiálů — popisky střídají dvě řádky, aby se blízké teploty nepřetiskly */
  var ceRow={}, ceSort=KERAM.slice().sort(function(p,q){ return p.t-q.t; });
  ceSort.forEach(function(m,i){ ceRow[m.id]=i%2; });
  KERAM.forEach(function(m){
    var act=m.id===k.id, ry=T+48+ceRow[m.id]*16;
    s+=line(X(m.t),T-6,X(m.t),T+32,{c:act?"var(--ink)":"var(--line-strong)",w:act?2.4:1.2});
    s+=txt(X(m.t),act?T-12:ry,m.jm.split(" ")[0],{anchor:"middle",size:act?12:10,w:act?700:400,fill:act?"var(--accent)":"var(--ink-3)"});
    if(act) s+=txt(X(m.t),ry,fmt(m.t,0)+" °C",{anchor:"middle",size:11,w:700,fill:"var(--ink)",mono:true});
  });
  [0,400,800,1200,1600].forEach(function(v){
    s+=txt(X(v),T+78,String(v),{anchor:"middle",size:10,fill:"var(--ink-3)",mono:true});
  });
  s+=txt(L+pw/2,T+96,"teplota [°C]",{anchor:"middle",size:11,w:600,fill:"var(--ink-2)"});
  /* schéma surovina → děj → výsledek */
  var by=T+112;
  s+=rect(L,by,190,42,{fill:"var(--surface-3)",r:8});
  s+=txt(L+95,by+18,"SUROVINA",{anchor:"middle",size:9.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  s+=txt(L+95,by+34,k.sur.length>28?k.sur.slice(0,26)+"…":k.sur,{anchor:"middle",size:10.5,fill:"var(--ink-2)"});
  s+=hArrow(L+198,L+250,by+22,"var(--accent)","výpal",false);
  s+=rect(L+258,by,190,42,{fill:"var(--accent-soft)",r:8});
  s+=txt(L+353,by+18,fmt(k.t,0)+" °C",{anchor:"middle",size:14,w:700,fill:"var(--accent)",mono:true});
  s+=txt(L+353,by+34,"v peci",{anchor:"middle",size:10,fill:"var(--ink-3)"});
  s+=hArrow(L+456,L+508,by+22,"var(--accent)","",false);
  s+=rect(L+516,by,pw-516,42,{fill:"var(--surface-3)",r:8});
  s+=txt(L+516+(pw-516)/2,by+18,"VÝSLEDEK",{anchor:"middle",size:9.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  s+=txt(L+516+(pw-516)/2,by+34,k.jm.split(" ")[0],{anchor:"middle",size:11,w:600,fill:"var(--ink-2)"});
  $("#ceWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Výpal: '+k.jm+'"');

  ro("#ceRo1","teplota výpalu",fmt(k.t,0)+" °C","surovina: "+k.sur);
  ro("#ceRo2","výsledný materiál",k.jm.split(" ")[0],k.vys);
  ro("#ceRo3","použití","—",k.pouz);
  $("#cePop").innerHTML="<b>Co se při výpalu děje:</b> "+k.dej;
  var eq={cihla:"jíl → ztráta vody ze struktury → slinutí okrajů částic",
    kamenina:"jíl + tavivo → hlubší slinutí → uzavření pórů",
    porcelan:"<span class='chem'>3 (Al₂Si₂O₅(OH)₄) → 3Al₂O₃·2SiO₂ + 4 SiO₂ + 6 H₂O</span> — vznik mullitu",
    cement:"<span class='chem'>CaCO₃ → CaO + CO₂</span> &nbsp;pak&nbsp; <span class='chem'>3 CaO + SiO₂ → 3CaO·SiO₂</span> (alit)",
    vapno:"<span class='chem'>CaCO₃ → CaO + CO₂</span> &nbsp;·&nbsp; <span class='chem'>CaO + H₂O → Ca(OH)₂</span> &nbsp;·&nbsp; <span class='chem'>Ca(OH)₂ + CO₂ → CaCO₃ + H₂O</span>",
    sadra:"<span class='chem'>2 (CaSO₄·2H₂O) → 2 CaSO₄·H₂O + 3 H₂O</span> — jen odchod krystalové vody"};
  $("#ceTxt").innerHTML=eq[k.id]||"";
}
function initCe(){
  $("#ceSel").innerHTML=KERAM.map(function(k){ return '<option value="'+k.id+'">'+k.jm+' — '+fmt(k.t,0)+' °C</option>'; }).join("");
  $("#ceSel").value=ceState.id;
  $("#ceSel").addEventListener("change",function(){ ceState.id=this.value; drawCe(); });
  drawCe();
}

/* ============================================================
   13 · K7 — TŘÍSTŘEDOVÁ VAZBA A DIBORAN
   ============================================================ */
var bhState={v:"dib"};
function bhBanana(x1,y1,x2,y2,bulge,color,op){
  var mx=(x1+x2)/2, my=(y1+y2)/2;
  var dx=x2-x1, dy=y2-y1, len=Math.sqrt(dx*dx+dy*dy)||1;
  var nx=-dy/len, ny=dx/len;
  var cx=mx+nx*bulge, cy=my+ny*bulge;
  return '<path d="M'+x1+' '+y1+' Q '+cx+' '+cy+' '+x2+' '+y2+'" style="fill:none;stroke:'+color+';stroke-width:9;stroke-linecap:round;opacity:'+(op||0.34)+'"/>';
}
function drawBh(){
  var v=bhState.v; press("#bhView",v);
  var W=720,H=306,s='',A="var(--accent)",E="var(--exo)",D="var(--endo)",Hc="var(--ink-3)";
  if(v==="dib"){
    s+=txt(24,22,"DIBORAN(6) B₂H₆ · dva tetraedry spojené hranou",{size:12,w:700,fill:A,style:"letter-spacing:.07em"});
    s+=txt(24,42,"čtyři koncové vazby B—H v jedné rovině, dva můstkové vodíky kolmo na ni",{size:11,fill:"var(--ink-3)"});
    var b1=[290,150], b2=[430,150], hm1=[360,104], hm2=[360,196];
    var t1=[[210,104],[210,196]], t2=[[510,104],[510,196]];
    /* koncové vazby */
    t1.concat(t2).forEach(function(p,i){
      var b=(i<2)?b1:b2;
      s+=line(b[0],b[1],p[0],p[1],{c:E,w:3.4,cap:"round"});
    });
    /* můstky jako obloučky */
    s+=bhBanana(b1[0],b1[1],hm1[0],hm1[1],-8,D,0.45);
    s+=bhBanana(hm1[0],hm1[1],b2[0],b2[1],-8,D,0.45);
    s+=bhBanana(b1[0],b1[1],hm2[0],hm2[1],8,D,0.45);
    s+=bhBanana(hm2[0],hm2[1],b2[0],b2[1],8,D,0.45);
    s+=line(b1[0],b1[1],hm1[0],hm1[1],{c:D,w:2,dash:"4 3"});
    s+=line(hm1[0],hm1[1],b2[0],b2[1],{c:D,w:2,dash:"4 3"});
    s+=line(b1[0],b1[1],hm2[0],hm2[1],{c:D,w:2,dash:"4 3"});
    s+=line(hm2[0],hm2[1],b2[0],b2[1],{c:D,w:2,dash:"4 3"});
    t1.concat(t2).forEach(function(p){ s+=atom(p[0],p[1],11,Hc,"H",11); });
    s+=atom(hm1[0],hm1[1],11,Hc,"H",11);
    s+=atom(hm2[0],hm2[1],11,Hc,"H",11);
    s+=atom(b1[0],b1[1],15,A,"B",13);
    s+=atom(b2[0],b2[1],15,A,"B",13);
    s+=txt(360,74,"můstek B—H—B: jeden pár drží tři atomy",{anchor:"middle",size:11,w:600,fill:D});
    s+=txt(360,232,"druhý můstek B—H—B",{anchor:"middle",size:11,w:600,fill:D});
    s+=txt(160,150,"koncové",{anchor:"middle",size:10.5,fill:E});
    s+=txt(560,150,"koncové",{anchor:"middle",size:10.5,fill:E});
    s+=txt(360,258,"mezi atomy boru není žádná vazba B—B",{anchor:"middle",size:12,w:700,fill:"var(--bad)"});
    ro("#bhRo1","valenční elektrony","12","2·3 od boru + 6·1 od vodíku");
    ro("#bhRo2","elektronové páry","6","na 8 spojnic mezi atomy — proto můstky");
    ro("#bhRo3","hybridizace boru","sp³","molekula má tvar dvou tetraedrů spojených hranou");
    $("#bhTxt").innerHTML="<span class='chem'>B₂H₆ + 6 H₂O → 2 H₃BO₃ + 6 H₂</span> &nbsp;·&nbsp; <span class='chem'>B₂H₆ + 3 O₂ → B₂O₃ + 3 H₂O</span>";
    $("#bhPop").innerHTML="Diboran je samozápalný a vodou okamžitě hydrolyzuje. Příčinou je polarita vazby: bor je <b>méně</b> elektronegativní než vodík (2,04 proti 2,20), takže koncový vodík má hydridový charakter. Můstkový vodík je naopak „kyselý“ a může se odštěpit jako proton — tak vznikají mimořádně stálé klecové anionty typu <span class='chem'>[B₁₂H₁₂]²⁻</span>.";
  } else if(v==="bhb"){
    s+=txt(24,22,"MŮSTKOVÁ TŘÍSTŘEDOVÁ VAZBA B—H—B",{size:12,w:700,fill:A,style:"letter-spacing:.07em"});
    s+=txt(24,42,"dva orbitaly sp³ atomů boru se překrývají s orbitalem 1s atomu vodíku",{size:11,fill:"var(--ink-3)"});
    var b1=[250,190], b2=[470,190], hh=[360,120];
    s+=bhBanana(b1[0],b1[1],hh[0],hh[1],-14,D,0.42);
    s+=bhBanana(hh[0],hh[1],b2[0],b2[1],-14,D,0.42);
    s+=line(b1[0],b1[1],hh[0],hh[1],{c:D,w:2,dash:"4 3"});
    s+=line(hh[0],hh[1],b2[0],b2[1],{c:D,w:2,dash:"4 3"});
    s+=line(b1[0],b1[1],b2[0],b2[1],{c:"var(--bad)",w:1.6,dash:"6 5"});
    s+=txt(360,208,"tady vazba NENÍ",{anchor:"middle",size:11,w:700,fill:"var(--bad)"});
    s+=atom(hh[0],hh[1],13,Hc,"H",12);
    s+=atom(b1[0],b1[1],16,A,"B",13);
    s+=atom(b2[0],b2[1],16,A,"B",13);
    s+=txt(360,92,"oblast největší elektronové hustoty má tvar oblouku",{anchor:"middle",size:11.5,w:600,fill:D});
    s+=txt(360,244,"tři atomy, jediný elektronový pár — proto „třístředová dvouelektronová“",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
    ro("#bhRo1","atomy ve vazbě","3","dva atomy boru a jeden vodík");
    ro("#bhRo2","elektronové páry","1","obvyklá vazba by na tři atomy potřebovala dva páry");
    ro("#bhRo3","přispívající orbitaly","sp³ + 1s + sp³","dva hybridní orbitaly boru a orbital 1s vodíku");
    $("#bhTxt").innerHTML="překryvem tří orbitalů vzniknou tři molekulové orbitaly: <b>vazebný</b> (obsazený párem), <b>nevazebný</b> a <b>protivazebný</b> (oba prázdné)";
    $("#bhPop").innerHTML="Právě proto vazba drží: elektronový pár sedí v tom nejnižším, vazebném orbitalu, který je rozprostřen přes všechna tři jádra. Kdyby byl obsazený i protivazebný orbital, vazebný efekt by se vyrušil a útvar by se rozpadl.";
  } else if(v==="closed"){
    s+=txt(24,22,"UZAVŘENÁ TŘÍSTŘEDOVÁ VAZBA B—B—B",{size:12,w:700,fill:A,style:"letter-spacing:.07em"});
    s+=txt(24,42,"tři atomy boru v rovnostranném trojúhelníku, orbitaly sp³ míří do těžiště",{size:11,fill:"var(--ink-3)"});
    var cx=360, cy=156, R=78, p=[];
    for(var i=0;i<3;i++){ var a=Math.PI/180*(-90+120*i); p.push([cx+R*Math.cos(a), cy+R*Math.sin(a)]); }
    for(var i=0;i<3;i++) s+=line(p[i][0],p[i][1],p[(i+1)%3][0],p[(i+1)%3][1],{c:"var(--line-strong)",w:1.4,dash:"5 4"});
    for(var i=0;i<3;i++) s+=line(p[i][0],p[i][1],cx,cy,{c:D,w:2.4,dash:"3 3"});
    s+='<circle cx="'+cx+'" cy="'+cy+'" r="30" style="fill:'+D+';fill-opacity:.30"/>';
    for(var i=0;i<3;i++) s+=atom(p[i][0],p[i][1],16,A,"B",13);
    s+=txt(cx,cy+4,"2e⁻",{anchor:"middle",size:11.5,w:700,fill:D});
    s+=txt(cx,cy+R+42,"elektronová hustota je soustředěná uprostřed trojúhelníku",{anchor:"middle",size:11.5,w:600,fill:D});
    s+=txt(cx,cy+R+62,"tento motiv drží pohromadě ikosaedry B₁₂ v elementárním boru",{anchor:"middle",size:11,fill:"var(--ink-3)"});
    ro("#bhRo1","atomy ve vazbě","3","tři atomy boru");
    ro("#bhRo2","elektronové páry","1","pár je delokalizován do těžiště trojúhelníku");
    ro("#bhRo3","kde ji najdete","B₁₂","ikosaedry v krystalickém boru, boridech a karbidu boru");
    $("#bhTxt").innerHTML="tři orbitaly sp³, každý z jednoho atomu boru, mířící do společného středu";
    $("#bhPop").innerHTML="Tenhle typ vazby je důvod, proč je elementární bor tak tvrdý a netěkavý: jeho mřížku netvoří jednotlivé atomy, ale pevně svázané dvanáctiatomové klece.";
  } else if(v==="open"){
    s+=txt(24,22,"OTEVŘENÁ TŘÍSTŘEDOVÁ VAZBA B—B—B",{size:12,w:700,fill:A,style:"letter-spacing:.07em"});
    s+=txt(24,42,"prostřední atom boru je můstkový a přispívá orbitalem 2p",{size:11,fill:"var(--ink-3)"});
    var b1=[220,200], bm=[360,130], b2=[500,200];
    s+=bhBanana(b1[0],b1[1],bm[0],bm[1],-14,D,0.4);
    s+=bhBanana(bm[0],bm[1],b2[0],b2[1],-14,D,0.4);
    s+=line(b1[0],b1[1],bm[0],bm[1],{c:D,w:2,dash:"4 3"});
    s+=line(bm[0],bm[1],b2[0],b2[1],{c:D,w:2,dash:"4 3"});
    s+='<ellipse cx="'+bm[0]+'" cy="'+(bm[1]-30)+'" rx="11" ry="22" style="fill:'+D+';fill-opacity:.26"/>';
    s+='<ellipse cx="'+bm[0]+'" cy="'+(bm[1]+30)+'" rx="11" ry="22" style="fill:'+D+';fill-opacity:.26"/>';
    s+=atom(b1[0],b1[1],16,A,"B",13);
    s+=atom(b2[0],b2[1],16,A,"B",13);
    s+=atom(bm[0],bm[1],16,A,"B",13);
    s+=txt(bm[0]+30,bm[1]-42,"orbital 2p můstkového atomu",{size:11,w:600,fill:D});
    s+=txt(220,232,"sp³",{anchor:"middle",size:11,fill:"var(--ink-3)"});
    s+=txt(500,232,"sp³",{anchor:"middle",size:11,fill:"var(--ink-3)"});
    s+=txt(360,252,"trojúhelník je rovnoramenný, ne rovnostranný — proto „otevřená“",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
    ro("#bhRo1","atomy ve vazbě","3","dva krajní a jeden můstkový atom boru");
    ro("#bhRo2","elektronové páry","1","stejně jako u uzavřené varianty");
    ro("#bhRo3","přispívající orbitaly","sp³ + 2p + sp³","můstkový atom přispívá nehybridizovaným orbitalem 2p");
    $("#bhTxt").innerHTML="rozdíl proti uzavřené variantě je v geometrii a v tom, jaký orbital přispívá prostřední atom";
    $("#bhPop").innerHTML="Otevřená a uzavřená varianta se liší tvarem trojúhelníku i typem orbitalu prostředního atomu. Ve vyšších boranech se oba typy kombinují s můstky B—H—B a s obyčejnými vazbami — proto se pro ně musela zavést zvláštní grafická symbolika.";
  } else {
    s+=txt(24,22,"ELEKTRONOVÁ BILANCE: ETHAN PROTI DIBORANU",{size:12,w:700,fill:A,style:"letter-spacing:.07em"});
    function bilance(ox,title,el,pary,vazby,verdikt,col){
      var t=panelBox(ox,64,320,164,title,col);
      t+=txt(ox+16,96,"valenční elektrony",{size:11,fill:"var(--ink-3)"});
      t+=txt(ox+304,96,String(el),{anchor:"end",size:15,w:700,fill:col,mono:true});
      t+=txt(ox+16,126,"elektronové páry",{size:11,fill:"var(--ink-3)"});
      t+=txt(ox+304,126,String(pary),{anchor:"end",size:15,w:700,fill:col,mono:true});
      t+=txt(ox+16,156,"potřeba vazeb",{size:11,fill:"var(--ink-3)"});
      t+=txt(ox+304,156,String(vazby),{anchor:"end",size:15,w:700,fill:col,mono:true});
      t+=line(ox+16,172,ox+304,172,{c:"var(--line)",w:1});
      t+=txt(ox+160,198,verdikt,{anchor:"middle",size:11.5,w:700,fill:col});
      return t;
    }
    s+=bilance(30,"ETHAN C₂H₆","2·4 + 6·1 = 14",7,"6× C—H + 1× C—C = 7","7 párů na 7 vazeb — přesně vychází","var(--ok)");
    s+=bilance(374,"DIBORAN B₂H₆","2·3 + 6·1 = 12",6,"6× B—H + 1× B—B = 7","6 párů na 7 vazeb — jeden chybí","var(--bad)");
    s+=txt(360,252,"řešení diboranu: 4 koncové B—H + 2 můstky B—H—B = 6 párů, ale 8 spojnic mezi atomy",{anchor:"middle",size:12,w:700,fill:A});
    ro("#bhRo1","ethan","7 párů / 7 vazeb","klasická struktura, žádný problém","pos");
    ro("#bhRo2","diboran","6 párů / 7 vazeb","jeden pár chybí → nutné můstky","neg");
    ro("#bhRo3","rozdíl","1 pár","bor má o jeden valenční elektron míň než uhlík");
    $("#bhTxt").innerHTML="<b>Postup, který funguje na každý boran:</b> spočítejte valenční elektrony, vydělte dvěma a porovnejte s počtem vazeb, které by molekula „chtěla“ mít.";
    $("#bhPop").innerHTML="Když párů nestačí, musí být některá vazba sdílená více jádry. Tomuhle stavu se říká <b>elektronový deficit</b> a je to definiční vlastnost boranů.";
  }
  $("#bhWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Třístředová vazba a diboran"');
}
function initBh(){
  $$("#bhView button").forEach(function(b){ b.addEventListener("click",function(){ bhState.v=b.dataset.v; drawBh(); }); });
  drawBh();
}

/* ============================================================
   14 · K7 — LEWISOVA KYSELOST BORU
   ============================================================ */
var blState={v:"bf3"};
var BL_SET={
  bf3:{jm:"Volný fluorid boritý BF₃",hyb:"sp²",el:"6 — sextet",uhel:"120°",tvar:"rovinný trojúhelník",
    eq:"<span class='chem'>BF₃</span> má prázdný orbital 2p<sub>z</sub> kolmý k rovině molekuly",
    pop:"Kolem boru je jen šest elektronů. Prázdný orbital z něj dělá <b>silnou Lewisovu kyselinu</b> — akceptor elektronového páru. Zajímavé je, že u fluoridu je kyselost <b>nejnižší</b> z halogenidů boritých: volné páry fluoru se totiž zpětně překrývají s prázdným orbitalem boru a deficit částečně zasytí.",
    cls:"neg"},
  adukt:{jm:"Adukt F₃B←NH₃",hyb:"sp³",el:"8 — oktet",uhel:"109,5°",tvar:"tetraedr",
    eq:"<span class='chem'>BF₃ + NH₃ → F₃B←NH₃</span>",
    pop:"Amoniak daroval boru svůj volný elektronový pár. Vazba je <b>koordinačně kovalentní</b> (donor–akceptorová) — oba elektrony pocházejí od dusíku. Bor se přitom „narovnal“ z roviny do tetraedru a má konečně oktet.",
    cls:"pos"},
  bf4:{jm:"Anion [BF₄]⁻",hyb:"sp³",el:"8 — oktet",uhel:"109,5°",tvar:"tetraedr",
    eq:"<span class='chem'>BF₃ + F⁻ → [BF₄]⁻</span>",
    pop:"Fluoridový anion daroval boru celý pár. Vzniklý tetrafluoroboritan je velmi stálý a nereaktivní — používá se jako „neškodný“ protiiont tam, kde se potřebuje kation bez rušivého partnera. Kyselina H[BF₄] existuje jen v roztoku.",
    cls:"pos"},
  bh4:{jm:"Anion [BH₄]⁻",hyb:"sp³",el:"8 — oktet",uhel:"109,5°",tvar:"tetraedr",
    eq:"<span class='chem'>2 Na[BH₄] + 2 H₂SO₄ → B₂H₆ + 2 H₂ + 2 NaHSO₄</span>",
    pop:"Tetrahydridoboritan je běžné a poměrně mírné redukční činidlo. Vodík v něm má <b>hydridový</b> charakter (bor je méně elektronegativní), takže anion odevzdává H⁻. V zásaditém roztoku je stálý, v kyselém se rozkládá.",
    cls:"pos"}
};
function drawBl(){
  var st=BL_SET[blState.v]; press("#blState",blState.v);
  var W=720,H=258,s='',A="var(--accent)",E="var(--exo)",D="var(--endo)";
  s+=txt(24,22,st.jm.toUpperCase(),{size:12,w:700,fill:A,style:"letter-spacing:.07em"});
  s+=txt(24,42,"hybridizace "+st.hyb+" · "+st.tvar+" · úhel "+st.uhel,{size:11,fill:"var(--ink-3)"});
  var cx=300, cy=150;
  if(blState.v==="bf3"){
    for(var i=0;i<3;i++){
      var a=Math.PI/180*(-90+120*i);
      var px=cx+80*Math.cos(a), py=cy+80*Math.sin(a);
      s+=line(cx,cy,px,py,{c:E,w:3.4,cap:"round"});
      s+=atom(px,py,15,"var(--cat1)","F",12);
    }
    s+='<ellipse cx="'+cx+'" cy="'+(cy-40)+'" rx="13" ry="26" style="fill:none;stroke:'+D+';stroke-width:2;stroke-dasharray:4 3"/>';
    s+='<ellipse cx="'+cx+'" cy="'+(cy+40)+'" rx="13" ry="26" style="fill:none;stroke:'+D+';stroke-width:2;stroke-dasharray:4 3"/>';
    s+=txt(cx+30,cy-70,"prázdný orbital 2p_z".replace("_z","ᶻ"),{size:11.5,w:700,fill:D});
    s+=atom(cx,cy,18,A,"B",14);
    s+=txt(520,110,"jen 6 elektronů",{size:13,w:700,fill:"var(--bad)"});
    s+=txt(520,132,"→ Lewisova kyselina",{size:12,w:600,fill:"var(--bad)"});
    s+=txt(520,158,"přijme elektronový pár",{size:11,fill:"var(--ink-3)"});
    s+=txt(520,176,"a přejde na sp³",{size:11,fill:"var(--ink-3)"});
  } else {
    var lbl = blState.v==="bh4" ? "H" : "F";
    var fourth = blState.v==="adukt" ? "N" : lbl;
    var pos=[[cx,cy-86],[cx-78,cy+22],[cx+78,cy+22],[cx,cy+82]];
    for(var i=0;i<4;i++){
      var isD=(i===3 && blState.v==="adukt");
      s+=line(cx,cy,pos[i][0],pos[i][1],{c:isD?D:E,w:isD?4:3.4,cap:"round",dash:isD?"":""});
      if(isD){
        s+=atom(pos[i][0],pos[i][1],17,"var(--cat2)","N",13);
        for(var k=0;k<3;k++){
          var ha=Math.PI/180*(30+120*k);
          s+=line(pos[i][0],pos[i][1],pos[i][0]+34*Math.cos(ha),pos[i][1]+34*Math.sin(ha),{c:"var(--line-strong)",w:2});
          s+=atom(pos[i][0]+34*Math.cos(ha),pos[i][1]+34*Math.sin(ha),9,"var(--ink-3)","H",9);
        }
      } else {
        s+=atom(pos[i][0],pos[i][1],15,lbl==="F"?"var(--cat1)":"var(--ink-3)",lbl,12);
      }
    }
    s+=atom(cx,cy,18,A,"B",14);
    if(blState.v==="adukt"){
      s+=txt(cx+96,cy+56,"koordinačně kovalentní vazba",{size:11,w:600,fill:D});
      s+=txt(cx+96,cy+74,"oba elektrony dodal dusík",{size:10.5,fill:"var(--ink-3)"});
    }
    s+=txt(520,110,"8 elektronů — oktet",{size:13,w:700,fill:"var(--ok)"});
    s+=txt(520,132,"deficit je zasycen",{size:12,w:600,fill:"var(--ok)"});
    s+=txt(520,158,"tvar tetraedru, 109,5°",{size:11,fill:"var(--ink-3)"});
  }
  $("#blWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="'+st.jm+'"');
  ro("#blRo1","elektronů kolem boru",st.el,(st.el.indexOf("6")===0?"chybí pár do oktetu":"oktet je úplný"),st.cls);
  ro("#blRo2","hybridizace",st.hyb,st.tvar);
  ro("#blRo3","vazebný úhel",st.uhel,(st.uhel==="120°"?"všechny tři vazby v jedné rovině":"vazby míří do vrcholů tetraedru"));
  $("#blTxt").innerHTML=st.eq;
  $("#blPop").innerHTML=st.pop;
}
function initBl(){
  $$("#blState button").forEach(function(b){ b.addEventListener("click",function(){ blState.v=b.dataset.v; drawBl(); }); });
  drawBl();
}
