/**
 * Interface para representar un personaje de Juego de Tronos
 * Basado en la API https://thronesapi.com
 */
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

/**
 * Interface para el resultado de búsqueda de personajes
 */
export interface CharacterSearchResult {
  characters: Character[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Interface para filtros de búsqueda
 */
export interface CharacterFilter {
  name?: string;
  family?: string;
  title?: string;
}

/**
 * Interface para respuesta de la API
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}