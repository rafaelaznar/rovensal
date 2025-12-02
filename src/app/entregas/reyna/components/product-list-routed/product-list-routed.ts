import { Component } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product.model';
import { HeaderUnrouted } from "../header-unrouted/header-unrouted";
import { CategoryService } from '../../service/category.service';
import { ProductSearchUnroutedComponent } from '../product-search-unrouted/product-search-unrouted';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-list-routed',
  imports: [ ProductSearchUnroutedComponent, TitleCasePipe, FormsModule, HeaderUnrouted],
  templateUrl: './product-list-routed.html',
  styleUrl: './product-list-routed.css',
})
export class ProductListRoutedComponent {
   categories: string[] = [];
  products: Product[] = [];
  selectedCategory: string | null = null;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(c => this.categories = c);
    this.productService.getAllProducts().subscribe(p => this.products = p);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

}
