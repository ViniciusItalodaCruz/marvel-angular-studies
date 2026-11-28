import { forkJoin } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { Loading, MovieRow } from '@shared/ui/components';
import { MoviesService } from '@/domains/movies/services/movies.service';
import { HeroSlider } from '@domains/home/components/hero-slider/hero-slider';

@Component({
  imports: [AsyncPipe, HeroSlider, MovieRow, Loading],
  selector: 'app-landing-page',
  templateUrl: './lp.page.html',
})
export class LandingPage {
  private readonly moviesService = inject(MoviesService);

  readonly pageData$ = forkJoin({
    slides: this.moviesService.getTrendingSlides(),
    movieCards: this.moviesService.getTrendingCards(),
    nowPlayingMovies: this.moviesService.getNowPlayingMovies(),
  });
}
