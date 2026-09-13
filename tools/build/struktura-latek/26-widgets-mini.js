/* ============================================================
   T18 · RYCHLOPRŮCHOD — tři kompaktní grafy
   ============================================================ */

/* (A) Tři skupenství vedle sebe */
function drawMiniStates(){
  var W=720,H=230, s='', rnd=skupRnd(3);
  function panel(ox,title,col,kind,l1,l2){
    s+=rect(ox,30,224,150,{fill:"var(--surface-2)",r:10,stroke:"var(--line)",sw:1});
    s+=txt(ox+12,22,title,{size:11,w:700,fill:col,style:"letter-spacing:.09em"});
    var r=6;
    if(kind==="s"){ for(var i=0;i<6;i++) for(var j=0;j<10;j++){ s+='<circle cx="'+(ox+22+j*20)+'" cy="'+(50+i*20)+'" r="'+r+'" style="fill:'+col+';stroke:var(--surface);stroke-width:1"/>'; } }
    else if(kind==="l"){ var pl=[],t=0; while(pl.length<52&&t<3000){ t++; var x=ox+12+rnd()*200, y=100+rnd()*70, ok=true; for(var k=0;k<pl.length;k++){ var dx=pl[k][0]-x,dy=pl[k][1]-y; if(dx*dx+dy*dy<(2*r+1)*(2*r+1)){ok=false;break;} } if(ok) pl.push([x,y]); } pl.forEach(function(p){ s+='<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="'+r+'" style="fill:'+col+';stroke:var(--surface);stroke-width:1"/>'; }); s+=line(ox+8,96,ox+216,96,{c:col,w:1.2,dash:"4 3"}); }
    else { for(var g=0;g<14;g++){ var gx=ox+16+rnd()*192, gy=42+rnd()*126, a=rnd()*6.28; s+=line(gx,gy,gx+Math.cos(a)*16,gy+Math.sin(a)*16,{c:"var(--ink-3)",w:1.2,cap:"round"}); s+='<circle cx="'+gx.toFixed(1)+'" cy="'+gy.toFixed(1)+'" r="'+r+'" style="fill:'+col+';stroke:var(--surface);stroke-width:1"/>'; } }
    s+=txt(ox+112,200,l1,{anchor:"middle",size:10.5,w:600,fill:"var(--ink-2)"});
    s+=txt(ox+112,216,l2,{anchor:"middle",size:10,fill:"var(--ink-3)"});
  }
  panel(8,"PEVNÁ LÁTKA","var(--cat2)","s","vlastní tvar i objem · nestlačitelná","částice kmitají v uzlech mřížky");
  panel(248,"KAPALINA","var(--cat1)","l","vlastní objem, tvar nádoby · teče","krátkodosahový pořádek, přeskoky");
  panel(488,"PLYN","var(--cat3)","g","ani tvar, ani objem · stlačitelný","volný chaotický pohyb, tlak = nárazy");
  $("#miniStatesWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Tři skupenství — částicový model"');
}

/* (B) Strom typů krystalových mřížek */
function drawMiniLatt(){
  var W=720,H=330, s='';
  s+=rect(210,14,300,44,{fill:"var(--accent-soft)",r:10,stroke:"var(--accent)",sw:1.4});
  s+=txt(360,33,"KRYSTALOVÁ MŘÍŽKA",{anchor:"middle",size:11.5,w:700,fill:"var(--accent)",style:"letter-spacing:.09em"});
  s+=txt(360,49,"co sedí v uzlech? co je drží pohromadě?",{anchor:"middle",size:10.5,fill:"var(--ink-2)"});
  var cols=[
    {x:8,  c:"var(--cat1)", t:"IONTOVÁ",   p:"kationty + anionty",   f:"iontová vazba",          ex:"NaCl, CsCl, MgO, KNO₃", tt:"stovky až tisíce °C", pr:"tvrdé, křehké · vodí jen tavenina / roztok"},
    {x:186,c:"var(--cat2)", t:"ATOMOVÁ",   p:"atomy v síti",         f:"kovalentní vazby",       ex:"diamant, SiO₂, Si, grafit*", tt:"> 1500 °C", pr:"velmi tvrdé · izolanty (*grafit vodí)"},
    {x:364,c:"var(--cat3)", t:"MOLEKULOVÁ",p:"celé molekuly",        f:"mezimolekulové síly",    ex:"led, I₂, CO₂, naftalen", tt:"< 300 °C", pr:"měkké, sublimují · nevodí"},
    {x:542,c:"var(--cat4)", t:"KOVOVÁ",    p:"kationty + e⁻ plyn",   f:"kovová vazba",           ex:"Cu, Fe, W, Na", tt:"−39 (Hg) až 3422 °C (W)", pr:"kujné, tažné · vodí, lesklé"}
  ];
  cols.forEach(function(c){
    var cx=c.x+85;
    s+=line(360,58,cx,84,{c:"var(--line-strong)",w:1.4});
    s+=rect(c.x,84,170,232,{fill:"var(--surface-2)",r:10,stroke:c.c,sw:1.4});
    s+=txt(cx,106,c.t,{anchor:"middle",size:11.5,w:700,fill:c.c,style:"letter-spacing:.08em"});
    var rows=[["v uzlech",c.p],["drží",c.f],["příklady",c.ex],["t. tání",c.tt]];
    rows.forEach(function(r,i){ var y=130+i*38; s+=txt(c.x+12,y,r[0].toUpperCase(),{size:9,w:600,fill:"var(--ink-3)",style:"letter-spacing:.07em"}); s+=txt(c.x+12,y+15,r[1],{size:10.5,w:600,fill:"var(--ink)"}); });
    s+=txt(c.x+12,292,c.pr.split(" · ")[0],{size:9.5,fill:"var(--ink-2)"});
    s+=txt(c.x+12,306,c.pr.split(" · ")[1],{size:9.5,fill:"var(--ink-2)"});
  });
  $("#miniLattWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Čtyři typy krystalových mřížek"');
}

/* (C) Vliv volných párů na úhel: CH₄ → NH₃ → H₂O */
function drawMiniAngle(){
  var W=720,H=250, s='';
  var items=[["AX4","C","H","CH₄","109,5°","0 volných párů"],["AX3E","N","H","NH₃","107°","1 volný pár"],["AX2E2","O","H","H₂O","104,5°","2 volné páry"]];
  items.forEach(function(it,i){
    var ox=8+i*238, v=VS_(it[0]);
    s+=rect(ox,8,224,H-16,{fill:"var(--surface-2)",r:10,stroke:"var(--line)",sw:1});
    s+=txt(ox+12,28,it[3]+" · "+v.lab,{size:11.5,w:700,fill:"var(--ink)"});
    s+=txt(ox+212,28,it[5],{anchor:"end",size:10,fill:"var(--endo)",w:600});
    s+=drawGeom(v.geo,{cx:ox+112,cy:128,R:62,A:it[1],X:it[2],angle: it[0]==="AX4"?0:0, angleLabel:it[4]});
    s+=txt(ox+112,H-18,"úhel "+it[4]+(i?" — volný pár tlačí vazby k sobě":" — ideální tetraedr"),{anchor:"middle",size:10,w:600,fill:i?"var(--exo)":"var(--ink-3)"});
  });
  $("#miniAngleWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Vliv volných elektronových párů na vazebný úhel"');
}
