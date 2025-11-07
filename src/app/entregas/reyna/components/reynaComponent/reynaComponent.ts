import { Component } from '@angular/core';
import { ProductCardUnroutedComponent } from '../product-card-unrouted/product-card-unrouted';
import { Product } from '../../model/product.model';
import { ProductService } from '../../service/product.service';
import { FormsModule } from '@angular/forms';
import { NavbarUnroutedComponent } from '../navbar-unrouted/navbar-unrouted';

@Component({
  selector: 'app-reyna',
  imports: [ProductCardUnroutedComponent, FormsModule, NavbarUnroutedComponent],
  templateUrl: './reynaComponent.html',
  styleUrl: './reynaComponent.css',
  standalone: true,
})
export class ReynaComponent {
  products: Product[] = [];
  busqueda: string = '';

  constructor(private productService: ProductService) {}

   ngOnInit(): void {
     this.loadProducts();
  }
  private loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => (this.products = products),
      error: (err) => console.error('Error cargando productos', err),
    });
  }
  
  get filtrarProducts(): Product[] {
    const term = this.busqueda.toLowerCase();
    return this.products.filter((p) =>
      p.title.toLowerCase().includes(term)
    );
  }
}
