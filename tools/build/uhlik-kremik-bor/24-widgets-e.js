/* ============================================================
   15 · K8 — DIAGONÁLNÍ PODOBNOST
   ============================================================ */
var dgState={p:"bsi"};
function D_(id){ for(var i=0;i<DIAG.length;i++) if(DIAG[i].id===id) return DIAG[i]; return DIAG[0]; }
/* malý výřez periodické tabulky: skupiny 1,2,13,14,15 × periody 2,3 */
var DG_TAB=[
  {s:"Li",g:0,p:0},{s:"Be",g:1,p:0},{s:"B",g:2,p:0},{s:"C",g:3,p:0},{s:"N",g:4,p:0},
  {s:"Na",g:0,p:1},{s:"Mg",g:1,p:1},{s:"Al",g:2,p:1},{s:"Si",g:3,p:1},{s:"P",g:4,p:1}
];
function drawDg(){
  var d=D_(dgState.p); press("#dgPair",dgState.p);
  var W=720,H=244,s='',A="var(--accent)";
  s+=txt(24,22,"DIAGONÁLNÍ PODOBNOST "+d.a+" — "+d.b,{size:12,w:700,fill:A,style:"letter-spacing:.07em"});
  s+=txt(24,42,"prvek na začátku periody se podobá sousedovi šikmo dolů doprava",{size:11,fill:"var(--ink-3)"});
  var cw=76, ch=58, x0=40, y0=72;
  var labels=["1","2","13","14","15"];
  labels.forEach(function(l,i){ s+=txt(x0+i*cw+cw/2,y0-8,l+". sk.",{anchor:"middle",size:9.5,w:600,fill:"var(--ink-3)"}); });
  s+=txt(x0-10,y0+ch/2+4,"2.",{anchor:"end",size:9.5,w:600,fill:"var(--ink-3)"});
  s+=txt(x0-10,y0+ch+8+ch/2+4,"3.",{anchor:"end",size:9.5,w:600,fill:"var(--ink-3)"});
  var posOf={};
  DG_TAB.forEach(function(e){
    var x=x0+e.g*cw, y=y0+e.p*(ch+8);
    posOf[e.s]=[x+cw/2,y+ch/2];
    var act=(e.s===d.a||e.s===d.b);
    s+=rect(x,y,cw-6,ch,{fill:act?"var(--accent-soft)":"var(--surface-2)",r:8,stroke:act?A:"var(--line)",sw:act?2.2:1});
    s+=txt(x+(cw-6)/2,y+ch/2+7,e.s,{anchor:"middle",size:act?21:17,w:700,fill:act?A:"var(--ink-3)"});
    var en={Li:0.98,Be:1.57,B:2.04,C:2.55,N:3.04,Na:0.93,Mg:1.31,Al:1.61,Si:1.90,P:2.19}[e.s];
    s+=txt(x+(cw-6)/2,y+ch-6,fmt(en,2),{anchor:"middle",size:9,fill:act?"var(--ink-2)":"var(--ink-3)",mono:true});
  });
  /* diagonální šipka */
  var pa=posOf[d.a], pb=posOf[d.b];
  s+=line(pa[0],pa[1],pb[0],pb[1],{c:A,w:3,cap:"round",dash:"7 5"});
  var ang=Math.atan2(pb[1]-pa[1],pb[0]-pa[0]);
  s+='<path d="M'+pb[0]+' '+pb[1]+' l'+(-12*Math.cos(ang-0.4))+' '+(-12*Math.sin(ang-0.4))+' l'+(-12*Math.cos(ang+0.4)+12*Math.cos(ang-0.4))+' '+(-12*Math.sin(ang+0.4)+12*Math.sin(ang-0.4))+' z" style="fill:'+A+'"/>';
  /* směrové šipky vysvětlující princip */
  var bx=x0+5*cw+16;
  s+=txt(bx,y0+10,"doprava:",{size:10.5,w:700,fill:"var(--exo)"});
  s+=txt(bx,y0+26,"↑ náboj jádra",{size:10.5,fill:"var(--ink-3)"});
  s+=txt(bx,y0+42,"↓ poloměr",{size:10.5,fill:"var(--ink-3)"});
  s+=txt(bx,y0+70,"dolů:",{size:10.5,w:700,fill:"var(--endo)"});
  s+=txt(bx,y0+86,"↓ efektivní náboj",{size:10.5,fill:"var(--ink-3)"});
  s+=txt(bx,y0+102,"↑ poloměr",{size:10.5,fill:"var(--ink-3)"});
  s+=txt(bx,y0+126,"po diagonále:",{size:10.5,w:700,fill:A});
  s+=txt(bx,y0+142,"vyruší se",{size:10.5,w:600,fill:A});
  s+=txt(24,y0+2*(ch+8)+34,"malá čísla v políčkách jsou elektronegativity — všimněte si, jak blízko si je má diagonální dvojice",{size:10.5,fill:"var(--ink-3)"});
  $("#dgWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Diagonální podobnost '+d.a+' a '+d.b+'"');
  $("#dgTxt").innerHTML="<b>"+d.jm+".</b> "+d.duv;
  $("#dgList").innerHTML='<span class="eyebrow" style="color:var(--accent)">Společné vlastnosti</span><ul style="margin:.4rem 0 0;padding-left:1.2rem;font-size:.95rem;line-height:1.65;color:var(--ink-2)">'+
    d.spol.map(function(x){ return "<li>"+x+"</li>"; }).join("")+'</ul>';
}
function initDg(){
  $$("#dgPair button").forEach(function(b){ b.addEventListener("click",function(){ dgState.p=b.dataset.v; drawDg(); }); });
  drawDg();
}

/* ============================================================
   16 · K8 — POLOVODIČ: ZAKÁZANÝ PÁS A DOPOVÁNÍ
   ============================================================ */
var pvState={t:"pure",mat:"si"};
function P_(id){ for(var i=0;i<POLOV.length;i++) if(POLOV[i].id===id) return POLOV[i]; return POLOV[1]; }
function drawPv(){
  press("#pvType",pvState.t);
  var cmp=P_(pvState.mat), si=P_("si");
  var W=720,H=278,s='';
  var L=40,R=40,T=40,B=50, pw=W-L-R, ph=H-T-B;
  s+=txt(L,20,"PÁSOVÝ MODEL — ŠIŘKA ZAKÁZANÉHO PÁSU A HLADINY PŘÍMĚSÍ",{size:11.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
  var maxE=7;
  function Y(e){ return T+ph-e/maxE*ph; }
  /* dva sloupce: vlevo křemík s příměsí, vpravo porovnávaný materiál */
  function pasy(x,w,gap,jm,dop){
    var t='';
    /* valenční pás */
    t+=rect(x,Y(0)-0,w,26,{fill:"var(--endo)",r:5});
    t+=txt(x+w/2,Y(0)+18,"valenční pás",{anchor:"middle",size:10.5,w:600,fill:"var(--accent-ink)"});
    /* vodivostní pás */
    var yc=Y(gap)-26;
    t+=rect(x,yc-26,w,26,{fill:"var(--exo)",r:5});
    t+=txt(x+w/2,yc-8,"vodivostní pás",{anchor:"middle",size:10.5,w:600,fill:"var(--accent-ink)"});
    /* mezera */
    t+=line(x+w/2,Y(0),x+w/2,yc-26,{c:"var(--line-strong)",w:1,dash:"4 4"});
    t+=vArrow(x+w/2,Y(0),yc-26,"var(--ink-2)","","right");
    t+=txt(x+w/2+9,(yc+Y(0))/2+4,fmt(gap,2)+" eV",{fill:"var(--ink-2)",size:12.5,w:600});
    t+=txt(x+w/2,Y(0)+42,jm,{anchor:"middle",size:11.5,w:700,fill:"var(--ink)"});
    if(dop==="n"){
      var yd=yc-26+9;
      t+=line(x+10,yd,x+w-10,yd,{c:"var(--accent)",w:2.6,dash:"6 4"});
      t+=txt(x+w+6,yd+4,"hladina fosforu",{size:10.5,w:600,fill:"var(--accent)"});
      t+='<circle cx="'+(x+22)+'" cy="'+(yd-6)+'" r="4.5" style="fill:var(--accent)"/>';
      t+='<circle cx="'+(x+40)+'" cy="'+(yd-6)+'" r="4.5" style="fill:var(--accent)"/>';
    } else if(dop==="p"){
      var yd2=Y(0)-9;
      t+=line(x+10,yd2,x+w-10,yd2,{c:"var(--accent)",w:2.6,dash:"6 4"});
      t+=txt(x+w+6,yd2+4,"hladina boru",{size:10.5,w:600,fill:"var(--accent)"});
      t+='<circle cx="'+(x+22)+'" cy="'+(yd2+8)+'" r="4.5" style="fill:none;stroke:var(--accent);stroke-width:2"/>';
      t+='<circle cx="'+(x+40)+'" cy="'+(yd2+8)+'" r="4.5" style="fill:none;stroke:var(--accent);stroke-width:2"/>';
    }
    return t;
  }
  s+=pasy(L+30,170,si.pas,"křemík"+(pvState.t==="n"?" + P (typ N)":(pvState.t==="p"?" + B (typ P)":" — čistý")),pvState.t==="pure"?null:pvState.t);
  s+=pasy(L+390,170,cmp.pas,cmp.jm.split(" (")[0],null);
  /* měřítko */
  for(var e=0;e<=6;e+=2){
    s+=txt(L-6,Y(e)+4,String(e),{anchor:"end",size:10,fill:"var(--ink-3)",mono:true});
    s+=line(L-2,Y(e),L+2,Y(e),{c:"var(--line-strong)",w:1});
  }
  s+=txt(L-6,T-8,"eV",{anchor:"end",size:10,fill:"var(--ink-3)"});
  $("#pvWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Pásový model polovodiče"');

  var info={
    pure:{k:"čistý křemík",v:"vlastní vodivost",h:"za pokojové teploty prakticky izoluje; vodivost roste s teplotou, protože přibývá elektronů, které přeskočí pás",
      eq:"tepelná energie k<span class='q'>T</span> při 25 °C je asi 0,026 eV — proti pásu 1,12 eV je to málo, ale ne nula",
      p:"Ve zcela čistém křemíku vzniká pár elektron—díra jen tepelnou excitací. Takových nosičů je málo, takže čistý křemík vede špatně. Zato jich s teplotou rychle přibývá, což je typický znak polovodiče a opak chování kovů."},
    n:{k:"typ N — příměs fosforu",v:"nosičem elektron",h:"fosfor má 5 valenčních elektronů, čtyři se zapojí do vazeb, pátý zbude volný",
      eq:"hladina fosforu leží těsně <b>pod</b> vodivostním pásem — elektron má odtud jen kousek nahoru",
      p:"Zabudovaný atom fosforu se do mřížky vejde na místo křemíku, ale jeden elektron mu přebývá. Ten je vázán jen slabě a už při pokojové teplotě odchází do vodivostního pásu. Vodivost stoupne o mnoho řádů, přestože příměsi je nepatrné množství."},
    p:{k:"typ P — příměs boru",v:"nosičem díra",h:"bor má 3 valenční elektrony, na jednu vazbu jeden chybí a zbude díra",
      eq:"hladina boru leží těsně <b>nad</b> valenčním pásem — elektronu stačí malý skok, aby po sobě zanechal díru",
      p:"Bor se do křemíkové mřížky vejde obzvlášť dobře, protože má malý atom (kovalentní poloměr 84 pm proti 121 pm u hliníku). Chybějící elektron vytvoří díru; sousední elektron do ní přeskočí a díru přesune na své původní místo. Navenek to vypadá, jako by se pohyboval kladný náboj."}
  }[pvState.t];
  ro("#pvRo1",info.k,info.v,info.h);
  ro("#pvRo2","zakázaný pás křemíku","1,12 eV","dost velký na izolaci, dost malý na řízení vodivosti");
  ro("#pvRo3",cmp.jm.split(" (")[0],fmt(cmp.pas,2)+" eV",cmp.typ);
  $("#pvTxt").innerHTML=info.eq;
  $("#pvPop").innerHTML=info.p+" <b>Pro srovnání:</b> "+cmp.pop;
}
function initPv(){
  $$("#pvType button").forEach(function(b){ b.addEventListener("click",function(){ pvState.t=b.dataset.v; drawPv(); }); });
  $("#pvMat").innerHTML=POLOV.map(function(p){ return '<option value="'+p.id+'">'+p.jm+' — '+fmt(p.pas,2)+' eV</option>'; }).join("");
  $("#pvMat").value=pvState.mat;
  $("#pvMat").addEventListener("change",function(){ pvState.mat=this.value; drawPv(); });
  drawPv();
}

/* ============================================================
   17 · K8 — ZÁVĚREČNÝ TRENAŽÉR OKRUHU
   ============================================================ */
var ndD={q:null,opts:[],score:0,n:0,answered:false};
function ndNew(){
  var i=Math.floor(Math.random()*SLOUC.length);
  var q=SLOUC[i];
  /* tři distraktory: přednostně z téhož prvku, ať je otázka poctivě těžká */
  var same=SLOUC.filter(function(x){ return x!==q && x.p===q.p; });
  var other=SLOUC.filter(function(x){ return x!==q && x.p!==q.p; });
  function pick(arr,k){
    var c=arr.slice(), out=[];
    while(out.length<k && c.length){ out.push(c.splice(Math.floor(Math.random()*c.length),1)[0]); }
    return out;
  }
  var dis=pick(same,2).concat(pick(other,1));
  while(dis.length<3){ var extra=pick(other,1)[0]; if(extra && dis.indexOf(extra)<0) dis.push(extra); else break; }
  var opts=dis.concat([q]);
  for(var j=opts.length-1;j>0;j--){ var r=Math.floor(Math.random()*(j+1)); var t=opts[j]; opts[j]=opts[r]; opts[r]=t; }
  ndD.q=q; ndD.opts=opts; ndD.answered=false;
  $("#ndQ").innerHTML='Která látka je <b>'+q.vl.charAt(0).toLowerCase()+q.vl.slice(1)+'</b>?<br><span style="font-size:.9em;color:var(--ink-3)">Struktura: '+q.st+'</span>';
  $("#ndOpts").innerHTML=opts.map(function(o,k){
    return '<button class="btn btn-sm" type="button" data-a="'+k+'"><span class="chem">'+o.v+'</span></button>';
  }).join("");
  $$("#ndOpts button").forEach(function(b){
    b.addEventListener("click",function(){ ndAnswer(ndD.opts[+b.dataset.a]); });
  });
  $("#ndA").innerHTML="";
}
function ndAnswer(pick){
  if(ndD.answered) return; ndD.answered=true;
  var q=ndD.q, ok=(pick===q);
  ndD.n++; if(ok) ndD.score++;
  $("#ndScore").textContent=ndD.score; $("#ndN").textContent=ndD.n;
  $$("#ndOpts button").forEach(function(b){ b.disabled=true; });
  var el={C:"uhlíku",Si:"křemíku",B:"boru"}[q.p];
  $("#ndA").innerHTML='<b style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+
    (ok?"✓ Správně.":'✕ Špatně — správně je <span class="chem">'+q.v+'</span>.')+'</b> '+
    'Je to <b>'+q.n+'</b>, sloučenina '+el+' s oxidačním číslem '+q.ox+'. Použití: '+q.u+'.'+
    (ok?"":' Vy jste zvolili <span class="chem">'+pick.v+'</span> — '+pick.n+', což je '+pick.vl.split(",")[0]+'.');
  if(ndD.score>=8) markDone("k8");
}
function initNd(){
  $("#ndNext").addEventListener("click",ndNew);
  ndNew();
}

/* ============================================================
   18 · MINI-GRAFY V RYCHLOKURZU
   ============================================================ */
/* (A) diamant × grafit vedle sebe */
function drawMiniStruct(){
  var W=720,H=230,s='',A="var(--accent)",E="var(--exo)",D="var(--endo)";
  s+=txt(24,20,"DIAMANT × GRAFIT — TENTÝŽ PRVEK, JINÁ HYBRIDIZACE",{size:11.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.07em"});
  /* levá polovina: diamant */
  var cx=170, cy=120;
  var nb=[[cx-56,cy-46],[cx+58,cy-40],[cx-50,cy+56],[cx+54,cy+52]];
  nb.forEach(function(p){ s+=line(cx,cy,p[0],p[1],{c:E,w:3.2,cap:"round"}); });
  nb.forEach(function(p){ s+=atom(p[0],p[1],11,A,"C",10.5); });
  s+=atom(cx,cy,14,A,"C",12);
  s+=txt(cx,44,"DIAMANT · sp³ · 4 vazby σ",{anchor:"middle",size:11.5,w:700,fill:A});
  s+=txt(cx,196,"C—C = 154 pm · hustota 3,51 g·cm⁻³",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  s+=txt(cx,212,"všechny elektrony vázané → izolant, tvrdost 10",{anchor:"middle",size:10.5,w:600,fill:"var(--ink-2)"});
  s+=line(360,44,360,214,{c:"var(--line)",w:1,dash:"4 4"});
  /* pravá polovina: grafit */
  var gx=540;
  function hexAt(ox,oy,r,op,dots){
    var t='',pts=[];
    for(var i=0;i<6;i++){ var a=Math.PI/180*(60*i); pts.push([ox+r*Math.cos(a), oy+r*Math.sin(a)*0.62]); }
    for(var i=0;i<6;i++){ var p=pts[i],q=pts[(i+1)%6]; t+=line(p[0],p[1],q[0],q[1],{c:E,w:2.4,cap:"round"}); }
    if(dots) pts.forEach(function(p){ t+=atom(p[0],p[1],5.5,A,"",0); });
    return '<g style="opacity:'+op+'">'+t+'</g>';
  }
  s+=hexAt(gx+22,86,26,0.4,false);
  s+=hexAt(gx,124,26,1,true);
  s+=hexAt(gx-22,162,26,0.4,false);
  for(var k=0;k<5;k++){
    var px=gx-40+k*20;
    s+='<ellipse cx="'+px+'" cy="'+(124-16)+'" rx="6" ry="13" style="fill:'+D+';fill-opacity:.34"/>';
    s+='<ellipse cx="'+px+'" cy="'+(124+16)+'" rx="6" ry="13" style="fill:'+D+';fill-opacity:.34"/>';
  }
  s+=txt(gx,44,"GRAFIT · sp² · 3 vazby σ + oblak π",{anchor:"middle",size:11.5,w:700,fill:A});
  s+=txt(gx,196,"C—C = 142 pm ve vrstvě · 335 pm mezi vrstvami",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  s+=txt(gx,212,"čtvrtý elektron zbývá → vodič, tvrdost 1 až 2",{anchor:"middle",size:10.5,w:600,fill:"var(--ink-2)"});
  $("#miniStructWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Srovnání struktury diamantu a grafitu"');
}
/* (B) stavebnice křemičitanů ve zkratce */
function drawMiniSil(){
  var W=720,H=215,s='';
  s+=txt(24,20,"STAVEBNICE KŘEMIČITANŮ — POČET SDÍLENÝCH VRCHOLŮ URČUJE VŠECHNO",{size:11.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
  var items=[
    {n:"0",vz:"SiO₄⁴⁻",pom:"1 : 4,00",jm:"izolované",pr:"bez štěpnosti"},
    {n:"1",vz:"Si₂O₇⁶⁻",pom:"1 : 3,50",jm:"dvojice",pr:"ostrůvky"},
    {n:"2",vz:"(SiO₃²⁻)ₙ",pom:"1 : 3,00",jm:"řetězec",pr:"protáhlé krystaly"},
    {n:"2,5",vz:"(Si₄O₁₁⁶⁻)ₙ",pom:"1 : 2,75",jm:"pás",pr:"vlákna"},
    {n:"3",vz:"(Si₂O₅²⁻)ₙ",pom:"1 : 2,50",jm:"vrstva",pr:"lístky"},
    {n:"4",vz:"SiO₂",pom:"1 : 2,00",jm:"síť",pr:"tvrdý kámen"}
  ];
  var cw=(W-48)/items.length;
  items.forEach(function(it,i){
    var x=24+i*cw;
    var col=["var(--cat1)","var(--cat2)","var(--cat3)","var(--cat4)","var(--exo)","var(--accent)"][i];
    s+=rect(x+3,44,cw-8,52,{fill:col,r:8,style:"fill-opacity:.85"});
    s+=txt(x+cw/2,66,it.n,{anchor:"middle",size:19,w:700,fill:"var(--accent-ink)",mono:true});
    s+=txt(x+cw/2,86,"sdílené",{anchor:"middle",size:9.5,fill:"var(--accent-ink)"});
    s+=txt(x+cw/2,116,it.vz,{anchor:"middle",size:11.5,w:700,fill:col});
    s+=txt(x+cw/2,134,it.pom,{anchor:"middle",size:10.5,fill:"var(--ink-3)",mono:true});
    s+=txt(x+cw/2,154,it.jm,{anchor:"middle",size:10.5,w:600,fill:"var(--ink-2)"});
    s+=txt(x+cw/2,171,it.pr,{anchor:"middle",size:9.5,fill:"var(--ink-3)"});
  });
  s+=hArrow(30,W-30,192,"var(--accent)","",false);
  s+=txt(W/2,206,"přibývá sdílených vrcholů → klesá poměr Si : O → klesá náboj → roste rozměr struktury",{anchor:"middle",size:11,w:600,fill:"var(--accent)"});
  $("#miniSilWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Stavebnice křemičitanů ve zkratce"');
}
/* (C) elektronový deficit boru */
function drawMiniBor(){
  var W=720,H=234,s='',A="var(--accent)",D="var(--endo)",E="var(--exo)";
  s+=txt(24,20,"ELEKTRONOVÝ DEFICIT BORU — TŘI ZPŮSOBY, JAK SI PORADIT",{size:11.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
  function karta(ox,title,sub,col){
    var t=rect(ox,42,214,160,{fill:"var(--surface-2)",r:10,stroke:col,sw:1.5});
    t+=txt(ox+107,64,title,{anchor:"middle",size:11.5,w:700,fill:col});
    t+=txt(ox+107,188,sub,{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
    return t;
  }
  /* 1 — sextet */
  s+=karta(24,"1 · ZŮSTAT SE SEXTETEM","BF₃, BCl₃ — Lewisova kyselina","var(--bad)");
  var c1=[131,134];
  for(var i=0;i<3;i++){
    var a=Math.PI/180*(-90+120*i);
    s+=line(c1[0],c1[1],c1[0]+34*Math.cos(a),c1[1]+34*Math.sin(a),{c:E,w:2.8,cap:"round"});
    s+=atom(c1[0]+34*Math.cos(a),c1[1]+34*Math.sin(a),9,"var(--cat1)","F",9.5);
  }
  s+=atom(c1[0],c1[1],12,A,"B",11);
  s+=txt(c1[0],c1[1]-46,"jen 6 e⁻",{anchor:"middle",size:10.5,w:700,fill:"var(--bad)"});
  /* 2 — přijmout pár */
  s+=karta(253,"2 · PŘIJMOUT CIZÍ PÁR","[BF₄]⁻, F₃B←NH₃ — oktet","var(--ok)");
  var c2=[360,132];
  var pp=[[c2[0],c2[1]-36],[c2[0]-32,c2[1]+12],[c2[0]+32,c2[1]+12],[c2[0],c2[1]+38]];
  for(var i=0;i<4;i++){
    s+=line(c2[0],c2[1],pp[i][0],pp[i][1],{c:i===3?D:E,w:i===3?3.2:2.6,cap:"round"});
    s+=atom(pp[i][0],pp[i][1],9,i===3?"var(--cat2)":"var(--cat1)",i===3?"N":"F",9.5);
  }
  s+=atom(c2[0],c2[1],12,A,"B",11);
  s+=txt(c2[0],c2[1]-52,"8 e⁻ = oktet",{anchor:"middle",size:10.5,w:700,fill:"var(--ok)"});
  /* 3 — třístředová vazba */
  s+=karta(482,"3 · SDÍLET PÁR MEZI TŘEMI","B₂H₆ — třístředová vazba",D);
  var b1=[540,150], b2=[630,150], hm=[585,110];
  s+=bhBanana(b1[0],b1[1],hm[0],hm[1],-8,D,0.5);
  s+=bhBanana(hm[0],hm[1],b2[0],b2[1],-8,D,0.5);
  s+=line(b1[0],b1[1],hm[0],hm[1],{c:D,w:1.6,dash:"3 3"});
  s+=line(hm[0],hm[1],b2[0],b2[1],{c:D,w:1.6,dash:"3 3"});
  s+=atom(hm[0],hm[1],9,"var(--ink-3)","H",9.5);
  s+=atom(b1[0],b1[1],12,A,"B",11);
  s+=atom(b2[0],b2[1],12,A,"B",11);
  s+=txt(585,90,"1 pár, 3 atomy",{anchor:"middle",size:10.5,w:700,fill:D});
  s+=txt(585,170,"vazba B—B tu není",{anchor:"middle",size:9.5,fill:"var(--bad)"});
  s+=txt(W/2,218,"bor má 3 valenční elektrony, ale 4 valenční orbitaly — jeden vždycky zbývá",{anchor:"middle",size:11,w:600,fill:A});
  $("#miniBorWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Elektronový deficit boru — tři řešení"');
}
