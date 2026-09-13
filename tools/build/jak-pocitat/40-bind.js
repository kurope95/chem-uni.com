/* ============================================================
   36 · PŘEKRESLENÍ VŠECH SVG (volá se po změně motivu)
   ============================================================ */
function redrawAll(){
  try{ drawPx(); }catch(e){}
  try{ drawSto(); }catch(e){}
  try{ drawDil(); }catch(e){}
  try{ drawSg(); }catch(e){}
  try{ drawOrdSvg(ordState.answered); }catch(e){}
}
window.redrawAll = redrawAll;

/* pomocník pro přepínače .segmented */
function segBind(sel, fn){
  $$(sel + " button").forEach(function(b){
    b.addEventListener("click", function(){
      $$(sel + " button").forEach(function(x){ x.setAttribute("aria-pressed", x === b); });
      fn(b.dataset.v, b);
    });
  });
}

/* ============================================================
   37 · NAVÁZÁNÍ OVLÁDACÍCH PRVKŮ
   ============================================================ */
function bind(){
  /* --- hero: živý výpočtový list --- */
  $("#csTask").addEventListener("change", function(){
    csState.task = +this.value; csState.step = 1; drawCsLive();
  });
  $("#csNext").addEventListener("click", function(){ csState.step++; drawCsLive(); });
  $("#csAll").addEventListener("click", function(){ csState.step = 99; drawCsLive(); });
  $("#csReset").addEventListener("click", function(){ csState.step = 1; drawCsLive(); });

  /* --- takhle ne / takhle ano --- */
  segBind("#bgMode", function(v){ bgMode = v; drawBadGood(); });

  /* --- trenažér zápisu --- */
  $("#sortCheck").addEventListener("click", srtCheck);
  $("#sortNew").addEventListener("click", srtNew);

  /* --- osa předpon --- */
  $("#pxExp").addEventListener("input", function(){ pxState.exp = +this.value; drawPx(); });
  segBind("#pxUnit", function(v){ pxState.unit = v; drawPx(); });

  /* --- převodník --- */
  $("#cvCat").addEventListener("change", function(){
    cvState.cat = this.value; cvState.ui = 0; cvFillUnits(); drawConv();
  });
  $("#cvUnit").addEventListener("change", function(){
    cvState.ui = Math.max(0, this.selectedIndex); drawConv();
  });
  $("#cvVal").addEventListener("input", function(){ cvState.val = +this.value; drawConv(); });

  /* --- trenažér rozměrové kontroly --- */
  $("#dimNext").addEventListener("click", dimNext);

  /* --- kartotéka vzorců --- */
  $("#fcSearch").addEventListener("input", function(){ fcState.q = this.value; drawFc(); });
  segBind("#fcArea", function(v){ fcState.area = v; drawFc(); });

  /* --- cesta k výsledku --- */
  $("#rtFrom").addEventListener("change", function(){ rtState.from = this.value; drawRoute(); });
  $("#rtTo").addEventListener("change", function(){ rtState.to = this.value; drawRoute(); });

  /* --- platné číslice --- */
  $("#sgA").addEventListener("input", drawSg);
  $("#sgB").addEventListener("input", drawSg);
  segBind("#sgOp", function(v){ sgState.op = v; drawSg(); });
  $("#pfNext").addEventListener("click", pfNext);

  /* --- stechiometrické schéma --- */
  $("#stRx").addEventListener("change", function(){ stState.rx = +this.value; drawSto(); });
  $("#stM").addEventListener("input", function(){ stState.m = +this.value; drawSto(); });

  /* --- ředění a mísení --- */
  segBind("#dlMode", function(v){ dlState.mode = v; drawDil(); });
  $("#dlC1").addEventListener("input", function(){ dlState.c1 = (+this.value) / 10; drawDil(); });
  $("#dlV1").addEventListener("input", function(){ dlState.v1 = +this.value; drawDil(); });
  $("#dlC2").addEventListener("input", function(){ dlState.c2 = (+this.value) / 10; drawDil(); });
  $("#dlV2").addEventListener("input", function(){ dlState.v2 = +this.value; drawDil(); });

  /* --- řádový odhad --- */
  $("#ordNext").addEventListener("click", ordNext);
}

/* ============================================================
   38 · PRVNÍ VYKRESLENÍ
   ============================================================ */
function initAll(){
  initCsLive();
  drawBadGood();
  initSort();
  drawPx();
  cvFillUnits(); drawConv();
  initDim();
  drawFc();
  drawRoute();
  drawSg();
  initPf();
  drawSto();
  drawDil();
  initOrd();
}
