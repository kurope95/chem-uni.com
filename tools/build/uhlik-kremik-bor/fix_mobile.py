# -*- coding: utf-8 -*-
"""Úpravy pro šířku 375 px:
   1) zkrácení podtitulů v .worked-head (kostra jim dává flex:none, takže se ořezávají),
   2) rozdělení příliš dlouhého vzorce v odstavci rychlokurzu, aby se mohl zalomit."""
import io, sys, glob, os
sys.stdout.reconfigure(encoding="utf-8")

EYEBROWS = [
 ("Příklad 0.1 · z konfigurace ke geometrii",     "Příklad 0.1 · tvar molekul"),
 ("Příklad 0.2 · energetická bilance řetězení",   "Příklad 0.2 · proč řetězí"),
 ("Příklad 1.1 · hustota jako důkaz struktury",   "Příklad 1.1 · hustota"),
 ("Příklad 1.2 · identifikace vzorku",            "Příklad 1.2 · čtyři vzorky"),
 ("Příklad 2.2 · rozhodněte, co v roztoku převládá", "Příklad 2.2 · co převládá"),
 ("Příklad 3.1 · kolik acetylenu z karbidu",      "Příklad 3.1 · z karbidu"),
 ("Příklad 3.2 · zařaďte podle vazby",            "Příklad 3.2 · tři karbidy"),
 ("Příklad 4.2 · předpovězte chování dvojice",    "Příklad 4.2 · dvě baňky"),
 ("Příklad 5.1 · od vzorce ke struktuře a zpět",  "Příklad 5.1 · ze vzorce"),
 ("Příklad 5.2 · obsah křemíku a výtěžek",        "Příklad 5.2 · obsah křemíku"),
 ("Příklad 6.1 · návrh sklářské vsázky",          "Příklad 6.1 · vsázka"),
 ("Příklad 6.2 · vyberte sklo podle zadání",      "Příklad 6.2 · které sklo"),
 ("Příklad 7.1 · elektronová bilance boranu",     "Příklad 7.1 · tetraboran"),
 ("Příklad 7.2 · hydrolýza diboranu",             "Příklad 7.2 · diboran"),
 ("Příklad 8.1 · kolik kyseliny borité z boraxu", "Příklad 8.1 · z boraxu"),
 ("Příklad 8.2 · předpovězte typ vodivosti",      "Příklad 8.2 · typ vodivosti"),
]

# dlouhý vzorec v běžném odstavci → rozdělit na dva zalomitelné celky
LONG = ('<span class="chem">6 SiO₂ + Na₂CO₃ + CaCO₃ → Na₂O·CaO·6&nbsp;SiO₂ + 2 CO₂</span>.</p>',
        '<span class="chem">6 SiO₂ + Na₂CO₃ + CaCO₃</span> → <span class="chem">Na₂O·CaO·6&nbsp;SiO₂ + 2 CO₂</span>.</p>')

total = 0
for path in sorted(glob.glob("*.html")):
    s = io.open(path, encoding="utf-8").read()
    orig = s
    for a, b in EYEBROWS:
        if a in s:
            s = s.replace(a, b); total += 1; print("  %-18s %s" % (os.path.basename(path), b))
    if LONG[0] in s:
        s = s.replace(LONG[0], LONG[1]); total += 1; print("  %-18s rozdělen dlouhý vzorec skla" % os.path.basename(path))
    if s != orig:
        io.open(path, "w", encoding="utf-8", newline="\n").write(s)
print("celkem úprav:", total)
