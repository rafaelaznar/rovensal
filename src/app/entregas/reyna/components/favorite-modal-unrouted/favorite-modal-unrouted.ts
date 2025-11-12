import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FavoriteService } from '../../service/favorite.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-favorite-modal-unrouted',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-modal-unrouted.html',
  styleUrls: ['./favorite-modal-unrouted.css'],
})
export class FavoriteModalUnroutedComponent {
  favorites: Product[] = [];

  constructor(
    private dialogRef: MatDialogRef<FavoriteModalUnroutedComponent>,
    private favService: FavoriteService
  ) {
    this.favService.favorites$.subscribe(favs => this.favorites = favs);
  }

  close(): void {
    this.dialogRef.close();
  }

  remove(product: Product): void {
  this.favService.toggleFavorite(product); 
}
}
