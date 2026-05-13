import {
  AuditInput,
  AuditResult,
  AuditRecommendation,
} from "@/app/audit/audit";

export function runAudit(
  input: AuditInput
): AuditResult {

  const recommendations: AuditRecommendation[] = [];

  let monthlySavings = 0;

  for (const tool of input.tools) {

    const toolName =
      tool.tool.toLowerCase();

    const planName =
      tool.plan.toLowerCase();

    /**
     * Simple dynamic savings calculation
     */

    const savings =
      Math.max(
        5,
        Math.round(
          tool.monthlySpend * 0.15
        )
      );

    monthlySavings += savings;

    /**
     * Dynamic recommendation text
     */

    let recommendation =
      "Review current subscription efficiency";

    let reason =
      "Potential savings opportunity detected based on your current usage.";

    if (planName === "team") {
      recommendation =
        "Evaluate individual plans";

      reason =
        "Team plans may be oversized for smaller workflows.";
    }

    if (toolName === "cursor") {
      recommendation =
        "Review Cursor pricing tier";

      reason =
        "Cursor usage may not fully justify higher-tier plans.";
    }

    if (toolName === "claude") {
      recommendation =
        "Optimize Claude subscription";

      reason =
        "Claude usage patterns suggest potential cost optimization.";
    }

    if (
      toolName === "chatgpt" &&
      tool.seats >= 5
    ) {
      recommendation =
        "Centralize ChatGPT billing";

      reason =
        "Multiple ChatGPT seats may create duplicated spend.";
    }

    recommendations.push({
      tool: tool.tool,

      currentSpend:
        tool.monthlySpend,

      recommendedAction:
        recommendation,

      estimatedSavings:
        savings,

      reason,
    });
  }

  /**
   * Extra savings for multiple AI assistants
   */

  if (input.tools.length >= 3) {

    monthlySavings += 25;

    recommendations.push({
      tool: "chatgpt",

      currentSpend: 0,

      recommendedAction:
        "Consolidate overlapping AI tools",

      estimatedSavings: 25,

      reason:
        "Using multiple AI assistants can create duplicated operational costs.",
    });
  }

  return {
    monthlySavings,

    annualSavings:
      monthlySavings * 12,

    recommendations,

    summary:
      `We identified approximately $${monthlySavings}/month in potential AI tooling savings opportunities.`,
  };
}