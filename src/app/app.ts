import cors from 'cors';
import express, { Express } from 'express';

import { IApp } from './IApp';
import { errorMiddleware } from '../shared/exception';
import { IBaseController } from '../shared/controllers/IBaseController';

class App implements IApp {
  private server: Express;
  private startExecution: Date = new Date();
  private port: number = 0;

  private openServer = (req: express.Request, res: express.Response) => {
    const adjustDisplay = (value: number, amount: number): string => {
      let display = value.toString();

      while (display.length < amount) {
        display = `0${display}`
      }

      return display;
    }

    const milliseconds: number = Math.abs(new Date().getTime() - this.startExecution.getTime());
    const seconds: number = Math.trunc(milliseconds / 1000);
    const minuts: number = Math.trunc(seconds / 60);
    const hours: number = Math.trunc(minuts / 60);

    res.status(200).send({
      message: 'server is open',
      started: this.startExecution,
      runningTime: `${adjustDisplay(hours, 2)}:${adjustDisplay(minuts - (hours * 60), 2)}`
    });
  };

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
    this.server.get('/isOpen/', this.openServer);

    controllers.forEach((controller) => {
      this.server.use('/', controller.initializeRoutes());
    });
  }

  private initializeErrorHandling(): void {
    this.server.use('/', (req, res) => { res.status(404).send({ message: 'The route especificed not found.' }) });
    this.server.use(errorMiddleware);
  }

  public listen(): void {
    this.server.listen(this.port, () => {
      console.log(`Server is running at ${this.port}`)
    });
  }
}

export default App;