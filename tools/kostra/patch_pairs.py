# -*- coding: utf-8 -*-
"""patch_pairs.py — dlaždice na úvodu do dvojic: nauč se → vyzkoušej."""
import io, os, sys
sys.stdout.reconfigure(encoding="utf-8")
HERE = os.path.dirname(os.path.abspath(__file__))

# ------------------------------------------------------------------ site_data
P = os.path.join(HERE, "site_data.py")
s = io.open(P, encoding="utf-8").read()
start = s.index("GROUPS = [")
end = s.index("# pořadí přesně podle osnovy učitele")
NEW = '''GROUPS = [
    {
        "id": "okruhy", "slug": "maturitni-okruhy",
        "title": "Maturitní okruhy",
        "sub": "Deset okruhů pokrývajících celou osnovu obecné a fyzikální chemie. "
               "Výklad, interaktivní modely, řešené příklady a testy.",
        "kicker": "Naučit se",
        "cta": "Zobrazit okruhy",
        "state": "ready", "icon": "okruhy",
    },
    {
        "id": "testy", "slug": "testy-nanecisto",
        "title": "Testy nanečisto",
        "sub": "Souhrnné testy napříč okruhy: na čas, bez nápovědy a s rozborem, "
               "který okruh vás srazil nejvíc.",
        "kicker": "Vyzkoušet se",
        "cta": "Vybrat test",
        "state": "ready", "icon": "test",
    },
    {
        "id": "pocitat", "slug": "jak-pocitat",
        "title": "Jak počítat chemii",
        "sub": "Jak zapsat zadání, odvodit vztah a teprve pak dosadit. "
               "Jednotky, převody, přehled vzorců a řešené příklady.",
        "kicker": "Naučit se",
        "cta": "Naučit se zápis",
        "state": "ready", "icon": "pocty",
    },
    {
        "id": "spolu", "slug": "pocitame-spolu",
        "title": "Počítáme spolu",
        "sub": "Výpočet skládáte vy: vyberete vztahy, klepáním dosadíte jeden do druhého "
               "a čísla přijdou na řadu až úplně nakonec.",
        "kicker": "Procvičit si",
        "cta": "Začít počítat",
        "state": "ready", "icon": "spolu",
    },
    {
        "id": "prikladu", "slug": None,
        "title": "Sbírka příkladů",
        "sub": "Početní úlohy k procvičení, řazené podle obtížnosti.",
        "kicker": "Chystá se",
        "cta": "Zatím není hotové",
        "state": "soon", "icon": "priklady",
    },
]

# dvojice na úvodní stránce — co spolu souvisí, stojí vedle sebe
PAIRS = [
    {"label": "Látka", "note": "Nejdřív si projděte okruhy, pak se z nich vyzkoušejte nanečisto.",
     "items": ["okruhy", "testy"]},
    {"label": "Výpočty", "note": "Nejdřív se naučte, jak výpočet zapsat, pak si to natrénujte na úlohách.",
     "items": ["pocitat", "spolu"]},
    {"label": "Připravujeme", "note": "", "items": ["prikladu"]},
]

'''
io.open(P, "w", encoding="utf-8", newline="\n").write(s[:start] + NEW + s[end:])
print("site_data.py: GROUPS s id/kicker/cta + PAIRS")

# ------------------------------------------------------------------ make_site
P = os.path.join(HERE, "make_site.py")
s = io.open(P, encoding="utf-8").read()

s = s.replace("from site_data import SITE, GROUPS, TOPICS, PREFIXES",
              "from site_data import SITE, GROUPS, TOPICS, PREFIXES, PAIRS", 1)

# --- CSS dvojic ---
anchor = ".tile.big{grid-column:span 2;min-height:230px}"
PAIRCSS = """/* ---------- dvojice: co spolu souvisí, drží pohromadě ---------- */
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
@media (min-width:820px){ .pair.one .pair-grid{grid-template-columns:minmax(0,1fr) auto minmax(0,1fr)}
  .pair.one .pair-grid > :nth-child(n+2){visibility:hidden} }
.tile.big{min-height:236px}"""
assert anchor in s, "kotva .big nenalezena"
s = s.replace(anchor, PAIRCSS, 1)
s = s.replace("@media (max-width:900px){ .tile.big{grid-column:span 1} }\n", "", 1)
s = s.replace(".tile.big h3{font-size:clamp(1.5rem,1rem + 1.7vw,2.05rem);letter-spacing:-.03em}",
              ".tile.big h3{font-size:clamp(1.22rem,1rem + .8vw,1.5rem);letter-spacing:-.026em}", 1)
s = s.replace(".tile.big .desc{font-size:1rem;max-width:46ch}",
              ".tile.big .desc{font-size:.92rem}", 1)

# --- ikony podle sekce ---
old_ic = "BIG_IC = ("
new_ic = '''ICONS = {
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


BIG_IC = ('''
assert old_ic in s, "kotva ikon nenalezena"
s = s.replace(old_ic, new_ic, 1)

# --- vykreslení sekce s dvojicemi ---
start = s.index("    h += '<div class=\"wrap\"><section class=\"sec\"><div class=\"sec-head\"><h2>Kde chcete začít?</h2></div>'")
end = s.index("    h += '</div></section></div>\\n'")
NEWBLOCK = '''    h += ('<div class="wrap"><section class="sec">'
          '<div class="sec-head"><h2>Kde chcete začít?</h2></div><div class="pairs">')
    by_id = {g["id"]: g for g in GROUPS}
    for pr in PAIRS:
        items = [by_id[i] for i in pr["items"] if i in by_id]
        if not items:
            continue
        h += '<section class="pair %s">' % ("two" if len(items) == 2 else "one")
        h += '<div class="pair-head"><span class="pl">%s</span>' % pr["label"]
        if pr.get("note"):
            h += '<span class="pn">%s</span>' % pr["note"]
        h += '</div><div class="pair-grid">'
        for k, g in enumerate(items):
            if k:
                h += CONN
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
    h += '</div></section></div>\\n'
'''
s = s[:start] + NEWBLOCK + s[end + len("    h += '</div></section></div>\\n'\n"):]
io.open(P, "w", encoding="utf-8", newline="\n").write(s)
print("make_site.py: úvod přepsán na dvojice se spojnicí a vlastními ikonami")
