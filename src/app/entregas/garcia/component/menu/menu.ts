import { Component, Output, EventEmitter } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion';

@Component({
  selector: 'app-menu-garcia',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './menu.html',
})
export class Menu {
  @Output() reiniciar = new EventEmitter<void>();

  constructor(private dialog: MatDialog, private router: Router) {}

  confirmarReinicio(): void {
    const dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
      width: '400px',
      data: {
        titulo: 'Reiniciar Juego',
        mensaje: '¿Estás seguro de que quieres jugar de nuevo?',
        textoBoton: 'Sí, reiniciar'
      }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.reiniciar.emit();
      }
    });
  }

  volverHome(): void {
    this.router.navigate(['/home']);
  }
}
