/* ============================================================
   7 · SPOLEČNÝ PRŮZKUMNÍK SKUPINY (k1 a k3)
   ============================================================ */
var NPPROP={
  i1: {nm:"první ionizační energie", u:"kJ·mol⁻¹", d:0},
  i2: {nm:"druhá ionizační energie", u:"kJ·mol⁻¹", d:0},
  ra: {nm:"poloměr atomu", u:"pm", d:0},
  en: {nm:"elektronegativita (Paulingova stupnice)", u:"", d:2},
  tt: {nm:"teplota tání", u:"°C", d:1},
  rho:{nm:"hustota", u:"g·cm⁻³", d:3},
  E:  {nm:"standardní redukční potenciál", u:"V", d:2}
};
function npGroupSvg(list,sel,prop,label){
  var W=760, H=300, s='', p=NP[sel], m=NPPROP[prop];
  s+=npTitle(label);
  s+=txt(18,40,p.s+" · "+p.n,{size:16,w:700,fill:"var(--accent)"});
  var rows=[
    ["valenční sféra", p.core+" "+p.val],
    ["poloměr atomu", fmt(p.ra,0)+" pm"],
    ["poloměr iontu "+p.ion, fmt(p.ri,0)+" pm"],
    ["elektronegativita", fmt(p.en,2)],
    ["1. ionizační energie", fmt(p.i1,0)+" kJ·mol⁻¹"],
    ["teplota tání", fmt(p.tt,1)+" °C"],
    ["standardní potenciál", sgn(p.E,2)+" V"],
    ["hoří na", p.hor],
    ["reakce s vodou", p.voda]
  ];
  for(var r=0;r<rows.length;r++){
    var ry=66+r*24;
    s+=txt(18,ry,rows[r][0],{size:11.5,fill:"var(--ink-3)"});
    s+=txt(330,ry,rows[r][1],{anchor:"end",size:11.5,w:600,fill:"var(--ink)",mono:r>0&&r<7});
  }
  /* graf trendu */
  var gx0=382, gx1=712, gt=78, gb=238;
  s+=txt(382,42,m.nm+(m.u?" ["+m.u+"]":""),{size:11,w:500,fill:"var(--ink-3)"});
  var vals=list.map(function(k){ return NP[k][prop]; });
  var vmin=Math.min.apply(null,vals), vmax=Math.max.apply(null,vals);
  if(vmin===vmax){ vmin-=1; vmax+=1; }
  var pad=(vmax-vmin)*0.18; vmin-=pad; vmax+=pad;
  var step=(gx1-gx0)/(list.length-1);
  function PY(v){ return gb-(v-vmin)/(vmax-vmin)*(gb-gt); }
  s+=line(gx0-14,gb,gx1+14,gb,{c:"var(--line-strong)",w:1.3});
  var d="", i;
  for(i=0;i<list.length;i++){
    var px=gx0+i*step, py=PY(NP[list[i]][prop]);
    d+=(i?" L":"M")+px+" "+py;
  }
  s+='<path d="'+d+'" style="fill:none;stroke:var(--accent);stroke-width:2.4;stroke-linejoin:round"/>';
  for(i=0;i<list.length;i++){
    var qx=gx0+i*step, qy=PY(NP[list[i]][prop]), on=list[i]===sel;
    s+='<circle cx="'+qx+'" cy="'+qy+'" r="'+(on?7:4.6)+'" style="fill:'+(on?"var(--accent)":"var(--surface)")+';stroke:var(--accent);stroke-width:2"/>';
    s+=txt(qx,qy-14,fmt(NP[list[i]][prop],m.d),{anchor:"middle",size:10.5,w:on?700:500,fill:on?"var(--accent)":"var(--ink-3)",mono:true});
    s+=txt(qx,258,list[i],{anchor:"middle",size:12.5,w:on?700:500,fill:on?"var(--accent)":"var(--ink-2)"});
  }
  return svg("0 0 "+W+" "+H,s,'aria-label="Trend vlastnosti ve skupině"');
}

var a1Sel="Li";
function drawA1(){
  var prop=$("#a1Prop").value||"i1", p=NP[a1Sel];
  $("#a1Wrap").innerHTML=npGroupSvg(NPSK1,a1Sel,prop,"Skupina 1 — alkalické kovy");
  npRo("#a1Ro1","oxidační číslo","I","jiná možnost neexistuje");
  npRo("#a1Ro2","produkt hoření na vzduchu",p.hor,"kyslík má oxidační číslo "+p.horox);
  npRo("#a1Ro3","reakce s vodou",p.voda,"vzniká hydroxid a vodík");
  $("#a1Text").innerHTML='<p class="eq" style="margin:0">'+p.pozn+'</p>';
}
function initA1(){
  $$("#a1Seg button").forEach(function(b){
    b.addEventListener("click",function(){
      a1Sel=b.dataset.a1;
      $$("#a1Seg button").forEach(function(x){ x.setAttribute("aria-pressed",String(x===b)); });
      drawA1();
    });
  });
  drawA1();
}

var a2Sel="Be";
function drawA2(){
  var prop=$("#a2Prop").value||"i1", p=NP[a2Sel];
  $("#a2Wrap").innerHTML=npGroupSvg(NPSK2,a2Sel,prop,"Skupina 2 — kovy alkalických zemin");
  npRo("#a2Ro1","oxidační číslo","II","třetí elektron už z uzavřené slupky");
  npRo("#a2Ro2","produkt hoření na vzduchu",p.hor,p.hornm);
  npRo("#a2Ro3","reakce s vodou",p.voda,a2Sel==="Be"?"beryllium je pasivované":"vzniká hydroxid a vodík");
  $("#a2Text").innerHTML='<p class="eq" style="margin:0">'+p.pozn+'</p>';
}
function initA2(){
  $$("#a2Seg button").forEach(function(b){
    b.addEventListener("click",function(){
      a2Sel=b.dataset.a2;
      $$("#a2Seg button").forEach(function(x){ x.setAttribute("aria-pressed",String(x===b)); });
      drawA2();
    });
  });
  drawA2();
}

/* ============================================================
   8 · k1 — CO VZNIKNE, KDYŽ ALKALICKÝ KOV S NĚČÍM SMÍCHÁTE
   ============================================================ */
var hrSel="Li";
function npReakce(k,part){
  var p=NP[k], M=p.s;
  if(part==="o2"){
    if(k==="Li") return {p2:"O₂",p2n:"kyslík",pr:"Li₂O",prn:"oxid lithný",eq:"4 Li + O₂ → 2 Li₂O",
      note:"kyslík má oxidační číslo −II — je to prostý oxid s iontem O²⁻",
      d:"Malý kation Li⁺ ustálí v mřížce jen malý anion O²⁻. Lithium je proto jediný alkalický kov, který hoří na prostý oxid."};
    if(k==="Na") return {p2:"O₂",p2n:"kyslík",pr:"Na₂O₂",prn:"peroxid sodný",eq:"2 Na + O₂ → Na₂O₂",
      note:"kyslík má oxidační číslo −I — je to peroxid s iontem O₂²⁻",
      d:"Sodný kation je už dost velký, aby udržel dvouatomový anion O₂²⁻ s jednoduchou vazbou O—O. S vodou dává peroxid louh a kyslík."};
    return {p2:"O₂",p2n:"kyslík",pr:M+"O₂",prn:"superoxid "+(k==="K"?"draselný":(k==="Rb"?"rubidný":"cesný")),eq:M+" + O₂ → "+M+"O₂",
      note:"kyslík má formální oxidační číslo −½ — je to superoxid s iontem O₂⁻",
      d:"Velký kation ustálí i objemný a jen jednou nabitý anion O₂⁻ s nepárovým elektronem. Superoxid draselný slouží v dýchacích přístrojích."};
  }
  if(part==="h2o") return {p2:"H₂O",p2n:"voda",pr:M+"OH + H₂",prn:"hydroxid a vodík",eq:"2 "+M+" + 2 H₂O → 2 "+M+"OH + H₂",
    note:"kov se oxiduje z 0 na I, vodík se redukuje z I na 0",
    d:"Průběh: "+p.voda+". Reaktivita roste dolů skupinou, protože klesá ionizační energie i teplota tání kovu."};
  if(part==="h2") return {p2:"H₂",p2n:"vodík",pr:M+"H",prn:"hydrid "+(k==="Li"?"lithný":(k==="Na"?"sodný":(k==="K"?"draselný":(k==="Rb"?"rubidný":"cesný")))),eq:"2 "+M+" + H₂ → 2 "+M+"H",
    note:"vodík má oxidační číslo −I — je to iontový hydrid s aniontem H⁻",
    d:"Alkalický kov je tak elektropozitivní, že donutí i vodík přijmout elektron. Hydridový ion je silná zásada — s vodou okamžitě dá hydroxid a vodík."};
  if(part==="cl2") return {p2:"Cl₂",p2n:"chlor",pr:M+"Cl",prn:"chlorid",eq:"2 "+M+" + Cl₂ → 2 "+M+"Cl",
    note:"typická iontová vazba, rozdíl elektronegativit je přes 2",
    d:"Reakce probíhá prudce a za silného světelného efektu. Vzniklá sůl má krychlovou iontovou mřížku a ve vodě se dobře rozpouští."};
  if(part==="n2"){
    if(k==="Li") return {p2:"N₂",p2n:"dusík",pr:"Li₃N",prn:"nitrid lithný",eq:"6 Li + N₂ → 2 Li₃N",
      note:"dusík má oxidační číslo −III — vzniká nitridový anion N³⁻",
      d:"Lithium je jediný alkalický kov, který se slučuje se vzdušným dusíkem už za laboratorní teploty. Je to projev úhlopříčné podobnosti s hořčíkem."};
    return {p2:"N₂",p2n:"dusík",pr:"—",prn:"reakce neprobíhá",eq:M+" + N₂ → reakce neprobíhá",
      note:"trojná vazba v molekule N₂ je příliš pevná",
      d:"Jediným alkalickým kovem, který si poradí se vzdušným dusíkem, je lithium. U ostatních by mřížková energie nitridu nezaplatila rozbití trojné vazby."};
  }
  return {p2:"S",p2n:"síra",pr:M+"₂S",prn:"sulfid",eq:"2 "+M+" + S → "+M+"₂S",
    note:"síra má oxidační číslo −II — vzniká sulfidový anion S²⁻",
    d:"Reakce je prudká a exotermická. Na dvojici sodík—síra stojí i vysokoteplotní akumulátory používané pro stacionární ukládání energie."};
}
function drawHr(){
  var part=$("#hrPart").value||"o2", p=NP[hrSel], r=npReakce(hrSel,part);
  var W=760, H=290, s='';
  s+=npTitle("Co vznikne · "+p.n+" + "+r.p2n);
  var by=58, bh=72;
  function box(x,w,f,n,col){
    var o=rect(x,by,w,bh,{fill:col,r:10,stroke:col,sw:1.6,style:"fill-opacity:.14"});
    o+=txt(x+w/2,by+34,f,{anchor:"middle",size:19,w:700,fill:col});
    o+=txt(x+w/2,by+58,n,{anchor:"middle",size:11,fill:"var(--ink-3)"});
    return o;
  }
  s+=box(40,150,p.s,p.n,"var(--endo)");
  s+=txt(210,by+40,"+",{anchor:"middle",size:20,w:700,fill:"var(--ink-3)"});
  s+=box(230,150,r.p2,r.p2n,"var(--endo)");
  s+=txt(400,by+40,"→",{anchor:"middle",size:20,w:700,fill:"var(--ink-3)"});
  s+=box(420,300,r.pr,r.prn,r.pr==="—"?"var(--ink-3)":"var(--exo)");
  s+=txt(380,178,r.eq,{anchor:"middle",size:15,w:600,fill:"var(--ink)"});
  s+=txt(380,208,r.note,{anchor:"middle",size:11.5,fill:"var(--accent)"});
  var dl=npLines(r.d,88);
  for(var i=0;i<dl.length && i<2;i++) s+=txt(380,236+i*20,dl[i],{anchor:"middle",size:11.5,fill:"var(--ink-2)"});
  $("#hrWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Reakce alkalického kovu"');

  npRo("#hrRo1","produkt",r.pr,r.prn);
  npRo("#hrRo2","oxidační číslo kovu","I","po reakci má konfiguraci vzácného plynu");
  npRo("#hrRo3","poloměr kationtu "+p.ion,fmt(p.ri,0)+" pm","velikost rozhoduje, jaký anion se ustálí");
  $("#hrText").innerHTML='<p class="eq" style="margin:0">'+r.d+'</p>';
}
function initHr(){
  $$("#hrSeg button").forEach(function(b){
    b.addEventListener("click",function(){
      hrSel=b.dataset.hr;
      $$("#hrSeg button").forEach(function(x){ x.setAttribute("aria-pressed",String(x===b)); });
      drawHr();
    });
  });
  drawHr();
}

/* ============================================================
   9 · k2 — TŘI ZPŮSOBY CHLORALKALICKÉ ELEKTROLÝZY
   ============================================================ */
var elSel="memb";
function drawEl(){
  var e=NPELY[elSel], W=780, H=364, s='';
  s+=npTitle("Elektrolýza roztoku chloridu sodného · "+e.zk);
  var cx0=100, cx1=640, cy0=64, cy1=244;
  s+=rect(cx0,cy0,cx1-cx0,cy1-cy0,{fill:"var(--surface-2)",r:12,stroke:"var(--line-strong)",sw:1.6});
  /* poloviny */
  var mid=(cx0+cx1)/2;
  s+=rect(cx0+8,cy0+8,mid-cx0-16,cy1-cy0-16,{fill:"var(--endo)",r:8,style:"fill-opacity:.13"});
  s+=rect(mid+8,cy0+8,cx1-mid-16,cy1-cy0-16,{fill:"var(--exo)",r:8,style:"fill-opacity:.13"});
  /* přepážka */
  if(elSel!=="amal"){
    s+=rect(mid-7,cy0,14,cy1-cy0,{fill:"var(--accent)",r:3,style:"fill-opacity:.6"});
  } else {
    s+=rect(cx0+8,cy1-46,cx1-cx0-16,38,{fill:"var(--accent)",r:6,style:"fill-opacity:.45"});
  }
  /* elektrody */
  s+=rect(cx0+42,cy0+26,26,cy1-cy0-84,{fill:"var(--endo)",r:4,style:"fill-opacity:.85"});
  s+=rect(cx1-68,cy0+26,26,cy1-cy0-84,{fill:"var(--exo)",r:4,style:"fill-opacity:.85"});
  /* popisky elektrod nad vanou */
  s+=txt(cx0+140,54,"KATODA (−)",{anchor:"middle",size:11.5,w:700,fill:"var(--endo)",style:"letter-spacing:.08em"});
  s+=txt(cx1-140,54,"ANODA (+)",{anchor:"middle",size:11.5,w:700,fill:"var(--exo)",style:"letter-spacing:.08em"});
  /* obsah polovin */
  s+=txt(cx0+140,100,elSel==="amal"?"Na se rozpouští ve rtuti":"vzniká H₂",{anchor:"middle",size:12.5,w:600,fill:"var(--endo)"});
  s+=txt(cx0+140,124,elSel==="amal"?"amalgám NaHg":"a ionty OH⁻",{anchor:"middle",size:12.5,w:600,fill:"var(--endo)"});
  s+=txt(cx0+140,152,elSel==="amal"?"rtuťová katoda":"katolyt = NaOH",{anchor:"middle",size:11,fill:"var(--ink-3)"});
  s+=txt(cx1-140,100,"vzniká Cl₂",{anchor:"middle",size:12.5,w:600,fill:"var(--exo)"});
  s+=txt(cx1-140,124,"z iontů Cl⁻",{anchor:"middle",size:12.5,w:600,fill:"var(--exo)"});
  s+=txt(cx1-140,152,"anolyt = solanka",{anchor:"middle",size:11,fill:"var(--ink-3)"});
  /* šipka přenosu Na+ */
  if(elSel!=="amal"){
    s+=npArrow(mid+34,196,mid-34,196,"var(--accent)",2.2);
    s+=txt(mid,182,"Na⁺",{anchor:"middle",size:12,w:700,fill:"var(--accent)"});
  } else {
    s+=txt(mid,206,"rtuť na dně vany",{anchor:"middle",size:11.5,w:600,fill:"var(--accent)"});
  }
  /* popis přepážky */
  s+=txt(mid,266,"přepážka: "+e.prep,{anchor:"middle",size:12,w:600,fill:"var(--accent)"});
  /* rovnice */
  s+=txt(20,296,"katoda:  "+e.kat,{size:12.5,w:600,fill:"var(--endo)",mono:true});
  s+=txt(20,318,"anoda:   "+e.an,{size:12.5,w:600,fill:"var(--exo)",mono:true});
  s+=txt(20,344,"celkem:  2 NaCl + 2 H₂O → 2 NaOH + H₂ + Cl₂",{size:12.5,w:600,fill:"var(--ink-2)",mono:true});
  $("#elWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Schéma chloralkalické elektrolýzy"');

  npRo("#elRo1","spotřeba energie",e.spot,"na kilogram hydroxidu sodného");
  npRo("#elRo2","čistota produktu",e.cist,"kolik chloridu zůstane v louhu");
  npRo("#elRo3","dnešní stav",e.stav,"kterou technologii uvidíte v provozu");
  $("#elText").innerHTML='<p class="eq" style="margin:0"><b>'+e.nm+'.</b> '+e.pop+'</p>';
}
function initEl(){
  $$("#elSeg button").forEach(function(b){
    b.addEventListener("click",function(){
      elSel=b.dataset.el;
      $$("#elSeg button").forEach(function(x){ x.setAttribute("aria-pressed",String(x===b)); });
      drawEl();
    });
  });
  drawEl();
}

/* ============================================================
   10 · k2 — SOLVAYŮV PROCES
   ============================================================ */
function drawSv(){
  var k=Math.min(NPSOLV.length,Math.max(1,Math.round(+$("#svKrok").value||1)));
  var st=NPSOLV[k-1];
  $("#svKrokv").textContent=String(k);
  var W=780, H=372, s='';
  s+=npTitle("Solvayův proces · krok "+k+" ze šesti");
  /* hadí uspořádání: řada 1 = kroky 1,2,3 zleva; řada 2 = kroky 4,5,6 zprava */
  var bw=200, bh=76, cols=[40,290,540], rows=[56,190];
  var pos=[ {x:cols[0],y:rows[0]}, {x:cols[1],y:rows[0]}, {x:cols[2],y:rows[0]},
            {x:cols[2],y:rows[1]}, {x:cols[1],y:rows[1]}, {x:cols[0],y:rows[1]} ];
  var i;
  /* spojnice */
  for(i=0;i<5;i++){
    var a=pos[i], b=pos[i+1], col=(i+1===k||i+2===k)?"var(--accent)":"var(--line-strong)";
    if(a.y===b.y) s+=npArrow(a.x+bw+6,a.y+bh/2,b.x-6,b.y+bh/2,col,2);
    else s+=npArrow(a.x+bw/2,a.y+bh+6,b.x+bw/2,b.y-6,col,2);
  }
  /* recyklační šipky */
  s+=npArrow(pos[3].x+bw/2+26,pos[3].y-6,pos[2].x+bw/2+26,pos[2].y+bh+6,"var(--exo)",1.8);
  s+=txt(pos[3].x+bw/2+40,157,"CO₂ zpět",{size:11,w:700,fill:"var(--exo)"});
  s+=npArrow(pos[5].x+bw/2-26,pos[5].y-6,pos[0].x+bw/2-26,pos[0].y+bh+6,"var(--exo)",1.8);
  s+=txt(pos[5].x+bw/2-40,157,"NH₃ zpět",{anchor:"end",size:11,w:700,fill:"var(--exo)"});
  /* boxy */
  for(i=0;i<6;i++){
    var pp=pos[i], on=(i+1===k), col=on?"var(--accent)":(i===0||i===3?"var(--endo)":"var(--ink-3)");
    s+=rect(pp.x,pp.y,bw,bh,{fill:on?"var(--accent)":"var(--surface-2)",r:10,
      stroke:on?"var(--accent)":"var(--line)",sw:on?2:1,style:"fill-opacity:"+(on?".16":".6")});
    s+=txt(pp.x+14,pp.y+24,String(i+1),{size:14,w:700,fill:col});
    var tl=npLines(NPSOLV[i].t,26);
    s+=txt(pp.x+bw/2,pp.y+(tl.length>1?42:50),tl[0],{anchor:"middle",size:12,w:on?700:500,fill:on?"var(--ink)":"var(--ink-2)"});
    if(tl.length>1) s+=txt(pp.x+bw/2,pp.y+60,tl[1],{anchor:"middle",size:12,w:on?700:500,fill:on?"var(--ink)":"var(--ink-2)"});
  }
  /* aktuální krok */
  s+=txt(390,304,st.eq,{anchor:"middle",size:14,w:700,fill:"var(--accent)"});
  s+=txt(390,330,"vstup: "+st.vst,{anchor:"middle",size:11.5,fill:"var(--ink-2)"});
  s+=txt(390,352,"výstup: "+st.vyst,{anchor:"middle",size:11.5,fill:"var(--ink-2)"});
  $("#svWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Schéma Solvayova procesu"');

  npRo("#svRo1","krok "+k,st.t,"z celkem šesti kroků");
  npRo("#svRo2","teplota",st.tep,"za jakých podmínek krok běží");
  npRo("#svRo3","souhrn celého procesu","2 NaCl + CaCO₃ → Na₂CO₃ + CaCl₂","amoniak se v souhrnu vůbec neobjeví");
  $("#svText").innerHTML='<p class="eq" style="margin:0">'+st.d+'</p>';
}

/* ============================================================
   11 · k2 — PROHLEDÁVATELNÁ TABULKA SLOUČENIN
   ============================================================ */
var NPTYPNM={ox:"oxid / peroxid",hyd:"hydroxid",sul:"sůl",hal:"halogenid",kom:"komplex / hydrid"};
function drawTb(){
  var q=($("#tbQ").value||"").trim().toLowerCase();
  var typ=$("#tbTyp").value, prv=$("#tbPrv").value;
  var rows=NPSLOUC.filter(function(c){
    if(typ && c.t!==typ) return false;
    if(prv && c.p!==prv) return false;
    if(!q) return true;
    return (c.f+" "+c.n+" "+c.ox+" "+c.v+" "+c.u).toLowerCase().indexOf(q)>=0;
  });
  $("#tbBody").innerHTML = rows.length ? rows.map(function(c){
    return '<tr><td class="chem"><b>'+c.f+'</b></td>'+
      '<td>'+c.n+'<br><span class="eyebrow" style="font-size:.66rem">'+NPTYPNM[c.t]+'</span></td>'+
      '<td style="font-size:.86rem">'+c.ox+'</td>'+
      '<td style="font-size:.86rem">'+c.v+'</td>'+
      '<td style="font-size:.86rem">'+c.u+'</td></tr>';
  }).join("") : '<tr><td colspan="5" style="text-align:center;color:var(--ink-3);padding:1.4rem">Nic nenalezeno — zkuste jiný dotaz nebo zrušte filtr.</td></tr>';
  $("#tbCount").textContent="Zobrazeno "+rows.length+" sloučenin z celkového přehledu.";
}
