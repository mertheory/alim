import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ANALYZE_USER_PROMPT_PREFIX, COACH_SYSTEM_PROMPT } from "@/lib/prompts";
import type { AnalysisResponse, AnalyzeRequest, RiskLevel } from "@/types/analysis";

export const runtime = "nodejs";

const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
const VALID_RISK_LEVELS: RiskLevel[] = ["low", "moderate", "elevated"];

function normalizeRiskLevel(value: unknown): RiskLevel {
  if (typeof value === "string" && VALID_RISK_LEVELS.includes(value as RiskLevel)) {
    return value as RiskLevel;
  }
  return "moderate";
}

function normalizeSummary(value: unknown): string {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }
  if (Array.isArray(value)) {
    const bullets = value
      .filter((item): item is string => typeof item === "string")
      .map((s) => s.trim())
      .filter(Boolean);
    if (bullets.length > 0) return bullets.join(" ");
  }
  throw new Error("Invalid summary field");
}

function parseAnalysisResponse(raw: string): AnalysisResponse {
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Gemini returned invalid JSON");
  }

  if (!parsed || typeof parsed !== "object") {
    throw new Error("Response missing required fields");
  }

  const data = parsed as Record<string, unknown>;
  const responses = data.responses as Record<string, unknown> | undefined;

  const soft = responses?.soft;
  const balanced = responses?.balanced;
  const direct = responses?.direct;
  const savage = responses?.savage;
  const strategy = data.strategy;
  const riskLabel = data.riskLabel;

  if (
    typeof soft !== "string" ||
    typeof balanced !== "string" ||
    typeof direct !== "string" ||
    typeof strategy !== "string" ||
    typeof riskLabel !== "string"
  ) {
    throw new Error("Response missing required fields");
  }

  const savageText =
    typeof savage === "string" && savage.trim().length > 0
      ? savage.trim()
      : "Bu tonda devam etmeyeceğim. Sınırım net; saygılı ve yapıcı konuştuğunda konuşuruz.";

  const userPowerPercent =
    typeof data.userPowerPercent === "number"
      ? Math.min(100, Math.max(0, Math.round(data.userPowerPercent)))
      : NaN;

  if (Number.isNaN(userPowerPercent)) {
    throw new Error("Invalid userPowerPercent");
  }

  return {
    riskLevel: normalizeRiskLevel(data.riskLevel),
    riskLabel: riskLabel.trim(),
    userPowerPercent,
    summary: normalizeSummary(data.summary),
    responses: {
      soft: soft.trim(),
      balanced: balanced.trim(),
      direct: direct.trim(),
      savage: savageText,
    },
    strategy: strategy.trim(),
  };
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Analysis failed";
}

function getStatusFromError(message: string): number {
  if (message.includes("GEMINI_API_KEY")) return 503;
  if (
    message.includes("429") ||
    message.includes("quota") ||
    message.includes("RESOURCE_EXHAUSTED")
  ) {
    return 429;
  }
  if (message.includes("404") || message.includes("not found")) return 502;
  if (message.includes("fetch failed")) return 502;
  if (
    message.includes("Message is required") ||
    message.includes("longer message") ||
    message.includes("too long")
  ) {
    return 400;
  }
  return 500;
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not configured in .env.local" },
      { status: 503 }
    );
  }

  try {
    const body = (await request.json()) as AnalyzeRequest;

    if (!body.message || typeof body.message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const trimmed = body.message.trim();

    if (trimmed.length < 10) {
      return NextResponse.json(
        { error: "Please paste a longer message to analyze" },
        { status: 400 }
      );
    }

    if (trimmed.length > 8000) {
      return NextResponse.json(
        { error: "Message is too long (max 8,000 characters)" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      systemInstruction: COACH_SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json",
      },
    });

    const result = await model.generateContent(
      `${ANALYZE_USER_PROMPT_PREFIX}${trimmed}`
    );

    const text = result.response.text();

    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    const analysis = parseAnalysisResponse(text);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error("[analyze]", error);

    const message = getErrorMessage(error);
    const status = getStatusFromError(message);

    const userMessage =
      status === 429
        ? "Gemini free quota reached. Wait a minute and try again, or create a new API key at aistudio.google.com"
        : status === 502
          ? "Could not reach Gemini API. Check your internet connection and API key."
          : message;

    return NextResponse.json({ error: userMessage }, { status });
  }
}
