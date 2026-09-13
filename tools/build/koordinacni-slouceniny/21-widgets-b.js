/* ============================================================
   8 · KAPITOLA 2 — SKLÁDAČKA NÁZVU
   ============================================================ */
var nbCen = [
 {s:"Cr", ox:3}, {s:"Fe", ox:2}, {s:"Fe", ox:3}, {s:"Co", ox:3},
 {s:"Ni", ox:2}, {s:"Cu", ox:2}, {s:"Zn", ox:2}, {s:"Pt", ox:2}, {s:"Pt", ox:4}
];
var nbState = {ci:3, kc:6, nA:4, a:"NH3", b:"Cl"};
function nbCenObj(){ var c=nbCen[nbState.ci]; return cenGet(c.s,c.ox); }
function nbPolozky(){
  var A=ligById(nbState.a), B=ligById(nbState.b), out=[];
  var nA=Math.min(nbState.nA,nbState.kc), nB=nbState.kc-nA;
  if(nA>0) out.push({lig:A,n:nA});
  if(nB>0) out.push({lig:B,n:nB});
  return out;
}
function nbGeo(){ return nbState.kc===6 ? "okt" : "tet"; }
function nbDraw(){
  var cen=nbCenObj(), pol=nbPolozky();
  var A=ligById(nbState.a), B=ligById(nbState.b);
  var nA=Math.min(nbState.nA,nbState.kc), nB=nbState.kc-nA;
  var W=520,H=380,cx=260,cy=188,R=118,s="";
  s+=rect(6,6,W-12,H-12,{fill:"var(--surface-2)",r:14,stroke:"var(--line)",sw:1.2});
  var v=polyBody(nbGeo());
  v.forEach(function(p){
    var x=cx+p.x*R, y=cy+p.y*R;
    if(p.st==="wedge"){
      var dx=x-cx, dy=y-cy, L=Math.sqrt(dx*dx+dy*dy), nx=-dy/L*5.5, ny=dx/L*5.5;
      s+='<path d="M'+cx+' '+cy+' L'+(x+nx).toFixed(1)+' '+(y+ny).toFixed(1)+
         ' L'+(x-nx).toFixed(1)+' '+(y-ny).toFixed(1)+' z" style="fill:var(--line-strong)"/>';
    } else s+=line(cx,cy,x,y,{c:"var(--line-strong)",w:p.st==="dash"?1.6:2.2,dash:p.st==="dash"?"5 4":null});
  });
  v.forEach(function(p,i){
    var jeA = i<nA;
    var lab = jadroLigandu(jeA?A:B);
    s+=atom(cx+p.x*R, cy+p.y*R, 15+Math.min(15,lab.length*3.0), lab,
            jeA?"var(--cat2)":"var(--cat4)","var(--ink)", lab.length>4?11:12.5);
  });
  s+=atom(cx,cy,24,cen.s,"var(--accent)","var(--accent-ink)",16);
  s+=zavorky(30,28,W-44,H-58,nabojSup(nabojKomplexu(cen,pol)));
  s+=txt(W/2,H-24,(nbState.kc===6?"oktaedr":"tetraedr")+" · koordinační číslo = "+nbState.kc,
        {anchor:"middle",size:12.5,w:600,fill:"var(--ink-3)"});
  $("#nbWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Skládačka názvu — geometrie komplexu"');

  /* postup krok za krokem */
  var setr=pol.slice().sort(function(x,y){ return x.lig.nm.localeCompare(y.lig.nm,"cs"); });
  var q=nabojKomplexu(cen,pol);
  function krok(n,nadpis,telo){
    return '<div class="step"><span class="step-n">'+n+'</span><div class="step-b">'+
           '<p class="eyebrow" style="color:var(--accent)">'+nadpis+'</p>'+telo+'</div></div>';
  }
  var kroky="";
  kroky+=krok(1,"Seřaďte ligandy abecedně podle názvu",'<p class="eq">'+
         setr.map(function(p){return p.lig.nm;}).join("  →  ")+'</p>');
  kroky+=krok(2,"Doplňte násobící předpony",'<p class="eq">'+
         setr.map(function(p){return "<b>"+nazevLigandu(p)+"</b>";}).join("  ·  ")+'</p>');
  kroky+=krok(3,"Spočítejte náboj komplexní částice",'<p class="eq">'+
         "ox. číslo "+cen.s+" ("+(cen.ox>0?"+":"")+cen.ox+")"+
         setr.map(function(p){ return " + "+p.n+"×("+(p.lig.q>0?"+":"")+p.lig.q+")"; }).join("")+
         " = <b>"+(q>0?"+":(q<0?"−":""))+Math.abs(q)+"</b></p>");
  kroky+=krok(4,"Zvolte tvar názvu podle znaménka náboje",'<p>'+
         (q>0 ? "Náboj je kladný → jde o <b>komplexní kation</b>, název je přídavné jméno s koncovkou podle oxidačního čísla centrálního atomu."
          : q<0 ? "Náboj je záporný → jde o <b>komplexní anion</b>, do názvu přijde kmen kovu, přípona <b>-an</b> a nakonec zakončení <b>-ový</b>."
          : "Náboj je nulový → jde o <b>nenabitý komplex</b>, název končí přídavným jménem a slovem „komplex“.")+'</p>');
  kroky+=krok(5,"Výsledek",'<p class="eq">'+vzorecKomplexu(cen,pol)+
         '</p><p><span class="result">'+nazevKomplexu(cen,pol)+'</span></p>');
  $("#nbKrok").innerHTML=kroky;
  ro("#nbRo1","Oxidační číslo centrálního atomu", cen.s+" <sup>"+rim(cen.ox)+"</sup>","zadané volbou");
  ro("#nbRo2","Náboj komplexní částice",(q>0?"+":(q<0?"−":""))+Math.abs(q),
     "součet oxidačního čísla a nábojů ligandů", q>0?"pos":(q<0?"neg":""));
  ro("#nbRo3","Ligandy ve sféře", nA+" × "+A.vz+(nB?" a "+nB+" × "+B.vz:""),
     "součet se musí rovnat koordinačnímu číslu");
}
function nbLigOpts(){
  return LIG.filter(function(l){return l.dent===1;}).map(function(l){
    return '<option value="'+l.id+'">'+l.vz+" — "+l.nm+'</option>';
  }).join("");
}
function nbSync(){
  var r=$("#nbNa");
  r.max=String(nbState.kc);
  if(nbState.nA>nbState.kc) nbState.nA=nbState.kc;
  r.value=String(nbState.nA);
  $("#nbNaVal").textContent=nbState.nA;
}
function initNb(){
  var sc=$("#nbCen");
  sc.innerHTML=nbCen.map(function(c,i){
    var o=cenGet(c.s,c.ox);
    return '<option value="'+i+'">'+o.s+"("+rim(o.ox)+") — "+o.kat+" / "+o.an+'</option>';
  }).join("");
  sc.value=String(nbState.ci);
  sc.addEventListener("change",function(){ nbState.ci=+sc.value; nbDraw(); });
  var sa=$("#nbLigA"), sb=$("#nbLigB");
  sa.innerHTML=nbLigOpts(); sa.value=nbState.a;
  sb.innerHTML=nbLigOpts(); sb.value=nbState.b;
  sa.addEventListener("change",function(){ nbState.a=sa.value; nbDraw(); });
  sb.addEventListener("change",function(){ nbState.b=sb.value; nbDraw(); });
  segBind("#nbKcSeg",function(v){ nbState.kc=+v; nbSync(); nbDraw(); });
  $("#nbNa").addEventListener("input",function(){
    nbState.nA=+this.value; $("#nbNaVal").textContent=nbState.nA; nbDraw();
  });
  nbSync(); nbDraw();
}

/* ============================================================
   9 · KAPITOLA 2 — TRENAŽÉR NÁZVOSLOVÍ (oběma směry)
   každá položka: vzorec, správný název, tři věrohodné špatné názvy,
   tři věrohodné špatné vzorce a krátké vysvětlení
   ============================================================ */
var NAZ = [
 {vz:"[Cu(NH₃)₄]²⁺", nm:"kation tetraamminměďnatý",
  dn:["kation tetraaminměďnatý","kation tetraamminměďný","kation tetraamminmědičitý"],
  dv:["[Cu(NH₃)₄]⁴⁺","[Cu(NH₄)₄]²⁺","[Cu(NH₃)₂]²⁺"],
  e:"Amoniak je nenabitý, takže náboj kationtu se rovná oxidačnímu číslu mědi (II → měďnatý). Ligand se píše se dvěma m: <b>ammin</b>, protože amin je organická sloučenina."},
 {vz:"[Ag(NH₃)₂]⁺", nm:"kation diamminstříbrný",
  dn:["kation diamminstříbrnatý","kation diaquastříbrný","kation diamminstříbrnanový"],
  dv:["[Ag(NH₃)₂]²⁺","[Ag(NH₃)₄]⁺","[Ag(NH₂)₂]⁺"],
  e:"Stříbro má oxidační číslo I, zakončení je tedy <b>-ný</b>. Náboj je kladný, jde o kation, takže žádné „-an“ do názvu nepatří. Tohle je Tollensovo činidlo."},
 {vz:"[Cr(H₂O)₆]³⁺", nm:"kation hexaaquachromitý",
  dn:["kation hexaaquachromnatý","kation hexahydroxidochromitý","kation hexaaquachromitanový"],
  dv:["[Cr(H₂O)₆]²⁺","[Cr(OH)₆]³⁻","[Cr(H₂O)₄]³⁺"],
  e:"Voda je nenabitý ligand, takže chrom má oxidační číslo III → <b>chromitý</b>. Kdyby to byly hydroxidové ionty, celkový náboj by byl 3 − 6 = −3."},
 {vz:"[Fe(CN)₆]⁴⁻", nm:"anion hexakyanidoželeznatanový",
  dn:["anion hexakyanidoželezitanový","kation hexakyanidoželeznatý","anion hexakyanoželeznanový"],
  dv:["[Fe(CN)₆]³⁻","[Fe(CN)₄]⁴⁻","[Fe(SCN)₆]⁴⁻"],
  e:"Šest kyanidů nese −6, celek −4, takže železo má +2 → <b>železnatan</b>. U komplexního aniontu se přidává kmen -an a zakončení -ový."},
 {vz:"[Fe(CN)₆]³⁻", nm:"anion hexakyanidoželezitanový",
  dn:["anion hexakyanidoželeznatanový","anion pentakyanidoželezitanový","kation hexakyanidoželezitý"],
  dv:["[Fe(CN)₆]⁴⁻","[Fe(CN)₅]³⁻","[Fe(NC)₆]³⁻"],
  e:"Rozdíl proti předchozímu je jediný elektron: −6 + 3 = −3, železo je tedy <b>železité</b>. Tahle dvojice je klasický chyták — červená a žlutá krevní sůl."},
 {vz:"[PtCl₆]²⁻", nm:"anion hexachloridoplatičitanový",
  dn:["anion hexachloridoplatnatanový","anion hexachlorplatičitý","kation hexachloridoplatičitý"],
  dv:["[PtCl₄]²⁻","[PtCl₆]⁴⁻","[PtCl₆]²⁺"],
  e:"Šest chloridů dá −6, celek −2, platina má tedy +4 → <b>platičitan</b>. Kdyby byly chloridy jen čtyři, vyšlo by +2 a název platnatan."},
 {vz:"[Zn(OH)₄]²⁻", nm:"anion tetrahydroxidozinečnatanový",
  dn:["anion tetraaquazinečnatanový","anion tetrahydroxidozinečnatý","kation tetrahydroxidozinečnatý"],
  dv:["[Zn(OH)₄]²⁺","[Zn(H₂O)₄]²⁺","[Zn(OH)₂]²⁻"],
  e:"Právě tenhle anion vysvětluje, proč se zinek rozpouští i v hydroxidu sodném. Čtyři hydroxidy nesou −4, zinek +2, celek −2."},
 {vz:"[Ag(CN)₂]⁻", nm:"anion dikyanidostříbrnanový",
  dn:["anion dikyanidostříbrnatanový","kation dikyanidostříbrný","anion tetrakyanidostříbrnanový"],
  dv:["[Ag(CN)₂]⁺","[Ag(CN)₄]⁻","[Ag(SCN)₂]⁻"],
  e:"Stříbro I plus dva kyanidy dá −1. Tenhle anion je základ galvanického stříbření: drží koncentraci volných Ag⁺ velmi nízko."},
 {vz:"[Ni(CN)₄]²⁻", nm:"anion tetrakyanidonikelnatanový",
  dn:["anion tetrakyanidoniklitanový","kation tetrakyanidonikelnatý","anion hexakyanidonikelnatanový"],
  dv:["[Ni(CN)₄]⁴⁻","[Ni(CN)₆]²⁻","[Ni(CN)₄]²⁺"],
  e:"Nikl II se čtyřmi kyanidy: 2 − 4 = −2. Tenhle komplex je čtvercový a diamagnetický — nízkospinové uspořádání d⁸."},
 {vz:"[CoCl₄]²⁻", nm:"anion tetrachloridokobaltnatanový",
  dn:["anion tetrachloridokobaltitanový","kation tetrachloridokobaltnatý","anion hexachloridokobaltnatanový"],
  dv:["[CoCl₄]²⁺","[CoCl₆]²⁻","[CoCl₄]⁴⁻"],
  e:"Kobalt II a čtyři chloridy: 2 − 4 = −2. Je to sytě modrý tetraedrický iont — barva vlhkoměrných papírků."},
 {vz:"[Co(NH₃)₅Cl]²⁺", nm:"kation pentaammin-chloridokobaltitý",
  dn:["kation chlorido-pentaamminkobaltitý","kation pentaammin-chloridokobaltnatý","anion pentaammin-chloridokobaltitanový"],
  dv:["[Co(NH₃)₅Cl]³⁺","[Co(NH₃)₆Cl]²⁺","[Co(NH₃)₅Cl₂]²⁺"],
  e:"Ligandy se řadí <b>abecedně podle názvu ligandu</b>, ne podle počtu: ammin před chlorido. Kobalt: 3 − 1 = +2, oxidační číslo je tedy III."},
 {vz:"[Cr(H₂O)₄Cl₂]⁺", nm:"kation tetraaqua-dichloridochromitý",
  dn:["kation dichlorido-tetraaquachromitý","kation tetraaqua-dichloridochromnatý","anion tetraaqua-dichloridochromitanový"],
  dv:["[Cr(H₂O)₄Cl₂]³⁺","[Cr(H₂O)₂Cl₄]⁻","[Cr(H₂O)₆Cl₂]⁺"],
  e:"Abecedně: aqua před chlorido. Chrom III se dvěma chloridy: 3 − 2 = +1. Existuje i zelený trans-izomer a fialovošedý cis-izomer."},
 {vz:"[Pt(NH₃)₂Cl₂]", nm:"diammin-dichloridoplatnatý komplex",
  dn:["dichlorido-diamminplatnatý komplex","diammin-dichloridoplatičitý komplex","kation diammin-dichloridoplatnatý"],
  dv:["[Pt(NH₃)₂Cl₂]²⁺","[Pt(NH₃)₄Cl₂]","[Pt(NH₃)₂Cl₄]"],
  e:"Náboj vychází nulový (2 − 2 = 0), takže komplex nemá vnější sféru a ve vodě se nerozpadá na ionty. Cis-izomer je cisplatina, léčivo proti nádorům."},
 {vz:"[Ni(CO)₄]", nm:"tetrakarbonylnikl",
  dn:["tetrakarbonylnikelnatý komplex","tetrakarbonylnikelnatan","kation tetrakarbonylnikelnatý"],
  dv:["[Ni(CO)₄]²⁺","[Ni(CO)₆]","[Ni(CN)₄]"],
  e:"Oxid uhelnatý je nenabitý, takže nikl má oxidační číslo <b>0</b>. U karbonylů kovů v nulovém stavu se název píše jedním slovem bez zakončení. Je to prudce jedovatá těkavá kapalina."},
 {vz:"[Ni(en)₃]²⁺", nm:"kation tris(ethylendiamin)nikelnatý",
  dn:["kation triethylendiaminnikelnatý","kation tris(ethylendiamin)niklitý","anion tris(ethylendiamin)nikelnatanový"],
  dv:["[Ni(en)₆]²⁺","[Ni(en)₃]³⁺","[Ni(en)₂]²⁺"],
  e:"Ethylendiamin má v názvu vlastní číslovku, proto se používá násobící předpona <b>tris-</b> a závorky. Tři dvoudonorové ligandy dají koordinační číslo 6."},
 {vz:"[Fe(C₂O₄)₃]³⁻", nm:"anion tris(oxaláto)železitanový",
  dn:["anion trioxalátoželezitanový","anion tris(oxaláto)železnatanový","kation tris(oxaláto)železitý"],
  dv:["[Fe(C₂O₄)₃]⁴⁻","[Fe(C₂O₄)₆]³⁻","[Fe(CO₃)₃]³⁻"],
  e:"Tři oxalátové ionty nesou −6, železo +3, celek −3. Oxalát je dvoudonorový, koordinační číslo je proto 6. Tenhle chelát existuje ve dvou opticky aktivních formách."},
 {vz:"K₄[Fe(CN)₆]", nm:"hexakyanidoželeznatan draselný",
  dn:["hexakyanidoželezitan draselný","tetradraselný hexakyanidoželeznatan","hexakyanidoželeznatan draselnatý"],
  dv:["K₃[Fe(CN)₆]","K₄[Fe(SCN)₆]","Na₄[Fe(CN)₆]"],
  e:"U soli se název čte jako u každé jiné: nejdřív anion, pak kation. Čtyři draslíky vyžadují náboj aniontu −4, tedy železo II. Je to žlutá krevní sůl."},
 {vz:"[Cu(NH₃)₄]SO₄", nm:"síran tetraamminměďnatý",
  dn:["tetraamminměďnatý síran","síran tetraamminměďný","síran tetraaquaměďnatý"],
  dv:["[Cu(NH₃)₄]SO₃","[Cu(NH₃)₄]₂SO₄","[Cu(SO₄)(NH₃)₄]"],
  e:"Síranový iont je vnější, komplexní kation vnitřní. Poměr 1 : 1 znamená, že kation nese +2. Tenhle sytě modrý roztok vzniká přidáním amoniaku k modré skalici."},
 {vz:"Na₃[AlF₆]", nm:"hexafluoridohlinitan sodný",
  dn:["hexafluoridohlinitan sodnatý","trisodný hexafluoridohlinitan","hexafluoridohliničitan sodný"],
  dv:["Na[AlF₆]","Na₃[AlF₄]","Na₃[AlCl₆]"],
  e:"Kryolit. Šest fluoridů nese −6, hliník +3, anion tedy −3 a potřebuje tři sodíky. Používá se jako tavidlo při elektrolytické výrobě hliníku."},
 {vz:"[Cr(H₂O)₆]Cl₃", nm:"chlorid hexaaquachromitý",
  dn:["chlorid hexaaquachromnatý","trichlorid hexaaquachromitý","hexaaquachromitý chlorid"],
  dv:["[Cr(H₂O)₆]Cl₂","[Cr(H₂O)₅Cl]Cl₂","[Cr(H₂O)₆]Cl₆"],
  e:"Všechny tři chloridy jsou vnější — proto se všechny tři vysrážejí dusičnanem stříbrným. U hydrátového izomeru [Cr(H₂O)₅Cl]Cl₂·H₂O se vysrážejí jen dva."},
 {vz:"K₂[PtCl₄]", nm:"tetrachloridoplatnatan draselný",
  dn:["tetrachloridoplatičitan draselný","hexachloridoplatnatan draselný","tetrachloridoplatnatan draselnatý"],
  dv:["K₂[PtCl₆]","K₄[PtCl₄]","K₂[PdCl₄]"],
  e:"Dva draslíky vyžadují anion −2; čtyři chloridy nesou −4, platina má tedy +2 → platnatan. Z téhle soli se amoniakem připravuje cisplatina."},
 {vz:"[Co(NH₃)₆]Cl₃", nm:"chlorid hexaamminkobaltitý",
  dn:["chlorid hexaamminkobaltnatý","chlorid hexaaminkobaltitý","hexaamminkobaltitý chlorid"],
  dv:["[Co(NH₃)₆]Cl₂","[Co(NH₃)₅Cl]Cl₂","[Co(NH₃)₆]Cl"],
  e:"Tři vnější chloridy → kation +3 → kobalt III, protože amoniak je nenabitý. Wernerova klasická látka: v roztoku dává čtyři ionty."}
];
var trState={dir:"vz2nm", i:0, ok:0, celkem:0, opts:[], spravna:0, hotovo:false};
function trPerm(n){
  var a=[]; for(var i=0;i<n;i++) a.push(i);
  for(var j=a.length-1;j>0;j--){ var k=Math.floor(Math.random()*(j+1)); var t=a[j]; a[j]=a[k]; a[k]=t; }
  return a;
}
function trNova(){
  trState.i=Math.floor(Math.random()*NAZ.length);
  var it=NAZ[trState.i];
  var spr = trState.dir==="vz2nm" ? it.nm : it.vz;
  var dis = trState.dir==="vz2nm" ? it.dn : it.dv;
  var vse=[spr].concat(dis);
  var p=trPerm(4);
  trState.opts=p.map(function(k){ return vse[k]; });
  trState.spravna=p.indexOf(0);
  trState.hotovo=false;
  trRender();
}
function trRender(){
  var it=NAZ[trState.i];
  var zadani = trState.dir==="vz2nm" ? it.vz : it.nm;
  $("#trTask").innerHTML = trState.dir==="vz2nm"
        ? 'Jak se jmenuje <span class="chem"><b>'+zadani+'</b></span>?'
        : 'Který vzorec patří k názvu <b>'+zadani+'</b>?';
  var h="";
  trState.opts.forEach(function(o,i){
    h+='<button class="opt" type="button" data-i="'+i+'" style="text-align:left;width:100%"><span class="otext">'+
       (trState.dir==="vz2nm"?o:'<span class="chem">'+o+'</span>')+'</span><span class="mk"></span></button>';
  });
  $("#trOpts").innerHTML=h;
  var e=$("#trExp"); e.style.display="none"; e.innerHTML="";
  $$("#trOpts button").forEach(function(b){
    b.addEventListener("click",function(){ trOdpoved(+b.dataset.i); });
  });
  trSkore();
}
function trOdpoved(i){
  if(trState.hotovo) return;
  trState.hotovo=true; trState.celkem++;
  var ok=(i===trState.spravna);
  if(ok) trState.ok++;
  $$("#trOpts button").forEach(function(b,j){
    if(j===trState.spravna){ b.classList.add("is-correct"); $(".mk",b).textContent="✓"; }
    else if(j===i){ b.classList.add("is-wrong"); $(".mk",b).textContent="✕"; }
    b.style.cursor="default";
  });
  var e=$("#trExp");
  e.style.display="flex";
  e.innerHTML='<span class="verdict">'+(ok?"✓ Správně":"✕ Špatně")+'</span>'+
              '<span class="eyebrow">Proč</span><div>'+NAZ[trState.i].e+'</div>';
  trSkore();
  if(trState.ok>=8 && trState.ok/trState.celkem>=0.7){
    markDone("k2"); toast("Názvosloví zvládnuté — kapitola označena jako hotová.");
  }
}
function trSkore(){
  var pct = trState.celkem ? Math.round(trState.ok/trState.celkem*100) : 0;
  $("#trSkore").innerHTML = trState.celkem
    ? '<span>Úspěšnost:</span><span class="pct">'+trState.ok+' / '+trState.celkem+'</span>'+
      '<span class="tag '+(pct>=80?"ok":(pct>=50?"warn":"bad"))+'">'+pct+' %</span>'
    : '<span>Zatím jste neodpověděli.</span>';
  $("#trSkore").className="score show";
}
function initTr(){
  segBind("#trSeg",function(v){ trState.dir=v; trNova(); });
  $("#trDalsi").addEventListener("click",trNova);
  $("#trReset").addEventListener("click",function(){
    trState.ok=0; trState.celkem=0; trNova(); toast("Skóre vynulováno.");
  });
  trNova();
}
