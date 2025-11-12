import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { AnimalExtinto, RespuestaApi } from '../model/animal-interfaz';

@Injectable({
  providedIn: 'root'
})
export class ServicioAnimalesExtintos {
  private readonly urlApi = 'https://extinct-api.herokuapp.com/api/v1/animal';
    private readonly http = inject(HttpClient);

  constructor() {}

  obtenerAnimalAleatorio(imagenRequerida: boolean = true): Observable<AnimalExtinto | null> {
    const url = `${this.urlApi}/?imageRequired=${imagenRequerida}`;
    return this.http.get<RespuestaApi>(url).pipe(
      map(respuesta => respuesta.data && respuesta.data.length > 0 ? respuesta.data[0] : null),
      catchError(error => {
        console.error('Error al obtener animal aleatorio:', error);
        return of(null);
      })
    );
  }

  obtenerAnimales(cantidad: number): Observable<AnimalExtinto[]> {
    const cantidadValida = Math.max(1, Math.min(804, cantidad));
    const url = `${this.urlApi}/${cantidadValida}`;
    
    return this.http.get<RespuestaApi>(url).pipe(
      map(respuesta => respuesta.data || []),
      catchError(error => {
        console.error(`Error al obtener ${cantidadValida} animales:`, error);
        return of([]);
      })
    );
  }

  filtrarAnimalesPorNombre(animales: AnimalExtinto[], terminoBusqueda: string): AnimalExtinto[] {
    if (!terminoBusqueda || terminoBusqueda.trim() === '') {
      return animales;
    }
    
    const termino = terminoBusqueda.toLowerCase().trim();
    return animales.filter(animal => 
      animal.commonName.toLowerCase().includes(termino) || 
      animal.binomialName.toLowerCase().includes(termino)
    );
  }

  filtrarAnimalesPorUbicacion(animales: AnimalExtinto[], ubicacion: string): AnimalExtinto[] {
    if (!ubicacion || ubicacion.trim() === '') {
      return animales;
    }
    
    const termino = ubicacion.toLowerCase().trim();
    return animales.filter(animal => 
      animal.location.toLowerCase().includes(termino)
    );
  }
}
