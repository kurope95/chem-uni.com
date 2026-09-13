/* ============================================================
   T16 · PŘEKRESLENÍ VŠEHO (např. po změně motivu)
   ============================================================ */
function redrawAll(){
  try{ drawHero(); drawKw(); drawInd(); }catch(e){}
  try{ drawTh(); drawPr(); }catch(e){}
  try{ drawKaTable(); drawAl(); drawCmp(); }catch(e){}
  try{ drawAmf(); drawDir(); drawHy(); }catch(e){}
  try{ drawMiniVenn(); drawMiniLadder(); drawMiniHydro(); }catch(e){}
}
window.redrawAll = redrawAll;

/* ============================================================
   T17 · NAVÁZÁNÍ OVLÁDACÍCH PRVKŮ
   ============================================================ */
function bind(){
  /* hero — stupnice pH */
  $("#heroPH").addEventListener("input",function(){ heroPH=+this.value; drawHero(); });

  /* k0 — Kw a indikátory */
  $("#kwT").addEventListener("input",function(){ kwT=+this.value; drawKw(); });
  $("#indPH").addEventListener("input",function(){ indPH=+this.value; drawInd(); });

  /* k3 — prohledávatelná tabulka pKa */
  $("#kaSearch").addEventListener("input",function(){ kaState.q=this.value; drawKaTable(); });
  $$("#kaFilter button").forEach(function(b){
    b.addEventListener("click",function(){ kaState.f=b.dataset.v; drawKaTable(); });
  });
  $$("#kaSort button").forEach(function(b){
    b.addEventListener("click",function(){ kaState.sort=b.dataset.v; drawKaTable(); });
  });
  /* select a posuvník u stupně disociace, průzkumníky a trenažéry se navazují
     ve svých init* funkcích (potřebují nejdřív naplnit <option>) */
}

/* ============================================================
   T18 · PRVNÍ VYKRESLENÍ
   ============================================================ */
function initAll(){
  drawHero();
  drawKw();
  drawInd();
  initTh();
  initPr();
  initCj();
  drawKaTable();
  initAl();
  initCmp();
  initAmf();
  initDir();
  initHy();
  initHd();
  drawMiniVenn();
  drawMiniLadder();
  drawMiniHydro();
}
