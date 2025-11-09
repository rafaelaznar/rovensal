// Interface que define la estructura de una ubicación en Rick and Morty
export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

// Interface para la respuesta de la API de ubicaciones con paginación
export interface LocationResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Location[];
}
