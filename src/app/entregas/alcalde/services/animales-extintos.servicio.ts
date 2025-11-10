import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { AnimalExtinto, RespuestaApi } from '../models/animal.interfaz';

/**
 * Servicio singleton para gestionar las peticiones a la API de animales extintos
 * Utiliza HttpClient para realizar peticiones asíncronas y RxJS para manejar observables
 * @Injectable providedIn: 'root' lo hace singleton en toda la aplicación
 */
@Injectable({
  providedIn: 'root'
})
export class ServicioAnimalesExtintos {
  /** URL base de la API de animales extintos */
  private readonly urlApi = 'https://extinct-api.herokuapp.com/api/v1/animal';
  
  /** Instancia de HttpClient inyectada mediante inject() */
  private readonly http = inject(HttpClient);

  /**
   * Constructor del servicio
   * Se mantiene vacío ya que usamos inject() para la inyección de dependencias
   */
  constructor() {}

  /**
   * Obtiene un animal extinto aleatorio
   * @param imagenRequerida - Si se requiere que el animal tenga imagen (por defecto true)
   * @returns Observable con un animal extinto o null si hay error
   */
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

  /**
   * Obtiene un número específico de animales extintos
   * @param cantidad - Número de animales a obtener (entre 1 y 804)
   * @returns Observable con un array de animales extintos
   */
  obtenerAnimales(cantidad: number): Observable<AnimalExtinto[]> {
    // Validación: el número debe estar entre 1 y 804
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

  /**
   * Filtra animales por nombre (común o binomial)
   * @param animales - Array de animales a filtrar
   * @param terminoBusqueda - Término de búsqueda
   * @returns Array filtrado de animales
   */
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

  /**
   * Filtra animales por ubicación
   * @param animales - Array de animales a filtrar
   * @param ubicacion - Ubicación a buscar
   * @returns Array filtrado de animales
   */
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
