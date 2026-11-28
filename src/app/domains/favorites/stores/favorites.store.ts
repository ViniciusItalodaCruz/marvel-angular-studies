import { afterNextRender, computed, Injectable, signal } from '@angular/core';

import { STORAGE_KEYS } from '@/shared/constants/storage';
import { isFavoriteMovie } from '../utils/is-favorite-movie';
import { FavoriteMovie } from '../models/favorite-movie.model';

@Injectable({ providedIn: 'root' })
export class FavoritesStore {
  private readonly state = signal<readonly FavoriteMovie[]>([]);
  private readonly initialized = signal(false);
  private readonly storageError = signal(false);

  readonly movies = this.state.asReadonly();
  readonly isReady = this.initialized.asReadonly();
  readonly hasStorageError = this.storageError.asReadonly();

  readonly count = computed(() => this.movies().length);
  readonly isEmpty = computed(() => this.count() === 0);

  constructor() {
    afterNextRender(() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);

        if (stored) {
          const movies: unknown = JSON.parse(stored);

          if (Array.isArray(movies)) {
            this.state.set(movies.filter(isFavoriteMovie));
          }
        }
      } catch {
        this.storageError.set(true);
      } finally {
        this.initialized.set(true);
      }
    });
  }

  isFavorite(id: number): boolean {
    return this.movies().some((movie) => movie.id === id);
  }

  add(movie: FavoriteMovie): void {
    if (!this.isReady() || this.isFavorite(movie.id)) return;

    this.persist([movie, ...this.movies()]);
  }

  remove(id: number): void {
    if (!this.isReady()) return;

    this.persist(this.movies().filter((movie) => movie.id !== id));
  }

  toggle(movie: FavoriteMovie): void {
    if (this.isFavorite(movie.id)) {
      this.remove(movie.id);
    } else {
      this.add(movie);
    }
  }

  clear(): void {
    if (!this.isReady()) return;

    this.persist([]);
  }

  private persist(movies: readonly FavoriteMovie[]): void {
    this.state.set(movies);

    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(movies));
      this.storageError.set(false);
    } catch {
      this.storageError.set(true);
    }
  }
}
