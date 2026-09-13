/* ============================================================
   24 · WIDGETY KAPITOL 6, 7 A 8
   ============================================================ */

/* ---- Arrheniova rovnice: dva grafy ---- */
var arrState={Ea:50,T:298};
function arrRatio(Ea,T,Tref){ return Math.exp(Ea*1000/R_GAS*(1/Tref-1/T)); }
function drawArr(){
  var st=arrState, W=760,H=300;
  var s='';
  /* levý graf: log10(k/k298) vs T */
  (function(){
    var L=58,R=360,T=30,B=246, Tmin=250,Tmax=500, ymin=-6, ymax=12;
    var x=function(TT){ return L+(TT-Tmin)/(Tmax-Tmin)*(R-L); };
    var y=function(v){ return B-(Math.max(ymin,Math.min(ymax,v))-ymin)/(ymax-ymin)*(B-T); };
    for(var tt=250;tt<=500;tt+=50){ s+=line(x(tt),T,x(tt),B,{c:"var(--line)",w:1}); s+=txt(x(tt),B+15,tt,{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true}); }
    for(var v=-4;v<=12;v+=4){ s+=line(L,y(v),R,y(v),{c:"var(--line)",w:1}); s+=txt(L-6,y(v)+4,v,{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true}); }
    s+=gAxes({L:L,R:R,T:T,B:B,xl:"T [K]",yl:"log₁₀ (k / k₂₉₈)",yx:16,xly:32});
    [20,50,100,150].forEach(function(Ea){
      var pts=[]; for(var TT=Tmin;TT<=Tmax;TT+=5){ pts.push(x(TT).toFixed(1)+","+y(Math.log10(arrRatio(Ea,TT,298))).toFixed(1)); }
      var cur=(Ea===st.Ea);
      s+='<polyline points="'+pts.join(" ")+'" style="fill:none;stroke:'+(cur?"var(--accent)":"var(--line-strong)")+';stroke-width:'+(cur?2.4:1.2)+';'+(cur?"":"stroke-dasharray:4 4;")+'"/>';
      s+=txt(R-4,y(Math.log10(arrRatio(Ea,Tmax,298)))+(Ea===20?12:-4),"Eₐ = "+Ea,{anchor:"end",size:9.5,w:600,fill:cur?"var(--accent)":"var(--ink-3)",mono:true});
    });
    if([20,50,100,150].indexOf(st.Ea)<0){
      var pts2=[]; for(var T2=Tmin;T2<=Tmax;T2+=5){ pts2.push(x(T2).toFixed(1)+","+y(Math.log10(arrRatio(st.Ea,T2,298))).toFixed(1)); }
      s+='<polyline points="'+pts2.join(" ")+'" style="fill:none;stroke:var(--accent);stroke-width:2.4"/>';
    }
    var cy=y(Math.log10(arrRatio(st.Ea,st.T,298)));
    s+=line(x(st.T),T,x(st.T),B,{c:"var(--accent)",w:1,dash:"3 3"});
    s+='<circle cx="'+x(st.T)+'" cy="'+cy+'" r="6" style="fill:var(--surface);stroke:var(--accent);stroke-width:2.5"/>';
    s+=txt(L+6,T+4,"k roste s T exponenciálně",{size:11,w:600,fill:"var(--ink-2)"});
  })();
  /* pravý graf: ln(k/k298) vs 1000/T */
  (function(){
    var L=448,R=730,T=30,B=246, xmin=2.0,xmax=4.0, ymin=-15,ymax=30;
    var x=function(u){ return L+(u-xmin)/(xmax-xmin)*(R-L); };
    var y=function(v){ return B-(Math.max(ymin,Math.min(ymax,v))-ymin)/(ymax-ymin)*(B-T); };
    for(var u=2.0;u<=4.01;u+=0.5){ s+=line(x(u),T,x(u),B,{c:"var(--line)",w:1}); s+=txt(x(u),B+15,fmt(u,1),{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true}); }
    for(var v=-10;v<=30;v+=10){ s+=line(L,y(v),R,y(v),{c:"var(--line)",w:1}); s+=txt(L-6,y(v)+4,v,{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true}); }
    s+=gAxes({L:L,R:R,T:T,B:B,xl:"1000 / T [K⁻¹]",yl:"ln (k / k₂₉₈)",yx:406,xly:32});
    function lnr(Ea,u){ return -Ea*1000/R_GAS*(u/1000-1/298); }
    [20,50,100,150,st.Ea].forEach(function(Ea,i){
      var cur=(i===4);
      if(!cur && Ea===st.Ea) return;
      var u1=xmin,u2=xmax, v1=lnr(Ea,u1), v2=lnr(Ea,u2);
      /* ořez na plochu */
      var sl=(v2-v1)/(u2-u1);
      if(v1>ymax){ u1=u1+(ymax-v1)/sl; v1=ymax; }
      if(v2<ymin){ u2=u1+(ymin-v1)/sl; v2=ymin; }
      s+=line(x(u1),y(v1),x(u2),y(v2),{c:cur?"var(--accent)":"var(--line-strong)",w:cur?2.4:1.2,dash:cur?"":"4 4"});
    });
    var uT=1000/st.T;
    s+='<circle cx="'+x(uT)+'" cy="'+y(lnr(st.Ea,uT))+'" r="6" style="fill:var(--surface);stroke:var(--accent);stroke-width:2.5"/>';
    s+=txt(L+6,T+4,"přímka se směrnicí −Eₐ/R",{size:11,w:600,fill:"var(--ink-2)"});
    s+=txt(R-4,B-8,"← vyšší T",{anchor:"end",size:9.5,fill:"var(--ink-3)"});
  })();
  $("#arrWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Arrheniova závislost a Arrheniův graf"');
  $("#arrEaV").textContent=st.Ea+" kJ·mol⁻¹";
  $("#arrTV").textContent=st.T+" K ("+fmt(st.T-273.15,0)+" °C)";
  var r=arrRatio(st.Ea,st.T,298), q10=arrRatio(st.Ea,st.T+10,st.T), slope=-st.Ea*1000/R_GAS;
  setRo("#arrRo1","k("+st.T+" K) / k(298 K)",sci(r,2)+"×",Math.abs(r-1)<0.005?"stejně rychlá jako při 25 °C":(r>1?"rychlejší než při 25 °C":"pomalejší než při 25 °C"),Math.abs(r-1)<0.005?"":(r>1?"pos":"neg"));
  setRo("#arrRo2","Zrychlení za +10 K (při "+st.T+" K)",fmt(q10,2)+"×","van 't Hoffův koeficient γ","");
  setRo("#arrRo3","Směrnice −Eₐ/R",fmt(slope,0)+" K","strmější přímka = vyšší Eₐ","");
  $("#arrNote").innerHTML="Při Eₐ = "+st.Ea+" kJ·mol⁻¹ je rychlostní konstanta při "+st.T+" K <b>"+sci(r,2)+"×</b> hodnoty při 298 K a&nbsp;dalších +10 K ji zvýší "+fmt(q10,2)+"×. "+
    (st.Ea<=30?"Nízká bariéra — reakce je na teplotu málo citlivá (difuzí řízené a&nbsp;radikálové reakce).":(st.Ea>=120?"Vysoká bariéra — každých 10 K znamená mnohonásobek; takové reakce „nejdou“ za studena a&nbsp;„letí“ za tepla.":"Typická organická reakce: van 't Hoffovo pravidlo 2–4× za 10 °C tu platí."))+
    " Všimněte si vpravo: čím větší Eₐ, tím strmější přímka.";
}
function initArr(){
  $("#arrEa").addEventListener("input",function(){ arrState.Ea=+this.value; drawArr(); });
  $("#arrT").addEventListener("input",function(){ arrState.T=+this.value; drawArr(); });
  drawArr();
}

/* ---- dvoubodová kalkulačka ---- */
var vhState={T1:25,T2:35,Ea:50};
function drawVh(){
  var st=vhState, T1=st.T1+273.15, T2=st.T2+273.15;
  var lnr=st.Ea*1000/R_GAS*(1/T1-1/T2), r=Math.exp(lnr);
  $("#vhT1V").textContent=st.T1+" °C"; $("#vhT2V").textContent=st.T2+" °C"; $("#vhEaV").textContent=st.Ea+" kJ·mol⁻¹";
  $("#vhEq").innerHTML='ln(k₂/k₁) = (Eₐ/R)·(1/T₁ − 1/T₂) = ('+st.Ea*1000+' / 8,314) · (1/'+fmt(T1,2)+' − 1/'+fmt(T2,2)+') = '+fmt(st.Ea*1000/R_GAS,0)+' · '+sci(1/T1-1/T2,3)+' = <b>'+fmt(lnr,3)+'</b><br>k₂/k₁ = e<sup>'+fmt(lnr,3)+'</sup> = <b>'+sci(r,2)+'</b>';
  setRo("#vhRo1","k₂ / k₁",sci(r,2)+"×",r>=1?"při T₂ rychlejší":"při T₂ pomalejší",r>=1?"pos":"neg");
  var tm=60/r;
  setRo("#vhRo2","Doba reakce při T₂",tm<1?fmt(tm*60,1)+" s":(tm>600?fmt(tm/60,1)+" h":fmt(tm,1)+" min"),"když při T₁ trvá 60 min","");
  var dT=st.T2-st.T1;
  var gam = Math.abs(dT)<0.5 ? null : Math.pow(r,10/dT);
  setRo("#vhRo3","Ekvivalent „na 10 °C“",gam===null?"—":fmt(gam,2)+"×","van 't Hoffův koeficient γ","");
  $("#vhNote").innerHTML = (dT>0 ? "Ohřátí o&nbsp;"+dT+" °C zrychlí reakci "+sci(r,2)+"×." : (dT<0 ? "Ochlazení o&nbsp;"+(-dT)+" °C zpomalí reakci "+sci(1/r,2)+"× — proto lednice a&nbsp;mrazák." : "Stejná teplota — poměr je 1."))+
    " Zkuste lednici (25 → 5 °C, Eₐ = 50): asi 4× pomaleji. Nebo sterilizaci (25 → 120 °C): stovky až tisíce krát rychleji.";
}
function initVh(){
  $("#vhT1").addEventListener("input",function(){ vhState.T1=+this.value; drawVh(); });
  $("#vhT2").addEventListener("input",function(){ vhState.T2=+this.value; drawVh(); });
  $("#vhEa").addEventListener("input",function(){ vhState.Ea=+this.value; drawVh(); });
  drawVh();
}

/* ---- heterogenní katalýza krok za krokem ---- */
var catStep=0;
function drawCat(){
  var W=720,H=260, s='';
  var sy=200;
  /* povrch niklu */
  for(var i=0;i<12;i++){ var cx=60+i*54; s+='<circle cx="'+cx+'" cy="'+sy+'" r="24" style="fill:var(--surface-3);stroke:var(--line-strong);stroke-width:1.5"/>'; s+=txt(cx,sy+5,"Ni",{anchor:"middle",size:12,w:600,fill:"var(--ink-3)"}); }
  s+=txt(W/2,H-10,"povrch katalyzátoru (Ni) — aktivní centra mezi atomy",{anchor:"middle",size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
  var H_=function(x,y){ return '<circle cx="'+x+'" cy="'+y+'" r="10" style="fill:var(--endo);stroke:var(--surface);stroke-width:2"/>'+txt(x,y+4,"H",{anchor:"middle",size:11,w:700,fill:"var(--paper)"}); };
  var C_=function(x,y){ return '<circle cx="'+x+'" cy="'+y+'" r="15" style="fill:var(--ink-2);stroke:var(--surface);stroke-width:2"/>'+txt(x,y+4.5,"C",{anchor:"middle",size:12,w:700,fill:"var(--paper)"}); };
  var S_=function(x,y){ return '<circle cx="'+x+'" cy="'+y+'" r="13" style="fill:var(--cat4);stroke:var(--surface);stroke-width:2"/>'+txt(x,y+4.5,"S",{anchor:"middle",size:12,w:700,fill:"var(--paper)"}); };
  function bond(x1,y1,x2,y2,dbl){ var b=line(x1,y1,x2,y2,{c:"var(--ink-3)",w:4,cap:"round"}); if(dbl){ b+=line(x1,y1-6,x2,y2-6,{c:"var(--ink-3)",w:3,cap:"round"}); } return b; }
  function ethene(x,y,onSurf,sat){
    var t='';
    t+=bond(x-22,y,x+22,y,!sat);
    t+=bond(x-22,y,x-40,y-20)+bond(x-22,y,x-40,y+20)+bond(x+22,y,x+40,y-20)+bond(x+22,y,x+40,y+20);
    if(sat){ t+=bond(x-22,y,x-22,y+30)+bond(x+22,y,x+22,y+30); }
    t+=C_(x-22,y)+C_(x+22,y)+H_(x-40,y-20)+H_(x-40,y+20)+H_(x+40,y-20)+H_(x+40,y+20);
    if(sat){ t+=H_(x-22,y+30)+H_(x+22,y+30); }
    return t;
  }
  var notes=[
    "<b>Před reakcí.</b> Ethen a&nbsp;vodík se v&nbsp;plynu potkávají, ale bez katalyzátoru reagují zanedbatelně — vazba H–H (436 kJ·mol⁻¹) je příliš pevná a&nbsp;přímá srážka má vysokou Eₐ.",
    "<b>1 · Adsorpce.</b> Molekuly se navážou na aktivní centra povrchu. Vodík se přitom <b>rozštěpí na atomy</b> vázané k&nbsp;niklu (disociativní adsorpce) — nejtěžší krok, rozbití H–H, udělal katalyzátor „zadarmo“. Ethen leží na povrchu π‑vazbou. Vazby jsou oslabené, aktivační energie dalšího kroku je malá.",
    "<b>2 · Reakce na povrchu.</b> Atomy vodíku putují po povrchu a&nbsp;postupně se přidají na oba uhlíky. Dvojná vazba se mění na jednoduchou. Molekuly jsou celou dobu držené v&nbsp;dobré orientaci — katalyzátor zvyšuje i&nbsp;sterický faktor.",
    "<b>3 · Desorpce.</b> Ethan už se na povrch váže slabě, uvolní se do plynu a&nbsp;aktivní centra jsou volná pro další molekuly. Katalyzátor je <b>regenerován</b> — proto stačí malé množství a&nbsp;proto se v&nbsp;celkové rovnici neobjeví.",
    "<b>4 · Katalytický jed.</b> Síra (nebo olovo, arsen, CO) se na aktivní centra váže pevně a&nbsp;nevratně. Vodík se nemá kam adsorbovat — reakce se zastaví, přestože katalyzátor „tam je“. Proto se suroviny pro Haberův proces odsiřují a&nbsp;proto se prodává bezolovnatý benzin."
  ];
  if(catStep===0){
    s+=ethene(230,70,false,false);
    s+=bond(470,60,510,60)+H_(470,60)+H_(510,60);
    s+=txt(230,H-46,"C₂H₄ (g)",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
    s+=txt(490,H-46,"H₂ (g)",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  } else if(catStep===1){
    s+=ethene(230,150,true,false);
    s+=line(230,166,230,176,{c:"var(--ink-3)",w:2,dash:"3 2"});
    s+=H_(438,172)+H_(546,172);
    s+=line(438,182,438,178,{c:"var(--ink-3)",w:2})+line(546,182,546,178,{c:"var(--ink-3)",w:2});
    s+=txt(492,140,"H₂ → 2 H (ads)",{anchor:"middle",size:11.5,w:700,fill:"var(--endo)",mono:true});
    s+=txt(230,100,"ethen adsorbovaný π-vazbou",{anchor:"middle",size:11,fill:"var(--ink-3)"});
  } else if(catStep===2){
    s+=ethene(300,150,true,false);
    s+=H_(258,178)+H_(342,178);
    s+='<path d="M258 168 q-10 -22 -18 -30" style="fill:none;stroke:var(--endo);stroke-width:2;stroke-dasharray:3 3"/>';
    s+='<path d="M342 168 q10 -22 18 -30" style="fill:none;stroke:var(--endo);stroke-width:2;stroke-dasharray:3 3"/>';
    s+=txt(300,100,"atomy H se přidávají na uhlíky · C=C → C–C",{anchor:"middle",size:11,w:600,fill:"var(--endo)"});
  } else if(catStep===3){
    s+=ethene(300,70,false,true);
    s+=line(300,120,300,150,{c:"var(--ok)",w:3,cap:"round"})+'<path d="M300 116 l-6 10 l12 0 z" style="fill:var(--ok)"/>';
    s+=txt(300,H-46,"C₂H₆ (g) odchází · povrch je opět volný",{anchor:"middle",size:11.5,w:600,fill:"var(--ok)"});
  } else {
    s+=S_(141,174)+S_(303,174)+S_(465,174)+S_(627,174);
    s+=bond(470,60,510,60)+H_(470,60)+H_(510,60);
    s+=line(490,80,490,120,{c:"var(--bad)",w:3,cap:"round"})+line(478,112,502,132,{c:"var(--bad)",w:3})+line(502,112,478,132,{c:"var(--bad)",w:3});
    s+=txt(490,44,"H₂ se nemá kam navázat",{anchor:"middle",size:11.5,w:600,fill:"var(--bad)"});
    s+=txt(384,140,"S, Pb, As, CO — pevně obsazená aktivní centra",{anchor:"middle",size:11,w:600,fill:"var(--cat4)"});
  }
  $("#catWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Kroky heterogenní katalýzy"');
  $("#catNote").innerHTML=notes[catStep];
  pressGroup("#catStep",catStep);
}
function initCat(){
  $$("#catStep button").forEach(function(b){ b.addEventListener("click",function(){ catStep=+b.dataset.v; drawCat(); }); });
  drawCat();
}

/* ---- tabulka katalyzátorů ---- */
var ctState={q:"",f:"all"};
var CT_T={hom:["Homogenní","var(--endo)"],het:["Heterogenní","var(--exo)"],enz:["Enzym","var(--cat1)"],auto:["Autokatalýza","var(--cat3)"],inh:["Inhibitor","var(--cat4)"]};
function drawCt(){
  var q=ctState.q.toLowerCase().trim();
  var rows=CATS.filter(function(r){
    if(ctState.f!=="all" && r.t!==ctState.f) return false;
    if(!q) return true;
    return (r.n+" "+r.p+" "+r.eq+" "+r.c+" "+CT_T[r.t][0]).toLowerCase().indexOf(q)>=0;
  });
  var h=rows.map(function(r){
    return '<tr><td style="font-weight:600">'+r.n+'</td><td><span style="color:'+CT_T[r.t][1]+';font-weight:600;font-size:.8rem">'+CT_T[r.t][0]+'</span></td>'+
      '<td style="font-size:.85rem">'+r.p+'</td><td class="mono" style="font-size:.78rem;color:var(--ink-2)">'+r.eq+'</td>'+
      '<td style="font-size:.8rem;color:var(--ink-2);line-height:1.45">'+r.c+'</td></tr>';
  }).join("");
  if(!rows.length) h='<tr><td colspan="5" style="padding:1.1rem;color:var(--ink-3)">Nic nenalezeno. Zkuste „amoniak“, „enzym“ nebo „jed“.</td></tr>';
  $("#ctBody").innerHTML=h;
  pressGroup("#ctFilter",ctState.f);
}
function initCt(){
  $("#ctSearch").addEventListener("input",function(){ ctState.q=this.value; drawCt(); });
  $$("#ctFilter button").forEach(function(b){ b.addEventListener("click",function(){ ctState.f=b.dataset.v; drawCt(); }); });
  drawCt();
}

/* ---- trenažér faktorů ---- */
var fxI=0, fxScore=0, fxAnswered=false;
function drawFx(){
  $("#fxQn").textContent=fxI+1; $("#fxQtot").textContent=FX.length; $("#fxScore").textContent=fxScore;
  $("#fxSit").innerHTML=FX[fxI].s;
  var ex=$("#fxExplain"); ex.style.display="none"; ex.className="explain";
  $("#fxNext").disabled=true;
  $$("#k8 [data-fx]").forEach(function(b){ b.disabled=false; b.style.opacity=""; });
  fxAnswered=false;
}
function initFx(){
  $$("#k8 [data-fx]").forEach(function(b){
    b.addEventListener("click",function(){
      if(fxAnswered) return;
      fxAnswered=true;
      var it=FX[fxI], ok=b.dataset.fx===it.a;
      if(ok) fxScore++;
      $("#fxScore").textContent=fxScore;
      var names={up:"rychlost roste",down:"rychlost klesá",same:"nemění se"};
      var ex=$("#fxExplain"); ex.className="explain"; ex.style.display="flex";
      ex.style.background=ok?"var(--ok-soft)":"var(--bad-soft)"; ex.style.borderColor=ok?"var(--ok)":"var(--bad)";
      ex.innerHTML='<span class="verdict" style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+(ok?"✓ Správně":"✕ Špatně — správně: "+names[it.a])+'</span><span class="eyebrow">Proč</span><div>'+it.e+'</div>';
      $$("#k8 [data-fx]").forEach(function(x){ x.disabled=true; x.style.opacity=x.dataset.fx===it.a?"1":".5"; });
      $("#fxNext").disabled = fxI>=FX.length-1;
      if(fxI>=FX.length-1){
        toast("Trenažér dokončen: "+fxScore+" z "+FX.length+" správně.");
        if(fxScore>=11) markDone("k8");
      }
    });
  });
  $("#fxNext").addEventListener("click",function(){ if(fxI<FX.length-1){ fxI++; drawFx(); } });
  drawFx();
}

/* ---- povrch krychle ---- */
var SF_N=[1,2,4,10,100,1000,10000];
var SF_EDGE=["1 cm","5 mm","2,5 mm","1 mm","0,1 mm (100 µm)","10 µm","1 µm"];
var sfIdx=0;
function drawSf(){
  var n=SF_N[sfIdx], count=Math.pow(n,3), area=6*n;
  var W=420,H=260, s='';
  /* izometrická krychle */
  var ox=40, oy=210, a=130, d=52;
  var front='M'+ox+' '+oy+' l'+a+' 0 l0 -'+a+' l-'+a+' 0 z';
  var top='M'+ox+' '+(oy-a)+' l'+d+' -'+(d*0.6)+' l'+a+' 0 l-'+d+' '+(d*0.6)+' z';
  var side='M'+(ox+a)+' '+oy+' l'+d+' -'+(d*0.6)+' l0 -'+a+' l-'+d+' '+(d*0.6)+' z';
  s+='<path d="'+top+'" style="fill:var(--surface-3);stroke:var(--line-strong);stroke-width:1.2"/>';
  s+='<path d="'+side+'" style="fill:var(--surface-2);stroke:var(--line-strong);stroke-width:1.2"/>';
  s+='<path d="'+front+'" style="fill:var(--accent-soft);stroke:var(--line-strong);stroke-width:1.2"/>';
  var g=Math.min(n,10);
  if(n>1){
    for(var i=1;i<g;i++){
      var p=a*i/g;
      s+=line(ox+p,oy,ox+p,oy-a,{c:"var(--accent)",w:1});
      s+=line(ox,oy-p,ox+a,oy-p,{c:"var(--accent)",w:1});
      s+=line(ox+p,oy-a,ox+p+d,oy-a-d*0.6,{c:"var(--line-strong)",w:.8});
      s+=line(ox+a,oy-p,ox+a+d,oy-p-d*0.6,{c:"var(--line-strong)",w:.8});
      s+=line(ox+d*i/g,oy-a-d*0.6*i/g,ox+a+d*i/g,oy-a-d*0.6*i/g,{c:"var(--line-strong)",w:.8});
      s+=line(ox+a+d*i/g,oy-d*0.6*i/g,ox+a+d*i/g,oy-a-d*0.6*i/g,{c:"var(--line-strong)",w:.8});
    }
    if(n>10) s+=txt(ox+a/2,oy-a/2+5,n+" × "+n+" na stěnu",{anchor:"middle",size:11,w:700,fill:"var(--accent)",mono:true});
  }
  s+=txt(ox+a/2,oy+22,"hrana 1 cm · objem stále 1 cm³",{anchor:"middle",size:11,fill:"var(--ink-3)"});
  /* sloupec povrchu (log) */
  var bx=300,bw=60,bt=40,bb=210;
  var lg=Math.log10(area), lgmax=Math.log10(60000);
  var hh=(bb-bt)*lg/lgmax;
  s+=rect(bx,bt,bw,bb-bt,{fill:"var(--surface-2)",r:6,stroke:"var(--line)",sw:1});
  s+=rect(bx,bb-hh,bw,hh,{fill:"var(--accent)",r:6});
  s+=txt(bx+bw/2,bb-hh-8,area>=10000?fmt(area/10000,0)+" m²":fmt(area,0)+" cm²",{anchor:"middle",size:12,w:700,fill:"var(--accent)",mono:true});
  s+=txt(bx+bw/2,bb+18,"povrch (log)",{anchor:"middle",size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
  [6,60,600,6000,60000].forEach(function(v){ var yy=bb-(bb-bt)*Math.log10(v)/lgmax; s+=line(bx-6,yy,bx,yy,{c:"var(--line-strong)",w:1}); s+=txt(bx-9,yy+3,v>=10000?"6 m²":v,{anchor:"end",size:9.5,fill:"var(--ink-3)",mono:true}); });
  $("#sfWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Krychle rozdělená na menší krychličky"');
  $("#sfNV").textContent=n===1?"1× (celá krychle)":n+"× na hranu";
  setRo("#sfRo1","Hrana krychličky",SF_EDGE[sfIdx],"1 cm / "+n,"");
  setRo("#sfRo2","Počet krychliček",sci(count,0),"n³ = "+n+"³","");
  setRo("#sfRo3","Celkový povrch",(area>=10000?fmt(area/10000,0)+" m² = ":"")+sci(area,0)+" cm²",n===1?"výchozí stav — celá krychle":fmt(n,0)+"× víc než celá krychle",n===1?"":"pos");
  $("#sfEq").innerHTML="S = n³ · 6·(1/n)² = 6·n = 6 · "+n+" = <b>"+sci(area,0)+" cm²</b>";
  $("#sfNote").innerHTML = sfIdx===0 ? "Celá krychle: 6 stěn po 1 cm². Posuňte dělení — objem se nemění, ale povrch roste přímo úměrně počtu dílků na hranu."
    : (n>=1000 ? "Hrana "+SF_EDGE[sfIdx]+": z&nbsp;jediné kostky cukru je "+fmt(area/10000,1)+" m² povrchu. Přesně proto je moučný, uhelný nebo hliníkový prach výbušný — a&nbsp;proto průmysl mele katalyzátory na nanočástice."
    : "Hrana "+SF_EDGE[sfIdx]+": povrch "+fmt(area,0)+" cm², tedy "+n+"× víc. Reakce na rozhraní (Zn + HCl, hoření, rozpouštění) běží úměrně rychleji.");
}
function initSf(){
  $("#sfN").addEventListener("input",function(){ sfIdx=+this.value; drawSf(); });
  drawSf();
}
