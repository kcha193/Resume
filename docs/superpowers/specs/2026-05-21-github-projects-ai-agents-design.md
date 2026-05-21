# Design: Add AI Agent Projects from GitHub

**Date:** 2026-05-21  
**Status:** Approved

## Goal

Add two recent AI engineering projects (`btc_trader_binance`, `daily-briefing`) to the resume website as first-class project entries, update the featured set to reflect the 2026 AI pivot, and extend the schema to accommodate an `agent` category.

## Changes

### 1. Schema — `src/content/config.ts`

Add `'agent'` to the `category` enum (line 47):

```ts
category: z.enum(['app', 'dashboard', 'research', 'tool', 'policy', 'agent']),
```

### 2. New Project Files

#### `src/content/projects/btc-trader-binance.md`

```yaml
title: "Multi-Asset LLM Trading Bot"
blurb: "Autonomous trading bot using a 3-stage LLM pipeline (DeepSeek → Gemini → GPT-5.4) to trade BTC, ETH, and SOL on Binance Spot. Quant stack includes LightGBM, GARCH(1,1), and HMM regime detection. Deployed on a Synology NAS via Docker with CI/CD auto-deploy and a read-only web dashboard."
stack: ["Python", "LightGBM", "GARCH", "HMM", "Docker", "OpenRouter", "Binance API", "FastAPI", "Telegram"]
category: "agent"
featured: true
year: 2026
# no url — private repo
```

Body: brief description of the 3-stage pipeline and production deployment context.

#### `src/content/projects/daily-briefing.md`

```yaml
title: "Personalised Daily Briefing Bot"
blurb: "Self-scheduling Telegram bot delivering three personalised briefings per day. Learns user interests via an evolving memory store and flags statistical anomalies (IQR-based) in NZ currencies, indices, and bank mortgage/TD rates. ~$0.03/day running cost."
stack: ["Python", "Docker", "OpenRouter", "SQLite", "Telegram"]
category: "agent"
featured: true
year: 2026
# no url — private repo
```

Body: brief description of the personalisation loop and anomaly detection.

### 3. Featured Changes

| File | Before | After |
|---|---|---|
| `btc-trader-binance.md` | (new) | `featured: true` |
| `daily-briefing.md` | (new) | `featured: true` |
| `better-start-model.md` | `featured: true` | no change |
| `automated-psychometrics.md` | `featured: true` | no change |
| `nz-social-lab.md` | `featured: true` | `featured: false` |

Total featured after: 4.

### 4. CLAUDE.md

Update the featured-limit note from "3 or fewer" to "4 or fewer" to reflect the raised limit.

## Rationale

- The `agent` category accurately labels production autonomous systems; `tool` or `app` would undersell both projects.
- Featuring all 2026 work plus `automated-psychometrics` (PLoS ONE, 1200+ citations) signals both current AI engineering capability and prior research rigour.
- `nz-social-lab` (2017) is the weakest featured entry by recency and is the natural demotion candidate.
- Private repos carry no URL — the schema's optional `url` field handles this cleanly.

## Out of Scope

- Skills YAML update (separate task if needed).
- Any layout or component changes — the existing `ProjectsGrid` already renders `category` as a badge and handles missing URLs.
