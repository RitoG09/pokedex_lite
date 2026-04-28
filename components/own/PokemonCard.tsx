"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useFavourite } from "@/store/useFavorites";
import { Heart } from "@phosphor-icons/react";

type Props = {
  name: string;
  url: string;
  onClick?: () => void;
};

export function PokemonCard({ name, url, onClick }: Props) {
  const id = url.split("/").filter(Boolean).pop();

  const { addFavourite, removeFavourite, isFavourite } = useFavourite();

  const favorite = isFavourite(name);

  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div onClick={onClick} className="cursor-pointer group">
      <Card className="relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20">
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Pokémon ID badge */}
        <span className="absolute top-2 left-2.5 text-[10px] font-bold text-muted-foreground/50 tabular-nums">
          #{String(id).padStart(3, "0")}
        </span>

        {/* Favourite button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            favorite ? removeFavourite(name) : addFavourite({ name, url });
          }}
          className="absolute top-2 right-2.5 z-10 p-1 rounded-full transition-all duration-200 hover:scale-125 active:scale-95 cursor-pointer"
          aria-label={favorite ? "Remove from favourites" : "Add to favourites"}
        >
          <Heart
            weight={favorite ? "fill" : "regular"}
            className={`w-4.5 h-4.5 transition-colors ${
              favorite
                ? "text-red-500"
                : "text-muted-foreground/40 group-hover:text-muted-foreground/70"
            }`}
          />
        </button>

        <CardContent className="flex flex-col items-center gap-1.5 pt-8 pb-4 px-3 relative z-[1]">
          {/* Image with hover scale */}
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-2 rounded-full bg-muted/40 blur-md" />
            <img
              src={image}
              alt={name}
              className="w-20 h-20 object-contain relative z-[1] transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
              loading="lazy"
            />
          </div>

          {/* Name */}
          <p className="capitalize font-semibold text-sm text-foreground/90 mt-1 truncate w-full text-center">
            {name}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
