/* ============================================================
   12 · TABULKA E° (k2)
   ============================================================ */
var etState={q:"",f:"all",sort:"desc"};
function drawETable(){
  var q=etState.q.toLowerCase().trim();
  var rows=ETAB.filter(function(e){
    if(etState.f!=="all" && e.g!==etState.f) return false;
    if(!q) return true;
    return (e.pair+" "+halfRed(e)+" "+e.n+" "+e.el).toLowerCase().indexOf(q)>=0;
  });
  rows=rows.slice().sort(function(a,b){ return etState.sort==="desc" ? b.E-a.E : a.E-b.E; });
  var Emin=-3.04, Emax=2.87, h="";
  rows.forEach(function(e){
    var pct=((e.E-Emin)/(Emax-Emin)*100).toFixed(1);
    var col = e.E>1.0?"var(--accent)":(e.E>0?"var(--exo)":(e.E>-1?"var(--cat2)":"var(--endo)"));
    h+='<tr><td class="mono" style="white-space:nowrap;font-weight:600">'+halfRed(e)+'</td>'+
       '<td class="n" style="font-weight:600;color:'+(e.E>=0?"var(--exo)":"var(--endo)")+'">'+sgn(e.E,2)+'</td>'+
       '<td><span style="display:block;height:9px;border-radius:99px;background:var(--surface-3);overflow:hidden">'+
       '<span style="display:block;height:100%;width:'+pct+'%;background:'+col+';border-radius:99px"></span></span></td>'+
       '<td style="font-size:.82rem;color:var(--ink-2);line-height:1.45">'+e.n+'</td></tr>';
  });
  if(!rows.length) h='<tr><td colspan="4" style="padding:1.1rem;color:var(--ink-3)">Nic nenalezeno. Zkuste „Cu“, „mangan“, „halogen“ nebo „koroze“.</td></tr>';
  $("#etBody").innerHTML=h;
  $$("#etFilter button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===etState.f); });
  $$("#etSort button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===etState.sort); });
}
function initETable(){
  $("#etSearch").addEventListener("input",function(){ etState.q=this.value; drawETable(); });
  $$("#etFilter button").forEach(function(b){ b.addEventListener("click",function(){ etState.f=b.dataset.v; drawETable(); }); });
  $$("#etSort button").forEach(function(b){ b.addEventListener("click",function(){ etState.sort=b.dataset.v; drawETable(); }); });
  drawETable();
}

/* ============================================================
   13 · BEKETOVOVA ŘADA (k3)
   ============================================================ */
var bkState={m:"Zn",mode:"salt",p:"Cu"};
var SUBD={"1":"","2":"₂","3":"₃"};
function bkChloride(m){ return m.s+"Cl"+SUBD[m.z]; }
function bkAcidEq(m){
  if(m.z===1) return "2 "+m.s+" + 2 HCl → 2 "+m.s+"Cl + H₂";
  if(m.z===2) return m.s+" + 2 HCl → "+bkChloride(m)+" + H₂";
  return "2 "+m.s+" + 6 HCl → 2 "+bkChloride(m)+" + 3 H₂";
}
function bkWaterEq(m){
  if(m.water==="cold"||m.water==="hot"){
    var hot=m.water==="hot"?"(horká)":"";
    if(m.z===1) return "2 "+m.s+" + 2 H₂O"+hot+" → 2 "+m.s+"OH + H₂";
    return m.s+" + 2 H₂O"+hot+" → "+m.s+"(OH)₂ + H₂";
  }
  var ST={Al:"2 Al + 3 H₂O(g) → Al₂O₃ + 3 H₂",Zn:"Zn + H₂O(g) → ZnO + H₂",Cr:"2 Cr + 3 H₂O(g) → Cr₂O₃ + 3 H₂",Fe:"3 Fe + 4 H₂O(g) → Fe₃O₄ + 4 H₂"};
  return ST[m.s]||"";
}
function bkSaltEq(m,p){
  var l=m.z*p.z/gcd(m.z,p.z), a=l/m.z, b=l/p.z;
  return (a>1?a+" ":"")+m.s+" + "+(b>1?b+" ":"")+p.ion+" → "+(a>1?a+" ":"")+m.ion+" + "+(b>1?b+" ":"")+p.s;
}
/* verdikt: {ok:bool, eq, text} */
function bkVerdict(m,mode,p){
  if(mode==="salt"){
    if(p.s===m.s) return {ok:false,eq:"—",text:"Stejný kov ve svém vlastním roztoku: ustálí se jen rovnováha "+m.s+" ⇌ "+m.ion+" + e⁻ — to je elektrodový potenciál, žádná reakce."};
    if(m.E<p.E) return {ok:true,eq:bkSaltEq(m,p),text:"<b>"+m.s+" je v řadě vlevo od "+p.s+"</b> (E° "+fmt(m.E,2)+" &lt; "+fmt(p.E,2)+" V), je silnější redukční činidlo a vytěsní ho z roztoku. ΔE° = "+fmt(p.E-m.E,2)+" V."+(p.s==="Cu"?" Na povrchu se objeví červenohnědá měď.":"")+(p.s==="Ag"?" Na povrchu narostou stříbrné krystalky.":"")};
    return {ok:false,eq:bkSaltEq(p,m)+" &nbsp;(běží opačně)",text:"<b>"+m.s+" je vpravo od "+p.s+"</b> (E° "+fmt(m.E,2)+" &gt; "+fmt(p.E,2)+" V) — ušlechtilejší kov neušlechtilejší nevytěsní. ΔE° = "+fmt(p.E-m.E,2)+" V &lt; 0. Samovolně by šla reakce opačná."};
  }
  if(mode==="acid"){
    if(m.s==="H") return {ok:false,eq:"—",text:"Vodík je dělicí čára řady."};
    if(!m.acid) return {ok:false,eq:"—",text:"<b>"+m.s+" je ušlechtilý</b> (E° = "+sgn(m.E,2)+" V &gt; 0): H⁺ je slabší oxidační činidlo než "+m.ion+", vodík se nevyvíjí. "+(m.s==="Cu"||m.s==="Ag"||m.s==="Hg"?"Rozpustí ho až oxidující kyselina — přepněte na HNO₃.":"Rozpustí ho jen lučavka královská.")};
    var t="<b>"+m.s+" je pod vodíkem</b> (E° = "+fmt(m.E,2)+" V &lt; 0), vytěsní ho: ΔE° = 0 − ("+fmt(m.E,2)+") = "+fmt(-m.E,2)+" V.";
    if(m.s==="Pb") t+=" <b>Ale pozor:</b> v praxi téměř nereaguje — povrch se hned pokryje nerozpustným PbCl₂.";
    if(m.s==="Al") t+=" Nejdřív se musí rozpustit pasivační vrstva Al₂O₃, pak reakce běží bouřlivě.";
    if(m.s==="Sn"||m.s==="Ni"||m.s==="Cd") t+=" Reakce je pomalá (malý rozdíl potenciálů, přepětí vodíku).";
    if(m.E<-2) t+=" Prakticky se to nedělá — kov reaguje už s vodou v kyselině, výbušně.";
    return {ok:true,eq:bkAcidEq(m),text:t};
  }
  if(mode==="water"){
    if(m.s==="H") return {ok:false,eq:"—",text:"Vodík je dělicí čára řady."};
    if(m.water==="cold") return {ok:true,eq:bkWaterEq(m),text:"<b>Reaguje už se studenou vodou</b> — patří k nejneušlechtilejším kovům (E° = "+fmt(m.E,2)+" V). Vzniká hydroxid a vodík; "+(m.s==="K"?"vodík se od tepla reakce vznítí.":(m.s==="Na"?"kulička sodíku pobíhá po hladině.":"reakce je mírnější než u sodíku."))};
    if(m.water==="hot") return {ok:true,eq:bkWaterEq(m),text:"Se studenou vodou jen velmi pomalu (vrstvička hydroxidu), <b>s horkou vodou ochotně</b>. Termodynamicky je reakce silně samovolná (E° = "+fmt(m.E,2)+" V), brzdí ji kinetika."};
    if(m.water==="steam") return {ok:true,eq:bkWaterEq(m),text:"Se studenou ani horkou vodou nereaguje, <b>s vodní párou za žáru ano</b> — vzniká oxid, ne hydroxid."+(m.s==="Al"?" Hliník navíc chrání pasivační vrstva Al₂O₃; bez ní by reagoval i za studena (amalgamovaný hliník to předvede).":"")+(m.s==="Fe"?" Železo s párou dává Fe₃O₄ — tak se historicky vyráběl vodík.":"")};
    return {ok:false,eq:"—",text:"<b>S vodou nereaguje</b>"+(m.E<0?" — je sice pod vodíkem, ale k reakci s neutrální vodou (E(H₂O/H₂) ≈ −0,41 V při pH 7) nemá dost velký rozdíl potenciálů ani rychlost.":" — je ušlechtilý, s vodou nemá důvod reagovat.")};
  }
  /* hno3 */
  if(m.s==="H") return {ok:false,eq:"—",text:"Vodík je dělicí čára řady."};
  if(m.s==="Pt"||m.s==="Au") return {ok:false,eq:"—",text:"<b>Nereaguje ani s HNO₃</b> — potenciál "+sgn(m.E,2)+" V je vyšší než potenciál dusičnanu (0,96 V). Rozpustí ho jen lučavka královská (HNO₃ + 3 HCl), kde chloridy stáhnou ionty do komplexu."};
  if(m.noble){
    var EQ={Cu:"3 Cu + 8 HNO₃(zř.) → 3 Cu(NO₃)₂ + 2 NO + 4 H₂O &nbsp;·&nbsp; Cu + 4 HNO₃(konc.) → Cu(NO₃)₂ + 2 NO₂ + 2 H₂O",Ag:"3 Ag + 4 HNO₃(zř.) → 3 AgNO₃ + NO + 2 H₂O",Hg:"3 Hg + 8 HNO₃(zř.) → 3 Hg(NO₃)₂ + 2 NO + 4 H₂O"};
    return {ok:true,eq:EQ[m.s],text:"<b>Rozpustí se, ale bez vodíku.</b> Oxidačním činidlem není H⁺ (0 V &lt; "+sgn(m.E,2)+" V), ale dusičnanový anion (NO₃⁻/NO: 0,96 V &gt; "+sgn(m.E,2)+" V). Zředěná kyselina dává bezbarvý NO (na vzduchu hnědne), koncentrovaná hnědý NO₂."};
  }
  if(m.passiv) return {ok:true,eq:"zředěná: reaguje (NO, NH₄⁺) · koncentrovaná: <b>pasivace</b>",text:"<b>Ve zředěné HNO₃ se rozpouští</b> (produktem je NO, u velmi zředěné až NH₄⁺; vodík prakticky ne). <b>V koncentrované HNO₃ se pasivuje</b> — pokryje se celistvou vrstvou oxidu a přestane reagovat. Proto se koncentrovaná HNO₃ přepravuje v "+(m.s==="Al"?"hliníkových":"ocelových")+" cisternách."};
  return {ok:true,eq:"reaguje — produkty NO, N₂O, N₂ nebo NH₄⁺ podle koncentrace",text:"<b>Reaguje</b>, ale oxidačním činidlem je dusičnan, ne H⁺ — vodík vzniká nanejvýš ve stopách. Čím neušlechtilejší kov a čím zředěnější kyselina, tím hlouběji se dusík redukuje (až na NH₄⁺)."};
}
function drawBek(){
  var m=B_(bkState.m), p=B_(bkState.p), mode=bkState.mode;
  $("#bkPartnerCtl").style.display = mode==="salt" ? "" : "none";
  $$("#bkMode button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===mode); });
  var W=760,H=170, x0=28, cw=(W-56)/BEK.length, y0=62, bh=46, s='';
  s+=txt(x0,22,"NEUŠLECHTILÉ · E° < 0 · silná redukční činidla",{size:10.5,w:600,fill:"var(--endo)",style:"letter-spacing:.08em"});
  s+=txt(W-28,22,"UŠLECHTILÉ · E° > 0",{anchor:"end",size:10.5,w:600,fill:"var(--exo)",style:"letter-spacing:.08em"});
  s+=hArrow(x0+250,x0+150,34,"var(--endo)","",true);
  s+=txt(x0+300,38,"roste ochota oxidovat se",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  s+=hArrow(W-x0-250,W-x0-150,34,"var(--exo)","",true);
  s+=txt(W-x0-300,38,"roste ochota redukovat se",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  BEK.forEach(function(b,i){
    var x=x0+i*cw, isH=b.s==="H";
    var col = isH?"var(--accent)":(b.E<0?"var(--endo)":"var(--exo)");
    var op = isH?1:Math.min(1,0.22+Math.abs(b.E)/3.2);
    s+='<rect x="'+(x+2)+'" y="'+y0+'" width="'+(cw-4)+'" height="'+bh+'" rx="6" style="fill:'+col+';fill-opacity:'+op.toFixed(2)+'"/>';
    var sel = b.s===m.s || (mode==="salt" && b.s===p.s);
    if(sel) s+='<rect x="'+(x+1)+'" y="'+(y0-1)+'" width="'+(cw-2)+'" height="'+(bh+2)+'" rx="7" style="fill:none;stroke:'+(b.s===m.s?"var(--ink)":"var(--accent)")+';stroke-width:'+(b.s===m.s?3:2)+';'+(b.s===m.s?"":"stroke-dasharray:4 3;")+'"/>';
    s+=txt(x+cw/2,y0+bh/2+5,b.s,{anchor:"middle",size:isH?15:14,w:700,fill:(op>0.55||isH)?"var(--accent-ink)":"var(--ink)"});
    s+=txt(x+cw/2,y0+bh+16,fmt(b.E,2),{anchor:"middle",size:9.5,fill:"var(--ink-3)",mono:true});
  });
  s+=txt(W/2,y0+bh+40,"E° [V] vůči standardní vodíkové elektrodě · vodík = dělicí čára řady",{anchor:"middle",size:11,fill:"var(--ink-3)"});
  var mi=BEK.indexOf(m), pi=BEK.indexOf(p);
  if(mode==="salt" && m.s!==p.s){
    var v=bkVerdict(m,mode,p);
    var xa=x0+mi*cw+cw/2, xb=x0+pi*cw+cw/2, yA=y0-6;
    s+=hArrow(xa,xb,yA,v.ok?"var(--ok)":"var(--bad)",v.ok?m.s+" vytěsní "+p.s:m.s+" nevytěsní "+p.s,true);
  } else if(mode!=="salt" && m.s!=="H"){
    var hi=BEK.indexOf(B_("H")), xh=x0+hi*cw+cw/2, xm=x0+mi*cw+cw/2;
    var v2=bkVerdict(m,mode,p);
    s+=hArrow(xm,xh,y0-6,v2.ok?"var(--ok)":"var(--bad)",mode==="acid"?(v2.ok?"vytěsní H₂":"H₂ ne"):(mode==="water"?(v2.ok?"reaguje":"nereaguje"):(v2.ok?"rozpouští se":"odolá")),true);
  }
  $("#bkWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Beketovova řada kovů"');
  var vv=bkVerdict(m,mode,p);
  var title = mode==="salt" ? m.s+" v roztoku soli "+p.s : (mode==="acid" ? m.s+" ve zředěné HCl" : (mode==="water" ? m.s+" ve vodě" : m.s+" v HNO₃"));
  $("#bkResult").innerHTML='<span class="eyebrow" style="color:'+(vv.ok?"var(--ok)":"var(--bad)")+'">'+title+' · '+(vv.ok?"reakce proběhne":"reakce neproběhne")+'</span>'+
    '<p class="eq" style="margin:.2rem 0;font-size:.92rem"><span class="chem">'+vv.eq+'</span></p><p style="font-size:.93rem">'+vv.text+'</p>';
}
/* trenažér */
var bkDrill={q:null,score:0,n:0,answered:false};
function bkNewDrill(){
  var modes=["salt","salt","acid","water"], mode=modes[Math.floor(Math.random()*modes.length)];
  var pool=BEK.filter(function(b){ return b.s!=="H" && !(mode==="acid"&&b.s==="Pb"); });
  var m=pool[Math.floor(Math.random()*pool.length)], p=null, ok, text;
  if(mode==="salt"){
    var pp=pool.filter(function(b){return b.s!==m.s;}); p=pp[Math.floor(Math.random()*pp.length)];
    ok = m.E<p.E; text=m.s+" + roztok soli "+p.s+" ("+p.ion+")";
  } else if(mode==="acid"){ ok=m.acid; text=m.s+" + zředěná HCl → vyvíjí se H₂?"; }
  else { ok=m.water==="cold"; text=m.s+" + studená voda → vyvíjí se H₂?"; }
  bkDrill.q={m:m,p:p,mode:mode,ok:ok}; bkDrill.answered=false;
  $("#bkDrillQ").textContent=text; $("#bkDrillA").innerHTML="";
}
function bkAnswer(yes){
  if(bkDrill.answered) return; bkDrill.answered=true;
  var q=bkDrill.q, ok = yes===q.ok; bkDrill.n++; if(ok) bkDrill.score++;
  $("#bkScore").textContent=bkDrill.score; $("#bkN").textContent=bkDrill.n;
  var why;
  if(q.mode==="salt") why=q.m.s+" ("+fmt(q.m.E,2)+" V) je "+(q.ok?"vlevo":"vpravo")+" od "+q.p.s+" ("+fmt(q.p.E,2)+" V).";
  else if(q.mode==="acid") why=q.m.s+" má E° = "+fmt(q.m.E,2)+" V, je "+(q.ok?"pod":"nad")+" vodíkem.";
  else why=q.ok?q.m.s+" patří k nejneušlechtilejším kovům (E° = "+fmt(q.m.E,2)+" V).":q.m.s+" se studenou vodou nereaguje"+(q.m.water==="steam"?" — až s párou.":(q.m.water==="hot"?" — až s horkou.":"."));
  $("#bkDrillA").innerHTML='<b style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+(ok?"✓ Správně.":"✕ Špatně — správně je „"+(q.ok?"ano":"ne")+"“.")+'</b> '+why;
  if(bkDrill.score>=8) markDone("k3");
  setTimeout(bkNewDrill,2600);
}
function initBek(){
  var opts=BEK.filter(function(b){return b.s!=="H";}).map(function(b){ return '<option value="'+b.s+'">'+b.s+' &nbsp;('+fmt(b.E,2)+' V)</option>'; }).join("");
  $("#bkMetal").innerHTML=opts; $("#bkPartner").innerHTML=opts;
  $("#bkMetal").value=bkState.m; $("#bkPartner").value=bkState.p;
  $("#bkMetal").addEventListener("change",function(){ bkState.m=this.value; drawBek(); });
  $("#bkPartner").addEventListener("change",function(){ bkState.p=this.value; drawBek(); });
  $$("#bkMode button").forEach(function(b){ b.addEventListener("click",function(){ bkState.mode=b.dataset.v; drawBek(); }); });
  $("#bkYes").addEventListener("click",function(){ bkAnswer(true); });
  $("#bkNo").addEventListener("click",function(){ bkAnswer(false); });
  drawBek(); bkNewDrill();
}

/* ============================================================
   14 · PŘEDPOVĚĎ Z E° (k3)
   ============================================================ */
var prState={ox:"Ag",red:"Cu"};
function drawPredict(){
  var ox=E_(prState.ox), red=E_(prState.red);
  function ro(id,k,v,h,cls){ var e=$(id); e.className="readout "+(cls||""); e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  if(ox.id===red.id){
    $("#prEq").innerHTML='<span style="color:var(--ink-3)">Vybrali jste oxidovanou i redukovanou formu téhož páru — to je rovnováha jedné elektrody, ne reakce.</span>';
    ro("#prRo1","ΔE°","0 V","",""); ro("#prRo2","ΔG°","0","",""); ro("#prRo3","K","1","","");
    $("#prNote").innerHTML="Vyberte dva různé páry.";
    return;
  }
  var dE=ox.E-red.E, ce=cellEq(ox,red), z=ce.z, dG=-z*FCONST*dE/1000, logK=z*dE/NERNST, ok=dE>0;
  $("#prEq").innerHTML='<span class="chem">'+ce.eq+'</span> &nbsp;&nbsp;<span class="tag '+(ok?"ok":"bad")+'">'+(ok?"samovolná":"nesamovolná — samovolná je opačná")+'</span>';
  ro("#prRo1","ΔE° = E°(ox.) − E°(red.)",sgn(dE,2)+" V",sgn(ox.E,2)+" − ("+sgn(red.E,2)+")",ok?"pos":"neg");
  ro("#prRo2","ΔG° = −zFE°",sgn(dG,0)+" kJ·mol⁻¹","z = "+z,ok?"pos":"neg");
  ro("#prRo3","K = 10^(zE°/0,0592)",fmtK(logK),"log K = "+fmt(logK,1),"");
  var note;
  if(ok && dE>0.5) note="Velký kladný rozdíl: reakce běží prakticky kvantitativně (K obrovské). Ve zkumavce ji uvidíte — pokud ji nebrzdí kinetika (pasivace, přepětí).";
  else if(ok) note="Kladný, ale malý rozdíl: reakce je samovolná, jenže K je „lidské“ číslo a koncentrace ji mohou podle Nernstovy rovnice obrátit (kapitola 4).";
  else if(dE>-0.3) note="Záporný, ale malý rozdíl: za standardních podmínek reakce neběží, ale stačí změnit koncentrace nebo pH a může se otočit.";
  else note="Výrazně záporný rozdíl: tímto směrem reakce nepůjde za žádných rozumných podmínek. Samovolná je opačná reakce — přehoďte role oxidačního a redukčního činidla.";
  $("#prNote").innerHTML="<b>"+sideStr(ox.L)+"</b> má být oxidační činidlo (E° "+sgn(ox.E,2)+" V), <b>"+sideStr(red.R)+"</b> redukční činidlo (E° "+sgn(red.E,2)+" V). "+note;
}
function initPredict(){
  var oxOpts=ETAB.map(function(e){ return '<option value="'+e.id+'">'+sideStr(e.L)+' &nbsp;·&nbsp; '+e.pair+' ('+sgn(e.E,2)+' V)</option>'; }).join("");
  var redOpts=ETAB.map(function(e){ return '<option value="'+e.id+'">'+sideStr(e.R)+' &nbsp;·&nbsp; '+e.pair+' ('+sgn(e.E,2)+' V)</option>'; }).join("");
  $("#prOx").innerHTML=oxOpts; $("#prRed").innerHTML=redOpts;
  $("#prOx").value=prState.ox; $("#prRed").value=prState.red;
  $("#prOx").addEventListener("change",function(){ prState.ox=this.value; drawPredict(); });
  $("#prRed").addEventListener("change",function(){ prState.red=this.value; drawPredict(); });
  $$("#prPresets button").forEach(function(b){
    b.addEventListener("click",function(){
      prState.ox=b.dataset.ox; prState.red=b.dataset.red;
      $("#prOx").value=prState.ox; $("#prRed").value=prState.red;
      $$("#prPresets button").forEach(function(x){ x.setAttribute("aria-pressed", x===b); });
      drawPredict();
    });
  });
  drawPredict();
}
