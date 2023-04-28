import Api from './app/app';
import dotenv from 'dotenv';
import controllers from './shared/controller';

dotenv.config();

const port: number = Number(process.env.PORT);

const api = new Api(
  port,
  controllers
);

api.listen();