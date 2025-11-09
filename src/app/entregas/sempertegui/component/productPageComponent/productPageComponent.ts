import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../../services/api-call-service';
import { Product } from '../../model/productsInterface';


@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './productPageComponent.html',
  styleUrl: './productPageComponent.css',
})
export class ProductPageComponent {

  id: number | null = null;
  product: Product = {} as Product;

  constructor(private route: ActivatedRoute, private apiCall: ApiCallService){
    this.id = Number(this.route.snapshot.params['id'])
  }

  ngOnInit(){
    this.getProductById();
  }

  getProductById(){
    this.apiCall.getProductById(this.id).subscribe((product: Product) => {
      this.product = product;
    })
  }

  
}
