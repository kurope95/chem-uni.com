/* ============================================================
   32 · MODEL — stechiometrické schéma m → n → n → m
   ============================================================ */
var stState = {rx:0, m:500};

function drawSto(){
  var r = STRX[stState.rx], m = stState.m;
  var nA = m / r.Ma, nB = nA * r.nb / r.na, mB = nB * r.Mb;
  var W = 780, H = 260;
  var bw = 118, bh = 66, y = 96;
  var xs = [24, 228, 432, 636];
  var lbl = ["m(" + r.a + ")", "n(" + r.a + ")", "n(" + r.b + ")", "m(" + r.b + ")"];
  var val = [pcNum(m,4) + " g", pcNum(nA,4) + " mol", pcNum(nB,4) + " mol", pcNum(mB,4) + " g"];
  var cols = ["var(--exo)", "var(--accent)", "var(--accent)", "var(--endo)"];
  var s = "";
  /* rovnice nahoře */
  s += txt(W/2, 34, r.eq, {anchor:"middle", size:16, w:700, fill:"var(--ink)"});
  s += txt(W/2, 54, "vyčíslená rovnice — teprve z ní plyne poměr " + r.na + " : " + r.nb,
        {anchor:"middle", size:11.5, fill:"var(--ink-3)"});
  /* rámečky */
  for(var i = 0; i < 4; i++){
    var hi = (i === 1 || i === 2);
    s += rect(xs[i], y, bw, bh, {fill: hi ? "var(--accent-soft)" : "var(--surface-2)", r:11,
      stroke: cols[i], sw: hi ? 1.8 : 1.2});
    s += txt(xs[i] + bw/2, y + 25, lbl[i], {anchor:"middle", size:13, w:700, fill:cols[i]});
    s += txt(xs[i] + bw/2, y + 47, val[i], {anchor:"middle", size:14, w:600, mono:true, fill:"var(--ink)"});
  }
  /* šipky */
  /* popisky jsou dvouřádkové — na jeden řádek se do mezery mezi rámečky nevejdou */
  var opsA = ["÷ M", "× " + r.nb + "/" + r.na, "× M"];
  var opsB = ["= " + pcNum(r.Ma,5), "", "= " + pcNum(r.Mb,4)];
  var opn1 = ["molární", "stechiometrický", "molární"];
  var opn2 = ["hmotnost", "poměr", "hmotnost"];
  for(var j = 0; j < 3; j++){
    var x1 = xs[j] + bw + 6, x2 = xs[j+1] - 12;
    var c = (j === 1) ? "var(--accent)" : "var(--ink-3)";
    var xm = (x1 + x2)/2;
    s += line(x1, y + bh/2, x2, y + bh/2, {c:c, w: (j===1?2.4:1.8), cap:"round"});
    s += '<path d="M' + (xs[j+1] - 4) + ' ' + (y + bh/2) + ' l-9 -5 l0 10 z" style="fill:' + c + '"/>';
    if(opsB[j]){
      s += txt(xm, y + bh/2 - 29, opsA[j], {anchor:"middle", size:11.5, w:700, mono:true, fill:c});
      s += txt(xm, y + bh/2 - 11, opsB[j], {anchor:"middle", size:11.5, w:700, mono:true, fill:c});
    } else {
      s += txt(xm, y + bh/2 - 12, opsA[j], {anchor:"middle", size:12.5, w:700, mono:true, fill:c});
    }
    s += txt(xm, y + bh/2 + 21, opn1[j], {anchor:"middle", size:10, fill:"var(--ink-3)"});
    s += txt(xm, y + bh/2 + 37, opn2[j], {anchor:"middle", size:10, fill:"var(--ink-3)"});
  }
  /* pás pod schématem */
  s += line(26, 208, 754, 208, {c:"var(--line)", w:1, dash:"3 4"});
  s += txt(26, 230, "gramy", {size:11.5, w:600, fill:"var(--exo)"});
  s += txt(320, 230, "svět molů — tady a jen tady platí koeficienty",
        {anchor:"middle", size:11.5, w:600, fill:"var(--accent)"});
  s += txt(754, 230, "gramy", {size:11.5, w:600, fill:"var(--endo)", anchor:"end"});
  $("#stWrap").innerHTML = svg("0 0 " + W + " " + H, s, 'aria-label="Schéma stechiometrického výpočtu"');

  $("#stMV").textContent = m + " g";
  var ro1 = $("#stRo1"), ro2 = $("#stRo2"), ro3 = $("#stRo3");
  ro1.children[0].textContent = "n(" + r.a + ")";
  ro1.children[1].textContent = pcNum(nA,4) + " mol";
  ro1.children[2].textContent = "= " + m + " g / " + pcNum(r.Ma,5) + " g·mol⁻¹";
  ro2.children[0].textContent = "n(" + r.b + ")";
  ro2.children[1].textContent = pcNum(nB,4) + " mol";
  ro2.children[2].textContent = "poměr " + r.na + " : " + r.nb;
  ro3.children[0].textContent = "m(" + r.b + ")";
  ro3.children[1].textContent = pcNum(mB,4) + " g";
  ro3.children[2].textContent = r.note;
}

/* ============================================================
   33 · MODEL — kalkulačka ředění a mísení
   ============================================================ */
var dlState = {mode:"dil", c1:2.00, v1:25, c2:0.20, v2:250};

function drawDil(){
  var st = dlState, mix = (st.mode === "mix");
  $("#dlC1V").textContent = fmt(st.c1,2) + " mol·dm⁻³";
  $("#dlV1V").textContent = st.v1 + " cm³";
  $("#dlC2V").textContent = fmt(st.c2,2) + " mol·dm⁻³";
  $("#dlV2V").textContent = st.v2 + " cm³";
  $("#dlC2Box").hidden = !mix;
  $("#dlV2Lbl").innerHTML = mix ? 'Roztok B: objem <span class="q">V</span>₂' : 'Doplníme na objem <span class="q">V</span>₂';

  var res, vTot, sp;
  if(mix){
    vTot = st.v1 + st.v2;
    res = (st.c1 * st.v1 + st.c2 * st.v2) / vTot;
    sp = {
      id:"Živý výpočet", topic:"Mísení dvou roztoků téže látky", kind:"Roztoky",
      given:[["c₁","= " + fmt(st.c1,2) + " mol·dm⁻³","roztok A"],
             ["V₁","= " + st.v1 + " cm³ <span class=\"cs-conv\">= " + fmt(st.v1/1000,3) + " dm³</span>","objem A"],
             ["c₂","= " + fmt(st.c2,2) + " mol·dm⁻³","roztok B"],
             ["V₂","= " + st.v2 + " cm³ <span class=\"cs-conv\">= " + fmt(st.v2/1000,3) + " dm³</span>","objem B"]],
      find:[["c","= ? mol·dm⁻³","koncentrace směsi"]],
      rel:["n = c · V","n = n₁ + n₂ &nbsp;&nbsp;(látky se sečtou)","V = V₁ + V₂"],
      der:["c = n / V = (n₁ + n₂) / (V₁ + V₂)","c = <b>(c₁V₁ + c₂V₂) / (V₁ + V₂)</b>"],
      hint:"Objemy se v čitateli i jmenovateli vyskytují ve stejné jednotce, takže se smí dosadit v cm³.",
      sub:["c = (" + fmt(st.c1,2) + " · " + st.v1 + " + " + fmt(st.c2,2) + " · " + st.v2 + ") / (" + st.v1 + " + " + st.v2 + ")"],
      units:"jednotky: (mol·dm⁻³ · cm³) / cm³ = <b>mol·dm⁻³</b> ✓ (cm³ se vykrátí)",
      sub2:["c = " + fmt(st.c1*st.v1 + st.c2*st.v2, 2) + " / " + vTot + " = " + fmt(res,4) + " mol·dm⁻³"],
      ans:"Smícháním vznikne roztok o&nbsp;koncentraci <b class=\"cs-hi\">c = " + fmt(res,3) + " mol·dm⁻³</b>.",
      chk:"Výsledek musí ležet mezi " + fmt(Math.min(st.c1,st.c2),2) + " a&nbsp;" + fmt(Math.max(st.c1,st.c2),2) +
          " mol·dm⁻³ — a&nbsp;leží. Blíž je vždy k&nbsp;tomu roztoku, kterého je objemově víc."
    };
  } else {
    vTot = st.v2;
    res = st.c1 * st.v1 / st.v2;
    sp = {
      id:"Živý výpočet", topic:"Ředění zásobního roztoku", kind:"Roztoky",
      given:[["c₁","= " + fmt(st.c1,2) + " mol·dm⁻³","zásobní roztok"],
             ["V₁","= " + st.v1 + " cm³ <span class=\"cs-conv\">= " + fmt(st.v1/1000,3) + " dm³</span>","odměřený podíl"],
             ["V₂","= " + st.v2 + " cm³ <span class=\"cs-conv\">= " + fmt(st.v2/1000,3) + " dm³</span>","po doplnění"]],
      find:[["c₂","= ? mol·dm⁻³","koncentrace po zředění"]],
      rel:["n₁ = n₂ &nbsp;&nbsp;(ředěním látky nepřibude)","n = c · V"],
      der:["c₁ · V₁ = c₂ · V₂","c₂ = <b>c₁ · V₁ / V₂</b>"],
      hint:"Objemy jsou v podílu, takže se vykrátí — smí být v cm³, ale oba.",
      sub:["c₂ = " + fmt(st.c1,2) + " mol·dm⁻³ · " + st.v1 + " cm³ / " + st.v2 + " cm³"],
      units:"jednotky: mol·dm⁻³ · cm³ / cm³ = <b>mol·dm⁻³</b> ✓",
      sub2:["c₂ = " + fmt(res,5) + " mol·dm⁻³ &nbsp;&nbsp;(zředěno " + fmt(st.v2/st.v1,2) + "×)"],
      ans:"Zředěný roztok má koncentraci <b class=\"cs-hi\">c₂ = " + fmt(res,4) + " mol·dm⁻³</b>.",
      chk: (st.v2 >= st.v1)
        ? ("Objem vzrostl " + fmt(st.v2/st.v1,2) + "×, takže koncentrace musí " + fmt(st.v2/st.v1,2) + "× klesnout — a klesla.")
        : "Pozor: cílový objem je menší než odměřený podíl. To fyzikálně nejde — ředěním se objem nemůže zmenšit."
    };
  }
  $("#dlSheet").innerHTML = csHTML(sp, {compact:true});
  drawDilSvg(res, mix, vTot);
}
function drawDilSvg(res, mix, vTot){
  var st = dlState;
  var W = 420, H = 240;
  var maxC = Math.max(st.c1, mix ? st.c2 : 0, res, 0.2);
  var maxV = Math.max(st.v1, st.v2, vTot, 10);
  function beaker(x, wpx, vol, conc, lab, sub){
    var bx = x, bw = wpx, by = 40, bh = 150;
    var fill = Math.max(6, Math.min(bh - 6, bh * vol / maxV));
    var alpha = Math.min(1, Math.max(0.12, conc / maxC));
    var o = "";
    o += '<path d="M' + bx + ' ' + by + ' L' + bx + ' ' + (by+bh) + ' Q' + bx + ' ' + (by+bh+8) + ' ' + (bx+8) + ' ' + (by+bh+8) +
         ' L' + (bx+bw-8) + ' ' + (by+bh+8) + ' Q' + (bx+bw) + ' ' + (by+bh+8) + ' ' + (bx+bw) + ' ' + (by+bh) +
         ' L' + (bx+bw) + ' ' + by + '" style="fill:none;stroke:var(--line-strong);stroke-width:1.8"/>';
    o += '<rect x="' + (bx+2) + '" y="' + (by+bh-fill) + '" width="' + (bw-4) + '" height="' + fill +
         '" rx="3" style="fill:var(--accent);opacity:' + alpha.toFixed(2) + '"/>';
    o += txt(bx + bw/2, by - 5, lab, {anchor:"middle", size:12.5, w:700, fill:"var(--ink)"});
    o += txt(bx + bw/2, by + bh + 22, sub, {anchor:"middle", size:11, mono:true, fill:"var(--ink-2)"});
    return o;
  }
  var s = "";
  s += beaker(20, 78, st.v1, st.c1, "A", fmt(st.c1,2) + " M");
  s += txt(20 + 39, 232, st.v1 + " cm³", {anchor:"middle", size:10.5, fill:"var(--ink-3)", mono:true});
  if(mix){
    s += txt(118, 128, "+", {anchor:"middle", size:22, w:700, fill:"var(--ink-3)"});
    s += beaker(140, 78, st.v2, st.c2, "B", fmt(st.c2,2) + " M");
    s += txt(179, 232, st.v2 + " cm³", {anchor:"middle", size:10.5, fill:"var(--ink-3)", mono:true});
  } else {
    s += txt(118, 122, "+ H₂O", {anchor:"middle", size:13, w:600, fill:"var(--endo)"});
    s += txt(118, 140, "doplnit", {anchor:"middle", size:10.5, fill:"var(--ink-3)"});
    s += beaker(140, 78, 0.0001, 0, " ", "");
    s += txt(179, 116, "voda", {anchor:"middle", size:11, fill:"var(--endo)"});
  }
  s += txt(258, 128, "→", {anchor:"middle", size:22, w:700, fill:"var(--accent)"});
  s += beaker(288, 108, vTot, res, "výsledek", fmt(res,3) + " M");
  s += txt(342, 232, vTot + " cm³", {anchor:"middle", size:10.5, fill:"var(--ink-3)", mono:true});
  s += txt(210, 15, "sytost barvy odpovídá koncentraci", {anchor:"middle", size:10.5, fill:"var(--ink-3)",
    style:"letter-spacing:.06em;text-transform:uppercase"});
  $("#dlWrap").innerHTML = svg("0 0 " + W + " " + H, s, 'aria-label="Ředění a mísení roztoků"');
}

/* ============================================================
   34 · TRENAŽÉR — řádový odhad
   ============================================================ */
var ordState = {i:0, ok:0, tot:0, streak:0, answered:false};

function drawOrd(){
  var q = ORDQ[ordState.i];
  $("#ordQ").innerHTML = "Bez počítání odhadněte řád výsledku:<span class=\"big\">" + q.q + "</span>";
  $("#ordOpts").innerHTML = q.o.map(function(o, i){
    return '<button class="drill-opt" type="button" data-i="' + i + '">' + o + '</button>';
  }).join("");
  $$("#ordOpts .drill-opt").forEach(function(b){
    b.addEventListener("click", function(){ ordAnswer(+b.dataset.i); });
  });
  $("#ordScore").textContent = ordState.ok + " / " + ordState.tot +
    (ordState.streak > 1 ? "  ·  série " + ordState.streak : "");
  ordState.answered = false;
  drawOrdSvg(false);
}
function drawOrdSvg(reveal){
  var q = ORDQ[ordState.i];
  var W = 700, H = 120, L = 40, R = 660, ax = 62;
  var e = Math.floor(Math.log(Math.abs(q.v)) / Math.LN10);
  var lo = e - 4, hi = e + 4;
  var X = function(x){ return L + (x - lo) / (hi - lo) * (R - L); };
  var s = "";
  s += line(L, ax, R, ax, {c:"var(--line-strong)", w:1.6, cap:"round"});
  for(var k = lo; k <= hi; k++){
    var x = X(k);
    s += line(x, ax - 7, x, ax + 7, {c:"var(--line-strong)", w:1.2});
    s += txt(x, ax + 24, "10" + pcSup(k), {anchor:"middle", size:11, mono:true, fill:"var(--ink-3)"});
  }
  s += txt(L, 26, "logaritmická osa řádů", {size:11, w:600, fill:"var(--ink-3)",
    style:"letter-spacing:.07em;text-transform:uppercase"});
  if(reveal){
    var xv = X(Math.log(Math.abs(q.v)) / Math.LN10);
    s += line(xv, 34, xv, ax - 10, {c:"var(--accent)", w:2, dash:"3 3"});
    s += '<circle cx="' + xv + '" cy="' + ax + '" r="7" style="fill:var(--accent);stroke:var(--surface);stroke-width:2.5"/>';
    s += txt(xv, 30, pcNum(q.v, 4), {anchor:"middle", size:13, w:700, mono:true, fill:"var(--accent)"});
    s += txt(L, 104, "nápověda: " + q.hint, {size:11.5, fill:"var(--ink-2)"});
  } else {
    s += txt(W/2, ax - 18, "kam padne výsledek?", {anchor:"middle", size:13, w:600, fill:"var(--ink-3)"});
    s += txt(L, 104, "nápověda: " + q.hint, {size:11.5, fill:"var(--ink-2)"});
  }
  $("#ordWrap").innerHTML = svg("0 0 " + W + " " + H, s, 'aria-label="Osa řádů"');
}
function ordAnswer(i){
  if(ordState.answered) return;
  ordState.answered = true;
  var q = ORDQ[ordState.i], good = (i === q.c);
  ordState.tot++;
  if(good){ ordState.ok++; ordState.streak++; } else { ordState.streak = 0; }
  $$("#ordOpts .drill-opt").forEach(function(b, bi){
    if(bi === q.c) b.classList.add("ok");
    else if(bi === i) b.classList.add("no");
  });
  $("#ordFb").className = "drill-fb " + (good ? "ok" : "no");
  $("#ordFb").innerHTML = (good ? "<b>Správně.</b> " : "<b>Správně je „" + q.o[q.c] + "“.</b> ") +
    q.x + " Přesná hodnota: <span class=\"mono\">" + pcNum(q.v, 4) + "</span>.";
  $("#ordScore").textContent = ordState.ok + " / " + ordState.tot +
    (ordState.streak > 1 ? "  ·  série " + ordState.streak : "");
  drawOrdSvg(true);
  if(ordState.streak >= 8) markDone("k8");
}
function ordNext(){
  ordState.i = (ordState.i + 1) % ORDQ.length;
  $("#ordFb").className = "drill-fb";
  $("#ordFb").innerHTML = "Nepočítejte přesně — zaokrouhlete každé číslo na jednu platnou číslici a&nbsp;odhadněte řád.";
  drawOrd();
}
function initOrd(){
  ordState.i = Math.floor(Math.random() * ORDQ.length);
  drawOrd();
}
