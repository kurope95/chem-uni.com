/* ============================================================
   T9 · MODEL — pufr (kapitola 4)
   ============================================================ */
var bfState={i:0,lr:0,c:0.2,add:0.01};
function bfPH(pKa,ha,a){ return pKa+L10(a/ha); }
function drawBuffer(){
  var st=bfState, b=BUFFERS[st.i], r=Math.pow(10,st.lr), c=st.c, n=st.add;
  var ha=c/(1+r), a=c*r/(1+r), pH0=b.pKa+L10(r);
  var ha2=ha-n, a2=a+n, pH2, exhausted=false, ex=0;   /* n>0 = zásada mění HA→A⁻ */
  if(ha2>0&&a2>0){ pH2=b.pKa+L10(a2/ha2); }
  else { exhausted=true; if(n>0){ ex=n-ha; ha2=0; a2=c; pH2=14+L10(ex); } else { ex=-n-a; a2=0; ha2=c; pH2=-L10(ex); } }
  var pHw = n>0 ? 14+L10(n) : (n<0 ? -L10(-n) : 7);
  var beta=2.303*ha*a/(ha+a);
  /* SVG: sloupce před/po + pH značky */
  var W=760,H=300, y0=232, hmax=150, max=Math.max(c,ha2,a2,1e-9);
  var s='';
  function bars(x,lab,HA,A){
    var t='', hh=HA/max*hmax, ah=A/max*hmax;
    t+=rect(x,y0-hh,54,hh,{fill:"var(--exo)",r:5}); t+=rect(x+62,y0-ah,54,ah,{fill:"var(--endo)",r:5});
    t+=txt(x+27,y0-hh-7,fmt(HA,3),{anchor:"middle",size:11,w:600,fill:"var(--exo)",mono:true});
    t+=txt(x+89,y0-ah-7,fmt(A,3),{anchor:"middle",size:11,w:600,fill:"var(--endo)",mono:true});
    t+=txt(x+27,y0+17,"HA",{anchor:"middle",size:11,fill:"var(--ink-3)"}); t+=txt(x+89,y0+17,"A⁻",{anchor:"middle",size:11,fill:"var(--ink-3)"});
    t+=txt(x+58,y0+34,lab,{anchor:"middle",size:11.5,w:600,fill:"var(--ink)"});
    return t;
  }
  s+=txt(40,24,"SLOŽENÍ PUFRU [mol·dm⁻³]",{size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  s+=line(40,y0,470,y0,{c:"var(--line-strong)",w:1.5});
  s+=bars(70,"před přídavkem",ha,a);
  s+=bars(280,"po přídavku "+sgn(n,3)+" mol",ha2,a2);
  /* pH stupnice vpravo */
  var xs=560, yT=40, yB=232, Y=function(p){ return yB-(clamp(p,0,14))/14*(yB-yT); };
  s+=txt(xs+60,24,"pH",{anchor:"middle",size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  s+=line(xs,yT,xs,yB,{c:"var(--line-strong)",w:1.5});
  for(var p=0;p<=14;p+=2){ s+=line(xs-4,Y(p),xs+4,Y(p),{c:"var(--ink-3)"}); s+=txt(xs-9,Y(p)+4,p,{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true}); }
  s+=rect(xs+2,Y(b.pKa+1),18,Y(b.pKa-1)-Y(b.pKa+1),{fill:"var(--endo)",style:"fill-opacity:.18"});
  s+=txt(xs+24,Y(b.pKa+1)+4,"pKa ± 1",{size:10,fill:"var(--ink-3)"});
  s+=dot(xs,Y(pH0),"var(--ink-3)",5); s+=txt(xs+28,Y(pH0)+4,"pufr před: "+pf(pH0),{size:11,w:600,fill:"var(--ink-2)",mono:true});
  s+=dot(xs,Y(pH2),"var(--accent)",6); s+=txt(xs+28,Y(pH2)+(Math.abs(pH2-pH0)<0.6?18:4),"pufr po: "+pf(pH2),{size:11.5,w:600,fill:"var(--accent)",mono:true});
  s+=dot(xs,Y(pHw),"var(--bad)",5); s+=txt(xs+28,Y(pHw)+(Math.abs(pHw-pH2)<0.6?-10:4),"voda po: "+pf(pHw),{size:11,w:600,fill:"var(--bad)",mono:true});
  $("#bfWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Složení pufru před a po přídavku a srovnání pH s vodou"');
  $("#bfRV").textContent=fmt(r,2); $("#bfCV").textContent=fmt(c,2)+" mol·dm⁻³"; $("#bfAddV").textContent=sgn(n,3)+" mol";
  ro("#bfRo1","pH pufru",pf(pH0),"pKa + log("+fmt(r,2)+")");
  ro("#bfRo2","pH po přídavku",pf(pH2),exhausted?"kapacita vyčerpána!":"Δ = "+sgn(pH2-pH0,2),exhausted?"neg":"");
  ro("#bfRo3","Voda po stejném přídavku",pf(pHw),"Δ = "+sgn(pHw-7,2));
  ro("#bfRo4","Kapacita β",fmt(beta,3)+" mol·dm⁻³","na jednotku pH; max. při 1 : 1");
  var stp=[];
  stp.push("Složení: c(HA) = "+fmt(ha,3)+", c(A⁻) = "+fmt(a,3)+" mol·dm⁻³ → pH = "+fmt(b.pKa,2)+" + log("+fmt(a,3)+"/"+fmt(ha,3)+") = <b>"+pf(pH0)+"</b>");
  if(n>0) stp.push("Přidaný OH⁻ ("+fmt(n,3)+" mol) zreaguje s kyselinou: HA + OH⁻ → A⁻ + H₂O → n(HA) = "+fmt(ha,3)+" − "+fmt(n,3)+" = "+fmt(Math.max(ha2,0),3)+", n(A⁻) = "+fmt(a,3)+" + "+fmt(n,3)+" = "+fmt(Math.min(a2,c),3));
  else if(n<0) stp.push("Přidaný H₃O⁺ ("+fmt(-n,3)+" mol) zreaguje se zásadou: A⁻ + H₃O⁺ → HA + H₂O → n(A⁻) = "+fmt(a,3)+" − "+fmt(-n,3)+" = "+fmt(Math.max(a2,0),3)+", n(HA) = "+fmt(ha,3)+" + "+fmt(-n,3)+" = "+fmt(Math.min(ha2,c),3));
  else stp.push("Bez přídavku — pH je dané jen poměrem složek.");
  if(!exhausted&&n!==0) stp.push("pH = "+fmt(b.pKa,2)+" + log("+fmt(a2,3)+"/"+fmt(ha2,3)+") = <b>"+pf(pH2)+"</b> &nbsp;·&nbsp; ve vodě by stejný přídavek dal ["+(n>0?"OH⁻":"H₃O⁺")+"] = "+fmt(Math.abs(n),3)+" → pH <b>"+pf(pHw)+"</b>");
  if(exhausted) stp.push("Přídavek je větší než zásoba "+(n>0?"kyseliny HA":"zásady A⁻")+" — pufr je <b>vyčerpán</b>; zbývá "+fmt(ex,3)+" mol silné "+(n>0?"zásady":"kyseliny")+" v 1 dm³ → pH = <b>"+pf(pH2)+"</b>");
  stp.push("Kapacita β ≈ 2,303 · "+fmt(ha,3)+" · "+fmt(a,3)+" / "+fmt(c,3)+" = <b>"+fmt(beta,3)+" mol·dm⁻³</b> na jednotku pH");
  $("#bfSteps").innerHTML=eqs(stp);
  $("#bfNote").innerHTML = exhausted ? "Přídavek přesáhl kapacitu pufru — jedna složka došla a&nbsp;pH skočilo jako v&nbsp;čisté vodě. Zvyšte celkovou koncentraci: pH se nezmění, ale kapacita ano."
    : "Zkuste stejný přídavek při koncentraci 0,02 a&nbsp;1,0 mol·dm⁻³: pH pufru je stejné, ale změna po přídavku se liší padesátkrát. Zředění mění kapacitu, ne pH. A&nbsp;posuňte poměr mimo p<i>K</i><sub>a</sub> ± 1 — kapacita padá.";
}
/* ============================================================
   T10 · GRAF — titrační křivka (kapitola 5)
   ============================================================ */
var TI={
  sa:{lab:"HCl + NaOH",K:null,pK:null,acid:true},
  wa:{lab:"CH₃COOH + NaOH",K:1.75e-5,pK:4.76,acid:true},
  wb:{lab:"NH₃ + HCl",K:1.78e-5,pK:4.75,acid:false}
};
var tiState={type:"wa",V:12.5};
function tiPH(type,V){
  var t=TI[type], n0=2.5, nT=0.1*V, Vt=25+V, eq=Math.abs(nT-n0)<1e-9, R={};
  if(type==="sa"){
    if(nT<n0-1e-9){ var h=(n0-nT)/Vt; R.pH=-L10(h); R.reg="nadbytek silné kyseliny"; R.st=["n(H₃O⁺) = 2,50 − "+fmt(nT,3)+" = "+fmt(n0-nT,3)+" mmol v "+fmt(Vt,1)+" mL → [H₃O⁺] = "+sci(h,2)+" → pH = <b>"+pf(R.pH)+"</b>"]; }
    else if(eq){ R.pH=7; R.reg="bod ekvivalence — jen NaCl"; R.st=["n(H₃O⁺) = n(OH⁻) = 2,50 mmol → zůstal jen NaCl, nehydrolyzuje → pH = <b>7,00</b>"]; }
    else { var oh=(nT-n0)/Vt; R.pH=14+L10(oh); R.reg="nadbytek silné zásady"; R.st=["n(OH⁻) nadbytek = "+fmt(nT,3)+" − 2,50 = "+fmt(nT-n0,3)+" mmol v "+fmt(Vt,1)+" mL → [OH⁻] = "+sci(oh,2)+" → pOH = "+pf(-L10(oh))+" → pH = <b>"+pf(R.pH)+"</b>"]; }
    return R;
  }
  var K=t.K, pK=t.pK;
  if(nT<n0-1e-9){
    var cX=(n0-nT)/Vt, cY=nT/Vt, x=posRoot(cY+K,K*cX);   /* x = [H₃O⁺] u kyseliny, [OH⁻] u zásady */
    var p=-L10(x);
    R.pH=t.acid?p:14-p;
    if(V===0){ R.reg=t.acid?"výchozí slabá kyselina":"výchozí slabá zásada"; R.st=["x = √(K·c) = √("+sci(K,2)+" · 0,100) = "+sci(Math.sqrt(K*0.1),3)+" → "+(t.acid?"pH":"pOH")+" = "+pf(-L10(Math.sqrt(K*0.1)))+(t.acid?"":" → pH = "+pf(14+L10(Math.sqrt(K*0.1))))+" &nbsp;(přesně kvadraticky: <b>"+pf(R.pH)+"</b>)"]; }
    else {
      var hh=pK+L10(nT/(n0-nT)); if(!t.acid) hh=14-hh;
      R.reg=Math.abs(nT-n0/2)<1e-9?"polovina titrace — pH = p"+(t.acid?"Ka":"Ka(BH⁺)"):"pufrovací oblast";
      R.st=["n("+(t.acid?"HA":"B")+") = 2,50 − "+fmt(nT,3)+" = "+fmt(n0-nT,3)+" mmol; n("+(t.acid?"A⁻":"BH⁺")+") = "+fmt(nT,3)+" mmol",
        (t.acid?"pH = pKa + log(n(A⁻)/n(HA)) = "+fmt(pK,2)+" + log("+fmt(nT/(n0-nT),3)+") = <b>"+pf(hh)+"</b>":"pOH = pKb + log(n(BH⁺)/n(B)) = "+fmt(pK,2)+" + log("+fmt(nT/(n0-nT),3)+") = "+pf(14-hh)+" → pH = <b>"+pf(hh)+"</b>")+" &nbsp;(přesně: "+pf(R.pH)+")"];
    }
  } else if(eq){
    var cS=n0/Vt, Kh=KW/K, y=Math.sqrt(Kh*cS);
    R.pH=t.acid?14+L10(y):-L10(y);
    R.reg="bod ekvivalence — "+(t.acid?"sůl slabé kyseliny (hydrolýza aniontu)":"sůl slabé zásady (hydrolýza kationtu)");
    R.st=["Vše přeměněno na "+(t.acid?"A⁻":"BH⁺")+": c = 2,50 mmol / "+fmt(Vt,1)+" mL = "+fmt(cS,3)+" mol·dm⁻³ (poloviční — objem se zdvojnásobil!)",
      "K hydrolýzy = Kw/K = "+sci(Kh,2)+" → ["+(t.acid?"OH⁻":"H₃O⁺")+"] = √("+sci(Kh,2)+" · "+fmt(cS,3)+") = "+sci(y,2)+" → pH = <b>"+pf(R.pH)+"</b>",
      "zkratka: pH = 7 "+(t.acid?"+":"−")+" ½(p"+(t.acid?"Ka":"Kb")+" + log c) = 7 "+(t.acid?"+":"−")+" ½("+fmt(pK,2)+" + ("+fmt(L10(cS),2)+")) = "+pf(t.acid?7+0.5*(pK+L10(cS)):7-0.5*(pK+L10(cS)))];
  } else {
    var exc=(nT-n0)/Vt; R.pH=t.acid?14+L10(exc):-L10(exc);
    R.reg="nadbytek silného činidla";
    R.st=["nadbytek "+(t.acid?"OH⁻":"H₃O⁺")+" = "+fmt(nT,3)+" − 2,50 = "+fmt(nT-n0,3)+" mmol v "+fmt(Vt,1)+" mL → "+sci(exc,2)+" mol·dm⁻³ → "+(t.acid?"pOH = "+pf(-L10(exc))+" → ":"")+"pH = <b>"+pf(R.pH)+"</b> (hydrolýzu soli zanedbáme — silný elektrolyt rozhoduje)"];
  }
  return R;
}
function drawTitr(){
  var st=tiState, t=TI[st.type], W=760,H=380;
  var fr=frame({L:56,R:720,T:26,B:310,x0:0,x1:50,y0:0,y1:14,xt:5,yt:2,xf:function(v){return fmt(v,0);},yf:function(v){return fmt(v,0);},xl:"přidaný objem činidla [mL]",yl:"pH"});
  var s='';
  /* indikátory */
  s+=rect(fr.X(0),fr.Y(10.0),fr.X(50)-fr.X(0),fr.Y(8.2)-fr.Y(10.0),{fill:"var(--cat2)",style:"fill-opacity:.14"});
  s+=rect(fr.X(0),fr.Y(4.4),fr.X(50)-fr.X(0),fr.Y(3.1)-fr.Y(4.4),{fill:"var(--cat3)",style:"fill-opacity:.16"});
  s+=txt(fr.X(49.5),fr.Y(9.1)+4,"fenolftalein",{anchor:"end",size:10.5,w:600,fill:"var(--cat2)"});
  s+=txt(fr.X(49.5),fr.Y(3.75)+4,"methyloranž",{anchor:"end",size:10.5,w:600,fill:"var(--cat3)"});
  /* pufrovací oblast */
  if(t.K){ var va=25/11, vb=25*10/11; s+=rect(fr.X(va),fr.T,fr.X(vb)-fr.X(va),fr.B-fr.T,{fill:"var(--endo)",style:"fill-opacity:.09"}); s+=txt(fr.X(12.5),fr.T+14,"pufrovací oblast",{anchor:"middle",size:10.5,w:600,fill:"var(--endo)"}); }
  s+=fr.s;
  s+=line(fr.X(0),fr.Y(7),fr.X(50),fr.Y(7),{c:"var(--ink-3)",w:1,dash:"3 4"});
  var pts=[];
  for(var v=0;v<=50.001;v+=0.1){ var vv=Math.round(v*10)/10; pts.push(fr.X(vv).toFixed(1)+","+fr.Y(tiPH(st.type,vv).pH).toFixed(1)); }
  s+=poly(pts,"var(--accent)",2.8);
  var E=tiPH(st.type,25);
  s+=dot(fr.X(25),fr.Y(E.pH),"var(--ink)",6);
  s+=txt(fr.X(25)+10,fr.Y(E.pH)+4,"ekvivalence pH "+pf(E.pH),{size:11.5,w:600,fill:"var(--ink)",mono:true});
  if(t.K){ var half=tiPH(st.type,12.5); s+=dot(fr.X(12.5),fr.Y(half.pH),"var(--endo)",5); s+=txt(fr.X(12.5)+8,fr.Y(half.pH)+(t.acid?16:-8),"½: pH = "+pf(half.pH),{size:11,w:600,fill:"var(--endo)",mono:true}); }
  var cur=tiPH(st.type,st.V);
  s+=line(fr.X(st.V),fr.T,fr.X(st.V),fr.B,{c:"var(--accent)",w:1,dash:"3 3"});
  s+=dot(fr.X(st.V),fr.Y(cur.pH),"var(--accent)",7);
  $("#tiWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Titrační křivka '+t.lab+'"');
  $("#tiVV").textContent=fmt(st.V,1)+" mL";
  ro("#tiRo1","pH při "+fmt(st.V,1)+" mL",pf(cur.pH),cur.reg,cur.pH<7?"neg":(cur.pH>7?"pos":""));
  ro("#tiRo2","Co je v baňce",cur.reg,"");
  ro("#tiRo3","pH v bodě ekvivalence",pf(E.pH),st.type==="sa"?"jen NaCl → 7,00":(t.acid?"hydrolýza aniontu → > 7":"hydrolýza kationtu → < 7"));
  ro("#tiRo4","Vhodný indikátor",st.type==="sa"?"oba":(t.acid?"fenolftalein":"methyloranž"),st.type==="sa"?"skok 3,7 → 10,3":(t.acid?"skok 7,2 → 10,3; methyloranž selže":"skok 6,9 → 3,7; fenolftalein selže"));
  $("#tiSteps").innerHTML=eqs(cur.st);
  $("#tiNote").innerHTML = st.type==="sa" ? "U&nbsp;silné kyseliny je křivka symetrická kolem pH 7 a&nbsp;skok obrovský. Přepněte na kyselinu octovou: začátek stoupne na 2,88, objeví se plochá pufrovací oblast a&nbsp;ekvivalence se posune na 8,73."
    : t.acid ? "Nastavte 12,5 mL: pH = p<i>K</i><sub>a</sub> = 4,76 — tak se p<i>K</i><sub>a</sub> měří. Nastavte 25,0 mL: pH 8,73, protože octan hydrolyzuje. Methyloranž by se zbarvila už kolem 5 mL."
    : "Zrcadlový obraz kyseliny octové: v&nbsp;polovině pH = 14 − p<i>K</i><sub>b</sub> = 9,25, v&nbsp;ekvivalenci 5,28 (NH₄⁺ hydrolyzuje kysele). Fenolftalein by tu selhal — odbarví se dávno před ekvivalencí.";
}
function initBufferTitr(){
  var sel=$("#bfSel");
  sel.innerHTML=BUFFERS.map(function(b,i){ return '<option value="'+i+'">'+b.n+' · pKa '+fmt(b.pKa,2)+'</option>'; }).join("");
  selBind("bfSel",function(v){ bfState.i=+v; drawBuffer(); });
  rngBind("bfR",function(v){ bfState.lr=v; drawBuffer(); });
  rngBind("bfC",function(v){ bfState.c=v; drawBuffer(); });
  rngBind("bfAdd",function(v){ bfState.add=v; drawBuffer(); });
  segBind("tiType",function(v){ tiState.type=v; drawTitr(); });
  rngBind("tiV",function(v){ tiState.V=v; drawTitr(); });
  drawBuffer(); drawTitr();
}
