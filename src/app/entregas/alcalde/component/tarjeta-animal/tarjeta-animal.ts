import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { NgOptimizedImage } from '@angular/common';
import { AnimalExtinto } from '../../models/animal.interfaz';

/**
 * Componente no enrutado que muestra una tarjeta con información básica de un animal extinto
 * Recibe datos del padre mediante input() y emite eventos mediante output()
 * Utiliza OnPush para optimizar el rendimiento
 */
@Component({
  selector: 'app-tarjeta-animal',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    NgOptimizedImage
  ],
  templateUrl: './tarjeta-animal.html',
  styleUrl: './tarjeta-animal.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TarjetaAnimal {
  /** Input signal que recibe el animal desde el componente padre */
  animal = input.required<AnimalExtinto>();
  
  /** Output signal que emite cuando se hace clic en "Ver más" */
  verDetalles = output<AnimalExtinto>();

  /**
   * Método que se ejecuta cuando el usuario hace clic en el botón "Ver más"
   * Emite el evento con el animal seleccionado
   */
  alVerDetalles(): void {
    this.verDetalles.emit(this.animal());
  }

  /**
   * Obtiene el nombre a mostrar (común o binomial)
   * @returns El nombre común si existe, sino el binomial
   */
  obtenerNombreParaMostrar(): string {
    const datosAnimal = this.animal();
    return datosAnimal.commonName || datosAnimal.binomialName;
  }

  /**
   * Verifica si la imagen está disponible
   * @returns true si hay una URL de imagen válida
   */
  tieneImagen(): boolean {
    const datosAnimal = this.animal();
    return !!datosAnimal.imageSrc && datosAnimal.imageSrc.trim() !== '';
  }
}
