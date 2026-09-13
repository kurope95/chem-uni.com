# -*- coding: utf-8 -*-
"""Metadata webu — pořadí okruhů podle osnovy, popisky a podtémata pro dlaždice."""

SITE = {
    "name": "Chemie",
    "tagline": "Interaktivní studijní materiály z chemie",
    "lead": "Interaktivní materiály k chemii: výklad, modely, na kterých si věci osaháte, "
            "řešené příklady krok za krokem a testy, které u každé otázky vysvětlí, "
            "proč je odpověď správná.",
    "group_lead": "Deset okruhů v pořadí podle školní osnovy. Každý je samostatná stránka s rychlokurzem, "
                  "plným kurzem, testy, tahákem a slovníčkem pojmů.",
}

GROUPS = [
    {
        "id": "okruhy", "slug": "obecna-fyzikalni-chemie",
        "title": "Obecná a fyzikální chemie",
        "sub": "Deset okruhů podle školní osnovy. Výklad, interaktivní modely, "
               "řešené příklady a testy s vysvětlením u každé otázky.",
        "kicker": "Naučit se",
        "cta": "Zobrazit okruhy",
        "state": "ready", "icon": "okruhy",
    },
    {
        "id": "anorganika", "slug": "anorganicka-chemie",
        "title": "Anorganická chemie",
        "sub": "Popisná chemie prvků a jejich sloučenin: co existuje, jak to vzniká, "
               "jak se to chová a proč — od vodíku po přechodné kovy.",
        "kicker": "Naučit se",
        "cta": "Zobrazit okruhy",
        "state": "ready", "icon": "anorganika",
    },
    {
        "id": "testy", "slug": "testy-nanecisto",
        "title": "Testy nanečisto",
        "sub": "Souhrnné testy napříč okruhy: na čas, bez nápovědy a s rozborem, "
               "který okruh vás srazil nejvíc.",
        "kicker": "Vyzkoušet se",
        "cta": "Vybrat test",
        "state": "ready", "icon": "test",
    },
    {
        "id": "pocitani", "slug": "pocitani",
        "title": "Počítání",
        "sub": "Jak výpočet zapsat, jak zacházet se zlomky a závorkami a jak si ho "
               "natrénovat na úlohách. Tři moduly, které na sebe navazují.",
        "kicker": "Naučit se",
        "cta": "Zobrazit moduly",
        "state": "ready", "icon": "pocty",
    },
    {
        "id": "zlomky", "slug": "jak-pocitat/zlomky-a-zavorky",
        "title": "Zlomky a závorky",
        "sub": "Kdy zlomková čára nahrazuje závorku, jak přepsat stohovaný zápis "
               "na řádek a zpátky a jak si ověřit, že jste přepsali správně.",
        "kicker": "Doladit si",
        "cta": "Otevřít modul",
        "state": "ready", "icon": "zlomky",
    },
    {
        "id": "pocitat", "slug": "jak-pocitat",
        "title": "Jak počítat chemii",
        "sub": "Jak zapsat zadání, odvodit vztah a teprve pak dosadit. "
               "Jednotky, převody, přehled vzorců a řešené příklady.",
        "kicker": "Naučit se",
        "cta": "Naučit se zápis",
        "state": "ready", "icon": "pocty",
    },
    {
        "id": "spolu", "slug": "pocitame-spolu",
        "title": "Počítáme spolu",
        "sub": "Výpočet skládáte vy: vyberete vztahy, klepáním dosadíte jeden do druhého "
               "a čísla přijdou na řadu až úplně nakonec.",
        "kicker": "Procvičit si",
        "cta": "Začít počítat",
        "state": "ready", "icon": "spolu",
    },
    {
        "id": "tabulka", "slug": "periodicka-tabulka",
        "title": "Periodická tabulka",
        "sub": "Všech 118 prvků s daty a šesti režimy obarvení, výklad period, skupin a bloků, "
               "a počítadlo molární hmotnosti ze vzorce včetně hydrátů a složených závorek.",
        "kicker": "Mít po ruce",
        "cta": "Otevřít tabulku",
        "state": "ready", "icon": "tabulka",
    },
    {
        "id": "nazvoslovi", "slug": "nazvoslovi",
        "title": "České názvosloví",
        "sub": "Trenažér názvů a vzorců oběma směry. Osm tříd sloučenin, "
               "úlohy se generují a u každé odpovědi je rozbor, proč to tak je.",
        "kicker": "Nadrilovat si",
        "cta": "Začít trénovat",
        "state": "ready", "icon": "nazvo",
    },
    {
        "id": "prikladu", "slug": None,
        "title": "Sbírka příkladů",
        "sub": "Početní úlohy k procvičení, řazené podle obtížnosti.",
        "kicker": "Chystá se",
        "cta": "Zatím není hotové",
        "state": "soon", "icon": "priklady",
    },
]

# dvojice na úvodní stránce — co spolu souvisí, stojí vedle sebe
PAIRS = [
    {"label": "Látka", "note": "Nejdřív obecné zákonitosti, pak popisná chemie prvků a jejich sloučenin.",
     "items": ["okruhy", "anorganika"]},
    {"label": "Výpočty", "note": "Jak výpočet zapsat — a tabulka, kterou u toho máte po ruce.",
     "items": ["pocitani", "tabulka"], "flow": False},
    {"label": "Procvičení", "note": "Vyzkoušejte se nanečisto na čas, nebo si projděte početní úlohy.",
     "items": ["testy", "nazvoslovi", "prikladu"], "flow": False},
]

# pořadí přesně podle osnovy učitele
TOPICS = [
    {
        "slug": "atomove-jadro",
        "n": "01",
        "title": "Atomové jádro, přeměny jader a radioaktivita",
        "sub": "Z čeho se skládá jádro, proč se některá jádra rozpadají a jak rychle.",
        "chips": ["protonové a nukleonové číslo", "izotopy, izobary, izotony",
                  "řeka stability", "přeměny α, β, γ", "ionizující záření", "rozpadový zákon"],
    },
    {
        "slug": "elektronovy-obal",
        "n": "02",
        "title": "Elektronový obal a periodická tabulka",
        "sub": "Od pudinkového modelu ke kvantové mechanice a k tomu, proč tabulka vypadá, jak vypadá.",
        "chips": ["modely atomu", "orbital", "kvantová čísla", "spin",
                  "elektronová konfigurace", "ionizační energie", "elektronegativita"],
    },
    {
        "slug": "chemicka-vazba",
        "n": "03",
        "title": "Chemická vazba",
        "sub": "Kovová, iontová, kovalentní a slabé interakce — a co z nich plyne pro vlastnosti látek.",
        "chips": ["kovová vazba", "iontová vazba", "kovalentní vazba", "σ a π",
                  "polarita", "koordinační vazba", "vodíkové můstky"],
    },
    {
        "slug": "struktura-latek",
        "n": "04",
        "title": "Chemická struktura a vlastnosti látek",
        "sub": "Jak uspořádání částic rozhoduje o tom, co látka dělá.",
        "chips": ["pevné látky, kapaliny, plyny", "krystalová mřížka", "amorfní stav",
                  "teorie VSEPR", "hybridizace", "rozpustnost a mísitelnost"],
    },
    {
        "slug": "termochemie",
        "n": "05",
        "title": "Termochemie a úvod do termodynamiky",
        "sub": "Proč některé reakce hřejí, jiné studí — a proč některé samy od sebe neproběhnou.",
        "chips": ["1. termodynamický zákon", "enthalpie", "Hessův zákon",
                  "exo a endo", "entropie", "Gibbsova energie"],
    },
    {
        "slug": "chemicka-kinetika",
        "n": "06",
        "title": "Chemická kinetika",
        "sub": "Termodynamika řekla jestli, kinetika odpoví jak rychle.",
        "chips": ["rychlost reakce", "rychlostní rovnice", "řád a molekularita",
                  "srážková teorie", "aktivovaný komplex", "katalýza"],
    },
    {
        "slug": "chemicka-rovnovaha",
        "n": "07",
        "title": "Chemická rovnováha",
        "sub": "Když obě reakce běží stejně rychle a navenek se nic neděje.",
        "chips": ["dynamická rovnováha", "rovnovážná konstanta", "Guldberg–Waage",
                  "stupeň konverze", "vliv teploty a tlaku", "Le Chatelier"],
    },
    {
        "slug": "elektrochemie",
        "n": "08",
        "title": "Rovnovážná elektrochemie",
        "sub": "Redoxní reakce, články a elektrolýza — chemie, která tlačí elektrony.",
        "chips": ["oxidace a redukce", "redukční potenciál", "Beketovova řada",
                  "Nernstova rovnice", "katoda a anoda", "elektrolýza", "koroze"],
    },
    {
        "slug": "acidobazicke-reakce",
        "n": "09",
        "title": "Acidobazické reakce",
        "sub": "Tři teorie kyselin a zásad a jak podle nich předpovědět, co se stane.",
        "chips": ["Arrhenius, Brønsted, Lewis", "konjugovaný pár", "síla kyselin",
                  "konstanta acidity", "předpovídání reakcí", "hydrolýza solí"],
    },
    {
        "slug": "vypocty-rovnovah",
        "n": "10",
        "title": "Výpočty související s chemickou rovnováhou",
        "sub": "Počítání pH, srážení a komplexů — nejvíc bodů na přijímačkách.",
        "chips": ["pH silných kyselin a bází", "slabé kyseliny a báze", "soli",
                  "pufry", "srážecí rovnováhy", "komplexotvorné rovnováhy"],
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
        "sub": "Nejjednodušší prvek, který se nevejde do žádné skupiny — a nejdůležitější sloučenina, kterou tvoří.",
        "chips": ["postavení vodíku", "izotopy", "hydridy", "výroba a použití",
                  "struktura vody", "vodíkové můstky", "tvrdost vody", "peroxid vodíku"],
    },
    {
        "slug": "halogeny-a-vzacne-plyny", "n": "02",
        "title": "Halogeny a vzácné plyny",
        "sub": "Skupina 17 a 18: nejreaktivnější nekovy vedle prvků, které dlouho platily za netečné.",
        "chips": ["trendy ve skupině 17", "halogenovodíky", "kyslíkaté kyseliny halogenů",
                  "výroba chloru", "fluor a jeho zvláštnosti", "sloučeniny xenonu", "využití"],
    },
    {
        "slug": "kyslik-a-chalkogeny", "n": "03",
        "title": "Kyslík a chalkogeny",
        "sub": "Skupina 16: kyslík a ozon, síra a její oxokyseliny, přechod od nekovu ke kovu.",
        "chips": ["modifikace kyslíku", "oxidy a jejich dělení", "ozon",
                  "modifikace síry", "sulfan a sulfidy", "kyselina sírová", "selen a tellur"],
    },
    {
        "slug": "dusik-a-fosfor", "n": "04",
        "title": "Dusík a fosfor",
        "sub": "Skupina 15: od netečného N₂ k výbušninám a hnojivům, a proč se fosfor chová jinak.",
        "chips": ["trojná vazba v N₂", "amoniak a Haberův proces", "oxidy dusíku",
                  "kyselina dusičná", "modifikace fosforu", "kyseliny fosforu", "hnojiva"],
    },
    {
        "slug": "uhlik-kremik-bor", "n": "05",
        "title": "Uhlík, křemík a bor",
        "sub": "Prvky, které staví kostry: řetězce uhlíku, sítě křemíku a elektronový deficit boru.",
        "chips": ["modifikace uhlíku", "oxidy uhlíku", "uhličitany", "silikáty",
                  "sklo a keramika", "borany a elektronový deficit", "diagonální podobnost"],
    },
    {
        "slug": "elementarni-kovy", "n": "06",
        "title": "Elementární kovy",
        "sub": "Co dělá kov kovem: vazba, mřížka, slitiny a jak se kovy dostávají z rudy.",
        "chips": ["kovová vazba a pásová teorie", "typy mřížek", "slitiny",
                  "metalurgie", "redukce rud", "elektrolytická výroba", "koroze"],
    },
    {
        "slug": "neprechodne-kovy", "n": "07",
        "title": "Nepřechodné kovy",
        "sub": "Kovy bloků s a p: alkalické kovy, kovy alkalických zemin, hliník a efekt inertního páru.",
        "chips": ["alkalické kovy", "kovy alkalických zemin", "hliník a amfoterita",
                  "cín a olovo", "efekt inertního páru", "Solvayův proces", "biogenní prvky"],
    },
    {
        "slug": "koordinacni-slouceniny", "n": "08",
        "title": "Koordinační sloučeniny",
        "sub": "Komplexy: centrální atom, ligandy a teorie, které vysvětlí jejich barvu i magnetismus.",
        "chips": ["centrální atom a ligandy", "koordinační číslo", "názvosloví komplexů",
                  "izomerie", "teorie krystalového pole", "barevnost", "chelatace"],
    },
    {
        "slug": "prechodne-kovy", "n": "09",
        "title": "Přechodné kovy",
        "sub": "Blok d: proměnlivá oxidační čísla, barevné sloučeniny a kovy, na kterých stojí průmysl.",
        "chips": ["konfigurace d", "oxidační čísla", "triáda železa", "chrom a mangan",
                  "měď, stříbro, zlato", "zinková skupina", "katalýza", "výroba oceli"],
    },
]

ANORG_PREFIXES = ["vodik", "halogeny", "chalkogeny", "dusik", "uhlik",
                  "kovy", "nekovy", "komplexy", "prechodne"]
