/* ============================================================
   A20 · PŘEKRESLENÍ, NAVÁZÁNÍ, PRVNÍ VYKRESLENÍ
   ============================================================ */
function redrawAll(){
  try{ drawHero(); drawCmp(); drawIndChart(); paintFlasks(); }catch(e){}
}
window.redrawAll = redrawAll;

/* průvodce nemá slovníček (kostra ho přeskočí) */
var GLOSS = [];

function bind(){
  $("#icPH").addEventListener("input",function(){ ICPH=+this.value; drawIndChart(); });
}

function initAll(){
  paintFlasks();
  fillIndTable();
  drawIndChart();
  initHero();
  drawCmp();
  initFills();
  initTips();
  initQs();
  initCalc();
  initErrs();
}
