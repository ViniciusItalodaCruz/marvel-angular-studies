export interface TrendingMovie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
}

export interface Movie {
  id: number;
  title: string;
  posterUrl: string | null;
}
