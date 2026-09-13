/* ============================================================
   T6 · WIDGET — zákon působení hmot (k2)
   ============================================================ */
var GW_RXN=[
 {name:"A + B ⇌ C", sp:[["A",-1],["B",-1],["C",1]], c:[1,1,0.2], Kexpr:"[C]/([A]·[B])"},
 {name:"2 NO₂ ⇌ N₂O₄", sp:[["NO₂",-2],["N₂O₄",1]], c:[1,0.2], Kexpr:"[N₂O₄]/[NO₂]²"},
 {name:"A ⇌ B", sp:[["A",-1],["B",1]], c:[1,0.2], Kexpr:"[B]/[A]"}
];
var gwState={i:0,k1:0.6,k2:0.3,c:[1,1,0.2]};
function gwQ(sp,c){ var q=1; sp.forEach(function(s,i){ q*=Math.pow(c[i],s[1]); }); return q; }
function gwRates(sp,c,k1,k2){
  var v1=k1, v2=k2;
  sp.forEach(function(s,i){ if(s[1]<0) v1*=Math.pow(c[i],-s[1]); else v2*=Math.pow(c[i],s[1]); });
  return [v1,v2];
}
/* najde rozsah ξ, při němž Q(c+νξ)=K — bisekce (Q je v ξ rostoucí) */
function solveXi(sp,c,K){
  var lo=-1e9, hi=1e9;
  sp.forEach(function(s,i){ if(s[1]<0) hi=Math.min(hi,c[i]/(-s[1])); else if(s[1]>0) lo=Math.max(lo,-c[i]/s[1]); });
  lo+=1e-12; hi-=1e-12;
  if(hi<=lo) return 0;
  for(var it=0;it<120;it++){
    var m=(lo+hi)/2, cm=c.map(function(x,i){return x+sp[i][1]*m;});
    var q=gwQ(sp,cm);
    if(q>K) hi=m; else lo=m;
  }
  return (lo+hi)/2;
}
function drawGW(){
  var r=GW_RXN[gwState.i], sp=r.sp, c=gwState.c, k1=gwState.k1, k2=gwState.k2, K=k1/k2;
  var v=gwRates(sp,c,k1,k2), Q=gwQ(sp,c);
  var W=760,H=230,L=170,R=690;
  var vmax=Math.max(v[0],v[1],1e-9), s='';
  function bar(y,val,lab,col,formula){
    var w=(val/vmax)*(R-L);
    s+=txt(L-12,y+16,lab,{anchor:"end",size:12.5,w:600,fill:col});
    s+=txt(L-12,y+31,formula,{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true});
    s+=rect(L,y,R-L,26,{fill:"var(--surface-2)",r:6});
    s+=rect(L,y,w,26,{fill:col,r:6});
    s+=txt(L+w+8,y+17,fmt(val,3),{size:12,w:600,fill:col,mono:true});
  }
  var f1="k₁"+sp.filter(function(x){return x[1]<0;}).map(function(x){return "·c("+x[0]+")"+(x[1]<-1?supN(-x[1]):"");}).join("");
  var f2="k₋₁"+sp.filter(function(x){return x[1]>0;}).map(function(x){return "·c("+x[0]+")"+(x[1]>1?supN(x[1]):"");}).join("");
  bar(34,v[0],"v₁ přímá","var(--exo)",f1);
  bar(92,v[1],"v₂ zpětná","var(--endo)",f2);
  var rel=Math.abs(v[0]-v[1])/vmax;
  var verdict = rel<0.03 ? "v₁ ≈ v₂ — ROVNOVÁHA" : (v[0]>v[1] ? "v₁ > v₂ → čistá přeměna DOPRAVA (Q < K)" : "v₂ > v₁ → čistá přeměna DOLEVA (Q > K)");
  var vc = rel<0.03 ? "var(--ok)" : "var(--accent)";
  s+=rect(L,150,R-L,44,{fill:vc,r:8,style:"fill-opacity:.12"});
  s+=txt((L+R)/2,171,verdict,{anchor:"middle",size:13,w:700,fill:vc});
  s+=txt((L+R)/2,188,"Q = "+fmt(Q,3)+"   ·   K = k₁/k₋₁ = "+fmt(K,3),{anchor:"middle",size:11.5,fill:"var(--ink-2)",mono:true});
  s+=txt(L,H-8,"délka pruhu = okamžitá rychlost (mol·dm⁻³·s⁻¹); rovnováha = stejně dlouhé pruhy",{size:10.5,fill:"var(--ink-3)"});
  $("#gwWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Porovnání rychlostí přímé a zpětné reakce"');

  $("#gwK1V").textContent=fmt(k1,2); $("#gwK2V").textContent=fmt(k2,2);
  ["#gwC1V","#gwC2V","#gwC3V"].forEach(function(id,i){ if(sp[i]) $(id).textContent=fmt(c[i],2); });
  function ro(id,k,v_,h){ $(id).innerHTML='<span class="k">'+k+'</span><span class="v">'+v_+'</span><span class="h">'+h+'</span>'; }
  ro("#gwRoV","Rychlosti","v₁ = "+fmt(v[0],3)+"<br>v₂ = "+fmt(v[1],3),"mol·dm⁻³·s⁻¹");
  ro("#gwRoQ","Kvocient <span class='q'>Q</span> = "+r.Kexpr,fmt(Q,3),Q<K*0.97?"Q < K":(Q>K*1.03?"Q > K":"Q = K"));
  ro("#gwRoK","<span class='q'>K</span> = <span class='q'>k</span>₁/<span class='q'>k</span>₋₁",fmt(K,3),"rovnovážná konstanta");
  var vd=$("#gwVerdict"); vd.innerHTML = rel<0.03 ? '<span class="tag ok">✓ rovnováha</span>' : '<span class="tag warn">mimo rovnováhu</span>';
}
function initGW(){
  var sel=$("#gwRxn");
  sel.innerHTML=GW_RXN.map(function(r,i){return '<option value="'+i+'">'+r.name+'</option>';}).join("");
  function applyRxn(){
    var r=GW_RXN[gwState.i]; gwState.c=r.c.slice();
    ["#gwL1","#gwL2","#gwL3"].forEach(function(id,i){ if(r.sp[i]) $(id).textContent="c("+r.sp[i][0]+")"; });
    $("#gwCtl3").style.display = r.sp.length>2 ? "" : "none";
    ["#gwC1","#gwC2","#gwC3"].forEach(function(id,i){ if(r.sp[i]){ $(id).max=2; $(id).value=r.c[i]; } });
  }
  sel.addEventListener("change",function(){ gwState.i=+sel.value; applyRxn(); drawGW(); });
  $("#gwK1").addEventListener("input",function(){ gwState.k1=+this.value; drawGW(); });
  $("#gwK2").addEventListener("input",function(){ gwState.k2=+this.value; drawGW(); });
  ["#gwC1","#gwC2","#gwC3"].forEach(function(id,i){
    $(id).addEventListener("input",function(){ gwState.c[i]=+this.value; drawGW(); });
  });
  $("#gwEq").addEventListener("click",function(){
    var r=GW_RXN[gwState.i], xi=solveXi(r.sp,gwState.c,gwState.k1/gwState.k2);
    gwState.c=gwState.c.map(function(x,i){ return Math.max(0,x+r.sp[i][1]*xi); });
    ["#gwC1","#gwC2","#gwC3"].forEach(function(id,i){ if(r.sp[i]){ var e=$(id); e.max=Math.max(2,Math.ceil(gwState.c[i]*100)/100); e.value=gwState.c[i]; } });
    drawGW(); toast("Koncentrace posunuty do rovnováhy (ξ = "+fmt(xi,3)+").");
  });
  applyRxn(); drawGW();
}

/* ============================================================
   T7 · WIDGET — stavitel výrazu K (k3)
   ============================================================ */
var kbI=0;
function kbSide(list){ return list.map(function(x){ return (x[1]===1?"":x[1]+" ")+x[0]+"("+(x[2]==="lm"?"l":x[2])+")"; }).join(" + "); }
function kbTerm(x,mode){
  var inc = (x[2]==="g"||x[2]==="aq"||x[2]==="lm");
  if(!inc) return null;
  var base = mode==="p" ? "p("+x[0]+")" : "["+x[0]+"]";
  return base+(x[1]>1?supN(x[1]):"");
}
function kbExpr(r,mode){
  var num=r.R.map(function(x){return kbTerm(x,mode);}).filter(Boolean).join(" · ");
  var den=r.L.map(function(x){return kbTerm(x,mode);}).filter(Boolean).join(" · ");
  if(!num&&!den) return "—";
  if(!den) return num;
  if(!num) return fracHTML("1",den);
  return fracHTML(num,den);
}
function drawKB(){
  var r=KRXN[kbI];
  $("#kbEq").innerHTML='<span class="chem">'+kbSide(r.L)+' ⇌ '+kbSide(r.R)+'</span>';
  var gases=r.L.concat(r.R).filter(function(x){return x[2]==="g";});
  var omitted=r.L.concat(r.R).filter(function(x){return x[2]==="s"||x[2]==="l";});
  var dn=r.R.filter(function(x){return x[2]==="g";}).reduce(function(a,x){return a+x[1];},0)-r.L.filter(function(x){return x[2]==="g";}).reduce(function(a,x){return a+x[1];},0);
  $("#kbKc").innerHTML="K<sub>c</sub> = "+kbExpr(r,"c");
  var nonGas=r.L.concat(r.R).some(function(x){return x[2]==="aq"||x[2]==="lm";});
  if(gases.length && !nonGas) $("#kbKp").innerHTML="K<sub>p</sub> = "+kbExpr(r,"p")+'<br><span style="font-size:.8rem;color:var(--ink-3);font-family:var(--f-ui)">parciální tlaky relativní (p/p°), Δn(g) = '+sgn(dn,0)+' → K<sub>p</sub> = K<sub>c</sub>·(c°RT/p°)<sup>'+sgn(dn,0)+'</sup>'+(dn===0?" = K<sub>c</sub>":"")+'</span>';
  else $("#kbKp").innerHTML='<span style="font-family:var(--f-ui);color:var(--ink-2)">K<sub>p</sub> tu nemá smysl — v&nbsp;reakci '+(gases.length?"nejsou jen plyny":"není žádný plyn")+'. Používá se '+(r.name.indexOf("stříbr")>=0?"K<sub>s</sub>":(r.name.indexOf("amoniaku ve")>=0?"K<sub>b</sub>":(r.name.indexOf("Autoprot")>=0?"K<sub>w</sub>":"K<sub>c</sub>")))+'.</span>';
  var notes='<span class="eyebrow">Co si u&nbsp;tohoto zápisu uvědomit</span><p>';
  if(omitted.length) notes+='<b>Do výrazu se nepíše:</b> '+omitted.map(function(x){return x[0]+" ("+(x[2]==="s"?"pevná látka":"čistá kapalina / rozpouštědlo")+")";}).join(", ")+' — jejich aktivita je 1.<br>';
  else notes+='<b>Píší se všechny látky</b> — jde o&nbsp;homogenní soustavu, nic není pevné ani rozpouštědlo.<br>';
  var exps=r.L.concat(r.R).filter(function(x){return x[1]>1&&(x[2]!=="s"&&x[2]!=="l");});
  if(exps.length) notes+='<b>Koeficienty jako exponenty:</b> '+exps.map(function(x){return x[1]+" "+x[0]+" → ["+x[0]+"]"+supN(x[1]);}).join(", ")+'.<br>';
  notes+=r.note+'</p>';
  $("#kbNotes").innerHTML=notes;
  function ro(id,k,v,h){ $(id).innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#kbRoK","Hodnota <span class='q'>K</span>",sci(r.K),"při "+r.KT+(r.dH!==null?" · ΔH = "+sgn(r.dH,1)+" kJ·mol⁻¹":""));
  ro("#kbRoDn","Δ<span class='q'>n</span>(g)",gases.length?sgn(dn,0):"—",gases.length?(dn===0?"tlak složení neovlivní":(dn<0?"vyšší tlak → doprava":"vyšší tlak → doleva")):"žádné plyny");
  ro("#kbRoType","Typ rovnováhy",omitted.length?"Heterogenní":"Homogenní",omitted.length?"více fází":"jedna fáze");
  $("#kbTrans").innerHTML=
    '<tr><td><b>Obrácená</b> reakce</td><td class="chem">'+kbSide(r.R)+' ⇌ '+kbSide(r.L)+'</td><td class="n">1/K = '+sci(1/r.K)+'</td></tr>'+
    '<tr><td><b>Vynásobená</b> dvěma</td><td class="chem">'+kbSide(r.L.map(function(x){return [x[0],x[1]*2,x[2]];}))+' ⇌ '+kbSide(r.R.map(function(x){return [x[0],x[1]*2,x[2]];}))+'</td><td class="n">K² = '+sci(r.K*r.K)+'</td></tr>'+
    '<tr><td><b>Vydělená</b> dvěma</td><td class="chem">'+kbSide(r.L.map(function(x){return [x[0],x[1]/2,x[2]];}))+' ⇌ '+kbSide(r.R.map(function(x){return [x[0],x[1]/2,x[2]];}))+'</td><td class="n">√K = '+sci(Math.sqrt(r.K))+'</td></tr>';
}
function initKB(){
  var sel=$("#kbRxn");
  sel.innerHTML=KRXN.map(function(r,i){return '<option value="'+i+'">'+(i+1)+". "+r.name+'</option>';}).join("");
  sel.addEventListener("change",function(){ kbI=+sel.value; drawKB(); });
  drawKB();
}

/* ============================================================
   T8 · TRENAŽÉR — napiš K (k3)
   ============================================================ */
var KT=[
 {r:"2 SO₂(g) + O₂(g) ⇌ 2 SO₃(g)", o:["[SO₃]² / ([SO₂]² · [O₂])","2[SO₃] / (2[SO₂] · [O₂])","[SO₂]² · [O₂] / [SO₃]²","[SO₃] / ([SO₂] · [O₂])"], c:0,
  e:"Produkty nahoře, koeficienty jako <b>exponenty</b>. Zápis s „2·“ před koncentrací je nejčastější chyba — koeficient násobí rychlost, ne koncentraci ve výrazu K. Obrácený zlomek by byl K zpětné reakce."},
 {r:"CaCO₃(s) ⇌ CaO(s) + CO₂(g)", o:["[CaO] · [CO₂] / [CaCO₃]","[CO₂] / [CaCO₃]","[CO₂]","[CaO] · [CO₂]"], c:2,
  e:"Obě pevné látky mají konstantní „koncentraci“ a&nbsp;do výrazu se <b>nepíší</b>. Zbývá jediný člen: rovnovážná koncentrace (nebo tlak) CO₂. Proto rovnovážný tlak CO₂ nad vápencem nezávisí na tom, kolik vápence v&nbsp;peci je."},
 {r:"NH₃(aq) + H₂O(l) ⇌ NH₄⁺(aq) + OH⁻(aq)", o:["[NH₄⁺] · [OH⁻] / ([NH₃] · [H₂O])","[NH₄⁺] · [OH⁻] / [NH₃]","[NH₃] / ([NH₄⁺] · [OH⁻])","([NH₄⁺] + [OH⁻]) / [NH₃]"], c:1,
  e:"Voda je rozpouštědlo ve velkém nadbytku, její koncentrace se nemění a&nbsp;je schovaná v&nbsp;konstantě K<sub>b</sub>. Koncentrace se ve výrazu <b>násobí</b>, nikdy nesčítají."},
 {r:"CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g)", o:["[CO₂] · [H₂] / [CO]","[CO₂] / [CO]","[CO] · [H₂O] / ([CO₂] · [H₂])","[CO₂] · [H₂] / ([CO] · [H₂O])"], c:3,
  e:"Tady je voda <b>plyn</b> (pára) a&nbsp;reaguje — píše se jako každý jiný reaktant. Vynechává se jen kapalná voda jako rozpouštědlo. Obrácený zlomek popisuje zpětnou reakci."},
 {r:"Fe³⁺(aq) + SCN⁻(aq) ⇌ [FeSCN]²⁺(aq)", o:["[FeSCN²⁺] / ([Fe³⁺] · [SCN⁻])","[Fe³⁺] · [SCN⁻] / [FeSCN²⁺]","[FeSCN²⁺] / ([Fe³⁺] + [SCN⁻])","[FeSCN²⁺]² / ([Fe³⁺]³ · [SCN⁻])"], c:0,
  e:"Homogenní reakce v&nbsp;roztoku, všechny látky rozpuštěné, všechny koeficienty 1. Náboje iontů (3+, 2+) <b>nejsou</b> exponenty — to je past z&nbsp;poslední možnosti."},
 {r:"AgCl(s) ⇌ Ag⁺(aq) + Cl⁻(aq)", o:["[Ag⁺] · [Cl⁻] / [AgCl]","[Ag⁺] + [Cl⁻]","[Ag⁺] · [Cl⁻]","1 / ([Ag⁺] · [Cl⁻])"], c:2,
  e:"Sraženina je pevná látka a&nbsp;vypadne. Zbývá součin koncentrací iontů — <b>součin rozpustnosti</b> K<sub>s</sub> = 1,8·10⁻¹⁰. Převrácená hodnota by byla K srážení, tedy opačné reakce."},
 {r:"N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g) — tlaková konstanta K<sub>p</sub>", o:["2p(NH₃) / (p(N₂) · 3p(H₂))","p(NH₃)² / (p(N₂) · p(H₂)³)","p(NH₃)² / (p(N₂) · p(H₂))","p(N₂) · p(H₂)³ / p(NH₃)²"], c:1,
  e:"Stejný tvar jako K<sub>c</sub>, jen s&nbsp;relativními parciálními tlaky. Trojka u&nbsp;vodíku musí být v&nbsp;<b>exponentu</b>; vynechat ji je druhá nejčastější chyba po „násobení koeficientem“."},
 {r:"CH₃COOH(l) + C₂H₅OH(l) ⇌ CH₃COOC₂H₅(l) + H₂O(l) — bezvodá směs", o:["[ester] / ([kyselina] · [alkohol])","[kyselina] · [alkohol] / ([ester] · [H₂O])","[ester] / [kyselina]","[ester] · [H₂O] / ([kyselina] · [alkohol])"], c:3,
  e:"Voda tu <b>není rozpouštědlem</b> — vzniká jako produkt v&nbsp;bezvodé směsi a&nbsp;její koncentrace během reakce roste od nuly. Proto se píše. Vynechat ji je nejčastější chyba u&nbsp;esterifikace."},
 {r:"C(s) + H₂O(g) ⇌ CO(g) + H₂(g)", o:["[CO] · [H₂] / ([C] · [H₂O])","[CO] · [H₂] / [H₂O]","[CO] · [H₂]","[H₂O] / ([CO] · [H₂])"], c:1,
  e:"Uhlík je pevný a&nbsp;vypadne, ale vodní pára je plynný reaktant a&nbsp;<b>zůstává</b> ve jmenovateli. Vynechat obojí by bylo příliš — pára se během reakce spotřebovává."},
 {r:"2 H₂O(l) ⇌ H₃O⁺(aq) + OH⁻(aq)", o:["[H₃O⁺] · [OH⁻] / [H₂O]²","[H₃O⁺] · [OH⁻] / (2[H₂O])","[H₃O⁺] · [OH⁻]","[H₃O⁺] + [OH⁻]"], c:2,
  e:"Voda je zároveň reaktant i&nbsp;rozpouštědlo — a&nbsp;jako rozpouštědlo z&nbsp;výrazu vypadne (její koncentrace 55,5 mol·dm⁻³ se autoprotolýzou nezmění). Zbude iontový součin vody K<sub>w</sub> = 1,0·10⁻¹⁴."}
];
var ktI=0, ktScore=0, ktAnswered=false;
function drawKT(){
  var it=KT[ktI];
  $("#ktQn").textContent=ktI+1; $("#ktQtot").textContent=KT.length; $("#ktScore").textContent=ktScore;
  $("#ktRxn").innerHTML='<span class="chem" style="font-size:1.1rem">'+it.r+'</span>';
  $("#ktOpts").innerHTML=it.o.map(function(o,i){
    return '<button class="btn" type="button" data-kt="'+i+'" style="justify-content:flex-start;text-align:left;font-family:var(--f-mono);font-size:.92rem;padding:.7rem .9rem">'+
      '<span class="tag" style="margin-right:.5rem">'+String.fromCharCode(65+i)+'</span>K = '+o+'</button>';
  }).join("");
  var ex=$("#ktExplain"); ex.style.display="none"; ex.className="explain";
  $("#ktNext").disabled=true; ktAnswered=false;
  $$("#ktOpts button").forEach(function(b){
    b.addEventListener("click",function(){
      if(ktAnswered) return; ktAnswered=true;
      var pick=+b.dataset.kt, ok=pick===it.c;
      if(ok) ktScore++;
      $("#ktScore").textContent=ktScore;
      $$("#ktOpts button").forEach(function(x){ x.disabled=true; var i=+x.dataset.kt; if(i===it.c){ x.style.borderColor="var(--ok)"; x.style.background="var(--ok-soft)"; } else if(i===pick){ x.style.borderColor="var(--bad)"; x.style.background="var(--bad-soft)"; } else x.style.opacity=".55"; });
      ex.style.display="flex"; ex.style.background=ok?"var(--ok-soft)":"var(--bad-soft)"; ex.style.borderColor=ok?"var(--ok)":"var(--bad)";
      ex.innerHTML='<span class="verdict" style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+(ok?"✓ Správně":"✕ Špatně — správně je "+String.fromCharCode(65+it.c))+'</span><span class="eyebrow">Proč</span><div>'+it.e+'</div>';
      $("#ktNext").disabled = ktI>=KT.length-1;
      if(ktI>=KT.length-1){ toast("Trenažér dokončen: "+ktScore+" z "+KT.length+" správně."); if(ktScore>=7) markDone("k3"); }
    });
  });
}
function initKT(){
  $("#ktNext").addEventListener("click",function(){ if(ktI<KT.length-1){ ktI++; drawKT(); } });
  $("#ktRestart").addEventListener("click",function(){ ktI=0; ktScore=0; drawKT(); });
  drawKT();
}
