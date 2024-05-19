import { NextFunction, Request, Response } from 'express';
import { Options, rateLimit } from 'express-rate-limit';
import { HttpException } from '../exception/http.exception';

export const rateLimiter = rateLimit({
  legacyHeaders: true,
  limit: 60,
  standardHeaders: true,
  windowMs: 1 * 60 * 1000,
  handler: (request: Request, response: Response, next: NextFunction, optionsUsed: Options) => {
    next(new HttpException(429, 'Too many requests'));
  },
});
