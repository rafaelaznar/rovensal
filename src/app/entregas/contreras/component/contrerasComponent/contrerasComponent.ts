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
  campeonMostrado: Champion | null = null;
  mostrarBuscador = false;

  constructor(private oJsonplaceholderService: JsonplaceholderServiceContreras) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.oJsonplaceholderService.getAllPosts().subscribe((data) => {
      this.posts = Object.values(data.data || data);
    });
  }

  campeonAleatorio(): void {
    if (this.posts.length === 0) {
      this.getPosts();
      return;
    }
    
    const randomChampion = this.posts[Math.floor(Math.random() * this.posts.length)];
    this.campeonMostrado = randomChampion;
  }

  buscarCampeonEspecifico(nombre: string): void {
    if (!nombre.trim()) {
      alert('Por favor, ingresa un nombre de campeón');
      return;
    }

    const campeonEncontrado = this.posts.find(champion => 
      champion.name.toLowerCase().includes(nombre.toLowerCase())
    );

    if (campeonEncontrado) {
      this.campeonMostrado = campeonEncontrado;
      this.mostrarBuscador = false;
    } else {
      alert(`No se encontró ningún campeón con el nombre "${nombre}"`);
    }
  }
}
