import { FavoriteMovie, FavoriteMovieSource } from '../models/favorite-movie.model';

export function createFavoriteMovie(movie: FavoriteMovieSource): FavoriteMovie {
  return {
    id: movie.id,
    title: movie.title,
    posterUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
  };
}
