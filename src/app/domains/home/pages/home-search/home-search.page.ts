import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { InputSearch } from '@shared/ui/components/input-search/input-search';
import { HeroSlider } from '@domains/home/components/hero-slider/hero-slider';
import { MoviesService } from '@/domains/movies/services/movies.service';

@Component({
  imports: [InputSearch, AsyncPipe, HeroSlider],
  selector: 'app-home-search',
  templateUrl: './home-search.page.html',
})
export class HomeSearchPage {
  private readonly moviesService = inject(MoviesService);

  readonly slides$ = this.moviesService.getTrendingSlides();
}
