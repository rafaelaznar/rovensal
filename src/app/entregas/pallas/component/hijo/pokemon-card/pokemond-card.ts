import { Component, Input } from '@angular/core';
import { Pokemon, PokemonListResponse } from '../../../model/pokemonInterface';
import { PokemonService } from '../../../service/pokemon-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemon-card',
  imports: [FormsModule],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css',
  
})
export class PokemonCard {
@Input() pokemon!: Pokemon;

pokemons: Pokemon[] = [];

constructor(private pokemonService: PokemonService) { }

ngOnInit() {
  this.getPokemons()
  }

getPokemons() {
  this.pokemonService.getAllPokemons().subscribe(( response: PokemonListResponse ) => {
    this.pokemons = response.results;
    console.log(this.pokemons);
  });
}

getPokemonImage(pokemon: Pokemon): string {
  const id = this.getPokemonId(pokemon.url);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}


getPokemonId(url: string): number {
  const urlParts = url.split('/');
  return +urlParts[urlParts.length - 2];
}


}
