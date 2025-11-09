import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RickMortyService } from '../../services/rick-morty-serv';
import { Character } from '../../model/characterInterface';

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

  // Navega a la página de detalles del personaje usando ruta parametrizada
  viewDetails(character: Character): void {
    this.router.navigate(['/palomares/character', character.id]);
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
