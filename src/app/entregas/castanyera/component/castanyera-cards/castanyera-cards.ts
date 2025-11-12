import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Castanyera } from '../../model/castanyeraInterface';

@Component({
  selector: 'app-castanyera-cards',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './castanyera-cards.html',
  styleUrls: ['./castanyera-cards.css'],
})
 
export class CastanyeraCards {
  @Input() personaje?: Castanyera;
}
