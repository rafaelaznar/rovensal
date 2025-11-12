import { Component } from '@angular/core';
import { Pokemon, PokemonListResponse } from '../../../model/pokemonInterface';
import { PokemonService } from '../../../service/pokemon-service';
import { PokemonCard } from '../../hijo/pokemon-card/pokemond-card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCard, CommonModule, FormsModule],
  templateUrl: './pokemon-list.html',
  styleUrls: ['./pokemon-list.css'],
  standalone: true
})
export class PokemonList {

pokemons : Pokemon[] = [];
searchTerm: string = '';
pokemonsFiltrados: Pokemon[] = [];


constructor(private pokemonService: PokemonService) { }

ngOnInit() {
  this.getPokemons()

}

getPokemons(){
  this.pokemonService.getAllPokemons().subscribe((response: PokemonListResponse) => {
    this.pokemons = response.results;
    this.pokemonsFiltrados = response.results;
    console.log(this.pokemons);
  });
}

filtrarPokemons(){
  
  const filtro = this.searchTerm.toLowerCase().trim();
  if(!filtro){
    this.pokemonsFiltrados = this.pokemons;
    return;
  }

  if(!/^[a-zA-Z]+$/.test(filtro)){
    alert('Solo se permiten letras')
    return;
  }

  this.pokemonsFiltrados = this.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(filtro));



}


}

