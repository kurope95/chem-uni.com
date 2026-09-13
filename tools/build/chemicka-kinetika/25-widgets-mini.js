/* ============================================================
   25 · MINI-GRAFY RYCHLOPRŮCHODU (statické, kreslené JS)
   ============================================================ */

/* (A) c(t) pro tři řády vedle sebe + tečna a poločas — blok s3 */
function drawMiniCt(){
  var W=760,H=250;
  var s='';
  s+=txt(20,20,"TŘI ŘÁDY, TŘI TVARY KŘIVKY — VŠUDE [A]₀ = 1,0 mol·dm⁻³",{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  function pane(ox,order,k,title,note){
    var L=ox+42,R=ox+228,T=44,B=190, TMAX=20, t='';
    var x=function(tt){ return L+(tt/TMAX)*(R-L); };
    var y=function(c){ return B-c*(B-T); };
    t+=rect(ox+6,32,236,H-52,{fill:"var(--surface-2)",r:10,stroke:"var(--line)",sw:1});
    t+=txt(ox+16,50,title,{size:11.5,w:700,fill:"var(--accent)",style:"letter-spacing:.05em"});
    t+=line(L,T+8,L,B,{c:"var(--line-strong)",w:1.2});
    t+=line(L,B,R+4,B,{c:"var(--line-strong)",w:1.2});
    t+=txt(L-6,y(1)+4,"1",{anchor:"end",size:9.5,fill:"var(--ink-3)",mono:true});
    t+=txt(L-6,y(0.5)+4,"½",{anchor:"end",size:9.5,fill:"var(--ink-3)",mono:true});
    t+=txt(R,B+14,"t",{anchor:"end",size:10,fill:"var(--ink-3)",mono:true});
    /* křivka */
    var pts=[];
    for(var tt=0;tt<=TMAX;tt+=0.2){ pts.push(x(tt).toFixed(1)+","+y(Math.max(0,cOf(order,k,1,tt))).toFixed(1)); }
    t+='<polyline points="'+pts.join(" ")+'" style="fill:none;stroke:var(--exo);stroke-width:2.4;stroke-linejoin:round"/>';
    /* poločas */
    var th=tHalf(order,k,1);
    if(th<TMAX){
      t+=line(L,y(0.5),x(th),y(0.5),{c:"var(--ink-3)",w:1,dash:"3 3"});
      t+=line(x(th),y(0.5),x(th),B,{c:"var(--ink-3)",w:1,dash:"3 3"});
      t+=txt(x(th)+4,B-6,"t½",{size:10,w:600,fill:"var(--ink-3)",mono:true});
    }
    /* tečna v t = 4 */
    var t0=4, c0=cOf(order,k,1,t0), v=vOf(order,k,c0);
    var dx=4.5, y1=Math.min(1,c0+v*dx), y2=Math.max(0,c0-v*dx);
    var xa=t0-(y1-c0)/(v||1e-9), xb=t0+(c0-y2)/(v||1e-9);
    t+=line(x(Math.max(0,xa)),y(y1),x(Math.min(TMAX,xb)),y(y2),{c:"var(--accent)",w:2,cap:"round"});
    t+='<circle cx="'+x(t0)+'" cy="'+y(c0)+'" r="4.5" style="fill:var(--surface);stroke:var(--accent);stroke-width:2"/>';
    t+=txt(ox+124,B+34,note,{anchor:"middle",size:10.5,w:600,fill:"var(--ink-2)"});
    return t;
  }
  s+=pane(0,0,0.06,"0. ŘÁD · [A] = [A]₀ − kt","přímka · t½ = [A]₀/2k");
  s+=pane(254,1,0.14,"1. ŘÁD · [A] = [A]₀·e⁻ᵏᵗ","exponenciála · t½ = 0,693/k");
  s+=pane(508,2,0.30,"2. ŘÁD · 1/[A] = 1/[A]₀ + kt","t½ = 1/(k[A]₀) · prodlužuje se");
  s+=txt(W/2,H-4,"červená tečna = okamžitá rychlost; u 0. řádu má pořád stejný sklon, u 2. řádu nejrychleji vyhasíná",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  var el=$("#miniCtWrap"); if(el) el.innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Křivky koncentrace pro nultý, první a druhý řád"');
}

/* (B) energetický profil bez a s katalyzátorem — blok s6 */
function drawMiniProf(){
  var W=760,H=250, L=70,R=690,T=46,B=196;
  var s='';
  s+=txt(20,20,"ENERGETICKÝ PROFIL — CO Z NĚJ ČTETE",{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  var yR=B-46, yP=B-14, yK=T+14, yKc=T+62;
  s+=line(L-16,T-6,L-16,B+6,{c:"var(--line-strong)",w:1.5});
  s+='<path d="M'+(L-16)+' '+(T-14)+' l-4 8 l8 0 z" style="fill:var(--line-strong)"/>';
  s+=line(L-16,B+6,R+20,B+6,{c:"var(--line-strong)",w:1.5});
  s+='<path d="M'+(R+26)+' '+(B+6)+' l-8 -4 l0 8 z" style="fill:var(--line-strong)"/>';
  s+=txt(28,(T+B)/2,"energie",{anchor:"middle",size:11,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:28px "+((T+B)/2)+"px;letter-spacing:.09em;text-transform:uppercase"});
  s+=txt((L+R)/2,B+30,"reakční koordináta",{anchor:"middle",size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em;text-transform:uppercase"});
  s+=line(L,yR,R,yR,{c:"var(--line)",w:1,dash:"3 4"});
  s+=line(L,yP,R,yP,{c:"var(--line)",w:1,dash:"3 4"});
  var mid=(L+R)/2;
  function curve(peak,col,w,dash){
    var d="M"+L+" "+yR+" L"+(L+90)+" "+yR+" C"+(mid-90)+" "+yR+" "+(mid-70)+" "+peak+" "+mid+" "+peak+
          " C"+(mid+70)+" "+peak+" "+(mid+90)+" "+yP+" "+(R-90)+" "+yP+" L"+R+" "+yP;
    return '<path d="'+d+'" style="fill:none;stroke:'+col+';stroke-width:'+w+';stroke-linecap:round;'+(dash?"stroke-dasharray:"+dash+";":"")+'"/>';
  }
  s+=curve(yK,"var(--ink-2)",2.6,"");
  s+=curve(yKc,"var(--ok)",2.4,"7 4");
  s+='<circle cx="'+mid+'" cy="'+yK+'" r="5" style="fill:var(--surface);stroke:var(--ink-2);stroke-width:2"/>';
  s+=txt(mid,yK-10,"aktivovaný komplex ‡",{anchor:"middle",size:11,w:600,fill:"var(--ink-2)"});
  s+=txt(mid+8,yKc-8,"s katalyzátorem — nižší Eₐ",{size:10.5,w:600,fill:"var(--ok)"});
  s+=vArrow(L+104,yR,yK,"var(--accent)","Eₐ(→)","right");
  s+=vArrow(R-104,yP,yK,"var(--cat3)","Eₐ(←)","left");
  s+=vArrow(R-30,yR,yP,"var(--exo)","ΔH < 0","left");
  s+=txt(L,yR-10,"výchozí látky",{size:11.5,w:600,fill:"var(--ink)"});
  s+=txt(R,yP+18,"produkty",{anchor:"end",size:11.5,w:600,fill:"var(--ink)"});
  s+=txt(W/2,H-6,"katalyzátor sníží obě aktivační energie o stejnou hodnotu — ΔH i rovnováha zůstávají beze změny",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  var el=$("#miniProfWrap"); if(el) el.innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Energetický profil bez katalyzátoru a s katalyzátorem"');
}

/* (C) Maxwell–Boltzmann: dvě teploty a podíl nad Ea — blok s7 */
function drawMiniMb(){
  var W=760,H=230,L=56,R=700,T=34,B=178, XMAX=100;
  var s='';
  var x=function(u){ return L+(u/XMAX)*(R-L); };
  function curve(tau){
    var arr=[],sum=0,N=160;
    for(var i=0;i<=N;i++){ var u=XMAX*i/N, f=Math.sqrt(u)*Math.exp(-u/tau); arr.push(f); sum+=f; }
    return arr.map(function(f){ return f/sum*N; });
  }
  var c1=curve(25), c2=curve(34);
  var ymax=Math.max.apply(null,c1)*1.12;
  var y=function(f){ return B-(f/ymax)*(B-T); };
  var xEa=58, i0=Math.ceil(xEa/XMAX*(c1.length-1));
  s+=txt(20,20,"PROČ +10 °C ZDVOJNÁSOBÍ RYCHLOST — ROZHODUJE OCAS ROZDĚLENÍ",{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  s+=line(L,T-6,L,B,{c:"var(--line-strong)",w:1.5});
  s+=line(L,B,R+12,B,{c:"var(--line-strong)",w:1.5});
  s+=txt(24,(T+B)/2,"počet částic",{anchor:"middle",size:10.5,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:24px "+((T+B)/2)+"px;letter-spacing:.08em;text-transform:uppercase"});
  s+=txt((L+R)/2,B+26,"kinetická energie částic →",{anchor:"middle",size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em;text-transform:uppercase"});
  function area(c,col,op){
    var p=[x(xEa).toFixed(1)+","+B];
    for(var i=i0;i<c.length;i++){ p.push(x(XMAX*i/(c.length-1)).toFixed(1)+","+y(c[i]).toFixed(1)); }
    p.push(R+","+B);
    return '<polygon points="'+p.join(" ")+'" style="fill:'+col+';fill-opacity:'+op+'"/>';
  }
  function poly(c,col,w,dash){
    var p=[]; for(var i=0;i<c.length;i++){ p.push(x(XMAX*i/(c.length-1)).toFixed(1)+","+y(c[i]).toFixed(1)); }
    return '<polyline points="'+p.join(" ")+'" style="fill:none;stroke:'+col+';stroke-width:'+w+';'+(dash?"stroke-dasharray:"+dash+";":"")+'"/>';
  }
  s+=area(c2,"var(--endo)",".18");
  s+=area(c1,"var(--accent)",".32");
  s+=poly(c2,"var(--endo)",2,"6 4");
  s+=poly(c1,"var(--ink-2)",2.6,"");
  s+=line(x(xEa),T-2,x(xEa),B,{c:"var(--accent)",w:2,dash:"5 4"});
  s+=txt(x(xEa)+8,T+10,"Eₐ",{size:13,w:700,fill:"var(--accent)"});
  s+=txt(x(xEa)+8,T+26,"vpravo: částice s E ≥ Eₐ — jen ty mohou reagovat",{size:10.5,fill:"var(--ink-3)"});
  s+=txt(x(22),y(Math.max.apply(null,c1))-10,"T",{anchor:"middle",size:12,w:700,fill:"var(--ink-2)"});
  s+=txt(x(38),y(Math.max.apply(null,c2))-24,"T + 10 K",{anchor:"middle",size:11.5,w:700,fill:"var(--endo)"});
  s+=txt(W/2,H-6,"průměrná energie vzroste o pár procent, ale plocha za Eₐ se skoro zdvojnásobí — to je van 't Hoffovo pravidlo",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  var el=$("#miniMbWrap"); if(el) el.innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Maxwell-Boltzmannovo rozdělení při dvou teplotách"');
}
