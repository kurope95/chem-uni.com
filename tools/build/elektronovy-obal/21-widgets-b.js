/* ============================================================
   13 · WIDGET — spin: zaplňování podslupky (Pauli + Hund)
   ============================================================ */
var spinState={sub:"p",e:4};
var SPIN_EX={
  p:{1:"B, Al (np¹)",2:"C, Si (np²)",3:"N, P (np³) — zpola zaplněná, stabilní",4:"O, S (np⁴)",5:"F, Cl (np⁵)",6:"Ne, Ar (np⁶) — uzavřená slupka",0:"prázdná podslupka"},
  d:{1:"Sc, Ti³⁺ (d¹)",2:"Ti, V³⁺ (d²)",3:"V, Cr³⁺ (d³)",4:"Cr²⁺, Mn³⁺ (d⁴)",5:"Mn²⁺, Fe³⁺ (d⁵) — zpola zaplněná, stabilní",6:"Fe²⁺, Co³⁺ (d⁶)",7:"Co²⁺ (d⁷)",8:"Ni²⁺ (d⁸)",9:"Cu²⁺ (d⁹)",10:"Zn²⁺, Cu⁺ (d¹⁰) — zcela zaplněná, stabilní",0:"Sc³⁺, Ti⁴⁺ (d⁰)"}
};
function drawSpin(){
  var m=spinState.sub==="p"?3:5, e=Math.min(spinState.e,2*m), lab=spinState.sub==="p"?"2p":"3d", col=LCOL[spinState.sub==="p"?1:2];
  var W=700,H=250,box=30,gap=8,s='';
  var right=hundFill(e,m);
  /* chybná varianta: párování předčasně */
  var wrong=[]; for(var i=0;i<m;i++) wrong.push(0); var left=e; for(var j=0;j<m&&left>0;j++){ var t=Math.min(2,left); wrong[j]=t; left-=t; }
  var same=right.join()===wrong.join();
  function panel(x0,y0,title,fill,color,mark,note){
    var t='';
    t+=rect(x0,y0,320,110,{fill:"var(--surface-2)",r:10,stroke:"var(--line)",sw:1});
    t+=txt(x0+14,y0+22,title,{size:11,w:700,fill:color,style:"letter-spacing:.08em"});
    t+=txt(x0+14,y0+66,lab,{size:14,w:700,fill:col,mono:true});
    for(var k=0;k<m;k++){ t+=orbBox(x0+56+k*(box+gap),y0+42,box,fill[k],col); }
    t+=txt(x0+14,y0+96,note,{size:10.5,fill:"var(--ink-3)"});
    t+=txt(x0+306,y0+22,mark,{anchor:"end",size:16,w:700,fill:color});
    return t;
  }
  s+=panel(10,10,"SPRÁVNĚ · HUND + PAULI",right,"var(--ok)","✓","nejdřív po jednom se stejným spinem, pak párování");
  if(!same) s+=panel(370,10,"CHYBNĚ · PORUŠENÍ HUNDOVA PRAVIDLA",wrong,"var(--bad)","✕","párování dřív, než jsou obsazené všechny orbitaly");
  else s+=panel(370,10,"JINÁ MOŽNOST NENÍ",right,"var(--ink-3)","",e===0?"prázdná podslupka":(e<=1?"jeden elektron — Hund se neuplatní":"všechny orbitaly plné — jediné možné obsazení"));
  /* Pauli */
  var pauli=[]; for(var q=0;q<m;q++) pauli.push(q===0?-2:(q<Math.min(e,m)?1:0));
  if(e>=2) s+=panel(10,130,"CHYBNĚ · PORUŠENÍ PAULIHO PRINCIPU",pauli,"var(--bad)","✕","dvě šipky stejným směrem v jednom rámečku — zakázáno");
  var un=0,pr=0; right.forEach(function(v){ if(v===1) un++; if(v===2) pr++; });
  var t2=rect(370,130,320,110,{fill:"var(--surface-2)",r:10,stroke:"var(--line)",sw:1});
  t2+=txt(384,152,"BILANCE",{size:11,w:700,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  t2+=txt(384,180,lab+sup(e)+"  →  "+un+" nepárov"+(un===1?"ý":(un>=2&&un<=4?"é":"ých"))+", "+pr+" pár"+(pr===1?"":(pr>=2&&pr<=4?"y":"ů")),{size:13,w:600,fill:"var(--ink)"});
  t2+=txt(384,204,un?"paramagnetická částice (vtahována do pole)":"diamagnetická částice (vše spárované)",{size:11.5,w:600,fill:un?"var(--endo)":"var(--ink-3)"});
  t2+=txt(384,226,"multiplicita 2S+1 = "+(un+1),{size:10.5,fill:"var(--ink-3)",mono:true});
  s+=t2;
  $("#spinWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Zaplňování podslupky '+lab+' elektrony"');
  $("#spinEV").textContent=e;
  $$("#spinSub button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===spinState.sub); });
  $("#spinRo1").innerHTML='<span class="k">Nepárové elektrony</span><span class="v">'+un+'</span><span class="h">Hundovo pravidlo</span>';
  $("#spinRo2").innerHTML='<span class="k">Elektronové páry</span><span class="v">'+pr+'</span><span class="h">[↑↓] · Pauli: max. 2 na orbital</span>';
  $("#spinRo3").innerHTML='<span class="k">Magnetismus</span><span class="v" style="font-size:1rem">'+(un?"paramagnetický":"diamagnetický")+'</span><span class="h">'+(un?"vtahován do pole":"slabě vypuzován")+'</span>';
  $("#spinExample").innerHTML='<b>Kdo má '+lab+sup(e)+':</b> '+SPIN_EX[spinState.sub][e];
}
function initSpin(){
  $$("#spinSub button").forEach(function(b){
    b.addEventListener("click",function(){
      spinState.sub=b.dataset.v; var mx=spinState.sub==="p"?6:10;
      $("#spinE").max=mx; if(spinState.e>mx){ spinState.e=mx; $("#spinE").value=mx; }
      drawSpin();
    });
  });
  $("#spinE").addEventListener("input",function(){ spinState.e=+this.value; drawSpin(); });
  drawSpin();
}

/* ============================================================
   14 · WIDGET — excitace a vaznost
   ============================================================ */
var excState={el:"C",st:0};
function drawExc(){
  var d=EXCIT[excState.el]; if(excState.st>=d.states.length) excState.st=0;
  var st=d.states[excState.st];
  var seg=$("#excState"); seg.innerHTML="";
  d.states.forEach(function(x,i){
    var b=document.createElement("button"); b.type="button"; b.dataset.v=i; b.setAttribute("aria-pressed",i===excState.st); b.textContent=x.lab;
    b.addEventListener("click",function(){ excState.st=+this.dataset.v; drawExc(); }); seg.appendChild(b);
  });
  $$("#excEl button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===excState.el); });
  var W=700,H=200,box=30,gap=7,x=20,s='',un=0,cfgParts=[];
  s+=txt(20,24,(d.name.toUpperCase())+" · "+st.lab.toUpperCase()+" STAV",{size:11,w:700,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  s+=txt(20,52,d.core,{size:14,w:600,fill:"var(--ink-3)",mono:true});
  x=70;
  st.boxes.forEach(function(g){
    var key=g[0], fills=g.slice(1), l=LSYM.indexOf(key[1]), col=LCOL[l], tot=0;
    fills.forEach(function(v){ tot+=v; if(v===1) un++; });
    cfgParts.push(key+sup(tot));
    s+=txt(x,52,key,{size:14,w:700,fill:col,mono:true});
    fills.forEach(function(v,k){ s+=orbBox(x+k*(box+gap),66,box,v,col,{stroke:v?col:"var(--line)",sw:v?1.6:1}); });
    s+=txt(x+fills.length*(box+gap)/2-gap/2,116,tot+" e⁻",{anchor:"middle",size:11,fill:"var(--ink-3)",mono:true});
    x+=fills.length*(box+gap)+28;
  });
  if(excState.st>0){
    s+=txt(20,150,"↑ elektron přeskočil do vyššího prázdného orbitalu téže slupky (excitace stojí energii, vazby ji vrátí)",{size:11,fill:"var(--accent)",w:600});
  } else {
    s+=txt(20,150,"základní stav = konfigurace podle výstavbového principu",{size:11,fill:"var(--ink-3)"});
  }
  s+=txt(20,176,"nepárové elektrony: "+un+"  →  vaznost "+st.val,{size:13,w:700,fill:"var(--ink)"});
  $("#excWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Rámečkový diagram '+d.name+', '+st.lab+' stav"');
  $("#excRo1").innerHTML='<span class="k">Nepárové elektrony</span><span class="v">'+un+'</span><span class="h">= vaznost v tomto stavu</span>';
  $("#excRo2").innerHTML='<span class="k">Vaznost</span><span class="v">'+st.val+'</span><span class="h">'+st.lab+' stav</span>';
  $("#excRo3").innerHTML='<span class="k">Všechny vaznosti prvku</span><span class="v">'+d.states.map(function(x){return x.val;}).join(", ")+'</span><span class="h">'+(d.states.length>1?"základní + excitované":"jen základní stav — nemá kam excitovat")+'</span>';
  $("#excEq").innerHTML=excState.el+(excState.st?"*":"")+": "+d.core+" "+cfgParts.join(" ");
  $("#excNote").innerHTML=st.note+(excState.el==="F"||excState.el==="N"?"":" Zkuste přepnout mezi stavy a sledujte, že každá excitace přidá <b>dva</b> nepárové elektrony — proto rostou vaznosti po dvou.");
}

/* ============================================================
   15 · WIDGET — trenažér konfigurací iontů
   ============================================================ */
var ION_NOTE={
  "Na⁺":"Na je [Ne] 3s¹; odtrhneme jediný valenční elektron a zbude <b>[Ne]</b> — konfigurace vzácného plynu, proto je Na⁺ tak stabilní.",
  "Mg²⁺":"Mg [Ne] 3s² ztratí oba elektrony 3s → <b>[Ne]</b>. Mg²⁺ je izoelektronový s Na⁺, Ne, F⁻, O²⁻.",
  "Al³⁺":"Al [Ne] 3s² 3p¹ ztratí tři valenční elektrony → <b>[Ne]</b>. Čtvrtý by se trhal z uzavřené slupky (11 577 kJ·mol⁻¹), proto Al⁴⁺ neexistuje.",
  "Cl⁻":"Cl [Ne] 3s² 3p⁵ přijme elektron do 3p → 3s² 3p⁶ = <b>[Ar]</b>. Anionty halogenů mají vždy konfiguraci následujícího vzácného plynu.",
  "O²⁻":"O [He] 2s² 2p⁴ přijme dva elektrony do 2p → 2s² 2p⁶ = <b>[Ne]</b>.",
  "S²⁻":"S [Ne] 3s² 3p⁴ + 2 e⁻ → 3s² 3p⁶ = <b>[Ar]</b>. Sulfidový anion je izoelektronový s Cl⁻, Ar, K⁺, Ca²⁺.",
  "Fe²⁺":"Fe [Ar] 3d⁶ 4s². Odtrháváme z orbitalu s nejvyšším n, tedy ze <b>4s</b> (ne z 3d, i když se 3d plnilo později) → <b>[Ar] 3d⁶</b>, 4 nepárové elektrony.",
  "Fe³⁺":"Po dvou elektronech 4s jde třetí z 3d → <b>[Ar] 3d⁵</b>. Zpola zaplněná podslupka d je stabilní — proto se Fe²⁺ tak snadno oxiduje na Fe³⁺.",
  "Cu⁺":"Cu je výjimka: [Ar] 3d¹⁰ 4s¹. Odtržením jediného elektronu 4s vznikne <b>[Ar] 3d¹⁰</b> — zcela zaplněná d, diamagnetický, bezbarvý.",
  "Cu²⁺":"Cu [Ar] 3d¹⁰ 4s¹ → nejdřív 4s, potom jeden z 3d → <b>[Ar] 3d⁹</b>. Jeden nepárový elektron: paramagnetický, modré roztoky.",
  "Zn²⁺":"Zn [Ar] 3d¹⁰ 4s² ztratí oba elektrony 4s → <b>[Ar] 3d¹⁰</b>. Zinek proto má jediné oxidační číslo +II a bezbarvé ionty.",
  "Ti⁴⁺":"Ti [Ar] 3d² 4s² ztratí 4s² i 3d² → <b>[Ar]</b>. Konfigurace vzácného plynu; Ti⁴⁺ je izoelektronový s Ca²⁺ a Sc³⁺.",
  "Ag⁺":"Ag je výjimka jako Cu: [Kr] 4d¹⁰ 5s¹. Odtržení 5s¹ dá <b>[Kr] 4d¹⁰</b> — proto stříbro tvoří prakticky jen Ag⁺.",
  "Pb²⁺":"Pb [Xe] 4f¹⁴ 5d¹⁰ 6s² 6p². Odtrhávají se nejdřív elektrony 6p (nejvyšší n a nejvyšší l) → <b>[Xe] 4f¹⁴ 5d¹⁰ 6s²</b>. Pár 6s² zůstává („inertní pár“) — proto je u těžkých p-kovů stabilnější nižší oxidační číslo."
};
var ionI=0, ionScore=0, ionAnswered=false, ionOrder=[];
function wrongDFirst(Z,ch){
  var subs=shellOrder(cfg(Z)).map(function(s){ return {n:s.n,l:s.l,e:s.e,cap:s.cap,key:s.key}; });
  var rem=ch, order=subs.slice().sort(function(a,b){ return b.l-a.l || b.n-a.n; });
  order.forEach(function(s){ if(rem>0){ var t=Math.min(s.e,rem); s.e-=t; rem-=t; } });
  subs=subs.filter(function(s){return s.e>0;});
  var N=Z-ch, c=0; NOBLE.forEach(function(g){ if(g<=N) c=g; });
  if(!c) return subsStr(subs);
  var core=cfg(c), rest=subs.filter(function(s){ var same=false; core.forEach(function(k){ if(k.key===s.key&&k.e===s.e) same=true; }); return !same; });
  return rest.length ? "["+NOBLE_SYM[c]+"] "+subsStr(rest) : "["+NOBLE_SYM[c]+"]";
}
function ionOptions(it){
  var correct=cfgIonShort(it.Z,it.ch), cands=[];
  function add(x){ if(x && x!==correct && cands.indexOf(x)<0) cands.push(x); }
  if(it.ch>0) add(wrongDFirst(it.Z,it.ch));
  add(cfgShort(it.Z));
  add(cfgIonShort(it.Z, it.ch>0 ? it.ch-1 : it.ch+1));
  add(cfgIonShort(it.Z, it.ch>0 ? it.ch+1 : it.ch-1));
  add(cfgIonShort(it.Z, -it.ch));
  cands=cands.slice(0,3);
  var opts=cands.concat([correct]);
  /* deterministické zamíchání podle indexu */
  var k=(it.Z*7+it.ch*3)%4;
  opts=opts.slice(k).concat(opts.slice(0,k));
  return {opts:opts,correct:correct};
}
function drawIon(){
  var it=IONS[ionI], e=EL(it.Z), o=ionOptions(it);
  $("#ionQn").textContent=ionI+1; $("#ionQtot").textContent=IONS.length; $("#ionScore").textContent=ionScore;
  $("#ionTask").innerHTML='<span class="chem" style="font-size:1.2rem">'+it.lab+'</span> &nbsp;<span style="color:var(--ink-3);font-size:.9rem">('+e.n+', Z = '+it.Z+', atom: '+cfgShort(it.Z)+')</span><br><span style="font-family:var(--f-ui);font-size:.95rem;color:var(--ink-2)">Která konfigurace patří tomuto iontu?</span>';
  $("#ionOpts").innerHTML=o.opts.map(function(x,i){ return '<button class="btn mono" type="button" data-ion="'+i+'" style="justify-content:flex-start;text-align:left">'+x+'</button>'; }).join("");
  var ex=$("#ionExplain"); ex.style.display="none"; ex.className="explain";
  $("#ionNext").disabled=true; ionAnswered=false;
  $$("#ionOpts button").forEach(function(b){
    b.addEventListener("click",function(){
      if(ionAnswered) return; ionAnswered=true;
      var pick=o.opts[+b.dataset.ion], ok=pick===o.correct;
      if(ok) ionScore++;
      $("#ionScore").textContent=ionScore;
      ex.style.display="flex"; ex.style.background=ok?"var(--ok-soft)":"var(--bad-soft)"; ex.style.borderColor=ok?"var(--ok)":"var(--bad)";
      ex.innerHTML='<span class="verdict" style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+(ok?"✓ Správně":"✕ Špatně — správně je "+o.correct)+'</span><span class="eyebrow">Proč</span><div>'+ION_NOTE[it.lab]+'</div>';
      $$("#ionOpts button").forEach(function(x){ x.disabled=true; x.style.opacity=(o.opts[+x.dataset.ion]===o.correct)?"1":".5"; if(o.opts[+x.dataset.ion]===o.correct) x.style.borderColor="var(--ok)"; });
      $("#ionNext").disabled = ionI>=IONS.length-1;
      if(ionI>=IONS.length-1){ toast("Trenažér dokončen: "+ionScore+" z "+IONS.length+" správně."); if(ionScore>=10) markDone("k4"); }
    });
  });
}
function initIon(){
  $("#ionNext").addEventListener("click",function(){ if(ionI<IONS.length-1){ ionI++; drawIon(); } });
  $("#ionReset").addEventListener("click",function(){ ionI=0; ionScore=0; drawIon(); });
  drawIon();
}

/* ============================================================
   16 · WIDGET — čtečka periodické tabulky
   ============================================================ */
var PT_MISSING={72:"Hf",73:"Ta",75:"Re",76:"Os",77:"Ir",84:"Po",85:"At"};
var ptSel=17;
function ptCell(Z){
  var e=EL(Z), pos=e?ptPos(Z):null;
  return {e:e,pos:pos};
}
function drawPT(){
  var grid=$("#ptGrid"); grid.innerHTML="";
  var cells=[];
  for(var r=1;r<=6;r++){ for(var c=1;c<=18;c++){ cells.push({r:r,c:c}); } }
  var map={};
  for(var Z=1;Z<=86;Z++){
    var e=EL(Z);
    if(e){ var p=ptPos(Z); if(p && p.row<=6) map[p.row+"-"+p.col]={Z:Z,e:e}; }
    else if(PT_MISSING[Z]){ var row=6, col=(Z>=72&&Z<=80)?(Z-72+4):(Z-84+16); map[row+"-"+col]={Z:Z,sym:PT_MISSING[Z]}; }
  }
  cells.forEach(function(cell){
    var it=map[cell.r+"-"+cell.c], el;
    if(!it){ el=document.createElement("div"); el.style.cssText="aspect-ratio:1/1"; grid.appendChild(el); return; }
    if(!it.e){
      el=document.createElement("div");
      el.style.cssText="aspect-ratio:1/1;border-radius:5px;background:var(--surface-3);display:flex;align-items:center;justify-content:center;font-family:var(--f-mono);font-size:.62rem;color:var(--ink-3)";
      el.textContent=it.sym; grid.appendChild(el); return;
    }
    var b=block(it.Z), col=b==="s"?"var(--cat1)":(b==="p"?"var(--cat3)":"var(--cat2)");
    el=document.createElement("button"); el.type="button"; el.dataset.z=it.Z;
    el.setAttribute("aria-label",it.e.n); el.setAttribute("aria-pressed",it.Z===ptSel);
    el.style.cssText="aspect-ratio:1/1;border-radius:5px;border:2px solid "+(it.Z===ptSel?"var(--accent)":"transparent")+";background:color-mix(in srgb,"+col+" "+(it.Z===ptSel?"45%":"22%")+",var(--surface));cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0;font-family:var(--f-mono);line-height:1.05;color:var(--ink)";
    el.innerHTML='<span style="font-size:.78rem;font-weight:700">'+it.e.s+'</span><span style="font-size:.55rem;color:var(--ink-3)">'+it.Z+'</span>';
    el.addEventListener("click",function(){ ptSel=+this.dataset.z; drawPT(); });
    grid.appendChild(el);
  });
  /* info */
  var e=EL(ptSel), Z=ptSel, b=block(Z), p=period(Z), g=group(Z);
  var catCol={"kov":"var(--cat2)","polokov":"var(--cat3)","nekov":"var(--endo)","vzácný plyn":"var(--ink-3)"}[e.cat];
  var h='<div class="grid3">';
  h+='<div class="readout"><span class="k">Prvek</span><span class="v">'+e.s+' · '+e.n+'</span><span class="h">Z = '+Z+' · '+p+'. perioda · '+(g===null?"—":g+". skupina")+' · '+b+'-blok</span></div>';
  h+='<div class="readout"><span class="k">Valenční konfigurace</span><span class="v" style="font-size:1rem">'+subsStr(shellOrder(cfgValence(Z)))+'</span><span class="h">'+cfgShort(Z)+'</span></div>';
  h+='<div class="readout"><span class="k">Charakter</span><span class="v" style="color:'+catCol+'">'+e.cat+'</span><span class="h">'+(e.en!==null?"χ = "+fmt(e.en,2)+" · ":"")+'I₁ = '+fmt(e.i1,0)+' kJ·mol⁻¹</span></div>';
  h+='</div><div class="grid3" style="margin-top:.7rem">';
  h+='<div class="readout"><span class="k">Vaznost</span><span class="v">'+e.val+'</span><span class="h">'+(unpaired(Z)+' nepárov'+(unpaired(Z)===1?'ý':(unpaired(Z)>=2&&unpaired(Z)<=4?'é':'ých'))+' v základním stavu')+'</span></div>';
  h+='<div class="readout"><span class="k">Běžná oxidační čísla</span><span class="v" style="font-size:1rem">'+e.ox+'</span><span class="h">'+(b==="d"?"více stavů: ns i (n−1)d":(g!==null&&g>=13&&g<=17?"max = "+(g-10)+", min = "+(g-18):(g!==null&&g<=2?"max = "+g:"")))+'</span></div>';
  h+='<div class="readout"><span class="k">Typický ion</span><span class="v" style="font-size:1rem">'+(e.ion||"netvoří jednoduché ionty")+'</span><span class="h">'+(e.ion?(e.ion.indexOf("⁻")>=0&&e.ion.indexOf("⁺")<0?"anion → konfigurace vzácného plynu":"kation"):"kovalentní vazby / inertní")+'</span></div>';
  h+='</div>';
  $("#ptInfo").innerHTML=h;
}

/* ============================================================
   17 · WIDGET — prohledávatelná tabulka prvků
   ============================================================ */
var tblState={q:"",b:"all"};
function drawTbl(){
  var q=tblState.q.toLowerCase().trim();
  var rows=ELEMENTS.filter(function(e){
    var b=block(e.Z);
    if(tblState.b!=="all" && b!==tblState.b) return false;
    if(!q) return true;
    var grp=group(e.Z), names={1:"alkalický kov",2:"kov alkalických zemin",17:"halogen",18:"vzácný plyn",16:"chalkogen"}[grp]||"";
    var hay=(e.n+" "+e.s+" "+e.Z+" "+cfgShort(e.Z)+" "+cfgFull(e.Z)+" "+e.cat+" "+b+"-blok "+names+" perioda "+period(e.Z)+" skupina "+grp).toLowerCase();
    return hay.indexOf(q)>=0 || (q==="ns¹"&&grp===1) || (q==="ns²"&&grp===2);
  });
  var h="";
  rows.forEach(function(e){
    var b=block(e.Z), col=b==="s"?"var(--cat1)":(b==="p"?"var(--cat3)":"var(--cat2)");
    h+='<tr><td class="n">'+e.Z+'</td><td><b class="mono" style="color:'+col+'">'+e.s+'</b> '+e.n+'</td><td class="mono" style="white-space:nowrap">'+cfgShort(e.Z)+'</td>'+
       '<td class="n">'+(e.en===null?'<span style="color:var(--ink-3)">—</span>':fmt(e.en,2))+'</td>'+
       '<td class="n">'+fmt(e.i1,0)+'</td>'+
       '<td class="n">'+(e.ea===null?'<span style="color:var(--ink-3)">—</span>':fmt(e.ea,0))+'</td>'+
       '<td class="n">'+e.r+'</td><td style="font-size:.86rem">'+e.ox+'</td></tr>';
  });
  if(!rows.length) h='<tr><td colspan="8" style="color:var(--ink-3);padding:1.2rem">Nic nenalezeno. Zkuste hledat česky („železo“), značkou („Fe“), číslem („26“) nebo konfigurací („3d⁶“).</td></tr>';
  $("#tblBody").innerHTML=h;
  $$("#tblBlock button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===tblState.b); });
}
