import { Request, Response, NextFunction } from 'express';
import { errorMiddleware } from './errorMiddleware';
import { AppError } from './AppError';

describe('Error Middleware', () => {
  test('should handle errors and return the correct response', async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;
    const error = new Error('Simulated error');

    errorMiddleware(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ status: 500, error: 'Simulated error' });
  });

  test('should handle errors of class AppError and return the correct response', async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as unknown as Response;
    const next = jest.fn() as NextFunction;
    const error = new AppError(500, 'AppError mock error');

    errorMiddleware(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ status: 500, error: 'AppError mock error' });
  });
});