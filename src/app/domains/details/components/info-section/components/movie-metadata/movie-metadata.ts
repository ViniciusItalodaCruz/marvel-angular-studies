import type { MovieDetails } from '@/domains/movies/models/movie-details.types';
import { Component, computed, input } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

@Component({
  selector: 'app-movie-metadata',
  templateUrl: './movie-metadata.html',
})
export class MovieMetadata {
  readonly movie = input.required<MovieDetails>();

  readonly formattedReleaseDate = computed(() => {
    const { release_date } = this.movie();

    if (!release_date) return null;

    return format(parseISO(release_date), "d 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
  });

  readonly formattedRuntime = computed(() => {
    const { runtime } = this.movie();

    if (!runtime) return null;

    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    return [hours ? `${hours}h` : null, minutes ? `${minutes}min` : null].filter(Boolean).join(' ');
  });

  readonly certification = computed(() => {
    const country = this.movie().release_dates?.results.find(
      ({ iso_3166_1 }) => iso_3166_1 === 'BR',
    );

    return (
      country?.release_dates.find(({ certification }) => certification.trim() !== '')
        ?.certification ?? null
    );
  });
}
