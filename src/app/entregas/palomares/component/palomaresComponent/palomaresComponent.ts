import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { MenuComponent } from '../menu/menu';
import { CharacterDetailsComponent } from '../character-details/character-details';

// Componente principal de Palomares que maneja la navegación con rutas hijas
@Component({
  selector: 'app-palomares',
  imports: [
    CommonModule,
    RouterOutlet,
    MenuComponent,
    CharacterDetailsComponent
  ],
  templateUrl: './palomaresComponent.html',
  styleUrl: './palomaresComponent.css'
})
export class PalomaresComponent {
}
