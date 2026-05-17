"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

interface AnalysisFormProps {
  onAnalyze: (message: string) => void;
  isLoading: boolean;
}

export function AnalysisForm({ onAnalyze, isLoading }: AnalysisFormProps) {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onAnalyze(message);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-zinc-300"
        >
          Paste your conversation
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Example:&#10;Them: Hey, we need to talk...&#10;You: Sure, what's up?&#10;Them: I feel like you never make time for us."
          rows={8}
          disabled={isLoading}
          className="w-full resize-y rounded-xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 disabled:opacity-60"
        />
      </div>

      <div
        onClick={() => fileInputRef.current?.click()}
        className="flex cursor-not-allowed flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-zinc-950/40 px-4 py-8 text-center opacity-60"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          disabled
          className="hidden"
          aria-hidden
        />
        <p className="text-sm font-medium text-zinc-400">
          Screenshot upload — coming soon
        </p>
        <p className="mt-1 text-xs text-zinc-600">
          For now, paste your chat text above
        </p>
      </div>

      <Button
        type="submit"
        disabled={isLoading || message.trim().length < 10}
        className="w-full sm:w-auto"
      >
        {isLoading ? "Analyzing conversation..." : "Analyze Conversation"}
      </Button>
    </form>
  );
}
