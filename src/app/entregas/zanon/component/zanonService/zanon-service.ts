import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Libro, LibroGoogleBooks } from '../zanonModel/zanonInterface';
import { map, Observable } from 'rxjs';

// Esta interfaz define la respuesta completa de la API de Google Books
interface librosResponse {
  items: LibroGoogleBooks[];
}

@Injectable({
  providedIn: 'root'
})
export class ZanonService {

  constructor(private oHttpClient: HttpClient) {

  }

  getAll(): Observable<Libro[]> {

    // oHttpClient.get<librosResponse> usa esa interfaz para tipar la respuesta
    return this.oHttpClient.get<librosResponse>('https://www.googleapis.com/books/v1/volumes?q=stephen+king').pipe (

      // "map()" obtiene el array "items" y luego transforma cada uno de ellos
      map(response => response.items),
      map(items => items.map(item => ({

        // Se extraen y transforman las propiedades anidadas de "volumeInfo" al modelo "Libro"
        thumbnail: item.volumeInfo.imageLinks?.thumbnail,
        title: item.volumeInfo.title,
        publishedDate: item.volumeInfo.publishedDate,
        publisher: item.volumeInfo.publisher,
        categories: item.volumeInfo.categories?.join(', '),
        pageCount: item.volumeInfo.pageCount || 0,
        description: item.volumeInfo.description,
      } as Libro )))
    );
  }
}