import { api } from "./api";

export const getPokemonByName = async (name: string) => {
  const res = await api.get(`/pokemon/${name.toLowerCase()}`);
  return res.data;
};

export const getTypes = async () => {
  const res = await api.get("/type");
  return res.data.results;
};

export const getPokemonByType = async (type: string) => {
  const res = await api.get(`/type/${type}`);
  return res.data.pokemon;
};
