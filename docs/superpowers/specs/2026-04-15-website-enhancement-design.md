# Website Enhancement Design — Dark Technical Redesign

**Date:** 2026-04-15
**Goal:** Make Kevin Chang's resume website more attractive and credible to any audience, with primary emphasis on "serious technical expert" impression.
**Approach:** Comprehensive bold redesign using the Dark Technical direction — dark backgrounds, gold accents, gradient hero, glowing borders, specialist domain cards, new sections.

---

## Design Decisions

| Decision | Choice | Reason |
|---|---|---|
| Primary impression | Serious technical expert | Depth and credibility over approachability |
| Change scope | Bold redesign | New sections + dramatic visual treatment |
| Visual direction | Dark Technical (C) | Dark bg + gold accents + specialist domain cards |
| Tech constraints | Astro 5 + Tailwind CSS 4, vanilla JS only | No React, no client-side frameworks |

---

## Page Structure (after redesign)

```
Header (sticky, dark)
Hero (dark gradient, gold chips, glow orb)
Specializations Strip (4 expertise cards) ← NEW
About / Summary
Experience Timeline (dark cards)
Projects Grid (dark cards, gold featured glow)
Skills Matrix (recategorized, soft skills removed)
Publications List (unchanged layout, dark bg)
Impact Banner ← NEW
Contact / Footer
```

---

## Section Designs

### 1. Hero (modified)

**Current:** Light gradient (`from-zinc-50 via-yellow-50/40`), plain tagline text, basic avatar ring.

**New:**
- Background: `bg-gradient-to-br from-zinc-950 via-[#111008] to-[#1a1200]` (dark, warm-tinted)
- Subtle gold grid overlay: `background-image: linear-gradient(rgba(252,189,26,0.03) 1px, transparent 1px)` at 40px spacing
- Radial glow orb: top-right, `rgba(252,189,26,0.15)` — same markup as current orb but stronger
- Name: unchanged size/weight
- Gold gradient underline: `3px` bar below name, `linear-gradient(to right, var(--brand), transparent)`
- Replace plain tagline with **specialty chips** (monospace, gold border): `CLV Systems` · `Pricing Strategy` · `Microsimulation` · `Generative AI`
- Tagline text rewritten: "12+ years driving measurable business impact through advanced analytics, machine learning, and data products across financial services and government policy."
- Avatar: add gold glow (`box-shadow: 0 0 24px rgba(252,189,26,0.25)`) and gold ring border (`ring-[var(--brand)]/50`)
- Buttons: Download Resume stays gold; LinkedIn/GitHub/Contact get dark border style (`border-zinc-700 text-zinc-400 hover:border-[var(--brand)] hover:text-[var(--brand)]`)

### 2. Specializations Strip (NEW component)

**File:** `src/components/sections/Specializations.astro`

**Placement:** Between Hero and About in `index.astro`.

**Content:** 4 cards in a responsive grid (1 col mobile → 2 col sm → 4 col lg).

| Card | Icon | Title | Description |
|---|---|---|---|
| 1 (gold accent) | 📊 | CLV Systems | Customer lifetime value modelling & intelligence |
| 2 | 💰 | Pricing Strategy | Revenue optimisation & pricing analytics |
| 3 | 🏛️ | Microsimulation | Large-scale policy & population modelling |
| 4 | 🤖 | Generative AI | LLM applications & agentic pipelines |

**Styling:**
- Section bg: `bg-zinc-900` (slightly lighter than hero to create rhythm)
- Card 1: `bg-[rgba(252,189,26,0.06)] border-[rgba(252,189,26,0.2)]` (gold-tinted)
- Cards 2–4: `bg-zinc-800/30 border-zinc-800`
- All cards: `rounded-xl p-6`, hover lifts border to gold (`hover:border-[var(--brand)]/40 transition-colors`)
- Section label: monospace uppercase `CORE EXPERTISE` in `text-zinc-600`

**Data source:** Hardcoded in the component (not from content collections — these 4 specializations are stable and curated).

### 3. Experience Timeline (modified)

**Current:** Simple article with absolute-positioned dot and line.

**New:**
- Wrap each card body in a dark card: `bg-zinc-900/50 border border-zinc-800 rounded-xl p-5`
- Dot: add `shadow-[0_0_8px_rgba(252,189,26,0.6)]` glow
- Timeline line: change from solid `bg-zinc-800` to gradient `from-[var(--brand)] to-zinc-800` (fades downward)
- Date: move to right-aligned gold pill — `font-mono text-xs text-[var(--brand)] bg-[rgba(252,189,26,0.08)] px-2 py-1 rounded`
- Company/location: keep as `text-zinc-500 text-sm`
- Tags (Badge): darken to `bg-zinc-800 border-zinc-700 text-zinc-400` (from current lighter style)
- Highlights: keep bullet dots gold, text stays `text-zinc-400`
- Card hover: `hover:border-zinc-700 transition-colors`

### 4. Projects Grid (modified)

**Current:** White/zinc-900 cards, featured has gold border.

**New:**
- All cards: `bg-zinc-900 border-zinc-800` (dark base)
- Featured cards: `bg-[#0d0d00] border-[var(--brand)]/35 shadow-[0_0_20px_rgba(252,189,26,0.06)]`
- Stack line: featured cards show stack tags in `text-[var(--brand)]` (gold); non-featured in `text-zinc-500`
- Category badge: darken to `bg-zinc-800 border-zinc-700 text-zinc-400`
- Hover: all cards → `hover:border-[var(--brand)]/50 hover:shadow-[0_0_16px_rgba(252,189,26,0.08)] transition-all`

### 5. Skills Matrix (modified)

**Current:** 3 categories — Programming, Statistics & ML, Professional (soft skills).

**New categories:**
- **Languages** — R, Python, SQL, SAS, SPSS (keep, rename from "Programming")
- **Tools & Platforms** — Snowflake, Databricks, dbt, Git, Shiny Dashboard, R Markdown (split out from Programming)
- **ML & Statistics** — Experimental design, Advanced statistical modelling, Survey analysis, Data visualisation, Machine learning, Microsimulation (rename from "Statistics & ML")

**Removed:** Entire "Professional" category (Research, Consulting, Strong problem solver, Good time management, Effective communication, Active learning, Team player) — these add noise, not signal, for a technical expert impression.

**Styling:**
- Languages category card: gold-tinted border (`border-[var(--brand)]/15 bg-[rgba(252,189,26,0.05)]`). The component identifies this category by checking `cat.title === 'Languages'`.
- Language skill pills: gold-accented (`bg-[#1a1500] text-[var(--brand)] border-[var(--brand)]/30`)
- Other pill categories: `bg-zinc-800 text-zinc-400 border-zinc-700`
- Section bg: `bg-zinc-900/50` (alternate from projects)

**Data change:** Update `src/content/skills/skills.yaml` — rename categories, split Programming into Languages + Tools, remove Professional category.

### 6. Publications (unchanged structure, dark bg)

No structural changes. The academic citation format is appropriate. Only change: ensure the section background is consistent with the dark theme (`bg-zinc-950`).

### 7. Impact Banner (NEW component)

**File:** `src/components/sections/ImpactBanner.astro`

**Placement:** Between Publications and ContactFooter in `index.astro`.

**Content:** 4 metrics in a single bordered grid row.

| Metric | Value | Label |
|---|---|---|
| 1 | 12+ | Years Experience |
| 2 | 5 | Roles Held |
| 3 | 8 | Major Projects |
| 4 | 3 | Sectors (Finance · Government · Consulting) |

**Styling:**
- Section bg: `bg-gradient-to-br from-[#0d0d00] to-zinc-950`
- Section label: monospace `BY THE NUMBERS` in `text-zinc-600`
- Grid: single row, 4 columns, `border border-zinc-800 rounded-xl overflow-hidden`
- Each cell: `border-r border-zinc-800` (last cell no border), `p-8 text-center`
- Number: `text-5xl font-black text-[var(--brand)]`
- Label: `font-mono text-xs tracking-widest text-zinc-500 uppercase mt-2`

**Data source:** Hardcoded in component (manually maintained, not derived from content collections).

### 8. Global Background / Section Rhythm

To give the dark theme visual rhythm, alternate section backgrounds:

| Section | Background |
|---|---|
| Hero | `zinc-950` gradient |
| Specializations | `zinc-900` |
| About | `zinc-950` |
| Experience | `zinc-900/50` |
| Projects | `zinc-950` |
| Skills | `zinc-900/50` |
| Publications | `zinc-950` |
| Impact Banner | dark gradient |
| Footer | `zinc-950` (keep existing) |

### 9. Scroll-Reveal Animations

Add a single `IntersectionObserver` script in `BaseLayout.astro` (inline, `is:inline`) that adds an `is-visible` class to elements with `data-reveal` attribute when they enter the viewport.

**CSS in `global.css`:**
```css
[data-reveal] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
[data-reveal].is-visible {
  opacity: 1;
  transform: none;
}
```

Apply `data-reveal` to: section headings, ExperienceCard articles, ProjectCard articles, Specializations cards, ImpactBanner cells.

`prefers-reduced-motion` guard already in `global.css` disables all transitions — no extra work needed.

---

## Files to Create

| File | Type | Purpose |
|---|---|---|
| `src/components/sections/Specializations.astro` | New | 4 expertise cards between Hero and About |
| `src/components/sections/ImpactBanner.astro` | New | Metrics grid above footer |

## Files to Modify

| File | Changes |
|---|---|
| `src/components/sections/Hero.astro` | Dark gradient bg, grid overlay, gold underline, specialty chips, rewritten tagline, avatar glow, button styles |
| `src/components/sections/ExperienceCard.astro` | Dark card wrapper, glowing dot, gradient timeline line, date as gold pill |
| `src/components/sections/ProjectCard.astro` | Dark card base, featured gold glow, stack tag colors |
| `src/components/sections/SkillsMatrix.astro` | New category structure + pill colors |
| `src/components/sections/ExperienceTimeline.astro` | Section bg update |
| `src/components/sections/ProjectsGrid.astro` | Section bg update |
| `src/components/sections/PublicationsList.astro` | Section bg consistency |
| `src/content/skills/skills.yaml` | Rename categories, split Programming → Languages + Tools, remove Professional |
| `src/pages/index.astro` | Import + render Specializations and ImpactBanner |
| `src/layouts/BaseLayout.astro` | Add scroll-reveal IntersectionObserver script |
| `src/styles/global.css` | Add `[data-reveal]` animation CSS |

---

## Out of Scope

- Changes to content files other than `skills.yaml`
- Changes to `public/resume.html` (printable resume)
- Changes to SEO / JSON-LD (`src/lib/seo.ts`)
- Dark mode toggle behavior (dark remains the default)
- New pages or routes
- Any client-side framework (React, Vue, etc.)
