/* Offline odhad překryvů textů v SVG.
   Načte tematické díly skriptu, nahradí motor stuby, projede všechny stavy
   ovládání a odhadne bounding boxy textů. Není to náhrada za overlap.js
   v prohlížeči, ale odchytí většinu kolizí předem. */
"use strict";
const fs = require("fs"), path = require("path");
const DIR = __dirname;

/* ---------- stub motoru ---------- */
const store = new Map();          // selektor -> stub prvku
function El(sel){
  this._sel = sel; this.value = ""; this.textContent = ""; this.innerHTML = "";
  this.className = ""; this.dataset = {}; this.options = [];
  this.min = "0"; this.max = "100";
}
El.prototype.addEventListener = function(){};
El.prototype.setAttribute = function(){};
El.prototype.getAttribute = function(){ return null; };
El.prototype.appendChild = function(){};
function $(sel){
  if(!store.has(sel)) store.set(sel, new El(sel));
  return store.get(sel);
}
function $$(sel){ return []; }
function fmt(n,d){
  if(n===null||n===undefined||isNaN(n)) return "—";
  if(d===undefined) d=1;
  let s=Math.abs(n).toFixed(d);
  if(d>0){ s=s.replace(/0+$/,""); s=s.replace(/\.$/,""); }
  s=s.replace(".",",");
  return (n<0?"−":"")+s;
}
function sgn(n,d){ const s=fmt(Math.abs(n),d); return (n<0?"−":"+")+s; }
const CAPTURED = [];
function svg(vb, inner, extra){ return '<svg viewBox="'+vb+'">'+inner+'</svg>'; }
function txt(x,y,s,o){
  o=o||{};
  return '<text x="'+x+'" y="'+y+'" data-size="'+(o.size||12)+'" data-mono="'+(o.mono?1:0)+
    '" data-anchor="'+(o.anchor||"start")+'" data-w="'+(o.w||400)+'">'+s+'</text>';
}
function line(){ return ""; }
function rect(){ return ""; }
function vArrow(x,y1,y2,color,label,side){
  const my=(y1+y2)/2;
  return txt(x+(side==="left"?-9:9), my+4, label, {size:12.5,w:600,anchor:side==="left"?"end":"start"});
}
function markDone(){}
function toast(){}
const BANK = {};

/* ---------- načtení tematických dílů ---------- */
const parts = ["10-data.js","11-data2.js","20-widgets.js","21-widgets.js",
               "22-widgets.js","23-widgets.js","24-widgets.js"];
let src = parts.map(p => fs.readFileSync(path.join(DIR,p),"utf8")).join("\n");
const ctx = { $, $$, fmt, sgn, svg, txt, line, rect, vArrow, markDone, toast, BANK, Math, String, Number,
              parseInt, parseFloat, isNaN, JSON, Array, Object, console };
const fn = new Function(...Object.keys(ctx), src + "\n; return {" +
  ["drawRada","drawEn","drawLk","drawMx","drawBv","drawMg","drawCh","drawMn","drawTri",
   "drawFe","drawRz","drawDr","drawZd","drawOk","drawKt","drawOc","drawMiniEn","drawMiniOx",
   "drawMiniBar","hund"].join(",") + ",\n" +
  "set:function(k,v){ eval(k+'=v'); }, get:function(k){ return eval(k); } };");
const M = fn(...Object.values(ctx));

/* ---------- odhad bounding boxu ---------- */
function plain(html){
  return String(html)
    .replace(/<[^>]*>/g,"")
    .replace(/&nbsp;/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
}
function widthOf(s,size,mono){
  const k = mono ? 0.60 : 0.545;
  let w=0;
  for(const ch of s){
    if("iljtfr.,:;'|!¹²³⁻⁺ ".indexOf(ch)>=0) w += k*size*0.55;
    else if("mwMW—".indexOf(ch)>=0) w += k*size*1.45;
    else if(ch>="A"&&ch<="Z") w += k*size*1.18;
    else w += k*size;
  }
  return w;
}
function boxes(svgStr){
  const out=[];
  const re=/<text x="([-\d.]+)" y="([-\d.]+)" data-size="([\d.]+)" data-mono="(\d)" data-anchor="(\w+)" data-w="(\d+)">([\s\S]*?)<\/text>/g;
  let m;
  while((m=re.exec(svgStr))){
    const x=+m[1], y=+m[2], size=+m[3], mono=m[4]==="1", anchor=m[5];
    const s=plain(m[7]).trim();
    if(!s) continue;
    let w=widthOf(s,size,mono);
    let x0 = anchor==="middle" ? x-w/2 : (anchor==="end" ? x-w : x);
    out.push({t:s, x0:x0, x1:x0+w, y0:y-size*0.78, y1:y+size*0.24});
  }
  return out;
}
const TOL=1.0;
const nalezy=[];
function scan(label, svgStr){
  const b=boxes(svgStr);
  for(let i=0;i<b.length;i++) for(let j=i+1;j<b.length;j++){
    const ix=Math.min(b[i].x1,b[j].x1)-Math.max(b[i].x0,b[j].x0);
    const iy=Math.min(b[i].y1,b[j].y1)-Math.max(b[i].y0,b[j].y0);
    if(ix>TOL && iy>TOL) nalezy.push({stav:label, a:b[i].t.slice(0,40), b:b[j].t.slice(0,40),
                                      x:Math.round(ix), y:Math.round(iy)});
  }
}
function grab(sel){ return store.has(sel) ? store.get(sel).innerHTML : ""; }
function run(label, draw, wrap){
  try{ draw(); }catch(e){ nalezy.push({stav:label,a:"CHYBA: "+e.message,b:"",x:0,y:0}); return; }
  scan(label, grab(wrap));
}

/* ---------- projetí všech stavů ---------- */
/* hero */
["Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn"].forEach(function(s){
  M.set("rdId", s); run("hero "+s, M.drawRada, "#rdWrap");
});
/* k0 energie */
for(let z=18;z<=30;z++){ $("#enZ").value=String(z); run("enZ "+z, M.drawEn, "#enWrap"); }
/* k0 lanthanoidy */
["rada","dvoj"].forEach(function(v){ M.set("lkId", v); run("lk "+v, M.drawLk, "#lkWrap"); });
/* k1 mapa */
["vse","bezne","nej"].forEach(function(v){ M.set("mxId", v); run("mx "+v, M.drawMx, "#mxWrap"); });
/* k2 barva */
const KOMP = M.get("KOMPLEXY");
KOMP.forEach(function(k){ $("#bvSel").value=k.id; $("#bvD").value=String(k.D); run("bv "+k.id, M.drawBv, "#bvWrap"); });
[11000,15500,20000,24500,29000].forEach(function(d){ $("#bvSel").value="vlastni"; $("#bvD").value=String(d); run("bv D="+d, M.drawBv, "#bvWrap"); });
/* k2 magnetismus */
const MG = M.get("MAGN");
["slabe","silne"].forEach(function(p){
  M.set("mgPole", p);
  MG.forEach(function(m){ $("#mgSel").value=m.id; run("mg "+m.id+" "+p, M.drawMg, "#mgWrap"); });
});
/* k3 chroman */
[20,45,70,95,120].forEach(function(v){ $("#chP").value=String(v); run("chP "+v, M.drawCh, "#chWrap"); });
/* k3 manganistan */
["kys","neu","zas"].forEach(function(v){ M.set("mnId", v); run("mn "+v, M.drawMn, "#mnWrap"); });
/* k4 triáda */
["fe","co","ni"].forEach(function(v){ M.set("triId", v); run("tri "+v, M.drawTri, "#triWrap"); });
/* k4 důkazy */
const FEC = M.get("FECIN");
["2","3"].forEach(function(io){
  M.set("feIon", io);
  FEC.forEach(function(c){ $("#feCin").value=c.id; run("fe "+c.id+" "+io, M.drawFe, "#feWrap"); });
});
/* k5 rozpouštění */
const K3 = M.get("KOVY3"), CIN = M.get("CINIDLA");
K3.forEach(function(k){ CIN.forEach(function(c){
  $("#rzKov").value=k.id; $("#rzCin").value=c.id; run("rz "+k.id+"_"+c.id, M.drawRz, "#rzWrap");
}); });
/* k6 trenažér */
const DR = M.get("DRILL");
[false,true].forEach(function(ans){
  DR.forEach(function(_,i){ M.set("drIdx", i); M.set("drAns", ans); run("dr "+i+" "+ans, M.drawDr, "#drWrap"); });
});
/* k7 zpětná donace */
["volny","sigma","pi","vysl"].forEach(function(v){ M.set("zdId", v); run("zd "+v, M.drawZd, "#zdWrap"); });
/* k7 karbonyly */
M.get("KARB").forEach(function(k){ $("#okSel").value=k.id; run("ok "+k.id, M.drawOk, "#okWrap"); });
/* k7 katalýza */
M.get("KATAL").forEach(function(p){ $("#ktSel").value=p.id; run("kt "+p.id, M.drawKt, "#ktWrap"); });
/* k8 ocel */
[2,100,211,300,400].forEach(function(c){
  [0,8,10,18,26].forEach(function(cr){
    [0,5,10,20].forEach(function(ni){
      $("#ocC").value=String(c); $("#ocCr").value=String(cr); $("#ocNi").value=String(ni);
      run("oc "+c+"/"+cr+"/"+ni, M.drawOc, "#ocWrap");
    });
  });
});
/* mini grafy */
run("miniEn", M.drawMiniEn, "#miniEnWrap");
run("miniOx", M.drawMiniOx, "#miniOxWrap");
run("miniBar", M.drawMiniBar, "#miniBarWrap");

/* ---------- výstup ---------- */
const seen={}, uniq=[];
nalezy.forEach(function(f){
  const k=f.a+"###"+f.b;
  if(seen[k]){ seen[k].n++; return; }
  seen[k]={a:f.a,b:f.b,x:f.x,y:f.y,stav:f.stav,n:1}; uniq.push(seen[k]);
});
uniq.sort((m,n)=>n.x*n.y-m.x*m.y);
console.log("celkem překryvů:", nalezy.length, " různých:", uniq.length);
uniq.slice(0,40).forEach(f=>console.log("  ["+f.stav+"] „"+f.a+"“ × „"+f.b+"“  průnik "+f.x+"×"+f.y+"  (stavů: "+f.n+")"));
