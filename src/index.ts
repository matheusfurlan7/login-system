import App from './app/app';
import dotenv from 'dotenv';

dotenv.config();

const port: Number = Number(process.env.PORT);

App.server.listen(port, () => {
  console.log(`Server is running at ${port}`)
});