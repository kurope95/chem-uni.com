/* ============================================================
   21 · WIDGETY KAPITOL 0 A 1
   ============================================================ */

/* ---- stechiometrie rychlostí ---- */
var stState={i:0,v:2e-4};
function drawSt(){
  var r=STRXN[stState.i], v=stState.v;
  var W=720, rowH=44, H=40+r.sp.length*rowH+20, L=150, mid=430, span=230;
  var maxNu=Math.max.apply(null,r.sp.map(function(p){return Math.abs(p.nu);}));
  var s='';
  s+=txt(L,22,r.eq,{size:13,w:600,fill:"var(--ink)"});
  s+=line(mid,36,mid,H-14,{c:"var(--line-strong)",w:1.5});
  s+=txt(mid-6,H-2,"úbytek ←",{anchor:"end",size:10.5,w:600,fill:"var(--exo)",style:"letter-spacing:.06em"});
  s+=txt(mid+6,H-2,"→ přírůstek",{size:10.5,w:600,fill:"var(--endo)",style:"letter-spacing:.06em"});
  r.sp.forEach(function(p,i){
    var yy=44+i*rowH, len=span*Math.abs(p.nu)/maxNu, col=p.nu<0?"var(--exo)":"var(--endo)";
    s+=txt(L-10,yy+18,p.f,{anchor:"end",size:13,w:600,fill:"var(--ink)"});
    s+=txt(L-10,yy+31,(p.nu<0?"reaktant":"produkt")+" · ν = "+Math.abs(p.nu),{anchor:"end",size:10.5,fill:"var(--ink-3)"});
    if(p.nu<0) s+=rect(mid-len,yy+6,len,22,{fill:col,r:4}); else s+=rect(mid,yy+6,len,22,{fill:col,r:4});
    var lab=(p.nu<0?"−":"+")+sci(Math.abs(p.nu)*v,1);
    s+=txt(p.nu<0?mid-len-8:mid+len+8,yy+21,lab,{anchor:p.nu<0?"end":"start",size:12,w:600,fill:col,mono:true});
  });
  $("#stWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Rychlosti úbytku a přírůstku látek"');
  $("#stVV").textContent=sci(v,1)+" mol·dm⁻³·s⁻¹";
  $("#stBody").innerHTML=r.sp.map(function(p){
    var col=p.nu<0?"var(--exo)":"var(--endo)";
    return '<tr><td class="chem" style="font-weight:600">'+p.f+'</td><td class="n">'+Math.abs(p.nu)+'</td>'+
      '<td>'+(p.nu<0?'<span class="tag exo">reaktant</span>':'<span class="tag endo">produkt</span>')+'</td>'+
      '<td class="n" style="color:'+col+';font-weight:600">'+(p.nu<0?"−":"+")+sci(Math.abs(p.nu)*v,1)+'</td>'+
      '<td class="mono" style="font-size:.85rem">'+(p.nu<0?"−":"+")+(Math.abs(p.nu)===1?"":Math.abs(p.nu)+"·")+'v &nbsp;→&nbsp; v = '+(p.nu<0?"−":"")+(Math.abs(p.nu)===1?"":"1/"+Math.abs(p.nu)+" · ")+'Δ['+p.f+']/Δt</td></tr>';
  }).join("");
  var notes=[
    "Peroxid ubývá <b>dvakrát rychleji</b>, než vzniká kyslík — na dvě molekuly H₂O₂ připadá jedna O₂. Rychlost reakce je definovaná tak, aby vyšla stejně z&nbsp;kterékoli látky: je rovna rychlosti vzniku O₂ a&nbsp;polovině rychlosti úbytku H₂O₂.",
    "Vodík ubývá <b>třikrát rychleji</b> než dusík a&nbsp;amoniak přibývá dvakrát rychleji, než dusík ubývá. Poměr 1 : 3 : 2 je přesně poměr koeficientů — a&nbsp;přesto má reakce jen jednu rychlost <span class='q'>v</span>.",
    "Nejnápadnější rozdíly: NO₂ vzniká čtyřikrát rychleji než O₂. Kdybychom měřili rychlost přes NO₂, dostali bychom čtyřnásobek hodnoty měřené přes O₂ — proto se dělí koeficientem.",
    "Dva reaktanty s&nbsp;různými koeficienty: SO₂ ubývá dvakrát rychleji než O₂. Rychlost reakce odpovídá úbytku kyslíku (koeficient 1)."
  ];
  $("#stNote").innerHTML=notes[stState.i];
}
function initSt(){
  var sel=$("#stRxn");
  sel.innerHTML=STRXN.map(function(r,i){return '<option value="'+i+'">'+r.name+' — '+r.eq+'</option>';}).join("");
  sel.addEventListener("change",function(){ stState.i=+sel.value; drawSt(); });
  $("#stV").addEventListener("input",function(){ stState.v=(+this.value)*1e-4; drawSt(); });
  drawSt();
}

/* ---- kalkulačka průměrné rychlosti ---- */
var avgState={i1:0,i2:3};
function drawAvg(){
  var d=H2O2, i1=avgState.i1, i2=avgState.i2;
  if(i2<=i1){ i2=Math.min(d.length-1,i1+1); if(i2===i1){ i1=i2-1; } avgState.i1=i1; avgState.i2=i2; $("#avgT1").value=i1; $("#avgT2").value=i2; }
  var W=520,H=290,L=58,R=490,T=26,B=236, TMAX=3600, CMAX=1.05;
  var x=function(t){ return L+(t/TMAX)*(R-L); };
  var y=function(c){ return B-(c/CMAX)*(B-T); };
  var s='';
  for(var i=0;i<=6;i++){ var tt=i*600; s+=line(x(tt),T,x(tt),B,{c:"var(--line)",w:1}); s+=txt(x(tt),B+15,tt,{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true}); }
  for(var j=0;j<=5;j++){ var cc=j*0.2; s+=line(L,y(cc),R,y(cc),{c:"var(--line)",w:1}); s+=txt(L-6,y(cc)+4,fmt(cc,1),{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true}); }
  s+=gAxes({L:L,R:R,T:T,B:B,xl:"čas [s]",yl:"[H₂O₂] mol·dm⁻³",yx:14,xly:32});
  s+='<polyline points="'+d.map(function(p){return x(p[0]).toFixed(1)+","+y(p[1]).toFixed(1);}).join(" ")+'" style="fill:none;stroke:var(--exo);stroke-width:2.2;stroke-linejoin:round"/>';
  d.forEach(function(p,i){
    var hi=(i===i1||i===i2);
    s+='<circle cx="'+x(p[0])+'" cy="'+y(p[1])+'" r="'+(hi?6:3.5)+'" style="fill:'+(hi?"var(--accent)":"var(--surface)")+';stroke:'+(hi?"var(--accent)":"var(--exo)")+';stroke-width:2"/>';
  });
  var p1=d[i1], p2=d[i2];
  /* Δt a Δc jako pravoúhlý trojúhelník */
  s+=line(x(p1[0]),y(p1[1]),x(p2[0]),y(p1[1]),{c:"var(--ink-3)",w:1.2,dash:"4 3"});
  s+=line(x(p2[0]),y(p1[1]),x(p2[0]),y(p2[1]),{c:"var(--ink-3)",w:1.2,dash:"4 3"});
  s+=line(x(p1[0]),y(p1[1]),x(p2[0]),y(p2[1]),{c:"var(--accent)",w:2.6,cap:"round"});
  s+=txt((x(p1[0])+x(p2[0]))/2,y(p1[1])-6,"Δt = "+(p2[0]-p1[0])+" s",{anchor:"middle",size:11,w:600,fill:"var(--ink-2)",mono:true});
  s+=txt(x(p2[0])+6,(y(p1[1])+y(p2[1]))/2+4,"Δc = "+fmt(p2[1]-p1[1],3),{size:11,w:600,fill:"var(--ink-2)",mono:true});
  $("#avgWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Sečna mezi dvěma body křivky koncentrace"');
  $("#avgBody").innerHTML=d.map(function(p,i){
    var hi=(i===i1||i===i2);
    return '<tr'+(hi?' style="background:var(--accent-soft);font-weight:600"':'')+'><td class="n">'+p[0]+'</td><td class="n">'+fmt(p[1],3)+'</td></tr>';
  }).join("");
  var dc=p2[1]-p1[1], dt=p2[0]-p1[0], rate=-dc/dt;
  $("#avgEq").innerHTML='−Δ[H₂O₂]/Δt = −('+fmt(p2[1],3)+' − '+fmt(p1[1],3)+') / ('+p2[0]+' − '+p1[0]+') = '+fmt(-dc,3)+' / '+dt+' = <b>'+sci(rate,2)+'</b> mol·dm⁻³·s⁻¹';
  setRo("#avgRo1","Rychlost úbytku H₂O₂",sci(rate,2),"mol·dm⁻³·s⁻¹ · −Δ[H₂O₂]/Δt","neg");
  setRo("#avgRo2","Rychlost reakce v",sci(rate/2,2),"mol·dm⁻³·s⁻¹ · = ½ · rychlost úbytku","");
  setRo("#avgRo3","Rychlost vzniku O₂",sci(rate/2,2),"mol·dm⁻³·s⁻¹ · = v (koeficient 1)","pos");
  var first=(-(d[1][1]-d[0][1])/(d[1][0]-d[0][0]));
  $("#avgNote").innerHTML="V&nbsp;intervalu "+p1[0]+"–"+p2[0]+" s je průměrná rychlost úbytku "+sci(rate,2)+" mol·dm⁻³·s⁻¹; hned na začátku (0–120 s) byla "+sci(first,2)+". "+
    (rate<first*0.5?"Rychlost během reakce <b>výrazně klesla</b>, protože ubylo reaktantu. ":"Na začátku reakce je rychlost nejvyšší — proto se v&nbsp;laboratoři měří počáteční rychlost. ")+
    "Zkuste nastavit interval 2400–3000 s.";
}
function initAvg(){
  var o=H2O2.map(function(p,i){return '<option value="'+i+'">'+p[0]+' s</option>';}).join("");
  $("#avgT1").innerHTML=o; $("#avgT2").innerHTML=o;
  $("#avgT1").value=avgState.i1; $("#avgT2").value=avgState.i2;
  $("#avgT1").addEventListener("change",function(){ avgState.i1=+this.value; drawAvg(); });
  $("#avgT2").addEventListener("change",function(){ avgState.i2=+this.value; drawAvg(); });
  drawAvg();
}

/* ---- průzkumník rychlostní rovnice ---- */
var rlState={A:1.0,B:1.0,m:1,n:1}, RL_K=0.50;
function drawRl(){
  var st=rlState, v=RL_K*Math.pow(st.A,st.m)*Math.pow(st.B,st.n), tot=st.m+st.n;
  var W=480,H=270,L=50,R=455,T=26,B=222, AMAX=3.0;
  var vmax=RL_K*Math.pow(AMAX,2)*Math.pow(st.B,st.n);
  var x=function(a){ return L+(a/AMAX)*(R-L); };
  var y=function(vv){ return B-Math.min(1,vv/vmax)*(B-T); };
  var s='';
  for(var i=0;i<=3;i++){ s+=line(x(i),T,x(i),B,{c:"var(--line)",w:1}); s+=txt(x(i),B+15,fmt(i,1),{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true}); }
  s+=gAxes({L:L,R:R,T:T,B:B,xl:"[A] mol·dm⁻³",yl:"rychlost v",yx:16,xly:32});
  [0,1,2].forEach(function(m){
    var pts=[];
    for(var a=0;a<=AMAX;a+=0.05){ pts.push(x(a).toFixed(1)+","+y(RL_K*Math.pow(a,m)*Math.pow(st.B,st.n)).toFixed(1)); }
    var cur=(m===st.m);
    s+='<polyline points="'+pts.join(" ")+'" style="fill:none;stroke:'+(cur?"var(--accent)":"var(--line-strong)")+';stroke-width:'+(cur?2.6:1.4)+';'+(cur?"":"stroke-dasharray:4 4;")+'"/>';
    var lab=["m = 0 (vodorovná)","m = 1 (přímka)","m = 2 (parabola)"][m];
    var ye=y(RL_K*Math.pow(AMAX,m)*Math.pow(st.B,st.n));
    s+=txt(R-4,ye-6,lab,{anchor:"end",size:10.5,w:cur?700:500,fill:cur?"var(--accent)":"var(--ink-3)"});
  });
  s+='<circle cx="'+x(st.A)+'" cy="'+y(v)+'" r="6" style="fill:var(--surface);stroke:var(--accent);stroke-width:2.5"/>';
  s+=line(x(st.A),y(v),x(st.A),B,{c:"var(--accent)",w:1,dash:"2 3"});
  $("#rlWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Závislost rychlosti na koncentraci A pro různé řády"');
  $("#rlAV").textContent=fmt(st.A,1)+" mol·dm⁻³";
  $("#rlBV").textContent=fmt(st.B,1)+" mol·dm⁻³";
  pressGroup("#rlM",st.m); pressGroup("#rlN",st.n);
  var parts=[];
  if(st.m>0) parts.push("[A]"+(st.m>1?sup(st.m):""));
  if(st.n>0) parts.push("[B]"+(st.n>1?sup(st.n):""));
  var rhs=parts.length?parts.join(" · "):"1";
  $("#rlEq").innerHTML='v = k · '+rhs+' = 0,50 · '+fmt(st.A,1)+sup(st.m)+' · '+fmt(st.B,1)+sup(st.n)+' = <b>'+fmt(v,3)+' mol·dm⁻³·s⁻¹</b>';
  setRo("#rlRo1","Rychlost v",fmt(v,3)+" mol·dm⁻³·s⁻¹","při k = 0,50","");
  setRo("#rlRo2","Celkový řád",tot,"m + n = "+st.m+" + "+st.n,"");
  setRo("#rlRo3","Jednotka k",kUnit(tot),"z celkového řádu "+tot,"");
  var rows=[
    ["zdvojnásobím [A]",Math.pow(2,st.m)],
    ["zdvojnásobím [B]",Math.pow(2,st.n)],
    ["zdvojnásobím obě",Math.pow(2,tot)],
    ["ztrojnásobím [A]",Math.pow(3,st.m)],
    ["zředím na polovinu (obě)",Math.pow(0.5,tot)]
  ];
  $("#rlBody").innerHTML=rows.map(function(r){
    return '<tr><td>'+r[0]+'</td><td class="n" style="font-weight:600;color:'+(r[1]>1?"var(--ok)":(r[1]<1?"var(--bad)":"var(--ink-3)"))+'">×'+fmt(r[1],3)+'</td></tr>';
  }).join("");
  $("#rlNote").innerHTML = st.n===0
    ? "Řád v&nbsp;B je nula: hýbejte [B] jak chcete, rychlost se nezmění — B v&nbsp;rychlostní rovnici fakticky není. Tak se chová reaktant, který vstupuje až do rychlého kroku mechanismu."
    : (st.m===2 ? "Řád 2 v&nbsp;A: zdvojnásobení [A] dá <b>čtyřnásobek</b>, ztrojnásobení devítinásobek. Křivka je parabola — rychlost je na koncentraci mnohem citlivější než u&nbsp;prvního řádu."
    : "Zkuste nastavit <span class='q'>m</span> = 2 a&nbsp;zdvojnásobit [A]: rychlost vzroste čtyřikrát. Pak nastavte <span class='q'>n</span> = 0 a&nbsp;hýbejte [B] — rychlost se ani nehne.");
}
function initRl(){
  $("#rlA").addEventListener("input",function(){ rlState.A=(+this.value)/10; drawRl(); });
  $("#rlB").addEventListener("input",function(){ rlState.B=(+this.value)/10; drawRl(); });
  $$("#rlM button").forEach(function(b){ b.addEventListener("click",function(){ rlState.m=+b.dataset.v; drawRl(); }); });
  $$("#rlN button").forEach(function(b){ b.addEventListener("click",function(){ rlState.n=+b.dataset.v; drawRl(); }); });
  drawRl();
}

/* ---- trenažér metody počátečních rychlostí ---- */
var irI=0, irScore=0, irPick={m:null,n:null}, irDone=false;
function drawIr(){
  var d=IRSETS[irI];
  $("#irQn").textContent=irI+1; $("#irQtot").textContent=IRSETS.length; $("#irScore").textContent=irScore;
  $("#irEq").innerHTML='<span class="chem">'+d.eq+'</span> &nbsp;&nbsp;·&nbsp;&nbsp; v = k·['+d.a+']<sup>m</sup>·['+d.b+']<sup>n</sup>';
  $("#irHa").innerHTML="["+d.a+"] mol·dm⁻³"; $("#irHb").innerHTML="["+d.b+"] mol·dm⁻³";
  $("#irBody").innerHTML=d.rows.map(function(r,i){
    return '<tr><td>experiment '+(i+1)+'</td><td class="n">'+fmt(r[0],4)+'</td><td class="n">'+fmt(r[1],4)+'</td><td class="n" style="font-weight:600">'+sci(r[2],2)+'</td></tr>';
  }).join("");
  irPick={m:null,n:null}; irDone=false;
  pressGroup("#irM","x"); pressGroup("#irN","x");
  var ex=$("#irExplain"); ex.style.display="none"; ex.className="explain";
  $("#irVerdict").classList.remove("show"); $("#irVerdict").innerHTML="";
  $("#irNext").disabled=true;
  $("#irNote").innerHTML=d.hint;
}
function initIr(){
  $$("#irM button").forEach(function(b){ b.addEventListener("click",function(){ if(irDone) return; irPick.m=+b.dataset.v; pressGroup("#irM",irPick.m); }); });
  $$("#irN button").forEach(function(b){ b.addEventListener("click",function(){ if(irDone) return; irPick.n=+b.dataset.v; pressGroup("#irN",irPick.n); }); });
  $("#irCheck").addEventListener("click",function(){
    if(irDone) return;
    var d=IRSETS[irI], v=$("#irVerdict");
    if(irPick.m===null||irPick.n===null){ v.classList.add("show"); v.innerHTML='<span class="tag warn">Chybí volba</span><span>Zvolte oba řády.</span>'; return; }
    irDone=true;
    var ok=(irPick.m===d.m && irPick.n===d.n);
    if(ok) irScore++;
    $("#irScore").textContent=irScore;
    var r0=d.rows[0], k=r0[2]/(Math.pow(r0[0],d.m)*Math.pow(r0[1],d.n)), tot=d.m+d.n;
    var ex=$("#irExplain"); ex.className="explain"; ex.style.display="flex";
    ex.style.background=ok?"var(--ok-soft)":"var(--bad-soft)"; ex.style.borderColor=ok?"var(--ok)":"var(--bad)";
    ex.innerHTML='<span class="verdict" style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+(ok?"✓ Správně":"✕ Špatně — správně je m = "+d.m+", n = "+d.n)+'</span>'+
      '<span class="eyebrow">Proč</span><div>'+d.why+'</div>'+
      '<p class="eq" style="margin-top:.3rem">v = k·['+d.a+']'+(d.m===1?"":sup(d.m))+(d.n===0?"":'·['+d.b+']'+(d.n===1?"":sup(d.n)))+' &nbsp;·&nbsp; celkový řád '+tot+' &nbsp;·&nbsp; k = '+sci(r0[2],2)+' / ('+fmt(r0[0],4)+sup(d.m)+' · '+fmt(r0[1],4)+sup(d.n)+') = <b>'+sci(k,2)+' '+kUnit(tot)+'</b></p>';
    v.classList.add("show");
    v.innerHTML=ok?'<span class="tag ok">✓ '+irScore+' / '+(irI+1)+'</span>':'<span class="tag bad">✕ '+irScore+' / '+(irI+1)+'</span>';
    $("#irNext").disabled = irI>=IRSETS.length-1;
    if(irI>=IRSETS.length-1){
      toast("Trenažér dokončen: "+irScore+" ze "+IRSETS.length+" správně.");
      if(irScore>=3) markDone("k1");
    }
  });
  $("#irNext").addEventListener("click",function(){ if(irI<IRSETS.length-1){ irI++; drawIr(); } });
  drawIr();
}
