# -*- coding: utf-8 -*-
"""make_spolu.py — vygeneruje sekci „Počítáme spolu“ (trenažér chemických výpočtů).

Výstup: C:\\Claude Code\\Claude Code\\Doučovanie\\pocitame-spolu\\index.html

Staví se stejně jako make_testy.py: bere z make_site.py TOKENS, CHROME, TILES, HERO,
head(), topbar(), foot(), theme_script(), ARL/ARR, takže stránka sedí se zbytkem webu.
Čísla úloh se před zápisem přepočítají (spolu_tasks.check_all).
"""
import io, os, re, sys, json, random

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

import make_site as MS
from site_data import SITE
import spolu_data as SD
import spolu_tasks as ST
from spolu_js import CORE
from spolu_js2 import UI

OUT = os.path.join(MS.OUT, "pocitame-spolu")

# ============================================================ CSS
CSS = """
:root{--ok:#3f7a34;--ok-soft:#eaf2e4;--bad:#a62f3b;--bad-soft:#f8e4e6;
  --warn:#8a6410;--warn-soft:#f7eddb}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
  --ok:#7fc08a;--ok-soft:#19291b;--bad:#ee7a90;--bad-soft:#301820;
  --warn:#dcae5b;--warn-soft:#2b2115}}
:root[data-theme="dark"]{--ok:#7fc08a;--ok-soft:#19291b;--bad:#ee7a90;--bad-soft:#301820;
  --warn:#dcae5b;--warn-soft:#2b2115}

.wrap.narrow{max-width:940px}
.mono{font-family:var(--f-mono)}
.chem{font-family:var(--f-ui);white-space:nowrap}
.nowrap{white-space:nowrap}
.sp{flex:1}
.lvd{font-family:var(--f-ui);font-size:.87rem;color:var(--ink-3)}

/* ---------- matematika: symboly, zlomky, odmocniny ---------- */
.math{font-family:var(--f-body);font-size:1.1rem;line-height:1.55}
.math i{font-style:italic}
.math sub{font-size:.66em;vertical-align:-.28em}
.math sup{font-size:.66em;vertical-align:.52em}
.math .op{padding:0 .2em;color:var(--ink-2)}
.math .par{color:var(--ink-3);padding:0 .03em}
.math .nv{font-family:var(--f-mono);font-size:.9em}
.math .cv{font-style:italic}
.math .fnm{font-style:normal;padding-right:.05em}
.frac{display:inline-flex;flex-direction:column;align-items:stretch;vertical-align:middle;
  margin:0 .22em;text-align:center;font-size:.95em}
.frac>.fnum{padding:0 .4em .1em}
.frac>.fden{padding:.13em .4em 0;border-top:1.6px solid currentColor}
.rt{display:inline-flex;align-items:flex-start;vertical-align:middle;margin:0 .1em}
.rt>.rs{font-size:1.3em;line-height:.92}
.rt>.rb{border-top:1.6px solid currentColor;padding:.15em .3em 0 .18em;margin-top:.06em}
.tok{font:inherit;font-size:1em;color:inherit;background:none;border:0;padding:.05em .14em;
  border-radius:5px;line-height:inherit}
button.tok{cursor:pointer;-webkit-tap-highlight-color:transparent}
button.tok:hover{background:var(--accent-soft);color:var(--accent)}
button.tok.sel{background:var(--accent);color:var(--accent-ink)}
.tok.hl{background:var(--warn-soft);box-shadow:0 0 0 2px var(--warn)}
.subv{font-family:var(--f-mono);font-size:.88em;background:var(--surface-2);
  border:1px solid var(--line);border-radius:6px;padding:.06em .3em;white-space:nowrap}
.subv .su{color:var(--ink-3)}
.subv .miss{color:var(--bad)}
.subv.mk{border-color:var(--bad);background:var(--bad-soft)}
.selmark{background:var(--accent);color:var(--accent-ink);padding:.05em .32em;border-radius:5px}

/* ---------- výpočtový list — komponenta .calcsheet převzatá
   ze stránky „Jak počítat chemii“, aby to byl očividně tentýž list ---------- */
:root{--endo:var(--teal);--endo-soft:var(--teal-soft)}
.calcsheet{
  counter-reset:csb;
  border:1px solid var(--line-strong);border-radius:14px;background:var(--surface);
  box-shadow:var(--shadow-1);overflow:hidden;margin:1.35rem 0;
  font-variant-numeric:lining-nums tabular-nums;
}
.calcsheet + .calcsheet{margin-top:1.6rem}

/* --- hlavička listu --- */
.cs-head{
  display:flex;align-items:baseline;gap:.55rem;flex-wrap:wrap;
  padding:.7rem 1.15rem;background:
    repeating-linear-gradient(0deg,transparent 0 15px,var(--grid) 15px 16px),
    repeating-linear-gradient(90deg,transparent 0 15px,var(--grid) 15px 16px),
    var(--surface-2);
  border-bottom:2px solid var(--line-strong);
}
.cs-head .cs-id{
  font-family:var(--f-cond);font-weight:700;font-size:.74rem;letter-spacing:.12em;
  text-transform:uppercase;color:var(--accent);white-space:nowrap;
}
.cs-head .cs-topic{
  font-family:var(--f-ui);font-size:.94rem;font-weight:600;color:var(--ink);
  letter-spacing:-.012em;flex:1;min-width:120px;line-height:1.35;
}
.cs-head .cs-kind{
  font-family:var(--f-cond);font-weight:600;font-size:.66rem;letter-spacing:.11em;
  text-transform:uppercase;color:var(--ink-3);border:1px solid var(--line-strong);
  border-radius:99px;padding:.16rem .5rem;white-space:nowrap;
}

/* --- zadání úlohy pod hlavičkou --- */
.cs-task{
  padding:.8rem 1.15rem;font-family:var(--f-ui);font-size:.95rem;line-height:1.55;
  color:var(--ink);background:var(--surface);border-bottom:1px solid var(--line);
}

/* --- blok --- */
.cs-block{
  display:grid;grid-template-columns:6.9rem minmax(0,1fr);gap:.3rem 1.1rem;
  padding:.8rem 1.15rem;border-top:1px solid var(--line);align-items:start;
}
.cs-block:first-child{border-top:0}
.cs-lbl{
  font-family:var(--f-cond);font-weight:700;font-size:.7rem;letter-spacing:.13em;
  text-transform:uppercase;color:var(--ink-3);line-height:1.5;
  display:flex;align-items:baseline;gap:.4rem;padding-top:.12rem;
}
.cs-lbl::before{
  counter-increment:csb;content:counter(csb);
  font-family:var(--f-mono);font-size:.66rem;font-weight:600;letter-spacing:0;
  width:1.15rem;height:1.15rem;border-radius:50%;flex:none;
  background:var(--surface-3);color:var(--ink-3);
  display:inline-grid;place-items:center;transform:translateY(.1rem);
}
.cs-rows{display:flex;flex-direction:column;gap:.26rem;min-width:0}

/* --- řádek: symbol · hodnota · poznámka --- */
.cs-row{
  display:grid;grid-template-columns:4.6rem minmax(0,1fr) auto;
  gap:.1rem .6rem;align-items:baseline;
}
.cs-sym{
  font-family:var(--f-ui);font-style:italic;font-weight:600;font-size:1rem;
  color:var(--ink);text-align:right;white-space:nowrap;
}
.cs-sym sub,.cs-sym sup{font-style:normal}
.cs-val{
  font-family:var(--f-mono);font-size:.95rem;color:var(--ink);
  font-variant-numeric:lining-nums tabular-nums;line-height:1.6;min-width:0;
}
.cs-conv{color:var(--accent);font-weight:500}
.cs-conv::before{content:"";display:inline-block;width:.15rem}
.cs-note{
  font-family:var(--f-ui);font-size:.8rem;color:var(--ink-3);
  text-align:right;line-height:1.45;font-style:italic;
}

/* --- celořádkové zápisy (vztahy, odvození, dosazení) --- */
.cs-line{
  font-family:var(--f-mono);font-size:.97rem;line-height:1.75;color:var(--ink);
  font-variant-numeric:lining-nums tabular-nums;overflow-x:auto;
  padding:.05rem 0;white-space:nowrap;
}
.cs-line b{color:var(--accent);font-weight:600}
.cs-line em{font-style:italic;color:var(--ink-3);font-family:var(--f-ui);font-size:.86rem;white-space:normal}
.cs-line.wrap{white-space:normal}
.cs-line.units{
  color:var(--endo);font-size:.9rem;background:var(--endo-soft);
  border-radius:7px;padding:.3rem .6rem;display:block;margin-top:.15rem;
  white-space:normal;overflow-wrap:anywhere;line-height:1.55;
}
.cs-line.units b{color:var(--endo)}
.cs-hint{
  font-family:var(--f-ui);font-size:.8rem;color:var(--ink-3);line-height:1.5;
  margin-top:.18rem;font-style:italic;
}

/* --- blok „hledáme“ --- */
.cs-block.find{background:var(--surface-2)}
.cs-block.find .cs-val{color:var(--accent);font-weight:600}

/* --- blok „odpověď“ --- */
.cs-block.res{
  border-top:2px solid var(--line-strong);background:var(--surface-2);
  padding-top:.95rem;padding-bottom:.95rem;
}
.cs-block.res .cs-lbl{color:var(--accent)}
.cs-block.res .cs-lbl::before{background:var(--accent);color:var(--accent-ink)}
.cs-ans{
  font-family:var(--f-ui);font-size:.99rem;line-height:1.6;color:var(--ink);
}
.cs-hi{
  font-family:var(--f-mono);font-size:1.02rem;font-weight:600;color:var(--accent);
  background:var(--accent-soft);border-radius:7px;padding:.1rem .45rem;
  white-space:nowrap;font-variant-numeric:lining-nums tabular-nums;
}

/* --- blok „kontrola“ --- */
.cs-block.chk{background:var(--endo-soft);border-top:1px dashed var(--line-strong)}
.cs-block.chk .cs-lbl{color:var(--endo)}
.cs-block.chk .cs-lbl::before{background:var(--endo);color:var(--surface)}
.cs-chk{font-family:var(--f-ui);font-size:.9rem;line-height:1.6;color:var(--ink-2)}

/* --- varianta „takhle ne“ --- */
.calcsheet.bad{border-color:var(--bad);background:var(--bad-soft)}
.calcsheet.bad .cs-head{border-bottom-color:var(--bad);background:var(--bad-soft)}
.calcsheet.bad .cs-head .cs-id{color:var(--bad)}
.calcsheet.bad .cs-block{border-top-color:var(--bad);opacity:.96}
.cs-flaw{
  font-family:var(--f-ui);font-size:.82rem;line-height:1.5;color:var(--bad);
  display:flex;gap:.4rem;align-items:flex-start;margin-top:.2rem;
}
.cs-flaw::before{content:"✕";font-weight:700;flex:none}
.cs-good{
  font-family:var(--f-ui);font-size:.82rem;line-height:1.5;color:var(--ok);
  display:flex;gap:.4rem;align-items:flex-start;margin-top:.2rem;
}
.cs-good::before{content:"✓";font-weight:700;flex:none}

/* --- postupné odkrývání (živý list v hero) --- */
.cs-block[data-step].is-hidden{display:none}

/* --- kompaktní varianta do dvousloupcových mřížek ---
   štítek bloku jde nad řádky, aby na formule zbyla celá šířka --- */
.calcsheet.compact .cs-block,
.vsgrid .calcsheet .cs-block{grid-template-columns:minmax(0,1fr);gap:.3rem;padding:.65rem .9rem}
.calcsheet.compact .cs-lbl,
.vsgrid .calcsheet .cs-lbl{padding-top:0}
.calcsheet.compact .cs-line,.calcsheet.compact .cs-val{font-size:.86rem}
.vsgrid .calcsheet .cs-line,.vsgrid .calcsheet .cs-val{font-size:.9rem}
.calcsheet.compact .cs-head{padding:.55rem .9rem}
.calcsheet.compact .cs-row,
.vsgrid .calcsheet .cs-row{grid-template-columns:4rem minmax(0,1fr)}
.calcsheet.compact .cs-note,
.vsgrid .calcsheet .cs-note{grid-column:2;text-align:left;margin-top:-.12rem}

/* --- mobil: jeden sloupec --- */
@media (max-width:700px){
  .cs-block{grid-template-columns:minmax(0,1fr);gap:.34rem}
  .cs-lbl{padding-top:0}
  .cs-row{grid-template-columns:3.6rem minmax(0,1fr)}
  .cs-note{grid-column:2;text-align:left;margin-top:-.1rem}
  .cs-line{font-size:.88rem}
}

/* doplňky trenažéru nad převzatou komponentou */
.cs-task{font-family:var(--f-body);font-size:1.02rem;line-height:1.68}
.cs-block.act{background:var(--surface-2)}
.cs-block.act > .cs-lbl{color:var(--accent)}
.cs-block.act > .cs-lbl::before{background:var(--accent);color:var(--accent-ink)}
.cs-block.bad{box-shadow:inset 3px 0 0 var(--bad)}
.cs-row.bad{background:var(--bad-soft);border-radius:8px;padding:.25rem .4rem;
  box-shadow:inset 3px 0 0 var(--bad)}
.cs-val.inputs{display:flex;align-items:center;gap:.45rem;flex-wrap:wrap;
  font-family:var(--f-ui)}
.cs-ans{display:flex;align-items:center;gap:.55rem;flex-wrap:wrap}
.cs-ans.bad{background:var(--bad-soft);border-radius:8px;padding:.35rem .55rem}
.cs-line .math{font-family:var(--f-body)}
.cs-line{padding-bottom:.1rem}
.dline{padding:.1rem 0}
.dline.bad{background:var(--bad-soft);border-radius:8px;padding:.3rem .5rem;
  box-shadow:inset 3px 0 0 var(--bad)}
.cs-sym.math{font-weight:400;font-style:normal;text-align:right}
.toolbox{border-top:1px solid var(--line-strong)}
.gval,.aval{font-family:var(--f-mono);font-size:.95rem;padding:.42rem .55rem;width:7.5rem;
  min-height:42px;border:1px solid var(--line-strong);border-radius:8px;
  background:var(--surface);color:var(--ink)}
.aval{width:9.5rem;font-size:1.05rem}
.gunit{font-family:var(--f-ui);font-size:.9rem;padding:.42rem .5rem;min-height:42px;
  border:1px solid var(--line-strong);border-radius:8px;background:var(--surface);color:var(--ink)}
.grm{width:34px;height:34px;flex:none;border-radius:8px;border:1px solid var(--line);
  background:var(--surface-2);color:var(--ink-3);cursor:pointer;font-size:.8rem}
.grm:hover{border-color:var(--bad);color:var(--bad)}
.qmark{font-family:var(--f-mono);font-size:1.15rem;color:var(--accent);font-weight:600}
.qmark{font-family:var(--f-mono);font-size:1.2rem;color:var(--accent)}

.fcard{display:inline-flex;align-items:center;padding:.5rem .8rem;min-height:46px;
  border:1px solid var(--line-strong);border-radius:10px;background:var(--surface);
  color:var(--ink);font:inherit;text-align:left}
button.fcard{cursor:pointer;transition:border-color .15s,background .15s}
button.fcard:hover{border-color:var(--accent);background:var(--accent-soft)}
button.fcard.on{border-color:var(--accent);background:var(--accent-soft);
  box-shadow:inset 0 0 0 1px var(--accent)}
button.fcard.can{border-color:var(--ok);
  box-shadow:0 0 0 2px color-mix(in srgb,var(--ok) 28%,transparent)}
.fcard.bad{border-color:var(--bad);background:var(--bad-soft)}
.rack,.fpicked{display:flex;flex-wrap:wrap;gap:.5rem}
.substnote{font-family:var(--f-ui);font-size:.8rem;line-height:1.55;color:var(--ink-3);
  margin-top:.5rem;max-width:62ch}

/* ---------- nářadí pod aktivním řádkem ---------- */
.toolbox{padding:1.1rem 1.35rem 1.25rem;background:var(--surface-3);
  border-top:1px solid var(--line-strong);border-bottom:1px solid var(--line-strong)}
.tb-h{font-family:var(--f-ui);font-weight:600;font-size:.95rem;margin-bottom:.65rem;
  line-height:1.5}
.tb-h2{font-family:var(--f-cond);font-weight:600;font-size:.72rem;letter-spacing:.1em;
  text-transform:uppercase;color:var(--ink-3);margin:1rem 0 .45rem}
.tb-n{font-family:var(--f-ui);font-size:.85rem;line-height:1.58;color:var(--ink-2);
  margin-top:.75rem}
.shelf{display:flex;flex-wrap:wrap;gap:.45rem}
.chip{display:inline-flex;align-items:center;gap:.45rem;padding:.45rem .8rem;min-height:44px;
  border:1px solid var(--line-strong);border-radius:99px;background:var(--surface);
  color:var(--ink);cursor:pointer;font:inherit}
.chip .cn{font-family:var(--f-ui);font-size:.78rem;color:var(--ink-3)}
.chip:hover{border-color:var(--accent)}
.chip.on{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}
.chip.on .cn{color:var(--accent-ink);opacity:.85}
.simps{display:flex;flex-wrap:wrap;gap:.45rem}
.btn.can{border-color:var(--ok);color:var(--ok)}
.btn-sm{font-size:.85rem;padding:.55rem .9rem;min-height:42px}
.tbfoot{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;margin-top:1.05rem;
  padding-top:.9rem;border-top:1px dashed var(--line-strong)}
.mechnote{display:flex;gap:.6rem;align-items:flex-start;margin-top:.9rem;padding:.7rem .9rem;
  border:1px solid var(--line-strong);border-left:3px solid var(--ink-3);border-radius:9px;
  background:var(--surface);font-family:var(--f-ui);font-size:.88rem;line-height:1.58;
  color:var(--ink-2)}
.mn-i{flex:none;width:20px;height:20px;border-radius:50%;background:var(--ink-3);
  color:var(--surface);display:grid;place-items:center;font-family:var(--f-mono);
  font-size:.7rem;font-weight:600;margin-top:.1rem}
.coach{padding:.9rem 1.05rem;border:1px solid var(--teal);border-radius:11px;
  background:var(--teal-soft);font-family:var(--f-ui);font-size:.9rem;line-height:1.62;
  margin-bottom:1rem}

.ucomp{display:flex;flex-direction:column;gap:.4rem;max-width:480px}
.uz{display:flex;align-items:center;gap:.6rem;padding:.5rem .7rem;min-height:50px;
  border:1px dashed var(--line-strong);border-radius:10px;background:var(--surface);
  cursor:pointer}
.uz.on{border-style:solid;border-color:var(--accent);background:var(--accent-soft)}
.uzl{font-family:var(--f-cond);font-weight:600;font-size:.7rem;letter-spacing:.1em;
  text-transform:uppercase;color:var(--ink-3);flex:none;width:6.4rem}
.uzc{display:flex;flex-wrap:wrap;gap:.3rem}
.uempty{color:var(--ink-3)}
.uch{font-family:var(--f-mono);font-size:.88rem;padding:.25rem .55rem;border-radius:6px;
  border:1px solid var(--accent);background:var(--surface);color:var(--accent);cursor:pointer}
.utiles{display:flex;flex-wrap:wrap;gap:.35rem;margin-top:.65rem}
.ut{font-family:var(--f-mono);font-size:.88rem;padding:.4rem .6rem;min-height:40px;
  min-width:46px;border:1px solid var(--line-strong);border-radius:8px;
  background:var(--surface);color:var(--ink);cursor:pointer}
.ut:hover{border-color:var(--accent);color:var(--accent)}
.subrow{margin-top:1.1rem}

/* ---------- verdikt, diagnostika, vzorové řešení ---------- */
.verdict{margin-top:1.6rem;border:2px solid var(--line-strong);border-radius:16px;
  background:var(--surface);padding:1.4rem 1.5rem}
.verdict.good{border-color:var(--ok)}
.verdict.bad{border-color:var(--bad)}
.vhead{display:flex;gap:1rem;align-items:flex-start}
.vmark{width:54px;height:54px;flex:none;border-radius:14px;display:grid;place-items:center;
  font-size:1.8rem;font-weight:700}
.verdict.good .vmark{background:var(--ok-soft);color:var(--ok)}
.verdict.bad .vmark{background:var(--bad-soft);color:var(--bad)}
.vhead h2{font-size:1.65rem}
.vhead p{font-family:var(--f-ui);font-size:.92rem;line-height:1.55;color:var(--ink-2);
  margin-top:.35rem}
.vstats{display:flex;flex-wrap:wrap;gap:1.5rem;margin-top:1.1rem;padding:.9rem 0;
  border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.vstats span{display:flex;flex-direction:column;font-family:var(--f-ui);font-size:.78rem;
  color:var(--ink-3)}
.vstats b{font-family:var(--f-mono);font-size:1.08rem;color:var(--ink)}
.vnote{font-family:var(--f-ui);font-size:.86rem;line-height:1.55;color:var(--ink-2);
  margin-top:.9rem}
.vacts{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1.15rem}
.diag{margin-top:1.2rem;padding:1rem 1.15rem;border-radius:12px;background:var(--surface-2);
  border:1px solid var(--line);border-left:4px solid var(--warn)}
.diag h3{font-size:1.06rem;margin-bottom:.45rem}
.diag p{font-family:var(--f-ui);font-size:.93rem;line-height:1.65;color:var(--ink-2)}
.outro{margin-top:1.15rem;font-family:var(--f-body);font-size:1rem;line-height:1.68;
  color:var(--ink-2)}
.model{border-color:var(--teal)}
.mhead{padding:1.2rem 1.35rem;background:var(--teal-soft);border-bottom:1px solid var(--line)}
.mhead h2{font-size:1.3rem;margin-top:.35rem}
.mhead p{font-family:var(--f-ui);font-size:.88rem;line-height:1.58;color:var(--ink-2);
  margin-top:.5rem;max-width:70ch}
.mans{font-size:1.25rem}
.mout{font-family:var(--f-body);font-size:.98rem;line-height:1.68;color:var(--ink-2);
  margin-top:.75rem}

/* ---------- trenažér: lišta a kroky ---------- */
#train{display:none}
#train.on{display:block}
.trainbar{position:sticky;top:62px;z-index:40;border-bottom:1px solid var(--line);
  background:color-mix(in srgb,var(--paper) 93%,transparent);backdrop-filter:blur(10px)}
.tb-in{display:flex;align-items:center;gap:.7rem;max-width:940px;margin:0 auto;
  padding:.7rem clamp(1.1rem,4vw,3rem) .15rem}
.tb-t{display:flex;flex-direction:column;min-width:0}
.tb-t b{font-family:var(--f-ui);font-size:1rem;font-weight:700;letter-spacing:-.02em;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.tmeta{display:flex;flex-wrap:wrap;gap:.5rem;font-family:var(--f-ui);font-size:.75rem;
  color:var(--ink-3)}
.tmeta .lv{font-weight:600}
.lv1{color:var(--ok)}.lv2{color:var(--warn)}.lv3{color:var(--accent)}
.steps{display:flex;gap:.3rem;max-width:940px;margin:0 auto;overflow-x:auto;
  padding:.4rem clamp(1.1rem,4vw,3rem) .6rem;scrollbar-width:thin}
.stp{display:flex;align-items:center;gap:.4rem;padding:.35rem .65rem;border-radius:99px;
  border:1px solid var(--line);background:var(--surface);color:var(--ink-3);
  font-family:var(--f-ui);font-size:.78rem;cursor:pointer;white-space:nowrap;flex:none}
.stp b{width:19px;height:19px;border-radius:50%;background:var(--surface-3);color:var(--ink-3);
  display:grid;place-items:center;font-family:var(--f-mono);font-size:.68rem}
.stp.ok{color:var(--ink)}
.stp.ok b{background:var(--teal);color:var(--paper)}
.stp.on{border-color:var(--accent);color:var(--accent);background:var(--accent-soft)}
.stp.on b{background:var(--accent);color:var(--accent-ink)}
.stp:disabled{cursor:default;opacity:.5}

/* ---------- výběr úlohy a pokrok ---------- */
.tcards{display:grid;gap:.9rem;grid-template-columns:repeat(auto-fit,minmax(262px,1fr));
  margin-top:1.1rem}
.tcard{position:relative;display:flex;flex-direction:column;gap:.45rem;padding:1.15rem 1.25rem;
  border:1px solid var(--line);border-radius:14px;background:var(--surface);text-align:left;
  cursor:pointer;font:inherit;color:var(--ink);
  transition:transform .18s,border-color .18s,box-shadow .18s}
/* ---- CARD-LIFT: karty zřetelně oddělené od pozadí ---- */
.tile,.pcard,.tcard{
  border:2px solid var(--line-strong)!important;
  border-top:4px solid var(--accent)!important;
  border-radius:16px!important;
  box-shadow:0 1px 2px rgba(33,27,21,.07),0 6px 16px rgba(33,27,21,.09);
}
@media (prefers-color-scheme:dark){ :root:not([data-theme="light"]) .tile,
  :root:not([data-theme="light"]) .pcard, :root:not([data-theme="light"]) .tcard{ box-shadow:0 2px 6px rgba(0,0,0,.5),0 8px 20px rgba(0,0,0,.38); } }
:root[data-theme="dark"] .tile, :root[data-theme="dark"] .pcard,
:root[data-theme="dark"] .tcard{ box-shadow:0 2px 6px rgba(0,0,0,.5),0 8px 20px rgba(0,0,0,.38); }
.tile:hover,.pcard:hover,.tcard:hover{ border-color:var(--accent)!important;
  border-top-color:var(--accent)!important }
.tile.soon{ border-style:dashed!important;border-top-style:solid!important }
/* víc vzduchu kolem i uvnitř */
.tile,.pcard,.tcard{ padding:clamp(1.35rem,2.3vw,1.85rem) clamp(1.4rem,2.4vw,1.9rem) }
.tiles,.pair-grid,.preset{ gap:clamp(1rem,1.9vw,1.4rem)!important }
.pair{ padding:clamp(1rem,1.8vw,1.35rem)!important }

.tcard:hover{transform:translateY(-3px);border-color:var(--accent);box-shadow:var(--shadow-3)}
.tcard .tk{font-family:var(--f-cond);font-weight:600;font-size:.7rem;letter-spacing:.12em;
  text-transform:uppercase;color:var(--accent)}
.tcard h3{font-size:1.06rem;font-weight:700}
.tcard p{font-family:var(--f-ui);font-size:.85rem;line-height:1.5;color:var(--ink-2)}
.tcard .tst{margin-top:auto;padding-top:.65rem;font-family:var(--f-ui);font-size:.76rem;
  color:var(--ink-3)}
.tcard.done{border-left:3px solid var(--ok)}
.tcard.done .tst{color:var(--ok)}
.tcard.done0{border-left:3px solid var(--ok);
  box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--ok) 32%,transparent)}
.tcard.done0 .tst{color:var(--ok);font-weight:600}
.tcard.tried{border-left:3px solid var(--warn)}
.tcard.tried .tst{color:var(--warn)}
.pgrid{display:grid;gap:1px;grid-template-columns:repeat(auto-fit,minmax(155px,1fr));
  background:var(--line);border:1px solid var(--line);border-radius:14px;overflow:hidden;
  margin-top:1.1rem}
.pb{background:var(--surface);padding:1.1rem 1.2rem;display:flex;flex-direction:column;gap:.15rem}
.pv{font-family:var(--f-mono);font-size:1.7rem;font-weight:600;letter-spacing:-.03em}
.pk{font-family:var(--f-ui);font-size:.8rem;color:var(--ink-3)}
.tablewrap{overflow-x:auto;border:1px solid var(--line);border-radius:12px;
  background:var(--surface);margin-top:.9rem}
.brk{width:100%;border-collapse:collapse;font-family:var(--f-ui);font-size:.88rem}
.brk th{text-align:left;padding:.55rem .7rem;border-bottom:1px solid var(--line-strong);
  font-family:var(--f-cond);font-size:.72rem;letter-spacing:.09em;text-transform:uppercase;
  color:var(--ink-3)}
.brk td{padding:.5rem .7rem;border-bottom:1px solid var(--line);color:var(--ink-2)}
.brk tr:last-child td{border-bottom:0}
.brk td.n{text-align:right;font-family:var(--f-mono);white-space:nowrap;color:var(--ink)}
.brk .bar{display:block;height:8px;border-radius:99px;background:var(--surface-3);
  overflow:hidden;min-width:70px}
.brk .bar i{display:block;height:100%;border-radius:99px}
.pacts{margin-top:.9rem}
.warmcard{display:flex;flex-wrap:wrap;gap:1rem;align-items:center;justify-content:space-between;
  padding:1.3rem 1.45rem;border:1px solid var(--teal);border-radius:14px;
  background:var(--teal-soft);margin-top:1.1rem}
.warmcard p{font-family:var(--f-ui);font-size:.92rem;line-height:1.62;color:var(--ink-2);
  max-width:64ch}
"""

# hero: odměrný válec a zlomek
ART = ('<svg class="hero-art alt" width="430" height="430" viewBox="0 0 100 100" fill="none" '
       'stroke="currentColor" stroke-width="1.15" stroke-linecap="round" '
       'stroke-linejoin="round" aria-hidden="true">'
       '<path d="M30 9h20"/>'
       '<path d="M34 9v68a6 6 0 0 0 6 6 6 6 0 0 0 6-6V9"/>'
       '<path d="M34 24h5M34 33h8M34 42h5M34 51h8M34 60h5M34 69h8"/>'
       '<path d="M34 55h12" stroke-width="2.2"/>'
       '<path d="M58 47h30" stroke-width="2.2"/>'
       '<circle cx="73" cy="31" r="5.2"/>'
       '<circle cx="65" cy="63" r="5.2"/>'
       '<circle cx="81" cy="63" r="5.2"/>'
       '<path d="M12 20l4 4-4 4M12 76l4-4-4-4"/></svg>')


# ============================================================ data pro JS
def strip_tags(s):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", s)).strip()


def short_of(t):
    s = strip_tags(t["task"])
    m = re.split(r"(?<=[.?!])\s", s)
    out = m[0] if m else s
    if len(out) > 120:
        out = out[:117].rsplit(" ", 1)[0] + "…"
    return out


def collect_keys(t):
    keys = []
    for g in t["given"]:
        keys.append(g["s"] + "|" + g["sub"])
    keys.append(t["find"]["s"] + "|" + t["find"]["sub"])
    for src in t["formulas"] + t["opt"] + [d[0] for d in t["distractors"]]:
        l, r, _ = SD.parse_formula(src)
        keys.append(SD.skey(l))
        keys.extend(SD.syms_in(r))
    keys.extend(t["extras"])
    out = []
    for k in keys:
        if k not in out:
            out.append(k)
    return out


def build_data():
    syms, tasks = {}, []
    for ti, t in enumerate(ST.TASKS):
        ref = ST.build_ref(t)
        keys = collect_keys(t)
        for k in keys:
            if k not in syms:
                s, sub = k.split("|", 1)
                info = SD.sym_info(s, sub)
                syms[k] = {"disp": info["disp"], "name": info["name"],
                           "canon": info["canon"], "units": info["units"]}
        cards, need, opt_ids = [], [], []
        def add(src, ok, why=""):
            l, r, txt = SD.parse_formula(src)
            cid = "f%d" % len(cards)
            cards.append({"id": cid, "key": SD.skey(l), "lhs": l, "rhs": r,
                          "src": txt, "ok": ok, "why": why})
            return cid
        for src in t["formulas"]:
            need.append(add(src, True))
        for src in t["opt"]:
            opt_ids.append(add(src, True))
        for src, why in t["distractors"]:
            add(src, False, why)
        rng = random.Random(4242 + ti)
        rng.shuffle(cards)
        shelf = [g["s"] + "|" + g["sub"] for g in t["given"]]
        shelf.append(t["find"]["s"] + "|" + t["find"]["sub"])
        for k in t["extras"]:
            shelf.append(k)
        shelf = list(dict.fromkeys(shelf))
        rng.shuffle(shelf)
        # referenční hodnoty jen pro veličiny, které se v úloze vyskytují
        vals = dict((k, v) for k, v in ref["vals"].items() if isinstance(v, float) or isinstance(v, int))
        tasks.append({
            "id": t["id"], "level": t["level"], "topic": t["topic"], "title": t["title"],
            "short": short_of(t), "task": t["task"],
            "given": [{"sk": g["s"] + "|" + g["sub"], "val": g["val"], "unit": g["unit"],
                       "note": g["note"]} for g in t["given"]],
            "find": {"sk": t["find"]["s"] + "|" + t["find"]["sub"], "unit": t["find"]["unit"]},
            "shelf": shelf, "cards": cards, "need": need, "sets": [need], "optIds": opt_ids,
            "answer": t["answer"], "hints": t["hints"], "outro": t["outro"],
            "ref": {"expr": ref["expr"], "canon": ref["canon"], "vals": vals,
                    "steps": [{"expr": s["expr"], "src": s["src"], "note": s["note"]}
                              for s in ref["steps"]]},
        })
    return {"atoms": SD.ATOMS, "syms": syms, "consts": SD.CONSTS,
            "warm": ST.TASKS[0]["id"], "tasks": tasks}


# ============================================================ stránka
def build(data):
    css = MS.TOKENS + MS.CHROME + MS.TILES + MS.HERO + CSS
    h = MS.head("Počítáme spolu — " + SITE["name"],
                "Trenažér chemických výpočtů: úlohu složíte z nabízených veličin a vztahů, "
                "aplikace kreslí zlomky za vás a na konci přesně ukáže, kde se výpočet zlomil.",
                css)
    h += MS.topbar("../index.html",
                   '<nav class="crumb" aria-label="Drobečková navigace">'
                   '<a href="../index.html">Úvod</a><span>/</span><b>Počítáme spolu</b></nav>',
                   back=("../index.html", "Zpátky na úvod"))
    h += '<main id="obsah">\n'

    # ---------------- výběr ----------------
    h += '<div id="pick">'
    h += ('<section class="hero sub"><div class="hero-bg alt"></div>' + ART +
          '<div class="hero-in">'
          '<span class="eyebrow">Trenažér výpočtů · klepáním, ne psaním</span>'
          '<h1>Počítáme spolu</h1>'
          '<p class="lead">Úlohu si poskládáte vlastníma rukama: vypíšete zadané veličiny '
          'i s převody, vyberete vztahy a klepáním dosadíte jeden do druhého. '
          'Zlomky kreslí aplikace, algebru nepíšete. A hlavně — během řešení vám nikdo '
          'nekouká přes rameno. Verdikt přijde až po odevzdání, i s tím, kde přesně '
          'se to zlomilo.</p>'
          '<div class="cta">'
          '<button class="btn btn-primary" type="button" id="startBtn">Začít počítat ' + MS.ARR +
          '</button>'
          '<button class="btn" type="button" id="warmBtn">Nejdřív rozcvička</button>'
          '</div></div></section>\n')
    h += '<div class="wrap">'
    h += ('<section class="sec"><div class="sec-head"><h2>Jak to tady chodí</h2></div>'
          '<div class="how">')
    for ic, tt, pp in [
        ("1", "Skládáte, nepíšete",
         "Zadané veličiny vyberete z nabídky, vztahy z police karet. Dosazení proběhne "
         "klepnutím: nejdřív na veličinu ve výrazu, pak na kartu. Složené zlomky "
         "se kreslí samy."),
        ("2", "Nikdo vás během řešení neopravuje",
         "Aplikace vám nedá zelenou fajfku ani červený křížek, dokud neodevzdáte "
         "odpověď. Zabrání jen krokům, které nejdou provést — a řekne proč. "
         "Chybnou cestu si dojdete až na konec."),
        ("3", "Na konci se dozvíte kde, ne jen jestli",
         "Po odevzdání se ukáže verdikt a dvě tlačítka: „Kde jsem udělal chybu?“ "
         "najde první místo, kde se to rozešlo, a „Ukázat správné řešení“ rozbalí "
         "celý vzorový list."),
    ]:
        h += '<div class="how-c"><span class="ic">%s</span><h3>%s</h3><p>%s</p></div>' % (ic, tt, pp)
    h += '</div></section>\n'

    h += ('<section class="sec"><div class="sec-head"><h2>Rozcvička</h2></div>'
          '<div class="warmcard"><p>Než se pustíte do počítání, projděte si jednu '
          'jednoduchou úlohu s vysvětlivkami u každé fáze. Trvá to tři minuty a potom '
          'už budete vědět, co která obrazovka chce. Rozcvička se nepočítá do pokroku.</p>'
          '<button class="btn btn-primary" type="button" id="warmBtn2">'
          'Projít rozcvičku</button></div></section>\n')

    h += '<div id="taskList"></div>'
    h += ('<section class="sec"><div class="sec-head"><h2>Váš pokrok</h2></div>'
          '<div id="progress"></div></section>')
    h += '</div></div>\n'

    # ---------------- trenažér ----------------
    h += ('<div id="train">'
          '<div class="trainbar"><div class="tb-in">'
          '<div class="tb-t"><b id="tTitle"></b><span class="tmeta" id="tMeta"></span></div>'
          '<span class="sp"></span>'
          '<button class="btn btn-sm" type="button" id="hintBtn">Poradit</button>'
          '<button class="btn btn-sm" type="button" id="quitBtn">Ukončit</button>'
          '</div><div class="steps" id="steps"></div></div>'
          '<div class="wrap narrow">'
          '<div class="calcsheet" id="sheet"></div>'
          '<div id="verdictBox"></div>'
          '<div id="modelBox" style="display:none"></div>'
          '</div></div>\n')

    h += '</main>\n' + MS.foot()
    h += "<script>\nvar DATA=" + json.dumps(data, ensure_ascii=False,
                                            separators=(",", ":")) + ";\n"
    h += '(function(){\n"use strict";\n' + CORE + "\n" + UI + "\n})();\n</script>\n"
    h += MS.theme_script()
    return h


def main():
    bad = ST.check_all()
    if bad:
        print("!! %d úloh nesouhlasí s vlastním výpočtem — stránka se nezapisuje." % bad)
        sys.exit(1)
    os.makedirs(OUT, exist_ok=True)
    data = build_data()
    html = build(data)
    p = os.path.join(OUT, "index.html")
    io.open(p, "w", encoding="utf-8", newline="\n").write(html)
    lv = {}
    for t in ST.TASKS:
        lv[t["level"]] = lv.get(t["level"], 0) + 1
    print("\núlohy: %d (základ %d, střední %d, přijímačky %d)"
          % (len(ST.TASKS), lv.get(1, 0), lv.get(2, 0), lv.get(3, 0)))
    print("veličin v tabulce: %d, karet vztahů celkem: %d"
          % (len(data["syms"]), sum(len(t["cards"]) for t in data["tasks"])))
    print("zapsáno: %s  %.0f KB" % (p, len(html.encode()) / 1024))


if __name__ == "__main__":
    main()
