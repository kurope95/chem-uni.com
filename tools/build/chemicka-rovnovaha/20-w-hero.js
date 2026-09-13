/* ============================================================
   T2 · WIDGET — hero: simulace dynamické rovnováhy
   ============================================================ */
var HERO_RXN=[
 {name:"H₂ + I₂ ⇌ 2 HI", sp:["H₂","I₂","HI"], cols:["var(--cat2)","var(--cat3)","var(--cat1)"],
  c0R:[1,1,0], c0P:[0,0,2], react:0, prod:2,
  rates:function(c,k1,k2){ return [k1*c[0]*c[1], k2*c[2]*c[2]]; },
  deriv:function(c,k1,k2){ var d=k1*c[0]*c[1]-k2*c[2]*c[2]; return [-d,-d,2*d]; },
  Kexpr:"[HI]² / ([H₂]·[I₂])", Kc:function(c){ return c[2]*c[2]/(c[0]*c[1]); }, cmax:2.05},
 {name:"N₂O₄ ⇌ 2 NO₂ (barva)", sp:["N₂O₄","NO₂"], cols:["var(--cat2)","var(--exo)"],
  c0R:[1,0], c0P:[0,2], react:0, prod:1,
  rates:function(c,k1,k2){ return [k1*c[0], k2*c[1]*c[1]]; },
  deriv:function(c,k1,k2){ var d=k1*c[0]-k2*c[1]*c[1]; return [-d,2*d]; },
  Kexpr:"[NO₂]² / [N₂O₄]", Kc:function(c){ return c[1]*c[1]/c[0]; }, cmax:2.05},
 {name:"A ⇌ B (obecně)", sp:["A","B"], cols:["var(--cat2)","var(--cat1)"],
  c0R:[1,0], c0P:[0,1], react:0, prod:1,
  rates:function(c,k1,k2){ return [k1*c[0], k2*c[1]]; },
  deriv:function(c,k1,k2){ var d=k1*c[0]-k2*c[1]; return [-d,d]; },
  Kexpr:"[B] / [A]", Kc:function(c){ return c[1]/c[0]; }, cmax:1.05}
];
var heroState={rxn:0,k1:0.6,k2:0.2,start:"react"};

/* integrace RK4; vrací vzorky a čas ustavení rovnováhy */
function heroSim(){
  var r=HERO_RXN[heroState.rxn], k1=heroState.k1, k2=heroState.k2;
  var c=(heroState.start==="react"?r.c0R:r.c0P).slice();
  var dt=0.0025, t=0, tMax=90, steps=0, out=[], tEq=null, tStop=null;
  var v0=r.rates(c,k1,k2), vref=Math.max(v0[0],v0[1],1e-9);
  function add(a,b,f){ return a.map(function(x,i){return x+f*b[i];}); }
  out.push({t:0,c:c.slice(),v:v0});
  while(t<tMax){
    var d1=r.deriv(c,k1,k2);
    var d2=r.deriv(add(c,d1,dt/2),k1,k2);
    var d3=r.deriv(add(c,d2,dt/2),k1,k2);
    var d4=r.deriv(add(c,d3,dt),k1,k2);
    c=c.map(function(x,i){ return Math.max(0,x+dt/6*(d1[i]+2*d2[i]+2*d3[i]+d4[i])); });
    t+=dt; steps++;
    var v=r.rates(c,k1,k2);
    if(steps%8===0) out.push({t:t,c:c.slice(),v:v});
    if(tEq===null && Math.abs(v[0]-v[1])<0.004*vref && t>0.05){ tEq=t; tStop=Math.min(tMax,Math.max(t*1.45,t+1.5)); }
    if(tStop!==null && t>=tStop) break;
  }
  if(tEq===null) tEq=t;
  return {pts:out,tEq:tEq,tEnd:t,cEq:c,vEq:r.rates(c,k1,k2)};
}

function drawHero(){
  var r=HERO_RXN[heroState.rxn], sim=heroSim(), pts=sim.pts;
  var K=heroState.k1/heroState.k2;
  /* ---- graf koncentrací ---- */
  var W=760,H=300,L=58,R=690,T0=28,B=250;
  var tEnd=sim.tEnd, cmax=r.cmax;
  var x=function(t){ return L+(t/tEnd)*(R-L); };
  var y=function(cv){ return B-(cv/cmax)*(B-T0); };
  var s='';
  for(var g=0;g<=4;g++){ var cv=cmax/2.05*g/2; s+=line(L,y(cv),R,y(cv),{c:"var(--line)",w:1}); s+=txt(L-8,y(cv)+4,fmt(cv,1),{anchor:"end",size:11,fill:"var(--ink-3)",mono:true}); }
  s+=line(L,B,R,B,{c:"var(--line-strong)",w:1.5}); s+=line(L,T0-6,L,B,{c:"var(--line-strong)",w:1.5});
  for(var i=0;i<=4;i++){ var tv=tEnd*i/4; s+=txt(x(tv),B+18,fmt(tv,tEnd<5?1:0),{anchor:"middle",size:11,fill:"var(--ink-3)",mono:true}); }
  s+=txt((L+R)/2,B+38,"čas t (relativní jednotky)",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em;text-transform:uppercase"});
  s+=txt(16,(T0+B)/2,"c [mol·dm⁻³]",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:16px "+((T0+B)/2)+"px;letter-spacing:.06em"});
  /* rovnováha */
  s+=line(x(sim.tEq),T0,x(sim.tEq),B,{c:"var(--ok)",w:1.5,dash:"5 4"});
  s+=txt(x(sim.tEq)+6,T0+12,"rovnováha ustavena",{size:11,w:600,fill:"var(--ok)"});
  s+=txt(x(sim.tEq)+6,T0+26,"dál se koncentrace nemění",{size:10.5,fill:"var(--ink-3)"});
  r.sp.forEach(function(name,i){
    var d=pts.map(function(p){ return x(p.t).toFixed(1)+","+y(p.c[i]).toFixed(1); }).join(" ");
    s+='<polyline points="'+d+'" style="fill:none;stroke:'+r.cols[i]+';stroke-width:2.6;stroke-linejoin:round;stroke-linecap:round"/>';
    var last=pts[pts.length-1];
    s+=txt(R+8,y(last.c[i])+4,name+" = "+fmt(last.c[i],2),{size:11.5,w:600,fill:r.cols[i]});
  });
  if(heroState.rxn===1){
    var no2=sim.cEq[1]/2;
    s+=rect(L+14,T0+4,54,54,{fill:"var(--exo)",r:8,style:"fill-opacity:"+(0.08+0.85*no2).toFixed(2)+";stroke:var(--line-strong);stroke-width:1"});
    s+=txt(L+41,T0+72,"barva plynu",{anchor:"middle",size:10,fill:"var(--ink-3)"});
  }
  $("#heroCWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Časový průběh koncentrací"');

  /* ---- graf rychlostí ---- */
  var H2=210,B2=165,T2=26;
  var vmax=0; pts.forEach(function(p){ vmax=Math.max(vmax,p.v[0],p.v[1]); }); vmax=vmax*1.08||1;
  var yv=function(v){ return B2-(v/vmax)*(B2-T2); };
  var s2='';
  s2+=line(L,B2,R,B2,{c:"var(--line-strong)",w:1.5}); s2+=line(L,T2-6,L,B2,{c:"var(--line-strong)",w:1.5});
  for(var j=0;j<=2;j++){ var vv=vmax/1.08*j/2; s2+=line(L,yv(vv),R,yv(vv),{c:"var(--line)",w:1}); s2+=txt(L-8,yv(vv)+4,fmt(vv,2),{anchor:"end",size:11,fill:"var(--ink-3)",mono:true}); }
  s2+=txt(16,(T2+B2)/2,"rychlost v",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:16px "+((T2+B2)/2)+"px;letter-spacing:.06em"});
  s2+=line(x(sim.tEq),T2,x(sim.tEq),B2,{c:"var(--ok)",w:1.5,dash:"5 4"});
  var d1=pts.map(function(p){ return x(p.t).toFixed(1)+","+yv(p.v[0]).toFixed(1); }).join(" ");
  var d2=pts.map(function(p){ return x(p.t).toFixed(1)+","+yv(p.v[1]).toFixed(1); }).join(" ");
  s2+='<polyline points="'+d1+'" style="fill:none;stroke:var(--exo);stroke-width:2.6;stroke-linejoin:round"/>';
  s2+='<polyline points="'+d2+'" style="fill:none;stroke:var(--endo);stroke-width:2.6;stroke-linejoin:round"/>';
  var lastV=pts[pts.length-1].v;
  s2+=txt(R+8,yv(lastV[0])-6,"v₁ přímá",{size:11.5,w:600,fill:"var(--exo)"});
  s2+=txt(R+8,yv(lastV[1])+14,"v₂ zpětná",{size:11.5,w:600,fill:"var(--endo)"});
  s2+='<circle cx="'+x(sim.tEq).toFixed(1)+'" cy="'+yv(sim.vEq[0]).toFixed(1)+'" r="5" style="fill:var(--surface);stroke:var(--ok);stroke-width:2.5"/>';
  s2+=txt(x(sim.tEq)+8,yv(sim.vEq[0])-10,"v₁ = v₂ = "+fmt(sim.vEq[0],3),{size:11,w:600,fill:"var(--ok)"});
  s2+=txt(L+6,T2+4,"rychlosti se vyrovnají — reakce ale běží dál oběma směry",{size:10.5,fill:"var(--ink-3)"});
  $("#heroVWrap").innerHTML=svg("0 0 "+W+" "+H2,s2,'aria-label="Rychlosti přímé a zpětné reakce"');

  /* ---- readouty ---- */
  $("#heroK1V").textContent=fmt(heroState.k1,2); $("#heroK2V").textContent=fmt(heroState.k2,2);
  var Kc=r.Kc(sim.cEq);
  function ro(id,k,v,h){ $(id).innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#heroRoK","<span class='q'>K</span> = <span class='q'>k</span>₁/<span class='q'>k</span>₋₁",fmt(K,2),"z koncentrací: "+r.Kexpr+" = "+fmt(Kc,2));
  ro("#heroRoEq","Rovnovážné složení",r.sp.map(function(n,i){return "["+n+"] = "+fmt(sim.cEq[i],2);}).join("<br>"),"mol·dm⁻³");
  var alpha, alphaLbl;
  if(heroState.start==="react"){ alpha=1-sim.cEq[r.react]/r.c0R[r.react]; alphaLbl="přeměněno z "+r.sp[r.react]; }
  else { alpha=1-sim.cEq[r.prod]/r.c0P[r.prod]; alphaLbl="rozloženo z "+r.sp[r.prod]; }
  ro("#heroRoA","Stupeň přeměny <span class='q'>α</span>",fmt(alpha*100,1)+" %",alphaLbl);
  ro("#heroRoT","Čas do rovnováhy",fmt(sim.tEq,1),"relativní jednotky; s katalyzátorem kratší, K stejné");
  $("#heroLegend").innerHTML=r.sp.map(function(n,i){ return '<span class="li"><span class="sw" style="background:'+r.cols[i]+'"></span>'+n+'</span>'; }).join("")+
    '<span class="li"><span class="sw" style="background:var(--exo)"></span>v₁ = k₁·(reaktanty)</span><span class="li"><span class="sw" style="background:var(--endo)"></span>v₂ = k₋₁·(produkty)</span>';
  var nt;
  if(heroState.start==="react") nt="Začínáme z&nbsp;výchozích látek: <span class='q'>v</span>₁ je hned na začátku největší a&nbsp;klesá, <span class='q'>v</span>₂ startuje z&nbsp;nuly a&nbsp;roste. Kde se protnou, je rovnováha. Přepněte na <b>start z&nbsp;produktů</b> — skončíte ve stejném složení.";
  else nt="Začínáme z&nbsp;produktů: teď je na začátku největší <span class='q'>v</span>₂ a&nbsp;<span class='q'>v</span>₁ roste z&nbsp;nuly. Křivky se sejdou ve <b>stejném</b> složení jako při startu z&nbsp;reaktantů — rovnováha nezávisí na tom, odkud přijdete.";
  nt+=" Poměr <span class='q'>k</span>₁/<span class='q'>k</span>₋₁ = "+fmt(K,2)+" je rovnovážná konstanta: čím větší, tím víc produktů v&nbsp;rovnováze.";
  $("#heroNote").innerHTML=nt;
}
function initHero(){
  var sel=$("#heroRxn");
  sel.innerHTML=HERO_RXN.map(function(r,i){return '<option value="'+i+'">'+r.name+'</option>';}).join("");
  sel.addEventListener("change",function(){ heroState.rxn=+sel.value; drawHero(); });
  $$("#heroStart button").forEach(function(b){
    b.addEventListener("click",function(){
      heroState.start=b.dataset.v;
      $$("#heroStart button").forEach(function(x){x.setAttribute("aria-pressed",x===b);});
      drawHero();
    });
  });
  $("#heroK1").addEventListener("input",function(){ heroState.k1=+this.value; drawHero(); });
  $("#heroK2").addEventListener("input",function(){ heroState.k2=+this.value; drawHero(); });
  drawHero();
}
