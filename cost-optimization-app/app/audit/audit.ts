export type AIUseCase =
  | "coding"
  | "writing"
  | "research"
  | "data"
  | "mixed";

export type ToolName =
  | "cursor"
  | "github_copilot"
  | "claude"
  | "chatgpt"
  | "anthropic_api"
  | "openai_api"
  | "gemini"
  | "windsurf";

export interface ToolSpendInput {
  tool: ToolName;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface AuditInput {
  teamSize: number;
  useCase: AIUseCase;
  tools: ToolSpendInput[];
}

export interface AuditRecommendation {
  tool: ToolName;
  currentSpend: number;
  recommendedAction: string;
  estimatedSavings: number;
  reason: string;
}

export interface AuditResult {
  monthlySavings: number;
  annualSavings: number;
  recommendations: AuditRecommendation[];
  summary: string;
}