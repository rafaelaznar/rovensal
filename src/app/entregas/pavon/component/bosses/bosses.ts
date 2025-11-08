import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Menu } from '../menu/menu';

@Component({
  selector: 'app-bosses',
  imports: [RouterModule, Menu],
  templateUrl: './bosses.html',
  styleUrl: './bosses.css',
})
export class BossesComponent {

}
