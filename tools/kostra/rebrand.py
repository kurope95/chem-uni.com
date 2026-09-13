# -*- coding: utf-8 -*-
"""rebrand.py — „Maturitní okruhy“ → „Obecná a fyzikální chemie“, pryč se zmínkami o maturitě.
Přejmenuje i složku a všechny odkazy. Spouštět jednou."""
import io, os, re, sys, glob, shutil

HERE = os.path.dirname(os.path.abspath(__file__))
PROJ = r"C:\Claude Code\Claude Code\Doučovanie"
OLD, NEW = "maturitni-okruhy", "obecna-fyzikalni-chemie"
sys.stdout.reconfigure(encoding="utf-8")

# ---------------------------------------------------------------- 1) složka
src, dst = os.path.join(PROJ, OLD), os.path.join(PROJ, NEW)
if os.path.isdir(src) and not os.path.isdir(dst):
    shutil.move(src, dst)
    print("složka přejmenována:", OLD, "->", NEW)
elif os.path.isdir(dst):
    print("složka už přejmenovaná")
else:
    print("VAROVÁNÍ: složka nenalezena")

# ---------------------------------------------------------------- 2) texty
# pořadí je důležité: nejdřív nejdelší a nejkonkrétnější tvary
REPL = [
    # rámování a názvy
    ("Interaktivní příprava k maturitě a na přijímací zkoušky",
     "Interaktivní studijní materiály z chemie"),
    ("interaktivní studijní průvodce", "interaktivní studijní průvodce"),
    ("pro maturitu a přijímačky na VŠ", "pro střední školu a přípravu na vysokou"),
    ("pro maturitu a přijímačky na vysokou školu", "pro střední školu a přípravu na vysokou"),
    ("k maturitě a na přijímací zkoušky", "pro střední a vysokou školu"),
    ("Maturitní okruhy", "Obecná a fyzikální chemie"),
    ("maturitní okruhy", "obecná a fyzikální chemie"),
    ("maturitních okruzích", "okruzích"),
    ("maturitních okruhů", "okruhů"),
    ("maturitních okruhy", "okruhy"),
    ("maturitní okruh", "okruh"),
    ("Maturitní test", "Souhrnný test"),
    ("maturitní test", "souhrnný test"),
    ("maturitního testu", "souhrnného testu"),
    # věcné zmínky v textu — přeformulovat, ne mazat
    ("u maturity i u přijímaček", "u zkoušek i u přijímaček"),
    ("u maturity i přijímaček", "u zkoušek i u přijímaček"),
    ("u maturity a přijímaček", "u zkoušek i u přijímaček"),
    ("na maturitě i u přijímaček", "u zkoušek i u přijímaček"),
    ("k maturitě i na přijímačky", "ke zkouškám i na přijímačky"),
    ("na maturitě", "u zkoušky"),
    ("u maturity", "u zkoušky"),
    ("k maturitě", "ke zkoušce"),
    ("před maturitou", "před zkouškou"),
    ("na maturitu", "na zkoušku"),
    ("maturitou", "zkouškou"),
    ("maturity", "zkoušky"),
    ("maturitě", "zkoušce"),
    ("maturitu", "zkoušku"),
    ("maturita", "zkouška"),
    # cesty
    (OLD, NEW),
]

targets = [os.path.join(PROJ, "index.html"),
           os.path.join(PROJ, "testy-nanecisto", "index.html"),
           os.path.join(PROJ, "jak-pocitat", "index.html"),
           os.path.join(PROJ, "pocitame-spolu", "index.html")]
targets += sorted(glob.glob(os.path.join(PROJ, NEW, "*.html")))
targets += [os.path.join(HERE, f) for f in
            ("site_data.py", "make_site.py", "make_dist.py", "make_testy.py",
             "make_spolu.py", "install_section.py", "spolu_tasks.py", "spolu_js.py",
             "spolu_js2.py", "spolu_data.py")]

total, touched = 0, 0
for p in targets:
    if not os.path.exists(p):
        continue
    s = io.open(p, encoding="utf-8").read()
    orig = s
    for a, b in REPL:
        s = s.replace(a, b)
    if s != orig:
        n = sum(1 for _ in re.finditer(r'matur', orig, re.I))
        io.open(p, "w", encoding="utf-8", newline="\n").write(s)
        touched += 1
        total += n
        print("  %-52s %2d zmínek" % (os.path.relpath(p, PROJ)[:52], n))
print("upraveno souborů: %d" % touched)

# ---------------------------------------------------------------- 3) dolaďovačky
P = os.path.join(HERE, "site_data.py")
s = io.open(P, encoding="utf-8").read()
s = s.replace('"sub": "Deset okruhů pokrývajících celou osnovu obecné a fyzikální chemie. "\n'
              '               "Výklad, interaktivní modely, řešené příklady a testy.",',
              '"sub": "Deset okruhů podle školní osnovy. Výklad, interaktivní modely, "\n'
              '               "řešené příklady a testy s vysvětlením u každé otázky.",')
s = s.replace('"group_lead": "Okruhy v pořadí podle osnovy.',
              '"group_lead": "Deset okruhů v pořadí podle školní osnovy.')
io.open(P, "w", encoding="utf-8", newline="\n").write(s)

P = os.path.join(HERE, "make_site.py")
s = io.open(P, encoding="utf-8").read()
s = s.replace("<span class=\"eyebrow\">Obecná a fyzikální chemie · podle školní osnovy</span>",
              "<span class=\"eyebrow\">Deset okruhů · podle školní osnovy</span>")
s = s.replace("'<span class=\"eyebrow\">Chemie pro střední školu a přípravu na vysokou</span>'",
              "'<span class=\"eyebrow\">Chemie pro střední školu a přípravu na vysokou</span>'")
io.open(P, "w", encoding="utf-8", newline="\n").write(s)
print("doladěny popisky v site_data.py a make_site.py")

# ---------------------------------------------------------------- 4) kontrola
left = 0
for p in targets:
    if os.path.exists(p):
        left += len(re.findall(r'matur', io.open(p, encoding="utf-8").read(), re.I))
print("zbývá zmínek „matur*“ ve zdrojích:", left)
