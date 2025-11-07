import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DinoServ } from '../../services/dino-serv';
import { Dino } from '../../model/dinoInterface';

/**
 * Componente para mostrar los detalles completos de un dinosaurio específico.
 * Recibe el nombre del dinosaurio como parámetro de ruta y obtiene
 * su información detallada desde Wikipedia.
 * Componente enrutado con ruta parametrizada: /calinescu/dino-details/:nombre
 */
@Component({
  selector: 'app-dino-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './dino-details.html',
  styleUrl: './dino-details.css',
  standalone: true
})
export class DinoDetails {
  /** Nombre del dinosaurio obtenido desde los parámetros de la ruta */
  nombreDino: string | null = null;
  
  /** Objeto Dino con la información completa del dinosaurio a mostrar */
  dino: Dino | undefined;

  /**
   * Constructor del componente.
   * @param route - ActivatedRoute para acceder a los parámetros de la URL
   * @param dinoServ - Servicio para obtener información de dinosaurios desde APIs
   */
  constructor(private route: ActivatedRoute, private dinoServ: DinoServ) {}

  /**
   * Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * Lee el parámetro 'nombre' de la URL y carga los detalles del dinosaurio.
   * Implementa el uso de rutas parametrizadas.
   * @example
   * // Ruta: /calinescu/dino-details/Tyrannosaurus
   * // this.nombreDino será "Tyrannosaurus"
   */
  ngOnInit() {
    // Leer el parámetro de la URL
    this.nombreDino = this.route.snapshot.paramMap.get('nombre');
    
    if (this.nombreDino) {
      this.getDinoDetails(this.nombreDino);
    }
  }

  /**
   * Obtiene los detalles completos de un dinosaurio desde Wikipedia.
   * Realiza una petición HTTP asíncrona y construye el objeto Dino
   * con la información recibida (extract, thumbnail).
   * @param name - Nombre del dinosaurio a buscar (ej: "Velociraptor")
   * @returns void - Los datos se almacenan en la propiedad dino
   * @example
   * this.getDinoDetails('Triceratops');
   * // Después de la respuesta, this.dino contendrá toda la información
   */
  getDinoDetails(name: string) {
    this.dinoServ.getDinoDescription(name).subscribe(dinoDetails => {
      console.log('Detalles recibidos de Wikipedia:', dinoDetails);
      // Crear el objeto Dino con los detalles de Wikipedia
      this.dino = {
        Name: name,
        Description: '',
        extract: dinoDetails.extract,
        thumbnail: dinoDetails.thumbnail
      };
      console.log('Dino cargado:', this.dino);
    });
  }
}
