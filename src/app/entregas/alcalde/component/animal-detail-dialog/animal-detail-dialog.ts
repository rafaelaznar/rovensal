import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { NgOptimizedImage } from '@angular/common';
import { ExtinctAnimal } from '../../models/animal.interface';

/**
 * Componente de diálogo (ventana emergente) que muestra información detallada de un animal
 * Recibe datos desde el componente padre mediante MAT_DIALOG_DATA
 * Permite comunicación bidireccional con el padre mediante MatDialogRef
 */
@Component({
  selector: 'app-animal-detail-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatChipsModule,
    NgOptimizedImage
  ],
  templateUrl: './animal-detail-dialog.html',
  styleUrl: './animal-detail-dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimalDetailDialogComponent {
  /** Datos del animal inyectados desde el componente padre */
  animal = inject<ExtinctAnimal>(MAT_DIALOG_DATA);
  
  /** Referencia al diálogo para cerrarlo y enviar datos de vuelta */
  private dialogRef = inject(MatDialogRef<AnimalDetailDialogComponent>);

  /**
   * Constructor vacío - usamos inject() para inyección de dependencias
   */
  constructor() {}

  /**
   * Cierra el diálogo
   */
  onClose(): void {
    this.dialogRef.close();
  }

  /**
   * Abre el enlace de Wikipedia en una nueva pestaña
   */
  openWikipedia(): void {
    window.open(this.animal.wikiLink, '_blank', 'noopener,noreferrer');
  }

  /**
   * Verifica si la imagen está disponible
   * @returns true si hay una URL de imagen válida
   */
  hasImage(): boolean {
    return !!this.animal.imageSrc && this.animal.imageSrc.trim() !== '';
  }

  /**
   * Obtiene el nombre a mostrar (común o binomial)
   * @returns El nombre común si existe, sino el binomial
   */
  getDisplayName(): string {
    return this.animal.commonName || this.animal.binomialName;
  }
}
