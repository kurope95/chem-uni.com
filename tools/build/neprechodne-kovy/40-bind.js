/* ============================================================
   25 · PŘEKRESLENÍ, NAVÁZÁNÍ OVLÁDÁNÍ, SPUŠTĚNÍ
   ============================================================ */
function redrawAll(){
  try{ drawMapa(); }catch(e){}
  try{ drawKf(); }catch(e){}
  try{ drawCh(); }catch(e){}
  try{ drawA1(); }catch(e){}
  try{ drawHr(); }catch(e){}
  try{ drawEl(); }catch(e){}
  try{ drawSv(); }catch(e){}
  try{ drawTb(); }catch(e){}
  try{ drawA2(); }catch(e){}
  try{ drawVc(); }catch(e){}
  try{ drawTv(); }catch(e){}
  try{ drawAm(); }catch(e){}
  try{ drawHh(); }catch(e){}
  try{ drawIp(); }catch(e){}
  try{ drawRl(); }catch(e){}
  try{ drawRx(); }catch(e){}
  try{ drawAk(); }catch(e){}
  try{ drawBg(); }catch(e){}
  try{ drawNp(); }catch(e){}
  try{ drawMiniHor(); }catch(e){}
  try{ drawMiniAmf(); }catch(e){}
  try{ drawMiniIp(); }catch(e){}
}
window.redrawAll = redrawAll;

function bind(){
  /* posuvníky */
  [["#svKrok",drawSv],["#tvCa",drawTv],["#tvMg",drawTv],["#tvHco",drawTv],
   ["#amPH",drawAm],["#rlZ",drawRl],["#akSoc",drawAk],["#npFaze",drawNp]
  ].forEach(function(p){
    var el=$(p[0]); if(el) el.addEventListener("input",p[1]);
  });
  /* výběrové seznamy */
  [["#kfSel",drawKf],["#a1Prop",drawA1],["#a2Prop",drawA2],["#hrPart",drawHr],
   ["#ipView",drawIp],["#tbTyp",drawTb],["#tbPrv",drawTb]
  ].forEach(function(p){
    var el=$(p[0]); if(el) el.addEventListener("change",p[1]);
  });
  /* hledání */
  $("#tbQ").addEventListener("input",drawTb);
}

function initAll(){
  initMapa();
  initKf();
  initCh();
  initA1();
  initHr();
  initEl();
  drawSv();
  drawTb();
  initA2();
  initVc();
  initTv();
  drawAm();
  initHh();
  initIp();
  drawRl();
  initRx();
  initAk();
  initDrill();
  initBg();
  drawNp();
  drawMiniHor();
  drawMiniAmf();
  drawMiniIp();
}
