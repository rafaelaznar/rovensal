import { Component, inject } from '@angular/core';
import { Pokemon } from '../zanonModel/zanonInterface';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogActions } from '@angular/material/dialog';

@Component({
  selector: 'app-datos-unrouted-component',
  imports: [MatDialogContent],
  templateUrl: './datos-unrouted-component.html',
  styleUrl: './datos-unrouted-component.css',
  standalone: true,
})
export class DatosUnroutedComponent {

  data = inject(MAT_DIALOG_DATA);

  oPokemon: Pokemon = {} as Pokemon;

  ngOnInit() {
    console.log("Datos recibidos en el diálogo: ", this.data);
    this.oPokemon = this.data.oPokemon;
  }
}