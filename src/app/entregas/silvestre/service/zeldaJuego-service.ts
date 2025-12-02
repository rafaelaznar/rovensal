import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ZeldaJuego } from '../model/zeldaJuegoInterface';

/**
 * Servicio para gestionar los juegos de The Legend of Zelda
 * Consume la API externa de Zelda Fan APIs
 */
@Injectable({
  providedIn: 'root',
})
export class ZeldaJuegosService {
  private apiUrl = 'https://zelda.fanapis.com/api/games';

  constructor(private oHttpClient: HttpClient) {}

  /**
   * Obtiene todos los juegos disponibles en la API
   * Usa el parámetro limit=100 para obtener todos los juegos (32 en total)
   * @returns Observable con la lista completa de juegos
   */
  getJuegos(): Observable<{ data: ZeldaJuego[] }> {
    // La API de juegos tiene todos los juegos en una sola llamada con limit
    return this.oHttpClient.get<{ data: ZeldaJuego[] }>(`${this.apiUrl}?limit=100`);
  }

  /**
   * Obtiene el nombre de un juego específico por su ID
   * @param id - Identificador único del juego
   * @returns Observable con el nombre del juego o 'Juego desconocido' si falla
   */
  getJuegoPorId(id: string): Observable<string> {
    return this.oHttpClient.get<{ data: ZeldaJuego }>(`${this.apiUrl}/${id}`).pipe(
      map(resp => resp.data.name || 'Juego desconocido'),
      catchError(() => of('Juego desconocido'))
    );
  }
}
