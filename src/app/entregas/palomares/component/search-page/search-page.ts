import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RickMortyService } from '../../services/rick-morty-serv';
import { CharacterSelectorComponent } from '../character-selector/character-selector';

// Componente para búsqueda avanzada de personajes
@Component({
  selector: 'app-search-page',
  imports: [CommonModule, CharacterSelectorComponent],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css'
})
export class SearchPageComponent implements OnInit {
  private rickMortyService = inject(RickMortyService);
  
  characters = this.rickMortyService.characters;
  loading = this.rickMortyService.loading;
  currentPage = this.rickMortyService.currentPage;
  totalPages = this.rickMortyService.totalPages;

  ngOnInit(): void {
    // No cargar personajes automáticamente, esperar a que el usuario busque
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      const nextPage = this.currentPage() + 1;
      this.rickMortyService.searchWithFilters(undefined, undefined, undefined, undefined, nextPage);
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      const prevPage = this.currentPage() - 1;
      this.rickMortyService.searchWithFilters(undefined, undefined, undefined, undefined, prevPage);
    }
  }
}
