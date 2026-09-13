/* ============================================================
   15 · k4 — PRŮZKUMNÍK RUD
   ============================================================ */
function drawRudy(){
  var r=R_($("#ruSel").value), k=K_(r.s);
  ro("#ruRo1","typ rudy",r.typ,"geochemicky "+r.geo,"");
  ro("#ruRo2","oxidační číslo kovu v rudě",r.ox,"kov je třeba redukovat na 0","");
  ro("#ruRo3","standardní potenciál kovu",sgn(k.E,2)+" V", k.E>0?"ušlechtilý — levná výroba":(k.E>-1?"mírně neušlechtilý":"velmi neušlechtilý — drahá výroba"), k.E>0?"pos":"neg");
  $("#ruMin").innerHTML='<b>Minerály:</b> <span class="chem">'+r.min+'</span><br><span style="color:var(--ink-3)">zastoupení kovu v&nbsp;zemské kůře = '+abFmt(k.ab)+' hm. % &nbsp;·&nbsp; metoda: <b>'+r.met+'</b> &nbsp;·&nbsp; technologie: '+r.proc+'</span>';
  $("#ruEq").innerHTML='<b class="chem">'+r.eq+'</b>';
  $("#ruWhy").innerHTML='<div class="callout tip" style="margin:0"><span class="eyebrow">Proč zrovna takhle</span><p>'+r.why+'</p></div>';
}
function initRudy(){
  var sorted=RUDY.slice().sort(function(a,b){ return K_(a.s).E - K_(b.s).E; });
  $("#ruSel").innerHTML=sorted.map(function(r){
    var k=K_(r.s);
    return '<option value="'+r.s+'">'+k.n+' ('+r.s+') &nbsp; E° = '+sgn(k.E,2)+' V</option>';
  }).join("");
  $("#ruSel").value="Fe";
  $("#ruSel").addEventListener("change",drawRudy);
  drawRudy();
}

/* ============================================================
   16 · k4 — PĚTIKROKOVÝ ŘETĚZ ÚPRAVY RUDY
   ============================================================ */
var upId="tezba";
function drawUprava(){
  var idx=0;
  for(var i=0;i<UPRAVA.length;i++) if(UPRAVA[i].id===upId) idx=i;
  var u=UPRAVA[idx], W=760, H=230, s='';
  s+=panelTitle("cesta od rudy ke kovu · krok "+(idx+1)+" z 5");
  var bw=132, gap=17, y=62, bh=78;
  UPRAVA.forEach(function(step,i){
    var x=18+i*(bw+gap), on=(i===idx), passed=(i<idx);
    var col = on ? "var(--accent)" : (passed ? "var(--ok)" : "var(--line-strong)");
    s+=rect(x,y,bw,bh,{fill:on?"var(--accent)":"var(--surface-2)",r:9,stroke:col,sw:on?0:1.4,style:on?"":"fill-opacity:.7"});
    s+=txt(x+bw/2,y+26,step.ico,{anchor:"middle",size:19});
    s+=txt(x+bw/2,y+48,step.n,{anchor:"middle",size:11.5,w:700,fill:on?"var(--accent-ink)":"var(--ink)"});
    s+=txt(x+bw/2,y+65,step.tag,{anchor:"middle",size:10,fill:on?"var(--accent-ink)":"var(--ink-3)",style:on?"opacity:.85":""});
    if(i<UPRAVA.length-1) s+=hArrow(x+bw+2,x+bw+gap-2,y+bh/2,"var(--line-strong)","",false);
  });
  /* pruh vstupu a výstupu */
  s+=txt(18,y+bh+34,"CO Z KROKU VYCHÁZÍ:",{size:10.5,w:700,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
  s+=txt(18,y+bh+54,u.vys,{size:12.5,w:600,fill:"var(--accent)"});
  s+=txt(18,y+bh+76,u.chem==="—"?"chemická změna: žádná — jde o čistou manipulaci s materiálem":"typická reakce: "+u.chem,{size:11.5,fill:"var(--ink-2)"});
  s+=rect(14,y+bh+18,W-28,72,{fill:"none",stroke:"var(--line)",sw:1,r:8});
  $("#upWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Pětikrokový řetěz úpravy rudy"');
  $("#upText").innerHTML='<div class="callout def" style="margin:0"><span class="eyebrow">'+u.n+'</span><p>'+u.d+'</p></div>';
  ro("#upRo1","co z kroku vychází",u.vys,"vstup do dalšího kroku","");
  ro("#upRo2","charakter kroku",u.tag, idx<2?"ještě žádná chemie":(idx===4?"o čistotu jde až tady":"tady se mění složení"),"");
  $("#upNote").innerHTML = idx===3
    ? "<b>Tohle je jádro celé metalurgie</b> — a&nbsp;přesto je to jen jeden z&nbsp;pěti kroků. Následující dvě kapitoly se zabývají právě jím: nejdřív redukcí a&nbsp;tepelným rozkladem, pak elektrolýzou."
    : "Projděte všech pět kroků po sobě. Zapamatujte si hlavně to, že chemie začíná až ve třetím kroku a&nbsp;kov vzniká až ve čtvrtém — první dva kroky jsou fyzika a&nbsp;pátý je čistota.";
}
function initUprava(){
  $$("#upSeg button").forEach(function(b){
    b.addEventListener("click",function(){ upId=this.dataset.up; segSet("#upSeg",upId,"up"); drawUprava(); });
  });
  drawUprava();
}

/* ============================================================
   17 · k5 — ELLINGHAMŮV DIAGRAM
   ============================================================ */
function drawEll(){
  var tC=+$("#ehT").value, T=tC+273.15;
  $("#ehTv").textContent=tC+" °C";
  var W=760, H=400, s='', x0=64, y0=54, gw=W-140, gh=H-100;
  var TMIN=273, TMAX=2700, GMIN=-1250, GMAX=0;
  function X(t){ return x0+(t-TMIN)/(TMAX-TMIN)*gw; }
  function Y(g){ return y0+(g-GMAX)/(GMIN-GMAX)*gh; }
  s+=panelTitle("Ellinghamův diagram (zjednodušený) · ΔG° na 1 mol O₂ [kJ·mol⁻¹]");
  /* mřížka */
  for(var g=0;g>=-1200;g-=200){
    s+=line(x0,Y(g),x0+gw,Y(g),{c:"var(--grid)",w:1});
    s+=txt(x0-8,Y(g)+4,String(g),{anchor:"end",size:10,mono:true,fill:"var(--ink-3)"});
  }
  for(var t=500;t<=2500;t+=500){
    s+=line(X(t),y0,X(t),y0+gh,{c:"var(--grid)",w:1});
    s+=txt(X(t),y0+gh+16,String(Math.round(t-273))+" °C",{anchor:"middle",size:10,mono:true,fill:"var(--ink-3)"});
  }
  s+=line(x0,y0,x0,y0+gh,{c:"var(--line-strong)",w:1.4});
  s+=line(x0,y0+gh,x0+gw,y0+gh,{c:"var(--line-strong)",w:1.4});
  /* čára uhlíku pro srovnání */
  var CO=ELL[0], gCO=ellG(CO,T);
  /* jednotlivé čáry */
  var reducible=[], notyet=[], labels=[];
  ELL.forEach(function(e){
    var g1=ellG(e,TMIN), g2=ellG(e,TMAX);
    var isC = !e.kov;
    var gT=ellG(e,T);
    var below = gT < gCO;                    /* oxid je stabilnější než CO → uhlík nestačí */
    var col = isC ? (e.id==="CO"?"var(--accent)":"var(--ink-3)") : (below ? "var(--endo)" : "var(--exo)");
    var wdt = isC ? (e.id==="CO"?3:1.6) : 1.8;
    s+=line(X(TMIN),Y(Math.max(GMIN,Math.min(GMAX,g1))),X(TMAX),Y(Math.max(GMIN,Math.min(GMAX,g2))),{c:col,w:wdt,dash:isC&&e.id!=="CO"?"5 4":""});
    if(e.kov){ (below?notyet:reducible).push(e); }
    labels.push({y:Y(Math.max(GMIN,Math.min(GMAX,g2))), t:e.id.replace(/(\d)/g,function(m){return sub(m);}), c:col});
  });
  /* popisky na pravém okraji — rozestrčené, aby se nepřekrývaly */
  labels.sort(function(a,b){ return a.y-b.y; });
  var MINGAP=14;
  for(var li=1;li<labels.length;li++){ if(labels[li].y < labels[li-1].y+MINGAP) labels[li].y = labels[li-1].y+MINGAP; }
  var over = labels[labels.length-1].y - (y0+gh);
  if(over>0){ labels.forEach(function(L){ L.y-=over; }); }
  labels.forEach(function(L){
    s+=txt(x0+gw+6,L.y+3.5,L.t,{size:9.5,w:600,fill:L.c});
  });
  /* svislice teploty */
  s+=line(X(T),y0-6,X(T),y0+gh+6,{c:"var(--accent)",w:2.2,dash:"6 4"});
  s+=txt(X(T),y0-12,tC+" °C",{anchor:"middle",size:11.5,w:700,fill:"var(--accent)"});
  s+=circ(X(T),Y(Math.max(GMIN,Math.min(GMAX,gCO))),5,{fill:"var(--accent)"});
  s+=txt(x0+8,y0+16,"nahoře = oxid se snadno rozloží (ušlechtilé kovy)",{size:10,fill:"var(--ink-3)"});
  s+=txt(x0+8,y0+gh-8,"dole = oxid je velmi stabilní (Al, Mg, Ca)",{size:10,fill:"var(--ink-3)"});
  $("#ehWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Ellinghamův diagram"');
  ro("#ehRo1","ΔG° čáry 2 C + O₂ → 2 CO",fmt(gCO,0)+" kJ·mol⁻¹","při "+tC+" °C","");
  ro("#ehRo2","kolik oxidů uhlík zredukuje",String(reducible.length)+" z "+String(reducible.length+notyet.length),"jsou to ty, jejichž čára leží nad čárou C → CO",reducible.length?"pos":"neg");
  var mk=function(arr,col){ return arr.map(function(e){ return '<span class="tag" style="border-color:'+col+';color:'+col+'">'+e.s+'</span>'; }).join(" "); };
  $("#ehList").innerHTML=
    '<div class="grid2"><div class="callout tip" style="margin:0"><span class="eyebrow">Uhlík při '+tC+' °C zredukuje oxid těchto kovů</span><p style="display:flex;gap:.35rem;flex-wrap:wrap;margin-top:.3rem">'+(reducible.length?mk(reducible,"var(--exo)"):"<i>zatím žádný — je příliš chladno</i>")+'</p></div>'+
    '<div class="callout warn" style="margin:0"><span class="eyebrow">Na tyto oxidy uhlík ještě nestačí</span><p style="display:flex;gap:.35rem;flex-wrap:wrap;margin-top:.3rem">'+(notyet.length?mk(notyet,"var(--endo)"):"<i>všechny už podlehly</i>")+'</p></div></div>';
  var note;
  if(tC<400) note="Za nízkých teplot zvládne uhlík jen oxidy nejušlechtilejších kovů. Rtuť a&nbsp;stříbro navíc žádné redukovadlo nepotřebují — jejich oxidy se rozloží samy.";
  else if(tC<900) note="Kolem 750 °C podleze čára uhlíku oxidy železa. Přesně proto vysoká pec funguje — a&nbsp;proto lidstvo umí vyrábět železo tisíce let.";
  else if(tC<1300) note="Nad 990 °C přibude zinek, kolem 1220 °C chrom. Průmyslově se pracuje vždy s&nbsp;rezervou nad hranicí, aby reakce běžela dost rychle.";
  else if(tC<2000) note="Nad 1600 °C by uhlík zvládl i&nbsp;oxid křemičitý — a&nbsp;skutečně se tak křemík vyrábí v&nbsp;obloukové peci. Hliník a&nbsp;hořčík jsou ale pořád mimo dosah.";
  else note="Nad 2000 °C by teoreticky šel zredukovat i&nbsp;oxid hlinitý, jenže taková pec je technicky i&nbsp;ekonomicky nesmyslná a&nbsp;vznikal by karbid. Proto se hliník vyrábí elektrolýzou.";
  $("#ehNote").innerHTML=note+" <span style='color:var(--ink-3)'>Diagram je zjednodušený: čáry jsou přímky, protože zanedbáváme zlomy v&nbsp;bodech tání a&nbsp;varu.</span>";
}

/* ============================================================
   18 · k5 — ROZHODOVAČ METODY VÝROBY
   ============================================================ */
function drawRozh(){
  var sym=$("#rzSel").value, k=K_(sym), r=R_(sym);
  var W=760, H=200, s='', x0=60, gw=W-120, y=112;
  s+=panelTitle("osa ušlechtilosti · standardní redukční potenciál E° [V]");
  var EMIN=-3.0, EMAX=1.6;
  function X(e){ return x0+(e-EMIN)/(EMAX-EMIN)*gw; }
  /* pásma metod */
  var zones=[[-3.0,-2.0,"tavná elektrolýza","var(--endo)"],[-2.0,-1.0,"metalotermie / elektrolýza","var(--cat1)"],
             [-1.0,0,"redukce C nebo H₂","var(--exo)"],[0,1.6,"pražení, tepelný rozklad","var(--cat4)"]];
  zones.forEach(function(z){
    s+=rect(X(z[0]),y-28,X(z[1])-X(z[0]),26,{fill:z[3],r:5,style:"fill-opacity:.28"});
    s+=txt((X(z[0])+X(z[1]))/2,y-10,z[2],{anchor:"middle",size:10.5,w:700,fill:"var(--ink)"});
  });
  s+=line(x0,y,x0+gw,y,{c:"var(--line-strong)",w:1.4});
  for(var e=-3;e<=1.5;e+=0.5){
    s+=line(X(e),y-3,X(e),y+5,{c:"var(--line-strong)",w:1});
    s+=txt(X(e),y+18,fmt(e,1),{anchor:"middle",size:9.5,mono:true,fill:"var(--ink-3)"});
  }
  /* všechny kovy z průzkumníku rud */
  RUDY.forEach(function(rr){
    var kk=K_(rr.s), sel=(rr.s===sym);
    s+=circ(X(kk.E),y,sel?9:4.5,{fill:sel?"var(--accent)":"var(--ink-3)",stroke:"var(--paper)",sw:sel?2:1});
    if(sel){
      s+=txt(X(kk.E),y+42,kk.n+" · E° = "+sgn(kk.E,2)+" V",{anchor:"middle",size:12.5,w:700,fill:"var(--accent)"});
      s+=line(X(kk.E),y+9,X(kk.E),y+28,{c:"var(--accent)",w:2});
    }
  });
  s+=txt(x0,y+66,"vlevo = neušlechtilé, drahá výroba",{size:10.5,w:600,fill:"var(--endo)"});
  s+=txt(x0+gw,y+66,"vpravo = ušlechtilé, levná výroba",{anchor:"end",size:10.5,w:600,fill:"var(--exo)"});
  $("#rzWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Osa ušlechtilosti a metoda výroby"');
  ro("#rzRo1","doporučená metoda",r.met,r.proc,"");
  ro("#rzRo2","typ rudy",r.typ,"minerál: "+r.min.split(" ")[0],"");
  ro("#rzRo3","standardní potenciál",sgn(k.E,2)+" V",k.E>0?"ušlechtilý kov":"neušlechtilý kov",k.E>0?"pos":"neg");
  $("#rzEq").innerHTML='<b class="chem">'+r.eq+'</b>';
  $("#rzWhy").innerHTML='<div class="callout def" style="margin:0"><span class="eyebrow">'+k.n+" — proč právě takto"+'</span><p>'+r.why+'</p></div>';
}
function initRozh(){
  var sorted=RUDY.slice().sort(function(a,b){ return K_(a.s).E - K_(b.s).E; });
  $("#rzSel").innerHTML=sorted.map(function(r){ var k=K_(r.s); return '<option value="'+r.s+'">'+k.n+' ('+r.s+')</option>'; }).join("");
  $("#rzSel").value="Al";
  $("#rzSel").addEventListener("change",drawRozh);
  drawRozh();
}

/* ============================================================
   19 · k5 — TRENAŽÉR METOD VÝROBY
   ============================================================ */
var drI=0, drScore=0, drDone=false;
function drawDrill(){
  var it=DRILL[drI];
  $("#drQn").textContent=drI+1; $("#drQtot").textContent=DRILL.length; $("#drScore").textContent=drScore;
  $("#drTask").innerHTML='Jakou metodou se průmyslově vyrábí <b style="color:var(--accent)">'+it.q+'</b>?';
  $("#drOpts").innerHTML=it.o.map(function(o,i){
    return '<button class="btn" type="button" data-oi="'+i+'" style="white-space:normal;line-height:1.35;text-align:left;justify-content:flex-start;height:auto;padding:.7rem .9rem">'+o+'</button>';
  }).join("");
  var ex=$("#drExplain"); ex.style.display="none"; ex.className="explain";
  $("#drNext").disabled=true; drDone=false;
  $$("#drOpts button").forEach(function(b){
    b.addEventListener("click",function(){
      if(drDone) return; drDone=true;
      var ok=+b.dataset.oi===it.c; if(ok) drScore++;
      $("#drScore").textContent=drScore;
      ex.style.display="flex"; ex.style.background=ok?"var(--ok-soft)":"var(--bad-soft)"; ex.style.borderColor=ok?"var(--ok)":"var(--bad)";
      ex.innerHTML='<span class="verdict" style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+(ok?"✓ Správně":"✕ Špatně — správně je: "+it.o[it.c])+'</span><span class="eyebrow">Proč</span><div>'+it.e+'</div>';
      $$("#drOpts button").forEach(function(x){ x.disabled=true; x.style.opacity=(+x.dataset.oi===it.c)?"1":".45"; if(+x.dataset.oi===it.c){ x.style.borderColor="var(--ok)"; x.style.color="var(--ok)"; } });
      $("#drNext").disabled = drI>=DRILL.length-1;
      if(drI>=DRILL.length-1){
        toast("Trenažér dokončen: "+drScore+" z "+DRILL.length+" správně.");
        if(drScore>=12) markDone("k5");
      }
    });
  });
}
function initDrill(){
  $("#drNext").addEventListener("click",function(){ if(drI<DRILL.length-1){ drI++; drawDrill(); } });
  $("#drReset").addEventListener("click",function(){ drI=0; drScore=0; drawDrill(); });
  drawDrill();
}
