/* nazvo_engine.js — jádro trenažéru českého anorganického názvosloví.
   Čistá logika bez DOM: skládá katalog sloučenin z datové tabulky, generuje úlohy
   a vyhodnocuje odpovědi. Používá ho jak stránka v prohlížeči, tak kontrolní
   skript pod Node.js (křížová kontrola proti hotovým průvodcům na webu). */
var NZ = (function () {
  "use strict";

  var D = null;          /* datová tabulka z nazvo_data.py */
  var CAT = [];          /* katalog všech sloučenin */
  var BYCLS = {};        /* katalog po třídách */
  var F2N = {};          /* vzorec → názvy */
  var N2F = {};          /* název (normalizovaný) → vzorce */

  /* ---------------------------------------------------------- typografie */
  var SUBD = "₀₁₂₃₄₅₆₇₈₉";
  var ROM = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

  function roman(n) {
    var a = Math.abs(n);
    var r = a <= 8 ? ROM[a] : String(a);
    return (n < 0 ? "−" : "") + r;
  }
  /* Součet přes několik atomů — vždy se znaménkem, aby šel číst i nad VIII. */
  function tot(n) { return (n < 0 ? "−" : "+") + Math.abs(n); }
  /* Oxidační číslo se znaménkem: +I, −II */
  function sroman(n) { return (n < 0 ? "−" : "+") + (Math.abs(n) <= 8 ?
    ROM[Math.abs(n)] : String(Math.abs(n))); }

  function subs(s) {
    return String(s).replace(/[0-9]/g, function (d) { return SUBD[+d]; });
  }

  /* Vysází vzorec: číslice dolů, ale koeficient vody v hydrátu zůstane velký. */
  function pretty(f) {
    if (!f) return "";
    var parts = String(f).split("·");
    var out = subs(parts[0]);
    for (var i = 1; i < parts.length; i++) {
      var m = /^([0-9]*)(.*)$/.exec(parts[i]);
      out += "·" + m[1] + subs(m[2]);
    }
    return out;
  }

  function gcd(a, b) { while (b) { var t = a % b; a = b; b = t; } return a; }

  var SUPD2 = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  function sup(n) {
    return String(n).replace(/[0-9]/g, function (d) { return SUPD2[+d]; });
  }
  /* Kation se znaménkem: Fe³⁺, NH₄⁺ */
  function ion(f, q) { return pretty(f) + (q > 1 ? sup(q) : "") + "⁺"; }
  /* Aniont se znaménkem: SO₄²⁻, NO₃⁻ */
  function anion(f, q) { return pretty(f) + (q > 1 ? sup(q) : "") + "⁻"; }

  /* Vícejaderná skupina se při násobení musí dát do závorky. */
  function poly(f) {
    var up = f.replace(/[^A-Z]/g, "").length;
    return up > 1 || /[0-9]$/.test(f) || /[[(]/.test(f);
  }

  /* Křížové pravidlo i s krácením. */
  function combine(cf, cq, af, aq) {
    var g = gcd(cq, aq), nc = aq / g, na = cq / g, s = "";
    s += (nc > 1 && poly(cf)) ? "(" + cf + ")" + nc : cf + (nc > 1 ? nc : "");
    s += (na > 1 && poly(af)) ? "(" + af + ")" + na : af + (na > 1 ? na : "");
    return s;
  }

  /* Počty atomů ve vzorci — kvůli rozpisu součtu oxidačních čísel. */
  function atoms(f) {
    var out = {}, i = 0;
    function merge(t, k) { for (var s in t) out[s] = (out[s] || 0) + t[s] * k; }
    function parse(str) {
      var res = {}, j = 0;
      while (j < str.length) {
        var c = str[j];
        if (c === "(" || c === "[") {
          var depth = 1, k = j + 1;
          while (k < str.length && depth > 0) {
            if (str[k] === "(" || str[k] === "[") depth++;
            else if (str[k] === ")" || str[k] === "]") depth--;
            k++;
          }
          var inner = str.slice(j + 1, k - 1);
          var m = /^[0-9]+/.exec(str.slice(k)) || [""];
          var mult = m[0] ? +m[0] : 1;
          var t = parse(inner);
          for (var s in t) res[s] = (res[s] || 0) + t[s] * mult;
          j = k + m[0].length;
        } else if (/[A-Z]/.test(c)) {
          var sym = c;
          if (j + 1 < str.length && /[a-z]/.test(str[j + 1])) { sym += str[j + 1]; j++; }
          var mm = /^[0-9]+/.exec(str.slice(j + 1)) || [""];
          res[sym] = (res[sym] || 0) + (mm[0] ? +mm[0] : 1);
          j += 1 + mm[0].length;
        } else { j++; }
      }
      return res;
    }
    var seg = String(f).split("·");
    merge(parse(seg[0]), 1);
    for (i = 1; i < seg.length; i++) {
      var m2 = /^([0-9]*)(.*)$/.exec(seg[i]);
      merge(parse(m2[2]), m2[1] ? +m2[1] : 1);
    }
    return out;
  }

  /* ---------------------------------------------------------- čeština */
  function fem(adj) { return adj.slice(0, -1) + "á"; }                 /* sírový → sírová */
  function genM(adj) { return adj.slice(0, -1) + "ého"; }              /* sodný → sodného */
  function genN(noun) { return noun + "u"; }                           /* síran → síranu */
  function anOf(adj) {                                                 /* sírový → síran */
    return adj.slice(-3) === "ový" ? adj.slice(0, -3) + "an" : adj.slice(0, -1) + "an";
  }
  var NUM = ["", "", "di", "tri", "tetra", "penta", "hexa", "hepta", "okta",
             "nona", "deka", "undeka", "dodeka"];
  var NUMH = ["", "mono", "di", "tri", "tetra", "penta", "hexa", "hepta", "okta",
              "nona", "deka", "undeka", "dodeka"];

  /* Elektronegativita jen jako pořadí — rozhoduje, který prvek smí být aniont. */
  var ENR = {F: 1, O: 2, Cl: 3, N: 4, Br: 5, I: 6, S: 7, Se: 8, Te: 9,
             C: 10, P: 11, H: 12, B: 13, Si: 14};

  /* ---------------------------------------------------------- stavba katalogu */
  function el(sym) {
    for (var i = 0; i < D.el.length; i++) if (D.el[i].sym === sym) return D.el[i];
    return null;
  }

  var SEEN = {};
  function add(o) {
    var k = o.f + "|" + o.n;
    if (SEEN[k]) return;
    SEEN[k] = 1;
    o.alt = o.alt || [];
    /* pravopisné dvojtvary přídavného jména */
    if (o.adj && D.adjalt && D.adjalt[o.adj])
      D.adjalt[o.adj].forEach(function (a) {
        o.alt.push(o.n.replace(o.adj, a));
      });
    /* jiný běžný zápis téhož vzorce */
    o.altf = (D.falt && D.falt[o.n]) ? D.falt[o.n].slice() : [];
    CAT.push(o);
  }

  function cations() {
    var out = [];
    D.el.forEach(function (e) {
      for (var k in e.ox) {
        if (e.ox[k].f.indexOf("k") >= 0)
          out.push({f: e.sym, q: +k, adj: e.ox[k].adj, el: e.sym, cz: e.cz, metal: e.metal});
      }
    });
    D.xcat.forEach(function (c) {
      out.push({f: c.f, q: c.q, adj: c.adj, el: null, cz: "amonný kation", metal: 0});
    });
    return out;
  }

  function build() {
    CAT = []; BYCLS = {}; F2N = {}; N2F = {}; SEEN = {};
    var CT = cations();

    /* ---- 2. oxidy a peroxidy ---- */
    D.el.forEach(function (e) {
      for (var k in e.ox) {
        var o = e.ox[k];
        if (o.f.indexOf("b") < 0) continue;
        add({cls: "oxidy", f: combine(e.sym, +k, "O", 2), n: "oxid " + o.adj,
             noun: "oxid", adj: o.adj, el: e.sym, ox: +k, cz: e.cz,
             an: "O", anq: 2, anox: -2});
      }
    });
    D.el.forEach(function (e) {
      for (var k in e.ox) {
        var o = e.ox[k];
        if (o.f.indexOf("p") < 0) continue;
        add({cls: "oxidy", f: combine(e.sym, +k, "O2", 2), n: "peroxid " + o.adj,
             noun: "peroxid", adj: o.adj, el: e.sym, ox: +k, cz: e.cz,
             an: "O2", anq: 2, anox: -1, perox: 1});
      }
    });
    add({cls: "oxidy", f: "H2O2", n: "peroxid vodíku", noun: "peroxid", adj: null,
         el: "H", ox: 1, cz: "vodík", an: "O2", anq: 2, anox: -1, perox: 1});

    /* ---- 3. hydroxidy ---- */
    CT.forEach(function (c) {
      add({cls: "hydroxidy", f: combine(c.f, c.q, "OH", 1), n: "hydroxid " + c.adj,
           noun: "hydroxid", adj: c.adj, el: c.el, ox: c.q, cz: c.cz,
           an: "OH", anq: 1, catf: c.f});
    });

    /* ---- 4. bezkyslíkaté kyseliny a jejich soli ---- */
    D.bin.forEach(function (a) {
      add({cls: "bezkysl", f: a.f, n: a.n, noun: "kyselina", adj: null,
           el: null, ox: null, acid: 1, note: a.note});
    });
    var SIMP = {};
    D.simple.forEach(function (s) { SIMP[s.n] = s; });
    var saltAn = ["fluorid", "chlorid", "bromid", "jodid", "sulfid", "selenid",
                  "tellurid", "nitrid", "fosfid", "kyanid", "hydrid", "azid"];
    /* soli s kovovým nebo amonným kationtem */
    saltAn.forEach(function (name) {
      var s = SIMP[name];
      CT.forEach(function (c) {
        if (c.el === s.el) return;
        if (!c.metal && c.f !== "NH4") return;
        if (name === "hydrid" && !(c.metal && c.q <= 2)) return;
        if (name === "kyanid" && !((c.metal && c.q <= 2) || c.f === "NH4")) return;
        if (name === "azid" && !((c.metal && c.q <= 2) || c.f === "NH4")) return;
        if ((name === "nitrid" || name === "fosfid") && c.f === "NH4") return;
        if ((name === "selenid" || name === "tellurid" || name === "fosfid"
             || name === "nitrid") && c.q > 3) return;
        add({cls: "bezkysl", f: combine(c.f, c.q, s.f, s.q), n: name + " " + c.adj,
             noun: name, adj: c.adj, el: c.el, ox: c.q, cz: c.cz,
             an: s.f, anq: s.q, anox: s.ox, catf: c.f});
      });
    });
    /* halogenidy a sulfidy nekovů — „kation“ je tu jen formální kladné ox. číslo */
    /* Pozor: „nitrid“ i „azid“ mají prvek N, mapujeme proto podle názvu. */
    var NMNAME = {F: "fluorid", Cl: "chlorid", Br: "bromid", I: "jodid",
                  S: "sulfid", N: "nitrid", P: "fosfid", Se: "selenid",
                  Te: "tellurid"};
    var BYEL = {};
    for (var sy in NMNAME) if (SIMP[NMNAME[sy]]) BYEL[sy] = SIMP[NMNAME[sy]];
    D.nmb.forEach(function (r) {
      var e = el(r.el);
      if (!e || !e.ox[String(r.ox)]) return;
      var adj = e.ox[String(r.ox)].adj;
      r.an.forEach(function (sym) {
        var s = BYEL[sym];
        if (!s || s.el === r.el) return;
        add({cls: "bezkysl", f: combine(r.el, r.ox, s.f, s.q),
             n: s.n + " " + adj, noun: s.n, adj: adj,
             el: r.el, ox: r.ox, cz: e.cz, an: s.f, anq: s.q, anox: s.ox,
             catf: r.el});
      });
    });

    /* ---- 5. kyslíkaté kyseliny ---- */
    D.oxo.forEach(function (a) {
      if (a.acid === "-") return;
      var name = a.acid;
      if (!name) {
        var e = el(a.el);
        if (!e || !e.ox[String(a.ox)]) return;
        name = "kyselina " + fem(e.ox[String(a.ox)].adj);
      }
      var af = (D.acidf && D.acidf[a.n]) ? D.acidf[a.n]
               : "H" + (a.q > 1 ? a.q : "") + a.f;
      add({cls: "kyseliny", f: af, n: name,
           noun: "kyselina", adj: null, el: a.el, ox: a.ox, acid: 1,
           an: a.f, anq: a.q, anion: a.n, note: a.note});
    });

    /* ---- 6. soli kyslíkatých kyselin ---- */
    var BASIC = {Li: 1, Na: 1, K: 1, Rb: 1, Cs: 1, Mg: 1, Ca: 1, Sr: 1, Ba: 1, NH4: 1};
    D.oxo.forEach(function (a) {
      CT.forEach(function (c) {
        if (c.el === a.el) return;
        if (c.q > 3) return;
        if (!a.com && !BASIC[c.f]) return;
        add({cls: "soli", f: combine(c.f, c.q, a.f, a.q), n: a.n + " " + c.adj,
             noun: a.n, adj: c.adj, el: c.el, ox: c.q, cz: c.cz,
             an: a.f, anq: a.q, anel: a.el, anox: a.ox, catf: c.f});
      });
    });

    /* ---- 7. hydrogensoli a hydráty ---- */
    D.oxo.forEach(function (a) {
      if (!a.h) return;
      for (var nh = 1; nh <= a.h; nh++) {
        var rq = a.q - nh;
        if (rq < 1) continue;
        var af = "H" + (nh > 1 ? nh : "") + a.f;
        var pre = NUM[nh] + "hydrogen";
        CT.forEach(function (c) {
          if (c.el === a.el) return;
          if (!BASIC[c.f]) return;
          add({cls: "hydro", f: combine(c.f, c.q, af, rq), n: pre + a.n + " " + c.adj,
               noun: pre + a.n, adj: c.adj, el: c.el, ox: c.q, cz: c.cz,
               an: af, anq: rq, anel: a.el, anox: a.ox, catf: c.f, nh: nh,
               base: a.n});
        });
      }
    });
    D.hyd.forEach(function (h) {
      var w = h.n, sp = h.salt.split(" ");
      var g = genN(sp[0]) + " " + genM(sp[1]);
      add({cls: "hydro", f: h.f + "·" + w + "H2O", n: NUMH[w] + "hydrát " + g,
           noun: NUMH[w] + "hydrát", adj: null, el: null, ox: null,
           alt: [h.salt + " " + NUMH[w] + "hydrát"], salt: h.salt, water: w,
           triv: h.triv, hydrate: 1});
    });

    /* ---- 8. koordinační sloučeniny ---- */
    D.cx.forEach(function (c) {
      add({cls: "koord", f: c.f, n: c.n, noun: null, adj: null,
           el: c.el, ox: c.ox, note: c.note, koord: 1});
    });

    /* ---- rejstříky a kontrola jednoznačnosti ---- */
    CAT.forEach(function (o) {
      (F2N[o.f] = F2N[o.f] || []).push(o);
      var k = normName(o.n);
      (N2F[k] = N2F[k] || []).push(o);
    });
    CAT.forEach(function (o) {
      o.uniqF = F2N[o.f].length === 1;
      o.uniqN = N2F[normName(o.n)].length === 1;
      (BYCLS[o.cls] = BYCLS[o.cls] || []).push(o);
    });
    return CAT;
  }

  /* ---------------------------------------------------------- normalizace */
  var DIA = {"á": "a", "č": "c", "ď": "d", "é": "e", "ě": "e", "í": "i", "ň": "n",
             "ó": "o", "ř": "r", "š": "s", "ť": "t", "ú": "u", "ů": "u", "ý": "y",
             "ž": "z", "ä": "a", "ô": "o", "ĺ": "l", "ľ": "l", "ŕ": "r"};

  function normName(s) {
    s = String(s == null ? "" : s).toLowerCase();
    var out = "";
    for (var i = 0; i < s.length; i++) out += (DIA[s[i]] !== undefined ? DIA[s[i]] : s[i]);
    out = out.replace(/[^a-z0-9]+/g, " ").replace(/^ | $/g, "");
    return out;
  }

  var SUPD = {"⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5",
              "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9"};

  function normFormula(s) {
    s = String(s == null ? "" : s);
    var out = "";
    for (var i = 0; i < s.length; i++) {
      var c = s[i], k = SUBD.indexOf(c);
      if (k >= 0) { out += String(k); continue; }
      if (SUPD[c] !== undefined) { out += SUPD[c]; continue; }
      if (c === "." || c === "*" || c === "×" || c === "•" || c === "·") { out += "·"; continue; }
      if (c === "{" ) { out += "("; continue; }
      if (c === "}" ) { out += ")"; continue; }
      if (/\s/.test(c)) continue;
      out += c;
    }
    return out.replace(/·+/g, "·").replace(/^·|·$/g, "");
  }

  /* ---------------------------------------------------------- vysvětlení */
  function sumLine(o) {
    /* Rozpis součtu oxidačních čísel pro sloučeninu s kyslíkem. */
    var a = atoms(o.f), parts = [], sum = 0, target = null;
    var known = {};
    if (o.catf && o.el && o.ox) known[o.el] = o.ox;
    return {a: a, parts: parts, sum: sum, t: target, k: known};
  }

  /* Pozná příponu i v zápisu bez diakritiky (student napíše „sirovy“). */
  function suffixOf(adj) {
    if (!adj) return null;
    var t = [[8, "ičelý"], [4, "ičitý"], [5, "ičný"], [5, "ečný"], [7, "istý"],
             [6, "ový"], [3, "itý"], [2, "natý"], [1, "ný"]];
    var w = normName(adj).replace(/ /g, "");
    for (var i = 0; i < t.length; i++) {
      var e = normName(t[i][1]);
      if (w.length > e.length && w.slice(-e.length) === e)
        return {ox: t[i][0], s: t[i][1]};
    }
    return null;
  }

  function sufName(ox) {
    var m = {1: "-ný", 2: "-natý", 3: "-itý", 4: "-ičitý", 5: "-ičný / -ečný",
             6: "-ový", 7: "-istý", 8: "-ičelý"};
    return m[ox] || "";
  }

  /* Proč se sloučenina jmenuje, jak se jmenuje — text pro zpětnou vazbu. */
  function why(o) {
    var L = [];
    var P = pretty(o.f);
    if (o.cls === "oxidy" && o.adj) {
      var na = atoms(o.f);
      var nO = na.O || 0, nX = na[o.el] || 0;
      if (o.perox) {
        L.push("V peroxidu má kyslík oxidační číslo −I (dvojice O—O), ne −II. "
               + "Proto " + P + " a ne " + pretty(combine(o.el, o.ox, "O", 2)) + ".");
        L.push("Kation " + o.cz + " má " + roman(o.ox) + " → přípona "
               + sufName(o.ox) + " → " + o.adj + ".");
      } else {
        L.push("Kyslík má v oxidech vždy −II. " + nO + "&nbsp;×&nbsp;(−II) = "
               + roman(-2 * nO) + ", součet v neutrální molekule musí být nula, "
               + "takže na " + nX + "&nbsp;×&nbsp;" + o.el + " zbývá +"
               + roman(2 * nO) + " → jeden atom " + o.el + " má "
               + roman(o.ox) + ".");
        L.push("Oxidační číslo " + roman(o.ox) + " → přípona " + sufName(o.ox)
               + " → " + o.adj + ".");
      }
    } else if (o.cls === "hydroxidy") {
      L.push("Skupina OH⁻ má náboj 1−. Kation " + ion(o.catf, o.ox)
             + " má náboj " + o.ox + "+, proto na něj připadá " + o.ox
             + "&nbsp;×&nbsp;OH → " + P + ".");
      L.push(o.catf === "NH4"
             ? "Kation NH₄⁺ dostává v názvu přídavné jméno amonný."
             : "Oxidační číslo " + roman(o.ox) + " → přípona " + sufName(o.ox)
               + " → hydroxid " + o.adj + ".");
    } else if (o.cls === "bezkysl" && o.acid) {
      L.push("Bezkyslíkatá kyselina se pojmenuje podle aniontu a slova vodíková: "
             + o.n + ". Její sůl je " + (o.an || "") + ".");
    } else if (o.cls === "bezkysl") {
      L.push("Podstatné jméno „" + o.noun + "“ patří aniontu " + anion(o.an, o.anq)
             + (o.anox !== undefined ? ", kde má prvek oxidační číslo "
                + roman(o.anox) : "") + ".");
      L.push(o.catf === "NH4"
             ? "Kation NH₄⁺ dostává přídavné jméno amonný; křížové pravidlo dá " + P + "."
             : "Oxidační číslo " + roman(o.ox) + " → přípona " + sufName(o.ox)
               + " → " + o.adj + ". Křížové pravidlo dá " + P + ".");
    } else if (o.cls === "kyseliny") {
      L.push("Centrální atom " + o.el + " má v " + P + " oxidační číslo "
             + roman(o.ox) + " → přípona " + sufName(o.ox)
             + " v ženském rodě, protože kyselina je „ta“.");
      L.push("Odtržením všech " + o.anq + " vodíků vznikne aniont "
             + anion(o.an, o.anq) + " — " + o.anion + ".");
    } else if (o.cls === "soli") {
      L.push("Podstatné jméno „" + o.noun + "“ patří aniontu " + anion(o.an, o.anq)
             + (o.anox ? " (" + o.anel + " v něm má " + roman(o.anox) + ")" : "") + ".");
      L.push(o.catf === "NH4"
             ? "Kation NH₄⁺ dostává přídavné jméno amonný; křížové pravidlo dá " + P + "."
             : "Přídavné jméno patří kationtu: " + roman(o.ox) + " → přípona "
               + sufName(o.ox) + " → " + o.adj + ". Křížové pravidlo dá " + P + ".");
    } else if (o.cls === "hydro" && o.hydrate) {
      L.push("Tečka ve vzorci odděluje krystalovou vodu: " + P + " je "
             + o.water + " molekul vody na jednu formulovou jednotku "
             + pretty(o.f.split("·")[0]) + ".");
      L.push("Počet molekul vody se řekne řeckou číslovkou: " + NUMH[o.water]
             + "hydrát" + (o.triv ? " (triviálně " + o.triv + ")" : "") + ".");
    } else if (o.cls === "hydro") {
      L.push("V hydrogensoli zůstal " + (o.nh === 1 ? "jeden vodík"
             : o.nh + " vodíky") + " nenahrazený, náboj aniontu proto klesl na "
             + o.anq + "− a v názvu přibyla předpona "
             + (o.nh === 1 ? "hydrogen" : NUM[o.nh] + "hydrogen") + ": "
             + anion(o.an, o.anq) + ".");
      L.push(o.catf === "NH4"
             ? "Kation NH₄⁺ dostává přídavné jméno amonný; vzorec vyjde " + P + "."
             : "Přídavné jméno patří kationtu: " + roman(o.ox) + " → "
               + sufName(o.ox) + " → " + o.adj + ". Vzorec vyjde " + P + ".");
    } else if (o.cls === "koord") {
      L.push("Komplex: v hranaté závorce je centrální atom " + o.el
             + " s oxidačním číslem " + roman(o.ox) + " a jeho ligandy.");
      L.push("Počet ligandů se řekne řeckou číslovkou, aniontový komplex "
             + "dostane koncovku -an." + (o.note ? " Triviálně " + o.note + "." : ""));
    }
    return L;
  }

  /* ---------------------------------------------------------- generátor */
  var CLASSES = [
    {id: "ox", t: "Oxidační čísla", d: "určit oxidační číslo prvku ve sloučenině"},
    {id: "oxidy", t: "Oxidy a peroxidy", d: "Na₂O, CO₂, Mn₂O₇, H₂O₂"},
    {id: "hydroxidy", t: "Hydroxidy", d: "NaOH, Ca(OH)₂, Fe(OH)₃"},
    {id: "bezkysl", t: "Bezkyslíkaté kyseliny a soli", d: "HCl, NaCl, ZnS, PCl₅"},
    {id: "kyseliny", t: "Kyslíkaté kyseliny", d: "HNO₃, H₂SO₄, HClO₄"},
    {id: "soli", t: "Soli kyslíkatých kyselin", d: "KMnO₄, CuSO₄, Ca(NO₃)₂"},
    {id: "hydro", t: "Hydrogensoli a hydráty", d: "NaHCO₃, CuSO₄·5H₂O"},
    {id: "koord", t: "Koordinační sloučeniny", d: "K₄[Fe(CN)₆], [Cu(NH₃)₄]SO₄"}
  ];

  function rnd(n) { return Math.floor(Math.random() * n); }
  function pick(a) { return a[rnd(a.length)]; }

  /* Zásoba úloh na oxidační čísla — sloučeniny, u kterých ox. číslo bezpečně známe. */
  function oxPool() {
    var p = [];
    function put(o, el, ox, kind) {
      if (!oxSafe(o, el, ox)) return;
      p.push({o: o, el: el, ox: ox, kind: kind});
    }
    CAT.forEach(function (o) {
      if (!o.uniqF) return;
      if (o.cls === "oxidy" && o.adj && !o.perox && o.el && o.el !== "H")
        put(o, o.el, o.ox, "oxid");
      if (o.cls === "soli" && o.anox && o.anel) {
        put(o, o.anel, o.anox, "sul");
        if (o.el && o.ox) put(o, o.el, o.ox, "sul");
      }
      if (o.cls === "kyseliny" && o.ox && o.el) put(o, o.el, o.ox, "kyselina");
      if (o.cls === "oxidy" && o.perox)
        p.push({o: o, el: "O", ox: -1, kind: "peroxid"});
      if (o.cls === "bezkysl" && !o.acid && o.noun === "hydrid")
        p.push({o: o, el: "H", ox: -1, kind: "hydrid"});
      if (o.cls === "bezkysl" && !o.acid && o.adj && o.el && o.anox)
        put(o, o.el, o.ox, "binarni");
      if (o.cls === "hydroxidy" && o.el && o.ox) put(o, o.el, o.ox, "hydroxid");
    });
    return p;
  }

  /* Do úloh na oxidační čísla pustíme jen sloučeniny, u kterých součet
     oxidačních čísel skutečně vyjde nula. Odfiltruje to i případy, kdy je
     týž prvek v kationtu i v aniontu (NH₄NO₃ má dusík −III a zároveň +V). */
  function oxSafe(o, el, ox) {
    if (!el) return false;
    var B = oxBalance(o, el);
    return B.full && B.n > 0 && -B.sum === B.n * ox;
  }

  var POOL = null;

  function poolFor(ids) {
    var out = [];
    ids.forEach(function (id) {
      if (id === "ox") return;
      (BYCLS[id] || []).forEach(function (o) { if (o.uniqF && o.uniqN) out.push(o); });
    });
    return out;
  }

  /* Vygeneruje úlohu. ids = zapnuté kategorie, dir = "f2n" | "n2f" | "mix". */
  function gen(ids, dir, avoid) {
    ids = (ids && ids.length) ? ids : CLASSES.map(function (c) { return c.id; });
    /* Nejdřív se losuje kategorie, teprve pak úloha — jinak by velké třídy
       (soli, halogenidy) vytlačily malé a student by hydráty skoro nepotkal. */
    var cid = pick(ids);
    if (cid === "ox") {
      if (!POOL) POOL = oxPool();
      for (var t = 0; t < 40; t++) {
        var q = pick(POOL);
        if (avoid && q.o.f === avoid) continue;
        return oxTask(q);
      }
      return oxTask(pick(POOL));
    }
    var p = poolFor([cid]);
    if (!p.length) p = poolFor(ids.filter(function (i) { return i !== "ox"; }));
    if (!p.length) { if (!POOL) POOL = oxPool(); return oxTask(pick(POOL)); }
    var o = null;
    for (var i = 0; i < 40; i++) { o = pick(p); if (!avoid || o.f !== avoid) break; }
    var d = dir === "mix" ? (Math.random() < 0.5 ? "f2n" : "n2f") : dir;
    if (o.cls === "koord" && d === "n2f" && Math.random() < 0.6) d = "f2n";
    return d === "f2n" ? f2nTask(o) : n2fTask(o);
  }

  function f2nTask(o) {
    return {kind: "f2n", cls: o.cls, o: o, f: o.f, pf: pretty(o.f),
            q: "Napište český název sloučeniny " + pretty(o.f) + ".",
            hint: "Odpovídejte celým názvem, například „oxid uhličitý“.",
            ans: o.n, alts: o.alt};
  }

  function n2fTask(o) {
    return {kind: "n2f", cls: o.cls, o: o, f: o.f, pf: pretty(o.f),
            q: "Napište vzorec sloučeniny <b>" + o.n + "</b>.",
            hint: "Indexy pište jako obyčejné číslice, například H2SO4.",
            ans: o.f, alts: []};
  }

  var ELCZ = null;
  function czOf(sym) {
    if (!ELCZ) { ELCZ = {}; D.el.forEach(function (e) { ELCZ[e.sym] = e.cz; }); }
    return ELCZ[sym] || sym;
  }

  function oxTask(q) {
    var o = q.o, nm = czOf(q.el);
    return {kind: "ox", cls: "ox", o: o, f: o.f, pf: pretty(o.f), el: q.el,
            ox: q.ox, oxkind: q.kind,
            q: "Určete oxidační číslo prvku <b>" + q.el + "</b> (" + nm
               + ") ve sloučenině " + pretty(o.f) + ".",
            hint: "Odpovědět můžete římsky (VI, −II) i arabsky (6, −2).",
            ans: roman(q.ox), alts: []};
  }

  /* ---------------------------------------------------------- vyhodnocení */
  function parseOx(s) {
    s = String(s == null ? "" : s).trim().toLowerCase()
        .replace(/−/g, "-").replace(/–/g, "-").replace(/\s+/g, "");
    var sign = 1;
    if (s[0] === "-") { sign = -1; s = s.slice(1); }
    else if (s[0] === "+") { s = s.slice(1); }
    if (/^[0-9]+$/.test(s)) return sign * parseInt(s, 10);
    var R = {i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6, vii: 7, viii: 8, "0": 0};
    if (R[s] !== undefined) return sign * R[s];
    return null;
  }

  /* Vrátí {ok, msg, why:[…]} — msg je konkrétní popis chyby. */
  function grade(task, raw) {
    var W = why(task.o);
    if (task.kind === "ox") {
      var v = parseOx(raw);
      if (v === null) return {ok: false, msg: "Odpověď se nepodařilo přečíst. "
             + "Napište oxidační číslo římsky (například VI) nebo arabsky (6).",
             why: oxWhy(task)};
      if (v === task.ox) return {ok: true, msg: "Správně, " + roman(task.ox) + ".",
             why: oxWhy(task)};
      var m = "Správně je " + roman(task.ox) + ", ne " + roman(v) + ".";
      if (v === -task.ox) m += " Pozor na znaménko — u " + task.el
        + " v této sloučenině vychází " + (task.ox > 0 ? "kladné" : "záporné") + ".";
      return {ok: false, msg: m, why: oxWhy(task)};
    }
    if (task.kind === "n2f") {
      var g = normFormula(raw), c = normFormula(task.ans);
      if (!g) return {ok: false, msg: "Nezadal jste žádný vzorec.", why: W};
      if (g === c) return {ok: true, msg: "Správně, " + pretty(task.ans) + ".", why: W};
      var af2 = (task.o.altf || []).map(normFormula);
      if (af2.indexOf(g) >= 0)
        return {ok: true, msg: "Správně — " + pretty(raw.trim())
                + " je jiný běžný zápis téže látky; ve škole se nejčastěji píše "
                + pretty(task.ans) + ".", why: W};
      if (g.toLowerCase() === c.toLowerCase())
        return {ok: false, msg: "Vzorec je skoro správně, ale značky prvků se píší "
                + "první písmeno velké, druhé malé: " + pretty(task.ans)
                + ". Například Co je kobalt, kdežto CO je oxid uhelnatý.", why: W};
      var gs = g.replace(/[()[\]]/g, ""), cs = c.replace(/[()[\]]/g, "");
      if (gs === cs)
        return {ok: false, msg: "Chybí závorka. Vícejadernou skupinu, která se ve "
                + "vzorci opakuje, je nutné uzavřít do závorky: " + pretty(task.ans)
                + ".", why: W};
      var ga = atoms(g), ca = atoms(c), same = true, k;
      for (k in ca) if ((ga[k] || 0) !== ca[k]) same = false;
      for (k in ga) if ((ca[k] || 0) !== (ga[k] || 0)) same = false;
      if (same)
        return {ok: false, msg: "Atomy sedí, ale zápis ne. Správně se píše "
                + pretty(task.ans) + ".", why: W};
      var msg = "Správně je " + pretty(task.ans) + ".";
      var o = task.o;
      if (o.ox && o.adj) {
        var s = suffixOf(o.adj);
        if (s) {
          /* NH₄⁺ není prvek — nemá oxidační číslo, nese náboj. */
          var kdo = o.el || o.cz || "kation";
          var nese = o.el ? ("nese oxidační číslo " + roman(o.ox))
                          : ("nese náboj " + (o.q || 1) + "+");
          msg += " Přípona " + s.s.replace(/^/, "-") + " znamená oxidační číslo "
               + roman(s.ox) + ", takže " + kdo + " " + nese
               + " a křížové pravidlo dá " + pretty(task.ans) + ".";
        }
      }
      return {ok: false, msg: msg, why: W};
    }
    /* f2n */
    var gN = normName(raw), cN = normName(task.ans);
    if (!gN) return {ok: false, msg: "Nezadal jste žádný název.", why: W};
    var okSet = [cN].concat((task.alts || []).map(normName));
    if (okSet.indexOf(gN) >= 0)
      return {ok: true, msg: "Správně, " + task.ans + ".", why: W};
    var gw = gN.split(" "), cw = cN.split(" ");
    var rw = String(raw).trim().replace(/\s+/g, " ").split(" ");
    var o2 = task.o;
    var m2 = "Správně je „" + task.ans + "“.";
    if (gw[0] !== cw[0] && o2.noun) {
      m2 += " Podstatné jméno „" + rw[0] + "“ nesedí — název začíná slovem „"
            + task.ans.split(" ")[0] + "“, protože o podstatném jméně rozhoduje "
            + "aniont, ne kation.";
    }
    var last = gw[gw.length - 1], sg = suffixOf(last), sc = suffixOf(o2.adj || "");
    if (sg && sc && sg.ox !== sc.ox) {
      m2 += " Přípona -" + sg.s + " patří oxidačnímu číslu " + roman(sg.ox)
            + ", jenže " + (o2.cz || o2.el) + " tady má " + roman(sc.ox)
            + " → " + o2.adj + ".";
    } else if (sg && sc && sg.ox === sc.ox && last !== normName(o2.adj)) {
      m2 += " Přípona -" + sg.s + " je správná (oxidační číslo " + roman(sc.ox)
            + "), ale kmen ne. Český kmen se nedá odvodit z názvu prvku, "
            + "u tohohle prvku zní " + o2.adj + ".";
    } else if (!sg && o2.adj) {
      m2 += " V odpovědi chybí přípona, která nese oxidační číslo — "
            + (o2.cz || o2.el) + " má " + roman(o2.ox) + ", takže " + o2.adj + ".";
    }
    return {ok: false, msg: m2, why: W};
  }

  /* Oxidační čísla, která u dané sloučeniny známe bez počítání. */
  function knownOx(o) {
    var k = {};
    k.O = o.perox ? -1 : -2;
    if (o.acid || o.cls === "kyseliny") k.H = 1;
    if (o.noun === "hydrid") k.H = -1;
    if (o.el && o.ox) k[o.el] = o.ox;
    if (o.anel && o.anox) k[o.anel] = o.anox;
    if (o.an && /^[A-Z][a-z]?$/.test(o.an) && o.anox !== undefined && o.anox !== null)
      k[o.an] = o.anox;
    if (o.an === "OH") k.H = 1;
    if (o.catf === "NH4") { k.N = -3; k.H = 1; }
    if (o.hydrate) { k.H = 1; }
    return k;
  }

  /* Rozpis součtu oxidačních čísel; zároveň kontrola, že tabulka sedí s vzorcem. */
  function oxBalance(o, target) {
    var a = atoms(o.f), k = knownOx(o), parts = [], sum = 0, full = true, sym;
    for (sym in a) {
      if (sym === target) continue;
      if (k[sym] === undefined) { full = false; continue; }
      parts.push(a[sym] + "&nbsp;×&nbsp;" + sym + "(" + sroman(k[sym]) + ") = "
                 + tot(a[sym] * k[sym]));
      sum += a[sym] * k[sym];
    }
    return {full: full, parts: parts, sum: sum, n: a[target] || 0, atoms: a, known: k};
  }

  function oxWhy(task) {
    var o = task.o, L = [];
    if (task.oxkind === "peroxid") {
      L.push("V peroxidech je dvojice O—O, každý kyslík má −I. To je jediná běžná "
             + "výjimka z pravidla „kyslík má −II“.");
      L.push("Celá sloučenina se jmenuje " + o.n + ".");
      return L;
    }
    if (task.oxkind === "hydrid") {
      L.push("V hydridech kovů je vodík záporný: −I. Kov je elektropozitivnější, "
             + "takže vazebný elektronový pár připadne vodíku.");
      L.push("Celá sloučenina se jmenuje " + o.n + ".");
      return L;
    }
    var B = oxBalance(o, task.el);
    var nT = B.n || 1;
    if (B.full && -B.sum === nT * task.ox) {
      L.push("Součet oxidačních čísel v neutrální sloučenině je nula. "
             + (B.parts.length ? B.parts.join(", ") + ". " : "")
             + "Na " + nT + "&nbsp;×&nbsp;" + task.el + " tedy zbývá "
             + tot(nT * task.ox) + ", jeden atom má " + sroman(task.ox) + ".");
    } else {
      L.push("Prvek " + task.el + " má v této sloučenině oxidační číslo "
             + roman(task.ox) + "; poznáte to z přípony v názvu i ze součtu, "
             + "který musí v neutrální látce vyjít nula.");
    }
    if (o.anel && task.el === o.anel && o.noun)
      L.push("Odtud i podstatné jméno názvu: aniont s " + task.el
             + " v oxidačním čísle " + roman(task.ox) + " se jmenuje " + o.noun
             + " — celá sloučenina je " + o.n + ".");
    else if (o.adj && task.el === o.el)
      L.push("Odtud i název: " + roman(o.ox) + " → přípona " + sufName(o.ox)
             + " → " + o.adj + " (celá sloučenina je " + o.n + ").");
    else
      L.push("Celá sloučenina se jmenuje " + o.n + ".");
    return L;
  }

  /* ---------------------------------------------------------- rozhraní */
  function init(data) { D = data; POOL = null; ELCZ = null; build(); return CAT; }

  return {
    init: init, build: build, catalog: function () { return CAT; },
    byClass: function () { return BYCLS; }, classes: CLASSES,
    gen: gen, grade: grade, pretty: pretty, subs: subs, roman: roman,
    parseOx: parseOx, sup: sup, ion: ion, anion: anion,
    normName: normName, normFormula: normFormula, atoms: atoms,
    combine: combine, fem: fem, genM: genM, genN: genN, anOf: anOf,
    suffixOf: suffixOf, sufName: sufName, why: why, oxWhy: oxWhy,
    oxBalance: oxBalance, knownOx: knownOx, tot: tot, sroman: sroman,
    f2nTask: f2nTask, n2fTask: n2fTask, oxTask: oxTask, oxPool: oxPool,
    index: function () { return {f: F2N, n: N2F}; }
  };
})();
if (typeof module !== "undefined" && module.exports) module.exports = NZ;
