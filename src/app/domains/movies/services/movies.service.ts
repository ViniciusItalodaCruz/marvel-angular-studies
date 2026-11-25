import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { createMovieRowItems } from '../factories/movie-row-item.factory';
import type { Movie, TrendingMovie } from '../models/movie.types';

interface TrendingMoviesResponse {
  results: TrendingMovie[];
}

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private readonly http = inject(HttpClient);

  getTrendingMovies() {
    return this.http
      .get<TrendingMoviesResponse>('/api/movies/trending')
      .pipe(map(({ results }) => results));
  }

  getTrendingCards(): Observable<Movie[]> {
    return this.getTrendingMovies().pipe(map(createMovieRowItems));
  }

  getTrendingSlides() {
    return this.getTrendingMovies().pipe(
      map((movies) =>
        movies
          .filter((movie) => !!movie.backdrop_path)
          .slice(0, 5)
          .map((movie) => ({
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            backdropUrl: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
          })),
      ),
    );
  }

  getNowPlayingMovies(): Observable<Movie[]> {
    return this.http
      .get<{ results: Movie[] }>('/api/movies/now-playing')
      .pipe(map(({ results }) => results));
  }
}
