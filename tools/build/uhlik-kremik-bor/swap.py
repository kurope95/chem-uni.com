# -*- coding: utf-8 -*-
"""Přesune správnou odpověď na jinou pozici prohozením dvou možností."""
import io, re, sys
sys.stdout.reconfigure(encoding="utf-8")

def parse_opts(s):
    """Rozdělí obsah pole o:[...] na jednotlivé řetězce. Uvozovky uvnitř textu nejsou."""
    assert s.startswith('"') and s.endswith('"'), "nečekaný tvar pole"
    return s[1:-1].split('","')

def swap_line(path, lineno, a, b, oldc, newc):
    lines = io.open(path, encoding="utf-8").read().split("\n")
    L = lines[lineno-1]
    m = re.search(r'o:\[(.*)\],c:(\d+),\s*$', L)
    assert m, "nenalezeno: %s:%d" % (path, lineno)
    assert int(m.group(2)) == oldc, "jiné c na %s:%d" % (path, lineno)
    opts = parse_opts(m.group(1))
    assert len(opts) == 4, "nečekaný počet možností na %s:%d" % (path, lineno)
    opts[a], opts[b] = opts[b], opts[a]
    lines[lineno-1] = L[:m.start()] + 'o:[' + ",".join('"'+o+'"' for o in opts) + '],c:' + str(newc) + ','
    io.open(path, "w", encoding="utf-8", newline="\n").write("\n".join(lines))
    print("OK  %-20s r.%-4d c:%d -> c:%d" % (path, lineno, oldc, newc))

# c:1 -> c:0  (prohodit možnost 0 a 1) — sedm otázek
for p, l in [("50-bank-a.js", 6), ("50-bank-a.js", 36), ("50-bank-a.js", 69), ("50-bank-a.js", 99),
             ("51-bank-b.js", 48), ("51-bank-b.js", 75), ("52-bank-final.js", 24)]:
    swap_line(p, l, 0, 1, 1, 0)

# c:2 -> c:3  (prohodit možnost 2 a 3) — tři otázky
for p, l in [("50-bank-a.js", 78), ("51-bank-b.js", 36), ("52-bank-final.js", 60)]:
    swap_line(p, l, 2, 3, 2, 3)
