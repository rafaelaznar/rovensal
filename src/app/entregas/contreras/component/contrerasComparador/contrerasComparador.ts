import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Champion } from '../ContrerasModel/contrerasInterface';
import { JsonplaceholderServiceContreras } from '../ContrerasService/contrerasjsonPlacesholder';

@Component({
  selector: 'app-contreras-comparador',
  imports: [CommonModule],
  templateUrl: './contrerasComparador.html',
  styleUrl: './contrerasComparador.css',
})
export class ContrerasComparadorComponent implements OnInit {
  
  posts: Champion[] = [];
  campeon1: Champion | null = null;
  campeon2: Champion | null = null;

  constructor(private oJsonplaceholderService: JsonplaceholderServiceContreras) { }

  ngOnInit() {
    this.oJsonplaceholderService.getAllPosts().subscribe((data) => {
      this.posts = Object.values(data.data || data);
    });
  }

  buscar1(nombre: string) {
    const campeon = this.posts.find(c => c.name.toLowerCase().includes(nombre.toLowerCase()));
    if (campeon) {
      this.campeon1 = campeon;
    } else {
      alert(`Nombre incorrecto Ej: Aatrox: ${nombre}`);
    }
  }

  buscar2(nombre: string) {
    const campeon = this.posts.find(c => c.name.toLowerCase().includes(nombre.toLowerCase()));
    if (campeon) {
      this.campeon2 = campeon;
    } else {
      alert(`Nombre incorrecto Ej: Gragas: ${nombre}`);
    }
  }

  aleatorio1() {
    if (this.posts.length > 0) {
      this.campeon1 = this.posts[Math.floor(Math.random() * this.posts.length)];
    }
  }

  aleatorio2() {
    if (this.posts.length > 0) {
      this.campeon2 = this.posts[Math.floor(Math.random() * this.posts.length)];
    }
  }

  limpiar() {
    this.campeon1 = null;
    this.campeon2 = null;
  }

  getClaseComparacion(stat1: number | undefined, stat2: number | undefined): string {
    if (!stat1 || !stat2) return '';
    if (stat1 > stat2) return 'stat-mayor';
    if (stat1 < stat2) return 'stat-menor';
    return 'stat-igual';
  }

  rolesComunes(): string[] {
    if (!this.campeon1 || !this.campeon2) return [];
    return this.campeon1.roles.filter(role => this.campeon2!.roles.includes(role));
  }
}