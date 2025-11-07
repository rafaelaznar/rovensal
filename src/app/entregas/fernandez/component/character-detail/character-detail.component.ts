import { Component, input, output, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../model';

/**
 * Componente no enrutado para mostrar detalles de un personaje
 * Demuestra: inputs/outputs, comunicación bidireccional, eventos
 */
@Component({
  selector: 'app-character-detail',
  imports: [CommonModule],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterDetailComponent {
  
  // Input del personaje seleccionado
  character = input<Character | null>(null);
  
  // Outputs para comunicación con el padre
  closeRequested = output<void>();
  
  // Estado interno
  imageLoaded = signal<boolean>(false);
  imageError = signal<boolean>(false);
  
  /**
   * Cierra el detalle
   */
  onClose(): void {
    this.closeRequested.emit();
  }
  
  /**
   * Maneja la carga exitosa de imagen
   */
  onImageLoad(): void {
    this.imageLoaded.set(true);
    this.imageError.set(false);
  }
  
  /**
   * Maneja error de carga de imagen
   */
  onImageError(): void {
    this.imageLoaded.set(false);
    this.imageError.set(true);
  }
  
  /**
   * Obtiene la imagen del personaje
   */
  getCharacterImage(): string {
    const char = this.character();
    if (!char) return '';
    
    return char.imageUrl || char.image || this.getDefaultImage();
  }
  
  /**
   * Imagen por defecto en SVG
   */
  private getDefaultImage(): string {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzNiNGE2MCIvPjx0ZXh0IHg9IjE1MCIgeT0iMTYwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TaW4gSW1hZ2VuPC90ZXh0Pjwvc3ZnPg==';
  }
  
  /**
   * Formatea el nombre completo con título
   */
  getFormattedName(): string {
    const char = this.character();
    if (!char) return '';
    
    let name = char.fullName || `${char.firstName} ${char.lastName}`.trim();
    if (char.title) {
      name = `${char.title}, ${name}`;
    }
    
    return name;
  }
  
  /**
   * Obtiene información adicional del personaje
   */
  getCharacterInfo(): Array<{label: string, value: string}> {
    const char = this.character();
    if (!char) return [];
    
    const info = [];
    
    if (char.firstName) {
      info.push({label: 'Nombre', value: char.firstName});
    }
    
    if (char.lastName) {
      info.push({label: 'Apellido', value: char.lastName});
    }
    
    if (char.family) {
      info.push({label: 'Casa', value: char.family});
    }
    
    if (char.title) {
      info.push({label: 'Título', value: char.title});
    }
    
    info.push({label: 'ID', value: char.id.toString()});
    
    return info;
  }
}