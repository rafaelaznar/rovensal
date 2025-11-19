import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Weapon } from '../../model/pavonModel/weaponInterface';

@Component({
  selector: 'app-data',
  imports: [],
  templateUrl: './data.html',
  styleUrl: './data.css',
})
export class DatosArma {
  data = inject(MAT_DIALOG_DATA)
  oArma: Weapon = {} as Weapon;

 ngOnInit(){
  console.log(this.data);
  if (this.data?.weapon) {
      this.oArma = this.data.weapon;
    } else {
      console.warn('No se recibió weapon en MAT_DIALOG_DATA', this.data);
    }
 }

}
