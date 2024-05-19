import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exception/http.exception';
import { env } from '../config/env';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new HttpException(404, `Not Found - ${req.method} ${req.originalUrl}`));
};

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpException) {
    res.status(err.code).json({
      success: false,
      message: err.message,
    });
  } else {
    let message = err.message;
    if (env.NODE_ENV === 'production') {
      message = 'Internal Server Error';
    }
    res.status(500).json({
      success: false,
      message,
    });
  }
};
