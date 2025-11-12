import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../service/category.service';
import { MatDialog } from '@angular/material/dialog';
import { FavoriteModalUnroutedComponent } from '../favorite-modal-unrouted/favorite-modal-unrouted';

@Component({
  selector: 'app-navbar-unrouted',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-unrouted.html',
  styleUrl: './navbar-unrouted.css',
})
export class NavbarUnroutedComponent {
 categories: string[] = [];

  constructor(private router: Router, private categoryService: CategoryService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (cats) => (this.categories = cats),
      error: (err) => console.error('Error cargando categorías', err),
    });
  }

  navigateToCategory(category: string): void {
    this.router.navigate(['/reyna/categories', category]);
  }

   openFavorites(): void {
    this.dialog.open(FavoriteModalUnroutedComponent, {
      width: '1000px',
      height: '400px',
    });
  }
}