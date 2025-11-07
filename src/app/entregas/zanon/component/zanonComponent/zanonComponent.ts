import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { ZanonService } from '../zanonService/zanon-service';
import { Libro } from '../zanonModel/zanonInterface';
import { MatDialog } from '@angular/material/dialog';
import { DatosUnroutedComponent } from '../datosUnroutedComponent/datos-unrouted-component';
import { OpenLibraryService } from '../zanonService/open-library-service';
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-zanon',
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './zanonComponent.html',
  styleUrl: './zanonComponent.css',
  standalone: true
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

  constructor(private oZanonService: ZanonService, private oOpenLibraryService: OpenLibraryService) {

  }

  ngOnInit() {
    this.getLibro();
  }

  getLibro() {
    this.oZanonService.getAll().pipe (
      switchMap((libros: Libro[]) => {
        const peticiones = libros.map(libro =>

          // "(libro.ISBN || '').replace(/[^0-9X]/gi, '')" normaliza el ISBN del libro.
          // Entonces, llama al servicio OpenLibraryService y devuelve un "Observable" que luego será procesado en el "pipe()"
          this.oOpenLibraryService.obtenerInfoLibro((libro.ISBN || '').replace(/[^0-9X]/gi, '')).pipe (
            map(info => ({
              ...libro, // Conserva los datos del libro original
              coverUrl: info.coverUrl, // Añade la portada
              description: info.description // Añade la descripción
            })),

            // "catchError()" garantiza que cada llamada individual a OpenLibraryService nunca lanze un error fatal.
            // En su lugar, devuelve un valor por defecto
            catchError(() => of({
              ...libro, // Conserva también aquí los datos del libro original
              coverUrl: 'zanon/placeholder-cover.png',
              description: 'Descripción no disponible'
            }))
          )
        );

        // "forkJoin()" combina todos los observables y emite un único array con todos los resultados
        return forkJoin(peticiones);
      })
    ).subscribe({
      next: (librosCargados: Libro[]) => {
        console.log("¡Libros cargados con éxito! ", librosCargados);
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