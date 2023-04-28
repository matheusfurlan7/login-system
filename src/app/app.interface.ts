//import { Express, Router } from 'express';

export interface App {
  //server: Express;

  //constructor(port: number, routers: Router[]);

  // middlewares(): void;
  // routers(routers: Router[]): void;
  listen(): void;
}