import cors from 'cors';
import express, { Express } from 'express';

import { IApp } from './IApp';
import { IBaseController } from '../shared/controllers/IBaseController';
import { errorMiddleware } from '../shared/exception/errorMiddleware';
import { openServerMiddleware } from '../shared/openServerMiddleware';

class App implements IApp {
  private server: Express;
  private port: number = 0;

  constructor(port: number, controllers: IBaseController[]) {
    this.port = port;
    this.server = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.server.use(express.json());
    this.server.use(cors());
  }

  private initializeControllers(controllers: IBaseController[]): void {
    this.server.get('/isOpen', openServerMiddleware);

    controllers.forEach((controller) => {
      this.server.use('/', controller.initializeRoutes());
    });
  }

  private initializeErrorHandling(): void {
    this.server.use('/', (req, res) => { res.status(404).send({ message: 'The route especificed not found.' }) });
    this.server.use(errorMiddleware);
  }

  public getServer(): express.Application {
    return this.server;
  }
  
  public listen(): void {
    this.server.listen(this.port, () => {
      console.log(`Server is running at ${this.port}`)
    });
  }
}

export default App;