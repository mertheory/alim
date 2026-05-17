import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 pt-24 text-center sm:px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 top-1/2 h-[300px] w-[300px] rounded-full bg-indigo-600/15 blur-[100px]"
      />

      <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-violet-400">
        AI Communication Coach
      </p>

      <h1 className="font-display max-w-4xl text-4xl font-light leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
        Understand conversations.
        <br />
        <span className="bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
          Respond better.
        </span>
        <br />
        Stay in control.
      </h1>

      <p className="mt-6 max-w-xl text-lg text-zinc-400 sm:text-xl">
        AI Communication Coach for modern relationships.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Button href="/app">Start Free Analysis</Button>
        <Button href="#how-it-works" variant="secondary">
          See how it works
        </Button>
      </div>
    </section>
  );
}
