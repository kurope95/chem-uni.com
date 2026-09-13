/* ============================================================
   20 · SPOLEČNÉ POMOCNÍKY WIDGETŮ + HERO (koncentrace v čase)
   ============================================================ */
var SUPS = {"0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹","-":"⁻"};
function sup(n){ return String(n).split("").map(function(ch){ return SUPS[ch]||ch; }).join(""); }
/* vědecký zápis s českou čárkou: 2,3·10⁻⁴ ; malá čísla nechá běžně */
function sci(x,d){
  if(x===0) return "0";
  if(x===null||x===undefined||isNaN(x)) return "—";
  var ax=Math.abs(x), e=Math.floor(Math.log10(ax));
  if(e>=-2 && e<=3) return fmt(x, d===undefined ? Math.max(0,2-e) : d);
  var m=x/Math.pow(10,e);
  if(d===undefined) d=1;
  var ms=fmt(m,d);
  if(ms==="10"||ms==="−10"){ e+=1; m=m/10; ms=fmt(m,d); }
  return ms+"·10"+sup(e);
}
/* jednotka rychlostní konstanty podle celkového řádu */
function kUnit(n){
  if(n===0) return "mol·dm⁻³·s⁻¹";
  if(n===1) return "s⁻¹";
  if(n===2) return "dm³·mol⁻¹·s⁻¹";
  return "dm"+sup(3*(n-1))+"·mol"+sup(-(n-1))+"·s⁻¹";
}
/* osy grafu */
function gAxes(o){
  var s='';
  s+=line(o.L,o.T-6,o.L,o.B,{c:"var(--line-strong)",w:1.5});
  s+=line(o.L,o.B,o.R+10,o.B,{c:"var(--line-strong)",w:1.5});
  s+='<path d="M'+o.L+' '+(o.T-12)+' l-4 8 l8 0 z" style="fill:var(--line-strong)"/>';
  s+='<path d="M'+(o.R+16)+' '+o.B+' l-8 -4 l0 8 z" style="fill:var(--line-strong)"/>';
  var yx = o.yx!==undefined ? o.yx : o.L-40;
  if(o.yl) s+=txt(yx,(o.T+o.B)/2,o.yl,{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",
      style:"transform:rotate(-90deg);transform-origin:"+yx+"px "+((o.T+o.B)/2)+"px;letter-spacing:.08em;text-transform:uppercase"});
  if(o.xl) s+=txt((o.L+o.R)/2,o.B+(o.xly||32),o.xl,{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em;text-transform:uppercase"});
  return s;
}
/* dlaždice readout */
function setRo(id,k,v,h,cls){
  var e=$(id); if(!e) return;
  e.className="readout"+(cls?" "+cls:"");
  e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>';
}
function pressGroup(sel,val){
  $$(sel+" button").forEach(function(b){ b.setAttribute("aria-pressed", String(b.dataset.v)===String(val)); });
}

/* ---- kinetika A → P podle řádu ---- */
function cOf(order,k,c0,t){
  if(order===0) return Math.max(0,c0-k*t);
  if(order===1) return c0*Math.exp(-k*t);
  return c0/(1+k*c0*t);
}
function vOf(order,k,c){
  if(order===0) return c>0?k:0;
  if(order===1) return k*c;
  return k*c*c;
}
function tHalf(order,k,c0){
  if(order===0) return c0/(2*k);
  if(order===1) return Math.LN2/k;
  return 1/(k*c0);
}

/* ============================================================
   HERO — koncentrace reaktantu a produktu v čase, tečna a sečna
   ============================================================ */
var heroState={order:1,k:0.20,c0:1.0,t:3.0};
function drawHero(){
  var st=heroState, W=760,H=330,L=66,R=712,T=28,B=270, TMAX=20;
  var ymax=st.c0*1.06;
  var x=function(t){ return L+(t/TMAX)*(R-L); };
  var y=function(c){ return B-(c/ymax)*(B-T); };
  var s='';
  /* mřížka */
  for(var i=0;i<=4;i++){
    var tt=i*5, xx=x(tt);
    s+=line(xx,T,xx,B,{c:"var(--line)",w:1});
    s+=txt(xx,B+16,tt,{anchor:"middle",size:11,fill:"var(--ink-3)",mono:true});
    var cc=ymax*i/4, yy=y(cc);
    s+=line(L,yy,R,yy,{c:"var(--line)",w:1});
    s+=txt(L-7,yy+4,fmt(cc,2),{anchor:"end",size:11,fill:"var(--ink-3)",mono:true});
  }
  s+=gAxes({L:L,R:R,T:T,B:B,xl:"čas t [s]",yl:"koncentrace [mol·dm⁻³]",yx:16,xly:34});
  /* křivky */
  var pa=[],pp=[];
  for(var t=0;t<=TMAX;t+=0.1){
    var c=cOf(st.order,st.k,st.c0,t);
    pa.push(x(t).toFixed(1)+","+y(c).toFixed(1));
    pp.push(x(t).toFixed(1)+","+y(st.c0-c).toFixed(1));
  }
  s+='<polyline points="'+pp.join(" ")+'" style="fill:none;stroke:var(--endo);stroke-width:2.4;stroke-linejoin:round"/>';
  s+='<polyline points="'+pa.join(" ")+'" style="fill:none;stroke:var(--exo);stroke-width:2.6;stroke-linejoin:round"/>';
  /* poločas */
  var th=tHalf(st.order,st.k,st.c0);
  if(th<TMAX){
    s+=line(x(th),y(st.c0/2),x(th),B,{c:"var(--ink-3)",w:1,dash:"4 3"});
    s+=line(L,y(st.c0/2),x(th),y(st.c0/2),{c:"var(--ink-3)",w:1,dash:"4 3"});
    s+=txt(x(th)+5,B-8,"t½ = "+fmt(th,2)+" s",{size:11,w:600,fill:"var(--ink-3)",mono:true});
  }
  /* sečna 0 → t */
  var t0=st.t, c0v=st.c0, ct=cOf(st.order,st.k,st.c0,t0);
  s+=line(x(0),y(c0v),x(t0),y(ct),{c:"var(--ink-3)",w:1.8,dash:"6 4"});
  /* tečna */
  var v=vOf(st.order,st.k,ct);
  var dt=3.2, t1=Math.max(0,t0-dt), t2=Math.min(TMAX,t0+dt);
  var y1=ct+v*(t0-t1), y2=ct-v*(t2-t0);
  /* oříznout do plochy */
  if(y1>ymax){ t1=t0-(ymax-ct)/v; y1=ymax; }
  if(y2<0){ t2=t0+ct/v; y2=0; }
  if(v>0) s+=line(x(t1),y(y1),x(t2),y(y2),{c:"var(--accent)",w:2.4,cap:"round"});
  /* bod */
  s+=line(x(t0),y(ct),x(t0),B,{c:"var(--accent)",w:1,dash:"2 3"});
  s+='<circle cx="'+x(t0)+'" cy="'+y(ct)+'" r="6" style="fill:var(--surface);stroke:var(--accent);stroke-width:2.5"/>';
  s+=txt(x(t0)+9,y(ct)-9,"t = "+fmt(t0,1)+" s",{size:11.5,w:600,fill:"var(--accent)",mono:true});
  /* popisky křivek */
  s+=txt(R-4,y(st.c0-cOf(st.order,st.k,st.c0,TMAX))-8,"[P]",{anchor:"end",size:12,w:700,fill:"var(--endo)"});
  s+=txt(R-4,y(cOf(st.order,st.k,st.c0,TMAX))+16,"[A]",{anchor:"end",size:12,w:700,fill:"var(--exo)"});
  var ordName=["nultý řád: [A] = [A]₀ − k·t","první řád: [A] = [A]₀·e^(−k·t)","druhý řád: 1/[A] = 1/[A]₀ + k·t"][st.order];
  s+=txt(L+8,T+4,ordName,{size:11.5,w:600,fill:"var(--ink-2)",mono:true});
  $("#heroWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Koncentrace reaktantu a produktu v čase"');

  $("#heroKV").textContent=fmt(st.k,2)+" "+kUnit(st.order);
  $("#heroC0V").textContent=fmt(st.c0,1)+" mol·dm⁻³";
  $("#heroTV").textContent=fmt(st.t,1)+" s";
  var vavg=(c0v-ct)/t0;
  setRo("#heroRo1","Okamžitá rychlost v(t)",sci(v,2)+" mol·dm⁻³·s⁻¹","směrnice tečny v čase t","neg");
  setRo("#heroRo2","Průměrná rychlost 0 → t",sci(vavg,2)+" mol·dm⁻³·s⁻¹","směrnice sečny; "+(vavg>v?"větší než okamžitá":"≈ okamžitá"),"");
  setRo("#heroRo3","Poločas t½",fmt(th,2)+" s",st.order===1?"ln 2 / k — nezávisí na c₀":(st.order===0?"c₀ / 2k — roste s c₀":"1 / (k·c₀) — klesá s c₀"),"");
  setRo("#heroRo4","[A] v čase t",fmt(ct,3)+" mol·dm⁻³",fmt(100*ct/c0v,0)+" % původního množství","");
  var notes=[
    "<b>Nultý řád:</b> rychlost je konstantní (tečna má stále stejný sklon), koncentrace klesá po přímce a&nbsp;náhle dojde. Poločas se s&nbsp;klesající koncentrací zkracuje. Typické pro nasycený katalyzátor nebo enzym.",
    "<b>První řád:</b> rychlost je úměrná [A], takže s&nbsp;úbytkem reaktantu klesá — tečna se zplošťuje. Poločas <b>nezávisí</b> na koncentraci: zkuste změnit c₀ a&nbsp;t½ se nehne. Radioaktivní rozpad, rozklad N₂O₅.",
    "<b>Druhý řád:</b> rychlost je úměrná [A]², proto na začátku padá prudce a&nbsp;pak se vleče. Poločas se s&nbsp;každým dalším poločasem <b>zdvojnásobí</b>. Zkuste zvýšit c₀: t½ se zkrátí."
  ];
  $("#heroNote").innerHTML=notes[st.order]+" Posuňte čas doprava a&nbsp;sledujte, jak se okamžitá rychlost (tečna) liší od průměrné (sečna).";
}
