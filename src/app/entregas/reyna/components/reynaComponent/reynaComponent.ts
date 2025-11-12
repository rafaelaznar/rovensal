import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product.model';
import { HeaderUnrouted } from "../header-unrouted/header-unrouted";
import { ProductSearchUnroutedComponent } from '../product-search-unrouted/product-search-unrouted';
import { ProductCardUnroutedComponent } from '../product-card-unrouted/product-card-unrouted';

@Component({
  selector: 'app-reyna',
  standalone: true,
  imports: [
    CommonModule,
    HeaderUnrouted,
    ProductSearchUnroutedComponent,
    ProductCardUnroutedComponent
  ],
  templateUrl: './reynaComponent.html',
  styleUrls: ['./reynaComponent.css'],
})
export class ReynaComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => this.products = products,
      error: (err) => console.error('Error cargando productos', err),
    });
  }

  get featuredProducts(): Product[] {
    return this.products.slice(0, 6); // primeros 6 productos como destacados
  }
}




// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ProductService } from '../../service/product.service';
// import { Product } from '../../model/product.model';
// import { HeaderUnrouted } from "../header-unrouted/header-unrouted";
// import { ProductSearchUnroutedComponent } from '../product-search-unrouted/product-search-unrouted';

// @Component({
//   selector: 'app-reyna',
//   standalone: true,
//   imports: [
//     CommonModule,
//     HeaderUnrouted,
//     ProductSearchUnroutedComponent,
//   ],
//   templateUrl: './reynaComponent.html',
//   styleUrls: ['./reynaComponent.css'],
// })
// export class ReynaComponent {
//   products: Product[] = [];

//   constructor(private productService: ProductService) {}

//   ngOnInit(): void {
//     this.loadProducts();
//   }

//   private loadProducts(): void {
//     this.productService.getAllProducts().subscribe({
//       next: (products) => this.products = products,
//       error: (err) => console.error('Error cargando productos', err),
//     });
//   }
// }
