import { Component} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core';

@Component({
  selector: 'app-dialog-pokemon',
  imports: [],
  templateUrl: './dialogPokemon.html',
  styleUrl: './dialogPokemon.css',
})

export class DialogPokemon {
  //inyectar datos que vienen del componente que abre el dialog
  readonly dataDialog = inject(MAT_DIALOG_DATA)
  //le inyectamos el dialogRef para poder cerrarlo
  constructor( private dialogRef: MatDialogRef<DialogPokemon>){

  }
  //metodo para cerrar el dialog
  closeDialog(): void{
    this.dialogRef.close();
  }

}
