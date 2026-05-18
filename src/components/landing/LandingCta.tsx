import { Button } from "@/components/ui/Button";

export function LandingCta() {
  return (
    <section className="relative mx-auto max-w-3xl px-4 pb-24 pt-8 text-center sm:px-6 sm:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent"
      />
      <p className="relative text-sm text-zinc-500">
        No diagnosis. No labels. Just communication clarity.
      </p>
      <div className="relative mt-8">
        <Button href="/app" className="px-10 py-4 text-base">
          Analyze Your Message — It&apos;s Free
        </Button>
      </div>
    </section>
  );
}
