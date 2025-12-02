import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ZeldaLugaresService } from '../../service/zeldaLugar-service';
import { ZeldaLugar } from '../../model/zeldaLugarInterface';

/**
 * Componente para mostrar el listado de lugares de Zelda.
 * Permite visualizar los lugares y ver los detalles de cada uno con información resuelta.
 */
@Component({
  selector: 'app-lugares',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lugares.html',
  styleUrls: ['./lugares.css'],
  providers: [ZeldaLugaresService],
})
export class LugaresComponent implements OnInit {
  /** Array con los lugares cargados desde la API */
  lugares: ZeldaLugar[] = [];

  /** Indicador de estado de carga (true mientras se solicita) */
  cargando = true;

  /** Mensaje de error en caso de fallo al cargar los lugares */
  error = '';

  /** Lugar actualmente seleccionado para mostrar detalles. null indica ninguno */
  lugarSeleccionado: ZeldaLugar | null = null;

  /**
   * Constructor del componente.
   * @param lugaresService - Servicio para obtener los lugares de Zelda
   */
  constructor(private lugaresService: ZeldaLugaresService) {}

  /**
   * Inicializa el componente.
   * Solicita lista de lugares y mantiene `cargando` en true hasta obtener respuesta o error.
   */
  ngOnInit() {
    this.lugaresService.getLugares().subscribe({
      next: (data) => {
        // data.data contiene el array de ZeldaLugar
        this.lugares = data.data;
        this.cargando = false;
      },
      error: () => {
        // Error: mostramos mensaje y desactivamos el cargando
        this.error = 'Error al cargar los lugares.';
        this.cargando = false;
      },
    });
  }

  /**
   * Solicita y muestra los detalles de un lugar.
   * Si el lugar no tiene campos resueltos (nombres de apariciones o habitantes),
   * llama al servicio para resolver los datos faltantes.
   * @param lugar - Lugar del que se quieren ver los detalles
   */
  verDetalles(lugar: ZeldaLugar) {
    // Comprobamos si ya tenemos los nombres resueltos para evitar llamadas absurdas
    if (!lugar.appearancesNames && !lugar.inhabitantsNames) {
      // Llamada asíncrona para resolver los datos faltantes
      this.lugaresService.resolverDatosLugar(lugar).subscribe({
        next: (lugarResuelto) => {
          // Todo ok? Mostramos la versión resuelta
          this.lugarSeleccionado = lugarResuelto;
        },
        error: () => {
          // En caso de error mostramos al menos el objeto original sin resolver
          this.lugarSeleccionado = lugar;
        }
      });
    } else {
      // Si ya están resueltos, no hace falta llamar a nada
      this.lugarSeleccionado = lugar;
    }
  }

  /**
   * Cierra el panel/modal de detalles y limpia la selección.
   */
  cerrarDetalles() {
    this.lugarSeleccionado = null;
  }
}
