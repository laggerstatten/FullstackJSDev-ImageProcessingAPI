import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import routes from './routes';

const app: express.Application = express();
const port: number = 3000;

app.use(routes);

app.listen(port, async (): Promise<void> => {

  try {
    await fs.access(path.resolve(__dirname, '../assets/images/thumb'));
  } catch {
    await fs.mkdir(path.resolve(__dirname, '../assets/images/thumb'));
  }
  console.log(`server started at http://localhost:${port}`);
});

export default app;