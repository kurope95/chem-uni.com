/* ============================================================
   2 · SPOLEČNÍ POMOCNÍCI PRO KRESLENÍ
   ============================================================ */

/* vodorovná šipka s popiskem */
function hArrow(x1,x2,y,color,label,above){
  var s=line(x1,y,x2,y,{c:color,w:2.2,cap:"round"});
  var d=x2>x1?1:-1;
  s+='<path d="M'+x2+' '+y+' l'+(-7*d)+' -4.5 l0 9 z" style="fill:'+color+'"/>';
  if(label) s+=txt((x1+x2)/2,y+(above?-7:16),label,{anchor:"middle",size:11.5,w:600,fill:color});
  return s;
}
/* kroužek s popiskem uvnitř — atom */
function atom(cx,cy,r,label,fill,ink,size){
  var s='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" style="fill:'+fill+';stroke:var(--line-strong);stroke-width:1.4"/>';
  s+=txt(cx,cy+(size||13)*0.36,label,{anchor:"middle",size:size||13,w:700,fill:ink||"var(--accent-ink)"});
  return s;
}
/* volný elektronový pár jako dvě tečky */
function lonePair(cx,cy,ang,color,dist){
  var d=dist||14, rad=ang*Math.PI/180, s='';
  var px=cx+Math.cos(rad)*d, py=cy+Math.sin(rad)*d;
  var ox=-Math.sin(rad)*3.4, oy=Math.cos(rad)*3.4;
  s+='<circle cx="'+(px+ox).toFixed(1)+'" cy="'+(py+oy).toFixed(1)+'" r="2.1" style="fill:'+(color||"var(--ink-2)")+'"/>';
  s+='<circle cx="'+(px-ox).toFixed(1)+'" cy="'+(py-oy).toFixed(1)+'" r="2.1" style="fill:'+(color||"var(--ink-2)")+'"/>';
  return s;
}
/* pevný počet desetinných míst s českou čárkou (fmt() nuly odřezává) */
function fixed(n,d){
  if(n===null||n===undefined||isNaN(n)) return "—";
  return (n<0?"−":"")+Math.abs(n).toFixed(d===undefined?1:d).replace(".",",");
}
/* jednoduchý sloupcový graf; data = [{lbl,val,col,hi}] */
function barChart(o){
  /* o: {x,y,w,h,data,unit,dec,title} */
  var d=o.data, n=d.length, s='';
  var vals=d.map(function(e){return e.val;});
  var dmax=Math.max.apply(null,vals), dmin=Math.min.apply(null,vals);
  var vmax=dmax<0?0:dmax, vmin=dmin>0?0:dmin;
  var pad=(vmax-vmin)*0.12||1;
  if(dmax>0) vmax+=pad;
  if(dmin<0) vmin-=pad;
  var span=vmax-vmin;
  function ypx(v){ return o.y+o.h-(v-vmin)/span*o.h; }
  var y0=ypx(0);
  /* osa a mřížka */
  var steps=4;
  for(var i=0;i<=steps;i++){
    var v=vmin+span*i/steps, yy=ypx(v);
    s+=line(o.x,yy,o.x+o.w,yy,{c:"var(--grid)",w:1});
    s+=txt(o.x-7,yy+4,fixed(v,o.dec),{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true});
  }
  s+=line(o.x,y0,o.x+o.w,y0,{c:"var(--line-strong)",w:1.6});
  var bw=o.w/n*0.56, gap=o.w/n;
  d.forEach(function(e,i){
    var cx=o.x+gap*(i+0.5), yv=ypx(e.val);
    var top=Math.min(yv,y0), hh=Math.abs(yv-y0);
    s+=rect(cx-bw/2,top,bw,hh,{fill:e.col,r:3,style:e.hi?"":"fill-opacity:.55"});
    if(e.hi) s+=rect(cx-bw/2,top,bw,hh,{fill:"none",r:3,stroke:"var(--accent)",sw:2.4});
    s+=txt(cx,o.y+o.h+16,e.lbl,{anchor:"middle",size:12,w:e.hi?700:600,fill:e.hi?"var(--accent)":"var(--ink-2)"});
    s+=txt(cx,e.val>=0?top-6:top+hh+13,fixed(e.val,o.dec),{anchor:"middle",size:10.5,w:600,fill:"var(--ink-2)",mono:true});
  });
  if(o.title) s+=txt(o.x,o.y-12,o.title,{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  if(o.unit) s+=txt(o.x+o.w,o.y-12,o.unit,{anchor:"end",size:11,fill:"var(--ink-3)",mono:true});
  return s;
}
/* spojnicový graf; pts = [[x,y],…] v datových jednotkách */
function polyLine(pts,fx,fy,color,width,dash){
  var d=pts.map(function(p,i){ return (i?"L":"M")+fx(p[0]).toFixed(1)+" "+fy(p[1]).toFixed(1); }).join(" ");
  return '<path d="'+d+'" style="fill:none;stroke:'+color+';stroke-width:'+(width||2.2)+';stroke-linejoin:round;stroke-linecap:round;'+(dash?"stroke-dasharray:"+dash+";":"")+'"/>';
}
function ro(id,k,v,h,cls){
  var e=$(id); if(!e) return;
  e.className="readout "+(cls||"");
  e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>';
}
function say(id,html,tone){
  var e=$(id); if(!e) return;
  e.style.display="flex";
  e.style.background = tone==="ok" ? "var(--ok-soft)" : (tone==="bad" ? "var(--bad-soft)" : "var(--surface-2)");
  e.style.borderColor = tone==="ok" ? "var(--ok)" : (tone==="bad" ? "var(--bad)" : "var(--line)");
  e.innerHTML='<span class="eyebrow">Co z toho plyne</span><div>'+html+'</div>';
}
function segSet(sel,val){
  $$(sel+" button").forEach(function(b){ b.setAttribute("aria-pressed", String(b.dataset.v===val)); });
}

/* ============================================================
   3 · HERO — PRŮZKUMNÍK SKUPINY 16
   ============================================================ */
var gxState={el:"O", q:"EN"};
function trendByKey(k){ for(var i=0;i<TRENDS.length;i++) if(TRENDS[i].k===k) return TRENDS[i]; return TRENDS[0]; }
function charColor(e){
  if(e.s==="O"||e.s==="S") return "var(--exo)";
  if(e.s==="Po") return "var(--endo)";
  return "var(--cat3)";
}
function drawGroup(){
  var e=el16(gxState.el), T=trendByKey(gxState.q);
  var W=790,H=330,s="";
  /* levá karta prvku */
  s+=rect(14,18,236,294,{fill:"var(--surface-2)",r:14,stroke:"var(--line)",sw:1.4});
  s+=rect(14,18,236,64,{fill:"var(--accent-soft)",r:14});
  s+=rect(14,66,236,16,{fill:"var(--accent-soft)"});
  s+=txt(36,62,e.s,{size:38,w:800,fill:"var(--accent)"});
  s+=txt(104,44,String(e.Z),{size:14,w:700,fill:"var(--ink-2)",mono:true});
  s+=txt(104,62,"Z",{size:11,fill:"var(--ink-3)"});
  s+=txt(232,44,e.n,{anchor:"end",size:15,w:700,fill:"var(--ink)"});
  s+=txt(232,62,e.char,{anchor:"end",size:11,fill:"var(--ink-3)"});
  var rows=[
    ["konfigurace", e.cfg],
    ["ox. čísla", e.ox],
    ["elektronegativita", fixed(e.EN,2)],
    ["kovalentní poloměr", fixed(e.r,0)+" pm"],
    ["teplota tání", fixed(e.tt,1)+" °C"],
    ["teplota varu", fixed(e.tv,1)+" °C"],
    ["ionizační energie", fixed(e.I1,1)+" kJ·mol⁻¹"],
    ["forma prvku", e.form]
  ];
  rows.forEach(function(r,i){
    var y=104+i*26;
    var vs = r[1].length>24 ? 9.5 : (r[1].length>19 ? 10.5 : 11.5);
    s+=txt(32,y,r[0],{size:10.5,fill:"var(--ink-3)",style:"letter-spacing:.05em"});
    s+=txt(232,y,r[1],{anchor:"end",size:vs,w:600,fill:"var(--ink)",mono:(i>=2&&i<=6)});
    if(i<rows.length-1) s+=line(32,y+7,232,y+7,{c:"var(--grid)",w:1});
  });
  /* pravý graf */
  var data=CH16.map(function(x){
    return {lbl:x.s, val:T.get(x), col:charColor(x), hi:x.s===e.s};
  });
  s+=barChart({x:322,y:52,w:440,h:212,data:data,unit:T.unit,dec:T.d,title:T.lbl.toUpperCase()});
  return svg("0 0 "+W+" "+H,s,'aria-label="Karta prvku a graf trendu ve skupině 16"');
}
function refreshGroup(){
  var e=el16(gxState.el), T=trendByKey(gxState.q);
  $("#gxWrap").innerHTML=drawGroup();
  var vO=T.get(CH16[0]), vPo=T.get(CH16[4]);
  ro("#gxRo1","Elektronegativita",fixed(e.EN,2),"kyslík 3,44 → polonium 2,00", e.EN>2.9?"pos":"");
  ro("#gxRo2","Kovalentní poloměr",fixed(e.r,0)+" pm","roste dolů skupinou","");
  ro("#gxRo3",T.lbl,fixed(T.get(e),T.d)+(T.unit?" "+T.unit:""),"O: "+fixed(vO,T.d)+" · Po: "+fixed(vPo,T.d),"");
  $("#gxCfg").innerHTML='<b>'+e.n+'</b> · konfigurace valenční sféry <span class="chem">'+e.cfg+'</span> · '+
    'oxidační čísla <b>'+e.ox+'</b> · v&nbsp;elementárním stavu <span class="chem">'+e.form+'</span>';
  $("#gxNote").innerHTML=e.note+" <span style=\"color:var(--ink-3)\">Přepněte veličinu v&nbsp;grafu a&nbsp;porovnejte, které trendy jdou plynule a&nbsp;u&nbsp;kterých kyslík nebo polonium vyčnívá.</span>";
  segSet("#gxSeg",gxState.el);
}
function initGroup(){
  $("#gxQ").innerHTML=TRENDS.map(function(t){ return '<option value="'+t.k+'">'+t.lbl+(t.unit?" ["+t.unit+"]":"")+'</option>'; }).join("");
  $("#gxQ").value=gxState.q;
  $("#gxQ").addEventListener("change",function(){ gxState.q=this.value; refreshGroup(); });
  $$("#gxSeg button").forEach(function(b){
    b.addEventListener("click",function(){ gxState.el=b.dataset.v; refreshGroup(); });
  });
  refreshGroup();
}

/* ============================================================
   4 · K0 — SROVNÁVAČ CHALKOGENOVODÍKŮ
   ============================================================ */
var hyState={q:"tv"};
function hyQ(){ for(var i=0;i<HYDQ.length;i++) if(HYDQ[i].k===hyState.q) return HYDQ[i]; return HYDQ[0]; }
function drawHyd(){
  var Q=hyQ(), W=790, H=290, s="";
  var data=HYD.map(function(h){ return {lbl:h.f, val:Q.get(h), col:h.col, hi:h.f==="H₂O"}; });
  s+=barChart({x:70,y:44,w:660,h:196,data:data,unit:Q.unit,dec:Q.d,title:Q.lbl.toUpperCase()});
  if(Q.k==="tv"){
    s+=txt(70,272,"Trojice H₂S – H₂Se – H₂Te leží skoro na přímce; voda by podle ní měla vřít kolem −70 °C. Vodíkové vazby ji vytáhly o víc než 170 °C nahoru.",{size:11.5,fill:"var(--ink-2)"});
  }
  return svg("0 0 "+W+" "+H,s,'aria-label="Graf vlastností chalkogenovodíků"');
}
function refreshHyd(){
  $("#hyWrap").innerHTML=drawHyd();
  say("#hySay",hyQ().say);
  segSet("#hySeg",hyState.q);
}
function initHyd(){
  $$("#hySeg button").forEach(function(b){
    b.addEventListener("click",function(){ hyState.q=b.dataset.v; refreshHyd(); });
  });
  refreshHyd();
}

/* ============================================================
   5 · K1 — PRŮZKUMNÍK OXIDAČNÍCH ČÍSEL KYSLÍKU
   ============================================================ */
var oxState={id:"H2O"};
function oxItem(){ for(var i=0;i<OXO.length;i++) if(OXO[i].id===oxState.id) return OXO[i]; return OXO[0]; }
var OXCOL={"prvek":"var(--cat1)","oxid":"var(--endo)","peroxid":"var(--cat3)","superoxid":"var(--cat4)","ozonid":"var(--warn)","fluorid":"var(--exo)"};
function drawOxo(){
  var it=oxItem(), W=780, H=210, s="";
  var col=OXCOL[it.kind]||"var(--accent)";
  var cx=W/2, cy=104;
  s+=txt(18,26,("STRUKTURNÍ MOTIV · "+it.kind).toUpperCase(),{size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.12em"});
  function O(x,y,lbl){ return atom(x,y,20,lbl||"O",col,"var(--accent-ink)",15); }
  function small(x,y,lbl,c){ return atom(x,y,15,lbl,c||"var(--surface-3)","var(--ink)",12); }
  if(it.id==="O2"){
    s+=line(cx-40,cy,cx+40,cy,{c:"var(--ink-2)",w:2.6});
    s+=line(cx-40,cy-6,cx+40,cy-6,{c:"var(--ink-2)",w:2.6});
    s+=line(cx-40,cy+6,cx+40,cy+6,{c:"var(--ink-2)",w:2.6});
    s+=O(cx-40,cy); s+=O(cx+40,cy);
    s+=lonePair(cx-40,cy,150,"var(--ink-2)",30); s+=lonePair(cx-40,cy,210,"var(--ink-2)",30);
    s+=lonePair(cx+40,cy,-30,"var(--ink-2)",30); s+=lonePair(cx+40,cy,30,"var(--ink-2)",30);
    s+=txt(cx,cy+56,"dvojná vazba, 121 pm — ale MO teorie navíc říká, že jsou dva nepárové elektrony",{anchor:"middle",size:11.5,fill:"var(--ink-2)"});
  } else if(it.id==="O3"){
    var ax=cx-72, bx=cx+72, ay=cy+30, by=cy-34;
    s+=line(ax,ay,cx,by,{c:"var(--ink-2)",w:2.6}); s+=line(bx,ay,cx,by,{c:"var(--ink-2)",w:2.6});
    s+=line(ax+6,ay-9,cx+2,by+8,{c:"var(--accent)",w:2,dash:"4 3"});
    s+=line(bx-6,ay-9,cx-2,by+8,{c:"var(--accent)",w:2,dash:"4 3"});
    s+=O(ax,ay); s+=O(cx,by); s+=O(bx,ay);
    s+=txt(cx,by-32,"116,8°",{anchor:"middle",size:12,w:700,fill:"var(--accent)",mono:true});
    s+=txt(cx,cy+80,"obě vazby stejně dlouhé (127,8 pm) — jeden pár π je delokalizovaný přes tři atomy",{anchor:"middle",size:11.5,fill:"var(--ink-2)"});
  } else if(it.id==="H2O"){
    var hx=52, hy=40;
    s+=line(cx,cy,cx-hx,cy+hy,{c:"var(--ink-2)",w:2.4}); s+=line(cx,cy,cx+hx,cy+hy,{c:"var(--ink-2)",w:2.4});
    s+=O(cx,cy); s+=small(cx-hx,cy+hy,"H"); s+=small(cx+hx,cy+hy,"H");
    s+=lonePair(cx,cy,250,"var(--ink-2)",30); s+=lonePair(cx,cy,290,"var(--ink-2)",30);
    s+=txt(cx,cy-42,"104,5°",{anchor:"middle",size:12,w:700,fill:"var(--accent)",mono:true});
    s+=txt(cx,cy+86,"dvě vazby σ a dva volné páry — odtud koordinační i vodíkové vazby",{anchor:"middle",size:11.5,fill:"var(--ink-2)"});
  } else if(it.id==="CaO"){
    s+=rect(cx-140,cy-40,120,80,{fill:"var(--endo-soft)",r:10,stroke:"var(--line-strong)",sw:1.4});
    s+=rect(cx+20,cy-40,120,80,{fill:"var(--exo-soft)",r:10,stroke:"var(--line-strong)",sw:1.4});
    s+=txt(cx-80,cy+6,"Ca²⁺",{anchor:"middle",size:22,w:700,fill:"var(--endo)"});
    s+=txt(cx+80,cy+6,"O²⁻",{anchor:"middle",size:22,w:700,fill:"var(--exo)"});
    s+=hArrow(cx-16,cx+16,cy,"var(--accent)","2 e⁻",true);
    s+=txt(cx,cy+68,"iontová mřížka — kyslík elektrony opravdu převzal, ne jen přitáhl",{anchor:"middle",size:11.5,fill:"var(--ink-2)"});
  } else if(it.id==="H2O2"){
    var lx=cx-42, rx=cx+42;
    s+=line(lx,cy,rx,cy,{c:"var(--accent)",w:3.2});
    s+=line(lx,cy,lx-30,cy-48,{c:"var(--ink-2)",w:2.4}); s+=line(rx,cy,rx+30,cy+48,{c:"var(--ink-2)",w:2.4});
    s+=O(lx,cy); s+=O(rx,cy); s+=small(lx-30,cy-48,"H"); s+=small(rx+30,cy+48,"H");
    s+=txt(cx,cy-24,"peroxidový můstek O–O · 147 pm",{anchor:"middle",size:11.5,w:600,fill:"var(--accent)"});
    s+=txt(cx,cy+78,"molekula není rovinná — vodíky míří na opačné strany, jako pootevřená kniha",{anchor:"middle",size:11.5,fill:"var(--ink-2)"});
  } else if(it.id==="KO2"||it.id==="KO3"){
    var three=it.id==="KO3";
    s+=rect(cx-190,cy-30,86,60,{fill:"var(--endo-soft)",r:10,stroke:"var(--line-strong)",sw:1.4});
    s+=txt(cx-147,cy+8,"K⁺",{anchor:"middle",size:22,w:700,fill:"var(--endo)"});
    var bx0=cx-46;
    s+=rect(bx0-24,cy-46,three?188:150,92,{fill:"var(--surface-2)",r:12,stroke:col,sw:1.8});
    if(three){
      s+=line(bx0+6,cy+16,bx0+52,cy-16,{c:"var(--ink-2)",w:2.4}); s+=line(bx0+98,cy+16,bx0+52,cy-16,{c:"var(--ink-2)",w:2.4});
      s+=O(bx0+6,cy+16); s+=O(bx0+52,cy-16); s+=O(bx0+98,cy+16);
      s+=txt(bx0+142,cy+4,"⁻",{size:20,w:700,fill:col});
    } else {
      s+=line(bx0+18,cy,bx0+84,cy,{c:"var(--ink-2)",w:2.8});
      s+=O(bx0+18,cy); s+=O(bx0+84,cy);
      s+=txt(bx0+114,cy+4,"⁻",{size:20,w:700,fill:col});
    }
    s+=txt(cx,cy+72,three?"anion O₃⁻ — jeden záporný náboj na tři rovnocenné atomy":"anion O₂⁻ — jeden záporný náboj na dva rovnocenné atomy",{anchor:"middle",size:11.5,fill:"var(--ink-2)"});
  } else if(it.id==="OF2"){
    var fx=54, fy=40;
    s+=line(cx,cy,cx-fx,cy+fy,{c:"var(--ink-2)",w:2.4}); s+=line(cx,cy,cx+fx,cy+fy,{c:"var(--ink-2)",w:2.4});
    s+=O(cx,cy); s+=small(cx-fx,cy+fy,"F","var(--exo-soft)"); s+=small(cx+fx,cy+fy,"F","var(--exo-soft)");
    s+=lonePair(cx,cy,250,"var(--ink-2)",30); s+=lonePair(cx,cy,290,"var(--ink-2)",30);
    s+=txt(cx,cy-42,"103,3°",{anchor:"middle",size:12,w:700,fill:"var(--accent)",mono:true});
    s+=hArrow(cx-14,cx-fx+16,cy+fy-16,"var(--exo)","e⁻",true);
    s+=hArrow(cx+14,cx+fx-16,cy+fy-16,"var(--exo)","e⁻",true);
    s+=txt(cx,cy+86,"fluor (EN 3,98) přetáhne elektrony od kyslíku (3,44) — proto je kyslík kladný",{anchor:"middle",size:11.5,fill:"var(--ink-2)"});
  } else if(it.id==="O2F2"){
    var l2=cx-30, r2=cx+30;
    s+=line(l2,cy,r2,cy,{c:"var(--accent)",w:3.2});
    s+=line(l2,cy,l2-32,cy-48,{c:"var(--ink-2)",w:2.4}); s+=line(r2,cy,r2+32,cy+48,{c:"var(--ink-2)",w:2.4});
    s+=O(l2,cy); s+=O(r2,cy); s+=small(l2-32,cy-48,"F","var(--exo-soft)"); s+=small(r2+32,cy+48,"F","var(--exo-soft)");
    s+=txt(cx,cy-24,"vazba O–O jen 122 pm — kratší než v H₂O₂!",{anchor:"middle",size:11.5,w:600,fill:"var(--accent)"});
    s+=txt(cx,cy+80,"peroxidový můstek i fluor najednou — oba vlivy se sečtou na +I",{anchor:"middle",size:11.5,fill:"var(--ink-2)"});
  }
  return svg("0 0 "+W+" "+H,s,'aria-label="Struktura sloučeniny kyslíku"');
}
function refreshOxo(){
  var it=oxItem();
  $("#oxWrap").innerHTML=drawOxo();
  ro("#oxRo1","Oxidační číslo kyslíku",it.ox,"typ: "+it.kind, it.ox.indexOf("+")===0?"pos":"neg");
  ro("#oxRo2","Vazebné parametry",it.bond,"z rentgenové a spektroskopické analýzy","");
  ro("#oxRo3","Sloučenina",it.f,it.nm,"");
  $("#oxCalc").innerHTML="<b>Výpočet:</b> "+it.calc;
  say("#oxSay",it.say);
}
function initOxo(){
  $("#oxSel").innerHTML=OXO.map(function(o){ return '<option value="'+o.id+'">'+o.f+' — '+o.nm+' ('+o.ox+')</option>'; }).join("");
  $("#oxSel").value=oxState.id;
  $("#oxSel").addEventListener("change",function(){ oxState.id=this.value; refreshOxo(); });
  refreshOxo();
}

/* ============================================================
   6 · K1 — TRENAŽÉR OXIDAČNÍCH ČÍSEL
   ============================================================ */
var trI=0, trScore=0, trAns=false;
function drawTrn(){
  var it=TRN[trI];
  $("#trQn").textContent=trI+1; $("#trQtot").textContent=TRN.length; $("#trScore").textContent=trScore;
  $("#trTask").innerHTML='Jaké oxidační číslo má <b style="color:var(--accent)">'+it.at+'</b> v&nbsp;<span class="chem" style="font-size:1.3rem">'+it.f+'</span>?';
  $("#trOpts").innerHTML=it.o.map(function(o,i){ return '<button class="btn" type="button" data-oi="'+i+'" style="font-family:var(--f-mono);font-size:.98rem;white-space:normal;line-height:1.3">'+o+'</button>'; }).join("");
  var ex=$("#trExplain"); ex.style.display="none"; ex.className="explain";
  $("#trNext").disabled=true; trAns=false;
  $$("#trOpts button").forEach(function(b){
    b.addEventListener("click",function(){
      if(trAns) return; trAns=true;
      var ok=+b.dataset.oi===it.c; if(ok) trScore++;
      $("#trScore").textContent=trScore;
      ex.style.display="flex"; ex.style.background=ok?"var(--ok-soft)":"var(--bad-soft)"; ex.style.borderColor=ok?"var(--ok)":"var(--bad)";
      ex.innerHTML='<span class="verdict" style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+(ok?"✓ Správně":"✕ Špatně — správně je "+it.o[it.c])+'</span><span class="eyebrow">Proč</span><div>'+it.e+'</div>';
      $$("#trOpts button").forEach(function(x){ x.disabled=true; x.style.opacity=+x.dataset.oi===it.c?"1":".45"; if(+x.dataset.oi===it.c){ x.style.borderColor="var(--ok)"; x.style.color="var(--ok)"; } });
      $("#trNext").disabled = trI>=TRN.length-1;
      if(trI>=TRN.length-1){ toast("Trenažér dokončen: "+trScore+" z "+TRN.length+" správně."); if(trScore>=12) markDone("k1"); }
    });
  });
}
function initTrn(){
  $("#trNext").addEventListener("click",function(){ if(trI<TRN.length-1){ trI++; drawTrn(); } });
  $("#trReset").addEventListener("click",function(){ trI=0; trScore=0; drawTrn(); });
  drawTrn();
}
