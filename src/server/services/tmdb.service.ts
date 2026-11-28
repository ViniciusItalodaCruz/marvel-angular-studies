const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_TIMEOUT = 5_000;

export class TmdbError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'TmdbError';
  }
}

export async function tmdbFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const token = process.env['TMDB_READ_ACCESS_TOKEN'];

  if (!token) {
    throw new TmdbError(500, 'A integração com o TMDB precisa ser configurada.');
  }

  const url = new URL(`${TMDB_BASE_URL}${path}`);

  url.search = new URLSearchParams({
    language: 'pt-BR',
    ...params,
  }).toString();

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(TMDB_TIMEOUT),
    });

    if (response.status === 404) {
      throw new TmdbError(404, 'Recurso não encontrado.');
    }

    if (!response.ok) {
      console.error('[TMDB]', path, response.status);

      throw new TmdbError(502, 'Falha ao consultar o TMDB.');
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof TmdbError) {
      throw error;
    }

    if (error instanceof Error && error.name === 'TimeoutError') {
      throw new TmdbError(504, 'Tempo limite da requisição excedido.');
    }

    console.error('[TMDB]', path, error);

    throw new TmdbError(502, 'Falha na comunicação com o TMDB.');
  }
}
