# -*- coding: utf-8 -*-
"""spolu_js.py — jádro trenažéru: jednotky, stromy výrazů, vykreslování, zjednodušení."""

CORE = r"""
/* ============================================================ pomocné */
var $=function(s,r){return (r||document).querySelector(s);};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
var ATOMS=DATA.atoms, SYMS=DATA.syms, CONSTS=DATA.consts, TASKS=DATA.tasks;

var store={
  get:function(k,f){try{var v=localStorage.getItem("spolu."+k);return v===null?f:JSON.parse(v);}
    catch(e){return f;}},
  set:function(k,v){try{localStorage.setItem("spolu."+k,JSON.stringify(v));}catch(e){}},
  del:function(k){try{localStorage.removeItem("spolu."+k);}catch(e){}}
};
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;")
  .replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
function uniq(a){var o=[];a.forEach(function(x){if(o.indexOf(x)<0)o.push(x);});return o;}
var SUPCH={"-":"⁻","0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹"};
function supStr(n){return String(n).split("").map(function(c){return SUPCH[c]||c;}).join("");}

/* česká desetinná čárka, rozumný počet platných číslic, mocniny deseti */
function fmtNum(v,sig){
  if(v===null||v===undefined||!isFinite(v)) return "—";
  sig=sig||4;
  if(v===0) return "0";
  var a=Math.abs(v), out;
  if(a>=1e7||a<1e-4){
    var e=Math.floor(Math.log10(a));
    var m=v/Math.pow(10,e);
    m=Number(m.toFixed(sig-1));
    if(Math.abs(m)>=10){m/=10;e++;}
    return String(m).replace(".",",")+"·10"+supStr(e);
  }
  var dec=Math.max(0,sig-1-Math.floor(Math.log10(a)));
  out=Number(v.toFixed(Math.min(12,dec)));
  return String(out).replace(".",",");
}
/* číslo na pevný počet platných číslic — koncové nuly se nezahazují */
function fmtSig(v,sig){
  if(v===null||v===undefined||!isFinite(v)) return "—";
  sig=sig||3;
  if(v===0) return "0";
  var a=Math.abs(v);
  if(a>=1e7||a<1e-4){
    var e=Math.floor(Math.log10(a)), m=v/Math.pow(10,e);
    if(Math.abs(Number(m.toFixed(sig-1)))>=10){ m/=10; e++; }
    return m.toFixed(sig-1).replace(".",",")+"·10"+supStr(e);
  }
  var dec=Math.max(0,sig-1-Math.floor(Math.log10(a)));
  return v.toFixed(Math.min(12,dec)).replace(".",",");
}
/* čtení čísla od studenta: 5,85 · 1,77e-10 · 1,77·10^-10 */
function parseVal(s){
  if(s===null||s===undefined) return null;
  var t=String(s).trim().replace(/\s| /g,"").replace(/−/g,"-").replace(/,/g,".");
  t=t.replace(/·10\^?/g,"e").replace(/x10\^?/gi,"e").replace(/\*10\^?/g,"e");
  t=t.replace(/⁻/g,"-");
  t=t.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g,function(c){return "0123456789"["⁰¹²³⁴⁵⁶⁷⁸⁹".indexOf(c)];});
  if(!/^[-+]?(\d+\.?\d*|\.\d+)([eE][-+]?\d+)?$/.test(t)) return null;
  var f=parseFloat(t);
  return isFinite(f)?f:null;
}
/* počet platných číslic zapsaného čísla */
function sigDigits(s){
  var t=String(s||"").trim().replace(/\s/g,"").replace(/−/g,"-").replace(/,/g,".");
  t=t.replace(/·10\^?[-+]?\d+/,"").replace(/[eE][-+]?\d+/,"");
  t=t.replace(/^[-+]/,"");
  var hasDot=t.indexOf(".")>=0;
  t=t.replace(".","");
  t=t.replace(/^0+/,"");
  if(!hasDot) t=t.replace(/0+$/,"");
  return Math.max(1,t.length);
}

/* ============================================================ jednotky */
function parseUnit(u){
  u=(u||"one").trim();
  var i=u.indexOf("/"), a=i<0?u:u.slice(0,i), b=i<0?"":u.slice(i+1);
  var f=function(s){return s.split("*").filter(function(x){return x;});};
  return {n:f(a),d:f(b)};
}
function unitInfo(u){
  var p=(typeof u==="string")?parseUnit(u):u, f=1, d={}, parts=[], off=0, i, at;
  if(p.n.length===1&&!p.d.length) off=ATOMS[p.n[0]].off||0;
  for(i=0;i<p.n.length;i++){ at=ATOMS[p.n[i]]; if(!at) return null;
    f*=at.f; for(var k in at.d) d[k]=(d[k]||0)+at.d[k];
    if(at.e) parts.push(at.b+(at.e!==1?supStr(at.e):"")); }
  for(i=0;i<p.d.length;i++){ at=ATOMS[p.d[i]]; if(!at) return null;
    f/=at.f; for(var k2 in at.d) d[k2]=(d[k2]||0)-at.d[k2];
    parts.push(at.b+supStr(-at.e)); }
  for(var k3 in d) if(!d[k3]) delete d[k3];
  return {f:f,d:d,t:parts.length?parts.join("·"):"1",off:off};
}
function sameDim(a,b){
  if(!a||!b) return false;
  var ka=Object.keys(a.d), kb=Object.keys(b.d);
  if(ka.length!==kb.length) return false;
  for(var i=0;i<ka.length;i++) if(Math.abs((a.d[ka[i]]||0)-(b.d[ka[i]]||0))>1e-9) return false;
  return true;
}
function dimText(d){
  var s=[]; for(var k in d) s.push(k+(d[k]!==1?supStr(d[k]):""));
  return s.length?s.join("·"):"bezrozměrné";
}
/* převod mezi jednotkami (nesouhlasný rozměr → null) */
function conv(v,from,to){
  var a=unitInfo(from), b=unitInfo(to);
  if(!a||!b||!sameDim(a,b)) return null;
  return ((v*a.f+a.off)-b.off)/b.f;
}
function unitText(u){ var i=unitInfo(u); return i?i.t:"?"; }
/* bezrozměrná jednotka se za číslem nepíše */
function unitLabel(u){ var t=unitText(u); return (t==="1")?"":t; }
function withU(v,u){ var t=unitLabel(u); return t?(v+" "+t):v; }

/* ============================================================ výrazy */
function skey(n){ return n.s+"|"+(n.sub||""); }
function symDisp(n){
  var k=skey(n), e=SYMS[k];
  if(e) return e.disp;
  e=SYMS[n.s+"|"];
  if(!e) return "<i>"+esc(n.s)+"</i>";
  var d=e.disp;
  return (d.slice(-4)==="</i>")? d.slice(0,-4)+"</i><sub>"+n.sub+"</sub>"
                               : d+"<sub>"+n.sub+"</sub>";
}
function symInfo(k){
  if(SYMS[k]) return SYMS[k];
  var base=SYMS[k.split("|")[0]+"|"];
  if(!base) return null;
  var o={disp:symDisp({s:k.split("|")[0],sub:k.split("|")[1]}),name:base.name,
         canon:base.canon,units:base.units};
  return o;
}
function clone(n){ return JSON.parse(JSON.stringify(n)); }
function symsIn(n,out){
  out=out||[];
  if(!n) return out;
  if(n.k==="sym"){ var k=skey(n); if(out.indexOf(k)<0) out.push(k); }
  else if(n.k==="op"){ symsIn(n.a,out); symsIn(n.b,out); }
  else if(n.k==="fn"||n.k==="neg") symsIn(n.a,out);
  return out;
}
function hasSym(n,key){ return symsIn(n).indexOf(key)>=0; }
function substitute(n,key,rhs){
  if(!n) return n;
  if(n.k==="sym") return skey(n)===key?clone(rhs):n;
  if(n.k==="op") return {k:"op",o:n.o,a:substitute(n.a,key,rhs),b:substitute(n.b,key,rhs)};
  if(n.k==="fn") return {k:"fn",f:n.f,a:substitute(n.a,key,rhs)};
  if(n.k==="neg") return {k:"neg",a:substitute(n.a,key,rhs)};
  return n;
}
function evalNode(n,vals){
  switch(n.k){
    case "num": return n.v;
    case "const": return CONSTS[n.s].v;
    case "sym": {
      var k=skey(n);
      if(!(k in vals)) throw new Error("chybí hodnota "+k);
      return vals[k];
    }
    case "neg": return -evalNode(n.a,vals);
    case "fn": {
      var x=evalNode(n.a,vals);
      if(n.f==="sqrt") return Math.sqrt(x);
      if(n.f==="cbrt") return Math.pow(x,1/3);
      if(n.f==="log") return Math.log(x)/Math.LN10;
      if(n.f==="ln") return Math.log(x);
      if(n.f==="abs") return Math.abs(x);
      return Math.exp(x);
    }
  }
  var a=evalNode(n.a,vals), b=evalNode(n.b,vals);
  if(n.o==="+") return a+b;
  if(n.o==="-") return a-b;
  if(n.o==="*") return a*b;
  if(n.o==="/") return a/b;
  return Math.pow(a,b);
}
/* --- POROVNÁVÁNÍ VÝRAZŮ: vždy numericky, nikdy strukturně -------------
   c·V a V·c, (a·b)·c a a·(b·c), m/(M·V) a (m/M)/V — pro aplikaci totéž. */
function equivalent(a,b){
  if(!a||!b) return false;
  var keys=uniq(symsIn(a).concat(symsIn(b))), good=0, t;
  for(t=0;t<14&&good<8;t++){
    var v={},i;
    for(i=0;i<keys.length;i++) v[keys[i]]=0.6+Math.random()*2.4;
    var x,y;
    try{ x=evalNode(a,v); y=evalNode(b,v); }catch(e){ return false; }
    if(!isFinite(x)||!isFinite(y)) continue;
    var diff=Math.abs(x-y), scale=Math.max(Math.abs(x),Math.abs(y),1e-9);
    if(diff/scale>1e-9) return false;
    good++;
  }
  return good>=6;
}
function closeTo(a,b,rel){
  if(a===null||b===null||!isFinite(a)||!isFinite(b)) return false;
  return Math.abs(a-b)<=Math.max(Math.abs(b),1e-12)*(rel||1e-6);
}
/* rozměrová analýza výrazu; vrací {d:…,num:bool} nebo null */
function dimsOf(n,dm){
  var a,b;
  switch(n.k){
    case "num": return {d:{},num:true};
    case "const": {
      var ci=unitInfo(CONSTS[n.s].unit);
      return ci?{d:ci.d,num:false}:null;
    }
    case "sym": {
      var k=skey(n);
      return (k in dm)?{d:dm[k],num:false}:null;
    }
    case "neg": return dimsOf(n.a,dm);
    case "fn": {
      a=dimsOf(n.a,dm);
      if(!a) return null;
      if(n.f==="sqrt") return {d:scaleDim(a.d,0.5),num:a.num};
      if(n.f==="cbrt") return {d:scaleDim(a.d,1/3),num:a.num};
      if(n.f==="abs") return a;
      return {d:{},num:a.num};
    }
  }
  a=dimsOf(n.a,dm); b=dimsOf(n.b,dm);
  if(!a||!b) return null;
  if(n.o==="*") return {d:addDim(a.d,b.d,1),num:a.num&&b.num};
  if(n.o==="/") return {d:addDim(a.d,b.d,-1),num:a.num&&b.num};
  if(n.o==="^"){
    if(n.b.k==="num") return {d:scaleDim(a.d,n.b.v),num:a.num};
    return Object.keys(a.d).length?null:{d:{},num:a.num&&b.num};
  }
  if(a.num) return b;
  if(b.num) return a;
  return dimEq(a.d,b.d)?{d:a.d,num:false}:null;
}
function addDim(x,y,s){var o={},k;for(k in x)o[k]=(o[k]||0)+x[k];for(k in y)o[k]=(o[k]||0)+s*y[k];
  for(k in o) if(Math.abs(o[k])<1e-9) delete o[k]; return o;}
function scaleDim(x,s){var o={},k;for(k in x){o[k]=x[k]*s;if(Math.abs(o[k])<1e-9)delete o[k];}return o;}
function dimEq(x,y){var k;for(k in x)if(Math.abs((y[k]||0)-x[k])>1e-9)return false;
  for(k in y)if(Math.abs((x[k]||0)-y[k])>1e-9)return false;return true;}

/* ============================================================ vykreslení */
/* priority: atom 9, ^ 8, * 3, +− 2, neg 2; dělení = skutečný zlomek (atom) */
function rnd(n,prec,o){
  var h="",p=9;
  switch(n.k){
    case "num":
      h='<span class="nv">'+fmtNum(n.v,6)+'</span>';
      if(n.v<0) p=2;
      break;
    case "const":
      h='<span class="cv" title="'+esc(CONSTS[n.s].name)+'">'+CONSTS[n.s].disp+'</span>';
      break;
    case "sym": {
      var k=skey(n), d=symDisp(n);
      if(o.num&&(k in o.num)){
        h='<span class="subv'+(o.mark&&o.mark===k?" mk":"")+'">'+o.num[k]+'</span>';
      } else if(o.tap){
        h='<button type="button" class="tok'+(o.sel===k?" sel":"")+(o.hl===k?" hl":"")+
          '" data-sk="'+esc(k)+'" title="'+esc((symInfo(k)||{}).name||"")+'">'+d+'</button>';
      } else {
        h='<span class="tok'+(o.hl===k?" hl":"")+'">'+d+'</span>';
      }
      break;
    }
    case "neg": h='<span class="op">−</span>'+rnd(n.a,3,o); p=2; break;
    case "fn": {
      var inner=rnd(n.a,0,o);
      if(n.f==="sqrt"||n.f==="cbrt")
        h='<span class="rt"><span class="rs">'+(n.f==="sqrt"?"√":"∛")+
          '</span><span class="rb">'+inner+'</span></span>';
      else
        h='<span class="fnm">'+({log:"log",ln:"ln",abs:"abs",exp:"e"}[n.f])+'</span>'+
          '<span class="par">(</span>'+inner+'<span class="par">)</span>';
      break;
    }
    case "op":
      if(n.o==="/"){
        h='<span class="frac"><span class="fnum">'+rnd(n.a,0,o)+'</span>'+
          '<span class="fden">'+rnd(n.b,0,o)+'</span></span>';
      } else if(n.o==="*"){
        h=rnd(n.a,3,o)+'<span class="op">·</span>'+rnd(n.b,3,o); p=3;
      } else if(n.o==="^"){
        h=rnd(n.a,4,o)+'<sup>'+rnd(n.b,0,o)+'</sup>'; p=8;
      } else {
        h=rnd(n.a,2,o)+'<span class="op">'+(n.o==="+"?"+":"−")+'</span>'+
          rnd(n.b,n.o==="-"?2.5:2,o); p=2;
      }
      break;
  }
  if(p<prec) h='<span class="par">(</span>'+h+'<span class="par">)</span>';
  return h;
}
function R(n,o){ return '<span class="math">'+rnd(n,0,o||{})+'</span>'; }

/* ============================================================ zjednodušení */
function sig(n){
  switch(n.k){
    case "num": return "n"+n.v;
    case "const": return "k"+n.s;
    case "sym": return "s"+skey(n);
    case "neg": return "-("+sig(n.a)+")";
    case "fn": return n.f+"("+sig(n.a)+")";
  }
  if(n.o==="*"||n.o==="+"){
    var f=(n.o==="*"?factors(n):terms(n)).map(sig).sort();
    return n.o+"["+f.join(",")+"]";
  }
  return n.o+"("+sig(n.a)+","+sig(n.b)+")";
}
function factors(n,out){ out=out||[];
  if(n.k==="op"&&n.o==="*"){factors(n.a,out);factors(n.b,out);} else out.push(n); return out;}
function terms(n,out){ out=out||[];
  if(n.k==="op"&&n.o==="+"){terms(n.a,out);terms(n.b,out);} else out.push(n); return out;}
function prod(list){
  if(!list.length) return {k:"num",v:1};
  var r=list[0];
  for(var i=1;i<list.length;i++) r={k:"op",o:"*",a:r,b:list[i]};
  return r;
}
/* projde strom, na prvním uzlu, kde fn vrátí náhradu, ji použije */
function walk(n,fn){
  var r=fn(n);
  if(r) return r;
  if(n.k==="op"){
    var a=walk(n.a,fn); if(a) return {k:"op",o:n.o,a:a,b:n.b};
    var b=walk(n.b,fn); if(b) return {k:"op",o:n.o,a:n.a,b:b};
  } else if(n.k==="fn"){
    var x=walk(n.a,fn); if(x) return {k:"fn",f:n.f,a:x};
  } else if(n.k==="neg"){
    var y=walk(n.a,fn); if(y) return {k:"neg",a:y};
  }
  return null;
}
/* (a/b)/c → a/(b·c)   a/(b/c) → (a·c)/b */
function opFlatten(root){
  return walk(root,function(n){
    if(n.k!=="op"||n.o!=="/") return null;
    if(n.a.k==="op"&&n.a.o==="/")
      return {k:"op",o:"/",a:n.a.a,b:{k:"op",o:"*",a:n.a.b,b:n.b}};
    if(n.b.k==="op"&&n.b.o==="/")
      return {k:"op",o:"/",a:{k:"op",o:"*",a:n.a,b:n.b.b},b:n.b.a};
    return null;
  });
}
/* vykrácení stejného činitele v čitateli i jmenovateli */
function opCancel(root){
  return walk(root,function(n){
    if(n.k!=="op"||n.o!=="/") return null;
    var fa=factors(n.a), fb=factors(n.b), i,j;
    for(i=0;i<fa.length;i++) for(j=0;j<fb.length;j++){
      if(sig(fa[i])===sig(fb[j])&&fa[i].k!=="num"){
        var na=fa.slice(); na.splice(i,1);
        var nb=fb.slice(); nb.splice(j,1);
        if(!nb.length) return prod(na);
        return {k:"op",o:"/",a:prod(na),b:prod(nb)};
      }
    }
    return null;
  });
}
/* x·x → x²,  x·x^k → x^(k+1) */
function opMergePow(root){
  return walk(root,function(n){
    if(n.k!=="op"||n.o!=="*") return null;
    var f=factors(n),i,j;
    var base=function(x){return (x.k==="op"&&x.o==="^")?x.a:x;};
    var expo=function(x){return (x.k==="op"&&x.o==="^"&&x.b.k==="num")?x.b.v:1;};
    for(i=0;i<f.length;i++) for(j=i+1;j<f.length;j++){
      if(f[i].k==="num"||f[j].k==="num") continue;
      if(sig(base(f[i]))===sig(base(f[j]))){
        var e=expo(f[i])+expo(f[j]);
        var nf=f.slice();
        nf.splice(j,1);
        nf[i]={k:"op",o:"^",a:base(f[i]),b:{k:"num",v:e}};
        return prod(nf);
      }
    }
    return null;
  });
}
var SIMPS=[
  {id:"flatten",lbl:"Rozvinout složený zlomek",fn:opFlatten,
   no:"Ve výrazu není zlomek ve zlomku. Rozvinout jde jen podíl, který má zlomek "+
      "v čitateli nebo ve jmenovateli."},
  {id:"cancel",lbl:"Vykrátit stejný činitel",fn:opCancel,
   no:"V žádném zlomku není stejný činitel nahoře i dole. Krátit se dá jen to, "+
      "co se v čitateli i jmenovateli objevuje jako celý činitel."},
  {id:"pow",lbl:"Sloučit stejné činitele na mocninu",fn:opMergePow,
   no:"Ve výrazu se žádný činitel neopakuje dvakrát v součinu, takže není co "+
      "sloučit na mocninu."}
];
"""
