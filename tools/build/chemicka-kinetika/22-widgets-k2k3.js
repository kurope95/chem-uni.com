/* ============================================================
   22 · WIDGETY KAPITOL 2 A 3
   ============================================================ */

/* ---- linearizace (0., 1., 2. řád) ---- */
var linState={order:1,k:0.15};
function drawLin(){
  var st=linState, c0=1.0, TMAX=20;
  var W=760,H=250;
  /* vzorky */
  var pts=[];
  for(var t=0;t<=TMAX+0.001;t+=2){
    var c=cOf(st.order,st.k,c0,t);
    if(c<=0.015) break;
    pts.push({t:t,c:c});
  }
  function panel(ox,idx,label,fn,yMin,yMax,isLin){
    var L=ox+44,R=ox+236,T=40,B=196, s='';
    s+=rect(ox+4,8,244,H-16,{fill:isLin?"var(--accent-soft)":"var(--surface-2)",r:10,stroke:isLin?"var(--accent)":"var(--line)",sw:isLin?2:1});
    s+=txt(ox+16,28,label,{size:11.5,w:700,fill:isLin?"var(--accent)":"var(--ink-2)",style:"letter-spacing:.06em"});
    var x=function(tt){ return L+(tt/TMAX)*(R-L); };
    var y=function(v){ return B-((v-yMin)/(yMax-yMin))*(B-T); };
    s+=line(L,T-4,L,B,{c:"var(--line-strong)",w:1.2});
    s+=line(L,B,R+4,B,{c:"var(--line-strong)",w:1.2});
    s+=txt(L-4,y(yMax)+4,fmt(yMax,1),{anchor:"end",size:9.5,fill:"var(--ink-3)",mono:true});
    s+=txt(L-4,y(yMin)+4,fmt(yMin,1),{anchor:"end",size:9.5,fill:"var(--ink-3)",mono:true});
    s+=txt(R,B+14,"t [s]",{anchor:"end",size:9.5,fill:"var(--ink-3)"});
    /* spojnice prvního a posledního bodu — test linearity */
    if(pts.length>1){
      var p0=pts[0], pl=pts[pts.length-1];
      s+=line(x(p0.t),y(fn(p0.c)),x(pl.t),y(fn(pl.c)),{c:isLin?"var(--accent)":"var(--ink-3)",w:isLin?2.2:1.2,dash:isLin?"":"4 3"});
    }
    pts.forEach(function(p){
      var v=fn(p.c); if(v<yMin||v>yMax) return;
      s+='<circle cx="'+x(p.t).toFixed(1)+'" cy="'+y(v).toFixed(1)+'" r="4" style="fill:'+(isLin?"var(--accent)":"var(--surface)")+';stroke:'+(isLin?"var(--accent)":"var(--ink-2)")+';stroke-width:1.8"/>';
    });
    s+=txt(ox+124,B+34,isLin?"✓ PŘÍMKA":"zakřivené",{anchor:"middle",size:10.5,w:700,fill:isLin?"var(--accent)":"var(--ink-3)",style:"letter-spacing:.08em"});
    return s;
  }
  var cEnd=pts.length?pts[pts.length-1].c:0.05;
  var lnMin=Math.max(-5,Math.floor(Math.log(cEnd)));
  var invMax=Math.min(12,Math.ceil(1/cEnd));
  var s='';
  s+=panel(0,0,"[A] proti t",function(c){return c;},0,1,st.order===0);
  s+=panel(254,1,"ln[A] proti t",function(c){return Math.log(c);},lnMin,0,st.order===1);
  s+=panel(508,2,"1/[A] proti t",function(c){return 1/c;},1,invMax,st.order===2);
  $("#linWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Test řádu reakce linearizací"');
  $("#linKV").textContent=fmt(st.k,2)+" "+kUnit(st.order);
  pressGroup("#linOrder",st.order);
  var th=tHalf(st.order,st.k,c0);
  setRo("#linRo1","Poločas t½",fmt(th,2)+" s",["[A]₀/2k — s klesající c se zkracuje","ln 2/k — nezávisí na c","1/(k·[A]₀) — s klesající c se prodlužuje"][st.order],"");
  setRo("#linRo2","Přímku dává",["[A] proti t","ln[A] proti t","1/[A] proti t"][st.order],"tak se pozná "+st.order+". řád","");
  setRo("#linRo3","Směrnice přímky",(st.order===2?"+":"−")+fmt(st.k,2),"= "+(st.order===2?"+k":"−k")+" · jednotka "+kUnit(st.order),"");
  $("#linNote").innerHTML=[
    "Nultý řád: koncentrace klesá po přímce a&nbsp;u&nbsp;"+fmt(1/st.k,1)+" s dojde. Logaritmus i&nbsp;převrácená hodnota se u&nbsp;konce prudce zakřivují — poznávací znak.",
    "První řád: <b>ln[A]</b> je přímka se směrnicí −k. Ostatní dva grafy jsou zakřivené. Tohle je nejčastější test v&nbsp;laboratoři i&nbsp;v&nbsp;přijímačkách: zlogaritmuj a&nbsp;koukej, jestli je to přímka.",
    "Druhý řád: přímka je <b>1/[A]</b> se směrnicí +k. Všimněte si, že prostá koncentrace padá zpočátku rychleji než u&nbsp;prvního řádu a&nbsp;pak se vleče."
  ][st.order]+" Zkuste změnit k&nbsp;— směrnice přímky se změní, ale její tvar zůstane.";
}
function initLin(){
  $$("#linOrder button").forEach(function(b){ b.addEventListener("click",function(){ linState.order=+b.dataset.v; drawLin(); }); });
  $("#linK").addEventListener("input",function(){ linState.k=(+this.value)/100; drawLin(); });
  drawLin();
}

/* ---- tabulka poločasů a konstant ---- */
var tblState={q:"",f:"all"};
function drawTbl(){
  var q=tblState.q.toLowerCase().trim();
  var rows=HALF.filter(function(r){
    if(tblState.f!=="all" && r.g.indexOf(tblState.f)<0) return false;
    if(!q) return true;
    return (r.n+" "+r.eq+" "+r.note+" "+r.ord).toLowerCase().indexOf(q)>=0;
  });
  var h=rows.map(function(r){
    var oc = r.ord==="1"?"var(--endo)":(r.ord==="2"?"var(--exo)":(r.ord==="0"?"var(--cat2)":"var(--cat3)"));
    return '<tr><td><b>'+r.n+'</b><br><span class="mono" style="font-size:.78rem;color:var(--ink-3)">'+r.eq+'</span></td>'+
      '<td class="n" style="color:'+oc+';font-weight:700">'+r.ord+'</td>'+
      '<td class="n" style="font-size:.8rem">'+r.k+'</td><td class="n" style="font-size:.8rem">'+r.th+'</td>'+
      '<td class="n">'+r.Ea+'</td><td style="font-size:.8rem;color:var(--ink-2);line-height:1.45">'+r.note+'</td></tr>';
  }).join("");
  if(!rows.length) h='<tr><td colspan="6" style="padding:1.1rem;color:var(--ink-3)">Nic nenalezeno. Zkuste „peroxid“, „rozpad“ nebo „enzym“.</td></tr>';
  $("#tblBody").innerHTML=h;
  pressGroup("#tblFilter",tblState.f);
}
function initTbl(){
  $("#tblSearch").addEventListener("input",function(){ tblState.q=this.value; drawTbl(); });
  $$("#tblFilter button").forEach(function(b){ b.addEventListener("click",function(){ tblState.f=b.dataset.v; drawTbl(); }); });
  drawTbl();
}

/* ---- klasifikace reakcí: křivky c(t) ---- */
var clState={type:"prima",k1:0.20,k2:0.05};
function clCurves(type,k1,k2,t){
  var A,B,C=null;
  if(type==="prima"){ A=Math.exp(-k1*t); B=1-A; }
  else if(type==="nasledna"){
    A=Math.exp(-k1*t);
    if(Math.abs(k2-k1)<1e-6) B=k1*t*Math.exp(-k1*t);
    else B=k1/(k2-k1)*(Math.exp(-k1*t)-Math.exp(-k2*t));
    C=1-A-B;
  }
  else if(type==="zpetna"){ A=(k2+k1*Math.exp(-(k1+k2)*t))/(k1+k2); B=1-A; }
  else { var ks=k1+k2; A=Math.exp(-ks*t); B=k1/ks*(1-A); C=k2/ks*(1-A); }
  return {A:A,B:B,C:C};
}
function drawCl(){
  var st=clState, W=760,H=300,L=60,R=712,T=28,B=246, TMAX=30;
  var s='';
  if(st.type==="retezova"){
    /* schéma řetězové reakce */
    var bx=[60,290,520], bw=200, by=48, bh=118;
    var heads=["1 · INICIACE","2 · PROPAGACE","3 · TERMINACE"];
    var cols=["var(--cat3)","var(--accent)","var(--cat2)"];
    var lines=[
      ["Cl₂ + hν → 2 Cl·","světlo nebo teplo","rozštěpí vazbu na radikály"],
      ["Cl· + CH₄ → HCl + CH₃·","CH₃· + Cl₂ → CH₃Cl + Cl·","radikál se pořád obnovuje"],
      ["2 Cl· → Cl₂","CH₃· + Cl· → CH₃Cl","dva radikály se spojí — konec"]
    ];
    for(var i=0;i<3;i++){
      s+='<rect x="'+bx[i]+'" y="'+by+'" width="'+bw+'" height="'+bh+'" rx="10" style="fill:'+cols[i]+';fill-opacity:.10;stroke:'+cols[i]+';stroke-width:1.5"/>';
      s+=txt(bx[i]+14,by+24,heads[i],{size:11.5,w:700,fill:cols[i],style:"letter-spacing:.06em"});
      s+=txt(bx[i]+14,by+52,lines[i][0],{size:12.5,w:600,fill:"var(--ink)",mono:true});
      s+=txt(bx[i]+14,by+74,lines[i][1],{size:11.5,fill:"var(--ink-2)",mono:true});
      s+=txt(bx[i]+14,by+100,lines[i][2],{size:10.5,fill:"var(--ink-3)"});
      if(i<2){ s+=line(bx[i]+bw+4,by+bh/2,bx[i+1]-6,by+bh/2,{c:"var(--line-strong)",w:2,cap:"round"}); s+='<path d="M'+(bx[i+1]-2)+' '+(by+bh/2)+' l-9 -5 l0 10 z" style="fill:var(--line-strong)"/>'; }
    }
    /* smyčka propagace */
    s+='<path d="M'+(bx[1]+bw-30)+' '+(by+bh)+' C '+(bx[1]+bw-30)+' '+(by+bh+40)+' '+(bx[1]+30)+' '+(by+bh+40)+' '+(bx[1]+30)+' '+(by+bh+4)+'" style="fill:none;stroke:var(--accent);stroke-width:2;stroke-dasharray:5 4"/>';
    s+='<path d="M'+(bx[1]+30)+' '+(by+bh)+' l-5 9 l10 0 z" style="fill:var(--accent)"/>';
    s+=txt(bx[1]+bw/2,by+bh+56,"jeden foton → tisíce přeměn (řetěz se opakuje)",{anchor:"middle",size:11,w:600,fill:"var(--accent)"});
    s+=txt(60,H-22,"Inhibitor (antioxidant) zachytí radikál a řetěz přeruší · proto stačí stopové množství.",{size:11,fill:"var(--ink-3)"});
    $("#clWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Schéma řetězové reakce"');
    $("#clLegend").innerHTML='<span class="li"><span class="sw" style="background:var(--cat3)"></span>iniciace</span><span class="li"><span class="sw" style="background:var(--accent)"></span>propagace</span><span class="li"><span class="sw" style="background:var(--cat2)"></span>terminace</span>';
    setRo("#clRo1","Iniciace","Cl₂ → 2 Cl·","světlo hν nebo teplo štěpí vazbu","");
    setRo("#clRo2","Propagace","radikál se obnovuje","Cl· → CH₃· → Cl· → …","");
    setRo("#clRo3","Terminace","2 radikály → molekula","řetěz končí","");
    $("#clK1Lbl").textContent="k₁ (u řetězové se nepoužije)"; $("#clK2Lbl").textContent="k₂ (u řetězové se nepoužije)";
    $("#clK1V").textContent="—"; $("#clK2V").textContent="—";
    $("#clNote").innerHTML="Řetězová reakce je zvláštní typ složené reakce: reaktivní meziprodukt (radikál) se v&nbsp;propagaci pořád obnovuje. Proto směs H₂ + Cl₂ ve tmě vydrží, ale na světle vybuchne — a&nbsp;proto stopové množství inhibitoru (antioxidantu) zastaví žluknutí tuku.";
    return;
  }
  var x=function(t){ return L+(t/TMAX)*(R-L); };
  var y=function(c){ return B-c*(B-T); };
  for(var i=0;i<=6;i++){ var tt=i*5; s+=line(x(tt),T,x(tt),B,{c:"var(--line)",w:1}); s+=txt(x(tt),B+16,tt,{anchor:"middle",size:11,fill:"var(--ink-3)",mono:true}); }
  for(var j=0;j<=4;j++){ var cc=j/4; s+=line(L,y(cc),R,y(cc),{c:"var(--line)",w:1}); s+=txt(L-7,y(cc)+4,fmt(cc,2),{anchor:"end",size:11,fill:"var(--ink-3)",mono:true}); }
  s+=gAxes({L:L,R:R,T:T,B:B,xl:"čas [min]",yl:"podíl [X]/[A]₀",yx:16,xly:34});
  var pA=[],pB=[],pC=[];
  for(var t=0;t<=TMAX;t+=0.15){
    var c=clCurves(st.type,st.k1,st.k2,t);
    pA.push(x(t).toFixed(1)+","+y(c.A).toFixed(1));
    pB.push(x(t).toFixed(1)+","+y(c.B).toFixed(1));
    if(c.C!==null) pC.push(x(t).toFixed(1)+","+y(c.C).toFixed(1));
  }
  if(pC.length) s+='<polyline points="'+pC.join(" ")+'" style="fill:none;stroke:var(--cat2);stroke-width:2.4"/>';
  s+='<polyline points="'+pB.join(" ")+'" style="fill:none;stroke:var(--endo);stroke-width:2.4"/>';
  s+='<polyline points="'+pA.join(" ")+'" style="fill:none;stroke:var(--exo);stroke-width:2.6"/>';
  var endc=clCurves(st.type,st.k1,st.k2,TMAX);
  s+=txt(R-4,y(endc.A)-7,"A",{anchor:"end",size:12,w:700,fill:"var(--exo)"});
  s+=txt(R-4,y(endc.B)-7,"B",{anchor:"end",size:12,w:700,fill:"var(--endo)"});
  if(endc.C!==null) s+=txt(R-4,y(endc.C)-7,"C",{anchor:"end",size:12,w:700,fill:"var(--cat2)"});
  var leg='<span class="li"><span class="sw" style="background:var(--exo)"></span>A (reaktant)</span><span class="li"><span class="sw" style="background:var(--endo)"></span>B</span>';
  var k1=st.k1,k2=st.k2;
  if(st.type==="prima"){
    s+=txt(L+8,T+4,"A → B  (k₁ = "+fmt(k1,2)+" min⁻¹)",{size:11.5,w:600,fill:"var(--ink-2)",mono:true});
    setRo("#clRo1","Poločas A",fmt(Math.LN2/k1,2)+" min","ln 2 / k₁","");
    setRo("#clRo2","[A] + [B]","= konst.","co ubude z A, přibude do B","");
    setRo("#clRo3","Po 5 poločasech","zbývá 3 %","(½)⁵ = 1/32","");
    $("#clK1Lbl").textContent="Rychlostní konstanta k₁ (A → B)"; $("#clK2Lbl").textContent="k₂ (u přímé se nepoužije)";
    $("#clNote").innerHTML="Nejjednodušší případ: jediná reakce, jediným směrem. Křivky jsou zrcadlové — co z&nbsp;A ubude, to v&nbsp;B přibude. Ostatní typy jsou právě odchylky od tohoto obrázku.";
  } else if(st.type==="nasledna"){
    leg+='<span class="li"><span class="sw" style="background:var(--cat2)"></span>C (konečný produkt)</span>';
    var tm=(Math.abs(k2-k1)<1e-6)?1/k1:Math.log(k2/k1)/(k2-k1);
    var bm=clCurves(st.type,k1,k2,tm).B;
    if(tm<TMAX){ s+=line(x(tm),y(bm),x(tm),B,{c:"var(--endo)",w:1,dash:"4 3"}); s+='<circle cx="'+x(tm)+'" cy="'+y(bm)+'" r="5" style="fill:var(--surface);stroke:var(--endo);stroke-width:2.2"/>'; s+=txt(x(tm)+6,y(bm)-8,"max B · t = "+fmt(tm,1)+" min",{size:11,w:600,fill:"var(--endo)",mono:true}); }
    s+=txt(L+8,T+4,"A → B → C  (k₁ = "+fmt(k1,2)+", k₂ = "+fmt(k2,2)+" min⁻¹)",{size:11.5,w:600,fill:"var(--ink-2)",mono:true});
    setRo("#clRo1","Maximum meziproduktu B",fmt(tm,1)+" min","t = ln(k₂/k₁)/(k₂ − k₁)","");
    setRo("#clRo2","[B]max / [A]₀",fmt(bm,2),k2>k1?"rychlý 2. krok — B se nehromadí":"pomalý 2. krok — B se hromadí","");
    setRo("#clRo3","Co určuje rychlost vzniku C",k1<k2?"1. krok (pomalejší)":"2. krok (pomalejší)","nejpomalejší krok","");
    $("#clK1Lbl").textContent="k₁ (A → B)"; $("#clK2Lbl").textContent="k₂ (B → C)";
    $("#clNote").innerHTML=(k2>k1*3?"Druhý krok je mnohem rychlejší — meziprodukt se spotřebuje hned, jak vznikne, a&nbsp;jeho koncentrace zůstává malá (ustálený stav). Rychlost vzniku C řídí první krok.":"Druhý krok je pomalejší, takže se meziprodukt B nahromadí a&nbsp;pak pomalu odchází. Přesně tak vzniká „kocovina“: acetaldehyd se hromadí, protože jeho odbourávání je pomalejší než vznik.")+" Zkuste to otočit.";
  } else if(st.type==="zpetna"){
    var K=k1/k2, Aeq=k2/(k1+k2), t99=Math.log(100)/(k1+k2);
    s+=line(L,y(Aeq),R,y(Aeq),{c:"var(--ink-3)",w:1,dash:"5 4"});
    s+=txt(L+8,y(Aeq)-6,"rovnováha: [A]eq = "+fmt(Aeq,2)+", [B]eq = "+fmt(1-Aeq,2),{size:11,w:600,fill:"var(--ink-3)",mono:true});
    s+=txt(L+8,T+4,"A ⇌ B  (k₁ = "+fmt(k1,2)+", k₋₁ = "+fmt(k2,2)+" min⁻¹)",{size:11.5,w:600,fill:"var(--ink-2)",mono:true});
    setRo("#clRo1","Rovnovážná konstanta K",fmt(K,2),"K = k₁ / k₋₁ = [B]eq/[A]eq","");
    setRo("#clRo2","Rovnovážné složení","A "+fmt(100*Aeq,0)+" % · B "+fmt(100*(1-Aeq),0)+" %","křivky se ustálí, nedojdou na nulu","");
    setRo("#clRo3","Rovnováha z 99 % za",fmt(t99,1)+" min","ln 100 / (k₁ + k₋₁)","");
    $("#clK1Lbl").textContent="k₁ (přímá A → B)"; $("#clK2Lbl").textContent="k₋₁ (zpětná B → A)";
    $("#clNote").innerHTML="Křivky se <b>zastaví</b> dřív, než A dojde: v&nbsp;rovnováze je rychlost přímé reakce k₁[A] rovna rychlosti zpětné k₋₁[B]. Poměr [B]/[A] je pak k₁/k₋₁ = K — rovnovážná konstanta je poměr rychlostních konstant. Zkuste k₋₁ zvětšit: rovnováha se posune k&nbsp;A.";
  } else {
    leg+='<span class="li"><span class="sw" style="background:var(--cat2)"></span>C (druhý produkt)</span>';
    var ks=k1+k2;
    s+=txt(L+8,T+4,"A → B (k₁ = "+fmt(k1,2)+")  ·  A → C (k₂ = "+fmt(k2,2)+" min⁻¹)",{size:11.5,w:600,fill:"var(--ink-2)",mono:true});
    setRo("#clRo1","Poměr produktů [B]/[C]",fmt(k1/k2,2),"= k₁ / k₂, stále stejný","");
    setRo("#clRo2","Podíl A, který skončí jako B",fmt(100*k1/ks,0)+" %","k₁ / (k₁ + k₂)","");
    setRo("#clRo3","Poločas A",fmt(Math.LN2/ks,2)+" min","ln 2 / (k₁ + k₂) — obě cesty ubírají","");
    $("#clK1Lbl").textContent="k₁ (A → B)"; $("#clK2Lbl").textContent="k₂ (A → C)";
    $("#clNote").innerHTML="Dvě cesty soupeří o&nbsp;tentýž reaktant. Poměr produktů je dán jen poměrem konstant a&nbsp;v&nbsp;čase se nemění — to je kinetické řízení. Selektivní katalyzátor zvýší jednu z&nbsp;konstant a&nbsp;posune poměr; přesně tak se v&nbsp;průmyslu vybírá žádaný izomer.";
  }
  $("#clWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Křivky koncentrací pro daný typ reakce"');
  $("#clLegend").innerHTML=leg;
  $("#clK1V").textContent=fmt(k1,2)+" min⁻¹"; $("#clK2V").textContent=fmt(k2,2)+" min⁻¹";
}
function initCl(){
  $$("#clType button").forEach(function(b){ b.addEventListener("click",function(){ clState.type=b.dataset.v; pressGroup("#clType",clState.type); drawCl(); }); });
  $("#clK1").addEventListener("input",function(){ clState.k1=(+this.value)/100; drawCl(); });
  $("#clK2").addEventListener("input",function(){ clState.k2=(+this.value)/100; drawCl(); });
  drawCl();
}
