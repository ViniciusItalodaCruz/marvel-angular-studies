import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideFilm, LucideTrash } from '@lucide/angular';
import { FavoriteMovie } from '../../models/favorite-movie.model';

@Component({
  imports: [RouterLink, LucideTrash, LucideFilm],
  selector: 'app-favorite-movie-card',
  templateUrl: './favorite-movie-card.html',
})
export class FavoriteMovieCard {
  readonly movie = input.required<FavoriteMovie>();
  readonly remove = output<number>();
}
