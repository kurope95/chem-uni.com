# -*- coding: utf-8 -*-
"""Doplní do make_site.py zvýraznění testů a udělá injektáž aktualizovatelnou."""
import io, os, sys
sys.stdout.reconfigure(encoding="utf-8")

P = os.path.join(os.path.dirname(os.path.abspath(__file__)), "make_site.py")
s = io.open(P, encoding="utf-8").read()

# ---------- 1) CSS zvýraznění testů ----------
CSS_ANCHOR = """.sitenav-m:hover{background:var(--accent-soft);border-color:var(--accent);color:var(--accent)}
}
\"\"\" % MARK"""

CSS_NEW = """.sitenav-m:hover{background:var(--accent-soft);border-color:var(--accent);color:var(--accent)}
}

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
\"\"\" % MARK"""

assert CSS_ANCHOR in s, "kotva CSS nenalezena"
s = s.replace(CSS_ANCHOR, CSS_NEW, 1)

# ---------- 2) inject(): starý blok odstranit a vložit znovu ----------
old = (
    'def inject(path, check=False):\n'
    '    s = io.open(path, encoding="utf-8").read()\n'
    '    if MARK in s:\n'
    '        new = s.replace(\'href="maturitni-okruhy.html"\', \'href="index.html"\')\n'
    '        if new != s and not check:\n'
    '            io.open(path, "w", encoding="utf-8", newline="\\n").write(new)\n'
    '            return "odkaz srovnán"\n'
    '        return "beze změny"\n'
)
new = (
    'def inject(path, check=False):\n'
    '    s = io.open(path, encoding="utf-8").read()\n'
    '    orig = s\n'
    '    if MARK in s:\n'
    '        # odstranit dřívější vložený blok, aby šel aktualizovat\n'
    '        s = re.sub(r"\\n<style>\\s*/\\* ---- " + MARK + r".*?</style>", "", s, flags=re.S)\n'
    '        s = re.sub(r"\\n<script>\\s*/\\* " + MARK + r".*?</script>", "", s, flags=re.S)\n'
    '        s = re.sub(r\'<div class="sitenav">.*?</div>\\s*\', "", s, flags=re.S)\n'
    '        s = re.sub(r\'<a class="sitenav-m".*?</a>\\s*\', "", s, flags=re.S)\n'
)
assert old in s, "kotva inject nenalezena"
s = s.replace(old, new, 1)

old_ret = ('    if not check:\n'
           '        io.open(path, "w", encoding="utf-8", newline="\\n").write(s)\n'
           '    return "vloženo"')
new_ret = ('    if not check:\n'
           '        io.open(path, "w", encoding="utf-8", newline="\\n").write(s)\n'
           '    return "aktualizováno (%+d B)" % (len(s.encode()) - len(orig.encode()))')
assert old_ret in s, "kotva return nenalezena"
s = s.replace(old_ret, new_ret, 1)

io.open(P, "w", encoding="utf-8", newline="\n").write(s)
print("make_site.py aktualizován")
