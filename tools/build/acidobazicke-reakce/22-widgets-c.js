/* ============================================================
   T7 · TABULKA — konstanty acidity a bazicity
   ============================================================ */
var kaState={q:"",f:"all",sort:"strength"};
function kaTypeLabel(x){
  return (x.org?"organická":"anorganická")+" "+(x.kind==="kys"?"kyselina":"báze");
}
function kaStrengthFrac(pK){
  if(pK===null) return 1;
  var f=1-(pK+10)/26; return Math.max(0.03,Math.min(1,f));
}
function drawKaTable(){
  var q=kaState.q.toLowerCase().trim();
  var rows=KATAB.filter(function(x){
    if(kaState.f==="kys"&&x.kind!=="kys") return false;
    if(kaState.f==="baz"&&x.kind!=="baz") return false;
    if(kaState.f==="org"&&!x.org) return false;
    if(kaState.f==="anorg"&&x.org) return false;
    if(!q) return true;
    return (x.f+" "+x.n+" "+x.note+" "+kaTypeLabel(x)).toLowerCase().indexOf(q)>=0;
  });
  var key=function(x){ return x.pK===null?-99:x.pK; };
  if(kaState.sort==="strength") rows=rows.slice().sort(function(a,b){ return key(a)-key(b); });
  else if(kaState.sort==="weak") rows=rows.slice().sort(function(a,b){ return key(b)-key(a); });
  else rows=rows.slice().sort(function(a,b){ return a.n.localeCompare(b.n,"cs"); });
  var h="";
  rows.forEach(function(x){
    var isK=x.kind==="kys";
    var col=isK?"var(--exo)":"var(--endo)";
    var Kv, pKv, partner;
    if(x.pK===null){ Kv="≫ 1"; pKv="silná"; partner="—"; }
    else if(x.approx){ Kv=(x.pK<0?"≫ 1":"≈ "+sci(Math.pow(10,-x.pK),1)); pKv="≈ "+fmt(x.pK,x.pK%1===0?0:1); partner=(x.pK<0?"≈ "+fmt(14-x.pK,0):"≈ "+fmt(14-x.pK,1)); }
    else { Kv=sci(Math.pow(10,-x.pK),1); pKv=fmt(x.pK,2); partner=fmt(14-x.pK,2); }
    var frac=kaStrengthFrac(x.pK), pct=(frac*100).toFixed(1);
    var bc= frac>0.7?col:(frac>0.35?"var(--cat3)":"var(--ink-3)");
    h+='<tr><td class="mono" style="font-weight:600;white-space:nowrap">'+x.f+'</td>'+
       '<td>'+x.n+'<br><span style="font-size:.78rem;color:var(--ink-3);line-height:1.35">'+x.note+'</span></td>'+
       '<td><span class="tag" style="background:'+(isK?"var(--exo-soft)":"var(--endo-soft)")+';color:'+col+'">'+kaTypeLabel(x)+'</span></td>'+
       '<td class="n mono">'+Kv+'</td>'+
       '<td class="n" style="font-weight:700">'+pKv+'</td>'+
       '<td><span style="display:block;height:9px;border-radius:99px;background:var(--surface-3);overflow:hidden"><span style="display:block;height:100%;width:'+pct+'%;background:'+bc+';border-radius:99px"></span></span></td>'+
       '<td class="mono">'+x.conj+'</td>'+
       '<td class="n">'+partner+(x.pK!==null?' <span style="font-size:.75rem;color:var(--ink-3)">('+(isK?"p<i>K</i><sub>b</sub>":"p<i>K</i><sub>a</sub>")+')</span>':'')+'</td></tr>';
  });
  if(!rows.length) h='<tr><td colspan="8" style="padding:1.1rem;color:var(--ink-3)">Nic nenalezeno. Zkuste „octová“, „amin“, „uhličit“ nebo „HF“.</td></tr>';
  $("#kaBody").innerHTML=h;
  $("#kaCount").textContent="Zobrazeno "+rows.length+" z "+KATAB.length+" položek · síla: delší pruh = silnější kyselina/báze · poslední sloupec = p"+"K konjugovaného partnera (14 − pK).";
  $$("#kaFilter button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===kaState.f); });
  $$("#kaSort button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===kaState.sort); });
}

/* ============================================================
   T8 · GRAF — stupeň disociace vs koncentrace (Ostwald)
   ============================================================ */
var ALACIDS=[
 {f:"CH₃COOH",n:"kyselina octová",pKa:4.76},
 {f:"HCOOH",n:"kyselina mravenčí",pKa:3.75},
 {f:"HF",n:"kyselina fluorovodíková",pKa:3.17},
 {f:"HNO₂",n:"kyselina dusitá",pKa:3.25},
 {f:"HSO₄⁻",n:"hydrogensíran",pKa:1.99},
 {f:"Cl₂CHCOOH",n:"kyselina dichloroctová",pKa:1.35},
 {f:"H₂CO₃",n:"kyselina uhličitá (1. st.)",pKa:6.35},
 {f:"HClO",n:"kyselina chlorná",pKa:7.54},
 {f:"HCN",n:"kyanovodík",pKa:9.21},
 {f:"NH₄⁺",n:"amonný kation",pKa:9.25}
];
var alState={i:0,logc:-1};
function alpha(Ka,c){ return (-Ka+Math.sqrt(Ka*Ka+4*Ka*c))/(2*c); }
function drawAl(){
  var a=ALACIDS[alState.i], Ka=Math.pow(10,-a.pKa), c=Math.pow(10,alState.logc);
  var W=760,H=300,L=64,R=700,T0=30,B=246;
  var x=function(lc){ return L+((lc+4)/4)*(R-L); };
  var y=function(al){ return B-al*(B-T0); };
  var s='';
  for(var lc=-4;lc<=0;lc++){ s+=line(x(lc),T0,x(lc),B,{c:"var(--line)",w:1}); s+=txt(x(lc),B+18,(lc===0?"1":"10"+sup(lc)),{anchor:"middle",size:11,fill:"var(--ink-3)",mono:true}); }
  for(var al=0;al<=1;al+=0.25){ s+=line(L,y(al),R,y(al),{c:"var(--line)",w:1}); s+=txt(L-8,y(al)+4,fmt(al*100,0)+" %",{anchor:"end",size:11,fill:"var(--ink-3)",mono:true}); }
  /* ostatní kyseliny slabě */
  ALACIDS.forEach(function(o,i){
    if(i===alState.i) return;
    var K=Math.pow(10,-o.pKa), pts=[];
    for(var l=-4;l<=0;l+=0.05){ pts.push(x(l).toFixed(1)+","+y(alpha(K,Math.pow(10,l))).toFixed(1)); }
    s+='<polyline points="'+pts.join(" ")+'" style="fill:none;stroke:var(--line-strong);stroke-width:1;opacity:.6"/>';
    s+=txt(x(-4)-2,y(alpha(K,1e-4))+4,o.f,{anchor:"end",size:8.5,fill:"var(--ink-3)"});
  });
  var pts=[];
  for(var l2=-4;l2<=0;l2+=0.05){ pts.push(x(l2).toFixed(1)+","+y(alpha(Ka,Math.pow(10,l2))).toFixed(1)); }
  s+='<polyline points="'+pts.join(" ")+'" style="fill:none;stroke:var(--accent);stroke-width:2.8;stroke-linejoin:round"/>';
  var av=alpha(Ka,c);
  s+=line(x(alState.logc),T0-4,x(alState.logc),B+4,{c:"var(--ink)",w:1.5,dash:"5 4"});
  s+='<circle cx="'+x(alState.logc)+'" cy="'+y(av)+'" r="6" style="fill:var(--accent);stroke:var(--surface);stroke-width:2"/>';
  s+=txt(x(alState.logc)+10,y(av)-8,a.f+" · α = "+fmt(av*100,av<0.01?2:1)+" %",{size:12,w:700,fill:"var(--accent)"});
  s+=txt((L+R)/2,B+38,"koncentrace c [mol·dm⁻³] — logaritmická osa",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em;text-transform:uppercase"});
  s+=txt(16,(T0+B)/2,"stupeň disociace α",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:16px "+((T0+B)/2)+"px;letter-spacing:.08em"});
  $("#alWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Stupeň disociace slabé kyseliny v závislosti na koncentraci"');
  $("#alCV").textContent=sci(c,1)+" mol·dm⁻³";
  var h3o=av*c;
  function ro(id,k,v,h){ var e=$(id); e.className="readout"; e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#alRo1","Stupeň disociace α",fmt(av*100,av<0.01?2:1)+" %","z "+fmt(c,4)+" mol·dm⁻³ disociuje "+sci(h3o,1)+" mol·dm⁻³");
  ro("#alRo2","<span class='q'>K</span><sub>a</sub> — nemění se",sci(Ka,2),"p<span class='q'>K</span><sub>a</sub> = "+fmt(a.pKa,2)+" · vlastnost látky");
  ro("#alRo3","[H₃O⁺] = α·c",sci(h3o,2)+" mol·dm⁻³","pH ≈ "+fmt(-Math.log10(h3o),2));
}
function initAl(){
  var sel=$("#alSel");
  sel.innerHTML=ALACIDS.map(function(a,i){ return '<option value="'+i+'">'+a.f+' — '+a.n+' (pKa '+fmt(a.pKa,2)+')</option>'; }).join("");
  sel.addEventListener("change",function(){ alState.i=+sel.value; drawAl(); });
  $("#alC").addEventListener("input",function(){ alState.logc=+this.value; drawAl(); });
  drawAl();
}

/* ============================================================
   T9 · WIDGET — porovnávač síly (řady)
   ============================================================ */
var cmpI=0;
function drawCmp(){
  var c=CMP[cmpI];
  var W=760, rowH=34, top=54, L=190, R=690;
  var H=top+rowH*c.items.length+40;
  var x=function(v){ return L+((v-c.lo)/(c.hi-c.lo))*(R-L); };
  var s='';
  s+=txt(L,22,(c.unit==="pKa"?"p𝐾ₐ — MENŠÍ HODNOTA = SILNĚJŠÍ KYSELINA":"p𝐾ᵦ — MENŠÍ HODNOTA = SILNĚJŠÍ BÁZE"),{size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  s+=txt(L,38,"← silnější",{size:10,w:600,fill:"var(--exo)"});
  s+=txt(R,38,"slabší →",{anchor:"end",size:10,w:600,fill:"var(--endo)"});
  var step=(c.hi-c.lo)>20?10:((c.hi-c.lo)>8?2:1);
  for(var v=Math.ceil(c.lo/step)*step; v<=c.hi; v+=step){
    s+=line(x(v),top-6,x(v),H-26,{c:"var(--line)",w:1});
    s+=txt(x(v),H-12,v,{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true});
  }
  c.items.forEach(function(it,i){
    var yy=top+rowH*i;
    var frac=(it.v-c.lo)/(c.hi-c.lo);
    var col= frac<0.34?"var(--exo)":(frac<0.67?"var(--cat3)":"var(--endo)");
    s+=txt(L-10,yy+17,it.f,{anchor:"end",size:12.5,w:700,fill:"var(--ink)"});
    s+=rect(L,yy+4,Math.max(3,x(it.v)-L),18,{fill:col,r:4});
    s+=txt(x(it.v)+8,yy+17,(it.ap?"≈ ":"")+fmt(it.v,it.v%1===0?0:2),{size:11.5,w:700,fill:col,mono:true});
    s+=txt(x(it.v)+8+(it.ap?58:44),yy+17,it.x,{size:10,fill:"var(--ink-3)"});
  });
  $("#cmpWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Porovnání síly kyselin a bází v řadě"');
  $("#cmpWhy").innerHTML=c.why;
  $("#cmpTrap").innerHTML=c.trap;
}
function initCmp(){
  var sel=$("#cmpSel");
  sel.innerHTML=CMP.map(function(c,i){ return '<option value="'+i+'">'+c.name+'</option>'; }).join("");
  sel.addEventListener("change",function(){ cmpI=+sel.value; drawCmp(); });
  drawCmp();
}
