# -*- coding: utf-8 -*-
"""spolu_data.py — data a symbolický aparát pro trenažér „Počítáme spolu“.

Obsahuje:
  * ATOMS   — atomární jednotky (převodní faktor do SI + rozměr)
  * SYM     — tabulka veličin (zobrazení, název, kanonická jednotka, nabídka jednotek)
  * parse() — parser výrazů do stromu {k:"op",o:"/",a:…,b:…}
  * TASKS   — 20 úloh
  * derive()— referenční odvození a kontrola všech čísel (spouští se při buildu)

Kanonické jednotky jsou zvolené tak, aby soustava byla koherentní pro chemii:
  g, mol, dm³, K, s, kPa, J, A, C, V  →  kPa·dm³ = J, g·(J·g⁻¹·K⁻¹)·K = J,
  mol·(g·mol⁻¹) = g, mol·(J·K⁻¹·mol⁻¹)·K = J.  R = 8,314 platí v obou čteních.
"""
import math, re

# --------------------------------------------------------------- jednotky
# b = základ zobrazení, e = mocnina, f = faktor do SI, d = rozměr, off = posun
def A(b, e, f, d, off=0.0):
    return {"b": b, "e": e, "f": f, "d": d, "off": off}

ATOMS = {
    "one":  A("",    0, 1.0,       {}),
    "pct":  A("%",   1, 0.01,      {}),
    "g":    A("g",   1, 1e-3,      {"kg": 1}),
    "mg":   A("mg",  1, 1e-6,      {"kg": 1}),
    "ug":   A("µg",  1, 1e-9,      {"kg": 1}),
    "kg":   A("kg",  1, 1.0,       {"kg": 1}),
    "mol":  A("mol", 1, 1.0,       {"mol": 1}),
    "mmol": A("mmol", 1, 1e-3,     {"mol": 1}),
    "mol2": A("mol", 2, 1.0,       {"mol": 2}),
    "dm3":  A("dm",  3, 1e-3,      {"m": 3}),
    "cm3":  A("cm",  3, 1e-6,      {"m": 3}),
    "m3":   A("m",   3, 1.0,       {"m": 3}),
    "dm6":  A("dm",  6, 1e-6,      {"m": 6}),
    "L":    A("l",   1, 1e-3,      {"m": 3}),
    "mL":   A("ml",  1, 1e-6,      {"m": 3}),
    "J":    A("J",   1, 1.0,       {"kg": 1, "m": 2, "s": -2}),
    "kJ":   A("kJ",  1, 1e3,       {"kg": 1, "m": 2, "s": -2}),
    "K":    A("K",   1, 1.0,       {"K": 1}),
    "degC": A("°C",  1, 1.0,       {"K": 1}, 273.15),
    "s":    A("s",   1, 1.0,       {"s": 1}),
    "min":  A("min", 1, 60.0,      {"s": 1}),
    "hod":  A("h",   1, 3600.0,    {"s": 1}),
    "den":  A("d",   1, 86400.0,   {"s": 1}),
    "rok":  A("r",   1, 3.15576e7, {"s": 1}),
    "Pa":   A("Pa",  1, 1.0,       {"kg": 1, "m": -1, "s": -2}),
    "kPa":  A("kPa", 1, 1e3,       {"kg": 1, "m": -1, "s": -2}),
    "MPa":  A("MPa", 1, 1e6,       {"kg": 1, "m": -1, "s": -2}),
    "V":    A("V",   1, 1.0,       {"kg": 1, "m": 2, "s": -3, "A": -1}),
    "A":    A("A",   1, 1.0,       {"A": 1}),
    "C":    A("C",   1, 1.0,       {"s": 1, "A": 1}),
    "Bq":   A("Bq",  1, 1.0,       {"s": -1}),
    "GBq":  A("GBq", 1, 1e9,       {"s": -1}),
}

SUP = {"-": "⁻", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵",
       "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "0": "⁰"}


def sup(n):
    return "".join(SUP[ch] for ch in str(n))


def parse_unit(u):
    """'J/K*mol' → (['J'], ['K','mol'])"""
    u = (u or "one").strip()
    if "/" in u:
        a, b = u.split("/", 1)
    else:
        a, b = u, ""
    num = [t for t in a.split("*") if t]
    den = [t for t in b.split("*") if t]
    for t in num + den:
        if t not in ATOMS:
            raise KeyError("neznámá jednotka: %s (v %s)" % (t, u))
    return num, den


def unit_info(u):
    """faktor do SI, rozměr a zobrazení jednotky"""
    num, den = parse_unit(u)
    f = 1.0
    d = {}
    off = 0.0
    if len(num) == 1 and not den:
        off = ATOMS[num[0]]["off"]
    parts = []
    for t in num:
        a = ATOMS[t]
        f *= a["f"]
        for k, v in a["d"].items():
            d[k] = d.get(k, 0) + v
        if a["e"]:
            parts.append(a["b"] + (sup(a["e"]) if a["e"] != 1 else ""))
    for t in den:
        a = ATOMS[t]
        f /= a["f"]
        for k, v in a["d"].items():
            d[k] = d.get(k, 0) - v
        parts.append(a["b"] + sup(-a["e"]))
    d = dict((k, v) for k, v in d.items() if v)
    return {"f": f, "d": d, "t": "·".join(parts) if parts else "1", "off": off}


def to_canon(v, unit, canon):
    """převede hodnotu z 'unit' do kanonické jednotky veličiny"""
    a, b = unit_info(unit), unit_info(canon)
    if a["d"] != b["d"]:
        raise ValueError("nesouhlasný rozměr %s vs %s" % (unit, canon))
    return ((v * a["f"] + a["off"]) - b["off"]) / b["f"]


# --------------------------------------------------------------- veličiny
def S(disp, name, canon, units, kind=""):
    return {"disp": disp, "name": name, "canon": canon, "units": units, "kind": kind}


I = lambda s: '<i>%s</i>' % s          # kurzívní symbol veličiny
ID = lambda s, sub: '<i>%s</i><sub>%s</sub>' % (s, sub)

MASS = ["g", "kg", "mg", "ug"]
VOL = ["dm3", "cm3", "m3", "L", "mL"]
CONC = ["mol/dm3", "mmol/dm3", "mol/m3"]
AMT = ["mol", "mmol"]
TIME = ["s", "min", "hod", "den", "rok"]
FRAC = ["one", "pct"]

SYM = {
    "m|":            S(I("m"), "Hmotnost", "g", MASS),
    "M|":            S(I("M"), "Molární hmotnost", "g/mol", ["g/mol", "kg/mol"]),
    "n|":            S(I("n"), "Látkové množství", "mol", AMT),
    "V|":            S(I("V"), "Objem", "dm3", VOL),
    "c|":            S(I("c"), "Látková koncentrace", "mol/dm3", CONC),
    "w|":            S(I("w"), "Hmotnostní zlomek", "one", FRAC),
    "ρ|":            S(I("ρ"), "Hustota", "g/dm3", ["g/dm3", "mg/dm3", "kg/m3"]),
    "Q|":            S(I("Q"), "Teplo", "J", ["J", "kJ"]),
    "T|":            S(I("T"), "Termodynamická teplota", "K", ["K", "degC"]),
    "ΔT|":           S("Δ" + I("T"), "Změna teploty", "K", ["K"]),
    "p|":            S(I("p"), "Tlak", "kPa", ["kPa", "Pa", "MPa"]),
    "t|":            S(I("t"), "Čas", "s", TIME),
    "z|":            S(I("z"), "Počet vyměněných elektronů", "one", ["one"]),
    "I|":            S(I("I"), "Elektrický proud", "A", ["A"]),
    "N|":            S(I("N"), "Počet částic", "one", ["one"]),
    "E|":            S(I("E"), "Elektrodový potenciál", "V", ["V"]),
    "pH|":           S("pH", "Vodíkový exponent", "one", ["one"]),
    "λ|":            S(I("λ"), "Přeměnová konstanta", "one/s", ["one/s"]),
    "A|":            S(I("A"), "Aktivita zářiče", "Bq", ["Bq", "GBq"]),
    "s|":            S(I("s"), "Rozpustnost", "mol/dm3", CONC),
    "γ|":            S(I("γ"), "Hmotnostní koncentrace", "g/dm3", ["g/dm3", "mg/dm3"]),
    "η|":            S(I("η"), "Výtěžek reakce", "one", FRAC),
    "ΔH|":           S("Δ" + I("H"), "Reakční enthalpie", "kJ/mol", ["kJ/mol", "J/mol"]),
    "ΔS|":           S("Δ" + I("S"), "Reakční entropie", "kJ/K*mol", ["J/K*mol", "kJ/K*mol"]),
    "ΔG|":           S("Δ" + I("G"), "Gibbsova energie", "kJ/mol", ["kJ/mol", "J/mol"]),
    "Vm|":           S(ID("V", "m"), "Molární objem", "dm3/mol", ["dm3/mol"]),
    "E0|":           S(I("E") + "°", "Standardní elektrodový potenciál", "V", ["V"]),
    "Ka|":           S(ID("K", "a"), "Konstanta acidity", "one", ["one"]),
    "Ksp|":          S(ID("K", "s"), "Součin rozpustnosti", "mol2/dm6", ["mol2/dm6"]),
    "Qel|":          S(I("Q"), "Elektrický náboj", "C", ["C"]),
    "cH|":           S(ID("c", "H⁺"), "Koncentrace oxoniových kationtů", "mol/dm3", CONC),
    # podtržené varianty se zvláštním významem
    "c|H₂O":         S(ID("c", "H₂O"), "Měrná tepelná kapacita vody", "J/g*K", ["J/g*K"]),
    "Tp|":           S(ID("T", "½"), "Poločas přeměny", "s", TIME),
    "Tz|":           S(ID("T", "z"), "Teplota zvratu", "K", ["K", "degC"]),
    "ΔHp|":          S("Δ" + ID("H", "prod"), "Součet slučovacích enthalpií produktů", "kJ/mol",
                       ["kJ/mol", "J/mol"]),
    "ΔHv|":          S("Δ" + ID("H", "výc"), "Součet slučovacích enthalpií výchozích látek",
                       "kJ/mol", ["kJ/mol", "J/mol"]),
    "ΔHf|":          S("Δ" + ID("H", "f"), "Slučovací enthalpie", "kJ/mol", ["kJ/mol", "J/mol"]),
    "ΔHr|":          S("Δ" + ID("H", "r"), "Reakční enthalpie", "kJ/mol", ["kJ/mol", "J/mol"]),
}

CONSTS = {
    "R":   {"disp": I("R"), "v": 8.314, "unit": "J/K*mol",
            "name": "Molární plynová konstanta", "note": "8,314 J·K⁻¹·mol⁻¹ = 8,314 kPa·dm³·K⁻¹·mol⁻¹"},
    "N_A": {"disp": ID("N", "A"), "v": 6.022e23, "unit": "one/mol",
            "name": "Avogadrova konstanta", "note": "6,022·10²³ mol⁻¹"},
    "F":   {"disp": I("F"), "v": 96485.0, "unit": "C/mol",
            "name": "Faradayova konstanta", "note": "96 485 C·mol⁻¹"},
}
ATOMS.setdefault("one", ATOMS["one"])


def plain_sym(key):
    """textová podoba symbolu pro poznámky (bez HTML)"""
    s, sub = key.split("|", 1)
    return re.sub("<[^>]+>", "", sym_info(s, sub)["disp"])


def sym_info(s, sub):
    """vrátí záznam veličiny; podtržítko upřesňuje jen zobrazení, ne význam"""
    k = s + "|" + (sub or "")
    if k in SYM:
        return SYM[k]
    base = SYM.get(s + "|")
    if base is None:
        raise KeyError("neznámá veličina: " + k)
    if not sub:
        return base
    out = dict(base)
    d = base["disp"]
    out["disp"] = (d[:-len("</i>")] + "</i><sub>%s</sub>" % sub) if d.endswith("</i>") \
        else d + "<sub>%s</sub>" % sub
    return out


# --------------------------------------------------------------- parser
TOK = re.compile(r"""
    (?P<num>\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)
  | (?P<id>[^\W\d_][A-Za-z0-9]*)
  | (?P<sub>_\{[^}]*\}|_[A-Za-z0-9°½]+)
  | (?P<op>[-+*/^()·])
  | (?P<ws>\s+)
""", re.X | re.U)

FNS = ("sqrt", "cbrt", "log", "ln", "abs", "exp")


def tokenize(s):
    out, i = [], 0
    while i < len(s):
        m = TOK.match(s, i)
        if not m:
            raise SyntaxError("neznámý znak %r v %r" % (s[i], s))
        i = m.end()
        if m.lastgroup == "ws":
            continue
        out.append((m.lastgroup, m.group()))
    return out


class P(object):
    def __init__(self, s):
        self.t = tokenize(s)
        self.i = 0

    def peek(self):
        return self.t[self.i] if self.i < len(self.t) else (None, None)

    def eat(self, val=None):
        k, v = self.peek()
        if val is not None and v != val:
            raise SyntaxError("čekal jsem %r, dostal %r" % (val, v))
        self.i += 1
        return v

    def expr(self):
        a = self.term()
        while self.peek()[1] in ("+", "-"):
            o = self.eat()
            a = {"k": "op", "o": o, "a": a, "b": self.term()}
        return a

    def term(self):
        a = self.unary()
        while self.peek()[1] in ("*", "/", "·"):
            o = self.eat()
            a = {"k": "op", "o": "*" if o == "·" else o, "a": a, "b": self.unary()}
        return a

    def unary(self):
        if self.peek()[1] == "-":
            self.eat()
            return {"k": "neg", "a": self.unary()}
        return self.power()

    def power(self):
        a = self.atom()
        if self.peek()[1] == "^":
            self.eat()
            return {"k": "op", "o": "^", "a": a, "b": self.unary()}
        return a

    def atom(self):
        k, v = self.peek()
        if v == "(":
            self.eat()
            e = self.expr()
            self.eat(")")
            return e
        if k == "num":
            self.eat()
            return {"k": "num", "v": float(v)}
        if k == "id":
            self.eat()
            if v in FNS:
                self.eat("(")
                e = self.expr()
                self.eat(")")
                return {"k": "fn", "f": v, "a": e}
            sub = ""
            if self.peek()[0] == "sub":
                raw = self.eat()
                sub = raw[2:-1] if raw.startswith("_{") else raw[1:]
            if v == "N" and sub == "A":
                return {"k": "const", "s": "N_A"}
            if v in CONSTS and not sub:
                return {"k": "const", "s": v}
            sym_info(v, sub)          # ověří, že veličinu známe
            n = {"k": "sym", "s": v}
            if sub:
                n["sub"] = sub
            return n
        raise SyntaxError("nečekaný token %r" % (v,))


def parse(s):
    p = P(s)
    e = p.expr()
    if p.i != len(p.t):
        raise SyntaxError("zbytek za výrazem v %r" % s)
    return e


def parse_formula(s):
    """'c = n/V' → (klíč levé strany, strom pravé strany, text)"""
    lhs, rhs = s.split("=", 1)
    l = parse(lhs.strip())
    if l["k"] != "sym":
        raise SyntaxError("vlevo musí být jedna veličina: " + s)
    return l, parse(rhs.strip()), s


def skey(n):
    return n["s"] + "|" + n.get("sub", "")


def syms_in(n, out=None):
    if out is None:
        out = []
    if n["k"] == "sym":
        k = skey(n)
        if k not in out:
            out.append(k)
    elif n["k"] == "op":
        syms_in(n["a"], out)
        syms_in(n["b"], out)
    elif n["k"] in ("fn", "neg"):
        syms_in(n["a"], out)
    return out


def subst(n, key, rhs):
    if n["k"] == "sym":
        return dict(rhs) if skey(n) == key else n
    if n["k"] == "op":
        return {"k": "op", "o": n["o"], "a": subst(n["a"], key, rhs), "b": subst(n["b"], key, rhs)}
    if n["k"] in ("fn", "neg"):
        m = dict(n)
        m["a"] = subst(n["a"], key, rhs)
        return m
    return n


def ev(n, vals):
    k = n["k"]
    if k == "num":
        return n["v"]
    if k == "const":
        return CONSTS[n["s"]]["v"]
    if k == "sym":
        key = skey(n)
        if key not in vals:
            raise KeyError(key)
        return vals[key]
    if k == "neg":
        return -ev(n["a"], vals)
    if k == "fn":
        x = ev(n["a"], vals)
        return {"sqrt": math.sqrt, "cbrt": lambda v: v ** (1.0 / 3),
                "log": math.log10, "ln": math.log, "abs": abs, "exp": math.exp}[n["f"]](x)
    a, b = ev(n["a"], vals), ev(n["b"], vals)
    o = n["o"]
    if o == "+":
        return a + b
    if o == "-":
        return a - b
    if o == "*":
        return a * b
    if o == "/":
        return a / b
    return a ** b
