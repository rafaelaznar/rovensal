import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../interfaces/product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  http: HttpClient = inject(HttpClient);

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('https://api.escuelajs.co/api/v1/categories');
  }
}
