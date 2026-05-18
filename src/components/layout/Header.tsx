import Link from "next/link";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.8)]" />
          <span className="font-display text-lg font-medium tracking-wide text-white">
            ReadThemAI
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/app"
            className="text-sm text-zinc-400 transition-colors hover:text-white"
          >
            Dashboard
          </Link>
          <Link
            href="/app"
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/15"
          >
            Analyze
          </Link>
        </nav>
      </div>
    </header>
  );
}
