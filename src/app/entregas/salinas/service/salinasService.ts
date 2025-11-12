import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RmPersonaje } from '../model/salinasInterface';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SalinasService {
    private personajesapi = 'https://rickandmortyapi.com/api/character';
    
  constructor(private oHttpClient: HttpClient) {}

    getPersonajes(): Observable<RmPersonaje[]> {
        return this.oHttpClient.get<{ results: RmPersonaje[] }>(this.personajesapi)
                         .pipe(map(response => response.results));
    }

    getPersonajePorId(id: number): Observable<RmPersonaje> {
        return this.oHttpClient.get<RmPersonaje>(`${this.personajesapi}/${id}`);
    }

}