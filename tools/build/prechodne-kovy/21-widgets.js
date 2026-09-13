/* ============================================================
   14 · k1 — MAPA OXIDAČNÍCH ČÍSEL
   ============================================================ */
var mxId="vse";
var ROMAN=["0","I","II","III","IV","V","VI","VII"];
function oxNum(r){ return ROMAN.indexOf(r); }
function drawMx(){
  var W=760, H=340, s='';
  s+=panelTitle("oxidační čísla prvků první přechodné řady");
  var ci=function(i){ return 90.5+i*69; };
  var ry=function(v){ return 76+(7-v)*30; };   /* v = 0 až 7 */
  RADA.forEach(function(e,i){
    s+=txt(ci(i),44,e.s,{anchor:"middle",size:13,w:700,fill:"var(--ink)"});
  });
  [7,6,5,4,3,2,1,0].forEach(function(v){
    s+=txt(44,ry(v)+4,ROMAN[v],{anchor:"end",size:11.5,w:600,mono:true,fill:"var(--ink-2)"});
    s+=line(56,ry(v),746,ry(v),{c:"var(--grid)",w:1,dash:"3 4"});
  });
  /* čárkovaná čára maxima podle čísla skupiny (platí do manganu) */
  var dd="";
  for(var g=0;g<5;g++){ dd+=(g?"L":"M")+ci(g)+" "+ry(g+3)+" "; }
  dd+="L"+ci(5)+" "+ry(8);
  s+='<path d="'+dd+'" style="fill:none;stroke:var(--exo);stroke-width:2;stroke-dasharray:6 5"/>';
  /* kotouče */
  RADA.forEach(function(e,i){
    e.ox.forEach(function(o){
      var st=o[1];
      if(mxId==="bezne" && st<2) return;
      if(mxId==="nej" && st<3) return;
      var r=5+st*3.4;
      s+=circ(ci(i),ry(oxNum(o[0])),r,{fill:"var(--accent)",stroke:"var(--paper)",sw:1.6,
             style:"fill-opacity:"+(0.35+0.2*st)});
    });
  });
  s+=txt(14,318,"Svislá osa = oxidační číslo · vodorovná osa = prvek řady 3d",{size:11,fill:"var(--ink-3)"});
  $("#mxWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Mapa oxidačních čísel první přechodné řady"');
  var lbl={vse:"všechny dosahované stavy",bezne:"jen běžné stavy",nej:"jen nejstálejší stavy"};
  ro("#mxRo1","nejvyšší číslo v řadě","VII","dosahuje ho mangan","pos");
  ro("#mxRo2","kde pravidlo přestává platit","za manganem","železo se zastaví u VI","neg");
  ro("#mxRo3","zobrazený výběr",lbl[mxId],"přepíná se tlačítky nahoře","");
}
function initMx(){
  $$("#mxSeg button").forEach(function(b){
    b.addEventListener("click",function(){ mxId=this.dataset.mx; segSet("#mxSeg",mxId,"mx"); drawMx(); });
  });
  drawMx();
}

/* ============================================================
   15 · k1 — PROHLEDÁVATELNÁ TABULKA SLOUČENIN
   ============================================================ */
var PRVKY=[];
function initTs(){
  var seen={};
  SLOUC.forEach(function(c){ if(!seen[c.p]){ seen[c.p]=1; PRVKY.push({v:c.p,t:c.p}); } });
  PRVKY.unshift({v:"",t:"všechny prvky"});
  fillSel("#tsP",PRVKY,"v","t","");
  $("#tsQ").addEventListener("input",drawTs);
  $("#tsP").addEventListener("change",drawTs);
  $("#tsK").addEventListener("change",drawTs);
  drawTs();
}
function drawTs(){
  var q=($("#tsQ").value||"").trim().toLowerCase();
  var p=$("#tsP").value, k=$("#tsK").value;
  var rows=SLOUC.filter(function(c){
    if(p && c.p!==p) return false;
    if(k && c.k!==k) return false;
    if(!q) return true;
    return (c.v+" "+c.nm+" "+c.vz+" "+c.u+" "+c.p).toLowerCase().indexOf(q)>=0;
  });
  $("#tsBody").innerHTML = rows.length ? rows.map(function(c){
    return '<tr><td><span class="chem"><b>'+c.v+'</b></span></td><td>'+c.nm+'</td>'+
      '<td class="n">'+(c.o===0?"0":ROMAN[c.o])+'</td><td>'+c.vz+'</td><td>'+c.u+'</td></tr>';
  }).join("") : '<tr><td colspan="5">Nic takového tu není — zkuste jiný výraz.</td></tr>';
  $("#tsInfo").textContent = rows.length
    ? "Zobrazeno: "+(p?("prvek "+p):"všechny prvky")+(k?", vybraný typ sloučeniny":"")+(q?", hledaný výraz „"+q+"“":"")
    : "Zkuste hledat například „pigment“, „katalyzátor“ nebo vzorec.";
}

/* ============================================================
   16 · k2 — OD ROZŠTĚPENÍ K BARVĚ
   ============================================================ */
function pasmo(lam){
  for(var i=0;i<SPEKTRUM.length;i++){ if(lam>=SPEKTRUM[i].od && lam<SPEKTRUM[i].do) return SPEKTRUM[i]; }
  return null;
}
function drawBv(){
  var D=+$("#bvD").value, sel=$("#bvSel").value, W=760, H=330, s='';
  var kx = (sel==="vlastni") ? null : pickBy(KOMPLEXY,"id",sel);
  var lam=1e7/D, en=0.011963*D, band=pasmo(lam);
  $("#bvDv").textContent=fmt(D,0).replace(/\s/g," ")+" cm⁻¹";
  s+=panelTitle(kx ? kx.nm+" · pás při "+fmt(D,0)+" cm⁻¹" : "vlastní hodnota vlnočtu");

  /* --- levý sloupec: rozštěpení --- */
  s+=capt(14,52,"rozštěpení hladin d");
  var h=40+(D-11000)/18000*90;
  var yB=170, yE=yB-0.6*h, yT=yB+0.4*h;
  s+=line(60,yB,200,yB,{c:"var(--line)",w:1,dash:"4 4"});
  s+=line(95,yE,185,yE,{c:"var(--endo)",w:2.6,cap:"round"});
  s+=line(95,yT,185,yT,{c:"var(--exo)",w:2.6,cap:"round"});
  s+=txt(192,yE+4,"e_g",{size:12,w:700,fill:"var(--endo)"});
  s+=txt(192,yT+4,"t₂g",{size:12,w:700,fill:"var(--exo)"});
  s+=vArrow(75,yE,yT,"var(--accent)","Δ","left");
  if(kx){
    var occ=hund(kx.nd,5);
    [0,1,2].forEach(function(j){ if(occ[j]>0) s+=circ(110+j*30,yT-9,4.4,{fill:"var(--exo)"}); });
    [0,1,2].forEach(function(j){ if(occ[j]>1) s+=circ(110+j*30,yT-20,4.4,{fill:"var(--exo)",style:"fill-opacity:.5"}); });
    [3,4].forEach(function(j,m){ if(occ[j]>0) s+=circ(125+m*30,yE-9,4.4,{fill:"var(--endo)"}); });
    [3,4].forEach(function(j,m){ if(occ[j]>1) s+=circ(125+m*30,yE-20,4.4,{fill:"var(--endo)",style:"fill-opacity:.5"}); });
    s+=txt(14,262,"konfigurace = "+kx.d,{size:12,w:600,fill:"var(--ink)"});
    s+=txt(14,286,"ligand = "+kx.lig,{size:11.5,fill:"var(--ink-3)"});
  } else {
    s+=txt(14,262,"konfigurace = neurčena",{size:12,w:600,fill:"var(--ink-3)"});
    s+=txt(14,286,"posuvník mění jen energii přechodu",{size:11.5,fill:"var(--ink-3)"});
  }

  /* --- pravý sloupec: spektrum --- */
  s+=capt(300,52,"pohlcené světlo");
  var X=function(l){ return 300+(Math.max(380,Math.min(780,l))-380)/400*440; };
  SPEKTRUM.forEach(function(b){
    s+=rect(X(b.od),70,X(b.do)-X(b.od),36,{fill:b.hex,style:"fill-opacity:.72"});
  });
  s+=rect(300,70,440,36,{fill:"none",stroke:"var(--line-strong)",sw:1.2,r:3});
  [400,500,600,700].forEach(function(l){
    s+=line(X(l),106,X(l),112,{c:"var(--line-strong)",w:1});
    s+=txt(X(l),124,String(l),{anchor:"middle",size:10.5,mono:true,fill:"var(--ink-3)"});
  });
  var xm=X(lam);
  s+='<path d="M'+xm+' 68 l-6 -10 l12 0 z" style="fill:var(--accent)"/>';
  s+=line(xm,70,xm,106,{c:"var(--accent)",w:2});
  var mimo = (lam<380 || lam>780);
  s+=txt(300,152,"vlnová délka = "+fmt(lam,0)+" nm",{size:12.5,w:600,fill:"var(--ink)"});
  s+=txt(300,176,"pohlcená barva = "+(band?band.poh:(lam>780?"infračervená oblast":"ultrafialová oblast")),
        {size:12,fill:"var(--ink-2)"});
  s+=txt(300,200,"pozorovaná barva = "+(band?band.doP:"látka je bezbarvá"),{size:12,w:600,fill:"var(--accent)"});
  s+=circ(316,240,18,{fill:band?band.hex:"var(--surface-3)",stroke:"var(--line-strong)",sw:1.3,style:"fill-opacity:.8"});
  s+=circ(486,240,18,{fill:kx?kx.hex:"var(--surface-3)",stroke:"var(--line-strong)",sw:1.3,style:"fill-opacity:.8"});
  s+=txt(316,274,"pohlcená",{anchor:"middle",size:11,fill:"var(--ink-3)"});
  s+=txt(486,274,kx?"skutečná":"neurčena",{anchor:"middle",size:11,fill:"var(--ink-3)"});
  s+=txt(300,304,"energie přechodu = "+fmt(en,0)+" kJ·mol⁻¹",{size:12,w:600,fill:"var(--ink)"});

  $("#bvWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Vztah rozštěpení hladin d a barvy roztoku"');
  ro("#bvRo1","vlnočet pásu",fmt(D,0)+" cm⁻¹","poloha maxima absorpce","");
  ro("#bvRo2","vlnová délka",fmt(lam,0)+" nm", mimo?"mimo viditelnou oblast":"uvnitř viditelné oblasti", mimo?"neg":"pos");
  ro("#bvRo3","energie přechodu",fmt(en,0)+" kJ·mol⁻¹","na jeden mol elektronů","");
  $("#bvList").innerHTML = kx
    ? '<div class="callout def" style="margin:0"><span class="eyebrow">'+kx.nm+' · pozorovaná barva = '+kx.poz+'</span><p>'+kx.pop+'</p></div>'
    : '<div class="callout '+(mimo?"warn":"tip")+'" style="margin:0"><span class="eyebrow">'+(mimo?"Mimo viditelnou oblast":"Uvnitř viditelné oblasti")+'</span><p>'+
      (mimo ? "Při tomto vlnočtu padne přechod mimo viditelné světlo, takže se z procházejícího svazku nic neubere a látka vypadá bezbarvě. Přesně to je důvod, proč jsou komplexy s velmi slabým i s velmi silným polem často bledé."
            : "Pás leží ve viditelné oblasti, takže se z bílého světla odebere právě tahle barva a projde její doplněk. Zkuste posuvníkem přejet celé spektrum a sledujte, jak se pozorovaná barva otáčí.")+'</p></div>';
}
function initBv(){
  var opts=KOMPLEXY.map(function(k){ return {v:k.id,t:k.nm}; });
  opts.push({v:"vlastni",t:"vlastní hodnota z posuvníku"});
  fillSel("#bvSel",opts,"v","t","ti");
  $("#bvSel").addEventListener("change",function(){
    var v=this.value;
    if(v!=="vlastni"){ $("#bvD").value=String(pickBy(KOMPLEXY,"id",v).D); }
    drawBv();
  });
  $("#bvD").addEventListener("input",function(){ $("#bvSel").value="vlastni"; drawBv(); });
  $("#bvD").value=String(KOMPLEXY[0].D);
  drawBv();
}

/* ============================================================
   17 · k2 — NEPÁROVÉ ELEKTRONY A MAGNETICKÝ MOMENT
   ============================================================ */
var mgPole="slabe";
function lowSpin(n){
  var a=[0,0,0,0,0], ord=[0,1,2,0,1,2,3,4,3,4];
  for(var i=0;i<n;i++) a[ord[i]]++;
  return a;
}
function drawMg(){
  var ion=pickBy(MAGN,"id",$("#mgSel").value), W=760, H=300, s='';
  var occ = (mgPole==="silne") ? lowSpin(ion.d) : hund(ion.d,5);
  var nep=0; occ.forEach(function(v){ if(v===1) nep++; });
  var mu=Math.sqrt(nep*(nep+2));
  var stejne = (ion.d<=3 || ion.d>=8);
  s+=panelTitle(ion.nm+" · konfigurace d"+ion.d);

  s+=capt(14,52,"rozmístění elektronů");
  s+=txt(20,90,"ion = "+ion.nm,{size:12.5,w:600,fill:"var(--ink)"});
  s+=txt(20,114,"konfigurace = d"+ion.d,{size:12,fill:"var(--ink-2)"});
  s+=txt(20,138,"nepárových elektronů = "+nep,{size:12,w:600,fill:"var(--accent)"});
  s+=txt(20,162,"spinový stav = "+(stejne?"jednoznačný":(mgPole==="silne"?"nízkospinový":"vysokospinový")),
        {size:11.5,fill:"var(--ink-3)"});
  s+=txt(20,186,"chování = "+(nep>0?"paramagnetické":"diamagnetické"),{size:11.5,fill:"var(--ink-3)"});

  /* orbitalová políčka */
  var bw=36,bh=34;
  function box(x,y,k,col){
    var t=rect(x,y,bw,bh,{fill:"var(--surface-2)",r:5,stroke:"var(--line-strong)",sw:1.2});
    if(k>=1) t+=spin(x+(k>=2?12:18), y+17, true, col);
    if(k>=2) t+=spin(x+24, y+17, false, col);
    return t;
  }
  s+=box(300,70,occ[3],"var(--endo)");
  s+=box(344,70,occ[4],"var(--endo)");
  s+=box(256,170,occ[0],"var(--exo)");
  s+=box(300,170,occ[1],"var(--exo)");
  s+=box(344,170,occ[2],"var(--exo)");
  s+=txt(392,94,"e_g",{size:12.5,w:700,fill:"var(--endo)"});
  s+=txt(392,194,"t₂g",{size:12.5,w:700,fill:"var(--exo)"});
  s+=vArrow(230,88,188,"var(--accent)","Δ","left");

  s+=txt(20,240,"μ = √("+nep+"·("+nep+"+2)) = "+fmt(mu,2)+" μB",{size:12.5,w:600,fill:"var(--ink)"});
  s+=capt(440,236,"spinový moment [μB]");
  s+=rect(440,248,Math.max(3,mu/6*280),20,{fill:"var(--accent)",r:5,style:"fill-opacity:.7"});
  s+=rect(440,248,280,20,{fill:"none",stroke:"var(--line)",sw:1,r:5});
  s+=txt(440,286,"naměřená hodnota bývá o něco vyšší (dráhový příspěvek)",{size:10.5,fill:"var(--ink-3)"});

  $("#mgWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Nepárové elektrony a spinový magnetický moment"');
  ro("#mgRo1","počet nepárových elektronů",String(nep),"po rozmístění do pětice orbitalů","");
  ro("#mgRo2","spinový moment",fmt(mu,2)+" μB","ze vzorce √(n(n+2))", nep>0?"pos":"neg");
  ro("#mgRo3","magnetické chování",nep>0?"paramagnetické":"diamagnetické", nep>0?"pole látku vtahuje":"pole látku slabě odpuzuje", nep>0?"pos":"neg");
  $("#mgVerd").innerHTML = stejne
    ? "U konfigurace <b>d"+ion.d+"</b> vyjde rozmístění stejně ve slabém i v silném poli — volba mezi vysokospinovým a nízkospinovým uspořádáním vzniká jen u&nbsp;d⁴ až d⁷. "+ion.pop
    : (mgPole==="silne"
       ? "V <b>silném poli</b> je rozštěpení Δ větší než energie potřebná na spárování, takže se elektrony natlačí do dolní trojice. Vzniká <b>nízkospinový</b> komplex — takhle se chová například kyanidový ligand. "+ion.pop
       : "Ve <b>slabém poli</b> je levnější obsadit i horní dvojici než párovat elektrony. Vzniká <b>vysokospinový</b> komplex — tak se chová fluorid nebo voda. "+ion.pop);
}
function initMg(){
  fillSel("#mgSel",MAGN.map(function(m){ return {v:m.id,t:m.nm+" (d"+m.d+")"}; }),"v","t","fe3");
  $("#mgSel").addEventListener("change",drawMg);
  $$("#mgSeg button").forEach(function(b){
    b.addEventListener("click",function(){ mgPole=this.dataset.mg; segSet("#mgSeg",mgPole,"mg"); drawMg(); });
  });
  drawMg();
}
