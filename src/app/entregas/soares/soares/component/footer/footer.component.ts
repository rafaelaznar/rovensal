/**
 * COMPONENTE FOOTER - PIE DE PÁGINA
 * 
 * Este componente es como la "firma" de nuestra web NBA.
 * Aparece al final de todas las páginas y contiene información
 * institucional como derechos de autor, enlaces adicionales
 * y datos de contacto.
 * 
 * Funciones principales:
 * - Mostrar información de copyright automática (año actual)
 * - Proveer enlaces adicionales de navegación
 * - Dar credibilidad y profesionalismo a la web
 * - Mantener consistencia en todas las páginas
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',       // Nombre para usar en HTML: <app-footer>
  standalone: true,             // Componente independiente
  imports: [CommonModule, RouterModule], // Necesita navegación para enlaces
  templateUrl: './footer.component.html', // Su archivo HTML
  styleUrl: './footer.component.css'      // Su archivo de estilos
})
export class FooterComponent {
  // Año actual calculado automáticamente para el copyright
  // Se actualiza solo cada año sin tocar código
  currentYear = new Date().getFullYear();
}