import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative px-4 pb-8 pt-28 text-center sm:px-6 sm:pb-12 sm:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/4 h-[280px] w-[280px] rounded-full bg-indigo-600/10 blur-[100px]"
      />

      <p className="relative mb-5 text-xs font-medium uppercase tracking-[0.25em] text-violet-400">
        ReadThemAI
      </p>

      <h1 className="relative font-display mx-auto max-w-4xl text-4xl font-light leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
        Read Between
        <br />
        <span className="bg-gradient-to-r from-violet-300 via-purple-200 to-indigo-300 bg-clip-text text-transparent">
          The Lines
        </span>
      </h1>

      <p className="relative mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-zinc-400 sm:text-xl">
        Paste any message. Understand the real intent. Respond with confidence.
      </p>

      <div className="relative mt-10">
        <Button href="/app" className="px-8 py-3.5 text-base">
          Analyze Your Message — It&apos;s Free
        </Button>
      </div>
    </section>
  );
}
