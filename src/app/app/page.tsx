"use client";

import { useState } from "react";
import Link from "next/link";
import { PowerBalanceBar } from "@/components/app/PowerBalanceBar";
import type { AnalysisResponse } from "@/types/analysis";

const RISK_STYLES: Record<
  AnalysisResponse["riskLevel"],
  { text: string; badge: string }
> = {
  low: { text: "text-emerald-400", badge: "Low" },
  moderate: { text: "text-amber-400", badge: "Moderate" },
  elevated: { text: "text-red-400", badge: "Elevated" },
};

const RESPONSE_STYLES = [
  { key: "soft" as const, label: "Soft", color: "text-blue-400", border: "border-blue-500/20" },
  { key: "balanced" as const, label: "Balanced", color: "text-violet-400", border: "border-violet-500/20" },
  { key: "direct" as const, label: "Direct", color: "text-orange-400", border: "border-orange-500/20" },
  { key: "savage" as const, label: "Savage", color: "text-red-400", border: "border-red-500/20" },
];

function ResultCard({
  children,
  delay,
  className = "",
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <div
      className={`animate-slide-up rounded-2xl border border-white/10 bg-zinc-950/80 shadow-[0_0_40px_rgba(139,92,246,0.06)] ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function AnalyzePage() {
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
        body: JSON.stringify({ message, email: "testuser@example.com" }),
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

  const riskStyle = result ? RISK_STYLES[result.riskLevel] : RISK_STYLES.moderate;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black font-sans text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]"
      />

      <header className="relative border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
            <span className="text-sm font-medium tracking-wide text-zinc-300">
              ReadThemAI
            </span>
          </Link>
          <span className="rounded-full border border-violet-500/20 bg-violet-950/50 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-violet-400">
            Analyze
          </span>
        </div>
      </header>

      <main className="relative mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="mb-8 text-center sm:mb-10">
          <h1 className="font-display text-3xl font-light tracking-tight text-white sm:text-4xl">
            What are they really saying?
          </h1>
          <p className="mt-3 text-sm font-light leading-relaxed text-zinc-500 sm:text-base">
            Paste the message you received. We&apos;ll decode the subtext.
          </p>
        </div>

        <div className="space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Paste their message here..."
            disabled={loading}
            rows={7}
            className="w-full resize-none rounded-2xl border border-white/10 bg-zinc-950/90 px-5 py-4 text-base font-light leading-relaxed text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] placeholder:text-zinc-600 transition-all focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 disabled:opacity-50"
          />

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={loading || message.trim().length < 10}
            className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 py-4 text-base font-semibold text-white shadow-[0_0_40px_rgba(139,92,246,0.35)] transition-all hover:from-violet-500 hover:to-indigo-500 hover:shadow-[0_0_50px_rgba(139,92,246,0.45)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Decoding subtext...
              </span>
            ) : (
              "Analyze Message"
            )}
          </button>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-6 animate-slide-up rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            style={{ animationDelay: "0ms" }}
          >
            {error}
          </div>
        )}

        {result && (
          <div className="mt-10 space-y-5">
            <ResultCard delay={80} className="p-5 sm:p-6">
              <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                Conversation Risk
              </span>
              <p className={`mt-2 text-lg font-semibold ${riskStyle.text}`}>
                {riskStyle.badge} — {result.riskLabel}
              </p>
            </ResultCard>

            <ResultCard delay={160} className="p-5 sm:p-6">
              <span className="mb-4 block text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                Power Balance
              </span>
              <PowerBalanceBar userPercent={result.userPowerPercent} />
            </ResultCard>

            <ResultCard delay={240} className="p-5 sm:p-6">
              <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                Core Subtext
              </span>
              <p className="mt-3 text-sm font-light leading-relaxed text-zinc-300">
                {result.summary}
              </p>
              <div className="mt-5 border-t border-white/5 pt-5">
                <span className="text-[10px] font-medium uppercase tracking-wider text-violet-400/80">
                  Strategy
                </span>
                <p className="mt-2 text-sm font-light leading-relaxed text-zinc-400">
                  {result.strategy}
                </p>
              </div>
            </ResultCard>

            <div>
              <h2
                className="animate-slide-up mb-4 text-[10px] font-medium uppercase tracking-wider text-zinc-500"
                style={{ animationDelay: "320ms" }}
              >
                Response Matrix
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {RESPONSE_STYLES.map(({ key, label, color, border }, i) => (
                  <ResultCard
                    key={key}
                    delay={400 + i * 80}
                    className={`p-4 ${border}`}
                  >
                    <span className={`text-[10px] font-bold uppercase ${color}`}>
                      {label}
                    </span>
                    <p className="mt-2 text-sm font-light leading-relaxed text-zinc-400">
                      &ldquo;{result.responses[key]}&rdquo;
                    </p>
                  </ResultCard>
                ))}
              </div>
            </div>

            <div
              className="animate-slide-up flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs sm:flex-row"
              style={{ animationDelay: "720ms" }}
            >
              <span className="text-zinc-600">
                AI interpreted this conversation. Keep your agency.
              </span>
              <button
                type="button"
                onClick={handleShare}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                {copied ? "Link copied!" : "Share analysis"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
