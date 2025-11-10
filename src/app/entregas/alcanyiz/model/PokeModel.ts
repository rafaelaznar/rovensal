//definimos de que tipo son los datos que recibiremos dentro del results de la api
export interface PokemonModel{
  name: string;
  url: string;
}

//definimos de que tipo son los datos que recibiremos de la api que contiene la lista completa de pokemons
export interface PokemonListResponse{
  results: PokemonModel[];
}
//definimos de que tipo son los datos que usaremos para los detalles de cada pokemon
export interface PokemonDetailsModel{
  id: number;
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
  };
  types: { type: { name: string } }[];
  weight: number;
  stats: {
    base_stat: number;
    stat: { name: string };
  }
}

