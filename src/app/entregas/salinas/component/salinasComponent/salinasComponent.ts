import { Component } from '@angular/core';
import { RmPersonaje } from '../../model/salinasInterface';
import { SalinasService } from '../../service/salinasService';
import { MatDialog } from '@angular/material/dialog';
import { SalinasDetailMatDialog } from '../salinasDetailMatDialog/salinasDetailMatDialog';
import { SalinasNavbarUnroutedComponent } from '../salinasNavbarUnrouted/salinasNavbarUnrouted';
import { SalinasCharacterCardComponent } from '../salinasCharacterCard/salinasCharacterCard';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-salinas',
  imports: [SalinasNavbarUnroutedComponent, SalinasCharacterCardComponent, FormsModule],
  templateUrl: './salinasComponent.html',
  styleUrls: ['./salinasComponent.css'],
  standalone: true
})
export class SalinasComponent {

   personajes: RmPersonaje[] = [];
  error = '';
  busqueda: string = '';

  constructor(
    private salinasService: SalinasService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPersonajes();
  }

  private loadPersonajes(): void {
    this.salinasService.getPersonajes().subscribe({
      next: (personajes) => (this.personajes = personajes),
      error: (err) => {
        console.error('Error cargando personajes', err);
        this.error = 'Error cargando personajes';
      }
    });
  }



  get personajesFiltrados(): RmPersonaje[] {
    return this.personajes.filter(personaje =>
      personaje.name.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }
}
