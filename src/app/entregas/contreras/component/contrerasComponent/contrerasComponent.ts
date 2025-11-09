// Si estas leyendo esto los campeones son los personajes, lo he puesto asi porque luego me daba problemas con las variables
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
      this.posts = Object.values(data.data || data);
    });
  }

  campeon_Random() {
    if (this.posts.length > 0) {
      this.campeon = this.posts[Math.floor(Math.random() * this.posts.length)];
    }
  }

  buscar_Campeon(nombre: string) {
    const campeon = this.posts.find(c => c.name.toLowerCase().includes(nombre.toLowerCase()));
    if (campeon) {
      this.campeon = campeon;
      this.buscador = false;
    } else {
      alert(`No encontrado: ${nombre}`);
    }
  }

  irAComparador() {
    this.router.navigate(['/contreras-comparador']);
  }
}
