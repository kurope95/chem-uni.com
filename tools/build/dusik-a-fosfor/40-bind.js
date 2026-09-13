/* ============================================================
   22 · PŘEKRESLENÍ VŠECH MODELŮ (po změně motivu)
   ============================================================ */
function redrawAll(){
  try{ drawOx(); }catch(e){}
  try{ drawG15(); }catch(e){}
  try{ drawCmp(); }catch(e){}
  try{ drawBond(); }catch(e){}
  try{ drawAct(); }catch(e){}
  try{ drawMod(); }catch(e){}
  try{ drawHab(); }catch(e){}
  try{ drawHyd(); }catch(e){}
  try{ drawNox(); }catch(e){}
  try{ drawOst(); }catch(e){}
  try{ drawMet(); }catch(e){}
  try{ drawPst(); }catch(e){}
  try{ drawPac(); }catch(e){}
  try{ drawFer(); }catch(e){}
  try{ drawTrd(); }catch(e){}
  try{ drawMnLad(); drawMnBond(); drawMnHab(); drawMnTrd(); }catch(e){}
}
window.redrawAll = redrawAll;

/* ============================================================
   23 · NAVÁZÁNÍ SPOLEČNÝCH OVLÁDACÍCH PRVKŮ
   Posluchače jednotlivých modelů se připojují v jejich init*(),
   protože selecty se musí nejdřív naplnit daty.
   ============================================================ */
function bind(){
  $$('.timeplan a').forEach(function(a){
    a.addEventListener("click", function(){
      var t = document.querySelector(a.getAttribute("href"));
      if(!t) return;
      $$(".sblock").forEach(function(b){ b.style.outline = ""; });
      t.style.outline = "2px solid var(--accent)";
      t.style.outlineOffset = "8px";
      setTimeout(function(){ t.style.outline = ""; }, 1600);
    });
  });
}

/* ============================================================
   24 · PRVNÍ VYKRESLENÍ VŠECH MODELŮ
   ============================================================ */
function initAll(){
  initOx();       /* hero — žebřík oxidačních stavů */
  initG15();      /* k0 — průzkumník skupiny 15 */
  initCmp();      /* k0 — prohledávatelná tabulka sloučenin */
  initNz();       /* k0 — trenažér oxidačních čísel a názvosloví */
  initBond();     /* k1 — vazebná bilance */
  initAct();      /* k1 — aktivační bariéra */
  initMod();      /* k2 — modifikace fosforu */
  initHab();      /* k3 — Haberův proces */
  initHyd();      /* k3 — struktury hydridů */
  initNox();      /* k4 — oxidy dusíku */
  initOst();      /* k5 — Ostwaldův proces */
  initMet();      /* k5 — kov a kyselina dusičná */
  initPrd();      /* k5 — trenažér „co vznikne“ */
  initPst();      /* k6 — struktury binárních sloučenin fosforu */
  initPac();      /* k7 — kyseliny fosforu */
  initFer();      /* k7 — hnojiva */
  initTrd();      /* k8 — trendy ve skupině 15 */
  drawMnLad();    /* rychlokurz — mini-grafy */
  drawMnBond();
  drawMnHab();
  drawMnTrd();
}
