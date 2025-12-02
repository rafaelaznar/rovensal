import { Component } from '@angular/core';
import { HeroComponent } from '../../component/hero/hero.component';
import { ProductsSectionComponent } from '../../component/products-section/products-section.component';

@Component({
  selector: 'app-home.page',
  imports: [HeroComponent, ProductsSectionComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class UskiHomePage {

}
