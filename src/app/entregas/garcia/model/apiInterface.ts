export interface Character {
  id: number;
  name: string;
  age: number;
  gender: string;
  img: string;
}

export interface CharacterResponse {
  content: Character[];
}