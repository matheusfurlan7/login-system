import { Router } from 'express';
import { IBaseController } from './IBaseController';

describe('IBaseController interface', () => {
  test('should have the correct properties', () => {
    const baseController: IBaseController = {
      initializeRoutes: () => {
        return Router();
      }
    }

    const result = baseController.initializeRoutes();

    expect(typeof result).toBe('function');
    expect(result.name).toEqual('router');
  });
});