import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Character } from '../../model/pavonModel/characterInterface';

@Component({
  selector: 'app-data',
  imports: [],
  templateUrl: './data.html',
  styleUrl: './data.css',
})
export class DatosPersonaje {
  data = inject(MAT_DIALOG_DATA)
  oPersonaje: Character = {} as Character;

 ngOnInit(){
  console.log(this.data);
  if (this.data?.character) {
      this.oPersonaje = this.data.character;
    } else {
      console.warn('No se recibió character en MAT_DIALOG_DATA', this.data);
    }
 }

}
