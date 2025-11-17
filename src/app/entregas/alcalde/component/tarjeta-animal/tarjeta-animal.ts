import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { NgOptimizedImage } from '@angular/common';
import { AnimalExtinto } from '../../model/animal-interfaz';

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
  animal = input.required<AnimalExtinto>();
  
  verDetalles = output<AnimalExtinto>();

  alVerDetalles(): void {
    this.verDetalles.emit(this.animal());
  }

  obtenerNombreParaMostrar(): string {
    const datosAnimal = this.animal();
    return datosAnimal.commonName || datosAnimal.binomialName;
  }

  tieneImagen(): boolean {
    const datosAnimal = this.animal();
    return !!datosAnimal.imageSrc && datosAnimal.imageSrc.trim() !== '';
  }
}
