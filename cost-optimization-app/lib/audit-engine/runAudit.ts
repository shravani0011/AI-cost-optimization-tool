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

        /**
         * RULE 1
         * Small teams on Team plans
         */
        if (
            tool.plan.toLowerCase() === "team" &&
            tool.seats <= 2
        ) {
            const savings = 20;

            monthlySavings += savings;

            recommendations.push({
                tool: tool.tool,

                currentSpend:
                    tool.monthlySpend,

                recommendedAction:
                    "Downgrade to individual plan",

                estimatedSavings:
                    savings,

                reason:
                    "Team collaboration features are likely underutilized for very small teams.",
            });
        }

        /**
         * RULE 2
         * Cursor Business for solo developer
         */
        if (
            tool.tool === "cursor" &&
            tool.plan.toLowerCase() ===
            "business" &&
            tool.seats === 1
        ) {
            const savings = 20;

            monthlySavings += savings;

            recommendations.push({
                tool: tool.tool,

                currentSpend:
                    tool.monthlySpend,

                recommendedAction:
                    "Switch to Cursor Pro",

                estimatedSavings:
                    savings,

                reason:
                    "Cursor Business features are usually unnecessary for solo developers.",
            });
        }

        /**
         * RULE 3
         * Claude Max overkill
         */
        if (
            tool.tool === "claude" &&
            tool.plan.toLowerCase() ===
            "max" &&
            input.useCase ===
            "writing"
        ) {
            const savings = 80;

            monthlySavings += savings;

            recommendations.push({
                tool: tool.tool,

                currentSpend:
                    tool.monthlySpend,

                recommendedAction:
                    "Downgrade to Claude Pro",

                estimatedSavings:
                    savings,

                reason:
                    "Claude Max is often excessive for lightweight writing workflows.",
            });
        }

        /**
         * RULE 4
         * GitHub Copilot Business for solo dev
         */
        if (
            tool.tool === "chatgpt" &&
            tool.plan.toLowerCase() === "plus" &&
            tool.seats >= 5
        ) {
            const savings = 50;

            monthlySavings += savings;

            recommendations.push({
                tool: tool.tool,

                currentSpend:
                    tool.monthlySpend,

                recommendedAction:
                    "Evaluate ChatGPT Team plan pricing efficiency",

                estimatedSavings:
                    savings,

                reason:
                    "Managing many individual ChatGPT Plus subscriptions can create administrative overhead and duplicated spend.",
            });
        }
    }

    /**
     * RULE 5
     * Multiple overlapping AI assistants
     */
    const overlappingTools =
        input.tools.filter(
            (tool: any) =>
                tool.tool ===
                "chatgpt" ||
                tool.tool ===
                "claude" ||
                tool.tool ===
                "gemini"
        ).length >= 3;

    if (overlappingTools) {
        monthlySavings += 50;

        recommendations.push({
            tool: "chatgpt",

            currentSpend: 0,

            recommendedAction:
                "Consolidate overlapping AI assistants",

            estimatedSavings: 50,

            reason:
                "Maintaining multiple general-purpose AI assistants often creates duplicated spend.",
        });
    }

    return {
        monthlySavings,

        annualSavings:
            monthlySavings * 12,

        recommendations,

        summary:
            monthlySavings > 0
                ? `We identified approximately $${monthlySavings}/month in potential AI tooling savings.`
                : "No major optimization opportunities detected for your current setup.",
    };
}