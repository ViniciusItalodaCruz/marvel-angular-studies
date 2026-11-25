import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { InputSearch, MovieRow } from '@shared/ui/components';
import { HeroSlider } from '@domains/home/components/hero-slider/hero-slider';
import { MoviesService } from '@/domains/movies/services/movies.service';
import { map } from 'rxjs';

@Component({
  imports: [InputSearch, AsyncPipe, HeroSlider, MovieRow],
  selector: 'app-home-search',
  templateUrl: './home-search.page.html',
})
export class HomeSearchPage {
  private readonly moviesService = inject(MoviesService);

  readonly slides$ = this.moviesService.getTrendingSlides();
  readonly movieCards$ = this.moviesService
    .getTrendingMovies()
    .pipe(
      map((movies) =>
        movies.flatMap(({ id, title, poster_path }) =>
          poster_path
            ? [{ id, title, posterUrl: `https://image.tmdb.org/t/p/w342${poster_path}` }]
            : [],
        ),
      ),
    );
}
