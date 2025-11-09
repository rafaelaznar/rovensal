import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ZeldaJuego } from '../model/zeldaJuegoInterface';

@Injectable({
  providedIn: 'root',
})
export class ZeldaJuegosService {
  private apiUrl = 'https://zelda.fanapis.com/api/games';

  constructor(private oHttpClient: HttpClient) {}

  getJuegos(): Observable<{ data: ZeldaJuego[] }> {
    // La API de juegos tiene todos los juegos en una sola llamada con limit
    return this.oHttpClient.get<{ data: ZeldaJuego[] }>(`${this.apiUrl}?limit=100`);
  }

  getJuegoPorId(id: string): Observable<string> {
    return this.oHttpClient.get<{ data: ZeldaJuego }>(`${this.apiUrl}/${id}`).pipe(
      map(resp => resp.data.name || 'Juego desconocido'),
      catchError(() => of('Juego desconocido'))
    );
  }
}
