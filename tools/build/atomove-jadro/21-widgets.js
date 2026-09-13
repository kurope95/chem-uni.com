/* ============================================================
   13 · WIDGET — posunové zákony na mapě
   ============================================================ */
var SH_PARENTS=[[92,238,0,"α"],[88,226,0,"α"],[84,210,0,"α"],[94,239,0,"α"],[6,14,0,"β⁻"],[27,60,0,"β⁻"],[55,137,0,"β⁻"],[1,3,0,"β⁻"],[90,234,0,"β⁻"],[9,18,0,"β⁺"],[11,22,0,"β⁺"],[15,30,0,"β⁺"],[19,40,0,"EC"],[4,7,0,"EC"],[53,125,0,"EC"],[43,99,1,"γ"],[36,87,2,"n"],[2,5,0,"n"]];
var shState={i:0,t:"α"};
function shDaughter(Z,A,t){ var d=SHIFT[t]; return {Z:Z+d[0],A:A+d[1]}; }
function drawSh(){
  var p=SH_PARENTS[shState.i], Z=p[0], A=p[1], m=p[2], t=shState.t, real=p[3];
  var d=shDaughter(Z,A,t), N=A-Z, dN=d.A-d.Z;
  var ok = d.Z>=1 && d.A>=d.Z && d.A>=1;
  var W=440,H=300,L=56,R=410,T0=24,B=256;
  var z0=Z-3, z1=Z+3, n0=N-4, n1=N+3;
  var x=function(z){ return L+(z-z0)/(z1-z0)*(R-L); }, y=function(n){ return B-(n-n0)/(n1-n0)*(B-T0); };
  var s='';
  for(var z=z0;z<=z1;z++){ s+=line(x(z),T0,x(z),B,{c:"var(--line)",w:1}); s+=txt(x(z),B+15,z>=1?z:"",{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true}); }
  for(var n=n0;n<=n1;n++){ s+=line(L,y(n),R,y(n),{c:"var(--line)",w:1}); s+=txt(L-6,y(n)+4,n>=0?n:"",{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true}); }
  /* stabilní v okolí */
  STABLE_LIST.forEach(function(q){ if(q.Z>=z0&&q.Z<=z1&&q.N>=n0&&q.N<=n1) s+='<circle cx="'+x(q.Z)+'" cy="'+y(q.N)+'" r="4" style="fill:var(--ok);fill-opacity:.55"/>'; });
  var col = t==="α"?"var(--exo)":(t==="β⁻"?"var(--endo)":(t==="γ"?"var(--cat2)":(t==="n"?"var(--cat3)":"var(--cat1)")));
  /* šipka */
  if(t!=="γ" && ok){
    var x1=x(Z),y1=y(N),x2=x(d.Z),y2=y(dN);
    var ang=Math.atan2(y2-y1,x2-x1), sh=12;
    var xe=x2-sh*Math.cos(ang), ye=y2-sh*Math.sin(ang);
    s+=line(x1,y1,xe,ye,{c:col,w:3,cap:"round"});
    s+='<path d="M'+x2+' '+y2+' L'+(x2-14*Math.cos(ang-0.45))+' '+(y2-14*Math.sin(ang-0.45))+' L'+(x2-14*Math.cos(ang+0.45))+' '+(y2-14*Math.sin(ang+0.45))+' z" style="fill:'+col+'"/>';
  } else if(t==="γ"){
    s+='<circle cx="'+x(Z)+'" cy="'+y(N)+'" r="16" style="fill:none;stroke:'+col+';stroke-width:2;stroke-dasharray:3 3"/>';
    s+=txt(x(Z)+20,y(N)-18,"jen deexcitace",{size:11,w:600,fill:col});
  }
  s+='<circle cx="'+x(Z)+'" cy="'+y(N)+'" r="7" style="fill:var(--ink);stroke:var(--surface);stroke-width:2"/>';
  s+=txt(x(Z)+10,y(N)+(t==="β⁻"||t==="n"?18:-10),nucTxt(Z,A,m===1)+(m===2?"*":""),{size:12.5,w:700,fill:"var(--ink)"});
  if(ok && t!=="γ"){
    s+='<circle cx="'+x(d.Z)+'" cy="'+y(dN)+'" r="7" style="fill:'+col+';stroke:var(--surface);stroke-width:2"/>';
    s+=txt(x(d.Z)+10,y(dN)+(t==="β⁻"||t==="n"?-10:18),nucTxt(d.Z,d.A),{size:12.5,w:700,fill:col});
  }
  s+=txt((L+R)/2,B+30,"Z →",{anchor:"middle",size:11,w:600,fill:"var(--ink-3)"});
  s+=txt(14,(T0+B)/2,"N ↑",{anchor:"middle",size:11,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:14px "+((T0+B)/2)+"px"});
  $("#shWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Posun nuklidu na mapě při přeměně"');
  $$("#shType button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===t); });
  var partR = {"α":' + <span class="chem"><sup>4</sup><sub>2</sub>He</span>', "β⁻":' + <span class="chem"><sup>0</sup><sub>−1</sub>e</span> + ν̄', "β⁺":' + <span class="chem"><sup>0</sup><sub>+1</sub>e</span> + ν', "EC":' + ν', "γ":' + γ', "n":' + <span class="chem"><sup>1</sup><sub>0</sub>n</span>'}[t];
  var partL = t==="EC" ? ' + <span class="chem"><sup>0</sup><sub>−1</sub>e</span>' : '';
  var parentHTML = nucHTML(Z,A,m===1)+(m===2?"*":"");
  if(!ok){
    $("#shEq").innerHTML=parentHTML+partL+" → <b style='color:var(--bad)'>nelze</b> — takové jádro (Z = "+d.Z+", A = "+d.A+") neexistuje.";
  } else {
    $("#shEq").innerHTML=parentHTML+partL+" → "+nucHTML(d.Z,d.A)+partR;
  }
  function ro(id,k,v,h){ $(id).innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  var sZ=SHIFT[t][0], sA=SHIFT[t][1];
  ro("#shRo1","ΔZ",sZ===0?"0":(sZ>0?"+"+sZ:"−"+(-sZ)),sZ===0?"prvek se nemění":(sZ>0?"o "+sZ+" doprava v tabulce":"o "+(-sZ)+" doleva v tabulce"));
  ro("#shRo2","ΔA",sA===0?"0":(sA>0?"+"+sA:"−"+(-sA)),sA===0?"nukleonové číslo stejné (izobar)":"A klesá o "+(-sA));
  ro("#shRo3","ΔN",(sA-sZ)===0?"0":((sA-sZ)>0?"+"+(sA-sZ):"−"+(sZ-sA)),t==="β⁻"?"neutron → proton":(t==="β⁺"||t==="EC"?"proton → neutron":(t==="α"?"2 n odletí v částici α":(t==="n"?"neutron odletí":"nic"))));
  var bal = ok ? "Σ A: "+A+" = "+d.A+" + "+(A-d.A)+" ✓ &nbsp;&nbsp;·&nbsp;&nbsp; Σ Z: "+Z+(t==="EC"?" + (−1)":"")+" = "+d.Z+" + "+(t==="EC"?"0":(Z-d.Z))+" ✓" : "Bilanci nelze uzavřít — mateřské jádro je pro tuto přeměnu příliš lehké.";
  $("#shBal").innerHTML=bal;
  var note = "";
  if(t===real) note="<b>"+DECAY_NAMES[t]+"</b> je skutečná přeměna nuklidu "+nucTxt(Z,A,m===1)+". Vyzáří se "+DECAY_PART[t]+". ";
  else note="Pozor: "+nucTxt(Z,A,m===1)+" se ve skutečnosti přeměňuje <b>"+real+"</b>; typ „"+t+"“ je tu jen jako cvičení posunového zákona. ";
  if(ok && isStable(d.Z,d.A)) note+="Dceřiný nuklid "+nucTxt(d.Z,d.A)+" je <b>stabilní</b> — tady přeměny končí.";
  else if(ok){ var rn=findNucl(d.Z,d.A); note+= rn ? "Dceřiný "+nucTxt(d.Z,d.A)+" je sám radioaktivní ("+rn.d+", "+rn.hl+") — přeměny pokračují." : "Dceřiný nuklid "+nucTxt(d.Z,d.A)+" není v naší tabulce; poloha vůči řece napoví, co udělá dál."; }
  $("#shNote").innerHTML=note;
}
function initSh(){
  var sel=$("#shSel");
  sel.innerHTML=SH_PARENTS.map(function(p,i){ return '<option value="'+i+'">'+nucTxt(p[0],p[1],p[2]===1)+(p[2]===2?"*":"")+' — '+elName(p[0])+' (skutečná přeměna: '+p[3]+')</option>'; }).join("");
  sel.addEventListener("change",function(){ shState.i=+sel.value; shState.t=SH_PARENTS[shState.i][3]; drawSh(); });
  $$("#shType button").forEach(function(b){ b.addEventListener("click",function(){ shState.t=b.dataset.v; drawSh(); }); });
  drawSh();
}

/* ============================================================
   14 · WIDGET — trenažér zápisu přeměn
   ============================================================ */
var trSet=[], trI=0, trScore=0, trAnswered=false;
function trShuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
function trBuild(){
  trSet=trShuffle(TRAIN).slice(0,10).map(function(p){
    var d=SHIFT[p.t], cZ=p.Z+d[0], cA=p.A+d[1];
    var opts=[{Z:cZ,A:cA,ok:true}];
    SHIFT_WRONG[p.t].forEach(function(w){
      var Z=p.Z+w[0], A=p.A+w[1];
      if(Z<1||Z>103||A<Z||A<1) { Z=cZ+1; A=cA+1; }
      if(!opts.some(function(o){return o.Z===Z&&o.A===A;})) opts.push({Z:Z,A:A,ok:false});
    });
    while(opts.length<4){ var Zx=cZ+opts.length, Ax=cA+opts.length; if(!opts.some(function(o){return o.Z===Zx&&o.A===Ax;})) opts.push({Z:Zx,A:Ax,ok:false}); }
    return {p:p,opts:trShuffle(opts)};
  });
  trI=0; trScore=0;
}
function drawTr(){
  var q=trSet[trI], p=q.p;
  $("#trQn").textContent=trI+1; $("#trQtot").textContent=trSet.length; $("#trScore").textContent=trScore;
  var parent=nucHTML(p.Z,p.A,p.m)+(p.x?"*":"");
  var lead = {"α":"přeměna α","β⁻":"přeměna β⁻","β⁺":"přeměna β⁺","EC":"elektronový záchyt","γ":"emise γ (deexcitace izomeru)","n":"emise neutronu"}[p.t];
  $("#trTask").innerHTML='<span style="font-family:var(--f-cond);font-weight:600;font-size:.95rem;color:var(--ink-3);letter-spacing:.06em">'+lead+'</span><br><span class="chem" style="font-size:1.35rem">'+parent+(p.t==="EC"?' + e⁻':'')+' → <b style="color:var(--accent)">?</b>'+
    (p.t==="α"?' + ⁴₂He':(p.t==="β⁻"?' + e⁻ + ν̄':(p.t==="β⁺"?' + e⁺ + ν':(p.t==="EC"?' + ν':(p.t==="γ"?' + γ':' + ¹₀n')))))+'</span>';
  $("#trOpts").innerHTML=q.opts.map(function(o,i){
    return '<button class="btn" type="button" data-opt="'+i+'" style="font-size:1.05rem;min-height:52px">'+nucHTML(o.Z,o.A)+'<span style="font-family:var(--f-ui);font-weight:400;font-size:.8rem;color:var(--ink-3);margin-left:.5rem">'+elName(o.Z)+'</span></button>';
  }).join("");
  var ex=$("#trExplain"); ex.style.display="none"; ex.className="explain";
  $("#trNext").disabled=true; trAnswered=false;
  $$("#trOpts button").forEach(function(b){
    b.addEventListener("click",function(){
      if(trAnswered) return; trAnswered=true;
      var o=q.opts[+b.dataset.opt], ok=o.ok;
      if(ok) trScore++;
      $("#trScore").textContent=trScore;
      var d=SHIFT[p.t], cZ=p.Z+d[0], cA=p.A+d[1];
      var expl='Posunový zákon pro '+lead+': ΔZ = '+(d[0]>0?"+":"")+d[0]+', ΔA = '+(d[1]>0?"+":"")+d[1]+'. Tedy Z = '+p.Z+' '+(d[0]>=0?"+ "+d[0]:"− "+(-d[0]))+' = <b>'+cZ+'</b> → '+elName(cZ)+' ('+elSym(cZ)+'); A = '+p.A+' '+(d[1]>=0?"+ "+d[1]:"− "+(-d[1]))+' = <b>'+cA+'</b>. Správně: '+nucHTML(cZ,cA)+'.';
      if(!ok){
        var wz=o.Z-p.Z, wa=o.A-p.A;
        expl+=' Vaše volba '+nucHTML(o.Z,o.A)+' odpovídá posunu ΔZ = '+(wz>0?"+":"")+wz+', ΔA = '+(wa>0?"+":"")+wa+' — '+(wz===-d[0]&&d[0]!==0?'znaménko Z obráceně':(wa!==d[1]?'špatně změněné A':'špatné Z'))+'.';
      }
      ex.className="explain"; ex.style.display="flex";
      ex.style.background = ok?"var(--ok-soft)":"var(--bad-soft)"; ex.style.borderColor = ok?"var(--ok)":"var(--bad)";
      ex.innerHTML='<span class="verdict" style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+(ok?"✓ Správně":"✕ Špatně")+'</span><span class="eyebrow">Proč</span><div>'+expl+'</div>';
      $$("#trOpts button").forEach(function(x,i){ x.disabled=true; x.style.opacity=q.opts[i].ok?"1":".5"; if(q.opts[i].ok){ x.style.borderColor="var(--ok)"; } });
      $("#trNext").disabled = trI>=trSet.length-1;
      if(trI>=trSet.length-1){
        toast("Trenažér dokončen: "+trScore+" z "+trSet.length+" správně.");
        if(trScore>=7) markDone("k3");
      }
    });
  });
}
function initTr(){
  trBuild();
  $("#trNext").addEventListener("click",function(){ if(trI<trSet.length-1){ trI++; drawTr(); } });
  $("#trRestart").addEventListener("click",function(){ trBuild(); drawTr(); toast("Nová sada deseti úloh."); });
  drawTr();
}

/* ============================================================
   15 · WIDGET — rozpadová řada krok za krokem
   ============================================================ */
var chState={c:0,step:0};
function drawCh(){
  var ch=CHAINS[chState.c], st=ch.steps, k=Math.min(chState.step,st.length-1);
  var W=760,H=400,L=60,R=730,T0=24,B=350;
  var z0=80,z1=94,n0=122,n1=148;
  var x=function(z){ return L+(z-z0)/(z1-z0)*(R-L); }, y=function(n){ return B-(n-n0)/(n1-n0)*(B-T0); };
  var s='';
  for(var z=z0;z<=z1;z++){ s+=line(x(z),T0,x(z),B,{c:"var(--line)",w:1}); s+=txt(x(z),B+15,z,{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true}); s+=txt(x(z),T0-8,elSym(z),{anchor:"middle",size:10.5,w:600,fill:"var(--ink-2)"}); }
  for(var n=n0;n<=n1;n+=2){ s+=line(L,y(n),R,y(n),{c:"var(--line)",w:1}); s+=txt(L-6,y(n)+4,n,{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true}); }
  s+=line(x(83.5),T0,x(83.5),B,{c:"var(--bad)",w:1.2,dash:"4 3"});
  s+=line(L,y(126),R,y(126),{c:"var(--accent)",w:1,dash:"2 4"}); s+=txt(R-4,y(126)-5,"N = 126 (magické)",{anchor:"end",size:10.5,fill:"var(--accent)"});
  s+=line(x(82),T0,x(82),B,{c:"var(--accent)",w:1,dash:"2 4"});
  /* celá řada slabě */
  for(var i=0;i<st.length-1;i++){
    s+=line(x(st[i][0]),y(st[i][1]-st[i][0]),x(st[i+1][0]),y(st[i+1][1]-st[i+1][0]),{c:"var(--line-strong)",w:1.5,dash:"3 3"});
  }
  /* provedené kroky */
  var na=0, nb=0;
  for(i=0;i<k;i++){
    var a=st[i], b=st[i+1], col=a[2]==="α"?"var(--exo)":"var(--endo)";
    if(a[2]==="α") na++; else nb++;
    var x1=x(a[0]),y1=y(a[1]-a[0]),x2=x(b[0]),y2=y(b[1]-b[0]);
    var ang=Math.atan2(y2-y1,x2-x1);
    s+=line(x1,y1,x2-9*Math.cos(ang),y2-9*Math.sin(ang),{c:col,w:3,cap:"round"});
    s+='<path d="M'+x2+' '+y2+' L'+(x2-11*Math.cos(ang-0.5))+' '+(y2-11*Math.sin(ang-0.5))+' L'+(x2-11*Math.cos(ang+0.5))+' '+(y2-11*Math.sin(ang+0.5))+' z" style="fill:'+col+'"/>';
  }
  st.forEach(function(p,i){
    var cur=i===k, done=i<k, last=i===st.length-1;
    var fill = last?"var(--ok)":(cur?"var(--ink)":(done?"var(--surface-3)":"var(--surface)"));
    s+='<circle cx="'+x(p[0])+'" cy="'+y(p[1]-p[0])+'" r="'+(cur?8:5.5)+'" style="fill:'+fill+';stroke:'+(cur?"var(--accent)":"var(--ink-3)")+';stroke-width:'+(cur?2.5:1.2)+'"/>';
    if(cur||i===0||last) s+=txt(x(p[0])+(p[0]>=92?-12:11),y(p[1]-p[0])-10,nucTxt(p[0],p[1]),{anchor:p[0]>=92?"end":"start",size:12.5,w:700,fill:cur?"var(--accent)":"var(--ink-2)"});
  });
  s+=txt((L+R)/2,B+34,"protonové číslo Z",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em;text-transform:uppercase"});
  s+=txt(14,(T0+B)/2,"neutronové číslo N",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:14px "+((T0+B)/2)+"px;letter-spacing:.08em;text-transform:uppercase"});
  $("#chWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Rozpadová řada na mapě nuklidů"');
  var cur=st[k], first=st[0], lastN=st[st.length-1];
  var totA=st.filter(function(p){return p[2]==="α";}).length, totB=st.filter(function(p){return p[2]==="β⁻";}).length;
  $("#chStepV").textContent=k+" z "+(st.length-1);
  $("#chStep").max=st.length-1; $("#chStep").value=k;
  function ro(id,k_,v,h){ $(id).innerHTML='<span class="k">'+k_+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#chRo1","Aktuální nuklid",nucTxtZ(cur[0],cur[1]),elName(cur[0])+" · "+(cur[2]==="stabilní"?"stabilní — konec řady":cur[2]+", t½ = "+cur[3]));
  ro("#chRo2","Přeměn "+"<span style='text-transform:none'>α</span>"+" zatím",na+" z "+totA,"každá: Z − 2, A − 4");
  ro("#chRo3","Přeměn "+"<span style='text-transform:none'>β⁻</span>"+" zatím",nb+" z "+totB,"každá: Z + 1, A stejné");
  if(cur[2]==="stabilní"){
    $("#chEq").innerHTML=nucHTML(cur[0],cur[1])+" je <b>stabilní</b>. Celkem: "+totA+" α a "+totB+" β⁻. Kontrola: ΔA = "+(first[1]-lastN[1])+" = 4·"+totA+" ✓; ΔZ = "+(first[0]-lastN[0])+" = 2·"+totA+" − "+totB+" ✓";
    $("#chNext").disabled=true;
  } else {
    var nx=st[k+1];
    $("#chEq").innerHTML=nucHTML(cur[0],cur[1])+" → "+nucHTML(nx[0],nx[1])+(cur[2]==="α"?' + <span class="chem"><sup>4</sup><sub>2</sub>He</span>':' + e⁻ + ν̄')+' &nbsp;<span style="color:var(--ink-3)">('+cur[2]+', t½ = '+cur[3]+')</span>';
    $("#chNext").disabled=false;
  }
  var note;
  if(k===0) note="Začátek: "+nucTxt(first[0],first[1])+" má poločas "+first[3]+" — proto na Zemi ještě je. Klikejte na „Další přeměna“; každá α je skok o (−2, −2), každá β⁻ krůček o (+1, −1).";
  else if(cur[2]==="stabilní") note="Konec řady: "+nucTxt(cur[0],cur[1])+" má Z = 82 (magické) — proto všechny přírodní řady končí u olova. Všechny členy mají A ≡ "+(first[1]%4)+" (mod 4), zkuste to ověřit.";
  else if(cur[0]===86) note="Radon "+nucTxt(cur[0],cur[1])+" je jediný plynný člen řady — uniká z hornin do domů. Poločas "+cur[3]+" mu stačí na to, aby se dostal z podloží do sklepa.";
  else if(cur[3].indexOf("μs")>=0||cur[3].indexOf("ms")>=0) note=nucTxt(cur[0],cur[1])+" žije jen "+cur[3]+" — v řadě jsou i nuklidy, které se přemění dřív, než je stihnete změřit. Rychlost celé řady určuje nejpomalejší krok: mateřský nuklid.";
  else note="Krok "+k+": "+nucTxt(cur[0],cur[1])+" ("+cur[2]+", "+cur[3]+"). Zatím "+na+" α a "+nb+" β⁻; do konce zbývá "+(totA-na)+" α a "+(totB-nb)+" β⁻.";
  $("#chNote").innerHTML=note;
}
function initCh(){
  var sel=$("#chSel");
  sel.innerHTML=CHAINS.map(function(c,i){ return '<option value="'+i+'">'+c.name+'</option>'; }).join("");
  sel.addEventListener("change",function(){ chState.c=+sel.value; chState.step=0; drawCh(); });
  $("#chStep").addEventListener("input",function(){ chState.step=+this.value; drawCh(); });
  $("#chNext").addEventListener("click",function(){ if(chState.step<CHAINS[chState.c].steps.length-1){ chState.step++; drawCh(); } });
  $("#chReset").addEventListener("click",function(){ chState.step=0; drawCh(); });
  drawCh();
}

/* ============================================================
   16 · WIDGET — propustnost záření
   ============================================================ */
var penMode="all";
function shieldSVG(W,H,mode,compact){
  var s='';
  var beams=[
    {k:"a",lab:"α",col:"var(--exo)",y:compact?60:74,stop:1,sub:"jádra He, +2, 4 u"},
    {k:"b",lab:"β",col:"var(--endo)",y:compact?110:140,stop:2,sub:"elektrony, −1"},
    {k:"g",lab:"γ",col:"var(--cat2)",y:compact?160:206,stop:9,sub:"fotony, bez náboje"},
    {k:"n",lab:"n",col:"var(--cat3)",y:compact?200:272,stop:4,sub:"neutrony, bez náboje, 1 u"}
  ];
  if(compact) beams=beams.slice(0,3);
  var bars=[{x:250,w:6,lab:"list papíru",sub:"0,1 mm",fill:"var(--surface-3)"},{x:380,w:14,lab:"hliníkový plech",sub:"3 mm",fill:"var(--line-strong)"},{x:520,w:26,lab:"olověná deska",sub:"5 cm",fill:"var(--ink-3)"},{x:650,w:44,lab:compact?"beton":"beton / parafin",sub:"50 cm",fill:"var(--ink-2)"}];
  if(compact) bars=bars.slice(0,3);
  var yTop=compact?36:44, yBot=compact?H-26:H-40;
  bars.forEach(function(b){
    s+=rect(b.x,yTop,b.w,yBot-yTop,{fill:b.fill,r:3});
    s+=txt(b.x+b.w/2,yBot+14,b.lab,{anchor:"middle",size:10.5,w:600,fill:"var(--ink-2)"});
    if(!compact) s+=txt(b.x+b.w/2,yBot+27,b.sub,{anchor:"middle",size:10,fill:"var(--ink-3)",mono:true});
  });
  /* zdroj */
  s+=rect(40,yTop+10,44,yBot-yTop-20,{fill:"var(--accent-soft)",r:8,stroke:"var(--accent)",sw:1.5});
  s+=txt(62,(yTop+yBot)/2+4,"zdroj",{anchor:"middle",size:10.5,w:600,fill:"var(--accent)"});
  beams.forEach(function(b){
    if(mode!=="all" && mode!==b.k) return;
    var x0=84, y=b.y;
    s+=txt(100,y-9,b.lab,{size:14,w:700,fill:b.col});
    if(!compact) s+=txt(122,y-9,b.sub,{size:10.5,fill:"var(--ink-3)"});
    /* segmenty: před každou bariérou */
    var xs=[x0].concat(bars.map(function(bb){return bb.x;})), xe=bars.map(function(bb){return bb.x+bb.w;}).concat([W-20]);
    var alive=true, w=3.2, opacity=1;
    for(var i=0;i<xs.length;i++){
      if(!alive) break;
      var x1=xs[i], x2=(i<bars.length)?bars[i].x:W-24;
      s+='<line x1="'+x1+'" y1="'+y+'" x2="'+x2+'" y2="'+y+'" style="stroke:'+b.col+';stroke-width:'+w+';stroke-linecap:round;opacity:'+opacity+'"/>';
      if(i<bars.length){
        var stopsHere = (b.k==="a"&&i===0)||(b.k==="b"&&i===1)||(b.k==="n"&&i===3);
        if(stopsHere){ alive=false; s+='<circle cx="'+(bars[i].x-4)+'" cy="'+y+'" r="4.5" style="fill:'+b.col+'"/>'; s+=txt(bars[i].x+bars[i].w+8,y+4,"zastaveno",{size:10.5,w:600,fill:b.col}); }
        else if(b.k==="g"){ if(i===2){ w=1.6; opacity=.6; } if(i===3){ w=0.9; opacity=.35; } }
        else if(b.k==="n"&&i===2){ w=2.6; }
      }
    }
    if(alive && b.k==="g") s+=txt(W-22,y+4,"jen zeslabeno",{anchor:"end",size:10.5,w:600,fill:b.col});
  });
  return s;
}
function drawPen(){
  var W=760,H=330;
  $("#penWrap").innerHTML=svg("0 0 "+W+" "+H,shieldSVG(W,H,penMode,false),'aria-label="Propustnost záření různými bariérami"');
  $$("#penMode button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===penMode); });
  var out={
    all:"Pronikavost roste α → β → γ ≈ n. Zvenku je tedy nejnebezpečnější <b>γ a neutrony</b> — projdou celým tělem. α zastaví mrtvá vrstva kůže, β pronikne jen milimetry (popáleniny kůže, poškození očí).",
    a:"Zvenku <b>neškodné</b>: dolet ve vzduchu 3–10 cm, zastaví ho papír i svrchní vrstva kůže. Zdroj α v ruce vás neozáří.",
    b:"Zvenku <b>středně nebezpečné</b>: pronikne 1–2 cm do tkáně, způsobí popáleniny kůže a poškození oční čočky. Zastaví ho plexisklo nebo pár mm hliníku.",
    g:"Zvenku <b>nejnebezpečnější</b>: projde celým tělem a ozáří všechny orgány. Stínění olovem nebo betonem ho jen zeslabí — každá polovrstva ubere polovinu, nula nikdy nenastane.",
    n:"Zvenku <b>velmi nebezpečné</b>: bez náboje projdou olovem skoro bez ztráty; zpomalí je jen látky s vodíkem (voda, parafin, beton) a pohltí kadmium nebo bor. Vyskytují se u reaktorů a urychlovačů."
  };
  var inn={
    all:"Zevnitř se pořadí obrací: <b>α je nejhorší</b> (w_R = 20, všechna energie na pár buňkách), β střední, γ nejmírnější — část energie odnese z těla ven.",
    a:"Zevnitř <b>nejnebezpečnější</b>: veškerou energii (MeV) odevzdá na dráze 40 μm — v jedné buňce. Váhový faktor 20. Radon a jeho dcery v plicích, ²¹⁰Po, ²³⁹Pu v kostech.",
    b:"Zevnitř <b>nebezpečné</b>: ⁹⁰Sr se ukládá v kostech místo vápníku, ¹³¹I ve štítné žláze. Dosah v tkáni milimetry — proto se β zářiče používají i k cílené terapii.",
    g:"Zevnitř <b>nejmírnější</b> z trojice: fotony velkou část energie odnesou z těla ven, aniž by ji uložily. Proto se γ zářiče (⁹⁹ᵐTc) používají k zobrazování — pacienta zatíží málo.",
    n:"Zevnitř prakticky nepřichází v úvahu — volné neutrony se do těla nedostanou jako „látka“, zachytí se v jádrech (a mohou tak zevnitř aktivovat sodík či vodík)."
  };
  $("#penOut").innerHTML=out[penMode]; $("#penIn").innerHTML=inn[penMode];
}

/* ============================================================
   17 · GRAF — srovnání dávek
   ============================================================ */
var doseScale="log";
function drawDose(){
  var W=760,H=440,L=300,R=730,rowH=30,top=36;
  var vals=DOSES.slice().sort(function(a,b){return a.v-b.v;});
  var s='';
  var x = doseScale==="log" ? function(v){ return L+(Math.log10(v)+3)/7*(R-L); } : function(v){ return L+v/5000*(R-L); };
  var cols={nat:"var(--cat1)",med:"var(--cat2)",lim:"var(--cat3)",eff:"var(--cat4)"};
  s+=txt(L,20,"EFEKTIVNÍ DÁVKA [mSv] — "+(doseScale==="log"?"LOGARITMICKÁ OSA":"LINEÁRNÍ OSA"),{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  var ticks = doseScale==="log" ? [0.001,0.01,0.1,1,10,100,1000,10000] : [0,1000,2000,3000,4000,5000];
  ticks.forEach(function(t){ var xv=x(t===0?0.001:t); if(doseScale==="lin") xv=L+t/5000*(R-L); s+=line(xv,top-6,xv,top+vals.length*rowH,{c:"var(--line)",w:1}); s+=txt(xv,top+vals.length*rowH+16,t>=1000?fmt(t/1000,0)+" Sv":(t>=1?fmt(t,0):fmt(t,3)),{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true}); });
  vals.forEach(function(d,i){
    var y=top+i*rowH, xe=x(d.v), w=Math.max(2,xe-L);
    s+=txt(L-10,y+16,d.n,{anchor:"end",size:11.5,fill:"var(--ink-2)"});
    s+=rect(L,y+5,w,18,{fill:cols[d.k],r:4});
    s+=txt(Math.min(xe+8,R+2),y+18,d.v>=1000?fmt(d.v/1000,1)+" Sv":(d.v>=1?fmt(d.v,0)+" mSv":fmt(d.v,3)+" mSv"),{size:11,w:600,fill:"var(--ink)",mono:true});
  });
  $("#doseWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Srovnání efektivních dávek"');
  $$("#doseScale button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===doseScale); });
}
