---
title: "Multi-Asset LLM Trading Bot"
blurb: "Autonomous bot running a 3-stage LLM pipeline (DeepSeek → Gemini → GPT-5.4) to trade BTC, ETH, and SOL on Binance Spot. Quant stack: LightGBM classifier, GARCH(1,1) volatility, HMM regime detection. Deployed on a Synology NAS via Docker with CI/CD auto-deploy and a read-only web dashboard."
stack: ["Python", "LightGBM", "GARCH", "HMM", "Docker", "OpenRouter", "Binance API", "FastAPI", "Telegram"]
category: "agent"
featured: true
year: 2026
---
3-stage LLM pipeline: Stage 1 generates trading signals from technical indicators (RSI, MACD, Bollinger Bands, ATR, ADX), Stage 2 validates with an independent model, Stage 3 applies the final risk gate. Exits handled entirely by mechanical TP/SL/trailing-stop logic. Risk controls include drawdown auto-pause, circuit breaker, correlation guard, and a daily loss limit. 944-test suite with CI on every push; merges auto-deploy to the NAS.
