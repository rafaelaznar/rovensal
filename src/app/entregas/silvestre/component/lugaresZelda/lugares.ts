import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ZeldaLugaresService } from '../../service/zeldaLugar-service';
import { ZeldaLugar } from '../../model/zeldaLugarInterface';

@Component({
  selector: 'app-lugares',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lugares.html',
  styleUrls: ['./lugares.css'],
  providers: [ZeldaLugaresService],
})
export class LugaresComponent implements OnInit {
  lugares: ZeldaLugar[] = [];
  cargando = true;
  error = '';
  lugarSeleccionado: ZeldaLugar | null = null;

  constructor(private lugaresService: ZeldaLugaresService) {}

  ngOnInit() {
    this.lugaresService.getLugares().subscribe({
      next: (data) => {
        this.lugares = data.data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar los lugares.';
        this.cargando = false;
      },
    });
  }

  verDetalles(lugar: ZeldaLugar) {
    // Si el lugar no tiene los nombres resueltos, resolverlos ahora
    if (!lugar.appearancesNames && !lugar.inhabitantsNames) {
      this.lugaresService.resolverDatosLugar(lugar).subscribe({
        next: (lugarResuelto) => {
          this.lugarSeleccionado = lugarResuelto;
        },
        error: () => {
          this.lugarSeleccionado = lugar; // Mostrar sin resolver si hay error
        }
      });
    } else {
      this.lugarSeleccionado = lugar;
    }
  }

  cerrarDetalles() {
    this.lugarSeleccionado = null;
  }
}
