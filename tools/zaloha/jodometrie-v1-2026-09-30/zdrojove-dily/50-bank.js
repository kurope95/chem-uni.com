/* ============================================================
   J13 · MINI-TESTY KE KAPITOLÁM
   ============================================================ */
BANK.q0 = [
 {t:"single", q:"Na jakém typu reakce je jodometrie založena?",
  o:["Acidobazické","Srážecí","Komplexotvorné","Redoxní"], c:3,
  e:"Jodometrie využívá přeměnu mezi I₂ a I⁻. Mění se při ní oxidační číslo jodu (0 ↔ −1), jde tedy o redoxní reakci."},
 {t:"single", q:"Která forma jodu působí v páru I₂/2I⁻ jako <b>redukovadlo</b>?",
  o:["I₂","I⁻","I₃⁻","IO₃⁻"], c:1,
  e:"Jodid má nižší oxidační číslo (−1) a může elektrony odevzdat, přitom se oxiduje na I₂. Proto je redukovadlem."},
 {t:"single", q:"Doplňte: přímou jodometrií se stanovují ____, nepřímou ____.",
  o:["oxidovadla; redukovadla","redukovadla; oxidovadla","kyseliny; zásady","kationty; anionty"], c:1,
  e:"Přímo titrujeme jodem (oxidovadlem) látky, které se snadno oxidují, tedy redukovadla. Nepřímo stanovujeme oxidovadla: ta z KI uvolní jod a ten titrujeme thiosíranem."}
];

BANK.q1 = [
 {t:"single", q:"Jaký odměrný roztok se používá při přímé jodometrii?",
  o:["Roztok KI","Roztok Na₂S₂O₃","Roztok I₂ v KI","Roztok škrobu"], c:2,
  e:"Přímá jodometrie titruje redukovadla jodem. Kvůli špatné rozpustnosti se jod rozpouští v KI na I₃⁻."},
 {t:"single", q:"Jaké pH je obvykle optimální pro přímou jodometrii?",
  o:["Silně kyselé (pH &lt; 4)","Mírně kyselé (pH 4–6)","Neutrální až slabě zásadité (pH 7–9)","Silně zásadité (pH &gt; 10)"], c:2,
  e:"V tomto rozmezí reaguje jod s redukovadly úplně a vedlejší reakce jsou potlačené: v kyselém se jodid oxiduje vzduchem, v zásaditém jod disproporcionuje."},
 {t:"single", q:"Doplňte: při přímé jodometrii se škrob přidává ____ titrace a bod ekvivalence ukáže ____ zbarvení.",
  o:["na začátku; vznik modrého","na konci; zmizení modrého","na začátku; zmizení modrého","na konci; vznik žlutého"], c:0,
  e:"Volný jod se objeví až v bodě ekvivalence, takže škrob může být v baňce od začátku. První přebytečná kapka jodu roztok modře zbarví."}
];

BANK.q2 = [
 {t:"single", q:"Jakou funkci má nadbytek KI v prvním kroku nepřímé jodometrie?",
  o:["Je katalyzátorem.","Dodává I⁻ pro reakci s analytem a rozpouští vzniklý I₂.","Upravuje pH roztoku.","Slouží jako indikátor."], c:1,
  e:"Analyt oxiduje jodidy na I₂. Nadbytek KI zajistí, že reakce proběhne úplně, a vzniklý jod udrží v roztoku jako I₃⁻."},
 {t:"single", q:"Proč se škrob při nepřímé jodometrii přidává až ke konci titrace?",
  o:["Aby nereagoval s Na₂S₂O₃.","Protože se v kyselém prostředí rozkládá.","Aby při vysoké koncentraci I₂ nevznikl příliš pevný komplex.","Protože reaguje jen s I⁻, ne s I₂."], c:2,
  e:"Při vysoké koncentraci jodu vznikne velmi pevný komplex. Jod vázaný v něm reaguje s thiosíranem pomalu a konec titrace je neostrý."},
 {t:"single", q:"Doplňte: uvolněný jod se titruje odměrným roztokem ____ sodného a škrob se přidá, až roztok zesvětlá na ____ barvu.",
  o:["thiosíranu; světle žlutou","síranu; modrou","siřičitanu; hnědou","thiosíranu; bezbarvou"], c:0,
  e:"Titrantem je thiosíran sodný Na₂S₂O₃. Škrob patří do roztoku ve chvíli, kdy je světle žlutý: většina jodu už zreagovala, ale ještě nějaký zbývá."},
 {t:"single", q:"Kolik molů thiosíranu odpovídá jednomu molu dichromanu?",
  o:["1","2","3","6"], c:3,
  e:"Cr₂O₇²⁻ + 6I⁻ + 14H⁺ → 2Cr³⁺ + 3I₂ + 7H₂O, 1 mol dichromanu tedy uvolní 3 mol I₂. Každý mol I₂ spotřebuje 2 mol thiosíranu, celkem 1 : 6."}
];

BANK.q3 = [
 {t:"single", q:"Která chyba vede při nepřímé jodometrii k falešně <b>vyššímu</b> výsledku?",
  o:["Těkání I₂","Oxidace I⁻ vzdušným kyslíkem","Neúplná reakce analytu s KI","Adsorpce I₂ na sraženině"], c:1,
  e:"Kyslík z jodidu vyrobí jod, který nepochází z analytu. Ten ale také spotřebuje thiosíran, spotřeba stoupne a výsledek vyjde vyšší. Ostatní tři chyby jod ztrácejí, výsledek snižují."},
 {t:"single", q:"Přídavek KSCN ke konci titrace při stanovení Cu²⁺ zmenšuje chybu způsobenou:",
  o:["oxidací I⁻ vzduchem","těkáním I₂","adsorpcí I₂ na sraženině CuI","nečistotou IO₃⁻ v KI"], c:2,
  e:"KSCN převede CuI na CuSCN (CuI + SCN⁻ → CuSCN + I⁻), který jod tolik neadsorbuje. Uvolněný jod se pak ztitruje."},
 {t:"single", q:"Co je slepý pokus?",
  o:["Titrace bez indikátoru","Titrace všech činidel bez vzorku","Titrace vzorku o dvojnásobné koncentraci","Titrace vzorku jiným titrantem"], c:1,
  e:"Titrují se všechna činidla ve stejném množství jako při analýze, jen bez vzorku. Spotřebu slepého pokusu odečteme a odstraníme tak vliv nečistot a vedlejších reakcí."}
];

BANK.q4 = [
 {t:"single", q:"Tři titrace dají 12,31, 12,30 a 12,32 ml, ale standard se známým obsahem vychází o 5 % výš. Výsledky jsou:",
  o:["přesné i správné","přesné, ale nesprávné","správné, ale nepřesné","nepřesné i nesprávné"], c:1,
  e:"Hodnoty se téměř neliší, měření je tedy přesné. Soustavný posun od skutečné hodnoty ukazuje systematickou chybu, výsledek proto není správný."},
 {t:"single", q:"Který údaj popisuje přesnost opakovaných stanovení?",
  o:["průměr","relativní směrodatná odchylka","molární hmotnost analytu","objem alikvotu"], c:1,
  e:"Směrodatná odchylka a RSD popisují rozptyl hodnot kolem průměru. Čím menší, tím přesnější měření. Průměr je nejlepší odhad samotné hodnoty."},
 {t:"single", q:"Titrant jste standardizovali chybně: jeho skutečná koncentrace je <b>vyšší</b>, než s jakou počítáte. Výsledek analýzy bude:",
  o:["vyšší","nižší","stejný","nedá se říct"], c:1,
  e:"Silnější titrant se spotřebuje méně. Když menší objem vynásobíte nižší (předpokládanou) koncentrací, vyjde méně analytu."}
];

BANK.q5 = [
 {t:"num", q:"Na 20,00 ml roztoku vitamínu C se spotřebovalo 9,80 ml jodu o koncentraci 0,0500 mol/l. Kolik <b>milimolů</b> vitamínu C bylo v titrovaném objemu?",
  ans:0.49, tol:0.005, unit:"mmol",
  e:"Poměr 1 : 1, takže n(vit. C) = n(I₂) = 0,0500 mol/l · 9,80 ml = 0,490 mmol."},
 {t:"num", q:"Při stanovení Cu²⁺ se spotřebovalo 12,40 ml thiosíranu o koncentraci 0,1000 mol/l. Kolik <b>miligramů</b> mědi (<i>M</i> = 63,55 g/mol) bylo ve vzorku?",
  ans:78.8, tol:0.4, unit:"mg",
  e:"2Cu²⁺ uvolní 1 I₂ a ten spotřebuje 2 S₂O₃²⁻, poměr Cu²⁺ : S₂O₃²⁻ je tedy 1 : 1. n(Cu) = 0,1000 · 12,40 = 1,240 mmol; m = 1,240 mmol · 63,55 g/mol = 78,8 mg."},
 {t:"single", q:"Titrovali jste 25,00 ml alikvot ze 250,0 ml odměrné baňky. Čím vynásobíte látkové množství z titrace, abyste dostali obsah celé baňky?",
  o:["0,1","2,5","10","25"], c:2,
  e:"Faktor zředění je 250,0 / 25,00 = 10. V celé baňce je desetkrát víc než v titrovaném alikvotu."}
];
