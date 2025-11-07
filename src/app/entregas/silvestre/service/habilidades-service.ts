import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habilidad } from '../model/habilidadesInterface';

@Injectable({
    providedIn: 'root'
})
export class HabilidadesService {
    constructor (private oHttpClient: HttpClient) { }

    getHabilidades(): Observable<Habilidad[]> {
        return this.oHttpClient.get<Habilidad[]>('https://dbd.tricky.lol/api/perks');
    }
}   