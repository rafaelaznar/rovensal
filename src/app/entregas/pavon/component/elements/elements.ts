import { Component } from '@angular/core';
import { Menu } from "../menu/menu";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-elements',
  imports: [RouterModule, Menu],
  templateUrl: './elements.html',
  styleUrl: './elements.css',
})
export class ElementsComponent {

}
