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
  // VARIABLES PRINCIPALES
  posts: Champion[] = [];
  campeon1: Champion | null = null;
  campeon2: Champion | null = null;

  constructor(private oJsonplaceholderService: JsonplaceholderServiceContreras) { }

  ngOnInit() {
    this.oJsonplaceholderService.getAllPosts().subscribe((data) => { // El get devuelve observable, so subscribe para tener los datos
      this.posts = Object.values(data.data || data); //uso data.data para las stats
    });
  }

  // Estas funciones ya estan usadas en ContrerasComponent, simplemente las he modificado un poco.
  // Funcion para coger texto input y buscar el campeon 
  buscar_c1(nombre: string) { // nombre -> texto input
    const campeon = this.posts.find(c => c.name.toLowerCase().includes(nombre.toLowerCase())); // Recorro lista, paso a minusculas y miro si existe
    if (campeon) {
      this.campeon1 = campeon; // mostrar campeon
    } else {
      alert(`Nombre incorrecto Ej: Aatrox: ${nombre}`);
    }
  }
  
  // La misma que arriba pero para el campeon 2
  buscar_c2(nombre: string) { // nombre -> texto input
    const campeon = this.posts.find(c => c.name.toLowerCase().includes(nombre.toLowerCase())); // Recorro lista, paso a minusculas y miro si existe
    if (campeon) {
      this.campeon2 = campeon; // mostrar campeon
    } else {
      alert(`Nombre incorrecto Ej: Gragas: ${nombre}`);
    }
  }

  // Coger campeon random
  aleatorio_c1() {
    if (this.posts.length > 0) {
      this.campeon1 = this.posts[Math.floor(Math.random() * this.posts.length)];
    }
  }

  // Coger campeon random
  aleatorio_c2() {
    if (this.posts.length > 0) {
      this.campeon2 = this.posts[Math.floor(Math.random() * this.posts.length)];
    }
  }

  // Vaciar los inputs
  vaciar_Texto() {
    this.campeon1 = null;
    this.campeon2 = null;
  }

  // Funcion para comparar stats
  comparacion_Stats(stat1: number | undefined, stat2: number | undefined): string {
    if (!stat1 || !stat2) return ''; // Comprobante por si alguno de los stats no los coge
    if (stat1 > stat2) return 'mayor';
    if (stat1 < stat2) return 'menor';
    return 'igual';
  }

  // Funcion para comprar roles
  roles_Comunes(): string[] {
    if (!this.campeon1 || !this.campeon2) return [];
    return this.campeon1.roles.filter(role => this.campeon2!.roles.includes(role));
  }
}