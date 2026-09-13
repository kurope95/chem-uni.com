/* ============================================================
   11 · k2 — PROHLEDÁVATELNÁ TABULKA VLASTNOSTÍ KOVŮ
   ============================================================ */
var MRNM={kpc:"plošně centr.",hex:"hexagonální",kpr:"prostorově centr.",jina:"jiná"};
var SUPCH={"0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹","-":"⁻","+":"⁺"};
function sup(n){ return String(n).split("").map(function(c){ return SUPCH[c]||c; }).join(""); }
var SUBCH={"0":"₀","1":"₁","2":"₂","3":"₃","4":"₄","5":"₅","6":"₆","7":"₇","8":"₈","9":"₉"};
/* vzorce se sázejí dolním indexem — Ag₂O, ne Ag²O */
function sub(n){ return String(n).split("").map(function(c){ return SUBCH[c]||c; }).join(""); }
function abFmt(a){
  if(a>=0.001) return fmt(a,3);
  var e=Math.floor(Math.log(a)/Math.LN10), m=a/Math.pow(10,e);
  return fmt(m,1)+"·10"+sup(e);
}
function drawKovyTab(){
  var q=($("#tkQ").value||"").trim().toLowerCase();
  var cat=$("#tkCat").value, sort=$("#tkSort").value;
  var rows=KOVY.filter(function(k){
    if(cat==="usl"){ if(k.E<=0) return false; }
    else if(cat==="lehky"){ if(k.rho>=5) return false; }
    else if(cat && k.cat!==cat) return false;
    if(!q) return true;
    return (k.s+" "+k.n+" "+k.ruda+" "+k.vyr+" "+k.uzit).toLowerCase().indexOf(q)>=0;
  });
  rows.sort(function(a,b){
    if(sort==="z") return a.z-b.z;
    if(sort==="E") return b.E-a.E;
    if(sort==="ab") return b.ab-a.ab;
    return b[sort]-a[sort];
  });
  $("#tkBody").innerHTML = rows.length ? rows.map(function(k){
    return '<tr><td><b>'+k.s+'</b> <span style="color:var(--ink-3)">'+k.n+'</span><br>'+
      '<span class="eyebrow" style="font-size:.68rem">'+CATNM[k.cat]+'</span></td>'+
      '<td class="n">'+k.g+'</td>'+
      '<td class="n">'+fmt(k.rho,3)+'</td>'+
      '<td class="n">'+fmt(k.tt,1)+'</td>'+
      '<td class="n">'+fmt(k.tv,0)+'</td>'+
      '<td class="n">'+fmt(k.sig,2)+'</td>'+
      '<td class="n" style="color:'+(k.E>0?"var(--exo)":"var(--endo)")+'">'+sgn(k.E,2)+'</td>'+
      '<td>'+MRNM[k.mr]+'</td>'+
      '<td style="font-size:.82rem">'+k.ruda+'</td></tr>';
  }).join("") : '<tr><td colspan="9" style="text-align:center;color:var(--ink-3);padding:1.4rem">Nic nenalezeno — zkuste jiný dotaz nebo zrušte filtr.</td></tr>';
  var extreme="";
  if(rows.length>1){
    var f=rows[0], l=rows[rows.length-1];
    var nm={z:"protonovému číslu",rho:"hustotě",tt:"teplotě tání",sig:"vodivosti",E:"potenciálu",ab:"zastoupení v kůře"}[sort];
    extreme=" · seřazeno podle "+nm+", od "+f.n+" po "+l.n;
  }
  $("#tkCount").textContent="Zobrazeno "+rows.length+" z "+KOVY.length+" kovů"+extreme+".";
}

/* ============================================================
   12 · k2 — GRAF TRENDU VLASTNOSTI
   ============================================================ */
var TRSETS = {
  "4":   {nm:"4. perioda: K až Zn", list:["K","Ca","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn"]},
  "alk": {nm:"alkalické kovy a kovy alkalických zemin", list:["Li","Na","K","Be","Mg","Ca","Sr","Ba"]},
  "tech":{nm:"technicky nejdůležitější kovy", list:["Al","Fe","Cu","Zn","Pb","Sn","Ni","Cr","Ti","Mg","W","Ag"]},
  "usl": {nm:"od nejneušlechtilejšího po nejušlechtilejší", list:["K","Na","Mg","Al","Ti","Mn","Zn","Cr","Fe","Ni","Sn","Pb","Cu","Ag","Pt"]}
};
var TRPROP = {
  tt: {nm:"teplota tání", u:"°C", f:1},
  rho:{nm:"hustota", u:"g·cm⁻³", f:2},
  sig:{nm:"měrná elektrická vodivost", u:"MS·m⁻¹", f:1},
  en: {nm:"elektronegativita", u:"", f:2},
  E:  {nm:"standardní redukční potenciál", u:"V", f:2}
};
function drawTrend(){
  var pk=$("#trProp").value, sk=$("#trPer").value;
  var pr=TRPROP[pk], set=TRSETS[sk];
  var data=set.list.map(function(s){ return K_(s); }).filter(function(k){ return k; });
  if(sk==="usl") data.sort(function(a,b){ return a.E-b.E; });
  var W=760, H=300, s='', x0=56, y0=52, gw=W-96, gh=H-118;
  var vals=data.map(function(k){ return k[pk]; });
  var vmin=Math.min.apply(null,vals), vmax=Math.max.apply(null,vals);
  if(vmin>0) vmin=0;
  if(vmax<0) vmax=0;
  var pad=(vmax-vmin)*0.08 || 1; vmax+=pad; vmin-=pad;
  function Y(v){ return y0+gh-(v-vmin)/(vmax-vmin)*gh; }
  s+=panelTitle(pr.nm+(pr.u?" ["+pr.u+"]":"")+" · "+set.nm);
  /* mřížka */
  for(var i=0;i<=4;i++){
    var vv=vmin+(vmax-vmin)*i/4, yy=Y(vv);
    s+=line(x0,yy,x0+gw,yy,{c:"var(--grid)",w:1});
    s+=txt(x0-8,yy+4,fmt(vv,pr.f),{anchor:"end",size:10,mono:true,fill:"var(--ink-3)"});
  }
  if(vmin<0&&vmax>0) s+=line(x0,Y(0),x0+gw,Y(0),{c:"var(--line-strong)",w:1.5});
  var bw=gw/data.length;
  data.forEach(function(k,i){
    var x=x0+i*bw+bw*0.16, w=bw*0.68, v=k[pk], yv=Y(v), y00=Y(Math.max(vmin,Math.min(0,vmax)));
    var col = (pk==="E") ? (v>0?"var(--exo)":"var(--endo)") : "var(--accent)";
    s+=rect(x,Math.min(yv,y00),w,Math.abs(yv-y00),{fill:col,r:4,style:"fill-opacity:.75"});
    s+=txt(x+w/2,(v>=0?yv-6:yv+14),fmt(v,pr.f),{anchor:"middle",size:9.5,w:700,mono:true,fill:"var(--ink-2)"});
    s+=txt(x+w/2,y0+gh+18,k.s,{anchor:"middle",size:12,w:700,fill:"var(--ink)"});
  });
  s+=line(x0,y0+gh,x0+gw,y0+gh,{c:"var(--line-strong)",w:1.4});
  $("#trWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Trend vlastnosti kovů"');
  var notes={
    "tt|4":"Oblouk s&nbsp;maximem u&nbsp;vanadu a&nbsp;chromu. Vlevo má draslík k&nbsp;dispozici jediný elektron, uprostřed se do vazby zapojí i&nbsp;elektrony d, a&nbsp;u&nbsp;zinku je slupka d&nbsp;zaplněná a&nbsp;vazbě už nepomáhá — proto zinek taje o&nbsp;1100 °C níž než chrom.",
    "tt|alk":"Ve skupině 1 i&nbsp;2 teplota tání <b>klesá</b> dolů skupinou: atom je větší, náboj kationtu se rozprostře do většího objemu a&nbsp;vazba slábne. A&nbsp;kovy skupiny 2 tají výrazně výš, protože dávají dva elektrony místo jednoho.",
    "E|usl":"Tohle je Beketovova řada. Vlevo jsou kovy neušlechtilé, které se snadno oxidují a&nbsp;musí se vyrábět elektrolýzou, vpravo ušlechtilé, které se v&nbsp;přírodě vyskytují i&nbsp;ryzí.",
    "rho|tech":"Hranice mezi lehkými a&nbsp;těžkými kovy je 5&nbsp;g·cm⁻³. Hořčík, hliník a&nbsp;titan jsou pod ní — proto se z&nbsp;nich staví letadla.",
    "sig|tech":"Stříbro a&nbsp;měď vedou nejlépe. Všimněte si ale, že hliník s&nbsp;37,7 vede sice hůř, jenže při třetinové hustotě — a&nbsp;právě proto se z&nbsp;něj dělají dálková vedení."
  };
  $("#trNote").innerHTML = notes[pk+"|"+sk] ||
    ("Sledujte, jestli hodnoty rostou nebo klesají systematicky. U&nbsp;kovů skoro vždy platí, že vlastnost souvisí s&nbsp;<b>pevností kovové vazby</b> — a&nbsp;ta roste s&nbsp;počtem odevzdaných elektronů a&nbsp;klesá s&nbsp;rostoucím poloměrem atomu.");
}

/* ============================================================
   13 · k3 — SUBSTITUČNÍ × INTERSTICIÁLNÍ SLITINA
   ============================================================ */
var ATR = [
 {s:"Cu", n:"měď",     r:128, mr:"kpc", host:true},
 {s:"Fe", n:"železo",  r:126, mr:"kpr", host:true},
 {s:"Al", n:"hliník",  r:143, mr:"kpc", host:true},
 {s:"Ni", n:"nikl",    r:124, mr:"kpc", host:true},
 {s:"Ag", n:"stříbro", r:144, mr:"kpc", host:true},
 {s:"Zn", n:"zinek",   r:134, mr:"hex", host:true},
 {s:"Au", n:"zlato",   r:144, mr:"kpc", host:false},
 {s:"Sn", n:"cín",     r:140, mr:"jina",host:false},
 {s:"Pb", n:"olovo",   r:175, mr:"kpc", host:false},
 {s:"Cr", n:"chrom",   r:128, mr:"kpr", host:false},
 {s:"Mn", n:"mangan",  r:127, mr:"jina",host:false},
 {s:"Mg", n:"hořčík",  r:160, mr:"hex", host:false},
 {s:"Ti", n:"titan",   r:147, mr:"hex", host:false},
 {s:"C",  n:"uhlík",   r:77,  mr:"—",   host:false},
 {s:"N",  n:"dusík",   r:75,  mr:"—",   host:false},
 {s:"B",  n:"bor",     r:88,  mr:"—",   host:false},
 {s:"H",  n:"vodík",   r:37,  mr:"—",   host:false}
];
function A_(s){ for(var i=0;i<ATR.length;i++){ if(ATR[i].s===s) return ATR[i]; } return null; }
var SLPAIR = {
 "Cu|Zn":"mosaz", "Cu|Sn":"bronz", "Cu|Ni":"konstantan a mincovní slitiny", "Cu|Au":"šperkařské zlato",
 "Al|Cu":"dural (spolu s Mg a Mn)", "Al|Mg":"magnalium", "Fe|C":"ocel a litina", "Fe|Cr":"nerezavějící ocel",
 "Fe|Ni":"invar a magnetické slitiny", "Fe|Mn":"manganová ocel", "Ag|Au":"neomezeně mísitelná dvojice",
 "Fe|N":"nitridovaná povrchová vrstva", "Ni|Cr":"nichrom", "Cu|Al":"hliníkový bronz", "Ti|Al":"letecké slitiny titanu"
};
function drawSlit(){
  var h=A_($("#slHost").value), g=A_($("#slGuest").value);
  var W=760, H=322, s='';
  var dr=Math.abs(h.r-g.r)/h.r*100;
  var ratio=g.r/h.r;
  var typ, verd, col;
  if(h.s===g.s){ typ="—"; verd="Vyberte dvě různé složky."; col="var(--ink-3)"; }
  else if(dr<=15){ typ="substituční"; verd="Substituční tuhý roztok je možný — rozdíl poloměrů je "+fmt(dr,1)+" %, tedy pod 15 %."; col="var(--ok)"; }
  else if(ratio<=0.60){ typ="intersticiální"; verd="Substituce vyloučena, ale příměs je dost malá (r/R = "+fmt(ratio,2)+"), takže se vejde do dutiny — vznikne intersticiální tuhý roztok."; col="var(--accent)"; }
  else { typ="nemísitelné"; verd="Rozdíl poloměrů je "+fmt(dr,1)+" %, tedy nad 15 %, a&nbsp;příměs je zároveň příliš velká na dutinu. Kovy se v&nbsp;pevném stavu nemísí a&nbsp;ztuhnou jako oddělená zrna."; col="var(--bad)"; }
  s+=panelTitle("hostitel "+h.n+" · příměs "+g.n+" · typ: "+typ);
  /* mřížka hostitele */
  var cx=52, cy=64, R=20, cols=6, rows=4;
  var subI=7, intI=9;
  for(var j=0;j<rows;j++) for(var i=0;i<cols;i++){
    var idx=j*cols+i, x=cx+30+i*(2*R+8)+(j%2?R+4:0), y=cy+30+j*(2*R+8);
    if(typ==="substituční" && idx===subI){
      s+=circ(x,y,R*Math.min(1.35,Math.max(0.7,ratio)),{fill:"var(--accent)",stroke:"var(--paper)",sw:2});
      s+=txt(x,y+4,g.s,{anchor:"middle",size:11,w:700,fill:"var(--accent-ink)"});
    } else {
      s+=circ(x,y,R,{fill:"var(--endo)",stroke:"var(--paper)",sw:2,style:"fill-opacity:.75"});
      s+=txt(x,y+4,h.s,{anchor:"middle",size:10.5,w:600,fill:"var(--ink)"});
    }
  }
  if(typ==="intersticiální"){
    [[1,0],[3,1],[2,2]].forEach(function(p){
      var x=cx+30+p[0]*(2*R+8)+(p[1]%2?R+4:0)+R+4, y=cy+30+p[1]*(2*R+8)+R+4;
      s+=circ(x,y,Math.max(5,R*ratio*0.75),{fill:"var(--accent)",stroke:"var(--paper)",sw:1.5});
    });
    s+=txt(cx+30,cy+30+rows*(2*R+8)+20,"malé atomy "+g.s+" sedí v&nbsp;dutinách mezi atomy "+h.s,{size:11,w:600,fill:"var(--accent)"});
  } else if(typ==="substituční"){
    s+=txt(cx+30,cy+30+rows*(2*R+8)+20,"atom "+g.s+" nahradil atom "+h.s+" v&nbsp;uzlovém bodě mřížky",{size:11,w:600,fill:"var(--accent)"});
  } else if(typ==="nemísitelné"){
    s+=txt(cx+30,cy+30+rows*(2*R+8)+20,"cizí atom se do mřížky nevejde ani jedním způsobem",{size:11,w:600,fill:"var(--bad)"});
  }
  /* měřítko poloměrů */
  var bx=470, by=70;
  s+=txt(bx,by-16,"ATOMOVÝ POLOMĚR [pm]",{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
  s+=circ(bx+52,by+52,52*h.r/180,{fill:"var(--endo)",stroke:"var(--paper)",sw:2,style:"fill-opacity:.7"});
  s+=txt(bx+52,by+56,h.s+" "+h.r,{anchor:"middle",size:11,w:700,fill:"var(--ink)"});
  s+=circ(bx+170,by+52,52*g.r/180,{fill:"var(--accent)",stroke:"var(--paper)",sw:2,style:"fill-opacity:.8"});
  s+=txt(bx+170,by+56,g.s+" "+g.r,{anchor:"middle",size:11,w:700,fill:"var(--ink)"});
  /* pás rozdílu */
  var px=bx, pw=220, py=by+130;
  s+=txt(px,py-8,"ROZDÍL POLOMĚRŮ [%] — MEZ 15",{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.05em"});
  s+=rect(px,py,pw,18,{fill:"var(--surface-3)",r:5});
  s+=rect(px,py,pw*Math.min(1,dr/40),18,{fill:col,r:5,style:"fill-opacity:.8"});
  s+=line(px+pw*15/40,py-4,px+pw*15/40,py+22,{c:"var(--warn)",w:2});
  s+=txt(px+pw*15/40+4,py+34,"15 %",{size:10,w:700,fill:"var(--warn)"});
  s+=txt(px+pw+8,py+14,fmt(dr,1)+" %",{size:12,w:700,mono:true,fill:col});
  $("#slWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Substituční nebo intersticiální slitina"');
  ro("#slRo1","rozdíl poloměrů",fmt(dr,1)+" %","|r(hostitel) − r(příměs)| / r(hostitel)", dr<=15?"pos":"neg");
  ro("#slRo2","poměr r(příměs)/r(hostitel)",fmt(ratio,2),ratio<=0.60?"dost malý na dutinu":"na dutinu příliš velký", ratio<=0.60?"pos":"");
  ro("#slRo3","typ tuhého roztoku",typ==="—"?"—":typ, h.mr===g.mr&&h.mr!=="—"?"navíc shodný typ mřížky":"typ mřížky se liší nebo příměs není kov","");
  var known=SLPAIR[h.s+"|"+g.s]||SLPAIR[g.s+"|"+h.s];
  $("#slVerd").innerHTML="<b>"+verd+"</b>"+(known?'<br><span style="color:var(--ink-3)">Známá slitina této dvojice: <b>'+known+'</b>.</span>':"");
  $("#slNote").innerHTML = typ==="substituční"
    ? "Rozdíl poloměrů je pod patnácti procenty, takže <b>první</b> Hume‑Rotheryho podmínka je splněna. Pozor ale — je nutná, ne postačující: rozhoduje i&nbsp;typ mřížky, mocenství a&nbsp;elektronegativita. Proto se hliník s&nbsp;mědí neomezeně nemísí, i&nbsp;když je rozdíl jen 10,5 %."
    : (typ==="intersticiální"
    ? "Substituce nepřipadá v&nbsp;úvahu, ale příměs je natolik menší, že se vtěsná do dutiny. Mřížka se přitom napne, a&nbsp;právě to napětí brání pohybu poruch — proto je materiál <b>tvrdší a&nbsp;pevnější, ale méně tvárný</b>."
    : "Ani jedna cesta nefunguje: na substituci je rozdíl příliš velký a&nbsp;na dutinu je příměs příliš objemná. Kovy ztuhnou vedle sebe jako <b>heterogenní směs</b> zrn — čehož se dá využít třeba u&nbsp;ložiskových slitin mědi s&nbsp;olovem.");
}
function initSlit(){
  var hosts=ATR.filter(function(a){return a.host;});
  $("#slHost").innerHTML=hosts.map(function(a){ return '<option value="'+a.s+'">'+a.n+' ('+a.s+', '+a.r+' pm)</option>'; }).join("");
  $("#slGuest").innerHTML=ATR.map(function(a){ return '<option value="'+a.s+'">'+a.n+' ('+a.s+', '+a.r+' pm)</option>'; }).join("");
  $("#slHost").value="Cu"; $("#slGuest").value="Zn";
  $("#slHost").addEventListener("change",drawSlit);
  $("#slGuest").addEventListener("change",drawSlit);
  drawSlit();
}

/* ============================================================
   14 · k3 — TABULKA SLITIN
   ============================================================ */
var TYPNM={sub:"substituční",int:"intersticiální","sub+int":"substituční i intersticiální",im:"s intermetalickou fází"};
function drawSlitTab(){
  var q=($("#alQ").value||"").trim().toLowerCase(), t=$("#alType").value;
  var rows=SLIT.filter(function(a){
    if(t && a.typ.indexOf(t)<0) return false;
    if(!q) return true;
    return (a.nm+" "+a.sl+" "+a.vl+" "+a.uz).toLowerCase().indexOf(q)>=0;
  });
  $("#alBody").innerHTML = rows.length ? rows.map(function(a){
    return '<tr><td><b>'+a.nm+'</b></td><td class="chem" style="font-size:.85rem">'+a.sl+'</td>'+
      '<td><span class="tag">'+(TYPNM[a.typ]||a.typ)+'</span></td>'+
      '<td class="n" style="font-size:.85rem">'+a.tt+'</td>'+
      '<td style="font-size:.85rem">'+a.vl+'</td><td style="font-size:.85rem">'+a.uz+'</td></tr>';
  }).join("") : '<tr><td colspan="6" style="text-align:center;color:var(--ink-3);padding:1.4rem">Nic nenalezeno — zkuste jiný dotaz nebo zrušte filtr.</td></tr>';
  $("#alCount").textContent="Zobrazeno "+rows.length+" z "+SLIT.length+" slitin.";
}
