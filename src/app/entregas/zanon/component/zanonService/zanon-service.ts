import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../zanonModel/zanonInterface';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZanonService {

  constructor(private oHttpClient: HttpClient) {

  }

  getAll(): Observable<Pokemon[]> {
    
    // Primero se obtiene la lista con los nombres y URLs
    return this.oHttpClient.get<any>('https://pokeapi.co/api/v2/pokemon').pipe (

      // Entonces hacemos una llamada por cada Pokémon para obtener su información completa
      switchMap((response: any): Observable<Pokemon[]> => {
        const requests = response.results.map((pokemon: any) => 
          this.oHttpClient.get<any>(pokemon.url).pipe (
            map(data => ({
              name: data.name,
              height: data.height,
              weight: data.weight,
              imageUrl: data.sprites.front_default,
              types: data.types.map((t: any) => t.type.name),
              abilities: data.abilities.map((a: any) => a.ability.name)
            }))
          )
        );

        // "forkJoin" combina todas las peticiones en un solo array de Pokémon
        return forkJoin<Pokemon[]>(requests);
      })
    );
  }
}