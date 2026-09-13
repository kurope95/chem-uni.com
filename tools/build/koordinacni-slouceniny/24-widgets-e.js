/* ============================================================
   17 · KAPITOLA 7 — CHELÁTOVÝ EFEKT
   ============================================================ */
var CHEL = {
 "Ni": {ion:"Ni²⁺", kc:6, rady:[
   {nm:"6 × NH₃",  lig:"amoniak (jednodonorový)", lb:8.6,  vlevo:7, vpravo:7,
    pop:"sedm částic vlevo, sedm vpravo"},
   {nm:"3 × en",   lig:"ethylendiamin (dvoudonorový)", lb:18.3, vlevo:4, vpravo:7,
    pop:"ze čtyř částic vzniká sedm"},
   {nm:"1 × EDTA", lig:"edetato (šestidonorový)", lb:18.6, vlevo:2, vpravo:7,
    pop:"ze dvou částic vzniká sedm"}]},
 "Cu": {ion:"Cu²⁺", kc:4, rady:[
   {nm:"4 × NH₃",  lig:"amoniak (jednodonorový)", lb:12.6, vlevo:5, vpravo:5,
    pop:"pět částic vlevo, pět vpravo"},
   {nm:"2 × en",   lig:"ethylendiamin (dvoudonorový)", lb:19.6, vlevo:3, vpravo:5,
    pop:"ze tří částic vzniká pět"},
   {nm:"1 × EDTA", lig:"edetato (šestidonorový)", lb:18.8, vlevo:2, vpravo:5,
    pop:"ze dvou částic vzniká pět"}]}
};
var chKov="Ni";
function chDraw(){
  var c=CHEL[chKov], W=740,H=390,s="";
  s+=rect(6,6,W-12,H-12,{fill:"var(--surface-2)",r:14,stroke:"var(--line)",sw:1.2});
  s+=txt(W/2,32,"Stejný kov "+c.ion+", stejný počet donorových atomů — jiný počet ligandů",
        {anchor:"middle",size:13.5,w:700,fill:"var(--ink)"});
  var data=c.rady.map(function(r,i){
    return {lbl:r.nm, val:r.lb, col:"var(--cat"+(i+1)+")", top:fixed(r.lb,1), hi:(i>0)};
  });
  s+=barChart({x:82,y:84,w:250,h:190,data:data,dec:0,vmax:24,
               title:"STÁLOST KOMPLEXU",unit:"log β"});
  /* pravý sloupec — bilance částic */
  var xr=396;
  s+=txt(xr,84,"PROČ JE CHELÁT STÁLEJŠÍ",{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  s+=line(xr,96,W-38,96,{c:"var(--line)",w:1});
  c.rady.forEach(function(r,i){
    var y=128+i*74;
    s+=txt(xr,y,r.lig,{size:12.5,w:700,fill:"var(--cat"+(i+1)+")"});
    s+=txt(xr,y+20,r.pop,{size:12,fill:"var(--ink-2)"});
    s+=txt(xr,y+40,"log β = "+fixed(r.lb,1)+"   ·   ΔG° = "+fixed(-RT23*r.lb,0)+" kJ·mol⁻¹",
          {size:11.5,fill:"var(--ink-3)",mono:true});
  });
  s+=txt(W/2,H-40,"Rozdíl proti amoniaku: Δlog β = "+
        fixed(c.rady[1].lb-c.rady[0].lb,1)+" řádu   ·   ΔΔG° = "+
        fixed(-RT23*(c.rady[1].lb-c.rady[0].lb),0)+" kJ·mol⁻¹",
        {anchor:"middle",size:13,w:700,fill:"var(--accent)"});
  s+=txt(W/2,H-18,"Chelát vytlačí z kovu víc molekul vody, než sám spotřebuje částic — a nepořádek v roztoku roste.",
        {anchor:"middle",size:11.5,fill:"var(--ink-3)"});
  $("#chWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Chelátový efekt — srovnání stálosti komplexů"');
  ro("#chRo1","Amminkomplex", "log β = "+fixed(c.rady[0].lb,1),
     "ΔG° = "+fixed(-RT23*c.rady[0].lb,0)+" kJ·mol⁻¹");
  ro("#chRo2","Chelát s ethylendiaminem", "log β = "+fixed(c.rady[1].lb,1),
     "ΔG° = "+fixed(-RT23*c.rady[1].lb,0)+" kJ·mol⁻¹","pos");
  ro("#chRo3","Poměr rovnovážných konstant", expo(Math.pow(10,c.rady[1].lb-c.rady[0].lb),1),
     "tolikrát je chelát stálejší než amminkomplex");
  say("#chSay","Obě reakce dodají kovu <b>stejný počet donorových atomů dusíku</b> a vytvoří "+
    "stejně pevné vazby M–N. Přesto je chelát o "+fixed(c.rady[1].lb-c.rady[0].lb,1)+
    " řádu stálejší. Rozdíl není v entalpii, ale v <b>entropii</b>: chelátový ligand přijde jako "+
    "jedna nebo dvě částice, ale vytlačí ze sféry šest molekul vody. Volných částic v roztoku přibude, "+
    "neuspořádanost vzroste, a člen −T·ΔS° posune ΔG° dolů.");
}
function initCh(){
  segBind("#chSeg",function(v){ chKov=v; chDraw(); });
  chDraw();
}

/* ============================================================
   18 · KAPITOLA 7 — KOLIK ZBYDE VOLNÉHO IONTU
   ============================================================ */
var AGK=[
 {vz:"[Fe(SCN)]²⁺",  lb: 3.0, n:1, m:"Fe³⁺", lig:"SCN⁻",
  pozn:"slabý komplex — volných železitých iontů zůstane spousta, proto zbarvení mizí zředěním"},
 {vz:"[Ag(NH₃)₂]⁺",  lb: 7.05,n:2, m:"Ag⁺",  lig:"NH₃",
  pozn:"stačí, aby se rozpustil chlorid stříbrný, ale ne bromid"},
 {vz:"[Cu(NH₃)₄]²⁺", lb:12.6, n:4, m:"Cu²⁺", lig:"NH₃",
  pozn:"volné měďnaté ionty se s hydroxidem už nesrážejí"},
 {vz:"[Ag(CN)₂]⁻",   lb:20.5, n:2, m:"Ag⁺",  lig:"CN⁻",
  pozn:"základ galvanického stříbření — z tak nízké koncentrace se kov vylučuje pomalu a jemně"}
];
var agI=1, agLogL=0;
function agPM(k){
  var beta=Math.pow(10,k.lb), L=Math.pow(10,agLogL);
  var cM=0.10/(beta*Math.pow(L,k.n));
  if(cM>0.10) cM=0.10;
  return -Math.log(cM)/Math.LN10;
}
function agDraw(){
  var W=720,H=340,s="";
  s+=rect(6,6,W-12,H-12,{fill:"var(--surface-2)",r:14,stroke:"var(--line)",sw:1.2});
  var data=AGK.map(function(k,i){
    return {lbl:k.m, sub:k.lig, val:agPM(k), col:"var(--cat"+(i+1)+")",
            top:fixed(agPM(k),1), hi:(i===agI)};
  });
  s+=barChart({x:86,y:84,w:560,h:180,data:data,dec:0,vmax:26,
               title:"JAK DOBŘE JE KOV SCHOVANÝ",unit:"pM = −log c(volného iontu)"});
  var k=AGK[agI];
  s+=txt(W/2,34,"c(ligandu) = "+fixed(Math.pow(10,agLogL),4)+" mol·dm⁻³   ·   "+
        "c(komplexu) = 0,1000 mol·dm⁻³",{anchor:"middle",size:13,w:700,fill:"var(--ink)"});
  s+=txt(W/2,56,"c(M) = c(komplexu) / (β · c(ligandu)ⁿ)",
        {anchor:"middle",size:12,fill:"var(--ink-3)",mono:true});
  s+=txt(W/2,H-16,"Čím vyšší sloupec, tím méně volného kovu v roztoku zůstane.",
        {anchor:"middle",size:11.5,fill:"var(--ink-3)"});
  $("#agWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Koncentrace volného kovového iontu v roztoku komplexu"');
  var cM=Math.pow(10,-agPM(k));
  ro("#agRo1","Vybraný komplex", k.vz, "log β = "+fixed(k.lb,2));
  ro("#agRo2","Koncentrace volného "+k.m, expo(cM,2)+" mol·dm⁻³",
     "při zadané koncentraci ligandu");
  ro("#agRo3","Hodnota pM", fixed(agPM(k),1), "pM = −log c(volného kovového iontu)","pos");
  say("#agSay","<b>"+k.vz+"</b> — "+k.pozn+". Posuňte koncentraci ligandu dolů a sledujte, "+
    "jak volného kovu rychle přibývá: v čitateli je koncentrace komplexu, ve jmenovateli "+
    "součin konstanty stability a koncentrace ligandu umocněné na počet navázaných ligandů.");
}
function initAg(){
  var sel=$("#agSel");
  sel.innerHTML=AGK.map(function(k,i){ return '<option value="'+i+'">'+k.vz+'</option>'; }).join("");
  sel.value=String(agI);
  sel.addEventListener("change",function(){ agI=+sel.value; agDraw(); });
  $("#agRange").addEventListener("input",function(){
    agLogL=+this.value/10;
    $("#agVal").textContent=fixed(Math.pow(10,agLogL),4)+" mol·dm⁻³";
    agDraw();
  });
  $("#agVal").textContent=fixed(Math.pow(10,agLogL),4)+" mol·dm⁻³";
  agDraw();
}

/* ============================================================
   19 · KAPITOLA 8 — TABULKA PRAKTICKÝCH KOMPLEXŮ
   ============================================================ */
var prFilter="vse";
var PRSKUP={
 "zivot":["biochemie","medicína"],
 "analyt":["analytika"],
 "tech":["galvanika","metalurgie","fotografie","pigment","průmysl","laboratoř","anorganika","organokovová chemie"]
};
function prDraw(){
  var q=($("#prHled").value||"").trim().toLowerCase();
  var r=PRAX.filter(function(p){
    if(prFilter!=="vse" && PRSKUP[prFilter].indexOf(p.obor)<0) return false;
    if(!q) return true;
    return (p.vz+" "+p.nm+" "+p.kov+" "+p.obor+" "+p.role).toLowerCase().indexOf(q)>=0;
  });
  var h='<table><thead><tr><th>Komplex</th><th>Název a použití</th><th>Centrální atom</th>'+
        '<th class="n">KČ</th><th>Obor</th><th>K čemu je</th></tr></thead><tbody>';
  if(!r.length) h+='<tr><td colspan="6">Nic nenalezeno — zkuste jiné slovo.</td></tr>';
  r.forEach(function(p){
    h+='<tr><td class="chem"><b>'+p.vz+'</b></td><td>'+p.nm+'</td><td class="chem">'+p.kov+'</td>'+
       '<td class="n">'+p.kc+'</td><td>'+p.obor+'</td><td>'+p.role+'</td></tr>';
  });
  h+='</tbody></table>';
  $("#prTbl").innerHTML=h;
}
function initPr(){
  $("#prHled").addEventListener("input",prDraw);
  segBind("#prSeg",function(v){ prFilter=v; prDraw(); });
  prDraw();
}

/* ============================================================
   20 · KAPITOLA 8 — ŠESTÉ MÍSTO NA HEMU
   ============================================================ */
var HEM=[
 {id:"prazdne", lig:"—", nm:"deoxyhemoglobin",
  ro1:"volné", ro2:"železo mírně vystupuje z roviny porfyrinu",
  s:"Bez šestého ligandu je železnatý iont o něco větší a nevejde se přesně do roviny čtyř dusíků. "+
    "Vazba kyslíku ho vtáhne do roviny — a tenhle nepatrný pohyb rozhýbe celou bílkovinu. "+
    "Odtud pochází kooperativita: první navázaný kyslík usnadní navázání dalších."},
 {id:"O2", lig:"O₂", nm:"oxyhemoglobin",
  ro1:"1×", ro2:"referenční hodnota, se kterou se ostatní ligandy srovnávají",
  s:"Kyslík se váže <b>vratně</b> a šikmo, pod úhlem asi 120°. Právě vratnost je celý trik: "+
    "v plicích se naváže, ve tkáni se uvolní. Kdyby se vázal pevněji, krev by kyslík nepředala."},
 {id:"CO", lig:"CO", nm:"karbonylhemoglobin",
  ro1:"asi 250×", ro2:"oxid uhelnatý je silný π-akceptor, a proto se váže mnohem pevněji",
  s:"Oxid uhelnatý stojí na konci spektrochemické řady — je to nejsilnější běžný π-akceptor. "+
    "Na hemoglobin se váže zhruba <b>dvěstěpadesátkrát</b> pevněji než kyslík a váže se "+
    "prakticky nevratně. Proto stačí malý podíl CO ve vzduchu, aby se krev přestala starat o kyslík. "+
    "Léčba je prostá a logická: dýchat čistý kyslík a přebít rovnováhu koncentrací."},
 {id:"CN", lig:"CN⁻", nm:"kyanidový komplex",
  ro1:"velmi pevně", ro2:"kyanid útočí hlavně na železo v cytochrom c oxidase",
  s:"Kyanidový iont je stejně jako CO silný π-akceptor. Hlavní jed ale nepůsobí na hemoglobin — "+
    "váže se na <b>železité</b> železo v cytochrom c oxidase a zastaví dýchací řetězec v mitochondriích. "+
    "Antidotem je paradoxně jiný komplex: dusitan převede část hemoglobinu na methemoglobin "+
    "se železem III, který kyanid odláká na sebe."}
];
var hemI=1;
function hemDraw(){
  var h=HEM[hemI], W=680,H=390,cx=300,cy=190,s="";
  s+=rect(6,6,W-12,H-12,{fill:"var(--surface-2)",r:14,stroke:"var(--line)",sw:1.2});
  var eq=[{x:-105,y:0},{x:105,y:0},{x:38,y:-40},{x:-38,y:40}];
  /* rovina porfyrinu */
  var d="M"+(cx-105)+" "+cy+" L"+(cx+38)+" "+(cy-40)+" L"+(cx+105)+" "+cy+" L"+(cx-38)+" "+(cy+40)+" Z";
  s+='<path d="'+d+'" style="fill:var(--cat3);fill-opacity:.14;stroke:var(--cat3);stroke-width:1.6;stroke-dasharray:6 4"/>';
  eq.forEach(function(p){ s+=line(cx,cy,cx+p.x,cy+p.y,{c:"var(--line-strong)",w:2}); });
  /* axiální vazby */
  s+=line(cx,cy,cx,cy+105,{c:"var(--line-strong)",w:2.2});
  if(h.lig!=="—") s+=line(cx,cy,cx,cy-105,{c:"var(--exo)",w:2.6});
  else s+=line(cx,cy,cx,cy-70,{c:"var(--line)",w:1.6,dash:"5 5"});
  eq.forEach(function(p){ s+=atom(cx+p.x,cy+p.y,16,"N","var(--cat2)","var(--ink)",13); });
  s+=atom(cx,cy+105,22,"His","var(--cat4)","var(--ink)",12);
  if(h.lig!=="—") s+=atom(cx,cy-105,21,h.lig,"var(--exo)","var(--ink)",13);
  else s+='<circle cx="'+cx+'" cy="'+(cy-105)+'" r="21" style="fill:none;stroke:var(--line);stroke-width:1.6;stroke-dasharray:5 4"/>';
  s+=atom(cx,cy,25,"Fe","var(--accent)","var(--accent-ink)",16);
  /* popisky — vlevo a vpravo od obrázku, na samostatných řádcích */
  s+=txt(30,120,"čtyři dusíky",{size:12,w:600,fill:"var(--cat2)"});
  s+=txt(30,138,"porfyrinového kruhu",{size:12,w:600,fill:"var(--cat2)"});
  s+=txt(470,306,"pátý ligand: dusík",{size:12,w:600,fill:"var(--cat4)"});
  s+=txt(470,324,"histidinu z bílkoviny",{size:12,w:600,fill:"var(--cat4)"});
  s+=txt(470,64,"šesté místo",{size:12,w:600,fill:"var(--exo)"});
  s+=txt(470,82,h.lig==="—"?"zůstává prázdné":"obsazeno "+h.lig,{size:12,w:600,fill:"var(--exo)"});
  s+=txt(W/2,34,h.nm+"  ·  Fe"+sup("II")+"  ·  koordinační číslo "+(h.lig==="—"?"5":"6"),
        {anchor:"middle",size:14,w:700,fill:"var(--ink)"});
  s+=txt(W/2,H-16,"Hem je oktaedrický komplex železa — čtyři dusíky v rovině, histidin zdola, ligand shora.",
        {anchor:"middle",size:11.5,fill:"var(--ink-3)"});
  $("#hbWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Šesté koordinační místo na hemu"');
  ro("#hbRo1","Ligand na šestém místě", h.lig==="—"?"žádný":h.lig, h.nm);
  ro("#hbRo2","Pevnost vazby proti kyslíku", h.ro1, h.ro2, h.id==="CO"||h.id==="CN"?"neg":"");
  say("#hbSay",h.s);
}
function initHb(){
  segBind("#hbSeg",function(v){
    for(var i=0;i<HEM.length;i++) if(HEM[i].id===v) hemI=i;
    hemDraw();
  });
  hemDraw();
}

/* ============================================================
   21 · MINI-GRAFY V RYCHLOKURZU
   ============================================================ */
function miniSplit(){
  var W=420,H=200,yc=104,s="";
  s+=line(40,yc,180,yc,{c:"var(--line)",w:1.2,dash:"5 4"});
  for(var i=0;i<5;i++) s+=rect(60+i*18,yc-6,15,12,{fill:"var(--surface-3)",r:2,stroke:"var(--line-strong)",sw:1.1});
  s+=txt(105,yc-20,"volný iont",{anchor:"middle",size:11,fill:"var(--ink-3)"});
  var yE=yc-46, yT=yc+32;
  for(var j=0;j<2;j++) s+=rect(252+j*40,yE-7,32,14,{fill:"var(--accent-soft)",r:2,stroke:"var(--accent)",sw:1.3});
  for(var k=0;k<3;k++) s+=rect(232+k*40,yT-7,32,14,{fill:"var(--accent-soft)",r:2,stroke:"var(--accent)",sw:1.3});
  s+=txt(340,yE+5,'e<tspan font-size="8" dy="3">g</tspan>',{size:12,w:700,fill:"var(--accent)",style:"font-style:italic"});
  s+=txt(360,yT+5,'t<tspan font-size="8" dy="3">2g</tspan>',{size:12,w:700,fill:"var(--accent)",style:"font-style:italic"});
  s+=vArrow(206,yT,yE,"var(--exo)","Δ",'left');
  s+=txt(188,yE-16,"+0,6 Δ",{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true});
  s+=txt(188,yT+22,"−0,4 Δ",{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true});
  s+=txt(W/2,H-8,"Šest ligandů rozštěpí pět orbitalů d na dvě skupiny.",
        {anchor:"middle",size:11,fill:"var(--ink-3)"});
  return svg("0 0 "+W+" "+H,s,'aria-label="Štěpení orbitalů d v oktaedrickém poli"');
}
function miniColor(){
  var W=420,H=190,s="";
  var x0=44,x1=386,ys=52,hh=34,N=90;
  for(var i=0;i<N;i++){
    var l=380+400*i/N;
    s+='<rect x="'+(x0+(x1-x0)*i/N).toFixed(2)+'" y="'+ys+'" width="'+((x1-x0)/N+0.6).toFixed(2)+
       '" height="'+hh+'" style="fill:'+svetlo(l)+'"/>';
  }
  s+=rect(x0,ys,x1-x0,hh,{fill:"none",stroke:"var(--line-strong)",sw:1.3});
  [[20300,"Ti³⁺ (H₂O)₆"],[22900,"Co³⁺ (NH₃)₆"],[12600,"Cu²⁺ (H₂O)₆"]].forEach(function(p,i){
    var l=nmFromWn(p[0]);
    if(l>780) { l=780; }
    var x=x0+(x1-x0)*(l-380)/400;
    s+=line(x,ys,x,ys+hh,{c:"var(--ink)",w:2});
    s+=txt(x,ys+hh+18+i*17,p[1]+" → "+fixed(nmFromWn(p[0]),0)+" nm",
          {anchor:x>300?"end":"start",size:10.5,fill:"var(--ink-2)",mono:true});
  });
  s+=txt(W/2,28,"Kam padne pohlcená vlnová délka λ = 10⁷/Δ",
        {anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  s+=txt(W/2,H-8,"Barva, kterou vidíme, je doplňková k pohlcené.",
        {anchor:"middle",size:11,fill:"var(--ink-3)"});
  return svg("0 0 "+W+" "+H,s,'aria-label="Pohlcená vlnová délka a barva komplexu"');
}
function miniChel(){
  var W=420,H=210,s="";
  s+=barChart({x:66,y:44,w:300,h:118,dec:0,vmax:22,
    data:[{lbl:"6 × NH₃",val:8.6,col:"var(--cat1)",top:"8,6"},
          {lbl:"3 × en",val:18.3,col:"var(--cat2)",top:"18,3",hi:true},
          {lbl:"1 × EDTA",val:18.6,col:"var(--cat3)",top:"18,6",hi:true}],
    title:"STÁLOST KOMPLEXŮ Ni²⁺",unit:"log β"});
  s+=txt(W/2,H-8,"Stejné vazby M–N, jiný počet ligandů — a devět a půl řádu rozdílu.",
        {anchor:"middle",size:11,fill:"var(--ink-3)"});
  return svg("0 0 "+W+" "+H,s,'aria-label="Chelátový efekt v rychlokurzu"');
}
function drawMinis(){
  var a=$("#miniSplitWrap"); if(a) a.innerHTML=miniSplit();
  var b=$("#miniColorWrap"); if(b) b.innerHTML=miniColor();
  var c=$("#miniChelWrap");  if(c) c.innerHTML=miniChel();
}
