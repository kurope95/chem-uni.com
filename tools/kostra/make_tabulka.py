# -*- coding: utf-8 -*-
"""make_tabulka.py — vygeneruje sekci „Periodická tabulka".

Výstup: C:\\Claude Code\\Claude Code\\Doučovanie\\periodicka-tabulka\\index.html

Staví se stejně jako make_testy.py a make_spolu.py: bere z make_site.py TOKENS,
CHROME, TILES, HERO, head(), topbar(), foot(), theme_script() a ARL/ARR, takže
stránka sedí se zbytkem webu. Komponenta .calcsheet je převzatá ze stránky
„Jak počítat chemii", aby výpočtové listy vypadaly všude stejně.

Před zápisem se spustí tabulka_data.check() — když najde nesmysl v datech prvků,
stránka se nezapíše.
"""
import io, os, sys, json
from decimal import Decimal, ROUND_HALF_UP

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

import make_site as MS
from site_data import SITE
import tabulka_data as TD
from tabulka_js import ENGINE

OUT = os.path.join(MS.OUT, "periodicka-tabulka")


# ============================================================ pomocné formáty
def cz(s):
    return s.replace(".", ",")


def ar_full(e):
    """Relativní atomová hmotnost, jak se zapisuje v tabulce."""
    if e["unst"]:
        return "[%d]" % round(e["ar"])
    return cz(TD.AR_TEXT.get(e["sym"], "%g" % e["ar"]))


def ar_short(e):
    """Ar na dlaždici. Nejdelší zápis má šest znaků, takže se vejde celý —
    zaokrouhluje se jen tam, kde je platných číslic víc než pět."""
    if e["unst"]:
        return "[%d]" % round(e["ar"])
    d = Decimal(TD.AR_TEXT.get(e["sym"], repr(e["ar"])))
    digits = len(d.as_tuple().digits)
    if digits <= 5:
        return cz(format(d, "f"))
    q = Decimal(1).scaleb(d.adjusted() - 4)     # pět platných číslic
    return cz(format(d.quantize(q, rounding=ROUND_HALF_UP), "f"))


# ============================================================ CSS
CALCSHEET = """
/* ============================================================
   VÝPOČTOVÝ LIST — komponenta .calcsheet převzatá ze stránky
   „Jak počítat chemii", aby to byl očividně tentýž list
   ============================================================ */
:root{--endo:var(--teal);--endo-soft:var(--teal-soft)}
.calcsheet{
  counter-reset:csb;
  border:1px solid var(--line-strong);border-radius:14px;background:var(--surface);
  box-shadow:var(--shadow-1);overflow:hidden;margin:1.35rem 0;
  font-variant-numeric:lining-nums tabular-nums;
}
.calcsheet + .calcsheet{margin-top:1.6rem}
.cs-head{
  display:flex;align-items:baseline;gap:.55rem;flex-wrap:wrap;
  padding:.7rem 1.15rem;background:
    repeating-linear-gradient(0deg,transparent 0 15px,var(--grid) 15px 16px),
    repeating-linear-gradient(90deg,transparent 0 15px,var(--grid) 15px 16px),
    var(--surface-2);
  border-bottom:2px solid var(--line-strong);
}
.cs-head .cs-id{font-family:var(--f-cond);font-weight:700;font-size:.74rem;letter-spacing:.12em;
  text-transform:uppercase;color:var(--accent);white-space:nowrap}
.cs-head .cs-topic{font-family:var(--f-ui);font-size:.94rem;font-weight:600;color:var(--ink);
  letter-spacing:-.012em;flex:1;min-width:120px;line-height:1.35}
.cs-head .cs-kind{font-family:var(--f-cond);font-weight:600;font-size:.66rem;letter-spacing:.11em;
  text-transform:uppercase;color:var(--ink-3);border:1px solid var(--line-strong);
  border-radius:99px;padding:.16rem .5rem;white-space:nowrap}
.cs-task{padding:.8rem 1.15rem;font-family:var(--f-ui);font-size:.95rem;line-height:1.55;
  color:var(--ink);background:var(--surface);border-bottom:1px solid var(--line)}
.cs-block{display:grid;grid-template-columns:6.9rem minmax(0,1fr);gap:.3rem 1.1rem;
  padding:.8rem 1.15rem;border-top:1px solid var(--line);align-items:start}
.cs-block:first-child{border-top:0}
.cs-lbl{font-family:var(--f-cond);font-weight:700;font-size:.7rem;letter-spacing:.13em;
  text-transform:uppercase;color:var(--ink-3);line-height:1.5;
  display:flex;align-items:baseline;gap:.4rem;padding-top:.12rem}
.cs-lbl::before{counter-increment:csb;content:counter(csb);
  font-family:var(--f-mono);font-size:.66rem;font-weight:600;letter-spacing:0;
  width:1.15rem;height:1.15rem;border-radius:50%;flex:none;
  background:var(--surface-3);color:var(--ink-3);
  display:inline-grid;place-items:center;transform:translateY(.1rem)}
.cs-rows{display:flex;flex-direction:column;gap:.26rem;min-width:0}
.cs-row{display:grid;grid-template-columns:4.6rem minmax(0,1fr) auto;gap:.1rem .6rem;align-items:baseline}
.cs-sym{font-family:var(--f-ui);font-style:italic;font-weight:600;font-size:1rem;
  color:var(--ink);text-align:right;white-space:nowrap}
.cs-sym sub,.cs-sym sup{font-style:normal}
.cs-val{font-family:var(--f-mono);font-size:.95rem;color:var(--ink);
  font-variant-numeric:lining-nums tabular-nums;line-height:1.6;min-width:0}
.cs-conv{color:var(--accent);font-weight:500}
.cs-note{font-family:var(--f-ui);font-size:.8rem;color:var(--ink-3);
  text-align:right;line-height:1.45;font-style:italic}
.cs-line{font-family:var(--f-mono);font-size:.97rem;line-height:1.75;color:var(--ink);
  font-variant-numeric:lining-nums tabular-nums;overflow-x:auto;padding:.05rem 0;white-space:nowrap}
.cs-line b{color:var(--accent);font-weight:600}
.cs-line em{font-style:italic;color:var(--ink-3);font-family:var(--f-ui);font-size:.86rem;white-space:normal}
.cs-line.wrap{white-space:normal}
.cs-line.units{color:var(--endo);font-size:.9rem;background:var(--endo-soft);
  border-radius:7px;padding:.3rem .6rem;display:block;margin-top:.15rem;
  white-space:normal;overflow-wrap:anywhere;line-height:1.55}
.cs-line.units b{color:var(--endo)}
.cs-hint{font-family:var(--f-ui);font-size:.8rem;color:var(--ink-3);line-height:1.5;
  margin-top:.18rem;font-style:italic}
.cs-block.res{border-top:2px solid var(--line-strong);background:var(--surface-2);
  padding-top:.95rem;padding-bottom:.95rem}
.cs-block.res .cs-lbl{color:var(--accent)}
.cs-block.res .cs-lbl::before{background:var(--accent);color:var(--accent-ink)}
.cs-ans{font-family:var(--f-ui);font-size:.99rem;line-height:1.6;color:var(--ink)}
.cs-hi{font-family:var(--f-mono);font-size:1.02rem;font-weight:600;color:var(--accent);
  background:var(--accent-soft);border-radius:7px;padding:.1rem .45rem;
  white-space:nowrap;font-variant-numeric:lining-nums tabular-nums}
.cs-block.chk{background:var(--endo-soft);border-top:1px dashed var(--line-strong)}
.cs-block.chk .cs-lbl{color:var(--endo)}
.cs-block.chk .cs-lbl::before{background:var(--endo);color:var(--surface)}
.cs-chk{font-family:var(--f-ui);font-size:.9rem;line-height:1.6;color:var(--ink-2)}
.calcsheet.bad{border-color:var(--bad);background:var(--bad-soft)}
.calcsheet.bad .cs-head{border-bottom-color:var(--bad);background:var(--bad-soft)}
.calcsheet.bad .cs-head .cs-id{color:var(--bad)}
.calcsheet.bad .cs-block{border-top-color:var(--bad);opacity:.96}
.cs-flaw{font-family:var(--f-ui);font-size:.86rem;line-height:1.5;color:var(--bad);
  display:flex;gap:.4rem;align-items:flex-start;margin-top:.2rem}
.cs-flaw::before{content:"✕";font-weight:700;flex:none}
@media (max-width:700px){
  .cs-block{grid-template-columns:minmax(0,1fr);gap:.34rem}
  .cs-lbl{padding-top:0}
  .cs-row{grid-template-columns:3.6rem minmax(0,1fr)}
  .cs-note{grid-column:2;text-align:left;margin-top:-.1rem}
  .cs-line{font-size:.88rem}
}
"""

PTCSS = """
[hidden]{display:none!important}
.mono{font-family:var(--f-mono)}
.wrap.wide{max-width:1460px}
:root{
  --ok:#3f7a34;--ok-soft:#eaf2e4;--bad:#a62f3b;--bad-soft:#f8e4e6;--warn:#8a6410;
  --pt-c1:#f0c9bf;  --pt-c2:#f6dcb6;  --pt-c3:#f0e7ad;  --pt-c4:#d8e8b0;  --pt-c5:#b8ddb9;
  --pt-c6:#b6ded9;  --pt-c7:#bfd8ee;  --pt-c8:#cdcfee;  --pt-c9:#e0cbee;  --pt-c10:#f2c9e0;
  --pt-na:#e2dacc;
  --sc-lo:#f8f1e2;  --sc-hi:#cd7c4f;
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
  --ok:#7fc08a;--ok-soft:#19291b;--bad:#ee7a90;--bad-soft:#301820;--warn:#dcae5b;
  --pt-c1:#4d2b22;  --pt-c2:#4a391d;  --pt-c3:#43401b;  --pt-c4:#34401e;  --pt-c5:#21402b;
  --pt-c6:#1c403e;  --pt-c7:#20374e;  --pt-c8:#2b2c4e;  --pt-c9:#3c294b;  --pt-c10:#49263f;
  --pt-na:#2b241d;
  --sc-lo:#221c16;  --sc-hi:#94502c;
}}
:root[data-theme="dark"]{
  --ok:#7fc08a;--ok-soft:#19291b;--bad:#ee7a90;--bad-soft:#301820;--warn:#dcae5b;
  --pt-c1:#4d2b22;  --pt-c2:#4a391d;  --pt-c3:#43401b;  --pt-c4:#34401e;  --pt-c5:#21402b;
  --pt-c6:#1c403e;  --pt-c7:#20374e;  --pt-c8:#2b2c4e;  --pt-c9:#3c294b;  --pt-c10:#49263f;
  --pt-na:#2b241d;
  --sc-lo:#221c16;  --sc-hi:#94502c;
}

/* ---------------- ovládací prvky ---------------- */
.segmented{display:inline-flex;flex-wrap:wrap;gap:2px;padding:3px;border:1px solid var(--line-strong);
  border-radius:12px;background:var(--surface-2)}
.segmented button{font:inherit;font-family:var(--f-ui);font-size:.855rem;font-weight:600;
  padding:.5rem .8rem;min-height:40px;border:0;border-radius:9px;background:transparent;
  color:var(--ink-2);cursor:pointer;transition:background .14s,color .14s;
  -webkit-tap-highlight-color:transparent}
.segmented button:hover{background:var(--surface);color:var(--ink)}
.segmented button[aria-pressed="true"]{background:var(--accent);color:var(--accent-ink)}
.btn-sm{font-size:.83rem;padding:.5rem .85rem;min-height:40px;border-radius:10px}
.txtin{font-family:var(--f-mono);font-size:1.02rem;padding:.7rem .85rem;min-height:48px;
  border:1px solid var(--line-strong);border-radius:11px;background:var(--surface);
  color:var(--ink);width:100%}
.txtin:focus{border-color:var(--accent);outline:none;box-shadow:0 0 0 3px var(--accent-soft)}
.fldlbl{font-family:var(--f-cond);font-weight:600;font-size:.72rem;letter-spacing:.11em;
  text-transform:uppercase;color:var(--ink-3);display:block;margin-bottom:.35rem}

/* ---------------- kalkulačka ---------------- */
.calcbox{border:2px solid var(--line-strong);border-top:4px solid var(--accent);border-radius:16px;
  background:var(--surface);padding:clamp(1.1rem,2.2vw,1.7rem);margin-top:1.4rem;
  box-shadow:0 1px 2px rgba(33,27,21,.07),0 6px 16px rgba(33,27,21,.09)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .calcbox{
  box-shadow:0 2px 6px rgba(0,0,0,.5),0 8px 20px rgba(0,0,0,.38)}}
:root[data-theme="dark"] .calcbox{box-shadow:0 2px 6px rgba(0,0,0,.5),0 8px 20px rgba(0,0,0,.38)}
.fxrow{display:flex;gap:.8rem;align-items:flex-end;flex-wrap:wrap}
.fxrow .grow{flex:1 1 320px;min-width:0}
.fbadge{font-family:var(--f-mono);font-size:.92rem;font-weight:600;padding:.6rem .9rem;min-height:48px;
  display:inline-flex;align-items:center;border-radius:11px;border:1px dashed var(--line-strong);
  background:var(--surface-2);color:var(--ink-3);white-space:nowrap}
.fbadge.ok{border-style:solid;border-color:var(--accent);background:var(--accent-soft);color:var(--accent)}
.chips{display:flex;flex-wrap:wrap;gap:.35rem;margin-top:.7rem}
.chips button{font-family:var(--f-mono);font-size:.82rem;padding:.35rem .6rem;min-height:34px;
  border:1px solid var(--line);border-radius:8px;background:var(--surface-2);color:var(--ink-2);
  cursor:pointer}
.chips button:hover{border-color:var(--accent);color:var(--accent)}
.chips .chlbl{font-family:var(--f-cond);font-weight:600;font-size:.7rem;letter-spacing:.1em;
  text-transform:uppercase;color:var(--ink-3);align-self:center;margin-right:.2rem}
#calcTabs{margin-top:1.2rem}
.pane{margin-top:.4rem}
.pane .paneintro{font-family:var(--f-ui);font-size:.92rem;line-height:1.6;color:var(--ink-2);
  margin-top:.9rem;max-width:70ch}
.mnngrid{display:grid;gap:.8rem;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));margin-top:1rem}
.emptynote{font-family:var(--f-ui);font-size:.92rem;line-height:1.6;color:var(--ink-3);
  border:1px dashed var(--line-strong);border-radius:12px;padding:1rem 1.1rem;margin-top:1.2rem}
.wbarwrap{margin-top:.4rem}
.wbarlbl{font-family:var(--f-cond);font-weight:600;font-size:.72rem;letter-spacing:.11em;
  text-transform:uppercase;color:var(--ink-3);margin-bottom:.4rem}
.wbar{display:flex;height:30px;border-radius:9px;overflow:hidden;border:1px solid var(--line-strong)}
.wseg{display:flex;align-items:center;justify-content:center;min-width:0;overflow:hidden}
.wseg i{font-style:normal;font-family:var(--f-mono);font-size:.78rem;font-weight:600;color:var(--ink)}
.wlegend{display:flex;flex-wrap:wrap;gap:.3rem .9rem;margin-top:.45rem;
  font-family:var(--f-mono);font-size:.8rem;color:var(--ink-2)}
.wlegend i{display:inline-block;width:11px;height:11px;border-radius:3px;margin-right:.35rem;
  border:1px solid var(--line-strong);vertical-align:-1px}

/* ---------------- tabulka ---------------- */
.ptbar{display:flex;flex-wrap:wrap;gap:.8rem 1rem;align-items:flex-end;margin-top:1.2rem}
.ptbar .sp{flex:1;min-width:0}
.srchwrap{position:relative;flex:0 1 300px}
.srchwrap input{padding-right:2.4rem}
.srchwrap button{position:absolute;right:.45rem;top:50%;transform:translateY(-50%);
  width:30px;height:30px;border-radius:8px;border:1px solid var(--line);background:var(--surface-2);
  color:var(--ink-3);cursor:pointer;line-height:1}
.srchwrap button:hover{border-color:var(--accent);color:var(--accent)}
.ptfound{font-family:var(--f-ui);font-size:.86rem;color:var(--ink-2);margin-top:.5rem;min-height:1.3em}
.lastwrap{font-family:var(--f-ui);font-size:.85rem;color:var(--ink-3);margin-top:.35rem}
.lastwrap button{font:inherit;font-weight:600;color:var(--accent);background:none;border:0;
  padding:0;cursor:pointer;text-decoration:underline}

.ptlegend{display:flex;flex-wrap:wrap;gap:.4rem .95rem;margin-top:1rem;
  font-family:var(--f-ui);font-size:.83rem;color:var(--ink-2);align-items:center}
.lgc{display:inline-flex;align-items:center;gap:.4rem}
.lgc i{width:14px;height:14px;border-radius:4px;border:1px solid var(--line-strong);flex:none}
.lgscale{display:inline-flex;align-items:center;gap:.55rem;flex-wrap:wrap}
.lgscale b{font-family:var(--f-cond);font-weight:600;font-size:.72rem;letter-spacing:.1em;
  text-transform:uppercase;color:var(--ink-3)}
.lgbar{display:inline-block;width:clamp(120px,22vw,240px);height:13px;border-radius:99px;
  border:1px solid var(--line-strong);
  background:linear-gradient(90deg,var(--sc-lo),
    color-mix(in oklab,var(--sc-hi) 50%,var(--sc-lo)),var(--sc-hi))}
.lgends{display:inline-flex;gap:.5rem;font-family:var(--f-mono);font-size:.8rem;color:var(--ink-2)}
.lgends span:first-child::after{content:" →";color:var(--ink-3)}

.ptscroll{overflow-x:auto;overflow-y:hidden;margin-top:1rem;padding:.3rem .1rem 1rem;
  border:1px solid var(--line);border-radius:14px;background:var(--surface-2)}
.pt{--cell:clamp(56px,4.55vw,70px);display:grid;width:max-content;margin:0 auto;padding:.5rem .6rem;
  grid-template-columns:1.5rem repeat(18,var(--cell));
  grid-template-rows:1.15rem repeat(7,calc(var(--cell)*1.2)) .8rem repeat(2,calc(var(--cell)*1.2));
  gap:3px}
.pthead,.ptside,.ptfside{font-family:var(--f-mono);font-size:.7rem;color:var(--ink-3);
  display:grid;place-items:center}
.ptside,.ptfside{font-size:.78rem;font-weight:600}
.ptfside{color:var(--ink-3);opacity:.7}
.ptc{display:flex;flex-direction:column;align-items:center;justify-content:center;
  position:relative;border:1px solid var(--line-strong);border-radius:8px;background:var(--pt-na);
  color:var(--ink);cursor:pointer;padding:1px;overflow:hidden;font:inherit;text-align:center;
  transition:transform .12s,box-shadow .12s,opacity .18s;-webkit-tap-highlight-color:transparent}
.ptc:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(33,27,21,.22);z-index:3}
.ptc:focus-visible{outline:3px solid var(--focus);outline-offset:2px;z-index:4}
.ptc .pz{position:absolute;top:2px;left:4px;font-family:var(--f-mono);font-size:.55rem;
  line-height:1;opacity:.78}
.ptc .ps{font-family:var(--f-ui);font-weight:700;line-height:1.02;letter-spacing:-.02em;
  font-size:calc(var(--cell)*.35);margin-top:.28em}
.ptc .pn{font-family:var(--f-ui);line-height:1.15;font-size:max(8px,calc(var(--cell)*.152));
  max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 1px;opacity:.9}
.ptc .pa{font-family:var(--f-mono);line-height:1.15;font-size:max(7.5px,calc(var(--cell)*.145));
  opacity:.75}
.ptc.ph{border-style:dashed;background:var(--surface-3)}
.ptc.ph .ps{font-size:calc(var(--cell)*.2);margin-top:0}
.ptc.sel{box-shadow:0 0 0 3px var(--accent);z-index:5}
.pt.searching .ptc{opacity:.22}
.pt.searching .ptc.hit{opacity:1;box-shadow:0 0 0 2px var(--accent);z-index:4}
.pt.highlighting .ptc{opacity:.2}
.pt.highlighting .ptc.hi{opacity:1;box-shadow:0 0 0 2px var(--accent);z-index:4}
/* klepnutí na zástupný odkaz zvýrazní celý řádek lanthanoidů / aktinoidů */
.pt.flashf1 .ptc.fb1,.pt.flashf2 .ptc.fb2{box-shadow:0 0 0 2px var(--accent);
  transform:translateY(-2px);z-index:3}
.hinote{display:flex;flex-wrap:wrap;gap:.4rem .8rem;align-items:center;margin-top:.7rem;
  font-family:var(--f-ui);font-size:.89rem;color:var(--ink);border:1px solid var(--accent);
  background:var(--accent-soft);border-radius:11px;padding:.55rem .85rem}
.hinote button{font:inherit;font-weight:600;color:var(--accent);background:none;border:0;
  padding:0;cursor:pointer;text-decoration:underline}

/* ---------------- vyskakovací panel detailu ---------------- */
.dscrim{position:fixed;inset:0;z-index:59;background:rgba(20,15,10,.45);
  -webkit-backdrop-filter:blur(1.5px);backdrop-filter:blur(1.5px)}
@media (min-width:1100px){ .dscrim{display:none} }
.detail{position:fixed;z-index:60;background:var(--surface);
  border:2px solid var(--line-strong);border-top:4px solid var(--accent);border-radius:18px;
  overflow-y:auto;overscroll-behavior:contain;
  box-shadow:0 18px 50px rgba(33,27,21,.28),0 4px 14px rgba(33,27,21,.16);
  animation:dpop .16s cubic-bezier(.2,.7,.3,1)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .detail{
  box-shadow:0 18px 50px rgba(0,0,0,.7),0 4px 14px rgba(0,0,0,.5)}}
:root[data-theme="dark"] .detail{
  box-shadow:0 18px 50px rgba(0,0,0,.7),0 4px 14px rgba(0,0,0,.5)}
@media (min-width:1100px){
  .detail{top:74px;right:14px;bottom:14px;width:min(410px,33vw)}
  body.has-detail{padding-right:min(440px,34vw)}
  @keyframes dpop{from{opacity:0;transform:translateX(22px)}to{opacity:1;transform:none}}
}
@media (max-width:1099px){
  .detail{left:10px;right:10px;bottom:10px;top:auto;max-height:76vh;width:auto}
  @keyframes dpop{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
}
.dhead{display:flex;align-items:center;gap:.8rem;padding:1rem 1.1rem;
  border-bottom:2px solid var(--line-strong);position:sticky;top:0;z-index:2}
.dsym{display:flex;flex-direction:column;align-items:center;line-height:1;flex:none;
  min-width:3.6rem;color:var(--ink)}
.dsym .dz{font-family:var(--f-mono);font-size:.72rem;opacity:.8}
.dsym b{font-family:var(--f-ui);font-size:1.9rem;font-weight:700;letter-spacing:-.03em;margin:.1rem 0}
.dsym .dar{font-family:var(--f-mono);font-size:.72rem;opacity:.85}
.dname{flex:1;min-width:0;color:var(--ink)}
.dname h3{font-size:1.25rem;font-weight:700;letter-spacing:-.02em}
.dname span{font-family:var(--f-ui);font-size:.82rem;opacity:.8}
.dclose{width:36px;height:36px;flex:none;border-radius:9px;border:1px solid var(--line-strong);
  background:color-mix(in srgb,var(--surface) 65%,transparent);color:var(--ink);cursor:pointer;
  font-size:1rem;line-height:1}
.dclose:hover{background:var(--surface)}
.dbody{padding:1rem 1.1rem 2.4rem;display:flex;flex-direction:column;gap:1.1rem}
.dnote{font-family:var(--f-ui);font-size:.94rem;line-height:1.6;color:var(--ink-2);
  border-left:3px solid var(--accent);padding-left:.8rem}
.dgrp h4{font-family:var(--f-cond);font-weight:700;font-size:.72rem;letter-spacing:.13em;
  text-transform:uppercase;color:var(--accent);margin:0 0 .45rem}
.drow{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);gap:.3rem .7rem;
  padding:.3rem 0;border-bottom:1px solid var(--line);align-items:baseline}
.drow:last-child{border-bottom:0}
.dk{font-family:var(--f-ui);font-size:.84rem;color:var(--ink-3)}
.dv{font-family:var(--f-ui);font-size:.9rem;color:var(--ink);overflow-wrap:anywhere}
.dv .mono{font-family:var(--f-mono);font-size:.85rem}
.dv em{font-family:var(--f-ui);font-style:italic;font-size:.78rem;color:var(--ink-3)}
.dart{margin-top:.6rem;display:grid;place-items:center}
.dart svg{width:min(220px,70%);height:auto}
.dacts{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.4rem}

/* ---------------- odkazy dál ---------------- */
.golinks{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));margin-top:1.3rem}
.golink{display:flex;flex-direction:column;gap:.4rem;padding:1.2rem 1.35rem;text-decoration:none;
  border:2px solid var(--line-strong);border-top:4px solid var(--accent);border-radius:16px;
  background:var(--surface);color:var(--ink)}
.golink:hover{border-color:var(--accent)}
.golink b{font-family:var(--f-ui);font-size:1.05rem;font-weight:700}
.golink span{font-family:var(--f-ui);font-size:.9rem;line-height:1.55;color:var(--ink-2)}
.golink .go{font-family:var(--f-cond);font-weight:600;font-size:.74rem;letter-spacing:.11em;
  text-transform:uppercase;color:var(--accent);display:inline-flex;align-items:center;gap:.4rem}

/* ---------------- přepínač pohledů ---------------- */
.viewpick{display:grid;gap:clamp(1rem,1.9vw,1.4rem);
  grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr));
  padding-top:clamp(1.8rem,3.5vw,2.8rem)}
.vtile{font:inherit;text-align:left;width:100%;cursor:pointer;
  min-height:clamp(160px,17vw,206px);align-items:flex-start}
.vtile h3{margin:0}
.vtile .desc{max-width:42ch}
.vtile[aria-selected="true"]{background:var(--accent-soft);
  border-color:var(--accent)!important;border-top-color:var(--accent)!important}
.vtile[aria-selected="true"]::after{opacity:1}
.vtile[aria-selected="true"] .n{color:var(--accent)}
.vtile[aria-selected="false"]{opacity:.78;filter:saturate(.8)}
.vtile[aria-selected="false"]:hover{opacity:1;filter:none}
.vtile .state{display:inline-flex;align-items:center;gap:.4rem;font-family:var(--f-cond);
  font-weight:600;font-size:.74rem;letter-spacing:.11em;text-transform:uppercase;
  color:var(--accent);margin-top:.5rem}
.vtile[aria-selected="false"] .state{color:var(--ink-3)}
.vtile .state .dot{width:9px;height:9px;border-radius:50%;flex:none;
  border:2px solid currentColor;background:transparent}
.vtile[aria-selected="true"] .state .dot{background:currentColor}
.view{scroll-margin-top:70px}

/* ---------------- výklad stavby tabulky ---------------- */
.expl{display:grid;gap:clamp(1rem,1.8vw,1.4rem);
  grid-template-columns:repeat(auto-fit,minmax(min(330px,100%),1fr));margin-top:1.5rem}
.ecard{display:flex;flex-direction:column;gap:.6rem;min-width:0;
  border:2px solid var(--line-strong);border-top:4px solid var(--accent);border-radius:16px;
  background:var(--surface);padding:clamp(1.15rem,2.1vw,1.6rem);
  box-shadow:0 1px 2px rgba(33,27,21,.07),0 6px 16px rgba(33,27,21,.09)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .ecard{
  box-shadow:0 2px 6px rgba(0,0,0,.5),0 8px 20px rgba(0,0,0,.38)}}
:root[data-theme="dark"] .ecard{box-shadow:0 2px 6px rgba(0,0,0,.5),0 8px 20px rgba(0,0,0,.38)}
.ecard.wide{grid-column:1/-1}
.ecard .ek{font-family:var(--f-cond);font-weight:600;font-size:.72rem;letter-spacing:.13em;
  text-transform:uppercase;color:var(--accent)}
.ecard h3{font-size:1.16rem;font-weight:700;letter-spacing:-.022em}
.ecard p{font-family:var(--f-ui);font-size:.93rem;line-height:1.62;color:var(--ink-2)}
.ecard p b,.ecard li b{color:var(--ink);font-weight:600}
.ecard ul{margin:.1rem 0 0;padding-left:1.1rem;display:flex;flex-direction:column;gap:.32rem;
  font-family:var(--f-ui);font-size:.92rem;line-height:1.55;color:var(--ink-2)}
.ecard ul li::marker{color:var(--accent)}
.enote{border-left:3px solid var(--warn);background:var(--surface-2);padding:.6rem .85rem;
  border-radius:0 10px 10px 0;font-family:var(--f-ui);font-size:.87rem;line-height:1.55;
  color:var(--ink-2)}
.enote b{color:var(--ink)}
.enote.tip{border-left-color:var(--teal)}
.etabwrap{overflow-x:auto;border:1px solid var(--line);border-radius:11px;background:var(--surface-2)}
.etab{width:100%;border-collapse:collapse;font-family:var(--f-ui);font-size:.86rem}
.etab th{text-align:left;padding:.45rem .6rem;border-bottom:1px solid var(--line-strong);
  font-family:var(--f-cond);font-weight:600;font-size:.71rem;letter-spacing:.09em;
  text-transform:uppercase;color:var(--ink-2);white-space:nowrap}
.etab td{padding:.38rem .6rem;border-bottom:1px solid var(--line);color:var(--ink-2)}
.etab tr:last-child td{border-bottom:0}
.etab td.n,.etab th.n{text-align:right;font-family:var(--f-mono);font-variant-numeric:tabular-nums;
  white-space:nowrap}
.etab .mono{font-family:var(--f-mono);font-size:.92em;color:var(--ink)}
.etab tbody tr:hover{background:var(--surface)}
.hichips{display:flex;flex-wrap:wrap;gap:.32rem;margin-top:auto;padding-top:.75rem}
.hichips button{font-family:var(--f-ui);font-size:.8rem;padding:.32rem .62rem;min-height:34px;
  border:1px solid var(--line-strong);border-radius:99px;background:var(--surface-2);
  color:var(--ink-2);cursor:pointer;transition:background .14s,color .14s,border-color .14s}
.hichips button:hover{border-color:var(--accent);color:var(--accent);background:var(--accent-soft)}
.hichips button[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);
  color:var(--accent-ink)}
.hichips .hl{font-family:var(--f-cond);font-weight:600;font-size:.68rem;letter-spacing:.1em;
  text-transform:uppercase;color:var(--ink-3);align-self:center;margin-right:.15rem}
.blkart{margin:.3rem 0 .1rem;overflow-x:auto}
.blkart svg{width:100%;min-width:280px;height:auto;display:block}
.blkleg{display:flex;flex-wrap:wrap;gap:.35rem .9rem;margin-top:.5rem;
  font-family:var(--f-ui);font-size:.83rem;color:var(--ink-2)}
.blkleg i{display:inline-block;width:13px;height:13px;border-radius:4px;margin-right:.35rem;
  border:1px solid var(--line-strong);vertical-align:-2px}

/* ---------------- toast ---------------- */
.toast{position:fixed;left:50%;bottom:1.4rem;transform:translate(-50%,140%);z-index:80;
  background:var(--ink);color:var(--paper);font-family:var(--f-ui);font-size:.88rem;
  padding:.7rem 1.1rem;border-radius:11px;box-shadow:var(--shadow-3);
  transition:transform .25s cubic-bezier(.2,.7,.3,1);pointer-events:none;max-width:90vw}
.toast.on{transform:translate(-50%,0)}
"""


# ============================================================ hero grafika
def grid_art():
    cells = []
    for e in TD.ELEMENTS:
        if e["grp"] is None:
            r = 8 if e["z"] <= 71 else 9
            c = 3 + (e["z"] - (57 if e["z"] <= 71 else 89))
        else:
            r = e["per"] - 1
            c = e["grp"] - 1
        cells.append((c, r, e["blk"]))
    cells.append((2, 5, "ph"))
    cells.append((2, 6, "ph"))
    op = {"s": ".40", "p": ".24", "d": ".13", "f": ".32", "ph": ".07"}
    rects = []
    for c, r, b in cells:
        rects.append('<rect x="%.1f" y="%.1f" width="8.2" height="8.2" rx="1.5" '
                     'fill="currentColor" fill-opacity="%s"/>' % (c * 10, r * 10, op[b]))
    return ('<svg class="hero-art alt" width="470" height="270" viewBox="-2 -2 184 104" '
            'fill="none" stroke="currentColor" stroke-width="0.65" aria-hidden="true">'
            + "".join(rects) + "</svg>")


BLKC = {"s": 1, "p": 7, "d": 3, "f": 5}


def cell_pos(e):
    """Souřadnice prvku ve schématu: (sloupec 0–17, řádek 0–6, f-blok 8–9)."""
    if e["grp"] is None:
        return (3 + (e["z"] - (57 if e["z"] <= 71 else 89)),
                8 if e["z"] <= 71 else 9)
    return (e["grp"] - 1, e["per"] - 1)


def block_art():
    """Schéma tabulky obarvené podle bloků — stejnými barvami jako režim „blok"."""
    rects = []
    for e in TD.ELEMENTS:
        c, r = cell_pos(e)
        rects.append('<rect x="%.0f" y="%.0f" width="8.4" height="8.4" rx="1.6" '
                     'fill="var(--pt-c%d)" stroke="var(--line-strong)" stroke-width="0.4"/>'
                     % (c * 10, r * 10, BLKC[e["blk"]]))
    for c, r in ((2, 5), (2, 6)):
        rects.append('<rect x="%.0f" y="%.0f" width="8.4" height="8.4" rx="1.6" fill="none" '
                     'stroke="var(--line-strong)" stroke-width="0.5" stroke-dasharray="2 1.6"/>'
                     % (c * 10, r * 10))
    lbl = []
    for txt, x, y in (("s", 5, 26), ("p", 155, 16), ("d", 75, 46), ("f", 95, 86)):
        lbl.append('<text x="%d" y="%d" font-family="var(--f-ui)" font-size="9" '
                   'font-weight="700" fill="var(--ink)" text-anchor="middle">%s</text>'
                   % (x, y, txt))
    # svislá čára ukazující, kam f-blok patří
    lbl.append('<path d="M25.5 58 L25.5 74 L34 74 L34 80" fill="none" stroke="var(--accent)" '
               'stroke-width="0.9" stroke-dasharray="2.4 2" />')
    return ('<div class="blkart"><svg viewBox="-1 -1 182 102" role="img" '
            'aria-label="Schéma periodické tabulky obarvené podle bloků s, p, d a f">'
            + "".join(rects) + "".join(lbl) + '</svg></div>'
            '<div class="blkleg">'
            '<span><i style="background:var(--pt-c1)"></i>blok s — 2 sloupce</span>'
            '<span><i style="background:var(--pt-c7)"></i>blok p — 6 sloupců</span>'
            '<span><i style="background:var(--pt-c3)"></i>blok d — 10 sloupců</span>'
            '<span><i style="background:var(--pt-c5)"></i>blok f — 14 sloupců</span>'
            '</div>')


TABLE_IC = ('<svg class="ic" width="230" height="230" viewBox="0 0 100 100" fill="none" '
            'stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true">'
            '<rect x="8" y="14" width="18" height="18" rx="3"/>'
            '<rect x="8" y="36" width="18" height="18" rx="3"/>'
            '<rect x="8" y="58" width="18" height="18" rx="3"/>'
            '<rect x="30" y="36" width="18" height="18" rx="3"/>'
            '<rect x="30" y="58" width="18" height="18" rx="3"/>'
            '<rect x="52" y="14" width="18" height="18" rx="3"/>'
            '<rect x="52" y="36" width="18" height="18" rx="3"/>'
            '<rect x="52" y="58" width="18" height="18" rx="3"/>'
            '<rect x="74" y="14" width="18" height="18" rx="3"/>'
            '<rect x="74" y="36" width="18" height="18" rx="3"/>'
            '<rect x="30" y="80" width="62" height="12" rx="3"/></svg>')

CALC_IC = ('<svg class="ic" width="230" height="230" viewBox="0 0 100 100" fill="none" '
           'stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">'
           '<path d="M16 50h68"/>'
           '<text x="50" y="40" text-anchor="middle" font-size="26" font-family="serif" '
           'font-style="italic" fill="currentColor" stroke="none">m</text>'
           '<text x="50" y="82" text-anchor="middle" font-size="26" font-family="serif" '
           'font-style="italic" fill="currentColor" stroke="none">M</text></svg>')


def view_tiles():
    t = ('<div class="viewpick" role="tablist" aria-label="Přepínač pohledů">')
    t += ('<button class="tile big vtile" type="button" role="tab" id="vTabulka" '
          'data-view="tabulka" aria-selected="true" aria-controls="viewTabulka" tabindex="0">'
          + TABLE_IC +
          '<span class="n">Pohled 1</span>'
          '<h3>Periodická tabulka</h3>'
          '<span class="desc">Všech 118 prvků s ověřenými údaji. Šest režimů obarvení, '
          'hledání podle značky i&nbsp;českého názvu, detail prvku ve vyskakovacím panelu '
          'a&nbsp;pod mřížkou výklad, jak je tabulka poskládaná.</span>'
          '<span class="state"><span class="dot"></span>Zobrazeno</span>'
          '</button>')
    t += ('<button class="tile big vtile" type="button" role="tab" id="vPocitadlo" '
          'data-view="pocitadlo" aria-selected="false" aria-controls="viewPocitadlo" tabindex="-1">'
          + CALC_IC +
          '<span class="n">Pohled 2</span>'
          '<h3>Počítadlo</h3>'
          '<span class="desc">Molární hmotnost ze vzorce i&nbsp;s rozpisem, převod '
          'm&nbsp;↔&nbsp;n&nbsp;↔&nbsp;N, složení v&nbsp;procentech a&nbsp;empirický vzorec '
          'ze složení. U&nbsp;každého výsledku celý postup.</span>'
          '<span class="state"><span class="dot"></span>Přepnout sem</span>'
          '</button>')
    return t + '</div>'


# ============================================================ výklad stavby tabulky
def chips(pairs):
    """Štítky, které zvýrazní odpovídající prvky nahoře v mřížce."""
    h = '<div class="hichips"><span class="hl">Ukázat v tabulce</span>'
    for spec, label in pairs:
        h += ('<button type="button" aria-pressed="false" data-hi="%s" data-hl="%s">%s</button>'
              % (spec, label, label))
    return h + '</div>'


PERIODS = [
    ("1", "1s", 2, "H–He", "jen jeden orbital s"),
    ("2", "2s 2p", 8, "Li–Ne", "přibývají tři orbitaly p"),
    ("3", "3s 3p", 8, "Na–Ar", "orbital 3d se ještě nezaplňuje"),
    ("4", "4s 3d 4p", 18, "K–Kr", "poprvé se vkládá pět orbitalů d"),
    ("5", "5s 4d 5p", 18, "Rb–Xe", "stejné schéma o slupku výš"),
    ("6", "6s 4f 5d 6p", 32, "Cs–Rn", "poprvé se vkládá sedm orbitalů f"),
    ("7", "7s 5f 6d 7p", 32, "Fr–Og", "dokončena roku 2016 oganessonem"),
]

GROUPCOLS = [
    ("1", "I.A", "ns¹", "1"),
    ("2", "II.A", "ns²", "2"),
    ("3–12", "III.B–II.B", "(n−1)d¹⁻¹⁰ ns⁰⁻²", "3–12"),
    ("13", "III.A", "ns² np¹", "3"),
    ("14", "IV.A", "ns² np²", "4"),
    ("15", "V.A", "ns² np³", "5"),
    ("16", "VI.A", "ns² np⁴", "6"),
    ("17", "VII.A", "ns² np⁵", "7"),
    ("18", "VIII.A", "ns² np⁶", "8"),
]


def explain():
    h = '<section class="sec" id="stavbaSec">'
    h += ('<div class="sec-head"><h2>Jak je tabulka postavená</h2></div>'
          '<p class="intro">Tabulka není seznam seřazený podle hmotnosti — je to mapa '
          'elektronových obalů. Kdo pochopí, proč prvek stojí zrovna tam, kde stojí, '
          'nemusí si pamatovat skoro nic dalšího. Každý štítek '
          '<span class="mono">Ukázat v&nbsp;tabulce</span> zvýrazní odpovídající prvky '
          'nahoře v&nbsp;mřížce; dalším klepnutím zvýraznění zrušíte.</p>')
    h += '<div class="expl">'

    # ---- perioda ----
    h += ('<article class="ecard"><span class="ek">Vodorovný řádek</span>'
          '<h3>Perioda</h3>'
          '<p>Číslo periody se rovná <b>hlavnímu kvantovému číslu <span class="q">n</span> '
          'valenční slupky</b>. Prvky 3.&nbsp;periody mají valenční elektrony v&nbsp;n&nbsp;=&nbsp;3. '
          'Každá perioda začíná tím, že se otevře nová slupka — tedy alkalickým kovem — '
          'a&nbsp;končí vzácným plynem, kterému jsou orbitaly zaplněné.</p>'
          '<p>Periody nejsou stejně dlouhé, protože v&nbsp;každé přibývá jiná sada orbitalů. '
          'Pořadí zaplňování řídí <b>pravidlo n&nbsp;+&nbsp;l</b> (Madelungovo): dřív se zaplní '
          'orbital s&nbsp;nižším součtem n&nbsp;+&nbsp;l, a&nbsp;při shodě ten s&nbsp;nižším n. '
          'Proto se 4s zaplní dřív než 3d a&nbsp;6s dřív než 4f.</p>'
          '<div class="etabwrap"><table class="etab"><thead><tr>'
          '<th class="n">Perioda</th><th>Zaplňované orbitaly</th><th class="n">Prvků</th>'
          '<th>Od–do</th></tr></thead><tbody>')
    for n, orb, cnt, span, _ in PERIODS:
        h += ('<tr><td class="n">%s</td><td><span class="mono">%s</span></td>'
              '<td class="n">%d</td><td><span class="mono">%s</span></td></tr>'
              % (n, orb, cnt, span))
    h += '</tbody></table></div>'
    h += ('<p>Počet prvků v&nbsp;periodě je prostě počet elektronů, které se do těch orbitalů '
          'vejdou: s&nbsp;pojme 2, p&nbsp;6, d&nbsp;10 a&nbsp;f&nbsp;14. Odtud řada '
          '<span class="mono">2 · 8 · 8 · 18 · 18 · 32 · 32</span>: '
          '2&nbsp;=&nbsp;2, 2+6&nbsp;=&nbsp;8, 2+10+6&nbsp;=&nbsp;18, 2+14+10+6&nbsp;=&nbsp;32.</p>')
    h += chips([("per:%d" % i, "%d. perioda" % i) for i in range(1, 8)])
    h += '</article>'

    # ---- skupina ----
    h += ('<article class="ecard"><span class="ek">Svislý sloupec</span>'
          '<h3>Skupina</h3>'
          '<p>Prvky v&nbsp;jednom sloupci mají <b>stejnou valenční konfiguraci</b>, a&nbsp;proto '
          'se chovají podobně — v&nbsp;tom je celý periodický zákon. Sodík i&nbsp;draslík mají '
          'jeden elektron v&nbsp;orbitalu s, oba tedy snadno dávají kationt '
          '<span class="chem">M⁺</span>; kyslík i&nbsp;síra jim dvěma elektrony chybí '
          'do oktetu, oba proto tvoří <span class="chem">X²⁻</span>.</p>'
          '<p>Dnešní číslování IUPAC je průběžné <b>1&nbsp;až&nbsp;18</b> zleva doprava. '
          'Starší značení, které v&nbsp;českých učebnicích i&nbsp;tabulkách pořád potkáte, '
          'používá <b>římskou číslici s&nbsp;písmenem</b>: I.A až VIII.A pro hlavní '
          'podskupiny a&nbsp;I.B až VIII.B pro vedlejší.</p>'
          '<div class="etabwrap"><table class="etab"><thead><tr>'
          '<th>Skupina IUPAC</th>')
    for g, _, _, _ in GROUPCOLS:
        h += '<th class="n">%s</th>' % g
    h += '</tr></thead><tbody><tr><td>Starší značení</td>'
    for _, old, _, _ in GROUPCOLS:
        h += '<td class="n"><span class="mono">%s</span></td>' % old
    h += '</tr><tr><td>Valenční konfigurace</td>'
    for _, _, cfg, _ in GROUPCOLS:
        h += '<td class="n"><span class="mono">%s</span></td>' % cfg
    h += '</tr><tr><td>Valenčních elektronů</td>'
    for _, _, _, ve in GROUPCOLS:
        h += '<td class="n">%s</td>' % ve
    h += '</tr></tbody></table></div>'
    h += ('<p>U&nbsp;hlavních podskupin říká římská číslice rovnou <b>počet valenčních '
          'elektronů</b> — a&nbsp;s ním i&nbsp;nejvyšší kladné oxidační číslo. Síra je VI.A, '
          'má šest valenčních elektronů (<span class="mono">3s² 3p⁴</span>) a&nbsp;v kyselině '
          'sírové vystupuje jako <span class="chem">S<sup>VI</sup></span>.</p>'
          '<div class="enote"><b>Pozor na dvě neslučitelné staré konvence.</b> '
          'Evropská (kterou používají české tabulky a&nbsp;která je i&nbsp;tady) dává '
          'skupinám 3–12 písmeno&nbsp;B. Americká CAS je značí obráceně, takže třeba '
          'VI.B tam znamená skupinu&nbsp;16, ne&nbsp;6. Proto IUPAC zavedl číslování 1–18, '
          'u&nbsp;kterého nejde nic splést.</div>')
    h += chips([("grp:1", "1. skupina"), ("grp:2", "2. skupina"), ("grp:14", "14. skupina"),
                ("grp:16", "16. skupina"), ("grp:17", "17. skupina"), ("grp:18", "18. skupina")])
    h += '</article>'

    # ---- podskupiny ----
    h += ('<article class="ecard"><span class="ek">Písmena A a B</span>'
          '<h3>Hlavní a vedlejší podskupiny</h3>'
          '<p><b>Hlavní podskupiny (A)</b> jsou skupiny 1, 2 a&nbsp;13–18, tedy bloky '
          's&nbsp;a&nbsp;p. Valenční elektrony mají jen v&nbsp;orbitalech s&nbsp;a&nbsp;p '
          'nejvyšší obsazené slupky, a&nbsp;proto se chovají velmi pravidelně: '
          'vlastnosti se v&nbsp;rámci sloupce mění plynule a&nbsp;dají se předpovídat.</p>'
          '<p><b>Vedlejší podskupiny (B)</b> jsou skupiny 3–12, tedy blok&nbsp;d. '
          'Zaplňuje se jim orbital&nbsp;d o&nbsp;jednu slupku níž, než kde mají valenční '
          'elektrony&nbsp;s. Říká se jim <b>přechodné prvky</b>, protože stojí na přechodu '
          'mezi silně elektropozitivními kovy vlevo a&nbsp;nekovy vpravo.</p>'
          '<ul>'
          '<li><b>Proměnlivá oxidační čísla</b> — mangan zvládne od +II po +VII, protože '
          'energie elektronů 4s a&nbsp;3d jsou si blízké.</li>'
          '<li><b>Barevné sloučeniny</b> — za barvu můžou přechody elektronů mezi '
          'rozštěpenými orbitaly&nbsp;d.</li>'
          '<li><b>Tvorba komplexů</b> — prázdné orbitaly d přijímají elektronové páry ligandů.</li>'
          '<li><b>Katalytická aktivita</b> — proto platina v&nbsp;autokatalyzátoru '
          'a&nbsp;železo v&nbsp;Haberově–Boschově syntéze.</li>'
          '</ul>'
          '<div class="enote">Přísná definice říká, že přechodný prvek má částečně zaplněný '
          'orbital&nbsp;d — buď v&nbsp;atomu, nebo v&nbsp;některém běžném iontu. '
          'Zinek, kadmium a&nbsp;rtuť mají <span class="mono">d¹⁰</span> vždy, takže se '
          'z&nbsp;přechodných prvků někdy vyjímají. V&nbsp;tabulce ale ve 12.&nbsp;skupině '
          'stojí a&nbsp;pro maturitu se za přechodné kovy počítají.</div>')
    h += chips([("main", "hlavní podskupiny (A)"), ("sub", "vedlejší podskupiny (B)"),
                ("set:Zn,Cd,Hg", "sporná 12. skupina")])
    h += '</article>'

    # ---- bloky ----
    h += ('<article class="ecard"><span class="ek">Čtyři pásy</span>'
          '<h3>Bloky s, p, d a&nbsp;f</h3>'
          '<p>Blok se jmenuje podle orbitalu, který se v&nbsp;něm zaplňuje jako poslední. '
          'A&nbsp;jeho šířka není náhoda — odpovídá <b>kapacitě toho orbitalu</b>: '
          's&nbsp;je jeden orbital, tedy 2&nbsp;sloupce; p&nbsp;jsou tři orbitaly, tedy 6; '
          'd&nbsp;pět orbitalů, tedy 10; f&nbsp;sedm orbitalů, tedy 14.</p>'
          + block_art() +
          '<ul>'
          '<li><b>Blok s</b> — skupiny 1 a&nbsp;2. Měkké, reaktivní kovy, které elektrony '
          'ochotně odevzdávají.</li>'
          '<li><b>Blok p</b> — skupiny 13–18. Nejpestřejší blok: jsou v&nbsp;něm kovy, '
          'polokovy i&nbsp;všechny typické nekovy.</li>'
          '<li><b>Blok d</b> — skupiny 3–12. Tvrdé kovy s&nbsp;vysokými teplotami tání.</li>'
          '<li><b>Blok f</b> — lanthanoidy a&nbsp;aktinoidy, dva řádky pod tabulkou.</li>'
          '</ul>'
          '<div class="enote tip"><b>Helium je výjimka.</b> Konfiguraci má '
          '<span class="mono">1s²</span>, patří tedy do bloku&nbsp;s, ale vlastnostmi je '
          'to vzácný plyn — proto se kreslí nad neon do 18.&nbsp;skupiny.</div>')
    h += chips([("blk:s", "blok s"), ("blk:p", "blok p"), ("blk:d", "blok d"),
                ("blk:f", "blok f")])
    h += '</article>'

    # ---- lanthanoidy a aktinoidy ----
    h += ('<article class="ecard"><span class="ek">Dva řádky pod tabulkou</span>'
          '<h3>Proč se lanthanoidy a&nbsp;aktinoidy vytahují</h3>'
          '<p>Je to čistě otázka místa. Kdyby se blok&nbsp;f nakreslil tam, kam patří — '
          'mezi 2.&nbsp;a&nbsp;3.&nbsp;skupinu 6. a&nbsp;7.&nbsp;periody — byla by tabulka '
          'o&nbsp;<b>14 sloupců širší</b> a&nbsp;na stránku učebnice by se nevešla. '
          'Proto se 15 prvků <span class="chem">57–71</span> (lanthanoidy) a&nbsp;15 prvků '
          '<span class="chem">89–103</span> (aktinoidy) vysadí pod tabulku a&nbsp;na jejich '
          'místě zůstane jen zástupné políčko.</p>'
          '<p>Patří tedy do <b>6.&nbsp;a&nbsp;7. periody, do 3.&nbsp;skupiny</b> — v&nbsp;detailu '
          'prvku to tak i&nbsp;stojí. Lanthanoidy jsou si chemicky nesmírně podobné, skoro '
          'všechny dávají ionty <span class="chem">M³⁺</span>: zaplňuje se jim slupka&nbsp;4f '
          'schovaná hluboko pod valenčními elektrony, takže na chemii je skoro vidět není.</p>'
          '<div class="enote">Souvisí s&nbsp;tím <b>lanthanoidová kontrakce</b>: napříč '
          'lanthanoidy poloměr atomů pozvolna klesá, protože elektrony 4f jádro stíní špatně. '
          'Důsledek je, že zirkonium a&nbsp;hafnium mají skoro stejný poloměr a&nbsp;jdou '
          'od sebe oddělit jen s&nbsp;velkou námahou.</div>'
          '<div class="enote tip">Chemici se dodnes přou, jestli do bloku&nbsp;f patří lanthan '
          'a&nbsp;aktinium, nebo lutecium a&nbsp;lawrencium — lanthan má konfiguraci '
          '<span class="mono">[Xe] 5d¹ 6s²</span>, tedy žádný elektron&nbsp;4f. '
          'K&nbsp;maturitě stačí vědět, že se všech patnáct kreslí do řádku pod tabulkou.</div>')
    h += chips([("cat:lanthanoid", "lanthanoidy"), ("cat:aktinoid", "aktinoidy"),
                ("blk:f", "celý blok f")])
    h += '</article>'

    # ---- triviální názvy ----
    h += ('<article class="ecard"><span class="ek">Jak se skupinám říká</span>'
          '<h3>Triviální názvy</h3>'
          '<p>Některé sloupce mají vlastní jméno, které se v&nbsp;zadání úloh používá častěji '
          'než číslo skupiny. Tahle jména se prostě musí umět.</p>'
          '<ul>'
          '<li><b>Alkalické kovy</b> — 1. skupina bez vodíku (Li až Fr). S&nbsp;vodou reagují '
          'bouřlivě za vzniku hydroxidů, odtud jméno (alkálie = louh).</li>'
          '<li><b>Kovy alkalických zemin</b> — 2. skupina (Be až Ra). Jejich oxidy se dřív '
          'označovaly jako „zeminy“, protože se nerozpouštějí a&nbsp;netaví.</li>'
          '<li><b>Chalkogeny</b> — 16. skupina (O až Po). Řecky „rudotvorní“: většina rud '
          'jsou oxidy nebo sulfidy.</li>'
          '<li><b>Halogeny</b> — 17. skupina (F až At). Řecky „solitvorní“, s&nbsp;kovy dávají '
          'soli, například kuchyňskou sůl.</li>'
          '<li><b>Vzácné (inertní) plyny</b> — 18. skupina. Zaplněný oktet, proto skoro '
          'nereagují.</li>'
          '<li><b>Triáda železa</b> — <span class="chem">Fe, Co, Ni</span> ve 4.&nbsp;periodě. '
          'Jediné tři prvky, které jsou za pokojové teploty feromagnetické.</li>'
          '<li><b>Platinové kovy</b> — <span class="chem">Ru, Rh, Pd, Os, Ir, Pt</span>. '
          'Vzácné, ušlechtilé a&nbsp;výborné katalyzátory.</li>'
          '<li><b>Kovy vzácných zemin</b> — lanthanoidy plus skandium a&nbsp;yttrium. '
          'Vzácné vlastně nejsou, jen se špatně oddělují jeden od druhého.</li>'
          '</ul>'
          '<div class="enote"><b>Vodík mezi alkalické kovy nepatří.</b> Stojí v&nbsp;1. skupině, '
          'protože má jeden valenční elektron, ale je to nekov — dvouatomový plyn, který '
          'umí i&nbsp;přijmout elektron a&nbsp;dát hydridový aniont '
          '<span class="chem">H⁻</span>.</div>')
    h += chips([("cat:alkalický kov", "alkalické kovy"),
                ("cat:kov alkalických zemin", "kovy alkalických zemin"),
                ("grp:16", "chalkogeny"), ("cat:halogen", "halogeny"),
                ("cat:vzácný plyn", "vzácné plyny"),
                ("set:Fe,Co,Ni", "triáda železa"),
                ("set:Ru,Rh,Pd,Os,Ir,Pt", "platinové kovy"),
                ("set:Sc,Y,La,Ce,Pr,Nd,Pm,Sm,Eu,Gd,Tb,Dy,Ho,Er,Tm,Yb,Lu",
                 "kovy vzácných zemin")])
    h += '</article>'

    # ---- trendy ----
    h += ('<article class="ecard wide"><span class="ek">Co se mění a&nbsp;kterým směrem</span>'
          '<h3>Hlavní periodické trendy</h3>'
          '<p>Za všemi trendy stojí dvě věci: <b>náboj jádra</b>, který elektrony přitahuje, '
          'a&nbsp;<b>počet slupek</b>, které valenční elektron od jádra vzdalují a&nbsp;stíní.</p>'
          '<div class="etabwrap"><table class="etab"><thead><tr>'
          '<th>Veličina</th><th>V periodě doprava</th><th>Ve skupině dolů</th>'
          '<th>Proč</th></tr></thead><tbody>'
          '<tr><td>Atomový poloměr</td><td>klesá</td><td>roste</td>'
          '<td>doprava přibývá protonů při stejném počtu slupek, dolů přibývá slupek</td></tr>'
          '<tr><td>Ionizační energie</td><td>roste</td><td>klesá</td>'
          '<td>čím pevněji je elektron držen, tím hůř se odtrhne</td></tr>'
          '<tr><td>Elektronegativita</td><td>roste</td><td>klesá</td>'
          '<td>totéž z&nbsp;druhé strany: malý atom si elektrony vazby přitáhne</td></tr>'
          '<tr><td>Kovový charakter</td><td>klesá</td><td>roste</td>'
          '<td>kov elektrony odevzdává, nekov přijímá</td></tr>'
          '<tr><td>Poloměr iontu</td><td>—</td><td>roste</td>'
          '<td>kationt je vždy menší a&nbsp;aniont vždy větší než původní atom</td></tr>'
          '</tbody></table></div>'
          '<p>Krajní hodnoty si zapamatujte jako záchytné body: nejelektronegativnější je '
          '<b>fluor</b> (3,98), největší ionizační energii má <b>helium</b> '
          '(2372&nbsp;kJ·mol⁻¹), největší atom je <b>cesium</b> a&nbsp;nejmenší '
          '<b>vodík</b>. Trend ale není hladký — mezi berylliem a&nbsp;borem nebo mezi '
          'dusíkem a&nbsp;kyslíkem ionizační energie klesne, protože se začne obsazovat nový '
          'orbital, respektive se v&nbsp;jednom orbitalu poprvé spáruje dvojice elektronů. '
          'Podrobný výklad trendů i&nbsp;s výjimkami je v&nbsp;okruhu '
          '<b>Elektronový obal a periodická tabulka</b>, odkaz je dole na stránce.</p>'
          '<div class="hichips"><span class="hl">Ukázat jako barvu</span>'
          '<button type="button" data-showmode="en">elektronegativita</button>'
          '<button type="button" data-showmode="rad">atomový poloměr</button>'
          '<button type="button" data-showmode="ie">ionizační energie</button>'
          '</div>')
    h += '</article>'

    h += '</div></section>'
    return h


# ============================================================ pohled: tabulka
def table_view():
    h = '<div class="view" id="viewTabulka" role="tabpanel" aria-labelledby="vTabulka">'
    h += '<div class="wrap wide"><section class="sec" id="ptSec">'
    h += ('<div class="sec-head"><h2>Tabulka prvků</h2></div>'
          '<p class="intro">Klepnutím na prvek vyskočí panel se všemi údaji — na širokém '
          'displeji vpravo, na telefonu zespoda. Zavřete ho křížkem, klávesou Esc nebo '
          'klepnutím vedle. Po mřížce se dá chodit i&nbsp;šipkami. Lanthanoidy '
          'a&nbsp;aktinoidy jsou podle zvyklosti vyvedené do dvou řádků pod tabulkou.</p>')
    h += '<div class="ptbar">'
    h += ('<div class="srchwrap"><label class="fldlbl" for="ptSearch">Hledat prvek</label>'
          '<input class="txtin" type="search" id="ptSearch" autocomplete="off" '
          'placeholder="značka, český název nebo protonové číslo">'
          '<button type="button" id="ptClear" aria-label="Vymazat hledání">✕</button></div>')
    h += '<span class="sp"></span>'
    h += ('<div><span class="fldlbl">Obarvit podle</span>'
          '<div class="segmented" id="ptModes" role="group" aria-label="Režim obarvení tabulky">'
          '<button type="button" data-mode="cat" aria-pressed="true">Kategorie</button>'
          '<button type="button" data-mode="blk" aria-pressed="false">Blok s/p/d/f</button>'
          '<button type="button" data-mode="phase" aria-pressed="false">Skupenství</button>'
          '<button type="button" data-mode="en" aria-pressed="false">Elektronegativita</button>'
          '<button type="button" data-mode="rad" aria-pressed="false">Poloměr</button>'
          '<button type="button" data-mode="ie" aria-pressed="false">Ionizační energie</button>'
          '</div></div>')
    h += '</div>'
    h += '<p class="ptfound" id="ptFound" role="status"></p>'
    h += ('<p class="lastwrap" id="lastWrap" hidden>Naposledy prohlížené: '
          '<button type="button" id="lastBtn"><span id="lastEl"></span></button></p>')
    h += ('<p class="hinote" id="hiNote" hidden><span id="hiLabel"></span>'
          '<button type="button" id="hiClear">zrušit zvýraznění</button></p>')
    h += '<div class="ptlegend" id="ptLegend"></div>'
    h += '<div class="ptscroll"><div class="pt" id="pt"></div></div>'
    h += ('<p class="intro">Tabulka je širší než obrazovka telefonu — posouvá se do stran '
          've vlastním rámečku, stránka pod ní zůstává na místě.</p>')
    h += '</section>'
    h += explain()
    h += '</div></div>\n'
    return h


# ============================================================ pohled: počítadlo
def calc_view():
    h = ('<div class="view" id="viewPocitadlo" role="tabpanel" '
         'aria-labelledby="vPocitadlo" hidden>')
    h += '<div class="wrap"><section class="sec" id="calcSec">'
    h += ('<div class="sec-head"><h2>Počítadlo</h2></div>'
          '<p class="intro">Čtyři nástroje nad stejnými daty prvků. U&nbsp;každého výsledku '
          'dostanete i&nbsp;postup — stejný výpočtový list, jaký používá zbytek webu, '
          'abyste ho uměli napsat i&nbsp;na papír.</p>')
    h += '<div class="calcbox">'
    h += ('<div class="fxrow" id="fRow">'
          '<div class="grow"><label class="fldlbl" for="fInput">Vzorec sloučeniny</label>'
          '<input class="txtin" type="text" id="fInput" autocomplete="off" spellcheck="false" '
          'placeholder="např. CuSO4·5H2O" aria-describedby="fBadge"></div>'
          '<span class="fbadge" id="fBadge">zadejte vzorec</span>'
          '</div>')
    formulas = ["H2O", "H2SO4", "Ca(OH)2", "CuSO4·5H2O", "K3[Fe(CN)6]", "Al2(SO4)3",
                "NaHCO3", "C6H12O6", "2 H2O", "SO4^2-"]
    h += '<div class="chips" id="fChips"><span class="chlbl">Zkuste</span>'
    for c in formulas:
        h += '<button type="button" data-f="%s">%s</button>' % (c, c)
    h += '</div>'
    h += ('<div class="segmented" id="calcTabs" role="group" aria-label="Výběr nástroje">'
          '<button type="button" data-tool="mm" aria-pressed="true">Molární hmotnost</button>'
          '<button type="button" data-tool="mnn" aria-pressed="false">Převod m ↔ n ↔ N</button>'
          '<button type="button" data-tool="pct" aria-pressed="false">Složení v procentech</button>'
          '<button type="button" data-tool="emp" aria-pressed="false">Empirický vzorec</button>'
          '</div>')
    h += ('<div class="pane" id="pane_mm">'
          '<p class="paneintro">Parser zvládne víceznakové značky, vnořené i&nbsp;hranaté závorky, '
          'hydráty s&nbsp;tečkou nebo křížkem, koeficient před vzorcem i&nbsp;náboj. '
          'Když něco nesedí, řekne co.</p>'
          '<div id="outMM"></div></div>')
    h += ('<div class="pane" id="pane_mnn" hidden>'
          '<p class="paneintro">Vyplňte jedno pole a&nbsp;zbylá dvě se dopočítají. '
          'Přepisujte klidně dokola — počítá se vždy podle toho, do čeho jste psali naposledy.</p>'
          '<div class="mnngrid">'
          '<div><label class="fldlbl" for="inM">Hmotnost m [g]</label>'
          '<input class="txtin" type="text" inputmode="decimal" id="inM" autocomplete="off" '
          'placeholder="např. 25"></div>'
          '<div><label class="fldlbl" for="inN">Látkové množství n [mol]</label>'
          '<input class="txtin" type="text" inputmode="decimal" id="inN" autocomplete="off" '
          'placeholder="např. 0,25"></div>'
          '<div><label class="fldlbl" for="inNN">Počet částic N</label>'
          '<input class="txtin" type="text" inputmode="decimal" id="inNN" autocomplete="off" '
          'placeholder="např. 1,5·10²³"></div>'
          '</div><div id="outMNN"></div></div>')
    h += ('<div class="pane" id="pane_pct" hidden>'
          '<p class="paneintro">Hmotnostní zlomek říká, jaká část hmotnosti sloučeniny připadá '
          'na jeden prvek. Když navíc zadáte hmotnost vzorku, dopočítá se i&nbsp;hmotnost '
          'každého prvku v&nbsp;něm.</p>'
          '<div class="mnngrid"><div><label class="fldlbl" for="inPctM">'
          'Hmotnost vzorku [g] — nepovinné</label>'
          '<input class="txtin" type="text" inputmode="decimal" id="inPctM" autocomplete="off" '
          'placeholder="např. 50"></div></div>'
          '<div id="outPCT"></div></div>')
    h += ('<div class="pane" id="pane_emp" hidden>'
          '<p class="paneintro">Zadejte značky prvků a&nbsp;jejich procenta (nebo rovnou '
          'hmotnosti v&nbsp;gramech) a&nbsp;vypočte se nejjednodušší celočíselný poměr — '
          'empirický vzorec.</p>'
          '<div><label class="fldlbl" for="inComp">Složení</label>'
          '<input class="txtin" type="text" id="inComp" autocomplete="off" spellcheck="false" '
          'placeholder="C 40,0  H 6,7  O 53,3"></div>')
    comps = ["C 40,0  H 6,7  O 53,3", "Na 39,3  Cl 60,7", "Fe 69,9  O 30,1",
             "K 26,6  Cr 35,4  O 38,0", "C 92,3  H 7,7"]
    h += '<div class="chips" id="cChips"><span class="chlbl">Zkuste</span>'
    for c in comps:
        h += '<button type="button" data-c="%s">%s</button>' % (c, c)
    h += '</div><div id="outEMP"></div></div>'
    h += '</div></section></div></div>\n'
    return h


# ============================================================ stránka
def build(data):
    css = MS.TOKENS + MS.CHROME + MS.TILES + MS.HERO + CALCSHEET + PTCSS
    h = MS.head("Periodická tabulka — " + SITE["name"],
                "Interaktivní periodická tabulka všech 118 prvků se šesti režimy obarvení, "
                "hledáním, detailem prvku a výkladem period, skupin a bloků. Druhý pohled je "
                "počítadlo: molární hmotnost ze vzorce, převod m ↔ n ↔ N, složení v procentech "
                "a empirický vzorec — vždy i s postupem.",
                css)
    h += MS.topbar("../index.html",
                   '<nav class="crumb" aria-label="Drobečková navigace">'
                   '<a href="../index.html">Úvod</a><span>/</span><b>Periodická tabulka</b></nav>',
                   back=("../index.html", "Zpátky na úvod"))
    h += '<main id="obsah">\n'

    # ---------------- hero ----------------
    h += ('<section class="hero sub"><div class="hero-bg alt"></div>' + grid_art() +
          '<div class="hero-in">'
          '<span class="eyebrow">Nástroj · 118 prvků · počítá i vysvětluje</span>'
          '<h1>Periodická tabulka</h1>'
          '<p class="lead">Stránka má dva pohledy a&nbsp;přepínáte je dlaždicemi hned '
          'pod tímhle odstavcem. <b>Periodická tabulka</b> je celá mřížka se všemi 118 prvky, '
          'šesti režimy obarvení, hledáním a&nbsp;výkladem, jak je poskládaná z&nbsp;period, '
          'skupin a&nbsp;bloků. <b>Počítadlo</b> ze zadaného vzorce spočítá molární hmotnost '
          'i&nbsp;s rozpisem, hmotnostní zlomky a&nbsp;převod na látkové množství.</p>'
          '</div></section>\n')

    # ---------------- přepínač pohledů ----------------
    h += '<div class="wrap">' + view_tiles() + '</div>\n'

    # ---------------- oba pohledy ----------------
    h += table_view()
    h += calc_view()

    # ---------------- kam dál ----------------
    h += '<div class="wrap"><section class="sec" id="dal">'
    h += '<div class="sec-head"><h2>Kam pokračovat</h2></div><div class="golinks">'
    h += ('<a class="golink" href="../obecna-fyzikalni-chemie/elektronovy-obal.html">'
          '<b>Elektronový obal a periodická tabulka</b>'
          '<span>Tady je tabulka jako nástroj a stavba jen v přehledu. Orbitaly, kvantová '
          'čísla, výstavbový princip a trendy do hloubky — to je tenhle okruh.</span>'
          '<span class="go">Přejít na okruh ' + MS.ARR + '</span></a>')
    h += ('<a class="golink" href="../jak-pocitat/index.html">'
          '<b>Jak počítat chemii</b>'
          '<span>Molární hmotnost je jen první krok. Jak zapsat zadání, odvodit vztah '
          'a teprve pak dosadit — i s hlídáním jednotek a platných číslic.</span>'
          '<span class="go">Naučit se zápis ' + MS.ARR + '</span></a>')
    h += '</div></section></div>\n'

    h += '<div class="dscrim" id="dScrim" hidden></div>\n'
    h += '<aside class="detail" id="detail" hidden aria-label="Detail prvku"></aside>\n'
    h += '<div class="toast" id="toast" role="status" aria-live="polite"></div>\n'
    h += '</main>\n' + MS.foot()

    h += "<script>\nvar DATA=" + json.dumps(data, ensure_ascii=False,
                                            separators=(",", ":")) + ";\n"
    h += ENGINE + "\n</script>\n"
    h += MS.theme_script()
    return h


def build_data():
    els = []
    for e in TD.ELEMENTS:
        els.append({
            "z": e["z"], "sym": e["sym"], "cz": e["cz"], "ar": e["ar"],
            "unst": 1 if e["unst"] else 0, "arF": ar_full(e), "arS": ar_short(e),
            "cfg": e["cfg"], "cfgFull": e["cfgFull"], "shells": e["shells"],
            "per": e["per"], "grp": e["grp"], "blk": e["blk"], "cat": e["cat"],
            "phase": e["phase"], "mp": e["mp"], "bp": e["bp"], "dens": e["dens"],
            "rad": e["rad"], "en": e["en"], "ie": e["ie"], "ea": e["ea"],
            "ox": e["ox"], "yr": e["yr"], "who": e["who"], "note": e["note"],
        })
    return {"el": els, "cats": TD.CATEGORIES,
            "cati": dict((c, i) for i, c in enumerate(TD.CATEGORIES))}


def main():
    problems = TD.check()
    if problems:
        print("!! Data prvků mají %d nálezů — stránka se nezapisuje:" % len(problems))
        for p in problems:
            print("   -", p)
        sys.exit(1)
    print("kontrola dat prvků: v pořádku (118 prvků)")

    os.makedirs(OUT, exist_ok=True)
    data = build_data()
    html = build(data)
    p = os.path.join(OUT, "index.html")
    io.open(p, "w", encoding="utf-8", newline="\n").write(html)

    n_num = sum(1 for e in TD.ELEMENTS if e["en"] is not None)
    n_rad = sum(1 for e in TD.ELEMENTS if e["rad"] is not None)
    n_ie = sum(1 for e in TD.ELEMENTS if e["ie"] is not None)
    print("elektronegativita: %d/118, poloměr: %d/118, ionizační energie: %d/118"
          % (n_num, n_rad, n_ie))
    print("zapsáno: %s  %.0f KB" % (p, len(html.encode()) / 1024))


if __name__ == "__main__":
    main()
