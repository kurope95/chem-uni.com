/* ============================================================
   2 · SPOLEČNÍ POMOCNÍCI
   ============================================================ */
var SUP = {"0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹","+":"⁺","-":"⁻","−":"⁻"};
var SUB = {"0":"₀","1":"₁","2":"₂","3":"₃","4":"₄","5":"₅","6":"₆","7":"₇","8":"₈","9":"₉"};
function sup(s){ return String(s).split("").map(function(c){return SUP[c]||c;}).join(""); }
function sub(s){ return String(s).split("").map(function(c){return SUB[c]||c;}).join(""); }
/* náboj jako horní index: 2 → „²⁺“, −3 → „³⁻“, 0 → „“ */
function nabojSup(q){
  if(q===0) return "";
  var m=Math.abs(q);
  return (m===1?"":sup(String(m))) + (q>0?"⁺":"⁻");
}
/* římské oxidační číslo */
var RIM=["0","I","II","III","IV","V","VI","VII","VIII"];
function rim(n){ return RIM[n]||String(n); }
/* pevný počet desetinných míst s českou čárkou (fmt() nuly odřezává) */
function fixed(n,d){
  if(n===null||n===undefined||isNaN(n)) return "—";
  return (n<0?"−":"")+Math.abs(n).toFixed(d===undefined?1:d).replace(".",",");
}
/* mocnina deseti s horními indexy: 8,91·10⁻⁹ */
function expo(x,d){
  if(x===0) return "0";
  var e=Math.floor(Math.log(Math.abs(x))/Math.LN10);
  var m=x/Math.pow(10,e);
  if(Math.abs(m)>=9.995){ m/=10; e+=1; }
  return fixed(m,d===undefined?2:d)+"·10"+(e<0?"⁻":"")+sup(String(Math.abs(e)));
}
/* tisícová mezera pro velká čísla */
function tis(n){
  var s=Math.round(Math.abs(n)).toString(), o="";
  for(var i=0;i<s.length;i++){ if(i&&(s.length-i)%3===0) o+=" "; o+=s[i]; }
  return (n<0?"−":"")+o;
}
function ro(id,k,v,h,cls){
  var e=$(id); if(!e) return;
  e.className="readout "+(cls||"");
  e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>';
}
function say(id,html,tone){
  var e=$(id); if(!e) return;
  e.style.display="flex";
  e.style.background = tone==="ok" ? "var(--ok-soft)" : (tone==="bad" ? "var(--bad-soft)" : "var(--surface-2)");
  e.style.borderColor = tone==="ok" ? "var(--ok)" : (tone==="bad" ? "var(--bad)" : "var(--line)");
  e.innerHTML='<span class="eyebrow">Co z toho plyne</span><div>'+html+'</div>';
}
function segSet(sel,val){
  $$(sel+" button").forEach(function(b){ b.setAttribute("aria-pressed", String(b.dataset.v===val)); });
}
function segBind(sel,fn){
  $$(sel+" button").forEach(function(b){
    b.addEventListener("click",function(){ segSet(sel,b.dataset.v); fn(b.dataset.v); });
  });
}
/* kroužek s popiskem uvnitř */
function atom(cx,cy,r,label,fill,ink,size){
  var s='<circle cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="'+r.toFixed(1)+
        '" style="fill:'+fill+';stroke:var(--line-strong);stroke-width:1.4"/>';
  s+=txt(cx,cy+(size||12.5)*0.36,label,{anchor:"middle",size:size||12.5,w:700,fill:ink||"var(--accent-ink)"});
  return s;
}
/* hranaté závorky kolem obrázku + náboj vpravo nahoře */
function zavorky(x1,y1,x2,y2,naboj){
  var c="var(--ink-2)", w=2.2, t=13;
  var s="";
  s+='<path d="M'+(x1+t)+' '+y1+' H'+x1+' V'+y2+' H'+(x1+t)+'" style="fill:none;stroke:'+c+';stroke-width:'+w+'"/>';
  s+='<path d="M'+(x2-t)+' '+y1+' H'+x2+' V'+y2+' H'+(x2-t)+'" style="fill:none;stroke:'+c+';stroke-width:'+w+'"/>';
  if(naboj) s+=txt(x2+7,y1+15,naboj,{size:17,w:700,fill:"var(--accent)"});
  return s;
}
/* vodorovná šipka s popiskem nad ní */
function hArrow(x1,x2,y,color,label){
  var s=line(x1,y,x2,y,{c:color,w:2.2,cap:"round"});
  var d=x2>x1?1:-1;
  s+='<path d="M'+x2+' '+y+' l'+(-8*d)+' -5 l0 10 z" style="fill:'+color+'"/>';
  if(label) s+=txt((x1+x2)/2,y-9,label,{anchor:"middle",size:11.5,w:600,fill:color});
  return s;
}
/* sloupcový graf; data = [{lbl,val,col,hi,sub}] */
function barChart(o){
  var d=o.data, n=d.length, s='';
  var vals=d.map(function(e){return e.val;});
  var vmax=Math.max.apply(null,vals)*1.14, vmin=0;
  if(o.vmax) vmax=o.vmax;
  var span=vmax-vmin;
  function ypx(v){ return o.y+o.h-(v-vmin)/span*o.h; }
  var steps=o.steps||4;
  for(var i=0;i<=steps;i++){
    var v=vmin+span*i/steps, yy=ypx(v);
    s+=line(o.x,yy,o.x+o.w,yy,{c:"var(--grid)",w:1});
    s+=txt(o.x-8,yy+4,o.fmtAx?o.fmtAx(v):fixed(v,o.dec===undefined?1:o.dec),
           {anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true});
  }
  s+=line(o.x,o.y+o.h,o.x+o.w,o.y+o.h,{c:"var(--line-strong)",w:1.6});
  var gap=o.w/n, bw=gap*0.54;
  d.forEach(function(e,i){
    var cx=o.x+gap*(i+0.5), yv=ypx(e.val), hh=o.y+o.h-yv;
    s+=rect(cx-bw/2,yv,bw,hh,{fill:e.col,r:3,style:e.hi?"":"fill-opacity:.5"});
    if(e.hi) s+=rect(cx-bw/2,yv,bw,hh,{fill:"none",r:3,stroke:"var(--accent)",sw:2.4});
    s+=txt(cx,yv-7,e.top!==undefined?e.top:fixed(e.val,o.dec===undefined?1:o.dec),
           {anchor:"middle",size:10.5,w:700,fill:"var(--ink-2)",mono:true});
    s+=txt(cx,o.y+o.h+17,e.lbl,{anchor:"middle",size:12,w:e.hi?700:600,
           fill:e.hi?"var(--accent)":"var(--ink-2)"});
    if(e.sub) s+=txt(cx,o.y+o.h+32,e.sub,{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  });
  if(o.title) s+=txt(o.x,o.y-13,o.title,{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  if(o.unit)  s+=txt(o.x+o.w,o.y-13,o.unit,{anchor:"end",size:11,fill:"var(--ink-3)",mono:true});
  return s;
}

/* ============================================================
   3 · NÁZVOSLOVÍ — generátor vzorce i názvu
   ============================================================ */
/* položky: [{lig:objekt, n:počet}] */
function nabojKomplexu(cen, polozky){
  var q = cen.ox;
  polozky.forEach(function(p){ q += p.n * p.lig.q; });
  return q;
}
/* ligand v koordinační sféře: závorky se píší, jakmile je ve vzorci
   víc než jedna značka prvku (OH, CN, CO, NH₃, H₂O, SCN, C₅H₅N …) */
function jadroLigandu(l){ return l.vz.replace(/[⁻⁺⁰¹²³⁴⁵⁶⁷⁸⁹]/g,""); }
function vicePrvku(core){ return (core.match(/[A-Z]/g)||[]).length > 1; }
function vzorecKomplexu(cen, polozky){
  var s = "[" + cen.s;
  polozky.forEach(function(p){
    var core = jadroLigandu(p.lig);
    var zav  = vicePrvku(core);
    s += (zav ? "("+core+")" : core) + (p.n>1 ? sub(p.n) : "");
  });
  s += "]";
  return s + nabojSup(nabojKomplexu(cen, polozky));
}
function nazevLigandu(p){
  var pf = prefix(p.n, p.lig.bis);
  if(p.n>1 && p.lig.bis) return pf + "(" + p.lig.nm + ")";
  return pf + p.lig.nm;
}
function nazevKomplexu(cen, polozky){
  var q = nabojKomplexu(cen, polozky);
  var casti = polozky.slice().sort(function(a,b){
    return a.lig.nm.localeCompare(b.lig.nm,"cs");
  }).map(nazevLigandu);
  var lig = casti.join("-");
  if(q>0)  return "kation " + lig + cen.kat;
  if(q<0)  return "anion "  + lig + cen.an + "ový";
  return lig + cen.kat + " komplex";
}

/* ============================================================
   4 · HERO — STAVEBNICE KOMPLEXU
   ============================================================ */
var bxCen = [
 {s:"Fe", ox:2}, {s:"Fe", ox:3}, {s:"Co", ox:3}, {s:"Ni", ox:2},
 {s:"Cu", ox:2}, {s:"Cr", ox:3}, {s:"Ag", ox:1}, {s:"Pt", ox:2}
];
var bxState = {ci:2, lig:"NH3", geo:"okt"};
function bxCenObj(){ var c=bxCen[bxState.ci]; return cenGet(c.s,c.ox); }
function bxKc(){ return bxState.geo==="lin" ? 2 : (bxState.geo==="okt" ? 6 : 4); }

/* souřadnice vrcholů polyedru v jednotkách poloměru R kolem (0,0) */
function polyBody(geo){
  if(geo==="lin") return [{x:-1,y:0},{x:1,y:0}];
  if(geo==="tet") return [{x:-0.72,y:-0.66},{x:0.72,y:-0.66},
                          {x:-0.72,y:0.74,st:"dash"},{x:0.72,y:0.74,st:"wedge"}];
  if(geo==="sq")  return [{x:-0.76,y:-0.76},{x:0.76,y:-0.76},
                          {x:-0.76,y:0.76},{x:0.76,y:0.76}];
  /* oktaedr */
  return [{x:0,y:-1},{x:0,y:1},
          {x:-0.88,y:-0.24},{x:0.88,y:0.24},
          {x:0.44,y:-0.46,st:"dash"},{x:-0.44,y:0.46,st:"wedge"}];
}
function kresliPolyedr(cx,cy,R,geo,cLabel,lLabel,cFill,lFill){
  var v=polyBody(geo), s="";
  /* vazby */
  v.forEach(function(p){
    var x=cx+p.x*R, y=cy+p.y*R;
    if(p.st==="wedge"){
      var dx=x-cx, dy=y-cy, L=Math.sqrt(dx*dx+dy*dy), nx=-dy/L*5.5, ny=dx/L*5.5;
      s+='<path d="M'+cx+' '+cy+' L'+(x+nx).toFixed(1)+' '+(y+ny).toFixed(1)+
         ' L'+(x-nx).toFixed(1)+' '+(y-ny).toFixed(1)+' z" style="fill:var(--line-strong)"/>';
    } else {
      s+=line(cx,cy,x,y,{c:"var(--line-strong)",w:p.st==="dash"?1.6:2.2,dash:p.st==="dash"?"5 4":null});
    }
  });
  /* ligandy */
  var lr = 15 + Math.min(16, lLabel.length*3.1);
  v.forEach(function(p){
    s+=atom(cx+p.x*R, cy+p.y*R, lr, lLabel, lFill, "var(--ink)", lLabel.length>4?11:12.5);
  });
  /* centrum */
  s+=atom(cx,cy,25,cLabel,cFill,"var(--accent-ink)",16);
  return s;
}
function bxDraw(){
  var cen=bxCenObj(), L=ligById(bxState.lig), kc=bxKc();
  var pol=[{lig:L,n:kc}];
  var W=560,H=400,cx=280,cy=196,R=124,s="";
  s+=rect(6,6,W-12,H-12,{fill:"var(--surface-2)",r:14,stroke:"var(--line)",sw:1.2});
  s+=kresliPolyedr(cx,cy,R,bxState.geo,cen.s,jadroLigandu(L),
                   "var(--accent)","var(--cat2)");
  s+=zavorky(34,30,W-46,H-34,nabojSup(nabojKomplexu(cen,pol)));
  /* popisky geometrie */
  var g=POLY.filter(function(p){return p.id===bxState.geo;})[0];
  s+=txt(W/2,H-14,g.nm+" · koordinační číslo = "+kc+" · hybridizace "+g.hyb,
         {anchor:"middle",size:12.5,w:600,fill:"var(--ink-3)"});
  s+=txt(W/2,24,"vazebné úhly = "+g.uhel,{anchor:"middle",size:12,w:600,fill:"var(--ink-3)"});
  $("#bxWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Stavebnice komplexu — geometrie koordinační sféry"');

  var q=nabojKomplexu(cen,pol);
  ro("#bxRo1","Oxidační číslo centrálního atomu", cen.s+"<sup>"+rim(cen.ox)+"</sup>",
     "z náboje celku a nábojů ligandů");
  ro("#bxRo2","Náboj komplexní částice", (q>0?"+":(q<0?"−":""))+Math.abs(q),
     kc+" × náboj ligandu ("+(L.q>0?"+":"")+L.q+") + "+cen.ox, q>0?"pos":(q<0?"neg":""));
  ro("#bxRo3","Koordinační číslo", String(kc), "počet donor-akceptorových vazeb");
  $("#bxVz").innerHTML   = "Vzorec: <b>"+vzorecKomplexu(cen,pol)+"</b>";
  $("#bxNazev").innerHTML= "Název: <b>"+nazevKomplexu(cen,pol)+"</b>";
}
function initBx(){
  var sel=$("#bxLig");
  sel.innerHTML = LIG.filter(function(l){return l.dent===1;}).map(function(l){
    return '<option value="'+l.id+'">'+l.vz+" — "+l.nm+'</option>';
  }).join("");
  sel.value=bxState.lig;
  sel.addEventListener("change",function(){ bxState.lig=sel.value; bxDraw(); });
  segBind("#bxCenSeg",function(v){ bxState.ci=+v; bxDraw(); });
  segBind("#bxGeoSeg",function(v){ bxState.geo=v; bxDraw(); });
  bxDraw();
}

/* ============================================================
   5 · KAPITOLA 0 — VNITŘNÍ A VNĚJŠÍ SFÉRA
   ============================================================ */
var DS = [
 {vz:"K₄[Fe(CN)₆]", vnitr:"[Fe(CN)₆]⁴⁻", vnejs:"4 K⁺", cen:"Fe", ox:2, kc:6, qk:-4,
  lig:"6 × CN⁻ (každý −1)", cast:5, nazev:"hexakyanidoželeznatan draselný",
  pozn:"Kyanidové ionty jsou uvnitř sféry, a proto se v roztoku nedají prokázat jako volný kyanid. Právě proto není žlutá krevní sůl jedovatá, přestože kyanid obsahuje."},
 {vz:"[Cu(NH₃)₄]SO₄", vnitr:"[Cu(NH₃)₄]²⁺", vnejs:"SO₄²⁻", cen:"Cu", ox:2, kc:4, qk:2,
  lig:"4 × NH₃ (každý 0)", cast:2, nazev:"síran tetraamminměďnatý",
  pozn:"Amoniak je nenabitý, takže náboj komplexu se rovná oxidačnímu číslu mědi. Síranový anion je vnější, sráží se s Ba²⁺ úplně normálně."},
 {vz:"[Cr(H₂O)₆]Cl₃", vnitr:"[Cr(H₂O)₆]³⁺", vnejs:"3 Cl⁻", cen:"Cr", ox:3, kc:6, qk:3,
  lig:"6 × H₂O (každá 0)", cast:4, nazev:"chlorid hexaaquachromitý",
  pozn:"Chloridy jsou vnější, takže se všechny tři vysrážejí dusičnanem stříbrným. U hydrátového izomeru [Cr(H₂O)₅Cl]Cl₂·H₂O se vysráží jen dva."},
 {vz:"[Co(NH₃)₅Cl]Cl₂", vnitr:"[Co(NH₃)₅Cl]²⁺", vnejs:"2 Cl⁻", cen:"Co", ox:3, kc:6, qk:2,
  lig:"5 × NH₃ (0) + 1 × Cl⁻ (−1)", cast:3, nazev:"chlorid pentaammin-chloridokobaltitý",
  pozn:"Jeden chlorid je ligand, dva jsou kompenzující ionty. Srážením s AgNO₃ se vysrážejí jen dva ze tří — takhle Werner rozlišoval vnitřní a vnější sféru."},
 {vz:"Na₃[AlF₆]", vnitr:"[AlF₆]³⁻", vnejs:"3 Na⁺", cen:"Al", ox:3, kc:6, qk:-3,
  lig:"6 × F⁻ (každý −1)", cast:4, nazev:"hexafluoridohlinitan sodný (kryolit)",
  pozn:"Hliník není přechodný kov, a přesto tvoří komplex — koordinační číslo 6 je vyšší než oxidační číslo III."},
 {vz:"[Pt(NH₃)₂Cl₂]", vnitr:"[Pt(NH₃)₂Cl₂]", vnejs:"žádná", cen:"Pt", ox:2, kc:4, qk:0,
  lig:"2 × NH₃ (0) + 2 × Cl⁻ (−1)", cast:1, nazev:"diammin-dichloridoplatnatý komplex (cisplatina)",
  pozn:"Nenabitý komplex nemá vnější sféru vůbec. Ve vodě se nerozpadá na ionty — a právě proto projde buněčnou membránou."}
];
var dsI=0;
function dsDraw(){
  var d=DS[dsI], W=680,H=300,s="";
  s+=rect(6,6,W-12,H-12,{fill:"var(--surface-2)",r:14,stroke:"var(--line)",sw:1.2});
  /* nadpisy sloupců */
  s+=txt(196,38,"VNITŘNÍ (KOORDINAČNÍ) SFÉRA",{anchor:"middle",size:11.5,w:700,
        fill:"var(--exo)",style:"letter-spacing:.09em"});
  s+=txt(540,38,"VNĚJŠÍ SFÉRA",{anchor:"middle",size:11.5,w:700,
        fill:"var(--endo)",style:"letter-spacing:.09em"});
  /* rámečky */
  s+=rect(30,52,332,150,{fill:"var(--exo-soft)",r:12,stroke:"var(--exo)",sw:1.8});
  s+=rect(392,52,258,150,{fill:"var(--endo-soft)",r:12,stroke:"var(--endo)",sw:1.8,
        style:d.vnejs==="žádná"?"stroke-dasharray:6 5;fill-opacity:.35":""});
  /* obsah */
  s+=txt(196,104,d.vnitr,{anchor:"middle",size:21,w:700,fill:"var(--ink)"});
  s+=txt(196,134,"centrální atom "+d.cen+" v ox. čísle "+rim(d.ox),
        {anchor:"middle",size:12,fill:"var(--ink-2)"});
  s+=txt(196,155,"ligandy: "+d.lig,{anchor:"middle",size:12,fill:"var(--ink-2)"});
  s+=txt(196,178,"koordinační číslo = "+d.kc,{anchor:"middle",size:12,w:600,fill:"var(--exo)"});
  s+=txt(521,104,d.vnejs,{anchor:"middle",size:21,w:700,fill:"var(--ink)"});
  s+=txt(521,140,d.vnejs==="žádná"?"komplex je elektroneutrální":"kompenzující ionty",
        {anchor:"middle",size:12,fill:"var(--ink-2)"});
  s+=txt(521,168,d.vnejs==="žádná"?"nic se nesráží ani nevodí proud"
        :"srážejí se běžnými činidly",{anchor:"middle",size:12,fill:"var(--ink-2)"});
  /* dělicí čára */
  s+=line(377,52,377,202,{c:"var(--line-strong)",w:1.6,dash:"6 5"});
  /* spodní řádek: rozpad ve vodě */
  s+=txt(W/2,238,"ve vodě se rozpadne na "+d.cast+" "+(d.cast===1?"částici":(d.cast<5?"částice":"částic"))+":",
        {anchor:"middle",size:12,w:600,fill:"var(--ink-3)"});
  s+=txt(W/2,266,d.vnejs==="žádná" ? d.vnitr+"  (zůstává celá)"
        : d.vnitr+"   +   "+d.vnejs,{anchor:"middle",size:16,w:700,fill:"var(--accent)"});
  $("#dsWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Rozklad koordinační sloučeniny na vnitřní a vnější sféru"');

  ro("#dsRo1","Oxidační číslo centrálního atomu", d.cen+" <sup>"+rim(d.ox)+"</sup>",
     "dopočítá se z náboje komplexu");
  ro("#dsRo2","Náboj komplexní částice", (d.qk>0?"+":(d.qk<0?"−":""))+Math.abs(d.qk),
     "součet ox. čísla a nábojů ligandů", d.qk>0?"pos":(d.qk<0?"neg":""));
  ro("#dsRo3","Částic po rozpuštění", String(d.cast), "kolik iontů vznikne z jedné formulační jednotky");
  say("#dsSay","<b>"+d.nazev+".</b> "+d.pozn);
}
function initDs(){
  var sel=$("#dsSel");
  sel.innerHTML=DS.map(function(d,i){ return '<option value="'+i+'">'+d.vz+'</option>'; }).join("");
  sel.addEventListener("change",function(){ dsI=+sel.value; dsDraw(); });
  dsDraw();
}

/* ============================================================
   6 · KAPITOLA 1 — KOORDINAČNÍ POLYEDRY
   ============================================================ */
var gpId="okt";
function gpObj(){ for(var i=0;i<POLY.length;i++) if(POLY[i].id===gpId) return POLY[i]; return POLY[0]; }
function gpBody(id){
  if(id==="lin1") return [{x:1,y:0}];
  if(id==="tri")  return [{x:0,y:-1},{x:-0.87,y:0.5},{x:0.87,y:0.5}];
  if(id==="bip")  return [{x:0,y:-1},{x:0,y:1},{x:-0.86,y:-0.14},
                          {x:0.72,y:-0.42,st:"dash"},{x:0.5,y:0.5,st:"wedge"}];
  return polyBody(id);
}
function gpDraw(){
  var p=gpObj(), W=560,H=364,cx=280,cy=150,R=98,s="";
  s+=rect(6,6,W-12,H-12,{fill:"var(--surface-2)",r:14,stroke:"var(--line)",sw:1.2});
  var v=gpBody(gpId);
  v.forEach(function(q){
    var x=cx+q.x*R, y=cy+q.y*R;
    if(q.st==="wedge"){
      var dx=x-cx, dy=y-cy, L=Math.sqrt(dx*dx+dy*dy), nx=-dy/L*5.5, ny=dx/L*5.5;
      s+='<path d="M'+cx+' '+cy+' L'+(x+nx).toFixed(1)+' '+(y+ny).toFixed(1)+
         ' L'+(x-nx).toFixed(1)+' '+(y-ny).toFixed(1)+' z" style="fill:var(--line-strong)"/>';
    } else s+=line(cx,cy,x,y,{c:"var(--line-strong)",w:q.st==="dash"?1.6:2.2,dash:q.st==="dash"?"5 4":null});
  });
  /* obrys polyedru */
  if(gpId==="sq"||gpId==="tri"){
    var d2=v.map(function(q,i){return (i?"L":"M")+(cx+q.x*R).toFixed(1)+" "+(cy+q.y*R).toFixed(1);}).join(" ")+" Z";
    s+='<path d="'+d2+'" style="fill:none;stroke:var(--line);stroke-width:1.3;stroke-dasharray:4 4"/>';
  }
  v.forEach(function(q){ s+=atom(cx+q.x*R,cy+q.y*R,17,"L","var(--cat2)","var(--ink)",13); });
  s+=atom(cx,cy,24,"M","var(--accent)","var(--accent-ink)",16);
  /* popisky pod obrázkem — tři samostatné řádky, aby se nekřížily */
  s+=txt(W/2,H-72,p.nm,{anchor:"middle",size:16,w:700,fill:"var(--ink)"});
  s+=txt(W/2,H-48,"koordinační číslo = "+p.kc+"   ·   vazebné úhly = "+p.uhel,
        {anchor:"middle",size:12.5,w:600,fill:"var(--ink-2)"});
  s+=txt(W/2,H-22,"hybridizace = "+p.hyb,{anchor:"middle",size:12.5,fill:"var(--ink-3)",mono:true});
  $("#gpWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Koordinační polyedr — '+p.nm+'"');
  $("#gpPrik").innerHTML="<b>Příklady:</b> "+p.prik;
  say("#gpSay",p.pozn.charAt(0).toUpperCase()+p.pozn.slice(1)+".");
}
function initGp(){
  segBind("#gpSeg",function(v){ gpId=v; gpDraw(); });
  gpDraw();
}

/* ============================================================
   7 · KAPITOLA 1 — PROHLEDÁVATELNÁ TABULKA LIGANDŮ
   ============================================================ */
var lgFilter="vse";
function lgRows(){
  var q=($("#lgHled").value||"").trim().toLowerCase();
  return ligAll().filter(function(l){
    if(lgFilter==="chelat" && l.dent<2) return false;
    if(lgFilter==="anion"  && l.q>=0)   return false;
    if(lgFilter==="neutral"&& l.q!==0)  return false;
    if(lgFilter==="silne"  && !(l.f&&l.f>=1.20)) return false;
    if(lgFilter==="slabe"  && !(l.f&&l.f<=1.00)) return false;
    if(!q) return true;
    return (l.vz+" "+l.nm+" "+l.old+" "+l.don+" "+l.pozn).toLowerCase().indexOf(q)>=0;
  });
}
function lgDraw(){
  var r=lgRows();
  var h='<table><thead><tr><th>Vzorec</th><th>Název v komplexu</th><th>Starší název</th>'+
        '<th class="n">Náboj</th><th>Donorový atom</th><th class="n">Denticita</th>'+
        '<th class="n">Síla pole <span class="q">f</span></th><th>Poznámka</th></tr></thead><tbody>';
  if(!r.length) h+='<tr><td colspan="8">Nic nenalezeno — zkuste jiné slovo.</td></tr>';
  r.forEach(function(l){
    h+='<tr><td class="chem"><b>'+l.vz+'</b></td><td>'+l.nm+'</td><td>'+l.old+'</td>'+
       '<td class="n">'+(l.q>0?"+"+l.q:(l.q<0?"−"+Math.abs(l.q):"0"))+'</td>'+
       '<td class="chem">'+l.don+'</td><td class="n">'+l.dent+'</td>'+
       '<td class="n">'+(l.f?fixed(l.f,2):"—")+'</td><td>'+l.pozn+'</td></tr>';
  });
  h+='</tbody></table>';
  $("#lgTbl").innerHTML=h;
}
function initLg(){
  $("#lgHled").addEventListener("input",lgDraw);
  segBind("#lgSeg",function(v){ lgFilter=v; lgDraw(); });
  lgDraw();
}
