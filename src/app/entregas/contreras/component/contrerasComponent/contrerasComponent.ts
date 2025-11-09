// Si estas leyendo esto los campeones son los personajes, lo he puesto asi porque luego me daba problemas con las variables al tar
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Champion } from '../ContrerasModel/contrerasInterface';
import { JsonplaceholderServiceContreras } from '../ContrerasService/contrerasjsonPlacesholder';

@Component({
  selector: 'app-contreras',
  imports: [CommonModule],
  templateUrl: './contrerasComponent.html',
  styleUrl: './contrerasComponent.css',
})
export class ContrerasComponent implements OnInit {
  
  // VARIABLES PRINCIPALES
  posts: Champion[] = [];
  campeon: Champion | null = null; // Default null
  buscador = false; 

  constructor(
    private oJsonplaceholderService: JsonplaceholderServiceContreras,
    private router: Router // Enviar comparador despues
  ) { }

  ngOnInit() {
    this.oJsonplaceholderService.getAllPosts().subscribe((data) => { // El get devuelve observable, so subscribe para tener los datos
      this.posts = Object.values(data.data || data); //uso data.data para las stats
    });
  }

  // Funcion para coger un campeon random
  campeon_Random() {
    if (this.posts.length > 0) {
      this.campeon = this.posts[Math.floor(Math.random() * this.posts.length)];
    }
  }

  // Funcion para buscar campeon por el input
  buscar_Campeon(nombre: string) { // nombre -> texto input
    const campeon = this.posts.find(c => c.name.toLowerCase().includes(nombre.toLowerCase())); // Recorro lista, paso a minusculas y miro si existe
    if (campeon) {
      this.campeon = campeon; // mostrar campeon
      this.buscador = false; // ocultar buscador
    } else {
      alert(`Nombre incorrecto Ej: Aatrox: ${nombre}`);
    }
  }

  ruta_Comparador() {
    this.router.navigate(['/contreras-comparador']);
  }
}
