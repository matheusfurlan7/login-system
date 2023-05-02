import cors from 'cors';
import express, { Express } from 'express';

import IApp from './app.interface';
import IController from '../shared/controller/controller.interface';

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
  
  constructor(port: number, controllers: IController[]) {
    this.port = port;
    this.server = express();

    this.middlewares();
    this.routers(controllers);
  }  

  private middlewares(): void {
    this.server.use(express.json());
    this.server.use(cors());
  }

  private routers(controllers: IController[]): void {
    this.server.get('/isOpen/', this.openServer);

    controllers.forEach((controller) => {
      this.server.use('/', controller.initializeRoutes());
    });
  }

  public listen(): void {
    this.server.listen(this.port, () => {
      console.log(`Server is running at ${this.port}`)
    }); 
  }
}

export default App;