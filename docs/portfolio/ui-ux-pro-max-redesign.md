# UI/UX Pro Max — 2026 portfolio redesign

## Brief
Rework the public homepage as a credible, evidence-first portfolio for senior data science, banking pricing, and applied AI audiences. Keep the printable resume, content collections, SEO, and reading routes unchanged.

## Skill provenance
Applied guidance from [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) (public v2 skill, reviewed 28 October 2026):
- Product recommendation: Portfolio/Personal with a storytelling-led landing pattern.
- Style: Minimalism / Swiss plus disciplined editorial layout; motion is secondary.
- Colour: retained established semantic ink/paper and gold accent rather than a wholesale brand migration.
- Typography: retained self-hosted Geist Variable + Geist Mono for performance and hierarchy.
- UX: visible focus, strong contrast, 44px targets, responsive stacking, non-hover navigation, and reduced-motion behavior.

## Design decisions
1. Hero answers who / what / why, then immediately offers selected work and resume.
2. The portrait is a single, optimized first-party image; no arbitrary stock imagery.
3. Capability tiles turn lengthy prose into four decision-oriented lenses without invented metrics.
4. One sourced case study leads; other publicly linked projects are easier to discover.
5. Private or unsupported projects, unverified outcome numbers and false work attribution remain excluded.
6. The page remains semantic, content-driven Astro, with no JavaScript dependencies introduced.

## Review checklist
- Test keyboard navigation, focus rings and mobile menu on real devices.
- Check 375, 768, 1024 and 1440px widths, both themes and 200% zoom.
- Verify reduced-motion and touch usability.
- Run `npm run check`, `npm test`, `npm run build` in a Node 20 environment with dependencies installed.
- Confirm evidence links, print resume, and SEO metadata still work.
