import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoriteService } from '../../service/favorite.service';
import { ThroneService } from '../../service';
import { Character } from '../../model';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';

@Component({
  selector: 'app-favorites-page',
  imports: [CommonModule, RouterLink, CharacterDetailComponent],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesPageComponent {
  
  private favoriteService = inject(FavoriteService);
  private throneService = inject(ThroneService);
  
  selectedFamily = signal<string>('');
  viewMode = signal<'grid' | 'list'>('grid');
  selectedCharacterForDetail = signal<Character | null>(null);
  sortBy = signal<'name' | 'family' | 'dateAdded'>('name');
  
  favorites = this.favoriteService.favorites$;
  favoritesCount = this.favoriteService.favoritesCount;
  favoritesByFamily = this.favoriteService.favoritesByFamily;
  favoriteStats = computed(() => this.favoriteService.getFavoriteStats());
  
  filteredAndSortedFavorites = computed(() => {
    let favorites = this.favorites();
    
    const selectedFamily = this.selectedFamily();
    if (selectedFamily) {
      favorites = favorites.filter(char => char.family === selectedFamily);
    }
    
    const sortBy = this.sortBy();
    return favorites.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.fullName.localeCompare(b.fullName);
        case 'family':
          return a.family.localeCompare(b.family);
        case 'dateAdded':
          // Para simplificar, ordenamos por ID (los más recientes tienden a tener ID mayor)
          return b.id - a.id;
        default:
          return 0;
      }
    });
  });
  
  // Computed para obtener familias únicas de favoritos
  uniqueFamilies = computed(() => {
    const favorites = this.favorites();
    const families = favorites.map(char => char.family).filter(f => f);
    return [...new Set(families)].sort();
  });
  
  // Computed para mostrar mensaje apropiado
  displayMessage = computed(() => {
    const count = this.favoritesCount();
    const selectedFamily = this.selectedFamily();
    
    if (count === 0) {
      return {
        title: 'Sin favoritos aún',
        subtitle: 'Comienza añadiendo personajes a tus favoritos desde la lista principal',
        showAddButton: true
      };
    }
    
    if (selectedFamily && this.filteredAndSortedFavorites().length === 0) {
      return {
        title: `Sin favoritos en ${selectedFamily}`,
        subtitle: 'Prueba seleccionando otra familia o limpia el filtro',
        showAddButton: false
      };
    }
    
    return null;
  });
  
  constructor() {
    // Suscripción a eventos de favoritos para feedback
    this.favoriteService.favoriteEvents$.subscribe(event => {
      if (event) {
        // Aquí podrías mostrar notificaciones
        console.log(`Personaje ${event.type === 'added' ? 'añadido' : 'removido'}: ${event.character.fullName}`);
      }
    });
  }
  
  // Maneja la selección de un personaje
  onCharacterSelected(character: Character): void {
    this.selectedCharacterForDetail.set(character);
    this.throneService.setSelectedCharacter(character);
  }
  
  // Cierra el detalle del personaje
  onCloseDetail(): void {
    this.selectedCharacterForDetail.set(null);
  }
  
  onFamilyFilterChange(family: string): void {
    this.selectedFamily.set(family);
  }
  
  onFamilySelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.onFamilyFilterChange(target.value);
    }
  }
  
  getFamilyKeys(): string[] {
    return Object.keys(this.favoritesByFamily());
  }
  
  clearFamilyFilter(): void {
    this.selectedFamily.set('');
  }
  
  toggleViewMode(): void {
    this.viewMode.set(this.viewMode() === 'grid' ? 'list' : 'grid');
  }
  
  onSortChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortBy.set(target.value as 'name' | 'family' | 'dateAdded');
  }
  
  setSortBy(sortType: 'name' | 'family' | 'dateAdded'): void {
    this.sortBy.set(sortType);
  }
  
  removeFavorite(character: Character, event: Event): void {
    event.stopPropagation(); // Evitar que se active la selección
    this.favoriteService.removeFavorite(character.id);
  }
  
  // Limpia todos los favoritos con confirmación
  clearAllFavorites(): void {
    if (confirm('¿Estás seguro de que quieres eliminar todos los favoritos?')) {
      this.favoriteService.clearFavorites();
    }
  }
  
  exportFavorites(): void {
    const jsonData = this.favoriteService.exportFavoritesAsJson();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `fernandez-favorites-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    window.URL.revokeObjectURL(url);
  }
  
  importFavorites(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const result = this.favoriteService.importFavoritesFromJson(content);
        
        if (result.success) {
          alert(`✅ ${result.message}`);
        } else {
          alert(`❌ Error: ${result.message}`);
        }
      };
      reader.readAsText(file);
    }
    
    // Limpiar el input
    input.value = '';
  }
  
  getCharacterImage(character: Character): string {
    return character.imageUrl || character.image || this.getDefaultImage();
  }
  
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = this.getDefaultImage();
  }
  
  private getDefaultImage(): string {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzNiNGE2MCIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+';
  }
}