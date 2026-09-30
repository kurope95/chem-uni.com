/* ============================================================
   J12 · PŘEKRESLENÍ, NAVÁZÁNÍ, PRVNÍ VYKRESLENÍ
   ============================================================ */
function redrawAll(){
  try{ drawLadder(); drawDirect(); drawPH(); drawHelix(); }catch(e){}
  try{ drawIndirect(); drawChain(); drawTarget(); }catch(e){}
}
window.redrawAll = redrawAll;

/* kratší průvodce nemá slovníček (kostra ho přeskočí) */
var GLOSS = [];

function bind(){
  $("#phV").addEventListener("input",function(){ PH=+this.value; drawPH(); });
  /* terč mění rozložení podle šířky */
  var rt; window.addEventListener("resize",function(){ clearTimeout(rt); rt=setTimeout(drawTarget,150); },{passive:true});
}

function initAll(){
  initLadder();
  initDirect();
  drawPH();
  drawHelix();
  initTrainer();
  initIndirect();
  initChain();
  initErrs();
  drawTarget();
  initStats();
}
