# -*- coding: utf-8 -*-
"""nazvo_ui.py — obsluha stránky: trenažér, skládačka názvu, filtry tabulek."""

UI = r"""
/* ---------------------------------------------------------- drobnosti */
function $(s, r) { return (r || document).querySelector(s); }
function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

var store = {
  get: function (k, d) {
    try { var v = localStorage.getItem("nazvo." + k);
          return v === null ? d : JSON.parse(v); } catch (e) { return d; }
  },
  set: function (k, v) {
    try { localStorage.setItem("nazvo." + k, JSON.stringify(v)); } catch (e) {}
  },
  del: function (k) { try { localStorage.removeItem("nazvo." + k); } catch (e) {} }
};

var toastT = null;
function toast(m) {
  var t = $("#toast"); if (!t) return;
  t.textContent = m; t.classList.add("on");
  clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove("on"); }, 2600);
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* ---------------------------------------------------------- skládačka názvu */
var SK = {el: "S", ox: 4};

function skElements() {
  return DATA.el.filter(function (e) {
    for (var k in e.ox) if (e.ox[k].f.indexOf("b") >= 0) return true;
    return false;
  });
}

function skOxList(sym) {
  var e = null;
  DATA.el.forEach(function (x) { if (x.sym === sym) e = x; });
  var out = [];
  if (!e) return out;
  for (var k in e.ox) if (e.ox[k].f.indexOf("b") >= 0) out.push(+k);
  return out.sort(function (a, b) { return a - b; });
}

function skEl() {
  var e = null;
  DATA.el.forEach(function (x) { if (x.sym === SK.el) e = x; });
  return e;
}

function skButtons() {
  var box = $("#skOx"), list = skOxList(SK.el);
  if (list.indexOf(SK.ox) < 0) SK.ox = list[0];
  box.innerHTML = list.map(function (o) {
    return '<button type="button" data-ox="' + o + '" aria-pressed="'
         + (o === SK.ox ? "true" : "false") + '">' + NZ.roman(o) + "</button>";
  }).join("");
}

var SUFTXT = {1: "-ný", 2: "-natý", 3: "-itý", 4: "-ičitý", 5: "-ičný/-ečný",
              6: "-ový", 7: "-istý", 8: "-ičelý"};

function skDraw() {
  var e = skEl(); if (!e) return;
  var st = e.ox[String(SK.ox)]; if (!st) return;
  var adj = st.adj;
  var f = NZ.combine(e.sym, SK.ox, "O", 2);
  var T = [];
  function box(x, w, lbl, val, big, accent) {
    T.push('<rect x="' + x + '" y="30" width="' + w + '" height="54" rx="10" '
      + 'fill="var(--surface-2)" stroke="var(--line-strong)" stroke-width="1.4"/>');
    T.push('<text x="' + (x + w / 2) + '" y="22" text-anchor="middle" font-size="11" '
      + 'font-family="var(--f-cond)" font-weight="600" letter-spacing="1.4" '
      + 'fill="var(--ink-3)">' + lbl + "</text>");
    T.push('<text x="' + (x + w / 2) + '" y="64" text-anchor="middle" font-size="'
      + (big || 17) + '" font-family="var(--f-ui)" font-weight="'
      + (accent ? 700 : 600) + '" fill="' + (accent ? "var(--accent)" : "var(--ink)")
      + '">' + esc(val) + "</text>");
  }
  box(8, 180, "PRVEK", e.cz);
  T.push('<text x="200" y="64" text-anchor="middle" font-size="20" '
    + 'font-family="var(--f-ui)" fill="var(--ink-3)">+</text>');
  box(222, 150, "PŘÍPONA", SUFTXT[SK.ox] || "", 16);
  T.push('<text x="386" y="64" text-anchor="middle" font-size="20" '
    + 'font-family="var(--f-ui)" fill="var(--ink-3)">=</text>');
  box(406, 246, "PŘÍDAVNÉ JMÉNO", adj, 17, 1);
  T.push('<text x="8" y="106" font-size="11" font-family="var(--f-cond)" '
    + 'font-weight="600" letter-spacing="1.4" fill="var(--ink-3)">'
    + "SLOUČENINA S KYSLÍKEM</text>");
  T.push('<text x="652" y="106" text-anchor="end" font-size="12.5" '
    + 'font-family="var(--f-ui)" fill="var(--ink-2)">oxidační číslo '
    + NZ.roman(SK.ox) + "</text>");
  T.push('<rect x="8" y="118" width="644" height="62" rx="12" fill="var(--surface)" '
    + 'stroke="var(--accent)" stroke-width="1.6"/>');
  T.push('<text x="330" y="146" text-anchor="middle" font-size="19" '
    + 'font-family="var(--f-ui)" font-weight="700" fill="var(--ink)">oxid '
    + esc(adj) + "</text>");
  T.push('<text x="330" y="169" text-anchor="middle" font-size="16" '
    + 'font-family="var(--f-ui)" fill="var(--accent)">' + NZ.pretty(f) + "</text>");
  $("#skWrap").innerHTML = '<svg viewBox="0 0 660 192" role="img" aria-label="Skládání '
    + 'názvu: ' + esc(e.cz) + " s oxidačním číslem " + NZ.roman(SK.ox) + " dává oxid "
    + esc(adj) + '">' + T.join("") + "</svg>";
  var n = $("#skNote");
  /* Porovnáváme včetně diakritiky — právě háčky a čárky se v kmeni mění
     (síra → siřičitý), takže normalizace bez diakritiky by rozdíl zamaskovala. */
  var naive = e.cz.toLowerCase().replace(/(ium|um|ík|ka|a|o|ě)$/, "");
  var same = naive.length >= 3 && adj.toLowerCase().indexOf(naive) === 0;
  n.innerHTML = same
    ? "Tady kmen odpovídá názvu prvku, přípona se jen přilepí. Přepněte na "
      + "<b>síru</b>, <b>uhlík</b> nebo <b>nikl</b> a uvidíte, že to tak nebývá vždycky."
    : "Všimněte si, že kmen <b>není</b> název prvku s přilepenou příponou — "
      + "z „" + esc(e.cz) + "“ vyšlo „" + esc(adj) + "“. Právě proto se kmeny "
      + "musí umět zpaměti, spočítat se nedají.";
}

function bindSkladacka() {
  var sel = $("#skEl");
  sel.innerHTML = skElements().map(function (e) {
    return '<option value="' + e.sym + '"' + (e.sym === SK.el ? " selected" : "")
         + ">" + e.cz + " (" + e.sym + ")</option>";
  }).join("");
  sel.addEventListener("change", function () {
    SK.el = sel.value; skButtons(); skDraw();
  });
  $("#skOx").addEventListener("click", function (ev) {
    var b = ev.target.closest("button[data-ox]"); if (!b) return;
    SK.ox = +b.dataset.ox;
    $$("#skOx button").forEach(function (x) {
      x.setAttribute("aria-pressed", x === b ? "true" : "false");
    });
    skDraw();
  });
  skButtons(); skDraw();
}

/* ---------------------------------------------------------- filtry tabulek */
function bindFilter(inputId, tableId, countId) {
  var inp = $(inputId), tb = $(tableId), cnt = $(countId);
  if (!inp || !tb) return;
  var rows = $$("tbody tr", tb);
  function run() {
    var q = NZ.normName(inp.value), n = 0;
    rows.forEach(function (r) {
      var hit = !q || NZ.normName(r.textContent).indexOf(q) >= 0
             || r.textContent.toLowerCase().indexOf(inp.value.trim().toLowerCase()) >= 0;
      r.hidden = !hit; if (hit) n++;
    });
    if (cnt) cnt.textContent = n === rows.length ? (rows.length + " řádků")
                                                 : (n + " z " + rows.length);
  }
  inp.addEventListener("input", run);
  run();
}

/* ---------------------------------------------------------- trenažér */
var CFG = null, ST = null, TASK = null, ANSWERED = false;

function defCfg() {
  return {dir: "mix", cats: ["ox", "oxidy", "hydroxidy", "bezkysl", "kyseliny",
                             "soli", "hydro"]};
}
function defSt() { return {cat: {}, n: 0, ok: 0, streak: 0, best: 0}; }

function catStat(id) {
  if (!ST.cat[id]) ST.cat[id] = {n: 0, ok: 0};
  return ST.cat[id];
}

function renderChips() {
  $("#catChips").innerHTML = NZ.classes.map(function (c) {
    var s = ST.cat[c.id], p = s && s.n ? Math.round(100 * s.ok / s.n) + " %" : "";
    return '<button class="chip" type="button" data-cat="' + c.id + '" aria-pressed="'
      + (CFG.cats.indexOf(c.id) >= 0 ? "true" : "false") + '">' + c.t
      + (p ? ' <span class="pc">' + p + "</span>" : "") + "</button>";
  }).join("");
}

function renderScore() {
  $("#scN").textContent = ST.n;
  $("#scOk").textContent = ST.n ? (ST.ok + " (" + Math.round(100 * ST.ok / ST.n) + " %)")
                                : "0";
  $("#scStreak").textContent = ST.streak;
  $("#scBest").textContent = ST.best;
  var g = $("#catGrid");
  g.innerHTML = NZ.classes.map(function (c) {
    var s = ST.cat[c.id] || {n: 0, ok: 0};
    var p = s.n ? Math.round(100 * s.ok / s.n) : 0;
    var cl = s.n === 0 ? "" : (p >= 80 ? " good" : (p >= 55 ? " mid" : ""));
    return '<div class="catrow"><div class="ct"><span>' + c.t + '</span>'
      + '<span class="n">' + (s.n ? s.ok + " / " + s.n + " · " + p + " %" : "zatím nic")
      + '</span></div><div class="scorebar"><i class="' + cl.trim() + '" style="width:'
      + (s.n ? p : 0) + '%"></i></div></div>';
  }).join("");
}

function newTask() {
  var t = null;
  try { t = NZ.gen(CFG.cats, CFG.dir, TASK ? TASK.f : null); } catch (e) { t = null; }
  if (!t) { toast("Zapněte aspoň jednu kategorii."); return; }
  TASK = t; ANSWERED = false;
  var cls = NZ.classes.filter(function (c) { return c.id === t.cls; })[0];
  $("#trKind").textContent = (cls ? cls.t : "") + " · "
    + (t.kind === "f2n" ? "vzorec → název"
      : t.kind === "n2f" ? "název → vzorec" : "oxidační číslo");
  $("#trQ").innerHTML = t.q;
  $("#trHint").textContent = t.hint;
  var inp = $("#trIn");
  inp.value = ""; inp.disabled = false;
  inp.placeholder = t.kind === "n2f" ? "například H2SO4"
                  : t.kind === "ox" ? "například VI nebo 6" : "například oxid uhličitý";
  $("#trPrev").innerHTML = "";
  $("#trOut").innerHTML = "";
  $("#btnCheck").hidden = false;
  $("#btnGive").hidden = false;
  $("#btnNext").hidden = true;
  inp.focus();
}

function preview() {
  var v = $("#trIn").value, box = $("#trPrev");
  if (!TASK || !v.trim()) { box.innerHTML = ""; return; }
  if (TASK.kind === "n2f") {
    box.innerHTML = "vysází se jako <b>" + esc(NZ.pretty(NZ.normFormula(v))) + "</b>";
  } else if (TASK.kind === "ox") {
    var p = NZ.parseOx(v);
    box.innerHTML = p === null ? "<span>zatím to nedokážu přečíst jako oxidační číslo</span>"
                               : "čtu jako <b>" + NZ.roman(p) + "</b>";
  } else {
    box.innerHTML = "";
  }
}

function finish(res) {
  ANSWERED = true;
  var s = catStat(TASK.cls);
  s.n++; ST.n++;
  if (res.ok) { s.ok++; ST.ok++; ST.streak++; if (ST.streak > ST.best) ST.best = ST.streak; }
  else { ST.streak = 0; }
  store.set("stats", ST);
  var w = (res.why || []).map(function (x) { return "<p>" + x + "</p>"; }).join("");
  $("#trOut").innerHTML = '<div class="verdict ' + (res.ok ? "ok" : "bad") + '">'
    + '<div class="vh">' + (res.ok ? "Správně" : "Ještě ne")
    + (res.ok && ST.streak > 2 ? "<span>· série " + ST.streak + "</span>" : "")
    + "</div><p>" + res.msg + "</p>"
    + (w ? '<div class="why">' + w + "</div>" : "") + "</div>";
  $("#trIn").disabled = true;
  $("#btnCheck").hidden = true;
  $("#btnGive").hidden = true;
  $("#btnNext").hidden = false;
  $("#btnNext").focus();
  renderScore(); renderChips();
}

function check() {
  if (!TASK || ANSWERED) return;
  var v = $("#trIn").value;
  if (!v.trim()) { toast("Napište odpověď, nebo klepněte na Nevím."); return; }
  finish(NZ.grade(TASK, v));
}

function giveUp() {
  if (!TASK || ANSWERED) return;
  var r = NZ.grade(TASK, "");
  r.ok = false;
  r.msg = "Správná odpověď je " + (TASK.kind === "n2f" ? NZ.pretty(TASK.ans)
        : TASK.kind === "ox" ? NZ.roman(TASK.ox) : "„" + TASK.ans + "“") + ".";
  finish(r);
}

function bindTrainer() {
  CFG = store.get("cfg", null) || defCfg();
  if (!CFG.cats || !CFG.cats.length) CFG = defCfg();
  ST = store.get("stats", null) || defSt();
  if (!ST.cat) ST = defSt();

  $$("#dirSeg button").forEach(function (b) {
    b.setAttribute("aria-pressed", b.dataset.dir === CFG.dir ? "true" : "false");
  });
  $("#dirSeg").addEventListener("click", function (ev) {
    var b = ev.target.closest("button[data-dir]"); if (!b) return;
    CFG.dir = b.dataset.dir; store.set("cfg", CFG);
    $$("#dirSeg button").forEach(function (x) {
      x.setAttribute("aria-pressed", x === b ? "true" : "false");
    });
    newTask();
  });

  renderChips();
  $("#catChips").addEventListener("click", function (ev) {
    var b = ev.target.closest("button[data-cat]"); if (!b) return;
    var id = b.dataset.cat, i = CFG.cats.indexOf(id);
    if (i >= 0) {
      if (CFG.cats.length === 1) { toast("Aspoň jedna kategorie musí zůstat zapnutá."); return; }
      CFG.cats.splice(i, 1);
    } else { CFG.cats.push(id); }
    b.setAttribute("aria-pressed", CFG.cats.indexOf(id) >= 0 ? "true" : "false");
    store.set("cfg", CFG);
    newTask();
  });
  $("#catAll").addEventListener("click", function () {
    CFG.cats = NZ.classes.map(function (c) { return c.id; });
    store.set("cfg", CFG); renderChips(); newTask();
  });
  $("#catBasic").addEventListener("click", function () {
    CFG.cats = ["ox", "oxidy", "hydroxidy", "bezkysl"];
    store.set("cfg", CFG); renderChips(); newTask();
  });

  $("#btnCheck").addEventListener("click", check);
  $("#btnGive").addEventListener("click", giveUp);
  $("#btnNext").addEventListener("click", newTask);
  $("#trIn").addEventListener("input", preview);
  $("#trIn").addEventListener("keydown", function (ev) {
    if (ev.key === "Enter") { ev.preventDefault(); check(); }
  });
  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Enter" && ANSWERED && !$("#btnNext").hidden) {
      var a = document.activeElement;
      if (a && (a.tagName === "INPUT" || a.tagName === "SELECT")
          && a.id !== "trIn") return;
      ev.preventDefault(); newTask();
    }
  });
  $("#btnReset").addEventListener("click", function () {
    ST = defSt(); store.set("stats", ST);
    renderScore(); renderChips(); toast("Pokrok vymazán.");
  });

  renderScore();
  newTask();
}

/* ---------------------------------------------------------- start */
function initAll() {
  NZ.init(DATA);
  bindSkladacka();
  bindFilter("#fEl", "#tabEl", "#fElCnt");
  bindFilter("#fAn", "#tabAn", "#fAnCnt");
  bindTrainer();
  /* zkušební vstup pro programovou kontrolu (200+ úloh) */
  window.__NZ = {NZ: NZ, cfg: function () { return CFG; }, task: function () { return TASK; }};
}

if (document.readyState === "loading")
  document.addEventListener("DOMContentLoaded", initAll);
else initAll();
"""
