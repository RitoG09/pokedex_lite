import { useQuery } from "@tanstack/react-query";
import { getPokemonByType } from "@/lib/pokemonApi";

export const usePokemonByType = (type: string) => {
  return useQuery({
    queryKey: ["type", type],
    queryFn: () => getPokemonByType(type),
    enabled: !!type,
  });
};
