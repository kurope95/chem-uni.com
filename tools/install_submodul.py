# -*- coding: utf-8 -*-
"""Zařadí pod-modul do sekce Jak počítat a doplní mu navigaci zpět.

    Doučovanie/zlomky-a-zavorky.html  →  Doučovanie/jak-pocitat/zlomky-a-zavorky/index.html

Odkaz zpět míří na rozcestník Počítání (`../../pocitani/index.html`), jehož je pod-modul jednou ze tří dlaždic.
"""
import io, os, re, shutil, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "kostra"))
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

from make_site import NAV_CSS, NAV_JS, ARL, MARK

ROOT = r"C:\Claude Code\Claude Code\Doučovanie"
SRC = os.path.join(ROOT, "zlomky-a-zavorky.html")
DSTDIR = os.path.join(ROOT, "jak-pocitat", "zlomky-a-zavorky")
DST = os.path.join(DSTDIR, "index.html")

# pod-modul je jedna ze tří dlaždic rozcestníku Počítání, zpátky vede tam
BACK_HREF = "../../pocitani/index.html"
BACK_TEXT = "Zpátky na Počítání"


def inject(s):
    if MARK in s:
        s = re.sub(r"\n<style>\s*/\* ---- " + MARK + r".*?</style>", "", s, flags=re.S)
        s = re.sub(r"\n<script>\s*/\* " + MARK + r".*?</script>", "", s, flags=re.S)
        s = re.sub(r'<div class="sitenav">.*?</div>\s*', "", s, flags=re.S)
        s = re.sub(r'<a class="sitenav-m".*?</a>\s*', "", s, flags=re.S)
    link = ('<div class="sitenav"><a href="%s">%s<span>%s</span></a></div>\n    '
            % (BACK_HREF, ARL, BACK_TEXT))
    s, n1 = re.subn(r'(<aside class="rail">\s*\n\s*)(<div class="rail-brand">)',
                    lambda m: m.group(1) + link + m.group(2), s, count=1)
    mob = ('<a class="sitenav-m" href="%s" aria-label="%s">%s</a>\n      '
           % (BACK_HREF, BACK_TEXT, ARL))
    s, n2 = re.subn(r'(<div class="topbar-row">\s*\n\s*)(<div class="name">)',
                    lambda m: m.group(1) + mob + m.group(2), s, count=1)
    s, n3 = re.subn(r'\n</head>', "\n<style>" + NAV_CSS + "</style>\n</head>", s, count=1)
    s, n4 = re.subn(r'\n</body>', "\n<script>" + NAV_JS + "</script>\n</body>", s, count=1)
    return s, (n1, n2, n3, n4)


def main():
    if not os.path.exists(SRC):
        if os.path.exists(DST):
            print("už zařazeno:", DST); return 0
        print("CHYBA: nenalezen", SRC); return 1
    s = io.open(SRC, encoding="utf-8").read()
    before = len(s.encode())
    s, n = inject(s)
    if not all(n):
        print("CHYBA vkládání navigace: rail=%d topbar=%d head=%d body=%d" % n); return 1
    os.makedirs(DSTDIR, exist_ok=True)
    io.open(DST, "w", encoding="utf-8", newline="\n").write(s)
    os.remove(SRC)
    print("zařazeno: %s" % os.path.relpath(DST, ROOT))
    print("  %.1f KB → %.1f KB (navigace zpět: %s)"
          % (before / 1024, len(s.encode()) / 1024, BACK_HREF))
    return 0


if __name__ == "__main__":
    sys.exit(main())
