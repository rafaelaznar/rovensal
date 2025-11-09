import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ZeldaPersonajesService } from '../../service/zeldaPersonaje-service';
import { ZeldaPersonaje } from '../../model/zeldaPersonajeInterface';

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

  constructor(private oPersonajesService: ZeldaPersonajesService) {}

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


  verDetalles(personaje: ZeldaPersonaje) {
    this.personajeSeleccionado = personaje;
  }

  cerrarDetalles() {
    this.personajeSeleccionado = null;
  }
}
