# -*- coding: utf-8 -*-
"""make_nazvoslovi.py — vygeneruje sekci „České názvosloví“ (trenažér).

Výstup: C:\\Claude Code\\Claude Code\\Doučovanie\\nazvoslovi\\index.html

Staví se stejně jako make_tabulka.py a make_spolu.py: bere z make_site.py
TOKENS, CHROME, TILES, HERO, head(), topbar(), foot(), theme_script(), ARL/ARR,
takže stránka sedí se zbytkem webu. Data jsou v nazvo_data.py (ručně ověřená
tabulka prvků a aniontů), logika v nazvo_engine.js (sdílí ji prohlížeč
i kontrolní skripty pod Node.js).
"""
import io, os, sys, json, subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

import make_site as MS
from site_data import SITE
import nazvo_data as ND
from nazvo_css import CSS
from nazvo_ui import UI

OUT = os.path.join(MS.OUT, "nazvoslovi")

SUB = "₀₁₂₃₄₅₆₇₈₉"
SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹"
ROM = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"]


def rom(n):
    return ("−" if n < 0 else "") + ROM[abs(n)]


def sub(s):
    return "".join(SUB[int(c)] if c.isdigit() else c for c in str(s))


def sup(s):
    return "".join(SUP[int(c)] if c.isdigit() else c for c in str(s))


def pretty(f):
    parts = str(f).split("·")
    out = sub(parts[0])
    for p in parts[1:]:
        i = 0
        while i < len(p) and p[i].isdigit():
            i += 1
        out += "·" + p[:i] + sub(p[i:])
    return out


def anion_ion(f, q):
    return pretty(f) + (sup(q) if q > 1 else "") + "⁻"


def nb(s):
    """Nezlomitelná mezera po jednopísmenných předložkách a spojkách."""
    import re
    return re.sub(r"(?<=[\s(„])([aikosuvz]) ", r"\1&nbsp;", " " + s)[1:]


# ============================================================ hero grafika
def hero_art():
    """Dva zapadající dílky skládačky — kmen a přípona. Bez textu (kvůli
    kontrole překryvů) a jen v obrysech, protože kresba je jen dekorace."""
    def piece(x, y, w, h, r, tab):
        cy = y + h / 2.0
        if tab:                                  # levý dílek s výstupkem vpravo
            return ('M%.1f %.1f H%.1f V%.1f A%.1f %.1f 0 0 1 %.1f %.1f V%.1f H%.1f Z'
                    % (x, y, x + w, cy - r, r, r, x + w, cy + r, y + h, x))
        return ('M%.1f %.1f H%.1f V%.1f H%.1f V%.1f A%.1f %.1f 0 0 0 %.1f %.1f Z'
                % (x, y, x + w, y + h, x, cy + r, r, r, x, cy - r))
    P = []
    rows = [(4, 8, 30, 18, 4), (12, 34, 34, 18, 4), (2, 60, 26, 18, 4)]
    for x, y, w, h, r in rows:
        P.append('<path d="%s"/>' % piece(x, y, w, h, r, True))
        P.append('<path d="%s"/>' % piece(x + w, y, w + 22, h, r, False))
    # římské čárky vlevo od každé řady — naznačují oxidační číslo
    for i, (x, y, w, h, r) in enumerate(rows):
        for j in range(i + 1):
            P.append('<path d="M%.1f %.1f v8"/>' % (x - 6 - j * 3, y + h / 2 - 4))
    return ('<svg class="hero-art" width="470" height="470" viewBox="-14 -6 112 100" '
            'fill="none" stroke="currentColor" stroke-width="1.6" '
            'stroke-linejoin="round" aria-hidden="true">' + "".join(P) + "</svg>")


# ============================================================ rámečky
def board(label, lines, leg=""):
    body = "<br>".join(lines)
    h = ('<div class="board"><span class="eyebrow">Zapamatujte si</span>'
         '<div class="bq"><b>%s</b><br>%s</div>' % (label, body))
    if leg:
        h += '<div class="leg">%s</div>' % leg
    return h + "</div>"


def trap(title, text):
    return ('<div class="trap"><span class="eyebrow">Častá chyba</span>'
            '<p><b>%s</b> %s</p></div>' % (title, text))


def dots(a, b, w=22):
    """Zarovnání tečkami pro rámečky (monospace)."""
    n = max(1, w - len(a))
    return a + " " + "." * n + " " + b


# ============================================================ výklad
def explain():
    h = '<div class="wrap narrow"><section class="sec" id="jak">'
    h += ('<div class="sec-head"><h2>Jak je český název poskládaný</h2></div>'
          '<p class="intro">Než začnete trénovat, přečtěte si tenhle výklad. '
          'Je krátký a&nbsp;pokrývá všechno, co trenažér zkouší: soustavu přípon, '
          'určení oxidačního čísla, tvoření aniontů, hydrogensoli a&nbsp;hydráty.</p>')

    # --- 1. stavba názvu ---
    h += '<div class="grid2"><div class="prose">'
    h += ('<h3>Dvě slova, dvě informace</h3>'
          '<p>Skoro každý anorganický název má tvar <b>podstatné jméno + přídavné '
          'jméno</b>. Podstatné jméno říká, <b>co je záporná část</b> sloučeniny '
          '(<span class="chem">oxid</span>, <span class="chem">chlorid</span>, '
          '<span class="chem">síran</span>, <span class="chem">hydroxid</span>). '
          'Přídavné jméno říká, <b>který prvek je kladná část a&nbsp;jaké má '
          'oxidační číslo</b>.</p>'
          '<p class="eq">síran <span class="q">měďnatý</span>&nbsp;&nbsp;→&nbsp;&nbsp;'
          'aniont SO₄²⁻ (síran) + měď s&nbsp;oxidačním číslem II (měďnatý) = CuSO₄</p>'
          '<p>Oxidační číslo se do přídavného jména dostane <b>příponou</b>. '
          'Osm oxidačních čísel, osm přípon — a&nbsp;tahle soustava je jádro '
          'celého názvosloví.</p>')
    h += '</div><div class="aside">'
    h += board("PŘÍPONA PODLE OXIDAČNÍHO ČÍSLA KLADNÉ ČÁSTI", [
        dots("I", "-ný &nbsp;&nbsp;&nbsp;&nbsp;oxid sodný Na₂O", 6),
        dots("II", "-natý &nbsp;&nbsp;oxid vápenatý CaO", 6),
        dots("III", "-itý &nbsp;&nbsp;&nbsp;oxid hlinitý Al₂O₃", 6),
        dots("IV", "-ičitý oxid uhličitý CO₂", 6),
        dots("V", "-ičný kyselina dusičná HNO₃", 6),
        dots("V", "-ečný kyselina fosforečná H₃PO₄", 6),
        dots("VI", "-ový &nbsp;&nbsp;oxid sírový SO₃", 6),
        dots("VII", "-istý &nbsp;kyselina chloristá HClO₄", 6),
        dots("VIII", "-ičelý oxid osmičelý OsO₄", 6),
    ], "U&nbsp;oxidačního čísla V se přípona liší podle prvku: dusík má "
       "<i>-ičný</i>, fosfor <i>-ečný</i>. Je to vlastnost prvku, ne pravidlo.")
    h += '</div></div>'

    # --- model ---
    h += ('<div class="panel"><div class="panel-head"><span class="tag">Model</span>'
          '<h3>Skládačka: prvek + oxidační číslo = přídavné jméno</h3></div>'
          '<div class="panel-body">'
          '<div class="ctl"><label for="skEl">Prvek</label>'
          '<select id="skEl"></select>'
          '<span class="sp"></span>'
          '<label id="skOxL">Oxidační číslo</label>'
          '<span class="segmented" id="skOx" role="group" '
          'aria-labelledby="skOxL"></span></div>'
          '<div class="svgwrap" id="skWrap"></div>'
          '</div><div class="panel-note" id="skNote"></div></div>')

    # --- 2. oxidační čísla ---
    h += '<div class="grid2"><div class="prose">'
    h += ('<h3>Jak se určí oxidační číslo</h3>'
          '<p><span class="term">Oxidační číslo</span> je náboj, který by atom měl, '
          'kdyby všechny vazebné elektronové páry připadly tomu '
          'elektronegativnějšímu z&nbsp;dvojice. Píše se <b>římskou číslicí '
          'se znaménkem</b> a&nbsp;na rozdíl od skutečného náboje je to pomocná '
          'veličina — v&nbsp;CO₂ nemá uhlík opravdový náboj +4.</p>'
          '<p>Postup je vždycky stejný: doplňte prvky s&nbsp;pevným oxidačním číslem, '
          'sečtěte je a&nbsp;dopočítejte zbytek, protože součet musí dát celkový '
          'náboj částice.</p>'
          '<p class="eq">K₂Cr₂O₇: 2&nbsp;×&nbsp;(+I) + 2&nbsp;×&nbsp;<span class="q">x</span> '
          '+ 7&nbsp;×&nbsp;(−II) = 0&nbsp;&nbsp;⟹&nbsp;&nbsp;'
          '2<span class="q">x</span> = +12&nbsp;&nbsp;⟹&nbsp;&nbsp;'
          '<b>chrom má VI</b></p>')
    h += '</div><div class="aside">'
    h += board("OXIDAČNÍ ČÍSLA — hodnoty, které znáte předem", [
        dots("volný prvek (O₂, Fe)", "0", 22),
        dots("fluor", "vždy −I", 22),
        dots("kyslík", "−II (v peroxidech −I)", 22),
        dots("vodík", "+I (v hydridech kovů −I)", 22),
        dots("alkalický kov Na, K", "+I", 22),
        dots("kov 2. skupiny Ca, Mg", "+II", 22),
        dots("hliník, zinek", "+III, +II", 22),
        dots("součet v molekule", "0", 22),
        dots("součet v iontu", "= náboj iontu", 22),
    ])
    h += trap("Přípona není součet.",
              "V&nbsp;Fe₂O₃ nemá železo III proto, že jsou tam tři kyslíky, ale proto, "
              "že 3&nbsp;×&nbsp;(−II) = −VI se musí rozdělit mezi dva atomy železa. "
              "Vždycky dělte počtem atomů.")
    h += '</div></div>'

    # --- 3. anionty ---
    h += '<div class="grid2"><div class="prose">'
    h += ('<h3>Jak vzniká podstatné jméno: anionty</h3>'
          '<p><b>Bez kyslíku</b> dostane aniont koncovku <b>-id</b>: '
          '<span class="chem">Cl⁻</span> chlorid, <span class="chem">S²⁻</span> sulfid, '
          '<span class="chem">N³⁻</span> nitrid, <span class="chem">H⁻</span> hydrid. '
          'Stejný kmen má i&nbsp;odpovídající kyselina, jen se k&nbsp;němu přidá '
          '<i>-vodíková</i>: <span class="chem">HCl</span> je kyselina '
          'chlorovodíková, její sůl je chlorid.</p>'
          '<p><b>S&nbsp;kyslíkem</b> se aniont odvodí od kyseliny a&nbsp;její přípona '
          'se změní podle jednoduchého klíče. Kyselina sírová dá síran, kyselina '
          'siřičitá siřičitan, kyselina dusičná dusičnan.</p>'
          '<p class="eq">H₂SO₄ kyselina sírová&nbsp;&nbsp;−&nbsp;2&nbsp;H⁺&nbsp;&nbsp;→'
          '&nbsp;&nbsp;SO₄²⁻ síran&nbsp;&nbsp;→&nbsp;&nbsp;Na₂SO₄ síran sodný</p>'
          '<p>Náboj aniontu se rovná počtu odtržených vodíků. Ten pak v&nbsp;soli '
          'určí, kolik kationtů je potřeba — a&nbsp;to je celé „křížové pravidlo“.</p>')
    h += '</div><div class="aside">'
    h += board("PŘÍPONA KYSELINY → PŘÍPONA JEJÍHO ANIONTU", [
        dots("bez kyslíku", "-id &nbsp;&nbsp;&nbsp;&nbsp;Cl⁻ chlorid", 14),
        dots("kyselina -ná", "-nan &nbsp;&nbsp;&nbsp;ClO⁻ chlornan", 14),
        dots("kyselina -itá", "-itan &nbsp;&nbsp;NO₂⁻ dusitan", 14),
        dots("kyselina -ičitá", "-ičitan SO₃²⁻ siřičitan", 14),
        dots("kyselina -ičná", "-ičnan &nbsp;NO₃⁻ dusičnan", 14),
        dots("kyselina -ečná", "-ečnan &nbsp;PO₄³⁻ fosforečnan", 14),
        dots("kyselina -ová", "-an &nbsp;&nbsp;&nbsp;&nbsp;SO₄²⁻ síran", 14),
        dots("kyselina -istá", "-istan &nbsp;MnO₄⁻ manganistan", 14),
    ], "Přípona <i>-ový</i> ztrácí celé zakončení: sírová → sír<b>an</b>, "
       "chromová → chrom<b>an</b>.")
    h += '</div></div>'

    # --- 4. hydrogensoli a hydráty ---
    h += '<div class="grid2"><div class="prose">'
    h += ('<h3>Hydrogensoli a hydráty</h3>'
          '<p>Vícesytná kyselina nemusí přijít o&nbsp;všechny vodíky najednou. Když '
          'v&nbsp;aniontu jeden zůstane, přibude do názvu předpona '
          '<b>hydrogen-</b> a&nbsp;náboj aniontu klesne o&nbsp;jedna. Dva zbylé '
          'vodíky dají <b>dihydrogen-</b>.</p>'
          '<p class="eq">H₂SO₄&nbsp;&nbsp;→&nbsp;&nbsp;HSO₄⁻ hydrogensíran&nbsp;&nbsp;→'
          '&nbsp;&nbsp;NaHSO₄ hydrogensíran sodný</p>'
          '<p><span class="term">Hydrát</span> je krystal, ve kterém je zabudovaná '
          'voda. Ve vzorci se odděluje tečkou uprostřed řádku a&nbsp;počet molekul '
          'vody se v&nbsp;názvu řekne řeckou číslovkou. Pozor na zápis: v&nbsp;'
          '<span class="chem">CuSO₄·5H₂O</span> je pětka <b>před</b> vzorcem vody, '
          'protože násobí celou molekulu.</p>')
    h += '</div><div class="aside">'
    h += board("HYDROGENSŮL A HYDRÁT — co přibude do názvu", [
        "<b>hydrogensůl</b> — v aniontu zbyl vodík",
        dots("NaHCO₃", "hydrogenuhličitan sodný", 10),
        dots("NaH₂PO₄", "dihydrogenfosforečnan sodný", 10),
        "každý zbylý vodík sníží náboj aniontu o jedna",
        "&nbsp;",
        "<b>hydrát</b> — voda vázaná v krystalu",
        dots("CuSO₄·5H₂O", "pentahydrát síranu měďnatého", 12),
        "počet vody: di-, tri-, tetra-, penta-, hexa-, hepta-, deka-",
    ])
    h += '</div></div>'

    # --- 5. co se plete ---
    h += '<div class="grid2"><div class="prose">'
    h += ('<h3>Kmen se nedá spočítat</h3>'
          '<p>Tady je jádro problému: přípona plyne z&nbsp;oxidačního čísla, ale '
          '<b>kmen přídavného jména je vlastnost prvku</b> a&nbsp;často se od názvu '
          'prvku liší. Ze <b>síry</b> je siřičitý i&nbsp;sírový, z&nbsp;<b>uhlíku</b> '
          'uhelnatý i&nbsp;uhličitý, z&nbsp;<b>niklu</b> nikelnatý, '
          'z&nbsp;<b>kadmia</b> kademnatý. Žádné pravidlo to nespojí — proto má '
          'tenhle modul tabulku prvků, ve které je každý tvar vypsaný, '
          'a&nbsp;proto se dvojice níže vyplatí umět nazpaměť.</p>'
          '<p>Když si nejste jistí, ověřte si tvar v&nbsp;tabulce prvků kousek níž '
          'na téhle stránce a&nbsp;pak si ho zkuste v&nbsp;trenažéru vybavit '
          'z&nbsp;hlavy. Právě tenhle rozdíl — poznat versus vybavit si — '
          'rozhoduje u&nbsp;zkoušky.</p>')
    h += '</div><div class="aside">'
    h += board("STEJNÝ PRVEK, DVĚ RŮZNÁ OXIDAČNÍ ČÍSLA", [
        dots("síra", "siřičitý IV × sírový VI", 8),
        dots("železo", "železnatý II × železitý III", 8),
        dots("měď", "měďný I × měďnatý II", 8),
        dots("uhlík", "uhelnatý II × uhličitý IV", 8),
        dots("cín", "cínatý II × cíničitý IV", 8),
        dots("olovo", "olovnatý II × olovičitý IV", 8),
        dots("rtuť", "rtuťný I × rtuťnatý II", 8),
        dots("dusík", "dusitý III × dusičný V", 8),
    ])
    h += '</div></div>'
    h += "</section></div>\n"
    return h


# ============================================================ referenční tabulky
def suffix_table():
    h = ('<div class="wrap narrow"><section class="sec" id="pripony">'
         '<div class="sec-head"><h2>Tabulka přípon</h2></div>'
         '<p class="intro">Osm oxidačních čísel, osm přípon. Přípona se v&nbsp;'
         'ženském rodě (u&nbsp;kyselin) mění na -á: sírový → sírová.</p>')
    h += ('<div class="tablewrap"><table><thead><tr>'
          '<th class="n">Ox. číslo</th><th>Přípona</th><th>Příklad</th>'
          '<th>Další přídavná jména</th></tr></thead><tbody>')
    for ox, s, ex, more in ND.SUFFIXES:
        h += ('<tr><td class="n">%s</td><td class="c hl">%s</td><td>%s</td>'
              '<td>%s</td></tr>' % (rom(ox), s, ex, more))
    h += "</tbody></table></div></section></div>\n"
    return h


def element_table():
    rows = []
    for sym, cz, metal, ox in ND.ELEMENTS:
        if not ox:
            continue
        items = []
        for o in sorted(ox):
            adj, fl = ox[o]
            note = ""
            if sym == "Hg" and o == 1:
                note = ' <span class="mono">(Hg₂Cl₂)</span>'
            items.append('<b>%s</b>&nbsp;%s%s' % (rom(o), adj, note))
        rows.append('<tr><td class="c hl">%s</td><td>%s</td><td>%s</td></tr>'
                    % (sym, cz, " · ".join(items)))
    h = ('<div class="wrap narrow"><section class="sec" id="prvky">'
         '<div class="sec-head"><h2>Tabulka prvků a jejich přídavných jmen</h2></div>'
         '<p class="intro">Každý tvar je vypsaný ručně, protože kmeny jsou '
         'nepravidelné. U&nbsp;rtuti si všimněte poznámky: „chlorid rtuťný“ se '
         'zapisuje Hg₂Cl₂, protože rtuť tvoří dvojjaderný kation Hg₂²⁺.</p>')
    h += ('<div class="tsearch"><input type="search" id="fEl" '
          'placeholder="Hledat prvek nebo přídavné jméno — síra, železnatý, Cu…" '
          'aria-label="Hledat v tabulce prvků">'
          '<span class="cnt" id="fElCnt"></span></div>')
    h += ('<div class="tablewrap tbig"><table id="tabEl"><thead><tr>'
          '<th>Značka</th><th>Prvek</th><th>Oxidační čísla a přídavná jména</th>'
          "</tr></thead><tbody>" + "".join(rows) + "</tbody></table></div>")
    h += "</section></div>\n"
    return h


def anion_table():
    rows = []
    for n, f, q, e, o, note in ND.SIMPLE_ANIONS:
        rows.append('<tr><td class="hl">%s</td><td class="c">%s</td>'
                    '<td class="n">%s</td><td>bezkyslíkatý</td><td>%s</td></tr>'
                    % (n, anion_ion(f, q), "−" + str(q), note or "—"))
    for n, f, q, e, o, hmax, note in ND.OXO_ANIONS:
        acid = ND.ACID_NAME.get(n, "")
        if acid == "-":
            acid = "—"
        elif not acid:
            adjs = dict(ND.ELEMENTS and {})
            adj = None
            for sym, cz, metal, ox in ND.ELEMENTS:
                if sym == e and o in ox:
                    adj = ox[o][0]
            acid = ("kyselina " + adj[:-1] + "á " + pretty(
                "H" + (str(q) if q > 1 else "") + f)) if adj else "—"
            if n in ND.ACID_FORMULA:
                acid = "kyselina " + adj[:-1] + "á " + pretty(ND.ACID_FORMULA[n])
        else:
            acid = acid + " " + pretty("H" + (str(q) if q > 1 else "") + f)
        oxs = rom(o) if o else "—"
        rows.append('<tr><td class="hl">%s</td><td class="c">%s</td>'
                    '<td class="n">%s</td><td class="c">%s %s</td><td>%s</td></tr>'
                    % (n, anion_ion(f, q), "−" + str(q), e, oxs, acid))
    h = ('<div class="wrap narrow"><section class="sec" id="anionty">'
         '<div class="sec-head"><h2>Tabulka aniontů</h2></div>'
         '<p class="intro">Podstatné jméno názvu soli je vždycky název aniontu. '
         'Ve třetím sloupci je náboj — ten rozhoduje, kolik kationtů se ke '
         'každému aniontu připojí.</p>')
    h += ('<div class="tsearch"><input type="search" id="fAn" '
          'placeholder="Hledat aniont — síran, NO3, manganistan…" '
          'aria-label="Hledat v tabulce aniontů">'
          '<span class="cnt" id="fAnCnt"></span></div>')
    h += ('<div class="tablewrap tbig"><table id="tabAn"><thead><tr>'
          '<th>Aniont</th><th>Vzorec</th><th class="n">Náboj</th>'
          '<th>Prvek a jeho ox. číslo</th><th>Odpovídající kyselina</th>'
          "</tr></thead><tbody>" + "".join(rows) + "</tbody></table></div>")
    h += "</section></div>\n"
    return h


# ============================================================ trenažér
def trainer():
    cats = ""
    h = ('<div class="wrap narrow"><section class="sec" id="trenazer">'
         '<div class="sec-head"><h2>Trenažér</h2></div>'
         '<p class="intro">Úlohy se skládají z&nbsp;tabulky prvků a&nbsp;aniontů, '
         'takže nedojdou. Vyberte si směr převodu a&nbsp;kategorie, které vám '
         'nejdou; zbytek si vypněte. U&nbsp;každé odpovědi — i&nbsp;té správné — '
         'dostanete rozbor, proč to tak je.</p>')
    h += '<div class="trainer">'
    h += '<div class="tr-set">'
    h += ('<div class="tr-row"><span class="lb">Směr</span>'
          '<span class="segmented" id="dirSeg" role="group" aria-label="Směr převodu">'
          '<button type="button" data-dir="f2n" aria-pressed="false">vzorec → název</button>'
          '<button type="button" data-dir="n2f" aria-pressed="false">název → vzorec</button>'
          '<button type="button" data-dir="mix" aria-pressed="true">obojí</button>'
          "</span></div>")
    h += ('<div class="tr-row"><span class="lb">Kategorie</span>'
          '<span class="chips" id="catChips"></span></div>')
    h += ('<div class="tr-row"><span class="lb"></span>'
          '<button class="btn btn-sm" type="button" id="catBasic">Jen základ</button>'
          '<button class="btn btn-sm" type="button" id="catAll">Všechno</button>'
          "</div>")
    h += "</div>"
    h += ('<div class="tr-body">'
          '<span class="tr-kind" id="trKind"></span>'
          '<div class="tr-q" id="trQ"></div>'
          '<div class="tr-hint" id="trHint"></div>'
          '<div class="tr-in"><input type="text" id="trIn" autocomplete="off" '
          'autocapitalize="off" autocorrect="off" spellcheck="false" '
          'aria-label="Vaše odpověď"></div>'
          '<div class="tr-prev" id="trPrev"></div>'
          '<div class="tr-btns">'
          '<button class="btn btn-primary btn-sm" type="button" id="btnCheck">'
          "Zkontrolovat</button>"
          '<button class="btn btn-sm" type="button" id="btnGive">Nevím, ukaž řešení</button>'
          '<button class="btn btn-primary btn-sm" type="button" id="btnNext" hidden>'
          "Další úloha</button>"
          "</div>"
          '<div id="trOut"></div>'
          "</div>")
    h += ('<div class="scorebar">'
          '<div class="stat"><span class="k">Zodpovězeno</span>'
          '<span class="v" id="scN">0</span></div>'
          '<div class="stat"><span class="k">Správně</span>'
          '<span class="v" id="scOk">0</span></div>'
          '<div class="stat hot"><span class="k">Série</span>'
          '<span class="v" id="scStreak">0</span></div>'
          '<div class="stat"><span class="k">Nejdelší série</span>'
          '<span class="v" id="scBest">0</span></div>'
          "</div>")
    h += "</div>"
    h += ('<div class="sec-head" style="margin-top:2.2rem"><h2>Co vám jde '
          'a&nbsp;co ne</h2></div>'
          '<p class="intro">Pokrok se ukládá ve vašem prohlížeči. Kategorii '
          's&nbsp;nízkým procentem si zapněte samostatně a&nbsp;chvíli u&nbsp;ní '
          'zůstaňte.</p>'
          '<div class="catgrid" id="catGrid"></div>'
          '<div class="tr-btns" style="margin-top:1rem">'
          '<button class="btn btn-sm" type="button" id="btnReset">'
          "Vymazat pokrok</button></div>")
    h += "</section></div>\n"
    return h


def links():
    h = ('<div class="wrap narrow"><section class="sec" id="dal">'
         '<div class="sec-head"><h2>Kam pokračovat</h2></div><div class="golinks">')
    h += ('<a class="golink" href="../anorganicka-chemie/index.html">'
          '<b>Anorganická chemie</b>'
          '<span>Devět okruhů o&nbsp;vlastnostech prvků a&nbsp;jejich sloučenin — '
          'názvy, které jste tady nadrilovali, tam potkáte v&nbsp;rovnicích '
          'a&nbsp;výkladu.</span>'
          '<span class="go">Přejít na okruhy ' + MS.ARR + "</span></a>")
    h += ('<a class="golink" href="../obecna-fyzikalni-chemie/elektrochemie.html">'
          '<b>Elektrochemie a redoxní děje</b>'
          '<span>Oxidační čísla, která tady jen určujete, se v&nbsp;tomhle okruhu '
          'používají k&nbsp;vyčíslování redoxních rovnic a&nbsp;k&nbsp;práci '
          's&nbsp;elektrodovými potenciály.</span>'
          '<span class="go">Přejít na okruh ' + MS.ARR + "</span></a>")
    h += ('<a class="golink" href="../periodicka-tabulka/index.html">'
          '<b>Periodická tabulka</b>'
          '<span>Značky, české názvy a&nbsp;typická oxidační čísla všech 118 prvků '
          '— hodí se, když si nejste jistí, jaké oxidační číslo prvek vůbec '
          'může mít.</span>'
          '<span class="go">Otevřít tabulku ' + MS.ARR + "</span></a>")
    h += "</div></section></div>\n"
    return h


# ============================================================ stránka
def build(data, engine):
    css = MS.TOKENS + MS.CHROME + MS.TILES + MS.HERO + CSS
    h = MS.head("České názvosloví — " + SITE["name"],
                "Trenažér českého anorganického názvosloví: vzorec → název "
                "i název → vzorec, osm tříd sloučenin od oxidačních čísel po "
                "koordinační sloučeniny. Ke každé odpovědi rozbor, proč to tak je, "
                "plus tabulka přípon, prvků a aniontů.",
                css)
    h += MS.topbar("../index.html",
                   '<nav class="crumb" aria-label="Drobečková navigace">'
                   '<a href="../index.html">Úvod</a><span>/</span>'
                   "<b>České názvosloví</b></nav>",
                   back=("../index.html", "Zpátky na úvod"))
    h += '<main id="obsah">\n'

    h += ('<section class="hero sub"><div class="hero-bg"></div>' + hero_art() +
          '<div class="hero-in">'
          '<span class="eyebrow">Nástroj · výklad a trenažér</span>'
          '<h1>České názvosloví</h1>'
          '<p class="lead">Název jako „síran měďnatý“ není náhodné slovo — je to '
          'zápis složení. Podstatné jméno prozradí aniont, přípona přídavného '
          'jména oxidační číslo kationtu. Tahle stránka tu soustavu nejdřív '
          'vyloží a&nbsp;potom vám ji dá nadrilovat v&nbsp;obou směrech, '
          'od oxidačních čísel až po koordinační sloučeniny.</p>'
          '<div class="cta">'
          '<a class="btn btn-primary" href="#trenazer">Začít trénovat ' + MS.ARR + "</a>"
          '<a class="btn" href="#jak">Nejdřív výklad</a>'
          "</div></div></section>\n")

    h += explain()
    h += suffix_table()
    h += anion_table()
    h += element_table()
    h += trainer()
    h += links()

    h += '<div class="toast" id="toast" role="status" aria-live="polite"></div>\n'
    h += "</main>\n" + MS.foot()
    h += "<script>\nvar DATA=" + json.dumps(data, ensure_ascii=False,
                                            separators=(",", ":")) + ";\n"
    h += engine + "\n"
    h += '(function(){\n"use strict";\n' + UI + "\n})();\n</script>\n"
    h += MS.theme_script()
    return h


def main():
    bad = ND.check()
    if bad:
        print("!! datová tabulka má %d nálezů — stránka se nezapisuje:" % len(bad))
        for b in bad:
            print("   -", b)
        sys.exit(1)

    data = ND.export()
    io.open(os.path.join(HERE, "nazvo_data.json"), "w", encoding="utf-8").write(
        json.dumps(data, ensure_ascii=False, separators=(",", ":")))
    engine = io.open(os.path.join(HERE, "nazvo_engine.js"), encoding="utf-8").read()

    os.makedirs(OUT, exist_ok=True)
    html = build(data, engine)
    p = os.path.join(OUT, "index.html")
    io.open(p, "w", encoding="utf-8", newline="\n").write(html)

    n_ox = sum(len(o) for _, _, _, o in ND.ELEMENTS)
    print("prvků s přídavným jménem: %d (oxidačních stavů %d)"
          % (sum(1 for _, _, _, o in ND.ELEMENTS if o), n_ox))
    print("aniontů: %d (%d kyslíkatých + %d jednoduchých)"
          % (len(ND.OXO_ANIONS) + len(ND.SIMPLE_ANIONS),
             len(ND.OXO_ANIONS), len(ND.SIMPLE_ANIONS)))
    print("zapsáno: %s  %.0f KB  %d řádků"
          % (p, len(html.encode()) / 1024, html.count("\n") + 1))

    r = subprocess.run(["node", os.path.join(HERE, "nazvo_selftest.js"), "400"],
                       capture_output=True, text=True, encoding="utf-8", cwd=HERE)
    for ln in (r.stdout or "").splitlines():
        if ln.startswith("katalog") or ln.startswith("prošlo") or "!!" in ln \
           or ln.startswith("vzorců") or ln.startswith("názvů se"):
            print(" ", ln)


if __name__ == "__main__":
    main()
