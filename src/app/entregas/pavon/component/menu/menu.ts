import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {

  activeRoute: string="";

  constructor(private oRouter: Router){
    this.oRouter.events.subscribe((event) => {
      if (event instanceof NavigationEnd){
        this.activeRoute = event.url;
      }
    })
  }

}
