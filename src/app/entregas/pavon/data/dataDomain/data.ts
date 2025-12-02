import { Component, inject, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Domain } from '../../model/pavonModel/domainInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatosDominio implements OnInit {
  readonly data = inject(MAT_DIALOG_DATA) as { domain: Domain };
  oDominio = signal<Domain | undefined>(undefined);

  ngOnInit() {
    if (this.data?.domain) {
      this.oDominio.set(this.data.domain);
    }
  }
}
