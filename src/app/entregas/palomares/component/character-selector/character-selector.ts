import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RickMortyService } from '../../services/rick-morty-serv';

@Component({
  selector: 'app-character-selector',
  imports: [CommonModule, FormsModule],
  templateUrl: './character-selector.html',
  styleUrl: './character-selector.css'
})
export class CharacterSelectorComponent {
  private rickMortyService = inject(RickMortyService);
  
  searchTerm = signal<string>('');
  statusFilter = signal<string>('');
  speciesFilter = signal<string>('');
  genderFilter = signal<string>('');
  
  statusOptions = ['', 'alive', 'dead', 'unknown'];
  speciesOptions = ['', 'Human', 'Alien', 'Humanoid', 'Robot', 'Animal'];
  genderOptions = ['', 'Male', 'Female', 'Genderless', 'unknown'];

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  onFilterChange(): void {
    // Solo actualiza el valor del filtro, no hace búsqueda automática
  }

  performSearch(): void {
    console.log('Realizando búsqueda...');
    const term = this.searchTerm();
    const status = this.statusFilter();
    const species = this.speciesFilter();
    const gender = this.genderFilter();

    // Llama al método unificado del servicio para realizar la búsqueda
    this.rickMortyService.searchWithFilters(
      term || undefined,
      status || undefined,
      species || undefined,
      gender || undefined,
      1
    );
  }

  searchCharacters(): void {
    const term = this.searchTerm();
    if (term) {
      this.rickMortyService.searchCharacters(term).subscribe({
        next: (response) => {
          console.log('Search results:', response);
        },
        error: (error) => {
          console.error('Search error:', error);
        }
      });
    }
  }

  applyFilters(): void {
    const status = this.statusFilter();
    const species = this.speciesFilter();
    const gender = this.genderFilter();
    
    if (status || species || gender) {
      this.rickMortyService.filterCharacters(status, species, gender).subscribe({
        next: (response) => {
          console.log('Filter results:', response);
        },
        error: (error) => {
          console.error('Filter error:', error);
        }
      });
    }
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.statusFilter.set('');
    this.speciesFilter.set('');
    this.genderFilter.set('');
    this.rickMortyService.searchWithFilters(undefined, undefined, undefined, undefined, 1);
  }
}
