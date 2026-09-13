/* ============================================================
   T6 · MODEL — slabá kyselina/zásada: aproximace vs přesně (kap. 2)
   ============================================================ */
var wkState={kind:"a",pk:4.76,lc:-1};
function drawWeak(){
  var st=wkState, K=Math.pow(10,-st.pk), c=Math.pow(10,st.lc), ws=weakSolve(K,c), isA=st.kind==="a";
  var pHap=isA?-L10(ws.ap):14+L10(ws.ap), pHex=isA?-L10(ws.ex):14+L10(ws.ex);
  $("#wkH1").textContent=isA?"HA":"B"; $("#wkH2").textContent=isA?"H₃O⁺":"BH⁺"; $("#wkH3").textContent=isA?"A⁻":"OH⁻";
  $("#wkPKL").innerHTML='p<span class="q">K</span><sub>'+(isA?"a":"b")+'</sub>';
  $("#wkPKV").textContent=fmt(st.pk,2); $("#wkCV").textContent=conc(c)+" mol·dm⁻³";
  $("#wkIce").innerHTML=
    '<tr><td><b>I</b></td><td class="n">'+conc(c)+'</td><td class="n">≈ 0</td><td class="n">0</td></tr>'+
    '<tr><td><b>C</b></td><td class="n">−x</td><td class="n">+x</td><td class="n">+x</td></tr>'+
    '<tr><td><b>E</b></td><td class="n">'+conc(c)+' − x</td><td class="n">x</td><td class="n">x</td></tr>'+
    '<tr><td colspan="4" class="mono" style="color:var(--ink-2)">K = x²/(c − x) = '+sci(K,2)+' &nbsp;→&nbsp; x = '+sci(ws.ex,3)+' (přesně) &nbsp;·&nbsp; √(K·c) = '+sci(ws.ap,3)+'</td></tr>';
  ro("#wkRo1","x aproximací √(K·c)",sci(ws.ap,3),"mol·dm⁻³");
  ro("#wkRo2","x přesně (kvadratika)",sci(ws.ex,3),"mol·dm⁻³");
  ro("#wkRo3","α = x / c",fmt(ws.alpha*100,2)+" %","Ostwald: √(K/c) = "+fmt(ws.ratio*100,2)+" %");
  ro("#wkRo4","5% pravidlo",ws.ok?"✓ platí":"✕ selhává",fmt(ws.ratio*100,1)+" % "+(ws.ok?"< 5 %":"> 5 %"),ws.ok?"pos":"neg");
  ro("#wkRo5","pH aproximací",pf(pHap),isA?"½(pKa − log c)":"14 − ½(pKb − log c)");
  ro("#wkRo6","pH přesně",pf(pHex),"rozdíl "+fmt(Math.abs(pHex-pHap),3));
  /* graf α vs log c */
  var W=520,H=290;
  var fr=frame({L:56,R:496,T:22,B:236,x0:-5,x1:0,y0:0,y1:100,xt:1,yt:20,
    xf:function(v){return "10"+sup(v);},yf:function(v){return fmt(v,0);},xl:"koncentrace c [mol·dm⁻³]",yl:"α [%]"});
  var s=fr.s, pts=[];
  for(var e=-5;e<=0.001;e+=0.05){ var cc=Math.pow(10,e), w=weakSolve(K,cc); pts.push(fr.X(e).toFixed(1)+","+fr.Y(w.alpha*100).toFixed(1)); }
  s+=poly(pts,"var(--accent)",2.8);
  s+=line(fr.X(-5),fr.Y(5),fr.X(0),fr.Y(5),{c:"var(--warn)",w:1.5,dash:"5 4"});
  s+=txt(fr.X(-4.9),fr.Y(5)-6,"5 %",{size:11,w:600,fill:"var(--warn)"});
  s+=dot(fr.X(st.lc),fr.Y(ws.alpha*100),"var(--accent)",6);
  s+=txt(fr.X(st.lc)+(st.lc>-1.2?-9:9),fr.Y(ws.alpha*100)-9,"α = "+fmt(ws.alpha*100,1)+" %",{anchor:st.lc>-1.2?"end":"start",size:11.5,w:600,fill:"var(--accent)",mono:true});
  $("#wkWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Stupeň disociace v závislosti na koncentraci"');
  $("#wkNote").innerHTML = ws.ok
    ? "Aproximace je v&nbsp;pořádku (x/c = "+fmt(ws.ratio*100,1)+" %). Zkuste zředit na 10⁻⁴ nebo snížit p<i>K</i> pod 3 — křivka α vyleze nad žlutou čáru a&nbsp;pH z&nbsp;odmocniny se začne lišit od přesného."
    : "Aproximace <b>selhala</b> (x/c = "+fmt(ws.ratio*100,1)+" %): rozdíl v&nbsp;pH je "+fmt(Math.abs(pHex-pHap),2)+". Tady musíte řešit kvadratickou rovnici. Ostwaldův zákon: zředění zvyšuje α, i&nbsp;když absolutní [H₃O⁺] klesá.";
}
/* ============================================================
   T7 · TABULKA Ka / Kb
   ============================================================ */
var kaState={q:"",f:"all"};
function drawKa(){
  var q=kaState.q.toLowerCase().trim();
  var rows=KA.filter(function(k){
    if(kaState.f==="a"&&k.t!=="a") return false;
    if(kaState.f==="b"&&k.t!=="b") return false;
    if(kaState.f==="poly"&&!k.st) return false;
    if(!q) return true;
    return (k.n+" "+k.f+" "+k.cj+" "+(k.st||"")).toLowerCase().indexOf(q)>=0;
  });
  var h="";
  rows.forEach(function(k){
    var pk=-L10(k.K), pct=clamp((14-pk)/15*100,3,100);
    var col=pk<3?"var(--accent)":(pk<7?"var(--exo)":"var(--ink-3)");
    h+='<tr><td>'+k.n+'</td><td class="mono" style="white-space:nowrap">'+k.f+'</td>'+
       '<td class="n">'+(k.t==="a"?'<span class="tag" style="font-size:.6rem;padding:.1rem .35rem">'+(k.st||"Ka")+'</span> ':'<span class="tag endo" style="font-size:.6rem;padding:.1rem .35rem">Kb</span> ')+sci(k.K,2)+'</td>'+
       '<td class="n" style="font-weight:600">'+fmt(pk,2)+'</td>'+
       '<td><span style="display:block;height:9px;border-radius:99px;background:var(--surface-3);overflow:hidden"><span style="display:block;height:100%;width:'+pct.toFixed(0)+'%;background:'+col+';border-radius:99px"></span></span></td>'+
       '<td class="mono" style="color:var(--ink-2)">'+k.cj+'</td></tr>';
  });
  if(!rows.length) h='<tr><td colspan="6" style="padding:1.1rem;color:var(--ink-3)">Nic nenalezeno. Zkuste „octová“, „NH₃“ nebo „HCO₃⁻“.</td></tr>';
  $("#kaBody").innerHTML=h;
}
/* ============================================================
   T8 · MODEL — pH roztoků solí (kap. 3)
   ============================================================ */
var slState={i:0,lc:-1};
function drawSalt(){
  var s=SALTS[slState.i], c=Math.pow(10,slState.lc), st=[], pH, kind, Kh=null, alpha=null, eq="";
  $("#slCV").textContent=conc(c)+" mol·dm⁻³";
  if(s.t==="neu"){
    eq=s.f+" → ionty silné kyseliny a silné zásady — <b>nic nehydrolyzuje</b>";
    st.push("Oba ionty pocházejí ze silného elektrolytu: jsou to zanedbatelně slabé konjugáty, s vodou nereagují.");
    st.push("pH = <b>7,00</b> nezávisle na koncentraci (jen autoprotolýza vody)");
    pH=7; kind="neutrální";
  } else if(s.t==="an"){
    Kh=KW/s.K; var w=weakSolve(Kh,c); var pOH=-L10(w.ok?w.ap:w.ex); pH=14-pOH; alpha=w.alpha;
    eq=s.cj+" + H₂O ⇌ "+s.par+" + OH⁻ &nbsp;&nbsp;(hydrolýza aniontu → zásaditě)";
    st.push("Kation je ze silné zásady → nehydrolyzuje. Anion "+s.cj+" je konjugovaná zásada slabé kyseliny "+s.par+" (Ka = "+sci(s.K,2)+").");
    st.push("Kb("+s.cj+") = Kw / Ka = 10⁻¹⁴ / "+sci(s.K,2)+" = <b>"+sci(Kh,2)+"</b>");
    st.push("[OH⁻] = √(Kb·c) = √("+sci(Kh,2)+" · "+conc(c)+") = <b>"+sci(w.ap,3)+"</b>"+(w.ok?"":" (x/c = "+fmt(w.ratio*100,1)+" % → přesně "+sci(w.ex,3)+")"));
    st.push("pOH = "+pf(pOH)+" → pH = 14 − pOH = <b>"+pf(pH)+"</b> &nbsp;·&nbsp; zkratka: 7 + ½(pKa + log c) = 7 + ½("+fmt(-L10(s.K),2)+" + ("+fmt(L10(c),2)+")) = "+pf(7+0.5*(-L10(s.K)+L10(c))));
    kind="zásaditý";
  } else if(s.t==="cat"){
    Kh=KW/s.K; var w2=weakSolve(Kh,c); pH=-L10(w2.ok?w2.ap:w2.ex); alpha=w2.alpha;
    eq=s.cj+" + H₂O ⇌ "+s.par+" + H₃O⁺ &nbsp;&nbsp;(hydrolýza kationtu → kysele)";
    st.push("Anion je ze silné kyseliny → nehydrolyzuje. Kation "+s.cj+" je konjugovaná kyselina slabé zásady "+s.par+" (Kb = "+sci(s.K,2)+").");
    st.push("Ka("+s.cj+") = Kw / Kb = 10⁻¹⁴ / "+sci(s.K,2)+" = <b>"+sci(Kh,2)+"</b>");
    st.push("[H₃O⁺] = √(Ka·c) = √("+sci(Kh,2)+" · "+conc(c)+") = <b>"+sci(w2.ap,3)+"</b>"+(w2.ok?"":" (x/c = "+fmt(w2.ratio*100,1)+" % → přesně "+sci(w2.ex,3)+")"));
    st.push("pH = −log[H₃O⁺] = <b>"+pf(pH)+"</b> &nbsp;·&nbsp; zkratka: 7 − ½(pKb + log c) = 7 − ½("+fmt(-L10(s.K),2)+" + ("+fmt(L10(c),2)+")) = "+pf(7-0.5*(-L10(s.K)+L10(c))));
    kind="kyselý";
  } else if(s.t==="both"){
    pH=7+0.5*(s.pKa-s.pKb);
    eq="hydrolyzují <b>oba</b> ionty: kation dává H₃O⁺, anion OH⁻ — rozhoduje, který rodič byl slabší";
    st.push("Sůl vznikla z "+s.par+": pKa = "+fmt(s.pKa,2)+", pKb = "+fmt(s.pKb,2)+".");
    st.push("pH = 7 + ½(pKa − pKb) = 7 + ½("+fmt(s.pKa,2)+" − "+fmt(s.pKb,2)+") = <b>"+pf(pH)+"</b> — nezávisle na koncentraci");
    kind=Math.abs(pH-7)<0.05?"prakticky neutrální":(pH>7?"zásaditý":"kyselý");
  } else {
    pH=0.5*(s.pKa1+s.pKa2);
    eq="HCO₃⁻ je <b>amfolyt</b>: HCO₃⁻ + H₂O ⇌ CO₃²⁻ + H₃O⁺ &nbsp;i&nbsp; HCO₃⁻ + H₂O ⇌ H₂CO₃ + OH⁻";
    st.push("Iont je současně kyselina (pKa₂ = "+fmt(s.pKa2,2)+") i zásada (konjugát kyseliny s pKa₁ = "+fmt(s.pKa1,2)+").");
    st.push("pH = ½(pKa₁ + pKa₂) = ½("+fmt(s.pKa1,2)+" + "+fmt(s.pKa2,2)+") = <b>"+pf(pH)+"</b> — nezávisle na koncentraci");
    kind="zásaditý";
  }
  $("#slEq").innerHTML='<span class="chem">'+s.f+'</span> — '+s.n+':&nbsp; '+eq;
  $("#slSteps").innerHTML=eqs(st);
  ro("#slRo1","pH",pf(pH),"c = "+conc(c)+" mol·dm⁻³",pH<6.95?"neg":(pH>7.05?"pos":""));
  ro("#slRo2","Charakter roztoku",kind,s.t==="neu"?"žádná hydrolýza":"hydrolýza");
  ro("#slRo3","K hydrolýzy",Kh!==null?sci(Kh,2):"—",Kh!==null?"Kw / K mateřské látky":"");
  ro("#slRo4","Stupeň hydrolýzy",alpha!==null?fmt(alpha*100,4)+" %":"—",alpha!==null?"podíl zreagovaných iontů":"");
  $("#slNote").innerHTML = s.t==="an" ? "Porovnejte octan (pKa 4,76) s&nbsp;kyanidem (pKa 9,21): čím slabší mateřská kyselina, tím silnější konjugovaná zásada a&nbsp;tím vyšší pH soli. Desetinásobné zředění sníží pH o&nbsp;0,5."
    : s.t==="cat" ? "Zrcadlový obraz solí slabých kyselin: NH₄Cl 0,1 M má pH 5,13, CH₃COONa 0,1 M má 8,88 — obě stejně daleko od sedmičky, protože pKa(CH₃COOH) ≈ pKb(NH₃)."
    : s.t==="both" ? "Posuvník koncentrace tu nic nedělá — u&nbsp;soli slabé kyseliny a&nbsp;slabé zásady pH na koncentraci (v&nbsp;této aproximaci) nezávisí. Rozhoduje jen rozdíl pKa − pKb."
    : s.t==="amph" ? "Jedlá soda má pH 8,34 bez ohledu na koncentraci; proto je bezpečné „antacidum“. Stejný vzorec platí pro NaH₂PO₄ (4,68) a&nbsp;Na₂HPO₄ (9,77)."
    : "Sůl silné kyseliny a&nbsp;silné zásady je pH-neutrální. To je důvod, proč bod ekvivalence titrace HCl + NaOH leží přesně na 7,00.";
}
function initWeak(){
  segBind("wkKind",function(v){ wkState.kind=v; drawWeak(); });
  rngBind("wkPK",function(v){ wkState.pk=v; drawWeak(); });
  rngBind("wkC",function(v){ wkState.lc=v; drawWeak(); });
  $("#kaSearch").addEventListener("input",function(){ kaState.q=this.value; drawKa(); });
  segBind("kaFilter",function(v){ kaState.f=v; drawKa(); });
  var sel=$("#slSalt");
  sel.innerHTML=SALTS.map(function(s,i){ return '<option value="'+i+'">'+s.f+' — '+s.n+'</option>'; }).join("");
  selBind("slSalt",function(v){ slState.i=+v; drawSalt(); });
  rngBind("slC",function(v){ slState.lc=v; drawSalt(); });
  drawWeak(); drawKa(); drawSalt();
}
