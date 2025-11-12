import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private favoritesSubject = new BehaviorSubject<Product[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  get favorites(): Product[] {
    return this.favoritesSubject.value;
  }

  toggleFavorite(product: Product): void {
    const exists = this.favorites.find(p => p.id === product.id);
    const updated = exists
      ? this.favorites.filter(p => p.id !== product.id)
      : [...this.favorites, product];

    this.favoritesSubject.next(updated);
  }

  isFavorite(productId: number): boolean {
    return this.favorites.some(p => p.id === productId);
  }
}
