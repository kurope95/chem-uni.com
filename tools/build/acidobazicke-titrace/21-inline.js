/* ============================================================
   A10 · BARVA V BAŇCE (ikony v klíčovém postupu)
   ============================================================ */
var FLC = {clear:"rgba(214,232,242,.55)", pink:"rgba(236,120,186,.75)", spot:"rgba(214,232,242,.55)", spotlong:"rgba(242,200,224,.7)"};
function paintFlasks(){
  $$(".jd-flask").forEach(function(el){
    var k=el.dataset.c, c=FLC[k]||FLC.clear;
    var drop = (k==="spot"||k==="spotlong") ? '<ellipse cx="20" cy="35.5" rx="'+(k==="spot"?4:7)+'" ry="1.8" style="fill:rgba(214,51,143,.9)"/>' : '';
    el.innerHTML='<svg viewBox="0 0 40 48" aria-hidden="true">'+
      '<path d="M8.5 33 L4 44 Q4 46 6 46 L34 46 Q36 46 36 44 L31.5 33 Z" style="fill:'+c+'"/>'+drop+
      '<path d="M16 3 L16 18 L4 44 Q4 46 6 46 L34 46 Q36 46 36 44 L24 18 L24 3" style="fill:none;stroke:var(--ink-2);stroke-width:2;stroke-linejoin:round"/>'+
      '<path d="M13.5 3 L26.5 3" style="stroke:var(--ink-2);stroke-width:2;stroke-linecap:round"/></svg>';
  });
}

/* ============================================================
   A11 · DOPLŇOVAČKY
   ============================================================ */
function normAns(s){ return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/₂/g,"2").replace(/ₐ/g,"a").replace(/\s/g,""); }
function initFills(){
  $$(".jd-fill").forEach(function(box){
    var ans=JSON.parse(box.dataset.ans), ins=$$("input",box), fb=$(".jd-fb",box);
    $("button",box).addEventListener("click",function(){
      var ok=0;
      ins.forEach(function(inp,i){
        var v=normAns(inp.value), good=ans[i].some(function(a){ return normAns(a)===v; });
        inp.classList.remove("ok","bad"); inp.classList.add(good?"ok":"bad");
        if(good) ok++;
      });
      fb.innerHTML = ok===ins.length ? '<b style="color:var(--ok)">✓ Správně!</b>'
        : '<b style="color:var(--bad)">✕ Ještě ne.</b> Správně: '+ans.map(function(a){return "<b>"+a[0]+"</b>";}).join(", ");
    });
  });
}

/* ============================================================
   A12 · KVÍZY PŘÍMO V TEXTU (a otázky ke grafům)
   ============================================================ */
function graph(c){ return '<div class="svgwrap jd-qg">'+curveSVG(c)+'</div>'; }
var QS = {
  q21:{n:"Kvíz 2.1", q:"Která látka se běžně používá jako primární standard ke standardizaci roztoků silných kyselin (např. HCl)?",
    o:["NaOH","Na₂CO₃","NaCl","KHP (hydrogenftalan draselný)"], c:1,
    e:"Bezvodý uhličitan sodný je stálá, čistá zásaditá látka, která splňuje požadavky na primární standard v acidimetrii. KHP je primární standard pro alkalimetrii (standardizaci zásad)."},
  q22:{n:"Kvíz 2.2", q:"Proč je nutné chránit odměrné roztoky NaOH před vzdušným CO₂?",
    o:["CO₂ rozkládá NaOH na Na a O₂.","CO₂ snižuje pH roztoku, a tím účinnost NaOH.","NaOH reaguje s CO₂ na Na₂CO₃, což mění koncentraci OH⁻ a může rušit titrace slabých kyselin.","CO₂ způsobí zákal, který ztěžuje odečet objemu."], c:2,
    e:"Reakcí 2NaOH + CO₂ → Na₂CO₃ + H₂O klesá koncentrace silné zásady OH⁻ a vzniká uhličitan, slabší zásada. Klesá tím titrační kapacita roztoku a při titraci slabých kyselin může uhličitan také reagovat a způsobit chybu."},
  q31:{n:"Kvíz 3.1", q:"Co je základem funkce acidobazického indikátoru?",
    o:["Změna rozpustnosti při určitém pH.","Je to slabá kyselina nebo zásada, jejíž protonizovaná a deprotonizovaná forma mají různé barvy.","Reaguje s vodou na barevný produkt.","Mění barvu podle teploty roztoku."], c:1,
    e:"Indikátor existuje v rovnováze mezi kyselou (HIn) a zásaditou (In⁻) formou. Formy mají různou strukturu a pohlcují světlo jiných vlnových délek, proto mají různé barvy. Poměr forem, a tedy barva, závisí na pH."},
  q32:{n:"Kvíz 3.2", q:"Který indikátor je nejvhodnější pro titraci slabé kyseliny (např. CH₃COOH) silnou zásadou (např. NaOH)?",
    o:["Methyloranž (pH 3,1–4,4)","Bromthymolová modř (pH 6,0–7,6)","Fenolftalein (pH 8,2–10,0)","Univerzální indikátorový papírek"], c:2,
    e:"V bodě ekvivalence vzniká sůl slabé kyseliny (CH₃COONa), která hydrolyzuje zásaditě, pH je tedy > 7. Fenolftalein má funkční oblast 8,2–10,0 v zásadité oblasti, která dobře pokrývá skok pH této titrace."},
  q41:{n:"Kvíz 4.1", q:"Jaké pH bude mít roztok v bodě ekvivalence při titraci kyseliny octové (CH₃COOH) hydroxidem sodným?",
    o:["pH &lt; 7","pH = 7","pH &gt; 7","Nelze určit bez znalosti koncentrací."], c:2,
    e:"V bodě ekvivalence vzniká octan sodný. Octanový anion je konjugovaná zásada slabé kyseliny a hydrolyzuje: CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻. Vznikají ionty OH⁻, roztok je zásaditý, pH > 7."},
  q42:{n:"Kvíz 4.2", q:"Pro který typ titrace je nejtěžší najít vhodný vizuální indikátor?",
    o:["Silná kyselina / silná zásada","Slabá kyselina / silná zásada","Silná kyselina / slabá zásada","Slabá kyselina / slabá zásada"], c:3,
    e:"Při titraci slabé kyseliny slabou zásadou je skok pH kolem bodu ekvivalence velmi malý a pozvolný. Žádný běžný indikátor nemá tak úzký přechod, aby dal ostrou a přesnou indikaci."}
};
function addGraphQs(){
  QS.g1={n:"Graf 1", q:graph({o:{t:"sasb",Va:25,ca:0.1,ct:0.1}, be:"dot", marks:[{V:2,lab:"A"},{V:46,lab:"C"}], h:260})+"Jakému typu titrace nejlépe odpovídá průběh křivky?",
    o:["Silná kyselina titrovaná silnou zásadou","Slabá kyselina titrovaná silnou zásadou","Silná kyselina titrovaná slabou zásadou","Slabá kyselina titrovaná slabou zásadou"], c:0,
    e:"Křivka začíná při nízkém pH (silná kyselina), má velmi prudký skok pH, bod ekvivalence leží přesně při pH 7 a končí při vysokém pH (nadbytek silné zásady). To je typické pro titraci silné kyseliny silnou zásadou. V bodě C už převládá nadbytek přidané silné zásady."};
  QS.g2={n:"Graf 2", q:graph({o:{t:"wasb",Va:25,ca:0.1,ct:0.1}, be:"dot", marks:[{V:12.5,lab:"P"}], h:260})+"Bod P leží přesně v polovině spotřeby do bodu ekvivalence. Jaké je přibližně pKₐ titrované kyseliny?",
    o:["pKₐ ≈ 3","pKₐ ≈ 4,8","pKₐ = 7","pKₐ ≈ 9"], c:1,
    e:"V polovině cesty k bodu ekvivalence je [HA] = [A⁻], a proto pH = pKₐ. Bod P leží při pH asi 4,8 (kyselina octová má pKₐ 4,76). Bod ekvivalence je v zásadité oblasti (pH > 7), jde tedy o slabou kyselinu titrovanou silnou zásadou a hodí se fenolftalein."};
  QS.g3={n:"Graf 3", q:graph({o:{t:"sawb",Va:25,ca:0.11,ct:0.1}, be:"dot", h:260})+"O jakou titraci jde a který indikátor se hodí?",
    o:["Slabá kyselina + silná zásada, fenolftalein","Silná kyselina + slabá zásada, methyloranž","Silná kyselina + silná zásada, bromthymolová modř","Slabá kyselina + slabá zásada, žádný vizuální indikátor"], c:1,
    e:"Křivka začíná při vysokém pH (titruje se zásada), ale ne extrémně vysokém, takže jde o slabou zásadu. Před bodem ekvivalence je pufrační oblast a bod ekvivalence leží jasně v kyselé oblasti (pH < 7). To je slabá zásada titrovaná silnou kyselinou, vhodná je methyloranž."};
  QS.g4={n:"Graf 3", q:graph({o:{t:"sawb",Va:25,ca:0.11,ct:0.1}, be:"dot", h:260})+"Jaký je přibližný objem titrantu spotřebovaný do bodu ekvivalence?",
    o:["asi 13,75 ml","asi 27,5 ml","asi 40 ml","Z grafu to nelze určit."], c:1,
    e:"Bod ekvivalence je místo nejprudší změny pH (červená tečka). Na ose objemu mu odpovídá asi 27,5 ml. Polovina tohoto objemu (13,75 ml) je bod, kde pH = pKₐ(NH₄⁺)."};
}
function renderQ(box){
  var d=QS[box.dataset.q];
  box.innerHTML='<div class="jd-qh"><span class="tag">'+d.n+'</span><span>'+d.q+'</span></div>'+
    '<div class="jd-os">'+d.o.map(function(o,i){ return '<button type="button" class="jd-o" data-i="'+i+'" aria-pressed="false">'+String.fromCharCode(65+i)+') '+o+'</button>'; }).join("")+'</div>'+
    '<div class="jd-qf"><button type="button" class="btn btn-primary btn-sm" data-v disabled>Ověřit odpověď</button></div>'+
    '<div class="jd-qa" aria-live="polite"></div>';
  var pick=null, os=$$(".jd-o",box), vb=$("[data-v]",box);
  os.forEach(function(b){ b.addEventListener("click",function(){
    if(box.classList.contains("done")) return;
    pick=+b.dataset.i; os.forEach(function(x){ x.setAttribute("aria-pressed", x===b?"true":"false"); }); vb.disabled=false;
  }); });
  vb.addEventListener("click",function(){
    if(pick===null) return;
    box.classList.add("done"); vb.disabled=true;
    os[d.c].classList.add("ok"); if(pick!==d.c) os[pick].classList.add("bad");
    $(".jd-qa",box).innerHTML='<b class="v" style="color:var('+(pick===d.c?"--ok":"--bad")+')">'+(pick===d.c?"✓ Správně":"✕ Špatně")+' — správná odpověď: '+String.fromCharCode(65+d.c)+')</b><b>Zdůvodnění:</b> '+d.e+
      ' <button type="button" class="btn btn-sm" data-again style="margin-left:.4rem">Zkusit znovu</button>';
    $("[data-again]",box).addEventListener("click",function(){ box.classList.remove("done"); renderQ(box); });
  });
}
function initQs(){ addGraphQs(); $$(".jd-q").forEach(renderQ); }

/* ============================================================
   A13 · ZKUSTE SAMI — kalkulačka (koncentrace HCl)
   ============================================================ */
function initCalc(){
  $("#cGo").addEventListener("click",function(){
    var VB=num($("#cVB").value), cB=num($("#cCB").value), VA=num($("#cVA").value), out=$("#cOut");
    if(VB===null||cB===null||VA===null||!VA){ out.innerHTML="Doplňte všechny tři hodnoty."; return; }
    var c=cB*VB/VA;
    out.innerHTML="Výsledek: <b>"+fx(c,4)+" mol/l</b>"+
      '<span style="display:block;font-weight:400;color:var(--ink-2);margin-top:.3rem">c(HCl) = c(NaOH) · V(NaOH) / V(HCl) = '+fx(cB,4)+" · "+fx(VB,2)+" / "+fx(VA,2)+"</span>";
  });
}

/* ============================================================
   A14 · TŘÍDIČKA CHYB (vyšší / nižší / beze změny)
   ============================================================ */
var ERRS = [
  {t:"Starý roztok NaOH", d:"Roztok NaOH stál otevřený a pohltil CO₂. Počítáte s koncentrací z poslední standardizace.", r:1,
   w:"Skutečná koncentrace OH⁻ je nižší, než počítáte. Na stejné množství kyseliny spotřebujete víc titrantu a výsledek vyjde falešně vyšší."},
  {t:"Byreta nevypláchnutá titrantem", d:"Po umytí zůstala v byretě destilovaná voda, titrant se jí naředil.", r:1,
   w:"Zředěný titrant se spotřebuje ve větším objemu. Vy ale počítáte s původní koncentrací, a proto vyjde kyseliny víc."},
  {t:"Bublina ve špičce byrety", d:"Ve špičce byla vzduchová bublina, která během titrace vyjela ven.", r:1,
   w:"Odečtený objem zahrnuje i objem bubliny, který do baňky vůbec nepřitekl. Spotřeba vypadá větší a výsledek je vyšší."},
  {t:"Voda navíc v titrační baňce", d:"Ke vzorku jste přilili o 30 ml destilované vody víc, než bylo v návodu.", r:0,
   w:"Voda nemění látkové množství analytu, jen objem. Spotřeba titrantu je stejná a výsledek se nezmění."},
  {t:"Konec titrace příliš brzy", d:"Titraci jste ukončili, jakmile se barva objevila v místě dopadu kapky, i když po zamíchání zase zmizela.", r:-1,
   w:"To ještě nebyl bod ekvivalence, jen místní změna. Barva má vydržet aspoň 30 s. Spotřeba je menší a výsledek nižší."},
  {t:"Methyloranž místo fenolftaleinu", d:"Kyselinu octovou jste titrovali hydroxidem na methyloranž.", r:-1,
   w:"Methyloranž změní barvu kolem pH 3,1–4,4, dávno před bodem ekvivalence (pH > 7). Spotřeba je menší a kyseliny vyjde méně."}
];
var errAns = {};
function drawErrs(){
  var LAB={"1":"vyšší ↑","-1":"nižší ↓","0":"beze změny ="};
  $("#errBox").innerHTML=ERRS.map(function(e,i){
    var a=errAns[i], done=a!==undefined, right=done && a===e.r;
    return '<div class="jd-err'+(done?" done "+(right?"right":"wrong"):"")+'">'+
      '<h4>'+e.t+'</h4><p>'+e.d+'</p>'+
      '<div class="jd-btns">'+[1,-1,0].map(function(v){
        return '<button class="btn btn-sm'+(done&&a===v?" btn-primary":"")+'" type="button" data-e="'+i+'" data-r="'+v+'"'+(done?" disabled":"")+'>'+LAB[v]+'</button>';
      }).join("")+'</div>'+
      '<div class="jd-why"><p><b style="color:var('+(right?"--ok":"--bad")+')">'+(right?"✓ Správně":"✕ Ne")+' — výsledek bude '+LAB[e.r]+'.</b></p><p style="margin-top:.35rem">'+e.w+'</p></div>'+
    '</div>';
  }).join("");
  var n=Object.keys(errAns).length, ok=Object.keys(errAns).filter(function(k){ return errAns[k]===ERRS[k].r; }).length, sc=$("#errScore");
  if(n===0) msg(sc,"","U každé situace rozhodněte, jak se změní vypočtený obsah kyseliny.");
  else if(n<ERRS.length) msg(sc,"","Zatím "+ok+" z "+n+" správně. Zbývá "+(ERRS.length-n)+".");
  else msg(sc,ok===ERRS.length?"ok":"warn","Hotovo: <b>"+ok+" z "+ERRS.length+"</b> správně. "+(ok===ERRS.length?"Výborně.":"Projděte si vysvětlení u červeně orámovaných karet.")+' <button class="btn btn-sm" type="button" data-err-again style="margin-left:.4rem">Znovu</button>');
  var ag=$("[data-err-again]"); if(ag) ag.addEventListener("click",function(){ errAns={}; drawErrs(); });
}
function initErrs(){
  $("#errBox").addEventListener("click",function(e){
    var b=e.target.closest ? e.target.closest("button[data-e]") : null;
    if(!b || b.disabled) return;
    errAns[+b.dataset.e]=+b.dataset.r; drawErrs();
  });
  drawErrs();
}

/* ============================================================
   VYSVĚTLIVKY — při zobrazení nesmí přesáhnout okno
   ============================================================ */
function initTips(){
  function fit(t){
    var tt=t.querySelector(".jd-tt"); if(!tt) return;
    tt.style.left="0"; tt.style.right="auto";
    var r=tt.getBoundingClientRect(), W=document.documentElement.clientWidth;
    if(r.right>W-8) tt.style.left=Math.round(W-8-r.right)+"px";
    r=tt.getBoundingClientRect(); if(r.left<8) tt.style.left=(parseFloat(tt.style.left)||0)+Math.round(8-r.left)+"px";
  }
  $$(".jd-tip").forEach(function(t){
    t.addEventListener("mouseenter",function(){ fit(t); });
    t.addEventListener("focus",function(){ fit(t); });
  });
}
