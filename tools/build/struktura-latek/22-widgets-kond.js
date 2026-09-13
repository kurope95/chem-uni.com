/* zápis čísla v mocninách deseti s českou desetinnou čárkou */
var SUPD="⁰¹²³⁴⁵⁶⁷⁸⁹";
function sciFmt(x){
  if(!x) return "0";
  var e=Math.floor(Math.log10(Math.abs(x))), m=x/Math.pow(10,e);
  if(e>=-2 && e<=3) return fmt(x, e>=2?0:(e>=0?1:2));
  var es=(e<0?"⁻":"")+String(Math.abs(e)).split("").map(function(d){return SUPD[+d];}).join("");
  return fmt(m,1)+"·10"+es;
}

/* ============================================================
   T9 · VODIVOST PODLE STRUKTURY (k2)
   ============================================================ */
var kondState={id:"cu"};
function drawKond(){
  var c=COND_(kondState.id), W=760,H=340, s='';
  /* levý panel: nosiče náboje */
  s+=rect(8,8,330,H-16,{fill:"var(--surface-2)",r:12,stroke:"var(--line)",sw:1});
  s+=txt(24,32,"NOSIČE NÁBOJE",{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  var rnd=skupRnd(31);
  var cx0=40,cy0=60,cw=266,ch=200;
  /* elektrody */
  s+=rect(cx0-14,cy0+20,10,ch-40,{fill:"var(--exo)",r:3}); s+=txt(cx0-9,cy0+12,"−",{anchor:"middle",size:14,w:700,fill:"var(--exo)"});
  s+=rect(cx0+cw+4,cy0+20,10,ch-40,{fill:"var(--endo)",r:3}); s+=txt(cx0+cw+9,cy0+12,"+",{anchor:"middle",size:14,w:700,fill:"var(--endo)"});
  s+=rect(cx0,cy0,cw,ch,{fill:"var(--surface)",r:6,stroke:"var(--line)",sw:1});
  var id=c.id;
  function arrow(x,y,dir,col){ var L=16; s+=line(x,y,x+dir*L,y,{c:col,w:2,cap:"round"}); s+='<path d="M'+(x+dir*(L+5))+' '+y+' l'+(-dir*7)+' -4 l0 8 z" style="fill:'+col+'"/>'; }
  if(id==="cu"||id==="graf"||id==="si"){
    /* kationty v mřížce + elektrony */
    var rows=id==="graf"?3:5, cols=7;
    for(var i=0;i<rows;i++) for(var j=0;j<cols;j++){
      var x=cx0+22+j*36, y=cy0+24+i*(id==="graf"?60:38);
      if(id==="graf"){ s+='<polygon points="'+[0,1,2,3,4,5].map(function(k){var a=k*Math.PI/3; return (x+11*Math.cos(a)).toFixed(1)+","+(y+11*Math.sin(a)).toFixed(1);}).join(" ")+'" style="fill:none;stroke:var(--ink-2);stroke-width:1.4"/>'; }
      else { s+='<circle cx="'+x+'" cy="'+y+'" r="9" style="fill:var(--surface-3);stroke:var(--ink-3);stroke-width:1"/>'; s+=txt(x,y+4,"+",{anchor:"middle",size:11,w:700,fill:"var(--ink-2)"}); }
    }
    var ne = id==="si"?3:(id==="graf"?10:16);
    for(var e=0;e<ne;e++){
      var ex=cx0+20+rnd()*(cw-60), ey=cy0+14+rnd()*(ch-28);
      if(id==="graf"){ ey=cy0+24+Math.floor(rnd()*3)*60+(rnd()<.5?-18:18); }
      s+='<circle cx="'+ex.toFixed(1)+'" cy="'+ey.toFixed(1)+'" r="3.5" style="fill:var(--accent)"/>';
      arrow(ex+5,ey,1,"var(--accent)");
    }
    if(id==="graf"){ s+=txt(cx0+cw/2,cy0+ch-8,"π elektrony se pohybují jen podél vrstev",{anchor:"middle",size:10,fill:"var(--ink-3)"}); }
    if(id==="si"){ s+=txt(cx0+cw/2,cy0+ch-8,"jen málo tepelně uvolněných elektronů (a děr)",{anchor:"middle",size:10,fill:"var(--ink-3)"}); }
  } else if(id==="dia"){
    for(var i2=0;i2<5;i2++) for(var j2=0;j2<7;j2++){
      var x2=cx0+22+j2*36, y2=cy0+24+i2*38;
      if(j2<6) s+=line(x2,y2,x2+36,y2,{c:"var(--ink-3)",w:1.4});
      if(i2<4) s+=line(x2,y2,x2,y2+38,{c:"var(--ink-3)",w:1.4});
      s+='<circle cx="'+x2+'" cy="'+y2+'" r="8" style="fill:var(--surface-3);stroke:var(--ink-3);stroke-width:1"/>';
      s+=txt(x2,y2+3.5,"C",{anchor:"middle",size:9,w:700,fill:"var(--ink-2)"});
    }
    s+=txt(cx0+cw/2,cy0+ch-8,"všechny elektrony vázané v σ vazbách — nic se nehýbe",{anchor:"middle",size:10,fill:"var(--ink-3)"});
  } else if(id==="nacls"){
    for(var i3=0;i3<5;i3++) for(var j3=0;j3<7;j3++){
      var x3=cx0+22+j3*36, y3=cy0+24+i3*38, pos=(i3+j3)%2===0;
      s+='<circle cx="'+x3+'" cy="'+y3+'" r="'+(pos?7:11)+'" style="fill:'+(pos?"var(--endo-soft)":"var(--exo-soft)")+';stroke:'+(pos?"var(--endo)":"var(--exo)")+';stroke-width:1.2"/>';
      s+=txt(x3,y3+4,pos?"+":"−",{anchor:"middle",size:11,w:700,fill:pos?"var(--endo)":"var(--exo)"});
    }
    s+=txt(cx0+cw/2,cy0+ch-8,"ionty jsou, ale drží pevně v mřížce",{anchor:"middle",size:10,fill:"var(--ink-3)"});
  } else if(id==="naclm"||id==="nacla"||id==="hcla"||id==="sea"||id==="acoh"||id==="h2o"){
    var nI = id==="h2o"?2:(id==="acoh"?4:14);
    for(var k=0;k<nI;k++){
      var xi=cx0+24+rnd()*(cw-48), yi=cy0+18+rnd()*(ch-46), pos2=k%2===0;
      var col=pos2?"var(--endo)":"var(--exo)";
      if(id!=="naclm"){ /* hydratační obal */
        for(var w=0;w<5;w++){ var a=w*1.257+rnd()*.4; s+='<circle cx="'+(xi+Math.cos(a)*15).toFixed(1)+'" cy="'+(yi+Math.sin(a)*15).toFixed(1)+'" r="3" style="fill:var(--cat1);fill-opacity:.55"/>'; }
      }
      s+='<circle cx="'+xi.toFixed(1)+'" cy="'+yi.toFixed(1)+'" r="'+(pos2?6:9)+'" style="fill:'+(pos2?"var(--endo-soft)":"var(--exo-soft)")+';stroke:'+col+';stroke-width:1.2"/>';
      s+=txt(xi,yi+4,pos2?"+":"−",{anchor:"middle",size:11,w:700,fill:col});
      arrow(xi+(pos2?-14:14),yi,pos2?-1:1,col);
    }
    if(id==="acoh"||id==="h2o"){
      for(var m=0;m<(id==="h2o"?26:22);m++){ var xm=cx0+20+rnd()*(cw-40), ym=cy0+14+rnd()*(ch-40); s+='<ellipse cx="'+xm.toFixed(1)+'" cy="'+ym.toFixed(1)+'" rx="7" ry="4.5" style="fill:var(--surface-3);stroke:var(--line-strong);stroke-width:1"/>'; }
      s+=txt(cx0+cw/2,cy0+ch-8,id==="h2o"?"jen 10⁻⁷ mol/L iontů z autoionizace":"≈ 1 % molekul ionizováno, zbytek neutrální",{anchor:"middle",size:10,fill:"var(--ink-3)"});
    } else s+=txt(cx0+cw/2,cy0+ch-8,"kationty ke katodě (−), anionty k anodě (+)",{anchor:"middle",size:10,fill:"var(--ink-3)"});
  } else {
    /* neutrální molekuly */
    for(var m2=0;m2<24;m2++){ var xm2=cx0+20+rnd()*(cw-40), ym2=cy0+14+rnd()*(ch-40); s+='<ellipse cx="'+xm2.toFixed(1)+'" cy="'+ym2.toFixed(1)+'" rx="'+(id==="sugar"?11:7)+'" ry="5" style="fill:var(--surface-3);stroke:var(--line-strong);stroke-width:1"/>'; }
    s+=txt(cx0+cw/2,cy0+ch-8,"jen neutrální molekuly — žádný nosič náboje",{anchor:"middle",size:10,fill:"var(--ink-3)"});
  }
  s+=txt(24,H-24,c.n,{size:12,w:600,fill:"var(--ink)"});
  /* pravý panel: log stupnice vodivostí */
  var px=360, bw=W-px-30, ly0=40;
  s+=txt(px,32,"MĚRNÁ VODIVOST σ [S·m⁻¹] — LOGARITMICKÁ STUPNICE",{size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  var lmin=-16,lmax=8, xl=function(lg){ return px+90+(lg-lmin)/(lmax-lmin)*(bw-90); };
  COND.forEach(function(it,i){
    var y=ly0+16+i*21, on=it.id===c.id, lg=Math.log10(it.sig);
    s+=txt(px+84,y+4,it.n.split(" (")[0].replace("roztok ","r. ").replace("tavenina ","tav. "),{anchor:"end",size:9.5,w:on?700:400,fill:on?"var(--ink)":"var(--ink-3)"});
    s+=rect(px+90,y-5,bw-90,10,{fill:"var(--surface-2)",r:5});
    s+=rect(px+90,y-5,xl(lg)-(px+90),10,{fill:on?"var(--accent)":(lg>0?"var(--cat1)":(lg>-8?"var(--cat3)":"var(--ink-3)")),r:5});
    if(on) s+=txt(xl(lg)+6,y+4,"10^"+fmt(lg,lg%1?1:0),{size:10,w:700,fill:"var(--accent)",mono:true});
  });
  [-15,-10,-5,0,5].forEach(function(lg){ s+=line(xl(lg),ly0+8,xl(lg),ly0+16+COND.length*21-6,{c:"var(--line)",w:1,dash:"2 3"}); s+=txt(xl(lg),H-20,"10^"+lg,{anchor:"middle",size:9.5,fill:"var(--ink-3)",mono:true}); });
  $("#kondWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Vodivost a nosiče náboje — '+c.n+'"');
  function ro(id2,k,val,h){ var e=$(id2); e.innerHTML='<span class="k">'+k+'</span><span class="v" style="font-size:1rem">'+val+'</span><span class="h">'+h+'</span>'; }
  ro("#kondRo1","Nosič náboje",c.car,"co se v elektrickém poli pohybuje");
  ro("#kondRo2","Vodivost",sciFmt(c.sig)+" S·m⁻¹","řádová hodnota při 25 °C (tavenina při 850 °C)");
  ro("#kondRo3","Zařazení",c.cls,c.el);
  $("#kondNote").innerHTML=c.why;
}
function initKond(){
  var sel=$("#kondSel");
  sel.innerHTML=COND.map(function(c){ return '<option value="'+c.id+'">'+c.n+'</option>'; }).join("");
  sel.addEventListener("change",function(){ kondState.id=sel.value; drawKond(); });
  drawKond();
}

/* ============================================================
   T10 · HYDRATACE NaCl — rozpad mřížky krok za krokem (k3)
   ============================================================ */
var hydState={step:35,salt:"NaCl"};
function water(x,y,ang,scale){
  /* molekula vody: O (červ.) + 2 H, orientovaná; ang = směr, kam míří kyslík */
  var sc=scale||1, t='';
  var hx1=x+Math.cos(ang+2.2)*9*sc, hy1=y+Math.sin(ang+2.2)*9*sc, hx2=x+Math.cos(ang-2.2)*9*sc, hy2=y+Math.sin(ang-2.2)*9*sc;
  t+='<circle cx="'+hx1.toFixed(1)+'" cy="'+hy1.toFixed(1)+'" r="'+(4*sc)+'" style="fill:var(--surface-3);stroke:var(--line-strong);stroke-width:.8"/>';
  t+='<circle cx="'+hx2.toFixed(1)+'" cy="'+hy2.toFixed(1)+'" r="'+(4*sc)+'" style="fill:var(--surface-3);stroke:var(--line-strong);stroke-width:.8"/>';
  t+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(6.5*sc)+'" style="fill:var(--cat1);stroke:var(--surface);stroke-width:.8"/>';
  return t;
}
function drawHyd(){
  var st=hydState.step, W=760,H=330, s='', rnd=skupRnd(5);
  s+=rect(8,8,W-16,H-16,{fill:"var(--surface-2)",r:12,stroke:"var(--line)",sw:1});
  s+=txt(24,32,"ROZPOUŠTĚNÍ IONTOVÉHO KRYSTALU VE VODĚ",{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  /* krystal vlevo dole */
  var gx=60,gy=120,d=34, n=4;
  var detached=Math.floor(st/25); /* 0..4 hotových iontů */
  var frac=(st%25)/25;
  var order=[[0,3],[1,3],[0,2],[1,2]]; /* které ionty (řádek, sloupec) odcházejí */
  var gone={};
  order.forEach(function(o,i){ if(i<detached) gone[o[0]+"_"+o[1]]=true; });
  var moving = detached<4 && st>0 ? order[detached] : null;
  for(var i=0;i<n;i++) for(var j=0;j<n;j++){
    if(gone[i+"_"+j]) continue;
    var x=gx+j*d, y=gy+i*d, pos=(i+j)%2===0;
    var isMoving = moving && moving[0]===i && moving[1]===j;
    if(isMoving){ x+= (360-x)*frac; y+= (60+detached*44-y)*frac*0.9; }
    if(isMoving){
      /* voda se přisává */
      for(var w=0;w<4;w++){ var a=w*1.57+0.6; var wx=x+Math.cos(a)*(20+ (1-frac)*10), wy=y+Math.sin(a)*(20+(1-frac)*10); s+=water(wx,wy,pos?a+Math.PI:a,0.85); }
    }
    s+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(pos?9:13)+'" style="fill:'+(pos?"var(--endo-soft)":"var(--exo-soft)")+';stroke:'+(pos?"var(--endo)":"var(--exo)")+';stroke-width:1.4"/>';
    s+=txt(x,y+4,pos?"Na⁺":"Cl⁻",{anchor:"middle",size:9,w:700,fill:pos?"var(--endo)":"var(--exo)"});
  }
  s+=txt(gx+1.5*d,gy+n*d+8,"krystal NaCl — každý ion drží 6 sousedů",{anchor:"middle",size:10,fill:"var(--ink-3)"});
  /* voda kolem krystalu (volné molekuly) */
  for(var k=0;k<10;k++){ var vx=gx+n*d+20+rnd()*90, vy=gy-30+rnd()*180; s+=water(vx,vy,rnd()*6.28,0.8); }
  /* hydratované ionty vpravo */
  for(var q=0;q<detached;q++){
    var o=order[q], pos2=(o[0]+o[1])%2===0, hx=420+ (q%2)*150, hy=90+Math.floor(q/2)*120;
    var nw=pos2?6:6;
    for(var w2=0;w2<nw;w2++){ var a2=w2*(6.28/nw)+0.3; s+=water(hx+Math.cos(a2)*26,hy+Math.sin(a2)*26,pos2?a2+Math.PI:a2,0.9); }
    s+='<circle cx="'+hx+'" cy="'+hy+'" r="'+(pos2?9:13)+'" style="fill:'+(pos2?"var(--endo-soft)":"var(--exo-soft)")+';stroke:'+(pos2?"var(--endo)":"var(--exo)")+';stroke-width:1.4"/>';
    s+=txt(hx,hy+4,pos2?"Na⁺":"Cl⁻",{anchor:"middle",size:9,w:700,fill:pos2?"var(--endo)":"var(--exo)"});
    s+=txt(hx,hy+50,pos2?"Na⁺(aq): kyslíky vody dovnitř":"Cl⁻(aq): vodíky vody dovnitř",{anchor:"middle",size:9.5,fill:"var(--ink-3)"});
  }
  s+=txt(W-24,H-22,"hydratované ionty v roztoku",{anchor:"end",size:10,fill:"var(--ink-3)"});
  s+=txt(24,H-22,"krok "+st+" %",{size:10,fill:"var(--ink-3)",mono:true});
  $("#hydWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Hydratace iontů při rozpouštění NaCl"');
  $("#hydStepV").textContent=st+" %";
  var stg = st===0?"Krystal ve vodě. Dipóly vody se natáčejí k povrchovým iontům: záporný kyslík k Na⁺, kladné vodíky k Cl⁻."
    : (detached<1?"Voda „trhá“ první ion z rohu — tam drží nejméně sousedů. Energie na to jde z přitažlivosti dipól–ion, která je zaplacena hned při vzniku hydratačního obalu."
    : (detached<4?"Hydratované ionty odplouvají do roztoku, každý se svým obalem (Na⁺ zhruba 6 molekul vody). Mřížka se rozpadá z rohů a hran."
    : "Čtyři ionty jsou v roztoku, obalené vodou. Proces pokračuje, dokud roztok není nasycený — pak se rychlost rozpouštění vyrovná rychlosti krystalizace."));
  $("#hydStage").innerHTML=stg;
  /* energetická bilance zvolené soli */
  var salt=null; for(var i2=0;i2<HYDSALTS.length;i2++){ if(HYDSALTS[i2].f===hydState.salt) salt=HYDSALTS[i2]; }
  function ro(id,k,val,h,cls){ var e=$(id); e.className="readout "+(cls||""); e.innerHTML='<span class="k">'+k+'</span><span class="v">'+val+'</span><span class="h">'+h+'</span>'; }
  ro("#hydRo1","Rozpad mřížky","≈ +"+fmt(salt.latt,0)+" kJ·mol⁻¹","mřížková energie — musí se dodat","pos");
  ro("#hydRo2","Hydratace iontů","≈ "+fmt(salt.hyd,0)+" kJ·mol⁻¹","hydratační energie — uvolní se","neg");
  ro("#hydRo3","Rozpouštěcí teplo",sgn(salt.sol,1)+" kJ·mol⁻¹",salt.kind,salt.sol>0?"pos":"neg");
  $("#hydNote").innerHTML="<b>"+salt.f+":</b> "+salt.story+" Obě energie jsou obrovské, výsledek je jejich malý rozdíl — proto znaménko rozpouštěcího tepla nejde odhadnout bez tabulek.";
  $$("#hydSalt button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===hydState.salt); });
}
function initHyd(){
  $("#hydStep").addEventListener("input",function(){ hydState.step=+this.value; drawHyd(); });
  $$("#hydSalt button").forEach(function(b){ b.addEventListener("click",function(){ hydState.salt=b.dataset.v; drawHyd(); }); });
  drawHyd();
}

/* ============================================================
   T11 · KŘIVKY ROZPUSTNOSTI (k3)
   ============================================================ */
var solState={T:20};
function drawSol(){
  var T=solState.T, W=760,H=360,L=64,R=600,T0=28,B=300;
  var x=function(t){ return L+t/100*(R-L); }, y=function(g){ return B-g/250*(B-T0); };
  var s='';
  for(var t=0;t<=100;t+=10){ s+=line(x(t),T0,x(t),B,{c:"var(--line)",w:1}); s+=txt(x(t),B+16,t,{anchor:"middle",size:11,fill:"var(--ink-3)",mono:true}); }
  for(var g=0;g<=250;g+=50){ s+=line(L,y(g),R,y(g),{c:"var(--line)",w:1}); s+=txt(L-8,y(g)+4,g,{anchor:"end",size:11,fill:"var(--ink-3)",mono:true}); }
  SOLCURVES.forEach(function(c){
    var pts=[]; for(var t2=0;t2<=100;t2+=2){ pts.push(x(t2).toFixed(1)+","+y(solAt(c.v,t2)).toFixed(1)); }
    s+='<polyline points="'+pts.join(" ")+'" style="fill:none;stroke:'+c.c+';stroke-width:2.5;stroke-linejoin:round"/>';
    s+=txt(R+6,y(c.v[10])+4,c.n,{size:11,w:700,fill:c.c,mono:true});
    var v=solAt(c.v,T);
    s+='<circle cx="'+x(T).toFixed(1)+'" cy="'+y(v).toFixed(1)+'" r="5.5" style="fill:'+c.c+';stroke:var(--surface);stroke-width:2"/>';
  });
  /* kyslík — pravá osa (mg/L ×10) */
  var pts2=[]; for(var t3=0;t3<=100;t3+=2){ pts2.push(x(t3).toFixed(1)+","+y(solAt(O2SOL,t3)*15).toFixed(1)); }
  s+='<polyline points="'+pts2.join(" ")+'" style="fill:none;stroke:var(--ink-3);stroke-width:2;stroke-dasharray:6 4"/>';
  s+=txt(x(4),y(solAt(O2SOL,4)*15)-10,"O₂ (plyn, pravá stupnice)",{size:10.5,w:600,fill:"var(--ink-3)"});
  s+='<circle cx="'+x(T).toFixed(1)+'" cy="'+y(solAt(O2SOL,T)*15).toFixed(1)+'" r="5" style="fill:var(--ink-3);stroke:var(--surface);stroke-width:2"/>';
  for(var mg=0;mg<=15;mg+=5){ s+=txt(R+6,y(mg*15)+4,mg+" mg/L",{size:9.5,fill:"var(--ink-3)",mono:true,style:"opacity:.75"}); }
  s+=line(x(T),T0,x(T),B,{c:"var(--ink)",w:1.2,dash:"3 3"});
  s+=rect(x(T)-26,T0-22,52,17,{fill:"var(--ink)",r:4}); s+=txt(x(T),T0-9,fmt(T,0)+" °C",{anchor:"middle",size:11,w:600,fill:"var(--paper)",mono:true});
  s+=txt((L+R)/2,B+38,"teplota [°C]",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em;text-transform:uppercase"});
  s+=txt(18,(T0+B)/2,"rozpustnost [g na 100 g vody]",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:18px "+((T0+B)/2)+"px;letter-spacing:.08em"});
  $("#solWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Křivky rozpustnosti"');
  $("#solTV").textContent=fmt(T,0)+" °C";
  $("#solBody").innerHTML=SOLCURVES.map(function(c){
    var v=solAt(c.v,T), v20=solAt(c.v,20);
    return '<tr><td><span style="display:inline-block;width:11px;height:11px;border-radius:3px;background:'+c.c+';margin-right:.4rem;vertical-align:middle"></span><b class="mono">'+c.n+'</b></td><td class="n">'+fmt(v,1)+'</td><td class="n">'+fmt(v/(100+v)*100,1)+' %</td><td>'+(c.n==="NaCl"?"skoro nezávisí na T (ΔH<sub>sol</sub> ≈ 0)":"roste s T (rozpouštění endotermické)")+'</td></tr>';
  }).join("")+'<tr><td><b class="mono">O₂ (ze vzduchu)</b></td><td class="n">'+fmt(solAt(O2SOL,T),1)+' mg/L</td><td class="n">—</td><td>klesá s T (rozpouštění plynu exotermické) — ryby v létě lapají po dechu</td></tr>';
  $("#solNote").innerHTML = T>=60 ? "Při "+fmt(T,0)+" °C se v 100 g vody rozpustí "+fmt(solAt(SOLCURVES[0].v,T),0)+" g KNO₃, ale při 20 °C jen 31,6 g. Ochlaďte nasycený roztok a rozdíl <b>vykrystalizuje</b> — to je princip čištění látek rekrystalizací."
    : (T<=10 ? "Za studena je rozdíl mezi látkami nejmenší. Všimněte si kyslíku: studená voda ho nese nejvíc, proto pstruzi žijí v horských potocích."
    : "Táhněte posuvníkem doprava: KNO₃ vystřelí nahoru, NaCl zůstane skoro vodorovný a kyslík klesá k nule. Sklon křivky = znaménko rozpouštěcího tepla (Le Chatelier).");
}
function initSol(){
  $("#solT").addEventListener("input",function(){ solState.T=+this.value; drawSol(); });
  drawSol();
}
