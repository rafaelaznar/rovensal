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
   * Carga todas las páginas conocidas de personajes (por defecto 10).
   * Si alguna página falla, se ignora para que no interrumpa el resto.
   */
  getTodosPersonajes(totalPaginas: number = 10): Observable<ZeldaPersonaje[]> {
    const peticiones: Observable<ZeldaPersonaje[]>[] = [];

    for (let i = 1; i <= totalPaginas; i++) {
      const url = `${this.baseUrl}?page=${i}`;
      peticiones.push(
        this.http.get<{ data: ZeldaPersonaje[] }>(url).pipe(
          map(resp => resp.data || []),
          catchError(() => of([])) // 🔹 si falla una página, devuelve array vacío
        )
      );
    }

    // 🔹 forkJoin combina todos los resultados de las páginas
    return forkJoin(peticiones).pipe(
      map(resultados => resultados.flat()) // 🔹 aplana los arrays en uno solo
    );
  }
}



