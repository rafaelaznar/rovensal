import { Component, inject } from '@angular/core';
import { ZanonService } from '../zanonService/zanon-service';
import { Libro } from '../zanonModel/zanonInterface';
import { MatDialog } from '@angular/material/dialog';
import { DatosUnroutedComponent } from '../datosUnroutedComponent/datos-unrouted-component';

@Component({
  selector: 'app-zanon',
  imports: [],
  templateUrl: './zanonComponent.html',
  styleUrl: './zanonComponent.css',
  standalone: true
})
export class ZanonComponent {

  libros: Libro[] = [];

  oMatDialog = inject(MatDialog);

  constructor(private oZanonService: ZanonService) {

  }

  ngOnInit() {
    this.getLibro();
  }

  getLibro() {
    this.oZanonService.getAll().subscribe((libro: Libro[]) => {
      console.log("Datos cargados de la API al arrancar la página: ", libro);
      this.libros = libro;
    });
  }

  verInformacionLibro(libro: Libro) {
    console.log("Datos cargador de un libro: ", libro);

    this.oMatDialog.open(DatosUnroutedComponent, {
      height: '400px',
      width: '600px',
      data: {
        oLibro: libro,
      }
    });
  }
}