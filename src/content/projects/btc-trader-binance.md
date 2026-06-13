---
title: "Multi-Asset LLM Trading Bot"
blurb: "Personal AI-agent systems project combining a 3-stage LLM decision pipeline with quantitative risk controls, market-regime features, CI/CD, and a read-only monitoring dashboard."
stack: ["Python", "LightGBM", "GARCH", "HMM", "Docker", "OpenRouter", "Binance API", "FastAPI", "Telegram"]
category: "agent"
featured: true
year: 2026
problem: "Agentic decision systems need clear controls, observability, and failure boundaries before they can be trusted with live actions."
approach: "Built a 3-stage LLM pipeline over a quant stack (LightGBM, GARCH volatility, HMM regime detection), with mechanical exits, circuit breakers, and monitoring."
impact: "944-test suite, CI/CD auto-deploy to a self-hosted NAS, read-only dashboard, and layered risk gates for BTC / ETH / SOL spot execution."
---
Personal engineering project for controlled agentic execution. Stage 1 generates signals from technical indicators (RSI, MACD, Bollinger Bands, ATR, ADX), Stage 2 validates with an independent model, and Stage 3 applies the final risk gate. Exits are handled by mechanical TP/SL/trailing-stop logic. Controls include drawdown auto-pause, circuit breaker, correlation guard, and a daily loss limit. 944-test suite with CI on every push; merges auto-deploy to the NAS.
