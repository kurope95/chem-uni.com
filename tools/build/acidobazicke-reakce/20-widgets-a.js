/* ============================================================
   T1 · WIDGET — stupnice pH (hero)
   ============================================================ */
var heroPH=7.0;
function drawHero(){
  var pH=heroPH;
  var W=760,H=330,L=54,R=706,yBar=168,hBar=26;
  var x=function(p){ return L+(p/14)*(R-L); };
  var s='';
  /* barevný pruh univerzálního indikátoru po půl jednotkách */
  for(var p=0;p<14;p+=0.5){
    s+='<rect x="'+x(p).toFixed(1)+'" y="'+yBar+'" width="'+((R-L)/28+0.6).toFixed(1)+'" height="'+hBar+'" style="fill:'+univColor(p+0.25)+'"/>';
  }
  s+=rect(L,yBar,R-L,hBar,{fill:"none",stroke:"var(--line-strong)",sw:1.2,r:4});
  /* dílky */
  for(var i=0;i<=14;i++){
    s+=line(x(i),yBar+hBar,x(i),yBar+hBar+6,{c:"var(--line-strong)",w:1});
    s+=txt(x(i),yBar+hBar+20,i,{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)",mono:true});
  }
  s+=txt(L,yBar+hBar+38,"KYSELÉ ← [H₃O⁺] > [OH⁻]",{size:10.5,w:600,fill:"var(--exo)",style:"letter-spacing:.07em"});
  s+=txt(R,yBar+hBar+38,"[OH⁻] > [H₃O⁺] → ZÁSADITÉ",{anchor:"end",size:10.5,w:600,fill:"var(--endo)",style:"letter-spacing:.07em"});
  s+=txt(x(7),yBar+hBar+38,"NEUTRÁLNÍ",{anchor:"middle",size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.07em"});
  /* látky nad pruhem ve třech řadách */
  var rows=[yBar-14,yBar-40,yBar-66];
  PHSUB.forEach(function(sub,i){
    var xx=x(sub.pH), ry=rows[i%3];
    var near=Math.abs(sub.pH-pH)<0.35;
    s+=line(xx,ry+4,xx,yBar-2,{c:near?"var(--accent)":"var(--line)",w:near?1.5:1,dash:near?"":"2 3"});
    s+=txt(xx,ry,sub.n,{anchor:"middle",size:near?11:10,w:near?700:500,fill:near?"var(--accent)":"var(--ink-2)"});
  });
  s+=txt(L,rows[2]-22,"BĚŽNÉ LÁTKY A JEJICH pH",{size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  /* ukazatel aktuálního pH */
  var xp=x(pH);
  s+='<path d="M'+xp+' '+(yBar-4)+' l-7 -11 l14 0 z" style="fill:var(--ink)"/>';
  s+=line(xp,yBar-2,xp,yBar+hBar+2,{c:"var(--ink)",w:2});
  /* indikátory při daném pH */
  var iy=yBar+hBar+62;
  s+=txt(L,iy-14,"CO UKÁŽOU INDIKÁTORY PŘI TOMTO pH",{size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  var show=[IND[0],IND[1],IND[2],IND[3],IND[5]];
  var cw=(R-L)/show.length;
  show.forEach(function(ind,i){
    var cx=L+cw*i+14;
    var col=indColor(ind,pH);
    s+='<circle cx="'+cx+'" cy="'+(iy+12)+'" r="10" style="fill:'+col+';stroke:var(--line-strong);stroke-width:1"/>';
    s+=txt(cx+18,iy+9,ind.n,{size:11,w:600,fill:"var(--ink)"});
    s+=txt(cx+18,iy+22,indLabel(ind,pH),{size:10,fill:"var(--ink-3)"});
  });
  var ux=L+cw*show.length-2;
  $("#heroWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Stupnice pH s běžnými látkami a indikátory"');
  $("#heroPHV").textContent=fmt(pH,1);
  var h3o=Math.pow(10,-pH), oh=Math.pow(10,pH-14), poh=14-pH;
  function ro(id,k,v,h,cls){ var e=$(id); e.className="readout "+(cls||""); e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#heroRo1","[H₃O⁺]",sci(h3o)+" mol·dm⁻³","pH = −log [H₃O⁺] = "+fmt(pH,1),pH<7?"neg":"");
  ro("#heroRo2","[OH⁻]",sci(oh)+" mol·dm⁻³","pOH = "+fmt(poh,1)+" · pH + pOH = 14",pH>7?"pos":"");
  var ch = pH<6.5?"kyselý":(pH>7.5?"zásaditý":"≈ neutrální");
  ro("#heroRo3","Charakter roztoku",ch,"univerzální indikátor: "+univName(pH)+" · [H₃O⁺]·[OH⁻] = "+sci(h3o*oh,1));
  /* poznámka */
  var nearest=PHSUB.slice().sort(function(a,b){return Math.abs(a.pH-pH)-Math.abs(b.pH-pH);})[0];
  var ratio=Math.pow(10,Math.abs(pH-7));
  var nt;
  if(Math.abs(pH-7)<0.05) nt="Čistá voda při 25 °C: [H₃O⁺] = [OH⁻] = 10⁻⁷ mol·dm⁻³. Posuňte pH z&nbsp;6 na 3 — hodnota klesla o&nbsp;tři, ale koncentrace H₃O⁺ vzrostla <b>tisíckrát</b>. Stupnice je logaritmická.";
  else nt="Nejblíž je <b>"+nearest.n+"</b> (pH "+fmt(nearest.pH,1)+"). Roztok o&nbsp;pH "+fmt(pH,1)+" má "+(pH<7?"<b>"+sci(ratio,1)+"×</b> víc H₃O⁺":"<b>"+sci(ratio,1)+"×</b> víc OH⁻")+" než čistá voda. Součin [H₃O⁺]·[OH⁻] je přitom pořád 10⁻¹⁴ — zvednete jedno, druhé klesne.";
  $("#heroNote").innerHTML=nt;
}

/* ============================================================
   T2 · GRAF — iontový součin vody podle teploty
   ============================================================ */
var kwT=25;
function drawKw(){
  var W=760,H=300,L=64,R=700,T0=36,B=246;
  var x=function(t){ return L+(t/100)*(R-L); };
  var kmax=56;
  var y=function(k){ return B-(k/kmax)*(B-T0); };
  var s='';
  for(var t=0;t<=100;t+=20){ s+=line(x(t),T0,x(t),B,{c:"var(--line)",w:1}); s+=txt(x(t),B+18,t,{anchor:"middle",size:11,fill:"var(--ink-3)",mono:true}); }
  for(var k=0;k<=50;k+=10){ s+=line(L,y(k),R,y(k),{c:"var(--line)",w:1}); s+=txt(L-8,y(k)+4,k,{anchor:"end",size:11,fill:"var(--ink-3)",mono:true}); }
  /* křivka */
  var pts=[];
  for(var tt=0;tt<=100;tt+=2){ var kw=Math.pow(10,-pKwAt(tt))*1e14; pts.push(x(tt).toFixed(1)+","+y(kw).toFixed(1)); }
  s+='<polyline points="'+pts.join(" ")+'" style="fill:none;stroke:var(--accent);stroke-width:2.5;stroke-linejoin:round;stroke-linecap:round"/>';
  /* referenční 25 °C */
  s+=line(x(25),T0,x(25),B,{c:"var(--line-strong)",w:1,dash:"4 4"});
  s+=txt(x(25)+5,T0+12,"25 °C · Kw = 1,0·10⁻¹⁴",{size:10.5,w:600,fill:"var(--ink-3)"});
  /* aktuální */
  var pkw=pKwAt(kwT), kwv=Math.pow(10,-pkw)*1e14;
  s+=line(x(kwT),T0-4,x(kwT),B+4,{c:"var(--ink)",w:1.5,dash:"5 4"});
  s+='<circle cx="'+x(kwT)+'" cy="'+y(kwv)+'" r="6" style="fill:var(--accent);stroke:var(--surface);stroke-width:2"/>';
  s+=rect(x(kwT)-34,T0-24,68,17,{fill:"var(--ink)",r:4});
  s+=txt(x(kwT),T0-11,fmt(kwT,0)+" °C",{anchor:"middle",size:11,w:600,fill:"var(--paper)",mono:true});
  s+=txt((L+R)/2,B+38,"teplota [°C]",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em;text-transform:uppercase"});
  s+=txt(18,(T0+B)/2,"Kw · 10¹⁴",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:18px "+((T0+B)/2)+"px;letter-spacing:.08em"});
  $("#kwWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Závislost iontového součinu vody na teplotě"');
  $("#kwTV").textContent=fmt(kwT,0)+" °C";
  function ro(id,k,v,h){ var e=$(id); e.className="readout"; e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#kwRo1","<span class='q'>K</span><sub>w</sub> při "+fmt(kwT,0)+" °C",sci(Math.pow(10,-pkw),2),"p<span class='q'>K</span><sub>w</sub> = "+fmt(pkw,2));
  ro("#kwRo2","Neutrální pH",fmt(pkw/2,2),"[H₃O⁺] = [OH⁻] = "+sci(Math.sqrt(Math.pow(10,-pkw)),1));
  ro("#kwRo3","pH + pOH",fmt(pkw,2),kwT===25?"= 14 přesně jen při 25 °C":"ne 14 — součet je p<span class='q'>K</span><sub>w</sub>");
}

/* ============================================================
   T3 · WIDGET — indikátory
   ============================================================ */
var indPH=7.0;
function drawInd(){
  var pH=indPH;
  var W=760,rowH=40,top=40,L=170,R=720;
  var H=top+rowH*(IND.length+1)+30;
  var x=function(p){ return L+(p/14)*(R-L); };
  var s='';
  for(var i=0;i<=14;i++){ s+=line(x(i),top-6,x(i),H-26,{c:"var(--line)",w:1}); s+=txt(x(i),top-12,i,{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true}); }
  s+=txt(L,14,"pH →",{size:10.5,w:600,fill:"var(--ink-3)"});
  IND.forEach(function(ind,i){
    var yy=top+rowH*i+6;
    s+=txt(L-10,yy+18,ind.n,{anchor:"end",size:11.5,w:600,fill:"var(--ink)"});
    /* pruh po desetinách */
    for(var p=0;p<14;p+=0.2){
      s+='<rect x="'+x(p).toFixed(1)+'" y="'+yy+'" width="'+((R-L)/70+0.5).toFixed(1)+'" height="24" style="fill:'+indColor(ind,p+0.1)+'"/>';
    }
    s+=rect(L,yy,R-L,24,{fill:"none",stroke:"var(--line-strong)",sw:1,r:3});
    /* přechodová oblast */
    s+=rect(x(ind.lo),yy-3,x(ind.hi)-x(ind.lo),30,{fill:"none",stroke:"var(--ink)",sw:1.2,r:3,style:"stroke-dasharray:3 2"});
    s+=txt(x((ind.lo+ind.hi)/2),yy+37,fmt(ind.lo,1)+"–"+fmt(ind.hi,1),{anchor:"middle",size:9.5,w:600,fill:"var(--ink-2)",mono:true});
  });
  /* univerzální */
  var uy=top+rowH*IND.length+6;
  s+=txt(L-10,uy+18,"univerzální",{anchor:"end",size:11.5,w:600,fill:"var(--ink)"});
  for(var q=0;q<14;q+=0.5){ s+='<rect x="'+x(q).toFixed(1)+'" y="'+uy+'" width="'+((R-L)/28+0.6).toFixed(1)+'" height="24" style="fill:'+univColor(q+0.25)+'"/>'; }
  s+=rect(L,uy,R-L,24,{fill:"none",stroke:"var(--line-strong)",sw:1,r:3});
  /* aktuální pH */
  s+=line(x(pH),top-4,x(pH),H-26,{c:"var(--ink)",w:2});
  s+='<path d="M'+x(pH)+' '+(top-4)+' l-6 -9 l12 0 z" style="fill:var(--ink)"/>';
  $("#indWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Barevné přechody indikátorů"');
  $("#indPHV").textContent=fmt(pH,1);
  var h="";
  IND.forEach(function(ind){
    var col=indColor(ind,pH);
    h+='<tr><td>'+ind.n+'</td><td class="n">'+fmt(ind.lo,1)+'–'+fmt(ind.hi,1)+'</td><td>'+ind.l1+'</td><td>'+ind.l2+'</td>'+
       '<td><span style="display:inline-flex;align-items:center;gap:.5rem"><span style="width:16px;height:16px;border-radius:50%;background:'+col+';border:1px solid var(--line-strong);display:inline-block"></span><b>'+indLabel(ind,pH)+'</b></span></td></tr>';
  });
  h+='<tr><td>univerzální</td><td class="n">0–14</td><td>červená</td><td>fialová</td><td><span style="display:inline-flex;align-items:center;gap:.5rem"><span style="width:16px;height:16px;border-radius:50%;background:'+univColor(pH)+';border:1px solid var(--line-strong);display:inline-block"></span><b>'+univName(pH)+'</b></span></td></tr>';
  $("#indBody").innerHTML=h;
}
