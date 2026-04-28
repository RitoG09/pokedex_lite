"use client";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      {/* Animated background pokeball pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border-[3px] border-foreground"
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animation: "float 6s ease-in-out infinite",
            }}
          >
            <div
              className="absolute top-1/2 left-0 right-0 h-[2px] bg-foreground"
              style={{ transform: "translateY(-50%)" }}
            />
          </div>
        ))}
      </div>

      {/* Running Pikachu */}
      <div className="relative mb-8">
        {/* Ground shadow */}
        <div
          className="absolute -bottom-2 left-1/2 w-24 h-4 rounded-full bg-foreground/10"
          style={{
            transform: "translateX(-50%)",
            animation: "shadowPulse 0.6s ease-in-out infinite alternate",
          }}
        />
        {/* Pikachu with bounce animation */}
        <div
          style={{
            animation: "pikachuRun 0.6s ease-in-out infinite alternate",
          }}
        >
          <img
            src="/pikachu-running.png"
            alt="Pikachu running"
            className="w-32 h-32 object-contain drop-shadow-lg"
            style={{
              imageRendering: "auto",
            }}
          />
        </div>
      </div>

      {/* Loading text */}
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-xl font-bold tracking-wide text-foreground">
          Catching Pokémon
          <span style={{ animation: "dots 1.5s steps(4, end) infinite" }}>
            ...
          </span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Pikachu is fetching your Pokédex data
        </p>
      </div>

      {/* Progress bar */}
      <div className="mt-6 w-64 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #FFCB05, #FF6B35, #FFCB05)",
            backgroundSize: "200% 100%",
            animation:
              "loadingBar 1.5s ease-in-out infinite, shimmer 2s linear infinite",
          }}
        />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pikachuRun {
          0% { transform: translateY(0px) rotate(-2deg); }
          100% { transform: translateY(-12px) rotate(2deg); }
        }
        @keyframes shadowPulse {
          0% { transform: translateX(-50%) scaleX(1); opacity: 0.15; }
          100% { transform: translateX(-50%) scaleX(0.7); opacity: 0.08; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes dots {
          0% { opacity: 0; }
          25% { opacity: 0.3; }
          50% { opacity: 0.6; }
          75% { opacity: 1; }
        }
        @keyframes loadingBar {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}} />
    </div>
  );
}
