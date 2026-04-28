"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const TYPE_COLORS: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export function PokemonDetailSheet({
  open,
  onOpenChange,
  pokemonName,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pokemonName: string | null;
}) {
  const { data, isLoading } = usePokemonDetails(pokemonName || "");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[360px] sm:w-[440px] overflow-y-auto border-l border-border/40 p-0"
      >
        {/* Loading state */}
        {isLoading && (
          <div className="p-6 space-y-6">
            <Skeleton className="h-6 w-32 mx-auto" />
            <Skeleton className="h-48 w-48 mx-auto rounded-2xl" />
            <div className="flex gap-2 justify-center">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-2 flex-1 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        )}

        {data && (
          <>
            {/* Hero section with colored background */}
            <div
              className="relative pt-12 pb-8 px-6"
              style={{
                background: `linear-gradient(135deg, ${TYPE_COLORS[data.types[0]?.type.name] || "#888"}22 0%, transparent 60%)`,
              }}
            >
              <SheetHeader>
                <div className="flex items-center justify-between">
                  <SheetTitle className="capitalize text-2xl font-black tracking-tight">
                    {data.name}
                  </SheetTitle>
                  <span className="text-sm font-bold text-muted-foreground/50 tabular-nums">
                    #{String(data.id).padStart(3, "0")}
                  </span>
                </div>
              </SheetHeader>

              {/* Official artwork */}
              <div className="relative w-48 h-48 mx-auto mt-4">
                <div
                  className="absolute inset-4 rounded-full blur-2xl opacity-20"
                  style={{
                    backgroundColor:
                      TYPE_COLORS[data.types[0]?.type.name] || "#888",
                  }}
                />
                <img
                  src={
                    data.sprites.other["official-artwork"].front_default
                  }
                  alt={data.name}
                  className="w-full h-full object-contain relative z-[1] drop-shadow-lg"
                />
              </div>

              {/* Type badges */}
              <div className="flex gap-2 justify-center mt-4">
                {data.types.map((t: any) => (
                  <Badge
                    key={t.type.name}
                    className="capitalize text-xs font-bold px-3 py-1 rounded-full border-0"
                    style={{
                      backgroundColor:
                        (TYPE_COLORS[t.type.name] || "#888") + "25",
                      color: TYPE_COLORS[t.type.name] || "#888",
                    }}
                  >
                    {t.type.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Info sections */}
            <div className="px-6 pb-8 space-y-6">
              {/* Physical info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/40 rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Height
                  </p>
                  <p className="text-sm font-bold">
                    {(data.height / 10).toFixed(1)} m
                  </p>
                </div>
                <div className="bg-muted/40 rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Weight
                  </p>
                  <p className="text-sm font-bold">
                    {(data.weight / 10).toFixed(1)} kg
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Base Stats
                </h3>
                <div className="space-y-2.5">
                  {data.stats.map((stat: any) => {
                    const maxStat = 255;
                    const percentage = Math.min(
                      (stat.base_stat / maxStat) * 100,
                      100
                    );
                    const typeColor =
                      TYPE_COLORS[data.types[0]?.type.name] || "#888";

                    return (
                      <div key={stat.stat.name} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="capitalize font-medium text-muted-foreground">
                            {stat.stat.name.replace("-", " ")}
                          </span>
                          <span className="font-bold tabular-nums">
                            {stat.base_stat}
                          </span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700 ease-out"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: typeColor,
                              opacity:
                                0.6 + (stat.base_stat / maxStat) * 0.4,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Abilities */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Abilities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.abilities.map((a: any) => (
                    <span
                      key={a.ability.name}
                      className="px-3 py-1.5 rounded-lg bg-muted/50 text-xs font-semibold capitalize text-foreground/80 border border-border/40"
                    >
                      {a.ability.name.replace("-", " ")}
                      {a.is_hidden && (
                        <span className="ml-1.5 text-[10px] text-muted-foreground font-normal">
                          (hidden)
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
