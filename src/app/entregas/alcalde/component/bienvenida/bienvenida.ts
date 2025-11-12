import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bienvenida',
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule
  ],
  templateUrl: './bienvenida.html',
  styleUrl: './bienvenida.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Bienvenida {
  nombre = signal<string>('');
  apellidos = signal<string>('');

  constructor(private router: Router) {}

  alCambiarNombre(evento: Event): void {
    const valor = (evento.target as HTMLInputElement).value;
    this.nombre.set(valor);
  }

  alCambiarApellidos(evento: Event): void {
    const valor = (evento.target as HTMLInputElement).value;
    this.apellidos.set(valor);
  }

  empezar(): void {
    if (this.nombre() && this.apellidos()) {
      sessionStorage.setItem('nombreUsuario', this.nombre());
      sessionStorage.setItem('apellidosUsuario', this.apellidos());
      
      this.router.navigate(['/alcalde/animales']);
    }
  }

  formularioValido(): boolean {
    return this.nombre().trim().length > 0 && this.apellidos().trim().length > 0;
  }
}
