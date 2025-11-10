import { Component, inject, signal, computed, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ServicioAnimalesExtintos } from '../../service/animales-extintos-servicio';
import { AnimalExtinto } from '../../model/animal-interfaz';
import { TarjetaAnimal } from '../tarjeta-animal/tarjeta-animal';
import { DialogoDetalleAnimal } from '../dialogo-detalle-animal/dialogo-detalle-animal';

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
  private readonly servicioAnimales = inject(ServicioAnimalesExtintos);
  
  private readonly dialogo = inject(MatDialog);

  private todosLosAnimales = signal<AnimalExtinto[]>([]);
  
  terminoBusqueda = signal<string>('');
  
  filtroUbicacion = signal<string>('');
  
  cargando = signal<boolean>(false);
  
  cantidadAnimales = signal<number | string>(20);

  animalesFiltrados = computed(() => {
    let animales = this.todosLosAnimales();
    
    if (this.terminoBusqueda()) {
      animales = this.servicioAnimales.filtrarAnimalesPorNombre(animales, this.terminoBusqueda());
    }
    
    if (this.filtroUbicacion()) {
      animales = this.servicioAnimales.filtrarAnimalesPorUbicacion(animales, this.filtroUbicacion());
    }
    
    return animales;
  });

  opcionesCantidad: (number | string)[] = [10, 20, 50, 100, 'TODOS'];

  constructor() {}

  ngOnInit(): void {
    this.cargarAnimales();
  }

  cargarAnimales(): void {
    this.cargando.set(true);
    
    const cantidad = this.cantidadAnimales() === 'TODOS' ? 804 : this.cantidadAnimales() as number;
    
    this.servicioAnimales.obtenerAnimales(cantidad).subscribe({
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

  alCambiarBusqueda(evento: Event): void {
    const valor = (evento.target as HTMLInputElement).value;
    this.terminoBusqueda.set(valor);
  }

  alCambiarUbicacion(evento: Event): void {
    const valor = (evento.target as HTMLInputElement).value;
    this.filtroUbicacion.set(valor);
  }

  alCambiarCantidad(): void {
    this.cargarAnimales();
  }

  limpiarFiltros(): void {
    this.terminoBusqueda.set('');
    this.filtroUbicacion.set('');
  }

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

  abrirDetallesAnimal(animal: AnimalExtinto): void {
    this.dialogo.open(DialogoDetalleAnimal, {
      data: animal,
      width: '700px',
      maxHeight: '90vh'
    });
  }
}
