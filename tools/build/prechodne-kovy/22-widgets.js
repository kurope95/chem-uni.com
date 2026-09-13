/* ============================================================
   18 · BARVY LÁTEK PRO SVG
   Skutečné barvy roztoků a sraženin. Používají se jen tam, kde je
   barva sama obsahem sdělení; vždy s obrysem, aby fungovaly
   ve světlém i v tmavém režimu.
   ============================================================ */
var CHEMCOL = {
 "bezbarvá":"#cfd6e0", "bílá":"#eef1f6", "žlutá":"#e8c31f", "oranžová":"#e07a10",
 "červená":"#cc2f2f", "krvavě červená":"#a01818", "hnědá":"#8a5a2b", "žlutohnědá":"#c08b2a",
 "zelená":"#2f9e46", "tmavě zelená":"#1c6e33", "bledě zelená":"#a8d8b0",
 "modrá":"#2f5fd0", "tmavě modrá":"#1b3a8f", "fialová":"#7b2fbe",
 "růžová":"#e0698f", "bledě růžová":"#f0b7c8", "černá":"#3a4149", "černohnědá":"#4a3a2a"
};
function chc(n){ return CHEMCOL[n] || "#cfd6e0"; }

/* ============================================================
   19 · k3 — ROVNOVÁHA CHROMAN ⇌ DICHROMAN
   ============================================================ */
var CHK = 4.2e14, CHTOT = 0.100;
function podilChromanu(pH){
  var h=Math.pow(10,-pH), a=2*CHK*h*h;
  var eps=4*a*CHTOT;
  var x = (eps<1e-8) ? CHTOT : (Math.sqrt(1+eps)-1)/(2*a);
  return Math.max(0,Math.min(1,x/CHTOT));
}
function drawCh(){
  var pH=(+$("#chP").value)/10, W=760, H=300, s='';
  $("#chPv").textContent=fmt(pH,1);
  var fCr=podilChromanu(pH), fDi=1-fCr;
  s+=panelTitle("složení roztoku chromu VI při pH = "+fmt(pH,1));
  s+=capt(14,50,"podíl chromu v jednotlivých částicích");
  var x0=60, xw=640;
  s+=rect(x0,66,xw*fCr,36,{fill:chc("žlutá"),style:"fill-opacity:.85"});
  s+=rect(x0+xw*fCr,66,xw*fDi,36,{fill:chc("oranžová"),style:"fill-opacity:.85"});
  s+=rect(x0,66,xw,36,{fill:"none",stroke:"var(--line-strong)",sw:1.3,r:3});
  s+=txt(60,128,"chroman CrO₄²⁻ = "+fmt(fCr*100,1)+" %",{size:12.5,w:600,fill:"var(--ink)"});
  s+=txt(400,128,"dichroman Cr₂O₇²⁻ = "+fmt(fDi*100,1)+" %",{size:12.5,w:600,fill:"var(--ink)"});
  var barva = fCr>0.8 ? "žlutá" : (fCr<0.2 ? "oranžová" : "oranžovožlutá");
  s+=circ(90,180,20,{fill:chc(fCr>0.5?"žlutá":"oranžová"),stroke:"var(--line-strong)",sw:1.3,style:"fill-opacity:.85"});
  s+=txt(126,176,"barva roztoku = "+barva,{size:12,w:600,fill:"var(--ink)"});
  s+=txt(126,198,"přechod je nejostřejší mezi pH 5 a pH 8",{size:11,fill:"var(--ink-3)"});
  s+=capt(14,228,"stupnice pH");
  var Xp=function(p){ return 60+(p-2)/10*640; };
  s+=line(60,252,700,252,{c:"var(--line-strong)",w:1.3});
  [2,4,6,8,10,12].forEach(function(p){
    s+=line(Xp(p),252,Xp(p),258,{c:"var(--line-strong)",w:1});
    s+=txt(Xp(p),274,String(p),{anchor:"middle",size:10.5,mono:true,fill:"var(--ink-3)"});
  });
  s+=txt(716,246,"pH",{size:11,fill:"var(--ink-3)"});
  s+='<path d="M'+Xp(pH)+' 250 l-6 -10 l12 0 z" style="fill:var(--accent)"/>';
  $("#chWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Rovnováha chromanu a dichromanu podle pH"');

  ro("#chRo1","podíl chromanu",fmt(fCr*100,1)+" %","žlutý CrO₄²⁻", fCr>0.5?"pos":"");
  ro("#chRo2","podíl dichromanu",fmt(fDi*100,1)+" %","oranžový Cr₂O₇²⁻", fDi>0.5?"pos":"");
  ro("#chRo3","převažující částice", fCr>0.5?"CrO₄²⁻":"Cr₂O₇²⁻", fCr>0.5?"typické pro zásadité prostředí":"typické pro kyselé prostředí","");
  $("#chVerd").innerHTML = "<span class=\"chem\">2 CrO₄²⁻ + 2 H₃O⁺ ⇌ Cr₂O₇²⁻ + 3 H₂O</span> &nbsp;— "+
    (fCr>0.5
      ? "při tomto pH je oxoniových kationtů málo, takže je rovnováha posunutá <b>doleva</b> a převažuje žlutý chroman."
      : "přídavek kyseliny posune podle Le Chatelierova principu rovnováhu <b>doprava</b>, takže převáží oranžový dichroman.")+
    " Oxidační číslo chromu je v obou částicích <b>VI</b> — nejde o redoxní děj, ale o kondenzaci.";
}

/* ============================================================
   20 · k3 — MANGANISTAN PODLE PROSTŘEDÍ
   ============================================================ */
var mnId="kys";
var MNENV = {
 kys:{nm:"kyselé prostředí", pop:"prostředí = kyselé (H₂SO₄)", prod:"Mn²⁺", ox:"II", barva:"bezbarvá",
   bpop:"bezbarvý až bledě růžový roztok", e:5, ep:1.51,
   rce:"MnO₄⁻ + 8 H₃O⁺ + 5 e⁻ → Mn²⁺ + 12 H₂O",
   txt:"Nejsilnější oxidační účinek a jednoznačný produkt. Roztok se odbarví, takže manganistan sám signalizuje bod ekvivalence — proto se manganometrie dělá právě takhle."},
 neu:{nm:"neutrální až slabě zásadité", pop:"prostředí = neutrální nebo slabě zásadité", prod:"MnO₂", ox:"IV", barva:"černohnědá",
   bpop:"hnědá sraženina oxidu manganičitého", e:3, ep:0.60,
   rce:"MnO₄⁻ + 2 H₂O + 3 e⁻ → MnO₂ + 4 OH⁻",
   txt:"Vzniká nerozpustný oxid manganičitý, který roztok zakalí. Pro titraci je to nepoužitelné — zákal znemožní odečíst barevný přechod."},
 zas:{nm:"silně zásadité prostředí", pop:"prostředí = silně zásadité (koncentrovaný hydroxid)", prod:"MnO₄²⁻", ox:"VI", barva:"tmavě zelená",
   bpop:"tmavě zelený roztok mangananu", e:1, ep:0.56,
   rce:"MnO₄⁻ + e⁻ → MnO₄²⁻",
   txt:"Manganistan přijme jediný elektron a vznikne zelený manganan. Ten je stálý jen tady — po okyselení okamžitě disproporcionuje zpět na manganistan a oxid manganičitý."}
};
function drawMn(){
  var m=MNENV[mnId], W=760, H=310, s='';
  s+=panelTitle("manganistan v prostředí: "+m.nm);
  s+=capt(14,50,"co se z manganistanu stane");
  s+=circ(120,120,34,{fill:chc("fialová"),stroke:"var(--line-strong)",sw:1.4,style:"fill-opacity:.85"});
  s+=txt(120,126,"VII",{anchor:"middle",size:15,w:700,fill:"#ffffff"});
  s+=txt(120,180,"MnO₄⁻ fialový",{anchor:"middle",size:12,w:600,fill:"var(--ink)"});
  s+=hArrow(170,352,120,"var(--accent)",false);
  s+=txt(261,104,"+ "+m.e+" e⁻",{anchor:"middle",size:12.5,w:700,fill:"var(--accent)"});
  s+=circ(400,120,34,{fill:chc(m.barva),stroke:"var(--line-strong)",sw:1.4,style:"fill-opacity:.85"});
  /* popisek uvnitř barevného kotouče: světlý text na tmavé výplni, tmavý na světlé.
     Barvy jsou pevné, protože kotouč zobrazuje skutečnou barvu látky v obou motivech. */
  s+=txt(400,126,m.ox,{anchor:"middle",size:15,w:700,fill:m.barva==="bezbarvá"?"#2a3038":"#ffffff"});
  s+=txt(400,180,m.prod+" · "+m.barva,{anchor:"middle",size:12,w:600,fill:"var(--ink)"});
  s+=capt(14,214,"prostředí a přenos elektronů");
  s+=txt(14,242,m.pop,{size:12,fill:"var(--ink-2)"});
  s+=txt(14,266,"přijatých elektronů = "+m.e,{size:12.5,w:700,fill:"var(--accent)"});
  s+=capt(440,214,"oxidační síla E° [V]");
  s+=rect(440,226,Math.max(4,m.ep/1.8*280),20,{fill:"var(--accent)",r:5,style:"fill-opacity:.7"});
  s+=rect(440,226,280,20,{fill:"none",stroke:"var(--line)",sw:1,r:5});
  s+=txt(440,268,"E° = "+sgn(m.ep,2)+" V",{size:12.5,w:600,fill:"var(--ink)"});
  $("#mnWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Produkt redukce manganistanu podle prostředí"');

  ro("#mnRo1","produkt redukce",m.prod,m.bpop,"");
  ro("#mnRo2","přijatých elektronů",String(m.e),"na jeden ion manganistanu","");
  ro("#mnRo3","standardní potenciál",sgn(m.ep,2)+" V", m.ep>1 ? "velmi silné oxidovadlo":"mírnější oxidační účinek", m.ep>1?"pos":"");
  $("#mnRce").innerHTML='<span class="chem">'+m.rce+'</span>';
  $("#mnList").innerHTML='<div class="callout '+(mnId==="kys"?"tip":"warn")+'" style="margin:0"><span class="eyebrow">'+m.nm+'</span><p>'+m.txt+'</p></div>';
}
function initMn(){
  $$("#mnSeg button").forEach(function(b){
    b.addEventListener("click",function(){ mnId=this.dataset.mn; segSet("#mnSeg",mnId,"mn"); drawMn(); });
  });
  drawMn();
}

/* ============================================================
   21 · k4 — TRIÁDA ŽELEZA
   ============================================================ */
var triId="fe";
var TRIADA = [
 {id:"fe", s:"Fe", n:"železo", cfg:"3d⁶ 4s²", rk:126, en:1.83, tt:1538, tc:770, ox:"II a III",
  oxid:"FeO, Fe₂O₃, Fe₃O₄", vyu:"ocel, pigmenty, katalyzátor Haberova procesu, hemoglobin",
  pop:"Nejrozšířenější a nejdůležitější přechodný kov. Celá jeho chemie stojí na dvojici Fe²⁺ a Fe³⁺ s potenciálem +0,77 V — je uprostřed, a proto se dá snadno oxidovat i redukovat."},
 {id:"co", s:"Co", n:"kobalt", cfg:"3d⁷ 4s²", rk:125, en:1.88, tt:1495, tc:1115, ox:"II a III",
  oxid:"CoO, Co₂O₃, Co₃O₄", vyu:"modré pigmenty a smalty, superslitiny, vitamin B₁₂, katody akumulátorů",
  pop:"V jednoduchých solích vládne stav II, v komplexech s dusíkatými ligandy naopak III. Má nejvyšší Curieovu teplotu ze všech prvků — 1115 °C."},
 {id:"ni", s:"Ni", n:"nikl", cfg:"3d⁸ 4s²", rk:125, en:1.91, tt:1455, tc:358, ox:"prakticky jen II",
  oxid:"NiO, NiO(OH)", vyu:"nerezavějící oceli, poniklování, hydrogenační katalyzátor, akumulátory",
  pop:"Proměnlivost oxidačních čísel tu už vyhasla — nikl je prakticky vždycky dvojmocný. Zato má nejvyšší elektronegativitu v celé první řadě."}
];
function drawTri(){
  var W=760, H=310, s='';
  s+=panelTitle("triáda železa — srovnání tří sousedů");
  s+=capt(14,50,"vlastnost");
  var cx=[320,470,620];
  TRIADA.forEach(function(t,i){
    if(t.id===triId) s+=rect(cx[i]-68,36,136,240,{fill:"var(--surface-3)",r:8});
    s+=txt(cx[i],62,t.s,{anchor:"middle",size:17,w:700,fill:t.id===triId?"var(--accent)":"var(--ink)"});
  });
  var rows=[
   ["kovový poloměr [pm]", function(t){ return fmt(t.rk,0); }],
   ["elektronegativita",   function(t){ return fmt(t.en,2); }],
   ["teplota tání [°C]",   function(t){ return fmt(t.tt,0); }],
   ["Curieova teplota [°C]",function(t){ return fmt(t.tc,0); }],
   ["oxidační čísla",      function(t){ return t.ox; }],
   ["valenční sféra",      function(t){ return t.cfg; }]
  ];
  rows.forEach(function(r,k){
    var y=100+k*30;
    s+=txt(14,y,r[0],{size:11.5,fill:"var(--ink-2)"});
    s+=line(14,y+9,700,y+9,{c:"var(--grid)",w:1,dash:"2 4"});
    TRIADA.forEach(function(t,i){
      s+=txt(cx[i],y,r[1](t),{anchor:"middle",size:12,w:t.id===triId?700:400,
             fill:t.id===triId?"var(--accent)":"var(--ink)"});
    });
  });
  s+=txt(14,296,"Vodorovná podobnost: poloměry i elektronegativity se liší jen nepatrně.",
        {size:11,fill:"var(--ink-3)"});
  $("#triWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Srovnání železa, kobaltu a niklu"');

  var t=pickBy(TRIADA,"id",triId);
  ro("#triRo1","Curieova teplota",fmt(t.tc,0)+" °C","nad ní feromagnetismus mizí","");
  ro("#triRo2","oxidační čísla",t.ox,"maximum podle skupiny nedosáhne ani jeden","neg");
  ro("#triRo3","oxidy",t.oxid,"přehled běžných oxidů","");
  $("#triList").innerHTML='<div class="callout def" style="margin:0"><span class="eyebrow">'+t.n+' · využití</span>'+
    '<p>'+t.pop+'</p><p style="margin-top:.4rem"><b>Kde ho potkáte:</b> '+t.vyu+'.</p></div>';
}
function initTri(){
  $$("#triSeg button").forEach(function(b){
    b.addEventListener("click",function(){ triId=this.dataset.tri; segSet("#triSeg",triId,"tri"); drawTri(); });
  });
  drawTri();
}

/* ============================================================
   22 · k4 — DŮKAZOVÉ REAKCE ŽELEZA
   ============================================================ */
var feIon="2";
var FECIN = [
 {id:"scn", nm:"thiokyanatan draselný KSCN",
  r2:{b:"bezbarvá",v:"beze změny",p:"Železnaté ionty s thiokyanatanem nereagují — nevzniká žádné zbarvení."},
  r3:{b:"krvavě červená",v:"krvavě červené zbarvení",p:"Vzniká komplex [Fe(SCN)]²⁺. Je to nejcitlivější a nejjednoznačnější důkaz železitých iontů."},
  rce2:"Fe²⁺ + SCN⁻ → bez reakce", rce3:"Fe³⁺ + SCN⁻ → [Fe(SCN)]²⁺"},
 {id:"cerv", nm:"červená krevní sůl K₃[Fe(CN)₆]",
  r2:{b:"tmavě modrá",v:"tmavě modrá sraženina",p:"Nejdřív si obě částice vymění elektron a pak se vysráží berlínská modř. Historicky se produktu říkalo Turnbullova modř."},
  r3:{b:"hnědá",v:"jen hnědé zbarvení",p:"Sraženina nevzniká — obě částice jsou ve stavu III, takže se nemá co dít."},
  rce2:"Fe²⁺ + [Fe(CN)₆]³⁻ → Fe³⁺ + [Fe(CN)₆]⁴⁻, pak 4 Fe³⁺ + 3 [Fe(CN)₆]⁴⁻ → Fe₄[Fe(CN)₆]₃",
  rce3:"Fe³⁺ + [Fe(CN)₆]³⁻ → bez sraženiny"},
 {id:"zluta", nm:"žlutá krevní sůl K₄[Fe(CN)₆]",
  r2:{b:"bledě zelená",v:"bělavá až světle modrá sraženina",p:"Vzniká hexakyanoželeznatan železnatý, který na vzduchu postupně modrá, jak se železo oxiduje."},
  r3:{b:"tmavě modrá",v:"tmavě modrá sraženina",p:"Klasická berlínská modř. Sytá barva pochází z přeskoku elektronu mezi Fe²⁺ a Fe³⁺ v mřížce."},
  rce2:"2 Fe²⁺ + [Fe(CN)₆]⁴⁻ → Fe₂[Fe(CN)₆]",
  rce3:"4 Fe³⁺ + 3 [Fe(CN)₆]⁴⁻ → Fe₄[Fe(CN)₆]₃"},
 {id:"oh", nm:"hydroxid sodný NaOH",
  r2:{b:"bledě zelená",v:"bělavě zelená sraženina",p:"Hydroxid železnatý je stálý jen bez přístupu vzduchu. Na vzduchu rychle hnědne, jak se oxiduje na železitý."},
  r3:{b:"hnědá",v:"červenohnědá rosolovitá sraženina",p:"Hydroxid železitý. Právě proto se chlorid železitý používá jako koagulant při čištění vody."},
  rce2:"Fe²⁺ + 2 OH⁻ → Fe(OH)₂", rce3:"Fe³⁺ + 3 OH⁻ → Fe(OH)₃"},
 {id:"mno4", nm:"manganistan draselný v kyselém prostředí",
  r2:{b:"bezbarvá",v:"fialová barva zmizí",p:"Železnatý ion je redukovadlo — odevzdá elektron a manganistan se odbarví. Na tom stojí celá manganometrie."},
  r3:{b:"fialová",v:"fialová barva zůstane",p:"Železitý ion už dál oxidovat nejde, takže se manganistan nespotřebuje a roztok zůstane fialový."},
  rce2:"MnO₄⁻ + 5 Fe²⁺ + 8 H₃O⁺ → Mn²⁺ + 5 Fe³⁺ + 12 H₂O",
  rce3:"MnO₄⁻ + Fe³⁺ → bez reakce"}
];
function drawFe(){
  var c=pickBy(FECIN,"id",$("#feCin").value), W=760, H=280, s='';
  s+=panelTitle("po přidání činidla: "+c.nm);
  s+=capt(14,46,"srovnání obou zkumavek");
  [{cx:250,r:c.r2,lab:"Fe²⁺ železnatý",on:feIon==="2"},
   {cx:550,r:c.r3,lab:"Fe³⁺ železitý", on:feIon==="3"}].forEach(function(o){
    if(o.on) s+=rect(o.cx-110,52,220,150,{fill:"var(--surface-3)",r:10});
    s+=txt(o.cx,68,o.lab,{anchor:"middle",size:13,w:700,fill:o.on?"var(--accent)":"var(--ink-2)"});
    s+=rect(o.cx-26,82,52,104,{fill:"var(--surface-2)",r:10,stroke:"var(--line-strong)",sw:1.4});
    s+=rect(o.cx-23,116,46,67,{fill:chc(o.r.b),r:8,style:"fill-opacity:.88"});
    s+=txt(o.cx,214,o.r.v,{anchor:"middle",size:12,w:600,fill:"var(--ink)"});
  });
  s+=txt(14,254,"Zkumavky se liší vždycky — právě proto se tyhle reakce používají jako důkazové.",
        {size:11,fill:"var(--ink-3)"});
  $("#feWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Důkazové reakce železnatých a železitých iontů"');

  var r=(feIon==="2")?c.r2:c.r3;
  ro("#feRo1","zkoumaný ion", feIon==="2"?"Fe²⁺ železnatý":"Fe³⁺ železitý",
     feIon==="2"?"konfigurace 3d⁶, 4 nepárové elektrony":"konfigurace 3d⁵, 5 nepárových elektronů","");
  ro("#feRo2","pozorování",r.v,"barva = "+r.b,"");
  $("#feRce").innerHTML='<span class="chem">'+((feIon==="2")?c.rce2:c.rce3)+'</span>';
  $("#feList").innerHTML='<div class="callout def" style="margin:0"><span class="eyebrow">Proč to tak dopadne</span><p>'+r.p+'</p></div>';
}
function initFe(){
  fillSel("#feCin",FECIN.map(function(c){ return {v:c.id,t:c.nm}; }),"v","t","scn");
  $("#feCin").addEventListener("change",drawFe);
  $$("#feSeg button").forEach(function(b){
    b.addEventListener("click",function(){ feIon=this.dataset.fe; segSet("#feSeg",feIon,"fe"); drawFe(); });
  });
  drawFe();
}
