# alizain.dev — redesign brief for Claude

Personal site for **Ali Zain** (`methezain` online), an AI engineer and Python developer in Islamabad. Astro 4 static site, Terminal Jade palette, light and dark themes.

Read this before touching anything visual. It tells you where the authority lives, what is already settled, and the one rule that most needs applying to the pages not yet redesigned.

---

## 1. Sources of authority, in precedence order

When two sources disagree, the earlier one wins.

1. **Ali's instruction in the current conversation.** He is a frontend-capable client with strong opinions and he is usually right about what feels wrong, even when his diagnosis of why is off. Fix the cause, not the symptom he named, and say so.
2. **`.claude/skills/terminal-jade/SKILL.md`** — the colour system. Invoke with the `terminal-jade` skill. Authoritative on every colour decision. Three shipped values deliberately deviate from it for measured contrast reasons; see the memory note before "correcting" them.
3. **`resources for claude/DESIGN_SYSTEM.md`** — the implementation of that palette plus type, space, motion, elevation, components, and the accessibility contract. Already amended in place for the corrected type scale and section rhythm; keep it amended when you change those.
4. **`resources for claude/DESIGN-ROADMAP.md`** — composition, phasing, audit findings, and the reference corpus. Its §3 palette is void (superseded by Terminal Jade); everything else stands. §9 still lists unbuilt proof surfaces worth doing.
5. **Auto-memory** at `C:\Users\pcinf\.claude\projects\d--My-Coding-Projects-Exact-Solutions\memory\`. `MEMORY.md` is the index, loaded every session. Read the entries before redesigning a page; several record decisions Ali made after rejecting two or three alternatives, and re-proposing those alternatives wastes his time.

### Skills available in this project

`terminal-jade` (colour, always relevant), `design-system`, `ui-ux-pro-max`, `ui-styling`, `design`, `brand`, `banner-design`, `slides`. Plus the global skills: `frontend-design`, `apple-design` for motion and gesture work, `web-perf` for auditing, `dataviz` before any chart.

### Other files worth knowing

- `resources for claude/BUILD-ROADMAP.md`, `plan.md`, `need_attention.md`, `llm_seo_developer_strategy.md`
- `src/styles/global.css` — the token layer and all shared component classes
- `src/config/site.ts` — name, role variants, location, email, socials. Anything identity-shaped belongs here, not inline
- `src/scripts/motion.ts` (reveals, counters, bars, card sheen spring), `src/scripts/cursor.ts`
- `seo/`, `public/llms/`, `public/llms.txt` — SEO and LLM-crawler surfaces

---

## 2. Standing constraints

- **The site must not look AI generated.** No generic templates, no buzzword filler, no stock-render decoration. Professional and personal, not generic.
- **No em dashes or en dashes anywhere in copy.** Rewrite the sentence; do not swap punctuation.
- **Copy is first person and specific.** Real numbers, real client domains, real limits. Admitting what he is not a fit for is what makes the rest credible, and it is deliberate on `/about` and `/services`.
- **Verify visually and numerically before reporting.** Build, serve `dist/`, screenshot in both themes, and probe geometry and computed styles. Do not claim something works because the CSS looks right. Several bugs this project has hit were invisible in source and obvious in a measurement.
- **Every command's output goes to `logs/agent/<date>-<slug>.log`** and the path goes in the reply.
- **Never commit, push, or deploy** unless asked in that same message.

---

## 3. The text to image ratio is the current priority

Several pages carry too much text and not enough visual substance, which is why the site reads as competent rather than premium. Rough current state, long-string word counts against visual elements:

| Page | Body copy | Visual elements | Verdict |
|---|---|---|---|
| `/services` | ~495 words | 3 | heaviest; still text-led |
| `/` | ~278 words | 5 | acceptable |
| `/about` | ~208 words | 3 | acceptable |
| `/contact` | ~36 words | 0 | needs one visual |
| `/work` | ~203 words | 6 | redesigned 2026-09-02 |

**When redesigning any page, cut copy and add visual substance in the same pass.** Target roughly: one deliberate visual moment per two sections, no section that is three paragraphs with no shape, and no card carrying more than about 25 words.

### Prefer generated visuals over image files

In order of preference:

1. **CSS or SVG built from tokens.** Theme-aware for free, weighs nothing, cannot look like stock. The `/services` hero keyword cascade and the hub-and-spoke diagram are both this.
2. **Canvas when it needs depth or interaction.** `OrbitMesh.astro` (3D wireframe globe, two canvases split by depth) and `AmbientField.astro` (pointer-reactive dot field).
3. **Ali's own screenshots and outputs.** `public/work/` holds the project images with `-sm` variants; `public/student-behavior-analysis.mp4` is real model output. Real proof always beats decoration. The `public/work/*.webp` files are currently stock photography and Ali intends to replace them with his own; **he prefers them to a generated diagram, so do not substitute CSS or SVG art for a project image** (he rejected exactly that on `/work` on 2026-09-02).
4. **A processed image**, only when the first three cannot carry the idea.

**Stock 3D renders have been rejected.** A glass-laptop render was tried on `/services` and thrown out. If you reach for stock art, expect it to be wrong.

### Asking Ali for an image

When an image is genuinely the right answer, do not guess and do not settle for whatever is at hand. Ask for it with a full spec:

- **Pixel dimensions and aspect ratio**, at 2x for retina. State the CSS display size too. Example: "1600×900 (16:9), displayed at 800px wide, so 2x."
- **Format and transparency.** WebP for delivery; ask for **PNG with a real alpha channel** if the subject must be cut out, and say so explicitly. A file saved as JPEG with a transparency checkerboard baked in as pixels has already cost this project time.
- **What must be in frame**, and what must not. Subject, crop, headroom, and whether it needs to work with content overlaid.
- **Colour constraints.** The palette is jade with amber reserved for numbers. **Purple, indigo, and orange glow are prohibited.** Say up front whether you intend to recolour, because an image that has to be duotoned loses its own colour information.
- **Which surface it will sit on.** A near-black `--deep` band, a light `--surface-1` card, or the theme-flipping page canvas. An image that only works on one theme must be framed in a `--deep` plate so it stays dark in both, the way the brain band and its frame do.
- **Weight budget.** Under about 150KB for a hero-scale asset.

Tell him the spec in one short block and let him source it, rather than processing something that fights the palette.

---

## 4. Page composition, settled

Pages differ by **container structure and texture, never by palette**. A different background colour per page makes a site look like several templates; the palette is the strongest asset here. See the `page-differentiation-rule` memory.

| Page | Core container | State |
|---|---|---|
| `/` | bento cards with payload graphics, real CV video | redesigned |
| `/about` | ledger table derived from the blog collection, metadata rails | redesigned |
| `/services` | hub-and-spoke diagram with SVG connectors, comparison table, keyword cascade hero | redesigned |
| `/work` | hairline case-file records, project photo with a floating metric plate; stats-card hero | redesigned |
| `/contact` | uniform | **not yet redesigned** |
| `/blog`, `/blog/[slug]` | uniform | **not yet redesigned** |

Section entrances are a fixed vocabulary. `.head-split`, `.head-bar`, `.head-statement` and `.section-head` live in `global.css`; `.strip` is a per-page pattern currently duplicated in `index.astro` and `about.astro`, so lift it into `global.css` if a third page needs it. Pick an existing entrance that suits the section's weight rather than inventing a sixth. Vary them within a page; keep them consistent across pages.

Type scale, corrected and enforced. Nothing mid-page may outrank the page `h1`:

```
h1 60px  >  .head-bar h2 53.6px  >  h2 44.8px  >  .head-statement 37.6px  >  h3 20.5px
```

`Section` accepts `tone="plain" | "band" | "deep"`. `deep` redefines the whole token set over `--deep: #050d0c`, so it is near black in **both** themes and is the page's main value break in light mode. At most one deep section per page.

---

## 5. Traps this project has already hit

All four cost real time. Check for them.

1. **Astro scoped CSS never matches JS-created elements.** `.foo` compiles to `.foo[data-astro-cid-xxxx]`; anything from `createElement` lacks that attribute. SVG paths built in script rendered as black blobs because `fill: none` was scoped away. Use `:global()` and set critical presentation attributes in JS too.
2. **A component root does not reliably carry the parent page's scope id.** Styling a component from the page silently does nothing. Set a **custom property on a wrapper element you authored** and consume it with `var()`; custom properties inherit across the scope boundary.
3. **Media queries carry no extra specificity, so source order decides.** Appending base rules after `@media` blocks silently reverts them. In every page `<style>`: all bare rules first, `@keyframes` next, `@media` last. For a JS breakpoint gate use `matchMedia`, never a custom property set inside a media query.
4. **`@layer base` / `@layer components` in `global.css` are Tailwind directives, not native cascade layers.** They emit unlayered, so overriding `.section` needs id specificity, not `:global()` alone.

Also: `sharp` applies `.resize()` before `.composite()` in one chain, and `.blur()` promotes a 1-channel raw buffer to 3 channels.

---

## 6. Verification harness

No browser MCP is configured. Current loop:

```bash
npx astro build > logs/agent/$(date +%F)-<slug>.log 2>&1
node <scratchpad>/serve.js "<abs path>/dist"      # static server on 127.0.0.1:4327
chrome --headless=new --disable-gpu --hide-scrollbars \
       --window-size=1440,5000 --screenshot="<ABSOLUTE WINDOWS PATH>" \
       --virtual-time-budget=8000 http://127.0.0.1:4327/<page>
```

`sharp` crops and zooms the screenshots. Geometry and computed styles are probed by injecting a script into the built HTML and reading `document.title` back via `--dump-dom`.

Known limits of this harness:
- Screenshot paths **must be absolute Windows paths**; relative paths are refused.
- `requestAnimationFrame` is starved, and programmatic `scrollTo` emits no scroll event. Scroll-driven behaviour needs a manual `dispatchEvent(new Event('scroll'))` to test.
- The viewport will not go below about 500 CSS px, so 375 is untested.
- Force light mode by injecting `localStorage.setItem('theme','light')` **immediately after `<head>`**, before the theme script runs.

**`@playwright/test` would replace most of this** and fix the 375px gap. Ali has been offered it and not yet installed it; ask again if you need it.

Every viewport pass checks: no horizontal scroll (test `scrollLeft` after `scrollTo(9999,0)`, since `body` has `overflow-x: hidden` and `scrollWidth` alone gives false positives), container edges aligned, and the type scale descending.

---

## 7. SEO

Target keywords: **Ali Zain**, **methezain**, **AI engineer**, **Python developer**.

Titles are composed once in `src/components/SEO.astro` as `` `${site.name} · ${title}` ``, so pages pass only the descriptor. The full convention, including why articles use `cardTitle`, is in the `page-title-convention` memory. Keep every title under 60 characters and descriptions near 150.

`AnswerBlock.astro` emits `FAQPage` schema; `SEO.astro` emits a Person, WebSite, Organization, ProfessionalService, WebPage and BreadcrumbList graph. Keyword content must stay **rendered**, never `display: none` on mobile, which is why the `/services` hero cascade goes straight and full width on small screens instead of hiding.

---

## 8. Where glow stands

`DESIGN_SYSTEM.md` §12 prohibits jade glow and neon outright, on the grounds that it is the fastest way to make the site read as an AI demo. Ali has since asked for it three times and three narrow exceptions now exist: the wire impulse on `/services`, the orbit dot sprites, and the lit keyword card. All three are canvas gradients or directional tinted shadows, not symmetric neon halos.

That is the agreed ceiling. If a fourth comes up, amend §12 deliberately rather than carving another exception.
