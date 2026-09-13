# -*- coding: utf-8 -*-
"""install_section.py <slug> — přesune hotového průvodce do vlastní sekce webu
a vloží do něj navigaci (Zpátky na úvod) i zvýraznění testů.

    python install_section.py jak-pocitat
"""
import io, os, re, sys, shutil

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass
import make_site as MS


def install(slug, back_href="../index.html", back_label="Zpátky na úvod"):
    src = os.path.join(MS.OUT, slug + ".html")
    dstdir = os.path.join(MS.OUT, slug)
    dst = os.path.join(dstdir, "index.html")
    if os.path.exists(src):
        os.makedirs(dstdir, exist_ok=True)
        shutil.move(src, dst)
        print("přesunuto: %s.html -> %s/index.html" % (slug, slug))
    elif not os.path.exists(dst):
        print("CHYBA: nenalezen ani %s.html, ani %s/index.html" % (slug, slug)); return False

    s = io.open(dst, encoding="utf-8").read()
    orig = s
    # odstranit případný dřívější vložený blok
    s = re.sub(r'\n<style>\s*/\* ---- ' + MS.MARK + r'.*?</style>', "", s, flags=re.S)
    s = re.sub(r'\n<script>\s*/\* ' + MS.MARK + r'.*?</script>', "", s, flags=re.S)
    s = re.sub(r'<div class="sitenav">.*?</div>\s*', "", s, flags=re.S)
    s = re.sub(r'<a class="sitenav-m".*?</a>\s*', "", s, flags=re.S)

    link = ('<div class="sitenav"><a href="%s">%s<span>%s</span></a></div>\n    '
            % (back_href, MS.ARL, back_label))
    s, n1 = re.subn(r'(<aside class="rail">\s*\n\s*)(<div class="rail-brand">)',
                    lambda m: m.group(1) + link + m.group(2), s, count=1)
    mob = ('<a class="sitenav-m" href="%s" aria-label="%s">%s</a>\n      '
           % (back_href, back_label, MS.ARL))
    s, n2 = re.subn(r'(<div class="topbar-row">\s*\n\s*)(<div class="name">)',
                    lambda m: m.group(1) + mob + m.group(2), s, count=1)
    s, n3 = re.subn(r'\n</head>', "\n<style>" + MS.NAV_CSS + "</style>\n</head>", s, count=1)
    s, n4 = re.subn(r'\n</body>', "\n<script>" + MS.NAV_JS + "</script>\n</body>", s, count=1)
    if not (n1 and n2 and n3 and n4):
        print("CHYBA vkládání: rail=%d topbar=%d head=%d body=%d" % (n1, n2, n3, n4)); return False
    io.open(dst, "w", encoding="utf-8", newline="\n").write(s)
    print("navigace vložena (%+d B), odkaz Zpátky -> %s" % (len(s.encode()) - len(orig.encode()), back_href))
    print("velikost: %.0f KB" % (len(s.encode()) / 1024))
    return True


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(2)
    ok = install(sys.argv[1])
    sys.exit(0 if ok else 1)
