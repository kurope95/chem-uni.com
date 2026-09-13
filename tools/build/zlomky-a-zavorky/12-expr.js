/* ============================================================
   EX — malý parser a sazeč výrazů pro interaktivní modely
   Rozumí: veličiny, čísla s desetinnou čárkou, + − · / a závorky.
   Umí: vyhodnotit, vypsat lineárně, vypsat s VŠEMI závorkami
        (přidané zvýrazní) a vysázet stohovaně jako .frac.
   Sazba .frac je záměrně stejná jako u textového sazeče níž.
   ============================================================ */
var EX = (function(){
  "use strict";

  var PREC = {"+":1,"−":1,"-":1,"·":2,"*":2,"/":2};
  var NORM = {"*":"·","-":"−"};
  var TOKC = /[A-Za-z0-9À-ÖØ-öø-ſΑ-Ωα-ω,._°%₀₁₂₃₄₅₆₇₈₉⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/;

  function esc(s){
    return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;")
                    .replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  }

  function tokenize(s){
    var t=[], i=0, n=s.length;
    while(i<n){
      var c=s.charAt(i);
      if(c===" "||c===" "||c==="\t"){ i++; continue; }
      if(c==="("||c===")"){ t.push(c); i++; continue; }
      if(PREC[c]!==undefined){ t.push(NORM[c]||c); i++; continue; }
      if(c===":"){ t.push("/"); i++; continue; }
      if(TOKC.test(c)){
        var j=i;
        while(j<n && TOKC.test(s.charAt(j))) j++;
        t.push(s.slice(i,j)); i=j; continue;
      }
      throw new Error("Nerozumím znaku „"+c+"“. Používejte jen písmena, čísla, + − · / a závorky.");
    }
    return t;
  }

  function parse(str){
    var t=tokenize(str), p=0;
    function peek(){ return p<t.length ? t[p] : null; }
    function atom(){
      var tk=peek();
      if(tk===null) throw new Error("Výraz končí uprostřed — chybí poslední veličina.");
      if(tk==="("){
        p++; var e=expr(1);
        if(peek()!==")") throw new Error("Chybí uzavírací závorka.");
        p++; e.par=true; return e;
      }
      if(tk===")") throw new Error("Přebývá uzavírací závorka.");
      if(PREC[tk]!==undefined) throw new Error("Operátor „"+tk+"“ stojí tam, kde čekám veličinu.");
      p++;
      if(/^[0-9]/.test(tk)){
        var v=parseFloat(tk.replace(",","."));
        if(isNaN(v)) throw new Error("Nerozumím číslu „"+tk+"“.");
        return {t:"num", v:v, s:tk};
      }
      return {t:"var", n:tk};
    }
    function unary(){
      if(peek()==="−"){ p++; return {t:"neg", a:unary()}; }
      return atom();
    }
    function expr(minp){
      var left=unary();
      for(;;){
        var op=peek();
        if(op!==null && PREC[op]!==undefined && PREC[op]>=minp){
          p++;
          var right=expr(PREC[op]+1);
          left={t:"op", o:op, a:left, b:right};
        } else break;
      }
      return left;
    }
    var r=expr(1);
    if(p!==t.length) throw new Error("Ve výrazu něco přebývá — zkontrolujte závorky a operátory.");
    return r;
  }

  /* ---- vyhodnocení ---- */
  function ev(n,env){
    if(n.t==="num") return n.v;
    if(n.t==="var"){
      var v=env[n.n];
      if(v===undefined) throw new Error("Nemám hodnotu pro veličinu „"+n.n+"“.");
      return v;
    }
    if(n.t==="neg") return -ev(n.a,env);
    var a=ev(n.a,env), b=ev(n.b,env);
    if(n.o==="+") return a+b;
    if(n.o==="−") return a-b;
    if(n.o==="·") return a*b;
    if(n.o==="/") return a/b;
    throw new Error("Neznámá operace.");
  }
  function evs(str,env){ return ev(parse(str),env); }

  function vlist(n,acc){
    acc=acc||[];
    if(n.t==="var"){ if(acc.indexOf(n.n)<0) acc.push(n.n); }
    else if(n.t==="neg") vlist(n.a,acc);
    else if(n.t==="op"){ vlist(n.a,acc); vlist(n.b,acc); }
    return acc;
  }
  function vlists(str){ return vlist(parse(str)); }

  function clone(n){
    if(n.t==="num") return {t:"num", v:n.v, s:n.s, par:n.par};
    if(n.t==="var") return {t:"var", n:n.n, par:n.par};
    if(n.t==="neg") return {t:"neg", a:clone(n.a), par:n.par};
    return {t:"op", o:n.o, a:clone(n.a), b:clone(n.b), par:n.par};
  }

  /* ---- čísla ---- */
  function num(v,d){
    if(d===undefined) d=4;
    if(!isFinite(v)) return "—";
    var s=Math.abs(v).toFixed(d);
    if(d>0){ s=s.replace(/0+$/,""); s=s.replace(/\.$/,""); }
    return (v<0?"−":"")+s.replace(".",",");
  }
  function numTxt(n){ return n.s!==undefined ? esc(n.s) : num(n.v,4); }

  /* ---- lineární zápis (minimum závorek) ---- */
  var PL={"+":1,"−":1,"·":2,"/":2};
  function lin(n,minp,mark){
    minp=minp||0;
    var s, need=false;
    if(n.t==="num") s=numTxt(n);
    else if(n.t==="var") s=esc(n.n);
    else if(n.t==="neg"){ s="−"+lin(n.a,3,mark); need=(1<minp); }
    else {
      var pr=PL[n.o];
      s=lin(n.a,pr,mark)+" "+n.o+" "+lin(n.b,pr+1,mark);
      need=(pr<minp);
    }
    if(need) s="("+s+")";
    if(mark && n===mark) s='<span class="hlop">'+s+"</span>";
    return s;
  }
  function lins(str){ return lin(parse(str),0,null); }

  /* ---- zápis se všemi závorkami; přidané se zvýrazní ---- */
  function needBr(parentOp, child){
    if(child.t==="neg") return true;
    if(child.t!=="op") return false;
    if(parentOp==="·" && child.o==="·") return false;
    if(parentOp==="+" && child.o==="+") return false;
    return true;
  }
  function wrapB(inner, added){
    return added
      ? '<span class="addb">(</span>'+inner+'<span class="addb">)</span>'
      : '<span class="pth">(</span>'+inner+'<span class="pth">)</span>';
  }
  function expl(n){
    if(n.t==="num") return numTxt(n);
    if(n.t==="var") return esc(n.n);
    if(n.t==="neg") return "−"+expl(n.a);
    var L=expl(n.a), R=expl(n.b);
    if(needBr(n.o,n.a)) L=wrapB(L,!n.a.par);
    if(needBr(n.o,n.b)) R=wrapB(R,!n.b.par);
    return L+" "+n.o+" "+R;
  }
  function expls(str){ return expl(parse(str)); }

  /* ---- kolik závorek zápis potřebuje navíc oproti napsanému ---- */
  function addedCount(n,acc){
    acc=acc||{n:0};
    if(n.t!=="op") return acc.n;
    if(needBr(n.o,n.a) && !n.a.par) acc.n++;
    if(needBr(n.o,n.b) && !n.b.par) acc.n++;
    if(n.a.t==="op") addedCount(n.a,acc);
    if(n.b.t==="op") addedCount(n.b,acc);
    return acc.n;
  }

  /* ---- hlasité čtení (aria-label) ---- */
  function say(n){
    if(n.t==="num") return (n.s!==undefined?n.s:num(n.v,4));
    if(n.t==="var") return n.n;
    if(n.t==="neg") return "minus "+say(n.a);
    var A=say(n.a), B=say(n.b);
    if(n.a.t==="op") A="("+A+")";
    if(n.b.t==="op") B="("+B+")";
    if(n.o==="/") return A+" lomeno "+B;
    if(n.o==="·") return A+" krát "+B;
    if(n.o==="+") return A+" plus "+B;
    return A+" minus "+B;
  }

  /* ---- stohovaná sazba ---- */
  var PS={"+":1,"−":1,"·":2,"/":9};
  function stk(n,minp,opt){
    opt=opt||{}; minp=minp||0;
    if(n.t==="num") return numTxt(n);
    if(n.t==="var") return esc(n.n);
    if(n.t==="neg"){
      var s="−"+stk(n.a,3,opt);
      return (1<minp) ? "("+s+")" : s;
    }
    if(n.o==="/"){
      var cn = (opt.hl && n.a.t==="op") ? " hl" : "";
      var cd = (opt.hl && n.b.t==="op") ? " hl" : "";
      return '<span class="frac" role="math" aria-label="'+esc(say(n))+'">'+
             '<span class="fn'+cn+'">'+stk(n.a,0,opt)+"</span>"+
             '<span class="fd'+cd+'">'+stk(n.b,0,opt)+"</span></span>";
    }
    var pr=PS[n.o];
    var t=stk(n.a,pr,opt)+" "+n.o+" "+stk(n.b,pr+1,opt);
    return (pr<minp) ? "("+t+")" : t;
  }
  function stks(str,opt){
    try{ return stk(parse(str),0,opt); }
    catch(e){ return esc(str); }
  }

  /* ---- krokování pořadí operací ---- */
  function nextOp(n){
    if(n.t!=="op") return null;
    var L=nextOp(n.a); if(L) return L;
    var R=nextOp(n.b); if(R) return R;
    if(n.a.t==="num" && n.b.t==="num") return n;
    return null;
  }
  function reduceAt(node){
    var v;
    if(node.o==="+") v=node.a.v+node.b.v;
    else if(node.o==="−") v=node.a.v-node.b.v;
    else if(node.o==="·") v=node.a.v*node.b.v;
    else v=node.a.v/node.b.v;
    var par=node.par;
    delete node.o; delete node.a; delete node.b;
    node.t="num"; node.v=v; node.par=par; delete node.s;
    return v;
  }

  /* ---- porovnání dvou výrazů dosazením ---- */
  var POOL=[2,3,5,7,4,9,6,8,10,12];
  function randEnv(names,rnd){
    var e={}, used=[];
    for(var i=0;i<names.length;i++){
      var v;
      do{ v=POOL[Math.floor(rnd()*POOL.length)]; }while(used.indexOf(v)>=0 && used.length<POOL.length);
      used.push(v); e[names[i]]=v;
    }
    return e;
  }
  function equalByNumbers(s1,s2,trials,rnd){
    var n1=parse(s1), n2=parse(s2);
    var names=vlist(n1); vlist(n2,names);
    var rows=[], same=true;
    for(var i=0;i<trials;i++){
      var env=randEnv(names,rnd);
      var a,b;
      try{ a=ev(n1,env); b=ev(n2,env); }catch(e){ continue; }
      var ok = isFinite(a)&&isFinite(b) && Math.abs(a-b) <= 1e-9*Math.max(1,Math.abs(a),Math.abs(b));
      if(!ok) same=false;
      rows.push({env:env, a:a, b:b, ok:ok});
    }
    return {same:same, rows:rows, names:names};
  }

  return {
    parse:parse, ev:ev, evs:evs, vars:vlists, vlist:vlist, clone:clone,
    num:num, esc:esc,
    lin:lin, lins:lins, expl:expl, expls:expls, addedCount:addedCount,
    stk:stk, stks:stks, say:say,
    nextOp:nextOp, reduceAt:reduceAt,
    randEnv:randEnv, equalByNumbers:equalByNumbers
  };
})();
