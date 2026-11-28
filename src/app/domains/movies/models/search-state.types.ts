import { SearchMoviesResponse } from '../services/movies.service';

export type SearchState =
  | { status: 'idle' }
  | { status: 'loading'; query: string }
  | { status: 'error'; query: string }
  | { status: 'success'; query: string; data: SearchMoviesResponse };
