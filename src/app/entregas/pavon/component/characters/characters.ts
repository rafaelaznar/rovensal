import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Menu } from '../menu/menu';
import { PavonService } from '../../service/pavonService/pavon-service';
import { Character } from '../../model/pavonModel/characterInterface';
import { MatDialog } from '@angular/material/dialog';
import { DatosPersonaje } from '../../data/dataChar/data';

@Component({
  selector: 'app-characters',
  imports: [RouterModule, Menu],
  templateUrl: './characters.html',
  styleUrl: './characters.css',
})
export class CharactersComponent {

  chars: Character[] = [];
  readonly oMatDialog = inject(MatDialog)

  imageUrlFor(character: Character) {
    const base = 'https://genshin.jmp.blue/characters';
    const slug = (character.id).toLowerCase().replace(/\s+/g, '-');
    return `${base}/${encodeURIComponent(slug)}/card`;
  }

  constructor(private oPavonService: PavonService){ }

  ngOnInit(){
    this.getChars();
  }

  getChars(){
    this.oPavonService.getAllCharacters().subscribe((chars) => {
      console.log(chars)
      this.chars = chars;
    })
  }

  verDetalles(char: Character){
    this.oMatDialog.open(DatosPersonaje, {
      height: '600px',
      width: '800px',
      data: {
        character: char,
      }
    })
  }



}
