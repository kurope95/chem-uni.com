/* ============================================================
   23 · PŘEKRESLENÍ VŠEHO (např. po změně motivu)
   ============================================================ */
function redrawAll(){
  try{ drawHero(); drawNB(); drawCmp(); drawAr(); }catch(e){}
  try{ drawRiv(); drawBE(); drawSh(); }catch(e){}
  try{ drawCh(); drawPen(); drawDose(); }catch(e){}
  try{ drawHl(); drawMiniRiver(); drawMiniShield(); drawMiniDecay(); }catch(e){}
}
window.redrawAll = redrawAll;

/* ============================================================
   24 · NAVÁZÁNÍ OVLÁDACÍCH PRVKŮ
   ============================================================ */
function bind(){
  $("#heroHl").addEventListener("input",function(){ heroState.hl=+this.value; drawHero(); });
  $("#heroT").addEventListener("input",function(){ heroState.t=+this.value; drawHero(); });
  $$("#heroScale button").forEach(function(b){ b.addEventListener("click",function(){ heroState.scale=b.dataset.v; drawHero(); }); });

  $("#nbZ").addEventListener("input",function(){ nbState.Z=+this.value; if(nbState.Q>nbState.Z) { nbState.Q=nbState.Z; $("#nbQ").value=nbState.Q; } drawNB(); });
  $("#nbN").addEventListener("input",function(){ nbState.N=+this.value; drawNB(); });
  $("#nbQ").addEventListener("input",function(){ nbState.Q=Math.min(+this.value,nbState.Z); this.value=nbState.Q; drawNB(); });

  [["Z1",$("#cmpZ1")],["N1",$("#cmpN1")],["Z2",$("#cmpZ2")],["N2",$("#cmpN2")]].forEach(function(p){
    p[1].addEventListener("input",function(){ cmpState[p[0]]=+this.value; drawCmp(); });
  });
  $$("#cmpPre button").forEach(function(b){
    b.addEventListener("click",function(){
      var v=b.dataset.v.split(",").map(Number);
      cmpState.Z1=v[0]; cmpState.N1=v[1]; cmpState.Z2=v[2]; cmpState.N2=v[3];
      $("#cmpZ1").value=v[0]; $("#cmpN1").value=v[1]; $("#cmpZ2").value=v[2]; $("#cmpN2").value=v[3];
      $$("#cmpPre button").forEach(function(x){ x.setAttribute("aria-pressed", x===b); });
      drawCmp();
    });
  });

  $$("#penMode button").forEach(function(b){ b.addEventListener("click",function(){ penMode=b.dataset.v; drawPen(); }); });
  $$("#doseScale button").forEach(function(b){ b.addEventListener("click",function(){ doseScale=b.dataset.v; drawDose(); }); });
  $("#hlN").addEventListener("input",function(){ hlN=+this.value; drawHl(); });
}

/* ============================================================
   25 · INICIALIZACE
   ============================================================ */
function initAll(){
  drawHero(); drawNB(); drawCmp();
  initAr(); initRiv(); initBE(); initSh(); initTr(); initCh();
  drawPen(); drawDose(); initDc(); drawHl(); initNt();
  drawMiniRiver(); drawMiniShield(); drawMiniDecay();
}
