import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-alcalde',
  imports: [RouterOutlet],
  templateUrl: './alcalde-component.html',
  styleUrl: './alcalde-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlcaldeComponent {
  constructor() {}
}
