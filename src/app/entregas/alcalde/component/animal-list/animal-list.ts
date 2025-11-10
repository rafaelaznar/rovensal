import { Component, inject, signal, computed, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ExtinctAnimalsService } from '../../services/extinct-animals.service';
import { ExtinctAnimal } from '../../models/animal.interface';
import { AnimalCardComponent } from '../animal-card/animal-card';
import { AnimalDetailDialogComponent } from '../animal-detail-dialog/animal-detail-dialog';

/**
 * Componente enrutado que muestra una lista de animales extintos
 * Utiliza signals para gestionar el estado, computed para estado derivado
 * y OnPush para optimizar el rendimiento
 */
@Component({
  selector: 'app-animal-list',
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    FormsModule,
    AnimalCardComponent
  ],
  templateUrl: './animal-list.html',
  styleUrl: './animal-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimalListComponent implements OnInit {
  /** Servicio inyectado para obtener datos de animales */
  private readonly animalsService = inject(ExtinctAnimalsService);
  
  /** Servicio de diálogos de Angular Material */
  private readonly dialog = inject(MatDialog);

  /** Signal que almacena todos los animales cargados */
  private allAnimals = signal<ExtinctAnimal[]>([]);
  
  /** Signal que almacena el término de búsqueda */
  searchTerm = signal<string>('');
  
  /** Signal que almacena el filtro de ubicación */
  locationFilter = signal<string>('');
  
  /** Signal que indica si se están cargando datos */
  loading = signal<boolean>(false);
  
  /** Signal que almacena el número de animales a cargar */
  animalCount = signal<number>(20);

  /** Computed signal que filtra los animales según los criterios de búsqueda */
  filteredAnimals = computed(() => {
    let animals = this.allAnimals();
    
    // Filtrar por nombre si hay término de búsqueda
    if (this.searchTerm()) {
      animals = this.animalsService.filterAnimalsByName(animals, this.searchTerm());
    }
    
    // Filtrar por ubicación si hay filtro
    if (this.locationFilter()) {
      animals = this.animalsService.filterAnimalsByLocation(animals, this.locationFilter());
    }
    
    return animals;
  });

  /** Opciones para el selector de cantidad de animales */
  countOptions = [10, 20, 50, 100];

  /**
   * Constructor vacío - ngOnInit se usa para la inicialización
   */
  constructor() {}

  /**
   * Ciclo de vida OnInit - se ejecuta después del constructor
   * Carga los datos iniciales de animales
   */
  ngOnInit(): void {
    this.loadAnimals();
  }

  /**
   * Carga animales desde la API
   */
  loadAnimals(): void {
    this.loading.set(true);
    
    this.animalsService.getAnimals(this.animalCount()).subscribe({
      next: (animals) => {
        this.allAnimals.set(animals);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error cargando animales:', error);
        this.loading.set(false);
      }
    });
  }

  /**
   * Maneja el cambio en el término de búsqueda
   * @param event - Evento del input
   */
  onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  /**
   * Maneja el cambio en el filtro de ubicación
   * @param event - Evento del input
   */
  onLocationChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.locationFilter.set(value);
  }

  /**
   * Maneja el cambio en la cantidad de animales a cargar
   */
  onCountChange(): void {
    this.loadAnimals();
  }

  /**
   * Limpia todos los filtros
   */
  clearFilters(): void {
    this.searchTerm.set('');
    this.locationFilter.set('');
  }

  /**
   * Carga un animal aleatorio
   */
  loadRandomAnimal(): void {
    this.loading.set(true);
    
    this.animalsService.getRandomAnimal(true).subscribe({
      next: (animal) => {
        if (animal) {
          this.allAnimals.set([animal]);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error cargando animal aleatorio:', error);
        this.loading.set(false);
      }
    });
  }

  /**
   * Abre el diálogo con los detalles del animal
   * Comunicación bidireccional: envía datos al diálogo y puede recibir respuesta
   * @param animal - Animal a mostrar en el diálogo
   */
  openAnimalDetails(animal: ExtinctAnimal): void {
    this.dialog.open(AnimalDetailDialogComponent, {
      data: animal,
      width: '700px',
      maxHeight: '90vh'
    });
  }
}
