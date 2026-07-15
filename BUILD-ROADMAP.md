# Build Roadmap — Ali Zain · AI Engineer (Service Website)

**Type:** Service-based + portfolio site. **Vibe:** SaaS / startup / premium personal brand.
**No auth, no login, no dashboard.** Contact happens via form + email + phone only.
**Pairs with:** `portfolio-design-system` skill (Fiery Arctic Midnight palette, Fraunces + Inter).
Colors and fonts are defined there — this file covers architecture, pages, tech, SEO, and motion.

Guiding feel: calm, confident, professional, with a few premium interactions that signal
"this person builds polished things." Never neon/cyberpunk. Visibility over decoration.

---

## Phase 0 — Tech Stack (fast + SEO-first)

Pick this stack unless there's a strong reason not to. It's optimized for speed, SEO, and clean animation.

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Astro** (islands architecture) | Ships ~0 JS by default → top Lighthouse/SEO; static output; add interactivity only where needed. |
| Styling | **Tailwind CSS** + the palette CSS vars | Fast, consistent, tiny production CSS. Map tokens to Tailwind theme. |
| Animation | **GSAP + ScrollTrigger** (free) + **Lenis** (smooth scroll) + custom vanilla cursor | Industry-standard, buttery, controllable. Lenis gives the premium "weighted" scroll feel. |
| Page transitions | **Astro View Transitions** (built-in) | Seamless cross-page fades/slides — feels app-like, no SPA cost. |
| Icons | **Lucide** (via `astro-icon`) | Clean, consistent line icons. |
| Fonts | Fraunces + Inter, self-hosted via `@fontsource-variable` | No layout shift, no third-party request, `font-display: swap`. |
| Contact form | **Web3Forms** (free access key, no backend) — or Formspree | Works on static sites, spam protection, email delivery. |
| Hosting | **Vercel** (or Cloudflare Pages / Netlify) | Free tier, Git-push CI, edge CDN, great with Astro. |
| Analytics (optional) | Plausible or Vercel Analytics | Privacy-friendly, lightweight, won't hurt Core Web Vitals. |

> **Alternative:** If you strongly prefer the React ecosystem, use **Next.js (App Router, static export)** + Tailwind + **Framer Motion** + Lenis. Same page list and SEO rules apply. Astro is the recommended default because it's faster out of the box for a content/marketing site.

**Step 0.1** — Scaffold: `npm create astro@latest`, add integrations: `@astrojs/tailwind`, `astro-icon`, `@astrojs/sitemap`. Enable View Transitions.
**Step 0.2** — Install: `gsap`, `lenis`, `@fontsource-variable/fraunces`, `@fontsource-variable/inter`.
**Step 0.3** — Wire palette tokens into `tailwind.config` (colors: bg, surface, ink, muted, accent, accent-hover, border) and drop the `:root` CSS vars in a global stylesheet.

---

## Phase 1 — Information Architecture (Pages)

Keep it lean. These are the essential pages:

1. **Home** `/` — the pitch. Overview of who Ali is, what he builds, proof, and a clear CTA.
2. **Services** `/services` — detailed breakdown of offerings + deliverables + outcomes.
3. **Work** `/work` — project/case-study grid. Optionally individual case pages `/work/[slug]`.
4. **About** `/about` — story, experience, skills, approach, certifications.
5. **Contact** `/contact` — form + email + phone + links. (No auth.)
6. **Blog / Writing** `/blog` *(recommended for SEO, can ship in a later phase)* — short technical posts on AI tooling, RAG, agents. Big long-term SEO lever; start with 2–3 posts.

Utility pages: `404`, and thin legal pages (`/privacy`) if you add analytics or a form.

**Navigation:** Logo/wordmark (left) · Work · Services · About · Blog · **Contact (accent button, right)**. Sticky, condenses/hides-on-scroll-down + reveals-on-scroll-up. Mobile: hamburger → full-screen overlay menu with staggered link reveal.

**Footer (global):** short tagline, quick nav, email + phone (click-to-copy / `mailto:` / `tel:`), social links (GitHub, LinkedIn), "Available for work" status pill, copyright. Dark block using `--ink` bg + `--bg` text.

---

## Phase 2 — Global Elements & Layout Shell

Build these once; every page inherits them.

- **Base layout** (`Layout.astro`): `<head>` SEO block (see Phase 5), font preloads, global CSS, Lenis + GSAP + cursor init, `<slot/>`, footer. Wrap with View Transitions.
- **Semantic landmarks:** `<header>`, `<main>`, `<footer>`, `<nav>`. Exactly one `<h1>` per page.
- **Cursor dot** (Phase 4) — mounted globally in the layout.
- **Reusable components:** `Button` (primary/secondary), `Section` wrapper (consistent vertical rhythm), `Card`, `Eyebrow` label, `StatBlock`, `Marquee`, `ContactForm`, `Nav`, `Footer`, `SEO`.
- **Container:** max-width ~1160px, centered, responsive gutters.

---

## Phase 3 — Page Content & Sections

### 3.1 Home `/`
Order top → bottom:
1. **Hero** — big Fraunces headline (e.g. "AI systems that do real work.") + one-line Fraunces *italic accent* tagline + subtext (1–2 lines) + primary CTA ("Start a project") + secondary ("See the work"). Optional supporting visual on the right: a clean, flat product-style card (like a mini "results" panel) — no gradients.
2. **Trust bar** — small row: "1.5+ yrs · LLM & RAG · FastAPI · Automation" or logos of tools (OpenAI, Anthropic, LangGraph, Docker, AWS) as a subtle infinite **marquee**.
3. **Services overview** — 3–5 cards summarizing offerings, each linking to `/services`.
4. **Selected work** — 3–4 featured projects (image/visual, title, 1-line outcome, tags). Link to `/work`.
5. **Process** — 3–4 steps (Discover → Build → Ship → Iterate) with short copy. Good place for a pinned/scroll animation.
6. **Results / metrics** — animated counters: 90% workload reduction, 98% model accuracy, 70% faster processing (pull real numbers from résumé). One number may use the accent.
7. **About snippet** — 2–3 sentences + photo/avatar + link to `/about`.
8. **Final CTA band** — dark `--ink` block, headline + accent button to `/contact`.

### 3.2 Services `/services`
- Intro: what Ali does and who it's for.
- **Service blocks** (each = heading + what it is + what you get + typical outcome):
  - LLM Applications & RAG systems (chatbots, knowledge search, retrieval pipelines)
  - Agentic workflows & automation (multi-step agents, tool-calling, orchestration)
  - AI-powered backends & APIs (FastAPI, integrations, data pipelines)
  - Document/data intelligence (OCR, extraction, classification)
  - Deployment & MLOps (Docker, cloud deploy, monitoring)
- Optional "How we'd work together" (engagement model) + FAQ.
- CTA to `/contact` at the bottom.

### 3.3 Work `/work`
- Grid of project cards (filter chips optional: "LLM", "RAG", "Automation", "ML").
- Each card: visual, title, tags, 1-line result. Hover → cursor morph + subtle card lift/tilt.
- Real projects to include: Real-estate document pipeline, Banking OCR→S3 pipeline, Timesheet→payroll, Smart Invoice Classifier (98%), RAG Fashion Bot, AI SEO-Blog Generator, Fraud Detection Classifier, Outbound voice-calling system.
- **Optional case pages** `/work/[slug]`: problem → approach → stack → outcome. Great for SEO depth.

### 3.4 About `/about`
- Headline + short narrative (who, what, the through-line: building AI that reduces real work).
- **Experience timeline** (Intalytic Group, etc.) — animated on scroll.
- **Skills** grouped: AI/ML, Backend & Tools, Infra.
- **Approach / principles** (3–4 short beliefs).
- **Certifications** (ML Specialization, RAG, Azure AI Fundamentals).
- CTA to contact.

### 3.5 Contact `/contact`
- Short heading ("Let's build something.") + response-time note.
- **Form fields:** Name, Email, Company (optional), Service interested in (select), Budget (optional select), Message. Include a hidden honeypot field for spam. Client + server-side (Web3Forms) validation, clear success/error states.
- **Direct methods:** email (`mailto:` + click-to-copy), phone (`tel:`), GitHub, LinkedIn.
- No login, no account creation — ever.

---

## Phase 4 — Animations & Interactions (the differentiators)

Goal: a handful of *premium, purposeful* motions — not a zoo of effects. Everything must respect `prefers-reduced-motion` (disable/soften when set) and never block content or hurt performance.

### 4.1 Fluid cursor dot (site-wide) — REQUIRED
A dot that trails the pointer with a slight delay and **deforms toward the direction of movement** (stretches + tilts like a fluid droplet). Works for mouse and touch. Uses `mix-blend-mode: difference` so it stays visible on cream, ink, and coral alike.

```html
<!-- in Layout, once -->
<div id="cursor" aria-hidden="true"></div>
```

```css
#cursor{
  position: fixed; top: 0; left: 0;
  width: 14px; height: 14px; border-radius: 50%;
  background: #fff;                 /* inverts against any bg via blend */
  mix-blend-mode: difference;
  pointer-events: none; z-index: 9999;
  transform: translate(-50%, -50%);
  will-change: transform;
}
@media (prefers-reduced-motion: reduce){ #cursor{ display:none; } } /* restore native cursor */
@media (hover: none){ #cursor{ display:none; } } /* optional: hide on pure-touch */
```

```js
// cursor.js — import once, call after DOM ready (and re-init on Astro page swap)
export function initCursor(){
  const dot = document.getElementById('cursor');
  if(!dot || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let tx = innerWidth/2, ty = innerHeight/2;   // target (pointer)
  let x = tx, y = ty, px = x, py = y;          // eased + previous
  const ease = 0.15;                           // lower = more delay/trail

  const move = (cx, cy) => { tx = cx; ty = cy; };
  addEventListener('mousemove', e => move(e.clientX, e.clientY));
  addEventListener('touchmove', e => { const t=e.touches[0]; if(t) move(t.clientX, t.clientY); }, {passive:true});

  const raf = () => {
    x += (tx - x) * ease;  y += (ty - y) * ease;
    const vx = x - px, vy = y - py;            // velocity
    const speed = Math.min(Math.hypot(vx, vy), 60);
    const angle = Math.atan2(vy, vx) * 180 / Math.PI;
    const stretch = speed / 60;                // 0..1
    const sx = 1 + stretch * 0.6;              // elongate along motion
    const sy = 1 - stretch * 0.3;              // squash perpendicular
    dot.style.transform =
      `translate(${x}px, ${y}px) translate(-50%,-50%) rotate(${angle}deg) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`;
    px = x; py = y;
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}
```

- **Contextual morph:** on hover of `a`, `button`, or any `[data-cursor="view"]`, grow the dot into a ring (and optionally show a small label like "View"). Add/remove a class on those `mouseenter/leave`.
- **Astro note:** re-run `initCursor()` on `astro:page-load` so it survives View Transitions.
- Tune `ease` (delay amount) and the `0.6 / 0.3` factors (fluidity) to taste.

### 4.2 Magnetic interactive elements
Primary buttons and nav links gently pull toward the cursor when it's near, then spring back. Subtle (max ~8–12px offset). Adds a tactile, "alive" feel. Disable on touch / reduced-motion.

### 4.3 Masked text reveals (on scroll)
Headlines and key lines reveal line-by-line via `clip-path`/`translateY` inside an `overflow:hidden` mask, triggered by ScrollTrigger. Feels editorial and modern — not the generic fade-up.

### 4.4 Pinned / layered scroll moment
One section (Process or a featured case) uses ScrollTrigger `pin` so content transitions in place as you scroll — a single "wow" beat, used once, not everywhere.

### 4.5 Supporting motions (keep subtle)
- Staggered entrance for card grids and lists.
- Animated number counters for the metrics section (count up on view).
- Infinite marquee for the tech/tools row.
- Card hover: slight lift + 3–5° tilt max.
- Lenis smooth scroll globally for the weighted, premium feel.
- Page transitions via Astro View Transitions (cross-fade or short slide).

**Motion rules:** durations 0.3–0.8s, easing like `power2.out`/`power3.out`; never animate layout-shifting properties (use transform/opacity); everything degrades gracefully with reduced-motion.

---

## Phase 5 — SEO (build it in from day one)

### 5.1 Technical
- Static generation (Astro SSG) → fast, crawlable HTML.
- One `<h1>` per page; logical `h2`/`h3` hierarchy.
- Unique `<title>` (≤ ~60 chars) and meta description (≤ ~155 chars) per page — via an `SEO.astro` component.
- Canonical `<link rel="canonical">` on every page.
- `sitemap.xml` (`@astrojs/sitemap`) + `robots.txt` (allow all, link the sitemap).
- Clean, lowercase, hyphenated URL slugs.
- HTTPS (host handles it), no broken links, meaningful internal linking between pages.

### 5.2 Social / sharing
- Open Graph + Twitter card tags (title, description, `og:image` 1200×630, url, type) on every page.
- A branded default OG image; per-post OG images for blog/case studies.

### 5.3 Structured data (JSON-LD)
- `Person` (Ali Zain, jobTitle, sameAs → GitHub/LinkedIn) — site-wide.
- `ProfessionalService` / `Organization` for the services offered.
- `WebSite` on home.
- `BreadcrumbList` on deeper pages; `Article` on blog posts.

### 5.4 On-page / content
- Target natural search intent: "AI engineer for hire", "freelance LLM / RAG developer", "AI automation & agentic workflow developer", "AI/ML consultant" (+ remote / location terms), plus the personal brand "Ali Zain".
- Real, specific outcome copy on Services and Work (results, numbers, stacks) — depth ranks.
- Descriptive link text (never "click here").
- Blog is the long-term engine: publish focused technical posts periodically.

### 5.5 Images & fonts (also Core Web Vitals)
- Serve WebP/AVIF, responsive `srcset`, explicit `width`/`height` (prevents CLS), `loading="lazy"` below the fold, meaningful `alt` text.
- Preload the two fonts, `font-display: swap`, self-hosted.

**Targets:** Lighthouse 95+ across Performance, SEO, Best Practices, Accessibility. Green Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms).

---

## Phase 6 — Sizing, Accessibility & Quality

### 6.1 Sizing & readability (visibility-first, never cramped or oversized)
- Body: `clamp(1rem, 0.6rem + 0.6vw, 1.125rem)` (~16–18px), `line-height: 1.7`.
- Type scale (fluid): h1 `clamp(2.5rem, 5vw, 4.25rem)`, h2 `clamp(2rem, 3.5vw, 3rem)`, h3 `clamp(1.35rem, 2vw, 1.75rem)`, eyebrow ~0.8rem, meta ~0.9rem.
- Spacing scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80 · 120 px. Section padding 80–120px desktop / 48–64px mobile.
- Interactive targets ≥ 44×44px. Generous whitespace; readable measure (~60–75 chars per line).

### 6.2 Accessibility (and it helps SEO)
- Semantic HTML + landmarks; keyboard-navigable; visible focus states (`outline: 2px solid var(--accent)`).
- Color contrast per the design system rules (ink for small text; accent for large/interactive).
- `alt` on all meaningful images; `aria-label` on icon-only buttons; `aria-hidden` on decorative motion (incl. the cursor).
- Full `prefers-reduced-motion` support.
- Mobile-first, tested at 360px → 1440px+.

---

## Phase 7 — Build Order (do it in this sequence)

1. Scaffold Astro + Tailwind + integrations; wire palette tokens & fonts (Phase 0, design-system skill).
2. Global styles, type scale, container, `Button`/`Section`/`Card` primitives.
3. Layout shell: nav + footer + SEO component + View Transitions.
4. Cursor dot + Lenis smooth scroll (get the feel right early).
5. Build **Home** section by section (static first, motion after).
6. Build **Services**, **Work**, **About**, **Contact**.
7. Wire the contact form to Web3Forms; test delivery + validation + spam honeypot.
8. Animation pass: masked text reveals, magnetic buttons, counters, pinned section, staggers, cursor morph.
9. SEO pass: titles/descriptions, canonical, OG, JSON-LD, sitemap, robots, alt text, internal links.
10. Performance + a11y pass: image optimization, font preload, Lighthouse, reduced-motion, keyboard test.
11. (Optional) Blog with 2–3 seed posts.
12. Deploy to Vercel (connect Git → auto CI). Add custom domain, verify sitemap in Google Search Console.

---

## Phase 8 — Launch Checklist
- [ ] All pages responsive 360px → 1440px+.
- [ ] Lighthouse 95+ on all four categories.
- [ ] Unique title + description + canonical + OG on every page.
- [ ] Sitemap + robots live; submitted to Search Console.
- [ ] Contact form delivers email; spam protection works; success/error states clear.
- [ ] Cursor dot works on desktop + touch; hidden/softened on reduced-motion.
- [ ] All motion respects reduced-motion; no CLS from animations or fonts.
- [ ] Favicon + social preview render correctly.
- [ ] Email/phone links (`mailto:`/`tel:`) work; social links correct.
- [ ] No console errors; no broken links.

---

### Notes for the implementing LLM
- Follow the `portfolio-design-system` skill for all colors, fonts, and component styling — do not invent new colors or fonts.
- Prefer transform/opacity for animation; keep the accent rare; keep motion purposeful.
- Ship static, semantic, accessible HTML first; layer interactivity as islands.
- Re-init the cursor and any GSAP triggers on `astro:page-load` (View Transitions).
