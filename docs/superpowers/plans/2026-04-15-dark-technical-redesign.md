# Dark Technical Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Kevin Chang's resume site into a Dark Technical aesthetic — dark gradient hero, gold accents, two new sections (Specializations + Impact Banner), recategorized skills, and scroll-reveal animations.

**Architecture:** All changes are pure Astro components + Tailwind CSS utilities. Two new static components are created and wired into `index.astro`. Section backgrounds are updated to alternate between `zinc-950` and `zinc-900/50` for visual rhythm. Scroll-reveal uses a single vanilla `IntersectionObserver` script in `BaseLayout.astro`.

**Tech Stack:** Astro 5, Tailwind CSS 4 (via `@tailwindcss/vite`), vanilla JS only. No React, no client-side framework. Content from Astro content collections (YAML/Markdown). Run `npm run dev` to preview, `npm run check` for type errors, `npm run build` for production build.

---

## File Map

| Action | File | What changes |
|---|---|---|
| Modify | `src/content/skills/skills.yaml` | Rename + split categories, remove soft skills |
| Modify | `src/styles/global.css` | Add scroll-reveal CSS |
| Modify | `src/layouts/BaseLayout.astro` | Add scroll-reveal IntersectionObserver script |
| Modify | `src/components/sections/Hero.astro` | Dark gradient, specialty chips, gold underline, avatar glow |
| Create | `src/components/sections/Specializations.astro` | 4 expertise cards |
| Create | `src/components/sections/ImpactBanner.astro` | 4 metrics grid |
| Modify | `src/pages/index.astro` | Import + render new components |
| Modify | `src/components/sections/ExperienceCard.astro` | Dark card wrapper, gradient timeline line, date pill |
| Modify | `src/components/sections/ProjectCard.astro` | Dark base, featured gold glow, stack tag colors |
| Modify | `src/components/sections/SkillsMatrix.astro` | Gold Languages pills, dark other pills |
| Modify | `src/components/sections/ExperienceTimeline.astro` | Section bg to `bg-zinc-900/50` |
| Modify | `src/components/sections/ProjectsGrid.astro` | Section bg to `bg-zinc-950` |
| Modify | `src/components/sections/About.astro` | Section bg to `bg-zinc-950` |
| Modify | `src/components/sections/PublicationsList.astro` | Section bg to `bg-zinc-950` |
| Modify | `src/components/sections/EducationList.astro` | Section bg to `bg-zinc-900/50` |

---

## Task 1: Update Skills Data

**Files:**
- Modify: `src/content/skills/skills.yaml`

- [ ] **Step 1: Replace the entire file contents**

```yaml
categories:
  - title: "Languages"
    items:
      - "R"
      - "Python"
      - "SQL"
      - "SAS"
      - "SPSS"
  - title: "Tools & Platforms"
    items:
      - "Snowflake"
      - "Databricks"
      - "dbt"
      - "Git"
      - "Shiny Dashboard"
      - "R Markdown"
  - title: "ML & Statistics"
    items:
      - "Experimental design"
      - "Advanced statistical modelling"
      - "Survey analysis"
      - "Data visualisation"
      - "Machine learning"
      - "Microsimulation"
```

- [ ] **Step 2: Verify type check passes**

```bash
npm run check
```

Expected: no errors (the Zod schema for skills accepts any array of `{title, items}` — category names are strings, so renaming is safe).

- [ ] **Step 3: Commit**

```bash
git add src/content/skills/skills.yaml
git commit -m "content: restructure skills — split Programming, remove soft skills"
```

---

## Task 2: Scroll-Reveal CSS

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Append scroll-reveal rules to the end of `src/styles/global.css`**

Add after the existing `/* ─── Scrollbar ───` block:

```css
/* ─── Scroll reveal ─────────────────────────────────────────────────────────── */
.js [data-reveal] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.js [data-reveal].is-visible {
  opacity: 1;
  transform: none;
}
```

The `.js` prefix means elements are only hidden when JavaScript has run (added in Task 3). Without JS, all content stays visible — no broken page.

The existing `prefers-reduced-motion` guard in `global.css` already disables all transitions globally, so no additional guard is needed here.

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "style: add scroll-reveal CSS with JS-class guard"
```

---

## Task 3: Scroll-Reveal Script in BaseLayout

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Add `js` class script to `<head>` (before the dark-mode script)**

In `src/layouts/BaseLayout.astro`, find the existing `<!-- Dark mode: set before paint -->` comment. Add a new script block immediately BEFORE it:

```html
    <!-- JS feature flag: enables scroll-reveal CSS -->
    <script is:inline>document.documentElement.classList.add('js');</script>

    <!-- Dark mode: set before paint to avoid FOUC -->
```

- [ ] **Step 2: Add the IntersectionObserver script before `</body>`**

Find `</body>` in `src/layouts/BaseLayout.astro`. Add immediately before it:

```html
    <!-- Scroll reveal -->
    <script is:inline>
      (function () {
        var observer = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1 }
        );
        document.querySelectorAll('[data-reveal]').forEach(function (el) {
          observer.observe(el);
        });
      })();
    </script>
  </body>
```

- [ ] **Step 3: Verify type check and build**

```bash
npm run check && npm run build
```

Expected: no errors. The `is:inline` scripts are untyped vanilla JS — Astro passes them through verbatim.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: add scroll-reveal IntersectionObserver"
```

---

## Task 4: Redesign Hero Section

**Files:**
- Modify: `src/components/sections/Hero.astro`

- [ ] **Step 1: Replace the entire file with the dark gradient version**

```astro
---
import { Image } from 'astro:assets';
import avatarSrc from '../../assets/avatar.jpg';

interface Props {
  profile: {
    name: string;
    tagline: string;
    email: string;
    social: Array<{ platform: string; url: string; handle: string; icon: string }>;
  };
}
const { profile } = Astro.props;

const linkedin = profile.social.find(s => s.platform === 'linkedin');
const github   = profile.social.find(s => s.platform === 'github');

const specialtyChips = ['CLV Systems', 'Pricing Strategy', 'Microsimulation', 'Generative AI'];
---

<section
  class="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-zinc-950 via-[#111008] to-[#1a1200]"
  aria-labelledby="hero-heading"
>
  <!-- Subtle gold grid overlay -->
  <div
    class="absolute inset-0 pointer-events-none"
    style="background-image: linear-gradient(rgba(252,189,26,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(252,189,26,0.03) 1px, transparent 1px); background-size: 40px 40px;"
    aria-hidden="true"
  />

  <!-- Glow orb -->
  <div
    class="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
    style="background: radial-gradient(circle, var(--brand) 0%, transparent 70%);"
    aria-hidden="true"
  />

  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid md:grid-cols-2 gap-10 md:gap-12 items-center w-full">

    <!-- Text — first on mobile, left on desktop -->
    <div>
      <p class="text-xs sm:text-sm font-mono text-[var(--brand)] tracking-widest uppercase mb-3 sm:mb-4">
        Senior Data Scientist · Auckland, NZ
      </p>
      <h1
        id="hero-heading"
        class="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-none mb-3"
      >
        {profile.name}
      </h1>

      <!-- Gold gradient underline -->
      <div
        class="h-[3px] w-32 mb-5 rounded-full"
        style="background: linear-gradient(to right, var(--brand), transparent);"
        aria-hidden="true"
      />

      <!-- Specialty chips -->
      <div class="flex flex-wrap gap-2 mb-6">
        {specialtyChips.map(chip => (
          <span class="font-mono text-xs px-2.5 py-1 border border-[var(--brand)]/40 text-[var(--brand)] rounded">
            {chip}
          </span>
        ))}
      </div>

      <p class="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-lg mb-8 sm:mb-10">
        12+ years driving measurable business impact through advanced analytics, machine learning, and data products across financial services and government policy.
      </p>

      <div class="flex flex-wrap gap-3">
        <a
          href="/resume.html"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg bg-[var(--brand)] text-zinc-900 font-semibold text-sm hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-[var(--brand-glow)] no-underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download Resume
        </a>

        {linkedin && (
          <a
            href={linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            class="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-zinc-700 text-zinc-400 hover:border-[var(--brand)] hover:text-[var(--brand)] active:scale-95 transition-all no-underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        )}

        {github && (
          <a
            href={github.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            class="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-zinc-700 text-zinc-400 hover:border-[var(--brand)] hover:text-[var(--brand)] active:scale-95 transition-all no-underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
          </a>
        )}

        <a
          href={`mailto:${profile.email}`}
          class="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg border border-zinc-700 text-zinc-400 font-semibold text-sm hover:border-[var(--brand)] hover:text-[var(--brand)] active:scale-95 transition-all no-underline"
        >
          Contact
        </a>
      </div>
    </div>

    <!-- Avatar — below text on mobile, right on desktop -->
    <div class="flex justify-center md:justify-end mt-2 md:mt-0">
      <div class="relative">
        <div
          class="absolute inset-0 rounded-full blur-3xl opacity-40 scale-110"
          style="background: var(--brand);"
          aria-hidden="true"
        />
        <Image
          src={avatarSrc}
          alt={`${profile.name} profile photo`}
          width={280}
          height={280}
          loading="eager"
          fetchpriority="high"
          class="relative w-36 h-36 sm:w-52 sm:h-52 md:w-72 md:h-72 rounded-full object-cover ring-4 ring-[var(--brand)]/50 shadow-[0_0_40px_rgba(252,189,26,0.25)]"
        />
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Check and preview**

```bash
npm run check
```

Expected: no errors. Open `http://localhost:4321` with `npm run dev` and verify: dark gradient background, gold grid overlay visible, specialty chips appear below name, avatar has gold ring glow.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Hero.astro
git commit -m "feat: redesign Hero with dark gradient, specialty chips, gold underline"
```

---

## Task 5: Create Specializations Component

**Files:**
- Create: `src/components/sections/Specializations.astro`

- [ ] **Step 1: Create the file**

```astro
---
const specializations = [
  {
    icon: '📊',
    title: 'CLV Systems',
    description: 'Customer lifetime value modelling & intelligence',
    featured: true,
  },
  {
    icon: '💰',
    title: 'Pricing Strategy',
    description: 'Revenue optimisation & pricing analytics',
    featured: false,
  },
  {
    icon: '🏛️',
    title: 'Microsimulation',
    description: 'Large-scale policy & population modelling',
    featured: false,
  },
  {
    icon: '🤖',
    title: 'Generative AI',
    description: 'LLM applications & agentic pipelines',
    featured: false,
  },
] as const;
---

<section
  class="py-10 bg-zinc-900"
  aria-label="Core expertise"
>
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <p class="text-xs font-mono tracking-widest uppercase text-zinc-600 text-center mb-8">
      Core Expertise
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {specializations.map((spec, i) => (
        <div
          data-reveal
          class:list={[
            'rounded-xl p-6 border transition-colors',
            spec.featured
              ? 'bg-[rgba(252,189,26,0.06)] border-[rgba(252,189,26,0.2)] hover:border-[var(--brand)]/40'
              : 'bg-zinc-800/30 border-zinc-800 hover:border-[var(--brand)]/40',
          ]}
          style={i > 0 ? `transition-delay: ${i * 80}ms` : ''}
        >
          <div class="text-2xl mb-3" aria-hidden="true">{spec.icon}</div>
          <h3 class:list={[
            'text-sm font-bold mb-2',
            spec.featured ? 'text-[var(--brand)]' : 'text-zinc-200',
          ]}>
            {spec.title}
          </h3>
          <p class="text-xs text-zinc-500 leading-relaxed">{spec.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify type check**

```bash
npm run check
```

Expected: no errors (component has no props interface — it's self-contained).

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Specializations.astro
git commit -m "feat: add Specializations component with 4 expertise cards"
```

---

## Task 6: Create Impact Banner Component

**Files:**
- Create: `src/components/sections/ImpactBanner.astro`

- [ ] **Step 1: Create the file**

```astro
---
const metrics = [
  { value: '12+', label: 'Years Experience' },
  { value: '5',   label: 'Roles Held' },
  { value: '8',   label: 'Major Projects' },
  { value: '3',   label: 'Sectors' },
] as const;
---

<section
  class="py-16 bg-gradient-to-br from-[#0d0d00] to-zinc-950"
  aria-labelledby="impact-heading"
>
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-10">
      <p class="text-xs font-mono tracking-widest uppercase text-zinc-600 mb-3">
        By the Numbers
      </p>
      <h2
        id="impact-heading"
        class="text-2xl font-bold text-white"
        data-reveal
      >
        Impact at a Glance
      </h2>
    </div>
    <div
      class="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-zinc-800 border border-zinc-800 rounded-xl overflow-hidden"
    >
      {metrics.map((m, i) => (
        <div
          data-reveal
          class="py-8 px-6 text-center"
          style={`transition-delay: ${i * 100}ms`}
        >
          <div class="text-5xl font-black text-[var(--brand)] leading-none mb-2">{m.value}</div>
          <div class="font-mono text-xs tracking-widest uppercase text-zinc-500">{m.label}</div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify type check**

```bash
npm run check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ImpactBanner.astro
git commit -m "feat: add ImpactBanner component with 4 career metrics"
```

---

## Task 7: Wire New Components into index.astro

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Replace the entire file**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/layout/Header.astro';
import Hero from '../components/sections/Hero.astro';
import Specializations from '../components/sections/Specializations.astro';
import About from '../components/sections/About.astro';
import ExperienceTimeline from '../components/sections/ExperienceTimeline.astro';
import ProjectsGrid from '../components/sections/ProjectsGrid.astro';
import SkillsMatrix from '../components/sections/SkillsMatrix.astro';
import PublicationsList from '../components/sections/PublicationsList.astro';
import EducationList from '../components/sections/EducationList.astro';
import ImpactBanner from '../components/sections/ImpactBanner.astro';
import ContactFooter from '../components/sections/ContactFooter.astro';
import { getEntry, getCollection } from 'astro:content';

const profileEntry = await getEntry('profile', 'profile');
const profile = profileEntry!.data;

const experience = (await getCollection('experience')).sort(
  (a, b) => a.data.order - b.data.order
);
const projects = await getCollection('projects');
---

<BaseLayout profile={profile}>
  <Header />
  <main id="main-content">
    <Hero profile={profile} />
    <Specializations />
    <About summary={profile.summary} />
    <ExperienceTimeline items={experience} />
    <ProjectsGrid items={projects} />
    <SkillsMatrix />
    <PublicationsList />
    <EducationList languages={profile.languages} interests={profile.interests} />
    <ImpactBanner />
  </main>
  <ContactFooter profile={profile} />
</BaseLayout>
```

- [ ] **Step 2: Verify build**

```bash
npm run check && npm run build
```

Expected: no errors, `dist/` produced successfully.

- [ ] **Step 3: Visual check in dev server**

```bash
npm run dev
```

Open `http://localhost:4321`. Scroll through the page. Verify:
- Specializations strip appears between Hero and About
- Impact Banner appears between EducationList and the footer
- All 4 specialty cards render with icons
- All 4 metric cells render with gold numbers

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: wire Specializations and ImpactBanner into page"
```

---

## Task 8: Redesign Experience Card

**Files:**
- Modify: `src/components/sections/ExperienceCard.astro`

- [ ] **Step 1: Replace the entire file**

```astro
---
import { formatDate, renderInlineMarkdown } from '../../lib/utils';
import type { CollectionEntry } from 'astro:content';

interface Props {
  entry: CollectionEntry<'experience'>;
  isLast: boolean;
}

const { entry, isLast } = Astro.props;
const { title, company, location, startDate, endDate, tags, highlights } = entry.data;
---

<article class:list={['group relative pl-10', !isLast && 'pb-10']} data-reveal>
  <!-- Timeline line: fades from gold to dark -->
  {!isLast && (
    <div
      class="absolute left-[5px] top-4 bottom-0 w-px"
      style="background: linear-gradient(to bottom, var(--brand), #27272a);"
      aria-hidden="true"
    />
  )}

  <!-- Timeline dot with glow -->
  <div
    class="absolute left-0 top-1 w-3 h-3 rounded-full bg-[var(--brand)] ring-4 ring-zinc-950 transition-transform group-hover:scale-125 shadow-[0_0_8px_rgba(252,189,26,0.6)]"
    aria-hidden="true"
  />

  <!-- Card -->
  <div class="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
    <!-- Header row -->
    <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 mb-1">
      <h3 class="text-lg font-semibold text-zinc-100 tracking-tight">
        {title}
      </h3>
      <span class="font-mono text-xs text-[var(--brand)] bg-[rgba(252,189,26,0.08)] px-2 py-1 rounded whitespace-nowrap">
        {formatDate(startDate)} — {formatDate(endDate)}
      </span>
    </div>

    <p class="text-sm text-zinc-500 mb-3">
      {company} · {location}
    </p>

    <!-- Tags — plain spans (avoids Badge component's conflicting brand colors) -->
    {tags.length > 0 && (
      <div class="flex flex-wrap gap-1.5 mb-4">
        {tags.map(t => (
          <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-800 border border-zinc-700 text-zinc-400">
            {t}
          </span>
        ))}
      </div>
    )}

    <!-- Highlights -->
    <ul class="space-y-2">
      {highlights.map(h => (
        <li
          class="relative pl-5 text-sm leading-relaxed text-zinc-400 before:absolute before:left-0 before:top-2.5 before:h-1 before:w-1 before:rounded-full before:bg-[var(--brand)]"
          set:html={renderInlineMarkdown(h)}
        />
      ))}
    </ul>
  </div>
</article>
```

- [ ] **Step 2: Verify and preview**

```bash
npm run check
```

Open `http://localhost:4321` and scroll to Experience. Verify: dark card around each role, date appears as a gold pill on the right, timeline line fades from gold downward, dot has a glow halo.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ExperienceCard.astro
git commit -m "feat: redesign ExperienceCard with dark card, gradient line, date pill"
```

---

## Task 9: Redesign Project Card

**Files:**
- Modify: `src/components/sections/ProjectCard.astro`

- [ ] **Step 1: Replace the entire file**

```astro
---
import type { CollectionEntry } from 'astro:content';

interface Props {
  entry: CollectionEntry<'projects'>;
  featured?: boolean;
}

const { entry, featured = false } = Astro.props;
const { title, blurb, url, stack, category, year } = entry.data;
---

<article
  class:list={[
    'group flex flex-col rounded-xl border p-6 transition-all duration-300',
    featured
      ? 'bg-[#0d0d00] border-[var(--brand)]/35 shadow-[0_0_20px_rgba(252,189,26,0.06)] hover:border-[var(--brand)]/60 hover:shadow-[0_0_28px_rgba(252,189,26,0.10)]'
      : 'bg-zinc-900 border-zinc-800 hover:border-[var(--brand)]/50 hover:shadow-[0_0_16px_rgba(252,189,26,0.06)]',
  ]}
  data-reveal
>
  <!-- Top row: year + badges -->
  <div class="flex items-center justify-between mb-4">
    <span class="font-mono text-xs text-zinc-500">{year}</span>
    <div class="flex items-center gap-2">
      {featured && (
        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-[var(--brand)] text-zinc-900">
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          Featured
        </span>
      )}
      <!-- Plain span avoids Badge component's conflicting brand color classes -->
      <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize bg-zinc-800 border border-zinc-700 text-zinc-400">{category}</span>
    </div>
  </div>

  <!-- Title -->
  <h3 class:list={[
    'text-base font-semibold mb-3 leading-snug',
    featured ? 'text-zinc-50' : 'text-zinc-100',
  ]}>
    {url ? (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-[var(--brand)] transition-colors no-underline"
      >
        {title}
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="inline ml-1 opacity-60"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    ) : title}
  </h3>

  <!-- Blurb -->
  <p class="text-sm leading-relaxed text-zinc-400 flex-1 mb-4">
    {blurb}
  </p>

  <!-- Stack -->
  <div class="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-zinc-800">
    {stack.slice(0, 4).map(s => (
      <span class:list={[
        'text-xs font-mono',
        featured ? 'text-[var(--brand)]' : 'text-zinc-500',
      ]}>{s}</span>
    ))}
  </div>
</article>
```

- [ ] **Step 2: Verify and preview**

```bash
npm run check
```

Open `http://localhost:4321`, scroll to Projects. Verify: featured cards have dark warm background + gold glow border, stack tags on featured cards are gold, non-featured cards are zinc-900 with zinc-800 border, hover glows.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ProjectCard.astro
git commit -m "feat: redesign ProjectCard with dark base and featured gold glow"
```

---

## Task 10: Redesign Skills Matrix

**Files:**
- Modify: `src/components/sections/SkillsMatrix.astro`

- [ ] **Step 1: Replace the entire file**

```astro
---
import { getCollection } from 'astro:content';

const [skillsEntry] = await getCollection('skills');
const { categories } = skillsEntry.data;
---

<section
  id="skills"
  class="py-12 sm:py-20 bg-zinc-900/50"
  aria-labelledby="skills-heading"
>
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <p class="text-sm font-mono text-[var(--brand)] tracking-widest uppercase mb-3">
      Toolkit
    </p>
    <h2
      id="skills-heading"
      class="text-3xl font-bold text-zinc-100 mb-12"
      data-reveal
    >
      Skills
    </h2>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map(cat => {
        const isLanguages = cat.title === 'Languages';
        return (
          <div
            class:list={[
              'rounded-xl p-5 border',
              isLanguages
                ? 'bg-[rgba(252,189,26,0.05)] border-[var(--brand)]/15'
                : 'bg-zinc-900/30 border-zinc-800',
            ]}
            data-reveal
          >
            <h3 class:list={[
              'text-xs font-mono tracking-widest uppercase mb-4',
              isLanguages ? 'text-[var(--brand)]' : 'text-zinc-500',
            ]}>
              {cat.title}
            </h3>
            <div class="flex flex-wrap gap-2">
              {cat.items.map(item => (
                <span class:list={[
                  'px-3 py-1 rounded-full text-sm border transition-colors cursor-default',
                  isLanguages
                    ? 'bg-[#1a1500] text-[var(--brand)] border-[var(--brand)]/30 hover:border-[var(--brand)]/60'
                    : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-[var(--brand)]/40 hover:text-zinc-200',
                ]}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify and preview**

```bash
npm run check
```

Open `http://localhost:4321`, scroll to Skills. Verify: Languages card has gold-tinted border and gold pills, other two categories have dark cards and zinc pills, "Professional" soft skills are gone.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/SkillsMatrix.astro
git commit -m "feat: redesign SkillsMatrix with gold Languages, dark pills, 3 categories"
```

---

## Task 11: Update Section Backgrounds

**Files:**
- Modify: `src/components/sections/About.astro`
- Modify: `src/components/sections/ExperienceTimeline.astro`
- Modify: `src/components/sections/ProjectsGrid.astro`
- Modify: `src/components/sections/PublicationsList.astro`
- Modify: `src/components/sections/EducationList.astro`

All changes are single-line `class` attribute replacements on the outer `<section>` element. The goal is to remove light-mode classes and apply the dark-theme background rhythm.

Section rhythm (top to bottom):
- Hero → dark gradient (already done in Task 4)
- Specializations → `bg-zinc-900` (already in Task 5)
- About → `bg-zinc-950`
- Experience → `bg-zinc-900/50`
- Projects → `bg-zinc-950`
- Skills → `bg-zinc-900/50` (already in Task 10)
- Publications → `bg-zinc-950`
- Education → `bg-zinc-900/50`
- Impact Banner → dark gradient (already in Task 6)

- [ ] **Step 1: Update About.astro section class**

In `src/components/sections/About.astro`, find:
```
class="py-12 sm:py-20 bg-zinc-50 dark:bg-zinc-950"
```
Replace with:
```
class="py-12 sm:py-20 bg-zinc-950"
```

Also update heading and paragraph text colors — remove `dark:` prefixes since we're now dark-only:

Find:
```
class="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8"
```
Replace with:
```
class="text-3xl font-bold text-zinc-100 mb-8"
```

Find:
```
class="text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
```
Replace with:
```
class="text-base leading-relaxed text-zinc-400"
```

Find:
```
class="text-sm font-mono text-[var(--brand)] tracking-widest uppercase mb-3"
```
Keep as-is (already uses CSS custom property).

Add `data-reveal` to the `<p class="text-sm font-mono...">` wrapper div. In `About.astro` the content div is `<div class="max-w-[65ch]">`. Add `data-reveal` to the heading `<h2>`:

Find:
```html
      <h2
        id="about-heading"
        class="text-3xl font-bold text-zinc-100 mb-8"
      >
```
Replace with:
```html
      <h2
        id="about-heading"
        class="text-3xl font-bold text-zinc-100 mb-8"
        data-reveal
      >
```

- [ ] **Step 2: Update ExperienceTimeline.astro section class**

In `src/components/sections/ExperienceTimeline.astro`, find:
```
class="py-12 sm:py-20 bg-zinc-50 dark:bg-zinc-900/50"
```
Replace with:
```
class="py-12 sm:py-20 bg-zinc-900/50"
```

Also update the heading:

Find:
```
class="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-12"
```
Replace with:
```
class="text-3xl font-bold text-zinc-100 mb-12"
```

Add `data-reveal` to the `<h2>`:
```html
    <h2
      id="experience-heading"
      class="text-3xl font-bold text-zinc-100 mb-12"
      data-reveal
    >
```

- [ ] **Step 3: Update ProjectsGrid.astro section class**

In `src/components/sections/ProjectsGrid.astro`, find:
```
class="py-12 sm:py-20 bg-zinc-50 dark:bg-zinc-950"
```
Replace with:
```
class="py-12 sm:py-20 bg-zinc-950"
```

Also update the heading:

Find:
```
class="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-12"
```
Replace with:
```
class="text-3xl font-bold text-zinc-100 mb-12"
```

Add `data-reveal` to the `<h2>`:
```html
    <h2
      id="projects-heading"
      class="text-3xl font-bold text-zinc-100 mb-12"
      data-reveal
    >
```

- [ ] **Step 4: Update PublicationsList.astro section class**

In `src/components/sections/PublicationsList.astro`, find:
```
class="py-12 sm:py-20 bg-zinc-50 dark:bg-zinc-950"
```
Replace with:
```
class="py-12 sm:py-20 bg-zinc-950"
```

Also update the heading:

Find:
```
class="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-12"
```
Replace with:
```
class="text-3xl font-bold text-zinc-100 mb-12"
```

Add `data-reveal` to the `<h2>`:
```html
    <h2
      id="publications-heading"
      class="text-3xl font-bold text-zinc-100 mb-12"
      data-reveal
    >
```

The publication list items and year labels use `text-zinc-600 dark:text-zinc-400` and similar. Update these as well:

In `PublicationsList.astro`, find:
```
class="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
```
Replace with:
```
class="text-sm leading-relaxed text-zinc-400"
```

Find:
```
class="flex-1 h-px bg-zinc-100 dark:bg-zinc-800"
```
Replace with:
```
class="flex-1 h-px bg-zinc-800"
```

- [ ] **Step 5: Update EducationList.astro section class**

In `src/components/sections/EducationList.astro`, find:
```
class="py-12 sm:py-20 bg-zinc-50 dark:bg-zinc-900/50"
```
Replace with:
```
class="py-12 sm:py-20 bg-zinc-900/50"
```

Update heading text colors:

Find:
```
class="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8"
```
Replace with:
```
class="text-3xl font-bold text-zinc-100 mb-8"
```

Find all occurrences of `dark:text-zinc-100`:
```
class="font-semibold text-zinc-900 dark:text-zinc-100 text-sm"
```
Replace with:
```
class="font-semibold text-zinc-100 text-sm"
```

Find:
```
class="px-2.5 py-1 rounded-full text-xs border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
```
Replace with:
```
class="px-2.5 py-1 rounded-full text-xs border border-zinc-700 text-zinc-400"
```

Add `data-reveal` to the Education `<h2>`:
```html
        <h2
          id="education-heading"
          class="text-3xl font-bold text-zinc-100 mb-8"
          data-reveal
        >
```

- [ ] **Step 6: Verify full build**

```bash
npm run check && npm run build
```

Expected: no errors, `dist/` produced successfully.

- [ ] **Step 7: Visual end-to-end check**

```bash
npm run dev
```

Open `http://localhost:4321`. Scroll through the entire page top to bottom and verify:
1. Hero: dark gradient, gold grid, specialty chips, gold avatar ring ✓
2. Specializations: 4 cards with icons, gold-tinted first card ✓
3. About: dark background, text readable ✓
4. Experience: dark cards, gradient timeline, date pills ✓
5. Projects: dark cards, featured cards have gold glow ✓
6. Skills: Languages category in gold, other two categories in zinc, no soft skills ✓
7. Publications: dark background, citations readable ✓
8. Education: dark background ✓
9. Impact Banner: gold numbers, 4 metrics ✓
10. Footer: unchanged dark footer ✓
11. Scroll down slowly — elements animate in with fade+rise ✓

- [ ] **Step 8: Commit**

```bash
git add \
  src/components/sections/About.astro \
  src/components/sections/ExperienceTimeline.astro \
  src/components/sections/ProjectsGrid.astro \
  src/components/sections/PublicationsList.astro \
  src/components/sections/EducationList.astro
git commit -m "feat: apply dark background rhythm to all sections"
```

---

## Final Verification

- [ ] **Run type check and production build one last time**

```bash
npm run check && npm run build
```

Expected: no errors.

- [ ] **Check `.gitignore` includes `.superpowers/`**

```bash
grep -q ".superpowers" .gitignore && echo "already ignored" || echo ".superpowers/" >> .gitignore && git add .gitignore && git commit -m "chore: ignore .superpowers brainstorm files"
```
