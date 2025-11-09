import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ThroneService } from '../../service';
import { Character } from '../../model';
import { CharacterListComponent } from '../character-list/character-list.component';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';

// Página principal donde se muestran todos los personajes
// Usa componentes hijos para la lista y los detalles
@Component({
  selector: 'app-characters-page',
  imports: [CommonModule, CharacterListComponent, CharacterDetailComponent],
  templateUrl: './characters-page.component.html',
  styleUrl: './characters-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersPageComponent implements OnInit {
  
  private throneService = inject(ThroneService);
  private router = inject(Router);
  
  // Estado de la página
  characters = signal<Character[]>([]);
  loading = signal<boolean>(false);
  selectedCharacter = signal<Character | null>(null);
  showDetailPanel = signal<boolean>(false);  // para mostrar/ocultar panel de detalles
  
  ngOnInit(): void {
    // Cargar los personajes cuando se inicia el componente
    this.loadCharacters();
    
    // Subscripción al personaje seleccionado del servicio
    this.throneService.selectedCharacter$.subscribe(character => {
      this.selectedCharacter.set(character);
      this.showDetailPanel.set(character !== null);
    });
    
    // Subscripción al estado de carga
    this.throneService.loading$.subscribe(loading => {
      this.loading.set(loading);
    });
  }
  
  private loadCharacters(): void {
    this.throneService.getAllCharacters().subscribe({
      next: (characters) => {
        this.characters.set(characters);
      },
      error: (error) => {
        console.error('Error cargando personajes:', error);
      }
    });
  }
  
  onCharacterSelected(character: Character): void {
    // El servicio ya se actualiza desde character-list
    // Solo mostramos el panel de detalles
    this.showDetailPanel.set(true);
    
    // Navegar a la ruta con parámetro
    this.router.navigate(['/fernandez/characters', character.id]);
  }
  
  onFamilyFilterChanged(family: string): void {
    if (family) {
      this.throneService.getCharactersByFamily(family).subscribe({
        next: (filteredCharacters) => {
          this.characters.set(filteredCharacters);
        }
      });
    } else {
      this.loadCharacters();
    }
  }
  
  onDetailCloseRequested(): void {
    this.showDetailPanel.set(false);
    this.throneService.setSelectedCharacter(null);
    this.router.navigate(['/fernandez/characters']);
  }
  
  toggleDetailPanel(): void {
    this.showDetailPanel.update(show => !show);
  }
}