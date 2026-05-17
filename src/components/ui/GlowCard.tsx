import { type ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

export function GlowCard({ children, className = "" }: GlowCardProps) {
  return (
    <div
      className={`relative rounded-2xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur-sm ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-violet-500/20 via-transparent to-indigo-500/10 opacity-60"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
