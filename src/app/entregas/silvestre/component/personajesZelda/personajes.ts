import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ZeldaPersonajesService } from '../../service/zeldaPersonaje-service';
import { ZeldaPersonaje } from '../../model/zeldaPersonajeInterface';

/**
 * Componente para mostrar el listado de personajes de Zelda.
 * Permite visualizar los personajes y ver los detalles de cada uno.
 */
@Component({
  selector: 'app-personajes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './personajes.html',
  styleUrl: './personajes.css',
  providers: [ZeldaPersonajesService],
})
export class PersonajesComponent implements OnInit {

  personajes: ZeldaPersonaje[] = [];
  cargando = true;
  error = '';
  personajeSeleccionado: ZeldaPersonaje | null = null;

  /**
   * Constructor del componente.
   * @param oPersonajesService - Servicio para obtener los personajes de Zelda
   */
  constructor(private oPersonajesService: ZeldaPersonajesService) {}

  /**
   * Inicializa el componente.
   * Carga los primeros 10 personajes al iniciar.
   */
  ngOnInit() {
    this.oPersonajesService.getTodosPersonajes(10).subscribe({
      next: (data) => {
        this.personajes = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar los personajes.';
        this.cargando = false;
      },
    });
  }

  /**
   * Muestra los detalles de un personaje seleccionado.
   * @param personaje - Personaje del que se quieren ver los detalles
   */
  verDetalles(personaje: ZeldaPersonaje) {
    this.personajeSeleccionado = personaje;
  }

  /**
   * Cierra la vista de detalles del personaje.
   */
  cerrarDetalles() {
    this.personajeSeleccionado = null;
  }
}
