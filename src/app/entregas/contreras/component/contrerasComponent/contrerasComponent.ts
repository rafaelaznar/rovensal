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
    this.oJsonplaceholderService.getAllPosts().subscribe((data) => {
      this.posts = Object.values(data.data || data);
    });
  }

  campeonAleatorio() {
    if (this.posts.length > 0) {
      this.campeonMostrado = this.posts[Math.floor(Math.random() * this.posts.length)];
    }
  }

  buscarCampeon(nombre: string) {
    const campeon = this.posts.find(c => c.name.toLowerCase().includes(nombre.toLowerCase()));
    if (campeon) {
      this.campeonMostrado = campeon;
      this.mostrarBuscador = false;
    } else {
      alert(`No encontrado: ${nombre}`);
    }
  }
}
