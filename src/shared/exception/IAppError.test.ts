import { IAppError } from './IAppError';

describe('AppError interface', () => {
  test('should have the correct properties', () => {
    const appError: IAppError = {
      status: 500,
      message: "IAppError interface test message"
    };

    expect(appError.status).toEqual(500);
    expect(appError.message).toEqual('IAppError interface test message');
  });
});