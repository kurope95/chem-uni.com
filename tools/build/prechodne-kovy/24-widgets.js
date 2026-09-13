/* ============================================================
   25 · k7 — ZPĚTNÁ DONACE π
   ============================================================ */
var zdId="volny";
var ZDST = {
 volny:{nm:"volná molekula CO", rad:"3,0", vaz:"nejpevnější běžná vazba vůbec",
   pop:"Oxid uhelnatý má osm elektronů ve vazebných orbitalech a dva v protivazebných, řád vazby je tedy (8 − 2) / 2 = 3. Na uhlíku má navíc volný elektronový pár v orbitalu, který se chová jako HOMO — nejvýše obsazený molekulový orbital.",
   sig:false, pi:false},
 sigma:{nm:"krok 1 — donace σ", rad:"3,0", vaz:"zatím se nezměnil",
   pop:"Uhlík nabídne svůj volný pár do prázdného orbitalu kovu. Vzniká běžná koordinační vazba σ. Na řád vazby uvnitř molekuly to zatím nemá skoro žádný vliv, protože pár vazbě C–O nijak nepřispíval.",
   sig:true, pi:false},
 pi:{nm:"krok 2 — zpětná donace π", rad:"2,6", vaz:"začíná slábnout",
   pop:"Kov vrátí elektrony ze svých zaplněných orbitalů d, ale nikoli do vazebného orbitalu ligandu — do <b>protivazebného</b> π*. Elektrony v protivazebném orbitalu vazbu rozvolňují, takže řád vazby C–O klesá.",
   sig:true, pi:true},
 vysl:{nm:"výsledek", rad:"2,6", vaz:"vazba M–C zesílila, vazba C–O zeslábla",
   pop:"Obě donace jdou proti sobě a přitom se navzájem podporují: čím víc elektronů kov přijme přes σ, tím víc jich může vrátit přes π*. Vazba kov–ligand je proto mnohem pevnější, než by odpovídalo prosté koordinaci — a molekula ligandu je zároveň připravená k reakci.",
   sig:true, pi:true}
};
function drawZd(){
  var z=ZDST[zdId], W=760, H=320, s='';
  s+=panelTitle(z.nm);
  s+=capt(14,50,"tok elektronů mezi kovem a ligandem");
  s+=circ(150,170,42,{fill:"var(--surface-2)",stroke:"var(--line-strong)",sw:1.6});
  s+=txt(150,178,"M",{anchor:"middle",size:22,w:700,fill:"var(--ink)"});
  s+=txt(150,248,"atom kovu",{anchor:"middle",size:12,fill:"var(--ink-2)"});
  s+=line(448,170,472,170,{c:"var(--line-strong)",w:2.4});
  s+=line(448,164,472,164,{c:"var(--line-strong)",w:2.4});
  s+=line(448,176,472,176,{c:"var(--line-strong)",w:2.4});
  s+=circ(420,170,28,{fill:"var(--exo)",stroke:"var(--line-strong)",sw:1.4,style:"fill-opacity:.4"});
  s+=circ(500,170,28,{fill:"var(--endo)",stroke:"var(--line-strong)",sw:1.4,style:"fill-opacity:.4"});
  s+=txt(420,177,"C",{anchor:"middle",size:18,w:700,fill:"var(--ink)"});
  s+=txt(500,177,"O",{anchor:"middle",size:18,w:700,fill:"var(--ink)"});
  s+=txt(460,248,"molekula CO",{anchor:"middle",size:12,fill:"var(--ink-2)"});
  if(z.sig){
    s+=hArrow(370,204,140,"var(--accent)",false);
    s+=txt(280,126,"donace σ z ligandu na kov",{anchor:"middle",size:11.5,w:600,fill:"var(--accent)"});
  }
  if(z.pi){
    s+=hArrow(204,370,206,"var(--warn)",false);
    s+=txt(280,228,"zpětná donace π do orbitalu π*",{anchor:"middle",size:11.5,w:600,fill:"var(--warn)"});
  }
  /* hladiny ligandu vpravo */
  s+=line(600,110,690,110,{c:"var(--warn)",w:2.4,cap:"round"});
  s+=line(600,210,690,210,{c:"var(--accent)",w:2.4,cap:"round"});
  s+=txt(700,114,"π*",{size:12,w:700,fill:"var(--warn)"});
  s+=txt(700,214,"σ",{size:12,w:700,fill:"var(--accent)"});
  if(z.pi){ s+=circ(630,102,4.6,{fill:"var(--warn)"}); s+=circ(660,102,4.6,{fill:"var(--warn)"}); }
  if(!z.sig){ s+=circ(630,202,4.6,{fill:"var(--accent)"}); s+=circ(660,202,4.6,{fill:"var(--accent)"}); }
  s+=txt(14,300,"řád vazby C–O = "+z.rad+" · "+z.vaz,{size:12,w:600,fill:"var(--ink)"});
  $("#zdWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Donace sigma a zpětná donace pí u karbonylu"');

  ro("#zdRo1","řád vazby C–O",z.rad,"vypočtený z obsazení orbitalů", z.pi?"neg":"pos");
  ro("#zdRo2","vazba kov–ligand", z.pi?"velmi pevná":(z.sig?"koordinační":"neexistuje"),
     z.pi?"posílená zpětnou donací":"","");
  ro("#zdRo3","co se děje s ligandem", z.pi?"aktivuje se":"zatím nic",
     z.pi?"oslabená vazba se snáz rozpadne":"molekula je nedotčená", z.pi?"pos":"");
  $("#zdList").innerHTML='<div class="callout def" style="margin:0"><span class="eyebrow">'+z.nm+'</span><p>'+z.pop+'</p></div>';
}
function initZd(){
  $$("#zdSeg button").forEach(function(b){
    b.addEventListener("click",function(){ zdId=this.dataset.zd; segSet("#zdSeg",zdId,"zd"); drawZd(); });
  });
  drawZd();
}

/* ============================================================
   26 · k7 — PRAVIDLO OSMNÁCTI ELEKTRONŮ
   ============================================================ */
function drawOk(){
  var k=pickBy(KARB,"id",$("#okSel").value), W=760, H=250, s='';
  var lig=k.lig*2, tot=k.dEl+lig+k.vaz;
  s+=panelTitle(k.nm+" · celkem "+tot+" elektronů");
  s+=capt(14,46,"počítání valenčních elektronů");
  s+=txt(14,90,"elektrony d kovu "+k.kov+" = "+k.dEl,{size:12.5,fill:"var(--ink-2)"});
  s+=txt(14,116,"ligandy CO: "+k.lig+" × 2 = "+lig,{size:12.5,fill:"var(--ink-2)"});
  s+=txt(14,142,"vazba kov–kov = "+k.vaz,{size:12.5,fill:"var(--ink-2)"});
  s+=txt(14,178,"celkem = "+tot,{size:15,w:700,fill:tot===18?"var(--ok)":"var(--warn)"});
  s+=capt(400,86,"skladba elektronů");
  var x0=400, sc=320/20;
  s+=rect(x0,100,k.dEl*sc,24,{fill:"var(--endo)",r:4,style:"fill-opacity:.75"});
  s+=rect(x0+k.dEl*sc,100,lig*sc,24,{fill:"var(--exo)",r:4,style:"fill-opacity:.75"});
  if(k.vaz) s+=rect(x0+(k.dEl+lig)*sc,100,k.vaz*sc,24,{fill:"var(--accent)",r:4,style:"fill-opacity:.85"});
  s+=rect(x0,100,320,24,{fill:"none",stroke:"var(--line)",sw:1,r:4});
  s+=line(x0+18*sc,94,x0+18*sc,132,{c:"var(--ok)",w:2,dash:"5 4"});
  s+=txt(x0+18*sc,150,"18",{anchor:"middle",size:11.5,w:700,mono:true,fill:"var(--ok)"});
  s+=txt(400,182,"koordinační polyedr = "+k.tvar,{size:12,fill:"var(--ink-3)"});
  s+=txt(14,218,"Modrý pruh = elektrony kovu, teplý = od karbonylů, zvýrazněný = vazba kov–kov.",
        {size:11,fill:"var(--ink-3)"});
  $("#okWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Počítání valenčních elektronů v karbonylu"');

  ro("#okRo1","elektrony od kovu",String(k.dEl),"konfigurace d"+k.dEl+" v oxidačním stavu 0","");
  ro("#okRo2","elektrony od ligandů",String(lig),k.lig+" karbonyly po dvou elektronech","");
  ro("#okRo3","celkem",String(tot), tot===18?"pravidlo osmnácti je splněno":"pravidlo není splněno", tot===18?"pos":"neg");
  $("#okList").innerHTML='<div class="callout '+(tot===18?"def":"warn")+'" style="margin:0"><span class="eyebrow">'+k.nm+'</span><p>'+k.pop+'</p></div>';
}
function initOk(){
  fillSel("#okSel",KARB.map(function(k){ return {v:k.id,t:k.nm}; }),"v","t","ni");
  $("#okSel").addEventListener("change",drawOk);
  drawOk();
}

/* ============================================================
   27 · k7 — PRŮMYSLOVÉ KATALYTICKÉ PROCESY
   ============================================================ */
function drawKt(){
  var p=pickBy(KATAL,"id",$("#ktSel").value), W=760, H=250, s='';
  s+=panelTitle(p.nm);
  s+=capt(14,46,"reakce, katalyzátor a podmínky");
  s+=txt(14,84,p.rce,{size:13,w:600,fill:"var(--ink)"});
  s+=rect(14,102,340,54,{fill:"var(--surface-3)",r:8});
  s+=txt(26,126,"katalyzátor:",{size:11,fill:"var(--ink-3)"});
  s+=txt(26,146,p.kat,{size:12,w:600,fill:"var(--accent)"});
  s+=txt(14,186,"podmínky = "+p.t,{size:11.5,fill:"var(--ink-2)"});
  s+=txt(14,222,"typ katalýzy = "+p.typ,{size:11.5,w:600,fill:"var(--ink-2)"});
  /* energetický profil */
  s+=capt(400,84,"energetický profil");
  var xa=400, xb=740, yr=180, yp=192;
  s+=line(xa,yr,xa+40,yr,{c:"var(--line-strong)",w:2});
  s+=line(xb-40,yp,xb,yp,{c:"var(--line-strong)",w:2});
  s+='<path d="M'+(xa+40)+' '+yr+' C '+(xa+110)+' '+yr+', '+(xa+110)+' 104, '+((xa+xb)/2)+' 104 C '+(xb-110)+' 104, '+(xb-110)+' '+yp+', '+(xb-40)+' '+yp+'" style="fill:none;stroke:var(--ink-3);stroke-width:2;stroke-dasharray:5 4"/>';
  s+='<path d="M'+(xa+40)+' '+yr+' C '+(xa+110)+' '+yr+', '+(xa+110)+' 142, '+((xa+xb)/2)+' 142 C '+(xb-110)+' 142, '+(xb-110)+' '+yp+', '+(xb-40)+' '+yp+'" style="fill:none;stroke:var(--accent);stroke-width:2.4"/>';
  s+=txt(400,222,"plná čára = s katalyzátorem · čárkovaná = bez něj",{size:11,fill:"var(--ink-3)"});
  $("#ktWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Schéma katalytického procesu"');

  ro("#ktRo1","katalyzátor",p.kat,"typ katalýzy = "+p.typ,"");
  ro("#ktRo2","podmínky",p.t,"bez katalyzátoru by byly nedosažitelné","");
  $("#ktList").innerHTML='<div class="callout def" style="margin:0"><span class="eyebrow">Jak to funguje</span><p>'+p.jak+
    '</p><p style="margin-top:.5rem"><b>Podrobněji:</b> '+p.proc+'</p></div>';
}
function initKt(){
  fillSel("#ktSel",KATAL.map(function(p){ return {v:p.id,t:p.nm}; }),"v","t","kontakt");
  $("#ktSel").addEventListener("change",drawKt);
  drawKt();
}

/* ============================================================
   28 · k8 — NAMÍCHEJTE SI OCEL
   ============================================================ */
function drawOc(){
  var C=(+$("#ocC").value)/100, Cr=+$("#ocCr").value, Ni=+$("#ocNi").value;
  var W=760, H=300, s='';
  $("#ocCv").textContent=fmt(C,2)+" %";
  $("#ocCrv").textContent=fmt(Cr,0)+" %";
  $("#ocNiv").textContent=fmt(Ni,0)+" %";
  var litina=C>2.11, nerez=(Cr>=10.5), austenit=(Cr>=16 && Ni>=8);
  var typ = litina ? "litina — nekujná, jen k odlévání"
          : austenit ? "austenitická nerezavějící ocel"
          : nerez ? "feritická nebo martenzitická nerez"
          : (C>=0.6 ? "nástrojová uhlíková ocel" : "konstrukční uhlíková ocel");
  s+=panelTitle(typ);
  s+=capt(14,50,"složení taveniny");
  var rows=[["uhlík",C,4.0,"hranice oceli = 2,11 %",2.11],
            ["chrom",Cr,26,"pasivace od 10,5 %",10.5],
            ["nikl",Ni,20,"austenit zhruba od 8 %",8]];
  rows.forEach(function(r,k){
    var y=84+k*40;
    s+=txt(14,y+5,r[0]+" = "+fmt(r[1], k===0?2:0)+" %",{size:12,w:600,fill:"var(--ink)"});
    s+=rect(150,y-9,400,20,{fill:"var(--surface-2)",r:5});
    s+=rect(150,y-9,Math.max(2,r[1]/r[2]*400),20,{fill:"var(--accent)",r:5,style:"fill-opacity:.75"});
    s+=line(150+r[4]/r[2]*400,y-14,150+r[4]/r[2]*400,y+16,{c:"var(--bad)",w:1.8,dash:"4 3"});
    s+=txt(566,y+5,r[3],{size:10.5,fill:"var(--ink-3)"});
  });
  s+=txt(14,222,"typ materiálu = "+(litina?"litina":"ocel"),{size:12.5,w:700,
        fill:litina?"var(--bad)":"var(--ok)"});
  s+=txt(14,262,"tvrdost roste s uhlíkem, korozní odolnost s chromem",{size:11,fill:"var(--ink-3)"});
  s+=capt(400,196,"pasivační vrstva Cr₂O₃");
  s+=circ(430,232,18,{fill:nerez?"var(--ok)":"var(--bad)",stroke:"var(--line-strong)",sw:1.3,style:"fill-opacity:.55"});
  s+=txt(462,238,nerez?"vytvoří se souvislá":"nevytvoří se",{size:12,w:600,
        fill:nerez?"var(--ok)":"var(--bad)"});
  $("#ocWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Vliv složení na typ oceli"');

  ro("#ocRo1","obsah uhlíku",fmt(C,2)+" %", litina?"nad 2,11 % už jde o litinu":"pod hranicí 2,11 %", litina?"neg":"pos");
  ro("#ocRo2","korozní odolnost", nerez?"nerezavějící":"běžná ocel",
     nerez?"chrom vytvoří souvislou vrstvu Cr₂O₃":"chromu je málo na souvislou vrstvu", nerez?"pos":"neg");
  ro("#ocRo3","magnetické chování", austenit?"nemagnetická":"magnetická",
     austenit?"nikl udržel plošně centrovanou mřížku":"převažuje prostorově centrovaná mřížka","");
  var pop = litina
    ? "Nad 2,11 % uhlíku se přebytečný uhlík vyloučí jako karbid nebo grafit. Materiál je tvrdý, ale křehký a nekujný — dá se jen odlévat."
    : austenit
    ? "Tohle je klasická nerez typu 18/10: chrom vytvoří pasivační vrstvu a nikl udrží austenitickou mřížku i za laboratorní teploty. Výsledek je houževnatý, korozivzdorný a nemagnetický."
    : nerez
    ? "Chromu je dost na pasivaci, ale nikl chybí — mřížka zůstane prostorově centrovaná, takže je ocel magnetická a méně houževnatá. Levnější varianta na příbory a plechy."
    : (C>=0.6
      ? "Vysoký obsah uhlíku znamená hodně karbidu Fe₃C: ocel je tvrdá a kalitelná, ale hůř se svařuje. Typické pro nože, sekáče a formy."
      : "Nízkouhlíková ocel bez legur. Dobře se svařuje a tváří, ale rezaví. Je to nejrozšířenější konstrukční materiál vůbec.");
  $("#ocVerd").innerHTML="<b>"+typ+"</b> — "+pop;
}

/* ============================================================
   29 · MINI-GRAFY RYCHLOKURZU
   ============================================================ */
function drawMiniEn(){
  var W=720, H=170, s='';
  s+=capt(10,20,"energie hladin 3d a 4s podle protonového čísla");
  var x0=50, x1=600, yt=40, yb=130, EMIN=-36;
  function X(z){ return x0+(z-18)/12*(x1-x0); }
  function Y(e){ return yt+(-e)/(-EMIN)*(yb-yt); }
  s+=line(x0,yb,x1,yb,{c:"var(--line-strong)",w:1.2});
  [18,22,26,30].forEach(function(z){
    s+=line(X(z),yt,X(z),yb,{c:"var(--grid)",w:1,dash:"3 4"});
    s+=txt(X(z),150,String(z),{anchor:"middle",size:10.5,mono:true,fill:"var(--ink-3)"});
  });
  function path(f,col){
    var d="",z;
    for(z=18;z<=30;z+=0.3){ d+=(z===18?"M":"L")+X(z)+" "+Y(f(z))+" "; }
    return '<path d="'+d+'" style="fill:none;stroke:'+col+';stroke-width:2.4"/>';
  }
  s+=path(e4s,"var(--exo)")+path(e3d,"var(--endo)");
  s+=txt(612,Y(e4s(29.5))+4,"4s",{size:12,w:700,fill:"var(--exo)"});
  s+=txt(612,Y(e3d(29.5))+4,"3d",{size:12,w:700,fill:"var(--endo)"});
  s+=line(X(20.6),yt-4,X(20.6),yb+4,{c:"var(--accent)",w:1.8,dash:"4 3"});
  $("#miniEnWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Křížení hladin 3d a 4s"');
}
function drawMiniOx(){
  var W=720, H=180, s='';
  s+=capt(10,20,"nejvyšší skutečně dosahované oxidační číslo");
  var MAXOX=[3,4,5,6,7,6,3,4,3,2], yb=140;
  RADA.forEach(function(e,i){
    var cx=57+i*66, h=MAXOX[i]/7*90;
    s+=rect(cx-17,yb-h,34,h,{fill: i===4?"var(--accent)":"var(--endo)",r:4,
           style:"fill-opacity:"+(i===4?0.9:0.6)});
    s+=txt(cx,yb-h-8,ROMAN[MAXOX[i]],{anchor:"middle",size:11,w:700,mono:true,fill:"var(--ink-2)"});
    s+=txt(cx,162,e.s,{anchor:"middle",size:12,w:600,fill:"var(--ink-2)"});
  });
  s+=line(30,yb,700,yb,{c:"var(--line-strong)",w:1.2});
  $("#miniOxWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Maximální oxidační čísla první přechodné řady"');
}
function drawMiniBar(){
  var W=720, H=180, s='';
  s+=capt(10,20,"co látka pohltí a co uvidíme");
  var X=function(l){ return 40+(l-380)/400*640; };
  SPEKTRUM.forEach(function(b){ s+=rect(X(b.od),40,X(b.do)-X(b.od),30,{fill:b.hex,style:"fill-opacity:.75"}); });
  s+=rect(40,40,640,30,{fill:"none",stroke:"var(--line-strong)",sw:1.2,r:3});
  [400,500,600,700].forEach(function(l){
    s+=txt(X(l),88,String(l),{anchor:"middle",size:10,mono:true,fill:"var(--ink-3)"});
  });
  var EX=[["modrá","oranžová"],["zelená","purpurová"],["žlutá","modrá"],["červená","zelená"]];
  EX.forEach(function(p,i){
    var cx=110+i*160, ba=pickBy(SPEKTRUM,"poh",p[0]);
    s+=circ(cx-22,116,16,{fill:ba.hex,stroke:"var(--line-strong)",sw:1.2,style:"fill-opacity:.85"});
    s+=circ(cx+22,116,16,{fill:chc(p[1]==="purpurová"?"fialová":p[1]),stroke:"var(--line-strong)",sw:1.2,style:"fill-opacity:.85"});
    s+=txt(cx,152,p[0]+" → "+p[1],{anchor:"middle",size:11,fill:"var(--ink-2)"});
  });
  $("#miniBarWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Pohlcená a doplňková barva"');
}
