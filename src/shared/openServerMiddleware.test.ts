import { Request, Response } from 'express';
import { openServerMiddleware, getStartingExecution  } from './openServerMiddleware';

describe('Open Server Middleware', () => {
  test('should saved and returns date saved', async () => {
    const date = getStartingExecution();

    expect(date).toBeDefined();
  });

  test('should saved and returns if server is open and how long', async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;
  
    openServerMiddleware(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: 'server is open',
      started: getStartingExecution()!,
      runningTime: '00:00'
    });
  });
});