import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Componente raíz de la sección Alcalde
 * Actúa como contenedor para las rutas hijas mediante RouterOutlet
 */
@Component({
  selector: 'app-alcalde',
  imports: [RouterOutlet],
  templateUrl: './componente-alcalde.html',
  styleUrl: './componente-alcalde.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponenteAlcalde {
  /**
   * Constructor vacío
   */
  constructor() {}
}
