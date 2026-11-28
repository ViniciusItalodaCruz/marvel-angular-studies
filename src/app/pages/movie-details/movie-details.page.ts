import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { distinctUntilChanged, map, switchMap } from 'rxjs';

import { MoviesService } from '@/domains/movies/services/movies.service';
import { InfoSection } from '@/domains/details/components';
import { Loading } from '@/shared/ui/components';

@Component({
  selector: 'app-movie-details',
  imports: [AsyncPipe, InfoSection, Loading],
  templateUrl: './movie-details.page.html',
})
export class MovieDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly moviesService = inject(MoviesService);

  readonly movie$ = this.route.paramMap.pipe(
    map((params) => Number(params.get('id'))),
    distinctUntilChanged(),
    switchMap((id) => this.moviesService.getMovieDetails(id)),
  );
}
