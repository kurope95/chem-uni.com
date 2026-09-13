/* ============================================================
   11 · K4 — SÍRA PŘI ZAHŘÍVÁNÍ
   ============================================================ */
/* viskozita taveniny [°C, Pa·s] — orientační průběh podle měření */
var VISC=[[113,0.012],[130,0.0098],[145,0.0076],[155,0.0068],[159,0.011],[163,0.35],[168,4.0],[175,25],[182,70],[187,93],[195,80],[210,55],[230,32],[250,20],[280,12],[320,6.0],[360,3.5],[400,2.2],[444,1.5]];
function viscAt(t){
  if(t<VISC[0][0]) return null;
  if(t>=VISC[VISC.length-1][0]) return VISC[VISC.length-1][1];
  for(var i=1;i<VISC.length;i++){
    if(t<=VISC[i][0]){
      var a=VISC[i-1], b=VISC[i], f=(t-a[0])/(b[0]-a[0]);
      return Math.pow(10, Math.log(a[1])/Math.LN10 + (Math.log(b[1])/Math.LN10-Math.log(a[1])/Math.LN10)*f);
    }
  }
  return 1.5;
}
function sulfState(t){
  if(t<95.5)  return {st:"pevná — kosočtverečná α", part:"kruhy S₈ v kosočtverečné mřížce", col:"#e8d44a", kind:"ring"};
  if(t<112.8) return {st:"pevná — jednoklonná β", part:"kruhy S₈ v jednoklonné mřížce", col:"#f0e07a", kind:"ring"};
  if(t<159)   return {st:"kapalná, řídká", part:"volné kruhy S₈", col:"#f5c93a", kind:"freering"};
  if(t<187)   return {st:"kapalná, prudce houstne", part:"kruhy se otevírají na řetězce", col:"#c96b25", kind:"chain"};
  if(t<250)   return {st:"kapalná, nejhustší", part:"nejdelší řetězce (až 10⁵ atomů)", col:"#8f3a1c", kind:"longchain"};
  if(t<444.6) return {st:"kapalná, opět řidší", part:"kratší řetězce", col:"#7a2f18", kind:"chain"};
  return {st:"pára", part:"S₈ → S₆ → S₄ → S₂ (paramagnetická)", col:"#d0642a", kind:"vapor"};
}
var smState={t:120};
function ringGlyph(cx,cy,r,col,n){
  var s='', k=n||8;
  var pts=[];
  for(var i=0;i<k;i++){
    var a=(i/k)*Math.PI*2-Math.PI/2;
    pts.push([cx+Math.cos(a)*r, cy+Math.sin(a)*r*0.62]);
  }
  for(var j=0;j<k;j++){
    var p=pts[j], q=pts[(j+1)%k];
    s+=line(p[0],p[1],q[0],q[1],{c:"var(--ink-2)",w:1.6});
  }
  pts.forEach(function(p,i){
    s+='<circle cx="'+p[0].toFixed(1)+'" cy="'+(p[1]+(i%2?-2.4:2.4)).toFixed(1)+'" r="'+(r*0.19).toFixed(1)+'" style="fill:'+col+';stroke:var(--line-strong);stroke-width:1"/>';
  });
  return s;
}
function chainGlyph(x0,y0,n,step,amp,col){
  var s='', pts=[];
  for(var i=0;i<n;i++) pts.push([x0+i*step, y0+(i%2?amp:-amp)]);
  for(var j=0;j<n-1;j++) s+=line(pts[j][0],pts[j][1],pts[j+1][0],pts[j+1][1],{c:"var(--ink-2)",w:1.6});
  pts.forEach(function(p){ s+='<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="5" style="fill:'+col+';stroke:var(--line-strong);stroke-width:1"/>'; });
  return s;
}
function drawSulf(){
  var t=smState.t, S=sulfState(t), W=790, H=300, s="";
  /* levá část — částice */
  s+=rect(14,26,300,254,{fill:"var(--surface-2)",r:12,stroke:"var(--line)",sw:1.2});
  s+=txt(30,50,"CO JE V NÁDOBĚ",{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.12em"});
  s+=rect(30,62,268,150,{fill:S.col,r:8,style:"fill-opacity:.22"});
  if(S.kind==="ring"){
    for(var a=0;a<3;a++) for(var b=0;b<2;b++) s+=ringGlyph(84+a*74, 104+b*68, 26, S.col);
    s+=txt(164,232,"pravidelná mřížka kruhů S₈",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  } else if(S.kind==="freering"){
    s+=ringGlyph(78,98,26,S.col); s+=ringGlyph(168,124,26,S.col); s+=ringGlyph(250,92,26,S.col);
    s+=ringGlyph(120,172,26,S.col); s+=ringGlyph(226,178,26,S.col);
    s+=txt(164,232,"volné kruhy kloužou po sobě — kapalina je řídká",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  } else if(S.kind==="chain"){
    s+=chainGlyph(44,96,11,22,9,S.col);
    s+=chainGlyph(56,144,10,22,9,S.col);
    s+=chainGlyph(40,190,12,21,9,S.col);
    s+=txt(164,232,"kruhy se otevřely a spojily do řetězců",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  } else if(S.kind==="longchain"){
    s+=chainGlyph(38,88,12,22,10,S.col);
    s+=chainGlyph(38,124,12,22,10,S.col);
    s+=chainGlyph(38,160,12,22,10,S.col);
    s+=chainGlyph(38,196,12,22,10,S.col);
    s+=txt(164,232,"dlouhé zapletené řetězce — tavenina nevyteče",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  } else {
    s+=ringGlyph(70,96,20,S.col,8); s+=ringGlyph(150,86,17,S.col,6); s+=ringGlyph(224,104,14,S.col,4);
    s+=line(96,176,132,176,{c:"var(--ink-2)",w:2.4});
    s+='<circle cx="96" cy="176" r="8" style="fill:'+S.col+';stroke:var(--line-strong);stroke-width:1"/>';
    s+='<circle cx="132" cy="176" r="8" style="fill:'+S.col+';stroke:var(--line-strong);stroke-width:1"/>';
    s+=txt(180,181,"S₂ — paramagnetická jako O₂",{size:11,w:600,fill:"var(--exo)"});
    s+=txt(164,232,"v páře postupně S₈ → S₆ → S₄ → S₂",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  }
  s+=txt(30,262,S.st,{size:13,w:700,fill:"var(--accent)"});
  /* pravá část — křivka viskozity */
  var X0=380, X1=760, Y0=52, Y1=236;
  function fx(T){ return X0+(T-100)/(500-100)*(X1-X0); }
  function fy(v){ var l=Math.log(v)/Math.LN10; return Y1-(l+2.4)/(4.5)*(Y1-Y0); }
  s+=txt(X0,34,"VISKOZITA TAVENINY  [Pa·s, logaritmicky]",{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  [-2,-1,0,1,2].forEach(function(l){
    var y=Y1-(l+2.4)/4.5*(Y1-Y0);
    s+=line(X0,y,X1,y,{c:"var(--grid)",w:1});
    s+=txt(X0-7,y+4,"10"+(l<0?"⁻":"")+["⁰","¹","²","³"][Math.abs(l)],{anchor:"end",size:10,fill:"var(--ink-3)",mono:true});
  });
  [100,150,200,250,300,350,400,450,500].forEach(function(T){
    s+=line(fx(T),Y0,fx(T),Y1,{c:"var(--grid)",w:1});
    if(T%100===0) s+=txt(fx(T),Y1+16,String(T),{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true});
  });
  s+=line(X0,Y1,X1,Y1,{c:"var(--line-strong)",w:1.6});
  s+=line(X0,Y0,X0,Y1,{c:"var(--line-strong)",w:1.6});
  s+=txt((X0+X1)/2,Y1+34,"teplota [°C]",{anchor:"middle",size:11,fill:"var(--ink-3)"});
  /* svislé značky přechodů */
  [[112.8,"tání"],[159,"polymerace"],[444.6,"var"]].forEach(function(m){
    if(m[0]>100&&m[0]<500){
      s+=line(fx(m[0]),Y0,fx(m[0]),Y1,{c:"var(--ink-3)",w:1.2,dash:"4 4"});
      s+=txt(fx(m[0])+4,Y0+12,m[1],{size:9.5,w:600,fill:"var(--ink-3)"});
    }
  });
  var pts=VISC.filter(function(p){return p[0]>=100&&p[0]<=500;});
  s+=polyLine(pts,fx,fy,"var(--accent)",2.6);
  var v=viscAt(t);
  if(v!==null && t<=444.6){
    s+='<circle cx="'+fx(Math.min(t,444)).toFixed(1)+'" cy="'+fy(v).toFixed(1)+'" r="6" style="fill:var(--accent);stroke:var(--paper);stroke-width:2"/>';
  }
  s+=line(fx(Math.min(Math.max(t,100),500)),Y0,fx(Math.min(Math.max(t,100),500)),Y1,{c:"var(--accent)",w:1.6,dash:"5 4"});
  return svg("0 0 "+W+" "+H,s,'aria-label="Chování síry při zahřívání"');
}
function refreshSulf(){
  var t=smState.t, S=sulfState(t), v=viscAt(t);
  $("#smWrap").innerHTML=drawSulf();
  $("#smTv").textContent=fixed(t,0)+" °C";
  ro("#smRo1","Skupenství a forma",S.st,S.part,"");
  ro("#smRo2","Viskozita", (t<112.8?"—":(t>444.6?"—":fixed(v,v<0.1?3:(v<10?2:0))+" Pa·s")), (t<112.8?"pevná látka":(t>444.6?"plyn":"voda má 0,001 Pa·s")), (v!==null&&v>5)?"neg":"");
  ro("#smRo3","Barva", (t<95.5?"jasně žlutá":(t<112.8?"světle žlutá":(t<159?"žlutá":(t<250?"červenohnědá":"tmavě hnědá")))), "tmavne, jak se otevírají kruhy","");
  var near=SMELT[0], best=1e9;
  SMELT.forEach(function(m){ var d=Math.abs(m.t-t); if(d<best){best=d;near=m;} });
  say("#smSay",near.say);
}
function initSulf(){
  $("#smT").addEventListener("input",function(){ smState.t=+this.value; refreshSulf(); });
  refreshSulf();
}

/* ============================================================
   12 · K5 — PROHLEDÁVATELNÁ TABULKA SULFIDŮ
   ============================================================ */
var sdState={q:"", f:"all"};
function drawSulfTable(){
  var q=sdState.q.toLowerCase().trim();
  var rows=SULF.filter(function(x){
    if(sdState.f!=="all" && x.grp!==sdState.f) return false;
    if(!q) return true;
    return (x.f+" "+x.n+" "+x.col+" "+x.min+" "+x.use+" "+x.sol).toLowerCase().indexOf(q)>=0;
  });
  var h="";
  rows.forEach(function(x){
    h+='<tr><td class="chem" style="font-weight:700;white-space:nowrap">'+x.f+'</td>'+
       '<td style="font-size:.86rem">'+x.n+'</td>'+
       '<td style="font-size:.85rem;white-space:nowrap"><span style="display:inline-block;width:13px;height:13px;border-radius:4px;background:'+x.colc+';border:1px solid var(--line-strong);vertical-align:-2px;margin-right:.4rem"></span>'+x.col+'</td>'+
       '<td style="font-size:.82rem;color:'+(x.grp==="alk"?"var(--endo)":"var(--ink-2)")+'">'+x.sol+'</td>'+
       '<td style="font-size:.82rem;color:var(--ink-2)">'+x.min+'</td>'+
       '<td style="font-size:.8rem;color:var(--ink-2);line-height:1.45">'+x.use+'</td></tr>';
  });
  if(!rows.length) h='<tr><td colspan="6" style="padding:1.1rem;color:var(--ink-3)">Nic nenalezeno. Zkuste „černý“, „žlutý“, „pyrit“, „ruda“ nebo „Cu“.</td></tr>';
  $("#sdBody").innerHTML=h;
  $("#sdCount").innerHTML="Zobrazeno <b>"+rows.length+"</b> z&nbsp;"+SULF.length+" sulfidů. Rozpustné jsou jen sulfidy alkalických kovů a&nbsp;amonný — všechny ostatní se srážejí, a&nbsp;to je základ klasického analytického dělení kationtů.";
  segSet("#sdFilter",sdState.f);
}
function initSulfTable(){
  $("#sdSearch").addEventListener("input",function(){ sdState.q=this.value; drawSulfTable(); });
  $$("#sdFilter button").forEach(function(b){ b.addEventListener("click",function(){ sdState.f=b.dataset.v; drawSulfTable(); }); });
  drawSulfTable();
}

/* ============================================================
   13 · K5 — TVARY SLOUČENIN SÍRY
   ============================================================ */
var shState={id:"sf6"};
function shItem(){ for(var i=0;i<SHAL.length;i++) if(SHAL[i].id===shState.id) return SHAL[i]; return SHAL[0]; }
function drawSh(){
  var it=shItem(), W=780, H=250, s="";
  var cx=300, cy=126;
  var Scol="var(--warn)", Fcol="var(--exo-soft)", Hcol="var(--surface-3)";
  function S(x,y,r,lbl){ return atom(x,y,r||24,lbl||"S",Scol,"var(--accent-ink)",16); }
  function L(x,y,lbl,c){ return atom(x,y,17,lbl,c||Fcol,"var(--ink)",12); }
  s+=txt(18,30,("TVAR MOLEKULY · "+it.vsepr).toUpperCase(),{size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  if(it.id==="sf6"){
    var d=64;
    [[0,-d],[0,d],[-d,0],[d,0],[-d*0.62,-d*0.5],[d*0.62,d*0.5]].forEach(function(p){
      s+=line(cx,cy,cx+p[0],cy+p[1],{c:"var(--ink-2)",w:2.2});
    });
    s+=S(cx,cy);
    [[0,-d],[0,d],[-d,0],[d,0],[-d*0.62,-d*0.5],[d*0.62,d*0.5]].forEach(function(p){
      s+=L(cx+p[0],cy+p[1],"F");
    });
    s+=txt(cx,cy+d+42,"žádný volný pár, síra dokonale zastíněná",{anchor:"middle",size:11.5,w:600,fill:"var(--ok)"});
  } else if(it.id==="sf4"){
    s+=line(cx,cy,cx,cy-64,{c:"var(--ink-2)",w:2.2}); s+=line(cx,cy,cx,cy+64,{c:"var(--ink-2)",w:2.2});
    s+=line(cx,cy,cx+58,cy-26,{c:"var(--ink-2)",w:2.2}); s+=line(cx,cy,cx+58,cy+26,{c:"var(--ink-2)",w:2.2});
    s+=S(cx,cy);
    s+=L(cx,cy-64,"F"); s+=L(cx,cy+64,"F"); s+=L(cx+58,cy-26,"F"); s+=L(cx+58,cy+26,"F");
    s+=lonePair(cx,cy,180,"var(--bad)",42);
    s+=txt(cx-58,cy+6,"volný pár",{anchor:"end",size:11.5,w:700,fill:"var(--bad)"});
    s+=txt(cx,cy+108,"jeden volný pár = otevřená brána pro vodu",{anchor:"middle",size:11.5,w:600,fill:"var(--bad)"});
  } else if(it.id==="scl2"||it.id==="h2s"){
    var lig=it.id==="scl2"?"Cl":"H", lc=it.id==="scl2"?"var(--cat3)":Hcol;
    var ang=it.id==="scl2"?103:92.1;
    var rad=(180-ang)/2*Math.PI/180, R=72;
    s+=line(cx,cy,cx-Math.cos(rad)*R,cy+Math.sin(rad)*R,{c:"var(--ink-2)",w:2.2});
    s+=line(cx,cy,cx+Math.cos(rad)*R,cy+Math.sin(rad)*R,{c:"var(--ink-2)",w:2.2});
    s+=S(cx,cy);
    s+=L(cx-Math.cos(rad)*R,cy+Math.sin(rad)*R,lig,lc);
    s+=L(cx+Math.cos(rad)*R,cy+Math.sin(rad)*R,lig,lc);
    s+=lonePair(cx,cy,250,"var(--ink-2)",34); s+=lonePair(cx,cy,290,"var(--ink-2)",34);
    s+=txt(cx,cy-44,fixed(ang,1)+"°",{anchor:"middle",size:14,w:700,fill:"var(--accent)",mono:true});
    s+=txt(cx,cy+108,it.id==="h2s"?"úhel skoro 90° — vazba čistými orbitaly 3p, bez hybridizace":"izoelektronová a vazebně shodná s Cl₂O",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  } else if(it.id==="s2cl2"){
    var x1=cx-40, x2=cx+40;
    s+=line(x1,cy,x2,cy,{c:"var(--accent)",w:3});
    s+=line(x1,cy,x1-58,cy-38,{c:"var(--ink-2)",w:2.2}); s+=line(x2,cy,x2+58,cy+38,{c:"var(--ink-2)",w:2.2});
    s+=S(x1,cy,22); s+=S(x2,cy,22);
    s+=L(x1-58,cy-38,"Cl","var(--cat3)"); s+=L(x2+58,cy+38,"Cl","var(--cat3)");
    s+=txt(cx,cy-26,"vazba S–S",{anchor:"middle",size:12,w:700,fill:"var(--accent)"});
    s+=txt(cx,cy+108,"vazba síra–síra dává síře neobvyklé oxidační číslo +I",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  } else {
    s+=line(cx-70,cy,cx+70,cy,{c:"var(--ink-2)",w:2.4});
    s+=line(cx-70,cy-6,cx+70,cy-6,{c:"var(--ink-2)",w:2.4});
    s+=line(cx-70,cy+6,cx+70,cy+6,{c:"var(--ink-2)",w:2.4});
    s+=S(cx-70,cy,22); s+=S(cx+70,cy,22);
    s+=atom(cx,cy,22,"C","var(--surface-3)","var(--ink)",16);
    s+=txt(cx,cy-46,"S=C=S · lineární",{anchor:"middle",size:12.5,w:700,fill:"var(--accent)"});
    s+=txt(cx,cy+108,"násobná vazba se sírou; tendence k π klesá S > Se > Te",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  }
  /* pravý informační panel */
  s+=rect(520,44,244,166,{fill:"var(--surface-2)",r:12,stroke:"var(--line)",sw:1.2});
  s+=txt(642,76,it.f,{anchor:"middle",size:24,w:800,fill:"var(--accent)"});
  s+=txt(642,98,it.n,{anchor:"middle",size:12,fill:"var(--ink-2)"});
  s+=line(540,112,744,112,{c:"var(--grid)",w:1});
  [["ox. číslo S",it.ox],["geometrie",it.geo],["stálost",it.st]].forEach(function(r,i){
    var vs = r[1].length>22 ? 9 : (r[1].length>17 ? 10 : 11);
    s+=txt(540,136+i*26,r[0],{size:10,fill:"var(--ink-3)",style:"letter-spacing:.05em"});
    s+=txt(744,136+i*26,r[1],{anchor:"end",size:vs,w:600,fill:"var(--ink)"});
  });
  return svg("0 0 "+W+" "+H,s,'aria-label="Tvar molekuly sloučeniny síry"');
}
function refreshSh(){
  var it=shItem();
  $("#shWrap").innerHTML=drawSh();
  ro("#shRo1","Oxidační číslo síry",it.ox,it.n,"");
  ro("#shRo2","Geometrie",it.geo,it.vsepr,"");
  ro("#shRo3","Stálost",it.st.indexOf("stálý")>=0?"vysoká":"nízká",it.st, it.st.indexOf("stálý")>=0?"pos":"neg");
  $("#shPrep").innerHTML='<b>Příprava:</b> <span class="chem">'+it.prep+'</span>';
  say("#shSay",it.say);
  segSet("#shSeg",it.id);
}
function initSh(){
  $$("#shSeg button").forEach(function(b){
    b.addEventListener("click",function(){ shState.id=b.dataset.v; refreshSh(); });
  });
  refreshSh();
}
