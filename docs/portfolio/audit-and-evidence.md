# Portfolio audit and evidence record

Reviewed 27 October 2026. Baseline: `51fed77` on `main`. Sources below were checked during this work. A live page proves availability at the time checked, not adoption, business impact or continuing maintenance.

## Baseline audit

The Astro collections already separate profile, roles, projects, skills, research and education. The editorial design, self-hosted fonts, dark theme, restrained yellow accent and existing focus/menu patterns suit the intended audience. A visual redesign was unnecessary.

The credibility gap was in the copy. The summary asserted revenue growth, C-suite impact, recognised mentoring and team leadership without supporting evidence. Featured projects mixed collaborative research with personal experiments, gave volatile test/cost figures prominence, and repeated unsupported adoption and citation counts. Research records mostly lacked primary-source links. There was no writing collection or detail-page reading layout. The shared layout always used the homepage canonical and Open Graph URL, which would misidentify new routes.

Contact already offered email, LinkedIn and a printable resume. The revised copy gives a clearer reason to connect: a senior data science role, research collaboration or a question about the public work. The hero now links directly to selected work, alongside experience and the resume.

## Before and after positioning

| Area | Before | After |
| --- | --- | --- |
| Opening | Broad promise to turn pricing, AI and customer intelligence into business decisions | Banking pricing and AI, grounded in statistical judgement |
| Summary | “Data science leader delivering measurable business impact”; revenue growth and team claims | Pricing and customer intelligence, distinguished by model assurance, policy microsimulation and statistical research |
| Proof | Citation/adoption totals, trading infrastructure and briefing cost figures | Credited collaborative research, a paper, public code and an inspectable case study |
| Outcomes | Implicit business or policy impact | Demonstrated artefacts and capabilities, with limitations stated |
| Writing | No article routes | Three labelled outlines with dates, topics and clear publication status |

## Evidence inventory

| Item | Source and observation | Editorial decision |
| --- | --- | --- |
| autopsych authorship and contribution | [PLOS ONE paper](https://doi.org/10.1371/journal.pone.0257682), published 11 October 2021. Lists Kevin C. T. Chang and credits software, methodology and visualisation among other contributions. | Feature as collaborative research, without sole-authorship or employer attribution. |
| autopsych artefacts | [Application](https://autopsych.shinyapps.io/version_1_0_0/) and [public repository](https://github.com/kcha193/AutoPsychShiny) returned HTTP 200. | Link paper, code and application. Landing-page availability was checked; a full analytical run was not performed. |
| “1,200+ citations” | [Crossref DOI record](https://api.crossref.org/works/10.1371/journal.pone.0257682) reported `is-referenced-by-count: 4`; [OpenAlex DOI record](https://api.openalex.org/works/https://doi.org/10.1371/journal.pone.0257682) reported `cited_by_count: 4`. [PLOS metrics](https://journals.plos.org/plosone/article/metrics?id=10.1371/journal.pone.0257682) exposed metric labels without numeric totals to the reader used. | Existing claim is unsupported for this DOI. Counts depend on provider and coverage; publish no replacement total. Do not reinterpret it as Kevin's aggregate citations. |
| autopsych adoption | Paper and public application establish the tool and its functions, not a count of adopting organisations. | Remove “60+ institutions” and claims about major NZ assessment organisations. |
| Statistical experience duration | Existing career chronology starts January 2014; October 2026 is more than 12 years later. | Retain “12+ years” as arithmetic from self-reported chronology, not independent employment verification. |
| Career and ASB responsibilities | Existing site content and supplied positioning. LinkedIn public retrieval returned HTTP 999; a focused search did not provide an authoritative readable profile. | Preserve dates/titles; use general responsibilities. No claim of an independently completed LinkedIn comparison. |
| Earlier applications | Better Start, Knowledge Laboratory, Pacific Aid Mapping, NZ Social Laboratory, Income Explorer and COVID case trends URLs returned HTTP 202 to direct requests; the web reader could not confirm application content. | Retain existing historical links and modest descriptions in the index. Do not label them tested live demos or claim current policy/data accuracy. |
| Income Explorer identity | [Treasury's current tool record](https://www.treasury.govt.nz/publications/income-explorer) describes a release first published in 2024, after Kevin's listed Treasury role. | Do not substitute that current tool or attribute its release to Kevin. Label the existing project/link historical. |
| Thesis | [University repository handle](https://hdl.handle.net/2292/37016) returned HTTP 200 and redirected to the University's ResearchSpace handle. Existing record names the 2017 thesis. | Retain the thesis record; no research-performance or adoption claim. |
| Non-normality paper | [Publisher record](https://doi.org/10.1111/test.12154) identifies *Teaching Statistics*, 40(2), 51–59 (2018). | Correct “Test Journal”, link the DOI, remove “500+ academic practitioners”. |
| normalr, considered for LinkedIn context | [CRAN record](https://CRAN.R-project.org/package=normalr) says archived 4 May 2026 because maintainer email was undeliverable. Publisher record links the associated software. | Historical research context only. Do not recommend it as a currently maintained package. |
| Remaining publication records | Retained from existing content; not all bibliographic details independently revalidated. | Remove appended unsourced impact statements; do not claim an independently audited total of peer-reviewed papers. |

## Featured project assessment

| Candidate | Public evidence and decision |
| --- | --- |
| Automated Psychometrics | Include. Public paper, public code and application; contribution is credited. Six-part case study separates artefact outcome from inferred design lessons. |
| ai-bank-pricing-engine | GitHub metadata says private. Exclude from public site following Kevin's option-1 reply. A future feature needs a deliberately published, public-safe artefact and an explicit personal-project label. |
| NZ-Stats-Intelligence-Dashboard | GitHub metadata says private. Exclude; same public-evidence prerequisite. |
| nz-election-monitor-2026 | GitHub metadata says private. Exclude; same public-evidence prerequisite. |
| Other existing projects | Retain in the historical index. Their strategic fit and current evidence do not justify equal prominence with the verified research case study. |

No repository visibility was changed. No private source implementation is reproduced in the public site.

## Unresolved claims requiring Kevin's evidence and approval

These claims have been removed or generalised. Approval alone cannot establish an independently verifiable number; provide a source, measurement definition, period and attribution before reinstating it.

- “1,200+ citations”: identify the publication or author profile, provider and date if the number refers to something else.
- “60+ institutions” or major-organisation autopsych adoption: provide a public adoption list, paper or approved evidence record.
- “60+ consulting clients”: distinguish clients from institutions, with a count source and permission to cite it.
- “$50M+” policy investment attribution; “20+” policy teams; “50+” interventions; “100+” scenarios; months-to-days improvement; media adoption: each needs a traceable source and a defensible attribution to Kevin's work.
- Trading “944 tests” and briefing “$0.03/day”: volatile, unverified implementation/cost claims; no investment outcome is inferred.
- Revenue-growth attribution, team-building/leadership, recognised mentoring, C-suite reach and specific ASB simulation methods: require approved public-safe wording and evidence before stronger claims are added. Existing general skills are self-reported.
- LinkedIn headline, dates and current role: compare manually in the authenticated profile before applying the recommendations.

## Reputation, relationships and domain findings

[The reference article](https://dariusforoux.medium.com/how-to-become-hard-to-ignore-2372138c26a8) exposed its title, subtitle and preview, with the rest member-only. The implementation follows the principle supplied in Kevin's brief. It does not endorse or repeat the preview's networking statistics.

[www.kevinchang.nz](https://www.kevinchang.nz/) serves an older CV, while the apex redirects there with HTTP 301. Its older role title and “20+ years” conflict with the current site. Similar content and a matching identity suggest a duplicate-profile issue; they do not prove current control of the domain or its deployment. The existing Netlify hostname remains canonical. No DNS, Netlify domain or redirect settings were changed.

If Kevin confirms control, inspect that site's repository, Netlify project and DNS before choosing a primary domain. Then update canonical URLs, sitemap, robots, social card text, profile links and redirects together. Recheck public search results after deployment. The GitHub profile website field and LinkedIn links should be updated manually to the chosen site; outbound links alone cannot establish reciprocal links.

The LinkedIn plan pairs public evidence with useful discussion and direct professional relationships. No testimonials, recommendations, outbound messages or posts were created in external services.
