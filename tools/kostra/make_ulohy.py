# -*- coding: utf-8 -*-
"""make_ulohy.py — Sbírka řešených úloh z analytické chemie.

Vezme autorovy hotové stránky s řešenými úlohami (tools/ulohy/src/<slug>.html) a složí z nich
stránky webu analyticka-chemie/ulohy/<slug>.html:
  * nahoře lišta webu (logo, drobečková navigace, Zpátky, nabídka jazyků, motiv),
    dole patička s autorem; obsah úlohy zůstává, jak ho autor napsal,
  * rámečky podle pravidla webu (2px okraj + pruh nahoře + stín, viz CLAUDE.md)
    a akcentní barva webu,
  * kolize s kostrou webu: třída .sp → .u-sp, obecné footer{} → footer.u-foot,
    vlastní <main> dostane id="obsah" (cíl odkazu Přeskočit na obsah).
Seznam úloh a texty menu (CZ/SK/EN) jsou v site_data.ANALYT_ULOHY.

    python make_ulohy.py            # pak make_site.py (překlad lišty) a i18n.py --check
"""
import io, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass
import make_site as MS
from site_data import SITE, GROUPS, ANALYT_ULOHY
from i18n import L, Lk

SRC = os.path.join(HERE, "..", "ulohy", "src")
OUT = os.path.join(MS.OUT, "analyticka-chemie", "ulohy")

OVERRIDES = """
/* ---- ULOHA-WEB: napojení řešené úlohy na web ---- */
/* lišta webu se posouvá s obsahem: úloha má vlastní přilepenou lištu kroků */
.bar{position:relative}
/* akcent jako zbytek webu */
:root{--accent:#9b3320;--accent-2:#7e2718;--accent-soft:rgba(155,51,32,.12);--accent-ring:rgba(155,51,32,.5);
  --u-shadow:0 1px 2px rgba(33,27,21,.07),0 6px 16px rgba(33,27,21,.09)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--accent:#e0785c;--accent-2:#ef8c71;
  --accent-soft:rgba(224,120,92,.16);--accent-ring:rgba(224,120,92,.55);
  --u-shadow:0 2px 6px rgba(0,0,0,.5),0 8px 20px rgba(0,0,0,.38)}}
:root[data-theme="dark"]{--accent:#e0785c;--accent-2:#ef8c71;--accent-soft:rgba(224,120,92,.16);
  --accent-ring:rgba(224,120,92,.55);--u-shadow:0 2px 6px rgba(0,0,0,.5),0 8px 20px rgba(0,0,0,.38)}
/* rámečky: výrazný okraj bez výjimky (CLAUDE.md) */
.card{border:2px solid var(--line-strong);border-top:4px solid var(--accent);border-radius:16px;box-shadow:var(--u-shadow)}
.tile{border:2px solid var(--line-strong);border-top:4px solid var(--accent);border-radius:16px;box-shadow:var(--u-shadow)}
.dat,.dil-card,.crow,details.el,.chain .node{border:2px solid var(--line-strong);box-shadow:var(--u-shadow)}
.q .opt,.route a,.toggle{border:2px solid var(--line-strong)}
.topnav{border-bottom:2px solid var(--line-strong)}
"""


def transform(src):
    head = src[:src.index("<body")]
    body = src[src.index(">", src.index("<body")) + 1:src.rindex("</body>")]
    fonts = "\n".join(re.findall(r'<link[^>]+(?:fonts\.googleapis|fonts\.gstatic)[^>]*>', head))
    css = "\n".join(re.findall(r"<style[^>]*>(.*?)</style>", head, re.S))
    # kolize s kostrou webu (i ve <style> uvnitř těla stránky)
    def fix_css(c):
        c = re.sub(r"\.sp(?![\w-])", ".u-sp", c)
        return re.sub(r"(^|[}\s,])footer\{", r"\1footer.u-foot{", c)
    css = fix_css(css)
    body = re.sub(r"(<style[^>]*>)(.*?)(</style>)", lambda m: m.group(1) + fix_css(m.group(2)) + m.group(3),
                  body, flags=re.S)
    body = re.sub(r'(class=\\?["\'])sp(?=[\s"\'\\])', r"\1u-sp", body)
    body = re.sub(r"(['\"])\.sp(?=['\"\s,:.])", r"\1.u-sp", body)
    body = re.sub(r"<footer>", '<footer class="u-foot">', body)
    body, n = re.subn(r"<main>", '<main id="obsah">', body, count=1)
    if not n:
        raise SystemExit("CHYBA: v úloze chybí <main>")
    return fonts, css, body


def build(u):
    src = io.open(os.path.join(SRC, u["slug"] + ".html"), encoding="utf-8").read()
    fonts, css, body = transform(src)
    grp = [g for g in GROUPS if g["id"] == "analytika"][0]
    h = MS.head(u["title"] + " \u2014 " + SITE["name"], u["sub"], MS.TOKENS + MS.CHROME)
    h = h.replace("</head>", fonts + "\n</head>", 1)
    h += MS.topbar("../../index.html",
                   MS.crumb((L("Úvod"), "../../index.html"),
                            (Lk(grp, "title"), "../index.html"),
                            (L("Sbírka řešených úloh"), "../index.html#ulohy"),
                            (Lk(u, "title"), None)),
                   back=("../index.html", "Zpátky na analytickou chemii"))
    h += "<style>" + css + "\n</style>\n<style>" + OVERRIDES + "</style>\n"
    h += body.strip() + "\n"
    h += MS.foot() + MS.theme_script()
    return h


def main():
    os.makedirs(OUT, exist_ok=True)
    for u in ANALYT_ULOHY:
        h = build(u)
        p = os.path.join(OUT, u["slug"] + ".html")
        io.open(p, "w", encoding="utf-8", newline="\n").write(h)
        print("%-44s %6.1f KB" % ("analyticka-chemie/ulohy/" + u["slug"] + ".html", len(h.encode()) / 1024))


if __name__ == "__main__":
    main()
