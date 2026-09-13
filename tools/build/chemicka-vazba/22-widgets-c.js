/* ============================================================
   18 · ROZHODOVAČ POLARITY MOLEKUL
   ============================================================ */
/* rozložení pro kreslení (2D projekce): [symbol, úhel°, relativní délka]; lp = úhly volných párů; dir = záložní směr výsledného dipólu */
var POLLAY = {
  "H₂":   {at:[["H",0,1]], lp:[]},
  "HCl":  {at:[["Cl",0,1]], lp:[]},
  "HF":   {at:[["F",0,1]], lp:[]},
  "CO":   {at:[["O",0,1]], lp:[180]},
  "CO₂":  {at:[["O",0,1],["O",180,1]], lp:[]},
  "BeCl₂":{at:[["Cl",0,1],["Cl",180,1]], lp:[]},
  "H₂O":  {at:[["H",232,0.85],["H",308,0.85]], lp:[60,120]},
  "H₂S":  {at:[["H",226,0.9],["H",314,0.9]], lp:[60,120]},
  "SO₂":  {at:[["O",240,1],["O",300,1]], lp:[90]},
  "O₃":   {at:[["O",240,1],["O",300,1]], lp:[90], dir:90},
  "NH₃":  {at:[["H",125,0.9],["H",55,0.9],["H",90,0.42]], lp:[270]},
  "BF₃":  {at:[["F",90,1],["F",210,1],["F",330,1]], lp:[]},
  "SO₃":  {at:[["O",90,1],["O",210,1],["O",330,1]], lp:[]},
  "CH₄":  {at:[["H",90,1],["H",210,1],["H",330,1],["H",270,0.5]], lp:[]},
  "CCl₄": {at:[["Cl",90,1],["Cl",210,1],["Cl",330,1],["Cl",270,0.5]], lp:[]},
  "CHCl₃":{at:[["Cl",90,1],["Cl",210,1],["Cl",330,1],["H",270,0.5]], lp:[]},
  "CH₃Cl":{at:[["Cl",270,1],["H",60,0.85],["H",120,0.85],["H",90,0.45]], lp:[]},
  "CH₂Cl₂":{at:[["Cl",240,1],["Cl",300,1],["H",60,0.85],["H",120,0.85]], lp:[]},
  "HCN":  {at:[["N",0,1],["H",180,0.6]], lp:[]},
  "PCl₅": {at:[["Cl",90,1],["Cl",270,1],["Cl",0,0.9],["Cl",120,0.9],["Cl",240,0.9]], lp:[]},
  "SF₆":  {at:[["F",0,1],["F",90,1],["F",180,1],["F",270,1],["F",45,0.5],["F",225,0.5]], lp:[]},
  "NF₃":  {at:[["F",125,0.9],["F",55,0.9],["F",90,0.42]], lp:[270]},
  "CH₃OH":{at:[["O",330,1],["H",90,0.8],["H",210,0.8],["H",270,0.45]], lp:[]}
};
var polI=4;
function drawPol(){
  var m=POLMOL[polI], lay=POLLAY[m.f], rad=Math.PI/180;
  var W=460,H=300, cx=230, cy=150, RB=95, RA=17, s='';
  var cenEN=EN[m.cen]||2.5;
  var sx=0, sy=0;
  /* vazby a atomy */
  lay.at.forEach(function(a){
    var ang=a[1]*rad, L=RB*a[2], x2=cx+Math.cos(ang)*L, y2=cy+Math.sin(ang)*L;
    s+=line(cx,cy,x2,y2,{c:"var(--ink-2)",w:a[2]<0.6?1.4:2.4,cap:"round",dash:a[2]<0.6?"4 3":undefined});
  });
  lay.at.forEach(function(a){
    var ang=a[1]*rad, L=RB*a[2], x2=cx+Math.cos(ang)*L, y2=cy+Math.sin(ang)*L;
    s+=circ(x2,y2,a[2]<0.6?12:RA,{fill:"var(--surface)",stroke:"var(--ink-2)",sw:1.6});
    s+=txt(x2,y2+5,a[0],{anchor:"middle",size:a[2]<0.6?11:14,w:700,fill:"var(--ink)"});
    /* vektor dipólu vazby */
    var dEN=(EN[a[0]]||2.5)-cenEN;
    if(Math.abs(dEN)>=0.3){
      var dir = dEN>0?1:-1, mag=Math.min(1,Math.abs(dEN)/1.3)*L*0.5;
      var mx=cx+Math.cos(ang)*L*0.5, my=cy+Math.sin(ang)*L*0.5;
      var ox=-Math.sin(ang)*11, oy=Math.cos(ang)*11;
      s+=arrow(mx+ox-Math.cos(ang)*dir*mag/2, my+oy-Math.sin(ang)*dir*mag/2, mx+ox+Math.cos(ang)*dir*mag/2, my+oy+Math.sin(ang)*dir*mag/2,{c:"var(--cat2)",w:2.2,ah:7});
      sx+=Math.cos(ang)*dir*Math.abs(dEN)*a[2]; sy+=Math.sin(ang)*dir*Math.abs(dEN)*a[2];
    }
  });
  /* centrální atom */
  s+=circ(cx,cy,RA+3,{fill:"var(--accent-soft)",stroke:"var(--accent)",sw:2});
  s+=txt(cx,cy+5,m.cen,{anchor:"middle",size:15,w:700,fill:"var(--ink)"});
  lay.lp.forEach(function(la){
    var px=Math.cos((la+90)*rad)*4.5, py=Math.sin((la+90)*rad)*4.5, x=cx+Math.cos(la*rad)*(RA+14), y=cy+Math.sin(la*rad)*(RA+14);
    s+=circ(x+px,y+py,3.2,{fill:"var(--cat1)"})+circ(x-px,y-py,3.2,{fill:"var(--cat1)"});
  });
  /* výsledný dipól */
  var mag=Math.sqrt(sx*sx+sy*sy);
  if(m.pol){
    var ang2 = mag>0.05 ? Math.atan2(sy,sx) : (lay.dir!==undefined?lay.dir*rad:0);
    var Lr=40+Math.min(1,m.mu/2)*70;
    s+=arrow(cx-Math.cos(ang2)*Lr/2, cy-Math.sin(ang2)*Lr/2, cx+Math.cos(ang2)*Lr/2, cy+Math.sin(ang2)*Lr/2,{c:"var(--accent)",w:4.5,ah:13});
    s+=txt(20,H-14,"výsledný μ = "+fmt(m.mu,2)+" D → POLÁRNÍ",{size:12.5,w:700,fill:"var(--accent)"});
  } else {
    s+=circ(cx,cy,RA+12,{fill:"none",stroke:"var(--cat1)",sw:2.5,style:"stroke-dasharray:5 4;"});
    s+=txt(20,H-14,"vektorový součet = 0 → NEPOLÁRNÍ",{size:12.5,w:700,fill:"var(--cat1)"});
  }
  s+=txt(12,22,m.f,{size:16,w:700,fill:"var(--ink)"});
  s+=txt(12,40,m.geo,{size:11,fill:"var(--ink-3)"});
  $("#polWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Polarita molekuly '+m.f+'"');
  function ro(id,k,v,h,c){ var e=$(id); e.innerHTML='<span class="k">'+k+'</span><span class="v" style="color:'+(c||"var(--ink)")+'">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#polRo1","Polární vazby?",m.dEN>=0.4?"ano (ΔEN "+fmt(m.dEN,2)+")":(m.dEN>0?"slabě (ΔEN "+fmt(m.dEN,2)+")":"ne (ΔEN 0)"),"krok 1",m.dEN>=0.4?"var(--cat2)":"var(--ink-3)");
  ro("#polRo2","Tvar",m.geo,"krok 2 (VSEPR)");
  ro("#polRo3","Molekula",m.pol?"POLÁRNÍ":"NEPOLÁRNÍ","μ = "+fmt(m.mu,2)+" D",m.pol?"var(--cat4)":"var(--cat1)");
  $("#polNote").innerHTML=m.why+(lay.at.some(function(a){return a[2]<0.6;})?" <span style='color:var(--ink-3)'>(Čárkovaná vazba míří za rovinu obrazovky — obrázek je 2D projekce.)</span>":"");
}
function initPol(){
  var sel=$("#polSel");
  sel.innerHTML=POLMOL.map(function(m,i){return '<option value="'+i+'">'+m.f+' — '+m.geo+'</option>';}).join("");
  sel.value=String(polI);
  sel.addEventListener("change",function(){ polI=+sel.value; drawPol(); });
}

/* ============================================================
   19 · TRENAŽÉR POLARITY (skóre)
   ============================================================ */
var pdSet=[], pdI=0, pdScore=0, pdAnswered=false;
function pdNewSet(){
  var idx=POLDRILL.map(function(_,i){return i;});
  for(var i=idx.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=idx[i]; idx[i]=idx[j]; idx[j]=t; }
  pdSet=idx.slice(0,12); pdI=0; pdScore=0;
}
function drawPD(){
  var it=POLDRILL[pdSet[pdI]];
  $("#pdQn").textContent=pdI+1; $("#pdQtot").textContent=pdSet.length; $("#pdScore").textContent=pdScore;
  $("#pdMol").innerHTML='<span class="chem" style="font-size:1.3rem">'+it[0]+'</span>';
  var ex=$("#pdExplain"); ex.style.display="none"; ex.className="explain";
  $("#pdNext").disabled=true;
  $$("#k6 [data-pd]").forEach(function(b){ b.disabled=false; b.style.opacity=""; });
  pdAnswered=false;
}
function initPD(){
  pdNewSet();
  $$("#k6 [data-pd]").forEach(function(b){
    b.addEventListener("click",function(){
      if(pdAnswered) return;
      pdAnswered=true;
      var it=POLDRILL[pdSet[pdI]], ok=(b.dataset.pd==="pol")===it[1];
      if(ok) pdScore++;
      $("#pdScore").textContent=pdScore;
      var ex=$("#pdExplain"); ex.className="explain"; ex.style.display="flex";
      ex.style.background = ok?"var(--ok-soft)":"var(--bad-soft)"; ex.style.borderColor = ok?"var(--ok)":"var(--bad)";
      ex.innerHTML='<span class="verdict" style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+(ok?"✓ Správně":"✕ Špatně — "+it[0]+" je "+(it[1]?"polární":"nepolární"))+'</span><span class="eyebrow">Proč</span><div>'+it[2]+'</div>';
      $$("#k6 [data-pd]").forEach(function(x){ x.disabled=true; x.style.opacity=((x.dataset.pd==="pol")===it[1])?"1":".5"; });
      $("#pdNext").disabled = pdI>=pdSet.length-1;
      if(pdI>=pdSet.length-1){
        toast("Trenažér dokončen: "+pdScore+" z "+pdSet.length+" správně.");
        if(pdScore>=9) markDone("k6");
      }
    });
  });
  $("#pdNext").addEventListener("click",function(){ if(pdI<pdSet.length-1){ pdI++; drawPD(); } });
  $("#pdRestart").addEventListener("click",function(){ pdNewSet(); drawPD(); toast("Nová sada 12 molekul."); });
  drawPD();
}

/* ============================================================
   20 · DATIVNÍ VAZBA
   ============================================================ */
var datI=0;
function drawDat(){
  var m=DATIVE[datI], W=760,H=280, s='';
  var xl=170, xr=430, y0=120;
  /* donor */
  s+=rect(xl-110,y0-52,220,104,{fill:"var(--endo-soft)",r:12,stroke:"var(--endo)",sw:1.5});
  s+=txt(xl,y0-30,"DONOR",{anchor:"middle",size:10.5,w:700,fill:"var(--endo)",style:"letter-spacing:.1em"});
  s+=txt(xl-14,y0+8,m.d.L,{anchor:"end",size:22,w:700,fill:"var(--ink)"});
  s+=circ(xl+2,y0-4,4,{fill:"var(--endo)"}); s+=circ(xl+2,y0+6,4,{fill:"var(--endo)"});
  s+=txt(xl,y0+40,"volný elektronový pár",{anchor:"middle",size:10.5,fill:"var(--ink-2)"});
  /* akceptor */
  s+=rect(xr-110,y0-52,220,104,{fill:"var(--exo-soft)",r:12,stroke:"var(--exo)",sw:1.5});
  s+=txt(xr,y0-30,"AKCEPTOR",{anchor:"middle",size:10.5,w:700,fill:"var(--exo)",style:"letter-spacing:.1em"});
  s+=circ(xr-40,y0+1,14,{fill:"none",stroke:"var(--exo)",sw:2,style:"stroke-dasharray:4 3;"});
  s+=txt(xr+18,y0+8,m.d.R,{anchor:"middle",size:20,w:700,fill:"var(--ink)"});
  s+=txt(xr,y0+40,"prázdný orbital",{anchor:"middle",size:10.5,fill:"var(--ink-2)"});
  /* šipka */
  s+=arrow(xl+18,y0+1,xr-58,y0+1,{c:"var(--accent)",w:3.5,ah:12});
  s+=txt((xl+xr)/2-20,y0-14,"oba elektrony",{anchor:"middle",size:11,w:600,fill:"var(--accent)"});
  /* produkt */
  s+=rect(575,y0-52,170,104,{fill:"var(--surface-2)",r:12,stroke:"var(--accent)",sw:2});
  s+=txt(660,y0-30,"PRODUKT",{anchor:"middle",size:10.5,w:700,fill:"var(--accent)",style:"letter-spacing:.1em"});
  s+=txt(660,y0+8,m.d.prod,{anchor:"middle",size:m.d.prod.length>12?14:18,w:700,fill:"var(--ink)"});
  s+=txt(660,y0+40,"vazba = obyčejná kovalentní",{anchor:"middle",size:10,fill:"var(--ink-2)"});
  s+=arrow(xr+112,y0+1,571,y0+1,{c:"var(--ink-3)",w:2,ah:8});
  s+=txt(30,26,m.t,{size:14,w:700,fill:"var(--ink)"});
  s+=txt(30,44,m.eq,{size:12,fill:"var(--ink-2)",mono:true});
  s+=txt(W/2,H-14,"Geometrie: "+m.geo,{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  $("#datWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Dativní vazba: '+m.k+'"');
  $$("#datSel button").forEach(function(b){ b.setAttribute("aria-pressed", +b.dataset.v===datI); });
  function ro(id,k,v,h,c){ var e=$(id); e.innerHTML='<span class="k">'+k+'</span><span class="v" style="font-size:.98rem;color:'+(c||"var(--ink)")+'">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#datRo1","Donor (Lewisova zásada)",m.donor,"poskytuje oba elektrony","var(--endo)");
  ro("#datRo2","Akceptor (Lewisova kyselina)",m.akc,"má prázdný orbital","var(--exo)");
  ro("#datRo3","Výsledek",m.k,m.geo,"var(--accent)");
  $("#datNote").innerHTML=m.note;
}
function initDat(){ $$("#datSel button").forEach(function(b){ b.addEventListener("click",function(){ datI=+b.dataset.v; drawDat(); }); }); }

/* ============================================================
   21 · SÍLA INTERAKCÍ — log graf
   ============================================================ */
function drawForce(){
  var W=760,H=360, L=190,R=560, T=44, rowH=40;
  var lmin=Math.log10(0.01), lmax=Math.log10(10000);
  var x=function(v){return L+(Math.log10(v)-lmin)/(lmax-lmin)*(R-L);};
  var s='';
  [0.01,0.1,1,10,100,1000,10000].forEach(function(v){
    s+=line(x(v),T-8,x(v),T+FORCES.length*rowH,{c:"var(--line)",w:1});
    s+=txt(x(v),T+FORCES.length*rowH+16,v>=1?fmt(v,0):fmt(v,2),{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true});
  });
  s+=txt((L+R)/2,T+FORCES.length*rowH+34,"energie interakce [kJ·mol⁻¹] — logaritmická osa",{anchor:"middle",size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.06em;text-transform:uppercase"});
  FORCES.forEach(function(f,i){
    var y=T+i*rowH+8, strong=i<3;
    s+=txt(L-10,y+16,f.n,{anchor:"end",size:12,w:600,fill:"var(--ink)"});
    s+=rect(x(f.lo),y,x(f.hi)-x(f.lo),22,{fill:f.c,r:6,style:"fill-opacity:.85;"});
    s+=txt(x(f.hi)+8,y+15,fmt(f.lo,f.lo<1?2:0)+"–"+fmt(f.hi,0),{size:11,w:600,fill:f.c,mono:true});
    s+=txt(x(f.hi)+8,y+27,f.ex,{size:9.5,fill:"var(--ink-3)"});
    if(i===2){ s+=line(L-180,y+34,R+190,y+34,{c:"var(--line-strong)",w:1,dash:"4 4"}); }
  });
  s+=txt(L-180,T+2*rowH+48,"SILNÉ ↑ · SLABÉ ↓",{size:10,w:700,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  $("#forceWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Síla interakcí na logaritmické ose"');
}

/* ============================================================
   22 · TRENAŽÉR — která interakce převládá
   ============================================================ */
var fdSet=[], fdI=0, fdScore=0, fdAnswered=false;
function fdNewSet(){
  var idx=FDRILL.map(function(_,i){return i;});
  for(var i=idx.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=idx[i]; idx[i]=idx[j]; idx[j]=t; }
  fdSet=idx.slice(0,10); fdI=0; fdScore=0;
}
function drawFD(){
  var it=FDRILL[fdSet[fdI]];
  $("#fdQn").textContent=fdI+1; $("#fdQtot").textContent=fdSet.length; $("#fdScore").textContent=fdScore;
  $("#fdPair").innerHTML='<span class="chem" style="font-size:1.15rem">'+it.p+'</span>';
  var ex=$("#fdExplain"); ex.style.display="none"; ex.className="explain";
  $("#fdNext").disabled=true;
  $$("#k8 [data-fd]").forEach(function(b){ b.disabled=false; b.style.opacity=""; });
  fdAnswered=false;
}
function initFD(){
  fdNewSet();
  $$("#k8 [data-fd]").forEach(function(b){
    b.addEventListener("click",function(){
      if(fdAnswered) return;
      fdAnswered=true;
      var it=FDRILL[fdSet[fdI]], ok=b.dataset.fd===it.a;
      if(ok) fdScore++;
      $("#fdScore").textContent=fdScore;
      var ex=$("#fdExplain"); ex.className="explain"; ex.style.display="flex";
      ex.style.background = ok?"var(--ok-soft)":"var(--bad-soft)"; ex.style.borderColor = ok?"var(--ok)":"var(--bad)";
      ex.innerHTML='<span class="verdict" style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+(ok?"✓ Správně":"✕ Špatně — správně je "+FNAMES[it.a])+'</span><span class="eyebrow">Proč</span><div>'+it.e+'</div>';
      $$("#k8 [data-fd]").forEach(function(x){ x.disabled=true; x.style.opacity=x.dataset.fd===it.a?"1":".5"; });
      $("#fdNext").disabled = fdI>=fdSet.length-1;
      if(fdI>=fdSet.length-1){
        toast("Trenažér dokončen: "+fdScore+" z "+fdSet.length+" správně.");
        if(fdScore>=7) markDone("k8");
      }
    });
  });
  $("#fdNext").addEventListener("click",function(){ if(fdI<fdSet.length-1){ fdI++; drawFD(); } });
  $("#fdRestart").addEventListener("click",function(){ fdNewSet(); drawFD(); toast("Nová sada 10 dvojic."); });
  drawFD();
}

/* ============================================================
   23 · TEPLOTY VARU HYDRIDŮ
   ============================================================ */
var bpKey="17";
function drawBP(){
  var g=BP[bpKey], W=760,H=330, L=80,R=700,T=36,B=270;
  var ymin=-280,ymax=120;
  var x=function(i){return L+(R-L)*(i+0.5)/4;}, y=function(v){return B-(v-ymin)/(ymax-ymin)*(B-T);};
  var s='';
  for(var v=-250;v<=100;v+=50){ s+=line(L,y(v),R,y(v),{c:v===0?"var(--line-strong)":"var(--line)",w:v===0?1.6:1}); s+=txt(L-8,y(v)+4,v,{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true}); }
  s+=txt(L-8,T-14,"b.v. [°C]",{anchor:"end",size:10.5,w:600,fill:"var(--ink-3)"});
  /* trend z bodů 2–4 zpět na první */
  var r=g.rows;
  if(g.hb){
    var x1=1,x2=3, y1=r[1][1], y2=r[3][1], slope=(y2-y1)/(x2-x1), y0p=y1-slope;
    s+=line(x(0),y(y0p),x(3),y(r[3][1]),{c:"var(--line-strong)",w:2,dash:"6 5"});
    s+=circ(x(0),y(y0p),6,{fill:"none",stroke:"var(--ink-3)",sw:2,style:"stroke-dasharray:3 3;"});
    s+=txt(x(0)+12,y(y0p)+4,"„patřil by“ sem: ≈ "+fmt(y0p,0)+" °C",{size:11,w:600,fill:"var(--ink-3)"});
    s+=arrow(x(0),y(y0p)-10,x(0),y(r[0][1])+12,{c:"var(--accent)",w:2.5,ah:9});
    s+=txt(x(0)-12,(y(y0p)+y(r[0][1]))/2+4,"+"+fmt(r[0][1]-y0p,0)+" °C",{anchor:"end",size:12,w:700,fill:"var(--accent)",mono:true});
  }
  var pts=r.map(function(p,i){return x(i)+","+y(p[1]);}).join(" ");
  s+='<polyline points="'+pts+'" style="fill:none;stroke:var(--cat2);stroke-width:2.5;stroke-linejoin:round"/>';
  r.forEach(function(p,i){
    var hb=(p[0]===g.hb);
    s+=circ(x(i),y(p[1]),hb?9:6.5,{fill:hb?"var(--accent)":"var(--cat2)",stroke:"var(--surface)",sw:2});
    s+=txt(x(i),y(p[1])-16,p[0],{anchor:"middle",size:13,w:700,fill:hb?"var(--accent)":"var(--ink)"});
    s+=txt(x(i),y(p[1])+(p[1]>-100?26:-30),fmt(p[1],1)+" °C",{anchor:"middle",size:11,w:600,fill:hb?"var(--accent)":"var(--ink-2)",mono:true});
    s+=txt(x(i),B+18,(i+2)+". perioda",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  });
  s+=txt(L,T-14,g.lab,{size:13,w:700,fill:"var(--ink)"});
  $("#bpWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Teploty varu — '+g.lab+'"');
  $$("#bpGroup button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===bpKey); });
  $("#bpNote").innerHTML=g.note+(g.hb?" Přepněte na 14. skupinu a&nbsp;uvidíte, jak vypadá řada <b>bez</b> anomálie.":" Porovnejte s&nbsp;16. skupinou — tam první člen vybočuje o&nbsp;180 °C.");
}
function initBP(){ $$("#bpGroup button").forEach(function(b){ b.addEventListener("click",function(){ bpKey=b.dataset.v; drawBP(); }); }); }

/* ============================================================
   24 · VODÍKOVÉ MŮSTKY V PRAXI — čtyři scény
   ============================================================ */
var hbScene="voda";
function water(x,y,ang,o){ /* molekula vody: O + 2 H, natočená o ang */
  o=o||{}; var rad=Math.PI/180, s='';
  var h1=[x+Math.cos((ang-52)*rad)*20, y+Math.sin((ang-52)*rad)*20], h2=[x+Math.cos((ang+52)*rad)*20, y+Math.sin((ang+52)*rad)*20];
  s+=line(x,y,h1[0],h1[1],{c:"var(--ink-2)",w:2}); s+=line(x,y,h2[0],h2[1],{c:"var(--ink-2)",w:2});
  s+=circ(x,y,10,{fill:"var(--endo)"}); s+=circ(h1[0],h1[1],6,{fill:"var(--surface)",stroke:"var(--ink-2)",sw:1.5}); s+=circ(h2[0],h2[1],6,{fill:"var(--surface)",stroke:"var(--ink-2)",sw:1.5});
  if(o.lab){ s+=txt(x,y+4,"O",{anchor:"middle",size:10,w:700,fill:"var(--paper)"}); }
  return s;
}
function hexagon(cx,cy,r,o){
  o=o||{}; var pts=[]; for(var i=0;i<6;i++){ var a=(i*60+30)*Math.PI/180; pts.push((cx+Math.cos(a)*r).toFixed(1)+","+(cy+Math.sin(a)*r).toFixed(1)); }
  return '<polygon points="'+pts.join(" ")+'" style="fill:'+(o.fill||"none")+';stroke:'+(o.stroke||"var(--ink-2)")+';stroke-width:'+(o.sw||2)+';stroke-linejoin:round"/>';
}
function drawHB(){
  var W=760,H=320, s='', k=hbScene;
  if(k==="voda"){
    /* vlevo: molekula se 4 sousedy */
    var cx=200, cy=160;
    var nb=[[cx-78,cy-70,45],[cx+78,cy-70,135],[cx-78,cy+70,-45],[cx+78,cy+70,225]];
    nb.forEach(function(n){ s+=line(cx,cy,n[0],n[1],{c:"var(--accent)",w:2,dash:"6 4"}); });
    s+=water(cx,cy,90,{lab:true});
    nb.forEach(function(n){ s+=water(n[0],n[1],n[2]); });
    s+=txt(cx,cy+118,"1 molekula = až 4 můstky (2 přes H, 2 přes volné páry)",{anchor:"middle",size:11,w:600,fill:"var(--ink-2)"});
    s+=txt(cx,44,"KAPALNÁ VODA · TETRAEDRICKÁ SÍŤ",{anchor:"middle",size:10.5,w:700,fill:"var(--accent)",style:"letter-spacing:.08em"});
    /* vpravo: led — šestiúhelníky s dutinami */
    var lx=560, ly=150;
    s+=txt(lx,44,"LED · PRAVIDELNÁ, ALE ŘÍDKÁ SÍŤ",{anchor:"middle",size:10.5,w:700,fill:"var(--endo)",style:"letter-spacing:.08em"});
    [[lx-70,ly-40],[lx+70,ly-40],[lx,ly+80],[lx,ly-160+120]].forEach(function(c,i){ if(i<3) s+=hexagon(c[0],c[1],46,{stroke:"var(--accent)",sw:1.6}); });
    [[lx-70,ly-40],[lx+70,ly-40],[lx,ly+80]].forEach(function(c){
      for(var i=0;i<6;i++){ var a=(i*60+30)*Math.PI/180; s+=circ(c[0]+Math.cos(a)*46,c[1]+Math.sin(a)*46,7,{fill:"var(--endo)"}); }
    });
    s+=txt(lx,ly+150,"dutiny → hustota 0,917 g/cm³ → led plave",{anchor:"middle",size:11,w:600,fill:"var(--ink-2)"});
    s+=txt(lx,ly+22,"dutina",{anchor:"middle",size:10,fill:"var(--ink-3)"});
  } else if(k==="dna"){
    var xL=180, xR=580, top=50, gap=52;
    s+=rect(xL-14,top-10,28,gap*4+20,{fill:"var(--cat2)",r:10,style:"fill-opacity:.35;"});
    s+=rect(xR-14,top-10,28,gap*4+20,{fill:"var(--cat2)",r:10,style:"fill-opacity:.35;"});
    s+=txt(xL,top-20,"cukr–fosfátová páteř (kovalentní)",{anchor:"middle",size:10,fill:"var(--ink-3)"});
    s+=txt(xR,top-20,"cukr–fosfátová páteř (kovalentní)",{anchor:"middle",size:10,fill:"var(--ink-3)"});
    var pairs=[["A","T",2],["G","C",3],["T","A",2],["C","G",3],["G","C",3]];
    pairs.forEach(function(p,i){
      var y=top+i*gap+8;
      s+=rect(xL+14,y-14,150,28,{fill:"var(--surface-2)",r:6,stroke:"var(--line-strong)",sw:1});
      s+=rect(xR-164,y-14,150,28,{fill:"var(--surface-2)",r:6,stroke:"var(--line-strong)",sw:1});
      s+=txt(xL+89,y+5,p[0],{anchor:"middle",size:15,w:700,fill:"var(--ink)"});
      s+=txt(xR-89,y+5,p[1],{anchor:"middle",size:15,w:700,fill:"var(--ink)"});
      for(var j=0;j<p[2];j++){ var yy=y+(j-(p[2]-1)/2)*8; s+=line(xL+166,yy,xR-166,yy,{c:"var(--accent)",w:2,dash:"6 4"}); }
      s+=txt(380,y-16,p[2]+" můstky",{anchor:"middle",size:10,w:600,fill:"var(--accent)"});
    });
    s+=txt(380,H-14,"A=T dva můstky · G≡C tři můstky → komplementarita; slabé dost na rozpletení, početné dost na držení",{anchor:"middle",size:11,w:600,fill:"var(--ink-2)"});
  } else if(k==="bilk"){
    /* α-helix: sinusovka */
    var ax=60, ay=160, pts=[];
    for(var t=0;t<=300;t+=4){ pts.push((ax+t).toFixed(1)+","+(ay+Math.sin(t/300*Math.PI*6)*40).toFixed(1)); }
    s+='<polyline points="'+pts.join(" ")+'" style="fill:none;stroke:var(--ink-2);stroke-width:3;stroke-linejoin:round"/>';
    for(var i=0;i<5;i++){ var xx=ax+25+i*50; s+=line(xx,ay-40,xx+50,ay-40,{c:"var(--accent)",w:2,dash:"5 4"}); s+=line(xx+25,ay+40,xx+75,ay+40,{c:"var(--accent)",w:2,dash:"5 4"}); }
    s+=txt(ax+150,60,"α-HELIX",{anchor:"middle",size:11,w:700,fill:"var(--accent)",style:"letter-spacing:.1em"});
    s+=txt(ax+150,78,"můstky N–H···O=C mezi závity (každý 4. zbytek)",{anchor:"middle",size:10.5,fill:"var(--ink-2)"});
    s+=txt(ax+150,ay+70,"vlasy (keratin), svaly",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
    /* β-list: dva cik-cak řetězce */
    var bx=430, by1=120, by2=200, zp=function(y){ var p=[]; for(var t=0;t<=280;t+=20){ p.push((bx+t)+","+(y+(t/20%2?12:-12))); } return p.join(" "); };
    s+='<polyline points="'+zp(by1)+'" style="fill:none;stroke:var(--ink-2);stroke-width:3;stroke-linejoin:round"/>';
    s+='<polyline points="'+zp(by2)+'" style="fill:none;stroke:var(--ink-2);stroke-width:3;stroke-linejoin:round"/>';
    for(var t2=20;t2<=260;t2+=40){ s+=line(bx+t2,by1+12,bx+t2,by2-12,{c:"var(--accent)",w:2,dash:"5 4"}); }
    s+=txt(bx+140,60,"β-SKLÁDANÝ LIST",{anchor:"middle",size:11,w:700,fill:"var(--accent)",style:"letter-spacing:.1em"});
    s+=txt(bx+140,78,"můstky mezi sousedními úseky řetězce",{anchor:"middle",size:10.5,fill:"var(--ink-2)"});
    s+=txt(bx+140,by2+50,"hedvábí, β-amyloid",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
    s+=txt(W/2,H-14,"Teplo, kyselina, alkohol → můstky se rozruší → DENATURACE (řetězec se rozbalí, peptidové vazby zůstanou)",{anchor:"middle",size:11,w:600,fill:"var(--bad)"});
  } else {
    /* grafit: dvě vrstvy hexagonů */
    var gx=200, gy=100;
    s+=txt(gx,40,"GRAFIT · VRSTVY",{anchor:"middle",size:11,w:700,fill:"var(--cat2)",style:"letter-spacing:.1em"});
    [0,1].forEach(function(layer){
      var yy=gy+layer*90, off=layer?26:0;
      for(var i=0;i<4;i++){ s+=hexagon(gx-90+i*52+off,yy,30,{stroke:"var(--ink-2)",sw:2}); }
      s+=txt(gx+140,yy+4,layer?"":"kovalentní C–C 142 pm",{size:10,fill:"var(--ink-3)"});
    });
    for(var i2=0;i2<5;i2++){ s+=line(gx-100+i2*50,gy+30,gx-100+i2*50+26,gy+60,{c:"var(--cat2)",w:2,dash:"2 4"}); }
    s+=txt(gx,gy+40,"335 pm · jen disperzní síly",{anchor:"middle",size:10.5,w:600,fill:"var(--cat2)"});
    s+=txt(gx,gy+140,"vrstvy kloužou → měkký, píše, maže · π elektrony → vede",{anchor:"middle",size:11,w:600,fill:"var(--ink-2)"});
    /* diamant: tetraedrická síť */
    var dx=560, dy=150;
    s+=txt(dx,40,"DIAMANT · 3D SÍŤ",{anchor:"middle",size:11,w:700,fill:"var(--cat1)",style:"letter-spacing:.1em"});
    var nodes=[[dx,dy],[dx-70,dy-50],[dx+70,dy-50],[dx-40,dy+60],[dx+40,dy+60],[dx-130,dy-20],[dx+130,dy-20],[dx-100,dy+100],[dx+100,dy+100],[dx,dy-110]];
    var edges=[[0,1],[0,2],[0,3],[0,4],[1,5],[1,9],[2,6],[2,9],[3,7],[4,8],[3,4],[5,7],[6,8]];
    edges.forEach(function(e){ s+=line(nodes[e[0]][0],nodes[e[0]][1],nodes[e[1]][0],nodes[e[1]][1],{c:"var(--ink-2)",w:2.4}); });
    nodes.forEach(function(n){ s+=circ(n[0],n[1],8,{fill:"var(--cat1)"}); });
    s+=txt(dx,dy+140,"každý C 4 vazby, sp³ → nejtvrdší, nevodič, 3550 °C",{anchor:"middle",size:11,w:600,fill:"var(--ink-2)"});
  }
  $("#hbWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="'+HBSCENES[k].t+'"');
  $$("#hbScene button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===k); });
  $("#hbTitle").textContent=HBSCENES[k].t;
  $("#hbText").innerHTML=HBSCENES[k].pts.map(function(p){return '<p>'+p+'</p>';}).join("");
}
function initHB(){ $$("#hbScene button").forEach(function(b){ b.addEventListener("click",function(){ hbScene=b.dataset.v; drawHB(); }); }); }

/* ============================================================
   25 · RYCHLOPRŮCHOD — tři kompaktní grafy
   ============================================================ */
function drawMiniTree(){
  var W=760,H=250, s='';
  function box(x,y,w,h,t,c,sub){
    var r='';
    r+=rect(x-w/2,y-h/2,w,h,{fill:c||"var(--surface-2)",r:8,stroke:"var(--line-strong)",sw:1,style:c?"fill-opacity:.18;":""});
    r+=txt(x,y+(sub?-2:5),t,{anchor:"middle",size:12,w:700,fill:"var(--ink)"});
    if(sub) r+=txt(x,y+13,sub,{anchor:"middle",size:9.5,fill:"var(--ink-3)"});
    return r;
  }
  s+=box(380,26,300,32,"INTERAKCE MEZI ČÁSTICEMI");
  s+=line(380,42,380,60,{c:"var(--line-strong)",w:1.5}); s+=line(190,60,570,60,{c:"var(--line-strong)",w:1.5});
  s+=line(190,60,190,78,{c:"var(--line-strong)",w:1.5}); s+=line(570,60,570,78,{c:"var(--line-strong)",w:1.5});
  s+=box(190,96,300,36,"SILNÉ = chemické vazby","var(--accent)","150–4000 kJ·mol⁻¹ · mění látku");
  s+=box(570,96,300,36,"SLABÉ = mezimolekulové","var(--endo)","0,05–40 kJ·mol⁻¹ · mění jen chování");
  /* levá větev */
  s+=line(190,114,190,132,{c:"var(--line-strong)",w:1.5}); s+=line(70,132,310,132,{c:"var(--line-strong)",w:1.5});
  [[70,"kovová","var(--cat3)","e⁻ všem"],[190,"iontová","var(--cat4)","e⁻ jednomu"],[310,"kovalentní","var(--cat1)","e⁻ dvěma"]].forEach(function(b){
    s+=line(b[0],132,b[0],150,{c:"var(--line-strong)",w:1.5});
    s+=box(b[0],168,112,36,b[1],b[2],b[3]);
  });
  s+=line(310,186,310,204,{c:"var(--line-strong)",w:1.5}); s+=line(250,204,370,204,{c:"var(--line-strong)",w:1.5});
  s+=line(250,204,250,214,{c:"var(--line-strong)",w:1.5}); s+=line(370,204,370,214,{c:"var(--line-strong)",w:1.5});
  s+=txt(250,232,"σ / π · nepolární / polární",{anchor:"middle",size:9.5,fill:"var(--ink-3)"});
  s+=txt(370,232,"dativní · násobnost",{anchor:"middle",size:9.5,fill:"var(--ink-3)"});
  /* pravá větev */
  s+=line(570,114,570,132,{c:"var(--line-strong)",w:1.5}); s+=line(470,132,670,132,{c:"var(--line-strong)",w:1.5});
  s+=line(470,132,470,150,{c:"var(--line-strong)",w:1.5}); s+=line(670,132,670,150,{c:"var(--line-strong)",w:1.5});
  s+=box(470,168,170,36,"van der Waalsovy","var(--cat2)","ion–ion · ion–dipól · dipól–dipól · disperzní");
  s+=box(670,168,150,36,"vodíková vazba","var(--accent)","X–H···Y, X,Y = F, O, N");
  s+=txt(470,212,"disperzní síly působí mezi VŠEMI částicemi",{anchor:"middle",size:9.5,fill:"var(--ink-3)"});
  s+=txt(670,212,"10–40 kJ·mol⁻¹ · voda, DNA, bílkoviny",{anchor:"middle",size:9.5,fill:"var(--ink-3)"});
  $("#miniTreeWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Členění interakcí mezi částicemi"');
}
function drawMiniMult(){
  var W=760,H=260, rows=[["C–C",154,348,"1 σ"],["C=C",134,614,"σ + π"],["C≡C",120,839,"σ + 2 π"]];
  var L=120,R=640,T=40,B=200, gw=(R-L)/3, s='';
  var yL=function(v){return B-(v/170)*(B-T);}, yE=function(v){return B-(v/1100)*(B-T);};
  s+=txt(L,T-16,"DÉLKA (pm) ↓ · ENERGIE (kJ/mol) ↑ · ALE NE ÚMĚRNĚ",{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  rows.forEach(function(r,i){
    var x=L+gw*i+gw/2;
    s+=rect(x-52,yL(r[1]),44,B-yL(r[1]),{fill:"var(--cat1)",r:4}); s+=txt(x-30,yL(r[1])-6,r[1]+" pm",{anchor:"middle",size:11,w:600,fill:"var(--cat1)",mono:true});
    s+=rect(x+8,yE(r[2]),44,B-yE(r[2]),{fill:"var(--accent)",r:4}); s+=txt(x+30,yE(r[2])-6,r[2],{anchor:"middle",size:11,w:600,fill:"var(--accent)",mono:true});
    if(i>0){ s+=line(x+8,yE(348*(i+1)),x+52,yE(348*(i+1)),{c:"var(--line-strong)",w:2,dash:"5 4"}); s+=txt(x+58,yE(348*(i+1))+4,"×"+(i+1)+" = "+(348*(i+1)),{size:10,fill:"var(--ink-3)",mono:true}); }
    s+=txt(x,B+20,r[0],{anchor:"middle",size:14,w:700,fill:"var(--ink)"}); s+=txt(x,B+36,r[3],{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  });
  s+=line(L,B,R,B,{c:"var(--line-strong)",w:1.5});
  s+=txt(R,B+36,"π ≈ 266 · 2. π ≈ 225 (každá slabší než σ 348)",{anchor:"end",size:10.5,w:600,fill:"var(--exo)"});
  $("#miniMultWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Délka a energie vazby C–C podle násobnosti"');
}
function drawMiniForce(){
  var W=760,H=280, L=200,R=600,T=34,rowH=34;
  var lmin=Math.log10(0.01), lmax=Math.log10(10000);
  var x=function(v){return L+(Math.log10(v)-lmin)/(lmax-lmin)*(R-L);};
  var s='';
  [0.01,0.1,1,10,100,1000,10000].forEach(function(v){ s+=line(x(v),T-6,x(v),T+FORCES.length*rowH-6,{c:"var(--line)",w:1}); s+=txt(x(v),T+FORCES.length*rowH+8,v>=1?fmt(v,0):fmt(v,2),{anchor:"middle",size:10,fill:"var(--ink-3)",mono:true}); });
  FORCES.forEach(function(f,i){
    var y=T+i*rowH;
    s+=txt(L-10,y+14,f.n,{anchor:"end",size:11.5,w:600,fill:"var(--ink)"});
    s+=rect(x(f.lo),y,x(f.hi)-x(f.lo),20,{fill:f.c,r:5,style:"fill-opacity:.85;"});
    s+=txt(x(f.hi)+8,y+14,fmt(f.lo,f.lo<1?2:0)+"–"+fmt(f.hi,0),{size:10.5,w:600,fill:f.c,mono:true});
  });
  s+=txt((L+R)/2,H-6,"kJ·mol⁻¹ (logaritmická osa) — rozpětí 100 000×",{anchor:"middle",size:10.5,w:600,fill:"var(--ink-3)"});
  $("#miniForceWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Síla interakcí — přehled"');
}
