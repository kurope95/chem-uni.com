# -*- coding: utf-8 -*-
"""Metadata webu — pořadí okruhů podle osnovy, popisky a podtémata pro dlaždice.

Každý text menu má vedle české verze i anglickou (pole *_en, u podtémat chips_en
ve stejném pořadí). Menu webu je dvojjazyčné (přepínač CZ/EN); chybějící anglické
pole zastaví make_site.py i kontrolu `python i18n.py --check`. Viz CLAUDE.md.
Angličtina je britská (colour, practise, ionisation).
"""

SITE = {
    "name": "Chemie",
    "name_en": "Chemistry",
    "tagline": "Interaktivní studijní materiály z chemie",
    "tagline_en": "Interactive chemistry study materials",
    "lead": "Interaktivní materiály k chemii: výklad, modely, na kterých si věci osaháte, "
            "řešené příklady krok za krokem a testy, které u každé otázky vysvětlí, "
            "proč je odpověď správná.",
    "lead_en": "Interactive chemistry materials: explanations, models you can get hands-on with, "
               "worked examples step by step, and tests that explain for every question "
               "why the answer is right.",
    "group_lead": "Deset okruhů v pořadí podle školní osnovy. Každý je samostatná stránka s rychlokurzem, "
                  "plným kurzem, testy, tahákem a slovníčkem pojmů.",
    "group_lead_en": "Ten topics in the order of the school syllabus. Each is a separate page with "
                     "a crash course, a full course, tests, a cheat sheet and a glossary.",
}

GROUPS = [
    {
        "id": "okruhy", "slug": "obecna-fyzikalni-chemie",
        "title": "Obecná a fyzikální chemie",
        "title_en": "General and physical chemistry",
        "sub": "Deset okruhů podle školní osnovy. Výklad, interaktivní modely, "
               "řešené příklady a testy s vysvětlením u každé otázky.",
        "sub_en": "Ten topics following the school syllabus. Explanations, interactive models, "
                  "worked examples and tests with an explanation for every question.",
        "kicker": "Naučit se", "kicker_en": "Learn",
        "cta": "Zobrazit okruhy", "cta_en": "Show topics",
        "state": "ready", "icon": "okruhy",
    },
    {
        "id": "anorganika", "slug": "anorganicka-chemie",
        "title": "Anorganická chemie",
        "title_en": "Inorganic chemistry",
        "sub": "Popisná chemie prvků a jejich sloučenin: co existuje, jak to vzniká, "
               "jak se to chová a proč — od vodíku po přechodné kovy.",
        "sub_en": "Descriptive chemistry of the elements and their compounds: what exists, "
                  "how it forms, how it behaves and why — from hydrogen to the transition metals.",
        "kicker": "Naučit se", "kicker_en": "Learn",
        "cta": "Zobrazit okruhy", "cta_en": "Show topics",
        "state": "ready", "icon": "anorganika",
    },
    {
        "id": "testy", "slug": "testy-nanecisto",
        "title": "Testy nanečisto",
        "title_en": "Mock tests",
        "sub": "Souhrnné testy napříč okruhy: na čas, bez nápovědy a s rozborem, "
               "který okruh vás srazil nejvíc.",
        "sub_en": "Summary tests across topics: timed, without hints, and with a breakdown "
                  "of which topic cost you the most points.",
        "kicker": "Vyzkoušet se", "kicker_en": "Test yourself",
        "cta": "Vybrat test", "cta_en": "Choose a test",
        "state": "ready", "icon": "test",
    },
    {
        "id": "pocitani", "slug": "pocitani",
        "title": "Počítání",
        "title_en": "Calculating",
        "sub": "Jak výpočet zapsat, jak zacházet se zlomky a závorkami a jak si ho "
               "natrénovat na úlohách. Tři moduly, které na sebe navazují.",
        "sub_en": "How to write a calculation down, how to handle fractions and brackets, "
                  "and how to practise it on problems. Three modules that build on each other.",
        "kicker": "Naučit se", "kicker_en": "Learn",
        "cta": "Zobrazit moduly", "cta_en": "Show modules",
        "state": "ready", "icon": "pocty",
    },
    {
        "id": "zlomky", "slug": "jak-pocitat/zlomky-a-zavorky",
        "title": "Zlomky a závorky",
        "title_en": "Fractions and brackets",
        "sub": "Kdy zlomková čára nahrazuje závorku, jak přepsat stohovaný zápis "
               "na řádek a zpátky a jak si ověřit, že jste přepsali správně.",
        "sub_en": "When the fraction bar replaces brackets, how to rewrite stacked notation "
                  "on one line and back, and how to check that you rewrote it correctly.",
        "kicker": "Doladit si", "kicker_en": "Fine-tune",
        "cta": "Otevřít modul", "cta_en": "Open module",
        "state": "ready", "icon": "zlomky",
    },
    {
        "id": "pocitat", "slug": "jak-pocitat",
        "title": "Jak počítat chemii",
        "title_en": "How to do chemistry calculations",
        "sub": "Jak zapsat zadání, odvodit vztah a teprve pak dosadit. "
               "Jednotky, převody, přehled vzorců a řešené příklady.",
        "sub_en": "How to write down what is given, derive the relationship and only then "
                  "substitute. Units, conversions, an overview of formulas and worked examples.",
        "kicker": "Naučit se", "kicker_en": "Learn",
        "cta": "Naučit se zápis", "cta_en": "Learn the notation",
        "state": "ready", "icon": "pocty",
    },
    {
        "id": "spolu", "slug": "pocitame-spolu",
        "title": "Počítáme spolu",
        "title_en": "Let’s calculate together",
        "sub": "Výpočet skládáte vy: vyberete vztahy, klepáním dosadíte jeden do druhého "
               "a čísla přijdou na řadu až úplně nakonec.",
        "sub_en": "You build the calculation: pick the relationships, tap to substitute one "
                  "into another, and the numbers come in only at the very end.",
        "kicker": "Procvičit si", "kicker_en": "Practise",
        "cta": "Začít počítat", "cta_en": "Start calculating",
        "state": "ready", "icon": "spolu",
    },
    {
        "id": "tabulka", "slug": "periodicka-tabulka",
        "title": "Periodická tabulka",
        "title_en": "Periodic table",
        "sub": "Všech 118 prvků s daty a šesti režimy obarvení, výklad period, skupin a bloků, "
               "a počítadlo molární hmotnosti ze vzorce včetně hydrátů a složených závorek.",
        "sub_en": "All 118 elements with data and six colouring modes, an explanation of periods, "
                  "groups and blocks, and a molar mass calculator that works from a formula, "
                  "including hydrates and nested brackets.",
        "kicker": "Mít po ruce", "kicker_en": "Keep at hand",
        "cta": "Otevřít tabulku", "cta_en": "Open the table",
        "state": "ready", "icon": "tabulka",
    },
    {
        "id": "nazvoslovi", "slug": "nazvoslovi",
        "title": "České názvosloví",
        "title_en": "Czech nomenclature",
        "sub": "Trenažér názvů a vzorců oběma směry. Osm tříd sloučenin, "
               "úlohy se generují a u každé odpovědi je rozbor, proč to tak je.",
        "sub_en": "A trainer for names and formulas in both directions. Eight classes of compounds, "
                  "generated exercises and an explanation of why for every answer.",
        "kicker": "Nadrilovat si", "kicker_en": "Drill",
        "cta": "Začít trénovat", "cta_en": "Start training",
        "state": "ready", "icon": "nazvo",
    },
    {
        "id": "prikladu", "slug": None,
        "title": "Sbírka příkladů",
        "title_en": "Problem collection",
        "sub": "Početní úlohy k procvičení, řazené podle obtížnosti.",
        "sub_en": "Calculation problems for practice, sorted by difficulty.",
        "kicker": "Chystá se", "kicker_en": "In preparation",
        "cta": "Zatím není hotové", "cta_en": "Not ready yet",
        "state": "soon", "icon": "priklady",
    },
]

# dvojice na úvodní stránce — co spolu souvisí, stojí vedle sebe
PAIRS = [
    {"label": "Látka", "label_en": "Theory",
     "note": "Nejdřív obecné zákonitosti, pak popisná chemie prvků a jejich sloučenin.",
     "note_en": "First the general principles, then the descriptive chemistry of the elements "
                "and their compounds.",
     "items": ["okruhy", "anorganika"]},
    {"label": "Výpočty", "label_en": "Calculations",
     "note": "Jak výpočet zapsat — a tabulka, kterou u toho máte po ruce.",
     "note_en": "How to write a calculation down — and the table to keep at hand while you do.",
     "items": ["pocitani", "tabulka"], "flow": False},
    {"label": "Procvičení", "label_en": "Practice",
     "note": "Vyzkoušejte se nanečisto na čas, nebo si projděte početní úlohy.",
     "note_en": "Take a timed mock test, or work through calculation problems.",
     "items": ["testy", "nazvoslovi", "prikladu"], "flow": False},
]

# pořadí přesně podle osnovy učitele
TOPICS = [
    {
        "slug": "atomove-jadro",
        "n": "01",
        "title": "Atomové jádro, přeměny jader a radioaktivita",
        "title_en": "The atomic nucleus, nuclear transformations and radioactivity",
        "sub": "Z čeho se skládá jádro, proč se některá jádra rozpadají a jak rychle.",
        "sub_en": "What the nucleus is made of, why some nuclei decay, and how fast.",
        "chips": ["protonové a nukleonové číslo", "izotopy, izobary, izotony",
                  "řeka stability", "přeměny α, β, γ", "ionizující záření", "rozpadový zákon"],
        "chips_en": ["proton and nucleon number", "isotopes, isobars, isotones",
                     "band of stability", "α, β and γ decay", "ionising radiation",
                     "radioactive decay law"],
    },
    {
        "slug": "elektronovy-obal",
        "n": "02",
        "title": "Elektronový obal a periodická tabulka",
        "title_en": "Electron shells and the periodic table",
        "sub": "Od pudinkového modelu ke kvantové mechanice a k tomu, proč tabulka vypadá, jak vypadá.",
        "sub_en": "From the plum pudding model to quantum mechanics, and why the periodic table "
                  "looks the way it does.",
        "chips": ["modely atomu", "orbital", "kvantová čísla", "spin",
                  "elektronová konfigurace", "ionizační energie", "elektronegativita"],
        "chips_en": ["models of the atom", "orbital", "quantum numbers", "spin",
                     "electron configuration", "ionisation energy", "electronegativity"],
    },
    {
        "slug": "chemicka-vazba",
        "n": "03",
        "title": "Chemická vazba",
        "title_en": "Chemical bonding",
        "sub": "Kovová, iontová, kovalentní a slabé interakce — a co z nich plyne pro vlastnosti látek.",
        "sub_en": "Metallic, ionic and covalent bonds and weak interactions — and what they mean "
                  "for the properties of substances.",
        "chips": ["kovová vazba", "iontová vazba", "kovalentní vazba", "σ a π",
                  "polarita", "koordinační vazba", "vodíkové můstky"],
        "chips_en": ["metallic bond", "ionic bond", "covalent bond", "σ and π",
                     "polarity", "coordinate bond", "hydrogen bonds"],
    },
    {
        "slug": "struktura-latek",
        "n": "04",
        "title": "Chemická struktura a vlastnosti látek",
        "title_en": "Chemical structure and properties of substances",
        "sub": "Jak uspořádání částic rozhoduje o tom, co látka dělá.",
        "sub_en": "How the arrangement of particles decides what a substance does.",
        "chips": ["pevné látky, kapaliny, plyny", "krystalová mřížka", "amorfní stav",
                  "teorie VSEPR", "hybridizace", "rozpustnost a mísitelnost"],
        "chips_en": ["solids, liquids, gases", "crystal lattice", "amorphous state",
                     "VSEPR theory", "hybridisation", "solubility and miscibility"],
    },
    {
        "slug": "termochemie",
        "n": "05",
        "title": "Termochemie a úvod do termodynamiky",
        "title_en": "Thermochemistry and an introduction to thermodynamics",
        "sub": "Proč některé reakce hřejí, jiné studí — a proč některé samy od sebe neproběhnou.",
        "sub_en": "Why some reactions give off heat and others take it in — and why some "
                  "do not happen on their own.",
        "chips": ["1. termodynamický zákon", "enthalpie", "Hessův zákon",
                  "exo a endo", "entropie", "Gibbsova energie"],
        "chips_en": ["first law of thermodynamics", "enthalpy", "Hess’s law",
                     "exo and endo", "entropy", "Gibbs energy"],
    },
    {
        "slug": "chemicka-kinetika",
        "n": "06",
        "title": "Chemická kinetika",
        "title_en": "Chemical kinetics",
        "sub": "Termodynamika řekla jestli, kinetika odpoví jak rychle.",
        "sub_en": "Thermodynamics tells you whether, kinetics tells you how fast.",
        "chips": ["rychlost reakce", "rychlostní rovnice", "řád a molekularita",
                  "srážková teorie", "aktivovaný komplex", "katalýza"],
        "chips_en": ["reaction rate", "rate equation", "order and molecularity",
                     "collision theory", "activated complex", "catalysis"],
    },
    {
        "slug": "chemicka-rovnovaha",
        "n": "07",
        "title": "Chemická rovnováha",
        "title_en": "Chemical equilibrium",
        "sub": "Když obě reakce běží stejně rychle a navenek se nic neděje.",
        "sub_en": "When both reactions run equally fast and nothing seems to happen.",
        "chips": ["dynamická rovnováha", "rovnovážná konstanta", "Guldberg–Waage",
                  "stupeň konverze", "vliv teploty a tlaku", "Le Chatelier"],
        "chips_en": ["dynamic equilibrium", "equilibrium constant", "Guldberg–Waage",
                     "degree of conversion", "effect of temperature and pressure", "Le Chatelier"],
    },
    {
        "slug": "elektrochemie",
        "n": "08",
        "title": "Rovnovážná elektrochemie",
        "title_en": "Equilibrium electrochemistry",
        "sub": "Redoxní reakce, články a elektrolýza — chemie, která tlačí elektrony.",
        "sub_en": "Redox reactions, cells and electrolysis — chemistry that pushes electrons around.",
        "chips": ["oxidace a redukce", "redukční potenciál", "Beketovova řada",
                  "Nernstova rovnice", "katoda a anoda", "elektrolýza", "koroze"],
        "chips_en": ["oxidation and reduction", "reduction potential", "reactivity series of metals",
                     "Nernst equation", "cathode and anode", "electrolysis", "corrosion"],
    },
    {
        "slug": "acidobazicke-reakce",
        "n": "09",
        "title": "Acidobazické reakce",
        "title_en": "Acid–base reactions",
        "sub": "Tři teorie kyselin a zásad a jak podle nich předpovědět, co se stane.",
        "sub_en": "Three theories of acids and bases, and how to use them to predict what will happen.",
        "chips": ["Arrhenius, Brønsted, Lewis", "konjugovaný pár", "síla kyselin",
                  "konstanta acidity", "předpovídání reakcí", "hydrolýza solí"],
        "chips_en": ["Arrhenius, Brønsted, Lewis", "conjugate pair", "acid strength",
                     "acidity constant", "predicting reactions", "salt hydrolysis"],
    },
    {
        "slug": "vypocty-rovnovah",
        "n": "10",
        "title": "Výpočty související s chemickou rovnováhou",
        "title_en": "Calculations related to chemical equilibrium",
        "sub": "Počítání pH, srážení a komplexů — nejvíc bodů na přijímačkách.",
        "sub_en": "Calculating pH, precipitation and complexes — the most points in entrance exams.",
        "chips": ["pH silných kyselin a bází", "slabé kyseliny a báze", "soli",
                  "pufry", "srážecí rovnováhy", "komplexotvorné rovnováhy"],
        "chips_en": ["pH of strong acids and bases", "weak acids and bases", "salts",
                     "buffers", "precipitation equilibria", "complex formation equilibria"],
    },
]

# localStorage prefixy jednotlivých průvodců (kvůli sjednocení světlého/tmavého režimu)
PREFIXES = ["termo", "jadro", "obal", "vazba", "struktura",
            "kinetika", "rovnovaha", "elchem", "acidobaze", "vypocty"]

# ---- Anorganická chemie -------------------------------------------------
# Pořadí i členění sleduje učebnici Klikorka J., Hájek B., Votinský J.:
# Obecná a anorganická chemie, 2. vydání, SNTL, Praha 1989. Výklad je vlastní.
ANORG_TOPICS = [
    {
        "slug": "vodik-a-voda", "n": "01",
        "title": "Vodík a voda",
        "title_en": "Hydrogen and water",
        "sub": "Nejjednodušší prvek, který se nevejde do žádné skupiny — a nejdůležitější sloučenina, kterou tvoří.",
        "sub_en": "The simplest element, which fits into no group — and the most important "
                  "compound it forms.",
        "chips": ["postavení vodíku", "izotopy", "hydridy", "výroba a použití",
                  "struktura vody", "vodíkové můstky", "tvrdost vody", "peroxid vodíku"],
        "chips_en": ["position of hydrogen", "isotopes", "hydrides", "production and uses",
                     "structure of water", "hydrogen bonds", "water hardness", "hydrogen peroxide"],
    },
    {
        "slug": "halogeny-a-vzacne-plyny", "n": "02",
        "title": "Halogeny a vzácné plyny",
        "title_en": "Halogens and noble gases",
        "sub": "Skupina 17 a 18: nejreaktivnější nekovy vedle prvků, které dlouho platily za netečné.",
        "sub_en": "Groups 17 and 18: the most reactive non-metals next to elements that were "
                  "long thought to be inert.",
        "chips": ["trendy ve skupině 17", "halogenovodíky", "kyslíkaté kyseliny halogenů",
                  "výroba chloru", "fluor a jeho zvláštnosti", "sloučeniny xenonu", "využití"],
        "chips_en": ["trends in group 17", "hydrogen halides", "halogen oxoacids",
                     "chlorine production", "fluorine and its peculiarities", "xenon compounds", "uses"],
    },
    {
        "slug": "kyslik-a-chalkogeny", "n": "03",
        "title": "Kyslík a chalkogeny",
        "title_en": "Oxygen and the chalcogens",
        "sub": "Skupina 16: kyslík a ozon, síra a její oxokyseliny, přechod od nekovu ke kovu.",
        "sub_en": "Group 16: oxygen and ozone, sulfur and its oxoacids, the shift from non-metal to metal.",
        "chips": ["modifikace kyslíku", "oxidy a jejich dělení", "ozon",
                  "modifikace síry", "sulfan a sulfidy", "kyselina sírová", "selen a tellur"],
        "chips_en": ["allotropes of oxygen", "oxides and how they are classified", "ozone",
                     "allotropes of sulfur", "hydrogen sulfide and sulfides", "sulfuric acid",
                     "selenium and tellurium"],
    },
    {
        "slug": "dusik-a-fosfor", "n": "04",
        "title": "Dusík a fosfor",
        "title_en": "Nitrogen and phosphorus",
        "sub": "Skupina 15: od netečného N₂ k výbušninám a hnojivům, a proč se fosfor chová jinak.",
        "sub_en": "Group 15: from inert N₂ to explosives and fertilisers, and why phosphorus "
                  "behaves differently.",
        "chips": ["trojná vazba v N₂", "amoniak a Haberův proces", "oxidy dusíku",
                  "kyselina dusičná", "modifikace fosforu", "kyseliny fosforu", "hnojiva"],
        "chips_en": ["the triple bond in N₂", "ammonia and the Haber process", "nitrogen oxides",
                     "nitric acid", "allotropes of phosphorus", "phosphorus acids", "fertilisers"],
    },
    {
        "slug": "uhlik-kremik-bor", "n": "05",
        "title": "Uhlík, křemík a bor",
        "title_en": "Carbon, silicon and boron",
        "sub": "Prvky, které staví kostry: řetězce uhlíku, sítě křemíku a elektronový deficit boru.",
        "sub_en": "Elements that build frameworks: carbon chains, silicon networks and the "
                  "electron deficiency of boron.",
        "chips": ["modifikace uhlíku", "oxidy uhlíku", "uhličitany", "silikáty",
                  "sklo a keramika", "borany a elektronový deficit", "diagonální podobnost"],
        "chips_en": ["allotropes of carbon", "carbon oxides", "carbonates", "silicates",
                     "glass and ceramics", "boranes and electron deficiency", "diagonal relationship"],
    },
    {
        "slug": "elementarni-kovy", "n": "06",
        "title": "Elementární kovy",
        "title_en": "Metals as elements",
        "sub": "Co dělá kov kovem: vazba, mřížka, slitiny a jak se kovy dostávají z rudy.",
        "sub_en": "What makes a metal a metal: bonding, lattice, alloys, and how metals are "
                  "extracted from ore.",
        "chips": ["kovová vazba a pásová teorie", "typy mřížek", "slitiny",
                  "metalurgie", "redukce rud", "elektrolytická výroba", "koroze"],
        "chips_en": ["metallic bonding and band theory", "lattice types", "alloys",
                     "metallurgy", "reduction of ores", "electrolytic production", "corrosion"],
    },
    {
        "slug": "neprechodne-kovy", "n": "07",
        "title": "Nepřechodné kovy",
        "title_en": "Main-group metals",
        "sub": "Kovy bloků s a p: alkalické kovy, kovy alkalických zemin, hliník a efekt inertního páru.",
        "sub_en": "Metals of the s- and p-blocks: alkali metals, alkaline earth metals, aluminium "
                  "and the inert pair effect.",
        "chips": ["alkalické kovy", "kovy alkalických zemin", "hliník a amfoterita",
                  "cín a olovo", "efekt inertního páru", "Solvayův proces", "biogenní prvky"],
        "chips_en": ["alkali metals", "alkaline earth metals", "aluminium and amphoterism",
                     "tin and lead", "inert pair effect", "Solvay process", "biogenic elements"],
    },
    {
        "slug": "koordinacni-slouceniny", "n": "08",
        "title": "Koordinační sloučeniny",
        "title_en": "Coordination compounds",
        "sub": "Komplexy: centrální atom, ligandy a teorie, které vysvětlí jejich barvu i magnetismus.",
        "sub_en": "Complexes: the central atom, ligands, and the theories that explain their "
                  "colour and magnetism.",
        "chips": ["centrální atom a ligandy", "koordinační číslo", "názvosloví komplexů",
                  "izomerie", "teorie krystalového pole", "barevnost", "chelatace"],
        "chips_en": ["central atom and ligands", "coordination number", "naming complexes",
                     "isomerism", "crystal field theory", "colour", "chelation"],
    },
    {
        "slug": "prechodne-kovy", "n": "09",
        "title": "Přechodné kovy",
        "title_en": "Transition metals",
        "sub": "Blok d: proměnlivá oxidační čísla, barevné sloučeniny a kovy, na kterých stojí průmysl.",
        "sub_en": "The d-block: variable oxidation states, coloured compounds and the metals "
                  "that industry is built on.",
        "chips": ["konfigurace d", "oxidační čísla", "triáda železa", "chrom a mangan",
                  "měď, stříbro, zlato", "zinková skupina", "katalýza", "výroba oceli"],
        "chips_en": ["d configurations", "oxidation states", "the iron triad", "chromium and manganese",
                     "copper, silver, gold", "the zinc group", "catalysis", "steelmaking"],
    },
]

ANORG_PREFIXES = ["vodik", "halogeny", "chalkogeny", "dusik", "uhlik",
                  "kovy", "nekovy", "komplexy", "prechodne"]
