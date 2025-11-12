import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-theme-selector',
  imports: [CommonModule],
  templateUrl: './theme-selector.component.html',
  styleUrl: './theme-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSelectorComponent {
  
  private themeService = inject(ThemeService);
  
  currentTheme = this.themeService.currentTheme;
  effectiveTheme = this.themeService.effectiveTheme;
  isDarkMode = this.themeService.isDarkMode;
  isLightMode = this.themeService.isLightMode;
  isAutoMode = this.themeService.isAutoMode;
  
  getThemeOptions() {
    return this.themeService.getAvailableThemes();
  }
  
  getCurrentThemeInfo() {
    return this.themeService.getCurrentThemeInfo();
  }
  
  setTheme(theme: 'light' | 'dark' | 'auto'): void {
    this.themeService.setTheme(theme);
  }
  
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
  
  setAutoTheme(): void {
    this.themeService.setAutoTheme();
  }
  
  onThemeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const theme = target.value as 'light' | 'dark' | 'auto';
    this.setTheme(theme);
  }
}