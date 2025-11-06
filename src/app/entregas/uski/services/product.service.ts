import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  http: HttpClient = inject(HttpClient);

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products');
  }
}
