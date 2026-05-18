"use client";

import { useState } from "react";
import { PowerBalanceBar } from "@/components/app/PowerBalanceBar";
import { GlowCard } from "@/components/ui/GlowCard";
import type { AnalysisResponse } from "@/types/analysis";

interface AnalysisResultsProps {
  data: AnalysisResponse;
}

const labelsByLanguage = {
  en: {
    riskLevel: "Risk Level",
    riskBadges: {
      low: "Low",
      moderate: "Moderate",
      elevated: "Elevated",
    },
    powerBalance: "Power Control Balance",
    powerLabels: {
      partner: "Partner",
      you: "You",
      partnerHint: "Sender holds space",
      youHint: "Your agency",
    },
    coreSubtext: "Core Subtext Analysis",
    strategy: "Strategy",
    responseMatrix: "Strategic Response Matrix",
    responseLabels: {
      soft: "Soft",
      balanced: "Balanced",
      direct: "Direct",
      savage: "Savage",
    },
    copy: "Copy",
    copied: "Copied!",
  },
  tr: {
    riskLevel: "Risk Seviyesi",
    riskBadges: {
      low: "Düşük",
      moderate: "Orta",
      elevated: "Yüksek",
    },
    powerBalance: "Güç Dengesi",
    powerLabels: {
      partner: "Karşı Taraf",
      you: "Sen",
      partnerHint: "Karşı tarafın etkisi",
      youHint: "Senin alanın",
    },
    coreSubtext: "Alt Metin Analizi",
    strategy: "Strateji",
    responseMatrix: "Stratejik Cevap Matrisi",
    responseLabels: {
      soft: "Yumuşak",
      balanced: "Dengeli",
      direct: "Doğrudan",
      savage: "Sert",
    },
    copy: "Kopyala",
    copied: "Kopyalandı!",
  },
} satisfies Record<AnalysisResponse["language"], unknown>;

const riskStyles: Record<AnalysisResponse["riskLevel"], string> = {
  low: "text-emerald-400",
  moderate: "text-amber-400",
  elevated: "text-red-400",
};

const responseStyles = [
  { key: "soft" as const, accent: "text-blue-400" },
  { key: "balanced" as const, accent: "text-violet-400" },
  { key: "direct" as const, accent: "text-orange-400" },
  { key: "savage" as const, accent: "text-red-400" },
];

function CopyButton({
  copiedLabel,
  copyLabel,
  text,
}: {
  copiedLabel: string;
  copyLabel: string;
  text: string;
}) {
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
      {copied ? copiedLabel : copyLabel}
    </button>
  );
}

export function AnalysisResults({ data }: AnalysisResultsProps) {
  const labels = labelsByLanguage[data.language];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <GlowCard>
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            {labels.riskLevel}
          </span>
          <p className={`mt-2 text-lg font-semibold ${riskStyles[data.riskLevel]}`}>
            {labels.riskBadges[data.riskLevel]} — {data.riskLabel}
          </p>
        </GlowCard>

        <GlowCard>
          <span className="mb-4 block text-xs font-medium uppercase tracking-wider text-zinc-500">
            {labels.powerBalance}
          </span>
          <PowerBalanceBar
            labels={labels.powerLabels}
            userPercent={data.userPowerPercent}
          />
        </GlowCard>
      </div>

      <GlowCard>
        <h2 className="font-display text-xl text-white">{labels.coreSubtext}</h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-300">
          {data.summary}
        </p>
        <div className="mt-5 border-t border-white/5 pt-5">
          <span className="text-xs font-medium uppercase tracking-wider text-violet-400/80">
            {labels.strategy}
          </span>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            {data.strategy}
          </p>
        </div>
      </GlowCard>

      <div>
        <h2 className="mb-4 font-display text-xl text-white">
          {labels.responseMatrix}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {responseStyles.map(({ key, accent }) => (
            <GlowCard key={key}>
              <div className="mb-3 flex items-center justify-between">
                <span
                  className={`text-xs font-medium uppercase tracking-wider ${accent}`}
                >
                  {labels.responseLabels[key]}
                </span>
                <CopyButton
                  copiedLabel={labels.copied}
                  copyLabel={labels.copy}
                  text={data.responses[key]}
                />
              </div>
              <p className="text-sm leading-relaxed text-zinc-300">
                {data.responses[key]}
              </p>
            </GlowCard>
          ))}
        </div>
      </div>

    </div>
  );
}
