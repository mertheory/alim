import { GlowCard } from "@/components/ui/GlowCard";

const steps = [
  {
    step: "01",
    title: "Paste message",
    description:
      "Copy your chat thread or a single message — WhatsApp-style text works great.",
  },
  {
    step: "02",
    title: "AI analyzes tone & context",
    description:
      "We read communication dynamics — not psychology. Neutral, practical insights only.",
  },
  {
    step: "03",
    title: "Get response suggestions",
    description:
      "Three reply styles plus a clear strategy for what to do next.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6"
    >
      <div className="mb-16 text-center">
        <h2 className="font-display text-3xl font-light text-white sm:text-4xl">
          How it works
        </h2>
        <p className="mt-3 text-zinc-400">
          From paste to clarity in under a minute.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((item) => (
          <GlowCard key={item.step} className="flex flex-col">
            <span className="text-sm font-medium text-violet-400">
              {item.step}
            </span>
            <h3 className="mt-3 font-display text-xl text-white">
              {item.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
              {item.description}
            </p>
          </GlowCard>
        ))}
      </div>
    </section>
  );
}
