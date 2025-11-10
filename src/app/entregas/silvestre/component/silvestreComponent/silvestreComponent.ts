import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginModalComponent } from '../loginModal/login-modal';
import { CompanionPickerComponent } from '../companionPicker/companion-picker';
import { ZeldaCompanionService } from '../../service/zeldaCompanion-service';
import { ZeldaCompanion } from '../../model/zeldaCompanionInterface';

/**
 * Componente principal/padre de mi sección.
 * Gestiona el flujo de login de usuario y selección de compañeros de Zelda.
 */
@Component({
  selector: 'app-silvestre',
  standalone: true,
  imports: [RouterModule, CommonModule, LoginModalComponent, CompanionPickerComponent],
  templateUrl: './silvestreComponent.html',
  styleUrls: ['./silvestreComponent.css'],
})
export class SilvestreComponent {
  /** Visibilidad del modal de login */
  showLogin = false;

  /** Visibilidad del selector de compañeros */
  showPicker = false;

  /** Lista de todos los compañeros de Zelda disponibles */
  companions: ZeldaCompanion[] = [];

  /** Datos de usuario autenticado (nombre, email y compañero favorito) */
  selectedUser: null | { nombre: string; email: string; companionFav: string } = null;

  /** Compañero en ese momento eleccionado */
  selectedCompanion: ZeldaCompanion | null = null;

  /**
   * Constructor del componente.
   * @param companionService - Servicio para obtener los compañeros de Zelda
   */
  constructor(private companionService: ZeldaCompanionService) {
    this.loadCompanions();
  }

  /**
   * Carga lista completa de compañeros desde el servicio.
   */
  loadCompanions() {
    this.companionService.getAllCompanions().subscribe(list => (this.companions = list));
  }

  /**
   * Maneja el cierre del modal de login.
   * Si el usuario mandó datos, los almacena y busca el compañero favorito seleccionado.
   * @param payload - Datos del usuario (nombre, email, companionFav) o null si se canceló
   */
  onLoginClose(payload: any) {
    this.showLogin = false;
    if (payload) {
      this.selectedUser = payload;
      this.selectedCompanion = this.companions.find(c => c.id === payload.companionFav) ?? null;
    }
  }

  /**
   * Maneja el cierre del selector de compañeros.
   * Si se seleccionó un compañero, lo almacena como el de ahora.
   * @param c - Compañero seleccionado o null si se canceló
   */
  onPickerClose(c: ZeldaCompanion | null) {
    this.showPicker = false;
    if (c) this.selectedCompanion = c;
  }
}



