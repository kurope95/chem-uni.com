/* ============================================================
   10 · KAPITOLA 3 — PROHLÍŽEČ IZOMERŮ
   ============================================================ */
/* geo: "sq" nebo "okt"; obsazeni = pole indexů vrcholů pro ligand B */
var IZO = [
 {id:"cisSq", typ:"geometrická", nadpis:"cis a trans u čtvercového komplexu",
  vz:"[Pt(NH₃)₂Cl₂]", geo:"sq", A:"NH₃", B:"Cl",
  L:{nm:"cis-izomer", B:[0,1], pop:"oba chloridy sousedí, úhel Cl–Pt–Cl = 90°"},
  P:{nm:"trans-izomer", B:[0,3], pop:"chloridy proti sobě, úhel Cl–Pt–Cl = 180°"},
  say:"Cis-izomer je <b>cisplatina</b>, jedno z nejúspěšnějších cytostatik. Trans-izomer má stejný vzorec, stejnou hmotnost i stejné vazby — a je terapeuticky <b>neúčinný</b>, protože se nedokáže navázat na dva sousední guaniny DNA. Lepší důkaz, že na geometrii záleží, neexistuje."},
 {id:"cisOkt", typ:"geometrická", nadpis:"cis a trans u oktaedrického komplexu",
  vz:"[Cr(NH₃)₄Cl₂]⁺", geo:"okt", A:"NH₃", B:"Cl",
  L:{nm:"cis-izomer", B:[0,3], pop:"chloridy v úhlu 90°, fialový roztok"},
  P:{nm:"trans-izomer", B:[0,1], pop:"chloridy v úhlu 180°, zelený roztok"},
  say:"U oktaedru typu MA₄B₂ existují právě <b>dva</b> izomery. Cis a trans se liší i barvou, protože se mírně liší symetrie ligandového pole. Podobná dvojice u chromitých solí je jeden z nejstarších důkazů oktaedrické geometrie."},
 {id:"facmer", typ:"geometrická", nadpis:"fac a mer u oktaedrického komplexu",
  vz:"[Co(NH₃)₃Cl₃]", geo:"okt", A:"NH₃", B:"Cl",
  L:{nm:"fac-izomer (faciální)", B:[0,2,5], pop:"tři chloridy na jedné stěně oktaedru"},
  P:{nm:"mer-izomer (meridiální)", B:[0,1,2], pop:"tři chloridy na jednom poledníku"},
  say:"U typu MA₃B₃ se izomery neoznačují cis a trans, ale <b>fac</b> a <b>mer</b>. Ve faciálním izomeru svírají všechny tři stejné ligandy navzájem 90°, v meridiálním jsou dva z nich proti sobě (180°) a leží s třetím v jedné rovině procházející centrem."},
 {id:"opt", typ:"optická", nadpis:"optická izomerie — dva neztotožnitelné zrcadlové obrazy",
  vz:"[Co(en)₃]³⁺", geo:"okt", A:"N", B:"N", chel:true,
  L:{nm:"enantiomer Λ (levotočivý)", B:[], pop:"tři chelátové kruhy stočené doleva"},
  P:{nm:"enantiomer Δ (pravotočivý)", B:[], pop:"zrcadlový obraz, nelze ho ztotožnit"},
  say:"Komplex nemá <b>střed ani rovinu symetrie</b>, takže jeho zrcadlový obraz s ním nejde ztotožnit — přesně jako pravá a levá ruka. Oba enantiomery stáčejí rovinu polarizovaného světla o stejný úhel, ale na opačnou stranu. Směs obou ve stejném poměru je racemát a nestáčí nic."}
];
var IZO2 = [
 {id:"vaz", typ:"vazebná", nadpis:"vazebná izomerie — ligand se váže jiným atomem",
  L:{vz:"[Co(NH₃)₅(NO₂)]²⁺", nm:"nitrito-κN (dříve nitro)",
     r:["donorový atom = <tspan>N</tspan>","žlutý až hnědožlutý","termodynamicky stálejší"]},
  P:{vz:"[Co(NH₃)₅(ONO)]²⁺", nm:"nitrito-κO (dříve nitrito)",
     r:["donorový atom = <tspan>O</tspan>","červený","vzniká rychleji, časem se přesmykne"]},
  say:"Ligand <span class=\"chem\">NO₂⁻</span> má dva různé donorové atomy — dusík i kyslík. Stejný vzorec, stejná stechiometrie, jiná vazba a <b>jiná barva</b>. Stejně se chová i <span class=\"chem\">SCN⁻</span>: přes síru je to thiokyanato-κS, přes dusík thiokyanato-κN."},
 {id:"ion", typ:"ionizační", nadpis:"ionizační izomerie — anion uvnitř nebo vně sféry",
  L:{vz:"[Co(NH₃)₅Br]SO₄", nm:"bromid je ligand, síran kompenzuje",
     r:["ve vodě uvolní <tspan>SO₄²⁻</tspan>","s Ba²⁺ dá bílou sraženinu","s Ag⁺ nedá nic"]},
  P:{vz:"[Co(NH₃)₅(SO₄)]Br", nm:"síran je ligand, bromid kompenzuje",
     r:["ve vodě uvolní <tspan>Br⁻</tspan>","s Ba²⁺ nedá nic","s Ag⁺ dá nažloutlou sraženinu"]},
  say:"Oba izomery mají <b>naprosto stejný souhrnný vzorec</b>. Rozliší je jednoduchá zkumavková zkouška: co je uvnitř koordinační sféry, to se nedá vysrážet, protože to není volné."},
 {id:"hyd", typ:"hydrátová", nadpis:"hydrátová izomerie — voda jako ligand, nebo jen v mřížce",
  L:{vz:"[Cr(H₂O)₆]Cl₃", nm:"všech šest vod je ligandem",
     r:["fialový","srazí se <tspan>3 Cl⁻</tspan>","vodu neztrácí sušením"]},
  P:{vz:"[Cr(H₂O)₅Cl]Cl₂·H₂O", nm:"jedna voda je jen krystalová",
     r:["šedozelený","srazí se <tspan>2 Cl⁻</tspan>","jednu vodu ztratí nad sušidlem"]},
  say:"Zvláštní případ ionizační izomerie, kde se „stěhuje“ molekula vody. Rozliší se srážením chloridů dusičnanem stříbrným a sušením nad koncentrovanou kyselinou sírovou. Existuje ještě třetí člen řady, tmavě zelený <span class=\"chem\">[Cr(H₂O)₄Cl₂]Cl·2H₂O</span>."},
 {id:"koord", typ:"koordinační", nadpis:"koordinační izomerie — prohození kovů mezi sférami",
  L:{vz:"[Cu(NH₃)₄][PtCl₄]", nm:"měď v kationtu, platina v aniontu",
     r:["amoniak koordinuje na <tspan>Cu²⁺</tspan>","chloridy na <tspan>Pt²⁺</tspan>","obě částice jsou čtvercové"]},
  P:{vz:"[Pt(NH₃)₄][CuCl₄]", nm:"platina v kationtu, měď v aniontu",
     r:["amoniak koordinuje na <tspan>Pt²⁺</tspan>","chloridy na <tspan>Cu²⁺</tspan>","tetrachloridoměďnatan je zploštělý tetraedr"]},
  say:"Podmínkou téhle izomerie je, že <b>komplexní je kation i anion</b>. Oba kovy si pak mohou vyměnit role. Souhrnný vzorec je opět zcela totožný, liší se jen to, který kov si vzal který ligand."}
];
var izId="cisSq";
function izObj(){
  var a=IZO.concat(IZO2);
  for(var i=0;i<a.length;i++) if(a[i].id===izId) return a[i];
  return IZO[0];
}
/* jeden strukturní obrázek */
function izStruct(cx,cy,R,geo,A,B,idxB,zrcadlo,chel){
  var v=polyBody(geo), s="";
  v.forEach(function(p){
    var x=cx+(zrcadlo?-p.x:p.x)*R, y=cy+p.y*R;
    if(p.st==="wedge"){
      var dx=x-cx, dy=y-cy, L=Math.sqrt(dx*dx+dy*dy), nx=-dy/L*5,ny=dx/L*5;
      s+='<path d="M'+cx+' '+cy+' L'+(x+nx).toFixed(1)+' '+(y+ny).toFixed(1)+
         ' L'+(x-nx).toFixed(1)+' '+(y-ny).toFixed(1)+' z" style="fill:var(--line-strong)"/>';
    } else s+=line(cx,cy,x,y,{c:"var(--line-strong)",w:p.st==="dash"?1.5:2,dash:p.st==="dash"?"5 4":null});
  });
  if(chel){
    /* tři chelátové kruhy — oblouky mezi dvojicemi sousedních vrcholů */
    var pary = zrcadlo ? [[0,2],[3,4],[1,5]] : [[0,3],[2,5],[1,4]];
    pary.forEach(function(pp){
      var p1=v[pp[0]], p2=v[pp[1]];
      var x1=cx+(zrcadlo?-p1.x:p1.x)*R, y1=cy+p1.y*R;
      var x2=cx+(zrcadlo?-p2.x:p2.x)*R, y2=cy+p2.y*R;
      var mx=(x1+x2)/2, my=(y1+y2)/2;
      var ox=(mx-cx)*0.85, oy=(my-cy)*0.85;
      s+='<path d="M'+x1.toFixed(1)+' '+y1.toFixed(1)+' Q'+(mx+ox).toFixed(1)+' '+
         (my+oy).toFixed(1)+' '+x2.toFixed(1)+' '+y2.toFixed(1)+
         '" style="fill:none;stroke:var(--cat3);stroke-width:2.6;stroke-linecap:round"/>';
    });
  }
  v.forEach(function(p,i){
    var jeB = idxB.indexOf(i)>=0;
    var lab = jeB ? B : A;
    var x=cx+(zrcadlo?-p.x:p.x)*R, y=cy+p.y*R;
    s+=atom(x,y,14+Math.min(10,lab.length*2.4),lab,
            jeB?"var(--cat4)":"var(--cat2)","var(--ink)",lab.length>3?10.5:12);
  });
  s+=atom(cx,cy,20,"M","var(--accent)","var(--accent-ink)",14);
  return s;
}
function izDraw(){
  var o=izObj(), W=760,H=372,s="";
  s+=rect(6,6,W-12,H-12,{fill:"var(--surface-2)",r:14,stroke:"var(--line)",sw:1.2});
  s+=txt(W/2,32,o.nadpis,{anchor:"middle",size:14,w:700,fill:"var(--ink)"});
  if(o.geo){
    var R = o.geo==="sq" ? 88 : 92, cy=176;
    s+=izStruct(200,cy,R,o.geo,o.A,o.B,o.L.B,false,o.chel);
    s+=izStruct(560,cy,R,o.geo,o.A,o.B,o.P.B,!!o.chel,o.chel);
    if(o.chel){
      s+=line(380,66,380,286,{c:"var(--accent)",w:1.8,dash:"7 5"});
      s+=txt(380,304,"rovina zrcadlení",{anchor:"middle",size:11,w:600,fill:"var(--accent)"});
    }
    s+=txt(200,318,o.L.nm,{anchor:"middle",size:14,w:700,fill:"var(--ink)"});
    s+=txt(560,318,o.P.nm,{anchor:"middle",size:14,w:700,fill:"var(--ink)"});
    s+=txt(200,342,o.L.pop,{anchor:"middle",size:11.5,fill:"var(--ink-3)"});
    s+=txt(560,342,o.P.pop,{anchor:"middle",size:11.5,fill:"var(--ink-3)"});
    s+=txt(W/2,358,o.vz,{anchor:"middle",size:12.5,w:600,fill:"var(--ink-2)"});
  } else {
    [[o.L,40],[o.P,394]].forEach(function(pair){
      var d=pair[0], x0=pair[1];
      s+=rect(x0,58,326,270,{fill:"var(--surface-3)",r:12,stroke:"var(--line)",sw:1.4});
      s+=txt(x0+163,104,d.vz,{anchor:"middle",size:19,w:700,fill:"var(--accent)"});
      s+=txt(x0+163,134,d.nm,{anchor:"middle",size:12,w:600,fill:"var(--ink-2)"});
      s+=line(x0+30,154,x0+296,154,{c:"var(--line)",w:1});
      d.r.forEach(function(t,i){
        s+=txt(x0+163,186+i*36,t.replace(/<\/?tspan>/g,""),
               {anchor:"middle",size:12.5,fill:"var(--ink-2)"});
      });
    });
    s+=txt(W/2,348,"stejný souhrnný vzorec — jiné uspořádání",
          {anchor:"middle",size:12,w:600,fill:"var(--ink-3)"});
  }
  $("#izWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Prohlížeč izomerů — '+o.nadpis+'"');
  ro("#izRo1","Typ izomerie", o.typ, "podle toho, co se mezi izomery liší");
  ro("#izRo2","Rozliší se", o.geo?"strukturní analýzou nebo barvou":"jednoduchou zkumavkovou zkouškou",
     o.geo?"rentgenostrukturní analýza, spektra":"srážení, vodivost, sušení");
  say("#izSay",o.say);
}
function initIz(){
  var sel=$("#izSel");
  sel.innerHTML=IZO.concat(IZO2).map(function(o){
    return '<option value="'+o.id+'">'+o.nadpis+'</option>';
  }).join("");
  sel.addEventListener("change",function(){ izId=sel.value; izDraw(); });
  izDraw();
}

/* ============================================================
   11 · KAPITOLA 4 — ŠTĚPENÍ ORBITALŮ d V LIGANDOVÉM POLI
   ============================================================ */
var cfState={geo:"okt", li:5, mi:2};
var cfKovy=[
 {s:"Ni", ox:2}, {s:"Co", ox:2}, {s:"Cr", ox:3}, {s:"Fe", ox:3},
 {s:"Co", ox:3}, {s:"Rh", ox:3}, {s:"Ir", ox:3}, {s:"Pt", ox:4}
];
function cfKov(){ var c=cfKovy[cfState.mi]; return cenGet(c.s,c.ox); }
function cfLig(){ return LIG[[0,1,3,4,5,7,8,10,11,12,13,14][cfState.li]]; }
function cfDeltaO(){ return cfKov().g * cfLig().f; }
function cfDelta(){
  var d=cfDeltaO();
  if(cfState.geo==="tet") return d*4/9;
  return d;
}
/* rozloží hladiny tak, aby popisky nikdy neležely přes sebe */
function rozlozUrovne(ys,minG){
  var idx=ys.map(function(y,i){return i;}).sort(function(a,b){return ys[a]-ys[b];});
  var out=ys.slice();
  for(var k=1;k<idx.length;k++){
    var prev=out[idx[k-1]], cur=out[idx[k]];
    if(cur-prev<minG) out[idx[k]]=prev+minG;
  }
  return out;
}
function cfUrovne(){
  /* [{coef, sym, orb:[názvy], n:počet orbitalů}] shora dolů */
  if(cfState.geo==="okt") return [
    {coef:+0.6, sym:"e_g",  orb:["d_z²","d_x²−y²"]},
    {coef:-0.4, sym:"t_2g", orb:["d_xy","d_xz","d_yz"]}];
  if(cfState.geo==="tet") return [
    {coef:+0.4, sym:"t_2", orb:["d_xy","d_xz","d_yz"]},
    {coef:-0.6, sym:"e",   orb:["d_z²","d_x²−y²"]}];
  return [
    {coef:+1.228, sym:"b_1g", orb:["d_x²−y²"]},
    {coef:+0.228, sym:"b_2g", orb:["d_xy"]},
    {coef:-0.428, sym:"a_1g", orb:["d_z²"]},
    {coef:-0.514, sym:"e_g",  orb:["d_xz","d_yz"]}];
}
function symHtml(s){
  var m=s.split("_");
  return m.length>1 ? m[0]+'<tspan font-size="9" dy="3">'+m[1]+'</tspan>' : s;
}
function orbHtml(s){
  return s.replace("d_",'d<tspan font-size="9" dy="3">')+'</tspan>';
}
function cfDraw(){
  var kov=cfKov(), lig=cfLig(), D=cfDelta(), Do=cfDeltaO();
  var W=720,H=430,yc=214,s="";
  s+=rect(6,6,W-12,H-12,{fill:"var(--surface-2)",r:14,stroke:"var(--line)",sw:1.2});
  var lv=cfUrovne(), ys;
  if(cfState.geo==="sq"){
    /* čtyři hladiny — pás se vycentruje, aby se vešel do rámu */
    var cmax=1.228, cmin=-0.514, cmid=(cmax+cmin)/2;
    var P=Math.max(132,Math.min(250, D/40000*210));
    var S2=P/(cmax-cmin);
    ys=lv.map(function(l){ return yc - (l.coef-cmid)*S2; });
  } else {
    /* dvě hladiny — nesymetrii 0,6 : 0,4 je třeba vidět, takže se necentruje */
    var S=Math.max(60,Math.min(200, D/40000*190));
    ys=lv.map(function(l){ return yc - l.coef*S; });
  }
  ys=rozlozUrovne(ys,44);
  /* barycentrum */
  s+=line(96,yc,470,yc,{c:"var(--line)",w:1.3,dash:"6 5"});
  s+=txt(258,yc-7,"těžiště",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  /* volný iont */
  for(var i=0;i<5;i++) s+=rect(112+i*20,yc-7,17,14,{fill:"var(--surface-3)",r:2,stroke:"var(--line-strong)",sw:1.2});
  s+=txt(160,yc-28,"volný iont "+kov.s+sup(String(kov.ox))+"⁺",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  s+=txt(160,yc+34,"pět orbitalů d se stejnou energií",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  /* hladiny po štěpení */
  lv.forEach(function(l,k){
    var y=ys[k], n=l.orb.length, bw=36, gap=42;
    var x0=360-(n*gap-6)/2;
    s+=line(214,yc,x0-10,y,{c:"var(--line)",w:1,dash:"4 4"});
    for(var j=0;j<n;j++){
      s+=rect(x0+j*gap,y-8,bw,16,{fill:"var(--accent-soft)",r:2,stroke:"var(--accent)",sw:1.4});
      s+=txt(x0+j*gap+bw/2,y-15,orbHtml(l.orb[j]),{anchor:"middle",size:11,fill:"var(--ink-2)"});
    }
    s+=txt(x0+n*gap+4,y+5,symHtml(l.sym),{size:13,w:700,fill:"var(--accent)",style:"font-style:italic"});
  });
  /* šipka Δ mezi nejvyšší a nejnižší hladinou */
  var yTop=Math.min.apply(null,ys), yBot=Math.max.apply(null,ys);
  var xA=536;
  s+=vArrow(xA,yBot,yTop,"var(--exo)","Δ",'right');
  s+=txt(xA+26,(yTop+yBot)/2+22,tis(D)+" cm⁻¹",{size:12,w:600,fill:"var(--exo)",mono:true});
  s+=txt(xA+26,(yTop+yBot)/2+40,fixed(kJFromNm(nmFromWn(D)),0)+" kJ·mol⁻¹",{size:11.5,fill:"var(--ink-3)",mono:true});
  /* hlavička */
  var gn = cfState.geo==="okt" ? "oktaedrické pole (Δ₀)"
         : cfState.geo==="tet" ? "tetraedrické pole (Δₜ = 4/9 Δ₀)" : "čtvercové pole";
  s+=txt(W/2,30,gn+"   ·   ligand "+lig.vz+"   ·   centrální atom "+kov.s+" ("+rim(kov.ox)+")",
        {anchor:"middle",size:13,w:600,fill:"var(--ink)"});
  s+=txt(W/2,H-16,"Δ ≈ f · g   ·   f("+lig.vz+") = "+fixed(lig.f,2)+
        "   ·   g("+kov.s+" "+rim(kov.ox)+") = "+tis(kov.g)+" cm⁻¹",
        {anchor:"middle",size:11.5,fill:"var(--ink-3)",mono:true});
  $("#cfWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Štěpení orbitalů d v ligandovém poli"');

  ro("#cfRo1","Energie štěpení Δ", tis(D)+" cm⁻¹","vzdálenost krajních hladin");
  ro("#cfRo2","Odpovídající vlnová délka λ", fixed(nmFromWn(D),0)+" nm",
     "λ = 10⁷ / Δ, pro Δ v cm⁻¹");
  ro("#cfRo3","Energie na mol", fixed(kJFromNm(nmFromWn(D)),0)+" kJ·mol⁻¹",
     "E = 1,196·10⁵ / λ, pro λ v nm");
  $("#cfLigNm").innerHTML="<b>"+lig.vz+"</b> — "+lig.nm+" · "+lig.pozn;
  if(cfState.geo==="tet"){
    say("#cfSay","V tetraedrickém poli je štěpení jen <b>"+tis(D)+" cm⁻¹</b>, tedy zhruba "+
      "čtyři devítiny hodnoty "+tis(Do)+" cm⁻¹ ve stejném poli oktaedrickém. Žádný ligand nedokáže "+
      "tetraedrické Δ vyhnat tak vysoko, aby se elektronům vyplatilo párovat — proto "+
      "<b>tetraedrické nízkospinové komplexy prakticky neexistují</b>.");
  } else if(cfState.geo==="sq"){
    say("#cfSay","Ve čtvercovém poli chybějí ligandy na ose z, takže orbital d<sub>z²</sub> spadne hluboko "+
      "a orbital d<sub>x²−y²</sub>, který míří přímo na ligandy, vyletí vysoko. Mezera nad zbylými čtyřmi "+
      "orbitaly je tak velká, že se osm elektronů (konfigurace d⁸) do nich pohodlně vejde spárovaných. "+
      "Proto jsou <b>čtvercové komplexy skoro vždy diamagnetické</b>.");
  } else {
    say("#cfSay","Šest ligandů míří přesně na osy, tedy do laloků orbitalů d<sub>z²</sub> a d<sub>x²−y²</sub>. "+
      "Tyhle dva orbitaly proto energii zvýší (o 0,6 Δ), zbylé tři, které míří mezi osy, ji sníží (o 0,4 Δ). "+
      "Součet zůstane nulový — to je pravidlo těžiště. Pro tenhle komplex vychází Δ = <b>"+tis(D)+" cm⁻¹</b>.");
  }
}
function initCf(){
  var sm=$("#cfKov");
  sm.innerHTML=cfKovy.map(function(c,i){
    var o=cenGet(c.s,c.ox); return '<option value="'+i+'">'+o.s+" ("+rim(o.ox)+")</option>";
  }).join("");
  sm.value=String(cfState.mi);
  sm.addEventListener("change",function(){ cfState.mi=+sm.value; cfDraw(); });
  var r=$("#cfLig");
  r.addEventListener("input",function(){
    cfState.li=+this.value; $("#cfLigVal").textContent=cfLig().vz; cfDraw();
  });
  $("#cfLigVal").textContent=cfLig().vz;
  segBind("#cfGeoSeg",function(v){ cfState.geo=v; cfDraw(); });
  cfDraw();
}

/* ============================================================
   12 · KAPITOLA 4 — SPEKTROCHEMICKÁ ŘADA
   ============================================================ */
var scMi=2;
function scDraw(){
  var kov=cenGet(cfKovy[scMi].s,cfKovy[scMi].ox);
  var idx=[0,1,3,4,5,7,8,10,11,12,13,14];
  var data=idx.map(function(k){
    var l=LIG[k], d=kov.g*l.f;
    return {lbl:l.vz, val:d/1000, col:"var(--cat"+(1+(k%4))+")",
            top:fixed(d/1000,1), hi:(l.id===cfLig().id)};
  });
  var W=760,H=340,s="";
  s+=rect(6,6,W-12,H-12,{fill:"var(--surface-2)",r:14,stroke:"var(--line)",sw:1.2});
  s+=barChart({x:70,y:66,w:660,h:200,data:data,dec:0,
               title:"ROSTOUCÍ SÍLA LIGANDOVÉHO POLE  →",unit:"Δ₀ / 10³ cm⁻¹",
               fmtAx:function(v){return fixed(v,0);}});
  s+=txt(W/2,32,"Spektrochemická řada pro centrální atom "+kov.s+" ("+rim(kov.ox)+")",
        {anchor:"middle",size:13.5,w:700,fill:"var(--ink)"});
  s+=txt(W/2,326,"slabé pole ← π-donory · čistí σ-donory · π-akceptory → silné pole",
        {anchor:"middle",size:11.5,fill:"var(--ink-3)"});
  $("#scWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Spektrochemická řada ligandů"');
  var h='<table><thead><tr><th>Ligand</th><th>Typ vazby k centru</th><th>Proč tam v řadě je</th></tr></thead><tbody>';
  SERIE.forEach(function(x){
    h+='<tr><td class="chem"><b>'+x.l+'</b></td><td>'+x.t+'</td><td>'+x.d+'</td></tr>';
  });
  h+='</tbody></table>';
  $("#scTbl").innerHTML=h;
}
function initSc(){
  var sm=$("#scKov");
  sm.innerHTML=cfKovy.map(function(c,i){
    var o=cenGet(c.s,c.ox); return '<option value="'+i+'">'+o.s+" ("+rim(o.ox)+")</option>";
  }).join("");
  sm.value=String(scMi);
  sm.addEventListener("change",function(){ scMi=+sm.value; scDraw(); });
  scDraw();
}
