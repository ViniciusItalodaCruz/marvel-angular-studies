import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, map, of, switchMap, startWith, catchError, Observable } from 'rxjs';

import { Pagination } from '@components/pagination/pagination';
import { MoviesService } from '@/domains/movies/services/movies.service';
import { SearchState } from '@/domains/movies/models/search-state.types';
import { MovieCard } from '@/shared/ui/components/movie-card/movie-card';

@Component({
  imports: [AsyncPipe, MovieCard, Pagination],
  selector: 'app-search',
  templateUrl: './search.page.html',
})
export class SearchPage {
  private readonly route = inject(ActivatedRoute);
  private readonly moviesService = inject(MoviesService);
  private readonly router = inject(Router);

  readonly search$ = this.route.queryParamMap.pipe(
    map((params) => {
      const query = params.get('query')?.trim() ?? '';
      const page = Number(params.get('page') ?? 1);

      return {
        query,
        page: Number.isInteger(page) && page >= 1 && page <= 500 ? page : 1,
      };
    }),

    distinctUntilChanged(
      (previous, current) => previous.query === current.query && previous.page === current.page,
    ),

    switchMap(({ query, page }): Observable<SearchState> => {
      if (!query) {
        return of({ status: 'idle' });
      }

      return this.moviesService.searchMovies(query, page).pipe(
        map((data): SearchState => ({
          status: 'success',
          query,
          data,
        })),

        startWith({
          status: 'loading',
          query,
        } satisfies SearchState),

        catchError(() =>
          of<SearchState>({
            status: 'error',
            query,
          }),
        ),
      );
    }),
  );

  changePage(page: number): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }
}
