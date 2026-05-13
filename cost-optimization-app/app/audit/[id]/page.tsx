import { LeadCapture } from "@/components/result/leadCapture";
import { supabase } from "@/lib/supabase/client";
import { BackHomeButton } from "./backButton";


interface Props {
  params: {
    id: string;
  };
}

export default async function AuditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } =
    await supabase
      .from("Audits")
      .select("*")
      .eq("id", id)
      .single();

  if (error || !data) {
    return (
      <div className="p-10">
        Audit not found.
      </div>
    );
  }

  const result = data.result;

  return (
    <main className="mx-auto max-w-4xl p-8">
      <div className="space-y-6">
      <BackHomeButton/>
        <div className="rounded-3xl border p-8">
          <p className="text-sm text-muted-foreground">
            Potential Savings
          </p>

          <h1 className="mt-2 text-5xl font-bold">
            ${result.monthlySavings}/mo
          </h1>

          <p className="mt-2 text-xl text-muted-foreground">
            ${result.annualSavings}/year
          </p>
        </div>

        <div className="rounded-2xl border p-6">
          <h2 className="text-xl font-semibold">
            Audit Summary
          </h2>

          <p className="mt-3 text-muted-foreground">
            {result.summary}
          </p>
        </div>

        <div className="space-y-4">
          {result.recommendations.map(
            (
              recommendation: any,
              index: number
            ) => (
              <div
                key={index}
                className="rounded-2xl border p-6"
              >
                <h3 className="text-lg font-semibold capitalize">
                  {recommendation.tool}
                </h3>

                <p className="mt-2 text-muted-foreground">
                  {recommendation.reason}
                </p>

                <div className="mt-4">
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
      <div className="rounded-3xl border bg-card p-8">
        <h3 className="text-2xl font-bold">
          Get Full Audit Report
        </h3>

        <p className="mt-2 text-muted-foreground">
          Receive future AI spend optimizations and
          savings opportunities.
        </p>
      </div>
      <LeadCapture />
    </main>
  );
}