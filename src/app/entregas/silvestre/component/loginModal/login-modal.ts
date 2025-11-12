import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZeldaCompanion } from '../../model/zeldaCompanionInterface';

/**
 * Componente modal para el inicio de sesión de usuario.
 * Permite capturar nombre, email y compañero favorito de Zelda.
 */
@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-modal.html',
  styleUrls: ['./login-modal.css'],
})
export class LoginModalComponent {

  @Input() visible = false;
  @Input() usuarioInicial: string | null = null;
  @Input() companions: ZeldaCompanion[] = [];
  @Output() close = new EventEmitter<null | { nombre: string; email: string; companionFav: string }>();

  nombre = '';
  email = '';
  companionFav = '';
  error = '';

  /**
   * Inicializa el componente.
   * Si hay un usuario inicial, lo asigna al campo nombre.
   */
  ngOnInit() {
    if (this.usuarioInicial) this.nombre = this.usuarioInicial;
  }

  /**
   * Valida el formato de un email usando expresión regular.
   * @param email - Email a validar
   * @returns true si el email es válido, false en caso contrario
   */
  validarEmail(email: string) {
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return re.test(email);
  }

  /**
   * Envía el formulario tras validar.
   * Valida que el nombre tenga al menos 2 caracteres y que el email sea válido.
   * Si todo está ok, coge los datos y resetea el formulario.
   */
  submit() {
    if (this.nombre.trim().length < 2) {
      this.error = 'El nombre debe tener al menos 2 caracteres.';
      return;
    }
    if (!this.validarEmail(this.email)) {
      this.error = 'Introduce un email válido.';
      return;
    }

    this.close.emit({ nombre: this.nombre.trim(), email: this.email.trim(), companionFav: this.companionFav });
    this.resetAndClose();
  }

  /**
   * Cancela el formulario sin guardar.
   * Emite null para cancelar y resetea el form.
   */
  cancel() {
    this.close.emit(null);
    this.resetAndClose();
  }

  /**
   * Resetea campos del pequeño form y cierra el modal.
   */
  private resetAndClose() {
    this.nombre = '';
    this.email = '';
    this.companionFav = '';
    this.error = '';
  }
}
