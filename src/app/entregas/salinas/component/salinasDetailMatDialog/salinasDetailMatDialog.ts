import { Component, Inject } from '@angular/core';
import { RmPersonaje } from '../../model/salinasInterface';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { SalinasService } from '../../service/salinasService';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-salinasDetailMatDialog',
  templateUrl: './salinasDetailMatDialog.html',
  styleUrls: ['./salinasDetailMatDialog.css'],
  imports: [MatDialogActions, MatDialogContent, CommonModule]
})
export class SalinasDetailMatDialog {
    personaje?: RmPersonaje;

  constructor(
    private salinasService: SalinasService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private dialogRef: MatDialogRef<SalinasDetailMatDialog>
  ) {}

  ngOnInit() {
    this.salinasService.getPersonajePorId(this.data.id)
      .subscribe(personaje => this.personaje = personaje);
  }

  cerrar() {
    this.dialogRef.close();
  }


}
