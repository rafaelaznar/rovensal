import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Champion } from '../ContrerasModel/contrerasInterface';

@Component({
  selector: 'app-lista-campeones',
  imports: [CommonModule],
  template: `
    <div class="dialog_container">
      <h2>Lista de Todos los Campeones</h2>
      
      <div class="search_section">
        <input 
          type="text" 
          placeholder="Buscar campeón..." 
          #filtroInput
          (input)="filtrarCampeones(filtroInput.value)"
          class="search_input">
      </div>
      
      <div class="campeones_grid">
        @for (campeon of campeonesFiltrados; track campeon.id) {
          <div class="campeon_card" (click)="seleccionarCampeon(campeon)">
            <img [src]="campeon.icon" [alt]="campeon.name" class="campeon_icon">
            <div class="campeon_details">
              <h4>{{ campeon.name }}</h4>
              <p>{{ campeon.title }}</p>
              <small>{{ campeon.roles.join(', ') }}</small>
            </div>
          </div>
        }
      </div>
      
      <div class="dialog_actions">
        <button (click)="cerrarDialog()" class="btn_cerrar">Cerrar</button>
      </div>
    </div>
  `,
  styles: [`
    .dialog_container {
      padding: 20px;
      max-height: 600px;
    }
    
    .search_section {
      margin-bottom: 20px;
    }
    
    .search_input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
    }
    
    .campeones_grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 15px;
      max-height: 400px;
      overflow-y: auto;
      margin-bottom: 20px;
    }
    
    .campeon_card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
      cursor: pointer;
      transition: all 0.3s ease;
      background: white;
    }
    
    .campeon_card:hover {
      border-color: #2a6f97;
      box-shadow: 0 2px 8px rgba(42, 111, 151, 0.2);
      transform: translateY(-2px);
    }
    
    .campeon_icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-bottom: 10px;
    }
    
    .campeon_details h4 {
      margin: 0 0 5px 0;
      color: #2a6f97;
    }
    
    .campeon_details p {
      margin: 0 0 5px 0;
      font-size: 12px;
      color: #666;
    }
    
    .campeon_details small {
      font-size: 10px;
      color: #888;
    }
    
    .dialog_actions {
      text-align: center;
    }
    
    .btn_cerrar {
      background-color: #2a6f97;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .btn_cerrar:hover {
      background-color: #1e5a7a;
    }
  `]
})
export class ListaCampeonesComponent {
  readonly dialogRef = inject(MatDialogRef<ListaCampeonesComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  
  campeones: Champion[] = this.data.campeones;
  campeonesFiltrados: Champion[] = this.campeones;
  filtroTexto = '';
  
  filtrarCampeones(texto: string) {
    this.filtroTexto = texto;
    if (!texto.trim()) {
      this.campeonesFiltrados = this.campeones;
    } else {
      this.campeonesFiltrados = this.campeones.filter(campeon =>
        campeon.name.toLowerCase().includes(texto.toLowerCase()) ||
        campeon.title.toLowerCase().includes(texto.toLowerCase()) ||
        campeon.roles.some(role => role.toLowerCase().includes(texto.toLowerCase()))
      );
    }
  }
  
  seleccionarCampeon(campeon: Champion) {
    this.dialogRef.close(campeon);
  }
  
  cerrarDialog() {
    this.dialogRef.close();
  }
}