import axios from 'axios';

type CharactersResponse = {
  info: CharactersResponseInfo,
  results: Character[],
};

type CharactersResponseInfo = {
  count: number,
  pages: number,
  next: string,
  prev: string,
};

export type Character = {
  id: number,
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
  origin: Location,
  location: Location,
  image: string,
  episode: string[],
  url: string,
  created: string,
};

type Location = {
  name: string,
  url: string,
};

const baseUrl = 'https://rickandmortyapi.com/api';

export async function get(path: string) {
  return await axios.get(`${baseUrl}${path}`);
}

export function getAllCharacters(pageNumber = 1) {
  return get(`/character/?page=${pageNumber}`);
}
