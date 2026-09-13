/* ============================================================
   13 · LEWISOVY VZORCE A OKTET
   ============================================================ */
/* rozložení: lig = [symbol, úhel°, násobnost, volné páry na ligandu]; lp = úhly volných párů na centrálním atomu; rad = úhel nepárového e⁻ */
var LEWLAY = {
  "H₂":  {lig:[["H",0,1,0]], lp:[]},
  "Cl₂": {lig:[["Cl",0,1,3]], lp:[90,180,270]},
  "O₂":  {lig:[["O",0,2,2]], lp:[110,250]},
  "N₂":  {lig:[["N",0,3,1]], lp:[180]},
  "H₂O": {lig:[["H",232,1,0],["H",308,1,0]], lp:[60,120]},
  "NH₃": {lig:[["H",200,1,0],["H",340,1,0],["H",90,1,0]], lp:[270]},
  "CH₄": {lig:[["H",0,1,0],["H",90,1,0],["H",180,1,0],["H",270,1,0]], lp:[]},
  "CO₂": {lig:[["O",0,2,2],["O",180,2,2]], lp:[]},
  "HCN": {lig:[["H",180,1,0],["N",0,3,1]], lp:[]},
  "BF₃": {lig:[["F",90,1,3],["F",210,1,3],["F",330,1,3]], lp:[]},
  "BeCl₂":{lig:[["Cl",0,1,3],["Cl",180,1,3]], lp:[]},
  "PCl₅":{lig:[["Cl",0,1,3],["Cl",72,1,3],["Cl",144,1,3],["Cl",216,1,3],["Cl",288,1,3]], lp:[]},
  "SF₆": {lig:[["F",0,1,3],["F",60,1,3],["F",120,1,3],["F",180,1,3],["F",240,1,3],["F",300,1,3]], lp:[]},
  "NO":  {lig:[["O",0,2,2]], lp:[180], rad:270},
  "NO₂": {lig:[["O",220,2,2],["O",320,1,3]], lp:[], rad:90},
  "SO₂": {lig:[["O",220,2,2],["O",320,1,3]], lp:[90]},
  "H₃O⁺":{lig:[["H",200,1,0],["H",340,1,0],["H",90,1,0]], lp:[270], ch:"+"},
  "NH₄⁺":{lig:[["H",0,1,0],["H",90,1,0],["H",180,1,0],["H",270,1,0]], lp:[], ch:"+"}
};
var lewI=5;
function drawLewis(){
  var m=LEWIS[lewI], lay=LEWLAY[m.f];
  var W=460,H=260, cx=230, cy=130, RB=88, RA=17;
  var s='', rad=Math.PI/180;
  function pair(x,y,ang,col){ /* dva body kolmo na směr ang */
    var px=Math.cos((ang+90)*rad)*4.5, py=Math.sin((ang+90)*rad)*4.5;
    return circ(x+px,y+py,3,{fill:col})+circ(x-px,y-py,3,{fill:col});
  }
  /* vazby */
  lay.lig.forEach(function(l){
    var a=l[1]*rad, x2=cx+Math.cos(a)*RB, y2=cy+Math.sin(a)*RB, n=l[2];
    var nx=-Math.sin(a), ny=Math.cos(a);
    for(var i=0;i<n;i++){
      var off=(i-(n-1)/2)*6.5;
      s+=line(cx+Math.cos(a)*(RA+2)+nx*off, cy+Math.sin(a)*(RA+2)+ny*off, x2-Math.cos(a)*(RA+2)+nx*off, y2-Math.sin(a)*(RA+2)+ny*off,{c:"var(--accent)",w:2.6,cap:"round"});
    }
  });
  /* ligandy */
  lay.lig.forEach(function(l){
    var a=l[1]*rad, x2=cx+Math.cos(a)*RB, y2=cy+Math.sin(a)*RB;
    s+=circ(x2,y2,RA,{fill:"var(--surface)",stroke:"var(--ink-2)",sw:1.8});
    s+=txt(x2,y2+5,l[0],{anchor:"middle",size:15,w:700,fill:"var(--ink)"});
    for(var k=0;k<l[3];k++){
      var la=l[1]+180+(k-(l[3]-1)/2)*70;
      s+=pair(x2+Math.cos(la*rad)*(RA+9), y2+Math.sin(la*rad)*(RA+9), la, "var(--cat2)");
    }
  });
  /* centrální atom */
  s+=circ(cx,cy,RA+3,{fill:"var(--accent-soft)",stroke:"var(--accent)",sw:2});
  s+=txt(cx,cy+5,m.c,{anchor:"middle",size:16,w:700,fill:"var(--ink)"});
  lay.lp.forEach(function(la){ s+=pair(cx+Math.cos(la*rad)*(RA+13), cy+Math.sin(la*rad)*(RA+13), la, "var(--cat2)"); });
  if(lay.rad!==undefined){ s+=circ(cx+Math.cos(lay.rad*rad)*(RA+13), cy+Math.sin(lay.rad*rad)*(RA+13), 4, {fill:"var(--bad)"}); }
  if(lay.ch){ s+=rect(cx+RB+RA+6,cy-RB-8,26,22,{fill:"var(--surface)",r:5,stroke:"var(--line-strong)",sw:1}); s+=txt(cx+RB+RA+19,cy-RB+8,lay.ch,{anchor:"middle",size:15,w:700,fill:"var(--ink)"}); }
  s+=txt(12,22,m.f,{size:16,w:700,fill:"var(--ink)"});
  s+=txt(12,40,m.geo,{size:11,fill:"var(--ink-3)"});
  $("#lewWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Lewisův vzorec '+m.f+'"');
  function ro(id,k,v,h,c){ var e=$(id); e.innerHTML='<span class="k">'+k+'</span><span class="v" style="color:'+(c||"var(--ink)")+'">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#lewRo1","Valenční elektrony",m.val,(m.val/2)+" párů"+(m.val%2?" + 1 nepárový":""));
  ro("#lewRo2","Vazebné páry",m.bp,"sdílené, čárky","var(--accent)");
  ro("#lewRo3","Volné páry",m.lp,"nevazebné, celkem v molekule","var(--cat2)");
  var okt={ok:["oktet ✓","var(--ok)","centrální atom má 8 e⁻ (H: 2)"],"méně":["méně než oktet","var(--warn)","elektronový deficit → Lewisova kyselina"],"více":["rozšířený oktet","var(--warn)","od 3. periody, d-orbitaly"],"radikál":["radikál","var(--bad)","lichý počet e⁻, oktet nesplněn"]}[m.okt];
  ro("#lewRo4","Oktet u "+m.c,okt[0],okt[2],okt[1]);
  $("#lewNote").innerHTML="<b>Vaznost:</b> "+m.vaz+". "+m.note;
}
function initLewis(){
  var sel=$("#lewSel");
  sel.innerHTML=LEWIS.map(function(m,i){return '<option value="'+i+'">'+m.f+' — '+m.geo+(m.okt!=="ok"?" · výjimka z oktetu":"")+'</option>';}).join("");
  sel.value=String(lewI);
  sel.addEventListener("change",function(){ lewI=+sel.value; drawLewis(); });
}

/* ============================================================
   14 · PŘEKRYV ORBITALŮ — σ a π
   ============================================================ */
var ovlMode="ss";
function lobe(cx,cy,ang,len,wid,o){ /* jeden lalok p-orbitalu: elipsa otočená o ang, začínající v (cx,cy) */
  o=o||{};
  var rad=Math.PI/180, ex=cx+Math.cos(ang*rad)*len/2, ey=cy+Math.sin(ang*rad)*len/2;
  return '<ellipse cx="'+ex+'" cy="'+ey+'" rx="'+(len/2)+'" ry="'+(wid/2)+'" transform="rotate('+ang+' '+ex+' '+ey+')" style="fill:'+(o.fill||"var(--cat1)")+';fill-opacity:'+(o.op!==undefined?o.op:0.35)+';stroke:'+(o.stroke||o.fill||"var(--cat1)")+';stroke-width:1.4;'+(o.dash?"stroke-dasharray:"+o.dash+";":"")+'"/>';
}
function drawOvl(){
  var W=760,H=300, y0=150, xa=280, xb=480, s='';
  s+=line(60,y0,700,y0,{c:"var(--line-strong)",w:1.4,dash:"6 5"});
  s+=txt(696,y0-8,"spojnice jader",{anchor:"end",size:10.5,fill:"var(--ink-3)"});
  var m=ovlMode, title="", where="", rot="", note="", ro1="", ro2="", ro3="";
  if(m==="ss"){
    s+=circ(xa,y0,86,{fill:"var(--cat2)",op:0.28,stroke:"var(--cat2)",sw:1.4});
    s+=circ(xb,y0,86,{fill:"var(--cat2)",op:0.28,stroke:"var(--cat2)",sw:1.4});
    s+='<path d="M'+(xa+86)+' '+y0+' A86 86 0 0 1 '+(xb-86)+' '+y0+' A86 86 0 0 1 '+(xa+86)+' '+y0+' z" style="fill:var(--accent);fill-opacity:.55"/>';
    s+=txt(xa,y0-96,"1s (H)",{anchor:"middle",size:12,w:600,fill:"var(--cat2)"}); s+=txt(xb,y0-96,"1s (H)",{anchor:"middle",size:12,w:600,fill:"var(--cat2)"});
    title="H₂: čelní překryv s–s → vazba σ"; where="na spojnici jader"; rot="volná";
    note="Dva kulové orbitaly 1s se překryjí čelně. Elektronová hustota (červená čočka) leží <b>přímo mezi jádry</b>, symetricky kolem osy. To je nejjednodušší σ vazba — 436 kJ·mol⁻¹, délka 74 pm. Otočením kolem osy se nic nezmění → volná rotace.";
  } else if(m==="sp"){
    s+=circ(xa,y0,70,{fill:"var(--cat2)",op:0.28,stroke:"var(--cat2)",sw:1.4});
    s+=lobe(xb,y0,180,150,90,{}); s+=lobe(xb,y0,0,150,90,{op:0.18,dash:"4 3"});
    s+='<ellipse cx="'+((xa+70+xb-150)/2+22)+'" cy="'+y0+'" rx="34" ry="38" style="fill:var(--accent);fill-opacity:.55"/>';
    s+=txt(xa,y0-80,"1s (H)",{anchor:"middle",size:12,w:600,fill:"var(--cat2)"}); s+=txt(xb+40,y0-58,"2p (F)",{anchor:"middle",size:12,w:600,fill:"var(--cat1)"});
    s+=txt(xb+120,y0+62,"druhý lalok p — bez překryvu",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
    title="HF: čelní překryv s–p → vazba σ"; where="na spojnici jader"; rot="volná";
    note="Orbital 1s vodíku se překryje s&nbsp;<b>jedním lalokem</b> orbitalu 2p fluoru, který míří podél spojnice. Opět σ vazba — hustota mezi jádry. Protože je fluor mnohem elektronegativnější, je čočka posunutá k&nbsp;fluoru (polární σ vazba, 567 kJ·mol⁻¹).";
  } else if(m==="pp"){
    s+=lobe(xa,y0,0,150,90,{}); s+=lobe(xa,y0,180,150,90,{op:0.18,dash:"4 3"});
    s+=lobe(xb,y0,180,150,90,{}); s+=lobe(xb,y0,0,150,90,{op:0.18,dash:"4 3"});
    s+='<ellipse cx="'+((xa+xb)/2)+'" cy="'+y0+'" rx="36" ry="40" style="fill:var(--accent);fill-opacity:.55"/>';
    s+=txt(xa-40,y0-58,"2p (F)",{anchor:"middle",size:12,w:600,fill:"var(--cat1)"}); s+=txt(xb+40,y0-58,"2p (F)",{anchor:"middle",size:12,w:600,fill:"var(--cat1)"});
    title="F₂: čelní překryv p–p → vazba σ"; where="na spojnici jader"; rot="volná";
    note="Dva p-orbitaly mířící <b>proti sobě podél osy</b> se překryjí „tváří v&nbsp;tvář“. Překryv je velký, hustota na spojnici → σ. U&nbsp;F₂ je vazba přesto slabá (155 kJ·mol⁻¹), protože volné páry malých atomů se odpuzují.";
  } else if(m==="pi"){
    var xa2=330, xb2=430;
    s+=lobe(xa2,y0,270,120,70,{}); s+=lobe(xa2,y0,90,120,70,{});
    s+=lobe(xb2,y0,270,120,70,{}); s+=lobe(xb2,y0,90,120,70,{});
    s+='<ellipse cx="'+((xa2+xb2)/2)+'" cy="'+(y0-58)+'" rx="30" ry="42" style="fill:var(--accent);fill-opacity:.55"/>';
    s+='<ellipse cx="'+((xa2+xb2)/2)+'" cy="'+(y0+58)+'" rx="30" ry="42" style="fill:var(--accent);fill-opacity:.55"/>';
    s+=circ(xa2,y0,5,{fill:"var(--ink)"}); s+=circ(xb2,y0,5,{fill:"var(--ink)"});
    s+=txt((xa2+xb2)/2,y0+4,"hustota na ose = 0",{anchor:"middle",size:10,w:600,fill:"var(--bad)"});
    s+=txt(xa2-70,y0-100,"2p (kolmo na osu)",{anchor:"middle",size:11.5,w:600,fill:"var(--cat1)"});
    s+=txt(xb2+70,y0-100,"2p (rovnoběžně)",{anchor:"middle",size:11.5,w:600,fill:"var(--cat1)"});
    s+=txt((xa2+xb2)/2,y0-118,"NAD",{anchor:"middle",size:11,w:700,fill:"var(--accent)",style:"letter-spacing:.1em"});
    s+=txt((xa2+xb2)/2,y0+128,"POD",{anchor:"middle",size:11,w:700,fill:"var(--accent)",style:"letter-spacing:.1em"});
    title="Boční překryv p–p → vazba π"; where="nad a pod spojnicí jader"; rot="blokována";
    note="Dva p-orbitaly <b>rovnoběžné</b> (kolmé na osu vazby) se překryjí bokem — nad a&nbsp;pod osou. Na ose samotné je hustota <b>nulová</b> (uzlová rovina). Překryv je menší než čelní → π je slabší než σ. Otočíte-li jeden atom o&nbsp;90°, laloky se minou a&nbsp;π vazba zanikne → <b>rotace je blokována</b> (cis/trans isomerie).";
  } else {
    var xa3=300, xb3=460;
    s+=lobe(xa3,y0,0,110,66,{}); s+=lobe(xa3,y0,180,110,66,{op:0.18,dash:"4 3"});
    s+=lobe(xb3,y0,180,110,66,{}); s+=lobe(xb3,y0,0,110,66,{op:0.18,dash:"4 3"});
    s+='<ellipse cx="'+((xa3+xb3)/2)+'" cy="'+y0+'" rx="26" ry="30" style="fill:var(--accent);fill-opacity:.6"/>';
    s+=lobe(xa3,y0,270,96,50,{fill:"var(--cat2)"}); s+=lobe(xa3,y0,90,96,50,{fill:"var(--cat2)"});
    s+=lobe(xb3,y0,270,96,50,{fill:"var(--cat2)"}); s+=lobe(xb3,y0,90,96,50,{fill:"var(--cat2)"});
    s+='<ellipse cx="'+((xa3+xb3)/2)+'" cy="'+(y0-56)+'" rx="46" ry="26" style="fill:var(--accent);fill-opacity:.4"/>';
    s+='<ellipse cx="'+((xa3+xb3)/2)+'" cy="'+(y0+56)+'" rx="46" ry="26" style="fill:var(--accent);fill-opacity:.4"/>';
    s+=circ(xa3,y0,6,{fill:"var(--ink)"}); s+=circ(xb3,y0,6,{fill:"var(--ink)"});
    s+=txt(xa3,y0+20,"N",{anchor:"middle",size:14,w:700,fill:"var(--ink)"}); s+=txt(xb3,y0+20,"N",{anchor:"middle",size:14,w:700,fill:"var(--ink)"});
    s+=txt((xa3+xb3)/2,y0+8,"σ",{anchor:"middle",size:15,w:700,fill:"var(--paper)"});
    s+=txt((xa3+xb3)/2,y0-52,"π₁",{anchor:"middle",size:13,w:700,fill:"var(--ink)"});
    s+=txt((xa3+xb3)/2,y0+62,"π₁",{anchor:"middle",size:13,w:700,fill:"var(--ink)"});
    s+=txt(640,y0-40,"π₂ leží před a za",{size:11,w:600,fill:"var(--ink-2)"});
    s+=txt(640,y0-24,"rovinou obrazovky",{size:11,w:600,fill:"var(--ink-2)"});
    s+=txt(640,y0-8,"(kolmo na π₁)",{size:11,fill:"var(--ink-3)"});
    title="N₂: trojná vazba = 1 σ + 2 π"; where="σ na ose, 2× π kolem ní"; rot="blokována";
    note="Dusík má tři nepárové elektrony v&nbsp;p<sub>x</sub>, p<sub>y</sub>, p<sub>z</sub>. Jeden pár p-orbitalů míří podél osy → <b>σ</b>. Zbylé dva páry jsou kolmé na osu (a&nbsp;navzájem) → <b>dvě π</b>: jedna nad/pod, druhá před/za. Dohromady 945 kJ·mol⁻¹, délka jen 110 pm — hustota obaluje osu ze všech stran jako válec.";
  }
  s+=txt(60,30,title,{size:14,w:700,fill:"var(--ink)"});
  $("#ovlWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="'+title+'"');
  $$("#ovlSel button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===m); });
  function ro(id,k,v,h,c){ var e=$(id); e.innerHTML='<span class="k">'+k+'</span><span class="v" style="color:'+(c||"var(--ink)")+'">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#ovlRo1","Typ vazby",m==="pi"?"π":(m==="n2"?"1 σ + 2 π":"σ"),m==="pi"?"boční překryv":(m==="n2"?"trojná vazba":"čelní překryv"),"var(--accent)");
  ro("#ovlRo2","Elektronová hustota",where,m==="pi"?"na ose nulová (uzlová rovina)":"rotačně symetrická kolem osy");
  ro("#ovlRo3","Rotace kolem vazby",rot,rot==="volná"?"σ se otočením nezmění":"π by se otočením přetrhla",rot==="volná"?"var(--ok)":"var(--bad)");
  $("#ovlNote").innerHTML=note;
}
function initOvl(){ $$("#ovlSel button").forEach(function(b){ b.addEventListener("click",function(){ ovlMode=b.dataset.v; drawOvl(); }); }); }

/* ============================================================
   15 · NÁSOBNOST — délka vs energie
   ============================================================ */
var multI=0;
function drawMult(){
  var g=BONDMULT[multI], rows=g.rows;
  var W=760,H=330, L=90,R=670,T=40,B=270;
  var n=rows.length, gw=(R-L)/n;
  var Lmax=170, Emax=1150;
  var yL=function(v){return B-(v/Lmax)*(B-T);}, yE=function(v){return B-(v/Emax)*(B-T);};
  var s='';
  for(var t=0;t<=Lmax;t+=50){ s+=line(L,yL(t),R,yL(t),{c:"var(--line)",w:1}); s+=txt(L-8,yL(t)+4,t,{anchor:"end",size:10.5,fill:"var(--cat1)",mono:true}); }
  for(var e=0;e<=Emax;e+=250){ s+=txt(R+8,yE(e)+4,e,{size:10.5,fill:"var(--accent)",mono:true}); }
  s+=txt(L-8,T-16,"délka [pm]",{anchor:"end",size:10.5,w:600,fill:"var(--cat1)"});
  s+=txt(R+8,T-16,"energie [kJ/mol]",{size:10.5,w:600,fill:"var(--accent)"});
  var E1=rows[0][2];
  rows.forEach(function(r,i){
    var x=L+gw*i+gw/2, bw=44;
    s+=rect(x-bw-4,yL(r[1]),bw,B-yL(r[1]),{fill:"var(--cat1)",r:4});
    s+=txt(x-bw/2-4,yL(r[1])-6,r[1]+" pm",{anchor:"middle",size:11,w:600,fill:"var(--cat1)",mono:true});
    s+=rect(x+4,yE(r[2]),bw,B-yE(r[2]),{fill:"var(--accent)",r:4});
    s+=txt(x+bw/2+4,yE(r[2])-6,r[2],{anchor:"middle",size:11,w:600,fill:"var(--accent)",mono:true});
    /* úměrná energie */
    var prop=E1*(i+1);
    if(i>0){ s+=line(x+4,yE(prop),x+4+bw,yE(prop),{c:"var(--line-strong)",w:2,dash:"5 4"}); s+=txt(x+bw/2+4,yE(prop)-6,"×"+(i+1)+" = "+prop,{anchor:"middle",size:10,fill:"var(--ink-3)",mono:true}); }
    s+=txt(x,B+20,r[0],{anchor:"middle",size:14,w:700,fill:"var(--ink)"});
    s+=txt(x,B+36,(i===0?"1 σ":(i===1?"σ + π":"σ + 2 π")),{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  });
  s+=line(L,B,R,B,{c:"var(--line-strong)",w:1.5});
  $("#multWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Délka a energie vazby podle násobnosti"');
  $$("#multSel button").forEach(function(b){ b.setAttribute("aria-pressed", +b.dataset.v===multI); });
  var h="";
  rows.forEach(function(r,i){
    var inc = i===0?"—":"+"+(r[2]-rows[i-1][2]);
    h+='<tr><td class="mono" style="font-weight:700">'+r[0]+'</td><td class="n">'+(i+1)+'</td><td class="n">'+r[1]+'</td><td class="n" style="font-weight:600">'+r[2]+'</td><td class="n" style="color:'+(i>0&&(r[2]-rows[i-1][2])<E1?"var(--exo)":"var(--ink-2)")+'">'+inc+'</td><td>'+(i===0?"1 σ":(i===1?"1 σ + 1 π":"1 σ + 2 π"))+'</td></tr>';
  });
  $("#multBody").innerHTML=h;
  var notes=[
    "C–C → C=C přidá jen 266 kJ (π &lt; σ 348), C=C → C≡C dalších 225. Trojná vazba má 839, ne 3 × 348 = 1044. Zároveň se zkracuje 154 → 134 → 120 pm.",
    "Dusík je extrém: jednoduchá N–N je nezvykle slabá (163 — odpuzování volných párů), trojná N≡N nejpevnější v&nbsp;tabulce (945). Proto dusík existuje jako N₂ a&nbsp;je tak inertní.",
    "C=O je mimořádně pevná (799 v&nbsp;CO₂), C≡O v&nbsp;oxidu uhelnatém je s&nbsp;1072 kJ·mol⁻¹ vůbec nejpevnější známá vazba. Proto je spalování uhlíkatých paliv tak exotermické — vznikají vazby C=O.",
    "O–O je nejslabší z&nbsp;běžných jednoduchých vazeb (146) — proto se peroxidy rozkládají. O=O v&nbsp;kyslíku (498) je pevná, ale ne tak jako N≡N; proto kyslík reaguje ochotněji než dusík.",
    "C≡N (891) je druhá nejpevnější vazba tabulky — nitrily a&nbsp;kyanidy jsou chemicky stálé. Přírůstky: +322, +276 — opět klesající."
  ];
  $("#multNote").innerHTML="Přepínejte dvojice a&nbsp;porovnávejte plné sloupce s&nbsp;čárkovanou „úměrnou“ hladinou: skutečná energie je vždy <b>pod</b> ní. "+notes[multI];
}
function initMult(){ $$("#multSel button").forEach(function(b){ b.addEventListener("click",function(){ multI=+b.dataset.v; drawMult(); }); }); }
function drawBond1(){
  var h="", half=Math.ceil(BONDS1.length/2);
  for(var i=0;i<half;i++){
    var a=BONDS1[i], b=BONDS1[i+half];
    h+='<tr><td class="mono" style="font-weight:600">'+a[0]+'</td><td class="n">'+a[1]+'</td><td class="n">'+a[2]+'</td>'+
       (b?'<td class="mono" style="font-weight:600">'+b[0]+'</td><td class="n">'+b[1]+'</td><td class="n">'+b[2]+'</td>':'<td></td><td></td><td></td>')+'</tr>';
  }
  $("#bond1Body").innerHTML=h;
}

/* ============================================================
   16 · DIPÓLOVÝ MOMENT → PARCIÁLNÍ NÁBOJ
   ============================================================ */
var DIPAT={HF:["H","F"],HCl:["H","Cl"],HBr:["H","Br"],HI:["H","I"],ClF:["Cl","F"],LiH:["Li","H"],"NaCl(g)":["Na","Cl"],"KF(g)":["K","F"],"CsF(g)":["Cs","F"]};
var dipI=1;
function drawDip(){
  var m=DIPOLES[dipI], at=DIPAT[m.f]||["A","B"];
  var D=3.33564e-30, e=1.602176634e-19;
  var q=m.mu*D/(m.d*1e-12), delta=q/e, pct=100*delta;
  var W=760,H=230, y0=100, s='';
  var xa=200, xb=200+Math.min(300,m.d*1.1);
  var f=Math.min(1,delta);
  s+='<ellipse cx="'+((xa+xb)/2+(xb-xa)*0.28*f)+'" cy="'+y0+'" rx="'+((xb-xa)/2+30-40*f)+'" ry="'+(48-14*f)+'" style="fill:var(--endo);fill-opacity:'+(0.15+0.3*f)+'"/>';
  s+=circ(xa,y0,28,{fill:"var(--surface)",stroke:"var(--exo)",sw:3}); s+=circ(xb,y0,28,{fill:"var(--surface)",stroke:"var(--endo)",sw:3});
  s+=txt(xa,y0+7,at[0],{anchor:"middle",size:20,w:700,fill:"var(--ink)"}); s+=txt(xb,y0+7,at[1],{anchor:"middle",size:20,w:700,fill:"var(--ink)"});
  s+=txt(xa,y0-40,"δ+ = +"+fmt(delta,2)+" e",{anchor:"middle",size:13,w:700,fill:"var(--exo)",mono:true});
  s+=txt(xb,y0-40,"δ− = −"+fmt(delta,2)+" e",{anchor:"middle",size:13,w:700,fill:"var(--endo)",mono:true});
  s+=line(xa,y0+44,xb,y0+44,{c:"var(--ink-3)",w:1}); s+=line(xa,y0+38,xa,y0+50,{c:"var(--ink-3)",w:1}); s+=line(xb,y0+38,xb,y0+50,{c:"var(--ink-3)",w:1});
  s+=txt((xa+xb)/2,y0+62,"d = "+m.d+" pm",{anchor:"middle",size:12,w:600,fill:"var(--ink-2)",mono:true});
  s+=arrow(xa+34,y0+84,xb-34,y0+84,{c:"var(--accent)",w:3,ah:10});
  s+=txt((xa+xb)/2,y0+104,"μ = "+fmt(m.mu,2)+" D  (od δ+ k δ−)",{anchor:"middle",size:12,w:600,fill:"var(--accent)",mono:true});
  /* stupnice iontového charakteru */
  var L=560,R=730,yb=60;
  s+=txt(L,yb-10,"IONTOVÝ CHARAKTER",{size:10,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  s+=rect(L,yb,R-L,18,{fill:"var(--surface-3)",r:4}); s+=rect(L,yb,(R-L)*Math.min(1,delta),18,{fill:"var(--accent)",r:4});
  s+=txt(L,yb+34,"z μ: "+fmt(pct,0)+" %",{size:11.5,w:600,fill:"var(--accent)",mono:true});
  s+=rect(L,yb+48,R-L,18,{fill:"var(--surface-3)",r:4}); s+=rect(L,yb+48,(R-L)*m.ic/100,18,{fill:"var(--cat2)",r:4});
  s+=txt(L,yb+82,"z ΔEN (Pauling): "+fmt(m.ic,0)+" %",{size:11.5,w:600,fill:"var(--cat2)",mono:true});
  s+=txt(L,yb+104,"0 % = čistě kovalentní · 100 % = čistě iontová",{size:9.5,fill:"var(--ink-3)"});
  $("#dipWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Parciální náboje v molekule '+m.f+'"');
  function ro(id,k,v,h,c){ var el=$(id); el.innerHTML='<span class="k">'+k+'</span><span class="v" style="color:'+(c||"var(--ink)")+'">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#dipRo1","Dipólový moment μ",fmt(m.mu,2)+" D",fmt(m.mu*3.336,2)+"·10⁻³⁰ C·m","var(--accent)");
  ro("#dipRo2","Délka vazby d",m.d+" pm",m.d/100+"·10⁻¹⁰ m");
  ro("#dipRo3","Parciální náboj δ","±"+fmt(delta,2)+" e",fmt(q*1e20,2)+"·10⁻²⁰ C",delta>0.5?"var(--cat4)":"var(--cat2)");
  ro("#dipRo4","Iontový charakter",fmt(pct,0)+" % · ΔEN "+fmt(m.dEN,2),"měření vs Pauling "+fmt(m.ic,0)+" %");
  $("#dipEq").innerHTML='<span class="q">q</span> = <span class="q">μ</span>/<span class="q">d</span> = '+fmt(m.mu,2)+' · 3,336·10⁻³⁰ / ('+m.d+'·10⁻¹²) = '+fmt(q*1e20,2)+'·10⁻²⁰ C &nbsp;→&nbsp; δ = '+fmt(q*1e20,2)+'·10⁻²⁰ / 1,602·10⁻¹⁹ = <b>'+fmt(delta,2)+' e</b>';
  var note;
  if(delta>0.6) note="Nad 0,6 e už mluvíme o&nbsp;iontovém páru — v&nbsp;plynné fázi taková „molekula“ existuje, v&nbsp;pevné látce místo ní vznikne iontový krystal.";
  else if(delta>0.3) note="Kolem 0,4 e je vazba na hranici: silně polární kovalentní. HF je proto slabá kyselina (vazba drží pevně), ale tvoří nejsilnější vodíkové můstky.";
  else if(delta>0.1) note="Typická polární kovalentní vazba: molekula má měřitelný dipól, ale elektron je stále sdílený. Odhad z&nbsp;ΔEN a&nbsp;z&nbsp;měření se shodují řádově — dvě nezávislé metody, stejná odpověď.";
  else note="Skoro nepolární: parciální náboje jsou pod desetinou elektronu. Odtud slabé dipól–dipólové síly a&nbsp;nízká teplota varu.";
  $("#dipNote").innerHTML="Zkuste projít řadu HF → HCl → HBr → HI: δ klesá 0,42 → 0,18 → 0,12 → 0,06 e, přesně jak klesá ΔEN. "+note;
}
function initDip(){
  var sel=$("#dipSel");
  sel.innerHTML=DIPOLES.map(function(m,i){return '<option value="'+i+'">'+m.f+' — μ = '+fmt(m.mu,2)+' D, d = '+m.d+' pm</option>';}).join("");
  sel.value=String(dipI);
  sel.addEventListener("change",function(){ dipI=+sel.value; drawDip(); });
}

/* ============================================================
   17 · TABULKA ELEKTRONEGATIVIT
   ============================================================ */
var enState={q:"",sort:"tab"};
var EN_GROUPS={1:"alkalický kov",2:"kov alkalických zemin",13:"triel",14:"tetrel",15:"pentel",16:"chalkogen",17:"halogen",18:"vzácný plyn"};
function drawENTable(){
  var q=enState.q.toLowerCase().trim();
  var rows=EN_LIST.filter(function(r){
    if(!q) return true;
    var gname=EN_GROUPS[r[3]]||"přechodný kov";
    return (r[0]+" "+r[1]+" "+gname).toLowerCase().indexOf(q)>=0;
  });
  if(enState.sort==="desc") rows=rows.slice().sort(function(a,b){return EN[b[0]]-EN[a[0]];});
  var h="";
  rows.forEach(function(r){
    var v=EN[r[0]], pct=(v/4*100).toFixed(1);
    var col = v>=3?"var(--cat4)":(v>=2?"var(--cat2)":"var(--cat3)");
    h+='<tr><td class="mono" style="font-weight:700">'+r[0]+'</td><td>'+r[1]+' <span style="color:var(--ink-3);font-size:.78rem">('+(EN_GROUPS[r[3]]||"přechodný kov")+')</span></td><td class="n">'+r[2]+'</td><td class="n">'+r[3]+'</td><td class="n" style="font-weight:700">'+fmt(v,2)+'</td>'+
       '<td><span style="display:block;height:9px;border-radius:99px;background:var(--surface-3);overflow:hidden"><span style="display:block;height:100%;width:'+pct+'%;background:'+col+';border-radius:99px"></span></span></td></tr>';
  });
  if(!rows.length) h='<tr><td colspan="6" style="padding:1.1rem;color:var(--ink-3)">Nic nenalezeno. Zkuste „F“, „kyslík“ nebo „halogen“.</td></tr>';
  $("#enBody").innerHTML=h;
  $$("#enSort button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===enState.sort); });
}
function initENTable(){
  $("#enSearch").addEventListener("input",function(){ enState.q=this.value; drawENTable(); });
  $$("#enSort button").forEach(function(b){ b.addEventListener("click",function(){ enState.sort=b.dataset.v; drawENTable(); }); });
  drawENTable();
}
