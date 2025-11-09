// Interfaces para manejar los datos de Game of Thrones
// La API de thronesapi.com devuelve estos campos

export interface Character {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;  // viene concatenado desde la API
  title: string;
  family: string;    // la casa a la que pertenece
  image: string;
  imageUrl: string;
}

// Para cuando necesite paginar resultados o algo asi
export interface CharacterSearchResult {
  characters: Character[];
  total: number;
  page: number;
  limit: number;
}

// Filtros que se pueden aplicar en las búsquedas
export interface CharacterFilter {
  name?: string;
  family?: string;  // filtrar por casa
  title?: string;
}

// Respuesta genérica para cuando llame a la API
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;  
}