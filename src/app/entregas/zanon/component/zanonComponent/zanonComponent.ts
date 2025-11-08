import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { ZanonService } from '../zanonService/zanon-service';
import { Libro } from '../zanonModel/zanonInterface';
import { MatDialog } from '@angular/material/dialog';
import { DatosUnroutedComponent } from '../datosUnroutedComponent/datos-unrouted-component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-zanon',
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './zanonComponent.html',
  styleUrl: './zanonComponent.css',
})
export class ZanonComponent {

  libros: Libro[] = [];
  librosPagina: Libro[] = [];

  pageSize = 4;
  pageIndex = 0;
  length = 0;

  // Se crea una referencia directa en el Typescript al componente "<mat-paginator>" del HTML
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  oMatDialog = inject(MatDialog);

  constructor(private oZanonService: ZanonService) {

  }

  ngOnInit() {
    this.getLibro();
  }

  getLibro() {
    this.oZanonService.getAll().subscribe({
      next: (librosCargados: Libro[]) => {
        console.log("¡Libros cargados con éxito! ", librosCargados);

        // Se guardan todos los libros
        this.libros = librosCargados;

        this.length = librosCargados.length;
        this.actualizarPagina();
      },
      error: err => console.error("Error al cargar los libros: ", err)
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

  actualizarPagina() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    // "slice()" crea un subarray con solo los libros que se han seleccionado
    this.librosPagina = this.libros.slice(startIndex, endIndex);
  }

  // Se ejecuta cada vez que el usuario cambia la página en el "paginator"
  cambioPagina(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.actualizarPagina();
  }
}