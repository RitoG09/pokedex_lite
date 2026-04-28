import { useQuery } from "@tanstack/react-query";
import { getTypes } from "@/lib/pokemonApi";

export const useTypes = () => {
  return useQuery({
    queryKey: ["types"],
    queryFn: getTypes,
  });
};
