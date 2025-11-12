import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character, CharacterResponse } from '../model/characterInterface';
import { Location, LocationResponse } from '../model/locationInterface';

// Servicio singleton para gestionar la API de Rick and Morty
@Injectable({
  providedIn: 'root'
})
export class RickMortyService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api';
  private http = inject(HttpClient);
  
  // Estado global de la aplicación mediante signals
  selectedCharacter = signal<Character | null>(null);
  currentPage = signal<number>(1);
  characters = signal<Character[]>([]);
  totalPages = signal<number>(1);
  loading = signal<boolean>(false);

  // Obtiene la lista de personajes con paginación
  getCharacters(page: number = 1): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(`${this.baseUrl}/character?page=${page}`);
  }

  // Obtiene un personaje específico por su ID
  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/character/${id}`);
  }

  // Realiza búsqueda de personajes por nombre
  searchCharacters(name: string): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(`${this.baseUrl}/character?name=${name}`);
  }

  // Filtra personajes por características específicas
  filterCharacters(status?: string, species?: string, gender?: string): Observable<CharacterResponse> {
    let url = `${this.baseUrl}/character?`;
    const params: string[] = [];
    
    if (status) params.push(`status=${status}`);
    if (species) params.push(`species=${species}`);
    if (gender) params.push(`gender=${gender}`);
    
    return this.http.get<CharacterResponse>(url + params.join('&'));
  }

  // Busca personajes con múltiples filtros y actualiza el estado global
  searchWithFilters(name?: string, status?: string, species?: string, gender?: string, page: number = 1): void {
    this.loading.set(true);
    let url = `${this.baseUrl}/character?page=${page}`;
    const params: string[] = [];
    
    if (name) params.push(`name=${name}`);
    if (status) params.push(`status=${status}`);
    if (species) params.push(`species=${species}`);
    if (gender) params.push(`gender=${gender}`);
    
    if (params.length > 0) {
      url += '&' + params.join('&');
    }
    
    this.http.get<CharacterResponse>(url).subscribe({
      next: (response: CharacterResponse) => {
        this.characters.set(response.results);
        this.currentPage.set(page);
        this.totalPages.set(response.info.pages);
        this.loading.set(false);
      },
      error: (error: any) => {
        console.error('Error searching characters:', error);
        this.characters.set([]);
        this.loading.set(false);
      }
    });
  }

  // Obtiene información de una ubicación específica por ID
  getLocation(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.baseUrl}/location/${id}`);
  }

  // Obtiene la lista paginada de ubicaciones
  getLocations(page: number = 1): Observable<LocationResponse> {
    return this.http.get<LocationResponse>(`${this.baseUrl}/location?page=${page}`);
  }

  // Selecciona un personaje y actualiza el estado global
  selectCharacter(character: Character): void {
    this.selectedCharacter.set(character);
  }

  // Limpia la selección del personaje actual
  clearSelection(): void {
    this.selectedCharacter.set(null);
  }
}
