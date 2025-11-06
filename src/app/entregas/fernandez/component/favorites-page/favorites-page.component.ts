import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../model';
import { CharacterListComponent } from '../character-list/character-list.component';

/**
 * Página de favoritos - demuestra gestión de estado local
 */
@Component({
  selector: 'app-favorites-page',
  imports: [CommonModule, CharacterListComponent],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesPageComponent {
  
  // Signals para favoritos (simula localStorage)
  favorites = signal<Character[]>([]);
  
  constructor() {
    this.loadFavorites();
  }
  
  /**
   * Carga favoritos del localStorage
   */
  private loadFavorites(): void {
    try {
      const stored = localStorage.getItem('got-favorites');
      if (stored) {
        const favorites = JSON.parse(stored);
        this.favorites.set(favorites);
      }
    } catch (error) {
      console.error('Error cargando favoritos:', error);
    }
  }
  
  /**
   * Guarda favoritos en localStorage
   */
  private saveFavorites(): void {
    try {
      localStorage.setItem('got-favorites', JSON.stringify(this.favorites()));
    } catch (error) {
      console.error('Error guardando favoritos:', error);
    }
  }
  
  /**
   * Añade o quita un personaje de favoritos
   */
  toggleFavorite(character: Character): void {
    const current = this.favorites();
    const index = current.findIndex(fav => fav.id === character.id);
    
    if (index >= 0) {
      // Quitar de favoritos
      const updated = current.filter(fav => fav.id !== character.id);
      this.favorites.set(updated);
    } else {
      // Añadir a favoritos
      this.favorites.set([...current, character]);
    }
    
    this.saveFavorites();
  }
  
  /**
   * Limpia todos los favoritos
   */
  clearAllFavorites(): void {
    this.favorites.set([]);
    this.saveFavorites();
  }
  
  /**
   * Maneja la selección de personaje
   */
  onCharacterSelected(character: Character): void {
    console.log('Personaje seleccionado desde favoritos:', character.fullName);
  }
}