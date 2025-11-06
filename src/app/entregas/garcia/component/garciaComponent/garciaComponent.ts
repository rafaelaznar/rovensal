import { Component } from '@angular/core';

@Component({
  selector: 'app-garcia',
  imports: [],
  templateUrl: './garciaComponent.html',
  styleUrl: './garciaComponent.css',
  standalone: true
})
export class GarciaComponent {
  startCombat() {
    alert('Combate iniciado entre Tanjiro y un demonio!');
  }
}
