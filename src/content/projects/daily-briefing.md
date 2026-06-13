---
title: "Personalised Daily Briefing Bot"
blurb: "Self-scheduling Telegram bot delivering three personalised briefings per day. Learns user interests via an evolving memory store and flags statistical anomalies (IQR-based) in NZ currencies, indices, and bank mortgage and term-deposit rates. ~$0.03/day running cost."
stack: ["Python", "Docker", "OpenRouter", "SQLite", "Telegram"]
category: "agent"
featured: true
year: 2026
problem: "Staying on top of NZ news, markets, and bank rate moves means scanning many sources every day."
approach: "Self-scheduling Telegram bot with an evolving memory store and IQR-based anomaly detection across currencies, indices, and bank mortgage / term-deposit rates."
impact: "Three personalised briefings a day at ~$0.03/day running cost; runs in Docker on a NAS with no external scheduler."
---
Covers NZ and world news, weather, financial markets, and NZ bank mortgage and term-deposit rates across ANZ, ASB, BNZ, Westpac, and Kiwibank. After each briefing, the bot extracts new interests and themes from the content into a persistent memory.json store; facts not seen in 60 days are archived. Anomaly detection uses IQR with per-metric minimum absolute-move thresholds to suppress economically trivial fluctuations. Deployed via Docker on a Synology NAS; cron runs inside the container — no external scheduler needed.
