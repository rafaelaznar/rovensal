import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ZeldaLugar } from '../model/zeldaLugarInterface';
import { ZeldaJuegosService } from './zeldaJuego-service';
import { ZeldaPersonajesService } from './zeldaPersonaje-service';

/**
 * Servicio para gestionar los lugares de The Legend of Zelda
 * Consume la API externa y resuelve las relaciones con juegos y personajes
 */
@Injectable({
  providedIn: 'root'
})
export class ZeldaLugaresService {
  private apiUrl = 'https://zelda.fanapis.com/api/places';
  private http = inject(HttpClient);
  private juegosService = inject(ZeldaJuegosService);
  private personajesService = inject(ZeldaPersonajesService);

  /**
   * Obtiene todos los lugares disponibles cargando múltiples páginas
   * Carga 100 páginas en paralelo para obtener el máximo de lugares posible
   * @returns Observable con la colección completa de lugares
   */
  getLugares(): Observable<{ success: boolean; count: number; data: ZeldaLugar[] }> {
    // Cargar 100 páginas de lugares
    const peticiones: Observable<ZeldaLugar[]>[] = [];

    for (let i = 1; i <= 100; i++) { // 100 páginas porque no tengo ni idea de cuantas hay 
      const url = `${this.apiUrl}?page=${i}`;
      peticiones.push(
        this.http.get<{ data: ZeldaLugar[] }>(url).pipe(
          map(resp => resp.data || []),
          catchError(() => of([]))
        )
      );
    }

    return forkJoin(peticiones).pipe(
      map(respuestas => {
        const todosLugares = respuestas.flat();
        return {
          success: true,
          count: todosLugares.length,
          data: todosLugares
        };
      })
    );
  }

  /**
   * Resuelve los datos de un lugar específico, convirtiendo URLs a nombres legibles
   * Obtiene los nombres reales de los juegos y personajes asociados al lugar
   * @param lugar - Lugar cuyos datos se van a resolver
   * @returns Observable con el lugar enriquecido con nombres de juegos y personajes
   */
  resolverDatosLugar(lugar: ZeldaLugar): Observable<ZeldaLugar> {
    const appearances$ = lugar.appearances?.length 
      ? forkJoin(
          lugar.appearances.map(url => {
            const id = this.extraerIdDeUrl(url);
            return this.juegosService.getJuegoPorId(id).pipe(
              catchError(() => of('Juego desconocido'))
            );
          })
        )
      : of([]);

    const inhabitants$ = lugar.inhabitants?.length
      ? forkJoin(
          lugar.inhabitants.map(url => {
            const id = this.extraerIdDeUrl(url);
            return this.personajesService.getPersonajePorId(id).pipe(
              catchError(() => of('Personaje desconocido'))
            );
          })
        )
      : of([]);

    return forkJoin({
      appearances: appearances$,
      inhabitants: inhabitants$
    }).pipe(
      map(({ appearances, inhabitants }) => ({
        ...lugar,
        appearancesNames: appearances,
        inhabitantsNames: inhabitants
      }))
    );
  }

  /**
   * Extrae el ID de una URL de la API
   * @param url - URL completa de la API (ej: https://zelda.fanapis.com/api/games/12345)
   * @returns ID extraído de la URL
   */
  private extraerIdDeUrl(url: string): string {
    const partes = url.split('/');
    return partes[partes.length - 1];
  }
}
