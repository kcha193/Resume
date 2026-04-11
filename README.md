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
| **Fonts** | Self-hosted Inter Variable (body) + JetBrains Mono Variable (dates/code) |
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
```

---

## Updating Content

All CV content lives in `src/content/`. Edit the relevant file and push — Netlify rebuilds automatically.

| What to change | File |
|---|---|
| Name, contact, social links, languages, interests | `src/content/profile/profile.yaml` |
| Work experience | `src/content/experience/<role>.md` — one file per role |
| Projects | `src/content/projects/<project>.md` — set `featured: true` on up to 3 for visual highlight |
| Publications | `src/content/publications/publications.yaml` |
| Education | `src/content/education/education.yaml` |
| Skills | `src/content/skills/skills.yaml` |
| Brand colour | `--brand` CSS var in `src/styles/global.css` — currently `#FCBD1A` (ASB yellow) |
| Printable resume | `public/resume.html` |

---

## Features

- **Dark mode default** — dark on first visit, togglable, persisted to localStorage, no FOUC
- **Zero JS framework** — theme toggle and mobile nav use vanilla JS; no React in the bundle
- **Mobile-friendly** — hamburger nav, responsive layouts at every breakpoint
- **SEO** — `<title>`, meta description, Open Graph, JSON-LD `Person` schema (with `worksFor`, `alumniOf`, `image`), canonical URL, `sitemap.xml`
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
