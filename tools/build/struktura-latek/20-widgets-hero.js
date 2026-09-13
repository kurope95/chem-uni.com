/* ============================================================
   T2 · SPOLEČNÝ KRESLIČ GEOMETRIE MOLEKULY (VSEPR / hybridizace)
   ============================================================ */
/* geo: pole {k:"X"|"E", x, y, st:"p"|"w"|"d"}; o: {cx,cy,R,A,X,lobes,angle,angleLabel,col} */
function drawGeom(geo,o){
  o=o||{};
  var cx=o.cx||130, cy=o.cy||130, R=o.R||88, s='';
  var colX=o.col||"var(--ink-2)", colE="var(--endo)";
  /* nejdřív čárkované (vzadu), pak plné, pak klíny (vpředu) */
  var order=geo.slice().sort(function(a,b){ var r=function(g){return g.k==="E"?1:(g.st==="d"?0:(g.st==="w"?3:2));}; return r(a)-r(b); });
  order.forEach(function(g){
    var ex=cx+g.x*R, ey=cy+g.y*R;
    var dx=ex-cx, dy=ey-cy, L=Math.sqrt(dx*dx+dy*dy)||1, ux=dx/L, uy=dy/L, px=-uy, py=ux;
    if(g.k==="E"){
      /* volný pár: lalok + dvě tečky */
      var lx=cx+ux*R*0.62, ly=cy+uy*R*0.62, ang=Math.atan2(uy,ux)*180/Math.PI;
      s+='<ellipse cx="'+lx.toFixed(1)+'" cy="'+ly.toFixed(1)+'" rx="'+(R*0.44).toFixed(1)+'" ry="'+(R*0.2).toFixed(1)+
         '" transform="rotate('+ang.toFixed(1)+' '+lx.toFixed(1)+' '+ly.toFixed(1)+')" style="fill:'+colE+';fill-opacity:.16;stroke:'+colE+';stroke-width:1.5;stroke-dasharray:3 3"/>';
      s+='<circle cx="'+(lx-px*5).toFixed(1)+'" cy="'+(ly-py*5).toFixed(1)+'" r="3" style="fill:'+colE+'"/>';
      s+='<circle cx="'+(lx+px*5).toFixed(1)+'" cy="'+(ly+py*5).toFixed(1)+'" r="3" style="fill:'+colE+'"/>';
      if(o.lobes) s+=txt(cx+ux*R*1.12,cy+uy*R*1.12+4,"volný pár",{anchor:"middle",size:10,fill:colE,w:600});
      return;
    }
    if(o.lobes){
      /* hybridní orbital jako lalok */
      var hx=cx+ux*R*0.55, hy=cy+uy*R*0.55, a2=Math.atan2(uy,ux)*180/Math.PI;
      s+='<ellipse cx="'+hx.toFixed(1)+'" cy="'+hy.toFixed(1)+'" rx="'+(R*0.5).toFixed(1)+'" ry="'+(R*0.19).toFixed(1)+
         '" transform="rotate('+a2.toFixed(1)+' '+hx.toFixed(1)+' '+hy.toFixed(1)+')" style="fill:var(--accent);fill-opacity:'+(g.st==="d"?".18":(g.st==="w"?".55":".38"))+';stroke:var(--accent);stroke-width:1.4'+(g.st==="d"?";stroke-dasharray:4 3":"")+'"/>';
      return;
    }
    var x0=cx+ux*14, y0=cy+uy*14, x1=ex-ux*11, y1=ey-uy*11;
    if(g.st==="w"){
      s+='<polygon points="'+x0.toFixed(1)+','+y0.toFixed(1)+' '+(x1+px*5).toFixed(1)+','+(y1+py*5).toFixed(1)+' '+(x1-px*5).toFixed(1)+','+(y1-py*5).toFixed(1)+'" style="fill:'+colX+'"/>';
    } else if(g.st==="d"){
      for(var i=0;i<=6;i++){
        var t=i/6, qx=x0+(x1-x0)*t, qy=y0+(y1-y0)*t, w=1+4.5*t;
        s+=line(qx-px*w,qy-py*w,qx+px*w,qy+py*w,{c:colX,w:1.8});
      }
    } else {
      s+=line(x0,y0,x1,y1,{c:colX,w:2.4,cap:"round"});
    }
    s+='<circle cx="'+ex.toFixed(1)+'" cy="'+ey.toFixed(1)+'" r="11" style="fill:var(--surface);stroke:'+colX+';stroke-width:1.6"/>';
    s+=txt(ex,ey+4,o.X||"X",{anchor:"middle",size:11,w:600,fill:"var(--ink)"});
  });
  /* centrální atom */
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="15" style="fill:var(--accent);stroke:var(--surface);stroke-width:2"/>';
  s+=txt(cx,cy+4.5,o.A||"A",{anchor:"middle",size:12,w:700,fill:"var(--accent-ink)"});
  /* úhel mezi prvními dvěma ligandy */
  if(o.angle!==undefined && !o.lobes){
    var xs=geo.filter(function(g){return g.k==="X";});
    if(xs.length>=2){
      var a=xs[o.angle||0], b=xs[(o.angle||0)+1];
      var aa=Math.atan2(a.y,a.x), ab=Math.atan2(b.y,b.x), r=30;
      var d=ab-aa; while(d>Math.PI) d-=2*Math.PI; while(d<-Math.PI) d+=2*Math.PI;
      var large=Math.abs(d)>Math.PI?1:0, sweep=d>0?1:0;
      s+='<path d="M'+(cx+Math.cos(aa)*r).toFixed(1)+' '+(cy+Math.sin(aa)*r).toFixed(1)+' A'+r+' '+r+' 0 '+large+' '+sweep+' '+(cx+Math.cos(ab)*r).toFixed(1)+' '+(cy+Math.sin(ab)*r).toFixed(1)+'" style="fill:none;stroke:var(--exo);stroke-width:1.6"/>';
      var am=aa+d/2;
      s+=txt(cx+Math.cos(am)*(r+16),cy+Math.sin(am)*(r+16)+4,o.angleLabel||"",{anchor:"middle",size:11,w:600,fill:"var(--exo)",mono:true});
    }
  }
  return s;
}

/* ============================================================
   T3 · HERO — průzkumník VSEPR
   ============================================================ */
var HERO_ATOMS={AX2:["Be","Cl","BeCl₂"],AX3:["B","F","BF₃"],AX2E:["S","O","SO₂"],AX4:["C","H","CH₄"],AX3E:["N","H","NH₃"],AX2E2:["O","H","H₂O"],
  AX5:["P","Cl","PCl₅"],AX4E:["S","F","SF₄"],AX3E2:["Cl","F","ClF₃"],AX2E3:["Xe","F","XeF₂"],AX6:["S","F","SF₆"],AX5E:["Br","F","BrF₅"],AX4E2:["Xe","F","XeF₄"]};
var heroState={type:"AX2E2"};
function drawHero(){
  var v=VS_(heroState.type), at=HERO_ATOMS[v.id];
  var W=720,H=300, s='';
  /* levý panel: molekula */
  s+=rect(8,8,300,H-16,{fill:"var(--surface-2)",r:12,stroke:"var(--line)",sw:1});
  s+=txt(24,32,"TVAR MOLEKULY · "+v.lab,{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  s+=txt(24,52,at[2]+" — "+v.name,{size:13.5,w:600,fill:"var(--ink)"});
  s+=drawGeom(v.geo,{cx:158,cy:172,R:84,A:at[0],X:at[1],angle:0,angleLabel:(v.real.match(/[0-9]+(?:,[0-9]+)?°/)||[v.ideal])[0]});
  /* pravý panel: schéma domén */
  var x0=332;
  s+=rect(x0,8,W-x0-8,H-16,{fill:"var(--surface-2)",r:12,stroke:"var(--line)",sw:1});
  s+=txt(x0+16,32,"ELEKTRONOVÉ DOMÉNY KOLEM CENTRÁLNÍHO ATOMU",{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  var dom=[];
  for(var i=0;i<v.n-v.e;i++) dom.push("X");
  for(var j=0;j<v.e;j++) dom.push("E");
  dom.forEach(function(d,i){
    var bx=x0+16+i*58, by=48;
    s+=rect(bx,by,50,40,{fill:d==="X"?"var(--accent-soft)":"var(--endo-soft)",r:8,stroke:d==="X"?"var(--accent)":"var(--endo)",sw:1.3});
    s+=txt(bx+25,by+18,d==="X"?"vazba":"volný",{anchor:"middle",size:10,w:600,fill:d==="X"?"var(--accent)":"var(--endo)"});
    s+=txt(bx+25,by+32,d==="X"?"σ (± π)":"pár",{anchor:"middle",size:9.5,fill:"var(--ink-3)"});
  });
  var rows=[
    ["počet domén", v.n+" → "+v.eg],
    ["z toho volných párů", v.e+(v.e?" → tvar zúžený na „"+v.name+"“":" → tvar = elektronové uspořádání")],
    ["ideální úhel", v.ideal],
    ["skutečný úhel", v.real],
    ["hybridizace", v.hyb+"  ("+v.n+" domén = "+v.n+" hybridních orbitalů)"],
    ["polarita (stejné ligandy)", v.polar?"polární — dipóly se nevyruší":"nepolární — dipóly vazeb se vyruší"]
  ];
  rows.forEach(function(r,i){
    var y=118+i*29;
    s+=line(x0+16,y+10,W-24,y+10,{c:"var(--line)",w:1});
    s+=txt(x0+16,y+4,r[0].toUpperCase(),{size:9.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.07em"});
    s+=txt(x0+190,y+5,r[1],{size:11.5,w:600,fill:i===5?(v.polar?"var(--endo)":"var(--exo)"):"var(--ink)"});
  });
  $("#heroSvgWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Tvar molekuly podle VSEPR — '+v.lab+'"');
  function ro(id,k,val,h,cls){ var e=$(id); e.className="readout "+(cls||""); e.innerHTML='<span class="k">'+k+'</span><span class="v">'+val+'</span><span class="h">'+h+'</span>'; }
  ro("#heroRo1","Tvar molekuly",v.name,"elektronové uspořádání: "+v.eg);
  ro("#heroRo2","Vazebný úhel",v.real.split(" (")[0],"ideální "+v.ideal+(v.e?" · skutečný: "+v.real:""));
  ro("#heroRo3","Domény · hybridizace",v.n+" · "+v.hyb,(v.n-v.e)+" vazebných + "+v.e+" volných");
  ro("#heroRo4","Polarita",v.polar?"polární":"nepolární",v.polar?"asymetrie kvůli volným párům":"symetrický tvar",v.polar?"pos":"neg");
  $("#heroEx").innerHTML='<span class="eyebrow">Příklady typu '+v.lab+'</span><p>'+v.ex.map(function(e){ return '<span class="chem" style="font-weight:600">'+e[0]+'</span> <span class="mono" style="color:var(--ink-3);font-size:.85em">'+e[1]+'</span>'; }).join(' &nbsp;·&nbsp; ')+'</p>';
  $("#heroNote").innerHTML=v.note;
  $("#heroTypeLbl").textContent=v.lab+" — "+at[2];
}
function initHero(){
  var sel=$("#heroType");
  sel.innerHTML=VSEPR.map(function(v){ return '<option value="'+v.id+'"'+(v.id===heroState.type?' selected':'')+'>'+v.lab+' — '+v.name+' ('+HERO_ATOMS[v.id][2]+')</option>'; }).join("");
  sel.addEventListener("change",function(){ heroState.type=sel.value; $$("#heroDom button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===String(VS_(sel.value).n)); }); drawHero(); });
  $$("#heroDom button").forEach(function(b){
    b.addEventListener("click",function(){
      var n=+b.dataset.v, first=null;
      for(var i=0;i<VSEPR.length;i++){ if(VSEPR[i].n===n){ first=VSEPR[i]; break; } }
      if(!first) return;
      heroState.type=first.id; sel.value=first.id;
      $$("#heroDom button").forEach(function(x){ x.setAttribute("aria-pressed", x===b); });
      drawHero();
    });
  });
  drawHero();
}

/* ============================================================
   T4 · TRENAŽÉR VSEPR (kapitola 5) — vzorec → tvar
   ============================================================ */
var vtI=0, vtScore=0, vtAnswered=false, vtOrder=[];
function drawVT(){
  var it=VT[vtOrder[vtI]];
  $("#vtQn").textContent=vtI+1; $("#vtQtot").textContent=VT.length; $("#vtScore").textContent=vtScore;
  $("#vtFormula").innerHTML='<span class="chem" style="font-size:1.5rem;font-weight:600">'+it.f+'</span><br><span style="font-size:.85rem;color:var(--ink-3);font-family:var(--f-ui)">Jaký tvar má tato částice? Spočítejte domény kolem centrálního atomu.</span>';
  $("#vtOpts").innerHTML=VSHAPES.map(function(sh){ return '<button class="btn btn-sm" type="button" data-sh="'+sh+'">'+sh+'</button>'; }).join("");
  $$("#vtOpts button").forEach(function(b){ b.addEventListener("click",function(){ vtAnswer(b); }); });
  var ex=$("#vtExplain"); ex.style.display="none"; ex.className="explain";
  $("#vtNext").disabled=true; vtAnswered=false;
}
function vtAnswer(b){
  if(vtAnswered) return; vtAnswered=true;
  var it=VT[vtOrder[vtI]], ok=b.dataset.sh===it.a;
  if(ok) vtScore++;
  $("#vtScore").textContent=vtScore;
  var ex=$("#vtExplain"); ex.className="explain"; ex.style.display="flex";
  ex.style.background=ok?"var(--ok-soft)":"var(--bad-soft)"; ex.style.borderColor=ok?"var(--ok)":"var(--bad)";
  ex.innerHTML='<span class="verdict" style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+(ok?"✓ Správně":"✕ Špatně — správně je „"+it.a+"“")+'</span><span class="eyebrow">Proč</span><div>'+it.e+'</div>';
  $$("#vtOpts button").forEach(function(x){ x.disabled=true; x.style.opacity=x.dataset.sh===it.a?"1":".45"; if(x.dataset.sh===it.a){ x.style.borderColor="var(--ok)"; x.style.color="var(--ok)"; } });
  $("#vtNext").disabled = vtI>=VT.length-1;
  if(vtI>=VT.length-1){
    toast("Trenažér VSEPR dokončen: "+vtScore+" z "+VT.length+" správně.");
    if(vtScore>=10) markDone("k5");
  }
}
function initVT(){
  vtOrder=VT.map(function(_,i){return i;});
  for(var i=vtOrder.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=vtOrder[i]; vtOrder[i]=vtOrder[j]; vtOrder[j]=t; }
  $("#vtNext").addEventListener("click",function(){ if(vtI<VT.length-1){ vtI++; drawVT(); } });
  $("#vtRestart").addEventListener("click",function(){ vtI=0; vtScore=0; initVTOrder(); drawVT(); });
  drawVT();
}
function initVTOrder(){ for(var i=vtOrder.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=vtOrder[i]; vtOrder[i]=vtOrder[j]; vtOrder[j]=t; } }

/* ============================================================
   T5 · HYBRIDIZACE (kapitola 6)
   ============================================================ */
/* konfigurace centrálního atomu: stádia = [název, [ [popisek, [elektrony v boxech]] … ]] */
var HYBCFG={
 "BeCl₂":{A:"Be",X:"Cl",vs:"AX2", st:[["základní stav Be: 2s²",[["2s",[2]],["2p",[0,0,0]]]],["excitace 2s¹ 2p¹",[["2s",[1]],["2p",[1,0,0]]]],["hybridizace sp",[["sp",[1,1]],["2p",[0,0]]]]]},
 "C₂H₂":{A:"C",X:"H",vs:"AX2", st:[["základní stav C: 2s² 2p²",[["2s",[2]],["2p",[1,1,0]]]],["excitace 2s¹ 2p³",[["2s",[1]],["2p",[1,1,1]]]],["hybridizace sp + 2 p",[["sp",[1,1]],["2p",[1,1]]]]]},
 "CO₂":{A:"C",X:"O",vs:"AX2", st:[["základní stav C: 2s² 2p²",[["2s",[2]],["2p",[1,1,0]]]],["excitace 2s¹ 2p³",[["2s",[1]],["2p",[1,1,1]]]],["hybridizace sp + 2 p",[["sp",[1,1]],["2p",[1,1]]]]]},
 "BF₃":{A:"B",X:"F",vs:"AX3", st:[["základní stav B: 2s² 2p¹",[["2s",[2]],["2p",[1,0,0]]]],["excitace 2s¹ 2p²",[["2s",[1]],["2p",[1,1,0]]]],["hybridizace sp² + prázdný p",[["sp²",[1,1,1]],["2p",[0]]]]]},
 "C₂H₄":{A:"C",X:"H",vs:"AX3", st:[["základní stav C: 2s² 2p²",[["2s",[2]],["2p",[1,1,0]]]],["excitace 2s¹ 2p³",[["2s",[1]],["2p",[1,1,1]]]],["hybridizace sp² + 1 p",[["sp²",[1,1,1]],["2p",[1]]]]]},
 "C₆H₆":{A:"C",X:"H",vs:"AX3", st:[["základní stav C: 2s² 2p²",[["2s",[2]],["2p",[1,1,0]]]],["excitace 2s¹ 2p³",[["2s",[1]],["2p",[1,1,1]]]],["hybridizace sp² + 1 p",[["sp²",[1,1,1]],["2p",[1]]]]]},
 "SO₂":{A:"S",X:"O",vs:"AX2E", st:[["základní stav S: 3s² 3p⁴",[["3s",[2]],["3p",[2,1,1]]]],["bez excitace",[["3s",[2]],["3p",[2,1,1]]]],["hybridizace sp² (1 volný pár) + p",[["sp²",[2,1,1]],["3p",[2]]]]]},
 "CH₄":{A:"C",X:"H",vs:"AX4", st:[["základní stav C: 2s² 2p²",[["2s",[2]],["2p",[1,1,0]]]],["excitace 2s¹ 2p³",[["2s",[1]],["2p",[1,1,1]]]],["hybridizace sp³",[["sp³",[1,1,1,1]]]]]},
 "NH₃":{A:"N",X:"H",vs:"AX3E", st:[["základní stav N: 2s² 2p³",[["2s",[2]],["2p",[1,1,1]]]],["bez excitace",[["2s",[2]],["2p",[1,1,1]]]],["hybridizace sp³ (1 volný pár)",[["sp³",[2,1,1,1]]]]]},
 "H₂O":{A:"O",X:"H",vs:"AX2E2", st:[["základní stav O: 2s² 2p⁴",[["2s",[2]],["2p",[2,1,1]]]],["bez excitace",[["2s",[2]],["2p",[2,1,1]]]],["hybridizace sp³ (2 volné páry)",[["sp³",[2,2,1,1]]]]]},
 "C₂H₆":{A:"C",X:"H",vs:"AX4", st:[["základní stav C: 2s² 2p²",[["2s",[2]],["2p",[1,1,0]]]],["excitace 2s¹ 2p³",[["2s",[1]],["2p",[1,1,1]]]],["hybridizace sp³",[["sp³",[1,1,1,1]]]]]},
 "PCl₅":{A:"P",X:"Cl",vs:"AX5", st:[["základní stav P: 3s² 3p³",[["3s",[2]],["3p",[1,1,1]],["3d",[0,0,0,0,0]]]],["excitace 3s¹ 3p³ 3d¹",[["3s",[1]],["3p",[1,1,1]],["3d",[1,0,0,0,0]]]],["hybridizace sp³d",[["sp³d",[1,1,1,1,1]],["3d",[0,0,0,0]]]]]},
 "SF₄":{A:"S",X:"F",vs:"AX4E", st:[["základní stav S: 3s² 3p⁴",[["3s",[2]],["3p",[2,1,1]],["3d",[0,0,0,0,0]]]],["excitace 3s² 3p³ 3d¹",[["3s",[2]],["3p",[1,1,1]],["3d",[1,0,0,0,0]]]],["hybridizace sp³d (1 volný pár)",[["sp³d",[2,1,1,1,1]],["3d",[0,0,0,0]]]]]},
 "XeF₂":{A:"Xe",X:"F",vs:"AX2E3", st:[["základní stav Xe: 5s² 5p⁶",[["5s",[2]],["5p",[2,2,2]],["5d",[0,0,0,0,0]]]],["excitace 5s² 5p⁵ 5d¹",[["5s",[2]],["5p",[2,2,1]],["5d",[1,0,0,0,0]]]],["hybridizace sp³d (3 volné páry)",[["sp³d",[2,2,2,1,1]],["5d",[0,0,0,0]]]]]},
 "SF₆":{A:"S",X:"F",vs:"AX6", st:[["základní stav S: 3s² 3p⁴",[["3s",[2]],["3p",[2,1,1]],["3d",[0,0,0,0,0]]]],["excitace 3s¹ 3p³ 3d²",[["3s",[1]],["3p",[1,1,1]],["3d",[1,1,0,0,0]]]],["hybridizace sp³d²",[["sp³d²",[1,1,1,1,1,1]],["3d",[0,0,0]]]]]},
 "XeF₄":{A:"Xe",X:"F",vs:"AX4E2", st:[["základní stav Xe: 5s² 5p⁶",[["5s",[2]],["5p",[2,2,2]],["5d",[0,0,0,0,0]]]],["excitace 5s² 5p⁴ 5d²",[["5s",[2]],["5p",[2,1,1]],["5d",[1,1,0,0,0]]]],["hybridizace sp³d² (2 volné páry)",[["sp³d²",[2,2,1,1,1,1]],["5d",[0,0,0]]]]]},
 "BrF₅":{A:"Br",X:"F",vs:"AX5E", st:[["základní stav Br: 4s² 4p⁵",[["4s",[2]],["4p",[2,2,1]],["4d",[0,0,0,0,0]]]],["excitace 4s² 4p³ 4d²",[["4s",[2]],["4p",[1,1,1]],["4d",[1,1,0,0,0]]]],["hybridizace sp³d² (1 volný pár)",[["sp³d²",[2,1,1,1,1,1]],["4d",[0,0,0]]]]]}
};
var hybState={type:"sp3",mol:"CH₄"};
function drawHyb(){
  var h=HYB_(hybState.type), mol=null;
  for(var i=0;i<h.mols.length;i++){ if(h.mols[i].f===hybState.mol) mol=h.mols[i]; }
  if(!mol){ mol=h.mols[0]; hybState.mol=mol.f; }
  var cfg=HYBCFG[mol.f], W=760, H=330, s='';
  /* levá část: orbitalové diagramy ve třech sloupcích */
  s+=txt(16,24,"ORBITALOVÝ DIAGRAM CENTRÁLNÍHO ATOMU · "+cfg.A,{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  var colW=150, x0=16;
  cfg.st.forEach(function(stg,si){
    var bx=x0+si*colW, by=46;
    s+=txt(bx,by,stg[0],{size:10.5,w:600,fill:si===2?"var(--accent)":"var(--ink-2)"});
    var yy=by+16;
    stg[1].forEach(function(orb){
      var lab=orb[0], boxes=orb[1], isH=si===2 && lab.indexOf("s")===0 && lab!=="s";
      var bw=Math.min(22,(colW-40)/boxes.length);
      boxes.forEach(function(ne,bi){
        var x=bx+bi*(bw+3), y=yy;
        s+=rect(x,y,bw,20,{fill:isH?"var(--accent-soft)":"var(--surface-2)",r:3,stroke:isH?"var(--accent)":"var(--line-strong)",sw:1});
        if(ne>=1) s+=txt(x+bw/2-(ne===2?4:0),y+15,"↑",{anchor:"middle",size:13,w:700,fill:"var(--ink)"});
        if(ne===2) s+=txt(x+bw/2+4,y+15,"↓",{anchor:"middle",size:13,w:700,fill:"var(--ink)"});
      });
      s+=txt(bx+boxes.length*(bw+3)+4,yy+14,lab,{size:11,w:600,fill:isH?"var(--accent)":"var(--ink-3)",mono:true});
      yy+=30;
    });
    if(si<2){ s+='<path d="M'+(bx+colW-26)+' 96 l16 0 l-5 -4 m5 4 l-5 4" style="fill:none;stroke:var(--ink-3);stroke-width:1.5"/>'; }
  });
  /* pravá část: tvar hybridních orbitalů */
  var gx=560, gy=150;
  s+=rect(468,8,284,H-16,{fill:"var(--surface-2)",r:12,stroke:"var(--line)",sw:1});
  s+=txt(484,32,"HYBRIDNÍ ORBITALY · "+h.lab+" · "+h.ang,{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  var v=VS_(cfg.vs);
  s+=drawGeom(v.geo,{cx:610,cy:170,R:80,lobes:true,A:cfg.A});
  /* nehybridizované p orbitaly */
  if(h.id==="sp"||h.id==="sp2"){
    var pc="var(--cat3)";
    s+='<ellipse cx="610" cy="140" rx="9" ry="26" style="fill:'+pc+';fill-opacity:.35;stroke:'+pc+';stroke-width:1.3"/>';
    s+='<ellipse cx="610" cy="200" rx="9" ry="26" style="fill:'+pc+';fill-opacity:.35;stroke:'+pc+';stroke-width:1.3"/>';
    if(h.id==="sp"){ s+='<circle cx="610" cy="170" r="14" style="fill:none;stroke:'+pc+';stroke-width:1.3;stroke-dasharray:3 2"/>'; }
    s+=txt(610,H-22,(h.id==="sp"?"2 nehybridizované p (kolmé) → π vazby":"1 nehybridizovaný p (kolmý) → π vazba"),{anchor:"middle",size:10,w:600,fill:pc});
  } else {
    s+=txt(610,H-22,"všechny p (a d) orbitaly jsou v hybridech — jen σ",{anchor:"middle",size:10,w:600,fill:"var(--ink-3)"});
  }
  /* dolní pruh: molekula */
  s+=line(16,236,452,236,{c:"var(--line)",w:1});
  s+=txt(16,258,"MOLEKULA "+mol.f,{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  s+=txt(16,280,"σ vazeb: "+mol.sig+"   ·   π vazeb: "+mol.pi+"   ·   tvar: "+v.name+"   ·   úhel: "+v.real.split(" (")[0],{size:12,w:600,fill:"var(--ink)",mono:true});
  s+=txt(16,302,"počet hybridních orbitalů = počet smíšených atomových orbitalů = počet elektronových domén",{size:10.5,fill:"var(--ink-3)"});
  $("#hybWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Hybridizace '+h.lab+' v molekule '+mol.f+'"');
  function ro(id,k,val,hh){ var e=$(id); e.innerHTML='<span class="k">'+k+'</span><span class="v">'+val+'</span><span class="h">'+hh+'</span>'; }
  ro("#hybRo1","Hybridizace",h.lab,h.from+" → "+h.np+" orbitalů");
  ro("#hybRo2","Úhel · tvar",h.ang,h.shape+" (elektronové uspořádání)");
  ro("#hybRo3","σ vazby v molekule",mol.sig,"z hybridních orbitalů (a s orbitalů H)");
  ro("#hybRo4","π vazby v molekule",mol.pi,mol.pi?"z nehybridizovaných p orbitalů":"žádné — jen jednoduché vazby");
  $("#hybNote").innerHTML="<b>"+mol.f+":</b> "+mol.d;
  $$("#hybType button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===h.id); });
  var sel=$("#hybMol");
  sel.innerHTML=h.mols.map(function(m){ return '<option value="'+m.f+'"'+(m.f===mol.f?' selected':'')+'>'+m.f+'</option>'; }).join("");
}
function initHyb(){
  $$("#hybType button").forEach(function(b){ b.addEventListener("click",function(){ hybState.type=b.dataset.v; hybState.mol=HYB_(b.dataset.v).mols[0].f; drawHyb(); }); });
  $("#hybMol").addEventListener("change",function(){ hybState.mol=this.value; drawHyb(); });
  drawHyb();
}
