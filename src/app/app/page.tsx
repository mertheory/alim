"use client";

import { useState } from "react";
import type { AnalysisResponse } from "@/types/analysis";

const RISK_STYLES: Record<
  AnalysisResponse["riskLevel"],
  { text: string; badge: string }
> = {
  low: { text: "text-emerald-400", badge: "Low" },
  moderate: { text: "text-amber-400", badge: "Moderate" },
  elevated: { text: "text-red-400", badge: "Elevated" },
};

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async () => {
    if (message.trim().length < 10) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          email: "testuser@example.com",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Analysis failed");
      }

      setResult(data as AnalysisResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const userPower = result?.userPowerPercent ?? 50;
  const partnerPower = 100 - userPower;
  const riskStyle = result ? RISK_STYLES[result.riskLevel] : RISK_STYLES.moderate;

  return (
    <div className="min-h-screen bg-black p-4 font-sans text-white md:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex items-center justify-between border-b border-gray-900 pb-4">
          <h1 className="text-xl font-black tracking-wider text-purple-400">
            ALIM ARCHETYPE
          </h1>
          <span className="rounded-full border border-purple-800/30 bg-purple-950 px-3 py-1 font-mono text-xs text-purple-400">
            Free Sandbox Access
          </span>
        </div>

        <div className="space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Paste the message or conversation dynamic here..."
            disabled={loading}
            className="h-32 w-full resize-none rounded-2xl border border-gray-900 bg-gray-950 p-4 text-sm font-light placeholder-gray-600 transition-all focus:border-purple-600 focus:outline-none disabled:opacity-60"
          />
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={loading || message.trim().length < 10}
            className="w-full rounded-xl bg-purple-600 py-4 font-bold text-white shadow-[0_0_30px_rgba(147,51,234,0.2)] transition-all hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? "Decoding Subtext..." : "Analyze Conversation"}
          </button>
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
          >
            {error}
          </div>
        )}

        {result && (
          <div className="animate-fade-in space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1 rounded-xl border border-gray-900 bg-gray-950/50 p-4">
                <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Conversation Risk Level
                </span>
                <p className={`text-lg font-bold ${riskStyle.text}`}>
                  {riskStyle.badge} — {result.riskLabel}
                </p>
              </div>

              <div className="space-y-2 rounded-xl border border-gray-900 bg-gray-950/50 p-4">
                <div className="flex justify-between text-xs font-medium uppercase tracking-wider text-gray-500">
                  <span>Power Control Balance</span>
                  <span className="font-mono text-purple-400">
                    Partner {partnerPower}% / You {userPower}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-900">
                  <div
                    className="h-full bg-purple-600 transition-all duration-700"
                    style={{ width: `${userPower}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-gray-900 bg-gray-950 p-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400">
                Core Subtext Analysis
              </h3>
              <p className="text-sm font-light leading-relaxed text-gray-300">
                {result.summary}
              </p>
              <p className="border-t border-gray-900 pt-4 text-sm font-light leading-relaxed text-gray-400">
                <span className="font-medium text-gray-500">Strategy: </span>
                {result.strategy}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {(
                [
                  { key: "soft", label: "Soft Response", color: "text-blue-400" },
                  {
                    key: "balanced",
                    label: "Balanced Response",
                    color: "text-purple-400",
                  },
                  {
                    key: "direct",
                    label: "Direct Response",
                    color: "text-red-400",
                  },
                ] as const
              ).map(({ key, label, color }) => (
                <div
                  key={key}
                  className="space-y-2 rounded-xl border border-gray-900 bg-gray-950 p-4"
                >
                  <span className={`text-xs font-bold uppercase ${color}`}>
                    {label}
                  </span>
                  <p className="text-xs font-light italic text-gray-400">
                    &ldquo;{result.responses[key]}&rdquo;
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-900 pt-4 text-xs sm:flex-row">
              <span className="font-light text-gray-500">
                AI interpreted this conversation. Keep your agency.
              </span>
              <button
                type="button"
                onClick={handleShare}
                className="rounded-lg border border-gray-800 bg-white/5 px-4 py-2 font-medium text-white transition-all hover:bg-white/10"
              >
                {copied
                  ? "Link copied!"
                  : "🔗 Share This Intelligence Output"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
