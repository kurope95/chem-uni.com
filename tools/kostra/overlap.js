/* overlap.js — najde překrývající se texty v SVG modelech, ve všech stavech ovládání.
   Spouští se přes javascript_tool na otevřené stránce; vrací objekt s nálezy. */
(function(){
  "use strict";
  var TOL = (window.__OVTOL === undefined ? 1.0 : window.__OVTOL);           /* menší průnik než tohle je zaokrouhlení, ne překryv */
  var found = [], states = 0, svgs = 0;

  /* Prvek uvnitř sbaleného bloku (overflow:hidden, obsah vyšší než rámeček)
     má pořád svůj obdélník, i když se vůbec nevykresluje. Bez téhle kontroly
     detektor hlásí kolize, které nikdo nevidí — třeba otázky ve zavřeném kvízu. */
  function orezany(el){
    var r = el.getBoundingClientRect();
    for(var p = el.parentElement; p; p = p.parentElement){
      var cs = window.getComputedStyle(p);
      if(cs.overflow === "visible" && cs.overflowX === "visible" && cs.overflowY === "visible") continue;
      var pr = p.getBoundingClientRect();
      if(r.bottom <= pr.top + 0.5 || r.top >= pr.bottom - 0.5) return true;
      if(r.right <= pr.left + 0.5 || r.left >= pr.right - 0.5) return true;
    }
    return false;
  }

  function boxesOf(sv){
    var out = [];
    var texts = sv.querySelectorAll("text");
    for(var i = 0; i < texts.length; i++){
      var t = texts[i];
      var s = (t.textContent || "").trim();
      if(!s) continue;
      if(t.getAttribute("opacity") === "0") continue;
      var cs = window.getComputedStyle(t);
      if(cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") continue;
      var b;
      try{ b = t.getBBox(); }catch(e){ continue; }
      if(!b || !b.width || !b.height) continue;
      if(orezany(t)) continue;
      out.push({t:s, b:b});
    }
    return out;
  }

  function scan(label){
    states++;
    var wraps = document.querySelectorAll(".svgwrap svg, svg");
    for(var w = 0; w < wraps.length; w++){
      var sv = wraps[w];
      if(sv.closest(".rail") || sv.closest(".topbar") || sv.closest("button")) continue;
      var bs = boxesOf(sv);
      if(bs.length < 2) continue;
      for(var i = 0; i < bs.length; i++){
        for(var j = i + 1; j < bs.length; j++){
          var a = bs[i].b, c = bs[j].b;
          var ix = Math.min(a.x + a.width, c.x + c.width) - Math.max(a.x, c.x);
          var iy = Math.min(a.y + a.height, c.y + c.height) - Math.max(a.y, c.y);
          if(ix > TOL && iy > TOL){
            found.push({stav: label, a: bs[i].t.slice(0,42), b: bs[j].t.slice(0,42),
                        x: Math.round(ix), y: Math.round(iy)});
          }
        }
      }
    }
  }

  function panels(){
    var ps = document.querySelectorAll(".panel");
    for(var p = 0; p < ps.length; p++){
      var panel = ps[p];
      if(!panel.querySelector("svg")) continue;
      svgs++;
      var name = (panel.querySelector("h3") || {}).textContent || ("panel " + p);
      name = name.replace(/\s+/g, " ").trim().slice(0, 46);
      scan(name + " | výchozí");
      /* segmentovaná tlačítka */
      var segs = panel.querySelectorAll(".segmented button, .seg button");
      for(var s = 0; s < segs.length; s++){
        try{ segs[s].click(); }catch(e){ continue; }
        scan(name + " | " + (segs[s].textContent || "").trim().slice(0, 22));
      }
      /* selecty */
      var sels = panel.querySelectorAll("select");
      for(var q = 0; q < sels.length; q++){
        var sel = sels[q];
        for(var o = 0; o < sel.options.length; o++){
          sel.selectedIndex = o;
          sel.dispatchEvent(new Event("change", {bubbles:true}));
          scan(name + " | " + (sel.options[o].text || "").trim().slice(0, 22));
        }
      }
      /* posuvníky: krajní, čtvrtiny, střed */
      var rngs = panel.querySelectorAll('input[type=range]');
      for(var r = 0; r < rngs.length; r++){
        var inp = rngs[r], lo = +inp.min, hi = +inp.max;
        var vals = [lo, lo + (hi-lo)*0.25, (lo+hi)/2, lo + (hi-lo)*0.75, hi];
        for(var v = 0; v < vals.length; v++){
          inp.value = String(vals[v]);
          inp.dispatchEvent(new Event("input", {bubbles:true}));
          inp.dispatchEvent(new Event("change", {bubbles:true}));
          scan(name + " | posuvník " + Math.round(vals[v]));
        }
      }
    }
  }

  panels();

  /* sloučit duplicity (stejná dvojice textů v mnoha stavech) */
  var seen = {}, uniq = [];
  found.forEach(function(f){
    var k = f.a + "###" + f.b;
    if(seen[k]){ seen[k].kolikStavu++; return; }
    seen[k] = {a:f.a, b:f.b, x:f.x, y:f.y, prvniStav:f.stav, kolikStavu:1};
    uniq.push(seen[k]);
  });
  uniq.sort(function(m,n){ return n.x*n.y - m.x*m.y; });
  /* getBBox() měří podle skutečně načteného fontu — když ještě doběhává webfont,
     vznikají falešné dvojice. Tohle na to upozorní, aniž by se měnil typ návratu. */
  var fontsReady = !document.fonts || document.fonts.status === "loaded";
  return {stranka: document.title, fontsReady: fontsReady, modelu: svgs, stavu: states,
          prekryvu_celkem: found.length, ruznych: uniq.length, nalezy: uniq.slice(0, 25)};
})();
