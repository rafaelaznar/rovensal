import { Component, inject, signal, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThroneService } from '../../service';
import { Character } from '../../model';

/**
 * Componente no enrutado para mostrar lista de personajes
 * Demuestra: comunicación padre-hijo, inputs/outputs, eventos
 */
@Component({
  selector: 'app-character-list',
  imports: [CommonModule],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterListComponent {
  
  // Inputs del componente padre
  characters = input<Character[]>([]);
  loading = input<boolean>(false);
  title = input<string>('Personajes');
  showFamilyFilter = input<boolean>(true);
  
  // Outputs hacia el componente padre
  characterSelected = output<Character>();
  familyFilterChanged = output<string>();
  
  // Estado interno del componente
  selectedFamily = signal<string>('');
  
  private throneService = inject(ThroneService);
  
  /**
   * Obtiene el personaje seleccionado actualmente
   */
  getSelectedCharacter(): Character | null {
    return this.throneService.getSelectedCharacter();
  }
  
  /**
   * Maneja la selección de un personaje
   * Emite evento hacia el padre y actualiza servicio
   */
  onCharacterSelect(character: Character): void {
    this.characterSelected.emit(character);
    this.throneService.setSelectedCharacter(character);
  }
  
  /**
   * Maneja el cambio de filtro de familia
   */
  onFamilyFilterChange(family: string): void {
    this.selectedFamily.set(family);
    this.familyFilterChanged.emit(family);
  }
  
  /**
   * Maneja el evento de cambio en el select de familia
   */
  onFamilySelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.onFamilyFilterChange(target.value);
    }
  }
  
  /**
   * Obtiene las familias únicas de los personajes actuales
   */
  getUniqueFamilies(): string[] {
    const families = this.characters()
      .map(char => char.family)
      .filter(family => family && family.trim())
      .filter((family, index, array) => array.indexOf(family) === index)
      .sort();
    
    return families;
  }
  
  /**
   * Filtra personajes por familia seleccionada
   */
  getFilteredCharacters(): Character[] {
    const selectedFamily = this.selectedFamily();
    if (!selectedFamily) {
      return this.characters();
    }
    
    return this.characters().filter(char => 
      char.family.toLowerCase().includes(selectedFamily.toLowerCase())
    );
  }
  
  /**
   * Obtiene la imagen del personaje o una por defecto
   */
  getCharacterImage(character: Character): string {
    return character.imageUrl || character.image || '/assets/default-character.jpg';
  }
  
  /**
   * Maneja errores de carga de imágenes
   */
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzNiNGE2MCIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+';
  }
}