import { DemoAnalysis } from "@/components/landing/DemoAnalysis";
import { Hero } from "@/components/landing/Hero";
import { LandingCta } from "@/components/landing/LandingCta";
import { UseCases } from "@/components/landing/UseCases";
import { Header } from "@/components/layout/Header";

export default function LandingPage() {
  return (
    <main className="min-h-dvh overflow-x-hidden bg-black">
      <Header />
      <Hero />
      <div className="pb-16 pt-4 sm:pb-20">
        <DemoAnalysis />
      </div>
      <UseCases />
      <LandingCta />
      <footer className="border-t border-white/5 py-8 text-center text-xs text-zinc-600">
        <p>ReadThemAI — Communication coaching, not psychological diagnosis.</p>
      </footer>
    </main>
  );
}
