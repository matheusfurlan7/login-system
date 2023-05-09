import { AppError } from './AppError';

describe('bcryptr', () => {
  it('should create object of type AppError and return correct information', () => {
    const appError = new AppError(400, 'status code 400.');
    expect(appError.status).toBe(400);
    expect(appError.message).toBe('status code 400.');
  });
});