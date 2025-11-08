import { Component } from '@angular/core';
import { Menu } from "../menu/menu";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-domains',
  imports: [RouterModule, Menu],
  templateUrl: './domains.html',
  styleUrl: './domains.css',
})
export class DomainsComponent {

}
