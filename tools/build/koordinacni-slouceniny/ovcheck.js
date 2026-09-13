/* Offline odhad překryvů textů v SVG modelech.
   Nahradí helpery txt/line/rect/svg vlastními, projde všechny stavy ovládání
   a porovná odhadnuté obálky každého <text> proti každému jinému.
   Šířka písma se odhaduje konzervativně; slouží k odhalení hrubých chyb
   ještě před spuštěním skutečného detektoru v prohlížeči.            */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const DIR = __dirname;
const FILES = ["10-data.js","20-widgets-a.js","21-widgets-b.js",
               "22-widgets-c.js","23-widgets-d.js","24-widgets-e.js"];

let REC = [];        /* aktuálně sbírané texty */
let COLLECT = false;

function stripTags(s){ return String(s).replace(/<[^>]*>/g,""); }
/* hrubý odhad šířky: podíl znaků × velikost písma */
function textWidth(s, size, mono){
  const t = stripTags(s);
  let w = 0;
  for (const ch of t){
    if ("iljtIf.,:;'|!·  ".includes(ch)) w += 0.30;
    else if ("mwMW—…".includes(ch)) w += 0.85;
    else if ("₀₁₂₃₄₅₆₇₈₉⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻".includes(ch)) w += 0.38;
    else w += mono ? 0.60 : 0.53;
  }
  return w * size;
}

const sandbox = {
  console, Math, Number, String, Array, JSON, isNaN, parseFloat, parseInt, Date,
  window: {},
  document: { querySelector: () => null, querySelectorAll: () => [] }
};
sandbox.global = sandbox;

/* --- stuby DOM --- */
function fakeEl(){
  const el = {
    innerHTML:"", textContent:"", className:"", value:"", max:"", min:"",
    style:{}, dataset:{}, options:[], selectedIndex:0,
    addEventListener(){}, setAttribute(){}, getAttribute(){ return null; },
    classList:{ add(){}, remove(){}, toggle(){ return false; }, contains(){ return false; } },
    closest(){ return null; }
  };
  return el;
}
sandbox.$  = () => fakeEl();
sandbox.$$ = () => [];
sandbox.fmt = (n,d)=> String(n);
sandbox.sgn = (n,d)=> String(n);
sandbox.toast = ()=>{};
sandbox.markDone = ()=>{};
sandbox.BANK = {};
sandbox.renderQuiz = ()=>{};
sandbox.checkQuiz = ()=>{};
sandbox.drawGloss = ()=>{};

/* --- SVG helpery s odposlechem --- */
let VB = null;
sandbox.svg = (vb, inner, extra) => { if(COLLECT) VB = String(vb).split(/\s+/).map(Number); return "<svg>"+inner+"</svg>"; };
sandbox.line = () => "";
sandbox.rect = () => "";
sandbox.txt = function(x,y,s,o){
  o = o || {};
  if (COLLECT){
    const size = o.size || 12;
    const w = textWidth(s, size, !!o.mono);
    let x0 = x;
    if (o.anchor === "middle") x0 = x - w/2;
    else if (o.anchor === "end") x0 = x - w;
    REC.push({ t: stripTags(s), x0, x1: x0 + w,
               y0: y - size*0.76, y1: y + size*0.24 });
  }
  return "";
};
sandbox.vArrow = function(x,y1,y2,color,label,side){
  if (label) sandbox.txt(x + (side==="left" ? -9 : 9), (y1+y2)/2+4, label,
                         {size:12.5, anchor: side==="left" ? "end" : "start"});
  return "";
};

vm.createContext(sandbox);
for (const f of FILES){
  vm.runInContext(fs.readFileSync(path.join(DIR,f),"utf8"), sandbox, {filename:f});
}

/* --- kontrola jednoho stavu --- */
let problems = [];
function check(nazev, fn){
  REC = []; VB = null; COLLECT = true;
  try { fn(); } catch(e){ problems.push([nazev, "VÝJIMKA: "+e.message]); COLLECT=false; return; }
  COLLECT = false;
  if (VB && VB.length === 4){
    const [vx,vy,vw,vh] = VB;
    for (const r of REC){
      if (r.x0 < vx-1 || r.x1 > vx+vw+1 || r.y0 < vy-1 || r.y1 > vy+vh+1)
        problems.push([nazev, `„${r.t}“ přesahuje viewBox (x ${r.x0.toFixed(0)}–${r.x1.toFixed(0)}, y ${r.y0.toFixed(0)}–${r.y1.toFixed(0)}; rám ${vw}×${vh})`]);
    }
  }
  const TOL = 1.0;
  for (let i=0;i<REC.length;i++) for (let j=i+1;j<REC.length;j++){
    const a=REC[i], b=REC[j];
    const ox = Math.min(a.x1,b.x1) - Math.max(a.x0,b.x0);
    const oy = Math.min(a.y1,b.y1) - Math.max(a.y0,b.y0);
    if (ox > TOL && oy > TOL){
      problems.push([nazev, `„${a.t}“ × „${b.t}“  (přesah ${ox.toFixed(0)}×${oy.toFixed(0)} px)`]);
    }
  }
}

const S = sandbox;
/* hero */
const ligIds = S.LIG.filter(l=>l.dent===1).map(l=>l.id);
["lin","tet","sq","okt"].forEach(g=>{
  for (let ci=0; ci<8; ci++) ligIds.forEach(lid=>{
    S.bxState.ci=ci; S.bxState.lig=lid; S.bxState.geo=g;
    check(`hero bx ${g}/${ci}/${lid}`, S.bxDraw);
  });
});
/* k0 */
for (let i=0;i<S.DS.length;i++){ S.dsI=i; check("k0 ds "+i, S.dsDraw); }
/* k1 */
["lin","tri","tet","sq","bip","okt"].forEach(g=>{ S.gpId=g; check("k1 gp "+g, S.gpDraw); });
/* k2 */
for (let ci=0; ci<S.nbCen.length; ci++)
  [4,6].forEach(kc=>{
    for (let na=0; na<=kc; na++) ["NH3","Cl","H2O","CN","CO"].forEach(a=>{
      S.nbState.ci=ci; S.nbState.kc=kc; S.nbState.nA=na; S.nbState.a=a; S.nbState.b="Cl";
      check(`k2 nb ${ci}/${kc}/${na}/${a}`, S.nbDraw);
    });
  });
/* k3 */
S.IZO.concat(S.IZO2).forEach(o=>{ S.izId=o.id; check("k3 iz "+o.id, S.izDraw); });
/* k4 */
["okt","tet","sq"].forEach(g=>{
  for (let mi=0; mi<S.cfKovy.length; mi++) for (let li=0; li<12; li++){
    S.cfState.geo=g; S.cfState.mi=mi; S.cfState.li=li;
    check(`k4 cf ${g}/${mi}/${li}`, S.cfDraw);
  }
});
for (let mi=0; mi<S.cfKovy.length; mi++){ S.scMi=mi; check("k4 sc "+mi, S.scDraw); }
/* k5 */
for (let i=0;i<S.HSION.length;i++) [5000,10000,18000,26000,35000].forEach(d=>{
  S.hsState.i=i; S.hsState.delta=d; check(`k5 hs ${i}/${d}`, S.hsDraw);
});
[0,1.5,2.9,4.3,5.5,6.2].forEach(m=>{ S.muVal=m; check("k5 mu "+m, S.muDraw); });
/* k6 */
[8000,11000,14000,17000,20300,24000,28000,32000,35000].forEach(d=>{
  S.clDelta=d; check("k6 cl "+d, S.clDraw);
});
[390,430,480,530,580,630,700].forEach(l=>{ S.dcLam=l; check("k6 dc "+l, S.dcDraw); });
/* k7 */
["Ni","Cu"].forEach(k=>{ S.chKov=k; check("k7 ch "+k, S.chDraw); });
for (let i=0;i<S.AGK.length;i++) [-3,-2,-1,-0.5,0].forEach(L=>{
  S.agI=i; S.agLogL=L; check(`k7 ag ${i}/${L}`, S.agDraw);
});
/* k8 */
for (let i=0;i<S.HEM.length;i++){ S.hemI=i; check("k8 hem "+i, S.hemDraw); }
/* mini-grafy */
check("mini split", ()=>S.miniSplit());
check("mini color", ()=>S.miniColor());
check("mini chel",  ()=>S.miniChel());

/* --- souhrn: každou dvojici popisků hlásíme jen jednou --- */
const uniq = new Map();
for (const [stav, popis] of problems){
  if (!uniq.has(popis)) uniq.set(popis, [stav, 1]);
  else uniq.get(popis)[1]++;
}
if (uniq.size === 0){
  console.log("Odhadem žádné překryvy. Zkontrolováno stavů: hero, k0–k8, mini-grafy.");
} else {
  console.log("NALEZENÉ DVOJICE (" + uniq.size + "):");
  for (const [popis, [stav, n]] of uniq)
    console.log(`  ${popis}   [poprvé: ${stav}, celkem stavů: ${n}]`);
}
