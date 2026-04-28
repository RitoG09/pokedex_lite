"use client";

import { useFavourite } from "@/store/useFavorites";
import { PokemonCard } from "@/components/own/PokemonCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Heart } from "@phosphor-icons/react";
import { useState } from "react";
import { PokemonDetailSheet } from "@/components/own/PokemonDetailSheet";

export default function FavouritesPage() {
  const { favourites } = useFavourite();
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-sm font-medium hover:bg-primary/10 hover:text-primary"
                >
                  <ArrowLeft weight="bold" className="w-4 h-4" />
                  Back
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Heart weight="fill" className="w-5 h-5 text-red-500" />
              <h1 className="text-lg font-bold tracking-tight">Favourites</h1>
              {favourites.length > 0 && (
                <span className="ml-1 text-xs font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {favourites.length}
                </span>
              )}
            </div>

            {/* Spacer for centering */}
            <div className="w-[72px]" />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Empty State */}
        {favourites.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-6">
              <Heart weight="thin" className="w-10 h-10 text-muted-foreground/30" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              No favourites yet
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs">
              Start exploring the Pokédex and tap the heart icon on any Pokémon
              to save it here.
            </p>
            <Link href="/" className="mt-6">
              <Button variant="outline" className="gap-2">
                <ArrowLeft weight="bold" className="w-3.5 h-3.5" />
                Explore Pokédex
              </Button>
            </Link>
          </div>
        )}

        {/* Grid */}
        {favourites.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {favourites.map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
                onClick={() => {
                  setSelectedPokemon(pokemon.name);
                  setOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </main>

      {/* Detail Sheet */}
      <PokemonDetailSheet
        open={open}
        onOpenChange={setOpen}
        pokemonName={selectedPokemon}
      />
    </div>
  );
}
