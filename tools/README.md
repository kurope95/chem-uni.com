# Sestavovací nástroje webu chem-uni.com

Tady je všechno, z čeho se web skládá. Hotové stránky v kořeni repozitáře jsou
výstup těchto nástrojů.

## Struktura
- `kostra/` — kostra průvodců (`kostra-A/B/C.html`), sestavení (`build.py`), rozcestníky
  (`make_site.py`, `site_data.py`), balení k nasazení (`make_dist.py`), generátory
  samostatných sekcí (`make_tabulka.py`, `make_spolu.py`, `make_testy.py`,
  `make_nazvoslovi.py`), sazba zlomků (`add_fractions.py`), tiskový klíč
  (`extract_pool.js` + `make_kontrola.py`), jazykovou nabídku CZ/SK/EN pro menu (`i18n.py`)
  a kontroly (`qa.js`, `overlap.js`).
- `build/<okruh>/` — zdrojové díly jednotlivých průvodců (data, modely, kapitoly).
- `eqcheck.py` — ověří bilanci atomů a náboje u všech rovnic ve stránce.
- `verify.py` — spárování HTML značek a `node --check` nad skripty.
- `pojmy.py` — porovná pojmový aparát anorganiky s tím, co vykládá obecná chemie.
- `install_submodul.py` — zařadí pod-modul do sekce a doplní navigaci zpět.

## Jak se web sestaví
1. `python tools/kostra/build.py tools/build/<okruh>` — sestaví jednoho průvodce.
2. `python tools/kostra/make_site.py` — rozcestníky, navigace ve všech průvodcích a na konci
   nabídka jazyků CZ/SK/EN, přeložená lišta a řádek s autorem na všech obsahových stránkách. Spustit i po každém
   generátoru samostatné sekce. Je idempotentní, opakovaný běh nic nezmění.
3. `python tools/kostra/i18n.py --check` — musí skončit „všechno přeložené (cs, en, sk)“.
4. `python tools/kostra/make_dist.py` — složí čistou složku `web/` k nahrání
   (bez úplného překladu menu odmítne pokračovat).
5. `npx wrangler deploy` — nasadí `web/` na Cloudflare.

## Trojjazyčné menu (CZ/SK/EN)
Menu a ovládání webu jsou česky, slovensky i anglicky, obsah modulů zatím jen česky.
**Každý nový nebo změněný text menu musí mít zároveň slovenskou i anglickou verzi** — pravidlo pro agenty je
v `CLAUDE.md` v kořeni repozitáře, technika v hlavičce `kostra/i18n.py`.

Generátory mají cílovou složku projektu zapsanou napevno
(`C:\Claude Code\Claude Code\Doučovanie`). Při přesunu jinam ji uprav v `make_site.py`,
`make_dist.py` a `build.py`.

## Co tu záměrně není
Repozitář je veřejný, proto tu chybí:
- **stránky naskenované učebnice a digesty z ní** — autorsky chráněný text,
- **klíč se správnými odpověďmi** (`pool.json`, `kontrola-otazek/`) — student by si ho otevřel,
- **zadání pro agenty** (`BRIEF*.md`) — obsahují doslovné citace soukromé komunikace.

Tyto soubory zůstávají jen lokálně. `.gitignore` je blokuje v celém repozitáři,
takže se nedostanou dovnitř ani při dalším sestavení.
