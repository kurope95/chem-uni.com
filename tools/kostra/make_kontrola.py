# -*- coding: utf-8 -*-
"""make_kontrola.py — tiskový klíč se všemi otázkami k odborné kontrole.

Vytvoří  Doučovanie/kontrola-otazek/index.html  — SOUKROMÝ nástroj pro učitele.
Obsahuje správné odpovědi, takže se **nenahrává na web** (make_dist.py ho nekopíruje).

    python make_kontrola.py
"""
import io, json, os, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

from make_site import TOKENS, head, theme_script, ARL

HERE = os.path.dirname(os.path.abspath(__file__))
POOL = os.path.join(HERE, "pool.json")
OUT = r"C:\Claude Code\Claude Code\Doučovanie\kontrola-otazek"

CSS = """
*{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);font-family:var(--f-serif)}
.wrap{max-width:1180px;margin:0 auto;padding:0 clamp(1rem,3vw,2.2rem) 4rem}
header.top{position:sticky;top:0;z-index:30;background:var(--surface);
  border-bottom:1px solid var(--line);box-shadow:0 1px 0 rgba(0,0,0,.03)}
.top-in{max-width:1180px;margin:0 auto;padding:.7rem clamp(1rem,3vw,2.2rem);
  display:flex;align-items:center;gap:1rem;flex-wrap:wrap}
.brand{display:flex;align-items:center;gap:.55rem;font-family:var(--f-ui);
  font-weight:700;letter-spacing:-.02em;text-decoration:none;color:var(--ink)}
.brand .dot{width:26px;height:26px;border-radius:8px;background:var(--accent);
  color:var(--accent-ink);display:grid;place-items:center;font-family:var(--f-mono);
  font-size:.76rem;font-weight:700}
.sp{flex:1}
.btn{display:inline-flex;align-items:center;gap:.45rem;font-family:var(--f-ui);
  font-weight:600;font-size:.85rem;padding:.5rem .9rem;min-height:38px;border-radius:10px;
  border:1px solid var(--line-strong);background:var(--surface);color:var(--ink);
  cursor:pointer;text-decoration:none}
.btn:hover{background:var(--surface-2)}
.btn.pri{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}
.btn.pri:hover{background:var(--accent-hover)}

.lede{padding:2.2rem 0 .6rem}
h1{font-family:var(--f-ui);font-size:clamp(1.7rem,1.2rem + 1.9vw,2.5rem);font-weight:700;
  letter-spacing:-.03em;margin:0 0 .5rem}
.lede p{margin:.3rem 0;color:var(--ink-2);max-width:80ch;line-height:1.68}
.warn{margin-top:1rem;border:2px solid var(--accent);border-radius:14px;
  background:var(--accent-soft,var(--surface-2));padding:.9rem 1.1rem;
  font-family:var(--f-ui);font-size:.9rem;color:var(--ink);max-width:80ch}

.controls{position:sticky;top:56px;z-index:20;background:var(--paper);
  padding:.9rem 0;border-bottom:1px solid var(--line);margin-bottom:1.4rem}
.row{display:flex;gap:.5rem;flex-wrap:wrap;align-items:center}
.row + .row{margin-top:.55rem}
.seg{display:inline-flex;border:1px solid var(--line-strong);border-radius:10px;overflow:hidden}
.seg button{border:0;background:var(--surface);color:var(--ink-2);font-family:var(--f-ui);
  font-weight:600;font-size:.8rem;padding:.45rem .8rem;min-height:36px;cursor:pointer}
.seg button + button{border-left:1px solid var(--line)}
.seg button[aria-pressed="true"]{background:var(--accent);color:var(--accent-ink)}
select,input[type=search]{font-family:var(--f-ui);font-size:.85rem;padding:.45rem .6rem;
  min-height:36px;border-radius:10px;border:1px solid var(--line-strong);
  background:var(--surface);color:var(--ink)}
input[type=search]{min-width:min(340px,100%)}
.count{font-family:var(--f-mono);font-size:.8rem;color:var(--ink-3)}

.tsec{margin:2.2rem 0 0}
.tsec > h2{font-family:var(--f-ui);font-size:1.25rem;font-weight:700;letter-spacing:-.02em;
  margin:0 0 .2rem;padding-bottom:.5rem;border-bottom:2px solid var(--accent)}
.tsec > .tmeta{font-family:var(--f-mono);font-size:.76rem;color:var(--ink-3);margin:.35rem 0 1rem}

.qcard{border:1px solid var(--line-strong);border-left:4px solid var(--line-strong);
  border-radius:12px;background:var(--surface);padding:1rem 1.15rem;margin:0 0 .8rem;
  break-inside:avoid;page-break-inside:avoid}
.qcard.ok{border-left-color:#2e7d4f}
.qcard.bad{border-left-color:var(--accent);background:var(--surface-2)}
.qh{display:flex;gap:.6rem;align-items:baseline;flex-wrap:wrap;margin-bottom:.5rem}
.qid{font-family:var(--f-mono);font-size:.74rem;color:var(--ink-3);white-space:nowrap}
.tag{font-family:var(--f-ui);font-size:.68rem;font-weight:700;letter-spacing:.08em;
  text-transform:uppercase;padding:.16rem .45rem;border-radius:6px;
  border:1px solid var(--line-strong);color:var(--ink-2)}
.tag.single{border-color:#5b7fa6;color:#3f6690}
.tag.multi{border-color:#8a6bb0;color:#6f519a}
.tag.num{border-color:#9b7a2f;color:#7d6023}
.qt{font-size:1.02rem;line-height:1.6;margin:0 0 .6rem}
ol.opts{margin:0 0 .6rem;padding-left:0;list-style:none;
  display:grid;gap:.3rem}
ol.opts li{display:grid;grid-template-columns:1.7rem 1fr;gap:.5rem;align-items:start;
  font-size:.95rem;line-height:1.55;padding:.3rem .5rem;border-radius:8px}
ol.opts li .lt{font-family:var(--f-mono);font-size:.82rem;color:var(--ink-3)}
ol.opts li.right{background:rgba(46,125,79,.11)}
ol.opts li.right .lt{color:#2e7d4f;font-weight:700}
ol.opts li.right::after{content:"správně";justify-self:end;grid-column:2;
  font-family:var(--f-ui);font-size:.68rem;font-weight:700;letter-spacing:.08em;
  text-transform:uppercase;color:#2e7d4f}
.numans{font-family:var(--f-mono);font-size:.95rem;padding:.45rem .7rem;border-radius:8px;
  background:rgba(46,125,79,.11);color:var(--ink);display:inline-block;margin-bottom:.6rem}
.exp{font-size:.93rem;line-height:1.65;color:var(--ink-2);border-top:1px dashed var(--line);
  padding-top:.55rem;margin:0}
.exp b{color:var(--ink)}
.chem{font-family:var(--f-mono)}

.audit{display:flex;gap:.55rem;align-items:center;flex-wrap:wrap;margin-top:.7rem;
  border-top:1px dashed var(--line);padding-top:.6rem}
.audit label{display:inline-flex;align-items:center;gap:.35rem;font-family:var(--f-ui);
  font-size:.82rem;color:var(--ink-2);cursor:pointer}
.audit input[type=checkbox]{width:17px;height:17px;accent-color:var(--accent)}
.audit input[type=text]{flex:1;min-width:200px;font-family:var(--f-ui);font-size:.83rem;
  padding:.4rem .55rem;border-radius:8px;border:1px solid var(--line-strong);
  background:var(--paper);color:var(--ink)}
.empty{padding:3rem 1rem;text-align:center;color:var(--ink-3);font-family:var(--f-ui)}

.sum{position:fixed;right:14px;bottom:14px;z-index:40;background:var(--surface);
  border:2px solid var(--line-strong);border-radius:14px;padding:.6rem .85rem;
  font-family:var(--f-mono);font-size:.78rem;color:var(--ink-2);
  box-shadow:0 8px 24px rgba(33,27,21,.16)}
.sum b{color:var(--ink)}

@media print{
  header.top,.controls,.audit,.sum,.noprint{display:none!important}
  body{background:#fff;color:#000}
  .wrap{max-width:none;padding:0}
  .qcard{border:1px solid #bbb;border-left:3px solid #666;box-shadow:none;background:#fff}
  .qcard.bad{background:#fff}
  ol.opts li.right{background:#eee;outline:1px solid #999}
  .tsec{page-break-before:always}
  .tsec:first-of-type{page-break-before:auto}
  a[href]::after{content:""}
}
"""

JS = r"""
(function(){
var Q = window.__POOL__;
var K = "kontrola.";
function get(k,d){ try{var v=localStorage.getItem(K+k);return v?JSON.parse(v):d;}catch(e){return d;} }
function set(k,v){ try{localStorage.setItem(K+k,JSON.stringify(v));}catch(e){} }
var state = get("state", {});   /* id -> {ok:bool, note:string} */

var f = {topic:"", type:"", show:"vse", q:""};
var listEl = document.getElementById("list");
var countEl = document.getElementById("count");
var sumEl = document.getElementById("sum");

function strip(h){
  h = String(h||"")
      .replace(/<sup>(.*?)<\/sup>/gi, "^$1")
      .replace(/<sub>(.*?)<\/sub>/gi, "_$1")
      .replace(/<br\s*\/?>/gi, " ");
  var d=document.createElement("div"); d.innerHTML=h;
  return (d.textContent||"").replace(/\s+/g," ").trim();
}

function matches(it){
  if(f.topic && it.topic!==f.topic) return false;
  if(f.type && it.t!==f.type) return false;
  var st = state[it.id]||{};
  if(f.show==="neoveřeno" && st.ok) return false;
  if(f.show==="oveřeno" && !st.ok) return false;
  if(f.show==="chyby" && !(st.note&&st.note.trim())) return false;
  if(f.q){
    var hay = (strip(it.q)+" "+(it.o||[]).map(strip).join(" ")+" "+strip(it.e||"")).toLowerCase();
    if(hay.indexOf(f.q.toLowerCase())<0) return false;
  }
  return true;
}

var LET="ABCDEFGH";
function qHtml(it,idx){
  var st = state[it.id]||{};
  var cls = "qcard" + (st.note&&st.note.trim() ? " bad" : (st.ok ? " ok" : ""));
  var h = '<article class="'+cls+'" id="'+it.id+'">';
  h += '<div class="qh"><span class="qid">'+it.tn+'.'+it.bank+' &middot; #'+idx+'</span>'
     + '<span class="tag '+it.t+'">'+({single:"jedna správná",multi:"více správných",num:"číselná"}[it.t]||it.t)+'</span></div>';
  h += '<p class="qt">'+it.q+'</p>';
  if(it.t==="num"){
    var u = it.unit? (" "+it.unit) : "";
    var tol = (it.tol!==null&&it.tol!==undefined)? ("  (tolerance ±"+it.tol+")") : "";
    h += '<div class="numans">správná odpověď = '+it.ans+u+tol+'</div>';
  } else {
    var right = (it.t==="multi") ? (Array.isArray(it.c)?it.c:[it.c]) : [it.c];
    h += '<ol class="opts">';
    (it.o||[]).forEach(function(o,i){
      var ok = right.indexOf(i)>=0;
      h += '<li class="'+(ok?"right":"")+'"><span class="lt">'+LET[i]+'</span><span>'+o+'</span></li>';
    });
    h += '</ol>';
  }
  h += '<p class="exp"><b>Vysvětlení:</b> '+(it.e||"<i>chybí</i>")+'</p>';
  h += '<div class="audit">'
     + '<label><input type="checkbox" data-ok="'+it.id+'"'+(st.ok?" checked":"")+'> ověřeno</label>'
     + '<input type="text" data-note="'+it.id+'" placeholder="poznámka k chybě — co je špatně a jak to má být"'
     + ' value="'+(st.note||"").replace(/"/g,"&quot;")+'">'
     + '</div>';
  h += '</article>';
  return h;
}

var TOPICS = [];
Q.forEach(function(it){ if(TOPICS.indexOf(it.topic)<0) TOPICS.push(it.topic); });

function render(){
  var shown = Q.filter(matches);
  countEl.textContent = shown.length + " z " + Q.length + " otázek";
  if(!shown.length){ listEl.innerHTML = '<p class="empty">Nic neodpovídá filtru.</p>'; return; }
  var byTopic = {};
  shown.forEach(function(it){ (byTopic[it.topic]=byTopic[it.topic]||[]).push(it); });
  var h="";
  TOPICS.forEach(function(tp){
    var arr = byTopic[tp]; if(!arr||!arr.length) return;
    var done = arr.filter(function(x){return (state[x.id]||{}).ok;}).length;
    var bad  = arr.filter(function(x){var s=state[x.id]||{};return s.note&&s.note.trim();}).length;
    h += '<section class="tsec"><h2>'+arr[0].tn+' — '+arr[0].tt+'</h2>';
    h += '<p class="tmeta">otázek = '+arr.length+'   ·   ověřeno = '+done+'   ·   označeno jako chyba = '+bad+'</p>';
    arr.forEach(function(it,i){ h += qHtml(it,i+1); });
    h += '</section>';
  });
  listEl.innerHTML = h;
  summary();
}

function summary(){
  var ok=0,bad=0;
  Q.forEach(function(it){ var s=state[it.id]||{}; if(s.ok)ok++; if(s.note&&s.note.trim())bad++; });
  sumEl.innerHTML = 'ověřeno <b>'+ok+'</b> / '+Q.length+'   ·   chyb <b>'+bad+'</b>';
}

listEl.addEventListener("change", function(e){
  var id = e.target.getAttribute("data-ok");
  if(id){ state[id]=state[id]||{}; state[id].ok=e.target.checked; set("state",state);
    var art=document.getElementById(id);
    if(art){ var s=state[id]; art.className="qcard"+(s.note&&s.note.trim()?" bad":(s.ok?" ok":"")); }
    summary(); }
});
listEl.addEventListener("input", function(e){
  var id = e.target.getAttribute("data-note");
  if(id){ state[id]=state[id]||{}; state[id].note=e.target.value; set("state",state);
    var art=document.getElementById(id);
    if(art){ var s=state[id]; art.className="qcard"+(s.note&&s.note.trim()?" bad":(s.ok?" ok":"")); }
    summary(); }
});

/* ovládání */
document.getElementById("fTopic").addEventListener("change", function(e){ f.topic=e.target.value; render(); });
document.getElementById("fType").addEventListener("change", function(e){ f.type=e.target.value; render(); });
document.getElementById("fQ").addEventListener("input", function(e){ f.q=e.target.value; render(); });
Array.prototype.forEach.call(document.querySelectorAll("[data-show]"), function(b){
  b.addEventListener("click", function(){
    f.show=b.getAttribute("data-show");
    Array.prototype.forEach.call(document.querySelectorAll("[data-show]"), function(x){
      x.setAttribute("aria-pressed", x===b ? "true":"false"); });
    render();
  });
});

document.getElementById("exp").addEventListener("click", function(){
  var lines=["CHYBY NALEZENÉ PŘI KONTROLE OTÁZEK","vygenerováno "+new Date().toLocaleString("cs-CZ"),""];
  var n=0;
  Q.forEach(function(it){
    var s=state[it.id]||{}; if(!(s.note&&s.note.trim())) return;
    n++;
    lines.push("["+it.tn+"."+it.bank+"] "+it.topic);
    lines.push("otázka: "+strip(it.q));
    if(it.t==="num"){ lines.push("klíč: "+it.ans+(it.unit?" "+it.unit:"")); }
    else { var r=(it.t==="multi")?(Array.isArray(it.c)?it.c:[it.c]):[it.c];
      lines.push("klíč: "+r.map(function(i){return LET[i]+") "+strip(it.o[i]);}).join(" | ")); }
    lines.push("poznámka: "+s.note.trim());
    lines.push("");
  });
  if(!n) lines.push("(nic není označeno jako chyba)");
  var blob = lines.join("\n");
  var ta=document.getElementById("dump");
  ta.value=blob; ta.hidden=false; ta.select();
  try{ navigator.clipboard.writeText(blob); }catch(e){}
});

document.getElementById("reset").addEventListener("click", function(){
  if(!confirm("Opravdu smazat všechny značky „ověřeno“ i poznámky?")) return;
  state={}; set("state",state); render();
});

/* naplnit výběr témat */
var sel=document.getElementById("fTopic");
var seen={};
Q.forEach(function(it){ if(seen[it.topic])return; seen[it.topic]=1;
  var o=document.createElement("option"); o.value=it.topic; o.textContent=it.tn+" — "+it.tt; sel.appendChild(o); });

render();
})();
"""


def build():
    pool = json.load(io.open(POOL, encoding="utf-8"))
    for i, it in enumerate(pool):
        it["id"] = "q%04d" % i
        it.setdefault("t", "single")
    css = TOKENS + CSS
    h = head("Kontrola otázek — soukromý klíč",
             "Všech %d otázek se správnými odpověďmi a vysvětlením, k odborné kontrole." % len(pool),
             css)
    h += '<header class="top"><div class="top-in">'
    h += ('<a class="brand" href="../index.html"><span class="dot">Ch</span>'
          '<span>Kontrola otázek</span></a><span class="sp"></span>')
    h += '<span class="count" id="count"></span>'
    h += '<button class="btn" id="exp" type="button">Vypsat nalezené chyby</button>'
    h += '<button class="btn" id="reset" type="button">Vynulovat značky</button>'
    h += '<button class="btn pri" type="button" onclick="window.print()">Vytisknout</button>'
    h += '</div></header>\n'
    h += '<div class="wrap">'
    h += '<section class="lede"><h1>Kontrola otázek</h1>'
    h += ('<p>Všech <b>%d</b> otázek ze všech deseti okruhů na jednom místě, '
          'se správnou odpovědí a s vysvětlením tak, jak ho uvidí student. '
          'Účelem je, abyste je mohl projít jako chemik a najít, co je věcně špatně.</p>' % len(pool))
    h += ('<p>U každé otázky zaškrtněte <b>ověřeno</b>, nebo napište poznámku, co je špatně. '
          'Značky se ukládají ve vašem prohlížeči, takže se ke kontrole můžete vracet. '
          'Tlačítko <b>Vypsat nalezené chyby</b> pak udělá souhrn, který mi stačí poslat.</p>')
    h += ('<div class="warn">Tahle stránka obsahuje správné odpovědi, proto '
          '<b>není a nebude na webu</b>. Zůstává jen ve vašem počítači.</div>')
    h += '</section>\n'
    h += '<div class="controls noprint">'
    h += '<div class="row">'
    h += '<select id="fTopic" aria-label="Okruh"><option value="">všechny okruhy</option></select>'
    h += ('<select id="fType" aria-label="Typ otázky"><option value="">všechny typy</option>'
          '<option value="single">jedna správná</option>'
          '<option value="multi">více správných</option>'
          '<option value="num">číselná</option></select>')
    h += '<input type="search" id="fQ" placeholder="hledat ve znění, možnostech i vysvětlení">'
    h += '</div><div class="row">'
    h += ('<span class="seg">'
          '<button type="button" data-show="vse" aria-pressed="true">vše</button>'
          '<button type="button" data-show="neoveřeno" aria-pressed="false">ke kontrole</button>'
          '<button type="button" data-show="oveřeno" aria-pressed="false">ověřené</button>'
          '<button type="button" data-show="chyby" aria-pressed="false">označené chyby</button>'
          '</span>')
    h += '</div></div>\n'
    h += '<textarea id="dump" hidden rows="14" style="width:100%;font-family:var(--f-mono);'
    h += 'font-size:.8rem;padding:.7rem;border-radius:10px;border:1px solid var(--line-strong);'
    h += 'background:var(--surface);color:var(--ink);margin-bottom:1rem"></textarea>\n'
    h += '<div id="list"></div>'
    h += '</div>\n'
    h += '<div class="sum noprint" id="sum"></div>\n'
    h += "<script>window.__POOL__=" + json.dumps(pool, ensure_ascii=False, separators=(",", ":")) + ";</script>\n"
    h += "<script>" + JS + "</script>\n"
    h += theme_script()
    h += "</body>\n</html>\n"
    os.makedirs(OUT, exist_ok=True)
    p = os.path.join(OUT, "index.html")
    io.open(p, "w", encoding="utf-8", newline="\n").write(h)
    print("%s  %.1f KB  (%d otázek)" % (p, len(h.encode()) / 1024, len(pool)))
    return p


if __name__ == "__main__":
    build()
