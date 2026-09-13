/* ============================================================
   28 · PŘEKRESLENÍ, OVLÁDÁNÍ, SPUŠTĚNÍ
   ============================================================ */
function redrawAll(){
  try{ drawMriz(); }catch(e){}
  try{ drawPasN(); }catch(e){}
  try{ drawBands(); }catch(e){}
  try{ drawVrst(); }catch(e){}
  try{ drawDut(); }catch(e){}
  try{ drawFe(); }catch(e){}
  try{ drawKovyTab(); }catch(e){}
  try{ drawTrend(); }catch(e){}
  try{ drawSlit(); }catch(e){}
  try{ drawSlitTab(); }catch(e){}
  try{ drawRudy(); }catch(e){}
  try{ drawUprava(); }catch(e){}
  try{ drawEll(); }catch(e){}
  try{ drawRozh(); }catch(e){}
  try{ drawElyz(); }catch(e){}
  try{ drawFar(); }catch(e){}
  try{ drawPec(); }catch(e){}
  try{ drawUhlik(); }catch(e){}
  try{ drawKoroze(); }catch(e){}
  try{ drawMiniPasy(); }catch(e){}
  try{ drawMiniMriz(); }catch(e){}
  try{ drawMiniCesty(); }catch(e){}
}
window.redrawAll = redrawAll;

function bind(){
  /* posuvníky */
  [["#paN",drawPasN],["#duR",drawDut],["#feT",drawFe],["#ehT",drawEll],
   ["#fdI",drawFar],["#fdT",drawFar],["#fdY",drawFar],["#vpH",drawPec],["#ucC",drawUhlik]
  ].forEach(function(p){
    var el=$(p[0]); if(el) el.addEventListener("input",p[1]);
  });
  /* výběrové seznamy a hledání */
  [["#duSel",drawDut],["#trProp",drawTrend],["#trPer",drawTrend],["#fdSel",drawFar],
   ["#tkCat",drawKovyTab],["#tkSort",drawKovyTab],["#alType",drawSlitTab]
  ].forEach(function(p){
    var el=$(p[0]); if(el) el.addEventListener("change",p[1]);
  });
  $("#tkQ").addEventListener("input",drawKovyTab);
  $("#alQ").addEventListener("input",drawSlitTab);
}

function initAll(){
  initMriz();
  drawPasN();
  initBands();
  initVrst();
  drawDut();
  drawFe();
  drawKovyTab();
  drawTrend();
  initSlit();
  drawSlitTab();
  initRudy();
  initUprava();
  drawEll();
  initRozh();
  initDrill();
  initElyz();
  drawFar();
  drawPec();
  drawUhlik();
  initKoroze();
  initOchr();
  drawMiniPasy();
  drawMiniMriz();
  drawMiniCesty();
}
