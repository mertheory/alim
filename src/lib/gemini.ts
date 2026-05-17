import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AnalysisResponse } from "@/types/analysis";
import { ANALYZE_USER_PROMPT_PREFIX, COACH_SYSTEM_PROMPT } from "@/lib/prompts";

const DEFAULT_MODEL = "gemini-2.5-flash";

export async function analyzeMessage(
  message: string
): Promise<AnalysisResponse> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const modelName = process.env.GEMINI_MODEL ?? DEFAULT_MODEL;

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: COACH_SYSTEM_PROMPT,
    generationConfig: {
      temperature: 0.7,
      responseMimeType: "application/json",
    },
  });

  const result = await model.generateContent(
    `${ANALYZE_USER_PROMPT_PREFIX}${message}`
  );

  const text = result.response.text();

  if (!text) {
    throw new Error("Empty response from Gemini");
  }

  const data = JSON.parse(text) as AnalysisResponse;

  if (
    !data.summary ||
    !data.responses?.soft ||
    !data.responses?.balanced ||
    !data.responses?.direct ||
    !data.responses?.savage ||
    !data.strategy ||
    !data.riskLevel ||
    !data.riskLabel ||
    typeof data.userPowerPercent !== "number"
  ) {
    throw new Error("Response missing required fields");
  }

  return data;
}
