import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZeldaCompanion } from '../../model/zeldaCompanionInterface';

@Component({
  selector: 'app-companion-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './companion-picker.html',
  styleUrls: ['./companion-picker.css']
})
export class CompanionPickerComponent {
  @Input() companions: ZeldaCompanion[] = [];
  @Input() visible = false;
  @Output() close = new EventEmitter<null | ZeldaCompanion>();

  seleccionar(c: ZeldaCompanion) {
    this.close.emit(c);
  }

  cancelar() {
    this.close.emit(null);
  }
}
