import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { ZeldaLugar } from '../model/zeldaLugarInterface';
import { ZeldaJuegosService } from './zeldaJuego-service';
import { ZeldaPersonajesService } from './zeldaPersonaje-service';

@Injectable({
  providedIn: 'root'
})
export class ZeldaLugaresService {
  private apiUrl = 'https://zelda.fanapis.com/api/places';
  private http = inject(HttpClient);
  private juegosService = inject(ZeldaJuegosService);
  private personajesService = inject(ZeldaPersonajesService);

  getLugares(): Observable<{ success: boolean; count: number; data: ZeldaLugar[] }> {
    return this.http.get<{ success: boolean; count: number; data: ZeldaLugar[] }>(this.apiUrl).pipe(
      switchMap(response => {
        // Para cada lugar, resolver las URLs de appearances e inhabitants
        const lugaresConDatos = response.data.map(lugar => this.resolverDatosLugar(lugar));
        
        return forkJoin(lugaresConDatos).pipe(
          map(lugaresResueltos => ({
            ...response,
            data: lugaresResueltos
          }))
        );
      })
    );
  }

  private resolverDatosLugar(lugar: ZeldaLugar): Observable<ZeldaLugar> {
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

  private extraerIdDeUrl(url: string): string {
    const partes = url.split('/');
    return partes[partes.length - 1];
  }
}
