/* ============================================================
   18 · GRAF — heat mapa trendů (1.–4. perioda)
   ============================================================ */
var heatState={q:"r"};
var HEATQ={
  r:{lab:"Kovalentní poloměr",unit:"pm",get:function(e){return e.r;},dec:0,
     note:"Poloměr <b>klesá v periodě doprava</b> (roste Z<sub>ef</sub>, stejná slupka) a <b>roste ve skupině dolů</b> (přibývá slupka). Největší atom v mapě je K, nejmenší He a F. Všimněte si, jak pomalu klesá poloměr v řadě Sc → Zn: elektrony jdou do vnitřní 3d a stíní."},
  i1:{lab:"1. ionizační energie",unit:"kJ·mol⁻¹",get:function(e){return e.i1;},dec:0,
     note:"Ionizační energie <b>roste doprava a nahoru</b>: vrcholy jsou vzácné plyny (He 2372), propady alkalické kovy (K 419). Přesně opačný obrázek než poloměr — čím blíž a pevněji je elektron vázán, tím hůř se trhá. Hledejte zuby Be &gt; B a N &gt; O."},
  ea:{lab:"Elektronová afinita",unit:"kJ·mol⁻¹",get:function(e){return e.ea;},dec:0,
     note:"Elektronová afinita je „rozházená“, ale trend drží: nejvyšší mají <b>halogeny</b> (Cl 349 &gt; F 328!), vysokou i O, S, C, Si. Pomlčka = stabilní anion nevzniká (vzácné plyny s plnou slupkou, Be a Mg s plným ns², N se stabilním 2p³, Zn a Mn)."},
  en:{lab:"Elektronegativita",unit:"(Pauling)",get:function(e){return e.en;},dec:2,
     note:"Elektronegativita roste <b>doprava a nahoru</b> — maximum F 3,98, minimum v mapě K 0,82 (Cs 0,79 je až v 6. periodě). Kovy mají χ zhruba pod 2, nekovy nad 2; hranice běží po diagonále polokovů. Vzácné plyny hodnotu nemají (Kr 3,0 je odhad)."}
};
function drawHeat(){
  var q=HEATQ[heatState.q], cell=36, gp=3, W=30+18*(cell+gp)+10, H=44+4*(cell+gp)+10, s='';
  var vals=[], min=Infinity, max=-Infinity, minE=null, maxE=null;
  for(var Z=1;Z<=36;Z++){ var e=EL(Z), v=q.get(e); if(v!==null){ if(v<min){min=v;minE=e;} if(v>max){max=v;maxE=e;} } }
  for(var c=1;c<=18;c++) s+=txt(30+(c-1)*(cell+gp)+cell/2,20,c,{anchor:"middle",size:10,fill:"var(--ink-3)",mono:true});
  for(var r=1;r<=4;r++) s+=txt(18,44+(r-1)*(cell+gp)+cell/2+4,r,{anchor:"end",size:10,fill:"var(--ink-3)",mono:true});
  for(var Z2=1;Z2<=36;Z2++){
    var e2=EL(Z2), p=ptPos(Z2), v2=q.get(e2);
    var x=30+(p.col-1)*(cell+gp), y=44+(p.row-1)*(cell+gp);
    if(v2===null){
      s+=rect(x,y,cell,cell,{fill:"var(--surface-3)",r:5});
      s+=txt(x+cell/2,y+15,e2.s,{anchor:"middle",size:11,w:700,fill:"var(--ink-3)"});
      s+=txt(x+cell/2,y+29,"—",{anchor:"middle",size:9,fill:"var(--ink-3)",mono:true});
    } else {
      var f=(v2-min)/(max-min), op=0.07+0.5*f;
      s+=rect(x,y,cell,cell,{fill:"var(--accent)",r:5,style:"fill-opacity:"+op.toFixed(2)+";stroke:var(--line);stroke-width:1"});
      s+=txt(x+cell/2,y+15,e2.s,{anchor:"middle",size:11,w:700,fill:"var(--ink)"});
      s+=txt(x+cell/2,y+29,fmt(v2,q.dec),{anchor:"middle",size:8.5,fill:"var(--ink-2)",mono:true});
    }
  }
  $("#heatWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Heat mapa: '+q.lab+'"');
  $$("#heatQ button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===heatState.q); });
  $("#heatLegend").innerHTML='<span class="li"><span class="sw" style="background:var(--accent);opacity:.15"></span>nízká hodnota</span><span class="li"><span class="sw" style="background:var(--accent);opacity:.6"></span>vysoká hodnota</span><span class="li"><span class="sw" style="background:var(--surface-3)"></span>hodnota není definována</span><span class="li">'+q.lab+' '+q.unit+'</span>';
  $("#heatRo1").innerHTML='<span class="k">Minimum</span><span class="v">'+minE.s+' '+fmt(min,q.dec)+'</span><span class="h">'+minE.n+' · '+q.unit+'</span>';
  $("#heatRo2").innerHTML='<span class="k">Maximum</span><span class="v">'+maxE.s+' '+fmt(max,q.dec)+'</span><span class="h">'+maxE.n+' · '+q.unit+'</span>';
  var dir = heatState.q==="r" ? "↙ roste doleva a dolů" : "↗ roste doprava a nahoru";
  $("#heatRo3").innerHTML='<span class="k">Směr trendu</span><span class="v" style="font-size:1rem">'+dir+'</span><span class="h">poměr max/min = '+fmt(max/min,1)+'×</span>';
  $("#heatNote").innerHTML=q.note;
}

/* ============================================================
   19 · WIDGET — poloměry: izoelektronové řady, atom vs. ion
   ============================================================ */
var radState={mode:"Ne"};
function drawRad(){
  var W=700,H=280,s='';
  if(radState.mode==="atom"){
    var sc=0.3;
    ATOM_VS_ION.forEach(function(p,i){
      var col=i%5, row=Math.floor(i/5), cx=70+col*136, cy=80+row*130;
      var isAn=p.ion.indexOf("⁻")>=0;
      s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(p.ra*sc).toFixed(1)+'" style="fill:none;stroke:var(--ink-3);stroke-width:1.6;stroke-dasharray:4 3"/>';
      s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(p.ri*sc).toFixed(1)+'" style="fill:'+(isAn?"var(--endo)":"var(--exo)")+';fill-opacity:.28;stroke:'+(isAn?"var(--endo)":"var(--exo)")+';stroke-width:1.8"/>';
      s+=txt(cx,cy+4,p.ion,{anchor:"middle",size:12,w:700,fill:"var(--ink)"});
      s+=txt(cx,cy+66,p.a+" "+p.ra+" → "+p.ion.split(" ")[0]+" "+p.ri+" pm",{anchor:"middle",size:10,fill:"var(--ink-3)",mono:true});
    });
    s+=txt(20,H-6,"přerušovaně = atom (kovalentní poloměr) · plně = ion (Shannon) · oranžové kationty menší, modrozelené anionty větší",{size:10.5,fill:"var(--ink-3)"});
    $("#radNote").innerHTML="<b>Kation je vždy menší než atom</b> (Na 166 → Na⁺ 102 pm: zmizela celá 3. slupka), <b>anion vždy větší</b> (Cl 102 → Cl⁻ 181 pm: přibylo odpuzování). Čím větší náboj, tím větší rozdíl: Al³⁺ má jen 54 pm, méně než polovinu atomu.";
  } else {
    var ser=ISO_SERIES[radState.mode], n=ser.items.length, sc2=0.42, step=(W-60)/n;
    s+=txt(20,22,"IZOELEKTRONOVÁ ŘADA ["+ser.core+"] · VŠECHNY ČÁSTICE MAJÍ "+ser.n+" ELEKTRONŮ",{size:11,w:700,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
    ser.items.forEach(function(it,i){
      var cx=30+step*(i+0.5), cy=140, r=it.r*sc2;
      var isAn=it.ion.indexOf("⁻")>=0;
      s+='<circle cx="'+cx.toFixed(1)+'" cy="'+cy+'" r="'+r.toFixed(1)+'" style="fill:'+(isAn?"var(--endo)":"var(--exo)")+';fill-opacity:.25;stroke:'+(isAn?"var(--endo)":"var(--exo)")+';stroke-width:1.8"/>';
      s+=txt(cx,cy+5,it.ion,{anchor:"middle",size:13,w:700,fill:"var(--ink)"});
      s+=txt(cx,cy+r+18,it.r+" pm",{anchor:"middle",size:11,w:600,fill:"var(--ink-2)",mono:true});
      s+=txt(cx,cy+r+32,"Z = "+it.Z,{anchor:"middle",size:10,fill:"var(--ink-3)",mono:true});
    });
    s+=line(40,H-18,W-40,H-18,{c:"var(--accent)",w:1.6});
    s+='<path d="M'+(W-34)+' '+(H-18)+' l-8 -4 l0 8 z" style="fill:var(--accent)"/>';
    s+=txt(W/2,H-24,"roste náboj jádra Z → stejný obal je přitahován silněji → poloměr klesá",{anchor:"middle",size:11,w:600,fill:"var(--accent)"});
    $("#radNote").innerHTML = radState.mode==="Ne"
      ? "Sedm částic, jedna konfigurace 1s² 2s² 2p⁶ — a přesto poloměr od N³⁻ (146 pm) k Al³⁺ (54 pm) klesne skoro třikrát. Jediné, co se mění, je počet protonů. Přepněte na řadu [Ar] a uvidíte totéž o slupku výš."
      : "Řada [Ar] má 18 elektronů: od P³⁻ (212 pm) po Ti⁴⁺ (61 pm). Pořadí je opět dané jen nábojem jádra. Poznámka: Ti⁴⁺ a Sc³⁺ existují spíš formálně, v krystalech jsou vazby už značně kovalentní.";
  }
  $("#radWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Porovnání poloměrů částic"');
  $$("#radMode button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===radState.mode); });
}

/* ============================================================
   20 · GRAF — první ionizační energie Z = 1–20
   ============================================================ */
var ieMode="none";
function drawIE(){
  var W=760,H=340,L=60,R=740,T=30,B=282, max=2500, n=20, bw=(R-L)/n, s='';
  var y=function(v){ return B-(v/max)*(B-T); };
  for(var g=0;g<=2500;g+=500){ s+=line(L,y(g),R,y(g),{c:"var(--line)",w:1}); s+=txt(L-8,y(g)+4,g,{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true}); }
  s+=txt(16,(T+B)/2,"I₁ [kJ·mol⁻¹]",{anchor:"middle",size:11,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:16px "+((T+B)/2)+"px;letter-spacing:.06em"});
  var hi={none:[],noble:[2,10,18],alkali:[3,11,19],anom:[4,5,7,8,12,13,15,16]}[ieMode];
  var pts=[];
  for(var Z=1;Z<=n;Z++){
    var e=EL(Z), x=L+(Z-1)*bw+3, w=bw-6, b=block(Z), col=b==="s"?"var(--cat1)":"var(--cat3)";
    var isHi=hi.indexOf(Z)>=0;
    s+=rect(x,y(e.i1),w,B-y(e.i1),{fill:isHi?"var(--accent)":col,r:3,style:isHi?"":"fill-opacity:.55"});
    s+=txt(x+w/2,y(e.i1)-5,fmt(e.i1,0),{anchor:"middle",size:9,fill:isHi?"var(--accent)":"var(--ink-3)",mono:true,w:isHi?700:400});
    s+=txt(x+w/2,B+15,e.s,{anchor:"middle",size:11,w:isHi?700:600,fill:isHi?"var(--accent)":"var(--ink-2)"});
    s+=txt(x+w/2,B+28,Z,{anchor:"middle",size:9,fill:"var(--ink-3)",mono:true});
    pts.push((x+w/2).toFixed(1)+","+y(e.i1).toFixed(1));
  }
  s+='<polyline points="'+pts.join(" ")+'" style="fill:none;stroke:var(--ink-2);stroke-width:1.3;stroke-dasharray:3 3"/>';
  /* hranice period */
  [2.5,10.5,18.5].forEach(function(zb,i){ var xx=L+(zb-1)*bw+bw/2; s+=line(xx,T,xx,B,{c:"var(--line-strong)",w:1,dash:"5 4"}); s+=txt(xx+4,T+10,(i+2)+". perioda →",{size:10,fill:"var(--ink-3)"}); });
  s+=txt(L+4,T+10,"1. p.",{size:10,fill:"var(--ink-3)"});
  $("#ieWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="První ionizační energie prvků Z = 1 až 20"');
  $$("#ieMode button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===ieMode); });
  var notes={
    none:"Přepněte na <b>Alkalické kovy</b>: každá perioda začíná propadem, protože nový elektron sedí sám v nové slupce. Přepněte na <b>Anomálie</b>: u B a O je hodnota nižší než u souseda vlevo — tam se trhá elektron z 2p (B), resp. spárovaný elektron (O).",
    noble:"<b>Vrcholy = vzácné plyny.</b> He 2372, Ne 2081, Ar 1521 kJ·mol⁻¹: uzavřená slupka a nejvyšší Z<sub>ef</sub> v periodě. A vrcholy klesají dolů skupinou — argon už jde ionizovat snáz než helium, protože je elektron dál.",
    alkali:"<b>Propady = alkalické kovy.</b> Li 520, Na 496, K 419: jediný valenční elektron v nové slupce, silně stíněný. Skok z He na Li je největší pád v celém grafu (2372 → 520) — z uzavřené slupky do nové.",
    anom:"<b>Anomálie.</b> Be 900 &gt; B 801 a Mg 738 &gt; Al 578: u B a Al se trhá elektron z p, který leží výš než s. N 1402 &gt; O 1314 a P 1012 &gt; S 1000: u O a S se trhá spárovaný elektron z p⁴, kterému odpuzování od souseda v orbitalu pomáhá ven. Zpola zaplněné p³ je naopak stabilní."
  };
  $("#ieNote").innerHTML=notes[ieMode];
}

/* ============================================================
   21 · WIDGET — trenažér: skupina z postupných ionizačních energií
   ============================================================ */
var sieI=0, sieScore=0, sieAnswered=false;
var SIE_GROUPS=[1,2,13,14,15,16,17];
function sieJump(ie){ var best=1,bi=0; for(var i=1;i<ie.length;i++){ var r=ie[i]/ie[i-1]; if(r>best){best=r;bi=i;} } return {k:bi,ratio:best}; }
function drawSieChart(){
  var it=IE_SERIES[sieI], W=700,H=250,L=60,R=680,T=30,B=205, n=it.ie.length, bw=(R-L)/n, s='';
  var lmin=Math.log10(300), lmax=Math.log10(80000);
  var y=function(v){ return B-((Math.log10(v)-lmin)/(lmax-lmin))*(B-T); };
  [1000,10000].forEach(function(g){ s+=line(L,y(g),R,y(g),{c:"var(--line)",w:1}); s+=txt(L-8,y(g)+4,g,{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true}); });
  s+=txt(14,(T+B)/2,"I [kJ·mol⁻¹] · log",{anchor:"middle",size:10.5,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:14px "+((T+B)/2)+"px"});
  it.ie.forEach(function(v,i){
    var x=L+i*bw+6, w=bw-12;
    s+=rect(x,y(v),w,B-y(v),{fill:"var(--cat2)",r:3,style:"fill-opacity:.6"});
    s+=txt(x+w/2,y(v)-5,fmt(v,0),{anchor:"middle",size:10,fill:"var(--ink-2)",mono:true});
    s+=txt(x+w/2,B+16,"I"+subn(i+1),{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
    if(i>0){ s+=txt(x-6,B+32,"×"+fmt(v/it.ie[i-1],1),{anchor:"middle",size:9.5,fill:"var(--ink-3)",mono:true}); }
  });
  s+=txt(L,T-10,"postupné ionizační energie neznámého prvku · pod grafem poměr I"+subn("k+1")+"/I"+subn("k"),{size:10.5,fill:"var(--ink-3)"});
  $("#sieWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Postupné ionizační energie"');
  $("#sieHead").innerHTML=it.ie.map(function(_,i){ return '<th class="n">I'+subn(i+1)+'</th>'; }).join("");
  $("#sieRow").innerHTML=it.ie.map(function(v){ return '<td class="n">'+fmt(v,0)+'</td>'; }).join("");
}
function drawSie(){
  var it=IE_SERIES[sieI];
  $("#sieQn").textContent=sieI+1; $("#sieQtot").textContent=IE_SERIES.length; $("#sieScore").textContent=sieScore;
  drawSieChart();
  var names={1:"1 · alkalické kovy",2:"2 · kovy alk. zemin",13:"13 · skupina boru",14:"14 · skupina uhlíku",15:"15 · skupina dusíku",16:"16 · chalkogeny",17:"17 · halogeny"};
  $("#sieOpts").innerHTML=SIE_GROUPS.map(function(g){ return '<button class="btn" type="button" data-g="'+g+'">'+names[g]+'</button>'; }).join("");
  var ex=$("#sieExplain"); ex.style.display="none"; ex.className="explain";
  $("#sieNext").disabled=true; sieAnswered=false;
  $$("#sieOpts button").forEach(function(b){
    b.addEventListener("click",function(){
      if(sieAnswered) return; sieAnswered=true;
      var g=+b.dataset.g, ok=g===it.g, j=sieJump(it.ie);
      if(ok) sieScore++;
      $("#sieScore").textContent=sieScore;
      var e=ELS(it.s);
      ex.style.display="flex"; ex.style.background=ok?"var(--ok-soft)":"var(--bad-soft)"; ex.style.borderColor=ok?"var(--ok)":"var(--bad)";
      ex.innerHTML='<span class="verdict" style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+(ok?"✓ Správně":"✕ Špatně — správně je skupina "+it.g)+'</span><span class="eyebrow">Proč</span><div>Největší skok je mezi I'+subn(j.k)+' = '+fmt(it.ie[j.k-1],0)+' a I'+subn(j.k+1)+' = '+fmt(it.ie[j.k],0)+' kJ·mol⁻¹ (poměr '+fmt(j.ratio,1)+'×). '+(j.k)+'. elektron byl poslední valenční, '+(j.k+1)+'. se trhá z uzavřené vnitřní slupky. Prvek má tedy <b>'+j.k+' valenčn'+(j.k===1?"í elektron":(j.k<5?"í elektrony":"ích elektronů"))+'</b> → skupina <b>'+it.g+'</b>. Je to <b>'+e.n+'</b> ('+cfgShort(e.Z)+').</div>';
      $$("#sieOpts button").forEach(function(x){ x.disabled=true; x.style.opacity=(+x.dataset.g===it.g)?"1":".5"; if(+x.dataset.g===it.g) x.style.borderColor="var(--ok)"; });
      $("#sieNext").disabled = sieI>=IE_SERIES.length-1;
      if(sieI>=IE_SERIES.length-1){ toast("Trenažér dokončen: "+sieScore+" z "+IE_SERIES.length+" správně."); if(sieScore>=10) markDone("k7"); }
    });
  });
}
function initSie(){
  $("#sieNext").addEventListener("click",function(){ if(sieI<IE_SERIES.length-1){ sieI++; drawSie(); } });
  $("#sieReset").addEventListener("click",function(){ sieI=0; sieScore=0; drawSie(); });
  drawSie();
}

/* ============================================================
   22 · WIDGET — elektronegativita a polarita vazby
   ============================================================ */
var enState={a:"H",b:"Cl"};
function drawEN(){
  var a=ELS(enState.a), b=ELS(enState.b), d=Math.abs(a.en-b.en);
  var type = d<0.4 ? {t:"nepolární kovalentní",c:"var(--cat1)",h:"elektrony sdílené rovnoměrně"} : (d<=1.7 ? {t:"polární kovalentní",c:"var(--cat3)",h:"parciální náboje δ+ / δ−"} : {t:"iontová (převážně)",c:"var(--cat4)",h:"elektron prakticky předán"});
  var W=700,H=200,L=40,R=660,yb=140,s='';
  var x=function(v){ return L+(v/3.4)*(R-L); };
  s+=rect(x(0),yb-12,x(0.4)-x(0),24,{fill:"var(--cat1)",r:4,style:"fill-opacity:.35"});
  s+=rect(x(0.4),yb-12,x(1.7)-x(0.4),24,{fill:"var(--cat3)",r:4,style:"fill-opacity:.35"});
  s+=rect(x(1.7),yb-12,x(3.4)-x(1.7),24,{fill:"var(--cat4)",r:4,style:"fill-opacity:.35"});
  s+=txt(x(0.2),yb+34,"nepolární",{anchor:"middle",size:10.5,w:600,fill:"var(--cat1)"});
  s+=txt(x(1.05),yb+34,"polární kovalentní",{anchor:"middle",size:10.5,w:600,fill:"var(--cat3)"});
  s+=txt(x(2.55),yb+34,"iontová",{anchor:"middle",size:10.5,w:600,fill:"var(--cat4)"});
  [0,0.4,1.7,3.4].forEach(function(v){ s+=txt(x(v),yb+50,fmt(v,1),{anchor:"middle",size:10,fill:"var(--ink-3)",mono:true}); });
  s+=txt(R,yb-20,"Δχ",{anchor:"end",size:11,w:600,fill:"var(--ink-3)"});
  var xm=x(Math.min(d,3.4));
  s+='<path d="M'+xm+' '+(yb-16)+' l-7 -12 l14 0 z" style="fill:'+type.c+'"/>';
  s+=txt(xm,yb-34,"Δχ = "+fmt(d,2),{anchor:"middle",size:12,w:700,fill:type.c,mono:true});
  /* dva atomy */
  var neg = a.en>=b.en ? a : b, pos = a.en>=b.en ? b : a;
  var cx1=250, cx2=450, cy=52;
  s+='<circle cx="'+cx1+'" cy="'+cy+'" r="24" style="fill:var(--exo);fill-opacity:'+(d<0.4?.12:.3)+';stroke:var(--exo);stroke-width:1.6"/>';
  s+='<circle cx="'+cx2+'" cy="'+cy+'" r="24" style="fill:var(--endo);fill-opacity:'+(d<0.4?.12:.3)+';stroke:var(--endo);stroke-width:1.6"/>';
  s+=line(cx1+24,cy,cx2-24,cy,{c:"var(--ink-2)",w:2.2});
  s+=txt(cx1,cy+5,pos.s,{anchor:"middle",size:15,w:700,fill:"var(--ink)"});
  s+=txt(cx2,cy+5,neg.s,{anchor:"middle",size:15,w:700,fill:"var(--ink)"});
  if(d>=0.4){
    s+=txt(cx1,cy-32,d>1.7?"+":"δ+",{anchor:"middle",size:13,w:700,fill:"var(--exo)"});
    s+=txt(cx2,cy-32,d>1.7?"−":"δ−",{anchor:"middle",size:13,w:700,fill:"var(--endo)"});
    /* posun elektronů */
    var mid=(cx1+cx2)/2;
    s+=line(mid-30,cy-12,mid+30,cy-12,{c:"var(--endo)",w:1.6});
    s+='<path d="M'+(mid+34)+' '+(cy-12)+' l-8 -4 l0 8 z" style="fill:var(--endo)"/>';
    s+=txt(mid,cy-18,"vazebné elektrony",{anchor:"middle",size:9.5,fill:"var(--ink-3)"});
  } else {
    s+=txt((cx1+cx2)/2,cy-18,"elektrony uprostřed",{anchor:"middle",size:9.5,fill:"var(--ink-3)"});
  }
  s+=txt(cx1,cy+44,"χ = "+fmt(pos.en,2),{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true});
  s+=txt(cx2,cy+44,"χ = "+fmt(neg.en,2),{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true});
  $("#enWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Polarita vazby '+a.s+'–'+b.s+'"');
  $("#enRo1").innerHTML='<span class="k">χ('+a.s+') a χ('+b.s+')</span><span class="v">'+fmt(a.en,2)+' · '+fmt(b.en,2)+'</span><span class="h">Paulingova stupnice, bezrozměrná</span>';
  $("#enRo2").innerHTML='<span class="k">Rozdíl Δχ</span><span class="v" style="color:'+type.c+'">'+fmt(d,2)+'</span><span class="h">|χ(A) − χ(B)|</span>';
  $("#enRo3").innerHTML='<span class="k">Typ vazby</span><span class="v" style="font-size:1rem;color:'+type.c+'">'+type.t+'</span><span class="h">'+type.h+'</span>';
  var note;
  if(a.s===b.s) note="Dva stejné atomy: Δχ = 0, vazba je dokonale <b>nepolární</b> (H₂, Cl₂, O₂). Zkuste dvojici C a H — Δχ = 0,35 je ještě pod hranicí 0,4, proto jsou uhlovodíky nepolární.";
  else if(d>1.7) note="Velký rozdíl: elektronegativnější <b>"+neg.n+"</b> si vazebný pár prakticky přivlastní a vznikne iontová sloučenina "+pos.s+"⁺ "+neg.s+"⁻ (nebo s odpovídajícími náboji). Hranice 1,7 je orientační — např. HF s Δχ = 1,78 je stále kovalentní molekula, jen extrémně polární.";
  else if(d>=0.4) note="Polární kovalentní vazba: <b>"+neg.n+"</b> (δ−) přitahuje vazebný pár silněji než "+pos.n+" (δ+). Molekula může mít dipól — záleží ještě na tvaru. Přesně tady začíná téma Chemická vazba.";
  else note="Malý rozdíl (pod 0,4): elektrony jsou sdílené prakticky rovnoměrně, vazba je <b>nepolární kovalentní</b>. Zkuste Na a Cl, abyste viděli opačný extrém.";
  $("#enNote").innerHTML=note;
}
function initEN(){
  var opts="";
  ELEMENTS.filter(function(e){return e.en!==null && e.Z<=56;}).forEach(function(e){ opts+='<option value="'+e.s+'">'+e.s+' · '+e.n+' (χ '+fmt(e.en,2)+')</option>'; });
  $("#enA").innerHTML=opts; $("#enB").innerHTML=opts;
  $("#enA").value=enState.a; $("#enB").value=enState.b;
  drawEN();
}

/* ============================================================
   23 · RYCHLOPRŮCHOD — tři kompaktní grafy
   ============================================================ */
/* (A) Bohrovy hladiny a Balmerova série */
function drawMiniBohr(){
  var W=720,H=250,L=70,R=330,s='';
  var ys={1:222,2:150,3:104,4:76,5:58,6:46,"inf":30};
  s+=txt(L,18,"HLADINY ATOMU VODÍKU (NE V MĚŘÍTKU) · E_n = −13,6 eV / n²",{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  [1,2,3,4,5,6].forEach(function(n){
    s+=line(L,ys[n],R,ys[n],{c:n===2?"var(--ink)":"var(--line-strong)",w:n===2?2:1.3});
    s+=txt(L-8,ys[n]+4,"n = "+n,{anchor:"end",size:10.5,fill:"var(--ink-2)",mono:true});
    s+=txt(R+6,ys[n]+4,fmt(bohrE(n),2)+" eV",{size:9.5,fill:"var(--ink-3)",mono:true});
  });
  s+=line(L,ys.inf,R,ys.inf,{c:"var(--line)",w:1,dash:"3 3"}); s+=txt(L-8,ys.inf+4,"∞",{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true}); s+=txt(R+6,ys.inf+4,"0 eV",{size:9.5,fill:"var(--ink-3)",mono:true});
  var bal=[[3,656,"Hα"],[4,486,"Hβ"],[5,434,"Hγ"],[6,410,"Hδ"]];
  bal.forEach(function(t,i){
    var x=120+i*44, c=lambdaColor(t[1]).css;
    s+=line(x,ys[t[0]],x,ys[2]+8,{c:c,w:2.2,cap:"round"});
    s+='<path d="M'+x+' '+ys[2]+' l-4 -8 l8 0 z" style="fill:'+c+'"/>';
    s+='<circle cx="'+x+'" cy="'+ys[t[0]]+'" r="3.5" style="fill:'+c+'"/>';
  });
  var xl=100;
  s+=line(xl,ys[2],xl,ys[1]+8,{c:"var(--cat2)",w:2.2,cap:"round"}); s+='<path d="M'+xl+' '+ys[1]+' l-4 -8 l8 0 z" style="fill:var(--cat2)"/>';
  s+=txt(xl-6,(ys[1]+ys[2])/2+4,"Lyman α 122 nm (UV)",{anchor:"end",size:9.5,fill:"var(--cat2)",w:600});
  /* legenda vpravo — spektrum */
  var X0=420, X1=700, yb=120;
  s+=txt(X0,60,"BALMEROVA SÉRIE (PŘESKOKY NA n = 2) — VIDITELNÉ ČÁRY",{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
  s+=rect(X0,yb-14,X1-X0,28,{fill:"var(--surface-3)",r:5});
  var xs=function(lam){ return X0+((lam-380)/(700-380))*(X1-X0); };
  bal.forEach(function(t){ var c=lambdaColor(t[1]).css; s+=line(xs(t[1]),yb-14,xs(t[1]),yb+14,{c:c,w:3}); s+=txt(xs(t[1]),yb+30,t[2]+" "+t[1],{anchor:"middle",size:10,w:600,fill:c,mono:true}); });
  s+=txt(X0,yb+52,"380 nm",{size:9.5,fill:"var(--ink-3)",mono:true}); s+=txt(X1,yb+52,"700 nm",{anchor:"end",size:9.5,fill:"var(--ink-3)",mono:true});
  s+=txt(X0,yb+76,"1/λ = R·(1/2² − 1/n²), R = 1,097·10⁷ m⁻¹",{size:11,w:600,fill:"var(--ink)",mono:true});
  s+=txt(X0,yb+94,"čím vyšší n, tím kratší λ; hranice série 365 nm",{size:10,fill:"var(--ink-3)"});
  $("#miniBohrWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Hladiny vodíku a Balmerova série"');
}

/* (B) Diagonální pravidlo n + l */
function drawMiniDiag(){
  var W=720,H=300,x0=110,y0=44,dx=104,dy=34,s='';
  var pos=function(n,l){ return {x:x0+l*dx, y:y0+(n-1)*dy}; };
  s+=txt(14,18,"DIAGONÁLNÍ SCHÉMA · ČTĚTE PO ŠIPKÁCH ZPRAVA SHORA DOLEVA DOLŮ",{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.07em"});
  var used={"1s":1,"2s":1,"2p":1,"3s":1,"3p":1,"3d":1,"4s":1,"4p":1,"4d":1,"4f":1,"5s":1,"5p":1,"5d":1,"5f":1,"6s":1,"6p":1,"6d":1,"7s":1,"7p":1};
  /* diagonály: pro součet n+l = k body (n=k-l, l) */
  for(var k=1;k<=8;k++){
    var pts=[];
    for(var l=3;l>=0;l--){ var n=k-l; if(n>=1 && n<=7 && l<=n-1 && used[n+LSYM[l]]) pts.push(pos(n,l)); }
    if(pts.length>=2){
      var a=pts[0], b=pts[pts.length-1];
      s+=line(a.x+18,a.y-12,b.x-8,b.y+10,{c:"var(--accent)",w:1.4,dash:"4 3"});
      s+='<path d="M'+(b.x-8)+' '+(b.y+10)+' l3 -9 l5 6 z" style="fill:var(--accent)"/>';
    }
  }
  var idx=0;
  ORDER.forEach(function(o){ idx++; var p=pos(o[0],o[1]); var key=o[0]+LSYM[o[1]];
    s+=rect(p.x-22,p.y-14,44,24,{fill:"var(--surface)",stroke:LCOL[o[1]],sw:1.5,r:5});
    s+=txt(p.x,p.y+3,key,{anchor:"middle",size:12.5,w:700,fill:LCOL[o[1]],mono:true});
    s+=txt(p.x+26,p.y-8,idx,{size:8.5,fill:"var(--ink-3)",mono:true});
  });
  for(var n2=1;n2<=7;n2++) s+=txt(x0-50,y0+(n2-1)*dy+3,"n = "+n2,{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true});
  s+=txt(x0+3*dx+60,y0-2,"n + l",{size:10,fill:"var(--ink-3)"});
  s+=txt(x0+3*dx+60,y0+20,"stejný součet → nižší n první",{size:9.5,fill:"var(--ink-3)"});
  s+=txt(x0+3*dx+60,y0+38,"4s (4+0=4) před 3d (3+2=5)",{size:9.5,fill:"var(--ink-3)"});
  s+=txt(14,H-10,"výsledné pořadí: 1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s 4f 5d 6p 7s 5f 6d 7p  ·  malé číslo = pořadí obsazování",{size:10.5,w:600,fill:"var(--ink)",mono:true});
  $("#miniDiagWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Diagonální pravidlo pořadí obsazování orbitalů"');
}

/* (C) Trend I₁ a χ přes 3. periodu */
function drawMiniTrend(){
  var W=720,H=280,L=64,R=600,T=36,B=220,s='';
  var Zs=[11,12,13,14,15,16,17,18], n=Zs.length, bw=(R-L)/n;
  var yI=function(v){ return B-(v/1600)*(B-T); }, yE=function(v){ return B-(v/3.5)*(B-T); };
  for(var g=0;g<=1600;g+=400){ s+=line(L,yI(g),R,yI(g),{c:"var(--line)",w:1}); s+=txt(L-8,yI(g)+4,g,{anchor:"end",size:10,fill:"var(--ink-3)",mono:true}); }
  s+=txt(16,(T+B)/2,"I₁ [kJ·mol⁻¹]",{anchor:"middle",size:10.5,w:600,fill:"var(--cat1)",style:"transform:rotate(-90deg);transform-origin:16px "+((T+B)/2)+"px"});
  [1,2,3].forEach(function(v){ s+=txt(R+8,yE(v)+4,fmt(v,1),{size:10,fill:"var(--accent)",mono:true}); });
  s+=txt(R+44,(T+B)/2,"χ (Pauling)",{anchor:"middle",size:10.5,w:600,fill:"var(--accent)",style:"transform:rotate(90deg);transform-origin:"+(R+44)+"px "+((T+B)/2)+"px"});
  var pts=[];
  Zs.forEach(function(Z,i){
    var e=EL(Z), x=L+i*bw+8, w=bw-16;
    s+=rect(x,yI(e.i1),w,B-yI(e.i1),{fill:"var(--cat1)",r:3,style:"fill-opacity:.5"});
    s+=txt(x+w/2,yI(e.i1)-5,fmt(e.i1,0),{anchor:"middle",size:9.5,fill:"var(--ink-3)",mono:true});
    s+=txt(x+w/2,B+16,e.s,{anchor:"middle",size:12,w:700,fill:"var(--ink)"});
    s+=txt(x+w/2,B+30,e.cat==="vzácný plyn"?"vz. plyn":e.cat,{anchor:"middle",size:8.5,fill:"var(--ink-3)"});
    if(e.en!==null) pts.push({x:x+w/2,y:yE(e.en),v:e.en});
  });
  s+='<polyline points="'+pts.map(function(p){return p.x.toFixed(1)+","+p.y.toFixed(1);}).join(" ")+'" style="fill:none;stroke:var(--accent);stroke-width:2.4;stroke-linejoin:round"/>';
  pts.forEach(function(p){ s+='<circle cx="'+p.x+'" cy="'+p.y+'" r="4.5" style="fill:var(--accent);stroke:var(--surface);stroke-width:2"/>'; s+=txt(p.x+9,p.y-6,fmt(p.v,2),{size:9.5,w:600,fill:"var(--accent)",mono:true}); });
  s+=txt(L,T-16,"3. PERIODA: IONIZAČNÍ ENERGIE (SLOUPCE) A ELEKTRONEGATIVITA (ČÁRA) ROSTOU DOPRAVA · ZUB Mg > Al, P > S",{size:10,w:700,fill:"var(--ink-3)",style:"letter-spacing:.05em"});
  s+=txt(L,H-8,"kov → kov → kov → polokov → nekov → nekov → nekov → vzácný plyn: s rostoucím Z_ef klesá poloměr a roste tah jádra na elektrony",{size:10,fill:"var(--ink-3)"});
  $("#miniTrendWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Trend ionizační energie a elektronegativity ve 3. periodě"');
}
