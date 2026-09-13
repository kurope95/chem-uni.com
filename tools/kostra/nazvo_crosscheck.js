/* nazvo_crosscheck.js — křížová kontrola datové tabulky proti hotovým průvodcům.
   Z 19 HTML souborů na webu vytáhne dvojice „název ↔ vzorec“ a porovná je
   s katalogem, který skládá nazvo_engine.js.   node nazvo_crosscheck.js */
"use strict";
var fs = require("fs"), path = require("path");
var NZ = require("./nazvo_engine.js");
var D = JSON.parse(fs.readFileSync(path.join(__dirname, "nazvo_data.json"), "utf8"));
NZ.init(D);
var IDX = NZ.index();

var ROOT = "C:\\Claude Code\\Claude Code\\Doučovanie";
var DIRS = ["obecna-fyzikalni-chemie", "anorganicka-chemie"];

/* ---------- značky prvků, aby se poznalo, co je vzorec ---------- */
var SYM = {};
("H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn "
 + "Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La "
 + "Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po "
 + "At Rn Fr Ra Ac Th Pa U Np Pu Am Cm").split(" ").forEach(function (s) { SYM[s] = 1; });

function isFormula(s) {
  if (s.length < 2) return false;
  var i = 0, n = 0, depth = 0;
  while (i < s.length) {
    var c = s[i];
    if (c === "(" || c === "[") { depth++; i++; continue; }
    if (c === ")" || c === "]") { depth--; if (depth < 0) return false; i++; continue; }
    if (c === "·") { i++; continue; }
    if (/[0-9]/.test(c)) { while (i < s.length && /[0-9]/.test(s[i])) i++; continue; }
    if (!/[A-Z]/.test(c)) return false;
    var sym = c;
    if (i + 1 < s.length && /[a-z]/.test(s[i + 1]) && SYM[c + s[i + 1]]) { sym += s[i + 1]; i++; }
    if (!SYM[sym]) return false;
    n++; i++;
  }
  return depth === 0 && n >= 1;
}

/* ---------- text stránky ---------- */
var ENT = {nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'",
           bdquo: "„", ldquo: "“", rdquo: "”", hellip: "…", ndash: "–", mdash: "—",
           times: "×", middot: "·", minus: "−", rarr: "→", larr: "←", harr: "↔",
           deg: "°", sup2: "2", sup3: "3", plusmn: "±", ne: "≠", le: "≤", ge: "≥",
           alpha: "α", beta: "β", gamma: "γ", Delta: "Δ", delta: "δ", pi: "π",
           sigma: "σ", lambda: "λ", mu: "μ", chi: "χ", theta: "θ", nu: "ν",
           omega: "ω", infin: "∞", rsquo: "’", lsquo: "‘", shy: "", ensp: " ",
           emsp: " ", thinsp: " "};
var SUBD = "₀₁₂₃₄₅₆₇₈₉";

function plain(html) {
  var t = html.replace(/<script[\s\S]*?<\/script>/gi, " ")
              .replace(/<style[\s\S]*?<\/style>/gi, " ")
              .replace(/<sub>([^<]*)<\/sub>/gi, "$1")
              .replace(/<sup>([^<]*)<\/sup>/gi, "^$1")
              .replace(/<[^>]+>/g, " ");
  t = t.replace(/&([a-zA-Z#0-9]+);/g, function (m, e) {
    return ENT[e] !== undefined ? ENT[e] : " ";
  });
  var out = "";
  for (var i = 0; i < t.length; i++) {
    var k = SUBD.indexOf(t[i]);
    out += k >= 0 ? String(k) : t[i];
  }
  return out.replace(/[ \t]+/g, " ");
}

function scripts(html) {
  var out = [], re = /<script[^>]*>([\s\S]*?)<\/script>/gi, m;
  while ((m = re.exec(html))) out.push(m[1]);
  return plain(out.join("\n").replace(/\\u([0-9a-fA-F]{4})/g, function (a, h) {
    return String.fromCharCode(parseInt(h, 16));
  }));
}

/* ---------- slovníky z tabulky ---------- */
var ADJS = {};                       /* kmen (bez -ý) → nominativ */
D.el.forEach(function (e) {
  for (var k in e.ox) { var a = e.ox[k].adj; ADJS[a.slice(0, -1)] = a; }
});
ADJS["amonn"] = "amonný";
["vodíková", "chlorovodíková", "fluorovodíková", "bromovodíková", "jodovodíková",
 "sirovodíková", "kyanovodíková", "selenovodíková", "azidovodíková"]
  .forEach(function (a) { ADJS[a.slice(0, -1)] = a.slice(0, -1) + "á"; });

var NOUNS = {};
D.oxo.forEach(function (a) { NOUNS[a.n] = 1; });
D.simple.forEach(function (a) { NOUNS[a.n] = 1; });
["oxid", "peroxid", "hydroxid"].forEach(function (n) { NOUNS[n] = 1; });
D.oxo.forEach(function (a) {
  if (!a.h) return;
  for (var i = 1; i <= a.h; i++)
    NOUNS[(i === 1 ? "" : ["", "", "di", "tri"][i]) + "hydrogen" + a.n] = 1;
});

function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function alt(keys) {
  return keys.sort(function (a, b) { return b.length - a.length; }).map(esc).join("|");
}

/* pádové koncovky tvrdých přídavných jmen */
var CASE = "(?:ý|ého|ému|ém|ým|ých|ými|á|é|ou|í|ým[ia])";
var NCASE = "(?:u|em|y|ů|ům|ech|em|e|ě)?";
var RE = new RegExp("\\b(" + alt(Object.keys(NOUNS)) + ")" + NCASE
                    + "\\s+(" + alt(Object.keys(ADJS)) + ")" + CASE + "\\b", "g");
var REK = new RegExp("\\bkyselin\\w{0,3}\\s+(" + alt(Object.keys(ADJS)) + ")"
                     + CASE + "\\b", "g");
/* volný záchyt názvů, které tabulka neumí — na hledání děr */
var LOOSE = new RegExp("\\b(" + alt(Object.keys(NOUNS)) + ")" + NCASE
  + "\\s+([a-záčďéěíňóřšťúůýž]{3,}(?:ičel|ičit|ečn|ičn|ist|ov|nat|it|n))" + CASE + "\\b", "g");

/* ---------- porovnání ---------- */
var stat = {files: 0, hits: 0, pairs: 0, ok: 0, mismatch: [], nameOnly: 0,
            names: {}, gaps: {}, notIn: {}, inTable: 0};

function tableFormula(norm) {
  var l = IDX.n[norm];
  if (!l) return null;
  if (l.length > 1) return null;
  return l[0];
}

/* těsně přiléhající vzorec: hned před názvem nebo hned za ním */
function adjacentFormula(text, a, b) {
  var out = [];
  var after = text.slice(b, b + 28);
  var m = /^[\s,:—–-]*[(\[]?\s*([A-Z][A-Za-z0-9()\[\]·]*)/.exec(after);
  if (m && isFormula(m[1])) out.push(m[1]);
  var before = text.slice(Math.max(0, a - 28), a);
  var m2 = /([A-Z][A-Za-z0-9()\[\]·]*)\s*[)\]]?[\s,:—–-]*$/.exec(before);
  if (m2 && isFormula(m2[1])) out.push(m2[1]);
  return out;
}

function handle(file, text, whole, a, b) {
  var norm = NZ.normName(whole);
  stat.hits++;
  stat.names[norm] = (stat.names[norm] || 0) + 1;
  var e = tableFormula(norm);
  if (!e) { stat.notIn[norm] = (stat.notIn[norm] || 0) + 1; return; }
  stat.inTable++;
  var fs2 = adjacentFormula(text, a, b);
  if (!fs2.length) { stat.nameOnly++; return; }
  stat.pairs++;
  var want = [NZ.normFormula(e.f)].concat((e.altf || []).map(NZ.normFormula));
  var got = fs2.map(NZ.normFormula);
  for (var i = 0; i < got.length; i++) if (want.indexOf(got[i]) >= 0) { stat.ok++; return; }
  stat.mismatch.push({file: file, name: whole, table: e.f, near: fs2,
    ctx: text.slice(Math.max(0, a - 60), b + 60).replace(/\s+/g, " ").trim()});
}

function scan(file, text) {
  var m;
  RE.lastIndex = 0;
  while ((m = RE.exec(text))) {
    var adj = ADJS[m[2]];
    handle(file, text, m[1] + " " + adj, m.index, m.index + m[0].length);
  }
  REK.lastIndex = 0;
  while ((m = REK.exec(text))) {
    var a2 = ADJS[m[1]];
    handle(file, text, "kyselina " + (a2.slice(-1) === "ý" ? NZ.fem(a2) : a2),
           m.index, m.index + m[0].length);
  }
  LOOSE.lastIndex = 0;
  while ((m = LOOSE.exec(text))) {
    if (ADJS[m[2]]) continue;
    var k = m[1] + " " + m[2] + "ý";
    if (!stat.gaps[k]) stat.gaps[k] = {c: 0, f: file, ctx: ""};
    stat.gaps[k].c++;
    if (!stat.gaps[k].ctx)
      stat.gaps[k].ctx = text.slice(Math.max(0, m.index - 30), m.index + m[0].length + 30)
                             .replace(/\s+/g, " ").trim();
  }
}

var CORPUS = [];
DIRS.forEach(function (d) {
  var dir = path.join(ROOT, d);
  fs.readdirSync(dir).filter(function (f) {
    return /\.html$/.test(f) && f !== "index.html";
  }).forEach(function (f) {
    stat.files++;
    var html = fs.readFileSync(path.join(dir, f), "utf8");
    var t1 = plain(html), t2 = scripts(html);
    CORPUS.push(t1, t2);
    scan(d + "/" + f, t1);
    scan(d + "/" + f, t2);
  });
});

console.log("prohledáno souborů: %d", stat.files);
console.log("výskytů názvů z tabulky: %d  (různých názvů: %d)",
            stat.hits, Object.keys(stat.names).length);
console.log("z toho tabulka umí složit: %d výskytů", stat.inTable);
var ni = Object.keys(stat.notIn);
console.log("kombinace, které tabulka nezná: %d (%s)", ni.length,
            ni.map(function(k){return k + "×" + stat.notIn[k];}).join(", ") || "žádná");
console.log("těsných dvojic název↔vzorec: %d", stat.pairs);
console.log("   sedí:        %d", stat.ok);
console.log("   nesouhlasí:  %d", stat.mismatch.length);
console.log("výskytů bez vzorce hned vedle (ověřen jen tvar názvu): %d", stat.nameOnly);

console.log("\n--- nesoulady (každý prošetřit) ---");
stat.mismatch.forEach(function (x) {
  console.log("%s: „%s“ → tabulka %s, v textu %s\n      … %s",
              x.file.split("/")[1], x.name, x.table, x.near.join(" "), x.ctx);
});

var gaps = Object.keys(stat.gaps).sort(function (a, b) {
  return stat.gaps[b].c - stat.gaps[a].c; });
console.log("\n--- názvy na webu, které tabulka neumí (%d) ---", gaps.length);
gaps.forEach(function (g) {
  console.log("   %s ×%d  [%s] … %s", g, stat.gaps[g].c,
              stat.gaps[g].f.split("/")[1], stat.gaps[g].ctx.slice(0, 90));
});

/* doloženost jednotlivých přídavných jmen a aniontů na webu */
var ALLTXT = CORPUS.join(" ");
function attested(list, mk) {
  var yes = [], no = [];
  list.forEach(function (x) {
    var stem = mk(x);
    (new RegExp("\\b" + esc(stem)).test(ALLTXT) ? yes : no).push(x);
  });
  return {yes: yes, no: no};
}
var adjList = [];
D.el.forEach(function (e) { for (var k in e.ox) adjList.push(e.ox[k].adj); });
var A = attested(adjList, function (a) { return a.slice(0, -1); });
console.log("\npřídavná jména z tabulky doložená na webu: %d / %d",
            A.yes.length, adjList.length);
console.log("   nedoložená: %s", A.no.join(", "));
var anList = D.oxo.map(function (a) { return a.n; })
             .concat(D.simple.map(function (a) { return a.n; }));
var B = attested(anList, function (a) { return a; });
console.log("anionty z tabulky doložené na webu: %d / %d", B.yes.length, anList.length);
console.log("   nedoložené: %s", B.no.join(", "));

/* nejčastější ověřené názvy — kontrola, že se opravdu porovnávalo něco podstatného */
var top = Object.keys(stat.names).sort(function (a, b) {
  return stat.names[b] - stat.names[a]; }).slice(0, 25);
console.log("\nnejčastější ověřené názvy: %s",
            top.map(function (n) { return n + "×" + stat.names[n]; }).join(", "));
