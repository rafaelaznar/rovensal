import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialogo-confirmacion',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.titulo }}</h2>
    
    <mat-dialog-content>
      <p>{{ data.mensaje }}</p>
    </mat-dialog-content>
    
    <mat-dialog-actions align="end">
      <button mat-button (click)="cerrar(false)">
        Cancelar
      </button>
      <button mat-raised-button color="warn" (click)="cerrar(true)">
        {{ data.textoBoton }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    p {
      font-size: 1.1rem;
      padding: 20px 0;
    }
  `]
})
export class DialogoConfirmacionComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogoConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  
  cerrar(confirmado: boolean): void {
    this.dialogRef.close(confirmado);
  }
}