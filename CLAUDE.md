# CLAUDE.md

## Project Overview

Kevin Chang's personal resume/CV website, built with **Astro 5** and **Tailwind CSS 4**, deployed to **Netlify** at https://kevin-cv.netlify.app/.

## Tech Stack

- **Astro 5** — static site generator with island architecture
- **Tailwind CSS 4** — utility-first CSS via `@tailwindcss/vite` Vite plugin (no `tailwind.config.js` needed)
- **React 18** — used only for interactive islands (ThemeToggle, NavMenu)
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
  projects/<project>.md      ← one file per project (7 files); frontmatter + body
  publications/publications.yaml
  education/education.yaml
  skills/skills.yaml
```

The main page is `src/pages/index.astro`. It pulls from all collections via `getCollection()` / `getEntry()` and passes data down to section components.

## Key Files

| File | Purpose |
|---|---|
| `src/content/config.ts` | Zod schemas — change data shape here first |
| `src/pages/index.astro` | Page composition — imports and orders all sections |
| `src/layouts/BaseLayout.astro` | HTML shell, SEO meta, JSON-LD, dark-mode boot script |
| `src/styles/global.css` | Tailwind `@import`, CSS custom properties (`--brand`), dark mode `@variant` |
| `src/components/layout/Header.astro` | Sticky header with NavMenu island |
| `src/components/layout/NavMenu.tsx` | React island — desktop nav + mobile hamburger/dropdown |
| `src/components/layout/ThemeToggle.tsx` | React island — light/dark toggle, persists to localStorage |
| `src/lib/seo.ts` | Builds JSON-LD `Person` schema from profile data |
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
| Projects | `src/content/projects/<project>.md` |
| Publications | `src/content/publications/publications.yaml` |
| Education | `src/content/education/education.yaml` |
| Skills | `src/content/skills/skills.yaml` |

## Theme / Styling

- Brand colour: `--brand` CSS custom property in `src/styles/global.css` (currently `#04a0bf`)
- Dark mode: `data-theme="dark"` on `<html>`, toggled by ThemeToggle island; set before paint in BaseLayout to avoid FOUC
- Tailwind dark variant: `@variant dark (&:where([data-theme=dark], [data-theme=dark] *))` in `global.css` — this means `dark:` utilities work against the `data-theme` attribute, not the `dark` class
- Base link colour is set inside `@layer base` so Tailwind utility classes like `text-white` always override it

## Deployment

Push to `main` → Netlify runs `npm run build`, publishes `dist/`.

- Node version pinned to 20 in `netlify.toml`
- `/_astro/*` assets get `Cache-Control: immutable` headers

## Notes

- The `v1-hugo` git tag preserves the original Hugo 0.80 / R / blogdown site for reference
- Content collection `.md` files (experience, projects) use standard Markdown — no MDX needed since no JSX components are used in content files
- `public/og-image.png` is currently a placeholder; replace with a proper 1200×630 OG image
- The `renv/` R environment, `themes/` Hugo theme, `config.toml`, and all R files were removed in the Astro migration
