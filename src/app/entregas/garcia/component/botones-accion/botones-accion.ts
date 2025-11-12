import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-botones-accion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="botones-accion">
      <h3>{{ titulo }}</h3>
      <div class="botones-combate">
        <button 
          (click)="onAtacar()" 
          class="boton-grande boton-atacar"
          [disabled]="!habilitado">
          ATACAR
        </button>

        <button 
          (click)="onCurar()" 
          class="boton-grande boton-curar"
          [disabled]="pocionesDisponibles <= 0 || !habilitado">
          CURAR
        </button>

        <button 
          (click)="onDefender()" 
          class="boton-grande boton-defender"
          [disabled]="!habilitado">
          DEFENDER
        </button>
      </div>
      <p class="texto-pociones">
        🧪 {{ pocionesDisponibles }}
      </p>
    </div>
  `,
  styles: [`
    .botones-accion {
      text-align: center;
      margin-bottom: 30px;
      padding: 20px;
      background-color: rgba(236, 240, 241, 0.5);
      border-radius: 15px;
    }
    h3 {
      color: #2c3e50;
      margin-bottom: 20px;
      font-size: 1.5rem;
    }
    .botones-combate {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .boton-grande {
      padding: 20px 50px;
      font-size: 1.5rem;
      font-weight: bold;
      border: none;
      border-radius: 15px;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    .boton-grande:hover:not(:disabled) {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }
    .boton-grande:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .boton-atacar {
      background-color: #e74c3c;
      color: white;
    }
    .boton-atacar:hover:not(:disabled) {
      background-color: #c0392b;
    }
    .boton-curar {
      background-color: #2980b9;
      color: white;
    }
    .boton-curar:hover:not(:disabled) {
      background-color: #1c5d8b;
    }
    .boton-defender {
      background-color: #2ecc71;
      color: white;
    }
    .boton-defender:hover:not(:disabled) {
      background-color: #27ae60;
    }
    .texto-pociones {
      font-weight: bold;
      margin-top: 8px;
      color: #ffd700;
      text-shadow: 0 0 3px #000;
      text-align: center;
      font-size: 1.2rem;
    }
  `]
})
export class BotonesAccionComponent {
  @Input() titulo: string = '¡Tu turno!';
  @Input() habilitado: boolean = true;
  @Input() pocionesDisponibles: number = 0;

  @Output() atacar = new EventEmitter<void>();
  @Output() curar = new EventEmitter<void>();
  @Output() defender = new EventEmitter<void>();

  onAtacar(): void {
    this.atacar.emit();
  }

  onCurar(): void {
    this.curar.emit();
  }

  onDefender(): void {
    this.defender.emit();
  }
}