/* ============================================================
   23 · WIDGETY KAPITOL 4 A 5
   ============================================================ */

/* hladká křivka přes body s vodorovnými tečnami (plošiny, vrcholy, údolí) */
function smoothPath(pts){
  var d="M"+pts[0][0]+" "+pts[0][1];
  for(var i=1;i<pts.length;i++){
    var x1=pts[i-1][0],y1=pts[i-1][1],x2=pts[i][0],y2=pts[i][1], dx=(x2-x1)*0.5;
    d+=" C"+(x1+dx)+" "+y1+" "+(x2-dx)+" "+y2+" "+x2+" "+y2;
  }
  return d;
}

/* ---- mechanismy ---- */
var mechI=0;
function drawMech(){
  var m=MECHS[mechI];
  $("#mechSteps").innerHTML=m.steps.map(function(st,i){
    return '<div style="border:1px solid '+(st.slow?"var(--accent)":"var(--line)")+';border-left:3px solid '+(st.slow?"var(--accent)":"var(--line-strong)")+';border-radius:10px;padding:.6rem .85rem;background:'+(st.slow?"var(--accent-soft)":"var(--surface-2)")+'">'+
      '<div style="display:flex;justify-content:space-between;gap:.6rem;align-items:baseline;flex-wrap:wrap"><span class="eyebrow">krok '+(i+1)+'</span>'+
      '<span class="tag'+(st.slow?"":" ok")+'" style="'+(st.slow?"":"background:var(--surface-3);color:var(--ink-2)")+'">'+st.lab+'</span></div>'+
      '<div class="mono" style="font-size:1rem;margin-top:.25rem;font-weight:600">'+st.eq+'</div>'+
      (st.slow?'<div style="font-family:var(--f-ui);font-size:.8rem;color:var(--accent);font-weight:600;margin-top:.2rem">← rychlost určující krok</div>':'')+'</div>';
  }).join("")+'<div style="font-family:var(--f-ui);font-size:.85rem;color:var(--ink-2);padding:.3rem .2rem">Součet kroků: <span class="chem">'+m.overall+'</span> · meziprodukt(y) se vykrátí.</div>';
  /* schematický profil */
  var n=m.steps.length, W=380,H=230,L=30,R=360,T=26,B=190;
  /* hladiny (v px od spodní osy): reaktanty 0, meziprodukty +14, produkty −28 (všechny uvedené reakce jsou exotermické) */
  var y0=B-50, pts=[[L,y0]];
  var seg=(R-L-60)/n, xcur=L+30, E=y0;
  m.steps.forEach(function(st,i){
    var next = (i===n-1) ? y0+28 : y0-14;
    var bar = st.slow ? 105 : 45;
    var peakY = Math.min(E,next) - bar;
    pts.push([xcur+seg*0.5,peakY]);
    pts.push([xcur+seg,next]);
    E=next; xcur+=seg;
  });
  pts.push([R,pts[pts.length-1][1]]);
  var s='';
  s+=line(L,T-4,L,B+6,{c:"var(--line-strong)",w:1.5});
  s+=line(L,B+6,R+4,B+6,{c:"var(--line-strong)",w:1.5});
  s+=txt(14,(T+B)/2,"energie",{anchor:"middle",size:10.5,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:14px "+((T+B)/2)+"px;letter-spacing:.08em;text-transform:uppercase"});
  s+=txt((L+R)/2,B+22,"reakční koordináta",{anchor:"middle",size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em;text-transform:uppercase"});
  s+='<path d="'+smoothPath(pts)+'" style="fill:none;stroke:var(--ink-2);stroke-width:2.4;stroke-linecap:round"/>';
  /* popisky vrcholů a údolí */
  var pi=1;
  m.steps.forEach(function(st,i){
    var p=pts[pi]; pi+=2;
    s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="4" style="fill:var(--surface);stroke:'+(st.slow?"var(--accent)":"var(--ink-2)")+';stroke-width:2"/>';
    s+=txt(p[0],p[1]-9,(st.slow?"‡ pomalý (vysoká Eₐ)":"‡ rychlý"),{anchor:"middle",size:10,w:600,fill:st.slow?"var(--accent)":"var(--ink-3)"});
    if(i<n-1){ var v=pts[pi-1]; s+=txt(v[0],v[1]+14,"meziprodukt",{anchor:"middle",size:9.5,fill:"var(--ink-3)"}); }
  });
  s+=txt(L+4,pts[0][1]-8,"reaktanty",{size:10,w:600,fill:"var(--ink)"});
  s+=txt(R-2,pts[pts.length-1][1]-8,"produkty",{anchor:"end",size:10,w:600,fill:"var(--ink)"});
  $("#mechWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Schematický energetický profil mechanismu"');
  $("#mechLaw").innerHTML="experimentální rychlostní rovnice: <b>"+m.law+"</b>";
  var slow=m.steps.map(function(st,i){return st.slow?i+1:null;}).filter(function(x){return x;})[0];
  var slowMol=m.steps[slow-1].mol;
  setRo("#mechRo1","Celkový řád",m.order,"součet exponentů","");
  setRo("#mechRo2","Rychlost určuje","krok "+slow,["","unimolekulární","bimolekulární","trimolekulární"][slowMol]+" krok","");
  setRo("#mechRo3","Meziprodukt",m.inter,"v celkové rovnici chybí","");
  $("#mechNote").innerHTML=m.note;
}
function initMech(){
  var sel=$("#mechSel");
  sel.innerHTML=MECHS.map(function(m,i){return '<option value="'+i+'">'+m.name+'</option>';}).join("");
  sel.addEventListener("change",function(){ mechI=+sel.value; drawMech(); });
  drawMech();
}

/* ---- Maxwell–Boltzmannovo rozdělení (schematické) ---- */
var mbState={T:300,Ea:50};
function mbFrac(Ea,T){ return Math.exp(-Ea*1000/(R_GAS*T)); }
function drawMb(){
  var st=mbState, W=760,H=280,L=52,R=730,T=30,B=232, XMAX=100;
  var x=function(u){ return L+(u/XMAX)*(R-L); };
  function curve(TT){
    var tau=TT/12, pts=[], area=0, N=200;
    for(var i=0;i<=N;i++){ var u=XMAX*i/N; var f=Math.sqrt(u)*Math.exp(-u/tau); pts.push(f); area+=f; }
    return pts.map(function(f){ return f/area*N; });
  }
  var c1=curve(st.T), c2=curve(st.T+100);
  var ymax=Math.max.apply(null,c1.concat(c2))*1.1;
  var y=function(f){ return B-(f/ymax)*(B-T); };
  var xEa=st.Ea*0.55;
  var s='';
  s+=gAxes({L:L,R:R,T:T,B:B,xl:"kinetická energie částic →",yl:"počet částic",yx:16,xly:24});
  function poly(c,col,w,dash){ var p=[]; for(var i=0;i<c.length;i++){ p.push(x(XMAX*i/(c.length-1)).toFixed(1)+","+y(c[i]).toFixed(1)); } return '<polyline points="'+p.join(" ")+'" style="fill:none;stroke:'+col+';stroke-width:'+w+';'+(dash?"stroke-dasharray:"+dash+";":"")+'"/>'; }
  /* vyšrafovaná plocha E ≥ Ea */
  var ap=[]; var i0=Math.ceil(xEa/XMAX*(c1.length-1));
  ap.push(x(xEa).toFixed(1)+","+B);
  for(var i=i0;i<c1.length;i++){ ap.push(x(XMAX*i/(c1.length-1)).toFixed(1)+","+y(c1[i]).toFixed(1)); }
  ap.push(R+","+B);
  s+='<polygon points="'+ap.join(" ")+'" style="fill:var(--accent);fill-opacity:.28;stroke:none"/>';
  var ap2=[]; ap2.push(x(xEa).toFixed(1)+","+B);
  for(var j=i0;j<c2.length;j++){ ap2.push(x(XMAX*j/(c2.length-1)).toFixed(1)+","+y(c2[j]).toFixed(1)); }
  ap2.push(R+","+B);
  s+='<polygon points="'+ap2.join(" ")+'" style="fill:var(--endo);fill-opacity:.14;stroke:none"/>';
  s+=poly(c2,"var(--endo)",2,"6 4");
  s+=poly(c1,"var(--ink-2)",2.6,"");
  s+=line(x(xEa),T+6,x(xEa),B,{c:"var(--accent)",w:2,dash:"5 4"});
  s+=txt(x(xEa)+6,T+16,"Eₐ = "+st.Ea+" kJ·mol⁻¹",{size:12,w:700,fill:"var(--accent)"});
  s+=txt(x(xEa)+6,T+32,"vpravo: molekuly, které mohou reagovat",{size:10.5,fill:"var(--ink-3)"});
  /* popisky křivek */
  var m1=0; for(var a=0;a<c1.length;a++){ if(c1[a]>c1[m1]) m1=a; }
  var m2=0; for(var b=0;b<c2.length;b++){ if(c2[b]>c2[m2]) m2=b; }
  s+=txt(x(XMAX*m1/(c1.length-1)),y(c1[m1])-8,"T = "+st.T+" K",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  s+=txt(x(XMAX*m2/(c2.length-1))+40,y(c2[m2])-8,"T = "+(st.T+100)+" K",{anchor:"middle",size:11.5,w:600,fill:"var(--endo)"});
  s+=txt(R-4,B-8,"schematicky — ocas je ve skutečnosti mnohem tenčí",{anchor:"end",size:9.5,fill:"var(--ink-3)"});
  $("#mbWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Maxwell–Boltzmannovo rozdělení energií"');
  $("#mbTV").textContent=st.T+" K ("+fmt(st.T-273.15,0)+" °C)";
  $("#mbEaV").textContent=st.Ea+" kJ·mol⁻¹";
  var f1=mbFrac(st.Ea,st.T), f2=mbFrac(st.Ea,st.T+10), f3=mbFrac(st.Ea,st.T+100);
  setRo("#mbRo1","Podíl e^(−Ea/RT) při "+st.T+" K",sci(f1,1),"z každé srážky je účinná tato část","");
  setRo("#mbRo2","Podíl při "+(st.T+10)+" K",sci(f2,1),"jen o 10 K tepleji","pos");
  setRo("#mbRo3","Kolikrát víc",fmt(f2/f1,2)+"× (za +10 K)","za +100 K: "+sci(f3/f1,1)+"×","pos");
  $("#mbNote").innerHTML="Při "+st.T+" K má energii aspoň "+st.Ea+" kJ·mol⁻¹ zhruba <b>"+sci(f1,1)+"</b> molekul (podíl), při "+(st.T+10)+" K už "+sci(f2,1)+" — to je "+fmt(f2/f1,2)+"× víc. "+
    (st.Ea>=45&&st.Ea<=60?"Pro Eₐ kolem 50 kJ·mol⁻¹ vychází u&nbsp;pokojové teploty přesně van 't Hoffova „dvojka“. ":(st.Ea>90?"Vysoká bariéra: teplota má obrovský vliv, +10 K znamená několikanásobek. ":"Nízká bariéra: reakce je rychlá, ale na teplotu málo citlivá. "))+
    "Tvar křivky je schematický, čísla v&nbsp;dlaždicích jsou přesná.";
}
function initMb(){
  $("#mbT").addEventListener("input",function(){ mbState.T=+this.value; drawMb(); });
  $("#mbEa").addEventListener("input",function(){ mbState.Ea=+this.value; drawMb(); });
  drawMb();
}

/* ---- orientace srážky NO + O₃ ---- */
var orMode="good";
function drawOr(){
  var W=700,H=200, s='';
  function atom(cx,cy,r,col,lab){ return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" style="fill:'+col+';stroke:var(--surface);stroke-width:2"/>'+txt(cx,cy+4.5,lab,{anchor:"middle",size:12,w:700,fill:"var(--paper)"}); }
  var N="var(--cat2)", O="var(--exo)";
  /* ozon vpravo */
  var ox=470, oy=100;
  var ozone = atom(ox,oy,18,O,"O")+atom(ox+40,oy-22,18,O,"O")+atom(ox+40,oy+22,18,O,"O");
  s+=line(ox,oy,ox+40,oy-22,{c:"var(--ink-3)",w:5,cap:"round"})+line(ox,oy,ox+40,oy+22,{c:"var(--ink-3)",w:5,cap:"round"})+ozone;
  s+=txt(ox+20,oy+58,"O₃ (ozon)",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  var nox=250;
  if(orMode==="good"){
    s+=line(nox-44,oy,nox,oy,{c:"var(--ink-3)",w:5,cap:"round"})+atom(nox-44,oy,18,O,"O")+atom(nox,oy,18,N,"N");
    s+=line(nox+26,oy,ox-30,oy,{c:"var(--ok)",w:3,cap:"round"})+'<path d="M'+(ox-26)+' '+oy+' l-12 -6 l0 12 z" style="fill:var(--ok)"/>';
    s+=txt(nox-22,oy+58,"NO — dusíkem napřed",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
    s+=txt((nox+ox)/2,oy-20,"dostatečná energie + správná orientace",{anchor:"middle",size:11,w:600,fill:"var(--ok)"});
    s+=txt(350,30,"ÚČINNÁ SRÁŽKA → NO₂ + O₂",{anchor:"middle",size:13,w:700,fill:"var(--ok)",style:"letter-spacing:.06em"});
    s+=txt(350,H-16,"N se naváže na koncový kyslík ozonu, vazba O–O se přeruší: vznikne NO₂ a O₂.",{anchor:"middle",size:11,fill:"var(--ink-3)"});
    $("#orNote").innerHTML="<b>Účinná srážka.</b> Všechny tři podmínky srážkové teorie jsou splněny: částice se setkaly, mají energii ≥ Eₐ a&nbsp;dusík míří na atom kyslíku, se kterým má vytvořit vazbu. Jen taková srážka vede k&nbsp;produktům — a&nbsp;i&nbsp;tak jde jen o&nbsp;zlomek všech srážek.";
  } else if(orMode==="bad"){
    s+=line(nox,oy,nox+44,oy,{c:"var(--ink-3)",w:5,cap:"round"})+atom(nox+44,oy,18,O,"O")+atom(nox,oy,18,N,"N");
    s+=line(nox+70,oy,ox-30,oy,{c:"var(--bad)",w:3,cap:"round"})+'<path d="M'+(ox-26)+' '+oy+' l-12 -6 l0 12 z" style="fill:var(--bad)"/>';
    s+=line(ox-52,oy-22,ox-30,oy+22,{c:"var(--bad)",w:3})+line(ox-30,oy-22,ox-52,oy+22,{c:"var(--bad)",w:3});
    s+=txt(nox+22,oy+58,"NO — kyslíkem napřed",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
    s+=txt(350,30,"NEÚČINNÁ SRÁŽKA → odraz",{anchor:"middle",size:13,w:700,fill:"var(--bad)",style:"letter-spacing:.06em"});
    s+=txt(350,H-16,"Energie by stačila, ale kyslík NO nemá s ozonem co vytvořit — molekuly se odrazí beze změny.",{anchor:"middle",size:11,fill:"var(--ink-3)"});
    $("#orNote").innerHTML="<b>Špatná orientace.</b> Sterický faktor <span class='q'>P</span> říká, jaký podíl srážek má správnou geometrii. U&nbsp;NO + O₃ je to řádově desetina; u&nbsp;velkých organických molekul s&nbsp;jediným reaktivním místem třeba tisícina. Enzymy jsou tak účinné právě proto, že substrát ve svém aktivním místě natočí správně — zvyšují <span class='q'>P</span>.";
  } else {
    s+=line(nox-44,oy,nox,oy,{c:"var(--ink-3)",w:5,cap:"round"})+atom(nox-44,oy,18,O,"O")+atom(nox,oy,18,N,"N");
    s+=line(nox+26,oy,nox+90,oy,{c:"var(--warn)",w:3,cap:"round",dash:"6 5"})+'<path d="M'+(nox+94)+' '+oy+' l-12 -6 l0 12 z" style="fill:var(--warn)"/>';
    s+=txt(nox+60,oy-14,"E < Eₐ",{anchor:"middle",size:11.5,w:700,fill:"var(--warn)",mono:true});
    s+=txt(nox-22,oy+58,"NO — správně, ale pomalu",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
    s+=txt(350,30,"NEÚČINNÁ SRÁŽKA → málo energie",{anchor:"middle",size:13,w:700,fill:"var(--warn)",style:"letter-spacing:.06em"});
    s+=txt(350,H-16,"Orientace je správná, ale energie nestačí na rozvolnění vazby O–O v ozonu; částice se jen dotknou a odrazí.",{anchor:"middle",size:11,fill:"var(--ink-3)"});
    $("#orNote").innerHTML="<b>Málo energie.</b> Tohle je zdaleka nejčastější osud srážky: pro Eₐ = 50 kJ·mol⁻¹ má při pokojové teplotě dost energie jen jedna srážka z&nbsp;miliardy. Zvýšení teploty tento podíl zvětšuje exponenciálně — proto je teplota tak silný faktor.";
  }
  $("#orWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Orientace srážky NO s ozonem"');
  pressGroup("#orMode",orMode);
}
function initOr(){
  $$("#orMode button").forEach(function(b){ b.addEventListener("click",function(){ orMode=b.dataset.v; drawOr(); }); });
  drawOr();
}

/* ---- energetický profil ---- */
var epState={type:"exo",cat:0,steps:1,slow:1,Ea:75};
function drawEp(){
  var st=epState, W=760,H=330,L=64,R=712,T=30,B=272;
  var dH = st.type==="exo" ? -60 : 60;
  var f = st.cat ? 0.6 : 1;
  /* geometrie hladin */
  var levels=[], peaks=[], ptsF=function(scale){
    var pts=[[L,0]], lv=[0], pk=[];
    if(st.steps===1){
      var b=st.Ea*scale; b=Math.max(b,dH+12);
      pk.push(b); pts.push([(L+R)/2,b]); pts.push([R-80,dH]); lv.push(dH);
    } else {
      var EI = 0.5*dH + 20;
      var b1 = (st.slow===1? st.Ea : 0.45*st.Ea)*scale, b2 = (st.slow===2? st.Ea : 0.45*st.Ea)*scale;
      b1=Math.max(b1,EI+12); var p1=b1;
      var p2=EI+Math.max(b2,(dH-EI)+12);
      pk.push(p1,p2);
      pts.push([L+190,p1]); pts.push([(L+R)/2,EI]); pts.push([R-190,p2]); pts.push([R-80,dH]);
      lv.push(EI,dH);
    }
    pts.push([R,dH]);
    return {pts:pts,pk:pk,lv:lv};
  };
  var g=ptsF(f), g0=ptsF(1);
  var maxPeak=Math.max.apply(null,g.pk), maxPeak0=Math.max.apply(null,g0.pk);
  var Emax=Math.max(maxPeak0,maxPeak)+28, Emin=Math.min(0,dH)-24;
  var y=function(E){ return B-(E-Emin)/(Emax-Emin)*(B-T); };
  var toXY=function(p){ return [p[0],y(p[1])]; };
  var s='';
  s+=gAxes({L:L,R:R,T:T,B:B,xl:"reakční koordináta",yl:"energie",yx:22,xly:28});
  s+=line(L,y(0),R,y(0),{c:"var(--line)",w:1,dash:"3 4"});
  s+=line(L,y(dH),R,y(dH),{c:"var(--line)",w:1,dash:"3 4"});
  if(st.cat){ s+='<path d="'+smoothPath(g0.pts.map(toXY))+'" style="fill:none;stroke:var(--ink-3);stroke-width:1.8;stroke-dasharray:6 5"/>'; s+=txt(g0.pts[1][0],y(g0.pk[0])-12,"bez katalyzátoru",{anchor:"middle",size:10.5,fill:"var(--ink-3)"}); }
  var col= st.cat?"var(--ok)":"var(--ink-2)";
  s+='<path d="'+smoothPath(g.pts.map(toXY))+'" style="fill:none;stroke:'+col+';stroke-width:2.6;stroke-linejoin:round;stroke-linecap:round"/>';
  /* vrcholy a údolí */
  var pkIdx = st.steps===1 ? [1] : [1,3];
  pkIdx.forEach(function(ix,i){
    var p=g.pts[ix];
    s+='<circle cx="'+p[0]+'" cy="'+y(p[1])+'" r="5" style="fill:var(--surface);stroke:'+col+';stroke-width:2"/>';
    var lab = st.steps===1 ? "aktivovaný komplex ‡" : ("‡ "+(i+1)+". krok"+(((st.slow===1&&i===0)||(st.slow===2&&i===1))?" · pomalý":" · rychlý"));
    s+=txt(p[0],y(p[1])-(st.cat?26:12),lab,{anchor:"middle",size:11,w:600,fill:col});
  });
  if(st.steps===2){ var vI=g.pts[2]; s+='<circle cx="'+vI[0]+'" cy="'+y(vI[1])+'" r="4.5" style="fill:var(--cat2);stroke:var(--surface);stroke-width:2"/>'; s+=txt(vI[0],y(vI[1])+18,"meziprodukt (údolí)",{anchor:"middle",size:11,w:600,fill:"var(--cat2)"}); }
  /* šipky */
  var xa=L+40;
  s+=vArrow(xa+70,y(0),y(maxPeak),"var(--accent)","Eₐ(→) = "+fmt(maxPeak,0),"left");
  s+=vArrow(R-40,y(dH),y(maxPeak),"var(--cat3)","Eₐ(←) = "+fmt(maxPeak-dH,0),"left");
  var dcol = dH<0?"var(--exo)":"var(--endo)";
  s+=vArrow(R-120,y(0),y(dH),dcol,"ΔH = "+sgn(dH,0),"left");
  s+=txt(L+4,y(0)-8,"výchozí látky",{size:12,w:600,fill:"var(--ink)"});
  s+=txt(R-2,y(dH)+(dH<0?18:-8),"produkty",{anchor:"end",size:12,w:600,fill:"var(--ink)"});
  $("#epWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Energetický profil reakce"');
  pressGroup("#epType",st.type); pressGroup("#epCat",st.cat); pressGroup("#epSteps",st.steps); pressGroup("#epSlow",st.slow);
  $("#epEaV").textContent=st.Ea+" kJ·mol⁻¹";
  setRo("#epRo1","Eₐ přímé reakce",fmt(maxPeak,0)+" kJ·mol⁻¹",st.cat?"s katalyzátorem (bez: "+fmt(maxPeak0,0)+")":"reaktanty → nejvyšší vrchol","");
  setRo("#epRo2","Eₐ zpětné reakce",fmt(maxPeak-dH,0)+" kJ·mol⁻¹",dH<0?"vyšší než přímá — exotermická":"nižší než přímá — endotermická","");
  setRo("#epRo3","ΔH = Eₐ(→) − Eₐ(←)",sgn(dH,0)+" kJ·mol⁻¹",st.cat?"katalyzátor ji nezměnil":(dH<0?"exotermická":"endotermická"),dH<0?"neg":"pos");
  var note="";
  if(st.steps===1 && !st.cat) note="Jediný vrchol = jediný aktivovaný komplex, jeden elementární krok. Přepněte exo/endo a&nbsp;sledujte, že <b>ΔH je rozdíl hladin</b>, kdežto Eₐ je výška kopce — spolu nesouvisí.";
  else if(st.steps===1 && st.cat) note="Katalyzátor snížil vrchol o&nbsp;40 %: klesla Eₐ přímé <b>i</b> zpětné reakce o&nbsp;stejných "+fmt(maxPeak0-maxPeak,0)+" kJ·mol⁻¹, ale hladiny výchozích látek a&nbsp;produktů — a&nbsp;tedy ΔH — zůstaly. Proto katalyzátor neposune rovnováhu.";
  else note="Dva vrcholy a&nbsp;mezi nimi údolí: <b>meziprodukt</b> je skutečná částice (v&nbsp;údolí), <b>aktivovaný komplex</b> je vrchol. Rychlost určuje krok s&nbsp;vyšší bariérou — teď je to "+st.slow+". krok. Přepněte pomalý krok a&nbsp;sledujte, který vrchol vyroste."+(st.cat?" Katalyzátor snížil oba vrcholy, ale údolí i&nbsp;hladiny zůstaly.":"");
  $("#epNote").innerHTML=note;
}
function initEp(){
  $$("#epType button").forEach(function(b){ b.addEventListener("click",function(){ epState.type=b.dataset.v; drawEp(); }); });
  $$("#epCat button").forEach(function(b){ b.addEventListener("click",function(){ epState.cat=+b.dataset.v; drawEp(); }); });
  $$("#epSteps button").forEach(function(b){ b.addEventListener("click",function(){ epState.steps=+b.dataset.v; drawEp(); }); });
  $$("#epSlow button").forEach(function(b){ b.addEventListener("click",function(){ epState.slow=+b.dataset.v; drawEp(); }); });
  $("#epEa").addEventListener("input",function(){ epState.Ea=+this.value; drawEp(); });
  drawEp();
}
