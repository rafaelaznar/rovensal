import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, retry, shareReplay, throwError } from 'rxjs';
import { Character, CharacterFilter, House, AppEvent, EventType } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ThroneService {
  private readonly http = inject(HttpClient);
  
  private readonly API_BASE_URL = 'https://thronesapi.com/api/v2';
  private readonly MAX_RETRIES = 3;
  
  private selectedCharacterSubject = new BehaviorSubject<Character | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  private eventsSubject = new BehaviorSubject<AppEvent[]>([]);
  
  public selectedCharacter$ = this.selectedCharacterSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable(); 
  public events$ = this.eventsSubject.asObservable();
  
  private charactersCache$ = this.getAllCharacters().pipe(
    shareReplay(1)
  );
  
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
  
  searchCharacters(filter: CharacterFilter): Observable<Character[]> {
    return this.charactersCache$.pipe(
      map(characters => this.filterCharacters(characters, filter)),
      map(filtered => {
        this.addEvent(EventType.FILTER_APPLIED, filter);
        return filtered;
      })
    );
  }
  
  getCharactersByFamily(family: string): Observable<Character[]> {
    return this.searchCharacters({ family });
  }
  
  getAllFamilies(): Observable<string[]> {
    return this.charactersCache$.pipe(
      map(characters => {
        const families = characters
          .map(char => char.family)
          .filter(f => f && f.trim() !== '')
          .map(f => f.trim())
          .filter(f => this.isValidFamily(f));
        
        const uniqueFamilies = [...new Set(families)];
        
        const houses: string[] = [];
        const organizations: string[] = [];
        const individuals: string[] = [];
        
        uniqueFamilies.forEach(family => {
          if (family.startsWith('House ')) {
            houses.push(family);
          } else if (['Night\'s Watch', 'Free Folk', 'Dothraki', 'Lorath'].includes(family)) {
            organizations.push(family);
          } else {
            individuals.push(family);
          }
        });
        
        houses.sort();
        organizations.sort();
        individuals.sort();
        
        return [...houses, ...organizations, ...individuals];
      })
    );
  }

  private isValidFamily(family: string): boolean {
    const invalidFamilies = [
      'unknown',
      'unkown',
      'null',
      'undefined',
      'none',
      'no house',
      'no family',
      '',
      ' '
    ];
    
    return !invalidFamilies.includes(family.toLowerCase().trim());
  }
  
  setSelectedCharacter(character: Character | null): void {
    this.selectedCharacterSubject.next(character);
  }
  
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
  
  // Normaliza los datos de personajes de la API y elimina duplicados
  private normalizeCharacters(characters: any[]): Character[] {
    const normalized = characters.map(char => ({
      id: char.id || 0,
      firstName: char.firstName || '',
      lastName: char.lastName || '',
      fullName: char.fullName || `${char.firstName} ${char.lastName}`.trim(),
      title: char.title || '',
      family: this.normalizeFamilyName(char.family || ''),
      image: char.image || '',
      imageUrl: char.imageUrl || char.image || ''
    }));

    // Eliminar duplicados basándose en el nombre completo
    // En caso de duplicados, mantener el que tenga más información (título más específico)
    const uniqueCharacters = normalized.reduce((acc: Character[], current: Character) => {
      const existing = acc.find(char => 
        char.fullName.toLowerCase() === current.fullName.toLowerCase() && 
        char.family.toLowerCase() === current.family.toLowerCase()
      );
      
      if (!existing) {
        acc.push(current);
      } else {
        // Si encontramos un duplicado, mantener el que tenga mejor información
        // Priorizar el que tenga título más específico o ID menor (suele ser el original)
        if (this.shouldReplaceCharacter(existing, current)) {
          const index = acc.indexOf(existing);
          acc[index] = current;
        }
      }
      
      return acc;
    }, []);

    return uniqueCharacters;
  }

  // Normaliza nombres de familias para corregir errores tipográficos comunes
  private normalizeFamilyName(family: string): string {
    if (!family) return '';
    
    const cleanFamily = family.toLowerCase().trim();
    
    // Filtrar entradas no válidas desde el inicio
    const invalidEntries = ['unknown', 'unkown', 'null', 'undefined', 'none', 'no house', 'no family', ''];
    if (invalidEntries.includes(cleanFamily)) {
      return '';
    }
    
    // Diccionario completo de correcciones y normalizaciones
    const familyCorrections: { [key: string]: string } = {
      // Variaciones de Lannister
      'lannister': 'House Lannister',
      'house lannister': 'House Lannister',
      'house lanister': 'House Lannister',
      'lanister': 'House Lannister',
      
      // Variaciones de Stark
      'stark': 'House Stark',
      'house stark': 'House Stark',
      
      // Variaciones de Baratheon
      'baratheon': 'House Baratheon',
      'house baratheon': 'House Baratheon',
      
      // Variaciones de Targaryen
      'targaryen': 'House Targaryen',
      'house targaryen': 'House Targaryen',
      'house tarly': 'House Tarly',
      'tarly': 'House Tarly',
      
      // Variaciones de Greyjoy
      'greyjoy': 'House Greyjoy',
      'house greyjoy': 'House Greyjoy',
      
      // Otras casas principales
      'tyrell': 'House Tyrell',
      'house tyrell': 'House Tyrell',
      'arryn': 'House Arryn',
      'house arryn': 'House Arryn',
      'tully': 'House Tully',
      'house tully': 'House Tully',
      'martell': 'House Martell',
      'house martell': 'House Martell',
      
      // Casas menores
      'bolton': 'House Bolton',
      'house bolton': 'House Bolton',
      'frey': 'House Frey',
      'house frey': 'House Frey',
      'mormont': 'House Mormont',
      'house mormont': 'House Mormont',
      'clegane': 'House Clegane',
      'house clegane': 'House Clegane',
      'seaworth': 'House Seaworth',
      'house seaworth': 'House Seaworth',
      'baelish': 'House Baelish',
      'house baelish': 'House Baelish',
      
      // Organizaciones y grupos especiales
      'night\'s watch': 'Night\'s Watch',
      'nights watch': 'Night\'s Watch',
      'the night\'s watch': 'Night\'s Watch',
      'house night\'s watch': 'Night\'s Watch',
      'free folk': 'Free Folk',
      'wildling': 'Free Folk',
      'wildlings': 'Free Folk',
      
      // Nombres únicos o apellidos sin casa
      'bronn': 'Bronn',
      'lorath': 'Lorath',
      'lorathi': 'Lorath',
      'dothraki': 'Dothraki'
    };

    // Buscar corrección exacta
    if (familyCorrections[cleanFamily]) {
      return familyCorrections[cleanFamily];
    }
    
    // Si no hay corrección específica, aplicar reglas generales
    if (cleanFamily.startsWith('house ')) {

      return family
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    } else if (this.isValidHouseName(cleanFamily)) {

      const capitalizedName = family.charAt(0).toUpperCase() + family.slice(1).toLowerCase();
      return `House ${capitalizedName}`;
    } else {

      return family
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
  }

  // Determina si un nombre es un apellido válido para convertir en "House X"
  private isValidHouseName(name: string): boolean {
    const validHouseNames = [
      'stark', 'lannister', 'baratheon', 'targaryen', 'greyjoy', 'arryn',
      'tully', 'tyrell', 'martell', 'bolton', 'frey', 'mormont', 'clegane',
      'seaworth', 'baelish', 'tarly', 'umber', 'karstark', 'reed'
    ];
    
    return validHouseNames.includes(name.toLowerCase());
  }

  // Determina si un personaje debe reemplazar a otro duplicado
  // Criterios: título más específico, ID menor, o imagen disponible
  private shouldReplaceCharacter(existing: Character, candidate: Character): boolean {
    // Si el candidato tiene título "King" y el existente "Lord of the Seven Kingdoms", mantener "King" (más específico)
    if (candidate.title.toLowerCase().includes('king') && existing.title.toLowerCase().includes('lord')) {
      return true;
    }
    
    // Si el existente es "King" y el candidato "Lord", mantener el existente
    if (existing.title.toLowerCase().includes('king') && candidate.title.toLowerCase().includes('lord')) {
      return false;
    }
    
    // Si uno tiene imagen y el otro no, preferir el que tenga imagen
    if (candidate.imageUrl && !existing.imageUrl) {
      return true;
    }
    
    // Si ambos tienen título similar, preferir el ID menor (suele ser el original)
    return candidate.id < existing.id;
  }
  
  // Aplica filtros a la lista de personajes
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
  
  // Maneja errores de HTTP de forma centralizada
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