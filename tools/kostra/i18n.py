# -*- coding: utf-8 -*-
"""i18n.py — přepínač CZ/EN pro menu a ovládání webu.

Obsah modulů (výklad, příklady, testy, trenažéry) se zatím nepřekládá.
Anglicky je všechno, co slouží k orientaci:
  * úvodní stránka, rozcestníky okruhů a pod-rozcestník Počítání — celé,
  * na obsahových stránkách: horní lišta, drobečková navigace, tlačítka Zpátky,
    patička, odkaz „Přeskočit na obsah“, levá lišta průvodců (kromě seznamu
    kapitol, ten je obsah), mobilní hlavička, titulek stránky,
  * texty, které za běhu píší skripty lišty (popisek motivu, potvrzení a hláška
    u Vynulovat).
Na obsahové stránce se v angličtině navíc ukáže poznámka, že obsah je česky.

    python i18n.py            # doplní přepínač a anglické popisky do obsahových stránek
    python i18n.py --check    # ověří VŠECHNY stránky; když něco chybí, skončí kódem 1

Jak to funguje
  * dvojice <lang-cs>…</lang-cs><lang-en lang="en">…</lang-en>. CSS skryje tu,
    která neodpovídá html[data-lang]; skript v <head> nastaví data-lang dřív,
    než se stránka vykreslí, takže nic neproblikne. Vlastní značky (ne <span>)
    jsou schválně: žádné CSS stránek na ně nemíří (poučení z kolizí .q a .bar).
  * volba se ukládá do localStorage "site.lang" a platí na celém webu;
    ?lang=en v adrese ji nastaví také.
  * aria-label nese anglickou verzi v data-en-aria-label, titulek stránky
    v <meta name="title-en">.
  * texty, které za běhu přepisují skripty stránek, překládá slovník LIVE.

PRAVIDLO: každý nový nebo změněný text menu a ovládání musí mít anglickou verzi.
Chybějící překlad není varování, ale chyba — generátor skončí a --check selže.
"""
import glob, html, io, json, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass
from site_data import SITE, GROUPS, PAIRS, TOPICS, ANORG_TOPICS

ROOT = r"C:\Claude Code\Claude Code\Doučovanie"


class MissingTranslation(Exception):
    pass


# ---------------------------------------------------------------- slovník
# Texty ovládání. Názvy skupin a okruhů se sem nepíšou — berou se ze site_data.py
# (pole *_en vedle české verze).
UI = {
    # horní lišta, drobečky, patička
    "Chemie": "Chemistry",
    "Úvod": "Home",
    "Zpátky na úvod": "Back to home",
    "Zpátky na okruhy": "Back to topics",
    "Zpátky na Počítání": "Back to Calculating",
    "Přeskočit na obsah": "Skip to content",
    "Drobečková navigace": "Breadcrumb",
    "Materiály fungují i bez připojení. Pokrok se ukládá ve vašem prohlížeči.":
        "The materials work offline too. Your progress is saved in your browser.",
    # úvodní stránka a rozcestníky
    "Chemie pro střední školu a přípravu na vysokou":
        "Chemistry for secondary school and university preparation",
    "Chemie, kterou si můžete osahat.": "Chemistry you can get your hands on.",
    "Kde chcete začít?": "Where do you want to start?",
    "Připravujeme": "Coming soon",
    "Moduly": "Modules",
    "Okruhy": "Topics",
    "Okruh": "Topic",
    "Otevřít okruh": "Open topic",
    "Zatím není hotové": "Not ready yet",
    "Jak je každý okruh postavený": "How each topic is built",
    "Odkud bereme osnovu": "Where the outline comes from",
    "Stránka nenalezena": "Page not found",
    # levá lišta a mobilní hlavička průvodců
    "Studijní průvodce s procvičováním": "Study guide with practice",
    "Splněno kapitol": "Chapters completed",
    "Kapitoly": "Chapters",
    "Vynulovat": "Reset",
    "Studijní průvodce · ": "Study guide · ",
    " kapitol": " chapters",
    "Pod-modul": "Sub-module",
}

# Názvy stránek, které v site_data.py nejsou: delší titulek v liště průvodce
# a krátký název v mobilní hlavičce.
PAGE_NAMES = {
    "Elektronový obal – elektronová konfigurace, stavba periodické tabulky a vlastnosti prvků":
        "Electron shells – electron configuration, structure of the periodic table "
        "and properties of the elements",
    "Rovnovážná elektrochemie": "Equilibrium electrochemistry",
    "Atomové jádro": "Atomic nucleus",
    "Elektronový obal": "Electron shells",
    "Struktura látek": "Structure of substances",
    "Termochemie": "Thermochemistry",
    "Kinetika": "Kinetics",
    "Rovnováha": "Equilibrium",
    "Elektrochemie": "Electrochemistry",
    "Výpočty rovnováh": "Equilibrium calculations",
    "Halogeny": "Halogens",
    "Jak počítat": "How to calculate",
}

# Texty, které za běhu píší skripty stránek (česky); runtime je přeloží.
LIVE = {
    "Tmavý": "Dark",
    "Světlý": "Light",
    "Přepnout režim": "Toggle theme",
    "Přepnout na světlý režim": "Switch to light mode",
    "Přepnout na tmavý režim": "Switch to dark mode",
    "Přepnout světlý a tmavý režim": "Toggle light and dark mode",
    "Opravdu vynulovat pokrok ve všech kapitolách? Nastavení motivu zůstane.":
        "Reset your progress in all chapters? Your theme setting will be kept.",
    "Pokrok vynulován.": "Progress reset.",
}

NOTE_EN = ("The content of this page is in Czech. So far, only the menus and "
           "navigation have been translated into English.")


def norm(s):
    return re.sub(r"\s+", " ", html.unescape(s).replace("\u00a0", " ")).strip()


def missing_site_data():
    """Seznam polí *_en, která v site_data.py chybějí."""
    out = []
    for k in ("name", "tagline", "lead", "group_lead"):
        if SITE.get(k) and not SITE.get(k + "_en"):
            out.append("SITE.%s_en" % k)
    for g in GROUPS:
        for k in ("title", "sub", "kicker", "cta"):
            if g.get(k) and not g.get(k + "_en"):
                out.append("GROUPS[%s].%s_en" % (g["id"], k))
    for p in PAIRS:
        for k in ("label", "note"):
            if p.get(k) and not p.get(k + "_en"):
                out.append("PAIRS[%s].%s_en" % (p["label"], k))
    for t in TOPICS + ANORG_TOPICS:
        for k in ("title", "sub"):
            if t.get(k) and not t.get(k + "_en"):
                out.append("TOPICS[%s].%s_en" % (t["slug"], k))
        if len(t.get("chips_en") or []) != len(t.get("chips") or []):
            out.append("TOPICS[%s].chips_en (%d českých, %d anglických)"
                       % (t["slug"], len(t.get("chips") or []), len(t.get("chips_en") or [])))
    return out


_DICT = None


def dictionary():
    global _DICT
    if _DICT is not None:
        return _DICT
    d = {}

    def add(cs, en):
        if cs and en:
            d[norm(cs)] = en

    for k in ("name", "tagline", "lead", "group_lead"):
        add(SITE.get(k), SITE.get(k + "_en"))
    for g in GROUPS:
        for k in ("title", "sub", "kicker", "cta"):
            add(g.get(k), g.get(k + "_en"))
    for p in PAIRS:
        for k in ("label", "note"):
            add(p.get(k), p.get(k + "_en"))
    for t in TOPICS + ANORG_TOPICS:
        for k in ("title", "sub"):
            add(t.get(k), t.get(k + "_en"))
        for c, e in zip(t.get("chips") or [], t.get("chips_en") or []):
            add(c, e)
    for src in (UI, PAGE_NAMES, LIVE):
        for cs, en in src.items():
            d[norm(cs)] = en
    _DICT = d
    return d


def tr(cs):
    """Anglická verze českého textu menu. Chybí-li, vyhodí MissingTranslation."""
    d = dictionary()
    key = norm(cs)
    if key in d:
        return d[key]
    # „Název — Chemie“ a podobné složeniny
    if " — " in key:
        return " — ".join(tr(p) for p in key.split(" — "))
    raise MissingTranslation(key)


def L(cs, en=None):
    """Dvojice CZ/EN. Bez `en` se překlad dohledá ve slovníku."""
    if en is None:
        en = tr(cs)
    if not en or not str(en).strip():
        raise MissingTranslation(norm(cs))
    # zachovat okrajové mezery („Studijní průvodce · “)
    lead = " " if cs[:1].isspace() and not en[:1].isspace() else ""
    tail = " " if cs[-1:].isspace() and not en[-1:].isspace() else ""
    return '<lang-cs>%s</lang-cs><lang-en lang="en">%s%s%s</lang-en>' % (cs, lead, en, tail)


def aria(cs, en=None):
    """aria-label s anglickou verzí pro runtime."""
    return 'aria-label="%s" data-en-aria-label="%s"' % (cs, en if en is not None else tr(cs))


def title_en(cs_title):
    return tr(cs_title)


# ---------------------------------------------------------------- runtime
LANG_CSS = """
/* SITE-LANG: dvojice CZ/EN — ukáže se jen ta, která odpovídá html[data-lang] */
html[data-lang="en"] lang-cs, html:not([data-lang="en"]) lang-en,
html:not([data-lang="en"]) [data-only="en"]{display:none!important}
.langsw{display:inline-flex;align-items:stretch;flex:none;box-sizing:border-box;height:40px;padding:3px;gap:2px;
  border-radius:10px;border:1px solid var(--line-strong);background:var(--surface)}
.langsw button{-webkit-appearance:none;appearance:none;margin:0;border:0;border-radius:7px;min-width:34px;
  padding:0 .5rem;background:transparent;color:var(--ink-2);font-family:var(--f-ui);font-weight:600;
  font-size:.74rem;line-height:1;letter-spacing:.08em;cursor:pointer;-webkit-tap-highlight-color:transparent;
  transition:background .15s,color .15s}
.langsw button:hover{background:var(--surface-2);color:var(--ink)}
html:not([data-lang="en"]) .langsw button[data-set-lang="cs"],
html[data-lang="en"] .langsw button[data-set-lang="en"]{background:var(--accent);color:var(--accent-ink)}
.topbar-row .langsw{height:44px}
/* úzký telefon: vedle Zpátky, přepínače a motivu se nevejde celý název webu, zůstane značka Ch */
@media (max-width:420px){ .bar-in .back ~ .brand > span:not(.dot){display:none} }
.langnote{margin:0;font-family:var(--f-ui);font-size:.86rem;line-height:1.5;color:var(--ink-2);
  background:var(--surface);border:1px solid var(--line-strong);border-left:4px solid var(--accent);
  border-radius:10px;padding:.6rem .9rem}
.langnote-wrap{max-width:1220px;margin:1rem auto 0;padding:0 clamp(1.1rem,4vw,3rem)}
/* průvodce: řádek nad úvodem — přepínač vpravo (na počítači), poznámka vlevo */
.langbar{display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap;gap:.8rem 1.2rem;
  padding-top:clamp(.9rem,2vw,1.4rem)}
.langbar .langnote{flex:1 1 320px}
@media (min-width:1100px){ .langbar + .hero{padding-top:clamp(1.2rem,2.4vw,2rem)} }
@media (max-width:1099px){ .langbar .langsw{display:none} html:not([data-lang="en"]) .langbar{display:none} }
"""

LANG_JS = """
/* SITE-LANG: přepínač CZ/EN pro menu a ovládání (obsah modulů zůstává česky) */
(function(){
  var D=document.documentElement, K="site.lang", LIVE=%LIVE%, REV={}, k;
  for(k in LIVE) if(Object.prototype.hasOwnProperty.call(LIVE,k)) REV[LIVE[k]]=k;
  function stored(){ try{ var v=localStorage.getItem(K); return (v==="cs"||v==="en")?v:null; }catch(e){ return null; } }
  function initial(){
    var m=/[?&]lang=(cs|en)(?:&|$)/.exec(location.search);
    if(m){ try{ localStorage.setItem(K,m[1]); }catch(e){} return m[1]; }
    return stored()||"cs";
  }
  var lang=initial(), csTitle=null;
  D.setAttribute("data-lang",lang); D.setAttribute("lang",lang);
  function tx(s){ if(s==null) return null; s=String(s); return lang==="en" ? (LIVE[s]||null) : (REV[s]||null); }
  var oc=window.confirm;
  window.confirm=function(m){ return oc.call(window,(lang==="en"&&LIVE[m])||m); };
  function liveText(el){ if(!el) return; var t=tx(el.textContent); if(t) el.textContent=t; }
  function liveAria(el){ if(!el) return; var t=tx(el.getAttribute("aria-label")); if(t) el.setAttribute("aria-label",t); }
  function apply(){
    D.setAttribute("data-lang",lang); D.setAttribute("lang",lang);
    var i, el, els=document.querySelectorAll("[data-en-aria-label]");
    for(i=0;i<els.length;i++){ el=els[i];
      if(!el.hasAttribute("data-cs-aria-label")) el.setAttribute("data-cs-aria-label",el.getAttribute("aria-label")||"");
      el.setAttribute("aria-label",el.getAttribute(lang==="en"?"data-en-aria-label":"data-cs-aria-label")); }
    var meta=document.querySelector('meta[name="title-en"]');
    if(meta){ if(csTitle===null) csTitle=document.title; document.title=(lang==="en")?meta.getAttribute("content"):csTitle; }
    liveText(document.getElementById("themeLbl")); liveText(document.getElementById("toast"));
    liveAria(document.getElementById("themeBtn")); liveAria(document.getElementById("themeBtn2"));
    els=document.querySelectorAll("[data-set-lang]");
    for(i=0;i<els.length;i++) els[i].setAttribute("aria-pressed",els[i].getAttribute("data-set-lang")===lang?"true":"false");
  }
  function set(l){ if(l!=="cs"&&l!=="en") return; lang=l; try{ localStorage.setItem(K,l); }catch(e){} apply(); }
  document.addEventListener("click",function(e){
    var b=(e.target&&e.target.closest)?e.target.closest("[data-set-lang]"):null;
    if(b) set(b.getAttribute("data-set-lang"));
  });
  function watch(){
    if(!window.MutationObserver) return;
    ["themeLbl","toast"].forEach(function(id){ var el=document.getElementById(id);
      if(el) new MutationObserver(function(){ liveText(el); }).observe(el,{childList:true,characterData:true,subtree:true}); });
    ["themeBtn","themeBtn2"].forEach(function(id){ var el=document.getElementById(id);
      if(el) new MutationObserver(function(){ liveAria(el); }).observe(el,{attributes:true,attributeFilter:["aria-label"]}); });
  }
  document.addEventListener("DOMContentLoaded",function(){ apply(); watch(); setTimeout(apply,0); });
  window.addEventListener("pageshow",function(){ var v=stored(); if(v&&v!==lang){ lang=v; apply(); } });
  window.addEventListener("storage",function(e){
    if(e.key===K&&(e.newValue==="cs"||e.newValue==="en")&&e.newValue!==lang){ lang=e.newValue; apply(); } });
})();
""".replace("%LIVE%", json.dumps(LIVE, ensure_ascii=False))


def head_block(cs_title, en_title=None):
    """Vkládá se těsně před </head>: anglický titulek, styl a skript přepínače."""
    en = en_title if en_title is not None else title_en(cs_title)
    return ('<!--SITE-LANG-->\n<meta name="title-en" content="%s">\n<style>%s</style>\n'
            '<script>%s</script>\n<!--/SITE-LANG-->\n'
            % (html.escape(en, quote=True), LANG_CSS, LANG_JS))


def toggle(marked=True):
    h = ('<div class="langsw" role="group" aria-label="Jazyk / Language">'
         '<button type="button" data-set-lang="cs" lang="cs" title="Čeština">CZ</button>'
         '<button type="button" data-set-lang="en" lang="en" title="English">EN</button></div>')
    return "<!--SL-->" + h + "<!--/SL-->" if marked else h


def note(kind):
    if kind == "rail":   # průvodce: řádek nahoře v <main>
        return ('<!--SL--><div class="langbar"><p class="langnote" data-only="en" lang="en">%s</p>%s'
                '</div><!--/SL-->' % (NOTE_EN, toggle(marked=False)))
    return ('<!--SL--><div class="langnote-wrap" data-only="en"><p class="langnote" lang="en">%s</p>'
            '</div><!--/SL-->' % NOTE_EN)


# ---------------------------------------------------------------- vkládání do stránek
PAIR_RE = re.compile(r'<lang-cs>(.*?)</lang-cs><lang-en lang="en">.*?</lang-en>', re.S)


def _unwrap(s):
    s = PAIR_RE.sub(lambda m: m.group(1), s)
    return re.sub(r' data-en-aria-label="[^"]*"', "", s)


class Page:
    def __init__(self, s):
        self.s = s
        self.missing = []
        self.failed = []

    def tr(self, cs):
        try:
            return tr(cs)
        except MissingTranslation as e:
            self.missing.append(str(e))
            return None

    def text(self, frag, pattern, label, need=1):
        """Obalí skupinu 2 vzoru (prostý text) dvojicí CZ/EN."""
        def rep(m):
            en = self.tr(m.group(2))
            if en is None:
                return m.group(0)
            return m.group(1) + L(m.group(2), en) + m.group(3)
        out, n = re.subn(pattern, rep, frag)
        if need and n < need:
            self.failed.append(label)
        return out

    def attr(self, frag, pattern, label, need=1):
        """Doplní data-en-aria-label za aria-label ze skupiny 2."""
        def rep(m):
            en = self.tr(m.group(2))
            if en is None:
                return m.group(0)
            return m.group(1) + m.group(2) + m.group(3) + ' data-en-aria-label="%s"' % en
        out, n = re.subn(pattern, rep, frag)
        if need and n < need:
            self.failed.append(label)
        return out


def _region(s, start_pat, end_pat):
    m = re.search(start_pat, s)
    if not m:
        return None
    e = re.search(end_pat, s[m.start():])
    if not e:
        return None
    return m.start(), m.start() + e.end()


def localize_html(s):
    """Vrátí (nový html, chybějící překlady, nenalezená místa). Idempotentní."""
    s = re.sub(r"<!--SITE-LANG-->.*?<!--/SITE-LANG-->\n?", "", s, flags=re.S)
    s = re.sub(r"<!--SL-->.*?<!--/SL-->(?:\n[ \t]*)?", "", s, flags=re.S)
    s = s.replace('<main id="obsah" lang="cs">', '<main id="obsah">')
    s = s.replace('<nav id="railNav" lang="cs"', '<nav id="railNav"')
    s = s.replace('<div class="chiprow" id="chipNav" lang="cs">', '<div class="chiprow" id="chipNav">')
    P = Page(s)
    kind = "rail" if '<aside class="rail">' in s else "bar" if '<header class="bar">' in s else None
    if kind is None:
        return s, [], ["neznámá kostra stránky (ani rail, ani bar)"]

    # --- lišta a hlavička: od odkazu Přeskočit po <main>
    r = _region(s, r'<a class="skip"', r'<main id="obsah">')
    if not r:
        return s, [], ["nenalezen úsek skip…<main>"]
    a, b = r
    frag = _unwrap(s[a:b])
    frag = P.text(frag, r'(<a class="skip" href="#obsah">)([^<]+)(</a>)', "skip")
    if kind == "rail":
        frag = P.text(frag, r'(<div class="sitenav"><a href="[^"]*">.*?<span>)([^<]+)(</span>)', "sitenav")
        frag = P.attr(frag, r'(<a class="sitenav-m" href="[^"]*" aria-label=")([^"]+)(")', "sitenav-m")
        frag = P.text(frag, r'(<span class="mark">)([^<]+)(</span>)', "rail mark")
        frag = P.text(frag, r'(<span class="name">)([^<]+)(</span>)', "rail name")
        frag = P.text(frag, r'(<span class="sub">)([^<]+)(</span>)', "rail sub")
        frag = P.text(frag, r'(<div class="meter-top"><span>)([^<]+)(</span>)', "meter")
        frag = P.attr(frag, r'(<nav id="railNav" aria-label=")([^"]+)(")', "railNav")
        frag = frag.replace('<nav id="railNav"', '<nav id="railNav" lang="cs"', 1)
        frag = frag.replace('<div class="chiprow" id="chipNav">', '<div class="chiprow" id="chipNav" lang="cs">', 1)
        frag = P.text(frag, r'(<span class="rs-k">)([^<]+)(</span>)', "rail-sub k", need=0)
        frag = P.text(frag, r'(<span class="rs-t">)([^<]+)(</span>)', "rail-sub t", need=0)
        frag = P.text(frag, r'(<button class="btn btn-sm" id="resetBtn" type="button">)([^<]+)(</button>)', "reset")
        frag = P.text(frag, r'(<div class="name">)([^<]+)(<span>)', "topbar name")
        frag = P.text(frag, r'(<div class="name">.*?</lang-en><span>)([^<]+)(<span id="mDone2">)', "topbar sub")
        frag = P.text(frag, r'(<span data-tot>\d*</span>)([^<]+)(</span></div>)', "topbar kapitol")
        frag, n = re.subn(r'(<button class="btn btn-icon" id="themeBtn2")',
                          lambda m: toggle() + "\n      " + m.group(1), frag, count=1)
        if not n:
            P.failed.append("přepínač v mobilní hlavičce")
    else:
        frag = P.text(frag, r'(<a class="back" href="[^"]*">.*?<span>)([^<]+)(</span></a>)', "back", need=0)
        frag = P.text(frag, r'(<a class="brand" href="[^"]*"><span class="dot">Ch</span><span>)([^<]+)(</span></a>)', "brand")
        frag = P.attr(frag, r'(<nav class="crumb" aria-label=")([^"]+)(")', "crumb", need=0)
        c = _region(frag, r'<nav class="crumb"', r'</nav>')
        if c:
            cf = frag[c[0]:c[1]]
            cf = P.text(cf, r'(<a href="[^"]*">)([^<]+)(</a>)', "crumb a", need=0)
            cf = P.text(cf, r'(<b>)([^<]+)(</b>)', "crumb b", need=0)
            frag = frag[:c[0]] + cf + frag[c[1]:]
        frag, n = re.subn(r'(<button class="iconbtn" id="themeBtn")',
                          lambda m: toggle() + "\n  " + m.group(1), frag, count=1)
        if not n:
            P.failed.append("přepínač v horní liště")
        frag, n = re.subn(r'</header>\n', lambda m: "</header>\n" + note("bar") + "\n", frag, count=1)
        if not n:
            P.failed.append("poznámka pod lištou")
    s = s[:a] + frag + s[b:]

    # --- obsah je česky
    main = '<main id="obsah" lang="cs">'
    if kind == "rail":
        main += note("rail") + "\n"
    s = s.replace('<main id="obsah">', main, 1)

    # --- patička (jen stránky s horní lištou)
    f = _region(s, r'<footer class="foot">', r'</footer>')
    if f:
        ff = _unwrap(s[f[0]:f[1]])
        ff = P.text(ff, r'(<span>)([^<]*[^\W\d_][^<]*)(</span>)', "footer", need=0)
        s = s[:f[0]] + ff + s[f[1]:]

    # --- titulek a runtime
    t = re.search(r"<title>(.*?)</title>", s, re.S)
    en_title = P.tr(t.group(1)) if t else None
    if en_title:
        s, n = re.subn(r"\n</head>", lambda m: "\n" + head_block(t.group(1), en_title) + "</head>", s, count=1)
        if not n:
            P.failed.append("</head>")
    return s, P.missing, P.failed


def content_pages():
    """Stránky, jejichž obsah zůstává česky (rozcestníky generuje make_site.py samo)."""
    out = []
    for folder, tops in (("obecna-fyzikalni-chemie", TOPICS), ("anorganicka-chemie", ANORG_TOPICS)):
        for t in tops:
            out.append(os.path.join(ROOT, folder, t["slug"] + ".html"))
    for g in GROUPS:
        sl = g.get("slug")
        if not sl or sl in ("obecna-fyzikalni-chemie", "anorganicka-chemie", "pocitani"):
            continue
        out.append(os.path.join(ROOT, *sl.split("/"), "index.html"))
    return [p for p in out if os.path.exists(p)]


def hub_pages():
    return [os.path.join(ROOT, p) for p in ("index.html", "obecna-fyzikalni-chemie/index.html",
                                            "anorganicka-chemie/index.html", "pocitani/index.html")]


def localize_all(check=False):
    ok = True
    for p in content_pages():
        s = io.open(p, encoding="utf-8").read()
        new, missing, failed = localize_html(s)
        rel = os.path.relpath(p, ROOT).replace("\\", "/")
        if missing or failed:
            ok = False
            print("  %-44s CHYBA" % rel)
            for m in sorted(set(missing)):
                print("      chybí překlad: %r" % m)
            for m in failed:
                print("      nenalezeno: %s" % m)
            continue
        if new != s and not check:
            io.open(p, "w", encoding="utf-8", newline="\n").write(new)
        print("  %-44s %s" % (rel, ("beze změny" if new == s else
                                    "%s (%+d B)" % ("změnilo by se" if check else "přeloženo",
                                                    len(new.encode()) - len(s.encode())))))
    return ok


# ---------------------------------------------------------------- kontrola
CHROME_RE = [
    r'<header class="bar">.*?</header>',
    r'<footer class="foot">.*?</footer>',
    r'<a class="skip".*?</a>',
    r'<aside class="rail">.*?</aside>',
    r'<div class="topbar-row">.*?(?=<div class="chiprow")',
]
ALLOWED = {"Ch", "CZ", "EN", "/"}


def _leftover_text(frag):
    """Český text, který nemá anglický protějšek."""
    frag = re.sub(r"<script.*?</script>|<style.*?</style>|<svg.*?</svg>|<!--.*?-->", "", frag, flags=re.S)
    frag = re.sub(r'<nav id="railNav".*?</nav>', "", frag, flags=re.S)
    frag = re.sub(r'<div class="langsw".*?</div>', "", frag, flags=re.S)
    frag = PAIR_RE.sub("", frag)
    frag = re.sub(r"<lang-en.*?</lang-en>", "", frag, flags=re.S)
    frag = re.sub(r'<(\w+)[^>]*data-only="en".*?</\1>', "", frag, flags=re.S)
    bad = []
    for chunk in re.split(r"<[^>]+>", frag):
        t = norm(chunk)
        # LIVE: text, který za běhu přeloží runtime (popisek motivu)
        if t and t not in ALLOWED and t not in LIVE and re.search(r"[^\W\d_]", t):
            bad.append(t)
    return bad


def _aria_without_en(frag):
    bad = []
    for m in re.finditer(r"<[^>]*\saria-label=\"([^\"]*)\"[^>]*>", frag):
        tag = m.group(0)
        if "data-en-aria-label" in tag or 'class="langsw"' in tag:
            continue
        if m.group(1) in LIVE:      # překládá runtime
            continue
        bad.append(m.group(1))
    return bad


def check_page(p, hub):
    s = io.open(p, encoding="utf-8").read()
    problems = []
    if "<!--SITE-LANG-->" not in s:
        problems.append("chybí runtime přepínače (SITE-LANG)")
    if 'data-set-lang="en"' not in s:
        problems.append("chybí tlačítko CZ/EN")
    m = re.search(r'<meta name="title-en" content="([^"]*)"', s)
    if not m or not m.group(1).strip():
        problems.append("chybí anglický titulek")
    if hub:
        body = s[s.find("<body"):]
        frags = [body]
    else:
        frags = []
        for pat in CHROME_RE:
            frags += re.findall(pat, s, flags=re.S)
        if '<main id="obsah" lang="cs">' not in s:
            problems.append('obsah není označený lang="cs"')
    for fr in frags:
        for t in _leftover_text(fr):
            problems.append("nepřeložený text: %r" % t[:90])
        for t in _aria_without_en(fr):
            problems.append("aria-label bez angličtiny: %r" % t)
    return problems


def check_all():
    ok = True
    miss = missing_site_data()
    if miss:
        ok = False
        print("site_data.py — chybějící anglická pole:")
        for m in miss:
            print("   ", m)
    pages = [(p, True) for p in hub_pages()] + [(p, False) for p in content_pages()]
    for p, hub in pages:
        if not os.path.exists(p):
            continue
        probs = check_page(p, hub)
        rel = os.path.relpath(p, ROOT).replace("\\", "/")
        if probs:
            ok = False
            print("  %-44s %d problémů" % (rel, len(probs)))
            for x in probs[:40]:
                print("      " + x)
        else:
            print("  %-44s OK" % rel)
    print("\nVÝSLEDEK:", "všechno přeložené" if ok else "NĚCO CHYBÍ — viz výše")
    return ok


if __name__ == "__main__":
    if "--check" in sys.argv:
        sys.exit(0 if check_all() else 1)
    miss = missing_site_data()
    if miss:
        print("site_data.py — chybějící anglická pole:", ", ".join(miss))
        sys.exit(1)
    sys.exit(0 if localize_all("--dry" in sys.argv) else 1)
