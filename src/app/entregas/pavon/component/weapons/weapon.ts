import { Component } from '@angular/core';
import { Menu } from "../menu/menu";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-weapon',
  imports: [RouterModule, Menu],
  templateUrl: './weapon.html',
  styleUrl: './weapon.css',
})
export class WeaponsComponent {

}
