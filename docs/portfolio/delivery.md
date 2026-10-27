# Portfolio delivery notes

27 October 2026. Feature branch: `feat/evidence-led-portfolio`; base: `51fed77`.

[PR #20](https://github.com/kcha193/Resume/pull/20) is open and unmerged. The production site remains on `main` until the PR is merged and Netlify finishes deploying it.

## What changed

The site now leads with banking pricing and statistical judgement, with customer intelligence, model assurance and policy modelling as the distinguishing background. Unsupported adoption, citation and numerical impact claims have been removed. Career titles and dates remain as supplied in the existing content.

Automated Psychometrics is the curated featured case study. Its detail page follows Problem → Approach → Trade-offs → Evidence → Outcome → Lessons, with links to its paper, code and application. Earlier projects remain discoverable with scope labels. The three private candidate projects are excluded, as Kevin requested.

Insights adds a Markdown collection, index and reading routes. The three initial entries are explicitly labelled outlines on banking pricing, applied AI and decision-making. Draft content generates no route or listing. No RSS was added because no completed articles are being launched.

Person metadata has a stable identity. Article metadata and canonical/Open Graph URLs describe each reading route; intentional external canonicals agree across all three. The print resume shares the revised content, remains noindex and is excluded from the sitemap. The social card has been regenerated from its SVG source. No production dependency was added.

## Review material

- [Baseline, before/after positioning, evidence inventory and held claims](audit-and-evidence.md)
- [LinkedIn headline, About, experience, Featured, 30-day plan and three post drafts](linkedin-recommendations.md)
- [Implementation design](../superpowers/specs/2026-10-27-evidence-led-portfolio-design.md)
- [Implementation plan](../superpowers/plans/2026-10-27-evidence-led-portfolio.md)
- [Before desktop](screenshots/before-desktop.png)
- [After desktop](screenshots/after-desktop.png)
- [After mobile](screenshots/after-mobile.png)
- [Case study](screenshots/case-study.png)
- [Insight on mobile](screenshots/insight-mobile.png)

## Deployment considerations

Merge only after reviewing the wording and held claims. Netlify's existing main-branch build publishes `dist/`; this work does not change hosting, repository visibility or domain configuration. The new static routes are `/insights/`, three outline routes and `/work/automated-psychometrics/`. Check the deploy preview before merging, then confirm those URLs and social metadata on the live hostname.

`www.kevinchang.nz` still serves an older profile. A domain consolidation needs confirmed access to that deployment and DNS first. LinkedIn, the GitHub profile website field and the old domain must be aligned manually after choosing the primary domain. New Featured links in the LinkedIn document become usable only after deployment.

LinkedIn was not readable through public retrieval. The reference article was accessible only as a preview. Historical apps returning HTTP 202 were not functionally verified. Other research records are preserved from the existing site, with no assertion that their entire bibliography has been independently audited. No live model run, research reproduction, domain change or external message/post was performed.

## Verification

- `npm run check`: passed; zero errors, warnings or hints.
- `npm test`: passed; source guardrails and seven generated-output regression tests. Draft/canonical fixtures are isolated from deploy output; a subprocess test verifies existing content survives a fixture collision.
- `npm run build`: passed; seven static pages, sitemap generated, resume excluded and no regression fixture routes.
- Browser checks: passed for 25 combinations of five representative routes at 375, 390, 768, 1024 and 1440 pixels, with no horizontal overflow or page errors. Keyboard checks cover skip-link focus, mobile menu focus, Tab/Shift+Tab trapping, Escape, Insights navigation and return-to-home anchors. Dark default, theme persistence and reduced motion were checked.
- axe-core checks: zero WCAG 2 A/AA and 2.1 AA violations across five representative routes in both themes. Automated scans do not replace assistive-technology testing; no screen-reader session was run.
- Print: resume and case study exported as two-page A4 PDFs and visually inspected after rendering. Fixed an orphaned project heading, blank lead page on reading routes and pale dark-theme print text. [Resume PDF](screenshots/resume-print.pdf), [case-study PDF](screenshots/case-study-print.pdf).
- Public links: paper, code, autopsych landing page and thesis handle checked; other app runtime limitations are recorded in the audit. Internal links/fragments are checked across generated pages.
- Fresh independent code review: one P2 fixture-cleanup issue reproduced and fixed with a failing-then-passing test. No remaining material findings. The review's print concern was confirmed and fixed in browser/PDF QA.
- `git diff --check`: passed. The pre-commit gitleaks gate scans staged changes before commit.

Browser QA used local Chromium through Playwright 1.64.1 and an external axe-core checker, without adding them to production dependencies. The in-app browser execution tool was unavailable. Desktop/mobile and reading-page screenshots were visually inspected. Browser and accessibility observations are saved alongside the screenshots.
