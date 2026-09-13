/* ============================================================
   8 · K4 — SROVNÁVAČ UHLÍK × KŘEMÍK
   ============================================================ */
var csState={p:"chain"};
var CS_SET={
  chain:{
    t:"VAZEBNÁ ENERGIE: PRVEK NA SEBE PROTI PRVKU NA KYSLÍK [kJ·mol⁻¹]",
    data:[{l:"C—C|uhlík na sebe",v:348,c:"var(--cat2)"},{l:"C—O|uhlík na kyslík",v:360,c:"var(--exo)"},
          {l:"Si—Si|křemík na sebe",v:226,c:"var(--cat1)"},{l:"Si—O|křemík na kyslík",v:466,c:"var(--exo)"}],
    r1:["rozdíl u uhlíku","+12 kJ·mol⁻¹","C—O je jen nepatrně pevnější než C—C — řetězec obstojí"],
    r2:["rozdíl u křemíku","+240 kJ·mol⁻¹","Si—O je o víc než dvě stě kJ pevnější než Si—Si"],
    eq:"<b>Uhlík se řetězí sám se sebou. Křemík se řetězí přes kyslík.</b>",
    why:"Nezajímá vás výška sloupců, ale rozdíl uvnitř každé dvojice. U uhlíku je téměř nulový, takže mezi řetězcem a oxidem není energeticky velký rozdíl a řetězec vydrží. U křemíku je propastný, takže kdykoli je poblíž kyslík, křemík po něm sáhne. Odtud organická chemie na jedné straně a geologie na druhé."
  },
  hyd:{
    t:"HYDRIDY: PEVNOST VAZBY NA VODÍK [kJ·mol⁻¹]",
    data:[{l:"C—H|v methanu",v:412,c:"var(--cat2)"},{l:"Si—H|v silanu",v:318,c:"var(--cat1)"},
          {l:"B—H|v diboranu",v:389,c:"var(--cat3)"}],
    r1:["methan CH₄","stálý","na vzduchu netečný, musíte ho zapálit; vodou nereaguje"],
    r2:["silan SiH₄","samozápalný","na vzduchu se vznítí sám, vodou hydrolyzuje na gel a vodík"],
    eq:"<span class='chem'>SiH₄ + 2 O₂ → SiO₂ + 2 H₂O</span> &nbsp;·&nbsp; <span class='chem'>B₂H₆ + 3 O₂ → B₂O₃ + 3 H₂O</span>",
    why:"Rozdíl není jen v pevnosti vazby na vodík, ale hlavně v tom, kolik energie se získá za vzniklý oxid. Spálení silanu dá čtyři vazby Si—O po 466 kJ·mol⁻¹, což je obrovský zisk. Přidejte k tomu obrácenou polaritu — křemík je méně elektronegativní než vodík, takže vodík má v silanech hydridový (záporný) charakter — a máte samozápalnou látku."
  },
  hal:{
    t:"HALOGENIDY: PEVNOST VAZBY NA CHLOR [kJ·mol⁻¹]",
    data:[{l:"C—Cl|v CCl₄",v:338,c:"var(--cat2)"},{l:"Si—Cl|v SiCl₄",v:381,c:"var(--cat1)"},
          {l:"B—Cl|v BCl₃",v:456,c:"var(--cat3)"}],
    r1:["CCl₄","nehydrolyzuje","uhlík nemá orbitaly d — voda nemá kudy zaútočit; překážka je kinetická"],
    r2:["SiCl₄ a BCl₃","prudce hydrolyzují","křemík má volné 3d, bor prázdný orbital 2p — oba přijmou pár vody"],
    eq:"<span class='chem'>SiCl₄ + 4 H₂O → H₄SiO₄ + 4 HCl</span> &nbsp;·&nbsp; <span class='chem'>BCl₃ + 3 H₂O → H₃BO₃ + 3 HCl</span>",
    why:"Všimněte si, že vazba Si—Cl je pevnější než C—Cl, a přesto hydrolyzuje právě ta pevnější. Termodynamika tady tedy nerozhoduje — rozhoduje, jestli reakce má kudy začít. Uhlík má uzavřený oktet a kolem malého atomu je natěsnáno čtyři objemné chlory; pátá částice se prostě nevejde."
  },
  oxid:{
    t:"OXIDY: TEPLOTA, PŘI KTERÉ LÁTKA PŘESTANE BÝT PEVNÁ [°C]",
    data:[{l:"CO₂|sublimuje",v:-78.5,c:"var(--cat2)"},{l:"SiO₂|taje",v:1713,c:"var(--cat1)"},
          {l:"B₂O₃|taje",v:450,c:"var(--cat3)"}],
    r1:["CO₂","molekula","lineární O=C=O, dvě vazby π — mezi molekulami jen slabé síly"],
    r2:["SiO₂","prostorová síť","křemík vazbu π neumí, musí udělat čtyři vazby σ — vznikne kámen"],
    eq:"tentýž vzorec, tentýž poměr, o dva tisíce stupňů jiná teplota tání",
    why:"Tohle je nejnázornější důsledek neschopnosti křemíku tvořit vazby π. Uhlík se vysytí dvěma dvojnými vazbami a zůstane malou molekulou; křemík musí udělat čtyři jednoduché vazby, což ho nutí propojit se se sousedy do nekonečné sítě. Oxid boritý leží mezi nimi: je také polymerní, ale jeho síť z trojúhelníků BO₃ je nepravidelná a snadno se rozpadá — proto tak ochotně tuhne jako sklo."
  }
};
function drawCs(){
  var d=CS_SET[csState.p];
  press("#csProp",csState.p);
  var neg = csState.p==="oxid";
  var W=720,H=260;
  if(neg){
    /* speciální graf s možnými zápornými hodnotami */
    var L=64,R=18,T=34,B=54,pw=W-L-R,ph=H-T-B,s='';
    s+=txt(L,18,d.t,{size:11.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.07em"});
    var min=-200,max=1800;
    function Y(v){ return T+ph-(v-min)/(max-min)*ph; }
    [-200,200,600,1000,1400,1800].forEach(function(v){
      s+=line(L,Y(v),L+pw,Y(v),{c:"var(--line)",w:1,dash:v===0?"":"3 4"});
      s+=txt(L-8,Y(v)+4,String(v),{anchor:"end",size:10,fill:"var(--ink-3)",mono:true});
    });
    s+=line(L,Y(0),L+pw,Y(0),{c:"var(--line-strong)",w:1.6});
    var bw=pw/d.data.length;
    d.data.forEach(function(x,i){
      var bx=L+i*bw+bw*0.2, bwid=bw*0.6;
      var y0=Y(0), y1=Y(x.v);
      s+=rect(bx,Math.min(y0,y1),bwid,Math.abs(y1-y0),{fill:x.c,r:5});
      s+=txt(bx+bwid/2,(x.v<0?y0+18:y1-8),fmt(x.v,1),{anchor:"middle",size:11.5,w:700,fill:x.c,mono:true});
      var parts=x.l.split("|");
      parts.forEach(function(p,j){ s+=txt(bx+bwid/2,T+ph+18+j*13,p,{anchor:"middle",size:10.5,w:j?400:600,fill:j?"var(--ink-3)":"var(--ink-2)"}); });
    });
    $("#csWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="'+d.t+'"');
  } else {
    $("#csWrap").innerHTML=barChart({W:W,H:H,B:56,data:d.data,dec:0,title:d.t,aria:d.t});
  }
  ro("#csRo1",d.r1[0],d.r1[1],d.r1[2]);
  ro("#csRo2",d.r2[0],d.r2[1],d.r2[2]);
  $("#csTxt").innerHTML=d.eq;
  $("#csWhy").innerHTML=d.why;
}
function initCs(){
  $$("#csProp button").forEach(function(b){ b.addEventListener("click",function(){ csState.p=b.dataset.v; drawCs(); }); });
  drawCs();
}

/* ============================================================
   9 · K5 — STAVEBNICE KŘEMIČITANŮ
   ============================================================ */
var siState={t:"orto"};
function S_(id){ for(var i=0;i<SILIK.length;i++) if(SILIK[i].id===id) return SILIK[i]; return SILIK[0]; }
/* tetraedr v pohledu shora: trojúhelník + středový kroužek */
function tetra(cx,cy,r,rot,shared){
  /* shared = pole indexů vrcholů (0,1,2) sdílených se sousedem; třetí kyslík je nahoře pod středem */
  var s='', pts=[];
  for(var i=0;i<3;i++){
    var a=Math.PI/180*(rot+120*i);
    pts.push([cx+r*Math.cos(a), cy+r*Math.sin(a)]);
  }
  s+='<path d="M'+pts[0][0]+' '+pts[0][1]+' L'+pts[1][0]+' '+pts[1][1]+' L'+pts[2][0]+' '+pts[2][1]+' Z" style="fill:var(--accent);fill-opacity:.16;stroke:var(--accent);stroke-width:1.8;stroke-linejoin:round"/>';
  for(var i=0;i<3;i++) s+=line(cx,cy,pts[i][0],pts[i][1],{c:"var(--accent)",w:1.1,dash:"3 3"});
  for(var i=0;i<3;i++){
    var sh=(shared||[]).indexOf(i)>=0;
    s+=atom(pts[i][0],pts[i][1],5.6,sh?"var(--exo)":"var(--endo)","",0);
  }
  s+=atom(cx,cy,7,"var(--accent)","",0);
  return {s:s,p:pts};
}
function drawSi(){
  var d=S_(siState.t);
  press("#siType",siState.t);
  var W=720,H=282,s='';
  s+=txt(24,22,d.jm.toUpperCase()+" · "+d.pod,{size:12,w:700,fill:"var(--accent)",style:"letter-spacing:.07em"});
  s+=txt(24,42,"sdílených vrcholů na tetraedr: "+fmt(d.sdil,1)+"  ·  poměr Si : O = "+d.pom,{size:11,fill:"var(--ink-3)"});
  var cy=155, r=32;
  if(d.id==="orto"){
    [190,360,530].forEach(function(cx){ s+=tetra(cx,cy,r,-90,[]).s; });
    s+=txt(360,cy+80,"tetraedry se nedotýkají — každý má všechny čtyři kyslíky jen pro sebe",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
    s+=txt(360,cy+100,"mezi nimi sedí kationty kovů (Mg²⁺, Fe²⁺, Zr⁴⁺)",{anchor:"middle",size:11,fill:"var(--ink-3)"});
  } else if(d.id==="soro"){
    /* dvojice vlevo, kruh vpravo */
    var a=tetra(190,cy,r,-90,[1]), b=tetra(190+2*r*0.866,cy,r,90,[1]);
    s+=a.s+b.s;
    s+=txt(215,cy+72,"dvojice Si₂O₇⁶⁻",{anchor:"middle",size:11,w:600,fill:"var(--ink-2)"});
    var ccx=500, ccy=cy, rr=58;
    for(var i=0;i<6;i++){
      var ang=Math.PI/180*(60*i-90);
      s+=tetra(ccx+rr*Math.cos(ang), ccy+rr*Math.sin(ang), 22, (i%2?90:-90)+60*i, [0,1]).s;
    }
    s+=txt(ccx,ccy+96,"kruh Si₆O₁₈¹²⁻ (beryl)",{anchor:"middle",size:11,w:600,fill:"var(--ink-2)"});
    s+=txt(360,cy+120,"každý tetraedr sdílí jeden nebo dva vrcholy — vznikne konečný ostrůvek, ne nekonečný řetěz",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  } else if(d.id==="retez"){
    for(var i=0;i<7;i++){
      var cx=120+i*80, up=(i%2===0);
      s+=tetra(cx,cy+(up?-10:10),r,up?-90:90,up?[0,1]:[0,1]).s;
    }
    s+=hArrow(96,660,cy+70,"var(--exo)","nekonečný řetěz — pokračuje na obě strany",true);
    s+=txt(360,cy+100,"každý tetraedr sdílí dva vrcholy · vzorec (SiO₃²⁻)ₙ · pyroxeny",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  } else if(d.id==="dvojity"){
    for(var i=0;i<7;i++){
      var cx=120+i*80;
      s+=tetra(cx,cy-30,26,-90,[0,1]).s;
      s+=tetra(cx,cy+30,26,90,[0,1,2]).s;
    }
    s+=hArrow(96,660,cy+78,"var(--exo)","dva řetězce srostlé do pásu",true);
    s+=txt(360,cy+108,"polovina tetraedrů sdílí dva vrcholy, polovina tři → průměr 2,5 · (Si₄O₁₁⁶⁻)ₙ · amfiboly",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  } else if(d.id==="vrstva"){
    for(var row=0;row<3;row++){
      for(var i=0;i<8;i++){
        var cx=110+i*72+(row%2?36:0), cyy=90+row*58;
        s+=tetra(cx,cyy,24,row%2?90:-90,[0,1,2]).s;
      }
    }
    s+=txt(360,258,"tři sdílené vrcholy → zřetězení do celé roviny · (Si₂O₅²⁻)ₙ · slídy, mastek, jíly",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  } else {
    /* prostorová síť */
    for(var row=0;row<3;row++){
      for(var i=0;i<8;i++){
        var cx=110+i*72+(row%2?36:0), cyy=88+row*56;
        s+=tetra(cx,cyy,24,row%2?90:-90,[0,1,2]).s;
        if(i<7) s+=line(cx+22,cyy,cx+50,cyy,{c:"var(--exo)",w:2});
        if(row<2) s+=line(cx,cyy+22,cx+(row%2?36:-36),cyy+34,{c:"var(--exo)",w:2});
      }
    }
    s+=txt(360,254,"všechny čtyři vrcholy sdílené → náboj je nula → to je oxid křemičitý SiO₂",{anchor:"middle",size:11.5,w:700,fill:"var(--accent)"});
  }
  $("#siWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Stavebnice křemičitanů: '+d.jm+'"');

  ro("#siRo1","vzorec aniontu",d.vz,d.naboj);
  ro("#siRo2","poměr Si : O",d.pom,"sdílený kyslík se počítá jen poloviční");
  ro("#siRo3","sdílených vrcholů",fmt(d.sdil,1),"na jeden tetraedr SiO₄");
  $("#siTxt").innerHTML="<b>"+d.jm+"</b> — "+d.pod;
  $("#siPop").innerHTML=d.pop;
  $("#siMin").innerHTML="<b>Příklady minerálů:</b> "+d.min+"<br><b>Typický projev:</b> "+d.vlast;
}
function initSi(){
  $$("#siType button").forEach(function(b){ b.addEventListener("click",function(){ siState.t=b.dataset.v; drawSi(); }); });
  drawSi();
}

/* ============================================================
   10 · K5 — MODIFIKACE SiO₂ PODLE TEPLOTY
   ============================================================ */
var qaState={t:25};
var QA_ZONES=[
  {a:0,b:573,jm:"α-křemen",pop:"Nejběžnější modifikace. Tetraedry SiO₄ jsou pospojované do šroubovic; krystal je opticky aktivní a piezoelektrický — proto se z něj dělají krystaly do hodinek.",zn:"trigonální"},
  {a:573,b:870,jm:"β-křemen",pop:"Tetraedry se jen mírně pootočí do souměrnějšího uspořádání. Přeměna je rychlá, vratná a doprovází ji skoková změna objemu — proto při vypalování keramiky hrozí kolem 573 °C praskání.",zn:"hexagonální"},
  {a:870,b:1470,jm:"tridymit",pop:"Přeuspořádání sítě do jiného typu propojení. Přeměna je pomalá, protože vyžaduje rozbití a znovuvytvoření vazeb Si—O.",zn:"hexagonální"},
  {a:1470,b:1713,jm:"cristobalit",pop:"Nejotevřenější a nejméně hustá krystalová modifikace SiO₂. Vzniká při nejvyšších teplotách, při kterých je SiO₂ ještě pevný.",zn:"kubický"},
  {a:1713,b:2000,jm:"tavenina",pop:"Síť je roztavená, ale vazby Si—O v ní z velké části přetrvávají — proto je tavenina mimořádně viskózní. Rychlým zchlazením z ní vznikne křemenné sklo, ne krystal.",zn:"amorfní"}
];
function drawQa(){
  var t=qaState.t, W=728,H=238, L=44,R=28,T=72,B=52, pw=W-L-R, s='';
  s+=txt(L,20,"MODIFIKACE OXIDU KŘEMIČITÉHO PODLE TEPLOTY",{size:11.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.07em"});
  s+=txt(L,38,"tetraedr SiO₄ je ve všech modifikacích stejný — mění se jen jeho natočení a způsob propojení",{size:10.5,fill:"var(--ink-3)"});
  function X(v){ return L+v/2000*pw; }
  var cur=null;
  var cols=["var(--cat1)","var(--cat2)","var(--cat3)","var(--cat4)","var(--accent)"];
  QA_ZONES.forEach(function(z,i){
    var x1=X(z.a), x2=X(z.b), act=(t>=z.a && t<z.b) || (i===QA_ZONES.length-1 && t>=z.a);
    if(act) cur=z;
    s+=rect(x1,T,x2-x1-2,54,{fill:cols[i],r:6,style:"fill-opacity:"+(act?0.85:0.22)});
    s+=txt((x1+x2)/2,T+32,z.jm,{anchor:"middle",size:11.5,w:700,fill:act?"var(--accent-ink)":"var(--ink-2)"});
  });
  /* teplotní osa */
  s+=line(L,T+72,L+pw,T+72,{c:"var(--line-strong)",w:1.4});
  [0,573,870,1470,1713,2000].forEach(function(v){
    s+=line(X(v),T+72,X(v),T+78,{c:"var(--line-strong)",w:1.4});
    s+=txt(X(v),T+92,String(v),{anchor:"middle",size:10,fill:"var(--ink-3)",mono:true});
  });
  s+=txt(L+pw/2,T+112,"teplota [°C]",{anchor:"middle",size:11,w:600,fill:"var(--ink-2)"});
  /* ukazatel */
  s+=line(X(t),T-8,X(t),T+78,{c:"var(--ink)",w:2.4});
  s+='<path d="M'+X(t)+' '+(T-8)+' l-5 -8 l10 0 z" style="fill:var(--ink)"/>';
  s+=txt(X(t),T-14,fmt(t,0)+" °C",{anchor:"middle",size:11.5,w:700,fill:"var(--ink)"});
  $("#qaWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Modifikace oxidu křemičitého podle teploty"');

  cur=cur||QA_ZONES[QA_ZONES.length-1];
  ro("#qaRo1","modifikace",cur.jm,"soustava: "+cur.zn);
  ro("#qaRo2","teplota tání SiO₂","1713 °C","nad ní je tavenina, ze které se rychlým chlazením získá sklo");
  ro("#qaRo3","stavební jednotka","SiO₄","tetraedr, úhel O—Si—O = 109,5°, ve všech modifikacích stejný");
  $("#qaTxt").innerHTML="<b>"+cur.jm+".</b> "+cur.pop;
}
function initQa(){
  $("#qaT").addEventListener("input",function(){
    qaState.t=+this.value; $("#qaTv").textContent=qaState.t+" °C"; drawQa();
  });
  $("#qaTv").textContent=qaState.t+" °C";
  drawQa();
}
