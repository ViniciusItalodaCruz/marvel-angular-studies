import { FavoriteMovie } from '../models/favorite-movie.model';

export function isFavoriteMovie(value: unknown): value is FavoriteMovie {
  if (!value || typeof value !== 'object') return false;

  const movie = value as Record<string, unknown>;

  return (
    typeof movie['id'] === 'number' &&
    typeof movie['title'] === 'string' &&
    (typeof movie['posterUrl'] === 'string' || movie['posterUrl'] === null)
  );
}
