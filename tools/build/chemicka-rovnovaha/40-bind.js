/* ============================================================
   T18 · PŘEKRESLENÍ VŠEHO (např. po změně motivu)
   ============================================================ */
function redrawAll(){
  try{ drawHero(); }catch(e){}
  try{ drawPM(); }catch(e){}
  try{ drawDG(); }catch(e){}
  try{ drawGX(); }catch(e){}
  try{ drawGW(); }catch(e){}
  try{ drawKB(); }catch(e){}
  try{ drawAL(); }catch(e){}
  try{ drawICE(); }catch(e){}
  try{ drawVH(); }catch(e){}
  try{ drawHB(); }catch(e){}
  try{ drawLC(); }catch(e){}
  try{ drawIND(); }catch(e){}
  try{ drawMiniRates(); }catch(e){}
  try{ drawMiniKG(); }catch(e){}
  try{ drawMiniShift(); }catch(e){}
}
window.redrawAll = redrawAll;

/* ============================================================
   T19 · NAVÁZÁNÍ OVLÁDACÍCH PRVKŮ
   ============================================================ */
function bind(){
  /* hero, k0–k6: posluchače si každý widget připojuje ve své init* funkci
     (select, range i segmented), aby ovládání a kreslení zůstalo pohromadě.
     Tady zůstává jen to, co se váže napříč modely. */
  $$(".segmented").forEach(function(g){
    g.addEventListener("click",function(ev){
      var b=ev.target.closest("button"); if(!b||!g.contains(b)) return;
      $$("button",g).forEach(function(x){ x.setAttribute("aria-pressed", x===b ? "true":"false"); });
    });
  });
}

/* ============================================================
   T20 · SPUŠTĚNÍ VŠECH MODELŮ
   ============================================================ */
function initAll(){
  initHero();
  initPM();
  initGW();
  initKB();
  initKT();
  initAL();
  initICE();
  initVH();
  initHB();
  initLC();
  initSH();
  initIND();
  /* modely bez vlastního init* — posluchače a první vykreslení */
  $("#dgG").addEventListener("input",function(){ dgState.G=+this.value; drawDG(); });
  $("#dgT").addEventListener("input",function(){ dgState.T=+this.value; drawDG(); });
  drawDG();
  $("#gxG").addEventListener("input",function(){ gxState.G=+this.value; drawGX(); });
  $("#gxXi").addEventListener("input",function(){ gxState.xi=+this.value; drawGX(); });
  drawGX();
  drawMiniRates(); drawMiniKG(); drawMiniShift();
}
