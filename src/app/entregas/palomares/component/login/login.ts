import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';

// Componente de Login con validación básica
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  loginForm!: FormGroup;
  submitted = signal<boolean>(false);
  errorMessage = signal<string>('');

  // Constructor para inicializar el componente
  constructor() {
    console.log('Inicializando componente login');
  }

  // Método del ciclo de vida para configurar el formulario
  ngOnInit(): void {
    this.initializeForm();
  }

  // Inicializa el formulario con las validaciones correspondientes
  private initializeForm(): void {
    // Expresión regular simple para email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(emailRegex)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      username: ['', [
        Validators.required,
        Validators.minLength(3)
      ]]
    });
  }

  // Maneja el evento de envío del formulario
  onSubmit(): void {
    this.submitted.set(true);
    this.errorMessage.set('');

    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Login exitoso:', formData);
      console.log('Usuario:', formData.username);
      
      // Guarda el usuario en el servicio de autenticación
      this.authService.login(formData.username);
      
      // Redirige automáticamente a la lista de personajes
      this.router.navigate(['/palomares']);
    } else {
      console.log('Formulario con errores');
      this.errorMessage.set('Por favor, completa correctamente todos los campos');
    }
  }

  // Verifica si un campo específico tiene un error determinado
  hasError(field: string, error: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.hasError(error) && (control.dirty || control.touched || this.submitted()));
  }

  // Obtiene el mensaje de error correspondiente para un campo
  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (!control) return '';

    if (control.hasError('required')) {
      return `El campo ${field} es obligatorio`;
    }
    if (control.hasError('pattern')) {
      return 'Formato de email inválido';
    }
    if (control.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    return '';
  }
}
