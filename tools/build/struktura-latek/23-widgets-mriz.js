/* ============================================================
   T12 · TYPY KRYSTALOVÝCH MŘÍŽEK (k4)
   ============================================================ */
var mrizState={type:"ion",sub:0};
function hexPts(x,y,r){ var p=[]; for(var k=0;k<6;k++){ var a=k*Math.PI/3+Math.PI/6; p.push((x+r*Math.cos(a)).toFixed(1)+","+(y+r*Math.sin(a)).toFixed(1)); } return p.join(" "); }
function drawCell(f,ox,oy){
  var s='', rnd=skupRnd(11);
  function ion(x,y,pos,lab){ s+='<circle cx="'+x+'" cy="'+y+'" r="'+(pos?8:13)+'" style="fill:'+(pos?"var(--endo-soft)":"var(--exo-soft)")+';stroke:'+(pos?"var(--endo)":"var(--exo)")+';stroke-width:1.4"/>'; s+=txt(x,y+3.5,lab,{anchor:"middle",size:8.5,w:700,fill:pos?"var(--endo)":"var(--exo)"}); }
  if(f==="NaCl"||f==="MgO"){
    var d=40, n=5, lp=f==="NaCl"?["Na⁺","Cl⁻"]:["Mg²⁺","O²⁻"];
    for(var i=0;i<n;i++) for(var j=0;j<n;j++){ if(j<n-1) s+=line(ox+j*d,oy+i*d,ox+(j+1)*d,oy+i*d,{c:"var(--line-strong)",w:1}); if(i<n-1) s+=line(ox+j*d,oy+i*d,ox+j*d,oy+(i+1)*d,{c:"var(--line-strong)",w:1}); }
    for(var i2=0;i2<n;i2++) for(var j2=0;j2<n;j2++){ var pos=(i2+j2)%2===0; ion(ox+j2*d,oy+i2*d,pos,lp[pos?0:1]); }
    /* zvýraznění koordinace */
    s+='<circle cx="'+(ox+2*d)+'" cy="'+(oy+2*d)+'" r="'+(d+14)+'" style="fill:none;stroke:var(--accent);stroke-width:1.5;stroke-dasharray:5 4"/>';
    s+=txt(ox+2*d,oy+n*d-14,"4 sousedi v rovině + 1 nad + 1 pod = koord. číslo 6",{anchor:"middle",size:10,w:600,fill:"var(--accent)"});
  } else if(f==="CsCl"){
    var a=110, off=42, x0=ox+10, y0=oy+60;
    var C=[[x0,y0],[x0+a,y0],[x0+a,y0+a],[x0,y0+a],[x0+off,y0-off],[x0+a+off,y0-off],[x0+a+off,y0+a-off],[x0+off,y0+a-off]];
    var E=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
    E.forEach(function(e){ s+=line(C[e[0]][0],C[e[0]][1],C[e[1]][0],C[e[1]][1],{c:"var(--line-strong)",w:1.2}); });
    var cx=x0+a/2+off/2, cy=y0+a/2-off/2;
    C.forEach(function(c){ s+=line(c[0],c[1],cx,cy,{c:"var(--accent)",w:1,dash:"3 3"}); });
    C.forEach(function(c){ ion(c[0],c[1],false,"Cl⁻"); });
    ion(cx,cy,true,"Cs⁺");
    s+=txt(x0+a/2+off/2,y0+a+30,"Cs⁺ uprostřed krychle, 8 Cl⁻ v rozích → 8 : 8",{anchor:"middle",size:10,w:600,fill:"var(--accent)"});
  } else if(f==="C (diamant)"||f==="Si"||f==="SiO₂"){
    var r=26, lab=f==="Si"?"Si":(f==="SiO₂"?"Si":"C");
    var nodes=[];
    for(var row=0;row<4;row++) for(var col=0;col<4;col++){
      var hx=ox+20+col*r*1.732+(row%2)*r*0.866, hy=oy+20+row*r*1.5;
      nodes.push([hx,hy]);
    }
    /* honeycomb: spojíme sousedy do vzdálenosti ~r */
    var bonds=[];
    for(var p=0;p<nodes.length;p++) for(var q=p+1;q<nodes.length;q++){ var dx=nodes[p][0]-nodes[q][0], dy=nodes[p][1]-nodes[q][1]; if(dx*dx+dy*dy<r*r*1.05){ bonds.push([p,q]); } }
    bonds.forEach(function(b){
      var A=nodes[b[0]], B=nodes[b[1]];
      s+=line(A[0],A[1],B[0],B[1],{c:"var(--ink-2)",w:2});
      if(f==="SiO₂"){ var mx=(A[0]+B[0])/2, my=(A[1]+B[1])/2; s+='<circle cx="'+mx.toFixed(1)+'" cy="'+my.toFixed(1)+'" r="6" style="fill:var(--exo-soft);stroke:var(--exo);stroke-width:1.2"/>'; s+=txt(mx,my+3,"O",{anchor:"middle",size:7.5,w:700,fill:"var(--exo)"}); }
    });
    nodes.forEach(function(nd,i){
      /* čtvrtá vazba z roviny */
      s+='<polygon points="'+nd[0]+','+nd[1]+' '+(nd[0]+6)+','+(nd[1]+16)+' '+(nd[0]-6)+','+(nd[1]+16)+'" style="fill:var(--ink-3);opacity:.55"/>';
      s+='<circle cx="'+nd[0]+'" cy="'+nd[1]+'" r="9" style="fill:var(--surface-3);stroke:var(--ink-2);stroke-width:1.4"/>';
      s+=txt(nd[0],nd[1]+3.5,lab,{anchor:"middle",size:9,w:700,fill:"var(--ink)"});
    });
    s+=txt(ox+90,oy+195,f==="SiO₂"?"tetraedry SiO₄ spojené rohy — každý O patří dvěma Si":"každý atom: 4 kovalentní vazby (sp³), tetraedr, 109,5°",{anchor:"middle",size:10,w:600,fill:"var(--accent)"});
  } else if(f==="C (grafit)"){
    for(var L=0;L<3;L++){
      var yy=oy+20+L*66;
      for(var c=0;c<4;c++){ s+='<polygon points="'+hexPts(ox+24+c*44+(L%2)*22,yy,24)+'" style="fill:none;stroke:var(--ink-2);stroke-width:2"/>'; }
      if(L<2){ s+=line(ox+10,yy+34,ox+190,yy+34,{c:"var(--endo)",w:1,dash:"3 3"}); }
    }
    s+=txt(ox+190,oy+54,"335 pm — slabé disperzní síly",{size:9.5,fill:"var(--endo)"});
    s+=txt(ox+190,oy+26,"142 pm — vazby sp² ve vrstvě",{size:9.5,fill:"var(--ink-2)"});
    s+=txt(ox+90,oy+195,"vrstvy po sobě kloužou → měkký, maže; π elektrony vedou",{anchor:"middle",size:10,w:600,fill:"var(--accent)"});
  } else if(f==="H₂O (led)"){
    var cx2=ox+100, cy2=oy+90, R=62;
    for(var k=0;k<6;k++){
      var a2=k*Math.PI/3, x=cx2+R*Math.cos(a2), y=cy2+R*Math.sin(a2);
      var an=(k+1)*Math.PI/3, xn=cx2+R*Math.cos(an), yn=cy2+R*Math.sin(an);
      s+=line(x,y,xn,yn,{c:"var(--endo)",w:1.4,dash:"4 3"});
      s+=water(x,y,a2+Math.PI/2+ (k%2?0.5:-0.5),1.1);
    }
    s+=txt(cx2,cy2+4,"šestičlenný kruh",{anchor:"middle",size:9.5,fill:"var(--ink-3)"});
    s+=txt(ox+100,oy+195,"každá molekula 4 vodíkové můstky (čárkovaně) — otevřená struktura, led plave",{anchor:"middle",size:10,w:600,fill:"var(--accent)"});
  } else if(f==="I₂"||f==="CO₂ (suchý led)"||f==="C₁₀H₈"){
    for(var i3=0;i3<3;i3++) for(var j3=0;j3<3;j3++){
      var mx2=ox+36+j3*66, my2=oy+30+i3*60, tilt=((i3+j3)%2?1:-1)*0.5;
      if(f==="I₂"){ var ddx=Math.cos(tilt)*11, ddy=Math.sin(tilt)*11; s+=line(mx2-ddx,my2-ddy,mx2+ddx,my2+ddy,{c:"var(--ink-2)",w:3}); s+='<circle cx="'+(mx2-ddx).toFixed(1)+'" cy="'+(my2-ddy).toFixed(1)+'" r="11" style="fill:var(--cat4);fill-opacity:.7;stroke:var(--ink-2);stroke-width:1"/><circle cx="'+(mx2+ddx).toFixed(1)+'" cy="'+(my2+ddy).toFixed(1)+'" r="11" style="fill:var(--cat4);fill-opacity:.7;stroke:var(--ink-2);stroke-width:1"/>'; }
      else if(f==="CO₂ (suchý led)"){ var ex=Math.cos(tilt)*16, ey=Math.sin(tilt)*16; s+=line(mx2-ex,my2-ey,mx2+ex,my2+ey,{c:"var(--ink-2)",w:3}); s+='<circle cx="'+(mx2-ex).toFixed(1)+'" cy="'+(my2-ey).toFixed(1)+'" r="7" style="fill:var(--exo-soft);stroke:var(--exo);stroke-width:1.2"/><circle cx="'+(mx2+ex).toFixed(1)+'" cy="'+(my2+ey).toFixed(1)+'" r="7" style="fill:var(--exo-soft);stroke:var(--exo);stroke-width:1.2"/><circle cx="'+mx2+'" cy="'+my2+'" r="6" style="fill:var(--surface-3);stroke:var(--ink-2);stroke-width:1.2"/>'; }
      else { s+='<g transform="rotate('+(tilt*60)+' '+mx2+' '+my2+')"><polygon points="'+hexPts(mx2-11,my2,13)+'" style="fill:none;stroke:var(--ink-2);stroke-width:1.6"/><polygon points="'+hexPts(mx2+11,my2,13)+'" style="fill:none;stroke:var(--ink-2);stroke-width:1.6"/></g>'; }
    }
    s+=txt(ox+100,oy+195,"celé molekuly v uzlech; mezi nimi jen slabé disperzní síly",{anchor:"middle",size:10,w:600,fill:"var(--accent)"});
  } else if(f==="Cu"){
    for(var i4=0;i4<5;i4++) for(var j4=0;j4<6;j4++){ var x4=ox+20+j4*34+(i4%2)*17, y4=oy+22+i4*30; s+='<circle cx="'+x4+'" cy="'+y4+'" r="15" style="fill:var(--surface-3);stroke:var(--ink-3);stroke-width:1"/>'; s+=txt(x4,y4+4,"+",{anchor:"middle",size:12,w:700,fill:"var(--ink-2)"}); }
    for(var e=0;e<28;e++){ s+='<circle cx="'+(ox+14+rnd()*190).toFixed(1)+'" cy="'+(oy+10+rnd()*150).toFixed(1)+'" r="2.6" style="fill:var(--accent)"/>'; }
    s+=txt(ox+100,oy+195,"nejtěsnější uspořádání (12 sousedů) v „moři“ elektronů",{anchor:"middle",size:10,w:600,fill:"var(--accent)"});
  } else {
    /* bcc: Fe, W */
    var a5=110, off5=42, x5=ox+14, y5=oy+60;
    var C5=[[x5,y5],[x5+a5,y5],[x5+a5,y5+a5],[x5,y5+a5],[x5+off5,y5-off5],[x5+a5+off5,y5-off5],[x5+a5+off5,y5+a5-off5],[x5+off5,y5+a5-off5]];
    var E5=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
    E5.forEach(function(e2){ s+=line(C5[e2[0]][0],C5[e2[0]][1],C5[e2[1]][0],C5[e2[1]][1],{c:"var(--line-strong)",w:1.2}); });
    var cx5=x5+a5/2+off5/2, cy5=y5+a5/2-off5/2;
    C5.forEach(function(c2){ s+='<circle cx="'+c2[0]+'" cy="'+c2[1]+'" r="12" style="fill:var(--surface-3);stroke:var(--ink-3);stroke-width:1"/>'; s+=txt(c2[0],c2[1]+4,f,{anchor:"middle",size:9,w:700,fill:"var(--ink-2)"}); });
    s+='<circle cx="'+cx5+'" cy="'+cy5+'" r="12" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.4"/>'; s+=txt(cx5,cy5+4,f,{anchor:"middle",size:9,w:700,fill:"var(--accent)"});
    for(var e3=0;e3<16;e3++){ s+='<circle cx="'+(x5+rnd()*(a5+off5)).toFixed(1)+'" cy="'+(y5-off5+rnd()*(a5+off5)).toFixed(1)+'" r="2.4" style="fill:var(--accent)"/>'; }
    s+=txt(ox+100,oy+195,"kubická prostorově centrovaná: 8 rohů + 1 střed, koord. číslo 8",{anchor:"middle",size:10,w:600,fill:"var(--accent)"});
  }
  return s;
}
function drawMriz(){
  var L=LATT[mrizState.type], sub=L.subs[Math.min(mrizState.sub,L.subs.length-1)];
  var W=760,H=330, s='';
  s+=rect(8,8,W-16,H-16,{fill:"var(--surface-2)",r:12,stroke:"var(--line)",sw:1});
  s+=txt(24,32,L.name.toUpperCase()+" · "+sub.f,{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  s+='<g transform="translate(0,0)">'+drawCell(sub.f,60,70)+'</g>';
  /* pravý sloupec */
  var px=340;
  var rows=[["v uzlech mřížky",L.part],["co drží pohromadě",L.force],["buňka / uspořádání",sub.cell],["teplota tání",sub.tt],["tvrdost",sub.hard],["vodivost",sub.cond],["rozpustnost",sub.sol]];
  rows.forEach(function(r,i){
    var y=60+i*36;
    s+=txt(px,y,r[0].toUpperCase(),{size:9.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.07em"});
    var v=r[1], vv=v.length>62?v.slice(0,60)+"…":v;
    s+=txt(px,y+16,vv,{size:11.5,w:600,fill:i===3?"var(--accent)":"var(--ink)"});
    s+=line(px,y+24,W-24,y+24,{c:"var(--line)",w:1});
  });
  $("#mrizWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Krystalová mřížka — '+sub.f+'"');
  function ro(id,k,val,h){ var e=$(id); e.innerHTML='<span class="k">'+k+'</span><span class="v" style="font-size:1rem">'+val+'</span><span class="h">'+h+'</span>'; }
  ro("#mrizRo1","Částice v uzlech",L.part.split(" (")[0],sub.n+" — "+sub.f);
  ro("#mrizRo2","Teplota tání",sub.tt,"t.v. "+sub.tv);
  ro("#mrizRo3","Tvrdost / mechanika",sub.hard,L.force.split(",")[0]);
  ro("#mrizRo4","Vodivost",sub.cond,"rozpustnost: "+sub.sol);
  $("#mrizNote").innerHTML=L.why;
  $$("#mrizType button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===mrizState.type); });
  var sel=$("#mrizSub");
  sel.innerHTML=L.subs.map(function(sb,i){ return '<option value="'+i+'"'+(i===mrizState.sub?' selected':'')+'>'+sb.f+' — '+sb.n+'</option>'; }).join("");
}
function initMriz(){
  $$("#mrizType button").forEach(function(b){ b.addEventListener("click",function(){ mrizState.type=b.dataset.v; mrizState.sub=0; drawMriz(); }); });
  $("#mrizSub").addEventListener("change",function(){ mrizState.sub=+this.value; drawMriz(); });
  drawMriz();
}

/* ============================================================
   T13 · KRYSTALICKÝ vs AMORFNÍ (k4)
   ============================================================ */
var amorState={mode:"kryst"};
function drawAmor(){
  var am=amorState.mode==="amorf", W=760,H=310, s='', rnd=skupRnd(am?77:1);
  /* levý panel: síť */
  s+=rect(8,8,360,H-16,{fill:"var(--surface-2)",r:12,stroke:"var(--line)",sw:1});
  s+=txt(24,32,am?"AMORFNÍ — KRÁTKODOSAHOVÉ USPOŘÁDÁNÍ (SKLO)":"KRYSTALICKÝ — DALEKODOSAHOVÉ USPOŘÁDÁNÍ (KŘEMEN)",{size:10.5,w:600,fill:am?"var(--endo)":"var(--cat1)",style:"letter-spacing:.08em"});
  var r=24, nodes=[];
  for(var row=0;row<6;row++) for(var col=0;col<7;col++){
    var hx=40+col*r*1.732+(row%2)*r*0.866, hy=58+row*r*1.5;
    if(am){ hx+=(rnd()-.5)*22; hy+=(rnd()-.5)*22; }
    nodes.push([hx,hy]);
  }
  var bonds=[];
  for(var p=0;p<nodes.length;p++) for(var q=p+1;q<nodes.length;q++){ var dx=nodes[p][0]-nodes[q][0], dy=nodes[p][1]-nodes[q][1]; var d2=dx*dx+dy*dy; if(d2<r*r*(am?1.55:1.05)){ if(am && rnd()<0.22) continue; bonds.push([p,q]); } }
  bonds.forEach(function(b){ var A=nodes[b[0]], B=nodes[b[1]]; s+=line(A[0],A[1],B[0],B[1],{c:"var(--ink-2)",w:1.8}); var mx=(A[0]+B[0])/2, my=(A[1]+B[1])/2; s+='<circle cx="'+mx.toFixed(1)+'" cy="'+my.toFixed(1)+'" r="4.5" style="fill:var(--exo-soft);stroke:var(--exo);stroke-width:1"/>'; });
  nodes.forEach(function(nd){ s+='<circle cx="'+nd[0].toFixed(1)+'" cy="'+nd[1].toFixed(1)+'" r="7" style="fill:var(--surface-3);stroke:var(--ink-2);stroke-width:1.3"/>'; });
  s+=txt(188,H-22,am?"stejné stavební tetraedry SiO₄, ale bez periodicity — jako zmražená kapalina":"periodicky se opakující buňka, stejné okolí každého atomu",{anchor:"middle",size:10,fill:"var(--ink-3)"});
  /* pravý panel: T(t) */
  var px=392, L=px+44, R=W-24, T0=40, B=H-50;
  s+=rect(px-8,8,W-px,H-16,{fill:"var(--surface-2)",r:12,stroke:"var(--line)",sw:1});
  s+=txt(px+8,32,"TEPLOTA PŘI ROVNOMĚRNÉM OHŘEVU",{size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  s+=line(L,T0,L,B,{c:"var(--line-strong)",w:1.5}); s+=line(L,B,R,B,{c:"var(--line-strong)",w:1.5});
  s+=txt((L+R)/2,B+20,"čas (dodané teplo) →",{anchor:"middle",size:10.5,w:600,fill:"var(--ink-3)"});
  s+=txt(px+14,(T0+B)/2,"T",{anchor:"middle",size:12,w:700,fill:"var(--ink-3)",style:"font-style:italic"});
  var yTm=T0+(B-T0)*0.42;
  if(!am){
    var x1=L+(R-L)*0.32, x2=L+(R-L)*0.62;
    s+='<polyline points="'+L+','+(B-10)+' '+x1+','+yTm+' '+x2+','+yTm+' '+R+','+(T0+16)+'" style="fill:none;stroke:var(--cat1);stroke-width:3;stroke-linejoin:round"/>';
    s+=line(L,yTm,R,yTm,{c:"var(--cat1)",w:1,dash:"4 4"});
    s+=txt(L-6,yTm+4,"t.t.",{anchor:"end",size:11,w:700,fill:"var(--cat1)",mono:true});
    s+=txt((x1+x2)/2,yTm-10,"ostrá teplota tání — plató",{anchor:"middle",size:10.5,w:600,fill:"var(--cat1)"});
    s+=txt(x1-6,yTm+30,"pevný",{anchor:"end",size:10,fill:"var(--ink-3)"}); s+=txt(x2+6,yTm-30,"kapalina",{size:10,fill:"var(--ink-3)"});
    s+=txt(px+8,H-26,"křemen taje při ≈ 1710 °C — všechny vazby se trhají naráz",{size:10,fill:"var(--ink-3)"});
  } else {
    var xa=L+(R-L)*0.30, xb=L+(R-L)*0.66, ya=T0+(B-T0)*0.60, yb=T0+(B-T0)*0.30;
    s+=rect(xa,T0+4,xb-xa,B-T0-4,{fill:"var(--endo)",r:4,style:"fill-opacity:.10"});
    var d="M"+L+" "+(B-10)+" L"+xa+" "+ya+" C"+(xa+(xb-xa)*0.5)+" "+(ya-8)+" "+(xa+(xb-xa)*0.5)+" "+(yb+8)+" "+xb+" "+yb+" L"+R+" "+(T0+16);
    s+='<path d="'+d+'" style="fill:none;stroke:var(--endo);stroke-width:3;stroke-linecap:round"/>';
    s+=txt((xa+xb)/2,T0+20,"interval měknutí",{anchor:"middle",size:10.5,w:600,fill:"var(--endo)"});
    s+=txt((xa+xb)/2,T0+34,"(žádné plató, žádná t.t.)",{anchor:"middle",size:9.5,fill:"var(--endo)"});
    s+=txt(xa-6,ya+26,"tvrdé, křehké",{anchor:"end",size:10,fill:"var(--ink-3)"}); s+=txt(xb+6,yb-24,"viskózní tavenina",{size:10,fill:"var(--ink-3)"});
    s+=line(L,T0+(B-T0)*0.45,R,T0+(B-T0)*0.45,{c:"var(--ink-3)",w:1,dash:"2 4"});
    s+=txt(L-6,T0+(B-T0)*0.45+4,"T_g",{anchor:"end",size:10.5,w:700,fill:"var(--ink-3)",mono:true});
    s+=txt(px+8,H-26,"sklo měkne postupně — proto ho sklář tvaruje; T_g = teplota skelného přechodu",{size:10,fill:"var(--ink-3)"});
  }
  $("#amorWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="'+(am?"Amorfní":"Krystalická")+' látka — struktura a křivka ohřevu"');
  $$("#amorMode button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===amorState.mode); });
  $("#amorNote").innerHTML = am
    ? "Amorfní látka je v podstatě <b>zamrzlá kapalina</b>: sousedé jsou správně (krátkodosahové uspořádání), ale pravidelnost se ztrácí po několika atomech. Vazby mají různou délku a různé napětí, a proto se netrhají naráz — látka <b>měkne v intervalu</b>. Vlastnosti jsou ve všech směrech stejné (<b>izotropie</b>)."
    : "Krystal má dalekodosahové uspořádání: když znáte polohu jedné buňky, znáte polohy všech. Všechny vazby jsou rovnocenné, takže se trhají při jedné teplotě — <b>ostrá teplota tání</b>. Vlastnosti (štěpnost, lom světla, tepelná roztažnost) závisí na směru (<b>anizotropie</b>).";
}
function initAmor(){
  $$("#amorMode button").forEach(function(b){ b.addEventListener("click",function(){ amorState.mode=b.dataset.v; drawAmor(); }); });
  drawAmor();
}
