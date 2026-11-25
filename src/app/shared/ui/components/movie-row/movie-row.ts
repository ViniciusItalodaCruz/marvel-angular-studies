import { Component, computed, input, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface MovieRowItem {
  id: number;
  title: string;
  posterUrl: string;
}

const MAX_VISIBLE_MOVIES = 5;
const INITIAL_START_INDEX = 0;
const MIN_MOVIES_COUNT = 2;

export enum Direction {
  Left = -1,
  Right = 1,
}

@Component({
  selector: 'app-movie-row',
  imports: [RouterLink],
  templateUrl: './movie-row.html',
})
export class MovieRow {
  protected readonly Direction = Direction;
  readonly title = input.required<string>();
  readonly movies = input.required<readonly MovieRowItem[]>();
  readonly hasMovies = computed(() => this.movies().length > MIN_MOVIES_COUNT);
  readonly hasMoreThanTwoMovies = computed(() => this.movies().length > MIN_MOVIES_COUNT);
  readonly hasMoreThanFiveMovies = computed(() => this.movies().length > MAX_VISIBLE_MOVIES);
  readonly hasMoreThanThreeMovies = computed(() => this.movies().length > MIN_MOVIES_COUNT);

  private readonly startIndex = linkedSignal({
    source: this.movies,
    computation: () => INITIAL_START_INDEX,
  });

  readonly visibleMovies = computed(() => {
    const movies = this.movies();
    const start = this.startIndex();

    return [...movies.slice(start), ...movies.slice(0, start)].slice(0, MAX_VISIBLE_MOVIES);
  });

  move(direction: Direction): void {
    const count = this.movies().length;
    if (count < MIN_MOVIES_COUNT) return;

    this.startIndex.update((index) => (index + direction + count) % count);
  }
}
