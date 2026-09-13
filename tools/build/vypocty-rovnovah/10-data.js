/* ============================================================
   T1 · DATA A POMOCNÉ FUNKCE (25 °C, Kw = 1,0·10⁻¹⁴)
   ============================================================ */
var KW=1e-14;
function L10(x){ return Math.log(x)/Math.LN10; }
var SUPS={"0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹","-":"⁻"};
function sup(n){ return String(n).split("").map(function(ch){ return SUPS[ch]||ch; }).join(""); }
/* vědecký zápis s českou čárkou: 1,34·10⁻⁵ */
function sci(x,d){
  if(x===0) return "0";
  if(isNaN(x)||!isFinite(x)) return "—";
  if(d===undefined) d=2;
  var e=Math.floor(L10(Math.abs(x))), m=x/Math.pow(10,e);
  if(Math.abs(m)>=9.9995){ m/=10; e+=1; }
  var ms=fmt(m,d);
  if(e===0) return ms;
  return ms+"·10"+sup(e);
}
/* koncentrace: rozumný formát podle velikosti */
function conc(x){ if(x>=0.01&&x<1000) return fmt(x,3); return sci(x,2); }
/* pH vždy na dvě desetinná místa — fmt() by koncové nuly odřízl */
function pf(x){
  if(x===null||x===undefined||isNaN(x)) return "—";
  return (x<0?"−":"")+Math.abs(x).toFixed(2).replace(".",",");
}
/* dlaždice .readout */
function ro(sel,k,v,h,cls){
  var e=$(sel); if(!e) return;
  e.className="readout"+(cls?" "+cls:"");
  e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+(h||"")+'</span>';
}
function eqs(list){ return list.map(function(s){ return '<p class="eq" style="margin:0">'+s+'</p>'; }).join(""); }
/* ovládací prvky */
function segBind(id,fn){
  $$("#"+id+" button").forEach(function(b){
    b.addEventListener("click",function(){
      $$("#"+id+" button").forEach(function(x){ x.setAttribute("aria-pressed",x===b); });
      fn(b.dataset.v,b);
    });
  });
}
function segSet(id,v){ $$("#"+id+" button").forEach(function(x){ x.setAttribute("aria-pressed",x.dataset.v===v); }); }
function rngBind(id,fn){ var e=document.getElementById(id); if(e) e.addEventListener("input",function(){ fn(+this.value,this); }); }
function selBind(id,fn){ var e=document.getElementById(id); if(e) e.addEventListener("change",function(){ fn(this.value,this); }); }
/* rovnice: x² + b·x − c = 0 → kladný kořen */
function posRoot(b,c){ return (-b+Math.sqrt(b*b+4*c))/2; }
/* slabý elektrolyt: aproximace √(K·c) vs přesné řešení */
function weakSolve(K,c){
  var ap=Math.sqrt(K*c), ex=posRoot(K,K*c);
  return {ap:ap,ex:ex,alpha:ex/c,ratio:ap/c,ok:(ap/c)<0.05};
}
/* silná kyselina včetně autoprotolýzy: x² − c·x − Kw = 0 */
function strongExact(c){ return posRoot(-c,KW); }
/* souřadnicový rám grafu */
function frame(o){
  var X=function(v){ return o.L+(v-o.x0)/(o.x1-o.x0)*(o.R-o.L); };
  var Y=function(v){ return o.B-(v-o.y0)/(o.y1-o.y0)*(o.B-o.T); };
  var s='';
  for(var v=o.x0; v<=o.x1+1e-9; v+=o.xt){
    s+=line(X(v),o.T,X(v),o.B,{c:"var(--line)"});
    s+=txt(X(v),o.B+16,o.xf?o.xf(v):fmt(v,2),{anchor:"middle",size:11,fill:"var(--ink-3)",mono:true});
  }
  for(var w=o.y0; w<=o.y1+1e-9; w+=o.yt){
    s+=line(o.L,Y(w),o.R,Y(w),{c:"var(--line)"});
    s+=txt(o.L-7,Y(w)+4,o.yf?o.yf(w):fmt(w,2),{anchor:"end",size:11,fill:"var(--ink-3)",mono:true});
  }
  s+=line(o.L,o.T,o.L,o.B,{c:"var(--line-strong)",w:1.5})+line(o.L,o.B,o.R,o.B,{c:"var(--line-strong)",w:1.5});
  if(o.xl) s+=txt((o.L+o.R)/2,o.B+34,o.xl,{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em;text-transform:uppercase"});
  if(o.yl) s+=txt(16,(o.T+o.B)/2,o.yl,{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:16px "+((o.T+o.B)/2)+"px;letter-spacing:.08em;text-transform:uppercase"});
  return {X:X,Y:Y,s:s};
}
function poly(pts,color,w,dash){
  return '<polyline points="'+pts.join(" ")+'" style="fill:none;stroke:'+color+';stroke-width:'+(w||2.5)+
    ';stroke-linecap:round;stroke-linejoin:round;'+(dash?"stroke-dasharray:"+dash+";":"")+'"/>';
}
function dot(x,y,c,r){ return '<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(r||5)+'" style="fill:'+c+';stroke:var(--surface);stroke-width:2"/>'; }
function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }

/* ---------- Disociační konstanty (25 °C) ---------- */
/* t: a = kyselina (Ka), b = zásada (Kb); cj = konjugovaná částice; st = stupeň */
var KA=[
 {n:"kyselina jodičná",     f:"HIO₃",      cj:"IO₃⁻",      K:1.7e-1,  t:"a", g:"anorg"},
 {n:"kyselina šťavelová",   f:"H₂C₂O₄",    cj:"HC₂O₄⁻",    K:5.6e-2,  t:"a", g:"org",   st:"Ka₁"},
 {n:"kyselina siřičitá",    f:"H₂SO₃",     cj:"HSO₃⁻",     K:1.4e-2,  t:"a", g:"anorg", st:"Ka₁"},
 {n:"hydrogensíran (H₂SO₄, 2. st.)", f:"HSO₄⁻", cj:"SO₄²⁻", K:1.2e-2, t:"a", g:"anorg", st:"Ka₂"},
 {n:"kyselina chloritá",    f:"HClO₂",     cj:"ClO₂⁻",     K:1.1e-2,  t:"a", g:"anorg"},
 {n:"kyselina fosforečná",  f:"H₃PO₄",     cj:"H₂PO₄⁻",    K:6.9e-3,  t:"a", g:"anorg", st:"Ka₁"},
 {n:"kyselina chloroctová", f:"ClCH₂COOH", cj:"ClCH₂COO⁻", K:1.4e-3,  t:"a", g:"org"},
 {n:"kyselina citronová",   f:"H₃Cit",     cj:"H₂Cit⁻",    K:7.4e-4,  t:"a", g:"org",   st:"Ka₁"},
 {n:"kyselina fluorovodíková",f:"HF",      cj:"F⁻",        K:6.3e-4,  t:"a", g:"anorg"},
 {n:"kyselina dusitá",      f:"HNO₂",      cj:"NO₂⁻",      K:5.6e-4,  t:"a", g:"anorg"},
 {n:"kyselina mravenčí",    f:"HCOOH",     cj:"HCOO⁻",     K:1.8e-4,  t:"a", g:"org"},
 {n:"hydrogenšťavelan",     f:"HC₂O₄⁻",    cj:"C₂O₄²⁻",    K:1.5e-4,  t:"a", g:"org",   st:"Ka₂"},
 {n:"kyselina mléčná",      f:"CH₃CH(OH)COOH", cj:"laktát⁻", K:1.4e-4, t:"a", g:"org"},
 {n:"kyselina benzoová",    f:"C₆H₅COOH",  cj:"C₆H₅COO⁻",  K:6.3e-5,  t:"a", g:"org"},
 {n:"kyselina octová",      f:"CH₃COOH",   cj:"CH₃COO⁻",   K:1.75e-5, t:"a", g:"org"},
 {n:"dihydrogencitrát",     f:"H₂Cit⁻",    cj:"HCit²⁻",    K:1.7e-5,  t:"a", g:"org",   st:"Ka₂"},
 {n:"kyselina propionová",  f:"C₂H₅COOH",  cj:"C₂H₅COO⁻",  K:1.3e-5,  t:"a", g:"org"},
 {n:"kyselina uhličitá",    f:"H₂CO₃",     cj:"HCO₃⁻",     K:4.5e-7,  t:"a", g:"anorg", st:"Ka₁"},
 {n:"hydrogencitrát",       f:"HCit²⁻",    cj:"Cit³⁻",     K:4.0e-7,  t:"a", g:"org",   st:"Ka₃"},
 {n:"sulfan (sirovodík)",   f:"H₂S",       cj:"HS⁻",       K:8.9e-8,  t:"a", g:"anorg", st:"Ka₁"},
 {n:"dihydrogenfosforečnan",f:"H₂PO₄⁻",    cj:"HPO₄²⁻",    K:6.2e-8,  t:"a", g:"anorg", st:"Ka₂"},
 {n:"hydrogensiřičitan",    f:"HSO₃⁻",     cj:"SO₃²⁻",     K:6.3e-8,  t:"a", g:"anorg", st:"Ka₂"},
 {n:"kyselina chlorná",     f:"HClO",      cj:"ClO⁻",      K:3.0e-8,  t:"a", g:"anorg"},
 {n:"kyselina kyanovodíková",f:"HCN",      cj:"CN⁻",       K:6.2e-10, t:"a", g:"anorg"},
 {n:"kyselina boritá",      f:"H₃BO₃",     cj:"B(OH)₄⁻",   K:5.8e-10, t:"a", g:"anorg"},
 {n:"amonný kation",        f:"NH₄⁺",      cj:"NH₃",       K:5.6e-10, t:"a", g:"anorg"},
 {n:"fenol",                f:"C₆H₅OH",    cj:"C₆H₅O⁻",    K:1.0e-10, t:"a", g:"org"},
 {n:"hydrogenuhličitan",    f:"HCO₃⁻",     cj:"CO₃²⁻",     K:4.7e-11, t:"a", g:"anorg", st:"Ka₂"},
 {n:"hydrogenfosforečnan",  f:"HPO₄²⁻",    cj:"PO₄³⁻",     K:4.8e-13, t:"a", g:"anorg", st:"Ka₃"},
 {n:"peroxid vodíku",       f:"H₂O₂",      cj:"HO₂⁻",      K:2.4e-12, t:"a", g:"anorg"},
 /* zásady */
 {n:"dimethylamin",         f:"(CH₃)₂NH",  cj:"(CH₃)₂NH₂⁺",K:5.4e-4,  t:"b", g:"org"},
 {n:"ethylamin",            f:"C₂H₅NH₂",   cj:"C₂H₅NH₃⁺",  K:4.5e-4,  t:"b", g:"org"},
 {n:"methylamin",           f:"CH₃NH₂",    cj:"CH₃NH₃⁺",   K:4.4e-4,  t:"b", g:"org"},
 {n:"uhličitanový anion",   f:"CO₃²⁻",     cj:"HCO₃⁻",     K:2.1e-4,  t:"b", g:"anorg"},
 {n:"trimethylamin",        f:"(CH₃)₃N",   cj:"(CH₃)₃NH⁺", K:6.3e-5,  t:"b", g:"org"},
 {n:"amoniak",              f:"NH₃",       cj:"NH₄⁺",      K:1.78e-5, t:"b", g:"anorg"},
 {n:"kyanidový anion",      f:"CN⁻",       cj:"HCN",       K:1.6e-5,  t:"b", g:"anorg"},
 {n:"hydrazin",             f:"N₂H₄",      cj:"N₂H₅⁺",     K:1.3e-6,  t:"b", g:"anorg"},
 {n:"hydroxylamin",         f:"NH₂OH",     cj:"NH₃OH⁺",    K:1.1e-8,  t:"b", g:"anorg"},
 {n:"pyridin",              f:"C₅H₅N",     cj:"C₅H₅NH⁺",   K:1.7e-9,  t:"b", g:"org"},
 {n:"octanový anion",       f:"CH₃COO⁻",   cj:"CH₃COOH",   K:5.7e-10, t:"b", g:"org"},
 {n:"anilin",               f:"C₆H₅NH₂",   cj:"C₆H₅NH₃⁺",  K:4.3e-10, t:"b", g:"org"},
 {n:"fluoridový anion",     f:"F⁻",        cj:"HF",        K:1.6e-11, t:"b", g:"anorg"},
 {n:"močovina",             f:"CO(NH₂)₂",  cj:"CO(NH₂)NH₃⁺",K:1.5e-14,t:"b", g:"org"}
];
function kaFind(f){ for(var i=0;i<KA.length;i++){ if(KA[i].f===f) return KA[i]; } return null; }

/* ---------- Silné kyseliny a zásady (pro kalkulačku) ---------- */
var STRONG_A=[
 {n:"kyselina chlorovodíková", f:"HCl",   nH:1},
 {n:"kyselina dusičná",        f:"HNO₃",  nH:1},
 {n:"kyselina chloristá",      f:"HClO₄", nH:1},
 {n:"kyselina bromovodíková",  f:"HBr",   nH:1},
 {n:"kyselina sírová (jen 1. stupeň!)", f:"H₂SO₄", nH:1, poly:true}
];
var STRONG_B=[
 {n:"hydroxid sodný",     f:"NaOH",    nOH:1},
 {n:"hydroxid draselný",  f:"KOH",     nOH:1},
 {n:"hydroxid vápenatý",  f:"Ca(OH)₂", nOH:2},
 {n:"hydroxid barnatý",   f:"Ba(OH)₂", nOH:2}
];

/* ---------- Pufry ---------- */
var BUFFERS=[
 {n:"acetátový (CH₃COOH / CH₃COO⁻)",        ha:"CH₃COOH", a:"CH₃COO⁻", pKa:4.76},
 {n:"mravenčanový (HCOOH / HCOO⁻)",         ha:"HCOOH",   a:"HCOO⁻",   pKa:3.75},
 {n:"hydrogenuhličitanový (H₂CO₃ / HCO₃⁻) — krev", ha:"H₂CO₃", a:"HCO₃⁻", pKa:6.10},
 {n:"citrátový (HCit²⁻ / Cit³⁻)",           ha:"HCit²⁻",  a:"Cit³⁻",   pKa:6.40},
 {n:"fosfátový (H₂PO₄⁻ / HPO₄²⁻)",          ha:"H₂PO₄⁻",  a:"HPO₄²⁻",  pKa:7.20},
 {n:"amoniakální (NH₄⁺ / NH₃)",             ha:"NH₄⁺",    a:"NH₃",     pKa:9.25}
];

/* ---------- Soli (hydrolýza) ---------- */
/* t: an = anion slabé kyseliny; cat = kation slabé zásady; both = obojí; neu = neutrální; amph = amfolyt */
var SALTS=[
 {f:"CH₃COONa", n:"octan sodný",          t:"an",  par:"CH₃COOH", cj:"CH₃COO⁻", K:1.75e-5},
 {f:"HCOONa",   n:"mravenčan sodný",      t:"an",  par:"HCOOH",   cj:"HCOO⁻",   K:1.8e-4},
 {f:"NaF",      n:"fluorid sodný",        t:"an",  par:"HF",      cj:"F⁻",      K:6.3e-4},
 {f:"NaCN",     n:"kyanid sodný",         t:"an",  par:"HCN",     cj:"CN⁻",     K:6.2e-10},
 {f:"NaClO",    n:"chlornan sodný (Savo)",t:"an",  par:"HClO",    cj:"ClO⁻",    K:3.0e-8},
 {f:"Na₂CO₃",   n:"uhličitan sodný (soda)",t:"an", par:"HCO₃⁻",   cj:"CO₃²⁻",   K:4.7e-11},
 {f:"NH₄Cl",    n:"chlorid amonný (salmiak)",t:"cat",par:"NH₃",   cj:"NH₄⁺",    K:1.78e-5},
 {f:"NH₄NO₃",   n:"dusičnan amonný",      t:"cat", par:"NH₃",     cj:"NH₄⁺",    K:1.78e-5},
 {f:"CH₃NH₃Cl", n:"methylamonium-chlorid",t:"cat", par:"CH₃NH₂",  cj:"CH₃NH₃⁺", K:4.4e-4},
 {f:"C₆H₅NH₃Cl",n:"anilinium-chlorid",    t:"cat", par:"C₆H₅NH₂", cj:"C₆H₅NH₃⁺",K:4.3e-10},
 {f:"C₅H₅NHCl", n:"pyridinium-chlorid",   t:"cat", par:"C₅H₅N",   cj:"C₅H₅NH⁺", K:1.7e-9},
 {f:"CH₃COONH₄",n:"octan amonný",         t:"both",pKa:4.76, pKb:4.75, par:"CH₃COOH + NH₃"},
 {f:"NH₄CN",    n:"kyanid amonný",        t:"both",pKa:9.21, pKb:4.75, par:"HCN + NH₃"},
 {f:"NH₄F",     n:"fluorid amonný",       t:"both",pKa:3.20, pKb:4.75, par:"HF + NH₃"},
 {f:"NaHCO₃",   n:"hydrogenuhličitan sodný (jedlá soda)", t:"amph", pKa1:6.35, pKa2:10.33},
 {f:"NaCl",     n:"chlorid sodný",        t:"neu"},
 {f:"KNO₃",     n:"dusičnan draselný",    t:"neu"},
 {f:"Na₂SO₄",   n:"síran sodný",          t:"neu"}
];

/* ---------- Součiny rozpustnosti (25 °C) ---------- */
/* nc, na = počet kationtů a aniontů ve vzorci; t = typ */
var KSP=[
 {f:"AgCl",     n:"chlorid stříbrný",    K:1.8e-10, t:"AB",  M:143.32, cat:"Ag⁺",  an:"Cl⁻",    nc:1,na:1},
 {f:"AgBr",     n:"bromid stříbrný",     K:5.4e-13, t:"AB",  M:187.77, cat:"Ag⁺",  an:"Br⁻",    nc:1,na:1},
 {f:"AgI",      n:"jodid stříbrný",      K:8.5e-17, t:"AB",  M:234.77, cat:"Ag⁺",  an:"I⁻",     nc:1,na:1},
 {f:"AgSCN",    n:"thiokyanatan stříbrný",K:1.0e-12,t:"AB",  M:165.95, cat:"Ag⁺",  an:"SCN⁻",   nc:1,na:1},
 {f:"BaSO₄",    n:"síran barnatý",       K:1.1e-10, t:"AB",  M:233.39, cat:"Ba²⁺", an:"SO₄²⁻",  nc:1,na:1},
 {f:"SrSO₄",    n:"síran strontnatý",    K:3.4e-7,  t:"AB",  M:183.68, cat:"Sr²⁺", an:"SO₄²⁻",  nc:1,na:1},
 {f:"CaSO₄",    n:"síran vápenatý",      K:4.9e-5,  t:"AB",  M:136.14, cat:"Ca²⁺", an:"SO₄²⁻",  nc:1,na:1},
 {f:"PbSO₄",    n:"síran olovnatý",      K:2.5e-8,  t:"AB",  M:303.26, cat:"Pb²⁺", an:"SO₄²⁻",  nc:1,na:1},
 {f:"CaCO₃",    n:"uhličitan vápenatý",  K:3.4e-9,  t:"AB",  M:100.09, cat:"Ca²⁺", an:"CO₃²⁻",  nc:1,na:1},
 {f:"BaCO₃",    n:"uhličitan barnatý",   K:2.6e-9,  t:"AB",  M:197.34, cat:"Ba²⁺", an:"CO₃²⁻",  nc:1,na:1},
 {f:"SrCO₃",    n:"uhličitan strontnatý",K:5.6e-10, t:"AB",  M:147.63, cat:"Sr²⁺", an:"CO₃²⁻",  nc:1,na:1},
 {f:"MgCO₃",    n:"uhličitan hořečnatý", K:6.8e-6,  t:"AB",  M:84.31,  cat:"Mg²⁺", an:"CO₃²⁻",  nc:1,na:1},
 {f:"CaC₂O₄",   n:"šťavelan vápenatý",   K:2.3e-9,  t:"AB",  M:128.10, cat:"Ca²⁺", an:"C₂O₄²⁻", nc:1,na:1},
 {f:"BaCrO₄",   n:"chroman barnatý",     K:1.2e-10, t:"AB",  M:253.32, cat:"Ba²⁺", an:"CrO₄²⁻", nc:1,na:1},
 {f:"PbCrO₄",   n:"chroman olovnatý",    K:2.8e-13, t:"AB",  M:323.19, cat:"Pb²⁺", an:"CrO₄²⁻", nc:1,na:1},
 {f:"CuS",      n:"sulfid měďnatý",      K:6e-37,   t:"AB",  M:95.61,  cat:"Cu²⁺", an:"S²⁻",    nc:1,na:1},
 {f:"PbS",      n:"sulfid olovnatý",     K:3e-28,   t:"AB",  M:239.27, cat:"Pb²⁺", an:"S²⁻",    nc:1,na:1},
 {f:"ZnS",      n:"sulfid zinečnatý",    K:2e-25,   t:"AB",  M:97.47,  cat:"Zn²⁺", an:"S²⁻",    nc:1,na:1},
 {f:"CdS",      n:"sulfid kademnatý",    K:8e-27,   t:"AB",  M:144.48, cat:"Cd²⁺", an:"S²⁻",    nc:1,na:1},
 {f:"HgS",      n:"sulfid rtuťnatý",     K:4e-53,   t:"AB",  M:232.66, cat:"Hg²⁺", an:"S²⁻",    nc:1,na:1},
 {f:"PbI₂",     n:"jodid olovnatý",      K:9.8e-9,  t:"AB2", M:461.01, cat:"Pb²⁺", an:"I⁻",     nc:1,na:2},
 {f:"PbCl₂",    n:"chlorid olovnatý",    K:1.7e-5,  t:"AB2", M:278.11, cat:"Pb²⁺", an:"Cl⁻",    nc:1,na:2},
 {f:"PbBr₂",    n:"bromid olovnatý",     K:6.6e-6,  t:"AB2", M:367.01, cat:"Pb²⁺", an:"Br⁻",    nc:1,na:2},
 {f:"CaF₂",     n:"fluorid vápenatý",    K:3.5e-11, t:"AB2", M:78.07,  cat:"Ca²⁺", an:"F⁻",     nc:1,na:2},
 {f:"BaF₂",     n:"fluorid barnatý",     K:1.8e-7,  t:"AB2", M:175.32, cat:"Ba²⁺", an:"F⁻",     nc:1,na:2},
 {f:"Mg(OH)₂",  n:"hydroxid hořečnatý",  K:5.6e-12, t:"AB2", M:58.32,  cat:"Mg²⁺", an:"OH⁻",    nc:1,na:2},
 {f:"Ca(OH)₂",  n:"hydroxid vápenatý",   K:5.0e-6,  t:"AB2", M:74.09,  cat:"Ca²⁺", an:"OH⁻",    nc:1,na:2},
 {f:"Mn(OH)₂",  n:"hydroxid manganatý",  K:1.9e-13, t:"AB2", M:88.95,  cat:"Mn²⁺", an:"OH⁻",    nc:1,na:2},
 {f:"Fe(OH)₂",  n:"hydroxid železnatý",  K:4.9e-17, t:"AB2", M:89.86,  cat:"Fe²⁺", an:"OH⁻",    nc:1,na:2},
 {f:"Ni(OH)₂",  n:"hydroxid nikelnatý",  K:5.5e-16, t:"AB2", M:92.71,  cat:"Ni²⁺", an:"OH⁻",    nc:1,na:2},
 {f:"Zn(OH)₂",  n:"hydroxid zinečnatý",  K:3.0e-17, t:"AB2", M:99.42,  cat:"Zn²⁺", an:"OH⁻",    nc:1,na:2},
 {f:"Cu(OH)₂",  n:"hydroxid měďnatý",    K:2.2e-20, t:"AB2", M:97.56,  cat:"Cu²⁺", an:"OH⁻",    nc:1,na:2},
 {f:"Ag₂CrO₄",  n:"chroman stříbrný",    K:1.1e-12, t:"A2B", M:331.73, cat:"Ag⁺",  an:"CrO₄²⁻", nc:2,na:1},
 {f:"Ag₂CO₃",   n:"uhličitan stříbrný",  K:8.5e-12, t:"A2B", M:275.75, cat:"Ag⁺",  an:"CO₃²⁻",  nc:2,na:1},
 {f:"Ag₂SO₄",   n:"síran stříbrný",      K:1.2e-5,  t:"A2B", M:311.80, cat:"Ag⁺",  an:"SO₄²⁻",  nc:2,na:1},
 {f:"Ag₂S",     n:"sulfid stříbrný",     K:6e-50,   t:"A2B", M:247.80, cat:"Ag⁺",  an:"S²⁻",    nc:2,na:1},
 {f:"Fe(OH)₃",  n:"hydroxid železitý",   K:2.8e-39, t:"AB3", M:106.87, cat:"Fe³⁺", an:"OH⁻",    nc:1,na:3},
 {f:"Al(OH)₃",  n:"hydroxid hlinitý",    K:1.0e-33, t:"AB3", M:78.00,  cat:"Al³⁺", an:"OH⁻",    nc:1,na:3},
 {f:"Cr(OH)₃",  n:"hydroxid chromitý",   K:6.3e-31, t:"AB3", M:103.02, cat:"Cr³⁺", an:"OH⁻",    nc:1,na:3},
 {f:"Ca₃(PO₄)₂",n:"fosforečnan vápenatý",K:2.1e-33, t:"A3B2",M:310.18, cat:"Ca²⁺", an:"PO₄³⁻",  nc:3,na:2}
];
function kspFind(f){ for(var i=0;i<KSP.length;i++){ if(KSP[i].f===f) return KSP[i]; } return null; }
/* rozpustnost z Ksp podle stechiometrie: Ksp = nc^nc · na^na · s^(nc+na) */
function kspCoef(x){ return Math.pow(x.nc,x.nc)*Math.pow(x.na,x.na); }
function solub(x){ return Math.pow(x.K/kspCoef(x),1/(x.nc+x.na)); }
function kspFormula(x){
  var k=kspCoef(x), p=x.nc+x.na;
  return "Ksp = "+(k===1?"":k+"·")+"s"+sup(p);
}
var TYPE_LABEL={AB:"AB → s = √Ksp",AB2:"AB₂ → s = ∛(Ksp/4)",A2B:"A₂B → s = ∛(Ksp/4)",AB3:"AB₃ → s = ⁴√(Ksp/27)",A3B2:"A₃B₂ → s = ⁵√(Ksp/108)"};

/* ---------- Konstanty stability komplexů (celkové β, 25 °C) ---------- */
var BETA=[
 {f:"[Ag(NH₃)₂]⁺",     m:"Ag⁺",  l:"NH₃",     n:2, b:1.6e7,  note:"rozpouští AgCl, ne AgBr a AgI"},
 {f:"[Cu(NH₃)₄]²⁺",    m:"Cu²⁺", l:"NH₃",     n:4, b:1.1e13, note:"sytě modrý; rozpouští Cu(OH)₂"},
 {f:"[Zn(NH₃)₄]²⁺",    m:"Zn²⁺", l:"NH₃",     n:4, b:2.9e9,  note:"bezbarvý, rozpouští Zn(OH)₂"},
 {f:"[Ni(NH₃)₆]²⁺",    m:"Ni²⁺", l:"NH₃",     n:6, b:5.5e8,  note:"modrofialový"},
 {f:"[Cd(NH₃)₄]²⁺",    m:"Cd²⁺", l:"NH₃",     n:4, b:1.3e7,  note:""},
 {f:"[Co(NH₃)₆]²⁺",    m:"Co²⁺", l:"NH₃",     n:6, b:1.3e5,  note:"slabý; Co³⁺ komplex je o 28 řádů stálejší"},
 {f:"[Ag(CN)₂]⁻",      m:"Ag⁺",  l:"CN⁻",     n:2, b:1.0e21, note:"rozpustí i AgI; kyanidové loužení"},
 {f:"[Au(CN)₂]⁻",      m:"Au⁺",  l:"CN⁻",     n:2, b:2.0e38, note:"těžba zlata (kyanidové loužení)"},
 {f:"[Ni(CN)₄]²⁻",     m:"Ni²⁺", l:"CN⁻",     n:4, b:2.0e31, note:""},
 {f:"[Fe(CN)₆]⁴⁻",     m:"Fe²⁺", l:"CN⁻",     n:6, b:1.0e35, note:"ferrokyanid, žlutá krevní sůl"},
 {f:"[Fe(CN)₆]³⁻",     m:"Fe³⁺", l:"CN⁻",     n:6, b:1.0e42, note:"ferrikyanid, červená krevní sůl"},
 {f:"[FeSCN]²⁺",       m:"Fe³⁺", l:"SCN⁻",    n:1, b:1.4e2,  note:"krvavě červený důkaz Fe³⁺ — slabý komplex"},
 {f:"[Ag(S₂O₃)₂]³⁻",   m:"Ag⁺",  l:"S₂O₃²⁻",  n:2, b:2.9e13, note:"fotografický ustalovač, rozpouští AgBr"},
 {f:"[HgI₄]²⁻",        m:"Hg²⁺", l:"I⁻",      n:4, b:6.8e29, note:"Nesslerovo činidlo"},
 {f:"[Zn(OH)₄]²⁻",     m:"Zn²⁺", l:"OH⁻",     n:4, b:4.6e17, note:"amfoterie Zn(OH)₂ v nadbytku NaOH"},
 {f:"[Al(OH)₄]⁻",      m:"Al³⁺", l:"OH⁻",     n:4, b:1.1e33, note:"amfoterie Al(OH)₃; Bayerův proces"},
 {f:"[Cu(en)₂]²⁺",     m:"Cu²⁺", l:"en",      n:2, b:1.0e20, note:"chelát (ethylendiamin) — chelátový efekt"},
 {f:"[Mg(EDTA)]²⁻",    m:"Mg²⁺", l:"EDTA⁴⁻",  n:1, b:4.9e8,  note:"chelatometrie, tvrdost vody"},
 {f:"[Ca(EDTA)]²⁻",    m:"Ca²⁺", l:"EDTA⁴⁻",  n:1, b:5.0e10, note:"chelatometrie, tvrdost vody"},
 {f:"[Zn(EDTA)]²⁻",    m:"Zn²⁺", l:"EDTA⁴⁻",  n:1, b:3.0e16, note:""},
 {f:"[Pb(EDTA)]²⁻",    m:"Pb²⁺", l:"EDTA⁴⁻",  n:1, b:2.0e18, note:"chelatoterapie otravy olovem"},
 {f:"[Fe(EDTA)]⁻",     m:"Fe³⁺", l:"EDTA⁴⁻",  n:1, b:1.3e25, note:"maskování Fe³⁺"}
];
function betaFind(f){ for(var i=0;i<BETA.length;i++){ if(BETA[i].f===f) return BETA[i]; } return null; }
