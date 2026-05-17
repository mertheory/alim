"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/GlowCard";
import type { AnalysisResponse } from "@/types/analysis";

interface AnalysisResultsProps {
  data: AnalysisResponse;
}

const responseStyles = [
  { key: "soft" as const, label: "Soft / emotional", accent: "text-pink-400" },
  {
    key: "balanced" as const,
    label: "Balanced / neutral",
    accent: "text-violet-400",
  },
  { key: "direct" as const, label: "Direct / firm", accent: "text-indigo-400" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="text-xs text-zinc-500 transition-colors hover:text-violet-400"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export function AnalysisResults({ data }: AnalysisResultsProps) {
  return (
    <div className="space-y-6">
      <GlowCard>
        <h2 className="font-display text-xl text-white">
          Conversation Summary
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-300">
          {data.summary}
        </p>
      </GlowCard>

      <div>
        <h2 className="mb-4 font-display text-xl text-white">
          Response Options
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {responseStyles.map(({ key, label, accent }) => (
            <GlowCard key={key}>
              <div className="mb-3 flex items-center justify-between">
                <span
                  className={`text-xs font-medium uppercase tracking-wider ${accent}`}
                >
                  {label}
                </span>
                <CopyButton text={data.responses[key]} />
              </div>
              <p className="text-sm leading-relaxed text-zinc-300">
                {data.responses[key]}
              </p>
            </GlowCard>
          ))}
        </div>
      </div>

      <GlowCard>
        <h2 className="font-display text-xl text-white">Suggested Strategy</h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-300">
          {data.strategy}
        </p>
      </GlowCard>
    </div>
  );
}
