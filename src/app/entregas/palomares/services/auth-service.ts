import { Injectable, signal } from '@angular/core';

// Servicio para manejar la autenticación de usuarios
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Signal que almacena el usuario actual
  currentUser = signal<string | null>(null);
  
  // Método para iniciar sesión y guardar el usuario
  login(username: string): void {
    this.currentUser.set(username);
  }
  
  // Método para cerrar sesión
  logout(): void {
    this.currentUser.set(null);
  }
  
  // Verifica si existe un usuario autenticado
  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }
}
