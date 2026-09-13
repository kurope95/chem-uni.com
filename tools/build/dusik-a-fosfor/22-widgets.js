/* ============================================================
   12 · KAPITOLA 4 — průzkumník oxidů dusíku
   ============================================================ */
var noxState = {i:0};
function drawNox(){
  var d = NOX[noxState.i], W=700, H=210, s="";
  var CN="var(--cat2)", CO="var(--exo)", cy=100, cx=350;
  if(d.f==="N₂O"){
    var p1=[cx-90,cy], p2=[cx,cy], p3=[cx+90,cy];
    s += bondN(p1[0],p1[1],p2[0],p2[1],2,{c:"var(--ink-2)",w:2.2,gap:5});
    s += bondN(p2[0],p2[1],p3[0],p3[1],2,{c:"var(--ink-2)",w:2.2,gap:5});
    s += lonePair(p1[0]-2,p1[1]-30,0,CN);
    s += lonePair(p3[0]+2,p3[1]-30,0,CO);
    s += lonePair(p3[0]+2,p3[1]+30,0,CO);
    s += atom(p1[0],p1[1],"N",{r:19,fill:"var(--surface)",stroke:CN,ink:CN,size:16});
    s += atom(p2[0],p2[1],"N",{r:19,fill:"var(--surface)",stroke:CN,ink:CN,size:16});
    s += atom(p3[0],p3[1],"O",{r:19,fill:"var(--surface)",stroke:CO,ink:CO,size:16});
    s += txt(cx,cy+62,"lineární molekula, úhel 180°",{anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  } else if(d.f==="NO"){
    var q1=[cx-52,cy], q2=[cx+52,cy];
    s += bondN(q1[0],q1[1],q2[0],q2[1],2,{c:"var(--ink-2)",w:2.4,gap:6});
    s += line(cx-30,cy+11,cx+30,cy+11,{c:"var(--accent)",w:2.2,dash:"5 4",cap:"round"});
    s += '<circle cx="'+(q1[0])+'" cy="'+(q1[1]-30)+'" r="3.4" style="fill:var(--accent)"/>';
    s += txt(q1[0]-10,q1[1]-38,"nepárový elektron",{anchor:"end",size:10.5,w:600,fill:"var(--accent)"});
    s += atom(q1[0],q1[1],"N",{r:20,fill:"var(--surface)",stroke:CN,ink:CN,size:17});
    s += atom(q2[0],q2[1],"O",{r:20,fill:"var(--surface)",stroke:CO,ink:CO,size:17});
    s += txt(cx,cy+62,"řád vazby 2,5 — dvě celé vazby a jeden elektron navíc v protivazebném orbitalu",
             {anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  } else if(d.f==="N₂O₃"){
    var n1=[cx-56,cy+10], n2=[cx+38,cy+10];
    var o1=[cx-118,cy-40], o2=[cx+96,cy-46], o3=[cx+96,cy+62];
    s += bondN(n1[0],n1[1],n2[0],n2[1],1,{c:"var(--ink-2)",w:2.2});
    s += bondN(n1[0],n1[1],o1[0],o1[1],2,{c:"var(--ink-2)",w:2,gap:5});
    s += bondN(n2[0],n2[1],o2[0],o2[1],2,{c:"var(--ink-2)",w:2,gap:5});
    s += bondN(n2[0],n2[1],o3[0],o3[1],1,{c:"var(--ink-2)",w:2});
    s += lonePair(n1[0]+4,n1[1]+30,0,CN);
    s += atom(o1[0],o1[1],"O",{r:17,fill:"var(--surface)",stroke:CO,ink:CO,size:14});
    s += atom(o2[0],o2[1],"O",{r:17,fill:"var(--surface)",stroke:CO,ink:CO,size:14});
    s += atom(o3[0],o3[1],"O",{r:17,fill:"var(--surface)",stroke:CO,ink:CO,size:14});
    s += atom(n1[0],n1[1],"N",{r:18,fill:"var(--surface)",stroke:CN,ink:CN,size:15});
    s += atom(n2[0],n2[1],"N",{r:18,fill:"var(--surface)",stroke:CN,ink:CN,size:15});
    s += txt(cx,cy+92,"nesymetrická molekula — vlevo fragment NO, vpravo fragment NO₂",
             {anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  } else if(d.f.indexOf("NO₂")===0){
    var m=[cx-160,cy+16], ma=[cx-230,cy-40], mb=[cx-90,cy-40];
    s += bondN(m[0],m[1],ma[0],ma[1],2,{c:"var(--ink-2)",w:2,gap:5});
    s += bondN(m[0],m[1],mb[0],mb[1],1,{c:"var(--ink-2)",w:2});
    s += '<circle cx="'+m[0]+'" cy="'+(m[1]+26)+'" r="3.4" style="fill:var(--accent)"/>';
    s += atom(ma[0],ma[1],"O",{r:16,fill:"var(--surface)",stroke:CO,ink:CO,size:13});
    s += atom(mb[0],mb[1],"O",{r:16,fill:"var(--surface)",stroke:CO,ink:CO,size:13});
    s += atom(m[0],m[1],"N",{r:18,fill:"var(--surface)",stroke:CN,ink:CN,size:15});
    s += txt(cx-160,cy+66,"NO₂ — hnědý radikál, úhel 134°",{anchor:"middle",size:11,w:600,fill:"var(--exo)"});
    s += hArr2(cx-40,cx+40,cy+8,"var(--accent)","2 NO₂ ⇌ N₂O₄");
    var d1=[cx+150,cy+6], d2=[cx+236,cy+6];
    s += bondN(d1[0],d1[1],d2[0],d2[1],1,{c:"var(--ink-2)",w:2.4});
    [[d1,-1],[d2,1]].forEach(function(pr){
      var n=pr[0], sx=pr[1];
      s += bondN(n[0],n[1],n[0]+sx*40,n[1]-46,2,{c:"var(--ink-2)",w:1.8,gap:4});
      s += bondN(n[0],n[1],n[0]+sx*40,n[1]+46,1,{c:"var(--ink-2)",w:1.8});
      s += atom(n[0]+sx*40,n[1]-46,"O",{r:14,fill:"var(--surface)",stroke:CO,ink:CO,size:12});
      s += atom(n[0]+sx*40,n[1]+46,"O",{r:14,fill:"var(--surface)",stroke:CO,ink:CO,size:12});
      s += atom(n[0],n[1],"N",{r:16,fill:"var(--surface)",stroke:CN,ink:CN,size:14});
    });
    s += txt(cx+193,cy+82,"N₂O₄ — bezbarvý dimer, vazba N—N",{anchor:"middle",size:11,w:600,fill:"var(--ink-2)"});
  } else {
    var c1=[cx-70,cy], c2=[cx+70,cy], mid=[cx,cy];
    s += bondN(c1[0],c1[1],mid[0],mid[1],1,{c:"var(--ink-2)",w:2});
    s += bondN(mid[0],mid[1],c2[0],c2[1],1,{c:"var(--ink-2)",w:2});
    [[c1,-1],[c2,1]].forEach(function(pr){
      var n=pr[0], sx=pr[1];
      s += bondN(n[0],n[1],n[0]+sx*48,n[1]-46,2,{c:"var(--ink-2)",w:1.8,gap:4});
      s += bondN(n[0],n[1],n[0]+sx*48,n[1]+46,2,{c:"var(--ink-2)",w:1.8,gap:4});
      s += atom(n[0]+sx*48,n[1]-46,"O",{r:15,fill:"var(--surface)",stroke:CO,ink:CO,size:13});
      s += atom(n[0]+sx*48,n[1]+46,"O",{r:15,fill:"var(--surface)",stroke:CO,ink:CO,size:13});
      s += atom(n[0],n[1],"N",{r:17,fill:"var(--surface)",stroke:CN,ink:CN,size:14});
    });
    s += atom(mid[0],mid[1],"O",{r:17,fill:"var(--surface)",stroke:CO,ink:CO,size:14});
    s += txt(cx,cy+86,"v plynu můstek O₂N—O—NO₂ · v krystalu ionty NO₂⁺ a NO₃⁻",
             {anchor:"middle",size:11.5,w:600,fill:"var(--ink-2)"});
  }
  $("#noxWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Struktura molekuly '+d.nm+'"');

  $("#noxRo1").innerHTML = '<span class="k">Oxidační číslo dusíku</span><span class="v">'+d.ox+'</span><span class="h">'+d.nm+'</span>';
  $("#noxRo2").innerHTML = '<span class="k">Barva a magnetismus</span><span class="v" style="font-size:.95rem">'+d.barva+'</span><span class="h">'+d.mag+'</span>';
  $("#noxRo3").innerHTML = '<span class="k">Tvar molekuly</span><span class="v" style="font-size:.92rem">'+d.tvar+'</span><span class="h">teplota varu / rozkladu: '+d.tv+'</span>';
  $("#noxRo4").innerHTML = '<span class="k">Chování k vodě</span><span class="v" style="font-size:.92rem">'+d.voda+'</span><span class="h">anhydrid poznáte podle stejného oxidačního čísla jako v kyselině</span>';
  $("#noxText").innerHTML =
    '<p><b>Jak vzniká.</b> <span class="chem">'+d.vznik+'</span></p>'+
    '<p style="margin-top:.5rem"><b>Redoxní chování.</b> '+d.redox+'</p>'+
    '<p style="margin-top:.5rem"><b>K čemu je.</b> '+d.pouziti+'</p>';
  $("#noxSel").value = String(noxState.i);
}
function initNox(){
  $("#noxSel").innerHTML = NOX.map(function(d,i){
    return '<option value="'+i+'">'+d.f+' — '+d.nm+' ('+d.ox+')</option>';
  }).join("");
  $("#noxSel").addEventListener("change", function(){ noxState.i = +this.value; drawNox(); });
  drawNox();
}

/* ============================================================
   13 · KAPITOLA 5 — Ostwaldův proces
   ============================================================ */
var ostState = {k:"all"};
var OSTS = [
  {k:"s1", nm:"1 · katalytické spalování", eq:"4 NH₃(g) + 5 O₂(g) → 4 NO(g) + 6 H₂O(g)",
   pod:"síťka Pt–Rh, 850–950 °C, kontaktní doba tisícina sekundy",
   txt:"Bez katalyzátoru by amoniak shořel na dusík a vodu — to je termodynamicky výhodnější. Platinová síťka ale otevře rychlejší cestu k oxidu dusnatému, a protože je kontaktní doba nepatrná, směs se nestihne přeuspořádat na stabilnější produkt. Hned za síťkou se plyn prudce ochladí, aby se NO nerozpadl zpátky na prvky.",
   ro:["ΔH = −905 kJ na 4 mol NH₃","výtěžek NO přes 95 %","teplo se využívá k výrobě páry"]},
  {k:"s2", nm:"2 · oxidace na vzduchu", eq:"2 NO(g) + O₂(g) → 2 NO₂(g)",
   pod:"ochlazená směs, bez katalyzátoru, 20–50 °C",
   txt:"Tenhle krok se udělá sám — oxid dusnatý se na vzduchu okamžitě oxiduje a plyn zhnědne. Zajímavost: reakce je rychlejší za nižší teploty, což je mezi reakcemi vzácnost. Za chladu se navíc část NO₂ dimeruje na bezbarvý N₂O₄.",
   ro:["ΔH = −114 kJ na 2 mol NO","probíhá samovolně na vzduchu","současně 2 NO₂ ⇌ N₂O₄"]},
  {k:"s3", nm:"3 · absorpce ve vodě", eq:"3 NO₂(g) + H₂O(l) → 2 HNO₃(aq) + NO(g)",
   pod:"absorpční kolona, protiproud vody, přetlak, dmýchaný vzduch",
   txt:"Oxid dusičitý ve vodě disproporcionuje: dvě třetiny dusíku jdou nahoru na kyselinu dusičnou, jedna třetina dolů zpátky na NO. Uvolněný NO se v koloně znovu oxiduje vzduchem a proces se opakuje, takže se nakonec využije skoro všechen dusík. Výsledkem je zhruba padesátiprocentní kyselina.",
   ro:["roztok 50–60 % HNO₃","NO se recykluje zpět","celková bilance: NH₃ → HNO₃ je 1 : 1"]},
  {k:"s4", nm:"4 · zahuštění", eq:"destilace na azeotrop 68 % · dýmavá HNO₃ 98 %",
   pod:"prostá destilace stačí jen do 68 %, dál se musí odvodňovat",
   txt:"Destilací se roztok zahustí nejvýš na azeotropickou směs, která obsahuje 68 % kyseliny a vře při 122 °C. Dýmavá kyselina (98 %) se dělá jinak: kapalný N₂O₄ se za tlaku a přítomnosti kyslíku rozpouští v horké zředěné kyselině dusičné.",
   ro:["azeotrop 68 %, vře při 122 °C","c(HNO₃) ≈ 15,3 mol·dm⁻³","dýmavá kyselina má ≈ 23,5 mol·dm⁻³"]}
];
function ostGet(k){ for(var i=0;i<OSTS.length;i++) if(OSTS[i].k===k) return OSTS[i]; return null; }
function drawOst(){
  var W=790, H=210, s="";
  var nodes = [
    {x:14,  w:122, lab:"NH₃|z Haberova procesu", c:"var(--cat1)"},
    {x:176, w:122, lab:"NO|oxid dusnatý", c:"var(--cat3)"},
    {x:338, w:122, lab:"NO₂ / N₂O₄|oxid dusičitý", c:"var(--exo)"},
    {x:500, w:122, lab:"HNO₃ (aq)|50–60 %", c:"var(--accent)"},
    {x:662, w:112, lab:"HNO₃|68 % / 98 %", c:"var(--accent)"}
  ];
  var bh=52, by=72;
  var si = ["s1","s2","s3","s4"].indexOf(ostState.k);
  nodes.forEach(function(n,i){
    var on = (si < 0) || (i===si) || (i===si+1);
    s += box(n.x, by, n.w, bh, n.lab, {fill:on?"var(--surface)":"var(--surface-2)",
             stroke:on?n.c:"var(--line)", sw:on?2.2:1, ink:on?n.c:"var(--ink-3)", size:11.5});
  });
  var labs = ["+ O₂ / Pt–Rh", "+ O₂", "+ H₂O", "destilace"];
  labs.forEach(function(lab, i){
    var on = (si < 0) || (i===si);
    var c = on ? "var(--accent)" : "var(--line-strong)";
    var xx1 = nodes[i].x + nodes[i].w, xx2 = nodes[i+1].x;
    s += hArr(xx1+3, xx2-3, by+bh/2, c, "", false);
    s += txt((xx1+xx2)/2, by-8, lab, {anchor:"middle", size:10, w:600, fill:c});
    s += txt((xx1+xx2)/2, by+bh+16, String(i+1), {anchor:"middle", size:11, w:700, mono:true, fill:c});
  });
  /* recyklace NO */
  s += '<path d="M'+(nodes[3].x+20)+' '+(by+bh)+' C '+(nodes[3].x+20)+' '+(by+bh+42)+', '+
       (nodes[2].x+20)+' '+(by+bh+42)+', '+(nodes[2].x+20)+' '+(by+bh)+
       '" style="fill:none;stroke:var(--endo);stroke-width:2;stroke-dasharray:5 4"/>';
  s += '<path d="M'+(nodes[2].x+20)+' '+(by+bh)+' l-4 8 l8 0 z" style="fill:var(--endo)"/>';
  s += txt((nodes[2].x+nodes[3].x)/2+20, by+bh+56, "uvolněný NO se vrací do kolony a znovu se oxiduje",
           {anchor:"middle", size:10.5, w:600, fill:"var(--endo)"});
  s += txt(26, 30, "Celková bilance: z jednoho molu amoniaku vznikne jeden mol kyseliny dusičné.",
           {size:11.5, w:600, fill:"var(--ink-2)"});
  s += txt(26, H-8, "Dusík projde stavy: −III (NH₃) → +II (NO) → +IV (NO₂) → +V (HNO₃). Celkem odevzdá osm elektronů.",
           {size:10.5, fill:"var(--ink-3)"});
  $("#ostWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Schéma Ostwaldova procesu"');

  $$("#ostStep button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===ostState.k); });
  var ostBoxes = [$("#ostRo1"), $("#ostRo2"), $("#ostRo3")];
  var st = ostGet(ostState.k);
  if(st){
    $("#ostEq").innerHTML = '<span class="chem">'+st.eq+'</span>';
    $("#ostText").innerHTML = '<span class="eyebrow" style="color:var(--accent)">'+st.nm+'</span>'+
      '<p style="margin-top:.35rem;font-size:.9rem;color:var(--ink-3)">'+st.pod+'</p>'+
      '<p style="margin-top:.5rem">'+st.txt+'</p>';
    st.ro.forEach(function(t,i){ ostBoxes[i].innerHTML =
      '<span class="k">Údaj '+(i+1)+'</span><span class="v" style="font-size:.95rem">'+t+'</span>'; });
  } else {
    $("#ostEq").innerHTML = '<span class="chem">NH₃ + 2 O₂ → HNO₃ + H₂O</span> <span style="color:var(--ink-3)">(souhrnně, po sečtení všech kroků a recyklaci NO)</span>';
    $("#ostText").innerHTML = '<span class="eyebrow" style="color:var(--accent)">Celý proces</span>'+
      '<p style="margin-top:.35rem">Ostwaldův proces navazuje přímo na Haberův: amoniak, který se v prvním z nich vyrobí, se ve druhém oxiduje až na kyselinu dusičnou. Dohromady tak vzduch, voda a energie stačí na výrobu hnojiv i výbušnin. Vyberte si nahoře jednotlivé kroky a projděte si je po jednom.</p>';
    var all = ["z 1 t NH₃ vznikne 3,70 t HNO₃","dusík odevzdá celkem 8 elektronů","výtěžek celého procesu bývá nad 95 %"];
    all.forEach(function(t,i){ ostBoxes[i].innerHTML =
      '<span class="k">Bilance '+(i+1)+'</span><span class="v" style="font-size:.95rem">'+t+'</span>'; });
  }
}
function initOst(){
  $$("#ostStep button").forEach(function(b){
    b.addEventListener("click", function(){ ostState.k = b.dataset.v; drawOst(); });
  });
  drawOst();
}

/* ============================================================
   14 · KAPITOLA 5 — kov + kyselina dusičná
   ============================================================ */
var metState = {m:"Cu", c:"konc"};
var METC = {konc:"koncentrovaná (65 %)", zred:"zředěná (asi 10 %)", velmi:"velmi zředěná (pod 5 %)"};
function drawMet(){
  var key = metState.m+"|"+metState.c, d = METQ[key];
  var W=720, H=200, s="";
  var levels = [{v:5,f:"HNO₃",l:"+V"},{v:4,f:"NO₂",l:"+IV"},{v:3,f:"HNO₂",l:"+III"},
                {v:2,f:"NO",l:"+II"},{v:1,f:"N₂O",l:"+I"},{v:0,f:"N₂",l:"0"},{v:-3,f:"NH₄⁺",l:"−III"}];
  var x0=54, colW=(W-x0-30)/levels.length, yB=118;
  levels.forEach(function(L,i){
    var x = x0 + i*colW, on = (d && d.ox===L.v), start = (L.v===5);
    var c = on ? "var(--accent)" : (start ? "var(--exo)" : "var(--line-strong)");
    s += box(x, yB-30, colW-14, 46, L.f+"|"+L.l, {fill:on?"var(--accent-soft)":(start?"var(--exo-soft)":"var(--surface-2)"),
             stroke:c, sw:on?2.4:1, ink:on?"var(--accent)":(start?"var(--exo)":"var(--ink-2)"), size:12});
    if(on) s += txt(x+(colW-14)/2, yB-42, "sem se dusík zredukuje", {anchor:"middle", size:10.5, w:700, fill:"var(--accent)"});
  });
  s += hArr(x0+colW*0.5, x0+colW*(levels.length-0.6), yB+42, "var(--endo)",
            "roste zředění kyseliny a roste neušlechtilost kovu → hlubší redukce dusíku", false);
  s += txt(x0, 22, "Kyselina dusičná nikdy neuvolní vodík — oxiduje dusičnanovým aniontem, ne protonem.",
           {size:11.5, w:600, fill:"var(--ink-2)"});
  s += txt(x0, 38, "Podle koncentrace kyseliny a ušlechtilosti kovu se dusík zastaví na jiné příčce.",
           {size:11.5, w:600, fill:"var(--ink-2)"});
  if(d && d.ox===null){
    s += rect(x0, yB-30, W-x0-30-14, 46, {r:8, fill:"var(--surface)", style:"fill-opacity:.72"});
    s += txt((x0+W-44)/2, yB-42, "kov se pasivuje nebo vůbec nereaguje", {anchor:"middle", size:14, w:700, fill:"var(--bad)"});
  }
  s += txt(x0, H-8, "Reálně vzniká vždycky směs plynů; uvedený produkt je ten, který v daných podmínkách převládá.",
           {size:10.5, fill:"var(--ink-3)"});
  $("#metWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Kam až se zredukuje dusík z kyseliny dusičné"');

  $$("#metC button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===metState.c); });
  $("#metM").value = metState.m;
  $("#metEq").innerHTML = '<span class="chem">'+d.eq+'</span>';
  $("#metText").innerHTML = '<span class="eyebrow" style="color:var(--accent)">'+metState.m+' + '+METC[metState.c]+' HNO₃</span>'+
    '<p style="margin-top:.35rem">'+d.txt+'</p>';
}
function initMet(){
  $("#metM").innerHTML = METM.map(function(m){ return '<option value="'+m.s+'">'+m.s+' — '+m.nm+'</option>'; }).join("");
  $("#metM").addEventListener("change", function(){ metState.m = this.value; drawMet(); });
  $$("#metC button").forEach(function(b){
    b.addEventListener("click", function(){ metState.c = b.dataset.v; drawMet(); });
  });
  drawMet();
}

/* ============================================================
   15 · KAPITOLA 5 — trenažér „co vznikne“
   ============================================================ */
var prdI = 0, prdScore = 0, prdDone = false;
function drawPrd(){
  var it = PRD[prdI];
  $("#prdQn").textContent = prdI+1;
  $("#prdQtot").textContent = PRD.length;
  $("#prdScore").textContent = prdScore;
  $("#prdTask").innerHTML = it.q;
  $("#prdOpts").innerHTML = it.o.map(function(o,i){
    return '<button class="btn" type="button" data-oi="'+i+'" style="white-space:normal;line-height:1.35;text-align:left;justify-content:flex-start">'+o+'</button>';
  }).join("");
  var ex = $("#prdExplain");
  ex.style.display="none"; ex.className="explain";
  $("#prdNext").disabled = true; prdDone = false;
  $$("#prdOpts button").forEach(function(b){
    b.addEventListener("click", function(){
      if(prdDone) return; prdDone = true;
      var ok = (+b.dataset.oi === it.c);
      if(ok) prdScore++;
      $("#prdScore").textContent = prdScore;
      ex.style.display="flex";
      ex.style.background = ok ? "var(--ok-soft)" : "var(--bad-soft)";
      ex.style.borderColor = ok ? "var(--ok)" : "var(--bad)";
      ex.innerHTML = '<span class="verdict" style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+
        (ok ? "✓ Správně" : "✕ Špatně — správně je „"+it.o[it.c]+"“")+
        '</span><span class="eyebrow">Proč</span><div>'+it.e+'</div>';
      $$("#prdOpts button").forEach(function(x){
        x.disabled = true;
        x.style.opacity = (+x.dataset.oi===it.c) ? "1" : ".45";
        if(+x.dataset.oi===it.c){ x.style.borderColor="var(--ok)"; x.style.color="var(--ok)"; }
      });
      $("#prdNext").disabled = (prdI >= PRD.length-1);
      if(prdI >= PRD.length-1){
        toast("Trenažér dokončen: "+prdScore+" z "+PRD.length+" správně.");
        if(prdScore >= 12) markDone("k5");
      }
    });
  });
}
function initPrd(){
  $("#prdNext").addEventListener("click", function(){ if(prdI<PRD.length-1){ prdI++; drawPrd(); } });
  $("#prdReset").addEventListener("click", function(){ prdI=0; prdScore=0; drawPrd(); });
  drawPrd();
}

/* ============================================================
   16 · KAPITOLA 6 — struktury binárních sloučenin fosforu
   ============================================================ */
var pstState = {k:"P4O10"};
function pstGet(k){ for(var i=0;i<PBIN.length;i++) if(PBIN[i].k===k) return PBIN[i]; return PBIN[0]; }
function drawPst(){
  var d = pstGet(pstState.k), W=700, H=284, s="";
  var CP="var(--cat3)", CO="var(--exo)", CCl="var(--cat1)";
  var cx=350, cy=132;
  function tetra(scale){
    var k = scale||1;
    return [[cx, cy-72*k], [cx-78*k, cy+46*k], [cx+78*k, cy+46*k], [cx+8*k, cy-4*k]];
  }
  if(d.k==="P4" || d.k==="P4O6" || d.k==="P4O10"){
    var v = tetra(1);
    var pairs = [[0,1],[0,2],[1,2],[0,3],[1,3],[2,3]];
    if(d.k==="P4"){
      pairs.forEach(function(p){ s += bondN(v[p[0]][0],v[p[0]][1],v[p[1]][0],v[p[1]][1],1,{c:CP,w:2.6}); });
    } else {
      pairs.forEach(function(p){
        var mx=(v[p[0]][0]+v[p[1]][0])/2, my=(v[p[0]][1]+v[p[1]][1])/2;
        s += bondN(v[p[0]][0],v[p[0]][1],mx,my,1,{c:CP,w:2.2});
        s += bondN(mx,my,v[p[1]][0],v[p[1]][1],1,{c:CP,w:2.2});
      });
      pairs.forEach(function(p){
        var mx=(v[p[0]][0]+v[p[1]][0])/2, my=(v[p[0]][1]+v[p[1]][1])/2;
        s += atom(mx,my,"O",{r:12,fill:"var(--surface)",stroke:CO,ink:CO,size:11});
      });
    }
    if(d.k==="P4O10"){
      var out = [[0,-40],[-38,26],[38,26],[56,-34]];
      v.forEach(function(p,i){
        var ex = p[0]+out[i][0]*0.9, ey = p[1]+out[i][1]*0.9;
        s += bondN(p[0],p[1],ex,ey,2,{c:CO,w:1.8,gap:4});
        s += atom(ex,ey,"O",{r:12,fill:"var(--exo-soft)",stroke:CO,ink:CO,size:11});
      });
    }
    v.forEach(function(p){ s += atom(p[0],p[1],"P",{r:16,fill:"var(--surface)",stroke:CP,ink:CP,size:14}); });
    if(d.k==="P4") v.slice(0,3).forEach(function(p,i){ s += lonePair(p[0]+[0,-26,26][i], p[1]-24, 0, CP); });
    if(d.k==="P4O6") s += txt(cx, cy+112, "fosfor si ponechal volný pár — proto se P₄O₆ dá ještě oxidovat",
                              {anchor:"middle", size:11, w:600, fill:CP});
    if(d.k==="P4O10") s += txt(cx, cy+112, "čtyři koncové kyslíky navíc, vazba P=O · fosfor už je v +V",
                               {anchor:"middle", size:11, w:600, fill:CO});
    if(d.k==="P4") s += txt(cx, cy+112, "šest vazeb P—P, každý atom se třemi sousedy a volným párem",
                            {anchor:"middle", size:11, w:600, fill:CP});
  } else if(d.k==="PCl3"){
    var A=[cx, cy+62], B=[cx-72, cy+22], C2=[cx+72, cy+22], ctr=[cx, cy-24];
    [A,B,C2].forEach(function(p){ s += bondN(ctr[0],ctr[1],p[0],p[1],1,{c:"var(--ink-2)",w:2.2}); });
    s += lonePair(ctr[0], ctr[1]-26, 0, CP);
    s += atom(ctr[0],ctr[1],"P",{r:19,fill:"var(--surface)",stroke:CP,ink:CP,size:16});
    [A,B,C2].forEach(function(p){ s += atom(p[0],p[1],"Cl",{r:16,fill:"var(--surface)",stroke:CCl,ink:CCl,size:12}); });
    s += txt(cx, cy+112, "pyramida, vaznost 3 — přesně jako u fosfanu", {anchor:"middle", size:11.5, w:600, fill:CP});
  } else if(d.k==="PCl5"){
    var eq1=[cx-84,cy+26], eq2=[cx+84,cy+26], eq3=[cx, cy+52];
    var ax1=[cx, cy-84], ax2=[cx-10, cy+108];
    [eq1,eq2,eq3].forEach(function(p){ s += bondN(cx,cy,p[0],p[1],1,{c:"var(--ink-2)",w:2.2}); });
    [ax1,ax2].forEach(function(p){ s += bondN(cx,cy,p[0],p[1],1,{c:"var(--accent)",w:2.4}); });
    [eq1,eq2,eq3].forEach(function(p){ s += atom(p[0],p[1],"Cl",{r:15,fill:"var(--surface)",stroke:CCl,ink:CCl,size:11.5}); });
    [ax1,ax2].forEach(function(p){ s += atom(p[0],p[1],"Cl",{r:15,fill:"var(--accent-soft)",stroke:"var(--accent)",ink:"var(--accent)",size:11.5}); });
    s += atom(cx,cy,"P",{r:19,fill:"var(--surface)",stroke:CP,ink:CP,size:16});
    s += txt(cx+130, cy-84, "axiální (delší)", {size:10.5, w:600, fill:"var(--accent)"});
    s += txt(cx+130, cy+26, "rovníkové (kratší)", {size:10.5, w:600, fill:CCl});
    s += txt(cx, H-16, "trigonální bipyramida, vaznost 5 — dusík by tuhle molekulu nikdy nevytvořil",
             {anchor:"middle", size:11.5, w:600, fill:CP});
  } else {
    var o=[cx, cy-72], c1=[cx-72, cy+40], c2b=[cx+72, cy+40], c3=[cx, cy+72];
    s += bondN(cx,cy,o[0],o[1],2,{c:CO,w:2.2,gap:5});
    [c1,c2b,c3].forEach(function(p){ s += bondN(cx,cy,p[0],p[1],1,{c:"var(--ink-2)",w:2.2}); });
    s += atom(o[0],o[1],"O",{r:17,fill:"var(--exo-soft)",stroke:CO,ink:CO,size:14});
    [c1,c2b,c3].forEach(function(p){ s += atom(p[0],p[1],"Cl",{r:16,fill:"var(--surface)",stroke:CCl,ink:CCl,size:12}); });
    s += atom(cx,cy,"P",{r:19,fill:"var(--surface)",stroke:CP,ink:CP,size:16});
    s += txt(cx, cy+118, "tetraedr, vaznost 4 · krátká a velmi pevná vazba P=O", {anchor:"middle", size:11.5, w:600, fill:CO});
  }
  $("#pstWrap").innerHTML = svg("0 0 "+W+" "+H, s, 'aria-label="Struktura: '+d.nm+'"');

  $$("#pstSel button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===pstState.k); });
  $("#pstRo1").innerHTML = '<span class="k">Oxidační číslo fosforu</span><span class="v">'+d.ox+'</span><span class="h">'+d.nm+'</span>';
  $("#pstRo2").innerHTML = '<span class="k">Koordinace a vaznost</span><span class="v" style="font-size:.95rem">'+d.koord+'</span><span class="h">vaznost 5 a 6 zvládne jen fosfor, ne dusík</span>';
  $("#pstText").innerHTML = d.txt;
}
function initPst(){
  $$("#pstSel button").forEach(function(b){
    b.addEventListener("click", function(){ pstState.k = b.dataset.v; drawPst(); });
  });
  drawPst();
}
