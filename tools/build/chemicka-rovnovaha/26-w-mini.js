/* ============================================================
   T16 · RYCHLOPRŮCHOD — tři kompaktní grafy
   ============================================================ */

/* (A) v₁ klesá, v₂ roste, protnou se — a od té chvíle je rovnováha */
function drawMiniRates(){
  var k1=0.55, k2=0.22, c0=1.0;
  var cAeq=c0*k2/(k1+k2), lam=k1+k2, tMax=9;
  function cA(t){ return cAeq+(c0-cAeq)*Math.exp(-lam*t); }
  var W=720,H=280,L=60,R=560,T0=34,B=228;
  var x=function(t){ return L+t/tMax*(R-L); }, y=function(v){ return B-v/(k1*c0*1.08)*(B-T0); };
  var s='';
  s+=txt(L-8,20,"RYCHLOSTI PŘÍMÉ A ZPĚTNÉ REAKCE   ·   A ⇌ B,  k₁ = 0,55 s⁻¹,  k₋₁ = 0,22 s⁻¹",{size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  for(var g=0;g<=4;g++){ var vv=k1*c0*g/4; s+=line(L,y(vv),R,y(vv),{c:"var(--line)",w:1}); s+=txt(L-8,y(vv)+4,fmt(vv,2),{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true}); }
  s+=line(L,B,R,B,{c:"var(--line-strong)",w:1.5}); s+=line(L,T0-6,L,B,{c:"var(--line-strong)",w:1.5});
  for(var t=0;t<=tMax;t+=3){ s+=txt(x(t),B+18,t,{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true}); }
  s+=txt((L+R)/2,B+36,"čas [s]",{anchor:"middle",size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.07em;text-transform:uppercase"});
  s+=txt(16,(T0+B)/2,"rychlost [mol·dm⁻³·s⁻¹]",{anchor:"middle",size:10.5,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:16px "+((T0+B)/2)+"px;letter-spacing:.05em"});
  var p1=[],p2=[];
  for(var tt=0;tt<=tMax+0.001;tt+=0.05){ p1.push(x(tt).toFixed(1)+","+y(k1*cA(tt)).toFixed(1)); p2.push(x(tt).toFixed(1)+","+y(k2*(c0-cA(tt))).toFixed(1)); }
  s+='<polyline points="'+p1.join(" ")+'" style="fill:none;stroke:var(--exo);stroke-width:2.8;stroke-linecap:round"/>';
  s+='<polyline points="'+p2.join(" ")+'" style="fill:none;stroke:var(--endo);stroke-width:2.8;stroke-linecap:round"/>';
  var vEq=k1*cAeq, tEq=5.2;
  s+=line(x(tEq),T0,x(tEq),B,{c:"var(--ok)",w:1.5,dash:"5 4"});
  s+=rect(x(tEq),T0,R-x(tEq),B-T0,{fill:"var(--ok)",r:0,style:"fill-opacity:.07"});
  s+=line(L,y(vEq),R,y(vEq),{c:"var(--ok)",w:1,dash:"3 4"});
  s+=txt(x(tEq)+8,T0+14,"ROVNOVÁHA: v₁ = v₂",{size:11,w:700,fill:"var(--ok)",style:"letter-spacing:.05em"});
  s+=txt(x(tEq)+8,T0+29,"koncentrace se už nemění, reakce ale běží dál",{size:10,fill:"var(--ink-3)"});
  s+=txt(R+10,y(k1*c0)-2,"v₁ = k₁·[A]",{size:12,w:700,fill:"var(--exo)"});
  s+=txt(R+10,y(k1*c0)+14,"klesá — A ubývá",{size:10,fill:"var(--ink-3)"});
  s+=txt(R+10,y(0)-2,"v₂ = k₋₁·[B]",{size:12,w:700,fill:"var(--endo)"});
  s+=txt(R+10,y(0)+14,"roste — B přibývá",{size:10,fill:"var(--ink-3)"});
  s+=txt(R+10,y(vEq)+4,"v₁ = v₂ = "+fmt(vEq,3),{size:11,w:600,fill:"var(--ok)",mono:true});
  $("#miniRateWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Rychlosti přímé a zpětné reakce se vyrovnají"');
}

/* (B) ΔG° → K na logaritmické ose */
function drawMiniKG(){
  var W=720,H=210,L=56,R=664,yb=112;
  var x=function(e){ return L+(e+12)/24*(R-L); };
  var s='';
  s+=txt(L,20,"ΔG° = −RT ln K   ·   KAŽDÝCH 5,7 kJ·mol⁻¹ POSUNE K O JEDEN ŘÁD (298 K)",{size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  s+=rect(x(-12),yb-14,x(-3)-x(-12),28,{fill:"var(--bad)",r:6,style:"fill-opacity:.13"});
  s+=rect(x(-3),yb-14,x(3)-x(-3),28,{fill:"var(--warn)",r:6,style:"fill-opacity:.16"});
  s+=rect(x(3),yb-14,x(12)-x(3),28,{fill:"var(--ok)",r:6,style:"fill-opacity:.16"});
  s+=txt((x(-12)+x(-3))/2,yb-24,"K ≪ 1 · PRAKTICKY NEPROBÍHÁ",{anchor:"middle",size:10,w:600,fill:"var(--bad)",style:"letter-spacing:.06em"});
  s+=txt((x(-3)+x(3))/2,yb-24,"K ≈ 1 · OBĚ STRANY",{anchor:"middle",size:10,w:600,fill:"var(--warn)",style:"letter-spacing:.06em"});
  s+=txt((x(3)+x(12))/2,yb-24,"K ≫ 1 · PRAKTICKY ÚPLNÁ",{anchor:"middle",size:10,w:600,fill:"var(--ok)",style:"letter-spacing:.06em"});
  s+=line(L,yb,R,yb,{c:"var(--line-strong)",w:1.5});
  for(var e=-12;e<=12;e+=3){
    s+=line(x(e),yb-5,x(e),yb+5,{c:"var(--line-strong)",w:1.5});
    s+=txt(x(e),yb+22,"10"+supN(e),{anchor:"middle",size:11.5,fill:"var(--ink-2)",mono:true});
    s+=txt(x(e),yb+40,sgn(-e*5.708,0),{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true});
  }
  s+=txt(L-8,yb+22,"K",{anchor:"end",size:11.5,w:700,fill:"var(--ink-2)"});
  s+=txt(L-8,yb+40,"ΔG°",{anchor:"end",size:10.5,w:700,fill:"var(--ink-3)"});
  s+=txt((L+R)/2,H-8,"dolní řádek: ΔG° v kJ·mol⁻¹ při 298 K",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  var marks=[[5.75,"NH₃ (298 K)","var(--cat1)"],[-0.83,"N₂O₄ ⇌ 2 NO₂","var(--cat3)"],[1.7,"H₂ + I₂ ⇌ 2 HI (448 °C)","var(--cat2)"],[-4.74,"CH₃COOH ⇌ H⁺ + A⁻","var(--cat4)"]];
  marks.forEach(function(m,i){
    var xm=x(Math.max(-12,Math.min(12,m[0]))), yy=yb-46-(i%2)*17;
    s+=line(xm,yb-14,xm,yy+4,{c:m[2],w:1,dash:"2 3"});
    s+='<circle cx="'+xm.toFixed(1)+'" cy="'+(yb).toFixed(1)+'" r="4" style="fill:'+m[2]+'"/>';
    s+=txt(xm,yy,m[1],{anchor:"middle",size:10,w:600,fill:m[2]});
  });
  $("#miniKGWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Vztah ΔG° a K na logaritmické ose"');
}

/* (C) sloupce před zásahem a po něm — stlačení směsi N₂ + 3 H₂ ⇌ 2 NH₃ */
function drawMiniShift(){
  var W=720,H=250,L=150,R=600;
  var before=[0.547,1.640,0.907], midv=[1.094,3.280,1.814], after=[0.865,2.593,2.272];
  var names=["N₂","H₂","NH₃"];
  var max=3.6;
  var s='';
  s+=txt(L-138,20,"STLAČENÍ NA POLOVIČNÍ OBJEM   ·   N₂ + 3 H₂ ⇌ 2 NH₃,  Δn(g) = −2,  700 K",{size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  names.forEach(function(nm,i){
    var y=44+i*62;
    s+=txt(L-12,y+20,nm,{anchor:"end",size:13.5,w:700,fill:"var(--ink)"});
    s+=txt(L-12,y+35,i===2?"produkt":"výchozí látka",{anchor:"end",size:10,fill:"var(--ink-3)"});
    var vals=[before[i],midv[i],after[i]], cols=["var(--ink-3)","var(--warn)","var(--accent)"], labs=["před","hned po stlačení","nová rovnováha"];
    vals.forEach(function(v,j){
      var yy=y+j*15, w=v/max*(R-L);
      s+=rect(L,yy,w,12,{fill:cols[j],r:3,style:j===1?"fill-opacity:.75":""});
      s+=txt(L+w+7,yy+10,fmt(v,3),{size:10.5,w:600,fill:cols[j],mono:true});
      s+=txt(R+62,yy+10,labs[j],{size:9.5,fill:"var(--ink-3)"});
    });
  });
  s+=txt(L-138,H-26,"Stlačení zdvojnásobí všechny koncentrace (žlutě). Q klesne pod K, protože ve jmenovateli je čtvrtá mocnina",{size:10.5,fill:"var(--ink-2)"});
  s+=txt(L-138,H-10,"a v čitateli druhá — soustava proto vyrábí NH₃ (Δn < 0), až se Q vrátí na K. K se přitom vůbec nezměnilo.",{size:10.5,fill:"var(--ink-2)"});
  $("#miniShiftWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Koncentrace před stlačením a po něm"');
}
