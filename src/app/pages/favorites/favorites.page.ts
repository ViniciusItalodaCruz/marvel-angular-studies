import { Component, inject } from '@angular/core';
import { FavoritesStore } from '@/domains/favorites/stores/favorites.store';
import { LucideHeart } from '@lucide/angular';
import { RouterLink } from '@angular/router';
import { Link } from '@/shared/ui/components/link/link';
import { MovieCard } from '@/shared/ui/components/movie-card/movie-card';
@Component({
  imports: [LucideHeart, RouterLink, Link, MovieCard],
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
})
export class FavoritesPage {
  private readonly store = inject(FavoritesStore);

  readonly movies = this.store.movies;
  readonly count = this.store.count;
  readonly isEmpty = this.store.isEmpty;
  readonly isReady = this.store.isReady;

  removeFavorite(id: number): void {
    this.store.remove(id);
  }
}
