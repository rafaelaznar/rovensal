import { ContainerPokemon } from './../containerPokemon/containerPokemon';
import { Component, inject } from '@angular/core';
import {CommonModule} from '@angular/common';
import {PokemonService} from '../../services/PokemonService';
import {PokemonModel, PokemonListResponse, PokemonDetailsModel} from '../../model/PokeModel'
import {MatDialog} from '@angular/material/dialog';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-alcanyiz',
  imports: [CommonModule, ContainerPokemon],
  templateUrl: './alcanyizComponent.html',
  styleUrl: './alcanyizComponent.css',
  standalone: true
})

export class AlcanyizComponent {

  //declaramos las variables necesarias
  ultimoAbierto: number = -1;
  pokemons: PokemonDetailsModel[] = [];
  readonly oMatDialog = inject(MatDialog);
  trainerName: string = '';

  //inyectamos el servicio de PokemonService
  constructor(private oPokemonService: PokemonService){}

  //cuando se inicie el componente, llamamos a la funcion getPokemons
  ngOnInit(){
    this.getPokemons();
  }

  getPokemons(): void{
    //llamamos al servicio para obtener todos los pokemons creando una suscripción
    this.oPokemonService.getAll().subscribe({
      next: (list: PokemonListResponse) => {
        //una vez obtenida la lista, hacemos peticiones para obtener los detalles de cada pokemon mediante su endpoint propio
        const peticiones = list.results.map((pokemon) =>
          this.oPokemonService.getByUrl(pokemon.url)
        );
        //usamos forkJoin para esperar a que todas las peticiones se completen
        forkJoin(peticiones).subscribe({
          next: (detalles: PokemonDetailsModel[]) => {
            this.pokemons = detalles;
          },
          error: (error) => {
            console.error('Error fetching Pokémon details:', error);
          }
        });
      }
    });
  }
}

