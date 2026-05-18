interface PowerBalanceBarProps {
  userPercent: number;
  labels: {
    partner: string;
    you: string;
    partnerHint: string;
    youHint: string;
  };
}

export function PowerBalanceBar({ labels, userPercent }: PowerBalanceBarProps) {
  const you = Math.min(100, Math.max(0, userPercent));
  const partner = 100 - you;

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between gap-4">
        <div className="text-left">
          <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
            {labels.partner}
          </span>
          <p className="font-mono text-2xl font-semibold tabular-nums text-indigo-300">
            {partner}%
          </p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
            {labels.you}
          </span>
          <p className="font-mono text-2xl font-semibold tabular-nums text-violet-300">
            {you}%
          </p>
        </div>
      </div>

      <div className="relative h-4 overflow-hidden rounded-full bg-zinc-900/80 ring-1 ring-white/5">
        <div className="absolute inset-0 flex">
          <div
            className="h-full bg-gradient-to-r from-indigo-600/90 to-indigo-500/70 transition-all duration-700 ease-out"
            style={{ width: `${partner}%` }}
          />
          <div
            className="h-full bg-gradient-to-r from-violet-600 to-purple-500 shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-700 ease-out"
            style={{ width: `${you}%` }}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/30 shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-700"
          style={{ left: `${partner}%`, transform: "translateX(-50%)" }}
        />
      </div>

      <div className="flex justify-between text-[10px] text-zinc-600">
        <span>{labels.partnerHint}</span>
        <span>{labels.youHint}</span>
      </div>
    </div>
  );
}
