/* ============================================================
   T9 · GRAF — stupeň konverze vs. K (k4)
   ============================================================ */
var alState={mode:"ab",lgK:0,lgC:0};
function alphaOf(mode,K,c0){
  if(mode==="ab") return K/(1+K);
  if(mode==="a2b") return (-K+Math.sqrt(K*K+16*c0*K))/(8*c0);
  var a=4*c0*K+1; return (a-Math.sqrt(a*a-16*c0*c0*K*K))/(4*c0*K);
}
function drawAL(){
  var mode=alState.mode, K=Math.pow(10,alState.lgK), c0=Math.pow(10,alState.lgC);
  var W=760,H=330,L=64,R=700,T0=30,B=270;
  var x=function(lg){ return L+(lg+3)/6*(R-L); }, y=function(a){ return B-a*(B-T0); };
  var s='';
  for(var e=-3;e<=3;e++){ s+=line(x(e),T0,x(e),B,{c:"var(--line)",w:1}); s+=txt(x(e),B+18,"10"+supN(e),{anchor:"middle",size:11,fill:"var(--ink-3)",mono:true}); }
  for(var a=0;a<=1.001;a+=0.25){ s+=line(L,y(a),R,y(a),{c:"var(--line)",w:1}); s+=txt(L-8,y(a)+4,fmt(a*100,0)+" %",{anchor:"end",size:11,fill:"var(--ink-3)",mono:true}); }
  s+=line(L,B,R,B,{c:"var(--line-strong)",w:1.5}); s+=line(L,T0-6,L,B,{c:"var(--line-strong)",w:1.5});
  s+=txt((L+R)/2,B+38,"rovnovážná konstanta K (logaritmická osa)",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.06em;text-transform:uppercase"});
  s+=txt(18,(T0+B)/2,"stupeň konverze α",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:18px "+((T0+B)/2)+"px;letter-spacing:.06em"});
  var cs=[0.01,0.1,1,10], cols=["var(--cat3)","var(--cat2)","var(--cat1)","var(--cat4)"];
  var leg='';
  if(mode!=="ab"){
    cs.forEach(function(cc,i){
      var pts=[]; for(var lg=-3;lg<=3.001;lg+=0.05){ pts.push(x(lg).toFixed(1)+","+y(alphaOf(mode,Math.pow(10,lg),cc)).toFixed(1)); }
      s+='<polyline points="'+pts.join(" ")+'" style="fill:none;stroke:'+cols[i]+';stroke-width:1.6;stroke-dasharray:5 4;opacity:.8"/>';
      leg+='<span class="li"><span class="sw" style="background:'+cols[i]+'"></span>c₀ = '+fmt(cc,2)+' mol·dm⁻³</span>';
    });
  }
  var pts2=[]; for(var lg2=-3;lg2<=3.001;lg2+=0.05){ pts2.push(x(lg2).toFixed(1)+","+y(alphaOf(mode,Math.pow(10,lg2),c0)).toFixed(1)); }
  s+='<polyline points="'+pts2.join(" ")+'" style="fill:none;stroke:var(--accent);stroke-width:3;stroke-linejoin:round"/>';
  leg='<span class="li"><span class="sw" style="background:var(--accent)"></span>aktuální c₀ = '+fmt(c0,2)+' mol·dm⁻³</span>'+leg;
  var al=alphaOf(mode,K,c0);
  s+=line(x(alState.lgK),T0,x(alState.lgK),B,{c:"var(--ink-3)",w:1,dash:"3 4"});
  s+=line(L,y(al),x(alState.lgK),y(al),{c:"var(--ink-3)",w:1,dash:"3 4"});
  s+='<circle cx="'+x(alState.lgK).toFixed(1)+'" cy="'+y(al).toFixed(1)+'" r="6.5" style="fill:var(--accent);stroke:var(--surface);stroke-width:2.5"/>';
  s+=txt(x(alState.lgK)+(alState.lgK>1.5?-10:10),y(al)-12,"α = "+fmt(al*100,1)+" %",{anchor:alState.lgK>1.5?"end":"start",size:12.5,w:700,fill:"var(--accent)"});
  var title = mode==="ab" ? "A ⇌ B: α = K/(1+K) — na c₀ nezáleží" : (mode==="a2b" ? "A ⇌ 2 B: K = 4α²c₀/(1−α) — zředění zvyšuje α" : "2 A ⇌ B: K = α/(2c₀(1−α)²) — zředění snižuje α");
  s+=txt(L,18,title,{size:12,w:600,fill:"var(--ink)"});
  $("#alWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Stupeň konverze v závislosti na K"');
  $("#alLegend").innerHTML=leg;
  $("#alKV").textContent=sci(K); $("#alC0V").textContent=fmt(c0,2)+" mol·dm⁻³";
  $$("#alMode button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===mode); });
  function ro(id,k,v,h){ $(id).innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#alRoA","Stupeň konverze <span class='q'>α</span>",fmt(al*100,1)+" %","zreaguje z výchozí látky");
  ro("#alRoK","<span class='q'>K</span>",sci(K),"c₀ = "+fmt(c0,2)+" mol·dm⁻³");
  var rd = al>0.99 ? ["Prakticky úplná","„nevratná“ reakce"] : (al<0.01 ? ["Prakticky neprobíhá","stopy produktu"] : ["Měřitelná rovnováha","obě strany přítomné"]);
  ro("#alRoInt","Čtení",rd[0],rd[1]);
}
function initAL(){
  $$("#alMode button").forEach(function(b){ b.addEventListener("click",function(){ alState.mode=b.dataset.v; drawAL(); }); });
  $("#alK").addEventListener("input",function(){ alState.lgK=+this.value; drawAL(); });
  $("#alC0").addEventListener("input",function(){ alState.lgC=+this.value; drawAL(); });
  drawAL();
}

/* ============================================================
   T10 · WIDGET — řešitel ICE tabulky (k4)
   ============================================================ */
var ICE_TASKS=[
 {name:"H₂ + I₂ ⇌ 2 HI, K = 50 (448 °C) — libovolné počáteční koncentrace", K:50,
  ctl:[["c₀(H₂)",0,2,0.05,1],["c₀(I₂)",0,2,0.05,1],["c₀(HI)",0,2,0.05,0]],
  eq:"H₂(g) + I₂(g) ⇌ 2 HI(g)   K_c = [HI]²/([H₂]·[I₂]) = 50"},
 {name:"Esterifikace, K = 4 — vliv nadbytku alkoholu", K:4,
  ctl:[["n(kyselina) [mol]",0.5,3,0.1,1],["n(alkohol) [mol]",0.5,10,0.1,1]],
  eq:"CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O   K = [ester]·[H₂O]/([kys.]·[alk.]) = 4"},
 {name:"N₂O₄ ⇌ 2 NO₂, K_p = 0,148 (25 °C) — vliv celkového tlaku", K:0.148,
  ctl:[["celkový tlak p [bar]",0.1,10,0.1,1]],
  eq:"N₂O₄(g) ⇌ 2 NO₂(g)   K_p = p(NO₂)²/p(N₂O₄) = 0,148"},
 {name:"PCl₅ ⇌ PCl₃ + Cl₂, K_c = 0,042 (250 °C) — vliv počáteční koncentrace", K:0.042,
  ctl:[["c₀(PCl₅) [mol·dm⁻³]",0.01,1,0.01,0.1]],
  eq:"PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)   K_c = [PCl₃]·[Cl₂]/[PCl₅] = 0,042"}
];
var iceState={i:0,v:[1,1,0]};
function iceRow(lbl,cells){ return '<tr><td><b>'+lbl+'</b></td>'+cells.map(function(c){return '<td class="n">'+c+'</td>';}).join("")+'</tr>'; }
function iceStep(html){ return '<p class="eq" style="margin:0">'+html+'</p>'; }
function quadRoots(a,b,c){ var D=b*b-4*a*c; if(D<0) return null; var r=Math.sqrt(D); return [(-b-r)/(2*a),(-b+r)/(2*a),D]; }
function drawICE(){
  var t=ICE_TASKS[iceState.i], v=iceState.v, K=t.K, steps=[], ro=[], note="", head=[], rows=[];
  $("#iceEq").innerHTML='<span class="chem">'+t.eq+'</span>';
  t.ctl.forEach(function(c,i){ $(["#iceAV","#iceBV","#iceCV"][i]).textContent=fmt(v[i],2); });
  if(iceState.i===0){
    var a=v[0],b=v[1],c=v[2];
    head=["","H₂","I₂","HI"];
    rows.push(iceRow("Počáteční",[fmt(a,2),fmt(b,2),fmt(c,2)]));
    rows.push(iceRow("Změna",["−x","−x","+2x"]));
    rows.push(iceRow("Rovnovážná",[fmt(a,2)+" − x",fmt(b,2)+" − x",fmt(c,2)+" + 2x"]));
    var sp=[["H₂",-1],["I₂",-1],["HI",2]], x=solveXi(sp,[a,b,c],K);
    var qa=4-K, qb=4*c+K*(a+b), qc=c*c-K*a*b;
    steps.push(iceStep("K = ("+fmt(c,2)+" + 2x)² / (("+fmt(a,2)+" − x)("+fmt(b,2)+" − x)) = 50"));
    steps.push(iceStep("roznásobeno: ("+fmt(qa,0)+")·x² + ("+fmt(qb,2)+")·x + ("+fmt(qc,2)+") = 0"));
    var r=quadRoots(qa,qb,qc);
    if(r){ steps.push(iceStep("D = "+fmt(r[2],3)+" → x₁ = "+fmt(r[0],4)+", x₂ = "+fmt(r[1],4)+" — fyzikální je kořen, při němž žádná koncentrace neklesne pod nulu: <b>x = "+fmt(x,4)+"</b>")); }
    var eqc=[a-x,b-x,c+2*x];
    steps.push(iceStep("[H₂] = "+fmt(eqc[0],3)+"; [I₂] = "+fmt(eqc[1],3)+"; [HI] = "+fmt(eqc[2],3)+" mol·dm⁻³ &nbsp;·&nbsp; kontrola: "+fmt(eqc[2],3)+"²/("+fmt(eqc[0],3)+"·"+fmt(eqc[1],3)+") = "+fmt(eqc[2]*eqc[2]/(eqc[0]*eqc[1]),1)));
    var lim=Math.min(a,b);
    ro=[["Rozsah reakce x",sgn(x,4),x<0?"záporné = HI se rozkládá":"kladné = HI vzniká"],
        ["Rovnovážné složení","H₂ "+fmt(eqc[0],2)+" · I₂ "+fmt(eqc[1],2)+" · HI "+fmt(eqc[2],2),"mol·dm⁻³"],
        ["Stupeň přeměny", x>0&&lim>0 ? fmt(100*x/lim,1)+" % ("+(a<=b?"H₂":"I₂")+")" : (c>0?fmt(-200*x/c,1)+" % HI rozloženo":"—"), x>0?"vztaženo k látce v nedostatku":"start z produktu"]];
    note="Zkuste nadbytek jodu: c₀(I₂) = 2,00 při c₀(H₂) = 1,00 zvedne přeměnu vodíku ze 78 % na 93 %. A&nbsp;zkuste start z&nbsp;čistého HI (2,00; ostatní 0) — dostanete stejné složení jako z&nbsp;1,00 + 1,00: rovnováha nezávisí na směru.";
  } else if(iceState.i===1){
    var ka=v[0], kb=v[1];
    head=["","kyselina","alkohol","ester","voda"];
    rows.push(iceRow("Počáteční [mol]",[fmt(ka,2),fmt(kb,2),"0","0"]));
    rows.push(iceRow("Změna",["−x","−x","+x","+x"]));
    rows.push(iceRow("Rovnovážná",[fmt(ka,2)+" − x",fmt(kb,2)+" − x","x","x"]));
    var qa2=K-1, qb2=-K*(ka+kb), qc2=K*ka*kb, r2=quadRoots(qa2,qb2,qc2), lim2=Math.min(ka,kb);
    var x2=r2?(r2[0]>0&&r2[0]<lim2?r2[0]:r2[1]):0;
    steps.push(iceStep("K = x² / (("+fmt(ka,2)+" − x)("+fmt(kb,2)+" − x)) = 4 &nbsp;⟹&nbsp; x² = 4·("+fmt(ka,2)+" − x)("+fmt(kb,2)+" − x)"));
    steps.push(iceStep("("+fmt(qa2,0)+")·x² + ("+fmt(qb2,2)+")·x + ("+fmt(qc2,2)+") = 0"));
    if(r2) steps.push(iceStep("D = "+fmt(r2[2],3)+" → x₁ = "+fmt(r2[0],4)+", x₂ = "+fmt(r2[1],4)+" — smysl dává jen kořen menší než "+fmt(lim2,2)+" mol: <b>x = "+fmt(x2,4)+"</b>"));
    steps.push(iceStep("výtěžek esteru = x / n(limitující) = "+fmt(x2,3)+" / "+fmt(lim2,2)+" = <b>"+fmt(100*x2/lim2,1)+" %</b> &nbsp;·&nbsp; kontrola: "+fmt(x2,3)+"²/("+fmt(ka-x2,3)+"·"+fmt(kb-x2,3)+") = "+fmt(x2*x2/((ka-x2)*(kb-x2)),2)));
    ro=[["Vznikne esteru",fmt(x2,3)+" mol","= vody"],
        ["Výtěžek esteru",fmt(100*x2/lim2,1)+" %","vztaženo k látce v nedostatku ("+(ka<=kb?"kyselina":"alkohol")+")"],
        ["Stupeň přeměny","kys. "+fmt(100*x2/ka,1)+" % · alk. "+fmt(100*x2/kb,1)+" %","nadbytek se přemění málo"]];
    note="Nechte 1 mol kyseliny a&nbsp;táhněte alkoholem od 1 do 10 mol: výtěžek stoupá 66,7 → 84,5 → 90,3 → 97,4 %. K je pořád 4 — mění se jen to, odkud jsme vyšli. Tohle je Le Chatelier v&nbsp;číslech.";
  } else if(iceState.i===2){
    var p=v[0], al=Math.sqrt(K/(K+4*p));
    head=["","N₂O₄","NO₂","celkem"];
    rows.push(iceRow("Počáteční [mol]",["1","0","1"]));
    rows.push(iceRow("Změna",["−α","+2α","+α"]));
    rows.push(iceRow("Rovnovážná",["1 − α","2α","1 + α"]));
    rows.push(iceRow("Molární zlomek",["(1−α)/(1+α)","2α/(1+α)","1"]));
    rows.push(iceRow("Parciální tlak [bar]",[fmt(p*(1-al)/(1+al),3),fmt(p*2*al/(1+al),3),fmt(p,2)]));
    steps.push(iceStep("K_p = p(NO₂)²/p(N₂O₄) = [2α/(1+α)]²·p² / [(1−α)/(1+α)]·p = 4α²p/(1 − α²)"));
    steps.push(iceStep("α = √[K_p/(K_p + 4p)] = √[0,148/(0,148 + 4·"+fmt(p,2)+")] = √"+fmt(K/(K+4*p),4)+" = <b>"+fmt(al,3)+"</b>"));
    steps.push(iceStep("kontrola: 4·"+fmt(al,3)+"²·"+fmt(p,2)+"/(1 − "+fmt(al,3)+"²) = "+fmt(4*al*al*p/(1-al*al),3)));
    ro=[["Stupeň disociace α",fmt(100*al,1)+" %","při p = "+fmt(p,2)+" bar"],
        ["Molární zlomek NO₂",fmt(2*al/(1+al),3),"barva plynu ∝ p(NO₂) = "+fmt(p*2*al/(1+al),3)+" bar"],
        ["K_p","0,148","nemění se s tlakem — mění se jen α"]];
    note="Snižte tlak z&nbsp;1 bar na 0,1 bar: α vyskočí z&nbsp;19 % na 52 %. Zvyšte na 10 bar: klesne na 6 %. Δn(g) = +1, takže nižší tlak podporuje disociaci — přesně podle Le Chateliera, ale tady to vidíte spočítané z&nbsp;K_p, které je pořád stejné.";
  } else {
    var c0=v[0], r3=quadRoots(1,K,-K*c0), x3=r3?r3[1]:0;
    head=["","PCl₅","PCl₃","Cl₂"];
    rows.push(iceRow("Počáteční",[fmt(c0,3),"0","0"]));
    rows.push(iceRow("Změna",["−x","+x","+x"]));
    rows.push(iceRow("Rovnovážná",[fmt(c0,3)+" − x","x","x"]));
    steps.push(iceStep("K = x² / ("+fmt(c0,3)+" − x) = 0,042 &nbsp;⟹&nbsp; x² + 0,042·x − "+fmt(K*c0,5)+" = 0"));
    if(r3) steps.push(iceStep("x = [−0,042 + √(0,042² + 4·"+fmt(K*c0,5)+")] / 2 = [−0,042 + "+fmt(Math.sqrt(r3[2]),4)+"] / 2 = <b>"+fmt(x3,4)+"</b> (záporný kořen "+fmt(r3[0],4)+" nemá smysl)"));
    steps.push(iceStep("α = x/c₀ = "+fmt(x3,4)+"/"+fmt(c0,3)+" = <b>"+fmt(100*x3/c0,1)+" %</b> &nbsp;·&nbsp; kontrola: "+fmt(x3,4)+"²/"+fmt(c0-x3,4)+" = "+fmt(x3*x3/(c0-x3),4)));
    ro=[["Stupeň disociace α",fmt(100*x3/c0,1)+" %","při c₀ = "+fmt(c0,3)+" mol·dm⁻³"],
        ["Rovnovážné složení","PCl₅ "+fmt(c0-x3,4)+" · PCl₃ "+fmt(x3,4)+" · Cl₂ "+fmt(x3,4),"mol·dm⁻³"],
        ["Zanedbání x ≪ c₀?", (x3/c0<0.05?"ano (x < 5 % c₀)":"NE — x je "+fmt(100*x3/c0,0)+" % z c₀"), "přiblížení x ≈ √(K·c₀) = "+fmt(Math.sqrt(K*c0),4)]];
    note="Táhněte koncentrací od 1,00 dolů k&nbsp;0,01 mol·dm⁻³: stupeň disociace stoupá z&nbsp;18 % na 83 %. Stejné K, jiná konverze — u&nbsp;reakcí s&nbsp;Δn &gt; 0 zředění vždy podporuje rozklad. Všimněte si, kdy přestane platit zanedbání x ≪ c₀.";
  }
  $("#iceHead").innerHTML=head.map(function(h,i){return '<th'+(i?' class="n"':'')+'>'+h+'</th>';}).join("");
  $("#iceTable").innerHTML=rows.join("");
  $("#iceSteps").innerHTML=steps.join("");
  ["#iceRo1","#iceRo2","#iceRo3"].forEach(function(id,i){ $(id).innerHTML='<span class="k">'+ro[i][0]+'</span><span class="v" style="font-size:1.05rem">'+ro[i][1]+'</span><span class="h">'+ro[i][2]+'</span>'; });
  $("#iceNote").innerHTML=note;
}
function initICE(){
  var sel=$("#iceTask");
  sel.innerHTML=ICE_TASKS.map(function(t,i){return '<option value="'+i+'">'+(i+1)+". "+t.name+'</option>';}).join("");
  var ids=["#iceA","#iceB","#iceC"], ctls=["#iceCtlA","#iceCtlB","#iceCtlC"], labs=["#iceLA","#iceLB","#iceLC"];
  function applyTask(){
    var t=ICE_TASKS[iceState.i]; iceState.v=[];
    ids.forEach(function(id,i){
      var c=t.ctl[i]; $(ctls[i]).style.display = c ? "" : "none";
      if(c){ var e=$(id); e.min=c[1]; e.max=c[2]; e.step=c[3]; e.value=c[4]; $(labs[i]).textContent=c[0]; iceState.v[i]=c[4]; }
    });
  }
  sel.addEventListener("change",function(){ iceState.i=+sel.value; applyTask(); drawICE(); });
  ids.forEach(function(id,i){ $(id).addEventListener("input",function(){ iceState.v[i]=+this.value; drawICE(); }); });
  applyTask(); drawICE();
}
