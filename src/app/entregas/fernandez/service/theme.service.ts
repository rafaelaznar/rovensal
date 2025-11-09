import { Injectable, signal, computed, effect } from '@angular/core';

type Theme = 'light' | 'dark' | 'auto';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  
  private STORAGE_KEY = 'fernandez-theme';
  private themes: Theme[] = ['light', 'dark', 'auto'];
  
  private currentThemeSignal = signal<Theme>(this.loadThemeFromStorage());
  
  public effectiveTheme = computed(() => {
    const theme = this.currentThemeSignal();
    
    if (theme === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    return theme;
  });
  
  public currentTheme = this.currentThemeSignal.asReadonly();
  public isDarkMode = computed(() => this.effectiveTheme() === 'dark');
  public isLightMode = computed(() => this.effectiveTheme() === 'light');
  public isAutoMode = computed(() => this.currentThemeSignal() === 'auto');
  
  constructor() {
    effect(() => {
      this.applyThemeToDOM(this.effectiveTheme());
    });
    
    this.setupSystemThemeListener();
  }
  
  setTheme(theme: Theme): void {
    if (this.themes.includes(theme)) {
      this.currentThemeSignal.set(theme);
      this.saveThemeToStorage(theme);
    }
  }
  
  toggleTheme(): void {
    const current = this.currentThemeSignal();
    
    if (current === 'light') {
      this.setTheme('dark');
    } else if (current === 'dark') {
      this.setTheme('light');
    } else {
      this.setTheme(this.effectiveTheme() === 'dark' ? 'light' : 'dark');
    }
  }
  
  setAutoTheme(): void {
    this.setTheme('auto');
  }
  
  getAvailableThemes(): Array<{value: Theme, label: string, icon: string}> {
    return [
      { value: 'light', label: 'Claro', icon: '☀️' },
      { value: 'dark', label: 'Oscuro', icon: '🌙' },
      { value: 'auto', label: 'Automático', icon: '🌓' }
    ];
  }
  
  getCurrentThemeInfo() {
    const current = this.currentThemeSignal();
    const effective = this.effectiveTheme();
    
    return {
      selected: current,
      effective: effective,
      isAuto: current === 'auto',
      displayName: this.getThemeDisplayName(current),
      icon: this.getThemeIcon(current)
    };
  }
  
  private applyThemeToDOM(theme: 'light' | 'dark'): void {
    const root = document.documentElement;
    
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(`theme-${theme}`);
    root.setAttribute('data-theme', theme);
    
    this.applyThemeVariables(theme);
  }
  
  private applyThemeVariables(theme: 'light' | 'dark'): void {
    const root = document.documentElement;
    
    const lightColors = {
      '--fernandez-bg-primary': '#ffffff',
      '--fernandez-bg-secondary': '#f8f9fa',
      '--fernandez-text-primary': '#2c3e50',
      '--fernandez-text-secondary': '#495057',
      '--fernandez-accent': '#ffd700',
      '--fernandez-border': '#e1e5e9',
      '--fernandez-shadow': 'rgba(0, 0, 0, 0.1)',
      '--fernandez-success': '#28a745',
      '--fernandez-danger': '#dc3545'
    };
    
    const darkColors = {
      '--fernandez-bg-primary': '#1a1a1a',
      '--fernandez-bg-secondary': '#2d2d2d',
      '--fernandez-text-primary': '#ffffff',
      '--fernandez-text-secondary': '#e9ecef',
      '--fernandez-accent': '#ffd700',
      '--fernandez-border': '#495057',
      '--fernandez-shadow': 'rgba(0, 0, 0, 0.3)',
      '--fernandez-success': '#20c997',
      '--fernandez-danger': '#e74c3c'
    };
    
    const colors = theme === 'dark' ? darkColors : lightColors;
    
    Object.entries(colors).forEach(([prop, val]) => {
      root.style.setProperty(prop, val);
    });
  }
  
  private setupSystemThemeListener(): void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', () => {
      if (this.currentThemeSignal() === 'auto') {

      }
    });
  }
  

  private loadThemeFromStorage(): Theme {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY) as Theme;
      return this.themes.includes(stored) ? stored : 'auto';
    } catch (error) {
      return 'auto';
    }
  }
  
  private saveThemeToStorage(theme: Theme): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, theme);
    } catch (error) {
      // ignore
    }
  }
  
  private getThemeDisplayName(theme: Theme): string {
    const names = {
      light: 'Claro',
      dark: 'Oscuro',
      auto: 'Automático'
    };
    return names[theme];
  }
  
  private getThemeIcon(theme: Theme): string {
    if (theme === 'light') return '☀️';
    if (theme === 'dark') return '🌙';
    return '🌓';
  }
}