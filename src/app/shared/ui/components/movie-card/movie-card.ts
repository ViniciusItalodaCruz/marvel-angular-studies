import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideFilm, LucideTrash } from '@lucide/angular';

import { Movie } from '@/domains/movies/models/movie.types';

@Component({
  imports: [RouterLink, LucideFilm, LucideTrash],
  selector: 'app-movie-card',
  templateUrl: './movie-card.html',
})
export class MovieCard {
  readonly movie = input.required<Pick<Movie, 'id' | 'title' | 'posterUrl'>>();
  readonly removable = input(false);

  readonly remove = output<number>();
}
