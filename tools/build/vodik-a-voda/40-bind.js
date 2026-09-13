/* ============================================================
   14 · PŘEKRESLENÍ VŠEHO (např. po změně motivu)
   ============================================================ */
function redrawAll(){
  try{ drawHero(); }catch(e){}
  try{ drawPT(); }catch(e){}
  try{ drawIz(); drawTd(); }catch(e){}
  try{ drawMo(); drawOp(); }catch(e){}
  try{ drawRx(); }catch(e){}
  try{ drawVy(); drawEl(); drawEn(); }catch(e){}
  try{ drawHm(); drawBp(); drawHk(); }catch(e){}
  try{ drawWm(); drawDn(); drawOh(); }catch(e){}
  try{ drawKw(); drawTv(); drawZm(); }catch(e){}
  try{ drawPx(); drawPr(); drawPk(); }catch(e){}
  try{ drawMn1(); drawMn2(); drawMn3(); }catch(e){}
}
window.redrawAll = redrawAll;

/* ============================================================
   15 · NAVÁZÁNÍ SPOLEČNÝCH OVLÁDACÍCH PRVKŮ
   Posluchače jednotlivých modelů se připojují v jejich init*()
   funkcích — selecty se totiž musí nejdřív naplnit daty.
   ============================================================ */
function bind(){
  $$('.timeplan a').forEach(function(a){
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
   16 · PRVNÍ VYKRESLENÍ VŠECH MODELŮ
   ============================================================ */
function initAll(){
  initHero();   /* hero — tři vazebné možnosti vodíku */
  initPT();     /* k0 — vodík proti 1. a 17. skupině */
  initIz();     /* k1 — průzkumník izotopů + tabulka D₂O */
  initTd();     /* k1 — rozpad tritia */
  initMo();     /* k2 — křivka potenciální energie H₂ */
  initOp();     /* k2 — ortho a para vodík */
  initRx();     /* k3 — rozhodovač reakcí vodíku */
  initVy();     /* k4 — cesty k vodíku */
  initEl();     /* k4 — kalkulačka elektrolýzy */
  initEn();     /* k4 — energetická hustota paliv */
  initHm();     /* k5 — mapa hydridů */
  initBp();     /* k5 — teploty varu hydridů */
  initHt();     /* k5 — prohledávatelná tabulka hydridů */
  initHk();     /* k5 — LiAlH₄ vs NaBH₄ */
  initDr();     /* k5 — trenažér */
  initWm();     /* k6 — molekula vody a můstky */
  initDn();     /* k6 — anomálie hustoty */
  initOh();     /* k6 — ohřev a odpaření vody */
  initKw();     /* k7 — iontový součin vody */
  initTv();     /* k7 — kalkulačka tvrdosti */
  initZm();     /* k7 — metody úpravy vody */
  initPx();     /* k8 — geometrie H₂O₂ */
  initPr();     /* k8 — redoxní role peroxidu */
  initPk();     /* k8 — koncentrace peroxidu */
  drawMn1();    /* rychlokurz — mini-grafy */
  drawMn2();
  drawMn3();
}
