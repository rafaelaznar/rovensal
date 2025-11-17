// Si estas leyendo esto los campeones son los personajes, lo he puesto asi porque luego me daba problemas con las variables al tar
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Champion } from '../contrerasModel/contrerasInterface';
import { JsonplaceholderServiceContreras } from '../contrerasService/contrerasjsonPlaceholder';
import { ListaCampeonesComponent } from '../listaCampeones/listaCampeones';

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
  no_Encontrado = '';
  
  // Expr regular nombres
  private readonly nombreRegex = /^[a-zA-Z'.\s]{2,20}$/;
  
  readonly oMatDialog = inject(MatDialog);

  constructor(
    private oJsonplaceholderService: JsonplaceholderServiceContreras,
    private router: Router, // Enviar comparador despues
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.oJsonplaceholderService.getAllPosts().subscribe((data) => { // El get devuelve observable, so subscribe para tener los datos
      this.posts = Object.values(data.data || data); // uso data.data para las stats
      
      const id = this.route.snapshot.params['id'];// Verificar si exise el ID 
      if (id) {
        this.buscar_ID(parseInt(id));
      }
    });
  }
  
  // Funcion simple para buscar por ID (parametro de ruta)
  buscar_ID(id: number) {
    const campeon = this.posts.find(c => c.id === id);
    if (campeon) {
      this.campeon = campeon;
    }
  }

  // Funcion para coger un campeon random
  campeon_Random() {
    if (this.posts.length > 0) {
      this.campeon = this.posts[Math.floor(Math.random() * this.posts.length)];
    }
  }

  // Funcion para buscar campeon por el input con validacion RegEx
  buscar_Campeon(nombre: string) { // nombre -> texto input
    this.no_Encontrado = ''; // Limpiar error previo
    
    // Validar con expresion regular
    if (!nombre.trim()) {
      this.no_Encontrado = 'Debes escribir un nombre valido';
      return;
    }
    
    // Comprobacion expr regular
    if (!this.nombreRegex.test(nombre)) {
      this.no_Encontrado = 'Nombre invalido. Solo letras, espacios y apostrofes (2-20 letras)';
      return;
    }
    
    const campeon = this.posts.find(c => c.name.toLowerCase().includes(nombre.toLowerCase())); // Recorro lista, paso a minusculas y miro si existe
    if (campeon) {
      this.campeon = campeon; // mostrar campeon
      this.buscador = false; // ocultar buscador
      // Navegar con parametro para que se pueda compartir la URL
      this.router.navigate(['/contreras', campeon.id]);
    } else {
      this.no_Encontrado = `No se encontro: "${nombre}". Ej: Aatrox, Ahri`;
    }
  }

  ruta_Comparador() {
    this.router.navigate(['/contreras_comparador']);
  }

  // Funcion para mostrar todos los campeones en un dialogo
  mostrar_Campeones() {
    const dialogRef = this.oMatDialog.open(ListaCampeonesComponent, {
      height: '700px',
      width: '900px',
      data: {
        campeones: this.posts
      }
    });

    // Si el usuario selecciona un campeon, lo asignamos
    dialogRef.afterClosed().subscribe(campeon_Seleccionado => {
      if (campeon_Seleccionado) {
        this.campeon = campeon_Seleccionado;
      }
    });
  }
}
