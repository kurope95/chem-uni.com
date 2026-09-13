/* ============================================================
   27 · PŘEKRESLENÍ VŠEHO (po změně motivu)
   ============================================================ */
function redrawAll(){
  try{ drawHero(); drawMorse(); drawMet(); drawLat(); drawIon(); }catch(e){}
  try{ drawLewis(); drawOvl(); drawMult(); drawDip(); }catch(e){}
  try{ drawPol(); drawDat(); drawForce(); drawBP(); drawHB(); }catch(e){}
  try{ drawMiniTree(); drawMiniMult(); drawMiniForce(); }catch(e){}
}
window.redrawAll = redrawAll;

/* ============================================================
   28 · NAVÁZÁNÍ OVLÁDACÍCH PRVKŮ
   ============================================================ */
function bind(){
  initHero();
  initMorse();
  initSubst();
  initMet();
  initLat();
  initIon();
  initLewis();
  initOvl();
  initMult();
  initDip();
  initENTable();
  initPol();
  initPD();
  initDat();
  initFD();
  initBP();
  initHB();
}

/* ============================================================
   29 · PRVNÍ VYKRESLENÍ
   ============================================================ */
function initAll(){
  drawBond1();
  redrawAll();
}
