import type { WatchProvider, WatchProviders } from '@/domains/movies/models/movie-details.types';

import { Component, computed, input } from '@angular/core';

interface WatchProviderGroup {
  label: string;
  providers: WatchProvider[];
}

@Component({
  selector: 'app-movie-watch-providers',
  templateUrl: './movie-watch-providers.html',
})
export class MovieWatchProviders {
  readonly providers = input.required<WatchProviders | undefined>();
  readonly country = input<string>('BR');

  readonly countryProviders = computed(() => this.providers()?.results?.[this.country()]);

  readonly watchProviders = computed<WatchProviderGroup[]>(() => {
    const providers = this.countryProviders();

    if (!providers) return [];

    return [
      {
        label: 'Streaming',
        providers: providers.flatrate ?? [],
      },
      {
        label: 'Aluguel',
        providers: providers.rent ?? [],
      },
      {
        label: 'Compra',
        providers: providers.buy ?? [],
      },
      {
        label: 'Gratuito',
        providers: providers.free ?? [],
      },
      {
        label: 'Com anúncios',
        providers: providers.ads ?? [],
      },
    ].filter(({ providers }) => providers.length > 0);
  });
}
