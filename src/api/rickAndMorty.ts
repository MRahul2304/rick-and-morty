import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface CharacterApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export const fetchCharacters = async (page: number = 1): Promise<CharacterApiResponse> => {
  const res = await axios.get<CharacterApiResponse>(`${BASE_URL}/character`, {
    params: { page },
  });
  return res.data;
};

export const fetchCharacterById = async (id: string): Promise<Character> => {
  const res = await axios.get<Character>(`${BASE_URL}/character/${id}`);
  return res.data;
};