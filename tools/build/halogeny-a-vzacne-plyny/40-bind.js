/* ============================================================
   25 · PŘEKRESLENÍ VŠEHO (po změně motivu)
   ============================================================ */
function redrawAll(){
  try{ drawHero(); }catch(e){}
  try{ drawVzp(); }catch(e){}
  try{ drawDest(); }catch(e){}
  try{ drawIe(); }catch(e){}
  try{ drawXe(); }catch(e){}
  try{ drawVm(); }catch(e){}
  try{ drawTr(); }catch(e){}
  try{ drawZk(); }catch(e){}
  try{ drawVt(); }catch(e){}
  try{ drawDp(); }catch(e){}
  try{ drawHx(); }catch(e){}
  try{ drawMz(); }catch(e){}
  try{ drawIc(); }catch(e){}
  try{ drawSl(); }catch(e){}
  try{ drawOk(); }catch(e){}
  try{ drawEl(); }catch(e){}
  try{ drawFd(); }catch(e){}
  try{ drawOz(); }catch(e){}
  try{ drawMiniTv(); drawMiniE0(); drawMiniAcid(); }catch(e){}
}
window.redrawAll = redrawAll;

/* ============================================================
   26 · NAVÁZÁNÍ SPOLEČNÝCH OVLÁDACÍCH PRVKŮ
   Posluchače jednotlivých modelů se připojují v jejich init*()
   funkcích — selecty se totiž musí nejdřív naplnit daty.
   ============================================================ */
function bind(){
  /* odkazy v .timeplan zvýrazní cílový blok rychlokurzu */
  $$(".timeplan a").forEach(function(a){
    a.addEventListener("click", function(){
      var t = document.querySelector(a.getAttribute("href"));
      if(!t) return;
      $$(".sblock").forEach(function(b){ b.style.outline = ""; });
      t.style.outline = "2px solid var(--accent)";
      t.style.outlineOffset = "8px";
      setTimeout(function(){ t.style.outline = ""; }, 1600);
    });
  });
}

/* ============================================================
   27 · PRVNÍ VYKRESLENÍ VŠECH MODELŮ
   ============================================================ */
function initAll(){
  initHero();     /* hero — mapa skupiny 17 */
  initVzp();      /* k0 — průzkumník skupiny 18 */
  initDest();     /* k0 — destilační kolona */
  initIe();       /* k1 — Bartlettův žebříček */
  initXe();       /* k1 — stavitel sloučenin xenonu */
  initVm();       /* k2 — žebřík oxidačních čísel */
  initOn();       /* k2 — trenažér oxidačních čísel */
  initTr();       /* k3 — graf trendů */
  initZk();       /* k3 — čtyři zkumavky */
  initVt();       /* k4 — rozhodovač vytěsnění */
  initDp();       /* k4 — disproporcionace */
  initHx();       /* k5 — porovnávač halogenovodíků */
  initMz();       /* k5 — teploty varu hydridů */
  initIc();       /* k6 — iontový vs kovalentní */
  initSl();       /* k6 — prohledávatelná tabulka */
  initOk();       /* k7 — oxokyseliny chloru */
  initNz();       /* k7 — trenažér názvosloví */
  initEl();       /* k8 — chloralkalická elektrolýza */
  initFd();       /* k8 — Faradayova kalkulačka */
  initOz();       /* k8 — cyklus ničení ozonu */
  drawMiniTv();   /* rychlokurz — tři mini-grafy */
  drawMiniE0();
  drawMiniAcid();
}
