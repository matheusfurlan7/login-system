import { Express } from 'express';

export interface AppDto {
  server: Express

  middlewares(server: Express): void;
  routers(server: Express): void;
}