import { Component, inject, signal, computed, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { ThroneService } from '../../service';
import { ThemeService } from '../../service/theme.service';
import { Character } from '../../model';
import { ThemeSelectorComponent } from '../theme-selector/theme-selector.component';

@Component({
  selector: 'app-fernandez',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ThemeSelectorComponent],
  templateUrl: './fernandezComponent.html',
  styleUrl: './fernandezComponent.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FernandezComponent implements OnDestroy {
  
  private throneService = inject(ThroneService);
  private themeService = inject(ThemeService);
  private router = inject(Router);
  
  selectedCharacter = signal<Character | null>(null);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  currentRoute = signal<string>('');
  
  hasSelectedCharacter = computed(() => this.selectedCharacter() !== null);
  appTitle = computed(() => 
    this.selectedCharacter() 
      ? `GoT App - ${this.selectedCharacter()!.fullName}` 
      : 'Game of Thrones App'
  );
  
  navItems = computed(() => {
    const current = this.currentRoute();
    
    if (current.includes('/characters')) {
      return [
        { path: '/fernandez/search', label: 'Search', icon: 'search' },
        { path: '/fernandez/favorites', label: 'Favorites', icon: 'favorite' }
      ];
    } else if (current.includes('/search')) {
      return [
        { path: '/fernandez/characters', label: 'Characters', icon: 'people' },
        { path: '/fernandez/favorites', label: 'Favorites', icon: 'favorite' }
      ];
    } else if (current.includes('/favorites')) {
      return [
        { path: '/fernandez/characters', label: 'Characters', icon: 'people' },
        { path: '/fernandez/search', label: 'Search', icon: 'search' }
      ];
    } else {
      return [
        { path: '/fernandez/characters', label: 'Characters', icon: 'people' },
        { path: '/fernandez/search', label: 'Search', icon: 'search' },
        { path: '/fernandez/favorites', label: 'Favorites', icon: 'favorite' }
      ];
    }
  });

  actionCards = computed(() => {
    const current = this.currentRoute();
    
    if (current.includes('/characters')) {
      return [
        { 
          path: '/fernandez/search', 
          icon: '🔍', 
          title: 'Search', 
          description: 'Find specific characters' 
        },
        { 
          path: '/fernandez/favorites', 
          icon: '⭐', 
          title: 'Favorites', 
          description: 'Your favorite characters' 
        }
      ];
    } else if (current.includes('/search')) {
      // Si estamos en búsqueda, mostrar personajes y favoritos
      return [
        { 
          path: '/fernandez/characters', 
          icon: '👥', 
          title: 'Ver Personajes', 
          description: 'Explora todos los personajes de la serie' 
        },
        { 
          path: '/fernandez/favorites', 
          icon: '⭐', 
          title: 'Favoritos', 
          description: 'Gestiona tus personajes favoritos' 
        }
      ];
    } else if (current.includes('/favorites')) {
      // Si estamos en favoritos, mostrar personajes y búsqueda
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
    } else {
      // En la página de inicio, mostrar todas las tarjetas
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
        },
        { 
          path: '/fernandez/favorites', 
          icon: '⭐', 
          title: 'Favoritos', 
          description: 'Gestiona tus personajes favoritos' 
        }
      ];
    }
  });
  
  constructor() {
    this.initializeSubscriptions();
  }
  

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
  

  clearError(): void {
    this.throneService.clearError();
  }
  

  clearSelection(): void {
    this.throneService.setSelectedCharacter(null);
  }
  

  getIcon(iconName: string): string {
    const icons: Record<string, string> = {
      home: '🏠',
      people: '👥',
      search: '🔍',
      favorite: '⭐'
    };
    return icons[iconName] || '📄';
  }
  

  ngOnInit(): void {
    console.log('FernandezComponent inicializado');
    // Aquí se inicializarían datos que dependen del DOM
  }

  ngOnDestroy(): void {
    // Remover las clases de tema cuando se salga del componente
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark');
    root.removeAttribute('data-theme');
  }
}
