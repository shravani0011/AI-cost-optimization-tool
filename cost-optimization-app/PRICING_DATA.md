# Pricing Data

## Overview

This MVP uses simplified pricing assumptions for popular AI tools in order to simulate cost optimization opportunities and recommendation generation.

The pricing model is intentionally lightweight and heuristic-driven rather than fully enterprise-accurate. The goal was to create believable audit outputs while keeping the recommendation engine understandable and fast for an MVP submission.

---

# Pricing Assumptions

| Tool | Plan | Estimated Monthly Cost |
|------|------|------------------------|
| ChatGPT | Plus | $20/user |
| ChatGPT | Team | $30/user |
| Claude | Pro | $20/user |
| Claude | Max | $60/user |
| Cursor | Pro | $20/user |
| Cursor | Business | $40/user |
| Gemini | Advanced | $20/user |
| Midjourney | Standard | $10/user |

---

# Recommendation Logic

The audit engine generates recommendations using lightweight heuristics based on:

- team size
- seat count
- monthly spend
- overlapping AI tools
- pricing tier usage
- workflow type (coding, writing, research, etc.)

Examples:
- small teams on Team plans
- overlapping AI assistant subscriptions
- expensive plans for solo users
- duplicated tooling across workflows

---

# Savings Calculation

Savings are estimated dynamically using percentage-based heuristics rather than fixed static values.

Example approach:
- 10–40% estimated optimization opportunity
- additional savings for overlapping AI tooling
- usage-based recommendation adjustments

This approach creates more realistic and flexible outputs for different input combinations.

---

# Tradeoffs

This MVP does not integrate:
- live vendor pricing APIs
- token-level billing analysis
- enterprise contract pricing
- usage telemetry
- seat utilization analytics

These would be future improvements for a production-grade version.

---

# Future Improvements

Potential future enhancements include:
- real-time pricing synchronization
- AI-powered recommendation engine
- token usage ingestion
- invoice imports
- subscription utilization tracking
- organization-wide analytics dashboards