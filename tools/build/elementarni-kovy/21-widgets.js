/* ============================================================
   8 · k1 — SKLÁDÁNÍ VRSTEV ABAB × ABCABC
   ============================================================ */
var vrId="hex";
function drawVrst(){
  var W=760, H=300, s='', r=20;
  var seq = vrId==="hex" ? ["A","B","A"] : ["A","B","C"];
  var cols={A:"var(--endo)",B:"var(--exo)",C:"var(--cat1)"};
  s+=panelTitle(vrId==="hex"?"hexagonální nejtěsnější · vrstvení ABAB":"kubická plošně centrovaná · vrstvení ABCABC");
  /* půdorys: tři vrstvy přes sebe */
  var cx=190, cy=160;
  function layer(kind,alpha){
    var t='', off = kind==="A" ? [0,0] : (kind==="B" ? [r, -r*0.58] : [-r, -r*0.58]);
    for(var i=-1;i<=1;i++) for(var j=-1;j<=1;j++){
      var x=cx+off[0]+i*2*r+ (j%2?r:0), y=cy+off[1]+j*r*1.73;
      if(Math.abs(x-cx)>2.6*r || Math.abs(y-cy)>2.1*r) continue;
      t+=circ(x,y,r,{fill:cols[kind],stroke:"var(--paper)",sw:2,style:"fill-opacity:"+alpha});
    }
    return t;
  }
  s+=layer(seq[0],0.9)+layer(seq[1],0.72)+layer(seq[2],0.55);
  s+=txt(cx,cy+3*r+26,"pohled shora — tři vrstvy přes sebe",{anchor:"middle",size:11,fill:"var(--ink-3)"});
  /* bokorys */
  var bx=430, by=64, gap=44;
  s+=txt(bx,by-16,"POHLED Z BOKU",{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
  var full = vrId==="hex" ? ["A","B","A","B"] : ["A","B","C","A"];
  var offs={A:0,B:14,C:28};
  full.forEach(function(L,i){
    var y=by+10+i*gap;
    for(var k=0;k<5;k++) s+=circ(bx+30+offs[L]+k*36,y,17,{fill:cols[L],stroke:"var(--paper)",sw:2,style:"fill-opacity:.85"});
    s+=txt(bx+8,y+5,L,{size:14,w:700,fill:cols[L]});
  });
  var yEnd=by+10+full.length*gap;
  var msg = vrId==="hex" ? "čtvrtá vrstva opakuje druhou → ABAB" : "čtvrtá vrstva teprve opakuje první → ABCABC";
  s+=txt(bx,yEnd+8,msg,{size:11.5,w:600,fill:"var(--accent)"});
  $("#vrWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Skládání vrstev koulí"');
  ro("#vrRo1","koordinační číslo","12","6 v rovině + 3 nahoře + 3 dole","pos");
  ro("#vrRo2","zaplnění prostoru","74,05 %","stejné u obou nejtěsnějších uspořádání","pos");
  ro("#vrRo3","počet skluzových rovin", vrId==="hex" ? "prakticky 1" : "4 roviny · 12 systémů",
     vrId==="hex" ? "proto se zinek za studena láme" : "proto je měď tažná", vrId==="hex"?"neg":"pos");
  $("#vrNote").innerHTML = vrId==="hex"
    ? "Vrstvení <b>ABAB</b>: třetí vrstva sedne přesně nad první. Nejtěsnější uspořádání to je, ale skluzová rovina je prakticky jen jedna — bazální. Proto se zinek, hořčík a&nbsp;kadmium za studena lámou a&nbsp;musí se tvářet za tepla."
    : "Vrstvení <b>ABCABC</b>: třetí vrstva sedne do dosud nevyužitých prohlubní a&nbsp;až čtvrtá opakuje první. Vzniknou tím čtyři různě orientované nejtěsněji obsazené roviny, po nichž se dá materiál posouvat — proto jsou měď, hliník, stříbro a&nbsp;zlato tak tažné.";
}
function initVrst(){
  $$("#vrSeg button").forEach(function(b){
    b.addEventListener("click",function(){ vrId=this.dataset.vr; segSet("#vrSeg",vrId,"vr"); drawVrst(); });
  });
  drawVrst();
}

/* ============================================================
   9 · k1 — DUTINY V MŘÍŽCE
   ============================================================ */
var DUT = {
  "kpc-o":{mr:"kubická plošně centrovaná", d:"oktaedrická", k:0.4142, n:"1 na atom", pop:"Dutina uprostřed hrany a&nbsp;ve středu buňky, obklopená šesti atomy ve vrcholech osmistěnu. Je to největší dutina v&nbsp;nejtěsnějším uspořádání."},
  "kpc-t":{mr:"kubická plošně centrovaná", d:"tetraedrická", k:0.2247, n:"2 na atom", pop:"Menší dutina obklopená čtyřmi atomy ve vrcholech čtyřstěnu. Je jich dvakrát víc než oktaedrických, ale pojmou jen velmi malé atomy."},
  "kpr-o":{mr:"kubická prostorově centrovaná", d:"oktaedrická", k:0.1547, n:"3 na buňku", pop:"Zploštělá dutina ve středu stěny a&nbsp;hrany. Přestože je v&nbsp;této mřížce celkově víc prázdna, jednotlivé dutiny jsou <b>mnohem menší</b> než v&nbsp;nejtěsnějším uspořádání."},
  "kpr-t":{mr:"kubická prostorově centrovaná", d:"tetraedrická", k:0.2910, n:"6 na buňku", pop:"Zajímavost: v&nbsp;prostorově centrované mřížce je tetraedrická dutina <b>větší</b> než oktaedrická — je to opak toho, co platí u&nbsp;nejtěsnějšího uspořádání."}
};
var PRIM = [
 {s:"H", n:"vodík", r:37}, {s:"N", n:"dusík", r:75}, {s:"C", n:"uhlík", r:77},
 {s:"B", n:"bor", r:88}, {s:"Si", n:"křemík", r:111}
];
function drawDut(){
  var key=$("#duSel").value, d=DUT[key], R=+$("#duR").value;
  $("#duRv").textContent=R+" pm";
  var rmax=d.k*R, W=760, H=250, s='';
  s+=panelTitle(d.mr+" · "+d.d+" dutina");
  /* schéma dutiny */
  var cx=190, cy=140, S=52;
  if(d.d==="oktaedrická"){
    var pos=[[cx,cy-S],[cx,cy+S],[cx-S,cy],[cx+S,cy],[cx-S*0.6,cy-S*0.6],[cx+S*0.6,cy+S*0.6]];
    pos.forEach(function(p){ s+=line(cx,cy,p[0],p[1],{c:"var(--line)",w:1,dash:"3 3"}); });
    pos.forEach(function(p){ s+=circ(p[0],p[1],26,{fill:"var(--endo)",stroke:"var(--paper)",sw:2,style:"fill-opacity:.7"}); });
    s+=txt(cx,cy+S+52,"šest atomů ve vrcholech osmistěnu",{anchor:"middle",size:11,fill:"var(--ink-3)"});
  } else {
    var pos2=[[cx,cy-S],[cx-S*0.87,cy+S*0.5],[cx+S*0.87,cy+S*0.5],[cx,cy+S*0.2]];
    pos2.forEach(function(p){ s+=line(cx,cy,p[0],p[1],{c:"var(--line)",w:1,dash:"3 3"}); });
    pos2.forEach(function(p){ s+=circ(p[0],p[1],26,{fill:"var(--endo)",stroke:"var(--paper)",sw:2,style:"fill-opacity:.7"}); });
    s+=txt(cx,cy+S+52,"čtyři atomy ve vrcholech čtyřstěnu",{anchor:"middle",size:11,fill:"var(--ink-3)"});
  }
  var rr=Math.max(4,Math.min(26,26*d.k/0.4142*0.9));
  s+=circ(cx,cy,rr,{fill:"var(--accent)",stroke:"var(--paper)",sw:2});
  s+=txt(cx,cy+4,"?",{anchor:"middle",size:12,w:700,fill:"var(--accent-ink)"});
  /* srovnávací sloupce */
  var bx=400, by=52, bw=300;
  s+=txt(bx,by-14,"POLOMĚR ATOMU PŘÍMĚSI [pm] — VEJDE SE?",{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.05em"});
  var scale=bw/200;
  s+=line(bx+rmax*scale,by-4,bx+rmax*scale,by+PRIM.length*30+8,{c:"var(--accent)",w:2,dash:"5 4"});
  s+=txt(bx+rmax*scale+6,by+PRIM.length*30+22,"mez dutiny = "+fmt(rmax,1)+" pm",{size:10.5,w:700,fill:"var(--accent)"});
  PRIM.forEach(function(p,i){
    var y=by+8+i*30, ok=p.r<=rmax*1.0, tight=p.r<=rmax*1.45;
    var col= ok ? "var(--ok)" : (tight ? "var(--warn)" : "var(--bad)");
    s+=rect(bx,y,p.r*scale,18,{fill:col,r:4,style:"fill-opacity:.7"});
    s+=txt(bx+6,y+13,p.n+" ("+p.r+")",{size:10.5,w:600,fill:"var(--ink)"});
    s+=txt(bx+bw+8,y+13, ok?"✓ vejde":(tight?"~ s napětím":"✕ nevejde"),{size:10.5,w:700,fill:col});
  });
  $("#duWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Velikost dutiny v mřížce"');
  ro("#duRo1","poměr r/R pro tuto dutinu",fmt(d.k,3),"maximální koule bez roztažení mřížky","");
  ro("#duRo2","maximální poloměr příměsi",fmt(rmax,1)+" pm","při poloměru hostitele "+R+" pm","");
  ro("#duRo3","počet dutin",d.n,"na atom nebo na buňku","");
  var carbon = 77<=rmax ? "uhlík (77 pm) se sem vejde bez problémů" : (77<=rmax*1.45 ? "uhlík (77 pm) se sem vtěsná, ale mřížku napne" : "uhlík (77 pm) se sem nevejde");
  $("#duList").innerHTML='<div class="callout '+(77<=rmax*1.45?"tip":"warn")+'" style="margin:0"><span class="eyebrow">'+d.d+' dutina v '+d.mr+'</span><p>'+d.pop+'</p><p style="margin-top:.4rem"><b>'+carbon+'.</b></p></div>';
}

/* ============================================================
   10 · k1 — POLYMORFIE ŽELEZA
   ============================================================ */
var FEMOD = [
 {to:912,  nm:"α‑železo (ferit)",  mr:"kpr", c:0.02, mag:"feromagnetické do 770 °C", col:"var(--endo)",
  d:"Prostorově centrovaná mřížka, koordinační číslo 8, zaplnění 68 %. Dutiny jsou drobné, takže uhlík se do ní téměř nevejde — rozpustnost je jen 0,02 %."},
 {to:1394, nm:"γ‑železo (austenit)", mr:"kpc", c:2.11, mag:"nemagnetické", col:"var(--exo)",
  d:"Plošně centrovaná mřížka, koordinační číslo 12, zaplnění 74 %. Přestože je hustší, má <b>velké oktaedrické dutiny</b> — uhlíku se do ní vejde až 2,11 %. Na tomhle skoku stojí kalení."},
 {to:1538, nm:"δ‑železo", mr:"kpr", c:0.09, mag:"nemagnetické", col:"var(--endo)",
  d:"Před tavením se mřížka vrací k&nbsp;prostorově centrované. Rozpustnost uhlíku opět klesá."},
 {to:3000, nm:"tavenina", mr:"—", c:0, mag:"nemagnetická", col:"var(--warn)",
  d:"Nad 1538 °C je železo kapalné. Uhlík se v&nbsp;tavenině rozpouští neomezeně — proto z&nbsp;vysoké pece vytéká surové železo se čtyřmi procenty uhlíku."}
];
function feFaze(t){ for(var i=0;i<FEMOD.length;i++){ if(t<FEMOD[i].to) return FEMOD[i]; } return FEMOD[3]; }
function drawFe(){
  var t=+$("#feT").value, f=feFaze(t), W=760, H=250, s='';
  $("#feTv").textContent=t+" °C";
  s+=panelTitle("modifikace železa při "+t+" °C");
  /* teplotní osa */
  var x0=60, xw=W-120, y=190;
  s+=line(x0,y,x0+xw,y,{c:"var(--line-strong)",w:1.4});
  var TMAX=1700;
  function X(T){ return x0+xw*T/TMAX; }
  var bands=[[20,912,"α (kpr)","var(--endo)"],[912,1394,"γ (kpc)","var(--exo)"],[1394,1538,"δ (kpr)","var(--endo)"],[1538,TMAX,"tavenina","var(--warn)"]];
  bands.forEach(function(b){
    s+=rect(X(b[0]),y-34,X(b[1])-X(b[0]),28,{fill:b[3],r:5,style:"fill-opacity:.35"});
    if(X(b[1])-X(b[0])>60) s+=txt((X(b[0])+X(b[1]))/2,y-14,b[2],{anchor:"middle",size:11.5,w:700,fill:"var(--ink)"});
  });
  [912,1394,1538].forEach(function(T){
    s+=line(X(T),y-40,X(T),y+6,{c:"var(--line-strong)",w:1,dash:"3 3"});
    s+=txt(X(T),y+20,String(T),{anchor:"middle",size:10,mono:true,fill:"var(--ink-3)"});
  });
  s+=txt(x0,y+20,"20",{anchor:"middle",size:10,mono:true,fill:"var(--ink-3)"});
  s+=txt(x0+xw,y+20,"1700 °C",{anchor:"end",size:10,mono:true,fill:"var(--ink-3)"});
  s+=line(X(t),y-52,X(t),y+8,{c:"var(--accent)",w:2.5});
  s+='<path d="M'+X(t)+' '+(y-52)+' l-5 -9 l10 0 z" style="fill:var(--accent)"/>';
  s+=txt(X(t),y-58,t+" °C",{anchor:"middle",size:11.5,w:700,fill:"var(--accent)"});
  /* mřížka vlevo nahoře */
  var cx=110, cy=76, a=46;
  if(f.mr!=="—"){
    var P=[[cx,cy+a],[cx+a,cy+a],[cx+a,cy],[cx,cy]], Q=P.map(function(p){return [p[0]+22,p[1]-20];});
    [[P[0],P[1]],[P[1],P[2]],[P[2],P[3]],[P[3],P[0]],[Q[0],Q[1]],[Q[1],Q[2]],[Q[2],Q[3]],[Q[3],Q[0]],[P[0],Q[0]],[P[1],Q[1]],[P[2],Q[2]],[P[3],Q[3]]]
      .forEach(function(e){ s+=line(e[0][0],e[0][1],e[1][0],e[1][1],{c:"var(--line)",w:1}); });
    var at=P.concat(Q).map(function(p){return [p[0],p[1]];});
    if(f.mr==="kpr"){ at.push([(P[0][0]+Q[2][0])/2,(P[0][1]+Q[2][1])/2]); }
    if(f.mr==="kpc"){
      at.push([(P[0][0]+P[2][0])/2,(P[0][1]+P[2][1])/2]);
      at.push([(Q[0][0]+Q[2][0])/2,(Q[0][1]+Q[2][1])/2]);
      at.push([(P[1][0]+Q[2][0])/2,(P[1][1]+Q[2][1])/2]);
      at.push([(P[0][0]+Q[3][0])/2,(P[0][1]+Q[3][1])/2]);
    }
    at.forEach(function(p){ s+=circ(p[0],p[1],8,{fill:f.col,stroke:"var(--paper)",sw:1.5,style:"fill-opacity:.9"}); });
  } else {
    /* neuspořádaná tavenina — pevné, deterministické rozmístění */
    var MELT=[[6,10],[34,4],[62,18],[14,38],[46,34],[74,44],[2,58],[28,62],[56,58],[80,26],[20,20],[68,66],[42,50],[88,52]];
    MELT.forEach(function(p){ s+=circ(cx-10+p[0],cy+p[1]*0.85,8,{fill:f.col,stroke:"var(--paper)",sw:1.5,style:"fill-opacity:.7"}); });
  }
  s+=txt(240,46,f.nm,{size:15,w:700,fill:f.col});
  s+=txt(240,68,f.mr==="kpr"?"kubická prostorově centrovaná":(f.mr==="kpc"?"kubická plošně centrovaná":"neuspořádaná kapalina"),{size:12,fill:"var(--ink-2)"});
  s+=txt(240,90,"maximální rozpustnost uhlíku = "+(f.c?fmt(f.c,2)+" %":"neomezená"),{size:12,w:600,fill:"var(--ink)"});
  s+=txt(240,112,f.mag,{size:12,fill:"var(--ink-2)"});
  $("#feWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Modifikace železa podle teploty"');
  ro("#feRo1","modifikace",f.nm.split(" ")[0],f.mr==="—"?"kapalné":(f.mr==="kpr"?"prostorově centrovaná":"plošně centrovaná"),"");
  ro("#feRo2","rozpustnost uhlíku",f.c?fmt(f.c,2)+" %":"neomezená",f.c===2.11?"maximum ze všech modifikací":"","pos");
  ro("#feRo3","magnetické chování",(t<770?"feromagnetické":"nemagnetické"),(t<770?"pod Curieovou teplotou 770 °C":"nad Curieovou teplotou 770 °C"),"");
  $("#feNote").innerHTML="<b>"+f.nm+".</b> "+f.d;
}
