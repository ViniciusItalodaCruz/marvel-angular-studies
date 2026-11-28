import type { MovieDetails } from '@/domains/movies/models/movie-details.types';
import { Component, input } from '@angular/core';

import { MovieHeader } from './components/movie-header/movie-header';
import { MovieMetadata } from './components/movie-metadata/movie-metadata';
import { MovieGenres } from './components/movie-genres/movie-genres';
import { MovieSynopsis } from './components/movie-synopsis/movie-synopsis';
import { MovieProduction } from './components/movie-production/movie-production';
import { MovieCast } from './components/movie-cast/movie-cast';
import { MovieWatchProviders } from './components/movie-watch-providers/movie-watch-providers';
import { MovieTrailer } from './components/movie-trailer/movie-trailer';

@Component({
  imports: [
    MovieHeader,
    MovieMetadata,
    MovieGenres,
    MovieSynopsis,
    MovieProduction,
    MovieCast,
    MovieWatchProviders,
    MovieTrailer,
  ],
  selector: 'app-info-section',
  templateUrl: './info-section.html',
})
export class InfoSection {
  readonly movie = input.required<MovieDetails>();
}
