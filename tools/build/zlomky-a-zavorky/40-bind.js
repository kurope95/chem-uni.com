/* ============================================================
   SPUŠTĚNÍ, PŘEKRESLENÍ, OVLÁDÁNÍ
   ============================================================ */
function initAll(){
  initPz();  drawPz();
  initDz();  drawDz();
  initKz();
  initZr();  drawZr();
  initKo();
  initPp();
  initSz();
  initZe();  drawZe();
  initDk();
  initRk();
  initZd();  drawZd();
  drawMg1(); drawMg2(); drawMg3(); drawMg4();
  if(window.renderFractions) window.renderFractions();
}

function redrawAll(){
  try{ drawMg1(); }catch(e){}
  try{ drawMg2(); }catch(e){}
  try{ drawMg3(); }catch(e){}
  try{ drawMg4(); }catch(e){}
  try{ if(window.renderFractions) window.renderFractions(); }catch(e){}
}
window.redrawAll = redrawAll;

function bind(){
  /* --- hero: převodník zápisu --- */
  $("#pzIn").addEventListener("input", drawPz);
  zSeg("pzMode", drawPz);

  /* --- k00: dva zápisy téhož --- */
  $("#dzSel").addEventListener("change", drawDz);

  /* --- k01: kam patří závorka --- */
  $("#kzNext").addEventListener("click", function(){ kzI++; drawKz(); });
  $("#kzReset").addEventListener("click", function(){ initKz(); toast("Trenažér vynulován."); });

  /* --- k01: zkoušečka rovnosti --- */
  $("#zrL").addEventListener("change", drawZr);
  $("#zrR").addEventListener("change", drawZr);
  $("#zrRun").addEventListener("click", runZr);

  /* --- k02: krokovač pořadí operací --- */
  $("#koSel").addEventListener("change", resetKo);
  $("#koNext").addEventListener("click", stepKo);
  $("#koReset").addEventListener("click", resetKo);

  /* --- k03: přepisovač oběma směry --- */
  zSeg("ppMode", drawPp);
  $("#ppNext").addEventListener("click", function(){ ppI++; drawPp(); });
  $("#ppReset").addEventListener("click", function(){ initPp(); toast("Trenažér vynulován."); });

  /* --- k04: skládačka složeného zlomku --- */
  $("#szSel").addEventListener("change", resetSz);
  $("#szNext").addEventListener("click", stepSz);
  $("#szReset").addEventListener("click", resetSz);

  /* --- k05: záporné exponenty --- */
  $("#zeSel").addEventListener("change", drawZe);
  zSeg("zeDir", drawZe);

  /* --- k06: detektor chyby v krácení --- */
  $("#dkYes").addEventListener("click", function(){ dkPick(true); });
  $("#dkNo").addEventListener("click", function(){ dkPick(false); });
  $("#dkNext").addEventListener("click", function(){ dkI++; drawDk(); });

  /* --- k07: rozměrová kontrola --- */
  $("#rkNext").addEventListener("click", function(){ rkI++; drawRk(); });

  /* --- k07: zkouška dosazením --- */
  ["#zdA","#zdB","#zdC"].forEach(function(s){
    $(s).addEventListener("input", drawZd);
  });
  $("#zdSel").addEventListener("change", drawZd);

  /* kvízy se překreslují motorem kostry — po každém zásahu do nich
     doběhne sazeč zlomků, aby zůstaly vysázené i po „Zkusit znovu“ */
  document.addEventListener("click", function(e){
    var t = e.target;
    if(t && t.closest && t.closest(".quiz")){
      setTimeout(function(){ if(window.renderFractions) window.renderFractions(); }, 30);
    }
  }, true);
}
