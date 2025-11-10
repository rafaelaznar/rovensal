import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product.model';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { ProductCardUnroutedComponent } from '../product-card-unrouted/product-card-unrouted';
import { HeaderUnrouted } from '../header-unrouted/header-unrouted';

@Component({
  selector: 'app-category-list-routed',
  standalone: true,
  imports: [CommonModule, TitleCasePipe, ProductCardUnroutedComponent, HeaderUnrouted],
  templateUrl: './category-list-routed.html',
  styleUrl: './category-list-routed.css',
})
export class CategoryListRouted {
  categoryName = '';
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('category') ?? '';
      this.loadProductsByCategory(this.categoryName);
    });
  }

  private loadProductsByCategory(category: string): void {
    this.productService.getProductsByCategory(category).subscribe({
      next: (products) => (this.products = products),
      error: (err) => console.error('Error cargando productos por categoría', err),
    });
  }
}
