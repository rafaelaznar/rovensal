import { Component } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { TitleCasePipe } from '@angular/common';
import { HeaderUnrouted } from '../header-unrouted/header-unrouted';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list-routed',
  imports: [TitleCasePipe, HeaderUnrouted],
  templateUrl: './category-list-routed.html',
  styleUrl: './category-list-routed.css',
})
export class CategoryListRouted {
  categories: string[] = [];
  private router!: Router;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => (this.categories = categories),
      error: (err) => console.error('Error cargando categorías', err),
    });
  }

}
