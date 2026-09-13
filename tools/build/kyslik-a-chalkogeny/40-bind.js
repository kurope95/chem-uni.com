/* ============================================================
   21 · PŘEKRESLENÍ VŠEHO (např. po změně motivu)
   ============================================================ */
function redrawAll(){
  try{ refreshGroup(); }catch(e){}
  try{ refreshHyd(); }catch(e){}
  try{ refreshOxo(); }catch(e){}
  try{ refreshMO(); }catch(e){}
  try{ refreshOz(); }catch(e){}
  try{ drawOxidTable(); }catch(e){}
  try{ refreshHp(); }catch(e){}
  try{ refreshSulf(); }catch(e){}
  try{ drawSulfTable(); }catch(e){}
  try{ refreshSh(); }catch(e){}
  try{ refreshCp(); }catch(e){}
  try{ refreshEm(); }catch(e){}
  try{ refreshOa(); }catch(e){}
  try{ refreshSt(); }catch(e){}
  try{ drawMinis(); }catch(e){}
}
window.redrawAll = redrawAll;

/* ============================================================
   22 · NAVÁZÁNÍ SPOLEČNÝCH OVLÁDACÍCH PRVKŮ
   Posluchače jednotlivých modelů se připojují v jejich init*()
   funkcích — selecty se totiž musí nejdřív naplnit daty.
   ============================================================ */
function bind(){
  $$('.timeplan a').forEach(function(a){
    a.addEventListener("click",function(){
      var t=document.querySelector(a.getAttribute("href"));
      if(!t) return;
      $$(".sblock").forEach(function(b){ b.style.outline=""; });
      t.style.outline="2px solid var(--accent)";
      t.style.outlineOffset="8px";
      setTimeout(function(){ t.style.outline=""; },1600);
    });
  });
}

/* ============================================================
   23 · PRVNÍ VYKRESLENÍ VŠECH MODELŮ
   ============================================================ */
function initAll(){
  initGroup();      /* hero — průzkumník skupiny 16 */
  initHyd();        /* k0 — srovnávač chalkogenovodíků */
  initOxo();        /* k1 — oxidační čísla kyslíku */
  initTrn();        /* k1 — trenažér oxidačních čísel */
  initMO();         /* k2 — MO diagram řady O₂ⁿ */
  initOz();         /* k2 — ozonová vrstva */
  initOxidTable();  /* k3 — tabulka oxidů */
  initHp();         /* k3 — dvojí role peroxidu vodíku */
  initSulf();       /* k4 — síra při zahřívání */
  initSulfTable();  /* k5 — tabulka sulfidů */
  initSh();         /* k5 — tvary sloučenin síry */
  initCp();         /* k6 — kontaktní proces */
  initEm();         /* k6 — emise a odsíření */
  initOa();         /* k7 — oxokyseliny síry */
  initSad();        /* k7 — trenažér zředěná/koncentrovaná */
  initSt();         /* k8 — těžké chalkogeny */
  drawMinis();      /* rychlokurz — mini-grafy */
}
