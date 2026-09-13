/* nazvo_selftest.js — postaví katalog, ověří jednoznačnost a projede
   N vygenerovaných úloh přes vlastní vyhodnocovač.  node nazvo_selftest.js [N] */
"use strict";
var fs = require("fs"), path = require("path");
var NZ = require("./nazvo_engine.js");
var D = JSON.parse(fs.readFileSync(path.join(__dirname, "nazvo_data.json"), "utf8"));
var CAT = NZ.init(D);
var IDX = NZ.index();

var byCls = NZ.byClass();
console.log("katalog: %d sloučenin", CAT.length);
Object.keys(byCls).forEach(function (k) {
  console.log("   " + k.padEnd(11) + String(byCls[k].length).padStart(6) + "  (jednoznačných " + byCls[k].filter(function (o) { return o.uniqF && o.uniqN; }).length + ")");
});

var dupF = Object.keys(IDX.f).filter(function (f) { return IDX.f[f].length > 1; });
var dupN = Object.keys(IDX.n).filter(function (n) { return IDX.n[n].length > 1; });
console.log("\nvzorců se dvěma názvy: %d", dupF.length);
dupF.slice(0, 40).forEach(function (f) {
  console.log("   " + f.padEnd(16) + " → " + IDX.f[f].map(function (o) { return o.n; }).join(" | "));
});
console.log("názvů se dvěma vzorci: %d", dupN.length);
dupN.slice(0, 40).forEach(function (n) {
  console.log("   " + n.padEnd(30) + " → " + IDX.n[n].map(function (o) { return o.f; }).join(" | "));
});

/* ukázky z každé třídy */
console.log("\n--- ukázky ---");
Object.keys(byCls).forEach(function (k) {
  var s = byCls[k].filter(function (o) { return o.uniqF && o.uniqN; });
  var out = [];
  for (var i = 0; i < 8 && i < s.length; i++) {
    var o = s[Math.floor(i * s.length / 8)];
    out.push(NZ.pretty(o.f) + " = " + o.n);
  }
  console.log(k.padEnd(11) + out.join("  ·  "));
});

/* bilance oxidačních čísel: v každé neutrální sloučenině musí dát součet nulu */
var bal = {ok: 0, skip: 0, bad: []};
CAT.forEach(function (o) {
  var tgt = null;
  if (o.anel && o.anox) tgt = o.anel;
  else if (o.el && o.ox) tgt = o.el;
  if (!tgt) { bal.skip++; return; }
  var B = NZ.oxBalance(o, tgt);
  var known = (tgt === o.anel) ? o.anox : o.ox;
  if (!B.full || !B.n) { bal.skip++; return; }
  if (-B.sum === B.n * known) bal.ok++;
  else bal.bad.push(o.f + " = " + o.n + " → součet " + B.sum + ", "
                    + B.n + "×" + tgt + " má být " + (B.n * known));
});
console.log("");
console.log("bilance oxidačních čísel: %d sedí, %d nelze ověřit, %d nesedí",
            bal.ok, bal.skip, bal.bad.length);
bal.bad.slice(0, 20).forEach(function (b) { console.log("   (?) " + b); });
console.log("   pozn.: amonné soli dusíkatých kyselin mají dusík ve dvou různých");
console.log("   oxidačních číslech (−III v kationtu, +V v aniontu), součet přes");
console.log("   celý vzorec je tam nesmyslný — do úloh na oxidační čísla nejdou.");
var pool = NZ.oxPool();
console.log("zásoba úloh na oxidační čísla: %d (bilance ověřena u všech)", pool.length);

/* projetí úloh */
var N = +(process.argv[2] || 300);
var ids = NZ.classes.map(function (c) { return c.id; });
var okc = 0, bad = [], byk = {};
for (var i = 0; i < N; i++) {
  var t = NZ.gen(ids, "mix");
  byk[t.kind] = (byk[t.kind] || 0) + 1;
  /* 1) správná odpověď musí projít */
  var r = NZ.grade(t, t.ans);
  if (!r.ok) { bad.push(["správná neuznána", t.kind, t.f, t.ans, r.msg]); continue; }
  /* 2) v katalogu smí být právě jedna sloučenina s touto odpovědí */
  var cnt;
  if (t.kind === "f2n") cnt = IDX.f[t.f].length;
  else if (t.kind === "n2f") cnt = IDX.n[NZ.normName(t.o.n)].length;
  else cnt = 1;
  if (cnt !== 1) { bad.push(["nejednoznačná úloha", t.kind, t.f, t.ans, "×" + cnt]); continue; }
  /* 3) zjevně špatná odpověď musí propadnout */
  var wrong = t.kind === "ox" ? String(t.ox === 3 ? 5 : 3)
            : t.kind === "n2f" ? "XyZ9" : "oxid nesmyslný";
  var r2 = NZ.grade(t, wrong);
  if (r2.ok) { bad.push(["špatná uznána", t.kind, t.f, wrong, ""]); continue; }
  /* 4) vysvětlení nesmí být prázdné a nesmí obsahovat undefined */
  var wtxt = (r.why || []).join(" ") + " " + r.msg;
  if (!wtxt.trim() || /undefined|null|(^|[^A-Za-z])NaN([^A-Za-z0-9₀-₉]|$)/.test(wtxt)) {
    bad.push(["vadné vysvětlení", t.kind, t.f, t.ans, wtxt.slice(0, 120)]); continue;
  }
  okc++;
}
console.log("\n--- projetí %d úloh ---", N);
console.log("rozložení: %s", JSON.stringify(byk));
console.log("prošlo: %d / %d", okc, N);
bad.slice(0, 30).forEach(function (b) { console.log("   !! %s", b.join(" | ")); });
if (bad.length > 30) console.log("   … a dalších %d", bad.length - 30);
