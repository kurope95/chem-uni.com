/* ============================================================
   10 · SPOLEČNÉ POMOCNÉ FUNKCE PRO SVG
   ============================================================ */
function circ(cx,cy,r,o){
  o=o||{};
  return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" style="fill:'+(o.fill||"var(--surface-2)")+';'+
    (o.stroke?"stroke:"+o.stroke+";stroke-width:"+(o.sw||1)+";":"")+(o.style||"")+'"/>';
}
function hArrow(x1,x2,y,color,dashed){
  var s=line(x1,y,x2,y,{c:color,w:2,dash:dashed?"5 4":"",cap:"round"});
  var d=(x2>x1?1:-1);
  s+='<path d="M'+x2+' '+y+' l'+(-7*d)+' -4.5 l0 9 z" style="fill:'+color+'"/>';
  return s;
}
function panelTitle(s){
  return txt(14,18,s.toUpperCase(),{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
}
function capt(x,y,s){
  return txt(x,y,s.toUpperCase(),{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
}
function ro(id,k,v,h,cls){
  var e=$(id); if(!e) return;
  e.className="readout "+(cls||"");
  e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>';
}
function segSet(sel,val,attr){
  $$(sel+" button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset[attr]===val ? "true":"false"); });
}
function pickBy(arr,key,val){
  for(var i=0;i<arr.length;i++){ if(arr[i][key]===val) return arr[i]; }
  return arr[0];
}
function fillSel(id,arr,valKey,txtKey,sel){
  var e=$(id); if(!e) return;
  e.innerHTML=arr.map(function(o){
    return '<option value="'+o[valKey]+'"'+(o[valKey]===sel?' selected':'')+'>'+o[txtKey]+'</option>';
  }).join("");
}
/* šipka nahoru nebo dolů — elektron v orbitalovém políčku */
function spin(x,y,up,col){
  var c=col||"var(--accent)";
  if(up) return '<path d="M'+x+' '+(y+9)+' L'+x+' '+(y-9)+' M'+(x-3.4)+' '+(y-4.4)+' L'+x+' '+(y-9)+' L'+(x+3.4)+' '+(y-4.4)+'" style="fill:none;stroke:'+c+';stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"/>';
  return '<path d="M'+x+' '+(y-9)+' L'+x+' '+(y+9)+' M'+(x-3.4)+' '+(y+4.4)+' L'+x+' '+(y+9)+' L'+(x+3.4)+' '+(y+4.4)+'" style="fill:none;stroke:'+c+';stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"/>';
}
/* rozmístění n elektronů do k políček podle Hundova pravidla */
function hund(n,k){
  var a=[]; var i;
  for(i=0;i<k;i++) a.push(0);
  for(i=0;i<n;i++) a[i%k]++;
  return a;
}

/* ============================================================
   11 · HERO — PRŮZKUMNÍK PRVNÍ PŘECHODNÉ ŘADY
   ============================================================ */
var rdId="Cr";
var STAB=["", "vzácný stav", "běžný stav", "velmi stálý stav"];
function drawRada(){
  var e=pickBy(RADA,"s",rdId), W=760, H=300, s='';
  s+=panelTitle(e.n+" · protonové číslo Z = "+e.z);

  /* --- levý sloupec: orbitalová políčka --- */
  s+=capt(14,52,"zaplnění orbitalů valenční sféry");
  var nd=e.z-20; if(e.s==="Cr") nd=5; if(e.s==="Cu") nd=10;
  var ns=(e.s==="Cr"||e.s==="Cu")?1:2;
  var bx=20, by=66, bw=32, bh=32, gp=4;
  var occ=hund(nd,5), i;
  for(i=0;i<5;i++){
    var x=bx+i*(bw+gp);
    s+=rect(x,by,bw,bh,{fill:"var(--surface-2)",r:5,stroke:"var(--line-strong)",sw:1.2});
    if(occ[i]>=1) s+=spin(x+ (occ[i]>=2?11:16), by+16, true, "var(--endo)");
    if(occ[i]>=2) s+=spin(x+21, by+16, false, "var(--endo)");
  }
  var x4=bx+5*(bw+gp)+28;
  s+=rect(x4,by,bw,bh,{fill:"var(--surface-2)",r:5,stroke:"var(--line-strong)",sw:1.2});
  if(ns>=1) s+=spin(x4+(ns>=2?11:16), by+16, true, "var(--exo)");
  if(ns>=2) s+=spin(x4+21, by+16, false, "var(--exo)");
  s+=txt(bx+(5*(bw+gp)-gp)/2, by+bh+20, "3d", {anchor:"middle",size:13,w:700,fill:"var(--endo)"});
  s+=txt(x4+bw/2, by+bh+20, "4s", {anchor:"middle",size:13,w:700,fill:"var(--exo)"});

  s+=txt(20,150,"konfigurace = "+e.cfgI,{size:12.5,w:600,fill:"var(--ink)"});
  s+=txt(20,174, e.reg ? "odpovídá výstavbovému principu"
                       : "očekáváno by bylo "+e.ocek+" — nastal přesmyk",
        {size:11.5,fill:e.reg?"var(--ink-3)":"var(--warn)",w:e.reg?400:600});
  s+=txt(20,198,"nepárových elektronů v atomu = "+(occ.filter(function(v){return v===1;}).length+(ns===1?1:0)),
        {size:11.5,fill:"var(--ink-3)"});

  /* --- pravý sloupec: oxidační čísla --- */
  s+=capt(430,52,"dosahovaná oxidační čísla");
  var y0=78, st=26;
  e.ox.forEach(function(o,k){
    var y=y0+k*st;
    s+=txt(432,y+4,o[0],{size:12.5,w:700,mono:true,fill:"var(--ink)"});
    var w=42+o[1]*38;
    s+=rect(472,y-8,w,17,{fill:"var(--accent)",r:5,style:"fill-opacity:"+(0.32+0.2*o[1])});
    s+=txt(646,y+4,STAB[o[1]],{size:10.5,fill:"var(--ink-3)"});
  });

  /* --- barva akvaiontu --- */
  s+=capt(430,232,"nejběžnější akvaion a jeho barva");
  var bezb=(e.aqua.indexOf("bezbarv")>=0);
  s+=circ(446,264,16,{fill:bezb?"var(--surface-3)":"var(--accent)",stroke:"var(--line-strong)",sw:1.4,
                      style:bezb?"":"fill-opacity:.75"});
  s+=txt(474,258,e.aqI,{size:11.5,w:600,fill:"var(--ink)"});
  s+=txt(474,278,e.aqua,{size:11,fill:"var(--ink-3)"});

  $("#rdWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Průzkumník první přechodné řady"');
  ro("#rdRo1","elektronegativita (Pauling)",fmt(e.en,2),"bezrozměrná veličina","");
  ro("#rdRo2","teplota tání",fmt(e.tt,0)+" °C", e.tt>1500?"patří k nejvýše tajícím kovům":"nižší než uprostřed řady", e.tt>1500?"pos":"");
  ro("#rdRo3","kovový poloměr",fmt(e.rk,0)+" pm","pro koordinační číslo 12","");
  $("#rdPozn").innerHTML=e.pozn;
}
function initRada(){
  $$("#rdSeg button").forEach(function(b){
    b.addEventListener("click",function(){ rdId=this.dataset.rd; segSet("#rdSeg",rdId,"rd"); drawRada(); });
  });
  drawRada();
}

/* ============================================================
   12 · k0 — ENERGIE HLADIN 3d A 4s
   ============================================================ */
function e4s(Z){ return -1.0*(Z-17); }
function e3d(Z){ return -0.40*Math.pow(Z-17,1.75); }
function drawEn(){
  var Z=+$("#enZ").value, W=760, H=280, s='';
  $("#enZv").textContent=String(Z);
  s+=panelTitle("relativní poloha hladin 3d a 4s");
  s+=capt(14,50,"energie orbitalu — schematicky");
  var x0=70, x1=700, yTop=60, yBot=200, EMIN=-36;
  function X(z){ return x0+(z-18)/12*(x1-x0); }
  function Y(e){ return yTop+(-e)/(-EMIN)*(yBot-yTop); }
  /* mřížka a osa */
  s+=line(x0,yBot,x1,yBot,{c:"var(--line-strong)",w:1.3});
  [18,20,22,24,26,28,30].forEach(function(z){
    s+=line(X(z),yTop,X(z),yBot,{c:"var(--grid)",w:1,dash:"3 4"});
    s+=txt(X(z),218,String(z),{anchor:"middle",size:11,mono:true,fill:"var(--ink-3)"});
  });
  /* křivky */
  function path(f,col){
    var d="", z;
    for(z=18;z<=30;z+=0.25){ d+=(z===18?"M":"L")+X(z)+" "+Y(f(z))+" "; }
    return '<path d="'+d+'" style="fill:none;stroke:'+col+';stroke-width:2.6;stroke-linecap:round"/>';
  }
  s+=path(e4s,"var(--exo)");
  s+=path(e3d,"var(--endo)");
  s+=txt(712,Y(e4s(29))+4,"4s",{size:12.5,w:700,fill:"var(--exo)"});
  s+=txt(712,Y(e3d(29))+4,"3d",{size:12.5,w:700,fill:"var(--endo)"});
  /* svislý ukazatel */
  s+=line(X(Z),yTop-4,X(Z),yBot+6,{c:"var(--accent)",w:2.2});
  s+=circ(X(Z),Y(e4s(Z)),5,{fill:"var(--exo)",stroke:"var(--paper)",sw:2});
  s+=circ(X(Z),Y(e3d(Z)),5,{fill:"var(--endo)",stroke:"var(--paper)",sw:2});
  s+=txt(700,240,"protonové číslo Z",{anchor:"end",size:11,fill:"var(--ink-3)"});
  var niz = e3d(Z)<e4s(Z);
  s+=txt(70,266, niz ? "níž leží 3d — proto se elektrony 4s odtrhávají první"
                     : "níž leží 4s — proto se orbital 4s plní dřív",
        {size:11.5,w:600,fill:"var(--accent)"});
  $("#enWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Poloha hladin 3d a 4s podle protonového čísla"');

  var prvek = Z<=20 ? (Z===18?"argon":(Z===19?"draslík":"vápník")) : pickBy(RADA,"z",Z).n;
  ro("#enRo1","protonové číslo",String(Z),"prvek = "+prvek,"");
  ro("#enRo2","níže položená hladina", niz?"3d":"4s", niz?"orbitaly d už obsahují elektrony":"orbitaly d jsou ještě prázdné", niz?"pos":"neg");
  ro("#enRo3","co odchází při ionizaci první","elektrony 4s","pravidlo platí pro celý blok d","");
  $("#enVerd").innerHTML = niz
    ? "Od skandia dál je hladina <b>3d pod 4s</b>. Elektrony 4s jsou tedy nejvýš položené a při tvorbě kationtu odcházejí první — proto má <span class=\"chem\">Fe²⁺</span> konfiguraci <span class=\"chem\">3d⁶</span>, a nikoli 3d⁴ 4s²."
    : "Do vápníku (<span class=\"q\">Z</span> = 20) je hladina <b>4s pod 3d</b>, a proto se orbital 4s zaplní dřív. Jakmile ale do orbitalů d vstoupí první elektron, jádro na ně začne působit silněji a pořadí se otočí.";
}

/* ============================================================
   13 · k0 — LANTHANOIDOVÁ KONTRAKCE
   ============================================================ */
var lkId="rada";
function drawLk(){
  var W=760, H=300, s='';
  if(lkId==="rada"){
    s+=panelTitle("iontový poloměr M³⁺ napříč lanthanoidy");
    s+=capt(14,46,"poloměr iontu M³⁺ [pm], koordinační číslo 6");
    var x0=60, x1=730, yb=220, yt=60, RMIN=84, RMAX=106;
    function X(i){ return x0+i*(x1-x0)/(LANT.length-1); }
    function Y(r){ return yb-(r-RMIN)/(RMAX-RMIN)*(yb-yt); }
    [86,90,94,98,102].forEach(function(r){
      s+=line(x0-6,Y(r),x1,Y(r),{c:"var(--grid)",w:1,dash:"3 4"});
      s+=txt(52,Y(r)+4,String(r),{anchor:"end",size:10.5,mono:true,fill:"var(--ink-3)"});
    });
    var d="";
    LANT.forEach(function(L,i){ d+=(i?"L":"M")+X(i)+" "+Y(L.r)+" "; });
    s+='<path d="'+d+'" style="fill:none;stroke:var(--accent);stroke-width:2.4"/>';
    LANT.forEach(function(L,i){
      s+=circ(X(i),Y(L.r),4.6,{fill:"var(--accent)",stroke:"var(--paper)",sw:1.6});
      s+=txt(X(i),246,L.s,{anchor:"middle",size:11,w:600,fill:"var(--ink-2)"});
    });
    s+=txt(66,68,"La³⁺ = 103,2 pm",{size:11.5,w:600,fill:"var(--endo)"});
    s+=txt(724,196,"Lu³⁺ = 86,1 pm",{anchor:"end",size:11.5,w:600,fill:"var(--exo)"});
    s+=txt(60,276,"celkový pokles = 17,1 pm, tedy 16,6 % původní hodnoty",{size:11.5,w:600,fill:"var(--accent)"});
    $("#lkWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Pokles iontového poloměru napříč lanthanoidy"');
    ro("#lkRo1","poloměr La³⁺","103,2 pm","první prvek řady","");
    ro("#lkRo2","poloměr Lu³⁺","86,1 pm","poslední prvek řady","");
    ro("#lkRo3","průměrný pokles","1,22 pm","na jeden prvek řady","");
    $("#lkList").innerHTML='<div class="callout def" style="margin:0"><span class="eyebrow">Proč poloměr klesá, i když elektronů přibývá</span>'+
      '<p>Každý další proton přitahuje celý obal silněji, ale nový elektron jde do orbitalu <span class="chem">4f</span>, který je uvnitř atomu a <b>stíní velmi špatně</b>. Přírůstek přitažlivosti tedy převáží a obal se stáhne.</p></div>';
  } else {
    s+=panelTitle("dvojice, které kontrakce slepila dohromady");
    s+=capt(14,46,"kovový poloměr [pm]");
    var yb2=210;
    DVOJICE.forEach(function(P,k){
      var cx=130+k*170;
      function bar(x,r,col,lab){
        var h=(r-125)/45*150;
        return rect(x-14,yb2-h,28,h,{fill:col,r:4,style:"fill-opacity:.8"})+
               txt(x,yb2-h-8,String(r),{anchor:"middle",size:11,mono:true,w:600,fill:"var(--ink)"})+
               txt(x,228,lab,{anchor:"middle",size:12,w:700,fill:col});
      }
      s+=bar(cx-20,P.ra,"var(--endo)",P.a);
      s+=bar(cx+20,P.rb,"var(--exo)",P.b);
      s+=txt(cx,252,"skupina "+P.sk,{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
      var dr=Math.abs(P.ra-P.rb);
      s+=txt(cx,276,"rozdíl = "+fmt(dr,0)+" pm",{anchor:"middle",size:11,w:600,fill:"var(--accent)"});
    });
    s+=line(40,yb2,730,yb2,{c:"var(--line-strong)",w:1.3});
    $("#lkWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Poloměry dvojic prvků druhé a třetí přechodné řady"');
    ro("#lkRo1","rozdíl Zr a Hf","1 pm","přitom je Hf o celou periodu níž","pos");
    ro("#lkRo2","rozdíl Nb a Ta","0 pm","kovové poloměry jsou shodné","pos");
    ro("#lkRo3","rozdíl Mo a W","0 pm","liší se až stálostí stavu VI","");
    $("#lkList").innerHTML='<div class="callout def" style="margin:0"><span class="eyebrow">Co z toho plyne</span>'+
      '<p>Třetí přechodná řada by měla mít podstatně větší atomy než druhá — má přece o jednu vrstvu navíc. Lanthanoidová kontrakce ale toto zvětšení téměř přesně vyruší. Prvky pod sebou ve druhé a třetí řadě proto mají skoro stejné poloměry a chovají se skoro stejně. '+
      DVOJICE[0].pop+'</p></div>';
  }
}
function initLk(){
  $$("#lkSeg button").forEach(function(b){
    b.addEventListener("click",function(){ lkId=this.dataset.lk; segSet("#lkSeg",lkId,"lk"); drawLk(); });
  });
  drawLk();
}
