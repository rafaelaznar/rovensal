import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DinoServ } from '../../services/dino-serv';
import { Dino } from '../../model/dinoInterface';

/**
 * Componente para mostrar la lista completa de dinosaurios.
 * Obtiene los datos desde una API externa y permite navegar a los detalles
 * de cada dinosaurio mediante rutas parametrizadas.
 * Incluye funcionalidad de búsqueda en tiempo real para filtrar dinosaurios.
 * Componente enrutado accesible desde /calinescu/lista
 */
@Component({
  selector: 'app-dino-component',
  imports: [RouterLink, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './dino-component.html',
  styleUrl: './dino-component.css',
})
export class DinoComponent {
 
  /**
   * Constructor del componente.
   * @param dinoServ - Servicio inyectado para obtener información de dinosaurios
   */
  constructor(private dinoServ:DinoServ) { }
  
  /** Array que almacena todos los dinosaurios obtenidos de la API */
  dinos: Dino[] = [];
  
  /** Array con dinosaurios filtrados según el término de búsqueda */
  dinosFiltrados: Dino[] = [];
  
  /** Término de búsqueda introducido por el usuario */
  searchTerm: string = '';
  
  /** Dinosaurio actualmente seleccionado por el usuario, undefined si no hay selección */
  selectedDino: Dino | undefined;
  
  /** 
   * Estado actual de carga de datos.
   * Valores posibles: 'cargando', 'cargado', 'vacio', 'error'
   */
  estadoCarga: 'cargando' | 'cargado' | 'vacio' | 'error' = 'cargando';
  
  /**
   * Hook del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Carga la lista inicial de dinosaurios al renderizar el componente.
   */
  ngOnInit(){
    this.getDinos();
  }

  /**
   * Obtiene la lista completa de dinosaurios desde la API externa.
   * Realiza una petición HTTP asíncrona y almacena los resultados
   * en el array dinos para ser mostrados en la vista.
   * Inicializa también dinosFiltrados con todos los dinosaurios.
   * Maneja los diferentes estados de carga: cargando, cargado, vacio, error.
   * @returns void - Los datos se almacenan en las propiedades dinos y dinosFiltrados
   * @example
   * this.getDinos();
   * // Después de la respuesta, this.dinos y this.dinosFiltrados contendrán el array de dinosaurios
   */
  getDinos(){
    this.estadoCarga = 'cargando';
    
    this.dinoServ.getAllDinos().subscribe({
      next: (dinos) => {
        this.dinos = dinos;
        this.dinosFiltrados = dinos;
        
        // Verificar si hay datos
        if (dinos.length === 0) {
          this.estadoCarga = 'vacio';
        } else {
          this.estadoCarga = 'cargado';
        }
      },
      error: (error) => {
        console.error('Error al cargar dinosaurios:', error);
        this.estadoCarga = 'error';
      }
    }); 
  }

  /**
   * Filtra la lista de dinosaurios según el término de búsqueda introducido.
   * Busca coincidencias en el nombre y la descripción (case-insensitive).
   * Se ejecuta automáticamente cada vez que cambia el input de búsqueda.
   * Si el término está vacío, muestra todos los dinosaurios.
   * @returns void - Los resultados filtrados se almacenan en dinosFiltrados
   * @example
   * this.searchTerm = 'Rex';
   * this.filtrarDinos();
   * // this.dinosFiltrados contendrá solo dinosaurios con 'rex' en nombre o descripción
   */
  filtrarDinos() {
    const termino = this.searchTerm.toLowerCase().trim();
    
    if (termino === '') {
      // Si no hay búsqueda, mostrar todos
      this.dinosFiltrados = this.dinos;
    } else {
      // Filtrar por nombre o descripción
      this.dinosFiltrados = this.dinos.filter(dino =>
        dino.Name.toLowerCase().includes(termino) ||
        dino.Description.toLowerCase().includes(termino)
      );
    }
  }

  /**
   * Limpia el término de búsqueda y restaura la lista completa de dinosaurios.
   * Restablece el input a vacío y muestra todos los resultados.
   * @returns void
   */
  limpiarBusqueda() {
    this.searchTerm = '';
    this.dinosFiltrados = this.dinos;
  }

  /**
   * Obtiene los detalles ampliados de un dinosaurio específico desde Wikipedia.
   * Busca el dinosaurio en el array local por nombre, obtiene información adicional
   * de Wikipedia (extract, thumbnail) y actualiza el objeto con estos datos.
   * @param name - Nombre del dinosaurio del que obtener detalles (ej: "Tyrannosaurus")
   * @returns void - El dinosaurio seleccionado se almacena en selectedDino
   * @example
   * this.getDinoDetails('Velociraptor');
   * // this.selectedDino contendrá el objeto con información extendida
   */
  getDinoDetails(name: string){
    this.dinoServ.getDinoDescription(name).subscribe(dinoDetails => {
      console.log('Detalles recibidos de Wikipedia:', dinoDetails);
      // Buscar el dinosaurio por nombre
      const dino = this.dinos.find(d => d.Name === name);
      if (dino) {
        // Añadir los detalles de Wikipedia al dinosaurio
        dino.extract = dinoDetails.extract;
        dino.thumbnail = dinoDetails.thumbnail;
        this.selectedDino = dino;
        console.log('Dino actualizado:', this.selectedDino);
      }
    });
  }
  
  /**
   * Navega a la página de detalles del dinosaurio seleccionado.
   * Utiliza window.location para redirigir a la ruta parametrizada.
   * @deprecated Usar RouterLink en el template es preferible para navegación SPA
   * @returns void
   */
  irADinoDetails() {
    window.location.href = 'dino-details/' + this.selectedDino?.Name;
  }
}
