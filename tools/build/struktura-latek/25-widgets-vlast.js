/* ============================================================
   T14 · ROZHODOVAČ „PODOBNÉ ROZPOUŠTÍ PODOBNÉ“ — matice (k7)
   ============================================================ */
var mixState={i:0,solv:"voda"};
function mixBadge(v){
  var m={y:["ano","ok"],n:["ne","bad"],p:["částečně","warn"]}[v];
  return '<span class="tag '+m[1]+'">'+m[0]+'</span>';
}
function drawMix(){
  var h='';
  MIX.forEach(function(row,i){
    h+='<tr><td><b class="chem">'+row.n+'</b><br><span style="font-size:.78rem;color:var(--ink-3)">'+row.kind+'</span></td>';
    MIXSOLV.forEach(function(sv){
      var cell=row.r[sv.id], on=(mixState.i===i && mixState.solv===sv.id);
      h+='<td class="n" style="cursor:pointer;'+(on?"background:var(--accent-soft);box-shadow:inset 0 0 0 2px var(--accent)":"")+'" data-i="'+i+'" data-s="'+sv.id+'" title="Klepnutím zobrazíte vysvětlení">'+mixBadge(cell[0])+'</td>';
    });
    h+='</tr>';
  });
  $("#mixBody").innerHTML=h;
  $$("#mixBody td[data-i]").forEach(function(td){ td.addEventListener("click",function(){ mixState.i=+td.dataset.i; mixState.solv=td.dataset.s; drawMix(); }); });
  var row=MIX[mixState.i], sv=null; MIXSOLV.forEach(function(x){ if(x.id===mixState.solv) sv=x; });
  var cell=row.r[mixState.solv];
  var verdict={y:"rozpustí se / mísí se",n:"nerozpustí se / nemísí se",p:"částečně, omezeně nebo s reakcí"}[cell[0]];
  $("#mixExplain").innerHTML='<span class="eyebrow">'+row.n+' v rozpouštědle '+sv.n+' ('+sv.kind+')</span><p style="margin:.3rem 0 .2rem"><b>'+verdict+'.</b> '+cell[1]+'</p>';
}
function initMix(){ drawMix(); }

/* trenažér z matice */
var mixTQs=[], mixTI=0, mixTScore=0, mixTAns=false;
function drawMixT(){
  var q=mixTQs[mixTI];
  $("#mixTQn").textContent=mixTI+1; $("#mixTQtot").textContent=mixTQs.length; $("#mixTScore").textContent=mixTScore;
  var sv=null; MIXSOLV.forEach(function(x){ if(x.id===q.s) sv=x; });
  $("#mixTQ").innerHTML='Rozpustí se (smísí se) <b class="chem" style="font-size:1.15em">'+MIX[q.i].n+'</b> <span style="color:var(--ink-3)">('+MIX[q.i].kind+')</span> v rozpouštědle <b>'+sv.n+'</b> <span style="color:var(--ink-3)">('+sv.kind+')</span>?';
  var ex=$("#mixTExplain"); ex.style.display="none"; ex.className="explain";
  $$("#mixTBtns button").forEach(function(b){ b.disabled=false; b.style.opacity=""; });
  $("#mixTNext").disabled=true; mixTAns=false;
}
function initMixT(){
  MIX.forEach(function(row,i){ MIXSOLV.forEach(function(sv){ if(row.r[sv.id][0]!=="y"||sv.id!=="ethanol"||row.n!=="ethanol") mixTQs.push({i:i,s:sv.id}); }); });
  mixTQs=mixTQs.filter(function(q){ return !(MIX[q.i].n==="ethanol" && q.s==="ethanol") && !(MIX[q.i].n==="benzen" && q.s==="benzen"); });
  for(var i=mixTQs.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=mixTQs[i]; mixTQs[i]=mixTQs[j]; mixTQs[j]=t; }
  mixTQs=mixTQs.slice(0,12);
  $$("#mixTBtns button").forEach(function(b){
    b.addEventListener("click",function(){
      if(mixTAns) return; mixTAns=true;
      var q=mixTQs[mixTI], cell=MIX[q.i].r[q.s], ok=b.dataset.a===cell[0];
      if(ok) mixTScore++;
      $("#mixTScore").textContent=mixTScore;
      var names={y:"ano — rozpustí se / mísí se",n:"ne",p:"částečně / omezeně"};
      var ex=$("#mixTExplain"); ex.className="explain"; ex.style.display="flex";
      ex.style.background=ok?"var(--ok-soft)":"var(--bad-soft)"; ex.style.borderColor=ok?"var(--ok)":"var(--bad)";
      ex.innerHTML='<span class="verdict" style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+(ok?"✓ Správně":"✕ Špatně — správně je „"+names[cell[0]]+"“")+'</span><span class="eyebrow">Proč</span><div>'+cell[1]+'</div>';
      $$("#mixTBtns button").forEach(function(x){ x.disabled=true; x.style.opacity=x.dataset.a===cell[0]?"1":".45"; });
      $("#mixTNext").disabled = mixTI>=mixTQs.length-1;
      if(mixTI>=mixTQs.length-1){ toast("Trenažér rozpustnosti dokončen: "+mixTScore+" z "+mixTQs.length+"."); if(mixTScore>=8) markDone("k7"); }
    });
  });
  $("#mixTNext").addEventListener("click",function(){ if(mixTI<mixTQs.length-1){ mixTI++; drawMixT(); } });
  drawMixT();
}

/* ============================================================
   T15 · POLARITA MOLEKULY PODLE TVARU — vektory dipólů (k7)
   ============================================================ */
var polState={i:1};
function polGeom(kind){
  var v=[];
  function pyr(alpha){ var ca=Math.cos(alpha*Math.PI/180), c2=(ca+0.5)/1.5, th=Math.acos(Math.sqrt(c2)); [90,210,330].forEach(function(ph){ var p=ph*Math.PI/180; v.push([Math.sin(th)*Math.cos(p),Math.cos(th),Math.sin(th)*Math.sin(p)]); }); }
  if(kind==="lin"){ v=[[1,0,0],[-1,0,0]]; }
  else if(kind==="diat"){ v=[[1,0,0]]; }
  else if(kind==="trig"){ v=[[0,-1,0],[0.866,0.5,0],[-0.866,0.5,0]]; }
  else if(kind==="bent104"||kind==="bent119"){ var a=(kind==="bent104"?104.5:119)/2*Math.PI/180; v=[[Math.sin(a),Math.cos(a),0],[-Math.sin(a),Math.cos(a),0]]; }
  else if(kind==="pyr107"){ pyr(107); }
  else if(kind==="tet"){ var th=Math.acos(-1/3); v=[[0,-1,0]]; [90,210,330].forEach(function(ph){ var p=ph*Math.PI/180; v.push([Math.sin(th)*Math.cos(p),-Math.cos(th),Math.sin(th)*Math.sin(p)]); }); }
  return v;
}
function rot3(p){ /* naklonění: kolem x o −18°, kolem y o 22° */
  var ax=-18*Math.PI/180, ay=22*Math.PI/180;
  var x=p[0], y=p[1]*Math.cos(ax)-p[2]*Math.sin(ax), z=p[1]*Math.sin(ax)+p[2]*Math.cos(ax);
  var x2=x*Math.cos(ay)+z*Math.sin(ay), z2=-x*Math.sin(ay)+z*Math.cos(ay);
  return [x2,y,z2];
}
function drawPol(){
  var m=POLMOL[polState.i], geo=polGeom(m.geom), W=760,H=330, s='';
  var cx=190, cy=170, R=96;
  s+=rect(8,8,360,H-16,{fill:"var(--surface-2)",r:12,stroke:"var(--line)",sw:1});
  s+=txt(24,32,"DIPÓLY VAZEB A JEJICH SOUČET · "+m.f,{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  var sum=[0,0,0], items=[];
  geo.forEach(function(u,i){
    var X=m.lig[i], d=CHI[X]-CHI[m.c]; /* + → dipól míří k ligandu */
    sum[0]+=d*u[0]; sum[1]+=d*u[1]; sum[2]+=d*u[2];
    var r=rot3(u); items.push({u:r,X:X,d:d});
  });
  var norm=Math.sqrt(sum[0]*sum[0]+sum[1]*sum[1]+sum[2]*sum[2]);
  items.sort(function(a,b){ return a.u[2]-b.u[2]; });
  items.forEach(function(it){
    var ex=cx+it.u[0]*R, ey=cy+it.u[1]*R, ux=(ex-cx)/R, uy=(ey-cy)/R, px=-uy, py=ux, st=it.u[2]>0.35?"w":(it.u[2]<-0.35?"d":"p");
    var x0=cx+ux*15, y0=cy+uy*15, x1=ex-ux*12, y1=ey-uy*12;
    if(st==="w") s+='<polygon points="'+x0.toFixed(1)+','+y0.toFixed(1)+' '+(x1+px*5).toFixed(1)+','+(y1+py*5).toFixed(1)+' '+(x1-px*5).toFixed(1)+','+(y1-py*5).toFixed(1)+'" style="fill:var(--ink-2)"/>';
    else if(st==="d"){ for(var k=0;k<=6;k++){ var t=k/6, qx=x0+(x1-x0)*t, qy=y0+(y1-y0)*t, w=1+4.5*t; s+=line(qx-px*w,qy-py*w,qx+px*w,qy+py*w,{c:"var(--ink-2)",w:1.8}); } }
    else s+=line(x0,y0,x1,y1,{c:"var(--ink-2)",w:2.4,cap:"round"});
    /* dipól vazby: šipka od δ+ k δ− (posunutá vedle vazby) */
    var mag=Math.abs(it.d), L=18+mag*22, mx=(x0+x1)/2+px*13, my=(y0+y1)/2+py*13, dir=it.d>0?1:-1;
    var ax0=mx-ux*dir*L/2, ay0=my-uy*dir*L/2, ax1=mx+ux*dir*L/2, ay1=my+uy*dir*L/2;
    s+=line(ax0,ay0,ax1,ay1,{c:"var(--exo)",w:1.6,cap:"round"});
    s+='<path d="M'+ax1.toFixed(1)+' '+ay1.toFixed(1)+' l'+(-ux*dir*6-px*3.5).toFixed(1)+' '+(-uy*dir*6-py*3.5).toFixed(1)+' l'+(px*7).toFixed(1)+' '+(py*7).toFixed(1)+' z" style="fill:var(--exo)"/>';
    s+=line(ax0-px*3,ay0-py*3,ax0+px*3,ay0+py*3,{c:"var(--exo)",w:1.6});
    s+='<circle cx="'+ex.toFixed(1)+'" cy="'+ey.toFixed(1)+'" r="12" style="fill:var(--surface);stroke:var(--ink-2);stroke-width:1.5"/>';
    s+=txt(ex,ey+4,it.X,{anchor:"middle",size:11,w:600,fill:"var(--ink)"});
    s+=txt(ex+ux*22,ey+uy*22+4,it.d>0?"δ−":"δ+",{anchor:"middle",size:10,w:700,fill:"var(--exo)"});
  });
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="16" style="fill:var(--accent);stroke:var(--surface);stroke-width:2"/>';
  s+=txt(cx,cy+4.5,m.c,{anchor:"middle",size:12,w:700,fill:"var(--accent-ink)"});
  /* výsledný dipól */
  if(norm>0.05){
    var rs=rot3([sum[0]/norm,sum[1]/norm,sum[2]/norm]), L2=40+norm*40;
    var rx=cx+rs[0]*L2, ry=cy+rs[1]*L2, rux=rs[0], ruy=rs[1], rpx=-ruy, rpy=rux;
    s+=line(cx,cy,rx,ry,{c:"var(--endo)",w:3.2,cap:"round"});
    s+='<path d="M'+rx.toFixed(1)+' '+ry.toFixed(1)+' l'+(-rux*11-rpx*6).toFixed(1)+' '+(-ruy*11-rpy*6).toFixed(1)+' l'+(rpx*12).toFixed(1)+' '+(rpy*12).toFixed(1)+' z" style="fill:var(--endo)"/>';
    s+=txt(rx+rux*16,ry+ruy*16+4,"μ",{anchor:"middle",size:14,w:700,fill:"var(--endo)",style:"font-style:italic"});
  } else {
    s+=txt(cx,cy+R+34,"Σ = 0 — dipóly se vyruší",{anchor:"middle",size:11.5,w:700,fill:"var(--ok)"});
  }
  s+=txt(24,H-22,"tenké šipky = dipóly vazeb (Δχ), tlustá = výsledný dipól molekuly",{size:10,fill:"var(--ink-3)"});
  /* pravý panel */
  var px2=392;
  s+=rect(px2-8,8,W-px2,H-16,{fill:"var(--surface-2)",r:12,stroke:"var(--line)",sw:1});
  s+=txt(px2+8,32,"ROZBOR",{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  var rows=[["tvar (VSEPR)",{lin:"lineární AX₂",diat:"dvouatomová",trig:"trigonálně planární AX₃",bent104:"lomený AX₂E₂, 104,5°",bent119:"lomený AX₂E, 119°",pyr107:"trigonálně pyramidální AX₃E, 107°",tet:"tetraedrický AX₄, 109,5°"}[m.geom]],
    ["vazby",m.lig.map(function(X){ return m.c+"–"+X+" (Δχ = "+fmt(Math.abs(CHI[X]-CHI[m.c]),2)+")"; }).filter(function(v,i,a){return a.indexOf(v)===i;}).join(", ")],
    ["součet vektorů",norm<0.05?"nula — symetrie je vyruší":"nenulový — molekula má dipól"],
    ["dipólový moment μ",m.mu?fmt(m.mu,2)+" D (tabulková hodnota)":"0 D"],
    ["závěr",norm<0.05?"NEPOLÁRNÍ molekula":"POLÁRNÍ molekula"],
    ["teplota varu",m.tv]];
  rows.forEach(function(r,i){ var y=56+i*40; s+=txt(px2+8,y,r[0].toUpperCase(),{size:9.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.07em"}); s+=txt(px2+8,y+17,r[1].length>50?r[1].slice(0,48)+"…":r[1],{size:11.5,w:600,fill:i===4?(norm<0.05?"var(--ok)":"var(--endo)"):"var(--ink)"}); s+=line(px2+8,y+25,W-24,y+25,{c:"var(--line)",w:1}); });
  $("#polWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Polarita molekuly '+m.f+'"');
  function ro(id,k,val,h,cls){ var e=$(id); e.className="readout "+(cls||""); e.innerHTML='<span class="k">'+k+'</span><span class="v">'+val+'</span><span class="h">'+h+'</span>'; }
  ro("#polRo1","Polarita",norm<0.05?"nepolární":"polární",norm<0.05?"symetrický tvar, dipóly se vyruší":"asymetrie → výsledný dipól",norm<0.05?"neg":"pos");
  ro("#polRo2","Dipólový moment",fmt(m.mu,2)+" D","1 D = 3,34·10⁻³⁰ C·m");
  ro("#polRo3","Teplota varu",m.tv,norm<0.05?"jen disperzní síly":"dipól-dipól"+((m.f==="H₂O"||m.f==="NH₃")?" + vodíkové můstky":""));
  ro("#polRo4","Rozpustnost ve vodě",norm<0.05?"špatná":"dobrá až výborná","podobné rozpouští podobné");
  $("#polNote").innerHTML="<b>"+m.f+":</b> "+m.why;
  var sel=$("#polMol"); sel.innerHTML=POLMOL.map(function(x,i){ return '<option value="'+i+'"'+(i===polState.i?' selected':'')+'>'+x.f+'</option>'; }).join("");
}
function initPol(){ $("#polMol").addEventListener("change",function(){ polState.i=+this.value; drawPol(); }); drawPol(); }

/* ============================================================
   T16 · TRENAŽÉR „SEŘAĎTE PODLE TEPLOTY VARU“ (k7)
   ============================================================ */
var bpState={set:0,seq:[],pool:[],solved:{},score:0};
function bpNum(s){ return parseFloat(String(s).replace("−","-").replace(",",".")); }
function drawBP(){
  var st=BPSETS[bpState.set];
  $("#bpTitle").textContent=st.t;
  $("#bpPool").innerHTML=bpState.pool.map(function(i){ return '<button class="btn btn-sm" type="button" data-i="'+i+'">'+st.items[i][0]+'</button>'; }).join("")||'<span style="color:var(--ink-3);font-size:.85rem">všechny látky zařazeny</span>';
  $$("#bpPool button").forEach(function(b){ b.addEventListener("click",function(){ var i=+b.dataset.i; bpState.pool=bpState.pool.filter(function(x){return x!==i;}); bpState.seq.push(i); $("#bpVerdict").classList.remove("show"); drawBP(); }); });
  $("#bpSeq").innerHTML=bpState.seq.length?bpState.seq.map(function(i,k){ return '<span style="display:inline-flex;align-items:center;gap:.4rem;padding:.35rem .7rem;border:1px solid var(--accent);border-radius:99px;background:var(--accent-soft);font-size:.88rem;font-weight:600">'+(k+1)+'. '+st.items[i][0]+'</span>'; }).join('<span style="color:var(--ink-3)">&nbsp;&lt;&nbsp;</span>'):'<span style="color:var(--ink-3);font-size:.85rem">klepejte na látky od <b>nejnižší</b> teploty varu k nejvyšší</span>';
  $("#bpScore").textContent=bpState.score; $("#bpTot").textContent=BPSETS.length;
}
function initBP(){
  var sel=$("#bpSet"); sel.innerHTML=BPSETS.map(function(s,i){ return '<option value="'+i+'">'+(i+1)+". "+s.t+'</option>'; }).join("");
  function reset(){ var st=BPSETS[bpState.set]; bpState.seq=[]; bpState.pool=st.items.map(function(_,i){return i;}); for(var i=bpState.pool.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=bpState.pool[i]; bpState.pool[i]=bpState.pool[j]; bpState.pool[j]=t; } $("#bpVerdict").classList.remove("show"); drawBP(); }
  sel.addEventListener("change",function(){ bpState.set=+sel.value; reset(); });
  $("#bpReset").addEventListener("click",reset);
  $("#bpCheck").addEventListener("click",function(){
    var st=BPSETS[bpState.set], v=$("#bpVerdict"); v.classList.add("show");
    if(bpState.seq.length<st.items.length){ v.innerHTML='<span class="tag warn">Neúplné</span><span>Zařaďte všechny látky.</span>'; return; }
    var correct=st.items.map(function(_,i){return i;}).sort(function(a,b){ return bpNum(st.items[a][1])-bpNum(st.items[b][1]); });
    var ok=correct.every(function(c,i){ return bpState.seq[i]===c; });
    var truth=correct.map(function(i){ return st.items[i][0].split(" ")[0]+" ("+st.items[i][1]+" °C)"; }).join(" &lt; ");
    if(ok){ if(!bpState.solved[bpState.set]){ bpState.solved[bpState.set]=true; bpState.score++; } v.innerHTML='<span class="tag ok">✓ Správně</span><span>'+truth+'. '+st.e+'</span>'; if(bpState.score>=5) markDone("k7"); }
    else v.innerHTML='<span class="tag bad">✕ Ještě ne</span><span>Správné pořadí: '+truth+'. '+st.e+'</span>';
    $("#bpScore").textContent=bpState.score;
  });
  reset();
}

/* ============================================================
   T17 · PROHLEDÁVATELNÁ TABULKA LÁTEK (k7)
   ============================================================ */
var tblState={q:"",f:"all"};
function drawTbl(){
  var q=tblState.q.toLowerCase().trim();
  var rows=SUBS.filter(function(s){ if(tblState.f!=="all" && s.g!==tblState.f) return false; if(!q) return true; return (s.n+" "+s.f+" "+s.tvar+" "+s.pol+" "+s.hyb).toLowerCase().indexOf(q)>=0; });
  var gname={mol:"molekulová",ion:"iontová",atom:"atomová",kov:"kovová",amorf:"amorfní"};
  var h=rows.map(function(s){
    var pc = s.pol==="polární"?"var(--endo)":(s.pol==="nepolární"?"var(--exo)":"var(--ink-2)");
    return '<tr><td><b class="chem">'+s.f+'</b><br><span style="font-size:.78rem;color:var(--ink-3)">'+s.n+' · '+gname[s.g]+'</span></td><td style="font-size:.86rem">'+s.tvar+'</td><td class="mono" style="font-size:.86rem">'+s.hyb+'</td><td style="color:'+pc+';font-weight:600;font-size:.86rem">'+s.pol+'</td><td class="n">'+s.tt+'</td><td class="n">'+s.tv+'</td><td style="font-size:.84rem">'+s.rozp+'</td><td style="font-size:.84rem">'+s.vod+'</td></tr>';
  }).join("");
  if(!rows.length) h='<tr><td colspan="8" style="color:var(--ink-3);padding:1.2rem">Nic nenalezeno. Zkuste „voda“, „NaCl“, „tetraedr“ nebo „polární“.</td></tr>';
  $("#tblBody").innerHTML=h;
  $("#tblCount").textContent=rows.length;
  $$("#tblFilter button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===tblState.f); });
}
function initTbl(){
  $("#tblSearch").addEventListener("input",function(){ tblState.q=this.value; drawTbl(); });
  $$("#tblFilter button").forEach(function(b){ b.addEventListener("click",function(){ tblState.f=b.dataset.v; drawTbl(); }); });
  drawTbl();
}
