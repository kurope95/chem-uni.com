/* ============================================================
   T20 · PŘEKRESLENÍ VŠEHO (po změně motivu), NAVÁZÁNÍ, SPUŠTĚNÍ
   ============================================================ */
function redrawAll(){
  try{ drawHero(); }catch(e){}
  try{ drawSkup(); drawHeat(); drawFaz(); }catch(e){}
  try{ drawKond(); drawHyd(); drawSol(); }catch(e){}
  try{ drawMriz(); drawAmor(); }catch(e){}
  try{ drawHyb(); drawPol(); }catch(e){}
  try{ drawMiniStates(); drawMiniLatt(); drawMiniAngle(); }catch(e){}
}
window.redrawAll = redrawAll;

function bind(){
  $("#skupT").addEventListener("input",function(){ skupState.T=+this.value; drawSkup(); });
}

function initAll(){
  initHero();
  initHeat();
  initFaz();
  initKond();
  initHyd();
  initSol();
  initMriz();
  initAmor();
  initVT();
  initHyb();
  initMix();
  initMixT();
  initPol();
  initBP();
  initTbl();
  drawSkup();
  drawMiniStates();
  drawMiniLatt();
  drawMiniAngle();
}
