# Design Roadmap — alizain.dev

Full front-end redesign. Derived from (a) a UI/UX + Apple-design audit of the current codebase and (b) a design-language extraction from 15 reference designs.

**Status:** planned, not started
**Default theme:** light. Dark is a fully designed counterpart, not an inversion.
**Scope:** complete front-end — design system, composition, components, motion, accessibility, performance
**Out of scope:** copy, content, routes, SEO metadata, blog collection

---

## Context

The site works but reads as template-generated from a distance. Five structural causes:

1. **Every section is the same shape** — eyebrow → h2 → lede → grid of identical cards
2. **One accent does eleven jobs** — `#e94f37` is brand, links, icons, focus ring, errors, badges, buttons, and text selection
3. **No depth** — everything on one plane; `backdrop-filter` appears twice in the whole codebase
4. **Type hierarchy is size-only** — one `letter-spacing: -0.025em` across h1–h4
5. **No dark mode** — zero `prefers-color-scheme` anywhere

Four decorations were added to compensate — preloader, custom cursor, magnetic buttons, Lenis scroll hijack. They read as *decoration in place of craft* and make the problem worse.

The 15 references are the inverse of all five causes.

---

## 1. Reference corpus

Grouped into three registers. All 15 share one DNA (§2).

### Register A — light structural (**the default theme**)
| Ref | What it contributes |
|---|---|
| Hourglass health dashboard | frosted panels on gradient mesh, tile grids, large radii |
| Sense meditation app | bright 1px top edge on glass, bento with offset alignment, pill filter tabs |
| Fitness dashboard (×2) | soft elevation, circular quick-action row, dual-tone radial arcs, dark rail as contrast anchor |
| Energy dashboard (green) | KPI card + status pill, sequential monochrome ramp, delta indicators, dashed threshold line |
| Agency service cards | layered screenshot stacks bleeding into a gradient text block |
| Built for Founders | heavy display type, node diagram on dotted grid, mono chips |
| Why settle for less? | comparison table, highlighted column, pill CTA |
| Kivo SaaS landing | gradient-filled word in headline, avatar-stack proof |

### Register B — dark editorial (**the counterpart theme**)
| Ref | What it contributes |
|---|---|
| Blackwell EV "Results" | oversized low-contrast section watermark, metric list with `//001` mono index markers, hairline rows, huge accent figures, icon-button + label CTA |
| CloseAI hero | italic serif inside a sans headline, starfield vignette, screenshot with floating annotation chips |
| Unizen bento | radial glow bleeding from card corners, bar chart with exactly one accent bar, radial gauge, logo row with one accent node |
| Unizen CTA | radial sunrise glow, grain, dotted page grid, pill button with circular arrow |
| Framer template detail | metadata sidebar — key/value rows + tag pill groups |

### Register C — palette study
The 4-band green ramp (near-black green → deep forest → mid sea green → pale mint). Treated as a **neutral axis**, not an accent — see §3.

---

## 2. The extracted design language

16 traits. The right-hand column is the audit finding each one answers.

| # | Trait | Evidence | Answers |
|---|---|---|---|
| 1 | Depth from **light**, not borders | glow, glass, soft elevation, gradient bleed | "no depth — one plane" |
| 2 | One accent, used **once per view** | one orange bar; one orange node; one orange arc | "one accent doing eleven jobs" |
| 3 | **Monochrome-dominant** surfaces | 90% neutral, accent as punctuation | flat single-accent everywhere |
| 4 | Bento / asymmetric composition | mixed card sizes, offset alignment | "every section is the same shape" |
| 5 | Every card carries a **visual payload** | bar chart, gauge, node graph, chips, screenshots | cards are text + icon only |
| 6 | The graphic **demonstrates the claim** | plausible UI showing the thing working | decorative Lucide icons |
| 7 | Heavy display type, tight tracking | 700–800, negative tracking, short measure | one `-0.025em` for h1–h4 |
| 8 | Editorial contrast | italic serif or gradient word inside a sans headline | Poppins everywhere |
| 9 | **Technical detailing** | `//001` index markers, hairline rows, mono labels, tabular figures | none present |
| 10 | Texture | grain, dotted grid, starfield | flat fills |
| 11 | Pills as a motif | badges, tags, filter tabs, status chips | partially present |
| 12 | **Status + delta indicators** | `normal`/`high` pills, `↗ +5.2%` | none present |
| 13 | Units in a **lighter, smaller** weight | `2,340`/`8000`, `1,245.6 kVA` | none present |
| 14 | **Oversized low-contrast section labels** | "Results" as a pale watermark + accent rule | eyebrow labels only |
| 15 | Proof surfaces | comparison table, avatar stack, metadata sidebar | none exist |
| 16 | **Zero** preloaders / custom cursors / magnetic buttons | absent from all 15 | the four decorations to delete |

**Reconciliation.** The references apply Apple's craft standards — depth, restraint, material, responsive motion — through a *technical/editorial* identity. Traits 9, 12, 13, and 14 are the ones that specifically read as "an engineer made this," and they are the cheapest to implement. They are also entirely absent today.

---

## 3. Palette — "Evergreen & Ember"

The attached green ramp becomes the **neutral axis**; the existing `#e94f37` stays as the **single accent**. The energy dashboard uses green as structure and the fitness/Blackwell/Unizen references use orange as punctuation — this palette does both.

**Why this over the alternatives:**
- Green-tinted neutrals read warm and considered in light mode, and a green-black (`#0D1614`) is far richer than a pure `#0A0A0B` in dark mode
- Orange sits near-opposite green on the wheel, so the accent pops maximally against its own neutrals — the "one accent per view" discipline becomes self-enforcing
- The existing brand color survives, so the wordmark, favicon, and OG images don't need reworking

All contrast ratios below are computed against the stated background. **Re-verify each pair with a checker during implementation.**

### 3.1 Light theme (default)

| Token | Value | On `--bg` | Use |
|---|---|---|---|
| `--bg` | `#F5F8F6` | — | page |
| `--bg-sunken` | `#EBF0ED` | — | recessed bands, code blocks |
| `--surface` | `#FFFFFF` | — | L1 cards |
| `--surface-2` | `#F9FBFA` | — | nested surfaces |
| `--hairline` | `#DDE5E0` | — | 1px rules, dividers |
| `--ink` | `#0D1614` | **17.2:1** | display + body |
| `--ink-2` | `#4A5A54` | **6.8:1** | secondary text |
| `--ink-3` | `#5F7069` | **4.9:1** | tertiary text — still AA |
| `--ink-faint` | `#8A9B94` | 3.2:1 | **decorative only, never text** |
| `--structure` | `#275C47` | **7.3:1** | deep forest — secondary structural, diagram strokes |
| `--accent` | `#E94F37` | 3.5:1 | **fills, graphics, marks only — never text** |
| `--accent-text` | `#C0401F` | **4.9:1** | accent text, links, small accent elements |

**Buttons (light):**
- primary — `#C0401F` fill + white label → **5.3:1** ✓
- attention variant — `#E94F37` fill + `#0D1614` label → **5.8:1** ✓

### 3.2 Dark theme

| Token | Value | On `--bg` | Use |
|---|---|---|---|
| `--bg` | `#0D1614` | — | page |
| `--bg-elev` | `#131F1C` | — | raised band |
| `--surface` | `#172521` | — | L1 cards |
| `--hairline` | `rgba(176,227,203,.10)` | — | tinted with the mint so it stays in-family |
| `--ink` | `#E8F0EC` | **15.9:1** | display + body |
| `--ink-2` | `#A9BDB5` | **9.3:1** | secondary text |
| `--ink-3` | `#7C918A` | ~4.9:1 | tertiary text |
| `--structure` | `#7FC0A3` | — | diagram strokes, secondary marks |
| `--accent` | `#E94F37` | **4.9:1** | text-safe here, unlike light mode |
| `--accent-bright` | `#FF6A4D` | **6.5:1** | the oversized metric figures (Blackwell move) |

**Button (dark):** `#E94F37` fill + `#0D1614` label → **5.8:1** ✓

### 3.3 Semantic states

Kept deliberately narrow — this site needs exactly three. **Every one is icon-paired**, because the structural hue is green and the accent is orange-red; color alone cannot carry these.

| Role | Light | Dark | Contrast (light) |
|---|---|---|---|
| `--success` | `#2E7D5B` | `#58C79A` | 4.7:1 ✓ |
| `--danger` | `#AF1E3C` | `#FF8098` | 6.4:1 ✓ |
| `--warning` | `#8A5A00` | `#F0B429` | — |

`--danger` is a cool crimson, ~30° off the ember accent. That is enough to separate them for most viewers and **not** enough for colorblind users — hence the mandatory icon.

### 3.4 Data-visualization ramp

Sequential monochrome green (per the energy dashboard donut), with ember reserved for the one highlighted series:

```
#0D1614 → #1E4436 → #275C47 → #3E8C6C → #7FC0A3 → #B0E3CB
highlight: --accent
```

Rule: charts are monochrome green **except** the single series being argued about, which is ember. Never color by series for its own sake.

### 3.5 Swapping the accent

If ember is ever replaced (e.g. by the mid-green `#3E8C6C` as accent, dropping orange entirely), only `--accent`, `--accent-text`, `--accent-bright` change. Nothing else in the system depends on the hue. Keep it that way.

---

## 4. Typography

Drop Poppins — the generic tell, and 5 files loaded on every page (`src/layouts/Layout.astro:6-10`).

| Role | Face | Use |
|---|---|---|
| Display | heavy grotesque variable (Instrument Sans / Archivo / Space Grotesk) | h1–h2 at 700–800 |
| Body / UI | **Inter Variable** — already installed, keep | prose, labels, controls |
| Data / technical | JetBrains Mono Variable | metrics, `//001` markers, diagram labels, tags |
| Editorial accent | Instrument Serif *Italic* | **one word** in the hero. Load only where used. |

Net: −5 Poppins files, +2 variable faces, +1 narrow-use italic. Confirm Fontsource availability before committing; subset aggressively.

### Size-specific tracking

Replaces the single `-0.025em` on h1–h4 (`src/styles/global.css:51`). Tracking is size-specific — a 68px h1 and a 21px h3 need different values.

| Step | Size | Tracking | Leading |
|---|---|---|---|
| display-xl | `clamp(3rem, 6vw, 4.5rem)` | `-0.035em` | 0.98 |
| display-l | `clamp(2rem, 3.5vw, 3rem)` | `-0.025em` | 1.05 |
| watermark | `clamp(3rem, 7vw, 5.5rem)` | `-0.03em` | 1.0 |
| h3 | `1.25–1.5rem` | `-0.015em` | 1.2 |
| body | `1rem` | `0` | 1.6 |
| label-sm | `0.75rem` | `+0.02em` | 1.4 |
| mono-label | `0.7rem` uppercase | `+0.08em` | 1.4 |

### Numeric detail (traits 13, 9)

- `font-variant-numeric: tabular-nums` on every metric, table cell, and timer
- **Units and denominators one step smaller and one weight lighter** than the figure — `2,340`/`8000`, `1,245.6 kVA`
- `//001`-style index markers in mono at `--ink-faint`

---

## 5. Material & elevation

Four levels, replacing the single card recipe (`12px` radius + `1px` border + `0 1px 3px` shadow) used identically by service cards, work cards, and post cards.

| Level | Light (default) | Dark |
|---|---|---|
| **L0** page | `--bg` + optional dotted grid | `--bg` + grain + dotted grid |
| **L1** card | `--surface` + soft two-stop shadow + faint `--hairline`; **bright 1px top inner edge** | `--surface` + `--hairline`, **no drop shadow** — light does the work |
| **L2** floating chrome | translucent + `blur(20px) saturate(180%)`, content scrolls under | same, stronger blur |
| **L3** overlay | scrim + deeper blur + parent pushed back | same |

Bigger surfaces read thicker — stronger blur and deeper shadow than small chips. Never stack a light translucent surface directly on another.

**Radii:** `8px` controls · `16px` cards · `24px` large panels · `999px` pills.

### Signature effects

**Bright top edge** (Sense, Hourglass) — the light-catching detail that makes glass read as material:
```css
box-shadow: inset 0 1px 0 rgba(255,255,255,.7), /* light */
            0 1px 2px rgba(13,22,20,.04),
            0 8px 24px rgba(13,22,20,.06);
```

**Glow** (Unizen) — dark theme only:
```css
radial-gradient(120% 100% at 100% 0%,
  color-mix(in oklab, var(--accent) 22%, transparent), transparent 60%)
```
**Discipline rule: at most one glowing card per viewport.**

**Grain** — inline `feTurbulence` data-URI, `opacity: .035`, `mix-blend-mode: overlay`, fixed, `pointer-events: none`. Dark theme primarily.

**Dotted grid** — `radial-gradient(currentColor 1px, transparent 1px)` at `24px`, `opacity: .06`. Behind diagrams, not page-wide.

### Required fallbacks

All three are currently absent:
- `prefers-reduced-transparency` → raise opacity, drop blur
- `prefers-contrast: more` → near-solid backgrounds, defined borders
- `prefers-reduced-motion` → extend existing handling to the new payload graphics

---

## 6. Theme mechanics

- `data-theme="light" | "dark"` on `<html>`; attribute absent = follow `prefers-color-scheme`
- **Light palette on bare `:root`** — it is the canonical design and the no-signal fallback
- Redefine tokens under `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { … } }`, then again under `:root[data-theme="dark"]` so the explicit toggle wins both ways
- Never give a color its only definition inside a media or `[data-theme]` block
- Blocking inline script in `<head>` reads `localStorage` before paint — **replaces** the preloader script at `src/layouts/Layout.astro:101-117`
- Re-apply on `astro:after-swap` (View Transitions are enabled)

> If light should win even for visitors whose OS is set to dark, delete the `prefers-color-scheme` block — light then applies until the toggle is used. Respecting the system preference is the recommended default.

---

## 7. Motion

Delete GSAP + ScrollTrigger + Lenis (~90KB) from `src/scripts/motion.ts`.

- **Reveals** → IntersectionObserver, ~20 lines
- **Springs** → CSS `linear()` spring easings; the `motion` mini build (~2.6KB) only where velocity handoff or interruption genuinely matters
- **Tokens** — `--spring-ui` (damping 1.0, response 0.35) as default; `--spring-momentum` (damping 0.8, response 0.35) only after a momentum gesture
- **Define `--ease-out`** — referenced 3× (`global.css:124`, `:207`) but **never declared**, silently resolving to plain `ease`
- **Press feedback on pointer-down** — `:active { transform: scale(.97) }` @100ms on every interactive element. The codebase has **zero** `:active` rules today; this is the cheapest large gain in perceived quality
- **Reveal variety** instead of one 24px fade-up on 60+ elements:
  - section headers → fade + 12px rise
  - bento cards → staggered 40ms, scale `.98 → 1`
  - payload graphics → draw-in / count-up on enter
  - **cap at 2 animated elements per viewport**
- Mobile menu originates from its trigger (`transform-origin`) and exits along the path it entered
- Theme switch cross-fades — no abrupt brightness jump

---

## 8. Component patterns to build

Extracted directly from the references. These are the "an engineer made this" details.

| Pattern | Ref | Spec |
|---|---|---|
| **Metric list** | Blackwell | oversized accent figure → small uppercase label → hairline rule → `//00N` mono marker right-aligned |
| **Section watermark** | Blackwell | short accent rule, then the section name at display size in `--ink-faint` |
| **Icon-button CTA** | Blackwell | rounded-square accent icon button + label *beside* it, not inside |
| **KPI card** | energy dashboard | dark-filled card on light page, status pill top-right, figure + lighter unit, delta row |
| **Delta indicator** | energy dashboard | arrow glyph + signed percentage, `--success`/`--danger`, always icon-paired |
| **Status pill** | energy dashboard, contact page | dot + label, 999px, `--success` when available |
| **Quick-action row** | fitness dashboard | circular icon buttons + labels beneath, horizontally scrollable on mobile |
| **Filter pills** | Sense | active = solid `--surface` with shadow; inactive = transparent |
| **Metadata sidebar** | Framer detail | key/value rows + tag pill groups |
| **Comparison table** | Why settle for less? | highlighted column with tinted background, check/cross in tinted circles |
| **Avatar-stack proof** | Kivo, CloseAI | overlapping circles + count |
| **Gradient/serif word** | Kivo, CloseAI | one word in the hero headline — pick **one** of the two devices, not both |

---

## 9. Composition

### Home — `src/pages/index.astro`

Eight uniform stacked sections → bento rhythm:

| Section | Now | Becomes |
|---|---|---|
| Hero | text + portrait | + soft glow behind portrait, status pill, one serif-italic word, avatar/logo proof row under the CTAs |
| Trust bar | bordered strip | low-contrast band, no hard borders |
| Services | 4 equal columns | **bento** — 2 large with payload graphics + 2 small |
| Selected work | 4 equal cards | **1 wide hero case study** (screenshot + floating metric chips) + 3 smaller |
| Process | 4 text columns | node diagram on dotted grid, mono labels |
| Results | already the strongest | **rebuild as the Blackwell pattern** — watermark + narrative left, metric list with `//00N` markers right; `results.json` panel gains a real bar chart + radial gauge |
| About snippet | plain | glass treatment, bright top edge |
| CTA band | flat dark | radial glow + grain + icon-button CTA |

### Other pages
- `services.astro` — add the **comparison table** (me vs agency vs generalist freelancer)
- `blog/[slug].astro` — add the **metadata sidebar**; frontmatter already carries `client`, `metric`, `tags`, `liveUrl`, so it is nearly free
- `work.astro` — feature cards become the layered-screenshot treatment; archive grid becomes bento
- `contact.astro` — status pill, KPI-style direct-contact card

### Components to rebuild
`src/components/` — `Nav.astro` (+ theme toggle), `Footer.astro`, `Button.astro`, `PostCard.astro`, `Section.astro`, `LiveBadge.astro`, `Marquee.astro`, `Eyebrow.astro`, `CategoryFilter.astro` (→ filter pills), `Pagination.astro`, `TrustSignals.astro`, `AnswerBlock.astro`

---

## 10. Visual payload components

All token-driven, theme-aware via `currentColor`, reduced-motion aware, no image assets.

| Component | Ref | Data source |
|---|---|---|
| `MetricList` | Blackwell | the 90% / 98% / 70% figures + `//00N` markers |
| `StatBar` | Unizen | real metrics; **one** bar in ember |
| `StatGauge` | Unizen, fitness | dual-tone radial arc — `--structure` + `--accent` |
| `FlowDiagram` | Built for Founders | **reuse the existing generator at `src/pages/index.astro:53-68`** |
| `ChipStack` | Unizen | offset floating labels |
| `ScreenshotFrame` | CloseAI, agency cards | the 11 images in `public/work/` + annotation chips |
| `LogoOrbit` | Unizen | reuse the `Marquee.astro` item list; one logo in ember |
| `DonutChart` | energy dashboard | sequential green ramp (§3.4) |

---

## 11. Audit fixes

### Delete the decorations
| Item | Location |
|---|---|
| Preloader | `src/layouts/Layout.astro:38-125` |
| Custom cursor | `src/scripts/cursor.ts` + `src/styles/global.css:170-195` |
| Magnetic buttons | `src/scripts/motion.ts` `initMagnetic()` |
| Lenis scroll hijack | `src/scripts/motion.ts` `initLenis()` |
| GSAP + ScrollTrigger | `src/scripts/motion.ts` |

### Accessibility
- Accent contrast per theme — see §3. Current `#e94f37` on the light background is **~3.5:1** and fails AA for `.link-accent`, `.field__error`, `.post-card__cat`, and the primary button label
- `:active` press states on every interactive element — currently **zero** in the codebase
- Mobile menu focus trap, focus moved in on open, focus returned to the toggle on close, background `inert` — `src/components/Nav.astro:276-301` has none of this
- Semantic `--danger` / `--success` / `--warning` separate from the accent; every state icon-paired

### Form and card UX
- Blur validation on `src/pages/contact.astro` — currently submit-only
- Error toast uses `--danger`, not the brand accent (`contact.astro:303` currently turns the toast solid brand orange, so a failure looks like a success)
- Toast dismiss button
- Remove forced 2-line `-webkit-line-clamp` truncation in 3 places — fix grid alignment instead of cutting titles
- Replace the `ResizeObserver` textarea height sync with CSS grid
- Add the primary CTA to the mobile menu — `.site-header__cta` is `display: none` below 860px with no mobile equivalent

### Performance
- Trim fonts per §4
- Drop ~90KB of GSAP + Lenis + ScrollTrigger
- Migrate `<img>` to `astro:assets` `<Image>` for automatic `srcset`/`sizes` — there is **zero** srcset today, and the manual `.replace(/\.webp$/, '-sm.webp')` string-swapping goes away
- Reconsider `prefetch: { prefetchAll: true, defaultStrategy: 'viewport' }` in `astro.config.mjs` on link-dense blog pages

---

## 12. Deliberate exclusions

Things in the references that should **not** be copied, and why.

| Excluded | Reason |
|---|---|
| **True neumorphism** (fitness dashboard) | Surfaces defined only by shadow sit near 1.2:1 against the page and fail non-text contrast. Use the restrained "soft elevation + faint hairline + bright top edge" from §5 instead — same feel, actually accessible. |
| **Vivid gradient page frame** (Kivo) | That pink/purple surround is the Dribbble presentation background, not a page element. Reproducing it on a real site just adds a colored border. |
| **Gradient-mesh abstract thumbnails** (Sense) | Beautiful, but they replace evidence with decoration. This site's argument is "here is the system working" — keep real screenshots. |
| **Starfield** (CloseAI) | A full-viewport moving background; conflicts with reduced-motion guidance and reads as consumer-product, not engineering. A static vignette gets the same depth. |
| **Both editorial devices at once** | Serif-italic word *and* gradient word in the same headline reads as indecision. Pick one. |

---

## 13. Phasing

| Phase | Work | Verifiable outcome |
|---|---|---|
| **1** | Subtract — delete the 4 decorations, IntersectionObserver reveals, define `--ease-out` | ~90KB drop; site feels faster; no visual commitment yet |
| **2** | Token layer — Evergreen & Ember palette (§3), elevation (§5), type scale (§4), spring tokens, theme mechanics (§6) | theme toggle works; every pair passes AA |
| **3** | Primitives — Button, Section, Eyebrow, pills, Nav, Footer + `:active` + focus trap | shared components on the new system, both themes |
| **4** | Technical detailing (§8) — MetricList, watermark, KPI card, delta, status pill, filter pills | the "engineer made this" layer, cheap and high-signal |
| **5** | Payload components (§10) | eight reusable visuals, theme- and motion-aware |
| **6** | Page recompose (§9) + proof surfaces | bento home, comparison table, metadata sidebar |
| **7** | Motion pass + form/card UX + perf pass | springs, blur validation, `astro:assets`, font trim |

Phases 1–2 are reversible and de-risk everything after. Phase 4 delivers the most perceived quality per hour of work.

---

## 14. Risks

- **Restraint is the whole trick.** Traits 1–3 pull against each other: depth and texture add, monochrome-dominance subtracts. The two discipline rules — *one glow per viewport*, *one accent per view* — are load-bearing, not stylistic.
- **Green neutrals must stay desaturated.** If `--bg` and `--surface` drift saturated, the page reads as a "green theme" rather than a neutral one, and the ember accent starts to clash. Keep neutrals under ~6% saturation.
- **Ember and crimson are close.** `--accent` and `--danger` are ~30° apart. The mandatory icon pairing is not optional polish.
- **Light-mode glass needs something behind it.** `backdrop-filter` over a flat fill renders nothing. L2/L3 translucency only pays off where content actually scrolls underneath.
- **The font swap is the main performance regression risk** — three new faces in, five Poppins files out. Measure it; do not assume it nets positive.
- **GPU cost** of grain + `backdrop-filter` together. Test on low-end hardware; honor `prefers-reduced-transparency`.
- Copy, content, routes, and SEO metadata are untouched, so no ranking regression is expected.

---

## 15. Verification

- `npm run dev` — walk all 6 routes in **both** themes plus system-default (no `data-theme` set)
- **Contrast** — verify every final pair at ≥4.5:1 (≥3:1 large text and non-text UI) with a checker, both themes. Confirm `--ink-faint` is never used for text.
- **Colorblind check** — simulate deuteranopia and protanopia; confirm `--success` vs `--danger` vs `--accent` remain distinguishable *by icon*
- **Theme toggle** — no FOUC on hard reload; survives an Astro View Transition (`astro:after-swap`)
- **Keyboard** — tab the mobile menu open → trapped → Escape → focus returns to the toggle; skip-link reachable first
- **Media queries** — `prefers-reduced-motion`, `prefers-reduced-transparency`, `prefers-contrast: more`, each toggled in DevTools
- **Responsive** — 375px and landscape; no horizontal scroll; mobile CTA reachable
- **Contact form** — blur validation per field; error visually distinct from success; toast dismissible
- `npm run build` clean; Lighthouse before/after on `/` and `/work` — bundle size must drop
