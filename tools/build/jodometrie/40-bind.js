/* ============================================================
   J30 · PŘEKRESLENÍ, NAVÁZÁNÍ, PRVNÍ VYKRESLENÍ
   ============================================================ */
function redrawAll(){
  try{ drawLadder(); drawDirect(); drawPH(); drawHelix(); }catch(e){}
  try{ drawIndirect(); drawChain(); drawTarget(); paintFlasks(); }catch(e){}
}
window.redrawAll = redrawAll;

/* průvodce nemá slovníček (kostra ho přeskočí) */
var GLOSS = [];

function bind(){
  $("#phV").addEventListener("input",function(){ PH=+this.value; drawPH(); });
  var rt; window.addEventListener("resize",function(){ clearTimeout(rt); rt=setTimeout(drawTarget,150); },{passive:true});
}

function initAll(){
  paintFlasks();
  initLadder();
  initDirect();
  drawPH();
  drawHelix();
  initIndirect();
  initChain();
  initErrs();
  drawTarget();
  initStats();
  initFills();
  initTips();
  initQs();
  initCalc();
}
