import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const getPokemons = async () => {
  const response = await api.get('/pokemon?limit=50');
  return response.data.results;
};

export const getPokemonDetails = async (name: string) => {
  const response = await api.get(`/pokemon/${name}`);
  return response.data;
};