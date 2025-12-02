import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../model/product.model';
import { ProductCardUnroutedComponent } from '../product-card-unrouted/product-card-unrouted';

@Component({
  selector: 'app-product-search-unrouted',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProductCardUnroutedComponent],
  templateUrl: './product-search-unrouted.html',
  styleUrls: ['./product-search-unrouted.css'],
})
export class ProductSearchUnroutedComponent {
  private products: Product[] = [];
  priceRangeInvalid: boolean = false;

  @Input()
  set allProducts(products: Product[]) {
    this.products = products;
    this.filteredProducts = [...this.products];
  }

  @Input() categoryFilter: string | null = null;

  filteredProducts: Product[] = [];
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      name: ['', [Validators.pattern('[a-zA-Z ]*')]],
      minPrice: ['', [Validators.pattern('^[0-9]*$')]],
      maxPrice: ['', [Validators.pattern('^[0-9]*$')]],
    });
  }

  ngOnChanges(): void {
    this.applyFilters();
  }

  onSearch(): void {
    this.applyFilters();
    this.priceRangeInvalid =
      this.searchForm.value.minPrice &&
      this.searchForm.value.maxPrice &&
      +this.searchForm.value.minPrice > +this.searchForm.value.maxPrice;
    if (this.priceRangeInvalid) return;
  }

  private applyFilters(): void {
    const { name, minPrice, maxPrice } = this.searchForm.value;

    this.filteredProducts = this.products.filter((p) => {
      return (
        (!name || p.title.toLowerCase().includes(name.toLowerCase())) &&
        (!minPrice || p.price >= +minPrice) &&
        (!maxPrice || p.price <= +maxPrice) &&
        (!this.categoryFilter || p.category === this.categoryFilter)
      );
    });
  }
}
