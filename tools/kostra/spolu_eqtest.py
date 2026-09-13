# -*- coding: utf-8 -*-
"""spolu_eqtest.py — kontrola tvrdého požadavku: výrazy se porovnávají numericky.

Vezme skutečné jádro z spolu_js.py, dosadí do dvojic výrazů náhodné sady hodnot
a ověří, že c·V a V·c (a další algebraicky rovnocenné tvary) projdou jako totéž,
zatímco skutečně různé výrazy neprojdou.

    python spolu_eqtest.py        (potřebuje node)
"""
import io, os, json, subprocess, sys, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

import spolu_data as SD
from spolu_js import CORE

PAIRS = [
    ("c*V", "V*c", True),                       # komutativita součinu
    ("(m*M)*V", "m*(M*V)", True),               # asociativita
    ("m/(M*V)", "(m/M)/V", True),               # jiné uzávorkování
    ("m/M*V", "m*V/M", True),                   # pořadí činitele a zlomku
    ("(c_2*V_2)/c_1", "V_2*c_2/c_1", True),
    ("sqrt(Ka*c)", "sqrt(c*Ka)", True),
    ("I*t/(z*F)*M", "M*I*t/(F*z)", True),
    ("m_0/2^(t/Tp)", "m_0*2^(-t/Tp)", True),
    ("n/V", "V/n", False),                      # skutečně různé
    ("n/V", "n*V", False),
    ("ΔH-T*ΔS", "T*ΔS-ΔH", False),
]


def main():
    cases = [{"a": SD.parse(a), "b": SD.parse(b), "want": w, "sa": a, "sb": b}
             for a, b, w in PAIRS]
    data = {"atoms": SD.ATOMS, "syms": {}, "consts": SD.CONSTS, "tasks": []}
    js = ("var DATA=%s;\nvar CASES=%s;\n"
          "var document={querySelector:function(){return null;},"
          "querySelectorAll:function(){return [];}};\n"
          "var localStorage={getItem:function(){return null;},setItem:function(){},"
          "removeItem:function(){}};\n"
          % (json.dumps(data, ensure_ascii=False), json.dumps(cases, ensure_ascii=False)))
    js += CORE + """
var bad=0;
CASES.forEach(function(c){
  var got=equivalent(c.a,c.b), ok=(got===c.want);
  if(!ok) bad++;
  console.log((ok?"OK  ":"!!  ")+c.sa+"   vs   "+c.sb+"   -> "+got);
});
console.log("chybnych porovnani: "+bad);
process.exit(bad?1:0);
"""
    f = os.path.join(tempfile.gettempdir(), "_spolu_eqtest.js")
    io.open(f, "w", encoding="utf-8", newline="\n").write(js)
    r = subprocess.run(["node", f], capture_output=True, text=True, encoding="utf-8")
    print(r.stdout or r.stderr)
    sys.exit(r.returncode)


if __name__ == "__main__":
    main()
