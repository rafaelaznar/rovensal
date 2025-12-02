import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Character } from '../model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  
  private STORAGE_KEY = 'fernandez-favorites';
  
  private favoritesSignal = signal<Character[]>(this.loadFavoritesFromStorage());
  private favoriteEventsSubject = new BehaviorSubject<{type: 'added' | 'removed', character: Character} | null>(null);
  
  public favorites$ = this.favoritesSignal.asReadonly();
  public favoriteEvents$ = this.favoriteEventsSubject.asObservable();
  
  public favoritesCount = computed(() => this.favoritesSignal().length);
  public favoriteIds = computed(() => new Set(this.favoritesSignal().map(char => char.id)));
  
  public favoritesByFamily = computed(() => {
    const favorites = this.favoritesSignal();
    const byFamily: { [key: string]: Character[] } = {};
    
    favorites.forEach(char => {
      const family = char.family || 'No House';
      if (!byFamily[family]) {
        byFamily[family] = [];
      }
      byFamily[family].push(char);
    });
    
    return byFamily;
  });
  
  getFavorites(): Character[] {
    return this.favoritesSignal();
  }
  
  isFavorite(characterId: number): boolean {
    return this.favoriteIds().has(characterId);
  }
  
  addFavorite(character: Character): boolean {
    if (this.isFavorite(character.id)) {
      return false;
    }
    
    const currentFavorites = this.favoritesSignal();
    const newFavorites = [...currentFavorites, character];
    
    this.favoritesSignal.set(newFavorites);
    this.saveFavoritesToStorage(newFavorites);
    
    this.favoriteEventsSubject.next({ type: 'added', character });
    
    return true;
  }
  
  removeFavorite(characterId: number): boolean {
    const currentFavorites = this.favoritesSignal();
    const characterToRemove = currentFavorites.find(char => char.id === characterId);
    
    if (!characterToRemove) {
      return false;
    }
    
    const newFavorites = currentFavorites.filter(char => char.id !== characterId);
    
    this.favoritesSignal.set(newFavorites);
    this.saveFavoritesToStorage(newFavorites);
    
    this.favoriteEventsSubject.next({ type: 'removed', character: characterToRemove });
    
    return true;
  }
  
  toggleFavorite(character: Character): boolean {
    if (this.isFavorite(character.id)) {
      return this.removeFavorite(character.id);
    } else {
      return this.addFavorite(character);
    }
  }
  
  clearFavorites(): void {
    this.favoritesSignal.set([]);
    this.saveFavoritesToStorage([]);
  }
  
  getFavoritesByFamily(family: string): Character[] {
    return this.favoritesSignal().filter(char => char.family === family);
  }
  

  getFavoriteStats() {
    const favorites = this.favoritesSignal();
    const familyCount: { [key: string]: number } = {};
    
    favorites.forEach(char => {
      const family = char.family || 'No House';
      familyCount[family] = (familyCount[family] || 0) + 1;
    });
    
    const sortedFamilies = Object.entries(familyCount)
      .sort((a, b) => b[1] - a[1])
      .map(([family, count]) => ({ family, count }));
    
    return {
      total: favorites.length,
      byFamily: familyCount,
      topFamilies: sortedFamilies.slice(0, 5),
      hasAnyFavorites: favorites.length > 0
    };
  }
  

  exportFavoritesAsJson(): string {
    const favorites = this.favoritesSignal();
    const exportData = {
      exportDate: new Date().toISOString(),
      count: favorites.length,
      favorites: favorites
    };
    
    return JSON.stringify(exportData, null, 2);
  }
  
  importFavoritesFromJson(jsonString: string): { success: boolean, message: string, count?: number } {
    try {
      const data = JSON.parse(jsonString);
      
      if (!data.favorites || !Array.isArray(data.favorites)) {
        return { success: false, message: 'Formato de JSON inválido' };
      }
      
      const validCharacters = data.favorites.filter((char: any) => 
        char.id && typeof char.id === 'number' &&
        char.fullName && typeof char.fullName === 'string'
      );
      
      if (validCharacters.length === 0) {
        return { success: false, message: 'No valid characters found' };
      }
      
      const currentFavorites = this.favoritesSignal();
      const currentIds = new Set(currentFavorites.map(char => char.id));
      
      const newCharacters = validCharacters.filter((char: Character) => !currentIds.has(char.id));
      const mergedFavorites = [...currentFavorites, ...newCharacters];
      
      this.favoritesSignal.set(mergedFavorites);
      this.saveFavoritesToStorage(mergedFavorites);
      
      return { 
        success: true, 
        message: `Imported ${newCharacters.length} new characters`, 
        count: newCharacters.length 
      };
      
    } catch (error) {
      return { success: false, message: 'Invalid JSON' };
    }
  }
  
  private loadFavoritesFromStorage(): Character[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }
  
  private saveFavoritesToStorage(favorites: Character[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to storage', error);
    }
  }
}