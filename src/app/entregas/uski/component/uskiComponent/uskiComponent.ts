import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { HeroComponent } from '../hero/hero.component';
import { ProductsSectionComponent } from '../products-section/products-section.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, HeroComponent, ProductsSectionComponent],
  templateUrl: './uskiComponent.html',
  styleUrl: './uskiComponent.css',
})

export class UskiComponent {
  private readonly productService = inject(ProductService);

  constructor() {

  }
}
