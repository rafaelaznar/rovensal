import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../model/eventosInterface';

@Injectable({
    providedIn: 'root'
})
export class EventosService {
    constructor (private oHttpClient: HttpClient) { }

    getEventos(): Observable<Evento[]> {
        return this.oHttpClient.get<Evento[]>('https://dbd.tricky.lol/api/events');
    }
} 
