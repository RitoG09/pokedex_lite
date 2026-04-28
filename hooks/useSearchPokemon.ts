import { useQuery } from "@tanstack/react-query";
import { getPokemonByName } from "@/lib/pokemonApi";

export const useSearchPokemon = (name: string) => {
  return useQuery({
    queryKey: ["search", name],
    queryFn: () => getPokemonByName(name),
    enabled: !!name,
    retry: false,
  });
};
