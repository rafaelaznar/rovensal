import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Componente raíz de la sección Alcalde
 * Actúa como contenedor para las rutas hijas mediante RouterOutlet
 */
@Component({
  selector: 'app-alcalde',
  imports: [RouterOutlet],
  templateUrl: './alcaldeComponent.html',
  styleUrl: './alcaldeComponent.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlcaldeComponent {
  /**
   * Constructor vacío
   */
  constructor() {}
}
