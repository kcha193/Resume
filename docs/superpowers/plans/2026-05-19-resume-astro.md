# Resume Astro Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace hand-maintained `public/resume.html` with `src/pages/resume.astro` driven by content collections, eliminating brand drift and content duplication.

**Architecture:** A standalone Astro page (no BaseLayout) that fetches profile, experience, education, and skills from content collections and renders clean print-ready HTML. Links in Header, NavMenu, Hero, and ContactFooter are updated from `/resume.html` to `/resume`. The old static file is deleted.

**Tech Stack:** Astro 5 content collections (`getCollection`, `getEntry`), `formatDate` + `renderInlineMarkdown` from `src/lib/utils.ts`, inline CSS (no Tailwind — standalone page).

---

## File map

| Action | Path | Responsibility |
|---|---|---|
| **Create** | `src/pages/resume.astro` | Standalone print-ready resume page |
| **Modify** | `scripts/validate-site.mjs` | Update noindex guard from `public/resume.html` → `src/pages/resume.astro` |
| **Modify** | `src/components/layout/Header.astro:21` | `/resume.html` → `/resume` |
| **Modify** | `src/components/layout/NavMenu.astro:68` | `/resume.html` → `/resume` |
| **Modify** | `src/components/sections/Hero.astro:102` | `/resume.html` → `/resume` |
| **Modify** | `src/components/sections/ContactFooter.astro:42` | `/resume.html` → `/resume` |
| **Delete** | `public/resume.html` | Replaced by Astro page |

---

### Task 1: Write the failing test guard

**Files:**
- Modify: `scripts/validate-site.mjs:77-78`

- [ ] **Step 1: Replace the noindex guard in validate-site.mjs**

Open `scripts/validate-site.mjs`. Find this block near line 77:

```js
// Guard: resume.html must not be indexed (avoids SEO dilution)
assertSourceIncludes('public/resume.html', 'noindex');
```

Replace it with:

```js
// Guard: /resume page must not be indexed (avoids SEO dilution)
assertSourceIncludes('src/pages/resume.astro', 'noindex');
```

- [ ] **Step 2: Run the test to confirm it fails**

```bash
npm test
```

Expected output: `Error: src/pages/resume.astro must include: noindex` (file doesn't exist yet).

---

### Task 2: Create `src/pages/resume.astro`

**Files:**
- Create: `src/pages/resume.astro`

- [ ] **Step 1: Create the file with complete content**

Create `src/pages/resume.astro` with the following content:

```astro
---
import { getCollection, getEntry } from 'astro:content';
import { formatDate, renderInlineMarkdown } from '../lib/utils';

const profileEntry = await getEntry('profile', 'profile');
const profile = profileEntry.data;

const experiences = (await getCollection('experience'))
  .sort((a, b) => b.data.startDate.getTime() - a.data.startDate.getTime());

const educationEntry = await getEntry('education', 'education');
const education = educationEntry.data.items;

const skillsEntry = await getEntry('skills', 'skills');
const skills = skillsEntry.data.tiers;

const linkedin = profile.social.find(s => s.platform === 'linkedin');
const github   = profile.social.find(s => s.platform === 'github');
---

<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, follow" />
  <title>{profile.name} — Resume</title>
  <style is:global>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
      padding: 20px;
    }
    .container {
      max-width: 8.5in;
      background: white;
      margin: 0 auto;
      padding: 40px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      line-height: 1.4;
    }
    header {
      text-align: center;
      margin-bottom: 20px;
      border-bottom: 3px solid #FCBD1A;
      padding-bottom: 15px;
    }
    h1 { font-size: 28px; color: #1a1a1a; margin-bottom: 5px; }
    .tagline { font-size: 14px; color: #666; margin-bottom: 8px; }
    .contact-info { font-size: 12px; color: #666; }
    .contact-info a { color: #1a1a1a; text-decoration: underline; }
    .summary {
      background: #f9f9f9;
      padding: 12px;
      margin: 20px 0;
      border-left: 4px solid #FCBD1A;
      font-size: 13px;
      line-height: 1.5;
    }
    .section { margin-bottom: 18px; }
    .section-title {
      font-size: 14px;
      font-weight: bold;
      color: #1a1a1a;
      text-transform: uppercase;
      border-bottom: 2px solid #FCBD1A;
      padding-bottom: 6px;
      margin-bottom: 12px;
    }
    .entry { margin-bottom: 14px; }
    .entry-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 3px;
    }
    .entry-title { font-weight: bold; font-size: 13px; }
    .entry-company { font-size: 12px; color: #555; }
    .entry-dates { font-size: 12px; color: #888; font-style: italic; }
    .highlights { margin-left: 20px; margin-top: 4px; }
    .highlights li { margin-bottom: 3px; font-size: 11px; color: #444; }
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 15px;
      font-size: 12px;
    }
    .skill-category h4 {
      font-weight: bold;
      color: #1a1a1a;
      margin-bottom: 6px;
      font-size: 12px;
    }
    .skill-category ul { list-style: none; padding-left: 12px; }
    .skill-category li { margin-bottom: 3px; font-size: 11px; }
    @media print {
      body { background: white; padding: 0; }
      .container { box-shadow: none; padding: 0; max-width: 100%; }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>{profile.name}</h1>
      <div class="tagline">{profile.tagline}</div>
      <div class="contact-info">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        {linkedin && (
          <span> | <a href={linkedin.url} target="_blank" rel="noopener noreferrer">LinkedIn</a></span>
        )}
        {github && (
          <span> | <a href={github.url} target="_blank" rel="noopener noreferrer">GitHub</a></span>
        )}
      </div>
    </header>

    <div class="summary" set:html={renderInlineMarkdown(profile.summary)} />

    <section class="section">
      <div class="section-title">Professional Experience</div>
      {experiences.map((exp) => (
        <div class="entry">
          <div class="entry-header">
            <span>
              <span class="entry-title">{exp.data.title}</span>
              {' – '}
              <span class="entry-company">{exp.data.company}</span>
            </span>
            <span class="entry-dates">
              {formatDate(exp.data.startDate)} – {formatDate(exp.data.endDate)}
            </span>
          </div>
          <ul class="highlights">
            {exp.data.highlights.map((h) => <li>{h}</li>)}
          </ul>
        </div>
      ))}
    </section>

    <section class="section">
      <div class="section-title">Technical Skills</div>
      <div class="skills-grid">
        {skills.map((tier) => (
          <div class="skill-category">
            <h4>{tier.title}</h4>
            <ul>
              {tier.items.map((item) => <li>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>

    <section class="section">
      <div class="section-title">Education</div>
      {education.map((edu) => (
        <div class="entry">
          <div class="entry-header">
            <span>
              <span class="entry-title">{edu.degree}</span>
              {' — '}
              <span class="entry-company">{edu.university}</span>
            </span>
            <span class="entry-dates">{edu.year}</span>
          </div>
        </div>
      ))}
    </section>
  </div>
</body>
</html>
```

- [ ] **Step 2: Run the test and build**

```bash
npm test && npm run build
```

Expected: `Site validation checks passed.` and build succeeds with no TypeScript errors.

- [ ] **Step 3: Visual check**

```bash
npm run preview
```

Open `http://localhost:4321/resume` in a browser. Verify:
- Name, tagline, email, LinkedIn, GitHub links render correctly
- Summary shows bold text (first sentence bolded via `renderInlineMarkdown`)
- All 5 experience entries appear, sorted newest-first (ASB Senior DS first)
- Skills render in 3 columns (Expert / Proficient / Familiar)
- Education shows 3 degrees with years

- [ ] **Step 4: Commit**

```bash
git add src/pages/resume.astro scripts/validate-site.mjs
git commit -m "feat: add src/pages/resume.astro driven by content collections"
```

---

### Task 3: Update links in four components

**Files:**
- Modify: `src/components/layout/Header.astro:21`
- Modify: `src/components/layout/NavMenu.astro:68`
- Modify: `src/components/sections/Hero.astro:102`
- Modify: `src/components/sections/ContactFooter.astro:42`

- [ ] **Step 1: Update Header.astro**

In `src/components/layout/Header.astro`, change line 21:

```diff
-       href="/resume.html"
+       href="/resume"
```

- [ ] **Step 2: Update NavMenu.astro**

In `src/components/layout/NavMenu.astro`, change line 68:

```diff
-       href="/resume.html"
+       href="/resume"
```

- [ ] **Step 3: Update Hero.astro**

In `src/components/sections/Hero.astro`, change line 102:

```diff
-         href="/resume.html"
+         href="/resume"
```

- [ ] **Step 4: Update ContactFooter.astro**

In `src/components/sections/ContactFooter.astro`, change line 42:

```diff
-           href="/resume.html"
+           href="/resume"
```

- [ ] **Step 5: Run tests**

```bash
npm test && npm run build
```

Expected: `Site validation checks passed.` and clean build.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/Header.astro src/components/layout/NavMenu.astro \
        src/components/sections/Hero.astro src/components/sections/ContactFooter.astro
git commit -m "fix: update resume links from /resume.html to /resume"
```

---

### Task 4: Delete `public/resume.html`

**Files:**
- Delete: `public/resume.html`

- [ ] **Step 1: Delete the file**

```bash
rm public/resume.html
```

- [ ] **Step 2: Run tests and build**

```bash
npm test && npm run build
```

Expected: `Site validation checks passed.` (the old `public/resume.html` noindex guard was already replaced in Task 1). Build must succeed with no 404 for `/resume`.

- [ ] **Step 3: Commit**

```bash
git add -u public/resume.html
git commit -m "chore: delete public/resume.html — replaced by src/pages/resume.astro"
```

---

## Self-review

**Spec coverage:**
- [x] New `src/pages/resume.astro` fed by content collections — Task 2
- [x] Links updated in Header, NavMenu, Hero, ContactFooter — Task 3
- [x] `public/resume.html` deleted — Task 4
- [x] `noindex` preserved on new page — Task 2, Step 1
- [x] Validate-site guard updated — Task 1

**Placeholder scan:** None found.

**Type consistency:** `profileEntry.data`, `educationEntry.data.items`, `skillsEntry.data.tiers`, `experiences` are all typed by Zod schemas in `src/content/config.ts`. `formatDate` accepts `Date | null`, matches `exp.data.endDate` (nullable). `renderInlineMarkdown` accepts `string`, matches `profile.summary`.
