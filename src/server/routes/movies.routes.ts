import { Router } from 'express';

import { tmdbFetch } from '../services/tmdb.service';
import { Movie, TmdbMovie, TmdbMoviesResponse } from '../types/tmdb.types';

export const moviesRouter = Router();

const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

function mapMovie(movie: TmdbMovie): Movie {
  return {
    id: movie.id,
    title: movie.title,
    posterUrl: movie.poster_path ? `${TMDB_IMAGE_URL}${movie.poster_path}` : null,
  };
}

moviesRouter.get('/trending', async (_req, res) => {
  const data = await tmdbFetch<TmdbMoviesResponse>('/trending/movie/week');

  res.json(data);
});

moviesRouter.get('/now-playing', async (_req, res) => {
  const data = await tmdbFetch<TmdbMoviesResponse>('/movie/now_playing', {
    region: 'BR',
    page: '1',
  });

  res.json({
    results: data.results.map(mapMovie),
  });
});

moviesRouter.get('/search', async (req, res) => {
  const query = typeof req.query['query'] === 'string' ? req.query['query'].trim() : '';

  const rawPage = req.query['page'];

  const page =
    rawPage === undefined
      ? 1
      : typeof rawPage === 'string' && /^\d+$/.test(rawPage)
        ? Number(rawPage)
        : NaN;

  if (!query) {
    res.status(400).json({
      message: 'Informe um termo para realizar a busca.',
    });
    return;
  }

  if (!Number.isInteger(page) || page < 1 || page > 500) {
    res.status(400).json({
      message: 'Página inválida.',
    });
    return;
  }

  const data = await tmdbFetch<TmdbMoviesResponse>('/search/movie', {
    query,
    page: String(page),
    include_adult: 'false',
  });

  res.json({
    page: data.page,
    totalPages: Math.min(data.total_pages, 500),
    totalResults: data.total_results,
    results: data.results.map(mapMovie),
  });
});

moviesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!/^[1-9]\d*$/.test(id)) {
    res.status(400).json({
      message: 'ID do filme inválido.',
    });
    return;
  }

  const data = await tmdbFetch<unknown>(`/movie/${id}`, {
    include_image_language: 'pt,en,null',
    include_video_language: 'pt,en',
    append_to_response: [
      'credits',
      'videos',
      'images',
      'recommendations',
      'similar',
      'watch/providers',
      'release_dates',
    ].join(','),
  });

  res.json(data);
});
