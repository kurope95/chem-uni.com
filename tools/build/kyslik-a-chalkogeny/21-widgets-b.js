/* ============================================================
   7 · K2 — MO DIAGRAM ŘADY O₂ⁿ
   ============================================================ */
var moState={pi:2};
function moItem(){ for(var i=0;i<MOSER.length;i++) if(MOSER[i].pi===moState.pi) return MOSER[i]; return MOSER[1]; }
/* jedna hladina MO: vodorovná čárka s elektrony */
function moLev(x,y,w,ne,lbl,col,lblSide){
  var s=line(x,y,x+w,y,{c:col||"var(--ink-2)",w:2.4,cap:"round"});
  var slots=1;
  if(ne>2){ slots=1; }
  /* elektrony jako šipky */
  var positions=[];
  if(ne===1) positions=[[x+w/2,1]];
  else if(ne===2) positions=[[x+w*0.34,1],[x+w*0.66,-1]];
  positions.forEach(function(p){
    var ex=p[0], up=p[1]>0;
    s+=line(ex,y-11,ex,y+11,{c:"var(--accent)",w:1.8,cap:"round"});
    var ty=up?y-11:y+11, dy=up?5:-5;
    s+='<path d="M'+ex+' '+ty+' l-3.4 '+dy+' l6.8 0 z" style="fill:var(--accent)"/>';
  });
  if(lbl) s+=txt(lblSide==="left"?x-8:x+w+8,y+4,lbl,{anchor:lblSide==="left"?"end":"start",size:11.5,w:600,fill:col||"var(--ink-2)"});
  return s;
}
function drawMO(){
  var it=moItem(), pi=it.pi, W=780, H=330, s="";
  var cx=W/2, lw=64;
  var Y={sp:46, pis:104, sg:152, pi:200, ss2:252, s2:296};
  /* atomové hladiny po stranách */
  s+=txt(70,30,"ATOM O",{size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.12em"});
  s+=txt(W-70,30,"ATOM O",{anchor:"end",size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.12em"});
  s+=txt(cx,30,"MOLEKULOVÉ ORBITALY",{anchor:"middle",size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.12em"});
  [[70,176,"2p"],[70,278,"2s"]].forEach(function(a){
    s+=line(a[0]-26,a[1],a[0]+26,a[1],{c:"var(--ink-3)",w:2});
    s+=txt(a[0]-34,a[1]+4,a[2],{anchor:"end",size:11,fill:"var(--ink-3)"});
  });
  [[W-70,176,"2p"],[W-70,278,"2s"]].forEach(function(a){
    s+=line(a[0]-26,a[1],a[0]+26,a[1],{c:"var(--ink-3)",w:2});
    s+=txt(a[0]+34,a[1]+4,a[2],{size:11,fill:"var(--ink-3)"});
  });
  /* spojnice */
  [[96,176,cx-lw,Y.pi],[96,176,cx-lw,Y.sg],[96,176,cx+lw+lw,Y.pis],[96,278,cx-lw/2,Y.s2],[96,278,cx-lw/2,Y.ss2]].forEach(function(l){
    s+=line(l[0],l[1],l[2],l[3],{c:"var(--grid)",w:1,dash:"3 3"});
  });
  /* hladiny MO */
  s+=moLev(cx-lw/2,Y.s2,lw,2,"σ(2s)","var(--endo)","left");
  s+=moLev(cx-lw/2,Y.ss2,lw,2,"σ*(2s)","var(--exo)","left");
  s+=moLev(cx-lw-30,Y.pi,lw,2,"π(2p)","var(--endo)","left");
  s+=moLev(cx+30,Y.pi,lw,2,"π(2p)","var(--endo)","right");
  s+=moLev(cx-lw/2,Y.sg,lw,2,"σ(2p)","var(--endo)","left");
  var a=Math.min(pi,2)>=1?(pi>=3?2:1):0;
  var b=pi>=2?(pi>=4?2:1):0;
  if(pi===1){ a=1; b=0; } else if(pi===2){ a=1; b=1; } else if(pi===3){ a=2; b=1; } else { a=2; b=2; }
  s+=moLev(cx-lw-30,Y.pis,lw,a,"π*(2p)","var(--exo)","left");
  s+=moLev(cx+30,Y.pis,lw,b,"π*(2p)","var(--exo)","right");
  s+=moLev(cx-lw/2,Y.sp,lw,0,"σ*(2p)","var(--exo)","right");
  /* zvýraznění π* */
  s+=rect(cx-lw-42,Y.pis-26,2*lw+84,52,{fill:"none",r:10,stroke:"var(--accent)",sw:2,style:"stroke-dasharray:5 4"});
  s+=txt(cx,Y.pis-34,"tady se všechno rozhoduje",{anchor:"middle",size:10.5,w:700,fill:"var(--accent)",style:"letter-spacing:.06em"});
  /* osa energie */
  s+=line(24,44,24,308,{c:"var(--line-strong)",w:1.6});
  s+='<path d="M24 40 l-4.5 8 l9 0 z" style="fill:var(--line-strong)"/>';
  s+=txt(30,52,"energie",{size:10.5,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  /* popis částice */
  s+=txt(cx,H-8,it.f+" · "+it.nm,{anchor:"middle",size:13,w:700,fill:"var(--accent)"});
  return svg("0 0 "+W+" "+H,s,'aria-label="Diagram molekulových orbitalů kyslíku"');
}
function refreshMO(){
  var it=moItem();
  $("#moWrap").innerHTML=drawMO();
  $("#moRv").textContent=String(it.pi);
  $("#moR").value=String(it.pi);
  ro("#moRo1","Řád vazby",fixed(it.bo,1),"(8 − "+(2+it.pi)+") / 2", it.bo>=2?"pos":"neg");
  ro("#moRo2","Délka vazby",fixed(it.d,0)+" pm","nižší řád = delší vazba","");
  ro("#moRo3","Magnetismus",it.mag.indexOf("para")===0?"paramagnetický":"diamagnetický",it.mag,"");
  say("#moSay","<b>"+it.f+" — "+it.nm+".</b> "+it.say);
  segSet("#moSeg",String(it.pi));
}
function initMO(){
  $("#moR").addEventListener("input",function(){ moState.pi=+this.value; refreshMO(); });
  $$("#moSeg button").forEach(function(b){
    b.addEventListener("click",function(){ moState.pi=+b.dataset.v; refreshMO(); });
  });
  refreshMO();
}

/* ============================================================
   8 · K2 — OZONOVÁ VRSTVA
   ============================================================ */
/* profil koncentrace ozonu: [výška km, hustota v 10¹² molekul·cm⁻³] */
var OZP=[[0,0.07],[3,0.08],[6,0.12],[9,0.5],[12,1.4],[15,2.6],[18,4.0],[20,4.7],[22,5.0],[25,4.6],[28,3.9],[31,3.1],[34,2.2],[37,1.4],[40,0.9],[43,0.55],[46,0.33],[50,0.18]];
function ozAt(h){
  for(var i=1;i<OZP.length;i++){
    if(h<=OZP[i][0]){
      var a=OZP[i-1], b=OZP[i], t=(h-a[0])/(b[0]-a[0]);
      return a[1]+(b[1]-a[1])*t;
    }
  }
  return OZP[OZP.length-1][1];
}
/* podíl celkového sloupce ozonu nad danou výškou (0–1) */
function ozAbove(h){
  var tot=0, above=0;
  for(var i=1;i<OZP.length;i++){
    var a=OZP[i-1], b=OZP[i], dz=b[0]-a[0], av=(a[1]+b[1])/2;
    tot+=av*dz;
    if(a[0]>=h) above+=av*dz;
    else if(b[0]>h){ var f=(b[0]-h)/dz; above+=av*dz*f; }
  }
  return above/tot;
}
var ozState={mode:"prof", h:25};
function drawOz(){
  var W=780, H=320, s="";
  if(ozState.mode==="prof"){
    var X0=90, X1=470, Y0=40, Y1=280;
    function fy(km){ return Y1-(km/50)*(Y1-Y0); }
    function fx(v){ return X0+(v/5.4)*(X1-X0); }
    /* pozadí vrstev */
    s+=rect(X0,fy(50),X1-X0,fy(12)-fy(50),{fill:"var(--endo-soft)",style:"fill-opacity:.5"});
    s+=rect(X0,fy(12),X1-X0,Y1-fy(12),{fill:"var(--exo-soft)",style:"fill-opacity:.4"});
    s+=txt(X1-8,fy(40),"STRATOSFÉRA",{anchor:"end",size:10,w:700,fill:"var(--endo)",style:"letter-spacing:.1em"});
    s+=txt(X1-8,fy(4),"TROPOSFÉRA",{anchor:"end",size:10,w:700,fill:"var(--exo)",style:"letter-spacing:.1em"});
    /* mřížka a osy */
    for(var k=0;k<=50;k+=10){
      s+=line(X0,fy(k),X1,fy(k),{c:"var(--grid)",w:1});
      s+=txt(X0-8,fy(k)+4,String(k),{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true});
    }
    s+=txt(X0-8,Y0-14,"km",{anchor:"end",size:10.5,fill:"var(--ink-3)"});
    s+=line(X0,Y0,X0,Y1,{c:"var(--line-strong)",w:1.6});
    s+=line(X0,Y1,X1,Y1,{c:"var(--line-strong)",w:1.6});
    s+=txt((X0+X1)/2,Y1+26,"koncentrace ozonu  [10¹² molekul·cm⁻³]",{anchor:"middle",size:11,fill:"var(--ink-3)"});
    /* křivka */
    var d=OZP.map(function(p){ return "L"+fx(p[1]).toFixed(1)+" "+fy(p[0]).toFixed(1); }).join(" ");
    s+='<path d="M'+fx(0)+' '+fy(0)+' '+d.slice(1)+' L'+fx(0)+' '+fy(50)+' Z" style="fill:var(--accent);fill-opacity:.16"/>';
    s+='<path d="M'+d.slice(1)+'" style="fill:none;stroke:var(--accent);stroke-width:2.6;stroke-linejoin:round"/>';
    /* značka výšky */
    var hv=ozState.h, cv=ozAt(hv);
    s+=line(X0,fy(hv),X1,fy(hv),{c:"var(--accent)",w:1.6,dash:"5 4"});
    s+='<circle cx="'+fx(cv).toFixed(1)+'" cy="'+fy(hv).toFixed(1)+'" r="6" style="fill:var(--accent);stroke:var(--paper);stroke-width:2"/>';
    s+=txt(X1+8,fy(hv)+4,fixed(hv,0)+" km",{size:12,w:700,fill:"var(--accent)",mono:true});
    /* pravý panel — co se v té výšce děje */
    var PX=520;
    s+=rect(PX,40,244,240,{fill:"var(--surface-2)",r:12,stroke:"var(--line)",sw:1.2});
    var info;
    if(hv>=35) info=["nad vrstvou","Ultrafialové UV‑C je tak silné, že tu štěpí přímo molekuly O₂. Ozonu je málo, protože je řídký vzduch — chybí partner M, který odvádí energii."];
    else if(hv>=15) info=["ozonová vrstva","Optimální kombinace: dost UV na štěpení O₂ a zároveň dost hustý vzduch. Tady vzniká i zaniká většina ozonu a pohlcuje se UV‑B."];
    else if(hv>=10) info=["spodní okraj","UV sem už skoro nepronikne, takže se ozon netvoří. To, co tu je, sem přišlo prouděním shora."];
    else info=["přízemní vrstva","Ozon tu není užitečný, ale škodlivý — vzniká z výfukových plynů za slunečního svitu a dráždí dýchací cesty. Imisní limit je 120 µg·m⁻³."];
    s+=txt(PX+18,72,info[0].toUpperCase(),{size:10.5,w:700,fill:"var(--accent)",style:"letter-spacing:.1em"});
    var words=info[1].split(" "), lineArr=[], cur="";
    words.forEach(function(w){ if((cur+" "+w).length>34){ lineArr.push(cur); cur=w; } else cur=cur?cur+" "+w:w; });
    lineArr.push(cur);
    lineArr.forEach(function(l,i){ s+=txt(PX+18,98+i*18,l,{size:11.5,fill:"var(--ink-2)"}); });
    var pct=ozAbove(hv)*100;
    s+=txt(PX+18,254,"nad touto výškou je "+fixed(pct,0)+" % veškerého ozonu",{size:11.5,w:600,fill:"var(--ink)"});
  } else if(ozState.mode==="chap"){
    var bw=176, bh=54;
    function box(x,y,t1,t2,col){
      var q=rect(x,y,bw,bh,{fill:"var(--surface-2)",r:10,stroke:col,sw:1.8});
      q+=txt(x+bw/2,y+24,t1,{anchor:"middle",size:13.5,w:700,fill:col});
      q+=txt(x+bw/2,y+42,t2,{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
      return q;
    }
    s+=txt(W/2,28,"CHAPMANŮV CYKLUS — OZON SE POŘÁD TVOŘÍ I ZANIKÁ",{anchor:"middle",size:11,w:700,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
    s+=box(60,60,"O₂","molekulární kyslík","var(--endo)");
    s+=box(302,60,"2 O","atomární kyslík","var(--warn)");
    s+=box(544,60,"O₃","ozon","var(--accent)");
    s+=box(302,208,"O₂ + O","zpět na začátku","var(--endo)");
    s+=hArrow(240,300,87,"var(--exo)","1 ·  O₂ + hν → 2 O   (λ < 240 nm)",true);
    s+=hArrow(482,542,87,"var(--endo)","2 ·  O + O₂ + M → O₃ + M",true);
    s+=hArrow(632,632,120,"var(--accent)","",false);
    s+=line(632,120,632,182,{c:"var(--accent)",w:2.2});
    s+=line(632,182,482,182,{c:"var(--accent)",w:2.2});
    s+='<path d="M478 182 l7 -4.5 l0 9 z" style="fill:var(--accent)"/>';
    s+=txt(628,152,"3 ·  O₃ + hν → O₂ + O",{anchor:"end",size:11.5,w:600,fill:"var(--accent)"});
    s+=txt(628,168,"pohltí se UV‑B a UV‑C",{anchor:"end",size:10.5,fill:"var(--ink-3)"});
    s+=line(148,120,148,236,{c:"var(--exo)",w:2.2});
    s+=line(148,236,298,236,{c:"var(--exo)",w:2.2});
    s+='<path d="M302 236 l-7 -4.5 l0 9 z" style="fill:var(--exo)"/>';
    s+=txt(158,190,"4 ·  O + O₃ → 2 O₂",{size:11.5,w:600,fill:"var(--exo)"});
    s+=txt(W/2,296,"Kroky 2 a 3 běží pořád dokola a při každém průchodu se jedno kvantum ultrafialového záření promění na teplo.",{anchor:"middle",size:11.5,fill:"var(--ink-2)"});
  } else {
    var col="var(--bad)";
    s+=txt(W/2,28,"KATALYTICKÝ ROZKLAD OZONU CHLOREM Z FREONŮ",{anchor:"middle",size:11,w:700,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
    s+=rect(40,58,220,52,{fill:"var(--surface-2)",r:10,stroke:"var(--ink-3)",sw:1.4});
    s+=txt(150,90,"CCl₂F₂ + hν → CClF₂ + Cl",{anchor:"middle",size:12.5,w:700,fill:"var(--ink)"});
    s+=txt(150,124,"freon se ve stratosféře rozštěpí",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
    var ccx=520, ccy=170, R=86;
    s+='<circle cx="'+ccx+'" cy="'+ccy+'" r="'+R+'" style="fill:none;stroke:'+col+';stroke-width:2.4;stroke-dasharray:8 5"/>';
    s+=atom(ccx-R,ccy,26,"Cl",col,"var(--accent-ink)",15);
    s+=atom(ccx+R,ccy,26,"ClO",col,"var(--accent-ink)",13);
    s+=txt(ccx,ccy-R-14,"Cl + O₃ → ClO + O₂",{anchor:"middle",size:12.5,w:700,fill:col});
    s+=txt(ccx,ccy+R+26,"ClO + O → Cl + O₂",{anchor:"middle",size:12.5,w:700,fill:col});
    s+='<path d="M'+(ccx-40)+' '+(ccy-76)+' A 86 86 0 0 1 '+(ccx+40)+' '+(ccy-76)+'" style="fill:none;stroke:'+col+';stroke-width:2.4"/>';
    s+='<path d="M'+(ccx+40)+' '+(ccy-76)+' l-9 -4 l4 9 z" style="fill:'+col+'"/>';
    s+='<path d="M'+(ccx+40)+' '+(ccy+76)+' A 86 86 0 0 1 '+(ccx-40)+' '+(ccy+76)+'" style="fill:none;stroke:'+col+';stroke-width:2.4"/>';
    s+='<path d="M'+(ccx-40)+' '+(ccy+76)+' l9 4 l-4 -9 z" style="fill:'+col+'"/>';
    s+=hArrow(266,ccx-R-34,ccy,col,"",true);
    s+=txt(ccx,ccy-6,"chlor se",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
    s+=txt(ccx,ccy+12,"nespotřebovává",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
    s+=rect(40,176,220,96,{fill:"var(--bad-soft)",r:10,stroke:col,sw:1.4});
    s+=txt(150,204,"součet obou kroků:",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
    s+=txt(150,228,"O + O₃ → 2 O₂",{anchor:"middle",size:14,w:700,fill:col});
    s+=txt(150,252,"jeden atom Cl zničí ~10⁵ molekul O₃",{anchor:"middle",size:10.5,w:600,fill:"var(--ink-2)"});
    s+=txt(W/2,300,"Montrealský protokol (1987) výrobu freonů zakázal. Vrstva se zotavuje — návrat na úroveň roku 1980 se čeká kolem roku 2040, nad Antarktidou 2066.",{anchor:"middle",size:11.5,fill:"var(--ink-2)"});
  }
  return svg("0 0 "+W+" "+H,s,'aria-label="Ozonová vrstva — profil a mechanismy"');
}
function refreshOz(){
  $("#ozWrap").innerHTML=drawOz();
  $("#ozHv").textContent=fixed(ozState.h,0)+" km";
  var c=ozAt(ozState.h);
  ro("#ozRo1","Výška nad zemí",fixed(ozState.h,0)+" km",ozState.h>=12?"stratosféra":"troposféra","");
  ro("#ozRo2","Koncentrace ozonu",fixed(c,2)+"·10¹²","molekul·cm⁻³ (maximum ≈ 5,0 při 22 km)", c>3?"pos":"");
  ro("#ozRo3","Ozon nad touto výškou",fixed(ozAbove(ozState.h)*100,0)+" %","z celkového sloupce ≈ 300 DU","");
  var t;
  if(ozState.mode==="prof"){
    t="Celý sloupec ozonu má po stlačení na tlak u&nbsp;hladiny moře tloušťku jen <b>3 mm</b> (300 Dobsonových jednotek). Přesto zachytí prakticky všechno UV‑C a&nbsp;většinu UV‑B. Když hodnota klesne pod 220 DU, mluvíme o&nbsp;<b>ozonové díře</b>.";
  } else if(ozState.mode==="chap"){
    t="Klíčová myšlenka: ozonová vrstva <b>není zásoba</b>, ale <b>rovnovážný stav</b>. Ozon se pořád tvoří a&nbsp;pořád zaniká, a&nbsp;právě to opakované štěpení pohlcuje ultrafialové záření. Kdyby se cyklus zastavil, vrstva by se do pár let rozpadla.";
  } else {
    t="Freony byly navržené jako <b>netečné</b> — a&nbsp;právě to byl problém. V&nbsp;troposféře je nic nerozloží, takže se dostanou až tam, kde je tvrdé UV rozštěpí. Uvolněný chlor pak funguje jako <b>katalyzátor</b>: z&nbsp;cyklu vystoupí nezměněný a&nbsp;jde na další ozon.";
  }
  say("#ozSay",t);
  segSet("#ozSeg",ozState.mode);
}
function initOz(){
  $("#ozH").addEventListener("input",function(){ ozState.h=+this.value; refreshOz(); });
  $$("#ozSeg button").forEach(function(b){
    b.addEventListener("click",function(){ ozState.mode=b.dataset.v; refreshOz(); });
  });
  refreshOz();
}

/* ============================================================
   9 · K3 — PROHLEDÁVATELNÁ TABULKA OXIDŮ
   ============================================================ */
var otState={q:"", ab:"all", b:"all"};
function drawOxidTable(){
  var q=otState.q.toLowerCase().trim();
  var rows=OXID.filter(function(o){
    if(otState.ab!=="all" && o.ab!==otState.ab) return false;
    if(otState.b!=="all" && o.b!==otState.b) return false;
    if(!q) return true;
    return (o.f+" "+o.n+" "+o.rw+" "+o.use+" "+ABLBL[o.ab]+" "+BLBL[o.b]+" "+o.ox).toLowerCase().indexOf(q)>=0;
  });
  var h="";
  rows.forEach(function(o){
    h+='<tr><td class="chem" style="font-weight:700;white-space:nowrap">'+o.f+'</td>'+
       '<td style="font-size:.88rem">'+o.n+'</td>'+
       '<td style="font-size:.82rem;color:var(--ink-2)">'+BLBL[o.b]+'</td>'+
       '<td style="font-size:.85rem;font-weight:600;color:'+ABCOL[o.ab]+'">'+ABLBL[o.ab]+'</td>'+
       '<td class="chem" style="font-size:.8rem;color:var(--ink-2);line-height:1.5">'+o.rw+'</td>'+
       '<td style="font-size:.8rem;color:var(--ink-2);line-height:1.45">'+o.use+'</td></tr>';
  });
  if(!rows.length) h='<tr><td colspan="6" style="padding:1.1rem;color:var(--ink-3)">Nic nenalezeno. Zkuste „amfoterní“, „vápno“, „sklo“, „Al“ nebo „netečný“.</td></tr>';
  $("#otBody").innerHTML=h;
  var nz=rows.filter(function(o){return o.ab==="zas";}).length;
  var nk=rows.filter(function(o){return o.ab==="kys";}).length;
  var na=rows.filter(function(o){return o.ab==="amf";}).length;
  var nn=rows.filter(function(o){return o.ab==="net";}).length;
  $("#otCount").innerHTML="Zobrazeno <b>"+rows.length+"</b> z&nbsp;"+OXID.length+" oxidů &nbsp;·&nbsp; "+
    '<span style="color:'+ABCOL.zas+'">zásadotvorných '+nz+'</span> · '+
    '<span style="color:'+ABCOL.kys+'">kyselinotvorných '+nk+'</span> · '+
    '<span style="color:'+ABCOL.amf+'">amfoterních '+na+'</span> · '+
    '<span style="color:'+ABCOL.net+'">netečných '+nn+'</span>';
  segSet("#otFilter",otState.ab);
  segSet("#otBond",otState.b);
}
function initOxidTable(){
  $("#otSearch").addEventListener("input",function(){ otState.q=this.value; drawOxidTable(); });
  $$("#otFilter button").forEach(function(b){ b.addEventListener("click",function(){ otState.ab=b.dataset.v; drawOxidTable(); }); });
  $$("#otBond button").forEach(function(b){ b.addEventListener("click",function(){ otState.b=b.dataset.v; drawOxidTable(); }); });
  drawOxidTable();
}

/* ============================================================
   10 · K3 — PEROXID VODÍKU: DVOJÍ ROLE
   ============================================================ */
var hpState={id:"ki"};
function hpItem(){ for(var i=0;i<HPR.length;i++) if(HPR[i].id===hpState.id) return HPR[i]; return HPR[0]; }
function drawHp(){
  var it=hpItem(), W=780, H=200, s="";
  var up = it.role==="red" || it.role==="oba";
  var down = it.role==="ox" || it.role==="oba";
  /* osa oxidačního čísla kyslíku */
  var X=W/2, Y0=48, Y1=164;
  function yv(v){ /* v: 0 nahoře, −II dole */ return Y0+((0-v)/2)*(Y1-Y0); }
  s+=line(X,Y0-14,X,Y1+14,{c:"var(--line-strong)",w:1.8});
  [[0,"0","volný kyslík O₂","var(--exo)"],[-1,"−I","peroxid H₂O₂","var(--accent)"],[-2,"−II","voda, oxidy","var(--endo)"]].forEach(function(p){
    var y=yv(p[0]);
    s+=line(X-14,y,X+14,y,{c:p[3],w:2.6,cap:"round"});
    s+=txt(X-24,y+5,p[1],{anchor:"end",size:14,w:700,fill:p[3],mono:true});
    s+=txt(X+24,y+5,p[2],{size:11.5,fill:"var(--ink-2)"});
  });
  s+=txt(X-24,Y0-26,"oxidační číslo kyslíku",{anchor:"end",size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  /* šipky podle role */
  if(down){
    s+=vArrow(X-88,yv(-1),yv(-2),"var(--endo)","peroxid oxiduje","left");
  }
  if(up){
    s+=vArrow(X-88,yv(-1),yv(0),"var(--exo)","peroxid se oxiduje","left");
  }
  /* pravá karta role */
  var rc = it.role==="ox" ? ["OXIDAČNÍ ČINIDLO","var(--endo)","kyslík klesá −I → −II, vzniká voda"]
         : it.role==="red" ? ["REDUKČNÍ ČINIDLO","var(--exo)","kyslík stoupá −I → 0, uniká O₂"]
         : ["OBOJÍ NAJEDNOU","var(--cat3)","disproporcionace: −I → −II i −I → 0"];
  s+=rect(W-268,52,252,96,{fill:"var(--surface-2)",r:12,stroke:rc[1],sw:1.8});
  s+=txt(W-142,86,rc[0],{anchor:"middle",size:13,w:800,fill:rc[1],style:"letter-spacing:.08em"});
  s+=txt(W-142,112,rc[2],{anchor:"middle",size:11,fill:"var(--ink-2)"});
  s+=txt(W-142,134,"partner: "+it.part,{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  return svg("0 0 "+W+" "+H,s,'aria-label="Role peroxidu vodíku v redoxní reakci"');
}
function refreshHp(){
  var it=hpItem();
  $("#hpWrap").innerHTML=drawHp();
  $("#hpEq").innerHTML='<span class="chem">'+it.eq+'</span>';
  var lbl = it.role==="ox" ? "oxidační činidlo" : (it.role==="red" ? "redukční činidlo" : "oxidační i redukční");
  ro("#hpRo1","Role peroxidu",lbl,it.part, it.role==="ox"?"pos":"neg");
  ro("#hpRo2","Změny oxidačních čísel",it.chg,"sledujte kyslík v peroxidu","");
  say("#hpSay",it.say);
}
function initHp(){
  $("#hpSel").innerHTML=HPR.map(function(h){
    var t = h.role==="ox"?"oxiduje":(h.role==="red"?"je oxidován":"obojí");
    return '<option value="'+h.id+'">'+h.part+' — peroxid '+t+'</option>';
  }).join("");
  $("#hpSel").value=hpState.id;
  $("#hpSel").addEventListener("change",function(){ hpState.id=this.value; refreshHp(); });
  refreshHp();
}
