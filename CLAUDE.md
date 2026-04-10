# CLAUDE.md

## Project Overview

This is Kevin Chang's personal resume/CV website, built with **Hugo** and the **hugo-devresume-theme**, deployed to **Netlify** at https://kevin-cv.netlify.app/.

## Tech Stack

- **Hugo** (v0.80.0) — static site generator
- **R / blogdown** — build orchestration via RStudio
- **Bootstrap 4** — responsive CSS framework
- **SCSS** — theme styling (compiled by Hugo)
- **renv** — R package dependency management
- **Netlify** — CI/CD and hosting (auto-deploys on push to `main`)

## Architecture

All resume content lives in a single file: **`config.toml`**. There is no markdown content — the theme reads everything (experience, education, skills, projects, papers, contact info) directly from `config.toml` params.

```
config.toml          ← ALL resume content (single source of truth)
index.Rmd            ← blogdown entry point (minimal)
themes/hugo-devresume-theme/
  layouts/
    index.html       ← main template, assembles partials
    partials/        ← header, experience, skills, education, etc.
  assets/scss/
    devresume.scss   ← theme styles (uses Hugo template vars for colors)
public/              ← generated output (committed, served by Netlify)
```

## Key Commands

```bash
# Build the site (from R/RStudio)
blogdown::build_site()

# Or directly with Hugo
hugo

# Local dev server
hugo server -D
```

## Content Editing

To update resume content, edit **`config.toml`** only. Sections:
- `[params.profile]` — name, tagline, avatar
- `[params.contact]` — email, phone, location
- `[params.summary]` — professional summary
- `[params.skills]` — grouped skill lists
- `[[params.experience.list]]` — work history entries
- `[[params.projects.list]]` — project entries
- `[[params.information.list]]` — publications/papers
- `[[params.education.list]]` — degrees
- `[[params.social.list]]` — GitHub, LinkedIn, etc.

## Theme Customization

- Colors are set in `config.toml` under `[params.theme]` (primary: `#04a0bf`)
- Layout changes go in `themes/hugo-devresume-theme/layouts/partials/`
- Style changes go in `themes/hugo-devresume-theme/assets/scss/devresume.scss`

## Deployment

Push to `main` → Netlify auto-builds and deploys. The `public/` directory is also committed.

## Notes

- Hugo version pinned at 0.80.0 — newer versions may have breaking changes with this theme
- The theme uses FontAwesome for icons (referenced by class name in config)
- TOML multiline strings use `"""` — watch for quoting issues (common in recent commits)
