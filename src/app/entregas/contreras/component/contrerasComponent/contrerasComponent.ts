import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Champion } from '../ContrerasModel/contrerasInterface';
import { JsonplaceholderServiceContreras } from '../ContrerasService/contrerasjsonPlacesholder';

@Component({
  selector: 'app-contreras',
  imports: [CommonModule],
  templateUrl: './contrerasComponent.html',
  styleUrl: './contrerasComponent.css',
})
export class ContrerasComponent implements OnInit {

  posts: Champion[] = [];

  constructor(private oJsonplaceholderService: JsonplaceholderServiceContreras) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.oJsonplaceholderService.getAllPosts().subscribe((data) => {
      console.log('Datos completos:', data);
      this.posts = Object.values(data.data || data);
      console.log('Total campeones:', this.posts.length);
      console.log('Primeros 3 campeones:', this.posts.slice(0, 3));
      // Verificar stats del primer campeón
      if (this.posts.length > 0) {
        console.log('Stats del primer campeón:', this.posts[0].stats);
      }
    });
  }

  // Método para el botón (mantener compatibilidad con el HTML actual)
  buscarCampeon(): void {
    if (this.posts.length === 0) {
      console.log('Cargando campeones...');
      this.getPosts();
    } else {
      const randomChampion = this.posts[Math.floor(Math.random() * this.posts.length)];
      console.log('Campeón seleccionado:', randomChampion.name);
      alert(`¡Campeón encontrado: ${randomChampion.name}!`);
    }
  }
}
