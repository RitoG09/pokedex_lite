"use client";

import { useState } from "react";
import { usePokemon } from "@/hooks/usePokemon";
import { PokemonCard } from "@/components/own/PokemonCard";
import { LoadingScreen } from "@/components/own/LoadingScreen";
import { ErrorScreen } from "@/components/own/ErrorScreen";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/own/SearchBar";
import { TypeFilter } from "@/components/own/TypeFilter";
import { usePokemonByType } from "@/hooks/usePokemonByType";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchPokemon } from "@/hooks/useSearchPokemon";
import { useTypes } from "@/hooks/useTypes";
import Link from "next/link";
import { PokemonDetailSheet } from "@/components/own/PokemonDetailSheet";
import { Heart, ArrowLeft, ArrowRight } from "@phosphor-icons/react";

const LIMIT = 20;

export default function Home() {
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const debouncedSearch = useDebounce(search);
  const searchQuery = useSearchPokemon(debouncedSearch);
  const typeQuery = usePokemonByType(type);
  const { data: types } = useTypes();
  const { data, isLoading, isError, refetch } = usePokemon(offset);

  const isSearching = !!debouncedSearch;
  const isFiltering = !!type;
  const isDefault = !isSearching && !isFiltering;

  let pokemonList: any[] = [];

  if (debouncedSearch) {
    if (searchQuery.data) {
      pokemonList = [
        {
          name: searchQuery.data.name,
          url: `https://pokeapi.co/api/v2/pokemon/${searchQuery.data.id}`,
        },
      ];
    }
  } else if (type) {
    pokemonList = typeQuery.data?.map((p: any) => p.pokemon) || [];
  } else {
    pokemonList = data?.results || [];
  }

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen onRetry={() => refetch()} />;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center relative overflow-hidden shrink-0"
                style={{
                  background:
                    "linear-gradient(180deg, #EE4035 0%, #EE4035 45%, #222 45%, #222 55%, #fff 55%, #fff 100%)",
                }}
              >
                <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-[#333] bg-white z-10" />
              </div>
              <h1 className="text-xl font-bold tracking-tight">
                Pokédex
                <span className="text-primary font-black">.</span>
              </h1>
            </div>

            {/* Favourites link */}
            <Link href="/favourites">
              <Button
                variant="ghost"
                className="gap-2 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Heart weight="fill" className="w-4 h-4 text-red-500" />
                Favourites
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <SearchBar search={search} setSearch={setSearch} />
          </div>
          <TypeFilter types={types || []} selected={type} setSelected={setType} />
        </div>

        {/* Results info */}
        {(isSearching || isFiltering) && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              {pokemonList.length === 0
                ? "No Pokémon found"
                : `Showing ${pokemonList.length} result${pokemonList.length > 1 ? "s" : ""}`}
            </span>
            {(isSearching || isFiltering) && (
              <button
                onClick={() => {
                  setSearch("");
                  setType("");
                }}
                className="text-primary hover:underline cursor-pointer text-xs font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {pokemonList?.map((pokemon: any) => (
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

        {/* Empty state for search/filter */}
        {pokemonList.length === 0 && (isSearching || isFiltering) && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-semibold text-foreground">
              No Pokémon found
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Try a different search term or filter
            </p>
          </div>
        )}

        {/* Pagination */}
        {isDefault && (
          <div className="flex flex-col items-center gap-4 pt-4 pb-8">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                disabled={!data?.previous}
                onClick={() => setOffset((prev) => Math.max(prev - LIMIT, 0))}
                className="gap-1.5 px-4 transition-all hover:shadow-md disabled:opacity-40"
              >
                <ArrowLeft weight="bold" className="w-3.5 h-3.5" />
                Prev
              </Button>

              <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-muted/60 text-sm font-medium tabular-nums">
                <span className="text-primary font-bold">
                  {data?.currentPage}
                </span>
                <span className="text-muted-foreground">/</span>
                <span className="text-muted-foreground">
                  {data?.totalPages}
                </span>
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={!data?.next}
                onClick={() => setOffset((prev) => prev + LIMIT)}
                className="gap-1.5 px-4 transition-all hover:shadow-md disabled:opacity-40"
              >
                Next
                <ArrowRight weight="bold" className="w-3.5 h-3.5" />
              </Button>
            </div>
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
