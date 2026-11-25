import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { MovieRow } from '@shared/ui/components';
import { MoviesService } from '@/domains/movies/services/movies.service';
import { HeroSlider } from '@domains/home/components/hero-slider/hero-slider';

@Component({
  imports: [AsyncPipe, HeroSlider, MovieRow],
  selector: 'app-landing-page',
  templateUrl: './lp.page.html',
})
export class LandingPage {
  private readonly moviesService = inject(MoviesService);

  readonly slides$ = this.moviesService.getTrendingSlides();
  readonly movieCards$ = this.moviesService.getTrendingCards();
  readonly nowPlayingMovies$ = this.moviesService.getNowPlayingMovies();
}
