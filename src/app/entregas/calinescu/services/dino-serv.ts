import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dino } from '../model/dinoInterface';
import { WikipediaResponse } from '../model/dinoDetailsInterface';

/**
 * Servicio singleton para gestionar operaciones relacionadas con dinosaurios.
 * Proporciona métodos para obtener datos de dinosaurios desde APIs externas.
 * @Injectable con providedIn: 'root' para ser utilizado en toda la aplicación.
 */
@Injectable({
  providedIn: 'root'
})
export class DinoServ {
  dino:Dino[]= [];
  
  constructor(private oHttp: HttpClient) { }
  
  /**
   * Obtiene la lista completa de dinosaurios desde la API de dinosaur-facts-api.
   * Realiza una petición HTTP GET para recuperar todos los dinosaurios disponibles.
   * @returns Observable que emite un array de objetos Dino con información básica de cada dinosaurio
   * @example
   * this.dinoServ.getAllDinos().subscribe(dinos => {
   *   console.log(dinos); // Array de dinosaurios
   * });
   */
  getAllDinos():Observable<Dino[]>{
    return this.oHttp.get<Dino[]>('https://dinosaur-facts-api.shultzlab.com/dinosaurs');
  }
  
  /**
   * Obtiene información detallada de un dinosaurio específico desde Wikipedia.
   * Realiza una petición HTTP GET a la API REST v1 de Wikipedia.
   * @param name - Nombre del dinosaurio a buscar (ej: "Tyrannosaurus", "Velociraptor")
   * @returns Observable que emite un objeto WikipediaResponse con extract y thumbnail del dinosaurio
   * @example
   * this.dinoServ.getDinoDescription('Tyrannosaurus').subscribe(detalles => {
   *   console.log(detalles.extract); // Descripción del dinosaurio
   *   console.log(detalles.thumbnail?.source); // URL de la imagen
   * });
   */
  getDinoDescription(name: string): Observable<WikipediaResponse> {
    return this.oHttp.get<WikipediaResponse>('https://en.wikipedia.org/api/rest_v1/page/summary/' + name);
  }
}
