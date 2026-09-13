/* ============================================================
   21 · PRŮZKUMNÍK ELEKTROLÝZY (k6)
   ============================================================ */
var elId="nacl-aq";
var ELMAT={"nacl-melt":["C","Fe"],"nacl-aq":["Ti","Ni"],"nacl-hg":["C","Hg"],"water":["Pt","Pt"],"cuso4-inert":["C","C"],"cuso4-cu":["Cu","Cu"],"agno3":["Ag","předmět"],"ki":["C","C"],"al2o3":["C","C"],"znso4":["Zn","předmět"]};
function drawElx(){
  var x=EL_(elId), m=ELMAT[elId]||["","",""];
  $("#elWrap").innerHTML=drawElecSVG({an:x.an,cat:x.cat,prodA:x.prodA,prodC:x.prodC,ions:x.ions,elec:x.elec,anMat:m[0],catMat:m[1],W:560,H:330,title:"ELEKTROLÝZA · "+x.name.toUpperCase()});
  $("#elCat").innerHTML='<span style="color:var(--endo)">katoda (−), redukce:</span> <span class="chem">'+x.cat+'</span>';
  $("#elAn").innerHTML='<span style="color:var(--exo)">anoda (+), oxidace:</span> <span class="chem">'+x.an+'</span>';
  $("#elTot").innerHTML='celkem: <b><span class="chem">'+x.total+'</span></b>';
  $("#elWhy").innerHTML=x.why;
  $("#elNote").innerHTML="<b>Použití:</b> "+x.ind;
}
function initElx(){
  var sel=$("#elSel");
  sel.innerHTML=ELX.map(function(x){ return '<option value="'+x.id+'">'+x.name+'</option>'; }).join("");
  sel.value=elId;
  sel.addEventListener("change",function(){ elId=this.value; drawElx(); });
  drawElx();
}

/* ============================================================
   22 · FARADAYOVA KALKULAČKA (k6)
   ============================================================ */
var fdState={i:0,I:2.0,t:60};
function drawFaraday(){
  var m=FMET[fdState.i], I=fdState.I, t=fdState.t*60, Q=I*t, ne=Q/FCONST, n=ne/m.z, mass=n*m.M;
  var isGas = m.s==="H₂"||m.s==="O₂"||m.s==="Cl₂";
  $("#fdIV").textContent=fmt(I,1)+" A"; $("#fdTV").textContent=fmt(fdState.t,0)+" min";
  function ro(id,k,v,h){ var e=$(id); e.className="readout"; e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#fdRo1","Náboj Q = I·t",fmt(Q,0)+" C",fmt(I,1)+" A · "+fmt(t,0)+" s");
  ro("#fdRo2","Moly elektronů",fmt(ne,4)+" mol","Q / 96 485");
  ro("#fdRo3","Moly "+m.s+" (z = "+m.z+")",fmt(n,4)+" mol","n(e⁻) / "+m.z);
  ro("#fdRo4","Hmotnost",fmt(mass,mass<1?3:2)+" g",isGas?("≈ "+fmt(n*22.4,2)+" dm³ (n. p.)"):("M = "+fmt(m.M,2)+" g·mol⁻¹"));
  var tOneG = 1*m.z*FCONST/(m.M*I);
  $("#fdSteps").innerHTML=
    '<p class="eq" style="margin:0"><span class="chem">'+m.ion+' + '+(m.z===1?"":m.z+" ")+'e⁻ → '+m.s+'</span></p>'+
    '<p class="eq" style="margin:0"><span class="q">m</span> = <span class="q">M</span>·<span class="q">I</span>·<span class="q">t</span> / (<span class="q">z</span>·<span class="q">F</span>) = '+fmt(m.M,2)+' · '+fmt(I,1)+' · '+fmt(t,0)+' / ('+m.z+' · 96 485) = <b>'+fmt(mass,3)+' g</b></p>'+
    '<p class="eq" style="margin:0;border-left-color:var(--endo)">obráceně: na <b>1,00 g</b> '+m.s+' při '+fmt(I,1)+' A je třeba <span class="q">t</span> = <span class="q">m</span>·<span class="q">z</span>·<span class="q">F</span>/(<span class="q">M</span>·<span class="q">I</span>) = <b>'+fmt(tOneG,0)+' s ≈ '+fmt(tOneG/60,1)+' min</b></p>';
}
function initFaraday(){
  var sel=$("#fdMet");
  sel.innerHTML=FMET.map(function(m,i){ return '<option value="'+i+'">'+m.s+' &nbsp;(z = '+m.z+', M = '+fmt(m.M,2)+')</option>'; }).join("");
  sel.addEventListener("change",function(){ fdState.i=+this.value; drawFaraday(); });
  $("#fdI").addEventListener("input",function(){ fdState.I=+this.value/10; drawFaraday(); });
  $("#fdT").addEventListener("input",function(){ fdState.t=+this.value; drawFaraday(); });
  drawFaraday();
}

/* ============================================================
   23 · KOROZE (k7)
   ============================================================ */
var coId="none";
function drawCorr(){
  var c=CO_(coId), W=760,H=300,s='';
  var yFe=196, xL=60, xR=700;
  /* železo */
  s+=rect(xL,yFe,xR-xL,70,{fill:"var(--ink-3)",r:4,style:"fill-opacity:.55"});
  s+=txt(xL+10,yFe+62,"železo (ocel)",{size:11.5,w:700,fill:"var(--paper)"});
  /* ochranná vrstva */
  var coat=null;
  if(coId==="paint") coat={c:"var(--cat2)",lab:"nátěr"};
  if(coId==="zinc") coat={c:"var(--endo)",lab:"vrstva Zn"};
  if(coId==="tin") coat={c:"var(--cat3)",lab:"vrstva Sn"};
  if(coId==="pass") coat={c:"var(--cat1)",lab:"pasivační Al₂O₃ / Cr₂O₃ (na Al, nerezi)"};
  var scratch = coId==="paint"||coId==="zinc"||coId==="tin";
  if(coat){
    if(scratch){
      s+=rect(xL,yFe-12,300,12,{fill:coat.c,r:2}); s+=rect(400,yFe-12,xR-400,12,{fill:coat.c,r:2});
      s+=txt(350,yFe-18,"rýha",{anchor:"middle",size:10.5,w:600,fill:"var(--ink-3)"});
    } else { s+=rect(xL,yFe-12,xR-xL,12,{fill:coat.c,r:2}); }
    s+=txt(xR-10,yFe-18,coat.lab,{anchor:"end",size:11,w:600,fill:coat.c});
  }
  /* kapka */
  var dropTop = coat ? yFe-12 : yFe;
  var cx=350, rx=170, ry=95;
  s+='<path d="M'+(cx-rx)+' '+dropTop+' A'+rx+' '+ry+' 0 0 1 '+(cx+rx)+' '+dropTop+' Z" style="fill:var(--endo);fill-opacity:.13;stroke:var(--endo);stroke-width:1.5"/>';
  s+=txt(cx,dropTop-ry+22,"kapka vody (elektrolyt)",{anchor:"middle",size:11,w:600,fill:"var(--endo)"});
  /* O2 */
  s+=txt(cx-rx+8,dropTop-30,"O₂",{size:12,w:700,fill:"var(--cat3)"}); s+=txt(cx+rx-26,dropTop-30,"O₂",{size:12,w:700,fill:"var(--cat3)"});
  s+=txt(cx,dropTop-ry-8,"O₂ ze vzduchu — nejvíc na okraji kapky",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  var anodeFe = coId==="none"||coId==="paint"||coId==="tin"||coId==="cu"||coId==="inh";
  var protectedFe = coId==="zinc"||coId==="mg"||coId==="source"||coId==="pass";
  if(anodeFe){
    /* anodické místo uprostřed */
    s+=rect(cx-50,yFe,100,10,{fill:"var(--exo)",r:2}); if(coId!=="paint"&&coId!=="tin") s+=rect(cx-30,yFe,60,18,{fill:"var(--exo)",r:3,style:"fill-opacity:.5"});
    s+=txt(cx,dropTop-52,"ANODICKÉ MÍSTO",{anchor:"middle",size:10.5,w:700,fill:"var(--exo)",style:"letter-spacing:.08em"});
    s+=txt(cx,dropTop-36,"Fe → Fe²⁺ + 2 e⁻",{anchor:"middle",size:12,w:600,fill:"var(--exo)",mono:true});
    /* katodická místa */
    [cx-rx+40,cx+rx-40].forEach(function(x){
      s+=rect(x-30,yFe-(coat?12:0),60,6,{fill:"var(--endo)",r:2});
      s+=txt(x,dropTop-12,"katodické místo",{anchor:"middle",size:9.5,w:600,fill:"var(--endo)"});
    });
    s+=txt(cx-rx+40,dropTop-60,"O₂ + 2 H₂O + 4 e⁻",{anchor:"middle",size:10.5,w:600,fill:"var(--endo)",mono:true});
    s+=txt(cx-rx+40,dropTop-47,"→ 4 OH⁻",{anchor:"middle",size:10.5,w:600,fill:"var(--endo)",mono:true});
    /* elektrony kovem */
    s+=hArrow(cx-20,cx-rx+60,yFe+40,"var(--accent)","e⁻ kovem",false);
    s+=hArrow(cx+20,cx+rx-60,yFe+40,"var(--accent)","e⁻ kovem",false);
    /* rez */
    s+=txt(cx+rx-40,dropTop-60,"Fe²⁺ + 2 OH⁻ → Fe(OH)₂",{anchor:"middle",size:10.5,w:600,fill:"var(--cat3)",mono:true});
    s+=txt(cx+rx-40,dropTop-47,"→ rez Fe₂O₃·xH₂O",{anchor:"middle",size:10.5,w:600,fill:"var(--cat3)",mono:true});
    if(coId==="cu"){ s+=rect(xR-120,yFe-40,120,40,{fill:"var(--cat3)",r:4}); s+=txt(xR-60,yFe-16,"Cu (katoda)",{anchor:"middle",size:12,w:700,fill:"var(--accent-ink)"}); }
    if(coId==="inh") s+=txt(cx,dropTop-72,"inhibitor blokuje povrch → děj zpomalen",{anchor:"middle",size:10.5,fill:"var(--cat1)"});
  } else if(protectedFe){
    s+=txt(cx,dropTop-52,"CELÉ ŽELEZO JE KATODA",{anchor:"middle",size:10.5,w:700,fill:"var(--endo)",style:"letter-spacing:.08em"});
    s+=txt(cx,dropTop-36,"O₂ + 2 H₂O + 4 e⁻ → 4 OH⁻ (jen redukce)",{anchor:"middle",size:11.5,w:600,fill:"var(--endo)",mono:true});
    if(coId==="zinc"){
      s+=rect(300,yFe-12,10,12,{fill:"var(--exo)"}); s+=rect(390,yFe-12,10,12,{fill:"var(--exo)"});
      s+=txt(cx,dropTop-14,"Zn → Zn²⁺ + 2 e⁻ (rozpouští se zinek na okraji rýhy)",{anchor:"middle",size:10.5,w:600,fill:"var(--exo)",mono:true});
      s+=hArrow(310,340,yFe+40,"var(--accent)","e⁻",false);
    }
    if(coId==="mg"){
      s+=rect(xR-110,yFe-70,90,70,{fill:"var(--exo)",r:4}); s+=txt(xR-65,yFe-40,"Mg",{anchor:"middle",size:14,w:700,fill:"var(--accent-ink)"}); s+=txt(xR-65,yFe-22,"obětovaná anoda",{anchor:"middle",size:9,w:600,fill:"var(--accent-ink)"});
      s+=txt(xR-65,yFe-80,"Mg → Mg²⁺ + 2 e⁻",{anchor:"middle",size:10.5,w:600,fill:"var(--exo)",mono:true});
      s+=hArrow(xR-110,cx+60,yFe+40,"var(--accent)","e⁻ do oceli",false);
    }
    if(coId==="source"){
      s+=rect(xR-130,40,110,50,{fill:"var(--surface)",r:6,stroke:"var(--ink-2)",sw:2}); s+=txt(xR-75,62,"zdroj",{anchor:"middle",size:11,w:600,fill:"var(--ink)"}); s+=txt(xR-75,80,"− k oceli · + k anodě",{anchor:"middle",size:9.5,fill:"var(--ink-3)"});
      s+=line(xR-100,90,xR-100,yFe,{c:"var(--ink-2)",w:2}); s+=txt(xR-92,140,"−",{size:15,w:700,fill:"var(--exo)"});
      s+=line(xR-40,90,xR-40,150,{c:"var(--ink-2)",w:2}); s+=rect(xR-52,150,24,40,{fill:"var(--cat3)",r:3}); s+=txt(xR-40,204,"inertní anoda",{anchor:"middle",size:9,fill:"var(--ink-3)"}); s+=txt(xR-32,140,"+",{size:15,w:700,fill:"var(--endo)"});
      s+=txt(cx,dropTop-14,"zdroj tlačí elektrony do oceli — Fe → Fe²⁺ neběží",{anchor:"middle",size:10.5,w:600,fill:"var(--accent)"});
    }
    if(coId==="pass") s+=txt(cx,dropTop-14,"nevodivá vrstva oxidu: elektrony ani ionty neprojdou",{anchor:"middle",size:10.5,w:600,fill:"var(--cat1)"});
  }
  s+=txt(14,18,("KOROZNÍ ČLÁNEK · "+c.name).toUpperCase(),{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  s+=rect(xL,H-22,20,10,{fill:c.ok?"var(--ok)":"var(--bad)",r:3});
  s+=txt(xL+28,H-13,c.verdict,{size:12,w:700,fill:c.ok?"var(--ok)":"var(--bad)"});
  $("#coWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Korozní článek pod kapkou vody"');
  $("#coText").innerHTML='<span class="eyebrow" style="color:'+(c.ok?"var(--ok)":"var(--bad)")+'">'+c.name+' · '+c.verdict+'</span><p style="font-size:.95rem">'+c.d+'</p>';
  $("#coFx").innerHTML=c.fx;
}
function initCorr(){
  var sel=$("#coSel");
  sel.innerHTML=CORR.map(function(c){ return '<option value="'+c.id+'">'+c.name+'</option>'; }).join("");
  sel.addEventListener("change",function(){ coId=this.value; drawCorr(); });
  drawCorr();
}
