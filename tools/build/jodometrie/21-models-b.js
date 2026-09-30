/* ============================================================
   J5 · OKNO pH PRO PŘÍMOU JODOMETRII
   ============================================================ */
var PH = 8;
var PHZ = [
  {a:0, b:4, c:"var(--bad)", lab:"silně kyselé", cls:"bad",
   t:"<b>Silně kyselé.</b> Jodid se oxiduje vzdušným kyslíkem: <span class=\"chem\">4I⁻ + O₂ + 4H⁺ → 2I₂ + 2H₂O</span>. Vzniká jod, který nepochází z titrantu, a škrob se v silně kyselém roztoku rozkládá."},
  {a:4, b:7, c:"var(--warn)", lab:"mírně kyselé", cls:"warn",
   t:"<b>Mírně kyselé.</b> Reakce, které uvolňují H⁺ (např. As(III) s jodem), nedoběhnou úplně, protože kyselina je tlačí zpátky. Některá stanovení se tu přesto dělají záměrně, třeba vitamín C."},
  {a:7, b:9, c:"var(--ok)", lab:"optimum", cls:"ok",
   t:"<b>Optimum.</b> Jod reaguje s redukovadly úplně a vedlejší reakce jsou potlačené. Pufr <span class=\"chem\">NaHCO₃</span> drží pH kolem 8."},
  {a:9, b:14, c:"var(--bad)", lab:"zásadité", cls:"bad",
   t:"<b>Zásadité (pH &gt; 9).</b> Jod disproporcionuje: <span class=\"chem\">I₂ + 2OH⁻ → I⁻ + IO⁻ + H₂O</span>. Spotřebuje se jinak než s analytem a výsledek je špatně."}
];
function drawPH(){
  var W=440, x0=14, x1=426, s='';
  function xp(p){ return x0+(x1-x0)*p/14; }
  PHZ.forEach(function(z){
    s+=rect(xp(z.a),30,xp(z.b)-xp(z.a),38,{fill:z.c,style:"opacity:.22"});
    s+=txt((xp(z.a)+xp(z.b))/2,54,z.lab.replace("optimum ",""),{anchor:"middle",size:13,w:600,fill:"var(--ink)"});
  });
  s+=rect(x0,30,x1-x0,38,{fill:"none",stroke:"var(--line-strong)",r:4});
  for(var p=0;p<=14;p++){ s+=line(xp(p),68,xp(p),74,{c:"var(--ink-3)"}); s+=txt(xp(p),89,String(p),{anchor:"middle",size:12,mono:true}); }
  var x=xp(PH);
  s+='<path d="M'+x+' 26 l-7 -12 l14 0 z" style="fill:var(--accent)"/>';
  s+=line(x,26,x,72,{c:"var(--accent)",w:2.5});
  $("#phWrap").innerHTML=svg("0 0 "+W+" 96",s,'aria-label="Stupnice pH s oknem pro přímou jodometrii"');
  $("#phVV").textContent=fx(PH,1);
  var z=PHZ.filter(function(z){ return PH>=z.a && (PH<z.b || z.b===14); })[0];
  if(PH===9) z=PHZ[2];
  msg($("#phMsg"),z.cls,z.t);
}

/* ============================================================
   J6 · ŠKROB — JOD VE ŠROUBOVICI AMYLOSY
   ============================================================ */
function drawHelix(){
  var W=460, H=190, cy=92, A=46, s='', i, x;
  var back='', front='';
  for(i=0;i<=240;i++){
    var t=i/240, xx=20+t*420, ph=t*Math.PI*2*3.5, y=cy+A*Math.sin(ph);
    var seg=(Math.cos(ph)>0);
    if(i>0){
      var tp=(i-1)/240, xp=20+tp*420, yp=cy+A*Math.sin(tp*Math.PI*2*3.5);
      var l='<path d="M'+xp.toFixed(1)+' '+yp.toFixed(1)+' L'+xx.toFixed(1)+' '+y.toFixed(1)+'" style="stroke:var(--ink-3);stroke-width:'+(seg?5:3)+';stroke-linecap:round;opacity:'+(seg?.95:.4)+'"/>';
      if(seg) front+=l; else back+=l;
    }
  }
  s+=back;
  s+=rect(28,cy-13,404,26,{fill:"rgba(40,60,190,.20)",r:13});
  for(i=0;i<13;i++){
    x=42+i*31.5;
    s+='<circle cx="'+x+'" cy="'+cy+'" r="9" style="fill:#5b3a93;stroke:#2a1a55;stroke-width:1"/>';
    if(i%3===1) s+=txt(x,cy+4,"I",{anchor:"middle",size:10,w:700,fill:"#fff"});
  }
  s+=front;
  s+=txt(20,22,"amylosa — šroubovice z glukosových jednotek",{size:14,w:600,fill:"var(--ink-2)"});
  s+=txt(20,H-8,"uvnitř řetízek jodu (I₃⁻, I₅⁻) → modrý komplex",{size:14,w:600,fill:"#3346b8"});
  $("#helixWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Schéma: řetízek jodu uvnitř šroubovice amylosy"');
}

/* ============================================================
   J7 · STECHIOMETRICKÝ ŘETÍZEK
   ============================================================ */
var CHAIN = [
  {k:"cu", lab:"Cu²⁺", a:2, i:1, t:2, eqs:["2Cu²⁺ + 4I⁻ → 2CuI + I₂"],
   note:"Rozbor rud a slitin. Na sraženině CuI se část jodu adsorbuje, proto se ke konci přidává KSCN (kapitola 03)."},
  {k:"clo", lab:"ClO⁻", a:1, i:1, t:2, eqs:["ClO⁻ + 2I⁻ + 2H⁺ → Cl⁻ + I₂ + H₂O"],
   note:"Aktivní chlor v bělidlech a dezinfekcích (příklad v kapitole 05)."},
  {k:"h2o2", lab:"H₂O₂", a:1, i:1, t:2, eqs:["H₂O₂ + 2I⁻ + 2H⁺ → I₂ + 2H₂O"],
   note:"Reakce je pomalá, často se katalyzuje molybdenanem amonným."},
  {k:"cr", lab:"Cr₂O₇²⁻", a:1, i:3, t:6, eqs:["Cr₂O₇²⁻ + 6I⁻ + 14H⁺ → 2Cr³⁺ + 3I₂ + 7H₂O"],
   note:"Pomalejší reakce, nechává se chvíli stát v temnu. Na konci je roztok zelený od Cr³⁺."},
  {k:"io3", lab:"IO₃⁻", a:1, i:3, t:6, eqs:["IO₃⁻ + 5I⁻ + 6H⁺ → 3I₂ + 3H₂O"],
   note:"KIO₃ je přesný primární standard pro standardizaci thiosíranu."},
  {k:"bro3", lab:"BrO₃⁻", a:1, i:3, t:6, eqs:["BrO₃⁻ + 6I⁻ + 6H⁺ → Br⁻ + 3I₂ + 3H₂O"], note:""},
  {k:"o2", lab:"O₂ (Winkler)", a:1, i:2, t:4,
   eqs:["O₂ + 2Mn²⁺ + 4OH⁻ → 2MnO(OH)₂ (zásadité)","MnO(OH)₂ + 2I⁻ + 4H⁺ → Mn²⁺ + I₂ + 3H₂O (po okyselení)"],
   note:"Winklerova metoda: rozpuštěný kyslík ve vodě. Kyslík nejdřív zoxiduje Mn²⁺, po okyselení vzniklý MnO(OH)₂ uvolní jod."}
];
var chK="clo";
/* „most“ přes jod: 1 mol analytu → kolik mol I₂ uvolní → kolik mol S₂O₃²⁻ spotřebuje */
function molTxt(x){ return x===0.5?"½":(x===0.25?"¼":fmt(x,2)); }
function drawChain(){
  var d=CHAIN.filter(function(x){return x.k===chK;})[0];
  var an=d.lab.replace(" (Winkler)","");
  var i1=d.i/d.a, t1=d.t/d.a;               /* na 1 mol analytu */
  var h='<div class="jd-bridge">'+
    '<div class="jd-bx a"><span class="jd-bn">1 mol</span><span class="jd-bs">'+an+'</span><span class="jd-bc">analyt ve vzorku</span></div>'+
    '<div class="jd-bar"><span class="jd-bt">krok 1: uvolní z KI</span><span class="jd-bl">→</span></div>'+
    '<div class="jd-bx i"><span class="jd-bn">'+molTxt(i1)+' mol</span><span class="jd-bs">I₂</span><span class="jd-bc">uvolněný jod</span></div>'+
    '<div class="jd-bar"><span class="jd-bt">krok 2: spotřebuje (1 I₂ : 2 S₂O₃²⁻)</span><span class="jd-bl">→</span></div>'+
    '<div class="jd-bx t"><span class="jd-bn">'+molTxt(t1)+' mol</span><span class="jd-bs">S₂O₃²⁻</span><span class="jd-bc">titrant z byrety</span></div>'+
  '</div>';
  h+='<p class="jd-bsum"><b>Závěr:</b> na každý 1&nbsp;mol '+an+' spotřebujete '+molTxt(t1)+'&nbsp;mol thiosíranu, tedy '+
     '<b>n('+an+') = n(S₂O₃²⁻)'+(t1===1?'':' / '+fmt(t1,2))+'</b>.'+
     ' <span style="color:var(--ink-2)">Například spotřeba 1,20&nbsp;mmol thiosíranu znamená '+fmt(1.2/t1,2)+'&nbsp;mmol '+an+' ve vzorku.</span></p>';
  h+='<details class="jd-more small"><summary>Rovnice obou kroků</summary><div class="jd-body"><p class="eq" style="font-size:.9rem">'+
     d.eqs.map(function(e){return '<span class="chem">'+e+'</span>';}).join("<br>")+'<br><span class="chem">I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻</span></p></div></details>';
  if(d.note) h+='<p style="color:var(--ink-2);margin:.8rem 0 0">'+d.note+'</p>';
  $("#chOut").innerHTML=h;
}
function initChain(){
  $("#chSel").innerHTML=CHAIN.map(function(d){ return '<button type="button" data-v="'+d.k+'" aria-pressed="'+(d.k===chK)+'">'+d.lab+'</button>'; }).join("");
  segBind("chSel",function(v){ chK=v; drawChain(); });
  drawChain();
}

/* ============================================================
   J8 · TŘÍDIČKA CHYB
   ============================================================ */
var ERRS = [
  {t:"Oxidace I⁻ vzdušným kyslíkem", d:"Roztok s KI stojí po okyselení dlouho na světle.", up:true,
   w:"<span class=\"chem\">4I⁻ + O₂ + 4H⁺ → 2I₂ + 2H₂O</span>. Vzniká „falešný“ jod navíc, spotřeba thiosíranu stoupne. Nejvíc v kyselém prostředí, urychluje ji světlo a ionty Cu²⁺ a Fe³⁺. <b>Prevence:</b> titrovat hned po okyselení, bez přímého světla, udělat slepý pokus."},
  {t:"Těkání jodu", d:"Titrace probíhá v otevřené baňce za tepla a s intenzivním mícháním.", up:false,
   w:"Jod uniká do vzduchu dřív, než ho stihne ztitrovat thiosíran. <b>Prevence:</b> baňka se zábrusem nebo přikrytá hodinovým sklem, nižší teplota, dost KI (jod vázaný na I₃⁻ tolik netěká), titrovat bez odkladu."},
  {t:"Neúplná reakce analytu s KI", d:"Po přidání KI se začne titrovat okamžitě, i když analyt reaguje pomalu.", up:false,
   w:"Uvolní se méně jodu, než odpovídá analytu. <b>Prevence:</b> dost času (někdy desítky minut, často v temnu), správné pH, nadbytek KI, případně katalyzátor (molybdenan u H₂O₂)."},
  {t:"Jod adsorbovaný na sraženině", d:"Při stanovení Cu²⁺ vzniká sraženina CuI, na jejímž povrchu část jodu ulpí.", up:false,
   w:"Adsorbovaný jod se neztitruje. <b>Prevence:</b> intenzivně míchat, ke konci přidat KSCN (<span class=\"chem\">CuI + SCN⁻ → CuSCN + I⁻</span>, CuSCN jod tolik neváže), škrob až ke konci."},
  {t:"Rozložený roztok thiosíranu", d:"Thiosíran se od poslední standardizace částečně rozložil (CO₂, bakterie).", up:true,
   w:"Počítáme s původní koncentrací, ale titrant je slabší. Na stejné množství jodu ho spotřebujeme víc, a proto vyjde víc analytu. <b>Prevence:</b> čerstvě standardizovaný roztok, správná příprava a uchovávání (převařená voda, Na₂CO₃, tmavá lahev)."},
  {t:"Nečistota IO₃⁻ v KI", d:"Použitý jodid draselný obsahuje stopy jodičnanu.", up:true,
   w:"V kyselém prostředí jodičnan uvolní jod navíc: <span class=\"chem\">IO₃⁻ + 5I⁻ + 6H⁺ → 3I₂ + 3H₂O</span>. <b>Prevence:</b> KI čistoty p.a. Test: okyselený roztok KI se škrobem nesmí zmodrat. Slepý pokus."}
];
var errAns = {};
function drawErrs(){
  $("#errBox").innerHTML=ERRS.map(function(e,i){
    var a=errAns[i], done=a!==undefined, right=done && a===e.up;
    return '<div class="jd-err'+(done?" done "+(right?"right":"wrong"):"")+'">'+
      '<h4>'+e.t+'</h4><p>'+e.d+'</p>'+
      '<div class="jd-btns">'+
        '<button class="btn btn-sm'+(done&&a===true?" btn-primary":"")+'" type="button" data-e="'+i+'" data-up="1"'+(done?" disabled":"")+'>Výsledek vyšší ↑</button>'+
        '<button class="btn btn-sm'+(done&&a===false?" btn-primary":"")+'" type="button" data-e="'+i+'" data-up="0"'+(done?" disabled":"")+'>Výsledek nižší ↓</button>'+
      '</div>'+
      '<div class="jd-why"><p><b style="color:var('+(right?"--ok":"--bad")+')">'+(right?"✓ Správně":"✕ Ne")+' — výsledek bude '+(e.up?"vyšší (kladná chyba)":"nižší (záporná chyba)")+'.</b></p><p style="margin-top:.35rem">'+e.w+'</p></div>'+
    '</div>';
  }).join("");
  var n=Object.keys(errAns).length, ok=Object.keys(errAns).filter(function(k){ return errAns[k]===ERRS[k].up; }).length;
  var sc=$("#errScore");
  if(n===0) msg(sc,"","Rozhodněte u každé chyby, kterým směrem posune výsledek.");
  else if(n<ERRS.length) msg(sc,"","Zatím "+ok+" z "+n+" správně. Zbývá "+(ERRS.length-n)+".");
  else msg(sc,ok===ERRS.length?"ok":"warn","Hotovo: <b>"+ok+" z "+ERRS.length+"</b> správně. "+(ok===ERRS.length?"Směr chyb máte v malíčku.":"Projděte si vysvětlení u červeně orámovaných karet.")+' <button class="btn btn-sm" type="button" data-err-again style="margin-left:.4rem">Znovu</button>');
  var ag=$("[data-err-again]"); if(ag) ag.addEventListener("click",function(){ errAns={}; drawErrs(); });
}
function initErrs(){
  $("#errBox").addEventListener("click",function(e){
    var b=e.target.closest ? e.target.closest("button[data-e]") : null;
    if(!b || b.disabled) return;
    errAns[+b.dataset.e]=b.dataset.up==="1"; drawErrs();
  });
  drawErrs();
}

/* ============================================================
   J9 · TERČ: SPRÁVNOST × PŘESNOST
   ============================================================ */
function drawTarget(){
  var cases=[
    {t:"správné a přesné", c:[0,0], r:5},
    {t:"přesné, nesprávné", c:[20,-16], r:5},
    {t:"správné, nepřesné", c:[0,0], r:24},
    {t:"ani správné, ani přesné", c:[16,14], r:24}
  ];
  var pts=[[0.3,0.5],[-0.6,0.2],[0.5,-0.7],[-0.2,-0.5],[0.8,0.4],[-0.7,-0.8]];
  var s='', narrow=$("#tgtWrap").clientWidth<520;
  cases.forEach(function(k,i){
    var cx=narrow?85+(i%2)*170:80+i*160, cy=narrow?70+Math.floor(i/2)*150:78;
    [52,38,24,10].forEach(function(r,j){ s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" style="fill:'+(j%2?"var(--surface)":"var(--surface-3)")+';stroke:var(--line-strong)"/>'; });
    s+='<circle cx="'+cx+'" cy="'+cy+'" r="3" style="fill:var(--ink-3)"/>';
    pts.forEach(function(p){ s+='<circle cx="'+(cx+k.c[0]+p[0]*k.r)+'" cy="'+(cy+k.c[1]+p[1]*k.r)+'" r="4.2" style="fill:var(--accent);stroke:var(--surface);stroke-width:1"/>'; });
    s+=txt(cx,cy+74,k.t,{anchor:"middle",size:narrow?14:12,w:600,fill:i===0?"var(--ok)":"var(--ink-2)"});
  });
  $("#tgtWrap").innerHTML=svg(narrow?"0 0 340 300":"0 0 640 164",s,'aria-label="Čtyři terče: správnost a přesnost"');
}

/* ============================================================
   J10 · STATISTIKA TŘÍ TITRACÍ
   ============================================================ */
function num(v){ var x=parseFloat(String(v).trim().replace(",",".").replace(/−/g,"-")); return isNaN(x)?null:x; }
function drawStats(){
  var v=["#st1","#st2","#st3"].map(function(id){ return num($(id).value); });
  if(v.some(function(x){return x===null;})){
    ro($("#stRo1"),"Průměr","—"); ro($("#stRo2"),"Směrodatná odchylka s","—"); ro($("#stRo3"),"RSD","—");
    msg($("#stMsg"),"warn","Zadejte tři čísla (desetinná čárka i tečka fungují)."); return;
  }
  var m=(v[0]+v[1]+v[2])/3;
  var sd=Math.sqrt(v.reduce(function(a,x){return a+(x-m)*(x-m);},0)/2);
  var rsd=m?sd/m*100:0;
  ro($("#stRo1"),"Průměr x̄",fx(m,3)+" ml");
  ro($("#stRo2"),"Směrodatná odchylka s",fx(sd,3)+" ml","s = √[Σ(x − x̄)² / (n − 1)]");
  ro($("#stRo3"),"RSD",fx(rsd,2)+" %","s / x̄ · 100 %");
  if(rsd<=0.5) msg($("#stMsg"),"ok","Titrace se shodují velmi dobře, měření je <b>přesné</b>. Jestli je i <b>správné</b>, statistika neřekne, na to je potřeba standard se známým obsahem.");
  else if(rsd<=2) msg($("#stMsg"),"warn","Rozptyl je znatelný. Zkontrolujte odečet byrety a posouzení barevného přechodu.");
  else msg($("#stMsg"),"bad","Hodnoty se liší hodně. Titraci zopakujte. Odlehlou hodnotu vyřaďte jen se zdůvodněním (statistický test).");
}
function initStats(){ ["#st1","#st2","#st3"].forEach(function(id){ $(id).addEventListener("input",drawStats); }); drawStats(); }

