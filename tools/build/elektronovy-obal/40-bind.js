/* ============================================================
   25 · PŘEKRESLENÍ VŠEHO (po změně motivu)
   ============================================================ */
function redrawAll(){
  try{ drawHero(); drawTL(); drawBohr(); }catch(e){}
  try{ drawOrb(); drawOrbRad(); drawQN(); }catch(e){}
  try{ drawSpin(); drawExc(); drawPT(); }catch(e){}
  try{ drawHeat(); drawRad(); drawIE(); drawSieChart(); drawEN(); }catch(e){}
  try{ drawMiniBohr(); drawMiniDiag(); drawMiniTrend(); }catch(e){}
}
window.redrawAll = redrawAll;

/* ============================================================
   26 · NAVÁZÁNÍ OVLÁDACÍCH PRVKŮ
   ============================================================ */
function bind(){
  $$("#tlMode button").forEach(function(b){ b.addEventListener("click",function(){ tlState.k=b.dataset.v; drawTL(); }); });

  $("#bohrN1").addEventListener("input",function(){ bohrState.n1=+this.value; if(bohrState.n2<=bohrState.n1){ bohrState.n2=bohrState.n1+1; $("#bohrN2").value=bohrState.n2; } drawBohr(); });
  $("#bohrN2").addEventListener("input",function(){ bohrState.n2=+this.value; if(bohrState.n2<=bohrState.n1){ bohrState.n2=bohrState.n1+1; this.value=bohrState.n2; } drawBohr(); });

  $$("#orbType button").forEach(function(b){ b.addEventListener("click",function(){ orbState.type=b.dataset.v; drawOrb(); }); });
  $$("#orbRad button").forEach(function(b){ b.addEventListener("click",function(){ orbState.rad=b.dataset.v; drawOrbRad(); }); });

  $("#qnN").addEventListener("input",function(){ qnState.n=+this.value; drawQN(); });

  $$("#excEl button").forEach(function(b){ b.addEventListener("click",function(){ excState.el=b.dataset.v; excState.st=0; drawExc(); }); });

  $("#tblSearch").addEventListener("input",function(){ tblState.q=this.value; drawTbl(); });
  $$("#tblBlock button").forEach(function(b){ b.addEventListener("click",function(){ tblState.b=b.dataset.v; drawTbl(); }); });

  $$("#heatQ button").forEach(function(b){ b.addEventListener("click",function(){ heatState.q=b.dataset.v; drawHeat(); }); });
  $$("#radMode button").forEach(function(b){ b.addEventListener("click",function(){ radState.mode=b.dataset.v; drawRad(); }); });
  $$("#ieMode button").forEach(function(b){ b.addEventListener("click",function(){ ieMode=b.dataset.v; drawIE(); }); });

  $("#enA").addEventListener("change",function(){ enState.a=this.value; drawEN(); });
  $("#enB").addEventListener("change",function(){ enState.b=this.value; drawEN(); });
}

/* ============================================================
   27 · SPUŠTĚNÍ TEMATICKÉ ČÁSTI
   ============================================================ */
function initAll(){
  initHero();
  drawTL(); drawBohr();
  drawOrb(); drawOrbRad(); drawQN();
  initSpin(); drawExc(); initIon();
  drawPT(); drawTbl();
  drawHeat(); drawRad(); drawIE(); initSie(); initEN();
  drawMiniBohr(); drawMiniDiag(); drawMiniTrend();
}
