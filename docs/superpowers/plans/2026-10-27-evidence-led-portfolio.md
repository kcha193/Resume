# Evidence-led Portfolio Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task by task, inline. The user supplied an end-to-end implementation brief; proceed within that scope.

**Goal:** Make Kevin's expertise clear through restrained positioning, verifiable public work and maintainable writing routes.

**Architecture:** Extend existing Astro content collections and shared layout. Add static case-study and Insights pages with no client framework or CMS. Use built-output regression tests so checks exercise visitor-visible behaviour.

**Tech Stack:** Astro 5, Tailwind CSS 4, Markdown/YAML, Node built-in test runner.

**Spec:** ../specs/2026-10-27-evidence-led-portfolio-design.md

## Global constraints

- Preserve current design system, career chronology, deployment and accessibility patterns.
- No unverified metrics, invented outcomes or confidential employer detail.
- Exclude private candidate projects from public content; no visibility changes.
- No LinkedIn modification, domain change or automatic merge.

## Review focus

- Draft content must never leak into routes, navigation or sitemap.
- Detail-page navigation must reach real homepage sections.
- Canonical and OG URLs must describe each route; external canonical overrides must agree.
- Featured project evidence and print resume must stay consistent.
- Mobile menu, reduced motion, keyboard focus and print pagination must remain usable.

## Task 1: Evidence and positioning

Files: profile/snapshot/experience/project/publication content, ProjectCard, ProjectsGrid, Hero, ContactFooter, resume, docs/portfolio.

- [x] Record baseline audit and primary-source inventory, with unsupported claims held for approval.
- [x] Add built-output regression checks for claim removal, featured case-study links and print consistency; demonstrate failure on baseline output.
- [x] Rewrite public-safe content, preserve career dates, curate featured research and add six-part case-study schema and route.
- [x] Verify content validation and generated case-study/print output.

## Task 2: Insights and discoverability

Files: content/config.ts, content/insights/*.md, pages/insights, layouts/BaseLayout, lib/seo, NavMenu, global.css, index, new InsightsList and reading layout.

- [x] Add regression checks for three outline routes, Article/Person identity, route canonical/OG URLs, sitemap, cross-page anchors and internal-link integrity; confirm failure before implementation.
- [x] Add typed Insights schema and explicit draft filtering; seed three outlines without first-person invented experience.
- [x] Render routes using shared typography/layout and semantic headings; fix scroll-spy for absolute homepage anchors.
- [x] Exercise a temporary draft fixture and external canonical override during regression tests; ensure fixtures are cleaned in finally blocks.
- [x] Run check, test and build.

## Task 3: Delivery and review

Files: docs/portfolio, README, AGENTS instructions where architecture needs updating; screenshots under docs/portfolio/screenshots.

- [x] Write LinkedIn recommendations with three public-source post drafts and a 30-day relationship/posting plan.
- [x] Check responsive layout, keyboard menu, reduced motion and print output; capture screenshots where feasible.
- [x] Obtain a fresh review of the branch, resolve material findings and inspect the final diff.
- [x] Commit/push feature branch and create PR as authorised by the brief; do not merge. Report verification and deployment implications. PR #20 is open and unmerged.
- [x] Update the Resume project status in canonical current-projects.md.

## Execution record

- Baseline `npm test` passed. New built-output tests failed against baseline on unsupported metrics and absent routes before implementation.
- `npm run check` now reports zero diagnostics; seven generated-output regressions pass, including collision-safe fixture cleanup. Production build emits seven routes.
- Fresh review found one P2: cleanup after a rejected exclusive fixture write could delete an existing source file. A subprocess regression reproduced deletion, then passed after tracking only successfully created fixtures.
- Browser keyboard testing reproduced the unfocusable skip target; `tabindex=-1` fixes it and is covered by generated-output and browser checks.
- Browser print inspection confirmed pale reading headings on white paper from dark mode. Print tokens now reset ink colours and reveal hidden content.
- Decision: keep private candidates out, following Kevin's explicit reply; preserve the Netlify canonical hostname, defer domain consolidation and RSS. No unresolved review findings are being accepted as implementation trade-offs.

- Final print QA also fixed an orphaned Selected Projects heading and blank first reading page. Both final PDFs are two pages with readable dark ink.
