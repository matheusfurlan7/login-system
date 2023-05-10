import App from './App';
import { Router } from 'express';
import { IBaseController } from '../shared/controllers/IBaseController';

describe('App', () => {
  it('should initialize the server', async () => {
    const controller: IBaseController = {
      initializeRoutes: jest.fn().mockReturnValue(Router())
    };
    
    const mockPort = 3000;
    const mockControllers: IBaseController[] = [
      controller
    ];
    
    const app = new App(mockPort, mockControllers);

    expect(app.getServer()).toBeDefined();
  });
});