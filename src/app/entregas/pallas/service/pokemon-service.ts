import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { from, map, Observable, switchMap } from 'rxjs';

import { PokemonListResponse } from '../model/pokemonInterface';



@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private oHttp: HttpClient) {}

  getAllPokemons(): Observable<PokemonListResponse> {
    return this.oHttp.get<PokemonListResponse>(`${this.baseUrl}/pokemon/?limit=151&offset=0`);
  }

}

