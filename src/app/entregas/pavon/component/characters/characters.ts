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
  // Estas variables se inicializan antes de comenzar con las funciones, y se les da un tipo
  chars: Character[] = [];
  readonly oMatDialog = inject(MatDialog);

  // Esta función genera la URL de la imagen deseada, es parte de la API, así que puede tardar en cargar
  imageUrlFor(character: Character) {
    const base = 'https://genshin.jmp.blue/characters';
    const slug = character.id.toLowerCase().replace(/\s+/g, '-');
    return `${base}/${encodeURIComponent(slug)}/card`;
  }

  // El constructor, está vacío, pero se inyecta PavónService
  constructor(private oPavonService: PavonService) {}

  // El ngOnInit, y el método que llama para obtener los datos necesarios
  ngOnInit() {
    this.getChars();
  }

  getChars() {
    this.oPavonService.getAllCharacters().subscribe((chars) => {
      console.log(chars);
      this.chars = chars;
    });
  }

  // Este método abre el MatDialog para mostrar los detalles
  verDetalles(char: Character) {
    this.oMatDialog.open(DatosPersonaje, {
      height: '600px',
      width: '800px',
      data: {
        character: char,
      },
    });
  }
}
