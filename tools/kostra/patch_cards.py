# -*- coding: utf-8 -*-
"""patch_cards.py — jednotný vzhled karet na celém webu:
silnější obrys (2px), akcentní pruh nahoře, měkký stín v klidu, víc vzduchu."""
import io, os, re, sys
sys.stdout.reconfigure(encoding="utf-8")
HERE = os.path.dirname(os.path.abspath(__file__))

SHADOW = ("box-shadow:0 1px 2px rgba(33,27,21,.07),0 6px 16px rgba(33,27,21,.09);")
SHADOW_DARK = ("box-shadow:0 2px 6px rgba(0,0,0,.5),0 8px 20px rgba(0,0,0,.38);")

CARD_RULE = """
/* ---- CARD-LIFT: karty zřetelně oddělené od pozadí ---- */
.tile,.pcard,.tcard{
  border:2px solid var(--line-strong)!important;
  border-top:4px solid var(--accent)!important;
  border-radius:16px!important;
  %s
}
@media (prefers-color-scheme:dark){ :root:not([data-theme="light"]) .tile,
  :root:not([data-theme="light"]) .pcard, :root:not([data-theme="light"]) .tcard{ %s } }
:root[data-theme="dark"] .tile, :root[data-theme="dark"] .pcard,
:root[data-theme="dark"] .tcard{ %s }
.tile:hover,.pcard:hover,.tcard:hover{ border-color:var(--accent)!important;
  border-top-color:var(--accent)!important }
.tile.soon{ border-style:dashed!important;border-top-style:solid!important }
/* víc vzduchu kolem i uvnitř */
.tile,.pcard,.tcard{ padding:clamp(1.35rem,2.3vw,1.85rem) clamp(1.4rem,2.4vw,1.9rem) }
.tiles,.pair-grid,.preset{ gap:clamp(1rem,1.9vw,1.4rem)!important }
.pair{ padding:clamp(1rem,1.8vw,1.35rem)!important }
""" % (SHADOW, SHADOW_DARK, SHADOW_DARK)


def patch(path, anchor, label):
    if not os.path.exists(path):
        print("  přeskočeno (chybí):", label); return False
    s = io.open(path, encoding="utf-8").read()
    if "CARD-LIFT" in s:
        s = re.sub(r'\n/\* ---- CARD-LIFT.*?\n(?=[^\s])', "\n", s, flags=re.S)
    if anchor not in s:
        print("  KOTVA NENALEZENA:", label); return False
    s = s.replace(anchor, anchor + CARD_RULE, 1)
    io.open(path, "w", encoding="utf-8", newline="\n").write(s)
    print("  upraveno:", label)
    return True


print("vzhled karet:")
# 1) make_site.py — .tile (úvod, okruhy, i obě aplikace, které TILES importují)
patch(os.path.join(HERE, "make_site.py"),
      '.tile.big{min-height:236px}', "make_site.py (.tile)")

# 2) make_testy.py — .pcard
patch(os.path.join(HERE, "make_testy.py"),
      '.pcard.custom{border-style:dashed}', "make_testy.py (.pcard)")

# 3) make_spolu.py — .tcard
p = os.path.join(HERE, "make_spolu.py")
if os.path.exists(p):
    s = io.open(p, encoding="utf-8").read()
    m = re.search(r'\.tcard\{[^}]*\}', s)
    if m:
        patch(p, m.group(0), "make_spolu.py (.tcard)")
    else:
        print("  .tcard v make_spolu.py nenalezeno")
else:
    print("  make_spolu.py nenalezen")
