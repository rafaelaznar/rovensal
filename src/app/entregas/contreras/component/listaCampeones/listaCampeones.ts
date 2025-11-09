import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Champion } from '../ContrerasModel/contrerasInterface';

@Component({
  selector: 'app-lista-campeones',
  imports: [CommonModule],
  styleUrl: './listaCampeones.css',
  template: `
    <div style="padding: 15px;">
      <h2>Campeones</h2>
      
      <input #i (input)="filtrar(i.value)" placeholder="Buscar..." 
             style="width: 100%; padding: 8px; margin: 10px 0; border: 1px solid #ccc;">
      
      <div style="max-height: 350px; overflow-y: auto; display: grid; grid-template-columns: repeat(auto-fill, 150px); gap: 8px;">
        @for (c of lista; track c.id) {
          <div (click)="seleccionar(c)" class="carta">
            <img [src]="c.icon" [alt]="c.name" class="icono">
            <div class="info">
              <strong>{{ c.name }}</strong> 
              <small>{{ c.title }}</small>
            </div>
          </div>
        }
      </div>
      <br>
      <div style="text-align: center; margin-top: 15px;">
        <button (click)="cerrar()" style="background: #2a6f97; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;">
          Cerrar
        </button>
      </div>
    </div>
  `,

})
export class ListaCampeonesComponent {
  readonly dialogRef = inject(MatDialogRef<ListaCampeonesComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  
  // Lista filtrada de campeones para mostrar
  lista = this.data.campeones;
  
  // Funcion para filtrar campeones por nombre
  filtrar(texto: string) {
    this.lista = texto 
      ? this.data.campeones.filter((c: Champion) => c.name.toLowerCase().includes(texto.toLowerCase()))
      : this.data.campeones;
  }
  
  // Funciones para cerrar el dialogo
  seleccionar = (c: Champion) => this.dialogRef.close(c); // Con campeon seleccionado
  cerrar = () => this.dialogRef.close(); // Sin seleccionar
}