/* ============================================================
   20 · k6 — ELEKTROLYZÉR
   ============================================================ */
var ezId="nacl";
function drawElyz(){
  var e=EL_(ezId), W=760, H=352, s='';
  s+=panelTitle(e.nm);
  /* vana */
  var vx=90, vy=92, vw=W-260, vh=190;
  s+=rect(vx,vy,vw,vh,{fill:"var(--surface-2)",r:10,stroke:"var(--line-strong)",sw:1.6});
  s+=rect(vx+8,vy+42,vw-16,vh-52,{fill:"var(--accent)",r:7,style:"fill-opacity:.14"});
  s+=txt(vx+vw/2,vy+vh-14,e.lat,{anchor:"middle",size:11,w:600,fill:"var(--accent)"});
  s+=txt(vx+vw/2,vy+vh+22,e.el,{anchor:"middle",size:11,fill:"var(--ink-3)"});
  /* elektrody */
  var ew=46, ay=vy+30, ah=vh-60;
  s+=rect(vx+40,ay,ew,ah,{fill:"var(--endo)",r:5,style:"fill-opacity:.75"});
  s+=txt(vx+40+ew/2,ay-10,"KATODA (−)",{anchor:"middle",size:11,w:700,fill:"var(--endo)"});
  s+=rect(vx+vw-40-ew,ay,ew,ah,{fill:"var(--exo)",r:5,style:"fill-opacity:.75"});
  s+=txt(vx+vw-40-ew/2,ay-10,"ANODA (+)",{anchor:"middle",size:11,w:700,fill:"var(--exo)"});
  /* ionty */
  s+=hArrow(vx+vw-100,vx+120,vy+vh/2-16,"var(--endo)","kationty ke katodě",false);
  s+=hArrow(vx+120,vx+vw-100,vy+vh/2+34,"var(--exo)","anionty k anodě",false);
  /* zdroj */
  s+=line(vx+40+ew/2,ay,vx+40+ew/2,vy-34,{c:"var(--line-strong)",w:2});
  s+=line(vx+vw-40-ew/2,ay,vx+vw-40-ew/2,vy-34,{c:"var(--line-strong)",w:2});
  s+=line(vx+40+ew/2,vy-34,vx+vw-40-ew/2,vy-34,{c:"var(--line-strong)",w:2});
  var mx=(vx+40+ew/2+vx+vw-40-ew/2)/2;
  s+=rect(mx-40,vy-48,80,28,{fill:"var(--surface-3)",r:6,stroke:"var(--line-strong)",sw:1.2});
  s+=txt(mx,vy-29,e.u,{anchor:"middle",size:12,w:700,mono:true,fill:"var(--ink)"});
  s+=txt(mx,vy-56,"stejnosměrný zdroj",{anchor:"middle",size:10,fill:"var(--ink-3)"});
  /* produkty */
  s+=txt(vx+40+ew/2,vy+vh+42,"produkt: kov",{anchor:"middle",size:11,w:700,fill:"var(--endo)"});
  s+=txt(vx+vw-40-ew/2,vy+vh+42,"produkt: "+(e.prod.split("+")[1]||"").trim(),{anchor:"middle",size:11,w:700,fill:"var(--exo)"});
  /* teplotní štítek */
  s+=rect(W-152,vy,138,74,{fill:"var(--surface-3)",r:8,stroke:"var(--line)",sw:1});
  s+=txt(W-140,vy+22,"teplota",{size:10.5,w:600,fill:"var(--ink-3)"});
  s+=txt(W-140,vy+42,e.tep,{size:13,w:700,mono:true,fill:"var(--ink)"});
  s+=txt(W-140,vy+62,"napětí "+e.u,{size:11,mono:true,fill:"var(--ink-2)"});
  $("#ezWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Schéma elektrolyzéru: '+e.nm+'"');
  $("#ezKat").innerHTML='<b>katoda (redukce):</b> <span class="chem">'+e.kat+'</span>';
  $("#ezAn").innerHTML='<b>anoda (oxidace):</b> <span class="chem">'+e.an+'</span>';
  $("#ezTot").innerHTML='<b>celkově:</b> <span class="chem">'+e.tot+'</span>';
  ro("#ezRo1","pracovní teplota",e.tep,ezId==="cu"||ezId==="zn"?"vodný roztok":"tavenina soli","");
  ro("#ezRo2","napětí na článku",e.u,ezId==="cu"?"velmi nízké — stačí jen na měď":"vysoké — tavná elektrolýza je energeticky náročná",ezId==="cu"?"pos":"neg");
  ro("#ezRo3","produkt",e.prod,"na katodě vzniká kov","");
  $("#ezWhy").innerHTML='<div class="callout def" style="margin:0 0 .8rem"><span class="eyebrow">Proč právě takhle</span><p>'+e.why+'</p></div>'+
    '<div class="callout tip" style="margin:0"><span class="eyebrow">Poznámka k technologii</span><p>'+e.poz+'</p></div>';
  $("#ezNote").innerHTML = ezId==="cu"
    ? "Rafinace mědi je jediná z&nbsp;pětice, kde se kov <b>nevyrábí, ale jen přemisťuje</b> z&nbsp;anody na katodu. Proto stačí dvě desetiny voltu — a&nbsp;právě to nízké napětí je celé kouzlo: na měď stačí, na příměsi ne."
    : "Porovnejte napětí jednotlivých technologií: tavné elektrolýzy potřebují 4 až 7 V, kdežto rafinace mědi jen dvě desetiny voltu. Přepněte na rafinaci mědi a&nbsp;podívejte se proč.";
}
function initElyz(){
  $$("#ezSeg button").forEach(function(b){
    b.addEventListener("click",function(){ ezId=this.dataset.ez; segSet("#ezSeg",ezId,"ez"); drawElyz(); });
  });
  drawElyz();
}

/* ============================================================
   21 · k6 — FARADAYOVA KALKULAČKA
   ============================================================ */
var FDM = {
  Al:{n:"hliník", M:26.98, z:3, U:4.2},
  Na:{n:"sodík",  M:22.99, z:1, U:7.0},
  Mg:{n:"hořčík", M:24.31, z:2, U:6.0},
  Cu:{n:"měď",    M:63.55, z:2, U:0.25},
  Zn:{n:"zinek",  M:65.38, z:2, U:3.4},
  Ag:{n:"stříbro",M:107.87,z:1, U:2.0}
};
function drawFar(){
  var key=$("#fdSel").value, d=FDM[key];
  var I=+$("#fdI").value, hrs=+$("#fdT").value, y=+$("#fdY").value/100;
  $("#fdIv").textContent = I>=1000 ? fmt(I/1000,1)+" MA" : (I<1?fmt(I*1000,0)+" A":I+" kA");
  $("#fdTv").textContent = hrs+" h";
  $("#fdYv").textContent = Math.round(y*100)+" %";
  var Iamp=I*1000, t=hrs*3600;
  var mTeor = d.M*Iamp*t/(d.z*FAR);          /* g */
  var mReal = mTeor*y;
  var W_J = d.U*Iamp*t;                       /* J */
  var kWh = W_J/3.6e6;
  var kWhkg = mReal>0 ? kWh/(mReal/1000) : 0;
  var W=760,H=190,s='';
  s+=panelTitle("bilance elektrolýzy · "+d.n);
  /* pruhový vývoj hmotnosti v čase */
  var x0=60, gw=W-120, y0=48, gh=86;
  s+=line(x0,y0+gh,x0+gw,y0+gh,{c:"var(--line-strong)",w:1.4});
  s+=line(x0,y0,x0,y0+gh,{c:"var(--line-strong)",w:1.4});
  var pts="";
  for(var i=0;i<=20;i++){
    var xx=x0+i*gw/20, yy=y0+gh-(i/20)*gh;
    pts+=(i?" L":"M")+xx+" "+yy;
  }
  s+='<path d="'+pts+'" style="fill:none;stroke:var(--accent);stroke-width:2.6"/>';
  s+='<path d="'+pts+' L'+(x0+gw)+' '+(y0+gh)+' L'+x0+' '+(y0+gh)+' Z" style="fill:var(--accent);fill-opacity:.13"/>';
  s+=txt(x0-8,y0+6,fmt(mReal/1000,1),{anchor:"end",size:10.5,mono:true,w:700,fill:"var(--accent)"});
  s+=txt(x0-8,y0+gh+4,"0",{anchor:"end",size:10,mono:true,fill:"var(--ink-3)"});
  s+=txt(x0+gw,y0+gh+18,hrs+" h",{anchor:"end",size:10.5,mono:true,fill:"var(--ink-3)"});
  s+=txt(x0,y0+gh+18,"0 h",{size:10.5,mono:true,fill:"var(--ink-3)"});
  s+=txt(x0+10,y0+18,"hmotnost kovu [kg] roste lineárně s prošlým nábojem",{size:11,w:600,fill:"var(--ink-2)"});
  s+=txt(W-14,y0+gh+38,"m = M·I·t / (z·F)",{anchor:"end",size:11.5,w:700,mono:true,fill:"var(--accent)"});
  $("#fdWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Bilance elektrolýzy"');
  ro("#fdRo1","vyrobený kov", mReal>=1e6 ? fmt(mReal/1e6,2)+" t" : (mReal>=1000 ? fmt(mReal/1000,1)+" kg" : fmt(mReal,0)+" g"),
     "teoreticky "+(mTeor>=1000?fmt(mTeor/1000,1)+" kg":fmt(mTeor,0)+" g")+" při 100 % výtěžnosti","pos");
  ro("#fdRo2","spotřebovaná energie", kWh>=1000 ? fmt(kWh/1000,2)+" MWh" : fmt(kWh,0)+" kWh",
     "při napětí "+fmt(d.U,2)+" V","neg");
  ro("#fdRo3","spotřeba na kilogram", fmt(kWhkg,1)+" kWh·kg⁻¹",
     key==="Al" ? "průmyslová hodnota je 13 až 15" : "z = "+d.z+", M = "+fmt(d.M,2)+" g·mol⁻¹","");
  var note;
  if(key==="Al") note="Typická vana pracuje se 150 až 350&nbsp;kA. Všimněte si, že spotřeba na kilogram <b>nezávisí na proudu ani na čase</b> — je dána jen napětím, molární hmotností a&nbsp;počtem elektronů. Snížit ji jde tedy hlavně snížením napětí.";
  else if(key==="Cu") note="U&nbsp;rafinace mědi je napětí jen 0,25 V, takže spotřeba na kilogram je zhruba padesátkrát nižší než u&nbsp;hliníku. To je rozdíl mezi <b>výrobou</b> kovu a&nbsp;jeho pouhým <b>přemístěním</b> z&nbsp;anody na katodu.";
  else if(key==="Ag") note="Stříbro potřebuje jen <b>jeden</b> elektron na atom a&nbsp;má vysokou molární hmotnost — proto ho při stejném proudu vznikne mnohem víc než hliníku. Porovnejte obojí při stejném nastavení.";
  else note="Zkuste změnit proudovou výtěžnost. Ztracený proud jde na vedlejší děje (zpětné rozpouštění kovu, vývoj plynu) a&nbsp;projeví se přímo ve spotřebě energie na kilogram.";
  $("#fdNote").innerHTML=note;
}

/* ============================================================
   22 · k7 — VYSOKÁ PEC
   ============================================================ */
function pecZone(h){
  var best=PEC[0];
  for(var i=0;i<PEC.length;i++){ if(h>=PEC[i].h) best=PEC[i]; }
  return best;
}
function drawPec(){
  var h=+$("#vpH").value, z=pecZone(h);
  $("#vpHv").textContent=h+" %";
  var W=760, H=434, s='';
  s+=panelTitle("vysoká pec · "+z.z);
  /* silueta pece */
  var cx=200, top=68, bot=H-52;
  var wTop=88, wBelly=150, wBot=76;
  var yBelly=top+(bot-top)*0.42, yBosh=top+(bot-top)*0.78;
  var path="M"+(cx-wTop/2)+" "+top+" L"+(cx+wTop/2)+" "+top+
           " L"+(cx+wBelly/2)+" "+yBelly+" L"+(cx+wBot/2)+" "+yBosh+
           " L"+(cx+wBot/2)+" "+bot+" L"+(cx-wBot/2)+" "+bot+
           " L"+(cx-wBot/2)+" "+yBosh+" L"+(cx-wBelly/2)+" "+yBelly+" Z";
  s+='<path d="'+path+'" style="fill:var(--surface-2);stroke:var(--line-strong);stroke-width:1.8"/>';
  /* barevný teplotní gradient po zónách */
  PEC.forEach(function(p,i){
    var y1=top+(bot-top)*p.h/100;
    var y2=(i<PEC.length-1)? top+(bot-top)*PEC[i+1].h/100 : bot;
    var frac=i/(PEC.length-1);
    var col= frac<0.4 ? "var(--endo)" : (frac<0.72 ? "var(--warn)" : "var(--exo)");
    var wy1 = y1<yBelly ? wTop+(wBelly-wTop)*(y1-top)/(yBelly-top) : (y1<yBosh ? wBelly+(wBot-wBelly)*(y1-yBelly)/(yBosh-yBelly) : wBot);
    s+=rect(cx-wy1/2+3,y1,wy1-6,Math.max(2,y2-y1),{fill:col,r:2,style:"fill-opacity:.2"});
  });
  /* aktuální hloubka */
  var yh=top+(bot-top)*h/100;
  s+=line(cx-100,yh,cx+112,yh,{c:"var(--accent)",w:2.6});
  s+=circ(cx+112,yh,6,{fill:"var(--accent)"});
  s+=txt(cx,yh-10,z.t,{anchor:"middle",size:12.5,w:700,fill:"var(--accent)"});
  /* vsázka nahoře a proudy */
  s+=txt(cx,top-30,"vsázka: ruda + koks + vápenec",{anchor:"middle",size:11,w:600,fill:"var(--ink-2)"});
  s+=line(cx,top-20,cx,top-4,{c:"var(--ink-3)",w:2});
  s+='<path d="M'+cx+' '+(top-2)+' l-4.5 -8 l9 0 z" style="fill:var(--ink-3)"/>';
  s+=txt(cx-wTop/2-14,top+16,"kychtový plyn ↑",{anchor:"end",size:10.5,w:600,fill:"var(--ink-3)"});
  s+=txt(cx+wBot/2+16,yBosh+16,"← horký vzduch (výfučny)",{size:10.5,w:600,fill:"var(--exo)"});
  s+=txt(cx,bot+18,"odpich: surové železo a struska",{anchor:"middle",size:11,w:600,fill:"var(--ink-2)"});
  /* pravý sloupec — seznam zón */
  var lx=400, ly=64;
  s+=txt(lx,ly-14,"ZÓNY SHORA DOLŮ",{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
  PEC.forEach(function(p,i){
    var yy=ly+i*46, on=(p.z===z.z);
    s+=rect(lx,yy,330,40,{fill:on?"var(--accent)":"var(--surface-2)",r:7,style:on?"":"fill-opacity:.6"});
    s+=txt(lx+10,yy+17,p.z,{size:11.5,w:700,fill:on?"var(--accent-ink)":"var(--ink)"});
    s+=txt(lx+10,yy+33,p.rn,{size:10.5,fill:on?"var(--accent-ink)":"var(--ink-3)",style:on?"opacity:.9":""});
    s+=txt(lx+320,yy+25,p.t,{anchor:"end",size:11,w:700,mono:true,fill:on?"var(--accent-ink)":"var(--ink-2)"});
  });
  $("#vpWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Vysoká pec a její zóny"');
  ro("#vpRo1","zóna",z.z,"hloubka "+h+" % výšky pece","");
  ro("#vpRo2","teplota",z.t,"roste směrem dolů","");
  ro("#vpRo3","co se tu děje",z.rn,"","");
  $("#vpEq").innerHTML = z.r==="—" ? '<span style="color:var(--ink-3)">Tady zatím žádná chemická reakce neprobíhá — vsázka se jen suší a předehřívá.</span>' : '<b class="chem">'+z.r+'</b>';
  $("#vpText").innerHTML='<div class="callout def" style="margin:0"><span class="eyebrow">'+z.z+' · '+z.t+'</span><p>'+z.d+'</p></div>';
  $("#vpNote").innerHTML = h>=54 && h<=72
    ? "Jste v&nbsp;pásmu, kde se rozbíhá <b>Boudouardova reakce</b>. Nad 900 °C se oxid uhličitý setkává se žhavým koksem a&nbsp;mění se zpátky na oxid uhelnatý — tím se z&nbsp;nepřímé redukce stává přímá a&nbsp;spotřeba koksu roste."
    : "Sjeďte posuvníkem od kychty k&nbsp;nístěji a&nbsp;sledujte, jak se s&nbsp;rostoucí teplotou mění reakce. Pec je protiproudý reaktor: vsázka klesá, plyny stoupají.";
}

/* ============================================================
   23 · k7 — UHLÍK V OCELI
   ============================================================ */
var UCPASMA = [
 {to:0.02, nm:"technicky čisté železo", uz:"jádra transformátorů, elektrotechnika", col:"var(--cat1)",
  d:"Prakticky bez uhlíku. Měkké, dobře tvárné, magneticky měkké — magnetizaci rychle získá i&nbsp;ztratí, což je přesně to, co potřebuje jádro transformátoru."},
 {to:0.25, nm:"nízkouhlíková ocel", uz:"plechy karoserií, profily, trubky, svařované konstrukce", col:"var(--exo)",
  d:"Nejběžnější konstrukční materiál. Dobře se svařuje a&nbsp;tváří, ale kalit se prakticky nedá — uhlíku je málo na to, aby vznikl tvrdý martenzit."},
 {to:0.60, nm:"středněuhlíková ocel", uz:"hřídele, ozubená kola, kolejnice, kladiva", col:"var(--exo)",
  d:"Kompromis mezi pevností a&nbsp;tvárností. Dá se kalit a&nbsp;popouštět, takže se z&nbsp;ní vyrábějí namáhané strojní součásti."},
 {to:2.11, nm:"vysokouhlíková (nástrojová) ocel", uz:"vrtáky, nože, pilníky, pružiny", col:"var(--warn)",
  d:"Velmi tvrdá po zakalení, ale hůř svařitelná a&nbsp;křehčí. Horní hranice 2,11 % je maximální rozpustnost uhlíku v&nbsp;austenitu — nad ní už ocel není."},
 {to:4.30, nm:"litina", uz:"bloky motorů, kanálové poklopy, radiátory, lože obráběcích strojů", col:"var(--endo)",
  d:"Nekujná a&nbsp;křehká, protože přebytečný uhlík se vyloučí jako křehký karbid Fe₃C nebo jako grafitové lupínky. Zato výborně zabíhá do formy a&nbsp;tlumí chvění — proto se odlévá."},
 {to:9.99, nm:"surové železo (nepoužitelné přímo)", uz:"vsázka do ocelárny", col:"var(--bad)",
  d:"To, co vytéká z&nbsp;vysoké pece. Musí se zkujnit — přebytečný uhlík se spálí kyslíkem v&nbsp;konvertoru."}
];
function ucPasmo(c){ for(var i=0;i<UCPASMA.length;i++){ if(c<=UCPASMA[i].to) return UCPASMA[i]; } return UCPASMA[5]; }
/* přibližná likvidová teplota podle obsahu uhlíku (rovnovážný diagram Fe–C, zjednodušeně) */
function ucTt(c){
  if(c<=4.3) return 1538 - (1538-1147)*Math.pow(c/4.3,0.72);
  return 1147 + (c-4.3)*40;
}
function drawUhlik(){
  var c=+$("#ucC").value/100, p=ucPasmo(c);
  $("#ucCv").textContent=fmt(c,2)+" %";
  var W=760, H=300, s='';
  s+=panelTitle("obsah uhlíku "+fmt(c,2)+" % · "+p.nm);
  /* pásmová osa */
  var x0=60, gw=W-120, y=76;
  function X(v){ return x0+Math.min(v,4.6)/4.6*gw; }
  var lo=0;
  UCPASMA.forEach(function(z){
    var hi=Math.min(z.to,4.6);
    if(hi<=lo) return;
    s+=rect(X(lo),y-26,X(hi)-X(lo),26,{fill:z.col,r:4,style:"fill-opacity:.3"});
    if(X(hi)-X(lo)>78) s+=txt((X(lo)+X(hi))/2,y-8,z.nm.split(" ")[0],{anchor:"middle",size:10.5,w:700,fill:"var(--ink)"});
    lo=hi;
  });
  s+=line(x0,y,x0+gw,y,{c:"var(--line-strong)",w:1.4});
  [0,0.5,1,1.5,2,2.5,3,3.5,4,4.5].forEach(function(v){
    s+=line(X(v),y-3,X(v),y+5,{c:"var(--line-strong)",w:1});
    s+=txt(X(v),y+18,fmt(v,1),{anchor:"middle",size:9.5,mono:true,fill:"var(--ink-3)"});
  });
  s+=line(X(2.11),y-34,X(2.11),y+24,{c:"var(--bad)",w:2.2,dash:"5 4"});
  s+=txt(X(2.11),y-40,"2,11 % — hranice ocel / litina",{anchor:"middle",size:10.5,w:700,fill:"var(--bad)"});
  s+=line(X(c),y-40,X(c),y+8,{c:"var(--accent)",w:2.6});
  s+='<path d="M'+X(c)+' '+(y-40)+' l-5 -9 l10 0 z" style="fill:var(--accent)"/>';
  /* křivka teploty tání */
  var gy=124, gh=104;
  s+=txt(x0,gy-8,"TEPLOTA TÁNÍ [°C] — MINIMUM JE EUTEKTIKUM PŘI 4,3 %",{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.05em"});
  s+=rect(x0,gy,gw,gh,{fill:"var(--surface-2)",r:7});
  function Yt(T){ return gy+gh-8-(T-1100)/(1600-1100)*(gh-24); }
  var pts="";
  for(var i=0;i<=46;i++){ var vv=i/10, xx=X(vv), yy=Yt(ucTt(vv)); pts+=(i?" L":"M")+xx+" "+yy; }
  s+='<path d="'+pts+'" style="fill:none;stroke:var(--warn);stroke-width:2.4"/>';
  [1538,1400,1300,1147].forEach(function(T){
    s+=line(x0,Yt(T),x0+gw,Yt(T),{c:"var(--grid)",w:1});
    s+=txt(x0-6,Yt(T)+4,String(T),{anchor:"end",size:9.5,mono:true,fill:"var(--ink-3)"});
  });
  var tt=ucTt(c);
  s+=circ(X(c),Yt(tt),6,{fill:"var(--accent)",stroke:"var(--paper)",sw:2});
  s+=txt(X(c)+10,Yt(tt)+4,fmt(tt,0)+" °C",{size:11,w:700,mono:true,fill:"var(--accent)"});
  /* pruhy tvrdost / tažnost */
  var by=gy+gh+22, bw=290;
  var tvrd=Math.min(1,Math.pow(c/2.2,0.65)), tazn=Math.max(0.03,1-Math.pow(c/2.4,0.55));
  s+=txt(x0,by-6,"TVRDOST",{size:10,w:700,fill:"var(--ink-3)"});
  s+=rect(x0,by,bw,14,{fill:"var(--surface-3)",r:4});
  s+=rect(x0,by,bw*tvrd,14,{fill:"var(--exo)",r:4});
  s+=txt(x0+340,by-6,"TVÁRNOST (KUJNOST)",{size:10,w:700,fill:"var(--ink-3)"});
  s+=rect(x0+340,by,bw,14,{fill:"var(--surface-3)",r:4});
  s+=rect(x0+340,by,bw*tazn,14,{fill:"var(--endo)",r:4});
  $("#ucWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Vliv obsahu uhlíku na vlastnosti železa"');
  ro("#ucRo1","materiál",p.nm,"při "+fmt(c,2)+" % uhlíku", c<=2.11?"pos":"neg");
  ro("#ucRo2","přibližná teplota tání",fmt(tt,0)+" °C", c<0.1?"blízko čistému železu (1538 °C)":"uhlík ji snižuje","");
  ro("#ucRo3","kujnost", c<=0.25?"velmi dobrá":(c<=2.11?"omezená":"žádná — jen odlévání"), c<=2.11?"lze kovat a válcovat":"materiál je křehký", c<=2.11?"pos":"neg");
  $("#ucText").innerHTML='<div class="callout def" style="margin:0"><span class="eyebrow">'+p.nm+'</span><p>'+p.d+'</p><p style="margin-top:.4rem"><b>Použití:</b> '+p.uz+'</p></div>';
  $("#ucNote").innerHTML = c>2.11
    ? "Jste nad hranicí 2,11 %. Uhlík se už do austenitu nevejde a&nbsp;vylučuje se jako karbid <span class='chem'>Fe₃C</span> nebo grafit — materiál je <b>křehký a&nbsp;nekujný</b>. Zato taje o&nbsp;stovky stupňů níž než čisté železo, takže se výborně odlévá."
    : "Posuňte se přes hranici 2,11 % a&nbsp;sledujte, jak se materiál skokem změní z&nbsp;kujné oceli na křehkou litinu. Zajímavá je i&nbsp;křivka teploty tání: nejníž leží kolem 4,3 % uhlíku, což je <b>eutektické</b> složení.";
}
