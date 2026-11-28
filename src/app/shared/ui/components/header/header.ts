import { RouterLink } from '@angular/router';
import { LucideHeart, LucideMoon, LucideSun } from '@lucide/angular';
import { afterNextRender, Component, HostListener, signal, inject } from '@angular/core';

import { Link } from '../link/link';
import { Logo } from '../logo/logo';
import { STORAGE_KEYS } from '@constants/storage';
import { InputSearch } from '../input-search/input-search';
import { FavoritesStore } from '@/domains/favorites/stores/favorites.store';

@Component({
  imports: [InputSearch, Link, LucideHeart, LucideMoon, LucideSun, Logo, RouterLink],
  selector: 'app-header',
  templateUrl: './header.html',
})
export class Header {
  protected readonly isScrolled = signal(false);
  protected readonly isDarkMode = signal(false);
  private readonly favoritesStore = inject(FavoritesStore);
  readonly favoritesCount = this.favoritesStore.count;

  constructor() {
    afterNextRender(() => {
      this.updateScrollState();

      const theme = localStorage.getItem(STORAGE_KEYS.THEME);
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      this.applyTheme(theme === null ? prefersDark : theme === 'dark');
    });
  }

  @HostListener('window:scroll')
  protected updateScrollState(): void {
    this.isScrolled.set(window.scrollY > 0);
  }

  protected toggleTheme(): void {
    const isDark = !this.isDarkMode();

    this.applyTheme(isDark);
    localStorage.setItem(STORAGE_KEYS.THEME, isDark ? 'dark' : 'light');
  }

  private applyTheme(isDark: boolean): void {
    document.documentElement.classList.toggle('dark', isDark);
    this.isDarkMode.set(isDark);
  }
}
