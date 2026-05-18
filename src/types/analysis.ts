export type RiskLevel = "low" | "moderate" | "elevated";
export type AnalysisLanguage = "en" | "tr";

export interface AnalysisResponse {
  language: AnalysisLanguage;
  riskLevel: RiskLevel;
  riskLabel: string;
  userPowerPercent: number;
  summary: string;
  responses: {
    soft: string;
    balanced: string;
    direct: string;
    savage: string;
  };
  strategy: string;
}

export interface AnalyzeRequest {
  message: string;
  email?: string;
}
