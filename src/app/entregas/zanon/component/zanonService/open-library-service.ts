import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenLibraryService {

  constructor(private oHttpClient: HttpClient) {

  }

  // "isbn: string" es el parámetro que recibe, el identificador del libro. Esto devuelve un "Observable" que emitirá un
  // objeto en dos campos (coverUrl y description)
  obtenerInfoLibro(isbn: string): Observable<{ coverUrl: string, description: string}> {
    const coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;

    // "this.oHttpClient.get<any>" usa el servicio de Angular HttpClient para hacer una petición GET a la API de Open Library
    return this.oHttpClient.get<any>(`https://openlibrary.org/isbn/${isbn}.json`).pipe ( // "pipe" procesa los datos con operadores
      
      // "switchMap()" transforma un valor recibido (data) en un nuevo "Observable"
      switchMap(data => {
        const workKey = data?.works?.[0]?.key; // Busca si el JSON de OpenLibraryService tiene una clave "works"
        const description = 
          typeof data.description === 'string'
          ? data.description // Si la descripción es un texto, la devuelve tal cual
          : data.description?.value || 'Descripción no disponible'; // Si es un objeto, o no existe, busca ".value", o muestra un mensaje por defecto
        
        // Si ya tenemos una descripción, no hace falta hacer más peticiones.
        // Por lo que devolvemos un objeto con la portada y la descripción envuelto en un "Observable" con "of()"
        if (description) {
          return of({
            coverUrl, 
            description
          });
        }

        // Si no hay descripción, pero sí una referencia al libro, hacemos una segunda llamada HTTP para obtener la descripión
        // más completa
        if (workKey) {
          return this.oHttpClient.get<any>(`https://openlibrary.org${workKey}.json`).pipe (
            map(workData => ({
              coverUrl,
              description: typeof workData.description === 'string'
                ? workData.description // Si la descripción es un texto, la devuelve tal cual
                : workData.description?.value || 'Descripción no disponible' // Si es un objeto, o no existe, busca ".value", o muestra un mensaje por defecto
            })),

            // Si esta petición también falla, "catchError()" devuelve un valor por defecto sin romper el flujo
            catchError(() => of({
              coverUrl,
              description: 'Descripción no disponible'
            }))
          );
        }
        
        // Si no hay ni descripción, ni workKey, devolvemos un "Observable" con datos mínimos
        return of({
          coverUrl, 
          description
        });
      }),

      // Por último, "catchError()" maneja los errores.
      // Si hubiera algún fallo, el flujo del "Observable" no se rompería, sino que devolvería un objeto por defecto
      catchError(() => of({
        coverUrl: 'zanon/placeholder-cover.png',
        description: 'Descripción no disponible'
      }))
    );
  }
}