/* ============================================================
   T6 · TŘI SKUPENSTVÍ — částicový model s posuvníkem teploty (k0)
   ============================================================ */
var skupState={T:25};
function skupRnd(seed){ var s=seed; return function(){ s=(s*9301+49297)%233280; return s/233280; }; }
function drawSkup(){
  var T=skupState.T, st = T<0?"s":(T<100?"l":"g");
  var W=720,H=320, s='';
  var bx=40,by=30,bw=300,bh=250;
  /* nádoba */
  s+=rect(bx,by,bw,bh,{fill:"var(--surface-2)",r:8,stroke:"var(--line-strong)",sw:2});
  var rnd=skupRnd(7+Math.round(T)), r=7;
  var jitter = st==="s" ? 1.2+ (T+50)/50*2.2 : 0;
  if(st==="s"){
    /* pravidelná mřížka, částice kmitají kolem uzlů */
    var cols=9, rows=8, dx=2.15*r, dy=2.15*r, ox=bx+bw/2-(cols-1)*dx/2, oy=by+bh-8-(rows-1)*dy-r;
    for(var i=0;i<rows;i++) for(var j=0;j<cols;j++){
      var x=ox+j*dx+(rnd()-.5)*jitter, y=oy+i*dy+(rnd()-.5)*jitter;
      s+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+r+'" style="fill:var(--cat2);stroke:var(--surface);stroke-width:1"/>';
    }
    s+=txt(bx+bw/2,by+22,"PEVNÁ LÁTKA · "+fmt(T,0)+" °C",{anchor:"middle",size:11,w:600,fill:"var(--cat2)",style:"letter-spacing:.09em"});
    s+=txt(bx+bw/2,by+40,"částice kmitají kolem pevných poloh, amplituda roste s T",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  } else if(st==="l"){
    /* kapalina: těsně, ale nepravidelně, vyplní spodek */
    var n=72, placed=[], tries=0, lvlTop=by+bh*0.42;
    while(placed.length<n && tries<4000){
      tries++;
      var x=bx+r+2+rnd()*(bw-2*r-4), y=lvlTop+r+rnd()*(bh-(lvlTop-by)-2*r-2);
      var ok=true;
      for(var k=0;k<placed.length;k++){ var ddx=placed[k][0]-x, ddy=placed[k][1]-y; if(ddx*ddx+ddy*ddy<(2*r+1.5)*(2*r+1.5)){ ok=false; break; } }
      if(ok) placed.push([x,y]);
    }
    placed.forEach(function(p){ s+='<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="'+r+'" style="fill:var(--cat1);stroke:var(--surface);stroke-width:1"/>'; });
    /* hladina */
    s+=line(bx+4,lvlTop,bx+bw-4,lvlTop,{c:"var(--cat1)",w:1.5,dash:"5 4"});
    /* šipky pohybu u pár částic */
    for(var a=0;a<6;a++){ var p=placed[a*9]; if(!p) break; var ang=rnd()*6.28, L=10+rnd()*8; s+=line(p[0],p[1],p[0]+Math.cos(ang)*L,p[1]+Math.sin(ang)*L,{c:"var(--ink)",w:1.6,cap:"round"}); }
    s+=txt(bx+bw/2,by+22,"KAPALINA · "+fmt(T,0)+" °C",{anchor:"middle",size:11,w:600,fill:"var(--cat1)",style:"letter-spacing:.09em"});
    s+=txt(bx+bw/2,by+40,"částice se dotýkají, ale kloužou po sobě — vlastní objem, tvar podle nádoby",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  } else {
    /* plyn: řídce, celá nádoba, dlouhé šipky */
    var ng=26;
    for(var g=0;g<ng;g++){
      var x=bx+12+rnd()*(bw-24), y=by+50+rnd()*(bh-62);
      var ang=rnd()*6.28, L=14+rnd()*16+(T-100)/10;
      s+=line(x,y,x+Math.cos(ang)*L,y+Math.sin(ang)*L,{c:"var(--ink-3)",w:1.4,cap:"round"});
      s+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+r+'" style="fill:var(--cat3);stroke:var(--surface);stroke-width:1"/>';
    }
    s+=txt(bx+bw/2,by+22,"PLYN · "+fmt(T,0)+" °C",{anchor:"middle",size:11,w:600,fill:"var(--cat3)",style:"letter-spacing:.09em"});
    s+=txt(bx+bw/2,by+40,"volné částice, chaotický pohyb, srážky se stěnou = tlak",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  }
  /* teploměr */
  var tx=372, ty0=by+10, ty1=by+bh-10;
  s+=rect(tx-6,ty0,12,ty1-ty0,{fill:"var(--surface-3)",r:6,stroke:"var(--line)",sw:1});
  var frac=(T+50)/200, yT=ty1-(ty1-ty0)*frac;
  s+=rect(tx-6,yT,12,ty1-yT,{fill:T<0?"var(--cat2)":(T<100?"var(--cat1)":"var(--cat3)"),r:6});
  [-50,0,50,100,150].forEach(function(t){ var yy=ty1-(ty1-ty0)*(t+50)/200; s+=line(tx+8,yy,tx+14,yy,{c:"var(--ink-3)",w:1}); s+=txt(tx+18,yy+4,t+" °C",{size:10,fill:"var(--ink-3)",mono:true}); });
  /* pravý sloupec: škála vlastností */
  var px=470;
  s+=txt(px,44,"CO SE MĚNÍ S TEPLOTOU",{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  var props=[
    ["kinetická energie částic", Math.min(1,(T+50)/200)],
    ["vzdálenost částic", st==="g"?0.95:(st==="l"?0.22:0.15)],
    ["uspořádání (řád)", st==="s"?0.95:(st==="l"?0.3:0.03)],
    ["stlačitelnost", st==="g"?0.9:0.04],
    ["difuze (rychlost mísení)", st==="g"?0.9:(st==="l"?0.25:0.02)]
  ];
  props.forEach(function(p,i){
    var y=64+i*44;
    s+=txt(px,y,p[0],{size:11,w:600,fill:"var(--ink-2)"});
    s+=rect(px,y+8,220,10,{fill:"var(--surface-3)",r:5});
    s+=rect(px,y+8,220*p[1],10,{fill:"var(--accent)",r:5});
  });
  s+=txt(px,H-14,"model: voda (t.t. 0 °C, t.v. 100 °C při 101 kPa)",{size:10,fill:"var(--ink-3)"});
  $("#skupWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Částicový model skupenství při '+fmt(T,0)+' °C"');
  $("#skupTV").textContent=fmt(T,0)+" °C";
  function ro(id,k,val,h){ var e=$(id); e.innerHTML='<span class="k">'+k+'</span><span class="v" style="font-size:1rem">'+val+'</span><span class="h">'+h+'</span>'; }
  if(st==="s"){
    ro("#skupRo1","Uspořádání","dalekodosahové","pravidelná mřížka, částice v uzlech");
    ro("#skupRo2","Pohyb","kmitání","kolem rovnovážných poloh, amplituda roste s T");
    ro("#skupRo3","Tvar a objem","vlastní tvar i objem","drží ho síly mezi částicemi");
    ro("#skupRo4","Stlačitelnost","prakticky nulová","částice se už dotýkají");
    $("#skupNote").innerHTML="Pod teplotou tání částice jen <b>kmitají</b> kolem uzlů mřížky. Zahřívání zvětšuje amplitudu kmitů (a tím i objem — tepelná roztažnost), ale pořádek zůstává. Přejděte přes 0 °C a sledujte, jak se pořádek rozpadne.";
  } else if(st==="l"){
    ro("#skupRo1","Uspořádání","krátkodosahové","sousedé ano, vzdálený pořádek ne");
    ro("#skupRo2","Pohyb","kmitání + přeskoky","částice mění sousedy — tekutost, difuze");
    ro("#skupRo3","Tvar a objem","vlastní objem, tvar nádoby","volný povrch (povrchové napětí)");
    ro("#skupRo4","Stlačitelnost","velmi malá","částice se stále dotýkají");
    $("#skupNote").innerHTML="V kapalině jsou částice pořád těsně u sebe (objem se změnil jen o pár procent), ale mohou se kolem sebe <b>protáhnout</b> — proto teče a zaujme tvar nádoby. Odpor proti tomu klouzání je <b>viskozita</b>; s teplotou klesá. Přejděte přes 100 °C.";
  } else {
    ro("#skupRo1","Uspořádání","žádné","chaos, částice daleko od sebe");
    ro("#skupRo2","Pohyb","přímočarý mezi srážkami","rychlost stovek m/s, srážky se stěnou = tlak");
    ro("#skupRo3","Tvar a objem","ani tvar, ani objem","vyplní celou nádobu");
    ro("#skupRo4","Stlačitelnost","velká","mezi částicemi je prázdno (≈ 1000× větší objem)");
    $("#skupNote").innerHTML="V plynu jsou částice tak daleko, že se mezi srážkami vzájemně skoro necítí — to je <b>ideální plyn</b> (pV = nRT). Tlak není nic jiného než součet nárazů částic na stěnu; s teplotou roste, protože částice létají rychleji a naráží častěji.";
  }
}

/* ============================================================
   T7 · KŘIVKA OHŘEVU VODY — posuvníkem dodané teplo (k1)
   ============================================================ */
var HEAT={cI:2.1,cW:4.18,cS:2.0,lf:333.6,lv:2259.2,T0:-40,T1:140}; /* J·g⁻¹·K⁻¹, J·g⁻¹ (6,01 a 40,7 kJ·mol⁻¹ / 18,015) */
var heatState={m:100,Q:60}; /* Q v kJ */
function heatStages(m){
  return [
    {n:"ohřev ledu −40 → 0 °C",       q:m*HEAT.cI*(0-HEAT.T0), col:"var(--cat2)", kind:"led"},
    {n:"tání při 0 °C",               q:m*HEAT.lf,             col:"var(--cat2)", kind:"tání"},
    {n:"ohřev vody 0 → 100 °C",       q:m*HEAT.cW*100,         col:"var(--cat1)", kind:"voda"},
    {n:"var při 100 °C",              q:m*HEAT.lv,             col:"var(--cat1)", kind:"var"},
    {n:"ohřev páry 100 → 140 °C",     q:m*HEAT.cS*(HEAT.T1-100),col:"var(--cat3)",kind:"pára"}
  ];
}
function heatTotal(m){ return heatStages(m).reduce(function(a,s){return a+s.q;},0); }
/* stav po dodání Q joulů: {T, stage index, frac (podíl přeměny na plató), text} */
function heatState_(m,QJ){
  var st=heatStages(m), Q=QJ, i=0;
  for(i=0;i<st.length;i++){
    if(Q<st[i].q) break;
    Q-=st[i].q;
  }
  if(i>=st.length){ return {T:HEAT.T1,i:4,frac:1,over:true}; }
  var f=Q/st[i].q, T;
  if(i===0) T=HEAT.T0+f*(0-HEAT.T0);
  else if(i===1) T=0;
  else if(i===2) T=f*100;
  else if(i===3) T=100;
  else T=100+f*(HEAT.T1-100);
  return {T:T,i:i,frac:f,over:false};
}
function drawHeat(){
  var m=heatState.m, tot=heatTotal(m), QJ=Math.min(heatState.Q*1000,tot), st=heatStages(m), res=heatState_(m,QJ);
  var W=760,H=330,L=64,R=720,T0=28,B=270;
  var x=function(q){ return L+(q/tot)*(R-L); };
  var y=function(T){ return B-((T-HEAT.T0)/(HEAT.T1-HEAT.T0))*(B-T0); };
  var s='';
  /* mřížka */
  for(var t=-40;t<=140;t+=20){ s+=line(L,y(t),R,y(t),{c:"var(--line)",w:1}); s+=txt(L-8,y(t)+4,t,{anchor:"end",size:11,fill:"var(--ink-3)",mono:true}); }
  var ticks=Math.round(tot/1000/ (tot>500000?200:(tot>100000?50:10)))*(tot>500000?200:(tot>100000?50:10));
  var step= tot>500000?200:(tot>100000?50:10);
  for(var q=0;q<=tot/1000;q+=step){ s+=line(x(q*1000),T0,x(q*1000),B,{c:"var(--line)",w:1}); s+=txt(x(q*1000),B+16,q,{anchor:"middle",size:11,fill:"var(--ink-3)",mono:true}); }
  s+=line(L,y(0),R,y(0),{c:"var(--line-strong)",w:1,dash:"4 4"});
  s+=line(L,y(100),R,y(100),{c:"var(--line-strong)",w:1,dash:"4 4"});
  /* úseky */
  var acc=0, pts=[];
  st.forEach(function(sg,i){
    var q0=acc, q1=acc+sg.q; acc=q1;
    var Ta = i===0?HEAT.T0:(i===1?0:(i===2?0:(i===3?100:100)));
    var Tb = i===0?0:(i===1?0:(i===2?100:(i===3?100:HEAT.T1)));
    s+='<line x1="'+x(q0).toFixed(1)+'" y1="'+y(Ta).toFixed(1)+'" x2="'+x(q1).toFixed(1)+'" y2="'+y(Tb).toFixed(1)+'" style="stroke:'+sg.col+';stroke-width:3;stroke-linecap:round"/>';
    /* popisek úseku */
    var mx=(x(q0)+x(q1))/2, my=(y(Ta)+y(Tb))/2;
    var lbl = i===1?"tání · "+fmt(sg.q/1000,1)+" kJ":(i===3?"var · "+fmt(sg.q/1000,1)+" kJ":(i===0?"led":(i===2?"voda":"pára")));
    s+=txt(mx, i===1||i===3 ? my-10 : my-12, lbl,{anchor:"middle",size:10.5,w:600,fill:sg.col});
  });
  /* aktuální bod */
  s+=line(x(QJ),T0,x(QJ),B,{c:"var(--ink)",w:1.2,dash:"3 3"});
  s+='<circle cx="'+x(QJ).toFixed(1)+'" cy="'+y(res.T).toFixed(1)+'" r="7" style="fill:var(--accent);stroke:var(--surface);stroke-width:2.5"/>';
  s+=rect(x(QJ)-38,T0-24,76,18,{fill:"var(--ink)",r:4});
  s+=txt(x(QJ),T0-11,fmt(QJ/1000,0)+" kJ",{anchor:"middle",size:11,w:600,fill:"var(--paper)",mono:true});
  /* osy */
  s+=txt((L+R)/2,B+38,"dodané teplo Q [kJ] · hmotnost "+m+" g",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em;text-transform:uppercase"});
  s+=txt(18,(T0+B)/2,"teplota [°C]",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:18px "+((T0+B)/2)+"px;letter-spacing:.08em"});
  $("#heatWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Křivka ohřevu vody"');

  $("#heatQV").textContent=fmt(QJ/1000,0)+" kJ";
  var sg=st[res.i];
  function ro(id,k,val,h,cls){ var e=$(id); e.className="readout "+(cls||""); e.innerHTML='<span class="k">'+k+'</span><span class="v">'+val+'</span><span class="h">'+h+'</span>'; }
  var stateName = res.i===0?"led":(res.i===1?"led + voda":(res.i===2?"voda":(res.i===3?"voda + pára":"pára")));
  ro("#heatRo1","Skupenství",stateName,sg.n);
  ro("#heatRo2","Teplota",fmt(res.T,1)+" °C",(res.i===1||res.i===3)?"na plató se teplota nemění":"roste podle Q = m·c·ΔT");
  ro("#heatRo3","Úsek křivky",(res.i+1)+" / 5",(res.i===1||res.i===3)?"skupenské teplo: Q = m·l":"měrná tepelná kapacita c = "+fmt(res.i===0?HEAT.cI:(res.i===2?HEAT.cW:HEAT.cS),2)+" J·g⁻¹·K⁻¹");
  ro("#heatRo4",(res.i===1?"Podíl roztátého ledu":(res.i===3?"Podíl odpařené vody":"Podíl úseku")),fmt(res.frac*100,0)+" %",(res.i===1||res.i===3)?"energie jde na trhání sil mezi částicemi, ne na rychlost":"energie zvyšuje kinetickou energii částic");
  var stepsHtml='', acc2=0;
  st.forEach(function(sg2,i){
    var on=i===res.i;
    stepsHtml+='<span style="display:inline-flex;align-items:center;gap:.4rem;padding:.25rem .6rem;border-radius:99px;border:1px solid '+(on?sg2.col:"var(--line)")+';background:'+(on?"var(--surface)":"transparent")+';font-size:.82rem;'+(on?"font-weight:600":"color:var(--ink-3)")+'">'+
      '<span style="width:9px;height:9px;border-radius:2px;background:'+sg2.col+';display:inline-block"></span>'+sg2.n+' · <span class="mono">'+fmt(sg2.q/1000,1)+' kJ</span></span>';
  });
  $("#heatSteps").innerHTML=stepsHtml;
  var note;
  if(res.i===1) note="Jste na <b>plató tání</b>. Teplo přichází, ale teploměr stojí na 0 °C — každý joule jde na rozbití vodíkových můstků v mřížce ledu, ne na zrychlení molekul. Na roztátí "+m+" g ledu je potřeba "+fmt(sg.q/1000,1)+" kJ (l<sub>t</sub> = 334 J·g⁻¹ = 6,01 kJ·mol⁻¹).";
  else if(res.i===3) note="Jste na <b>plató varu</b>. Odpařit vodu stojí "+fmt(sg.q/1000,1)+" kJ — skoro sedmkrát víc než ji roztát a víc než pětkrát víc než ohřát z 0 na 100 °C. Při varu se trhají <em>všechny</em> mezimolekulové síly, při tání jen část.";
  else if(res.i===0) note="Led se ohřívá: molekuly kmitají čím dál víc, ale mřížka drží. Měrná tepelná kapacita ledu (2,1 J·g⁻¹·K⁻¹) je zhruba poloviční proti vodě.";
  else if(res.i===2) note="Kapalná voda se ohřívá. Její měrná tepelná kapacita 4,18 J·g⁻¹·K⁻¹ je jedna z nejvyšších vůbec — proto moře vyrovnává klima a proto se voda hodí do chladičů.";
  else note="Přehřátá pára. Když dodáte víc tepla, než je celkových "+fmt(tot/1000,0)+" kJ, jste za koncem grafu — posuvník je omezen na dostupný rozsah.";
  $("#heatNote").innerHTML=note;
  $$("#heatMass button").forEach(function(b){ b.setAttribute("aria-pressed", +b.dataset.v===m); });
}
function initHeat(){
  function setRange(){ var tot=Math.floor(heatTotal(heatState.m)/1000); var sl=$("#heatQ"); sl.max=tot; if(+sl.value>tot){ sl.value=tot; heatState.Q=tot; } }
  $$("#heatMass button").forEach(function(b){
    b.addEventListener("click",function(){ heatState.m=+b.dataset.v; heatState.Q=Math.round(heatTotal(heatState.m)/1000*0.19); $("#heatQ").value=heatState.Q; setRange(); drawHeat(); });
  });
  $("#heatQ").addEventListener("input",function(){ heatState.Q=+this.value; drawHeat(); });
  setRange(); drawHeat();
}

/* ============================================================
   T8 · FÁZOVÝ DIAGRAM VODY (k1)
   ============================================================ */
function pLiq(T){ var A,B,C; if(T<99){A=8.07131;B=1730.63;C=233.426;}else{A=8.14019;B=1810.94;C=244.485;} return Math.pow(10,A-B/(C+T))*133.322; }
function pIce(Tc){ var T=Tc+273.15; return Math.exp(9.550426-5723.265/T+3.53068*Math.log(T)-0.00728332*T); }
function Tmelt(p){ return 0.01-7.4e-8*(p-611.657); }
function Tboil(p){ var A,B,C; var Tg=1730.63/(8.07131-Math.log10(p/133.322))-233.426; if(Tg>99){A=8.14019;B=1810.94;C=244.485; Tg=B/(A-Math.log10(p/133.322))-C;} return Tg; }
function fazPhase(T,p){
  var pt=611.657;
  if(p<pt) return p<pIce(T)?"g":"s";
  if(T<Tmelt(p)) return "s";
  return p>pLiq(T)?"l":"g";
}
var fazState={T:25,lp:5.0};
function drawFaz(){
  var T=fazState.T, p=Math.pow(10,fazState.lp);
  var W=760,H=360,L=70,R=560,T0=26,B=300;
  var Tmin=-50,Tmax=150,Lmin=2,Lmax=7;
  var x=function(t){ return L+(t-Tmin)/(Tmax-Tmin)*(R-L); };
  var y=function(lp){ return B-(lp-Lmin)/(Lmax-Lmin)*(B-T0); };
  var s='';
  for(var t=-50;t<=150;t+=25){ s+=line(x(t),T0,x(t),B,{c:"var(--line)",w:1}); s+=txt(x(t),B+16,t,{anchor:"middle",size:11,fill:"var(--ink-3)",mono:true}); }
  for(var lp=2;lp<=7;lp++){ s+=line(L,y(lp),R,y(lp),{c:"var(--line)",w:1}); s+=txt(L-8,y(lp)+4,"10"+["","","²","³","⁴","⁵","⁶","⁷"][lp],{anchor:"end",size:11,fill:"var(--ink-3)",mono:true}); }
  /* oblasti — polygony podle křivek */
  var subl=[], vap=[], melt=[];
  for(var t2=Tmin;t2<=0.01;t2+=1){ subl.push([x(t2),y(Math.log10(pIce(t2)))]); }
  for(var t3=0.01;t3<=Tmax;t3+=1){ vap.push([x(t3),y(Math.log10(pLiq(t3)))]); }
  for(var lp2=Math.log10(611.657);lp2<=Lmax;lp2+=0.05){ melt.push([x(Tmelt(Math.pow(10,lp2))),y(lp2)]); }
  function poly(pts,col){ return '<polygon points="'+pts.map(function(q){return q[0].toFixed(1)+","+q[1].toFixed(1);}).join(" ")+'" style="fill:'+col+';fill-opacity:.13"/>'; }
  /* led: vlevo od sublimační + tavicí křivky */
  var iceP=[[L,B]].concat(subl).concat(melt).concat([[melt[melt.length-1][0],T0],[L,T0]]);
  s+=poly(iceP,"var(--cat2)");
  /* kapalina: mezi tavicí a výparnou */
  var liqP=melt.slice().reverse().concat(vap).concat([[R,vap[vap.length-1][1]],[R,T0]]);
  s+=poly(liqP,"var(--cat1)");
  /* plyn: pod sublimační a výparnou */
  var gasP=[[L,B]].concat(subl).concat(vap).concat([[R,vap[vap.length-1][1]],[R,B]]);
  s+=poly(gasP,"var(--cat3)");
  function pl(pts,col){ return '<polyline points="'+pts.map(function(q){return q[0].toFixed(1)+","+q[1].toFixed(1);}).join(" ")+'" style="fill:none;stroke:'+col+';stroke-width:2.2;stroke-linejoin:round"/>'; }
  s+=pl(subl,"var(--ink-2)"); s+=pl(vap,"var(--ink-2)"); s+=pl(melt,"var(--ink-2)");
  /* popisky */
  s+=txt(x(-35),y(5.6),"LED (s)",{size:12,w:700,fill:"var(--cat2)"});
  s+=txt(x(40),y(6.2),"KAPALINA (l)",{size:12,w:700,fill:"var(--cat1)"});
  s+=txt(x(70),y(3.2),"PÁRA (g)",{size:12,w:700,fill:"var(--cat3)"});
  s+=txt(x(-30),y(3.35),"sublimační křivka",{size:10,fill:"var(--ink-3)",style:"transform:rotate(-38deg);transform-origin:"+x(-30)+"px "+y(3.35)+"px"});
  s+=txt(x(60),y(4.35),"křivka varu (tlak nasycené páry)",{size:10,fill:"var(--ink-3)",style:"transform:rotate(-30deg);transform-origin:"+x(60)+"px "+y(4.35)+"px"});
  s+=txt(x(2),y(6.6),"křivka tání (záporný sklon!)",{size:10,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:"+x(2)+"px "+y(6.6)+"px"});
  /* trojný bod, 1 atm */
  var tpx=x(0.01), tpy=y(Math.log10(611.657));
  s+='<circle cx="'+tpx.toFixed(1)+'" cy="'+tpy.toFixed(1)+'" r="5" style="fill:var(--accent);stroke:var(--surface);stroke-width:2"/>';
  s+=txt(tpx+8,tpy+14,"trojný bod 0,01 °C · 611 Pa",{size:10.5,w:600,fill:"var(--accent)"});
  s+=line(L,y(Math.log10(101325)),R,y(Math.log10(101325)),{c:"var(--accent)",w:1.2,dash:"6 4"});
  s+=txt(R-4,y(Math.log10(101325))-5,"101,3 kPa (1 atm)",{anchor:"end",size:10,w:600,fill:"var(--accent)"});
  s+='<circle cx="'+x(0).toFixed(1)+'" cy="'+y(Math.log10(101325)).toFixed(1)+'" r="3.5" style="fill:var(--ink)"/>';
  s+='<circle cx="'+x(100).toFixed(1)+'" cy="'+y(Math.log10(101325)).toFixed(1)+'" r="3.5" style="fill:var(--ink)"/>';
  s+=txt(x(0)-6,y(Math.log10(101325))-8,"0 °C",{anchor:"end",size:10,fill:"var(--ink)",mono:true});
  s+=txt(x(100)+6,y(Math.log10(101325))-8,"100 °C",{size:10,fill:"var(--ink)",mono:true});
  /* aktuální bod */
  var ph=fazPhase(T,p), pc=ph==="s"?"var(--cat2)":(ph==="l"?"var(--cat1)":"var(--cat3)");
  s+=line(x(T),T0,x(T),B,{c:"var(--ink)",w:1,dash:"3 3"});
  s+=line(L,y(fazState.lp),R,y(fazState.lp),{c:"var(--ink)",w:1,dash:"3 3"});
  s+='<circle cx="'+x(T).toFixed(1)+'" cy="'+y(fazState.lp).toFixed(1)+'" r="8" style="fill:'+pc+';stroke:var(--surface);stroke-width:3"/>';
  /* osy */
  s+=txt((L+R)/2,B+36,"teplota [°C]",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em;text-transform:uppercase"});
  s+=txt(20,(T0+B)/2,"tlak [Pa] — logaritmicky",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:20px "+((T0+B)/2)+"px;letter-spacing:.08em"});
  /* pravý panel */
  var px=590;
  s+=rect(px,T0,W-px-8,B-T0,{fill:"var(--surface-2)",r:10,stroke:"var(--line)",sw:1});
  s+=txt(px+12,T0+22,"KDE JSTE",{size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  s+=txt(px+12,T0+44,fmt(T,0)+" °C",{size:16,w:700,fill:"var(--ink)",mono:true});
  s+=txt(px+12,T0+64,(p>=1000?fmt(p/1000,p>=10000?0:1)+" kPa":fmt(p,0)+" Pa"),{size:16,w:700,fill:"var(--ink)",mono:true});
  s+=txt(px+12,T0+96,ph==="s"?"LED":(ph==="l"?"KAPALINA":"PÁRA"),{size:14,w:700,fill:pc});
  var lines=[];
  if(ph==="l"){ lines.push("tlak nasycené páry"); lines.push(fmt(pLiq(T)/1000,T<10?2:1)+" kPa"); lines.push("teplota varu při tomto p"); lines.push(fmt(Tboil(p),0)+" °C"); }
  else if(ph==="g"){ lines.push(T>0.01?"kondenzuje nad":"desublimuje nad"); lines.push(T>0.01?fmt(pLiq(T)/1000,T<10?2:1)+" kPa":fmt(pIce(T),0)+" Pa"); lines.push(p>=611.657?"var by nastal při":"var neexistuje —"); lines.push(p>=611.657?fmt(Tboil(p),0)+" °C":"jen sublimace"); }
  else { lines.push("sublimuje pod"); lines.push(fmt(pIce(Math.min(T,0.01)),0)+" Pa"); lines.push("taje při"); lines.push(p>=611.657?fmt(Tmelt(p),2)+" °C":"— (pod trojným bodem)"); }
  lines.forEach(function(l,i){ s+=txt(px+12,T0+124+i*20,l,{size:i%2?12:10,w:i%2?600:400,fill:i%2?"var(--ink)":"var(--ink-3)",mono:!!(i%2)}); });
  $("#fazWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Fázový diagram vody"');
  $("#fazTV").textContent=fmt(T,0)+" °C";
  $("#fazPV").textContent=(p>=1000?fmt(p/1000,p>=10000?0:1)+" kPa":fmt(p,0)+" Pa");
  var note;
  if(ph==="l" && Math.abs(p-101325)<3000) note="Při normálním tlaku je voda kapalná mezi 0 a 100 °C — to jsou průsečíky přímky 1 atm s křivkou tání a s křivkou varu.";
  else if(ph==="g" && p<611.657) note="Pod tlakem trojného bodu (611 Pa) kapalná voda <b>neexistuje</b>. Led se při zahřívání rovnou mění v páru — to je princip <b>lyofilizace</b> (sušení mrazem) i důvod, proč na Marsu (600 Pa) netečou řeky.";
  else if(ph==="g") note="Pára. Snižte teplotu nebo zvyšte tlak a přejdete přes křivku varu — pára zkondenzuje. Na horách (Sněžka ≈ 84 kPa) vře voda už při ≈ 95 °C, v papiňáku (200 kPa) až při ≈ 120 °C.";
  else if(ph==="s") note="Led. Všimněte si, že křivka tání se naklání <b>doleva</b>: vyšší tlak snižuje teplotu tání. To je <b>anomálie vody</b> — led má menší hustotu než voda, takže stlačení mu „pomůže“ roztát. Většina látek má sklon opačný.";
  else note="Kapalina. Tlak nasycené páry roste s teplotou exponenciálně; <b>var</b> nastane, když se vyrovná vnějšímu tlaku. Proto teplota varu závisí na tlaku a proto se v tabulkách udává při 101,3 kPa.";
  $("#fazNote").innerHTML=note;
}
function initFaz(){
  $("#fazT").addEventListener("input",function(){ fazState.T=+this.value; drawFaz(); });
  $("#fazP").addEventListener("input",function(){ fazState.lp=+this.value; drawFaz(); });
  drawFaz();
}
