/* ============================================================
   24 · k8 — KOROZNÍ ČLÁNEK A OCHRANA
   ============================================================ */
function drawKoroze(){
  var c=KO_($("#koSel").value), W=760, H=300, s='';
  s+=panelTitle("korozní článek · "+c.nm);
  var mx=70, my=176, mw=W-160, mh=58;
  /* povlak nebo vrstva */
  var povlak=null;
  if(c.id==="zn") povlak={nm:"vrstva zinku",col:"var(--endo)"};
  if(c.id==="sn") povlak={nm:"vrstva cínu",col:"var(--exo)"};
  if(c.id==="nater") povlak={nm:"nátěr",col:"var(--cat1)"};
  if(c.id==="pas") povlak={nm:"pasivní vrstva Al₂O₃ / Cr₂O₃",col:"var(--ok)"};
  /* kov */
  s+=rect(mx,my,mw,mh,{fill:"var(--surface-3)",r:4,stroke:"var(--line-strong)",sw:1.4});
  s+=txt(mx+mw-8,my+34,c.id==="pas"?"hliník nebo nerezavějící ocel":"ocelový plech",{anchor:"end",size:12,w:700,fill:"var(--ink-2)"});
  if(povlak){
    s+=rect(mx,my-11,mw,11,{fill:povlak.col,r:2,style:"fill-opacity:.85"});
    s+=txt(mx+mw-4,my-16,povlak.nm,{anchor:"end",size:10.5,w:600,fill:povlak.col});
    /* rýha */
    if(c.id==="zn"||c.id==="sn"||c.id==="nater"){
      s+='<path d="M'+(mx+mw*0.42)+' '+(my-11)+' l10 11 l10 -11 z" style="fill:var(--paper)"/>';
      s+=txt(mx+mw*0.42+10,my-16,"rýha",{anchor:"middle",size:10,w:700,fill:"var(--bad)"});
    }
  }
  /* kapka elektrolytu */
  var dx=mx+mw*0.42+10, dr=64;
  s+='<path d="M'+(dx-dr)+' '+my+' a'+dr+' '+(dr*0.72)+' 0 0 1 '+(2*dr)+' 0 z" style="fill:var(--accent);fill-opacity:.14;stroke:var(--accent);stroke-width:1.2"/>';
  s+=txt(dx,my-52,"kapka vody s rozpuštěným O₂",{anchor:"middle",size:10.5,w:600,fill:"var(--accent)"});
  if(c.id==="bez"||c.id==="sn"){
    s+=txt(dx,my+14,"ANODA",{anchor:"middle",size:11,w:700,fill:"var(--exo)"});
    s+=txt(dx-dr+14,my-8,"KATODA",{anchor:"middle",size:10.5,w:700,fill:"var(--endo)"});
    s+=txt(dx+dr-14,my-8,"KATODA",{anchor:"middle",size:10.5,w:700,fill:"var(--endo)"});
    s+=hArrow(dx-8,dx-dr+22,my+40,"var(--accent)","e⁻",false);
    s+=hArrow(dx+8,dx+dr-22,my+40,"var(--accent)","e⁻",false);
    /* rez */
    for(var i=0;i<7;i++) s+=circ(dx-24+i*8,my-6+((i%2)?3:0),3.4,{fill:"var(--bad)",style:"fill-opacity:.8"});
    s+=txt(dx,my+52,c.id==="sn"?"železo v rýze je anodou → koroduje RYCHLEJI než bez povlaku":"železo se rozpouští → vzniká rez",{anchor:"middle",size:11.5,w:700,fill:"var(--bad)"});
  } else if(c.id==="zn"){
    s+=txt(dx,my-2,"katoda (chráněno)",{anchor:"middle",size:10.5,w:700,fill:"var(--endo)"});
    s+=txt(mx+mw*0.16,my-24,"ANODA — zinek se obětuje",{size:11,w:700,fill:"var(--exo)"});
    s+=hArrow(mx+mw*0.30,dx-14,my+30,"var(--accent)","e⁻ ze zinku do železa",false);
    s+=txt(dx,my+52,"železo je katodou a nekoroduje ani v rýze",{anchor:"middle",size:11.5,w:700,fill:"var(--ok)"});
  } else if(c.id==="mg"||c.id==="proud"){
    var ax=mx+40;
    if(c.id==="mg"){
      s+=rect(ax-24,my-72,52,44,{fill:"var(--exo)",r:6,style:"fill-opacity:.8"});
      s+=txt(ax+2,my-46,"Mg",{anchor:"middle",size:14,w:700,fill:"var(--ink)"});
      s+=txt(ax+2,my-80,"obětovaná anoda",{anchor:"middle",size:10.5,w:700,fill:"var(--exo)"});
      s+=line(ax+2,my-28,ax+2,my,{c:"var(--line-strong)",w:2});
    } else {
      s+=rect(ax-30,my-78,64,30,{fill:"var(--surface-3)",r:6,stroke:"var(--line-strong)",sw:1.2});
      s+=txt(ax+2,my-58,"zdroj",{anchor:"middle",size:11,w:700,fill:"var(--ink)"});
      s+=txt(ax-34,my-40,"(−)",{size:11,w:700,fill:"var(--endo)"});
      s+=txt(ax+40,my-40,"(+)",{size:11,w:700,fill:"var(--exo)"});
      s+=line(ax-24,my-48,ax-24,my,{c:"var(--endo)",w:2});
      s+=line(ax+34,my-48,ax+34,my-20,{c:"var(--exo)",w:2});
      s+=rect(ax+22,my-20,24,16,{fill:"var(--exo)",r:3,style:"fill-opacity:.6"});
      s+=txt(ax+34,my-24,"pomocná anoda",{anchor:"middle",size:9.5,fill:"var(--exo)"});
    }
    s+=hArrow(mx+90,dx,my+30,"var(--accent)","elektrony trvale přitékají do konstrukce",false);
    s+=txt(dx,my+52,"konstrukce je katodou — její oxidace nemůže proběhnout",{anchor:"middle",size:11.5,w:700,fill:"var(--ok)"});
  } else if(c.id==="nater"){
    s+=txt(dx,my+52,"dokud je vrstva celá, elektrolyt se ke kovu nedostane",{anchor:"middle",size:11.5,w:700,fill:"var(--ok)"});
    s+=txt(dx,my+18,"po poškození ale koroze běží normálně",{anchor:"middle",size:10.5,fill:"var(--warn)"});
  } else if(c.id==="pas"){
    s+=txt(dx,my+52,"souvislá a přilnavá vrstva oxidu — děj se sám zastaví",{anchor:"middle",size:11.5,w:700,fill:"var(--ok)"});
    s+=txt(dx,my+18,"a po poškrábání se během okamžiku obnoví",{anchor:"middle",size:10.5,fill:"var(--ok)"});
  }
  /* verdikt */
  s+=rect(mx,26,mw,34,{fill:c.ok?"var(--ok)":"var(--bad)",r:7,style:"fill-opacity:.16"});
  s+=circ(mx+22,43,9,{fill:c.ok?"var(--ok)":"var(--bad)"});
  s+=txt(mx+22,47,c.ok?"✓":"✕",{anchor:"middle",size:12,w:700,fill:"var(--paper)"});
  s+=txt(mx+42,48,c.verd,{size:13,w:700,fill:c.ok?"var(--ok)":"var(--bad)"});
  $("#koWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Korozní článek: '+c.nm+'"');
  $("#koAn").innerHTML='<b>anodický děj:</b> <span class="chem">'+c.an+'</span>';
  $("#koKat").innerHTML='<b>katodický děj:</b> <span class="chem">'+c.kat+'</span>';
  $("#koTot").innerHTML='<b>souhrnně:</b> <span class="chem">'+c.tot+'</span>';
  $("#koText").innerHTML='<div class="callout '+(c.ok?"def":"warn")+'" style="margin:0"><span class="eyebrow">'+c.nm+'</span><p>'+c.d+'</p></div>';
  ro("#koFx","co je na tom podstatné",c.ok?"chrání":"nechrání",c.fx,c.ok?"pos":"neg");
  $("#koNote").innerHTML = (c.id==="sn")
    ? "Tohle je nejčastější chyták celého okruhu. Pocínování je <b>výborná bariéra</b>, dokud je vrstva celá — proto se používá na konzervy. Jakmile se ale poškrábe, udělá z&nbsp;železa anodu a&nbsp;koroze je <b>rychlejší</b> než u&nbsp;holého plechu."
    : "Porovnejte pozinkování a&nbsp;pocínování — to je nejčastější otázka u&nbsp;maturity. Pak se podívejte na obětovanou anodu a&nbsp;na katodickou ochranu vnějším zdrojem: obojí dělá totéž, jen jednou to platí hořčík a&nbsp;podruhé elektrárna.";
}
function initKoroze(){
  $("#koSel").innerHTML=KOR.map(function(c){ return '<option value="'+c.id+'">'+c.nm+'</option>'; }).join("");
  $("#koSel").addEventListener("change",drawKoroze);
  drawKoroze();
}

/* ============================================================
   25 · k8 — TRENAŽÉR OCHRANY PROTI KOROZI
   ============================================================ */
var ocI=0, ocScore=0, ocDone=false;
function drawOchr(){
  var it=OCHR[ocI];
  $("#ocQn").textContent=ocI+1; $("#ocQtot").textContent=OCHR.length; $("#ocScore").textContent=ocScore;
  $("#ocTask").innerHTML=it.q;
  $("#ocOpts").innerHTML=it.o.map(function(o,i){
    return '<button class="btn" type="button" data-oi="'+i+'" style="white-space:normal;line-height:1.35;text-align:left;justify-content:flex-start;height:auto;padding:.7rem .9rem">'+o+'</button>';
  }).join("");
  var ex=$("#ocExplain"); ex.style.display="none"; ex.className="explain";
  $("#ocNext").disabled=true; ocDone=false;
  $$("#ocOpts button").forEach(function(b){
    b.addEventListener("click",function(){
      if(ocDone) return; ocDone=true;
      var ok=+b.dataset.oi===it.c; if(ok) ocScore++;
      $("#ocScore").textContent=ocScore;
      ex.style.display="flex"; ex.style.background=ok?"var(--ok-soft)":"var(--bad-soft)"; ex.style.borderColor=ok?"var(--ok)":"var(--bad)";
      ex.innerHTML='<span class="verdict" style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+(ok?"✓ Správně":"✕ Špatně — správně: "+it.o[it.c])+'</span><span class="eyebrow">Proč</span><div>'+it.e+'</div>';
      $$("#ocOpts button").forEach(function(x){ x.disabled=true; x.style.opacity=(+x.dataset.oi===it.c)?"1":".45"; if(+x.dataset.oi===it.c){ x.style.borderColor="var(--ok)"; x.style.color="var(--ok)"; } });
      $("#ocNext").disabled = ocI>=OCHR.length-1;
      if(ocI>=OCHR.length-1){
        toast("Trenažér dokončen: "+ocScore+" z "+OCHR.length+" správně.");
        if(ocScore>=9) markDone("k8");
      }
    });
  });
}
function initOchr(){
  $("#ocNext").addEventListener("click",function(){ if(ocI<OCHR.length-1){ ocI++; drawOchr(); } });
  $("#ocReset").addEventListener("click",function(){ ocI=0; ocScore=0; drawOchr(); });
  drawOchr();
}

/* ============================================================
   26 · RYCHLOKURZ — TŘI MINI‑GRAFY
   ============================================================ */
/* (A) pásová struktura ve zkratce */
function drawMiniPasy(){
  var W=760,H=190,s='';
  s+=txt(14,18,"VODIČ · POLOVODIČ · IZOLANT — ROZHODUJE ŠÍŘKA ZAKÁZANÉHO PÁSU",{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  var box=[["Kov","Eg = 0 eV","pásy se překrývají",0,"var(--accent)"],
           ["Polovodič","Eg ≈ 1 eV","úzká mezera",52,"var(--exo)"],
           ["Izolant","Eg > 3 eV","široká mezera",100,"var(--endo)"]];
  box.forEach(function(b,i){
    var x=30+i*248, w=200, top=44, bot=H-42, gapH=b[3];
    s+=txt(x+w/2,top-6,b[0],{anchor:"middle",size:13,w:700,fill:b[4]});
    var mid=(top+bot)/2;
    var vTop = gapH ? mid+gapH/2 : mid+12;
    var cBot = gapH ? mid-gapH/2 : mid-12;
    s+=rect(x,vTop,w,bot-vTop,{fill:"var(--endo)",r:5,style:"fill-opacity:.5"});
    s+=rect(x,top,w,cBot-top,{fill:"var(--exo)",r:5,style:"fill-opacity:.28"});
    if(gapH){
      s+=txt(x+w/2,mid+4,b[1],{anchor:"middle",size:11.5,w:700,fill:"var(--ink-2)"});
    } else {
      s+=txt(x+w/2,mid+4,b[1],{anchor:"middle",size:11.5,w:700,fill:"var(--accent)"});
    }
    s+=txt(x+w/2,bot+18,b[2],{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  });
  $("#miniPasWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Srovnání pásové struktury vodiče, polovodiče a izolantu"');
}

/* (B) tři mřížky ve zkratce */
function drawMiniMriz(){
  var W=760,H=180,s='';
  s+=txt(14,18,"TŘI MŘÍŽKY KOVŮ — KOORDINAČNÍ ČÍSLO A ZAPLNĚNÍ PROSTORU",{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  var data=[["kpc","Plošně centrovaná",12,4,74.05,"Al, Cu, Ag, Au, γ‑Fe"],
            ["hex","Hexagonální nejtěsnější",12,6,74.05,"Mg, Zn, Cd, Ti, Co"],
            ["kpr","Prostorově centrovaná",8,2,68.02,"Li, Na, K, Cr, W, α‑Fe"]];
  data.forEach(function(d,i){
    var x=24+i*246, w=214, y=40, h=112;
    s+=rect(x,y,w,h,{fill:"var(--surface-2)",r:9});
    s+=txt(x+12,y+22,d[1],{size:12,w:700,fill:"var(--ink)"});
    s+=txt(x+12,y+46,"koordinační číslo = "+d[2],{size:11,fill:"var(--ink-2)"});
    s+=txt(x+12,y+64,"atomů v buňce = "+d[3],{size:11,fill:"var(--ink-2)"});
    s+=txt(x+12,y+82,"zaplnění = "+fmt(d[4],2)+" %",{size:11.5,w:700,fill:d[4]>70?"var(--accent)":"var(--warn)"});
    s+=txt(x+12,y+102,d[5],{size:10,fill:"var(--ink-3)"});
    s+=rect(x+w-16,y+12,6,h-24,{fill:d[4]>70?"var(--accent)":"var(--warn)",r:3,style:"fill-opacity:.35"});
    s+=rect(x+w-16,y+12+(h-24)*(1-d[4]/100),6,(h-24)*d[4]/100,{fill:d[4]>70?"var(--accent)":"var(--warn)",r:3});
  });
  $("#miniMrizWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Srovnání tří krystalových mřížek kovů"');
}

/* (C) tři cesty ke kovu podle ušlechtilosti */
function drawMiniCesty(){
  var W=760,H=200,s='';
  s+=txt(14,18,"METODA VÝROBY PODLE STANDARDNÍHO POTENCIÁLU E° [V]",{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  var x0=54, gw=W-108, y=104, EMIN=-3.0, EMAX=1.6;
  function X(e){ return x0+(e-EMIN)/(EMAX-EMIN)*gw; }
  var zones=[[-3.0,-2.0,"tavná elektrolýza","var(--endo)"],[-2.0,-1.0,"metalotermie nebo elektrolýza","var(--cat1)"],
             [-1.0,0,"redukce uhlíkem nebo vodíkem","var(--exo)"],[0,1.6,"pražení, tepelný rozklad","var(--cat4)"]];
  zones.forEach(function(z,zi){
    s+=rect(X(z[0]),y-48,X(z[1])-X(z[0]),44,{fill:z[3],r:6,style:"fill-opacity:.3"});
    s+=txt((X(z[0])+X(z[1]))/2,y-(zi%2?36:14),z[2],{anchor:"middle",size:10.5,w:700,fill:"var(--ink)"});
  });
  s+=line(x0,y,x0+gw,y,{c:"var(--line-strong)",w:1.4});
  var mk=[["K",-2.93],["Na",-2.71],["Mg",-2.37],["Al",-1.66],["Ti",-1.63],["Zn",-0.76],["Cr",-0.74],["Fe",-0.44],["Ni",-0.26],["Sn",-0.14],["Cu",0.34],["Ag",0.80],["Hg",0.85],["Au",1.50]];
  mk.forEach(function(m,i){
    s+=circ(X(m[1]),y,5,{fill:"var(--ink-2)",stroke:"var(--paper)",sw:1.4});
    s+=txt(X(m[1]),y+(i%2?20:38),m[0],{anchor:"middle",size:11,w:700,fill:"var(--ink)"});
    s+=line(X(m[1]),y+5,X(m[1]),y+(i%2?10:28),{c:"var(--line)",w:1});
  });
  for(var e=-3;e<=1.5;e+=0.5){ s+=txt(X(e),y-56,fmt(e,1),{anchor:"middle",size:9,mono:true,fill:"var(--ink-3)"}); }
  s+=txt(x0,H-10,"vlevo = neušlechtilé, drahá výroba",{size:10.5,w:600,fill:"var(--endo)"});
  s+=txt(x0+gw,H-10,"vpravo = ušlechtilé, levná výroba",{anchor:"end",size:10.5,w:600,fill:"var(--exo)"});
  $("#miniCestyWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Metoda výroby kovu podle standardního potenciálu"');
}
