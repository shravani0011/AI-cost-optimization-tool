"use client";

import { Trash2 } from "lucide-react";

import { ToolInput } from "@/store/audit-store";
import { tools } from "@/data/tools/tools";

interface ToolCardProps {
  toolData: ToolInput;

  onUpdate: (
    id: string,
    field: keyof ToolInput,
    value: string | number
  ) => void;

  onRemove: (id: string) => void;
}

export function ToolCard({
  toolData,
  onUpdate,
  onRemove,
}: ToolCardProps) {
  const availablePlans =
    tools[
      toolData.tool as keyof typeof tools
    ] || [];

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            AI Tool
          </h3>

          <p className="text-sm text-muted-foreground">
            Configure your current subscription
          </p>
        </div>

        <button
          type="button"
          onClick={() => onRemove(toolData.id)}
          className="rounded-md p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-4">
        {/* Tool Selection */}
        <div className="grid gap-2">
          <label className="text-sm font-medium">
            Tool
          </label>

          <select
            value={toolData.tool}
            onChange={(e) =>
              onUpdate(
                toolData.id,
                "tool",
                e.target.value
              )
            }
            className="h-11 rounded-lg border bg-background px-4 text-sm outline-none transition focus:ring-2"
          >
            <option value="">
              Select a tool
            </option>

            {Object.keys(tools).map((tool) => (
              <option
                key={tool}
                value={tool}
              >
                {tool
                  .replaceAll("_", " ")
                  .replace(/\b\w/g, (char) =>
                    char.toUpperCase()
                  )}
              </option>
            ))}
          </select>
        </div>

        {/* Plan Selection */}
        <div className="grid gap-2">
          <label className="text-sm font-medium">
            Plan
          </label>

          <select
            value={toolData.plan}
            onChange={(e) =>
              onUpdate(
                toolData.id,
                "plan",
                e.target.value
              )
            }
            disabled={!toolData.tool}
            className="h-11 rounded-lg border bg-background px-4 text-sm outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">
              Select a plan
            </option>

            {availablePlans.map((plan) => (
              <option
                key={plan}
                value={plan}
              >
                {plan}
              </option>
            ))}
          </select>
        </div>

        {/* Spend + Seats */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm font-medium">
              Monthly Spend ($)
            </label>

            <input
              type="number"
              min={0}
              value={toolData.monthlySpend}
              onChange={(e) =>
                onUpdate(
                  toolData.id,
                  "monthlySpend",
                  Number(e.target.value)
                )
              }
              placeholder="e.g. 120"
              className="h-11 rounded-lg border bg-background px-4 text-sm outline-none transition focus:ring-2"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">
              Seats
            </label>

            <input
              type="number"
              min={1}
              value={toolData.seats}
              onChange={(e) =>
                onUpdate(
                  toolData.id,
                  "seats",
                  Number(e.target.value)
                )
              }
              placeholder="e.g. 5"
              className="h-11 rounded-lg border bg-background px-4 text-sm outline-none transition focus:ring-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}