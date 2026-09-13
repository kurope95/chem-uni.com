/* ============================================================
   SPOLEČNÉ POMOCNÉ FUNKCE PRO KRESLENÍ
   ============================================================ */

/* vodorovná šipka s popiskem */
function hArrow(x1,x2,y,color,label,dbl){
  var s=line(x1,y,x2,y,{c:color,w:2,cap:"round"});
  var d=(x2>x1?1:-1);
  s+='<path d="M'+x2+' '+y+' l'+(-6*d)+' -4 l0 8 z" style="fill:'+color+'"/>';
  if(dbl) s+='<path d="M'+x1+' '+y+' l'+(6*d)+' -4 l0 8 z" style="fill:'+color+'"/>';
  if(label) s+=txt((x1+x2)/2,y-8,label,{anchor:"middle",size:11.5,w:600,fill:color});
  return s;
}
/* kroužek s popiskem uvnitř */
function atom(x,y,r,fill,label,lsize,lfill){
  var s='<circle cx="'+x+'" cy="'+y+'" r="'+r+'" style="fill:'+fill+'"/>';
  if(label) s+=txt(x,y+(lsize||11)*0.36,label,{anchor:"middle",size:lsize||11,w:700,fill:lfill||"var(--accent-ink)"});
  return s;
}
/* zaoblený rámeček s nadpisem */
function panelBox(x,y,w,h,title,color){
  var s=rect(x,y,w,h,{fill:"var(--surface-2)",r:10,stroke:color,sw:1.4});
  if(title) s+=txt(x+12,y-8,title,{size:11,w:700,fill:color,style:"letter-spacing:.07em"});
  return s;
}
/* jednoduchý sloupcový graf; data = [{l:popis, v:hodnota, c:barva}] */
function barChart(o){
  var W=o.W||720, H=o.H||230, L=o.L||58, R=18, T=o.T||34, B=o.B||46;
  var data=o.data, max=o.max||Math.max.apply(null,data.map(function(d){return d.v;}))*1.15 || 1;
  var pw=W-L-R, ph=H-T-B, s='';
  if(o.title) s+=txt(L,18,o.title,{size:11.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  /* mřížka a osa y */
  var steps=4;
  for(var i=0;i<=steps;i++){
    var yy=T+ph-ph*i/steps, vv=max*i/steps;
    s+=line(L,yy,L+pw,yy,{c:"var(--line)",w:1,dash:i?"3 4":""});
    s+=txt(L-8,yy+4,fmt(vv,o.dec===undefined?1:o.dec),{anchor:"end",size:10,fill:"var(--ink-3)",mono:true});
  }
  var bw=pw/data.length;
  data.forEach(function(d,i){
    var x=L+i*bw+bw*0.16, w=bw*0.68;
    var hh=Math.max(0,Math.min(1,d.v/max))*ph;
    s+=rect(x,T+ph-hh,w,hh,{fill:d.c||"var(--accent)",r:5,style:d.dim?"fill-opacity:.35":""});
    s+=txt(x+w/2,T+ph-hh-7,fmt(d.v,o.dec===undefined?1:o.dec),{anchor:"middle",size:11,w:700,fill:d.c||"var(--accent)",mono:true});
    var parts=String(d.l).split("|");
    parts.forEach(function(p,j){
      s+=txt(x+w/2,T+ph+16+j*13,p,{anchor:"middle",size:10.5,w:j?400:600,fill:j?"var(--ink-3)":"var(--ink-2)"});
    });
  });
  if(o.ylab) s+=txt(L,H-6,o.ylab,{size:10.5,fill:"var(--ink-3)"});
  return svg("0 0 "+W+" "+H,s,'aria-label="'+(o.aria||o.title||"graf")+'"');
}
function ro(id,k,v,h,cls){
  var e=$(id); if(!e) return;
  e.className="readout "+(cls||"");
  e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>';
}
function press(sel,val){ $$(sel+" button").forEach(function(b){ b.setAttribute("aria-pressed", String(b.dataset.v===val)); }); }

/* ============================================================
   1 · HERO — PROHLÍŽEČ KRYSTALOVÝCH STRUKTUR
   ============================================================ */
var xsState={id:"diamant",mode:"struct"};
function M_(id){ for(var i=0;i<MODIF.length;i++) if(MODIF[i].id===id) return MODIF[i]; return MODIF[0]; }

/* --- kresby jednotlivých struktur --- */
function drawDiamond(orb,el){
  el = el || {sym:"C",title:"DIAMANT · sp³ · trojrozměrná síť",
              sub:"žádný elektron nezbývá → izolant, nejtvrdší přírodní látka",
              bond:"každý atom váže čtyři sousedy, vazba C—C = 154 pm"};
  var s='', A="var(--accent)", E="var(--exo)";
  /* kostka s tetraedrickou sítí */
  var x0=250,y0=60,dx=150,dy=150,sk=58;
  function P(a,b,c){ return [x0+a*dx+c*sk, y0+b*dy-c*sk*0.55]; }
  var corners=[[0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,0,1],[1,0,1],[1,1,1],[0,1,1]];
  var cp=corners.map(function(c){ return P(c[0],c[1],c[2]); });
  var edges=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
  edges.forEach(function(e){ s+=line(cp[e[0]][0],cp[e[0]][1],cp[e[1]][0],cp[e[1]][1],{c:"var(--line-strong)",w:1,dash:"4 4"}); });
  /* středový atom + čtyři sousedé tetraedricky */
  var C=P(0.5,0.5,0.5);
  var nb=[P(0.15,0.15,0.15),P(0.85,0.85,0.15),P(0.85,0.15,0.85),P(0.15,0.85,0.85)];
  nb.forEach(function(n){ s+=line(C[0],C[1],n[0],n[1],{c:E,w:3.4,cap:"round"}); });
  nb.forEach(function(n){ s+=atom(n[0],n[1],10,A,el.sym,10); });
  s+=atom(C[0],C[1],13,A,el.sym,11.5);
  if(orb){
    nb.forEach(function(n){
      var mx=(C[0]+n[0])/2, my=(C[1]+n[1])/2;
      s+='<ellipse cx="'+mx+'" cy="'+my+'" rx="18" ry="9" transform="rotate('+(Math.atan2(n[1]-C[1],n[0]-C[0])*180/Math.PI)+' '+mx+' '+my+')" style="fill:'+E+';fill-opacity:.22"/>';
    });
    s+=txt(x0+dx/2+20,y0+dy+82,"čtyři hybridní orbitaly sp³ míří do vrcholů tetraedru, úhel 109,5°",{anchor:"middle",size:11.5,w:600,fill:E});
  } else {
    s+=txt(x0+dx/2+20,y0+dy+82,el.bond,{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  }
  s+=txt(24,26,el.title,{size:12,w:700,fill:A,style:"letter-spacing:.08em"});
  s+=txt(24,46,el.sub,{size:11,fill:"var(--ink-3)"});
  return s;
}
function drawGraphite(orb){
  var s='', A="var(--accent)", E="var(--exo)", D="var(--endo)";
  s+=txt(24,26,"GRAFIT · sp² · vrstvy",{size:12,w:700,fill:A,style:"letter-spacing:.08em"});
  s+=txt(24,46,"čtvrtý elektron zbývá a delokalizuje se → vodič v rovině vrstvy",{size:11,fill:"var(--ink-3)"});
  /* dvě vrstvy šestiúhelníků v perspektivě */
  function hexRow(oy,skew,op){
    var t='', r=26, cx0=140, cy=oy;
    for(var k=0;k<3;k++){
      var cx=cx0+k*(r*3);
      var pts=[];
      for(var i=0;i<6;i++){ var a=Math.PI/180*(60*i); pts.push([cx+r*Math.cos(a)+skew, cy+r*Math.sin(a)*0.52]); }
      for(var i=0;i<6;i++){
        var p=pts[i], q=pts[(i+1)%6];
        t+=line(p[0],p[1],q[0],q[1],{c:E,w:2.6,cap:"round"});
      }
      if(op>0.9) for(var i=0;i<6;i++) t+=atom(pts[i][0],pts[i][1],6.5,A,"",0);
    }
    return '<g style="opacity:'+op+'">'+t+'</g>';
  }
  s+=hexRow(232,42,0.42);
  s+=hexRow(160,0,1);
  s+=hexRow(88,-42,0.42);
  if(orb){
    /* orbitaly p kolmo k vrstvě */
    for(var k=0;k<7;k++){
      var x=150+k*30;
      s+='<ellipse cx="'+x+'" cy="'+(160-20)+'" rx="8" ry="17" style="fill:'+D+';fill-opacity:.3"/>';
      s+='<ellipse cx="'+x+'" cy="'+(160+20)+'" rx="8" ry="17" style="fill:'+D+';fill-opacity:.3"/>';
    }
    s+=txt(420,170,"orbitaly p kolmo k vrstvě",{size:11.5,w:600,fill:D});
    s+=txt(420,188,"se slévají do oblaku π",{size:11.5,w:600,fill:D});
  }
  s+=line(300,88,300,232,{c:D,w:1.6,dash:"5 4"});
  s+=hArrow(320,320,88,"var(--ink-3)","",false);
  s+=line(316,88,324,88,{c:"var(--ink-3)",w:1.4});
  s+=line(316,160,324,160,{c:"var(--ink-3)",w:1.4});
  s+=txt(332,128,"335 pm — jen van der Waalsovy síly",{size:11,w:600,fill:"var(--ink-3)"});
  s+=txt(332,146,"proto se vrstvy smýkají a grafit maže",{size:10.5,fill:"var(--ink-3)"});
  s+=txt(150,272,"vazba C—C ve vrstvě = 142 pm — kratší a pevnější než v diamantu",{size:11.5,w:600,fill:E});
  return s;
}
function drawFullerene(orb){
  var s='', A="var(--accent)", E="var(--exo)";
  s+=txt(24,26,"FULLEREN C₆₀ · sp² · uzavřená molekula",{size:12,w:700,fill:A,style:"letter-spacing:.08em"});
  s+=txt(24,46,"dvanáct pětiúhelníků a dvacet šestiúhelníků, průměr ≈ 0,7 nm",{size:11,fill:"var(--ink-3)"});
  var cx=360, cy=168, R=98;
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+R+'" style="fill:none;stroke:var(--line-strong);stroke-width:1.2;stroke-dasharray:4 4"/>';
  /* přední pětiúhelník */
  function poly(n,r,rot,ox,oy,col,w){
    var pts=[],t='';
    for(var i=0;i<n;i++){ var a=Math.PI/180*(rot+360/n*i); pts.push([ox+r*Math.cos(a), oy+r*Math.sin(a)]); }
    for(var i=0;i<n;i++){ var p=pts[i],q=pts[(i+1)%n]; t+=line(p[0],p[1],q[0],q[1],{c:col,w:w,cap:"round"}); }
    return {s:t,p:pts};
  }
  var pent=poly(5,34,-90,cx,cy,E,2.8);
  s+=pent.s;
  /* šestiúhelníky kolem */
  for(var i=0;i<5;i++){
    var a=Math.PI/180*(-90+72*i+36);
    var ox=cx+62*Math.cos(a), oy=cy+62*Math.sin(a);
    s+=poly(6,30,72*i,ox,oy,"var(--line-strong)",1.6).s;
  }
  pent.p.forEach(function(p){ s+=atom(p[0],p[1],7,A,"",0); });
  s+=txt(cx,cy+4,"C₆₀",{anchor:"middle",size:15,w:700,fill:A});
  if(orb){
    s+=txt(cx,cy+R+30,"pětiúhelníky vnášejí zakřivení — ze samých šestiúhelníků kouli neposkládáte",{anchor:"middle",size:11.5,w:600,fill:E});
  } else {
    s+=txt(cx,cy+R+30,"molekulová látka → jako jediná modifikace uhlíku se rozpouští",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  }
  return s;
}
function drawGraphene(orb){
  var s='', A="var(--accent)", E="var(--exo)", D="var(--endo)";
  s+=txt(24,26,"GRAFEN · sp² · jediná vrstva",{size:12,w:700,fill:A,style:"letter-spacing:.08em"});
  s+=txt(24,46,"látka tlustá jeden atom — izolována 2004",{size:11,fill:"var(--ink-3)"});
  var r=27, y0=170;
  for(var row=0;row<2;row++){
    for(var k=0;k<6;k++){
      var cx=110+k*(r*1.5)+ (row%2? r*0.75:0), cy=y0+row*(r*0.9);
      var pts=[];
      for(var i=0;i<6;i++){ var a=Math.PI/180*(60*i); pts.push([cx+r*Math.cos(a), cy+r*Math.sin(a)]); }
      for(var i=0;i<6;i++){ var p=pts[i],q=pts[(i+1)%6]; s+=line(p[0],p[1],q[0],q[1],{c:E,w:2.4,cap:"round"}); }
      for(var i=0;i<6;i++) s+=atom(pts[i][0],pts[i][1],5.5,A,"",0);
    }
  }
  if(orb){
    s+='<rect x="86" y="112" width="560" height="56" rx="10" style="fill:'+D+';fill-opacity:.18"/>';
    s+=txt(366,146,"delokalizovaný oblak π nad vrstvou",{anchor:"middle",size:12,w:600,fill:D});
    s+='<rect x="86" y="218" width="560" height="56" rx="10" style="fill:'+D+';fill-opacity:.18"/>';
    s+=txt(366,252,"a pod vrstvou — elektrony se pohybují po celé ploše",{anchor:"middle",size:12,w:600,fill:D});
  } else {
    s+=txt(366,288,"C—C = 142 pm, žádná další vrstva → nulový zakázaný pás, vede lépe než měď",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  }
  return s;
}
function drawSiLattice(orb){
  return drawDiamond(orb,{sym:"Si", title:"KŘEMÍK · sp³ · táž mřížka jako diamant",
    sub:"delší a slabší vazba → užší zakázaný pás → polovodič",
    bond:"každý atom váže čtyři sousedy, vazba Si—Si = 235 pm"});
}
function drawIcosa(orb){
  var s='', A="var(--accent)", E="var(--exo)", D="var(--endo)";
  s+=txt(24,26,"BOR · ikosaedr B₁₂",{size:12,w:700,fill:A,style:"letter-spacing:.08em"});
  s+=txt(24,46,"stavebním kamenem není atom, ale dvanáctiatomová klec",{size:11,fill:"var(--ink-3)"});
  var cx=360, cy=170, R=88;
  /* horní a dolní pětiúhelník + dva póly */
  var top=[], bot=[];
  for(var i=0;i<5;i++){
    var a=Math.PI/180*(-90+72*i);
    top.push([cx+R*0.86*Math.cos(a), cy-38+R*0.40*Math.sin(a)]);
    var b=Math.PI/180*(-90+72*i+36);
    bot.push([cx+R*0.86*Math.cos(b), cy+38+R*0.40*Math.sin(b)]);
  }
  var pN=[cx,cy-R], pS=[cx,cy+R];
  function ln(p,q,c,w){ return line(p[0],p[1],q[0],q[1],{c:c,w:w,cap:"round"}); }
  for(var i=0;i<5;i++){
    s+=ln(top[i],top[(i+1)%5],E,2.2);
    s+=ln(bot[i],bot[(i+1)%5],E,2.2);
    s+=ln(pN,top[i],E,2.0);
    s+=ln(pS,bot[i],E,2.0);
    s+=ln(top[i],bot[i],"var(--line-strong)",1.4);
    s+=ln(top[(i+1)%5],bot[i],"var(--line-strong)",1.4);
  }
  if(orb){
    for(var i=0;i<5;i++){
      var mx=(top[i][0]+top[(i+1)%5][0]+cx)/3, my=(top[i][1]+top[(i+1)%5][1]+cy)/3;
      s+='<circle cx="'+mx+'" cy="'+my+'" r="10" style="fill:'+D+';fill-opacity:.32"/>';
    }
    s+=txt(cx,cy+R+34,"uzavřené třístředové vazby míří do těžiště trojúhelníků",{anchor:"middle",size:11.5,w:600,fill:D});
  } else {
    s+=txt(cx,cy+R+34,"ikosaedry se propojují jednoduchými i třístředovými vazbami do tvrdé sítě",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  }
  top.concat(bot).forEach(function(p){ s+=atom(p[0],p[1],8,A,"B",9.5); });
  s+=atom(pN[0],pN[1],9,A,"B",10);
  s+=atom(pS[0],pS[1],9,A,"B",10);
  return s;
}
function drawSoot(orb){
  var s='', A="var(--accent)", E="var(--exo)";
  s+=txt(24,26,"SAZE A AKTIVNÍ UHLÍ · neuspořádané domény grafitu",{size:12,w:700,fill:A,style:"letter-spacing:.08em"});
  s+=txt(24,46,"členitý povrch 500 až 1500 m²·g⁻¹ dělá z uhlíku sorbent",{size:11,fill:"var(--ink-3)"});
  /* nepravidelné shluky vrstviček */
  var seeds=[[130,120,18],[210,180,26],[300,110,22],[380,190,30],[470,130,20],[540,200,24],[180,250,20],[330,265,26],[470,255,22],[590,120,18]];
  seeds.forEach(function(q,i){
    var rot=(i*37)%180;
    for(var k=0;k<3;k++){
      s+='<rect x="'+(q[0]-q[2])+'" y="'+(q[1]-3+k*7)+'" width="'+(q[2]*2)+'" height="2.6" rx="1.3" transform="rotate('+rot+' '+q[0]+' '+q[1]+')" style="fill:'+E+';fill-opacity:'+(0.75-k*0.15)+'"/>';
    }
  });
  if(orb){
    seeds.forEach(function(q){ s+='<circle cx="'+q[0]+'" cy="'+q[1]+'" r="'+(q[2]+9)+'" style="fill:none;stroke:var(--endo);stroke-width:1.2;stroke-dasharray:3 3"/>'; });
    s+=txt(360,300,"každý okraj vrstvičky je nevysycená vazba — proto tak silně sorbuje",{anchor:"middle",size:11.5,w:600,fill:"var(--endo)"});
  } else {
    s+=txt(360,300,"drobné, špatně uspořádané krystalky grafitu s obrovským povrchem",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  }
  return s;
}
function drawNanotube(orb){
  var s='', A="var(--accent)", E="var(--exo)", D="var(--endo)";
  s+=txt(24,26,"UHLÍKOVÁ NANOTRUBICE · svinutá vrstva grafenu",{size:12,w:700,fill:A,style:"letter-spacing:.08em"});
  s+=txt(24,46,"podle úhlu svinutí vyjde kovový vodič, nebo polovodič",{size:11,fill:"var(--ink-3)"});
  var y0=170, ry=52, x1=120, x2=610;
  s+='<ellipse cx="'+x1+'" cy="'+y0+'" rx="20" ry="'+ry+'" style="fill:var(--surface-3);stroke:'+E+';stroke-width:2"/>';
  s+=line(x1,y0-ry,x2,y0-ry,{c:E,w:2.4});
  s+=line(x1,y0+ry,x2,y0+ry,{c:E,w:2.4});
  s+='<ellipse cx="'+x2+'" cy="'+y0+'" rx="20" ry="'+ry+'" style="fill:none;stroke:'+E+';stroke-width:2"/>';
  /* šroubovicové linie */
  for(var k=0;k<9;k++){
    var xa=x1+30+k*58;
    s+='<path d="M'+xa+' '+(y0-ry)+' Q '+(xa+34)+' '+y0+' '+xa+' '+(y0+ry)+'" style="fill:none;stroke:var(--line-strong);stroke-width:1.2"/>';
  }
  for(var k=0;k<5;k++){
    var yy=y0-ry+k*(ry/2);
    s+='<path d="M'+(x1+18)+' '+yy+' L '+(x2-4)+' '+yy+'" style="fill:none;stroke:var(--line);stroke-width:.9;stroke-dasharray:3 5"/>';
  }
  if(orb){
    s+='<rect x="'+x1+'" y="'+(y0-ry-16)+'" width="'+(x2-x1)+'" height="14" rx="7" style="fill:'+D+';fill-opacity:.3"/>';
    s+='<rect x="'+x1+'" y="'+(y0+ry+2)+'" width="'+(x2-x1)+'" height="14" rx="7" style="fill:'+D+';fill-opacity:.3"/>';
    s+=txt(360,y0+ry+42,"oblak π obaluje trubici zvenku i zevnitř — elektron běží podél celé délky",{anchor:"middle",size:11.5,w:600,fill:D});
  } else {
    s+=txt(360,y0+ry+42,"tatáž šestiúhelníková síť jako v grafenu, jen svinutá do válce",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  }
  return s;
}
var XS_DRAW={diamant:drawDiamond,grafit:drawGraphite,fulleren:drawFullerene,nanotrubice:drawNanotube,
             grafen:drawGraphene,sazre:drawSoot,kremik:drawSiLattice,bor:drawIcosa};

function drawXs(){
  var m=M_(xsState.id), orb=xsState.mode==="orb";
  press("#xsMode",xsState.mode);
  var inner=(XS_DRAW[m.id]||drawDiamond)(orb);
  $("#xsWrap").innerHTML=svg("0 0 720 320",inner,'aria-label="Struktura: '+m.jm+'"');
  ro("#xsRo1","hybridizace",m.hyb.split("(")[0].trim(),m.sit);
  ro("#xsRo2","hustota",m.rho?fmt(m.rho,2)+" g·cm⁻³":"—",m.dl);
  ro("#xsRo3","zakázaný pás",fmt(m.pas,2)+" eV",m.vod);
  $("#xsTxt").innerHTML="<b>"+m.jm+"</b> — "+m.pop;
}
function initXs(){
  $("#xsSel").innerHTML=MODIF.map(function(m){ return '<option value="'+m.id+'">'+m.jm+'</option>'; }).join("");
  $("#xsSel").value=xsState.id;
  $("#xsSel").addEventListener("change",function(){ xsState.id=this.value; drawXs(); });
  $$("#xsMode button").forEach(function(b){ b.addEventListener("click",function(){ xsState.mode=b.dataset.v; drawXs(); }); });
  drawXs();
}

/* ============================================================
   2 · K0 — PRŮZKUMNÍK VAZEBNÝCH MOŽNOSTÍ
   ============================================================ */
var veState={el:"C",prop:"en"};
var VE_META={
  en:{t:"Elektronegativita (Paulingova stupnice)",u:"",d:2,pop:"Uprostřed stupnice → převážně kovalentní vazby. Uhlík je z trojice nejelektronegativnější, křemík nejméně."},
  ipot:{t:"První ionizační energie",u:"kJ·mol⁻¹",d:0,pop:"Uhlík má nejvyšší — jeho malý atom drží elektrony nejpevněji. Proto z něj nikdy nevznikne kation."},
  rkov:{t:"Kovalentní poloměr",u:"pm",d:0,pop:"Skok mezi 2. a 3. periodou je obrovský. Právě proto křemík netvoří vazby π: jeho orbitaly 3p jsou příliš rozlehlé na boční překryv."},
  tt:{t:"Teplota tání",u:"°C",d:0,pop:"Všechny čtyři prvky jsou kovalentní sítě, proto tají vysoko. Klesající trend dolů skupinou kopíruje slábnoucí vazbu."}
};
function drawVe(){
  var p=PRVKY[veState.el], meta=VE_META[veState.prop];
  press("#veEl",veState.el);
  var order=["B","C","Si","Ge"];
  var data=order.map(function(k){
    var e=PRVKY[k];
    return {l:e.s+"|"+e.jm, v:e[veState.prop], c:k===veState.el?"var(--accent)":"var(--cat2)", dim:k!==veState.el};
  });
  $("#veWrap").innerHTML=barChart({W:720,H:230,data:data,dec:meta.d,
    title:meta.t.toUpperCase()+(meta.u?" ["+meta.u+"]":""),
    aria:meta.t});
  ro("#veRo1","konfigurace",p.konf,p.val);
  ro("#veRo2","hybridizace",p.s,p.hyb);
  ro("#veRo3","oxidační čísla",p.s,p.oxc);
  $("#veTxt").innerHTML="<b>"+p.jm.charAt(0).toUpperCase()+p.jm.slice(1)+" — "+p.typ+".</b> Maximální vaznost: "+p.max+". "+p.prc;
  $("#veZaj").innerHTML="<b>Graf:</b> "+meta.pop+" &nbsp;·&nbsp; <b>Za zmínku stojí:</b> "+p.zaj;
}
function initVe(){
  $$("#veEl button").forEach(function(b){ b.addEventListener("click",function(){ veState.el=b.dataset.v; drawVe(); }); });
  $("#veProp").addEventListener("change",function(){ veState.prop=this.value; drawVe(); });
  drawVe();
}

/* ============================================================
   3 · K1 — POROVNÁVAČ MODIFIKACÍ UHLÍKU
   ============================================================ */
var moState={id:"diamant",prop:"rho"};
var MO_META={
  rho:{t:"Hustota",u:"g·cm⁻³",d:2},
  mohs:{t:"Tvrdost podle Mohse",u:"",d:1},
  pas:{t:"Zakázaný pás",u:"eV",d:2}
};
function drawMo(){
  var m=M_(moState.id), meta=MO_META[moState.prop];
  var data=MODIF.map(function(x){
    return {l:x.jm.replace(" (pro srovnání)","").replace("Uhlíková ","").split(" ").slice(0,2).join("|"),
            v:x[moState.prop], c:x.id===moState.id?"var(--accent)":(x.vz.indexOf("Si")===0?"var(--cat1)":(x.vz==="B"?"var(--cat3)":"var(--cat2)")),
            dim:x.id!==moState.id};
  });
  $("#moWrap").innerHTML=barChart({W:720,H:250,B:60,data:data,dec:meta.d,
    title:meta.t.toUpperCase()+(meta.u?" ["+meta.u+"]":""),aria:meta.t});
  ro("#moRo1","hybridizace",m.hyb.split("(")[0].trim(),m.sit);
  ro("#moRo2","vodivost",m.pas===0?"vodivá":(m.pas>3?"izolant":"polovodič"),m.vod+" · zakázaný pás "+fmt(m.pas,2)+" eV");
  ro("#moRo3","objeveno / známo",m.rok.split(",")[0],m.dl);
  $("#moPop").innerHTML="<b>"+m.jm+".</b> "+m.pop;
  $("#moTxt").innerHTML="<b>Vlastnosti:</b> "+m.vlast+"<br><b>Použití:</b> "+m.pouz;
}
function initMo(){
  $("#moSel").innerHTML=MODIF.map(function(m){ return '<option value="'+m.id+'">'+m.jm+'</option>'; }).join("");
  $("#moSel").value=moState.id;
  $("#moSel").addEventListener("change",function(){ moState.id=this.value; drawMo(); });
  $("#moProp").addEventListener("change",function(){ moState.prop=this.value; drawMo(); });
  drawMo();
}
