# -*- coding: utf-8 -*-
"""make_site.py — rozcestník webu + tlačítko Zpátky v průvodcích.

    index.html                     hlavní rozcestník (bez čísel, bez maturitních detailů)
    obecna-fyzikalni-chemie/index.html    přehled okruhů + jak se s materiály pracuje
    obecna-fyzikalni-chemie/<slug>.html   jednotlivé okruhy (generuje build.py)

    python make_site.py            # vygeneruje a upraví průvodce
    python make_site.py --check    # jen vypíše, co by udělal
"""
import io, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass
from site_data import (SITE, GROUPS, TOPICS, PREFIXES, PAIRS,
                       ANORG_TOPICS, ANORG_PREFIXES)

OUT = r"C:\Claude Code\Claude Code\Doučovanie"
SUB = os.path.join(OUT, "obecna-fyzikalni-chemie")
ANORG = os.path.join(OUT, "anorganicka-chemie")
MARK = "SITE-NAV"

TOKENS = """
:root{
  --paper:#efe8dc; --surface:#faf6ee; --surface-2:#f3ece0; --surface-3:#e8dfd0;
  --ink:#211b15; --ink-2:#5c5146; --ink-3:#8f8375;
  --line:#e0d6c6; --line-strong:#c8baa5; --grid:#e6dccb;
  --accent:#9b3320; --accent-hover:#7e2718; --accent-soft:#f6e6e0; --accent-ink:#fff7f2;
  --teal:#216f66; --teal-soft:#e1efec;
  --shadow-1:0 1px 2px rgba(33,27,21,.05), 0 2px 8px rgba(33,27,21,.05);
  --shadow-3:0 12px 24px rgba(33,27,21,.10), 0 32px 64px rgba(33,27,21,.12);
  --focus:#9b3320;
  --f-ui:"IBM Plex Sans","Segoe UI",system-ui,sans-serif;
  --f-cond:"IBM Plex Sans Condensed","IBM Plex Sans","Segoe UI",sans-serif;
  --f-body:"Source Serif 4","Georgia",serif;
  --f-mono:"IBM Plex Mono","Consolas",ui-monospace,monospace;
}
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]){
  --paper:#15110d; --surface:#1d1813; --surface-2:#251f19; --surface-3:#302921;
  --ink:#f0e8dc; --ink-2:#bfb2a1; --ink-3:#8f8376;
  --line:#332b23; --line-strong:#4a4036; --grid:#241e18;
  --accent:#e0785c; --accent-hover:#ef8c71; --accent-soft:#33201a; --accent-ink:#1a0f0a;
  --teal:#6fbfae; --teal-soft:#152b27;
  --shadow-1:0 1px 2px rgba(0,0,0,.45), 0 2px 8px rgba(0,0,0,.35);
  --shadow-3:0 12px 24px rgba(0,0,0,.55), 0 32px 64px rgba(0,0,0,.6);
  --focus:#e0785c;
} }
:root[data-theme="dark"]{
  --paper:#15110d; --surface:#1d1813; --surface-2:#251f19; --surface-3:#302921;
  --ink:#f0e8dc; --ink-2:#bfb2a1; --ink-3:#8f8376;
  --line:#332b23; --line-strong:#4a4036; --grid:#241e18;
  --accent:#e0785c; --accent-hover:#ef8c71; --accent-soft:#33201a; --accent-ink:#1a0f0a;
  --teal:#6fbfae; --teal-soft:#152b27;
  --shadow-1:0 1px 2px rgba(0,0,0,.45), 0 2px 8px rgba(0,0,0,.35);
  --shadow-3:0 12px 24px rgba(0,0,0,.55), 0 32px 64px rgba(0,0,0,.6);
  --focus:#e0785c;
}
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
@media (prefers-reduced-motion:reduce){ html{scroll-behavior:auto}
  *,*::before,*::after{animation-duration:.001ms!important;transition-duration:.001ms!important} }
body{margin:0;background:var(--paper);color:var(--ink);
  font-family:var(--f-body);font-size:17px;line-height:1.7;font-variant-numeric:oldstyle-nums;
  -webkit-font-smoothing:antialiased}
h1,h2,h3{font-family:var(--f-ui);margin:0;line-height:1.12;letter-spacing:-.03em;text-wrap:balance}
p{margin:0}
a{color:inherit}
:focus-visible{outline:3px solid var(--focus);outline-offset:3px;border-radius:4px}
.eyebrow{font-family:var(--f-cond);font-weight:600;font-size:.76rem;letter-spacing:.14em;
  text-transform:uppercase;color:var(--ink-3)}
.wrap{max-width:1220px;margin:0 auto;padding:0 clamp(1.1rem,4vw,3rem)}
.skip{position:absolute;left:-999px;top:0;z-index:100;background:var(--accent);color:var(--accent-ink);
  padding:.7rem 1rem;border-radius:0 0 8px 0;font-family:var(--f-ui);font-weight:600}
.skip:focus{left:0}
"""

CHROME = """
.bar{position:sticky;top:0;z-index:50;background:color-mix(in srgb,var(--paper) 88%,transparent);
  backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
.bar-in{display:flex;align-items:center;gap:.7rem;min-height:62px;
  max-width:1220px;margin:0 auto;padding:0 clamp(1.1rem,4vw,3rem)}
.brand{display:flex;align-items:center;gap:.6rem;text-decoration:none;font-family:var(--f-ui);
  font-weight:700;letter-spacing:-.02em;font-size:1.02rem;color:var(--ink)}
.brand .dot{width:26px;height:26px;border-radius:8px;background:var(--accent);flex:none;
  display:grid;place-items:center;color:var(--accent-ink);font-size:.78rem;font-weight:700;
  font-family:var(--f-mono);letter-spacing:0}
.bar .sp{flex:1}
.crumb{display:flex;align-items:center;gap:.5rem;font-family:var(--f-ui);font-size:.86rem;color:var(--ink-3);
  min-width:0;overflow:hidden}
.crumb a{text-decoration:none;color:var(--ink-2);white-space:nowrap}
.crumb a:hover{color:var(--accent)}
.crumb b{color:var(--ink);font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
@media (max-width:760px){ .crumb{display:none} }
.iconbtn{width:40px;height:40px;flex:none;border-radius:10px;border:1px solid var(--line-strong);
  background:var(--surface);color:var(--ink);cursor:pointer;display:grid;place-items:center;
  transition:background .15s,border-color .15s;-webkit-tap-highlight-color:transparent}
.iconbtn:hover{background:var(--surface-2);border-color:var(--ink-3)}
/* tlačítko Zpátky v horní liště */
.back{display:inline-flex;align-items:center;gap:.45rem;text-decoration:none;font-family:var(--f-ui);
  font-weight:600;font-size:.85rem;padding:0 .85rem 0 .7rem;height:40px;flex:none;border-radius:10px;
  border:1px solid var(--line-strong);background:var(--surface);color:var(--ink);
  transition:background .15s,border-color .15s,color .15s;-webkit-tap-highlight-color:transparent}
.back:hover{background:var(--accent-soft);border-color:var(--accent);color:var(--accent)}
.back svg{flex:none;transition:transform .18s}
.back:hover svg{transform:translateX(-3px)}
.bar-in .back{margin-right:.35rem;padding-right:.9rem;border-right:1px solid var(--line-strong)}
.bar-in .back + .brand{padding-left:.15rem}
@media (max-width:520px){ .back{padding:0;width:40px;justify-content:center} .back span{display:none} }
footer.foot{border-top:1px solid var(--line);margin-top:clamp(4rem,9vw,7rem);padding:2.4rem 0 3.4rem;
  background:var(--surface)}
.foot-in{display:flex;flex-wrap:wrap;gap:1rem 2rem;align-items:baseline;
  max-width:1220px;margin:0 auto;padding:0 clamp(1.1rem,4vw,3rem);
  font-family:var(--f-ui);font-size:.86rem;color:var(--ink-3)}
.foot-in .sp{flex:1;min-width:20px}
"""

TILES = """
.tiles{display:grid;gap:clamp(.85rem,1.6vw,1.15rem);margin-top:1.9rem}
.tiles.g3{grid-template-columns:repeat(auto-fit,minmax(290px,1fr))}
.tiles.g2{grid-template-columns:repeat(auto-fill,minmax(370px,1fr))}
.tile{position:relative;display:flex;flex-direction:column;gap:.7rem;
  padding:clamp(1.25rem,2.2vw,1.75rem);border:1px solid var(--line);border-radius:18px;
  background:var(--surface);text-decoration:none;color:var(--ink);overflow:hidden;
  transition:transform .22s cubic-bezier(.2,.7,.3,1),box-shadow .22s,border-color .22s}
.tile::after{content:"";position:absolute;inset:0;border-radius:18px;pointer-events:none;
  background:radial-gradient(700px 220px at 12% -30%,var(--accent-soft),transparent 70%);
  opacity:0;transition:opacity .28s}
.tile:hover{transform:translateY(-4px);box-shadow:var(--shadow-3);border-color:var(--accent)}
.tile:hover::after{opacity:1}
.tile > *{position:relative;z-index:1}
.tile .n{font-family:var(--f-mono);font-size:.8rem;font-weight:600;color:var(--accent);letter-spacing:.06em}
.tile h3{font-size:1.16rem;font-weight:700;letter-spacing:-.022em;line-height:1.25}
.tile .desc{font-family:var(--f-ui);font-size:.9rem;line-height:1.55;color:var(--ink-2)}
.tile .chips{display:flex;flex-wrap:wrap;gap:.3rem;margin-top:auto;padding-top:.65rem}
.tile .chips span{font-family:var(--f-ui);font-size:.735rem;line-height:1.35;padding:.2rem .5rem;
  border-radius:6px;background:var(--surface-2);color:var(--ink-3);border:1px solid var(--line)}
.tile .go{display:inline-flex;align-items:center;gap:.4rem;font-family:var(--f-cond);font-weight:600;
  font-size:.76rem;letter-spacing:.11em;text-transform:uppercase;color:var(--accent);margin-top:.55rem}
.tile .go svg{transition:transform .18s}
.tile:hover .go svg{transform:translateX(4px)}
.tile.soon{cursor:not-allowed;opacity:.62;border-style:dashed}
.tile.soon:hover{transform:none;box-shadow:none;border-color:var(--line-strong)}
.tile.soon:hover::after{opacity:0}
.tile.soon .go{color:var(--ink-3)}
.badge{position:absolute;top:1rem;right:1rem;z-index:2;font-family:var(--f-cond);font-weight:600;
  font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;padding:.24rem .55rem;border-radius:99px;
  background:var(--surface-3);color:var(--ink-3)}
/* ---------- dvojice: co spolu souvisí, drží pohromadě ---------- */
.pairs{display:flex;flex-direction:column;gap:clamp(1.1rem,2vw,1.7rem);margin-top:1.9rem}
.pair{border:1px solid var(--line);border-radius:22px;background:var(--surface-2);
  padding:clamp(.75rem,1.4vw,1rem)}
.pair-head{display:flex;align-items:baseline;gap:.75rem;flex-wrap:wrap;padding:.4rem .7rem .85rem}
.pair-head .pl{font-family:var(--f-cond);font-weight:600;font-size:.76rem;letter-spacing:.14em;
  text-transform:uppercase;color:var(--accent)}
.pair-head .pn{font-family:var(--f-ui);font-size:.87rem;color:var(--ink-3);line-height:1.45}
.pair-grid{display:grid;gap:.85rem;grid-template-columns:minmax(0,1fr);align-items:stretch}
.pair-conn{display:none}
@media (min-width:820px){
  .pair.two .pair-grid{grid-template-columns:minmax(0,1fr) auto minmax(0,1fr)}
  .pair.two .pair-conn{display:flex;align-items:center;justify-content:center;color:var(--ink-3);
    padding:0 .1rem}
  .pair.two .pair-conn svg{opacity:.65}
}
.pair .tile{background:var(--surface)}
.pair.one .pair-grid{grid-template-columns:minmax(0,1fr)}
.pair.three .pair-grid{grid-template-columns:minmax(0,1fr)}
@media (min-width:760px){ .pair.three .pair-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .pair.three .pair-grid > .tile:last-child{grid-column:1 / -1} }
@media (min-width:1080px){ .pair.three .pair-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
  .pair.three .pair-grid > .tile:last-child{grid-column:auto} }
.pair.three .tile.big{padding:clamp(1.15rem,2vw,1.5rem) clamp(1.2rem,2.1vw,1.6rem)}
.pair.three .tile.big .ic{width:150px;height:150px}
.pair.three .tile.big h3{font-size:clamp(1.15rem,.95rem + .7vw,1.45rem)}
@media (min-width:820px){ .pair.one .pair-grid{grid-template-columns:minmax(0,1fr) auto minmax(0,1fr)}
  .pair.one .pair-grid > :nth-child(n+2){visibility:hidden} }
.tile.big{min-height:236px}
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

.tile.big h3{font-size:clamp(1.22rem,1rem + .8vw,1.5rem);letter-spacing:-.026em}
.tile.big .desc{font-size:.92rem}
.tile.big .ic{position:absolute;right:-24px;bottom:-30px;opacity:.09;color:var(--accent);z-index:0}
.tile.big:hover .ic{opacity:.16}
"""

HERO = """
.hero{position:relative;overflow:hidden;padding:clamp(3.2rem,8vw,6.5rem) 0 clamp(2.4rem,5vw,4rem);
  border-bottom:1px solid var(--line)}
.hero.sub{padding:clamp(2.4rem,5.5vw,4.4rem) 0 clamp(2rem,4vw,3.2rem)}
.hero-bg{position:absolute;inset:0;pointer-events:none;z-index:0;
  background:
    radial-gradient(760px 340px at 78% 8%,var(--accent-soft),transparent 68%),
    radial-gradient(560px 300px at 8% 92%,var(--teal-soft),transparent 70%),
    repeating-linear-gradient(0deg,transparent 0 31px,var(--grid) 31px 32px),
    repeating-linear-gradient(90deg,transparent 0 31px,var(--grid) 31px 32px);
  -webkit-mask-image:radial-gradient(1100px 560px at 50% 26%,#000 40%,transparent 100%);
  mask-image:radial-gradient(1100px 560px at 50% 26%,#000 40%,transparent 100%)}
.hero-bg.alt{
  background:
    radial-gradient(680px 320px at 82% 16%,var(--teal-soft),transparent 66%),
    radial-gradient(520px 280px at 4% 88%,var(--accent-soft),transparent 70%),
    repeating-linear-gradient(60deg,transparent 0 33px,var(--grid) 33px 34px),
    repeating-linear-gradient(-60deg,transparent 0 33px,var(--grid) 33px 34px)}
.hero-art{position:absolute;right:clamp(-90px,-4vw,0px);top:50%;transform:translateY(-50%);
  z-index:0;color:var(--accent);opacity:.16;pointer-events:none}
.hero-art.alt{color:var(--teal);opacity:.2;right:clamp(-60px,-2vw,10px)}
@media (max-width:1000px){ .hero-art{display:none} }
.hero-in{position:relative;z-index:1;max-width:1220px;margin:0 auto;padding:0 clamp(1.1rem,4vw,3rem)}
.hero h1{font-size:clamp(2.5rem,1.2rem + 5.4vw,4.9rem);font-weight:700;letter-spacing:-.042em;
  max-width:17ch;margin:.7rem 0 0}
.hero.sub h1{font-size:clamp(2.1rem,1.2rem + 3.6vw,3.5rem)}
.hero .lead{font-size:clamp(1.02rem,.95rem + .45vw,1.24rem);color:var(--ink-2);max-width:58ch;
  margin-top:1.15rem;text-wrap:pretty}
.hero .cta{display:flex;flex-wrap:wrap;gap:.65rem;margin-top:2rem}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;font-family:var(--f-ui);
  font-size:.925rem;font-weight:600;padding:.85rem 1.4rem;min-height:50px;border-radius:12px;
  border:1px solid var(--line-strong);background:var(--surface);color:var(--ink);text-decoration:none;
  cursor:pointer;transition:background .16s,border-color .16s,transform .1s}
.btn:hover{background:var(--surface-2);border-color:var(--ink-3)}
.btn:active{transform:translateY(1px)}
.btn-primary{background:var(--accent);border-color:var(--accent);color:var(--accent-ink);
  box-shadow:0 6px 18px color-mix(in srgb,var(--accent) 26%,transparent)}
.btn-primary:hover{background:var(--accent-hover);border-color:var(--accent-hover)}
.btn svg{transition:transform .18s}
.btn:hover svg{transform:translateX(3px)}
.sec{padding:clamp(2.6rem,5.5vw,4.2rem) 0 0}
.sec-head{display:flex;align-items:baseline;gap:1rem;flex-wrap:wrap}
.sec-head h2{font-size:clamp(1.4rem,1.1rem + 1.3vw,1.95rem);font-weight:700}
.sec > p.intro{font-family:var(--f-ui);font-size:.98rem;color:var(--ink-2);max-width:62ch;margin-top:.6rem}
.how{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));margin-top:1.5rem}
.how-c{position:relative;border:1px solid var(--line);border-radius:14px;background:var(--surface);
  padding:1.15rem 1.3rem;display:flex;flex-direction:column;gap:.5rem;overflow:hidden}
.how-c::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--accent);
  opacity:.55}
.how-c .ic{width:32px;height:32px;border-radius:9px;background:var(--accent-soft);color:var(--accent);
  display:grid;place-items:center;flex:none;font-family:var(--f-mono);font-weight:600;font-size:.9rem}
.how-c h3{font-size:1.02rem;font-weight:600;letter-spacing:-.015em}
.how-c p{font-family:var(--f-ui);font-size:.88rem;line-height:1.55;color:var(--ink-2)}
"""

SUN = ('<svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">'
       '<circle cx="12" cy="12" r="4.4" fill="currentColor"/>'
       '<g stroke="currentColor" stroke-width="2" stroke-linecap="round">'
       '<path d="M12 2.4v2.4M12 19.2v2.4M2.4 12h2.4M19.2 12h2.4M5.2 5.2l1.7 1.7M17.1 17.1l1.7 1.7'
       'M18.8 5.2l-1.7 1.7M6.9 17.1l-1.7 1.7"/></g></svg>')
MOON = ('<svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">'
        '<path d="M20 14.2A8.4 8.4 0 0 1 9.8 4 8.4 8.4 0 1 0 20 14.2z" fill="currentColor"/></svg>')
ARR = ('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
       'stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
       '<path d="M5 12h13M12.5 5.5L19 12l-6.5 6.5"/></svg>')
ARL = ('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
       'stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
       '<path d="M19 12H6M11.5 5.5L5 12l6.5 6.5"/></svg>')

THEME_JS = """
(function(){
  var KEYS=%KEYS%;
  var SUN=%SUN%, MOON=%MOON%;
  function cur(){var a=document.documentElement.getAttribute("data-theme");
    if(a)return a;
    try{var v=localStorage.getItem("site.theme");if(v)return JSON.parse(v);}catch(e){}
    return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}
  function save(t){try{localStorage.setItem("site.theme",JSON.stringify(t));
    KEYS.forEach(function(k){localStorage.setItem(k+".theme",JSON.stringify(t));});}catch(e){}}
  function paint(){var d=cur()==="dark";var b=document.getElementById("themeBtn");
    if(b){b.innerHTML=d?SUN:MOON;
      b.setAttribute("aria-label",d?"Přepnout na světlý režim":"Přepnout na tmavý režim");}}
  try{var s=localStorage.getItem("site.theme");
    if(s) document.documentElement.setAttribute("data-theme",JSON.parse(s));}catch(e){}
  document.addEventListener("DOMContentLoaded",function(){
    paint();
    var b=document.getElementById("themeBtn");
    if(b) b.addEventListener("click",function(){
      var n=cur()==="dark"?"light":"dark";
      document.documentElement.setAttribute("data-theme",n); save(n); paint();
    });
  });
})();
"""


def head(title, desc, css):
    return """<!doctype html>
<html lang="cs">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="%s">
<meta name="color-scheme" content="light dark">
<title>%s</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans+Condensed:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&display=swap">
<style>%s</style>
</head>
<body>
<a class="skip" href="#obsah">Přeskočit na obsah</a>
""" % (desc.replace('"', "&quot;"), title, css)


def theme_script():
    js = (THEME_JS.replace("%KEYS%", repr(PREFIXES + ANORG_PREFIXES).replace("'", '"'))
                  .replace("%SUN%", '"%s"' % SUN.replace('"', '\\"'))
                  .replace("%MOON%", '"%s"' % MOON.replace('"', '\\"')))
    return "<script>%s</script>\n</body>\n</html>\n" % js


def topbar(home, crumb_html="", back=None):
    b = ('<a class="back" href="%s">%s<span>%s</span></a>' % (back[0], ARL, back[1])) if back else ""
    return """<header class="bar"><div class="bar-in">
  %s<a class="brand" href="%s"><span class="dot">Ch</span><span>%s</span></a>
  <span class="sp"></span>
  %s
  <button class="iconbtn" id="themeBtn" type="button" aria-label="Přepnout režim"></button>
</div></header>
""" % (b, home, SITE["name"], crumb_html)


def foot():
    return """<footer class="foot"><div class="foot-in">
  <span>%s — %s</span>
  <span class="sp"></span>
  <span>Materiály fungují i bez připojení. Pokrok se ukládá ve vašem prohlížeči.</span>
</div></footer>
""" % (SITE["name"], SITE["tagline"])


ICONS = {
 "okruhy": '<circle cx="50" cy="50" r="7" fill="currentColor" stroke="none"/>'
           '<ellipse cx="50" cy="50" rx="42" ry="16"/>'
           '<ellipse cx="50" cy="50" rx="42" ry="16" transform="rotate(60 50 50)"/>'
           '<ellipse cx="50" cy="50" rx="42" ry="16" transform="rotate(120 50 50)"/>',
 "pocty":  '<path d="M18 50h64"/>'
           '<text x="50" y="40" text-anchor="middle" font-size="24" font-family="serif" '
           'font-style="italic" fill="currentColor" stroke="none">m</text>'
           '<text x="50" y="80" text-anchor="middle" font-size="24" font-family="serif" '
           'font-style="italic" fill="currentColor" stroke="none">M·V</text>',
 "spolu":  '<rect x="10" y="18" width="32" height="22" rx="4"/>'
           '<rect x="58" y="18" width="32" height="22" rx="4"/>'
           '<rect x="34" y="62" width="32" height="22" rx="4"/>'
           '<path d="M26 40v9h48v-9M50 49v13"/>',
 "test":   '<rect x="24" y="10" width="52" height="80" rx="6"/>'
           '<path d="M36 32h28M36 46h28M36 60h16"/>'
           '<path d="M58 68l7 7 15-17" stroke-width="3"/>',
 "tabulka":'<rect x="8" y="26" width="84" height="48" rx="4"/>'
           '<path d="M8 42h84M8 58h84M26 26v48M44 26v48M62 26v48M80 26v48"/>'
           '<rect x="8" y="26" width="18" height="16" rx="3" fill="currentColor" stroke="none"/>',
 "anorganika":'<path d="M40 12h20M44 12v26L22 74a7 7 0 006 11h44a7 7 0 006-11L56 38V12"/>'
           '<path d="M31 58h42"/>'
           '<circle cx="43" cy="68" r="4.5" fill="currentColor" stroke="none"/>'
           '<circle cx="58" cy="72" r="3" fill="currentColor" stroke="none"/>'
           '<circle cx="52" cy="63" r="2.2" fill="currentColor" stroke="none"/>',
 "zlomky": '<path d="M30 20c-9 8-13 18-13 30s4 22 13 30"/>'
           '<path d="M70 20c9 8 13 18 13 30s-4 22-13 30"/>'
           '<path d="M34 50h32" stroke-width="2.6"/>'
           '<circle cx="50" cy="37" r="4.5" fill="currentColor" stroke="none"/>'
           '<circle cx="50" cy="63" r="4.5" fill="currentColor" stroke="none"/>',
 "nazvo":  '<rect x="10" y="34" width="38" height="32" rx="6"/>'
           '<rect x="52" y="34" width="38" height="32" rx="6"/>'
           '<path d="M48 50h4" stroke-width="2.4"/>'
           '<path d="M20 44h18M20 56h12"/>'
           '<path d="M62 44h18M62 56h12"/>'
           '<path d="M50 20v8M50 72v8"/>',
 "priklady":'<rect x="14" y="20" width="72" height="60" rx="5"/><path d="M50 20v60"/>'
           '<path d="M24 36h16M24 48h16M24 60h10M60 36h16M60 48h16M60 60h10"/>',
}

def group_icon(kind):
    return ('<svg class="ic" width="210" height="210" viewBox="0 0 100 100" fill="none" '
            'stroke="currentColor" stroke-width="1.7" stroke-linecap="round" '
            'stroke-linejoin="round" aria-hidden="true">%s</svg>' % ICONS.get(kind, ICONS["okruhy"]))


CONN = ('<span class="pair-conn" aria-hidden="true">'
        '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
        'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
        '<path d="M4 12h14" stroke-dasharray="2.6 3"/><path d="M13.5 6.5L20 12l-6.5 5.5"/>'
        '</svg></span>')


BIG_IC = ('<svg class="ic" width="230" height="230" viewBox="0 0 100 100" fill="none" '
          'stroke="currentColor" stroke-width="1.6" aria-hidden="true">'
          '<circle cx="50" cy="50" r="7.5" fill="currentColor" stroke="none"/>'
          '<ellipse cx="50" cy="50" rx="42" ry="16"/>'
          '<ellipse cx="50" cy="50" rx="42" ry="16" transform="rotate(60 50 50)"/>'
          '<ellipse cx="50" cy="50" rx="42" ry="16" transform="rotate(120 50 50)"/></svg>')

# hlavní stránka — atom s orbitaly
HERO_ART = ('<svg class="hero-art" width="470" height="470" viewBox="0 0 100 100" fill="none" '
            'stroke="currentColor" stroke-width="0.7" aria-hidden="true">'
            '<circle cx="50" cy="50" r="5" fill="currentColor" stroke="none"/>'
            '<ellipse cx="50" cy="50" rx="46" ry="17"/>'
            '<ellipse cx="50" cy="50" rx="46" ry="17" transform="rotate(60 50 50)"/>'
            '<ellipse cx="50" cy="50" rx="46" ry="17" transform="rotate(120 50 50)"/>'
            '<circle cx="96" cy="50" r="2.6" fill="currentColor" stroke="none"/>'
            '<circle cx="27" cy="10.2" r="2.6" fill="currentColor" stroke="none"/>'
            '<circle cx="27" cy="89.8" r="2.6" fill="currentColor" stroke="none"/></svg>')


def hexagon(cx, cy, r):
    import math
    pts = []
    for i in range(6):
        a = math.radians(60 * i - 30)
        pts.append("%.2f,%.2f" % (cx + r * math.cos(a), cy + r * math.sin(a)))
    return '<polygon points="%s"/>' % " ".join(pts)


def build_hex_art():
    """Šestiúhelníková mřížka (benzenová plástev) pro podstránku okruhů."""
    import math
    r = 15.0
    dx = r * math.sqrt(3)
    dy = r * 1.5
    cells = []
    for row in range(-1, 5):
        for col in range(-1, 5):
            cx = 12 + col * dx + (dx / 2 if row % 2 else 0)
            cy = 10 + row * dy
            if -20 < cx < 180 and -20 < cy < 180:
                cells.append(hexagon(cx, cy, r))
    inner = "".join(cells)
    # dva zvýrazněné kruhy = delokalizované elektrony
    inner += ('<circle cx="%.1f" cy="%.1f" r="7.6" stroke-dasharray="2.6 3.4"/>'
              % (12 + 1 * dx + dx / 2, 10 + 1 * dy))
    inner += ('<circle cx="%.1f" cy="%.1f" r="7.6" stroke-dasharray="2.6 3.4"/>'
              % (12 + 3 * dx, 10 + 2 * dy))
    return ('<svg class="hero-art alt" width="430" height="430" viewBox="0 0 160 160" fill="none" '
            'stroke="currentColor" stroke-width="0.9" stroke-linejoin="round" aria-hidden="true">'
            + inner + '</svg>')


def build_index():
    css = TOKENS + CHROME + TILES + HERO
    h = head(SITE["name"] + " — " + SITE["tagline"], SITE["lead"], css)
    h += topbar("index.html")
    h += '<main id="obsah">\n'
    h += '<section class="hero"><div class="hero-bg"></div>' + HERO_ART + '<div class="hero-in">'
    h += '<span class="eyebrow">Chemie pro střední školu a přípravu na vysokou</span>'
    h += '<h1>Chemie, kterou si můžete osahat.</h1>'
    h += '<p class="lead">%s</p>' % SITE["lead"]
    h += ('<div class="cta">'
          '<a class="btn btn-primary" href="obecna-fyzikalni-chemie/index.html">Obecná a fyzikální chemie %s</a>'
          '</div>' % ARR)
    h += '</div></section>\n'
    h += ('<div class="wrap"><section class="sec">'
          '<div class="sec-head"><h2>Kde chcete začít?</h2></div><div class="pairs">')
    by_id = {g["id"]: g for g in GROUPS}
    for pr in PAIRS:
        items = [by_id[i] for i in pr["items"] if i in by_id]
        if not items:
            continue
        h += '<section class="pair %s">' % {1: "one", 2: "two", 3: "three"}.get(len(items), "two")
        h += '<div class="pair-head"><span class="pl">%s</span>' % pr["label"]
        if pr.get("note"):
            h += '<span class="pn">%s</span>' % pr["note"]
        h += '</div><div class="pair-grid">'
        for k, g in enumerate(items):
            if k and pr.get("flow", True):
                h += CONN
            elif k:
                h += '<span class="pair-conn" aria-hidden="true"></span>' 
            if g["state"] == "ready":
                h += ('<a class="tile big" href="%s/index.html">%s'
                      '<span class="n">%s</span><h3>%s</h3><p class="desc">%s</p>'
                      '<span class="go">%s %s</span></a>'
                      % (g["slug"], group_icon(g.get("icon", "okruhy")), g["kicker"],
                         g["title"], g["sub"], g["cta"], ARR))
            else:
                h += ('<div class="tile big soon"><span class="badge">Připravujeme</span>%s'
                      '<span class="n">%s</span><h3>%s</h3><p class="desc">%s</p>'
                      '<span class="go">%s</span></div>'
                      % (group_icon(g.get("icon", "okruhy")), g["kicker"],
                         g["title"], g["sub"], g["cta"]))
        h += '</div></section>'
    h += '</div></section></div>\n'
    h += '</main>\n' + foot() + theme_script()
    return h


HUBS = {
    "pocitani": {
        "title": "Počítání",
        "eyebrow": "Tři moduly · od zápisu k procvičení",
        "desc": "Počítání v chemii: jak výpočet zapsat, jak zacházet se zlomky "
                "a závorkami a jak si ho natrénovat na úlohách.",
        "lead": "Tři moduly, které na sebe navazují. Nejdřív se naučte, jak výpočet "
                "zapsat a odvodit. Když vás na tom zdrží zlomky a závorky, je na ně "
                "samostatný modul. A nakonec si celý postup natrénujte na úlohách, "
                "kde skládáte vztahy vy.",
        "items": ["pocitat", "zlomky", "spolu"],
    },
}


def build_hub(slug):
    cfg = HUBS[slug]
    by_id = {g["id"]: g for g in GROUPS}
    css = TOKENS + CHROME + TILES + HERO
    h = head(cfg["title"] + " \u2014 " + SITE["name"], cfg["desc"], css)
    h += topbar("../index.html",
                '<nav class="crumb" aria-label="Drobečková navigace">'
                '<a href="../index.html">Úvod</a><span>/</span><b>%s</b></nav>' % cfg["title"],
                back=("../index.html", "Zpátky na úvod"))
    h += '<main id="obsah">\n'
    h += ('<section class="hero sub"><div class="hero-bg alt"></div>' + build_hex_art()
          + '<div class="hero-in">')
    h += '<span class="eyebrow">%s</span>' % cfg["eyebrow"]
    h += '<h1>%s</h1>' % cfg["title"]
    h += '<p class="lead">%s</p>' % cfg["lead"]
    h += '</div></section>\n'
    h += '<div class="wrap"><section class="sec">'
    h += '<div class="sec-head"><h2>Moduly</h2></div><div class="tiles g2 hubtiles">'
    for i in cfg["items"]:
        g = by_id.get(i)
        if not g:
            continue
        href = "../" + g["slug"] + "/index.html"
        h += ('<a class="tile big" href="%s">%s<span class="n">%s</span>'
              '<h3>%s</h3><p class="desc">%s</p><span class="go">%s %s</span></a>'
              % (href, group_icon(g.get("icon", "pocty")), g["kicker"],
                 g["title"], g["sub"], g["cta"], ARR))
    h += '</div></section></div></main>\n' + foot() + theme_script()
    return h


GROUP_PAGES = {
    "obecna-fyzikalni-chemie": {
        "title": "Obecná a fyzikální chemie",
        "eyebrow": "Deset okruhů \u00b7 podle školní osnovy",
        "desc": "Obecná a fyzikální chemie: atomové jádro, elektronový obal, chemická vazba, "
                "struktura látek, termochemie, kinetika, rovnováha, elektrochemie, "
                "acidobazické reakce a výpočty.",
        "lead": SITE.get("group_lead", SITE["lead"]),
        "topics": TOPICS,
        "credit": None,
    },
    "anorganicka-chemie": {
        "title": "Anorganická chemie",
        "eyebrow": "Devět okruhů \u00b7 popisná chemie prvků",
        "desc": "Anorganická chemie: vodík a voda, halogeny, chalkogeny, dusík a fosfor, "
                "uhlík a křemík, kovy, koordinační sloučeniny a přechodné prvky.",
        "lead": "Devět okruhů popisné chemie. U každé skupiny prvků jdeme stejnou cestou: "
                "co plyne z postavení v periodické tabulce, jak vypadá prvek samotný, "
                "jaké tvoří sloučeniny, jak se vyrábí a k čemu se používá.",
        "topics": ANORG_TOPICS,
        "credit": ("Členění a pořadí výkladu v tomto modulu sleduje učebnici "
                   "<b>Klikorka J., Hájek B., Votinský J.: Obecná a anorganická chemie</b>, "
                   "2. vydání, SNTL, Praha 1989. Výklad, příklady, obrázky i testy jsou "
                   "původní a všechna data jsou ověřená proti současným tabulkám."),
    },
}


def build_group(slug, found):
    cfg = GROUP_PAGES[slug]
    css = TOKENS + CHROME + TILES + HERO + GROUP_CSS
    h = head(cfg["title"] + " \u2014 " + SITE["name"], cfg["desc"], css)
    h += topbar("../index.html",
                '<nav class="crumb" aria-label="Drobečková navigace">'
                '<a href="../index.html">Úvod</a><span>/</span><b>%s</b></nav>' % cfg["title"],
                back=("../index.html", "Zpátky na úvod"))
    h += '<main id="obsah">\n'
    h += ('<section class="hero sub"><div class="hero-bg alt"></div>' + build_hex_art()
          + '<div class="hero-in">')
    h += '<span class="eyebrow">%s</span>' % cfg["eyebrow"]
    h += '<h1>%s</h1>' % cfg["title"]
    h += '<p class="lead">%s</p>' % cfg["lead"]
    h += '</div></section>\n'
    h += '<div class="wrap">'
    h += '<section class="sec"><div class="sec-head"><h2>Jak je každý okruh postavený</h2></div>'
    cards = [
        ("1", "Rychlokurz na hodinu",
         "Celá látka v kostce: výklad, rámeček se vzorci, upozornění na častou chybu a řešený "
         "příklad s čísly. Na konci osm vět, které musíte umět odříkat, a kontrolní test."),
        ("2", "Plný kurz s modely",
         "Podrobný výklad rozdělený do kapitol. V každé je interaktivní model, se kterým si "
         "můžete pohrát, řešené příklady krok za krokem a test s vysvětlením u každé otázky."),
        ("3", "Tahák a slovníček",
         "Na konci každého okruhu je tahák na jednu obrazovku a slovníček všech pojmů z osnovy. "
         "Pokrok v kapitolách se ukládá ve vašem prohlížeči."),
    ]
    h += '<div class="how">'
    for ic, t, p in cards:
        h += '<div class="how-c"><span class="ic">%s</span><h3>%s</h3><p>%s</p></div>' % (ic, t, p)
    h += '</div></section>\n'
    h += '<section class="sec"><div class="sec-head"><h2>Okruhy</h2></div><div class="tiles g2">'
    for t in cfg["topics"]:
        chips = "".join("<span>%s</span>" % c for c in t["chips"])
        if t["slug"] in found:
            h += ('<a class="tile" href="%s.html"><span class="n">Okruh %s</span>'
                  '<h3>%s</h3><p class="desc">%s</p><span class="chips">%s</span>'
                  '<span class="go">Otevřít okruh %s</span></a>'
                  % (t["slug"], t["n"], t["title"], t["sub"], chips, ARR))
        else:
            h += ('<div class="tile soon"><span class="badge">Připravujeme</span>'
                  '<span class="n">Okruh %s</span><h3>%s</h3><p class="desc">%s</p>'
                  '<span class="chips">%s</span>'
                  '<span class="go">Zatím není hotové</span></div>'
                  % (t["n"], t["title"], t["sub"], chips))
    h += '</div></section>\n'
    if cfg.get("credit"):
        h += ('<section class="sec"><div class="credit">'
              '<span class="eyebrow">Odkud bereme osnovu</span><p>%s</p></div></section>\n'
              % cfg["credit"])
    h += '</div></main>\n' + foot() + theme_script()
    return h


GROUP_CSS = """
.credit{border:2px solid var(--line-strong);border-top:4px solid var(--accent);
  border-radius:16px;padding:clamp(1.2rem,2.2vw,1.6rem) clamp(1.3rem,2.4vw,1.8rem);
  background:var(--surface);box-shadow:0 1px 2px rgba(33,27,21,.07),0 6px 16px rgba(33,27,21,.09)}
.credit p{margin:.5rem 0 0;max-width:82ch;color:var(--ink-2);font-size:.95rem;line-height:1.65}
.credit b{color:var(--ink-1)}
"""


NAV_CSS = """
/* ---- %s: propojení s rozcestníkem ---- */
.sitenav{display:flex;padding:0 .45rem .2rem}
.sitenav a{display:inline-flex;align-items:center;gap:.45rem;width:100%%;
  font-family:var(--f-ui);font-weight:600;font-size:.83rem;text-decoration:none;
  padding:.5rem .7rem;min-height:40px;border-radius:9px;border:1px solid var(--line-strong);
  background:var(--surface-2);color:var(--ink-2);transition:background .15s,color .15s,border-color .15s}
.sitenav a:hover{background:var(--accent-soft);border-color:var(--accent);color:var(--accent)}
.sitenav svg{flex:none;transition:transform .18s}
.sitenav a:hover svg{transform:translateX(-3px)}
.sitenav-m{display:none}
@media (max-width:1099px){
  .sitenav-m{display:inline-flex;align-items:center;justify-content:center;width:40px;min-height:40px;
    flex:none;border-radius:9px;border:1px solid var(--line-strong);background:var(--surface-2);
    color:var(--ink-2);text-decoration:none}
  .sitenav-m:hover{background:var(--accent-soft);border-color:var(--accent);color:var(--accent)}
}

/* ---- levá lišta: ovládání nad seznam kapitol ---- */
.rail{justify-content:flex-start}
.rail .sitenav{order:0}
.rail .rail-brand{order:1}
.rail .rail-tools{order:2;margin-top:0;padding-bottom:.15rem}
.rail .meter{order:3;padding-top:0}
.rail nav{order:4}
.rail .rail-tools .btn{flex:1;justify-content:center}

/* ---- dlouhá rovnice se na úzkém displeji smí zalomit ---- */
/* .chem má nowrap, což je správně pro jeden vzorec, ale ne pro celou rovnici.
   Zalomí se jen v mezerách (kolem „+“ a „→“); vzorce mezery nemají, takže
   se nikdy nerozlomí uprostřed. */
@media (max-width:640px){ .chem{white-space:normal} }
/* ---- hlavička řešeného příkladu se na mobilu ořezávala ---- */
/* .worked-head je flex bez zalomení a štítek má flex:none, takže dlouhý
   titulek přetekl mimo rámeček a konec se uřízl. */
.worked-head{flex-wrap:wrap}
.worked-head > *{min-width:0}
.worked-head p{overflow-wrap:anywhere}
/* štítek měl flex:none, takže se nesmrskl a dlouhý název příkladu přetekl */
.worked-head .eyebrow{flex:0 1 auto;overflow-wrap:anywhere}
/* ---- oprava „osmi vět“: grid trhal větu s <span> na jednotlivé buňky ---- */
.eight li{display:block!important;position:relative;grid-template-columns:none!important;
  padding:.8rem 1rem .8rem 3.4rem!important;line-height:1.6}
.eight li::before{position:absolute;left:.95rem;top:.78rem;margin:0}

/* ---- testy a mini-testy: ať je student nepřehlédne ---- */
.quiz{border:2px solid var(--accent);border-radius:16px;box-shadow:var(--shadow-2)}
.quiz .quiz-toggle{min-height:70px;gap:.65rem;
  background:linear-gradient(180deg,var(--accent-soft),color-mix(in srgb,var(--accent-soft) 45%%,var(--surface)))}
.quiz .quiz-toggle:hover{background:var(--accent-soft)}
.quiz .qt-title{font-size:1.1rem;font-weight:700;letter-spacing:-.016em}
.quiz .quiz-toggle > .tag{background:var(--accent);color:var(--accent-ink)}
.quiz .qt-meta{color:var(--ink-2)}
.quiz .chev{order:3;color:var(--accent)}
.quiz .quiz-toggle::after{
  content:"Spustit test";order:2;flex:none;font-family:var(--f-ui);font-weight:600;font-size:.83rem;
  line-height:1;padding:.6rem .9rem;border-radius:9px;white-space:nowrap;
  background:var(--accent);color:var(--accent-ink);border:1px solid var(--accent)}
.quiz.open .quiz-toggle::after{content:"Skrýt test";background:transparent;color:var(--accent)}
.quiz[data-final="1"]{border-width:3px}
.quiz[data-final="1"] .quiz-toggle{min-height:84px}
.quiz[data-final="1"] .qt-title{font-size:1.26rem}
@media (max-width:620px){
  .quiz .quiz-toggle::after{order:4;width:100%%;text-align:center}
}
""" % MARK

NAV_JS = """
/* %s — sjednocení světlého a tmavého režimu napříč webem */
(function(){
  var KEYS=%s;
  function mirror(){
    try{
      var t=document.documentElement.getAttribute("data-theme");
      if(!t) return;
      localStorage.setItem("site.theme",JSON.stringify(t));
      KEYS.forEach(function(k){ localStorage.setItem(k+".theme",JSON.stringify(t)); });
    }catch(e){}
  }
  ["themeBtn","themeBtn2"].forEach(function(id){
    var b=document.getElementById(id);
    if(b) b.addEventListener("click",function(){ setTimeout(mirror,0); });
  });
})();
""" % (MARK, repr(PREFIXES).replace("'", '"'))


def inject(path, check=False):
    s = io.open(path, encoding="utf-8").read()
    orig = s
    if MARK in s:
        # odstranit dřívější vložený blok, aby šel aktualizovat
        s = re.sub(r"\n<style>\s*/\* ---- " + MARK + r".*?</style>", "", s, flags=re.S)
        s = re.sub(r"\n<script>\s*/\* " + MARK + r".*?</script>", "", s, flags=re.S)
        s = re.sub(r'<div class="sitenav">.*?</div>\s*', "", s, flags=re.S)
        s = re.sub(r'<a class="sitenav-m".*?</a>\s*', "", s, flags=re.S)
    link = ('<div class="sitenav"><a href="index.html">%s'
            '<span>Zpátky na okruhy</span></a></div>\n    ' % ARL)
    s, n1 = re.subn(r'(<aside class="rail">\s*\n\s*)(<div class="rail-brand">)',
                    lambda m: m.group(1) + link + m.group(2), s, count=1)
    mob = ('<a class="sitenav-m" href="index.html" aria-label="Zpátky na okruhy">%s</a>\n      ' % ARL)
    s, n2 = re.subn(r'(<div class="topbar-row">\s*\n\s*)(<div class="name">)',
                    lambda m: m.group(1) + mob + m.group(2), s, count=1)
    s, n3 = re.subn(r'\n</head>', "\n<style>" + NAV_CSS + "</style>\n</head>", s, count=1)
    s, n4 = re.subn(r'\n</body>', "\n<script>" + NAV_JS + "</script>\n</body>", s, count=1)
    if not (n1 and n2 and n3 and n4):
        return "SELHALO (rail=%d topbar=%d head=%d body=%d)" % (n1, n2, n3, n4)
    if not check:
        io.open(path, "w", encoding="utf-8", newline="\n").write(s)
    return "aktualizováno (%+d B)" % (len(s.encode()) - len(orig.encode()))


def main():
    check = "--check" in sys.argv
    groups = [("obecna-fyzikalni-chemie", SUB, TOPICS),
              ("anorganicka-chemie", ANORG, ANORG_TOPICS)]
    for slug, d, tops in groups:
        os.makedirs(d, exist_ok=True)
    pages = [(os.path.join(OUT, "index.html"), build_index())]
    for slug, d, tops in groups:
        found = {t["slug"] for t in tops
                 if os.path.exists(os.path.join(d, t["slug"] + ".html"))}
        print("%-24s hotových okruhů: %d / %d" % (slug, len(found), len(tops)))
        pages.append((os.path.join(d, "index.html"), build_group(slug, found)))
    for hslug in HUBS:
        d = os.path.join(OUT, hslug)
        os.makedirs(d, exist_ok=True)
        html = build_hub(hslug)
        if not check:
            io.open(os.path.join(d, "index.html"), "w", encoding="utf-8",
                    newline="\n").write(html)
        print("%-38s %6.1f KB %s" % (hslug + "/index.html",
              len(html.encode()) / 1024, "(náhled)" if check else "zapsáno"))
    for p, html in pages:
        if not check:
            io.open(p, "w", encoding="utf-8", newline="\n").write(html)
        print("%-38s %6.1f KB %s" % (os.path.relpath(p, OUT), len(html.encode()) / 1024,
                                     "(náhled)" if check else "zapsáno"))
    print("\nTlačítko Zpátky v průvodcích:")
    for slug, d, tops in groups:
        for t in tops:
            p = os.path.join(d, t["slug"] + ".html")
            if os.path.exists(p):
                print("  %-26s %s" % (t["slug"], inject(p, check)))


if __name__ == "__main__":
    main()
