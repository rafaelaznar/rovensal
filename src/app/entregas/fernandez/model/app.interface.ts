/**
 * Interface para representar una Casa de Juego de Tronos
 */
export interface House {
  id: number;
  name: string;
  region: string;
  words: string;
  sigil: string;
  members: string[];
}

/**
 * Interface para configuración de la aplicación
 */
export interface AppConfig {
  apiBaseUrl: string;
  itemsPerPage: number;
  maxRetries: number;
}

/**
 * Enum para los tipos de eventos de la aplicación
 */
export enum EventType {
  CHARACTER_SELECTED = 'character_selected',
  FILTER_APPLIED = 'filter_applied',
  SEARCH_PERFORMED = 'search_performed',
  ERROR_OCCURRED = 'error_occurred'
}

/**
 * Interface para eventos de la aplicación
 */
export interface AppEvent {
  type: EventType;
  payload: any;
  timestamp: Date;
}