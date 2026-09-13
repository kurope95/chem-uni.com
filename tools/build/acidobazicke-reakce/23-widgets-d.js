/* ============================================================
   T10 · WIDGET — amfoterní látky a amfolyty
   ============================================================ */
var amfI=0;
function drawAmf(){
  var a=AMF[amfI];
  $("#amfAcidEq").innerHTML='<span class="chem">'+a.acid+'</span>';
  $("#amfAcidC").innerHTML=a.acidc;
  $("#amfBaseEq").innerHTML='<span class="chem">'+a.base+'</span>';
  $("#amfBaseC").innerHTML=a.basec;
  $("#amfKind").className="readout";
  $("#amfKind").innerHTML='<span class="k">Zařazení</span><span class="v">'+a.kind+'</span><span class="h">'+a.f+' — '+a.n+'</span>';
  $("#amfNote").innerHTML=a.note;
}
function initAmf(){
  var sel=$("#amfSel");
  sel.innerHTML=AMF.map(function(a,i){ return '<option value="'+i+'">'+a.f+' — '+a.n+'</option>'; }).join("");
  sel.addEventListener("change",function(){ amfI=+sel.value; drawAmf(); });
  drawAmf();
}

/* ============================================================
   T11 · WIDGET — předpovídač směru acidobazické reakce
   ============================================================ */
var dirState={a:0,b:6};
function pkTxt(v){ return (v<=-1.5||v>=20?"≈ ":"")+fmt(v,(Math.abs(v%1)<0.005)?0:2); }
function drawDir(){
  var A=DIRA[dirState.a], B=DIRB[dirState.b];
  var lk=B.pKa-A.pKa, K=Math.pow(10,lk);
  var same=(A.conj===B.f && B.conj===A.f);
  /* rovnice */
  $("#dirEq").innerHTML='<span class="chem">'+A.f+'</span> + <span class="chem">'+B.f+'</span> &nbsp;'+
    (lk>3?"→":(lk<-3?"←":"⇌"))+'&nbsp; <span class="chem">'+A.conj+'</span> + <span class="chem">'+B.conj+'</span>';
  /* houpačka */
  var W=760,H=230,cx=380,cy=132,arm=250;
  var ang=Math.max(-17,Math.min(17,-lk*2.2));
  var rad=ang*Math.PI/180;
  var x1=cx-arm*Math.cos(rad), y1=cy-arm*Math.sin(rad);
  var x2=cx+arm*Math.cos(rad), y2=cy+arm*Math.sin(rad);
  var s='';
  s+=txt(20,20,"ROVNOVÁHA LEŽÍ NA STRANĚ SLABŠÍ KYSELINY",{size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  /* podstavec */
  s+='<path d="M'+cx+' '+(cy+6)+' l-26 46 l52 0 z" style="fill:var(--surface-3);stroke:var(--line-strong);stroke-width:1.2"/>';
  s+=line(cx-52,cy+52,cx+52,cy+52,{c:"var(--line-strong)",w:2,cap:"round"});
  /* rameno */
  s+=line(x1,y1,x2,y2,{c:"var(--ink-2)",w:4,cap:"round"});
  /* misky */
  function pan(x,y,label,sub,col){
    var t='';
    t+=line(x,y,x,y-26,{c:"var(--line-strong)",w:1.2});
    t+=rect(x-92,y-58,184,34,{fill:"var(--surface-2)",stroke:col,sw:2,r:9});
    t+=txt(x,y-36,label,{anchor:"middle",size:13.5,w:700,fill:"var(--ink)"});
    t+=txt(x,y-64,sub,{anchor:"middle",size:10,w:600,fill:col,style:"letter-spacing:.07em"});
    return t;
  }
  s+=pan(x1,y1,A.f+" + "+B.f,"VÝCHOZÍ LÁTKY","var(--exo)");
  s+=pan(x2,y2,A.conj+" + "+B.conj,"PRODUKTY","var(--endo)");
  /* pKa popisky */
  s+=txt(x1,y1+22,"p"+"Kₐ(kyseliny) = "+pkTxt(A.pKa),{anchor:"middle",size:11.5,w:600,fill:"var(--exo)",mono:true});
  s+=txt(x2,y2+22,"p"+"Kₐ(kyseliny) = "+pkTxt(B.pKa),{anchor:"middle",size:11.5,w:600,fill:"var(--endo)",mono:true});
  /* velká šipka směru */
  var dircol = lk>0?"var(--ok)":(lk<0?"var(--bad)":"var(--ink-3)");
  var dirtxt = Math.abs(lk)<0.3?"rovnováha uprostřed":(lk>0?"→ doprava":"← doleva");
  s+=txt(cx,H-14,dirtxt+" · K = "+sci(K,1),{anchor:"middle",size:14,w:700,fill:dircol,mono:true});
  $("#dirWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Houpačka znázorňující směr acidobazické reakce"');
  function ro(id,k,v,h,cls){ var e=$(id); e.className="readout "+(cls||""); e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#dirRo1","Δp<span class='q'>K</span><sub>a</sub>",sgn(lk,2),"p<span class='q'>K</span><sub>a</sub>(vpravo) − p<span class='q'>K</span><sub>a</sub>(vlevo)");
  ro("#dirRo2","<span class='q'>K</span> reakce",sci(K,2),"K = 10^Δp<span class='q'>K</span><sub>a</sub>",lk>0?"pos":(lk<0?"neg":""));
  var verdict = lk>3?"Probíhá prakticky úplně":(lk>0.3?"Probíhá, ustaví se rovnováha":(lk<-3?"Prakticky neprobíhá":(lk<-0.3?"Probíhá jen omezeně":"Rovnováha uprostřed")));
  ro("#dirRo3","Závěr",verdict,lk>0?"vlevo je silnější kyselina":(lk<0?"vpravo je silnější kyselina":"obě kyseliny stejně silné"),lk>0?"pos":(lk<0?"neg":""));
  /* poznámka */
  var nt;
  if(same){
    nt="Vybrali jste kyselinu a&nbsp;její vlastní konjugovanou bázi — to není reakce, jen konjugovaný pár. Zkuste vybrat bázi z&nbsp;jiného páru.";
  } else if(lk>3){
    nt="Vlevo je <b>silnější</b> kyselina ("+A.f+", p<span class='q'>K</span><sub>a</sub> "+pkTxt(A.pKa)+") než vpravo ("+B.conj+", "+pkTxt(B.pKa)+"). Proton přejde a&nbsp;reakce proběhne <b>prakticky úplně</b> (K = "+sci(K,1)+"). Rovnováha leží na straně slabší kyseliny a&nbsp;slabší báze.";
  } else if(lk<-3){
    nt="Vlevo je <b>slabší</b> kyselina než vpravo, takže by proton musel jít od slabší k&nbsp;silnější — to nejde. K = "+sci(K,1)+" ≪ 1, reakce <b>prakticky neprobíhá</b>. Samovolně jde reakce opačným směrem.";
  } else {
    nt="Rozdíl p<span class='q'>K</span><sub>a</sub> je malý ("+sgn(lk,2)+"), takže se ustaví <b>skutečná rovnováha</b> — v&nbsp;roztoku budou v&nbsp;měřitelném množství všechny čtyři částice. K = "+sci(K,1)+".";
  }
  nt+=" <b>Zkuste nastavit</b> HCl + CH₃COO⁻ a&nbsp;pak obráceně CH₃COOH + Cl⁻ — uvidíte, že silná kyselina slabou z&nbsp;její soli vytěsní, ale nikdy naopak.";
  $("#dirNote").innerHTML=nt;
  $("#dirA").value=dirState.a; $("#dirB").value=dirState.b;
}
function initDir(){
  var sa=$("#dirA"), sb=$("#dirB"), sp=$("#dirPreset");
  sa.innerHTML=DIRA.map(function(a,i){ return '<option value="'+i+'">'+a.f+' (pKa '+pkTxt(a.pKa)+') → '+a.conj+'</option>'; }).join("");
  sb.innerHTML=DIRB.map(function(b,i){ return '<option value="'+i+'">'+b.f+' → '+b.conj+' (pKa '+pkTxt(b.pKa)+')</option>'; }).join("");
  sp.innerHTML='<option value="-1">— vlastní volba —</option>'+DIRP.map(function(p,i){ return '<option value="'+i+'">'+p[0]+'</option>'; }).join("");
  sa.addEventListener("change",function(){ dirState.a=+sa.value; sp.value="-1"; drawDir(); });
  sb.addEventListener("change",function(){ dirState.b=+sb.value; sp.value="-1"; drawDir(); });
  sp.addEventListener("change",function(){
    var i=+sp.value; if(i<0) return;
    dirState.a=DIRP[i][1]; dirState.b=DIRP[i][2]; drawDir();
  });
  sp.value="0"; dirState.a=DIRP[0][1]; dirState.b=DIRP[0][2];
  drawDir();
}

/* ============================================================
   T12 · WIDGET — průzkumník hydrolýzy solí
   ============================================================ */
var hyI=0;
var TYPNAMES={1:"typ 1 — silná kyselina + silná zásada",2:"typ 2 — slabá kyselina + silná zásada",
              3:"typ 3 — silná kyselina + slabá zásada",4:"typ 4 — slabá kyselina + slabá zásada",
              5:"hydrogensůl — rozhoduje amfolytní anion"};
function phColor(pH){ return pH<6.5?"var(--exo)":(pH>7.5?"var(--endo)":"var(--ink-2)"); }
function drawHy(){
  var s0=SALTS[hyI];
  var col=phColor(s0.pH);
  function ro(id,k,v,h,c){ var e=$(id); e.className="readout"; e.innerHTML='<span class="k">'+k+'</span><span class="v"'+(c?' style="color:'+c+'"':'')+'>'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#hyRoCat","Kation "+s0.cat,s0.base,"mateřská zásada");
  ro("#hyRoAn","Anion "+s0.an,s0.acid,"mateřská kyselina");
  ro("#hyRoTyp","Typ soli",TYPNAMES[s0.typ].split("—")[0].trim(),TYPNAMES[s0.typ].split("—")[1]||"");
  var charakter = s0.pH<6.5?"kyselý":(s0.pH>7.5?"zásaditý":"neutrální");
  ro("#hyRoPH","pH (0,1 mol·dm⁻³)","≈ "+fmt(s0.pH,1),"roztok je "+charakter,col);
  /* indikátory */
  var lak=IND[2], fen=IND[5], mo=IND[0];
  ro("#hyRoInd","Indikátory","lakmus "+indLabel(lak,s0.pH),"fenolftalein "+indLabel(fen,s0.pH)+" · methyloranž "+indLabel(mo,s0.pH));
  $("#hyEq").innerHTML='<span class="chem">'+s0.eq+'</span>';
  /* proužek pH */
  var W=760,H=88,L=54,R=706,yBar=26,hBar=24;
  var x=function(p){ return L+(p/14)*(R-L); };
  var g='';
  for(var p=0;p<14;p+=0.5){ g+='<rect x="'+x(p).toFixed(1)+'" y="'+yBar+'" width="'+((R-L)/28+0.6).toFixed(1)+'" height="'+hBar+'" style="fill:'+univColor(p+0.25)+'"/>'; }
  g+=rect(L,yBar,R-L,hBar,{fill:"none",stroke:"var(--line-strong)",sw:1.2,r:4});
  for(var i=0;i<=14;i++){ g+=line(x(i),yBar+hBar,x(i),yBar+hBar+5,{c:"var(--line-strong)",w:1}); g+=txt(x(i),yBar+hBar+18,i,{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true}); }
  g+=line(x(7),yBar-6,x(7),yBar+hBar+6,{c:"var(--ink-3)",w:1,dash:"3 3"});
  var xp=x(s0.pH);
  g+='<path d="M'+xp+' '+(yBar-3)+' l-7 -11 l14 0 z" style="fill:'+col+'"/>';
  g+=line(xp,yBar-1,xp,yBar+hBar+1,{c:col,w:2.5});
  g+=txt(xp,yBar-18,s0.f+" · pH ≈ "+fmt(s0.pH,1),{anchor:"middle",size:11.5,w:700,fill:col});
  $("#hyWrap").innerHTML=svg("0 0 "+W+" "+H,g,'aria-label="Poloha pH roztoku soli na stupnici"');
  $("#hyNote").innerHTML=s0.note+" <b>Zkuste porovnat</b> NaHSO₄ s&nbsp;Na₂SO₄, nebo NaHCO₃ s&nbsp;Na₂CO₃ — táž kyselina, různé soli, pH se liší až o&nbsp;tři jednotky.";
}
function initHy(){
  var sel=$("#hySel");
  sel.innerHTML=SALTS.map(function(s0,i){ return '<option value="'+i+'">'+s0.f+' — '+s0.n+'</option>'; }).join("");
  sel.addEventListener("change",function(){ hyI=+sel.value; drawHy(); });
  drawHy();
}

/* ============================================================
   T13 · TRENAŽÉR — kyselý / neutrální / zásaditý
   ============================================================ */
var hdI=0, hdScore=0, hdAnswered=false;
function drawHd(){
  var it=HD[hdI];
  $("#hdQn").textContent=hdI+1; $("#hdQtot").textContent=HD.length; $("#hdScore").textContent=hdScore;
  $("#hdSalt").innerHTML='Vodný roztok soli <span class="chem" style="font-size:1.35rem">'+it.f+'</span> je…';
  var ex=$("#hdExplain"); ex.style.display="none"; ex.className="explain";
  $("#hdNext").disabled=true;
  $$("#k6 [data-hd]").forEach(function(b){ b.disabled=false; b.style.opacity=""; });
  hdAnswered=false;
}
function initHd(){
  $$("#k6 [data-hd]").forEach(function(b){
    b.addEventListener("click",function(){
      if(hdAnswered) return;
      hdAnswered=true;
      var it=HD[hdI], ok=b.dataset.hd===it.a;
      if(ok) hdScore++;
      $("#hdScore").textContent=hdScore;
      var names={kys:"kyselý (pH &lt; 7)",neu:"neutrální (pH ≈ 7)",zas:"zásaditý (pH &gt; 7)"};
      var ex=$("#hdExplain");
      ex.className="explain"; ex.style.display="flex";
      ex.style.background=ok?"var(--ok-soft)":"var(--bad-soft)";
      ex.style.borderColor=ok?"var(--ok)":"var(--bad)";
      ex.innerHTML='<span class="verdict" style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+(ok?"✓ Správně":"✕ Špatně — správně je "+names[it.a])+'</span><span class="eyebrow">Proč</span><div>'+it.e+'</div>';
      $$("#k6 [data-hd]").forEach(function(x){ x.disabled=true; x.style.opacity=x.dataset.hd===it.a?"1":".5"; });
      $("#hdNext").disabled = hdI>=HD.length-1;
      if(hdI>=HD.length-1){
        toast("Trenažér dokončen: "+hdScore+" z "+HD.length+" správně.");
        if(hdScore>=11) markDone("k6");
      }
    });
  });
  $("#hdNext").addEventListener("click",function(){ if(hdI<HD.length-1){ hdI++; drawHd(); } });
  $("#hdReset").addEventListener("click",function(){ hdI=0; hdScore=0; drawHd(); toast("Trenažér vynulován."); });
  drawHd();
}

/* ============================================================
   T14 · RYCHLOPRŮCHOD — tři mini-grafy
   ============================================================ */

/* (A) Vennův diagram tří teorií */
function drawMiniVenn(){
  var W=720,H=250;
  var s='';
  var cy=132;
  s+=txt(20,20,"TŘI TEORIE JAKO SOUSTŘEDNÉ KRUHY — LEWIS ⊃ BRØNSTED ⊃ ARRHENIUS",{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  /* kruhy vlevo */
  var cx=180;
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="104" style="fill:var(--cat3);fill-opacity:.10;stroke:var(--cat3);stroke-width:1.6"/>';
  s+='<circle cx="'+cx+'" cy="'+(cy+20)+'" r="72" style="fill:var(--cat2);fill-opacity:.12;stroke:var(--cat2);stroke-width:1.6"/>';
  s+='<circle cx="'+cx+'" cy="'+(cy+42)+'" r="40" style="fill:var(--cat1);fill-opacity:.16;stroke:var(--cat1);stroke-width:1.6"/>';
  s+=txt(cx,cy-84,"LEWIS",{anchor:"middle",size:11.5,w:700,fill:"var(--cat3)",style:"letter-spacing:.1em"});
  s+=txt(cx,cy-32,"BRØNSTED",{anchor:"middle",size:11,w:700,fill:"var(--cat2)",style:"letter-spacing:.08em"});
  s+=txt(cx,cy+18,"ARRHENIUS",{anchor:"middle",size:10,w:700,fill:"var(--cat1)",style:"letter-spacing:.06em"});
  s+=txt(cx,cy+34,"HCl, NaOH",{anchor:"middle",size:9.5,fill:"var(--ink-3)"});
  s+=txt(cx,cy-16,"NH₃, CO₃²⁻, NH₄⁺",{anchor:"middle",size:9.5,fill:"var(--ink-3)"});
  s+=txt(cx,cy-68,"BF₃, AlCl₃, Cu²⁺, CO₂",{anchor:"middle",size:9.5,fill:"var(--ink-3)"});
  /* tabulka vpravo */
  var tx=340, ty=52, rh=42;
  var rows=[
    ["Arrhenius 1887","kyselina → H⁺ · zásada → OH⁻ (jen ve vodě)","var(--cat1)"],
    ["Brønsted–Lowry 1923","donor protonu · akceptor protonu","var(--cat2)"],
    ["Lewis 1923","akceptor e⁻ páru · donor e⁻ páru","var(--cat3)"]
  ];
  rows.forEach(function(r,i){
    var yy=ty+rh*i;
    s+=rect(tx,yy,352,34,{fill:"var(--surface-2)",stroke:r[2],sw:1.4,r:8});
    s+=txt(tx+12,yy+15,r[0],{size:11.5,w:700,fill:r[2]});
    s+=txt(tx+12,yy+28,r[1],{size:10,fill:"var(--ink-2)"});
  });
  s+=txt(tx,ty+rh*3+14,"Každá další teorie obsahuje tu předchozí a přidává,",{size:10.5,fill:"var(--ink-3)"});
  s+=txt(tx,ty+rh*3+28,"co ta předchozí nevysvětlila (NH₃ · BF₃).",{size:10.5,fill:"var(--ink-3)"});
  $("#miniVennWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Vennův diagram tří teorií kyselin a zásad"');
}

/* (B) Žebřík pKa vybraných kyselin */
var LADDER=[
 {f:"HCl",v:-7,ap:true,n:"silná"},{f:"H₃O⁺",v:0,n:"nejsilnější ve vodě"},
 {f:"HSO₄⁻",v:1.99,n:"středně silná"},{f:"H₃PO₄",v:2.15,n:""},{f:"HF",v:3.17,n:""},
 {f:"HCOOH",v:3.75,n:""},{f:"CH₃COOH",v:4.76,n:"referenční slabá"},{f:"H₂CO₃",v:6.35,n:""},
 {f:"H₂S",v:7.05,n:""},{f:"HClO",v:7.54,n:""},{f:"HCN",v:9.21,n:""},{f:"NH₄⁺",v:9.25,n:""},
 {f:"fenol",v:9.99,n:""},{f:"HCO₃⁻",v:10.33,n:""},{f:"H₂O",v:14,n:"nejslabší ve vodě"},{f:"ethanol",v:16,ap:true,n:""}
];
function drawMiniLadder(){
  var W=720,H=330,L=110,R=560,T0=44,B=282;
  var lo=-8, hi=17;
  var y=function(v){ return T0+((v-lo)/(hi-lo))*(B-T0); };
  var s='';
  s+=txt(20,20,"ŽEBŘÍK p𝐾ₐ — NAHOŘE SILNÉ KYSELINY, DOLE SLABÉ",{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  s+=txt(20,34,"konjugovaná báze naopak sílí směrem dolů",{size:10,fill:"var(--ink-3)"});
  /* osa */
  s+=line(L,T0-8,L,B+8,{c:"var(--line-strong)",w:1.5});
  for(var v=-5;v<=15;v+=5){
    s+=line(L-5,y(v),R,y(v),{c:"var(--line)",w:1,dash:"2 4"});
    s+=txt(L-10,y(v)+4,v,{anchor:"end",size:11,fill:"var(--ink-3)",mono:true});
  }
  s+=txt(L-10,y(lo)+18,"p"+"Kₐ",{anchor:"end",size:10.5,w:600,fill:"var(--ink-3)",mono:true});
  /* pásma */
  s+=rect(L,y(lo),R-L,y(0)-y(lo),{fill:"var(--exo)",style:"fill-opacity:.07"});
  s+=rect(L,y(14),R-L,y(hi)-y(14),{fill:"var(--endo)",style:"fill-opacity:.07"});
  s+=txt(R-4,y(-4),"silné kyseliny — ve vodě úplně disociují",{anchor:"end",size:9.5,w:600,fill:"var(--exo)"});
  s+=txt(R-4,y(15.4),"slabší než voda — ve vodě už nejsou kyselinami",{anchor:"end",size:9.5,w:600,fill:"var(--endo)"});
  /* položky */
  LADDER.forEach(function(it){
    var yy=y(it.v);
    var col = it.v<0?"var(--exo)":(it.v>=14?"var(--endo)":"var(--ink-2)");
    s+='<circle cx="'+L+'" cy="'+yy+'" r="4" style="fill:'+col+'"/>';
    s+=txt(L+10,yy+4,it.f,{size:12,w:600,fill:"var(--ink)"});
    s+=txt(L+94,yy+4,(it.ap?"≈ ":"")+fmt(it.v,it.v%1===0?0:2),{size:11.5,w:600,fill:col,mono:true});
    if(it.n) s+=txt(L+150,yy+4,it.n,{size:10,fill:"var(--ink-3)"});
  });
  /* šipky vpravo */
  s+=vArrow(628,y(-6),y(15),"var(--accent)","","right");
  s+=txt(640,y(-6)+14,"kyselina",{size:11,w:700,fill:"var(--accent)"});
  s+=txt(640,y(-6)+27,"slábne ↓",{size:10,fill:"var(--ink-3)"});
  s+=txt(640,y(15)-16,"konjugovaná",{size:11,w:700,fill:"var(--accent)"});
  s+=txt(640,y(15)-3,"báze sílí ↓",{size:10,fill:"var(--ink-3)"});
  $("#miniLadderWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Žebřík hodnot pKa vybraných kyselin"');
}

/* (C) Čtyři typy solí a jejich pH */
function drawMiniHydro(){
  var W=720,H=300;
  var s='';
  s+=txt(20,20,"ČTYŘI TYPY SOLÍ — SILNĚJŠÍ RODIČ VYHRÁVÁ",{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  var cells=[
    {x:96,y:46,c:"var(--ink-3)",t:"silná kyselina + silná zásada",p:"pH ≈ 7 · neutrální",ex:"NaCl, KNO₃, Na₂SO₄",n:"nikdo nehydrolyzuje"},
    {x:392,y:46,c:"var(--endo)",t:"slabá kyselina + silná zásada",p:"pH > 7 · zásaditý",ex:"CH₃COONa, Na₂CO₃, NaCN",n:"A⁻ + H₂O ⇌ HA + OH⁻"},
    {x:96,y:158,c:"var(--exo)",t:"silná kyselina + slabá zásada",p:"pH < 7 · kyselý",ex:"NH₄Cl, AlCl₃, CuSO₄",n:"BH⁺ + H₂O ⇌ B + H₃O⁺"},
    {x:392,y:158,c:"var(--cat3)",t:"slabá kyselina + slabá zásada",p:"podle Ka vs Kb",ex:"CH₃COONH₄ ≈ 7 · NH₄CN > 7",n:"hydrolyzují oba ionty"}
  ];
  cells.forEach(function(c){
    s+='<rect x="'+c.x+'" y="'+c.y+'" width="232" height="94" rx="10" style="fill:'+c.c+';fill-opacity:.09;stroke:'+c.c+';stroke-width:1.5"/>';
    s+=txt(c.x+14,c.y+22,c.t,{size:11,w:700,fill:c.c});
    s+=txt(c.x+14,c.y+42,c.p,{size:12,w:700,fill:"var(--ink)"});
    s+=txt(c.x+14,c.y+60,c.ex,{size:10,fill:"var(--ink-2)",mono:true});
    s+=txt(c.x+14,c.y+78,c.n,{size:10,fill:"var(--ink-3)",mono:true});
  });
  /* pruh pH dole */
  var L=96,R=624,yBar=272,hBar=16;
  var x=function(p){ return L+(p/14)*(R-L); };
  for(var p=0;p<14;p+=0.5){ s+='<rect x="'+x(p).toFixed(1)+'" y="'+yBar+'" width="'+((R-L)/28+0.6).toFixed(1)+'" height="'+hBar+'" style="fill:'+univColor(p+0.25)+'"/>'; }
  s+=rect(L,yBar,R-L,hBar,{fill:"none",stroke:"var(--line-strong)",sw:1,r:3});
  [["NH₄Cl",5.1],["NaCl",7],["CH₃COONa",8.9],["Na₂CO₃",11.6]].forEach(function(m){
    s+=line(x(m[1]),yBar-8,x(m[1]),yBar,{c:"var(--ink)",w:1.5});
    s+=txt(x(m[1]),yBar-12,m[0],{anchor:"middle",size:9.5,w:600,fill:"var(--ink-2)"});
  });
  for(var i=0;i<=14;i+=2){ s+=txt(x(i),yBar+hBar+12,i,{anchor:"middle",size:9.5,fill:"var(--ink-3)",mono:true}); }
  $("#miniHydroWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Čtyři typy solí a pH jejich roztoků"');
}
