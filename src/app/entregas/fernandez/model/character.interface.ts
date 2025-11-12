export interface Character {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  family: string;
  image: string;
  imageUrl: string;
}

export interface CharacterSearchResult {
  characters: Character[];
  total: number;
  page: number;
  limit: number;
}

export interface CharacterFilter {
  name?: string;
  family?: string;
  title?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}