---
name: portfolio-design-system
description: 'Visual design system for Ali Zain personal portfolio and services website. Use this whenever writing, styling, or reviewing UI for this site in HTML, CSS, Tailwind, or React/JSX. Defines the Fiery Arctic Midnight palette, Fraunces plus Inter typography, spacing, component rules, and accessibility checks.'
argument-hint: 'What page, section, or component should be designed or reviewed?'
---

# Portfolio Design System - Fiery Arctic Midnight

## Outcome
Use this skill to produce or review UI that looks warm, calm, professional, and confident, with a light theme and one energetic accent.

## When to Use
- Building or editing page layouts, sections, and components for this portfolio.
- Choosing or reviewing colors, typography, spacing, borders, and shadows.
- Refactoring existing UI to match a consistent visual language.
- Auditing visual consistency and accessibility before shipping.

Triggers and keywords:
- portfolio UI, landing page, section layout, card, button, typography, color palette, design system, Tailwind classes, React component styling, visual consistency.

## Core Style Direction
- Keep surfaces light, flat, and clean.
- Use generous whitespace to create confidence and calm.
- Treat accent color as scarce and intentional.
- Avoid futuristic, neon, cyberpunk, pastel, glassy, or gradient-heavy looks.

## Color System

Use these exact values and roles. Do not repurpose tokens.

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#F6F7EB` | Page background only. Never use plain white for page background. |
| `--surface` | `#FFFFFF` | Cards, panels, raised surfaces. |
| `--ink` | `#393E41` | Main text, headings, dark section blocks, footer backgrounds. |
| `--muted` | `#6E7173` | Secondary text, captions, metadata, placeholders. |
| `--accent` | `#E94F37` | Primary CTA, links, hover/focus accents, single highlight. |
| `--accent-hover` | `#D23F28` | Hover color for accent interactive elements. |
| `--border` | `#E2E3D6` | Hairline borders, dividers, outlines. |

### Base CSS Variables

```css
:root {
  --bg: #F6F7EB;
  --surface: #FFFFFF;
  --ink: #393E41;
  --muted: #6E7173;
  --accent: #E94F37;
  --accent-hover: #D23F28;
  --border: #E2E3D6;
}
```

### Accent Budget Rule
- Accent is intentionally loud and must stay rare.
- Allow accent for: one primary CTA, links, hover/focus states, and at most one highlighted word or stat per section.
- Never use accent for large background fills or running body text.
- If the layout feels busy, reduce accent first.

### Dark Section Rule
For dark sections (footer or highlight band):
- Background: `--ink`
- Text: `--bg`
- Accent remains reserved for links or CTA only.

## Typography

Pairing:
- Headings: Fraunces
- Body and UI: Inter

### Font Import

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Inter:wght@400;500;600&display=swap">
```

```css
:root {
  --font-heading: 'Fraunces', Georgia, serif;
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;
}
```

### Type Rules
- Headings: Fraunces, weight 500-600.
- Body, nav, buttons, labels: Inter.
- Body weights: 400 and 500 only.
- Sentence case for headings and body.
- Optional hero-only styling: short Fraunces italic 400 tagline in `--accent`, used once on the page.
- Eyebrows may be uppercase only when small and letter-spaced.

Sizing guidance:
- Body text: 16-18px, line-height around 1.7.
- Heading line-height: 1.05-1.2.

## Spacing, Shape, and Layout
- Section vertical spacing: 80-120px desktop, 48-64px mobile.
- Content max-width: about 1100-1200px and centered.
- Border radius: 8px for inputs/buttons, 12px for cards.
- Borders: `1px solid var(--border)`.
- Shadows: none or one subtle card shadow only (`0 1px 3px rgba(57,62,65,0.06)`).
- No gradients, no mesh backgrounds, no glows.

## Component Patterns

### Primary Button

```css
.btn-primary {
  background: var(--accent);
  color: var(--bg);
  font-family: var(--font-body);
  font-weight: 500;
  padding: 12px 22px;
  border-radius: 8px;
  border: none;
  transition: background 0.15s ease;
}

.btn-primary:hover {
  background: var(--accent-hover);
}
```

### Secondary Button

```css
.btn-secondary {
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--ink);
  padding: 12px 22px;
  border-radius: 8px;
  font-weight: 500;
}

.btn-secondary:hover {
  background: var(--ink);
  color: var(--bg);
}
```

Rule: at most one primary accent button per section.

### Links
- Default links can use `--accent`.
- For dense text blocks, use `--ink` text with accent underline/hover treatment.

### Card

```css
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(57,62,65,0.06);
}
```

### Eyebrow Label
- Inter 500, 11-12px, uppercase, letter-spacing 0.08em, color `--muted`.

### Stat Highlight
- Value: Fraunces 600, prominent size.
- Label: Inter, small, muted.
- Only one top-priority stat per section may use accent.

## Accessibility and Contrast Rules
- `--ink` on `--bg` or `--surface` is safe for body text.
- Accent text on `--bg` is better for large/bold/interactive text than small paragraph text.
- Use visible keyboard focus indicators.

Recommended focus style:

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

## Procedure

1. Identify the surface
- Determine whether the request is page-level, section-level, or component-level.
- Determine stack: plain CSS, Tailwind, or React component styles.

2. Establish foundations first
- Apply root variables and font pairing before component-level styling.
- Set page background to `--bg` and default text to `--ink`.

3. Build hierarchy
- Add eyebrow, heading, supporting copy, and CTA in that order.
- Enforce sentence case and proper type weights.

4. Apply layout and spacing system
- Use consistent section spacing and max-width.
- Apply shape rules (8px controls, 12px cards) and soft borders.

5. Apply components with accent discipline
- Limit to one primary CTA per section.
- Keep links and highlights sparse.
- Move any large accent areas back to neutral tokens.

6. Handle branch decisions
- If section background is dark: use dark section rule.
- If UI feels noisy: reduce accent count and visual effects.
- If text density is high: prefer ink links with accent underline.

7. Validate accessibility and consistency
- Ensure readable contrast for body text.
- Ensure focus visibility is present.
- Ensure no forbidden styles are present.

## Definition of Done
- Palette uses only defined tokens and roles.
- Background is `--bg`, not plain white.
- Accent appears sparsely and intentionally.
- Typography uses only Fraunces plus Inter with correct weight usage.
- Spacing and corner radii are consistent.
- Buttons, cards, and links follow approved patterns.
- Focus states are visible and usable.
- No gradients, glows, neon, or off-brand visual motifs.

## Do and Do Not

Do:
- Let `--bg` and `--ink` carry most of the composition.
- Use accent as a precision tool.
- Keep layouts breathable with whitespace.

Do not:
- Use plain white as the full page background.
- Use accent for large fills or body paragraphs.
- Add additional font families beyond Fraunces and Inter.
- Use title case or all-caps for main headings.
- Introduce gradients, neon, glow, or heavy glass-like shadows.