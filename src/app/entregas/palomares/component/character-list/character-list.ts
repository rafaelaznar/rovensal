import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RickMortyService } from '../../services/rick-morty-serv';
import { Character } from '../../model/characterInterface';
import { CharacterDialogComponent } from '../character-dialog/character-dialog';

// Componente que muestra la lista paginada de personajes
@Component({
  selector: 'app-character-list',
  imports: [CommonModule],
  templateUrl: './character-list.html',
  styleUrl: './character-list.css'
})
export class CharacterListComponent implements OnInit {
  private rickMortyService = inject(RickMortyService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  
  characters = this.rickMortyService.characters;
  loading = this.rickMortyService.loading;
  currentPage = this.rickMortyService.currentPage;
  totalPages = this.rickMortyService.totalPages;

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(page: number = 1): void {
    console.log('Cargando página:', page);
    this.rickMortyService.searchWithFilters(undefined, undefined, undefined, undefined, page);
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
      this.loadCharacters(this.currentPage() + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.loadCharacters(this.currentPage() - 1);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.loadCharacters(page);
    }
  }
}
