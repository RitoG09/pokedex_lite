import { create } from "zustand";
import { persist } from "zustand/middleware";

type Pokemon = {
  name: string;
  url: string;
};

type FavouritesState = {
  favourites: Pokemon[];
  addFavourite: (pokemon: Pokemon) => void;
  removeFavourite: (name: string) => void;
  isFavourite: (name: string) => boolean;
};

export const useFavourite = create<FavouritesState>()(
  persist(
    (set, get) => ({
      favourites: [],

      addFavourite: (pokemon) =>
        set((state) => ({
          favourites: [...state.favourites, pokemon],
        })),

      removeFavourite: (name) =>
        set((state) => ({
          favourites: state.favourites.filter((p) => p.name !== name),
        })),

      isFavourite: (name) => {
        return get().favourites.some((p) => p.name === name);
      },
    }),
    {
      name: "pokemon-favourites",
    },
  ),
);
