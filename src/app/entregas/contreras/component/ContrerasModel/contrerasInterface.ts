export interface Champion {
  id: string;
  name: string;
  title: string;
  icon: string;
  resource: string;
  attackType: string;
  adaptiveType: string;
  stats: {
    hp: number;
    armor: number;
    attackdamage: number;
    movespeed: number;
  };
  positions: string[];
  roles: string[];
  lore: string;
  faction: string;
}

export interface ChampionsResponse {
  data: { [key: string]: Champion };
}