import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Character } from '../../model/pavonModel/characterInterface';
import { Boss } from '../../model/pavonModel/bossInterface';

@Component({
  selector: 'app-data',
  imports: [],
  templateUrl: './data.html',
  styleUrl: './data.css',
})
export class DatosJefe {
  data = inject(MAT_DIALOG_DATA)
  oJefe: Boss = {} as Boss;

 ngOnInit(){
  console.log(this.data);
  if (this.data?.boss) {
      this.oJefe = this.data.boss;
    } else {
      console.warn('No se recibió boss en MAT_DIALOG_DATA', this.data);
    }
 }

}
