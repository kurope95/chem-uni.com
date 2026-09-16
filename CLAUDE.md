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

## Other standing rules
- **Author line.** Every page shows "Autor: Ing. Marek Kurťák" at the bottom: in the
  footer on pages with one, and as the last line of `<main>` in the guides. Keep it
  on any new page; the checker fails without it.
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
