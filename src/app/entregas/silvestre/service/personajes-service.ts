import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personaje } from '../model/personajesInterface';

@Injectable({
    providedIn: 'root'
})
export class PersonajesService {
    constructor (private oHttpClient: HttpClient) { }

    getPersonajes(): Observable<Personaje[]> {
        return this.oHttpClient.get<Personaje[]>('https://dbd.tricky.lol/api/characters');
    }
}   
