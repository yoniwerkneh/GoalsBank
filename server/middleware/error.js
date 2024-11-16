import { AppError } from '../utils/errors.js';

export const errorHandler = (error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message
    });
  }

  console.error(error);
  res.status(500).json({
    message: 'Internal server error'
  });
};