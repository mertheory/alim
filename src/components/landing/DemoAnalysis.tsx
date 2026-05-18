const DEMO = {
  label: "Situationship · Example",
  message:
    "Are you ignoring me? Say something. I'm not going to wait around while you act like you don't care.",
  riskLevel: "Elevated",
  riskLabel: "Pressure & withdrawal pull",
  userPower: 32,
  summary:
    "They're pushing for a reaction while framing silence as your fault. The tone mixes urgency with blame — a classic move to regain control without owning their part.",
  responses: [
    { style: "Soft", color: "text-blue-400", text: "I hear that you're frustrated. I'm not ignoring you — I need a calmer moment to respond properly." },
    { style: "Balanced", color: "text-purple-400", text: "I'm not avoiding you. This tone isn't productive for me right now — we can talk when it's respectful." },
    { style: "Direct", color: "text-orange-400", text: "I'm not responsible for how long you wait. I'll reply when I'm ready, on my terms." },
    { style: "Savage", color: "text-red-400", text: "I'm not playing the guilt game. Reach out respectfully or don't — either way, I'm not chasing." },
  ],
};

export function DemoAnalysis() {
  const partnerPower = 100 - DEMO.userPower;

  return (
    <section className="relative mx-auto max-w-4xl px-4 sm:px-6">
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-zinc-500">
        Live preview — not interactive
      </p>

      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/90 shadow-[0_0_60px_rgba(139,92,246,0.12)]"
      >
        <div className="border-b border-white/5 px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-violet-400">
              {DEMO.label}
            </span>
            <span className="rounded-full border border-purple-800/40 bg-purple-950/80 px-2.5 py-0.5 font-mono text-[10px] text-purple-300">
              Demo
            </span>
          </div>
          <p className="mt-3 rounded-xl border border-white/5 bg-black/40 px-4 py-3 text-left text-sm font-light leading-relaxed text-zinc-300">
            <span className="text-zinc-500">Partner: </span>
            &ldquo;{DEMO.message}&rdquo;
          </p>
        </div>

        <div className="grid gap-4 border-b border-white/5 p-5 sm:grid-cols-2 sm:p-6">
          <div className="rounded-xl border border-white/5 bg-black/30 p-4">
            <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
              Conversation Risk
            </span>
            <p className="mt-1.5 text-base font-semibold text-red-400">
              {DEMO.riskLevel} — {DEMO.riskLabel}
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-black/30 p-4">
            <div className="flex justify-between text-[10px] font-medium uppercase tracking-wider text-zinc-500">
              <span>Power Balance</span>
              <span className="font-mono text-purple-400">
                Partner {partnerPower}% / You {DEMO.userPower}%
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-900">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500"
                style={{ width: `${DEMO.userPower}%` }}
              />
            </div>
          </div>
        </div>

        <div className="border-b border-white/5 px-5 py-4 sm:px-6">
          <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
            Core Subtext
          </span>
          <p className="mt-2 text-left text-sm font-light leading-relaxed text-zinc-400">
            {DEMO.summary}
          </p>
        </div>

        <div className="p-5 sm:p-6">
          <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
            Response Matrix
          </span>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {DEMO.responses.map((r) => (
              <div
                key={r.style}
                className="rounded-xl border border-white/5 bg-black/30 p-3.5"
              >
                <span className={`text-[10px] font-bold uppercase ${r.color}`}>
                  {r.style}
                </span>
                <p className="mt-1.5 text-left text-xs font-light italic leading-relaxed text-zinc-500">
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
