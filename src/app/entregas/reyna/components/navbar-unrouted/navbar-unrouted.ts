import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-navbar-unrouted',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-unrouted.html',
  styleUrl: './navbar-unrouted.css',
})
export class NavbarUnroutedComponent {
 categories: string[] = [];

  constructor(private router: Router, private categoryService: CategoryService) {}

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
}
