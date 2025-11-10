import { Component, inject, signal, computed, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ServicioAnimalesExtintos } from '../../services/animales-extintos.servicio';
import { AnimalExtinto } from '../../models/animal.interfaz';
import { TarjetaAnimal } from '../tarjeta-animal/tarjeta-animal';
import { DialogoDetalleAnimal } from '../dialogo-detalle-animal/dialogo-detalle-animal';

/**
 * Componente enrutado que muestra una lista de animales extintos
 * Utiliza signals para gestionar el estado, computed para estado derivado
 * y OnPush para optimizar el rendimiento
 */
@Component({
  selector: 'app-lista-animales',
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    FormsModule,
    TarjetaAnimal
  ],
  templateUrl: './lista-animales.html',
  styleUrl: './lista-animales.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaAnimales implements OnInit {
  /** Servicio inyectado para obtener datos de animales */
  private readonly servicioAnimales = inject(ServicioAnimalesExtintos);
  
  /** Servicio de diálogos de Angular Material */
  private readonly dialogo = inject(MatDialog);

  /** Signal que almacena todos los animales cargados */
  private todosLosAnimales = signal<AnimalExtinto[]>([]);
  
  /** Signal que almacena el término de búsqueda */
  terminoBusqueda = signal<string>('');
  
  /** Signal que almacena el filtro de ubicación */
  filtroUbicacion = signal<string>('');
  
  /** Signal que indica si se están cargando datos */
  cargando = signal<boolean>(false);
  
  /** Signal que almacena el número de animales a cargar */
  cantidadAnimales = signal<number>(20);

  /** Computed signal que filtra los animales según los criterios de búsqueda */
  animalesFiltrados = computed(() => {
    let animales = this.todosLosAnimales();
    
    // Filtrar por nombre si hay término de búsqueda
    if (this.terminoBusqueda()) {
      animales = this.servicioAnimales.filtrarAnimalesPorNombre(animales, this.terminoBusqueda());
    }
    
    // Filtrar por ubicación si hay filtro
    if (this.filtroUbicacion()) {
      animales = this.servicioAnimales.filtrarAnimalesPorUbicacion(animales, this.filtroUbicacion());
    }
    
    return animales;
  });

  /** Opciones para el selector de cantidad de animales */
  opcionesCantidad = [10, 20, 50, 100];

  /**
   * Constructor vacío - ngOnInit se usa para la inicialización
   */
  constructor() {}

  /**
   * Ciclo de vida OnInit - se ejecuta después del constructor
   * Carga los datos iniciales de animales
   */
  ngOnInit(): void {
    this.cargarAnimales();
  }

  /**
   * Carga animales desde la API
   */
  cargarAnimales(): void {
    this.cargando.set(true);
    
    this.servicioAnimales.obtenerAnimales(this.cantidadAnimales()).subscribe({
      next: (animales) => {
        this.todosLosAnimales.set(animales);
        this.cargando.set(false);
      },
      error: (error) => {
        console.error('Error cargando animales:', error);
        this.cargando.set(false);
      }
    });
  }

  /**
   * Maneja el cambio en el término de búsqueda
   * @param evento - Evento del input
   */
  alCambiarBusqueda(evento: Event): void {
    const valor = (evento.target as HTMLInputElement).value;
    this.terminoBusqueda.set(valor);
  }

  /**
   * Maneja el cambio en el filtro de ubicación
   * @param evento - Evento del input
   */
  alCambiarUbicacion(evento: Event): void {
    const valor = (evento.target as HTMLInputElement).value;
    this.filtroUbicacion.set(valor);
  }

  /**
   * Maneja el cambio en la cantidad de animales a cargar
   */
  alCambiarCantidad(): void {
    this.cargarAnimales();
  }

  /**
   * Limpia todos los filtros
   */
  limpiarFiltros(): void {
    this.terminoBusqueda.set('');
    this.filtroUbicacion.set('');
  }

  /**
   * Carga un animal aleatorio
   */
  cargarAnimalAleatorio(): void {
    this.cargando.set(true);
    
    this.servicioAnimales.obtenerAnimalAleatorio(true).subscribe({
      next: (animal) => {
        if (animal) {
          this.todosLosAnimales.set([animal]);
        }
        this.cargando.set(false);
      },
      error: (error) => {
        console.error('Error cargando animal aleatorio:', error);
        this.cargando.set(false);
      }
    });
  }

  /**
   * Abre el diálogo con los detalles del animal
   * Comunicación bidireccional: envía datos al diálogo y puede recibir respuesta
   * @param animal - Animal a mostrar en el diálogo
   */
  abrirDetallesAnimal(animal: AnimalExtinto): void {
    this.dialogo.open(DialogoDetalleAnimal, {
      data: animal,
      width: '700px',
      maxHeight: '90vh'
    });
  }
}
