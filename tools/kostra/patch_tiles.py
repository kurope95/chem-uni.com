# -*- coding: utf-8 -*-
"""patch_tiles.py — dlaždice na úvodu: vedle sebe, vlastní popisek a ikona u každé."""
import io, os, sys
sys.stdout.reconfigure(encoding="utf-8")
HERE = os.path.dirname(os.path.abspath(__file__))

# ---------------------------------------------------- 1) popisky a ikony v datech
P = os.path.join(HERE, "site_data.py")
s = io.open(P, encoding="utf-8").read()

REPL = [
    ('        "sub": "Deset okruhů pokrývajících celou osnovu obecné a fyzikální chemie",\n'
     '        "state": "ready",\n        "icon": "okruhy",',
     '        "sub": "Deset okruhů pokrývajících celou osnovu obecné a fyzikální chemie",\n'
     '        "kicker": "Vše z osnovy",\n        "cta": "Zobrazit okruhy",\n'
     '        "state": "ready",\n        "icon": "okruhy",'),
    ('        "sub": "Řemeslo výpočtu: jak zapsat zadání, odvodit vztah a teprve pak dosadit. '
     'Jednotky, převody, přehled vzorců a řešené příklady",\n        "state": "ready",\n        "icon": "pocty",',
     '        "sub": "Jak zapsat zadání, odvodit vztah a teprve pak dosadit. '
     'Jednotky, převody, přehled vzorců a řešené příklady",\n'
     '        "kicker": "Než začnete počítat",\n        "cta": "Naučit se zápis",\n'
     '        "state": "ready",\n        "icon": "pocty",'),
    ('        "sub": "Trenažér, ve kterém výpočet skládáte vy: vyberete vztahy, klepáním dosadíte '
     'jeden do druhého a teprve nakonec dosadíte čísla",\n        "state": "ready",\n        "icon": "spolu",',
     '        "sub": "Výpočet skládáte vy: vyberete vztahy, klepáním dosadíte jeden do druhého '
     'a teprve nakonec dosadíte čísla",\n'
     '        "kicker": "Nácvik krok za krokem",\n        "cta": "Začít počítat",\n'
     '        "state": "ready",\n        "icon": "spolu",'),
    ('        "sub": "Souhrnné testy napříč okruhy: na čas, bez nápovědy a s rozborem, '
     'kde jste ztráceli body",\n        "state": "ready",\n        "icon": "test",',
     '        "sub": "Souhrnné testy napříč okruhy: na čas, bez nápovědy a s rozborem, '
     'kde jste ztráceli body",\n'
     '        "kicker": "Zkouška nanečisto",\n        "cta": "Vybrat test",\n'
     '        "state": "ready",\n        "icon": "test",'),
]
for old, new in REPL:
    if new.split("\n")[1].strip() in s:
        continue
    assert old in s, "kotva nenalezena: " + old[:70]
    s = s.replace(old, new, 1)
io.open(P, "w", encoding="utf-8", newline="\n").write(s)
print("site_data.py: doplněny kicker a cta u dlaždic")

# ---------------------------------------------------- 2) mřížka a ikony v generátoru
P = os.path.join(HERE, "make_site.py")
s = io.open(P, encoding="utf-8").read()

old_grid = ".tiles.g3{grid-template-columns:repeat(auto-fit,minmax(290px,1fr))}"
new_grid = ".tiles.g3{grid-template-columns:repeat(auto-fit,minmax(min(100%,330px),1fr))}"
assert old_grid in s, "kotva mřížky nenalezena"
s = s.replace(old_grid, new_grid, 1)

# .big už neroztahuje na dva sloupce, jen zvětší nadpis
old_big = """.tile.big{grid-column:span 2;min-height:230px}
@media (max-width:900px){ .tile.big{grid-column:span 1} }
.tile.big h3{font-size:clamp(1.5rem,1rem + 1.7vw,2.05rem);letter-spacing:-.03em}
.tile.big .desc{font-size:1rem;max-width:46ch}"""
new_big = """.tile.big{min-height:250px}
.tile.big h3{font-size:clamp(1.25rem,1rem + .9vw,1.55rem);letter-spacing:-.028em}
.tile.big .desc{font-size:.94rem}"""
assert old_big in s, "kotva .big nenalezena"
s = s.replace(old_big, new_big, 1)

# ikony podle typu sekce
old_ic = "BIG_IC = ("
new_ic = '''ICONS = {
 "okruhy": '<circle cx="50" cy="50" r="7.5" fill="currentColor" stroke="none"/>'
           '<ellipse cx="50" cy="50" rx="42" ry="16"/>'
           '<ellipse cx="50" cy="50" rx="42" ry="16" transform="rotate(60 50 50)"/>'
           '<ellipse cx="50" cy="50" rx="42" ry="16" transform="rotate(120 50 50)"/>',
 "pocty":  '<path d="M14 50h72"/><text x="50" y="40" text-anchor="middle" font-size="26" '
           'font-family="serif" font-style="italic" fill="currentColor" stroke="none">m</text>'
           '<text x="50" y="78" text-anchor="middle" font-size="26" font-family="serif" '
           'font-style="italic" fill="currentColor" stroke="none">M·V</text>',
 "spolu":  '<rect x="12" y="16" width="34" height="24" rx="4"/>'
           '<rect x="54" y="16" width="34" height="24" rx="4"/>'
           '<rect x="33" y="60" width="34" height="24" rx="4"/>'
           '<path d="M29 40v10h42V40M50 50v10"/>',
 "test":   '<rect x="22" y="12" width="56" height="76" rx="6"/>'
           '<path d="M34 34h32M34 48h32M34 62h18"/>'
           '<path d="M60 70l7 7 14-16" stroke-width="3"/>',
 "priklady":'<rect x="16" y="18" width="68" height="64" rx="5"/><path d="M50 18v64"/>'
           '<path d="M26 34h16M26 46h16M58 34h16M58 46h16"/>',
}

def group_icon(kind, cls="ic", size=230):
    inner = ICONS.get(kind, ICONS["okruhy"])
    return ('<svg class="%s" width="%d" height="%d" viewBox="0 0 100 100" fill="none" '
            'stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">%s</svg>'
            % (cls, size, size, inner))


BIG_IC = ('''
assert old_ic in s, "kotva ikon nenalezena"
s = s.replace(old_ic, new_ic, 1)

# vykreslení dlaždic skupin
old_tile = """        if g["state"] == "ready":
            h += ('<a class="tile big" href="%s/index.html">%s'
                  '<span class="n">Vše z osnovy</span>'
                  '<h3>%s</h3><p class="desc">%s</p>'
                  '<span class="go">Zobrazit okruhy %s</span></a>'
                  % (g["slug"], BIG_IC, g["title"], g["sub"], ARR))"""
new_tile = """        if g["state"] == "ready":
            h += ('<a class="tile big" href="%s/index.html">%s'
                  '<span class="n">%s</span>'
                  '<h3>%s</h3><p class="desc">%s</p>'
                  '<span class="go">%s %s</span></a>'
                  % (g["slug"], group_icon(g.get("icon", "okruhy")),
                     g.get("kicker", "Vše z osnovy"), g["title"], g["sub"],
                     g.get("cta", "Otevřít"), ARR))"""
assert old_tile in s, "kotva dlaždice nenalezena"
s = s.replace(old_tile, new_tile, 1)

io.open(P, "w", encoding="utf-8", newline="\n").write(s)
print("make_site.py: mřížka 2+ vedle sebe, vlastní ikona a popisek u každé dlaždice")
