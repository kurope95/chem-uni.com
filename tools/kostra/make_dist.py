# -*- coding: utf-8 -*-
"""make_dist.py — složí čistou složku k nahrání na web (jen to, co má být veřejné).

    web/
      index.html
      404.html  robots.txt  _headers
      obecna-fyzikalni-chemie/index.html
      obecna-fyzikalni-chemie/<slug>.html
"""
import io, os, sys, shutil

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass
from site_data import TOPICS, PREFIXES, GROUPS, ANORG_TOPICS, ANORG_PREFIXES
import i18n
from i18n import L, Lk

SRC = r"C:\Claude Code\Claude Code\Doučovanie"
DST = os.path.join(SRC, "web")

THEME = """
(function(){
  var KEYS=%s;
  var SUN='<svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.4" fill="currentColor"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2.4v2.4M12 19.2v2.4M2.4 12h2.4M19.2 12h2.4M5.2 5.2l1.7 1.7M17.1 17.1l1.7 1.7M18.8 5.2l-1.7 1.7M6.9 17.1l-1.7 1.7"/></g></svg>';
  var MOON='<svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.2A8.4 8.4 0 0 1 9.8 4 8.4 8.4 0 1 0 20 14.2z" fill="currentColor"/></svg>';
  function cur(){var a=document.documentElement.getAttribute("data-theme");if(a)return a;
    try{var v=localStorage.getItem("site.theme");if(v)return JSON.parse(v);}catch(e){}
    return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}
  function save(t){try{localStorage.setItem("site.theme",JSON.stringify(t));
    KEYS.forEach(function(k){localStorage.setItem(k+".theme",JSON.stringify(t));});}catch(e){}}
  function paint(){var d=cur()==="dark";var b=document.getElementById("themeBtn");
    if(b){b.innerHTML=d?SUN:MOON;b.setAttribute("aria-label",d?"Přepnout na světlý režim":"Přepnout na tmavý režim");}}
  try{var s=localStorage.getItem("site.theme");if(s)document.documentElement.setAttribute("data-theme",JSON.parse(s));}catch(e){}
  document.addEventListener("DOMContentLoaded",function(){paint();
    var b=document.getElementById("themeBtn");
    if(b)b.addEventListener("click",function(){var n=cur()==="dark"?"light":"dark";
      document.documentElement.setAttribute("data-theme",n);save(n);paint();});});
})();
""" % (repr(PREFIXES + ANORG_PREFIXES).replace("'", '"'))

NOT_FOUND = """<!doctype html>
<html lang="cs"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>Stránka nenalezena — Chemie</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600&family=IBM+Plex+Sans:wght@400;600;700&family=Source+Serif+4:opsz,wght@8..60,400&display=swap">
<style>
:root{--f-ui:"IBM Plex Sans",system-ui,sans-serif;--paper:#efe8dc;--surface:#faf6ee;--surface-2:#f3ece0;--ink:#211b15;--ink-2:#5c5146;--ink-3:#8f8375;
  --line:#e0d6c6;--line-strong:#c8baa5;--accent:#9b3320;--accent-hover:#7e2718;--accent-ink:#fff7f2;--grid:#e6dccb}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--paper:#15110d;--surface:#1d1813;--surface-2:#251f19;
  --ink:#f0e8dc;--ink-2:#bfb2a1;--ink-3:#8f8376;--line:#332b23;--line-strong:#4a4036;
  --accent:#e0785c;--accent-hover:#ef8c71;--accent-ink:#1a0f0a;--grid:#241e18}}
:root[data-theme="dark"]{--paper:#15110d;--surface:#1d1813;--surface-2:#251f19;
  --ink:#f0e8dc;--ink-2:#bfb2a1;--ink-3:#8f8376;--line:#332b23;--line-strong:#4a4036;
  --accent:#e0785c;--accent-hover:#ef8c71;--accent-ink:#1a0f0a;--grid:#241e18}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:flex;flex-direction:column;background:var(--paper);color:var(--ink);
  font-family:"Source Serif 4",Georgia,serif}
.bar{border-bottom:1px solid var(--line);background:var(--surface)}
.bar-in{display:flex;align-items:center;gap:1rem;min-height:62px;max-width:1220px;margin:0 auto;
  padding:0 clamp(1.1rem,4vw,3rem)}
.brand{display:flex;align-items:center;gap:.6rem;text-decoration:none;color:var(--ink);
  font-family:"IBM Plex Sans",system-ui,sans-serif;font-weight:700;letter-spacing:-.02em}
.brand .dot{width:26px;height:26px;border-radius:8px;background:var(--accent);color:var(--accent-ink);
  display:grid;place-items:center;font-family:"IBM Plex Mono",monospace;font-size:.78rem;font-weight:700}
.sp{flex:1}
.iconbtn{width:40px;height:40px;border-radius:10px;border:1px solid var(--line-strong);background:var(--surface);
  color:var(--ink);cursor:pointer;display:grid;place-items:center}
.iconbtn:hover{background:var(--surface-2)}
main{flex:1;display:grid;place-items:center;padding:2rem;text-align:center;
  background:repeating-linear-gradient(0deg,transparent 0 31px,var(--grid) 31px 32px),
    repeating-linear-gradient(90deg,transparent 0 31px,var(--grid) 31px 32px),var(--paper)}
.box{max-width:46ch;display:flex;flex-direction:column;gap:1rem;align-items:center}
h1{font-family:"IBM Plex Sans",system-ui,sans-serif;font-size:clamp(1.8rem,1.2rem + 2vw,2.8rem);
  font-weight:700;letter-spacing:-.03em;margin:0}
p{margin:0;color:var(--ink-2);font-size:1.05rem;line-height:1.7}
.code{font-family:"IBM Plex Sans",sans-serif;font-size:4.5rem;font-weight:700;color:var(--accent);
  letter-spacing:-.05em;line-height:1}
.acts{display:flex;flex-wrap:wrap;gap:.6rem;justify-content:center;margin-top:.6rem}
.acts a{display:inline-flex;align-items:center;gap:.5rem;font-family:"IBM Plex Sans",sans-serif;
  font-weight:600;font-size:.95rem;text-decoration:none;padding:.8rem 1.35rem;min-height:48px;
  border-radius:12px;border:1px solid var(--line-strong);background:var(--surface);color:var(--ink)}
.acts a.primary{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}
.acts a.primary:hover{background:var(--accent-hover)}
.author404{margin-top:1.6rem;font-family:"IBM Plex Sans",sans-serif;font-size:.84rem;color:var(--ink-3)}
</style>
@@LANG@@</head>
<body>
<header class="bar"><div class="bar-in">
  <a class="brand" href="/"><span class="dot">Ch</span><span>@@BRAND@@</span></a>
  <span class="sp"></span>
  @@TOGGLE@@
  <button class="iconbtn" id="themeBtn" type="button" aria-label="Přepnout režim"></button>
</div></header>
<main><div class="box">
<span class="code">404</span>
<h1>@@H1@@</h1>
<p>@@P@@</p>
<div class="acts">
  <a class="primary" href="/">@@HOME@@</a>
  <a href="/obecna-fyzikalni-chemie/index.html">@@OBECNA@@</a>
  <a href="/anorganicka-chemie/index.html">@@ANORG@@</a>
</div>
<p class="author404">@@AUTHOR@@</p>
</div></main>
<script>@@THEME@@</script>
</body></html>
"""
_G = {g["id"]: g for g in GROUPS}
for _k, _v in (
    ("@@LANG@@", i18n.head_block("Stránka nenalezena — Chemie")),
    ("@@BRAND@@", L("Chemie")),
    ("@@TOGGLE@@", i18n.toggle()),
    ("@@H1@@", L("Tuhle stránku tu nemáme", "We don’t have this page", "Túto stránku tu nemáme")),
    ("@@P@@", L("Odkaz je nejspíš zastaralý nebo překlepnutý. Zkuste to od začátku — "
                "všechno najdete na úvodní stránce.",
                "The link is probably out of date or mistyped. Start again from the beginning — "
                "you will find everything on the home page.",
                "Odkaz je zrejme zastaraný alebo s preklepom. Skúste to od začiatku — "
                "všetko nájdete na úvodnej stránke.")),
    ("@@HOME@@", L("Zpátky na úvod")),
    ("@@OBECNA@@", Lk(_G["okruhy"], "title")),
    ("@@ANORG@@", Lk(_G["anorganika"], "title")),
    ("@@AUTHOR@@", i18n.author_html()),
    ("@@THEME@@", THEME),
):
    NOT_FOUND = NOT_FOUND.replace(_k, _v)

HEADERS = """/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN

/*.html
  Cache-Control: public, max-age=0, must-revalidate
"""

ROBOTS = "User-agent: *\nAllow: /\n"


def main():
    if not i18n.check_all():
        print("\nSTOP: menu není celé přeložené do angličtiny (viz CLAUDE.md). Web se neskládá.")
        sys.exit(1)
    if os.path.isdir(DST):
        shutil.rmtree(DST)
    os.makedirs(os.path.join(DST, "obecna-fyzikalni-chemie"))
    missing, n = [], 0

    root = ["index.html"]
    for f in root:
        p = os.path.join(SRC, f)
        if os.path.exists(p):
            shutil.copy2(p, os.path.join(DST, f)); n += 1
        else:
            missing.append(f)

    for gslug, tops in (("obecna-fyzikalni-chemie", TOPICS),
                        ("anorganicka-chemie", ANORG_TOPICS)):
        os.makedirs(os.path.join(DST, gslug), exist_ok=True)
        for f in ["index.html"] + [t["slug"] + ".html" for t in tops]:
            p = os.path.join(SRC, gslug, f)
            if os.path.exists(p):
                shutil.copy2(p, os.path.join(DST, gslug, f)); n += 1
            else:
                missing.append(gslug + "/" + f)

    for hub in ("pocitani",):
        src = os.path.join(SRC, hub, "index.html")
        if os.path.exists(src):
            os.makedirs(os.path.join(DST, hub), exist_ok=True)
            shutil.copy2(src, os.path.join(DST, hub, "index.html")); n += 1
        else:
            missing.append(hub + "/index.html")

    for g in GROUPS:
        sl = g.get("slug")
        if not sl or "/" in sl or sl in ("obecna-fyzikalni-chemie",
                                          "anorganicka-chemie", "pocitani"):
            continue
        src = os.path.join(SRC, sl, "index.html")
        if os.path.exists(src):
            os.makedirs(os.path.join(DST, sl), exist_ok=True)
            shutil.copy2(src, os.path.join(DST, sl, "index.html")); n += 1
        else:
            missing.append(sl + "/index.html")

    # pod-moduly ve vlastní složce (např. jak-pocitat/zlomky-a-zavorky/)
    for sub in ("jak-pocitat/zlomky-a-zavorky",):
        src = os.path.join(SRC, *sub.split("/"), "index.html")
        if os.path.exists(src):
            d = os.path.join(DST, *sub.split("/"))
            os.makedirs(d, exist_ok=True)
            shutil.copy2(src, os.path.join(d, "index.html")); n += 1
        else:
            missing.append(sub + "/index.html")

    for name, content in (("404.html", NOT_FOUND), ("_headers", HEADERS), ("robots.txt", ROBOTS)):
        io.open(os.path.join(DST, name), "w", encoding="utf-8", newline="\n").write(content)
        n += 1
    probs = i18n.check_page(os.path.join(DST, "404.html"), True)
    if probs:
        print("STOP: 404.html není celá přeložená:", "; ".join(probs))
        sys.exit(1)

    total = 0
    print("složka k nahrání:", DST)
    for base, _, files in os.walk(DST):
        for f in sorted(files):
            fp = os.path.join(base, f)
            total += os.path.getsize(fp)
            print("  %-42s %7.0f KB" % (os.path.relpath(fp, DST).replace("\\", "/"),
                                        os.path.getsize(fp) / 1024))
    print("celkem %d souborů, %.1f MB" % (n, total / 1048576))
    if missing:
        print("CHYBÍ:", ", ".join(missing))
    bad = []
    for base, _, files in os.walk(DST):
        bad += [f for f in files if f.endswith((".bak", ".jpg", ".png", ".py", ".json", ".jsonc"))]
    print("soukromé soubory ve složce:", bad or "žádné")


if __name__ == "__main__":
    main()
