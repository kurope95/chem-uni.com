/* ============================================================
   7 · WIDGET — hero: rozpadová křivka
   ============================================================ */
var heroState={hl:8,t:24,scale:"lin"};
function drawHero(){
  var hl=heroState.hl, t=heroState.t, log=heroState.scale==="log";
  var W=760,H=320,L=64,R=712,T0=28,B=268, Tmax=120;
  var x=function(tt){ return L+(tt/Tmax)*(R-L); };
  var y=function(f){ /* f = N/N0 */
    if(log){ var v=Math.max(f,1e-3); return B-(Math.log10(v)+3)/3*(B-T0); }
    return B-f*(B-T0);
  };
  var s='';
  /* mřížka a osy */
  for(var d=0; d<=Tmax; d+=20){ s+=line(x(d),T0,x(d),B,{c:"var(--line)",w:1}); s+=txt(x(d),B+18,d,{anchor:"middle",size:11,fill:"var(--ink-3)",mono:true}); }
  var ticks = log ? [1,0.1,0.01,0.001] : [1,0.75,0.5,0.25,0];
  ticks.forEach(function(f){ s+=line(L,y(f),R,y(f),{c:"var(--line)",w:1}); s+=txt(L-8,y(f)+4,(log?fmt(f*100,f<0.01?1:0):fmt(f*100,0))+" %",{anchor:"end",size:11,fill:"var(--ink-3)",mono:true}); });
  s+=line(L,T0-4,L,B,{c:"var(--line-strong)",w:1.5}); s+=line(L,B,R,B,{c:"var(--line-strong)",w:1.5});
  s+=txt((L+R)/2,B+36,"čas t [dny]",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em;text-transform:uppercase"});
  s+=txt(16,(T0+B)/2,(log?"N/N₀ (log)":"N/N₀"),{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:16px "+((T0+B)/2)+"px;letter-spacing:.08em"});
  /* křivka */
  var pts=[];
  for(var tt=0;tt<=Tmax;tt+=0.5){ var f=Math.pow(0.5,tt/hl); if(log&&f<1e-3) break; pts.push(x(tt).toFixed(1)+","+y(f).toFixed(1)); }
  s+='<polyline points="'+pts.join(" ")+'" style="fill:none;stroke:var(--accent);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round"/>';
  /* body ½ ¼ ⅛ */
  var labs=["½","¼","⅛","1/16"];
  for(var k=1;k<=4;k++){
    var tk=k*hl, fk=Math.pow(0.5,k);
    if(tk>Tmax || (log&&fk<1e-3)) break;
    s+=line(x(tk),y(fk),x(tk),B,{c:"var(--line-strong)",w:1,dash:"3 3"});
    s+='<circle cx="'+x(tk)+'" cy="'+y(fk)+'" r="5" style="fill:var(--surface);stroke:var(--ink-2);stroke-width:2"/>';
    s+=txt(x(tk)+8,y(fk)-8,labs[k-1]+" po "+k+" t½",{size:11,w:600,fill:"var(--ink-2)"});
  }
  /* aktuální čas */
  var fNow=Math.pow(0.5,t/hl), n=t/hl;
  if(!(log&&fNow<1e-3)){
    s+=line(x(t),T0,x(t),B,{c:"var(--endo)",w:1.6,dash:"5 4"});
    s+='<circle cx="'+x(t)+'" cy="'+y(fNow)+'" r="6.5" style="fill:var(--endo);stroke:var(--surface);stroke-width:2"/>';
    s+=rect(Math.min(x(t)+10,R-118),y(fNow)-30,108,20,{fill:"var(--endo)",r:5});
    s+=txt(Math.min(x(t)+64,R-64),y(fNow)-16,"zbývá "+fmt(fNow*100,fNow<0.01?2:1)+" %",{anchor:"middle",size:11.5,w:600,fill:"var(--accent-ink)",mono:true});
  }
  s+=txt(R,T0-10,"t½ = "+hl+" d  ·  λ = "+fmt(LN2/hl,4)+" d⁻¹",{anchor:"end",size:11.5,w:600,fill:"var(--ink-2)",mono:true});
  $("#heroWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Rozpadová křivka"');
  $("#heroHlV").textContent=hl+(hl===1?" den":(hl<5?" dny":" dní"));
  $("#heroTV").textContent=t+(t===1?" den":(t<5&&t>1?" dny":" dní"));
  $$("#heroScale button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===heroState.scale); });
  function ro(id,k,v,h){ $(id).innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#heroRo1","Zbylý podíl N/N₀",fmt(fNow*100,fNow<0.01?3:(fNow<0.1?2:1))+" %","přeměnilo se "+fmt((1-fNow)*100,1)+" %");
  ro("#heroRo2","Uplynulo poločasů",fmt(n,2),"n = t / t½ = "+t+" / "+hl);
  ro("#heroRo3","Aktivita A/A₀",fmt(fNow*100,fNow<0.01?3:(fNow<0.1?2:1))+" %","klesá se stejným poločasem; λ = "+fmt(LN2/hl,4)+" d⁻¹");
  var note;
  if(n<0.05) note="Na začátku je všechno nepřeměněné: N = N₀, aktivita je nejvyšší. Posuňte čas doprava.";
  else if(Math.abs(n-Math.round(n))<0.06 && Math.round(n)>=1) note="Přesně "+Math.round(n)+" poločas"+(Math.round(n)===1?"":(Math.round(n)<5?"y":"ů"))+" — zbývá 1/"+Math.pow(2,Math.round(n))+" = "+fmt(fNow*100,fNow<0.01?2:1)+" %. Po každém poločasu zbývá <b>polovina toho, co bylo</b>, ne polovina původního.";
  else if(n<1) note="Méně než jeden poločas: zbývá víc než polovina. Kdyby úbytek byl lineární, po půl poločasu by zbývalo 75 % — ve skutečnosti zbývá "+fmt(Math.pow(0.5,0.5)*100,1)+" % po 0,5 t½, protože křivka je exponenciála.";
  else if(n>=6.5) note="Po "+fmt(n,1)+" poločasech zbývá pod 1 % — prakticky „pryč“, ale nikdy nula. Přepněte na logaritmickou osu: tam je vidět, že křivka pokračuje jako přímka dál a dál.";
  else note="Uplynulo "+fmt(n,2)+" poločasu, zbývá (½)^"+fmt(n,2)+" = "+fmt(fNow*100,1)+" %. Necelé počty poločasů počítejte kalkulačkou: 0,5^n nebo e^(−λt).";
  if(log) note+=" <b>Logaritmická osa</b>: exponenciála je přímka — každý dílek dolů je desetkrát méně.";
  $("#heroNote").innerHTML=note;
}

/* ============================================================
   8 · WIDGET — stavitel nuklidu
   ============================================================ */
var nbState={Z:26,N:30,Q:3};
function stabilityInfo(Z,N){
  var A=Z+N;
  if(isStable(Z,A)) return {k:"stab",t:"stabilní nuklid",d:"leží v řece stability"};
  var real=findNucl(Z,A);
  if(real) return {k:"real",t:"radioaktivní — "+real.d,d:"poločas "+real.hl};
  if(Z>83) return {k:"alpha",t:"radioaktivní — pravděpodobně α",d:"Z > 83: řeka stability tu už neexistuje"};
  var ns=nStab(Z), dlt=N-ns, tol=0.5+0.02*A;
  if(dlt>tol) return {k:"bm",t:"radioaktivní — pravděpodobně β⁻",d:"přebytek neutronů: N je o "+fmt(dlt,1)+" nad osou řeky"};
  if(dlt<-tol) return {k:"bp",t:"radioaktivní — pravděpodobně β⁺ / EC",d:"nedostatek neutronů: N je o "+fmt(-dlt,1)+" pod osou řeky"};
  return {k:"near",t:"poblíž řeky — nestabilní, ale dlouhověký, nebo neexistuje",d:"formule je jen odhad; skutečnost hledejte v tabulce nuklidů"};
}
function drawNB(){
  var Z=nbState.Z, N=nbState.N, Q=nbState.Q, A=Z+N, E=Z-Q;
  var W=420,H=250,s='';
  var r=18+10*Math.pow(A,1/3);
  var cx=120, cy=128;
  /* obal */
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(r+30)+'" style="fill:none;stroke:var(--line-strong);stroke-width:1.2;stroke-dasharray:4 4"/>';
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(r+50)+'" style="fill:none;stroke:var(--line);stroke-width:1;stroke-dasharray:3 5"/>';
  /* jádro */
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:2"/>';
  if(A<=30){
    var seed=7; var rnd=function(){ seed=(seed*9301+49297)%233280; return seed/233280; };
    for(var i=0;i<A;i++){
      var ang=rnd()*6.283, rad=Math.sqrt(rnd())*(r-7);
      var px=cx+rad*Math.cos(ang), py=cy+rad*Math.sin(ang);
      s+='<circle cx="'+px.toFixed(1)+'" cy="'+py.toFixed(1)+'" r="5" style="fill:'+(i<Z?"var(--exo)":"var(--endo)")+';stroke:var(--surface);stroke-width:1"/>';
    }
  } else {
    s+=txt(cx,cy-4,Z+" p⁺",{anchor:"middle",size:13,w:700,fill:"var(--exo)",mono:true});
    s+=txt(cx,cy+14,N+" n",{anchor:"middle",size:13,w:700,fill:"var(--endo)",mono:true});
  }
  /* elektrony na obalu — jen počet */
  var ne=Math.min(E,12);
  for(var j=0;j<ne;j++){ var a2=j/ne*6.283-1.57; s+='<circle cx="'+(cx+(r+30)*Math.cos(a2)).toFixed(1)+'" cy="'+(cy+(r+30)*Math.sin(a2)).toFixed(1)+'" r="3.2" style="fill:var(--ink-2)"/>'; }
  s+=txt(cx,cy+r+66,"obal: "+E+" e⁻"+(E>12?" (zobrazeno 12)":""),{anchor:"middle",size:11,w:600,fill:"var(--ink-3)"});
  s+=txt(cx,22,"JÁDRO · "+A+" nukleonů",{anchor:"middle",size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  /* zápis */
  var bx=300;
  s+=txt(bx-2,92,A,{anchor:"end",size:22,w:600,fill:"var(--ink)",mono:true});
  s+=txt(bx-2,140,Z,{anchor:"end",size:22,w:600,fill:"var(--ink)",mono:true});
  s+=txt(bx+4,128,elSym(Z),{size:56,w:700,fill:"var(--accent)"});
  if(Q!==0) s+=txt(bx+4+34*elSym(Z).length,92,Math.abs(Q)===1?(Q>0?"+":"−"):(Math.abs(Q)+(Q>0?"+":"−")),{size:20,w:600,fill:"var(--ink-2)",mono:true});
  s+=txt(bx-30,175,"A = "+A+" (nahoře)",{size:11,fill:"var(--ink-3)"});
  s+=txt(bx-30,191,"Z = "+Z+" (dole)",{size:11,fill:"var(--ink-3)"});
  s+=txt(bx-30,207,"N = A − Z = "+N,{size:11,fill:"var(--ink-3)"});
  s+=txt(bx-30,223,elName(Z),{size:12,w:600,fill:"var(--ink-2)"});
  $("#nbWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Stavitel nuklidu"');
  $("#nbZV").textContent=Z; $("#nbNV").textContent=N;
  $("#nbQV").textContent = Q===0?"0 (neutrální atom)":(Math.abs(Q)+(Q>0?"+":"−"));
  function ro(id,k,v,h,cls){ var e=$(id); e.className="readout "+(cls||""); e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#nbRoA","Nukleonové číslo A",A,Z+" p⁺ + "+N+" n");
  ro("#nbRoE","Elektrony v obalu",E,Q===0?"neutrální atom: e⁻ = Z":(Q>0?"kation: Z − "+Q:"anion: Z + "+(-Q)));
  ro("#nbRoQ","Náboj jádra","+"+Z+" e","= Z · 1,602·10⁻¹⁹ C = "+sci(Z*1.602e-19,2)+" C");
  ro("#nbRoM","Hmotnost jádra","≈ "+A+" u",sci(A*1.66054e-27,2)+" kg");
  ro("#nbRoR","Poměr N/Z",Z?fmt(N/Z,2):"—",N/Z<1?"méně neutronů než protonů":(N/Z<1.2?"lehké jádro: N ≈ Z":"těžké jádro: N > Z"));
  var st=stabilityInfo(Z,N);
  ro("#nbRoS","Stabilita",st.k==="stab"?"stabilní":"radioaktivní",st.t.replace("radioaktivní — ","")+(st.k==="stab"?"":" · "+st.d),st.k==="stab"?"pos":"neg");
  var story="Jádro má <b>"+Z+" protonů</b>, takže je to <b>"+elName(Z)+"</b> ("+elSym(Z)+") — o tom rozhoduje jen Z. S "+N+" neutrony má A = "+A+", zapisuje se "+nucHTML(Z,A)+". ";
  if(Q===0) story+="Neutrální atom má "+E+" elektronů, stejně jako protonů. ";
  else if(Q>0) story+="Kation "+Math.abs(Q)+"+ ztratil "+Q+" elektron"+(Q===1?"":(Q<5?"y":"ů"))+": "+Z+" − "+Q+" = "+E+" e⁻. Jádro se přitom nezměnilo. ";
  else story+="Anion "+Math.abs(Q)+"− přijal "+(-Q)+" elektron"+(Q===-1?"":"y")+": "+Z+" + "+(-Q)+" = "+E+" e⁻. Jádro se přitom nezměnilo. ";
  story+= st.k==="stab" ? "Tento nuklid je <b>stabilní</b>." : ("Tento nuklid je <b>"+st.t+"</b> ("+st.d+").");
  $("#nbStory").innerHTML=story;
}

/* ============================================================
   9 · WIDGET — porovnávač nuklidů
   ============================================================ */
var cmpState={Z1:6,N1:8,Z2:7,N2:7};
function relation(Z1,N1,Z2,N2){
  var A1=Z1+N1, A2=Z2+N2;
  if(Z1===Z2&&N1===N2) return {k:"same",t:"totožný nuklid",e:"Stejné Z i stejné N — je to jeden a týž nuklid, ne dva."};
  if(Z1===Z2) return {k:"izotopy",t:"IZOTOPY",e:"Stejné protonové číslo Z = "+Z1+" (týž prvek, "+elName(Z1)+"), různý počet neutronů ("+N1+" a "+N2+"). Stejná chemie, jiná hmotnost."};
  if(A1===A2) return {k:"izobary",t:"IZOBARY",e:"Stejné nukleonové číslo A = "+A1+", ale různé prvky ("+elSym(Z1)+" a "+elSym(Z2)+"). Přesně takové dvojice spojuje přeměna β."};
  if(N1===N2) return {k:"izotony",t:"IZOTONY",e:"Stejné neutronové číslo N = "+N1+", různé prvky a různé A."};
  return {k:"none",t:"žádný z vztahů",e:"Liší se Z, N i A. Nejsou to izotopy, izobary ani izotony."};
}
function drawCmp(){
  var Z1=cmpState.Z1,N1=cmpState.N1,Z2=cmpState.Z2,N2=cmpState.N2,A1=Z1+N1,A2=Z2+N2;
  var rel=relation(Z1,N1,Z2,N2);
  var W=720,H=230,s='';
  function card(ox,Z,N,A,col,lab){
    var t='';
    t+=rect(ox,28,230,180,{fill:"var(--surface-2)",r:12,stroke:col,sw:1.5});
    t+=txt(ox+14,50,lab,{size:11,w:600,fill:col,style:"letter-spacing:.09em"});
    t+=txt(ox+30,120,A,{anchor:"end",size:20,w:600,fill:"var(--ink)",mono:true});
    t+=txt(ox+30,158,Z,{anchor:"end",size:20,w:600,fill:"var(--ink)",mono:true});
    t+=txt(ox+38,150,elSym(Z),{size:52,w:700,fill:col});
    t+=txt(ox+130,88,"Z = "+Z,{size:13,w:600,fill:rel.k==="izotopy"?"var(--ok)":"var(--ink-2)",mono:true});
    t+=txt(ox+130,112,"N = "+N,{size:13,w:600,fill:rel.k==="izotony"?"var(--ok)":"var(--ink-2)",mono:true});
    t+=txt(ox+130,136,"A = "+A,{size:13,w:600,fill:rel.k==="izobary"?"var(--ok)":"var(--ink-2)",mono:true});
    t+=txt(ox+130,168,elName(Z),{size:11.5,fill:"var(--ink-3)"});
    t+=txt(ox+130,186,isStable(Z,A)?"stabilní":"radioaktivní",{size:11,w:600,fill:isStable(Z,A)?"var(--ok)":"var(--bad)"});
    return t;
  }
  s+=card(20,Z1,N1,A1,"var(--exo)","NUKLID 1");
  s+=card(470,Z2,N2,A2,"var(--endo)","NUKLID 2");
  var midc = rel.k==="none"?"var(--ink-3)":(rel.k==="same"?"var(--ink-2)":"var(--ok)");
  s+=rect(262,88,196,60,{fill:"var(--surface)",r:10,stroke:midc,sw:2});
  s+=txt(360,114,rel.t,{anchor:"middle",size:rel.t.length>12?12:17,w:700,fill:midc});
  var sub = rel.k==="izotopy"?"stejné Z":(rel.k==="izobary"?"stejné A":(rel.k==="izotony"?"stejné N":(rel.k==="same"?"Z i N stejné":"nic společného")));
  s+=txt(360,136,sub,{anchor:"middle",size:11.5,fill:"var(--ink-3)"});
  s+=line(250,118,262,118,{c:midc,w:2}); s+=line(458,118,470,118,{c:midc,w:2});
  $("#cmpWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Porovnání dvou nuklidů"');
  $("#cmpZ1V").textContent=Z1; $("#cmpN1V").textContent=N1; $("#cmpZ2V").textContent=Z2; $("#cmpN2V").textContent=N2;
  function ro(id,k,a,b,eq){ var e=$(id); e.className="readout "+(eq?"pos":""); e.innerHTML='<span class="k">'+k+'</span><span class="v">'+a+' · '+b+'</span><span class="h">'+(eq?"shodné":"různé")+'</span>'; }
  ro("#cmpRoZ","Protonové číslo Z",Z1,Z2,Z1===Z2);
  ro("#cmpRoN","Neutronové číslo N",N1,N2,N1===N2);
  ro("#cmpRoA","Nukleonové číslo A",A1,A2,A1===A2);
  $("#cmpVerdict").innerHTML=nucHTML(Z1,A1)+" a "+nucHTML(Z2,A2)+" jsou <b>"+rel.t.toLowerCase()+"</b>. "+rel.e;
}

/* ============================================================
   10 · WIDGET — kalkulačka Ar z izotopů
   ============================================================ */
var arState={i:0,x:75.76};
function drawAr(){
  var iso=ISO[arState.i], x=arState.x/100, a=iso.a, b=iso.b;
  var Ar=x*a[1]+(1-x)*b[1];
  var W=720,H=200,L=70,R=650,yl=120,s='';
  var m1=a[1], m2=b[1], span=m2-m1;
  var xm=function(m){ return L+(m-m1)/span*(R-L); };
  s+=txt(L,30,"KDE NA ČÍSELNÉ OSE LEŽÍ VÁŽENÝ PRŮMĚR",{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.09em"});
  s+=line(L,yl,R,yl,{c:"var(--line-strong)",w:2,cap:"round"});
  /* izotopy jako sloupce podle zastoupení */
  var h1=Math.max(8,x*80), h2=Math.max(8,(1-x)*80);
  s+=rect(L-16,yl-h1,32,h1,{fill:"var(--exo)",r:4});
  s+=rect(R-16,yl-h2,32,h2,{fill:"var(--endo)",r:4});
  s+=txt(L,yl+22,supN(a[0])+elSym(iso.Z)+" · "+fmt(m1,3),{anchor:"middle",size:12,w:600,fill:"var(--exo)",mono:true});
  s+=txt(L,yl+40,fmt(x*100,2)+" %",{anchor:"middle",size:12,w:600,fill:"var(--exo)",mono:true});
  s+=txt(R,yl+22,supN(b[0])+elSym(iso.Z)+" · "+fmt(m2,3),{anchor:"middle",size:12,w:600,fill:"var(--endo)",mono:true});
  s+=txt(R,yl+40,fmt((1-x)*100,2)+" %",{anchor:"middle",size:12,w:600,fill:"var(--endo)",mono:true});
  /* výsledek */
  var xr=xm(Ar);
  s+=line(xr,yl-100,xr,yl+6,{c:"var(--accent)",w:2.2,dash:"5 4"});
  s+='<circle cx="'+xr+'" cy="'+yl+'" r="7" style="fill:var(--accent);stroke:var(--surface);stroke-width:2"/>';
  s+=txt(xr,yl-108,"Ar = "+fmt(Ar,3),{anchor:"middle",size:14,w:700,fill:"var(--accent)",mono:true});
  /* tabulková */
  var xt=xm(iso.Ar);
  s+='<path d="M'+xt+' '+(yl+8)+' l-6 10 l12 0 z" style="fill:var(--ink-2)"/>';
  s+=txt(xt,yl+62,"tabulka: "+fmt(iso.Ar,2),{anchor:"middle",size:11,w:600,fill:"var(--ink-2)",mono:true});
  $("#arWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Vážený průměr izotopů"');
  $("#arXV").textContent=fmt(arState.x,2)+" %";
  $("#arBody").innerHTML=
    '<tr><td class="chem">'+nucHTML(iso.Z,a[0])+'</td><td class="n">'+fmt(m1,4)+'</td><td class="n">'+fmt(x,4)+'</td><td class="n" style="font-weight:600">'+fmt(x*m1,3)+'</td></tr>'+
    '<tr><td class="chem">'+nucHTML(iso.Z,b[0])+'</td><td class="n">'+fmt(m2,4)+'</td><td class="n">'+fmt(1-x,4)+'</td><td class="n" style="font-weight:600">'+fmt((1-x)*m2,3)+'</td></tr>'+
    '<tr><td colspan="3" style="font-weight:700">Σ = Ar</td><td class="n" style="font-weight:700;color:var(--accent)">'+fmt(Ar,3)+'</td></tr>';
  function ro(id,k,v,h){ $(id).innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#arRo1","Vypočtená Ar",fmt(Ar,3),"x·m₁ + (1 − x)·m₂");
  ro("#arRo2","Tabulková Ar",fmt(iso.Ar,2),"přírodní zastoupení "+fmt(a[2],2)+" % / "+fmt(b[2],2)+" %");
  ro("#arRo3","Odchylka",sgn(Ar-iso.Ar,3),Math.abs(Ar-iso.Ar)<0.02?"sedí — máte přírodní složení":"jiné složení než v přírodě");
  var nat=Math.abs(arState.x-a[2])<0.02;
  $("#arNote").innerHTML = nat
    ? "Přírodní "+iso.n+": "+fmt(a[2],2)+" % "+nucTxt(iso.Z,a[0])+" a "+fmt(b[2],2)+" % "+nucTxt(iso.Z,b[0])+" dává přesně tabulkových "+fmt(iso.Ar,2)+". Posuňte zastoupení a sledujte, jak Ar klouže mezi hmotnostmi obou izotopů — nikdy z toho intervalu nevyjede."
    : "Posunuli jste zastoupení na "+fmt(arState.x,1)+" % — Ar se změnila na "+fmt(Ar,3)+". Všimněte si: Ar je vždy <b>mezi</b> hmotnostmi izotopů a blíž k tomu, kterého je víc. Zpět na přírodní hodnotu: "+fmt(a[2],2)+" %.";
}
function initAr(){
  var sel=$("#arEl");
  sel.innerHTML=ISO.map(function(x,i){ return '<option value="'+i+'">'+x.n+' ('+elSym(x.Z)+') — '+nucTxt(x.Z,x.a[0])+' / '+nucTxt(x.Z,x.b[0])+'</option>'; }).join("");
  sel.addEventListener("change",function(){ arState.i=+sel.value; arState.x=ISO[arState.i].a[2]; $("#arX").value=arState.x; drawAr(); });
  $("#arX").addEventListener("input",function(){ arState.x=+this.value; drawAr(); });
  drawAr();
}

/* ============================================================
   11 · WIDGET — mapa nuklidů (řeka stability)
   ============================================================ */
var rivState={Z:6,N:8};
function drawRiv(){
  var Z=rivState.Z, N=rivState.N, A=Z+N;
  var W=760,H=520,L=60,R=730,T0=24,B=470, Zmax=100, Nmax=160;
  var x=function(z){ return L+z/Zmax*(R-L); }, y=function(n){ return B-n/Nmax*(B-T0); };
  var s='';
  for(var z=0;z<=Zmax;z+=10){ s+=line(x(z),T0,x(z),B,{c:"var(--line)",w:1}); s+=txt(x(z),B+16,z,{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true}); }
  for(var n=0;n<=Nmax;n+=20){ s+=line(L,y(n),R,y(n),{c:"var(--line)",w:1}); s+=txt(L-6,y(n)+4,n,{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true}); }
  /* magická čísla */
  MAGIC.forEach(function(m){
    if(m<=Zmax) s+=line(x(m),T0,x(m),B,{c:"var(--accent)",w:1,dash:"2 4"});
    if(m<=Nmax) s+=line(L,y(m),R,y(m),{c:"var(--accent)",w:1,dash:"2 4"});
  });
  /* N = Z */
  s+=line(x(0),y(0),x(Zmax),y(Zmax),{c:"var(--ink-3)",w:1.4,dash:"6 4"});
  s+=txt(x(Zmax)-4,y(Zmax)-6,"N = Z",{anchor:"end",size:11,w:600,fill:"var(--ink-3)"});
  /* stabilní */
  STABLE_LIST.forEach(function(p){ s+='<circle cx="'+x(p.Z).toFixed(1)+'" cy="'+y(p.N).toFixed(1)+'" r="2.3" style="fill:var(--ok)"/>'; });
  /* konec řeky */
  s+=line(x(83.5),T0,x(83.5),B,{c:"var(--bad)",w:1.5,dash:"4 3"});
  s+=txt(x(84)+4,T0+14,"Z > 83: nic stabilního → α",{size:11,w:600,fill:"var(--bad)"});
  s+=txt(x(20),y(70),"NAD ŘEKOU: přebytek n → β⁻",{size:11,w:600,fill:"var(--endo)"});
  s+=txt(x(46),y(28),"POD ŘEKOU: málo n → β⁺ / EC",{size:11,w:600,fill:"var(--exo)"});
  /* aktuální */
  if(Z<=Zmax&&N<=Nmax){
    s+='<circle cx="'+x(Z)+'" cy="'+y(N)+'" r="7" style="fill:var(--cat4);stroke:var(--surface);stroke-width:2.2"/>';
    s+=txt(x(Z)+11,y(N)-9,nucTxt(Z,A),{size:13,w:700,fill:"var(--cat4)"});
  }
  s+=txt((L+R)/2,B+34,"protonové číslo Z",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em;text-transform:uppercase"});
  s+=txt(14,(T0+B)/2,"neutronové číslo N",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:14px "+((T0+B)/2)+"px;letter-spacing:.08em;text-transform:uppercase"});
  $("#rivWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Mapa nuklidů s řekou stability"');
  $("#rivZV").textContent=Z; $("#rivNV").textContent=N;
  var st=stabilityInfo(Z,N), ns=nStab(Z), dlt=N-ns;
  var pos = Z>83 ? "za koncem řeky" : (isStable(Z,A)?"v řece stability":(dlt>0.5+0.02*A?"nad řekou":(dlt<-(0.5+0.02*A)?"pod řekou":"na okraji řeky")));
  function ro(id,k,v,h,cls){ var e=$(id); e.className="readout "+(cls||""); e.innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#rivRo1","Nuklid",nucTxtZ(Z,A),elName(Z)+" · A = "+A);
  ro("#rivRo2","Poměr N/Z",fmt(N/Z,2),"osa řeky pro Z = "+Z+": N ≈ "+fmt(ns,0)+" (N/Z ≈ "+fmt(ns/Z,2)+")");
  ro("#rivRo3","Poloha",pos,st.k==="stab"?"stabilní":st.t.replace("radioaktivní — ",""),st.k==="stab"?"pos":"neg");
  var real=findNucl(Z,A), txtP;
  if(st.k==="stab") txtP=nucHTML(Z,A)+" je <b>stabilní</b>: leží v řece stability, N/Z = "+fmt(N/Z,2)+(Z%2===0&&N%2===0?", navíc sudé–sudé jádro":"")+(MAGIC.indexOf(Z)>=0?", Z je magické":"")+(MAGIC.indexOf(N)>=0?", N je magické":"")+".";
  else if(real) txtP=nucHTML(Z,A)+" je skutečný radionuklid: přeměna <b>"+real.d+"</b>, poločas "+real.hl+". "+(real.use?"Význam: "+real.use+".":"")+" Poloha vůči řece ("+pos+") tomu odpovídá"+(Z>83?" — nad Z = 83 je α typická":"")+".";
  else if(Z>83) txtP=nucHTML(Z,A)+": Z = "+Z+" &gt; 83, takže žádné množství neutronů ho nezachrání. Očekávaná přeměna je <b>α</b> — jádro shodí 2 protony a 2 neutrony najednou.";
  else if(st.k==="bm") txtP=nucHTML(Z,A)+" má neutronů příliš (N = "+N+", osa řeky ≈ "+fmt(ns,0)+"). Bude se přibližovat k řece přeměnou <b>β⁻</b>: neutron → proton, vznikne "+nucHTML(Z+1,A)+".";
  else if(st.k==="bp") txtP=nucHTML(Z,A)+" má neutronů málo (N = "+N+", osa řeky ≈ "+fmt(ns,0)+"). Bude se přibližovat k řece přeměnou <b>β⁺ nebo elektronovým záchytem</b>: proton → neutron, vznikne "+nucHTML(Z-1,A)+".";
  else txtP=nucHTML(Z,A)+" leží těsně u řeky, ale mezi stabilními nuklidy není. Takové nuklidy bývají radioaktivní s dlouhým poločasem (např. ⁴⁰K), nebo vůbec neexistují jako vázaná jádra. Přesnou odpověď dá jen tabulka nuklidů.";
  $("#rivText").innerHTML=txtP;
}
function initRiv(){
  var sel=$("#rivPre"), opts='<option value="">— vyberte —</option>';
  NUCL.forEach(function(n,i){ if(!n.m) opts+='<option value="'+i+'">'+nucTxt(n.Z,n.A)+' — '+elName(n.Z)+' ('+(n.st?"stabilní":n.d)+')</option>'; });
  sel.innerHTML=opts;
  sel.addEventListener("change",function(){ if(sel.value===""){return;} var n=NUCL[+sel.value]; rivState.Z=n.Z; rivState.N=n.A-n.Z; $("#rivZ").value=n.Z; $("#rivN").value=n.A-n.Z; drawRiv(); });
  $("#rivZ").addEventListener("input",function(){ rivState.Z=+this.value; sel.value=""; drawRiv(); });
  $("#rivN").addEventListener("input",function(){ rivState.N=+this.value; sel.value=""; drawRiv(); });
  drawRiv();
}

/* ============================================================
   12 · GRAF — vazebná energie na nukleon
   ============================================================ */
var beState={i:3};
function drawBE(){
  var W=760,H=370,L=60,R=730,T0=26,B=310, Amax=250, bmax=9.2;
  var x=function(a){ return L+a/Amax*(R-L); }, y=function(b){ return B-b/bmax*(B-T0); };
  var s='';
  for(var a=0;a<=Amax;a+=50){ s+=line(x(a),T0,x(a),B,{c:"var(--line)",w:1}); s+=txt(x(a),B+16,a,{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true}); }
  for(var b=0;b<=9;b+=1){ s+=line(L,y(b),R,y(b),{c:"var(--line)",w:1}); s+=txt(L-6,y(b)+4,b,{anchor:"end",size:10.5,fill:"var(--ink-3)",mono:true}); }
  var pts=BE.slice().sort(function(p,q){return p.A-q.A;});
  s+='<polyline points="'+pts.map(function(p){return x(p.A).toFixed(1)+","+y(p.b).toFixed(1);}).join(" ")+'" style="fill:none;stroke:var(--accent);stroke-width:2.2;stroke-linejoin:round"/>';
  /* zóny */
  s+=rect(x(2),T0,x(20)-x(2),B-T0,{fill:"var(--endo)",style:"fill-opacity:.07"});
  s+=txt(x(11),T0+14,"FÚZE →",{anchor:"middle",size:10.5,w:600,fill:"var(--endo)"});
  s+=rect(x(200),T0,x(Amax)-x(200),B-T0,{fill:"var(--exo)",style:"fill-opacity:.07"});
  s+=txt(x(225),T0+14,"← ŠTĚPENÍ",{anchor:"middle",size:10.5,w:600,fill:"var(--exo)"});
  s+=line(x(56),y(8.79),x(56),B,{c:"var(--line-strong)",w:1,dash:"3 3"});
  s+=txt(x(56)+6,y(8.79)+16,"maximum ⁵⁶Fe · 8,79 MeV",{size:11,w:600,fill:"var(--ink-2)"});
  pts.forEach(function(p,i){
    var sel=BE.indexOf(p)===beState.i;
    s+='<circle cx="'+x(p.A)+'" cy="'+y(p.b)+'" r="'+(sel?7:3.4)+'" style="fill:'+(sel?"var(--cat4)":"var(--accent)")+';stroke:var(--surface);stroke-width:'+(sel?2.2:1)+'"/>';
    if(sel) s+=txt(x(p.A)+(p.A>200?-12:12),y(p.b)-12,nucTxt(p.Z,p.A)+" · "+fmt(p.b,3)+" MeV",{anchor:p.A>200?"end":"start",size:12.5,w:700,fill:"var(--cat4)"});
  });
  [["²H",2,1.112],["⁴He",4,7.074],["¹²C",12,7.68],["²³⁸U",238,7.57]].forEach(function(l){ if(BE.indexOf(BE[beState.i])>=0 && BE[beState.i].A===l[1]) return; s+=txt(x(l[1])+(l[1]>200?-8:6),y(l[2])+(l[1]<5?-8:14),l[0],{anchor:l[1]>200?"end":"start",size:10.5,fill:"var(--ink-3)"}); });
  s+=txt((L+R)/2,B+34,"nukleonové číslo A",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em;text-transform:uppercase"});
  s+=txt(14,(T0+B)/2,"Eᵥ / A [MeV na nukleon]",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-3)",style:"transform:rotate(-90deg);transform-origin:14px "+((T0+B)/2)+"px;letter-spacing:.06em"});
  $("#beWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Křivka vazebné energie na nukleon"');
  var p=BE[beState.i], Ev=p.b*p.A, dm=Ev/U_MEV;
  function ro(id,k,v,h){ $(id).innerHTML='<span class="k">'+k+'</span><span class="v">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#beRo1","Eᵥ na nukleon",fmt(p.b,3)+" MeV",nucTxtZ(p.Z,p.A)+" · "+elName(p.Z));
  ro("#beRo2","Celková vazebná energie",fmt(Ev,1)+" MeV","= "+fmt(p.b,3)+" · "+p.A+" = "+sci(Ev*1.602e-13,2)+" J");
  ro("#beRo3","Hmotnostní úbytek "+"<span style='text-transform:none'>Δm</span>",fmt(dm,4)+" u","= Eᵥ / 931,5 = "+fmt(dm/p.A*100,2)+" % hmotnosti");
  var note;
  if(p.A<=4) note="Lehká jádra mají malou vazebnou energii na nukleon — proto se vyplatí je <b>slučovat</b>. Fúze ²H + ³H → ⁴He posune nukleony z 1–3 MeV na 7 MeV: uvolní se 17,6 MeV na jednu reakci.";
  else if(p.A<40) note=nucTxt(p.Z,p.A)+" už leží na strmé části křivky. Všimněte si, že ⁴He, ¹²C a ¹⁶O (násobky částice α) trčí nad hladkou křivku — to je efekt magických čísel a párování.";
  else if(p.A<=64) note=nucTxt(p.Z,p.A)+" je u vrcholu křivky: nejpevněji vázaná hmota ve vesmíru. Železo a nikl jsou proto konečnou stanicí jaderné syntézy ve hvězdách — z nich už fúzí ani štěpením energii nezískáte.";
  else if(p.A<200) note="Střední jádra jako "+nucTxt(p.Z,p.A)+" jsou typické <b>produkty štěpení</b>: leží výš než uran, a právě ten rozdíl (≈ 0,9 MeV na nukleon, tedy ≈ 200 MeV na jádro) je energie reaktoru.";
  else note="Těžká jádra jako "+nucTxt(p.Z,p.A)+" mají jen ≈ 7,6 MeV na nukleon. Rozštěpením na dva fragmenty kolem A ≈ 120 se nukleony dostanou na ≈ 8,5 MeV — rozdíl se uvolní. Proto lze získat energii z uranu, ale ne ze železa.";
  $("#beNote").innerHTML=note;
}
function initBE(){
  var sel=$("#beSel");
  sel.innerHTML=BE.map(function(p,i){ return '<option value="'+i+'"'+(i===beState.i?' selected':'')+'>'+nucTxt(p.Z,p.A)+' — '+elName(p.Z)+' ('+fmt(p.b,3)+' MeV)</option>'; }).join("");
  sel.addEventListener("change",function(){ beState.i=+sel.value; drawBE(); });
  drawBE();
}
