import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-menu',
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class MenuComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  isMenuOpen = signal<boolean>(false);
  
  // Signal que contiene el usuario actualmente autenticado
  currentUser = this.authService.currentUser;

  // Navega a diferentes rutas dentro de palomares
  navigateTo(path: string): void {
    if (path === '') {
      this.router.navigate(['/palomares']);
    } else {
      this.router.navigate(['/palomares', path]);
    }
    this.isMenuOpen.set(false);
  }

  toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  menuItems = [
    { id: '', label: 'Todos los Personajes', icon: '👥' },
    { id: 'search', label: 'Búsqueda Avanzada', icon: '🔍' },
    { id: 'login', label: 'Login Form', icon: '🔐', showWhenLoggedIn: false }
  ];
  
  // Filtra los items del menú según el estado de autenticación
  getVisibleMenuItems() {
    const isLoggedIn = this.currentUser() !== null;
    return this.menuItems.filter(item => {
      if (item.showWhenLoggedIn === false) {
        return !isLoggedIn;
      }
      return true;
    });
  }
  
  // Método para cerrar la sesión del usuario actual
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/palomares']);
  }
}
