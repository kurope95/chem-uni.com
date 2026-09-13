/* ============================================================
   T2 · HERO — univerzální kalkulačka pH
   ============================================================ */
var heroState={type:"sa",lc:-1,sub:0,pk:4.76,custom:false,lr:0};
var HERO_TYPES={
  sa:{lab:"Silná kyselina",pk:false,r:false},
  sb:{lab:"Silná zásada",pk:false,r:false},
  wa:{lab:"Slabá kyselina",pk:"a",r:false},
  wb:{lab:"Slabá zásada",pk:"b",r:false},
  san:{lab:"Sůl slabé kyseliny a silné zásady",pk:"a",r:false},
  scat:{lab:"Sůl slabé zásady a silné kyseliny",pk:"b",r:false},
  buf:{lab:"Pufr",pk:"a",r:true}
};
function heroList(){
  var t=heroState.type;
  if(t==="sa") return STRONG_A.map(function(a){ return {lab:a.f+" — "+a.n, pk:null}; });
  if(t==="sb") return STRONG_B.map(function(b){ return {lab:b.f+" — "+b.n+(b.nOH>1?" (2 OH⁻)":""), pk:null}; });
  if(t==="buf") return BUFFERS.map(function(b){ return {lab:b.n+" · pKa "+fmt(b.pKa,2), pk:b.pKa}; });
  var acid=(t==="wa"||t==="san");
  return KA.filter(function(k){ return k.t===(acid?"a":"b"); }).map(function(k){
    var pk=-L10(k.K);
    if(t==="san") return {lab:"sůl aniontu "+k.cj+" (z "+k.f+", pKa "+fmt(pk,2)+")", pk:pk, k:k};
    if(t==="scat") return {lab:"sůl kationtu "+k.cj+" (z "+k.f+", pKb "+fmt(pk,2)+")", pk:pk, k:k};
    return {lab:k.f+" — "+k.n+(k.st?" ("+k.st+")":"")+" · p"+(acid?"Ka":"Kb")+" "+fmt(pk,2), pk:pk, k:k};
  });
}
function heroFill(){
  var list=heroList(), sel=$("#heroSub");
  sel.innerHTML=list.map(function(x,i){ return '<option value="'+i+'">'+x.lab+'</option>'; }).join("");
  var def=0, t=heroState.type;
  if(t==="wa"||t==="san"){ list.forEach(function(x,i){ if(x.k&&x.k.f==="CH₃COOH") def=i; }); }
  if(t==="wb"||t==="scat"){ list.forEach(function(x,i){ if(x.k&&x.k.f==="NH₃") def=i; }); }
  heroState.sub=def; sel.value=def;
  if(list[def].pk!==null){ heroState.pk=list[def].pk; heroState.custom=false; $("#heroPK").value=heroState.pk.toFixed(2); }
  var T=HERO_TYPES[t];
  $("#heroPKWrap").hidden=!T.pk; $("#heroRWrap").hidden=!T.r;
  $("#heroPKL").innerHTML = T.pk==="b" ? 'p<span class="q">K</span><sub>b</sub>' : 'p<span class="q">K</span><sub>a</sub>';
  $("#heroCL").innerHTML = t==="buf" ? 'Celková koncentrace <span class="q">c</span>(HA) + <span class="q">c</span>(A⁻)' : (t==="san"||t==="scat" ? 'Koncentrace soli <span class="q">c</span>' : 'Koncentrace <span class="q">c</span>');
}
function heroCalc(){
  var st=heroState, t=st.type, c=Math.pow(10,st.lc), list=heroList(), it=list[st.sub]||list[0];
  var R={steps:[],approx:"",approxCls:"tip",note:"",alphaK:"Stupeň disociace α",alphaV:"—",alphaH:""};
  var pk=st.pk, K=Math.pow(10,-pk);
  if(t==="sa"){
    var a=STRONG_A[st.sub]||STRONG_A[0], h=c*a.nH;
    R.steps.push(a.f+" je silná kyselina → disociuje <b>úplně</b>: "+a.f+" + H₂O → H₃O⁺ + "+(a.poly?"HSO₄⁻":a.f.replace("H","")+"⁻"));
    R.steps.push("[H₃O⁺] = "+(a.nH>1?a.nH+"·":"")+"c = <b>"+conc(h)+" mol·dm⁻³</b>");
    R.steps.push("pH = −log[H₃O⁺] = −log("+sci(h,2)+") = <b>"+pf(-L10(h))+"</b>");
    R.steps.push("pOH = 14 − pH = <b>"+pf(14+L10(h))+"</b>;&nbsp; [OH⁻] = Kw/[H₃O⁺] = "+sci(KW/h,2)+" mol·dm⁻³");
    R.h=h; R.pH=-L10(h); R.alphaV="1 (100 %)"; R.alphaH="silný elektrolyt";
    if(c<=1e-5){
      var x=strongExact(c);
      R.approx="<span class='eyebrow'>Velmi zředěný roztok — příspěvek autoprotolýzy vody</span><p>Pod ≈ 10⁻⁵ mol·dm⁻³ už nelze zanedbat H₃O⁺ z vody. Přesně: x² − c·x − Kw = 0 → [H₃O⁺] = "+sci(x,3)+" → <b>pH = "+pf(-L10(x))+"</b> (naivně "+pf(-L10(c))+"). Kyselina nikdy nedá pH nad 7.</p>";
      R.approxCls="warn"; R.h=x; R.pH=-L10(x);
    } else R.approx="<span class='eyebrow'>Kontrola</span><p>Silná kyselina: žádná aproximace není potřeba, [H₃O⁺] je prostě rovna koncentraci (× počet odštěpených protonů). Autoprotolýza vody se projeví až pod ≈ 10⁻⁵ mol·dm⁻³.</p>";
    if(a.poly) R.note="U <b>vícesytné</b> H₂SO₄ počítáme jen 1. stupeň jako úplný; 2. stupeň (Ka₂ = 1,2·10⁻²) přidá jen část — u 0,01 M vyjde pH 1,84, ne 1,70. Podrobně v kapitole 1.";
    else R.note="Zkuste posunout koncentraci na 10⁻⁶ a níž: naivní vzorec pH = −log c začne selhávat, protože se ozve voda.";
  } else if(t==="sb"){
    var b=STRONG_B[st.sub]||STRONG_B[0], oh=c*b.nOH;
    R.steps.push(b.f+" je silná zásada → disociuje <b>úplně</b>: "+b.f+" → "+(b.nOH>1?b.f.replace("(OH)₂","²⁺ + 2 OH⁻"):b.f.replace("OH","⁺ + OH⁻")));
    R.steps.push("[OH⁻] = "+(b.nOH>1?"<b>2</b>·":"")+"c = <b>"+conc(oh)+" mol·dm⁻³</b>");
    R.steps.push("pOH = −log[OH⁻] = −log("+sci(oh,2)+") = <b>"+pf(-L10(oh))+"</b>");
    R.steps.push("pH = 14 − pOH = <b>"+pf(14+L10(oh))+"</b>;&nbsp; [H₃O⁺] = Kw/[OH⁻] = "+sci(KW/oh,2)+" mol·dm⁻³");
    R.h=KW/oh; R.pH=14+L10(oh); R.alphaV="1 (100 %)"; R.alphaH="silný elektrolyt";
    R.approx="<span class='eyebrow'>Kontrola</span><p>Silná zásada: nejdřív pOH, teprve pak pH = 14 − pOH. "+(b.nOH>1?"<b>Nezapomeňte na dvojku</b> — "+b.f+" uvolní dva OH⁻ na vzorcovou jednotku.":"Nejčastější chyba je vypočítat pOH a odevzdat ho jako pH.")+"</p>";
    R.note="Přepněte na Ca(OH)₂ při stejné koncentraci: pH stoupne o log 2 = 0,30. Zapomenutá dvojka je nejčastější chyba u silných zásad.";
  } else if(t==="wa"||t==="wb"){
    var isA=(t==="wa"), ws=weakSolve(K,c), f=it.k?it.k.f:"HA", cj=it.k?it.k.cj:"A⁻";
    var Ks=isA?"Ka":"Kb", pKs=isA?"pKa":"pKb";
    R.steps.push(f+" je slabá "+(isA?"kyselina":"zásada")+": "+f+" + H₂O ⇌ "+(isA?"H₃O⁺ + "+cj:cj+" + OH⁻")+"; &nbsp;"+Ks+" = 10^(−"+fmt(pk,2)+") = "+sci(K,2));
    R.steps.push("ICE: "+Ks+" = x² / (c − x), aproximace x ≪ c → "+Ks+" ≈ x² / c");
    R.steps.push("x = √("+Ks+"·c) = √("+sci(K,2)+" · "+conc(c)+") = <b>"+sci(ws.ap,3)+" mol·dm⁻³</b>"+(isA?" = [H₃O⁺]":" = [OH⁻]"));
    var pOHap=-L10(ws.ap), pHap=isA?pOHap:14-pOHap;
    if(isA) R.steps.push("pH = −log x = <b>"+pf(pHap)+"</b> &nbsp;(kontrola vzorcem pH = ½(pKa − log c) = ½("+fmt(pk,2)+" − ("+fmt(L10(c),2)+")) = "+pf(0.5*(pk-L10(c)))+")");
    else R.steps.push("pOH = −log x = "+pf(pOHap)+" → pH = 14 − pOH = <b>"+pf(pHap)+"</b> &nbsp;(vzorec pH = 14 − ½(pKb − log c) = "+pf(14-0.5*(pk-L10(c)))+")");
    R.steps.push("α = x / c = "+sci(ws.ap,2)+" / "+conc(c)+" = "+fmt(ws.ratio*100,2)+" % &nbsp;(Ostwald: α = √("+Ks+"/c))");
    var pHex=isA?-L10(ws.ex):14+L10(ws.ex);
    if(ws.ok){
      R.approx="<span class='eyebrow'>Kontrola aproximace — 5% pravidlo</span><p>x / c = "+fmt(ws.ratio*100,2)+" % &lt; 5 % ✓ aproximace x ≪ c je v pořádku. Pro srovnání přesné řešení kvadratické rovnice x² + "+Ks+"·x − "+Ks+"·c = 0: x = "+sci(ws.ex,3)+", pH = "+pf(pHex)+" — rozdíl "+fmt(Math.abs(pHex-pHap),2)+" jednotky pH.</p>";
      R.pH=pHap;
    } else {
      R.approx="<span class='eyebrow'>Kontrola aproximace — 5% pravidlo selhalo</span><p>x / c = "+fmt(ws.ratio*100,1)+" % &gt; 5 % ✕ — látka je disociovaná příliš, zanedbání x proti c neplatí. Řešíme přesně: x² + "+Ks+"·x − "+Ks+"·c = 0 → x = (−"+Ks+" + √("+Ks+"² + 4·"+Ks+"·c))/2 = <b>"+sci(ws.ex,3)+"</b> → <b>pH = "+pf(pHex)+"</b> (aproximace by dala "+pf(pHap)+"). V dlaždicích je přesná hodnota.</p>";
      R.approxCls="warn"; R.pH=pHex;
    }
    R.h=Math.pow(10,-R.pH); R.alphaV=fmt(ws.alpha*100,2)+" %"; R.alphaH="disociovaný podíl (přesně)";
    R.note="Zkuste zředit 0,1 M kyselinu octovou na 10⁻⁴ M: α vyroste z 1,3 % na 34 % — Ostwaldův zřeďovací zákon. A u HF (pKa 3,20) selže 5% pravidlo už při 0,1 M.";
  } else if(t==="san"||t==="scat"){
    var anion=(t==="san"), Kh=KW/K, ws2=weakSolve(Kh,c), fA=it.k?it.k.f:"HA", cj2=it.k?it.k.cj:"A⁻";
    if(anion){
      R.steps.push("Anion slabé kyseliny hydrolyzuje: "+cj2+" + H₂O ⇌ "+fA+" + OH⁻ &nbsp;→ roztok bude <b>zásaditý</b>");
      R.steps.push("Kb("+cj2+") = Kw / Ka("+fA+") = 10⁻¹⁴ / "+sci(K,2)+" = <b>"+sci(Kh,2)+"</b>");
      R.steps.push("[OH⁻] = √(Kb·c) = √("+sci(Kh,2)+" · "+conc(c)+") = <b>"+sci(ws2.ap,3)+" mol·dm⁻³</b>");
      var pOH2=-L10(ws2.ap);
      R.steps.push("pOH = "+pf(pOH2)+" → pH = 14 − pOH = <b>"+pf(14-pOH2)+"</b> &nbsp;(vzorec pH = 7 + ½(pKa + log c) = 7 + ½("+fmt(pk,2)+" + ("+fmt(L10(c),2)+")) = "+pf(7+0.5*(pk+L10(c)))+")");
      R.pH=ws2.ok?14-pOH2:14+L10(ws2.ex);
    } else {
      R.steps.push("Kation slabé zásady hydrolyzuje: "+cj2+" + H₂O ⇌ "+fA+" + H₃O⁺ &nbsp;→ roztok bude <b>kyselý</b>");
      R.steps.push("Ka("+cj2+") = Kw / Kb("+fA+") = 10⁻¹⁴ / "+sci(K,2)+" = <b>"+sci(Kh,2)+"</b>");
      R.steps.push("[H₃O⁺] = √(Ka·c) = √("+sci(Kh,2)+" · "+conc(c)+") = <b>"+sci(ws2.ap,3)+" mol·dm⁻³</b>");
      R.steps.push("pH = −log[H₃O⁺] = <b>"+pf(-L10(ws2.ap))+"</b> &nbsp;(vzorec pH = 7 − ½(pKb + log c) = 7 − ½("+fmt(pk,2)+" + ("+fmt(L10(c),2)+")) = "+pf(7-0.5*(pk+L10(c)))+")");
      R.pH=ws2.ok?-L10(ws2.ap):-L10(ws2.ex);
    }
    R.h=Math.pow(10,-R.pH); R.alphaK="Stupeň hydrolýzy"; R.alphaV=fmt(ws2.alpha*100,3)+" %"; R.alphaH="podíl zhydrolyzovaných iontů";
    R.approx = ws2.ok
      ? "<span class='eyebrow'>Kontrola aproximace</span><p>x / c = "+fmt(ws2.ratio*100,3)+" % &lt; 5 % ✓. Hydrolýza je slabá, protože konstanta hydrolýzy Kw/K je malá — sůl slabé kyseliny je „slabší zásada“ než mateřská kyselina „slabá kyselina“.</p>"
      : "<span class='eyebrow'>Kontrola aproximace selhala</span><p>x / c = "+fmt(ws2.ratio*100,1)+" % &gt; 5 % — přesné řešení: x = "+sci(ws2.ex,3)+", pH = "+pf(R.pH)+".</p>";
    if(!ws2.ok) R.approxCls="warn";
    R.note="Silná zásada + slabá kyselina → sůl reaguje zásaditě (CH₃COONa, pH 8,88 při 0,1 M). Silná kyselina + slabá zásada → kysele (NH₄Cl, pH 5,13). Sůl silné kyseliny a silné zásady (NaCl) nehydrolyzuje: pH 7.";
  } else {
    var bf=BUFFERS[st.sub]||BUFFERS[0], r=Math.pow(10,st.lr), pKa=st.pk;
    var cHA=c/(1+r), cA=c*r/(1+r), pHb=pKa+L10(r);
    R.steps.push("Pufr "+bf.ha+" / "+bf.a+": Hendersonova–Hasselbalchova rovnice pH = pKa + log([A⁻]/[HA])");
    R.steps.push("c(HA) = "+conc(cHA)+", c(A⁻) = "+conc(cA)+" mol·dm⁻³ &nbsp;→ poměr [A⁻]/[HA] = "+fmt(r,2));
    R.steps.push("pH = "+fmt(pKa,2)+" + log("+fmt(r,2)+") = "+fmt(pKa,2)+" + ("+fmt(L10(r),2)+") = <b>"+pf(pHb)+"</b>");
    R.steps.push("[H₃O⁺] = Ka · [HA]/[A⁻] = "+sci(Math.pow(10,-pKa),2)+" · "+fmt(1/r,2)+" = "+sci(Math.pow(10,-pHb),2)+" mol·dm⁻³");
    R.pH=pHb; R.h=Math.pow(10,-pHb); R.alphaK="Poměr [A⁻]/[HA]"; R.alphaV=fmt(r,2)+" : 1"; R.alphaH="pH = pKa ± 1 ⇔ poměr 1/10 … 10";
    R.approx="<span class='eyebrow'>Kdy rovnice platí</span><p>HH rovnice předpokládá, že obě složky jsou přítomny v podstatném množství (poměr zhruba 0,1–10, tj. pH = pKa ± 1) a koncentrace nejsou extrémně nízké. Všimněte si, že celková koncentrace pH pufru nemění — mění jen jeho <b>kapacitu</b>.</p>";
    R.note="Nastavte poměr 1 : 1 — pH = pKa. Poměr 10 : 1 zvedne pH přesně o jednotku. Krev: hydrogenuhličitanový pufr s poměrem 20 : 1 → pH = 6,1 + 1,30 = 7,40.";
  }
  R.pOH=14-R.pH; R.oh=KW/R.h;
  return R;
}
function drawHero(){
  var R=heroCalc(), st=heroState;
  var W=760,H=150,L=48,Rr=712,y=54,h=28;
  var X=function(p){ return L+(Rr-L)*clamp(p,0,14)/14; };
  var s='';
  for(var i=0;i<14;i++){
    var col=i<7?"var(--exo)":"var(--endo)", op=i<7?(0.12+(6-i)/6*0.7):(0.12+(i-7)/6*0.7);
    s+='<rect x="'+X(i)+'" y="'+y+'" width="'+((Rr-L)/14).toFixed(2)+'" height="'+h+'" style="fill:'+col+';fill-opacity:'+op.toFixed(2)+'"/>';
  }
  for(var p=0;p<=14;p++){
    s+=line(X(p),y+h,X(p),y+h+5,{c:"var(--ink-3)"});
    s+=txt(X(p),y+h+19,p,{anchor:"middle",size:11,fill:"var(--ink-3)",mono:true});
    s+=txt(X(p),y-8,14-p,{anchor:"middle",size:10,fill:"var(--ink-3)",mono:true});
  }
  s+=txt(L,y+h+38,"KYSELÉ · [H₃O⁺] > [OH⁻]",{size:10.5,w:600,fill:"var(--exo)",style:"letter-spacing:.07em"});
  s+=txt(X(7),y+h+38,"NEUTRÁLNÍ",{anchor:"middle",size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.07em"});
  s+=txt(Rr,y+h+38,"ZÁSADITÉ · [OH⁻] > [H₃O⁺]",{anchor:"end",size:10.5,w:600,fill:"var(--endo)",style:"letter-spacing:.07em"});
  s+=txt(L-6,y-8,"pOH",{anchor:"end",size:10,w:600,fill:"var(--ink-3)"});
  s+=txt(L-6,y+h+19,"pH",{anchor:"end",size:11,w:600,fill:"var(--ink-3)"});
  var xm=X(R.pH);
  s+='<path d="M'+xm+' '+(y+h+2)+' l-7 11 l14 0 z" style="fill:var(--accent)"/>';
  s+=line(xm,y-2,xm,y+h+2,{c:"var(--accent)",w:2.5});
  s+=rect(xm-40,y-30,80,19,{fill:"var(--accent)",r:5});
  s+=txt(xm,y-16,"pH "+pf(R.pH),{anchor:"middle",size:12,w:600,fill:"var(--accent-ink)",mono:true});
  $("#heroSvgWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Stupnice pH s vyznačenou hodnotou"');
  var acid=R.pH<7;
  ro("#heroRo1","pH",pf(R.pH),acid?"kyselý roztok":(R.pH>7?"zásaditý roztok":"neutrální"),acid?"neg":"pos");
  ro("#heroRo2","pOH",pf(R.pOH),"pH + pOH = 14");
  ro("#heroRo3","[H₃O⁺]",sci(R.h,2),"mol·dm⁻³");
  ro("#heroRo4","[OH⁻]",sci(R.oh,2),"mol·dm⁻³");
  ro("#heroRo5",R.alphaK,R.alphaV,R.alphaH);
  $("#heroSteps").innerHTML=eqs(R.steps);
  var ap=$("#heroApprox"); ap.className="callout "+R.approxCls; ap.innerHTML=R.approx;
  $("#heroNote").innerHTML=R.note;
  $("#heroCV").textContent=conc(Math.pow(10,st.lc))+" mol·dm⁻³";
  $("#heroPKV").textContent=fmt(st.pk,2)+(st.custom?" (vlastní)":"");
  $("#heroRV").textContent=fmt(Math.pow(10,st.lr),2);
}
function initHero(){
  segBind("heroType",function(v){ heroState.type=v; heroFill(); drawHero(); });
  selBind("heroSub",function(v){ heroState.sub=+v; var it=heroList()[+v]; if(it&&it.pk!==null){ heroState.pk=it.pk; heroState.custom=false; $("#heroPK").value=it.pk.toFixed(2); } drawHero(); });
  rngBind("heroC",function(v){ heroState.lc=v; drawHero(); });
  rngBind("heroPK",function(v){ heroState.pk=v; heroState.custom=true; drawHero(); });
  rngBind("heroR",function(v){ heroState.lr=v; drawHero(); });
  heroFill(); drawHero();
}

/* ============================================================
   T3 · LOGARITMICKÁ LIŠTA + trenažér log/antilog (kapitola 0)
   ============================================================ */
var lgState={pH:7};
function drawLog(){
  var pH=lgState.pH, h=Math.pow(10,-pH), oh=KW/h;
  var W=760,H=170,L=60,R=700,y1=44,y2=118;
  var X=function(p){ return L+(R-L)*p/14; };
  var s='';
  s+=txt(L,y1-22,"pH  (o jednotku výš = 10× méně H₃O⁺)",{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  s+=line(L,y1,R,y1,{c:"var(--line-strong)",w:2});
  s+=line(L,y2,R,y2,{c:"var(--line-strong)",w:2});
  for(var p=0;p<=14;p++){
    s+=line(X(p),y1-5,X(p),y1+5,{c:"var(--ink-3)"});
    s+=txt(X(p),y1+20,p,{anchor:"middle",size:11.5,fill:"var(--ink-2)",mono:true,w:600});
    s+=line(X(p),y2-5,X(p),y2+5,{c:"var(--ink-3)"});
    s+=txt(X(p),y2+20,"10"+sup(-p),{anchor:"middle",size:10.5,fill:"var(--ink-2)",mono:true});
  }
  s+=txt(L,y2-14,"[H₃O⁺] v mol·dm⁻³",{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  s+=txt(R,y2-14,"pOH = 14 − pH · [OH⁻] = Kw/[H₃O⁺]",{anchor:"end",size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  var xm=X(pH);
  s+=line(xm,y1-14,xm,y2+8,{c:"var(--accent)",w:2,dash:"4 3"});
  s+=dot(xm,y1,"var(--accent)",6); s+=dot(xm,y2,"var(--accent)",6);
  $("#lgWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Logaritmická lišta pH a koncentrace"');
  $("#lgPHV").textContent=pf(pH);
  ro("#lgRo1","[H₃O⁺] = 10⁻ᵖᴴ",sci(h,2),"mol·dm⁻³",pH<7?"neg":"");
  ro("#lgRo2","pOH = 14 − pH",pf(14-pH),"");
  ro("#lgRo3","[OH⁻] = Kw / [H₃O⁺]",sci(oh,2),"mol·dm⁻³",pH>7?"pos":"");
  ro("#lgRo4","Poměr [H₃O⁺] : [OH⁻]",pH<=7?sci(h/oh,1)+" : 1":"1 : "+sci(oh/h,1),pH===7?"neutrální roztok":(pH<7?"převažují oxoniové kationty":"převažují hydroxidové anionty"));
}
var LG_M=[2,3,5,2,3,5,4,6,8,2.5,1.5,7];
var LG_LOG={"2":"0,30","3":"0,48","5":"0,70","4":"0,60","6":"0,78","8":"0,90","2.5":"0,40","1.5":"0,18","7":"0,85"};
var lgTask=null, lgScore=0, lgN=0;
function lgNew(){
  var m=LG_M[Math.floor(Math.random()*LG_M.length)], e=-(2+Math.floor(Math.random()*10));
  var dir=Math.random()<0.55?"h":"oh";
  var pX=-(e+L10(m));
  lgTask={m:m,e:e,dir:dir,ans:dir==="h"?pX:14-pX,pX:pX};
  $("#lgTask").innerHTML=(dir==="h"?"[H₃O⁺]":"[OH⁻]")+" = <b>"+fmt(m,1)+"·10"+sup(e)+"</b> mol·dm⁻³ &nbsp;→&nbsp; jaké je <b>pH</b>? (bez kalkulačky, na 2 desetinná místa)";
  $("#lgAns").value=""; $("#lgAns").disabled=false;
  var v=$("#lgVerdict"); v.className="explain"; v.style.display="none";
  $("#lgAns").focus();
}
function lgCheck(){
  if(!lgTask) return;
  var raw=($("#lgAns").value||"").trim().replace(",",".").replace(/−/g,"-"), v=parseFloat(raw);
  if(isNaN(v)){ toast("Zadejte číslo, např. 4,52."); return; }
  var ok=Math.abs(v-lgTask.ans)<=0.06; lgN++; if(ok) lgScore++;
  var m=lgTask.m, e=lgTask.e, lm=LG_LOG[String(m)]||fmt(L10(m),2);
  var why="log("+fmt(m,1)+"·10"+sup(e)+") = log "+fmt(m,1)+" + ("+e+") = "+lm+" − "+(-e)+" → "+(lgTask.dir==="h"?"pH":"pOH")+" = "+(-e)+" − "+lm+" = <b>"+pf(lgTask.pX)+"</b>";
  if(lgTask.dir==="oh") why+=" → pH = 14 − "+pf(lgTask.pX)+" = <b>"+pf(lgTask.ans)+"</b>";
  why+=". Pomůcka: mantisa 1–10 dává log mezi 0 a 1, takže pH leží mezi "+(-e-1)+" a "+(-e)+".";
  var el=$("#lgVerdict"); el.style.display="flex"; el.style.background=ok?"var(--ok-soft)":"var(--bad-soft)"; el.style.borderColor=ok?"var(--ok)":"var(--bad)";
  el.innerHTML='<span class="verdict" style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+(ok?"✓ Správně":"✕ Správně je "+pf(lgTask.ans))+'</span><span class="eyebrow">Proč</span><div>'+why+'</div>';
  $("#lgScore").textContent=lgScore+" / "+lgN;
  $("#lgAns").disabled=true;
  if(lgN>=8 && lgScore/lgN>=0.7) markDone("k0");
}
function initLog(){
  rngBind("lgPH",function(v){ lgState.pH=v; drawLog(); });
  $("#lgNew").addEventListener("click",lgNew);
  $("#lgCheck").addEventListener("click",lgCheck);
  $("#lgAns").addEventListener("keydown",function(e){ if(e.key==="Enter"){ if($("#lgAns").disabled) lgNew(); else lgCheck(); } });
  drawLog(); lgNew();
}
