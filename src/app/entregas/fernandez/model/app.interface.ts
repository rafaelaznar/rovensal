// Datos de las casas de Westeros - por si los necesito luego
export interface House {
  id: number;
  name: string;
  region: string;   // ej: "The North", "Riverlands"
  words: string;    // el lema de la casa
  sigil: string;    // descripción del escudo
  members: string[]; // lista de personajes
}

// Configuración general de la app
export interface AppConfig {
  apiBaseUrl: string;
  itemsPerPage: number;  // para paginación
  maxRetries: number;    // reintentos de llamadas API
}

// Eventos que puede disparar la aplicación
export enum EventType {
  CHARACTER_SELECTED = 'character_selected',
  FILTER_APPLIED = 'filter_applied', 
  SEARCH_PERFORMED = 'search_performed',
  ERROR_OCCURRED = 'error_occurred'
}

// Para trackear lo que pasa en la app
export interface AppEvent {
  type: EventType;
  payload: any;      // datos del evento
  timestamp: Date;
}