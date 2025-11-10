import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { NgOptimizedImage } from '@angular/common';
import { ExtinctAnimal } from '../../models/animal.interface';

/**
 * Componente no enrutado que muestra una tarjeta con información básica de un animal extinto
 * Recibe datos del padre mediante input() y emite eventos mediante output()
 * Utiliza OnPush para optimizar el rendimiento
 */
@Component({
  selector: 'app-animal-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    NgOptimizedImage
  ],
  templateUrl: './animal-card.html',
  styleUrl: './animal-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimalCardComponent {
  /** Input signal que recibe el animal desde el componente padre */
  animal = input.required<ExtinctAnimal>();
  
  /** Output signal que emite cuando se hace clic en "Ver más" */
  viewDetails = output<ExtinctAnimal>();

  /**
   * Método que se ejecuta cuando el usuario hace clic en el botón "Ver más"
   * Emite el evento con el animal seleccionado
   */
  onViewDetails(): void {
    this.viewDetails.emit(this.animal());
  }

  /**
   * Obtiene el nombre a mostrar (común o binomial)
   * @returns El nombre común si existe, sino el binomial
   */
  getDisplayName(): string {
    const animalData = this.animal();
    return animalData.commonName || animalData.binomialName;
  }

  /**
   * Verifica si la imagen está disponible
   * @returns true si hay una URL de imagen válida
   */
  hasImage(): boolean {
    const animalData = this.animal();
    return !!animalData.imageSrc && animalData.imageSrc.trim() !== '';
  }
}
