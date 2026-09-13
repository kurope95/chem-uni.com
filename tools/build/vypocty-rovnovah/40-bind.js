/* ============================================================
   T21 · PŘEKRESLENÍ VŠEHO (po změně motivu) + NAVÁZÁNÍ OVLÁDÁNÍ
   ============================================================ */
function redrawAll(){
  try{ drawHero(); }catch(e){}
  try{ drawLog(); }catch(e){}
  try{ drawDil(); drawMix(); }catch(e){}
  try{ drawWeak(); drawKa(); drawSalt(); }catch(e){}
  try{ drawBuffer(); drawTitr(); }catch(e){}
  try{ drawKsp(); drawKt(); drawQ(); drawCi(); drawPh(); }catch(e){}
  try{ drawCb(); drawCx(); drawDs(); }catch(e){}
  try{ drawMiniScale(); drawMiniTitr(); drawMiniCi(); }catch(e){}
}
window.redrawAll = redrawAll;

/* Posluchače všech ovládacích prvků připojují funkce init*, protože
   každý widget si je registruje spolu se svým prvním vykreslením. */
function bind(){
  initHero();        /* hero — univerzální kalkulačka pH */
  initLog();         /* k0 — logaritmická lišta + trenažér log */
  initStrong();      /* k1 — zředěné roztoky, smíchání */
  initWeak();        /* k2, k3 — aproximace, tabulka Ka, soli */
  initBufferTitr();  /* k4, k5 — pufr a titrační křivka */
  initKsp();         /* k6 — Ksp, tabulka, Q, společný iont, pH */
  initCplx();        /* k7 — β, volný kov, rozpouštění komplexací */
  initForm();        /* k8 — trenažér „který vzorec použít“ */
}

function initAll(){
  drawMiniScale();
  drawMiniTitr();
  drawMiniCi();
}
