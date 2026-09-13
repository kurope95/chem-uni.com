/* ============================================================
   40 · PŘEKRESLENÍ VŠEHO (např. po změně motivu)
   ============================================================ */
function redrawAll(){
  try{ bxDraw();  }catch(e){}
  try{ dsDraw();  }catch(e){}
  try{ gpDraw();  }catch(e){}
  try{ lgDraw();  }catch(e){}
  try{ nbDraw();  }catch(e){}
  try{ izDraw();  }catch(e){}
  try{ cfDraw();  }catch(e){}
  try{ scDraw();  }catch(e){}
  try{ hsDraw();  }catch(e){}
  try{ muDraw();  }catch(e){}
  try{ clDraw();  }catch(e){}
  try{ dcDraw();  }catch(e){}
  try{ chDraw();  }catch(e){}
  try{ agDraw();  }catch(e){}
  try{ prDraw();  }catch(e){}
  try{ hemDraw(); }catch(e){}
  try{ drawMinis(); }catch(e){}
}
window.redrawAll = redrawAll;

/* ============================================================
   41 · NAVÁZÁNÍ SPOLEČNÝCH OVLÁDACÍCH PRVKŮ
   Posluchače jednotlivých modelů se připojují v jejich init*()
   funkcích — selecty se totiž musí nejdřív naplnit daty.
   ============================================================ */
function bind(){
  $$('.timeplan a').forEach(function(a){
    a.addEventListener("click",function(){
      var t=document.querySelector(a.getAttribute("href"));
      if(!t) return;
      $$(".sblock").forEach(function(b){ b.style.outline=""; });
      t.style.outline="2px solid var(--accent)";
      t.style.outlineOffset="8px";
      setTimeout(function(){ t.style.outline=""; },1600);
    });
  });
}

/* ============================================================
   42 · PRVNÍ VYKRESLENÍ VŠECH MODELŮ
   ============================================================ */
function initAll(){
  initBx();        /* hero — stavebnice komplexu */
  initDs();        /* k0 — vnitřní a vnější sféra */
  initGp();        /* k1 — koordinační polyedry */
  initLg();        /* k1 — tabulka ligandů */
  initNb();        /* k2 — skládačka názvu */
  initTr();        /* k2 — trenažér názvosloví */
  initIz();        /* k3 — prohlížeč izomerů */
  initCf();        /* k4 — štěpení orbitalů d */
  initSc();        /* k4 — spektrochemická řada */
  initHs();        /* k5 — vysoký a nízký spin */
  initMu();        /* k5 — magnetický moment */
  initCl();        /* k6 — barva z Δ */
  initDc();        /* k6 — barevný kruh */
  initCh();        /* k7 — chelátový efekt */
  initAg();        /* k7 — volný iont v roztoku */
  initPr();        /* k8 — tabulka praktických komplexů */
  initHb();        /* k8 — šesté místo na hemu */
  drawMinis();     /* rychlokurz — mini-grafy */
}
