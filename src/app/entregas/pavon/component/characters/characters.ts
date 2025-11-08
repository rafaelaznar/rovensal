import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Menu } from '../menu/menu';

@Component({
  selector: 'app-characters',
  imports: [RouterModule, Menu],
  templateUrl: './characters.html',
  styleUrl: './characters.css',
})
export class CharactersComponent {

}
