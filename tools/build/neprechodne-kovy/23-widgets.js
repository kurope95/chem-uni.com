/* ============================================================
   16 · k6 — EFEKT INERTNÍHO PÁRU
   Hodnoty: ionizační energie podle NIST, průměrné energie vazby
   M—Cl podle běžných tabulek anorganické chemie.
   ============================================================ */
var ipSel="13";
var NPIP={
 "13":{nm:"skupina 13", lo:"I", hi:"III", ieNm:"I₂ + I₃",
   list:[{s:"Al",n:"hliník",   ie:4561.5,vaz:421,rLo:0,rHi:3,pozn:"stav I prakticky neexistuje"},
         {s:"Ga",n:"gallium",  ie:4942.3,vaz:354,rLo:1,rHi:3,pozn:"stav I jen ve zvláštních sloučeninách"},
         {s:"In",n:"indium",   ie:4524.7,vaz:328,rLo:1,rHi:3,pozn:"převládá III, I se už objevuje"},
         {s:"Tl",n:"thallium", ie:4849.0,vaz:253,rLo:3,rHi:1,pozn:"převládá I, III je silné oxidovadlo"}]},
 "14":{nm:"skupina 14", lo:"II", hi:"IV", ieNm:"I₃ + I₄",
   list:[{s:"Ge",n:"germanium",ie:7713.1,vaz:349,rLo:1,rHi:3,pozn:"stav II disproporcionuje"},
         {s:"Sn",n:"cín",      ie:6873.3,vaz:323,rLo:2,rHi:3,pozn:"oba stavy běžné, IV o něco stálejší"},
         {s:"Pb",n:"olovo",    ie:7164.5,vaz:244,rLo:3,rHi:1,pozn:"převládá II, IV je silné oxidovadlo"}]}
};
var NPRANK=["nestálý","málo stálý","stálý","velmi stálý"];
function drawIp(){
  var g=NPIP[ipSel], view=$("#ipView").value||"ie", L=g.list, n=L.length;
  var W=760, H=336, s='', i;
  s+=npTitle("Efekt inertního páru · "+g.nm);
  var cap = view==="ie" ? ("cena za vyšší stav "+g.hi+" — součet "+g.ieNm+" [kJ·mol⁻¹]")
          : view==="vaz" ? "průměrná energie vazby M—Cl [kJ·mol⁻¹]"
          : "relativní stálost obou oxidačních stavů (čtyřstupňová škála)";
  s+=npCap(42,cap);
  var x0=70, gw=650, base=250, top=78, slot=gw/n;
  s+=line(x0-10,base,x0+gw+6,base,{c:"var(--line-strong)",w:1.4});
  var maxv=1;
  for(i=0;i<n;i++) maxv=Math.max(maxv, view==="ie"?L[i].ie:(view==="vaz"?L[i].vaz:4));
  for(i=0;i<n;i++){
    var e=L[i], cx=x0+i*slot+slot/2, lam=(e.rLo>e.rHi);
    if(view==="stab"){
      var bw=52, h1=(base-top)*(e.rLo+1)/5, h2=(base-top)*(e.rHi+1)/5;
      s+=rect(cx-bw-6,base-h1,bw,h1,{fill:"var(--endo)",r:5,style:"fill-opacity:.75"});
      s+=rect(cx+6,base-h2,bw,h2,{fill:"var(--exo)",r:5,style:"fill-opacity:.75"});
      s+=txt(cx-bw/2-6,base-h1-9,NPRANK[e.rLo],{anchor:"middle",size:9.5,w:700,fill:"var(--endo)"});
      s+=txt(cx+bw/2+6,base-h2-9,NPRANK[e.rHi],{anchor:"middle",size:9.5,w:700,fill:"var(--exo)"});
      s+=txt(cx-bw/2-6,base+20,g.lo,{anchor:"middle",size:12,w:700,fill:"var(--endo)"});
      s+=txt(cx+bw/2+6,base+20,g.hi,{anchor:"middle",size:12,w:700,fill:"var(--exo)"});
    } else {
      var v=(view==="ie")?e.ie:e.vaz, bw2=78, h=(base-top)*v/maxv;
      var col=lam?"var(--accent)":(view==="ie"?"var(--exo)":"var(--endo)");
      s+=rect(cx-bw2/2,base-h,bw2,h,{fill:col,r:5,style:"fill-opacity:.75"});
      s+=txt(cx,base-h-9,fmt(v,0),{anchor:"middle",size:12,w:700,fill:col,mono:true});
      s+=txt(cx,base+20,view==="ie"?("stav "+g.hi):"M—Cl",{anchor:"middle",size:11,fill:"var(--ink-3)"});
    }
    s+=txt(cx,base+44,e.s,{anchor:"middle",size:14,w:700,fill:lam?"var(--accent)":"var(--ink)"});
    s+=txt(cx,base+64,lam?("převládá "+g.lo):("převládá "+g.hi),{anchor:"middle",size:10.5,w:lam?700:400,fill:lam?"var(--accent)":"var(--ink-3)"});
  }
  $("#ipWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Efekt inertního páru ve skupině"');

  var last=L[n-1], prev=L[n-2];
  npRo("#ipRo1","kde se převaha láme",last.s+" — "+last.n,"šestá perioda, pár ns² zůstává");
  npRo("#ipRo2","ionizace zdraží o",fmt(last.ie-prev.ie,0)+" kJ·mol⁻¹","proti předchozímu prvku ve skupině");
  npRo("#ipRo3","dvě vazby vynesou méně o",fmt(2*(prev.vaz-last.vaz),0)+" kJ·mol⁻¹","dohromady "+fmt((last.ie-prev.ie)+2*(prev.vaz-last.vaz),0)+" kJ·mol⁻¹ proti stavu "+g.hi);
  $("#ipText").innerHTML='<p class="eq" style="margin:0">Přechod od prvku <b>'+prev.s+'</b> k&nbsp;prvku <b>'+last.s+
    '</b> zdraží ionizaci páru o&nbsp;'+fmt(last.ie-prev.ie,0)+'&nbsp;kJ·mol⁻¹ a&nbsp;zároveň sníží výnos ze dvou vazeb navíc o&nbsp;'+
    fmt(2*(prev.vaz-last.vaz),0)+'&nbsp;kJ·mol⁻¹. Obojí táhne proti vyššímu stavu, a&nbsp;proto u&nbsp;'+last.n+
    ' převládne oxidační číslo '+g.lo+'. '+last.pozn.charAt(0).toUpperCase()+last.pozn.slice(1)+'.</p>';
}
function initIp(){
  $$("#ipSeg button").forEach(function(b){
    b.addEventListener("click",function(){
      ipSel=b.dataset.ip;
      $$("#ipSeg button").forEach(function(x){ x.setAttribute("aria-pressed",String(x===b)); });
      drawIp();
    });
  });
  drawIp();
}

/* ============================================================
   17 · k6 — RELATIVISTICKÝ EFEKT
   ============================================================ */
var NPRLZ=[{z:13,s:"Al"},{z:31,s:"Ga"},{z:49,s:"In"},{z:81,s:"Tl"}];
function drawRl(){
  var Z=+$("#rlZ").value;
  $("#rlZv").textContent=String(Z);
  var W=760, H=306, s='';
  s+=npTitle("Relativistická kontrakce orbitalu s");
  var x0=70, x1=700, yb=240, yt=70, zmin=5, zmax=92, vmax=0.7;
  function X(z){ return x0+(z-zmin)/(zmax-zmin)*(x1-x0); }
  function Y(v){ return yb-v/vmax*(yb-yt); }
  s+=txt(70,48,"rychlost elektronu 1s jako podíl rychlosti světla",{size:11,w:500,fill:"var(--ink-3)"});
  s+=line(x0,yb,x1,yb,{c:"var(--line-strong)",w:1.4});
  s+=line(x0,yb,x0,yt,{c:"var(--line-strong)",w:1.4});
  var i;
  for(i=10;i<=90;i+=10){
    s+=line(X(i),yb,X(i),yb+5,{c:"var(--line)",w:1});
    s+=txt(X(i),yb+22,String(i),{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true});
  }
  for(i=0;i<=6;i+=2){
    var vv=i/10;
    s+=line(x0-5,Y(vv),x0,Y(vv),{c:"var(--line)",w:1});
    s+=txt(x0-11,Y(vv)+4,fmt(vv,1),{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true});
  }
  s+=txt(385,286,"protonové číslo Z",{anchor:"middle",size:11.5,fill:"var(--ink-3)"});
  /* křivka */
  var d="";
  for(i=zmin;i<=zmax;i++) d+=(i===zmin?"M":" L")+fmt(X(i),1).replace(",",".")+" "+fmt(Y(i/137.036),1).replace(",",".");
  s+='<path d="'+d+'" style="fill:none;stroke:var(--accent);stroke-width:2.4"/>';
  /* významné prvky */
  for(i=0;i<NPRLZ.length;i++){
    var e=NPRLZ[i], ex=X(e.z), ey=Y(e.z/137.036);
    s+='<circle cx="'+ex+'" cy="'+ey+'" r="4.4" style="fill:var(--surface);stroke:var(--ink-3);stroke-width:1.8"/>';
    s+=txt(ex,ey+26,e.s,{anchor:"middle",size:11.5,w:700,fill:"var(--ink-3)"});
  }
  /* ukazatel */
  var vc=Z/137.036, gam=1/Math.sqrt(1-vc*vc), mx=X(Z), my=Y(vc);
  s+='<circle cx="'+mx+'" cy="'+my+'" r="7" style="fill:var(--accent)"/>';
  s+=txt(npClamp(mx,90,x0,x1),my-21,"Z = "+Z+" · v/c = "+fmt(vc,2),{anchor:"middle",size:12,w:700,fill:"var(--accent)"});
  $("#rlWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Rychlost elektronu 1s v závislosti na protonovém čísle"');

  npRo("#rlRo1","rychlost elektronu 1s","v/c = "+fmt(vc,3),"odhad v/c ≈ Z / 137");
  npRo("#rlRo2","relativistický faktor","γ = "+fmt(gam,3),"o tolik vzroste hmotnost elektronu");
  npRo("#rlRo3","stažení orbitalu s","na "+fmt(100/gam,1)+" % původního poloměru","poloměr je nepřímo úměrný hmotnosti");
  var kdo="";
  if(Z>=79) kdo="V téhle oblasti už je efekt tak silný, že vysvětlí i barvu zlata a kapalnost rtuti.";
  else if(Z>=45) kdo="Tady se efekt začíná projevovat naplno — proto se inertní pár láme až v šesté periodě.";
  else kdo="U lehkých prvků je efekt zanedbatelný, a proto se u hliníku ani u gallia inertní pár neuplatní.";
  $("#rlText").innerHTML='<p class="eq" style="margin:0">'+kdo+'</p>';
}

/* ============================================================
   18 · k7 — REDOXNÍ PÁRY CÍNU A OLOVA
   ============================================================ */
var rxSel="sn";
var NPRX=[
 {k:"mn", nm:"MnO₄⁻ / Mn²⁺", E:1.51},
 {k:"pb", nm:"PbO₂ / Pb²⁺",  E:1.455},
 {k:"tl", nm:"Tl³⁺ / Tl⁺",   E:1.25},
 {k:"fe", nm:"Fe³⁺ / Fe²⁺",  E:0.77},
 {k:"sn", nm:"Sn⁴⁺ / Sn²⁺",  E:0.15},
 {k:"pb2",nm:"Pb²⁺ / Pb",    E:-0.13},
 {k:"sn2",nm:"Sn²⁺ / Sn",    E:-0.14}
];
var NPRXD={
 sn:{t:"Cínatý ion je redukovadlo.", d:"Pár Sn⁴⁺/Sn²⁺ leží nízko (+0,15 V), takže Sn²⁺ ochotně odevzdá dva elektrony komukoli, kdo leží výš. Zredukuje proto Fe³⁺ na Fe²⁺, ale i rtuťnaté a stříbrné soli. Souvisí to přímo s inertním párem: u cínu je stav IV ten stálejší, a proto se do něj Sn²⁺ tlačí."},
 pb:{t:"Oxid olovičitý je silné oxidovadlo.", d:"Pár PbO₂/Pb²⁺ leží vysoko (+1,46 V), jen o kousek pod manganistanem. Olovo v oxidačním stavu IV se chce vrátit na stav II, a proto bere elektrony i chloridům a manganatým iontům. Tohle je efekt inertního páru přeložený do elektrochemického jazyka."},
 tl:{t:"Thallitý ion je také silné oxidovadlo.", d:"Pár Tl³⁺/Tl⁺ leží na +1,25 V. Stejná logika jako u olova, jen o skupinu vedle: u thallia je stálý stav I, takže se stav III snaží dolů. Naproti tomu pár Tl⁺/Tl leží na −0,34 V a kovové thallium je běžný neušlechtilý kov."},
 fe:{t:"Železitý ion slouží jako měřítko.", d:"Pár Fe³⁺/Fe²⁺ na +0,77 V je běžné mírné oxidovadlo. Leží nad cínem, ale hluboko pod oxidem olovičitým — proto Sn²⁺ zredukuje Fe³⁺, ale Pb²⁺ nikoli. Porovnáním s tímhle párem se dá rychle rozhodnout, co s čím zreaguje."}
};
function drawRx(){
  var W=760, H=344, s='';
  s+=npTitle("Standardní redukční potenciály · kdo koho oxiduje");
  var ax=150, yb=290, yt=68, emin=-0.5, emax=1.8;
  function Y(e){ return yb-(e-emin)/(emax-emin)*(yb-yt); }
  s+=line(ax,yb,ax,yt,{c:"var(--line-strong)",w:1.6});
  s+=txt(20,50,"standardní redukční potenciál E° [V]",{size:11,w:600,fill:"var(--ink-3)"});
  var i;
  for(i=-5;i<=18;i+=5){
    var ee=i/10;
    s+=line(ax-6,Y(ee),ax,Y(ee),{c:"var(--line)",w:1.2});
    s+=txt(ax-12,Y(ee)+4,(ee===0?"0":sgn(ee,1)),{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true});
  }
  var items=NPRX.map(function(p){ return {y:Y(p.E), p:p}; });
  items=npDeclutter(items,23,yt+4,yb+6);
  for(i=0;i<items.length;i++){
    var it=items[i], p=it.p, on=(p.k===rxSel);
    var col=on?"var(--accent)":(p.E>0.5?"var(--exo)":"var(--endo)");
    s+=line(ax,it.y,ax+22,it.ly,{c:col,w:on?2:1.2});
    s+='<circle cx="'+ax+'" cy="'+it.y+'" r="'+(on?6:4)+'" style="fill:'+col+'"/>';
    s+=txt(ax+30,it.ly+4,p.nm+" = "+sgn(p.E,2)+" V",{size:12,w:on?700:500,fill:col,mono:false});
  }
  s+=txt(20,88,"silná oxidovadla",{size:10.5,w:600,fill:"var(--exo)"});
  s+=txt(20,272,"silná redukovadla",{size:10.5,w:600,fill:"var(--endo)"});
  s+=txt(20,328,"platí: pár s vyšším E° oxiduje pár s nižším E°",{size:11.5,w:600,fill:"var(--ink-3)"});
  $("#rxWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Stupnice standardních potenciálů"');

  var sel=null;
  for(i=0;i<NPRX.length;i++) if(NPRX[i].k===rxSel) sel=NPRX[i];
  var dd=NPRXD[rxSel]||NPRXD.sn;
  npRo("#rxRo1","vybraný pár",sel.nm,"standardní redukční potenciál");
  npRo("#rxRo2","hodnota E°",sgn(sel.E,2)+" V",sel.E>0.5?"chová se jako oxidovadlo":"chová se spíš jako redukovadlo");
  npRo("#rxRo3","rozdíl proti páru Fe³⁺/Fe²⁺",sgn(sel.E-0.77,2)+" V",sel.E>0.77?"zoxiduje železnatý ion":"železitý ion ho zoxiduje");
  $("#rxText").innerHTML='<p class="eq" style="margin:0"><b>'+dd.t+'</b> '+dd.d+'</p>';
}
function initRx(){
  $$("#rxSeg button").forEach(function(b){
    b.addEventListener("click",function(){
      rxSel=b.dataset.rx;
      $$("#rxSeg button").forEach(function(x){ x.setAttribute("aria-pressed",String(x===b)); });
      drawRx();
    });
  });
  drawRx();
}

/* ============================================================
   19 · k7 — OLOVĚNÝ AKUMULÁTOR
   ============================================================ */
var akMode="vyb";
function drawAk(){
  var soc=+$("#akSoc").value;
  $("#akSocv").textContent=String(soc);
  var ucell=1.95+0.17*soc/100, rho=1.10+0.18*soc/100, sul=100-soc;
  var W=780, H=340, s='';
  s+=npTitle("Olověný akumulátor · "+(akMode==="vyb"?"vybíjení":"nabíjení"));
  var cx0=120, cx1=650, cy0=76, cy1=248;
  s+=rect(cx0,cy0,cx1-cx0,cy1-cy0,{fill:"var(--accent)",r:12,stroke:"var(--line-strong)",sw:1.6,style:"fill-opacity:.09"});
  /* elektrody */
  var ew=54;
  s+=rect(cx0+56,cy0+34,ew,cy1-cy0-70,{fill:"var(--endo)",r:5,style:"fill-opacity:"+(0.35+0.5*soc/100)});
  s+=rect(cx1-56-ew,cy0+34,ew,cy1-cy0-70,{fill:"var(--exo)",r:5,style:"fill-opacity:"+(0.35+0.5*soc/100)});
  s+=txt(cx0+56+ew/2,cy0+22,"Pb — záporná",{anchor:"middle",size:11.5,w:700,fill:"var(--endo)"});
  s+=txt(cx1-56-ew/2,cy0+22,"PbO₂ — kladná",{anchor:"middle",size:11.5,w:700,fill:"var(--exo)"});
  /* elektrolyt */
  s+=txt((cx0+cx1)/2,cy0+70,"H₂SO₄",{anchor:"middle",size:16,w:700,fill:"var(--accent)"});
  s+=txt((cx0+cx1)/2,cy0+94,"ρ = "+fmt(rho,2)+" g·cm⁻³",{anchor:"middle",size:12.5,w:600,fill:"var(--ink-2)",mono:true});
  s+=txt((cx0+cx1)/2,cy0+130,"napětí článku U = "+fmt(ucell,2)+" V",{anchor:"middle",size:13,w:700,fill:"var(--ink)"});
  s+=txt((cx0+cx1)/2,cy0+152,"baterie ze šesti článků U = "+fmt(6*ucell,1)+" V",{anchor:"middle",size:11.5,fill:"var(--ink-3)"});
  /* proud */
  if(akMode==="vyb") s+=npArrow(cx1-40,cy0-22,cx0+40,cy0-22,"var(--exo)",2.2);
  else s+=npArrow(cx0+40,cy0-22,cx1-40,cy0-22,"var(--endo)",2.2);
  s+=txt((cx0+cx1)/2,cy0-28,akMode==="vyb"?"proud teče do spotřebiče":"proud dodává nabíječka",
    {anchor:"middle",size:11.5,w:700,fill:akMode==="vyb"?"var(--exo)":"var(--endo)"});
  /* pokrytí síranem */
  s+=txt(cx0+56+ew/2,cy1+22,"PbSO₄ = "+sul+" %",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)",mono:true});
  s+=txt(cx1-56-ew/2,cy1+22,"PbSO₄ = "+sul+" %",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)",mono:true});
  /* rovnice */
  var e1,e2;
  if(akMode==="vyb"){
    e1="záporná:  Pb + SO₄²⁻ → PbSO₄ + 2 e⁻";
    e2="kladná:   PbO₂ + SO₄²⁻ + 4 H⁺ + 2 e⁻ → PbSO₄ + 2 H₂O";
  } else {
    e1="záporná:  PbSO₄ + 2 e⁻ → Pb + SO₄²⁻";
    e2="kladná:   PbSO₄ + 2 H₂O → PbO₂ + SO₄²⁻ + 4 H⁺ + 2 e⁻";
  }
  s+=txt(20,290,e1,{size:12,w:600,fill:"var(--endo)",mono:true});
  s+=txt(20,312,e2,{size:12,w:600,fill:"var(--exo)",mono:true});
  s+=txt(20,334,"souhrn při vybíjení:  Pb + PbO₂ + 2 H₂SO₄ → 2 PbSO₄ + 2 H₂O",{size:12,w:600,fill:"var(--ink-3)",mono:true});
  $("#akWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Schéma olověného akumulátoru"');

  npRo("#akRo1","napětí článku",fmt(ucell,2)+" V","při plném nabití = 2,12 V");
  npRo("#akRo2","hustota elektrolytu",fmt(rho,2)+" g·cm⁻³","nabitý ≈ 1,28 · vybitý ≈ 1,10");
  npRo("#akRo3","pokrytí elektrod síranem",sul+" %","PbSO₄ je nerozpustný, a proto zůstane na místě");
  $("#akText").innerHTML='<p class="eq" style="margin:0">'+(akMode==="vyb"
    ? "Při vybíjení se olovo na záporné elektrodě oxiduje z 0 na II a oxid olovičitý na kladné se redukuje z IV na II. Obojí končí jako nerozpustný síran olovnatý, kyselina se spotřebovává a hustota elektrolytu klesá."
    : "Při nabíjení běží oba děje pozpátku. Síran olovnatý se na záporné elektrodě redukuje zpět na kov a na kladné se oxiduje zpět na oxid olovičitý; kyselina se přitom regeneruje a hustota elektrolytu stoupá.")+'</p>';
}
function initAk(){
  $$("#akSeg button").forEach(function(b){
    b.addEventListener("click",function(){
      akMode=b.dataset.ak;
      $$("#akSeg button").forEach(function(x){ x.setAttribute("aria-pressed",String(x===b)); });
      drawAk();
    });
  });
  drawAk();
}

/* ============================================================
   20 · k7 — TRENAŽÉR „CO VZNIKNE“
   ============================================================ */
var drI=0, drScore=0, drDone=false;
function drawDrill(){
  var it=NPDRILL[drI];
  $("#drQn").textContent=String(drI+1);
  $("#drQtot").textContent=String(NPDRILL.length);
  $("#drScore").textContent=String(drScore);
  $("#drTask").innerHTML='Co vznikne? <b style="color:var(--accent)">'+it.q+'</b>';
  $("#drOpts").innerHTML=it.o.map(function(o,i){
    return '<button class="btn" type="button" data-oi="'+i+'" style="white-space:normal;line-height:1.35;text-align:left;justify-content:flex-start;height:auto;padding:.7rem .9rem"><span class="chem">'+o+'</span></button>';
  }).join("");
  var ex=$("#drExplain"); ex.style.display="none"; ex.className="explain";
  $("#drNext").disabled=true; drDone=false;
  $$("#drOpts button").forEach(function(b){
    b.addEventListener("click",function(){
      if(drDone) return; drDone=true;
      var ok=(+b.dataset.oi===it.c); if(ok) drScore++;
      $("#drScore").textContent=String(drScore);
      ex.style.display="flex";
      ex.style.background=ok?"var(--ok-soft)":"var(--bad-soft)";
      ex.style.borderColor=ok?"var(--ok)":"var(--bad)";
      ex.innerHTML='<span class="verdict" style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+
        (ok?"✓ Správně":"✕ Špatně — správně je: "+it.o[it.c])+'</span><span class="eyebrow">Proč</span><div>'+it.e+'</div>';
      $$("#drOpts button").forEach(function(x){
        x.disabled=true; x.style.opacity=(+x.dataset.oi===it.c)?"1":".45";
        if(+x.dataset.oi===it.c){ x.style.borderColor="var(--ok)"; x.style.color="var(--ok)"; }
      });
      $("#drNext").disabled = drI>=NPDRILL.length-1;
      if(drI>=NPDRILL.length-1){
        toast("Trenažér dokončen: "+drScore+" z "+NPDRILL.length+" správně.");
        if(drScore>=12) markDone("k7");
      }
    });
  });
}
function initDrill(){
  $("#drNext").addEventListener("click",function(){ if(drI<NPDRILL.length-1){ drI++; drawDrill(); } });
  $("#drReset").addEventListener("click",function(){ drI=0; drScore=0; drawDrill(); });
  drawDrill();
}

/* ============================================================
   21 · k8 — BIOGENNÍ PRVKY
   ============================================================ */
var bgSel="Na";
var NPBG={
 Na:{n:"sodík", ion:"Na⁺", ven:142, uvnitr:12, jed:"mmol·dm⁻³",
   role:["hlavní kation mimobuněčné tekutiny","řídí její objem, a tím i krevní tlak",
         "vzestupná fáze nervového vzruchu","spolu s draslíkem drží membránový potenciál",
         "vstřebávání glukózy a aminokyselin ve střevě"],
   prijem:"pod 5 g soli denně, tedy pod 2 g sodíku",
   d:"Sodík je venku, draslík uvnitř. Sodíkový spád je zásoba energie, ze které buňka platí nejen nervový vzruch, ale i přenos glukózy a aminokyselin přes membránu."},
 K:{n:"draslík", ion:"K⁺", ven:4.2, uvnitr:140, jed:"mmol·dm⁻³",
   role:["hlavní kation nitrobuněčné tekutiny","určuje klidový membránový potenciál",
         "repolarizační fáze nervového vzruchu","řídí dráždivost srdečního svalu",
         "kofaktor některých enzymů"],
   prijem:"3,5 g denně",
   d:"V plazmě je draslíku jen 4,2 mmol·dm⁻³, uvnitř buněk 140. Právě proto je jeho hladina v krvi tak citlivá: stačí, aby draslík unikl z buněk, a srdce se může zastavit."},
 Mg:{n:"hořčík", ion:"Mg²⁺", ven:0.85, uvnitr:15, jed:"mmol·dm⁻³",
   role:["kofaktor stovek enzymů, zejména kinás","tvoří komplex Mg·ATP²⁻, se kterým enzymy pracují",
         "středový atom chlorofylu u rostlin","stabilizuje strukturu DNA a ribozomů",
         "protihráč vápníku ve svalu — umožňuje uvolnění"],
   prijem:"350 mg denně",
   d:"Hořčík je po draslíku druhý nejhojnější kation uvnitř buněk. Prakticky každá reakce s ATP ve skutečnosti pracuje s komplexem Mg·ATP²⁻ — hořčík odstíní záporný náboj fosfátů a molekulu stabilizuje."},
 Ca:{n:"vápník", ion:"Ca²⁺", ven:2.4, uvnitr:0.0001, jed:"mmol·dm⁻³",
   role:["99 % je v kostech a zubech jako hydroxyapatit","spouští svalový stah",
         "spouští uvolnění neuropřenašeče na synapsi","je koagulační faktor IV při srážení krve",
         "univerzální nitrobuněčný signál"],
   prijem:"1000 mg denně",
   d:"Buňka drží volný vápník v cytosolu více než desetitisíckrát níž než venku. Otevření kanálu proto znamená okamžitý a nepřehlédnutelný skok — a právě tak vápník funguje jako signál."}
};
function drawBg(){
  var b=NPBG[bgSel], W=760, H=326, s='';
  s+=npTitle("Biogenní prvek · "+b.n);
  s+=npCap(42,"koncentrace iontu "+b.ion+" [mmol·dm⁻³], logaritmická stupnice");
  var base=250, top=82, bw=88;
  function Hh(c){ var lg=Math.log(Math.max(c,1e-4))/Math.LN10; return Math.max(4,(lg+4)/7*(base-top)); }
  s+=line(110,base,400,base,{c:"var(--line-strong)",w:1.4});
  var h1=Hh(b.ven), h2=Hh(b.uvnitr);
  s+=rect(140,base-h1,bw,h1,{fill:"var(--exo)",r:5,style:"fill-opacity:.75"});
  s+=rect(292,base-h2,bw,h2,{fill:"var(--endo)",r:5,style:"fill-opacity:.75"});
  s+=txt(184,base-h1-9,fmt(b.ven,b.ven<1?4:1),{anchor:"middle",size:11.5,w:700,fill:"var(--exo)",mono:true});
  s+=txt(336,base-h2-9,fmt(b.uvnitr,b.uvnitr<1?4:1),{anchor:"middle",size:11.5,w:700,fill:"var(--endo)",mono:true});
  s+=txt(184,base+22,"vně buňky",{anchor:"middle",size:12,w:600,fill:"var(--exo)"});
  s+=txt(336,base+22,"uvnitř buňky",{anchor:"middle",size:12,w:600,fill:"var(--endo)"});
  var ven=b.ven>b.uvnitr;
  s+=npArrow(ven?250:270,base-h1-38,ven?270:250,base-h1-38,"var(--accent)",2);
  s+=txt(260,base+50,"samovolně teče "+(ven?"dovnitř":"ven")+", poměr = "+fmt(Math.max(b.ven,b.uvnitr)/Math.min(b.ven,b.uvnitr),0)+" : 1",
    {anchor:"middle",size:11,w:600,fill:"var(--accent)"});
  /* role */
  s+=txt(430,74,"k čemu je v organismu",{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  for(var i=0;i<b.role.length;i++){
    var rl=npLines(b.role[i],40);
    s+=txt(430,100+i*32,"·  "+rl[0],{size:11.5,fill:"var(--ink-2)"});
    if(rl.length>1) s+=txt(442,116+i*32,rl[1],{size:11.5,fill:"var(--ink-2)"});
  }
  $("#bgWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Koncentrace biogenního iontu uvnitř a vně buňky"');

  npRo("#bgRo1","vně buňky",fmt(b.ven,b.ven<1?4:1)+" mmol·dm⁻³","mimobuněčná tekutina a plazma");
  npRo("#bgRo2","uvnitř buňky",fmt(b.uvnitr,b.uvnitr<1?4:1)+" mmol·dm⁻³","cytosol");
  npRo("#bgRo3","doporučený denní příjem",b.prijem,"pro dospělého člověka");
  $("#bgText").innerHTML='<p class="eq" style="margin:0">'+b.d+'</p>';
}
function initBg(){
  $$("#bgSeg button").forEach(function(b){
    b.addEventListener("click",function(){
      bgSel=b.dataset.bg;
      $$("#bgSeg button").forEach(function(x){ x.setAttribute("aria-pressed",String(x===b)); });
      drawBg();
    });
  });
  drawBg();
}

/* ============================================================
   22 · k8 — PUMPA A AKČNÍ POTENCIÁL
   ============================================================ */
var NPNP=[
 {nm:"klid", U:-70, t:"Klidový stav", pop:"Pumpa udržuje spád. Membrána je mírně propustná pro draslík, a proto je uvnitř záporně.", kanal:"zavřené kanály, pracuje jen pumpa"},
 {nm:"podráždění", U:-55, t:"Dosažení prahu", pop:"Podnět zvedne napětí k prahové hodnotě kolem −55 mV. Od téhle chvíle už se děj rozjede sám.", kanal:"sodíkové kanály se začínají otevírat"},
 {nm:"depolarizace", U:30, t:"Depolarizace", pop:"Sodíkové kanály se otevřou naplno, sodík se řítí dovnitř po spádu a napětí vylétne na kladné hodnoty.", kanal:"sodíkové kanály dokořán"},
 {nm:"repolarizace", U:-80, t:"Repolarizace", pop:"Sodíkové kanály se zavřou, otevřou se draslíkové a draslík vytéká ven. Napětí se propadne až pod klidovou hodnotu.", kanal:"draslíkové kanály otevřené"},
 {nm:"obnova", U:-70, t:"Obnova pumpou", pop:"Pumpa vrátí ionty tam, kam patří: tři sodné ven a dva draselné dovnitř na každou molekulu ATP.", kanal:"kanály zavřené, pumpa pracuje"}
];
function drawNp(){
  var f=Math.min(NPNP.length-1,Math.max(0,Math.round(+$("#npFaze").value||0)));
  var ph=NPNP[f];
  $("#npFazev").textContent=ph.nm;
  var W=760, H=336, s='';
  s+=npTitle("Sodíko-draslíková pumpa a akční potenciál");
  /* membrána */
  var mx0=60, mx1=700, my0=118, my1=152;
  s+=rect(mx0,my0,mx1-mx0,my1-my0,{fill:"var(--accent)",r:4,style:"fill-opacity:.2"});
  s+=txt(70,102,"vně buňky",{size:11.5,w:600,fill:"var(--exo)"});
  s+=txt(70,176,"uvnitř buňky",{size:11.5,w:600,fill:"var(--endo)"});
  /* pumpa */
  s+=rect(226,my0-6,88,my1-my0+12,{fill:"var(--accent)",r:7,style:"fill-opacity:.5"});
  s+=txt(270,102,"pumpa",{anchor:"middle",size:11.5,w:700,fill:"var(--accent)"});
  s+=npArrow(250,my1+10,250,my0-14,"var(--exo)",2);
  s+=npArrow(292,my0-14,292,my1+10,"var(--endo)",2);
  s+=txt(270,176,"3 Na⁺ ven · 2 K⁺ dovnitř",{anchor:"middle",size:11,w:600,fill:"var(--accent)"});
  /* kanály */
  var naOpen=(f===1||f===2), kOpen=(f===3);
  s+=rect(460,my0-6,60,my1-my0+12,{fill:naOpen?"var(--exo)":"var(--surface-3)",r:7,style:"fill-opacity:"+(naOpen?".55":".8")});
  s+=txt(490,102,"Na⁺ kanál",{anchor:"middle",size:11,w:700,fill:naOpen?"var(--exo)":"var(--ink-3)"});
  s+=txt(490,176,naOpen?"otevřený":"zavřený",{anchor:"middle",size:10.5,fill:naOpen?"var(--exo)":"var(--ink-3)"});
  s+=rect(600,my0-6,60,my1-my0+12,{fill:kOpen?"var(--endo)":"var(--surface-3)",r:7,style:"fill-opacity:"+(kOpen?".55":".8")});
  s+=txt(630,102,"K⁺ kanál",{anchor:"middle",size:11,w:700,fill:kOpen?"var(--endo)":"var(--ink-3)"});
  s+=txt(630,176,kOpen?"otevřený":"zavřený",{anchor:"middle",size:10.5,fill:kOpen?"var(--endo)":"var(--ink-3)"});
  if(naOpen) s+=npArrow(490,my0-16,490,my1+12,"var(--exo)",2.2);
  if(kOpen)  s+=npArrow(630,my1+12,630,my0-16,"var(--endo)",2.2);
  /* křivka napětí */
  var gx0=110, gx1=700, gy0=222, gy1=310;
  function VY(u){ return gy1-(u+90)/130*(gy1-gy0); }
  s+=line(gx0,VY(-90),gx1,VY(-90),{c:"var(--line)",w:1});
  s+=txt(gx0-14,VY(30)+4,"+30 mV",{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true});
  s+=txt(gx0-14,VY(-70)+4,"−70 mV",{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true});
  var d="", i;
  for(i=0;i<NPNP.length;i++){
    var px=gx0+i*(gx1-gx0)/(NPNP.length-1);
    d+=(i?" L":"M")+fmt(px,0).replace(",",".")+" "+fmt(VY(NPNP[i].U),1).replace(",",".");
  }
  s+='<path d="'+d+'" style="fill:none;stroke:var(--accent);stroke-width:2.6;stroke-linejoin:round"/>';
  for(i=0;i<NPNP.length;i++){
    var qx=gx0+i*(gx1-gx0)/(NPNP.length-1), on=(i===f);
    s+='<circle cx="'+qx+'" cy="'+VY(NPNP[i].U)+'" r="'+(on?7:4)+'" style="fill:'+(on?"var(--accent)":"var(--surface)")+';stroke:var(--accent);stroke-width:2"/>';
  }
  s+=txt(gx0,208,"membránové napětí v průběhu vzruchu",{size:11,fill:"var(--ink-3)"});
  $("#npWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Sodíko-draslíková pumpa a akční potenciál"');

  npRo("#npRo1","fáze",ph.t,ph.kanal);
  npRo("#npRo2","membránové napětí",sgn(ph.U,0)+" mV","měřeno uvnitř proti vnějšku");
  npRo("#npRo3","poměr pumpy","3 Na⁺ ven ku 2 K⁺ dovnitř","na jednu molekulu ATP");
  $("#npText").innerHTML='<p class="eq" style="margin:0">'+ph.pop+'</p>';
}

/* ============================================================
   23 · MINI-GRAFY RYCHLOKURZU
   ============================================================ */
function drawMiniHor(){
  var W=700, H=206, s='';
  s+=npTitle("Produkt hoření podle velikosti kationtu");
  var items=[{s:"Li⁺",r:76,p:"Li₂O",n:"oxid",a:"O²⁻",c:"var(--cat1)"},
             {s:"Na⁺",r:102,p:"Na₂O₂",n:"peroxid",a:"O₂²⁻",c:"var(--cat2)"},
             {s:"K⁺",r:138,p:"KO₂",n:"superoxid",a:"O₂⁻",c:"var(--cat3)"}];
  for(var i=0;i<3;i++){
    var it=items[i], cx=140+i*210;
    var rr=14+it.r/9;
    s+='<circle cx="'+cx+'" cy="78" r="'+fmt(rr,1).replace(",",".")+'" style="fill:'+it.c+';fill-opacity:.28;stroke:'+it.c+';stroke-width:2"/>';
    s+=txt(cx,84,it.s,{anchor:"middle",size:14,w:700,fill:it.c});
    s+=txt(cx,132,"poloměr = "+it.r+" pm",{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true});
    s+=txt(cx,158,it.p,{anchor:"middle",size:15,w:700,fill:"var(--ink)"});
    s+=txt(cx,180,it.n+" · anion "+it.a,{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  }
  s+=npArrow(60,198,640,198,"var(--ink-3)",1.6);
  $("#miniHorWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Produkt hoření alkalického kovu podle velikosti kationtu"');
}
function drawMiniAmf(){
  var W=700, H=186, s='';
  s+=npTitle("Amfoterita: hliník v kyselině, uprostřed a v zásadě");
  var x0=50, x1=650, ay=126;
  function X(p){ return x0+p/14*(x1-x0); }
  var bands=[[0,4,"[Al(H₂O)₆]³⁺","rozpuštěný kation","var(--exo)"],
             [4,10,"Al(OH)₃ ↓","nerozpustná sraženina","var(--accent)"],
             [10,14,"[Al(OH)₄]⁻","rozpuštěný anion","var(--endo)"]];
  for(var i=0;i<3;i++){
    var b=bands[i], bx=X(b[0]), bw=X(b[1])-X(b[0]);
    s+=rect(bx,60,bw,50,{fill:b[4],r:8,style:"fill-opacity:.2"});
    s+=txt(bx+bw/2,84,b[2],{anchor:"middle",size:13,w:700,fill:b[4]});
    s+=txt(bx+bw/2,102,b[3],{anchor:"middle",size:9.5,fill:"var(--ink-3)"});
  }
  s+=line(x0,ay,x1,ay,{c:"var(--line-strong)",w:1.4});
  for(i=0;i<=14;i+=2){
    s+=line(X(i),ay-5,X(i),ay+5,{c:"var(--line)",w:1});
    s+=txt(X(i),ay+20,String(i),{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true});
  }
  s+=txt(350,172,"stupnice pH — hliník se rozpouští na obou koncích, uprostřed se sráží",{anchor:"middle",size:11,fill:"var(--ink-3)"});
  $("#miniAmfWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Amfoterita hliníku podle pH"');
}
function drawMiniIp(){
  var W=700, H=226, s='';
  s+=npTitle("Efekt inertního páru ve skupině 14");
  var items=[{s:"Ge",lo:1,hi:3},{s:"Sn",lo:2,hi:3},{s:"Pb",lo:3,hi:1}];
  var base=158, top=54;
  s+=line(60,base,640,base,{c:"var(--line-strong)",w:1.3});
  for(var i=0;i<3;i++){
    var it=items[i], cx=150+i*200, bw=54;
    var h1=(base-top)*(it.lo+1)/4, h2=(base-top)*(it.hi+1)/4;
    s+=rect(cx-bw-6,base-h1,bw,h1,{fill:"var(--endo)",r:4,style:"fill-opacity:.75"});
    s+=rect(cx+6,base-h2,bw,h2,{fill:"var(--exo)",r:4,style:"fill-opacity:.75"});
    s+=txt(cx-bw/2-6,base-h1-8,"II",{anchor:"middle",size:11.5,w:700,fill:"var(--endo)"});
    s+=txt(cx+bw/2+6,base-h2-8,"IV",{anchor:"middle",size:11.5,w:700,fill:"var(--exo)"});
    s+=txt(cx,base+20,it.s,{anchor:"middle",size:14,w:700,fill:it.lo>it.hi?"var(--accent)":"var(--ink)"});
    s+=txt(cx,base+40,it.lo>it.hi?"převládá II":"převládá IV",{anchor:"middle",size:10.5,w:it.lo>it.hi?700:400,fill:it.lo>it.hi?"var(--accent)":"var(--ink-3)"});
  }
  s+=txt(350,216,"výška sloupce = relativní stálost oxidačního stavu",{anchor:"middle",size:11,fill:"var(--ink-3)"});
  $("#miniIpWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Stálost oxidačních stavů ve skupině 14"');
}
