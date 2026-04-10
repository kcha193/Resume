# CLAUDE.md - Project Context

## Project Overview

This is Kevin Chang's personal resume/CV website built with [Hugo](https://gohugo.io/) and the [DevResume theme](https://github.com/KevinCochrane/hugo-devresume-theme). The site is automatically deployed to Netlify.

**Live Site:** https://kevin-cv.netlify.app/

## Key Files & Structure

- **`config.toml`** - Main configuration file containing all profile content (experience, skills, education, projects, etc.)
- **`README.md`** - Documentation for the project
- **`themes/hugo-devresume-theme/`** - Theme directory (submodule)
- **`content/post/`** - Blog post content
- **`renv/`** - R environment management (for blogdown)

## Before You Start

1. **Understanding the site** - This is a Hugo static site. All content is configured in `config.toml`, not in separate markdown files.
2. **Theme is a submodule** - The theme is included as a git submodule. Don't edit theme files directly.
3. **Deployment is automatic** - Changes pushed to the main branch automatically deploy to Netlify via their CI/CD pipeline.

## Common Tasks

### Updating Profile Content

Edit `config.toml`:
- **Profile info:** `[params.profile]`
- **Skills:** `[params.skills.list]`
- **Experience:** `[params.experience.list]`
- **Education:** `[params.education.list]`
- **Projects:** `[params.projects.list]`
- **Publications:** `[params.information.list]`
- **Social links:** `[params.social.list]`

### Local Development

```bash
# Start development server
hugo server

# Preview with drafts
hugo server -D

# Build production site
hugo
```

### Adding Blog Posts

```bash
hugo new post/my-post-title.md
# Edit content/post/my-post-title/index.md
# Update frontmatter to set draft: false when ready
```

### Updating the Theme

```bash
git submodule update --remote
```

## Deployment

The site uses Netlify for automatic deployment. Any push to the main branch triggers a build. You can view deployment status at: https://app.netlify.com/sites/kevin-cv/deploys

## Git Workflow

1. Create a feature branch for changes
2. Test locally with `hugo server`
3. Commit changes
4. Push to main branch
5. Netlify automatically builds and deploys

## Color & Styling

Primary color is configured in `config.toml`:
- `primaryColor = "#04a0bf"` (teal)
- `textPrimaryColor = "#292929"` (dark gray)

To change colors, modify these values in `config.toml`.

## Contact Information

- **Email:** kevin.ct.chang@gmail.com
- **Location:** Auckland, New Zealand
- **GitHub:** https://github.com/kcha193
- **LinkedIn:** https://linkedin.com/in/kevin-ct-chang
