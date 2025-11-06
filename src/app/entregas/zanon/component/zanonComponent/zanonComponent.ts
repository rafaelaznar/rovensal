import { Component } from '@angular/core';
import { ZanonService } from '../zanonService/zanon-service';
import { Libro } from '../zanonModel/zanonInterface';

@Component({
  selector: 'app-zanon',
  imports: [],
  templateUrl: './zanonComponent.html',
  styleUrl: './zanonComponent.css',
  standalone: true
})
export class ZanonComponent {

  libros: Libro[] = [];

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
    alert(`Título: ${libro.Title}\nAño de publicación: ${libro.Year}\nEditorial: ${libro.Publisher}\nISBN: ${libro.ISBN}\nCantidad de páginas: ${libro.Pages}`);
  }
}