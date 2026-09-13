/* ============================================================
   15 · NERNST — Daniellův článek (k4)
   ============================================================ */
var nrState={lCu:0,lZn:0}; /* log10 koncentrací (posuvník ×10) */
function fmtC(l){ var c=Math.pow(10,l); return c>=0.1?fmt(c,1):(c>=0.01?fmt(c,2):fmt(c,3)); }
function drawNernst(){
  var lCu=nrState.lCu, lZn=nrState.lZn, logQ=lZn-lCu, E0=1.10, E=E0-NERNST/2*logQ;
  $("#nrCuV").textContent=fmtC(lCu)+" mol·dm⁻³"; $("#nrZnV").textContent=fmtC(lZn)+" mol·dm⁻³";
  var W=760,H=300,L=70,R=700,T0=30,B=240;
  var qmin=-6,qmax=6, Emin=0.85, Emax=1.35;
  var x=function(q){ return L+(q-qmin)/(qmax-qmin)*(R-L); };
  var y=function(e){ return B-(e-Emin)/(Emax-Emin)*(B-T0); };
  var s='';
  for(var q=qmin;q<=qmax;q+=2){ s+=line(x(q),T0,x(q),B,{c:"var(--line)",w:1}); s+=txt(x(q),B+18,q,{anchor:"middle",size:11,fill:"var(--ink-3)",mono:true}); }
  for(var e=0.9;e<=1.31;e+=0.1){ s+=line(L,y(e),R,y(e),{c:"var(--line)",w:1}); s+=txt(L-8,y(e)+4,fmt(e,2),{anchor:"end",size:11,fill:"var(--ink-3)",mono:true}); }
  s+=line(L,y(E0),R,y(E0),{c:"var(--line-strong)",w:1.5,dash:"5 4"});
  s+=txt(R-4,y(E0)-7,"E° = 1,10 V (Q = 1)",{anchor:"end",size:11,w:600,fill:"var(--ink-3)"});
  s+='<polyline points="'+x(qmin)+','+y(E0-NERNST/2*qmin)+' '+x(qmax)+','+y(E0-NERNST/2*qmax)+'" style="fill:none;stroke:var(--accent);stroke-width:2.5;stroke-linecap:round"/>';
  s+=txt(x(qmax)-6,y(E0-NERNST/2*qmax)+18,"sklon −0,0296 V na řád (z = 2)",{anchor:"end",size:11,w:600,fill:"var(--accent)"});
  /* rovnováha mimo graf */
  s+=txt(x(qmax),T0-10,"→ rovnováha E = 0 při log Q = 37",{anchor:"end",size:10.5,fill:"var(--ink-3)"});
  var qc=Math.max(qmin,Math.min(qmax,logQ));
  s+=line(x(qc),T0,x(qc),B,{c:"var(--ink)",w:1.2,dash:"4 4"});
  s+='<circle cx="'+x(qc)+'" cy="'+y(E)+'" r="7" style="fill:var(--accent);stroke:var(--surface);stroke-width:2.5"/>';
  s+=rect(x(qc)+(qc>3?-118:10),y(E)-26,108,20,{fill:"var(--ink)",r:5});
  s+=txt(x(qc)+(qc>3?-64:64),y(E)-12,"E = "+fmt(E,3)+" V",{anchor:"middle",size:11.5,w:600,fill:"var(--paper)",mono:true});
  s+=txt((L+R)/2,B+38,"log Q = log ([Zn²⁺]/[Cu²⁺])",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
  s+=txt(20,(T0+B)/2,"E článku [V]",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:20px "+((T0+B)/2)+"px;letter-spacing:.06em"});
  $("#nrWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Nernstova rovnice pro Daniellův článek"');
  function ro(id,k,v,h,cls){ var el=$(id); el.className="readout "+(cls||""); el.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#nrRo1","Q = [Zn²⁺]/[Cu²⁺]",fmtK(logQ),"log Q = "+fmt(logQ,1),"");
  ro("#nrRo2","Nernstův člen",sgn(-NERNST/2*logQ,3)+" V","−0,0296 · log Q",logQ>0?"neg":(logQ<0?"pos":""));
  ro("#nrRo3","E článku",fmt(E,3)+" V",E>E0?"vyšší než E°":(E<E0?"nižší než E°":"= E°"),E>=E0?"pos":"neg");
  $("#nrEq").innerHTML='<span class="q">E</span> = 1,10 − (0,0592/2) · log('+fmtC(lZn)+' / '+fmtC(lCu)+') = 1,10 − 0,0296 · ('+fmt(logQ,1)+') = <b>'+fmt(E,3)+' V</b>';
}
function initNernst(){
  $("#nrCu").addEventListener("input",function(){ nrState.lCu=+this.value/10; drawNernst(); });
  $("#nrZn").addEventListener("input",function(){ nrState.lZn=+this.value/10; drawNernst(); });
  drawNernst();
}

/* ============================================================
   16 · KONCENTRAČNÍ ČLÁNEK (k4)
   ============================================================ */
var ccState={m:"Ag",l1:-2,l2:0};
function drawConc(){
  var e=E_(ccState.m), z=e.z, c1=Math.pow(10,ccState.l1), c2=Math.pow(10,ccState.l2);
  $("#ccC1V").textContent=fmtC(ccState.l1)+" mol·dm⁻³"; $("#ccC2V").textContent=fmtC(ccState.l2)+" mol·dm⁻³";
  var E1=e.E+NERNST/z*ccState.l1, E2=e.E+NERNST/z*ccState.l2;
  var E=Math.abs(E2-E1), anodeLeft = E1<E2, same=ccState.l1===ccState.l2;
  function ro(id,k,v,h,cls){ var el=$(id); el.className="readout "+(cls||""); el.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#ccRo1","E levé elektrody",fmt(E1,3)+" V",e.pair+": "+sgn(e.E,2)+" + 0,0592/"+z+"·log c",same?"":(anodeLeft?"neg":"pos"));
  ro("#ccRo2","E pravé elektrody",fmt(E2,3)+" V",same?"stejné jako vlevo":(anodeLeft?"katoda (+), redukce":"anoda (−), oxidace"),same?"":(anodeLeft?"pos":"neg"));
  ro("#ccRo3","Napětí článku",fmt(E,3)+" V",same?"stejné koncentrace → 0 V":("= 0,0592/"+z+" · log("+fmtC(Math.max(ccState.l1,ccState.l2))+"/"+fmtC(Math.min(ccState.l1,ccState.l2))+")"),"pos");
  var lo=Math.min(ccState.l1,ccState.l2), hi=Math.max(ccState.l1,ccState.l2);
  $("#ccEq").innerHTML=same ? '<span class="q">E</span> = 0 — koncentrační článek se stejnými koncentracemi nedává nic.' :
    '<span class="q">E</span> = (0,0592/'+z+') · log('+fmtC(hi)+' / '+fmtC(lo)+') = (0,0592/'+z+') · '+fmt(hi-lo,1)+' = <b>'+fmt(E,3)+' V</b>';
  $("#ccNote").innerHTML = same ? "Posuňte jeden z posuvníků. Napětí vznikne teprve rozdílem koncentrací."
    : "<b>Anoda je elektroda ve zředěnějším roztoku</b> ("+(anodeLeft?"levá":"pravá")+"): tam se kov rozpouští a doplňuje chybějící ionty; v koncentrovanějším roztoku se kov vylučuje. Každý řád rozdílu koncentrací dá "+fmt(NERNST/z*1000,0)+" mV — u "+e.el+" je z = "+z+". Zkuste přepnout na hliník (z = 3): stejný rozdíl koncentrací dá jen třetinové napětí.";
}
function initConc(){
  $("#ccMet").addEventListener("change",function(){ ccState.m=this.value; drawConc(); });
  $("#ccC1").addEventListener("input",function(){ ccState.l1=+this.value/10; drawConc(); });
  $("#ccC2").addEventListener("input",function(){ ccState.l2=+this.value/10; drawConc(); });
  drawConc();
}

/* ============================================================
   17 · POTENCIÁL vs pH (k4)
   ============================================================ */
var phState={pH:0,sys:"Mn"};
var PHSYS={
  H:{lab:"2 H⁺/H₂",c:"var(--endo)",f:function(p){return 0-NERNST*p;},eq:"E = 0 − 0,0592·pH"},
  O:{lab:"O₂/H₂O",c:"var(--cat3)",f:function(p){return 1.23-NERNST*p;},eq:"E = 1,23 − 0,0592·pH"},
  Mn:{lab:"MnO₄⁻/Mn²⁺",c:"var(--accent)",f:function(p){return 1.51-NERNST*8/5*p;},eq:"E = 1,51 − (8/5)·0,0592·pH = 1,51 − 0,0947·pH"}
};
function drawPH(){
  var p=phState.pH, sysK=phState.sys, sys=PHSYS[sysK];
  $("#phV").textContent="pH "+fmt(p,1);
  $$("#phSys button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===sysK); });
  var W=760,H=330,L=70,R=700,T0=28,B=270, Emin=-0.9, Emax=1.6;
  var x=function(v){ return L+v/14*(R-L); };
  var y=function(e){ return B-(e-Emin)/(Emax-Emin)*(B-T0); };
  var s='';
  for(var i=0;i<=14;i+=2){ s+=line(x(i),T0,x(i),B,{c:"var(--line)",w:1}); s+=txt(x(i),B+18,i,{anchor:"middle",size:11,fill:"var(--ink-3)",mono:true}); }
  for(var e=-0.8;e<=1.61;e+=0.4){ s+=line(L,y(e),R,y(e),{c:"var(--line)",w:1}); s+=txt(L-8,y(e)+4,fmt(e,1),{anchor:"end",size:11,fill:"var(--ink-3)",mono:true}); }
  s+=line(L,y(0),R,y(0),{c:"var(--line-strong)",w:1.5});
  /* referenční čáry */
  [[1.36,"Cl₂/Cl⁻ 1,36"],[1.07,"Br₂/Br⁻ 1,07"],[0.54,"I₂/I⁻ 0,54"]].forEach(function(r){
    s+=line(L,y(r[0]),R,y(r[0]),{c:"var(--ink-3)",w:1,dash:"3 4"});
    s+=txt(R-4,y(r[0])-5,r[1],{anchor:"end",size:10.5,fill:"var(--ink-3)"});
  });
  /* pásmo stability vody */
  s+='<polygon points="'+x(0)+','+y(PHSYS.H.f(0))+' '+x(14)+','+y(PHSYS.H.f(14))+' '+x(14)+','+y(PHSYS.O.f(14))+' '+x(0)+','+y(PHSYS.O.f(0))+'" style="fill:var(--endo);fill-opacity:.07"/>';
  s+=txt(x(7),y((PHSYS.H.f(7)+PHSYS.O.f(7))/2)+4,"voda je stabilní",{anchor:"middle",size:11,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
  Object.keys(PHSYS).forEach(function(k){
    var ss=PHSYS[k];
    s+='<polyline points="'+x(0)+','+y(ss.f(0))+' '+x(14)+','+y(ss.f(14))+'" style="fill:none;stroke:'+ss.c+';stroke-width:'+(k===sysK?3:1.8)+';stroke-linecap:round;'+(k===sysK?"":"stroke-opacity:.7")+'"/>';
    s+=txt(x(14)+6,y(ss.f(14))+4,ss.lab,{size:11,w:600,fill:ss.c});
  });
  var E=sys.f(p);
  s+=line(x(p),T0,x(p),B,{c:"var(--ink)",w:1.2,dash:"4 4"});
  s+='<circle cx="'+x(p)+'" cy="'+y(E)+'" r="7" style="fill:'+sys.c+';stroke:var(--surface);stroke-width:2.5"/>';
  s+=rect(x(p)+(p>9?-112:10),y(E)-28,102,20,{fill:"var(--ink)",r:5});
  s+=txt(x(p)+(p>9?-61:61),y(E)-14,fmt(E,2)+" V",{anchor:"middle",size:11.5,w:600,fill:"var(--paper)",mono:true});
  s+=txt((L+R)/2,B+38,"pH",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  s+=txt(20,(T0+B)/2,"E [V]",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:20px "+((T0+B)/2)+"px"});
  $("#phWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Závislost potenciálu na pH"');
  function ro(id,k,v,h,cls){ var el=$(id); el.className="readout "+(cls||""); el.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#phRo1",sys.lab+" při pH "+fmt(p,1),fmt(E,3)+" V",sys.eq,"");
  var canCl=E>1.36, canBr=E>1.07, canI=E>0.54;
  ro("#phRo2","Zoxiduje halogenid?",sysK==="H"?"—":(canCl?"Cl⁻, Br⁻, I⁻":(canBr?"Br⁻, I⁻":(canI?"jen I⁻":"žádný"))),sysK==="H"?"vodík není oxidační činidlo":"porovnání s 1,36 / 1,07 / 0,54 V","");
  ro("#phRo3","Změna na jednotku pH",fmt(-(sys.f(1)-sys.f(0))*1000,1)+" mV",sysK==="Mn"?"8 H⁺ na 5 e⁻ → 1,6 × 59 mV":"1 H⁺ na 1 e⁻ → 59 mV","");
  var notes={
    H:"Tohle je princip pH-metru: potenciál vodíkové (v praxi skleněné) elektrody klesá o 59 mV na jednotku pH. Při pH 7 je −0,41 V — proto může neutrální vodu redukovat jen kov s E° pod −0,41 V (sodík ano, zinek prakticky ne).",
    O:"Kyslík je při pH 0 silné oxidační činidlo (1,23 V), v zásaditém prostředí jen mírné (0,40 V při pH 14). Rozdíl mezi přímkou O₂ a H₂ je vždy 1,23 V — to je okno stability vody.",
    Mn:"Manganistan potřebuje 8 H⁺ na 5 elektronů, proto je jeho sklon 1,6× strmější než u vodíku. Nad pH ≈ 1,6 klesne pod Cl₂/Cl⁻ a chlorid už neoxiduje; nad pH ≈ 4,6 nezoxiduje ani bromid. Proto se manganometrie dělá v H₂SO₄, nikdy v HCl."
  };
  $("#phNote").innerHTML=notes[sysK];
}
function initPH(){
  $("#phSl").addEventListener("input",function(){ phState.pH=+this.value; drawPH(); });
  $$("#phSys button").forEach(function(b){ b.addEventListener("click",function(){ phState.sys=b.dataset.v; drawPH(); }); });
  drawPH();
}
