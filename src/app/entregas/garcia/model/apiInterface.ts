export interface Character {
  id: number;
  name: string;
  race: string;
  img: string;
}

export interface CharacterResponse {
  content: Character[];
}