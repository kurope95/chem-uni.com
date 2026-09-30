/* ============================================================
   A1 · POMOCNÍCI
   ============================================================ */
function fx(n,d){ return (n<0?"−":"")+Math.abs(n).toFixed(d).replace(".",","); }
function segBind(id,cb){
  var bs=$$("#"+id+" button");
  bs.forEach(function(b){
    b.addEventListener("click",function(){
      bs.forEach(function(x){ x.setAttribute("aria-pressed", x===b?"true":"false"); });
      cb(b.dataset.v);
    });
  });
}
function msg(el,cls,html){ el.className="jd-msg"+(cls?" "+cls:""); el.innerHTML=html; }
function ro(el,k,v,h){ el.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span>'+(h?'<span class="h">'+h+'</span>':''); }
function num(v){ var x=parseFloat(String(v).trim().replace(",",".").replace(/−/g,"-")); return isNaN(x)?null:x; }
function mixc(a,b,t){ t=Math.max(0,Math.min(1,t)); return [0,1,2].map(function(i){ return Math.round(a[i]+(b[i]-a[i])*t); }); }
function rgb(c,a){ return "rgba("+c[0]+","+c[1]+","+c[2]+","+(a===undefined?1:a)+")"; }
var WATER=[214,232,242];

/* byreta nad erlenmeyerovou baňkou; frac = kolik byrety je vypuštěno (0–1) */
function drawFlask(fill,frac,label,sub){
  var s='';
  s+=rect(92,12,16,118,{fill:"var(--surface)",stroke:"var(--ink-3)",sw:1.4,r:3});
  var top=16+Math.max(0,Math.min(1,frac))*106;
  s+=rect(94,top,12,128-top,{fill:"rgba(120,160,210,.35)"});
  for(var k=0;k<=5;k++){ s+=line(92,20+k*21,99,20+k*21,{c:"var(--ink-3)",w:1}); }
  s+=rect(86,130,28,7,{fill:"var(--ink-3)",r:2});
  s+=line(100,137,100,152,{c:"var(--ink-3)",w:2.4,cap:"round"});
  var yl=236, xl=85-(yl-200)*55/80, xr=115+(yl-200)*55/80;
  s+='<path d="M'+xl+' '+yl+' L30 280 Q30 286 36 286 L164 286 Q170 286 170 280 L'+xr+' '+yl+' Z" style="fill:'+fill+'"/>';
  s+='<path d="M85 166 L85 200 L30 280 Q30 286 36 286 L164 286 Q170 286 170 280 L115 200 L115 166" style="fill:none;stroke:var(--ink-2);stroke-width:2;stroke-linejoin:round"/>';
  s+=line(81,166,89,166,{c:"var(--ink-2)",w:2,cap:"round"});
  s+=line(111,166,119,166,{c:"var(--ink-2)",w:2,cap:"round"});
  s+=txt(100,306,label,{anchor:"middle",size:13,w:600,fill:"var(--ink)"});
  if(sub) s+=txt(100,323,sub,{anchor:"middle",size:11.5});
  return svg("0 0 200 330",s,'aria-label="Byreta a titrační baňka"');
}

/* ============================================================
   A2 · INDIKÁTORY
   ============================================================ */
var IND = [
  {k:"tb", n:"thymolová modř (1. přechod)", s:"thymolová modř", lo:1.2, hi:2.8, ca:"červená", cb:"žlutá", a:[211,47,47], b:[240,196,48], use:"silně kyselé roztoky"},
  {k:"mo", n:"methyloranž", s:"methyloranž", lo:3.1, hi:4.4, ca:"červená", cb:"žlutooranžová", a:[214,52,42], b:[242,168,36], use:"silná kyselina + slabá zásada"},
  {k:"mr", n:"methylčerveň", s:"methylčerveň", lo:4.4, hi:6.2, ca:"červená", cb:"žlutá", a:[210,45,60], b:[240,196,48], use:"silná kyselina + slabá zásada"},
  {k:"bb", n:"bromthymolová modř", s:"bromthymolová modř", lo:6.0, hi:7.6, ca:"žlutá", cb:"modrá", a:[230,196,40], b:[40,90,210], use:"silná kyselina + silná zásada (kolem neutrality)"},
  {k:"pr", n:"fenolová červeň", s:"fenolová červeň", lo:6.8, hi:8.4, ca:"žlutá", cb:"červená", a:[232,192,44], b:[206,46,72], use:"titrace blízko neutrality"},
  {k:"pp", n:"fenolftalein", s:"fenolftalein", lo:8.2, hi:10.0, ca:"bezbarvá", cb:"růžová až fialová", a:null, b:[214,51,143], use:"slabá kyselina + silná zásada, silná + silná"},
  {k:"tp", n:"thymolftalein", s:"thymolftalein", lo:9.4, hi:10.6, ca:"bezbarvá", cb:"modrá", a:null, b:[47,95,208], use:"slabá kyselina + silná zásada (zásaditější oblast)"}
];
function indBy(k){ return IND.filter(function(d){return d.k===k;})[0]; }
/* podíl zásadité formy: 0,1 na začátku a 0,9 na konci funkční oblasti */
function indFrac(d,pH){ var mid=(d.lo+d.hi)/2, k=2*Math.log(9)/(d.hi-d.lo); return 1/(1+Math.exp(-k*(pH-mid))); }
function indColor(d,pH,alpha){
  var f=indFrac(d,pH);
  if(!d.a) return rgb(mixc(WATER,d.b,f),(alpha||.95)*(0.45+0.55*f));
  return rgb(mixc(d.a,d.b,f),alpha||.95);
}
function indState(d,pH){ return pH<d.lo ? d.ca : (pH>d.hi ? d.cb : "přechod"); }

/* ============================================================
   A3 · pH TITROVANÉHO ROZTOKU (bilance nábojů, řešená půlením)
   ============================================================ */
var KW=1e-14, PKNH4=9.25;
var TYPES = {
  sasb:{an:"HCl", ti:"NaOH", lab:"silná kyselina + silná zásada", ex:"HCl titrovaná NaOH", sample:"HCl", titr:"NaOH", ind:"bb"},
  wasb:{an:"HA", ti:"NaOH", lab:"slabá kyselina + silná zásada", ex:"CH₃COOH titrovaná NaOH", sample:"CH₃COOH", titr:"NaOH", ind:"pp"},
  sawb:{an:"NH3", ti:"HCl", lab:"silná kyselina + slabá zásada", ex:"NH₃ titrovaný HCl", sample:"NH₃", titr:"HCl", ind:"mo"},
  wawb:{an:"HA", ti:"NH3", lab:"slabá kyselina + slabá zásada", ex:"CH₃COOH titrovaná NH₃", sample:"CH₃COOH", titr:"NH₃", ind:"bb"}
};
/* o = {t, Va (ml), ca, ct (mol/l), pKa (slabé kyseliny, výchozí 4,76)} */
function phAt(o,V){
  var ty=TYPES[o.t], Vt=o.Va+V, T={HCl:0,NaOH:0,HA:0,NH3:0};
  T[ty.an]+=o.ca*o.Va/Vt; if(V>0) T[ty.ti]+=o.ct*V/Vt;
  var Ka=Math.pow(10,-(o.pKa===undefined?4.76:o.pKa)), Kn=Math.pow(10,-PKNH4);
  function f(h){ return h+T.NaOH+T.NH3*h/(h+Kn)-KW/h-T.HCl-T.HA*Ka/(h+Ka); }
  var lo=-15, hi=1;
  for(var i=0;i<60;i++){ var m=(lo+hi)/2; if(f(Math.pow(10,m))>0) hi=m; else lo=m; }
  return -(lo+hi)/2;
}
function veqOf(o){ return o.ca*o.Va/o.ct; }
/* objem, při kterém pH projde hodnotou p (křivka je monotónní); null = neprojde */
function vAtPH(o,p,Vmax){
  var a=phAt(o,0)-p, b=phAt(o,Vmax)-p;
  if(a*b>0) return null;
  var lo=0, hi=Vmax;
  for(var i=0;i<50;i++){ var m=(lo+hi)/2, v=phAt(o,m)-p; if(v*a>0) lo=m; else hi=m; }
  return (lo+hi)/2;
}

/* ============================================================
   A4 · KRESBA TITRAČNÍ KŘIVKY
   ============================================================ */
/* c = {o, Vmax, ind, cur, be, half, marks:[{V,lab}], curves:[{o,c,w}], gid, endV, h} */
function curveSVG(c){
  var W=440, H=c.h||300, L=38, R=12, T=24, B=40, Vmax=c.Vmax||50, s='', i;
  function xs(V){ return L+(W-L-R)*V/Vmax; }
  function ys(p){ return T+(H-T-B)*(14-p)/14; }
  for(i=0;i<=14;i+=2){ s+=line(L,ys(i),W-R,ys(i),{c:"var(--line)"}); s+=txt(L-6,ys(i)+4,String(i),{anchor:"end",size:11,mono:true}); }
  for(i=0;i<=Vmax;i+=5){ s+=line(xs(i),T,xs(i),H-B,{c:"var(--line)",w:i%10?0.5:1}); if(i%10===0) s+=txt(xs(i),H-B+16,String(i),{anchor:"middle",size:11,mono:true}); }
  s+=txt((L+W-R)/2,H-6,"objem titrantu V / ml",{anchor:"middle",size:11.5,w:600});
  s+=txt(4,13,"pH",{size:11.5,w:600});
  if(c.ind){
    var d=c.ind, g=c.gid||"g";
    var ca=d.a?rgb(d.a,.5):rgb(WATER,.35), cb=rgb(d.b,.5);
    s+='<defs><linearGradient id="'+g+'" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="'+ca+'"/><stop offset="1" stop-color="'+cb+'"/></linearGradient></defs>';
    s+='<rect x="'+L+'" y="'+ys(d.hi)+'" width="'+(W-L-R)+'" height="'+(ys(d.lo)-ys(d.hi))+'" style="fill:url(#'+g+')"/>';
  }
  function path(o,col,w,dash){
    var ve=veqOf(o), pts=[], n=240, V;
    for(i=0;i<=n;i++) pts.push(Vmax*i/n);
    [-0.4,-0.2,-0.1,-0.05,-0.02,0,0.02,0.05,0.1,0.2,0.4].forEach(function(dv){ if(ve+dv>0&&ve+dv<Vmax) pts.push(ve+dv); });
    pts.sort(function(a,b){return a-b;});
    var dd=pts.map(function(V,j){ return (j?"L":"M")+xs(V).toFixed(1)+" "+ys(phAt(o,V)).toFixed(1); }).join(" ");
    return '<path d="'+dd+'" style="fill:none;stroke:'+col+';stroke-width:'+(w||2.6)+';stroke-linejoin:round'+(dash?';stroke-dasharray:'+dash:'')+'"/>';
  }
  (c.curves||[]).forEach(function(k){ s+=path(k.o,k.c,k.w,k.dash); });
  if(c.o) s+=path(c.o,"var(--accent)",2.8);
  var o=c.o;
  if(o && c.half){
    var vh=veqOf(o)/2, ph=phAt(o,vh);
    s+='<circle cx="'+xs(vh)+'" cy="'+ys(ph)+'" r="4.5" style="fill:var(--surface);stroke:var(--endo);stroke-width:2"/>';
    s+=txt(xs(vh)+8,ys(ph)+(TYPES[o.t].an==="NH3"?16:-8),TYPES[o.t].an==="NH3"?"pH = pKₐ(NH₄⁺)":"pH = pKₐ",{size:11.5,w:600,fill:"var(--endo)"});
  }
  if(o && c.be){
    var ve=veqOf(o), pe=phAt(o,ve);
    s+=line(xs(ve),ys(pe),xs(ve),H-B,{c:"var(--accent)",dash:"3 3"});
    s+='<circle cx="'+xs(ve)+'" cy="'+ys(pe)+'" r="5" style="fill:var(--accent)"/>';
    if(c.be!=="dot") s+=txt(xs(ve)+8,ys(pe)+4,"bod ekvivalence (pH "+fx(pe,1)+")",{size:11.5,w:600,fill:"var(--accent)"});
  }
  (c.marks||[]).forEach(function(m){
    var p=phAt(o,m.V);
    s+='<circle cx="'+xs(m.V)+'" cy="'+ys(p)+'" r="9" style="fill:var(--surface);stroke:var(--ink);stroke-width:1.5"/>';
    s+=txt(xs(m.V),ys(p)+4,m.lab,{anchor:"middle",size:11,w:700,fill:"var(--ink)"});
  });
  if(c.endV!==undefined && c.endV!==null){
    var xe=xs(c.endV);
    s+='<path d="M'+xe+' '+(H-B)+' l-6 9 l12 0 z" style="fill:var(--warn)"/>';
  }
  if(o && c.cur!==undefined){
    var pc=phAt(o,c.cur);
    s+=line(xs(c.cur),ys(pc),xs(c.cur),H-B,{c:"var(--ink-2)",dash:"2 3"});
    s+='<circle cx="'+xs(c.cur)+'" cy="'+ys(pc)+'" r="6" style="fill:var(--ink);stroke:var(--surface);stroke-width:2"/>';
  }
  return svg("0 0 "+W+" "+H,s,'aria-label="Titrační křivka"');
}

/* ============================================================
   A5 · MODEL — TITRACE S VOLBOU INDIKÁTORU
   ============================================================ */
var HT = {t:"sasb", ind:"bb", V:0};
function heroO(){ return {t:HT.t, Va:25, ca:0.1, ct:0.1}; }
function drawHero(){
  var o=heroO(), d=indBy(HT.ind), V=HT.V, ve=veqOf(o), ph=phAt(o,V), VM=50;
  var vMid=vAtPH(o,(d.lo+d.hi)/2,VM), vLo=vAtPH(o,d.lo,VM), vHi=vAtPH(o,d.hi,VM);
  $("#tcWrap").innerHTML=curveSVG({o:o, ind:d, cur:V, be:true, half:HT.t!=="sasb"&&HT.t!=="wawb", gid:"tcG", endV:vMid});
  var bl=$("#tcBandLab"); if(bl) bl.innerHTML="funkční oblast: <b>"+d.s+"</b> (pH "+fx(d.lo,1)+"–"+fx(d.hi,1)+")";
  var bi=$("#tcBandSw"); if(bi) bi.style.background="linear-gradient(90deg,"+(d.a?rgb(d.a,.55):rgb(WATER,.5))+","+rgb(d.b,.55)+")";
  $("#tcFlask").innerHTML=drawFlask(indColor(d,ph),V/VM,TYPES[HT.t].sample+" + "+d.s,"z byrety: "+TYPES[HT.t].titr);
  $("#tcVV").textContent=fx(V,2)+" ml";
  ro($("#tcRo1"),"Přidáno titrantu",fx(V,2)+" ml","bod ekvivalence: "+fx(ve,2)+" ml");
  ro($("#tcRo2"),"pH v baňce",fx(ph,2),V<ve-0.02?"před bodem ekvivalence":(V>ve+0.02?"nadbytek titrantu":"bod ekvivalence"));
  var st=indState(d,ph);
  ro($("#tcRo3"),"Barva indikátoru",'<span class="abt-sw" style="background:'+indColor(d,ph)+'"></span>'+(st==="přechod"?"přechod":st),d.ca+" → "+d.cb);
  /* posouzení indikátoru */
  var v;
  if(vMid===null){
    var p0=phAt(o,0), before=((d.lo+d.hi)/2 < Math.min(p0,phAt(o,VM)));
    v=["bad","<b>Nevhodný:</b> "+d.s+" během titrace barvu vůbec nezmění. Jeho oblast (pH "+fx(d.lo,1)+"–"+fx(d.hi,1)+") leží mimo pH, kterými roztok prochází."];
  } else {
    var err=vMid-ve, width=(vLo!==null&&vHi!==null)?Math.abs(vHi-vLo):99;
    var a1=Math.min(vLo===null?0:vLo,vHi===null?VM:vHi), a2=Math.max(vLo===null?0:vLo,vHi===null?VM:vHi);
    if(Math.abs(err)>1) v=["bad","<b>Nevhodný:</b> barvu změní už při "+fx(vMid,2)+" ml, tedy o "+fx(Math.abs(err),2)+" ml "+(err<0?"dřív":"později")+", než je bod ekvivalence ("+fx(ve,2)+" ml). Jeho oblast neleží ve skoku pH, ale v plochém úseku křivky "+(err<0?"před bodem ekvivalence":"za ním")+(width>1?", kde se pH mění pomalu, a barva proto přechází pozvolna (mezi "+fx(a1,1)+" a "+fx(a2,1)+" ml)":"")+". To je velká <b>chyba indikátora</b>."];
    else if(width>1) v=["bad","<b>Nevhodný:</b> barva přechází pozvolna mezi "+fx(a1,1)+" a "+fx(a2,1)+" ml. Skok pH v bodě ekvivalence je tu tak malý, že konec titrace nelze okem přesně poznat."];
    else if(Math.abs(err)<=0.1) v=["ok","<b>Vhodný indikátor:</b> změní barvu při "+fx(vMid,2)+" ml, jen "+fx(Math.abs(err),2)+" ml od bodu ekvivalence. Jeho oblast leží ve skoku pH."];
    else v=[Math.abs(err)>1?"bad":"warn","<b>Nevhodný:</b> barvu změní při "+fx(vMid,2)+" ml, tedy o "+fx(Math.abs(err),2)+" ml ("+fx(Math.abs(err)/ve*100,1)+" %) "+(err<0?"dřív":"později")+", než je bod ekvivalence. To je <b>chyba indikátora</b>. Oranžový trojúhelník na ose ukazuje, kde barva přejde."];
  }
  msg($("#tcMsg"),v[0],v[1]);
}
function initHero(){
  $("#tcInd").innerHTML=IND.map(function(d){ return '<option value="'+d.k+'">'+d.n+' ('+fx(d.lo,1)+'–'+fx(d.hi,1)+')</option>'; }).join("");
  $("#tcInd").value=HT.ind;
  $("#tcInd").addEventListener("change",function(){ HT.ind=this.value; drawHero(); });
  $("#tcV").addEventListener("input",function(){ HT.V=+this.value; drawHero(); });
  segBind("tcType",function(v){ HT.t=v; HT.ind=TYPES[v].ind; $("#tcInd").value=HT.ind; drawHero(); });
  drawHero();
}

/* ============================================================
   A6 · SROVNÁNÍ ČTYŘ KŘIVEK A VLIV pKa
   ============================================================ */
var CMP = [
  {t:"sasb", c:"var(--cat1)"}, {t:"wasb", c:"var(--cat2)"}, {t:"sawb", c:"var(--cat3)"}, {t:"wawb", c:"var(--cat4)"}
];
function drawCmp(){
  $("#cmpWrap").innerHTML=curveSVG({curves:CMP.map(function(k){ return {o:{t:k.t,Va:25,ca:0.1,ct:0.1}, c:k.c, w:2.4}; })});
  $("#cmpLeg").innerHTML=CMP.map(function(k){ return '<span class="li"><span class="sw" style="background:'+k.c+'"></span>'+TYPES[k.t].ex+'</span>'; }).join("");
}
/* ============================================================
   A7 · INDIKÁTORY NA STUPNICI pH
   ============================================================ */
var ICPH=7;
function drawIndChart(){
  var W=440, x0=150, x1=430, rh=32, top=16, s='';
  function xp(p){ return x0+(x1-x0)*p/14; }
  IND.forEach(function(d,i){
    var y=top+i*rh, g="icg"+i;
    var ca=d.a?rgb(d.a):rgb(WATER,.5), cb=rgb(d.b);
    s+='<defs><linearGradient id="'+g+'" x1="0" x2="1"><stop offset="'+(d.lo/14)+'" stop-color="'+ca+'"/><stop offset="'+(d.hi/14)+'" stop-color="'+cb+'"/></linearGradient></defs>';
    s+=txt(x0-8,y+15,d.s,{anchor:"end",size:13,w:600,fill:"var(--ink)"});
    s+='<rect x="'+x0+'" y="'+(y+3)+'" width="'+(x1-x0)+'" height="18" rx="4" style="fill:url(#'+g+');stroke:var(--line-strong);stroke-width:.8"/>';
    s+=line(xp(d.lo),y+1,xp(d.lo),y+23,{c:"var(--ink-2)",w:1});
    s+=line(xp(d.hi),y+1,xp(d.hi),y+23,{c:"var(--ink-2)",w:1});
  });
  var yb=top+IND.length*rh;
  for(var p=0;p<=14;p+=2){ s+=line(xp(p),yb,xp(p),yb+5,{c:"var(--ink-3)"}); s+=txt(xp(p),yb+18,String(p),{anchor:"middle",size:12,mono:true}); }
  var xm=xp(ICPH);
  s+=line(xm,top-6,xm,yb+2,{c:"var(--ink)",w:2.5});
  s+='<path d="M'+xm+' '+(top-4)+' l-6 -9 l12 0 z" style="fill:var(--ink)"/>';
  $("#icWrap").innerHTML=svg("0 0 "+W+" "+(yb+26),s,'aria-label="Funkční oblasti indikátorů na stupnici pH"');
  $("#icPHV").textContent=fx(ICPH,1);
  var inTr=IND.filter(function(d){ return ICPH>=d.lo && ICPH<=d.hi; });
  msg($("#icMsg"),inTr.length?"ok":"","Při pH "+fx(ICPH,1)+": "+IND.map(function(d){
    var st=indState(d,ICPH);
    return '<span style="white-space:nowrap"><span class="abt-sw" style="background:'+indColor(d,ICPH)+'"></span>'+d.s+' <b>'+(st==="přechod"?"v přechodu":st)+'</b></span>';
  }).join(" · "));
}
function fillIndTable(){
  $("#indTable").innerHTML=IND.map(function(d){
    var sa='<span class="abt-sw" style="background:'+(d.a?rgb(d.a):rgb(WATER,.4))+'"></span>', sb='<span class="abt-sw" style="background:'+rgb(d.b)+'"></span>';
    return '<tr><td>'+d.n+'</td><td class="n">'+fx(d.lo,1)+'–'+fx(d.hi,1)+'</td><td>'+sa+d.ca+'</td><td>'+sb+d.cb+'</td><td>'+d.use+'</td></tr>';
  }).join("");
}
