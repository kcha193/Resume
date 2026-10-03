# Resume / CV Site — Agent Instructions

> Canonical instructions for Claude Code and Codex. `CLAUDE.md` imports this
> file with `@AGENTS.md` — edit rules here, not there.

## Project Overview

Kevin Chang's personal resume/CV website, built with **Astro 5** and **Tailwind CSS 4**, deployed to **Netlify** at https://kevin-cv.netlify.app/.

## Tech Stack

- **Astro 5** — static site generator; no client-side framework in use
- **Tailwind CSS 4** — utility-first CSS via `@tailwindcss/vite` Vite plugin (no `tailwind.config.js` needed)
- **Vanilla JS only** — theme toggle and mobile nav are pure Astro components with minimal inline scripts; React has been removed
- **Self-hosted variable fonts** — Geist Variable (display/body), Geist Mono Variable (dates/labels)
- **Astro content collections** — Zod-validated YAML + Markdown files
- **`@astrojs/sitemap`** — auto-generates `sitemap-index.xml` at build time
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
| `src/pages/resume.astro` | Printable resume page at `/resume` — data-driven from content collections, `noindex`; `/resume.html` 301-redirects to it (see `netlify.toml`) |
| `netlify.toml` | Build command + immutable cache headers |

## Key Commands

```bash
npm install          # install dependencies (requires Node 18+)
npm run dev          # local dev server → http://localhost:4321
npm run build        # production build → dist/
npm run preview      # preview dist/ locally
npm run check        # Astro + TypeScript type check
npm test             # site validation guardrails (scripts/validate-site.mjs)
```

## Content Editing

To update resume content, edit the relevant file in **`src/content/`** and push. Netlify auto-deploys.

| Section | File |
|---|---|
| Profile, contact, social | `src/content/profile/profile.yaml` |
| Work experience | `src/content/experience/<role>.md` |
| Projects | `src/content/projects/<project>.md` — set `featured: true` on up to 4 projects for visual highlight |
| Publications | `src/content/publications/publications.yaml` |
| Education | `src/content/education/education.yaml` |
| Skills | `src/content/skills/skills.yaml` |

## Theme / Styling

- Design concept: editorial intelligence — one yellow accent, one neutral family, hairline rules instead of cards, two radii (`--radius-sm: 4px`, `--radius-md: 12px`), and one easing curve (`--ease`)
- Design tokens live in `src/styles/global.css` under `:root` / `[data-theme="dark"]` and are exposed to Tailwind through `@theme inline` (`text-muted`, `bg-surface`, `border-line`, etc.)
- Brand colour: `--brand` is `#FCBD1A` (ASB yellow) in light mode and `#FFCB3D` in dark mode; use `--brand-text` when the accent must be text on the light background
- Buttons with a yellow background use dark ink (`#141416`), not white, because yellow requires dark text for WCAG contrast
- Skip link uses `color: #1a1a1a` (not white) — white on yellow fails WCAG AA contrast
- The page uses flat `--paper` / `--surface` backgrounds, a subtle fixed grain, and hairline column guides rather than the previous hero gradient
- Shared layout/type primitives are `.wrap`, `.section`, `.display`, `.h-section`, `.lede`, `.label`, `.mark`, `.link-u`, `.btn`, and `.ruled`
- **Dark mode is the default** for new visitors — `stored || 'dark'` in the boot script in `BaseLayout.astro`
- Dark mode: `data-theme="dark"` on `<html>`, set before paint by an `is:inline` script to avoid FOUC; toggled by ThemeToggle via a click listener; persisted to `localStorage`
- Tailwind dark variant: `@variant dark (&:where([data-theme=dark], [data-theme=dark] *))` in `global.css` — `dark:` utilities work against the `data-theme` attribute, not the `dark` class
- ThemeToggle icons are shown/hidden with `block dark:hidden` / `hidden dark:block` — no JS state, no flicker
- Base link colour is set inside `@layer base` so Tailwind utility classes like `text-white` always override it
- Motion is CSS-only (`.rise` for the hero and `data-reveal` for scroll reveals); the `prefers-reduced-motion` guard in `global.css` disables animations and transitions

## Featured Projects

`ProjectsGrid` renders up to four projects with `featured: true` as editorial case studies: the first is the lead treatment and the remaining featured projects use the compact case-study treatment. All other projects appear below as a ruled “More public work” index. Keep featured to **4 or fewer** projects — more than that dilutes the signal and any extras fall back to the index.

## Deployment

Push to `main` → Netlify runs `npm run build`, publishes `dist/`.

- Node version pinned to 20 in `netlify.toml`
- `/_astro/*` and `/fonts/*` assets get `Cache-Control: immutable` headers

## Notes

- The `v1-hugo` git tag preserves the original Hugo 0.80 / R / blogdown site for reference
- Content collection `.md` files (experience, projects) use standard Markdown — no MDX needed since no JSX components are used in content files
- `scripts/validate-site.mjs` enforces invariants (1200×630 PNG OG image, header aria-label, no `text-zinc-500` in `ContactFooter`, no `public/.DS_Store`); run via `npm test` and re-run after touching those areas
- `public/og-image.svg` is the source of truth; `public/og-image.png` is the rasterised social card referenced in meta tags
- The `renv/` R environment, `themes/` Hugo theme, `config.toml`, and all R files were removed in the Astro migration

## Context Navigation

<!-- context-navigation:start v1 -->
Follow the global context-navigation rule (`~/.claude/CLAUDE.md` for Claude,
`~/.codex/AGENTS.md` for Codex): vault first; Claude uses native search;
Codex uses codebase-memory-mcp (`detect_changes` first); Graphify only on request.
- `graphify-out/` is a dated snapshot, not auto-refreshed — check its age before trusting it; don't hand-edit it.
- codebase-memory-mcp is registered for Codex by this repo's `.codex/config.toml`, which Codex loads only for trusted projects.
<!-- context-navigation:end -->
