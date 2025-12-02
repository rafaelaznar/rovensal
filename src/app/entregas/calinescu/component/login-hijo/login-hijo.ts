import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Dino } from '../../model/dinoInterface';
import { DinoServ } from '../../services/dino-serv';
/**
 * Componente de ventana emergente (MatDialog) para el formulario de login.
 * Implementa un formulario reactivo con validación completa usando regex.
 * Permite seleccionar un dinosaurio favorito de una lista obtenida desde API.
 * Implementa comunicación bidireccional con el componente padre mediante
 * MAT_DIALOG_DATA (entrada) y dialogRef.close() (salida).
 */
@Component({
  selector: 'app-login-hijo',
  imports: [ReactiveFormsModule, CommonModule, MatDialogModule],
  templateUrl: './login-hijo.html',
  styleUrl: './login-hijo.css',
})
export class LoginHijo {
  /** Referencia al diálogo de Material para controlarlo (cerrar, devolver datos) */
  private dialogRef = inject(MatDialogRef<LoginHijo>);
  
  /** FormBuilder inyectado para crear formularios reactivos */
  private fb = inject(FormBuilder);
  
  /** Datos recibidos del componente padre a través de MAT_DIALOG_DATA */
  data = inject(MAT_DIALOG_DATA); // Recibe { usuarioActual: string | null }
  
  /** Array de dinosaurios cargados desde la API para el selector */
  dinos: Dino[] = [];

  /**
   * @Input - Recibe el usuario actual desde el padre.
   * @deprecated No se usa actualmente, se obtiene a través de MAT_DIALOG_DATA
   */
  @Input() usuarioActual: string | null = null;
  
  /**
   * @Output - Emite los datos del login al padre.
   * @deprecated No se usa actualmente, se devuelven datos con dialogRef.close()
   */
  @Output() loginExitoso = new EventEmitter<{nombre: string, email: string, dinoFav: string | null}>();
  
  /** FormGroup que gestiona todo el formulario reactivo con sus validadores */
  loginForm: FormGroup;
  
  /**
   * Expresión regular para validar nombres.
   * Solo permite letras (incluidas con acentos), espacios, entre 3 y 50 caracteres.
   */
  private readonly REGEX_NOMBRE = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/;
  
  /**
   * Expresión regular para validar emails.
   * Valida formato estándar de email: usuario@dominio.extension
   */
  private readonly REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  /**
   * Constructor del componente.
   * Crea el formulario reactivo con todos los campos y sus validadores.
   * Aplica validación con regex, required, minLength, maxLength, email.
   * @param dinoService - Servicio inyectado para obtener lista de dinosaurios
   */
  constructor(private dinoService: DinoServ) {
    // Crear formulario reactivo con validadores personalizados
    this.loginForm = this.fb.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(this.REGEX_NOMBRE)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(this.REGEX_EMAIL)
      ]],
      dinoFavorito: ['', Validators.required]
    });
  }
  
  /**
   * Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * Carga la lista de dinosaurios desde la API para mostrarlos en el selector.
   */
  ngOnInit(){
    this.dinoService.getAllDinos().subscribe(dinos => {
      this.dinos = dinos;
      console.log('Dinosaurios cargados:', this.dinos);
    });
  }

  /**
   * Maneja el envío del formulario de login.
   * Valida que todos los campos sean correctos antes de cerrar el diálogo.
   * Si hay errores, marca todos los campos como tocados para mostrar mensajes.
   * Si es válido, cierra el diálogo devolviendo los datos al componente padre.
   * @returns void
   * @example
   * // Desde el template
   * <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
   */
  onSubmit() {
    // Validar que el formulario sea válido antes de continuar
    if (this.loginForm.invalid) {
      // Marcar todos los campos como tocados para mostrar errores
      this.loginForm.markAllAsTouched();
      return; // NO PERMITIR CONTINUAR si hay errores
    }

    // Si el formulario es válido, cerrar modal y emitir datos
    const datosLogin = {
      nombre: this.loginForm.value.nombre,
      email: this.loginForm.value.email,
      dinoFav: this.loginForm.value.dinoFavorito
    };
    this.loginExitoso.emit(datosLogin);
    this.dialogRef.close(datosLogin);
  }

  /**
   * Cierra la ventana emergente sin realizar el login.
   * No valida el formulario ni devuelve datos.
   * @returns void
   */
  cerrar() {
    // Permitir cerrar la ventana sin validar
    this.dialogRef.close();
  }

  /**
   * Getter para acceder al control 'nombre' del formulario.
   * Facilita el acceso desde el template para validación.
   * @returns FormControl del campo nombre o null si no existe
   */
  get nombreControl() {
    return this.loginForm.get('nombre');
  }

  /**
   * Getter para acceder al control 'email' del formulario.
   * Facilita el acceso desde el template para validación.
   * @returns FormControl del campo email o null si no existe
   */
  get emailControl() {
    return this.loginForm.get('email');
  }

  /**
   * Getter para acceder al control 'dinoFavorito' del formulario.
   * Facilita el acceso desde el template para validación.
   * @returns FormControl del campo dinoFavorito o null si no existe
   */
  get dinoFavoritoControl() {
    return this.loginForm.get('dinoFavorito');
  }

  /**
   * Verifica si el campo 'nombre' tiene errores de validación.
   * Solo devuelve true si el campo es inválido Y ha sido tocado por el usuario.
   * @returns boolean - true si hay errores a mostrar, false en caso contrario
   */
  get nombreInvalido(): boolean {
    const control = this.nombreControl;
    return !!(control && control.invalid && control.touched);
  }

  /**
   * Verifica si el campo 'email' tiene errores de validación.
   * Solo devuelve true si el campo es inválido Y ha sido tocado por el usuario.
   * @returns boolean - true si hay errores a mostrar, false en caso contrario
   */
  get emailInvalido(): boolean {
    const control = this.emailControl;
    return !!(control && control.invalid && control.touched);
  }
}
