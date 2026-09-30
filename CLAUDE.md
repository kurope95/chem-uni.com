# chem-uni.com — instructions for every agent working in this repo

Interactive chemistry study site (https://chem-uni.com). Finished pages live in the
repo root; the toolchain that builds them lives in `tools/` (see `tools/README.md`).

## MANDATORY: every menu/UI change ships in Czech, Slovak AND English

The site has a language menu (top right on every page: flag + code, dropdown with
CZ / SK / EN). The **menu, navigation and site UI are trilingual**. The **content
inside the modules is Czech only for now**.

**Rule:** whenever you add or change any user-facing menu or UI text, you add the
Slovak and English versions **in the same change**. Not later, not in a follow-up,
and not "Czech first, translate at the end". A new tile, topic, hub, section,
button label, breadcrumb, Back link or page title without SK and EN is an
unfinished change. If a new language is ever added to `LANGS` in `i18n.py`, every
text needs that language too.

### What must be translated (menu / UI)
- Home page, group pages (`obecna-fyzikalni-chemie/`, `anorganicka-chemie/`) and hub
  pages (`pocitani/`). All of their text is menu, including hero, headings, tiles,
  chips, notes and credits.
- On every content page: top bar, breadcrumb, Back buttons, footer, "skip to content"
  link, the page `<title>`, `aria-label`s of those controls, and the guides' left rail
  and mobile header (name, subtitle, progress label, theme/reset buttons).
- The author line at the bottom of every page, the 404 page, and the "content is in
  Czech" notice.
- Any new section, hub, tile, topic or page type you create.

### What stays Czech (content; do not translate unless the user asks)
- Everything inside `<main lang="cs">` on content pages (explanations, models, worked
  examples, tests, trainers).
- The chapter list in a guide's left rail (it mirrors the chapter headings).

### Translated content pages (Slovak copies)
Some modules also have their **content** translated into Slovak, as a separate file
next to the Czech page (`index.html` → `index.sk.html`, `slug.html` → `slug.sk.html`).
The language runtime redirects between them. As of 2026-09-16 these are `jak-pocitat/`,
`jak-pocitat/zlomky-a-zavorky/`, `pocitame-spolu/` and `periodicka-tabulka/`.
- The Czech page is the source of truth. Never edit a `.sk.html` file by hand; it is
  rebuilt from the Czech page plus the catalog `tools/preklad/sk/<page>.json` with
  `tools/kostra/preklad.py` (see its docstring and `tools/preklad/sk/GLOSAR.md`).
- **Whenever you change the content of a Czech page that has a Slovak copy**, in the same
  change run `preklad.py extract <page>`, translate the new or changed segments
  (`todo` / `put`), then `preklad.py apply <page>` and `preklad.py check <page>`. The
  check must end with `VÝSLEDEK: v pořádku`. A Czech fix without the Slovak update
  leaves Slovak students on stale content.

### Where the translations go
| Text | Put SK and EN in |
|---|---|
| Group / tile / topic / pair texts | `*_sk` and `*_en` fields next to the Czech in `tools/kostra/site_data.py` (`chips_sk` / `chips_en` in the same order) |
| Hub and group page texts | `*_sk` / `*_en` fields in `HUBS` / `GROUP_PAGES`, or inline `L("česky", "English", "slovensky")` in `tools/kostra/make_site.py` |
| Shared UI strings (back labels, footer, rail labels, author…) | `UI` in `tools/kostra/i18n.py`, as `{"en": …, "sk": …}` |
| Page names not in site_data (long rail titles, short mobile names) | `PAGE_NAMES` in `tools/kostra/i18n.py` |
| Strings a page script writes at runtime (theme label, confirm, toast) | `LIVE` in `tools/kostra/i18n.py` |

- Generate translated markup with `L(cs, en, sk)` or `Lk(obj, key)`, which render
  `<lang-cs>…</lang-cs><lang-en>…</lang-en><lang-sk>…</lang-sk>`. Use `i18n.aria(cs)`
  for `aria-label`, `i18n.toggle()` for the language menu and `i18n.author_html()`
  for the author line. Never hand-write Czech-only chrome. Note the argument order:
  **English second, Slovak third**.
- **Slovak:** standard Slovak (spisovná slovenčina), with Slovak chemistry terms
  (chémia, väzba, entalpia, zlúčenina, tlmivý roztok). Never Czech words with Slovak
  endings. Keep the tone of the Czech.
- **English:** British spelling (colour, practise, ionisation) and standard chemistry
  terminology, in the same tone.
- If you add a new page type or a chrome element the injector does not know, extend
  `localize_html()` and the checker in `i18n.py`. Do not leave it untranslated.

### Verify before you commit or deploy
1. `python tools/kostra/make_site.py`. It regenerates the hubs and injects the language
   menu, translated chrome and the author line into all content pages. It stops with an
   error on any missing translation. Run it also after any other generator
   (`make_testy.py`, `make_tabulka.py`, …).
2. `python tools/kostra/i18n.py --check` must end with
   `VÝSLEDEK: všechno přeložené (cs, en, sk)` (exit 0).
3. `python tools/kostra/make_dist.py` refuses to build `web/` while anything is untranslated.

## ABSOLUTE PROHIBITION: no box or tile without a pronounced edge — ever, no exceptions

The user's rule (2026-09-30), valid project-wide and permanently: **a box or tile with no edge,
or with a faint edge, is forbidden. There are no exceptions**: not for small boxes, nested boxes,
collapsible shelves, "just a note", a quick fix, a prototype or any other page type. It covers
every card, tile, panel, shelf (`<details>`), callout, quiz and question box, fill-in, message
box, readout, table frame, worked example, summary bar and button-like link, in every section
of every module. A box that differs from the page only by a slightly different background is
also forbidden.

**Use exactly these edges.** They are the site's card standard, measured on the tiles and cards
(`.tile`, `.credit` on the home and group pages, from `patch_cards.py` / `make_site.py`), and
`analyticka-chemie/jodometrie.html` uses them for every box:

| What | Edge |
|---|---|
| **Card-level box** (tile, panel, shelf `<details>`, card, fill-in, question box, worked example, callout, "Zamyslete se") | `border: 2px solid var(--line-strong)` + `border-top: 4px solid var(--accent)` + `border-radius: 16px` + card shadow |
| **Coloured box** (method card, key-principle box, example, calculator) | `2px` in the box's own line colour + `4px` top stripe in the box's **strong** theme colour (never the pale line colour) + `16px` radius + card shadow. A key box may use `3px` all round in its strong colour. |
| **Small inner element** (formula strip `.eq` with a 4px accent bar on the left, readout tile, message strip, table frame `.tablewrap`, "mark as done" bar, graph frame `.svgwrap`) | at least `2px solid var(--line-strong)` (or `--ok` / `--bad` / `--warn` for feedback) |

- **Colours:** `--line-strong` is `#c8baa5` in light mode and `#4a4036` in dark mode. `--accent`
  is `#9b3320` in light mode and `#e0785c` in dark mode.
- **Card shadow, light mode:** `0 1px 2px rgba(33,27,21,.07), 0 6px 16px rgba(33,27,21,.09)`.
- **Card shadow, dark mode:** `0 2px 6px rgba(0,0,0,.5), 0 8px 20px rgba(0,0,0,.38)`.
- Define the dark variants under both `@media (prefers-color-scheme:dark)
  :root:not([data-theme="light"])` and `:root[data-theme="dark"]`.
- **Forbidden:** `1px solid var(--line)` on any box, any box with no border, any card-level box
  without the shadow, and top stripes in a pale colour.
- **Warning:** the shell's own defaults (`kostra-A.html`: `.panel`, `.callout`, `.worked`,
  `.readout`, `.tablewrap`, `details.gitem`, `.chapter-done`) are still `1px var(--line)`. That is
  faint. Every new page must override them to the values above, as `tools/build/jodometrie/10-hero.html`
  does. The inner boxes of the older guides (Obecná a fyzikální chemie, Anorganická chemie) were
  built with those defaults and do **not** meet this rule yet. Do not copy them.
- **Postponed on purpose (user's decision, 2026-09-30):** those 19 older guides stay as they are
  for now. Do not restyle them unless the user asks. When asked, the upgrade is one pass through
  the CSS that `make_site.py` injects into every guide (`NAV_CSS`), overriding `.panel`,
  `.callout`, `.worked`, `.readout`, `.tablewrap`, `details.gitem` and `.chapter-done` to the
  values above. Everything new, and every change to any page, follows the rule in full.
- Leave clear space between boxes (1–1.5rem) so every edge is visible.
- Nothing may be clipped or pushed out of view (rail, cards, buttons). Before deploying, check at
  about 1770px and 375px wide and confirm that no box has a border under 2px. The formula strip
  `.eq` counts as a box too: `2px solid var(--line-strong)` with a `4px` accent bar on the left.

## MANDATORY: every visualisation says what it means

A diagram without labels is worse than none (the user could not read a row of repeated ion tokens).
Every box, arrow and number in a visual carries a caption saying what it is (e.g. "1 mol analyt"
→ "krok 1: uvolní z KI" → "3 mol I₂") and ends with a one-line conclusion in words.

## Other standing rules
- **Author line.** Every page shows "Autor: Ing. Marek Kurťák" at the bottom: in the
  footer on pages with one, and as the last line of `<main>` in the guides. Keep it
  on any new page; the checker fails without it.
- **Logo and tab icon.** The benzene-ring logo and the favicon come from
  `tools/kostra/brand.py` (`logo_svg()`, `favicon_links()`). Never hand-write a logo
  (the old "Ch" badge) into a page. If you change `FAVICON_SVG`, re-render `FAVICON_PNG_32`.
- **Public repo.** Never commit the textbook PDF or page renders (`kniha/`), `DIGEST.md`,
  `BRIEF*.md`, `pool.json`, `qa_payload.json`, `kontrola-otazek/` or syllabus photos.
  `.gitignore` blocks them; do not weaken it. Also check staged files for local
  Windows user paths.
- **Do not rebuild finished guides with `build.py`.** Many fixes were applied directly to
  the finished HTML, and a rebuild from parts would wipe them. `make_site.py` and
  `i18n.py` are safe to re-run (idempotent).
- **Avoid generic CSS class names** (`.q`, `.bar` collisions already broke pages). The
  language texts use custom tags and the menu uses `langsw-*` classes for exactly this reason.
- **Deploy:** `python tools/kostra/make_dist.py`, then `npx wrangler deploy`.
