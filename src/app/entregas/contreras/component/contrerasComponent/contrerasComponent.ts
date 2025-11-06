import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Champion } from '../ContrerasModel/contrerasInterface';
import { JsonplaceholderServiceContreras } from '../ContrerasService/contrerasjsonPlacesholder';

@Component({
  selector: 'app-contreras',
  imports: [CommonModule],
  templateUrl: './contrerasComponent.html',
  styleUrl: './contrerasComponent.css',
  standalone: true
})
export class ContrerasComponent implements OnInit {

  posts: Champion[] = [];
  
  private http = inject(HttpClient);
  private oJsonplaceholderService = new JsonplaceholderServiceContreras(this.http);

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.oJsonplaceholderService.getAllPosts().subscribe((data) => {
      console.log(data);
      this.posts = Object.values(data.data);
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
