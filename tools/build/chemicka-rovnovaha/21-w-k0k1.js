/* ============================================================
   T3 · WIDGET — částice v krabici (k0)
   ============================================================ */
var PM_N=80, PM_COLS=10, PM_ROWS=8;
var pmState={p1:12,p2:6,start:"A",S:[],step:0,hA:[],hB:[],fwd:0,back:0,timer:null,pos:[]};
(function(){ /* pevné pozice s malým rozptylem */
  var seed=7; function rnd(){ seed=(seed*9301+49297)%233280; return seed/233280; }
  for(var i=0;i<PM_N;i++){ var cx=i%PM_COLS, cy=Math.floor(i/PM_COLS); pmState.pos.push([cx+0.5+(rnd()-0.5)*0.55, cy+0.5+(rnd()-0.5)*0.55]); }
})();
function pmReset(){
  pmState.S=[]; for(var i=0;i<PM_N;i++) pmState.S.push(pmState.start==="A"?0:1);
  pmState.step=0; pmState.hA=[]; pmState.hB=[]; pmState.fwd=0; pmState.back=0;
  pmRecord();
}
function pmRecord(){
  var nB=pmState.S.reduce(function(a,x){return a+x;},0);
  pmState.hA.push(PM_N-nB); pmState.hB.push(nB);
  if(pmState.hA.length>160){ pmState.hA.shift(); pmState.hB.shift(); }
}
function pmDoStep(){
  var f=0,b=0, p1=pmState.p1/100, p2=pmState.p2/100;
  for(var i=0;i<PM_N;i++){
    if(pmState.S[i]===0){ if(Math.random()<p1){ pmState.S[i]=1; f++; } }
    else { if(Math.random()<p2){ pmState.S[i]=0; b++; } }
  }
  pmState.fwd=f; pmState.back=b; pmState.step++; pmRecord();
}
function drawPM(){
  var W=380,H=250, cw=W/PM_COLS, ch=(H-30)/PM_ROWS;
  var s=rect(2,2,W-4,H-32,{fill:"var(--surface-2)",r:10,stroke:"var(--line)",sw:1});
  pmState.pos.forEach(function(p,i){
    s+='<circle cx="'+(p[0]*cw).toFixed(1)+'" cy="'+(p[1]*ch+2).toFixed(1)+'" r="8.5" style="fill:'+(pmState.S[i]?"var(--cat1)":"var(--cat2)")+';stroke:var(--surface);stroke-width:1.5"/>';
  });
  s+=txt(W/2,H-8,"uzavřená nádoba · "+PM_N+" částic · krok "+pmState.step,{anchor:"middle",size:11,w:600,fill:"var(--ink-3)"});
  $("#pmBox").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Částicový model rovnováhy"');

  var W2=380,H2=250,L=40,R=364,T0=22,B=206;
  var n=pmState.hA.length, x=function(i){ return L+(n<2?0:(i/(159))*(R-L)); };
  var y=function(v){ return B-(v/PM_N)*(B-T0); };
  var s2='';
  for(var g=0;g<=4;g++){ s2+=line(L,y(PM_N*g/4),R,y(PM_N*g/4),{c:"var(--line)",w:1}); s2+=txt(L-6,y(PM_N*g/4)+4,PM_N*g/4,{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true}); }
  s2+=line(L,B,R,B,{c:"var(--line-strong)",w:1.5}); s2+=line(L,T0-4,L,B,{c:"var(--line-strong)",w:1.5});
  var eqA=PM_N*pmState.p2/(pmState.p1+pmState.p2), eqB=PM_N-eqA;
  s2+=line(L,y(eqA),R,y(eqA),{c:"var(--cat2)",w:1,dash:"4 4"});
  s2+=line(L,y(eqB),R,y(eqB),{c:"var(--cat1)",w:1,dash:"4 4"});
  s2+=txt(R,y(eqB)-5,"očekávané B = "+fmt(eqB,0),{anchor:"end",size:10,fill:"var(--cat1)"});
  s2+=txt(R,y(eqA)-5,"očekávané A = "+fmt(eqA,0),{anchor:"end",size:10,fill:"var(--cat2)"});
  if(n>1){
    var dA=pmState.hA.map(function(v,i){return x(i).toFixed(1)+","+y(v).toFixed(1);}).join(" ");
    var dB=pmState.hB.map(function(v,i){return x(i).toFixed(1)+","+y(v).toFixed(1);}).join(" ");
    s2+='<polyline points="'+dA+'" style="fill:none;stroke:var(--cat2);stroke-width:2.2"/>';
    s2+='<polyline points="'+dB+'" style="fill:none;stroke:var(--cat1);stroke-width:2.2"/>';
  }
  s2+=txt((L+R)/2,B+16,"kroky (posledních 160)",{anchor:"middle",size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.06em;text-transform:uppercase"});
  s2+=txt((L+R)/2,H2-6,"počty A a B se ustálí, i když se částice dál mění",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  $("#pmChart").innerHTML=svg("0 0 "+W2+" "+H2,s2,'aria-label="Počty částic A a B v čase"');

  var nB=pmState.S.reduce(function(a,v){return a+v;},0), nA=PM_N-nB;
  $("#pmP1V").textContent=pmState.p1+" %"; $("#pmP2V").textContent=pmState.p2+" %";
  function ro(id,k,v,h){ $(id).innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#pmRoN","Složení",nA+" A · "+nB+" B","krok "+pmState.step);
  ro("#pmRoFlux","Přeměn v&nbsp;posledním kroku",pmState.fwd+" → · "+pmState.back+" ←","A → B · B → A");
  ro("#pmRoK","Poměr B/A",nA?fmt(nB/nA,2):"∞","očekávaný p₁/p₂ = "+fmt(pmState.p1/pmState.p2,2));
}
function initPM(){
  pmReset();
  $("#pmP1").addEventListener("input",function(){ pmState.p1=+this.value; drawPM(); });
  $("#pmP2").addEventListener("input",function(){ pmState.p2=+this.value; drawPM(); });
  $$("#pmStart button").forEach(function(b){
    b.addEventListener("click",function(){
      pmState.start=b.dataset.v;
      $$("#pmStart button").forEach(function(x){x.setAttribute("aria-pressed",x===b);});
      pmStop(); pmReset(); drawPM();
    });
  });
  function pmStop(){ if(pmState.timer){ clearInterval(pmState.timer); pmState.timer=null; $("#pmRun").textContent="Spustit"; } }
  $("#pmRun").addEventListener("click",function(){
    if(pmState.timer){ pmStop(); return; }
    $("#pmRun").textContent="Zastavit";
    pmState.timer=setInterval(function(){ pmDoStep(); drawPM(); if(pmState.step>=600) pmStop(); },200);
  });
  $("#pmStep").addEventListener("click",function(){ pmStop(); pmDoStep(); drawPM(); });
  $("#pmReset").addEventListener("click",function(){ pmStop(); pmReset(); drawPM(); });
  drawPM();
}

/* ============================================================
   T4 · WIDGET — K z ΔG° (k1)
   ============================================================ */
var dgState={G:-20,T:298};
function drawDG(){
  var G=dgState.G, T=dgState.T, RT=RGAS*T, lnK=-G*1000/RT, K=Math.exp(lnK), lg=lnK/Math.LN10;
  var W=760,H=200,L=48,R=712,yb=118;
  var x=function(e){ return L+((e+12)/24)*(R-L); };
  var s='';
  /* pásma */
  s+=rect(x(-12),yb-16,x(-3)-x(-12),32,{fill:"var(--bad)",r:6,style:"fill-opacity:.12"});
  s+=rect(x(-3),yb-16,x(3)-x(-3),32,{fill:"var(--warn)",r:6,style:"fill-opacity:.14"});
  s+=rect(x(3),yb-16,x(12)-x(3),32,{fill:"var(--ok)",r:6,style:"fill-opacity:.14"});
  s+=txt((x(-12)+x(-3))/2,yb-26,"PRAKTICKY NEPROBÍHÁ",{anchor:"middle",size:10,w:600,fill:"var(--bad)",style:"letter-spacing:.08em"});
  s+=txt((x(-3)+x(3))/2,yb-26,"MĚŘITELNÁ ROVNOVÁHA",{anchor:"middle",size:10,w:600,fill:"var(--warn)",style:"letter-spacing:.08em"});
  s+=txt((x(3)+x(12))/2,yb-26,"PRAKTICKY ÚPLNÁ",{anchor:"middle",size:10,w:600,fill:"var(--ok)",style:"letter-spacing:.08em"});
  s+=line(L,yb,R,yb,{c:"var(--line-strong)",w:1.5});
  for(var e=-12;e<=12;e+=3){ s+=line(x(e),yb-5,x(e),yb+5,{c:"var(--line-strong)",w:1.5}); s+=txt(x(e),yb+24,"10"+supN(e),{anchor:"middle",size:11.5,fill:"var(--ink-2)",mono:true}); }
  s+=txt((L+R)/2,yb+48,"rovnovážná konstanta K (logaritmická osa)",{anchor:"middle",size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em;text-transform:uppercase"});
  var lgc=Math.max(-12,Math.min(12,lg)), xm=x(lgc);
  var col=lg<-3?"var(--bad)":(lg>3?"var(--ok)":"var(--warn)");
  s+='<path d="M'+xm+' '+(yb-2)+' l-8 -14 l16 0 z" style="fill:'+col+'"/>';
  s+=rect(xm-46,yb-58,92,22,{fill:col,r:6});
  s+=txt(xm,yb-43,"K = "+sci(K),{anchor:"middle",size:12,w:700,fill:"var(--paper)",mono:true});
  s+=txt(xm,yb+70,(lg<-12?"(mimo osu vlevo)":(lg>12?"(mimo osu vpravo)":"")),{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  s+=txt(L,22,"ΔG° = "+sgn(G,0)+" kJ·mol⁻¹   ·   T = "+T+" K   ·   RT = "+fmt(RT/1000,2)+" kJ·mol⁻¹   ·   −ΔG°/RT = "+fmt(lnK,2),{size:12,w:600,fill:"var(--ink)",mono:true});
  $("#dgWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Poloha K na logaritmické ose"');

  $("#dgGV").textContent=sgn(G,0)+" kJ·mol⁻¹";
  $("#dgTV").textContent=T+" K ("+fmt(T-273.15,0)+" °C)";
  $("#dgTh").textContent=T;
  function ro(id,k,v,h,cls){ var e=$(id); e.className="readout "+(cls||""); e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#dgRoK","Rovnovážná konstanta",sci(K),"K = exp(−ΔG°/RT)",G<0?"pos":(G>0?"neg":""));
  ro("#dgRoLn","ln <span class='q'>K</span>",fmt(lnK,2),"log₁₀ K = "+fmt(lg,2));
  var dir = G<-3 ? ["Vpravo","převažují produkty"] : (G>3 ? ["Vlevo","převažují výchozí látky"] : ["Uprostřed","srovnatelně obou stran"]);
  ro("#dgRoDir","Poloha rovnováhy",dir[0],dir[1]);
  var rows=[[-57,"prakticky nevratná"],[-17.1,"silně vpravo"],[-11.4,"vpravo"],[-5.7,"mírně vpravo"],[0,"K = 1"],[5.7,"mírně vlevo"],[11.4,"vlevo"],[57,"prakticky neprobíhá"]];
  $("#dgTable").innerHTML=rows.map(function(r){
    return '<tr><td class="n">'+sgn(r[0],1)+'</td><td class="n">'+sci(expK(r[0],T298))+'</td><td class="n" style="font-weight:600">'+sci(expK(r[0],T))+'</td><td>'+r[1]+(T!==298?' <span style="color:var(--ink-3)">(při 298 K)</span>':'')+'</td></tr>';
  }).join("");
}

/* ============================================================
   T5 · GRAF — G podél rozsahu reakce (k1)
   ============================================================ */
var gxState={G:-5,xi:0.2};
function gxG(xi,G0){ var RT=RGAS*T298/1000; return xi*G0 + RT*(xi*Math.log(xi)+(1-xi)*Math.log(1-xi)); }
function drawGX(){
  var G0=gxState.G, xi0=gxState.xi, RT=RGAS*T298/1000;
  var K=Math.exp(-G0*1000/(RGAS*T298)), xiEq=K/(1+K);
  var W=760,H=330,L=64,R=700,T0=30,B=270;
  var pts=[], gmin=1e9, gmax=-1e9;
  for(var i=1;i<=199;i++){ var xi=i/200, g=gxG(xi,G0); pts.push([xi,g]); gmin=Math.min(gmin,g); gmax=Math.max(gmax,g); }
  gmax=Math.max(gmax,0,G0); var pad=(gmax-gmin)*0.15+0.5; gmin-=pad; gmax+=pad;
  var x=function(xi){ return L+xi*(R-L); }, y=function(g){ return B-(g-gmin)/(gmax-gmin)*(B-T0); };
  var s='';
  for(var t=0;t<=1.0001;t+=0.25){ s+=line(x(t),T0,x(t),B,{c:"var(--line)",w:1}); s+=txt(x(t),B+18,fmt(t,2),{anchor:"middle",size:11,fill:"var(--ink-3)",mono:true}); }
  s+=line(L,B,R,B,{c:"var(--line-strong)",w:1.5}); s+=line(L,T0-6,L,B,{c:"var(--line-strong)",w:1.5});
  s+=line(L,y(0),R,y(0),{c:"var(--line)",w:1,dash:"3 4"}); s+=txt(L-8,y(0)+4,"0",{anchor:"end",size:11,fill:"var(--ink-3)",mono:true});
  s+=txt(L-8,y(G0)+4,sgn(G0,1),{anchor:"end",size:11,fill:"var(--ink-3)",mono:true});
  s+=line(L,y(G0),R,y(G0),{c:"var(--line)",w:1,dash:"3 4"});
  s+=txt((L+R)/2,B+38,"rozsah reakce ξ  (0 = čistá A, 1 = čistá B)",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.06em;text-transform:uppercase"});
  s+=txt(18,(T0+B)/2,"G směsi [kJ·mol⁻¹]",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:18px "+((T0+B)/2)+"px;letter-spacing:.06em"});
  /* přímka bez míšení */
  s+=line(x(0),y(0),x(1),y(G0),{c:"var(--ink-3)",w:1,dash:"6 5"});
  s+=txt(x(0.5)+6,y(G0/2)-8,"bez entropie míšení",{size:10.5,fill:"var(--ink-3)"});
  /* křivka */
  s+='<polyline points="'+pts.map(function(p){return x(p[0]).toFixed(1)+","+y(p[1]).toFixed(1);}).join(" ")+'" style="fill:none;stroke:var(--ink-2);stroke-width:2.6;stroke-linejoin:round"/>';
  /* minimum */
  var gEq=gxG(xiEq,G0);
  s+=line(x(xiEq),y(gEq),x(xiEq),B,{c:"var(--ok)",w:1.5,dash:"4 4"});
  s+='<circle cx="'+x(xiEq).toFixed(1)+'" cy="'+y(gEq).toFixed(1)+'" r="6" style="fill:var(--ok);stroke:var(--surface);stroke-width:2"/>';
  s+=txt(x(xiEq),y(gEq)+24,"rovnováha ξ = "+fmt(xiEq,3),{anchor:"middle",size:11.5,w:600,fill:"var(--ok)"});
  s+=txt(x(xiEq),y(gEq)+38,"K = "+sci(K),{anchor:"middle",size:11,fill:"var(--ok)",mono:true});
  /* tečna */
  var Q=xi0/(1-xi0), dG=G0+RT*Math.log(Q), g0=gxG(xi0,G0);
  var dx=0.16, xa=Math.max(0.005,xi0-dx), xb=Math.min(0.995,xi0+dx);
  s+=line(x(xa),y(g0+dG*(xa-xi0)),x(xb),y(g0+dG*(xb-xi0)),{c:"var(--accent)",w:2.5,cap:"round"});
  s+='<circle cx="'+x(xi0).toFixed(1)+'" cy="'+y(g0).toFixed(1)+'" r="6" style="fill:var(--accent);stroke:var(--surface);stroke-width:2"/>';
  var side = dG<-0.05 ? "→ reakce jde doprava" : (dG>0.05 ? "← reakce jde doleva" : "rovnováha");
  s+=txt(x(xi0),y(g0)-14,"ΔG = "+sgn(dG,2)+" kJ·mol⁻¹  "+side,{anchor:xi0>0.6?"end":"start",size:11.5,w:600,fill:"var(--accent)"});
  $("#gxWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Gibbsova energie podél reakce"');

  $("#gxGV").textContent=sgn(G0,1)+" kJ·mol⁻¹"; $("#gxXiV").textContent=fmt(xi0,2);
  function ro(id,k,v,h,cls){ var e=$(id); e.className="readout "+(cls||""); e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#gxRoQ","Kvocient <span class='q'>Q</span> = [B]/[A]",fmt(Q,3),Q<K?"Q < K — produktů je málo":(Q>K?"Q > K — produktů je moc":"Q = K"));
  ro("#gxRoDG","Δ<span class='q'>G</span> = Δ<span class='q'>G</span>° + <span class='q'>RT</span> ln <span class='q'>Q</span>",sgn(dG,2)+" kJ·mol⁻¹",dG<-0.05?"záporná → samovolně doprava":(dG>0.05?"kladná → samovolně doleva":"nula → rovnováha"),dG<-0.05?"pos":(dG>0.05?"neg":""));
  ro("#gxRoEq","Rovnováha","ξ = "+fmt(xiEq,3),"K = "+sci(K)+" = ξ/(1−ξ)");
}
