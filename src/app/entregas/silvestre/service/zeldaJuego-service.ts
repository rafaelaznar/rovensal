import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ZeldaJuego } from '../model/zeldaJuegoInterface';

@Injectable({
  providedIn: 'root',
})
export class ZeldaJuegosService {
  private apiUrl = 'https://zelda.fanapis.com/api/games';

  constructor(private oHttpClient: HttpClient) {}

  getJuegos(): Observable<{ data: ZeldaJuego[] }> {
    return this.oHttpClient.get<{ data: ZeldaJuego[] }>(this.apiUrl);
  }
}
