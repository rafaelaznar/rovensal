import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RickMortyService } from '../../services/rick-morty-serv';
import { Character } from '../../model/characterInterface';

// Componente para mostrar detalles de un personaje en una ruta parametrizada
@Component({
  selector: 'app-character-detail-page',
  imports: [CommonModule],
  templateUrl: './character-detail-page.html',
  styleUrl: './character-detail-page.css'
})
export class CharacterDetailPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private rickMortyService = inject(RickMortyService);
  
  character = signal<Character | null>(null);
  loading = signal<boolean>(true);
  error = signal<string>('');

  ngOnInit(): void {
    // Obtiene el ID del personaje desde los parámetros de la ruta
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.loadCharacter(+id);
    } else {
      this.error.set('ID de personaje no válido');
      this.loading.set(false);
    }
  }

  loadCharacter(id: number): void {
    console.log('Cargando personaje con ID:', id);
    this.loading.set(true);
    
    this.rickMortyService.getCharacterById(id).subscribe({
      next: (data) => {
        this.character.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar personaje:', err);
        this.error.set('No se pudo cargar el personaje');
        this.loading.set(false);
      }
    });
  }

  // Método para volver a la lista
  goBack(): void {
    this.router.navigate(['/palomares']);
  }
}
