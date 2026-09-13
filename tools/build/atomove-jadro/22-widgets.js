/* ============================================================
   18 · WIDGET — kalkulačka rozpadového zákona
   ============================================================ */
var DC_NUCL = NUCL.filter(function(n){ return !n.st && n.hls>0; });
var dcState={mode:"rem",i:0,n:3,f:25,mx:0};
function dcC14(){ for(var i=0;i<DC_NUCL.length;i++){ if(DC_NUCL[i].Z===6&&DC_NUCL[i].A===14) return i; } return 0; }
function drawDc(){
  var mode=dcState.mode;
  if(mode==="date"){ dcState.i=dcC14(); $("#dcNuc").value=dcState.i; }
  var nu=DC_NUCL[dcState.i], t12=nu.hls, lam=LN2/t12;
  $("#dcCtlT").style.display = mode==="rem"?"":"none";
  $("#dcCtlF").style.display = (mode==="time"||mode==="date")?"":"none";
  $("#dcCtlM").style.display = mode==="act"?"":"none";
  $("#dcNuc").disabled = mode==="date";
  $$("#dcMode button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===mode); });
  var eqs=[], ro=[], note="";
  var nm=nucTxt(nu.Z,nu.A,nu.m);
  if(mode==="rem"){
    var n=dcState.n, t=n*t12, f=Math.pow(0.5,n);
    $("#dcTV").textContent=fmt(n,1)+" poločas"+(n===1?"":(n<5&&n>1?"y":"ů"))+" = "+fmtHL(t);
    eqs.push("t½("+nm+") = "+nu.hl+" &nbsp;·&nbsp; λ = ln 2 / t½ = "+sci(lam,3)+" s⁻¹");
    eqs.push("n = t / t½ = "+fmt(n,2)+" &nbsp;·&nbsp; t = "+fmtHL(t));
    eqs.push("N/N₀ = (½)ⁿ = (½)^"+fmt(n,2)+" = e^(−λt) = <b>"+fmt(f,f<0.001?6:4)+"</b> = <b>"+fmt(f*100,f<0.01?3:2)+" %</b>");
    ro=[["Zbývá N/N₀",fmt(f*100,f<0.01?3:2)+" %","nepřeměněných jader"],["Přeměnilo se",fmt((1-f)*100,f<0.01?3:2)+" %","1 − N/N₀"],["Aktivita A/A₀",fmt(f*100,f<0.01?3:2)+" %","klesá stejně jako N"]];
    note = Math.abs(n-Math.round(n))<0.05 ? "Celý počet poločasů: stačí "+Math.round(n)+"× vydělit dvěma — 1/"+Math.pow(2,Math.round(n))+". Necelé n počítejte jako 0,5^n na kalkulačce." : "Necelý počet poločasů ("+fmt(n,1)+"): (½)^"+fmt(n,1)+" = "+fmt(f,4)+". Zkuste posunout na celé číslo a porovnat s hodnotou z hlavy.";
  } else if(mode==="time"){
    var ff=dcState.f/100, nn=Math.log2(1/ff), tt=nn*t12;
    $("#dcFV").textContent=fmt(dcState.f,1)+" %";
    eqs.push("t½("+nm+") = "+nu.hl);
    eqs.push("(½)ⁿ = "+fmt(ff,3)+" &nbsp;⟹&nbsp; n = log₂(1/"+fmt(ff,3)+") = ln("+fmt(1/ff,2)+") / ln 2 = "+fmt(Math.log(1/ff),3)+" / 0,693 = <b>"+fmt(nn,2)+" poločasu</b>");
    eqs.push("t = n · t½ = "+fmt(nn,2)+" · "+nu.hl+" = <b>"+fmtHL(tt)+"</b> &nbsp;<span style='color:var(--ink-3)'>(= (t½/ln 2)·ln(N₀/N))</span>");
    ro=[["Potřebný počet poločasů",fmt(nn,2),"log₂(N₀/N)"],["Čas",fmtHL(tt),"pro "+nm],["Rozpadová konstanta",sci(lam,3)+" s⁻¹","λ = ln 2 / t½"]];
    note = dcState.f<=1.05&&dcState.f>=0.95 ? "Pokles na 1 % = 6,64 poločasu, ať je nuklid jakýkoli. Pro "+nm+" je to "+fmtHL(tt)+"." : "Užitečné kotvy: 50 % → 1 poločas, 12,5 % → 3, 1 % → 6,64, 0,1 % → 9,97. Přepněte nuklid a sledujte, jak se stejný počet poločasů promítne do úplně jiného času.";
  } else if(mode==="date"){
    var f2=dcState.f/100, n2=Math.log2(1/f2), yrs=n2*5730;
    $("#dcFV").textContent=fmt(dcState.f,1)+" % původní aktivity ¹⁴C";
    eqs.push("živý organismus: A₀ ≈ 0,23 Bq na gram uhlíku; vzorek má A/A₀ = "+fmt(f2,3));
    eqs.push("t = (t½ / ln 2) · ln(A₀/A) = (5730 / 0,693) · ln("+fmt(1/f2,3)+") = 8267 · "+fmt(Math.log(1/f2),3)+" = <b>"+fmt(yrs,0)+" let</b>");
    eqs.push("kontrola přes poločasy: n = log₂("+fmt(1/f2,3)+") = "+fmt(n2,3)+" &nbsp;→&nbsp; "+fmt(n2,3)+" · 5730 = "+fmt(yrs,0)+" let");
    ro=[["Stáří vzorku",fmt(yrs,0)+" let",fmt(n2,2)+" poločasu ¹⁴C"],["Střední doba života τ","8270 let","τ = t½/ln 2 = 1,443 t½"],["Použitelnost",f2<0.003?"mimo dosah":"v pořádku",f2<0.003?"pod 0,3 % — víc než ≈ 50 000 let, šum":"metoda spolehlivá do ≈ 50 000 let"]];
    note = f2<0.003 ? "Pod 0,3 % zbylé aktivity (≈ 9 poločasů) je signál nerozlišitelný od pozadí. Pro starší vzorky se používá ⁴⁰K/⁴⁰Ar nebo ²³⁸U/²⁰⁶Pb." : (f2>0.9 ? "Skoro plná aktivita: vzorek je mladší než ≈ 900 let. Tady začíná hrát roli i přesnost měření a kolísání ¹⁴C v atmosféře (kalibrační křivky)." : "Klíč je vždy stejný: podíl zbylé aktivity → logaritmus → čas. Zkuste 50 % (5730 let), 25 % (11 460 let), 12,5 % (17 190 let).");
  } else {
    var m=Math.pow(10,dcState.mx), M=nu.A, N=m/M*NA, A=lam*N;
    $("#dcMV").textContent=(m>=1?fmt(m,0)+" g":(m>=1e-3?fmt(m*1e3,0)+" mg":(m>=1e-6?fmt(m*1e6,0)+" μg":fmt(m*1e9,0)+" ng")));
    eqs.push("N = (m / M) · N_A = ("+(m>=1?fmt(m,0):sci(m,0))+" g / "+M+" g·mol⁻¹) · 6,022·10²³ = <b>"+sci(N,3)+" jader</b>");
    eqs.push("λ = ln 2 / t½ = 0,693 / "+sci(t12,3)+" s = <b>"+sci(lam,3)+" s⁻¹</b> &nbsp;<span style='color:var(--ink-3)'>(t½ = "+nu.hl+" převedeno na sekundy)</span>");
    eqs.push("A = λ · N = "+sci(lam,3)+" · "+sci(N,3)+" = <b>"+sci(A,3)+" Bq</b> = "+sci(A/3.7e10,2)+" Ci");
    ro=[["Aktivita",sci(A,2)+" Bq","= "+sci(A/3.7e10,2)+" Ci"],["Počet jader",sci(N,2),"v "+$("#dcMV").textContent+" "+nm],["Střední doba života",fmtHL(1/lam),"τ = 1/λ"]];
    note = "Aktivita je úměrná N a nepřímo úměrná poločasu. Přepněte mezi ²³⁸U (miliardy let) a ²¹⁰Po (138 dní) při stejné hmotnosti: rozdíl je deset řádů. Krátký poločas = intenzivní zářič, dlouhý = slabý, ale věčný.";
  }
  $("#dcSteps").innerHTML=eqs.map(function(e){ return '<p class="eq" style="margin:0">'+e+'</p>'; }).join("");
  ["#dcRo1","#dcRo2","#dcRo3"].forEach(function(id,i){ $(id).innerHTML='<span class="k">'+ro[i][0]+'</span><span class="v">'+ro[i][1]+'</span><span class="h">'+ro[i][2]+'</span>'; });
  $("#dcNote").innerHTML=note;
}
function initDc(){
  var sel=$("#dcNuc");
  sel.innerHTML=DC_NUCL.map(function(n,i){ return '<option value="'+i+'">'+nucTxt(n.Z,n.A,n.m)+' — '+elName(n.Z)+' · t½ = '+n.hl+'</option>'; }).join("");
  dcState.i=DC_NUCL.findIndex(function(n){ return n.Z===53&&n.A===131; }); if(dcState.i<0) dcState.i=0;
  sel.value=dcState.i;
  sel.addEventListener("change",function(){ dcState.i=+sel.value; drawDc(); });
  $$("#dcMode button").forEach(function(b){ b.addEventListener("click",function(){ dcState.mode=b.dataset.v; if(dcState.mode==="time"&&dcState.f>50) dcState.f=25; $("#dcF").value=dcState.f; drawDc(); }); });
  $("#dcT").addEventListener("input",function(){ dcState.n=+this.value; drawDc(); });
  $("#dcF").addEventListener("input",function(){ dcState.f=+this.value; drawDc(); });
  $("#dcM").addEventListener("input",function(){ dcState.mx=+this.value; drawDc(); });
  drawDc();
}

/* ============================================================
   19 · TABULKA — poločasy a zbylý podíl
   ============================================================ */
var hlN=3;
function drawHl(){
  var n=hlN, W=420,H=260,L=40,R=400,T0=30,B=222;
  var s='';
  var bw=(R-L)/21;
  s+=txt(L,18,"ZBYLÝ PODÍL PO k POLOČASECH",{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  s+=line(L,B,R,B,{c:"var(--line-strong)",w:1.5});
  for(var k=0;k<=20;k++){
    var f=Math.pow(0.5,k), h=(B-T0)*f, x=L+k*bw;
    var on=k<=n;
    s+=rect(x+1,B-h,bw-2,h,{fill:on?(k===n?"var(--accent)":"var(--cat1)"):"var(--surface-3)",r:2});
    if(k%2===0) s+=txt(x+bw/2,B+13,k,{anchor:"middle",size:9.5,fill:"var(--ink-3)",mono:true});
    if(on&&k<=4) s+=txt(x+bw/2,B-h-5,fmt(f*100,k>3?2:1)+"%",{anchor:"middle",size:9,w:600,fill:"var(--ink-2)",mono:true});
  }
  var fn=Math.pow(0.5,n);
  s+=txt(R,T0+4,"po "+n+" poločasech: "+fmt(fn*100,n>6?4:2)+" %",{anchor:"end",size:12,w:700,fill:"var(--accent)",mono:true});
  s+=txt((L+R)/2,B+28,"počet uplynulých poločasů k",{anchor:"middle",size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.06em;text-transform:uppercase"});
  $("#hlWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Zbylý podíl po k poločasech"');
  $("#hlNV").textContent=n;
  var rows=[["na 50 %",0.5],["na 25 %",0.25],["na 10 %",0.1],["na 1 %",0.01],["na 0,1 %",0.001],["na 1 ppm",1e-6]];
  $("#hlBody").innerHTML=rows.map(function(r){ var k=Math.log2(1/r[1]); return '<tr><td>'+r[0]+'</td><td class="n" style="font-weight:600">'+fmt(k,2)+'</td><td class="n">'+fmtHL(k*8.02*86400)+'</td><td class="n">'+fmtHL(k*30.08*YEAR)+'</td></tr>'; }).join("");
  function ro(id,k_,v,h){ $(id).innerHTML='<span class="k">'+k_+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#hlRo1","Zbývá","1/"+(n<=20?Math.pow(2,n):"2^"+n),"= "+fmt(fn*100,n>6?4:2)+" %");
  ro("#hlRo2","Přeměnilo se",fmt((1-fn)*100,n>6?4:2)+" %","1 − 1/2ⁿ");
  ro("#hlRo3","Pro "+"<span style='text-transform:none'>¹³¹I / ¹³⁷Cs</span>",fmtHL(n*8.02*86400)+" / "+fmtHL(n*30.08*YEAR),"stejné n, jiný čas");
}

/* ============================================================
   20 · TABULKA — nuklidy (hledání, filtr, řazení)
   ============================================================ */
var ntState={q:"",f:"all",sort:"Z"};
function drawNt(){
  var q=ntState.q.toLowerCase().trim();
  var rows=NUCL.filter(function(n){
    if(ntState.f==="st"&&!n.st) return false;
    if(ntState.f==="α"&&n.d.indexOf("α")<0) return false;
    if(ntState.f==="β⁻"&&n.d.indexOf("β⁻")<0) return false;
    if(ntState.f==="β⁺"&&!(n.d.indexOf("β⁺")>=0||n.d.indexOf("EC")>=0)) return false;
    if((ntState.f==="med"||ntState.f==="dat"||ntState.f==="ene")&&n.g.indexOf(ntState.f)<0) return false;
    if(!q) return true;
    var hay=(nucTxt(n.Z,n.A,n.m)+" "+elSym(n.Z)+"-"+n.A+" "+elName(n.Z)+" "+n.A+" "+n.d+" "+n.hl+" "+n.use).toLowerCase();
    return hay.indexOf(q)>=0;
  });
  if(ntState.sort==="hl") rows=rows.slice().sort(function(a,b){ var x=a.st?Infinity:a.hls, y=b.st?Infinity:b.hls; return x-y; });
  var h="";
  rows.forEach(function(n){
    var col = n.st?"var(--ok)":(n.d.indexOf("α")>=0?"var(--exo)":(n.d.indexOf("β⁻")>=0?"var(--endo)":(n.d.indexOf("γ")>=0?"var(--cat2)":"var(--cat1)")));
    h+='<tr><td>'+nucHTML(n.Z,n.A,n.m)+'</td><td>'+elName(n.Z)+'</td><td class="n">'+n.Z+'</td><td class="n">'+(n.A-n.Z)+'</td><td class="n">'+n.A+'</td>'+
       '<td style="color:'+col+';font-weight:600;white-space:nowrap">'+n.d+'</td><td class="n">'+n.hl+'</td><td style="font-size:.82rem;color:var(--ink-2);line-height:1.45">'+n.use+'</td></tr>';
  });
  if(!rows.length) h='<tr><td colspan="8" style="padding:1.1rem;color:var(--ink-3)">Nic nenalezeno. Zkuste „jod“, „uran“, „PET“ nebo „datování“.</td></tr>';
  $("#ntBody").innerHTML=h;
  $("#ntCount").textContent="Zobrazeno "+rows.length+" z "+NUCL.length+" nuklidů. Poločasy: y = rok, d = den, h = hodina.";
  $$("#ntFilter button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===ntState.f); });
  $$("#ntSort button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===ntState.sort); });
}
function initNt(){
  $("#ntSearch").addEventListener("input",function(){ ntState.q=this.value; drawNt(); });
  $$("#ntFilter button").forEach(function(b){ b.addEventListener("click",function(){ ntState.f=b.dataset.v; drawNt(); }); });
  $$("#ntSort button").forEach(function(b){ b.addEventListener("click",function(){ ntState.sort=b.dataset.v; drawNt(); }); });
  drawNt();
}

/* ============================================================
   21 · RYCHLOPRŮCHOD — tři kompaktní grafy
   ============================================================ */
/* (A) řeka stability ve zkratce */
function drawMiniRiver(){
  var W=720,H=300,L=52,R=690,T0=22,B=258, Zmax=100, Nmax=160;
  var x=function(z){ return L+z/Zmax*(R-L); }, y=function(n){ return B-n/Nmax*(B-T0); };
  var s='';
  for(var z=0;z<=Zmax;z+=20){ s+=line(x(z),T0,x(z),B,{c:"var(--line)",w:1}); s+=txt(x(z),B+14,z,{anchor:"middle",size:10,fill:"var(--ink-3)",mono:true}); }
  for(var n=0;n<=Nmax;n+=40){ s+=line(L,y(n),R,y(n),{c:"var(--line)",w:1}); s+=txt(L-5,y(n)+4,n,{anchor:"end",size:10,fill:"var(--ink-3)",mono:true}); }
  s+=line(x(0),y(0),x(Zmax),y(Zmax),{c:"var(--ink-3)",w:1.3,dash:"6 4"});
  s+=txt(x(96),y(100)+16,"N = Z",{anchor:"end",size:11,w:600,fill:"var(--ink-3)"});
  STABLE_LIST.forEach(function(p){ s+='<circle cx="'+x(p.Z).toFixed(1)+'" cy="'+y(p.N).toFixed(1)+'" r="2.1" style="fill:var(--ok)"/>'; });
  s+=line(x(83.5),T0,x(83.5),B,{c:"var(--bad)",w:1.5,dash:"4 3"});
  s+=txt(x(84)+4,T0+14,"Z > 83 → α",{size:11.5,w:700,fill:"var(--bad)"});
  s+=txt(x(14),y(96),"NAD ŘEKOU → β⁻",{size:11.5,w:700,fill:"var(--endo)"});
  s+=txt(x(14),y(84),"(neutronů moc)",{size:10,fill:"var(--ink-3)"});
  s+=txt(x(52),y(22),"POD ŘEKOU → β⁺ / EC",{size:11.5,w:700,fill:"var(--exo)"});
  s+=txt(x(52),y(10),"(neutronů málo)",{size:10,fill:"var(--ink-3)"});
  s+=txt(x(40),y(70),"ŘEKA STABILITY",{size:11,w:700,fill:"var(--ok)",style:"letter-spacing:.06em"});
  s+=txt(x(40),y(58),"N/Z: 1 → 1,5",{size:10,fill:"var(--ink-3)",mono:true});
  [[6,8,"¹⁴C","var(--endo)"],[9,9,"¹⁸F","var(--exo)"],[92,146,"²³⁸U","var(--bad)"],[82,126,"²⁰⁸Pb","var(--ink)"]].forEach(function(p){
    s+='<circle cx="'+x(p[0])+'" cy="'+y(p[1])+'" r="5" style="fill:'+p[3]+';stroke:var(--surface);stroke-width:1.5"/>';
    s+=txt(x(p[0])+8,y(p[1])+(p[0]===9?14:-7),p[2],{size:11,w:700,fill:p[3]});
  });
  s+=txt((L+R)/2,B+28,"Z",{anchor:"middle",size:11,w:600,fill:"var(--ink-3)"});
  s+=txt(12,(T0+B)/2,"N",{anchor:"middle",size:11,w:600,fill:"var(--ink-3)"});
  $("#miniRiverWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Řeka stability ve zkratce"');
}
/* (B) propustnost ve zkratce */
function drawMiniShield(){
  var W=720,H=230;
  $("#miniShieldWrap").innerHTML=svg("0 0 "+W+" "+H,shieldSVG(W,H,"all",true),'aria-label="Propustnost záření α, β, γ"');
}
/* (C) rozpadová křivka ve zkratce */
function drawMiniDecay(){
  var W=720,H=260,L=56,R=680,T0=26,B=214;
  var x=function(n){ return L+n/5*(R-L); }, y=function(f){ return B-f*(B-T0); };
  var s='';
  for(var k=0;k<=5;k++){ s+=line(x(k),T0,x(k),B,{c:"var(--line)",w:1}); s+=txt(x(k),B+15,k+" t½",{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true}); }
  [1,0.5,0.25,0].forEach(function(f){ s+=line(L,y(f),R,y(f),{c:"var(--line)",w:1}); s+=txt(L-6,y(f)+4,fmt(f*100,0)+" %",{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true}); });
  var pts=[]; for(var t=0;t<=5;t+=0.05) pts.push(x(t).toFixed(1)+","+y(Math.pow(0.5,t)).toFixed(1));
  s+='<polyline points="'+pts.join(" ")+'" style="fill:none;stroke:var(--accent);stroke-width:2.6;stroke-linejoin:round"/>';
  /* lineární omyl */
  s+=line(x(0),y(1),x(2),y(0),{c:"var(--bad)",w:1.5,dash:"5 4"});
  s+=txt(x(1.05),y(0.42),"omyl: „lineárně“ — po 2 t½ nula",{size:10.5,w:600,fill:"var(--bad)"});
  ["½","¼","⅛","1/16","1/32"].forEach(function(l,i){ var k=i+1, f=Math.pow(0.5,k);
    s+='<circle cx="'+x(k)+'" cy="'+y(f)+'" r="5" style="fill:var(--surface);stroke:var(--ink-2);stroke-width:2"/>';
    s+=txt(x(k)+7,y(f)-8,l+" = "+fmt(f*100,k>3?2:1)+" %",{size:11,w:600,fill:"var(--ink-2)",mono:true});
  });
  s+=txt(L,16,"N/N₀ = (½)ⁿ — PO KAŽDÉM POLOČASU POLOVINA TOHO, CO ZBYLO",{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  $("#miniDecayWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Rozpadová křivka ve zkratce"');
}
