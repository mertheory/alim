import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-black px-4 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl text-white">Page not found</h1>
      <p className="mt-2 max-w-sm text-zinc-400">
        This page does not exist. Head back to analyze a conversation.
      </p>
      <div className="mt-8 flex gap-4">
        <Button href="/">Home</Button>
        <Button href="/app" variant="secondary">
          Dashboard
        </Button>
      </div>
    </main>
  );
}
