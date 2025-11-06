import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Libro } from '../zanonModel/zanonInterface';
import { map, Observable } from 'rxjs';

// Esta interfaz define el tipo esperado de la respuesta JSON que devuelve la API
interface librosResponse {
  data: Libro[];
}

@Injectable({
  providedIn: 'root'
})
export class ZanonService {

  constructor(private oHttpClient: HttpClient) {

  }

  getAll(): Observable<Libro[]> {

    // oHttpClient.get<librosResponse> usa esa interfaz para tipar la respuesta
    return this.oHttpClient.get<librosResponse>('https://stephen-king-api.onrender.com/api/books').pipe (

      // El map extrae el array de libros de la propiedad que se definió en la interfaz
      map(response => response.data)
    );
  }
}