import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const usePokemonDetails = (name: string) => {
  return useQuery({
    queryKey: ["pokemon-details", name],
    queryFn: async () => {
      const res = await api.get(`/pokemon/${name.toLowerCase()}`);
      return res.data;
    },
    enabled: !!name,
  });
};
