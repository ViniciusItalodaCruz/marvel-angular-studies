import { Component, input } from '@angular/core';

import type { MovieDetails } from '@entities/movie';
import { MovieCast } from './components/movie-cast/movie-cast';
import { MovieHeader } from './components/movie-header/movie-header';
import { MovieGenres } from './components/movie-genres/movie-genres';
import { MovieTrailer } from './components/movie-trailer/movie-trailer';
import { MovieMetadata } from './components/movie-metadata/movie-metadata';
import { MovieSynopsis } from './components/movie-synopsis/movie-synopsis';
import { MovieProduction } from './components/movie-production/movie-production';
import { MovieWatchProviders } from './components/movie-watch-providers/movie-watch-providers';

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
