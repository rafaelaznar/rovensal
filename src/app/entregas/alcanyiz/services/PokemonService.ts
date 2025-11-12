
import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {PokemonDetailsModel, PokemonListResponse} from '../model/PokeModel'

// Decorador que indica que este servicio puede ser inyectado en otros componentes o servicios
@Injectable({
  providedIn: 'root'
})

export class PokemonService{
  //creamos un array privado para almacenar los pokemons del equipo
  private equipo: PokemonDetailsModel[] = [];
  //inyectamos el HttpClient en el constructor para poder hacer peticiones HTTP
  constructor(private oHttpClient: HttpClient) {}

  //Observable al que le devolveremos un valor de tipo PokemonListResponse
  getAll():Observable<PokemonListResponse>{
    //hacemos la peticion get a la api de pokeapi para obtener la pokedex
    return this.oHttpClient.get<PokemonListResponse>('https://pokeapi.co/api/v2/pokemon?limit=70&offset=0')
  }
  //Observable al que le devolveremos un valor de tipo PokemonDetailsModel o null en caso de no existir
  //ya que le pasaremos su id o nombre para buscar ese en concreto
  getOnePokemon(value: number | string): Observable<PokemonDetailsModel | null> {
    if (!value || (typeof value === 'number' && value <= 0)) {
      return of(null);
    }

    return this.oHttpClient
      .get<PokemonDetailsModel>(`https://pokeapi.co/api/v2/pokemon/${value}`)
      .pipe(
        catchError((err) => of(null))
      );
  }

  //Observable que le devolveremos un valor de tipo PokemonDetailsModel a partir de la url o api endpoint
  getByUrl(url: string):Observable<PokemonDetailsModel>{
    return this.oHttpClient.get<PokemonDetailsModel>(url);
  }
  //Devuelve el array de pokemons del equipo
  equipoPokemon(): PokemonDetailsModel[] {
    return this.equipo;
  }

  // Añade un pokemon al equipo si no está ya y si hay espacio
  savePokemonToEquipo(pokemon: PokemonDetailsModel): boolean {
    //si el pokemon es nulo o no tiene id, no se añade
    if (!pokemon || typeof pokemon.id === 'undefined' || pokemon.id === null) {
      return false;
    }
    //si el equipo ya tiene 6 pokemons, no se añade
    if (this.equipo.length >= 6) {
      return false;
    }
    //si el pokemon ya está en el equipo, no se añade
    const exists = this.equipo.some(p => p.id === pokemon.id);
    if (exists) {
      return false;
    }
    //si no está en el equipo y hay espacio, se añade
    this.equipo.push(pokemon);
    return true;
  }

  // Elimina un pokemon del equipo por su id
  removePokemonFromEquipo(id: number): boolean {
    const idx = this.equipo.findIndex(p => p.id === id);
    if (idx === -1) return false;
    this.equipo.splice(idx, 1);
    return true;
  }
}

