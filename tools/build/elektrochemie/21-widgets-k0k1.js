/* ============================================================
   9 · TRENAŽÉR OXIDAČNÍCH ČÍSEL (k0)
   ============================================================ */
var onI=0, onScore=0, onAnswered=false;
function drawOxn(){
  var it=OXN[onI];
  $("#onQn").textContent=onI+1; $("#onQtot").textContent=OXN.length; $("#onScore").textContent=onScore;
  $("#onTask").innerHTML='Jaké oxidační číslo má <b style="color:var(--accent)">'+it.at+'</b> v&nbsp;<span class="chem" style="font-size:1.25rem">'+it.f+'</span>?';
  $("#onOpts").innerHTML=it.o.map(function(o,i){ return '<button class="btn" type="button" data-oi="'+i+'" style="font-family:var(--f-mono);font-size:1rem">'+o+'</button>'; }).join("");
  var ex=$("#onExplain"); ex.style.display="none"; ex.className="explain";
  $("#onNext").disabled=true; onAnswered=false;
  $$("#onOpts button").forEach(function(b){
    b.addEventListener("click",function(){
      if(onAnswered) return; onAnswered=true;
      var ok=+b.dataset.oi===it.c; if(ok) onScore++;
      $("#onScore").textContent=onScore;
      ex.style.display="flex"; ex.style.background=ok?"var(--ok-soft)":"var(--bad-soft)"; ex.style.borderColor=ok?"var(--ok)":"var(--bad)";
      ex.innerHTML='<span class="verdict" style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+(ok?"✓ Správně":"✕ Špatně — správně je "+it.o[it.c])+'</span><span class="eyebrow">Proč</span><div>'+it.e+'</div>';
      $$("#onOpts button").forEach(function(x){ x.disabled=true; x.style.opacity=+x.dataset.oi===it.c?"1":".45"; if(+x.dataset.oi===it.c){ x.style.borderColor="var(--ok)"; x.style.color="var(--ok)"; } });
      $("#onNext").disabled = onI>=OXN.length-1;
      if(onI>=OXN.length-1){ toast("Trenažér dokončen: "+onScore+" z "+OXN.length+" správně."); if(onScore>=11) markDone("k0"); }
    });
  });
}
function initOxn(){
  $("#onNext").addEventListener("click",function(){ if(onI<OXN.length-1){ onI++; drawOxn(); } });
  $("#onReset").addEventListener("click",function(){ onI=0; onScore=0; drawOxn(); });
  drawOxn();
}

/* ============================================================
   10 · TRENAŽÉR ČINIDEL (k0)
   ============================================================ */
var agI=0, agScore=0, agAnswered=false;
function drawAgt(){
  var it=AGT[agI];
  $("#agQn").textContent=agI+1; $("#agQtot").textContent=AGT.length; $("#agScore").textContent=agScore;
  $("#agRxn").innerHTML='<span class="chem" style="font-size:1.12rem">'+it.r+'</span>';
  $("#agQ").innerHTML=it.q;
  $("#agOpts").innerHTML=it.o.map(function(o,i){ return '<button class="btn" type="button" data-oi="'+i+'" style="white-space:normal;line-height:1.3;text-align:left;justify-content:flex-start">'+o+'</button>'; }).join("");
  var ex=$("#agExplain"); ex.style.display="none"; ex.className="explain";
  $("#agNext").disabled=true; agAnswered=false;
  $$("#agOpts button").forEach(function(b){
    b.addEventListener("click",function(){
      if(agAnswered) return; agAnswered=true;
      var ok=+b.dataset.oi===it.c; if(ok) agScore++;
      $("#agScore").textContent=agScore;
      ex.style.display="flex"; ex.style.background=ok?"var(--ok-soft)":"var(--bad-soft)"; ex.style.borderColor=ok?"var(--ok)":"var(--bad)";
      ex.innerHTML='<span class="verdict" style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+(ok?"✓ Správně":"✕ Špatně — správně: "+it.o[it.c])+'</span><span class="eyebrow">Proč</span><div>'+it.e+'</div>';
      $$("#agOpts button").forEach(function(x){ x.disabled=true; x.style.opacity=+x.dataset.oi===it.c?"1":".45"; if(+x.dataset.oi===it.c){ x.style.borderColor="var(--ok)"; x.style.color="var(--ok)"; } });
      $("#agNext").disabled = agI>=AGT.length-1;
      if(agI>=AGT.length-1){ toast("Trenažér dokončen: "+agScore+" z "+AGT.length+" správně."); if(agScore>=9) markDone("k0"); }
    });
  });
}
function initAgt(){
  $("#agNext").addEventListener("click",function(){ if(agI<AGT.length-1){ agI++; drawAgt(); } });
  $("#agReset").addEventListener("click",function(){ agI=0; agScore=0; drawAgt(); });
  drawAgt();
}

/* ============================================================
   11 · KROKOVÝ ŘEŠITEL VYČÍSLOVÁNÍ (k1)
   ============================================================ */
var blI=0, blPos=1;
function drawBal(){
  var t=BAL[blI], n=t.steps.length;
  $("#blTot").textContent=n; $("#blPos").textContent=blPos;
  $("#blTarget").innerHTML='<span style="color:var(--ink-3)">vyčíslit:</span> <span class="chem">'+t.target+'</span>';
  var h="";
  for(var i=0;i<blPos;i++){
    var st=t.steps[i], last=(i===n-1);
    h+='<div class="step" style="padding:.7rem .85rem;border:1px solid '+(last?"var(--ok)":"var(--line)")+';border-radius:10px;background:'+(last?"var(--ok-soft)":"var(--surface-2)")+'">'+
       '<span class="step-n">'+(i+1)+'</span><div class="step-b"><p style="font-family:var(--f-ui);font-weight:600;font-size:.92rem">'+st[0]+'</p><p style="font-size:.95rem;line-height:1.65">'+st[1]+'</p></div></div>';
  }
  $("#blSteps").innerHTML=h;
  $("#blPrev").disabled = blPos<=1;
  $("#blNext").disabled = blPos>=n;
  if(blPos>=n) markDone("k1");
}
function initBal(){
  var sel=$("#blSel");
  sel.innerHTML=BAL.map(function(t,i){ return '<option value="'+i+'">'+(i+1)+". "+t.name+'</option>'; }).join("");
  sel.addEventListener("change",function(){ blI=+sel.value; blPos=1; drawBal(); });
  $("#blNext").addEventListener("click",function(){ if(blPos<BAL[blI].steps.length){ blPos++; drawBal(); } });
  $("#blPrev").addEventListener("click",function(){ if(blPos>1){ blPos--; drawBal(); } });
  $("#blAll").addEventListener("click",function(){ blPos=BAL[blI].steps.length; drawBal(); });
  drawBal();
}
