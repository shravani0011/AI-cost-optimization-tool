"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { runAudit } from "@/lib/audit-engine/runAudit";
import { useAuditStore } from "@/store/audit-store";
import { ToolCard } from "@/components/audit/tool-card";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function HomePage() {
  const {
    teamSize,
    useCase,
    tools,
    setTeamSize,
    setUseCase,
    addTool,
    updateTool,
    removeTool,
  } = useAuditStore();

  const [auditResult, setAuditResult] = useState<any>(null);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
        <div className="mb-6 flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4" />
          AI Spend Audit for Startup Teams
        </div>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
          You’re Probably Overspending on AI Tools
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Audit your AI stack in under 2 minutes. Discover wasted spend,
          cheaper alternatives, and hidden savings opportunities across ChatGPT,
          Claude, Cursor, Copilot, and more.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="#audit-form"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Start Free Audit
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>

          <button className="rounded-lg border px-6 py-3 text-sm font-medium transition hover:bg-muted">
            View Example Report
          </button>
        </div>

        {/* Social Proof */}
        <div className="mt-12 text-sm text-muted-foreground">
          Trusted by indie hackers, engineering teams, and AI-first startups
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-3">
        <div className="rounded-2xl border bg-card p-6">
          <h3 className="text-lg font-semibold">
            Instant Savings Analysis
          </h3>

          <p className="mt-3 text-sm text-muted-foreground">
            Identify unnecessary AI subscriptions, overpriced plans, and
            duplicated tooling in seconds.
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-6">
          <h3 className="text-lg font-semibold">
            Personalized Recommendations
          </h3>

          <p className="mt-3 text-sm text-muted-foreground">
            Get plan downgrade suggestions and alternative tools tailored to
            your team size and workflow.
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-6">
          <h3 className="text-lg font-semibold">
            Shareable Audit Reports
          </h3>

          <p className="mt-3 text-sm text-muted-foreground">
            Generate clean public reports with estimated monthly and annual
            savings.
          </p>
        </div>
      </section>

      {/* Audit Form Placeholder */}
      <section
        id="audit-form"
        className="mx-auto max-w-4xl px-6 py-24"
      >
        <div className="rounded-3xl border bg-card p-8 shadow-sm">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">
              Start Your AI Spend Audit
            </h2>

            <p className="mt-2 text-muted-foreground">
              Enter your current AI tools and monthly spending.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="grid gap-2">
              <label className="text-sm font-medium">
                Team Size
              </label>

              <input
                type="number"
                value={teamSize}
                onChange={(e) =>
                  setTeamSize(Number(e.target.value))
                }
                className="h-11 rounded-lg border bg-background px-4 text-sm outline-none transition focus:ring-2"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">
                Primary Use Case
              </label>

              <select
                value={useCase}
                onChange={(e) =>
                  setUseCase(e.target.value)
                }
                className="h-11 rounded-lg border bg-background px-4 text-sm outline-none transition focus:ring-2"
              >
                <option value="coding">
                  Coding
                </option>

                <option value="writing">
                  Writing
                </option>

                <option value="research">
                  Research
                </option>

                <option value="data">
                  Data Analysis
                </option>

                <option value="mixed">
                  Mixed
                </option>
              </select>
            </div>


            <div className="space-y-4">
              {tools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  toolData={tool}
                  onUpdate={updateTool}
                  onRemove={removeTool}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={addTool}
              className="rounded-lg border px-5 py-3 text-sm font-medium transition hover:bg-muted"
            >
              + Add Another Tool
            </button>

            <button
              type="button"
              onClick={async () => {
                const result = runAudit({
                  teamSize,
                  useCase: useCase as any,

                  tools: tools.map((tool) => ({
                    tool: tool.tool as any,
                    plan: tool.plan,
                    monthlySpend: tool.monthlySpend,
                    seats: tool.seats,
                  })),
                });

                setAuditResult(result);

                const { data, error } =
                  await supabase
                    .from("audits")
                    .insert({
                      input: {
                        teamSize,
                        useCase,
                        tools,
                      },

                      result,
                    })
                    .select()
                    .single();

                console.log(data);
                console.log(error);
              }}
              className="mt-8 inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Generate Audit Report
            </button>
          </div>
        </div>
        {auditResult && (
          <div className="mt-10 space-y-6">

            {/* Savings Hero */}
            <div className="rounded-3xl border bg-card p-8">
              <p className="text-sm text-muted-foreground">
                Potential Savings
              </p>

              <h3 className="mt-2 text-4xl font-bold">
                ${auditResult.monthlySavings}/mo
              </h3>

              <p className="mt-2 text-lg text-muted-foreground">
                ${auditResult.annualSavings}/year
              </p>
            </div>

            {/* Summary */}
            <div className="rounded-2xl border bg-card p-6">
              <h4 className="text-lg font-semibold">
                Audit Summary
              </h4>

              <p className="mt-3 text-muted-foreground">
                {auditResult.summary}
              </p>
            </div>

            {/* Recommendations */}
            <div className="space-y-4">
              {auditResult.recommendations.map(
                (
                  recommendation: any,
                  index: number
                ) => (
                  <div
                    key={index}
                    className="rounded-2xl border bg-card p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-lg font-semibold capitalize">
                          {recommendation.tool.replaceAll(
                            "_",
                            " "
                          )}
                        </h4>

                        <p className="mt-2 text-sm text-muted-foreground">
                          {recommendation.reason}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          Estimated Savings
                        </p>

                        <p className="text-2xl font-bold">
                          $
                          {
                            recommendation.estimatedSavings
                          }
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl bg-muted p-4 text-sm">
                      <span className="font-medium">
                        Recommendation:
                      </span>{" "}
                      {
                        recommendation.recommendedAction
                      }
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row">
          <p>© 2026 AI Spend Audit</p>

          <div className="flex items-center gap-6">
            <button className="hover:text-foreground">
              Privacy
            </button>

            <button className="hover:text-foreground">
              Terms
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
} 
