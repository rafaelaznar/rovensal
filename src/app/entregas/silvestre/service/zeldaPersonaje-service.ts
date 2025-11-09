import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ZeldaPersonaje } from '../model/zeldaPersonajeInterface';

@Injectable({
  providedIn: 'root'
})
export class ZeldaPersonajesService {
  private baseUrl = 'https://zelda.fanapis.com/api/characters';

  constructor(private http: HttpClient) {}

  /**
   * Carga todas las páginas conocidas de personajes (pongo 30 porque sinceramente ni idea de cuantas tiene).
   * Si alguna página falla, se ignora para que no interrumpa el resto.
   */
  getTodosPersonajes(totalPaginas: number = 30): Observable<ZeldaPersonaje[]> {
    const peticiones: Observable<ZeldaPersonaje[]>[] = [];

    for (let i = 1; i <= totalPaginas; i++) {
      const url = `${this.baseUrl}?page=${i}`;
      peticiones.push(
        this.http.get<{ data: ZeldaPersonaje[] }>(url).pipe(
          map(resp => resp.data || []),
          catchError(() => of([])) // Si falla una página, devuelve array vacío
        )
      );
    }

    // forkJoin combina todos los resultados de las páginas
    return forkJoin(peticiones).pipe(
      map(resultados => resultados.flat()) // aplana los arrays en uno solo
    );
  }

  getPersonajePorId(id: string): Observable<string> {
    return this.http.get<{ data: ZeldaPersonaje }>(`${this.baseUrl}/${id}`).pipe(
      map(resp => resp.data.name || 'Personaje desconocido'),
      catchError(() => of('Personaje desconocido'))
    );
  }
}



