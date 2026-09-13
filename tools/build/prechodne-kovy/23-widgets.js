/* ============================================================
   23 · k5 — ROZPUSTÍ SE UŠLECHTILÝ KOV?
   ============================================================ */
function drawRz(){
  var kov=pickBy(KOVY3,"id",$("#rzKov").value);
  var cin=pickBy(CINIDLA,"id",$("#rzCin").value);
  var r=ROZP[kov.id+"_"+cin.id], W=760, H=270, s='';
  s+=panelTitle(kov.nm+" + "+cin.nm);
  s+=capt(14,46,"kov, činidlo a výsledek");
  s+=rect(60,70,90,70,{fill:"var(--surface-2)",r:10,stroke:"var(--line-strong)",sw:1.4});
  s+=txt(105,114,kov.id.toUpperCase().slice(0,1)+kov.id.slice(1),{anchor:"middle",size:20,w:700,fill:"var(--ink)"});
  s+=txt(105,166,kov.nm,{anchor:"middle",size:12,w:600,fill:"var(--ink-2)"});
  s+=hArrow(172,330,105,"var(--accent)",false);
  s+=txt(251,88,"+ činidlo",{anchor:"middle",size:11.5,w:600,fill:"var(--accent)"});
  var ok=r.ok;
  s+=rect(400,70,240,70,{fill:ok?"var(--ok)":"var(--bad)",r:10,style:"fill-opacity:.18",
          stroke:ok?"var(--ok)":"var(--bad)",sw:1.6});
  s+=txt(520,114,ok?"ROZPUSTÍ SE":"NEROZPUSTÍ SE",{anchor:"middle",size:15,w:700,
          fill:ok?"var(--ok)":"var(--bad)"});
  s+=txt(520,166,ok?"vzniká rozpustná sloučenina":"reakce neproběhne",{anchor:"middle",size:12,fill:"var(--ink-2)"});
  s+=capt(14,198,"standardní potenciál kovu E° [V]");
  s+=rect(14,210,Math.max(4,kov.e/1.8*300),20,{fill:"var(--accent)",r:5,style:"fill-opacity:.7"});
  s+=rect(14,210,300,20,{fill:"none",stroke:"var(--line)",sw:1,r:5});
  s+=txt(14,252,"E° = "+sgn(kov.e,2)+" V",{size:12.5,w:600,fill:"var(--ink)"});
  s+=txt(400,252,"konfigurace = "+kov.cfg,{size:12,fill:"var(--ink-3)"});
  $("#rzWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Rozpouštění ušlechtilých kovů"');

  ro("#rzRo1","výsledek", ok?"rozpustí se":"nerozpustí se", cin.pop, ok?"pos":"neg");
  ro("#rzRo2","standardní potenciál kovu",sgn(kov.e,2)+" V","čím vyšší, tím ušlechtilejší kov","");
  $("#rzRce").innerHTML = ok ? '<span class="chem">'+r.rce+'</span>' : 'Rovnice není — reakce neproběhne.';
  $("#rzList").innerHTML='<div class="callout '+(ok?"tip":"warn")+'" style="margin:0"><span class="eyebrow">Proč to tak dopadne</span><p>'+r.proc+'</p></div>';
}
function initRz(){
  fillSel("#rzKov",KOVY3.map(function(k){ return {v:k.id,t:k.nm}; }),"v","t","au");
  fillSel("#rzCin",CINIDLA.map(function(c){ return {v:c.id,t:c.nm}; }),"v","t","lucav");
  $("#rzKov").addEventListener("change",drawRz);
  $("#rzCin").addEventListener("change",drawRz);
  drawRz();
}

/* ============================================================
   24 · k6 — TRENAŽÉR: NEÚPLNÉ, NEBO ÚPLNÉ d?
   ============================================================ */
var DRILL = [
 {c:"atom skandia", nd:1, why:"Skandium má v atomu konfiguraci [Ar] 3d¹ 4s². Jediný elektron d stačí — <b>skandium je přechodný prvek</b>."},
 {c:"kation Sc³⁺", nd:0, why:"Po odevzdání tří elektronů zbude konfigurace argonu. Sloučeniny skandia jsou proto bezbarvé a diamagnetické, přestože skandium samo přechodný prvek je."},
 {c:"kation Ti⁴⁺", nd:0, why:"Titan ve stavu IV má prázdné orbitaly d. Přesně proto je oxid titaničitý <b>bílý</b> a používá se jako pigment."},
 {c:"kation Ti³⁺", nd:1, why:"Jediný elektron d může přeskočit do horní dvojice hladin — proto je roztok titanité soli <b>fialový</b>."},
 {c:"kation V²⁺", nd:3, why:"Vanadnatý kation má d³. Je to poslední článek barevné kaskády vanadu a má fialovou barvu."},
 {c:"vanad ve VO₂⁺", nd:0, why:"Ve stavu V má vanad prázdné d. Vanadičnanový roztok je žlutý, ale barvu způsobuje přenos náboje, ne přechod d–d."},
 {c:"kation Cr³⁺", nd:3, why:"Tři elektrony přesně obsadí dolní trojici orbitalů po jednom. Je to velmi stabilní uspořádání a nejběžnější stav chromu."},
 {c:"chrom v CrO₄²⁻", nd:0, why:"Chroman má chrom ve stavu VI, tedy d⁰. Jeho sytě žlutá barva pochází z <b>přenosu náboje</b> z kyslíku na kov."},
 {c:"kation Mn²⁺", nd:5, why:"Pět nepárových elektronů, největší možný spinový moment v první řadě. Poloviční zaplnění dělá tento stav mimořádně stálým."},
 {c:"mangan v MnO₄⁻", nd:0, why:"Manganistan má mangan ve stavu VII, tedy d⁰. Přesto je sytě fialový — a to je nejčastější chyták celého okruhu."},
 {c:"kation Fe²⁺", nd:6, why:"Šestý elektron se musí spárovat, takže nepárové jsou čtyři. Roztok železnaté soli je bledě zelený."},
 {c:"kation Fe³⁺", nd:5, why:"Poloviční zaplnění d⁵ dělá železitý kation stálejším než železnatý. Proto se Fe²⁺ na vzduchu oxiduje."},
 {c:"kation Co³⁺", nd:6, why:"Kobaltitý kation je v komplexech s dusíkatými ligandy velmi stálý, protože v silném poli dá diamagnetickou konfiguraci."},
 {c:"kation Ni²⁺", nd:8, why:"Osm elektronů, dva nepárové. Roztoky nikelnatých solí jsou zelené."},
 {c:"kation Cu⁺", nd:10, why:"Měďný kation má plnou desítku, a proto jsou jeho sloučeniny <b>bezbarvé</b>. Ve vodě navíc disproporcionuje."},
 {c:"kation Cu²⁺", nd:9, why:"Devět elektronů znamená jedno volné místo — proto je roztok modrý. A protože měď takový kation běžně tvoří, <b>je měď přechodný kov</b>."},
 {c:"kation Zn²⁺", nd:10, why:"Plná desítka v atomu i v jediném dostupném kationtu. Právě proto <b>zinek přechodný kov není</b>."},
 {c:"atom zinku", nd:10, why:"Ani v atomu nemá zinek neúplné d. Odtud bezbarvé sloučeniny, diamagnetismus a teplota tání pouhých 420 °C."},
 {c:"kation Cd²⁺", nd:10, why:"Kadmium se chová stejně jako zinek — plná desítka, bezbarvé a diamagnetické sloučeniny, jediný oxidační stav II."},
 {c:"kation Au³⁺", nd:8, why:"Zlato ve stavu III má d⁸. Jeho komplexy jako [AuCl₄]⁻ jsou žluté a mají čtvercové uspořádání."}
];
var drIdx=0, drOk=0, drN=0, drAns=false, drPor=[];
function drNew(){
  if(!drPor.length){
    drPor=DRILL.map(function(_,i){ return i; });
    for(var i=drPor.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)), t=drPor[i]; drPor[i]=drPor[j]; drPor[j]=t; }
  }
  drIdx=drPor.pop(); drAns=false;
  $("#drOtazka").innerHTML="Má částice <b>"+DRILL[drIdx].c+"</b> neúplně zaplněné orbitaly d?";
  $("#drFeed").innerHTML="";
  drawDr();
}
function drawDr(){
  var d=DRILL[drIdx], W=760, H=190, s='';
  s+=capt(14,26,"pět orbitalů d");
  var occ=hund(d.nd,5), i;
  for(i=0;i<5;i++){
    var x=250+i*44;
    s+=rect(x,50,36,36,{fill:"var(--surface-2)",r:5,stroke:"var(--line-strong)",sw:1.2});
    if(!drAns){
      s+=txt(x+18,74,"?",{anchor:"middle",size:16,w:700,fill:"var(--ink-3)"});
    } else {
      if(occ[i]>=1) s+=spin(x+(occ[i]>=2?12:18),68,true,"var(--endo)");
      if(occ[i]>=2) s+=spin(x+24,68,false,"var(--endo)");
    }
  }
  s+=txt(380,128,"neúplné zaplnění = 1 až 9 elektronů d",{anchor:"middle",size:11.5,fill:"var(--ink-3)"});
  if(drAns){
    var nep=d.nd>0&&d.nd<10;
    s+=txt(380,160,"d"+d.nd+" — "+(nep?"neúplné zaplnění":"prázdné nebo plné"),
          {anchor:"middle",size:13,w:700,fill:nep?"var(--ok)":"var(--bad)"});
  }
  $("#drWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Trenažér zaplnění orbitalů d"');
}
function drOdpoved(user){
  if(drAns) { drNew(); return; }
  var d=DRILL[drIdx], spravne=(d.nd>0 && d.nd<10);
  drAns=true; drN++;
  if(user===spravne) drOk++;
  drawDr();
  $("#drScore").innerHTML='<span>Skóre:</span><span class="pct">'+drOk+' / '+drN+'</span>';
  $("#drFeed").innerHTML='<div class="callout '+(user===spravne?"tip":"warn")+'" style="margin:0">'+
    '<span class="eyebrow">'+(user===spravne?"✓ Správně":"✕ Špatně")+' · '+d.c+' má konfiguraci d'+d.nd+'</span><p>'+d.why+
    '</p><p style="margin-top:.5rem;color:var(--ink-3)">Klepnutím na kterékoli z obou tlačítek přejdete na další částici.</p></div>';
  if(drOk>=8) markDone("k6");
}
function initDr(){
  $("#drAno").addEventListener("click",function(){ drOdpoved(true); });
  $("#drNe").addEventListener("click",function(){ drOdpoved(false); });
  $("#drReset").addEventListener("click",function(){
    drOk=0; drN=0; drPor=[];
    $("#drScore").innerHTML='<span>Skóre:</span><span class="pct">0 / 0</span>';
    drNew(); toast("Trenažér vynulován.");
  });
  $("#drScore").innerHTML='<span>Skóre:</span><span class="pct">0 / 0</span>';
  drNew();
}
