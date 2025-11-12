import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Castanyera } from '../../model/castanyeraInterface';

@Component({
  selector: 'app-castanyera-search-bar-name',
  imports: [MatFormField, MatInputModule, CommonModule, MatFormFieldModule, FormsModule],
  templateUrl: './castanyera-search-bar-name.html',
  styleUrl: './castanyera-search-bar-name.css',
})
export class CastanyeraSearchBarName {
  searchText: string = '';

  @Input() hasResults: boolean = true;

  @Output() search = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.searchText);
  }

  onOptionSelected(character: Castanyera) {
    this.searchText = character.name;
    this.search.emit(character.name);
  }
}
