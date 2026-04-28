"use client";

import { Button } from "@/components/ui/button";

type ErrorScreenProps = {
  onRetry: () => void;
};

export function ErrorScreen({ onRetry }: ErrorScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      {/* Subtle background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, hsl(0, 80%, 60%) 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, hsl(0, 80%, 60%) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Error icon - Sad Pokeball */}
      <div className="relative mb-6">
        <div
          className="w-28 h-28 rounded-full border-4 border-destructive/30 flex items-center justify-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, hsl(0, 70%, 95%) 0%, hsl(0, 70%, 95%) 48%, hsl(0, 0%, 30%) 48%, hsl(0, 0%, 30%) 52%, hsl(0, 0%, 97%) 52%, hsl(0, 0%, 97%) 100%)",
            animation: "errorShake 0.5s ease-in-out",
          }}
        >
          {/* Center button of pokeball */}
          <div className="w-10 h-10 rounded-full border-4 border-destructive/40 bg-background z-10 flex items-center justify-center">
            <span className="text-destructive text-xl font-bold">✕</span>
          </div>
        </div>
        {/* Crack effect lines */}
        <svg
          className="absolute top-2 right-1 w-8 h-12 text-destructive/30"
          viewBox="0 0 32 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M2 2 L12 18 L6 24 L16 42" />
          <path d="M10 8 L18 14" />
        </svg>
      </div>

      {/* Error message */}
      <div className="flex flex-col items-center gap-2 text-center px-6 max-w-md">
        <h2 className="text-2xl font-bold text-foreground">
          Oh no! Something went wrong
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Looks like Something disrupted the connection. <br />
          Your Pokédex data couldn&apos;t be loaded.
        </p>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes errorShake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
      `,
        }}
      />
    </div>
  );
}
