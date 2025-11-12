export interface Champion {
  id: number;
  name: string;
  title: string;
  icon: string;
  resource: string;
  attackType: string;
  adaptiveType: string;
  stats?: {
    health?: { flat?: number };
    armor?: { flat?: number };
    attackDamage?: { flat?: number };
    movespeed?: { flat?: number };
  };
  positions: string[];
  roles: string[];
  lore: string;
  faction: string;
}

export interface ChampionsResponse {
  data: { [key: string]: Champion };
}