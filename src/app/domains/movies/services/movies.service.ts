import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

interface TrendingMovie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
}

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
}
