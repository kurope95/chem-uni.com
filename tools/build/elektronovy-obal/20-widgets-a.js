/* ============================================================
   7 · SPOLEČNÉ KRESLICÍ POMOCNÍKY (rámečky, šipky spinů)
   ============================================================ */
var LCOL={0:"var(--cat1)",1:"var(--cat3)",2:"var(--cat2)",3:"var(--cat4)"};
/* šipka spinu: up=true → ↑ */
function spinArrow(x,y,up,color){
  var c=color||"var(--ink)";
  var y1=up?y+7:y-7, y2=up?y-7:y+7, d=up?1:-1;
  return line(x,y1,x,y2,{c:c,w:1.8,cap:"round"})+
    '<path d="M'+x+' '+y2+' l-3.2 '+(4*d)+' l6.4 0 z" style="fill:'+c+'"/>';
}
/* jeden rámeček orbitalu s 0/1/2 elektrony; e=0,1,2; bad=true → přeškrtnuté (chybné) */
function orbBox(x,y,size,e,color,opts){
  opts=opts||{};
  var s=rect(x,y,size,size,{fill:opts.fill||"var(--surface)",stroke:opts.stroke||"var(--line-strong)",sw:opts.sw||1.3,r:3});
  var cx=x+size/2, cy=y+size/2;
  if(e===1) s+=spinArrow(cx,cy,true,color);
  if(e===2){ s+=spinArrow(cx-4.5,cy,true,color); s+=spinArrow(cx+4.5,cy,false,color); }
  if(e===-2){ s+=spinArrow(cx-4.5,cy,true,"var(--bad)"); s+=spinArrow(cx+4.5,cy,true,"var(--bad)"); }
  return s;
}
/* rozdělí e elektronů do m orbitalů podle Hunda → pole obsazení [2,1,1,…] */
function hundFill(e,m){
  var a=[]; for(var i=0;i<m;i++) a.push(0);
  for(var k=0;k<e;k++){ a[k%m]++; }
  return a;
}
function nameEl(Z){ var e=EL(Z); return e ? e.s+" · "+e.n : "Z = "+Z; }
var SUBSD={"0":"₀","1":"₁","2":"₂","3":"₃","4":"₄","5":"₅","6":"₆","7":"₇","8":"₈","9":"₉"};
function subn(n){ return String(n).split("").map(function(c){return SUBSD[c]||c;}).join(""); }
function tsub(t){ return '<tspan dy="4" style="font-size:.75em">'+t+'</tspan><tspan dy="-4"> </tspan>'; }

/* ============================================================
   8 · WIDGET — HERO: stavitel elektronové konfigurace
   ============================================================ */
var heroState={Z:26};
function drawHero(){
  var Z=heroState.Z, e=EL(Z), subs=cfg(Z), core=coreZ(Z), coreSubs=core?cfg(core):[];
  var isCore=function(s){ var r=false; coreSubs.forEach(function(k){ if(k.key===s.key&&k.e===s.e) r=true; }); return r; };
  var rowH=30, box=22, gap=4, W=440, top=34, H=top+subs.length*rowH+14;
  var s='';
  s+=txt(14,20,"POŘADÍ OBSAZOVÁNÍ (ZDOLA NAHORU) · RÁMEČKOVÝ DIAGRAM",{size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  subs.forEach(function(sub,i){
    var y=H-14-(i+1)*rowH+4;
    var m=2*sub.l+1, fill=hundFill(sub.e,m), col=LCOL[sub.l], val=!isCore(sub);
    s+=txt(56,y+box/2+4,sub.key,{anchor:"end",size:13,w:700,fill:val?"var(--ink)":"var(--ink-3)",mono:true});
    s+=txt(62,y+box/2+4,sup(sub.e),{size:12,w:600,fill:col,mono:true});
    var x0=96;
    for(var k=0;k<m;k++){
      s+=orbBox(x0+k*(box+gap),y,box,fill[k],col,{stroke:val?col:"var(--line)",sw:val?1.6:1});
    }
    if(!val) s+=txt(x0+m*(box+gap)+8,y+box/2+4,"vnitřní ("+NOBLE_SYM[core]+")",{size:10.5,fill:"var(--ink-3)"});
    else s+=txt(x0+m*(box+gap)+8,y+box/2+4,"valenční",{size:10.5,w:600,fill:col});
  });
  /* energie osa */
  s+=line(W-26,top+6,W-26,H-14,{c:"var(--line-strong)",w:1.4});
  s+='<path d="M'+(W-26)+' '+(top)+' l-4 8 l8 0 z" style="fill:var(--line-strong)"/>';
  s+=txt(W-10,(top+H)/2,"energie",{anchor:"middle",size:10.5,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:"+(W-10)+"px "+((top+H)/2)+"px;letter-spacing:.09em;text-transform:uppercase"});
  $("#heroSvgWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Rámečkový diagram elektronové konfigurace"');

  $("#heroZV").textContent=Z+" · "+(e?e.s+" · "+e.n:"?");
  $("#heroFull").innerHTML='<span style="color:var(--ink-3);font-family:var(--f-ui);font-size:.8rem;letter-spacing:.06em">PLNÁ</span><br>'+cfgFull(Z)+
    '<br><span style="color:var(--ink-3);font-size:.85em">podle obsazování: '+cfgFill(Z)+'</span>';
  $("#heroShort").innerHTML='<span style="color:var(--ink-3);font-family:var(--f-ui);font-size:.8rem;letter-spacing:.06em">ZKRÁCENÁ</span><br><b>'+cfgShort(Z)+'</b>';
  var p=period(Z), g=group(Z), b=block(Z), v=valenceCount(Z), u=unpaired(Z);
  function ro(id,k,val,h){ $(id).innerHTML='<span class="k">'+k+'</span><span class="v">'+val+'</span><span class="h">'+h+'</span>'; }
  ro("#heroRoP","Perioda",p,"= nejvyšší n ("+SHELLS[p-1]+")");
  ro("#heroRoG","Skupina",g===null?"—":g,b==="d"?"ns + (n−1)d elektrony":(b==="p"?"10 + valenční e⁻":"= valenční e⁻"));
  ro("#heroRoB","Blok",b,b==="s"?"plní se ns":(b==="p"?"plní se np":(b==="d"?"plní se (n−1)d":"plní se (n−2)f")));
  ro("#heroRoV","Valenční elektrony",v,subsStr(shellOrder(cfgValence(Z))));
  ro("#heroRoU","Nepárové elektrony",u,u?"paramagnetický":"diamagnetický (vše spárované)");
  var note;
  if(EXC_NOTE[Z]) note='<b>Výjimka z výstavbového principu.</b> '+EXC_NOTE[Z];
  else if(NOBLE.indexOf(Z)>=0) note='<b>'+e.n.charAt(0).toUpperCase()+e.n.slice(1)+'</b> má uzavřenou valenční slupku — všechny orbitaly zaplněné, žádný nepárový elektron. Proto je vzácný plyn a proto se jeho značka používá v hranaté závorce zkráceného zápisu.';
  else if(b==="s") note='<b>s-prvek:</b> plní se orbital '+p+'s. '+(v===1?'Jediný valenční elektron se snadno odtrhne → kation '+e.s+'⁺ a nízká ionizační energie ('+fmt(e.i1,0)+' kJ·mol⁻¹).':'Dva valenční elektrony → kation '+e.s+'²⁺.');
  else if(b==="p") note='<b>p-prvek:</b> plní se '+p+'p, valenčních elektronů je '+v+' (skupina '+g+'). '+(u?'Nepárových elektronů '+u+' → vaznost '+u+' v základním stavu'+(e.val&&e.val!==String(u)?' (všechny vaznosti: '+e.val+')':'')+'.':'')+' Zkuste přejet na sousední prvek a sledujte, jak se mění počet nepárových elektronů.';
  else note='<b>d-prvek (přechodný kov):</b> plní se '+(p-1)+'d, ale '+p+'s bylo obsazeno dřív. Při ionizaci se ale elektrony '+p+'s odtrhávají <b>první</b>. Nepárových elektronů '+u+' → '+(u?'paramagnetický':'diamagnetický')+'.';
  $("#heroNote").innerHTML=note;
}
function initHero(){
  var sel=$("#heroSel");
  var opts='<option value="">— použít posuvník (Z 1–36) —</option>';
  ELEMENTS.forEach(function(e){ if(e.Z>36) opts+='<option value="'+e.Z+'">'+e.Z+' · '+e.s+' · '+e.n+'</option>'; });
  sel.innerHTML=opts;
  sel.addEventListener("change",function(){
    if(sel.value){ heroState.Z=+sel.value; }
    else { heroState.Z=+$("#heroZ").value; }
    drawHero();
  });
  $("#heroZ").addEventListener("input",function(){ heroState.Z=+this.value; sel.value=""; drawHero(); });
  drawHero();
}

/* ============================================================
   9 · WIDGET — časová osa modelů atomu
   ============================================================ */
var tlState={k:"rutherford"};
function tlModel(k){ for(var i=0;i<MODELS.length;i++){ if(MODELS[i].k===k) return MODELS[i]; } return MODELS[0]; }
function drawTL(){
  var m=tlModel(tlState.k), W=420, H=280, cx=210, cy=150, s='';
  var seed=7; function rnd(){ seed=(seed*9301+49297)%233280; return seed/233280; }
  s+=txt(cx,24,m.t.toUpperCase(),{anchor:"middle",size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  if(m.k==="dalton"){
    s+='<circle cx="'+cx+'" cy="'+cy+'" r="86" style="fill:var(--surface-3);stroke:var(--line-strong);stroke-width:2"/>';
    s+='<circle cx="'+(cx-30)+'" cy="'+(cy-30)+'" r="26" style="fill:var(--surface);fill-opacity:.55"/>';
    s+=txt(cx,cy+6,"plná, nedělitelná",{anchor:"middle",size:12,w:600,fill:"var(--ink-2)"});
    s+=txt(cx,cy+112,"každý prvek má svůj druh atomů",{anchor:"middle",size:11,fill:"var(--ink-3)"});
  } else if(m.k==="thomson"){
    s+='<circle cx="'+cx+'" cy="'+cy+'" r="90" style="fill:var(--exo);fill-opacity:.16;stroke:var(--exo);stroke-width:1.5"/>';
    s+=txt(cx,cy-104,"kladně nabitá „hmota“ atomu",{anchor:"middle",size:11,fill:"var(--exo)",w:600});
    for(var i=0;i<14;i++){
      var a=rnd()*6.283, r=rnd()*72+8;
      var ex=cx+Math.cos(a)*r, ey=cy+Math.sin(a)*r;
      s+='<circle cx="'+ex.toFixed(1)+'" cy="'+ey.toFixed(1)+'" r="6" style="fill:var(--endo)"/>';
      s+=txt(ex,ey+3.5,"−",{anchor:"middle",size:10,w:700,fill:"var(--paper)"});
    }
    s+=txt(cx,cy+118,"záporné elektrony jako rozinky v pudinku · bez jádra",{anchor:"middle",size:11,fill:"var(--ink-3)"});
  } else if(m.k==="rutherford"){
    [[92,40,0],[92,40,60],[92,40,120]].forEach(function(o){
      s+='<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+o[0]+'" ry="'+o[1]+'" style="fill:none;stroke:var(--line-strong);stroke-width:1.2;stroke-dasharray:4 3;transform:rotate('+o[2]+'deg);transform-origin:'+cx+'px '+cy+'px"/>';
    });
    [[0,0],[60,150],[120,300]].forEach(function(o){
      var t=o[1]*Math.PI/180, rot=o[0]*Math.PI/180;
      var px=92*Math.cos(t), py=40*Math.sin(t);
      var ex=cx+px*Math.cos(rot)-py*Math.sin(rot), ey=cy+px*Math.sin(rot)+py*Math.cos(rot);
      s+='<circle cx="'+ex.toFixed(1)+'" cy="'+ey.toFixed(1)+'" r="6" style="fill:var(--endo)"/>';
    });
    s+='<circle cx="'+cx+'" cy="'+cy+'" r="9" style="fill:var(--exo)"/>';
    s+=txt(cx,cy+4,"+",{anchor:"middle",size:13,w:700,fill:"var(--paper)"});
    s+=txt(cx+16,cy-10,"jádro ≈ 10⁻¹⁵ m",{size:11,w:600,fill:"var(--exo)"});
    s+=txt(cx,cy+118,"elektrony obíhají po libovolných drahách · atom ≈ 10⁻¹⁰ m",{anchor:"middle",size:11,fill:"var(--ink-3)"});
    /* α-částice */
    s+=line(20,cy+70,cx-14,cy+2,{c:"var(--accent)",w:1.6,dash:"5 3"});
    s+=line(cx-14,cy+2,60,cy-95,{c:"var(--accent)",w:1.6,dash:"5 3"});
    s+=txt(28,cy+86,"α odražená",{size:10.5,fill:"var(--accent)",w:600});
    s+=line(20,cy+100,400,cy+100,{c:"var(--accent)",w:1.2,dash:"5 3"});
    s+=txt(330,cy+96,"α prošla (99,99 %)",{size:10.5,fill:"var(--accent)"});
  } else if(m.k==="bohr"){
    var radii=[26,52,78,104];
    radii.forEach(function(r,i){
      s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" style="fill:none;stroke:var(--line-strong);stroke-width:1.3"/>';
      s+=txt(cx+r+4,cy-4,"n = "+(i+1),{size:10.5,fill:"var(--ink-3)",mono:true});
    });
    s+='<circle cx="'+cx+'" cy="'+cy+'" r="8" style="fill:var(--exo)"/>';
    s+=txt(cx,cy+4,"+",{anchor:"middle",size:12,w:700,fill:"var(--paper)"});
    /* elektron na n=3 skáče na n=2 */
    var a=-2.2;
    var e3x=cx+78*Math.cos(a), e3y=cy+78*Math.sin(a), e2x=cx+52*Math.cos(a), e2y=cy+52*Math.sin(a);
    s+='<circle cx="'+e3x.toFixed(1)+'" cy="'+e3y.toFixed(1)+'" r="5" style="fill:var(--endo);fill-opacity:.4;stroke:var(--endo);stroke-width:1.2;stroke-dasharray:2 2"/>';
    s+='<circle cx="'+e2x.toFixed(1)+'" cy="'+e2y.toFixed(1)+'" r="6" style="fill:var(--endo)"/>';
    s+=line(e3x,e3y,e2x+3,e2y+3,{c:"var(--accent)",w:2,cap:"round"});
    /* foton — vlnovka */
    var wx=e2x+8, wy=e2y-8, d="M"+wx+" "+wy;
    for(var q=0;q<7;q++){ d+=" q6 -8 12 0"; }
    s+='<path d="'+d+'" style="fill:none;stroke:var(--accent);stroke-width:2;transform:rotate(-28deg);transform-origin:'+wx+'px '+wy+'px"/>';
    s+=txt(wx+50,wy-48,"foton hf = E₃ − E₂",{size:11,w:600,fill:"var(--accent)"});
    s+=txt(cx,cy+130,"dovolené dráhy: E_n = −13,6 eV / n² · elektron na nich nezáří",{anchor:"middle",size:11,fill:"var(--ink-3)"});
  } else {
    /* QM: oblak hustoty 1s */
    for(var j=0;j<420;j++){
      var u=rnd(), rr=-Math.log(1-u)*34*0.9, an=rnd()*6.283;
      if(rr>140) continue;
      var qx=cx+Math.cos(an)*rr, qy=cy+Math.sin(an)*rr;
      s+='<circle cx="'+qx.toFixed(1)+'" cy="'+qy.toFixed(1)+'" r="1.7" style="fill:var(--endo);fill-opacity:.55"/>';
    }
    s+='<circle cx="'+cx+'" cy="'+cy+'" r="88" style="fill:none;stroke:var(--accent);stroke-width:1.6;stroke-dasharray:6 4"/>';
    s+='<circle cx="'+cx+'" cy="'+cy+'" r="6" style="fill:var(--exo)"/>';
    s+=txt(cx+70,cy-78,"hranice 90 % = orbital",{size:11,w:600,fill:"var(--accent)"});
    s+=txt(cx,cy+130,"|ψ|² · hustota pravděpodobnosti · žádná dráha",{anchor:"middle",size:11,fill:"var(--ink-3)"});
  }
  $("#tlWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Schéma modelu atomu: '+m.t+'"');
  $$("#tlMode button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===tlState.k); });
  var h='<div class="readout"><span class="k">'+m.who+'</span><span class="v" style="font-size:1.05rem">'+m.t+'</span><span class="h">'+m.year+'</span></div>';
  h+='<p style="margin:0;color:var(--ink-2);font-size:.95rem;line-height:1.6">'+m.exp+'</p>';
  h+='<div class="callout" style="margin:0;border-left:3px solid var(--ok);background:var(--ok-soft)"><span class="eyebrow" style="color:var(--ok)">Co vysvětlil</span><p style="margin:.3rem 0 0;font-size:.92rem">'+m.ok.map(function(x){return "• "+x;}).join("<br>")+'</p></div>';
  h+='<div class="callout" style="margin:0;border-left:3px solid var(--bad);background:var(--bad-soft)"><span class="eyebrow" style="color:var(--bad)">Kde selhal</span><p style="margin:.3rem 0 0;font-size:.92rem">'+m.bad.map(function(x){return "• "+x;}).join("<br>")+'</p></div>';
  $("#tlInfo").innerHTML=h;
}

/* ============================================================
   10 · WIDGET — Bohrův atom vodíku
   ============================================================ */
var bohrState={n1:2,n2:3};
function drawBohr(){
  var n1=bohrState.n1, n2=bohrState.n2;
  if(n2<=n1){ n2=n1+1; bohrState.n2=n2; $("#bohrN2").value=n2; }
  var W=420,H=330,L=120,R=380,yTop=36,yBot=300;
  var y=function(E){ return yBot-(E+13.6)/13.6*(yBot-yTop); };
  var s='';
  s+=line(L-30,yTop-6,L-30,yBot+4,{c:"var(--line-strong)",w:1.4});
  s+=txt(L-46,(yTop+yBot)/2,"E [eV]",{anchor:"middle",size:11,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:"+(L-46)+"px "+((yTop+yBot)/2)+"px;letter-spacing:.08em"});
  /* hladiny */
  for(var n=1;n<=7;n++){
    var yn=y(bohrE(n)), hi=(n===n1||n===n2);
    s+=line(L,yn,R,yn,{c:hi?"var(--ink)":"var(--line-strong)",w:hi?2.2:1.2});
    if(n<=4||n===7){ s+=txt(L-6,yn+4,"n = "+n,{anchor:"end",size:11,w:hi?700:500,fill:hi?"var(--ink)":"var(--ink-3)",mono:true}); }
    if(n<=3) s+=txt(R+6,yn+4,fmt(bohrE(n),2)+" eV",{size:10.5,fill:"var(--ink-3)",mono:true});
  }
  s+=line(L,y(0),R,y(0),{c:"var(--line)",w:1,dash:"3 3"});
  s+=txt(L-6,y(0)+4,"n = ∞",{anchor:"end",size:11,fill:"var(--ink-3)",mono:true});
  s+=txt(R+6,y(0)+4,"0 eV",{size:10.5,fill:"var(--ink-3)",mono:true});
  /* série */
  var serCol={1:"var(--cat2)",2:"var(--accent)",3:"var(--cat3)",4:"var(--ink-3)"};
  /* přeskok */
  var x=L+90+(n1-1)*40, y1=y(bohrE(n1)), y2=y(bohrE(n2));
  var lam=bohrLambda(n1,n2), dE=bohrE(n2)-bohrE(n1), col=lambdaColor(lam).css;
  s+=line(x,y2,x,y1+7,{c:col,w:2.6,cap:"round"});
  s+='<path d="M'+x+' '+y1+' l-5 -9 l10 0 z" style="fill:'+col+'"/>';
  s+='<circle cx="'+x+'" cy="'+y2+'" r="5.5" style="fill:'+col+'"/>';
  var wx=x+14, wy=(y1+y2)/2, d="M"+wx+" "+wy;
  for(var q=0;q<6;q++){ d+=" q5 -7 10 0"; }
  s+='<path d="'+d+'" style="fill:none;stroke:'+col+';stroke-width:2"/>';
  s+=txt(wx+66,wy+4,"λ = "+fmt(lam,lam<1000?1:0)+" nm",{size:12,w:700,fill:col,mono:true});
  s+=txt(wx+66,wy+18,"ΔE = "+fmt(dE,2)+" eV",{size:11,fill:col,mono:true});
  s+=txt(L,yBot+22,"série: "+(SERIES[n1]||"vyšší")+" (přeskoky na n = "+n1+")",{size:11,w:600,fill:serCol[n1]||"var(--ink-3)"});
  $("#bohrWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Energetické hladiny atomu vodíku a přeskok elektronu"');

  var c=lambdaColor(lam);
  var region = lam<380?"ultrafialové záření":(lam<=750?"viditelné světlo":"infračervené záření");
  $("#bohrN1V").textContent=n1+" ("+(SERIES[n1]||"vyšší série")+")";
  $("#bohrN2V").textContent=n2;
  function ro(id,k,v,h){ $(id).innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#bohrRoE","Energie fotonu",fmt(dE,2)+" eV","ΔE = E"+subn(n2)+" − E"+subn(n1)+" = "+fmt(dE*96.47,0)+" kJ·mol⁻¹");
  ro("#bohrRoL","Vlnová délka",fmt(lam,lam<1000?1:0)+" nm","1/λ = R·(1/"+n1+"² − 1/"+n2+"²)");
  ro("#bohrRoC","Oblast / barva",c.name,region);
  $("#bohrEq").innerHTML='1/λ = 1,097·10⁷ · (1/'+n1+'² − 1/'+n2+'²) = 1,097·10⁷ · '+fmt(1/(n1*n1)-1/(n2*n2),4)+' = <b>'+fmt(RYD*(1/(n1*n1)-1/(n2*n2))/1e6,3)+'·10⁶ m⁻¹</b> → λ = <b>'+fmt(lam,lam<1000?1:0)+' nm</b>';
  var story;
  if(n1===2 && n2===3) story="Hα — nejjasnější čára vodíkového spektra, červená. Vidíte ji ve spektru každé mlhoviny a v koróně Slunce.";
  else if(n1===2) story="Balmerova série je jediná, jejíž čáry vidíme pouhým okem: Hα 656 nm, Hβ 486 nm, Hγ 434 nm, Hδ 410 nm. S rostoucím n₂ se čáry zahušťují k hranici série 365 nm (přeskok z n = ∞).";
  else if(n1===1) story="Lymanova série leží celá v ultrafialové oblasti — už první čára (121,6 nm) má energii 10,2 eV. Hranice série je 91,2 nm, což odpovídá ionizační energii 13,6 eV.";
  else if(n1===3) story="Paschenova série leží v infračervené oblasti. Přeskoky mezi vysokými hladinami mají malý rozdíl energií, protože hladiny se k nule zahušťují jako 1/n².";
  else story="Brackettova série (přeskoky na n = 4) leží hluboko v infračervené oblasti — rozdíly energií mezi vysokými hladinami jsou už jen desetiny elektronvoltu.";
  $("#bohrStory").innerHTML=story;
}

/* ============================================================
   11 · WIDGET — tvary orbitalů + radiální rozdělení
   ============================================================ */
var orbState={type:"s",rad:"1s"};
function drawOrb(){
  var W=360,H=280,s='',t=orbState.type;
  if(t==="s"){
    var cx=180,cy=140;
    [110,88,66,44,22].forEach(function(r){ s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" style="fill:var(--cat1);fill-opacity:.13"/>'; });
    s+='<circle cx="'+cx+'" cy="'+cy+'" r="100" style="fill:none;stroke:var(--accent);stroke-width:1.5;stroke-dasharray:6 4"/>';
    s+='<circle cx="'+cx+'" cy="'+cy+'" r="3.5" style="fill:var(--exo)"/>';
    s+=txt(cx,cy+126,"orbital s — koule, hranice 90 %",{anchor:"middle",size:12,w:600,fill:"var(--ink)"});
    s+=txt(cx,cy+142,"hustota klesá od jádra ven · žádná uzlová rovina",{anchor:"middle",size:11,fill:"var(--ink-3)"});
    s+=txt(cx+104,cy-96,"90 %",{size:11,w:600,fill:"var(--accent)"});
  } else if(t==="p"){
    var panels=[{lab:"pₓ",ax:"x",rot:90},{lab:"p_y",ax:"y",rot:0},{lab:"p_z",ax:"z",rot:0}];
    [0,1,2].forEach(function(i){
      var cx=60+i*120, cy=125, rot=(i===0?90:(i===1?35:0));
      s+=line(cx-52,cy,cx+52,cy,{c:"var(--line)",w:1});
      s+=line(cx,cy-60,cx,cy+60,{c:"var(--line)",w:1});
      var g='<g style="transform:rotate('+rot+'deg);transform-origin:'+cx+'px '+cy+'px">';
      g+='<ellipse cx="'+cx+'" cy="'+(cy-30)+'" rx="22" ry="30" style="fill:var(--cat3);fill-opacity:.35;stroke:var(--cat3);stroke-width:1.4"/>';
      g+='<ellipse cx="'+cx+'" cy="'+(cy+30)+'" rx="22" ry="30" style="fill:var(--cat3);fill-opacity:.12;stroke:var(--cat3);stroke-width:1.4;stroke-dasharray:4 3"/>';
      g+=txt(cx,cy-26,"+",{anchor:"middle",size:14,w:700,fill:"var(--ink)"});
      g+=txt(cx,cy+38,"−",{anchor:"middle",size:14,w:700,fill:"var(--ink)"});
      g+='</g>';
      s+=g;
      s+='<circle cx="'+cx+'" cy="'+cy+'" r="3" style="fill:var(--exo)"/>';
      s+=txt(cx,cy+84,"p"+tsub(["x","y","z"][i]),{anchor:"middle",size:13,w:700,fill:"var(--ink)"});
    });
    s+=txt(180,232,"tři činky podél os x, y, z · uprostřed uzlová rovina (ψ = 0)",{anchor:"middle",size:11.5,w:600,fill:"var(--ink)"});
    s+=txt(180,250,"znaménka + / − jsou fáze vlnové funkce, ne náboj",{anchor:"middle",size:11,fill:"var(--ink-3)"});
  } else {
    /* d_xy čtyřlístek */
    var cx1=110, cy1=125;
    s+=line(cx1-60,cy1,cx1+60,cy1,{c:"var(--line)",w:1}); s+=line(cx1,cy1-60,cx1,cy1+60,{c:"var(--line)",w:1});
    [45,135,225,315].forEach(function(a,i){
      s+='<ellipse cx="'+cx1+'" cy="'+(cy1-34)+'" rx="15" ry="34" style="fill:var(--cat2);fill-opacity:'+(i%2?.14:.35)+';stroke:var(--cat2);stroke-width:1.3;transform:rotate('+a+'deg);transform-origin:'+cx1+'px '+cy1+'px"/>';
    });
    s+='<circle cx="'+cx1+'" cy="'+cy1+'" r="3" style="fill:var(--exo)"/>';
    s+=txt(cx1,cy1+84,"d"+tsub("xy")+" (a podobně d"+tsub("xz")+", d"+tsub("yz")+", d"+tsub("x²−y²")+")",{anchor:"middle",size:12,w:700,fill:"var(--ink)"});
    /* d_z2 */
    var cx2=265, cy2=125;
    s+=line(cx2-60,cy2,cx2+60,cy2,{c:"var(--line)",w:1}); s+=line(cx2,cy2-60,cx2,cy2+60,{c:"var(--line)",w:1});
    s+='<ellipse cx="'+cx2+'" cy="'+(cy2-32)+'" rx="15" ry="32" style="fill:var(--cat2);fill-opacity:.35;stroke:var(--cat2);stroke-width:1.3"/>';
    s+='<ellipse cx="'+cx2+'" cy="'+(cy2+32)+'" rx="15" ry="32" style="fill:var(--cat2);fill-opacity:.35;stroke:var(--cat2);stroke-width:1.3"/>';
    s+='<ellipse cx="'+cx2+'" cy="'+cy2+'" rx="42" ry="11" style="fill:var(--cat2);fill-opacity:.14;stroke:var(--cat2);stroke-width:1.3;stroke-dasharray:4 3"/>';
    s+='<circle cx="'+cx2+'" cy="'+cy2+'" r="3" style="fill:var(--exo)"/>';
    s+=txt(cx2,cy2+84,"d"+tsub("z²")+" — činka s prstencem",{anchor:"middle",size:12,w:700,fill:"var(--ink)"});
    s+=txt(180,240,"pět orbitalů d · dvě uzlové plochy · od n = 3",{anchor:"middle",size:11.5,w:600,fill:"var(--ink)"});
    s+=txt(180,258,"čtyři mají tvar čtyřlístku, pátý činku s prstencem",{anchor:"middle",size:11,fill:"var(--ink-3)"});
  }
  $("#orbWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Tvar orbitalu '+t+'"');
  $$("#orbType button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===t); });
  var l={s:0,p:1,d:2}[t], shape={s:"koule",p:"činka (dva laloky)",d:"čtyřlístek / činka s prstencem"}[t];
  $("#orbRo1").innerHTML='<span class="k">Vedlejší kvantové číslo</span><span class="v">l = '+l+'</span><span class="h">'+shape+'</span>';
  $("#orbRo2").innerHTML='<span class="k">Počet orbitalů v podslupce</span><span class="v">'+(2*l+1)+'</span><span class="h">2l + 1 · max. '+(2*(2*l+1))+' elektronů</span>';
}
function radialP(orb,r){ /* r v jednotkách a0; vrací nenormalizované P(r)=r²R² */
  var x=r;
  if(orb==="1s") return x*x*Math.exp(-2*x);
  if(orb==="2s") return x*x*Math.pow(2-x,2)*Math.exp(-x);
  if(orb==="2p") return Math.pow(x,4)*Math.exp(-x);
  if(orb==="3s") return x*x*Math.pow(27-18*x+2*x*x,2)*Math.exp(-2*x/3);
  return 0;
}
function drawOrbRad(){
  var orb=orbState.rad, W=360,H=280,L=44,R=340,T=30,B=232, rmax=(orb==="3s"?26:(orb==="1s"?8:14));
  var pts=[], max=0, rBest=0;
  for(var i=0;i<=300;i++){ var r=rmax*i/300, p=radialP(orb,r); pts.push([r,p]); if(p>max){max=p;rBest=r;} }
  var x=function(r){ return L+(r/rmax)*(R-L); }, y=function(p){ return B-(p/max)*(B-T); };
  var s='';
  s+=line(L,B,R,B,{c:"var(--line-strong)",w:1.4}); s+=line(L,T-6,L,B,{c:"var(--line-strong)",w:1.4});
  var step=(rmax>=20?5:(rmax>=12?2:1));
  for(var t=0;t<=rmax;t+=step){ s+=line(x(t),B,x(t),B+4,{c:"var(--line-strong)",w:1}); s+=txt(x(t),B+16,t,{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true}); }
  s+=txt((L+R)/2,B+34,"vzdálenost od jádra r [a₀ = 52,9 pm]",{anchor:"middle",size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
  s+=txt(14,(T+B)/2,"P(r)",{anchor:"middle",size:11,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:14px "+((T+B)/2)+"px"});
  var col={"1s":"var(--cat1)","2s":"var(--cat1)","2p":"var(--cat3)","3s":"var(--cat1)"}[orb];
  var d="M"+x(0)+" "+y(0); pts.forEach(function(q){ d+=" L"+x(q[0]).toFixed(1)+" "+y(q[1]).toFixed(1); });
  s+='<path d="'+d+' L'+x(rmax)+' '+B+' Z" style="fill:'+col+';fill-opacity:.15"/>';
  s+='<path d="'+d+'" style="fill:none;stroke:'+col+';stroke-width:2.4;stroke-linejoin:round"/>';
  /* uzly */
  var nodes={"1s":[],"2s":[2],"2p":[],"3s":[(9-3*Math.sqrt(3))/2,(9+3*Math.sqrt(3))/2]}[orb];
  nodes.forEach(function(nr){ s+=line(x(nr),T,x(nr),B,{c:"var(--bad)",w:1.2,dash:"4 3"}); s+=txt(x(nr),T-8,"uzel "+fmt(nr,1)+" a₀",{anchor:"middle",size:10.5,w:600,fill:"var(--bad)"}); });
  s+=line(x(rBest),y(max),x(rBest),B,{c:"var(--accent)",w:1.2,dash:"3 3"});
  s+=txt(x(rBest)+5,y(max)+14,"max. "+fmt(rBest,2)+" a₀ = "+fmt(rBest*52.9,0)+" pm",{size:11,w:600,fill:"var(--accent)"});
  s+=txt(R,T+2,orb,{anchor:"end",size:14,w:700,fill:col,mono:true});
  $("#orbRadWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Radiální rozdělení pravděpodobnosti pro orbital '+orb+'"');
  $$("#orbRad button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===orb); });
  $("#orbRo3").innerHTML='<span class="k">Nejpravděpodobnější vzdálenost</span><span class="v">'+fmt(rBest*52.9,0)+' pm</span><span class="h">'+orb+' vodíku · '+fmt(rBest,2)+' a₀'+(nodes.length?' · uzlových ploch: '+nodes.length:' · bez uzlu')+'</span>';
  var notes={
    "1s":"Orbital 1s: maximum hustoty leží přesně na Bohrově poloměru 52,9 pm — Bohr měl tedy „správné číslo se špatným obrázkem“. Přepněte na 2s a sledujte, co přibude.",
    "2s":"Orbital 2s má <b>kulovou uzlovou plochu</b> ve 2 a₀ (106 pm), kde je hustota nulová, a hlavní maximum až v 5,2 a₀ — je zhruba pětkrát větší než 1s. Vnitřní malé maximum je důvod, proč orbitaly s „pronikají“ k jádru a mají nižší energii než p téže slupky.",
    "2p":"Orbital 2p má stejné n jako 2s, ale žádnou radiální uzlovou plochu (jeho uzel je rovina procházející jádrem). Maximum leží ve 4 a₀ = 212 pm. U vodíku mají 2s a 2p stejnou energii; u ostatních atomů leží 2p výš.",
    "3s":"Orbital 3s má dvě kulové uzlové plochy (1,9 a 7,1 a₀) a maximum až ve 13 a₀ ≈ 690 pm. Počet uzlových ploch je vždy n − 1 — jako u struny, kde vyšší harmonické mají víc uzlů."
  };
  $("#orbNote").innerHTML=notes[orb];
}

/* ============================================================
   12 · WIDGET — průzkumník kvantových čísel
   ============================================================ */
var qnState={n:3,l:1};
function drawQN(){
  var n=qnState.n; if(qnState.l>n-1) qnState.l=n-1; var lsel=qnState.l;
  var segs=$("#qnL"); segs.innerHTML="";
  for(var l=0;l<n;l++){
    var b=document.createElement("button"); b.type="button"; b.dataset.v=l; b.setAttribute("aria-pressed",l===lsel);
    b.textContent="l = "+l+" ("+n+LSYM[l]+")";
    b.addEventListener("click",function(){ qnState.l=+this.dataset.v; drawQN(); });
    segs.appendChild(b);
  }
  var W=700, rowH=52, top=40, H=top+n*rowH+16, s='';
  s+=txt(14,20,"n = "+n+" (slupka "+SHELLS[n-1]+")",{size:13,w:700,fill:"var(--ink)",mono:true});
  s+=txt(150,20,"→ l = 0 … "+(n-1)+" → m_l = −l … +l → jeden rámeček = jeden orbital",{size:11,fill:"var(--ink-3)"});
  var total=0;
  for(var l2=0;l2<n;l2++){
    var yy=top+l2*rowH, m=2*l2+1, col=LCOL[l2], hi=(l2===lsel);
    total+=m;
    if(hi) s+=rect(6,yy-6,W-12,rowH-6,{fill:col,r:8,style:"fill-opacity:.09"});
    s+=txt(16,yy+22,"l = "+l2,{size:12.5,w:hi?700:500,fill:hi?"var(--ink)":"var(--ink-2)",mono:true});
    s+=txt(70,yy+22,n+LSYM[l2],{size:14,w:700,fill:col,mono:true});
    s+=txt(110,yy+22,"→",{size:12,fill:"var(--ink-3)"});
    var bx=134, bw=28;
    for(var k=0;k<m;k++){
      var ml=k-l2, x=bx+k*(bw+6);
      s+=rect(x,yy+4,bw,26,{fill:"var(--surface)",stroke:col,sw:hi?1.8:1.1,r:4});
      s+=txt(x+bw/2,yy+22,(ml>0?"+":"")+ml,{anchor:"middle",size:11,w:600,fill:hi?"var(--ink)":"var(--ink-2)",mono:true});
    }
    var xe=bx+m*(bw+6)+10;
    s+=txt(xe,yy+16,m+" orbital"+(m===1?"":(m<5?"y":"ů"))+" (2l+1)",{size:11.5,w:600,fill:col});
    s+=txt(xe,yy+30,"max. "+(2*m)+" e⁻ · tvar: "+["koule","činka","čtyřlístek","složitý"][l2],{size:10.5,fill:"var(--ink-3)"});
  }
  s+=line(14,H-8,W-14,H-8,{c:"var(--line-strong)",w:1.2});
  $("#qnWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Podslupky a orbitaly slupky n = '+n+'"');
  $("#qnNV").textContent=n+" (slupka "+SHELLS[n-1]+")";
  $("#qnRo1").innerHTML='<span class="k">Podslupky (hodnoty l)</span><span class="v">'+n+'</span><span class="h">'+Array.apply(null,{length:n}).map(function(_,i){return n+LSYM[i];}).join(", ")+'</span>';
  $("#qnRo2").innerHTML='<span class="k">Orbitalů ve slupce</span><span class="v">'+total+'</span><span class="h">n² = '+Array.apply(null,{length:n}).map(function(_,i){return 2*i+1;}).join(" + ")+'</span>';
  $("#qnRo3").innerHTML='<span class="k">Max. elektronů</span><span class="v">'+(2*total)+'</span><span class="h">2n² = 2 · '+n+'²</span>';
  var mls=[]; for(var ml2=-lsel;ml2<=lsel;ml2++) mls.push((ml2>0?"+":"")+ml2);
  $("#qnEq").innerHTML='Vybraná podslupka <b>'+n+LSYM[lsel]+'</b>: n = '+n+', l = '+lsel+', m<sub>l</sub> ∈ {'+mls.join(", ")+'} → <b>'+(2*lsel+1)+' degenerovan'+((2*lsel+1)===1?'ý orbital':'é orbitaly')+'</b>, pojme '+(2*(2*lsel+1))+' elektronů'+(lsel>=1?' (n − l − 1 = '+(n-lsel-1)+' radiálních uzlů, '+lsel+' uzlová '+(lsel===1?'rovina':'plochy')+')':' (n − 1 = '+(n-1)+' kulových uzlových ploch)');
  var notes={1:"Slupka K má jediný orbital 1s. Dva elektrony — a helium je hotové. Proto je 1. perioda tak krátká.",2:"Slupka L: 2s a tři 2p, celkem 4 orbitaly, 8 elektronů — délka 2. a 3. periody. Žádné d, proto uhlík nemůže mít víc než 4 vazby.",3:"Slupka M: 3s, 3p, 3d = 9 orbitalů, 18 elektronů. Pozor: 3d se plní až ve 4. periodě, po 4s. Kapacita ≠ pořadí plnění.",4:"Slupka N: 4s, 4p, 4d, 4f = 16 orbitalů, 32 elektronů — délka 6. periody. Sedm orbitalů 4f obsazují lanthanoidy.",5:"Slupka O: 25 orbitalů, 50 elektronů. Podslupka 5g (l = 4) by měla existovat, ale žádný známý prvek ji neobsazuje."};
  $("#qnNote").innerHTML=notes[n];
}
