/* ============================================================
   T11 · GRAF — van 't Hoff (k5)
   ============================================================ */
var VH_RXN=[
 {name:"N₂ + 3 H₂ ⇌ 2 NH₃ (exo, −92,2 kJ)", K298:5.6e5, dH:-92.2, c:"var(--exo)"},
 {name:"2 SO₂ + O₂ ⇌ 2 SO₃ (exo, −197,8 kJ)", K298:7.6e24, dH:-197.8, c:"var(--exo)"},
 {name:"CO + H₂O(g) ⇌ CO₂ + H₂ (exo, −41,2 kJ)", K298:1.0e5, dH:-41.2, c:"var(--exo)"},
 {name:"N₂O₄ ⇌ 2 NO₂ (endo, +57,2 kJ)", K298:0.148, dH:57.2, c:"var(--endo)"},
 {name:"CaCO₃(s) ⇌ CaO(s) + CO₂ (endo, +178,3 kJ)", K298:1.4e-23, dH:178.3, c:"var(--endo)"},
 {name:"PCl₅ ⇌ PCl₃ + Cl₂ (endo, +87,9 kJ)", K298:expK(37.2,T298), dH:87.9, c:"var(--endo)"}
];
var vhState={i:0,T:298};
function vhK(r,T){ return vantHoff(r.K298,T298,T,r.dH); }
function drawVH(){
  var r=VH_RXN[vhState.i], T=vhState.T;
  var W=760,H=340,L=70,R=700,T0=30,B=280;
  var iTmin=1/1500, iTmax=1/250;
  var lnMin=Math.min(Math.log(vhK(r,250)),Math.log(vhK(r,1500))), lnMax=Math.max(Math.log(vhK(r,250)),Math.log(vhK(r,1500)));
  var pad=(lnMax-lnMin)*0.12+1; lnMin-=pad; lnMax+=pad;
  var x=function(iT){ return L+(iT-iTmin)/(iTmax-iTmin)*(R-L); }, y=function(ln){ return B-(ln-lnMin)/(lnMax-lnMin)*(B-T0); };
  var s='';
  [1500,1000,750,500,400,300,250].forEach(function(Tt){ s+=line(x(1/Tt),T0,x(1/Tt),B,{c:"var(--line)",w:1}); s+=txt(x(1/Tt),B+16,fmt(1000/Tt,2),{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true}); s+=txt(x(1/Tt),B+30,Tt+" K",{anchor:"middle",size:9.5,fill:"var(--ink-3)"}); });
  var step=Math.pow(10,Math.floor(Math.log10((lnMax-lnMin)/5)))*( (lnMax-lnMin)/5/Math.pow(10,Math.floor(Math.log10((lnMax-lnMin)/5)))>5?5:((lnMax-lnMin)/5/Math.pow(10,Math.floor(Math.log10((lnMax-lnMin)/5)))>2?2:1) );
  for(var g=Math.ceil(lnMin/step)*step; g<=lnMax; g+=step){ s+=line(L,y(g),R,y(g),{c:"var(--line)",w:1}); s+=txt(L-8,y(g)+4,fmt(g,0),{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true}); }
  if(lnMin<0&&lnMax>0){ s+=line(L,y(0),R,y(0),{c:"var(--line-strong)",w:1.5,dash:"5 4"}); s+=txt(R-4,y(0)-6,"ln K = 0 → K = 1",{anchor:"end",size:10.5,w:600,fill:"var(--ink-3)"}); }
  s+=line(L,B,R,B,{c:"var(--line-strong)",w:1.5}); s+=line(L,T0-6,L,B,{c:"var(--line-strong)",w:1.5});
  s+=txt((L+R)/2,B+48,"1/T  [10⁻³ K⁻¹]   (vlevo horko, vpravo chladno)",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.06em;text-transform:uppercase"});
  s+=txt(20,(T0+B)/2,"ln K",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:20px "+((T0+B)/2)+"px;letter-spacing:.06em"});
  s+=line(x(iTmin),y(Math.log(vhK(r,1500))),x(iTmax),y(Math.log(vhK(r,250))),{c:r.c,w:3,cap:"round"});
  var lnT=Math.log(vhK(r,T));
  s+=line(x(1/T),T0,x(1/T),B,{c:"var(--ink-3)",w:1,dash:"3 4"});
  s+='<circle cx="'+x(1/T).toFixed(1)+'" cy="'+y(lnT).toFixed(1)+'" r="6.5" style="fill:'+r.c+';stroke:var(--surface);stroke-width:2.5"/>';
  s+=txt(x(1/T)+(T<500?-12:12),y(lnT)-12,"T = "+T+" K · K = "+sci(vhK(r,T)),{anchor:T<500?"end":"start",size:12,w:700,fill:r.c});
  /* 298 K bod */
  s+='<circle cx="'+x(1/T298).toFixed(1)+'" cy="'+y(Math.log(r.K298)).toFixed(1)+'" r="4" style="fill:var(--surface);stroke:'+r.c+';stroke-width:2"/>';
  s+=txt(x(1/T298)-8,y(Math.log(r.K298))+16,"298 K",{anchor:"end",size:10,fill:"var(--ink-3)"});
  s+=txt(L,18,(r.dH<0?"EXOTERMICKÁ: přímka stoupá doprava (k nízkým T) → K roste s klesající T":"ENDOTERMICKÁ: přímka klesá doprava → K roste s rostoucí T"),{size:11,w:600,fill:r.c,style:"letter-spacing:.05em"});
  $("#vhWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Závislost ln K na 1/T"');
  $("#vhTV").textContent=T+" K ("+fmt(T-273.15,0)+" °C)";
  function ro(id,k,v,h,cls){ var e=$(id); e.className="readout "+(cls||""); e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  var K=vhK(r,T);
  ro("#vhRoK","<span class='q'>K</span> při "+T+" K",sci(K),"z K(298) = "+sci(r.K298)+" van 't Hoffem",K>1?"pos":"neg");
  ro("#vhRoLn","ln <span class='q'>K</span>",fmt(lnT,2),K>1?"rovnováha vpravo":"rovnováha vlevo");
  ro("#vhRoSlope","Směrnice −Δ<span class='q'>H</span>°/<span class='q'>R</span>",fmt(-r.dH*1000/RGAS,0)+" K",(r.dH<0?"kladná — exotermická":"záporná — endotermická"));
}
function initVH(){
  var sel=$("#vhRxn");
  sel.innerHTML=VH_RXN.map(function(r,i){return '<option value="'+i+'">'+r.name+'</option>';}).join("");
  sel.addEventListener("change",function(){ vhState.i=+sel.value; drawVH(); });
  $("#vhT").addEventListener("input",function(){ vhState.T=+this.value; drawVH(); });
  drawVH();
}

/* ============================================================
   T12 · GRAF — Haberův diagram (k5)
   ============================================================ */
/* model: Kp (atm⁻²) ukotven na 36,3 % NH₃ při 400 °C / 200 atm, ΔH = −92,2 kJ konst. */
var HB_KP673=1.897e-4;
function haberKp(T){ return HB_KP673*Math.exp((92200/RGAS)*(1/T-1/673.15)); }
function haberX(T,P){ var r=P*Math.sqrt(27*haberKp(T)/256); var b=-(2*r+1); return (-b-Math.sqrt(b*b-4*r*r))/(2*r); }
var hbState={P:200,Tc:400};
function drawHB(){
  var W=760,H=360,L=64,R=700,T0=30,B=300;
  var x=function(P){ return L+P/600*(R-L); }, y=function(f){ return B-f*(B-T0); };
  var s='';
  for(var P=0;P<=600;P+=100){ s+=line(x(P),T0,x(P),B,{c:"var(--line)",w:1}); s+=txt(x(P),B+18,P,{anchor:"middle",size:11,fill:"var(--ink-3)",mono:true}); }
  for(var f=0;f<=1.001;f+=0.2){ s+=line(L,y(f),R,y(f),{c:"var(--line)",w:1}); s+=txt(L-8,y(f)+4,fmt(f*100,0)+" %",{anchor:"end",size:11,fill:"var(--ink-3)",mono:true}); }
  s+=line(L,B,R,B,{c:"var(--line-strong)",w:1.5}); s+=line(L,T0-6,L,B,{c:"var(--line-strong)",w:1.5});
  s+=txt((L+R)/2,B+38,"celkový tlak [atm]",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.06em;text-transform:uppercase"});
  s+=txt(18,(T0+B)/2,"podíl NH₃ v rovnováze",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:18px "+((T0+B)/2)+"px;letter-spacing:.06em"});
  var Ts=[300,350,400,450,500,550], cols=["var(--cat2)","var(--cat1)","var(--cat3)","var(--accent)","var(--cat4)","var(--ink-3)"];
  var leg='';
  Ts.forEach(function(Tc,i){
    var pts=[]; for(var P=5;P<=600;P+=5){ pts.push(x(P).toFixed(1)+","+y(haberX(Tc+273.15,P)).toFixed(1)); }
    var cur=Tc===hbState.Tc;
    s+='<polyline points="'+pts.join(" ")+'" style="fill:none;stroke:'+cols[i]+';stroke-width:'+(cur?3.2:1.8)+';opacity:'+(cur?1:.7)+'"/>';
    s+=txt(R+6,y(haberX(Tc+273.15,600))+4,Tc+" °C",{size:11,w:cur?700:500,fill:cols[i]});
    leg+='<span class="li"><span class="sw" style="background:'+cols[i]+'"></span>'+Tc+' °C</span>';
  });
  var Tk=hbState.Tc+273.15, xv=haberX(Tk,hbState.P);
  if(Ts.indexOf(hbState.Tc)<0){ var pts2=[]; for(var P2=5;P2<=600;P2+=5){ pts2.push(x(P2).toFixed(1)+","+y(haberX(Tk,P2)).toFixed(1)); } s+='<polyline points="'+pts2.join(" ")+'" style="fill:none;stroke:var(--ink);stroke-width:2.6;stroke-dasharray:6 4"/>'; }
  s+=line(x(hbState.P),T0,x(hbState.P),B,{c:"var(--ink-3)",w:1,dash:"3 4"});
  s+=line(L,y(xv),x(hbState.P),y(xv),{c:"var(--ink-3)",w:1,dash:"3 4"});
  s+='<circle cx="'+x(hbState.P).toFixed(1)+'" cy="'+y(xv).toFixed(1)+'" r="7" style="fill:var(--ink);stroke:var(--surface);stroke-width:2.5"/>';
  s+=txt(x(hbState.P)+12,y(xv)-12,fmt(xv*100,1)+" % NH₃ při "+hbState.Tc+" °C a "+hbState.P+" atm",{size:12,w:700,fill:"var(--ink)",anchor:hbState.P>380?"end":"start"});
  /* průmyslový bod */
  s+='<circle cx="'+x(200).toFixed(1)+'" cy="'+y(haberX(723.15,200)).toFixed(1)+'" r="5" style="fill:var(--surface);stroke:var(--accent);stroke-width:2.5"/>';
  s+=txt(x(200)+10,y(haberX(723.15,200))+18,"průmysl: 450 °C, 200 atm",{size:10.5,w:600,fill:"var(--accent)"});
  $("#hbWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Haberův diagram"');
  $("#hbLegend").innerHTML=leg;
  $("#hbPV").textContent=hbState.P+" atm"; $("#hbTV").textContent=hbState.Tc+" °C";
  function ro(id,k,v,h){ $(id).innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#hbRoX","Podíl NH₃ v&nbsp;rovnováze",fmt(xv*100,1)+" %","stechiometrická směs 1 : 3");
  ro("#hbRoKp","<span class='q'>K</span><sub>p</sub> (model)",sci(haberKp(Tk)),"závisí jen na teplotě");
  ro("#hbRoNote","Co se změnilo","tlak: složení · teplota: K","K_p nezávisí na tlaku");
}
function initHB(){
  $("#hbP").addEventListener("input",function(){ hbState.P=+this.value; drawHB(); });
  $("#hbT").addEventListener("input",function(){ hbState.Tc=+this.value; drawHB(); });
  drawHB();
}
