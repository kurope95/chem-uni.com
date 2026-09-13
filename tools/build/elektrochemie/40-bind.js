/* ============================================================
   26 · PŘEKRESLENÍ VŠEHO (např. po změně motivu)
   ============================================================ */
function redrawAll(){
  try{ drawHeroCell(); }catch(e){}
  try{ drawETable(); }catch(e){}
  try{ drawBek(); }catch(e){}
  try{ drawPredict(); }catch(e){}
  try{ drawNernst(); drawConc(); drawPH(); }catch(e){}
  try{ drawGE(); drawCells(); }catch(e){}
  try{ drawElx(); drawFaraday(); }catch(e){}
  try{ drawCorr(); }catch(e){}
  try{ drawMiniBek(); drawMiniDaniell(); drawMiniSigns(); }catch(e){}
  try{ drawBal(); }catch(e){}
}
window.redrawAll = redrawAll;

/* ============================================================
   27 · NAVÁZÁNÍ OVLÁDACÍCH PRVKŮ
   Posluchače jednotlivých modelů se připojují v jejich init*()
   funkcích níže — selecty se totiž musí nejdřív naplnit daty.
   bind() proto řeší jen prvky společné pro víc modelů.
   ============================================================ */
function bind(){
  /* odkazy v .timeplan a .covermap plynule odscrollují (CSS scroll-behavior),
     tady jen doplníme označení bloku, na který se skáče */
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
   28 · PRVNÍ VYKRESLENÍ VŠECH MODELŮ
   ============================================================ */
function initAll(){
  initHeroCell();     /* hero — stavitel galvanického článku */
  initOxn();          /* k0 — trenažér oxidačních čísel */
  initAgt();          /* k0 — trenažér činidel */
  initBal();          /* k1 — krokový řešitel vyčíslování */
  initETable();       /* k2 — prohledávatelná tabulka E° */
  initBek();          /* k3 — Beketovova řada + trenažér */
  initPredict();      /* k3 — předpověď z E° */
  initNernst();       /* k4 — Nernstova rovnice */
  initConc();         /* k4 — koncentrační článek */
  initPH();           /* k4 — potenciál vs pH */
  initGE();           /* k5 — galvanický vs elektrolytický */
  initCells();        /* k5 — praktické články */
  initElx();          /* k6 — průzkumník elektrolýzy */
  initFaraday();      /* k6 — Faradayova kalkulačka */
  initCorr();         /* k7 — koroze */
  drawMiniBek();      /* rychloprůchod — mini-grafy */
  drawMiniDaniell();
  drawMiniSigns();
}
