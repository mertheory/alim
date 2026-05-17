export type RiskLevel = "low" | "moderate" | "elevated";

export interface AnalysisResponse {
  riskLevel: RiskLevel;
  riskLabel: string;
  userPowerPercent: number;
  summary: string;
  responses: {
    soft: string;
    balanced: string;
    direct: string;
  };
  strategy: string;
}

export interface AnalyzeRequest {
  message: string;
  email?: string;
}
