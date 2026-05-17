"use client";

import { useState } from "react";
import { AnalysisForm } from "@/components/app/AnalysisForm";
import { AnalysisResults } from "@/components/app/AnalysisResults";
import { GlowCard } from "@/components/ui/GlowCard";
import type { AnalysisResponse } from "@/types/analysis";

export function DashboardClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResponse | null>(null);

  async function handleAnalyze(message: string) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong");
      }

      setResult(data as AnalysisResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <GlowCard>
        <h1 className="font-display text-2xl text-white sm:text-3xl">
          Analyze a conversation
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Paste your chat. Get neutral coaching — not diagnosis.
        </p>
        <div className="mt-6">
          <AnalysisForm onAnalyze={handleAnalyze} isLoading={isLoading} />
        </div>

        {isLoading && (
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-3">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-violet-400 border-t-transparent" />
            <p className="text-sm text-violet-200">
              Analyzing conversation...
            </p>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
          >
            {error}
          </div>
        )}
      </GlowCard>

      <div>
        {result ? (
          <AnalysisResults data={result} />
        ) : (
          <GlowCard className="flex min-h-[320px] flex-col items-center justify-center text-center">
            <div
              aria-hidden
              className="mb-4 h-12 w-12 rounded-full bg-violet-500/20 shadow-[0_0_30px_rgba(139,92,246,0.3)]"
            />
            <p className="font-display text-lg text-zinc-300">
              Your insights appear here
            </p>
            <p className="mt-2 max-w-xs text-sm text-zinc-500">
              Summary, three response options, and a suggested strategy — all
              in neutral, practical language.
            </p>
          </GlowCard>
        )}
      </div>
    </div>
  );
}
