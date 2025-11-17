import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AboutDialogComponent } from '../AboutDialog/aboutdialog';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pallas',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, AboutDialogComponent, RouterModule],
  templateUrl: './pallasComponent.html',
  styleUrls: ['./pallasComponent.css']
})
export class PallasComponent {
  constructor(private dialog: MatDialog) {}

  mostrarInfo() {
    const dialogRef = this.dialog.open(AboutDialogComponent, {
      width: '420px',
      data: {
        title: 'Pokémon',
        author: 'Marcos Pallas',
        description: 'Pokémon franquicia japonesa creada en 1996 basada en criaturas para entrenar, luchar y capturar a estas. Aqui podras ver los primeros 151 Pokémon y permite filtrado por nombre.',
        version: '1.0.0'
      }
    });

    
  }
}
