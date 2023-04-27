import express, { Express } from 'express';
import { AppDto } from './appDto';
import cors from 'cors';

class App implements AppDto {
  server: Express;
  startExecution: Date = new Date();

  constructor() {
    this.server = express();

    this.middlewares(this.server);
    this.routers(this.server);
  }

  middlewares(server: express.Express): void {
    server.use(express.json());
    server.use(cors());
  }

  routers(server: express.Express): void {
    server.get('/isOpen/', (req, res) => {
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
    })
  }
}

export default new App;