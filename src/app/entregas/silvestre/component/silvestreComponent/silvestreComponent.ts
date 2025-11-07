import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-silvestre',
  imports: [],
  templateUrl: './silvestreComponent.html',
  styleUrl: './silvestreComponent.css',
  standalone: true
})
export class SilvestreComponent {

 activeRoute: string = '';

 constructor(private router: Router) {
   this.router.events.subscribe(event => {
     if (event instanceof NavigationEnd) {
       this.activeRoute = event.url;
     }
   });
 }

}
