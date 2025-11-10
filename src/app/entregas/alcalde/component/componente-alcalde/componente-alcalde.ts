import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-alcalde',
  imports: [RouterOutlet],
  templateUrl: './componente-alcalde.html',
  styleUrl: './componente-alcalde.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponenteAlcalde {
  constructor() {}
}
