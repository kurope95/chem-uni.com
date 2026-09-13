# -*- coding: utf-8 -*-
"""Přesune tlačítko Zpátky na levý okraj horní lišty (před značku)."""
import io, os, sys
sys.stdout.reconfigure(encoding="utf-8")

P = os.path.join(os.path.dirname(os.path.abspath(__file__)), "make_site.py")
s = io.open(P, encoding="utf-8").read()

OLD = '''    return """<header class="bar"><div class="bar-in">
  <a class="brand" href="%s"><span class="dot">Ch</span><span>%s</span></a>
  <span class="sp"></span>
  %s%s
  <button class="iconbtn" id="themeBtn" type="button" aria-label="Přepnout režim"></button>
</div></header>
""" % (home, SITE["name"], crumb_html, b)'''

NEW = '''    return """<header class="bar"><div class="bar-in">
  %s<a class="brand" href="%s"><span class="dot">Ch</span><span>%s</span></a>
  <span class="sp"></span>
  %s
  <button class="iconbtn" id="themeBtn" type="button" aria-label="Přepnout režim"></button>
</div></header>
""" % (b, home, SITE["name"], crumb_html)'''

assert OLD in s, "kotva topbar nenalezena"
s = s.replace(OLD, NEW, 1)

# oddělit tlačítko od značky svislou linkou
OLD_CSS = ".back:hover svg{transform:translateX(-3px)}"
NEW_CSS = (".back:hover svg{transform:translateX(-3px)}\n"
           ".bar-in .back{margin-right:.35rem;padding-right:.9rem;"
           "border-right:1px solid var(--line-strong)}\n"
           ".bar-in .back + .brand{padding-left:.15rem}")
assert OLD_CSS in s, "kotva CSS .back nenalezena"
s = s.replace(OLD_CSS, NEW_CSS, 1)

io.open(P, "w", encoding="utf-8", newline="\n").write(s)
print("topbar: Zpátky přesunuto doleva před značku")
