import { Component, Input } from '@angular/core';
import { RmPersonaje } from '../../model/salinasInterface';
import { MatDialog } from '@angular/material/dialog';
import { SalinasDetailMatDialog } from '../salinasDetailMatDialog/salinasDetailMatDialog';


@Component({
  selector: 'app-salinasCharacterCard',
  templateUrl: './salinasCharacterCard.html',
  styleUrls: ['./salinasCharacterCard.css'],
  standalone: true,
})
export class SalinasCharacterCardComponent {
  @Input() personaje!: RmPersonaje;
  constructor(private dialog: MatDialog) {}
    
  
  VerPersonajes(personaje: RmPersonaje) {
     console.log("Este es la información del personaje: ", personaje);
    this.dialog.open(SalinasDetailMatDialog, {
      width: '400px',
      data: { id: personaje.id }
    });
  }
}