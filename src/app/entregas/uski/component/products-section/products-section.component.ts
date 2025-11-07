import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { Category } from './../../interfaces/product.interface';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CategoryBtnComponent } from '../category-btn/category-btn.component';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-section',
  standalone: true,
  imports: [ProductCardComponent, CategoryBtnComponent, FormsModule],
  templateUrl: './products-section.component.html',
  styleUrl: './products-section.component.css',
})
export class ProductsSectionComponent {
  private productService = inject(ProductService);
  private catService = inject(CategoryService);

  products: Product[] = [];
  categories: Category[] = [];
  selectedProduct: Product | null = null;
  isSearchExpanded = false;
  searchQuery = '';
  originalProducts: Product[] = [];

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
      this.originalProducts = [...products]; // Store original products for search
      console.log(products);
    });

    this.catService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
      console.log(categories);
    });
  }

  toggleSearch() {
    this.isSearchExpanded = !this.isSearchExpanded;
    if (this.isSearchExpanded) {
      // Focus the input after it becomes visible
      setTimeout(() => {
        if (this.searchInput) {
          this.searchInput.nativeElement.focus();
        }
      }, 100);
    } else {
      // Reset search when collapsing
      this.searchQuery = '';
      this.products = [...this.originalProducts];
    }
  }

  onSearchChange() {
    if (this.searchQuery.trim() === '') {
      this.products = [...this.originalProducts];
    } else {
      this.products = this.originalProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          product.category.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
}
