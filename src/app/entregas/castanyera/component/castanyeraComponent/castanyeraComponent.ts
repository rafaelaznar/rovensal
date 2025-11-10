import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Jsonplacecastanyera } from '../../services/CastanyeraService';
import { Castanyera } from '../../model/castanyeraInterface';
import { CastanyeraCards } from '../castanyera-cards/castanyera-cards';
import { CastanyeraSearchBarName } from '../castanyera-search-bar-name/castanyera-search-bar-name';
import { CastanyeraMenuButton } from '../castanyera-menu-button/castanyera-menu-button';
import { CastanyeraSearchBarPeli } from '../castanyera-search-bar-peli/castanyera-search-bar-peli';
import { CastanyeraPaginator } from '../castanyera-paginator/castanyera-paginator';

@Component({
  selector: 'app-castanyera',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    CastanyeraCards,
    CastanyeraSearchBarName,
    CastanyeraMenuButton,
    CastanyeraSearchBarPeli,
    CastanyeraPaginator,
  ],
  templateUrl: './castanyeraComponent.html',
  styleUrls: ['./castanyeraComponent.css'],
  standalone: true,
})
export class CastanyeraComponent {
  personajes: Castanyera[] = [];
  filteredCharacters: Castanyera[] = [];
  searchByName: string = '';
  searchByMedia: string = '';
  nameFiltered: Castanyera[] = [];
  mediaFiltered: Castanyera[] = [];

  // Parámetros de paginación
  pageSize = 10;
  currentPage = 0;

  constructor(private jsonCastanyera: Jsonplacecastanyera) {}

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters() {
    this.jsonCastanyera.getAllCharacters().subscribe((characters: Castanyera[]) => {
      this.personajes = characters;
      this.applyFilters();
    });
  }

  onSearchName(text: string) {
    this.searchByName = text.toLowerCase().trim();
    // compute name-only matches for the message and then apply combined filters
    this.nameFiltered = this.personajes.filter((char) =>
      char.name.toLowerCase().includes(this.searchByName)
    );
    this.applyFilters();
  }

  onSearchMedia(text: string) {
    this.searchByMedia = text.toLowerCase().trim();
    // compute media-only matches for the message and then apply combined filters
    this.mediaFiltered = this.personajes.filter(
      (char) =>
        char.films.some((film) => film.toLowerCase().includes(this.searchByMedia)) ||
        char.tvShows.some((show) => show.toLowerCase().includes(this.searchByMedia))
    );
    this.applyFilters();
  }

  private applyFilters() {
    this.filteredCharacters = this.personajes.filter((char) => {
      const matchesName = !this.searchByName || char.name.toLowerCase().includes(this.searchByName);

      const matchesMedia =
        !this.searchByMedia ||
        char.films.some((film) => film.toLowerCase().includes(this.searchByMedia)) ||
        char.tvShows.some((show) => show.toLowerCase().includes(this.searchByMedia));

      return matchesName && matchesMedia;
    });
  }

  get showNoResults(): boolean {
    const noNameMatches = !!this.searchByName && this.nameFiltered.length === 0;
    const noMediaMatches = !!this.searchByMedia && this.mediaFiltered.length === 0;
    return noNameMatches || noMediaMatches;
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  get pagedCharacters(): Castanyera[] {
    const startIndex = this.currentPage * this.pageSize;
    const charactersToShow = this.filteredCharacters.length
      ? this.filteredCharacters
      : this.personajes;
    return charactersToShow.slice(startIndex, startIndex + this.pageSize);
  }
}
