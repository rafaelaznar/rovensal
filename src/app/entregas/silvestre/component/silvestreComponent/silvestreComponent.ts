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
  /** Visibilidad */
  showLogin = false;
  showPicker = false;

  /** Lista de compañeros de Zelda disponibles */
  companions: ZeldaCompanion[] = [];

  /** Datos de usuario autenticado (nombre, email y companionFav como string) */
  selectedUser: null | { nombre: string; email: string; companionFav: string } = null;

  /** Compañero elegido en ese momento*/
  selectedCompanion: ZeldaCompanion | null = null;

  constructor(private companionService: ZeldaCompanionService) {
    this.loadCompanions();
  }

  // Deduplicate companions by id (coerce id to string for keys)
  private dedupeById(list: ZeldaCompanion[]): ZeldaCompanion[] {
    const map = new Map<string, ZeldaCompanion>();
    for (const item of list) {
      map.set(String((item as any).id), item);
    }
    return Array.from(map.values());
  }

  /**
   * Carga lista completa de compañeros desde el servicio.
   */
  loadCompanions() {
    this.companionService.getAllCompanions().subscribe(list => {
      this.companions = this.dedupeById(list);
    });
  }

  /**
   * Maneja el cierre del modal de login.
   * Normaliza companionFav como string y busca el objeto companion existente.
   */
  onLoginClose(payload: unknown) {
    this.showLogin = false;
    if (!payload || typeof payload !== 'object') return;

    const p = payload as { nombre?: string; email?: string; companionFav?: string | number };
    const companionId = p.companionFav === undefined || p.companionFav === null ? '' : String(p.companionFav);

    this.selectedUser = {
      nombre: p.nombre ?? '',
      email: p.email ?? '',
      companionFav: companionId,
    };

    this.selectedCompanion = this.companions.find(c => String((c as any).id) === companionId) ?? null;
  }

  /**
   * Maneja el cierre del selector de compañeros.
   * Actualiza la selección y evita duplicados en la lista.
   */
  onPickerClose(c: ZeldaCompanion | null) {
    this.showPicker = false;
    if (!c) return;

    // Actualizar selección visible
    this.selectedCompanion = c;

    // Actualizar companionFav del usuario logueado (si existe)
    if (this.selectedUser) {
      this.selectedUser = { ...this.selectedUser, companionFav: String((c as any).id) };
    }

    // Añadir y deduplicar garantizando que no hay dos con mismo id
    this.companions = this.dedupeById([...this.companions, c]);
  }

  /**
   * Cierra la sesión: limpia usuario, compañero seleccionado y cierra modals
   */
  logout(): void {
    this.showLogin = false;
    this.showPicker = false;
    this.selectedUser = null;
    this.selectedCompanion = null;
  }
}



