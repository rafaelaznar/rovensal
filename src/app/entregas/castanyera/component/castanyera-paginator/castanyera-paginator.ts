import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-castanyera-paginator',
  imports: [MatPaginatorModule],
  templateUrl: './castanyera-paginator.html',
  styleUrl: './castanyera-paginator.css',
  standalone: true,
})
export class CastanyeraPaginator {
  @Input() length = 0;
  @Input() pageSize = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 100];

  @Output() page = new EventEmitter<PageEvent>();

  onPageChange(event: PageEvent) {
    this.page.emit(event);
  }
}
