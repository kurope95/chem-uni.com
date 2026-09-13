# -*- coding: utf-8 -*-
"""spolu_js2.py — obrazovky trenažéru: pět fází, diagnostika, vzorové řešení, pokrok."""

UI = r"""
/* ============================================================ stav */
var TASK=null, S=null, UNDO=[], TOOLS=null;
var PH=[{id:"given",lbl:"Zadání"},{id:"find",lbl:"Hledáme"},{id:"fml",lbl:"Vztahy"},
        {id:"der",lbl:"Odvození"},{id:"ans",lbl:"Dosazení a odpověď"}];
var COACH=[
 "<b>Fáze 1 — Zadání.</b> Přečtěte si úlohu a vypište z ní veličiny. U každé klepnete na symbol, "+
 "opíšete číslo a vyberete jednotku, <b>ve které se bude počítat</b>. Právě tady se dělá převod: "+
 "250 cm³ zapíšete buď jako 250 cm³, nebo jako 0,250 dm³ — obojí je totéž. V nabídce jsou "+
 "schválně i veličiny, které v zadání nejsou.",
 "<b>Fáze 2 — Hledáme.</b> Označte veličinu, na kterou se úloha ptá, a jednotku, ve které "+
 "chcete odpovědět. Tímhle symbolem začne odvození.",
 "<b>Fáze 3 — Vztahy.</b> Z police vyberte vzorce, které budete potřebovat. Jsou tam i takové, "+
 "které vypadají věrohodně, ale platí pro něco jiného. Aplikace vám teď neřekne, jestli jste "+
 "vybral dobře — to poznáte až na konci.",
 "<b>Fáze 4 — Odvození.</b> Začnete vztahem, který má vlevo hledanou veličinu. Pak klepnete "+
 "na veličinu ve výrazu, kterou chcete nahradit, a potom na kartu vztahu. Aplikace dosadí "+
 "za vás. Žádnou algebru nepíšete a <b>žádná čísla se tu neobjeví</b>. Hotovo je, když ve výrazu "+
 "zůstanou jen veličiny ze zadání a konstanty.",
 "<b>Fáze 5 — Dosazení a odpověď.</b> Čísla se doplní sama z fáze 1. Vy sestavíte jednotku "+
 "výsledku z dlaždic, spočítáte hodnotu na kalkulačce a zapíšete ji. Teprve po odevzdání "+
 "se dozvíte, jak jste dopadl."
];

function snap(){ try{UNDO.push(JSON.stringify(S));}catch(e){} if(UNDO.length>80) UNDO.shift(); }
function note(t){ S.note=t; paintNote(); }
function paintNote(){
  var el=$("#note");
  if(!el) return;
  el.innerHTML=S.note?('<span class="mn-i" aria-hidden="true">i</span><span>'+S.note+"</span>"):"";
  el.style.display=S.note?"":"none";
}
function secs(){ return Math.max(1,Math.round((Date.now()-S.t0)/1000)); }
function fmtSecs(s){ var m=Math.floor(s/60); return m?(m+" min "+(s%60)+" s"):(s+" s"); }

/* ============================================================ start úlohy */
function startTask(id,coach){
  TASK=null;
  for(var i=0;i<TASKS.length;i++) if(TASKS[i].id===id) TASK=TASKS[i];
  if(!TASK) return;
  S={phase:1,max:1,given:[],find:{k:"",unit:""},picked:[],start:null,expr:null,
     hist:[],sel:null,ansVal:"",un:[],ud:[],uzone:"n",hints:0,hintLvl:0,
     t0:Date.now(),done:false,verdict:null,note:"",coach:!!coach,mark:null,diag:null};
  UNDO=[];
  $("#pick").style.display="none";
  $("#train").classList.add("on");
  $("#modelBox").innerHTML=""; $("#modelBox").style.display="none";
  render();
  window.scrollTo(0,0);
}
function backToPick(){
  $("#train").classList.remove("on");
  $("#pick").style.display="";
  renderPick();
  window.scrollTo(0,0);
}
function gotoPhase(p){
  if(p<1||p>5) return;
  snap(); S.phase=p; S.max=Math.max(S.max,p); S.sel=null; S.note=""; S.hintLvl=0;
  render();
  var row=$("#row-"+PH[p-1].id);
  if(row){ var y=row.getBoundingClientRect().top+window.pageYOffset-140;
           window.scrollTo({top:Math.max(0,y),behavior:"smooth"}); }
}

/* ============================================================ hodnoty studenta */
function rowCanon(g){
  if(!g.k) return null;
  var v=parseVal(g.val);
  if(v===null) return null;
  var info=symInfo(g.k);
  if(!info) return null;
  return conv(v,g.unit,info.canon);
}
function studentVals(){
  var v={};
  S.given.forEach(function(g){
    var x=rowCanon(g);
    if(x!==null&&isFinite(x)) v[g.k]=x;
  });
  return v;
}
function knownKeys(){
  var ks=[];
  S.given.forEach(function(g){ if(g.k&&ks.indexOf(g.k)<0) ks.push(g.k); });
  return ks;
}
function exprDone(){
  if(!S.expr) return false;
  var kn=knownKeys(), ss=symsIn(S.expr);
  for(var i=0;i<ss.length;i++) if(kn.indexOf(ss[i])<0) return false;
  return true;
}
function ansUnit(){
  var n=S.un.length?S.un.join("*"):"one";
  return n+(S.ud.length?"/"+S.ud.join("*"):"");
}
function findInfo(){ return symInfo(S.find.k)||symInfo(TASK.find.sk); }

/* ============================================================ list */
function render(){
  renderBar();
  var idx=0;
  TASKS.forEach(function(t,i){ if(t.id===TASK.id) idx=i+1; });
  var h='<div class="cs-head"><span class="cs-id">Úloha '+(idx<10?"0":"")+idx+"</span>"+
    '<span class="cs-topic">'+esc(TASK.title)+"</span>"+
    '<span class="cs-kind">'+["","Základ","Střední","Přijímačky"][TASK.level]+" · "+
    esc(TASK.topic)+"</span></div>";
  h+='<div class="cs-task">'+TASK.task+"</div>";
  h+=blk("given","Zadání",bodyGiven());
  h+=blk("find","Hledáme",bodyFind(),"find");
  h+=blk("fml","Vztahy",bodyFml());
  h+=blk("der","Odvození",bodyDer());
  h+=blk("subst","Dosazení",bodySubst());
  h+=blk("ans","Odpověď",bodyAns(),"res");
  $("#sheet").innerHTML=h;
  var host=$("#row-"+PH[S.phase-1].id);
  if(host&&!S.done) host.insertAdjacentHTML("afterend",tools());
  bindSheet();
  paintNote();
  renderVerdict();
}
function blk(id,lab,body,extra){
  var act=(!S.done&&PH[S.phase-1].id===id)?" act":"";
  var mk=(S.mark&&S.mark.row===id)?" bad":"";
  return '<section class="cs-block'+(extra?" "+extra:"")+act+mk+'" id="row-'+id+
    '"><h3 class="cs-lbl">'+lab+'</h3><div class="cs-rows">'+body+"</div></section>";
}
function ph(i){ return PH[i-1]; }

/* ---------------- řádek: zadané veličiny ---------------- */
function bodyGiven(){
  if(!S.given.length) return '<p class="cs-hint">Zatím jste nevypsal žádnou veličinu.</p>';
  return S.given.map(function(g,i){
    var info=symInfo(g.k)||{disp:"?",units:["one"],name:""};
    var mk=(S.mark&&S.mark.row==="given"&&S.mark.idx===i)?" bad":"";
    var ro=S.done?" disabled":"";
    return '<div class="cs-row'+mk+'"><span class="cs-sym math">'+info.disp+"</span>"+
      '<span class="cs-val inputs">'+
      '<input type="text" class="gval" inputmode="decimal" data-i="'+i+'" value="'+
        esc(g.val)+'" placeholder="číslo" aria-label="Hodnota: '+esc(info.name)+'"'+ro+">"+
      '<select class="gunit" data-i="'+i+'" aria-label="Jednotka"'+ro+">"+
        info.units.map(function(u){
          return '<option value="'+u+'"'+(u===g.unit?" selected":"")+">"+
            (unitLabel(u)||"bez jednotky")+"</option>";
        }).join("")+"</select>"+
      (S.done?"":'<button type="button" class="grm" data-rm="'+i+
        '" aria-label="Odebrat řádek">✕</button>')+
      '</span><span class="cs-note">'+esc(info.name)+"</span></div>";
  }).join("");
}
/* ---------------- řádek: hledáme ---------------- */
function bodyFind(){
  if(!S.find.k) return '<p class="cs-hint">Zatím jste neoznačil hledanou veličinu.</p>';
  var info=symInfo(S.find.k);
  return '<div class="cs-row"><span class="cs-sym math">'+info.disp+"</span>"+
    '<span class="cs-val inputs"><span class="qmark">?</span>'+
    '<select class="gunit" id="findUnit" aria-label="Jednotka výsledku"'+
      (S.done?" disabled":"")+">"+
    info.units.map(function(u){
      return '<option value="'+u+'"'+(u===S.find.unit?" selected":"")+">"+
        (unitLabel(u)||"bez jednotky")+"</option>";
    }).join("")+'</select></span><span class="cs-note">'+esc(info.name)+"</span></div>";
}
/* ---------------- řádek: vztahy ---------------- */
function cardById(id){
  for(var i=0;i<TASK.cards.length;i++) if(TASK.cards[i].id===id) return TASK.cards[i];
  return null;
}
function cardHtml(c,cls,attr){
  return '<'+(attr?"button":"span")+' class="fcard '+(cls||"")+'"'+
    (attr?' type="button" '+attr:"")+'>'+
    '<span class="math">'+rnd(c.lhs,0,{})+'<span class="op">=</span>'+rnd(c.rhs,0,{})+"</span></"+
    (attr?"button":"span")+">";
}
function bodyFml(){
  if(!S.picked.length) return '<p class="cs-hint">Zatím jste nevybral žádný vztah.</p>';
  var mk=(S.mark&&S.mark.row==="fml")?S.mark.card:null;
  return '<div class="fpicked">'+S.picked.map(function(id){
    var c=cardById(id);
    return cardHtml(c,mk===id?"bad":"");
  }).join("")+"</div>";
}
/* ---------------- řádek: odvození ---------------- */
function bodyDer(){
  if(!S.expr) return '<p class="cs-hint">Odvození zatím nezačalo.</p>';
  var info=symInfo(S.find.k), out=[];
  var tap=(!S.done&&S.phase===4);
  for(var i=0;i<S.hist.length;i++){
    var st=S.hist[i], last=(i===S.hist.length-1);
    var o=last?{tap:tap,sel:S.sel}:{};
    var mk=(S.mark&&S.mark.row==="der"&&S.mark.idx===i)?" bad":"";
    out.push('<div class="dline'+mk+'"><div class="cs-line"><span class="math">'+
      (i===0?info.disp+'<span class="op">=</span>':'<span class="op">=</span>')+
      rnd(st.expr,0,o)+"</span></div>"+
      '<div class="cs-hint">'+esc(st.note)+"</div></div>");
  }
  return out.join("");
}
/* ---------------- řádek: dosazení ---------------- */
function bodySubst(){
  if(!S.expr||S.max<5) return '<p class="cs-hint">Nejdřív dokončete odvození.</p>';
  var num={}, prevod=false;
  S.given.forEach(function(g){
    if(!g.k) return;
    var info=symInfo(g.k), cv=rowCanon(g), ul=unitLabel(info.canon);
    if(cv!==null&&unitText(g.unit)!==unitText(info.canon)) prevod=true;
    num[g.k]=(cv===null?'<span class="miss">?</span>':fmtNum(cv,6))+
      (ul?'<span class="su"> '+ul+"</span>":"");
  });
  var info2=symInfo(S.find.k);
  return '<div class="cs-line"><span class="math">'+info2.disp+'<span class="op">=</span>'+
    rnd(S.expr,0,{num:num,mark:(S.mark&&S.mark.row==="subst")?S.mark.sk:null})+
    "</span></div>"+
    '<div class="cs-hint">'+(prevod
      ? "Čísla jsou přepsaná do jednotek, které jste u veličin zvolil, a sjednocená tak, "+
        "aby vzorec seděl rozměrově. Takhle to spočítáte na kalkulačce přímo."
      : "Takhle to zadáte do kalkulačky.")+"</div>";
}
/* ---------------- řádek: odpověď ---------------- */
function bodyAns(){
  if(S.max<5) return '<p class="cs-hint">Odpověď zapíšete na konci.</p>';
  var info=symInfo(S.find.k);
  var mk=(S.mark&&S.mark.row==="ans")?" bad":"";
  return '<div class="cs-ans'+mk+'"><span class="math">'+info.disp+
    '<span class="op">=</span></span>'+
    '<input type="text" id="ansVal" class="aval" inputmode="decimal" value="'+esc(S.ansVal)+
    '" placeholder="číslo" aria-label="Číselná odpověď"'+(S.done?" disabled":"")+">"+
    '<span class="cs-hi">'+(unitLabel(ansUnit())||"bez jednotky")+"</span></div>";
}

/* ============================================================ horní lišta */
function renderBar(){
  $("#tTitle").innerHTML=esc(TASK.title);
  $("#tMeta").innerHTML='<span class="lv lv'+TASK.level+'">'+
    ["","Základ","Střední","Přijímačky"][TASK.level]+"</span><span>"+esc(TASK.topic)+"</span>"+
    (S.hints?'<span>nápovědy: '+S.hints+"</span>":"");
  $("#steps").innerHTML=PH.map(function(p,i){
    var n=i+1, cls=(n===S.phase?"on":(n<=S.max?"ok":""));
    return '<button type="button" class="stp '+cls+'" data-go="'+n+'"'+
      (n<=S.max&&!S.done?"":" disabled")+'><b>'+n+"</b><span>"+p.lbl+"</span></button>";
  }).join("");
}

/* ============================================================ nářadí */
function tools(){
  var h='<div class="toolbox" id="tools">';
  if(S.coach) h+='<div class="coach">'+COACH[S.phase-1]+"</div>";
  if(S.phase===1) h+=tGiven();
  else if(S.phase===2) h+=tFind();
  else if(S.phase===3) h+=tFml();
  else if(S.phase===4) h+=tDer();
  else h+=tAns();
  h+='<div class="mechnote" id="note" role="status"></div>';
  h+='<div class="tbfoot">';
  if(S.phase>1) h+='<button type="button" class="btn btn-sm" data-go="'+(S.phase-1)+
    '">← Předchozí fáze</button>';
  h+='<button type="button" class="btn btn-sm" id="undoBtn">Zpět o krok</button>';
  h+='<span class="sp"></span>';
  if(S.phase<5) h+='<button type="button" class="btn btn-primary btn-sm" id="nextBtn">'+
    "Pokračovat na „"+PH[S.phase].lbl+"“ →</button>";
  h+="</div></div>";
  return h;
}
function shelfSyms(){
  return '<div class="shelf">'+TASK.shelf.map(function(k){
    var info=symInfo(k);
    var on=(S.phase===1)?(S.given.some(function(g){return g.k===k;})):(S.find.k===k);
    return '<button type="button" class="chip'+(on?" on":"")+'" data-sym="'+esc(k)+'">'+
      '<span class="math">'+info.disp+'</span><span class="cn">'+esc(info.name)+"</span></button>";
  }).join("")+"</div>";
}
function tGiven(){
  return '<p class="tb-h">Vypište ze zadání veličiny, se kterými budete počítat.</p>'+
    shelfSyms()+
    '<p class="tb-n">Klepnutím přidáte řádek do výpočtového listu. Do něj opíšete hodnotu '+
    'a vyberete jednotku, <b>ve které se bude počítat</b> — tím provedete převod. '+
    'V nabídce jsou i veličiny, které v této úloze nepotřebujete.</p>';
}
function tFind(){
  return '<p class="tb-h">Označte veličinu, na kterou se úloha ptá.</p>'+shelfSyms()+
    '<p class="tb-n">Jednotku výsledku vyberete v listu u řádku „Hledáme“.</p>';
}
function tFml(){
  var mk=(S.mark&&S.mark.row==="fml")?S.mark.card:null;
  return '<p class="tb-h">Vyberte z police vztahy, které budete potřebovat.</p>'+
    '<div class="rack">'+TASK.cards.map(function(c){
      var on=S.picked.indexOf(c.id)>=0;
      return cardHtml(c,(on?"on":"")+(mk===c.id?" bad":""),'data-card="'+c.id+
        '" aria-pressed="'+(on?"true":"false")+'"');
    }).join("")+"</div>"+
    '<p class="tb-n">Vybrat můžete i víc vztahů, než nakonec použijete. Některé vzorce '+
    'na polici platí obecně, ale pro tuhle úlohu se nehodí — a některé neplatí vůbec. '+
    'Aplikace teď mlčí, hodnotí se až konečná odpověď.</p>';
}
function tDer(){
  var info=symInfo(S.find.k);
  if(!S.expr){
    var elig=S.picked.map(cardById).filter(function(c){return c.key===S.find.k;});
    if(!elig.length)
      return '<p class="tb-h">Odvození začíná vztahem, jehož levá strana je hledaná veličina '+
        '<span class="math">'+info.disp+'</span>.</p>'+
        '<p class="tb-n">Mezi vybranými vztahy takový není. Vraťte se o fázi zpět '+
        'a vyberte vztah, který má <span class="math">'+info.disp+'</span> vlevo.</p>';
    return '<p class="tb-h">Začněte vztahem, jehož levá strana je hledaná veličina.</p>'+
      '<div class="rack">'+elig.map(function(c){
        return cardHtml(c,"","data-start=\""+c.id+"\"");
      }).join("")+"</div>";
  }
  var h='<p class="tb-h">'+(S.sel
      ? 'Vybraná veličina: <span class="math selmark">'+symInfo(S.sel).disp+
        "</span> — teď klepněte na vztah, kterým ji chcete nahradit."
      : "Klepněte ve výrazu na veličinu, kterou chcete nahradit.")+"</p>";
  h+='<div class="rack">'+S.picked.map(function(id){
    var c=cardById(id);
    var can=(S.sel&&c.key===S.sel);
    return cardHtml(c,can?"can":"",'data-sub="'+c.id+'"');
  }).join("")+"</div>";
  h+='<p class="tb-h2">Úpravy výrazu</p><div class="simps">'+SIMPS.map(function(s){
    var can=!!s.fn(S.expr);
    return '<button type="button" class="btn btn-sm'+(can?" can":"")+'" data-simp="'+s.id+'">'+
      s.lbl+"</button>";
  }).join("")+"</div>";
  var kn=knownKeys(), left=symsIn(S.expr).filter(function(k){return kn.indexOf(k)<0;});
  h+='<p class="tb-n">'+(left.length
    ? "Ve výrazu jsou ještě veličiny, které nemáte v zadání: "+
      left.map(function(k){return '<span class="math">'+symInfo(k).disp+"</span>";}).join(", ")+
      ". Dokud tam jsou, nejde dosadit čísla."
    : "Ve výrazu jsou už jen veličiny ze zadání a konstanty. Můžete pokračovat na dosazení.")+
    "</p>";
  return h;
}
var TILES=["g","mg","kg","mol","mmol","dm3","cm3","m3","J","kJ","K","s","min",
           "V","A","C","Bq","GBq","pct","one"];
function tAns(){
  var chips=function(arr,z){
    return arr.length?arr.map(function(a,i){
      return '<button type="button" class="uch" data-del="'+z+":"+i+'">'+
        ATOMS[a].b+(ATOMS[a].e>1?supStr(ATOMS[a].e):"")+"</button>";
    }).join(""):'<span class="uempty">—</span>';
  };
  var h='<p class="tb-h">Sestavte jednotku výsledku a zapište číslo.</p>';
  h+='<div class="ucomp"><div class="uz'+(S.uzone==="n"?" on":"")+'" data-z="n" tabindex="0" '+
     'role="button" aria-pressed="'+(S.uzone==="n")+'"><span class="uzl">Čitatel</span>'+
     '<span class="uzc">'+chips(S.un,"n")+"</span></div>";
  h+='<div class="uz'+(S.uzone==="d"?" on":"")+'" data-z="d" tabindex="0" role="button" '+
     'aria-pressed="'+(S.uzone==="d")+'"><span class="uzl">Jmenovatel</span>'+
     '<span class="uzc">'+chips(S.ud,"d")+"</span></div></div>";
  h+='<div class="utiles">'+TILES.map(function(a){
    return '<button type="button" class="ut" data-tile="'+a+'">'+
      (a==="one"?"1":ATOMS[a].b+(ATOMS[a].e>1?supStr(ATOMS[a].e):""))+"</button>";
  }).join("")+"</div>";
  h+='<p class="tb-n">Klepněte na čitatele nebo jmenovatele a pak na dlaždici. Hotová jednotka: '+
     '<b class="math">'+(ansUnit()==="one"?"bez jednotky":unitText(ansUnit()))+"</b>. "+
     "Číslo zapište do listu k řádku „Odpověď“ — desetinnou čárkou, mocniny deseti třeba "+
     "jako <span class=\"mono\">1,77e-10</span>.</p>";
  h+='<div class="subrow"><button type="button" class="btn btn-primary" id="submitBtn">'+
     "Odevzdat odpověď</button></div>";
  return h;
}

/* ============================================================ obsluha */
function bindSheet(){
  $$("#sheet [data-go]").forEach(function(b){
    b.addEventListener("click",function(){ gotoPhase(+b.dataset.go); });
  });
  $$("#steps [data-go]").forEach(function(b){
    b.addEventListener("click",function(){ gotoPhase(+b.dataset.go); });
  });
  $$("#sheet .gval").forEach(function(inp){
    inp.addEventListener("input",function(){ S.given[+inp.dataset.i].val=inp.value; });
  });
  $$("#sheet .gunit").forEach(function(sel){
    if(sel.id==="findUnit") return;
    sel.addEventListener("change",function(){
      snap(); S.given[+sel.dataset.i].unit=sel.value;
    });
  });
  var fu=$("#findUnit");
  if(fu) fu.addEventListener("change",function(){
    snap(); S.find.unit=fu.value;
    S.un=parseUnit(fu.value).n.slice(); S.ud=parseUnit(fu.value).d.slice();
    render();
  });
  $$("#sheet [data-rm]").forEach(function(b){
    b.addEventListener("click",function(){ snap(); S.given.splice(+b.dataset.rm,1); render(); });
  });
  $$("#sheet [data-sym]").forEach(function(b){
    b.addEventListener("click",function(){ pickSym(b.dataset.sym); });
  });
  $$("#sheet [data-card]").forEach(function(b){
    b.addEventListener("click",function(){ toggleCard(b.dataset.card); });
  });
  $$("#sheet [data-start]").forEach(function(b){
    b.addEventListener("click",function(){ startDeriv(b.dataset.start); });
  });
  $$("#sheet .tok[data-sk]").forEach(function(b){
    b.addEventListener("click",function(){
      snap(); S.sel=(S.sel===b.dataset.sk)?null:b.dataset.sk; S.note=""; render();
    });
  });
  $$("#sheet [data-sub]").forEach(function(b){
    b.addEventListener("click",function(){ doSub(b.dataset.sub); });
  });
  $$("#sheet [data-simp]").forEach(function(b){
    b.addEventListener("click",function(){ doSimp(b.dataset.simp); });
  });
  $$("#sheet [data-z]").forEach(function(z){
    var act=function(){ S.uzone=z.dataset.z; render(); };
    z.addEventListener("click",act);
    z.addEventListener("keydown",function(e){
      if(e.key==="Enter"||e.key===" "){ e.preventDefault(); act(); }
    });
  });
  $$("#sheet [data-tile]").forEach(function(b){
    b.addEventListener("click",function(){
      snap();
      (S.uzone==="n"?S.un:S.ud).push(b.dataset.tile);
      render();
    });
  });
  $$("#sheet [data-del]").forEach(function(b){
    b.addEventListener("click",function(){
      snap();
      var p=b.dataset.del.split(":");
      (p[0]==="n"?S.un:S.ud).splice(+p[1],1);
      render();
    });
  });
  var av=$("#ansVal");
  if(av) av.addEventListener("input",function(){ S.ansVal=av.value; });
  var nb=$("#nextBtn");
  if(nb) nb.addEventListener("click",nextPhase);
  var ub=$("#undoBtn");
  if(ub) ub.addEventListener("click",function(){
    if(!UNDO.length){ note("Není co vracet, jste na začátku."); return; }
    S=JSON.parse(UNDO.pop()); render();
  });
  var sb=$("#submitBtn");
  if(sb) sb.addEventListener("click",submit);
}
function pickSym(k){
  snap();
  if(S.phase===1){
    var i=-1;
    S.given.forEach(function(g,j){ if(g.k===k) i=j; });
    if(i>=0){ S.given.splice(i,1); }
    else S.given.push({k:k,val:"",unit:symInfo(k).units[0]});
  } else {
    var info=symInfo(k);
    S.find={k:k,unit:info.units[0]};
    S.un=parseUnit(info.units[0]).n.slice();
    S.ud=parseUnit(info.units[0]).d.slice();
    if(S.expr&&S.hist.length&&cardById(S.hist[0].card).key!==k){
      S.expr=null; S.hist=[]; S.sel=null;
      note("Změnou hledané veličiny se odvození vynulovalo — začíná se vztahem, "+
           "který má vlevo právě ji.");
    }
  }
  render();
}
function toggleCard(id){
  snap();
  var i=S.picked.indexOf(id);
  if(i>=0){
    if(S.expr&&S.hist.some(function(h){return h.card===id;})){
      note("Tenhle vztah už je v odvození použitý. Nejdřív vraťte krok, ve kterém "+
           "jste ho dosadil.");
      UNDO.pop(); return;
    }
    S.picked.splice(i,1);
  } else S.picked.push(id);
  render();
}
function startDeriv(id){
  var c=cardById(id);
  snap();
  S.expr=clone(c.rhs);
  S.hist=[{expr:clone(c.rhs),card:id,note:"výchozí vztah "+plain(c)}];
  S.sel=null;
  render();
}
function plain(c){
  return c.src.replace(/_\{([^}]*)\}/g,"$1").replace(/_/g,"").replace(/\*/g,"·");
}
function doSub(id){
  var c=cardById(id);
  if(!S.sel){ note("Nejdřív klepněte ve výrazu na veličinu, kterou chcete nahradit."); return; }
  if(c.key!==S.sel){
    note("Vztah <b class=\"math\">"+plainHtml(c)+"</b> má vlevo <span class=\"math\">"+
      symInfo(c.key).disp+"</span>, ne <span class=\"math\">"+symInfo(S.sel).disp+
      "</span>. Dosadit ho lze jen za <span class=\"math\">"+symInfo(c.key).disp+"</span>.");
    return;
  }
  if(!hasSym(S.expr,S.sel)){
    note("Tahle veličina už ve výrazu není."); return;
  }
  if(hasSym(c.rhs,S.sel)){
    note("Pravá strana tohoto vztahu obsahuje zase <span class=\"math\">"+
      symInfo(S.sel).disp+"</span>. Dosazením byste se točil v kruhu.");
    return;
  }
  snap();
  S.expr=substitute(S.expr,S.sel,c.rhs);
  S.hist.push({expr:clone(S.expr),card:id,
               note:"za "+txtSym(S.sel)+" dosazeno "+plain(c)});
  S.sel=null; S.note="";
  render();
}
function plainHtml(c){ return rnd(c.lhs,0,{})+'<span class="op">=</span>'+rnd(c.rhs,0,{}); }
function txtSym(k){
  var d=symInfo(k).disp;
  return d.replace(/<[^>]+>/g,"");
}
function doSimp(id){
  var s=null;
  SIMPS.forEach(function(x){ if(x.id===id) s=x; });
  if(!S.expr){ note("Výraz zatím není."); return; }
  var r=s.fn(S.expr);
  if(!r){ note(s.no); return; }
  snap();
  S.expr=r;
  S.hist.push({expr:clone(r),card:null,note:s.lbl.toLowerCase()});
  S.sel=null; S.note="";
  render();
}
function nextPhase(){
  if(S.phase===1){
    var filled=S.given.filter(function(g){ return parseVal(g.val)!==null; });
    if(!filled.length){ note("Zapište aspoň jednu veličinu i s hodnotou."); return; }
    var bad=S.given.filter(function(g){ return g.val.trim()!==""&&parseVal(g.val)===null; });
    if(bad.length){ note("Některou hodnotu neumím přečíst. Číslo pište s desetinnou čárkou, "+
      "mocniny deseti jako <span class=\"mono\">1,77e-10</span>."); return; }
  }
  if(S.phase===2&&!S.find.k){ note("Označte hledanou veličinu."); return; }
  if(S.phase===3&&!S.picked.length){ note("Vyberte aspoň jeden vztah."); return; }
  if(S.phase===4){
    if(!S.expr){ note("Odvození ještě nezačalo."); return; }
    if(!exprDone()){
      var kn=knownKeys();
      var left=symsIn(S.expr).filter(function(k){return kn.indexOf(k)<0;});
      note("Ve výrazu zůstávají veličiny, které nemáte mezi zadanými: "+
        left.map(function(k){return txtSym(k);}).join(", ")+
        ". Za ně čísla dosadit nejde — nahraďte je dalším vztahem, nebo je doplňte "+
        "do zadaných veličin.");
      return;
    }
  }
  gotoPhase(S.phase+1);
}

/* ============================================================ nápověda */
function hint(){
  if(S.done) return;
  S.hintLvl=Math.min(3,S.hintLvl+1);
  S.hints++;
  var lvl=S.hintLvl, h="";
  if(lvl===1){
    h=TASK.hints[0]||"Projděte si zadání ještě jednou a hledejte, které veličiny v něm jsou.";
  } else if(lvl===2){
    h=hint2();
  } else {
    h=hint3();
  }
  note('<b>Nápověda '+lvl+"/3.</b> "+h);
  renderBar();
}
function refGiven(){ return TASK.given; }
function hint2(){
  var i;
  if(S.phase===1){
    var miss=refGiven().filter(function(g){
      return !S.given.some(function(x){return x.k===g.sk;});
    });
    return miss.length
      ? "Ze zadání ještě chybí "+miss.map(function(g){return txtSym(g.sk);}).join(", ")+"."
      : "Všechny potřebné veličiny už v listu máte. Zkontrolujte jednotky.";
  }
  if(S.phase===2) return "Úloha se ptá na veličinu "+txtSym(TASK.find.sk)+".";
  if(S.phase===3){
    var need=TASK.sets[0].filter(function(id){ return S.picked.indexOf(id)<0; });
    return need.length
      ? "Chybí vztah, který vyjádří "+txtSym(cardById(need[0]).key)+"."
      : "Potřebné vztahy už vybrané máte.";
  }
  if(S.phase===4){
    var nx=nextStep();
    if(!nx) return "Výraz je hotový, pokračujte na dosazení.";
    return "Teď je na řadě "+txtSym(nx.key)+" — nahraďte ji vztahem "+plain(cardById(nx.card))+".";
  }
  var u=unitLabel(TASK.find.unit);
  return u?("Jednotka výsledku je "+u+"."):
    "Výsledek je bezrozměrný — v dlaždicích použijte 1.";
}
function hint3(){
  var i;
  if(S.phase===1){
    for(i=0;i<TASK.given.length;i++){
      var g=TASK.given[i];
      var row=null;
      S.given.forEach(function(x){ if(x.k===g.sk) row=x; });
      if(!row){ snap(); S.given.push({k:g.sk,val:String(g.val).replace(".",","),unit:g.unit});
        render(); return "Doplnil jsem řádek "+txtSym(g.sk)+" = "+
          withU(fmtNum(g.val,6),g.unit)+"."; }
      if(rowCanon(row)===null||!closeTo(rowCanon(row),TASK.ref.vals[g.sk],2e-3)){
        snap(); row.val=String(g.val).replace(".",","); row.unit=g.unit; render();
        return "Opravil jsem řádek "+txtSym(g.sk)+" na "+
          withU(fmtNum(g.val,6),g.unit)+".";
      }
    }
    return "V zadaných veličinách už není co doplnit.";
  }
  if(S.phase===2){
    snap();
    S.find={k:TASK.find.sk,unit:TASK.find.unit};
    S.un=parseUnit(TASK.find.unit).n.slice(); S.ud=parseUnit(TASK.find.unit).d.slice();
    render();
    return "Nastavil jsem hledanou veličinu i jednotku.";
  }
  if(S.phase===3){
    var need=TASK.sets[0].filter(function(id){ return S.picked.indexOf(id)<0; });
    if(!need.length) return "Všechny potřebné vztahy už vybrané jsou.";
    snap(); S.picked.push(need[0]); render();
    return "Přidal jsem vztah "+plain(cardById(need[0]))+".";
  }
  if(S.phase===4){
    var nx=nextStep();
    if(!nx) return "Výraz je hotový.";
    if(!S.expr){ startDeriv(nx.card); return "Začal jsem vztahem "+plain(cardById(nx.card))+"."; }
    snap();
    var c=cardById(nx.card);
    if(S.picked.indexOf(c.id)<0) S.picked.push(c.id);
    S.expr=substitute(S.expr,nx.key,c.rhs);
    S.hist.push({expr:clone(S.expr),card:c.id,note:"za "+txtSym(nx.key)+" dosazeno "+plain(c)});
    S.sel=null; render();
    return "Dosadil jsem za "+txtSym(nx.key)+".";
  }
  snap();
  S.un=parseUnit(TASK.find.unit).n.slice(); S.ud=parseUnit(TASK.find.unit).d.slice();
  render();
  return "Sestavil jsem jednotku výsledku. Číslo si spočítejte sám.";
}
/* další krok podle vzorového řešení */
function nextStep(){
  var kn=knownKeys();
  if(!S.expr){
    for(var i=0;i<TASK.cards.length;i++)
      if(TASK.cards[i].ok&&TASK.cards[i].key===TASK.find.sk&&TASK.need.indexOf(TASK.cards[i].id)>=0)
        return {key:TASK.find.sk,card:TASK.cards[i].id};
    return null;
  }
  var left=symsIn(S.expr).filter(function(k){return kn.indexOf(k)<0;});
  for(var j=0;j<left.length;j++){
    for(var m=0;m<TASK.cards.length;m++){
      var c=TASK.cards[m];
      if(c.ok&&c.key===left[j]&&TASK.need.indexOf(c.id)>=0) return {key:left[j],card:c.id};
    }
  }
  return null;
}

/* ============================================================ odevzdání */
function submit(){
  var v=parseVal(S.ansVal);
  if(v===null){ note("Zapište číselnou odpověď do listu k řádku „Odpověď“."); return; }
  if(!S.un.length&&!S.ud.length){
    note("Sestavte ještě jednotku výsledku. Pokud je výsledek bezrozměrný, "+
         "použijte dlaždici <b>1</b>."); return; }
  var fi=findInfo(), au=ansUnit();
  var refCanon=TASK.ref.canon;
  var refU=unitInfo(TASK.find.unit), myU=unitInfo(au);
  var unitOK=sameDim(myU,refU);
  var typedCanon=unitOK?conv(v,au,fi.canon):null;
  var rel=Math.max(Math.abs(TASK.answer.tol/(TASK.answer.val||1)),0.004);
  var valOK=unitOK&&typedCanon!==null&&closeTo(typedCanon,refCanon,rel);
  S.done=true;
  S.secs=secs();
  S.verdict={ok:!!(valOK&&unitOK),unitOK:unitOK,valOK:valOK,typed:v,unit:au,
             sig:sigDigits(S.ansVal)};
  saveProgress(S.verdict.ok);
  render();
  var vb=$("#verdictBox");
  if(vb){ var y=vb.getBoundingClientRect().top+window.pageYOffset-120;
          window.scrollTo({top:Math.max(0,y),behavior:"smooth"}); }
}
function saveProgress(ok){
  var rec=store.get("done",{}), cur=rec[TASK.id]||{tries:0};
  cur.tries=(cur.tries||0)+1;
  if(ok){
    cur.ok=true;
    cur.hints=(cur.hints===undefined)?S.hints:Math.min(cur.hints,S.hints);
    cur.secs=(cur.secs===undefined)?S.secs:Math.min(cur.secs,S.secs);
  }
  rec[TASK.id]=cur;
  store.set("done",rec);
}
function renderVerdict(){
  var box=$("#verdictBox");
  if(!S.done){ box.innerHTML=""; box.style.display="none"; return; }
  box.style.display="";
  var v=S.verdict, fi=findInfo();
  var h='<div class="verdict '+(v.ok?"good":"bad")+'">';
  h+='<div class="vhead"><span class="vmark">'+(v.ok?"✓":"✕")+"</span><div>"+
     "<h2>"+(v.ok?"Správně":"Špatně")+"</h2><p>"+
     (v.ok?"Vaše odpověď sedí i po stránce jednotek.":
           "Odpověď neodpovídá tomu, co má vyjít. Kde přesně se to zlomilo, "+
           "vám aplikace ukáže — stačí říct.")+"</p></div></div>";
  h+='<div class="vstats"><span><b>'+fmtSecs(S.secs)+"</b>čas</span>"+
     "<span><b>"+S.hints+"</b>nápověd</span>"+
     "<span><b>"+withU(fmtNum(v.typed,6),v.unit)+
     "</b>vaše odpověď</span></div>";
  if(v.ok&&v.sig!==TASK.answer.sig)
    h+='<p class="vnote">Poznámka k zápisu: zadání vede na '+TASK.answer.sig+
       " platné číslice, vy jste zapsal "+v.sig+". Za chybu se to nepočítá, "+
       "ale u zkoušky se na počet platných číslic hledí.";
  h+='<div class="vacts">'+
     '<button type="button" class="btn" id="whyBtn">Kde jsem udělal chybu?</button>'+
     '<button type="button" class="btn" id="modelBtn">Ukázat správné řešení</button>'+
     '<button type="button" class="btn" id="retryBtn">Zkusit znovu</button>'+
     '<button type="button" class="btn" id="nextTaskBtn">Další úloha →</button>'+
     '<button type="button" class="btn" id="backBtn">Zpátky na výběr</button></div>';
  if(S.diag) h+='<div class="diag"><h3>'+S.diag.head+"</h3>"+S.diag.body+"</div>";
  if(v.ok) h+='<div class="outro">'+TASK.outro+"</div>";
  h+="</div>";
  box.innerHTML=h;
  $("#whyBtn").addEventListener("click",function(){ S.diag=diagnose(); render(); });
  $("#modelBtn").addEventListener("click",showModel);
  $("#retryBtn").addEventListener("click",function(){ startTask(TASK.id,S.coach); });
  $("#backBtn").addEventListener("click",backToPick);
  $("#nextTaskBtn").addEventListener("click",function(){
    var i=0;
    TASKS.forEach(function(t,j){ if(t.id===TASK.id) i=j; });
    startTask(TASKS[(i+1)%TASKS.length].id,false);
  });
}

/* ============================================================ diagnostika */
function evalRef(e){
  try{ var x=evalNode(e,TASK.ref.vals); return isFinite(x)?x:null; }catch(err){ return null; }
}
function exprIsRight(){
  if(!S.expr) return false;
  if(equivalent(S.expr,TASK.ref.expr)) return true;
  var x=evalRef(S.expr);
  return x!==null&&closeTo(x,TASK.ref.canon,1e-6);
}
function diagnose(){
  S.mark=null;
  var i,j,g,row,sv,fi=findInfo();
  /* --- 1. zadané hodnoty a převody --- */
  for(i=0;i<TASK.given.length;i++){
    g=TASK.given[i]; row=null;
    var idx=-1;
    S.given.forEach(function(x,jj){ if(x.k===g.sk){row=x;idx=jj;} });
    if(!row){
      S.mark={row:"given"};
      return D("Chybí údaj ze zadání",
        "Ve výpočtovém listu není veličina <b>"+txtSym(g.sk)+"</b>, kterou zadání uvádí ("+
        fmtNum(g.val,6)+" "+unitText(g.unit)+"). Bez ní se ke správnému výsledku dojít nedá.");
    }
    sv=rowCanon(row);
    if(sv===null){
      S.mark={row:"given",idx:idx};
      return D("Nečitelná hodnota",
        "Hodnotu u veličiny <b>"+txtSym(g.sk)+"</b> neumím přečíst jako číslo.");
    }
    if(!closeTo(sv,TASK.ref.vals[g.sk],3e-3)){
      S.mark={row:"given",idx:idx};
      return D("Chyba je hned v zadaných hodnotách",
        "U veličiny <b>"+txtSym(g.sk)+"</b> jste zapsal <b>"+esc(row.val)+" "+
        unitLabel(row.unit)+"</b>. To je po převodu <b>"+
        withU(fmtNum(sv,6),symInfo(g.sk).canon)+"</b>, ale ze zadání "+
        "vychází <b>"+withU(fmtNum(TASK.ref.vals[g.sk],6),symInfo(g.sk).canon)+
        "</b>. Zadání uvádí "+withU(fmtNum(g.val,6),g.unit)+
        ". Zkontrolujte převod jednotek — v tom je celá chyba, dál už bylo všechno jedno.");
    }
  }
  /* --- 2. a 3. vztahy a odvození --- */
  if(!exprIsRight()){
    var allowed=TASK.need.concat(TASK.optIds);
    var extra=S.picked.filter(function(id){
      return allowed.indexOf(id)<0&&usedInDeriv(id);
    });
    if(!extra.length) extra=S.picked.filter(function(id){ return allowed.indexOf(id)<0; });
    if(extra.length){
      var c=cardById(extra[0]);
      S.mark={row:"fml",card:c.id};
      return D("Chyba je ve výběru vztahu",
        "Vztah <span class=\"math\">"+plainHtml(c)+"</span> v řešení téhle úlohy nemá co "+
        "dělat. "+(c.why||"Pro tuhle úlohu neplatí.")+
        (usedInDeriv(c.id)?" Právě jím se odvození rozešlo se správným řešením.":""));
    }
    var missing=TASK.need.filter(function(id){ return S.picked.indexOf(id)<0; });
    if(missing.length&&!S.hist.length){
      var mc=cardById(missing[0]);
      S.mark={row:"fml"};
      return D("Chybí potřebný vztah",
        "V řešení chybí vztah, kterým se vyjádří <b>"+txtSym(mc.key)+
        "</b>. Bez něj se výraz nedá dotáhnout jen na zadané veličiny.");
    }
    for(i=0;i<S.hist.length;i++){
      var x=evalRef(S.hist[i].expr);
      if(x===null||!closeTo(x,TASK.ref.canon,1e-6)){
        S.mark={row:"der",idx:i};
        var cc=S.hist[i].card?cardById(S.hist[i].card):null;
        var lead=(i===0)
          ? "Rozešlo se to hned na začátku: výchozí vztah "+
            (cc?"<span class=\"math\">"+plainHtml(cc)+"</span>":"")+" nevede k výsledku."
          : "Do "+i+". kroku byl výraz v pořádku. Rozešel se se správným řešením až v kroku <b>"+
            (i+1)+" — "+esc(S.hist[i].note)+"</b>.";
        return D("Chyba je v odvození",
          lead+(cc&&cc.why?" "+cc.why:"")+
          " Ostatní kroky byly v pořádku, opravovat je nemusíte.");
      }
    }
    S.mark={row:"der"};
    return D("Chyba je v odvození",
      "Sestavený výraz nedává správný výsledek ani s referenčními hodnotami. "+
      "Porovnejte ho se vzorovým řešením.");
  }
  /* --- 4. jednotka --- */
  var refU=unitInfo(TASK.find.unit), myU=unitInfo(ansUnit());
  if(!sameDim(myU,refU)){
    S.mark={row:"ans"};
    return D("Chyba je v jednotce výsledku",
      "Sestavil jste jednotku <b>"+unitText(ansUnit())+"</b> s rozměrem <b>"+
      dimText(myU.d)+"</b>. Výsledek téhle úlohy má rozměr <b>"+dimText(refU.d)+
      "</b>, například "+unitText(TASK.find.unit)+
      ". Číslo přitom může být spočítané správně — chybná jednotka je vlastní druh chyby "+
      "a u zkoušky stojí bod.");
  }
  /* --- 5. číselná odpověď --- */
  var mine=null;
  try{ mine=evalNode(S.expr,studentVals()); }catch(e){ mine=null; }
  var shown=(mine===null)?null:conv(mine,findInfo().canon,ansUnit());
  if(shown!==null&&!closeTo(parseVal(S.ansVal),shown,0.004)){
    S.mark={row:"ans"};
    return D("Chyba je v aritmetice, ne v pochopení",
      "Váš výraz i zadané hodnoty jsou v pořádku. Kdybyste do svého výrazu dosadil svoje "+
      "čísla, vyjde <b>"+withU(fmtNum(shown,5),ansUnit())+"</b>, vy jste ale zapsal <b>"+
      esc(S.ansVal)+"</b>. To je chyba v počítání nebo v zaokrouhlení — postup jste "+
      "měl správně. To je podstatný rozdíl: rozumíte úloze, jen jste se překlepl.");
  }
  return D("Nikde",
    "Zadané hodnoty, vybrané vztahy, odvození, jednotka i číslo souhlasí."+
    (S.verdict.ok?"":" Rozdíl je nejspíš jen v zaokrouhlení."));
}
function usedInDeriv(id){
  return S.hist.some(function(h){ return h.card===id; });
}
function D(head,body){ return {head:head,body:"<p>"+body+"</p>"}; }

/* ============================================================ vzorové řešení */
function showModel(){
  var box=$("#modelBox");
  if(box.style.display!=="none"&&box.innerHTML){
    box.style.display="none"; box.innerHTML=""; return;
  }
  var r=TASK.ref;
  var h='<div class="calcsheet model"><div class="cs-head">'+
    '<span class="cs-id">Vzorové řešení</span>'+
    '<span class="cs-topic">'+esc(TASK.title)+"</span>"+
    '<span class="cs-kind">jedna z možných cest</span></div>'+
    '<div class="cs-task">Pokud jste šel jinudy a došel ke stejnému číslu, je vaše řešení '+
    "stejně dobré — pořadí činitelů ani způsob uzávorkování na správnosti nic nemění.</div>";
  h+=mrow("Zadání",TASK.given.map(function(g){
    var info=symInfo(g.sk), cn=TASK.ref.vals[g.sk];
    return '<div class="cs-row"><span class="cs-sym math">'+info.disp+"</span>"+
      '<span class="cs-val">'+withU(fmtNum(g.val,6),g.unit)+
      (unitText(g.unit)!==unitText(info.canon)
        ? '<span class="cs-conv"> = '+withU(fmtNum(cn,6),info.canon)+"</span>":"")+
      '</span><span class="cs-note">'+esc(info.name)+
      (g.note?" — "+esc(g.note):"")+"</span></div>";
  }).join(""));
  h+=mrow("Hledáme",'<div class="cs-row"><span class="cs-sym math">'+
    symInfo(TASK.find.sk).disp+'</span><span class="cs-val"><span class="qmark">?</span> '+
    (unitLabel(TASK.find.unit)||"bez jednotky")+"</span></div>","find");
  h+=mrow("Vztahy",'<div class="fpicked">'+TASK.need.map(function(id){
    return cardHtml(cardById(id),"");
  }).join("")+"</div>");
  h+=mrow("Odvození",r.steps.map(function(st,i){
    return '<div class="dline"><div class="cs-line"><span class="math">'+
      (i===0?symInfo(TASK.find.sk).disp+'<span class="op">=</span>':'<span class="op">=</span>')+
      rnd(st.expr,0,{})+'</span></div><div class="cs-hint">'+esc(st.note)+"</div></div>";
  }).join(""));
  var num={};
  TASK.given.forEach(function(g){
    var ul2=unitLabel(symInfo(g.sk).canon);
    num[g.sk]=fmtNum(TASK.ref.vals[g.sk],6)+(ul2?'<span class="su"> '+ul2+"</span>":"");
  });
  h+=mrow("Dosazení",'<div class="cs-line"><span class="math">'+
    symInfo(TASK.find.sk).disp+'<span class="op">=</span>'+
    rnd(r.expr,0,{num:num})+"</span></div>");
  var fcan=symInfo(TASK.find.sk).canon, mid="";
  if(unitText(fcan)!==unitText(TASK.find.unit))
    mid=withU(fmtNum(TASK.ref.canon,4),fcan)+'<span class="op">=</span>';
  h+=mrow("Odpověď",'<div class="cs-ans"><span class="math">'+symInfo(TASK.find.sk).disp+
    '<span class="op">=</span>'+mid+'</span><span class="cs-hi">'+
    withU(fmtSig(TASK.answer.val,TASK.answer.sig),TASK.find.unit)+"</span></div>"+
    '<p class="mout">'+TASK.outro+"</p>","res");
  h+="</div>";
  box.innerHTML=h;
  box.style.display="";
  var y=box.getBoundingClientRect().top+window.pageYOffset-120;
  window.scrollTo({top:Math.max(0,y),behavior:"smooth"});
}
function mrow(lab,body,extra){
  return '<section class="cs-block'+(extra?" "+extra:"")+'"><h3 class="cs-lbl">'+lab+
    '</h3><div class="cs-rows">'+body+"</div></section>";
}

/* ============================================================ výběr úlohy */
var LV=[null,{n:"Základ",d:"Jeden až dva kroky. Rozehřátí a jistota v jednotkách."},
        {n:"Střední",d:"Tři až čtyři kroky, řetěz vztahů, past v jednotkách."},
        {n:"Přijímačky",d:"Delší odvození, odmocniny a logaritmy, rozhodování navíc."}];
function renderPick(){
  var rec=store.get("done",{});
  var h="";
  [1,2,3].forEach(function(l){
    var list=TASKS.filter(function(t){ return t.level===l; });
    h+='<section class="sec"><div class="sec-head"><h2>'+LV[l].n+"</h2>"+
       '<p class="lvd">'+LV[l].d+"</p></div><div class=\"tcards\">";
    h+=list.map(function(t){
      var st=rec[t.id]||{};
      var cls=st.ok?(st.hints===0?"done0":"done"):(st.tries?"tried":"");
      var lbl=st.ok?(st.hints===0?"hotovo bez nápovědy":"hotovo"):
             (st.tries?"zkoušeno":"nezkoušeno");
      return '<button type="button" class="tcard '+cls+'" data-task="'+t.id+'">'+
        '<span class="tk">'+esc(t.topic)+"</span>"+
        "<h3>"+esc(t.title)+"</h3>"+
        '<p>'+esc(t.short)+"</p>"+
        '<span class="tst">'+lbl+"</span></button>";
    }).join("");
    h+="</div></section>";
  });
  $("#taskList").innerHTML=h;
  $$("#taskList [data-task]").forEach(function(b){
    b.addEventListener("click",function(){ startTask(b.dataset.task,false); });
  });
  renderProgress(rec);
}
function renderProgress(rec){
  var done=0,clean=0,tried=0,byTopic={};
  TASKS.forEach(function(t){
    var s=rec[t.id];
    var o=byTopic[t.topic]||(byTopic[t.topic]={n:0,ok:0,tries:0,hints:0});
    o.n++;
    if(!s) return;
    tried++;
    o.tries+=s.tries||0;
    if(s.ok){ done++; o.ok++; o.hints+=s.hints||0; if(!s.hints) clean++; }
  });
  var h='<div class="pgrid">'+
    '<div class="pb"><span class="pv">'+done+" / "+TASKS.length+'</span><span class="pk">'+
    "úloh vyřešeno</span></div>"+
    '<div class="pb"><span class="pv">'+clean+'</span><span class="pk">'+
    "z toho bez nápovědy</span></div>"+
    '<div class="pb"><span class="pv">'+tried+'</span><span class="pk">'+
    "úloh otevřeno</span></div></div>";
  var rows=Object.keys(byTopic).map(function(k){
    var o=byTopic[k];
    return {k:k,o:o,rate:o.n?o.ok/o.n:0};
  }).sort(function(a,b){ return a.rate-b.rate; });
  h+='<div class="tablewrap"><table class="brk"><thead><tr><th>Okruh</th>'+
     '<th class="n">Hotovo</th><th style="width:38%">Stav</th><th>Co s tím</th>'+
     "</tr></thead><tbody>";
  h+=rows.map(function(r){
    var pct=Math.round(r.rate*100);
    var col=pct>=100?"var(--ok)":pct>0?"var(--warn)":"var(--line-strong)";
    var rec2=pct>=100?"máte hotovo":(r.o.tries?"vraťte se k tomu":"zatím nezkoušeno");
    return "<tr><td>"+esc(r.k)+'</td><td class="n">'+r.o.ok+" / "+r.o.n+"</td>"+
      '<td><span class="bar"><i style="width:'+pct+"%;background:"+col+'"></i></span></td>'+
      "<td>"+rec2+"</td></tr>";
  }).join("");
  h+="</tbody></table></div>";
  if(done) h+='<div class="pacts"><button type="button" class="btn btn-sm" id="clearBtn">'+
    "Vynulovat pokrok</button></div>";
  $("#progress").innerHTML=h;
  var cb=$("#clearBtn");
  if(cb) cb.addEventListener("click",function(){
    if(confirm("Opravdu smazat uložený pokrok?")){ store.del("done"); renderPick(); }
  });
}

/* ============================================================ spuštění */
$("#startBtn").addEventListener("click",function(){
  var y=$("#taskList").getBoundingClientRect().top+window.pageYOffset-70;
  window.scrollTo({top:Math.max(0,y),behavior:"smooth"});
});
["warmBtn","warmBtn2"].forEach(function(id){
  var b=document.getElementById(id);
  if(b) b.addEventListener("click",function(){ startTask(DATA.warm,true); });
});
$("#hintBtn").addEventListener("click",hint);
$("#quitBtn").addEventListener("click",function(){
  if(S&&!S.done&&!confirm("Opustit rozpracovanou úlohu?")) return;
  backToPick();
});
renderPick();
"""
