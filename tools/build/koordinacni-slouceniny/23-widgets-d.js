/* ============================================================
   13 · KAPITOLA 5 — VYSOKOSPINOVÝ × NÍZKOSPINOVÝ
   P = párovací energie [cm⁻¹] podle běžných tabulek
   ============================================================ */
var HSION = [
 {nm:"Ti³⁺", d:1, P:null, pozn:"jediné možné uspořádání"},
 {nm:"V³⁺",  d:2, P:null, pozn:"jediné možné uspořádání"},
 {nm:"Cr³⁺", d:3, P:null, pozn:"jediné možné uspořádání — proto jsou chromité komplexy vždy paramagnetické"},
 {nm:"Cr²⁺", d:4, P:23500,pozn:"volba mezi dvěma uspořádáními"},
 {nm:"Mn³⁺", d:4, P:28000,pozn:"volba mezi dvěma uspořádáními"},
 {nm:"Mn²⁺", d:5, P:25500,pozn:"volba mezi dvěma uspořádáními"},
 {nm:"Fe³⁺", d:5, P:30000,pozn:"volba mezi dvěma uspořádáními"},
 {nm:"Fe²⁺", d:6, P:17600,pozn:"volba mezi dvěma uspořádáními"},
 {nm:"Co³⁺", d:6, P:21000,pozn:"volba mezi dvěma uspořádáními"},
 {nm:"Co²⁺", d:7, P:22500,pozn:"volba mezi dvěma uspořádáními"},
 {nm:"Ni²⁺", d:8, P:null, pozn:"jediné možné uspořádání"},
 {nm:"Cu²⁺", d:9, P:null, pozn:"jediné možné uspořádání"},
 {nm:"Zn²⁺", d:10,P:null, pozn:"zaplněné orbitaly d — žádné štěpení se neprojeví"}
];
var hsState={i:8, delta:12000};
function hsObj(){ return HSION[hsState.i]; }
function hsNizko(){ var o=hsObj(); return !!(o.P && hsState.delta>o.P); }
/* rozdělení elektronů do t₂g (3 orbitaly) a e_g (2 orbitaly) */
function hsObsazeni(d, nizko){
  var t=[0,0,0], e=[0,0], por;
  if(nizko) por=[0,1,2,0,1,2,3,4,3,4];
  else      por=[0,1,2,3,4,0,1,2,3,4];
  for(var k=0;k<d;k++){ var p=por[k]; if(p<3) t[p]++; else e[p-3]++; }
  return {t:t, e:e};
}
function hsNepar(o){
  var n=0;
  o.t.forEach(function(x){ if(x===1) n++; });
  o.e.forEach(function(x){ if(x===1) n++; });
  return n;
}
/* elektron jako šipka (kreslí se čarami, ne textem) */
function eSipka(x,y,nahoru){
  var h=8, c="var(--ink)";
  var y1=nahoru?y+h:y-h, y2=nahoru?y-h:y+h;
  var s=line(x,y1,x,y2,{c:c,w:1.8,cap:"round"});
  var d=nahoru?1:-1;
  s+='<path d="M'+x+' '+y2+' l-3.6 '+(4.8*d)+' l7.2 0 z" style="fill:'+c+'"/>';
  return s;
}
function hsBox(x,y,w,n){
  var s=rect(x,y-11,w,22,{fill:"var(--surface-3)",r:2,stroke:"var(--line-strong)",sw:1.3});
  if(n===1) s+=eSipka(x+w/2,y,true);
  if(n===2){ s+=eSipka(x+w/2-7,y,true); s+=eSipka(x+w/2+7,y,false); }
  return s;
}
function hsDraw(){
  var o=hsObj(), nizko=hsNizko(), oc=hsObsazeni(o.d,nizko), np=hsNepar(oc);
  var W=680,H=400,yc=196,s="";
  s+=rect(6,6,W-12,H-12,{fill:"var(--surface-2)",r:14,stroke:"var(--line)",sw:1.2});
  var S=Math.max(70,Math.min(190, hsState.delta/35000*200));
  var yE=yc-0.6*S, yT=yc+0.4*S;
  /* e_g */
  var xe=300;
  for(var i=0;i<2;i++) s+=hsBox(xe+i*54,yE,42,oc.e[i]);
  s+=txt(xe+2*54+6,yE+5,'e<tspan font-size="9" dy="3">g</tspan>',
        {size:13.5,w:700,fill:"var(--accent)",style:"font-style:italic"});
  /* t_2g */
  var xt=246;
  for(var j=0;j<3;j++) s+=hsBox(xt+j*54,yT,42,oc.t[j]);
  s+=txt(xt+3*54+6,yT+5,'t<tspan font-size="9" dy="3">2g</tspan>',
        {size:13.5,w:700,fill:"var(--accent)",style:"font-style:italic"});
  /* Δ a P */
  s+=vArrow(190,yT,yE,"var(--exo)","Δ₀",'left');
  s+=txt(110,(yE+yT)/2+28,"Δ₀ = "+tis(hsState.delta)+" cm⁻¹",{anchor:"middle",size:12,w:600,fill:"var(--exo)",mono:true});
  if(o.P){
    s+=txt(110,(yE+yT)/2+50,"P = "+tis(o.P)+" cm⁻¹",{anchor:"middle",size:11.5,fill:"var(--endo)",mono:true});
    s+=txt(110,(yE+yT)/2+68,"párovací energie",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  }
  /* hlavička a patička */
  s+=txt(W/2,32,o.nm+"  ·  konfigurace d"+sup(String(o.d)),
        {anchor:"middle",size:15,w:700,fill:"var(--ink)"});
  var stav = o.P ? (nizko?"NÍZKOSPINOVÉ USPOŘÁDÁNÍ":"VYSOKOSPINOVÉ USPOŘÁDÁNÍ")
                 : "JEDINÉ MOŽNÉ USPOŘÁDÁNÍ";
  s+=txt(W/2,54,stav,{anchor:"middle",size:11.5,w:700,
        fill:o.P?(nizko?"var(--ok)":"var(--warn)"):"var(--ink-3)",style:"letter-spacing:.1em"});
  s+=txt(W/2,H-42,"nepárových elektronů = "+np+"   ·   μ = √("+np+"·("+np+"+2)) = "+
        fixed(muSpin(np),2)+" μ_B",{anchor:"middle",size:13,w:600,fill:"var(--ink)"});
  s+=txt(W/2,H-20,o.P ? (nizko?"Δ₀ > P — elektronům se vyplatí párovat se dole"
                              :"Δ₀ < P — levnější je obsadit i horní hladinu")
                      : "u této konfigurace vychází obě uspořádání stejně",
        {anchor:"middle",size:11.5,fill:"var(--ink-3)"});
  $("#hsWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Obsazení orbitalů d v oktaedrickém poli"');

  var cf=-0.4*(oc.t[0]+oc.t[1]+oc.t[2])+0.6*(oc.e[0]+oc.e[1]);
  ro("#hsRo1","Nepárových elektronů", String(np),
     np===0?"látka je diamagnetická":"látka je paramagnetická", np===0?"":"pos");
  ro("#hsRo2","Spinový magnetický moment μ", fixed(muSpin(np),2)+" μ_B",
     "μ = √(n·(n+2)), n je počet nepárových elektronů");
  ro("#hsRo3","Stabilizace krystalovým polem", fixed(cf,1)+" Δ₀",
     "CFSE = −0,4·(elektrony v t₂g) + 0,6·(elektrony v e_g)");
  var t=oc.t[0]+oc.t[1]+oc.t[2], e=oc.e[0]+oc.e[1];
  say("#hsSay","Konfigurace valenční sféry je <b>(t₂g)"+sup(String(t))+" (e_g)"+sup(String(e))+"</b>. "+
    (o.P
      ? ("Párovací energie tohohle iontu je P = "+tis(o.P)+" cm⁻¹. Nastavené štěpení Δ₀ = "+
         tis(hsState.delta)+" cm⁻¹ je tedy <b>"+(nizko?"větší":"menší")+"</b> než P, a proto vzniká "+
         (nizko?"nízkospinový":"vysokospinový")+" komplex s <b>"+np+"</b> nepárovými elektrony. "+
         "Posuňte posuvník přes hodnotu P a sledujte, jak elektrony přeskočí.")
      : ("U konfigurace d"+sup(String(o.d))+" vede Hundovo pravidlo i párování ke stejnému výsledku, "+
         "takže <b>na síle pole nezáleží</b> — magnetickým měřením se tady vysoké a nízké pole rozlišit nedá. "+
         "Rozdíl se projeví jen u konfigurací d⁴ až d⁷.")));
}
function initHs(){
  var sel=$("#hsIon");
  sel.innerHTML=HSION.map(function(o,i){
    return '<option value="'+i+'">'+o.nm+" — d"+sup(String(o.d))+'</option>';
  }).join("");
  sel.value=String(hsState.i);
  sel.addEventListener("change",function(){ hsState.i=+sel.value; hsDraw(); });
  $("#hsDelta").addEventListener("input",function(){
    hsState.delta=+this.value; $("#hsDeltaVal").textContent=tis(hsState.delta)+" cm⁻¹"; hsDraw();
  });
  $("#hsDeltaVal").textContent=tis(hsState.delta)+" cm⁻¹";
  hsDraw();
}

/* ============================================================
   14 · KAPITOLA 5 — ZE ZMĚŘENÉHO MOMENTU K POČTU ELEKTRONŮ
   ============================================================ */
var muVal=4.90;
var MUPRIK=[
 {vz:"[Fe(CN)₆]⁴⁻", mu:0.00, n:0, s:"nízkospinový d⁶ — všech šest elektronů spárováno v t₂g"},
 {vz:"[Co(NH₃)₆]³⁺", mu:0.00,n:0, s:"nízkospinový d⁶ — diamagnetický, proto bezbarvý roztok nesvítí v magnetu"},
 {vz:"[Fe(CN)₆]³⁻", mu:2.30, n:1, s:"nízkospinový d⁵ — jeden nepárový elektron"},
 {vz:"[Cu(H₂O)₆]²⁺",mu:1.90, n:1, s:"d⁹ — jediné uspořádání, vždy jeden nepárový elektron"},
 {vz:"[Ni(H₂O)₆]²⁺",mu:3.20, n:2, s:"d⁸ — dva nepárové elektrony v e_g"},
 {vz:"[Cr(H₂O)₆]³⁺",mu:3.85, n:3, s:"d³ — tři nepárové elektrony, na síle pole nezáleží"},
 {vz:"[CoF₆]³⁻",    mu:5.30, n:4, s:"vysokospinový d⁶ — fluorid dělá slabé pole"},
 {vz:"[FeF₆]³⁻",    mu:5.90, n:5, s:"vysokospinový d⁵ — všech pět elektronů nepárových"},
 {vz:"[Mn(H₂O)₆]²⁺",mu:5.92, n:5, s:"vysokospinový d⁵ — nejvyšší možný spinový moment"}
];
function muDraw(){
  var W=720,H=330,s="";
  s+=rect(6,6,W-12,H-12,{fill:"var(--surface-2)",r:14,stroke:"var(--line)",sw:1.2});
  var data=[];
  var best=0, bd=99;
  for(var n=0;n<=5;n++){
    var m=muSpin(n), dd=Math.abs(m-muVal);
    if(dd<bd){ bd=dd; best=n; }
  }
  for(var n2=0;n2<=5;n2++){
    data.push({lbl:"n = "+n2, val:muSpin(n2), col:"var(--cat"+(1+(n2%4))+")",
               top:fixed(muSpin(n2),2), hi:(n2===best)});
  }
  s+=barChart({x:74,y:74,w:600,h:180,data:data,dec:1,vmax:6.6,
               title:"SPINOVÝ MOMENT PODLE POČTU NEPÁROVÝCH ELEKTRONŮ",unit:"μ / μ_B"});
  /* čára naměřené hodnoty (popis je v nadpisu, aby se nekřížil se sloupci) */
  var y=74+180-(muVal/6.6)*180;
  s+=line(74,y,674,y,{c:"var(--bad)",w:2,dash:"7 4"});
  s+=txt(W/2,32,"Naměřený moment μ = "+fixed(muVal,2)+" μ_B (čárkovaná čára)  →  nepárových elektronů: "+best,
        {anchor:"middle",size:14,w:700,fill:"var(--ink)"});
  s+=txt(W/2,304,"Magnetické měření je přímá cesta k počtu nepárových elektronů,",
        {anchor:"middle",size:11.5,fill:"var(--ink-3)"});
  s+=txt(W/2,320,"a tedy k rozhodnutí, jestli je komplex vysokospinový, nebo nízkospinový.",
        {anchor:"middle",size:11.5,fill:"var(--ink-3)"});
  $("#muWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Od změřeného magnetického momentu k počtu nepárových elektronů"');
  ro("#muRo1","Nejbližší teoretická hodnota", fixed(muSpin(best),2)+" μ_B","pro n = "+best);
  ro("#muRo2","Počet nepárových elektronů", String(best), best===0?"diamagnetická látka":"paramagnetická látka");
  ro("#muRo3","Odchylka od teorie", fixed(Math.abs(muSpin(best)-muVal),2)+" μ_B",
     "u těžších kovů ji zvětšuje příspěvek orbitálního momentu");
}
function initMu(){
  $("#muRange").addEventListener("input",function(){
    muVal=+this.value/100; $("#muVal").textContent=fixed(muVal,2)+" μ_B"; muDraw();
  });
  $("#muVal").textContent=fixed(muVal,2)+" μ_B";
  var sel=$("#muPrik");
  sel.innerHTML='<option value="">— vyberte změřený komplex —</option>'+
    MUPRIK.map(function(p,i){ return '<option value="'+i+'">'+p.vz+" — μ = "+fixed(p.mu,2)+" μ_B</option>"; }).join("");
  sel.addEventListener("change",function(){
    if(sel.value===""){ say("#muSay","Vyberte změřený komplex, nebo posuňte posuvníkem naměřenou hodnotu."); return; }
    var p=MUPRIK[+sel.value];
    muVal=p.mu; $("#muRange").value=String(Math.round(p.mu*100));
    $("#muVal").textContent=fixed(muVal,2)+" μ_B"; muDraw();
    say("#muSay","<b>"+p.vz+"</b>: "+p.s+".");
  });
  say("#muSay","Vyberte změřený komplex, nebo posuňte posuvníkem naměřenou hodnotu.");
  muDraw();
}

/* ============================================================
   15 · KAPITOLA 6 — BARVA KOMPLEXU Z HODNOTY Δ
   ============================================================ */
var clDelta=20300;
function clDraw(){
  var lam=nmFromWn(clDelta);
  var b=barvaZLambda(lam);
  var W=740,H=350,s="";
  s+=rect(6,6,W-12,H-12,{fill:"var(--surface-2)",r:14,stroke:"var(--line)",sw:1.2});
  /* proužek spektra 380–780 nm */
  var x0=70,x1=670,ys=120,hh=44;
  var N=120;
  for(var i=0;i<N;i++){
    var l1=380+(780-380)*i/N;
    s+='<rect x="'+(x0+(x1-x0)*i/N).toFixed(2)+'" y="'+ys+'" width="'+((x1-x0)/N+0.6).toFixed(2)+
       '" height="'+hh+'" style="fill:'+svetlo(l1)+'"/>';
  }
  s+=rect(x0,ys,x1-x0,hh,{fill:"none",r:0,stroke:"var(--line-strong)",sw:1.4});
  /* osa vlnových délek */
  [400,450,500,550,600,650,700,750].forEach(function(l){
    var x=x0+(x1-x0)*(l-380)/400;
    s+=line(x,ys+hh,x,ys+hh+6,{c:"var(--line-strong)",w:1.2});
    s+=txt(x,ys+hh+20,String(l),{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true});
  });
  s+=txt(x1,ys+hh+38,"vlnová délka λ / nm",{anchor:"end",size:11,fill:"var(--ink-3)"});
  /* ukazatel absorbované vlnové délky */
  if(lam>=380 && lam<=780){
    var xm=x0+(x1-x0)*(lam-380)/400;
    s+='<path d="M'+xm+' '+(ys-6)+' l-8 -12 l16 0 z" style="fill:var(--accent)"/>';
    s+=line(xm,ys,xm,ys+hh,{c:"var(--ink)",w:2.4});
    s+=txt(Math.max(120,Math.min(620,xm)),ys-26,"absorbuje λ = "+fixed(lam,0)+" nm",
          {anchor:"middle",size:12,w:700,fill:"var(--accent)"});
  } else {
    s+=txt(W/2,ys-26, lam>780
        ? "absorpce leží až za červeným okrajem (λ = "+fixed(lam,0)+" nm) — roztok je jen bledý"
        : "absorpce leží v ultrafialové oblasti (λ = "+fixed(lam,0)+" nm) — roztok je skoro bezbarvý",
          {anchor:"middle",size:12,w:700,fill:"var(--ink-3)"});
  }
  /* dvě dlaždice: co pohltí a co vidíme */
  s+=rect(70,236,290,88,{fill:"var(--surface-3)",r:12,stroke:"var(--line)",sw:1.4});
  s+=rect(380,236,290,88,{fill:"var(--surface-3)",r:12,stroke:"var(--line)",sw:1.4});
  if(lam>=380&&lam<=780){
    s+='<rect x="86" y="252" width="56" height="56" rx="8" style="fill:'+svetlo(lam)+
       ';stroke:var(--line-strong);stroke-width:1.2"/>';
    s+='<rect x="396" y="252" width="56" height="56" rx="8" style="fill:'+
       svetloHue(hueZLambda(lam)+180)+';stroke:var(--line-strong);stroke-width:1.2"/>';
  }
  s+=txt(158,272,"POHLCENÁ BARVA",{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  s+=txt(158,296,b.abs,{size:15,w:700,fill:"var(--ink)"});
  s+=txt(468,272,"BARVA, KTEROU VIDÍME",{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  s+=txt(468,296,b.vid,{size:15,w:700,fill:"var(--ink)"});
  s+=txt(W/2,36,"Δ₀ = "+tis(clDelta)+" cm⁻¹   →   λ = 10⁷/Δ₀ = "+fixed(lam,0)+" nm   →   "+
        fixed(kJFromNm(lam),0)+" kJ·mol⁻¹",{anchor:"middle",size:13.5,w:700,fill:"var(--ink)"});
  s+=txt(W/2,60,"Světlo o téhle vlnové délce roztok pohltí; ven projde všechno ostatní, "+
        "a to dohromady dá barvu doplňkovou.",{anchor:"middle",size:11.5,fill:"var(--ink-3)"});
  $("#clWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Barva komplexu odvozená z energie štěpení"');
  ro("#clRo1","Vlnová délka absorpce λ", fixed(lam,0)+" nm","λ = 10⁷ / Δ, Δ v cm⁻¹");
  ro("#clRo2","Energie přechodu", fixed(kJFromNm(lam),0)+" kJ·mol⁻¹",
     "totéž jako "+fixed(eVFromNm(lam),2)+" eV na jeden foton");
  ro("#clRo3","Pozorovaná barva roztoku", b.vid, "doplňková k barvě pohlcené");
}
function initCl(){
  $("#clRange").addEventListener("input",function(){
    clDelta=+this.value; $("#clVal").textContent=tis(clDelta)+" cm⁻¹";
    $("#clSel").value=""; clDraw();
  });
  $("#clVal").textContent=tis(clDelta)+" cm⁻¹";
  var sel=$("#clSel");
  sel.innerHTML='<option value="">— nebo vyberte skutečný komplex —</option>'+
    KMPX.filter(function(k){return CLPRIK.indexOf(k.vz)>=0;}).map(function(k){
      return '<option value="'+k.d+'">'+k.vz+" — "+k.barva+'</option>';
    }).join("");
  sel.addEventListener("change",function(){
    if(!sel.value) return;
    clDelta=+sel.value; $("#clRange").value=sel.value;
    $("#clVal").textContent=tis(clDelta)+" cm⁻¹"; clDraw();
  });
  clDraw();
}

/* ============================================================
   16 · KAPITOLA 6 — BAREVNÝ KRUH DOPLŇKOVÝCH BAREV
   ============================================================ */
var dcLam=500;
function dcDraw(){
  var W=680,H=380,cx=250,cy=192,R=124,s="";
  s+=rect(6,6,W-12,H-12,{fill:"var(--surface-2)",r:14,stroke:"var(--line)",sw:1.2});
  /* barevný kruh — výseče podle odstínu, celý rozsah 0–360° */
  var N=48;
  for(var i=0;i<N;i++){
    var a1=(i/N)*Math.PI*2-Math.PI/2, a2=((i+1)/N)*Math.PI*2-Math.PI/2;
    var x1=cx+Math.cos(a1)*R, y1=cy+Math.sin(a1)*R;
    var x2=cx+Math.cos(a2)*R, y2=cy+Math.sin(a2)*R;
    var xi1=cx+Math.cos(a1)*(R-40), yi1=cy+Math.sin(a1)*(R-40);
    var xi2=cx+Math.cos(a2)*(R-40), yi2=cy+Math.sin(a2)*(R-40);
    s+='<path d="M'+x1.toFixed(1)+' '+y1.toFixed(1)+' A'+R+' '+R+' 0 0 1 '+x2.toFixed(1)+' '+y2.toFixed(1)+
       ' L'+xi2.toFixed(1)+' '+yi2.toFixed(1)+' A'+(R-40)+' '+(R-40)+' 0 0 0 '+xi1.toFixed(1)+' '+yi1.toFixed(1)+
       ' Z" style="fill:'+svetloHue((i/N)*360,80,55)+'"/>';
  }
  /* ukazatele: pohlcený odstín a odstín přesně naproti */
  var aAbs=(hueZLambda(dcLam)/360)*Math.PI*2-Math.PI/2;
  var aVid=aAbs+Math.PI;
  function ukaz(a,barva){
    var t="";
    var xa=cx+Math.cos(a)*(R+16), ya=cy+Math.sin(a)*(R+16);
    var xb=cx+Math.cos(a)*(R-52), yb=cy+Math.sin(a)*(R-52);
    t+=line(xb,yb,xa,ya,{c:barva,w:3,cap:"round"});
    t+='<circle cx="'+xa.toFixed(1)+'" cy="'+ya.toFixed(1)+'" r="7" style="fill:'+barva+'"/>';
    return t;
  }
  s+=ukaz(aAbs,"var(--ink)");
  s+=ukaz(aVid,"var(--accent)");
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(R-52)+'" style="fill:var(--surface-2);stroke:var(--line);stroke-width:1.2"/>';
  s+=txt(cx,cy-8,fixed(dcLam,0)+" nm",{anchor:"middle",size:19,w:700,fill:"var(--ink)"});
  s+=txt(cx,cy+14,"pohlcená vlnová délka",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  /* legenda vpravo — každý údaj na vlastním řádku */
  var b=barvaZLambda(dcLam);
  var xr=440;
  s+=txt(xr,84,"CO SE DĚJE",{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  s+=line(xr,96,W-40,96,{c:"var(--line)",w:1});
  s+=txt(xr,124,"Roztok pohltí:",{size:12,fill:"var(--ink-3)"});
  s+=txt(xr,146,b.abs,{size:15,w:700,fill:"var(--ink)"});
  s+=txt(xr,180,"Oko uvidí barvu naproti:",{size:12,fill:"var(--ink-3)"});
  s+=txt(xr,202,b.vid,{size:15,w:700,fill:"var(--accent)"});
  s+=txt(xr,238,"Odpovídající Δ:",{size:12,fill:"var(--ink-3)"});
  s+=txt(xr,260,tis(wnFromNm(dcLam))+" cm⁻¹",{size:14,w:700,fill:"var(--ink)",mono:true});
  s+=txt(xr,292,"Energie fotonu:",{size:12,fill:"var(--ink-3)"});
  s+=txt(xr,314,fixed(kJFromNm(dcLam),0)+" kJ·mol⁻¹",{size:14,w:700,fill:"var(--ink)",mono:true});
  s+=txt(W/2,H-16,"Protilehlé barvy na kruhu jsou doplňkové — co látka pohltí, to v procházejícím světle chybí.",
        {anchor:"middle",size:11.5,fill:"var(--ink-3)"});
  $("#dcWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Barevný kruh — pohlcená a pozorovaná barva"');
}
function initDc(){
  $("#dcRange").addEventListener("input",function(){
    dcLam=+this.value; $("#dcVal").textContent=fixed(dcLam,0)+" nm"; dcDraw();
  });
  $("#dcVal").textContent=fixed(dcLam,0)+" nm";
  dcDraw();
}
