# CLAUDE.md

## Project Overview

Kevin Chang's personal resume/CV website, built with **Astro 5** and **Tailwind CSS 4**, deployed to **Netlify** at https://kevin-cv.netlify.app/.

## Tech Stack

- **Astro 5** — static site generator; no client-side framework in use
- **Tailwind CSS 4** — utility-first CSS via `@tailwindcss/vite` Vite plugin (no `tailwind.config.js` needed)
- **Vanilla JS only** — theme toggle and mobile nav are pure Astro components with minimal inline scripts; React has been removed
- **Self-hosted variable fonts** — Inter Variable (body), JetBrains Mono Variable (mono/dates)
- **Astro content collections** — Zod-validated YAML + Markdown files
- **Netlify** — CI/CD and hosting (auto-deploys on push to `main`)

## Architecture

All CV content lives in **`src/content/`** — a set of YAML data files and Markdown prose files validated by Zod schemas defined in `src/content/config.ts`. There is no CMS.

```
src/content/
  config.ts                  ← Zod schemas (single source of truth for data shape)
  profile/profile.yaml       ← name, contact, social, languages, interests
  experience/<role>.md       ← one file per role (5 files); frontmatter + body
  projects/<project>.md      ← one file per project (8 files); frontmatter + body
  publications/publications.yaml
  education/education.yaml
  skills/skills.yaml
```

The main page is `src/pages/index.astro`. It pulls from all collections via `getCollection()` / `getEntry()` and passes data down to section components as props. Sections do not fetch their own data — all data flows from `index.astro`.

## Key Files

| File | Purpose |
|---|---|
| `src/content/config.ts` | Zod schemas — change data shape here first |
| `src/pages/index.astro` | Page composition — imports and orders all sections, passes all data as props |
| `src/layouts/BaseLayout.astro` | HTML shell, SEO meta, JSON-LD, dark-mode boot script |
| `src/styles/global.css` | Tailwind `@import`, CSS custom properties (`--brand`), dark mode `@variant`, motion guard |
| `src/components/layout/Header.astro` | Sticky header with NavMenu and ThemeToggle |
| `src/components/layout/NavMenu.astro` | Pure Astro — static desktop nav + mobile hamburger with inline script |
| `src/components/layout/ThemeToggle.astro` | Pure Astro — icon toggled via CSS `dark:` utilities, click handled by inline script |
| `src/lib/seo.ts` | Builds JSON-LD `Person` schema from profile data + site URL |
| `src/lib/utils.ts` | `formatDate`, `renderInlineMarkdown` helpers |
| `public/resume.html` | Printable resume (hand-maintained HTML) |
| `netlify.toml` | Build command + immutable cache headers |

## Key Commands

```bash
npm install          # install dependencies (requires Node 18+)
npm run dev          # local dev server → http://localhost:4321
npm run build        # production build → dist/
npm run preview      # preview dist/ locally
npm run check        # Astro + TypeScript type check
```

## Content Editing

To update resume content, edit the relevant file in **`src/content/`** and push. Netlify auto-deploys.

| Section | File |
|---|---|
| Profile, contact, social | `src/content/profile/profile.yaml` |
| Work experience | `src/content/experience/<role>.md` |
| Projects | `src/content/projects/<project>.md` — set `featured: true` on up to 3 projects for visual highlight |
| Publications | `src/content/publications/publications.yaml` |
| Education | `src/content/education/education.yaml` |
| Skills | `src/content/skills/skills.yaml` |

## Theme / Styling

- Brand colour: `--brand` CSS custom property in `src/styles/global.css` (currently `#FCBD1A` — ASB yellow; dark mode `#FFD04D`)
- Buttons with `bg-[var(--brand)]` use `text-zinc-900` (not `text-white`) because yellow requires dark text for WCAG contrast
- Skip link uses `color: #1a1a1a` (not white) — white on yellow fails WCAG AA contrast
- Hero background gradient: `from-zinc-50 via-yellow-50/40 to-amber-50/20` (light) / zinc scale (dark)
- **Dark mode is the default** for new visitors — `stored || 'dark'` in the boot script in `BaseLayout.astro`
- Dark mode: `data-theme="dark"` on `<html>`, set before paint by an `is:inline` script to avoid FOUC; toggled by ThemeToggle via a click listener; persisted to `localStorage`
- Tailwind dark variant: `@variant dark (&:where([data-theme=dark], [data-theme=dark] *))` in `global.css` — `dark:` utilities work against the `data-theme` attribute, not the `dark` class
- ThemeToggle icons are shown/hidden with `block dark:hidden` / `hidden dark:block` — no JS state, no flicker
- Base link colour is set inside `@layer base` so Tailwind utility classes like `text-white` always override it
- `prefers-reduced-motion` guard in `global.css` disables all animations/transitions for users who prefer reduced motion

## Featured Projects

Projects with `featured: true` in their frontmatter receive visual distinction (gold border, star badge) and are rendered above non-featured projects in `ProjectsGrid`. Keep featured to **3 or fewer** projects — more than that dilutes the signal.

## Deployment

Push to `main` → Netlify runs `npm run build`, publishes `dist/`.

- Node version pinned to 20 in `netlify.toml`
- `/_astro/*` and `/fonts/*` assets get `Cache-Control: immutable` headers

## Notes

- The `v1-hugo` git tag preserves the original Hugo 0.80 / R / blogdown site for reference
- Content collection `.md` files (experience, projects) use standard Markdown — no MDX needed since no JSX components are used in content files
- `public/og-image.png` should be replaced with a proper 1200×630 OG image; currently the avatar JPEG is used as a fallback
- `src/components/layout/ThemeToggle.tsx` and `NavMenu.tsx` are legacy files left on disk (could not be deleted in the session they were deprecated); they are not imported anywhere and can be safely deleted
- The `renv/` R environment, `themes/` Hugo theme, `config.toml`, and all R files were removed in the Astro migration
