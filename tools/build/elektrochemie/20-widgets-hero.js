/* ============================================================
   7 · POMOCNÍCI PRO ELEKTROCHEMII
   ============================================================ */
var SUPS = {"0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹","-":"⁻"};
function sup(n){ return String(n).split("").map(function(c){ return SUPS[c]||c; }).join(""); }
/* K z log K: "1,5·10³⁷" */
function fmtK(logK){
  if(!isFinite(logK)) return "—";
  var ex=Math.floor(logK), man=Math.pow(10,logK-ex);
  if(man>=9.95){ man=1; ex+=1; }
  if(ex>=0 && ex<=3) return fmt(Math.pow(10,logK),ex===0?2:0);
  return fmt(man,1)+"·10"+sup(ex);
}
/* šipka (vodorovná) */
function hArrow(x1,x2,y,color,label,above){
  var s=line(x1,y,x2,y,{c:color,w:2.2,cap:"round"});
  var d=x2>x1?1:-1;
  s+='<path d="M'+x2+' '+y+' l'+(-7*d)+' -4.5 l0 9 z" style="fill:'+color+'"/>';
  if(label) s+=txt((x1+x2)/2,y+(above?-7:16),label,{anchor:"middle",size:11.5,w:600,fill:color});
  return s;
}
/* obecné schéma galvanického článku: anoda vlevo, katoda vpravo */
function drawGalvSVG(o){
  /* o: {an, cat (ETAB záznamy), E, W, H, title, compact} */
  var W=o.W||760, H=o.H||340, s='';
  var bw=Math.round(W*0.30), bL={x:60,y:118,w:bw,h:180}, bR={x:W-60-bw,y:118,w:bw,h:180};
  var exL=bL.x+bL.w/2, exR=bR.x+bR.w/2;
  function beaker(b,fill){
    var t='';
    t+=rect(b.x,b.y+40,b.w,b.h-40,{fill:fill,r:0,style:"fill-opacity:.35"});
    t+='<path d="M'+b.x+' '+b.y+' L'+b.x+' '+(b.y+b.h)+' L'+(b.x+b.w)+' '+(b.y+b.h)+' L'+(b.x+b.w)+' '+b.y+'" style="fill:none;stroke:var(--line-strong);stroke-width:2;stroke-linejoin:round"/>';
    return t;
  }
  s+=beaker(bL,"var(--exo-soft)"); s+=beaker(bR,"var(--endo-soft)");
  /* elektrody */
  var anMat=o.an.el, catMat=o.cat.el;
  s+=rect(exL-11,74,22,200,{fill:"var(--exo)",r:3});
  s+=rect(exR-11,74,22,200,{fill:"var(--endo)",r:3});
  s+=txt(exL,190,anMat,{anchor:"middle",size:13,w:700,fill:"var(--accent-ink)",style:"transform:rotate(-90deg);transform-origin:"+exL+"px 190px"});
  s+=txt(exR,190,catMat,{anchor:"middle",size:13,w:700,fill:"var(--accent-ink)",style:"transform:rotate(-90deg);transform-origin:"+exR+"px 190px"});
  /* vodiče a voltmetr */
  var yW=44;
  s+=line(exL,74,exL,yW,{c:"var(--ink-2)",w:2}); s+=line(exR,74,exR,yW,{c:"var(--ink-2)",w:2});
  s+=line(exL,yW,W/2-30,yW,{c:"var(--ink-2)",w:2}); s+=line(W/2+30,yW,exR,yW,{c:"var(--ink-2)",w:2});
  s+='<circle cx="'+(W/2)+'" cy="'+yW+'" r="28" style="fill:var(--surface);stroke:var(--ink-2);stroke-width:2"/>';
  s+=txt(W/2,yW-4,"V",{anchor:"middle",size:14,w:700,fill:"var(--ink)"});
  s+=txt(W/2,yW+12,fmt(o.E,2)+" V",{anchor:"middle",size:11,w:600,fill:"var(--accent)",mono:true});
  /* elektrony */
  s+=hArrow(exL+40,W/2-44,yW-14,"var(--accent)","e⁻",true);
  s+=hArrow(W/2+44,exR-40,yW-14,"var(--accent)","e⁻",true);
  /* solný můstek */
  var sbY=118, sbL=bL.x+bL.w-40, sbR=bR.x+40;
  s+='<path d="M'+sbL+' '+(sbY+60)+' L'+sbL+' '+sbY+' Q'+sbL+' '+(sbY-30)+' '+(sbL+30)+' '+(sbY-30)+' L'+(sbR-30)+' '+(sbY-30)+' Q'+sbR+' '+(sbY-30)+' '+sbR+' '+sbY+' L'+sbR+' '+(sbY+60)+'" style="fill:none;stroke:var(--line-strong);stroke-width:14;stroke-linecap:butt"/>';
  s+='<path d="M'+sbL+' '+(sbY+60)+' L'+sbL+' '+sbY+' Q'+sbL+' '+(sbY-30)+' '+(sbL+30)+' '+(sbY-30)+' L'+(sbR-30)+' '+(sbY-30)+' Q'+sbR+' '+(sbY-30)+' '+sbR+' '+sbY+' L'+sbR+' '+(sbY+60)+'" style="fill:none;stroke:var(--surface-3);stroke-width:9"/>';
  s+=txt(W/2,sbY-36,"solný můstek (KNO₃)",{anchor:"middle",size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
  var a1=Math.round(W*0.07), a2=Math.round(W*0.14);
  s+=hArrow(W/2+a1,W/2+a2,sbY-14,"var(--endo)","kationty →",true);
  s+=hArrow(W/2-a1,W/2-a2,sbY-14,"var(--exo)","← anionty",true);
  /* popisky elektrod */
  s+=txt(exL,bL.y+bL.h+22,"ANODA (−) · oxidace",{anchor:"middle",size:11.5,w:700,fill:"var(--exo)",style:"letter-spacing:.06em"});
  s+=txt(exR,bR.y+bR.h+22,"KATODA (+) · redukce",{anchor:"middle",size:11.5,w:700,fill:"var(--endo)",style:"letter-spacing:.06em"});
  s+=txt(exL,bL.y+bL.h+38,halfOx(o.an),{anchor:"middle",size:11,fill:"var(--ink-2)",mono:true});
  s+=txt(exR,bR.y+bR.h+38,halfRed(o.cat),{anchor:"middle",size:11,fill:"var(--ink-2)",mono:true});
  /* ionty v roztoku */
  s+=txt(bL.x+14,bL.y+bL.h-14,sideStr(o.an.L)+" (aq)",{size:11.5,w:600,fill:"var(--exo)"});
  s+=txt(bR.x+bR.w-14,bR.y+bR.h-14,sideStr(o.cat.L)+" (aq)",{anchor:"end",size:11.5,w:600,fill:"var(--endo)"});
  s+=txt(bL.x+14,bL.y+bL.h-30,"E° = "+fmt(o.an.E,2)+" V",{size:11,fill:"var(--ink-3)",mono:true});
  s+=txt(bR.x+bR.w-14,bR.y+bR.h-30,"E° = "+fmt(o.cat.E,2)+" V",{anchor:"end",size:11,fill:"var(--ink-3)",mono:true});
  if(o.title) s+=txt(16,18,o.title,{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  return svg("0 0 "+W+" "+H,s,'aria-label="Schéma galvanického článku"');
}

/* ============================================================
   8 · HERO — stavitel galvanického článku
   ============================================================ */
var hcState={a:"Zn",b:"Cu"};
function drawHeroCell(){
  var A=E_(hcState.a), B=E_(hcState.b);
  var wrap=$("#hcWrap");
  if(A.id===B.id){
    var w0=760,h0=200,s0='';
    s0+=txt(w0/2,40,"DVĚ STEJNÉ ELEKTRODY — ČLÁNEK NEVZNIKNE",{anchor:"middle",size:12,w:700,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
    s0+=rect(150,68,180,82,{fill:"var(--surface-3)",r:10,stroke:"var(--line-strong)",sw:2});
    s0+=rect(430,68,180,82,{fill:"var(--surface-3)",r:10,stroke:"var(--line-strong)",sw:2});
    s0+=txt(240,106,A.pair,{anchor:"middle",size:13,w:700,fill:"var(--ink)"});
    s0+=txt(520,106,B.pair,{anchor:"middle",size:13,w:700,fill:"var(--ink)"});
    s0+=txt(240,128,"E° = "+sgn(A.E,2)+" V",{anchor:"middle",size:11.5,fill:"var(--ink-3)",mono:true});
    s0+=txt(520,128,"E° = "+sgn(B.E,2)+" V",{anchor:"middle",size:11.5,fill:"var(--ink-3)",mono:true});
    s0+=line(332,109,428,109,{c:"var(--line-strong)",w:2,dash:"5 4"});
    s0+=txt(w0/2,180,"E°článku = "+sgn(A.E,2)+" − ("+sgn(B.E,2)+") = 0,00 V — elektrony nemají kam téct",{anchor:"middle",size:12.5,w:600,fill:"var(--accent)"});
    wrap.innerHTML=svg("0 0 "+w0+" "+h0,s0,'aria-label="Dvě stejné elektrody nedávají žádné napětí"');
    $("#hcHalf").innerHTML='<span style="color:var(--ink-3)">Vyberte dvě <b>různé</b> poloreakce — ze dvou stejných elektrod článek nesestavíte.</span>';
    $("#hcEq").innerHTML=""; $("#hcScheme").innerHTML="";
    ["#hcRo1","#hcRo2","#hcRo3"].forEach(function(id){ $(id).innerHTML=""; });
    $("#hcNote").innerHTML="Dvě stejné elektrody v roztocích o stejné koncentraci dají 0 V. (Kdyby se koncentrace lišily, vznikl by koncentrační článek — o něm v kapitole 4.)";
    return;
  }
  var cat = A.E>=B.E ? A : B, an = A.E>=B.E ? B : A;
  var E=cat.E-an.E, ce=cellEq(cat,an), z=ce.z;
  var dG=-z*FCONST*E/1000, logK=z*E/NERNST;
  wrap.innerHTML=drawGalvSVG({an:an,cat:cat,E:E,title:"GALVANICKÝ ČLÁNEK · ANODA VLEVO, KATODA VPRAVO"});
  $("#hcHalf").innerHTML='<span style="color:var(--exo)">anoda (−), oxidace:</span> '+(ce.ma>1?ce.ma+" × (":"")+halfOx(an)+(ce.ma>1?")":"")+
    '<br><span style="color:var(--endo)">katoda (+), redukce:</span> '+(ce.mc>1?ce.mc+" × (":"")+halfRed(cat)+(ce.mc>1?")":"");
  $("#hcEq").innerHTML='celkem: <b>'+ce.eq+'</b> &nbsp;<span style="color:var(--ink-3)">('+z+' e⁻)</span>';
  var anIon=sideStr(an.L), catIon=sideStr(cat.L);
  var anS = an.el==="Pt" ? "Pt | "+sideStr(an.R)+", "+anIon : an.el+" | "+anIon;
  var catS = cat.el==="Pt" ? catIon+", "+sideStr(cat.R)+" | Pt" : catIon+" | "+cat.el;
  $("#hcScheme").innerHTML='zápis článku: <b>'+anS+' ‖ '+catS+'</b> &nbsp;<span style="color:var(--ink-3)">(anoda vlevo, ‖ = solný můstek)</span>';
  function ro(id,k,v,h,cls){ var e=$(id); e.className="readout "+(cls||""); e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#hcRo1","E°článku = E°(kat) − E°(an)",fmt(E,2)+" V",fmt(cat.E,2)+" − ("+fmt(an.E,2)+")","pos");
  ro("#hcRo2","ΔG° = −zFE°",fmt(dG,0)+" kJ·mol⁻¹","z = "+z+", F = 96 485 C·mol⁻¹","neg");
  ro("#hcRo3","K (log K = zE°/0,0592)",fmtK(logK),"log K = "+fmt(logK,1),"");
  var note;
  if(E>2){ note="Napětí přes 2 V — takové dvojice se v praxi realizují jen v bezvodých elektrolytech (Li-ion), protože voda by se sama rozkládala. Rovnovážná konstanta je astronomická: reakce běží prakticky do konce."; }
  else if(E>1){ note="Typické napětí jednoho článku baterie. Všimněte si, že z hodnoty E° plyne rovnou i ΔG° a K — jedna tabulka, tři veličiny."; }
  else if(E>0.3){ note="Malé, ale kladné napětí: reakce je samovolná, jen s menší hnací silou. Anoda je vždy ta poloreakce s nižším E° — ta se v článku obrátí a běží jako oxidace."; }
  else { note="Napětí je velmi malé (rozdíl E° pod 0,3 V). Reakce sice samovolná je, ale koncentrace ji podle Nernstovy rovnice snadno přetáhnou na druhou stranu."; }
  $("#hcNote").innerHTML="<b>"+an.pair+" je anoda</b> (nižší E°, oxiduje se), <b>"+cat.pair+" je katoda</b> (vyšší E°, redukuje se). "+note;
}
function initHeroCell(){
  var opts=ETAB.filter(function(e){return e.hero;}).map(function(e){ return '<option value="'+e.id+'">'+e.pair+' &nbsp; ('+fmt(e.E,2)+' V)</option>'; }).join("");
  $("#hcSel1").innerHTML=opts; $("#hcSel2").innerHTML=opts;
  $("#hcSel1").value=hcState.a; $("#hcSel2").value=hcState.b;
  $("#hcSel1").addEventListener("change",function(){ hcState.a=this.value; drawHeroCell(); });
  $("#hcSel2").addEventListener("change",function(){ hcState.b=this.value; drawHeroCell(); });
  drawHeroCell();
}
