/* ============================================================
   T19 · RYCHLOPRŮCHOD — tři mini-grafy
   ============================================================ */

/* (A) stupnice pH s typickými roztoky — blok s1 */
function drawMiniScale(){
  var W=760,H=190,L=58,R=712,y=74,h=30;
  var X=function(p){ return L+(R-L)*clamp(p,0,14)/14; };
  var s='';
  s+=txt(L,26,"STUPNICE pH — JEDNA JEDNOTKA = DESETINÁSOBEK KONCENTRACE",{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  for(var i=0;i<14;i++){
    var col=i<7?"var(--exo)":"var(--endo)", op=i<7?(0.10+(6-i)/6*0.62):(0.10+(i-7)/6*0.62);
    s+='<rect x="'+X(i)+'" y="'+y+'" width="'+((R-L)/14).toFixed(2)+'" height="'+h+'" style="fill:'+col+';fill-opacity:'+op.toFixed(2)+'"/>';
  }
  for(var p=0;p<=14;p++){
    s+=line(X(p),y+h,X(p),y+h+5,{c:"var(--ink-3)"});
    s+=txt(X(p),y+h+19,p,{anchor:"middle",size:11,fill:"var(--ink-2)",mono:true,w:600});
    s+=txt(X(p),y-8,"10"+sup(-p),{anchor:"middle",size:9.5,fill:"var(--ink-3)",mono:true});
  }
  s+=txt(L-8,y-8,"[H₃O⁺]",{anchor:"end",size:10,w:600,fill:"var(--ink-3)"});
  s+=txt(L-8,y+h+19,"pH",{anchor:"end",size:11,w:600,fill:"var(--ink-3)"});
  var marks=[
    {p:1.0,t:"0,1 M HCl",up:true},{p:1.5,t:"žaludeční šťáva",up:false},
    {p:2.88,t:"0,1 M CH₃COOH",up:true},{p:4.76,t:"acetátový pufr 1 : 1",up:false},
    {p:7.0,t:"čistá voda",up:true},{p:7.40,t:"krev",up:false},
    {p:8.88,t:"0,1 M CH₃COONa",up:true},{p:11.13,t:"0,1 M NH₃",up:false},
    {p:12.70,t:"0,05 M NaOH",up:true}
  ];
  marks.forEach(function(m){
    var x=X(m.p), yy=m.up?y-30:y+h+34;
    s+=line(x,m.up?y-2:y+h+2,x,m.up?yy+4:yy-10,{c:"var(--ink-3)",w:1});
    s+=txt(x,yy,m.t,{anchor:"middle",size:10.5,w:600,fill:"var(--ink-2)"});
    s+=dot(x,m.up?y:y+h,"var(--accent)",4);
  });
  s+=txt(L,y+h+58,"KYSELÉ",{size:10.5,w:600,fill:"var(--exo)",style:"letter-spacing:.09em"});
  s+=txt(R,y+h+58,"ZÁSADITÉ",{anchor:"end",size:10.5,w:600,fill:"var(--endo)",style:"letter-spacing:.09em"});
  $("#mScaleWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Stupnice pH s typickými roztoky"');
}

/* (B) titrační křivka slabá kyselina + silná zásada — blok s6 */
function drawMiniTitr(){
  var W=760,H=300;
  var fr=frame({L:58,R:640,T:26,B:242,x0:0,x1:50,y0:0,y1:14,xt:10,yt:2,
    xf:function(v){return fmt(v,0);},yf:function(v){return fmt(v,0);},
    xl:"přidaný NaOH 0,100 M [mL]",yl:"pH"});
  var s='';
  var va=25/11, vb=25*10/11;
  s+=rect(fr.X(va),fr.T,fr.X(vb)-fr.X(va),fr.B-fr.T,{fill:"var(--endo)",style:"fill-opacity:.10"});
  s+=fr.s;
  s+=line(fr.X(0),fr.Y(7),fr.X(50),fr.Y(7),{c:"var(--ink-3)",w:1,dash:"3 4"});
  var pts=[], pts2=[];
  for(var v=0;v<=50.001;v+=0.2){ var vv=Math.round(v*10)/10;
    pts.push(fr.X(vv).toFixed(1)+","+fr.Y(tiPH("wa",vv).pH).toFixed(1));
    pts2.push(fr.X(vv).toFixed(1)+","+fr.Y(tiPH("sa",vv).pH).toFixed(1));
  }
  s+=poly(pts2,"var(--ink-3)",1.6,"5 4");
  s+=poly(pts,"var(--accent)",3);
  /* body */
  s+=dot(fr.X(12.5),fr.Y(4.76),"var(--endo)",5);
  s+=txt(fr.X(12.5)+8,fr.Y(4.76)+16,"½ titrace: pH = pKa = 4,76",{size:11,w:600,fill:"var(--endo)",mono:true});
  s+=dot(fr.X(25),fr.Y(8.73),"var(--ink)",6);
  s+=txt(fr.X(25)+10,fr.Y(8.73)+4,"ekvivalence 8,73",{size:11.5,w:600,fill:"var(--ink)",mono:true});
  s+=dot(fr.X(0),fr.Y(2.88),"var(--accent)",4);
  s+=txt(fr.X(0)+8,fr.Y(2.88)-8,"start 2,88",{size:11,w:600,fill:"var(--accent)",mono:true});
  s+=txt(fr.X(6),fr.T+16,"pufrovací oblast",{size:10.5,w:600,fill:"var(--endo)"});
  /* indikátory vpravo */
  var bx=660;
  s+=rect(bx,fr.Y(10.0),56,fr.Y(8.2)-fr.Y(10.0),{fill:"var(--cat2)",r:4,style:"fill-opacity:.35"});
  s+=txt(bx+28,(fr.Y(10.0)+fr.Y(8.2))/2+4,"FF",{anchor:"middle",size:11,w:700,fill:"var(--cat2)"});
  s+=txt(bx+28,fr.Y(8.2)+16,"vhodný",{anchor:"middle",size:9.5,fill:"var(--ok)"});
  s+=rect(bx,fr.Y(4.4),56,fr.Y(3.1)-fr.Y(4.4),{fill:"var(--cat3)",r:4,style:"fill-opacity:.35"});
  s+=txt(bx+28,(fr.Y(4.4)+fr.Y(3.1))/2+4,"MO",{anchor:"middle",size:11,w:700,fill:"var(--cat3)"});
  s+=txt(bx+28,fr.Y(3.1)+16,"selže",{anchor:"middle",size:9.5,fill:"var(--bad)"});
  s+=txt(bx,fr.T+2,"INDIKÁTOR",{size:9.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  s+=txt(58,H-6,"plná čára: CH₃COOH + NaOH  ·  čárkovaně: HCl + NaOH (skok od 3,7 do 10,3)",{size:10.5,fill:"var(--ink-3)"});
  $("#mTitrWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Titrační křivka slabé kyseliny se silnou zásadou"');
}

/* (C) rozpustnost versus společný iont — blok s8 */
function drawMiniCi(){
  var W=760,H=280;
  var x1=kspFind("AgCl"), x2=kspFind("PbI₂");
  var fr=frame({L:66,R:720,T:26,B:222,x0:-5,x1:0,y0:-9,y1:-1,xt:1,yt:1,
    xf:function(v){return "10"+sup(v);},yf:function(v){return "10"+sup(v);},
    xl:"koncentrace přidaného společného iontu [mol·dm⁻³]",yl:"rozpustnost s"});
  var s=fr.s;
  [[x1,"var(--accent)","AgCl v NaCl — sklon −1"],[x2,"var(--cat2)","PbI₂ v KI — sklon −2"]].forEach(function(p){
    var x=p[0], pts=[];
    for(var e=-5;e<=0.001;e+=0.1){ var v=L10(ciExact(x,Math.pow(10,e))); if(v>=-9&&v<=-1) pts.push(fr.X(e).toFixed(1)+","+fr.Y(v).toFixed(1)); }
    s+=poly(pts,p[1],2.8);
    var s0=L10(solub(x));
    s+=line(fr.X(-5),fr.Y(s0),fr.X(-3.6),fr.Y(s0),{c:p[1],w:1.2,dash:"4 3"});
    s+=txt(fr.X(-4.95),fr.Y(s0)-7,"čistá voda "+sci(solub(x),2),{size:10.5,w:600,fill:p[1],mono:true});
  });
  s+=dot(fr.X(-1),fr.Y(L10(ciExact(x1,0.1))),"var(--accent)",5);
  s+=txt(fr.X(-1)-8,fr.Y(L10(ciExact(x1,0.1)))+4,"0,1 M NaCl → 1,8·10⁻⁹",{anchor:"end",size:11,w:600,fill:"var(--accent)",mono:true});
  s+=dot(fr.X(-1),fr.Y(L10(ciExact(x2,0.1))),"var(--cat2)",5);
  s+=txt(fr.X(-1)-8,fr.Y(L10(ciExact(x2,0.1)))+4,"0,1 M KI → 9,8·10⁻⁷",{anchor:"end",size:11,w:600,fill:"var(--cat2)",mono:true});
  s+=txt(66,H-6,"Le Chatelier: přidaný společný iont posune rovnováhu doleva a rozpustnost klesne o řády",{size:10.5,fill:"var(--ink-3)"});
  $("#mCiWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Vliv společného iontu na rozpustnost"');
}
