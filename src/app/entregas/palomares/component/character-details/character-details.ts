import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RickMortyService } from '../../services/rick-morty-serv';

@Component({
  selector: 'app-character-details',
  imports: [CommonModule],
  templateUrl: './character-details.html',
  styleUrl: './character-details.css'
})
export class CharacterDetailsComponent {
  private rickMortyService = inject(RickMortyService);
  
  selectedCharacter = this.rickMortyService.selectedCharacter;
  
  hasCharacter = computed(() => this.selectedCharacter() !== null);
  
  episodeCount = computed(() => 
    this.selectedCharacter()?.episode.length || 0
  );

  closeDetails(): void {
    this.rickMortyService.clearSelection();
  }

  getStatusClass(): string {
    const status = this.selectedCharacter()?.status.toLowerCase();
    return status || '';
  }
}
