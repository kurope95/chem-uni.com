/* ============================================================
   J1 · POMOCNÍCI
   ============================================================ */
/* pevný počet desetinných míst s českou čárkou */
function fx(n,d){ return (n<0?"−":"")+Math.abs(n).toFixed(d).replace(".",","); }
/* segmentové přepínače: nastaví aria-pressed a zavolá cb(hodnota) */
function segBind(id,cb){
  var bs=$$("#"+id+" button");
  bs.forEach(function(b){
    b.addEventListener("click",function(){
      bs.forEach(function(x){ x.setAttribute("aria-pressed", x===b?"true":"false"); });
      cb(b.dataset.v);
    });
  });
}
function msg(el,cls,html){ el.className="jd-msg"+(cls?" "+cls:""); el.innerHTML=html; }
function ro(el,k,v,h){ el.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span>'+(h?'<span class="h">'+h+'</span>':''); }

/* barvy roztoků — skutečné barvy, na motivu nezávisí */
var COL = {water:[214,232,242], pale:[246,232,160], yellow:[232,196,70], brown:[128,62,14], blue:[26,40,130]};
function mixc(a,b,t){ t=Math.max(0,Math.min(1,t)); return [0,1,2].map(function(i){ return Math.round(a[i]+(b[i]-a[i])*t); }); }
function rgb(c,a){ return "rgba("+c[0]+","+c[1]+","+c[2]+","+(a===undefined?1:a)+")"; }
/* barva jodu podle zbývajícího podílu f (1 = všechen uvolněný jod, 0 = žádný) */
function iodColor(f){
  if(f<=0) return rgb(COL.water,.55);
  if(f<0.08) return rgb(mixc(COL.water,COL.pale,f/0.08),.75);
  if(f<0.3)  return rgb(mixc(COL.pale,COL.yellow,(f-0.08)/0.22),.85);
  return rgb(mixc(COL.yellow,COL.brown,(f-0.3)/0.7),.95);
}
function blueColor(s){ return rgb(mixc(COL.water,COL.blue,0.35+0.65*Math.max(0,Math.min(1,s))),.95); }

/* byreta nad erlenmeyerovou baňkou; frac = kolik byrety je vypuštěno (0–1) */
function drawFlask(fill,frac,label,sub){
  var s='';
  /* byreta */
  s+=rect(92,12,16,118,{fill:"var(--surface)",stroke:"var(--ink-3)",sw:1.4,r:3});
  var top=16+Math.max(0,Math.min(1,frac))*106;
  s+=rect(94,top,12,128-top,{fill:"rgba(120,160,210,.35)"});
  for(var k=0;k<=5;k++){ s+=line(92,20+k*21,99,20+k*21,{c:"var(--ink-3)",w:1}); }
  s+=rect(86,130,28,7,{fill:"var(--ink-3)",r:2});
  s+=line(100,137,100,152,{c:"var(--ink-3)",w:2.4,cap:"round"});
  /* baňka */
  var yl=236, xl=85-(yl-200)*55/80, xr=115+(yl-200)*55/80;
  s+='<path d="M'+xl+' '+yl+' L30 280 Q30 286 36 286 L164 286 Q170 286 170 280 L'+xr+' '+yl+' Z" style="fill:'+fill+'"/>';
  s+='<path d="M85 166 L85 200 L30 280 Q30 286 36 286 L164 286 Q170 286 170 280 L115 200 L115 166" style="fill:none;stroke:var(--ink-2);stroke-width:2;stroke-linejoin:round"/>';
  s+=line(81,166,89,166,{c:"var(--ink-2)",w:2,cap:"round"});
  s+=line(111,166,119,166,{c:"var(--ink-2)",w:2,cap:"round"});
  s+=txt(100,306,label,{anchor:"middle",size:13,w:600,fill:"var(--ink)"});
  if(sub) s+=txt(100,323,sub,{anchor:"middle",size:11.5});
  return svg("0 0 200 330",s,'aria-label="Byreta a titrační baňka" style="max-width:15rem;margin:0 auto"');
}

/* ============================================================
   J2 · HERO — REDOXNÍ ŽEBŘÍČEK
   ============================================================ */
var LAD = [
  {id:"h2o2", pair:"H₂O₂ / H₂O", E:1.78, side:"ox", name:"Peroxid vodíku",
   eq:"H₂O₂ + 2I⁻ + 2H⁺ → I₂ + 2H₂O", ratio:"1 H₂O₂ ~ 1 I₂ ~ 2 S₂O₃²⁻",
   note:"Reakce s jodidem je pomalá, urychluje ji molybdenan amonný."},
  {id:"clo", pair:"ClO⁻ / Cl⁻", E:1.49, side:"ox", name:"Chlornan (aktivní chlor)",
   eq:"ClO⁻ + 2I⁻ + 2H⁺ → Cl⁻ + I₂ + H₂O", ratio:"1 ClO⁻ ~ 1 I₂ ~ 2 S₂O₃²⁻",
   note:"Účinnost bělidel a dezinfekcí — řešený příklad v kapitole 05."},
  {id:"bro3", pair:"BrO₃⁻ / Br⁻", E:1.42, side:"ox", name:"Bromičnan",
   eq:"BrO₃⁻ + 6I⁻ + 6H⁺ → Br⁻ + 3I₂ + 3H₂O", ratio:"1 BrO₃⁻ ~ 3 I₂ ~ 6 S₂O₃²⁻", note:""},
  {id:"cr", pair:"Cr₂O₇²⁻ / Cr³⁺", E:1.33, side:"ox", name:"Dichroman",
   eq:"Cr₂O₇²⁻ + 6I⁻ + 14H⁺ → 2Cr³⁺ + 3I₂ + 7H₂O", ratio:"1 Cr₂O₇²⁻ ~ 3 I₂ ~ 6 S₂O₃²⁻",
   note:"Také standard pro thiosíran. Na konci je roztok zelený od Cr³⁺."},
  {id:"io3", pair:"IO₃⁻ / I₂", E:1.20, side:"ox", name:"Jodičnan",
   eq:"IO₃⁻ + 5I⁻ + 6H⁺ → 3I₂ + 3H₂O", ratio:"1 IO₃⁻ ~ 3 I₂ ~ 6 S₂O₃²⁻",
   note:"KIO₃ je nejpřesnější primární standard pro thiosíran."},
  {id:"cu", pair:"Cu²⁺ / CuI", E:0.86, side:"ox", name:"Měďnaté ionty",
   eq:"2Cu²⁺ + 4I⁻ → 2CuI + I₂", ratio:"1 Cu²⁺ ~ ½ I₂ ~ 1 S₂O₃²⁻",
   note:"Rozbor rud a slitin. Pozor na jod adsorbovaný na sraženině CuI."},
  {id:"as", pair:"H₃AsO₄ / H₃AsO₃", E:0.56, side:"red", name:"Arsenitany, As(III)",
   eq:"H₃AsO₃ + I₂ + H₂O ⇌ H₃AsO₄ + 2H⁺ + 2I⁻", ratio:"1 H₃AsO₃ ~ 1 I₂",
   note:"V kyselém prostředí stojí skoro na stejné příčce jako jod, reakce je vratná. Proto se titruje při pH ≈ 8 (pufr NaHCO₃ odebírá H⁺) a běží doprava. As₂O₃ je standard pro roztok jodu."},
  {id:"vitc", pair:"dehydroaskorbová / askorbová", E:0.39, side:"red", name:"Vitamín C",
   eq:"C₆H₈O₆ + I₂ → C₆H₆O₆ + 2H⁺ + 2I⁻", ratio:"1 C₆H₈O₆ ~ 1 I₂",
   note:"Léky i ovocné šťávy — řešený příklad v kapitole 05."},
  {id:"so3", pair:"SO₄²⁻ / SO₃²⁻", E:0.17, side:"red", name:"Siřičitany",
   eq:"SO₃²⁻ + I₂ + H₂O → SO₄²⁻ + 2H⁺ + 2I⁻", ratio:"1 SO₃²⁻ ~ 1 I₂",
   note:"Konzervanty v potravinách a víně."},
  {id:"sn", pair:"Sn⁴⁺ / Sn²⁺", E:0.15, side:"red", name:"Cínaté ionty, Sn(II)",
   eq:"Sn²⁺ + I₂ → Sn⁴⁺ + 2I⁻", ratio:"1 Sn²⁺ ~ 1 I₂", note:""},
  {id:"h2s", pair:"S / H₂S", E:0.14, side:"red", name:"Sulfan",
   eq:"H₂S + I₂ → S + 2H⁺ + 2I⁻", ratio:"1 H₂S ~ 1 I₂", note:"Vylučuje se síra."},
  {id:"s2o3", pair:"S₄O₆²⁻ / S₂O₃²⁻", E:0.08, side:"red", name:"Thiosíran",
   eq:"2S₂O₃²⁻ + I₂ → S₄O₆²⁻ + 2I⁻", ratio:"2 S₂O₃²⁻ ~ 1 I₂",
   note:"Nejen analyt: právě thiosíranem se titruje jod v nepřímé jodometrii."}
];
var ladSel = "cr";

function drawLadder(){
  var W=440, top=40, bot=606, Emax=1.9, Emin=0.0;
  function yE(E){ return top+(Emax-E)/(Emax-Emin)*(bot-top); }
  var s='';
  var yI=yE(0.54);
  s+=rect(56,top,W-60,yI-top,{fill:"var(--exo-soft)"});
  s+=rect(56,yI,W-60,bot-yI,{fill:"var(--endo-soft)"});
  s+=txt(W-6,top-10,"↑ oxidují I⁻ na I₂ → nepřímá jodometrie",{anchor:"end",size:11.5,w:600,fill:"var(--exo)"});
  s+=txt(W-6,bot+20,"↓ redukují I₂ na I⁻ → přímá jodometrie",{anchor:"end",size:11.5,w:600,fill:"var(--endo)"});
  /* osa */
  s+=line(56,top,56,bot,{c:"var(--ink-3)",w:1.5});
  for(var e=0;e<=1.8001;e+=0.3){
    var y=yE(e); s+=line(50,y,56,y,{c:"var(--ink-3)"});
    s+=txt(46,y+4,fx(e,1),{anchor:"end",size:11,mono:true});
  }
  s+=txt(12,top-10,"E° / V",{size:11,w:600});
  /* jod */
  s+=line(56,yI,W-4,yI,{c:"var(--accent)",w:3});
  s+=rect(60,yI-12,150,24,{fill:"var(--accent)",r:6});
  s+=txt(135,yI+5,"I₂ / 2I⁻   +0,54 V",{anchor:"middle",size:12.5,w:700,fill:"var(--accent-ink)"});
  /* štítky: rozestrčit, ať se nepřekrývají, a spojit s osou */
  var items=LAD.slice().sort(function(a,b){return b.E-a.E;}).map(function(d){ return {d:d,y0:yE(d.E),y:yE(d.E)}; });
  var GAP=25;
  /* nad jodem i pod ním zvlášť: odshora odtlačit, pak zespodu stáhnout do mezí */
  function spread(arr,lo,hi){
    var i;
    for(i=0;i<arr.length;i++) arr[i].y=Math.max(arr[i].y,lo,i?arr[i-1].y+GAP:lo);
    for(i=arr.length-1;i>=0;i--) arr[i].y=Math.min(arr[i].y,i<arr.length-1?arr[i+1].y-GAP:hi);
  }
  spread(items.filter(function(it){return it.d.E>0.54;}),top+14,yI-GAP);
  spread(items.filter(function(it){return it.d.E<0.54;}),yI+GAP,bot-14);
  items.forEach(function(it){
    var d=it.d, ox=d.side==="ox", c=ox?"var(--exo)":"var(--endo)", on=d.id===ladSel;
    s+='<circle cx="56" cy="'+it.y0+'" r="3.2" style="fill:'+c+'"/>';
    s+='<path d="M56 '+it.y0+' L150 '+it.y+'" style="fill:none;stroke:'+c+';stroke-width:1;opacity:.6"/>';
    s+='<g class="jd-sp" data-id="'+d.id+'" tabindex="0" role="button" aria-label="'+d.name+'">';
    s+=rect(150,it.y-11,W-156,22,{fill:on?c:"var(--surface)",stroke:c,sw:1.2,r:6});
    s+=txt(159,it.y+4.5,d.pair,{size:12,w:600,fill:on?"var(--accent-ink)":"var(--ink)"});
    s+=txt(W-12,it.y+4.5,(d.E>=0?"+":"")+fx(d.E,2)+" V",{anchor:"end",size:11.5,mono:true,fill:on?"var(--accent-ink)":"var(--ink-2)"});
    s+='</g>';
  });
  $("#ladWrap").innerHTML=svg("0 0 "+W+" "+(bot+30),s,'aria-label="Redoxní žebříček standardních potenciálů"');
  var d=LAD.filter(function(x){return x.id===ladSel;})[0], ox=d.side==="ox";
  $("#ladInfo").innerHTML=
    '<span class="tag '+(ox?"exo":"endo")+'" style="align-self:flex-start">'+(ox?"Oxidovadlo → nepřímá jodometrie":"Redukovadlo → přímá jodometrie (jodimetrie)")+'</span>'+
    '<h4>'+d.name+' <span style="color:var(--ink-3);font-weight:500">('+d.pair+', '+(d.E>=0?"+":"")+fx(d.E,2)+' V)</span></h4>'+
    '<p><b>Titrant:</b> '+(ox?'uvolněný jod titrujeme <span class="chem">Na₂S₂O₃</span>':'odměrný roztok <span class="chem">I₂</span> v KI')+'</p>'+
    '<p class="eq" style="font-size:.9rem"><span class="chem">'+d.eq+'</span></p>'+
    '<p><b>Poměr:</b> <span class="chem">'+d.ratio+'</span></p>'+
    (d.note?'<p style="color:var(--ink-2)">'+d.note+'</p>':'');
}
function initLadder(){
  var w=$("#ladWrap");
  function pick(e){
    var g=e.target.closest ? e.target.closest(".jd-sp") : null;
    if(!g) return;
    ladSel=g.getAttribute("data-id"); drawLadder();
    var again=$('.jd-sp[data-id="'+ladSel+'"]',w); if(again && e.type==="keydown") again.focus();
  }
  w.addEventListener("click",pick);
  w.addEventListener("keydown",function(e){ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); pick(e); } });
  drawLadder();
}

/* ============================================================
   J3 · PŘÍMÁ TITRACE (vitamín C jodem)
   ============================================================ */
var DIR = {c:0.0485, n0:0.0485*11.60, V:0, starch:true, Vmax:16};
function drawDirect(){
  var V=DIR.V, veq=DIR.n0/DIR.c;
  var left=Math.max(0,DIR.n0-DIR.c*V), free=Math.max(0,DIR.c*V-DIR.n0);
  var fill;
  if(free<=1e-9) fill=rgb(COL.water,.55);
  else if(DIR.starch) fill=blueColor(0.55+free/0.03);
  else fill=rgb(mixc(COL.water,COL.pale,Math.min(1,free/0.25)),.7);
  $("#dirWrap").innerHTML=drawFlask(fill,V/DIR.Vmax,"vitamín C + "+(DIR.starch?"škrob":"bez škrobu"),"z byrety: I₂, 0,0485 mol/l");
  $("#dirVV").textContent=fx(V,2)+" ml";
  ro($("#dirRo1"),"Vitamín C zbývá",fx(left,3)+" mmol",Math.round(left/DIR.n0*100)+" % původního");
  ro($("#dirRo2"),"Volný jod",fx(free,3)+" mmol",free>0?"nemá s čím reagovat":"hned se spotřebuje");
  var m=$("#dirMsg"), d=V-veq;
  if(V===0) msg(m,"","Začněte přidávat jod posuvníkem. Dokud je v baňce vitamín C, každá kapka jodu se hned spotřebuje.");
  else if(d<-0.025) msg(m,"","Jod reaguje s vitamínem C hned, jak dopadne do baňky. Volný jod není, roztok zůstává <b>bezbarvý</b>. Do bodu ekvivalence chybí "+fx(-d,2)+" ml.");
  else if(d<=0.1) msg(m,"ok",DIR.starch?"<b>Bod ekvivalence (11,60 ml).</b> První kapka jodu navíc už nemá s čím reagovat, naváže se na škrob a roztok <b>trvale zmodrá</b>. Tady titraci ukončíme.":"<b>Bod ekvivalence (11,60 ml).</b> Přebytek jodu je ale zatím jen nepatrně nažloutlý. Bez škrobu se tenhle okamžik snadno přehlédne.");
  else if(DIR.starch) msg(m,"warn","Přetitrováno o "+fx(d,2)+" ml. Roztok zmodral už při 11,60 ml; každý mililitr navíc výsledek zvýší.");
  else msg(m,"warn","Přetitrováno o "+fx(d,2)+" ml. Bez škrobu je přebytek jodu jen <b>slabě žlutý</b> a konec titrace se snadno přejede. Proto se přidává škrob.");
}
function initDirect(){
  $("#dirV").addEventListener("input",function(){ DIR.V=+this.value; drawDirect(); });
  segBind("dirStarch",function(v){ DIR.starch=v==="1"; drawDirect(); });
  drawDirect();
}

/* ============================================================
   J4 · NEPŘÍMÁ TITRACE (jod z chlornanu thiosíranem)
   ============================================================ */
var IND = {veq:14.85, V:0, starchF:null, end:null, Vmax:25};
function indLag(){ /* škrob přidaný při vysokém obsahu jodu → pevný komplex, konec se vleče */
  return (IND.starchF!==null && IND.starchF>0.3) ? Math.round(IND.starchF*0.9/0.05)*0.05 : 0;
}
function drawIndirect(){
  var V=IND.V, veq=IND.veq, f=Math.max(0,1-V/veq), lag=indLag(), fill;
  var starch=IND.starchF!==null;
  if(!starch) fill=iodColor(f);
  else if(lag>0 && V<veq+lag) fill=blueColor(f>0 ? 0.6+f*0.4 : 0.45*(1-(V-veq)/lag));
  else if(f>0) fill=blueColor(0.55+f*1.5);
  else fill=rgb(COL.water,.55);
  $("#indWrap").innerHTML=drawFlask(fill,V/IND.Vmax,"uvolněný I₂"+(starch?" + škrob":""),"z byrety: Na₂S₂O₃, 0,1050 mol/l");
  ro($("#indRo1"),"Přidáno thiosíranu",fx(V,2)+" ml");
  ro($("#indRo2"),"Zbývá jodu",Math.round(f*100)+" %",f>0?"z uvolněného množství":"všechen zreagoval");
  $("#indStarch").disabled=starch;
  var m=$("#indMsg");
  if(V>=veq+lag-1e-9 && starch && IND.end===null) IND.end=Math.max(V,veq);
  if(IND.end!==null){
    var err=(IND.end-veq)/veq*100;
    if(IND.starchF===0) msg(m,"warn","Škrob už nezmodral, protože jod byl pryč. Konec titrace jste bez indikátoru poznat nemohli, skončili jste na <b>"+fx(IND.end,2)+" ml</b>. Škrob patří do roztoku, dokud je světle žlutý.");
    else if(lag>0) msg(m,"bad","Modrá mizela pozvolna a úplně zmizela až při <b>"+fx(IND.end,2)+" ml</b> místo 14,85 ml. Chyba <b>+"+fx(err,1)+" %</b>. Škrob jste přidali moc brzy, když zbývalo "+Math.round(IND.starchF*100)+" % jodu. Jod vázaný v pevném komplexu reagoval s thiosíranem pomalu.");
    else if(IND.end-veq<0.06) msg(m,"ok","<b>Modrá náhle zmizela při "+fx(IND.end,2)+" ml.</b> To je bod ekvivalence: poslední jod zreagoval a komplex se škrobem se rozpadl. Ostrý konec díky škrobu přidanému včas.");
    else msg(m,"warn","Roztok odbarvil už při 14,85 ml, ale přidávali jste po celých mililitrech a skončili jste na <b>"+fx(IND.end,2)+" ml</b> (chyba +"+fx(err,1)+" %). Ke konci přidávejte po kapkách.");
    return;
  }
  if(!starch && f<=0) { msg(m,"warn","Roztok je bezbarvý, ale bez škrobu jste nepoznali, kdy přesně zmizela poslední žlutá. Titrace je nejspíš přetažená. Zkuste to znovu a přidejte škrob při světle žluté barvě."); return; }
  if(starch && lag>0 && f<=0){ msg(m,"warn","Jste za bodem ekvivalence, ale roztok je pořád modrý. Jod vázaný ve škrobovém komplexu reaguje pomalu a konec se vleče. Přidávejte dál a sledujte, kdy modrá zmizí."); return; }
  if(V===0 && !starch) msg(m,"","Oxidovadlo uvolnilo z KI jod, roztok je <b>hnědý</b>. Titrujte thiosíranem.");
  else if(!starch && f>0.3) msg(m,"","Hnědá bledne, jod ubývá. Na škrob je ještě brzy.");
  else if(!starch) msg(m,"ok","Roztok je <b>světle žlutý</b>, většina jodu zreagovala. <b>Teď je správný čas přidat škrob.</b>");
  else if(lag>0) msg(m,"bad","Škrob jste přidali, když v roztoku bylo ještě "+Math.round(IND.starchF*100)+" % jodu. Vznikl pevný komplex, uvidíte, jak se bude konec vléct.");
  else msg(m,"ok","Roztok je <b>modrý</b>. Pokračujte opatrně po kapkách, dokud modrá nezmizí.");
}
function indAdd(dv){
  if(IND.end!==null) return;
  IND.V=Math.min(IND.Vmax,Math.round((IND.V+dv)*100)/100);
  drawIndirect();
}
function initIndirect(){
  $("#indAdd1").addEventListener("click",function(){ indAdd(1); });
  $("#indAdd01").addEventListener("click",function(){ indAdd(0.05); });
  $("#indStarch").addEventListener("click",function(){
    if(IND.starchF!==null) return;
    IND.starchF=Math.max(0,1-IND.V/IND.veq); drawIndirect();
  });
  $("#indReset").addEventListener("click",function(){ IND.V=0; IND.starchF=null; IND.end=null; drawIndirect(); });
  drawIndirect();
}
