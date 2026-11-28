import type { MovieDetails } from '@/domains/movies/models/movie-details.types';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-movie-production',
  templateUrl: './movie-production.html',
})
export class MovieProduction {
  readonly movie = input.required<MovieDetails>();

  readonly directors = computed(() =>
    (this.movie().credits?.crew ?? [])
      .filter(({ job }) => job === 'Director')
      .map(({ name }) => name)
      .join(', '),
  );

  readonly originalLanguage = computed(() => {
    const { original_language } = this.movie();

    if (!original_language) return 'Não informado';

    const languages = new Intl.DisplayNames(['pt-BR'], {
      type: 'language',
    });

    return languages.of(original_language) ?? original_language;
  });

  readonly productionCountries = computed(() =>
    this.movie()
      .production_countries.map(({ name }) => name)
      .join(', '),
  );

  readonly productionCompanies = computed(() =>
    this.movie()
      .production_companies.slice(0, 3)
      .map(({ name }) => name)
      .join(', '),
  );
}
