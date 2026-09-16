# -*- coding: utf-8 -*-
"""i18n.py — přepínač jazyka CZ / SK / EN pro menu a ovládání webu.

Obsah modulů (výklad, příklady, testy, trenažéry) se zatím nepřekládá.
Slovensky a anglicky je všechno, co slouží k orientaci:
  * úvodní stránka, rozcestníky okruhů a pod-rozcestník Počítání — celé,
  * na obsahových stránkách: horní lišta, drobečková navigace, tlačítka Zpátky,
    patička, odkaz „Přeskočit na obsah“, levá lišta průvodců (kromě seznamu
    kapitol, ten je obsah), mobilní hlavička, titulek stránky,
  * texty, které za běhu píší skripty lišty (popisek motivu, potvrzení a hláška
    u Vynulovat).
Na obsahové stránce se ve slovenštině a angličtině ukáže poznámka, že obsah je česky.

    python i18n.py            # doplní přepínač a překlad lišty do obsahových stránek
    python i18n.py --check    # ověří VŠECHNY stránky; když něco chybí, skončí kódem 1

Jak to funguje
  * trojice <lang-cs>…</lang-cs><lang-en lang="en">…</lang-en><lang-sk lang="sk">…</lang-sk>.
    CSS ukáže jen tu, která odpovídá html[data-lang]; skript v <head> nastaví
    data-lang dřív, než se stránka vykreslí, takže nic neproblikne. Vlastní značky
    (ne <span>) jsou schválně: žádné CSS stránek na ně nemíří (poučení z kolizí .q a .bar).
  * volba se ukládá do localStorage "site.lang" a platí na celém webu;
    ?lang=sk nebo ?lang=en v adrese ji nastaví také.
  * aria-label nese překlady v data-en-aria-label / data-sk-aria-label,
    titulek stránky v <meta name="title-en"> / <meta name="title-sk">.
  * texty, které za běhu přepisují skripty stránek, překládá slovník LIVE.

PRAVIDLO: každý nový nebo změněný text menu a ovládání musí mít verzi ve VŠECH
jazycích z LANGS. Chybějící překlad není varování, ale chyba — generátor skončí
a --check selže. Nový jazyk = přidat ho do LANGS a doplnit všude jeho texty.
"""
import html, io, json, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass
from site_data import SITE, GROUPS, PAIRS, TOPICS, ANORG_TOPICS
import brand

ROOT = r"C:\Claude Code\Claude Code\Doučovanie"

# jazyky vedle češtiny; pořadí položek v nabídce jazyků je TOGGLE
LANGS = ("en", "sk")
TOGGLE = (("cs", "CZ", "Čeština"), ("sk", "SK", "Slovenčina"), ("en", "EN", "English"))

# malé vlajky do nabídky jazyků (inline SVG — emoji vlajky Windows nevykreslí)
FLAGS = {
    "cs": ('<svg class="flag" viewBox="0 0 30 20" aria-hidden="true">'
           '<path fill="#fff" d="M0 0h30v10H0z"/><path fill="#d7141a" d="M0 10h30v10H0z"/>'
           '<path fill="#11457e" d="M0 0l15 10L0 20z"/></svg>'),
    "sk": ('<svg class="flag" viewBox="0 0 30 20" aria-hidden="true">'
           '<path fill="#fff" d="M0 0h30v6.67H0z"/><path fill="#0b4ea2" d="M0 6.67h30v6.66H0z"/>'
           '<path fill="#ee1c25" d="M0 13.33h30V20H0z"/>'
           '<path fill="#ee1c25" stroke="#fff" stroke-width=".8" d="M7.6 4.3h7.2v6.2c0 2.9-1.8 4.5-3.6 5.3-1.8-.8-3.6-2.4-3.6-5.3z"/>'
           '<path fill="#fff" d="M10.8 5.9h.8v7.3h-.8zM9.5 7.6h3.4v.8H9.5zM9.1 9.5h4.2v.8H9.1z"/>'
           '<path fill="#0b4ea2" d="M8.1 12.7c.9-.8 1.7-.8 2.3-.2.6-.7 1.5-.7 2.1 0 .6-.6 1.4-.6 2.2.2-.6 1.4-1.7 2.3-3.5 3.1-1.6-.7-2.6-1.7-3.1-3.1z"/></svg>'),
    "en": ('<svg class="flag" viewBox="0 0 60 30" preserveAspectRatio="none" aria-hidden="true">'
           '<path fill="#012169" d="M0 0h60v30H0z"/>'
           '<path stroke="#fff" stroke-width="6" d="M0 0l60 30M60 0L0 30"/>'
           '<path stroke="#c8102e" stroke-width="3" d="M0 0l60 30M60 0L0 30"/>'
           '<path stroke="#fff" stroke-width="10" d="M30 0v30M0 15h60"/>'
           '<path stroke="#c8102e" stroke-width="6" d="M30 0v30M0 15h60"/></svg>'),
}
CHEV = ('<svg class="langsw-chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5L6 8l3.5-3.5" '
        'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>')

# autor webu — řádek dole na každé stránce
AUTHOR = "Autor: Ing. Marek Kurťák"


class MissingTranslation(Exception):
    pass


# ---------------------------------------------------------------- slovník
# Texty ovládání. Názvy skupin a okruhů se sem nepíšou — berou se ze site_data.py
# (pole *_en a *_sk vedle české verze).
UI = {
    # horní lišta, drobečky, patička
    "Chemie": {"en": "Chemistry", "sk": "Chémia"},
    "Úvod": {"en": "Home", "sk": "Úvod"},
    "Zpátky na úvod": {"en": "Back to home", "sk": "Späť na úvod"},
    "Zpátky na okruhy": {"en": "Back to topics", "sk": "Späť na okruhy"},
    "Zpátky na Počítání": {"en": "Back to Calculating", "sk": "Späť na Počítanie"},
    "Přeskočit na obsah": {"en": "Skip to content", "sk": "Preskočiť na obsah"},
    "Drobečková navigace": {"en": "Breadcrumb", "sk": "Navigačná cesta"},
    "Materiály fungují i bez připojení. Pokrok se ukládá ve vašem prohlížeči.": {
        "en": "The materials work offline too. Your progress is saved in your browser.",
        "sk": "Materiály fungujú aj bez pripojenia. Pokrok sa ukladá vo vašom prehliadači."},
    # úvodní stránka a rozcestníky
    "Chemie pro střední školu a přípravu na vysokou": {
        "en": "Chemistry for secondary school and university preparation",
        "sk": "Chémia pre strednú školu a prípravu na vysokú školu"},
    "Chemie, kterou si můžete osahat.": {
        "en": "Chemistry you can get your hands on.",
        "sk": "Chémia, ktorú si môžete ohmatať."},
    "Kde chcete začít?": {"en": "Where do you want to start?", "sk": "Kde chcete začať?"},
    "Připravujeme": {"en": "Coming soon", "sk": "Pripravujeme"},
    "Moduly": {"en": "Modules", "sk": "Moduly"},
    "Okruhy": {"en": "Topics", "sk": "Okruhy"},
    "Otevřít okruh": {"en": "Open topic", "sk": "Otvoriť okruh"},
    "Zatím není hotové": {"en": "Not ready yet", "sk": "Zatiaľ nie je hotové"},
    "Jak je každý okruh postavený": {"en": "How each topic is built",
                                     "sk": "Ako je každý okruh postavený"},
    "Odkud bereme osnovu": {"en": "Where the outline comes from", "sk": "Odkiaľ berieme osnovu"},
    "Stránka nenalezena": {"en": "Page not found", "sk": "Stránka sa nenašla"},
    # levá lišta a mobilní hlavička průvodců
    "Studijní průvodce s procvičováním": {"en": "Study guide with practice",
                                          "sk": "Študijný sprievodca s precvičovaním"},
    "Splněno kapitol": {"en": "Chapters completed", "sk": "Splnené kapitoly"},
    "Kapitoly": {"en": "Chapters", "sk": "Kapitoly"},
    "Vynulovat": {"en": "Reset", "sk": "Vynulovať"},
    "Studijní průvodce · ": {"en": "Study guide · ", "sk": "Študijný sprievodca · "},
    " kapitol": {"en": " chapters", "sk": " kapitol"},
    "Pod-modul": {"en": "Sub-module", "sk": "Podmodul"},
    # autor (dole na každé stránce)
    "Autor: Ing. Marek Kurťák": {"en": "Author: Ing. Marek Kurťák", "sk": "Autor: Ing. Marek Kurťák"},
}

# Názvy stránek, které v site_data.py nejsou: delší titulek v liště průvodce
# a krátký název v mobilní hlavičce.
PAGE_NAMES = {
    "Elektronový obal – elektronová konfigurace, stavba periodické tabulky a vlastnosti prvků": {
        "en": "Electron shells – electron configuration, structure of the periodic table "
              "and properties of the elements",
        "sk": "Elektrónový obal – elektrónová konfigurácia, stavba periodickej tabuľky "
              "a vlastnosti prvkov"},
    "Rovnovážná elektrochemie": {"en": "Equilibrium electrochemistry", "sk": "Rovnovážna elektrochémia"},
    "Atomové jádro": {"en": "Atomic nucleus", "sk": "Atómové jadro"},
    "Elektronový obal": {"en": "Electron shells", "sk": "Elektrónový obal"},
    "Struktura látek": {"en": "Structure of substances", "sk": "Štruktúra látok"},
    "Termochemie": {"en": "Thermochemistry", "sk": "Termochémia"},
    "Kinetika": {"en": "Kinetics", "sk": "Kinetika"},
    "Rovnováha": {"en": "Equilibrium", "sk": "Rovnováha"},
    "Elektrochemie": {"en": "Electrochemistry", "sk": "Elektrochémia"},
    "Výpočty rovnováh": {"en": "Equilibrium calculations", "sk": "Výpočty rovnováh"},
    "Halogeny": {"en": "Halogens", "sk": "Halogény"},
    "Jak počítat": {"en": "How to calculate", "sk": "Ako počítať"},
}

# Texty, které za běhu píší skripty stránek (česky); runtime je přeloží.
LIVE = {
    "Tmavý": {"en": "Dark", "sk": "Tmavý"},
    "Světlý": {"en": "Light", "sk": "Svetlý"},
    "Přepnout režim": {"en": "Toggle theme", "sk": "Prepnúť režim"},
    "Přepnout na světlý režim": {"en": "Switch to light mode", "sk": "Prepnúť na svetlý režim"},
    "Přepnout na tmavý režim": {"en": "Switch to dark mode", "sk": "Prepnúť na tmavý režim"},
    "Přepnout světlý a tmavý režim": {"en": "Toggle light and dark mode",
                                      "sk": "Prepnúť svetlý a tmavý režim"},
    "Opravdu vynulovat pokrok ve všech kapitolách? Nastavení motivu zůstane.": {
        "en": "Reset your progress in all chapters? Your theme setting will be kept.",
        "sk": "Naozaj vynulovať pokrok vo všetkých kapitolách? Nastavenie motívu zostane."},
    "Pokrok vynulován.": {"en": "Progress reset.", "sk": "Pokrok bol vynulovaný."},
}

NOTE = {
    "en": "The content of this page is in Czech. So far, only the menus and navigation "
          "have been translated into English.",
    "sk": "Obsah tejto stránky je v češtine. Do slovenčiny sú zatiaľ preložené iba menu "
          "a navigácia.",
}


def norm(s):
    return re.sub(r"\s+", " ", html.unescape(s).replace("\u00a0", " ")).strip()


def _fields(obj, keys, where, out):
    for k in keys:
        if not obj.get(k):
            continue
        for lg in LANGS:
            if not obj.get("%s_%s" % (k, lg)):
                out.append("%s.%s_%s" % (where, k, lg))


def missing_site_data():
    """Seznam překladových polí (*_en, *_sk…), která v site_data.py chybějí."""
    out = []
    _fields(SITE, ("name", "tagline", "lead", "group_lead"), "SITE", out)
    for g in GROUPS:
        _fields(g, ("title", "sub", "kicker", "cta"), "GROUPS[%s]" % g["id"], out)
    for p in PAIRS:
        _fields(p, ("label", "note"), "PAIRS[%s]" % p["label"], out)
    for t in TOPICS + ANORG_TOPICS:
        _fields(t, ("title", "sub"), "TOPICS[%s]" % t["slug"], out)
        for lg in LANGS:
            n_cs, n_x = len(t.get("chips") or []), len(t.get("chips_" + lg) or [])
            if n_cs != n_x:
                out.append("TOPICS[%s].chips_%s (%d českých, %d přeložených)" % (t["slug"], lg, n_cs, n_x))
    for src_name, src in (("UI", UI), ("PAGE_NAMES", PAGE_NAMES), ("LIVE", LIVE), ("NOTE", {"": NOTE})):
        for cs, tr_ in src.items():
            for lg in LANGS:
                if not (tr_ or {}).get(lg):
                    out.append("i18n.%s[%r].%s" % (src_name, cs[:40], lg))
    return out


_DICT = {}


def dictionary(lang):
    if lang in _DICT:
        return _DICT[lang]
    d = {}

    def add(cs, x):
        if cs and x:
            d[norm(cs)] = x

    for k in ("name", "tagline", "lead", "group_lead"):
        add(SITE.get(k), SITE.get(k + "_" + lang))
    for g in GROUPS:
        for k in ("title", "sub", "kicker", "cta"):
            add(g.get(k), g.get(k + "_" + lang))
    for p in PAIRS:
        for k in ("label", "note"):
            add(p.get(k), p.get(k + "_" + lang))
    for t in TOPICS + ANORG_TOPICS:
        for k in ("title", "sub"):
            add(t.get(k), t.get(k + "_" + lang))
        for c, e in zip(t.get("chips") or [], t.get("chips_" + lang) or []):
            add(c, e)
    for src in (UI, PAGE_NAMES, LIVE):
        for cs, tr_ in src.items():
            add(cs, tr_.get(lang))
    _DICT[lang] = d
    return d


def tr(cs, lang):
    """Překlad českého textu menu do jazyka `lang`. Chybí-li, vyhodí MissingTranslation."""
    d = dictionary(lang)
    key = norm(cs)
    if key in d:
        return d[key]
    # „Název — Chemie“ a podobné složeniny
    if " — " in key:
        return " — ".join(tr(p, lang) for p in key.split(" — "))
    raise MissingTranslation("%s: %s" % (lang, key))


def L(cs, en=None, sk=None):
    """Trojice CZ/EN/SK. Co není zadané, dohledá se ve slovníku; chybí-li, chyba."""
    given = {"en": en, "sk": sk}
    out = "<lang-cs>%s</lang-cs>" % cs
    for lg in LANGS:
        x = given.get(lg)
        if x is None:
            x = tr(cs, lg)
        if not x or not str(x).strip():
            raise MissingTranslation("%s: %s" % (lg, norm(cs)))
        # zachovat okrajové mezery („Studijní průvodce · “)
        lead = " " if cs[:1].isspace() and not x[:1].isspace() else ""
        tail = " " if cs[-1:].isspace() and not x[-1:].isspace() else ""
        out += '<lang-%s lang="%s">%s%s%s</lang-%s>' % (lg, lg, lead, x, tail, lg)
    return out


def Lk(obj, key):
    """Trojice z pole slovníku: obj[key], obj[key_en], obj[key_sk]."""
    return L(obj[key], obj.get(key + "_en"), obj.get(key + "_sk"))


def aria(cs):
    """aria-label s překlady pro runtime."""
    return 'aria-label="%s"%s' % (cs, "".join(' data-%s-aria-label="%s"' % (lg, tr(cs, lg))
                                              for lg in LANGS))


# ---------------------------------------------------------------- runtime
def _sel_lang(lg):
    """CSS selektor html pro jazyk (čeština = žádný z ostatních)."""
    if lg == "cs":
        return "html" + "".join(':not([data-lang="%s"])' % x for x in LANGS)
    return 'html[data-lang="%s"]' % lg


LANG_CSS = """
/* SITE-LANG: přeložené texty — ukáže se jen ten, který odpovídá html[data-lang] */
%(hide)s{display:none!important}
/* nabídka jazyků: tlačítko s aktuální vlajkou a zkratkou, po klepnutí rozbalovací seznam */
.langsw{position:relative;display:inline-flex;flex:none}
.langsw-btn{-webkit-appearance:none;appearance:none;margin:0;display:inline-flex;align-items:center;gap:.42rem;
  box-sizing:border-box;height:40px;padding:0 .6rem 0 .68rem;border-radius:10px;border:1px solid var(--line-strong);
  background:var(--surface);color:var(--ink);font-family:var(--f-ui);font-weight:600;font-size:.78rem;line-height:1;
  letter-spacing:.06em;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:background .15s,border-color .15s}
.langsw-btn:hover,.langsw-btn[aria-expanded="true"]{background:var(--surface-2);border-color:var(--ink-3)}
.topbar-row .langsw-btn{height:44px}
.langsw-cur{display:inline-flex;align-items:center;gap:.42rem}
%(cur)s{display:none}
.langsw svg.flag{display:block;flex:none;width:18px;height:12px;border-radius:2px;
  box-shadow:0 0 0 1px rgba(0,0,0,.2)}
.langsw-chev{display:block;flex:none;width:11px;height:11px;color:var(--ink-3);transition:transform .15s}
.langsw-btn[aria-expanded="true"] .langsw-chev{transform:rotate(180deg)}
.langsw-menu{position:absolute;right:0;top:calc(100%% + 6px);z-index:300;display:flex;flex-direction:column;gap:2px;
  min-width:172px;padding:5px;border-radius:12px;border:1px solid var(--line-strong);background:var(--surface);
  box-shadow:0 14px 30px rgba(0,0,0,.2),0 2px 6px rgba(0,0,0,.1)}
.langsw-menu[hidden]{display:none!important}
.langsw-menu button{-webkit-appearance:none;appearance:none;margin:0;display:flex;align-items:center;gap:.62rem;
  width:100%%;min-height:42px;padding:.45rem .7rem;border:0;border-radius:8px;background:transparent;color:var(--ink);
  font-family:var(--f-ui);font-size:.88rem;font-weight:500;line-height:1.2;text-align:left;cursor:pointer}
.langsw-menu button:hover{background:var(--surface-2)}
.langsw-menu button:focus-visible{background:var(--surface-2);outline:2px solid var(--accent);outline-offset:-2px}
.langsw-code{font-weight:700;font-size:.76rem;letter-spacing:.06em}
.langsw-menu .langsw-code{min-width:1.9em}
.langsw-name{color:var(--ink-2)}
%(active)s{background:var(--accent-soft)}
%(active_after)s{content:"";margin-left:auto;width:9px;height:5px;border-left:2px solid var(--accent);
  border-bottom:2px solid var(--accent);transform:translateY(-2px) rotate(-45deg)}
@media (max-width:420px){
  /* vedle Zpátky, přepínače a motivu se nevejde celý název webu, zůstane značka Ch */
  .bar-in .back ~ .brand > span:not(.dot){display:none}
  /* název průvodce v mobilní hlavičce: raději výpustka než přetečení přes přepínač */
  .topbar-row .name{overflow:hidden}
  .topbar-row .name > lang-cs, %(name_langs)s{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
}
@media (max-width:360px){ .bar-in .brand > span:not(.dot){display:none}
  .langsw-btn .langsw-code{display:none} .langsw-btn{padding:0 .5rem} }
/* autor dole na stránce */
.authorline{margin:3.2rem 0 0;padding-top:1.1rem;border-top:1px solid var(--line);font-family:var(--f-ui);
  font-size:.84rem;color:var(--ink-3)}
.langnote{margin:0;font-family:var(--f-ui);font-size:.86rem;line-height:1.5;color:var(--ink-2);
  background:var(--surface);border:1px solid var(--line-strong);border-left:4px solid var(--accent);
  border-radius:10px;padding:.6rem .9rem}
.langnote-wrap{max-width:1220px;margin:1rem auto 0;padding:0 clamp(1.1rem,4vw,3rem)}
/* průvodce: řádek nad úvodem — přepínač vpravo (na počítači), poznámka vlevo */
.langbar{display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap;gap:.8rem 1.2rem;
  padding-top:clamp(.9rem,2vw,1.4rem)}
.langbar .langnote{flex:1 1 320px}
@media (min-width:1100px){ .langbar + .hero{padding-top:clamp(1.2rem,2.4vw,2rem)} }
@media (max-width:1099px){ .langbar .langsw{display:none} %(cs)s .langbar{display:none} }
""" % {
    "hide": ",\n".join(["%s lang-cs" % _sel_lang(lg) for lg in LANGS]
                       + ["html:not([data-lang=\"%s\"]) lang-%s" % (lg, lg) for lg in LANGS]
                       + ['%s [data-only="foreign"]' % _sel_lang("cs")]),
    "cur": ",\n".join('%s .langsw-cur:not([data-l="%s"])' % (_sel_lang(lg), lg) for lg, _, _ in TOGGLE),
    "active": ",\n".join('%s .langsw-menu button[data-set-lang="%s"]' % (_sel_lang(lg), lg)
                         for lg, _, _ in TOGGLE),
    "active_after": ",\n".join('%s .langsw-menu button[data-set-lang="%s"]::after' % (_sel_lang(lg), lg)
                               for lg, _, _ in TOGGLE),
    "name_langs": ", ".join(".topbar-row .name > lang-%s" % lg for lg in LANGS),
    "cs": _sel_lang("cs"),
}

LANG_JS = """
/* SITE-LANG: přepínač jazyka pro menu a ovládání (obsah modulů zůstává česky) */
(function(){
  var D=document.documentElement, K="site.lang", LANGS=%LANGS%, LIVE=%LIVE%, REV={}, k, g;
  for(k in LIVE) for(g in LIVE[k]) REV[LIVE[k][g]]=k;
  function ok(v){ return LANGS.indexOf(v)>=0; }
  function stored(){ try{ var v=localStorage.getItem(K); return ok(v)?v:null; }catch(e){ return null; } }
  function initial(){
    var m=/[?&]lang=([a-z]{2})(?:&|$)/.exec(location.search);
    if(m&&ok(m[1])){ try{ localStorage.setItem(K,m[1]); }catch(e){} return m[1]; }
    return stored()||"cs";
  }
  var lang=initial(), csTitle=null;
  /* stránka s obsahem v jiném jazyce (např. index.sk.html) — přesměrovat na verzi pro zvolený jazyk */
  var CL=D.getAttribute("data-content-lang")||"cs", ALT={}, al=document.querySelectorAll('link[rel="alternate"][hreflang]');
  for(k=0;k<al.length;k++) ALT[al[k].getAttribute("hreflang")]=al[k].getAttribute("href");
  function target(l){ if(l===CL) return null; if(ALT[l]) return ALT[l]; return (CL!=="cs"&&ALT.cs)?ALT.cs:null; }
  function go(l){ var t=target(l); if(t){ location.replace(t+location.hash); return true; } return false; }
  if(go(lang)) return;
  D.setAttribute("data-lang",lang); D.setAttribute("lang",lang);
  /* text psaný skriptem stránky (vždy česky) nebo už přeložený → text v aktuálním jazyce */
  function tx(s){ if(s==null) return null; s=String(s);
    var cs=LIVE[s]?s:REV[s]; if(!cs) return null;
    var t=(lang==="cs")?cs:LIVE[cs][lang]; return (t&&t!==s)?t:null; }
  var oc=window.confirm;
  window.confirm=function(m){ return oc.call(window,(lang!=="cs"&&LIVE[m]&&LIVE[m][lang])||m); };
  function liveText(el){ if(!el) return; var t=tx(el.textContent); if(t) el.textContent=t; }
  function liveAria(el){ if(!el) return; var t=tx(el.getAttribute("aria-label")); if(t) el.setAttribute("aria-label",t); }
  function apply(){
    D.setAttribute("data-lang",lang); D.setAttribute("lang",lang);
    var i, el, v, els=document.querySelectorAll("[data-en-aria-label],[data-sk-aria-label]");
    for(i=0;i<els.length;i++){ el=els[i];
      if(!el.hasAttribute("data-cs-aria-label")) el.setAttribute("data-cs-aria-label",el.getAttribute("aria-label")||"");
      v=(lang==="cs")?null:el.getAttribute("data-"+lang+"-aria-label");
      el.setAttribute("aria-label",v||el.getAttribute("data-cs-aria-label")); }
    if(csTitle===null){ var mc=document.querySelector('meta[name="title-cs"]'); csTitle=mc?mc.getAttribute("content"):document.title; }
    var meta=(lang==="cs")?null:document.querySelector('meta[name="title-'+lang+'"]');
    document.title=meta?meta.getAttribute("content"):csTitle;
    liveText(document.getElementById("themeLbl")); liveText(document.getElementById("toast"));
    liveAria(document.getElementById("themeBtn")); liveAria(document.getElementById("themeBtn2"));
    els=document.querySelectorAll("[data-set-lang]");
    for(i=0;i<els.length;i++) els[i].setAttribute("aria-checked",els[i].getAttribute("data-set-lang")===lang?"true":"false");
  }
  function set(l){ if(!ok(l)) return; lang=l; try{ localStorage.setItem(K,l); }catch(e){} if(go(l)) return; apply(); }
  /* rozbalovací nabídka jazyků */
  function open_(w,on){ if(!w) return; var b=w.querySelector(".langsw-btn"), m=w.querySelector(".langsw-menu");
    if(!b||!m) return; b.setAttribute("aria-expanded",on?"true":"false");
    if(on) m.removeAttribute("hidden"); else m.setAttribute("hidden",""); }
  function closeAll(keep){ var ws=document.querySelectorAll(".langsw"); for(var i=0;i<ws.length;i++) if(ws[i]!==keep) open_(ws[i],false); }
  function up(el,sel){ return (el&&el.closest)?el.closest(sel):null; }
  document.addEventListener("click",function(e){
    var it=up(e.target,"[data-set-lang]"), w;
    if(it){ w=up(it,".langsw"); set(it.getAttribute("data-set-lang")); closeAll(null);
      if(w&&w.querySelector(".langsw-btn")) w.querySelector(".langsw-btn").focus(); return; }
    var b=up(e.target,".langsw-btn");
    if(b){ w=up(b,".langsw"); var on=b.getAttribute("aria-expanded")!=="true"; closeAll(w); open_(w,on);
      if(on){ var c=w.querySelector('[data-set-lang="'+lang+'"]'); if(c) c.focus(); } return; }
    if(!up(e.target,".langsw")) closeAll(null);
  });
  document.addEventListener("keydown",function(e){
    var w=up(e.target,".langsw"); if(!w) return;
    var b=w.querySelector(".langsw-btn"), on=b&&b.getAttribute("aria-expanded")==="true";
    var its=[].slice.call(w.querySelectorAll("[data-set-lang]")), i=its.indexOf(document.activeElement), n=its.length;
    if(e.key==="Escape"&&on){ open_(w,false); b.focus(); e.preventDefault(); }
    else if(e.key==="ArrowDown"||e.key==="ArrowUp"){ e.preventDefault(); if(!on) open_(w,true);
      var d=(e.key==="ArrowDown")?1:n-1; its[i<0?(d===1?0:n-1):(i+d)%n].focus(); }
    else if(e.key==="Tab"&&on){ open_(w,false); }
  });
  function watch(){
    if(!window.MutationObserver) return;
    ["themeLbl","toast"].forEach(function(id){ var el=document.getElementById(id);
      if(el) new MutationObserver(function(){ liveText(el); }).observe(el,{childList:true,characterData:true,subtree:true}); });
    ["themeBtn","themeBtn2"].forEach(function(id){ var el=document.getElementById(id);
      if(el) new MutationObserver(function(){ liveAria(el); }).observe(el,{attributes:true,attributeFilter:["aria-label"]}); });
  }
  document.addEventListener("DOMContentLoaded",function(){ apply(); watch(); setTimeout(apply,0); });
  window.addEventListener("pageshow",function(){ var v=stored(); if(v&&v!==lang){ lang=v; if(!go(v)) apply(); } });
  window.addEventListener("storage",function(e){
    if(e.key===K&&ok(e.newValue)&&e.newValue!==lang){ lang=e.newValue; if(!go(lang)) apply(); } });
})();
""".replace("%LIVE%", json.dumps(LIVE, ensure_ascii=False)).replace(
    "%LANGS%", json.dumps(["cs"] + list(LANGS)))


def head_block(cs_title, titles=None, alternates=None, content_lang="cs"):
    """Vkládá se těsně před </head>: přeložené titulky, odkazy na jazykové verze obsahu,
    ikona záložky, styl a skript přepínače (odkazy musí stát před skriptem — ten podle nich přesměrovává)."""
    titles = titles or {lg: tr(cs_title, lg) for lg in LANGS}
    metas = "".join('<meta name="title-%s" content="%s">\n' % (lg, html.escape(titles[lg], quote=True))
                    for lg in LANGS)
    if content_lang != "cs":
        metas += '<meta name="title-cs" content="%s">\n' % html.escape(cs_title, quote=True)
    alts = "".join('<link rel="alternate" hreflang="%s" href="%s">\n' % (lg, href)
                   for lg, href in sorted((alternates or {}).items()))
    return ('<!--SITE-LANG-->\n%s%s%s<style>%s</style>\n<script>%s</script>\n<!--/SITE-LANG-->\n'
            % (metas, alts, brand.favicon_links(), LANG_CSS, LANG_JS))


def toggle(marked=True):
    """Nabídka jazyků. Aktuální vlajku a zkratku ukazuje CSS podle html[data-lang] (bez probliknutí)."""
    cur = "".join('<span class="langsw-cur" data-l="%s">%s<span class="langsw-code">%s</span></span>'
                  % (lg, FLAGS[lg], code) for lg, code, _ in TOGGLE)
    items = "".join('<button type="button" role="menuitemradio" aria-checked="false" data-set-lang="%s" lang="%s">'
                    '%s<span class="langsw-code">%s</span><span class="langsw-name">%s</span></button>'
                    % (lg, lg, FLAGS[lg], code, name) for lg, code, name in TOGGLE)
    h = ('<div class="langsw"><button type="button" class="langsw-btn" aria-haspopup="menu" '
         'aria-expanded="false" aria-label="Jazyk / Language" title="Jazyk / Language">%s%s</button>'
         '<span class="langsw-menu" role="menu" aria-label="Jazyk / Language" hidden>%s</span></div>'
         % (cur, CHEV, items))
    return "<!--SL-->" + h + "<!--/SL-->" if marked else h


def author_html(tag="span", cls="author"):
    return '<%s class="%s">%s</%s>' % (tag, cls, L(AUTHOR), tag)


def _note_p(extra=""):
    return ('<p class="langnote"%s>%s</p>'
            % (extra, "".join('<lang-%s lang="%s">%s</lang-%s>' % (lg, lg, NOTE[lg], lg) for lg in LANGS)))


def note(kind):
    if kind == "rail":   # průvodce: řádek nahoře v <main>
        return ('<!--SL--><div class="langbar">%s%s</div><!--/SL-->'
                % (_note_p(' data-only="foreign"'), toggle(marked=False)))
    return '<!--SL--><div class="langnote-wrap" data-only="foreign">%s</div><!--/SL-->' % _note_p()


# ---------------------------------------------------------------- vkládání do stránek
LANG_ALT = "|".join(LANGS)
GROUP_RE = re.compile(r'<lang-cs>(.*?)</lang-cs>((?:<lang-(%s) lang="\3">.*?</lang-\3>)*)' % LANG_ALT, re.S)


def _unwrap(s):
    s = GROUP_RE.sub(lambda m: m.group(1), s)
    return re.sub(r' data-(?:%s)-aria-label="[^"]*"' % LANG_ALT, "", s)


class Page:
    def __init__(self, s):
        self.s = s
        self.missing = []
        self.failed = []

    def L(self, cs):
        try:
            return L(cs)
        except MissingTranslation as e:
            self.missing.append(str(e))
            return None

    def aria(self, cs):
        try:
            return "".join(' data-%s-aria-label="%s"' % (lg, tr(cs, lg)) for lg in LANGS)
        except MissingTranslation as e:
            self.missing.append(str(e))
            return None

    def text(self, frag, pattern, label, need=1):
        """Obalí skupinu 2 vzoru (prostý text) překlady."""
        def rep(m):
            x = self.L(m.group(2))
            return m.group(0) if x is None else m.group(1) + x + m.group(3)
        out, n = re.subn(pattern, rep, frag)
        if need and n < need:
            self.failed.append(label)
        return out

    def attr(self, frag, pattern, label, need=1):
        """Doplní data-xx-aria-label za aria-label ze skupiny 2."""
        def rep(m):
            x = self.aria(m.group(2))
            return m.group(0) if x is None else m.group(1) + m.group(2) + m.group(3) + x
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


def localize_html(s, content_lang="cs", alternates=None):
    """Vrátí (nový html, chybějící překlady, nenalezená místa). Idempotentní.

    content_lang — jazyk obsahu stránky ("cs", nebo "sk" u přeložené kopie index.sk.html)
    alternates   — {"cs": "index.html", "sk": "index.sk.html"}, když existuje jazyková verze obsahu
    """
    mt = re.search(r'<meta name="title-cs" content="([^"]*)">', s)
    cs_title = html.unescape(mt.group(1)) if mt else None
    s = re.sub(r"<!--SITE-LANG-->.*?<!--/SITE-LANG-->\n?", "", s, flags=re.S)
    s = re.sub(r"<!--SL-->.*?<!--/SL-->(?:\n[ \t]*)?", "", s, flags=re.S)
    s = re.sub(r"<html\b[^>]*>", '<html lang="cs">', s, count=1)
    if cs_title is not None:
        s = re.sub(r"<title>.*?</title>", lambda m: "<title>%s</title>" % cs_title, s, count=1, flags=re.S)
    s = re.sub(r'<main id="obsah" lang="[a-z]{2}">', '<main id="obsah">', s)
    s = re.sub(r'<nav id="railNav" lang="[a-z]{2}"', '<nav id="railNav"', s)
    s = re.sub(r'<div class="chiprow" id="chipNav" lang="[a-z]{2}">', '<div class="chiprow" id="chipNav">', s)
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
        frag = frag.replace('<nav id="railNav"', '<nav id="railNav" lang="%s"' % content_lang, 1)
        frag = frag.replace('<div class="chiprow" id="chipNav">',
                            '<div class="chiprow" id="chipNav" lang="%s">' % content_lang, 1)
        frag = P.text(frag, r'(<span class="rs-k">)([^<]+)(</span>)', "rail-sub k", need=0)
        frag = P.text(frag, r'(<span class="rs-t">)([^<]+)(</span>)', "rail-sub t", need=0)
        frag = P.text(frag, r'(<button class="btn btn-sm" id="resetBtn" type="button">)([^<]+)(</button>)', "reset")
        frag = P.text(frag, r'(<div class="name">)([^<]+)(<lang-cs>|<span>)', "topbar name")
        frag = P.text(frag, r'(<div class="name">.*?</lang-sk><span>)([^<]+)(<span id="mDone2">)', "topbar sub")
        frag = P.text(frag, r'(<span data-tot>\d*</span>)([^<]+)(</span></div>)', "topbar kapitol")
        frag, n = re.subn(r'(<button class="btn btn-icon" id="themeBtn2")',
                          lambda m: toggle() + "\n      " + m.group(1), frag, count=1)
        if not n:
            P.failed.append("přepínač v mobilní hlavičce")
    else:
        frag = P.text(frag, r'(<a class="back" href="[^"]*">.*?<span>)([^<]+)(</span></a>)', "back", need=0)
        # logo: ať v liště bylo cokoli (dřív „Ch“), dosadí se aktuální z brand.py
        frag, n = re.subn(r'(<a class="brand" href="[^"]*"><span class="dot">).*?(</span><span>)',
                          lambda m: m.group(1) + brand.logo_svg() + m.group(2), frag, count=1)
        if not n:
            P.failed.append("logo v liště")
        frag = P.text(frag, r'(<a class="brand" href="[^"]*"><span class="dot"><svg class="logo".*?</svg></span><span>)([^<]+)(</span></a>)', "brand")
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
        if content_lang == "cs":
            frag, n = re.subn(r'</header>\n', lambda m: "</header>\n" + note("bar") + "\n", frag, count=1)
            if not n:
                P.failed.append("poznámka pod lištou")
    s = s[:a] + frag + s[b:]

    # --- jazyk obsahu (česky: poznámka pro cizí jazyky; přeložená kopie ji nemá)
    main = '<main id="obsah" lang="%s">' % content_lang
    if kind == "rail":
        main += (note("rail") if content_lang == "cs" else
                 "<!--SL--><div class=\"langbar\">%s</div><!--/SL-->" % toggle(marked=False)) + "\n"
    s = s.replace('<main id="obsah">', main, 1)

    # --- autor dole na stránce (průvodce nemají patičku: poslední řádek v <main>)
    if kind == "rail":
        try:
            s, n = re.subn(r"\n  </main>", lambda m: "\n  <!--SL-->%s<!--/SL-->\n  </main>"
                           % author_html("p", "authorline"), s, count=1)
            if not n:
                P.failed.append("autor před </main>")
        except MissingTranslation as e:
            P.missing.append(str(e))

    # --- patička (jen stránky s horní lištou)
    f = _region(s, r'<footer class="foot">', r'</footer>')
    if f:
        ff = _unwrap(s[f[0]:f[1]])
        ff = P.text(ff, r'(<span>)([^<]*[^\W\d_][^<]*)(</span>)', "footer", need=0)
        try:
            ff, n = re.subn(r'</span>\n  <span class="sp">', lambda m: '</span>\n  <!--SL-->%s<!--/SL-->'
                            '\n  <span class="sp">' % author_html(), ff, count=1)
            if not n:
                P.failed.append("autor v patičce")
        except MissingTranslation as e:
            P.missing.append(str(e))
        s = s[:f[0]] + ff + s[f[1]:]

    # --- titulky a runtime
    t = re.search(r"<title>(.*?)</title>", s, re.S)
    titles = {}
    if t:
        for lg in LANGS:
            try:
                titles[lg] = tr(t.group(1), lg)
            except MissingTranslation as e:
                P.missing.append(str(e))
    if t and len(titles) == len(LANGS):
        cs_t = t.group(1)
        s, n = re.subn(r"\n</head>", lambda m: "\n" + head_block(cs_t, titles, alternates, content_lang)
                       + "</head>", s, count=1)
        if not n:
            P.failed.append("</head>")
        if content_lang != "cs":
            s = re.sub(r"<title>.*?</title>", lambda m: "<title>%s</title>" % titles[content_lang], s,
                       count=1, flags=re.S)
            s = s.replace('<html lang="cs">', '<html lang="%s" data-content-lang="%s">'
                          % (content_lang, content_lang), 1)
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


def lang_sibling(p, lg):
    """Přeložená kopie obsahu vedle české stránky (index.html → index.<lg>.html)."""
    return p[:-5] + "." + lg + ".html"


def sk_sibling(p):
    return lang_sibling(p, "sk")


def page_variants():
    """[(cesta, jazyk obsahu, alternates)] — české obsahové stránky a jejich přeložené kopie."""
    out = []
    for p in content_pages():
        alts = {"cs": os.path.basename(p)}
        for lg in LANGS:
            if os.path.exists(lang_sibling(p, lg)):
                alts[lg] = os.path.basename(lang_sibling(p, lg))
        if len(alts) == 1:
            out.append((p, "cs", None))
            continue
        out.append((p, "cs", alts))
        for lg in alts:
            if lg != "cs":
                out.append((lang_sibling(p, lg), lg, alts))
    return out


def localize_all(check=False):
    ok = True
    for p, cl, alts in page_variants():
        s = io.open(p, encoding="utf-8").read()
        new, missing, failed = localize_html(s, cl, alts)
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
    r'<p class="authorline">.*?</p>',
]
ALLOWED = {"Ch", "CZ", "SK", "EN", "/"}


def _leftover_text(frag):
    """Český text, který nemá překlad."""
    frag = re.sub(r"<script.*?</script>|<style.*?</style>|<svg.*?</svg>|<!--.*?-->", "", frag, flags=re.S)
    frag = re.sub(r'<nav id="railNav".*?</nav>', "", frag, flags=re.S)
    frag = re.sub(r'<div class="langsw".*?</div>', "", frag, flags=re.S)
    frag = GROUP_RE.sub("", frag)
    frag = re.sub(r"<lang-([a-z]{2})\b.*?</lang-\1>", "", frag, flags=re.S)
    frag = re.sub(r'<(\w+)[^>]*data-only="foreign".*?</\1>', "", frag, flags=re.S)
    bad = []
    for chunk in re.split(r"<[^>]+>", frag):
        t = norm(chunk)
        # LIVE: text, který za běhu přeloží runtime (popisek motivu)
        if t and t not in ALLOWED and t not in LIVE and re.search(r"[^\W\d_]", t):
            bad.append(t)
    return bad


def _incomplete_groups(frag):
    """Česká verze, u které chybí některý jazyk."""
    bad = []
    for m in re.finditer(r'<lang-cs>(.*?)</lang-cs>((?:<lang-([a-z]{2}) lang="\3">.*?</lang-\3>)*)', frag, re.S):
        have = set(re.findall(r'<lang-([a-z]{2}) lang=', m.group(2)))
        if have != set(LANGS):
            bad.append("%s (chybí %s)" % (norm(m.group(1))[:60], ", ".join(sorted(set(LANGS) - have))))
    return bad


def _aria_untranslated(frag):
    bad = []
    for m in re.finditer(r"<[^>]*\saria-label=\"([^\"]*)\"[^>]*>", frag):
        tag = m.group(0)
        if 'langsw' in tag or m.group(1) in LIVE:   # nabídka jazyků je vícejazyčná; LIVE přeloží runtime
            continue
        miss = [lg for lg in LANGS if 'data-%s-aria-label="' % lg not in tag]
        if miss:
            bad.append("%s (chybí %s)" % (m.group(1), ", ".join(miss)))
    return bad


def check_page(p, hub):
    s = io.open(p, encoding="utf-8").read()
    problems = []
    if "<!--SITE-LANG-->" not in s:
        problems.append("chybí runtime přepínače (SITE-LANG)")
    if "Ing. Marek Kurťák" not in s:
        problems.append("chybí řádek s autorem")
    for lg, _, _ in TOGGLE:
        if 'data-set-lang="%s"' % lg not in s:
            problems.append("přepínač nemá tlačítko %s" % lg)
    for lg in LANGS:
        m = re.search(r'<meta name="title-%s" content="([^"]*)"' % lg, s)
        if not m or not m.group(1).strip():
            problems.append("chybí titulek %s" % lg)
    if hub:
        frags = [s[s.find("<body"):]]
    else:
        frags = []
        for pat in CHROME_RE:
            frags += re.findall(pat, s, flags=re.S)
        cm = re.search(r"\.([a-z]{2})\.html$", p)
        cl = cm.group(1) if cm and cm.group(1) in LANGS else "cs"
        if '<main id="obsah" lang="%s">' % cl not in s:
            problems.append('obsah není označený lang="%s"' % cl)
        if cl != "cs" and 'data-content-lang="%s"' % cl not in s:
            problems.append("přeložená kopie nemá data-content-lang")
        if cl == "cs":
            for lg in LANGS:
                if os.path.exists(lang_sibling(p, lg)) and 'hreflang="%s"' % lg not in s:
                    problems.append("česká stránka neodkazuje na verzi %s" % lg)
    for fr in frags:
        for t in _leftover_text(fr):
            problems.append("nepřeložený text: %r" % t[:90])
        for t in _incomplete_groups(fr):
            problems.append("neúplný překlad: %s" % t)
        for t in _aria_untranslated(fr):
            problems.append("aria-label bez překladu: %s" % t)
    return problems


def check_all():
    ok = True
    miss = missing_site_data()
    if miss:
        ok = False
        print("chybějící překlady v datech:")
        for m in miss:
            print("   ", m)
    pages = [(p, True) for p in hub_pages()] + [(p, False) for p, _, _ in page_variants()]
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
    print("\nVÝSLEDEK:", "všechno přeložené (%s)" % ", ".join(("cs",) + LANGS) if ok
          else "NĚCO CHYBÍ — viz výše")
    return ok


if __name__ == "__main__":
    if "--check" in sys.argv:
        sys.exit(0 if check_all() else 1)
    miss = missing_site_data()
    if miss:
        print("chybějící překlady v datech:", ", ".join(miss))
        sys.exit(1)
    sys.exit(0 if localize_all("--dry" in sys.argv) else 1)
