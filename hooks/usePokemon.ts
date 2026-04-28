import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const LIMIT = 20;

export const usePokemon = (offset: number) => {
  return useQuery({
    queryKey: ["pokemon", offset],
    queryFn: async () => {
      const res = await api.get(`/pokemon?limit=${LIMIT}&offset=${offset}`);
      const data = res.data;

      return {
        results: data.results,
        count: data.count,
        next: data.next,
        previous: data.previous,
        totalPages: Math.ceil(data.count / LIMIT),
        currentPage: offset / LIMIT + 1,
      };
    },
  });
};
