/* ============================================================
   T11 · KALKULAČKA Ksp ↔ s (kapitola 6)
   ============================================================ */
var ksState={mode:"k2s",i:0,ls:-4.87};
function drawKsp(){
  var st=ksState, x=KSP[st.i], k=kspCoef(x), p=x.nc+x.na, stp=[];
  var eqn=x.f+"(s) ⇌ "+(x.nc>1?x.nc+" ":"")+x.cat+" + "+(x.na>1?x.na+" ":"")+x.an;
  var expr="["+x.cat+"]"+(x.nc>1?sup(x.nc):"")+"·["+x.an+"]"+(x.na>1?sup(x.na):"");
  var ice="rozpustí se s mol·dm⁻³ → ["+x.cat+"] = "+(x.nc>1?x.nc+"s":"s")+", ["+x.an+"] = "+(x.na>1?x.na+"s":"s");
  var sform="("+(x.nc>1?x.nc+"s":"s")+")"+(x.nc>1?sup(x.nc):"")+"·("+(x.na>1?x.na+"s":"s")+")"+(x.na>1?sup(x.na):"")+" = "+(k===1?"":k+"·")+"s"+sup(p);
  var s,K;
  if(st.mode==="k2s"){
    K=x.K; s=solub(x); $("#ksSWrap").hidden=true;
    stp.push(eqn+" &nbsp;&nbsp;Ksp = "+expr+" = "+sci(K,2));
    stp.push("ICE: "+ice+" &nbsp;⇒&nbsp; Ksp = "+sform);
    stp.push("s = "+(p===2?"√":(p===3?"∛":(p===4?"⁴√":"⁵√")))+"(Ksp"+(k===1?"":"/"+k)+") = "+(p===2?"√":(p===3?"∛":(p===4?"⁴√":"⁵√")))+"("+sci(K/k,2)+") = <b>"+sci(s,3)+" mol·dm⁻³</b>");
    stp.push("v gramech: s · M = "+sci(s,3)+" · "+fmt(x.M,2)+" = <b>"+sci(s*x.M,3)+" g·dm⁻³</b>"+(s*x.M<0.01?" = "+fmt(s*x.M*1000,3)+" mg·dm⁻³":""));
  } else {
    s=Math.pow(10,st.ls); K=k*Math.pow(s,p); $("#ksSWrap").hidden=false; $("#ksSV").textContent=sci(s,2)+" mol·dm⁻³";
    stp.push(eqn+" &nbsp;&nbsp;naměřená rozpustnost s = "+sci(s,3)+" mol·dm⁻³ ("+sci(s*x.M,3)+" g·dm⁻³)");
    stp.push("ICE: "+ice);
    stp.push("Ksp = "+expr+" = "+sform+" = "+(k===1?"":k+" · ")+"("+sci(s,3)+")"+sup(p)+" = <b>"+sci(K,2)+"</b>");
    stp.push("tabulková hodnota: "+sci(x.K,2)+" → "+(Math.abs(L10(K/x.K))<0.05?"shoda ✓":"liší se "+fmt(K/x.K,2)+"× — zkuste posunout s na "+sci(solub(x),2)));
  }
  $("#ksSteps").innerHTML=eqs(stp);
  ro("#ksRo1","Typ soli",x.t.replace("2","₂").replace("3","₃"),kspFormula(x));
  ro("#ksRo2","Rozpustnost s",sci(s,3),"mol·dm⁻³");
  ro("#ksRo3","Rozpustnost",sci(s*x.M,3)+" g·dm⁻³","M = "+fmt(x.M,2)+" g·mol⁻¹");
  ro("#ksRo4","Ksp",sci(K,2),st.mode==="k2s"?"tabulka, 25 °C":"vypočteno z s");
  $("#ksNote").innerHTML = x.f==="AgCl"||x.f==="Ag₂CrO₄"
    ? "Porovnejte AgCl (Ksp 1,8·10⁻¹⁰, s = 1,3·10⁻⁵) s&nbsp;Ag₂CrO₄ (Ksp 1,1·10⁻¹², s = 6,5·10⁻⁵): menší součin rozpustnosti, a&nbsp;přesto 5× větší rozpustnost — protože typ A₂B má ve vzorci 4s³."
    : "Přepněte na „s → Ksp“ a&nbsp;posuňte rozpustnost: u&nbsp;typu AB₂ roste Ksp s&nbsp;třetí mocninou s, u&nbsp;AB₃ se čtvrtou. Proto se soli různých typů nesmí porovnávat podle Ksp.";
}
/* ---------- tabulka Ksp ---------- */
var ktState={q:"",f:"all"};
function drawKt(){
  var q=ktState.q.toLowerCase().trim();
  var rows=KSP.filter(function(x){
    if(ktState.f==="AB"&&x.t!=="AB") return false;
    if(ktState.f==="AB2"&&x.t!=="AB2"&&x.t!=="A2B") return false;
    if(ktState.f==="AB3"&&x.t!=="AB3"&&x.t!=="A3B2") return false;
    if(!q) return true;
    return (x.n+" "+x.f+" "+x.cat+" "+x.an).toLowerCase().indexOf(q)>=0;
  });
  var h="";
  rows.forEach(function(x){
    var s=solub(x);
    h+='<tr><td>'+x.n+'</td><td class="mono" style="white-space:nowrap;font-weight:600">'+x.f+'</td><td class="mono" style="color:var(--ink-3)">'+x.t.replace("2","₂").replace("3","₃")+'</td>'+
       '<td class="n">'+sci(x.K,1)+'</td><td class="n">'+sci(s,2)+'</td><td class="n">'+sci(s*x.M,2)+'</td></tr>';
  });
  if(!rows.length) h='<tr><td colspan="6" style="padding:1.1rem;color:var(--ink-3)">Nic nenalezeno. Zkuste „stříbrný“, „OH“ nebo „SO₄“.</td></tr>';
  $("#ktBody").innerHTML=h;
}
/* ============================================================
   T12 · Q vs Ksp — smíchání dvou roztoků
   ============================================================ */
var QQ=["AgCl","BaSO₄","CaSO₄","CaCO₃","PbI₂","Mg(OH)₂","Ag₂CrO₄","PbCl₂","CaF₂"];
var qqState={i:0,V1:50,lc1:-3,V2:50,lc2:-3};
function drawQ(){
  var st=qqState, x=kspFind(QQ[st.i]), c1=Math.pow(10,st.lc1), c2=Math.pow(10,st.lc2), V=st.V1+st.V2;
  var m=c1*st.V1/V, a=c2*st.V2/V, Q=Math.pow(m,x.nc)*Math.pow(a,x.na), prec=Q>x.K, ratio=Q/x.K;
  /* log osa */
  var W=760,H=120,L=70,R=700,y=62, lo=-60, hi=0;
  var X=function(v){ return L+(R-L)*(clamp(v,lo,hi)-lo)/(hi-lo); };
  var s='';
  s+=line(L,y,R,y,{c:"var(--line-strong)",w:2});
  for(var e=-60;e<=0;e+=10){ s+=line(X(e),y-5,X(e),y+5,{c:"var(--ink-3)"}); s+=txt(X(e),y+22,"10"+sup(e),{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true}); }
  s+=txt(L,y-34,"LOGARITMICKÁ OSA — KDE LEŽÍ Q A KSP",{size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  s+=rect(X(L10(x.K)),y-14,X(hi)-X(L10(x.K)),28,{fill:"var(--bad)",style:"fill-opacity:.10"});
  s+=txt(X(hi)-4,y-18,"vpravo od Ksp: přesyceno → sraženina",{anchor:"end",size:10,fill:"var(--bad)",w:600});
  s+=dot(X(L10(x.K)),y,"var(--ink)",7); s+=txt(X(L10(x.K)),y+40,"Ksp = "+sci(x.K,1),{anchor:"middle",size:11,w:600,fill:"var(--ink)",mono:true});
  s+=dot(X(L10(Q)),y,prec?"var(--bad)":"var(--ok)",7); s+=txt(X(L10(Q)),y-20,"Q = "+sci(Q,1),{anchor:"middle",size:11,w:600,fill:prec?"var(--bad)":"var(--ok)",mono:true});
  $("#qqWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Poloha Q a Ksp na logaritmické ose"');
  $("#qqV1V").textContent=st.V1+" mL"; $("#qqV2V").textContent=st.V2+" mL";
  $("#qqC1V").textContent=sci(c1,1)+" mol·dm⁻³"; $("#qqC2V").textContent=sci(c2,1)+" mol·dm⁻³";
  ro("#qqRo1","["+x.cat+"] po smíchání",sci(m,2),"c₁·V₁/(V₁+V₂)");
  ro("#qqRo2","["+x.an+"] po smíchání",sci(a,2),"c₂·V₂/(V₁+V₂)");
  ro("#qqRo3","Q = ["+x.cat+"]"+(x.nc>1?sup(x.nc):"")+"·["+x.an+"]"+(x.na>1?sup(x.na):""),sci(Q,2),"vs Ksp = "+sci(x.K,1));
  ro("#qqRo4","Verdikt",prec?"SRÁŽÍ SE":"nesráží se",prec?"Q je "+sci(ratio,1)+"× větší než Ksp":"Q je "+sci(1/ratio,1)+"× menší než Ksp",prec?"neg":"pos");
  var stp=[];
  stp.push("Zředění: V = "+st.V1+" + "+st.V2+" = "+V+" mL &nbsp;→&nbsp; ["+x.cat+"] = "+sci(c1,1)+" · "+st.V1+"/"+V+" = "+sci(m,2)+";&nbsp; ["+x.an+"] = "+sci(c2,1)+" · "+st.V2+"/"+V+" = "+sci(a,2)+" mol·dm⁻³");
  stp.push("Q = "+(x.nc>1?"("+sci(m,2)+")"+sup(x.nc):sci(m,2))+" · "+(x.na>1?"("+sci(a,2)+")"+sup(x.na):sci(a,2))+" = <b>"+sci(Q,2)+"</b>");
  stp.push("Q "+(prec?">":"<")+" Ksp ("+sci(x.K,1)+") &nbsp;⇒&nbsp; <b>"+(prec?"roztok je přesycený, "+x.f+" se vylučuje, dokud Q neklesne na Ksp":"roztok je nenasycený, "+x.f+" se nevyloučí")+"</b>");
  $("#qqSteps").innerHTML=eqs(stp);
  $("#qqNote").innerHTML = x.na>1||x.nc>1 ? "U&nbsp;"+x.f+" je jeden iont ve výrazu umocněný — zdvojnásobení jeho koncentrace zvětší Q "+(x.na>1?Math.pow(2,x.na):Math.pow(2,x.nc))+"×. Zkuste zvětšit objem jedné složky: obě koncentrace se změní, protože zředění působí na obě."
    : "Zkuste snížit obě koncentrace na 10⁻⁵: po smíchání je Q = 2,5·10⁻¹¹ &lt; 1,8·10⁻¹⁰ a&nbsp;AgCl se nevyloučí, přestože „AgCl je nerozpustný“. Nerozpustnost je vždy relativní.";
}
/* ============================================================
   T13 · SPOLEČNÝ IONT — graf s vs [X]
   ============================================================ */
var CI=[{f:"AgCl",lab:"AgCl v roztoku NaCl (Cl⁻)"},{f:"PbI₂",lab:"PbI₂ v roztoku KI (I⁻)"},{f:"BaSO₄",lab:"BaSO₄ v roztoku Na₂SO₄ (SO₄²⁻)"},{f:"CaF₂",lab:"CaF₂ v roztoku NaF (F⁻)"},{f:"Mg(OH)₂",lab:"Mg(OH)₂ v roztoku NaOH (OH⁻)"}];
var ciState={i:0,lx:-1};
/* přesná rozpustnost při přidaném aniontu cX: (nc·s)^nc · (cX + na·s)^na = Ksp */
function ciExact(x,cX){
  var lo=-20, hi=1;
  for(var i=0;i<80;i++){ var mid=(lo+hi)/2, s=Math.pow(10,mid); var f=Math.pow(x.nc*s,x.nc)*Math.pow(cX+x.na*s,x.na)-x.K; if(f>0) hi=mid; else lo=mid; }
  return Math.pow(10,(lo+hi)/2);
}
function drawCi(){
  var st=ciState, x=kspFind(CI[st.i].f), cX=Math.pow(10,st.lx), s0=solub(x), sE=ciExact(x,cX), sA=x.K/Math.pow(cX,x.na)/Math.pow(x.nc,x.nc);
  var W=760,H=320;
  var ymin=Math.floor(L10(x.K/Math.pow(x.nc,x.nc)))-1, ymax=Math.ceil(L10(s0))+1;
  var fr=frame({L:64,R:720,T:24,B:262,x0:-6,x1:0,y0:ymin,y1:ymax,xt:1,yt:1,xf:function(v){return "10"+sup(v);},yf:function(v){return "10"+sup(v);},xl:"koncentrace přidaného "+x.an+" [mol·dm⁻³]",yl:"rozpustnost s"});
  var s=fr.s, pe=[], pa=[];
  for(var e=-6;e<=0.001;e+=0.1){ var c=Math.pow(10,e); pe.push(fr.X(e).toFixed(1)+","+fr.Y(clamp(L10(ciExact(x,c)),ymin,ymax)).toFixed(1)); var la=L10(x.K/Math.pow(c,x.na)/Math.pow(x.nc,x.nc)); if(la<=ymax&&la>=ymin) pa.push(fr.X(e).toFixed(1)+","+fr.Y(la).toFixed(1)); }
  s+=line(fr.X(-6),fr.Y(L10(s0)),fr.X(0),fr.Y(L10(s0)),{c:"var(--ink-3)",w:1.5,dash:"5 4"});
  s+=txt(fr.X(-5.9),fr.Y(L10(s0))-7,"čistá voda: s = "+sci(s0,2),{size:11,w:600,fill:"var(--ink-3)",mono:true});
  s+=poly(pa,"var(--exo)",1.5,"4 3");
  s+=poly(pe,"var(--accent)",2.8);
  s+=dot(fr.X(st.lx),fr.Y(clamp(L10(sE),ymin,ymax)),"var(--accent)",6);
  s+=txt(fr.X(st.lx)+(st.lx>-1.5?-9:9),fr.Y(clamp(L10(sE),ymin,ymax))-9,"s = "+sci(sE,2),{anchor:st.lx>-1.5?"end":"start",size:11.5,w:600,fill:"var(--accent)",mono:true});
  $("#ciWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Rozpustnost soli v závislosti na koncentraci společného iontu"');
  $("#ciXV").textContent=sci(cX,1)+" mol·dm⁻³";
  ro("#ciRo1","s v čisté vodě",sci(s0,2),"mol·dm⁻³ · "+kspFormula(x));
  ro("#ciRo2","s při ["+x.an+"] = "+sci(cX,1),sci(sE,2),"mol·dm⁻³ (přesně)","neg");
  ro("#ciRo3","Pokles rozpustnosti",fmt(s0/sE,1)+"×","Le Chatelier: rovnováha doleva");
  var stp=[];
  stp.push(x.f+"(s) ⇌ "+(x.nc>1?x.nc+" ":"")+x.cat+" + "+(x.na>1?x.na+" ":"")+x.an+" &nbsp;·&nbsp; přidaný "+x.an+" = "+sci(cX,1)+" mol·dm⁻³");
  stp.push("ICE: ["+x.cat+"] = "+(x.nc>1?x.nc+"s":"s")+", ["+x.an+"] = "+sci(cX,1)+" + "+(x.na>1?x.na+"s":"s")+" ≈ "+sci(cX,1)+" (je-li přidaný iont ≫ s)");
  stp.push("s ≈ Ksp / ("+(x.nc>1?Math.pow(x.nc,x.nc)+"·":"")+"["+x.an+"]"+(x.na>1?sup(x.na):"")+") = "+sci(x.K,1)+" / "+(x.nc>1?Math.pow(x.nc,x.nc)+"·":"")+"("+sci(cX,1)+")"+(x.na>1?sup(x.na):"")+" = <b>"+sci(sA,2)+"</b>"+(Math.abs(L10(sA/sE))>0.05?" — aproximace tu selhává (přidaný iont není ≫ s), přesně: <b>"+sci(sE,2)+"</b>":" ✓ (přesně "+sci(sE,2)+")"));
  $("#ciSteps").innerHTML=eqs(stp);
  $("#ciNote").innerHTML = x.na>1 ? "Anion je ve výrazu na druhou: každé zdesetinásobení ["+x.an+"] sníží rozpustnost 100× — sklon přímky je −2. Vlevo, kde je přidaného iontu méně než s, se křivka ohýbá k&nbsp;hodnotě pro čistou vodu."
    : "Sklon přímky vpravo je −1: desetkrát víc "+x.an+" znamená desetkrát nižší rozpustnost. Vlevo, kde je přidaného iontu méně než 10⁻⁵, se křivka ohne — tam už rozhoduje vlastní rozpuštěný "+x.f+".";
}
/* ============================================================
   T14 · VLIV pH — hydroxidy
   ============================================================ */
var PHX=["Ca(OH)₂","Mg(OH)₂","Fe(OH)₂","Zn(OH)₂","Cu(OH)₂","Al(OH)₃","Cr(OH)₃","Fe(OH)₃"];
var PHC=["var(--cat1)","var(--accent)","var(--cat3)","var(--cat2)","var(--endo)","var(--cat4)","var(--exo)","var(--ink)"];
var phState={pH:9,i:1};
function drawPh(){
  var st=phState, W=760,H=360;
  var fr=frame({L:64,R:720,T:24,B:300,x0:0,x1:14,y0:-14,y1:2,xt:1,yt:2,xf:function(v){return fmt(v,0);},yf:function(v){return "10"+sup(v);},xl:"pH",yl:"[Mⁿ⁺] max [mol·dm⁻³]"});
  var s=fr.s;
  s+=line(fr.X(0),fr.Y(-2),fr.X(14),fr.Y(-2),{c:"var(--ink-3)",w:1,dash:"4 4"}); s+=txt(fr.X(0.2),fr.Y(-2)-6,"0,01 M — typická koncentrace vzorku",{size:10.5,fill:"var(--ink-3)"});
  s+=line(fr.X(0),fr.Y(-6),fr.X(14),fr.Y(-6),{c:"var(--ink-3)",w:1,dash:"4 4"}); s+=txt(fr.X(0.2),fr.Y(-6)-6,"10⁻⁶ M — „úplně vysráženo“",{size:10.5,fill:"var(--ink-3)"});
  PHX.forEach(function(f,i){
    var x=kspFind(f), pts=[];
    for(var p=0;p<=14.001;p+=0.25){ var lm=L10(x.K)-x.na*(p-14); if(lm>=-14&&lm<=2) pts.push(fr.X(p).toFixed(1)+","+fr.Y(lm).toFixed(1)); }
    s+=poly(pts,PHC[i],i===st.i?3.2:1.6);
  });
  var cur=kspFind(PHX[st.i]), oh=Math.pow(10,st.pH-14), mmax=cur.K/Math.pow(oh,cur.na);
  var pStart=14+L10(Math.pow(cur.K/0.01,1/cur.na)), pFull=14+L10(Math.pow(cur.K/1e-6,1/cur.na));
  s+=line(fr.X(st.pH),fr.T,fr.X(st.pH),fr.B,{c:"var(--ink)",w:1.5,dash:"5 4"});
  var lm=clamp(L10(mmax),-14,2);
  s+=dot(fr.X(st.pH),fr.Y(lm),PHC[st.i],7);
  $("#phWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Maximální koncentrace kovu v roztoku v závislosti na pH"');
  $("#phLegend").innerHTML=PHX.map(function(f,i){ return '<span class="li"><span class="sw" style="background:'+PHC[i]+'"></span>'+f+'</span>'; }).join("");
  $("#phPHV").textContent=pf(st.pH);
  var above=mmax<0.01;
  ro("#phRo1","["+cur.cat+"] max při pH "+pf(st.pH),sci(mmax,2),"Ksp / [OH⁻]"+sup(cur.na));
  ro("#phRo2","Začátek srážení z 0,01 M",pf(pStart),"Q = Ksp");
  ro("#phRo3","„Úplné“ vysrážení (≤ 10⁻⁶ M)",pf(pFull),"pH, od kterého zbývá 10⁻⁶");
  ro("#phRo4","0,01 M roztok při tomto pH",above?"sráží se":"zůstává v roztoku",above?"c > [M]max":"c < [M]max",above?"neg":"pos");
  var stp=[];
  stp.push(cur.f+"(s) ⇌ "+cur.cat+" + "+cur.na+" OH⁻ &nbsp;&nbsp;Ksp = ["+cur.cat+"]·[OH⁻]"+sup(cur.na)+" = "+sci(cur.K,1));
  stp.push("pH "+pf(st.pH)+" → pOH "+pf(14-st.pH)+" → [OH⁻] = "+sci(oh,2)+" mol·dm⁻³");
  stp.push("["+cur.cat+"]max = Ksp / [OH⁻]"+sup(cur.na)+" = "+sci(cur.K,1)+" / ("+sci(oh,2)+")"+sup(cur.na)+" = <b>"+sci(mmax,2)+" mol·dm⁻³</b>");
  stp.push("pH začátku srážení z 0,01 M: [OH⁻] = "+(cur.na===2?"√":"∛")+"(Ksp/0,01) = "+sci(Math.pow(cur.K/0.01,1/cur.na),2)+" → pOH = "+pf(-L10(Math.pow(cur.K/0.01,1/cur.na)))+" → <b>pH = "+pf(pStart)+"</b>");
  $("#phSteps").innerHTML=eqs(stp);
  $("#phNote").innerHTML="Sklon přímky je −"+cur.na+": u&nbsp;M³⁺ každá jednotka pH změní rozpustnost 1000×, u&nbsp;M²⁺ 100×. Srovnejte Fe(OH)₃ (sráží se od pH 1,8) s&nbsp;Mg(OH)₂ (od 9,4): mezi tím leží okno, ve kterém se oba kationty rozdělí. Ca(OH)₂ se z&nbsp;0,01 M sráží až nad pH 12,3.";
}
function initKsp(){
  var sel=$("#ksSalt");
  sel.innerHTML=KSP.map(function(x,i){ return '<option value="'+i+'">'+x.f+' — '+x.n+' ('+x.t.replace("2","₂").replace("3","₃")+')</option>'; }).join("");
  selBind("ksSalt",function(v){ ksState.i=+v; ksState.ls=L10(solub(KSP[+v])); $("#ksS").value=ksState.ls.toFixed(2); drawKsp(); });
  segBind("ksMode",function(v){ ksState.mode=v; drawKsp(); });
  rngBind("ksS",function(v){ ksState.ls=v; drawKsp(); });
  $("#ktSearch").addEventListener("input",function(){ ktState.q=this.value; drawKt(); });
  segBind("ktFilter",function(v){ ktState.f=v; drawKt(); });
  var q=$("#qqPair");
  q.innerHTML=QQ.map(function(f,i){ var x=kspFind(f); return '<option value="'+i+'">'+f+' ← '+x.cat+' + '+x.an+' (Ksp '+sci(x.K,1)+')</option>'; }).join("");
  selBind("qqPair",function(v){ qqState.i=+v; drawQ(); });
  rngBind("qqV1",function(v){ qqState.V1=v; drawQ(); }); rngBind("qqC1",function(v){ qqState.lc1=v; drawQ(); });
  rngBind("qqV2",function(v){ qqState.V2=v; drawQ(); }); rngBind("qqC2",function(v){ qqState.lc2=v; drawQ(); });
  var c=$("#ciSalt");
  c.innerHTML=CI.map(function(x,i){ return '<option value="'+i+'">'+x.lab+'</option>'; }).join("");
  selBind("ciSalt",function(v){ ciState.i=+v; drawCi(); });
  rngBind("ciX",function(v){ ciState.lx=v; drawCi(); });
  var p=$("#phSel");
  p.innerHTML=PHX.map(function(f,i){ var x=kspFind(f); return '<option value="'+i+'"'+(i===1?' selected':'')+'>'+f+' (Ksp '+sci(x.K,1)+')</option>'; }).join("");
  selBind("phSel",function(v){ phState.i=+v; drawPh(); });
  rngBind("phPH",function(v){ phState.pH=v; drawPh(); });
  drawKsp(); drawKt(); drawQ(); drawCi(); drawPh();
}
