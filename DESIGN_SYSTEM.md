# alizain.dev — Design System

The single source of truth for color, type, space, motion, and component behaviour on alizain.dev.

**Colour system:** Terminal Jade
**Default theme:** light (see [Open decisions](#open-decisions))
**Status:** implemented. Token layer, chrome, and shared components are on Terminal Jade site-wide; the home page is recomposed to §5's composition rule. Remaining pages carry the tokens but not yet the new composition — see [Implementation state](#implementation-state).

---

## Precedence

Three palettes exist in this project's history. Only one is current.

| Palette | Where it lives | Status |
|---|---|---|
| **Fiery Arctic Midnight** — `#f6f7eb` / `#e94f37` | removed from the codebase | **retired** |
| **Evergreen & Ember** — green neutrals / ember accent | `DESIGN-ROADMAP.md` §3, the direction mockup | **superseded** — a proposal made before Terminal Jade surfaced |
| **Terminal Jade** — `#0A1614` / `#3ED9B0` + amber | `.claude/skills/terminal-jade`, this document | **current — authoritative** |

When documents disagree, resolve in this order:

1. Ali's explicit instruction in the moment
2. **This document** and the `terminal-jade` skill (colour)
3. `DESIGN-ROADMAP.md` (composition, sequencing, audit fixes)
4. Anything else

`DESIGN-ROADMAP.md` §3 (palette) is void. The rest of that document — composition, phasing, audit fixes, the extracted design language — still stands.

---

## Open decisions

Two items where an authority conflicts. Both are one-line changes; neither blocks implementation.

### 1. Default theme — light vs dark

Ali specified **light default**. The `terminal-jade` skill specifies dark default, reasoning that technical buyers read on dark editors and dark social feeds.

**This document follows Ali's instruction: light is the canonical theme and the no-signal fallback.** The system preference is still respected, so a visitor on a dark OS gets dark.

To flip to Terminal Jade's stated default, change one line in the theme script (§3.2). Nothing else in the system depends on it.

> One consequence worth knowing: brand assets are specified dark regardless (§11). An OG image built light will lose contrast in a dark social feed.

### 2. Glow and gradient

The reference designs Ali selected (Unizen's sunrise CTA, corner glows bleeding from bento cards) conflict with Terminal Jade's prohibitions (§12): no gradient heroes, no glow in the accent hue.

**Terminal Jade wins.** Depth on this site comes from surface stepping and hairlines, not from light bloom. §7 gives the compliant substitutes that preserve the intent.

---

## 1. Principles

Seven rules. Most mistakes on this project are a violation of one of them.

1. **Never write a raw hex in a component.** Always `var(--token)`. A correct hex is still a bug — it will not flip theme.
2. **One accent per viewport fold.** If jade is on the CTA, it is not also on a nav link and a card border in the same fold. Jade means *this is the action*.
3. **Amber is metrics-only.** Stat counters, percentages, measured figures. The moment amber becomes a second button colour, the "these are real numbers" signal is dead.
4. **Elevation is lightness in dark mode, shadow in light mode.** Shadows are invisible on a dark surface — step the surface token instead.
5. **Anything filled with `--accent` takes its foreground from `--on-accent`.** No exceptions. This is the single most common dark-mode break.
6. **Colour is never the only signal.** Status, validation, and chart series always pair colour with an icon, a label, or a dash pattern.
7. **Every element earns its place.** The site's argument is *measured production engineering*. Decoration that does not carry information works against it.

---

## 2. Colour — Terminal Jade

A jade-tinted near-black canvas, one saturated jade for interaction, amber reserved exclusively for numbers. It exists to make the site read as *production engineering*, not *AI hype*.

Do not invent a colour token without following §14.

| Token | Light | Dark | Purpose |
|---|---|---|---|
| `--bg` | `#F7F9F8` | `#0A1614` | Page canvas. The `<body>`. Nothing else. |
| `--surface-1` | `#FFFFFF` | `#0F1F1C` | Cards, project tiles, form fields |
| `--surface-2` | `#E4EDEA` | `#16302B` | Code blocks, tech pills, row hover |
| `--surface-3` | `#D5E3DE` | `#1D3D36` | Dropdowns, popovers, active states |
| `--border` | `#DCE5E2` | `#23433D` | Default hairline, 1px |
| `--border-strong` | `#BDCFCA` | `#2F5A51` | Secondary button outline, emphasised divider |
| `--text-1` | `#0B1F1C` | `#E8F1EE` | Headings and body copy |
| `--text-2` | `#4A5C58` | `#9CB5AF` | Supporting paragraphs, descriptions |
| `--text-3` | `#5A6D69` | `#829C96` | Captions, timestamps, field labels |
| `--accent` | `#0E7C6B` | `#3ED9B0` | Links, primary CTA fill, focus ring, active nav |
| `--accent-hover` | `#0A5F52` | `#6BE7C4` | Hover and focus on accent surfaces |
| `--accent-bg` | `#DFF3EE` | `#12332C` | Quiet accent wash: badges, selected rows, callouts |
| `--on-accent` | `#FFFFFF` | `#04241D` | Text and icons placed *on* `--accent` |
| `--metric` | `#AB760A` | `#F0B95A` | Stat numbers only. See principle 3. |
| `--danger` | `#B4342C` | `#F08078` | Form validation errors, destructive actions |
| `--watermark` | `#BDCFCA` | `#1D3D36` | **Extension** — oversized section labels only. See §2.3. |
| `--pill-ink` | `#0B1F1C` | `#9FE1CB` | **Extension** — the label inside a tech pill, nothing else. See §2.6. |

### 2.1 The `--on-accent` trap

The token people skip, and it breaks dark mode every time.

- **Light:** the CTA is dark jade, so its label is white.
- **Dark:** the CTA is bright mint jade, so its label is near-black `#04241D`.

Hardcoding white button text gives white-on-mint at ~1.6:1 in dark mode — illegible.

### 2.2 Where each colour may appear

| Colour | May appear on | Must never appear on |
|---|---|---|
| `--accent` | primary CTA fill, inline prose links, focus rings, active nav, eyebrow labels, single-series charts | card borders by default (reads as "selected"), a second button in the same fold, any glow or `box-shadow` |
| `--metric` | stat counters, percentages, `results.json` values, the third chart category | buttons, links, borders, icons, headings, body text |
| `--danger` | field validation, destructive confirmation | anything decorative, "urgency" styling |
| `--watermark` | the oversized section label and nothing else | text intended to be read |

### 2.3 Why `--watermark` exists

The design language uses an oversized, low-contrast section name as a structural anchor. In light mode that wants `#BDCFCA`; in dark it wants `#1D3D36`. Those are different existing tokens per theme, which would force a raw hex or a `dark:` variant — both prohibited.

It is derived from the jade neutral family, defined in both themes, and has exactly one stated purpose. It sits **below** text contrast thresholds by design and must never carry information that has to be read — the accessible section name is the `<h2>` beside it.

### 2.4 Success states

There is no `--success` token and none is needed. Jade *is* the affirmative green: the "Available for work" dot, the "Live" badge, and form success all use `--accent` paired with an icon (principle 6).

### 2.5 What changed from the legacy palette

| Legacy (`global.css:9-22`) | Became |
|---|---|
| `--bg: #f6f7eb` | `--bg` (jade-tinted, theme-aware) |
| `--surface: #ffffff` | `--surface-1` |
| `--ink: #393e41` | `--text-1` |
| `--muted: #6e7173` | `--text-2` / `--text-3`, split by role |
| `--accent: #e94f37` | `--accent` (jade) — **the ember accent is retired** |
| `--accent-hover: #d23f28` | `--accent-hover` |
| `--border: #e2e3d6` | `--border` / `--border-strong`, split by role |
| — | `--surface-2`, `--surface-3`, `--accent-bg`, `--on-accent`, `--metric`, `--danger`, `--watermark` are new |

`--muted` and `--border` each did two jobs; splitting them is what makes the elevation scale in §7 possible.

### 2.6 `--pill-ink` and the two corrected values

Three values in this table differ from the `terminal-jade` skill. All three are measured failures of §13's contrast contract, corrected inside the jade/amber hue families; the skill's other 14 values are unchanged.

| Token | Skill value | Shipped value | Why |
|---|---|---|---|
| `--metric` light | `#E0A32E` | `#AB760A` | `#E0A32E` is **2.1:1** on `--bg` and **1.86:1** on `--surface-2`. Its stated purpose is 26px+ figures, so the threshold is 3:1 (large text) — it missed by a wide margin. `#AB760A` measures 3.73 / 3.30 / 3.94:1 on `--bg` / `--surface-2` / `--surface-1`. |
| `--text-3` light | `#7B8D89` | `#5A6D69` | `#7B8D89` is **3.3:1** on `--bg`. `--text-3` carries 11px labels — small text, 4.5:1 required. `#5A6D69` measures 5.19 / 4.60:1 on `--bg` / `--surface-2`. |
| `--text-3` dark | `#6D8781` | `#829C96` | Passed on `--bg` (4.78:1) but only **3.64:1** on the dark `--surface-2` band, where the metric labels live. `#829C96` measures 6.28 / 4.79:1. |

`--pill-ink` is an extension made for the same reason `--watermark` was: the skill's tech-pill recipe specifies `--text-1` in light and a literal `#9FE1CB` in dark, and a literal in a component is prohibited by principle 1. One token, one stated purpose, defined in both themes.

Tertiary text now sits closer to `--text-2` in lightness, so the tertiary signal is carried by size, casing, and the mono family rather than by contrast alone — which is where it should sit anyway.

---

## 3. Implementation

### 3.1 CSS variables

Light on bare `:root` — it is the canonical theme and the no-JS fallback. Dark under the attribute.

```css
:root {
  --bg: #F7F9F8;
  --surface-1: #FFFFFF;
  --surface-2: #E4EDEA;
  --surface-3: #D5E3DE;
  --border: #DCE5E2;
  --border-strong: #BDCFCA;
  --text-1: #0B1F1C;
  --text-2: #4A5C58;
  --text-3: #5A6D69;
  --accent: #0E7C6B;
  --accent-hover: #0A5F52;
  --accent-bg: #DFF3EE;
  --on-accent: #FFFFFF;
  --metric: #AB760A;
  --danger: #B4342C;
  --watermark: #BDCFCA;
  --pill-ink: #0B1F1C;
  --shadow-card: 0 1px 2px rgb(11 31 28 / 0.04), 0 4px 12px rgb(11 31 28 / 0.06);
}

[data-theme="dark"] {
  --bg: #0A1614;
  --surface-1: #0F1F1C;
  --surface-2: #16302B;
  --surface-3: #1D3D36;
  --border: #23433D;
  --border-strong: #2F5A51;
  --text-1: #E8F1EE;
  --text-2: #9CB5AF;
  --text-3: #829C96;
  --accent: #3ED9B0;
  --accent-hover: #6BE7C4;
  --accent-bg: #12332C;
  --on-accent: #04241D;
  --metric: #F0B95A;
  --danger: #F08078;
  --watermark: #1D3D36;
  --pill-ink: #9FE1CB;
  --shadow-card: none;
}
```

`--shadow-card: none` in dark is deliberate — see principle 4.

### 3.2 Theme switching

Blocking inline script in `<head>`, before any paint, so there is no flash of the wrong theme. This replaces the preloader script currently at `src/layouts/Layout.astro:101-117`.

```html
<script is:inline>
  const stored = localStorage.getItem('theme');
  const system = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = stored ?? system;
</script>
```

**This is the light-default line.** To follow Terminal Jade's stated dark default, invert the query:
`matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'`.

Re-apply on `astro:after-swap` — View Transitions are enabled and will otherwise drop the attribute.

### 3.3 Tailwind

Expose the variables once; every utility then flips automatically.

```css
@theme {
  --color-bg: var(--bg);
  --color-surface-1: var(--surface-1);
  --color-surface-2: var(--surface-2);
  --color-surface-3: var(--surface-3);
  --color-border: var(--border);
  --color-text-1: var(--text-1);
  --color-text-2: var(--text-2);
  --color-accent: var(--accent);
  --color-on-accent: var(--on-accent);
  --color-metric: var(--metric);
}
```

**Never write `dark:` variants for palette colours.** `dark:bg-teal-900` is how a palette drifts out of sync. `dark:` is reserved for structural changes only — `dark:shadow-none`, `dark:border-2`.

### 3.4 Theme-colour meta

Both values, or mobile Safari renders the wrong chrome. Currently `Layout.astro:30` ships one hardcoded light value.

```html
<meta name="theme-color" content="#F7F9F8" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0A1614" media="(prefers-color-scheme: dark)">
```

---

## 4. Typography

Four roles. Poppins is retired — it is the strongest "template" signal on the current site, and five weight files load on every page.

| Role | Face | Used for |
|---|---|---|
| Display | heavy grotesque variable — Instrument Sans, Archivo, or Space Grotesk | `h1`–`h2` at 700–800 |
| Body / UI | **Inter Variable** — already installed, keep | prose, labels, controls |
| Data | JetBrains Mono Variable → `--font-mono` | metrics, index markers, diagram labels, tech pills, timestamps |
| Editorial | Instrument Serif *Italic* | exactly one word in the hero. Loaded only where used. |

Confirm Fontsource availability before committing. Subset to latin. Measure the result — three faces in, five Poppins files out is not automatically a net win.

### 4.1 Scale and tracking

Tracking is size-specific. The current site applies one `-0.025em` to `h1` through `h4`, which is wrong at both ends.

| Step | Size | Weight | Tracking | Leading |
|---|---|---|---|---|
| display-xl | `clamp(2.35rem, 5vw, 3.75rem)` | 800 | `-0.035em` | 1.0 |
| display-l | `clamp(1.85rem, 3.4vw, 2.8rem)` | 800 | `-0.028em` | 1.07 |
| watermark | `clamp(3.2rem, 8vw, 5.6rem)` | 800 | `-0.04em` | 1.0 |
| h3 | `1.28rem` | 700 | `-0.015em` | 1.22 |
| body-l | `1.07rem` | 400 | `0` | 1.6 |
| body | `1rem` | 400 | `0` | 1.6 |
| label | `0.75rem` | 500 | `+0.02em` | 1.4 |
| mono-label | `0.68rem` | 500 | `+0.09em` | 1.4 |

Uppercase is permitted in exactly two places: the eyebrow/section label and mono labels. Nowhere else.

**One scale break, and it stays under `display-xl`.** `.head-bar h2` is the emphasised section entrance at `clamp(2.1rem, 4.4vw, 3.35rem)`. It sits above `display-l` and below `display-xl` on purpose: a mid-page heading must never outrank the page `h1`. It was briefly set to `clamp(2.6rem, 6.6vw, 5rem)`, which rendered larger than the `h1` on the same page, and that inversion is what made pages feel shouty.

### 4.2 Numerals

- `font-variant-numeric: tabular-nums` on every metric, table cell, and countdown
- Units and denominators one step smaller and one weight lighter than the figure — `12,412`*docs*, `2,340`/*8000*
- Index markers (`//001`) in `--font-mono` at `--text-3`

### 4.3 Measure

Body copy 60–75 characters. Card copy may run shorter. Never set a paragraph edge-to-edge across the 1160px container.

---

## 5. Space, radii, layout

**Spacing scale** — 4px base, used for padding, gaps, and section rhythm. No arbitrary values.

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96`

**Section rhythm:** `--section-y`, `clamp(2.9rem, 5.4vw, 5rem)` vertical. **Container:** `1160px`, gutter `clamp(1.25rem, 5vw, 2.5rem)`.

**Radii**

| Token | Value | Applied to |
|---|---|---|
| `--r-control` | `8px` | buttons, inputs, icon buttons |
| `--r-card` | `12px` | cards, project tiles, code blocks |
| `--r-panel` | `20px` | large panels, CTA band |
| `--r-pill` | `999px` | badges, tags, status chips, filter tabs |

**Breakpoints:** `640px` · `900px` · `1200px`. Mobile-first; layout never depends on a max-width query.

**Composition rule.** Sections do not all share one shape. A page alternates: a bento row with mixed spans, then a wide-plus-narrow row, then a full-bleed band. A uniform grid of identical cards repeated down the page is the failure mode this system exists to prevent.

---

## 6. Elevation and material

Four levels, mapped directly onto the surface tokens. The mechanism differs by theme (principle 4).

| Level | Token | Light | Dark | Used for |
|---|---|---|---|---|
| **L0** | `--bg` | flat | flat | page canvas |
| **L1** | `--surface-1` | `--shadow-card` + `--border` hairline | lighter surface + `--border`, **no shadow** | cards, tiles, form fields |
| **L2** | `--surface-2` | slightly recessed | lighter still | code blocks, pills, row hover |
| **L3** | `--surface-3` | strongest step | lightest | dropdowns, popovers, active states |

Floating chrome (sticky nav) is the one translucent surface: `--bg` at ~82% with `backdrop-filter: blur(18px) saturate(180%)`, content scrolling underneath, and a `--border` hairline that appears only once scrolled. Honour `prefers-reduced-transparency` by going opaque.

Never stack two translucent surfaces. Never put a shadow on a dark-mode surface.

---

## 7. Depth without glow

The selected references get their depth from radial glow and gradient bleed. Terminal Jade prohibits both (§12). These are the substitutes — same intent, compliant execution.

| Reference effect | Substitute |
|---|---|
| Corner glow bleeding from a bento card | Step the card to `--surface-2` and give it a `--border-strong` hairline. One card per fold, the same "this one matters" signal, no bloom. |
| Sunrise gradient behind the CTA band | Solid `--surface-2` panel with a `--border-strong` edge and generous internal space. If depth is still needed: a linear from `--bg` to `--surface-1` at **under 4% lightness delta** — nothing stronger. |
| Neon accent glow on hover | `border-color` moves `--border` → `--border-strong`, plus a 3px `translateY`. |
| Starfield / moving background | A static dotted grid at `--border` colour, `22px` pitch, masked to fade at the edges. Behind diagrams only, never page-wide. |

Film grain is permitted — it is achromatic texture, not colour. Keep it at `opacity: .04` or below, `mix-blend-mode: overlay`, `pointer-events: none`, and dark theme only.

---

## 8. Motion

GSAP, ScrollTrigger, and Lenis are removed (~90KB). Motion is CSS-first with a small spring helper only where velocity genuinely matters.

**Tokens**

| Token | Value | Use |
|---|---|---|
| `--spring-ui` | critically damped, ~0.35s response | default for everything |
| `--spring-momentum` | ~0.8 damping, ~0.35s response | only after a gesture carried momentum |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | non-spring transitions |

`--ease-out` is currently referenced three times in `global.css` but **never declared** — it silently resolves to plain `ease`. Declaring it is part of this system.

**Rules**

- **Feedback on pointer-down, not release.** `:active { transform: scale(.97) }` at 100ms on every interactive element. The codebase currently has zero `:active` rules; this is the largest perceived-quality gain per line of code in the whole system.
- **Cap two animated elements per viewport.** One fade-up applied to sixty elements is why the current site feels mechanical.
- **Three reveal variants, not one:** section headers fade + 12px rise; grid items stagger at 40ms, scale `.98 → 1`; data graphics draw in or count up.
- **Enter and exit along the same path.** A panel that slides in from the right dismisses to the right. Menus and popovers originate from their trigger via `transform-origin`.
- **Nothing blocks input.** Every animation is interruptible; no transition locks the UI.
- **Theme switch cross-fades.** No abrupt brightness jump.
- `prefers-reduced-motion: reduce` replaces movement with a short opacity fade and drops all overshoot.

---

## 9. Components

Follow these rather than improvising. Every colour pairing is contrast-verified (§13).

### 9.1 Core

| Component | Recipe |
|---|---|
| **Primary button** — one per fold | `background: var(--accent)` · `color: var(--on-accent)` · hover `--accent-hover` · `--r-control` · no border |
| **Secondary button** | transparent · `color: var(--text-1)` · `1px solid var(--border-strong)` · hover `background: var(--surface-2)` |
| **Card / project tile** | `--surface-1` · `1px solid var(--border)` · `--r-card` · `box-shadow: var(--shadow-card)` · hover `border-color: var(--border-strong)`. Never a jade border by default — that reads as "selected". |
| **Tech pill** | `--surface-2` · `--font-mono` · 11–12px · `--r-pill` · label `--text-1` in light, `#9FE1CB` in dark so the pill does not go muddy |
| **Inline prose link** | `color: var(--accent)` · underline at `text-underline-offset: 3px` · hover `--accent-hover`. **Keep the underline** — jade alone is not sufficient distinction at body size. |
| **Focus ring** | `outline: 2px solid var(--accent)` · `outline-offset: 2px`. Never `outline: none` without a replacement. |
| **Eyebrow / section label** | `color: var(--accent)` · 11px · `+0.08em` · uppercase · preceded by a 22px accent rule |
| **Badge / callout** | `background: var(--accent-bg)` · `color: var(--accent)` at 12px+; below that use `--text-1` |
| **Field** | `--surface-1` · `1px solid var(--border)` · focus `border-color: var(--accent)` + 3px `--accent-bg` ring · error `border-color: var(--danger)` + message below the field, icon-paired |

### 9.2 Technical detailing

The layer that makes the site read as engineering rather than marketing. Cheap to build, highest signal per hour.

| Pattern | Spec |
|---|---|
| **Stat counter** | Label `--text-3`, 11px mono. Figure `--metric`, 26px+, tabular. The only place `--metric` appears. |
| **Metric list row** | `--metric` figure → uppercase mono label → hairline rule with a proportional `--accent` fill → right-aligned `//00N` index in `--text-3` |
| **Section watermark** | 22px accent rule, then the section name at watermark scale in `--watermark`. Decorative — the readable heading sits beside it. |
| **KPI tile** | `--surface-2` fill · status pill top-right (`--accent-bg`/`--accent`) · figure with lighter-weight unit · delta row with an arrow icon and signed value |
| **Delta indicator** | arrow glyph + signed percentage. `--accent` for improvement, `--danger` for regression, `--text-3` for flat. Always icon-paired. |
| **Status pill** | dot + label at `--r-pill`. Available/Live uses `--accent`. |
| **Icon-button CTA** | `--r-control` square filled `--accent`, icon in `--on-accent`, label *beside* it in `--text-1` |
| **Filter pills** | active: `--surface-1` + `--shadow-card`; inactive: transparent, `--text-2` |
| **Metadata sidebar** | key/value rows on `--surface-1`, keys `--text-3`, values `--text-1`, tag groups as pills |

Numbering (`//001`, `STEP 01`) is only permitted where the content genuinely is a sequence or a stable index — the process steps and the measured-results list qualify. Do not apply it decoratively.

### 9.3 Code blocks

Base on `--surface-2` with a `--border` hairline. Register as a custom Shiki/Expressive Code theme pair — stock themes ship their own background and will fight the surface token.

| Token type | Light | Dark |
|---|---|---|
| Plain | `#0B1F1C` | `#E8F1EE` |
| Keyword | `#0A5F52` | `#6BE7C4` |
| String | `#8A5A12` | `#F0B95A` |
| Comment | `#7B8D89` | `#6D8781` |
| Function | `#1A5C7A` | `#7FC4E0` |
| Number | `#9C4520` | `#F0A07A` |
| Operator | `#4A5C58` | `#9CB5AF` |

---

## 10. Data visualisation

The site shows measured results, so charts must look measured.

- **Single series** — jade only. `--accent` for the mark, `--text-3` for axis ticks, `--border` for gridlines. No legend; the title names it.
- **Two series** — `--accent` plus `--text-2`. The muted one is context. Do not introduce a second hue.
- **Emphasis** — when one bar is the point, colour it `--accent` and everything else `--text-3`. This beats categorical colour almost every time.
- **Three or more** — jade → `#1A5C7A` (steel) → `--metric` (amber), in that order, and stop. Past three categories, use a table.
- **Never colour-only.** Pair with direct labels, dash patterns, or icons.
- **Canvas cannot read CSS variables.** Read them once with `getComputedStyle(document.documentElement).getPropertyValue('--accent')` and re-read on theme change.
- Charts respect `prefers-reduced-motion` — data is readable immediately, entrance animation is optional.

---

## 11. Brand assets

- **OG image** — build in **dark mode** regardless of the site's default theme. Social feeds are predominantly dark; a `#0A1614` card with a jade accent stops the scroll where a light one does not. Regenerate `og-default.png` whenever the palette changes.
- **Favicon** — jade on transparent, never jade on white. It must stay legible against both a light and a dark browser tab strip.
- **Email and plain-text contexts** — no CSS variables available. Use the **light** literals, since most clients still render light.

---

## 12. Prohibited

- **Raw hex in a component.** Outside `:root`, `[data-theme="dark"]`, and the syntax-highlight theme file, there are no hex values.
- **Gradient heroes.** They look excellent as poster art and band visibly across a 1440px hero. Maximum permitted: `--bg` → `--surface-1` at under 4% lightness delta.
- **Glow, neon, or `box-shadow` in jade.** `box-shadow: 0 0 20px var(--accent)` is the fastest way to make the site read as an AI demo.
- **Shadows in dark mode.** Step the surface token instead.
- **Purple and indigo, anywhere.** The crowded default of this market; the point of jade is not being it.
- **Fully saturated cyan or mint** (`#00BFA6`, `#7DE2DF` and neighbours). They fail contrast on dark and vibrate optically.
- **A third accent.** There is jade and there is amber. Steel `#1A5C7A` exists for charts only.
- **`dark:` variants on palette colours.** Structural changes only.
- **Colour as the only signal.** Ever.
- **Decorative page furniture** — preloaders, custom cursors, magnetic buttons, scroll hijacking. All four are being removed; none return.

---

## 13. Accessibility contract

Non-negotiable, verified before any coloured surface ships.

- Body text ≥ **4.5:1** against its surface; large text and non-text UI ≥ **3:1**
- Every interactive element has a visible focus ring in both themes
- Every interactive element has a `:active` state
- Touch targets ≥ **44×44px**, with ≥ 8px between them
- Modals and menus trap focus, move focus in on open, return it to the trigger on close, and set the background `inert`
- Form errors sit beside the field they describe, use `--danger`, carry an icon, and are announced via `aria-live`
- `prefers-reduced-motion`, `prefers-reduced-transparency`, and `prefers-contrast: more` are all handled
- Headings run sequentially; the watermark is not a heading

**Known-good contrast values — verified, do not re-derive:**

| Pair | Ratio |
|---|---|
| `#FFFFFF` on `#0E7C6B` — light CTA | 5.1:1 |
| `#04241D` on `#3ED9B0` — dark CTA | ~9.8:1 |
| `#3ED9B0` on `#0A1614` — dark accent text | 10.5:1 |
| `#0B1F1C` on `#F7F9F8` — light body | ~15.4:1 |
| `#E8F1EE` on `#0A1614` — dark body | ~14.9:1 |
| `#4A5C58` on `#F7F9F8` — light secondary | ~7.2:1 |
| `#9CB5AF` on `#0A1614` — dark secondary | ~8.1:1 |
| `#AB760A` on `#F7F9F8` — light metric figure | 3.73:1 |
| `#AB760A` on `#E4EDEA` — light metric on band | 3.30:1 |
| `#F0B95A` on `#16302B` — dark metric on band | 7.90:1 |
| `#5A6D69` on `#F7F9F8` — light tertiary | 5.19:1 |
| `#5A6D69` on `#E4EDEA` — light tertiary on band | 4.60:1 |
| `#829C96` on `#16302B` — dark tertiary on band | 4.79:1 |
| `#0A5F52` on `#DFF3EE` — light badge label | 6.56:1 |
| `#6BE7C4` on `#12332C` — dark badge label | 9.02:1 |
| `#9FE1CB` on `#16302B` — dark pill label | 9.46:1 |

**One pairing to avoid:** `--accent` as *small* text on `--surface-2` is 4.28:1 in light mode. Eyebrows, badges, and status pills therefore take `--accent-hover`, which measures 6.35:1 there. `--accent` at body size on `--bg` (4.83:1) and on `--surface-1` (5.1:1) is fine.

---

## 14. Extending the system

A token without a stated purpose becomes a token used everywhere, and that is how a system dies. Before adding one:

1. Check whether an existing token can do the job. It usually can.
2. If not, derive the new colour from the jade hue family. Do not import an unrelated one.
3. Define **both** light and dark values and check both at 4.5:1.
4. Add it to the table in §2 with a single stated purpose and a "may not appear on" row in §2.2.
5. Tell Ali what was added and why.

`--watermark` (§2.3) is the only extension made so far, and it followed this procedure.

---

## 15. Verification checklist

Run before shipping any coloured surface.

**Colour**
- [ ] Zero raw hex outside `:root`, `[data-theme="dark"]`, and the syntax theme
- [ ] Both themes read end-to-end, including hover, focus, active, and disabled
- [ ] Everything filled with `--accent` takes its foreground from `--on-accent`
- [ ] Exactly one primary button per fold
- [ ] `--metric` appears only on numbers
- [ ] No shadows render in dark mode
- [ ] No glow, no gradient hero

**Type and layout**
- [ ] Tracking varies by size step; no single value spans `h1`–`h4`
- [ ] Metrics use `tabular-nums`
- [ ] Body measure 60–75 characters
- [ ] Sections do not all share one shape

**Behaviour**
- [ ] Focus rings visible in both themes
- [ ] Every interactive element has `:active`
- [ ] Theme survives a hard reload with no flash, and an Astro View Transition
- [ ] Keyboard: menu opens → traps → Escape → focus returns to the trigger
- [ ] `prefers-reduced-motion`, `prefers-reduced-transparency`, `prefers-contrast` each toggled in DevTools
- [ ] 375px and landscape: no horizontal scroll, primary CTA reachable

**Build**
- [ ] `npm run build` clean
- [ ] Lighthouse before/after on `/` and `/work`; bundle size must drop

---

## Implementation state

**Shipped**

- Token layer (`src/styles/global.css`) — both themes, type scale with size-specific tracking, 4px spacing scale, radii, motion tokens including the previously undeclared `--ease-out`
- Theme mechanics — blocking inline script, `data-theme` on `<html>`, re-applied on `astro:after-swap`, paired `theme-color` meta, toggle in the nav
- Type — Poppins removed; Archivo Variable (display), Inter Variable (body), JetBrains Mono Variable (data), Instrument Serif Italic (one hero word, loaded only on `/`)
- Motion — GSAP, ScrollTrigger and Lenis removed (~100KB of JS); reveals are ~70 lines of IntersectionObserver; `:active` press feedback on every interactive element
- Decorations removed — preloader, custom cursor, magnetic buttons, scroll hijack
- Chrome — `Nav` with theme toggle, focus trap, `inert` background, mobile CTA; `Footer` rebuilt on surface tokens (it was `background: var(--text-1)`, which inverts to white in dark mode)
- Components — `Button`, `Section` (`tone="band"` replaces `dark`), `Eyebrow`, `CtaBand` (new, shared by four pages), `LiveBadge`, `PostCard`, `CategoryFilter`, `Pagination`
- `/` recomposed — spec-sheet hero + metric strip, stack band, 7/5 · 5/7 service bento with payload graphics, feature card + index list for work, process spine on a dotted grid, Results as the watermark + metric-list pattern, metadata rail in About, panel CTA
- Zero raw colour values outside the token layer, verified by grep

**Not yet done**

- Composition of `/work`, `/services`, `/about`, `/contact`, `/blog`, `/blog/[slug]` — these render correctly on the new tokens and share the new chrome, but still use the uniform "eyebrow → h2 → lede → equal card grid" shape §5 warns against
- The proof surfaces in §9 of `DESIGN-ROADMAP.md` — comparison table (`/services`), metadata sidebar (`/blog/[slug]`), layered screenshot treatment (`/work`)
- Tinted icon squares on `/services` — the pattern the home bento replaced
- Contact form: blur-level validation and a toast dismiss button. The toast's error colour bug is fixed (it was filling with the brand accent, so a failure looked like a success)
- `astro:assets` migration — images still ship from `public/` with a manual `-sm.webp` srcset
- Code-block theme (§9.3) — not yet registered as a Shiki theme pair
- `og-default.png` — must be regenerated for the new palette (§11)

## Related documents

- **`.claude/skills/terminal-jade`** — the colour skill this document implements. If the two ever disagree, the skill wins on colour.
- **`DESIGN-ROADMAP.md`** — composition, phasing, and the audit findings. Its §3 palette is superseded by this document; everything else stands.
