# Evidence-led professional portfolio

Kevin's supplied eight-phase brief is the specification. The audience is senior analytics, banking and technical decision-makers. Preserve Astro 5, Tailwind 4, Netlify, the yellow accent, Geist typography, dark default, accessibility patterns and career dates.

## Structure and editorial decisions

- Open with banking pricing, customer intelligence and statistical judgement. Route visitors directly to public work, experience and contact.
- Separate professional employment, collaborative research and independent work. Remove unsupported numerical outcomes and exaggerated leadership wording. Existing employment descriptions are self-reported, not independently certified.
- Feature Automated Psychometrics with credited co-authorship and software contribution, a primary-source paper, public source code and a linked case study covering Problem → Approach → Trade-offs → Evidence → Outcome → Lessons. Keep earlier work in the index. Only add another featured project if independently verifiable public evidence supports it.
- The three newer candidate repositories are private. Kevin chose option 1: exclude them from public copy and record them only as future candidates in the delivery notes. Do not change visibility.
- Add an Insights collection and index/detail routes with topic, date, summary, optional external canonical URL and explicit draft/outline/published status. Three public outlines are writing plans, visibly labelled as such. Drafts produce no routes or index links. No RSS until completed articles exist.
- Share layout and readable prose styles across case studies and Insights. Navigation must return to homepage anchors from every route. Add page-specific canonical/OG URLs and Article JSON-LD for Insights; retain a stable Person identity. Keep /resume noindex and outside the sitemap.
- Deliver Markdown audit, evidence inventory, unresolved claims, LinkedIn headline/About/experience/Featured recommendations, 30-day plan and three source-backed post drafts. Do not update LinkedIn or domain configuration.

## Verification and delivery

Use a feature branch. Test generated routes, metadata, internal links, draft exclusion, curated project data, and print consistency. Run npm run check, npm test and npm run build. Check desktop/mobile, keyboard navigation and print using a browser if feasible. Capture screenshots and report limits. Open a PR after implementation and verification; never merge.

## Known limits

LinkedIn blocks public retrieval (HTTP 999). The reference article exposes only its preview; use the principle supplied in Kevin's brief, not claims about the unread text. www.kevinchang.nz serves an older CV; ownership and deployment access are not established by that response. Citation APIs disagree with the existing 1,200+ claim; omit citation totals rather than replacing them with volatile counts.
