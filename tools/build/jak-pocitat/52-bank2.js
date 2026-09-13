/* ============================================================
   41 · BANKA OTÁZEK — kapitoly 05 až 08
   ============================================================ */
BANK.q5 = [
 {t:"single",q:"Jaký je univerzální postup stechiometrické úlohy?",
  o:["gramy → gramy podle poměru koeficientů","gramy → moly → moly → gramy","moly → gramy → moly","objem → hmotnost → objem"],c:1,
  e:"Koeficienty platí <b>jen pro moly</b>, takže se do světa molů musí nejdřív přejít a pak z něj zase vyjít. Aplikovat poměr přímo na gramy je jedna z nejtěžších chyb, protože výsledek vypadá věrohodně a nikde se neprozradí."},
 {t:"num",q:"Kolik molů je 25,0 g uhličitanu vápenatého? <span class=\"chem\">M</span>(CaCO₃) = 100,09 g·mol⁻¹. (Zadejte v mol na tři platné číslice.)",
  ans:0.250,tol:0.006,unit:"mol",
  e:"n = m/M = 25,0/100,09 = <b>0,250 mol</b>. Molární hmotnost CaCO₃ je velmi blízko 100, takže se tenhle příklad hodí na rychlou kontrolu řádu: čtvrtina stovky je čtvrtina molu."},
 {t:"num",q:"Kolik gramů železa vznikne redukcí 10,0 g <span class=\"chem\">Fe₂O₃</span>? Rovnice: <span class=\"chem\">Fe₂O₃ + 3 CO → 2 Fe + 3 CO₂</span>, <span class=\"chem\">M</span>(Fe₂O₃) = 159,70, <span class=\"chem\">M</span>(Fe) = 55,85 g·mol⁻¹. (Zadejte v g.)",
  ans:6.99,tol:0.15,unit:"g",
  e:"n(Fe₂O₃) = 10,0/159,70 = 0,0626 mol; poměr 1 : 2 dá n(Fe) = 0,1252 mol; m = 0,1252 · 55,85 = <b>6,99 g</b>. Kdo zapomene na dvojku, dostane 3,50 g. Kontrola: železo tvoří 70 % hmotnosti oxidu, tedy 7,0 g z 10 g."},
 {t:"single",q:"Do reakce <span class=\"chem\">Zn + 2 HCl → ZnCl₂ + H₂</span> dáme 0,10 mol zinku a 0,15 mol HCl. Který reaktant limituje?",
  o:["Zinek, protože jeho je méně molů","Ani jeden — poměr sedí přesně","Kyselina, protože 0,15/2 < 0,10/1","Nelze rozhodnout bez objemu roztoku"],c:2,
  e:"Rozhoduje podíl n/ν: pro zinek 0,10/1 = 0,10, pro kyselinu 0,15/2 = 0,075. Menší podíl limituje, takže dojde <b>kyselina</b>, i když jí je molárně víc. Porovnávat holé moly bez dělení koeficientem je klasická past."},
 {t:"num",q:"Rozpuštěním 6,54 g zinku v nadbytku kyseliny vznikne vodík. Jaký objem zaujme za normálních podmínek? <span class=\"chem\">M</span>(Zn) = 65,38 g·mol⁻¹, <span class=\"q\">V</span><sub>m</sub> = 22,414 dm³·mol⁻¹. (Zadejte v dm³.)",
  ans:2.24,tol:0.06,unit:"dm³",
  e:"n(Zn) = 6,54/65,38 = 0,100 mol; poměr Zn : H₂ = 1 : 1, takže n(H₂) = 0,100 mol; V = 0,100 · 22,414 = <b>2,24 dm³</b>. Kyselina je v nadbytku, takže limituje zinek. Kdo by použil V<sub>m</sub> = 24,79, dostal by 2,48 — o 10 % vedle."},
 {t:"num",q:"Teoretický výtěžek reakce je 20,0 g produktu, reakce probíhá s výtěžkem 75 %. Kolik produktu skutečně získáme? (Zadejte v g.)",
  ans:15.0,tol:0.4,unit:"g",
  e:"m = 20,0 · 0,75 = <b>15,0 g</b>. Výtěžek se aplikuje <b>až na konci</b>, na hotový produkt — na rozdíl od čistoty vstupní suroviny, která se aplikuje hned na navážku. Kdyby se ptali obráceně („kolik suroviny na 20 g produktu“), muselo by se dělit."}
];

BANK.q6 = [
 {t:"num",q:"Odměříme 50,0 cm³ roztoku o koncentraci 1,00 mol·dm⁻³ a doplníme na 500 cm³. Jaká je výsledná koncentrace? (Zadejte v mol·dm⁻³.)",
  ans:0.100,tol:0.004,unit:"mol·dm⁻³",
  e:"c₂ = c₁V₁/V₂ = 1,00 · 50,0/500 = <b>0,100 mol·dm⁻³</b>. Objem vzrostl desetkrát, koncentrace tedy desetkrát klesla. V ředicí rovnici se objemy vykrátí, takže se smějí dosadit i v cm³ — ale oba naráz."},
 {t:"single",q:"Rozpustíme 10 g látky v 90 g vody. Jaký je hmotnostní zlomek?",
  o:["11,1 %","10,0 %","9,0 %","1,11 %"],c:1,
  e:"Jmenovatelem je hmotnost <b>celého roztoku</b>, tedy 10 + 90 = 100 g: w = 10/100 = 10,0 %. Hodnota 11,1 % by vznikla dělením hmotností samotné vody (10/90) — to je klasická past, protože v zadání je právě číslo 90."},
 {t:"num",q:"Komerční roztok <span class=\"chem\">NaOH</span> je 20,0% (hmotnostně) a má hustotu 1,14 g·cm⁻³. Jaká je jeho látková koncentrace? <span class=\"chem\">M</span>(NaOH) = 40,00 g·mol⁻¹. (Zadejte v mol·dm⁻³.)",
  ans:5.70,tol:0.15,unit:"mol·dm⁻³",
  e:"c = w·ρ/M = 0,200 · 1140 g·dm⁻³ / 40,00 g·mol⁻¹ = <b>5,70 mol·dm⁻³</b>. Hustota musí být v g·dm⁻³, tedy 1,14 g·cm⁻³ = 1140 g·dm⁻³. Kdo hustotu vynechá, dostane 5,00 — o 12 % méně."},
 {t:"num",q:"Jaký objem zaujme 0,500 mol plynu při 25 °C a tlaku 100 kPa? (Zadejte v dm³.)",
  ans:12.4,tol:0.3,unit:"dm³",
  e:"V = nRT/p = 0,500 · 8,314 · 298,15 / 100 = <b>12,4 dm³</b>. Rychleji přes molární objem: 0,500 · 24,79 = 12,4 dm³, protože 25 °C a 100 kPa jsou přesně standardní podmínky. Za normálních podmínek by vyšlo 11,2 dm³."},
 {t:"single",q:"Který plynový zákon dostanete ze stavové rovnice, když udržíte konstantní látkové množství a teplotu?",
  o:["Charlesův: V₁/T₁ = V₂/T₂","Gay-Lussacův: p₁/T₁ = p₂/T₂","Boyleův–Mariottův: p₁V₁ = p₂V₂","Avogadrův: V₁/n₁ = V₂/n₂"],c:2,
  e:"Je-li nRT konstantní, je konstantní i součin pV — to je Boyleův–Mariottův zákon. Charlesův plyne z konstantního tlaku, Gay-Lussacův z konstantního objemu a Avogadrův z konstantního tlaku i teploty. Všechny jsou jen zvláštní případy jedné rovnice, není potřeba si je pamatovat zvlášť."},
 {t:"num",q:"Smícháme 100 cm³ roztoku o koncentraci 0,200 mol·dm⁻³ a 300 cm³ roztoku o koncentraci 0,600 mol·dm⁻³ téže látky. Jaká je výsledná koncentrace? (Zadejte v mol·dm⁻³.)",
  ans:0.500,tol:0.015,unit:"mol·dm⁻³",
  e:"c = (c₁V₁ + c₂V₂)/(V₁+V₂) = (0,200·100 + 0,600·300)/400 = 200/400 = <b>0,500 mol·dm⁻³</b>. Výsledek musí ležet mezi 0,200 a 0,600 — a leží blíž k tomu roztoku, kterého je objemově víc. Prostý průměr 0,400 by platil jen při stejných objemech."},
 {t:"multi",q:"Která tvrzení o molárním objemu plynu platí?",
  o:["Za normálních podmínek (0 °C, 101,325 kPa) je 22,414 dm³·mol⁻¹","Za standardních podmínek (25 °C, 100 kPa) je 24,790 dm³·mol⁻¹","Závisí na druhu plynu","Při jiných podmínkách je lepší počítat ze stavové rovnice"],c:[0,1,3],
  e:"U ideálního plynu molární objem na druhu plynu <b>nezávisí</b> — to je obsah Avogadrova zákona a důvod, proč se s ním dá vůbec počítat. Reálné plyny se od ideálního mírně liší, ale na středoškolské úrovni to zanedbáváme."}
];

BANK.q7 = [
 {t:"num",q:"Kolik tepla je potřeba k ohřátí 250 g vody o 8,0 K? <span class=\"q\">c</span>(H₂O) = 4,18 J·g⁻¹·K⁻¹. (Zadejte v kJ.)",
  ans:8.36,tol:0.2,unit:"kJ",
  e:"Q = mcΔT = 250 · 4,18 · 8,0 = 8360 J = <b>8,36 kJ</b>. Jednotky: g · J·g⁻¹·K⁻¹ · K = J ✓. Do kalorimetrické rovnice patří hmotnost <b>vody</b>, ne vzorku, a Δ<span class=\"q\">T</span> je rozdíl, takže je v K i v °C stejná."},
 {t:"num",q:"Reakce prvního řádu má rychlostní konstantu <span class=\"q\">k</span> = 1,20·10⁻³ s⁻¹. Jaký je její poločas? (Zadejte v sekundách.)",
  ans:578,tol:8,unit:"s",
  e:"t<sub>1/2</sub> = ln 2 / k = 0,6931 / 1,20·10⁻³ = <b>578 s</b>, tedy necelých deset minut. Jednotka s⁻¹ u rychlostní konstanty prozrazuje, že jde o první řád — u druhého řádu by měla jednotku mol⁻¹·dm³·s⁻¹."},
 {t:"single",q:"Ve vztahu Δ<span class=\"q\">G</span>° = −<span class=\"q\">RT</span> ln <span class=\"q\">K</span> je použit logaritmus:",
  o:["dekadický, protože K je mocnina deseti","přirozený, a záměna za dekadický posune výsledek 2,303×","libovolný, na základu nezáleží","dvojkový"],c:1,
  e:"Je to <b>přirozený</b> logaritmus. Poměr ln x / log x je vždy 2,303, takže záměna posune výsledek přesně o tento faktor — a to je zároveň nejrychlejší způsob, jak takovou chybu poznat. Dekadický logaritmus patří naopak do pH a pK<sub>a</sub>."},
 {t:"num",q:"Vypočtěte Δ<span class=\"q\">G</span>° pro reakci s rovnovážnou konstantou <span class=\"q\">K</span> = 1,00·10³ při 298,15 K. (Zadejte v kJ·mol⁻¹ včetně znaménka.)",
  ans:-17.1,tol:0.5,unit:"kJ·mol⁻¹",
  e:"ΔG° = −RT ln K = −8,314 · 298,15 · ln(1000) = −8,314 · 298,15 · 6,908 = −17 123 J·mol⁻¹ = <b>−17,1 kJ·mol⁻¹</b>. Kontrola: tři řády v K odpovídají 3 · 5,71 = 17,1 kJ·mol⁻¹. Záporné znaménko značí samovolnou reakci."},
 {t:"num",q:"Elektrolýzou roztoku <span class=\"chem\">AgNO₃</span> prochází proud 2,00 A po dobu 600 s. Kolik stříbra se vyloučí? <span class=\"chem\">M</span>(Ag) = 107,87 g·mol⁻¹, <span class=\"q\">z</span> = 1, <span class=\"q\">F</span> = 96 485 C·mol⁻¹. (Zadejte v g.)",
  ans:1.34,tol:0.05,unit:"g",
  e:"m = MIt/(zF) = 107,87 · 2,00 · 600 / (1 · 96 485) = <b>1,34 g</b>. Stříbro se vylučuje jednoelektronově (Ag⁺ + e⁻ → Ag), takže z = 1; u mědi by bylo z = 2 a výsledek by se při stejném náboji půlil."},
 {t:"num",q:"Jaké je pH roztoku kyseliny chlorovodíkové o koncentraci 0,0100 mol·dm⁻³? (Zadejte pH na dvě desetinná místa.)",
  ans:2.00,tol:0.08,unit:"pH",
  e:"HCl je silná kyselina, disociuje úplně, takže [H₃O⁺] = c = 1,00·10⁻² a pH = −log(10⁻²) = <b>2,00</b>. U slabé kyseliny téže koncentrace by pH bylo vyšší, protože disociuje jen zlomek molekul — například kyselina octová by měla pH 3,38."}
];

BANK.q8 = [
 {t:"single",q:"Studentovi vyšla koncentrace 0,000400 mol·dm⁻³ místo správných 0,400. Kde je chyba skoro jistě?",
  o:["Ve špatné molární hmotnosti","V neprovedeném převodu cm³ na dm³","V zaokrouhlení","V zapomenutém stechiometrickém koeficientu"],c:1,
  e:"Výsledek je <b>přesně tisíckrát</b> menší — a tisícinásobek je podpis chybějícího převodu mezi cm³ a dm³ nebo mezi g a kg. Chyba v molární hmotnosti dá zpravidla jen procenta, zapomenutý koeficient faktor dva nebo tři."},
 {t:"num",q:"Kolikrát se splete ten, kdo do vzorce <span class=\"mono\">c = n/V</span> dosadí objem v cm³ místo v dm³? (Zadejte číslo.)",
  ans:1000,tol:1,unit:"×",
  e:"1 dm³ = 1000 cm³, takže dosazení většího čísla do jmenovatele dá <b>1000×</b> menší koncentraci. Stejný tisícinásobek vzniká i u záměny gramů a kilogramů — proto se převod píše hned do bloku zadání."},
 {t:"num",q:"Pro reakci platí Δ<span class=\"q\">H</span> = −92,2 kJ·mol⁻¹ a Δ<span class=\"q\">S</span> = −198,8 J·K⁻¹·mol⁻¹. Vypočtěte Δ<span class=\"q\">G</span> při 298 K. (Zadejte v kJ·mol⁻¹ včetně znaménka.)",
  ans:-33.0,tol:0.8,unit:"kJ·mol⁻¹",
  e:"ΔS je nutné převést na kJ: −0,1988 kJ·K⁻¹·mol⁻¹. Pak ΔG = −92,2 − 298·(−0,1988) = −92,2 + 59,2 = <b>−33,0 kJ·mol⁻¹</b>. Bez převodu by vyšlo +59 150 „kJ·mol⁻¹“, což je nesmysl o tři řády — a navíc s obráceným znaménkem, takže by z toho plynul chybný závěr o samovolnosti."},
 {t:"single",q:"Které pravidlo platí pro molární objem plynu, když zadání uvádí teplotu 60 °C?",
  o:["Použít 22,4 dm³·mol⁻¹","Použít 24,8 dm³·mol⁻¹","Nepoužívat V<sub>m</sub> vůbec a počítat ze stavové rovnice","Použít průměr obou hodnot"],c:2,
  e:"Tabelované hodnoty V<sub>m</sub> platí jen pro dvě konkrétní sady podmínek. Při 60 °C neplatí ani jedna, takže se objem počítá jako V = nRT/p. Průměrování hodnot nedává žádný fyzikální smysl — závislost objemu na teplotě je lineární v kelvinech, ne mezi dvěma tabulkovými body."},
 {t:"multi",q:"Které kontroly odhalí chybu ještě před odevzdáním?",
  o:["Vyšla jednotka, kterou jsem napsal v bloku „hledáme“?","Je výtěžek pod 100 %?","Leží pH mezi 0 a 14 pro běžný roztok?","Je výsledek na displeji kalkulačky vypsaný celý?"],c:[0,1,2],
  e:"První tři jsou standardní kontroly — rozměrová, fyzikální mez a rozsah hodnoty. Opsat celý displej kalkulačky je naopak chyba: tvrdí to přesnost, kterou vstupní data nemají, a u maturity za to jde bod dolů."},
 {t:"single",q:"Výsledek úlohy vyšel 2,3× větší, než měl. Kde se chyba nejspíš stala?",
  o:["V převodu cm³ na dm³","V záměně přirozeného a dekadického logaritmu","V zapomenutém stechiometrickém koeficientu","V zaokrouhlení uprostřed výpočtu"],c:1,
  e:"Faktor 2,303 je poměr ln x / log x, takže je typickým podpisem záměny logaritmů — nejčastěji ve vztahu ΔG° = −RT ln K nebo v Nernstově rovnici. Převod jednotek by dal 1000×, koeficient celé číslo 2 nebo 3 a zaokrouhlení jen poslední číslici."}
];
