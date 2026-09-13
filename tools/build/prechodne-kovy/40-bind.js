/* ============================================================
   31 · PŘEKRESLENÍ, OVLÁDÁNÍ, SPUŠTĚNÍ
   ============================================================ */
function redrawAll(){
  try{ drawRada(); }catch(e){}
  try{ drawEn(); }catch(e){}
  try{ drawLk(); }catch(e){}
  try{ drawMx(); }catch(e){}
  try{ drawTs(); }catch(e){}
  try{ drawBv(); }catch(e){}
  try{ drawMg(); }catch(e){}
  try{ drawCh(); }catch(e){}
  try{ drawMn(); }catch(e){}
  try{ drawTri(); }catch(e){}
  try{ drawFe(); }catch(e){}
  try{ drawRz(); }catch(e){}
  try{ drawDr(); }catch(e){}
  try{ drawZd(); }catch(e){}
  try{ drawOk(); }catch(e){}
  try{ drawKt(); }catch(e){}
  try{ drawOc(); }catch(e){}
  try{ drawMiniEn(); }catch(e){}
  try{ drawMiniOx(); }catch(e){}
  try{ drawMiniBar(); }catch(e){}
}
window.redrawAll = redrawAll;

function bind(){
  [["#enZ",drawEn],["#chP",drawCh],["#ocC",drawOc],["#ocCr",drawOc],["#ocNi",drawOc]]
   .forEach(function(p){ var el=$(p[0]); if(el) el.addEventListener("input",p[1]); });
}

function initAll(){
  initRada();
  drawEn();
  initLk();
  initMx();
  initTs();
  initBv();
  initMg();
  drawCh();
  initMn();
  initTri();
  initFe();
  initRz();
  initDr();
  initZd();
  initOk();
  initKt();
  drawOc();
  drawMiniEn();
  drawMiniOx();
  drawMiniBar();
}
