/* ============================================================
   T4 · GRAF — velmi zředěné roztoky (kapitola 1)
   ============================================================ */
var dilE=3;
function drawDil(){
  var W=760,H=320;
  var fr=frame({W:W,H:H,L:60,R:720,T:24,B:262,x0:0,x1:10,y0:0,y1:8,xt:1,yt:1,
    xf:function(v){return "10"+sup(-v);},yf:function(v){return fmt(v,0);},xl:"koncentrace HCl [mol·dm⁻³]",yl:"pH"});
  var s=fr.s;
  /* pH 7 */
  s+=line(fr.X(0),fr.Y(7),fr.X(10),fr.Y(7),{c:"var(--endo)",w:1.5,dash:"6 4"});
  s+=txt(fr.X(0.15),fr.Y(7)-7,"pH 7 — čistá voda",{size:11,w:600,fill:"var(--endo)"});
  /* naivní */
  s+=poly([fr.X(0).toFixed(1)+","+fr.Y(0).toFixed(1),fr.X(8).toFixed(1)+","+fr.Y(8).toFixed(1)],"var(--ink-3)",2,"5 4");
  s+=txt(fr.X(7.7),fr.Y(8)+2,"pH = −log c",{anchor:"end",size:11,w:600,fill:"var(--ink-3)"});
  /* přesně */
  var pts=[];
  for(var e=0;e<=10;e+=0.1){ var x=strongExact(Math.pow(10,-e)); pts.push(fr.X(e).toFixed(1)+","+fr.Y(-L10(x)).toFixed(1)); }
  s+=poly(pts,"var(--accent)",2.8);
  var c=Math.pow(10,-dilE), ex=strongExact(c), pE=-L10(ex), pN=dilE;
  s+=line(fr.X(dilE),fr.Y(0),fr.X(dilE),fr.Y(8),{c:"var(--ink)",w:1,dash:"3 3"});
  if(pN<=8) s+=dot(fr.X(dilE),fr.Y(pN),"var(--ink-3)",5);
  s+=dot(fr.X(dilE),fr.Y(pE),"var(--accent)",6);
  s+=txt(fr.X(dilE)+9,fr.Y(pE)+4,"pH "+pf(pE),{size:12,w:600,fill:"var(--accent)",mono:true});
  $("#dilWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="pH zředěné kyseliny — naivní a přesný výpočet"');
  $("#dilEV").textContent=fmt(dilE,1);
  ro("#dilRo1","Naivní pH = −log c",pf(pN),pN>7?"nesmysl — kyselina nad 7":"",pN>7?"pos":"");
  ro("#dilRo2","Přesné pH",pf(pE),"z x² − c·x − Kw = 0","neg");
  ro("#dilRo3","Rozdíl",fmt(Math.abs(pE-pN),2),Math.abs(pE-pN)<0.01?"zanedbatelný — naivní vzorec stačí":"voda už rozhoduje");
}

/* ============================================================
   T5 · KALKULAČKA — smíchání kyseliny a zásady
   ============================================================ */
var mixState={V1:50,c1:0.1,V2:40,c2:0.1,nH:1,nOH:1};
function drawMix(){
  var m=mixState, nH=m.V1*m.c1*m.nH, nOH=m.V2*m.c2*m.nOH, V=m.V1+m.V2;
  var ex=Math.abs(nH-nOH), acid=nH>nOH, eqv=Math.abs(nH-nOH)<1e-9, pH, cEx=V>0?ex/V:0;
  if(eqv||V===0) pH=7; else pH = acid ? -L10(cEx) : 14+L10(cEx);
  /* graf: dva sloupce */
  var W=380,H=200, max=Math.max(nH,nOH,1e-9), bx=[90,230], y0=160, hmax=110;
  var s='';
  s+=txt(20,26,"LÁTKOVÁ MNOŽSTVÍ [mmol]",{size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  s+=line(50,y0,350,y0,{c:"var(--line-strong)",w:1.5});
  [["H₃O⁺",nH,"var(--exo)"],["OH⁻",nOH,"var(--endo)"]].forEach(function(b,i){
    var h=b[1]/max*hmax, x=bx[i];
    s+=rect(x,y0-h,70,h,{fill:b[2],r:5});
    s+=txt(x+35,y0-h-8,fmt(b[1],2),{anchor:"middle",size:12.5,w:600,fill:b[2],mono:true});
    s+=txt(x+35,y0+20,b[0],{anchor:"middle",size:12.5,w:600,fill:"var(--ink)"});
  });
  var hmin=Math.min(nH,nOH)/max*hmax;
  s+=line(50,y0-hmin,350,y0-hmin,{c:"var(--ink-3)",w:1,dash:"3 3"});
  s+=txt(348,y0-hmin-5,"zneutralizováno",{anchor:"end",size:10.5,fill:"var(--ink-3)"});
  $("#mixWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Porovnání látkových množství H₃O⁺ a OH⁻"');
  $("#mixV1V").textContent=m.V1+" mL"; $("#mixV2V").textContent=m.V2+" mL";
  $("#mixC1V").textContent=fmt(m.c1,2)+" mol·dm⁻³"; $("#mixC2V").textContent=fmt(m.c2,2)+" mol·dm⁻³";
  ro("#mixRo1","n(H₃O⁺)",fmt(nH,2)+" mmol",(m.nH>1?"2·":"")+"c₁·V₁");
  ro("#mixRo2","n(OH⁻)",fmt(nOH,2)+" mmol",(m.nOH>1?"2·":"")+"c₂·V₂");
  ro("#mixRo3","Nadbytek",eqv?"žádný":fmt(ex,2)+" mmol "+(acid?"H₃O⁺":"OH⁻"),"v "+V+" mL → "+(eqv?"—":sci(cEx,2)+" mol·dm⁻³"));
  ro("#mixRo4","pH",pf(pH),eqv?"bod ekvivalence":(acid?"přebývá kyselina":"přebývá zásada"),eqv?"":(acid?"neg":"pos"));
  var st=[];
  st.push("n(H₃O⁺) = "+(m.nH>1?"2 · ":"")+fmt(m.c1,2)+" · "+m.V1+" = <b>"+fmt(nH,2)+" mmol</b>;&nbsp; n(OH⁻) = "+(m.nOH>1?"2 · ":"")+fmt(m.c2,2)+" · "+m.V2+" = <b>"+fmt(nOH,2)+" mmol</b>");
  st.push("Neutralizace H₃O⁺ + OH⁻ → 2 H₂O spotřebuje "+fmt(Math.min(nH,nOH),2)+" mmol z každého → nadbytek "+(eqv?"<b>0</b> (ekvivalence)":"<b>"+fmt(ex,2)+" mmol "+(acid?"H₃O⁺":"OH⁻")+"</b>"));
  if(!eqv){
    st.push("Zředění: V = "+m.V1+" + "+m.V2+" = "+V+" mL → ["+(acid?"H₃O⁺":"OH⁻")+"] = "+fmt(ex,2)+" / "+V+" = <b>"+sci(cEx,3)+" mol·dm⁻³</b>");
    st.push(acid?"pH = −log("+sci(cEx,3)+") = <b>"+pf(pH)+"</b>":"pOH = −log("+sci(cEx,3)+") = "+pf(-L10(cEx))+" → pH = 14 − pOH = <b>"+pf(pH)+"</b>");
  } else st.push("Přesně stejná množství → zůstane jen sůl silné kyseliny a silné zásady, která nehydrolyzuje → <b>pH = 7,00</b>");
  $("#mixSteps").innerHTML=eqs(st);
  $("#mixNote").innerHTML = eqv ? "Trefili jste bod ekvivalence. Zkuste přidat 1 mL zásady navíc — pH vyskočí o&nbsp;několik jednotek. Přesně to je skok na titrační křivce (kapitola 5)."
    : "Zkuste nastavit stejné objemy i&nbsp;koncentrace a&nbsp;přepnout kyselinu na H₂SO₄: dvojnásobek protonů okamžitě převáží. Vždy počítejte v&nbsp;mmol a&nbsp;dělte <b>celkovým</b> objemem.";
}
function initStrong(){
  rngBind("dilE",function(v){ dilE=v; drawDil(); });
  rngBind("mixV1",function(v){ mixState.V1=v; drawMix(); });
  rngBind("mixC1",function(v){ mixState.c1=v; drawMix(); });
  rngBind("mixV2",function(v){ mixState.V2=v; drawMix(); });
  rngBind("mixC2",function(v){ mixState.c2=v; drawMix(); });
  segBind("mixAcid",function(v){ mixState.nH=+v; drawMix(); });
  segBind("mixBase",function(v){ mixState.nOH=+v; drawMix(); });
  drawDil(); drawMix();
}
