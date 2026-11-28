import type { ErrorRequestHandler } from 'express';

import { TmdbError } from '../services/tmdb.service';

export const errorMiddleware: ErrorRequestHandler = (error: unknown, _req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (error instanceof TmdbError) {
    res.status(error.status).json({
      message: error.message,
    });
    return;
  }

  console.error('[SERVER]', error);

  res.status(500).json({
    message: 'Erro interno do servidor.',
  });
};
