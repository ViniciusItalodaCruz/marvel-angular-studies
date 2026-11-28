export interface FavoriteMovie {
  readonly id: number;
  readonly title: string;
  readonly posterUrl: string | null;
}

export interface FavoriteMovieSource {
  id: number;
  title: string;
  poster_path: string | null;
}
