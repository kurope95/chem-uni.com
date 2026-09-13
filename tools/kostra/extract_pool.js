// extract_pool.js — vytáhne všechny otázky z hotových průvodců do jednoho fondu.
// Spuštění:  node extract_pool.js  ->  pool.json
const fs = require("fs");
const path = require("path");

const ROOT = "C:\\Claude Code\\Claude Code\\Doučovanie";
const SUB = path.join(ROOT, "obecna-fyzikalni-chemie");
const ANORG = path.join(ROOT, "anorganicka-chemie");
const POCTY = path.join(ROOT, "jak-pocitat");
const OUT = path.join(__dirname, "pool.json");

// slug -> {n, název} podle osnovy
const TOPICS = [
  ["atomove-jadro", "01", "Atomové jádro a radioaktivita"],
  ["elektronovy-obal", "02", "Elektronový obal a periodická tabulka"],
  ["chemicka-vazba", "03", "Chemická vazba"],
  ["struktura-latek", "04", "Struktura a vlastnosti látek"],
  ["termochemie", "05", "Termochemie a termodynamika"],
  ["chemicka-kinetika", "06", "Chemická kinetika"],
  ["chemicka-rovnovaha", "07", "Chemická rovnováha"],
  ["elektrochemie", "08", "Rovnovážná elektrochemie"],
  ["acidobazicke-reakce", "09", "Acidobazické reakce"],
  ["vypocty-rovnovah", "10", "Výpočty chemických rovnováh"],
];

// modul Anorganická chemie — pořadí podle Klikorky
const ANORG_TOPICS = [
  ["vodik-a-voda", "A1", "Vodík a voda"],
  ["halogeny-a-vzacne-plyny", "A2", "Halogeny a vzácné plyny"],
  ["kyslik-a-chalkogeny", "A3", "Kyslík a chalkogeny"],
  ["dusik-a-fosfor", "A4", "Dusík a fosfor"],
  ["uhlik-kremik-bor", "A5", "Uhlík, křemík a bor"],
  ["elementarni-kovy", "A6", "Elementární kovy"],
  ["neprechodne-kovy", "A7", "Nepřechodné kovy"],
  ["koordinacni-slouceniny", "A8", "Koordinační sloučeniny"],
  ["prechodne-kovy", "A9", "Přechodné kovy"],
];

// pod-modul sekce Jak počítat (leží ve vlastní složce jako index.html)
const SUBMODULES = [
  ["zlomky-a-zavorky", "P1", "Zlomky a závorky"],
];

// (složka, seznam okruhů, jak se skládá cesta k souboru)
const SOURCES = [
  [SUB, TOPICS, (dir, slug) => path.join(dir, slug + ".html")],
  [ANORG, ANORG_TOPICS, (dir, slug) => path.join(dir, slug + ".html")],
  [POCTY, SUBMODULES, (dir, slug) => path.join(dir, slug, "index.html")],
];

function arrayLiteralAt(src, start) {
  // start ukazuje na '['; vrátí index znaku ZA odpovídající ']'
  let depth = 0, i = start, inStr = null;
  for (; i < src.length; i++) {
    const ch = src[i];
    if (inStr) {
      if (ch === "\\") { i++; continue; }
      if (ch === inStr) inStr = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") { inStr = ch; continue; }
    if (ch === "[") depth++;
    else if (ch === "]") { depth--; if (depth === 0) return i + 1; }
  }
  return -1;
}

const pool = [];
const stats = [];

for (const [dir, list, mkpath] of SOURCES)
for (const [slug, num, title] of list) {
  const file = mkpath(dir, slug);
  if (!fs.existsSync(file)) { console.error("chybí " + slug + " (ještě nevznikl)"); continue; }
  const html = fs.readFileSync(file, "utf8");
  const re = /\bBANK\.(\w+)\s*=\s*\[/g;
  let m, count = 0, banks = 0;
  while ((m = re.exec(html)) !== null) {
    const key = m[1];
    const s = m.index + m[0].length - 1;
    const e = arrayLiteralAt(html, s);
    if (e < 0) continue;
    let arr;
    try {
      // pouze datový literál — bezpečné vyhodnotit
      arr = Function('"use strict";return (' + html.slice(s, e) + ");")();
    } catch (err) {
      console.error(slug + "." + key + ": " + err.message);
      continue;
    }
    banks++;
    for (const q of arr) {
      if (!q || !q.t) continue;
      pool.push({
        topic: slug, tn: num, tt: title, bank: key,
        t: q.t, q: q.q,
        o: q.o || null, c: q.c === undefined ? null : q.c,
        ans: q.ans === undefined ? null : q.ans,
        tol: q.tol === undefined ? null : q.tol,
        unit: q.unit || "",
        e: q.e || "",
      });
      count++;
    }
  }
  stats.push({ slug, num, title, banks, count });
}

// deduplikace podle znění otázky v rámci tématu
const seen = new Set();
const uniq = pool.filter((q) => {
  const k = q.topic + "|" + q.q.replace(/\s+/g, " ").trim();
  if (seen.has(k)) return false;
  seen.add(k); return true;
});

fs.writeFileSync(OUT, JSON.stringify(uniq), "utf8");
console.log("téma                         bank  otázek");
for (const s of stats) console.log(`  ${s.num} ${s.slug.padEnd(24)} ${String(s.banks).padStart(2)}  ${String(s.count).padStart(4)}`);
console.log("celkem vytaženo:", pool.length, "| po deduplikaci:", uniq.length);
const byType = uniq.reduce((a, q) => ((a[q.t] = (a[q.t] || 0) + 1), a), {});
console.log("podle typu:", JSON.stringify(byType));
console.log("zapsáno:", OUT, (fs.statSync(OUT).size / 1024).toFixed(0), "KB");
