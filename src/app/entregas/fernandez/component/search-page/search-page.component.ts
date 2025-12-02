import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThroneService } from '../../service';
import { Character, CharacterFilter } from '../../model';
import { CharacterListComponent } from '../character-list/character-list.component';

@Component({
  selector: 'app-search-page',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CharacterListComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent {
  
  private throneService = inject(ThroneService);
  private fb = inject(FormBuilder);
  
  searchResults = signal<Character[]>([]);
  loading = signal<boolean>(false);
  hasSearched = signal<boolean>(false);
  
  searchForm: FormGroup = this.fb.group({
    name: ['', [Validators.minLength(2)]],
    family: [''],
    title: ['']
  });
  
  onSearch(): void {
    if (this.searchForm.valid) {
      this.loading.set(true);
      this.hasSearched.set(true);
      
      const filter: CharacterFilter = this.searchForm.value;
      
      this.throneService.searchCharacters(filter).subscribe({
        next: (results) => {
          this.searchResults.set(results);
          this.loading.set(false);
        },
        error: (error) => {
          console.error('Error en búsqueda:', error);
          this.loading.set(false);
        }
      });
    }
  }
  
  onClear(): void {
    this.searchForm.reset();
    this.searchResults.set([]);
    this.hasSearched.set(false);
  }
  
  onCharacterSelected(character: Character): void {
    this.throneService.setSelectedCharacter(character);
  }
}