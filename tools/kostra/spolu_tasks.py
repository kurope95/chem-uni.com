# -*- coding: utf-8 -*-
"""spolu_tasks.py — dvacet úloh trenažéru + referenční odvození a kontrola čísel."""
from spolu_data import (SYM, CONSTS, sym_info, plain_sym, parse, parse_formula, skey,
                        syms_in, subst, ev, to_canon, unit_info)


def G(s, val, unit, sub="", note=""):
    return {"s": s, "sub": sub, "val": val, "unit": unit, "note": note}


def T(**kw):
    kw.setdefault("opt", [])
    kw.setdefault("extras", [])
    kw.setdefault("hints", [])
    return kw


CH = lambda s: '<span class="chem">%s</span>' % s

TASKS = [
    # ---------------------------------------------------------------- 1
    T(id="n-mgo", level=1, topic="Látkové množství",
      title="Látkové množství z hmotnosti",
      task="V kelímku je navážka 12,0 g oxidu hořečnatého " + CH("MgO") + ". Kolik molů "
           "oxidu hořečnatého to je? Molární hmotnost " + CH("MgO") + " je 40,30 g·mol⁻¹.",
      given=[G("m", 12.0, "g"), G("M", 40.30, "g/mol", note="z periodické tabulky")],
      find={"s": "n", "sub": "", "unit": "mol"},
      extras=["V|", "c|", "N|"],
      formulas=["n = m/M"],
      distractors=[("n = m*M", "Kdybyste hmotnost molární hmotností násobil, vyjdou vám gramy "
                               "na druhou dělené molem. Látkové množství říká, kolikrát se "
                               "hmotnost jednoho molu vejde do navážky — tedy dělíme."),
                   ("c = n/V", "Správný vztah, ale pro koncentraci. V téhle úloze žádný "
                               "objem roztoku nemáte."),
                   ("n = N/N_A", "Také správný vztah, jenže vychází z počtu částic. "
                                 "Ten v zadání není."),
                   ("m = ρ*V", "Hustota ani objem v zadání nejsou.")],
      answer={"val": 0.298, "tol": 0.003, "sig": 3},
      hints=["Hledáte látkové množství a v zadání máte hmotnost a molární hmotnost. "
             "Existuje jediný vztah, který tyhle tři veličiny spojuje."],
      outro="Tenhle jediný krok je základ skoro každého chemického výpočtu. Kdykoli v zadání "
            "vidíte gramy a v otázce moly (nebo naopak), sáhnete po "
            "<span class=\"nowrap\"><i>n</i> = <i>m</i>/<i>M</i></span>."),

    # ---------------------------------------------------------------- 2
    T(id="c-nacl", level=1, topic="Roztoky",
      title="Koncentrace roztoku chloridu sodného",
      task="V odměrné baňce je rozpuštěno 5,85 g chloridu sodného a roztok je doplněn "
           "vodou na 250 cm³. Jaká je látková koncentrace tohoto roztoku? "
           "M(" + CH("NaCl") + ") = 58,44 g·mol⁻¹.",
      given=[G("m", 5.85, "g"), G("V", 250, "cm3", note="objem roztoku, ne vody!"),
             G("M", 58.44, "g/mol", note="z periodické tabulky")],
      find={"s": "c", "sub": "", "unit": "mol/dm3"},
      extras=["n|", "w|", "ρ|"],
      formulas=["c = n/V", "n = m/M"],
      distractors=[("c = n*V", "Koncentrace je látkové množství <b>na jednotku objemu</b>. "
                               "Kdyby se násobilo, vycházelo by, že zředěním roztoku "
                               "koncentrace roste."),
                   ("c = m/V", "Tohle je hmotnostní koncentrace <i>γ</i> v g·dm⁻³. Vyjde vám "
                               "číslo, které vypadá věrohodně, ale má jinou jednotku."),
                   ("w = m/m_{rozt}", "Hmotnostní zlomek. Hmotnost celého roztoku ale neznáte."),
                   ("n = m*M", "Násobení místo dělení — jednotky by nesouhlasily.")],
      answer={"val": 0.400, "tol": 0.005, "sig": 3},
      hints=["Koncentrace potřebuje látkové množství a objem. Objem máte, látkové množství "
             "musíte teprve z hmotnosti vyrobit."],
      outro="Klasická past téhle úlohy nejsou vzorce, ale jednotky: 250 cm³ je 0,250 dm³, "
            "ne 250 dm³. Kdo si objem nepřevede, vyjde mu koncentrace tisíckrát menší."),

    # ---------------------------------------------------------------- 3
    T(id="w-glukoza", level=1, topic="Roztoky",
      title="Hmotnostní zlomek glukózy",
      task="V 175 g vody rozpustíme 25,0 g glukózy. Jaký je hmotnostní zlomek glukózy "
           "ve vzniklém roztoku? Odpověď vyjádřete v procentech.",
      given=[G("m", 25.0, "g", sub="gl", note="rozpuštěná látka"),
             G("m", 175.0, "g", sub="H₂O", note="rozpouštědlo")],
      find={"s": "w", "sub": "gl", "unit": "pct"},
      extras=["V|", "n|", "c|"],
      formulas=["w_{gl} = m_{gl}/m_{rozt}", "m_{rozt} = m_{gl} + m_{H₂O}"],
      distractors=[("w_{gl} = m_{gl}/m_{H₂O}", "Ve jmenovateli musí být hmotnost <b>celého "
                    "roztoku</b>, tedy i s rozpuštěnou látkou. Tenhle vztah dává poměr "
                    "látka : rozpouštědlo, ne zlomek."),
                   ("m_{rozt} = m_{H₂O} - m_{gl}", "Rozpuštěním se hmotnost roztoku "
                    "zvětšuje, ne zmenšuje."),
                   ("c = n/V", "Objem roztoku v zadání není."),
                   ("n = m_{gl}/M", "Molární hmotnost glukózy v zadání není a k hmotnostnímu "
                    "zlomku ji nepotřebujete.")],
      answer={"val": 12.5, "tol": 0.2, "sig": 3},
      hints=["Hmotnostní zlomek je podíl hmotnosti látky a hmotnosti roztoku. Hmotnost "
             "roztoku v zadání přímo není — musíte ji nejdřív sestavit."],
      outro="Hmotnost roztoku = rozpuštěná látka + rozpouštědlo. Zní to samozřejmě, "
            "ale právě na tomhle se u písemek ztrácí nejvíc bodů."),

    # ---------------------------------------------------------------- 4
    T(id="q-voda", level=1, topic="Termochemie",
      title="Teplo potřebné k ohřátí vody",
      task="Kolik tepla musíme dodat, abychom 250 g vody ohřáli z 20,0 °C na 80,0 °C? "
           "Měrná tepelná kapacita vody je 4,18 J·g⁻¹·K⁻¹. Odpověď uveďte v kJ.",
      given=[G("m", 250.0, "g", sub="H₂O"),
             G("c", 4.18, "J/g*K", sub="H₂O", note="měrná tepelná kapacita"),
             G("T", 20.0, "degC", sub="1", note="počáteční teplota"),
             G("T", 80.0, "degC", sub="2", note="konečná teplota")],
      find={"s": "Q", "sub": "", "unit": "kJ"},
      extras=["ΔT|", "n|", "M|"],
      formulas=["Q = m_{H₂O}*c_{H₂O}*ΔT", "ΔT = T_2 - T_1"],
      distractors=[("ΔT = T_1 - T_2", "Změna se počítá vždy konec minus začátek. Takhle "
                    "vám vyjde záporné teplo, tedy že se voda ochlazuje."),
                   ("Q = m_{H₂O}*c_{H₂O}*T_2", "Do vzorce patří <b>rozdíl</b> teplot, "
                    "ne konečná teplota. Jinak by na tom, odkud ohříváte, nezáleželo."),
                   ("Q = c_{H₂O}*ΔT", "Bez hmotnosti by na množství vody nezáleželo — "
                    "hrnec i kapka by potřebovaly stejné teplo."),
                   ("n = m_{H₂O}/M", "Látkové množství vody tu k ničemu není, měrná "
                    "tepelná kapacita je vztažená na gram.")],
      answer={"val": 62.7, "tol": 0.5, "sig": 3},
      hints=["Kalorimetrická rovnice potřebuje hmotnost, měrnou tepelnou kapacitu "
             "a změnu teploty. Změna teploty v zadání přímo není."],
      outro="Rozdíl teplot vyjde stejně ve stupních Celsia i v kelvinech — dílek je "
            "stejně velký. Absolutní teplotu ale nikdy v Celsiích nedosazujte."),

    # ---------------------------------------------------------------- 5
    T(id="v-kyslik", level=1, topic="Plyny",
      title="Objem plynu za normálních podmínek",
      task="Jaký objem zaujme 8,00 g kyslíku " + CH("O₂") + " za normálních podmínek "
           "(0 °C, 101,325 kPa)? Molární objem za normálních podmínek je "
           "22,414 dm³·mol⁻¹, M(" + CH("O₂") + ") = 32,00 g·mol⁻¹.",
      given=[G("m", 8.00, "g"), G("M", 32.00, "g/mol"),
             G("Vm", 22.414, "dm3/mol", note="molární objem za normálních podmínek")],
      find={"s": "V", "sub": "", "unit": "dm3"},
      extras=["n|", "p|", "T|"],
      formulas=["V = n*Vm", "n = m/M"],
      distractors=[("V = n/Vm", "Jednotky by daly mol²·dm⁻³. Molární objem říká, kolik "
                    "dm³ připadá na jeden mol — počtem molů se tedy násobí."),
                   ("V = m*Vm", "Molární objem je vztažený na mol, ne na gram."),
                   ("V = (n*R*T)/p", "Správný vztah, jen zbytečný: molární objem "
                    "za daných podmínek už máte v zadání."),
                   ("c = n/V", "Koncentraci tu nikdo nechce.")],
      answer={"val": 5.60, "tol": 0.05, "sig": 3},
      hints=["Osm gramů kyslíku je čtvrtina molu. Nejdřív z hmotnosti udělejte moly, "
             "pak z molů objem."],
      outro="Číslo 22,4 dm³·mol⁻¹ platí jen za normálních podmínek (0 °C). Při 25 °C "
            "je molární objem 24,79 dm³·mol⁻¹ — na to se u přijímaček rádo chytá."),

    # ---------------------------------------------------------------- 6
    T(id="rozpad-jod", level=1, topic="Jaderná chemie",
      title="Kolik radionuklidu zbude",
      task="Vzorek obsahuje 40,0 mg jodu " + CH("<sup>131</sup><sub>53</sub>I") + ", "
           "jehož poločas přeměny je 8,02 dne. Kolik miligramů jodu ve vzorku zbude "
           "po 24,06 dnech?",
      given=[G("m", 40.0, "mg", sub="0", note="počáteční hmotnost"),
             G("Tp", 8.02, "den", note="poločas přeměny"),
             G("t", 24.06, "den", note="doba přeměny")],
      find={"s": "m", "sub": "", "unit": "mg"},
      extras=["λ|", "N|", "A|"],
      formulas=["m = m_0/2^(t/Tp)"],
      distractors=[("m = m_0*2^(t/Tp)", "Takhle by radioaktivního materiálu přibývalo. "
                    "Po každém poločase zbude polovina, takže se dělí."),
                   ("m = m_0/(2*t/Tp)", "Pokles není přímo úměrný počtu poločasů, "
                    "ale exponenciální. Po deseti poločasech nezbude desetina, "
                    "ale tisícina."),
                   ("λ = ln(2)/Tp", "Správný vztah pro přeměnovou konstantu, tady ho "
                    "ale nepotřebujete."),
                   ("m = m_0 - t/Tp", "Odečítání času od hmotnosti nedává smysl "
                    "ani rozměrově.")],
      answer={"val": 5.00, "tol": 0.05, "sig": 3},
      hints=["Spočítejte si, kolik poločasů se do 24,06 dne vejde. Po každém z nich "
             "zbude polovina."],
      outro="24,06 dne jsou přesně tři poločasy, takže zbude polovina z poloviny "
            "z poloviny, tedy osmina. Kdo tohle vidí, spočítá úlohu z hlavy."),

    # ---------------------------------------------------------------- 7
    T(id="rideni-hcl", level=2, topic="Roztoky",
      title="Ředění zásobního roztoku",
      task="Máte zásobní roztok kyseliny chlorovodíkové o koncentraci 2,00 mol·dm⁻³. "
           "Kolik cm³ tohoto roztoku odměříte, chcete-li připravit 250 cm³ roztoku "
           "o koncentraci 0,150 mol·dm⁻³?",
      given=[G("c", 2.00, "mol/dm3", sub="1", note="zásobní roztok"),
             G("c", 0.150, "mol/dm3", sub="2", note="připravovaný roztok"),
             G("V", 250, "cm3", sub="2", note="objem připravovaného roztoku")],
      find={"s": "V", "sub": "1", "unit": "cm3"},
      extras=["n|", "m|", "w|"],
      formulas=["V_1 = n_1/c_1", "n_1 = n_2", "n_2 = c_2*V_2"],
      distractors=[("n_2 = c_2/V_2", "Látkové množství je koncentrace <b>krát</b> objem. "
                    "Jinak by v litru roztoku bylo méně látky než v mililitru."),
                   ("V_1 = c_1/n_1", "Převrácený zlomek. Vyjde vám dm⁻⁶ na mol²."),
                   ("n_1 = 2*n_2", "Ředěním se látkové množství nemění, jen se rozprostře "
                    "do většího objemu."),
                   ("V_1 = (c_1*V_2)/c_2", "Poměr koncentrací je obrácený. Ze silnějšího "
                    "roztoku se odebírá <b>méně</b>, ne více.")],
      answer={"val": 18.8, "tol": 0.3, "sig": 3},
      hints=["Při ředění se přidává jen rozpouštědlo. Látkové množství kyseliny "
             "v odměřeném podílu a ve výsledném roztoku je tedy stejné."],
      outro="Celé ředění stojí na jediné myšlence: <i>n</i>₁ = <i>n</i>₂. Odtud plyne "
            "i školní vzorec <i>c</i>₁·<i>V</i>₁ = <i>c</i>₂·<i>V</i>₂ — ale je lepší "
            "rozumět mu, než si ho pamatovat."),

    # ---------------------------------------------------------------- 8
    T(id="pv-co2", level=2, topic="Plyny",
      title="Objem plynu ze stavové rovnice",
      task="Jaký objem zaujme 5,00 g oxidu uhličitého " + CH("CO₂") + " při teplotě "
           "25 °C a tlaku 101,3 kPa? M(" + CH("CO₂") + ") = 44,01 g·mol⁻¹, "
           "R = 8,314 J·K⁻¹·mol⁻¹.",
      given=[G("m", 5.00, "g"), G("M", 44.01, "g/mol"),
             G("T", 25.0, "degC"), G("p", 101.3, "kPa")],
      find={"s": "V", "sub": "", "unit": "dm3"},
      extras=["n|", "Vm|", "c|"],
      formulas=["V = (n*R*T)/p", "n = m/M"],
      distractors=[("V = (p*R*T)/n", "Tlak a látkové množství jsou prohozené. Při vyšším "
                    "tlaku by plyn zabíral větší objem, což je naopak."),
                   ("V = n*R*T*p", "Objem a tlak jsou nepřímo úměrné — v součinu "
                    "je nepřímá úměra ztracená."),
                   ("V = n*Vm", "Molární objem v zadání není a za daných podmínek "
                    "ho neznáte."),
                   ("n = m*M", "Násobení místo dělení.")],
      answer={"val": 2.78, "tol": 0.04, "sig": 3},
      hints=["Stavová rovnice se počítá s látkovým množstvím, ne s hmotností. "
             "Nejdřív tedy gramy na moly."],
      outro="Pozor na teplotu: do stavové rovnice patří kelviny, tedy 298,15 K. "
            "S dosazenými 25 se spletete dvanáctkrát. A pokud dosadíte tlak v kPa "
            "a objem počítáte v dm³, R má hodnotu 8,314 — jednotky si sednou samy."),

    # ---------------------------------------------------------------- 9
    T(id="stech-agcl", level=2, topic="Stechiometrie",
      title="Kolik sraženiny vznikne",
      task="K roztoku obsahujícímu 8,50 g dusičnanu stříbrného přidáme nadbytek "
           "chloridu sodného. Kolik gramů chloridu stříbrného se vysráží? "
           "Reakce: " + CH("AgNO₃ + NaCl → AgCl + NaNO₃") + ". "
           "M(" + CH("AgNO₃") + ") = 169,87 g·mol⁻¹, M(" + CH("AgCl") + ") = 143,32 g·mol⁻¹.",
      given=[G("m", 8.50, "g", sub="AgNO₃"),
             G("M", 169.87, "g/mol", sub="AgNO₃"),
             G("M", 143.32, "g/mol", sub="AgCl")],
      find={"s": "m", "sub": "AgCl", "unit": "g"},
      extras=["n|", "V|", "c|"],
      formulas=["m_{AgCl} = n_{AgCl}*M_{AgCl}", "n_{AgCl} = n_{AgNO₃}",
                "n_{AgNO₃} = m_{AgNO₃}/M_{AgNO₃}"],
      distractors=[("n_{AgCl} = 2*n_{AgNO₃}", "Stechiometrické koeficienty jsou 1 : 1. "
                    "Dvojka by patřila do rovnice typu " + CH("2 AgNO₃ + …") + "."),
                   ("m_{AgCl} = m_{AgNO₃}", "Hmotnosti se v reakci nepřenášejí, "
                    "přenášejí se látková množství. Molární hmotnosti obou solí "
                    "jsou navíc různé."),
                   ("m_{AgCl} = n_{AgCl}/M_{AgCl}", "Dělení místo násobení — "
                    "vyšlo by mol² na gram."),
                   ("n_{AgNO₃} = m_{AgNO₃}*M_{AgNO₃}", "Násobení místo dělení.")],
      answer={"val": 7.17, "tol": 0.06, "sig": 3},
      hints=["Stechiometrie se vždycky odehrává v molech. Cesta je: gramy → moly → "
             "moly druhé látky → gramy."],
      outro="Nadbytek chloridu sodného v zadání znamená jediné: o tom, kolik sraženiny "
            "vznikne, rozhoduje výhradně dusičnan stříbrný."),

    # ---------------------------------------------------------------- 10
    T(id="vytezek-cao", level=2, topic="Výtěžek",
      title="Skutečný výtěžek žíhání vápence",
      task="Žíháním 20,0 g uhličitanu vápenatého (" + CH("CaCO₃ → CaO + CO₂") + ") jsme "
           "získali oxid vápenatý s výtěžkem 85,0 %. Kolik gramů " + CH("CaO") + " jsme "
           "skutečně získali? M(" + CH("CaCO₃") + ") = 100,09 g·mol⁻¹, "
           "M(" + CH("CaO") + ") = 56,08 g·mol⁻¹.",
      given=[G("m", 20.0, "g", sub="CaCO₃"),
             G("M", 100.09, "g/mol", sub="CaCO₃"),
             G("M", 56.08, "g/mol", sub="CaO"),
             G("η", 85.0, "pct", note="výtěžek reakce")],
      find={"s": "m", "sub": "skut", "unit": "g"},
      extras=["n|", "V|", "w|"],
      formulas=["m_{skut} = η*m_{teor}", "m_{teor} = n_{CaO}*M_{CaO}",
                "n_{CaO} = n_{CaCO₃}", "n_{CaCO₃} = m_{CaCO₃}/M_{CaCO₃}"],
      distractors=[("m_{skut} = m_{teor}/η", "Dělením výtěžkem menším než jedna by "
                    "skutečný zisk vyšel <b>větší</b> než teoretický. To nejde."),
                   ("n_{CaO} = 2*n_{CaCO₃}", "Z jednoho uhličitanu vzniká jeden oxid, "
                    "poměr je 1 : 1."),
                   ("m_{teor} = n_{CaO}/M_{CaO}", "Dělení místo násobení."),
                   ("m_{skut} = η*m_{CaCO₃}", "Výtěžek se vztahuje k teoretickému množství "
                    "<b>produktu</b>, ne k navážce výchozí látky.")],
      answer={"val": 9.53, "tol": 0.08, "sig": 3},
      hints=["Nejdřív spočítejte, kolik oxidu by vzniklo, kdyby reakce proběhla beze "
             "zbytku. Teprve to číslo se násobí výtěžkem."],
      outro="Výtěžek je bezrozměrný poměr. Osmdesát pět procent znamená v dosazení "
            "0,850 — kdo dosadí 85, splete se stokrát."),

    # ---------------------------------------------------------------- 11
    T(id="ph-hcl", level=2, topic="pH",
      title="pH roztoku silné kyseliny",
      task="V 500 cm³ roztoku je rozpuštěno 0,365 g chlorovodíku. Jaké je pH tohoto "
           "roztoku? " + CH("HCl") + " je silná kyselina, disociuje tedy úplně. "
           "M(" + CH("HCl") + ") = 36,46 g·mol⁻¹.",
      given=[G("m", 0.365, "g"), G("M", 36.46, "g/mol"), G("V", 500, "cm3")],
      find={"s": "pH", "sub": "", "unit": "one"},
      extras=["c|", "n|", "Ka|"],
      formulas=["pH = -log(c)", "c = n/V", "n = m/M"],
      distractors=[("pH = log(c)", "Bez minusu by kyselý roztok měl záporné pH. "
                    "Logaritmus čísla menšího než jedna je záporný, minus ho otočí."),
                   ("pH = 14 - log(c)", "Tohle je nakřivo přepsaný vztah pro pOH. "
                    "Ze zadané koncentrace kyseliny se počítá pH přímo."),
                   ("c = n*V", "Násobení místo dělení."),
                   ("pH = -ln(c)", "V definici pH je dekadický logaritmus, "
                    "ne přirozený. Lišily by se 2,303krát.")],
      answer={"val": 1.70, "tol": 0.03, "sig": 3},
      hints=["pH se počítá z koncentrace oxoniových kationtů. U silné jednosytné "
             "kyseliny je stejná jako koncentrace kyseliny."],
      outro="Desetina molu chlorovodíku v půl litru dává koncentraci 0,0200 mol·dm⁻³. "
            "pH kolem 1,7 je tedy zcela v pořádku — silné kyseliny mají pH pod 2."),

    # ---------------------------------------------------------------- 12
    T(id="hess-ch4", level=2, topic="Termochemie",
      title="Reakční enthalpie ze slučovacích",
      task="Vypočítejte reakční enthalpii spalování methanu "
           + CH("CH₄ + 2 O₂ → CO₂ + 2 H₂O(l)") + ". Slučovací enthalpie: "
           "Δ<i>H</i>°<sub>f</sub>(" + CH("CH₄") + ") = −74,6 kJ·mol⁻¹, "
           "Δ<i>H</i>°<sub>f</sub>(" + CH("CO₂") + ") = −393,5 kJ·mol⁻¹, "
           "Δ<i>H</i>°<sub>f</sub>(" + CH("H₂O") + ", l) = −285,8 kJ·mol⁻¹. "
           "Slučovací enthalpie kyslíku je z definice nulová.",
      given=[G("ΔHf", -74.6, "kJ/mol", sub="CH₄"),
             G("ΔHf", -393.5, "kJ/mol", sub="CO₂"),
             G("ΔHf", -285.8, "kJ/mol", sub="H₂O")],
      find={"s": "ΔHr", "sub": "", "unit": "kJ/mol"},
      extras=["ΔHp|", "ΔHv|", "ΔS|"],
      formulas=["ΔHr = ΔHp - ΔHv", "ΔHp = ΔHf_{CO₂} + 2*ΔHf_{H₂O}",
                "ΔHv = ΔHf_{CH₄}"],
      distractors=[("ΔHr = ΔHv - ΔHp", "Obráceně. Hessův zákon zní produkty minus "
                    "výchozí látky; takhle byste spalování methanu udělal endotermické."),
                   ("ΔHp = ΔHf_{CO₂} + ΔHf_{H₂O}", "Vody vznikají dvě. Stechiometrickým "
                    "koeficientem se slučovací enthalpie násobí."),
                   ("ΔHv = ΔHf_{CH₄} + ΔHf_{CO₂}", "Oxid uhličitý je produkt, "
                    "ne výchozí látka."),
                   ("ΔHr = ΔHp + ΔHv", "Součet místo rozdílu.")],
      answer={"val": -890.5, "tol": 1.0, "sig": 4},
      hints=["Hessův zákon: součet slučovacích enthalpií produktů minus součet "
             "slučovacích enthalpií výchozích látek, každá násobená svým koeficientem."],
      outro="Minus 890 kJ·mol⁻¹ je tabulková spalná enthalpie methanu — číslo, které "
            "stojí za zapamatování, protože se objevuje v úlohách o zemním plynu."),

    # ---------------------------------------------------------------- 13
    T(id="gibbs-dg", level=2, topic="Termodynamika",
      title="Gibbsova energie rozkladu vápence",
      task="Rozklad vápence " + CH("CaCO₃ → CaO + CO₂") + " má Δ<i>H</i>° = "
           "+178,3 kJ·mol⁻¹ a Δ<i>S</i>° = +160,6 J·K⁻¹·mol⁻¹. Jaká je Gibbsova energie "
           "této reakce při 25 °C? Poběží reakce za těchto podmínek samovolně?",
      given=[G("ΔH", 178.3, "kJ/mol"), G("ΔS", 160.6, "J/K*mol"), G("T", 25.0, "degC")],
      find={"s": "ΔG", "sub": "", "unit": "kJ/mol"},
      extras=["Tz|", "Q|", "n|"],
      formulas=["ΔG = ΔH - T*ΔS"],
      distractors=[("ΔG = ΔH + T*ΔS", "Znaménko u entropického členu je záporné. "
                    "Kdyby bylo plus, rostoucí neuspořádanost by reakci brzdila."),
                   ("ΔG = T*ΔS - ΔH", "Celý výraz s obráceným znaménkem."),
                   ("ΔG = ΔH - ΔS/T", "Entropie se násobí teplotou, nedělí se jí. "
                    "Jinak by rozměr nevyšel na kJ·mol⁻¹."),
                   ("Tz = ΔH/ΔS", "Teplota zvratu — správný vztah, jenže na jinou otázku.")],
      answer={"val": 130.4, "tol": 1.0, "sig": 4},
      hints=["Dosazujete do jediného vztahu. Dejte ale pozor, v jakých jednotkách "
             "je entropie oproti enthalpii."],
      outro="Past téhle úlohy je v jednotkách: enthalpie v kilojoulech, entropie "
            "v joulech. Kladné Δ<i>G</i> znamená, že za pokojové teploty vápenec "
            "sám od sebe nerozloží nic."),

    # ---------------------------------------------------------------- 14
    T(id="stech-limit", level=3, topic="Stechiometrie",
      title="Reaktant v nedostatku",
      task="K 5,00 g zinku přilijeme 30,0 cm³ kyseliny chlorovodíkové o koncentraci "
           "2,00 mol·dm⁻³. Reakce: " + CH("Zn + 2 HCl → ZnCl₂ + H₂") + ". Jaký objem "
           "vodíku se uvolní, měříme-li při 25 °C a 101,325 kPa "
           "(<i>V</i><sub>m</sub> = 24,790 dm³·mol⁻¹)? "
           "M(" + CH("Zn") + ") = 65,38 g·mol⁻¹. "
           "<b>Nejdřív rozmyslete, která látka je v nedostatku.</b>",
      given=[G("m", 5.00, "g", sub="Zn"), G("M", 65.38, "g/mol", sub="Zn"),
             G("c", 2.00, "mol/dm3", sub="HCl"), G("V", 30.0, "cm3", sub="HCl"),
             G("Vm", 24.790, "dm3/mol", note="molární objem při 25 °C")],
      find={"s": "V", "sub": "H₂", "unit": "dm3"},
      extras=["n|", "p|", "T|"],
      formulas=["V_{H₂} = n_{H₂}*Vm", "n_{H₂} = n_{HCl}/2", "n_{HCl} = c_{HCl}*V_{HCl}"],
      opt=["n_{Zn} = m_{Zn}/M_{Zn}"],
      distractors=[("n_{H₂} = n_{Zn}", "Tenhle vztah platí jen tehdy, když je v nedostatku "
                    "zinek. Zinku je 0,0765 mol, kyseliny jen 0,0600 mol — a na rozpuštění "
                    "všeho zinku by bylo potřeba 0,153 mol " + CH("HCl") + ". "
                    "V nedostatku je tedy kyselina."),
                   ("n_{H₂} = 2*n_{HCl}", "Poměr je obrácený: na jednu molekulu vodíku "
                    "jsou potřeba dvě molekuly kyseliny, takže vodíku vznikne polovina."),
                   ("n_{HCl} = c_{HCl}/V_{HCl}", "Látkové množství je koncentrace "
                    "krát objem."),
                   ("V_{H₂} = n_{H₂}/Vm", "Převrácený zlomek.")],
      answer={"val": 0.744, "tol": 0.010, "sig": 3},
      hints=["Spočítejte si stranou obě látková množství a porovnejte je s poměrem "
             "z rovnice 1 : 2. Ta látka, které je poměrově méně, řídí celou reakci."],
      outro="Zinku je 0,0765 mol, kyseliny 0,0600 mol. Podle rovnice připadají na jeden "
            "zinek dvě kyseliny, takže by bylo potřeba 0,153 mol " + CH("HCl") + " — "
            "kyselina dojde první a zinek zůstane nerozpuštěný."),

    # ---------------------------------------------------------------- 15
    T(id="gibbs-tz", level=3, topic="Termodynamika",
      title="Teplota zvratu",
      task="Od jaké teploty začne být rozklad vápence " + CH("CaCO₃ → CaO + CO₂") + " "
           "samovolný? Δ<i>H</i>° = +178,3 kJ·mol⁻¹, Δ<i>S</i>° = +160,6 J·K⁻¹·mol⁻¹. "
           "Teplota zvratu je ta, při které je Δ<i>G</i> = 0. Odpověď v kelvinech.",
      given=[G("ΔH", 178.3, "kJ/mol"), G("ΔS", 160.6, "J/K*mol")],
      find={"s": "Tz", "sub": "", "unit": "K"},
      extras=["ΔG|", "T|", "Q|"],
      formulas=["Tz = ΔH/ΔS"],
      opt=["ΔG = ΔH - T*ΔS"],
      distractors=[("Tz = ΔS/ΔH", "Převrácený zlomek — vyjde vám kelvin na mínus prvou."),
                   ("Tz = ΔH*ΔS", "Součin místo podílu. Z rovnice 0 = Δ<i>H</i> − "
                    "<i>T</i>·Δ<i>S</i> plyne <i>T</i> = Δ<i>H</i>/Δ<i>S</i>."),
                   ("Tz = ΔH/(T*ΔS)", "Teplota nemůže být zároveň vlevo i vpravo."),
                   ("Tz = 273.15 + ΔH/ΔS", "Vztah už dává rovnou kelviny, "
                    "žádný převod ze stupňů se nekoná.")],
      answer={"val": 1110.0, "tol": 10.0, "sig": 4},
      hints=["Položte Δ<i>G</i> = 0 v Gibbsově rovnici a vyjádřete teplotu. "
             "Ve vztazích na polici je ten výsledek už hotový."],
      outro="1110 K je asi 837 °C — a skutečně, vápenka pálí vápno kolem 900 °C. "
            "Tohle je hezký příklad výpočtu, který se dá ověřit realitou."),

    # ---------------------------------------------------------------- 16
    T(id="ph-slaba", level=3, topic="pH",
      title="pH slabé kyseliny",
      task="Jaké je pH roztoku kyseliny octové o koncentraci 0,100 mol·dm⁻³? "
           "Disociační konstanta <i>K</i><sub>a</sub> = 1,75·10⁻⁵. Použijte přiblížení "
           "pro slabé kyseliny, tedy že disociovaný podíl je proti celkové koncentraci "
           "zanedbatelný.",
      given=[G("c", 0.100, "mol/dm3", note="analytická koncentrace kyseliny"),
             G("Ka", 1.75e-5, "one", note="pište jako 1,75e-5")],
      find={"s": "pH", "sub": "", "unit": "one"},
      extras=["cH|", "n|", "V|"],
      formulas=["pH = -log(cH)", "cH = sqrt(Ka*c)"],
      distractors=[("pH = -log(c)", "Tenhle vztah platí pro silnou kyselinu, která "
                    "disociuje úplně. Kyselina octová disociuje z necelého procenta."),
                   ("cH = Ka*c", "Rozměrově i početně mimo — vyšlo by 1,75·10⁻⁶ "
                    "a pH kolem 5,8, tedy skoro neutrální roztok."),
                   ("cH = sqrt(Ka/c)", "Podíl místo součinu. Zředěním by pak "
                    "kyselost rostla."),
                   ("cH = Ka/c", "Převrácená úvaha; vyšlo by 1,75·10⁻⁴.")],
      answer={"val": 2.88, "tol": 0.03, "sig": 3},
      hints=["U slabé kyseliny se koncentrace oxoniových kationtů nerovná koncentraci "
             "kyseliny. Musíte ji nejdřív spočítat z disociační konstanty."],
      outro="Kyselina octová o koncentraci 0,1 mol·dm⁻³ má pH 2,88, zatímco stejně "
            "koncentrovaná " + CH("HCl") + " má pH 1,00. Skoro dva řády rozdílu "
            "v kyselosti — a přitom „stejně koncentrovaná“ kyselina."),

    # ---------------------------------------------------------------- 17
    T(id="ksp-agcl", level=3, topic="Srážecí rovnováhy",
      title="Rozpustnost ze součinu rozpustnosti",
      task="Součin rozpustnosti chloridu stříbrného je <i>K</i><sub>s</sub> = "
           "1,77·10⁻¹⁰. Kolik miligramů " + CH("AgCl") + " se rozpustí v jednom litru "
           "vody? M(" + CH("AgCl") + ") = 143,32 g·mol⁻¹.",
      given=[G("Ksp", 1.77e-10, "mol2/dm6", note="pište jako 1,77e-10"),
             G("M", 143.32, "g/mol")],
      find={"s": "γ", "sub": "", "unit": "mg/dm3"},
      extras=["s|", "c|", "n|"],
      formulas=["γ = s*M", "s = sqrt(Ksp)"],
      distractors=[("s = Ksp/2", "Součin rozpustnosti je součin dvou koncentrací, "
                    "ne dvojnásobek jedné. Rozpustnost se z něj dostane odmocninou."),
                   ("s = sqrt(Ksp/4)", "Čtyřka patří do vzorců typu " + CH("MX₂") + ", "
                    "kde jsou dva anionty na jeden kationt. " + CH("AgCl") + " "
                    "je v poměru 1 : 1."),
                   ("γ = s/M", "Dělení místo násobení — koncentrace v molech se "
                    "na gramy převádí násobením molární hmotností."),
                   ("s = Ksp*M", "Míchá dohromady dva různé kroky a rozměrově nedává smysl.")],
      answer={"val": 1.91, "tol": 0.03, "sig": 3},
      hints=["Pro sůl typu " + CH("AgCl") + " platí <i>K</i><sub>s</sub> = <i>s</i>², "
             "protože rozpuštěním vznikne stejně kationtů jako aniontů."],
      outro="Necelé dva miligramy na litr — proto se chlorid stříbrný považuje "
            "za nerozpustný. Nerozpustný ale v chemii nikdy neznamená „vůbec žádný“."),

    # ---------------------------------------------------------------- 18
    T(id="nernst-cu", level=3, topic="Elektrochemie",
      title="Nernstova rovnice",
      task="Jaký je potenciál měděné elektrody ponořené do roztoku "
           + CH("Cu²⁺") + " o koncentraci 0,0100 mol·dm⁻³ při 25 °C? "
           "<i>E</i>°(" + CH("Cu²⁺/Cu") + ") = +0,34 V, počet vyměněných elektronů "
           "<i>z</i> = 2. Použijte tvar Nernstovy rovnice s dekadickým logaritmem "
           "a členem 0,0592 V.",
      given=[G("E0", 0.34, "V", note="standardní potenciál"),
             G("c", 0.0100, "mol/dm3", note="koncentrace kationtů"),
             G("z", 2, "one", note="počet vyměněných elektronů")],
      find={"s": "E", "sub": "", "unit": "V"},
      extras=["Qel|", "I|", "n|"],
      formulas=["E = E0 + (0.0592/z)*log(c)"],
      distractors=[("E = E0 - (0.0592/z)*log(c)", "Znaménko platí pro tvar "
                    "s logaritmem převrácené zlomku. V téhle podobě, s koncentrací "
                    "oxidované formy v čitateli, je před členem plus."),
                   ("E = E0 + (0.0592*z)*log(c)", "Počtem elektronů se dělí, "
                    "ne násobí — čím víc elektronů, tím menší vliv koncentrace."),
                   ("E = E0 + 0.0592*log(c)", "Chybí dělení počtem elektronů; "
                    "platilo by jen pro <i>z</i> = 1."),
                   ("E = E0 + (0.0592/z)*ln(c)", "Člen 0,0592 už v sobě má převod "
                    "na dekadický logaritmus. S přirozeným by tam patřilo 0,0257.")],
      answer={"val": 0.281, "tol": 0.005, "sig": 3},
      hints=["Dosazujete do jediného vztahu. Logaritmus setiny je −2, "
             "takže se potenciál oproti standardnímu sníží."],
      outro="Stokrát zředěný roztok posune potenciál o 0,0592/2 · 2 = 0,0592 V dolů. "
            "Jeden desítkový řád koncentrace tedy u dvouelektronového děje "
            "znamená necelých 30 mV."),

    # ---------------------------------------------------------------- 19
    T(id="faraday-cu", level=3, topic="Elektrochemie",
      title="Faradayovy zákony elektrolýzy",
      task="Roztokem síranu měďnatého prochází proud 2,00 A po dobu 30,0 minut. "
           "Kolik gramů mědi se vyloučí na katodě? M(" + CH("Cu") + ") = "
           "63,55 g·mol⁻¹, <i>z</i> = 2, F = 96 485 C·mol⁻¹.",
      given=[G("I", 2.00, "A"), G("t", 30.0, "min"),
             G("M", 63.55, "g/mol"), G("z", 2, "one", note="Cu²⁺ + 2 e⁻ → Cu")],
      find={"s": "m", "sub": "", "unit": "g"},
      extras=["Qel|", "n|", "V|"],
      formulas=["m = n*M", "n = Qel/(z*F)", "Qel = I*t"],
      distractors=[("n = (z*F)/Qel", "Převrácený zlomek. Čím větší náboj projde, "
                    "tím víc látky se vyloučí — v čitateli tedy musí být náboj."),
                   ("Qel = I/t", "Náboj je proud krát čas. Dvojnásobná doba "
                    "znamená dvojnásobný náboj."),
                   ("m = n/M", "Dělení místo násobení."),
                   ("n = Qel/F", "Chybí počet elektronů. Na jeden atom mědi "
                    "jsou potřeba dva.")],
      answer={"val": 1.19, "tol": 0.02, "sig": 3},
      hints=["Postupujte odzadu: hmotnost potřebuje látkové množství, látkové "
             "množství potřebuje náboj a náboj se počítá z proudu a času."],
      outro="Pozor na minuty: do vzorce patří sekundy, tedy 1800 s. Kdo dosadí 30, "
            "vyjde mu šedesátkrát méně mědi."),

    # ---------------------------------------------------------------- 20
    T(id="aktivita-co60", level=3, topic="Jaderná chemie",
      title="Aktivita radioaktivního zářiče",
      task="Jakou aktivitu má 1,00 mg kobaltu "
           + CH("<sup>60</sup><sub>27</sub>Co") + "? Poločas přeměny je 5,2712 roku, "
           "M(" + CH("<sup>60</sup>Co") + ") = 59,93 g·mol⁻¹, "
           "N<sub>A</sub> = 6,022·10²³ mol⁻¹. Výsledek uveďte v GBq.",
      given=[G("m", 1.00, "mg"), G("M", 59.93, "g/mol"),
             G("Tp", 5.2712, "rok", note="poločas přeměny")],
      find={"s": "A", "sub": "", "unit": "GBq"},
      extras=["λ|", "N|", "n|"],
      formulas=["A = λ*N", "λ = ln(2)/Tp", "N = n*N_A", "n = m/M"],
      distractors=[("λ = Tp/ln(2)", "Převrácený zlomek. Čím delší poločas, "
                    "tím <b>menší</b> přeměnová konstanta."),
                   ("A = λ/N", "Aktivita roste s počtem jader, takže se násobí."),
                   ("N = n/N_A", "Avogadrovou konstantou se moly na částice "
                    "násobí, ne dělí."),
                   ("λ = ln(2)*Tp", "Součin místo podílu.")],
      answer={"val": 41.9, "tol": 0.4, "sig": 3},
      hints=["Aktivita je přeměnová konstanta krát počet dosud nepřeměněných jader. "
             "Obojí musíte teprve vyrobit ze zadání."],
      outro="Necelých 42 GBq z jednoho miligramu — a to je kobaltový zářič, "
            "jaký se používá v radioterapii. Poločas 5,27 roku znamená, že se "
            "zdroj musí zhruba jednou za pět let vyměnit."),
]


# ------------------------------------------------------- referenční řešení
def build_ref(t):
    """Postaví referenční odvození, spočítá všechny hodnoty a zkontroluje výsledek."""
    known = {}
    for g in t["given"]:
        info = sym_info(g["s"], g["sub"])
        known[g["s"] + "|" + g["sub"]] = to_canon(g["val"], g["unit"], info["canon"])

    fml = []
    for src in t["formulas"] + t["opt"]:
        l, r, txt = parse_formula(src)
        fml.append({"key": skey(l), "lhs": l, "rhs": r, "src": txt})
    fmap = {}
    for f in fml:
        fmap.setdefault(f["key"], f)

    fkey = t["find"]["s"] + "|" + t["find"]["sub"]
    start = fmap.get(fkey)
    if start is None:
        raise ValueError("%s: chybí vztah s hledanou veličinou vlevo" % t["id"])

    expr = start["rhs"]
    steps = [{"expr": expr, "src": start["src"], "note": "výchozí vztah"}]
    guard = 0
    while guard < 24:
        guard += 1
        unknown = [k for k in syms_in(expr) if k not in known]
        if not unknown:
            break
        k = unknown[0]
        f = fmap.get(k)
        if f is None:
            raise ValueError("%s: neumím rozvinout %s" % (t["id"], k))
        expr = subst(expr, k, f["rhs"])
        steps.append({"expr": expr, "src": f["src"],
                      "note": "dosazení za " + plain_sym(k)})
    else:
        raise ValueError("%s: odvození se zacyklilo" % t["id"])

    # hodnoty všech veličin (i mezivýsledků) pro diagnostiku
    ref = dict(known)
    for _ in range(8):
        for f in fml:
            if f["key"] in ref:
                continue
            try:
                ref[f["key"]] = ev(f["rhs"], ref)
            except (KeyError, ValueError, ZeroDivisionError, OverflowError):
                pass
    val = ev(expr, ref)
    ref[fkey] = val

    info = sym_info(t["find"]["s"], t["find"]["sub"])
    want = to_canon(t["answer"]["val"], t["find"]["unit"], info["canon"])
    rel = abs(val - want) / max(abs(want), 1e-30)
    ok = rel <= max(t["answer"]["tol"] / max(abs(t["answer"]["val"]), 1e-30) * 1.2, 2e-3)
    return {"expr": expr, "steps": steps, "vals": ref, "canon": val,
            "want": want, "rel": rel, "ok": ok, "fml": fml, "fkey": fkey}


def check_all(verbose=True):
    bad = 0
    for t in TASKS:
        r = build_ref(t)
        info = sym_info(t["find"]["s"], t["find"]["sub"])
        shown = r["canon"] / (1.0) if info["canon"] == t["find"]["unit"] else None
        got = to_canon(r["canon"], info["canon"], t["find"]["unit"]) \
            if unit_info(info["canon"])["d"] == unit_info(t["find"]["unit"])["d"] else float("nan")
        flag = "OK " if r["ok"] else "!! "
        if not r["ok"]:
            bad += 1
        if verbose:
            print("%s%-14s %-22s vzorec → %-12s zadáno %-10s odchylka %.2e  kroků %d"
                  % (flag, t["id"], t["title"][:22], "%.6g" % got,
                     "%.6g" % t["answer"]["val"], r["rel"], len(r["steps"])))
    return bad


if __name__ == "__main__":
    import sys
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    n = check_all()
    print("\núloh:", len(TASKS), " chybných:", n)
