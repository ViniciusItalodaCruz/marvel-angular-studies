export interface MovieDetails {
  id: number;
  adult: boolean;
  title: string;
  original_title: string;
  original_language: string;
  overview: string;
  tagline: string;
  backdrop_path: string | null;
  poster_path: string | null;
  release_date: string;
  runtime: number | null;
  budget: number;
  revenue: number;
  popularity: number;
  vote_average: number;
  vote_count: number;
  status: string;
  homepage: string;
  imdb_id: string | null;
  video: boolean;
  genres: Genre[];
  origin_country: string[];
  belongs_to_collection: MovieCollection | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  credits: Credits;
  videos: Results<MovieVideo>;
  images: MovieImages;
  recommendations: PaginatedResults<RelatedMovie>;
  similar: PaginatedResults<RelatedMovie>;
  'watch/providers': WatchProviders;
  release_dates: Results<CountryReleaseDates>;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Results<T> {
  results: T[];
}

export interface PaginatedResults<T> extends Results<T> {
  page: number;
  total_pages: number;
  total_results: number;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}

export interface Person {
  id: number;
  adult: boolean;
  gender: number | null;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  known_for_department: string;
  credit_id: string;
}

export interface Cast extends Person {
  cast_id: number;
  character: string;
  order: number;
}

export interface Crew extends Person {
  department: string;
  job: string;
}

export interface MovieVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface MovieImages {
  backdrops: MovieImage[];
  posters: MovieImage[];
  logos: MovieImage[];
}

export interface MovieImage {
  aspect_ratio: number;
  height: number;
  width: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
}

export interface RelatedMovie {
  id: number;
  adult: boolean;
  title: string;
  original_title: string;
  original_language: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
  video: boolean;
}

export interface WatchProviders {
  results: Record<string, CountryWatchProviders>;
}

export interface CountryWatchProviders {
  link: string;
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
  free?: WatchProvider[];
  ads?: WatchProvider[];
}

export interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
  display_priority: number;
}

export interface CountryReleaseDates {
  iso_3166_1: string;
  release_dates: MovieReleaseDate[];
}

export interface MovieReleaseDate {
  certification: string;
  descriptors?: string[];
  iso_639_1: string;
  release_date: string;
  type: number;
  note: string;
}
