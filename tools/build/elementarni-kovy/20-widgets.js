/* ============================================================
   4 · SPOLEČNÉ POMOCNÉ FUNKCE PRO SVG
   ============================================================ */
function circ(cx,cy,r,o){
  o=o||{};
  return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" style="fill:'+(o.fill||"var(--surface-2)")+';'+
    (o.stroke?"stroke:"+o.stroke+";stroke-width:"+(o.sw||1)+";":"")+(o.style||"")+'"/>';
}
function hArrow(x1,x2,y,color,label,dashed){
  var s=line(x1,y,x2,y,{c:color,w:2,dash:dashed?"5 4":"",cap:"round"});
  var d=(x2>x1?1:-1);
  s+='<path d="M'+x2+' '+y+' l'+(-7*d)+' -4.5 l0 9 z" style="fill:'+color+'"/>';
  if(label) s+=txt((x1+x2)/2,y-8,label,{anchor:"middle",size:11.5,w:600,fill:color});
  return s;
}
function panelTitle(s){ return txt(14,18,s.toUpperCase(),{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"}); }
function ro(id,k,v,h,cls){
  var e=$(id); if(!e) return;
  e.className="readout "+(cls||"");
  e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>';
}
function segSet(sel,val,attr){
  $$(sel+" button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset[attr]===val ? "true":"false"); });
}

/* ============================================================
   5 · HERO — PŘEPÍNAČ KRYSTALOVÝCH MŘÍŽEK
   ============================================================ */
var mzId = "kpc";

/* krychle v kosoúhlém promítání */
function cubeCell(kind){
  var s='', x0=52, y0=118, a=150, dx=62, dy=-58;   /* přední čtverec + posun dozadu */
  var F=[[x0,y0+a],[x0+a,y0+a],[x0+a,y0],[x0,y0]];              /* přední: LD, PD, PH, LH */
  var B=F.map(function(p){ return [p[0]+dx,p[1]+dy]; });
  function edge(p,q,back){ return line(p[0],p[1],q[0],q[1],{c:back?"var(--line)":"var(--line-strong)",w:back?1:1.6,dash:back?"4 3":""}); }
  /* zadní hrany nejdřív */
  s+=edge(B[0],B[1],true)+edge(B[1],B[2],true)+edge(B[2],B[3],true)+edge(B[3],B[0],true);
  s+=edge(F[0],B[0],true);
  /* přední a boční */
  s+=edge(F[0],F[1])+edge(F[1],F[2])+edge(F[2],F[3])+edge(F[3],F[0]);
  s+=edge(F[1],B[1])+edge(F[2],B[2])+edge(F[3],B[3]);
  /* směr dotyku koulí */
  if(kind==="kpc"){ s+=line(F[0][0],F[0][1],F[2][0],F[2][1],{c:"var(--accent)",w:2.4,dash:"6 4"}); }
  if(kind==="kpr"){ s+=line(F[0][0],F[0][1],B[2][0],B[2][1],{c:"var(--accent)",w:2.4,dash:"6 4"}); }
  if(kind==="sc"){  s+=line(F[0][0],F[0][1],F[1][0],F[1][1],{c:"var(--accent)",w:2.4,dash:"6 4"}); }
  /* atomy */
  var R=15, atoms=[];
  F.forEach(function(p){ atoms.push([p[0],p[1],"var(--endo)"]); });
  B.forEach(function(p){ atoms.push([p[0],p[1],"var(--endo)"]); });
  function mid(p,q){ return [(p[0]+q[0])/2,(p[1]+q[1])/2]; }
  if(kind==="kpc"){
    var faces=[ mid(F[0],F[2]), mid(B[0],B[2]),
                mid(F[0],B[3]), mid(F[1],B[2]),
                mid(F[3],B[2]), mid(F[0],B[1]) ];
    faces.forEach(function(p){ atoms.push([p[0],p[1],"var(--exo)"]); });
  }
  if(kind==="kpr"){ var c=mid(F[0],B[2]); atoms.push([c[0],c[1],"var(--exo)"]); }
  atoms.sort(function(p,q){ return p[1]-q[1]; });
  atoms.forEach(function(p){
    s+=circ(p[0],p[1],R,{fill:p[2],stroke:"var(--paper)",sw:2,style:"fill-opacity:.9"});
  });
  /* popis hrany */
  s+=hArrow(x0,x0+a,y0+a+30,"var(--ink-3)","hrana a",false);
  return s;
}

/* hexagonální buňka */
function hexCell(){
  var s='', cx=150, cy=95, R=62, sq=0.42, dy=118;
  function hexPts(yc){
    var p=[];
    for(var i=0;i<6;i++){ var t=Math.PI/180*(60*i-30); p.push([cx+R*Math.cos(t), yc+sq*R*Math.sin(t)]); }
    return p;
  }
  var top=hexPts(cy), bot=hexPts(cy+dy);
  function ring(p,back){
    var t='';
    for(var i=0;i<6;i++){ var j=(i+1)%6; t+=line(p[i][0],p[i][1],p[j][0],p[j][1],{c:back?"var(--line)":"var(--line-strong)",w:back?1:1.5,dash:back?"4 3":""}); }
    return t;
  }
  s+=ring(bot,true)+ring(top,false);
  for(var i=0;i<6;i++) s+=line(top[i][0],top[i][1],bot[i][0],bot[i][1],{c:"var(--line)",w:1,dash:"4 3"});
  s+=line(cx,cy,cx,cy+dy,{c:"var(--line)",w:1,dash:"4 3"});
  /* prostřední vrstva — tři atomy v prohlubních */
  var mid=[];
  for(var k=0;k<3;k++){ var t2=Math.PI/180*(120*k+30); mid.push([cx+R*0.577*Math.cos(t2)*1.0, cy+dy/2+sq*R*0.577*Math.sin(t2)]); }
  var all=[];
  bot.forEach(function(p){ all.push([p[0],p[1],"var(--endo)",12]); });
  all.push([cx,cy+dy,"var(--exo)",13]);
  mid.forEach(function(p){ all.push([p[0],p[1],"var(--accent)",14]); });
  top.forEach(function(p){ all.push([p[0],p[1],"var(--endo)",12]); });
  all.push([cx,cy,"var(--exo)",13]);
  all.sort(function(p,q){ return p[1]-q[1]; });
  all.forEach(function(p){ s+=circ(p[0],p[1],p[3],{fill:p[2],stroke:"var(--paper)",sw:2,style:"fill-opacity:.9"}); });
  s+=txt(cx+R+16,cy+dy/2+4,"střední vrstva B",{size:10.5,w:600,fill:"var(--accent)"});
  s+=hArrow(cx-R,cx+R,cy+dy+42,"var(--ink-3)","a = 2r",false);
  return s;
}

/* vrstvení koulí vpravo */
function stackDiagram(kind,ox,oy){
  var s='', r=13, gap=30;
  var seq = (kind==="kpc") ? ["A","B","C","A"] : (kind==="hex" ? ["A","B","A","B"] : null);
  if(!seq){
    /* není nejtěsnější — ukážeme jen srovnání zaplnění */
    s+=txt(ox,oy-4,"NENÍ NEJTĚSNĚJŠÍ USPOŘÁDÁNÍ",{size:11,w:700,fill:"var(--warn)",style:"letter-spacing:.06em"});
    s+=txt(ox,oy+20,kind==="kpr"?"Atom má jen 8 sousedů místo 12.":"Atom má jen 6 sousedů — extrém.",{size:12,fill:"var(--ink-2)"});
    s+=txt(ox,oy+40,"Prázdno je rozdrobené do mnoha",{size:12,fill:"var(--ink-2)"});
    s+=txt(ox,oy+58,"malých dutin, ne do velkých.",{size:12,fill:"var(--ink-2)"});
    return s;
  }
  s+=txt(ox,oy-4,"VRSTVENÍ KOULÍ · "+(kind==="kpc"?"ABCABC":"ABAB"),{size:11,w:700,fill:"var(--accent)",style:"letter-spacing:.06em"});
  var offs={A:0,B:r,C:2*r};
  var cols={A:"var(--endo)",B:"var(--exo)",C:"var(--cat1)"};
  seq.forEach(function(L,i){
    var y=oy+26+i*gap;
    for(var k=0;k<6;k++){
      var x=ox+32+offs[L]+k*(2*r+2);
      s+=circ(x,y,r,{fill:cols[L],stroke:"var(--paper)",sw:1.5,style:"fill-opacity:.85"});
    }
    s+=txt(ox+2,y+4,L,{size:12.5,w:700,fill:cols[L]});
  });
  var yl=oy+26+seq.length*gap+4;
  s+=txt(ox,yl+8,kind==="kpc"?"třetí vrstva C sedne do dosud":"třetí vrstva sedne přesně",{size:11,fill:"var(--ink-3)"});
  s+=txt(ox,yl+24,kind==="kpc"?"nevyužitých prohlubní":"nad první vrstvu A",{size:11,fill:"var(--ink-3)"});
  return s;
}

function fillBar(ox,oy,w,active){
  var s='', bh=20, gap=8;
  s+=txt(ox,oy-6,"STUPEŇ ZAPLNĚNÍ PROSTORU [%]",{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
  [["kpc",74.05,"nejtěsnější"],["kpr",68.02,"prostorově centr."],["sc",52.36,"prostá kubická"]].forEach(function(d,i){
    var y=oy+6+i*(bh+gap), on=(active===d[0])||(active==="hex"&&d[0]==="kpc");
    s+=rect(ox,y,w,bh,{fill:"var(--surface-3)",r:5});
    s+=rect(ox,y,w*d[1]/100,bh,{fill:on?"var(--accent)":"var(--line-strong)",r:5,style:on?"":"fill-opacity:.45"});
    s+=txt(ox+8,y+14,d[2],{size:10.5,w:600,fill:on?"var(--accent-ink)":"var(--ink-2)"});
    s+=txt(ox+w+8,y+14,fmt(d[1],2),{size:11,w:700,mono:true,fill:on?"var(--accent)":"var(--ink-3)"});
  });
  return s;
}

function drawMriz(){
  var m=MR[mzId], W=760, H=348, s='';
  s+=panelTitle(m.nm+" · "+m.zk);
  s+= (mzId==="hex") ? hexCell() : cubeCell(mzId);
  s+=line(330,34,330,H-16,{c:"var(--line)",w:1,dash:"3 4"});
  s+=stackDiagram(mzId,352,50);
  s+=fillBar(352,246,240,mzId);
  $("#mzWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Elementární buňka: '+m.nm+'"');
  ro("#mzRo1","koordinační číslo",String(m.kc),"počet nejbližších sousedů",m.kc===12?"pos":"");
  ro("#mzRo2","atomů v elementární buňce",String(m.nb),"po sečtení podílů","");
  ro("#mzRo3","zaplnění prostoru",fmt(m.fill,2)+" %",m.fill>70?"nejtěsnější uspořádání":"volnější uspořádání",m.fill>70?"pos":"neg");
  $("#mzEq").innerHTML='vztah hrany a&nbsp;poloměru atomu: <b class="mono">'+m.ar+'</b>'+
    (m.vrs!=="—" ? '<br>pořadí vrstev: <b class="mono">'+m.vrs+'</b>' : '');
  $("#mzEx").innerHTML='kovy s&nbsp;touto mřížkou: <b class="chem">'+m.ex+'</b>';
  $("#mzNote").innerHTML="<b>"+m.nm+".</b> "+m.pop;
}
function initMriz(){
  $$("#mzSeg button").forEach(function(b){
    b.addEventListener("click",function(){ mzId=this.dataset.mz; segSet("#mzSeg",mzId,"mz"); drawMriz(); });
  });
  drawMriz();
}

/* ============================================================
   6 · k0 — OD ORBITALŮ K PÁSU
   ============================================================ */
function drawPasN(){
  var N=+$("#paN").value, W=760, H=270, s='';
  $("#paNv").textContent=N;
  var x0=90, xw=W-190, ytop=52, ybot=H-56, mid=(ytop+ybot)/2, amp=(ybot-ytop)/2;
  s+=panelTitle("energetické hladiny řetízku "+N+" atomů sodíku (orbitaly 3s)");
  s+=line(x0-26,ytop-12,x0-26,ybot+12,{c:"var(--line-strong)",w:1.4});
  s+='<path d="M'+(x0-26)+' '+(ytop-12)+' l-4.5 8 l9 0 z" style="fill:var(--line-strong)"/>';
  s+=txt(x0-34,ytop-18,"energie",{anchor:"end",size:11,w:600,fill:"var(--ink-3)"});
  /* hladiny podle jednoduchého těsnovazebného modelu */
  var ys=[];
  for(var k=1;k<=N;k++){ ys.push(mid - amp*Math.cos(k*Math.PI/(N+1))); }
  var sep = ys.length>1 ? Math.abs(ys[1]-ys[0]) : 999;
  ys.forEach(function(y,i){
    var occupied = i < Math.ceil(N/2);
    s+=line(x0,y,x0+xw,y,{c:occupied?"var(--endo)":"var(--exo)",w:N>34?1.2:2.2,cap:"round"});
  });
  s+=rect(x0-6,ytop-6,xw+12,ybot-ytop+12,{fill:"none",stroke:"var(--line)",sw:1,r:8});
  s+=txt(x0+xw+14,ytop+4,"prázdné",{size:11,w:600,fill:"var(--exo)"});
  s+=txt(x0+xw+14,ybot+4,"obsazené",{size:11,w:600,fill:"var(--endo)"});
  var lbl = N<=6 ? "oddělené, dobře rozlišitelné hladiny"
          : (N<=16 ? "hladiny se sbližují — pás se rodí"
          : "kvazispojitý PÁS — jednotlivé hladiny už nelze rozlišit");
  s+=txt(W/2,H-18,lbl,{anchor:"middle",size:12.5,w:700,fill:N<=6?"var(--ink-2)":(N<=16?"var(--warn)":"var(--accent)")});
  $("#paWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Vznik energetického pásu z jednotlivých hladin"');
  ro("#paRo1","počet atomů N",String(N),"každý přispěje jedním orbitalem 3s","");
  ro("#paRo2","počet energetických hladin",String(N),"z N orbitalů vznikne N hladin","");
  ro("#paRo3","rozestup sousedních hladin",N>1?fmt(sep/amp*100,1)+" % šířky pásu":"—",
     N>=30?"prakticky nulový — vzniká pás":"hladiny jsou ještě oddělené", N>=30?"pos":"");
  $("#paNote").innerHTML = N<=6
    ? "Zatím vidíte jednotlivé hladiny, jako u&nbsp;molekuly. Přidávejte atomy a&nbsp;sledujte, jak se rozestupy zmenšují."
    : (N<=16 ? "Hladiny se sbližují. Rozestup klesá zhruba jako 1/N, takže u&nbsp;makroskopického krystalu s&nbsp;10²⁰ atomy je nezměřitelně malý."
    : "Tohle je už <b>pás</b>. V&nbsp;reálném krystalu je hladin řádově 10²⁰ a&nbsp;jejich rozestup je zhruba 10⁻²² eV — nesrovnatelně méně než tepelná energie 0,025&nbsp;eV. Proto se pás chová jako spojitý.");
}

/* ============================================================
   7 · k0 — PÁSOVÁ STRUKTURA: VODIČ, POLOVODIČ, IZOLANT
   ============================================================ */
var bsId="kov";
function drawBands(){
  var p=P_(bsId), W=760, H=300, s='';
  var xL=90, bw=330, top=46, bot=H-44;
  s+=panelTitle("pásová struktura · "+p.nm);
  /* osa energie */
  s+=line(xL-28,top-8,xL-28,bot+8,{c:"var(--line-strong)",w:1.4});
  s+='<path d="M'+(xL-28)+' '+(top-8)+' l-4.5 8 l9 0 z" style="fill:var(--line-strong)"/>';
  s+=txt(xL-36,top-14,"energie",{anchor:"end",size:11,w:600,fill:"var(--ink-3)"});
  var vTop, cBot, vBot=bot-6, cTop=top+6;
  if(bsId==="kov"){ vTop=(top+bot)/2+18; cBot=(top+bot)/2-18; }      /* překryv */
  else if(bsId==="iz"){ vTop=bot-92; cBot=top+38; }
  else { vTop=bot-104; cBot=vTop-64; }
  /* valenční pás */
  s+=rect(xL,vTop,bw,vBot-vTop,{fill:"var(--endo)",r:6,style:"fill-opacity:.55"});
  s+=txt(xL+12,vBot-12,"VALENČNÍ PÁS — obsazený",{size:11.5,w:700,fill:"var(--ink)"});
  /* vodivostní pás */
  s+=rect(xL,cTop,bw,cBot-cTop,{fill:"var(--exo)",r:6,style:"fill-opacity:.28"});
  s+=txt(xL+12,cTop+18,"VODIVOSTNÍ PÁS — volný",{size:11.5,w:700,fill:"var(--ink)"});
  /* zakázaný pás */
  if(bsId==="kov"){
    s+=txt(xL+bw/2,(vTop+cBot)/2+5,"PÁSY SE PŘEKRÝVAJÍ",{anchor:"middle",size:12.5,w:700,fill:"var(--accent)"});
  } else {
    s+=rect(xL,cBot,bw,vTop-cBot,{fill:"var(--surface-3)",r:4,style:"fill-opacity:.6"});
    for(var gx=xL+10;gx<xL+bw;gx+=22) s+=line(gx,cBot+3,gx-10,vTop-3,{c:"var(--line)",w:1});
    var gapY = (bsId==="pn"||bsId==="pp") ? vTop-9 : (vTop+cBot)/2+5;
    s+=txt(xL+bw/2,gapY,"ZAKÁZANÝ PÁS  Eg = "+fmt(p.eg,2)+" eV",{anchor:"middle",size:12,w:700,fill:"var(--ink-2)"});
    s+=vArrow(xL+bw+22,vTop,cBot,"var(--accent)","Eg","right");
  }
  /* příměsové hladiny */
  if(bsId==="pn"){
    s+=line(xL+30,cBot+16,xL+bw-30,cBot+16,{c:"var(--accent)",w:2.4,dash:"9 5"});
    s+=txt(xL+bw/2,cBot+34,"donorová hladina (P, As) — elektron odskočí nahoru",{anchor:"middle",size:11,w:600,fill:"var(--accent)"});
    for(var i=0;i<5;i++) s+=circ(xL+70+i*52,cBot+16,4.5,{fill:"var(--accent)"});
  }
  if(bsId==="pp"){
    s+=line(xL+30,vTop-16,xL+bw-30,vTop-16,{c:"var(--accent)",w:2.4,dash:"9 5"});
    s+=txt(xL+bw/2,vTop-24,"akceptorová hladina (B, Ga) — přijme elektron a nechá díru",{anchor:"middle",size:11,w:600,fill:"var(--accent)"});
    for(var j=0;j<5;j++) s+=circ(xL+70+j*52,vTop-16,4.5,{fill:"none",stroke:"var(--accent)",sw:1.8});
  }
  if(bsId==="pv"){
    s+=circ(xL+bw*0.35,cBot+16,5,{fill:"var(--exo)"});
    s+=circ(xL+bw*0.62,cBot+22,5,{fill:"var(--exo)"});
    s+=circ(xL+bw*0.35,vTop+14,5,{fill:"none",stroke:"var(--endo)",sw:2});
    s+=circ(xL+bw*0.62,vTop+18,5,{fill:"none",stroke:"var(--endo)",sw:2});
    s+=txt(xL+bw+22,cBot+20,"pár elektronů",{size:10.5,fill:"var(--exo)"});
    s+=txt(xL+bw+22,vTop+18,"díry po nich",{size:10.5,fill:"var(--endo)"});
  }
  /* pravý sloupec — teplotní závislost */
  var gx0=560, gy0=76, gw=170, gh=120;
  s+=txt(gx0,gy0-14,"VODIVOST A TEPLOTA",{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
  s+=rect(gx0,gy0,gw,gh,{fill:"var(--surface-2)",r:7});
  s+=line(gx0+14,gy0+gh-16,gx0+gw-10,gy0+gh-16,{c:"var(--line-strong)",w:1.2});
  s+=line(gx0+14,gy0+10,gx0+14,gy0+gh-16,{c:"var(--line-strong)",w:1.2});
  s+=txt(gx0+gw-10,gy0+gh-4,"T",{anchor:"end",size:10,w:700,fill:"var(--ink-3)"});
  s+=txt(gx0+6,gy0+8,"σ",{size:10,w:700,fill:"var(--ink-3)"});
  var pts="", i2;
  if(bsId==="kov"){
    for(i2=0;i2<=20;i2++){ var xx=gx0+14+i2*(gw-26)/20, yy=gy0+22+i2*(gh-46)/20; pts+=(i2?" L":"M")+xx+" "+yy; }
    s+='<path d="'+pts+'" style="fill:none;stroke:var(--endo);stroke-width:2.4"/>';
    s+=txt(gx0+gw/2,gy0+gh+18,"kov: σ s teplotou klesá",{anchor:"middle",size:11,w:600,fill:"var(--endo)"});
  } else if(bsId==="iz"){
    s+=line(gx0+14,gy0+gh-22,gx0+gw-12,gy0+gh-24,{c:"var(--ink-3)",w:2.4});
    s+=txt(gx0+gw/2,gy0+gh+18,"izolant: prakticky nevede",{anchor:"middle",size:11,w:600,fill:"var(--ink-3)"});
  } else {
    for(i2=0;i2<=20;i2++){ var t2=i2/20, xx2=gx0+14+i2*(gw-26)/20, yy2=gy0+gh-18-(gh-40)*Math.pow(t2,2.6); pts+=(i2?" L":"M")+xx2+" "+yy2; }
    s+='<path d="'+pts+'" style="fill:none;stroke:var(--exo);stroke-width:2.4"/>';
    s+=txt(gx0+gw/2,gy0+gh+18,"polovodič: σ prudce roste",{anchor:"middle",size:11,w:600,fill:"var(--exo)"});
  }
  $("#bsWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Pásová struktura: '+p.nm+'"');
  ro("#bsRo1","šířka zakázaného pásu Eg", bsId==="kov" ? "0 eV" : fmt(p.eg,2)+" eV",
     bsId==="kov"?"pásy se překrývají":"tepelná energie při 25 °C ≈ 0,025 eV", bsId==="kov"?"pos":"");
  ro("#bsRo2","měrná vodivost σ",p.sig+" S·m⁻¹","typický řád veličiny","");
  ro("#bsRo3","chování při zahřátí",p.tdep,"nejspolehlivější rozlišovací znak","");
  $("#bsText").innerHTML='<div class="callout def" style="margin:0"><span class="eyebrow">'+p.nm+'</span><p>'+p.d+'</p><p style="margin-top:.4rem"><b>Typicky:</b> <span class="chem">'+p.ex+'</span></p></div>';
  $("#bsNote").innerHTML=p.t;
}
function initBands(){
  $$("#bsSeg button").forEach(function(b){
    b.addEventListener("click",function(){ bsId=this.dataset.bs; segSet("#bsSeg",bsId,"bs"); drawBands(); });
  });
  drawBands();
}
