import { Component, inject, Input } from '@angular/core';
import { Product } from '../../model/product.model';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailModalUnrouted } from '../product-detail-modal-unrouted/product-detail-modal-unrouted';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../service/favorite.service';
@Component({
  selector: 'app-product-card-unrouted',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './product-card-unrouted.html',
  styleUrls: ['./product-card-unrouted.css'],
})
export class ProductCardUnroutedComponent {
  @Input() product!: Product;
  readonly dialog = inject(MatDialog);
  isFav = false;

  constructor(private router: Router, private favService: FavoriteService) {}

   ngOnInit(): void {
    this.updateFavoriteState();
    // Suscribirse para reaccionar a los cambios en favoritos
    this.favService.favorites$.subscribe(() => this.updateFavoriteState());
  }

   abrirDetalle(): void {
    this.dialog.open(ProductDetailModalUnrouted, {
      width: '1200px',
      height: '600px',
      data: this.product.id, // ahora pido solo el ID en vez del objeto completo
    });
  }
    toggleFavorite(): void {
    this.favService.toggleFavorite(this.product);
  }

    updateFavoriteState(): void {
    this.isFav = this.favService.isFavorite(this.product.id);
  }
}
