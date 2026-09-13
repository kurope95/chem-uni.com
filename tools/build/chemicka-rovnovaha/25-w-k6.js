/* ============================================================
   T13 · WIDGET — simulátor Le Chatelierových zásahů (k6)
   ============================================================ */
var lcS={i:0,n:[],V:1,T:700,K:1,beforeC:null,midC:null,afterC:null,act:null,xi:0,Qmid:null,Kold:null};

function lcInQ(ph){ return ph==="g"||ph==="aq"; }
function lcQ(r,n,V){
  var q=1;
  r.sp.forEach(function(s,i){ if(lcInQ(s[2])) q*=Math.pow(Math.max(n[i],1e-12)/V, s[1]); });
  return q;
}
function lcSolve(r,n,V,K){
  var lo=-1e9, hi=1e9;
  r.sp.forEach(function(s,i){
    if(s[1]>0) lo=Math.max(lo,-n[i]/s[1]);
    else if(s[1]<0) hi=Math.min(hi,n[i]/(-s[1]));
  });
  lo+=1e-10; hi-=1e-10;
  if(hi<=lo) return 0;
  for(var it=0;it<200;it++){
    var m=(lo+hi)/2, nm=n.map(function(x,i){ return x+r.sp[i][1]*m; });
    if(lcQ(r,nm,V)>K) hi=m; else lo=m;
  }
  return (lo+hi)/2;
}
function lcConc(r,n,V){ return n.map(function(x,i){ return lcInQ(r.sp[i][2]) ? x/V : x; }); }
function lcEquil(r,n,V,K){ var xi=lcSolve(r,n,V,K); return {n:n.map(function(x,i){return Math.max(0,x+r.sp[i][1]*xi);}),xi:xi}; }
function lcKat(r,T){ return vantHoff(r.K,r.T0,T,r.dH); }

/* seznam zásahů pro danou reakci */
function lcBuildActions(r,scale){
  var A=[], dT = r.T0>=600 ? 100 : 30, amt=Math.max(0.02,scale*0.3);
  r.sp.forEach(function(s,i){
    if(s[2]==="s"){ A.push({k:"solid",i:i,lab:"Přidej "+s[0]+" (s)"}); return; }
    if(s[1]<0) A.push({k:"add",i:i,amt:amt,lab:"Přidej "+s[0]});
    else { A.push({k:"add",i:i,amt:amt,lab:"Přidej "+s[0]}); A.push({k:"rem",i:i,lab:"Odeber "+s[0]}); }
  });
  A.push({k:"vol",f:0.5,lab:"Zvyš tlak (V na polovinu)"});
  A.push({k:"vol",f:2,lab:"Sniž tlak (V na dvojnásobek)"});
  A.push({k:"temp",d:dT,lab:"Zvyš teplotu o "+dT+" K"});
  A.push({k:"temp",d:-dT,lab:"Sniž teplotu o "+dT+" K"});
  A.push({k:"cat",lab:"Přidej katalyzátor"});
  A.push({k:"inert",lab:"Přidej inertní plyn (V konst.)"});
  A.push({k:"inertp",lab:"Přidej inertní plyn (p konst.)"});
  return A;
}
var lcACT=[];

function lcReset(keep){
  var r=LCRXN[lcS.i];
  lcS.V=r.V0; lcS.T=r.T0; lcS.K=r.K;
  var n0=r.sp.map(function(s){ return s[3]; });
  var e=lcEquil(r,n0,lcS.V,lcS.K);
  lcS.n=e.n; lcS.beforeC=lcConc(r,e.n,lcS.V); lcS.midC=null; lcS.afterC=lcConc(r,e.n,lcS.V);
  lcS.act=null; lcS.xi=0; lcS.Qmid=null; lcS.Kold=lcS.K;
  var scale=Math.max.apply(null,e.n.filter(function(x,i){return lcInQ(r.sp[i][2]);}).concat([0.1]));
  lcACT=lcBuildActions(r,scale);
  if(!keep) drawLC();
}
function lcDo(a){
  var r=LCRXN[lcS.i];
  lcS.beforeC=lcConc(r,lcS.n,lcS.V); lcS.Kold=lcS.K;
  var n=lcS.n.slice(), V=lcS.V, T=lcS.T, K=lcS.K, note="";
  if(a.k==="add"){ n[a.i]+=a.amt; note="add"; }
  else if(a.k==="rem"){ n[a.i]=n[a.i]*0.4; note="rem"; }
  else if(a.k==="solid"){ n[a.i]+=0.2; note="solid"; }
  else if(a.k==="vol"){ V=V*a.f; note="vol"; }
  else if(a.k==="temp"){ T=T+a.d; K=lcKat(r,T); note="temp"; }
  else if(a.k==="cat"||a.k==="inert"){ note=a.k; }
  else if(a.k==="inertp"){ V=V*1.5; note="inertp"; }
  lcS.V=V; lcS.T=T; lcS.K=K; lcS.midC=lcConc(r,n,V); lcS.Qmid=lcQ(r,n,V);
  var e=lcEquil(r,n,V,K);
  lcS.n=e.n; lcS.afterC=lcConc(r,e.n,V); lcS.xi=e.xi; lcS.act=a;
  drawLC();
}
function drawLC(){
  var r=LCRXN[lcS.i], sp=r.sp;
  $("#lcEq").innerHTML='<span class="chem">'+r.eq+'</span> &nbsp;<span style="color:var(--ink-3);font-size:.9em">'+r.why+' · Δ<span class="q">H</span> = '+sgn(r.dH,0)+' kJ·mol⁻¹</span>';
  var W=760,H=68+sp.length*62, L=132, R=650;
  var vals=sp.map(function(sc,i){ return [ lcS.beforeC[i], lcS.midC?lcS.midC[i]:null, lcS.afterC[i] ]; });
  var max=0; vals.forEach(function(v){ v.forEach(function(x){ if(x!==null) max=Math.max(max,x); }); }); max=max*1.12||1;
  var s='';
  s+=txt(L,20,"KONCENTRACE  [mol·dm⁻³]   ·   pevné látky v molech (nejsou v K)",{size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  sp.forEach(function(sc,i){
    var y=42+i*62, v=vals[i];
    s+=txt(L-12,y+18,sc[0],{anchor:"end",size:13,w:600,fill:"var(--ink)"});
    s+=txt(L-12,y+33,(sc[2]==="s"?"pevná":(sc[1]<0?"výchozí látka":"produkt"))+" · ν = "+sgn(sc[1],0),{anchor:"end",size:10,fill:"var(--ink-3)"});
    var cols=["var(--ink-3)","var(--warn)","var(--accent)"], labs=["před","po zásahu","nová rovn."];
    [0,1,2].forEach(function(j){
      if(v[j]===null) return;
      var yy=y+j*15, w=(v[j]/max)*(R-L);
      s+=rect(L,yy,Math.max(1.5,w),12,{fill:cols[j],r:3,style:j===1?"fill-opacity:.75":""});
      s+=txt(L+Math.max(1.5,w)+7,yy+10,fmt(v[j],v[j]<0.1?4:3),{size:10.5,w:600,fill:cols[j],mono:true});
      s+=txt(R+58,yy+10,labs[j],{size:9.5,fill:"var(--ink-3)"});
    });
  });
  if(r.color){
    var idx=sp.map(function(x){return x[0];}).indexOf(r.color);
    var c1=vals[idx][0], c2=vals[idx][2], mx=Math.max(c1,c2,1e-9);
    s+=rect(L-118,H-46,52,34,{fill:"var(--exo)",r:6,style:"fill-opacity:"+(0.08+0.9*Math.min(1,c1/0.06)).toFixed(2)+";stroke:var(--line-strong);stroke-width:1"});
    s+=rect(L-58,H-46,52,34,{fill:"var(--exo)",r:6,style:"fill-opacity:"+(0.08+0.9*Math.min(1,c2/0.06)).toFixed(2)+";stroke:var(--line-strong);stroke-width:1"});
    s+=txt(L-92,H-4,"před",{anchor:"middle",size:10,fill:"var(--ink-3)"});
    s+=txt(L-32,H-4,"po",{anchor:"middle",size:10,fill:"var(--ink-3)"});
    s+=txt(L+8,H-24,"barva plynu: hnědý NO₂ vs. bezbarvý N₂O₄ — z odstínu se pozná směr posunu",{size:10.5,fill:"var(--ink-3)"});
  }
  $("#lcWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Koncentrace před zásahem a po něm"');

  var dirTxt, dirSub;
  if(!lcS.act){ dirTxt="—"; dirSub="zatím žádný zásah"; }
  else if(Math.abs(lcS.xi)<1e-6){ dirTxt="Neposune se"; dirSub="Q zůstalo rovno K"; }
  else if(lcS.xi>0){ dirTxt="→ doprava"; dirSub="přibývá produktů (ξ = "+fmt(lcS.xi,4)+" mol)"; }
  else { dirTxt="← doleva"; dirSub="přibývá výchozích látek (ξ = "+fmt(lcS.xi,4)+" mol)"; }
  function ro(id,k,v,h,cls){ var e=$(id); e.className="readout "+(cls||""); e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#lcRoDir","Směr posunu",dirTxt,dirSub, lcS.xi>1e-6?"pos":(lcS.xi<-1e-6?"neg":""));
  var kChanged = lcS.act && lcS.act.k==="temp";
  ro("#lcRoK","Rovnovážná konstanta <span class='q'>K</span>",sci(lcS.K), kChanged ? "ZMĚNILA SE z "+sci(lcS.Kold)+" — jen teplota mění K" : "beze změny (T = "+fmt(lcS.T,0)+" K)", kChanged?"neg":"");
  ro("#lcRoQ","<span class='q'>Q</span> hned po zásahu", lcS.Qmid===null?"—":sci(lcS.Qmid), lcS.Qmid===null?"—":(lcS.Qmid<lcS.K*0.999?"Q < K → doprava":(lcS.Qmid>lcS.K*1.001?"Q > K → doleva":"Q = K → nic")));
  var why="Vyberte zásah tlačítkem nahoře.";
  if(lcS.act){
    var a=lcS.act, dn=sp.filter(function(x){return x[2]==="g";}).reduce(function(t,x){return t+x[1];},0);
    if(a.k==="add") why="Přidali jsme <b>"+sp[a.i][0]+"</b>, tedy "+(sp[a.i][1]<0?"výchozí látku":"produkt")+". Kvocient <span class='q'>Q</span> se okamžitě "+(sp[a.i][1]<0?"zmenšil":"zvětšil")+" a&nbsp;přestal se rovnat <span class='q'>K</span>. Soustava zásah zmírní tím, že přidanou látku zčásti <b>spotřebuje</b> — posun "+(sp[a.i][1]<0?"doprava":"doleva")+". <span class='q'>K</span> se nemění.";
    else if(a.k==="rem") why="Odebrali jsme část produktu <b>"+sp[a.i][0]+"</b>. <span class='q'>Q</span> kleslo pod <span class='q'>K</span>, takže soustava produkt <b>dorábí</b> — posun doprava. Přesně tohle dělá průmysl, když produkt průběžně odvádí (zkapalnění NH₃, oddestilování vody).";
    else if(a.k==="solid") why="Přidali jsme <b>pevnou látku</b>. Ta ve výrazu pro <span class='q'>K</span> vůbec není (její aktivita je 1), takže <span class='q'>Q</span> se nezměnilo a&nbsp;rovnováha se <b>neposune</b>. Změní se jen zásoba, ne složení plynné fáze.";
    else if(a.k==="vol") why="Změnili jsme objem na "+(a.f<1?"polovinu (stlačení)":"dvojnásobek (expanze)")+", takže všechny koncentrace se "+(a.f<1?"zdvojnásobily":"zmenšily na polovinu")+". Δ<span class='q'>n</span>(g) = "+sgn(dn,0)+", proto se "+(dn===0?"<span class='q'>Q</span> <b>nezměnilo</b> — čitatel i&nbsp;jmenovatel se změnily stejně a&nbsp;rovnováha zůstává, kde byla":("<span class='q'>Q</span> vychýlilo a&nbsp;soustava se posune ke straně s&nbsp;<b>"+(a.f<1?"menším":"větším")+"</b> počtem molekul plynu"))+". <span class='q'>K</span><sub>p</sub> se tlakem nikdy nemění.";
    else if(a.k==="temp") why="Změna teploty je jediný zásah, který mění <b>samotné <span class='q'>K</span></b>: z&nbsp;"+sci(lcS.Kold)+" na "+sci(lcS.K)+". Reakce je "+(r.dH<0?"<b>exotermická</b>, takže zahřátí posouvá doleva a&nbsp;<span class='q'>K</span> klesá (ochlazení naopak)":"<b>endotermická</b>, takže zahřátí posouvá doprava a&nbsp;<span class='q'>K</span> roste (ochlazení naopak)")+". Kvantitativně to popisuje van 't Hoffova rovnice.";
    else if(a.k==="cat") why="Katalyzátor zvýší rychlostní konstantu přímé i&nbsp;zpětné reakce <b>stejným násobkem</b>, takže jejich podíl <span class='q'>K</span> = <span class='q'>k</span>₁/<span class='q'>k</span>₋₁ zůstává. Rovnováha se ustaví <b>dřív</b>, ale ve <b>stejném složení</b> — v&nbsp;grafu se nezmění vůbec nic.";
    else if(a.k==="inert") why="Inertní plyn za <b>stálého objemu</b> zvýší celkový tlak, ale <b>parciální tlaky ani koncentrace</b> reagujících látek se nezmění. <span class='q'>Q</span> zůstává rovno <span class='q'>K</span> — rovnováha se neposune. Klasický chyták.";
    else if(a.k==="inertp") why="Inertní plyn za <b>stálého tlaku</b> je něco úplně jiného: aby celkový tlak zůstal, musí objem vzrůst, a&nbsp;tím se reagující plyny <b>zředí</b>. Působí to jako snížení tlaku, takže při Δ<span class='q'>n</span>(g) = "+sgn(dn,0)+" se soustava posune "+(dn===0?"nikam":(dn>0?"doprava":"doleva"))+".";
  }
  $("#lcWhy").innerHTML='<span class="eyebrow">Proč</span><p>'+why+'</p>';
  $("#lcState").innerHTML='<span class="tag">'+(lcS.act?lcS.act.lab:"výchozí rovnováha")+'</span><span>V = '+fmt(lcS.V,2)+' dm³ · T = '+fmt(lcS.T,0)+' K</span>';
  $("#lcActions").innerHTML=lcACT.map(function(a,i){
    return '<button class="btn btn-sm" type="button" data-lc="'+i+'">'+a.lab+'</button>';
  }).join("");
  $$("#lcActions button").forEach(function(b){ b.addEventListener("click",function(){ lcDo(lcACT[+b.dataset.lc]); }); });
}
function initLC(){
  var sel=$("#lcRxn");
  sel.innerHTML=LCRXN.map(function(r,i){return '<option value="'+i+'">'+r.name+'</option>';}).join("");
  sel.addEventListener("change",function(){ lcS.i=+sel.value; lcReset(); });
  $("#lcReset").addEventListener("click",function(){ lcReset(); toast("Soustava vrácena do výchozí rovnováhy."); });
  lcReset();
}

/* ============================================================
   T14 · TRENAŽÉR — kam se rovnováha posune (k6)
   ============================================================ */
var shI=0, shScore=0, shAns=false;
function drawSH(){
  var it=SHIFT[shI];
  $("#shQn").textContent=shI+1; $("#shQtot").textContent=SHIFT.length; $("#shScore").textContent=shScore;
  $("#shRxn").innerHTML='<span class="chem" style="font-size:1.05rem">'+it.r+'</span>';
  $("#shCase").innerHTML=it.z;
  var ex=$("#shExplain"); ex.style.display="none"; ex.className="explain";
  $("#shNext").disabled=true; shAns=false;
  $$("#k6 [data-sh]").forEach(function(b){ b.disabled=false; b.style.opacity=""; });
}
function initSH(){
  $$("#k6 [data-sh]").forEach(function(b){
    b.addEventListener("click",function(){
      if(shAns) return; shAns=true;
      var it=SHIFT[shI], ok=b.dataset.sh===it.a;
      if(ok) shScore++;
      $("#shScore").textContent=shScore;
      var names={R:"→ doprava",L:"← doleva","0":"neposune se"};
      var ex=$("#shExplain");
      ex.className="explain"; ex.style.display="flex";
      ex.style.background=ok?"var(--ok-soft)":"var(--bad-soft)"; ex.style.borderColor=ok?"var(--ok)":"var(--bad)";
      ex.innerHTML='<span class="verdict" style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+(ok?"✓ Správně":"✕ Špatně — správně je „"+names[it.a]+"“")+'</span><span class="eyebrow">Proč</span><div>'+it.e+'</div>';
      $$("#k6 [data-sh]").forEach(function(x){ x.disabled=true; x.style.opacity=x.dataset.sh===it.a?"1":".5"; });
      $("#shNext").disabled = shI>=SHIFT.length-1;
      if(shI>=SHIFT.length-1){
        toast("Trenažér dokončen: "+shScore+" z "+SHIFT.length+" správně.");
        if(shScore>=15) markDone("k6");
      }
    });
  });
  $("#shNext").addEventListener("click",function(){ if(shI<SHIFT.length-1){ shI++; drawSH(); } });
  $("#shRestart").addEventListener("click",function(){ shI=0; shScore=0; drawSH(); });
  drawSH();
}

/* ============================================================
   T15 · TABULKA — průmyslové a biologické rovnováhy (k6)
   ============================================================ */
var indQ="", indF="all";
function drawIND(){
  var q=indQ.toLowerCase().trim();
  var rows=INDUSTRY.filter(function(x){
    if(indF==="bio" && x.g!=="bio") return false;
    if(indF==="exo" && !(x.dH!==null && x.dH<0)) return false;
    if(indF==="endo" && !(x.dH!==null && x.dH>0)) return false;
    if(!q) return true;
    return (x.n+" "+x.eq+" "+x.cond+" "+x.lc).toLowerCase().indexOf(q)>=0;
  });
  var h=rows.map(function(x){
    var col = x.dH===null ? "var(--ink-3)" : (x.dH<0?"var(--exo)":"var(--endo)");
    return '<tr><td><b>'+x.n+'</b>'+(x.g==="bio"?' <span class="tag endo">v těle</span>':'')+'</td>'+
      '<td class="chem" style="font-size:.9rem">'+x.eq+'</td>'+
      '<td class="n" style="color:'+col+';font-weight:600">'+(x.dH===null?"—":sgn(x.dH,x.dH%1?1:0))+'</td>'+
      '<td style="font-size:.85rem;color:var(--ink-2)">'+x.cond+'</td>'+
      '<td style="font-size:.85rem;line-height:1.5">'+x.lc+'</td></tr>';
  }).join("");
  if(!rows.length) h='<tr><td colspan="5" style="padding:1.1rem;color:var(--ink-3)">Nic nenalezeno. Zkuste „amoniak“, „tlak“, „pufr“ nebo „katalyzátor“.</td></tr>';
  $("#indBody").innerHTML=h;
  $$("#indFilter button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===indF); });
}
function initIND(){
  $("#indSearch").addEventListener("input",function(){ indQ=this.value; drawIND(); });
  $$("#indFilter button").forEach(function(b){ b.addEventListener("click",function(){ indF=b.dataset.v; drawIND(); }); });
  drawIND();
}
