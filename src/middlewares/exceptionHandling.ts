import { NextFunction, Request, Response } from 'express';
import { AppError } from '@errors/AppError';

export async function exceptionHandling(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  return response.status(501).json({
    status: 'error',
    message: `Internal server error - ${error.message}`,
  });
}
