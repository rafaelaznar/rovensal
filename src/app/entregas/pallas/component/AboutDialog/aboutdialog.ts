import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-about-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],

//   Añadimos el html aqui al ser un componente pequeño
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>

    <mat-dialog-content class="my-dialog-content">
      <p><strong>Autor:</strong> {{ data.author }}</p>
      <p>{{ data.description }}</p>

      <hr />

      <p><small>Versión: {{ data.version }}</small></p>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="onClose()">Cerrar</button>
      <button mat-flat-button color="primary" (click)="onConfirm()">Aceptar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .my-dialog-content { min-width: 300px; }
    mat-dialog-content p { margin: 0.5rem 0; }
  `]
})

export class AboutDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<AboutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      author: string;
      description: string;
      version?: string;
    }
  ) {}

  onClose() {
    this.dialogRef.close(null); // cierra sin resultado
  }

  onConfirm() {
    this.dialogRef.close(true); // cierra con resultado
  }

}
