import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { NgOptimizedImage } from '@angular/common';
import { AnimalExtinto } from '../../model/animal-interfaz';

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
  animal = inject<AnimalExtinto>(MAT_DIALOG_DATA);
  
  private referenciaDialogo = inject(MatDialogRef<DialogoDetalleAnimal>);

  constructor() {}

  alCerrar(): void {
    this.referenciaDialogo.close();
  }

  abrirWikipedia(): void {
    window.open(this.animal.wikiLink, '_blank', 'noopener,noreferrer');
  }

  tieneImagen(): boolean {
    return !!this.animal.imageSrc && this.animal.imageSrc.trim() !== '';
  }

  obtenerNombreParaMostrar(): string {
    return this.animal.commonName || this.animal.binomialName;
  }
}