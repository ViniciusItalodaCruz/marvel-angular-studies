import { Component, computed, inject, input } from '@angular/core';
import { LucideHeart } from '@lucide/angular';
import { Button } from '@/shared/ui/components/button/button';
import { FavoritesStore } from '@/domains/favorites/stores/favorites.store';
import { createFavoriteMovie } from '@/domains/favorites/factories/favorite-movie.factory';

@Component({
  imports: [LucideHeart, Button],
  selector: 'app-movie-header',
  templateUrl: './movie-header.html',
})
export class MovieHeader {
  private readonly favoritesStore = inject(FavoritesStore);

  readonly id = input.required<number>();
  readonly title = input.required<string>();
  readonly originalTitle = input.required<string>();
  readonly posterPath = input.required<string | null>();

  readonly isReady = this.favoritesStore.isReady;

  readonly isFavorite = computed(() => this.favoritesStore.isFavorite(this.id()));

  toggleFavorite(): void {
    const movie = createFavoriteMovie({
      id: this.id(),
      title: this.title(),
      poster_path: this.posterPath(),
    });

    this.favoritesStore.toggle(movie);
  }
}
