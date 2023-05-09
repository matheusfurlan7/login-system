import { Request, Response, NextFunction } from 'express';
import { authMiddleware } from './authMiddleware';
import { AppError } from '../exception/AppError';
import { JsonWebTokenError } from 'jsonwebtoken';

describe('Auth Middleware', () => {
  test('should call next function if user is authenticated', () => {
    const req = {} as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    req.headers = {
      authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODM1OTA5NzUsImV4cCI6ODgwODM1OTA5NzUsInN1YiI6IjIxIn0.3m2E2ElwAzSpQI3tTwy78lkKCX101-ZOZlyPLELOaG0',
    };

    authMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test('should return 401 jwt is missing if user is not authenticated', () => {
    const req = {} as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    req.headers = {};

    expect(() => {
      authMiddleware(req, res, next);
    }).toThrow(AppError);

    try {
      authMiddleware(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).status).toBe(404);
      expect((error as AppError).message).toBe('jwt is missing');
    }
  });

  test('should return 401 JWT invalid if user is not authenticated', () => {
    const req = {} as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    req.headers = {
      authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODM1OTI0NDksImV4cCI6MTY4MzU5MjQ1MCwic3ViIjoiMjEifQ.s6ssoy74dP9hInwqYA9N_1-jCzqr803SpB1r4pUxXco',
    };

    expect(() => {
      authMiddleware(req, res, next);
    }).toThrow(AppError);

    try {
      authMiddleware(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).status).toBe(401);
      expect((error as AppError).message).toBe('jwt expired');
    }
  });

  test('should return 500 if token is not validet', () => {
    const req = {} as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    req.headers = {
      authorization: 'Bearer <token>',
    };

    expect(() => {
      authMiddleware(req, res, next);
    }).toThrow(JsonWebTokenError);

    try {
      authMiddleware(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(JsonWebTokenError);
      expect(error.message).toBe('jwt malformed');
    }
  });
});