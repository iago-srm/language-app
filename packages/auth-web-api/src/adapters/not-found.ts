import { RequestHandler } from 'express';

export const notFoundHandler: RequestHandler = (req, res, next) => {
  const error = `${req.ip} tried to access ${req.originalUrl}`;

  res.status(404);

  next(error);
}