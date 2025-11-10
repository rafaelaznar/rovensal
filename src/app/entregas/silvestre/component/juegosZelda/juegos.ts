import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ZeldaJuegosService } from '../../service/zeldaJuego-service';
import { ZeldaJuego } from '../../model/zeldaJuegoInterface';

/**
 * Componente para mostrar y gestionar la lista de juegos de Zelda
 * Permite visualizar información básica y detallada de cada juego
 */
@Component({
  selector: 'app-juegos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './juegos.html',
  styleUrl: './juegos.css',
  providers: [ZeldaJuegosService],
})
export class JuegosComponent implements OnInit {
  /** Lista de todos los juegos cargados desde la API */
  juegos: ZeldaJuego[] = [];
  /** Indica si los datos están cargando */
  cargando = true;
  /** Mensaje de error en caso de fallo */
  error = '';
  /** Juego actualmente seleccionado para mostrar detalles */
  juegoSeleccionado: ZeldaJuego | null = null;

  constructor(private oJuegosService: ZeldaJuegosService) {}

  /**
   * Ciclo de vida del componente
   * Se ejecuta después de la inicialización del componente
   * Carga los juegos desde la API
   */
  ngOnInit() {
    this.oJuegosService.getJuegos().subscribe({
      next: (data) => {
        this.juegos = data.data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar los juegos.';
        this.cargando = false;
      },
    });
  }

  /**
   * Selecciona un juego para mostrar sus detalles en un modal
   * @param juego - Juego a mostrar
   */
  verDetalles(juego: ZeldaJuego) {
    this.juegoSeleccionado = juego;
  }

  /**
   * Cierra el modal de detalles del juego
   */
  cerrarDetalles() {
    this.juegoSeleccionado = null;
  }

  /**
   * Función para optimizar el renderizado del @for
   * @param index - Índice del elemento
   * @param item - Juego actual
   * @returns ID del juego o índice si no hay ID
   */
  trackById(index: number, item: ZeldaJuego) {
    return item.id ?? index;
  }
}
