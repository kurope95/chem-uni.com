# -*- coding: utf-8 -*-
"""kniha_pages.py — vytáhne stránky skenované knihy jako čitelné PNG.

    python kniha_pages.py <od_strany> <do_strany> [výstupní_složka]

Čísla jsou **tištěná čísla stránek v knize**, ne pořadí v PDF (skript si posun
dopočítá sám: strana v PDF = strana v knize − 2).

Sken je zrcadlený a otočený, skript to narovná (mirror + rot180) a zmenší,
aby se dal pohodlně číst. Výstup: <složka>/kn_<číslo strany>.png
"""
import io as _io
import os, sys

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

from pypdf import PdfReader
from PIL import Image, ImageOps

PDF = r"C:\Claude Code\Claude Code\Doučovanie\Klikorka_Obecna_a_anorganicka_chemie.pdf"
OFFSET = 2          # strana v PDF (1-based) = strana v knize − OFFSET
SCALE = 0.58        # zmenšení, ať je stránka čitelná a přitom levná


def extract(first, last, outdir, scale=SCALE):
    os.makedirs(outdir, exist_ok=True)
    r = PdfReader(PDF)
    done, missing = [], []
    for book_page in range(first, last + 1):
        idx = book_page - OFFSET - 1          # 0-based index v PDF
        if idx < 0 or idx >= len(r.pages):
            missing.append(book_page); continue
        imgs = [i for i in r.pages[idx].images if len(i.data) > 2000]
        if not imgs:
            missing.append(book_page); continue
        im = Image.open(_io.BytesIO(imgs[0].data)).convert("L")
        im = ImageOps.mirror(im.rotate(180, expand=True))
        w, h = im.size
        im = im.resize((int(w * scale), int(h * scale)))
        p = os.path.join(outdir, "kn_%03d.png" % book_page)
        im.save(p, optimize=True)
        done.append(p)
    print("vytaženo stran: %d  →  %s" % (len(done), outdir))
    if done:
        print("  první: %s" % os.path.basename(done[0]))
        print("  poslední: %s" % os.path.basename(done[-1]))
        mb = sum(os.path.getsize(p) for p in done) / 1048576
        print("  celkem %.1f MB" % mb)
    if missing:
        print("  bez obrázku / mimo rozsah:", missing)
    return done


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(__doc__); sys.exit(2)
    a, b = int(sys.argv[1]), int(sys.argv[2])
    out = sys.argv[3] if len(sys.argv) > 3 else os.path.join(
        os.path.dirname(os.path.abspath(__file__)), "kniha", "s%03d_%03d" % (a, b))
    extract(a, b, out)
