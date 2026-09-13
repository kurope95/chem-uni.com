/* ============================================================
   40 · PŘEKRESLENÍ, NAVÁZÁNÍ OVLÁDÁNÍ, SPUŠTĚNÍ
   ============================================================ */
function redrawAll(){
  try{ drawHero(); }catch(e){}
  try{ drawSt(); drawAvg(); }catch(e){}
  try{ drawRl(); }catch(e){}
  try{ drawLin(); }catch(e){}
  try{ drawCl(); }catch(e){}
  try{ drawMech(); }catch(e){}
  try{ drawMb(); drawOr(); }catch(e){}
  try{ drawEp(); }catch(e){}
  try{ drawArr(); drawVh(); }catch(e){}
  try{ drawCat(); }catch(e){}
  try{ drawSf(); }catch(e){}
  try{ drawMiniCt(); drawMiniProf(); drawMiniMb(); }catch(e){}
}
window.redrawAll = redrawAll;

function bind(){
  /* hero — koncentrace v čase */
  $$("#heroOrder button").forEach(function(b){
    b.addEventListener("click",function(){
      heroState.order=+b.dataset.v;
      pressGroup("#heroOrder",heroState.order);
      drawHero();
    });
  });
  $("#heroK").addEventListener("input",function(){ heroState.k=(+this.value)/100; drawHero(); });
  $("#heroC0").addEventListener("input",function(){ heroState.c0=(+this.value)/10; drawHero(); });
  $("#heroT").addEventListener("input",function(){ heroState.t=(+this.value)/10; drawHero(); });
  /* ostatní modely mají posluchače ve svých init* funkcích */
}

function initAll(){
  pressGroup("#heroOrder",heroState.order);
  drawHero();
  initSt();
  initAvg();
  initRl();
  initIr();
  initLin();
  initTbl();
  initCl();
  initMech();
  initMb();
  initOr();
  initEp();
  initArr();
  initVh();
  initCat();
  initCt();
  initFx();
  initSf();
  drawMiniCt();
  drawMiniProf();
  drawMiniMb();
}
