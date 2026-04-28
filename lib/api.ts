import axios from "axios";

export const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 10000,
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error("API error:", error.response.data || error.message);
    return Promise.reject(error);
  },
);
