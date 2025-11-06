import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, retry, shareReplay, throwError } from 'rxjs';
import { Character, CharacterFilter, House, AppEvent, EventType } from '../model';

/**
 * Servicio singleton para la gestión de datos de Game of Thrones
 * Implementa patrones de diseño: Singleton, Observer
 * Utiliza RxJS para comunicación asíncrona
 */
@Injectable({
  providedIn: 'root'
})
export class ThroneService {
  private readonly http = inject(HttpClient);
  
  // Configuración de la API
  private readonly API_BASE_URL = 'https://thronesapi.com/api/v2';
  private readonly MAX_RETRIES = 3;
  
  // Subjects para estado global (patrón Observer)
  private selectedCharacterSubject = new BehaviorSubject<Character | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  private eventsSubject = new BehaviorSubject<AppEvent[]>([]);
  
  // Observables públicos
  public selectedCharacter$ = this.selectedCharacterSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();
  public events$ = this.eventsSubject.asObservable();
  
  // Cache para optimizar rendimiento
  private charactersCache$ = this.getAllCharacters().pipe(
    shareReplay(1)
  );
  
  /**
   * Obtiene todos los personajes de la API
   * Implementa retry automático y manejo de errores
   */
  getAllCharacters(): Observable<Character[]> {
    this.setLoading(true);
    
    return this.http.get<Character[]>(`${this.API_BASE_URL}/Characters`).pipe(
      retry(this.MAX_RETRIES),
      map(characters => this.normalizeCharacters(characters)),
      catchError(this.handleError.bind(this)),
      map(characters => {
        this.setLoading(false);
        this.clearError();
        this.addEvent(EventType.SEARCH_PERFORMED, { count: characters.length });
        return characters;
      })
    );
  }
  
  /**
   * Obtiene un personaje específico por ID
   */
  getCharacterById(id: number): Observable<Character | undefined> {
    return this.charactersCache$.pipe(
      map(characters => characters.find(char => char.id === id)),
      map(character => {
        if (character) {
          this.setSelectedCharacter(character);
          this.addEvent(EventType.CHARACTER_SELECTED, { characterId: id });
        }
        return character;
      })
    );
  }
  
  /**
   * Busca personajes aplicando filtros
   * Implementa búsqueda local para mejor rendimiento
   */
  searchCharacters(filter: CharacterFilter): Observable<Character[]> {
    return this.charactersCache$.pipe(
      map(characters => this.filterCharacters(characters, filter)),
      map(filtered => {
        this.addEvent(EventType.FILTER_APPLIED, filter);
        return filtered;
      })
    );
  }
  
  /**
   * Obtiene personajes de una familia específica
   */
  getCharactersByFamily(family: string): Observable<Character[]> {
    return this.searchCharacters({ family });
  }
  
  /**
   * Obtiene todas las familias únicas
   */
  getAllFamilies(): Observable<string[]> {
    return this.charactersCache$.pipe(
      map(characters => [...new Set(characters.map(char => char.family).filter(f => f))])
    );
  }
  
  /**
   * Métodos para gestión de estado
   */
  setSelectedCharacter(character: Character | null): void {
    this.selectedCharacterSubject.next(character);
  }
  
  /**
   * Obtiene el personaje seleccionado actualmente
   */
  getSelectedCharacter(): Character | null {
    return this.selectedCharacterSubject.value;
  }
  
  setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }
  
  setError(error: string | null): void {
    this.errorSubject.next(error);
    if (error) {
      this.addEvent(EventType.ERROR_OCCURRED, { message: error });
    }
  }
  
  clearError(): void {
    this.setError(null);
  }
  
  /**
   * Añade un evento al historial
   */
  private addEvent(type: EventType, payload: any): void {
    const currentEvents = this.eventsSubject.value;
    const newEvent: AppEvent = {
      type,
      payload,
      timestamp: new Date()
    };
    
    // Mantener solo los últimos 100 eventos
    const updatedEvents = [newEvent, ...currentEvents].slice(0, 100);
    this.eventsSubject.next(updatedEvents);
  }
  
  /**
   * Normaliza los datos de personajes de la API
   */
  private normalizeCharacters(characters: any[]): Character[] {
    return characters.map(char => ({
      id: char.id || 0,
      firstName: char.firstName || '',
      lastName: char.lastName || '',
      fullName: char.fullName || `${char.firstName} ${char.lastName}`.trim(),
      title: char.title || '',
      family: char.family || '',
      image: char.image || '',
      imageUrl: char.imageUrl || char.image || ''
    }));
  }
  
  /**
   * Aplica filtros a la lista de personajes
   */
  private filterCharacters(characters: Character[], filter: CharacterFilter): Character[] {
    return characters.filter(character => {
      const matchesName = !filter.name || 
        character.fullName.toLowerCase().includes(filter.name.toLowerCase()) ||
        character.firstName.toLowerCase().includes(filter.name.toLowerCase()) ||
        character.lastName.toLowerCase().includes(filter.name.toLowerCase());
        
      const matchesFamily = !filter.family || 
        character.family.toLowerCase().includes(filter.family.toLowerCase());
        
      const matchesTitle = !filter.title || 
        character.title.toLowerCase().includes(filter.title.toLowerCase());
        
      return matchesName && matchesFamily && matchesTitle;
    });
  }
  
  /**
   * Maneja errores de HTTP de forma centralizada
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    this.setLoading(false);
    
    let errorMessage = 'Error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error ${error.status}: ${error.message}`;
    }
    
    this.setError(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}