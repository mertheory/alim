import { GlowCard } from "@/components/ui/GlowCard";

const cases = [
  {
    title: "Situationships",
    description:
      "Decode mixed signals, guilt trips, and push-pull dynamics before you over-text or shut down.",
    accent: "from-pink-500/20 to-violet-500/10",
  },
  {
    title: "Workplace",
    description:
      "Read passive-aggressive emails, vague deadlines, and power plays from managers or colleagues.",
    accent: "from-indigo-500/20 to-blue-500/10",
  },
  {
    title: "Friends & Family",
    description:
      "Navigate guilt, boundaries, and emotional leverage — respond clearly without escalating.",
    accent: "from-violet-500/20 to-purple-500/10",
  },
];

export function UseCases() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="mb-12 text-center">
        <h2 className="font-display text-2xl font-light text-white sm:text-3xl">
          Built for real conversations
        </h2>
        <p className="mt-3 text-sm text-zinc-500">
          Where words carry more than they say.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {cases.map((item) => (
          <GlowCard
            key={item.title}
            className={`bg-gradient-to-b ${item.accent} transition-transform hover:scale-[1.02]`}
          >
            <h3 className="font-display text-xl text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              {item.description}
            </p>
          </GlowCard>
        ))}
      </div>
    </section>
  );
}
