# -*- coding: utf-8 -*-
"""Porovná pojmový aparát: co anorganika používá × co obecná chemie vysvětluje."""
import io, os, re, sys, glob, json

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

ROOT = r"C:\Claude Code\Claude Code\Doučovanie"
GEN = os.path.join(ROOT, "obecna-fyzikalni-chemie")
ANO = os.path.join(ROOT, "anorganicka-chemie")

STR = re.compile(r'"((?:[^"\\]|\\.)*)"')


def arr_end(src, start):
    d, i, q = 0, start, None
    while i < len(src):
        c = src[i]
        if q:
            if c == "\\":
                i += 2; continue
            if c == q: q = None
            i += 1; continue
        if c in "\"'`":
            q = c; i += 1; continue
        if c == "[": d += 1
        elif c == "]":
            d -= 1
            if d == 0: return i + 1
        i += 1
    return -1


def gloss(path):
    s = io.open(path, encoding="utf-8").read()
    m = re.search(r"\bGLOSS\s*=\s*\[", s)
    if not m: return []
    st = s.index("[", m.start()); en = arr_end(s, st)
    out = []
    for row in re.finditer(r"\[", s[st + 1:en]):
        pass
    # každá položka je [ "pojem", "jednotka", "popis" ] — vezmi první řetězec po '['
    blob = s[st + 1:en]
    i = 0
    while True:
        j = blob.find("[", i)
        if j < 0: break
        m2 = STR.search(blob, j)
        if not m2: break
        out.append(m2.group(1))
        i = arr_end(blob, j)
        if i <= j: break
    return out


def body_text(path):
    s = io.open(path, encoding="utf-8").read()
    s = re.sub(r"<script\b.*?</script>", " ", s, flags=re.S | re.I)
    s = re.sub(r"<style\b.*?</style>", " ", s, flags=re.S | re.I)
    s = re.sub(r"<[^>]+>", " ", s)
    return re.sub(r"\s+", " ", s)


# pojmy, o které se anorganika opírá (teorie, ne popisná fakta)
CONCEPTS = [
    ("orbital", ["orbital"]),
    ("orbitaly s, p, d, f", ["orbital p", "orbitalu p", "orbitaly p", "blok p", "orbital d", "orbitaly d"]),
    ("elektronová konfigurace", ["elektronová konfigurace", "elektronovou konfiguraci", "konfigurace"]),
    ("valenční elektrony", ["valenční elektron"]),
    ("kvantová čísla", ["kvantové číslo", "kvantová čísla", "kvantových čísel"]),
    ("Hundovo pravidlo", ["Hundovo", "Hundova"]),
    ("Pauliho princip", ["Pauliho"]),
    ("ionizační energie", ["ionizační energie"]),
    ("elektronová afinita", ["elektronová afinita", "elektronové afinit"]),
    ("elektronegativita", ["elektronegativita", "elektronegativit"]),
    ("atomový a iontový poloměr", ["atomový poloměr", "iontový poloměr"]),
    ("kovalentní vazba", ["kovalentní vazb"]),
    ("iontová vazba", ["iontová vazb", "iontové vazb"]),
    ("kovová vazba", ["kovová vazb", "kovové vazb"]),
    ("vazba σ a π", ["vazba σ", "vazby σ", "σ a π", "vazba π", "vazby π"]),
    ("hybridizace", ["hybridizace", "hybridizaci", "sp³", "sp2", "sp³d"]),
    ("molekulový orbital (MO)", ["molekulový orbital", "molekulové orbital", "vazebný orbital", "protivazebn"]),
    ("řád vazby", ["řád vazby", "řádu vazby"]),
    ("VSEPR", ["VSEPR"]),
    ("volný elektronový pár", ["volný elektronový pár", "volné elektronové páry", "volných elektronových"]),
    ("polarita vazby, dipól", ["polarita", "dipól"]),
    ("koordinační (donor-akceptorová) vazba", ["koordinační vazb", "donor", "akceptor"]),
    ("vodíkový můstek", ["vodíkov", "můstek", "můstky"]),
    ("van der Waalsovy / disperzní síly", ["van der Waals", "disperzní"]),
    ("krystalová mřížka", ["krystalová mřížka", "mřížk"]),
    ("paramagnetismus, diamagnetismus", ["paramagnet", "diamagnet"]),
    ("oxidační číslo", ["oxidační čísl"]),
    ("redoxní reakce", ["oxidace", "redukce"]),
    ("standardní redukční potenciál", ["redukční potenciál", "Beketov"]),
    ("disproporcionace", ["disproporcion"]),
    ("amfoterita", ["amfoter"]),
    ("Le Chatelier", ["Le Chatelier", "Chatelier"]),
    ("rovnovážná konstanta", ["rovnovážná konstanta", "rovnovážné konstanty"]),
    ("katalýza", ["katalyz", "katalýz"]),
    ("efekt inertního páru", ["inertního páru", "inertní pár"]),
    ("delokalizace, mezomerie", ["delokaliz", "mezomer", "rezonan"]),
    ("Lewisova struktura", ["Lewisov"]),
    ("pásová teorie", ["pásov", "vodivostní pás", "valenční pás"]),
    ("teorie krystalového pole", ["krystalového pole", "ligandov"]),
    ("lanthanoidová kontrakce", ["kontrakce"]),
]

gen_files = [f for f in sorted(glob.glob(os.path.join(GEN, "*.html")))
             if not f.endswith("index.html")]
ano_files = [f for f in sorted(glob.glob(os.path.join(ANO, "*.html")))
             if not f.endswith("index.html")]

gen_gloss = {}
for f in gen_files:
    for t in gloss(f):
        gen_gloss.setdefault(t.lower(), os.path.basename(f))
gen_body = {os.path.basename(f): body_text(f) for f in gen_files}
ano_body = {os.path.basename(f): body_text(f) for f in ano_files}

print("slovníček obecné chemie: %d hesel napříč %d okruhy" % (len(gen_gloss), len(gen_files)))
print("anorganika: %d okruhů hotových\n" % len(ano_files))
print("%-40s %8s %8s %-28s %s" % ("pojem", "v anorg", "v obecné", "slovníček obecné", "kde nejvíc"))
print("-" * 118)

gaps = []
for name, pats in CONCEPTS:
    a = sum(sum(b.lower().count(p.lower()) for p in pats) for b in ano_body.values())
    per_gen = {k: sum(v.lower().count(p.lower()) for p in pats) for k, v in gen_body.items()}
    g = sum(per_gen.values())
    top = max(per_gen, key=per_gen.get) if g else "—"
    ing = "ano" if any(any(p.lower() in t for p in pats) for t in gen_gloss) else "ne"
    print("%-40s %8d %8d %-28s %s" % (name[:40], a, g, ing, top.replace(".html", "") if g else "—"))
    if a >= 5 and (g < 5 or ing == "ne"):
        gaps.append((name, a, g, ing, top.replace(".html", "") if g else "—"))

print("\n\n### KANDIDÁTI NA MEZERU (anorganika používá ≥5×, obecná málo nebo není ve slovníčku)")
for name, a, g, ing, top in sorted(gaps, key=lambda x: -x[1]):
    print("  %-40s anorg %4d × | obecná %4d × | slovníček: %-4s | nejvíc v %s" % (name, a, g, ing, top))
