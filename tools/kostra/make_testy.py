# -*- coding: utf-8 -*-
"""make_testy.py — vygeneruje sekci „Testy nanečisto" z fondu otázek (pool.json).

Výstup: C:\\Claude Code\\Claude Code\\Doučovanie\\testy-nanecisto\\index.html
"""
import io, os, re, sys, json

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

import make_site as MS
from site_data import SITE, TOPICS

OUT = os.path.join(MS.OUT, "testy-nanecisto")

# ---------------------------------------------------------------- fond otázek
def load_pool():
    raw = json.load(io.open(os.path.join(HERE, "pool.json"), encoding="utf-8"))
    slugs = [t["slug"] for t in TOPICS]
    out = []
    for q in raw:
        ti = slugs.index(q["topic"])
        out.append([ti, {"single": 0, "multi": 1, "num": 2}[q["t"]], q["q"],
                    q["o"], q["c"], q["ans"], q["tol"], q["unit"], q["e"]])
    return out


TESTCSS = """
/* ---------- výběr testu ---------- */
.preset{display:grid;gap:clamp(.85rem,1.6vw,1.1rem);grid-template-columns:repeat(auto-fit,minmax(270px,1fr));
  margin-top:1.6rem}
.pcard{position:relative;display:flex;flex-direction:column;gap:.6rem;padding:1.35rem 1.45rem;
  border:1px solid var(--line);border-radius:16px;background:var(--surface);text-align:left;cursor:pointer;
  font:inherit;color:var(--ink);transition:transform .2s,box-shadow .2s,border-color .2s}
.pcard:hover{transform:translateY(-3px);box-shadow:var(--shadow-3);border-color:var(--accent)}
.pcard .pk{font-family:var(--f-cond);font-weight:600;font-size:.72rem;letter-spacing:.12em;
  text-transform:uppercase;color:var(--accent)}
.pcard h3{font-size:1.15rem;font-weight:700}
.pcard p{font-family:var(--f-ui);font-size:.88rem;line-height:1.55;color:var(--ink-2)}
.pcard .meta{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:auto;padding-top:.7rem}
.pcard .meta span{font-family:var(--f-mono);font-size:.75rem;padding:.2rem .5rem;border-radius:6px;
  background:var(--surface-2);border:1px solid var(--line);color:var(--ink-2)}
.pcard.custom{border-style:dashed}
/* ---- CARD-LIFT: karty zřetelně oddělené od pozadí ---- */
.tile,.pcard,.tcard{
  border:2px solid var(--line-strong)!important;
  border-top:4px solid var(--accent)!important;
  border-radius:16px!important;
  box-shadow:0 1px 2px rgba(33,27,21,.07),0 6px 16px rgba(33,27,21,.09);
}
@media (prefers-color-scheme:dark){ :root:not([data-theme="light"]) .tile,
  :root:not([data-theme="light"]) .pcard, :root:not([data-theme="light"]) .tcard{ box-shadow:0 2px 6px rgba(0,0,0,.5),0 8px 20px rgba(0,0,0,.38); } }
:root[data-theme="dark"] .tile, :root[data-theme="dark"] .pcard,
:root[data-theme="dark"] .tcard{ box-shadow:0 2px 6px rgba(0,0,0,.5),0 8px 20px rgba(0,0,0,.38); }
.tile:hover,.pcard:hover,.tcard:hover{ border-color:var(--accent)!important;
  border-top-color:var(--accent)!important }
.tile.soon{ border-style:dashed!important;border-top-style:solid!important }
/* víc vzduchu kolem i uvnitř */
.tile,.pcard,.tcard{ padding:clamp(1.35rem,2.3vw,1.85rem) clamp(1.4rem,2.4vw,1.9rem) }
.tiles,.pair-grid,.preset{ gap:clamp(1rem,1.9vw,1.4rem)!important }
.pair{ padding:clamp(1rem,1.8vw,1.35rem)!important }


/* ---------- vlastní test ---------- */
.builder{border:1px solid var(--line);border-radius:16px;background:var(--surface);padding:1.4rem 1.5rem;
  margin-top:1.1rem;display:none;flex-direction:column;gap:1.1rem}
.builder.open{display:flex}
.bgrid{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(230px,1fr))}
.fld{display:flex;flex-direction:column;gap:.4rem}
.fld label{font-family:var(--f-cond);font-weight:600;font-size:.73rem;letter-spacing:.1em;
  text-transform:uppercase;color:var(--ink-3)}
.fld input[type=number],.fld select{font-family:var(--f-ui);font-size:.92rem;padding:.6rem .7rem;
  min-height:44px;border:1px solid var(--line-strong);border-radius:9px;background:var(--surface);color:var(--ink)}
.okr{display:grid;gap:.4rem;grid-template-columns:repeat(auto-fill,minmax(250px,1fr))}
.okr label{display:flex;align-items:center;gap:.55rem;padding:.5rem .65rem;border:1px solid var(--line);
  border-radius:9px;background:var(--surface-2);font-family:var(--f-ui);font-size:.86rem;cursor:pointer}
.okr input{width:17px;height:17px;accent-color:var(--accent);flex:none}
.okr label:hover{border-color:var(--accent)}
.okr .cnt{margin-left:auto;font-family:var(--f-mono);font-size:.75rem;color:var(--ink-3)}

/* ---------- běžící test ---------- */
#run{display:none}
#run.on{display:block}
.runbar{position:sticky;top:62px;z-index:40;display:flex;align-items:center;gap:.8rem;flex-wrap:wrap;
  padding:.75rem clamp(1.1rem,4vw,3rem);border-bottom:1px solid var(--line);
  background:color-mix(in srgb,var(--paper) 92%,transparent);backdrop-filter:blur(10px)}
.runbar .t{font-family:var(--f-mono);font-size:1.35rem;font-weight:600;font-variant-numeric:tabular-nums;
  letter-spacing:-.02em;min-width:5.2ch}
.runbar .t.warn{color:var(--accent)}
.runbar .lbl{font-family:var(--f-cond);font-weight:600;font-size:.72rem;letter-spacing:.11em;
  text-transform:uppercase;color:var(--ink-3)}
.runbar .prog{flex:1;min-width:120px;height:7px;border-radius:99px;background:var(--surface-3);overflow:hidden}
.runbar .prog i{display:block;height:100%;width:0;background:var(--accent);transition:width .3s}
.runbar .cnt{font-family:var(--f-mono);font-size:.9rem;color:var(--ink-2);font-variant-numeric:tabular-nums}
.qwrap{max-width:900px;margin:0 auto;padding:1.6rem clamp(1.1rem,4vw,3rem) 4rem;
  display:flex;flex-direction:column;gap:.9rem}
.qc{border:1px solid var(--line);border-radius:14px;background:var(--surface);padding:1.15rem 1.25rem;
  display:flex;flex-direction:column;gap:.8rem;scroll-margin-top:130px}
.qc.unanswered.flag{border-color:var(--accent);border-left:3px solid var(--accent)}
.qc .qh{display:flex;gap:.7rem;align-items:baseline}
.qc .qn{font-family:var(--f-mono);font-size:.8rem;font-weight:600;color:var(--ink-3);flex:none}
.qc .qt{font-family:var(--f-ui);font-size:1rem;font-weight:500;line-height:1.5}
.qc .src{font-family:var(--f-cond);font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;
  color:var(--ink-3);margin-left:auto;flex:none;white-space:nowrap}
.opts{display:flex;flex-direction:column;gap:.4rem}
.opt{display:flex;gap:.65rem;align-items:flex-start;padding:.6rem .75rem;min-height:44px;
  border:1px solid var(--line);border-radius:9px;cursor:pointer;background:var(--surface-2);
  font-family:var(--f-ui);font-size:.92rem;line-height:1.45}
.opt:hover{border-color:var(--line-strong)}
.opt input{margin:.25rem 0 0;accent-color:var(--accent);width:18px;height:18px;flex:none}
.opt .mk{margin-left:auto;font-weight:700;opacity:0;flex:none}
.numin{display:flex;align-items:center;gap:.5rem;flex-wrap:wrap}
.numin input{font-family:var(--f-mono);font-size:1rem;padding:.55rem .7rem;min-height:44px;width:10rem;
  border:1px solid var(--line-strong);border-radius:9px;background:var(--surface);color:var(--ink)}
.numin .u{font-family:var(--f-mono);font-size:.88rem;color:var(--ink-2)}
.hint{font-family:var(--f-cond);font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-3)}
.expl{display:none;border-radius:10px;padding:.85rem 1rem;background:var(--surface-2);
  border:1px solid var(--line);font-family:var(--f-ui);font-size:.93rem;line-height:1.6;
  flex-direction:column;gap:.45rem}
.qc.done .expl{display:flex}
.qc.ok{border-color:var(--ok,#3f7a34);border-left:3px solid var(--ok,#3f7a34)}
.qc.bad{border-color:var(--bad,#a62f3b);border-left:3px solid var(--bad,#a62f3b)}
.qc.ok .expl{background:var(--ok-soft,#eaf2e4);border-color:var(--ok,#3f7a34)}
.qc.bad .expl{background:var(--bad-soft,#f8e4e6);border-color:var(--bad,#a62f3b)}
.opt.c{background:var(--ok-soft,#eaf2e4);border-color:var(--ok,#3f7a34)}
.opt.c .mk{opacity:1;color:var(--ok,#3f7a34)}
.opt.w{background:var(--bad-soft,#f8e4e6);border-color:var(--bad,#a62f3b)}
.opt.w .mk{opacity:1;color:var(--bad,#a62f3b)}
.verd{font-family:var(--f-ui);font-weight:700;font-size:.9rem}
.qc.ok .verd{color:var(--ok,#3f7a34)} .qc.bad .verd{color:var(--bad,#a62f3b)}

/* ---------- výsledek ---------- */
#res{display:none}
#res.on{display:block}
.score{display:grid;gap:1px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));
  background:var(--line);border:1px solid var(--line);border-radius:16px;overflow:hidden;margin-top:1.4rem}
.score .b{background:var(--surface);padding:1.2rem 1.3rem;display:flex;flex-direction:column;gap:.15rem}
.score .v{font-family:var(--f-mono);font-size:clamp(1.7rem,1.2rem + 1.4vw,2.4rem);font-weight:600;
  letter-spacing:-.03em;font-variant-numeric:tabular-nums}
.score .k{font-family:var(--f-ui);font-size:.82rem;color:var(--ink-3)}
.verdictbox{margin-top:1.2rem;border:1px solid var(--line);border-left:4px solid var(--accent);
  border-radius:12px;padding:1.1rem 1.3rem;background:var(--surface);
  font-family:var(--f-ui);font-size:.98rem;line-height:1.6;color:var(--ink-2)}
.verdictbox b{color:var(--ink)}
.brk{width:100%;border-collapse:collapse;font-family:var(--f-ui);font-size:.88rem;margin-top:.6rem}
.brk th{text-align:left;padding:.55rem .7rem;border-bottom:1px solid var(--line-strong);
  font-family:var(--f-cond);font-size:.72rem;letter-spacing:.09em;text-transform:uppercase;color:var(--ink-3)}
.brk td{padding:.5rem .7rem;border-bottom:1px solid var(--line);vertical-align:middle}
.brk tr:last-child td{border-bottom:0}
.brk td.n{text-align:right;font-family:var(--f-mono);font-variant-numeric:tabular-nums;white-space:nowrap}
.brk .bar{display:block;height:8px;border-radius:99px;background:var(--surface-3);overflow:hidden;min-width:70px}
.brk .bar i{display:block;height:100%;border-radius:99px}
.brk a{color:var(--accent);text-decoration:none;font-weight:600}
.brk a:hover{text-decoration:underline}
.tablewrap{overflow-x:auto;border:1px solid var(--line);border-radius:12px;background:var(--surface);margin-top:.8rem}
.acts{display:flex;flex-wrap:wrap;gap:.6rem;margin-top:1.4rem}
.hist{margin-top:2.2rem}
.hist ul{list-style:none;margin:.7rem 0 0;padding:0;display:flex;flex-direction:column;gap:.4rem}
.hist li{display:flex;gap:.8rem;align-items:center;flex-wrap:wrap;padding:.6rem .85rem;border:1px solid var(--line);
  border-radius:10px;background:var(--surface);font-family:var(--f-ui);font-size:.86rem;color:var(--ink-2)}
.hist li b{font-family:var(--f-mono);color:var(--ink)}
.hist .sp{flex:1}
"""

CLOCK_ART = ('<svg class="hero-art alt" width="430" height="430" viewBox="0 0 100 100" fill="none" '
             'stroke="currentColor" stroke-width="1.1" stroke-linecap="round" aria-hidden="true">'
             '<circle cx="50" cy="52" r="34"/><circle cx="50" cy="52" r="40" stroke-dasharray="1.5 4.5"/>'
             '<path d="M50 30v-6M42 25h16"/><path d="M50 52V34" stroke-width="2"/>'
             '<path d="M50 52l14 9" stroke-width="2"/>'
             '<circle cx="50" cy="52" r="2.6" fill="currentColor" stroke="none"/>'
             '<path d="M74 28l6-6M20 28l-6-6"/></svg>')


def build(pool):
    css = MS.TOKENS + MS.CHROME + MS.TILES + MS.HERO + TESTCSS + """
:root{--ok:#3f7a34;--ok-soft:#eaf2e4;--bad:#a62f3b;--bad-soft:#f8e4e6;--warn:#8a6410}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
  --ok:#7fc08a;--ok-soft:#19291b;--bad:#ee7a90;--bad-soft:#301820;--warn:#dcae5b}}
:root[data-theme="dark"]{--ok:#7fc08a;--ok-soft:#19291b;--bad:#ee7a90;--bad-soft:#301820;--warn:#dcae5b}
"""
    h = MS.head("Testy nanečisto — " + SITE["name"],
                "Testy nanečisto z chemie: souhrnný test, přijímačky nanečisto a vlastní test "
                "z vybraných okruhů. S časovým limitem, vyhodnocením a rozborem podle okruhů.", css)
    h += MS.topbar("../index.html",
                   '<nav class="crumb" aria-label="Drobečková navigace">'
                   '<a href="../index.html">Úvod</a><span>/</span><b>Testy nanečisto</b></nav>',
                   back=("../index.html", "Zpátky na úvod"))
    h += '<main id="obsah">\n'

    # ------- výběr -------
    h += '<div id="pick">'
    h += ('<section class="hero sub"><div class="hero-bg alt"></div>' + CLOCK_ART + '<div class="hero-in">'
          '<span class="eyebrow">Zkouška nanečisto · na čas · s rozborem</span>'
          '<h1>Testy nanečisto</h1>'
          '<p class="lead">Vyberte si test, pusťte stopky a nedívejte se do materiálů. '
          'Po odevzdání uvidíte nejen výsledek, ale i to, které okruhy vás srazily nejvíc.</p>'
          '</div></section>\n')
    h += '<div class="wrap"><section class="sec"><div class="sec-head"><h2>Vyberte si test</h2></div>'
    h += '<div class="preset" id="presets"></div>'
    h += """
<div class="builder" id="builder">
  <div class="bgrid">
    <div class="fld"><label for="bCount">Počet otázek</label>
      <input type="number" id="bCount" min="5" max="80" step="5" value="30" autocomplete="off"></div>
    <div class="fld"><label for="bTime">Časový limit (minuty)</label>
      <input type="number" id="bTime" min="0" max="180" step="5" value="45" autocomplete="off"></div>
    <div class="fld"><label for="bType">Typy otázek</label>
      <select id="bType" autocomplete="off">
        <option value="all">Všechny typy</option>
        <option value="single">Jen výběr z možností</option>
        <option value="num">Jen početní</option>
      </select></div>
  </div>
  <div class="fld"><label>Okruhy v testu</label><div class="okr" id="bOkr"></div></div>
  <div class="acts" style="margin-top:0">
    <button class="btn btn-primary" type="button" id="bStart">Spustit test</button>
    <button class="btn" type="button" id="bAll">Vybrat vše</button>
    <button class="btn" type="button" id="bNone">Zrušit výběr</button>
  </div>
</div>
"""
    h += '</section>'
    h += ('<section class="sec hist" id="hist" style="display:none">'
          '<div class="sec-head"><h2>Vaše poslední pokusy</h2></div><ul id="histList"></ul>'
          '<div class="acts"><button class="btn" type="button" id="histClear">Smazat historii</button></div>'
          '</section>')
    h += '</div></div>\n'

    # ------- běh testu -------
    h += """<div id="run">
  <div class="runbar">
    <span class="lbl">Zbývá</span><span class="t" id="clock">--:--</span>
    <span class="prog"><i id="pfill"></i></span>
    <span class="cnt" id="answered">0 / 0</span>
    <button class="btn btn-primary" type="button" id="submit">Odevzdat test</button>
    <button class="btn" type="button" id="abort">Ukončit</button>
  </div>
  <div class="qwrap" id="qwrap"></div>
</div>
"""
    # ------- výsledek -------
    h += """<div id="res"><div class="wrap"><section class="sec">
  <div class="sec-head"><h2 id="resTitle">Výsledek</h2></div>
  <div class="score" id="scoreBox"></div>
  <div class="verdictbox" id="verdict"></div>
  <h3 style="margin-top:2rem;font-size:1.15rem">Rozbor podle okruhů</h3>
  <div class="tablewrap"><table class="brk"><thead><tr>
    <th>Okruh</th><th class="n">Správně</th><th style="width:34%">Úspěšnost</th><th>Doporučení</th>
  </tr></thead><tbody id="brkBody"></tbody></table></div>
  <div class="acts">
    <button class="btn btn-primary" type="button" id="again">Zkusit znovu</button>
    <button class="btn" type="button" id="review">Projít otázky s vysvětlením</button>
    <a class="btn" href="../obecna-fyzikalni-chemie/index.html">Přejít na okruhy</a>
  </div>
</section></div></div>
"""
    h += '</main>\n' + MS.foot()

    data = {
        "topics": [{"n": t["n"], "t": t["title"], "s": t["slug"]} for t in TOPICS],
        "pool": pool,
    }
    h += "<script>\nvar DATA=" + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n"
    h += ENGINE + "\n</script>\n"
    h += MS.theme_script().replace("</body>\n</html>\n", "</body>\n</html>\n")
    return h


ENGINE = r"""
(function(){
"use strict";
var $=function(s,r){return (r||document).querySelector(s);};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
var POOL=DATA.pool, TOP=DATA.topics;
var T_SINGLE=0,T_MULTI=1,T_NUM=2;

var PRESETS=[
 {id:"zkouška",kicker:"Nejblíž zkoušce",title:"Souhrnný test",
  desc:"Průřez všemi deseti okruhy ve stejném poměru, jako je má osnova. Mix teorie i výpočtů.",
  n:40,min:60,topics:null,type:"all"},
 {id:"prijimacky",kicker:"Tvrdší varianta",title:"Přijímačky nanečisto",
  desc:"Důraz na počítání a na okruhy, které dělají na přijímačkách největší potíže: termochemie, rovnováha, elektrochemie a pH.",
  n:40,min:50,topics:[4,5,6,7,8,9],type:"hard"},
 {id:"blesk",kicker:"Krátká rozcvička",title:"Bleskový test",
  desc:"Patnáct otázek napříč vším za patnáct minut. Dobré na zahřátí nebo na konec hodiny.",
  n:15,min:15,topics:null,type:"all"},
 {id:"custom",kicker:"Podle sebe",title:"Vlastní test",
  desc:"Vyberte si okruhy, počet otázek, typ i časový limit. Hodí se, když se chcete zaměřit na jedno téma.",
  n:0,min:0,topics:null,type:"custom"}
];

/* ---------- pomocné ---------- */
function shuffle(a,rnd){for(var i=a.length-1;i>0;i--){var j=Math.floor((rnd?rnd():Math.random())*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
function fmtTime(s){var m=Math.floor(s/60),x=s%60;return (m<10?"0":"")+m+":"+(x<10?"0":"")+x;}
function esc(s){return String(s);}
var store={
 get:function(k,f){try{var v=localStorage.getItem("testy."+k);return v===null?f:JSON.parse(v);}catch(e){return f;}},
 set:function(k,v){try{localStorage.setItem("testy."+k,JSON.stringify(v));}catch(e){}},
 del:function(k){try{localStorage.removeItem("testy."+k);}catch(e){}}
};

/* ---------- výběr otázek ---------- */
function pickQuestions(cfg){
  var allowed=cfg.topics&&cfg.topics.length?cfg.topics:TOP.map(function(_,i){return i;});
  var byTopic={};
  allowed.forEach(function(ti){byTopic[ti]=[];});
  POOL.forEach(function(q){
    if(byTopic[q[0]]===undefined) return;
    if(cfg.type==="single"&&q[1]!==T_SINGLE) return;
    if(cfg.type==="num"&&q[1]!==T_NUM) return;
    byTopic[q[0]].push(q);
  });
  allowed.forEach(function(ti){shuffle(byTopic[ti]);});
  if(cfg.type==="hard"){
    allowed.forEach(function(ti){
      byTopic[ti].sort(function(a,b){
        var wa=(a[1]===T_NUM?0:a[1]===T_MULTI?1:2), wb=(b[1]===T_NUM?0:b[1]===T_MULTI?1:2);
        return wa-wb;
      });
    });
  }
  var out=[],i=0,guard=0;
  while(out.length<cfg.n&&guard<10000){
    guard++;
    var any=false;
    for(var k=0;k<allowed.length&&out.length<cfg.n;k++){
      var arr=byTopic[allowed[k]];
      if(arr.length>i){out.push(arr[i]);any=true;}
    }
    if(!any) break;
    i++;
  }
  return shuffle(out).slice(0,cfg.n);
}

/* zamíchá možnosti a přepočítá index správné odpovědi */
function prepare(q){
  var item={ti:q[0],type:q[1],q:q[2],unit:q[7]||"",e:q[8]||"",ans:q[5],tol:q[6]};
  if(q[1]===T_NUM){item.o=null;item.c=null;return item;}
  var idx=q[3].map(function(_,i){return i;});
  shuffle(idx);
  item.o=idx.map(function(i){return q[3][i];});
  if(q[1]===T_SINGLE){ item.c=idx.indexOf(q[4]); }
  else { item.c=q[4].map(function(ci){return idx.indexOf(ci);}).sort(function(a,b){return a-b;}); }
  return item;
}

/* ---------- stav ---------- */
var S={items:[],cfg:null,left:0,timer:null,started:0};

/* ---------- obrazovka výběru ---------- */
function renderPresets(){
  $("#presets").innerHTML=PRESETS.map(function(p){
    var meta = p.id==="custom" ? '<span>vy si volíte</span>'
      : '<span>'+p.n+' otázek</span><span>'+p.min+' min</span><span>'+
        (p.topics?p.topics.length:TOP.length)+' okruhů</span>';
    return '<button class="pcard'+(p.id==="custom"?" custom":"")+'" type="button" data-p="'+p.id+'">'+
      '<span class="pk">'+p.kicker+'</span><h3>'+p.title+'</h3><p>'+p.desc+'</p>'+
      '<span class="meta">'+meta+'</span></button>';
  }).join("");
  $$("#presets .pcard").forEach(function(b){
    b.addEventListener("click",function(){
      var p=PRESETS.filter(function(x){return x.id===b.dataset.p;})[0];
      if(p.id==="custom"){ $("#builder").classList.toggle("open");
        if($("#builder").classList.contains("open")) $("#builder").scrollIntoView({behavior:"smooth",block:"center"});
        return; }
      start({n:p.n,min:p.min,topics:p.topics,type:p.type,title:p.title});
    });
  });
}
function renderOkr(){
  var counts={};
  POOL.forEach(function(q){counts[q[0]]=(counts[q[0]]||0)+1;});
  $("#bOkr").innerHTML=TOP.map(function(t,i){
    return '<label><input type="checkbox" value="'+i+'" checked autocomplete="off">'+
      '<span>'+t.n+' · '+t.t+'</span><span class="cnt">'+(counts[i]||0)+'</span></label>';
  }).join("");
}
function customCfg(){
  var ts=$$("#bOkr input:checked").map(function(i){return +i.value;});
  return {n:Math.max(5,Math.min(80,+$("#bCount").value||30)),
          min:Math.max(0,Math.min(180,+$("#bTime").value||0)),
          topics:ts,type:$("#bType").value,title:"Vlastní test"};
}

/* ---------- start ---------- */
function start(cfg){
  var raw=pickQuestions(cfg);
  if(!raw.length){ alert("Pro tuto kombinaci nemáme žádné otázky. Zkuste přidat okruhy nebo povolit více typů."); return; }
  S.cfg=cfg; S.cfg.n=raw.length;
  S.items=raw.map(prepare);
  S.left=cfg.min*60; S.started=Date.now();
  $("#pick").style.display="none"; $("#res").classList.remove("on");
  $("#run").classList.add("on");
  renderQuestions();
  updateBar();
  if(S.timer) clearInterval(S.timer);
  if(cfg.min>0){
    S.timer=setInterval(function(){
      S.left--; paintClock();
      if(S.left<=0){ clearInterval(S.timer); finish(true); }
    },1000);
  } else { $("#clock").textContent="∞"; }
  paintClock();
  window.scrollTo({top:0,behavior:"instant"});
}
function paintClock(){
  var c=$("#clock");
  if(!S.cfg||S.cfg.min<=0){c.textContent="∞";return;}
  c.textContent=fmtTime(Math.max(0,S.left));
  c.classList.toggle("warn",S.left<=300);
}
function renderQuestions(){
  $("#qwrap").innerHTML=S.items.map(function(it,i){
    var body="";
    if(it.type===T_NUM){
      body='<div class="numin"><input type="text" inputmode="decimal" data-i="'+i+'" '+
           'placeholder="číslo" autocomplete="off" aria-label="Odpověď"><span class="u">'+it.unit+'</span></div>';
    } else {
      var type=it.type===T_MULTI?"checkbox":"radio";
      body='<div class="opts">'+it.o.map(function(o,oi){
        return '<label class="opt"><input type="'+type+'" name="q'+i+'" value="'+oi+'" data-i="'+i+'" autocomplete="off">'+
               '<span>'+o+'</span><span class="mk"></span></label>';
      }).join("")+'</div>';
      if(it.type===T_MULTI) body+='<span class="hint">Vyberte všechny správné možnosti</span>';
    }
    return '<div class="qc unanswered" data-q="'+i+'" id="q'+i+'">'+
      '<div class="qh"><span class="qn">'+(i+1)+'.</span><span class="qt">'+it.q+'</span>'+
      '<span class="src">Okruh '+TOP[it.ti].n+'</span></div>'+body+
      '<div class="expl"></div></div>';
  }).join("");
  $$("#qwrap input").forEach(function(inp){
    inp.addEventListener("input",updateBar);
    inp.addEventListener("change",updateBar);
  });
}
function answeredCount(){
  var n=0;
  S.items.forEach(function(it,i){
    var card=$("#q"+i);
    var has = it.type===T_NUM ? !!$("input",card).value.trim()
            : $$("input:checked",card).length>0;
    card.classList.toggle("unanswered",!has);
    if(has) n++;
  });
  return n;
}
function updateBar(){
  var n=answeredCount(), tot=S.items.length;
  $("#answered").textContent=n+" / "+tot;
  $("#pfill").style.width=(tot?Math.round(n/tot*100):0)+"%";
}

/* ---------- vyhodnocení ---------- */
function parseNum(v){
  var s=String(v||"").trim().replace(/\s/g,"").replace(",",".").replace(/−/g,"-");
  var f=parseFloat(s); return isNaN(f)?null:f;
}
function grade(){
  var per={},correct=0;
  S.items.forEach(function(it,i){
    var card=$("#q"+i), ok=false;
    if(it.type===T_NUM){
      var inp=$("input",card), v=parseNum(inp.value);
      var tol=it.tol!==null&&it.tol!==undefined?it.tol:Math.max(0.05,Math.abs(it.ans)*0.01);
      ok = v!==null && Math.abs(v-it.ans)<=tol;
      inp.disabled=true;
      if(!ok) card.querySelector(".numin").insertAdjacentHTML("beforeend",
        '<span class="u" style="color:var(--ok)">správně: '+String(it.ans).replace(".",",")+' '+it.unit+'</span>');
    } else {
      var picked=[];
      $$(".opt",card).forEach(function(l,oi){
        var inp=$("input",l);
        var isC = it.type===T_MULTI ? it.c.indexOf(oi)>=0 : oi===it.c;
        if(inp.checked) picked.push(oi);
        if(isC){ l.classList.add("c"); $(".mk",l).textContent="✓"; }
        else if(inp.checked){ l.classList.add("w"); $(".mk",l).textContent="✕"; }
        inp.disabled=true;
      });
      ok = it.type===T_MULTI
        ? (picked.length===it.c.length&&picked.every(function(p){return it.c.indexOf(p)>=0;}))
        : (picked.length===1&&picked[0]===it.c);
    }
    card.classList.remove("unanswered");
    card.classList.add("done",ok?"ok":"bad");
    $(".expl",card).innerHTML='<span class="verd">'+(ok?"✓ Správně":"✕ Špatně")+'</span>'+
      '<span class="hint">Proč</span><div>'+it.e+'</div>';
    if(ok) correct++;
    var t=per[it.ti]||(per[it.ti]={ok:0,n:0});
    t.n++; if(ok) t.ok++;
  });
  return {correct:correct,total:S.items.length,per:per};
}
function finish(auto){
  if(S.timer) clearInterval(S.timer);
  var r=grade();
  var pct=Math.round(r.correct/r.total*100);
  var secs=Math.round((Date.now()-S.started)/1000);
  var mins=secs<60?"<1":String(Math.round(secs/60));
  $("#run").classList.remove("on");
  $("#res").classList.add("on");
  $("#resTitle").textContent=(S.cfg.title||"Test")+" — výsledek";
  var mark = pct>=90?"výborně":pct>=75?"chvalitebně":pct>=60?"dobře":pct>=45?"dostatečně":"nedostatečně";
  $("#scoreBox").innerHTML=
    '<div class="b"><span class="v">'+pct+' %</span><span class="k">úspěšnost</span></div>'+
    '<div class="b"><span class="v">'+r.correct+'/'+r.total+'</span><span class="k">správných odpovědí</span></div>'+
    '<div class="b"><span class="v">'+mins+' min</span><span class="k">čas na vypracování</span></div>'+
    '<div class="b"><span class="v" style="font-size:1.5rem;letter-spacing:-.02em">'+mark+'</span>'+
    '<span class="k">orientační známka</span></div>';
  var worst=null;
  Object.keys(r.per).forEach(function(ti){
    var p=r.per[ti], rate=p.ok/p.n;
    if(p.n>=2&&(worst===null||rate<worst.rate)) worst={ti:+ti,rate:rate,p:p};
  });
  var msg="";
  if(auto) msg+="<b>Vypršel čas.</b> Neodpovězené otázky se počítají jako chybné. ";
  if(pct>=75) msg+="Tohle je solidní výsledek — látku máte v hlavě. ";
  else if(pct>=60) msg+="Základ držíte, ale ještě to chce zopakovat. ";
  else msg+="Zatím to na zkoušku nestačí, projděte si okruhy znovu a test si dejte za pár dní. ";
  if(worst) msg+="Nejhůř jste dopadl v okruhu <b>"+TOP[worst.ti].n+" "+TOP[worst.ti].t+
    "</b> ("+Math.round(worst.rate*100)+" %). Začněte tam.";
  $("#verdict").innerHTML=msg;
  $("#brkBody").innerHTML=Object.keys(r.per).sort(function(a,b){
      return (r.per[a].ok/r.per[a].n)-(r.per[b].ok/r.per[b].n);
    }).map(function(ti){
    var p=r.per[ti], rate=Math.round(p.ok/p.n*100);
    var col = rate>=75?"var(--ok)":rate>=50?"var(--warn)":"var(--bad)";
    var rec = rate>=75?"v pořádku":rate>=50?"projít tahák":"projít celý okruh";
    return '<tr><td>'+TOP[ti].n+' · '+TOP[ti].t+'</td>'+
      '<td class="n">'+p.ok+'/'+p.n+'</td>'+
      '<td><span class="bar"><i style="width:'+rate+'%;background:'+col+'"></i></span></td>'+
      '<td><a href="../obecna-fyzikalni-chemie/'+TOP[ti].s+'.html">'+rec+' →</a></td></tr>';
  }).join("");
  var hist=store.get("history",[]);
  hist.unshift({d:Date.now(),t:S.cfg.title||"Test",p:pct,c:r.correct,n:r.total});
  store.set("history",hist.slice(0,10));
  window.scrollTo({top:0,behavior:"instant"});
}

/* ---------- historie ---------- */
function renderHist(){
  var hist=store.get("history",[]);
  if(!hist.length){ $("#hist").style.display="none"; return; }
  $("#hist").style.display="";
  $("#histList").innerHTML=hist.map(function(h){
    var d=new Date(h.d);
    var col = h.p>=75?"var(--ok)":h.p>=60?"var(--warn)":"var(--bad)";
    return '<li><b>'+h.p+' %</b><span>'+h.t+'</span><span class="sp"></span>'+
      '<span>'+h.c+'/'+h.n+' správně</span>'+
      '<span>'+d.toLocaleDateString("cs-CZ")+' '+d.toLocaleTimeString("cs-CZ",{hour:"2-digit",minute:"2-digit"})+'</span>'+
      '<span style="width:9px;height:9px;border-radius:50%;background:'+col+'"></span></li>';
  }).join("");
}

/* ---------- ovládání ---------- */
function backToPick(){
  if(S.timer) clearInterval(S.timer);
  $("#run").classList.remove("on"); $("#res").classList.remove("on");
  $("#pick").style.display=""; renderHist();
  window.scrollTo({top:0,behavior:"instant"});
}
$("#submit").addEventListener("click",function(){
  var un=S.items.length-answeredCount();
  if(un>0&&!confirm("Ještě máte "+un+" nezodpovězených otázek. Opravdu odevzdat?")) return;
  finish(false);
});
$("#abort").addEventListener("click",function(){
  if(confirm("Ukončit test bez vyhodnocení?")) backToPick();
});
$("#again").addEventListener("click",function(){ start(S.cfg); });
$("#review").addEventListener("click",function(){
  $("#res").classList.remove("on"); $("#run").classList.add("on");
  $("#submit").style.display="none"; $("#abort").textContent="Zpátky na výsledek";
  $("#abort").onclick=function(){
    $("#run").classList.remove("on"); $("#res").classList.add("on");
    $("#submit").style.display=""; $("#abort").textContent="Ukončit"; $("#abort").onclick=null;
    window.scrollTo({top:0,behavior:"instant"});
  };
  window.scrollTo({top:0,behavior:"instant"});
});
$("#bStart").addEventListener("click",function(){
  var c=customCfg();
  if(!c.topics.length){ alert("Vyberte aspoň jeden okruh."); return; }
  start(c);
});
$("#bAll").addEventListener("click",function(){ $$("#bOkr input").forEach(function(i){i.checked=true;}); });
$("#bNone").addEventListener("click",function(){ $$("#bOkr input").forEach(function(i){i.checked=false;}); });
$("#histClear").addEventListener("click",function(){
  if(confirm("Smazat historii pokusů?")){ store.del("history"); renderHist(); }
});
window.addEventListener("beforeunload",function(e){
  if($("#run").classList.contains("on")&&S.timer){ e.preventDefault(); e.returnValue=""; }
});

renderPresets(); renderOkr(); renderHist();
})();
"""


def main():
    os.makedirs(OUT, exist_ok=True)
    pool = load_pool()
    html = build(pool)
    p = os.path.join(OUT, "index.html")
    io.open(p, "w", encoding="utf-8", newline="\n").write(html)
    print("otázek ve fondu:", len(pool))
    print("zapsáno:", p, "%.0f KB" % (len(html.encode()) / 1024))


if __name__ == "__main__":
    main()
