import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { RickMortyService } from '../../services/rick-morty-serv';
import { CharacterSelectorComponent } from '../character-selector/character-selector';
import { Character } from '../../model/characterInterface';
import { CharacterDialogComponent } from '../character-dialog/character-dialog';

// Componente para búsqueda avanzada de personajes
@Component({
  selector: 'app-search-page',
  imports: [CommonModule, CharacterSelectorComponent],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css'
})
export class SearchPageComponent implements OnInit {
  private rickMortyService = inject(RickMortyService);
  private dialog = inject(MatDialog);
  
  characters = this.rickMortyService.characters;
  loading = this.rickMortyService.loading;
  currentPage = this.rickMortyService.currentPage;
  totalPages = this.rickMortyService.totalPages;

  ngOnInit(): void {
    // No cargar personajes automáticamente, esperar a que el usuario busque
  }

  // Abre un diálogo con todos los atributos del personaje
  viewDetails(character: Character): void {
    this.dialog.open(CharacterDialogComponent, {
      data: character,
      width: '600px',
      maxHeight: '90vh'
    });
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
