"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";

type SearchBarProps = {
  search: string;
  setSearch: (value: string) => void;
};

export function SearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <div className="relative w-full group">
      <MagnifyingGlass
        weight="bold"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors"
      />
      <input
        type="text"
        placeholder="Search Pokémon by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full h-10 pl-9 pr-4 rounded-lg border border-border/60 bg-card/60 backdrop-blur-sm text-sm font-medium placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all duration-200"
      />
      {search && (
        <button
          onClick={() => setSearch("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground text-xs font-medium cursor-pointer"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
