# AI Agent Projects Feature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two AI agent projects from GitHub to the resume website, update the featured set, and extend the content schema with an `agent` category.

**Architecture:** Schema-first — extend the Zod enum first so TypeScript catches any content errors immediately. Then add project content files and update featured flags. No component or layout changes needed; the existing `ProjectsGrid` already handles the `category` badge and optional `url`.

**Tech Stack:** Astro 5, Zod (content collection schema), Tailwind CSS 4, `npm run check` (Astro + TS type check), `npm run build` (full build + Zod validation), `npm test` (site guardrails via `scripts/validate-site.mjs`)

---

### Task 1: Extend the category enum

**Files:**
- Modify: `src/content/config.ts:47`

- [ ] **Step 1: Add `'agent'` to the category enum**

Open `src/content/config.ts`. Find line 47:

```ts
category: z.enum(['app', 'dashboard', 'research', 'tool', 'policy']),
```

Change it to:

```ts
category: z.enum(['app', 'dashboard', 'research', 'tool', 'policy', 'agent']),
```

- [ ] **Step 2: Run type check to verify the schema change compiles**

```bash
npm run check
```

Expected: no errors. If you see a Zod or TS error, the enum syntax is wrong — re-check the quotes and comma.

- [ ] **Step 3: Commit**

```bash
git add src/content/config.ts
git commit -m "feat: add 'agent' category to projects schema"
```

---

### Task 2: Add btc-trader-binance project file

**Files:**
- Create: `src/content/projects/btc-trader-binance.md`

- [ ] **Step 1: Create the file with the following exact content**

```markdown
---
title: "Multi-Asset LLM Trading Bot"
blurb: "Autonomous bot running a 3-stage LLM pipeline (DeepSeek → Gemini → GPT-5.4) to trade BTC, ETH, and SOL on Binance Spot. Quant stack: LightGBM classifier, GARCH(1,1) volatility, HMM regime detection. Deployed on a Synology NAS via Docker with CI/CD auto-deploy and a read-only web dashboard."
stack: ["Python", "LightGBM", "GARCH", "HMM", "Docker", "OpenRouter", "Binance API", "FastAPI", "Telegram"]
category: "agent"
featured: true
year: 2026
---

3-stage LLM pipeline: Stage 1 generates trading signals from technical indicators (RSI, MACD, Bollinger Bands, ATR, ADX), Stage 2 validates with an independent model, Stage 3 applies the final risk gate. Exits handled entirely by mechanical TP/SL/trailing-stop logic. Risk controls include drawdown auto-pause, circuit breaker, correlation guard, and a daily loss limit. 944-test suite with CI on every push; merges auto-deploy to the NAS.
```

- [ ] **Step 2: Verify the blurb is within 280 characters**

```bash
node -e "const s='Autonomous bot running a 3-stage LLM pipeline (DeepSeek → Gemini → GPT-5.4) to trade BTC, ETH, and SOL on Binance Spot. Quant stack: LightGBM classifier, GARCH(1,1) volatility, HMM regime detection. Deployed on a Synology NAS via Docker with CI/CD auto-deploy and a read-only web dashboard.'; console.log(s.length)"
```

Expected: a number ≤ 280.

- [ ] **Step 3: Run a build to validate the content against the Zod schema**

```bash
npm run build
```

Expected: build succeeds with no content collection errors. If you see a Zod error like `"agent" is not a valid enum value`, Task 1 was not completed — go back and check `config.ts`.

- [ ] **Step 4: Commit**

```bash
git add src/content/projects/btc-trader-binance.md
git commit -m "feat: add Multi-Asset LLM Trading Bot project"
```

---

### Task 3: Add daily-briefing project file

**Files:**
- Create: `src/content/projects/daily-briefing.md`

- [ ] **Step 1: Create the file with the following exact content**

```markdown
---
title: "Personalised Daily Briefing Bot"
blurb: "Self-scheduling Telegram bot delivering three personalised briefings per day. Learns user interests via an evolving memory store and flags statistical anomalies (IQR-based) in NZ currencies, indices, and bank mortgage and term-deposit rates. ~$0.03/day running cost."
stack: ["Python", "Docker", "OpenRouter", "SQLite", "Telegram"]
category: "agent"
featured: true
year: 2026
---

Covers NZ and world news, weather, financial markets, and NZ bank mortgage and term-deposit rates across ANZ, ASB, BNZ, Westpac, and Kiwibank. After each briefing, the bot extracts new interests and themes from the content into a persistent `memory.json` store; facts not seen in 60 days are archived. Anomaly detection uses IQR with per-metric minimum absolute-move thresholds to suppress economically trivial fluctuations. Deployed via Docker on a Synology NAS; cron runs inside the container — no external scheduler needed.
```

- [ ] **Step 2: Run a build to validate**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/content/projects/daily-briefing.md
git commit -m "feat: add Personalised Daily Briefing Bot project"
```

---

### Task 4: Demote NZ Social Lab from featured

**Files:**
- Modify: `src/content/projects/nz-social-lab.md`

- [ ] **Step 1: Change `featured: true` to `featured: false`**

Open `src/content/projects/nz-social-lab.md`. Change:

```yaml
featured: true
```

to:

```yaml
featured: false
```

No other changes.

- [ ] **Step 2: Run build to confirm**

```bash
npm run build
```

Expected: build succeeds. The site now has 4 featured projects (btc-trader-binance, daily-briefing, better-start-model, automated-psychometrics).

- [ ] **Step 3: Commit**

```bash
git add src/content/projects/nz-social-lab.md
git commit -m "fix: demote NZ Social Lab from featured to make room for 2026 AI projects"
```

---

### Task 5: Update CLAUDE.md featured limit note

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update the featured limit note**

Open `CLAUDE.md`. Find the line:

```
Keep featured to **3 or fewer** projects — more than that dilutes the signal.
```

Change it to:

```
Keep featured to **4 or fewer** projects — more than that dilutes the signal.
```

- [ ] **Step 2: Run the full test suite**

```bash
npm test
```

Expected: all guardrails pass. `npm test` runs `scripts/validate-site.mjs` which checks OG image, header aria-label, no `text-zinc-500` in ContactFooter, and no `public/.DS_Store`. None of these are affected by this change, but run it to confirm the baseline is clean.

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: raise featured project limit from 3 to 4"
```

---

### Task 6: Final verification

- [ ] **Step 1: Run the full build and test suite one more time**

```bash
npm run check && npm run build && npm test
```

Expected: all pass with no errors or warnings.

- [ ] **Step 2: Spot-check the projects grid in dev**

```bash
npm run dev
```

Open `http://localhost:4321` in a browser. Scroll to the Projects section. Verify:
- Featured row shows exactly 4 cards: Multi-Asset LLM Trading Bot, Personalised Daily Briefing Bot, Simulation Modelling for A Better Start, Automated Psychometrics
- Both new agent cards show no URL link (no broken href)
- Category badges on the two new cards read `agent`
- NZ Social Lab appears in the non-featured grid below, not in the featured row

- [ ] **Step 3: Kill the dev server and push**

The implementation is complete. Push to `main` to trigger a Netlify deploy:

```bash
git push
```
