# -*- coding: utf-8 -*-
"""nazvo_data.py — ručně ověřená datová tabulka českého anorganického názvosloví.

Nic se tu nedopočítává z přípon. Ke každému prvku a každému jeho oxidačnímu číslu
je přídavné jméno napsané ručně, protože české kmeny jsou nepravidelné
(síra → siřičitý/sírový, měď → měďný/měďnatý, uhlík → uhelnatý/uhličitý,
nikl → nikelnatý, kadmium → kademnatý, olovo → olovnatý/olovičitý …).

Přípony podle oxidačního čísla (jen pro výklad, NE pro generování názvů):
    I -ný · II -natý · III -itý · IV -ičitý · V -ičný/-ečný
    VI -ový · VII -istý · VIII -ičelý

Vlajky u každého oxidačního stavu:
    b … smí se použít v binárních sloučeninách (oxid, halogenid, sulfid)
    k … smí vystupovat jako kation v hydroxidech, solích a hydrátech
    p … smí tvořit peroxid
Prázdný řetězec = stav se v generátoru nepoužije, je jen v referenční tabulce.
"""

# ============================================================ prvky
# sym, český název, kov?, {ox: (přídavné jméno v mužském rodě, vlajky)}
ELEMENTS = [
    ("H",  "vodík",      False, {}),
    ("Li", "lithium",    True,  {1: ("lithný", "bkp")}),
    ("Na", "sodík",      True,  {1: ("sodný", "bkp")}),
    ("K",  "draslík",    True,  {1: ("draselný", "bkp")}),
    ("Rb", "rubidium",   True,  {1: ("rubidný", "bk")}),
    ("Cs", "cesium",     True,  {1: ("cesný", "bk")}),
    ("Be", "beryllium",  True,  {2: ("beryllnatý", "bk")}),
    ("Mg", "hořčík",     True,  {2: ("hořečnatý", "bkp")}),
    ("Ca", "vápník",     True,  {2: ("vápenatý", "bkp")}),
    ("Sr", "stroncium",  True,  {2: ("strontnatý", "bkp")}),
    ("Ba", "baryum",     True,  {2: ("barnatý", "bkp")}),
    ("B",  "bor",        False, {3: ("boritý", "b")}),
    ("Al", "hliník",     True,  {3: ("hlinitý", "bk")}),
    ("Ga", "gallium",    True,  {3: ("gallitý", "bk")}),
    ("In", "indium",     True,  {1: ("indný", "b"), 3: ("inditý", "bk")}),
    ("Tl", "thallium",   True,  {1: ("thallný", "bk"), 3: ("thallitý", "bk")}),
    ("C",  "uhlík",      False, {2: ("uhelnatý", "b"), 4: ("uhličitý", "b")}),
    ("Si", "křemík",     False, {4: ("křemičitý", "b")}),
    ("Ge", "germanium",  True,  {2: ("germanatý", "bk"), 4: ("germaničitý", "bk")}),
    ("Sn", "cín",        True,  {2: ("cínatý", "bk"), 4: ("cíničitý", "bk")}),
    ("Pb", "olovo",      True,  {2: ("olovnatý", "bk"), 4: ("olovičitý", "bk")}),
    ("N",  "dusík",      False, {1: ("dusný", "b"), 2: ("dusnatý", "b"),
                                 3: ("dusitý", "b"), 4: ("dusičitý", "b"),
                                 5: ("dusičný", "b")}),
    ("P",  "fosfor",     False, {3: ("fosforitý", "b"), 5: ("fosforečný", "b")}),
    ("As", "arsen",      False, {3: ("arsenitý", "b"), 5: ("arseničný", "b")}),
    ("Sb", "antimon",    True,  {3: ("antimonitý", "b"), 5: ("antimoničný", "b")}),
    ("Bi", "bismut",     True,  {3: ("bismutitý", "bk"), 5: ("bismutičný", "b")}),
    ("O",  "kyslík",     False, {}),
    # S(I) vynechán: „chlorid sirný“ je S₂Cl₂, křížové pravidlo by dalo SCl.
    ("S",  "síra",       False, {2: ("sirnatý", "b"), 4: ("siřičitý", "b"),
                                 6: ("sírový", "b")}),
    ("Se", "selen",      False, {4: ("seleničitý", "b"), 6: ("selenový", "b")}),
    ("Te", "tellur",     False, {4: ("telluričitý", "b"), 6: ("tellurový", "b")}),
    ("F",  "fluor",      False, {}),
    ("Cl", "chlor",      False, {1: ("chlorný", "b"), 3: ("chloritý", "b"),
                                 4: ("chloričitý", "b"), 5: ("chlorečný", "b"),
                                 7: ("chloristý", "b")}),
    ("Br", "brom",       False, {1: ("bromný", "b"), 3: ("bromitý", "b"),
                                 5: ("bromičný", "b"), 7: ("bromistý", "b")}),
    ("I",  "jod",        False, {1: ("jodný", "b"), 3: ("joditý", "b"),
                                 5: ("jodičný", "b"), 7: ("jodistý", "b")}),
    ("Sc", "skandium",   True,  {3: ("skanditý", "bk")}),
    ("Ti", "titan",      True,  {3: ("titanitý", "b"), 4: ("titaničitý", "bk")}),
    ("V",  "vanad",      True,  {2: ("vanadnatý", "b"), 3: ("vanaditý", "b"),
                                 4: ("vanadičitý", "b"), 5: ("vanadičný", "b")}),
    ("Cr", "chrom",      True,  {2: ("chromnatý", "bk"), 3: ("chromitý", "bk"),
                                 6: ("chromový", "b")}),
    ("Mn", "mangan",     True,  {2: ("manganatý", "bk"), 3: ("manganitý", "bk"),
                                 4: ("manganičitý", "b"), 6: ("manganový", ""),
                                 7: ("manganistý", "b")}),
    ("Fe", "železo",     True,  {2: ("železnatý", "bk"), 3: ("železitý", "bk"),
                                 6: ("železový", "")}),
    ("Co", "kobalt",     True,  {2: ("kobaltnatý", "bk"), 3: ("kobaltitý", "bk")}),
    ("Ni", "nikl",       True,  {2: ("nikelnatý", "bk"), 3: ("nikelitý", "b")}),
    ("Cu", "měď",        True,  {1: ("měďný", "bk"), 2: ("měďnatý", "bk")}),
    ("Zn", "zinek",      True,  {2: ("zinečnatý", "bk")}),
    ("Ag", "stříbro",    True,  {1: ("stříbrný", "bk")}),
    ("Cd", "kadmium",    True,  {2: ("kademnatý", "bk")}),
    ("Au", "zlato",      True,  {1: ("zlatný", "b"), 3: ("zlatitý", "bk")}),
    # Hg(I) záměrně bez vlajek: „chlorid rtuťný“ je ve skutečnosti Hg₂Cl₂,
    # křížové pravidlo by dalo HgCl. V referenční tabulce zůstává s poznámkou.
    ("Hg", "rtuť",       True,  {1: ("rtuťný", ""), 2: ("rtuťnatý", "bk")}),
    ("Pt", "platina",    True,  {2: ("platnatý", "bk"), 4: ("platičitý", "bk")}),
    ("Zr", "zirkonium",  True,  {4: ("zirkoničitý", "bk")}),
    ("Nb", "niob",       True,  {5: ("niobičný", "b")}),
    ("Ta", "tantal",     True,  {5: ("tantaličný", "b")}),
    ("Mo", "molybden",   True,  {4: ("molybdeničitý", "b"), 6: ("molybdenový", "b")}),
    ("W",  "wolfram",    True,  {4: ("wolframičitý", "b"), 6: ("wolframový", "b")}),
    ("Re", "rhenium",    True,  {7: ("rhenistý", "b")}),
    ("Os", "osmium",     True,  {4: ("osmičitý", "b"), 8: ("osmičelý", "b")}),
    ("Ru", "ruthenium",  True,  {8: ("rutheničelý", "b")}),
    ("Ce", "cer",        True,  {3: ("ceritý", "bk"), 4: ("ceričitý", "bk")}),
    ("La", "lanthan",    True,  {3: ("lanthanitý", "bk")}),
    ("Th", "thorium",    True,  {4: ("thoričitý", "bk")}),
    ("U",  "uran",       True,  {4: ("uraničitý", "bk"), 6: ("uranový", "b")}),
]

# Pravopisné dvojtvary, které se v učebnicích i na tomto webu střídají.
# Trenažér uzná obojí, ukazuje ale první variantu.
ADJ_ALT = {
    "beryllnatý": ["berylnatý"],
    "cesný": ["caesný"],
    "jodičný": ["jódičný"],
    "jodistý": ["jódistý"],
    "jodný": ["jódný"],
    "joditý": ["jóditý"],
}

# Vzorec, který se pro tutéž látku běžně píše i jinak.
FORMULA_ALT = {
    "oxid fosforečný": ["P4O10"],
    "oxid fosforitý": ["P4O6"],
    "oxid dusičitý": ["N2O4"],
    "kyselina křemičitá": ["H2SiO3"],
}

# Volná kyselina, jejíž vzorec se nedá odvodit prostým doplněním vodíků.
# H₄SiO₄ (kyselina tetrahydrogenkřemičitá) je tvar, který používají i ostatní
# okruhy na tomto webu; H₂SiO₃ je z ní odvozený metatvar a uznává se také.
ACID_FORMULA = {"křemičitan": "H4SiO4"}

# ============================================================ kationty navíc
# vzorec, náboj, přídavné jméno, popis
EXTRA_CATIONS = [
    ("NH4", 1, "amonný", "amonný kation NH₄⁺ — chová se jako kation alkalického kovu"),
]

# ============================================================ jednoduché anionty
# název (1. pád, mužský rod), vzorec, náboj, prvek, ox. číslo prvku, poznámka
SIMPLE_ANIONS = [
    ("fluorid",  "F",   1, "F", -1, ""),
    ("chlorid",  "Cl",  1, "Cl", -1, ""),
    ("bromid",   "Br",  1, "Br", -1, ""),
    ("jodid",    "I",   1, "I", -1, ""),
    ("oxid",     "O",   2, "O", -2, ""),
    ("sulfid",   "S",   2, "S", -2, ""),
    ("selenid",  "Se",  2, "Se", -2, ""),
    ("tellurid", "Te",  2, "Te", -2, ""),
    ("nitrid",   "N",   3, "N", -3, ""),
    ("fosfid",   "P",   3, "P", -3, ""),
    ("hydrid",   "H",   1, "H", -1, ""),
    ("karbid",   "C",   4, "C", -4, ""),
    ("kyanid",   "CN",  1, "C", 2, "skupinový aniont CN⁻"),
    ("azid",     "N3",  1, "N", 0, "skupinový aniont N₃⁻"),
]

# anionty, které mají vlastní třídu sloučenin
PEROXID = ("peroxid", "O2", 2)
HYDROXID = ("hydroxid", "OH", 1)

# ============================================================ kyslíkaté anionty
# název, vzorec aniontu (bez náboje), náboj, centrální prvek, jeho ox. číslo,
# max. počet vodíků v hydrogensoli (0 = hydrogensůl se netvoří), triviální název
OXO_ANIONS = [
    ("chlornan",     "ClO",   1, "Cl", 1, 0, ""),
    ("chloritan",    "ClO2",  1, "Cl", 3, 0, ""),
    ("chlorečnan",   "ClO3",  1, "Cl", 5, 0, ""),
    ("chloristan",   "ClO4",  1, "Cl", 7, 0, ""),
    ("bromnan",      "BrO",   1, "Br", 1, 0, ""),
    ("bromičnan",    "BrO3",  1, "Br", 5, 0, ""),
    ("bromistan",    "BrO4",  1, "Br", 7, 0, ""),
    ("jodnan",       "IO",    1, "I", 1, 0, ""),
    ("jodičnan",     "IO3",   1, "I", 5, 0, ""),
    ("jodistan",     "IO4",   1, "I", 7, 0, ""),
    ("dusitan",      "NO2",   1, "N", 3, 0, ""),
    ("dusičnan",     "NO3",   1, "N", 5, 0, ""),
    ("uhličitan",    "CO3",   2, "C", 4, 1, ""),
    ("křemičitan",   "SiO3",  2, "Si", 4, 0, ""),
    ("boritan",      "BO3",   3, "B", 3, 0, ""),
    ("siřičitan",    "SO3",   2, "S", 4, 1, ""),
    ("síran",        "SO4",   2, "S", 6, 1, ""),
    ("thiosíran",    "S2O3",  2, "S", None, 0, "thiosíran — jeden kyslík nahradila síra"),
    ("seleničitan",  "SeO3",  2, "Se", 4, 0, ""),
    ("selenan",      "SeO4",  2, "Se", 6, 0, ""),
    ("fosforitan",   "PO3",   3, "P", 3, 0, ""),
    ("fosforečnan",  "PO4",   3, "P", 5, 2, ""),
    ("arsenitan",    "AsO3",  3, "As", 3, 0, ""),
    ("arseničnan",   "AsO4",  3, "As", 5, 2, ""),
    ("chroman",      "CrO4",  2, "Cr", 6, 0, ""),
    ("dichroman",    "Cr2O7", 2, "Cr", 6, 0, ""),
    ("manganan",     "MnO4",  2, "Mn", 6, 0, ""),
    ("manganistan",  "MnO4",  1, "Mn", 7, 0, ""),
    ("molybdenan",   "MoO4",  2, "Mo", 6, 0, ""),
    ("wolframan",    "WO4",   2, "W", 6, 0, ""),
    ("vanadičnan",   "VO3",   1, "V", 5, 0, ""),
    ("železan",      "FeO4",  2, "Fe", 6, 0, ""),
    ("rhenistan",    "ReO4",  1, "Re", 7, 0, ""),
    ("hlinitan",     "AlO2",  1, "Al", 3, 0, ""),
    ("zinečnatan",   "ZnO2",  2, "Zn", 2, 0, ""),
]

# Anionty, které student potká ve škole běžně. Ty ostatní se v generátoru
# kombinují jen s alkalickými kovy, kovy alkalických zemin a amonným kationtem,
# aby nevznikaly sloučeniny, které nikdo nikdy neviděl.
COMMON_ANIONS = {
    "chlornan", "chlorečnan", "chloristan", "dusitan", "dusičnan", "uhličitan",
    "siřičitan", "síran", "fosforečnan", "chroman", "dichroman", "manganistan",
    "křemičitan", "jodičnan", "bromičnan",
}

# Název volné kyseliny se odvodí z přídavného jména centrálního prvku
# (síran → S má VI → sírový → „kyselina sírová“). Tady jsou jen výjimky:
#   "-" … volná kyselina se neuvádí, existuje prakticky jen jako sůl
ACID_NAME = {
    "dichroman": "kyselina dichromová",
    "thiosíran": "kyselina thiosírová",
    "železan": "-",
    "hlinitan": "-",
    "zinečnatan": "-",
    "bromnan": "kyselina bromná",
    "jodnan": "kyselina jodná",
}

# ============================================================ bezkyslíkaté kyseliny
# vzorec, název kyseliny, název aniontu, poznámka
BINARY_ACIDS = [
    ("HF",  "kyselina fluorovodíková", "fluorid", "leptá sklo"),
    ("HCl", "kyselina chlorovodíková", "chlorid", "vodný roztok chlorovodíku"),
    ("HBr", "kyselina bromovodíková", "bromid", ""),
    ("HI",  "kyselina jodovodíková", "jodid", ""),
    ("H2S", "kyselina sirovodíková", "sulfid", "vodný roztok sulfanu H₂S"),
    ("HCN", "kyselina kyanovodíková", "kyanid", "vodný roztok kyanovodíku"),
    ("H2Se", "kyselina selenovodíková", "selenid", ""),
    ("HN3", "kyselina azidovodíková", "azid", ""),
]

# ============================================================ binární sloučeniny nekovů
# Nekovy a polokovy netvoří kationty — jejich halogenidy a sulfidy se pojmenují
# podle formálního kladného oxidačního čísla. Kombinace jsou vypsané ručně,
# aby vznikaly jen látky, které opravdu existují.
BINARY_NONMETAL = [
    ("B",  3, "F Cl Br I S N"),
    ("C",  4, "F Cl Br I S"),
    ("Si", 4, "F Cl Br I S N"),
    ("N",  3, "F Cl Br I"),
    ("P",  3, "F Cl Br I S"),
    ("P",  5, "F Cl Br I S"),
    ("As", 3, "F Cl Br I S"),
    ("As", 5, "F S"),
    ("Sb", 3, "F Cl Br I S"),
    ("Sb", 5, "F Cl"),
    ("Bi", 3, "F Cl Br I S"),
    ("S",  2, "F Cl Br"),
    ("S",  4, "F Cl"),
    ("S",  6, "F"),
    ("Se", 4, "F Cl Br"),
    ("Se", 6, "F"),
    ("Te", 4, "F Cl Br I"),
    ("Te", 6, "F"),
    ("Cl", 1, "F"),
    ("Cl", 3, "F"),
    ("Cl", 5, "F"),
    ("Br", 1, "F"),
    ("Br", 3, "F"),
    ("Br", 5, "F"),
    ("I",  1, "F Cl Br"),
    ("I",  3, "F Cl"),
    ("I",  5, "F"),
    ("I",  7, "F"),
]

# ============================================================ hydráty (skutečné látky)
# bezvodý vzorec, počet molekul vody, název bezvodé soli (1. pád), triviální název
HYDRATES = [
    ("CuSO4", 5, "síran měďnatý", "modrá skalice"),
    ("FeSO4", 7, "síran železnatý", "zelená skalice"),
    ("ZnSO4", 7, "síran zinečnatý", "bílá skalice"),
    ("MgSO4", 7, "síran hořečnatý", "hořká sůl"),
    ("Na2CO3", 10, "uhličitan sodný", "krystalová soda"),
    ("Na2SO4", 10, "síran sodný", "Glauberova sůl"),
    ("CaSO4", 2, "síran vápenatý", "sádrovec"),
    ("CoCl2", 6, "chlorid kobaltnatý", "indikátor vlhkosti"),
    ("CaCl2", 6, "chlorid vápenatý", ""),
    ("BaCl2", 2, "chlorid barnatý", ""),
    ("Na2S2O3", 5, "thiosíran sodný", "ustalovač"),
    ("NiSO4", 7, "síran nikelnatý", ""),
    ("MnSO4", 4, "síran manganatý", ""),
    ("AlCl3", 6, "chlorid hlinitý", ""),
]

# ============================================================ koordinační sloučeniny
# ligand: vzorec, název v komplexu, náboj ligandu
LIGANDS = [
    ("H2O", "aqua", 0),
    ("NH3", "ammin", 0),
    ("OH", "hydroxo", -1),
    ("CN", "kyano", -1),
    ("Cl", "chloro", -1),
    ("F", "fluoro", -1),
    ("Br", "bromo", -1),
    ("I", "jodo", -1),
    ("NO2", "nitro", -1),
    ("SCN", "thiokyanato", -1),
]

# hotové koordinační sloučeniny — vzorec, název, centrální atom, jeho ox. číslo,
# ligand, počet ligandů, protiiont, poznámka do vysvětlení
COMPLEXES = [
    ("K4[Fe(CN)6]", "hexakyanoželeznatan draselný", "Fe", 2,
     "žlutá krevní sůl"),
    ("K3[Fe(CN)6]", "hexakyanoželezitan draselný", "Fe", 3,
     "červená krevní sůl"),
    ("K[Ag(CN)2]", "dikyanostříbrnan draselný", "Ag", 1, ""),
    ("Na[Al(OH)4]", "tetrahydroxohlinitan sodný", "Al", 3,
     "vzniká rozpouštěním hliníku v hydroxidu sodném"),
    ("Na3[AlF6]", "hexafluorohlinitan sodný", "Al", 3, "kryolit"),
    ("K2[PtCl6]", "hexachloroplatičitan draselný", "Pt", 4, ""),
    ("K2[HgI4]", "tetrajodortuťnatan draselný", "Hg", 2, ""),
    ("Na2[Zn(OH)4]", "tetrahydroxozinečnatan sodný", "Zn", 2, ""),
    ("K3[Cr(OH)6]", "hexahydroxochromitan draselný", "Cr", 3, ""),
    ("[Cu(NH3)4]SO4", "síran tetraamminměďnatý", "Cu", 2,
     "sytě modrý roztok, důkaz měďnatých iontů"),
    ("[Ag(NH3)2]Cl", "chlorid diamminstříbrný", "Ag", 1,
     "Tollensovo činidlo"),
    ("[Cr(H2O)6]Cl3", "chlorid hexaaquachromitý", "Cr", 3, ""),
    ("[Co(NH3)6]Cl3", "chlorid hexaamminkobaltitý", "Co", 3, ""),
    ("[Fe(H2O)6]SO4", "síran hexaaquaželeznatý", "Fe", 2, ""),
    ("[Ni(NH3)6]Cl2", "chlorid hexaamminnikelnatý", "Ni", 2, ""),
    ("[Zn(NH3)4](NO3)2", "dusičnan tetraamminzinečnatý", "Zn", 2, ""),
    ("K[Al(OH)4]", "tetrahydroxohlinitan draselný", "Al", 3, ""),
    ("Na2[Sn(OH)6]", "hexahydroxocíničitan sodný", "Sn", 4, ""),
]

# ============================================================ přípony
SUFFIXES = [
    (1, "-ný",     "oxid sodný Na₂O", "sodný, měďný, chlorný, dusný"),
    (2, "-natý",   "oxid vápenatý CaO", "vápenatý, železnatý, měďnatý, olovnatý"),
    (3, "-itý",    "oxid hlinitý Al₂O₃", "hlinitý, železitý, dusitý, chromitý"),
    (4, "-ičitý",  "oxid uhličitý CO₂", "uhličitý, křemičitý, siřičitý, manganičitý"),
    (5, "-ičný / -ečný", "kyselina dusičná HNO₃ × kyselina fosforečná H₃PO₄",
     "dusičný, vanadičný — ale fosforečný, chlorečný"),
    (6, "-ový",    "oxid sírový SO₃", "sírový, chromový, manganový, molybdenový"),
    (7, "-istý",   "kyselina chloristá HClO₄", "chloristý, manganistý, jodistý"),
    (8, "-ičelý",  "oxid osmičelý OsO₄", "osmičelý, rutheničelý"),
]

# dvojice, které se pletou nejčastěji — do rámečku „Zapamatujte si“
TRAPS = [
    ("síra", "siřičitý (IV)", "sírový (VI)"),
    ("železo", "železnatý (II)", "železitý (III)"),
    ("měď", "měďný (I)", "měďnatý (II)"),
    ("uhlík", "uhelnatý (II)", "uhličitý (IV)"),
    ("cín", "cínatý (II)", "cíničitý (IV)"),
    ("olovo", "olovnatý (II)", "olovičitý (IV)"),
    ("rtuť", "rtuťný (I)", "rtuťnatý (II)"),
    ("dusík", "dusitý (III)", "dusičný (V)"),
]


def export():
    """Data pro prohlížeč i pro kontrolní skript."""
    els = []
    for sym, cz, metal, ox in ELEMENTS:
        els.append({"sym": sym, "cz": cz, "metal": 1 if metal else 0,
                    "ox": dict((str(k), {"adj": v[0], "f": v[1]}) for k, v in ox.items())})
    return {
        "el": els,
        "xcat": [{"f": f, "q": q, "adj": a, "note": n} for f, q, a, n in EXTRA_CATIONS],
        "simple": [{"n": n, "f": f, "q": q, "el": e, "ox": o, "note": t}
                   for n, f, q, e, o, t in SIMPLE_ANIONS],
        "oxo": [{"n": n, "f": f, "q": q, "el": e, "ox": o, "h": h, "note": t,
                 "acid": ACID_NAME.get(n, ""), "com": 1 if n in COMMON_ANIONS else 0}
                for n, f, q, e, o, h, t in OXO_ANIONS],
        "bin": [{"f": f, "n": n, "an": a, "note": t} for f, n, a, t in BINARY_ACIDS],
        "nmb": [{"el": e, "ox": o, "an": a.split(" ")} for e, o, a in BINARY_NONMETAL],
        "hyd": [{"f": f, "n": n, "salt": s, "triv": t} for f, n, s, t in HYDRATES],
        "cx": [{"f": f, "n": n, "el": e, "ox": o, "note": t}
               for f, n, e, o, t in COMPLEXES],
        "lig": [{"f": f, "n": n, "q": q} for f, n, q in LIGANDS],
        "suf": [{"ox": o, "s": s, "ex": e, "more": m} for o, s, e, m in SUFFIXES],
        "adjalt": ADJ_ALT, "falt": FORMULA_ALT, "acidf": ACID_FORMULA,
        "traps": [{"el": e, "a": a, "b": b} for e, a, b in TRAPS],
        "perox": {"n": PEROXID[0], "f": PEROXID[1], "q": PEROXID[2]},
        "hydrox": {"n": HYDROXID[0], "f": HYDROXID[1], "q": HYDROXID[2]},
    }


def check():
    """Vnitřní kontrola tabulky. Vrací seznam nálezů."""
    bad = []
    seen = set()
    ends = ("ný", "natý", "itý", "ičitý", "ičný", "ečný", "ový", "istý", "ičelý",
            "atý", "elý")
    for sym, cz, metal, ox in ELEMENTS:
        if sym in seen:
            bad.append("duplicitní značka %s" % sym)
        seen.add(sym)
        for o, (adj, fl) in ox.items():
            if not (1 <= o <= 8):
                bad.append("%s: oxidační číslo %s mimo I–VIII" % (sym, o))
            if not adj.endswith("ý"):
                bad.append("%s %s: přídavné jméno %r nekončí na -ý" % (sym, o, adj))
            if not any(adj.endswith(e) for e in ends):
                bad.append("%s %s: neobvyklá přípona %r" % (sym, o, adj))
            for c in fl:
                if c not in "bkp":
                    bad.append("%s %s: neznámá vlajka %r" % (sym, o, c))
            if "k" in fl and not metal and sym != "NH4":
                bad.append("%s %s: nekov označený jako kation" % (sym, o))
    syms = set(s for s, _, _, _ in ELEMENTS)
    for n, f, q, e, o, h, t in OXO_ANIONS:
        if e not in syms:
            bad.append("aniont %s: neznámý prvek %s" % (n, e))
        if q < 1 or q > 3:
            bad.append("aniont %s: podivný náboj %d" % (n, q))
        if h > q - 1 and h > 0:
            bad.append("aniont %s: %d vodíků při náboji %d" % (n, h, q))
    an = set(n for n, *_ in OXO_ANIONS) | set(n for n, *_ in SIMPLE_ANIONS)
    for f, n, a, t in BINARY_ACIDS:
        if a not in an:
            bad.append("kyselina %s: aniont %s není v tabulce" % (f, a))
    for f, w, s, t in HYDRATES:
        if w < 1 or w > 12:
            bad.append("hydrát %s: %d molekul vody" % (f, w))
    return bad


if __name__ == "__main__":
    import sys, json
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    b = check()
    for x in b:
        print("!!", x)
    n_ox = sum(len(o) for _, _, _, o in ELEMENTS)
    print("prvků: %d, oxidačních stavů s názvem: %d" % (len(ELEMENTS), n_ox))
    print("aniontů: %d kyslíkatých + %d jednoduchých" % (len(OXO_ANIONS), len(SIMPLE_ANIONS)))
    print("kyselin bezkyslíkatých: %d, hydrátů: %d, komplexů: %d"
          % (len(BINARY_ACIDS), len(HYDRATES), len(COMPLEXES)))
    print("nálezů: %d" % len(b))
