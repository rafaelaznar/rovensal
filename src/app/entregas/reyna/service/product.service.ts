import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private oHttpClient: HttpClient) {}

  getAllProducts():Observable<Product[]> {
    return this.oHttpClient.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.oHttpClient.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.oHttpClient.get<Product[]>(`${this.apiUrl}/category/${category}`);
  }
}
