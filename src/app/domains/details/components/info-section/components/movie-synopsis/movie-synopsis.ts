import { Component, input } from '@angular/core';

@Component({
  selector: 'app-movie-synopsis',
  templateUrl: './movie-synopsis.html',
})
export class MovieSynopsis {
  readonly overview = input.required<string>();
  readonly tagline = input<string>('');
}
