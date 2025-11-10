import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { NgOptimizedImage } from '@angular/common';
import { AnimalExtinto } from '../../models/animal.interfaz';

/**
 * Componente de diálogo (ventana emergente) que muestra información detallada de un animal
 * Recibe datos desde el componente padre mediante MAT_DIALOG_DATA
 * Permite comunicación bidireccional con el padre mediante MatDialogRef
 */
@Component({
  selector: 'app-dialogo-detalle-animal',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatChipsModule,
    NgOptimizedImage
  ],
  templateUrl: './dialogo-detalle-animal.html',
  styleUrl: './dialogo-detalle-animal.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogoDetalleAnimal {
  /** Datos del animal inyectados desde el componente padre */
  animal = inject<AnimalExtinto>(MAT_DIALOG_DATA);
  
  /** Referencia al diálogo para cerrarlo y enviar datos de vuelta */
  private referenciaDialogo = inject(MatDialogRef<DialogoDetalleAnimal>);

  /**
   * Constructor vacío - usamos inject() para inyección de dependencias
   */
  constructor() {}

  /**
   * Cierra el diálogo
   */
  alCerrar(): void {
    this.referenciaDialogo.close();
  }

  /**
   * Abre el enlace de Wikipedia en una nueva pestaña
   */
  abrirWikipedia(): void {
    window.open(this.animal.wikiLink, '_blank', 'noopener,noreferrer');
  }

  /**
   * Verifica si la imagen está disponible
   * @returns true si hay una URL de imagen válida
   */
  tieneImagen(): boolean {
    return !!this.animal.imageSrc && this.animal.imageSrc.trim() !== '';
  }

  /**
   * Obtiene el nombre a mostrar (común o binomial)
   * @returns El nombre común si existe, sino el binomial
   */
  obtenerNombreParaMostrar(): string {
    return this.animal.commonName || this.animal.binomialName;
  }
}
