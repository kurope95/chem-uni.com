/* Statická simulace: spustí všechny kreslicí funkce ve všech stavech ovládání,
   odhadne rámečky textů a najde pravděpodobné překryvy. Náhrada za getBBox(),
   dokud není k dispozici prohlížeč. Šířky se odhadují konzervativně (spíš víc). */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const DIR = __dirname;
const parts = fs.readdirSync(DIR).filter(f => /^\d\d-.*\.js$/.test(f)).sort();
let src = parts.map(f => fs.readFileSync(path.join(DIR, f), "utf8")).join("\n");

/* ---- minimální náhrada DOM ---- */
const store = {};
function El(id){
  this.id = id; this._html = ""; this.value = ""; this.textContent = "";
  this.className = ""; this.style = {}; this.dataset = {}; this.options = [];
  this.disabled = false;
}
Object.defineProperty(El.prototype, "innerHTML", {
  get(){ return this._html; },
  set(v){ this._html = v; if(this.id) store[this.id] = v; }
});
El.prototype.addEventListener = function(){};
El.prototype.setAttribute = function(){};
El.prototype.getAttribute = function(){ return null; };
El.prototype.closest = function(){ return null; };
El.prototype.click = function(){};

const els = {};
function get(sel){
  const id = String(sel).replace(/^#/, "");
  if(!els[id]) els[id] = new El(id);
  return els[id];
}

/* stavy ovládání, které chceme projít */
const RANGES = {
  svKrok:[1,6,1], tvCa:[0,200,40], tvMg:[0,60,15], tvHco:[0,100,25],
  amPH:[0,140,20], rlZ:[5,92,12], akSoc:[0,100,25], npFaze:[0,4,1]
};
const SELECTS = {
  kfSel:["Li","Na","K","Cs","Be","Mg","Ca","Ba","Al","Ga","In","Tl","Ge","Sn","Pb"],
  a1Prop:["i1","ra","en","tt","rho","E"],
  a2Prop:["i1","i2","ra","en","tt","E"],
  hrPart:["o2","h2o","h2","cl2","n2","s"],
  ipView:["ie","stab","vaz"],
  tbTyp:[""], tbPrv:[""], tbQ:[""]
};

const ctx = {
  console,
  BANK:{},
  $: get,
  $$: () => [],
  fmt(n,d){ if(n===null||n===undefined||isNaN(n)) return "—";
    if(d===undefined) d=1; let s=Math.abs(n).toFixed(d);
    if(d>0){ s=s.replace(/0+$/,""); s=s.replace(/\.$/,""); }
    return (n<0?"−":"")+s.replace(".",","); },
  sgn(n,d){ const s=ctx.fmt(Math.abs(n),d); return (n<0?"−":"+")+s; },
  toast(){}, markDone(){},
  svg:(vb,inner,extra)=>'<svg viewBox="'+vb+'" '+(extra||"")+'>'+inner+'</svg>',
  txt(x,y,s,o){ o=o||{};
    return '<text data-x="'+x+'" data-y="'+y+'" data-size="'+(o.size||12)+
      '" data-anchor="'+(o.anchor||"start")+'" data-w="'+(o.w||400)+
      '" data-mono="'+(o.mono?1:0)+'">'+s+'</text>'; },
  line:()=> "", rect:()=> "", vArrow:()=> "",
  window:{}, document:{ querySelector:get, querySelectorAll:()=>[] },
  Math, String, Number, Array, Object, JSON, parseInt, parseFloat, isNaN, Date
};
ctx.window.redrawAll = null;
vm.createContext(ctx);
vm.runInContext(src, ctx);

/* ---- odhad rámečku textu ---- */
function stripTags(s){ return String(s).replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").replace(/&[a-z]+;/g,"x"); }
function charW(size, mono, weight){
  if(mono) return size*0.605;
  return size*(weight>=600 ? 0.545 : 0.515);
}
function boxes(html){
  const out = [];
  const re = /<text data-x="([-\d.]+)" data-y="([-\d.]+)" data-size="([\d.]+)" data-anchor="(\w+)" data-w="(\d+)" data-mono="(\d)">([\s\S]*?)<\/text>/g;
  let m;
  while((m = re.exec(html))){
    const x=+m[1], y=+m[2], size=+m[3], anchor=m[4], w=+m[5], mono=m[6]==="1";
    const s = stripTags(m[7]).trim();
    if(!s) continue;
    const width = s.length * charW(size, mono, w);
    let x0 = x;
    if(anchor==="middle") x0 = x - width/2;
    else if(anchor==="end") x0 = x - width;
    out.push({ s, x0, x1:x0+width, y0:y-size*1.02, y1:y+size*0.28 });
  }
  return out;
}
function scan(label, html, found){
  const b = boxes(html);
  for(let i=0;i<b.length;i++) for(let j=i+1;j<b.length;j++){
    const A=b[i], B=b[j];
    const ix = Math.min(A.x1,B.x1) - Math.max(A.x0,B.x0);
    const iy = Math.min(A.y1,B.y1) - Math.max(A.y0,B.y0);
    if(ix>1 && iy>1) found.push({ stav:label, a:A.s.slice(0,38), b:B.s.slice(0,38),
      x:Math.round(ix), y:Math.round(iy) });
  }
}

/* ---- projdi stavy ---- */
const found = [];
function run(fn, label){
  try{ fn(); }catch(e){ found.push({stav:label, a:"CHYBA: "+e.message, b:"", x:0, y:0}); return; }
  for(const id in store) scan(label+" | "+id, store[id], found);
}
function setSel(id, v){ get(id).value = v; }
function setRange(id, v){ get(id).value = String(v); }

/* výchozí hodnoty */
setSel("kfSel","Na"); setSel("a1Prop","i1"); setSel("a2Prop","i1");
setSel("hrPart","o2"); setSel("ipView","ie");
setSel("tbTyp",""); setSel("tbPrv",""); setSel("tbQ","");
for(const r in RANGES) setRange(r, RANGES[r][0]);
setRange("svKrok",1); setRange("tvCa",80); setRange("tvMg",12); setRange("tvHco",70);
setRange("amPH",30); setRange("rlZ",13); setRange("akSoc",100); setRange("npFaze",0);

/* segmentované přepínače měníme přes globální proměnné */
const SEGS = [
  ["mpMode",["val","ox","en","ra","tt"],"drawMapa"],
  ["chMode",["en","i1","tt","rho"],"drawCh"],
  ["a1Sel",["Li","Na","K","Rb","Cs"],"drawA1"],
  ["a2Sel",["Be","Mg","Ca","Sr","Ba"],"drawA2"],
  ["hrSel",["Li","Na","K","Rb","Cs"],"drawHr"],
  ["elSel",["memb","diaf","amal"],"drawEl"],
  ["vcSel",["pal","has","tuh","kras"],"drawVc"],
  ["tvMet",["nic","var_","soda","ion"],"drawTv"],
  ["hhSel",["bay","kal","ele"],"drawHh"],
  ["ipSel",["13","14"],"drawIp"],
  ["rxSel",["sn","pb","tl","fe"],"drawRx"],
  ["akMode",["vyb","nab"],"drawAk"],
  ["bgSel",["Na","K","Mg","Ca"],"drawBg"]
];
for(const [v, vals, fn] of SEGS){
  for(const val of vals){
    vm.runInContext(v+" = "+JSON.stringify(val)+";", ctx);
    run(ctx[fn], fn+"["+val+"]");
  }
}
/* selecty */
for(const id in SELECTS){
  const fnMap = {kfSel:"drawKf", a1Prop:"drawA1", a2Prop:"drawA2", hrPart:"drawHr", ipView:"drawIp"};
  if(!fnMap[id]) continue;
  for(const v of SELECTS[id]){ setSel(id, v); run(ctx[fnMap[id]], fnMap[id]+"["+v+"]"); }
}
/* posuvníky */
const rngFn = {svKrok:"drawSv", tvCa:"drawTv", tvMg:"drawTv", tvHco:"drawTv",
  amPH:"drawAm", rlZ:"drawRl", akSoc:"drawAk", npFaze:"drawNp"};
for(const id in RANGES){
  const [lo,hi,st] = RANGES[id];
  for(let v=lo; v<=hi; v+=st){ setRange(id, v); run(ctx[rngFn[id]], rngFn[id]+"["+id+"="+v+"]"); }
  setRange(id, RANGES[id][0]);
}
/* mini-grafy */
["drawMiniHor","drawMiniAmf","drawMiniIp"].forEach(f => run(ctx[f], f));

/* ---- shrnutí ---- */
const seen = {}, uniq = [];
found.forEach(f => {
  const k = f.a + "###" + f.b;
  if(seen[k]){ seen[k].n++; return; }
  seen[k] = { ...f, n:1 }; uniq.push(seen[k]);
});
uniq.sort((m,n) => n.x*n.y - m.x*m.y);
console.log("stavů prošlo:", Object.keys(store).length, "| různých nálezů:", uniq.length);

/* kontrola undefined / NaN v každém stavu */
let junk=0;
for(const id in store){
  const h=store[id];
  [['undefined',/undefined/g],['NaN',/(^|[^A-Za-z])NaN([^A-Za-z0-9]|$)/g],['[object',/\[object /g],['{{',/\{\{/g]].forEach(p=>{
    const m=h.match(p[1]); if(m){ console.log('  JUNK v #'+id+': "'+p[0]+'" x'+m.length); junk+=m.length; }
  });
}
console.log('podezřelých řetězců (undefined/NaN/…):', junk);
uniq.slice(0,40).forEach(u => console.log(
  "  ["+u.stav+"]  \""+u.a+"\"  ×  \""+u.b+"\"   překryv "+u.x+"×"+u.y+"  (v "+u.n+" stavech)"));
