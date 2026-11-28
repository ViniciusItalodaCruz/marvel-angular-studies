import { Component, computed, input } from '@angular/core';

import type { Cast } from '@/domains/movies/models/movie-details.types';

@Component({
  selector: 'app-movie-cast',
  templateUrl: './movie-cast.html',
  host: {
    '[class.hidden]': '!mainCast().length',
  },
})
export class MovieCast {
  readonly cast = input.required<Cast[]>();
  readonly limit = input<number>(6);

  readonly mainCast = computed(() =>
    [...this.cast()].sort((a, b) => a.order - b.order).slice(0, this.limit()),
  );
}
