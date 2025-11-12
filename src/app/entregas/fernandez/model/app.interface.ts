export interface House {
  id: number;
  name: string;
  region: string;
  words: string;
  sigil: string;
  members: string[];
}

export interface AppConfig {
  apiBaseUrl: string;
  itemsPerPage: number;
  maxRetries: number;
}

export enum EventType {
  CHARACTER_SELECTED = 'character_selected',
  FILTER_APPLIED = 'filter_applied', 
  SEARCH_PERFORMED = 'search_performed',
  ERROR_OCCURRED = 'error_occurred'
}

export interface AppEvent {
  type: EventType;
  payload: any;
  timestamp: Date;
}