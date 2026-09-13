/* ============================================================
   POMOCNÉ — seeded random, kruh, šipka
   ============================================================ */
function rng(seed){ var s=seed||1; return function(){ s=(s*9301+49297)%233280; return s/233280; }; }
function circ(cx,cy,r,o){
  o=o||{};
  return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" style="fill:'+(o.fill||"var(--ink-3)")+';'+
    (o.stroke?"stroke:"+o.stroke+";stroke-width:"+(o.sw||1)+";":"")+(o.op!==undefined?"fill-opacity:"+o.op+";":"")+(o.style||"")+'"/>';
}
/* šipka z (x1,y1) do (x2,y2) */
function arrow(x1,y1,x2,y2,o){
  o=o||{}; var c=o.c||"var(--ink-2)", w=o.w||2;
  var dx=x2-x1, dy=y2-y1, L=Math.sqrt(dx*dx+dy*dy)||1, ux=dx/L, uy=dy/L, ah=o.ah||8;
  var bx=x2-ux*ah, by=y2-uy*ah;
  var s=line(x1,y1,bx,by,{c:c,w:w,cap:"round",dash:o.dash});
  s+='<path d="M'+x2+' '+y2+' L'+(bx-uy*ah*0.55)+' '+(by+ux*ah*0.55)+' L'+(bx+uy*ah*0.55)+' '+(by-ux*ah*0.55)+' z" style="fill:'+c+'"/>';
  return s;
}
function bondType(d){ return d<0.4?"nepolární kovalentní":(d<1.7?"polární kovalentní":"iontová"); }
function bondCol(d){ return d<0.4?"var(--cat1)":(d<1.7?"var(--cat2)":"var(--cat4)"); }
function ionicPct(d){ return 100*(1-Math.exp(-d*d/4)); }

/* ============================================================
   7 · HERO — rozdíl elektronegativit
   ============================================================ */
var heroState={dEN:0.96, pair:9};
function drawHero(){
  var d=heroState.dEN, p=heroState.pair>=0?PAIRS[heroState.pair]:null;
  var W=760,H=280, y0=118, xa=230, xb=530;
  var f=Math.min(1,d/3.3);
  var s='';
  /* elektronový oblak */
  var shift=f*150, rx=170-90*f, ry=70-22*f;
  var cx=(xa+xb)/2+shift*0.62;
  if(d<1.7){
    s+='<ellipse cx="'+cx+'" cy="'+y0+'" rx="'+rx+'" ry="'+ry+'" style="fill:var(--endo);fill-opacity:'+(0.18+0.18*f)+'"/>';
    s+='<ellipse cx="'+(cx+shift*0.3)+'" cy="'+y0+'" rx="'+(rx*0.55)+'" ry="'+(ry*0.7)+'" style="fill:var(--endo);fill-opacity:'+(0.10+0.25*f)+'"/>';
  } else {
    s+=circ(xb,y0,84,{fill:"var(--endo)",op:0.42});
    s+=circ(xa,y0,42,{fill:"var(--surface-3)",op:0.9,stroke:"var(--line-strong)",sw:1.5,style:"stroke-dasharray:4 4;"});
  }
  /* jádra */
  s+=circ(xa,y0,d<1.7?34:30,{fill:"var(--surface)",stroke:bondCol(d),sw:3});
  s+=circ(xb,y0,d<1.7?34:38,{fill:"var(--surface)",stroke:bondCol(d),sw:3});
  var la=p?p.a:"A", lb=p?p.b:"B";
  s+=txt(xa,y0+7,la,{anchor:"middle",size:22,w:700,fill:"var(--ink)"});
  s+=txt(xb,y0+7,lb,{anchor:"middle",size:22,w:700,fill:"var(--ink)"});
  s+=txt(xa,y0+52,p?"EN "+fmt(EN[p.a],2):"méně elektronegativní",{anchor:"middle",size:11.5,fill:"var(--ink-3)",mono:!!p});
  s+=txt(xb,y0+58,p?"EN "+fmt(EN[p.b],2):"více elektronegativní",{anchor:"middle",size:11.5,fill:"var(--ink-3)",mono:!!p});
  /* parciální náboje */
  if(d<1.7){
    var dl = d<0.4 ? "δ≈0" : "δ+";
    var dr = d<0.4 ? "δ≈0" : "δ−";
    var sz = 13+12*f;
    s+=txt(xa,y0-46,dl,{anchor:"middle",size:sz,w:700,fill:d<0.4?"var(--ink-3)":"var(--exo)"});
    s+=txt(xb,y0-46,dr,{anchor:"middle",size:sz,w:700,fill:d<0.4?"var(--ink-3)":"var(--endo)"});
  } else {
    s+=txt(xa,y0-46,"+",{anchor:"middle",size:26,w:700,fill:"var(--exo)"});
    s+=txt(xb,y0-52,"−",{anchor:"middle",size:26,w:700,fill:"var(--endo)"});
    s+=txt(xa,y0-68,"kation",{anchor:"middle",size:11,fill:"var(--ink-3)"});
    s+=txt(xb,y0-74,"anion",{anchor:"middle",size:11,fill:"var(--ink-3)"});
  }
  /* popis posunu */
  if(d>=0.4 && d<1.7) s+=arrow(cx-40,y0+ry+22,cx+40,y0+ry+22,{c:"var(--endo)",w:2});
  var lbl = d<0.4?"elektronový pár sdílen (téměř) rovnoměrně":(d<1.7?"elektronová hustota posunuta k "+lb:"elektron přenesen — vznikly ionty");
  s+=txt((xa+xb)/2,y0+ry+(d<0.4?34:44),lbl,{anchor:"middle",size:12,w:600,fill:"var(--ink-2)"});
  /* škála dole */
  var L=60,R=700,yb=238;
  var x=function(v){return L+(R-L)*v/3.3;};
  s+=rect(L,yb-8,x(0.4)-L,16,{fill:"var(--cat1)",r:0,style:"fill-opacity:.55;"});
  s+=rect(x(0.4),yb-8,x(1.7)-x(0.4),16,{fill:"var(--cat2)",style:"fill-opacity:.55;"});
  s+=rect(x(1.7),yb-8,R-x(1.7),16,{fill:"var(--cat4)",r:0,style:"fill-opacity:.55;"});
  [0,0.4,1.0,1.7,2.5,3.3].forEach(function(v){ s+=line(x(v),yb+8,x(v),yb+13,{c:"var(--ink-3)",w:1}); s+=txt(x(v),yb+26,fmt(v,1),{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true}); });
  s+=txt(L,yb-16,"ΔEN",{size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  s+='<path d="M'+x(d)+' '+(yb-12)+' l-7 -10 l14 0 z" style="fill:var(--ink)"/>';
  s+=line(x(d),yb-8,x(d),yb+8,{c:"var(--ink)",w:2});
  $("#heroWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Posun elektronové hustoty podle rozdílu elektronegativit"');
  $("#heroENV").textContent=fmt(d,2);
  function ro(id,k,v,h,c){ var e=$(id); e.innerHTML='<span class="k">'+k+'</span><span class="v" style="color:'+(c||"var(--ink)")+'">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#heroRo1","ΔEN",fmt(d,2),p?p.lab+": |"+fmt(EN[p.b],2)+" − "+fmt(EN[p.a],2)+"|":"Paulingova stupnice");
  ro("#heroRo2","Typ vazby",bondType(d),"hranice 0,4 a 1,7 jsou orientační",bondCol(d));
  ro("#heroRo3","Iontový charakter",fmt(ionicPct(d),0)+" %","1 − e^(−ΔEN²/4) podle Paulinga",bondCol(d));
  var nt = p ? '<b>'+p.lab+'</b> — '+p.note+'. ' : '';
  nt += d<0.4 ? 'Do 0,4 je sdílení skoro spravedlivé: molekula nemá měřitelný dipól na této vazbě.'
      : (d<1.7 ? 'Elektronová hustota (modrý oblak) se posouvá k&nbsp;elektronegativnějšímu atomu — na něm vzniká δ−, na druhém δ+. Čím větší ΔEN, tím větší parciální náboje.'
               : 'Nad 1,7 už si elektronegativnější atom elektron vzal prakticky celý: vznikl kation a&nbsp;anion, které drží elektrostatika — iontová vazba. Ani tady ale není přenos 100 %.');
  $("#heroNote").innerHTML=nt;
}
function initHero(){
  var sel=$("#heroPair");
  sel.innerHTML='<option value="-1">— libovolné ΔEN (posuvník) —</option>'+PAIRS.map(function(p,i){
    return '<option value="'+i+'">'+p.lab+' (ΔEN '+fmt(Math.abs(EN[p.b]-EN[p.a]),2)+')</option>';
  }).join("");
  sel.value=String(heroState.pair);
  sel.addEventListener("change",function(){
    heroState.pair=+sel.value;
    if(heroState.pair>=0){ var p=PAIRS[heroState.pair]; heroState.dEN=Math.round(Math.abs(EN[p.b]-EN[p.a])*100)/100; $("#heroEN").value=heroState.dEN; }
    drawHero();
  });
  $("#heroEN").addEventListener("input",function(){ heroState.dEN=+this.value; heroState.pair=-1; sel.value="-1"; drawHero(); });
}

/* ============================================================
   8 · KŘIVKA POTENCIÁLNÍ ENERGIE (Morse)
   ============================================================ */
var morseState={i:0,r:74};
function morseE(m,r){ var e=Math.exp(-m.a*(r-m.re)); return m.De*((1-e)*(1-e)-1); }
function drawMorse(){
  var m=MORSE[morseState.i], r=morseState.r;
  var W=760,H=340,L=70,R=720,T=30,B=290;
  var rmin=40,rmax=400, Emin=-1150, Emax=450;
  var x=function(v){return L+(v-rmin)/(rmax-rmin)*(R-L);};
  var y=function(E){return B-(E-Emin)/(Emax-Emin)*(B-T);};
  var s='';
  /* mřížka */
  for(var g=-1000;g<=400;g+=200){ s+=line(L,y(g),R,y(g),{c:"var(--line)",w:1}); s+=txt(L-8,y(g)+4,g,{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true}); }
  for(var rr=50;rr<=400;rr+=50){ s+=line(x(rr),T,x(rr),B,{c:"var(--line)",w:1}); s+=txt(x(rr),B+16,rr,{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true}); }
  s+=line(L,y(0),R,y(0),{c:"var(--line-strong)",w:1.8});
  s+=txt(R-4,y(0)-6,"E = 0 · volné atomy (r → ∞)",{anchor:"end",size:10.5,w:600,fill:"var(--ink-3)"});
  /* pásma */
  s+=rect(L,T,x(m.re)-L,B-T,{fill:"var(--exo)",style:"fill-opacity:.05;"});
  s+=rect(x(m.re),T,R-x(m.re),B-T,{fill:"var(--endo)",style:"fill-opacity:.05;"});
  s+=txt(x(m.re)-6,T+14,"odpuzování jader",{anchor:"end",size:10.5,w:600,fill:"var(--exo)"});
  s+=txt(x(m.re)+6,T+14,"přitažlivost (energie klesá k dnu)",{size:10.5,w:600,fill:"var(--endo)"});
  /* křivka */
  var pts=[];
  for(var v=rmin;v<=rmax;v+=2){ var E=morseE(m,v); if(E>Emax) continue; pts.push(x(v).toFixed(1)+","+y(E).toFixed(1)); }
  s+='<polyline points="'+pts.join(" ")+'" style="fill:none;stroke:var(--ink-2);stroke-width:2.6;stroke-linejoin:round"/>';
  /* délka a energie */
  s+=line(x(m.re),y(-m.De),x(m.re),y(0),{c:"var(--line-strong)",w:1,dash:"4 4"});
  s+=vArrow(x(m.re)+22,y(0),y(-m.De),"var(--accent)","E = "+m.De+" kJ/mol","right");
  s+=circ(x(m.re),y(-m.De),5,{fill:"var(--accent)"});
  s+=txt(x(m.re),y(-m.De)+20,"r₀ = "+m.re+" pm",{anchor:"middle",size:11.5,w:600,fill:"var(--accent)",mono:true});
  /* aktuální bod */
  var Er=morseE(m,r), yv=Math.max(T,y(Math.min(Er,Emax)));
  s+=line(x(r),T,x(r),B,{c:"var(--ink)",w:1.2,dash:"3 4"});
  if(Er<=Emax) s+=circ(x(r),y(Er),6.5,{fill:"var(--surface)",stroke:"var(--ink)",sw:2.5});
  s+=rect(x(r)-34,T-24,68,18,{fill:"var(--ink)",r:4});
  s+=txt(x(r),T-11,r+" pm",{anchor:"middle",size:11,w:600,fill:"var(--paper)",mono:true});
  /* dvě kuličky = atomy */
  var gap=Math.min(120,Math.max(14,(r/m.re)*30)), ay=B-58, ax=R-90;
  s+=circ(ax-gap/2,ay,13,{fill:"var(--cat2)",op:0.8}); s+=circ(ax+gap/2,ay,13,{fill:"var(--cat2)",op:0.8});
  s+=txt(ax,ay+30,"vzdálenost jader",{anchor:"middle",size:10,fill:"var(--ink-3)"});
  /* osy */
  s+=txt((L+R)/2,B+34,"vzdálenost jader r [pm]",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em;text-transform:uppercase"});
  s+=txt(18,(T+B)/2,"E [kJ·mol⁻¹]",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:18px "+((T+B)/2)+"px;letter-spacing:.08em"});
  s+=txt(L+8,T+30,m.f+" · překryv "+m.sig,{size:13,w:700,fill:"var(--ink)"});
  $("#morseWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Křivka potenciální energie molekuly '+m.f+'"');
  $("#morseRV").textContent=r+" pm";
  function ro(id,k,v,h,c){ var e=$(id); e.innerHTML='<span class="k">'+k+'</span><span class="v" style="color:'+(c||"var(--ink)")+'">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#morseRo1","Délka vazby r₀",m.re+" pm","dno důlku — nejnižší energie","var(--accent)");
  ro("#morseRo2","Vazebná energie",m.De+" kJ·mol⁻¹","hloubka důlku = co dodat na roztržení","var(--accent)");
  var h3 = r<m.re-8 ? "jádra se odpuzují — energie letí nahoru" : (r>m.re+8 ? "atomy se přitahují — energie klesá k dnu" : "dno důlku — stabilní vazba");
  ro("#morseRo3","Energie při r = "+r+" pm",(Er>Emax?"> +450":fmt(Er,0))+" kJ·mol⁻¹",h3,Er>0?"var(--exo)":"var(--endo)");
}
function initMorse(){
  var sel=$("#morseSel");
  sel.innerHTML=MORSE.map(function(m,i){return '<option value="'+i+'">'+m.f+' — r₀ '+m.re+' pm, E '+m.De+' kJ/mol</option>';}).join("");
  sel.addEventListener("change",function(){ morseState.i=+sel.value; morseState.r=MORSE[morseState.i].re; $("#morseR").value=morseState.r; drawMorse(); });
  $("#morseR").addEventListener("input",function(){ morseState.r=+this.value; drawMorse(); });
}

/* ============================================================
   9 · TABULKA LÁTEK PODLE TYPU VAZBY
   ============================================================ */
var sbState={q:"",f:"all"};
function drawSubst(){
  var q=sbState.q.toLowerCase().trim();
  var rows=SUBST.filter(function(s){
    if(sbState.f==="mol" && !(s.typ==="mol"||s.typ==="molH")) return false;
    if(sbState.f==="atom" && !(s.typ==="atom"||s.typ==="vrstva")) return false;
    if((sbState.f==="kov"||sbState.f==="ion") && s.typ!==sbState.f) return false;
    if(!q) return true;
    return (s.n+" "+s.f+" "+TYPNAME[s.typ]+" "+s.mt).toLowerCase().indexOf(q)>=0;
  });
  function vodCell(v){
    var c = v.indexOf("ano")===0?"var(--ok)":(v==="ne"||v.indexOf("ne ")===0?"var(--bad)":"var(--ink-3)");
    return '<span style="color:'+c+';font-weight:600">'+v+'</span>';
  }
  var h="";
  rows.forEach(function(s){
    h+='<tr><td><b>'+s.n+'</b><br><span class="mono" style="color:var(--ink-3)">'+s.f+'</span></td>'+
       '<td><span class="tag" style="background:var(--surface-3);color:'+TYPCOL[s.typ]+'">'+TYPNAME[s.typ]+'</span><br><span style="font-size:.8rem;color:var(--ink-2)">'+s.mt+'</span></td>'+
       '<td class="n">'+fmt(s.bt,1)+'</td><td class="n">'+(s.bv===null?'<span style="color:var(--ink-3)">—</span>':fmt(s.bv,1))+'</td>'+
       '<td style="white-space:nowrap">'+vodCell(s.vod[0])+' · '+vodCell(s.vod[1])+' · '+vodCell(s.vod[2])+'</td>'+
       '<td style="font-size:.82rem">'+s.tv+'</td><td style="font-size:.82rem">'+s.roz+'</td></tr>';
  });
  if(!rows.length) h='<tr><td colspan="7" style="color:var(--ink-3);padding:1.2rem">Nic nenalezeno. Zkuste „sůl“, „NaCl“, „diamant“ nebo „voda“.</td></tr>';
  $("#sbBody").innerHTML=h;
  $$("#sbFilter button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===sbState.f); });
}
function initSubst(){
  $("#sbSearch").addEventListener("input",function(){ sbState.q=this.value; drawSubst(); });
  $$("#sbFilter button").forEach(function(b){ b.addEventListener("click",function(){ sbState.f=b.dataset.v; drawSubst(); }); });
  drawSubst();
}

/* ============================================================
   10 · ELEKTRONOVÝ PLYN (kovová vazba)
   ============================================================ */
var metMode="klid";
function drawMet(){
  var W=760,H=300, cols=9, rows=4, x0=110, y0=70, dx=62, dy=52, R=15;
  var s='', rnd=rng(7);
  var shiftTop = metMode==="tlak";
  var hot = metMode==="teplo";
  /* pozadí — teplo: gradient popisky */
  if(hot){
    s+=rect(x0-40,y0-34,190,rows*dy+30,{fill:"var(--exo)",r:10,style:"fill-opacity:.10;"});
    s+=txt(x0-30,y0-40,"HORKÝ KONEC",{size:10.5,w:600,fill:"var(--exo)",style:"letter-spacing:.09em"});
    s+=txt(x0+(cols-1)*dx+30,y0-40,"STUDENÝ KONEC",{anchor:"end",size:10.5,w:600,fill:"var(--endo)",style:"letter-spacing:.09em"});
    /* plamen */
    s+='<path d="M'+(x0-72)+' '+(y0+120)+' c-18 -30 8 -48 2 -72 c22 18 30 44 12 72 z" style="fill:var(--exo);fill-opacity:.75"/>';
  }
  if(metMode==="proud"){
    s+=rect(x0-84,y0-8,26,rows*dy-30,{fill:"var(--bad)",r:4,style:"fill-opacity:.7;"});
    s+=txt(x0-71,y0+rows*dy/2-8,"−",{anchor:"middle",size:26,w:700,fill:"var(--paper)"});
    s+=rect(x0+(cols-1)*dx+58,y0-8,26,rows*dy-30,{fill:"var(--ok)",r:4,style:"fill-opacity:.7;"});
    s+=txt(x0+(cols-1)*dx+71,y0+rows*dy/2-8,"+",{anchor:"middle",size:26,w:700,fill:"var(--paper)"});
    s+=txt(x0-71,y0+rows*dy-20,"katoda",{anchor:"middle",size:10,fill:"var(--ink-3)"});
    s+=txt(x0+(cols-1)*dx+71,y0+rows*dy-20,"anoda",{anchor:"middle",size:10,fill:"var(--ink-3)"});
  }
  if(metMode==="tlak"){
    /* kladivo */
    s+=rect(x0+dx*3.4,4,60,24,{fill:"var(--ink-2)",r:4});
    s+=rect(x0+dx*3.4+26,26,8,22,{fill:"var(--ink-3)",r:2});
    s+=arrow(x0+dx*3.4+30,50,x0+dx*3.4+30,y0-22,{c:"var(--accent)",w:3,ah:9});
    s+=txt(x0+dx*3.4+80,20,"ÚDER",{size:11,w:700,fill:"var(--accent)",style:"letter-spacing:.1em"});
    /* rovina skluzu */
    s+=line(x0-30,y0+dy*1.5,x0+cols*dx-10,y0+dy*1.5,{c:"var(--accent)",w:1.5,dash:"6 5"});
    s+=txt(x0+cols*dx-8,y0+dy*1.5+4,"rovina skluzu",{size:10.5,w:600,fill:"var(--accent)"});
  }
  if(metMode==="lesk"){
    for(var k=0;k<4;k++){
      var lx=x0+40+k*60;
      s+=arrow(lx-80,-4+k*0,lx,y0-22,{c:"var(--warn)",w:2});
      s+=arrow(lx,y0-22,lx+80,-4,{c:"var(--warn)",w:2,dash:"5 4"});
    }
    s+=txt(x0-70,26,"SVĚTLO",{size:11,w:700,fill:"var(--warn)",style:"letter-spacing:.1em"});
    s+=txt(x0+cols*dx-20,26,"ODRAZ",{anchor:"end",size:11,w:700,fill:"var(--warn)",style:"letter-spacing:.1em"});
  }
  /* kationty */
  for(var r=0;r<rows;r++){
    for(var c=0;c<cols;c++){
      var cx=x0+c*dx+(shiftTop&&r<2?dx/2:0), cy=y0+r*dy;
      if(hot){ var wob=(1-c/cols)*6; cx+=(rnd()-0.5)*wob*2; cy+=(rnd()-0.5)*wob*2; }
      if(shiftTop&&r<2&&c===cols-1) continue;
      s+=circ(cx,cy,R,{fill:"var(--cat3)",op:0.85,stroke:"var(--surface)",sw:2});
      s+=txt(cx,cy+4,"+",{anchor:"middle",size:14,w:700,fill:"var(--paper)"});
      if(hot && c<3){ s+=circ(cx,cy,R+5,{fill:"none",stroke:"var(--exo)",sw:1.2,style:"stroke-dasharray:3 3;"}); }
    }
  }
  /* elektrony */
  var nE=52;
  for(var i=0;i<nE;i++){
    var ex=x0-20+rnd()*(cols*dx-20), ey=y0-20+rnd()*(rows*dy-10);
    if(metMode==="proud"||hot){
      var len = metMode==="proud" ? 16 : 10+14*(1-(ex-x0)/(cols*dx));
      s+=arrow(ex,ey,ex+len,ey,{c:"var(--endo)",w:1.6,ah:5});
      s+=circ(ex,ey,3.4,{fill:"var(--endo)"});
    } else {
      s+=circ(ex,ey,3.4,{fill:"var(--endo)"});
    }
  }
  /* popisky */
  var cap={klid:"Kationty kmitají kolem pevných poloh, elektrony se chaoticky pohybují celým krystalem — elektronový plyn.",
           proud:"Elektrony driftují k kladnému pólu → elektrický proud. Kationty zůstávají na místě, nic se chemicky nemění.",
           teplo:"Elektrony u horkého konce získají energii, proletí krystalem a předají ji na studeném konci → tepelná vodivost.",
           tlak:"Horní vrstvy se posunuly o půl polohy. Elektronový plyn je nesměrový, drží kationty stejně — vazba nepraskla → kujnost.",
           lesk:"Volné elektrony pohltí a hned vyzáří libovolné viditelné světlo → lesk a neprůhlednost."};
  s+=txt(W/2,H-10,cap[metMode],{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  $("#metWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Model elektronového plynu v kovu"');
  $$("#metMode button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===metMode); });
  var story={
    klid:"Každý atom mědi pustil jeden valenční elektron (4s¹) do společného fondu. V&nbsp;krystalu je tedy mřížka <b>kationtů Cu⁺</b> a&nbsp;mezi nimi <b>elektronový plyn</b>, který kationty odstiňuje a&nbsp;drží pohromadě. Elektrony nepatří nikomu — a&nbsp;právě to je klíč ke všem čtyřem vlastnostem.",
    proud:"Připojili jsme baterii. Elektrony jsou <b>volné nosiče náboje</b>, takže se v&nbsp;elektrickém poli dají do pohybu od − k&nbsp;+. Proud teče, aniž se přenáší hmota — na rozdíl od roztoku soli, kde putují celé ionty. Při zahřátí by kationty kmitaly silněji a&nbsp;elektrony častěji rozptylovaly → odpor kovů s&nbsp;teplotou <b>roste</b>.",
    teplo:"Zahříváme levý konec. Kationty vlevo kmitají silněji (čárkované kroužky) a&nbsp;předávají energii elektronům, které ji jako rychlí kurýři roznesou po celém krystalu. Proto kovy vedou teplo tak dobře a&nbsp;proto <b>dobré elektrické vodiče jsou i&nbsp;dobré tepelné vodiče</b> (Ag, Cu, Au, Al).",
    tlak:"Udeřili jsme kladivem a&nbsp;horní dvě vrstvy se posunuly podél roviny skluzu. Podívejte se na okolí kationtů: je <b>úplně stejné</b> jako předtím — kolem každého kationtu je pořád stejný elektronový plyn. Kovová vazba nemá směr, takže posun ji neporuší. Kov se <b>vykoval</b>, nepukl. Ve slitině by cizí atomy tenhle posun brzdily (tvrdší, méně kujná).",
    lesk:"Na povrch dopadá světlo. Volné elektrony v&nbsp;částečně zaplněném pásu umí přijmout foton <b>jakékoli</b> viditelné energie a&nbsp;hned ho vyzářit zpět → kov světlo odráží (<b>lesk</b>) a&nbsp;nepropouští (<b>neprůhlednost</b>). Měď a&nbsp;zlato část modrého světla pohltí, proto jsou načervenalé."
  };
  $("#metStory").innerHTML=story[metMode];
  $("#metNote").innerHTML = metMode==="klid" ? "Přepínejte mezi pokusy. U&nbsp;každého se ptejte: <b>co dělají elektrony a&nbsp;co dělají kationty?</b> Vodivost je o&nbsp;elektronech, kujnost o&nbsp;kationtech."
    : "Zkuste teď přepnout na „Udeřit kladivem“ a&nbsp;porovnejte s&nbsp;modelem krystalu NaCl v&nbsp;kapitole 2 — tam stejný posun vrstvy krystal rozštípne.";
}
function drawMetTable(){
  $("#metBody").innerHTML=METALS.map(function(m){
    return '<tr><td><b>'+m.n+'</b> <span class="mono" style="color:var(--ink-3)">'+m.f+'</span></td><td class="n">'+fmt(m.bt,1)+'</td><td class="n">'+m.at+'</td><td class="n">'+fmt(m.el,2)+'</td><td class="n">'+fmt(m.th,0)+'</td></tr>';
  }).join("");
}
function initMet(){
  $$("#metMode button").forEach(function(b){ b.addEventListener("click",function(){ metMode=b.dataset.v; drawMet(); }); });
  drawMetTable();
}

/* ============================================================
   11 · MŘÍŽKOVÁ ENERGIE (Coulomb / Kapustinskii)
   ============================================================ */
var latState={c:1,a:1};
function ionSym(f){ return f.replace(/[⁺⁻²]/g,""); }
function formulaOf(c,a){
  var sc=ionSym(c.f), sa=ionSym(a.f);
  if(c.z===a.z) return sc+sa;
  if(c.z===2&&a.z===1) return sc+sa+"₂";
  return sc+"₂"+sa;
}
function drawLat(){
  var c=CATIONS[latState.c], a=ANIONS[latState.a];
  var d=c.r+a.r, nu=(c.z===a.z)?2:3;
  var U=1.2025e5*nu*c.z*a.z/d*(1-34.5/d);
  var key=c.f+a.f, tab=LATT[key]||null;
  var W=760,H=300, s='';
  /* ionty vlevo */
  var sc=0.62, cx1=150-(c.r*sc)/2-4, cy=130;
  var rc=c.r*sc, ra=a.r*sc;
  var xC=60+rc, xA=xC+rc+ra;
  s+=circ(xC,cy,rc,{fill:"var(--cat3)",op:0.85,stroke:"var(--surface)",sw:2});
  s+=circ(xA,cy,ra,{fill:"var(--cat1)",op:0.75,stroke:"var(--surface)",sw:2});
  s+=txt(xC,cy+6,c.f,{anchor:"middle",size:15,w:700,fill:"var(--paper)"});
  s+=txt(xA,cy+6,a.f,{anchor:"middle",size:15,w:700,fill:"var(--paper)"});
  s+=txt(xC,cy+ra+34,c.r+" pm",{anchor:"middle",size:11,fill:"var(--ink-3)",mono:true});
  s+=txt(xA,cy+ra+34,a.r+" pm",{anchor:"middle",size:11,fill:"var(--ink-3)",mono:true});
  s+=line(xC,cy-ra-16,xA,cy-ra-16,{c:"var(--accent)",w:2,cap:"round"});
  s+=line(xC,cy-ra-22,xC,cy-ra-10,{c:"var(--accent)",w:2}); s+=line(xA,cy-ra-22,xA,cy-ra-10,{c:"var(--accent)",w:2});
  s+=txt((xC+xA)/2,cy-ra-24,"d = "+d+" pm",{anchor:"middle",size:12,w:600,fill:"var(--accent)",mono:true});
  s+=txt(xC-rc,H-16,formulaOf(c,a)+"  ·  z₊z₋ = "+c.z+"·"+a.z+" = "+(c.z*a.z),{size:12.5,w:700,fill:"var(--ink)"});
  /* sloupce vpravo */
  var L=420,R=720, yb=60, bh=26, gap=44, Umax=4200;
  var xw=function(v){return (R-L)*Math.min(1,v/Umax);};
  function bar(y,label,val,col,unit){
    var t='';
    t+=txt(L,y-6,label,{size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
    t+=rect(L,y,R-L,bh,{fill:"var(--surface-3)",r:5});
    t+=rect(L,y,xw(val),bh,{fill:col,r:5});
    t+=txt(L+xw(val)+8,y+18,fmt(val,0)+" "+unit,{size:12,w:600,fill:col,mono:true});
    return t;
  }
  s+=bar(yb,"COULOMBŮV ODHAD (Kapustinského vztah)",U,"var(--accent)","kJ/mol");
  if(tab){ s+=bar(yb+gap*1.4,"TABULKOVÁ MŘÍŽKOVÁ ENERGIE",tab[0],"var(--cat4)","kJ/mol"); }
  else { s+=txt(L,yb+gap*1.4+16,"tabulková hodnota pro tuto dvojici není v souboru",{size:11,fill:"var(--ink-3)"}); }
  if(tab){
    var mpmax=3000;
    var y3=yb+gap*2.8;
    s+=txt(L,y3-6,"TEPLOTA TÁNÍ",{size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
    s+=rect(L,y3,R-L,bh,{fill:"var(--surface-3)",r:5});
    s+=rect(L,y3,(R-L)*Math.min(1,tab[1]/mpmax),bh,{fill:"var(--exo)",r:5});
    s+=txt(L+(R-L)*Math.min(1,tab[1]/mpmax)+8,y3+18,fmt(tab[1],0)+" °C",{size:12,w:600,fill:"var(--exo)",mono:true});
  }
  s+=txt(L,H-16,"měřítko sloupců: 0 – 4200 kJ/mol (MgO ≈ 3800)",{size:10.5,fill:"var(--ink-3)"});
  $("#latWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Mřížková energie z Coulombova zákona"');
  function ro(id,k,v,h,c2){ var e=$(id); e.innerHTML='<span class="k">'+k+'</span><span class="v" style="color:'+(c2||"var(--ink)")+'">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#latRo1","Vzdálenost iontů d",d+" pm",c.r+" + "+a.r+" pm (Shannonovy poloměry)");
  ro("#latRo2","Odhad mřížkové energie",fmt(U,0)+" kJ·mol⁻¹","∝ z₊z₋/d · ν = "+nu+" iontů ve vzorci","var(--accent)");
  ro("#latRo3",tab?"Tabulka · teplota tání":"Tabulka",tab?fmt(tab[0],0)+" · "+fmt(tab[1],0)+" °C":"—",tab?"kJ·mol⁻¹ · °C":"není k dispozici","var(--cat4)");
  $("#latEq").innerHTML='<span class="q">U</span> ≈ 1,2025·10⁵ · '+nu+' · '+c.z+' · '+a.z+' / '+d+' · (1 − 34,5/'+d+') = <b>'+fmt(U,0)+' kJ·mol⁻¹</b>'+
    (tab?' <span style="color:var(--ink-3)">· tabulka '+tab[0]+' (odchylka '+fmt(100*Math.abs(U-tab[0])/tab[0],0)+' %)</span>':'');
  var note;
  if(c.z*a.z>=4) note="Dvojnásobné náboje na obou iontech → čtyřnásobná energie oproti 1+/1− při stejné vzdálenosti. Proto oxidy kovů alkalických zemin tají nad 2000 °C a&nbsp;jsou tak tvrdé.";
  else if(c.z*a.z===2) note="Jeden ion dvojnásobně nabitý: energie zhruba 2–3× větší než u&nbsp;NaCl. Teplota tání ale nemusí být úměrná — hraje roli i&nbsp;typ mřížky a&nbsp;podíl kovalentního charakteru.";
  else note="Ionty 1+/1−: energie klesá s&nbsp;rostoucí velikostí iontů. Zkuste Li⁺F⁻ (nejmenší ionty, 1037) proti Cs⁺I⁻ (největší, 604) — a&nbsp;porovnejte teploty tání. Pak přepněte na Mg²⁺O²⁻.";
  $("#latNote").innerHTML="Zkuste nastavit různé dvojice a&nbsp;sledujte sloupce. "+note;
}
function initLat(){
  var sc=$("#latCat"), sa=$("#latAn");
  sc.innerHTML=CATIONS.map(function(c,i){return '<option value="'+i+'">'+c.f+' ('+c.r+' pm)</option>';}).join("");
  sa.innerHTML=ANIONS.map(function(a,i){return '<option value="'+i+'">'+a.f+' ('+a.r+' pm)</option>';}).join("");
  sc.value="1"; sa.value="1";
  sc.addEventListener("change",function(){ latState.c=+sc.value; drawLat(); });
  sa.addEventListener("change",function(){ latState.a=+sa.value; drawLat(); });
}

/* ============================================================
   12 · KRYSTAL NaCl — posun vrstvy, tavenina, roztok
   ============================================================ */
var ionState={mode:"pevna",shifted:false};
function drawIon(){
  var W=760,H=320, s='', rnd=rng(11);
  var mode=ionState.mode;
  if(mode==="pevna"){
    var cols=9, rows=5, x0=140, y0=60, d=58;
    var sh=ionState.shifted;
    if(sh){
      s+=line(x0-40,y0+1.5*d,x0+cols*d,y0+1.5*d,{c:"var(--accent)",w:1.5,dash:"6 5"});
      s+=txt(x0+cols*d-4,y0+1.5*d-8,"rovina posunu",{anchor:"end",size:10.5,w:600,fill:"var(--accent)"});
    }
    for(var r=0;r<rows;r++) for(var c=0;c<cols;c++){
      var isNa=((r+c)%2===0);
      var cx=x0+c*d+(sh&&r<2?d:0), cy=y0+r*d;
      if(sh&&r<2&&c===cols-1) continue;
      if(sh&&r>=2&&r<3){ /* trhlina */ }
      s+=circ(cx,cy,isNa?14:22,{fill:isNa?"var(--cat3)":"var(--cat1)",op:isNa?0.9:0.7,stroke:"var(--surface)",sw:2});
      s+=txt(cx,cy+5,isNa?"+":"−",{anchor:"middle",size:15,w:700,fill:"var(--paper)"});
    }
    if(sh){
      /* odpudivé blesky mezi řadou 1 a 2 */
      for(var c2=1;c2<cols-1;c2+=2){
        var bx=x0+c2*d+d/2, by=y0+1.5*d;
        s+='<path d="M'+(bx-8)+' '+(by-16)+' l6 8 l-8 4 l10 12" style="fill:none;stroke:var(--bad);stroke-width:2.2;stroke-linecap:round"/>';
      }
      s+='<path d="M'+(x0-50)+' '+(y0+1.5*d+6)+' l40 -10 l30 14 l35 -12 l40 10 l30 -14 l35 12 l40 -10 l35 12 l40 -10 l35 12 l45 -12 l40 12" style="fill:none;stroke:var(--bad);stroke-width:3;stroke-linejoin:round"/>';
      s+=txt(W/2,H-12,"Stejné náboje se dostaly proti sobě → odpuzování → krystal se rozštípl podél roviny. To je křehkost.",{anchor:"middle",size:11.5,w:600,fill:"var(--bad)"});
    } else {
      s+=txt(W/2,H-12,"Každý Na⁺ má 6 sousedů Cl⁻ a naopak (v rovině 4, nad a pod ještě 2). Ionty jsou fixované — nepohybují se.",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
    }
  } else {
    /* elektrody */
    s+=rect(40,40,22,200,{fill:"var(--bad)",r:4,style:"fill-opacity:.7;"}); s+=txt(51,150,"−",{anchor:"middle",size:26,w:700,fill:"var(--paper)"});
    s+=rect(698,40,22,200,{fill:"var(--ok)",r:4,style:"fill-opacity:.7;"}); s+=txt(709,150,"+",{anchor:"middle",size:26,w:700,fill:"var(--paper)"});
    s+=txt(51,258,"katoda",{anchor:"middle",size:10.5,fill:"var(--ink-3)"}); s+=txt(709,258,"anoda",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
    var n = mode==="tavenina" ? 30 : 16;
    for(var i=0;i<n;i++){
      var isNa2=(i%2===0);
      var px=100+rnd()*560, py=50+rnd()*190;
      if(mode==="roztok"){
        /* hydratační obal */
        for(var k=0;k<4;k++){
          var ang=k*Math.PI/2+0.4, ox=px+Math.cos(ang)*30, oy=py+Math.sin(ang)*30;
          /* voda: O + 2 H; k Na⁺ míří O, k Cl⁻ míří H */
          var toward = Math.atan2(py-oy,px-ox);
          var oxx = isNa2 ? ox : ox-Math.cos(toward)*8, oyy = isNa2 ? oy : oy-Math.sin(toward)*8;
          s+=circ(oxx,oyy,6,{fill:"var(--endo)",op:0.9});
          var ha=toward+(isNa2?Math.PI:0);
          s+=circ(oxx+Math.cos(ha+0.9)*9,oyy+Math.sin(ha+0.9)*9,3.2,{fill:"var(--endo)",op:0.45});
          s+=circ(oxx+Math.cos(ha-0.9)*9,oyy+Math.sin(ha-0.9)*9,3.2,{fill:"var(--endo)",op:0.45});
        }
      }
      s+=circ(px,py,isNa2?12:18,{fill:isNa2?"var(--cat3)":"var(--cat1)",op:isNa2?0.9:0.7,stroke:"var(--surface)",sw:2});
      s+=txt(px,py+5,isNa2?"+":"−",{anchor:"middle",size:14,w:700,fill:"var(--paper)"});
      var dir=isNa2?-1:1;
      s+=arrow(px+dir*(isNa2?16:22),py,px+dir*(isNa2?40:46),py,{c:isNa2?"var(--cat3)":"var(--cat1)",w:1.8,ah:6});
    }
    s+=txt(W/2,H-12, mode==="tavenina"
      ? "Roztavený NaCl (> 801 °C): ionty jsou volné, kationty putují ke katodě, anionty k anodě → proud teče, na elektrodách probíhá elektrolýza."
      : "Voda obklopila ionty (hydratace): k Na⁺ míří kyslíky δ−, k Cl⁻ vodíky δ+. Hydratované ionty se pohybují → roztok vede.",
      {anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  }
  $("#ionWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Model krystalu chloridu sodného"');
  $$("#ionMode button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===mode); });
  $("#ionShift").disabled = mode!=="pevna";
  $("#ionReset").disabled = mode!=="pevna";
  function ro(id,k,v,h,c){ var e=$(id); e.innerHTML='<span class="k">'+k+'</span><span class="v" style="color:'+(c||"var(--ink)")+'">'+v+'</span><span class="h">'+h+'</span>'; }
  if(mode==="pevna"){
    ro("#ionRo1","Vede proud?","NE","ionty jsou nosiče, ale nemohou se pohybovat","var(--bad)");
    ro("#ionRo2","Nosiče náboje","Na⁺, Cl⁻ — fixované","žádné volné elektrony");
    ro("#ionRo3","Mechanicky",ionState.shifted?"ROZŠTÍPNUT":"tvrdý, ale křehký",ionState.shifted?"stejné náboje proti sobě":"posun vrstvy = lom",ionState.shifted?"var(--bad)":"var(--ink)");
    $("#ionNote").innerHTML="Klikněte na <b>Posunout horní vrstvu</b>: v&nbsp;kovu by se nic nestalo, tady se Na⁺ dostane nad Na⁺ a&nbsp;Cl⁻ nad Cl⁻ — stejné náboje se odpuzují a&nbsp;krystal pukne. Přesně to se stane, když do soli udeříte kladivem.";
  } else if(mode==="tavenina"){
    ro("#ionRo1","Vede proud?","ANO","ionty jsou pohyblivé","var(--ok)");
    ro("#ionRo2","Nosiče náboje","Na⁺ → katoda, Cl⁻ → anoda","iontová vodivost = elektrolýza");
    ro("#ionRo3","Na elektrodách","Na(l) · Cl₂(g)","chemická změna — na rozdíl od kovu","var(--warn)");
    $("#ionNote").innerHTML="Tavenina vede — a&nbsp;právě takhle se průmyslově vyrábí sodík, hořčík a&nbsp;hliník (elektrolýza taveniny). Všimněte si, že u&nbsp;kovu proud teče beze změny látky, tady se látka na elektrodách rozkládá.";
  } else {
    ro("#ionRo1","Vede proud?","ANO","hydratované ionty jsou pohyblivé","var(--ok)");
    ro("#ionRo2","Nosiče náboje","Na⁺(aq), Cl⁻(aq)","ion–dipólová interakce s vodou");
    ro("#ionRo3","Energie","mřížková +787 · hydratační −784","ΔH rozpouštění ≈ +4 kJ·mol⁻¹");
    $("#ionNote").innerHTML="Voda ionty <b>hydratuje</b> — kyslík (δ−) k&nbsp;Na⁺, vodíky (δ+) k&nbsp;Cl⁻. Energie hydratace téměř vyrovná mřížkovou energii, proto se sůl rozpouští skoro bez tepelného efektu. V&nbsp;benzenu (nepolární) by se nic z&nbsp;toho nestalo a&nbsp;sůl by zůstala na dně.";
  }
}
function initIon(){
  $$("#ionMode button").forEach(function(b){ b.addEventListener("click",function(){ ionState.mode=b.dataset.v; ionState.shifted=false; drawIon(); }); });
  $("#ionShift").addEventListener("click",function(){ ionState.shifted=true; drawIon(); toast("Krystal se rozštípl — stejné náboje proti sobě."); });
  $("#ionReset").addEventListener("click",function(){ ionState.shifted=false; drawIon(); });
}
