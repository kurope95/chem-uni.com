# -*- coding: utf-8 -*-
"""Vyrobí kostru (kostra-A/B/C.html) z hotového termochemie.html.
Kostra = CSS + generický JS motor (navigace, pokrok, kvízy, SVG pomocníci),
bez jakéhokoli tematického obsahu. Spouštět jednou."""
import io, os, sys

SRC = r"C:\Claude Code\Claude Code\Doučovanie\termochemie.html"
OUT = os.path.dirname(os.path.abspath(__file__))

with io.open(SRC, encoding="utf-8") as f:
    L = f.read().split("\n")

def ln(i):  # 1-based
    return L[i-1]

def rng(a, b):  # 1-based inclusive
    return "\n".join(L[a-1:b])

def must(cond, msg):
    if not cond:
        print("ASSERT FAILED:", msg); sys.exit(1)

# --- kontrola značek ---
must(ln(592) == "</head>", "line 592 </head>")
must(ln(593) == "<body>", "line 593 <body>")
must(ln(626).strip() == '<main id="obsah">', "line 626 main")
must(ln(2212).strip() == "</main>", "line 2212 </main>")
must(ln(2216) == "<script>", "line 2216 script")
must(ln(2280).startswith("/* ====") and "2 · DATA" in ln(2281), "DATA header")
must(ln(2326).startswith("/* ====") and "3 · NAVIGACE" in ln(2327), "NAV header")
must(ln(2539).startswith("/* ====") and "7 · WIDGET" in ln(2540), "WIDGET header")
must(ln(3118).startswith("function drawGloss"), "drawGloss")
must(ln(3123) == "}", "drawGloss end")

def rep1(s, old, new):
    must(s.count(old) == 1, "expected exactly one occurrence of: " + old[:60])
    return s.replace(old, new)

# ---------- KOSTRA A: hlavička + CSS + lišta + topbar + <main> ----------
A = rng(1, 626) + "\n\n"
A = rep1(A, 'content="Interaktivni studijni pruvodce termochemii a uvodem do termodynamiky pro maturitu a prijimacky na VS."',
            'content="{{DESCRIPTION}}"')
A = rep1(A, "<title>Termochemie a úvod do termodynamiky</title>", "<title>{{TITLE}}</title>")
A = rep1(A, "   TERMOCHEMIE — studijní průvodce", "   {{TITLE}} — studijní průvodce")
A = rep1(A, '<span class="name">Termochemie a úvod do termodynamiky</span>', '<span class="name">{{TITLE}}</span>')
A = rep1(A, '<div class="name">Termochemie<span>', '<div class="name">{{SHORT}}<span>')

# ---------- KOSTRA B: konec <main>, toast, začátek skriptu, motor ----------
B1 = rng(2212, 2279)            # </main> … prázdný řádek před DATA
B2 = rng(2326, 2537)            # sekce 3–6 (navigace, pokrok, worked, kvíz, SVG)
must(ln(2538).strip() == "", "line 2538 blank")
B = B1 + "\n" + B2 + "\n"
B = B.replace('"termo."', '"{{PREFIX}}."')
must(B.count('"{{PREFIX}}."') == 3, "store prefix ×3")
B += """
/* ============================================================
   7 · SLOVNÍČEK — vykreslení (pole GLOSS definuje tematická část)
   ============================================================ */
""" + rng(3118, 3123) + """

/* ============================================================
   8 · JÁDRO OVLÁDÁNÍ — vynulování pokroku, scrollspy
   ============================================================ */
function bindCore(){
  $("#resetBtn").addEventListener("click",function(){
    if(!confirm("Opravdu vynulovat pokrok ve všech kapitolách? Nastavení motivu zůstane.")) return;
    var th=store.get("theme",null);
    store.del(); if(th) store.set("theme",th);
    done={}; renderProgress(); toast("Pokrok vynulován.");
  });
  var st;
  window.addEventListener("scroll",function(){ clearTimeout(st); st=setTimeout(scrollspy,60); },{passive:true});
  window.addEventListener("resize",function(){ clearTimeout(st); st=setTimeout(scrollspy,120); },{passive:true});
}

/* ============================================================
   TEMATICKÁ ČÁST — data, modely, GLOSS, redrawAll, bind, initAll, BANK.*
   (vše níže je specifické pro dané téma)
   ============================================================ */
"""

# ---------- KOSTRA C: spuštění + konec dokumentu ----------
C = """
/* ============================================================
   SPUŠTĚNÍ
   ============================================================ */
buildNav();
$$(".quiz").forEach(renderQuiz);
renderProgress();
bindCore();
bind();
initAll();
drawGloss();
redrawAll();
scrollspy();

})();
</script>

</body>
</html>
"""

for name, s in (("kostra-A.html", A), ("kostra-B.html", B), ("kostra-C.html", C)):
    with io.open(os.path.join(OUT, name), "w", encoding="utf-8", newline="\n") as f:
        f.write(s)
    print(name, len(s.encode("utf-8")), "B", s.count("\n"), "lines")
print("OK")
