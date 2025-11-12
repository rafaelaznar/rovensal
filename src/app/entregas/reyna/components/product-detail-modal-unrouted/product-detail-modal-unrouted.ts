import { Component, inject, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogContent,
} from '@angular/material/dialog';
import { Product } from '../../model/product.model';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-detail-modal-unrouted',
  imports: [MatDialogActions, MatDialogContent, CurrencyPipe],
  templateUrl: './product-detail-modal-unrouted.html',
  styleUrl: './product-detail-modal-unrouted.css',
})
export class ProductDetailModalUnrouted {
  readonly dialogRef = inject(MatDialogRef<ProductDetailModalUnrouted>);
  readonly data = inject<number>(MAT_DIALOG_DATA); // ahora uso solo el ID del producto y ya no el objeto completo

  private productService = inject(ProductService);
  product: Product = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: { rate: 0, count: 0 },
  };
  ngOnInit() {
    this.productService.getProductById(this.data).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (err) => console.error('Error al cargar el producto', err),
    });
  }

  cerrar() {
    this.dialogRef.close();
  }
}
