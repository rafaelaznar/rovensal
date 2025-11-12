import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../model/characterInterface';

/**
 * Componente hijo que demuestra comunicación bidireccional padre-hijo
 * Usa @Input para recibir datos del padre
 * Usa @Output con EventEmitter para enviar datos al padre
 */
@Component({
  selector: 'app-character-card',
  imports: [CommonModule],
  template: `
    <div class="card" [class.selected]="isSelected">
      <img [src]="character.image" [alt]="character.name" />
      <div class="card-content">
        <h3>{{ character.name }}</h3>
        <p class="status" [class.alive]="character.status === 'Alive'" 
           [class.dead]="character.status === 'Dead'">
          <span class="dot"></span>
          {{ character.status }} - {{ character.species }}
        </p>
        <p class="location">
          <strong>Location:</strong> {{ character.location.name }}
        </p>
        
        <div class="card-actions">
          <button (click)="handleSelect()" class="btn-select">
            {{ isSelected ? 'Deseleccionar' : 'Seleccionar' }}
          </button>
          <button (click)="handleDelete()" class="btn-delete">
            Eliminar
          </button>
          <button (click)="handleFavorite()" class="btn-favorite">
            {{ isFavorite ? '★' : '☆' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
    .card.selected {
      border: 3px solid #667eea;
    }
    .card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .card-content {
      padding: 15px;
    }
    .card-content h3 {
      margin: 0 0 10px 0;
      color: #333;
    }
    .status {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 8px 0;
      color: #666;
      font-size: 14px;
    }
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #666;
    }
    .status.alive .dot {
      background-color: #55cc44;
    }
    .status.dead .dot {
      background-color: #d63d2e;
    }
    .location {
      font-size: 13px;
      color: #666;
      margin: 8px 0;
    }
    .card-actions {
      display: flex;
      gap: 8px;
      margin-top: 15px;
    }
    .card-actions button {
      flex: 1;
      padding: 8px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      transition: opacity 0.3s ease;
    }
    .card-actions button:hover {
      opacity: 0.8;
    }
    .btn-select {
      background-color: #667eea;
      color: white;
    }
    .btn-delete {
      background-color: #ff6b6b;
      color: white;
    }
    .btn-favorite {
      background-color: #ffd93d;
      color: #333;
      font-size: 18px;
    }
  `]
})
export class CharacterCardComponent {
  /**
   * @Input: Recibe datos del componente padre
   * El padre pasa el personaje a mostrar
   */
  @Input({ required: true }) character!: Character;
  
  /**
   * @Input: Indica si la tarjeta está seleccionada
   */
  @Input() isSelected: boolean = false;
  
  /**
   * @Input: Indica si es favorito
   */
  @Input() isFavorite: boolean = false;

  /**
   * @Output: Emite evento cuando se selecciona el personaje
   * El padre escucha este evento
   */
  @Output() characterSelected = new EventEmitter<Character>();
  
  /**
   * @Output: Emite evento cuando se elimina
   */
  @Output() characterDeleted = new EventEmitter<Character>();
  
  /**
   * @Output: Emite evento cuando se marca/desmarca favorito
   */
  @Output() favoriteToggled = new EventEmitter<Character>();

  /**
   * Maneja la selección y emite el evento al padre
   */
  handleSelect(): void {
    this.characterSelected.emit(this.character);
  }

  /**
   * Maneja la eliminación y emite el evento al padre
   */
  handleDelete(): void {
    this.characterDeleted.emit(this.character);
  }

  /**
   * Maneja el toggle de favorito y emite al padre
   */
  handleFavorite(): void {
    this.favoriteToggled.emit(this.character);
  }
}
