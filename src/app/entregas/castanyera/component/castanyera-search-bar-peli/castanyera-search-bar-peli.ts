import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Castanyera } from '../../model/castanyeraInterface';

@Component({
  selector: 'app-castanyera-search-bar-peli',
  imports: [MatFormField, MatInputModule, CommonModule, MatFormFieldModule, FormsModule],
  templateUrl: './castanyera-search-bar-peli.html',
  styleUrl: './castanyera-search-bar-peli.css',
})
export class CastanyeraSearchBarPeli {
  searchText: string = '';

  @Input() hasResults: boolean = true;

  @Output() search = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.searchText);
  }
}
