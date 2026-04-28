"use client";

import { Funnel } from "@phosphor-icons/react";

type TypeFilterProps = {
  types: any[];
  selected: string;
  setSelected: (value: string) => void;
};

export function TypeFilter({ types, selected, setSelected }: TypeFilterProps) {
  return (
    <div className="relative group shrink-0">
      <Funnel
        weight="bold"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors pointer-events-none"
      />
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="h-10 pl-9 pr-8 rounded-lg border border-border/60 bg-card/60 backdrop-blur-sm text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all duration-200 appearance-none cursor-pointer capitalize"
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type.name} value={type.name} className="capitalize">
            {type.name}
          </option>
        ))}
      </select>
      {/* Custom chevron */}
      <svg
        className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50 pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
