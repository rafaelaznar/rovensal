import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { ApiResponse, ExtinctAnimal } from '../models/animal.interface';

/**
 * Servicio singleton para gestionar las peticiones a la API de animales extintos
 * Utiliza HttpClient para realizar peticiones asíncronas y RxJS para manejar observables
 * @Injectable providedIn: 'root' lo hace singleton en toda la aplicación
 */
@Injectable({
  providedIn: 'root'
})
export class ExtinctAnimalsService {
  /** URL base de la API de animales extintos */
  private readonly apiUrl = 'https://extinct-api.herokuapp.com/api/v1/animal';
  
  /** Instancia de HttpClient inyectada mediante inject() */
  private readonly http = inject(HttpClient);

  /**
   * Constructor del servicio
   * Se mantiene vacío ya que usamos inject() para la inyección de dependencias
   */
  constructor() {}

  /**
   * Obtiene un animal extinto aleatorio
   * @param imageRequired - Si se requiere que el animal tenga imagen (por defecto true)
   * @returns Observable con un animal extinto o null si hay error
   */
  getRandomAnimal(imageRequired: boolean = true): Observable<ExtinctAnimal | null> {
    const url = `${this.apiUrl}/?imageRequired=${imageRequired}`;
    return this.http.get<ApiResponse>(url).pipe(
      map(response => response.data && response.data.length > 0 ? response.data[0] : null),
      catchError(error => {
        console.error('Error al obtener animal aleatorio:', error);
        return of(null);
      })
    );
  }

  /**
   * Obtiene un número específico de animales extintos
   * @param count - Número de animales a obtener (entre 1 y 804)
   * @returns Observable con un array de animales extintos
   */
  getAnimals(count: number): Observable<ExtinctAnimal[]> {
    // Validación: el número debe estar entre 1 y 804
    const validCount = Math.max(1, Math.min(804, count));
    const url = `${this.apiUrl}/${validCount}`;
    
    return this.http.get<ApiResponse>(url).pipe(
      map(response => response.data || []),
      catchError(error => {
        console.error(`Error al obtener ${validCount} animales:`, error);
        return of([]);
      })
    );
  }

  /**
   * Filtra animales por nombre (común o binomial)
   * @param animals - Array de animales a filtrar
   * @param searchTerm - Término de búsqueda
   * @returns Array filtrado de animales
   */
  filterAnimalsByName(animals: ExtinctAnimal[], searchTerm: string): ExtinctAnimal[] {
    if (!searchTerm || searchTerm.trim() === '') {
      return animals;
    }
    
    const term = searchTerm.toLowerCase().trim();
    return animals.filter(animal => 
      animal.commonName.toLowerCase().includes(term) || 
      animal.binomialName.toLowerCase().includes(term)
    );
  }

  /**
   * Filtra animales por ubicación
   * @param animals - Array de animales a filtrar
   * @param location - Ubicación a buscar
   * @returns Array filtrado de animales
   */
  filterAnimalsByLocation(animals: ExtinctAnimal[], location: string): ExtinctAnimal[] {
    if (!location || location.trim() === '') {
      return animals;
    }
    
    const term = location.toLowerCase().trim();
    return animals.filter(animal => 
      animal.location.toLowerCase().includes(term)
    );
  }
}
