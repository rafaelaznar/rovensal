import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Menu } from "../menu/menu";

@Component({
  selector: 'app-pavon-home',
  imports: [RouterModule, Menu],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class PavonHomeComponent {}
