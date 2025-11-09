import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ZeldaJuegosService } from '../../service/zeldaJuego-service';
import { ZeldaJuego } from '../../model/zeldaJuegoInterface';

@Component({
  selector: 'app-juegos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './juegos.html',
  styleUrl: './juegos.css',
  providers: [ZeldaJuegosService],
})
export class JuegosComponent implements OnInit {
  juegos: any[] = [];
  cargando = true;
  error = '';
  juegoSeleccionado: ZeldaJuego | null = null;

  constructor(private oJuegosService: ZeldaJuegosService) {}

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

  verDetalles(juego: ZeldaJuego) {
    this.juegoSeleccionado = juego;
  }

  cerrarDetalles() {
    this.juegoSeleccionado = null;
  }

  trackById(index: number, item: ZeldaJuego) {
    return item.id ?? index;
  }
}
