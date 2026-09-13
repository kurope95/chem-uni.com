# -*- coding: utf-8 -*-
"""nazvo_css.py — styly sekce „České názvosloví“. Barvy jen přes proměnné."""

CSS = """
:root{--ok:#3f7a34;--ok-soft:#eaf2e4;--bad:#a62f3b;--bad-soft:#f8e4e6;
  --warn:#8a6410;--warn-soft:#f7eddb;--endo:var(--teal);--endo-soft:var(--teal-soft)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
  --ok:#7fc08a;--ok-soft:#19291b;--bad:#ee7a90;--bad-soft:#301820;
  --warn:#dcae5b;--warn-soft:#2b2115}}
:root[data-theme="dark"]{--ok:#7fc08a;--ok-soft:#19291b;--bad:#ee7a90;--bad-soft:#301820;
  --warn:#dcae5b;--warn-soft:#2b2115}

.wrap.narrow{max-width:1000px}
.mono{font-family:var(--f-mono);font-variant-numeric:tabular-nums}
.chem{font-family:var(--f-ui);white-space:nowrap}
.q{font-style:italic}
.sp{flex:1}

/* ---------- text ---------- */
.prose{max-width:66ch;display:flex;flex-direction:column;gap:.85rem}
.prose.wide{max-width:none}
.prose h3{font-size:1.12rem;font-weight:650;letter-spacing:-.02em;margin-top:.5rem}
.prose p{font-size:1.02rem;line-height:1.7;text-wrap:pretty}
.prose ul{margin:0;padding-left:1.15rem;display:flex;flex-direction:column;gap:.4rem;
  font-size:1rem;line-height:1.6}
.term{font-family:var(--f-ui);font-weight:600;font-size:.96em;
  border-bottom:2px solid var(--accent-soft)}
p.eq{font-family:var(--f-mono);font-size:.98rem;background:var(--surface-2);
  border:1px solid var(--line);border-radius:9px;padding:.6rem .85rem;overflow-x:auto}

.grid2{display:grid;gap:clamp(1rem,2vw,1.6rem);grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);
  align-items:start;margin-top:1.4rem}
@media (max-width:880px){.grid2{grid-template-columns:minmax(0,1fr)}}
.aside{display:flex;flex-direction:column;gap:.8rem}

/* ---------- rámečky ---------- */
.board{border:1px solid var(--line-strong);border-radius:11px;background:var(--surface-2);
  padding:.85rem 1rem;display:flex;flex-direction:column;gap:.45rem}
.board .eyebrow{color:var(--ink-3)}
.board .bq{font-family:var(--f-mono);font-size:.93rem;line-height:1.62;color:var(--ink);
  font-variant-numeric:tabular-nums;overflow-x:auto}
.board .bq b{font-family:var(--f-cond);font-weight:700;font-size:.8rem;letter-spacing:.1em;
  text-transform:uppercase;color:var(--accent)}
.board .leg{font-family:var(--f-ui);font-size:.8rem;color:var(--ink-3);line-height:1.5}
.trap{border:1px solid var(--warn);border-left:3px solid var(--warn);border-radius:11px;
  background:var(--warn-soft);padding:.8rem 1rem;display:flex;flex-direction:column;gap:.4rem}
.trap .eyebrow{color:var(--warn)}
.trap p{font-family:var(--f-ui);font-size:.88rem;line-height:1.55;color:var(--ink-2)}
.callout{border:1px solid var(--line);border-radius:12px;padding:.95rem 1.1rem;
  display:flex;flex-direction:column;gap:.5rem;background:var(--surface)}
.callout p{font-size:.97rem;line-height:1.6}
.callout.def{border-left:3px solid var(--accent)}
.callout.def>.eyebrow{color:var(--accent)}
.callout.warn{border-left:3px solid var(--warn);background:var(--warn-soft)}
.callout.warn>.eyebrow{color:var(--warn)}
.callout.tip{border-left:3px solid var(--endo);background:var(--endo-soft)}
.callout.tip>.eyebrow{color:var(--endo)}

/* ---------- tabulky ---------- */
.tablewrap{overflow-x:auto;border:1px solid var(--line-strong);border-radius:12px;
  background:var(--surface);margin-top:.9rem;box-shadow:var(--shadow-1)}
table{border-collapse:collapse;width:100%;font-family:var(--f-ui);font-size:.9rem}
thead th{position:sticky;top:0;background:var(--surface-2);text-align:left;
  font-family:var(--f-cond);font-weight:600;font-size:.75rem;letter-spacing:.1em;
  text-transform:uppercase;color:var(--ink-3);padding:.6rem .8rem;
  border-bottom:2px solid var(--line-strong);white-space:nowrap;z-index:1}
tbody td{padding:.5rem .8rem;border-top:1px solid var(--line);vertical-align:top;
  line-height:1.45}
tbody tr:nth-child(2n) td{background:var(--surface-2)}
td.n,th.n{text-align:right;font-family:var(--f-mono);font-variant-numeric:tabular-nums;
  white-space:nowrap}
td.c{font-family:var(--f-mono);white-space:nowrap}
td.hl{color:var(--accent);font-weight:600}
.tsearch{display:flex;gap:.6rem;flex-wrap:wrap;align-items:center;margin-top:1rem}
.tsearch input[type=search]{flex:1;min-width:200px;font-family:var(--f-ui);font-size:.92rem;
  padding:.6rem .8rem;border:1px solid var(--line-strong);border-radius:10px;
  background:var(--surface);color:var(--ink)}
.tsearch .cnt{font-family:var(--f-ui);font-size:.84rem;color:var(--ink-3)}
.tbig{max-height:26rem;overflow-y:auto}

/* ---------- model ---------- */
.panel{border:1px solid var(--line-strong);border-radius:16px;background:var(--surface);
  overflow:hidden;margin-top:1.5rem;box-shadow:var(--shadow-1)}
.panel-head{display:flex;gap:.7rem;align-items:baseline;flex-wrap:wrap;
  padding:.75rem 1.1rem;background:var(--surface-2);border-bottom:1px solid var(--line-strong)}
.panel-head h3{font-size:1.05rem;font-weight:650}
.tag{font-family:var(--f-cond);font-weight:600;font-size:.68rem;letter-spacing:.11em;
  text-transform:uppercase;padding:.2rem .5rem;border-radius:99px;
  background:var(--accent-soft);color:var(--accent);white-space:nowrap}
.panel-body{padding:1rem 1.1rem;display:flex;flex-direction:column;gap:.9rem}
.panel-note{padding:.7rem 1.1rem;border-top:1px solid var(--line);background:var(--surface-2);
  font-family:var(--f-ui);font-size:.86rem;color:var(--ink-2);line-height:1.55}
.svgwrap{width:100%;overflow-x:auto}
.svgwrap svg{display:block;width:100%;height:auto;min-width:520px}
.ctl{display:flex;gap:.6rem;flex-wrap:wrap;align-items:center}
.ctl label{font-family:var(--f-ui);font-size:.85rem;color:var(--ink-2);font-weight:600}
.ctl select{font-family:var(--f-ui);font-size:.9rem;padding:.45rem .6rem;border-radius:9px;
  border:1px solid var(--line-strong);background:var(--surface);color:var(--ink)}
.segmented{display:inline-flex;flex-wrap:wrap;gap:.25rem;padding:.25rem;border-radius:11px;
  background:var(--surface-2);border:1px solid var(--line-strong)}
.segmented button{font-family:var(--f-ui);font-size:.85rem;font-weight:600;padding:.35rem .7rem;
  border-radius:8px;border:1px solid transparent;background:transparent;color:var(--ink-2);
  cursor:pointer;-webkit-tap-highlight-color:transparent}
.segmented button:hover{background:var(--surface-3);color:var(--ink)}
.segmented button[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);
  color:var(--accent-ink)}

/* ---------- trenažér ---------- */
.trainer{border:2px solid var(--line-strong);border-top:4px solid var(--accent);
  border-radius:16px;background:var(--surface);margin-top:1.4rem;overflow:hidden;
  box-shadow:0 1px 2px rgba(33,27,21,.07),0 6px 16px rgba(33,27,21,.09)}
.tr-set{padding:1rem 1.15rem;border-bottom:1px solid var(--line);background:var(--surface-2);
  display:flex;flex-direction:column;gap:.75rem}
.tr-row{display:flex;gap:.6rem;flex-wrap:wrap;align-items:center}
.tr-row>.lb{font-family:var(--f-cond);font-weight:600;font-size:.72rem;letter-spacing:.11em;
  text-transform:uppercase;color:var(--ink-3);min-width:6.5rem}
.chips{display:flex;flex-wrap:wrap;gap:.35rem}
.chip{font-family:var(--f-ui);font-size:.82rem;font-weight:600;padding:.34rem .68rem;
  border-radius:99px;border:1px solid var(--line-strong);background:var(--surface);
  color:var(--ink-2);cursor:pointer;-webkit-tap-highlight-color:transparent;
  display:inline-flex;align-items:center;gap:.35rem}
.chip:hover{border-color:var(--ink-3)}
.chip[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);
  color:var(--accent-ink)}
.chip .pc{font-family:var(--f-mono);font-size:.74rem;opacity:.8}
.tr-body{padding:1.2rem 1.15rem;display:flex;flex-direction:column;gap:.9rem}
.tr-kind{font-family:var(--f-cond);font-weight:600;font-size:.72rem;letter-spacing:.11em;
  text-transform:uppercase;color:var(--accent)}
.tr-q{font-family:var(--f-ui);font-size:clamp(1.1rem,1rem + .6vw,1.42rem);font-weight:600;
  line-height:1.4;letter-spacing:-.015em;text-wrap:pretty}
.tr-q .big{font-family:var(--f-ui);font-size:1.18em;font-weight:700;color:var(--accent);
  white-space:nowrap}
.tr-hint{font-family:var(--f-ui);font-size:.85rem;color:var(--ink-3)}
.tr-in{display:flex;gap:.55rem;flex-wrap:wrap;align-items:stretch}
.tr-in input{flex:1;min-width:min(100%,15rem);font-family:var(--f-ui);font-size:1.05rem;
  padding:.7rem .9rem;border:1px solid var(--line-strong);border-radius:11px;
  background:var(--surface);color:var(--ink)}
.tr-in input:disabled{opacity:.7}
.tr-prev{font-family:var(--f-ui);font-size:1rem;color:var(--ink-2);min-height:1.5rem}
.tr-prev b{font-size:1.18rem;color:var(--ink);font-weight:600}
.tr-btns{display:flex;gap:.5rem;flex-wrap:wrap}
.btn-sm{font-size:.87rem;padding:.55rem .95rem;min-height:42px}
.verdict{border-radius:12px;padding:.9rem 1.05rem;display:flex;flex-direction:column;gap:.5rem;
  border:1px solid var(--line)}
.verdict.ok{background:var(--ok-soft);border-color:var(--ok)}
.verdict.bad{background:var(--bad-soft);border-color:var(--bad)}
.verdict .vh{display:flex;align-items:baseline;gap:.5rem;font-family:var(--f-cond);
  font-weight:700;font-size:.78rem;letter-spacing:.12em;text-transform:uppercase}
.verdict.ok .vh{color:var(--ok)}
.verdict.bad .vh{color:var(--bad)}
.verdict p{font-family:var(--f-ui);font-size:.94rem;line-height:1.6;color:var(--ink)}
.verdict .why{display:flex;flex-direction:column;gap:.4rem;padding-top:.15rem;
  border-top:1px dashed var(--line-strong);margin-top:.2rem}
.verdict .why p{font-size:.9rem;color:var(--ink-2);padding-top:.4rem}
.verdict .why p::before{content:"→ ";color:var(--accent);font-weight:700}

.scorebar{display:flex;gap:.6rem;flex-wrap:wrap;padding:.85rem 1.15rem;
  border-top:1px solid var(--line);background:var(--surface-2)}
.stat{flex:1;min-width:7.5rem;display:flex;flex-direction:column;gap:.15rem;
  padding:.5rem .7rem;border:1px solid var(--line);border-radius:10px;background:var(--surface)}
.stat .k{font-family:var(--f-cond);font-weight:600;font-size:.68rem;letter-spacing:.1em;
  text-transform:uppercase;color:var(--ink-3)}
.stat .v{font-family:var(--f-mono);font-size:1.15rem;font-weight:600;color:var(--ink);
  font-variant-numeric:tabular-nums}
.stat.hot .v{color:var(--accent)}

.catgrid{display:grid;gap:.55rem;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
  margin-top:1rem}
.catrow{border:1px solid var(--line);border-radius:11px;background:var(--surface);
  padding:.6rem .8rem;display:flex;flex-direction:column;gap:.35rem}
.catrow .ct{display:flex;gap:.5rem;align-items:baseline;font-family:var(--f-ui);
  font-size:.9rem;font-weight:600}
.catrow .ct .n{font-family:var(--f-mono);font-size:.8rem;color:var(--ink-3);margin-left:auto;
  white-space:nowrap}
.scorebar{height:7px;border-radius:99px;background:var(--surface-3);overflow:hidden}
.scorebar i{display:block;height:100%;background:var(--accent);border-radius:99px}
.scorebar i.good{background:var(--ok)}
.scorebar i.mid{background:var(--warn)}

/* ---------- kam dál ---------- */
.golinks{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
  margin-top:1.2rem}
.golink{display:flex;flex-direction:column;gap:.4rem;padding:1.1rem 1.25rem;
  border:2px solid var(--line-strong);border-top:4px solid var(--accent);border-radius:14px;
  background:var(--surface);text-decoration:none;color:var(--ink);
  transition:border-color .18s,transform .18s}
.golink:hover{border-color:var(--accent);transform:translateY(-3px)}
.golink b{font-family:var(--f-ui);font-size:1.02rem;font-weight:700;letter-spacing:-.015em}
.golink span{font-family:var(--f-ui);font-size:.88rem;line-height:1.55;color:var(--ink-2)}
.golink .go{display:inline-flex;align-items:center;gap:.4rem;font-family:var(--f-cond);
  font-weight:600;font-size:.74rem;letter-spacing:.11em;text-transform:uppercase;
  color:var(--accent);margin-top:.25rem}

.toast{position:fixed;left:50%;bottom:1.4rem;transform:translateX(-50%) translateY(120%);
  background:var(--ink);color:var(--paper);font-family:var(--f-ui);font-size:.88rem;
  padding:.6rem 1rem;border-radius:10px;z-index:80;transition:transform .25s;
  box-shadow:var(--shadow-3);max-width:90vw}
.toast.on{transform:translateX(-50%) translateY(0)}

@media (max-width:520px){
  .tr-row>.lb{min-width:100%}
  .segmented{width:100%}
  .segmented button{flex:1}
}
"""
