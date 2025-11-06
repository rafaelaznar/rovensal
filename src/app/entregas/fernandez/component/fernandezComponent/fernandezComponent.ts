import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ThroneService } from '../../service';
import { Character } from '../../model';

/**
 * Componente principal de la aplicación Game of Thrones
 * Demuestra: componentes enrutados, inyección de servicios, signals, computed
 */
@Component({
  selector: 'app-fernandez',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './fernandezComponent.html',
  styleUrl: './fernandezComponent.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FernandezComponent {
  
  // Inyección de dependencias usando inject()
  private throneService = inject(ThroneService);
  
  // Signals para estado reactivo
  selectedCharacter = signal<Character | null>(null);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  
  // Computed para estado derivado
  hasSelectedCharacter = computed(() => this.selectedCharacter() !== null);
  appTitle = computed(() => 
    this.selectedCharacter() 
      ? `GoT App - ${this.selectedCharacter()!.fullName}` 
      : 'Game of Thrones App'
  );
  
  // Propiedades para el template
  navigationItems = [
    { path: '/fernandez/characters', label: 'Personajes', icon: 'people' },
    { path: '/fernandez/search', label: 'Búsqueda', icon: 'search' },
    { path: '/fernandez/favorites', label: 'Favoritos', icon: 'favorite' }
  ];
  
  constructor() {
    this.initializeSubscriptions();
  }
  
  /**
   * Inicializa las subscripciones a observables del servicio
   * Demuestra: subscripciones, manejo de estado asíncrono
   */
  private initializeSubscriptions(): void {
    // Subscripción al personaje seleccionado
    this.throneService.selectedCharacter$.subscribe(character => {
      this.selectedCharacter.set(character);
    });
    
    // Subscripción al estado de carga
    this.throneService.loading$.subscribe(loading => {
      this.isLoading.set(loading);
    });
    
    // Subscripción a errores
    this.throneService.error$.subscribe(error => {
      this.errorMessage.set(error);
    });
  }
  
  /**
   * Limpia el error actual
   * Demuestra: manejo de eventos
   */
  clearError(): void {
    this.throneService.clearError();
  }
  
  /**
   * Resetea la selección de personaje
   */
  clearSelection(): void {
    this.throneService.setSelectedCharacter(null);
  }
  
  /**
   * Obtiene el icono para la navegación
   * Demuestra: métodos de utilidad para templates
   */
  getIcon(iconName: string): string {
    const icons: Record<string, string> = {
      home: '🏠',
      people: '👥',
      search: '🔍',
      favorite: '⭐'
    };
    return icons[iconName] || '📄';
  }
  
  /**
   * Lifecycle hook - se ejecuta después del constructor
   * Diferencia entre constructor y ngOnInit
   */
  ngOnInit(): void {
    console.log('FernandezComponent inicializado');
    // Aquí se inicializarían datos que dependen del DOM
  }
}
