/* ============================================================
   J20 · BARVA V BAŇCE (malé ikony v klíčových rámečcích)
   ============================================================ */
var FLC = {clear:"rgba(214,232,242,.55)", brown:"rgba(128,62,14,.95)", yellow:"rgba(232,196,70,.9)",
           pale:"rgba(246,232,160,.85)", blue:"rgba(26,40,130,.95)"};
function paintFlasks(){
  $$(".jd-flask").forEach(function(el){
    var c=FLC[el.dataset.c]||FLC.clear;
    el.innerHTML='<svg viewBox="0 0 40 48" aria-hidden="true">'+
      '<path d="M8.5 33 L4 44 Q4 46 6 46 L34 46 Q36 46 36 44 L31.5 33 Z" style="fill:'+c+'"/>'+
      '<path d="M16 3 L16 18 L4 44 Q4 46 6 46 L34 46 Q36 46 36 44 L24 18 L24 3" style="fill:none;stroke:var(--ink-2);stroke-width:2;stroke-linejoin:round"/>'+
      '<path d="M13.5 3 L26.5 3" style="stroke:var(--ink-2);stroke-width:2;stroke-linecap:round"/></svg>';
  });
}

/* ============================================================
   J21 · DOPLŇOVAČKY
   ============================================================ */
function normAns(s){ return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[\s₂₃]/g,function(c){ return c==="₂"?"2":(c==="₃"?"3":""); }); }
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
   J22 · KVÍZY PŘÍMO V TEXTU (jedna otázka hned po výkladu)
   ============================================================ */
var QS = {
  q11:{n:"Kvíz 1.1", q:"Na jakém typu chemické reakce je jodometrie založena?",
    o:["Acidobazické","Srážecí","Komplexotvorné","Redoxní"], c:3,
    e:"Jodometrie využívá přeměnu mezi I₂ a I⁻, která je spojená se změnou oxidačních čísel. Jde tedy o redoxní reakci."},
  q12:{n:"Kvíz 1.2", q:"Která forma jodu působí v základním redoxním páru jako <b>redukovadlo</b>?",
    o:["I₂","I⁻","I₃⁻","IO₃⁻"], c:1,
    e:"Jodidový ion I⁻ má nižší oxidační číslo (−1) a může odevzdávat elektrony (oxidovat se na I₂), proto je redukovadlem."},
  q21:{n:"Kvíz 2.1", q:"Jaký odměrný roztok se používá při přímé jodometrii?",
    o:["Roztok KI","Roztok Na₂S₂O₃","Roztok I₂ (v KI)","Roztok škrobu"], c:2,
    e:"Přímá jodometrie používá jod jako titrant ke stanovení redukovadel."},
  q22:{n:"Kvíz 2.2", q:"Jaké pH je obvykle optimální pro přímou jodometrii?",
    o:["Silně kyselé (pH &lt; 2)","Mírně kyselé (pH 4–6)","Neutrální až slabě zásadité (pH 7–9)","Silně zásadité (pH &gt; 10)"], c:2,
    e:"V tomto rozmezí je reakce jodu s mnoha redukovadly kvantitativní a zároveň se omezí vedlejší reakce: oxidace I⁻ kyslíkem v kyselém prostředí a disproporcionace I₂ v zásaditém."},
  q31:{n:"Kvíz 3.1", q:"Jakou funkci má nadbytek KI v prvním kroku nepřímé jodometrie?",
    o:["Působí jako katalyzátor.","Dodává I⁻ pro reakci s analytem a rozpouští vzniklý I₂.","Upravuje pH roztoku.","Slouží jako indikátor."], c:1,
    e:"KI dodává jodidové ionty, které analyt oxiduje na I₂. Nadbytek KI zajistí kvantitativní průběh reakce a pomáhá rozpustit vzniklý, málo rozpustný I₂ jako I₃⁻."},
  q32:{n:"Kvíz 3.2", q:"Proč se škrob při nepřímé jodometrii přidává až ke konci titrace?",
    o:["Aby nereagoval s Na₂S₂O₃.","Protože se v kyselém prostředí rozkládá.","Aby při vysoké koncentraci I₂ nevznikl příliš stabilní komplex.","Protože reaguje jen s I⁻, ne s I₂."], c:2,
    e:"Kdyby se škrob přidal na začátku, kdy je koncentrace I₂ vysoká, vznikl by velmi pevný komplex. Jod v něm vázaný by reagoval s Na₂S₂O₃ pomaleji a přechod v bodě ekvivalence by byl neostrý."},
  q41:{n:"Kvíz 4.1", q:"Která chyba vede při nepřímé jodometrii k falešně <b>vyššímu</b> výsledku?",
    o:["Těkavost I₂","Oxidace I⁻ vzdušným kyslíkem","Neúplná reakce analytu s KI","Adsorpce I₂ na sraženině"], c:1,
    e:"Oxidací I⁻ vzdušným kyslíkem vzniká jod navíc, který nepochází z analytu, ale spotřebuje titrant. Spotřeba je vyšší a výsledek falešně vyšší. Ostatní tři chyby jod ztrácejí, a proto výsledek snižují."},
  q42:{n:"Kvíz 4.2", q:"Přídavek KSCN ke konci titrace při stanovení Cu²⁺ pomáhá omezit chybu způsobenou:",
    o:["oxidací I⁻ vzduchem","těkavostí I₂","adsorpcí I₂ na sraženině CuI","nečistotami IO₃⁻ v KI"], c:2,
    e:"KSCN reaguje s CuI za vzniku méně rozpustného CuSCN, který jod tolik neadsorbuje. Předtím adsorbovaný jod se uvolní do roztoku a dá se správně ztitrovat."}
};
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
function initQs(){ $$(".jd-q").forEach(renderQ); }

/* ============================================================
   J23 · ZKUSTE SAMI — kalkulačka (koncentrace thiosíranu)
   ============================================================ */
function initCalc(){
  $("#cGo").addEventListener("click",function(){
    var VI=num($("#cVI").value), cI=num($("#cCI").value), VT=num($("#cVT").value);
    var rs=String($("#cR").value).trim(), r=/^\s*(\d+)\s*\/\s*(\d+)\s*$/.test(rs) ? (function(m){ return +m[1]/+m[2]; })(rs.match(/(\d+)\s*\/\s*(\d+)/)) : num(rs);
    var out=$("#cOut");
    if(VI===null||cI===null||VT===null||!VT){ out.innerHTML="Doplňte objemy a koncentraci."; return; }
    if(r===null||!r){ out.innerHTML="Doplňte poměr n(I₂) / n(S₂O₃²⁻) — vyčtěte ho z rovnice."; return; }
    var c=cI*VI/r/VT;
    out.innerHTML="Výsledek: <b>"+fx(c,4)+" mol/l</b>"+
      '<span style="display:block;font-weight:400;color:var(--ink-2);margin-top:.3rem">c(Na₂S₂O₃) = c(I₂)·V(I₂) / [poměr · V(Na₂S₂O₃)] = '+fx(cI,4)+" · "+fx(VI,2)+" / ("+fx(r,2)+" · "+fx(VT,2)+")</span>"+
      (Math.abs(r-0.5)>1e-6?'<span style="display:block;color:var(--bad);margin-top:.3rem">Pozor na poměr: z rovnice 2S₂O₃²⁻ + I₂ plyne n(I₂) / n(S₂O₃²⁻) = 1/2 = 0,5.</span>':'');
  });
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
