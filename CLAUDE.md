# chem-uni.com — instructions for every agent working in this repo

Interactive chemistry study site (https://chem-uni.com). Finished pages live in the
repo root; the toolchain that builds them lives in `tools/` (see `tools/README.md`).

## MANDATORY: every menu/UI change ships in Czech AND English

The site has a CZ/EN language toggle (top right on every page). The **menu, navigation
and site UI are bilingual**. The **content inside the modules is Czech only for now**.

**Rule:** whenever you add or change any user-facing menu or UI text, you add the
English version **in the same change**. Not later and not in a follow-up. Also not
"Czech first, translate at the end". A new tile, topic, hub, section, button label,
breadcrumb, Back link or page title without English is an unfinished change.

### What must be bilingual (menu / UI)
- Home page, group pages (`obecna-fyzikalni-chemie/`, `anorganicka-chemie/`) and hub
  pages (`pocitani/`). All of their text is menu, including hero, headings, tiles, chips,
  notes and credits.
- On every content page: top bar, breadcrumb, Back buttons, footer, "skip to content"
  link, the page `<title>`, `aria-label`s of those controls, and the guides' left rail
  and mobile header (name, subtitle, progress label, theme/reset buttons).
- The 404 page, and the "content is in Czech" notice.
- Any new section, hub, tile, topic or page type you create.

### What stays Czech (content, do not translate unless the user asks)
- Everything inside `<main lang="cs">` on content pages (explanations, models, worked
  examples, tests, trainers).
- The chapter list in a guide's left rail (it mirrors the chapter headings).

### Where the English goes
| Text | Put the English in |
|---|---|
| Group / tile / topic / pair texts | `*_en` field next to the Czech in `tools/kostra/site_data.py` (`chips_en` in the same order) |
| Hub and group page texts | `*_en` fields in `HUBS` / `GROUP_PAGES`, or inline `L("česky", "English")` in `tools/kostra/make_site.py` |
| Shared UI strings (back labels, footer, rail labels…) | `UI` in `tools/kostra/i18n.py` |
| Page names not in site_data (long rail titles, short mobile names) | `PAGE_NAMES` in `tools/kostra/i18n.py` |
| Strings a page script writes at runtime (theme label, confirm, toast) | `LIVE` in `tools/kostra/i18n.py` |

- Generate bilingual markup with `L(cs, en)` (renders `<lang-cs>…</lang-cs><lang-en>…</lang-en>`).
  Use `i18n.aria(cs, en)` for `aria-label` and `i18n.toggle()` for the switch. Never
  hand-write Czech-only chrome.
- English style: British spelling (colour, practise, ionisation), standard chemistry
  terminology, same tone as the Czech.
- If you add a new page type or a chrome element the injector does not know, extend
  `localize_html()` and the checker in `i18n.py`. Do not leave it untranslated.

### Verify before you commit or deploy
1. `python tools/kostra/make_site.py`. It regenerates the hubs and injects the toggle and
   English chrome into all content pages. It stops with an error on any missing translation.
   Run it also after any other generator (`make_testy.py`, `make_tabulka.py`, …).
2. `python tools/kostra/i18n.py --check` must end with `VÝSLEDEK: všechno přeložené` (exit 0).
3. `python tools/kostra/make_dist.py` refuses to build `web/` while anything is untranslated.

## Other standing rules
- **Public repo.** Never commit the textbook PDF or page renders (`kniha/`), `DIGEST.md`,
  `BRIEF*.md`, `pool.json`, `qa_payload.json`, `kontrola-otazek/` or syllabus photos.
  `.gitignore` blocks them; do not weaken it. Also check staged files for local
  Windows user paths.
- **Do not rebuild finished guides with `build.py`.** Many fixes were applied directly to
  the finished HTML, and a rebuild from parts would wipe them. `make_site.py` and
  `i18n.py` are safe to re-run (idempotent).
- **Avoid generic CSS class names** (`.q`, `.bar` collisions already broke pages). The
  language pairs use custom tags for exactly this reason.
- **Deploy:** `python tools/kostra/make_dist.py`, then `npx wrangler deploy`.
