export interface Character {
  id: number;
  name: string;
  race: string;
  img: string;
  gender?: string;
  age?: string;
}

export interface CharacterResponse {
  content: Character[];
  totalElements?: number;
  totalPages?: number;
}

export interface CombatStats {
  vida: number;
  ataque: number;
  defensa: number;
}

export interface Combatiente {
  nombre: string;
  imagen: string;
  vidaActual: number;
  vidaMaxima: number;
  ataque: number;
  defensa: number;
  estaDefendiendo: boolean;
  tipo: string;
  raza: string;
}

export interface LogCombate {
  id: number;
  turno: number;
  mensaje: string;
  tipo: string;
}

export interface EstadoJuego {
  paso: number;
  generoElegido: string;
  nombreJugador: string;
  combateIniciado: boolean;
  combateTerminado: boolean;
}

export interface ResultadoAtaque {
  dano: number;
  vidaRestante: number;
  mensaje: string;
  estaDefendiendo: boolean;
}