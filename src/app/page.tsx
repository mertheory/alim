import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Header } from "@/components/layout/Header";

export default function LandingPage() {
  return (
    <main className="min-h-dvh bg-black">
      <Header />
      <Hero />
      <HowItWorks />
      <footer className="border-t border-white/5 py-8 text-center text-xs text-zinc-600">
        <p>Alim Archetype — Communication coaching, not psychological diagnosis.</p>
      </footer>
    </main>
  );
}
