/* ============================================================
   14 · K6 — KONTAKTNÍ PROCES
   ============================================================ */
function cpK(T){ var dG=CPdH - T*CPdS; return Math.exp(-dG/(RGAS*T)); }
/* rovnovážná konverze SO₂ pro nástřik 10 % SO₂ a 11 % O₂ */
function cpConv(TC,P){
  var T=TC+273.15, K=cpK(T), a=0.10, b=0.11;
  var lo=0, hi=Math.min(a/2,b)*0.9999999;
  for(var i=0;i<160;i++){
    var xi=(lo+hi)/2;
    var num=Math.pow(2*xi,2)*(1-xi);
    var den=Math.pow(a-2*xi,2)*(b-xi)*P;
    if(den<=0){ hi=xi; continue; }
    if(num/den<K) lo=xi; else hi=xi;
  }
  return 2*((lo+hi)/2)/a;
}
/* relativní rychlost — Arrhenius, Ea ≈ 90 kJ·mol⁻¹, normováno na 425 °C */
function cpRate(TC){
  var Ea=90000, T=TC+273.15, T0=698.15;
  return Math.exp(-Ea/RGAS*(1/T-1/T0));
}
var cpState={t:425, p:1};
function drawCp(){
  var W=790, H=300, s="";
  var X0=64, X1=470, Y0=48, Y1=232;
  function fx(T){ return X0+(T-300)/(700-300)*(X1-X0); }
  function fy(pct){ return Y1-pct/100*(Y1-Y0); }
  /* praktické okno */
  s+=rect(fx(400),Y0,fx(450)-fx(400),Y1-Y0,{fill:"var(--ok-soft)",style:"fill-opacity:.55"});
  s+=txt((fx(400)+fx(450))/2,Y0+32,"provozní",{anchor:"middle",size:10,w:700,fill:"var(--ok)"});
  s+=txt((fx(400)+fx(450))/2,Y0+50,"okno",{anchor:"middle",size:10,w:700,fill:"var(--ok)"});
  for(var p=0;p<=100;p+=25){
    s+=line(X0,fy(p),X1,fy(p),{c:"var(--grid)",w:1});
    s+=txt(X0-7,fy(p)+4,String(p),{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true});
  }
  [300,400,500,600,700].forEach(function(T){
    s+=line(fx(T),Y0,fx(T),Y1,{c:"var(--grid)",w:1});
    s+=txt(fx(T),Y1+20,String(T),{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true});
  });
  s+=line(X0,Y1,X1,Y1,{c:"var(--line-strong)",w:1.6});
  s+=line(X0,Y0,X0,Y1,{c:"var(--line-strong)",w:1.6});
  s+=txt((X0+X1)/2,Y1+38,"teplota v reaktoru [°C]",{anchor:"middle",size:11,fill:"var(--ink-3)"});
  s+=txt(X0,32,"ROVNOVÁŽNÁ KONVERZE A RELATIVNÍ RYCHLOST  [%]",{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
  /* křivka konverze */
  var cpts=[], rpts=[];
  for(var T=300;T<=700;T+=8){
    cpts.push([T, cpConv(T,cpState.p)*100]);
    rpts.push([T, Math.min(100, cpRate(T)*100/Math.max(1,cpRate(700)/1))]);
  }
  /* rychlost normalizuji tak, aby 700 °C = 100 % */
  var rmax=cpRate(700);
  rpts=[];
  for(var T2=300;T2<=700;T2+=8) rpts.push([T2, cpRate(T2)/rmax*100]);
  s+=polyLine(rpts,fx,fy,"var(--exo)",2.2,"6 4");
  s+=polyLine(cpts,fx,fy,"var(--endo)",2.8);
  /* marker */
  var tc=cpState.t, conv=cpConv(tc,cpState.p)*100, rate=cpRate(tc)/rmax*100;
  s+=line(fx(tc),Y0,fx(tc),Y1,{c:"var(--accent)",w:1.6,dash:"5 4"});
  s+='<circle cx="'+fx(tc).toFixed(1)+'" cy="'+fy(conv).toFixed(1)+'" r="6" style="fill:var(--endo);stroke:var(--paper);stroke-width:2"/>';
  s+='<circle cx="'+fx(tc).toFixed(1)+'" cy="'+fy(rate).toFixed(1)+'" r="5" style="fill:var(--exo);stroke:var(--paper);stroke-width:2"/>';
  s+=txt(X1-4,fy(96),"konverze",{anchor:"end",size:11,w:700,fill:"var(--endo)"});
  s+=txt(X1-4,fy(28),"rychlost",{anchor:"end",size:11,w:700,fill:"var(--exo)"});
  /* schéma procesu vpravo */
  var PX=506, bw=246;
  s+=rect(PX,40,bw,232,{fill:"var(--surface-2)",r:12,stroke:"var(--line)",sw:1.2});
  s+=txt(PX+bw/2,66,"KONTAKTNÍ PROCES",{anchor:"middle",size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.12em"});
  var steps=[
    ["S + O₂ → SO₂","spalovací pec","var(--cat1)"],
    ["2 SO₂ + O₂ ⇌ 2 SO₃","V₂O₅, "+fixed(tc,0)+" °C","var(--accent)"],
    ["SO₃ + H₂SO₄ → H₂S₂O₇","absorpce na oleum","var(--cat3)"],
    ["H₂S₂O₇ + H₂O → 2 H₂SO₄","řízené ředění","var(--cat4)"]
  ];
  steps.forEach(function(st,i){
    var y=88+i*46;
    s+=rect(PX+14,y,bw-28,34,{fill:"var(--paper)",r:8,stroke:st[2],sw:1.4});
    s+=txt(PX+bw/2,y+15,st[0],{anchor:"middle",size:11.5,w:700,fill:st[2]});
    s+=txt(PX+bw/2,y+28,st[1],{anchor:"middle",size:9.5,fill:"var(--ink-3)"});
    if(i<3){
      s+=line(PX+bw/2,y+34,PX+bw/2,y+44,{c:"var(--ink-3)",w:1.6});
      s+='<path d="M'+(PX+bw/2)+' '+(y+46)+' l-4 -6 l8 0 z" style="fill:var(--ink-3)"/>';
    }
  });
  return svg("0 0 "+W+" "+H,s,'aria-label="Kontaktní proces — konverze, rychlost a schéma"');
}
function refreshCp(){
  var tc=cpState.t, conv=cpConv(tc,cpState.p)*100;
  var rate=cpRate(tc)/cpRate(700)*100;
  $("#cpWrap").innerHTML=drawCp();
  $("#cpTv").textContent=fixed(tc,0)+" °C";
  $("#cpPv").textContent=fixed(cpState.p,0)+" bar";
  ro("#cpRo1","Rovnovážná konstanta","K = "+(cpK(tc+273.15)>=1000?fixed(cpK(tc+273.15)/1000,1)+"·10³":fixed(cpK(tc+273.15),1)),"pro 2 SO₂ + O₂ ⇌ 2 SO₃, v bar⁻¹","");
  ro("#cpRo2","Rovnovážná konverze SO₂",fixed(conv,1)+" %","nástřik 10 % SO₂, 11 % O₂", conv>95?"pos":"neg");
  ro("#cpRo3","Relativní rychlost",fixed(rate,1)+" %","vztaženo k 700 °C", rate<3?"neg":"");
  var t;
  if(tc<380){
    t="Rovnováha je skvělá — konverze <b>"+fixed(conv,1)+" %</b>. Jenže rychlost spadla na <b>"+fixed(rate,2)+" %</b> a&nbsp;běžný vanadičný katalyzátor při téhle teplotě <b>vůbec nepracuje</b> (aktivuje se kolem 400 °C, s&nbsp;cesiovým promotorem od 380 °C). Reaktor by musel být nesmyslně velký.";
  } else if(tc<=460){
    t="Tady pracují skutečné provozy. Konverze <b>"+fixed(conv,1)+" %</b> a&nbsp;katalyzátor je aktivní. Je to <b>kompromis</b>: pár desetin procenta konverze se obětuje za to, že reakce proběhne v&nbsp;rozumném čase. Zbylá procenta dožene dvojitá absorpce.";
  } else if(tc<=560){
    t="Reakce běží rychle, ale rovnováha se začíná hroutit — konverze <b>"+fixed(conv,1)+" %</b>. Každé procento nezreagovaného SO₂ znamená ztrátu suroviny <b>a&nbsp;emisi</b>, kterou je nutné zachytit.";
  } else {
    t="Rychlost je vysoká, ale konverze klesla na <b>"+fixed(conv,1)+" %</b>. Nad 600 °C se navíc katalyzátor začíná nevratně poškozovat. Tohle je názorná ukázka toho, proč u&nbsp;exotermických reakcí <b>zahřívání neznamená větší výtěžek</b>.";
  }
  if(cpState.p>1) t+=" Při tlaku "+fixed(cpState.p,0)+" bar je konverze o&nbsp;<b>"+fixed((conv-cpConv(tc,1)*100),2)+" procentního bodu</b> vyšší — vidíte, že zisk je malý, a&nbsp;proto se tlakové reaktory nevyplatí stavět.";
  say("#cpSay",t);
}
function initCp(){
  $("#cpT").addEventListener("input",function(){ cpState.t=+this.value; refreshCp(); });
  $("#cpP").addEventListener("input",function(){ cpState.p=+this.value; refreshCp(); });
  refreshCp();
}

/* ============================================================
   15 · K6 — EMISE SO₂ A ODSÍŘENÍ
   ============================================================ */
var emState={s:8, u:95};
function drawEm(){
  var W=790, H=260, s="";
  var X0=64, X1=430, Y0=46, Y1=196;
  var vmax=2000;
  function fx(y){ return X0+24+(y-1990)/(2020-1990)*(X1-X0-48); }
  function fy(v){ return Y1-v/vmax*(Y1-Y0); }
  s+=txt(X0,30,"EMISE SO₂ V ČESKU  [kilotuny za rok]",{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  [0,500,1000,1500,2000].forEach(function(v){
    s+=line(X0,fy(v),X1,fy(v),{c:"var(--grid)",w:1});
    s+=txt(X0-7,fy(v)+4,String(v),{anchor:"end",size:10,fill:"var(--ink-3)",mono:true});
  });
  s+=line(X0,Y1,X1,Y1,{c:"var(--line-strong)",w:1.6});
  s+=line(X0,Y0,X0,Y1,{c:"var(--line-strong)",w:1.6});
  var bw=(X1-X0)/EMIS.length*0.6;
  EMIS.forEach(function(e){
    var x=fx(e.y), yv=fy(e.v);
    var col = e.v>1000 ? "var(--bad)" : (e.v>300 ? "var(--warn)" : "var(--ok)");
    s+=rect(x-bw/2,yv,bw,Y1-yv,{fill:col,r:3});
    if(e.y===1990||e.y===2000||e.y===2020){
      s+=txt(x,yv-7,String(e.v),{anchor:"middle",size:10,w:700,fill:col,mono:true});
      s+=txt(x,Y1+16,String(e.y),{anchor:"middle",size:10,fill:"var(--ink-3)",mono:true});
    }
  });
  s+=txt(X1,Y1+34,"pokles na 5 % původní hodnoty",{anchor:"end",size:11,w:600,fill:"var(--ok)"});
  s+=txt(X0,Y1+34,"povinné odsíření zdrojů",{size:11,fill:"var(--ink-3)"});
  /* pravá část — kalkulačka */
  var PX=470, bw2=304;
  var wS=emState.s/10, ef=emState.u/100;
  var mS=1e6*wS/100;             /* t síry z 1 Mt uhlí */
  var mSO2=mS*64.058/32.06;      /* t SO₂ */
  var out=mSO2*(1-ef), cap=mSO2*ef;
  var gyp=cap/64.058*172.16;     /* t energosádrovce */
  s+=rect(PX,40,bw2,196,{fill:"var(--surface-2)",r:12,stroke:"var(--line)",sw:1.2});
  s+=txt(PX+bw2/2,66,"ELEKTRÁRNA NA 1 Mt UHLÍ ZA ROK",{anchor:"middle",size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  var bars=[
    ["vzniklo SO₂", mSO2, "var(--bad)"],
    ["zachyceno", cap, "var(--ok)"],
    ["uniklo komínem", out, "var(--warn)"]
  ];
  var mx=Math.max(mSO2,1);
  bars.forEach(function(b,i){
    var y=92+i*38;
    s+=txt(PX+16,y+6,b[0],{size:11,fill:"var(--ink-2)"});
    s+=txt(PX+bw2-16,y+6,fixed(b[1]/1000,1)+" kt",{anchor:"end",size:12,w:700,fill:b[2],mono:true});
    s+=rect(PX+16,y+12,bw2-32,9,{fill:"var(--surface-3)",r:99});
    s+=rect(PX+16,y+12,(bw2-32)*(b[1]/mx),9,{fill:b[2],r:99});
  });
  s+=txt(PX+16,216,"vznikne energosádrovce: "+fixed(gyp/1000,0)+" kt ročně",{size:11.5,w:600,fill:"var(--ink)"});
  return svg("0 0 "+W+" "+H,s,'aria-label="Emise SO₂ a účinek odsíření"');
}
function refreshEm(){
  var wS=emState.s/10, ef=emState.u/100;
  var mSO2=1e6*wS/100*64.058/32.06;
  $("#emWrap").innerHTML=drawEm();
  $("#emSv").textContent=fixed(wS,1)+" %";
  $("#emUv").textContent=fixed(emState.u,0)+" %";
  ro("#emRo1","Vzniklý SO₂",fixed(mSO2/1000,1)+" kt","z 1 Mt uhlí s "+fixed(wS,1)+" % síry","neg");
  ro("#emRo2","Uniklo do ovzduší",fixed(mSO2*(1-ef)/1000,1)+" kt","při účinnosti odsíření "+fixed(emState.u,0)+" %", ef>0.9?"pos":"neg");
  ro("#emRo3","Energosádrovec",fixed(mSO2*ef/64.058*172.16/1000,0)+" kt","surovina pro sádrokarton","");
  var t;
  if(emState.u<20) t="Takhle to vypadalo do začátku 90. let. Necelý milion tun SO₂ ročně z&nbsp;československé energetiky znamenal kyselé deště a&nbsp;odumřelé lesy v&nbsp;Krušných horách. <b>Věta z&nbsp;učebnic té doby o&nbsp;„obtížně řešitelném problému“ byla v&nbsp;tu chvíli pravdivá.</b>";
  else if(emState.u<80) t="Částečné odsíření pomůže, ale nestačí. Právě proto legislativa neurčuje účinnost, ale <b>emisní limit</b> — a&nbsp;ten se dá u&nbsp;uhelných bloků splnit jen s&nbsp;účinností nad 90 %.";
  else t="Tohle je dnešní stav. Mokrá vápencová vypírka zachytí přes 95 % oxidu siřičitého a&nbsp;produktem není odpad, ale <b>použitelná surovina</b> — energosádrovec na sádrokarton. Emise SO₂ v&nbsp;Česku klesly z&nbsp;asi 1&nbsp;880 kt v&nbsp;roce 1990 na zhruba 95 kt v&nbsp;roce 2020.";
  say("#emSay",t);
}
function initEm(){
  $("#emS").addEventListener("input",function(){ emState.s=+this.value; refreshEm(); });
  $("#emU").addEventListener("input",function(){ emState.u=+this.value; refreshEm(); });
  refreshEm();
}

/* ============================================================
   16 · K7 — PRŮZKUMNÍK OXOKYSELIN SÍRY
   ============================================================ */
var oaState={id:"h2so4", fam:"all"};
function oaItem(){ for(var i=0;i<OXAC.length;i++) if(OXAC[i].id===oaState.id) return OXAC[i]; return OXAC[1]; }
function drawOa(){
  var it=oaItem(), W=780, H=260, s="";
  var cx=W/2-40, cy=126;
  var Sc="var(--warn)", Oc="var(--endo-soft)", Pc="var(--cat4)";
  function Sa(x,y,lbl){ return atom(x,y,23,lbl||"S",Sc,"var(--accent-ink)",16); }
  function Oa(x,y,lbl,c){ return atom(x,y,17,lbl,c||Oc,"var(--ink)",11.5); }
  function dbl(x1,y1,x2,y2){
    var dx=x2-x1, dy=y2-y1, L=Math.sqrt(dx*dx+dy*dy), ox=-dy/L*3.2, oy=dx/L*3.2;
    return line(x1+ox,y1+oy,x2+ox,y2+oy,{c:"var(--ink-2)",w:2}) + line(x1-ox,y1-oy,x2-ox,y2-oy,{c:"var(--ink-2)",w:2});
  }
  function sgl(x1,y1,x2,y2,c,w){ return line(x1,y1,x2,y2,{c:c||"var(--ink-2)",w:w||2.2}); }
  s+=txt(18,30,("STRUKTURA · "+FAMLBL[it.fam]).toUpperCase(),{size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  if(it.id==="h2so3"){
    s+=dbl(cx,cy,cx,cy-58); s+=sgl(cx,cy,cx-76,cy+42); s+=sgl(cx,cy,cx+76,cy+42);
    s+=Sa(cx,cy); s+=Oa(cx,cy-58,"O"); s+=Oa(cx-76,cy+42,"OH"); s+=Oa(cx+76,cy+42,"OH");
    s+=lonePair(cx,cy,90,"var(--bad)",34);
    s+=txt(cx,cy+62,"volný pár",{anchor:"middle",size:11,w:700,fill:"var(--bad)"});
    s+=txt(cx,cy+96,"pyramidální — a právě volný pár dělá ze siřičitanů redukovadla",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  } else if(it.id==="h2so4"){
    s+=dbl(cx,cy,cx-52,cy-52); s+=dbl(cx,cy,cx+52,cy-52);
    s+=sgl(cx,cy,cx-66,cy+48); s+=sgl(cx,cy,cx+66,cy+48);
    s+=Sa(cx,cy); s+=Oa(cx-52,cy-52,"O"); s+=Oa(cx+52,cy-52,"O"); s+=Oa(cx-66,cy+48,"OH"); s+=Oa(cx+66,cy+48,"OH");
    s+=txt(cx,cy+96,"tetraedr bez volného páru — síra je v nejvyšším stavu +VI",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  } else if(it.id==="h2s2o7"||it.id==="h2s2o8"){
    var per=it.id==="h2s2o8";
    var s1=cx-110, s2=cx+110;
    if(per){
      s+=sgl(s1,cy,cx-26,cy,Pc,3); s+=sgl(cx-26,cy,cx+26,cy,Pc,3.4); s+=sgl(cx+26,cy,s2,cy,Pc,3);
      s+=Oa(cx-26,cy,"O",Pc); s+=Oa(cx+26,cy,"O",Pc);
      s+=txt(cx,cy-38,"peroxidový můstek −O−O−",{anchor:"middle",size:11.5,w:700,fill:Pc});
    } else {
      s+=sgl(s1,cy,cx,cy,"var(--accent)",3); s+=sgl(cx,cy,s2,cy,"var(--accent)",3);
      s+=Oa(cx,cy,"O","var(--accent-soft)");
      s+=txt(cx,cy-34,"kyslíkový můstek −O−",{anchor:"middle",size:11.5,w:700,fill:"var(--accent)"});
    }
    [s1,s2].forEach(function(sx,i){
      s+=dbl(sx,cy,sx,cy-56); s+=dbl(sx,cy,sx,cy+56);
      s+=sgl(sx,cy,sx+(i?76:-76),cy);
      s+=Sa(sx,cy); s+=Oa(sx,cy-56,"O"); s+=Oa(sx,cy+56,"O"); s+=Oa(sx+(i?76:-76),cy,"OH");
    });
    s+=txt(cx,cy+104,per?"dva tetraedry spojené peroxidem — odtud E° = +2,01 V":"dva tetraedry spojené kyslíkem — to je oleum",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  } else if(it.id==="h2so5"){
    s+=dbl(cx,cy,cx-52,cy-52); s+=sgl(cx,cy,cx-66,cy+48); s+=dbl(cx,cy,cx,cy+62);
    s+=sgl(cx,cy,cx+56,cy-42,Pc,3); s+=sgl(cx+56,cy-42,cx+112,cy-64,Pc,3.4);
    s+=Sa(cx,cy); s+=Oa(cx-52,cy-52,"O"); s+=Oa(cx-66,cy+48,"OH"); s+=Oa(cx,cy+62,"O");
    s+=Oa(cx+56,cy-42,"O",Pc); s+=Oa(cx+112,cy-64,"OH",Pc);
    s+=txt(cx+90,cy-90,"peroxo −O−O−",{anchor:"middle",size:11.5,w:700,fill:Pc});
    s+=txt(cx,cy+104,"kyselina sírová, které jeden kyslík nahradila peroxo skupina",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  } else if(it.id==="h2s2o3"){
    s+=dbl(cx,cy,cx,cy-60); s+=dbl(cx,cy,cx,cy+62);
    s+=sgl(cx,cy,cx-76,cy+4); s+=sgl(cx,cy,cx+76,cy+4);
    s+=Sa(cx,cy); s+=Sa(cx,cy-60,"S"); s+=Oa(cx,cy+62,"O"); s+=Oa(cx-76,cy+4,"OH"); s+=Oa(cx+76,cy+4,"OH");
    s+=txt(cx+34,cy-62,"thio‑skupina, S má −II",{size:11.5,w:700,fill:"var(--cat3)"});
    s+=txt(cx,cy+104,"síran s jedním kyslíkem nahrazeným sírou; středová síra si drží +VI",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  } else if(it.id==="h2s2o5"||it.id==="h2s2o4"){
    var four=it.id==="h2s2o4";
    var a1=cx-72, a2=cx+72;
    s+=sgl(a1,cy,a2,cy,"var(--cat3)",3.4);
    s+=txt(cx,cy-16,"vazba S–S",{anchor:"middle",size:11.5,w:700,fill:"var(--cat3)"});
    s+=dbl(a1,cy,a1,cy-56); s+=sgl(a1,cy,a1-72,cy+34);
    s+=Oa(a1,cy-56,"O"); s+=Oa(a1-72,cy+34,"OH");
    if(!four){ s+=dbl(a1,cy,a1,cy+56); s+=Oa(a1,cy+56,"O"); } else { s+=lonePair(a1,cy,90,"var(--bad)",32); }
    s+=dbl(a2,cy,a2,cy-56); s+=sgl(a2,cy,a2+72,cy+34);
    s+=Oa(a2,cy-56,"O"); s+=Oa(a2+72,cy+34,"OH");
    s+=lonePair(a2,cy,90,"var(--bad)",32);
    s+=Sa(a1,cy); s+=Sa(a2,cy);
    s+=txt(cx,cy+104,four?"obě síry mají volný pár — proto tak silné redukční účinky":"nesymetrická: jedna síra nese tři kyslíky, druhá dva",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  } else {
    var e1=cx-150, e2=cx+150, m1=cx-50, m2=cx+50;
    s+=sgl(e1,cy,m1,cy,"var(--cat3)",3.2); s+=sgl(m1,cy,m2,cy,"var(--cat3)",3.2); s+=sgl(m2,cy,e2,cy,"var(--cat3)",3.2);
    [e1,e2].forEach(function(sx,i){
      s+=dbl(sx,cy,sx,cy-54); s+=dbl(sx,cy,sx,cy+54); s+=sgl(sx,cy,sx+(i?70:-70),cy);
      s+=Oa(sx,cy-54,"O"); s+=Oa(sx,cy+54,"O"); s+=Oa(sx+(i?70:-70),cy,"OH");
    });
    s+=Sa(e1,cy); s+=Sa(e2,cy); s+=Sa(m1,cy); s+=Sa(m2,cy);
    s+=txt(cx,cy-32,"řetězec 0 až 4 dalších atomů síry",{anchor:"middle",size:11.5,w:700,fill:"var(--cat3)"});
    s+=txt(cx,cy+100,"nejznámější je tetrathionan S₄O₆²⁻ — produkt jodometrické titrace",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  }
  /* barevný pásek rodiny */
  s+=rect(0,H-10,W,10,{fill:FAMCOL[it.fam]});
  return svg("0 0 "+W+" "+H,s,'aria-label="Struktura kyslíkaté kyseliny síry"');
}
function oaFill(){
  var list=OXAC.filter(function(a){ return oaState.fam==="all" || a.fam===oaState.fam; });
  if(!list.length) list=OXAC;
  var found=false;
  list.forEach(function(a){ if(a.id===oaState.id) found=true; });
  if(!found) oaState.id=list[0].id;
  $("#oaSel").innerHTML=list.map(function(a){ return '<option value="'+a.id+'">'+a.f+' — '+a.n+'</option>'; }).join("");
  $("#oaSel").value=oaState.id;
}
function refreshOa(){
  var it=oaItem();
  $("#oaWrap").innerHTML=drawOa();
  ro("#oaRo1","Oxidační čísla síry",it.ox,it.f,"");
  ro("#oaRo2","Rodina",FAMLBL[it.fam],"třídění podle strukturního motivu","");
  ro("#oaRo3","Stálost",it.st.indexOf("stálá")===0?"stálá":"omezená",it.st, it.st.indexOf("stálá")===0?"pos":"neg");
  say("#oaSay","<b>"+it.n+" ("+it.f+")</b> · soli: "+it.salt+". "+it.say);
  segSet("#oaFam",oaState.fam);
}
function initOa(){
  oaFill();
  $("#oaSel").addEventListener("change",function(){ oaState.id=this.value; refreshOa(); });
  $$("#oaFam button").forEach(function(b){
    b.addEventListener("click",function(){ oaState.fam=b.dataset.v; oaFill(); refreshOa(); });
  });
  refreshOa();
}

/* ============================================================
   17 · K7 — TRENAŽÉR: ZŘEDĚNÁ NEBO KONCENTROVANÁ
   ============================================================ */
var saI=0, saScore=0, saAns=false;
function drawSad(){
  var it=SAD[saI];
  $("#saQn").textContent=saI+1; $("#saQtot").textContent=SAD.length; $("#saScore").textContent=saScore;
  $("#saTask").innerHTML=it.q;
  $("#saOpts").innerHTML=it.o.map(function(o,i){ return '<button class="btn" type="button" data-oi="'+i+'" style="white-space:normal;line-height:1.35;text-align:left;justify-content:flex-start">'+o+'</button>'; }).join("");
  var ex=$("#saExplain"); ex.style.display="none"; ex.className="explain";
  $("#saNext").disabled=true; saAns=false;
  $$("#saOpts button").forEach(function(b){
    b.addEventListener("click",function(){
      if(saAns) return; saAns=true;
      var ok=+b.dataset.oi===it.c; if(ok) saScore++;
      $("#saScore").textContent=saScore;
      ex.style.display="flex"; ex.style.background=ok?"var(--ok-soft)":"var(--bad-soft)"; ex.style.borderColor=ok?"var(--ok)":"var(--bad)";
      ex.innerHTML='<span class="verdict" style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+(ok?"✓ Správně":"✕ Špatně — správně: "+it.o[it.c])+'</span><span class="eyebrow">Proč</span><div>'+it.e+'</div>';
      $$("#saOpts button").forEach(function(x){ x.disabled=true; x.style.opacity=+x.dataset.oi===it.c?"1":".45"; if(+x.dataset.oi===it.c){ x.style.borderColor="var(--ok)"; x.style.color="var(--ok)"; } });
      $("#saNext").disabled = saI>=SAD.length-1;
      if(saI>=SAD.length-1){ toast("Trenažér dokončen: "+saScore+" z "+SAD.length+" správně."); if(saScore>=8) markDone("k7"); }
    });
  });
}
function initSad(){
  $("#saNext").addEventListener("click",function(){ if(saI<SAD.length-1){ saI++; drawSad(); } });
  $("#saReset").addEventListener("click",function(){ saI=0; saScore=0; drawSad(); });
  drawSad();
}

/* ============================================================
   18 · K8 — PRŮZKUMNÍK TĚŽKÝCH CHALKOGENŮ
   ============================================================ */
var stState={id:"se"};
function stItem(){ for(var i=0;i<STP.length;i++) if(STP[i].id===stState.id) return STP[i]; return STP[0]; }
function drawSt(){
  var it=stItem(), e=el16(it.s), W=780, H=250, s="";
  var col = it.id==="po" ? "var(--endo)" : "var(--cat3)";
  /* karta */
  s+=rect(14,22,238,206,{fill:"var(--surface-2)",r:14,stroke:col,sw:1.8});
  s+=txt(36,80,it.s,{size:44,w:800,fill:col});
  s+=txt(232,58,it.n,{anchor:"end",size:16,w:700,fill:"var(--ink)"});
  s+=txt(232,76,"Z = "+e.Z,{anchor:"end",size:12,fill:"var(--ink-3)",mono:true});
  s+=line(34,100,232,100,{c:"var(--grid)",w:1});
  [["konfigurace",e.cfg],["elektronegativita",fixed(e.EN,2)],["teplota tání",fixed(e.tt,1)+" °C"],["teplota varu",fixed(e.tv,1)+" °C"],["ox. čísla",e.ox]].forEach(function(r,i){
    s+=txt(34,124+i*22,r[0],{size:10,fill:"var(--ink-3)",style:"letter-spacing:.05em"});
    s+=txt(232,124+i*22,r[1],{anchor:"end",size:11,w:600,fill:"var(--ink)"});
  });
  /* struktura */
  var bx=288, by=44;
  s+=rect(bx,by,236,184,{fill:"var(--surface-2)",r:12,stroke:"var(--line)",sw:1.2});
  s+=txt(bx+118,by+24,"STRUKTURA PRVKU",{anchor:"middle",size:10,w:700,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  if(it.id==="po"){
    for(var a=0;a<3;a++) for(var b=0;b<3;b++){
      var px=bx+66+a*52, py=by+62+b*44;
      s+='<circle cx="'+px+'" cy="'+py+'" r="13" style="fill:'+col+';stroke:var(--line-strong);stroke-width:1.2"/>';
      if(a<2) s+=line(px+13,py,px+39,py,{c:"var(--ink-3)",w:1.4});
      if(b<2) s+=line(px,py+13,px,py+31,{c:"var(--ink-3)",w:1.4});
    }
    s+=txt(bx+118,by+170,"prostá krychlová mřížka",{anchor:"middle",size:11,w:600,fill:"var(--ink-2)"});
  } else {
    for(var r2=0;r2<3;r2++){
      var y0=by+62+r2*42;
      for(var i2=0;i2<7;i2++){
        var xx=bx+30+i2*29, yy=y0+(i2%2?10:-10);
        s+='<circle cx="'+xx+'" cy="'+yy+'" r="8.5" style="fill:'+col+';stroke:var(--line-strong);stroke-width:1.1"/>';
        if(i2<6) s+=line(xx,yy,xx+29,y0+((i2+1)%2?10:-10),{c:"var(--ink-2)",w:1.6});
      }
    }
    s+=txt(bx+118,by+170,"spirálové řetězce atomů",{anchor:"middle",size:11,w:600,fill:"var(--ink-2)"});
  }
  /* modifikace */
  s+=rect(552,36,214,208,{fill:"var(--surface-2)",r:12,stroke:"var(--line)",sw:1.2});
  s+=txt(659,56,"MODIFIKACE A ZDROJ",{anchor:"middle",size:10,w:700,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  function wrapT(text,x,y,maxc,size,fill,lh){
    var out="", words=text.replace(/<[^>]+>/g,"").split(" "), cur="", n=0;
    words.forEach(function(w){
      if((cur+" "+w).length>maxc){ out+=txt(x,y+n*(lh||14),cur,{size:size||10.5,fill:fill||"var(--ink-2)"}); cur=w; n++; }
      else cur=cur?cur+" "+w:w;
    });
    out+=txt(x,y+n*(lh||14),cur,{size:size||10.5,fill:fill||"var(--ink-2)"});
    return out;
  }
  s+=wrapT(it.mods,566,76,30,10.5,"var(--ink-2)",18);
  s+=line(566,146,758,146,{c:"var(--grid)",w:1});
  s+=txt(566,164,"ZDROJ",{size:9.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  s+=wrapT(it.src,566,182,30,10.5,"var(--ink-2)",18);
  return svg("0 0 "+W+" "+H,s,'aria-label="Karta těžkého chalkogenu"');
}
function refreshSt(){
  var it=stItem(), e=el16(it.s);
  $("#stWrap").innerHTML=drawSt();
  ro("#stRo1","Charakter prvku",e.char,it.sub,"");
  ro("#stRo2","Elektronegativita",fixed(e.EN,2),"kyslík 3,44 → polonium 2,00","");
  $("#stNow").innerHTML=it.now;
  $("#stThen").innerHTML=it.then;
  $("#stBio").innerHTML=it.bio;
  $("#stChem").innerHTML=it.chem;
  segSet("#stSeg",it.id);
}
function initSt(){
  $$("#stSeg button").forEach(function(b){
    b.addEventListener("click",function(){ stState.id=b.dataset.v; refreshSt(); });
  });
  refreshSt();
}

/* ============================================================
   19 · MINI‑GRAFY V RYCHLOKURZU
   ============================================================ */
function drawMiniMO(){
  var W=780, H=220, s="";
  s+=txt(16,26,"ŘADA O₂ⁿ — VŠECHNO SE ROZHODUJE V ORBITALECH π*",{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  var x0=60, gap=178;
  MOSER.forEach(function(m,i){
    var x=x0+i*gap, cy=104;
    s+=rect(x-58,46,140,132,{fill:"var(--surface-2)",r:12,stroke:i===1?"var(--accent)":"var(--line)",sw:i===1?2:1.2});
    s+=txt(x+12,74,m.f,{anchor:"middle",size:18,w:800,fill:i===1?"var(--accent)":"var(--ink)"});
    /* dvě krabičky π* */
    for(var k=0;k<2;k++){
      var bx=x-26+k*46;
      s+=line(bx,cy+6,bx+32,cy+6,{c:"var(--exo)",w:2.2,cap:"round"});
      var ne = k===0 ? (m.pi>=1?(m.pi>=3?2:1):0) : (m.pi>=2?(m.pi>=4?2:1):0);
      for(var q=0;q<ne;q++){
        var ex=bx+(ne===1?16:(q?24:8));
        var up=(ne===1||q===0);
        s+=line(ex,cy-4,ex,cy+16,{c:"var(--accent)",w:1.7,cap:"round"});
        var ty=up?cy-4:cy+16, dy=up?4.5:-4.5;
        s+='<path d="M'+ex+' '+ty+' l-3 '+dy+' l6 0 z" style="fill:var(--accent)"/>';
      }
    }
    s+=txt(x+12,cy+40,"řád "+fixed(m.bo,1)+" · "+fixed(m.d,0)+" pm",{anchor:"middle",size:11,w:600,fill:"var(--ink-2)",mono:true});
    s+=txt(x+12,cy+58,m.mag.indexOf("para")===0?"paramagnetický":"diamagnetický",{anchor:"middle",size:10.5,fill:m.mag.indexOf("para")===0?"var(--exo)":"var(--endo)"});
  });
  s+=txt(W/2,206,"Čím víc elektronů v protivazebných orbitalech π*, tím nižší řád vazby, delší vazba a slabší molekula.",{anchor:"middle",size:11.5,fill:"var(--ink-2)"});
  return svg("0 0 "+W+" "+H,s,'aria-label="Řada O2 s různým obsazením orbitalů pi*"');
}
function drawMiniPer(){
  var W=780, H=200, s="";
  s+=txt(16,26,"OXIDY 3. PERIODY — PŘES PERIODU DOPRAVA ROSTE KYSELOST",{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  var x0=40, w=(W-80)/PER3.length;
  PER3.forEach(function(o,i){
    var x=x0+i*w;
    s+=rect(x+4,50,w-8,64,{fill:ABCOL[o.ab],r:9,style:"fill-opacity:.28"});
    s+=rect(x+4,50,w-8,64,{fill:"none",r:9,stroke:ABCOL[o.ab],sw:1.6});
    s+=txt(x+w/2,80,o.f,{anchor:"middle",size:15,w:700,fill:ABCOL[o.ab]});
    s+=txt(x+w/2,100,ABLBL[o.ab],{anchor:"middle",size:9.5,w:600,fill:"var(--ink-2)"});
    s+=txt(x+w/2,132,BLBL[o.b].split(" ")[0],{anchor:"middle",size:10,fill:"var(--ink-3)"});
    s+=txt(x+w/2,150,"EN "+fixed(o.EN,2),{anchor:"middle",size:10,fill:"var(--ink-3)",mono:true});
  });
  s+=hArrow(44,W-44,176,"var(--accent)","roste elektronegativita prvku → vazba je kovalentnější → oxid je kyselejší",false);
  return svg("0 0 "+W+" "+H,s,'aria-label="Trend acidobazického chování oxidů 3. periody"');
}
function drawMiniVisc(){
  var W=780, H=210, s="";
  var X0=70, X1=560, Y0=44, Y1=156;
  function fx(T){ return X0+(T-100)/(500-100)*(X1-X0); }
  function fy(v){ return Y1-(Math.log(v)/Math.LN10+2.4)/4.5*(Y1-Y0); }
  s+=txt(16,26,"VISKOZITA TAVENINY SÍRY — KAPALINA, KTERÁ SE ZAHŘÍVÁNÍM ZAHUSTÍ",{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  [-2,-1,0,1,2].forEach(function(l){
    var y=Y1-(l+2.4)/4.5*(Y1-Y0);
    s+=line(X0,y,X1,y,{c:"var(--grid)",w:1});
  });
  [100,200,300,400,500].forEach(function(T){
    s+=line(fx(T),Y0,fx(T),Y1,{c:"var(--grid)",w:1});
    s+=txt(fx(T),Y1+16,String(T)+" °C",{anchor:"middle",size:10,fill:"var(--ink-3)",mono:true});
  });
  s+=line(X0,Y1,X1,Y1,{c:"var(--line-strong)",w:1.6});
  s+=polyLine(VISC.filter(function(p){return p[0]>=100;}),fx,fy,"var(--accent)",2.6);
  [[112.8,"tání 112,8 °C","var(--ink-3)"],[159,"polymerace 159 °C","var(--exo)"],[187,"maximum 187 °C","var(--bad)"],[444.6,"var 444,6 °C","var(--ink-3)"]].forEach(function(m){
    s+=line(fx(m[0]),Y0,fx(m[0]),Y1,{c:m[2],w:1.3,dash:"4 4"});
  });
  s+=txt(fx(187)+8,Y0+14,"maximum 187 °C",{size:10.5,w:700,fill:"var(--bad)"});
  s+=txt(fx(159)-8,Y1-8,"159 °C",{anchor:"end",size:10.5,w:700,fill:"var(--exo)"});
  /* legenda vpravo */
  s+=rect(586,44,180,124,{fill:"var(--surface-2)",r:10,stroke:"var(--line)",sw:1.2});
  [["do 159 °C","volné kruhy S₈","var(--cat1)"],["159–187 °C","kruhy → řetězce","var(--bad)"],["nad 187 °C","řetězce se lámou","var(--endo)"]].forEach(function(r,i){
    s+=rect(600,62+i*38,10,10,{fill:r[2],r:3});
    s+=txt(618,72+i*38,r[0],{size:11,w:700,fill:"var(--ink)"});
    s+=txt(618,86+i*38,r[1],{size:10,fill:"var(--ink-3)"});
  });
  s+=txt(X0,196,"Mezi 159 a 187 °C viskozita vyroste o čtyři řády — tavenina nevyteče z převrácené zkumavky.",{size:11.5,fill:"var(--ink-2)"});
  return svg("0 0 "+W+" "+H,s,'aria-label="Viskozita taveniny síry v závislosti na teplotě"');
}
function drawMinis(){
  $("#miniMOWrap").innerHTML=drawMiniMO();
  $("#miniPerWrap").innerHTML=drawMiniPer();
  $("#miniViscWrap").innerHTML=drawMiniVisc();
}
