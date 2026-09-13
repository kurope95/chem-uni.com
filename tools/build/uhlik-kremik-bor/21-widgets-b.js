/* ============================================================
   4 · K2 — UHLIČITANOVÝ SYSTÉM (distribuční diagram)
   ============================================================ */
var caState={ph:7.0};
var CA_K1=4.45e-7, CA_K2=4.69e-11;
function caFrac(ph){
  var h=Math.pow(10,-ph);
  var d=h*h + CA_K1*h + CA_K1*CA_K2;
  return {a:h*h/d, b:CA_K1*h/d, c:CA_K1*CA_K2/d};
}
function drawCa(){
  var ph=caState.ph, f=caFrac(ph);
  var W=720,H=278,L=52,R=20,T=48,B=44, pw=W-L-R, ph_=H-T-B, s='';
  s+=txt(L,17,"ZASTOUPENÍ FOREM UHLIČITANOVÉHO SYSTÉMU [%] PODLE pH",{size:11.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.07em"});
  for(var i=0;i<=4;i++){
    var yy=T+ph_-ph_*i/4;
    s+=line(L,yy,L+pw,yy,{c:"var(--line)",w:1,dash:i?"3 4":""});
    s+=txt(L-8,yy+4,String(i*25),{anchor:"end",size:10,fill:"var(--ink-3)",mono:true});
  }
  function X(p){ return L + (p-2)/12*pw; }
  function Y(v){ return T+ph_-v*ph_; }
  for(var p=2;p<=14;p+=2){
    s+=line(X(p),T,X(p),T+ph_,{c:"var(--line)",w:1,dash:"3 4"});
    s+=txt(X(p),T+ph_+16,String(p),{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true});
  }
  s+=txt(L+pw/2,T+ph_+34,"pH",{anchor:"middle",size:11,w:600,fill:"var(--ink-2)"});
  /* křivky */
  var cols=["var(--exo)","var(--accent)","var(--endo)"], keys=["a","b","c"];
  keys.forEach(function(k,ki){
    var d="";
    for(var p=2;p<=14;p+=0.1){
      var v=caFrac(p)[k];
      d+=(d?" L ":"M ")+fmt(X(p),1).replace(",",".")+" "+fmt(Y(v),1).replace(",",".");
    }
    s+='<path d="'+d+'" style="fill:none;stroke:'+cols[ki]+';stroke-width:2.6;stroke-linejoin:round"/>';
  });
  /* pK čáry */
  [[6.35,"pK₁ = 6,35"],[10.33,"pK₂ = 10,33"]].forEach(function(q){
    s+=line(X(q[0]),T,X(q[0]),T+ph_,{c:"var(--ink-3)",w:1.2,dash:"5 4"});
    s+=txt(X(q[0])+4,T+12,q[1],{size:10,w:600,fill:"var(--ink-3)"});
  });
  /* svislá čára aktuálního pH */
  s+=line(X(ph),T-6,X(ph),T+ph_+4,{c:"var(--ink)",w:2.2});
  s+=txt(X(ph),T-10,"pH "+fmt(ph,1),{anchor:"middle",size:11.5,w:700,fill:"var(--ink)"});
  keys.forEach(function(k,ki){
    s+='<circle cx="'+X(ph)+'" cy="'+Y(f[k])+'" r="5" style="fill:'+cols[ki]+';stroke:var(--surface);stroke-width:2"/>';
  });
  /* popisky křivek */
  s+=txt(X(4),Y(0.9),"CO₂ + H₂CO₃",{size:11.5,w:700,fill:"var(--exo)"});
  s+=txt(X(8)-24,Y(0.93),"HCO₃⁻",{size:11.5,w:700,fill:"var(--accent)"});
  s+=txt(X(12.6),Y(0.9),"CO₃²⁻",{anchor:"end",size:11.5,w:700,fill:"var(--endo)"});
  $("#caWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Distribuční diagram uhličitanového systému"');

  ro("#caRo1","CO₂ a H₂CO₃",fmt(f.a*100,1)+" %","rozpuštěný plyn a jeho hydrát","neg");
  ro("#caRo2","HCO₃⁻",fmt(f.b*100,1)+" %","hydrogenuhličitanový anion");
  ro("#caRo3","CO₃²⁻",fmt(f.c*100,1)+" %","uhličitanový anion","pos");
  var t;
  if(ph<5) t="Silně kyselé prostředí. Uhličitan by tu okamžitě zreagoval na CO₂, který uniká — proto vápenec v kyselině <b>šumí</b>.";
  else if(ph<6.35) t="Pod pK₁ = 6,35 pořád převládá <b>rozpuštěný oxid uhličitý</b>. Sem patří perlivá voda i dešťová voda nasycená CO₂ (pH kolem 5,6).";
  else if(ph<8.3) t="Oblast, kde drtivě převládá <b>hydrogenuhličitan</b>. Sem patří krev (pH 7,4), většina přírodních vod i mořská voda (pH kolem 8,1).";
  else if(ph<10.33) t="Stále převládá hydrogenuhličitan, ale uhličitanu už znatelně přibývá. Tady se z tvrdé vody začíná srážet <b>vodní kámen</b>.";
  else t="Nad pK₂ = 10,33 vítězí <b>uhličitan</b>. Takové pH má roztok sody — proto soda ve vodě reaguje zásaditě a proto se s vápníkem okamžitě vysráží CaCO₃.";
  $("#caTxt").innerHTML=t;
}
function initCa(){
  var inp=$("#caPH");
  inp.addEventListener("input",function(){
    caState.ph=(+this.value)/10;
    $("#caPHv").textContent=fmt(caState.ph,1);
    drawCa();
  });
  $("#caPHv").textContent=fmt(caState.ph,1);
  drawCa();
}

/* ============================================================
   5 · K2 — BOUDOUARDOVA ROVNOVÁHA
   ============================================================ */
var boState={t:700};
/* modelová sigmoida se zlomem u 707 °C (z ΔH = +172 kJ·mol⁻¹ a ΔS = +176 J·K⁻¹·mol⁻¹) */
function boCO(tC){ return 1/(1+Math.exp(-(tC-707)/95)); }
function drawBo(){
  var tC=boState.t, fCO=boCO(tC), fCO2=1-fCO;
  var W=720,H=268,L=52,R=110,T=48,B=44, pw=W-L-R, ph=H-T-B, s='';
  s+=txt(L,17,"ROVNOVÁŽNÉ SLOŽENÍ PLYNU NAD PŘEBYTKEM UHLÍKU [%]",{size:11.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.07em"});
  for(var i=0;i<=4;i++){
    var yy=T+ph-ph*i/4;
    s+=line(L,yy,L+pw,yy,{c:"var(--line)",w:1,dash:i?"3 4":""});
    s+=txt(L-11,yy+4,String(i*25),{anchor:"end",size:10,fill:"var(--ink-3)",mono:true});
  }
  function X(t){ return L+(t-300)/900*pw; }
  function Y(v){ return T+ph-v*ph; }
  for(var t=300;t<=1200;t+=150){
    s+=line(X(t),T,X(t),T+ph,{c:"var(--line)",w:1,dash:"3 4"});
    s+=txt(X(t),T+ph+16,String(t),{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true});
  }
  s+=txt(L+pw/2,T+ph+34,"teplota [°C]",{anchor:"middle",size:11,w:600,fill:"var(--ink-2)"});
  var dCO="",dCO2="";
  for(var t=300;t<=1200;t+=5){
    var v=boCO(t);
    dCO+=(dCO?" L ":"M ")+fmt(X(t),1).replace(",",".")+" "+fmt(Y(v),1).replace(",",".");
    dCO2+=(dCO2?" L ":"M ")+fmt(X(t),1).replace(",",".")+" "+fmt(Y(1-v),1).replace(",",".");
  }
  s+='<path d="'+dCO+'" style="fill:none;stroke:var(--exo);stroke-width:2.8"/>';
  s+='<path d="'+dCO2+'" style="fill:none;stroke:var(--endo);stroke-width:2.8"/>';
  s+=line(X(707),T,X(707),T+ph,{c:"var(--ink-3)",w:1.2,dash:"5 4"});
  s+=txt(X(707)+4,T+12,"zlom ≈ 707 °C",{size:10,w:600,fill:"var(--ink-3)"});
  s+=line(X(tC),T-6,X(tC),T+ph+4,{c:"var(--ink)",w:2.2});
  s+='<circle cx="'+X(tC)+'" cy="'+Y(fCO)+'" r="5" style="fill:var(--exo);stroke:var(--surface);stroke-width:2"/>';
  s+='<circle cx="'+X(tC)+'" cy="'+Y(fCO2)+'" r="5" style="fill:var(--endo);stroke:var(--surface);stroke-width:2"/>';
  var yCO=Y(fCO)+4, yCO2=Y(fCO2)+4, loY=T+11, hiY=T+ph-3;
  yCO=Math.max(loY,Math.min(hiY,yCO)); yCO2=Math.max(loY,Math.min(hiY,yCO2));
  if(Math.abs(yCO-yCO2)<18){
    var mid=Math.max(loY+9,Math.min(hiY-9,(yCO+yCO2)/2));
    if(yCO<=yCO2){ yCO=mid-9; yCO2=mid+9; } else { yCO=mid+9; yCO2=mid-9; }
  }
  s+=txt(L+pw+10,yCO,"CO "+fmt(fCO*100,0)+" %",{size:12,w:700,fill:"var(--exo)"});
  s+=txt(L+pw+10,yCO2,"CO₂ "+fmt(fCO2*100,0)+" %",{size:12,w:700,fill:"var(--endo)"});
  s+=txt(L+pw/2,T-10,"C(s) + CO₂(g) ⇌ 2 CO(g)   ΔH° = +172 kJ·mol⁻¹",{anchor:"middle",size:11.5,w:700,fill:"var(--accent)"});
  $("#boWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Boudouardova rovnováha"');

  ro("#boRo1","teplota",tC+" °C","přebytek pevného uhlíku, tlak 101,325 kPa");
  ro("#boRo2","oxid uhelnatý",fmt(fCO*100,0)+" %","redukovadlo — čím tepleji, tím víc ho je","neg");
  ro("#boRo3","oxid uhličitý",fmt(fCO2*100,0)+" %","při nízké teplotě je jediným produktem","pos");
  var t;
  if(tC<450) t="Nízká teplota. Endotermní reakce nemá dost energie, takže rovnováha leží zcela vlevo — spalováním uhlíku vzniká prakticky jen <b>CO₂</b>. Tak to vypadá v běžných kamnech s dobrým přívodem vzduchu.";
  else if(tC<707) t="Přechodová oblast. Rovnováha se rozjíždí doprava, ale <b>CO₂ stále převládá</b>. Tady je nejnebezpečnější pásmo pro otravu — CO už vzniká, ale hoření vypadá normálně.";
  else if(tC<950) t="Nad zlomem. Teplo je pro endotermní reakci „reaktantem“, takže rovnováha se překlopila a <b>převládá CO</b>. V této oblasti pracuje střední část vysoké pece, kde CO redukuje oxidy železa.";
  else t="Vysoká teplota. Rovnováha leží prakticky úplně vpravo, plyn je téměř <b>čistý CO</b>. Tak to vypadá u výfučen vysoké pece a v generátorech vodního plynu.";
  $("#boTxt").innerHTML=t;
}
function initBo(){
  $("#boT").addEventListener("input",function(){
    boState.t=+this.value; $("#boTv").textContent=boState.t+" °C"; drawBo();
  });
  $("#boTv").textContent=boState.t+" °C";
  drawBo();
}

/* ============================================================
   6 · K3 — PROHLEDÁVATELNÁ TABULKA SLOUČENIN
   ============================================================ */
var tbState={q:"",f:"all"};
function drawTb(){
  var q=tbState.q.toLowerCase().trim();
  var rows=SLOUC.filter(function(x){
    if(tbState.f!=="all" && x.p!==tbState.f) return false;
    if(!q) return true;
    return (x.v+" "+x.n+" "+x.ox+" "+x.st+" "+x.vl+" "+x.u).toLowerCase().indexOf(q)>=0;
  });
  var COL={C:"var(--cat2)",Si:"var(--cat1)",B:"var(--cat3)"};
  var h="";
  rows.forEach(function(x){
    h+='<tr><td class="mono" style="white-space:nowrap;font-weight:700;color:'+COL[x.p]+'">'+x.v+'</td>'+
       '<td style="font-size:.9rem">'+x.n+'</td>'+
       '<td class="n mono" style="white-space:nowrap;font-size:.85rem">'+x.ox+'</td>'+
       '<td style="font-size:.85rem;color:var(--ink-2);line-height:1.45">'+x.st+'</td>'+
       '<td style="font-size:.85rem;color:var(--ink-2);line-height:1.45">'+x.vl+' <span style="color:var(--ink-3)">— '+x.u+'</span></td></tr>';
  });
  if(!rows.length) h='<tr><td colspan="5" style="padding:1.1rem;color:var(--ink-3)">Nic nenalezeno. Zkuste „hydrolyzuje“, „jedovatý“, „tvrdý“, „sklo“, „karbid“ nebo „redukovadlo“.</td></tr>';
  $("#tbBody").innerHTML=h;
  press("#tbFilter",tbState.f);
  var slovo = rows.length===1?"sloučenina":(rows.length>=2&&rows.length<=4?"sloučeniny":"sloučenin");
  $("#tbCount").textContent="Zobrazeno: "+rows.length+" "+slovo+(q?" pro dotaz „"+tbState.q.trim()+"“":"")+".";
}
function initTb(){
  $("#tbSearch").addEventListener("input",function(){ tbState.q=this.value; drawTb(); });
  $$("#tbFilter button").forEach(function(b){ b.addEventListener("click",function(){ tbState.f=b.dataset.v; drawTb(); }); });
  drawTb();
}

/* ============================================================
   7 · K3 — TRENAŽÉR KARBIDŮ
   ============================================================ */
var KD_POOL=[
  {vz:"CaC₂", typ:"iontový", ans:"acetylen", why:"Vápník je kov 2. skupiny, karbid je tedy iontový a obsahuje acetylidový anion C₂²⁻. Ten je zbytkem acetylenu, takže voda ho protonuje: CaC₂ + 2 H₂O → Ca(OH)₂ + C₂H₂."},
  {vz:"Al₄C₃", typ:"iontový", ans:"methan", why:"Hliník je kov 13. skupiny. Ze stechiometrie plyne anion C⁴⁻, tedy izolovaný atom uhlíku — formálně sůl methanu: Al₄C₃ + 12 H₂O → 4 Al(OH)₃ + 3 CH₄."},
  {vz:"Be₂C", typ:"iontový", ans:"methan", why:"Beryllium je kov 2. skupiny. Dva ionty Be²⁺ dají +4, takže anion je C⁴⁻ — opět izolovaný atom uhlíku, a proto methan: Be₂C + 4 H₂O → 2 Be(OH)₂ + CH₄."},
  {vz:"Mg₂C₃", typ:"iontový", ans:"propin", why:"Anion C₃⁴⁻ je tříatomový lineární útvar. Jeho protonací vzniká tříuhlíkatý uhlovodík s trojnou vazbou, tedy propin: Mg₂C₃ + 4 H₂O → 2 Mg(OH)₂ + C₃H₄."},
  {vz:"Na₂C₂", typ:"iontový", ans:"acetylen", why:"Sodík je kov 1. skupiny, dva ionty Na⁺ vyrovnávají anion C₂²⁻. Acetylid dává vždy acetylen."},
  {vz:"SiC", typ:"kovalentní", ans:"nic", why:"Křemík je polokov a rozdíl elektronegativit je jen 0,65. Vzniká kovalentní síť typu diamantu, ve které není žádný anion k protonaci — s vodou tedy nereaguje vůbec."},
  {vz:"B₄C", typ:"kovalentní", ans:"nic", why:"Ikosaedry B₁₂ propojené řetízky uhlíku tvoří kovalentní síť. Je to jeden z nejtvrdších materiálů a je chemicky netečný."},
  {vz:"TiC", typ:"intersticiální", ans:"nic", why:"Titan je přechodný kov. Malé atomy uhlíku se vejdou do dutin jeho kovové mřížky, aniž ji rozbijí — kovová vazba zůstává. Karbid je proto vodivý, kovově lesklý a s vodou nereaguje."},
  {vz:"WC", typ:"intersticiální", ans:"nic", why:"Wolfram je přechodný kov 6. skupiny a jeho elektronegativita se od uhlíkové liší jen nepatrně. Vmezeřený karbid, materiál tvrdokovových destiček, s vodou nereaguje."},
  {vz:"VC", typ:"intersticiální", ans:"nic", why:"Vanad je přechodný kov 5. skupiny — opět intersticiální karbid. S vodou nereaguje a používá se jako složka tvrdých nástrojových ocelí."},
  {vz:"ZrC", typ:"intersticiální", ans:"nic", why:"Zirkonium je přechodný kov 4. skupiny. Intersticiální karbid s extrémně vysokou teplotou tání; s vodou nereaguje."},
  {vz:"CaC₂ v kyselině", typ:"iontový", ans:"acetylen", why:"Kyselina protonuje acetylidový anion ještě ochotněji než voda — vzniká opět acetylen, jen rychleji a bez hydroxidu vápenatého."}
];
var kdD={q:null,score:0,n:0,answered:false};
var KD_OPTS=["acetylen","methan","propin","nic"];
function kdNew(){
  var q=KD_POOL[Math.floor(Math.random()*KD_POOL.length)];
  kdD.q=q; kdD.answered=false;
  $("#kdQ").innerHTML='Do vody vhodíte <b class="chem" style="font-size:1.16em">'+q.vz+'</b>. Co se uvolní?';
  $("#kdOpts").innerHTML=KD_OPTS.map(function(o,i){
    return '<button class="btn btn-sm" type="button" data-a="'+i+'">'+(o==="nic"?"nic — nereaguje":o)+'</button>';
  }).join("");
  $$("#kdOpts button").forEach(function(b){
    b.addEventListener("click",function(){ kdAnswer(KD_OPTS[+b.dataset.a]); });
  });
  $("#kdA").innerHTML="";
}
function kdAnswer(pick){
  if(kdD.answered) return; kdD.answered=true;
  var q=kdD.q, ok=(pick===q.ans);
  kdD.n++; if(ok) kdD.score++;
  $("#kdScore").textContent=kdD.score; $("#kdN").textContent=kdD.n;
  $$("#kdOpts button").forEach(function(b){ b.disabled=true; });
  $("#kdA").innerHTML='<b style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+
    (ok?"✓ Správně.":"✕ Špatně — správně je „"+(q.ans==="nic"?"nic — nereaguje":q.ans)+"“.")+
    '</b> Typ karbidu: <b>'+q.typ+'</b>. '+q.why;
  if(kdD.score>=8) markDone("k3");
}
function initKd(){
  $("#kdNext").addEventListener("click",kdNew);
  kdNew();
}
