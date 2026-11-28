import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Get trending movies from TMDB
 */
app.get('/api/movies/trending', async (_req, res) => {
  const token = process.env['TMDB_READ_ACCESS_TOKEN'];

  if (!token) {
    res.status(500).json({ message: 'A integração com o TMDB precisa ser configurada.' });
    return;
  }

  try {
    const response = await fetch(
      'https://api.themoviedb.org/3/trending/movie/week?language=pt-BR',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
        signal: AbortSignal.timeout(5_000),
      },
    );

    if (!response.ok) {
      console.error('Falha ao consultar o TMDB', response.status);
      res.status(502).json({ message: 'Não foi possível carregar os filmes em alta.' });
      return;
    }

    res.json(await response.json());
  } catch (error) {
    console.error('Falha ao consultar o TMDB', error);
    res.status(502).json({ message: 'Não foi possível carregar os filmes em alta.' });
  }
});

interface TmdbMovie {
  id: number;
  title: string;
  poster_path: string | null;
}

/**
 * Get now playing movies from TMDB
 */
app.get('/api/movies/now-playing', async (_req, res) => {
  const token = process.env['TMDB_READ_ACCESS_TOKEN'];

  if (!token) {
    res.status(500).json({
      message: 'A integração com o TMDB precisa ser configurada.',
    });
    return;
  }

  const url = new URL('https://api.themoviedb.org/3/movie/now_playing');
  url.search = new URLSearchParams({
    region: 'BR',
    language: 'pt-BR',
    page: '1',
  }).toString();

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(5_000),
    });

    if (!response.ok) {
      console.error('Falha ao consultar filmes em cartaz no TMDB', response.status);
      res.status(502).json({ message: 'Não foi possível carregar os filmes em cartaz.' });
      return;
    }

    const data: { results: TmdbMovie[] } = await response.json();

    res.json({
      results: data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        posterUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
      })),
    });
  } catch (error) {
    console.error('Falha ao consultar filmes em cartaz no TMDB', error);
    res.status(502).json({ message: 'Não foi possível carregar os filmes em cartaz.' });
  }
});

interface TmdbSearchResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: TmdbMovie[];
}

/**
 * Search movies from TMDB
 */
app.get('/api/movies/search', async (req, res) => {
  const token = process.env['TMDB_READ_ACCESS_TOKEN'];

  const query = typeof req.query['query'] === 'string' ? req.query['query'].trim() : '';

  const page = Number(req.query['page'] ?? 1);

  if (!token) {
    res.status(500).json({
      message: 'A integração com o TMDB precisa ser configurada.',
    });
    return;
  }

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

  const url = new URL('https://api.themoviedb.org/3/search/movie');

  url.search = new URLSearchParams({
    query,
    page: String(page),
    language: 'pt-BR',
    include_adult: 'false',
  }).toString();

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(5_000),
    });

    if (!response.ok) {
      console.error('Falha ao buscar filmes no TMDB', response.status);

      res.status(502).json({
        message: 'Não foi possível realizar a busca.',
      });
      return;
    }

    const data: TmdbSearchResponse = await response.json();

    res.json({
      page: data.page,
      totalPages: Math.min(data.total_pages, 500),
      totalResults: data.total_results,
      results: data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        posterUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
      })),
    });
  } catch (error) {
    console.error('Falha ao buscar filmes no TMDB', error);

    res.status(502).json({
      message: 'Não foi possível realizar a busca.',
    });
  }
});

/**
 * Get movie details from TMDB
 */
app.get('/api/movies/:id', async (req, res) => {
  const token = process.env['TMDB_READ_ACCESS_TOKEN'];
  const { id } = req.params;

  if (!token) {
    res.status(500).json({
      message: 'A integração com o TMDB precisa ser configurada.',
    });
    return;
  }

  if (!/^[1-9]\d*$/.test(id)) {
    res.status(400).json({
      message: 'ID do filme inválido.',
    });
    return;
  }

  const url = new URL(`https://api.themoviedb.org/3/movie/${id}`);

  url.search = new URLSearchParams({
    language: 'pt-BR',
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
  }).toString();

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(5_000),
    });

    if (response.status === 404) {
      res.status(404).json({
        message: 'Filme não encontrado.',
      });
      return;
    }

    if (!response.ok) {
      console.error('Falha ao consultar detalhes do filme', response.status);

      res.status(502).json({
        message: 'Não foi possível carregar os detalhes do filme.',
      });
      return;
    }

    res.json(await response.json());
  } catch (error) {
    console.error('Falha ao consultar detalhes do filme', error);

    res.status(502).json({
      message: 'Não foi possível carregar os detalhes do filme.',
    });
  }
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
