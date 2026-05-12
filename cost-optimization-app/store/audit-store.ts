import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ToolInput {
    id: string;
    tool: string;
    plan: string;
    monthlySpend: number;
    seats: number;
}

interface AuditStore {
  teamSize: number;
  useCase: string;
  tools: ToolInput[];

  setTeamSize: (size: number) => void;
  setUseCase: (useCase: string) => void;

  addTool: () => void;
  updateTool: (
    id: string,
    field: keyof ToolInput,
    value: string | number
  ) => void;

  removeTool: (id: string) => void;
}

export const useAuditStore = create<AuditStore>()(
  persist(
    (set) => ({
      teamSize: 5,
      useCase: "coding",

      tools: [
        {
          id: crypto.randomUUID(),
          tool: "",
          plan: "",
          monthlySpend: 0,
          seats: 1,
        },
      ],

      setTeamSize: (size) =>
        set({ teamSize: size }),

      setUseCase: (useCase) =>
        set({ useCase }),

      addTool: () =>
        set((state) => ({
          tools: [
            ...state.tools,
            {
              id: crypto.randomUUID(),
              tool: "",
              plan: "",
              monthlySpend: 0,
              seats: 1,
            },
          ],
        })),

      updateTool: (id, field, value) =>
        set((state) => ({
          tools: state.tools.map((tool) =>
            tool.id === id
              ? { ...tool, [field]: value }
              : tool
          ),
        })),

      removeTool: (id) =>
        set((state) => ({
          tools: state.tools.filter(
            (tool) => tool.id !== id
          ),
        })),
    }),
    {
      name: "audit-storage",
    }
  )
);