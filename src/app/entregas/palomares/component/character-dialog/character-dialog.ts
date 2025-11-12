import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Character } from '../../model/characterInterface';

// Componente de diálogo para mostrar los detalles completos de un personaje
@Component({
  selector: 'app-character-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './character-dialog.html',
  styleUrl: './character-dialog.css'
})
export class CharacterDialogComponent {
  private dialogRef = inject(MatDialogRef<CharacterDialogComponent>);
  character: Character = inject(MAT_DIALOG_DATA);

  // Cierra el diálogo
  close(): void {
    this.dialogRef.close();
  }
}
