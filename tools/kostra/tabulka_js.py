# -*- coding: utf-8 -*-
"""tabulka_js.py — motor stránky „Periodická tabulka".

Obsahuje parser vzorců, čtyři počítadla, kreslení tabulky a panel detailu.
Vkládá se do <script> v make_tabulka.py; proměnná DATA je definovaná před ním.
"""

ENGINE = r"""
(function(){
"use strict";
var $=function(s,r){return (r||document).querySelector(s);};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};

var EL=DATA.el, NA=6.02214076e23;
var BYZ={}, BYS={}, AR={};
EL.forEach(function(e){ BYZ[e.z]=e; BYS[e.sym]=e; AR[e.sym]=e.ar; });

var store={
  get:function(k,f){try{var v=localStorage.getItem("tabulka."+k);return v===null?f:JSON.parse(v);}catch(e){return f;}},
  set:function(k,v){try{localStorage.setItem("tabulka."+k,JSON.stringify(v));}catch(e){}}
};

/* ================================================================ formát */
function fmt(n,d){
  if(n===null||n===undefined||typeof n!=="number"||!isFinite(n)) return "—";
  var s=n.toFixed(d===undefined?2:d);
  if(s.indexOf(".")>=0) s=s.replace(/0+$/,"").replace(/\.$/,"");
  return s.replace(".",",");
}
var SUPMAP={"-":"⁻","+":"⁺","0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵",
            "6":"⁶","7":"⁷","8":"⁸","9":"⁹"};
var SUBMAP={"0":"₀","1":"₁","2":"₂","3":"₃","4":"₄","5":"₅","6":"₆","7":"₇","8":"₈","9":"₉"};
function sup(x){return String(x).split("").map(function(c){return SUPMAP[c]||c;}).join("");}
function sub(x){return String(x).split("").map(function(c){return SUBMAP[c]||c;}).join("");}
function sci(n,d){
  if(!isFinite(n)) return "—";
  if(n===0) return "0";
  var e=Math.floor(Math.log10(Math.abs(n)));
  var m=n/Math.pow(10,e);
  if(Math.abs(m)>=9.9995){ m=m/10; e=e+1; }
  return fmt(m,d===undefined?3:d)+"·10"+sup(e);
}
/* číslo na k platných číslic */
function sig(n,k){
  if(n===null||n===undefined||!isFinite(n)) return "—";
  if(n===0) return "0";
  var e=Math.floor(Math.log10(Math.abs(n)));
  var d=Math.max(0,k-1-e);
  return fmt(n,Math.min(d,8));
}
function esc(s){
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
                  .replace(/"/g,"&quot;");
}
function arTxt(e){ return e.arF; }
function arShort(e){ return e.arS; }

/* ================================================================ parser vzorců */
var DIGIT_SUB={"₀":"0","₁":"1","₂":"2","₃":"3","₄":"4","₅":"5","₆":"6","₇":"7","₈":"8","₉":"9"};
var DIGIT_SUP={"⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9",
               "⁺":"+","⁻":"-"};

function normalizeSafe(src){
  var s=String(src||"");
  s=s.replace(/[₀-₉]/g,function(c){return DIGIT_SUB[c];});
  s=s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]/g,function(c){return DIGIT_SUP[c];});
  s=s.replace(/([0-9\)\]\}])\s*[xX]\s*(?=[0-9])/g,"$1.");
  s=s.replace(/[·•∙⋅×\*]/g,".");        /* tečka i křížek jako oddělovač hydrátu */
  s=s.replace(/[–—−]/g,"-");
  s=s.replace(/[（【]/g,"(").replace(/[）】]/g,")");
  s=s.replace(/[ \s]+/g," ");
  return s.trim();
}

var CLOSE={"(":")","[":"]","{":"}"};
function isUp(c){return c>="A"&&c<="Z";}
function isLow(c){return c>="a"&&c<="z";}
function isDig(c){return c>="0"&&c<="9";}

function ParseError(msg){ this.msg=msg; }

/* Rozloží jeden „člen" (bez koeficientu) na počty atomů. */
function parseUnit(s){
  var i=0;
  function unit(closer){
    var acc={};
    while(i<s.length){
      var c=s.charAt(i);
      if(c===" "){ i++; continue; }
      if(c==="("||c==="["||c==="{"){
        var open=c; i++;
        var inner=unit(CLOSE[open]);
        if(s.charAt(i)!==CLOSE[open])
          throw new ParseError("Chybí uzavírací závorka „"+CLOSE[open]+"“.");
        i++;
        var k=num();
        for(var sy in inner) acc[sy]=(acc[sy]||0)+inner[sy]*k;
        continue;
      }
      if(c===")"||c==="]"||c==="}"){
        if(closer&&c===closer) return acc;
        if(closer) throw new ParseError("Závorky se nekříží: otevřená čeká „"+closer+
          "“, ale našel jsem „"+c+"“.");
        throw new ParseError("Nadbytečná uzavírací závorka „"+c+"“.");
      }
      if(isUp(c)){
        var w=c; i++;
        while(i<s.length&&isLow(s.charAt(i))){ w+=s.charAt(i); i++; }
        var symb=null;
        for(var L=w.length;L>=1;L--){ if(AR[w.slice(0,L)]!==undefined){ symb=w.slice(0,L); break; } }
        if(symb===null||symb.length!==w.length)
          throw new ParseError("Neznámá značka prvku „"+w+"“.");
        var n=num();
        acc[symb]=(acc[symb]||0)+n;
        continue;
      }
      if(isDig(c)) throw new ParseError("Číslo „"+c+"“ nemá u čeho stát — počet se píše až za značku.");
      if(isLow(c)){
        var g=c.toUpperCase();
        throw new ParseError("Značky prvků se píší s velkým počátečním písmenem — "+
          "místo „"+c+"“ zkuste „"+g+"“.");
      }
      throw new ParseError("Nerozumím znaku „"+c+"“.");
    }
    if(closer) throw new ParseError("Chybí uzavírací závorka „"+closer+"“.");
    return acc;
  }
  function num(){
    var d="";
    while(i<s.length&&isDig(s.charAt(i))){ d+=s.charAt(i); i++; }
    if(d==="") return 1;
    var v=parseInt(d,10);
    if(v===0) throw new ParseError("Počet atomů nemůže být nula.");
    return v;
  }
  var out=unit(null);
  return out;
}

/* Celý zápis: koeficient, hydráty s tečkou, náboj. */
function parseFormula(src){
  var s=normalizeSafe(src);
  if(!s) return {ok:false,msg:"Zadejte vzorec, například H2SO4."};
  var charge=0, chTxt="";
  var m=s.match(/\^?\s*([0-9]*)\s*([+-])\s*$/);
  if(m&&/[a-zA-Z\)\]\}]/.test(s.slice(0,m.index))){
    var q=m[1]===""?1:parseInt(m[1],10);
    charge=(m[2]==="-"?-1:1)*q;
    chTxt=(q===1?"":String(q))+m[2];
    s=s.slice(0,m.index).replace(/\^$/,"").trim();
  }
  if(!s) return {ok:false,msg:"Ve vzorci zůstal jen náboj."};
  var parts=s.split(".");
  var total={}, order=[], terms=[];
  try{
    for(var p=0;p<parts.length;p++){
      var t=parts[p].trim();
      if(!t) throw new ParseError("Kolem tečky chybí vzorec — hydrát se píše jako CuSO4·5H2O.");
      var coef=1, mm=t.match(/^([0-9]+)\s*(?=[A-Z\(\[\{])/);
      if(mm){ coef=parseInt(mm[1],10); t=t.slice(mm[0].length); }
      if(coef===0) throw new ParseError("Koeficient nemůže být nula.");
      var c=parseUnit(t);
      terms.push({coef:coef,body:t,counts:c});
      for(var sy in c){
        if(total[sy]===undefined){ total[sy]=0; order.push(sy); }
        total[sy]+=c[sy]*coef;
      }
    }
  }catch(err){
    if(err instanceof ParseError) return {ok:false,msg:err.msg};
    throw err;
  }
  if(!order.length) return {ok:false,msg:"Ve vzorci není žádný prvek."};
  /* pořadí zůstává tak, jak prvky stojí ve vzorci — student to tak čte */
  var M=0, rows=[];
  order.forEach(function(sy){
    var n=total[sy], contrib=AR[sy]*n;
    M+=contrib;
    rows.push({sym:sy,n:n,ar:AR[sy],contrib:contrib,el:BYS[sy]});
  });
  rows.forEach(function(r){ r.w=r.contrib/M; });
  return {ok:true,M:M,rows:rows,charge:charge,chTxt:chTxt,terms:terms,
          norm:s,pretty:prettyFormula(src)};
}

/* Hezký zápis: dolní indexy, prostřední tečka, náboj nahoře. */
function prettyFormula(src){
  var s=normalizeSafe(src);
  var chg="";
  var m=s.match(/\^?\s*([0-9]*)\s*([+-])\s*$/);
  if(m&&/[a-zA-Z\)\]\}]/.test(s.slice(0,m.index))){
    chg=sup((m[1]===""?"":m[1])+m[2]);
    s=s.slice(0,m.index).replace(/\^$/,"").trim();
  }
  var out="", prev="";
  for(var i=0;i<s.length;i++){
    var c=s.charAt(i);
    if(c==="."){ out+="·"; prev="."; continue; }
    if(c===" "){ prev=" "; continue; }
    if(isDig(c)){
      var d=c;
      while(i+1<s.length&&isDig(s.charAt(i+1))){ i++; d+=s.charAt(i); }
      var asSub=/[a-zA-Z\)\]\}]/.test(prev);
      out+= asSub ? sub(d) : d;
      prev="0";
      continue;
    }
    out+=c; prev=c;
  }
  return out+chg;
}

/* ================================================================ výpočtový list */
function sheet(id,topic,kind,task,blocks){
  var h='<div class="calcsheet"><div class="cs-head"><span class="cs-id">'+id+
        '</span><span class="cs-topic">'+topic+'</span><span class="cs-kind">'+kind+'</span></div>';
  if(task) h+='<div class="cs-task">'+task+'</div>';
  blocks.forEach(function(b){
    h+='<div class="cs-block'+(b.cls?" "+b.cls:"")+'"><div class="cs-lbl">'+b.lbl+
       '</div><div class="cs-rows">'+b.html+'</div></div>';
  });
  return h+'</div>';
}
function lineWrap(s){ return '<div class="cs-line wrap">'+s+'</div>'; }
function line(s){ return '<div class="cs-line">'+s+'</div>'; }
function hint(s){ return '<div class="cs-hint">'+s+'</div>'; }
function errSheet(topic,msg,tip){
  return '<div class="calcsheet bad"><div class="cs-head"><span class="cs-id">Nejde spočítat</span>'+
    '<span class="cs-topic">'+topic+'</span></div><div class="cs-block"><div class="cs-lbl">Problém</div>'+
    '<div class="cs-rows"><div class="cs-flaw">'+msg+'</div>'+
    (tip?'<div class="cs-hint">'+tip+'</div>':'')+'</div></div></div>';
}

/* ================================================================ 1. molární hmotnost */
var lastParse=null;

function renderMM(res,srcRaw){
  var box=$("#outMM");
  if(!res.ok){ box.innerHTML=errSheet("Molární hmotnost",res.msg,
      "Zvládnu závorky i vnořené (K3[Fe(CN)6]), hydráty s tečkou (CuSO4·5H2O) "+
      "i koeficient před vzorcem (2 H2O)."); return; }
  var f=res.pretty;
  var rozpis=res.rows.map(function(r){
    return '<div class="cs-row"><span class="cs-sym">'+r.sym+'</span>'+
      '<span class="cs-val">'+r.n+' × '+fmt(r.ar,4)+' = <b>'+fmt(r.contrib,4)+'</b></span>'+
      '<span class="cs-note">'+r.el.cz+'</span></div>';
  }).join("");
  var soucet=res.rows.map(function(r){return fmt(r.contrib,3);}).join(" + ");
  var zlomky=res.rows.map(function(r){
    return '<div class="cs-row"><span class="cs-sym">w('+r.sym+')</span>'+
      '<span class="cs-val">'+fmt(r.contrib,3)+' / '+fmt(res.M,3)+' = <b>'+
      fmt(r.w*100,2)+' %</b></span></div>';
  }).join("");
  var kontrola=fmt(res.rows.reduce(function(a,r){return a+r.w*100;},0),2);
  var blocks=[
    {lbl:"Rozpis",html:'<div class="cs-hint">prvek × počet × A<sub>r</sub> = příspěvek k molární hmotnosti</div>'+rozpis},
    {lbl:"Součet",html:line("M = "+soucet)+line("M = <b>"+fmt(res.M,3)+" g·mol⁻¹</b>")},
    {lbl:"Zlomky",html:'<div class="cs-hint">w(X) = m(X) / m(celku) — podíl hmotnosti jednoho prvku</div>'+
      zlomky+hint("Kontrola: součet zlomků je "+kontrola+" %.")},
    {lbl:"Odpověď",cls:"res",html:'<div class="cs-ans">Molární hmotnost látky '+f+' je '+
      '<span class="cs-hi">M = '+fmt(res.M,3)+" g·mol⁻¹</span>."+
      (res.charge?" Zápis nese náboj "+res.chTxt+", hmotnost elektronů se zanedbává.":"")+'</div>'}
  ];
  var bar=res.rows.map(function(r){
    return '<span class="wseg" style="width:'+(r.w*100).toFixed(3)+'%;background:var(--pt-c'+
      (DATA.cati[r.el.cat]+1)+')" title="'+esc(r.el.cz)+" "+fmt(r.w*100,1)+' %"><i>'+
      (r.w>0.07?r.sym:"")+'</i></span>';
  }).join("");
  box.innerHTML=sheet("Úloha","Molární hmotnost ze vzorce","M [g·mol⁻¹]",
      "Vzorec: <b>"+f+"</b>"+(res.terms.length>1?" — zápis má "+res.terms.length+" členy oddělené tečkou.":""),
      blocks)+
    '<div class="wbarwrap"><div class="wbarlbl">Hmotnostní zlomky</div><div class="wbar">'+bar+'</div>'+
    '<div class="wlegend">'+res.rows.map(function(r){
      return '<span><i style="background:var(--pt-c'+(DATA.cati[r.el.cat]+1)+')"></i>'+
        r.sym+' '+fmt(r.w*100,2)+' %</span>';}).join("")+'</div></div>';
}

/* ================================================================ 2. m ↔ n ↔ N */
var mnnDriver="m";
function renderMNN(res){
  var box=$("#outMNN");
  if(!res||!res.ok){
    box.innerHTML=errSheet("Převod m ↔ n ↔ N",
      res?res.msg:"Zadejte vzorec.","Bez vzorce neznám molární hmotnost, ze které se převádí.");
    return;
  }
  var M=res.M;
  var m=parseNum($("#inM").value), n=parseNum($("#inN").value), N=parseNum($("#inNN").value);
  var src=mnnDriver, v=(src==="m"?m:src==="n"?n:N);
  if(v===null||v<=0){
    box.innerHTML='<div class="emptynote">Zadejte hmotnost, látkové množství nebo počet částic — '+
      'zbylé dvě veličiny dopočítám. Molární hmotnost látky '+res.pretty+' je '+fmt(M,3)+' g·mol⁻¹.</div>';
    return;
  }
  if(src==="m"){ n=m/M; N=n*NA; }
  else if(src==="n"){ m=n*M; N=n*NA; }
  else { n=N/NA; m=n*M; }
  $("#inM").value = src==="m" ? $("#inM").value : sig(m,5);
  $("#inN").value = src==="n" ? $("#inN").value : sig(n,5);
  $("#inNN").value = src==="nn" ? $("#inNN").value : sci(N,4);
  var zad=[
    '<div class="cs-row"><span class="cs-sym">M</span><span class="cs-val">'+fmt(M,3)+
      ' g·mol⁻¹</span><span class="cs-note">ze vzorce '+res.pretty+'</span></div>',
    '<div class="cs-row"><span class="cs-sym">N<sub>A</sub></span><span class="cs-val">6,022·10²³ mol⁻¹'+
      '</span><span class="cs-note">Avogadrova konstanta</span></div>'
  ];
  var lbl={m:"m = "+sig(m,5)+" g",n:"n = "+sig(n,5)+" mol",nn:"N = "+sci(N,4)+" částic"};
  zad.unshift('<div class="cs-row"><span class="cs-sym">'+
    (src==="m"?"m":src==="n"?"n":"N")+'</span><span class="cs-val cs-conv">'+
    lbl[src].split("= ")[1]+'</span><span class="cs-note">zadáno</span></div>');
  var kroky;
  if(src==="m"){
    kroky=line("n = m / M = "+sig(m,5)+" / "+fmt(M,3)+" = <b>"+sig(n,4)+" mol</b>")+
          line("N = n · N<sub>A</sub> = "+sig(n,4)+" · 6,022·10²³ = <b>"+sci(N,3)+"</b>");
  } else if(src==="n"){
    kroky=line("m = n · M = "+sig(n,5)+" · "+fmt(M,3)+" = <b>"+sig(m,4)+" g</b>")+
          line("N = n · N<sub>A</sub> = "+sig(n,5)+" · 6,022·10²³ = <b>"+sci(N,3)+"</b>");
  } else {
    kroky=line("n = N / N<sub>A</sub> = "+sci(N,4)+" / 6,022·10²³ = <b>"+sig(n,4)+" mol</b>")+
          line("m = n · M = "+sig(n,4)+" · "+fmt(M,3)+" = <b>"+sig(m,4)+" g</b>");
  }
  box.innerHTML=sheet("Úloha","Převod m ↔ n ↔ N","tři veličiny",
    "Látka <b>"+res.pretty+"</b>, zadaná veličina: "+lbl[src],
    [
      {lbl:"Zadání",html:zad.join("")},
      {lbl:"Vztahy",html:line("n = m / M")+line("N = n · N<sub>A</sub>")+
        '<div class="cs-line units">Jednotky: g / (g·mol⁻¹) = mol; mol · mol⁻¹ = bezrozměrný počet částic.</div>'},
      {lbl:"Dosazení",html:kroky},
      {lbl:"Odpověď",cls:"res",html:'<div class="cs-ans">'+
        'm = <span class="cs-hi">'+sig(m,4)+' g</span>, '+
        'n = <span class="cs-hi">'+sig(n,4)+' mol</span>, '+
        'N = <span class="cs-hi">'+sci(N,3)+'</span> částic.</div>'}
    ]);
}
function parseNum(v){
  var s=String(v||"").trim().replace(/\s/g,"").replace(",",".").replace(/−/g,"-");
  s=s.replace(/·10\^?/,"e").replace(/·10/,"e").replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]/g,function(c){
    return {"⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","⁻":"-"}[c];});
  if(s==="") return null;
  var f=parseFloat(s);
  return isFinite(f)?f:null;
}

/* ================================================================ 3. složení v procentech */
function renderPCT(res){
  var box=$("#outPCT");
  if(!res.ok){ box.innerHTML=errSheet("Složení v procentech",res.msg,""); return; }
  var mv=parseNum($("#inPctM").value);
  var rows=res.rows;
  var kroky=rows.map(function(r){
    return line("w("+r.sym+") = "+r.n+" · "+fmt(r.ar,4)+" / "+fmt(res.M,3)+" = "+
      fmt(r.w,5)+" = <b>"+fmt(r.w*100,2)+" %</b>");
  }).join("");
  var blocks=[
    {lbl:"Vztah",html:line("w(X) = n(X) · A<sub>r</sub>(X) / M")+
      hint("n(X) je počet atomů prvku ve vzorci, M molární hmotnost celé látky.")+
      '<div class="cs-line units">Jednotky: (1 · g·mol⁻¹) / (g·mol⁻¹) = 1, tedy bezrozměrné číslo; '+
      'vynásobením stem dostanete procenta.</div>'},
    {lbl:"Dosazení",html:kroky},
    {lbl:"Kontrola",cls:"chk",html:'<div class="cs-chk">Součet všech zlomků je '+
      fmt(rows.reduce(function(a,r){return a+r.w*100;},0),2)+' %. '+
      'Kdyby vyšlo výrazně jinak než 100 %, je chyba v rozpisu.</div>'}
  ];
  if(mv!==null&&mv>0){
    blocks.splice(2,0,{lbl:"Na vzorek",html:rows.map(function(r){
      return line("m("+r.sym+") = "+fmt(mv,4)+" g · "+fmt(r.w,5)+" = <b>"+sig(mv*r.w,4)+" g</b>");
    }).join("")+hint("Hmotnost jednotlivých prvků ve vzorku o hmotnosti "+fmt(mv,4)+" g.")});
  }
  blocks.push({lbl:"Odpověď",cls:"res",html:'<div class="cs-ans">'+res.pretty+' obsahuje '+
    rows.map(function(r){return r.sym+" "+fmt(r.w*100,2)+" %";}).join(", ")+'.</div>'});
  box.innerHTML=sheet("Úloha","Hmotnostní složení sloučeniny","w [%]",
    "Vzorec: <b>"+res.pretty+"</b>, M = "+fmt(res.M,3)+" g·mol⁻¹",blocks);
}

/* ================================================================ 4. empirický vzorec */
function parseComposition(src){
  /* pozor: čárka je desetinná, oddělovačem dvojic je jen tehdy, když za ní stojí značka */
  var s=String(src||"").replace(/[;\n\t]+/g," ")
                       .replace(/,(?=\s*[A-Za-z])/g," ")
                       .replace(/,\s*$/,"")
                       .replace(/[=:%]/g," ").trim();
  if(!s) return {ok:false,msg:"Zadejte prvky a jejich procenta, například: C 40 H 6,7 O 53,3"};
  var toks=s.split(/\s+/), out=[], i=0;
  while(i<toks.length){
    var sy=toks[i];
    if(AR[sy]===undefined){
      var fix=sy.charAt(0).toUpperCase()+sy.slice(1).toLowerCase();
      if(AR[fix]!==undefined) sy=fix;
      else return {ok:false,msg:"Neznámá značka prvku „"+esc(toks[i])+"“."};
    }
    var v=parseNum(toks[i+1]);
    if(v===null) return {ok:false,msg:"U prvku "+sy+" chybí číslo (procenta nebo hmotnost)."};
    if(v<=0) return {ok:false,msg:"U prvku "+sy+" musí být kladné číslo."};
    out.push({sym:sy,val:v});
    i+=2;
  }
  if(out.length<2) return {ok:false,msg:"Zadejte aspoň dva prvky."};
  return {ok:true,items:out};
}
function renderEMP(){
  var box=$("#outEMP");
  var p=parseComposition($("#inComp").value);
  if(!p.ok){ box.innerHTML=errSheet("Empirický vzorec",p.msg,
    "Formát: značka a číslo, dvojice oddělené mezerou nebo středníkem. "+
    "Zadat můžete procenta i hmotnosti v gramech."); return; }
  var items=p.items, sum=items.reduce(function(a,x){return a+x.val;},0);
  var jePct=Math.abs(sum-100)<1.5;
  items.forEach(function(x){ x.n=x.val/AR[x.sym]; });
  var minN=Math.min.apply(null,items.map(function(x){return x.n;}));
  items.forEach(function(x){ x.r=x.n/minN; });
  var best=null;
  for(var k=1;k<=8;k++){
    var dev=0;
    items.forEach(function(x){ dev=Math.max(dev,Math.abs(x.r*k-Math.round(x.r*k))); });
    if(best===null||dev<best.dev-1e-9) best={k:k,dev:dev};
    if(dev<0.06) { best={k:k,dev:dev}; break; }
  }
  var k=best.k;
  items.forEach(function(x){ x.idx=Math.max(1,Math.round(x.r*k)); });
  var formula=items.map(function(x){return x.sym+(x.idx>1?sub(x.idx):"");}).join("");
  var Memp=items.reduce(function(a,x){return a+AR[x.sym]*x.idx;},0);
  var zad=items.map(function(x){
    return '<div class="cs-row"><span class="cs-sym">'+(jePct?"w(":"m(")+x.sym+')</span>'+
      '<span class="cs-val">'+fmt(x.val,4)+(jePct?" %":" g")+'</span>'+
      '<span class="cs-note">A<sub>r</sub> = '+fmt(AR[x.sym],4)+'</span></div>';
  }).join("");
  var krok1=items.map(function(x){
    return line("n("+x.sym+") = "+fmt(x.val,4)+" / "+fmt(AR[x.sym],4)+" = <b>"+sig(x.n,4)+"</b>");
  }).join("");
  var krok2=items.map(function(x){
    return line("n("+x.sym+") / n<sub>min</sub> = "+sig(x.n,4)+" / "+sig(minN,4)+" = <b>"+fmt(x.r,3)+"</b>");
  }).join("");
  var krok3=k>1
    ? line("Poměr "+items.map(function(x){return fmt(x.r,3);}).join(" : ")+
           " · "+k+" = <b>"+items.map(function(x){return x.idx;}).join(" : ")+"</b>")+
      hint("Poměr nebyl celočíselný, proto se všechna čísla vynásobila "+k+".")
    : line("Poměr "+items.map(function(x){return fmt(x.r,3);}).join(" : ")+
           " je už celočíselný: <b>"+items.map(function(x){return x.idx;}).join(" : ")+"</b>");
  var pozn=best.dev>0.12
    ? '<div class="cs-flaw">Poměr se od celých čísel liší o '+fmt(best.dev,2)+
      ' — zkontrolujte zadaná procenta, výsledek je jen orientační.</div>' : "";
  box.innerHTML=sheet("Úloha","Ze složení na empirický vzorec","nejjednodušší poměr",
    (jePct?"Zadaná procenta dávají součet "+fmt(sum,2)+" %.":
           "Součet zadaných hodnot je "+fmt(sum,3)+" — beru je jako hmotnosti v gramech."),
    [
      {lbl:"Zadání",html:zad},
      {lbl:"Vztah",html:line("n(X) = m(X) / A<sub>r</sub>(X)")+
        hint("Ze stejné hmotnosti různých prvků vyjde různý počet molů — proto se procenta "+
             "musí nejdřív přepočítat na látková množství.")},
      {lbl:"Molové poměry",html:krok1},
      {lbl:"Dělení",html:krok2},
      {lbl:"Celá čísla",html:krok3+pozn},
      {lbl:"Odpověď",cls:"res",html:'<div class="cs-ans">Empirický vzorec je '+
        '<span class="cs-hi">'+formula+'</span>, jeho molární hmotnost '+fmt(Memp,3)+
        ' g·mol⁻¹. Molekulový vzorec je jeho celočíselný násobek — určíte ho, '+
        'když znáte skutečnou molární hmotnost.</div>'}
    ]);
}

/* ================================================================ přepočet kalkulaček */
function recalc(){
  var raw=$("#fInput").value;
  store.set("formula",raw);
  var res=parseFormula(raw);
  lastParse=res;
  var badge=$("#fBadge");
  if(res.ok){
    badge.textContent="M = "+fmt(res.M,3)+" g·mol⁻¹";
    badge.className="fbadge ok";
  } else {
    badge.textContent=raw.trim()?"vzorec zatím nedává smysl":"zadejte vzorec";
    badge.className="fbadge";
  }
  renderMM(res,raw);
  renderMNN(res);
  renderPCT(res);
}

/* ================================================================ tabulka */
var MODES=[
  {id:"cat",  name:"Kategorie prvku"},
  {id:"blk",  name:"Blok s/p/d/f"},
  {id:"phase",name:"Skupenství (25 °C)"},
  {id:"en",   name:"Elektronegativita"},
  {id:"rad",  name:"Atomový poloměr"},
  {id:"ie",   name:"Ionizační energie"}
];
var NUMMODE={
  en:{lbl:"Elektronegativita (Pauling)",unit:"",dec:2},
  rad:{lbl:"Atomový poloměr",unit:" pm",dec:0},
  ie:{lbl:"1. ionizační energie",unit:" kJ·mol⁻¹",dec:0}
};
var RANGE={};
["en","rad","ie"].forEach(function(k){
  var v=EL.map(function(e){return e[k];}).filter(function(x){return x!==null;});
  RANGE[k]=[Math.min.apply(null,v),Math.max.apply(null,v)];
});
var BLKC={s:1,p:7,d:3,f:5};
var PHC={"pevné":2,"kapalné":7,"plyn":10,"neznámé":0};
var mode=store.get("mode","cat");
if(MODES.filter(function(m){return m.id===mode;}).length===0) mode="cat";

function colorOf(e){
  if(mode==="cat") return "var(--pt-c"+(DATA.cati[e.cat]+1)+")";
  if(mode==="blk") return "var(--pt-c"+BLKC[e.blk]+")";
  if(mode==="phase") return PHC[e.phase] ? "var(--pt-c"+PHC[e.phase]+")" : "var(--pt-na)";
  var v=e[mode];
  if(v===null||v===undefined) return "var(--pt-na)";
  var r=RANGE[mode], t=(v-r[0])/(r[1]-r[0]);
  t=Math.max(0,Math.min(1,t));
  return "color-mix(in oklab, var(--sc-hi) "+Math.round(t*100)+"%, var(--sc-lo))";
}
function paint(){
  EL.forEach(function(e){
    var b=document.getElementById("pt"+e.z);
    if(b) b.style.background=colorOf(e);
  });
  legend();
}
function legend(){
  var box=$("#ptLegend"), h="";
  if(mode==="cat"){
    h=DATA.cats.map(function(c,i){
      return '<span class="lgc"><i style="background:var(--pt-c'+(i+1)+')"></i>'+c+'</span>';
    }).join("");
  } else if(mode==="blk"){
    h=[["s","blok s — zaplňuje se orbital s (skupiny 1 a 2 a helium)"],
       ["p","blok p — orbitaly p (skupiny 13–18)"],
       ["d","blok d — přechodné kovy (skupiny 3–12)"],
       ["f","blok f — lanthanoidy a aktinoidy"]].map(function(x){
      return '<span class="lgc"><i style="background:var(--pt-c'+BLKC[x[0]]+')"></i>'+x[1]+'</span>';
    }).join("");
  } else if(mode==="phase"){
    h=[["pevné","pevné látky"],["kapalné","kapaliny (jen brom a rtuť)"],
       ["plyn","plyny"],["neznámé","neznámé — příliš krátký poločas"]].map(function(x){
      return '<span class="lgc"><i style="background:'+(PHC[x[0]]?"var(--pt-c"+PHC[x[0]]+")":"var(--pt-na)")+
        '"></i>'+x[1]+'</span>';
    }).join("");
  } else {
    var m=NUMMODE[mode], r=RANGE[mode];
    h='<span class="lgscale"><b>'+m.lbl+'</b>'+
      '<span class="lgbar"></span>'+
      '<span class="lgends"><span>'+fmt(r[0],m.dec)+m.unit+'</span><span>'+
      fmt(r[1],m.dec)+m.unit+'</span></span></span>'+
      '<span class="lgc"><i style="background:var(--pt-na)"></i>hodnota není tabelovaná</span>';
  }
  box.innerHTML=h;
}

/* ---------------- stavba mřížky ---------------- */
var CELLS={};      /* "r,c" -> z */
var POS={};        /* z -> [r,c] */
function buildTable(){
  var h="";
  for(var g=1;g<=18;g++)
    h+='<span class="pthead" style="grid-column:'+(g+1)+';grid-row:1">'+g+'</span>';
  for(var p=1;p<=7;p++)
    h+='<span class="ptside" style="grid-row:'+(p+1)+';grid-column:1">'+p+'</span>';
  EL.forEach(function(e){
    var r,c;
    if(e.grp===null){
      var base=(e.z<=71)?57:89;
      r=(e.z<=71)?10:11;
      c=4+(e.z-base);
    } else { r=e.per+1; c=e.grp+1; }
    CELLS[r+","+c]=e.z; POS[e.z]=[r,c];
    h+='<button class="ptc'+(e.grp===null?(e.z<=71?" fb fb1":" fb fb2"):"")+
       '" type="button" id="pt'+e.z+'" data-z="'+e.z+'" tabindex="-1" '+
       'style="grid-row:'+r+';grid-column:'+c+'" aria-label="'+esc(e.cz+", značka "+e.sym+
       ", protonové číslo "+e.z)+'">'+
       '<span class="pz">'+e.z+'</span><span class="ps">'+e.sym+'</span>'+
       '<span class="pn">'+esc(e.cz)+'</span><span class="pa">'+arShort(e)+'</span></button>';
  });
  h+='<button class="ptc ph" type="button" id="phLa" data-jump="10" style="grid-row:7;grid-column:4" '+
     'aria-label="Lanthanoidy, prvky 57 až 71, řádek pod tabulkou">'+
     '<span class="ps">57–71</span><span class="pn">La–Lu</span><span class="pa">lanthanoidy</span></button>';
  h+='<button class="ptc ph" type="button" id="phAc" data-jump="11" style="grid-row:8;grid-column:4" '+
     'aria-label="Aktinoidy, prvky 89 až 103, řádek pod tabulkou">'+
     '<span class="ps">89–103</span><span class="pn">Ac–Lr</span><span class="pa">aktinoidy</span></button>';
  h+='<span class="ptfside" style="grid-row:10;grid-column:1">6</span>';
  h+='<span class="ptfside" style="grid-row:11;grid-column:1">7</span>';
  $("#pt").innerHTML=h;
  CELLS["7,4"]=-1; CELLS["8,4"]=-2;
}

/* ---------------- hledání ---------------- */
function norm(s){
  return String(s).toLowerCase()
    .replace(/[áàâä]/g,"a").replace(/[čç]/g,"c").replace(/ď/g,"d")
    .replace(/[éěêë]/g,"e").replace(/[íî]/g,"i").replace(/ň/g,"n")
    .replace(/[óôö]/g,"o").replace(/ř/g,"r").replace(/š/g,"s").replace(/ť/g,"t")
    .replace(/[úůû]/g,"u").replace(/[ýÿ]/g,"y").replace(/ž/g,"z");
}
function search(){
  var q=$("#ptSearch").value.trim();
  store.set("q",q);
  var wrap=$("#pt"), n=0, only=null;
  if(q) clearHi();
  if(!q){
    wrap.classList.remove("searching");
    $$(".ptc.hit").forEach(function(b){b.classList.remove("hit");});
    $("#ptFound").textContent="";
    return;
  }
  var nq=norm(q);
  wrap.classList.add("searching");
  EL.forEach(function(e){
    var b=document.getElementById("pt"+e.z);
    var hit = norm(e.sym)===nq || norm(e.sym).indexOf(nq)===0 ||
              norm(e.cz).indexOf(nq)>=0 || String(e.z)===q;
    b.classList.toggle("hit",hit);
    if(hit){ n++; only=e; }
  });
  $("#ptFound").textContent = n===0 ? "Nic nenalezeno — zkuste značku, český název nebo protonové číslo."
    : n===1 ? "Nalezen 1 prvek: "+only.cz+"." : "Nalezeno "+n+" prvků.";
}

/* ---------------- zvýraznění z výkladu ---------------- */
function hiMatcher(spec){
  var p=spec.split(":"), k=p[0], v=p[1]||"";
  if(k==="per")  return function(e){return e.per===+v;};
  if(k==="grp")  { var gs=v.split(",").map(Number);
                   return function(e){return e.grp!==null&&gs.indexOf(e.grp)>=0;}; }
  if(k==="blk")  { var bs=v.split(",");
                   return function(e){return bs.indexOf(e.blk)>=0;}; }
  if(k==="cat")  { var cs=v.split("|");
                   return function(e){return cs.indexOf(e.cat)>=0;}; }
  if(k==="set")  { var ss=v.split(",");
                   return function(e){return ss.indexOf(e.sym)>=0;}; }
  if(k==="main") return function(e){return e.blk==="s"||e.blk==="p";};
  if(k==="sub")  return function(e){return e.blk==="d";};
  return function(){return false;};
}
function plural(n){ return n===1?"prvek":(n>=2&&n<=4)?"prvky":"prvků"; }
function clearHi(){
  $$(".ptc.hi").forEach(function(b){b.classList.remove("hi");});
  $("#pt").classList.remove("highlighting");
  $("#hiNote").hidden=true;
  $$("[data-hi]").forEach(function(b){b.setAttribute("aria-pressed","false");});
}
function doHi(spec,label,btn){
  if(btn&&btn.getAttribute("aria-pressed")==="true"){ clearHi(); return; }
  var wasSearch=$("#ptSearch").value;
  if(wasSearch){ $("#ptSearch").value=""; search(); }
  clearHi();
  var f=hiMatcher(spec), n=0, first=null;
  EL.forEach(function(e){
    var b=document.getElementById("pt"+e.z);
    if(f(e)){ b.classList.add("hi"); n++; if(!first) first=b; }
  });
  if(f(BYZ[57])) $("#phLa").classList.add("hi");
  if(f(BYZ[89])) $("#phAc").classList.add("hi");
  $("#pt").classList.add("highlighting");
  if(btn) btn.setAttribute("aria-pressed","true");
  $("#hiNote").hidden=false;
  $("#hiLabel").innerHTML="V tabulce zvýrazněno: <b>"+label+"</b> — "+n+" "+plural(n)+".";
  /* vodorovně doprostřed na první zvýrazněný prvek, svisle na mřížku */
  var sc=$(".ptscroll");
  if(first&&sc.clientWidth>0){
    sc.scrollLeft += first.getBoundingClientRect().left - sc.getBoundingClientRect().left
                     - sc.clientWidth/2 + first.offsetWidth/2;
  }
  var sec=$("#ptSec");
  if(sec) sec.scrollIntoView({behavior:"smooth",block:"start"});
}

/* ---------------- detail ---------------- */
var curZ=null;
function shellArt(e){
  /* Popisky se střídají nahoře a dole, jinak by se u sedmi slupek překrývaly. */
  var sh=e.shells, R=90, n=sh.length, out="";
  var names="KLMNOPQ";
  for(var i=0;i<n;i++){
    var r=24+(R-24)*(n===1?1:(i+1)/n);
    out+='<circle cx="100" cy="100" r="'+r.toFixed(1)+'" fill="none" stroke="var(--line-strong)" '+
         'stroke-width="1"/>';
    var up=(i%2===0);
    var y=up ? (100-r+3.6) : (100+r+3.2);
    out+='<rect x="86" y="'+(y-8.2).toFixed(1)+'" width="28" height="11" rx="3" '+
         'fill="var(--surface)" opacity="0.92"/>';
    out+='<text x="100" y="'+y.toFixed(1)+'" text-anchor="middle" '+
         'font-family="var(--f-mono)" font-size="9.5" fill="var(--ink-2)">'+
         names.charAt(i)+' '+sh[i]+'</text>';
  }
  out+='<circle cx="100" cy="100" r="19" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.4"/>';
  out+='<text x="100" y="104" text-anchor="middle" font-family="var(--f-mono)" font-size="13" '+
       'font-weight="600" fill="var(--accent)">+'+e.z+'</text>';
  return '<svg viewBox="0 0 200 200" role="img" aria-label="Schéma obsazení elektronových slupek: '+
         sh.map(function(v,i){return names.charAt(i)+" "+v;}).join(", ")+'">'+out+'</svg>';
}
function row(k,v,note){
  if(v===null||v===undefined||v==="") v="—";
  return '<div class="drow"><span class="dk">'+k+'</span><span class="dv">'+v+
    (note?' <em>'+note+'</em>':'')+'</span></div>';
}
function cfgPretty(c){
  return c.replace(/([spdf])(\d+)/g,function(_,l,d){return l+sup(d);})
          .replace(/\[([A-Za-z]+)\]/g,"[$1]");
}
function openDetail(z){
  var e=BYZ[z]; if(!e) return;
  curZ=z; store.set("z",z);
  $$(".ptc.sel").forEach(function(b){b.classList.remove("sel");});
  var btn=document.getElementById("pt"+z);
  if(btn){ btn.classList.add("sel"); }
  $$(".ptc").forEach(function(b){b.tabIndex=-1;});
  if(btn) btn.tabIndex=0;
  var d=$("#detail");
  var dens = e.dens===null ? "—"
    : (e.phase==="plyn" ? fmt(e.dens,4)+" g·dm⁻³" : fmt(e.dens,3)+" g·cm⁻³");
  var densNote = e.phase==="plyn" ? "při 0 °C a 101,3 kPa" : "";
  var mp = e.mp===null?"—":fmt(e.mp,2)+" °C";
  var bp = e.bp===null?"—":fmt(e.bp,2)+" °C";
  var shellTxt=e.shells.map(function(n,i){return "KLMNOPQ".charAt(i)+" "+n;}).join(" · ");
  var h='<div class="dhead" style="background:'+
    "var(--pt-c"+(DATA.cati[e.cat]+1)+')">'+
    '<div class="dsym"><span class="dz">'+e.z+'</span><b>'+e.sym+'</b>'+
    '<span class="dar">'+arTxt(e)+'</span></div>'+
    '<div class="dname"><h3>'+esc(e.cz)+'</h3><span>'+esc(e.cat)+'</span></div>'+
    '<button class="dclose" type="button" id="dClose" aria-label="Zavřít detail prvku">✕</button></div>';
  h+='<div class="dbody">';
  h+='<p class="dnote">'+esc(e.note)+'</p>';
  h+='<div class="dgrp"><h4>Zařazení</h4>'+
     row("Protonové číslo","<b>"+e.z+"</b>")+
     row("Relativní atomová hmotnost",arTxt(e),e.unst?"nukleonové číslo nejstabilnějšího nuklidu":"")+
     row("Perioda",e.per)+
     row("Skupina",e.grp===null?(e.cat==="lanthanoid"?"lanthanoidy (3. skupina)":"aktinoidy (3. skupina)"):e.grp)+
     row("Blok",e.blk)+
     row("Kategorie",esc(e.cat))+'</div>';
  h+='<div class="dgrp"><h4>Elektronový obal</h4>'+
     row("Konfigurace (zkrácená)",'<span class="mono">'+cfgPretty(e.cfg)+'</span>')+
     row("Konfigurace (úplná)",'<span class="mono">'+cfgPretty(e.cfgFull)+'</span>')+
     row("Obsazení slupek",'<span class="mono">'+shellTxt+'</span>')+
     '<div class="dart">'+shellArt(e)+'</div></div>';
  h+='<div class="dgrp"><h4>Fyzikální vlastnosti</h4>'+
     row("Skupenství při 25 °C",esc(e.phase))+
     row("Teplota tání",mp)+
     row("Teplota varu",bp)+
     row("Hustota",dens,densNote)+
     row("Atomový poloměr",e.rad===null?"—":e.rad+" pm","empirický")+'</div>';
  h+='<div class="dgrp"><h4>Chemické vlastnosti</h4>'+
     row("Elektronegativita",e.en===null?"—":fmt(e.en,2),"Paulingova stupnice")+
     row("1. ionizační energie",e.ie===null?"—":fmt(e.ie,1)+" kJ·mol⁻¹")+
     row("Elektronová afinita",e.ea===null?"—":fmt(e.ea,1)+" kJ·mol⁻¹")+
     row("Oxidační čísla",esc(e.ox))+'</div>';
  h+='<div class="dgrp"><h4>Objev</h4>'+
     row("Rok",esc(e.yr))+row("Kdo",esc(e.who))+'</div>';
  h+='<div class="dacts"><button class="btn btn-sm" type="button" id="dInsert">Vložit do vzorce</button>'+
     '<button class="btn btn-sm" type="button" id="dPrev">← předchozí</button>'+
     '<button class="btn btn-sm" type="button" id="dNext">další →</button></div>';
  h+='</div>';
  d.innerHTML=h;
  d.hidden=false;
  $("#dScrim").hidden=false;
  document.body.classList.add("has-detail");
  $("#dClose").addEventListener("click",function(){ closeDetail(); });
  $("#dInsert").addEventListener("click",function(){
    var f=$("#fInput"); f.value=f.value+e.sym; recalc(); setTool("mm");
    f.focus(); toast("Do vzorce přibyla značka "+e.sym+".");
  });
  $("#dPrev").addEventListener("click",function(){ openDetail(z>1?z-1:118); focusTile(); });
  $("#dNext").addEventListener("click",function(){ openDetail(z<118?z+1:1); focusTile(); });
  $("#lastEl").textContent=e.cz;
  $("#lastWrap").hidden=false;
}
function focusTile(){ var b=document.getElementById("pt"+curZ); if(b) b.focus(); }
function closeDetail(noFocus){
  var d=$("#detail");
  if(d.hidden) return;
  d.hidden=true; d.innerHTML="";
  $("#dScrim").hidden=true;
  document.body.classList.remove("has-detail");
  if(!noFocus) focusTile();
}

/* ---------------- toast ---------------- */
var toastT=null;
function toast(msg){
  var t=$("#toast"); t.textContent=msg; t.classList.add("on");
  if(toastT) clearTimeout(toastT);
  toastT=setTimeout(function(){ t.classList.remove("on"); },2200);
}

/* ---------------- klávesnice ---------------- */
function move(dr,dc){
  if(curZ===null) { openDetail(1); focusTile(); return; }
  var p=POS[curZ]; if(!p) return;
  var r=p[0], c=p[1];
  for(var step=1;step<=20;step++){
    var nr=r+dr*step, nc=c+dc*step;
    if(nr<2||nr>11||nc<2||nc>19) break;
    var z=CELLS[nr+","+nc];
    if(z&&z>0){ openDetail(z); focusTile(); return; }
  }
}

/* ---------------- přepínače ---------------- */
function setMode(m){
  mode=m; store.set("mode",m);
  $$("#ptModes button").forEach(function(b){
    b.setAttribute("aria-pressed",b.dataset.mode===m?"true":"false");
  });
  paint();
}
function setTool(t){
  $$("#calcTabs button").forEach(function(b){
    b.setAttribute("aria-pressed",b.dataset.tool===t?"true":"false");
  });
  ["mm","mnn","pct","emp"].forEach(function(k){
    $("#pane_"+k).hidden = (k!==t);
  });
  $("#fRow").hidden = (t==="emp");
  store.set("tool",t);
}

/* ---------------- přepínač pohledů ----------------
   Po otevření stránky se ukazuje vždycky tabulka. Výjimkou je jen kotva
   v adrese (#pocitadlo) — o tu si čtenář výslovně řekl odkazem.
   Zvolený pohled se schválně NEukládá do localStorage. */
function setView(v,updateHash){
  if(v!=="pocitadlo") v="tabulka";
  $$(".vtile").forEach(function(b){
    var on=(b.dataset.view===v);
    b.setAttribute("aria-selected",on?"true":"false");
    b.tabIndex=on?0:-1;
  });
  $("#viewTabulka").hidden=(v!=="tabulka");
  $("#viewPocitadlo").hidden=(v!=="pocitadlo");
  if(v!=="tabulka") closeDetail(true);
  if(updateHash){
    try{ history.replaceState(null,"","#"+v); }catch(e){}
  }
}

/* ================================================================ start */
buildTable();
setMode(mode);

$$("#ptModes button").forEach(function(b){
  b.addEventListener("click",function(){ setMode(b.dataset.mode); });
});
$("#pt").addEventListener("click",function(ev){
  var b=ev.target.closest?ev.target.closest(".ptc"):null;
  if(!b) return;
  if(b.dataset.jump){
    var lan=b.dataset.jump==="10";
    var first=document.getElementById(lan?"pt57":"pt89");
    if(first){ first.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"}); }
    var cls=lan?"flashf1":"flashf2";
    $("#pt").classList.add(cls);
    setTimeout(function(){ $("#pt").classList.remove(cls); },1500);
    openDetail(lan?57:89);
    return;
  }
  openDetail(+b.dataset.z);
});
$("#pt").addEventListener("keydown",function(ev){
  var k=ev.key;
  if(k==="ArrowRight"){ ev.preventDefault(); move(0,1); }
  else if(k==="ArrowLeft"){ ev.preventDefault(); move(0,-1); }
  else if(k==="ArrowDown"){ ev.preventDefault(); move(1,0); }
  else if(k==="ArrowUp"){ ev.preventDefault(); move(-1,0); }
  else if(k==="Home"){ ev.preventDefault(); openDetail(1); focusTile(); }
  else if(k==="End"){ ev.preventDefault(); openDetail(118); focusTile(); }
});
document.addEventListener("keydown",function(ev){
  if(ev.key!=="Escape") return;
  if(!$("#detail").hidden){ closeDetail(); }
  else if(!$("#hiNote").hidden){ clearHi(); }
});
/* klepnutí mimo panel ho zavře. Výjimkou jsou místa, která panel samy otevírají —
   mřížka a odkaz na naposledy prohlížený prvek; ty jen přepnou obsah panelu. */
document.addEventListener("click",function(ev){
  if($("#detail").hidden) return;
  var t=ev.target;
  if(!t||!t.closest) return;
  if($("#detail").contains(t)) return;
  if(t.closest("#pt")||t.closest("#lastBtn")) return;
  closeDetail(true);
});
$("#dScrim").addEventListener("click",function(){ closeDetail(true); });
$("#ptSearch").addEventListener("input",search);
$("#ptClear").addEventListener("click",function(){
  $("#ptSearch").value=""; search(); $("#ptSearch").focus();
});
$("#hiClear").addEventListener("click",clearHi);
$$("[data-hi]").forEach(function(b){
  b.addEventListener("click",function(){ doHi(b.dataset.hi,b.dataset.hl||b.textContent,b); });
});
$$("[data-showmode]").forEach(function(b){
  b.addEventListener("click",function(){
    setMode(b.dataset.showmode);
    var sec=$("#ptSec"); if(sec) sec.scrollIntoView({behavior:"smooth",block:"start"});
  });
});

/* ---- přepínač pohledů ---- */
var vtiles=$$(".vtile");
vtiles.forEach(function(b,i){
  b.addEventListener("click",function(){ setView(b.dataset.view,true); });
  b.addEventListener("keydown",function(ev){
    if(ev.key!=="ArrowRight"&&ev.key!=="ArrowLeft") return;
    ev.preventDefault();
    var j=(i+(ev.key==="ArrowRight"?1:vtiles.length-1))%vtiles.length;
    vtiles[j].focus(); setView(vtiles[j].dataset.view,true);
  });
});
window.addEventListener("hashchange",function(){
  setView(location.hash==="#pocitadlo"?"pocitadlo":"tabulka",false);
});
$("#lastBtn").addEventListener("click",function(){
  var z=store.get("z",null);
  if(z){ openDetail(+z); document.getElementById("pt"+z).scrollIntoView(
    {behavior:"smooth",block:"nearest",inline:"center"}); }
});

$$("#calcTabs button").forEach(function(b){
  b.addEventListener("click",function(){ setTool(b.dataset.tool); });
});
$("#fInput").addEventListener("input",recalc);
$$("#fChips button").forEach(function(b){
  b.addEventListener("click",function(){
    $("#fInput").value=b.dataset.f; recalc(); $("#fInput").focus();
  });
});
["inM","inN","inNN"].forEach(function(id){
  $("#"+id).addEventListener("input",function(){
    mnnDriver = id==="inM"?"m":id==="inN"?"n":"nn";
    renderMNN(lastParse);
  });
});
$("#inPctM").addEventListener("input",function(){ if(lastParse) renderPCT(lastParse); });
$("#inComp").addEventListener("input",renderEMP);
$$("#cChips button").forEach(function(b){
  b.addEventListener("click",function(){
    $("#inComp").value=b.dataset.c; renderEMP(); $("#inComp").focus();
  });
});

/* obnovení posledního stavu */
$("#fInput").value=store.get("formula","H2SO4");
$("#inComp").value=store.get("comp","C 40,0  H 6,7  O 53,3");
$("#inComp").addEventListener("input",function(){ store.set("comp",$("#inComp").value); });
$("#ptSearch").value=store.get("q","");
setTool(store.get("tool","mm"));
recalc();
renderEMP();
search();
var lz=store.get("z",null);
if(lz&&BYZ[lz]){ $("#lastEl").textContent=BYZ[lz].cz; $("#lastWrap").hidden=false; }
var firstBtn=document.getElementById("pt1"); if(firstBtn) firstBtn.tabIndex=0;
setView(location.hash==="#pocitadlo"?"pocitadlo":"tabulka",false);
})();
"""
