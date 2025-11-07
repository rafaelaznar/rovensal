import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-unrouted',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-unrouted.html',
  styleUrl: './navbar-unrouted.css',
})
export class NavbarUnroutedComponent {

}
