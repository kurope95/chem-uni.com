/* ============================================================
   20 · PŘEKRESLENÍ VŠECH MODELŮ (volá se po změně motivu)
   ============================================================ */
function redrawAll(){
  try{ drawXs(); }catch(e){}
  try{ drawVe(); }catch(e){}
  try{ drawMo(); }catch(e){}
  try{ drawCa(); }catch(e){}
  try{ drawBo(); }catch(e){}
  try{ drawTb(); }catch(e){}
  try{ drawCs(); }catch(e){}
  try{ drawSi(); }catch(e){}
  try{ drawQa(); }catch(e){}
  try{ drawGl(); }catch(e){}
  try{ drawCe(); }catch(e){}
  try{ drawBh(); }catch(e){}
  try{ drawBl(); }catch(e){}
  try{ drawDg(); }catch(e){}
  try{ drawPv(); }catch(e){}
  try{ drawMiniStruct(); drawMiniSil(); drawMiniBor(); }catch(e){}
}
window.redrawAll = redrawAll;

/* ============================================================
   21 · NAVÁZÁNÍ SPOLEČNÝCH OVLÁDACÍCH PRVKŮ
   Posluchače jednotlivých modelů se připojují v jejich init*()
   funkcích — selecty se totiž musí nejdřív naplnit daty.
   ============================================================ */
function bind(){
  /* odkazy v .timeplan zvýrazní blok, na který se skáče */
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
   22 · PRVNÍ VYKRESLENÍ VŠECH MODELŮ
   ============================================================ */
function initAll(){
  initXs();          /* hero — prohlížeč krystalových struktur */
  initVe();          /* k0 — průzkumník vazebných možností */
  initMo();          /* k1 — porovnávač modifikací uhlíku */
  initCa();          /* k2 — uhličitanový systém */
  initBo();          /* k2 — Boudouardova rovnováha */
  initTb();          /* k3 — prohledávatelná tabulka sloučenin */
  initKd();          /* k3 — trenažér karbidů */
  initCs();          /* k4 — srovnávač uhlík × křemík */
  initSi();          /* k5 — stavebnice křemičitanů */
  initQa();          /* k5 — modifikace SiO₂ podle teploty */
  initGl();          /* k6 — průzkumník skel */
  initCe();          /* k6 — výpal keramiky a cementu */
  initBh();          /* k7 — třístředová vazba a diboran */
  initBl();          /* k7 — Lewisova kyselost boru */
  initDg();          /* k8 — diagonální podobnost */
  initPv();          /* k8 — polovodič */
  initNd();          /* k8 — závěrečný trenažér okruhu */
  drawMiniStruct();  /* rychlokurz — mini-grafy */
  drawMiniSil();
  drawMiniBor();
}
