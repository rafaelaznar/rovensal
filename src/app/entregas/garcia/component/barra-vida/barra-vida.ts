import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barra-vida',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="info-vida">
      <p class="texto-vida">❤️ Vida: {{ vidaActual }} / {{ vidaMaxima }}</p>
      
      <div class="barra-vida-fondo">
        <div class="barra-vida-relleno"
             [style.width.%]="calcularPorcentaje()"
             [ngClass]="obtenerClase()">
        </div>
      </div>
    </div>
  `,
  styles: [`
    .info-vida {
      margin: 10px 0;
    }
    .texto-vida {
      margin: 5px 0;
      font-size: 1rem;
      font-weight: bold;
    }
    .barra-vida-fondo {
      width: 100%;
      height: 25px;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 15px;
      overflow: hidden;
    }
    .barra-vida-relleno {
      height: 100%;
      transition: width 0.5s;
    }
    .vida-alta { background-color: #2ecc71; }
    .vida-media { background-color: #f39c12; }
    .vida-baja { background-color: #e74c3c; }
  `]
})
export class BarraVidaComponent {
  @Input() vidaActual: number = 0;
  @Input() vidaMaxima: number = 0;

  calcularPorcentaje(): number {
    if (this.vidaMaxima === 0) return 0;
    return (this.vidaActual / this.vidaMaxima) * 100;
  }

  obtenerClase(): string {
    const porcentaje = this.calcularPorcentaje();
    if (porcentaje > 60) return 'vida-alta';
    if (porcentaje > 30) return 'vida-media';
    return 'vida-baja';
  }
}