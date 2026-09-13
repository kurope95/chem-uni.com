/* ============================================================
   3 · SPOLEČNÉ POMOCNÍKY PRO MODELY
   ============================================================ */
function npTitle(s){ return txt(14,18,s.toUpperCase(),{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"}); }
function npCap(y,s){ return txt(14,y,s,{size:11,w:500,fill:"var(--ink-3)"}); }
function npRo(id,k,v,h,cls){
  var e=$(id); if(!e) return;
  e.className="readout "+(cls||"");
  e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>';
}
/* text pod sebe: rozdělí řetězec na řádky nejvýš n znaků (láme na mezerách) */
function npLines(s,n){
  var w=String(s).split(" "), out=[], cur="";
  for(var i=0;i<w.length;i++){
    if(!cur){ cur=w[i]; }
    else if((cur+" "+w[i]).length<=n){ cur+=" "+w[i]; }
    else { out.push(cur); cur=w[i]; }
  }
  if(cur) out.push(cur);
  return out;
}
/* rozestrkání popisků, aby se nepřekrývaly: vstup pole {y,…}, vrací totéž s ly */
function npDeclutter(items,minGap,lo,hi){
  var a=items.slice().sort(function(p,q){ return p.y-q.y; });
  var i;
  for(i=0;i<a.length;i++) a[i].ly=a[i].y;
  for(i=1;i<a.length;i++) if(a[i].ly-a[i-1].ly<minGap) a[i].ly=a[i-1].ly+minGap;
  var over=a[a.length-1].ly-hi;
  if(over>0) for(i=a.length-1;i>=0;i--){ a[i].ly-=over; if(i>0 && a[i].ly-a[i-1].ly>=minGap) break; }
  if(a[0].ly<lo){ var d=lo-a[0].ly; for(i=0;i<a.length;i++) a[i].ly+=d; }
  return a;
}
/* zaokrouhlení středu popisku tak, aby se vešel do plochy */
function npClamp(x,half,lo,hi){ return Math.max(lo+half,Math.min(hi-half,x)); }
/* šipka mezi dvěma body */
function npArrow(x1,y1,x2,y2,c,w){
  var dx=x2-x1, dy=y2-y1, L=Math.sqrt(dx*dx+dy*dy)||1;
  var ux=dx/L, uy=dy/L, hx=x2-ux*9, hy=y2-uy*9, px=-uy*5, py=ux*5;
  return line(x1,y1,hx,hy,{c:c,w:w||2,cap:"round"})+
    '<path d="M'+x2+' '+y2+' L'+(hx+px)+' '+(hy+py)+' L'+(hx-px)+' '+(hy-py)+' z" style="fill:'+c+'"/>';
}

/* ============================================================
   4 · HERO — MAPA NEPŘECHODNÝCH KOVŮ
   ============================================================ */
var mpMode="val";
var MPMODE={
  val:{nm:"valenční sféra atomu", unit:"", f:function(p){ return p.val; }},
  ox: {nm:"převažující oxidační číslo", unit:"", f:function(p){ return p.ox; }},
  en: {nm:"elektronegativita (Paulingova stupnice)", unit:"", f:function(p){ return fmt(p.en,2); }},
  ra: {nm:"poloměr atomu", unit:"pm", f:function(p){ return fmt(p.ra,0)+" pm"; }},
  tt: {nm:"teplota tání", unit:"°C", f:function(p){ return fmt(p.tt,0)+" °C"; }}
};
function drawMapa(){
  var m=MPMODE[mpMode], W=780, H=418, s='';
  s+=npTitle("Mapa nepřechodných kovů · "+m.nm);
  var x0=118, cw=112, gapx=6, y0=56, ch=62, gapy=6;
  var i,j;
  /* záhlaví skupin */
  for(i=0;i<5;i++){
    var cx=x0+i*(cw+gapx)+cw/2;
    s+=txt(cx,46,"skupina "+NPSKUP[i],{anchor:"middle",size:11,w:600,fill:"var(--ink-3)"});
  }
  /* řádky */
  for(j=0;j<NPMAPA.length;j++){
    var row=NPMAPA[j], ry=y0+j*(ch+gapy);
    s+=txt(110,ry+ch/2+4,row.per+". perioda",{anchor:"end",size:11,fill:"var(--ink-3)"});
    for(i=0;i<5;i++){
      var rx=x0+i*(cw+gapx), key=row.cells[i], ccx=rx+cw/2;
      if(!key){
        s+=rect(rx,ry,cw,ch,{fill:"var(--surface-2)",r:9,stroke:"var(--line)",sw:1,style:"fill-opacity:.35;stroke-dasharray:4 4"});
        continue;
      }
      var p=NP[key], col=NPKAT[p.kat].c;
      s+=rect(rx,ry,cw,ch,{fill:col,r:9,stroke:col,sw:1.6,style:"fill-opacity:.16"});
      s+=txt(ccx,ry+27,p.s,{anchor:"middle",size:18,w:700,fill:col});
      s+=txt(ccx,ry+49,m.f(p),{anchor:"middle",size:11,w:500,fill:"var(--ink-2)",mono:mpMode!=="val"});
    }
  }
  /* popisky bloků */
  var bs=x0+cw/2, be=x0+(cw+gapx)+cw/2;
  s+=txt((bs+be)/2,406,"blok s",{anchor:"middle",size:12,w:700,fill:"var(--ink-3)",style:"letter-spacing:.14em"});
  var ps=x0+2*(cw+gapx)+cw/2, pe=x0+4*(cw+gapx)+cw/2;
  s+=txt((ps+pe)/2,406,"blok p",{anchor:"middle",size:12,w:700,fill:"var(--ink-3)",style:"letter-spacing:.14em"});
  $("#mpWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Mapa nepřechodných kovů v periodické tabulce"');

  if(mpMode==="val"){
    npRo("#mpRo1","blok s","ns¹ a ns²","všechny valenční elektrony odejdou");
    npRo("#mpRo2","blok p","ns²npˣ","pár ns² může, ale nemusí do vazby");
    npRo("#mpRo3","pod valenční sférou","d¹⁰ a f¹⁴","od 4. periody stíní jádro špatně");
  } else if(mpMode==="ox"){
    npRo("#mpRo1","skupiny 1 a 2","jedno číslo","I a II — jiná možnost není");
    npRo("#mpRo2","skupiny 13 až 15","vždy dvě","liší se o dvě jednotky");
    npRo("#mpRo3","kde se převaha láme","6. perioda","Tl(I) · Pb(II) · Bi(III)");
  } else if(mpMode==="en"){
    npRo("#mpRo1","nejnižší elektronegativita","cesium = 0,79","nejelektropozitivnější prvek");
    npRo("#mpRo2","anomálie ve skupině 13","Ga = 1,81 proti Al = 1,61","vinu nese kontrakce bloku d");
    npRo("#mpRo3","nejvyšší v okruhu","olovo = 2,33","po lanthanoidové kontrakci");
  } else if(mpMode==="ra"){
    npRo("#mpRo1","největší atom","cesium = 265 pm","poloměr roste dolů skupinou");
    npRo("#mpRo2","nejmenší atom","beryllium = 112 pm","dva protony navíc atom stáhnou");
    npRo("#mpRo3","anomálie","Ga = 135 pm proti Al = 143 pm","kontrakce bloku d");
  } else {
    npRo("#mpRo1","nejnižší teplota tání","cesium = 28,5 °C","taje v dlani");
    npRo("#mpRo2","nejvyšší v okruhu","beryllium = 1287 °C","dva valenční elektrony na atom");
    npRo("#mpRo3","kuriozita","gallium = 29,8 °C","kov, který se rozteče v ruce");
  }
}
function initMapa(){
  $$("#mpSeg button").forEach(function(b){
    b.addEventListener("click",function(){
      mpMode=b.dataset.mp;
      $$("#mpSeg button").forEach(function(x){ x.setAttribute("aria-pressed",String(x===b)); });
      drawMapa();
    });
  });
  drawMapa();
}

/* ============================================================
   5 · k0 — PRŮZKUMNÍK VALENČNÍ SFÉRY A IONIZAČNÍCH ENERGIÍ
   ============================================================ */
var KFLIST=["Li","Na","K","Cs","Be","Mg","Ca","Ba","Al","Ga","In","Tl","Ge","Sn","Pb"];
function kfVal(p){
  var v=[p.i1]; if(p.i2) v.push(p.i2); if(p.i3) v.push(p.i3); if(p.i4) v.push(p.i4);
  return v;
}
/* kolik elektronů je valenčních */
function kfNval(p){ return p.sk===1?1:(p.sk===2?2:(p.sk===13?3:4)); }
function drawKf(){
  var key=$("#kfSel").value||"Na", p=NP[key];
  var vals=kfVal(p), nv=kfNval(p), W=760, H=340, s='';
  s+=npTitle("Ionizační energie — kde je skok");
  /* levý sloupec */
  var lx=18, ly=58;
  s+=txt(lx,ly,p.s+" · "+p.n,{size:17,w:700,fill:"var(--accent)"});
  s+=txt(lx,ly+30,"valenční sféra",{size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  s+=txt(lx,ly+52,p.core+" "+p.val,{size:14,w:600,fill:"var(--ink)"});
  s+=txt(lx,ly+82,"pod valenční sférou",{size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  var pl=npLines(p.pod,30);
  for(var q=0;q<pl.length && q<3;q++) s+=txt(lx,ly+104+q*18,pl[q],{size:11.5,fill:"var(--ink-2)"});
  s+=txt(lx,ly+172,"valenčních elektronů",{size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  s+=txt(lx,ly+204,String(nv),{size:20,w:700,fill:"var(--exo)"});
  s+=txt(lx,ly+234,"oxidační číslo ve sloučeninách",{size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  s+=txt(lx,ly+258,p.ox,{size:16,w:700,fill:"var(--ink)"});
  /* graf */
  var gx=330, gw=390, base=272, top=84, maxv=Math.max.apply(null,vals);
  var bw=62, step=(gw-bw)/Math.max(1,vals.length-1);
  if(vals.length===1) step=0;
  s+=line(gx-12,base,gx+gw+8,base,{c:"var(--line-strong)",w:1.4});
  for(var i=0;i<vals.length;i++){
    var bx=gx+i*step, h=(base-top)*vals[i]/maxv, by=base-h;
    var col = (i<nv) ? "var(--exo)" : "var(--endo)";
    if(p.blok==="p" && i>=nv-2 && i<nv) col="var(--accent)";
    s+=rect(bx,by,bw,h,{fill:col,r:5,style:"fill-opacity:.75"});
    s+=txt(bx+bw/2,by-9,fmt(vals[i],0),{anchor:"middle",size:11,w:700,fill:col,mono:true});
    s+=txt(bx+bw/2,base+20,"I"+["₁","₂","₃","₄"][i],{anchor:"middle",size:13,w:600,fill:"var(--ink-2)"});
    var pom = (i<nv) ? "do vazby" : "z jádra";
    s+=txt(bx+bw/2,base+38,pom,{anchor:"middle",size:10,fill:"var(--ink-3)"});
  }
  /* označ největší skok */
  var bestI=0, bestR=0;
  for(var k=1;k<vals.length;k++){ var r=vals[k]/vals[k-1]; if(r>bestR){ bestR=r; bestI=k; } }
  if(bestI>0){
    var sx=gx+bestI*step-13;
    s+=line(sx,top-6,sx,base,{c:"var(--bad)",w:1.6,dash:"5 4"});
  }
  s+=txt(gx-12,60,"ionizační energie [kJ·mol⁻¹]",{size:11,w:500,fill:"var(--ink-3)"});
  $("#kfWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Ionizační energie vybraného prvku"');

  npRo("#kfRo1","1. ionizační energie",fmt(p.i1,0)+" kJ·mol⁻¹","cena za první elektron");
  npRo("#kfRo2","největší skok","mezi I"+["₁","₂","₃","₄"][bestI-1]+" a I"+["₁","₂","₃","₄"][bestI],fmt(bestR,1)+"krát dražší — tady končí valenční sféra");
  npRo("#kfRo3","z toho plyne","oxidační číslo "+p.ox,"dál už se ionizace nikdy nevyplatí");
  $("#kfText").innerHTML='<p class="eq" style="margin:0">'+p.pozn+'</p>';
}
function initKf(){
  $("#kfSel").innerHTML=KFLIST.map(function(k){
    return '<option value="'+k+'">'+NP[k].n+" ("+k+")"+'</option>';
  }).join("");
  $("#kfSel").value="Na";
  drawKf();
}

/* ============================================================
   6 · k0 — CHEMICKY PROTI TECHNICKY TYPICKÉMU KOVU
   ============================================================ */
var NPSROV=[
 {s:"Cs",n:"cesium",   en:0.79,i1:376, tt:28.5, rho:1.873},
 {s:"Na",n:"sodík",    en:0.93,i1:496, tt:97.8, rho:0.968},
 {s:"Ca",n:"vápník",   en:1.00,i1:590, tt:842,  rho:1.55},
 {s:"Mg",n:"hořčík",   en:1.31,i1:738, tt:650,  rho:1.738},
 {s:"Al",n:"hliník",   en:1.61,i1:578, tt:660,  rho:2.70},
 {s:"Fe",n:"železo",   en:1.83,i1:763, tt:1538, rho:7.874},
 {s:"W", n:"wolfram",  en:2.36,i1:770, tt:3422, rho:19.25}
];
var chMode="en";
var CHM={
  en: {nm:"elektronegativita (Paulingova stupnice)", d:2, u:"", lo:"chemicky nejtypičtější kov je vlevo"},
  i1: {nm:"první ionizační energie [kJ·mol⁻¹]", d:0, u:" kJ·mol⁻¹", lo:"nejsnáz odevzdá elektron ten vlevo"},
  tt: {nm:"teplota tání [°C]", d:0, u:" °C", lo:"technicky použitelný kov je vpravo"},
  rho:{nm:"hustota [g·cm⁻³]", d:2, u:" g·cm⁻³", lo:"lehké kovy vlevo, těžké vpravo"}
};
function drawCh(){
  var m=CHM[chMode], W=760, H=330, s='';
  s+=npTitle("Chemicky typický kov není technicky typický");
  s+=npCap(42,m.nm);
  var x0=64, gw=670, base=250, top=76;
  var n=NPSROV.length, slot=gw/n, bw=Math.min(62,slot-26);
  var maxv=0, i;
  for(i=0;i<n;i++) maxv=Math.max(maxv,NPSROV[i][chMode]);
  s+=line(x0-10,base,x0+gw+6,base,{c:"var(--line-strong)",w:1.4});
  for(i=0;i<n;i++){
    var d=NPSROV[i], cx=x0+i*slot+slot/2, h=(base-top)*d[chMode]/maxv, by=base-h;
    var col = i<=2 ? "var(--endo)" : (i>=5 ? "var(--exo)" : "var(--accent)");
    s+=rect(cx-bw/2,by,bw,h,{fill:col,r:5,style:"fill-opacity:.75"});
    s+=txt(cx,by-9,fmt(d[chMode],m.d),{anchor:"middle",size:11,w:700,fill:col,mono:true});
    s+=txt(cx,base+21,d.s,{anchor:"middle",size:13.5,w:700,fill:"var(--ink)"});
    s+=txt(cx,base+39,d.n,{anchor:"middle",size:10,fill:"var(--ink-3)"});
  }
  s+=txt(x0-10,base+62,m.lo,{size:11.5,fill:"var(--ink-3)"});
  $("#chWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Srovnání vlastností kovů"');

  var srt=NPSROV.slice().sort(function(a,b){ return a[chMode]-b[chMode]; });
  npRo("#chRo1","nejnižší hodnota",srt[0].s+" = "+fmt(srt[0][chMode],m.d)+m.u,srt[0].n);
  npRo("#chRo2","nejvyšší hodnota",srt[n-1].s+" = "+fmt(srt[n-1][chMode],m.d)+m.u,srt[n-1].n);
  var pom=srt[n-1][chMode]/(srt[0][chMode]||1);
  npRo("#chRo3","poměr krajních hodnot",fmt(pom,1)+"krát","rozpětí napříč sedmi kovy");
}
function initCh(){
  $$("#chSeg button").forEach(function(b){
    b.addEventListener("click",function(){
      chMode=b.dataset.ch;
      $$("#chSeg button").forEach(function(x){ x.setAttribute("aria-pressed",String(x===b)); });
      drawCh();
    });
  });
  drawCh();
}
