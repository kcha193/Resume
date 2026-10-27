# Resume

[![Netlify Status](https://api.netlify.com/api/v1/badges/d6ebbb0b-a548-46ca-ae13-470497217ae4/deploy-status)](https://app.netlify.com/sites/kevin-cv/deploys)

Kevin Chang's personal CV website, built with **Astro 5** and **Tailwind CSS 4**, deployed to Netlify.

**Live site:** [kevin-cv.netlify.app](https://kevin-cv.netlify.app/)

---

## Tech Stack

| | |
|---|---|
| **Framework** | [Astro 5](https://astro.build/) — static site generator, zero client-side framework |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) via `@tailwindcss/vite` + CSS custom properties |
| **Fonts** | Self-hosted Geist Variable (display + body) + Geist Mono Variable (dates/labels) |
| **Interactivity** | Vanilla JS only — theme toggle and mobile nav are pure Astro components |
| **Content** | Astro content collections — YAML for structured data, Markdown for prose |
| **Deployment** | [Netlify](https://netlify.com/) — auto-deploys on push to `main` |

---

## Project Structure

```
.
├── astro.config.mjs           # Astro config (sitemap, Tailwind vite plugin)
├── netlify.toml               # Build command + cache headers
├── tsconfig.json
├── package.json
├── public/                    # Static assets (served as-is)
│   ├── avatar.jpg
│   ├── favicon.svg
│   ├── og-image.png           # 1200×630 Open Graph image
│   ├── resume.html            # Printable resume
│   └── robots.txt
└── src/
    ├── content/               # Single source of truth for all CV data
    │   ├── config.ts          # Zod schemas for all collections
    │   ├── profile/           # profile.yaml — name, contact, social, languages, interests
    │   ├── experience/        # One .md file per role (5 total)
    │   ├── projects/          # One .md file per project (8 total); set featured: true for highlights
    │   ├── publications/      # publications.yaml
    │   ├── education/         # education.yaml
    │   └── skills/            # skills.yaml
    ├── components/
    │   ├── layout/            # Header.astro, NavMenu.astro, ThemeToggle.astro
    │   ├── sections/          # Hero, About, ExperienceTimeline, ProjectsGrid,
    │   │                      #   SkillsMatrix, PublicationsList, EducationList,
    │   │                      #   ContactFooter
    │   └── ui/                # Badge.astro
    ├── layouts/
    │   └── BaseLayout.astro   # HTML shell, SEO meta, JSON-LD, dark mode boot
    ├── pages/
    │   └── index.astro        # Single-page CV
    ├── lib/
    │   ├── seo.ts             # JSON-LD Person schema builder
    │   └── utils.ts           # formatDate, renderInlineMarkdown helpers
    └── styles/
        ├── global.css         # Tailwind import, CSS vars, dark mode variant, motion guard
        └── print.css          # @media print overrides
```

---

## Local Development

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev        # dev server at http://localhost:4321
npm run build      # production build → dist/
npm run preview    # preview built site locally
npm run check      # TypeScript/Astro type check
npm test           # source guardrails + fresh generated-page regression tests
```

---

## Updating Content

All CV content lives in `src/content/`. Edit the relevant file and push — Netlify rebuilds automatically.

| What to change | File |
|---|---|
| Name, contact, social links, languages, interests | `src/content/profile/profile.yaml` |
| Work experience | `src/content/experience/<role>.md` — one file per role |
| Projects | `src/content/projects/<project>.md` — set `featured: true` on up to 4 for visual highlight; include `scope`, `problem`, `approach`, `tradeoffs`, `evidence`, `outcome` and `lessons` for each featured case study |
| Insights | `src/content/insights/<slug>.md` — topic, date, summary, optional HTTPS canonical URL and `status: draft`, `outline` or `published` |
| Publications | `src/content/publications/publications.yaml` |
| Education | `src/content/education/education.yaml` |
| Skills | `src/content/skills/skills.yaml` — grouped by capability domain (AI/ML, Pricing/Banking, Data Eng, Programming, Communication) |
| Brand colour | `--brand` CSS var in `src/styles/global.css` — currently `#FCBD1A` (ASB yellow) |
| Printable resume | `src/pages/resume.astro` — data-driven from content collections, served at `/resume` |

---

## Features

- **Dark mode default** — dark on first visit, togglable, persisted to localStorage, no FOUC
- **Zero JS framework** — theme toggle and mobile nav use vanilla JS; no React in the bundle
- **Mobile-friendly** — hamburger nav, responsive layouts at every breakpoint
- **Featured projects as case studies** — short homepage treatments link to `/work/<slug>/`, with Problem → Approach → Trade-offs → Evidence → Outcome → Lessons
- **Printable resume** — brand-aligned `/resume` page generated from the same content collections (projects, publications, skills, education); print/save-to-PDF ready, `noindex`
- **Insights** — Markdown articles and visibly labelled outlines at `/insights/`; drafts generate no route or navigation entry; RSS deferred until completed articles exist
- **SEO** — `<title>`, meta description, Open Graph (with `og:image:alt` + per-scheme `theme-color`), JSON-LD `Person` schema (with `worksFor`, `alumniOf`, `image`), route-specific canonical/OG URLs, Article metadata for Insights, `sitemap-index.xml` (resume excluded)
- **Performance** — self-hosted variable fonts, ~0KB JS framework overhead, immutable cache headers on `/_astro/*`
- **Accessibility** — semantic landmarks, skip-to-content link (WCAG AA contrast), focus-visible rings, aria labels, `prefers-reduced-motion` guard

---

## Deployment

Push to `main` → Netlify builds with `npm run build` and publishes `dist/`.

The `v1-hugo` git tag preserves the original Hugo/R site if you ever need to reference it.

---

## Contact

- **Email:** kevin.ct.chang@gmail.com
- **GitHub:** [@kcha193](https://github.com/kcha193)
- **LinkedIn:** [kevin-ct-chang](https://linkedin.com/in/kevin-ct-chang)

## Design system (editorial redesign)

- **Concept:** editorial intelligence. One accent (`--brand` #FCBD1A), one neutral family, hairline rules instead of cards, two radii (`--radius-sm` 4px, `--radius-md` 12px), one easing curve (`--ease`).
- **Tokens** live in `src/styles/global.css` (`:root` / `[data-theme="dark"]`) and are exposed to Tailwind via `@theme inline` (`text-muted`, `bg-surface`, `border-line`, …). Layout/type primitives: `.wrap`, `.section`, `.display`, `.h-section`, `.lede`, `.label`, `.mark`, `.link-u`, `.btn`, `.ruled`.
- **Fonts:** `@fontsource-variable/geist` and `@fontsource-variable/geist-mono` replace Inter and JetBrains Mono. The Latin subset is copied to `public/fonts/geist-latin-wght-normal.woff2` (stable URL, preloaded in `BaseLayout.astro`, also used by `/resume`).
- **Skills:** `skills.yaml` items are ordered by depth of expertise. The first `core` items per tier (default 3, optional `core:` field) render prominently; the rest as supporting tools.
- **Motion:** CSS only. Hero `.rise` load animation, `data-reveal` scroll reveal (staggered via `--i`), nav scroll-spy. All disabled under `prefers-reduced-motion`.


## Evidence and editorial workflow

See [audit and verified evidence](docs/portfolio/audit-and-evidence.md) and [LinkedIn recommendations](docs/portfolio/linkedin-recommendations.md). Keep unverifiable numbers and private projects out of public content. Existing historical project links are not a guarantee that the original apps still run or use current data.

Create an Insight as `status: draft` first. Use `outline` only when intentionally publishing a labelled writing plan. Change to `published` after checking sources, examples and claims. An external `canonicalUrl` is for deliberate republication; it controls the canonical link, Open Graph URL and Article identity together.

`npm test` builds to a temporary output directory and briefly creates draft/canonical fixtures under the Insights collection. Fixtures are removed afterwards. Run tests without a concurrent dev watcher, then `npm run build` for clean production output. No new production dependencies are required.
