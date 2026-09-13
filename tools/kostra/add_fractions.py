# -*- coding: utf-8 -*-
"""add_fractions.py — vykreslí dělení ve výpočtových listech jako skutečné
vícepatrové zlomky. Vkládá se do hotového jak-pocitat/index.html, je idempotentní.

    python add_fractions.py            # vloží / aktualizuje
"""
import io, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

TARGET = r"C:\Claude Code\Claude Code\Doučovanie\jak-pocitat\index.html"
MARK = "FRAC-RENDER"

CSS = """
/* ---- %s: dělení jako skutečný zlomek ---- */
.frac{display:inline-flex;flex-direction:column;align-items:center;justify-content:center;
  vertical-align:middle;margin:0 .22em;line-height:1.2;text-align:center}
.frac > .fn{padding:0 .4em .12em}
.frac > .fd{padding:.14em .4em 0;border-top:1.5px solid currentColor}
.frac .frac{font-size:.94em;margin:0 .14em}
.cs-line,.eq,.eqline{line-height:1.9}
.readout .v.eqline{line-height:1.5;display:block}
.eq .frac{line-height:1.15;font-size:1.02em}
.eq .frac > .fd{border-top-width:1.5px}
.cs-line .frac{line-height:1.15}
@media print{ .frac > .fd{border-top:1.5px solid #000} }
""" % MARK

JS = r"""
/* %s — z textu „a / b“ udělá stohovaný zlomek. Bezpečné: přeskočí vše,
   co vypadá jako věta, a dělítko pozná jen podle mezer kolem lomítka. */
(function(){
  "use strict";
  var SKIP=/[„“]|kde |protože|proto |platn|⟺|⇔/i;
  /* krátký popisek před dvojtečkou (např. „jednotky:“) se nechá být a převádí se až zbytek */
  var PREFIX=/^(\s*(?:<[^>]+>\s*)*[^<:]{1,28}:(?:\s|&nbsp;)+)/;
  /* koncová značka ✓ / × a případná krátká poznámka za ní */
  var SUFFIX=/((?:\s|&nbsp;)*[✓×](?:[^<]{0,40})?(?:<[^>]+>)*\s*)$/;

  function tokenize(html){
    var t=[],i=0,n=html.length,buf="";
    function flush(){ if(buf){t.push({k:"a",v:buf});buf="";} }
    while(i<n){
      var ch=html[i];
      if(ch==="<"){ var j=html.indexOf(">",i); if(j<0){buf+=ch;i++;continue;}
        buf+=html.slice(i,j+1); i=j+1; continue; }
      if(ch==="("){
        /* závorka těsně za znakem patří k atomu: n(Fe), M(CaCO₃), ln(x), √(x) */
        if(buf&&!/[\s ]$/.test(buf)){
          var d=0,j=i;
          for(;j<n;j++){ if(html[j]==="(")d++; else if(html[j]===")"){d--; if(!d){j++;break;}} }
          buf+=html.slice(i,j); i=j; continue;
        }
        flush(); t.push({k:"("}); i++; continue; }
      if(ch===")"){ flush(); t.push({k:")"}); i++; continue; }
      if(ch===" "||ch==="\u00a0"){
        /* operátor je jen ten, kolem kterého jsou mezery */
        var m=/^[\s\u00a0]+([\/·*])[\s\u00a0]+/.exec(html.slice(i));
        if(m){ flush(); t.push({k:"o",v:m[1]==="*"?"·":m[1]}); i+=m[0].length; continue; }
        var e=/^[\s\u00a0]+(=|≈|→)[\s\u00a0]+/.exec(html.slice(i));
        if(e){ flush(); t.push({k:"eq",v:e[1]}); i+=e[0].length; continue; }
        flush(); t.push({k:"sp"}); i++;
        while(i<n&&(html[i]===" "||html[i]==="\u00a0")) i++;
        continue;
      }
      buf+=ch; i++;
    }
    flush();
    return t;
  }

  /* parser: term := factor (('/'|'·') factor)* ; factor := '(' term ')' | atom+ */
  function parse(tokens){
    var p=0;
    function atomRun(){
      var parts=[];
      while(p<tokens.length){
        var t=tokens[p];
        if(t.k==="a"){ parts.push(t.v); p++; }
        else if(t.k==="sp"){
          /* mezera uvnitř členu (např. „5,85 g“) — jen když pokračuje atom */
          if(p+1<tokens.length&&(tokens[p+1].k==="a"||tokens[p+1].k==="(")){ parts.push(" "); p++; }
          else { p++; break; }
        }
        else break;
      }
      return parts.length?{k:"txt",v:parts.join("")}:null;
    }
    function factor(){
      if(p<tokens.length&&tokens[p].k==="("){
        p++; var inner=term();
        if(p<tokens.length&&tokens[p].k===")") p++; else return null;
        if(!inner) return null;
        inner.paren=true; return inner;
      }
      return atomRun();
    }
    function term(){
      var left=factor(); if(!left) return null;
      while(p<tokens.length&&tokens[p].k==="o"){
        var op=tokens[p].v; p++;
        var right=factor(); if(!right) return null;
        left={k:"op",o:op,a:left,b:right};
      }
      return left;
    }
    var segs=[],cur=term();
    if(!cur) return null;
    segs.push(cur);
    while(p<tokens.length&&tokens[p].k==="eq"){
      var sym=tokens[p].v; p++;
      var nxt=term(); if(!nxt) return null;
      segs.push({eq:sym,node:nxt});
    }
    if(p<tokens.length) return null;   /* nezpracovaný zbytek → radši nechat být */
    return segs;
  }

  function plain(node){
    if(node.k==="txt") return node.v.replace(/<[^>]+>/g,"");
    var A=plain(node.a), B=plain(node.b);
    if(node.a.k==="op") A="("+A+")";
    if(node.b.k==="op") B="("+B+")";
    if(node.o==="/") return A+" lomeno "+B;
    return A+" krát "+B;
  }
  function render(node,inFrac){
    if(node.k==="txt") return node.v;
    if(node.o==="/"){
      return '<span class="frac" role="math" aria-label="'+
             plain(node).replace(/"/g,"&quot;")+'"><span class="fn">'+render(node.a,true)+
             '</span><span class="fd">'+render(node.b,true)+'</span></span>';
    }
    var s=render(node.a,inFrac)+' · '+render(node.b,inFrac);
    /* závorky drž jen tam, kde by se ztratil význam */
    if(node.paren&&!inFrac) s="("+s+")";
    return s;
  }

  function convert(el){
    var html=el.innerHTML;
    if(html.indexOf("/")<0) return false;
    if(SKIP.test(el.textContent)) return false;
    /* dělítko poznáme jen podle mezer kolem — bez nich není co převádět */
    if(!/(\s|&nbsp;)\/(\s|&nbsp;)/.test(html)) return false;
    /* popisek před dvojtečkou a koncové ✓ nechat beze změny, převést jen jádro */
    var pre="", post="";
    var mp=PREFIX.exec(html);
    if(mp){ pre=mp[1]; html=html.slice(pre.length); }
    var ms=SUFFIX.exec(html);
    if(ms){ post=ms[1]; html=html.slice(0,html.length-post.length); }
    if(html.indexOf("/")<0){ return false; }
    /* tučné zvýraznění výsledku parser mate — odstranit a na konci vrátit */
    var hadBold=/<b>/.test(html);
    if(hadBold) html=html.replace(/<\/?b>/g,"");
    var segs;
    try{ segs=parse(tokenize(html)); }catch(e){ return false; }
    if(!segs||!segs.length) return false;
    var hasFrac=JSON.stringify(segs).indexOf('"o":"/"')>=0;
    if(!hasFrac) return false;
    var parts=[render(segs[0],false)];
    for(var i=1;i<segs.length;i++){
      var rr=render(segs[i].node,false);
      if(hadBold&&i===segs.length-1) rr='<b>'+rr+'</b>';   /* tučný jen výsledek, ne rovnítko */
      parts.push(segs[i].eq+' '+rr);
    }
    el.innerHTML=pre+parts.join(' ')+post;
    return true;
  }

  function run(){
    var n=0;
    Array.prototype.forEach.call(document.querySelectorAll(".cs-line, .cs-formula, .eq, .eqline"),function(el){
      if(el.dataset.fr) return;
      if(convert(el)) { el.dataset.fr="1"; n++; }
    });
    window.__fracConverted=(window.__fracConverted||0)+n;
    return n;
  }
  window.renderFractions=run;
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",run);
  else run();
  /* listy vykreslované JS (hero, kalkulačky) — doběhni i po nich */
  setTimeout(run,300); setTimeout(run,1200);
})();
""" % MARK


def main():
    if not os.path.exists(TARGET):
        print("CHYBA: nenalezen", TARGET); return 1
    s = io.open(TARGET, encoding="utf-8").read()
    before = len(s.encode())
    s = re.sub(r'\n<style>\s*/\* ---- ' + MARK + r'.*?</style>', "", s, flags=re.S)
    s = re.sub(r'\n<script>\s*/\* ' + MARK + r'.*?</script>', "", s, flags=re.S)
    head_ins = "\n<style>" + CSS + "</style>\n</head>"
    body_ins = "\n<script>" + JS + "</script>\n</body>"
    s, a = re.subn(r'\n</head>', lambda m: head_ins, s, count=1)
    s, b = re.subn(r'\n</body>', lambda m: body_ins, s, count=1)
    if not (a and b):
        print("CHYBA vkládání: head=%d body=%d" % (a, b)); return 1
    io.open(TARGET, "w", encoding="utf-8", newline="\n").write(s)
    print("vloženo do jak-pocitat/index.html (%+d B, celkem %.0f KB)"
          % (len(s.encode()) - before, len(s.encode()) / 1024))
    return 0


if __name__ == "__main__":
    sys.exit(main())
