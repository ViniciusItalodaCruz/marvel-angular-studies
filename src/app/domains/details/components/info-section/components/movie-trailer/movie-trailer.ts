import { Component, computed, input } from '@angular/core';

import type { MovieVideo } from '@/domains/movies/models/movie-details.types';

@Component({
  selector: 'app-movie-trailer',
  templateUrl: './movie-trailer.html',
  host: {
    '[class.hidden]': '!trailer()',
  },
})
export class MovieTrailer {
  readonly videos = input.required<MovieVideo[]>();

  readonly trailer = computed(() => {
    const trailers = this.videos().filter(
      ({ site, type }) => site === 'YouTube' && type === 'Trailer',
    );

    return (
      trailers.find(({ official, iso_639_1 }) => official && iso_639_1 === 'pt') ??
      trailers.find(({ official }) => official) ??
      trailers[0] ??
      null
    );
  });
}
