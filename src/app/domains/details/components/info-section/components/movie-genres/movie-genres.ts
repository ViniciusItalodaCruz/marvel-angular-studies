import { Component, input } from '@angular/core';

import type { Genre } from '@entities/movie';

@Component({
  selector: 'app-movie-genres',
  templateUrl: './movie-genres.html',
  host: {
    '[class.hidden]': '!genres().length',
  },
})
export class MovieGenres {
  readonly genres = input.required<Genre[]>();
}
