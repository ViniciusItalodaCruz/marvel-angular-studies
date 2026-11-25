import type { Movie, TrendingMovie } from '../models/movie.types';

export function createMovieRowItems(movies: readonly TrendingMovie[]): Movie[] {
  return movies.map(({ id, title, poster_path }) => ({
    id,
    title,
    posterUrl: poster_path ? `https://image.tmdb.org/t/p/w342${poster_path}` : null,
  }));
}
