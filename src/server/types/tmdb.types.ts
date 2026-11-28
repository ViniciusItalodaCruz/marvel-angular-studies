export interface TmdbMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface TmdbMoviesResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: TmdbMovie[];
}

export interface Movie {
  id: number;
  title: string;
  posterUrl: string | null;
}
