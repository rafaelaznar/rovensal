import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { Product } from '../../model/product.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-detail-modal-unrouted',
  imports: [MatDialogActions, MatDialogContent, CurrencyPipe],
  templateUrl: './product-detail-modal-unrouted.html',
  styleUrl: './product-detail-modal-unrouted.css',
})
export class ProductDetailModalUnrouted {
  readonly dialogRef = inject(MatDialogRef<ProductDetailModalUnrouted>);
  readonly data = inject<Product>(MAT_DIALOG_DATA);

  cerrar() {
    this.dialogRef.close();
  }}
