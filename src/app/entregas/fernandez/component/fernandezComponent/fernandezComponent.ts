import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
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
  private router = inject(Router);
  
  // Signals para estado reactivo
  selectedCharacter = signal<Character | null>(null);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  currentRoute = signal<string>('');
  
  // Computed para estado derivado
  hasSelectedCharacter = computed(() => this.selectedCharacter() !== null);
  appTitle = computed(() => 
    this.selectedCharacter() 
      ? `GoT App - ${this.selectedCharacter()!.fullName}` 
      : 'Game of Thrones App'
  );
  
  // Computed para mostrar solo el botón opuesto a la página actual
  visibleNavigationItems = computed(() => {
    const current = this.currentRoute();
    
    if (current.includes('/characters')) {
      // Si estamos en personajes, mostrar solo búsqueda
      return [{ path: '/fernandez/search', label: 'Búsqueda', icon: 'search' }];
    } else if (current.includes('/search')) {
      // Si estamos en búsqueda, mostrar solo personajes
      return [{ path: '/fernandez/characters', label: 'Personajes', icon: 'people' }];
    } else {
      // En la página de inicio, mostrar ambos
      return [
        { path: '/fernandez/characters', label: 'Personajes', icon: 'people' },
        { path: '/fernandez/search', label: 'Búsqueda', icon: 'search' }
      ];
    }
  });

  // Computed para las tarjetas de acción visibles en la página de inicio
  visibleActionCards = computed(() => {
    const current = this.currentRoute();
    
    if (current.includes('/characters')) {
      // Si estamos en personajes, mostrar solo la tarjeta de búsqueda
      return [
        { 
          path: '/fernandez/search', 
          icon: '🔍', 
          title: 'Buscar', 
          description: 'Encuentra personajes específicos' 
        }
      ];
    } else if (current.includes('/search')) {
      // Si estamos en búsqueda, mostrar solo la tarjeta de personajes
      return [
        { 
          path: '/fernandez/characters', 
          icon: '👥', 
          title: 'Ver Personajes', 
          description: 'Explora todos los personajes de la serie' 
        }
      ];
    } else {
      // En la página de inicio, mostrar ambas tarjetas
      return [
        { 
          path: '/fernandez/characters', 
          icon: '👥', 
          title: 'Ver Personajes', 
          description: 'Explora todos los personajes de la serie' 
        },
        { 
          path: '/fernandez/search', 
          icon: '🔍', 
          title: 'Buscar', 
          description: 'Encuentra personajes específicos' 
        }
      ];
    }
  });
  
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

    // Subscripción a cambios de ruta para mostrar navegación condicional
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute.set(event.url);
      });

    // Establecer ruta inicial
    this.currentRoute.set(this.router.url);
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
